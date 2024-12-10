import { themeToVars } from "@mantine/vanilla-extract";
import { createTheme } from "@mantine/core";

export const theme: ReturnType<typeof createTheme> = createTheme({});
export const vars = themeToVars(theme);
