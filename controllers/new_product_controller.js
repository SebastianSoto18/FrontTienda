import { products_service } from "../services/product_services.js";

const np = document.getElementById("np");

np.addEventListener("submit", async (e) => {


    const name = document.getElementById("name").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const Quantity = document.getElementById("Quantity").value;

    response = await products_service.create_product(name, code, price, Quantity);
        
    if(!(response.status==200)){
    Swal.fire({
            text:"Error al crear el producto"+'!',
            icon: "error"
        });
    }

    Swal.fire({
        text: "Producto creado con exito" + '!',
        icon: "success"
    });
});