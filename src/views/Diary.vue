<template>
    <h1>我的日志！</h1>
    <div class="bg">
      <div class="content">
        <textarea class="custom-textarea" placeholder="输入内容"></textarea>
      </div>
      <a-button>发动态</a-button>
      <a-button>发日志</a-button>
    </div>
  </template>
  
  <script>
  export default {
  
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