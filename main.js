const http = require("http")

const server = http.createServer((request, response) => {
    const hour = new Date().getHours();
    if(hour >= 6 && hour <= 13){
        response.end(`Son las ${hour} horas, Buenos Dias`)
    }
    else if(hour >= 12 && hour >= 19){
        response.end(`buenas tardes son las ${hour} horas`)
    }
    else if(hour > 19 && hour < 24){
        response.end(`buenas noches, son las ${hour} horas`)
    }
})

const createServer = server.listen(8080, () => {
    console.log(`escuchando el puerto ${server.address().port}`)
})