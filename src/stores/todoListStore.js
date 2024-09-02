import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoListStore', () => {
  const api = ref('https://todolist-api.hexschool.io')
  const token = ref('') // 登入後取得的 token

  const userNickname = ref('')
  const todoActiveTab = ref('all')

  function $reset() {
    token.value = ''
    userNickname.value = ''
    todoActiveTab.value = 'all'
  }

  return { api, token, todoActiveTab, userNickname, $reset }
})
