/* eslint-disable react-hooks/rules-of-hooks */
import urls from "@/constant/urls";
import useFormatter from "@/hooks/useFormatter";
import useGet from "@/hooks/useGet";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function index({ setToggleProducts }) {
  const { price } = useFormatter();
  const { data, loading, success, error } = useGet(urls.baseUrl + "products");
  return (
    <motion.div
      initial={{ width: 0, opacity: 0.8 }}
      exit={{ width: 0, opacity: 0 }}
      animate={{
        opacity: 1,
        width: "15rem",
        transition: {
          duration: 0.2,
        },
      }}
      className="fixed top-0 left-0 h-screen z-40 bg-black/50"
    >
      <div className={`relative w-full h-full`}>
        <div className="w-full flex justify-end p-3">
          <button
            onClick={() => setToggleProducts(false)}
            className="text-white text-3xl "
          >
            <IoClose />
          </button>
        </div>
        <div className="flex flex-col gap-5 items-center overflow-y-scroll no-scrollbar pb-24 h-full w-full">
          {loading && <p className="text-white ">Memuat data...</p>}
          {error && <p className="text-red ">Gagal Memuat data</p>}
          {success && data.length === 0 && (
            <p className="text-white ">Produk Kosong</p>
          )}
          {success &&
            data.length !== 0 &&
            data.map((product) => (
              <Link
                to={product.url}
                target="_blank"
                key={product._id}
                className="bg-white p-2 rounded-md w-[12rem] h-fit flex  justify-center flex-col"
              >
                <img
                  src={product.urlThumbnail}
                  className="w-full h-full rounded-md"
                  alt=""
                />
                <p className="font-semibold text-sm">{product.title}</p>
                <p className="text-sm text-right">{price(product.price)}</p>
              </Link>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default index;
