<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
        <li><a href="#loginPage">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項">
          <a href="#">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a href="#" class="active">全部</a></li>
            <li><a href="#">待完成</a></li>
            <li><a href="#">已完成</a></li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="(todo) in todos" v-bind:key="todo.id">
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>把冰箱發霉的檸檬拿去丟</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>

              <!-- <div>
              <ul class="list-group list-group-flush" v-for="(todo) in todos" v-bind:key="todo.id">
                <li class="list-group-item">
                  <span class="fs-5">內容：{{ todo.content }} @{{ todo.createTime }}
                    <span :style="!todo.status ? { 'color': 'red' } : { 'color': 'green' }">【{{ todo.status ? "完成" :
                      "未完成" }}】 </span>
                  </span>
                  <input type="text" class="form-control" id="todoInputEditTodo" placeholder="Edit Todo"
                    v-model="todoEdit[todo.id]">
                  <div class="mb-3 text-end">
                    <button type="button" class="btn btn-outline-primary btn-sm"
                      @click="deleteTodo(todo.id)">Delete</button>
                    <button type="button" class="btn btn-outline-primary btn-sm"
                      @click="updateTodo(todo.id)">Update</button>
                    <button type="button" class="btn btn-outline-primary btn-sm"
                      @click="toggleTodoStatus(todo.id)">Toggle
                      Status</button>
                  </div>
                </li>
              </ul>
            </div> -->


              <!-- <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>打電話叫媽媽匯款給我</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
              <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>整理電腦資料夾</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
              <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>繳電費水費瓦斯費</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
              <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>約vicky禮拜三泡溫泉</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
              <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>約ada禮拜四吃晚餐</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li> -->
            </ul>
            <div class="todoList_statistics">
              <p> 5 個已完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
// import axios from 'axios';
// import { onMounted, ref } from 'vue';
// import { storeToRefs } from 'pinia';
// import { useTodoListStore } from '@/stores/todoListStore';

// const todoListStore = useTodoListStore()
// const { token } = storeToRefs(todoListStore)
// const api = todoListStore.api

// // ToDo List ==============================
// const todos = ref([])
// const newTodo = ref("")

// // 取得所有 todos ==============================
// const getTodos = async () => {
//   try {
//     // console.log(todos.value)
//     const res = await axios.get(`${api}/todos`, {
//       headers: {
//         authorization: token.value
//       }
//     })
//     // console.log(res.data)
//     todos.value = res.data.data

//     todos.value.forEach((todo, index) => {
//       todos.value[index] = {
//         ...todo,
//         "createTime": new Date(todo.createTime * 1000).toLocaleString()
//       }
//     })
//     // console.log("todos:", todos.value)

//   } catch (error) {
//     console.log(error)
//   }
// }

// // 新增 todo ==============================
// const addTodo = async () => {
//   try {
//     // console.log(newTodo.value)

//     await axios.post(`${api}/todos/`,
//       {
//         content: newTodo.value
//       },
//       {
//         headers: {
//           authorization: token.value
//         }
//       })
//     newTodo.value = ""
//     getTodos()

//   } catch (error) {
//     console.log(error)
//   }
// }

// // 修改 todo ==============================
// const todoEdit = ref({});
// const updateTodo = async (todoId) => {
//   try {
//     // const todo = todos.value.find((todo) => todo.id === todoId);
//     // todo.content = todoEdit.value[todoId];
//     // const updateTodoRes = await axios.put(`${api}/todos/${todoId}`, todo,

//     await axios.put(`${api}/todos/${todoId}`,
//       {
//         content: todoEdit.value[todoId]
//       }, {
//       headers: {
//         authorization: token.value
//       }
//     })
//     // console.log(updateTodoRes)

//     todoEdit.value[todoId] = ""
//     getTodos()

//   } catch (error) {
//     console.log(error)
//   }
// }

// // 刪除 todo ==============================
// const deleteTodo = async (todoId) => {
//   try {
//     await axios.delete(`${api}/todos/${todoId}`, {
//       headers: {
//         authorization: token.value
//       }
//     })
//     getTodos()

//   } catch (error) {
//     console.log(error)
//   }
// }

// // 更新 todo 狀態 ==============================
// const toggleTodoStatus = async (todoId) => {
//   try {
//     await axios.patch(`${api}/todos/${todoId}/toggle`, {},
//       {
//         headers: {
//           authorization: token.value
//         }
//       })
//     getTodos()

//   } catch (error) {
//     console.log(error)
//   }
// }

// onMounted(() => {
//   token.value = document.cookie.replace(
//     /(?:(?:^|.*;\s*)hexschoolTodo\s*=\s*([^;]*).*$)|^.*$/,
//     "$1",
//   );
//   // console.log(token)

//   if (token.value) {
//     // tokenCheckout.value = token.value
//     // checkout()

//     getTodos()
//   }
// });

</script>