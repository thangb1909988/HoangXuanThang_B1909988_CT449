import {
    createWebHistory,
    createRouter
} from "vue-router";
import Product from "@/views/Product.vue";
import User from "@/views/User.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.Vue"),
    },
    {
        path: "/",
        name: "product",
        component: Product,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/products/:id",
        name: "product.edit",
        component: () => import("@/views/ProductEdit.vue"),
        props: true
    },
    {
        path: "/",
        name: "product.add",
        component: () => import("@/views/ProductAdd.vue"),
    },
    {
        path: "/",
        name: "user",
        component: User,
    },
    {
        path: "/users/:id",
        name: "user.edit",
        component: () => import("@/views/userEdit.vue"),
        props: true
    },
    {
        path: "/",
        name: "user.add",
        component: () => import("@/views/userAdd.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});
export default router;