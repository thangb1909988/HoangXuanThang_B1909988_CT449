const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const app = express();
const productsRouter = require("./app/routes/product.route");
const userRouter = require("./app/routes/user.route");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Trang quản lý kho hàng của quán nến thơm"
    });
})

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use((req, res, next) => {
    return next(new ApiError(404, "Không tìm thấy trang 404."));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});


module.exports = app;