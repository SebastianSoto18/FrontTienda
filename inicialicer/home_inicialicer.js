import {user_service} from "../services/user_services.js";
import {user_id} from "../inicialicer/general_inicialicer.js";

console.log(user_id);

const user = await user_service.getuser(user_id);


document.getElementById("user_name").innerHTML = user.name;
document.getElementById("user_mail").innerHTML = user.email;


