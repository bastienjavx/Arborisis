import { t as _sfc_main$4 } from "./GuestLayout-pnlb6vqh.js";
import { t as _sfc_main$5 } from "./SoundCard-CEaIMnR_.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineAsyncComponent, mergeProps, onMounted, onUnmounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { VignetteShader } from "three/addons/shaders/VignetteShader.js";
//#region resources/js/Composables/useParallax.js
/**
* Composable pour ajouter un effet de parallaxe sur un élément
* @param {number} speed - Vitesse du parallaxe (1 = normal, 0.5 = moitié, -0.3 = inverse)
* @param {string} direction - 'vertical' | 'horizontal'
* @returns {object} { elementRef, style }
*/
function useParallax(speed = .3, direction = "vertical") {
	const elementRef = ref(null);
	const style = ref({});
	let rafId = null;
	const update = () => {
		if (!elementRef.value) return;
		const rect = elementRef.value.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const offset = (rect.top + rect.height / 2 - windowHeight / 2) / windowHeight * speed * 100;
		if (direction === "vertical") style.value = {
			transform: `translateY(${offset}px)`,
			willChange: "transform"
		};
		else style.value = {
			transform: `translateX(${offset}px)`,
			willChange: "transform"
		};
	};
	const onScroll = () => {
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			update();
			rafId = null;
		});
	};
	onMounted(() => {
		window.addEventListener("scroll", onScroll, { passive: true });
		update();
	});
	onUnmounted(() => {
		window.removeEventListener("scroll", onScroll);
		if (rafId) cancelAnimationFrame(rafId);
	});
	return {
		elementRef,
		style
	};
}
//#endregion
//#region resources/js/Components/Three/ParticleField.vue
var _sfc_main$3 = {
	__name: "ParticleField",
	__ssrInlineRender: true,
	setup(__props) {
		const canvasContainer = ref(null);
		let renderer, scene, camera, particles, animationId;
		let startTime = 0;
		const COLORS = [
			3462041,
			4876097,
			9414286,
			13935988
		];
		onMounted(() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!canvasContainer.value) return;
			startTime = performance.now();
			const width = canvasContainer.value.clientWidth;
			const height = canvasContainer.value.clientHeight;
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(60, width / height, .1, 100);
			camera.position.z = 5;
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0, 0);
			canvasContainer.value.appendChild(renderer.domElement);
			const particleCount = window.innerWidth < 768 ? 15 : 30;
			const positions = new Float32Array(particleCount * 3);
			const colors = new Float32Array(particleCount * 3);
			const sizes = new Float32Array(particleCount);
			const speeds = new Float32Array(particleCount);
			const colorObj = new THREE.Color();
			for (let i = 0; i < particleCount; i++) {
				positions[i * 3] = (Math.random() - .5) * 12;
				positions[i * 3 + 1] = (Math.random() - .5) * 8;
				positions[i * 3 + 2] = (Math.random() - .5) * 6;
				colorObj.setHex(COLORS[Math.floor(Math.random() * COLORS.length)]);
				colors[i * 3] = colorObj.r;
				colors[i * 3 + 1] = colorObj.g;
				colors[i * 3 + 2] = colorObj.b;
				sizes[i] = .03 + Math.random() * .06;
				speeds[i] = .2 + Math.random() * .5;
			}
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
			geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
			geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
			const material = new THREE.ShaderMaterial({
				uniforms: { uTime: { value: 0 } },
				vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float uTime;
            void main() {
                vColor = color;
                vec3 pos = position;
                pos.y += sin(uTime * 0.3 + position.x) * 0.15;
                pos.x += cos(uTime * 0.2 + position.y) * 0.1;
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
				fragmentShader: `
            varying vec3 vColor;
            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
                gl_FragColor = vec4(vColor, alpha * 0.6);
            }
        `,
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});
			particles = new THREE.Points(geometry, material);
			scene.add(particles);
			const onResize = () => {
				if (!canvasContainer.value) return;
				const w = canvasContainer.value.clientWidth;
				const h = canvasContainer.value.clientHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			};
			window.addEventListener("resize", onResize);
			const animate = () => {
				animationId = requestAnimationFrame(animate);
				const elapsed = (performance.now() - startTime) / 1e3;
				material.uniforms.uTime.value = elapsed;
				renderer.render(scene, camera);
			};
			animate();
			renderer.userData = { onResize };
		});
		onUnmounted(() => {
			if (animationId) cancelAnimationFrame(animationId);
			if (renderer) {
				if (renderer.userData?.onResize) window.removeEventListener("resize", renderer.userData.onResize);
				if (particles) {
					particles.geometry.dispose();
					particles.material.dispose();
				}
				renderer.dispose();
				if (canvasContainer.value && renderer.domElement) canvasContainer.value.removeChild(renderer.domElement);
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "canvasContainer",
				ref: canvasContainer,
				class: "absolute inset-0 w-full h-full pointer-events-none",
				"aria-hidden": "true"
			}, _attrs))}></div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Three/ParticleField.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Three/NatureScene.vue
