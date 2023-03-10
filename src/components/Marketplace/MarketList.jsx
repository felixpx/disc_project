import { useRouter } from "next/router";

const products = [
  {
    id: 1,
    title: "Anytime EP",
    artist: "Violeta Telavia",
    href: "#",
    imageSrc: "/img/VG-1440.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "0.2 ETH",
  },
  {
    id: 1,
    title: "Sex In The City Single",
    artist: "Violeta Telavia",
    href: "#",
    imageSrc: "/img/sexinthecity.JPG",

    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "0.7 ETH",
  },
  {
    id: 1,
    title: "Sex In The City Single",
    artist: "Violeta Telavia",
    href: "#",
    imageSrc: "/img/sexinthecity.JPG",

    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "0.17 ETH",
  },

  // More products...
];

export default function Marketlist() {
  const router = useRouter();
  async function purchaseItem() {
    // Contract Call ETC
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">OPEN MARKET</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div
                onClick={() => {
                  router.push("/item/sexinthecity");
                }}
                className="relative cursor-pointer hover:bg-gray-100 rounded-xl pb-4"
              >
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.title}
                  </h3>
                  <p
                    onClick={() => {
                      router.push("/artist/violetatelavia");
                    }}
                    className="mt-1 text-sm text-gray-500"
                  >
                    {product.artist}
                  </p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">
                    {product.price}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  onClick={purchaseItem}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 -mt-4 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Purchase<span className="sr-only">, {product.title}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
