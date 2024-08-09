export const theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#50C878",
    secondaryHover: "#ef5350",
    background: "#f5f5f5",
    text: "#333",
  },
  spacing: (factor: number) => `${factor * 8}px`,
};

export type Theme = typeof theme;
