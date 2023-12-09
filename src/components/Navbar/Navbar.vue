<script setup>
import { Navlinks } from "../../constants/Index";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import SelectModal from "./SelectModal.vue";
const open = ref(false);
const modal = ref(false);
</script>

<template>
  <header
    class="sticky top-0 z-10 w-full border-b-4 border-primaryGreen bg-primaryDark"
  >
    <nav
      class="container mx-auto flex items-center justify-between p-4 z-50 relative"
    >
      <RouterLink to="/" class="h-11">
        <img class="h-full" src="/img/logo.png" alt="logotype"
      /></RouterLink>
      <ul class="hidden list-none items-center gap-4 text-white md:flex">
        <div v-for="link in Navlinks">
          <RouterLink
            v-if="link.special"
            active-class="active-btn"
            :to="link.href"
            class="rounded-lg border-2 border-primaryGreen border-opacity-0 bg-primaryGreen px-3 py-2 font-semibold text-primaryDark transition-all hover:border-opacity-100 hover:bg-opacity-10 hover:text-white"
          >
            {{ link.title }}
          </RouterLink>
          <RouterLink
            v-else
            active-class="active-link"
            :to="link.href"
            class="hover:text-primaryGreen"
          >
            {{ link.title }}
          </RouterLink>
        </div>
        <div class="px-3 py-2 relative">
          <div
            class="flex gap-1 items-center cursor-pointer"
            @click="modal = !modal"
          >
            <i class="ti ti-brand-vue"></i>
            <p>Vue.js Version</p>
            <i
              class="ti ti-chevron-down transition-all"
              :class="modal && '-rotate-90'"
            ></i>
          </div>
          <SelectModal v-show="modal" />
        </div>
      </ul>
      <i
        @click="open = !open"
        class="ti ti-menu-2 block text-4xl md:hidden text-white"
      ></i>
    </nav>
    <div
      v-if="open"
      v-motion
      :initial="{
        opacity: 0,
        y: -100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 250,
          damping: 25,
          mass: 0.5,
        },
      }"
      :leave="{
        y: -100,
        opacity: 0,
      }"
      class="absolute flex h-[100dvh] w-full flex-col overflow-hidden bg-primaryDark p-4 md:hidden"
    >
      <ul class="flex list-none flex-col gap-4 text-white md:hidden">
        <RouterLink
          v-for="link in Navlinks"
          :to="link.href"
          key="{index}"
          active-class="active-mobile"
          class="w-full border-l border-primaryGreen p-4 hover:text-primaryGreen"
        >
          {{ link.title }}
        </RouterLink>
      </ul>
    </div>
  </header>
</template>
