import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//     50,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );
// const canvas = document.querySelector('#three');
// console.log(canvas)
// const renderer = new THREE.WebGLRenderer()
// const controls = new OrbitControls(camera, renderer.domElement);
let threeInit = {
    scene:null,
    camera:null,
    controls:null,
    renderer:null,
}
const raycaster = new THREE.Raycaster();
const mousePosition = new THREE.Vector2();

export default {
    data(){
        return{
            stats:null,
            rafId:null,
            intersects:[],
            lastSelectedObject:null,
        }
    },
    mounted(){
        document.addEventListener( 'mousedown', this.onDocumentMouseDown, false);
        // this.highlightedMaterial = new THREE.MeshBasicMaterial({
        //     wireframe: true,
        //     color: 0x00ff00
        // });
        // this.intersectedObject = null;
        // this.pickableObjects = [];
        // this.originalMaterials = {};
    },
    methods: {
        onDocumentMouseDown(e) {
            let mouse = {x:0, y:0};
            mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

            //2. set the picking ray from the camera position and mouse coordinates
            raycaster.setFromCamera( mouse, threeInit.camera );    

            //3. compute intersections
            var intersects = raycaster.intersectObjects( threeInit.scene.children );
            if(intersects.length>0){
                console.log(intersects[0]);
                this.lastSelectedObject = intersects[0];
                intersects[0].object.material.color.set(0x00ff00);
                // if(this.lastSelectedObject){
                //     this.lastSelectedObject.object.material.color.set(0xff0000);
                // }
            }else{
                return;
            }
        },
        
        // init() {
        //     const {
        //         runTime, canvasHeight, canvasWidth, scene, renderer, camera, box  // 定義各種共用的數據
        //     } = this;
        //     runTime();
        // },
        // runTime(){
        //     this.canvasHeight = document.getElementById("three").offsetHeight;  // 將 canvas 高度設定成 #three 的高度
        //     this.canvasWidth = document.getElementById("three").offsetWidth;   // 將 canvas 高度設定成 #three 的高度
            
        //     this._initScene();
        //     window.addEventListener('resize', this.windowResize.bind(this), false); // 監視視窗大小變化
        // },
        initScene(gltfFile) {
            //New scene and setting
            const scene = new THREE.Scene();
            scene.background = new THREE.Color('#eee');


            // state 載入幀速率顯示器
            let stats = new Stats();
            stats.setMode(0);
            const state = document.getElementById('Stats-output');
            state.appendChild(stats.domElement);

            //New camera and setting
            const camera = new THREE.PerspectiveCamera(
                50,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            )
            camera.position.x = -150
            camera.position.y = 100
            camera.position.z = -150
            camera.lookAt(new THREE.Vector3(0, 0, 0))

            //Select canvas
            const canvas = document.querySelector('#three')

            //New renderer
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.shadowMap.enabled = true;

            //New gltfLoader
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(gltfFile ? (gltfFile) : `http://203.64.97.140:3000/Upload/test.gltf`, (gltf) => {
            // gltfLoader.load(`${THIS.publicPath}demodel/scene.gltf`, (gltf) => {
            // gltfLoader.load(`demodel/scene.gltf`, (gltf) => {
              let model = gltf.scene;
              scene.add(model);
            })
      
            //New hemLight and setting
            var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
            light.position.set( 1, 1, -2 );
            scene.add( light );



            var planeW = 500; // pixels
            var planeH = 500; // pixels 
            var numW = 50; // how many wide (50*50 = 2500 pixels wide)
            var numH = 50; // how many tall (50*50 = 2500 pixels tall)
            let floorGeometry = new THREE.PlaneGeometry(planeW*numW, planeH*numH, planeW, planeH)
            // let floorMaterial = new THREE.MeshPhongMaterial({
            //   color: 0x857ebb,
            //   shininess: 0,
            // })
            let floorMaterial = new THREE.MeshBasicMaterial( {
                color: 0xffffff,
                wireframe: true
            } )
        
      
            let floor = new THREE.Mesh(floorGeometry, floorMaterial)
            
            floor.rotation.x = -0.5 * Math.PI
            floor.receiveShadow = true
            floor.position.y = -0.001
            scene.add(floor)
      
            //New controls and setting
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = false;

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
              function animate() {
                controls.update();
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
                // if (resizeRendererToDisplaySize(renderer)) {
                //   const canvas = renderer.domElement
                //   camera.aspect = canvas.clientWidth / canvas.clientHeight
                //   camera.updateProjectionMatrix()
                // }
                stats.update()
            }
            animate();
            
        },
        _initScene(gltfFile) {
            const THIS = this;

            // state 載入幀速率顯示器
            this.stats = new Stats();
            console.log(this.stats)
            this.stats.setMode(0);
            const state = document.getElementById('Stats-output');
            state.appendChild(this.stats.domElement);

            //New scene and setting
            threeInit.scene = new THREE.Scene();
            threeInit.scene.background = new THREE.Color('#eee');

            // 載入輔助座標系 實際應用的時候需要註釋此程式碼
            const axesHelper = new THREE.AxesHelper()
            threeInit.scene.add(axesHelper)

            //New camera and setting
            threeInit.camera = new THREE.PerspectiveCamera(
                50,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            )
            threeInit.camera.position.x = -150
            threeInit.camera.position.y = 100
            threeInit.camera.position.z = -150
            threeInit.camera.lookAt(new THREE.Vector3(0, 0, 0))

            //Select canvas
            const canvas = document.querySelector('#three')

            //New renderer
            threeInit.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
            threeInit.renderer.setSize( window.innerWidth, window.innerHeight );
            threeInit.renderer.shadowMap.enabled = true;

            //New gltfLoader
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(gltfFile ? (gltfFile) : `http://203.64.97.140:3000/Upload/test.gltf`, (gltf) => {
            // gltfLoader.load(`${THIS.publicPath}demodel/scene.gltf`, (gltf) => {
            // gltfLoader.load(`demodel/scene.gltf`, (gltf) => {
              let model = gltf.scene;
              threeInit.scene.add(model);
            })
      
            //New hemLight and setting
            var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
            light.position.set( 1, 1, -2 );
            threeInit.scene.add( light );



            var planeW = 500; // pixels
            var planeH = 500; // pixels 
            var numW = 50; // how many wide (50*50 = 2500 pixels wide)
            var numH = 50; // how many tall (50*50 = 2500 pixels tall)
            let floorGeometry = new THREE.PlaneGeometry(planeW*numW, planeH*numH, planeW, planeH)
            // let floorMaterial = new THREE.MeshPhongMaterial({
            //   color: 0x857ebb,
            //   shininess: 0,
            // })
            let floorMaterial = new THREE.MeshBasicMaterial( {
                color: 0xffffff,
                wireframe: true
            } )
        
      
            let floor = new THREE.Mesh(floorGeometry, floorMaterial)
            
            floor.rotation.x = -0.5 * Math.PI
            floor.receiveShadow = true
            floor.position.y = -0.001
            threeInit.scene.add(floor)
      
            //New controls and setting
            threeInit.controls = new OrbitControls(threeInit.camera, threeInit.renderer.domElement);
            threeInit.controls.enableDamping = false;

            function resizeRendererToDisplaySize(renderer) {
                const canvas = threeInit.renderer.domElement
                var width = window.innerWidth
                var height = window.innerHeight
                var canvasPixelWidth = canvas.width / window.devicePixelRatio
                var canvasPixelHeight = canvas.height / window.devicePixelRatio
        
                const needResize =
                  canvasPixelWidth !== width || canvasPixelHeight !== height
                if (needResize) {
                    threeInit.renderer.setSize(width, height, false)
                }
                return needResize
              }
              function animate() {
                threeInit.controls.update();
                threeInit.renderer.render(threeInit.scene, threeInit.camera);
                requestAnimationFrame(animate);
                // if (resizeRendererToDisplaySize(renderer)) {
                //   const canvas = renderer.domElement
                //   camera.aspect = canvas.clientWidth / canvas.clientHeight
                //   camera.updateProjectionMatrix()
                // }
            }
            this.animate();
            // threeInit.renderer.domElement.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
        },
        animate() {
            threeInit.controls.update();
            threeInit.renderer.render(threeInit.scene, threeInit.camera);
            threeInit.rafId = requestAnimationFrame(this.animate);
            // if (resizeRendererToDisplaySize(renderer)) {
            //   const canvas = renderer.domElement
            //   camera.aspect = canvas.clientWidth / canvas.clientHeight
            //   camera.updateProjectionMatrix()
            // }
            this.stats.update();
        },
    },

}