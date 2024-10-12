import { createTRPCReact } from "@trpc/react-query";

import { AppRouter } from "@andino-labs/yiqi-client";

const client = createTRPCReact<AppRouter>();
export default client;
