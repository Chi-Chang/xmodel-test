<template>
  <div class="viewer">
    <v-btn color="primary">123</v-btn>
    <canvas id="three"></canvas>
  </div>
</template>

<script>
// @ is an alias to /src
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'Viewer',
  components: {},
  data(){
    return{
      publicPath: process.env.BASE_URL,
    }
  },
  mounted(){
    console.log(process.env)
    this.initThree()
  },
  methods:{
    initThree() {
      const THIS = this;
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#eee')
      // scene.fog = new THREE.Fog('#eee', 20, 100)

      const canvas = document.querySelector('#three')
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      renderer.shadowMap.enabled = true

      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 10

      const gltfLoader = new GLTFLoader()
      console.log(THIS.publicPath)
      // gltfLoader.load(`${THIS.publicPath}civil/CV_building.gltf`, (gltf) => {
      gltfLoader.load('CV_building.gltf', (gltf) => {
      // gltfLoader.load(`demodel/scene.gltf`, (gltf) => {
        let model = gltf.scene
        //遍历模型每部分
        // model.traverse((o) => {
        //   //将图片作为纹理加载
        //   let explosionTexture = new THREE.TextureLoader().load(
        //     '/demodel/textures/concrete_pebbles.001_baseColor.png'
        //   )
        //   //调整纹理图的方向
        //   explosionTexture.flipY = false
        //   //将纹理图生成基础网格材质(MeshBasicMaterial)
        //   const material = new THREE.MeshBasicMaterial({
        //     map: explosionTexture,
        //   })
        //   //给模型每部分上材质
        //   o.material = material
        //   if (o.isMesh) {
        //     o.castShadow = true
        //     o.receiveShadow = true
        //   }
        // })
        scene.add(model)
      })

      const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
      hemLight.position.set(0, 48, 0)
      scene.add(hemLight)

      // const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
      //光源等位置
      // dirLight.position.set(2, 2, 2)
      //可以产生阴影
      // dirLight.castShadow = true
      // dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
      // scene.add(dirLight)

      // let floorGeometry = new THREE.PlaneGeometry(8000, 8000)
      // let floorMaterial = new THREE.MeshPhongMaterial({
      //   color: '#ffffff',
      //   shininess: 0,
      // })

      // let floor = new THREE.Mesh(floorGeometry, floorMaterial)
      // floor.rotation.x = -0.5 * Math.PI
      // floor.receiveShadow = true
      // floor.position.y = -3
      // scene.add(floor)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = false

      function animate() {
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(animate)

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
      }
      animate()

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        var width = window.innerWidth
        var height = window.innerHeight
        var canvasPixelWidth = canvas.width / window.devicePixelRatio
        var canvasPixelHeight = canvas.height / window.devicePixelRatio

        const needResize =
          canvasPixelWidth !== width || canvasPixelHeight !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }
        return needResize
      }
    },
  },
}
</script>