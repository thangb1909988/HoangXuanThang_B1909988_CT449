<template>
  <main id="user_add">
    <div style="background-color: rgb(55, 55, 55); padding: 50px">
      <div class="section-title">
        <h2>User</h2>
        <p>Thêm tài khoản người dùng mới</p>
      </div>
      <div v-if="user" class="page">
        <UserForm :user="user" @submit:user="createUser" />
        <p>{{ message }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user.service";

export default {
  components: {
    UserForm,
  },
  props: {},
  data() {
    return {
      user: {},
      message: "",
    };
  },
  methods: {
    async createUser(data) {
      try {
        await UserService.create(data);
        this.message = "Tài khoản người dùng mới tạo thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.message = "";
  },
};
</script>
