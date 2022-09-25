

const create_order = (id,name, phone, address,quantity_per_products,products,status,date,total) => fetch("https://tiendarest.herokuapp.com/products",
{method: "POST",
headers:{
    "Content-type": "application/json",
    "Authorization": "Bearer "+document.cookie.split("=")[1].substring(0,document.cookie.split("=")[1].length-1)
},
body: JSON.stringify({user_id:id,client_name: name,client_phone: phone , client_address:address
,quantity_per_products:quantity_per_products,products:products,status:status,date:date,total:total})});


export const order_service = {create_order};