<script setup></script>
<script setup>
const emit = defineEmits(["restartGame"]);
</script>

<template>
  <button
    @click="$emit('restartGame')"
    className="w-full rounded-lg bg-primaryGreen py-2 font-semibold text-primaryDark"
  >
    <slot>Restart</slot>
  </button>
</template>
