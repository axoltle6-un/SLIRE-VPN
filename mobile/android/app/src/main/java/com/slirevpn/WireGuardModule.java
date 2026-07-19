package com.slirevpn;

import android.content.Intent;
import android.net.VpnService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.wireguard.android.backend.Backend;
import com.wireguard.android.backend.GoBackend;
import com.wireguard.crypto.Key;
import com.wireguard.config.Config;
import com.wireguard.config.Interface;
import com.wireguard.config.Peer;
import com.wireguard.android.backend.Tunnel;

public class WireGuardModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private Backend wgBackend;
    private Tunnel activeTunnel;

    public WireGuardModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "WireGuardAndroid";
    }

    @ReactMethod
    public void connect(String privateKey, String publicKey, String endpoint, String allowedIps, String clientIp, Promise promise) {
        try {
            // Android Requires VpnService Preparation permission first
            Intent intent = VpnService.prepare(reactContext);
            if (intent != null) {
                promise.reject("PERMISSION_DENIED", "VPN Permission required. Start Android intent first.");
                return;
            }

            if (wgBackend == null) {
                wgBackend = new GoBackend(reactContext);
            }

            // Build Secure WireGuard Configuration natively
            Interface.Builder interfaceBuilder = new Interface.Builder();
            interfaceBuilder.parsePrivateKey(privateKey);
            interfaceBuilder.parseAddresses(clientIp);
            interfaceBuilder.parseDnsServers("1.1.1.1, 1.0.0.1");
            interfaceBuilder.setMtu(1280); // Prevent packet fragmentation

            Peer.Builder peerBuilder = new Peer.Builder();
            peerBuilder.parsePublicKey(publicKey);
            peerBuilder.parseEndpoint(endpoint);
            peerBuilder.parseAllowedIPs(allowedIps);
            peerBuilder.setPersistentKeepalive(25);

            Config wgConfig = new Config.Builder()
                .setInterface(interfaceBuilder.build())
                .addPeer(peerBuilder.build())
                .build();

            activeTunnel = new Tunnel() {
                @Override
                public String getName() {
                    return "slirewg0";
                }
                @Override
                public void onStateChange(State newState) {}
            };

            wgBackend.setState(activeTunnel, Tunnel.State.UP, wgConfig);
            
            promise.resolve("SECURE_TUNNEL_CONNECTED");
        } catch (Exception e) {
            promise.reject("WG_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void disconnect(Promise promise) {
        try {
            if (wgBackend != null && activeTunnel != null) {
                wgBackend.setState(activeTunnel, Tunnel.State.DOWN, null);
                activeTunnel = null;
                promise.resolve("TUNNEL_DISCONNECTED");
            } else {
                promise.resolve("ALREADY_DISCONNECTED");
            }
        } catch (Exception e) {
            promise.reject("WG_ERROR", e.getMessage());
        }
    }
}
