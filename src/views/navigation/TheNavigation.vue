<script setup lang="ts">
import { computed, ref } from 'vue'

const centerY = ref(50)
const r = 50

const maxBottom = -40
const k = Math.PI / (maxBottom - 100)
const b = -Math.PI - k * 100

const a = computed(() => {
  const bottom = centerY.value + 50
  return bottom * k + b
})

const x1 = computed(() => r * Math.sin(a.value))
const y1 = computed(() => r * Math.cos(a.value) + centerY.value)

const x2 = computed(
  () =>
    centerY.value / Math.tan(a.value) +
    r * (Math.cos(a.value) / Math.tan(a.value) + Math.sin(a.value))
)

const dl = computed(() => {
  return `M -100,0 Q ${x2.value},0 ${x1.value},${y1.value} z`
})
const dr = computed(() => {
  return `M 100,0 Q ${-x2.value},0 ${-x1.value},${y1.value} z`
})

const d = computed(
  () =>
    `M -100,-100 L -100,0 Q ${x2.value},0 ${x1.value},${y1.value} L ${-x1.value},${
      y1.value
    } Q ${-x2.value},0 100,0 V -100 Z`
)

const pause = ref(false)

function step() {
  if (!pause.value) {
    centerY.value -= 0.4
    if (centerY.value > 50) {
      centerY.value = -100
    } else if (centerY.value < -100) {
      centerY.value = 50
    }
  }

  setTimeout(() => {
    step()
  }, 20)
}
step()
</script>

<template>
  <svg
    viewBox="-100 -100 200 200"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    @click="pause = !pause"
  >
    <rect width="200" height="200" x="-100" y="-100" fill="aliceblue"></rect>
    <path :d="d" fill="white" fill-rule="nonzero"></path>
    <circle :r="r" cx="0" :cy="centerY" fill="aliceblue"></circle>

    <!--    <g fill="white">-->
    <!--      <path :d="dl"></path>-->
    <!--      <path :d="dr"></path>-->
    <!--    </g>-->
    <!--    <g fill="aliceblue">
      <rect width="200" height="100" x="-100" y="0"></rect>
      <circle :r="r" cx="0" :cy="centerY"></circle>
    </g>-->
    <!--    <circle r="2" :cx="x1" :cy="y1" fill="red"></circle>
    <circle r="2" :cx="x2" :cy="0" fill="green"></circle>-->
    <!--    <line :x1="x1" :y1="y1" :x2="x2" y2="0" stroke="black" stroke-width="1" fill="none"></line>-->
  </svg>

  <svg
    viewBox="0 0 200 100"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <!-- Cubic Bézier curve with absolute coordinates -->
    <path
      fill="none"
      stroke="red"
      d="M 10,90
           C 30,90 25,10 50,10
           S 70,90 90,90"
    />

    <!-- Cubic Bézier curve with relative coordinates -->
    <path
      fill="none"
      stroke="red"
      d="M 110,90
           c 20,0 15,-80 40,-80
           s 20,80 40,80"
    />

    <!-- Highlight the curve vertex and control points -->
    <g id="ControlPoints">
      <!-- First cubic command control points -->
      <line x1="10" y1="90" x2="30" y2="90" stroke="lightgrey" />
      <circle cx="30" cy="90" r="1.5" />

      <line x1="50" y1="10" x2="25" y2="10" stroke="lightgrey" />
      <circle cx="25" cy="10" r="1.5" />

      <!-- Second smooth command control points (the first one is implicit) -->
      <line x1="50" y1="10" x2="75" y2="10" stroke="lightgrey" stroke-dasharray="2" />
      <circle cx="75" cy="10" r="1.5" fill="lightgrey" />

      <line x1="90" y1="90" x2="70" y2="90" stroke="lightgrey" />
      <circle cx="70" cy="90" r="1.5" />

      <!-- curve vertex points -->
      <circle cx="10" cy="90" r="1.5" />
      <circle cx="50" cy="10" r="1.5" />
      <circle cx="90" cy="90" r="1.5" />
    </g>
    <use xlink:href="#ControlPoints" x="100" />
  </svg>
  <svg
    viewBox="0 0 200 100"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <!-- Quadratic Bézier curve with implicit repetition -->
    <path
      fill="none"
      stroke="red"
      d="M 10,50
           Q 25,25 40,50
           t 30,0 30,0 30,0 30,0 30,0"
    />

    <!-- Highlight the curve vertex and control points -->
    <g>
      <polyline points="10,50 25,25 40,50" stroke="rgba(0,0,0,.2)" fill="none" />
      <circle cx="25" cy="25" r="1.5" />

      <!-- Curve vertex points -->
      <circle cx="10" cy="50" r="1.5" />
      <circle cx="40" cy="50" r="1.5" />

      <g id="SmoothQuadraticDown">
        <polyline
          points="40,50 55,75 70,50"
          stroke="rgba(0,0,0,.2)"
          stroke-dasharray="2"
          fill="none"
        />
        <circle cx="55" cy="75" r="1.5" fill="lightgrey" />
        <circle cx="70" cy="50" r="1.5" />
      </g>

      <g id="SmoothQuadraticUp">
        <polyline
          points="70,50 85,25 100,50"
          stroke="rgba(0,0,0,.2)"
          stroke-dasharray="2"
          fill="none"
        />
        <circle cx="85" cy="25" r="1.5" fill="lightgrey" />
        <circle cx="100" cy="50" r="1.5" />
      </g>

      <use xlink:href="#SmoothQuadraticDown" x="60" />
      <use xlink:href="#SmoothQuadraticUp" x="60" />
      <use xlink:href="#SmoothQuadraticDown" x="120" />
    </g>
  </svg>
</template>

<style scoped lang="scss"></style>
