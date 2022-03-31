<template>
<div class="container">
    <div>
        <h1 class="title">About</h1>
        <p v-if="$nuxt.isOffline">you ar offline</p>   
        <p v-if="$nuxt.isOnline">you are online</p> 
        <NuxtLink to="/" class="button--green">Home</NuxtLink>
    </div>
</div>
</template>