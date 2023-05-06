<template>
  <main id="user" class="menu">
    <div style="background-color: rgb(55, 55, 55); padding: 50px">
      <div class="section-title">
        <h2>User</h2>
        <p>Danh sách tài khoản người dùng</p>
      </div>
      <div class="col-lg-5"><InputSearch v-model="searchText" /><br /></div>
      <div class="row" style="margin-left: 50px">
        <div class="col-lg-3">
          <UserList
            v-if="filteredUsersCount > 0"
            :users="filteredUsers"
            v-model:activeIndex="activeIndex"
          />
          <p v-else>Không có sản phẩm nào.</p>
        </div>
        <div class="col-lg-6">
          <div v-if="activeUser" style="background-color: rgb(0, 0, 0); padding: 20px; border-radius: 10px; color: white;">
            <div class="section-title" style="padding-bottom: 10px;">
              <h2>Product</h2>
              <p>Thông tin người dùng</p>
            </div>
            <UserCard :user="activeUser" />
            <router-link
              :to="{
                name: 'user.edit',
                params: { id: activeUser._id },
              }"
            >
              <span class="mt-2 badge badge-success" style="width: 100px; height: 20px;">
                <i class="fas fa-edit"></i> Hiệu chỉnh</span
              >
            </router-link>
          </div>
        </div>
      </div>

      <div class="mt-3 row justify-content-around align-items-center">
        <button
          class="btn col-lg-3"
          role="button"
          @click="refreshList()"
          style="background-color: chartreuse; font-weight: bold"
        >
          Làm mới
        </button>
        <button
          class="btn col-lg-3"
          role="button"
          @click="goToAddUser"
          style="background-color: rgb(0, 174, 255); font-weight: bold"
        >
          Thêm người dùng
        </button>
        <button
          class="btn col-lg-3"
          role="button"
          @click="removeAllUsers"
          style="background-color: #d00000; font-weight: bold"
        >
          Xóa tất cả
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
import UserSevice from "@/services/user.service";

export default {
  components: {
    UserCard,
    InputSearch,
    UserList,
  },
  data() {
    return {
      users: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    userStrings() {
      return this.users.map((user) => {
        const { name, email, address, phone, password } = user;
        return [name, email, address, phone, password].join("");
      });
    },
    filteredUsers() {
      if (!this.searchText) return this.users;
      return this.users.filter((_user, index) =>
        this.userStrings[index].includes(this.searchText)
      );
    },
    activeUser() {
      if (this.activeIndex < 0) return null;
      return this.filteredUsers[this.activeIndex];
    },
    filteredUsersCount() {
      return this.filteredUsers.length;
    },
  },
  methods: {
    async retrieveUser() {
      try {
        this.users = await UserSevice.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveUser();
      this.activeIndex = -1;
    },

    async removeAllUsers() {
      if (confirm("Bạn muốn xóa tất cả Người dùng?")) {
        try {
          await UserSevice.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddUser() {
      this.$router.push({ name: "user.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 800px;
}
</style>
