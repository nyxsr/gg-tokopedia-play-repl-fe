import AuthCredentials from "@/service/auth/AuthCredentials"

export default function headerWithBearer() {
    return {
        headers:{
            Authorization: 'Bearer ' + new AuthCredentials().getToken() 
        }
    }
}