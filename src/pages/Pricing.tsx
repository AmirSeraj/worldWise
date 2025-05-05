import { Button } from "@heroui/react";
import Header from "../components/Header";
import Layout from "../components/Layout";

export default function Pricing() {
  return (
    <Layout>
      <Header />
      <div className="w-full md:px-14 sm:px-9 px-4 py-5 flex md:flex-row flex-col justify-center md:items-start items-center md:gap-10 sm:gap-6 gap-3 mt-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-white text-4xl font-bold leading-10">
            Simple Pricing.
            <br />
            Just $9/month.
          </h1>
          <p className="text-white text-xl text-wrap font-semibold leading-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quae Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
            ex ipsam eveniet assumenda? Placeat mollitia fugit quod, nesciunt
            saepe explicabo?
          </p>
          <Button className="uppercase mt-10 max-w-80" color="success">
            start tracking now
          </Button>
        </div>
        <img
          src="/img-2.jpg"
          className="aspect-square w-96 h-96 rounded-3xl"
          alt="image"
        />
      </div>
    </Layout>
  );
}
