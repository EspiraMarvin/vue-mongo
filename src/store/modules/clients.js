import axios from "axios";

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
      axios.get('http://localhost:4000/api/client')
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
  ADD_CLIENT(context) {

  },
  EDIT_CLIENT(context) {

  },
  DELETE_CLIENT(context) {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
