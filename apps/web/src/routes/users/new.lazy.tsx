import { createLazyFileRoute } from "@tanstack/react-router";

import { CreateUserPage } from "@sixthfin-auth/feat-users-ui";

export const Route = createLazyFileRoute("/users/new")({
  component: NewUser,
});

function NewUser() {
  const routeContext = Route.useRouteContext();
  const navigate = Route.useNavigate();

  return (
    <CreateUserPage
      onSuccess={() => navigate({ to: "/" })}
      usersQueries={routeContext.userQueries}
    />
  );
}
