import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

// Dummy Data
const servers = [
  { id: 1, country: 'United States', city: 'New York', flag: '🇺🇸', load: '32%', ping: 45, protocol: 'WireGuard' },
  { id: 2, country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', load: '45%', ping: 112, protocol: 'WireGuard' },
  { id: 3, country: 'Japan', city: 'Tokyo', flag: '🇯🇵', load: '60%', ping: 140, protocol: 'WireGuard' },
];

fastify.get('/api/health', async (request, reply) => {
  return { status: 'healthy', version: '1.0.0' };
});

fastify.get('/api/servers', async (request, reply) => {
  return { success: true, data: servers };
});

fastify.post('/api/auth/login', async (request, reply) => {
  return { success: true, token: 'jwt-token-placeholder', user: { id: 1, name: 'Premium User' } };
});

fastify.post('/api/vpn/connect', async (request, reply) => {
  // Logic to allocate a WireGuard IP and return Public Key / Endpoint
  return { 
    success: true, 
    config: {
      endpoint: 'vpn.slire.net:51820',
      publicKey: 'd3A...x8E=',
      allowedIPs: '0.0.0.0/0',
      clientIp: '10.8.0.2/32',
      dns: '1.1.1.1'
    } 
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Server listening on port 3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
