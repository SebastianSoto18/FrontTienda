
const login=  (email, password) => fetch("https://tiendarest.herokuapp.com/login",
        {method: "POST", 
        headers:{"Content-type":"application/json"},
        body: JSON.stringify({email: email,password: password})}).then
        ((response) => {
                return response.status;
        });


const register = (email, password, name, phone) => fetch("https://tiendarest.herokuapp.com/users",
        {method: "POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify({name: name, email: email,phone: phone,password: password})});




export const login_services ={login,register}