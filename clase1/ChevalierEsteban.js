class Usuario {


    /**
     * 
     * @param {*} nombre : String
     * @param {*} apellido :String 
     * @param {*} libros : Object[]
     * @param {*} mascotas : String[]
     */
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    /**
     * 
     * @returns Retorna el nombre completo del usuario
     */
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }


    /**
     * Recibe un nombre de mascota y lo agrega al array de mascotas.
     * @param {*} mascota
     */
    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    /**
     * 
     * @returns Retorna la cantidad de mascotas que tiene el usuario.
     */
    countMascotas() {
        return this.mascotas.length;
    }

    /**
     * Recibe el nombre y el autor de libro y lo agrega al array de libros.
     * @param {*} nombre - Nombre del libro
     * @param {*} autor  - Autor del libro
     */
    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
    }

    /**
     * 
     * @returns Retorna un array con solo los nombres de los libros del usuario.
     */
    getBookNames() {
        return this.libros.map( libro => libro.nombre);
    }

}

usuario = new Usuario('Esteban', 'Chevalier', [{nombre: 'Harry Potter y la piedra filosofal', autor: 'J. K. Rowling' }], ['Kaisa']);

console.log("Llamada a getFullName : " + usuario.getFullName());
console.log("Llamada a countMascotas : " + usuario.countMascotas());
console.log("Llamada a getBooksNames : " + usuario.getBookNames());

usuario.addMascota('Arhi');
usuario.addBook('Harry Potter y la cámara secreta', 'J. K. Rowling')

console.log("Llamada a countMascotas : " + usuario.countMascotas());
console.log("Llamada a getBooksNames : " + usuario.getBookNames());


