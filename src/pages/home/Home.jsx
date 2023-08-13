import { useEffect, useState } from "react";
import CategoryBar from "./components/category-bar";
import ItemVideo from "./components/items-video";
import SkeletonLoading from "./components/skeleton-loading";
import { IoSearchOutline } from "react-icons/io5";
import useGet from "@/hooks/useGet";
import urls from "@/constant/urls";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import SearchSection from "./components/search-section";
import { RxHamburgerMenu } from "react-icons/rx";
import MenuSection from "./components/menu-section";
import CreatorModal from "./components/creator-modal";
import AuthCredentials from "@/service/auth/AuthCredentials";
import { MdAddBox, MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { isMobile } from "react-device-detect";

function Home() {
  const Auth = new AuthCredentials();
  const credentials = Auth.getCredentials();
  const [category, setCategory] = useState("newest");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { data, success, loading, error, refetch } = useGet(
    urls.baseUrl + "videos",
    category === "all" ? {} : { videoCategory: category }
  );
  const [searchData, setSearchData] = useState([]);
  const [stateLoad, setStateLoad] = useState("init");
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleCreator, setToggleCreator] = useState(false);
  const [modalCreator, setModalCreator] = useState({
    is: false,
    type: "",
  });

  async function handleSearch(e) {
    setSearchQuery(e.target.value);
    if (e.target.value < 2) {
      setStateLoad("init");
    }
  }

  async function doSearch() {
    if (searchQuery.length > 2) {
      setStateLoad("loading");
      try {
        const response = await axios.post(urls.baseUrl + "videos/search", {
          title: { $regex: searchQuery, $options: "i" },
        });
        setSearchData(response.data.data);
        setStateLoad("success");
      } catch (error) {
        setStateLoad("fail");
        console.log(error);
      }
    }
  }

  useEffect(() => {
    doSearch();
  }, [searchQuery]);

  useEffect(() => {
    refetch();
  }, [category]);
  return (
    <div className="text-white mx-5 mb-5">
      <AnimatePresence>
        {toggleSearch && (
          <SearchSection
            handleSearch={handleSearch}
            searchData={searchData}
            setToggleSearch={setToggleSearch}
            stateLoad={stateLoad}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toggleMenu && <MenuSection setToggleMenu={setToggleMenu} />}
      </AnimatePresence>
      <AnimatePresence>
        {modalCreator.is && (
          <CreatorModal
            modalCreator={modalCreator}
            setModalCreator={setModalCreator}
          />
        )}
      </AnimatePresence>
      <div className="flex text-2xl items-center justify-between gap-2">
        <div className="flex text-2xl items-center gap-4 py-5">
          <button
            onClick={() => setToggleMenu(true)}
            className="text-white/70 hover:text-white transition-all"
          >
            <RxHamburgerMenu />
          </button>
          {credentials ? (
              <button onClick={()=>setToggleMenu(true)} className="w-[3rem] h-[3rem] rounded-full">
                <img
                  src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${credentials.username}`}
                  className="h-fit w-fit rounded-full"
                  alt=""
                />
              </button>
          ) : (
            <p className="font-semibold text-base">Tokopedia Play</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {credentials && (
            <>
              <div className="relative">
                <button
                  onClick={() => setToggleCreator(toggleCreator ? false : true)}
                  className="p-2 border rounded-xl text-xs md:text-sm border-green-500 bg-green-500/30 text-green-500"
                >
                  {isMobile ? "Creator" : "Creator Mode"}
                </button>
                <AnimatePresence>
                  {toggleCreator && (
                    <motion.div
                      initial={{ x: 100, opacity: 0, scale: 0.5, y: -30 }}
                      animate={{ x: 0, opacity: 1, scale: 1, y: 0 }}
                      exit={{ x: 100, opacity: 0, scale: 0.5, y: -30 }}
                      className="gap-2 z-10 absolute flex items-center justify-center -bottom-24 -left-[12rem] md:-left-[20rem] p-4 bg-[#232327] rounded-md"
                    >
                      <motion.button
                        onClick={() => {
                          setModalCreator({ is: true, type: "add" });
                          setToggleCreator(false);
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white transition-all hover:bg-white/80 w-[5rem] md:text-sm md:w-[8rem] text-black p-1 rounded-md flex flex-col items-center gap-2"
                      >
                        <MdAddBox />
                        <p className="text-sm text-center">
                          {isMobile ? "Tambah" : "Tambah Video"}{" "}
                        </p>
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setModalCreator({ is: true, type: "edit" });
                          setToggleCreator(false);
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white transition-all hover:bg-white/80 w-[5rem] md:text-sm md:w-[8rem] text-black p-1 rounded-md flex flex-col items-center gap-2"
                      >
                        <BiEdit />
                        <p className="text-sm text-center">
                          {isMobile ? "Edit" : "Edit Video"}{" "}
                        </p>
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setModalCreator({ is: true, type: "delete" });
                          setToggleCreator(false);
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white transition-all hover:bg-white/80 w-[5rem] md:text-sm md:w-[8rem] text-black p-1 rounded-md flex flex-col items-center gap-2"
                      >
                        <MdDeleteForever />
                        <p className="text-sm text-center">
                          {isMobile ? "Hapus" : "Hapus Video"}{" "}
                        </p>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
          <button
            onClick={() => setToggleSearch(true)}
            className="text-xl hover:text-gray-100 transition-all py-5 text-gray-300"
          >
            <IoSearchOutline />
          </button>
        </div>
      </div>
      <CategoryBar category={category} setCategory={setCategory} />
      <div className="flex items-center gap-3 mt-5 flex-wrap">
        {loading && <SkeletonLoading />}
        {success && data.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl text-center w-full mt-24 font-extralight"
          >
            Belum ada video yang diupload!
          </motion.p>
        )}
        {success &&
          data.length !== 0 &&
          data.map((video) => <ItemVideo key={video._id} {...video} />)}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl text-red-500 text-center w-full mt-24 font-extralight"
          >
            Terjadi masalah dengan server!
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default Home;
