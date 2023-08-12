/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";

function MaxLoadingScreen({ show=true}) {
  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed flex flex-col items-center  justify-center top-0 left-0 w-screen h-screen">
            <div className="flex items-center gap-2 justify-center">
            <motion.div initial={{ opacity:0,scale:.6 }} animate={{ opacity:1,scale:1,transition:{
                duration:1,
            } }} className="bg-white p-2 rounded-full"/>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1,scale:1,transition:{
                delay:1,
                duration:1
            } }} className="bg-green-200 p-2 rounded-full"/>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1,scale:1,transition:{
                delay:2,
                duration:1
            } }} className="bg-green-400 p-2 rounded-full"/>
            </div>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1,transition:{
                delay:3
            } }} className="text-white font-extralight animate-pulse">Sedang memuat...</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MaxLoadingScreen;
