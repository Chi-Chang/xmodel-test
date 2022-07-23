import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper'
// import 'three/examples/js/helpers/ViewHelper'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import Stats from 'three/examples/jsm/libs/stats.module'


let threeInit = {
    scene:null,
    camera:null,
    orbitControls:null,
    transformControls:null,
    renderer:null,
    viewHelper:null,
}
let lastSelectedObject, lastSelectedObjectColor;
const raycaster = new THREE.Raycaster();
const mousePosition = new THREE.Vector2();

export default {
    data(){
        return{
            stats:null,
            rafId:null,
            intersects:[],
        }
    },
    mounted(){
        // document.addEventListener( 'mousedown', this.onDocumentMouseDown, false);
        window.addEventListener('keydown', event=>{
            event.stopImmediatePropagation();
            let key = event.key; // Detecting keyCode
            // Detecting Ctrl
            var ctrl = event.ctrlKey ? event.ctrlKey : ((key === 17)? true : false);
            // switch(event){
                if(key=="s"&&ctrl){
                    console.log("yes")
                    this.saveModel();
                }

                if(!threeInit.transformControls) return;
                switch (event.key) {
                    case 'g':
                        threeInit.transformControls.setMode('translate')
                        break
                    case 'r':
                        threeInit.transformControls.setMode('rotate')
                        break
                    case 's':
                        threeInit.transformControls.setMode('scale')
                        break
                    case 'd':
                        console.log("delete")
                        threeInit.scene.remove(lastSelectedObject.object.name);
                        this.animate();
                        break;
                }
            // }
        })
    },
    methods: {
        
        initScene(gltfFile) {
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
            const axesHelper = new THREE.AxesHelper(2000)
            threeInit.scene.add(axesHelper)

            //New camera and setting
            threeInit.camera = new THREE.PerspectiveCamera(
                50,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            )
            threeInit.camera.position.x = -150
            threeInit.camera.position.y = 150
            threeInit.camera.position.z = -150
            threeInit.camera.lookAt(new THREE.Vector3(0, 0, 0))

            //Select canvas
            const canvas = document.querySelector('#three')

            //New renderer
            threeInit.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
            threeInit.renderer.setSize( window.innerWidth, window.innerHeight );
            threeInit.renderer.shadowMap.enabled = true;

            // ViewHelper
            let container = document.querySelector("#view-helper");
            threeInit.viewHelper = new ViewHelper(threeInit.camera, container);

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
            threeInit.orbitControls = new OrbitControls(threeInit.camera, threeInit.renderer.domElement);
            threeInit.orbitControls.enableDamping = false;

            //New transformControls and setting
            threeInit.transformControls = new TransformControls(threeInit.camera, threeInit.renderer.domElement)
            
            threeInit.transformControls.addEventListener('mouseDown', function (e) {
                threeInit.orbitControls.enabled = false;
                threeInit.renderer.domElement.removeEventListener('mousedown', THIS.onDocumentMouseClick, false);
            })
            threeInit.transformControls.addEventListener('mouseUp', function (e) {
                threeInit.orbitControls.enabled = true;
                threeInit.renderer.domElement.addEventListener('mousedown', THIS.onDocumentMouseClick, false );
            })
            

            //New gltfLoader
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(gltfFile ? (gltfFile) : `http://203.64.97.140:3000/Upload/test.gltf`, (gltf) => {
                // gltfLoader.load(gltfFile ? (gltfFile) : `test/glb_test.glb`, (gltf) => {
                    // gltfLoader.load(gltfFile ? (gltfFile) : `test/gltf_test.gltf`, (gltf) => {
              let model = gltf.scene;
              console.log("model: " , model)
            //   model.children.forEach(e=>{
            //     const box = new THREE.Box3().setFromObject(e);
            //     const center = box.getCenter(new THREE.Vector3(0,0,0));
            //     console.log("center:", center);
            //     e.position.x = center.x;
            //     e.position.y = center.y;
            //     e.position.z = center.z;
            //   })
              threeInit.scene.add(model);
              
            })



            // const geometry = new THREE.BoxGeometry( 100, 100, 100 );
            // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
            // const mesh = new THREE.Mesh( geometry, material );
            // mesh.position.set(0, 0, 0)
            // console.log(mesh)
            // threeInit.scene.add( mesh );



            this.animate();
            threeInit.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseClick, false );
        },
        animate() {
            threeInit.orbitControls.update();
            threeInit.rafId = requestAnimationFrame(this.animate);
            this.stats.update();
            this.render();
        },
        render(){
            threeInit.renderer.autoClear = false;
            threeInit.renderer.clear();
            threeInit.renderer.render(threeInit.scene, threeInit.camera);
            threeInit.viewHelper.render(threeInit.renderer);
        },
        onDocumentMouseClick(e) {
            


            let mouse = new THREE.Vector2();
            mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
            raycaster.setFromCamera( mouse, threeInit.camera );
            const targetObject = threeInit.scene.children.filter(e=>e.type=='Group');



            const intersects = raycaster.intersectObjects( targetObject );



            if(intersects.length>0){
                if(lastSelectedObject){
                    lastSelectedObject.object.material.color.set(lastSelectedObjectColor);
                    // lastSelectedObject.object.material.wireframe = false;
                }
                if(intersects.length>0){
                    
                    console.log(intersects[0])
                    const box = new THREE.Box3().setFromObject(intersects[0].object);
                    const center = box.getCenter(new THREE.Vector3());
                    console.log("object center:", center);
                    console.log("object position: " , intersects[0].object.position)
                    // intersects[0].object.position.x = center.x/2;
                    // intersects[0].object.position.y = center.y/2;
                    // intersects[0].object.position.z = center.z/2;

                    lastSelectedObject = intersects[0];
                    lastSelectedObjectColor = lastSelectedObject.object.material.color.getHex();
                    intersects[0].object.material.color.set(0x00ff00);

                    threeInit.transformControls.detach();
                    threeInit.transformControls.attach(intersects[0].object)
                    threeInit.scene.add(threeInit.transformControls)
                    console.log(threeInit.transformControls)
                    // intersects[0].object.material.wireframe = true;
                }
            }else{
                lastSelectedObject.object.material.color.set(lastSelectedObjectColor);
                threeInit.scene.remove(threeInit.transformControls)
                return;
            }
            if(!targetObject){
                threeInit.transformControls.enabled = false;
            }
        },
        saveModel(){
            const gltfExporter = new GLTFExporter();
            const params={
                binary: true,
            };
            const options={
                binary: params.binary,
            };
            gltfExporter.parse(
                threeInit.scene,
                function ( result ) {
                    console.log(result)
                    if ( result instanceof ArrayBuffer ) {

                        saveArrayBuffer( result, 'scene.glb' );

                    } else {

                        const output = JSON.stringify( result, null, 2 );
                        console.log( output );
                        saveString( output, 'scene.gltf' );

                    }

                },
                function ( error ) {

                    console.log( 'An error happened during parsing', error );

                },
                options
            );

            const link = document.createElement( 'a' );
			link.style.display = 'none';
			document.body.appendChild( link ); // Firefox workaround, see #6594

			function save( blob, filename ) {
                console.log(blob)
				link.href = URL.createObjectURL( blob );
				link.download = filename;
				link.click();

				// URL.revokeObjectURL( url ); breaks Firefox...

			}
            function saveString( text, filename ) {

				save( new Blob( [ text ], { type: 'text/plain' } ), filename );

			}
            function saveArrayBuffer( buffer, filename ) {

				save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

			}
        },
    },

}