
import 'babel-polyfill'
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import '../common/common'
import './c.css'
// 我是a的注释啊啊啊啊啊啊啊啊啊啊啊啊啊啊
const a = () => {
    console.log('A AM A=========PAGE')
}

a()

const b = new Promise((resolve, reject) => {
        let num = 0.6 * 2
        setTimeout(() => {
            if (num > 1) {
                resolve('200ok')
            } else {
                reject(new Error('400err'))
            }
        }, 2000)
    })
b.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
