<script>
export default {
  props: {
    products: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>
<template>
  <table class="table" style="text-align: center; border-radius: 10px">
    <thead>
      <tr>
        <th scope="col">STT</th>
        <th scope="col">HÌNH</th>
        <th scope="col">TÊN</th>
        <th scope="col">MÔ TẢ</th>
        <th scope="col">GIÁ</th>
        <th scope="col">CHI TIẾT</th>
        <th scope="col">CHỈNH SỬA</th>
      </tr>
    </thead>
    <tbody
      v-for="(product, index) in products"
      :key="product._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <tr style="text-align: center; margin-top: 20px">
        <th scope="row">{{ index + 1 }}</th>
        <td>
          <img
            :src="product.picture"
            class="card-img-top"
            alt="..."
            style="height: 80px; width: 80px"
          />
        </td>
        <td>{{ product.name }}</td>
        <td style="max-width: 300px;">{{ product.description }}</td>
        <td>{{ product.price }} VNĐ</td>
        <td
          class="btn"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          style="
            margin-top: 15px;
            border-radius: 5px;
            background-color: #cda45e;
            color: black;
            font-weight: bold;
          "
        >
          Xem chi tiết
        </td>
        <td>
          <router-link
            :to="{
              name: 'product.edit',
              params: { id: product._id },
            }"
          >
          <i class='fas fa-edit'></i>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
