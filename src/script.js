import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const retangulo = new THREE.BoxGeometry(2, 1, 1)
const retangulo_material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const retangulo_mesh = new THREE.Mesh(retangulo, retangulo_material)
scene.add(retangulo_mesh)

const shape = new THREE.Shape();
const largura = 1;
const altura = 1;
shape.moveTo(0, 0);
shape.lineTo(largura, 0);
shape.lineTo(largura / 2, altura);
const triangulo = new THREE.ShapeGeometry(shape);
const triangulo_material = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 });
const triangle = new THREE.Line(triangulo, triangulo_material);
scene.add(triangle);


const roof_shape = new THREE.Shape();
const roof_largura = 2.8;
const roof_altura = 1.7;
const alturaTriangulo = roof_altura / 2;
const alturaRetangulo = roof_altura / 2;
roof_shape.moveTo(0, alturaTriangulo);
roof_shape.lineTo(roof_largura, alturaTriangulo);
roof_shape.lineTo(roof_largura, alturaTriangulo + alturaRetangulo);
roof_shape.lineTo(0, alturaTriangulo + alturaRetangulo);

const roof_geometry = new THREE.ShapeGeometry(roof_shape);
const roof_material = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });
const roof = new THREE.Line(roof_geometry, roof_material);
scene.add(roof);


roof.position.x = 0.1
roof.position.y = -0.3

triangle.position.x = -0.5
triangle.position.y = 0.5
retangulo_mesh.position.x = 1.5

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(roof.position, { duration: 1, delay: 2, x: 2 })
gsap.to(triangle.position, { duration: 1, delay: 3, x: 2 })
gsap.to(retangulo_mesh.position, { duration: 1, delay: 4, x: 4 })


//Animations
const tick = () => {
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()