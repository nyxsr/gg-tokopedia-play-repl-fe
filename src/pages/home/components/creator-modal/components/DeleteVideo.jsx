import AuthCredentials from "@/service/auth/AuthCredentials";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "@/constant/urls";
import axios from "axios";
import ItemsVideo from "./ItemsVideos";
import { IoClose } from "react-icons/io5";

function DeleteVideo({ setModalCreator }) {
  const Auth = new AuthCredentials();

  const navigate = useNavigate();
  const [videoOpt, setVideoOpt] = useState([]);

  async function getUserVideo() {
    try {
      const response = await axios.post(urls.baseUrl + "videos/search", {
        creator: Auth.getCredentials()._id,
      });
      setVideoOpt(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function onDelete() {
    const tanya = confirm("Apakah anda yakin ?");
    if (!tanya) return;

    try {
      navigate(0);
    } catch (error) {
      console.log(error);
      alert(error.response.data.meta.message);
    }
  }

  useEffect(() => {
    getUserVideo();
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-2 min-w-[80vw] h-max text-black bg-white shadow-md md:rounded-lg"
    >
      <div className="flex mb-3 items-center justify-between">
        <p className="font-medium ">Pilih video yang akan dihapus</p>
        <button onClick={()=>setModalCreator({is:false})} className="text-2xl">
          <IoClose />
        </button>
      </div>
      <div className="flex gap-2 md:flex-row flex-col h-full">
        {videoOpt?.map((video) => (
          <ItemsVideo key={video._id} {...video} />
        ))}
      </div>
    </div>
  );
}

export default DeleteVideo;
