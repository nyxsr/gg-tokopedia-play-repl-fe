import urls from "@/constant/urls";
import useGet from "@/hooks/useGet";
import AuthCredentials from "@/service/auth/AuthCredentials";
import headerWithBearer from "@/utils/headerWithBearer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiQuestionMark } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import usePost from "@/hooks/usePost";

function EditVideo({setModalCreator}) {
  const Auth = new AuthCredentials();
  const [data, setData] = useState({
    id:"",
    title: "",
    urlThumbnail: "",
    src: "",
    videoCategory: "",
  }); 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [videoOpt,setVideoOpt] = useState([])

  const { data: categoryData } = useGet(urls.baseUrl + "video-category");
  const { data: dealsCatData } = useGet(
    urls.baseUrl + "deals-category",
    null,
    true
  );

  async function getUserVideo() {
    try {
        const response = await axios.post(urls.baseUrl + 'videos/search',{ creator: Auth.getCredentials()._id })
        setVideoOpt(response.data.data)
    } catch (error) {
        console.error(error);
    }
  }

  function handleSelectVideo(e) {
    const {value} = e.target
    const parsed = JSON.parse(value)

    setData({
        id:parsed._id,
        title:parsed.title,
        urlThumbnail:parsed.urlThumbnail,
        src:parsed.src,
        videoCategory:parsed.videoCategory._id,
        dealsCategory:parsed.dealsCategory
    })

    setValue('title',parsed.title)
    setValue('urlThumbnail',parsed.urlThumbnail)
    setValue('src',parsed.src)
    setValue('videoCategory',parsed.videoCategory._id)
    setValue('dealsCategory',JSON.stringify(parsed.dealsCategory))
  }

 

  async function onEdit(formdata) {
    const tanya = confirm("Apakah anda yakin ?");
    if (!tanya) return;

    const dealsCategory = JSON.parse(formdata.dealsCategory)

    formdata.dealsCategory = dealsCategory._id

    try {
      await axios.put(urls.baseUrl + "videos/" + data.id, formdata, headerWithBearer());
      navigate(0);
    } catch (error) {
      console.log(error);
      alert(error.response.data.meta.message);
    }
  }

  function handleChangeDealsCategory(e) {
    setData({...data,dealsCategory:JSON.parse(e.target.value)})
  }

  useEffect(()=>{
    getUserVideo()
  },[])
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-2 min-w-[80vw] text-black bg-white shadow-md rounded-lg"
    >
      <p className="font-medium">Edit Video</p>
      <select onChange={handleSelectVideo} name="" id="" className="border px-2 py-1 rounded-md text-sm">
        <option value="">Pilih Video</option>
        {videoOpt?.map((video)=>(
            <option key={video._id} value={JSON.stringify(video)}>{video.title}</option>
        ))}
      </select>
      <div className="flex justify-between">
        <form
          onSubmit={handleSubmit(onEdit)}
          className=" w-[70%] mt-3 flex flex-col gap-3"
        >
          <div>
            <label htmlFor="" className="text-sm">
              Judul<span className="text-red-500">*</span>
            </label>
            <input
              {...register("title", { required: "Judul wajib diisi!" })}
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              type="text"
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              URL Thumbnail<span className="text-red-500">*</span>
            </label>
            <input
              {...register("urlThumbnail", {
                required: "URL Thumbnail wajib diisi!",
              })}
              value={data.urlThumbnail}
              onChange={(e) =>
                setData({ ...data, urlThumbnail: e.target.value })
              }
              type="text"
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label htmlFor="" className="text-sm">
                URL Video Embed<span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://support.google.com/youtube/answer/171780?hl=en"
                  )
                }
                className="rounded-full p-0.5 border bg-black text-white text-sm"
              >
                <BiQuestionMark />
              </button>
            </div>
            <input
              {...register("src", { required: "URL Video Embed wajib diisi!" })}
              value={data.src}
              onChange={(e) => setData({ ...data, src: e.target.value })}
              type="text"
              placeholder="https://www.youtube.com/embed/xxxxxxxx"
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Kategori Video<span className="text-red-500">*</span>
            </label>
            <select
              {...register("videoCategory", {
                required: "Kategori wajib diisi!",
              })}
              value={data.videoCategory}
              onChange={(e) =>
                setData({ ...data, videoCategory: e.target.value })
              }
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              {categoryData?.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Kategori Deals<span className="text-red-500">*</span>
            </label>
            <select
              {...register("dealsCategory", {
                required: "Kategori wajib diisi!",
              })}
              value={JSON.stringify(data.dealsCategory)}
              onChange={(e) =>
                handleChangeDealsCategory(e)
              }
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              {dealsCatData?.map((cat) => (
                <option value={JSON.stringify(cat)} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 text-sm">
            <button type="button" onClick={()=>setModalCreator({is:false})} className="w-[5rem] border rounded-lg py-2">Kembali</button>
            <button type="submit" className="w-[5rem] border rounded-lg bg-green-500 py-2">
              Simpan
            </button>
          </div>
        </form>
        <motion.div className="w-[25%] md:h-[25rem] rounded-lg relative cursor-pointer">
          <motion.img
            initial={{ filter: "blur(5px)" }}
            animate={{
              filter: "blur(0px)",
              transition: {
                delay: 0.3,
              },
            }}
            src={
              data.urlThumbnail !== ""
                ? data.urlThumbnail
                : "https://picsum.photos/400/600"
            }
            className="rounded-lg h-full w-full object-cover"
            alt=""
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.3,
              },
            }}
            className="bg-gradient-to-b flex flex-col justify-end px-3 from-transparent to-black/80 absolute bottom-0 h-[40%] pb-5 rounded-b-lg w-full"
          >
            <p className="text-sm mt-1 text-white">
              {data.title !== "" ? data.title : "Judul anda"}
            </p>
            <p className="text-xs text-white/80">
              {Auth.getCredentials().name}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default EditVideo;
