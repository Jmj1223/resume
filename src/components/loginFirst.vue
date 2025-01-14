<template>
    <div class="login">
      <a-form
      layout="vertical"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      :rules="loginRules"
        >
          <a-form-item label="用户名" labelAlign="left" name="user">
              <a-input v-model:value="formState.user" placeholder="请输入用户名" @input="emitEvent" allowClear>
                  <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
          </a-form-item>
          <a-form-item label="密码" name="password">
              <a-input-password v-model:value="formState.password" placeholder="请输入密码" @input="emitEvent">
                  <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input-password>
          </a-form-item>
          <a-form-item>
              <a-button
                  style="width:300px"
                  type="primary"
                  html-type="submit"
                  :disabled="formState.user === '' || formState.password === ''"
                  @click="goHome"
              >
                  登录
              </a-button>
          </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script setup>
  import {defineEmits, reactive} from 'vue'
  import {useRouter} from 'vue-router'
  const formState = reactive({
    user: '',
    password: '',
  });
  const router = useRouter();
  const emit = defineEmits(['giveValue']);
  const loginRules = reactive({
    user: [{
        required: true,
        message: '用户名不能为空',
        trigger: 'blur',
    },{
        pattern: /^1[3-9]\d{9}$/,
        message: '手机号格式不正确',
        trigger: 'blur',
    }],
    password: [{
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
    },{
        min:6,
        max:16,
        message: '密码长度应该为6-16位之间',
        trigger: 'blur',
    }]
  })

  function emitEvent() {
      emit('giveValue', formState.user, formState.password);
  }
  async function goHome() {
      console.log(formState.user, formState.password)
      if(localStorage.getItem('user')) {
        alert('你已经登录了')
      }
      if(formState.user === '19810628399' && formState.password !== '339265565') {
        alert('密码错误！')
      }
      if(formState.user === '19810628399' && formState.password === '339265565') {
        localStorage.setItem('user', JSON.stringify(formState.user));
        router.push({
            path: '/home'
        })
      }
  }
  </script>
  
  <style>

  </style>