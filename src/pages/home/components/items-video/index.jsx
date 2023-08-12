/* eslint-disable react-hooks/rules-of-hooks */
import { IoRocketOutline } from "react-icons/io5";
import {TbDiscount2} from 'react-icons/tb'
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";

function index({_id,urlThumbnail,videoCategory,isOnlyLive,dealsCategory,title,creator}) {
  const navigate = useNavigate()
  return (
    <motion.div onClick={()=>navigate(_id)} className="md:w-[19.2%] md:h-[25rem] bg-white/50 rounded-lg relative cursor-pointer">
      <div className="absolute top-2 left-2">
        {videoCategory?.name === 'Live' && (
        <span className="text-xs p-1 rounded-md tracking-tighter font-bold bg-red-500">
          LIVE
        </span>
        )}
      </div>
      <motion.img
      initial={{ filter:'blur(5px)' }}
      animate={{ filter: 'blur(0px)',transition:{
          delay:.3
      } }}
        src={urlThumbnail}
        className="rounded-lg h-full w-full object-cover"
        alt=""
      />
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1,transition:{
        delay:.3
      } }} className="bg-gradient-to-b flex flex-col justify-end px-3 from-transparent to-black/80 absolute bottom-0 h-[40%] pb-5 rounded-b-lg w-full">
        {isOnlyLive && (
        <button className="w-fit text-[8px] font-medium p-1 bg-red-500 rounded-lg">
          Hanya saat LIVE
        </button>
        )}
        {dealsCategory?.kind === 'rilis' && (
        <button className="w-fit text-xs font-medium p-1 bg-green-500 rounded-lg flex items-center gap-1">
          <IoRocketOutline />
          {dealsCategory?.name}
        </button>
        )}
        {dealsCategory?.kind === 'promo' && (
        <button className="w-fit text-xs font-medium p-1 bg-green-500 rounded-lg flex items-center gap-1">
          <TbDiscount2 />
          {dealsCategory?.name}
        </button>
        )}
        <p className="text-sm mt-1 text-white">{title}</p>
        <p className="text-xs text-white/80">{creator?.name}</p>
      </motion.div>
    </motion.div>
  );
}

export default index;
