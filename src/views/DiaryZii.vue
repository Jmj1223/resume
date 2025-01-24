<template>
    <div class="b">
        <p>{{toy}}</p>
    </div>
</template>

<script setup>
import emitter from '../utils/emitter.ts'
import {ref, onUnmounted} from 'vue'

const toy = ref('');
emitter.on('send-data', (value)=>{
    toy.value = value;
})
onUnmounted(()=>{
    emitter.off('send-data');
})
</script>

<style>
.b {
    background: #1ca587;
}
</style>