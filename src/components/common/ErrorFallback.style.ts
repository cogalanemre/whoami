export const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  p: 3,
} as const;

export const errorMessageStyles = {
  mb: 2,
} as const;

export const errorDetailsStyles = {
  backgroundColor: "background.paper",
  p: 2,
  borderRadius: 1,
  maxWidth: "100%",
  overflow: "auto",
  mb: 2,
} as const;

export const retryButtonStyles = {
  mt: 2,
} as const; 