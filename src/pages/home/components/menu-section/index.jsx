/* eslint-disable react-hooks/rules-of-hooks */
import urls from "@/constant/urls";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { RiUser5Fill } from "react-icons/ri";
import AuthCredentials from "@/service/auth/AuthCredentials";
import {isMobile} from 'react-device-detect'

function index({ setToggleMenu }) {
  const Auth = new AuthCredentials();
  const credentials = Auth.getCredentials();
  const [mode, setMode] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onLogin(data) {
    try {
      const response = await axios.post(urls.baseUrl + "auth/login", data);
      Auth.saveToken(response.data.data.token);
      Auth.saveCredentials(response.data.data.user);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.meta.message);
      console.log(error);
    }
  }

  async function onRegister(data) {
    try {
      const response = await axios.post(urls.baseUrl + 'auth/register',data)
      Auth.saveToken(response.data.data.token);
      Auth.saveCredentials(response.data.data.user);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.meta.message);
      console.log(error);
    }
  }

  async function handleLogout() {
    Auth.clearCookies();
    window.location.href = "/";
  }

  return (
    <motion.div
      onClick={() => setToggleMenu(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-screen h-screen bg-white/50 z-10"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ width: 0 }}
        animate={{ width: isMobile ? "100%" : "25%" }}
        exit={{ width: 0 }}
        className="h-full relative flex gap-5 flex-col items-center px-3 justify-center bg-[#232327]"
      >
        <motion.button
          onClick={() => setToggleMenu(false)}
          className="absolute top-3 right-3 text-3xl"
        >
          <IoClose />
        </motion.button>
        {!Auth.getCredentials() ? (
          <>
            {mode === "" && (
              <>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                    },
                  }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMode("login");
                  }}
                  className="rounded-xl text-xs px-3 py-2 border gap-2 flex items-center bg-white/25"
                >
                  <RiUser5Fill />
                  Masuk sebagai creator video
                </motion.button>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                    },
                  }}
                  exit={{ opacity: 0 }}
                >
                  atau
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                    },
                  }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setMode("signup")}
                  className="rounded-xl text-xs px-3 py-2 border gap-2 flex items-center"
                >
                  <RiUser5Fill />
                  Bergabung menjadi creator
                </motion.button>
              </>
            )}
            {mode === "login" && (
              <form
                onSubmit={handleSubmit(onLogin)}
                className="w-full flex flex-col gap-4"
              >
                <div>
                  <p className="text-3xl font-medium">Halo!</p>
                  <p className="">Sangat senang melihatmu kembali</p>
                </div>
                <div>
                  <input
                    {...register("username", {
                      required: "Username wajib diisi",
                    })}
                    type="text"
                    placeholder="Username"
                    className="p-2 border focus:outline-green-500 bg-transparent w-full rounded-xl border-white"
                  />
                  {errors.username && <small>{errors.username.message}</small>}
                </div>
                <div>
                  <input
                    {...register("password", {
                      required: "Password wajib diisi",
                    })}
                    type="password"
                    placeholder="Password"
                    className="p-2 w-full focus:outline-green-500 bg-transparent border rounded-xl border-white"
                  />
                  {errors.password && <small>{errors.password.message}</small>}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-white text-black font-bold py-3"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => setMode("")}
                  className="w-full rounded-xl bg-black text-white font-bold py-3"
                >
                  Kembali
                </button>
              </form>
            )}
            {mode === "signup" && (
              <form onSubmit={handleSubmit(onRegister)} className="w-full flex flex-col gap-4">
                <div>
                  <p className="text-3xl font-medium">Ayo Bergabung!</p>
                  <p className="">Menjadi kreator video disini!</p>
                </div>
                <div>

                <input
                {...register('name',{required:'Nama wajib diisi!'})}
                type="text"
                placeholder="Nama Lengkap"
                className="p-2 border bg-transparent w-full rounded-xl border-white"
                />
                 {errors.name && <small>{errors.name.message}</small>}
                </div>
                <div>

                <input
                {...register('username',{required:'Username wajib diisi!'})}
                type="text"
                placeholder="username"
                className="p-2 border bg-transparent w-full rounded-xl border-white"
                />
                 {errors.username && <small>{errors.username.message}</small>}
                </div>
                <div>

                <input
                {...register('password',{required:'Password wajib diisi!'})}
                type="password"
                placeholder="password"
                className="p-2 w-full bg-transparent border rounded-xl border-white"
                />
                 {errors.password && <small>{errors.password.message}</small>}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-white text-black font-bold py-3"
                >
                  Daftar
                </button>
                <button
                  type="button"
                  onClick={() => setMode("")}
                  className="w-full rounded-xl bg-black text-white font-bold py-3"
                >
                  Kembali
                </button>
              </form>
            )}
          </>
        ) : (
          <div>
            <img
              src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${credentials.username}`}
              className="rounded-full mx-auto h-[8rem] w-[8rem]"
              alt=""
            />
            {credentials.isOfficialStore && (
              <p className="bg-green-500 text-center mx-auto w-fit text-xs p-1 rounded-xl text-white">
                Official Store
              </p>
            )}
            <p className="text-center text-2xl font-medium">
              {credentials.name}
            </p>
            <p className="text-center">{credentials.username}</p>
            <button
              onClick={handleLogout}
              className="bg-[#fafafa] text-black w-full rounded-md text-sm py-2 mt-4 font-semibold transition-colors hover:bg-[#d9d9d9]"
            >
              Keluar
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default index;
