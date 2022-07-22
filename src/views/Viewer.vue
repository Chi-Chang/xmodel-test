<template>
  <div id="viewer" class="viewer">
    <!-- <v-btn 
      class="ma-2" 
      color="primary" 
      rounded 
      depressed
      @click="uploadModel"
    >
    Upload Model
    </v-btn>
    <v-btn 
      class="ma-2" 
      color="primary" 
      rounded
      depressed
      @click="downloadModel"
    >
    Download Model
    </v-btn>
    <v-btn 
      class="ma-2" 
      color="red" 
      rounded
      depressed
      dark
      @click="clearScene"
    >
    Cancel
    </v-btn> -->
    <div id="Stats-output"></div>
    <input
      ref="uploader"
      class="d-none"
      type="file"
      multiple
      @change="onFileChanged"
    >
    <div id="view-helper"></div>
    <canvas id="three"></canvas>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Viewer',
  components: {},
  data(){
    return{
      selectedFile: [],
      isSelecting: false,
      scene:null,
    }
  },
  mounted(){
    this.initScene();

  },
  methods:{
    uploadModel() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files;
      console.log(this.selectedFile)

      let fileType;
      for(let i=0; i<this.selectedFile.length; i++){
         fileType = this.selectedFile[i].name.split(".").pop();
          switch(fileType){
            case "gltf":
              console.log(this.selectedFile[i].name+" is gltf");
              break;
            case "bin":
              console.log(this.selectedFile[i].name+" is bin");
              break;
          }
      }

      this.$api.Model.UploadModel(this.selectedFile)
      .then(res=>{
        console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })

      // this.$api.Model.GetModel(id)
      // .then(res=>{
      //   let newFile = res.blob();
      //   console.log(newFile);
      // })
    },
    downloadModel(){
      this.systemTest();
      // this.scene.children = this.$store.state.scene.children;
      // this.$api.Model.GetModel(11)
      // .then(res=>{
      //   console.log(res);
      //   this.initScene(res.data);
      // })
    },
    clearScene(){
      // this.scene.children=[];
      this.destroy();
    },
  },
}
</script>