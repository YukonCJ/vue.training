<template>
    <h1>首頁</h1>
    <nav>
        <RouterLink to="/home">Home</RouterLink> |
        <RouterLink to="/about">About Us</RouterLink> |
        <RouterLink to="/products">Products</RouterLink> |
        <RouterLink to="/login">Login</RouterLink>
    </nav>
    <router-view></router-view>
</template>

<script>
export default {

}
</script>
