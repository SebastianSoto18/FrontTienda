
buscar = document.getElementById("buscar");

let products = "";
let Quantity = "";
let i = 0;
let j =0 ;
buscar.addEventListener("submit", async (e) => {
    e.preventDefault();
    code = document.getElementById("code").value;
    const data = await products_service.getproduct(code);
    const formu = document.getElementById("formu");

    if (data.status == 200){
        data = await data.json();
        console.log(1)
        ul = document.createElement("ul");

        li = document.createElement("li");
        li.innerHTML = data.as('name')
        ul.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = data.as('code')
        ul.appendChild(li);
        total = document.createElement("li");
        total.setid("total");
        if(Quantity <= data.Quantity){
            total.innerHTML = data.price * Quantity;
        }else{
            return;
        }
        
        ul.appendChild(total);

        formu.appendChild(ul);

    }

});
