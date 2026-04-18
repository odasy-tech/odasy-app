import { router } from './trpc';
import { authRouter } from './routers/auth';
import { checkinRouter } from './routers/checkin';
import { missionsRouter } from './routers/missions';
import { passportRouter } from './routers/passport';
import { placesRouter } from './routers/places';

export const appRouter = router({
  auth: authRouter,
  missions: missionsRouter,
  places: placesRouter,
  checkin: checkinRouter,
  passport: passportRouter,
});

export type AppRouter = typeof appRouter;
