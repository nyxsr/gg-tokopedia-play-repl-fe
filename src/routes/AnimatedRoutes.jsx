import { AnimatePresence } from "framer-motion"
import { Navigate, Route, Routes } from "react-router-dom"
import HomeVideos from '../pages/home'
import DetailVideos from '../pages/detail'

function AnimatedRoutes() {
  return (
    <AnimatePresence>
        <Routes>
            <Route path="/" element={<Navigate to={'/videos'}/>}/>
            <Route path="videos">
                <Route index element={<HomeVideos/>}/>
                <Route path=":id" element={<DetailVideos/>}/>
            </Route>
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes