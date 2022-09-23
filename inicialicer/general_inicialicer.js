

function decodeToken (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    print(1)
    return JSON.parse(window.atob(base64));
}


try{
    const token = document.cookie.split("=")[1];
}catch{
    Swal.fire({
    text:"No se ha iniciado sesión"+'!',
    icon: "error"
});
    window.location.href = "http://localhost:5500/index.html";
}

export const user_id = decodeToken(document.cookie.split("=")[1])["user_id"];