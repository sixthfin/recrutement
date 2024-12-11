import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

import { useForm, zodResolver } from "@mantine/form";
import { Box, Button, Group, Stack, TextInput } from "@mantine/core";

import { UsersProtocol } from "@sixthfin-auth/feat-users-shared";

import { UsersQueries } from "../users.queries";

export interface UpdateUserPageProps {
  onSuccess: () => void;
  userId: string;
  usersQueries: UsersQueries;
}

export function UpdateUserPage({
  onSuccess,
  userId,
  usersQueries,
}: UpdateUserPageProps) {
  const user = useSuspenseQuery(usersQueries.findeOneQuery(userId));

  if (user.data.status === 404) {
    throw new Error(`Unknown user ${userId}`);
  }

  const form = useForm<UsersProtocol["commands"]["create"]>({
    initialValues: user.data.body,
    validate: zodResolver(UsersProtocol.commands.create),
  });

  const mutation = useMutation({
    mutationFn: () =>
      usersQueries.client.patch({
        body: Object.entries(form.getTouched()).flatMap(([field, isTouched]) =>
          isTouched
            ? [
                {
                  op: "replace",
                  path: `/${field}`,
                  value:
                    form.getValues()[
                      field as keyof UsersProtocol["commands"]["create"]
                    ],
                },
              ]
            : []
        ) as UsersProtocol["commands"]["patch"],
        params: { userId },
      }),
    onSuccess: () => {
      onSuccess();
    },
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(() => mutation.mutate())}
      p="md"
    >
      <Stack>
        <TextInput
          key={form.key("firstname")}
          label="Prénom"
          withAsterisk
          {...form.getInputProps("firstname")}
        />
        <TextInput
          key={form.key("lastname")}
          label="Nom"
          withAsterisk
          {...form.getInputProps("lastname")}
        />
        <Group>
          <Button
            color={"gray"}
            loading={mutation.isPending}
            onClick={form.reset}
            type="reset"
          >
            Réinitialiser
          </Button>
          <Button loading={mutation.isPending} type="submit">
            Modifier
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
