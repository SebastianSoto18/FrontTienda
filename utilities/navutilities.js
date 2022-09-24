import {user_service} from "../services/user_services.js"

function decoteJWT(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

const data = await user_service.getuser(decoteJWT(document.cookie.split("=")[1].substring(0, document.cookie.split("=")[1].length - 1))["user_id"]).catch((err) => { window.location.href = "https://sebastiansoto18.github.io/FrontTienda/index.html"; return });
const user = await data.json();

const {name, email} = user;

export const data_user = {name,email};

document.getElementById("user_name").innerHTML = name;
document.getElementById("user_email").innerHTML = email;

const logout = document.getElementById("salir");

logout.addEventListener("click", () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    });
