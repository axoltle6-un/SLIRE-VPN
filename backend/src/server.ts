import Fastify from 'fastify';
import cors from '@fastify/cors';
import crypto from 'crypto';

const fastify = Fastify({ logger: true });

// Enable CORS for the mobile app
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// Production-ready server database (mocked for now, but structured correctly)
const servers = [
  { id: 'us-ny-1', country: 'United States', city: 'New York', flag: '🇺🇸', load: 32, ping: 45, protocol: 'WireGuard', capacity: 1000, users: 320 },
  { id: 'us-la-1', country: 'United States', city: 'Los Angeles', flag: '🇺🇸', load: 45, ping: 68, protocol: 'WireGuard', capacity: 1000, users: 450 },
  { id: 'uk-lon-1', country: 'United Kingdom', city: 'London', flag: '🇬🇧', load: 60, ping: 85, protocol: 'WireGuard', capacity: 1000, users: 600 },
  { id: 'de-fra-1', country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', load: 45, ping: 112, protocol: 'WireGuard', capacity: 1000, users: 450 },
  { id: 'jp-tok-1', country: 'Japan', city: 'Tokyo', flag: '🇯🇵', load: 78, ping: 140, protocol: 'WireGuard', capacity: 1000, users: 780 },
  { id: 'sg-sin-1', country: 'Singapore', city: 'Singapore', flag: '🇸🇬', load: 20, ping: 160, protocol: 'WireGuard', capacity: 1000, users: 200 },
];

fastify.get('/api/health', async (request, reply) => {
  return { status: 'healthy', version: '1.1.0', timestamp: new Date().toISOString() };
});

fastify.get('/api/servers', async (request, reply) => {
  return { success: true, count: servers.length, data: servers };
});

fastify.post('/api/auth/login', async (request, reply) => {
  // In a real app, validate email/password against PostgreSQL
  const token = crypto.randomBytes(32).toString('hex');
  return { 
    success: true, 
    token, 
    user: { id: 'u_123', email: 'user@slirevpn.com', isPremium: true } 
  };
});

fastify.post('/api/vpn/connect', async (request: any, reply) => {
  const { serverId } = request.body || {};
  const server = servers.find(s => s.id === serverId) || servers[0];

  // Simulate WireGuard Key Exchange
  const clientPrivateKey = crypto.randomBytes(32).toString('base64');
  const serverPublicKey = crypto.randomBytes(32).toString('base64');
  const clientIp = `10.8.0.${Math.floor(Math.random() * 250) + 2}`;

  return { 
    success: true, 
    message: 'Tunnel configuration generated securely',
    config: {
      server: server,
      wireguard: {
        endpoint: `vpn-${server.id}.slire.net:51820`,
        serverPublicKey: serverPublicKey,
        clientIp: `${clientIp}/32`,
        dns: '1.1.1.1, 1.0.0.1',
        mtu: 1420,
        allowedIPs: '0.0.0.0/0, ::/0',
        keepAlive: 25
      }
    } 
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`API Server running on port 3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