var _sfc_main$2 = {
	__name: "NatureScene",
	__ssrInlineRender: true,
	setup(__props) {
		const canvasContainer = ref(null);
		let renderer, scene, camera, composer, animationId;
		let trees = [];
		let fireflies, dustParticles;
		let mouseX = 0, mouseY = 0;
		let targetCameraX = 0, targetCameraY = 2;
		let scrollProgress = 0;
		let startTime = 0;
		const COLORS = {
			trunk: 7029795,
			trunkDark: 4073251,
			foliageDark: 1786674,
			foliageMid: 2976335,
			foliageLight: 4231532,
			foliageEmerald: 3462041,
			ground: 1255955,
			groundLight: 1786674,
			sky: 725536,
			groundHemi: 1715994
		};
		function createLowPolyTree(x, z, scale = 1, type = "pine") {
			const group = new THREE.Group();
			const trunkHeight = 1.2 * scale;
			const trunkGeo = new THREE.CylinderGeometry(.06 * scale, .16 * scale, trunkHeight, 7);
			const trunkMat = new THREE.MeshPhongMaterial({
				color: COLORS.trunk,
				flatShading: true,
				shininess: 5
			});
			const trunk = new THREE.Mesh(trunkGeo, trunkMat);
			trunk.position.y = trunkHeight / 2;
			trunk.castShadow = true;
			trunk.receiveShadow = true;
			group.add(trunk);
			if (scale > 1 && type === "pine") {
				const branchGeo = new THREE.ConeGeometry(.08 * scale, .3 * scale, 5);
				const branchMat = new THREE.MeshPhongMaterial({
					color: COLORS.trunkDark,
					flatShading: true,
					shininess: 5
				});
				[-1, 1].forEach((side) => {
					const branch = new THREE.Mesh(branchGeo, branchMat);
					branch.position.set(side * .18 * scale, trunkHeight * .35, 0);
					branch.rotation.z = side * Math.PI / 3;
					branch.castShadow = true;
					group.add(branch);
				});
			}
			const foliageColor = type === "pine" ? COLORS.foliageMid : type === "dark" ? COLORS.foliageDark : COLORS.foliageLight;
			const foliageMat = new THREE.MeshPhongMaterial({
				color: foliageColor,
				flatShading: true,
				shininess: 10
			});
			if (type === "pine") [
				{
					y: trunkHeight + .22 * scale,
					r: .6 * scale,
					h: .65 * scale
				},
				{
					y: trunkHeight + .6 * scale,
					r: .45 * scale,
					h: .55 * scale
				},
				{
					y: trunkHeight + .95 * scale,
					r: .28 * scale,
					h: .45 * scale
				}
			].forEach((layer, i) => {
				const cone = new THREE.Mesh(new THREE.ConeGeometry(layer.r, layer.h, 8), foliageMat.clone());
				cone.position.y = layer.y;
				const colorVar = new THREE.Color(foliageColor);
				colorVar.offsetHSL(0, 0, (i - 1) * .03);
				cone.material.color = colorVar;
				cone.castShadow = true;
				cone.receiveShadow = true;
				group.add(cone);
			});
			else if (type === "round") {
				const sphere = new THREE.Mesh(new THREE.DodecahedronGeometry(.55 * scale, 1), foliageMat);
				sphere.position.y = trunkHeight + .45 * scale;
				sphere.castShadow = true;
				sphere.receiveShadow = true;
				group.add(sphere);
				const sphere2 = new THREE.Mesh(new THREE.DodecahedronGeometry(.38 * scale, 1), foliageMat.clone());
				sphere2.position.set(.18 * scale, trunkHeight + .75 * scale, .12 * scale);
				sphere2.material.color.offsetHSL(0, 0, .04);
				sphere2.castShadow = true;
				group.add(sphere2);
			} else {
				const cone = new THREE.Mesh(new THREE.ConeGeometry(.32 * scale, 1.3 * scale, 7), foliageMat);
				cone.position.y = trunkHeight + .55 * scale;
				cone.castShadow = true;
				cone.receiveShadow = true;
				group.add(cone);
			}
			group.position.set(x, 0, z);
			group.userData = {
				initialRotation: {
					x: 0,
					z: 0
				},
				swaySpeed: .4 + Math.random() * .7,
				swayAmount: .015 + Math.random() * .025,
				phase: Math.random() * Math.PI * 2
			};
			return group;
		}
		function createGround() {
			const groundGeo = new THREE.PlaneGeometry(30, 30, 12, 12);
			const posAttribute = groundGeo.attributes.position;
			for (let i = 0; i < posAttribute.count; i++) {
				const x = posAttribute.getX(i);
				const y = posAttribute.getY(i);
				const z = Math.sin(x * .4) * .12 + Math.cos(y * .25) * .08 + Math.sin(x * .8 + y * .6) * .04;
				posAttribute.setZ(i, z);
			}
			groundGeo.computeVertexNormals();
			const groundMat = new THREE.MeshPhongMaterial({
				color: COLORS.ground,
				flatShading: true,
				shininess: 0
			});
			const ground = new THREE.Mesh(groundGeo, groundMat);
			ground.rotation.x = -Math.PI / 2;
			ground.position.y = -.1;
			ground.receiveShadow = true;
			return ground;
		}
		function createFireflies() {
			const count = 50;
			const positions = new Float32Array(count * 3);
			const colors = new Float32Array(count * 3);
			const sizes = new Float32Array(count);
			const phases = new Float32Array(count);
			const colorObj = new THREE.Color();
			for (let i = 0; i < count; i++) {
				positions[i * 3] = (Math.random() - .5) * 14;
				positions[i * 3 + 1] = .3 + Math.random() * 3.5;
				positions[i * 3 + 2] = (Math.random() - .5) * 14;
				const colorChoice = Math.random();
				if (colorChoice < .4) colorObj.setHex(COLORS.foliageEmerald);
				else if (colorChoice < .7) colorObj.setHex(13935988);
				else colorObj.setHex(9414286);
				colors[i * 3] = colorObj.r;
				colors[i * 3 + 1] = colorObj.g;
				colors[i * 3 + 2] = colorObj.b;
				sizes[i] = .025 + Math.random() * .06;
				phases[i] = Math.random() * Math.PI * 2;
			}
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
			geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
			geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
			geometry.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
			const material = new THREE.ShaderMaterial({
				uniforms: { uTime: { value: 0 } },
				vertexShader: `
            attribute float size;
            attribute vec3 color;
            attribute float phase;
            varying vec3 vColor;
            varying float vAlpha;
            uniform float uTime;

            void main() {
                vColor = color;
                vec3 pos = position;
                pos.x += sin(uTime * 0.7 + phase) * 0.35;
                pos.y += cos(uTime * 0.45 + phase * 1.3) * 0.18 + sin(uTime * 1.1 + phase) * 0.08;
                pos.z += sin(uTime * 0.55 + phase * 0.7) * 0.22;
                vAlpha = 0.35 + 0.65 * pow(sin(uTime * 2.2 + phase), 2.0);
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (450.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
				fragmentShader: `
            varying vec3 vColor;
            varying float vAlpha;

            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                float alpha = (1.0 - smoothstep(0.08, 0.5, dist)) * vAlpha;
                gl_FragColor = vec4(vColor * 1.3, alpha);
            }
        `,
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});
			return new THREE.Points(geometry, material);
		}
		function createDustParticles() {
			const count = 80;
			const positions = new Float32Array(count * 3);
			const speeds = new Float32Array(count);
			for (let i = 0; i < count; i++) {
				positions[i * 3] = (Math.random() - .5) * 16;
				positions[i * 3 + 1] = Math.random() * 4;
				positions[i * 3 + 2] = (Math.random() - .5) * 16;
				speeds[i] = .1 + Math.random() * .3;
			}
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
			geometry.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
			const material = new THREE.ShaderMaterial({
				uniforms: { uTime: { value: 0 } },
				vertexShader: `
            attribute float speed;
            varying float vAlpha;
            uniform float uTime;
            void main() {
                vec3 pos = position;
                pos.y += sin(uTime * speed + position.x) * 0.05;
                pos.x += cos(uTime * speed * 0.7 + position.z) * 0.03;
                vAlpha = 0.15 + 0.1 * sin(uTime * 0.5 + position.y);
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = 1.5 * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
				fragmentShader: `
            varying float vAlpha;
            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                float alpha = (1.0 - smoothstep(0.1, 0.5, dist)) * vAlpha;
                gl_FragColor = vec4(0.85, 0.9, 0.8, alpha);
            }
        `,
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});
			return new THREE.Points(geometry, material);
		}
		function createRocks() {
			const group = new THREE.Group();
			const rockMat = new THREE.MeshPhongMaterial({
				color: 4013373,
				flatShading: true,
				shininess: 15
			});
			for (let i = 0; i < 8; i++) {
				const scale = .08 + Math.random() * .18;
				const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(scale, 0), rockMat);
				rock.position.set((Math.random() - .5) * 10, scale * .25, (Math.random() - .5) * 10);
				rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
				rock.castShadow = true;
				rock.receiveShadow = true;
				group.add(rock);
			}
			return group;
		}
		function createGrassTufts() {
			const group = new THREE.Group();
			const grassColors = [
				COLORS.foliageMid,
				COLORS.foliageLight,
				COLORS.foliageDark
			];
			for (let i = 0; i < 120; i++) {
				const color = grassColors[Math.floor(Math.random() * grassColors.length)];
				const grassMat = new THREE.MeshPhongMaterial({
					color,
					flatShading: true,
					shininess: 0
				});
				const height = .08 + Math.random() * .18;
				const blade = new THREE.Mesh(new THREE.ConeGeometry(.015 + Math.random() * .02, height, 4), grassMat);
				const x = (Math.random() - .5) * 14;
				const z = (Math.random() - .5) * 14;
				const y = height / 2;
				blade.position.set(x, y, z);
				blade.rotation.y = Math.random() * Math.PI;
				blade.rotation.x = (Math.random() - .5) * .15;
				blade.rotation.z = (Math.random() - .5) * .15;
				group.add(blade);
			}
			return group;
		}
		onMounted(() => {
			const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			if (!canvasContainer.value) return;
			startTime = performance.now();
			const width = canvasContainer.value.clientWidth;
			const height = canvasContainer.value.clientHeight;
			scene = new THREE.Scene();
			scene.fog = new THREE.FogExp2(COLORS.sky, .065);
			camera = new THREE.PerspectiveCamera(45, width / height, .1, 50);
			camera.position.set(0, 2.2, 8);
			camera.lookAt(0, 1.2, 0);
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: false,
				powerPreference: "high-performance"
			});
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(COLORS.sky, 1);
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.toneMappingExposure = 1.9;
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			canvasContainer.value.appendChild(renderer.domElement);
			scene.background = new THREE.Color(COLORS.sky);
			const hemiLight = new THREE.HemisphereLight(7048811, 2771498, .75);
			hemiLight.position.set(0, 20, 0);
			scene.add(hemiLight);
			const moonLight = new THREE.DirectionalLight(15266042, 2);
			moonLight.position.set(4, 9, 5);
			moonLight.castShadow = true;
			moonLight.shadow.mapSize.width = 2048;
			moonLight.shadow.mapSize.height = 2048;
			moonLight.shadow.camera.near = .5;
			moonLight.shadow.camera.far = 25;
			moonLight.shadow.camera.left = -12;
			moonLight.shadow.camera.right = 12;
			moonLight.shadow.camera.top = 12;
			moonLight.shadow.camera.bottom = -12;
			moonLight.shadow.radius = 3;
			moonLight.shadow.bias = -5e-4;
			moonLight.shadow.normalBias = .02;
			scene.add(moonLight);
			const spotLight = new THREE.SpotLight(15784112, 3.5, 18, Math.PI / 8, .6, 1.5);
			spotLight.position.set(-3, 6, 2);
			spotLight.target.position.set(0, 0, -1);
			spotLight.castShadow = true;
			spotLight.shadow.mapSize.width = 1024;
			spotLight.shadow.mapSize.height = 1024;
			spotLight.shadow.bias = -1e-4;
			spotLight.shadow.radius = 2;
			scene.add(spotLight);
			scene.add(spotLight.target);
			const rimLight = new THREE.DirectionalLight(8191932, 1);
			rimLight.position.set(-5, 2, -4);
			scene.add(rimLight);
			const fillLight = new THREE.PointLight(16441536, 1.3, 12, 1.8);
			fillLight.position.set(2, 1.5, 4);
			scene.add(fillLight);
			const backLight = new THREE.PointLight(11063532, .9, 15, 2);
			backLight.position.set(0, 3, -5);
			scene.add(backLight);
			composer = new EffectComposer(renderer);
			const renderPass = new RenderPass(scene, camera);
			composer.addPass(renderPass);
			const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), .35, .4, .85);
			composer.addPass(bloomPass);
			const vignettePass = new ShaderPass(VignetteShader);
			vignettePass.uniforms["offset"].value = 1.3;
			vignettePass.uniforms["darkness"].value = 1.1;
			composer.addPass(vignettePass);
			const ground = createGround();
			scene.add(ground);
			scene.add(createRocks());
			scene.add(createGrassTufts());
			[
				{
					x: -2.8,
					z: -1.2,
					s: 1.3,
					t: "pine"
				},
				{
					x: -1,
					z: -3,
					s: 1,
					t: "dark"
				},
				{
					x: 2,
					z: -2.5,
					s: 1.15,
					t: "pine"
				},
				{
					x: 3.2,
					z: -.5,
					s: .75,
					t: "round"
				},
				{
					x: -.8,
					z: -3.8,
					s: 1.4,
					t: "pine"
				},
				{
					x: 1.2,
					z: -4,
					s: .85,
					t: "dark"
				},
				{
					x: -3.5,
					z: .8,
					s: .65,
					t: "round"
				},
				{
					x: 3.8,
					z: 1,
					s: 1.05,
					t: "pine"
				},
				{
					x: 0,
					z: -.8,
					s: 1.6,
					t: "pine"
				},
				{
					x: -2,
					z: 1.8,
					s: .8,
					t: "round"
				},
				{
					x: 2.2,
					z: 2,
					s: .9,
					t: "dark"
				},
				{
					x: -.5,
					z: 2.5,
					s: .55,
					t: "round"
				}
			].forEach((cfg) => {
				const tree = createLowPolyTree(cfg.x, cfg.z, cfg.s, cfg.t);
				trees.push(tree);
				scene.add(tree);
			});
			fireflies = createFireflies();
			scene.add(fireflies);
			dustParticles = createDustParticles();
			scene.add(dustParticles);
			const onMouseMove = (event) => {
				mouseX = event.clientX / window.innerWidth * 2 - 1;
				mouseY = event.clientY / window.innerHeight * 2 - 1;
			};
			window.addEventListener("mousemove", onMouseMove);
			const onScroll = () => {
				const section = canvasContainer.value.closest("[data-parallax-section]");
				if (!section) return;
				const rect = section.getBoundingClientRect();
				const windowHeight = window.innerHeight;
				const sectionHeight = rect.height;
				const rawProgress = (windowHeight - rect.top) / (windowHeight + sectionHeight);
				scrollProgress = Math.max(0, Math.min(1, rawProgress));
			};
			window.addEventListener("scroll", onScroll, { passive: true });
			const onResize = () => {
				if (!canvasContainer.value) return;
				const w = canvasContainer.value.clientWidth;
				const h = canvasContainer.value.clientHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
				composer.setSize(w, h);
				bloomPass.resolution.set(w, h);
			};
			window.addEventListener("resize", onResize);
			const animate = () => {
				animationId = requestAnimationFrame(animate);
				const elapsed = (performance.now() - startTime) / 1e3;
				targetCameraX = mouseX * .6 + (scrollProgress - .5) * 1.8;
				targetCameraY = 2.2 - mouseY * .25 + scrollProgress * 1.2;
				camera.position.x += (targetCameraX - camera.position.x) * .025;
				camera.position.y += (targetCameraY - camera.position.y) * .025;
				camera.lookAt(0, 1.1 + scrollProgress * .4, 0);
				if (!prefersReducedMotion) trees.forEach((tree) => {
					const data = tree.userData;
					const sway = Math.sin(elapsed * data.swaySpeed + data.phase) * data.swayAmount;
					tree.rotation.z = sway;
					tree.rotation.x = Math.cos(elapsed * data.swaySpeed * .7 + data.phase) * data.swayAmount * .5;
				});
				if (fireflies) fireflies.material.uniforms.uTime.value = elapsed;
				if (dustParticles) dustParticles.material.uniforms.uTime.value = elapsed;
				spotLight.intensity = 2.5 + Math.sin(elapsed * .3) * .4;
				fillLight.intensity = .8 + Math.sin(elapsed * .5 + 1) * .2;
				spotLight.position.x = -3 + Math.sin(elapsed * .08) * 1.5;
				spotLight.position.z = 2 + Math.cos(elapsed * .08) * 1.5;
				composer.render();
			};
			animate();
			renderer.userData = {
				onResize,
				onMouseMove,
				onScroll
			};
		});
		onUnmounted(() => {
			if (animationId) cancelAnimationFrame(animationId);
			if (renderer) {
				const { onResize, onMouseMove, onScroll } = renderer.userData || {};
				if (onResize) window.removeEventListener("resize", onResize);
				if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
				if (onScroll) window.removeEventListener("scroll", onScroll);
				trees.forEach((tree) => {
					tree.traverse((child) => {
						if (child.geometry) child.geometry.dispose();
						if (child.material) if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
						else child.material.dispose();
					});
				});
				if (fireflies) {
					fireflies.geometry.dispose();
					fireflies.material.dispose();
				}
				if (dustParticles) {
					dustParticles.geometry.dispose();
					dustParticles.material.dispose();
				}
				if (composer) composer.dispose();
				renderer.dispose();
				if (canvasContainer.value && renderer.domElement) canvasContainer.value.removeChild(renderer.domElement);
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "canvasContainer",
				ref: canvasContainer,
				class: "absolute inset-0 w-full h-full",
				"aria-hidden": "true"
			}, _attrs))}></div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Three/NatureScene.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/CreatorCard.vue
