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
    },
    DELETE_QUESTION({ commit }, { deleteQuestion }) {
      axios.delete(`http://localhost:3000/questions/${deleteQuestion.id}`, { headers:
        {
          token: localStorage.getItem('token'),
          asked_by: deleteQuestion.asked_by
        }
      })
      .then((response) =>{
        if(response.data == 'Gagal'){
          alert('Anda Tidak Punya Akses')
        }
        else{
          commit('DELETE_QUESTION', { result : response.data })
        }
      }, (err) => {
        console.log(err)
      })
    },
    DELETE_ANSWER({ commit }, { deleteAnswer }) {
      axios.delete(`http://localhost:3000/answers/${deleteAnswer.id}`, { headers:
        {
          token: localStorage.getItem('token'),
          asked_by:'null',
          answer_by: deleteAnswer.answer_by
        }
      })
      .then((response) =>{
        if(response.data == 'Gagal'){
          alert('Anda Tidak Punya Akses')
        }
        else{
          commit('DELETE_ANSWER', { result : response.data })
        }
      }, (err) => {
        console.log(err)
      })
    },
    VOTE_QUESTION({ commit }, { voteQuestion }) {
      console.log('voteQuestion', voteQuestion);
      axios.post('http://localhost:3000/questions/vote', voteQuestion, { headers: { token: localStorage.getItem('token')}})
      .then((response) =>{
        // commit('ADD_ANSWER', { result : response.data })
      }, (err) => {
        console.log(err)
      })
    },
  },
  mutations: {
    SET_QUESTIONS_LIST: (state, { list }) => {
      state.questions_list = list
      console.log('masuk mutationino', state.questions_list);
    },
    SET_ANSWERS_LIST: (state, { list }) => {
      state.answers_list = list
    },
    ADD_QUESTION (state, { result }) {
      console.log('result mutation', result);
      state.questions_list.push(result)
    },
    ADD_ANSWER (state, { result }) {
      state.answers_list.push(result)
    },
    DELETE_QUESTION (state, { result }) {
      let idx = state.questions_list.map(p => p._id).indexOf(result._id)
      state.questions_list.splice(idx, 1)
    },
    DELETE_ANSWER (state, { result }) {
      let idx = state.answers_list.map(p => p._id).indexOf(result._id)
      state.answers_list.splice(idx, 1)
    },
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
