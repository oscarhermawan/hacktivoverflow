import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    questions_list:[],
    answers_list:[]
  },
  actions: {
    LOAD_QUESTIONS_LIST({ commit }) {
      axios.get('http://localhost:3000/questions')
      .then((response) => {
          commit('SET_QUESTIONS_LIST', { list: response.data })
        },(err) => {
          console.log(err)
      })
    },
    LOAD_ANSWERS_LIST({ commit }) {
      axios.get('http://localhost:3000/answers')
      .then((response) => {
          commit('SET_ANSWERS_LIST', { list: response.data })
        },(err) => {
          console.log(err)
      })
    }
  },
  mutations: {
    SET_QUESTIONS_LIST: (state, { list }) => {
      state.questions_list = list
    },
    SET_ANSWERS_LIST: (state, { list }) => {
      state.answers_list = list
    }
  },
  getters: {
    openQuestions: state => {
      return state.questions_list.filter(questions_list => !questions_list.completed)
    },
    openAnswers: state => {
      return state.answers_list.filter(answers_list => !answers_list.completed)
    }
  }
})
export default store
