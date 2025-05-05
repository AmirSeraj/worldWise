import { Button } from "@heroui/react";
import Header from "../components/Header";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Header />
      <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)]">
        <h1 className="text-center text-white text-5xl font-bold">
          You travel the world.
          <br />
          WorldWise keeps track of your <br /> adventures.
        </h1>
        <p className="text-center text-white text-xl mt-3">
          A world map that tracks your footsteps into every city you can think
          of. never forget <br /> your wonderful eperiences, and show your
          friends how you haave wondered the <br /> world.
        </p>

        <Button className="uppercase mt-10" color="success">
          start tracking now
        </Button>
      </div>
    </Layout>
  );
}
