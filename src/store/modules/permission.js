import { constantRouterMap } from '@/router'
import { createRouter } from '@/router/addrouter'
// import router from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = createRouter(roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    initRoutes({ commit }) {
      commit('SET_ROUTERS', [])
    },
    updateRoutes({ state, commit, dispatch }) {
      dispatch('GetUserInfo').then(res => {
        const roles = res.modulInfoAll
        commit('SET_ROLES', roles)
        dispatch('GenerateRoutes', { roles })
      })
    }
  }
}

export default permission
