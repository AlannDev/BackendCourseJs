class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `Nombre y Apellido: ${this.nombre} ${this.apellido}`;
    }

    addMascota(nombre) {
        this.mascotas.push(nombre);
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames() {
        return this.libros.map((libro) => {
            return libro.nombre;
        })
    }
}

//Valores iniciales para el usuario
const nombre = "Pepe";
const apellido = "Argento";
const libros = [
    {nombre: "Las mil y una noches", autor: "Anonimo"}, 
    {nombre: "El extranjero", autor: "Albert Camus"}, 
    {nombre: "El proceso", autor: "Franz Kafka"}];
const mascotas = ["perro", "gato", "tortuga", "pez"];

//Creo una instancia de Usuario
const user = new Usuario(nombre, apellido, libros, mascotas);

//Muestro valores por consola
console.log(user.getFullName());
user.addMascota("iguana")
user.addBook("Diario de un loco", "Lu Xun");
user.getBookNames();
console.log(user);