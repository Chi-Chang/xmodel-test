import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
    data(){
        return{
            scene:null,
            camera:null,
            controls:null,
            renderer:null,
        }
    },
    mounted(){
        // document.addEventListener( 'mousedown', this.onDocumentMouseDown );
    },
    methods: {
        initScene(gltfFile) {
            //New scene and setting
            const scene = new THREE.Scene();
            scene.background = new THREE.Color('#eee');

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
            gltfLoader.load(gltfFile ? (gltfFile) : `http://203.64.97.140:3000/download/test.gltf`, (gltf) => {
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
            }
            animate();
        },
        animate() {
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate);
            // if (resizeRendererToDisplaySize(renderer)) {
            //   const canvas = renderer.domElement
            //   camera.aspect = canvas.clientWidth / canvas.clientHeight
            //   camera.updateProjectionMatrix()
            // }
        },
        onDocumentMouseDown( event ) {    
            event.preventDefault();
            var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
                                    -( event.clientY / window.innerHeight ) * 2 + 1,  
                                    0.5 );     
            var raycaster =  new THREE.Raycaster();                                        
            raycaster.setFromCamera( mouse3D, this.camera );
            var intersects = raycaster.intersectObjects( objects );
                console.log(intersects)
            if ( intersects.length > 0 ) {
                intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
            }
            this.animate();
        }
    
    }
}