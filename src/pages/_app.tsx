import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { Toaster } from "~/components/ui/toaster"

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/elements/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
};

export default api.withTRPC(MyApp);
