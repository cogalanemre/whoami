import { GlobalStyles as MuiGlobalStyles } from "@mui/material";

const GlobalStyles = () => {
  return (
    <MuiGlobalStyles
      styles={{
        // Genel erişilebilirlik stilleri
        "*:focus-visible": {
          outline: "2px solid #000",
          outlineOffset: "2px",
        },
        // Klavye navigasyonu için kaydırma davranışı
        html: {
          scrollBehavior: "smooth",
          "@media (prefers-reduced-motion: reduce)": {
            scrollBehavior: "auto",
          },
        },
        // Gizli elemanlar için yardımcı sınıf
        ".visually-hidden": {
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: "0",
        },
        // Animasyonları devre dışı bırakma tercihi
        "@media (prefers-reduced-motion: reduce)": {
          "*": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
            scrollBehavior: "auto !important",
          },
        },
        // Yüksek kontrast modu için ayarlar
        "@media (forced-colors: active)": {
          "*": {
            borderColor: "ButtonBorder !important",
          },
          "a, button": {
            forcedColorAdjust: "auto",
          },
        },
      }}
    />
  );
};

export default GlobalStyles; 