<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">\
    <HelloWorld msg="Chi, Welcome to Your Vue.js App"/>
    <div>{{msg}}</div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    return{
      msg:"",
    }
  },
  mounted(){
    
    this.$api.Model.GetModel(1)
    // this.$api.Users.GetUser(1)
    .then(res=>{
      console.log(res);
      this.msg=res;
    })
    .catch(err=>{
      console.log(err)
      this.msg=err;
    })
  },
  methods:{

  }
}
</script>
