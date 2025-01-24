<template>
    <div class="a">
        <div>{{ props.info }}</div>
        <button @click="handler">点击我</button>
        <hr/>
        <button @click="emitter.emit('send-data', toy)">点我!</button>
    </div>
</template>
  
<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import emitter from '../utils/emitter.ts'
const toy = ref('联想');
const props = defineProps({
    info: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['abc']);
const handler = () => {
    emit('abc', '梅西', '阿根廷');
}
</script>

<style scoped> 
.a {
    background-color: #bb5757;
}
</style>
  