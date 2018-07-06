var scene, camera, renderer, controls;
var material_path = 'textures/materials/';
var uniforms_texture, uniforms_combo;

var fabric_maps = {
    cspec : loadTexture(material_path + 'fabric/spec.png'),
    cdiff : loadTexture(material_path + 'fabric/diff.png'),
    rough : loadTexture(material_path + 'fabric/rough.png'),
    normal : loadTexture(material_path + 'fabric/norm.png')
};

var wood_maps = {
    cspec : loadTexture(material_path + 'wood/spec.png'),
    cdiff : loadTexture(material_path + 'wood/diff.png'),
    rough : loadTexture(material_path + 'wood/rough.png'),
    normal : loadTexture(material_path + 'wood/norm.png')
};

var croc_maps = {
    cspec : loadTexture(material_path + 'croc/spec.png'),
    cdiff : loadTexture(material_path + 'croc/diff.png'),
    rough : loadTexture(material_path + 'croc/rough.png'),
    normal : loadTexture(material_path + 'croc/norm.png')
};

var white_maps = {
  cspec : loadTexture(material_path + 'white/spec.png'),
  cdiff : loadTexture(material_path + 'white/diff.png'),
  rough : loadTexture(material_path + 'white/rough.png'),
  normal : loadTexture(material_path + 'white/norm.png')
};

var pink_maps = {
  cspec : loadTexture(material_path + 'pink/spec.png'),
  cdiff : loadTexture(material_path + 'pink/diff.png'),
  rough : loadTexture(material_path + 'pink/rough.png'),
  normal : loadTexture(material_path + 'pink/norm.png')
};


function Start() {
  scene = new THREE.Scene();


  var canvas = document.getElementById("visualizer");

  renderer = new THREE.WebGLRenderer( {canvas: canvas, antialias: true} );
  renderer.setSize( canvas.width, canvas.height );
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( canvas.devicePixelRatio );
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;

  camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );

  camera.position.set(0,1.6,1.5);
  camera.lookAt( new THREE.Vector3(0,0,0));

  //vertex shader
  vs = document.getElementById("vertex").textContent;

  //metal material and enviroment map loader
  var textureLoader = new THREE.CubeTextureLoader();
  textureLoader.setPath( 'textures/envMap/' );

  var textureCube = textureLoader.load( [
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
  ] );

  //scene.background = textureCube;


  uniforms_texture = {
    specularMap: { type: "t", value: wood_maps['cspec']},
    diffuseMap: { type: "t", value: wood_maps['cdiff']},
    roughnessMap: { type: "t", value: wood_maps['rough']},
    normalMap : { type: "t", value: wood_maps['normal']},
    pointLightPosition1:	{ type: "v3", value: new THREE.Vector3(0,6,-2) },
    //pointLightPosition2:	{ type: "v3", value: new THREE.Vector3(0,-6,0) },
    pointLightPosition3:	{ type: "v3", value: new THREE.Vector3(6,0,2) },
    pointLightPosition4:	{ type: "v3", value: new THREE.Vector3(-6,0,2) },
    clight:	{ type: "v3", value: new THREE.Vector3(1,1,1) },
    radius: {type: "float", value: 45.0},
    textureRepeat: { type: "v2", value : new THREE.Vector2(1,1)}
  };

  fs_texture = document.getElementById("fragment_texture").textContent;

  var texture_material = new THREE.ShaderMaterial({uniforms: uniforms_texture, vertexShader: vs, fragmentShader: fs_texture});

  var uniforms_metal = {
    cspec:	{ type: "v3", value: new THREE.Vector3(0.8,0.8,0.8) },
    envMap:	{ type: "t", value: textureCube},
  };

  fs_metal = document.getElementById("fragment_metal").textContent;

  var metal_material = new THREE.ShaderMaterial({uniforms: uniforms_metal, vertexShader: vs, fragmentShader: fs_metal});

  uniforms_combo = {
    specularMap: { type: "t", value: white_maps['cspec']},
    diffuseMap: { type: "t", value: white_maps['cdiff']},
    roughnessMap: { type: "t", value: white_maps['rough']},
    normalMap : { type: "t", value: white_maps['normal']},
    envMap:	{ type: "t", value: textureCube},
    pointLightPosition1:	{ type: "v3", value: new THREE.Vector3(0,6,-2) },
    //pointLightPosition2:	{ type: "v3", value: new THREE.Vector3(0,-6,0) },
    pointLightPosition3:	{ type: "v3", value: new THREE.Vector3(6,0,2) },
    pointLightPosition4:	{ type: "v3", value: new THREE.Vector3(-6,0,2) },
    clight:	{ type: "v3", value: new THREE.Vector3(1,1,1) },
    radius: {type: "float", value: 45.0},
    textureRepeat: { type: "v2", value : new THREE.Vector2(1,1)}
  };

  var fs_combo = document.getElementById("fragment_combo").textContent;

  var combo_material = new THREE.ShaderMaterial({uniforms: uniforms_combo, vertexShader: vs, fragmentShader: fs_combo});

  // instantiate a loader
  var loader = new THREE.OBJLoader();

  var nSubMesh = 0;

  // load a resource
  loader.load(
    // resource URL
    'models/soap_dispenser.obj',
    // called when resource is loaded
    function ( object ) {

      object.traverse(function( child ){

        switch (nSubMesh) {
          /*case 131: case 114: case 58:{
            child.material = metal_material;
          }break;*/


          case 1: case 11:{
            child.material = texture_material;
          }break;

          case 33: case 32: case 40:{
            child.material = combo_material;
          }break;


          default:
          child.material = metal_material;
        }

        child.position.set(0,-1.4,0);


        nSubMesh++;
      });

      console.log(nSubMesh);

      object.scale.set(0.2,0.15,0.2);
      object.rotation.y = -Math.PI/4;
      scene.add( object );


    },
    // called when loading is in progresses
    function ( xhr ) {

      var load = ( xhr.loaded / xhr.total * 100 );

      console.log(load + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened' );

    }
  );


  controls = new THREE.OrbitControls( camera , canvas );
  controls.addEventListener( 'change', Render );

  controls.enablePan = false;

  controls.maxDistance = 4;
  controls.minDistance = 1.5;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI/3;
  controls.update();


}

function Update() {
  requestAnimationFrame( Update );
  controls.update();
  Render();
}

function Render() {
  renderer.render(scene, camera);
}

function loadTexture(file) {
  var texture = new THREE.TextureLoader().load( file , function ( texture ) {

    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.anisotropy = renderer.getMaxAnisotropy();
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.needsUpdate = true;
    Render();
  });
  return texture;
}

//Start();
Update();
