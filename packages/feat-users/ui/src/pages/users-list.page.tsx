import { Link } from "@tanstack/react-router";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import {
  Avatar,
  Box,
  Button,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";

import { vars } from "@sixthfin-auth/core-ui";

import { layout, listActions, listBody, listInfo } from "./users-list.css";
import { UsersQueries } from "../users.queries";

interface UsersListPageProps {
  createUserLink: string;
  updateUserLink: (userId: string) => string;
  usersQueries: UsersQueries;
}

export function UsersListPage({
  createUserLink,
  updateUserLink,
  usersQueries,
}: UsersListPageProps) {
  const users = useSuspenseInfiniteQuery({
    getNextPageParam: (lastPage) => lastPage.body.next,
    initialPageParam: undefined,
    queryFn: () => usersQueries.client.list(),
    queryKey: [UsersListPage.toString(), "users"],
  });

  const flatUsers = users.data.pages.flatMap((page) => page.body.results);
  const loadedUsers = users.data.pages.reduce(
    (total, page) => total + page.body.results.length,
    0
  );
  const total = users.data.pages[users.data.pages.length - 1]?.body.total ?? 0;

  return (
    <Box className={layout} p="md">
      <Group className={listInfo}>
        <Text c={vars.colors.gray[8]} fw={700}>
          Utilisateurs :
        </Text>
        <Text c={vars.colors.gray[6]}>
          {loadedUsers} / {total}
        </Text>
      </Group>
      <Group className={listActions} justify="flex-end">
        <Button component={Link} to={createUserLink}>
          Ajouter
        </Button>
      </Group>
      <ScrollArea
        className={listBody}
        onBottomReached={() => users.fetchNextPage()}
      >
        <Stack gap={"md"}>
          {flatUsers.map((user) => (
            <Group
              bd={`1px solid ${vars.colors.defaultBorder}`}
              justify="space-between"
              p={"sm"}
            >
              <Group>
                <Avatar>
                  {user.firstname[0]}
                  {user.lastname[0]}
                </Avatar>
                <Text>{user.firstname}</Text>
                <Text>{user.lastname}</Text>
              </Group>
              <Button component={Link} to={updateUserLink(user.id)}>
                Modifier
              </Button>
            </Group>
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
}
