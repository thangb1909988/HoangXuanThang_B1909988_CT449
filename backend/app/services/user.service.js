const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.User= client.db().collection("users");
    }
   
    extractUserData(payload) {
        const user = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            password: payload.password,
            admin: payload.admin,
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }
    async create (payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user ,
            { $set: { admin: user.admin===true  } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }  
   
    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
    
    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findAdmin() {
        return await this.find({ admin: true });
    }

    async deleteAll() {
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }
        
}

module.exports = UserService;