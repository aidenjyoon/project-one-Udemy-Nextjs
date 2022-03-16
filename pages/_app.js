import Head from "next/head";
import Layout from "../components/layout/Layout";
import { NotificationContextProvider } from "../store/notificationContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta
            name="description"
            content="meetup website built using nextjs"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
