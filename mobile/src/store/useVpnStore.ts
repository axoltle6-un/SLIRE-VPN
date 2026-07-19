import { create } from 'zustand';
import axios from 'axios';

// Fallback to local dev IP if needed
const API_URL = 'http://localhost:3000/api';

interface VpnState {
  isConnected: boolean;
  isConnecting: boolean;
  selectedServer: any;
  servers: any[];
  connectionStats: any;
  fetchServers: () => Promise<void>;
  setServer: (server: any) => void;
  toggleConnection: () => Promise<void>;
}

export const useVpnStore = create<VpnState>((set, get) => ({
  isConnected: false,
  isConnecting: false,
  selectedServer: { id: 'us-ny-1', country: 'United States', city: 'New York', flag: '🇺🇸', ping: 45 },
  servers: [],
  connectionStats: null,

  fetchServers: async () => {
    try {
      // In Expo, localhost might not work on physical devices, fallback to hardcoded list if it fails
      const res = await axios.get(`${API_URL}/servers`).catch(() => null);
      if (res && res.data && res.data.success) {
        set({ servers: res.data.data });
      } else {
        // Fallback for demo without backend
        set({ servers: [
          { id: 'us-ny-1', country: 'United States', city: 'New York', flag: '🇺🇸', ping: 45, load: 32 },
          { id: 'uk-lon-1', country: 'United Kingdom', city: 'London', flag: '🇬🇧', ping: 85, load: 60 },
          { id: 'jp-tok-1', country: 'Japan', city: 'Tokyo', flag: '🇯🇵', ping: 140, load: 78 }
        ]});
      }
    } catch (e) {
      console.error('Failed to fetch servers');
    }
  },

  setServer: (server) => set({ selectedServer: server }),

  toggleConnection: async () => {
    const { isConnected, selectedServer } = get();
    
    if (isConnected) {
      // Disconnect
      set({ isConnecting: true });
      setTimeout(() => {
        set({ isConnected: false, isConnecting: false, connectionStats: null });
      }, 800);
      return;
    }

    // Connect
    set({ isConnecting: true });
    try {
      // Call our API to get VPN Tunnel Config
      const res = await axios.post(`${API_URL}/vpn/connect`, { serverId: selectedServer.id }).catch(() => null);
      
      // Simulate real-world tunnel negotiation time
      setTimeout(() => {
        set({ 
          isConnected: true, 
          isConnecting: false,
          connectionStats: res?.data?.config?.wireguard || {
             clientIp: '10.8.0.2/32',
             endpoint: `vpn-${selectedServer.id}.slire.net:51820`,
             protocol: 'WireGuard'
          }
        });
      }, 1500);
    } catch (e) {
      set({ isConnecting: false });
    }
  }
}));
