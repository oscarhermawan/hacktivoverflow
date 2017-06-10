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
    },
    LOAD_QUESTIONS_DETAIL({ commit }, { idquestion }) {
      axios.get(`http://localhost:3000/questions/${idquestion}`)
      .then((response) => {
          commit('SET_QUESTIONS_LIST', { list: response.data })
        },(err) => {
          console.log(err)
      })
    },
    LOAD_ANSWERS_DETAIL({ commit }, { idquestion }) {
      axios.get(`http://localhost:3000/answers/question/${idquestion}`)
      .then((response) => {
        console.log('answer', response);
          commit('SET_ANSWERS_LIST', { list: response.data })
        },(err) => {
          console.log(err)
      })
    },
    ADD_QUESTION({ commit }, { addQuestion }) {
      axios.post('http://localhost:3000/questions', addQuestion, { headers: { token: localStorage.getItem('token')}})
      .then((response) =>{
        commit('ADD_QUESTION', { result : response.data })
      }, (err) => {
        console.log(err)
      })
    },
    ADD_ANSWER({ commit }, { addAnswer }) {
      axios.post('http://localhost:3000/answers', addAnswer, { headers: { token: localStorage.getItem('token')}})
      .then((response) =>{
        commit('ADD_ANSWER', { result : response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_QUESTIONS_LIST: (state, { list }) => {
      // console.log('masuk mutation', list);
      state.questions_list = list
      console.log('masuk mutationino', state.questions_list);
    },
    SET_ANSWERS_LIST: (state, { list }) => {
      state.answers_list = list
    },
    ADD_QUESTION (state, { result }) {
      state.questions_list.push(result)
    },
    ADD_ANSWER (state, { result }) {
      state.answers_list.push(result)
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
