
import { Message } from 'element-ui';
//院校类型
export const arrList = [
    "综合类",
    "财经类",
    "理工类",
    "农林类",
    "师范类",
    "医药类",
    "语言类",
    "艺术类",
    "体育类",
    "政法类",
    "民族类"
];

export function message(data, state = "error") {
    Message({
        showClose: true,
        duration: 1000,
        message: data,
        type: state,
    });
};

export function strChange(arg) {

    let str = arg.split("");
    for (let i = 0; i < str.length; i++) {
        if (str[i].charCodeAt() >= 65 && str[i].charCodeAt() <= 90) {
            str[i] = str[i].toLowerCase();
        }
    }
    return str.join("");

};


export function checkNum(value) {
    let reg = /^-?\d+$/;
    return !reg.test(value) ? true : false
}


export function checkPass(value) {
    let reg = /^[a-zA-Z]\w{5,17}$/;
    return reg.test(value)
}


