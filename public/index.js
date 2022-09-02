// cliente

const socket=io.connect()


socket.emit('connection',console.log('conectado cliente'))

// formulario comentarios


const addComment=(evt)=>{

    const nombreUsuario=document.querySelector('#nombreUsuario').value;
    const comentario=document.querySelector('#comentario').value;
    const fecha=new Date().toLocaleString()

    let nuevoComentario={nombreUsuario,comentario,fecha}

    console.log(nuevoComentario)
    socket.emit('mensaje-nuevo',nuevoComentario);
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
socket.on('lista-mensajes',listadoComentarios=>{
    renderComentarios(listadoComentarios.comentarios)
})




// formulario productos

const form=document.querySelector('#form')
const btn=document.querySelector('#btn')

btn.addEventListener("click",(e)=>{
    e.preventDefault()

    const timestamp= new Date().getTime()
    const codigoProducto= (Date.now())
    
    const titulo=document.querySelector('#titulo').value;
    const precio=document.getElementById('precio').value;
    const imagen=document.getElementById('imagen').value;
    const descripcion=document.getElementById('descripcion').value;
    const stock=document.getElementById('stock').value;
    
    
    let producto = {titulo,precio,imagen,descripcion,stock,codigoProducto,timestamp}
    
    socket.emit('producto-nuevo',producto);
    form.reset();
    console.log(producto)

});


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
            <p class="card-text">${prod.descripcion}</p>
            <p class="card-text">${prod.stock}</p>
        </div>
    </div>`
    })

    vistaProductos.innerHTML=html.join(' ')
}

// productos
socket.on('lista-productos',listadoProductos=>{
    render(listadoProductos)
})





