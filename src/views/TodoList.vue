<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm"><a href="#/todo"><span>{{ userNickname }} 的代辦</span></a></li>
        <li><a href="#" v-on:click="signOut">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="newTodo">
          <a href="#/todo" v-on:click="addTodo">
            <i class="fa fa-plus">+</i>
          </a>
        </div>

        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a href="#/todo" :class="{ active: todoActiveTab === 'all' }" v-on:click="handleActive('all')">全部</a>
            </li>
            <li><a href="#/todo" :class="{ active: todoActiveTab === 'unfinished' }"
                v-on:click="handleActive('unfinished')">待完成</a></li>
            <li><a href="#/todo" :class="{ active: todoActiveTab === 'finished' }"
                v-on:click="handleActive('finished')">已完成</a></li>
          </ul>

          <div class="todoList_items">
            <p v-if="todos.length === 0">目前尚無待辦事項</p>
            <ul class="todoList_item">
              <li v-for="(todo) in filteredTodos" v-bind:key="todo.id">
                <label class="todoList_label" v-on:click="toggleTodoStatus(todo.id)">
                  <input class="todoList_input" type="checkbox" value="true" :checked="todo.status">
                  <span>{{ todo.content }}</span>
                </label>
                <a href="#/todo" v-on:click="deleteTodo(todo.id)">
                  <i class="fa fa-times">X</i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p v-if="todos.length > 0 && todoActiveTab !== 'finished'">{{ countUnfinished }} 個待完成項目</p>
              <p v-if="todos.length > 0 && todoActiveTab === 'finished'">{{ countFinished }} 個已完成項目</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoListStore } from '@/stores/todoListStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const todoListStore = useTodoListStore()
const { token, userNickname } = storeToRefs(todoListStore)
const api = todoListStore.api

// 驗證 ==============================
const tokenCheckout = ref("")
const checkoutRes = ref("")

// 使用登入後回傳的 token 去驗證，並存入 document.cookie
const checkout = async () => {
  try {
    tokenCheckout.value = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolTodo\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        authorization: tokenCheckout.value
      }
    });
    // console.log(res);

    checkoutRes.value = `驗證成功, UID: ${res.data.uid}, Nickname: ${res.data.nickname}`
    userNickname.value = res.data.nickname
    // console.log(checkoutRes.value)

    // 驗證成功後，將已驗證的 token 拿去執行 getTodos()
    token.value = tokenCheckout.value
    getTodos()

  } catch (error) {
    // console.log(error.message)
    checkoutRes.value = `驗證失敗, ${error.message}`
    console.log(checkoutRes.value)

    alert("驗證失敗，請重新登入")
    router.push('/login')
  }
};

// ToDo List ==============================
const todos = ref([])
const newTodo = ref("")
const { todoActiveTab } = storeToRefs(todoListStore)

// 取得所有 todos ==============================
const getTodos = async () => {
  try {
    // console.log(todos.value)
    const res = await axios.get(`${api}/todos`, {
      headers: {
        authorization: token.value
      }
    })
    // console.log(res.data)
    todos.value = res.data.data

    todos.value.forEach((todo, index) => {
      todos.value[index] = {
        ...todo,
        "createTime": new Date(todo.createTime * 1000).toLocaleString(),
      }
    })
    // console.log("todos:", todos.value)

  } catch (error) {
    console.log(error)
  }
}

const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    return (todoActiveTab.value === "finished") ? todo.status === true : (todoActiveTab.value === "unfinished") ? todo.status === false : todo
  })
})

// 新增 todo ==============================
const addTodo = async () => {
  if (newTodo.value.trim() === "") {
    alert("請輸入 Todo 內容，再進行提交")
    return;
  }
  try {
    // console.log(newTodo.value)
    await axios.post(`${api}/todos/`,
      {
        content: newTodo.value
      },
      {
        headers: {
          authorization: token.value
        }
      })
    newTodo.value = ""
    getTodos()

  } catch (error) {
    console.log(error)
  }
}

// 刪除 todo ==============================
const deleteTodo = async (todoId) => {
  try {
    await axios.delete(`${api}/todos/${todoId}`, {
      headers: {
        authorization: token.value
      }
    })
    getTodos()

  } catch (error) {
    console.log(error)
  }
}

// 更新 todo 狀態 ==============================
const toggleTodoStatus = async (todoId) => {
  try {
    await axios.patch(`${api}/todos/${todoId}/toggle`, {},
      {
        headers: {
          authorization: token.value
        }
      })
    getTodos()

  } catch (error) {
    console.log(error)
  }
}

// 登出 ==============================
// signout 時，API 那端會將該組 cookie 失效，不能再用於 chekcout，如果一開始沒先過 checkout 就 signout 那會驗證不過 
// 但失效的 cookie 還是能 signout 登出成功 (應該還存在伺服器)
const signOutRes = ref("");
const reset = todoListStore.$reset

const signOut = async () => {
  try {
    // url, data, headers
    const res = await axios.post(`${api}/users/sign_out`,
      {},
      {
        headers: {
          authorization: token.value
        }
      });
    // console.log(res);
    signOutRes.value = res.data.message;
    alert(signOutRes.value)

    token.value = ""
    document.cookie = `hexschoolTodo=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

    // 重置 pinia 資料
    reset()

    setTimeout(() => {
      router.push('/login')
    }, 3000);

  } catch (error) {
    console.log(error)
    signOutRes.value = `登出失敗, ${error.message}`;
  }
};

// 計數待完成項目 ==============================
const countUnfinished = computed(() => {
  const count = ref(0)
  todos.value.forEach((todo) => {
    if (todo.status === false) {
      count.value++
    }
  })
  return count
})

const countFinished = computed(() => {
  const count = ref(0)
  todos.value.forEach((todo) => {
    if (todo.status === true) {
      count.value++
    }
  })
  return count
})

const handleActive = (status) => {
  todoActiveTab.value = status
  // console.log(todoActiveTab.value)
}

onMounted(() => {
  checkout()
  // console.log(token)

  if (token.value) {
    // checkout()

    getTodos()
  }
});



</script>