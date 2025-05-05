import Header from "../components/Header";
import Layout from "../components/Layout";

export default function Product() {
  return (
    <Layout>
      <Header />
      <div className="w-full md:px-14 sm:px-9 px-4 py-5 flex md:flex-row flex-col justify-center md:items-start items-center md:gap-10 sm:gap-6 gap-3 mt-6">
        <img
          src="/img-1.jpg"
          className="aspect-square w-96 h-96 rounded-3xl"
          alt="image"
        />
        <p className="text-white text-xl text-wrap font-semibold leading-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quae Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ex
          ipsam eveniet assumenda? Placeat mollitia fugit quod, nesciunt saepe
          explicabo?
        </p>
      </div>
    </Layout>
  );
}
