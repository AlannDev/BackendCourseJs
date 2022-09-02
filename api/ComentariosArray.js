
class Comentarios{
    constructor(knex,name){
        this.knexSqLite=knex,
        this.tableName=name
        this.init()
    }

    async init() {
        let existe = await this.knexSqLite.schema.hasTable(this.tableName);

        if(!existe){
            try {
                await this.knexSqLite.schema.createTable(this.tableName, (table) => {
                    table.increments('id')
                    table.string('nombreUsuario')
                    table.string('comentario')
                    table.integer('fecha')

                });
                console.log('tabla mensajes creada')
    
            } catch (error) {
                console.log(error)
            }
        }else{
            console.log('Trabajando sobre tabla mensajes existente')
        }
        
    }


    async save(object){
        knex(this.tableName).insert(object)
        .then(object=>{console.log(object)})
        .catch(err=>console.log(`Eror al ingresar al guardar mensaje - ${err}`))
        .finally(()=>this.knexSqLite.destroy())
    }


    async getAllComments(){
        try {
            return await this.knexSqLite.from(this.tableName).select("*");
        } catch (error) {
            return `Eror al cargar los  mensajes - ${error}`;
        }

    }

    async deleteAll(){
        try {
            return await this.knexSqLite.from(this.tableName).del();
        } catch (error) {
            return `Error al borrar los mensajes - ${error}`;
        }

    }

}

module.exports=Comentarios;