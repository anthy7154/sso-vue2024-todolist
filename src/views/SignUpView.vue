<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
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
          <h2 class="formControls_txt">註冊帳號</h2>

          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email"
            v-model="signUpField.email" required>

          <label class="formControls_label" for="name">您的暱稱</label>
          <input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱"
            v-model="signUpField.nickname">

          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼"
            v-model="signUpField.password" required>

          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd2" placeholder="請再次輸入密碼"
            v-model="signUpPassword2" required>
          <span v-if="signUpField.password != signUpPassword2">密碼不一致</span>

          <input class="formControls_btnSubmit" type="button" @click="signUp" value="註冊帳號">
          <RouterLink to="/login">
            <a class="formControls_btnLink">登入</a>
          </RouterLink>
        </form>
      </div>
    </div>

  </div>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useTodoListStore } from '@/stores/todoListStore';
import { useRouter } from 'vue-router';

// pinia
const todoListStore = useTodoListStore()
const api = todoListStore.api

const router = useRouter()

// 註冊 ==============================
const signUpField = ref({
  email: "",
  password: "",
  nickname: ""
})
const signUpPassword2 = ref("")

const signUpRes = ref("");
const signUp = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_up`,
      signUpField.value
    );
    // console.log(res);
    signUpRes.value = `註冊成功, UID: ${res.data.uid}`
    alert(signUpRes.value)

    setTimeout(() => {
      router.push('/login')
    }, 1000);

  } catch (error) {
    // console.log(error)
    alert(`註冊失敗：${error.response.data.message}`)
  }
}
</script>