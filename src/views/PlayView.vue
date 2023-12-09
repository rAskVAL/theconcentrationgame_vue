<script setup>
import { reactive, onMounted, watchEffect } from "vue";
import { cards } from "../constants/Index";
import PlayingCard from "../components/PlayingCard.vue";
import ResetButton from "../components/ResetButton.vue";

const gameState = reactive({
  cardDeck: [],
  firstCard: null,
  secondCard: null,
  score: 0,
  turns: 0,
  restarting: false,
  winner: false,
});

const highscore = localStorage.getItem("highscore");

// start game function
// shuffles array every time it is called

function startGame() {
  const playingCards = [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map((card, index) => {
      return { ...card, key: index };
    });

  gameState.cardDeck = playingCards;
  gameState.score = 0;
  gameState.turns = 0;
  gameState.winner = false;
  resetCards();
}

// function to reset selected cards

function resetCards() {
  gameState.firstCard = null;
  gameState.secondCard = null;
}

// restart game

function restartGame() {
  gameState.restarting = true;
  resetCards();
  setTimeout(() => startGame(), 500);
  setTimeout(() => {
    gameState.restarting = true;
  }, 1000);
  gameState.winner = false;
}

// handle click when selected card pressed

function handleClick(card) {
  if (gameState.firstCard) {
    gameState.secondCard = card;
  } else {
    gameState.firstCard = card;
  }
}

// calls function startGame when page is loaded

onMounted(() => {
  startGame();
});

// watchEffect which controls if score = 16, if score equals to 16 game is finished

watchEffect(() => {
  if (gameState.score === 16) {
    gameState.winner = true;
    if (!localStorage.getItem("highscore")) {
      localStorage.setItem("highscore", gameState.turns);
    } else if (gameState.turns < Number(localStorage.getItem("highscore"))) {
      localStorage.setItem("highscore", gameState.turns);
    } else return;
  }
});

watchEffect(() => {
  function setMatched() {
    gameState.cardDeck = gameState.cardDeck.map((card) => {
      if (card.id === gameState.secondCard.id) {
        return { ...card, matched: true };
      } else return card;
    });
    setTimeout(resetCards, 1500);
    gameState.score += 2;
  }

  if (gameState.firstCard && gameState.secondCard) {
    if (gameState.firstCard.id === gameState.secondCard.id) setMatched();
    else setTimeout(resetCards, 1000);
    gameState.turns++;
  }
});
</script>

<template>
  <div
    class="relative flex h-full flex-col-reverse items-center justify-center overflow-hidden px-4"
  >
    <div
      class="relative my-4 grid w-full grid-cols-2 grid-rows-4 gap-4 sm:w-fit sm:grid-cols-3 md:grid-cols-4"
    >
      <PlayingCard
        @handleClick="handleClick"
        v-for="(card, index) in gameState.cardDeck"
        :key="index"
        :card="card"
        :gameState="gameState"
      />
    </div>
    <div
      class="bottom-10 mb-4 flex h-fit w-full flex-col gap-4 rounded-lg border-2 border-white bg-primaryDark p-8 md:absolute md:right-8 md:top-0 md:w-64"
    >
      <div class="flex flex-col items-center rounded-lg bg-white/5 p-2">
        <p>
          High score:
          {{ highscore || 0 }} turns!
        </p>
        <div class="flex gap-4">
          <p>Score: {{ gameState.score }}</p>
          <p>Turns: {{ gameState.turns }}</p>
        </div>
      </div>
      <ResetButton @restart-game="restartGame" />
    </div>
    <div
      v-show="gameState.winner"
      class="fixed left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-4 md:absolute md:w-fit"
    >
      <div
        class="flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-primaryGreen bg-primaryDark px-10 py-6 md:w-96"
      >
        <h1>Congratulations, you won!</h1>
        <div
          class="flex w-full flex-col items-center rounded-lg bg-white/5 p-2"
        >
          <p>High Score:{{ " " }} {{ highscore || gameState.turns }} Turns!</p>
          <div class="flex gap-4">
            <p>Score: {{ gameState.score }}</p>
            <p>Turns: {{ gameState.turns }}</p>
          </div>
        </div>
        <ResetButton @restart-game="restartGame">Restart Game</ResetButton>
      </div>
    </div>
  </div>
</template>

<style></style>
