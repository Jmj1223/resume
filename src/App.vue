<template>
  <a-layout class="layout">
    <a-layout-header :style="{ background: '#addd'}">
      <div class="logo" />
      <a-menu
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :style="{ background: '#addd', lineHeight: '64px' }"
      >
        <a-menu-item key="1" @click="clickHome">主页</a-menu-item>
        <a-menu-item key="2" @click="clickDiary">日志</a-menu-item>
        <a-menu-item key="3" @click="clickAbout">关于</a-menu-item>
      </a-menu>
      <div class="search">
        <a-input-search
          v-model:value="value"
          placeholder="请输入内容"
          enter-button
          @search="goSearch"
          allowClear
          pressEnter="goSearch"
          class="input-search"
        />
      </div>
      <div class="right">
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1" @click="goLogin">
                <UserOutlined />
                登录
              </a-menu-item>
              <a-menu-item key="2" @click="goMyPage">
                <UserOutlined />
                个人主页
              </a-menu-item>
              <a-menu-item key="3" @click="goBack">
                <UserOutlined />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
          <a-avatar class="avatar" size="large" shape='square'>
            <template #icon><UserOutlined /></template>
            <DownOutlined />
          </a-avatar>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <a-breadcrumb-item>日志</a-breadcrumb-item>
        <a-breadcrumb-item>关于</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <RouterView/>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>


<script setup>
import { ref } from 'vue'
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
const value = ref('');
const selectedKeys = ref('');
const router = useRouter();
const route = useRoute();
function clickHome() {
  router.push({
    path: '/home',
  })
}
function clickDiary() {
  router.push({
    path: '/diary',
  })
}
function clickAbout() {
  router.replace({
    path: '/about',
  })
}
function goSearch() {
  console.log("搜索",value.value);
}
function goLogin() {
  console.log('到达登录界面');
  console.log(route);
  router.push({
    path: '/login',
  })
}
function goMyPage() {
  console.log('到达个人主页');
  router.push({
    path: '/mypage',
  })
}
function goBack() {
  console.log('退出登录');
  localStorage.removeItem('user');
  router.push({
    path: '/login',
  })
}
</script>



<style>
.avatar {
  background-color: #dfdede;
  color: #4771e4; 
  cursor: pointer;
}
.right {
  position: absolute;
  display: flex;
  right: 5px;
  top: 10px;
}
.search {
  height: 100px;
  width: 300px;
  position: absolute; /* 使用绝对定位 */
  right: 60px; /* 靠右对齐 */
  top: 15px; /* 靠顶部对齐，你可以根据需要调整这个值 */
  border-radius: 10px; /* 圆角边框 */
}

</style>
