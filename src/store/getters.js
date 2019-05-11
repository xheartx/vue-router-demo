const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  userInfo: state => state.user.userInfo,
  sidebar: state => state.app.sidebar,
  permission_routers: state => state.permission.routers,
  errorLogs: state => state.errorLog.logs
}

export default getters

