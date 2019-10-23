/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

let camera, scene, renderer
let controls 
let groundMesh
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2()
let normalizedMouse = {x: 0, y: -180 };
let milkPink = {r: 247, g: 193, b: 190 }
let baseColor = "rgb(" + milkPink.r + "," + milkPink.g + "," + milkPink.b + ")";
let nearStars, farStars, farthestStars;
   
function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.set(0, 0, 50)
        

        renderer = new THREE.WebGLRenderer({antiAlias: true});
        renderer.setClearColor( "#3f4040", 1.0);
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio( window.devicePixelRatio );
        document.body.appendChild( renderer.domElement );
        
        // controls = new THREE.OrbitControls(camera, renderer.domElement);

        // Lights
        let topLight = new THREE.DirectionalLight(0xffffff, 1);
        topLight.position.set(0,1,1).normalize();
        scene.add(topLight);

        let bottomLight = new THREE.DirectionalLight(0xffffff, 0.4);
        bottomLight.position.set(1,-1,1).normalize();
        scene.add(bottomLight);

        let skyLightRight = new THREE.DirectionalLight(0x666666, 0.2);
        skyLightRight.position.set(-1,-1,0.2).normalize();
        scene.add(skyLightRight);

        let skyLightCenter = new THREE.DirectionalLight(0x666666, 0.2);
        skyLightCenter.position.set(-0,-1,0.2).normalize();
        scene.add(skyLightCenter);

        let skyLightLeft = new THREE.DirectionalLight(0x666666, 0.2);
        skyLightLeft.position.set(1,-1,0.2).normalize();
        scene.add(skyLightLeft);


        // Mesh creation
        let ground = new THREE.PlaneGeometry(400, 400, 70, 70);
        let pinkMaterial = new THREE.MeshPhongMaterial({ 
                                color: 0xffffff, 
                                flatShading: true, 
                                side: THREE.DoubleSide, 
                                vertexColors: THREE.VertexColors
                              });

        ground.vertices.forEach(function(vertice) {
          vertice.x += (Math.random() - 0.5) * 4;
          vertice.y += (Math.random() - 0.5) * 4;
          vertice.z += (Math.random() - 0.5) * 4;
          vertice.dx = Math.random() - 0.5;
          vertice.dy = Math.random() - 0.5;
          vertice.randomDelay = Math.random() * 5;
        });

        for ( var i = 0; i < ground.faces.length; i ++ ) {
           ground.faces[i].color.setStyle(baseColor);   
           ground.faces[i].baseColor =  milkPink;    
        }

        groundMesh = new THREE.Mesh( ground, pinkMaterial );
        scene.add( groundMesh );



        // Create stars 
        farthestStars = createStars(1200, 420, "#0952BD");  //blue
        farStars = createStars(1200, 370, "#A5BFF0");    //milkyBlue
        nearStars = createStars(1200, 290,"#118CD6");    //brightBlue

        scene.add(farthestStars);
        scene.add(farStars);
        scene.add(nearStars);


        // testing second camera position
        // camera.rotation.x = Math.PI / 2;
        // camera.position.y = 120;
        // camera.position.z = 20;
        // groundMesh.scale.x = 1.5;
}


function createStars(amount, yDistance, color = "0x000000") {
      let opacity = Math.random();
      let starGeometry = new THREE.Geometry();
      let starMaterial = new THREE.PointsMaterial({color: color, opacity: 1});

      for (let i = 0; i < amount; i++) {
        let vertex = new THREE.Vector3();
            vertex.z = (Math.random() - 0.5) * 1500;
            vertex.y = yDistance;
            vertex.x = (Math.random() - 0.5) * 1500;
            starGeometry.vertices.push(vertex);
        }	
    return new THREE.Points(starGeometry, starMaterial);
 }




let delta = 0;
function render() {
  requestAnimationFrame( render );
  groundFacesManipulation()
  raycasting()
    
  groundMesh.geometry.verticesNeedUpdate = true;
  groundMesh.geometry.elementsNeedUpdate = true;

  farthestStars.rotation.y -= 0.00001;
  farStars.rotation.y -= 0.00005;
  nearStars.rotation.y -= 0.00011;

  renderer.render(scene, camera);
}





