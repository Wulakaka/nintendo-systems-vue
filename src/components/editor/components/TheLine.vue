<script setup lang="ts">
import type { Line } from '@/components/editor/types'
import Code from '@/models/Code'
import TheFrag from '@/components/editor/components/TheFrag.vue'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  data: string
  index: number
}>()

defineExpose({
  show,
  get length() {
    return getLength()
  },
  get index() {
    return props.index
  }
})

const { code, tagName, options } = getCodeFragmentContainer(props.data)

const codeFragments = Code.parseFragmentDirective(code, { removeLineDirectives: true })

const children = ref<InstanceType<typeof TheFrag>[]>([])

const t = ref(0)
const stat = computed(() => {
  return t.value === 0 ? 'empty' : t.value === 1 ? 'complete' : 'typing'
})

function getCodeFragmentContainer(code: string) {
  const lineDirective = Code.getLineDirective(code, 'link')

  const options: Line.Option = {
    class: [/^<#\[\[comment\]\]/.test(code) ? 'comment' : '']
  }

  let tagName = 'span'

  if (lineDirective) {
    tagName = 'a'
    options.href = lineDirective
    // 将内容高亮
    code = code.replace(/[A-Z][_0-9A-Z]+/g, '<#[[highlight]]$&/>')
  }

  return {
    code,
    tagName,
    options
  }
}

function getLength() {
  return children.value.reduce((count, child) => {
    return count + child.length
  }, 0)
}

watch(t, (t) => {
  let m = 0
  const length = getLength()
  children.value
    .sort((a, b) => a.index - b.index)
    .forEach((child) => {
      const _t = (t * length - m) / child.length
      child.show(0 > _t ? 0 : 1 < _t ? 1 : _t)
      m += child.length
    })
})

function show(_t: number) {
  t.value = _t
}
</script>
<template>
  <li class="line" :class="options.class" :data-stat="stat">
    <a v-if="tagName === 'a'" href="javascript:" :data-href="options.href ?? '#'">
      <TheFrag
        v-for="(i, index) in codeFragments"
        :key="index"
        :data="i"
        ref="children"
        :index="index"
      ></TheFrag>
    </a>
    <template v-else>
      <TheFrag
        v-for="(i, index) in codeFragments"
        :key="index"
        :data="i"
        ref="children"
        :index="index"
      ></TheFrag>
    </template>
  </li>
</template>
<style scoped lang="scss">
li {
  background: aliceblue;
  &[data-stat='empty'] {
    display: none;
  }
  &[data-stat='typing'] {
    background-color: #e0e0e0;
  }
  &[data-stat='typing']::after {
    background-color: #e60012;
    content: ' ';
    animation: 1s linear infinite kf-blink;
  }
}

@media (hover: hover) {
  li:hover {
    background-color: #e6e6e6;
  }
}
</style>
