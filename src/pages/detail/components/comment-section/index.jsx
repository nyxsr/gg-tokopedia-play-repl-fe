/* eslint-disable react-hooks/rules-of-hooks */
import urls from "@/constant/urls";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import randomColor from "@/utils/colorRandomizer";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoClose, IoSend } from "react-icons/io5";
import io from 'socket.io-client'
import CommentItem from "./components/CommentItem";
import AuthCredentials from "@/service/auth/AuthCredentials";
const socket = io('http://localhost:3000')

function index({ id, setToggleComments }) {
  const { data, loading, success, error} = useGet(
    urls.baseUrl + "videos/comments/" + id
  );
  const Auth = new AuthCredentials

  const endMessage = useRef(null)

  const [newComment, setNewComment] = useState({
    username: Auth.getCredentials() ? Auth.getCredentials().username : "",
    comment: "",
    video:id
  });

  const [comments,setComments] = useState([])

  async function handleSendComment() {
     try {
        socket.emit("send_comments",newComment)
        setNewComment({
            username:"",
            comment:"",
            video:id
        })
     } catch (error) {
        console.log(error);
     }
  }

  useEffect(()=>{
    setComments(data.comments)
  },[success])

  useEffect(()=>{
    socket.on('new_comment',(comment)=>{
        setComments([...comments,...comment])
        endMessage.current?.scrollIntoView({behavior:"smooth"})
    })
  },[])


  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "20rem" }}
      exit={{ width: 0 }}
      className="fixed shadow-xl top-0 flex flex-col flex-wrap right-0 h-screen bg-[#1c1c1c] z-20"
    >
      <div className="h-[85%] w-full relative">
        <button
          onClick={() => setToggleComments(false)}
          className="text-2xl p-2 text-white"
        >
          <IoClose />
        </button>
        <div
          className={`h-[90%] overflow-y-scroll no-scrollbar w-full flex flex-col ${
            success &&
            comments?.length === 0 &&
            "items-center justify-center"
          }`}
        >
          {loading && (
            <p className="text-center text-gray-500">Memuat Komentar...</p>
          )}
          {error && (
            <p className="text-center text-gray-500">Gagal memuat komentar</p>
          )}
          {success && comments?.length === 0 && (
            <>
              <p className="text-center text-gray-500">
                Belum ada yang berkomentar
              </p>
              <p></p>
            </>
          )}
          {success &&
            comments?.length !== 0 &&
            comments?.map((comment) => (
                <CommentItem key={comment._id} comment={comment}/>
            ))}
            <div ref={endMessage}/>
        </div>
      </div>
      <div className="h-[15%] text-white border-t w-full relative">
        <input
        disabled={Auth.getCredentials()}
          onChange={(e) =>
            setNewComment({ ...newComment, username: e.target.value })
          }
          value={newComment.username}
          type="text"
          placeholder="Username"
          className="bg-transparent font-semibold border-b focus:outline-none mx-2 h-[20%] text-sm"
        />
        <textarea
          onChange={(e) =>
            setNewComment({ ...newComment, comment: e.target.value })
          }
          onKeyDown={(e)=>{
            if (e.key === 'Enter') {
                handleSendComment()
            }
          }}
          value={newComment.comment}
          name=""
          id=""
          className="w-full h-[80%] resize-none bg-transparent outline-none p-2 placeholder:italic placeholder:text-sm text-sm"
          placeholder="Tambahkan komentar..."
        ></textarea>
        <div className="absolute bottom-2 right-2">
          <button onClick={handleSendComment} className="p-1 rounded-full bg-green-500">
            <IoSend />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default index;
