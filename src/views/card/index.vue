<script setup lang="ts">
import { defineComponent } from 'vue'
import CardItem from '@/views/card/CardItem.vue'

defineComponent({
  name: 'CardList'
})
</script>

<template>
  <div class="flex justify-center h-full flex-col">
    <div class="card-list relative w-32 h-32 mx-auto group">
      <CardItem></CardItem>
    </div>
  </div>
</template>

<style scoped lang="scss">
$deg: 45deg;
.card-list {
  perspective: 800px;
  transform-style: preserve-3d;
  transition: 0.3s;

  &:hover {
    .card-item {
      transform: rotateX($deg);
    }
  }
}

.card-item {
  transition: 0.3s;
  transform-origin: center center 300px;

  perspective: 800px;
  transform-style: preserve-3d;
  //animation: moveCard 4s infinite paused;
}

@keyframes moveCard {
  0% {
    transform: rotateX(0) rotateY(0);
  }

  20% {
    transform: rotateX(-$deg);
  }

  40% {
    transform: rotateY($deg);
  }

  60% {
    transform: rotateX($deg);
  }

  80% {
    transform: rotateY(-$deg);
  }
}
</style>
