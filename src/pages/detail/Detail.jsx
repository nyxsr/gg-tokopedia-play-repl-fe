/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { BsChevronCompactLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ProductsSection from './components/product-section'
import CommentsSection from './components/comment-section'
import { isMobile } from "react-device-detect";

function Detail({id, urlThumbnail, src }) {
    const navigate = useNavigate();
  const [toggleComments, setToggleComments] = useState(false);
  const [toggleProducts, setToggleProducts] = useState(false);
  return (
    <motion.div className="w-screen relative h-screen flex items-center justify-center">
      <div
        className="w-full h-full fixed top-0 left-0 filter blur-md brightness-50"
        style={{ background: `url(${urlThumbnail})`,backgroundSize:'cover' }}
      />
      <AnimatePresence>
      {!toggleProducts && <motion.button exit={{ x:-100 }} animate={{ x:0,transition:{
        duration:.3,
        ease:'linear'
      } }} initial={{ x:-100 }} className="fixed top-5 left-5 text-4xl text-white md:z-30 z-[11] hover:scale-105 transition-all" onClick={()=>navigate('/videos')}><IoClose/></motion.button>}
      </AnimatePresence>
      <iframe
        className="relative md:w-[80vw] w-screen h-[80vh] md:min-h-[70vh] rounded-md z-10"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      {!toggleProducts && (
        <motion.div
          onClick={() => setToggleProducts(true)}
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          className="cursor-pointer fixed text-8xl text-white left-0 top-0 h-screen w-[10%] bg-gradient-to-l from-transparent to-black/50"
        >
          <motion.div
            initial={{ x: isMobile ? 0 : -75, opacity: isMobile ? .8 : 0.5 }}
            whileHover={{ x: 0, opacity: 1 }}
            className="h-full flex items-center justify-center w-full"
          >
            <BsChevronCompactLeft />
          </motion.div>
        </motion.div>
      )}
      {!toggleComments && (
        <button onClick={()=>setToggleComments(true)} className="fixed z-20 bottom-2 right-2 p-2 flex items-center gap-2 text-sm bg-white rounded-md">
          <GoCommentDiscussion /> Lihat Komentar
        </button>
      )}
      <AnimatePresence>
        {toggleProducts && (
          <ProductsSection setToggleProducts={setToggleProducts}/>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toggleComments && (
          <CommentsSection id={id} setToggleComments={setToggleComments}/>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Detail;
