import { style } from "@vanilla-extract/css";

import { vars } from "@sixthfin-auth/core-ui";

export const layout = style({
  display: "grid",
  gap: vars.spacing.md,
  gridTemplate: `
    " list-info _         list-actions" max-content
    " list-body list-body list-body   " auto
    / auto      auto
  `,
  height: `calc(100dvh - var(--app-shell-header-height))`,
});

export const listInfo = style({
  gridArea: "list-info",
});

export const listActions = style({
  gridArea: "list-actions",
});

export const listBody = style({
  gridArea: "list-body",
});
