<script setup lang="ts">
import { reactive } from 'vue'

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

const result = reactive<(string | number)[][]>(list.map((i) => i.map((j) => (j ? j : ''))))

function main() {
  const tasks = []
  const copy = list.map((i) => [...i])

  let i = 0,
    j = 0

  function isValid(i: number, j: number, list: List) {
    // 判断每一行
    {
      if (!isNine(list[i])) {
        return false
      }
    }
    // 判断每一列
    {
      const col = list.map((row) => row[j]) as Row
      if (!isNine(col)) {
        return false
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
        return false
      }
    }

    return true
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

  function render(i: number, j: number, val: number | string) {
    result[i][j] = val
  }

  while (i < 9 && j < 9) {
    if (list[i][j]) {
      next()
    } else {
      copy[i][j]++
      // 存储快照
      {
        const val = copy[i][j] > 9 ? '' : copy[i][j]
        const _i = i
        const _j = j
        tasks.push(() => {
          render(_i, _j, val)
        })
      }
      if (copy[i][j] > 9) {
        copy[i][j] = 0
        prev()
      } else if (isValid(i, j, copy)) {
        next()
      }
    }
  }

  console.log('[tasks]', tasks.length)

  tasks.reduce((p, fn) => {
    return p.then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            fn()
            resolve(void 0)
          })
        })
    )
  }, Promise.resolve())
}

main()

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
  <table>
    <tr class="group" v-for="(item, i) in result" :key="i">
      <td
        :data-problem="!!list[i][j]"
        class="border-b-2 border-r-2 border-slate-300 [&:nth-child(3n):not(:last-child)]:border-r-4 group-[&:nth-child(3n):not(:last-child)]:border-b-4 text-center w-[50px] h-[50px] data-problem:bg-slate-200 text-slate-900 data-problem:text-slate-700"
        v-for="(cell, j) in item"
        :key="j"
      >
        {{ cell }}
      </td>
    </tr>
  </table>
</template>

<style scoped lang="scss"></style>
