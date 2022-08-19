const server = io().connect()

function formatDate() {
    let date_ob = new Date(); 
    let date = ("0" + date_ob.getDate()).slice(-2); 
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2); 
    let year = date_ob.getFullYear(); 
    let hours = date_ob.getHours(); 
    let minutes = date_ob.getMinutes(); 
    let seconds = date_ob.getSeconds(); 
    return(year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds);
}

const render = (productos) => {
    let listado = document.getElementById("listado")
    // let listado = document.querySelector("#listado")
    let html = productos.map(prod => {
        return `
        <li>

        <span class="nombre">
        ${prod.title}
        </span>
        <span class="hora">
        [${prod.price}]:
        </span>
        <span class="mensaje">
        <img src=" ${prod.thumbnail}" alt="">
       
        </span>
    </li>
       `

    })
    listado.innerHTML = html.join(" ")

}
const render2 = (productos) => {
    let listado = document.getElementById("mensaje")
    // let listado = document.querySelector("#listado")
    let html2 = productos.map(prod => {
        return `
        <li>

        <span class="nombre">
        ${prod.nombre}
        </span>
        <span class="hora">
        [${prod.hora}]:
        </span>
        <span class="mensaje">
        ${prod.precio}
        </span>
    </li>
       `
    })
    listado.innerHTML = html2.join(" ")
}
const addMensaje = (evento2) => {
    const nombre = document.querySelector("#nombre2").value
    const precio = document.querySelector("#precio2").value
    
    const hora2 = new Date().getTime()
    const hora = formatDate()
    const productos2 = { nombre, precio,hora }
    console.log(productos2)
    server.emit("mensaje-nuevo", productos2)
    return false


}

const addProduct = (evento) => {
    const nombre = document.querySelector("#nombre").value
    const precio = document.querySelector("#precio").value
    const thumbnail = document.querySelector("#thumbnail").value
    const productos = { title: nombre, price: precio,thumbnail }
    console.log(productos)
    server.emit("producto-nuevo", productos)
    return false


}

server.on("mensaje-servidor", mensaje => {
    console.log(mensaje)
    render(mensaje.prods)
    render2(mensaje.arrayMensajes)
})
