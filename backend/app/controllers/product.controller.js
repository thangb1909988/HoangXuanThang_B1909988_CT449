const ApiError = require("../api-error");
const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util")

exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Tên sản phẩm không rỗng!"));
    }
    
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500,"Xảy ra lỗi khi thêm sản phẩm!!")
        );
    }
};

exports.findAll = async (req, res, next) => {
   let documents = [];

   try {
    const productService = new ProductService(MongoDB.client);
    const { name } = req.query;
    if (name) {
        documents = await productService.findByName(name);
    }else {
        documents = await productService.find({});
    }
   } catch (error) {
    return next(
        new ApiError(500,"Xảy ra lỗi khi tìm kiếm sản phẩm!!")
    );
   }
   return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Không tìm thấy sản phẩm"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500,`Xảy ra lỗi khi tìm kiếm sản phẩm với id = ${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Cần dữ liệu để cập nhật sản phẩm!"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "Không tìm thấy sản phẩm"));
        }
        return res.send({message: "Cập nhật thông tin sản phẩm thành công"});
    } catch (error) {
        return next(
            new ApiError(500,`Xảy ra lỗi khi cập nhật sản phẩm với id = ${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next ) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Không tìm thấy sản phẩm"));
        }
        return res.send({message: "Xoá sản phẩm thành công"});
    } catch (error) {
        return next(
            new ApiError(500,`Xảy ra lỗi khi xoá sản phẩm với id = ${req.params.id} !!`)
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deletedCount = await productService.deleteAll();
        return res.send({ message: `${deletedCount} sản phẩm đã xoá thành công`,});
    } catch (error) {
        return next(
            new ApiError(500,`Xảy ra lỗi khi tất cả xoá sản phẩm!!`)
        );
    }
};

exports.findAllNew = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const documents = await productService.findNew();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500,`Xảy ra lỗi khi tìm tất cả sản phẩm mới!!`)
        );
    }
};