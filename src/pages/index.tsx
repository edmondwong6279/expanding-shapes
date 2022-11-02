import Head from "next/head";
import HomeComponent from "../components/HomeComponent";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ed Wong Portfolio</title>
        <meta name="description" content="Ed Wong" />
        <link rel="icon" href="/fav.ico" />
      </Head>
      <HomeComponent />
    </div>
  );
}
