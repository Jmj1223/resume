<template>
    <h1>我的日志！</h1>
    <div class="bg">
      <div class="content">
        <textarea v-model="info" class="custom-textarea" placeholder="输入内容"></textarea>
      </div>
      <a-button @click="getInfo">发动态</a-button>
      <a-button>发日志</a-button>
    </div>
    <DiaryZi :info="infoa" @abc="getPlayer"></DiaryZi>
    <br/>
    <DiaryZii></DiaryZii>
    <Review :comments="info"></Review>
  </template>
  
<script setup>
import DiaryZi from '@/views/DiaryZi.vue'
import DiaryZii from '@/views/DiaryZii.vue'
import Review from '@/views/Review.vue'
import {ref} from 'vue'
const infoa = ref('我是父组件');
const getPlayer = (name, country) => {
  console.log(`球员：${name}，国家：${country}`)
}
const info = ref('');
function getInfo() {
  console.log(info);

}
</script>
  
  <style>
  .bg {
    background: white;
  }
  .custom-textarea {
    width: 100%; /* 或根据需求设置固定宽度 */
    height: 150px;
    padding: 10px;
    font-size: 16px;
    line-height: 1.5;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    outline: none;
}

  </style>