<template>
  <main id="user_edit">
    <div style="background-color: rgb(55, 55, 55); padding: 50px">
      <div class="section-title">
        <h2>User</h2>
        <p>Chỉnh sửa thông tin tài khoản người dùng</p>
      </div>
      <div v-if="user" class="page">
        <UserForm
          :user="user"
          @submit:user="updateUser"
          @delete:user="deleteUser"
        />
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
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      user: null,
      message: "",
    };
  },
  methods: {
    async getUser(id) {
      try {
        this.user = await UserService.get(id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },

    async updateUser(data) {
      try {
        await UserService.update(this.user._id, data);
        this.message = "Thông tin người dùng được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUser() {
      if (confirm("Bạn muốn xóa người dùng này?")) {
        try {
          await UserService.delete(this.user._id);
          this.$router.push({ name: "user" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getUser(this.id);
    this.message = "";
  },
};
</script>
