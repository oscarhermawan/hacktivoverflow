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
                <textarea class="textarea" v-model="addAnswer" placeholder="Add a comment..."></textarea>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button" @click="postAnswer(list)">Post comment</button>
              </p>
            </div>
          </div>
        </article>
        <!-- AKHIR TAMBAH KOMENTAR -->

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
        addAnswer:''
      }
    },
    methods:{
      postAnswer(list){
        let addAnswer = {
          question_id:list._id,
          description:this.addAnswer
        }
        this.$store.dispatch('ADD_ANSWER', { addAnswer })
          .then(response=>{

          })
          .catch(error=>{
            console.log(error);
          })
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
