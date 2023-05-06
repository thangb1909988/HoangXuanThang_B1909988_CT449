<script>
export default{
    props: {
        user: { type: Object, required: true },
    },
};
</script>
<template>
    <div class="container" >
        <div class="p-1">
            <strong>Tài khoản người dùng:</strong>
            {{ user.name }}
        </div>
        <div class="p-1">
            <strong>Email:</strong>
            {{ user.email }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ user.address }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ user.phone }}
        </div>
        <div class="p-1">
            <strong>Password:</strong>
            {{ user.password }}
        </div>
        <div class="p-1">
            <strong>Admin:&nbsp;</strong>
            <i v-if="user.admin" class="fas fa-check"></i> <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>

<style>
    strong {
        font-size: 20px;
        color: #cda45e;
    }
</style>