import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../src/components/Navbar";
import Featured2 from "../src/components/Featured2";
import { Profile } from "../src/components/Wallet/SignIn";
import { getHuddleClient } from "@huddle01/huddle01-client";
import VideoElement from '../src/components/Video/VideoElement'
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerElement from "../src/components/Video/PeerElement";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { useEffect } from "react";
const Home: NextPage = () => {
  const huddleClient = getHuddleClient();
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const roomState = useHuddleStore((state) => state.roomState);
  const recordingState = useHuddleStore((state) => state.recordingState);
  const recordings = useHuddleStore((state) => state.recordings);
  const { address } = useAccount();
  const joinroom = async ()=>{
    //console.log();

    try {
      await huddleClient.join("dev", {
        address: address,
        wallet: "MetaMask",
      });
      
      console.log("joined");
      huddleClient.allowAllLobbyPeersToJoinRoom();
    } catch (error) {
      console.log({ error });
    }
  }

  

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
     
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <Navbar />
      </div>

      <main className="flex w-full flex-1 flex-col items-center px-20 text-center">
    
      <div className="h-[90vh]">
      <div className="flex w-[85%] m-auto gap-4 my-[4px]">
        {" "}
        <button className="flex flex-col items-center font-semibold justify-center w-40 h-12 bg-black text-white rounded-full"
 onClick={joinroom}>
          Join Room
        </button>
        <button
          className="flex flex-col items-center font-semibold justify-center w-40 h-12 bg-black text-white rounded-full"
                                     onClick={() => {
            huddleClient.startLiveStreaming({
              platform: "livepeer",
            });
          }}
        >
          Start Live Streaming!
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 w-[85%] m-auto justify-between">
        {" "}
        <VideoElement />
        {peersKeys.map((key) => (
          <PeerElement key={`peerId-${key}`} peerIdAtIndex={key} />
        ))}
      </div>
    </div>
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
