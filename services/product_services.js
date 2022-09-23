const getproducts = (id) => fetch("https://tiendarest.herokuapp.com/products",
        {method: "GET",
        headers:{
            "Content-type": "application/json",
            "Authorization": "Bearer "+document.cookie.split("=")[1].substring(0,document.cookie.split("=")[1].length-1)
        }
        });

const getproduct_by_code = (code) => fetch("https://tiendarest.herokuapp.com/products/"+code,
        {method: "GET",
        headers:{
            "Content-type": "application/json",
            "Authorization": "Bearer "+document.cookie.split("=")[1].substring(0,document.cookie.split("=")[1].length-1)
        }
        });


const create_product = (name, code, price, quantity) => fetch("https://tiendarest.herokuapp.com/products",
        {method: "POST",
        headers:{
            "Content-type": "application/json",
            "Authorization": "Bearer "+document.cookie.split("=")[1].substring(0,document.cookie.split("=")[1].length-1)
        },
        body: JSON.stringify({ Quantity:quantity,name: name,code: code , price: price})});


export const products_service = {getproducts, getproduct_by_code, create_product};