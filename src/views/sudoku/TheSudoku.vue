<script setup lang="ts">
import { ref } from 'vue'

type Value = number
type Row = Value[]
type List = Row[]

const list: List = [
  [0, 0, 6, 0, 0, 0, 0, 1, 0],
  [0, 3, 0, 6, 0, 2, 5, 0, 0],
  [0, 0, 0, 0, 0, 0, 3, 0, 4],
  [6, 0, 1, 0, 0, 9, 0, 0, 0],
  [0, 9, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 4, 0, 0, 6, 0, 8, 0],
  [7, 0, 0, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 9, 0, 5, 7, 0, 0],
  [9, 0, 0, 8, 0, 4, 1, 0, 0]
]

const result = ref<number[][]>([])

function main(list: List) {
  const copy = list.map((i) => [...i])

  let i = 0,
    j = 0

  function isValid(i: number, j: number, list: List) {
    let flag = true
    // 判断每一行
    {
      if (!isNine(list[i])) {
        flag = false
        return flag
      }
    }
    // 判断每一列
    {
      const col = list.map((row) => row[j]) as Row
      if (!isNine(col)) {
        flag = false
        return flag
      }
    }
    // 判断每个九宫格
    {
      const x = Math.floor(i / 3)
      const y = Math.floor(j / 3)
      const temp: Row = []
      temp.push(list[3 * x][3 * y])
      temp.push(list[3 * x][3 * y + 1])
      temp.push(list[3 * x][3 * y + 2])
      temp.push(list[3 * x + 1][3 * y])
      temp.push(list[3 * x + 1][3 * y + 1])
      temp.push(list[3 * x + 1][3 * y + 2])
      temp.push(list[3 * x + 2][3 * y])
      temp.push(list[3 * x + 2][3 * y + 1])
      temp.push(list[3 * x + 2][3 * y + 2])
      if (!isNine(temp)) {
        flag = false
        return flag
      }
    }

    return flag
  }

  function next() {
    j++
    if (j > 8) {
      i++
      j = 0
    }
  }

  function prev() {
    j--
    if (j < 0) {
      i--
      j = 8
    }
    if (list[i][j]) {
      prev()
    }
  }

  while (i < 9 && j < 9) {
    if (list[i][j]) {
      next()
    } else {
      copy[i][j]++
      if (copy[i][j] > 9) {
        copy[i][j] = 0
        prev()
      } else if (isValid(i, j, copy)) {
        next()
      }
    }
  }
  return copy
}
result.value = main(list)

function isNine(arr: Row) {
  const map = new Array(10).fill(0)
  arr.forEach((i) => {
    map[i]++
  })

  return map.every((i, idx) => {
    if (!idx) return true
    return i <= 1
  })
}
</script>

<template>
  <table class="w-[600px] h-[600px]">
    <tr class="[&:nth-child(3n):not(:last-child)]:border-b-4" v-for="i in result" :key="i">
      <td
        class="border-b-2 border-r-2 border-r-slate-200 [&:nth-child(3n):not(:last-child)]:border-r-4 text-center"
        v-for="j in i"
        :key="j"
      >
        {{ j }}
      </td>
    </tr>
  </table>
</template>

<style scoped lang="scss"></style>
