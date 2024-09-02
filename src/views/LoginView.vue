<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer ">
      <div class="side">
        <a href="#"><img class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""></a>
        <img class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg">
      </div>
      <div>
        <form class="formControls" action="#">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>

          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email"
            v-model="signInField.email" requird>
          <span v-if="!signInField.email">此欄位不可留空</span>

          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼"
            v-model="signInField.password" required>
          <span v-if="!signInField.password">此欄位不可留空</span>

          <input class="formControls_btnSubmit" type="button" @click="signIn" value="登入">
          <RouterLink to="/signup">
            <a class="formControls_btnLink">註冊帳號</a>
          </RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

import { useTodoListStore } from '@/stores/todoListStore';
// import { storeToRefs } from 'pinia';

// router
const router = useRouter()

// pinia
const todoListStore = useTodoListStore()
const api = todoListStore.api
// const { token } = storeToRefs(todoListStore) // 登入後取得的 token

// user input
const signInField = ref({
  email: "",
  password: "",
})

// axios response
const signInRes = ref("")

// 登入後會回傳 token
const signIn = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_in`,
      signInField.value
    )
    signInRes.value = `登入成功`

    // 將 token 存入 cookie
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.cookie = `hexschoolTodo=${res.data.token}; expires=${tomorrow.toUTCString()}`;

    alert(signInRes.value)
    // console.log(token.value)
    setTimeout(() => {
      router.push('/todo')
    }, 1000)

  } catch (error) {
    // console.log(error)
    alert(`登入失敗：${error.response.data.message}`)
  }
}
</script>
