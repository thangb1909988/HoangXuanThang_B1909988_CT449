<template>
  <main id="product_add" >
    <div style="background-color: rgb(55, 55, 55); padding: 50px">
      <div class="section-title">
        <h2>Product</h2>
        <p>Thêm sản phẩm mới</p>
      </div>
      <div v-if="product" class="page">
        <ProductForm :product="product" @submit:product="createProduct" />
        <p>{{ message }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    ProductForm,
  },
  props: {},
  data() {
    return {
      product: {},
      message: "",
    };
  },
  methods: {
    async createProduct(data) {
      try {
        await ProductService.create(data);
        this.message = "Sản phẩm mới tạo thành công.";
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
