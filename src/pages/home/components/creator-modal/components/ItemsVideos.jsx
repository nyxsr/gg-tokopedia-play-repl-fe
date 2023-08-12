/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { IoRocketOutline } from "react-icons/io5";
import {TbDiscount2, TbTrash} from 'react-icons/tb'
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import useDelete from "@/hooks/useDelete";
import urls from "@/constant/urls";

function ItemsVideo({_id,urlThumbnail,videoCategory,isOnlyLive,dealsCategory,title,creator}) {

    const {doDelete} = useDelete()
    const navigate = useNavigate()

    async function handleDelete() {
        const tanya = confirm('Apakah anda yakin akan menghapus item ini ?')
        if(!tanya)return;

        try {
            doDelete(urls.baseUrl + 'videos/' + _id,true)
            navigate(0)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <motion.div className="md:w-[19.2%] group md:h-[25rem] bg-white/50 rounded-lg relative cursor-pointer">
        <button onClick={handleDelete} className="bg-red-500/50 opacity-0 group-hover:opacity-100 transition-all h-full w-full absolute top-0 text-white left-0 text-8xl z-10 rounded-md flex items-center justify-center">
            <TbTrash/>
        </button>
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

export default ItemsVideo;
