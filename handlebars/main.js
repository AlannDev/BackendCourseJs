const http = require("http");

const server = http.createServer((peticion,respuesta)=>{
    const hora = new Date().getHours()
      if( hora >= 6 && hora <= 13){
       respuesta.end(`la hora es ${hora} Horas,Buenos Dias`)
      }
      else if  (hora >= 12 && hora <= 19) {
       respuesta.end(`buenas tardes son las ${hora}`)
      } else if(hora > 19 && hora < 24){
        respuesta.end(`buenas noches la hora es ${hora}`)
      }

})

const createServer = server.listen(8080, () =>{
    console.log(`escuchando el puerto${server.address().port}`)
})

