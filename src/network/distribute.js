import { request } from './request'

//用户
export function userLogin(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function userRegister(data) {
    return request({
        url: '/register',
        method: 'post',
        data
    })
}

//后台用户管理
export function userlist() {
    return request({
        url: '/userlist',
        method: 'get',

    })
}

export function userByPhone(phone) {
    return request({
        url: `/userByPhone/${phone}`,
        method: 'get',
    })
}

export function updateUser(data) {
    return request({
        url: '/update',
        method: 'put',
        data
    })
}

export function delUser(phone) {
    return request({
        url: '/deleteUser/' + phone,
        method: 'delete',

    })
}


//志愿收藏
export function addColl(data) {
    return request({
        url: '/addColl',
        method: 'post',
        data
    })
}

export function collList(id) {
    return request({
        url: '/collList/' + id,
        method: 'get',
    })
}

export function delColl(data) {
    return request({
        url: '/delColl',
        method: 'delete',
        data
    })
}




//志愿详细信息查询
export function infoDetails(id) {
    return request({
        url: '/details/' + id,
        method: 'get',
    })
}

// 点击校徽查询
export function infoSchool(id) {
    return request({
        url: '/schoolInfo/' + id,
        method: 'get',
    })
}

// 填报指南院校查询
export function school211() {
    return request({
        url: '/school211',
        method: 'get',
    })
}
export function school985() {
    return request({
        url: '/school985',
        method: 'get',
    })
}

export function schoolByName(xxmc) {
    return request({
        url: '/schoolByName/' + xxmc,
        method: 'get',
    })
}

export function infoAdvice(id) {
    return request({
        url: '/adviceInfo/' + id,
        method: 'get',
    })
}

// 志愿推荐
export function searchGroup(data) {
    return request({
        url: '/group',
        method: 'post',
        data
    })
}

//Echarts

export function getRankData(yxmc) {
    return request({
        url: '/selectEchartsHank/' + yxmc,
        method: 'get',
    })
}

//富文本编辑器
export function getTitle() {
    return request({
        url: '/findTitle',
        method: 'get',
    })
}

export function getAllText(id) {
    return request({
        url: `/selectAdvice/${id}`,
        method: 'get',
    })
}

export function addText(data) {
    return request({
        url: `/insertText`,
        method: 'post',
        data
    })
}

export function updateText(data) {
    return request({
        url: `/updateText`,
        method: 'put',
        data
    })
}


export function deleteText(id) {
    return request({
        url: `/deleteText/${id}`,
        method: 'delete',
    })
}

