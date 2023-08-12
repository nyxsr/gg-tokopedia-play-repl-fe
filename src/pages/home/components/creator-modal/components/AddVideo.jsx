/* eslint-disable react/prop-types */
import urls from "@/constant/urls";
import useGet from "@/hooks/useGet";
import AuthCredentials from "@/service/auth/AuthCredentials";
import headerWithBearer from "@/utils/headerWithBearer";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiQuestionMark } from "react-icons/bi";
import { IoRocketOutline } from "react-icons/io5";
import { TbDiscount2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function AddVideo({ setModalCreator }) {
  const Auth = new AuthCredentials();
  const [data, setData] = useState({
    title: "",
    urlThumbnail: "",
    src: "",
    videoCategory: "",
    dealsCategory: null,
  });

  const navigate = useNavigate();

  const { data: categoryData } = useGet(urls.baseUrl + "video-category");
  const { data: dealsCatData } = useGet(
    urls.baseUrl + "deals-category",
    null,
    true
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onAdd(data) {
    const tanya = confirm("Apakah anda yakin ?");
    if (!tanya) return;

    const dealsCategory = JSON.parse(data.dealsCategory)

    data.dealsCategory = dealsCategory._id
    data.creator = Auth.getCredentials()._id;

    try {
      await axios.post(urls.baseUrl + "videos", data, headerWithBearer());
      navigate(0);
    } catch (error) {
      console.log(error);
      alert(error.response.data.meta.message);
    }
  }

  function handleChangeDealsCategory(e) {
    setData({...data,dealsCategory:JSON.parse(e.target.value)})
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-2 min-w-[80vw] text-black bg-white shadow-md rounded-lg"
    >
      <p className="font-medium">Tambah Video</p>
      <div className="flex justify-between">
        <form
          onSubmit={handleSubmit(onAdd)}
          className="w-[70%] mt-3 flex flex-col gap-3"
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
            <button
              type="button"
              onClick={() => setModalCreator({ is: false })}
              className="w-[5rem] border rounded-lg py-2"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="w-[5rem] border rounded-lg bg-green-500 py-2"
            >
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
            {data.dealsCategory?.kind === "rilis" && (
              <button className="w-fit text-xs font-medium p-1 bg-green-500 rounded-lg flex items-center gap-1">
                <IoRocketOutline />
                {data.dealsCategory?.name}
              </button>
            )}
            {data.dealsCategory?.kind === "promo" && (
              <button className="w-fit text-xs font-medium p-1 bg-green-500 rounded-lg flex items-center gap-1">
                <TbDiscount2 />
                {data.dealsCategory?.name}
              </button>
            )}
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

export default AddVideo;
