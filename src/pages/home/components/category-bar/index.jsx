/* eslint-disable react-hooks/rules-of-hooks */
import urls from "@/constant/urls";
import useGet from "@/hooks/useGet";
import { useEffect } from "react";

function index({ category, setCategory }) {
  const { data, success } = useGet(urls.baseUrl + "video-category");

  // useEffect(()=>{
  //     setCategory(data[0]?.name)
  // },[success])
  return (
    <div className="flex items-center gap-2 mt-5 flex-wrap">
      <button
        className={`px-3 py-1.5 border rounded-2xl ${
          category === "all" &&
          "border-green-500 text-green-500 bg-green-500/10"
        }`}
        onClick={() => setCategory("all")}
      >
        Semua Video
      </button>
      <button
        className={`px-3 py-1.5 border rounded-2xl ${
          category === "newest" &&
          "border-green-500 text-green-500 bg-green-500/10"
        }`}
        onClick={() => setCategory("newest")}
      >
        Terbaru
      </button>
      {data.map((cat) => (
        <button
          key={cat._id}
          className={`px-3 py-1.5 border rounded-2xl ${
            category === cat.name &&
            "border-green-500 text-green-500 bg-green-500/10"
          }`}
          onClick={() => setCategory(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default index;
