import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../src/components/Navbar";
import ArtistPage from "../../src/components/ArtistDetails/ArtistPage";
const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Head>
        <title>Artist Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <Navbar />
      </div>

      <main className="flex w-full flex-1 flex-col items-center px-20 text-center">
        {/* <ArtistPage /> */}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by DISC - FVM HACKATHON - ETH GLOBAL 2023
          {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
        </a>
      </footer>
    </div>
  );
};

export default Home;
