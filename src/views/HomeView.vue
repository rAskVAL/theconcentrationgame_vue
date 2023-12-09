<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div
    class="container mx-auto flex flex-col items-center justify-center px-10"
  >
    <img v-motion-slide-bottom src="/public/img/logo.png " alt="logo" />
    <h1 class="mt-10 text-center uppercase">
      Welcome to the concentration game! To start a game please press
      <RouterLink class="text-primaryGreen underline" to="/play">
        here
      </RouterLink>
    </h1>
    <img
      src="/public/picture.gif"
      class="fixed -z-10 h-full w-full overflow-hidden object-cover opacity-10"
    />
  </div>
</template>
