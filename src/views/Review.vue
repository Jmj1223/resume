<template>
  {{ props.comments }}
</template>

<script setup>
// import ref from 'vue'
import defineProps from 'vue'
const props = defineProps({
    comments: {
        type: String,
        default: ''
    }
})
</script>

<style>

</style>