window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});
 

window.addEventListener("mousemove", function(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;	
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;	
});

function raycasting(){

  // Determine where ray is being projected from camera view
  raycaster.setFromCamera(mouse, camera);

  // Send objects being intersected into a variable
  let intersects = raycaster.intersectObjects([groundMesh]);

  for ( var i = 0; i < intersects.length; i++ ) {
    intersects[i].object.material.color.set(0xfaf5f8);
  } 

  if (intersects.length > 0) {
      let faceBaseColor = intersects[0].face.baseColor;

      groundMesh.geometry.faces.forEach(function(face) {
          face.color.r *= 255;
          face.color.g *= 255;
          face.color.b *= 255;

          face.color.r += (faceBaseColor.r - face.color.r) * 0.01;
          face.color.g += (faceBaseColor.g - face.color.g) * 0.01;
          face.color.b += (faceBaseColor.b - face.color.b) * 0.01;

          let rInt = Math.floor(face.color.r);
          let gInt = Math.floor(face.color.g);
          let bInt = Math.floor(face.color.b);

          let newBasecol = "rgb(" + rInt + "," + gInt + "," + bInt + ")";
          face.color.setStyle(newBasecol);
       })

      intersects[0].face.color.setStyle("#faf5f8");
     }
}





function groundFacesManipulation(){
  delta += 0.01;
  let vertices = groundMesh.geometry.vertices;

  for (let i = 0; i < vertices.length; i++) {
    // Ease back to original vertice position while still maintaining sine wave
    vertices[i].x -= (Math.sin(delta + vertices[i].randomDelay) / 20) * vertices[i].dx;
    vertices[i].y += (Math.sin(delta + vertices[i].randomDelay) / 20) * vertices[i].dy;
  }  
}






let introContainer = document.querySelector('.intro-container');
let xMark = document.querySelector('.x-mark');
let shiftCameraButton = document.querySelector('.js-shift-camera-button')
let introTimeline = new TimelineMax();
let isItShifted = false

shiftCameraButton.addEventListener('click', toggleCameraShifting)
xMark.addEventListener('click', reverseCamera)


function toggleCameraShifting(){
  if(!isItShifted) {
    cameraShift()
    isItShifted = true
  } else {
     reverseCamera()
     isItShifted = false
  }
}

function cameraShift(){
  introTimeline.add([
    TweenLite.to(camera.rotation, 3, {x: Math.PI / 2, ease: Power3.easeInOut}),
    TweenLite.to(camera.position, 2.5, {z: 20, ease: Power3.easeInOut}),
    TweenLite.to(camera.position, 3, {y: 120, ease: Power3.easeInOut}),
    TweenLite.to(introContainer, 4.5, {color: "rgb(211, 204, 204)", ease: Power3.easeInOut}),
    TweenLite.to(shiftCameraButton, .003, {text: "go back", ease: Power3.easeInOut, delay: 3}),
    TweenLite.to(groundMesh.scale, 3, {x: 2, ease: Power3.easeInOut}),
    TweenLite.to(xMark, 3, {opacity: 1, ease: Power3.easeInOut, delay: 2})
  ]) 
}

function reverseCamera(){
  introTimeline.add([
    TweenLite.to(xMark, 0.5, {opacity: 0, ease: Power3.easeInOut}),
    TweenLite.to(camera.rotation, 3, {x: 0, ease: Power3.easeInOut}),
    TweenLite.to(camera.position, 3, {z: 50, ease: Power3.easeInOut}),
    TweenLite.to(camera.position, 2.5, {y: 0, ease: Power3.easeInOut}),
    TweenLite.to(groundMesh.scale, 3, {x: 1, ease: Power3.easeInOut}),
    TweenLite.to(introContainer, 0.5, {color: "rgb(34, 34, 34)", opacity: 1, ease: Power3.easeIn}),
    TweenLite.to(shiftCameraButton, .003, {text: "To the stars", ease: Power3.easeInOut, delay: 3})
  ])
}


init()
render()

/***/ })

/******/ });