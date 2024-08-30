import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoListStore', () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
  const api = ref('https://todolist-api.hexschool.io')
  const token = ref('') // 登入後取得的 token

  // const userNickname = ref('')
  const todoActiveTab = ref('all')

  return { api, token, todoActiveTab }

  // return { count, doubleCount, increment }
})
