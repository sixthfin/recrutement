import { createLazyFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Stack, Text } from "@mantine/core";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const routeContext = Route.useRouteContext();
  const users = useSuspenseQuery(routeContext.userQueries.listQuery());

  return (
    <Stack p="md">
      <Text>There are {users.data.body.total} users</Text>
    </Stack>
  );
}
