<script>
export default {
  props: {
    product: { type: Object, required: true },
  },
};
</script>

<template>
  <div class="row container">
    <div class="col-lg-5">
      <img :src="product.picture" alt="..." style="width: 100%" />
    </div>
    <div class="col-lg-7">
      <h1 style="color: white; font-weight: bold">{{ product.name }}</h1>
      <h2 style="color: #cda45e">{{ product.price }} VNĐ</h2>
      <h3 style="color:red;font-weight: bold">
        <strong>Sản phẩm mới:&nbsp;</strong>
        <i v-if="product.new" class="fas fa-check"></i>
        <i v-else class="fas fa-times"></i>
      </h3>
    </div>
    <hr />
    <div class="mt-3 container" style="color: white">
      <h2>Mô tả sản phẩm</h2>
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>
