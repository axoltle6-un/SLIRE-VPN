#!/bin/bash
# SLIRE VPN - WireGuard Server Setup Script
# Installs WireGuard, sets up forwarding, and configures the API agent

apt-get update && apt-get install -y wireguard iptables curl

# Enable IP forwarding
echo "net.ipv4.ip_forward = 1" > /etc/sysctl.d/99-sysctl.conf
echo "net.ipv6.conf.all.forwarding = 1" >> /etc/sysctl.d/99-sysctl.conf
sysctl -p

# Generate keys
wg genkey | tee /etc/wireguard/privatekey | wg pubkey > /etc/wireguard/publickey

cat << WG_EOF > /etc/wireguard/wg0.conf
[Interface]
PrivateKey = $(cat /etc/wireguard/privatekey)
Address = 10.8.0.1/24
ListenPort = 51820
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
WG_EOF

systemctl enable wg-quick@wg0
systemctl start wg-quick@wg0
echo "WireGuard Server Configured for SLIRE VPN."
