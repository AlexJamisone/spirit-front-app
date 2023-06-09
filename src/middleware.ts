import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { ratelimit } from './server/helpers/ratelimit';
export default authMiddleware({
	async afterAuth(auth, req, evt) {
		const ip = req.ip ?? '127.0.0.1';
		const { success, pending, limit, reset, remaining } =
			await ratelimit.baseAll.limit(`ratelimit_middleware_${ip}`);
		evt.waitUntil(pending);

		const res = success
			? NextResponse.next()
			: NextResponse.redirect(new URL('/api/blocked', req.url));

		res.headers.set('X-RateLimit-Limit', limit.toString());
		res.headers.set('X-RateLimit-Remaining', remaining.toString());
		res.headers.set('X-RateLimit-Reset', reset.toString());
		return res;
	},
});

export const config = {
	matcher: ['/((?!_next/image|_next/static|favicon.ico).*)', '/api/:path*'],
};
