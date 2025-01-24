<template>
  <div class="comments">
    <div class="comments-header">
      <h2>留言区</h2>
    </div>
    <hr/>

    <!-- 编辑区 -->
    <div class="editbox">
      <div class="editbox-left">
        <a-avatar>
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
      <div class="editbox-middle">
        <a-input v-model:value="comment" placeholder="输入内容" @input="handleInput" @keyup.enter="handlerPublish"/>
      </div>
      <div class="editbox-right">
        <a-button @click="handlerPublish">发布</a-button>
      </div>
    </div>

    <!-- 列表区 -->
    <div class="listbox" v-for="(item, index) in paginatedData" :key="index">
      <div class="top-level">
        <div class="listbox-top-user">
          <a-avatar style="background-color: #f56a00">K</a-avatar>
          <p>
            <span>{{ item.createdBy }}</span>
            <span>{{ item.roleName }}</span>
          </p>
        </div>
        <div class="listbox-middle-root">{{ item.comment }}</div>
        <div class="listbox-bottom">
          <span>发布时间: {{ item.createdAt }}</span>
          <span @click="reply(item)">回复</span>
        </div>
      </div>

      <!-- 子留言区 -->
      <div v-if="item.children && item.children.length">
        <SecondComment :secondcomment="item.children" />
      </div>
    </div>
    
    <!-- 分页器 -->
    <div class="components-pagination-demo-mini">
      <a-pagination @change="onChange" size="big" :total="allData.length" show-size-changer show-quick-jumper />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mockData from '@/views/mockData.json'
import SecondComment from '@/views/SecondComment.vue'

// 响应式变量
const comment = ref("");  // 用于编辑框的内容
const allData = ref([]);  // 所有顶级评论数据
const currentPage = ref(1); // 当前页码
const pageSize1 = ref(10); // 每页显示的评论数量
const paginatedData = ref([]); // 当前分页显示的数据

// 页面挂载时加载评论数据
onMounted(() => {
  loadComments();
  updatedPaginatedData();
});

// 从本地存储或默认 mockData 加载评论
function loadComments() {
  const savedData = localStorage.getItem('commentList');
  if (savedData) {
    // 如果本地存储有评论数据，使用它
    allData.value = JSON.parse(savedData);
  } else {
    // 如果没有存储数据，使用 mockData
    allData.value = mockData.map(item => item.data);  // 确保数据格式一致
  }
}

// 发布评论
function handlerPublish() {
  if (comment.value.trim() === '') {
    console.log('内容不能为空');
    return;
  }
  // 创建新的评论对象
  const newComment = {
    // id: Date.now().toString(),
    createdBy: '当前用户',  // 实际使用时替换为实际用户名
    roleName: '角色名',  // 实际使用时替换为实际角色
    comment: comment.value,
    createdAt: new Date().toLocaleString(),
    children: [],
  };
  // 将新评论添加到评论列表
  allData.value.unshift(newComment);
  // 更新本地存储
  localStorage.setItem('commentList', JSON.stringify(allData.value));
  // 清空输入框
  comment.value = '';
}

const onChange = (pageNumber, pageSize) => {
  console.log('当前页面: ', pageNumber);
  console.log('当前页面长度: ', pageSize);
  currentPage.value = pageNumber;
  pageSize1.value = pageSize;
  updatedPaginatedData();
  // const len = allData.value.length;
  // console.log('数据长度: ', len);

};

function updatedPaginatedData() {
  const start = (currentPage.value - 1) * pageSize1.value;
  const end = start + pageSize1.value;
  paginatedData.value = allData.value.slice(start, end);
}

// 输入框内容变化时的处理
function handleInput(value) {
  console.log("当前输入:", value);
}

// 回复评论
function reply(item) {
  console.log('回复的评论:', item);
}
</script>

<style scoped>
.editbox {
  width: 100%;
  height: 30px;
  margin: 0 20px 20px 20px;
  display: flex;
}

.top-level {
  margin: 0 20px 20px 20px;
}

.listbox-top-user {
  display: flex;
}

.listbox-middle-root {
  margin: 15px 5px 5px 5px;
}

.listbox-bottom {
  margin: 15px 5px 15px 5px;
}

.components-pagination-demo-mini .ant-pagination:not(:last-child) {
  margin-bottom: 24px;
}
</style>
