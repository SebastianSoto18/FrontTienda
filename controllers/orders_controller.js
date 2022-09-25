let carrito = {};


const addcarrito= (e) => {

    console.log(e.target.classlist)
    if(e.target.classlist.contains("btn")){
        setCarrito(e.target.parentElement);
    }
}

const setCarrito = (product) => {
    const productInfo = {
        id: product.querySelector("button").getAttribute("data-id"),
        name: product.querySelector("h1").textContent,
        price: product.querySelector("p").textContent,
    }

    console.log(productInfo);
}


export const carrito_controller = {addcarrito, setCarrito};

