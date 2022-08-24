// cliente

const socket=io.connect()


// formulario comentarios


const addComment=(evt)=>{

    const nombreUsuario=document.querySelector('#nombreUsuario').value;
    const comentario=document.querySelector('#comentario').value;
    const date=new Date().toLocaleString()

    let nuevoComentario={nombreUsuario,comentario,date}

    console.log(nuevoComentario)
    socket.emit('nuevo-comentario',nuevoComentario);
    form.reset();

    return false;  
}


const renderComentarios=(comentarios)=>{
    let  vistaComentarios=document.getElementById('listadoComentarios');

    let html= comentarios.map(coment=>{
        return `<li>
        //     <strong>Usuario: ${coment.nombreUsuario} :</strong>
        //     <em>${coment.comentario}</em>
        //     </li>`
    })

    vistaComentarios.innerHTML=html.join(' ')
}


// comentarios
socket.on('comentarios',listadoComentarios=>{
    renderComentarios(listadoComentarios.comentarios)
})




// formulario productos

const addProduct=(event)=>{
    
    const titulo=document.querySelector('#titulo').value;
    const precio=document.getElementById('precio').value;
    const imagen=document.getElementById('imagen').value;

    let producto = {titulo,precio,imagen}
    

    console.log(producto)
    socket.emit('nuevo-producto',producto);
    form.reset();

    return false;
};


const render=(productos)=>{
    let  vistaProductos=document.getElementById('vistaProductos');

    let html= productos.map(prod=>{
        return `<div class="card" ">
        <div class="img-container">
            <img src=${prod.imagen} class="card-img-top" alt="">
        </div>

        <div class="card-body">
            <h5 class="card-title">${prod.titulo}</h5>
            <p class="card-text">${prod.precio}</p>
        </div>
    </div>`
    })

    vistaProductos.innerHTML=html.join(' ')
}

// productos
socket.on('productos',listadoProductos=>{
    render(listadoProductos.productos)
})





