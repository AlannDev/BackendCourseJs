const fs= require('fs');


class Producto{
    constructor(ruta){
        this.ruta=ruta
    }

    async save(object){

        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse= JSON.parse(data)

            if(dataParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataParse,{...object,id: dataParse[dataParse.length-1].id  + 1}],null,2))
                console.log(`El id del producto agregado es: ${dataParse.length+1}`)


            }else{
                await fs.promises.writeFile(this.ruta, JSON.stringify([{...object,id: 1}],null,2))
                console.log(`El id del producto creado es: ${dataParse[dataParse.length-1].id  + 1}`)
            }

            

        }catch(error){
            console.log(error)
        }  
    }

    async getById(id){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse= JSON.parse(data)
            let productoId=dataParse.find(productoId=>productoId.id===id)
            
            if(productoId){
                console.log({productoId})
                // return productoId
                
            }else{
                console.log("No se encontro el producto")
            }
            

        } catch (error) {
            console.log(error)
        }
    }

    async getAllProducts(){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse= JSON.parse(data)
            

            if(dataParse.length){
                // console.log(dataParse)
                return (dataParse)
            }else{
                console.log(`no hay productos`)
            }

        } catch (error) {
            console.log(error)
        }

    }

    async delete(id){

        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse= JSON.parse(data)

            let productoId=dataParse.find(productoId=>productoId.id===id)
            
            if(productoId){
                let dataFiltrado= dataParse.filter(productoId =>productoId.id!==id)
                await fs.promises.writeFile(this.ruta,JSON.stringify(dataFiltrado,null,2))
                console.log(`Producto ${id} eliminado`)
                
            }else{
                console.log("El producto no se encuentra en el listado")
            }

        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){

        await fs.promises.writeFile(this.ruta, JSON.stringify([],null,2))

    }
}

module.exports=Producto;