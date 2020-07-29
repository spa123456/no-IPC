// let queryUrl = 'http://121.40.121.90:5010'
let queryUrl = 'http://172.18.0.197:5010'        
import $ from 'jquery'

const ajaxPost = function (api, params) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'post',
            data: params,
            url: queryUrl + api,
            success: res => {
                resolve(res)
            },
            catch: err => {
                reject(err)
            }
        })
    })
}

const ajaxAll = function (api, options) {
    return new Promise((resolve, reject) => {
        $.ajax({
            ...options,
            url: queryUrl + api,
            success: res => {
                resolve(res)
            },
            catch: err => {
                reject(err)
            }
        })
    })
}

export default {
    ajaxPost,
    ajaxAll
}