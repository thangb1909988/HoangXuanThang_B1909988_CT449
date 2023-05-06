<template>
  <Form
    @submit="submitProduct"
    :validation-schema="productFormSchema"
    style="padding: 20px; background-color: #000000; border-radius: 5px"
  >
    <div class="form-group">
      <label for="name">Tên sản phẩm</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="productLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="picture">Hình ảnh</label>
      <Field
        name="picture"
        type="text"
        class="form-control"
        v-model="productLocal.picture"
      />
      <ErrorMessage name="picture" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="description">Mô tả</label>
      <Field
        name="description"
        type="text"
        class="form-control"
        v-model="productLocal.description"
      />
      <ErrorMessage name="description" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="price">Giá sản phẩm</label>
      <Field
        name="price"
        type="number"
        class="form-control"
        v-model="productLocal.price"
      />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <input
        name="new"
        type="checkbox"
        class="form-check-input"
        v-model="productLocal.new"
      />
      <label for="new" class="form-check-label">
        <strong>Có là sản phẩm mới?</strong>
      </label>
    </div>
    <div class="form-group row">
      <div class="col-lg-6" style="text-align: center;">
        <button
          style="
            width: 115.2px;
            height: 50px;
            border-radius: 10px;
            background-color: #cda45e;
            color: aliceblue;
            font-weight: bold;
          "
        >
          Lưu
        </button>
      </div>
      <div class="col-lg-6"  style="text-align: center;">
        <button
        v-if="productLocal._id"
        style="
          width: 115.2px;
          height: 50px;
          border-radius: 10px;
          background-color: red;
          color: aliceblue;
          font-weight: bold;
        "
        @click="deleteProduct"
      >
        Xóa
      </button>
      </div>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:product", "delete:product"],
  props: {
    product: { type: Object, required: true },
  },
  data() {
    const productFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      picture: yup.string().max(255, "Hình ảnh tối đa 255 ký tự."),
      description: yup.string().max(500, "Mô tả sản phẩm tối đa 500 ký tự."),
      price: yup
        .number()
        .required("Giá phải có giá trị")
        .moreThan(0, "Giá sản phẩm phải lớn hơn 0"),
    });
    return {
      productLocal: this.product,
      productFormSchema,
    };
  },
  methods: {
    submitProduct() {
      this.$emit("submit:product", this.productLocal);
    },
    deleteProduct() {
      this.$emit("delete:product", this.productLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
label {
  font-size: 18px;
  color: #cda45e;
}
</style>
