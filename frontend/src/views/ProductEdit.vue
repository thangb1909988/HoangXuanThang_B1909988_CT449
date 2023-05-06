<template>
    <main id="product_edit" >
    <div style="background-color: rgb(55, 55, 55); padding: 50px">
      <div class="section-title">
        <h2>Product</h2>
        <p>Chỉnh sửa thông tin sản phẩm</p>
      </div>
      <div v-if="product" class="page">
        <ProductForm :product="product" @submit:product="updateProduct" @delete:product="deleteProduct" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                this.message = "Thông tin sản phẩm được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        
        async deleteProduct() {
            if (confirm("Bạn muốn xóa Sản phẩm này?")) {
                try {
                    await ProductService.delete(this.product._id);
                    this.$router.push({ name: "product" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
};
</script>