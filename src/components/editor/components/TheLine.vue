<script setup lang="ts">
import type { Line } from '@/components/editor/types'
import Code from '@/models/Code'
import TheFrag from '@/components/editor/components/TheFrag.vue'

const props = defineProps<{
  data: string
}>()

const { code, tagName, options } = getCodeFragmentContainer(props.data)

const codeFragments = Code.parseFragmentDirective(code, { removeLineDirectives: true })

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
</script>
<template>
  <li class="line" :class="options.class">
    <a v-if="tagName === 'a'" :href="options.href">
      <TheFrag v-for="(i, index) in codeFragments" :key="index" :data="i"></TheFrag>
    </a>
    <template v-else>
      <TheFrag v-for="(i, index) in codeFragments" :key="index" :data="i"></TheFrag>
    </template>
  </li>
</template>
<style scoped lang="scss"></style>
