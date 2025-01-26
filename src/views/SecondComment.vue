<template>
     <!-- 注意v-for的位置,它决定了渲染的内容 -->
    <div class="SecondComment" v-for="(item, index) in comment1" :key="index">
        <div class="top">
            <a-avatar style="background-color: #a56a20">M</a-avatar>
            <p>
                <span>{{ item.createdBy }}</span>
                <span>{{ item.roleName }}</span>
            </p>
        </div>
        <div class="mid">{{ item.comment }}</div>
        <div class="bottom">
            <span>发布时间: {{ item.createdAt }}</span>
            <span>回复</span>
        </div>
    </div>
</template>

<script setup>
import {defineProps} from 'vue'
const props = defineProps(['secondcomment']);
console.log(props.secondcomment);
// 在 Vue 3 中，props 本身就是响应式的，不需要 .value
const comment1 = props.secondcomment.map(item=>item.data);
// console.log('数据:', comment1);

</script>

<style>

.top {
    display: flex;
}

.mid {
    margin: 15px 5px 5px 5px;
}

.bottom {
    margin: 15px 5px 15px 5px;
}

</style>