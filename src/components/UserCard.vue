<script setup>
const props = defineProps(["delay"]);
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
    class="group relative w-full space-y-4 overflow-hidden rounded-lg bg-primaryDark p-4"
  >
    <div
      class="absolute -right-14 -top-14 h-28 w-28 rounded-full bg-primaryGreen blur-2xl transition-all group-hover:h-60 group-hover:w-60"
    ></div>
    <img
      src="https://media.licdn.com/dms/image/D4D03AQE8GVKHbdudTg/profile-displayphoto-shrink_800_800/0/1693032335611?e=2147483647&v=beta&t=ihzTDGRFEuRNKJnl26msY-Qjy-TEydl_fqe08QyEkVc"
      alt="Creator Picture"
      class="relative aspect-square rounded-lg"
    />
    <div class="relative flex items-center justify-between text-primaryGreen">
      <a href="https://www.linkedin.com/in/roberts-ribakovs-81a33616a/">
        Roberts Ribakovs
      </a>
      <i class="ti ti-external-link"></i>
    </div>
  </div>
</template>