var _sfc_main$1 = {
	__name: "CreatorCard",
	__ssrInlineRender: true,
	props: {
		creator: {
			type: Object,
			required: true
		},
		featuredSound: {
			type: Object,
			default: null
		}
	},
	setup(__props) {
		const formatNumber = (num) => {
			if (!num) return "0";
			if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
			if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
			return num.toString();
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "creator-card group cursor-pointer transition-all duration-200 hover:-translate-y-0.5" }, _attrs))}><div class="flex items-center gap-4"><div class="shrink-0"><div class="w-16 h-16 rounded-full bg-arbor-moss/20 flex items-center justify-center text-xl font-display font-semibold text-arbor-emerald ring-2 ring-arbor-glass-border group-hover:ring-arbor-emerald/30 transition-all">`);
			if (__props.creator.avatar_url) _push(`<img${ssrRenderAttr("src", __props.creator.avatar_url)}${ssrRenderAttr("alt", `Avatar de ${__props.creator.name}`)} class="w-full h-full rounded-full object-cover" loading="lazy">`);
			else _push(`<span>${ssrInterpolate(__props.creator.name.charAt(0).toUpperCase())}</span>`);
			_push(`</div></div><div class="flex-1 min-w-0">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("creators.show", __props.creator.slug),
				class: "block font-medium text-arbor-cream truncate group-hover:text-arbor-emerald transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night rounded"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.creator.name)}`);
					else return [createTextVNode(toDisplayString(__props.creator.name), 1)];
				}),
				_: 1
			}, _parent));
			if (__props.creator.location) _push(`<p class="text-xs text-arbor-sage truncate mt-0.5">${ssrInterpolate(__props.creator.location)}</p>`);
			else _push(`<!---->`);
			_push(`<div class="flex items-center gap-3 mt-2 text-xs text-arbor-sage/70"><span class="flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg> ${ssrInterpolate(formatNumber(__props.creator.sounds_count || 0))} sons </span><span class="flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(formatNumber(__props.creator.total_plays || 0))} écoutes </span></div></div>`);
			if (__props.featuredSound) {
				_push(`<div class="hidden sm:block shrink-0 w-24">`);
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("sounds.show", __props.featuredSound.slug),
					class: "block relative aspect-square rounded-xl overflow-hidden bg-arbor-charcoal group/sound cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-arbor-emerald/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arbor-night"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							if (__props.featuredSound.cover_url) _push(`<img${ssrRenderAttr("src", __props.featuredSound.cover_url)}${ssrRenderAttr("alt", __props.featuredSound.title)} class="w-full h-full object-cover group-hover/sound:scale-110 transition-transform duration-300" loading="lazy"${_scopeId}>`);
							else _push(`<!---->`);
							_push(`<div class="absolute inset-0 bg-arbor-night/40 flex items-center justify-center opacity-0 group-hover/sound:opacity-100 transition-opacity"${_scopeId}><svg class="w-6 h-6 text-arbor-cream" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M8 5v14l11-7z"${_scopeId}></path></svg></div>`);
						} else return [__props.featuredSound.cover_url ? (openBlock(), createBlock("img", {
							key: 0,
							src: __props.featuredSound.cover_url,
							alt: __props.featuredSound.title,
							class: "w-full h-full object-cover group-hover/sound:scale-110 transition-transform duration-300",
							loading: "lazy"
						}, null, 8, ["src", "alt"])) : createCommentVNode("", true), createVNode("div", { class: "absolute inset-0 bg-arbor-night/40 flex items-center justify-center opacity-0 group-hover/sound:opacity-100 transition-opacity" }, [(openBlock(), createBlock("svg", {
							class: "w-6 h-6 text-arbor-cream",
							fill: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", { d: "M8 5v14l11-7z" })]))])];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CreatorCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Landing.vue
var _sfc_main = {
	__name: "Landing",
	__ssrInlineRender: true,
	props: {
		stats: Object,
		featuredSounds: {
			type: Array,
			default: () => []
		},
		featuredCreators: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const SoundMap = defineAsyncComponent(() => import("./SoundMap-Dtx1WMjf.js"));
		const props = __props;
		const featuredSounds = ref(props.featuredSounds);
		const featuredCreators = ref(props.featuredCreators);
		const soundsLoading = ref(props.featuredSounds.length === 0);
		const creatorsLoading = ref(props.featuredCreators.length === 0);
		ref([
			{
				title: "Carte sonore interactive",
				description: "Explorez une carte mondiale des enregistrements naturels, filtrez par environnement et découvrez des sons uniques.",
				icon: "M9 6.75002V15M15 9.00002V17.25M15.5031 20.7485L20.3781 18.311C20.7592 18.1204 21 17.7309 21 17.3047V4.82031C21 3.98401 20.1199 3.44007 19.3719 3.81408L15.5031 5.74847C15.1864 5.90683 14.8136 5.90683 14.4969 5.74847L9.50312 3.25158C9.1864 3.09322 8.8136 3.09322 8.49688 3.25158L3.62188 5.68908C3.24075 5.87965 3 6.26919 3 6.69531V19.1797C3 20.016 3.8801 20.56 4.62811 20.186L8.49688 18.2516C8.8136 18.0932 9.1864 18.0932 9.50312 18.2516L14.4969 20.7485C14.8136 20.9068 15.1864 20.9068 15.5031 20.7485Z"
			},
			{
				title: "Lecteur audio immersif",
				description: "Écoutez chaque son dans un lecteur premium avec visualisation, contrôles intuitifs et expérience contemplative.",
				icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			},
			{
				title: "Soutenez les créateurs",
				description: "Avec les crédits ECHO, soutenez financièrement les enregistreurs et contribuez à l'archive sonore collective.",
				icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
			}
		]);
		const steps = ref([
			{
				number: "01",
				title: "Explorez",
				description: "Naviguez sur la carte ou parcourez les catégories pour découvrir des paysages sonores uniques.",
				icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7"
			},
			{
				number: "02",
				title: "Écoutez",
				description: "Lancez la lecture et laissez-vous transporter par les sons de la nature, capturés avec passion.",
				icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			},
			{
				number: "03",
				title: "Partagez",
				description: "Publiez vos propres enregistrements et soutenez les créateurs qui enrichissent l'archive.",
				icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
			}
		]);
		const categories = ref([
			{
				name: "Forêts",
				count: 0,
				color: "bg-emerald-500/20 text-emerald-400"
			},
			{
				name: "Océans",
				count: 0,
				color: "bg-blue-500/20 text-blue-400"
			},
			{
				name: "Montagnes",
				count: 0,
				color: "bg-stone-500/20 text-stone-400"
			},
			{
				name: "Rivières",
				count: 0,
				color: "bg-cyan-500/20 text-cyan-400"
			},
			{
				name: "Pluie",
				count: 0,
				color: "bg-indigo-500/20 text-indigo-400"
			},
			{
				name: "Crépuscule",
				count: 0,
				color: "bg-amber-500/20 text-amber-400"
			}
		]);
		const atlasPillars = ref([
			{
				kicker: "Explorer",
				title: "Carte vivante",
				description: "Des traces sonores approximées, filtrées par biomes, saisons et espèces, sans exposer les coordonnées sensibles."
			},
			{
				kicker: "Écouter",
				title: "Archives précieuses",
				description: "Chaque enregistrement devient une fiche de terrain : contexte, lieu, heure, météo, espèces et signal audio."
			},
			{
				kicker: "Documenter",
				title: "Laboratoire du vivant",
				description: "Des visualisations scientifiques lisibles pour observer la biodiversité sonore dans le temps."
			}
		]);
		const scientificSignals = ref([
			"Densité sonore",
			"Saisons",
			"Espèces détectées",
			"Météo",
			"Habitats",
			"Évolution du lieu"
		]);
		const mapSounds = ref([]);
		const mapLoading = ref(true);
		const mapError = ref(false);
		const audioDemoTitle = useParallax(.15);
		const howItWorksTitle = useParallax(.1);
		const missionTitle = useParallax(.12);
		const animatedStats = ref({
			sounds: 0,
			creators: 0,
			countries: 0
		});
		const statsVisible = ref(false);
		let statsObserver = null;
		const prefersReducedMotion = ref(false);
		const normalizeHeroSound = (sound) => {
			if (!sound) return null;
			if (sound.properties) return {
				id: sound.properties.id,
				title: sound.properties.title,
				slug: sound.properties.slug,
				duration: sound.properties.duration,
				category: sound.properties.category,
				location: sound.properties.location_name,
				user: sound.properties.user_name,
				recordedAt: sound.properties.recorded_at
			};
			return {
				id: sound.id,
				title: sound.title,
				slug: sound.slug,
				duration: sound.duration,
				category: sound.category?.name || sound.category,
				location: sound.sound_location?.location_name || sound.location_name,
				user: sound.user_name || sound.user?.name,
				recordedAt: sound.recorded_at || sound.created_at
			};
		};
		const heroTrace = computed(() => {
			return normalizeHeroSound(featuredSounds.value[0] || mapSounds.value[0]);
		});
		const heroTraceCode = computed(() => {
			if (!heroTrace.value?.id) return "ARB-LIVE";
			const rawDate = heroTrace.value.recordedAt || (/* @__PURE__ */ new Date()).toISOString();
			return `ARB-${new Date(rawDate).getFullYear()}-${String(heroTrace.value.id).padStart(4, "0")}`;
		});
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
		};
		const animateCount = (target, key, duration = 1500) => {
			if (prefersReducedMotion.value) {
				animatedStats.value[key] = target;
				return;
			}
			const start = performance.now();
			const from = 0;
			const to = target;
			const step = (now) => {
				const progress = Math.min((now - start) / duration, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				animatedStats.value[key] = Math.floor(from + (to - from) * eased);
				if (progress < 1) requestAnimationFrame(step);
			};
			requestAnimationFrame(step);
		};
		const loadFeaturedSounds = async () => {
			try {
				const response = await fetch("/api/sounds/featured");
				if (!response.ok) throw new Error("Failed to fetch sounds");
				featuredSounds.value = await response.json();
			} catch (e) {
				console.error("Failed to load featured sounds:", e);
			} finally {
				soundsLoading.value = false;
			}
		};
		const loadFeaturedCreators = async () => {
			try {
				const response = await fetch("/api/creators/featured");
				if (!response.ok) throw new Error("Failed to fetch creators");
				featuredCreators.value = await response.json();
			} catch (e) {
				console.error("Failed to load featured creators:", e);
			} finally {
				creatorsLoading.value = false;
			}
		};
		onMounted(() => {
			prefersReducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			loadMapSounds();
			loadFeaturedSounds();
			loadFeaturedCreators();
			const statsEl = document.getElementById("stats-section");
			if (statsEl) {
				statsObserver = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !statsVisible.value) {
							statsVisible.value = true;
							animateCount(props.stats.sounds, "sounds");
							animateCount(props.stats.creators, "creators");
							animateCount(props.stats.countries, "countries");
						}
					});
				}, { threshold: .3 });
				statsObserver.observe(statsEl);
			}
		});
		onUnmounted(() => {
			if (statsObserver) statsObserver.disconnect();
		});
		const loadMapSounds = async () => {
			try {
				mapSounds.value = (await (await fetch("/api/map/sounds?limit=50")).json()).features ?? [];
			} catch (e) {
				console.error("Failed to load map sounds:", e);
				mapError.value = true;
			} finally {
				mapLoading.value = false;
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Le vivant s'écoute" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$4, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<section class="relative flex min-h-screen items-center overflow-hidden"${_scopeId}><img src="/images/hero-leaf.webp" alt="" class="absolute inset-0 w-full h-full object-cover animate-ken-burns" style="${ssrRenderStyle({ "filter": "brightness(0.55) contrast(1.15) saturate(0.8)" })}" fetchpriority="high" decoding="async"${_scopeId}><div class="absolute inset-0 bg-arbor-night/70"${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-t from-arbor-night via-transparent to-arbor-night/40"${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-arbor-emerald/10 via-transparent to-arbor-night/60"${_scopeId}></div><div class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle({ "background": "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(2, 15, 8, 0.7) 100%)" })}"${_scopeId}></div><div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style="${ssrRenderStyle({
							"background-image": "url('data:image/svg+xml,%3Csvg viewBox=%220 0 512 512%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%225%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
							"background-repeat": "repeat"
						})}"${_scopeId}></div><div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(215,180,106,0.18),transparent_28rem),radial-gradient(circle_at_75%_62%,rgba(143,230,193,0.1),transparent_24rem)] opacity-80"${_scopeId}></div>`);
						_push(ssrRenderComponent(_sfc_main$3, null, null, _parent, _scopeId));
						_push(`<div class="absolute inset-0 opacity-[0.02] pointer-events-none" style="${ssrRenderStyle({ "background": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)" })}"${_scopeId}></div><div class="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8"${_scopeId}><div${_scopeId}><p class="atlas-kicker mb-5 animate-slide-up"${_scopeId}>Atlas acoustique du vivant</p><h1 class="atlas-heading mb-6 max-w-4xl text-6xl sm:text-7xl lg:text-8xl animate-slide-up"${_scopeId}> Le vivant<br${_scopeId}> s&#39;écoute. </h1><p class="max-w-2xl text-lg leading-8 text-arbor-sage sm:text-xl animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}"${_scopeId}> Explorez les sons naturels du monde comme des traces vivantes : lieux, espèces, saisons et mémoires audio capturés par une communauté de créateurs naturalistes. </p><div class="mt-10 flex flex-col gap-4 sm:flex-row animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/map",
							class: "btn-primary text-base px-8 py-4 w-full sm:w-auto group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"${_scopeId}></path></svg> Explorer la carte `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
								}), createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
								})])), createTextVNode(" Explorer la carte ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("sounds.create"),
							class: "btn-secondary text-base px-8 py-4 w-full sm:w-auto group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Publier une trace `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								})])), createTextVNode(" Publier une trace ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="mt-12 grid grid-cols-3 gap-3 max-w-xl animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.28s" })}"${_scopeId}><div class="field-stat"${_scopeId}><div class="font-mono text-2xl text-arbor-cream tabular-nums"${_scopeId}>${ssrInterpolate(props.stats.sounds)}+</div><div class="mt-1 text-[11px] uppercase tracking-[0.16em] text-arbor-sage"${_scopeId}>sons</div></div><div class="field-stat"${_scopeId}><div class="font-mono text-2xl text-arbor-cream tabular-nums"${_scopeId}>${ssrInterpolate(props.stats.creators)}+</div><div class="mt-1 text-[11px] uppercase tracking-[0.16em] text-arbor-sage"${_scopeId}>créateurs</div></div><div class="field-stat"${_scopeId}><div class="font-mono text-2xl text-arbor-cream tabular-nums"${_scopeId}>${ssrInterpolate(props.stats.countries)}+</div><div class="mt-1 text-[11px] uppercase tracking-[0.16em] text-arbor-sage"${_scopeId}>pays</div></div></div></div><div class="trace-frame hidden min-h-[520px] p-5 lg:block animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.18s" })}"${_scopeId}><div class="relative z-10 flex h-full flex-col justify-between"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="atlas-kicker"${_scopeId}>Trace de l&#39;atlas</span><span class="rounded-full border border-arbor-firefly/20 bg-arbor-firefly/10 px-3 py-1 font-mono text-[11px] text-arbor-firefly"${_scopeId}>${ssrInterpolate(heroTraceCode.value)}</span></div><div class="my-10 grid flex-1 place-items-center"${_scopeId}><div class="sound-trace grid h-64 w-64 place-items-center rounded-full border border-arbor-mineral/10 bg-arbor-forest/50"${_scopeId}><div class="grid h-36 w-36 place-items-center rounded-full border border-arbor-lichen/20 bg-arbor-lichen/10"${_scopeId}><div class="trace-wave h-16"${_scopeId}><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span></div></div></div></div><div class="grid grid-cols-2 gap-3"${_scopeId}><div class="rounded-lg border border-arbor-mineral/10 bg-arbor-ink/40 p-4"${_scopeId}><div class="text-xs text-arbor-sage"${_scopeId}>Son publié</div>`);
						if (heroTrace.value?.slug) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("sounds.show", heroTrace.value.slug),
							class: "mt-1 block truncate font-display text-xl text-arbor-cream transition-colors hover:text-arbor-lichen"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(heroTrace.value.title)}`);
								else return [createTextVNode(toDisplayString(heroTrace.value.title), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<div class="mt-1 font-display text-xl text-arbor-cream"${_scopeId}>${ssrInterpolate(mapLoading.value || soundsLoading.value ? "Chargement..." : "Aucune trace disponible")}</div>`);
						_push(`</div><div class="rounded-lg border border-arbor-mineral/10 bg-arbor-ink/40 p-4"${_scopeId}><div class="text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(heroTrace.value?.location ? "Lieu public" : "Signal")}</div><div class="mt-1 truncate font-mono text-xl text-arbor-firefly"${_scopeId}>${ssrInterpolate(heroTrace.value?.location || formatDuration(heroTrace.value?.duration))}</div></div></div>`);
						if (heroTrace.value?.category || heroTrace.value?.user) _push(`<div class="mt-3 flex items-center justify-between gap-3 rounded-lg border border-arbor-mineral/10 bg-arbor-ink/30 px-4 py-3 text-xs text-arbor-sage"${_scopeId}><span class="truncate"${_scopeId}>${ssrInterpolate(heroTrace.value.category || "Archive sonore")}</span><span class="truncate"${_scopeId}>${ssrInterpolate(heroTrace.value.user || "Créateur Arborisis")}</span></div>`);
						else _push(`<!---->`);
						_push(`</div></div></div><div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-indicator" aria-hidden="true"${_scopeId}><div class="flex flex-col items-center gap-2"${_scopeId}><span class="text-[10px] uppercase tracking-[0.2em] text-arbor-sage/60"${_scopeId}>Scroll</span><svg class="w-5 h-5 text-arbor-sage/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"${_scopeId}></path></svg></div></div></section><section id="stats-section" class="border-y border-arbor-mineral/10 bg-arbor-ink/40 py-20"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-10 max-w-3xl"${_scopeId}><p class="atlas-kicker mb-3"${_scopeId}>Explorer le vivant par le son</p><h2 class="atlas-heading text-4xl sm:text-5xl"${_scopeId}>Une carte, une archive, un laboratoire.</h2></div><div class="grid grid-cols-1 gap-4 md:grid-cols-3"${_scopeId}><!--[-->`);
						ssrRenderList(atlasPillars.value, (pillar) => {
							_push(`<div class="trace-frame p-6"${_scopeId}><div class="relative z-10"${_scopeId}><p class="atlas-kicker mb-5"${_scopeId}>${ssrInterpolate(pillar.kicker)}</p><h3 class="font-display text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(pillar.title)}</h3><p class="mt-4 text-sm leading-6 text-arbor-sage"${_scopeId}>${ssrInterpolate(pillar.description)}</p></div></div>`);
						});
						_push(`<!--]--></div></div></section><section class="py-24"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div style="${ssrRenderStyle(unref(audioDemoTitle).style.value)}" class="mb-14 max-w-3xl"${_scopeId}><p class="atlas-kicker mb-3"${_scopeId}>Fragments de territoire</p><h2 class="atlas-heading text-4xl sm:text-5xl"${_scopeId}> Des sons traités comme des archives vivantes. </h2><p class="mt-5 text-arbor-sage max-w-2xl leading-7"${_scopeId}> Chaque carte porte une trace : durée, créateur, contexte et empreinte visuelle du signal. </p></div>`);
						if (soundsLoading.value) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(6, (n) => {
								_push(`<div class="glass-card overflow-hidden animate-pulse"${_scopeId}><div class="aspect-[16/9] bg-arbor-charcoal/60"${_scopeId}></div><div class="p-4 space-y-3"${_scopeId}><div class="h-4 bg-arbor-charcoal/60 rounded w-3/4"${_scopeId}></div><div class="h-3 bg-arbor-charcoal/60 rounded w-1/2"${_scopeId}></div></div></div>`);
							});
							_push(`<!--]--></div>`);
						} else if (featuredSounds.value.length > 0) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(featuredSounds.value, (sound) => {
								_push(ssrRenderComponent(_sfc_main$5, {
									key: sound.id,
									sound
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else {
							_push(`<div class="text-center py-16"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><h3 class="font-display text-lg text-arbor-cream mb-2"${_scopeId}>L&#39;archive s&#39;éveille</h3><p class="text-arbor-sage max-w-sm mx-auto mb-6"${_scopeId}> Les premiers enregistrements arrivent. Soyez parmi les premiers à capturer et partager les sons de la nature. </p>`);
							_push(ssrRenderComponent(unref(Link), {
								href: "/record",
								class: "btn-primary inline-flex items-center gap-2"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"${_scopeId}></path></svg> Enregistrer un son `);
									else return [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
									})])), createTextVNode(" Enregistrer un son ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						}
						_push(`<div class="text-center mt-10"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/sounds",
							class: "btn-secondary inline-flex items-center gap-2 group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Découvrir tous les sons <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
								else return [createTextVNode(" Découvrir tous les sons "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></section><section class="py-24 bg-arbor-deep/30"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"${_scopeId}><div${_scopeId}><p class="atlas-kicker mb-4"${_scopeId}>Carte vivante</p><h2 class="atlas-heading text-4xl sm:text-5xl mb-6"${_scopeId}> Le monde devient audible. </h2><p class="text-arbor-sage mb-8 leading-relaxed"${_scopeId}> Chaque point représente un moment capturé : chant à l&#39;aube, rivière en crue, vent dans les cimes. Les coordonnées publiques restent approximées pour protéger les lieux sensibles. </p><div class="flex flex-wrap gap-3 mb-8"${_scopeId}><!--[-->`);
						ssrRenderList(categories.value, (cat) => {
							_push(`<span class="rounded-full border border-arbor-mineral/10 bg-arbor-mist/5 px-3 py-1.5 text-xs font-medium text-arbor-sage transition-all duration-200 hover:border-arbor-lichen/30 hover:text-arbor-cream cursor-pointer select-none"${_scopeId}>${ssrInterpolate(cat.name)}</span>`);
						});
						_push(`<!--]--></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/map",
							class: "btn-primary group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Ouvrir la carte <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
								else return [createTextVNode(" Ouvrir la carte "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 ml-2 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="trace-frame aspect-[16/10] relative overflow-hidden hover-lift group"${_scopeId}>`);
						if (mapLoading.value) _push(`<div class="absolute inset-0 flex flex-col items-center justify-center bg-arbor-deep/80 z-10"${_scopeId}><div class="w-10 h-10 border-2 border-arbor-emerald/30 border-t-arbor-emerald rounded-full animate-spin mb-4"${_scopeId}></div><p class="text-arbor-sage text-sm"${_scopeId}>Chargement de la carte...</p></div>`);
						else _push(ssrRenderComponent(unref(SoundMap), {
							sounds: mapSounds.value,
							"initial-zoom": 2,
							"initial-center": [25, 10]
						}, null, _parent, _scopeId));
						_push(`<div class="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/5"${_scopeId}></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/map",
							class: "absolute inset-0 bg-arbor-night/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="btn-primary"${_scopeId}> Ouvrir la carte en plein écran </span>`);
								else return [createVNode("span", { class: "btn-primary" }, " Ouvrir la carte en plein écran ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></div></section><section class="relative overflow-hidden py-24"${_scopeId}><div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_20%,rgba(120,214,214,0.08),transparent_24rem)]"${_scopeId}></div><div class="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"${_scopeId}><div${_scopeId}><p class="atlas-kicker mb-4"${_scopeId}>Laboratoire naturaliste</p><h2 class="atlas-heading text-4xl sm:text-5xl"${_scopeId}> Beau à écouter. Sérieux à analyser. </h2><p class="mt-6 max-w-xl text-arbor-sage leading-7"${_scopeId}> Arborisis relie l&#39;émotion du terrain à des données exploitables : spectres, biodiversité sonore, variations saisonnières et comparaisons d&#39;un même lieu. </p>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/scientific-stats",
							class: "btn-secondary mt-8"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Ouvrir les données scientifiques `);
								else return [createTextVNode(" Ouvrir les données scientifiques ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="trace-frame p-6"${_scopeId}><div class="relative z-10"${_scopeId}><div class="mb-6 flex items-center justify-between"${_scopeId}><span class="atlas-kicker"${_scopeId}>Signaux observés</span><span class="font-mono text-xs text-arbor-sage"${_scopeId}>public / anonymisé</span></div><div class="grid gap-3 sm:grid-cols-2"${_scopeId}><!--[-->`);
						ssrRenderList(scientificSignals.value, (signal) => {
							_push(`<div class="rounded-lg border border-arbor-mineral/10 bg-arbor-mist/[0.04] p-4"${_scopeId}><div class="trace-wave mb-4 h-9 opacity-80"${_scopeId}><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span></div><div class="text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(signal)}</div></div>`);
						});
						_push(`<!--]--></div></div></div></div></section><section class="py-24"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div style="${ssrRenderStyle(unref(howItWorksTitle).style.value)}" class="text-center mb-16"${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4"${_scopeId}> Comment ça marche </h2><p class="text-arbor-sage max-w-xl mx-auto"${_scopeId}> Arborisis est simple. Trois étapes pour explorer et partager le monde sonore. </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"${_scopeId}><!--[-->`);
						ssrRenderList(steps.value, (step, index) => {
							_push(`<div class="glass-card-glow p-8 text-center cursor-pointer" style="${ssrRenderStyle(`animation: fadeInUp 0.6s ease-out forwards; animation-delay: ${index * .15}s; opacity: 0;`)}"${_scopeId}><div class="font-display text-5xl text-arbor-emerald/20 font-bold mb-4"${_scopeId}>${ssrInterpolate(step.number)}</div><div class="w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mx-auto mb-6"${_scopeId}><svg class="w-6 h-6 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", step.icon)}${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-arbor-cream mb-3"${_scopeId}>${ssrInterpolate(step.title)}</h3><p class="text-arbor-sage text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(step.description)}</p></div>`);
						});
						_push(`<!--]--></div></div></section><section data-parallax-section class="relative py-32 overflow-hidden min-h-[80vh] flex items-center"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, { class: "absolute inset-0 z-0" }, null, _parent, _scopeId));
						_push(`<div class="absolute inset-0 bg-gradient-to-b from-arbor-night via-transparent to-arbor-night z-[1] pointer-events-none"${_scopeId}></div><div class="absolute inset-0 bg-arbor-night/30 z-[1] pointer-events-none"${_scopeId}></div><div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><div class="glass-card-glow p-10 sm:p-14 inline-block max-w-2xl"${_scopeId}><div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-arbor-moss/20 mb-6 ring-1 ring-arbor-emerald/20"${_scopeId}><svg class="w-7 h-7 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"${_scopeId}></path></svg></div><h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-arbor-cream mb-5 leading-tight"${_scopeId}> Une forêt sonore<br${_scopeId}><span class="text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss"${_scopeId}>en perpétuel mouvement</span></h2><p class="text-arbor-sage text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-8"${_scopeId}> Chaque arbre, chaque feuille, chaque brise porte une mélodie. Notre archive capture l&#39;âme vivante des paysages naturels du monde entier. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/sounds",
							class: "btn-primary group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Écouter la forêt `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								})])), createTextVNode(" Écouter la forêt ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: "/map",
							class: "btn-secondary group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Explorer sur la carte <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
								else return [createTextVNode(" Explorer sur la carte "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 ml-2 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="mt-12 animate-scroll-indicator" aria-hidden="true"${_scopeId}><p class="text-[10px] uppercase tracking-[0.2em] text-arbor-sage/40 mb-2"${_scopeId}>Déplacez votre souris et scrollez</p><svg class="w-5 h-5 text-arbor-sage/40 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"${_scopeId}></path></svg></div></div></section><section class="py-24 bg-arbor-deep/30 border-y border-arbor-glass-border"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-16"${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4"${_scopeId}> Créateurs en avant </h2><p class="text-arbor-sage max-w-xl mx-auto"${_scopeId}> Rencontrez les enregistreurs qui donnent vie à l&#39;archive. </p></div>`);
						if (creatorsLoading.value) {
							_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(3, (n) => {
								_push(`<div class="glass-card p-6 animate-pulse"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-16 h-16 rounded-full bg-arbor-charcoal/60 shrink-0"${_scopeId}></div><div class="flex-1 space-y-2"${_scopeId}><div class="h-4 bg-arbor-charcoal/60 rounded w-2/3"${_scopeId}></div><div class="h-3 bg-arbor-charcoal/60 rounded w-1/2"${_scopeId}></div></div></div></div>`);
							});
							_push(`<!--]--></div>`);
						} else if (featuredCreators.value.length > 0) {
							_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
							ssrRenderList(featuredCreators.value, (creator) => {
								_push(ssrRenderComponent(_sfc_main$1, {
									key: creator.id,
									creator,
									"featured-sound": creator.featured_sound
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else {
							_push(`<div class="text-center py-16"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"${_scopeId}></path></svg></div><h3 class="font-display text-lg text-arbor-cream mb-2"${_scopeId}>Les pionniers de l&#39;écoute</h3><p class="text-arbor-sage max-w-sm mx-auto mb-6"${_scopeId}> Les premiers créateurs rejoindront bientôt l&#39;archive. Devenez l&#39;un d&#39;entre eux et faites entendre votre territoire. </p>`);
							_push(ssrRenderComponent(unref(Link), {
								href: "/register",
								class: "btn-primary inline-flex items-center gap-2"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"${_scopeId}></path></svg> Rejoindre la communauté `);
									else return [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
									})])), createTextVNode(" Rejoindre la communauté ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						}
						if (featuredCreators.value.length > 0) {
							_push(`<div class="text-center mt-10"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: "/creators",
								class: "btn-secondary inline-flex items-center gap-2 group"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Voir tous les créateurs <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
									else return [createTextVNode(" Voir tous les créateurs "), (openBlock(), createBlock("svg", {
										class: "w-4 h-4 transition-transform group-hover:translate-x-1",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M17 8l4 4m0 0l-4 4m4-4H3"
									})]))];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div></section><section class="py-24"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><div class="glass-card-glow p-12 relative overflow-hidden"${_scopeId}><div class="absolute top-0 right-0 w-64 h-64 bg-arbor-moss/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"${_scopeId}></div><div class="organic-blob w-48 h-48 bg-arbor-emerald/20 -top-10 -right-10"${_scopeId}></div><div class="relative z-10"${_scopeId}><div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-arbor-emerald/20 mb-6 animate-glow-pulse"${_scopeId}><span class="text-2xl font-display font-bold text-arbor-emerald"${_scopeId}>E</span></div><h2 class="font-display text-3xl font-bold text-arbor-cream mb-4"${_scopeId}> Soutenez avec ECHO </h2><p class="text-arbor-sage mb-8 max-w-lg mx-auto leading-relaxed"${_scopeId}> Les crédits ECHO vous permettent de soutenir directement les créateurs qui capturent et partagent les sons de la nature. Un geste simple, un impact réel. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/echo",
							class: "btn-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Découvrir ECHO `);
								else return [createTextVNode(" Découvrir ECHO ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<span class="text-xs text-arbor-sage"${_scopeId}> Pas une cryptomonnaie. Pas un investissement. </span></div></div></div></div></section><section class="py-24 bg-arbor-deep/30 border-y border-arbor-glass-border"${_scopeId}><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><div style="${ssrRenderStyle(unref(missionTitle).style.value)}"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream mb-6"${_scopeId}> Préserver l&#39;écoute du monde vivant </h2><p class="text-arbor-sage leading-relaxed mb-8"${_scopeId}> Arborisis naît d&#39;une conviction : les paysages sonores naturels sont un patrimoine fragile méritant d&#39;être documenté, partagé et protégé. En donnant une voix aux espaces silencieux, nous espérons susciter une écologie de l&#39;attention et une reconnaissance envers ceux qui consacrent leur temps à capturer ces instants éphémères. </p><div class="flex items-center justify-center gap-2 text-arbor-emerald text-sm"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"${_scopeId}></path></svg><span${_scopeId}>Respect de la nature. Confidentialité des lieux sensibles. Transparence.</span></div></div></div></section><section class="py-24"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6"${_scopeId}> Rejoignez la communauté </h2><p class="text-arbor-sage mb-10 max-w-xl mx-auto"${_scopeId}> Créez votre profil, publiez vos premiers enregistrements et connectez-vous avec d&#39;autres passionnés de sons naturels. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/register",
							class: "btn-primary text-base px-8 py-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Créer un compte gratuit `);
								else return [createTextVNode(" Créer un compte gratuit ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: "/login",
							class: "btn-secondary text-base px-8 py-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` J&#39;ai déjà un compte `);
								else return [createTextVNode(" J'ai déjà un compte ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></section>`);
					} else return [
						createVNode("section", { class: "relative flex min-h-screen items-center overflow-hidden" }, [
							createVNode("img", {
								src: "/images/hero-leaf.webp",
								alt: "",
								class: "absolute inset-0 w-full h-full object-cover animate-ken-burns",
								style: { "filter": "brightness(0.55) contrast(1.15) saturate(0.8)" },
								fetchpriority: "high",
								decoding: "async"
							}),
							createVNode("div", { class: "absolute inset-0 bg-arbor-night/70" }),
							createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-arbor-night via-transparent to-arbor-night/40" }),
							createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-arbor-emerald/10 via-transparent to-arbor-night/60" }),
							createVNode("div", {
								class: "absolute inset-0 pointer-events-none",
								style: { "background": "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(2, 15, 8, 0.7) 100%)" }
							}),
							createVNode("div", {
								class: "absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay",
								style: {
									"background-image": "url('data:image/svg+xml,%3Csvg viewBox=%220 0 512 512%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%225%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
									"background-repeat": "repeat"
								}
							}),
							createVNode("div", { class: "absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(215,180,106,0.18),transparent_28rem),radial-gradient(circle_at_75%_62%,rgba(143,230,193,0.1),transparent_24rem)] opacity-80" }),
							createVNode(_sfc_main$3),
							createVNode("div", {
								class: "absolute inset-0 opacity-[0.02] pointer-events-none",
								style: { "background": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)" }
							}),
							createVNode("div", { class: "relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8" }, [createVNode("div", null, [
								createVNode("p", { class: "atlas-kicker mb-5 animate-slide-up" }, "Atlas acoustique du vivant"),
								createVNode("h1", { class: "atlas-heading mb-6 max-w-4xl text-6xl sm:text-7xl lg:text-8xl animate-slide-up" }, [
									createTextVNode(" Le vivant"),
									createVNode("br"),
									createTextVNode(" s'écoute. ")
								]),
								createVNode("p", {
									class: "max-w-2xl text-lg leading-8 text-arbor-sage sm:text-xl animate-slide-up",
									style: { "animation-delay": "0.1s" }
								}, " Explorez les sons naturels du monde comme des traces vivantes : lieux, espèces, saisons et mémoires audio capturés par une communauté de créateurs naturalistes. "),
								createVNode("div", {
									class: "mt-10 flex flex-col gap-4 sm:flex-row animate-slide-up",
									style: { "animation-delay": "0.2s" }
								}, [createVNode(unref(Link), {
									href: "/map",
									class: "btn-primary text-base px-8 py-4 w-full sm:w-auto group"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
									}), createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
									})])), createTextVNode(" Explorer la carte ")]),
									_: 1
								}), createVNode(unref(Link), {
									href: _ctx.route("sounds.create"),
									class: "btn-secondary text-base px-8 py-4 w-full sm:w-auto group"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									})])), createTextVNode(" Publier une trace ")]),
									_: 1
								}, 8, ["href"])]),
								createVNode("div", {
									class: "mt-12 grid grid-cols-3 gap-3 max-w-xl animate-slide-up",
									style: { "animation-delay": "0.28s" }
								}, [
									createVNode("div", { class: "field-stat" }, [createVNode("div", { class: "font-mono text-2xl text-arbor-cream tabular-nums" }, toDisplayString(props.stats.sounds) + "+", 1), createVNode("div", { class: "mt-1 text-[11px] uppercase tracking-[0.16em] text-arbor-sage" }, "sons")]),
									createVNode("div", { class: "field-stat" }, [createVNode("div", { class: "font-mono text-2xl text-arbor-cream tabular-nums" }, toDisplayString(props.stats.creators) + "+", 1), createVNode("div", { class: "mt-1 text-[11px] uppercase tracking-[0.16em] text-arbor-sage" }, "créateurs")]),
									createVNode("div", { class: "field-stat" }, [createVNode("div", { class: "font-mono text-2xl text-arbor-cream tabular-nums" }, toDisplayString(props.stats.countries) + "+", 1), createVNode("div", { class: "mt-1 text-[11px] uppercase tracking-[0.16em] text-arbor-sage" }, "pays")])
								])
							]), createVNode("div", {
								class: "trace-frame hidden min-h-[520px] p-5 lg:block animate-slide-up",
								style: { "animation-delay": "0.18s" }
							}, [createVNode("div", { class: "relative z-10 flex h-full flex-col justify-between" }, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "atlas-kicker" }, "Trace de l'atlas"), createVNode("span", { class: "rounded-full border border-arbor-firefly/20 bg-arbor-firefly/10 px-3 py-1 font-mono text-[11px] text-arbor-firefly" }, toDisplayString(heroTraceCode.value), 1)]),
								createVNode("div", { class: "my-10 grid flex-1 place-items-center" }, [createVNode("div", { class: "sound-trace grid h-64 w-64 place-items-center rounded-full border border-arbor-mineral/10 bg-arbor-forest/50" }, [createVNode("div", { class: "grid h-36 w-36 place-items-center rounded-full border border-arbor-lichen/20 bg-arbor-lichen/10" }, [createVNode("div", { class: "trace-wave h-16" }, [
									createVNode("span"),
									createVNode("span"),
									createVNode("span"),
									createVNode("span"),
									createVNode("span"),
									createVNode("span")
								])])])]),
								createVNode("div", { class: "grid grid-cols-2 gap-3" }, [createVNode("div", { class: "rounded-lg border border-arbor-mineral/10 bg-arbor-ink/40 p-4" }, [createVNode("div", { class: "text-xs text-arbor-sage" }, "Son publié"), heroTrace.value?.slug ? (openBlock(), createBlock(unref(Link), {
									key: 0,
									href: _ctx.route("sounds.show", heroTrace.value.slug),
									class: "mt-1 block truncate font-display text-xl text-arbor-cream transition-colors hover:text-arbor-lichen"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(heroTrace.value.title), 1)]),
									_: 1
								}, 8, ["href"])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "mt-1 font-display text-xl text-arbor-cream"
								}, toDisplayString(mapLoading.value || soundsLoading.value ? "Chargement..." : "Aucune trace disponible"), 1))]), createVNode("div", { class: "rounded-lg border border-arbor-mineral/10 bg-arbor-ink/40 p-4" }, [createVNode("div", { class: "text-xs text-arbor-sage" }, toDisplayString(heroTrace.value?.location ? "Lieu public" : "Signal"), 1), createVNode("div", { class: "mt-1 truncate font-mono text-xl text-arbor-firefly" }, toDisplayString(heroTrace.value?.location || formatDuration(heroTrace.value?.duration)), 1)])]),
								heroTrace.value?.category || heroTrace.value?.user ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-3 flex items-center justify-between gap-3 rounded-lg border border-arbor-mineral/10 bg-arbor-ink/30 px-4 py-3 text-xs text-arbor-sage"
								}, [createVNode("span", { class: "truncate" }, toDisplayString(heroTrace.value.category || "Archive sonore"), 1), createVNode("span", { class: "truncate" }, toDisplayString(heroTrace.value.user || "Créateur Arborisis"), 1)])) : createCommentVNode("", true)
							])])]),
							createVNode("div", {
								class: "absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-indicator",
								"aria-hidden": "true"
							}, [createVNode("div", { class: "flex flex-col items-center gap-2" }, [createVNode("span", { class: "text-[10px] uppercase tracking-[0.2em] text-arbor-sage/60" }, "Scroll"), (openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-sage/80",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M19 14l-7 7m0 0l-7-7m7 7V3"
							})]))])])
						]),
						createVNode("section", {
							id: "stats-section",
							class: "border-y border-arbor-mineral/10 bg-arbor-ink/40 py-20"
						}, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "mb-10 max-w-3xl" }, [createVNode("p", { class: "atlas-kicker mb-3" }, "Explorer le vivant par le son"), createVNode("h2", { class: "atlas-heading text-4xl sm:text-5xl" }, "Une carte, une archive, un laboratoire.")]), createVNode("div", { class: "grid grid-cols-1 gap-4 md:grid-cols-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(atlasPillars.value, (pillar) => {
							return openBlock(), createBlock("div", {
								key: pillar.title,
								class: "trace-frame p-6"
							}, [createVNode("div", { class: "relative z-10" }, [
								createVNode("p", { class: "atlas-kicker mb-5" }, toDisplayString(pillar.kicker), 1),
								createVNode("h3", { class: "font-display text-2xl font-semibold text-arbor-cream" }, toDisplayString(pillar.title), 1),
								createVNode("p", { class: "mt-4 text-sm leading-6 text-arbor-sage" }, toDisplayString(pillar.description), 1)
							])]);
						}), 128))])])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
							createVNode("div", {
								ref: "audioDemoTitle.elementRef",
								style: unref(audioDemoTitle).style.value,
								class: "mb-14 max-w-3xl"
							}, [
								createVNode("p", { class: "atlas-kicker mb-3" }, "Fragments de territoire"),
								createVNode("h2", { class: "atlas-heading text-4xl sm:text-5xl" }, " Des sons traités comme des archives vivantes. "),
								createVNode("p", { class: "mt-5 text-arbor-sage max-w-2xl leading-7" }, " Chaque carte porte une trace : durée, créateur, contexte et empreinte visuelle du signal. ")
							], 4),
							soundsLoading.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
							}, [(openBlock(), createBlock(Fragment, null, renderList(6, (n) => {
								return createVNode("div", {
									key: n,
									class: "glass-card overflow-hidden animate-pulse"
								}, [createVNode("div", { class: "aspect-[16/9] bg-arbor-charcoal/60" }), createVNode("div", { class: "p-4 space-y-3" }, [createVNode("div", { class: "h-4 bg-arbor-charcoal/60 rounded w-3/4" }), createVNode("div", { class: "h-3 bg-arbor-charcoal/60 rounded w-1/2" })])]);
							}), 64))])) : featuredSounds.value.length > 0 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(featuredSounds.value, (sound) => {
								return openBlock(), createBlock(_sfc_main$5, {
									key: sound.id,
									sound
								}, null, 8, ["sound"]);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 2,
								class: "text-center py-16"
							}, [
								createVNode("div", { class: "w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4" }, [(openBlock(), createBlock("svg", {
									class: "w-8 h-8 text-arbor-moss/40",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1",
									d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
								})]))]),
								createVNode("h3", { class: "font-display text-lg text-arbor-cream mb-2" }, "L'archive s'éveille"),
								createVNode("p", { class: "text-arbor-sage max-w-sm mx-auto mb-6" }, " Les premiers enregistrements arrivent. Soyez parmi les premiers à capturer et partager les sons de la nature. "),
								createVNode(unref(Link), {
									href: "/record",
									class: "btn-primary inline-flex items-center gap-2"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
									})])), createTextVNode(" Enregistrer un son ")]),
									_: 1
								})
							])),
							createVNode("div", { class: "text-center mt-10" }, [createVNode(unref(Link), {
								href: "/sounds",
								class: "btn-secondary inline-flex items-center gap-2 group"
							}, {
								default: withCtx(() => [createTextVNode(" Découvrir tous les sons "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))]),
								_: 1
							})])
						])]),
						createVNode("section", { class: "py-24 bg-arbor-deep/30" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" }, [createVNode("div", null, [
							createVNode("p", { class: "atlas-kicker mb-4" }, "Carte vivante"),
							createVNode("h2", { class: "atlas-heading text-4xl sm:text-5xl mb-6" }, " Le monde devient audible. "),
							createVNode("p", { class: "text-arbor-sage mb-8 leading-relaxed" }, " Chaque point représente un moment capturé : chant à l'aube, rivière en crue, vent dans les cimes. Les coordonnées publiques restent approximées pour protéger les lieux sensibles. "),
							createVNode("div", { class: "flex flex-wrap gap-3 mb-8" }, [(openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
								return openBlock(), createBlock("span", {
									key: cat.name,
									class: "rounded-full border border-arbor-mineral/10 bg-arbor-mist/5 px-3 py-1.5 text-xs font-medium text-arbor-sage transition-all duration-200 hover:border-arbor-lichen/30 hover:text-arbor-cream cursor-pointer select-none"
								}, toDisplayString(cat.name), 1);
							}), 128))]),
							createVNode(unref(Link), {
								href: "/map",
								class: "btn-primary group"
							}, {
								default: withCtx(() => [createTextVNode(" Ouvrir la carte "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 ml-2 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))]),
								_: 1
							})
						]), createVNode("div", { class: "trace-frame aspect-[16/10] relative overflow-hidden hover-lift group" }, [
							mapLoading.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "absolute inset-0 flex flex-col items-center justify-center bg-arbor-deep/80 z-10"
							}, [createVNode("div", { class: "w-10 h-10 border-2 border-arbor-emerald/30 border-t-arbor-emerald rounded-full animate-spin mb-4" }), createVNode("p", { class: "text-arbor-sage text-sm" }, "Chargement de la carte...")])) : (openBlock(), createBlock(unref(SoundMap), {
								key: 1,
								sounds: mapSounds.value,
								"initial-zoom": 2,
								"initial-center": [25, 10]
							}, null, 8, ["sounds"])),
							createVNode("div", { class: "absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/5" }),
							createVNode(unref(Link), {
								href: "/map",
								class: "absolute inset-0 bg-arbor-night/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							}, {
								default: withCtx(() => [createVNode("span", { class: "btn-primary" }, " Ouvrir la carte en plein écran ")]),
								_: 1
							})
						])])])]),
						createVNode("section", { class: "relative overflow-hidden py-24" }, [createVNode("div", { class: "absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_20%,rgba(120,214,214,0.08),transparent_24rem)]" }), createVNode("div", { class: "relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8" }, [createVNode("div", null, [
							createVNode("p", { class: "atlas-kicker mb-4" }, "Laboratoire naturaliste"),
							createVNode("h2", { class: "atlas-heading text-4xl sm:text-5xl" }, " Beau à écouter. Sérieux à analyser. "),
							createVNode("p", { class: "mt-6 max-w-xl text-arbor-sage leading-7" }, " Arborisis relie l'émotion du terrain à des données exploitables : spectres, biodiversité sonore, variations saisonnières et comparaisons d'un même lieu. "),
							createVNode(unref(Link), {
								href: "/scientific-stats",
								class: "btn-secondary mt-8"
							}, {
								default: withCtx(() => [createTextVNode(" Ouvrir les données scientifiques ")]),
								_: 1
							})
						]), createVNode("div", { class: "trace-frame p-6" }, [createVNode("div", { class: "relative z-10" }, [createVNode("div", { class: "mb-6 flex items-center justify-between" }, [createVNode("span", { class: "atlas-kicker" }, "Signaux observés"), createVNode("span", { class: "font-mono text-xs text-arbor-sage" }, "public / anonymisé")]), createVNode("div", { class: "grid gap-3 sm:grid-cols-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(scientificSignals.value, (signal) => {
							return openBlock(), createBlock("div", {
								key: signal,
								class: "rounded-lg border border-arbor-mineral/10 bg-arbor-mist/[0.04] p-4"
							}, [createVNode("div", { class: "trace-wave mb-4 h-9 opacity-80" }, [
								createVNode("span"),
								createVNode("span"),
								createVNode("span"),
								createVNode("span"),
								createVNode("span"),
								createVNode("span")
							]), createVNode("div", { class: "text-sm font-medium text-arbor-cream" }, toDisplayString(signal), 1)]);
						}), 128))])])])])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", {
							ref: "howItWorksTitle.elementRef",
							style: unref(howItWorksTitle).style.value,
							class: "text-center mb-16"
						}, [createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4" }, " Comment ça marche "), createVNode("p", { class: "text-arbor-sage max-w-xl mx-auto" }, " Arborisis est simple. Trois étapes pour explorer et partager le monde sonore. ")], 4), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-8" }, [(openBlock(true), createBlock(Fragment, null, renderList(steps.value, (step, index) => {
							return openBlock(), createBlock("div", {
								key: step.number,
								class: "glass-card-glow p-8 text-center cursor-pointer",
								style: `animation: fadeInUp 0.6s ease-out forwards; animation-delay: ${index * .15}s; opacity: 0;`
							}, [
								createVNode("div", { class: "font-display text-5xl text-arbor-emerald/20 font-bold mb-4" }, toDisplayString(step.number), 1),
								createVNode("div", { class: "w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mx-auto mb-6" }, [(openBlock(), createBlock("svg", {
									class: "w-6 h-6 text-arbor-emerald",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: step.icon
								}, null, 8, ["d"])]))]),
								createVNode("h3", { class: "text-lg font-semibold text-arbor-cream mb-3" }, toDisplayString(step.title), 1),
								createVNode("p", { class: "text-arbor-sage text-sm leading-relaxed" }, toDisplayString(step.description), 1)
							], 4);
						}), 128))])])]),
						createVNode("section", {
							"data-parallax-section": "",
							class: "relative py-32 overflow-hidden min-h-[80vh] flex items-center"
						}, [
							createVNode(_sfc_main$2, { class: "absolute inset-0 z-0" }),
							createVNode("div", { class: "absolute inset-0 bg-gradient-to-b from-arbor-night via-transparent to-arbor-night z-[1] pointer-events-none" }),
							createVNode("div", { class: "absolute inset-0 bg-arbor-night/30 z-[1] pointer-events-none" }),
							createVNode("div", { class: "relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [createVNode("div", { class: "glass-card-glow p-10 sm:p-14 inline-block max-w-2xl" }, [
								createVNode("div", { class: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-arbor-moss/20 mb-6 ring-1 ring-arbor-emerald/20" }, [(openBlock(), createBlock("svg", {
									class: "w-7 h-7 text-arbor-emerald",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
								})]))]),
								createVNode("h2", { class: "font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-arbor-cream mb-5 leading-tight" }, [
									createTextVNode(" Une forêt sonore"),
									createVNode("br"),
									createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss" }, "en perpétuel mouvement")
								]),
								createVNode("p", { class: "text-arbor-sage text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-8" }, " Chaque arbre, chaque feuille, chaque brise porte une mélodie. Notre archive capture l'âme vivante des paysages naturels du monde entier. "),
								createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-4" }, [createVNode(unref(Link), {
									href: "/sounds",
									class: "btn-primary group"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "1.5",
										d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									})])), createTextVNode(" Écouter la forêt ")]),
									_: 1
								}), createVNode(unref(Link), {
									href: "/map",
									class: "btn-secondary group"
								}, {
									default: withCtx(() => [createTextVNode(" Explorer sur la carte "), (openBlock(), createBlock("svg", {
										class: "w-4 h-4 ml-2 transition-transform group-hover:translate-x-1",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M17 8l4 4m0 0l-4 4m4-4H3"
									})]))]),
									_: 1
								})])
							]), createVNode("div", {
								class: "mt-12 animate-scroll-indicator",
								"aria-hidden": "true"
							}, [createVNode("p", { class: "text-[10px] uppercase tracking-[0.2em] text-arbor-sage/40 mb-2" }, "Déplacez votre souris et scrollez"), (openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-sage/40 mx-auto",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M19 14l-7 7m0 0l-7-7m7 7V3"
							})]))])])
						]),
						createVNode("section", { class: "py-24 bg-arbor-deep/30 border-y border-arbor-glass-border" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
							createVNode("div", { class: "text-center mb-16" }, [createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4" }, " Créateurs en avant "), createVNode("p", { class: "text-arbor-sage max-w-xl mx-auto" }, " Rencontrez les enregistreurs qui donnent vie à l'archive. ")]),
							creatorsLoading.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "grid grid-cols-1 lg:grid-cols-3 gap-6"
							}, [(openBlock(), createBlock(Fragment, null, renderList(3, (n) => {
								return createVNode("div", {
									key: n,
									class: "glass-card p-6 animate-pulse"
								}, [createVNode("div", { class: "flex items-center gap-4" }, [createVNode("div", { class: "w-16 h-16 rounded-full bg-arbor-charcoal/60 shrink-0" }), createVNode("div", { class: "flex-1 space-y-2" }, [createVNode("div", { class: "h-4 bg-arbor-charcoal/60 rounded w-2/3" }), createVNode("div", { class: "h-3 bg-arbor-charcoal/60 rounded w-1/2" })])])]);
							}), 64))])) : featuredCreators.value.length > 0 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "grid grid-cols-1 lg:grid-cols-3 gap-6"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(featuredCreators.value, (creator) => {
								return openBlock(), createBlock(_sfc_main$1, {
									key: creator.id,
									creator,
									"featured-sound": creator.featured_sound
								}, null, 8, ["creator", "featured-sound"]);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 2,
								class: "text-center py-16"
							}, [
								createVNode("div", { class: "w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4" }, [(openBlock(), createBlock("svg", {
									class: "w-8 h-8 text-arbor-moss/40",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1",
									d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
								})]))]),
								createVNode("h3", { class: "font-display text-lg text-arbor-cream mb-2" }, "Les pionniers de l'écoute"),
								createVNode("p", { class: "text-arbor-sage max-w-sm mx-auto mb-6" }, " Les premiers créateurs rejoindront bientôt l'archive. Devenez l'un d'entre eux et faites entendre votre territoire. "),
								createVNode(unref(Link), {
									href: "/register",
									class: "btn-primary inline-flex items-center gap-2"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
									})])), createTextVNode(" Rejoindre la communauté ")]),
									_: 1
								})
							])),
							featuredCreators.value.length > 0 ? (openBlock(), createBlock("div", {
								key: 3,
								class: "text-center mt-10"
							}, [createVNode(unref(Link), {
								href: "/creators",
								class: "btn-secondary inline-flex items-center gap-2 group"
							}, {
								default: withCtx(() => [createTextVNode(" Voir tous les créateurs "), (openBlock(), createBlock("svg", {
									class: "w-4 h-4 transition-transform group-hover:translate-x-1",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 8l4 4m0 0l-4 4m4-4H3"
								})]))]),
								_: 1
							})])) : createCommentVNode("", true)
						])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [createVNode("div", { class: "glass-card-glow p-12 relative overflow-hidden" }, [
							createVNode("div", { class: "absolute top-0 right-0 w-64 h-64 bg-arbor-moss/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" }),
							createVNode("div", { class: "organic-blob w-48 h-48 bg-arbor-emerald/20 -top-10 -right-10" }),
							createVNode("div", { class: "relative z-10" }, [
								createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-arbor-emerald/20 mb-6 animate-glow-pulse" }, [createVNode("span", { class: "text-2xl font-display font-bold text-arbor-emerald" }, "E")]),
								createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream mb-4" }, " Soutenez avec ECHO "),
								createVNode("p", { class: "text-arbor-sage mb-8 max-w-lg mx-auto leading-relaxed" }, " Les crédits ECHO vous permettent de soutenir directement les créateurs qui capturent et partagent les sons de la nature. Un geste simple, un impact réel. "),
								createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-4" }, [createVNode(unref(Link), {
									href: "/echo",
									class: "btn-primary"
								}, {
									default: withCtx(() => [createTextVNode(" Découvrir ECHO ")]),
									_: 1
								}), createVNode("span", { class: "text-xs text-arbor-sage" }, " Pas une cryptomonnaie. Pas un investissement. ")])
							])
						])])]),
						createVNode("section", { class: "py-24 bg-arbor-deep/30 border-y border-arbor-glass-border" }, [createVNode("div", { class: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [createVNode("div", {
							ref: "missionTitle.elementRef",
							style: unref(missionTitle).style.value
						}, [
							createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream mb-6" }, " Préserver l'écoute du monde vivant "),
							createVNode("p", { class: "text-arbor-sage leading-relaxed mb-8" }, " Arborisis naît d'une conviction : les paysages sonores naturels sont un patrimoine fragile méritant d'être documenté, partagé et protégé. En donnant une voix aux espaces silencieux, nous espérons susciter une écologie de l'attention et une reconnaissance envers ceux qui consacrent leur temps à capturer ces instants éphémères. "),
							createVNode("div", { class: "flex items-center justify-center gap-2 text-arbor-emerald text-sm" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							})])), createVNode("span", null, "Respect de la nature. Confidentialité des lieux sensibles. Transparence.")])
						], 4)])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [
							createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6" }, " Rejoignez la communauté "),
							createVNode("p", { class: "text-arbor-sage mb-10 max-w-xl mx-auto" }, " Créez votre profil, publiez vos premiers enregistrements et connectez-vous avec d'autres passionnés de sons naturels. "),
							createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-4" }, [createVNode(unref(Link), {
								href: "/register",
								class: "btn-primary text-base px-8 py-4"
							}, {
								default: withCtx(() => [createTextVNode(" Créer un compte gratuit ")]),
								_: 1
							}), createVNode(unref(Link), {
								href: "/login",
								class: "btn-secondary text-base px-8 py-4"
							}, {
								default: withCtx(() => [createTextVNode(" J'ai déjà un compte ")]),
								_: 1
							})])
						])])
					];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Landing.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
