import { router } from './trpc.js';
import { authRouter } from './routers/auth.js';
import { checkinRouter } from './routers/checkin.js';
import { missionsRouter } from './routers/missions.js';
import { passportRouter } from './routers/passport.js';
import { placesRouter } from './routers/places.js';

export const appRouter = router({
  auth: authRouter,
  missions: missionsRouter,
  places: placesRouter,
  checkin: checkinRouter,
  passport: passportRouter,
});

export type AppRouter = typeof appRouter;
