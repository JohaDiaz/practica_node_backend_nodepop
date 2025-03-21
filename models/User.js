import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

//definir el esquema de los usuarios

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
});

// método estático, que hace un hash de una contraseña
userSchema.statics.hashPassword = function (clearPassword) {
  return bcrypt.hash(clearPassword, 7);
};

// método de instancia, comprueba que la password coincide
// en métodos de instancia NO USAR ARROW FUNCTIONS (se pierde el this)
userSchema.methods.comparePassword = function (clearPassword) {
  return bcrypt.compare(clearPassword, this.password);
};

//creamos el modelo de usuario

const User = mongoose.model("User", userSchema);

export default User;
