<template>
 <div>    <!-- DIV UTAMA -->
    <navbar @keluarDariAnak="logOut"></navbar>
    <div class="maincontent">
      <br>

      <div class="columns is-multiline is-mobile">
        <div class="column is-one-quarter">
          <sampingkiri></sampingkiri>
        </div>

        <div class="column">
          <tengah></tengah>
        </div>
      </div>
    </div>

  </div> <!-- AKHIR DIV UTAMA -->
</template>

<script>
  // import { mapGetters } from 'vuex'
  import axios from 'axios';
  import navbar from '@/components/Navbar'
  import sampingkiri from '@/components/Sampingkiri'
  import tengah from '@/components/Tengah'

  export default {
    data(){
      return{
        test:''
      }
    },
    components:{
      navbar, sampingkiri, tengah
    },
    methods:{
      logOut:function(){
        window.localStorage.removeItem('token')
        window.location.href = '/#/login'
      }
    },
    created:function(){
      let self = this
      if(localStorage.getItem('token') == null){
        window.location.href = '/#/login'
      } else {

      }
    },
    mounted: function(){
      this.$store.dispatch('LOAD_QUESTIONS_LIST')
      this.$store.dispatch('LOAD_ANSWERS_LIST')
    }
  }
</script>

<style scoped>
.maincontent{
  width:80%;
  margin:0 auto;
}
</style>
