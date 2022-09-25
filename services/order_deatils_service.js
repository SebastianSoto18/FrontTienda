const get_details = (order_id) => {
    return fetch("https://tiendarest.herokuapp.com/order_details/"+order_id,
    {method: "GET",
    headers:{
        "Content-type": "application/json",
        "Authorization": "Bearer "+document.cookie.split("=")[1].substring(0,document.cookie.split("=")[1].length-1)
    }})
}

export const order_details_service = {get_details};