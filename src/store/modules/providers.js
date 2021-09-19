import axios from "axios";

const providerAPI = 'http://localhost:4000/api/provider'

const state = () => ({
  providers: [],
  fetchingProviders: false
})

const getters = {
  GET_PROVIDERS: state => state.providers,
  GET_FETCHING_PROVIDERS: state => state.fetchingProviders
}

const mutations = {
  SET_PROVIDERS(state, data) {
    state.providers = data
  },
  SET_FETCHING_PROVIDERS(state, data) {
    state.fetchingClients = data
  }
}

const actions = {
  FETCH_PROVIDERS(context) {
    context.commit('SET_FETCHING_PROVIDERS', true)
    return new Promise((resolve, reject) => {
      axios.get(`${providerAPI}`)
        .then(response => {
          context.commit('SET_FETCHING_PROVIDERS', false)
          context.commit('SET_PROVIDERS', response.data)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_FETCHING_PROVIDERS', false)
          reject(error)
        })
    })
  },
  ADD_PROVIDER(context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${providerAPI}`, {
        name: payload
      })
        .then(response => {
            context.dispatch('FETCH_PROVIDERS')
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },
  EDIT_PROVIDER(context, payload){
    return new Promise((resolve, reject) => {
      axios.put(`${providerAPI}/${payload.id}`, {
        name: payload.name
      })
        .then(response => {
          context.dispatch('FETCH_PROVIDERS')
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },
  DELETE_PROVIDER(context, payload){
    const providerId = payload._id
    return new Promise((resolve, reject) => {
      axios.delete(`${providerAPI}/${providerId}`)
        .then(response => {
          context.dispatch('FETCH_PROVIDERS')
          resolve(response)
        })
        .catch(error => reject(error))
    })

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
