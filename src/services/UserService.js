const User = require("../models/Users");

const CreateUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        try {
            const createUser = await User.create({
                name, 
                email, 
                password, 
                confirmPassword, 
                phone
            })
            if(createUser) {
                resolve({
                    status: "SUCCESS",
                    message: "User created successfully",
                    data: createUser
                })
            }
        }
        catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser
}
