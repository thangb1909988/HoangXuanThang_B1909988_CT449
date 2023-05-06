<template>
    <nav class="navbar navbar-expand navbar-dark" style="background: black;
    padding: 25px;
    color: #fff;
    font-size: 20px;">
        <h1 href="/" class="logo me-auto me-lg-0" style="font-size: 28px;
                margin: 0;  padding: 0; line-height: 1; font-weight: 300;   letter-spacing: 1px; color: white;
                text-transform: uppercase;  font-family: 'Poppins', sans-serif;"><router-link :to="{ name: 'home' }" class="nav-link">
                    The Grinder
                </router-link></h1>
        <div class="mr-auto navbar-nav" style="display: flex;
                    align-items: center;    justify-content: space-between; padding: 10px 0 10px 30px;
                    color: #fff;    white-space: nowrap;    transition: 0.3s;   font-size: 20px;">
            <li class="nav-item">
                <router-link :to="{ name: 'product' }" class="nav-link">
                    Product
                </router-link>

            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'user' }" class="nav-link">
                    User
                </router-link>
            </li>
        </div>
    </nav>
</template>

