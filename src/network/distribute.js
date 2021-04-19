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

export function userlist() {
    return request({
        url: '/userlist',
        method: 'get',

    })
}

export function delUser(phone) {
    return request({
        url: '/deleteUser/' + phone,
        method: 'delete',

    })
}


//收藏
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




//查询
export function infoDetails(id) {
    return request({
        url: '/details/' + id,
        method: 'get',
    })
}

//查询
export function infoSchool(id) {
    return request({
        url: '/schoolInfo/' + id,
        method: 'get',
    })
}

export function infoAdvice(id) {
    return request({
        url: '/adviceInfo/' + id,
        method: 'get',
    })
}

export function searchScore(data) {
    return request({
        url: '/score',
        method: 'post',
        data
    })
}

export function searchNum(data) {
    return request({
        url: '/num',
        method: 'post',
        data
    })
}

export function searchGroup(data) {
    return request({
        url: '/group',
        method: 'post',
        data
    })
}