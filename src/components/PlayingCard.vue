<script setup>
import { ref, watchEffect, onMounted } from "vue";

const isFlipped = ref(false);
const props = defineProps({ card: Object, gameState: Object, index: Number });
const emit = defineEmits(["handle-click"]);

onMounted(() => {
  const element = document.querySelectorAll(".card");
  VanillaTilt.init(element);
});

watchEffect(() => {
  if (
    props.gameState.firstCard?.key === props.card.key ||
    props.gameState.secondCard?.key === props.card.key
  ) {
    isFlipped.value = true;
  } else {
    isFlipped.value = false;
  }
});

function rotateCard() {
  if (
    (props.gameState.firstCard && props.gameState.secondCard) ||
    props.card.matched
  )
    return;
  else {
    isFlipped.value = true;
    emit("handle-click", props.card);
    console.log(isFlipped.value);
  }
}
</script>
<template>
  <div
    glare
    v-motion
    :initial="{
      opacity: 0,
      y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 1000,
      x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 1000,
    }"
    :enter="{
      opacity: 0.7,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        mass: 0.5,
        opacity: { delay: Math.random() * 200 },
      },
    }"
    :hovered="{ opacity: 1 }"
    :style="{ transformStyle: 'preserve-3d' }"
    class="card flip-card h-36 sm:h-40 sm:w-40 opacity-70 transition-200"
  >
    <div
      :style="
        isFlipped ? 'transform: rotateY(180deg)' : 'transform: rotateY(360deg)'
      "
      class="flip-card-inner h-full w-full"
    >
      <div
        @click="rotateCard()"
        class="flip-card-front flex aspect-square h-full w-full cursor-pointer items-center justify-center rounded-lg border-2 border-white bg-gradient-to-tr from-primaryGreen to-primaryDark p-8 transition-all duration-500"
        :class="
          props.card.matched
            ? 'cursor-default opacity-5 grayscale'
            : props.gameState.firstCard &&
              props.gameState.secondCard &&
              !props.card.matched &&
              'cursor-default opacity-50 grayscale'
        "
      >
        <img
          class="pointer-events-none h-20 object-contain opacity-5"
          src="/img/logo_small.png"
          alt="game logo"
        />
      </div>
      <div
        :class="props.card"
        class="flip-card-back flex h-full w-full items-center justify-center rounded-lg border-2 border-white bg-gradient-to-tr from-primaryGreen to-primaryDark p-8"
      >
        <div
          class="flex aspect-square items-center justify-center overflow-hidden rounded-full bg-primaryDark"
        >
          <img :src="props.card.src" class="w-1/2 object-contain" alt="card" />
        </div>
      </div>
    </div>
  </div>
</template>
