export const  mensaje = (message, type) =>{

    if(type === "success"){
    
        Swal.fire({
            text:message+'!',
            icon:'success'
        }
        )

    }
    
    Swal.fire({
        icon: 'error',
        text: message,
    })
    
    }



