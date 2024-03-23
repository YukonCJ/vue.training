<template>
    <h1>首頁</h1>
    <nav>
        <RouterLink to="/news">News</RouterLink> |
        <RouterLink to="/about">About Us</RouterLink> |
        <RouterLink to="/login">Login</RouterLink>
    </nav>
    <router-view></router-view>
</template>

<script>
export default {

}
</script>
