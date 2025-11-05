import { ReactNode } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";
import { Toaster } from "react-hot-toast";

// ** Styled Components
import ReactHotToast from "src/components/react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ** Utils Imports
import { createEmotionCache } from "src/hooks/create-emotion-cache";

// ** Global css styles
import "src/styles/globals.css";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};


const clientSideEmotionCache = createEmotionCache();

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Page Builder Next JS MUI-5</title>
        <meta name="keywords" content="Page Builder Next JS MUI-5" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>


      <Component {...pageProps} />

      <ReactHotToast>
        <div style={{ filter: "unset" }}>
          <Toaster
            position={"bottom-left"}
            toastOptions={{ className: "react-hot-toast" }}
          />
        </div>
      </ReactHotToast>
      <ToastContainer limit={5} />
    </CacheProvider>
  );
};

export default App;
