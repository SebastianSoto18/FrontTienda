const getuser = (id) => fetch("https://tiendarest.herokuapp.com/users/"+id,
        {method: "GET",
        headers:{
            "Content-type": "application/json",
            "Authorization": "Bearer "+document.cookie.split("=")[1].substring(0,document.cookie.split("=")[1].length-1)
        }
        });

export const user_service = {getuser};