
/* TDA Motion Studio — 3D Rage World
   Requires Three.js and a canvas with id="tda3dWorld".
*/
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js';

const canvas = document.getElementById('tda3dWorld');

if (canvas) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#090807');
  scene.fog = new THREE.FogExp2('#110b0a', 0.025);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 150);
  camera.position.set(0, 4, 16);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  scene.add(new THREE.HemisphereLight(0xd9c1a5, 0x140806, 1.5));

  const light = new THREE.PointLight('#ff401f', 100, 35);
  light.position.set(0, 4, -3);
  scene.add(light);

  const neonLight = new THREE.PointLight('#c9ff00', 70, 30);
  neonLight.position.set(5, 2, 0);
  scene.add(neonLight);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
      color: '#17100e',
      roughness: 0.9
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  scene.add(ground);

  const grid = new THREE.GridHelper(80, 60, 0xff4926, 0x39231d);
  grid.position.y = -0.98;
  grid.material.transparent = true;
  grid.material.opacity = 0.45;
  scene.add(grid);

  // Glowing portal
  const portal = new THREE.Group();
  portal.position.set(0, 2, -7);
  scene.add(portal);

  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(3, 0.14, 16, 100),
    new THREE.MeshStandardMaterial({
      color: '#ff6b38',
      emissive: '#ff3210',
      emissiveIntensity: 3,
      metalness: 0.6,
      roughness: 0.25
    })
  );
  outerRing.scale.y = 1.3;
  portal.add(outerRing);

  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.7, 0.045, 12, 100),
    new THREE.MeshBasicMaterial({ color: '#c9ff00' })
  );
  innerRing.scale.y = 1.3;
  portal.add(innerRing);

  const core = new THREE.Mesh(
    new THREE.CircleGeometry(2.7, 64),
    new THREE.MeshBasicMaterial({
      color: '#25100f',
      side: THREE.DoubleSide
    })
  );
  core.scale.y = 1.3;
  core.position.z = -0.1;
  portal.add(core);

  // Floating rocks
  const rocks = [];

  for (let i = 0; i < 45; i++) {
    const rock = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.15 + Math.random() * 0.3, 0),
      new THREE.MeshStandardMaterial({
        color: i % 4 === 0 ? '#c9ff00' : '#74301f',
        emissive: i % 4 === 0 ? '#597900' : '#280800',
        emissiveIntensity: 1.2,
        flatShading: true,
        metalness: 0.5,
        roughness: 0.3
      })
    );

    rock.position.set(
      (Math.random() - 0.5) * 18,
      Math.random() * 8,
      -12 + Math.random() * 22
    );

    rock.userData.baseY = rock.position.y;
    rock.userData.phase = Math.random() * 6;
    rock.userData.speed = 0.5 + Math.random();
    scene.add(rock);
    rocks.push(rock);
  }

  // Cinematic mountain silhouettes
  for (let i = 0; i < 20; i++) {
    const mountain = new THREE.Mesh(
      new THREE.ConeGeometry(1 + Math.random(), 1, 7, 2),
      new THREE.MeshStandardMaterial({
        color: i % 2 ? '#281714' : '#40221a',
        flatShading: true,
        roughness: 1
      })
    );

    mountain.scale.set(2.2, 5 + Math.random() * 5, 1.5);
    mountain.position.set(
      (i % 2 ? 1 : -1) * (4 + Math.random() * 8),
      1,
      -10 - Math.random() * 8
    );

    scene.add(mountain);
  }

  const clock = new THREE.Clock();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width || window.innerWidth);
    const height = Math.max(1, rect.height || 500);

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();

  window.tda3dCanvasReady = true;

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    portal.rotation.y = Math.sin(time * 0.3) * 0.12;
    outerRing.rotation.z = time * 0.12;
    innerRing.rotation.z = -time * 0.17;

    portal.scale.setScalar(1 + Math.sin(time * 1.8) * 0.025);

    camera.position.x = Math.sin(time * 0.2) * 0.6;
    camera.position.y = 4 + Math.sin(time * 0.4) * 0.3;
    camera.lookAt(0, 1.5, -3);

    light.intensity = 85 + Math.sin(time * 3) * 20;
    neonLight.intensity = 60 + Math.sin(time * 2) * 15;

    rocks.forEach((rock) => {
      rock.rotation.x += 0.003;
      rock.rotation.y += 0.005;
      rock.position.y =
        rock.userData.baseY +
        Math.sin(time * rock.userData.speed + rock.userData.phase) * 0.4;
    });

    renderer.render(scene, camera);
  }

  animate();
}
