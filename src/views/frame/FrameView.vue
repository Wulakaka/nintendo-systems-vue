<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import bg from '@/assets/bg.png'
const parent = ref()

const x = ref(0)
const y = ref(0)

const viewBox = computed(() => `-3 -3 ${x.value + 6} ${y.value + 6}`)

const borderPath = computed(() => {
  const radiusLT = 'M 8,0 A 8,8 0,0,0 0,8'
  const lineL = `v 110 l 10,17 v ${y.value - 8 * 2 - 110 - 17 * 2 - 180} l -10,17 v 180`
  const radiusLB = `A 8,8 0,0,0 8,${y.value}`
  const lineB = `h ${x.value - 8 * 2}`
  const radiusRB = `A 8,8 0,0,0 ${x.value},${y.value - 8}`
  const lineR = `v -180 l -10,-17, v ${-(y.value - 8 * 2 - 110 - 17 * 2 - 180)} l 10,-17 v -110`
  const radiusRT = `A 8,8 0,0,0 ${x.value - 8},0`

  return `${radiusLT} ${lineL} ${radiusLB} ${lineB} ${radiusRB} ${lineR} ${radiusRT} z`
})

onMounted(() => {
  resizeChild()
  window.addEventListener('resize', resizeChild)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChild)
})

function resizeChild() {
  if (!parent.value) return
  const { width, height } = parent.value.getBoundingClientRect()
  x.value = width | 0
  y.value = height | 0
}
</script>

<template>
  <div
    class="flex flex-col justify-center h-full bg-[#13161e]"
    :style="{ backgroundImage: `url('${bg}')` }"
  >
    <div
      ref="parent"
      class="w-[90vw] h-[90vh] mx-auto backdrop-blur-2xl relative"
      :style="{ clipPath: `path('${borderPath}')` }"
    >
      <svg
        :viewBox="viewBox"
        style="width: calc(100% + 6px); transform: translateX(-3px) translateY(-3px)"
        class="absolute"
      >
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="white" flood-opacity="1" />
          </filter>
        </defs>
        <path
          :d="borderPath"
          stroke="#20aef8"
          stroke-width="1"
          fill="none"
          style="filter: url(#shadow)"
        ></path>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
