//Get the Physics right
Physijs.scripts.worker = "physijs_worker.js";


//Set the important variables before doing anything
//var scene = new THREE.Scene();

//Apply Gravity to the scene
scene = Physijs.Scene;
scene.setGravity(new THREE.Vector3(0,0,0));
var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight/*Aspect Ratio */, 0.1, 1000);
var renderer = new THREE.WebGLRenderer(); 

//Color Pallete
var black = "rgb(0,0,0)";
var white = "rgb(255,255,255)";
var red = "rgb(255,0,0)";
var green = "rgb(10,200,10)";

//Define the Fog
var fogEffect =1;

if(fogEffect){
    scene.fog = new THREE.Fog(0xffffff,0.1,150);
}

//SpotLight
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,40);
scene.add(spotLight);


//Rendering to the Window
renderer.setClearColor(black);
renderer.setSize(window.innerWidth, window.innerHeight);


//For Debugging purposes
var axes = new THREE.AxesHelper(30);
scene.add(axes);

//This section is for the objects
//Plane
var planeGeometry = new THREE.PlaneGeometry(70,30,1,1);
var planeMaterial = new THREE.MeshBasicMaterial({color:green});
var plane = new Physijs.BoxMesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5*Math.PI;
scene.add(plane);

//Cube
var cubeGeometry = new THREE.CubeGeometry(10,10,10);
var cubeMaterial = new THREE.MeshLambertMaterial({color:red});
var cube = new Physijs.BoxMesh(cubeGeometry, cubeMaterial);
cube.position.x = -10;
cube.position.y = 5;
scene.add(cube);

//Pyramid
var pyramidGeometry = new THREE.CylinderGeometry(1,6,20);
var pyramidMaterial = new THREE.MeshLambertMaterial();
var pyramid = new Physijs.BoxMesh(pyramidGeometry, pyramidMaterial);
pyramid.position.x = 20;
pyramid.position.y = 10;
scene.add(pyramid);


//Sphere
var sphereGeometry = new THREE.SphereGeometry(4,20,20);
var sphereMaterial = new THREE.MeshLambertMaterial({color:red});
var sphere = new Physijs.SphereMesh(sphereGeometry, sphereMaterial);
sphere.position.x = 10;
sphere.position.y = 4;
scene.add(sphere);

// Adding random plantes as obstacles
				for ( var i = 0; i < 20; i ++ ) {
				map = THREE.ImageUtils.loadTexture('../water.jpg');
				geometry = new THREE.SphereGeometry(200, 150, 150);
				material = new THREE.MeshPhongMaterial({shading: THREE.FlatShading,
				color: 0x000000,
				ambient: 0x1c3cd2,
				emissive: 0xb61313,
				specular: 0x111111,
				shininess: 30,
				map: map, side: THREE.DoubleSide});
				mesh = new Physijs.SphereMesh(geometry, material);
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.repeat.set( 5, 5 );
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.1;
				mesh.position.y = Math.random() * 1000 - 500;
				mesh.position.x = Math.random() * 1000 - 500;
				mesh.position.z = Math.random() * 1000 - 500;
				scene.add(mesh);
				}

                geometry = new THREE.Geometry();
				for ( i = 0; i < 50000; i ++ ) {
					var vertex = new THREE.Vector3();
					vertex.x = 1000 * Math.random() - 500;
					vertex.y = 1000 * Math.random() - 500;
					vertex.z = 1000 * Math.random() - 500;
					geometry.vertices.push( vertex );
				}
				material = new THREE.ParticleBasicMaterial( { size: 1, sizeAttenuation: false, transparent: true } );
				material.color.setHex( 0xff00ff );
				particles = new THREE.ParticleSystem( geometry, material );
				particles.sortParticles = true;
				scene.add( particles );

//Cylinder
var cylinderGeometry = new THREE.CylinderGeometry(2,2,20);
var cylinderMaterial = new THREE.MeshLambertMaterial();
var cylinder = new Physijs.BoxMesh(cylinderGeometry, cylinderMaterial);
cylinder.position.x = 0;
cylinder.position.y = 10;
scene.add(cylinder);

//Donut
var donutGeometry = new THREE.TorusGeometry(3,2);
var donutMaterial = new THREE.MeshLambertMaterial();
var donut = new Physijs.BoxMesh(donutGeometry, donutMaterial);
donut.position.x = -25;
donut.position.y = 3;
scene.add(donut);

//Adding the camera just to get started
camera.position.x = 50;
camera.position.y = 50;
camera.position.z = 50;
camera.lookAt(scene.position);


//FirstPersons Control Variable and Objects
var cameraControllsFirstPerson = new THREE.FirstPersonControls(camera);
cameraControllsFirstPerson.lookSpeed = 0.05;
cameraControllsFirstPerson.movementSpeed = 10;
var step = 0;
var stepy = 0;
var clock = new THREE.Clock();


//This function is for Animation
function renderScene(){
    //Make updates to positions, rotation of objects in the scene
    step += 0.005;
    stepy += 0.00005;
    var delta = clock.getDelta();
    donut.rotation.y += 0.01;

    //camera.position.x = 60*Math.cos(step);
    //camera.position.z = 60*Math.sin(step);
    //camera.lookAt(scene.position);

    cameraControllsFirstPerson.update(delta);
    renderer.clear();

    //Does all the Physics we've setup.
    scene.simulate();

    requestAnimationFrame(renderScene);
    renderer.render(scene,camera);

}

$("#animated_world").append(renderer.domElement);
renderScene();
