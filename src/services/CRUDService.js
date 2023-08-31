
import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender:data.gender==='1' ? true : false,
                roleId: data.roleId
            })
            resolve('create a new user successful');
        }catch(e){
            reject(e);
        }
    })
    
    
}

let hashUserPassword = (password)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}

let getAllUser = ()=>{
    return new Promise(async(resolve, reject) =>{
        try{
            let users  = db.User.findAll();
            resolve(users);
        }catch(e){
            reject(e);
        }
    })
}

let getUserInfoById = async(userId)=>{
    return new Promise(async(resolve, reject) =>{
        try{
            let user = db.User.findOne({
                where: {id: userId},
                raw : true,
            })
            if(user){
                resolve(user);
            }
        } catch(e){
            reject(e);
        }
    })
}

let updateUserData =(data) => {
    console.log("infor update user");
console.log(data);
    return new Promise(async(resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {id: data.userId}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.gender = data.gender === '0' ? 'true' : 'false';
                user.phoneNumber = data.phoneNumber;

                await user.save();

                let allUser = await db.User.findAll();

                resolve(allUser);
            }
            
        }catch(e){
            reject(e);
        }
    })
}
let deleteUserById = (Userid) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: Userid}
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        }catch(e){
            reject(e);
        }
    } )
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}