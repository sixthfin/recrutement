import { createLazyFileRoute, useRouter } from "@tanstack/react-router";

import { UsersListPage } from "@sixthfin-auth/feat-users-ui";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const router = useRouter();
  const routeContext = Route.useRouteContext();

  return (
    <UsersListPage
      createUserLink={router.buildLocation({ to: "/users/new" }).href}
      updateUserLink={(userId) =>
        router.buildLocation({
          params: { userId },
          to: "/users/$userId/update",
        }).href
      }
      usersQueries={routeContext.userQueries}
    />
  );
}
