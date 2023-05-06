const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Tên người dùng không rỗng!"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);        
    } catch (error) {
        return next(
            new ApiError(500,"Xảy ra lỗi khi thêm người dùng!!")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        const {name} = req.query;
        if (name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500,"Xảy ra lỗi khi tìm kiếm người dùng!!")
            );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    let documents = [];
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy người dùng"));
        } 
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500,`Xảy ra lỗi khi tìm kiếm người dùng với id = ${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Cần dữ liệu để cập nhật thông tin người dùng!"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy người dùng"));
        } 
        return res.send({message: "Cập nhật thông tin người dùng thành công"});
    } catch (error) {
        return next(
            new ApiError(500,`Xảy ra lỗi khi cập nhật người dùng với id = ${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy người dùng"));
        } 
        return res.send({message: "Xoá người dùng thành công"});
    } catch (error) {
        return next(
            new ApiError(500,`Xảy ra lỗi khi xoá người dùng với id = ${req.params.id} !!`)
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({ message: `${deletedCount} người dùng đã xoá thành công`,});

    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500,`Xảy ra lỗi khi tất cả xoá người dùng!!`)
        );
    }
};

exports.findAllAdmin = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const documents = await userService.findAdmin();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500,`Xảy ra lỗi khi tìm tất cả người dùng admin!!`)
        );
    }
};
