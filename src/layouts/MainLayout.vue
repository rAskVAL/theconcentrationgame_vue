<script setup>
import Footer from "../components/Footer/Footer.vue";
import Navbar from "../components/Navbar/Navbar.vue";
</script>

<template>
  <div class="flex min-h-[100dvh] flex-col justify-between">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
