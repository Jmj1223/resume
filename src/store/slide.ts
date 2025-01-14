import {defineStore} from 'pinia'

export const useSlideStore = defineStore('slide', {
    // actions: {
    //     increment(value) {
    //         console.log(value)
    //     },
    // },
    state() {
        return {
            slideList: [
                {id: 1, url: 'https://inews.gtimg.com/news_bt/O7ZsQ9IrSfcWAWLPeaRcfeEt5FdyeTfnFYrSGmDSKlU0sAA/1000', alt: 'picture1'},
                {id: 2, url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage109.360doc.com%2FDownloadImg%2F2023%2F11%2F1102%2F275164660_5_20231111021737523&refer=http%3A%2F%2Fimage109.360doc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1735624881&t=e09564bf217f2c4dd76e2eb898135768', alt: 'picture2'},
                {id: 3, url: 'https://pic.quanjing.com/kk/l0/QJ8669121073.jpg?x-oss-process=style/794ws', alt: 'picture3'},
            ]
        }
    },
    // getters: {
    //     bigSum: state => state.sum*10,
    //     upperSchool(state) {
    //         return this.school.toUpperCase()
    //     }
    // }
})

