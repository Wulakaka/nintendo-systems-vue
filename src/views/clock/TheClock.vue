<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const numbers = getNumbers(90)
const { minute: to } = getMinuteRotate()
const { hour } = getHourRotate()
const { sec: from } = getSecRotate()

const gradient = computed(() => {
  const right = Math.round(to.value - from.value + 360) % 360

  return `conic-gradient(from ${from.value}deg, white 0deg, #3c404e ${
    right * 0.7
  }deg, black ${right}deg, white ${right}deg)`
})

const displayShadow = computed(() => {
  return (t: number) => {
    if (from.value > to.value) {
      return t >= from.value || t <= to.value
    } else {
      return t >= from.value && t <= to.value
    }
  }
})

const minuteRotate = ref(from.value)
watch(from, (value, oldValue, onCleanup) => {
  if (minuteRotate.value) {
    minuteRotate.value += (value + 360 - oldValue) % 360
  } else {
    minuteRotate.value = value
  }
})

function getMinuteRotate() {
  const time = useDateFormat(useNow(), 'm')

  const minute = computed(() => {
    return (+time.value * 360) / 60
  })
  return {
    minute
  }
}
function getSecRotate() {
  const time = useDateFormat(useNow(), 's')

  const sec = computed(() => {
    return (+time.value * 360) / 60
  })
  return {
    sec
  }
}

function getHourRotate() {
  const time = useDateFormat(useNow(), 'm')
  const hour = computed(() => {
    return ((+time.value % 12) * 360) / 12
  })
  return {
    hour
  }
}

function getNumbers(r: number) {
  const step = Math.PI / 6
  return new Array(12).fill(0).map((_, index) => {
    const number = index + 1
    return {
      number: number,
      deg: number * 30,
      x: -Math.sin(step * (number + 6)) * r,
      y: Math.cos(step * (number + 6)) * r
    }
  })
}
</script>

<template>
  <div class="h-full flex flex-col justify-center">
    <div
      class="outer w-[356px] h-[356px] from-slate-700 to-white rounded-full mx-auto p-[9px] shadow-md transition-[background]"
      :style="{ backgroundImage: gradient }"
    >
      <div class="w-[338px] h-[338px] rounded-full p-[2px] backdrop-contrast-150">
        <div
          class="w-[334px] h-[334px] rounded-full shadow-inner"
          :style="{ backgroundImage: gradient }"
        >
          <ul class="relative h-full translate-x-1/2 translate-y-1/2">
            <li
              v-for="i in numbers"
              :key="i.number"
              class="absolute text-gray-400 text-sm text-center w-5 -translate-x-1/2 -translate-y-1/2 blur-[1px]"
              :style="{
                left: `${i.x - 5}px`,
                top: `${i.y + 10}px`
              }"
              v-show="displayShadow(i.deg)"
            >
              {{ i.number }}
            </li>
            <li
              v-for="i in numbers"
              :key="i.number"
              class="absolute text-white text-sm text-center w-5 -translate-x-1/2 -translate-y-1/2"
              :style="{
                left: `${i.x}px`,
                top: `${i.y}px`
              }"
            >
              {{ i.number }}
            </li>
            <li
              class="minute h-[12.5rem] w-1 bg-[#192734] absolute -left-0.5 -top-[155px] origin-[center_155px] transition-transform"
              :style="{
                transform: `rotate(${minuteRotate}deg)`
              }"
            ></li>
            <li
              class="dot w-4 h-4 rounded-full bg-[#192734] -translate-x-1/2 -translate-y-1/2"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.outer {
}

.dot {
  box-shadow: inset -2px 1px 0 #435059;
}
.minute {
  box-shadow: inset 2px 2px 0 #435059;
}
</style>
