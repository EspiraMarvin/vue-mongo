import axios from "axios";

const clientAPI = 'http://localhost:4000/api/client'

const state = () => ({
  clients: [],
  fetchingClients: false
})

const getters = {
  GET_CLIENTS: state => state.clients,
  GET_FETCHING_CLIENTS: state => state.fetchingClients
}

const mutations = {
  SET_CLIENTS(state, data) {
    state.clients = data
  },
  SET_FETCHING_CLIENTS(state, data) {
    state.fetchingClients = data
  }
}

const actions = {
  FETCH_CLIENTS(context) {
    context.commit('SET_FETCHING_CLIENTS', true)
    return new Promise((resolve, reject) => {
      axios.get(`${clientAPI}`)
        .then(response => {
          context.commit('SET_FETCHING_CLIENTS', false)
          context.commit('SET_CLIENTS', response.data)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_FETCHING_CLIENTS', false)
          reject(error)
        })
    })
  },
  ADD_CLIENT(context, payload) {
    payload.providersObject = []
    payload.providers.forEach(provider => {
      payload.providersObject.push({
        id: provider
      })
    })
    return new Promise((resolve, reject) => {
      axios.post(`${clientAPI}`, {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        providers: payload.providersObject
      })
        .then(response => {
          context.dispatch('FETCH_CLIENTS')
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },
  EDIT_CLIENT(context, payload) {
    payload.providersObject = []
    payload.providers.forEach(provider => {
      payload.providersObject.push({
        id: provider
      })
    })
    return new Promise((resolve, reject) => {
      axios.put(`${clientAPI}/${payload.id}`, {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        providers: payload.providersObject
      })
        .then(response => {
          context.dispatch('FETCH_CLIENTS')
          resolve(response)
        })
        .catch(error => reject(error))
    })

  },
  DELETE_CLIENT(context, payload) {
    const clientId = payload.id
    return new Promise((resolve, reject) => {
      axios.delete(`${clientAPI}/${clientId}`)
        .then(response => {
          context.dispatch('FETCH_CLIENTS')
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
