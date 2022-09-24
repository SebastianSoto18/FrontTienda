import { products_service } from "../services/product_services.js";
import { data_user } from "./home_controller.js";

const np = document.getElementById("np");

np.addEventListener("submit", async (e) => {

    e.preventDefault();

    document.getElementById("user_name").innerHTML = data_user.name;
    document.getElementById("user_email").innerHTML = data_user.email; 


    const name = document.getElementById("name").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const Quantity = document.getElementById("Quantity").value;

    const data = await products_service.create_product(name, code, price, Quantity).catch((err) => { 
        Swal.fire({
            text:"Error al crear el producto"+'!',
            icon: "error"
        });
        
        return });

    Swal.fire({
        text: "Producto creado con exito" + '!',
        icon: "success"
    });
});