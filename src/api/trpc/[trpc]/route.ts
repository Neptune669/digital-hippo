import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
const handler = (req: Request) => {
  fetchRequestHandler({
    endpoint: "/api/trpc/[trpc]",
    req,
    router: appRouter,
    // @ts-expect-error context is already passed from express
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
