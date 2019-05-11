/**
 * 配置编译环境和线上环境之间的切换
 *
 * publics: 静态目录
 *
 */

let publics
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  publics = '/static'
} else {
  publics = '/public/h5_static'
}

export {
  publics
}
