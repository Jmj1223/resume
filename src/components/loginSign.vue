<template>
    <div class="login">
        <a-input v-model:value="value1" 
            placeholder="请输入手机号" 
            maxlength="12"
            auto-size="large"
            allowClear
        />
        <span v-if="showPhone" style="color: red;">请输入正确的手机号</span>
        <a-input-password v-model:value="value2" 
            placeholder="请输入密码" 
            maxlength="12"
            auto-size="large"
            allowClear
            @input="emitEvent"
        />
        <span v-if="showPassword" style="color: red;">请输入正确的密码</span>
        <a-input-search class="loginText"
            v-model:value="value3"
            placeholder="请输入验证码"
            size="large"
            maxlength="5"
            @search="onSearch"
            >
        <template #enterButton>
            <a-button>发送验证码</a-button>
        </template>
        </a-input-search>
    </div>
    <div class="button">
        <a-button type="primary" @click="goHome">登录</a-button>
        <a-button type="primary">注册</a-button>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const showPhone = ref(false);
const showPassword = ref(false);
</script>

<style>
.login {
    display: grid; /* 或者 display: flex; 也可使用 */
    gap: 20px; /* 设置元素之间的间隔为15px，可调整 */
}
.button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>