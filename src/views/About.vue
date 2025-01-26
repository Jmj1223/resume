<template>
  <div class="comments">
    <div class="comments-header">
      <h2>留言区</h2>
    </div>
    <hr/>

    <!-- 编辑区 -->
    <!-- 编辑区: 
      1. 左侧：显示当前登录用户头像 
      2. 中间：输入框，使用 v-model 收集用户输入的内容 comment 
      3. 右侧：在 handlePublish 方法中请求新增留言接口
     -->
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
    <!-- 列表区
      1. 遍历分页获取的留言列表，并设置唯一的 key 值
      2. 顶级留言包括：头像、昵称、角色名标签、留言内容、发布时间
      3. 点击 “回复” 会触发事件 handleReply，同时传入两个参数：当前被回复留言的根ID、当前被回复留言的直接父级ID
        a. 这两个参数用于给【即将发布的留言】设置根ID与直接父级ID，做到 “回复框的定位” 
        b. 对于二级留言，这两个值传入顶级留言本身的ID就行
       -->
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
          <span @click="reply(item.id, item.id)">回复</span>
        </div>
      </div>

      <!-- 子留言区 -->
      <!-- 子留言区
        1. 这里没有使用在二级组件中引入三级以上组件的方式，因为当时开发的时候感觉传值有点麻烦
        2. 使用两个子组件同级的形式
      子留言：二级
        1. 判断顶层留言是否存在二级子留言，是则引入 SecondComment 子组件
        2. 父组件传递参数：二级评论 item.children
        3. 处理 “回复” 功能，使用同一个方法实现（handleReply），这里的根ID和直接父ID是子组件传过来的
        4. handle-reply 是子组件中声明需要抛出的事件，@handle-reply 代表监听子组件的自定义事件
         -->
      <div v-if="item.children && item.children.length" style="margin-left: 50px">
        <SecondComment :secondcomment="item.children"/>
      </div>

      <!-- 回复框
      1. 使用一个变量 showReply 来控制显示隐藏
      2. 同时使用变量 showReplyIndex 用来确定是在哪条留言下显示回复框，否则点击 “回复” 会在所有留言下都出现回复框
      3. 当 handleReply 方法被触发时，改变 showReply 和 showReplyIndex 的值
      4. 使用 replyComment 收集回复框输入的内容，当触发 handlePublish 方法时作为参数传进去
         -->
      <div class="reply-box" v-show="showReplyIndex == item.id && showReply">
        <div class="replybox">
          <div class="replybox-left">
            <a-avatar style="background-color: #f56a00">K</a-avatar>
          </div>
          <div class="reply-mid">
            <a-input v-model:value="replyComment" placeholder="回复内容"/>
          </div>
          <div class="reply-right">
            <a-button @click="reply(item.id, item.id)">提交</a-button>
          </div>
        </div>
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
const showReplyIndex = ref(0); // 控制回复框的索引, 用来确定是在哪条留言下显示回复框
const showReply = ref(false); // // 控制回复框的显示隐藏

// 页面挂载时加载评论数据
onMounted(() => {
  // 拿到评论数据
  loadComments();
  // 根据页面大小拿数据
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
    id: Date.now().toString(),
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
   // 更新分页数据
  updatedPaginatedData();
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
function reply(rootId, parentId) {
  // console.log('回复的评论:', item);
  showReply.value = !showReply.value;
  showReplyIndex.value = rootId;  
  console.log('回复的评论:', parentId);
}
</script>

<style scoped>
.editbox {
  display: flex;
  width: 100%;
  margin: 0 20px 20px 20px;
}

.editbox-left {
  width: 40px; /* 固定宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.editbox-middle {
  flex-grow: 1; /* 占据剩余空间 */
  margin: 0 10px; /* 左右间距 */
}

.editbox-right {
  width: 70px; /* 按钮的固定宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
}

a-input {    
  width: 60%;
}

.top-level {
  margin: 0 20px 20px 20px;
}

.listbox-top-user {
  display: flex; /* 为了让头像和名称在一行显示，而不是两行 */
}

.listbox-middle-root {
  margin: 15px 5px 5px 5px;
}

.listbox-bottom {
  margin: 15px 5px 15px 5px;
}

</style>
