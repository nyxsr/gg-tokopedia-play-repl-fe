import Cookies from "js-cookie";

export default class AuthCredentials {
  getToken() {
    const get = Cookies.get("access_token");
    return get;
  }

  getCredentials() {
    const credentials = Cookies.get("credentials");
    if (!credentials) {
      return null;
    }

    try {
      const get = JSON.parse(credentials);
      return get;
    } catch (error) {
      console.error("Error parsing 'data-credentials' cookie:", error);
      return null;
    }
  }

  saveToken(token){
    Cookies.set('access_token',token)
  }

  saveCredentials(credentials){
    Cookies.set('credentials',JSON.stringify(credentials))
  }

  clearCookies(){
    Cookies.remove('credentials')
    Cookies.remove('access_token')
  }
}
