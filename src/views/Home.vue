<template>
    <div class="banner">
        <!-- 轮播图 -->
        <div class="banner-img" @mouseover="handleStop" @mouseleave="handleGo">
            <img v-for="(list) in slideList" :src="list.url" :key="list.id" :alt="list.alt" v-show="list.id===currentIndex"/>
            <!-- 控制圆点 -->
            <div class="banner-circle">
                <ul>
                    <li v-for="(list) in slideList" :key="list.id" @click="changePic(list.id)" :class="list.id===currentIndex ? 'active' : '' "></li>
                </ul>
            </div>
            <!-- 左侧按钮 -->
            <LeftOutlined ref="isOpacityOne" class="iconDiv icon-left" @click="clickIcon('left')"/>
            <!-- <div class="iconDiv icon-left" @click="clickIcon('left')"></div> -->
            <!-- 右侧按钮 -->
            <RightOutlined ref="isOpacityTwo" class="iconDiv icon-right" @click="clickIcon('right')"/>
            <!-- <div class="iconDiv icon-right" @click="clickIcon('right')"></div> -->
        </div>
    </div>
    <div class="left">
        <ul v-for="item in data" :key="item.id">
            <li>{{item.id}}-{{item.title}}</li>
        </ul>
    </div>
</template>

  
<script setup>
import axios from 'axios'
import {ref, onMounted, onUnmounted} from 'vue'
// import {useSlideStore} from '@/store/slide'
// import { storeToRefs } from 'pinia'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
      
// 数据
let data = ref([])
let currentIndex = ref(1)
let timer = ref(null)
const isOpacityOne = ref()
const isOpacityTwo = ref()
// const slideStore = useSlideStore()
// const slideList = storeToRefs(slideStore)
// const slideList = slideStore.slideList

// const slideList = async() => {
//     try {
//         const data = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
//         console.log(data)
//     } catch(err) {
//         alert(err)
//     }
// };

const slideList = ref([
    {id: 1, url: 'https://inews.gtimg.com/news_bt/O7ZsQ9IrSfcWAWLPeaRcfeEt5FdyeTfnFYrSGmDSKlU0sAA/1000', alt: 'picture1'},
    {id: 2, url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage109.360doc.com%2FDownloadImg%2F2023%2F11%2F1102%2F275164660_5_20231111021737523&refer=http%3A%2F%2Fimage109.360doc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1735624881&t=e09564bf217f2c4dd76e2eb898135768', alt: 'picture2'},
    {id: 3, url: 'https://pic.quanjing.com/kk/l0/QJ8669121073.jpg?x-oss-process=style/794ws', alt: 'picture3'},
])

// 方法
const fetchData = async() => {
    try {
        const res = await axios.get('http://jsonplaceholder.typicode.com/posts')
        console.log(res)
        data.value = res.data
        console.log(data)
    } catch(error) {
        // alert('error!')
        console.log('error!')
    }
};

function startInterval() {
    // 定时器
    clearInterval(timer.value);
    timer.value = setInterval(() => {
        currentIndex.value++;
        if(currentIndex.value > slideList.value.length) {
            currentIndex.value = 1
        }
    }, 3000)
}

function handleStop() {
    // 轮播图停止
    console.log('进入轮播图');
    clearInterval(timer.value)
    // 修改css样式opacity: 1
    isOpacityOne.value.style.opacity = '1'
    isOpacityTwo.value.style.opacity = '1'
}

function handleGo() {
    // 轮播图开始
    console.log('移出轮播图');
    startInterval()
    isOpacityOne.value.style.opacity = '0'
    isOpacityTwo.value.style.opacity = '0'
}

function changePic(id) {
    // 点击圆点
    currentIndex.value = id
}

function clickIcon(val) {
    if(val == 'left') {
        currentIndex.value--;
        currentIndex.value = currentIndex.value < 1 ? slideList.value.length : currentIndex.value;
        console.log(currentIndex.value);
    } else {
        currentIndex.value++;
        currentIndex.value = currentIndex.value > slideList.value.length ? 1 : currentIndex.value
        console.log(currentIndex.value);
    }
}

onMounted(() => {
    fetchData();
    startInterval();
});

onUnmounted(() => {
    clearInterval(timer)
})

</script>
  
  
  <style>
  /* 箭头图标 */
.iconDiv{
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	font-size: 60px;
	cursor: pointer;
    opacity: 0;
    transition: opacity 0.5s ease-in-out
}
.iconDiv:hover{
	background-color: rgb(153, 149, 149);
}
.icon-left{
	left: 10px;
}
.icon-right{
	right: 10px;
}

.banner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 500px;
  }
.banner-img {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
}
.banner-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
/* 控制圆点 */
.banner-circle{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 20px;
}
.banner-circle ul{
	margin: 0 10px;
	height: 100%;
	text-align: center;
}
.banner-circle ul li{
    /* 一行内依次排列，不会独占一行 */
	display: inline-block;
	width: 14px;
	height: 14px;
    /* margin的0是元素的上外边距和下外边距，5px是元素的左外边距和右外边距 */
	margin: 0 5px;
	border-radius: 10px;
	background-color: rgba(207, 14, 14, 0.8);
	cursor: pointer;
}
.active{
    /* 
    !important是 CSS 中的一个特殊声明。在 CSS 中，样式规则是按照一定的优先级进行应用的。 
    当一个属性值后面添加了!important声明后，它会具有最高的优先级，会覆盖其他相同属性的设置
    过度使用!important可能会导致 CSS 样式难以维护和调试
    */
	background-color: rgb(112, 44, 221) !important; 
}
  </style>
  