import  {login_services}  from "../services/login_services.js";

const singup = document.getElementById("enviar");

singup.addEventListener("click",async  (e) => {

    e.preventDefault();

    const email = document.getElementById("emailregis").value;
    const password = document.getElementById("passwordregis").value;
    const confirm_password = document.getElementById("cpassword").value;
    const name = document.getElementById("usernameregis").value;
    const phone = document.getElementById("phone").value;

    if( !(email != "" && password != "" && confirm_password != "" && name != ""  && phone != "")){
        Swal.fire({
            text:"Por favor llene todos los campos"+'!',
            icon: "error"
        });
        return;
    }

    if(password != confirm_password){
        Swal.fire({
            text:"Las contraseñas no coinciden"+'!',
            icon: "error"
        });
        return;
    }


    const code= await login_services.register(email, password, name, phone).then( response => response.status );
        
    if (!(code == 201)){
        if(code == 400){
            Swal.fire({
                text:"El correo ya se encuentra registrado"+'!',
                icon: "error"
            });
            
            return;
        }
    }

    await Swal.fire({
        text:"Usuario registrado con exito"+'!',
        icon: "success"
    });


    window.location.href = "https://sebastiansoto18.github.io/FrontTienda/index.html";

});