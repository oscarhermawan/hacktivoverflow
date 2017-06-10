<template>
  <div>
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
            <strong>{{list.asked_by.name}}, {{list.title}}</strong>
            <br>
            {{list.description}}
            <br>
            <small><a>Vote</a> · <a>Delete</a> · 3 hrs</small>
          </p>
        </div>
        <!-- AKHIR PERTANYAAN -->

        <!-- LIST KOMENTAR -->
        <div v-for="listAnswer in answers_list">
          <div v-if="listAnswer.question_id._id == list._id">
            <article class="media">
              <figure class="media-left">
                <p class="image is-48x48">
                  <img :src="listAnswer.answer_by.photo">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{listAnswer.answer_by.name}}</strong>
                    <br>
                    {{listAnswer.description}}
                    <br>
                    <small><a>Vote</a> · <a>Delete</a> · 2 hrs</small>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <!-- AKHIR LIST KOMENTAR -->
        
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
        params:'',
        listsQuestion:''
      }
    },
    methods:{
      postComment(){

      }
    },
    created(){

    },
    computed: mapState([
      'questions_list', 'answers_list'
    ])
  }
</script>

<style scoped>
<style>
