import { ref } from 'vue'
import RandomText, { DeleteText } from '@/models/RandomText'
import chain from '@/utils/chain'
import wait from '@/utils/wait'
import Blink from '@/models/Blink'

export default function useNotice() {
  const text = ref('')
  const _cursor = ref('')

  const cursor = new Blink('&#9608;', '&nbsp;')
  const t1 = '各位领导，'
  const t2 = '敬爱的领导，'
  const t3 = '请放我走吧！'
  const t4 = '日你妈快让老子走！'
  const t5 = t2 + t3

  const text1 = new RandomText(t1)
  const text2 = new DeleteText(t1)
  const text3 = new RandomText(t2)
  const text4 = new RandomText(t3)
  const text5 = new RandomText(t4)
  const text6 = new DeleteText(t5)

  function renderText(t: string) {
    text.value = t
  }

  const main = () =>
    chain(function () {
      chain(
        () =>
          text1.show(renderText, {
            duration: 1000,
            delay: 300,
            interval: 50
          }),
        () => wait(500),
        () =>
          text2.show(renderText, {
            duration: 500,
            interval: 50
          }),
        () => wait(500),
        () =>
          text3.show(renderText, {
            duration: 1000,
            delay: 300,
            interval: 50
          }),
        () => wait(300),

        () =>
          text4.show(
            (t: string) => {
              text.value = text3.value + t
            },
            {
              duration: 1000,
              delay: 300,
              interval: 50
            }
          ),

        () => wait(600),
        () =>
          text6.show(renderText, {
            duration: 500,
            interval: 50
          }),
        () =>
          text5.show(renderText, {
            duration: 1000,
            delay: 300,
            interval: 50
          })
      )
      return cursor.show(
        (t) => {
          _cursor.value = t
        },
        {
          duration: 1e4,
          interval: 5e2
        }
      )
    })

  return {
    text,
    cursor: _cursor,
    main
  }
}
