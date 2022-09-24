import  {login_services}  from "../services/login_services.js";


const form =  document.getElementById("login");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        let token = await login_services.login(email, password);
        
        if (token != null){
            token = await token.json();
            document.cookie = "token="+token.access_token;
            window.location.href = "https://sebastiansoto18.github.io/FrontTienda/pages/home.html";
        }else{
            Swal.fire({
                text:"Usuario o contraseña incorrectos"+'!',
                icon: "error"
            });
            document.getElementById("username").value="";
            document.getElementById("password").value="";
        }

    });


