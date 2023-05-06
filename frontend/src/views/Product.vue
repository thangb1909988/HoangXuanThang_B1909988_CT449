<template>
  <main id="product" class="menu">
    <div style="background-color: rgb(55, 55, 55); padding: 50px">
      <div class="section-title">
        <h2>Product</h2>
        <p>Danh sách sản phẩm</p>
      </div>
      <div class="col-lg-5"><InputSearch v-model="searchText" /><br /></div>

      <div class="col-md-12">
        <ProductList
          v-if="filteredProductsCount > 0"
          :products="filteredProducts"
          v-model:activeIndex="activeIndex"/>
        <p v-else>Không có sản phẩm nào.</p>
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
          @click="goToAddProduct"
          style="background-color: rgb(0, 174, 255); font-weight: bold"
        >
          Thêm sản phẩm
        </button>
        <button
          class="btn col-lg-3"
          role="button"
          @click="removeAllProducts"
          style="background-color: #d00000; font-weight: bold"
        >
          Xóa tất cả
        </button>
      </div>
    </div>
    <div v-if="activeProduct">
      <div class="modal" id="myModal">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content" style="background-color: black">
            <!-- Modal Header -->
            <div class="modal-header" style="margin-top: 20px; height: 122.8px">
              <div class="section-title">
                <h2>Product</h2>
                <p>Thông tin sản phẩm</p>
              </div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <ProductCard :product="activeProduct" />
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Thoát
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import ProductCard from "@/components/ProductCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    ProductCard,
    InputSearch,
    ProductList,
  },
  data() {
    return {
      products: [],
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
    productStrings() {
      return this.products.map((product) => {
        const { name, picture, description, price } = product;
        return [name, picture, description, price].join("");
      });
    },
    filteredProducts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_product, index) =>
        this.productStrings[index].includes(this.searchText)
      );
    },
    activeProduct() {
      if (this.activeIndex < 0) return null;
      return this.filteredProducts[this.activeIndex];
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveProducts();
      this.activeIndex = -1;
    },

    async removeAllProducts() {
      if (confirm("Bạn muốn xóa tất cả Sản phẩm?")) {
        try {
          await ProductService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddProduct() {
      this.$router.push({ name: "product.add" });
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
