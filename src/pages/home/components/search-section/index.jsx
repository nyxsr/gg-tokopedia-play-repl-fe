import {motion} from 'framer-motion'
import { BsArrowLeft } from 'react-icons/bs'
import { IoSearchOutline } from 'react-icons/io5'
import SkeletonLoading from '../skeleton-loading'
import ItemVideo from '../items-video'

function index({handleSearch,searchData,stateLoad,setToggleSearch}) {
  return (
    <motion.div
    initial={{ x: "100%" }}
    animate={{
      x: 0,
      transition: {
        type: "tween",
      },
    }}
    exit={{ x: "100%" }}
    className="fixed top-0 left-0 w-screen z-10 h-screen"
  >
    <div className="bg-[#232327] w-full h-full px-5">
      <div className="flex text-2xl items-center gap-2">
        <button
          onClick={() => setToggleSearch(false)}
          className="flex text-2xl items-center gap-2 py-5"
        >
          <BsArrowLeft />
        </button>
        <div className="flex rounded-xl w-full px-2 text-sm items-center gap-2 bg-slate-500">
          <IoSearchOutline />
          <input
            onChange={handleSearch}
            type="text"
            className="p-2 w-full focus:outline-none bg-transparent text-white placeholder:text-white rounded-xl text-sm"
            placeholder="Cari video yang anda ingin tonton"
          />
        </div>
      </div>
      {(stateLoad === "success" &&
          searchData.length !== 0) && <p className="text-2xl font-semibold">{searchData.length} Hasil Pencarian</p>}
      
      <div className="flex items-center gap-3 mt-5 flex-wrap">
        {stateLoad === 'init' && <div/>}
        {stateLoad === "loading" && <SkeletonLoading />}
        {stateLoad === "fail" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl text-red-500 text-center w-full mt-24 font-extralight"
          >
            Terjadi masalah dengan server!
          </motion.p>
        )}
        {stateLoad === "success" && searchData.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl text-center w-full mt-24 font-extralight"
          >
            Tidak ada video yang dengan kata kunci ini!
          </motion.p>
        )}
        {(stateLoad === "success" &&
          searchData.length !== 0) &&
          searchData.map((video) => (
            <ItemVideo key={video._id} {...video} />
          ))}
      </div>
    </div>
  </motion.div>
  )
}

export default index