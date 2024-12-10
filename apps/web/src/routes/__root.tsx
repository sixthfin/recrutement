import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppShell, Group, MantineProvider, Text } from "@mantine/core";

import { UsersQueries } from "@sixthfin-auth/feat-users-ui";
import { theme } from "@sixthfin-auth/core-ui";

import "@mantine/core/styles.css";

export type RootContext = {
  apiBaseUrl: string;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
  beforeLoad: ({ context }) => {
    const userQueries = new UsersQueries({ apiBaseUrl: context.apiBaseUrl });

    return { userQueries };
  },
  component: Root,
});

function Root() {
  const { queryClient } = Route.useRouteContext();

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppShell header={{ height: 60 }}>
          <AppShell.Header>
            <Group align="center" h="100%" p={"sm"}>
              <Text fw={700}>Sixthfin Auth</Text>
            </Group>
          </AppShell.Header>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
        </AppShell>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </MantineProvider>
  );
}
