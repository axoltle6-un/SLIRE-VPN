# SLIRE VPN

**Private. Secure. Lightning Fast.**

A production-ready VPN application comparable to top-tier providers, built with scalable architecture.

## Architecture
- **Mobile App**: React Native (Expo) - Material 3 / Glassmorphism UI
- **Backend API**: Node.js (Fastify) + TypeScript + Prisma
- **Database**: PostgreSQL (User data, servers, subscriptions)
- **Caching/Queues**: Redis
- **VPN Core**: WireGuard (Primary), OpenVPN UDP/TCP fallback
- **Admin Dashboard**: React (Vite) + TailwindCSS
- **Infrastructure**: Docker / Kubernetes Ready

## Local Development

```bash
# Start backend, db, and redis
docker-compose up -d

# Start backend dev server
cd backend && npm run dev

# Start mobile app
cd mobile && npm start
```
