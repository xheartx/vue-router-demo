/* 验证用户名 */
export function isvalidUsername(str) {
  if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(str))) {
    return false
  } else {
    return true
  }
}
