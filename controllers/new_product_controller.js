import { products_service } from "../services/product_services.js";

const np = document.getElementById("np");

np.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const Quantity = document.getElementById("Quantity").value;

    if( parseInt(code) < 0 || parseInt(price) < 0 || parseInt(Quantity) < 0){
        Swal.fire({
            text:"los campos no pueden ser negativos",
            icon:"error"
        });
        return;
    }

    const response = await products_service.create_product(name, code, price, Quantity);
    

    if(!(response.status==201)){
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