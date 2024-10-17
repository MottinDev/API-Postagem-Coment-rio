import mongoose from 'mongoose';

// Definindo o schema do usuário
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Modelo de usuário
const User = mongoose.model('User', userSchema);
export default User;
