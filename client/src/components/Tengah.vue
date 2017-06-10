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

    <article class="media" v-for="list in questions_list">
      <!-- PERTANYAAN -->
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="list.asked_by.photo">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{list.asked_by.name}}, <a @click="detailQuestion(list)">{{list.title}}</a></strong>
            <br>
            {{list.description}}
            <br>
            <small><a>Vote</a> · <a @click="deleteQuestion(list)">Delete</a> · 3 hrs</small>
          </p>
        </div>
        <!-- AKHIR PERTANYAAN -->
      </div>

    </article>
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
        addDescription:''
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
