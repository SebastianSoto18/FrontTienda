
const login=  (email, password) => fetch("https://tiendarest.herokuapp.com/login",
        {method: "POST", 
        headers:{"Content-type":"application/json"},
        body: JSON.stringify({email: email,password: password})}).then
        ((response) => {
                return response;
        });


const register = (email, password, name, phone, address) => fetch("https://tiendarest.herokuapp.com/users",
        {method: "POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify({name: name, email: email,phone: phone,password: password, address: address})});




export const login_services ={login,register}