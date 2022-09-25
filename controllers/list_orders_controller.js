import { order_service } from "../services/ordernes_service.js";
import { order_details_service } from "../services/order_deatils_service.js";
import { data_user } from "../utilities/navutilities.js";
let tarjeta = document.querySelector("#accordion-arrow-icon");


const genttarjetas = async (id, order) => {
  tarjeta.innerHTML += `

    <h2 id="accordion-arrow-icon-heading-${id}   ">
    <button data-id="${id}" type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-arrow-icon-body-2" aria-expanded="false" aria-controls="accordion-arrow-icon-body-${id}">
      <span>Pedido #${id}</span>
      <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path></svg>
    </button>
  </h2>
        <br>
        `;

};

const generarlistas = async (parent, order) => {
    let listadiv= `<div id="accordion-arrow-icon-body-${order}" aria-labelledby="accordion-arrow-icon-heading-${order}">
                    <div class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
    `;


    
    let data_detail = await order_details_service.get_details(order);
    let datajson = await data_detail.json();
    console.log(datajson);
    datajson.forEach((element) => {
        listadiv += `
        <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">Nombre del producto: ${element.name_product}</li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">Cantidad comprada: ${element.quantity} </li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">precio por producto: ${element.price}</li>
        <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">total gastasdo en el producto: ${element.total}</li>
        </ul>
        `;
    });

    listadiv += `</div></div>`;

    
    let factura="";
    console.log(order);
    const dataventa = await order_service.getbyorder(order);
    const dataventadecode = await dataventa.json();
    console.log(dataventadecode);

    factura += `<h1>Total de compra:${dataventadecode.total}</h1>`
    factura += `<h1>Fecha de compra:${dataventadecode.date}</h1>`
    factura += `<h1>Estado de compra:${dataventadecode.status}</h1>`
    
    const encabezado = ""
    
    Swal.fire({
        title: 'detalles de la orden',
        icon: 'info',
        html: `<div style="margin: 0 auto;display:flex;alig-items:center;flex-direction:row;">`+ listadiv+"</div>" + factura 
      })


}



tarjeta.addEventListener("click", async (e) => {
    e.preventDefault();

    if (e.path[0].dataset.id){
        await generarlistas(e.path[0].parentElement.parentElement, e.path[0].dataset.id);
    }
});


let orders = await order_service.getbyclient(data_user.id);

if (orders.status == 200) {
  let ordersdecode = await orders.json();
  document.querySelector("#nocontent").style = "display:none";
  ordersdecode.forEach(async (order) => {

    await genttarjetas(order.id, order);
  });
}








