import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
export const ratelimit = {
	baseAll: new Ratelimit({
		redis,
		limiter: Ratelimit.cachedFixedWindow(10, '10 s'),
		ephemeralCache: new Map(),
		analytics: true,
	}),
};
