<template>
  <div class="page">
    <div class="first">
      <div class="second">
        <a-row>
          <a-col :span="12" class='onclick' @click="onclick1">登录界面</a-col>
          <a-col :span="12" class='onclick' @click="onclick2">注册界面</a-col>
        </a-row>
      </div>
      <div class="third">     
        <loginFirst v-if="isShowFirst" @giveValue="handleGiveValue"/>
        <loginSign v-if="isShowSign"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import loginFirst from '@/components/loginFirst'
import loginSign from '@/components/loginSign'
const isShowFirst = ref(true);
const isShowSign = ref(false);
const value1 = ref('');
const value2 = ref('');

function onclick1() {
  isShowFirst.value = true;
  isShowSign.value = false;
}
function onclick2() {
  isShowFirst.value = false;
  isShowSign.value = true;
}
function handleGiveValue(val1, val2) {
  value1.value = val1;
  value2.value = val2;
  console.log('Received values:', value1.value, value2.value);
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  display: flex;
  /* display: flex和justify - content: center以及align - items: center来实现内容在水平和垂直方向上的居中 */
  justify-content: center;
}

.first {
  background: #cbdde9;
  display: flex;
  flex-direction: column;
  justify-content: row;
  align-items: center;
  width: 600px;
  height: 320px;
}

.second {
  display: inline;
}

.third {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  margin-top: 20px;
}

.onclick {
  cursor: pointer;
  font-size: 16px;
  color: #333; /* 设置字体颜色 */
  background-color: rgb(127, 204, 255);
  font-weight: bold;
  padding: 20px 20px;
}

</style>