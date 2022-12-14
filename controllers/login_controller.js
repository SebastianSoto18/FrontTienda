import  {login_services}  from "../services/login_services.js";


const form =  document.getElementById("login");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        let token = await login_services.login(email, password);


        if(token.status!=200){          

            Swal.fire({
                text:"usuario o contraseña incorrectos",
                icon:"error"
            })
            return;
        }


        const data = await token.json();
        document.cookie = "token="+data.access_token;
        window.location.href = "https://sebastiansoto18.github.io/FrontTienda/pages/home";

        

    });


