import { createLazyFileRoute } from "@tanstack/react-router";

import { UpdateUserPage } from "@sixthfin-auth/feat-users-ui";

export const Route = createLazyFileRoute("/users/$userId/update")({
  component: Update,
});

function Update() {
  const params = Route.useParams();
  const routeContext = Route.useRouteContext();
  const navigate = Route.useNavigate();

  return (
    <UpdateUserPage
      onSuccess={() => navigate({ to: "/" })}
      userId={params.userId}
      usersQueries={routeContext.userQueries}
    />
  );
}
