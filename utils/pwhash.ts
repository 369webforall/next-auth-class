import bcrypt from 'bcrypt'

export const saltAndHashPassword = (pw:string)=>{
return bcrypt.hash(pw, 10);
}