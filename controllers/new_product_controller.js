import { products_service } from "../services/product_services.js";

const np = document.getElementById("np");

np.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const Quantity = document.getElementById("Quantity").value;

    const response = await products_service.create_product(name, code, price, Quantity);
        
    if(!(response.status==200)){
    Swal.fire({
            text:"El codigo del producto ya existe"+'!',
            icon: "error"
        });
        return;
    }

    Swal.fire({
        text: "Producto creado con exito" + '!',
        icon: "success"
    });
});