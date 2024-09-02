<template>
  <div class="bg-yellow">
    <div class="conatiner loginPage vhContainer ">
      <h1 class="h1">
        404 Not Found
        <p>您即將跳轉至登入頁面</p>
      </h1>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

setTimeout(() => {
  router.push("/login")
}, 3000)
</script>