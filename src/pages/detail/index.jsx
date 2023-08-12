/* eslint-disable react-hooks/rules-of-hooks */
import { Helmet } from "react-helmet"
import Detail from "./Detail"
import useGet from "@/hooks/useGet"
import urls from "@/constant/urls"
import { useParams } from "react-router-dom"
import MaxLoadingScreen from "@/shared/loading-screen/MaxLoadingScreen"

function index() {
    const {id} = useParams()
    const {data,success} = useGet(urls.baseUrl + 'videos/' + id)
  return (
    <>
    <MaxLoadingScreen show={!success}/>
      <Helmet>
        <title>{`${data?.title}`} | Nonton Video Asik</title>
      </Helmet>
      <Detail id={id} {...data}/>
    </>
  )
}

export default index
