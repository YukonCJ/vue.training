<template>
    <h1>Dashboard</h1>
    <nav>
        <RouterLink to="/product">產品</RouterLink> |
        <RouterLink to="/order">訂單</RouterLink> |
    </nav>
    <router-view></router-view>
</template>

<script>
export default {}
</script>
