//  import global  css
import "./globals.css";
import { AppProps } from 'next/app';
// import layout  components form components folder
import Layout from "@components/Layout";


type MyAppProps = AppProps & {
  Component: React.ElementType;
  pageProps: Record<string, unknown>;
};

export default function MyApp({ Component, pageProps }:MyAppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
