import { useMutation } from "@tanstack/react-query";

import { useForm, zodResolver } from "@mantine/form";
import { Box, Button, Group, Stack, TextInput } from "@mantine/core";

import { UsersProtocol } from "@sixthfin-auth/feat-users-shared";

import { UsersQueries } from "../users.queries";

interface CreateUserPageProps {
  onSuccess: () => void;
  usersQueries: UsersQueries;
}

export function CreateUserPage({
  onSuccess,
  usersQueries,
}: CreateUserPageProps) {
  const form = useForm<UsersProtocol["commands"]["create"]>({
    initialValues: {
      firstname: "",
      lastname: "",
    },
    validate: zodResolver(UsersProtocol.commands.create),
  });

  const mutation = useMutation({
    mutationFn: (command: UsersProtocol["commands"]["create"]) =>
      usersQueries.client.create({ body: command }),
    onSuccess: () => {
      onSuccess();
    },
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((command) => mutation.mutate(command))}
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
          <Button color={"gray"} onClick={form.reset} type="reset">
            Réinitialiser
          </Button>
          <Button type="submit">Ajouter</Button>
        </Group>
      </Stack>
    </Box>
  );
}
