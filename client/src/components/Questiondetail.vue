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
          <tengahdetail></tengahdetail>
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
  import tengahdetail from '@/components/Tengahdetail'

  export default {
    data(){
      return{
        test:'',
        params:''
      }
    },
    components:{
      navbar, sampingkiri, tengahdetail
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
      }
      this.params = this.$router.currentRoute.params.id
    },
    mounted: function(){
      this.$store.dispatch('LOAD_QUESTIONS_DETAIL', { idquestion: this.params })
      this.$store.dispatch('LOAD_ANSWERS_DETAIL', { idquestion : this.params })
    }
  }
</script>

<style scoped>
.maincontent{
  width:80%;
  margin:0 auto;
}
</style>
