<script setup lang="ts">
// import Swiper JS
import Swiper from 'swiper'

// import Swiper styles
import 'swiper/css'
import { nextTick, onMounted, ref, toRef, useSlots, watchEffect } from 'vue'
import { Autoplay } from 'swiper/modules'

// const props = defineProps<{
//   data: object[]
// }>()
//
// const data = toRef(props, 'data')

const swiperRef = ref()

const slots = useSlots()

onMounted(() => {
  const swiper = new Swiper(swiperRef.value, {
    direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    loop: true,
    modules: [Autoplay]
  })
  //
  // watchEffect(() => {
  //   console.log(data.value)
  //   swiper.update()
  // })
})
</script>

<template>
  <div ref="swiperRef" class="swiper w-[380px] h-[330px] bg-gray-900">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
      <div class="swiper-slide">Slide 5</div>
      <div class="swiper-slide">Slide 6</div>
      <!--     <div class="swiper-slide">Slide 7</div>
      <div class="swiper-slide">Slide 8</div>
      <div class="swiper-slide">Slide 9</div>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  height: 30%;
}
</style>
