<template>
  <Form
    @submit="submitUser"
    :validation-schema="userFormSchema"
    style="padding: 20px; background-color: #000000; border-radius: 5px"
  >
    <div class="form-group">
      <label for="name">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="userLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="userLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="userLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
        v-model="userLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <Field
        name="password"
        type="password"
        class="form-control"
        v-model="userLocal.password"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="re-password">Re-Password</label>
      <Field name="re-password" type="password" class="form-control" />
      <ErrorMessage name="re-password" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <input
        name="admin"
        type="checkbox"
        class="form-check-input"
        v-model="userLocal.admin"
      />
      <label for="admin" class="form-check-label">
        <strong>Có là tài khoản admin?</strong>
      </label>
    </div>

    <div class="form-group row">
      <div class="col-lg-6" style="text-align: center">
        <button
          style="
            width: 115.2px;
            height: 50px;
            border-radius: 10px;
            background-color: #cda45e;
            color: aliceblue;
            font-weight: bold;
          ">
          Lưu
        </button>
      </div>
      <div class="col-lg-6" style="text-align: center">
        <button
          v-if="userLocal._id"
          style="
            width: 115.2px;
            height: 50px;
            border-radius: 10px;
            background-color: red;
            color: aliceblue;
            font-weight: bold;
          "
          @click="deleteUser"
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
  emits: ["submit:user", "delete:user"],
  props: {
    user: { type: Object, required: true },
  },
  data() {
    const userFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Vui lòng nhập tên tài khoản người dùng.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .required("Vui lòng nhập email người dùng.")
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup
        .string()
        .max(100, "Địa chỉ tối đa 100 ký tự.")
        .required("Vui lòng nhập địa chỉ người dùng."),
      phone: yup
        .string()
        .required("Vui lòng nhập SĐT người dùng.")
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      password: yup
        .string()
        .required("Vui lòng nhập mật khẩu!!.")
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
      repassword: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu!!.")
        .oneOf(
          [yup.ref("password"), null],
          'Must match "password" field value'
        ),
    });
    return {
      userLocal: this.user,
      userFormSchema,
    };
  },
  methods: {
    submitUser() {
      this.$emit("submit:user", this.userLocal);
    },
    deleteUser() {
      this.$emit("delete:user", this.userLocal.id);
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
