<template>
  <div>

    <!-- TAMBAH KOMENTAR -->
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="http://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <input class="input is-primary" v-model="addTitle" type="text" placeholder="Add a Title">
            <textarea class="textarea" v-model="addDescription" placeholder="Add a Description of Questions"></textarea>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button" @click="postQuestion">Post Question</button>
          </p>
        </div>
      </div>
    </article>
    <!-- AKHIR TAMBAH KOMENTAR -->

    <!-- PERTANYAAN -->
    <article class="media" v-for="list in questions_list">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="list.asked_by.photo">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{list.asked_by.name}}<br>
              <a @click="detailQuestion(list)">{{list.title}}</a></strong>
            <br>
            {{list.description}}
            <br>
            <small><a @click="voteQuestion(list)">Vote : {{list.votes.length}}</a> * <a @click="checkIdForEdit(list)"> Update </a> * <a @click="deleteQuestion(list)">Delete</a> </small>
          </p>
        </div>

      </div>
    </article>
    <!-- AKHIR PERTANYAAN -->

    <!-- LOGIN -->
   <div :class="modalEdit">
     <div class="modal-background"></div>
     <div class="modal-card">
       <header class="modal-card-head">
         <p class="modal-card-title">Masuk</p>
         <button class="delete"></button>
       </header>
       <section class="modal-card-body">
           <input class="input" type="text" v-model="editTitle" placeholder="Add a Title">
           <input class="input" type="text" v-model="editDescription" placeholder="Add a Description of Questions">
       </section>
       <footer class="modal-card-foot">
           <button class="button is-success" name="button" @click="updateQuestion"> Edit Question </button>
         <a class="button" @click="closeModal">Cancel</a>
       </footer>
     </div>
   </div>
   <!-- END LOGIN -->


   </div> <!-- DIV UTAMA DARI VUE -->
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios';

  export default {
    data(){
      return{
        listsQuestion:'',
        addTitle:'',
        addDescription:'',
        editTitle:'',
        editDescription:'',
        modalEdit:'modal',
        idQuestion:''
      }
    },
    methods:{
      detailQuestion(list){
        this.$router.push({
          name:'question-detail',
          params:{ id : list._id }
        })
      },
      postQuestion(){
        let addQuestion = {
          title:this.addTitle,
          description:this.addDescription
        }
        this.$store.dispatch('ADD_QUESTION', { addQuestion })
          .then(response=>{
            this.addTitle=''
            this.addDescription=''
          })
          .catch(error=>{
            console.log(error);
          })
      },
      deleteQuestion(list){
        let deleteQuestion = {
          id:list._id,
          asked_by:list.asked_by._id
        }
        this.$store.dispatch('DELETE_QUESTION', { deleteQuestion })
      },
      voteQuestion(list){
        let voteQuestion = {
          idquestion: list._id
        }
        this.$store.dispatch('VOTE_QUESTION', { voteQuestion })
      },
      checkIdForEdit(list){
        console.log('listnya',list);
        let self = this
        axios.get(`http://localhost:3000/questions/check/${list.asked_by._id}`, {headers : {token:localStorage.getItem('token')}})
        .then((response)=>{
          if(response.data == 'Berhasil'){
            self.editTitle=list.title
            self.editDescription=list.description
            self.idQuestion=list._id
            self.modalEdit = "modal is-active"
          } else {
            alert('Anda Tidak Punya Akses')
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      },
      updateQuestion(){
        let editQuestion = {
          idQuestion:this.idQuestion,
          title:this.editTitle,
          description:this.editDescription
        }
        this.$store.dispatch('EDIT_QUESTION', { editQuestion })
        .then((result)=>{
          this.idQuestion=''
          this.modalEdit='modal'
        })
      },
      closeModal(){
        this.idQuestion=''
        this.modalEdit='modal'
      }
    },
    computed: mapState([
      'questions_list',
      'answers_list'
    ])
  }
</script>

<style scoped>
<style>
