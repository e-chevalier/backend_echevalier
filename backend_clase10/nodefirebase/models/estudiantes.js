import mongoose from "mongoose"

const estudiantesCollection = 'estudiantes'

const EstudiantesSchema = mongoose.Schema({
    nombre: {type: String, require: true, max:100},
    apellido: {type: String, require: true, max:100},
    edad: {type: Number, require: true},
    dni: {type: String, require: true, max:100, unique: true},
    curso: {type: String, require: true, max:100},
    nota: {type: Number, require: true},
    //ingreso: {type: Boolean, require: true}
})

export const estudiantes = mongoose.model(estudiantesCollection, EstudiantesSchema)