import axios from "axios";
import Cookies from "js-cookie";

export const setCookie = async(email, privateKey) => {
    console.log(email,privateKey)
  return axios
    .post("http://localhost:8000/user/generateJWT", {
      email,
      privateKey,
    })
    .then((r) => {
      Cookies.set("myCookie", JSON.stringify({
        jwt:r.data,
        email:email
      }), { expires: 1 });
    //   }), { expires: 10 / (24 * 60 * 60) });
      return true;
    }).catch(e=>{
        console.log(e)
        alert(e.response.data)
        return false
    });
};

export const authorizeCookie = async () => {
  const cookie = JSON.parse(Cookies.get("myCookie"));
  console.log(cookie.jwt)
  if(cookie){
    const email=cookie.email
    const jwt=cookie.jwt
    if (jwt) {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/validateJWT",
          {
            email,
            jwt,
          }
          );
          return response;
        } catch (e) {
          console.log(e);
          return false;
        }
      } else {
        return false;
      }
    } else{
      return false;
    }
};
