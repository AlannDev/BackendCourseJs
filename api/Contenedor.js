
const {options}=require('../Db/mariaDB/conexionDB')
const knex=require('knex')(options)

class Contenedor{
    constructor(knex,name){
        this.knexMDB=knex,
        this.tableName=name
        this.init()
    }


    async init() {
        let existe = await this.knexMDB.schema.hasTable(this.tableName);

        if(!existe){
            try {
                await this.knexMDB.schema.createTable(this.tableName, (table) => {
                    table.increments('id')
                    table.string('titulo')
                    table.decimal('precio')
                    table.string('imagen')
                    table.string('descripcion')
                    table.integer('stock')
                    table.integer('codigoProducto')
                    table.integer('timestamp')
                });
                console.log('tabla creada')
    
            } catch (error) {
                console.log(error)
            }
        }else{
            console.log('Trabajando sobre tabla existente')
        }
        
    }



    async save(object){


        this.knexMDB(this.tableName).insert(object)
        .then(object=>{console.log(object)})
        .catch(err=>console.log(`Eror al ingresar el producto - ${err}`))
        .finally(()=>this.knexMDB.destroy())

    }

    async getById(idProducto){
        try {
            return await this.knexMDB
            .from(this.tableName)
            .select("*")
            .where("id", idProducto)
            .limit(1);

        } catch (error) {
            console.log(`Eror al cargar el producto - ${error}`)
        }
    }

    async getAll(){
        try {
            return await this.knexMDB.from(this.tableName).select("*");
        } catch (error) {
            return `Eror al cargar el listado de  productos - ${error}`;
        }

    }

    async delete(idProducto){

        try {
            return await this.knexMDB.from(this.tableName).where("id", idProducto).del();

        } catch (error) {
            console.log(`Error al borrar el producto - ${error}`)
        }
    }

    async deleteAll(){
        try {
            return await this.knexMDB.from(this.tableName).del();
        } catch (error) {
            return `Error al borrar el listado de productos - ${error}`;
        }

    }
}

module.exports=Contenedor;