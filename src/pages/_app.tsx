import type { AppProps } from "next/app";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
