<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Learn Nuxt </h1>
      <NuxtLink to="/about" class="h-10 px-6 font-semibold rounded-md bg-black text-white">About</NuxtLink>
      <NuxtLink to="/products" class="h-10 px-6 font-semibold rounded-md bg-black text-white">Products</NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 60px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>