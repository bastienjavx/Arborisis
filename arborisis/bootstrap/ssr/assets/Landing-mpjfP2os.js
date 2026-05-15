import { t as _sfc_main$2 } from "./GuestLayout-zlBIN9S_.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createTextVNode, createVNode, defineAsyncComponent, mergeProps, onMounted, onUnmounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import * as THREE from "three";
//#region resources/js/Components/Three/ParticleField.vue
var _sfc_main$1 = {
	__name: "ParticleField",
	__ssrInlineRender: true,
	setup(__props) {
		const canvasContainer = ref(null);
		let renderer, scene, camera, particles, animationId;
		let clock = new THREE.Clock();
		const COLORS = [
			3462041,
			4876097,
			9414286,
			13935988
		];
		onMounted(() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (!canvasContainer.value) return;
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
			const particleCount = 60;
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
				const elapsed = clock.getElapsedTime();
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
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Three/ParticleField.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Landing.vue
var _sfc_main = {
	__name: "Landing",
	__ssrInlineRender: true,
	props: { stats: Object },
	setup(__props) {
		const SoundMap = defineAsyncComponent(() => import("./SoundMap-CYNMu_oP.js"));
		const props = __props;
		const features = ref([
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
		const mapSounds = ref([]);
		const mapLoading = ref(true);
		const mapError = ref(false);
		const animatedStats = ref({
			sounds: 0,
			creators: 0,
			countries: 0
		});
		const statsVisible = ref(false);
		let statsObserver = null;
		const prefersReducedMotion = ref(false);
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
		onMounted(() => {
			prefersReducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			loadMapSounds();
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
			_push(ssrRenderComponent(unref(Head), { title: "Accueil" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<section class="relative min-h-screen flex items-center justify-center overflow-hidden"${_scopeId}><img src="/images/hero-leaf.webp" alt="" class="absolute inset-0 w-full h-full object-cover animate-ken-burns" style="${ssrRenderStyle({ "filter": "brightness(0.55) contrast(1.15) saturate(0.8)" })}" fetchpriority="high" decoding="async"${_scopeId}><div class="absolute inset-0 bg-arbor-night/70"${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-t from-arbor-night via-transparent to-arbor-night/40"${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-arbor-emerald/10 via-transparent to-arbor-night/60"${_scopeId}></div><div class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle({ "background": "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(2, 15, 8, 0.7) 100%)" })}"${_scopeId}></div><div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style="${ssrRenderStyle({
							"background-image": "url('data:image/svg+xml,%3Csvg viewBox=%220 0 512 512%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%225%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
							"background-repeat": "repeat"
						})}"${_scopeId}></div><div class="absolute inset-0 bg-hero-glow opacity-40"${_scopeId}></div>`);
						_push(ssrRenderComponent(_sfc_main$1, null, null, _parent, _scopeId));
						_push(`<div class="absolute inset-0 opacity-[0.02] pointer-events-none" style="${ssrRenderStyle({ "background": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)" })}"${_scopeId}></div><div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-arbor-cream leading-tight mb-6 animate-slide-up"${_scopeId}> L&#39;archive sonore<br${_scopeId}><span class="text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss"${_scopeId}>de la nature</span></h1><p class="text-lg sm:text-xl text-arbor-sage max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}"${_scopeId}> Découvrez, partagez et préservez les sons du monde vivant. Une plateforme pour les field recorders et les rêveurs d&#39;espaces sauvages. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}"${_scopeId}>`);
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
							href: "/register",
							class: "btn-secondary text-base px-8 py-4 w-full sm:w-auto group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg> Publier un son `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 mr-2 transition-transform group-hover:scale-110",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
								})])), createTextVNode(" Publier un son ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"${_scopeId}><svg class="w-6 h-6 text-arbor-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"${_scopeId}></path></svg></div></section><section id="stats-section" class="py-20 border-y border-arbor-glass-border bg-arbor-deep/50"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-3 gap-8"${_scopeId}><div class="text-center group"${_scopeId}><div class="font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110"${_scopeId}>${ssrInterpolate(animatedStats.value.sounds)}+ </div><div class="text-arbor-sage text-sm"${_scopeId}>Sons naturels</div></div><div class="text-center group"${_scopeId}><div class="font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110"${_scopeId}>${ssrInterpolate(animatedStats.value.creators)}+ </div><div class="text-arbor-sage text-sm"${_scopeId}>Créateurs</div></div><div class="text-center group"${_scopeId}><div class="font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110"${_scopeId}>${ssrInterpolate(animatedStats.value.countries)}+ </div><div class="text-arbor-sage text-sm"${_scopeId}>Pays</div></div></div></div></section><section class="py-24"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="text-center mb-16"${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4"${_scopeId}> Une expérience sonore unique </h2><p class="text-arbor-sage max-w-xl mx-auto"${_scopeId}> Arborisis combine cartographie interactive, lecture haute-fidélité et communauté passionnée. </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"${_scopeId}><!--[-->`);
						ssrRenderList(features.value, (feature, index) => {
							_push(`<div class="${ssrRenderClass([`stagger-${index + 1}`, "glass-card p-8 hover:bg-white/10 transition-all duration-300 group hover-lift"])}" style="${ssrRenderStyle({
								"animation": "fadeInUp 0.6s ease-out forwards",
								"animation-delay": "${index * 0.15}s",
								"opacity": "0"
							})}"${_scopeId}><div class="w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mb-6 group-hover:bg-arbor-moss/30 transition-colors group-hover:scale-110 duration-300"${_scopeId}><svg class="w-6 h-6 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", feature.icon)}${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-arbor-cream mb-3"${_scopeId}>${ssrInterpolate(feature.title)}</h3><p class="text-arbor-sage text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(feature.description)}</p></div>`);
						});
						_push(`<!--]--></div></div></section><section class="py-24 bg-arbor-deep/30"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"${_scopeId}><div${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6"${_scopeId}> Explorez le monde<br${_scopeId}>à travers le son </h2><p class="text-arbor-sage mb-8 leading-relaxed"${_scopeId}> Chaque point sur la carte représente un moment capturé dans la nature : le chant d&#39;un oiseau à l&#39;aube, le murmure d&#39;une rivière, le vent dans les cimes. Naviguez, filtrez et plongez dans l&#39;acoustique des paysages. </p><div class="flex flex-wrap gap-3 mb-8"${_scopeId}><!--[-->`);
						ssrRenderList(categories.value, (cat) => {
							_push(`<span class="${ssrRenderClass([cat.color, "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 cursor-default"])}"${_scopeId}>${ssrInterpolate(cat.name)}</span>`);
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
						_push(`</div><div class="glass-card aspect-[4/3] relative overflow-hidden rounded-2xl border border-arbor-glass-border hover-lift"${_scopeId}>`);
						if (mapLoading.value) _push(`<div class="absolute inset-0 flex flex-col items-center justify-center bg-arbor-deep/80 z-10"${_scopeId}><div class="w-10 h-10 border-2 border-arbor-emerald/30 border-t-arbor-emerald rounded-full animate-spin mb-4"${_scopeId}></div><p class="text-arbor-sage text-sm"${_scopeId}>Chargement de la carte...</p></div>`);
						else _push(ssrRenderComponent(unref(SoundMap), {
							sounds: mapSounds.value,
							"initial-zoom": 2,
							"initial-center": [25, 10]
						}, null, _parent, _scopeId));
						_push(`<div class="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5"${_scopeId}></div></div></div></div></section><section class="py-24"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><div class="glass-card p-12 relative overflow-hidden hover-lift"${_scopeId}><div class="absolute top-0 right-0 w-64 h-64 bg-arbor-moss/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"${_scopeId}></div><div class="relative z-10"${_scopeId}><div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-arbor-emerald/20 mb-6 animate-glow-pulse"${_scopeId}><span class="text-2xl font-display font-bold text-arbor-emerald"${_scopeId}>E</span></div><h2 class="font-display text-3xl font-bold text-arbor-cream mb-4"${_scopeId}> Soutenez avec ECHO </h2><p class="text-arbor-sage mb-8 max-w-lg mx-auto leading-relaxed"${_scopeId}> Les crédits ECHO vous permettent de soutenir directement les créateurs qui capturent et partagent les sons de la nature. Un geste simple, un impact réel. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"${_scopeId}>`);
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
						_push(`<span class="text-xs text-arbor-sage"${_scopeId}> Pas une cryptomonnaie. Pas un investissement. </span></div></div></div></div></section><section class="py-24 bg-arbor-deep/30 border-y border-arbor-glass-border"${_scopeId}><div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream mb-6"${_scopeId}> Préserver l&#39;écoute du monde vivant </h2><p class="text-arbor-sage leading-relaxed mb-8"${_scopeId}> Arborisis naît d&#39;une conviction : les paysages sonores naturels sont un patrimoine fragile méritant d&#39;être documenté, partagé et protégé. En donnant une voix aux espaces silencieux, nous espérons susciter une écologie de l&#39;attention et une reconnaissance envers ceux qui consacrent leur temps à capturer ces instants éphémères. </p><div class="flex items-center justify-center gap-2 text-arbor-emerald text-sm"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"${_scopeId}></path></svg><span${_scopeId}>Respect de la nature. Confidentialité des lieux sensibles. Transparence.</span></div></div></section><section class="py-24"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"${_scopeId}><h2 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6"${_scopeId}> Rejoignez la communauté </h2><p class="text-arbor-sage mb-10 max-w-xl mx-auto"${_scopeId}> Créez votre profil, publiez vos premiers enregistrements et connectez-vous avec d&#39;autres passionnés de sons naturels. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"${_scopeId}>`);
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
						createVNode("section", { class: "relative min-h-screen flex items-center justify-center overflow-hidden" }, [
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
							createVNode("div", { class: "absolute inset-0 bg-hero-glow opacity-40" }),
							createVNode(_sfc_main$1),
							createVNode("div", {
								class: "absolute inset-0 opacity-[0.02] pointer-events-none",
								style: { "background": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)" }
							}),
							createVNode("div", { class: "relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [
								createVNode("h1", { class: "font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-arbor-cream leading-tight mb-6 animate-slide-up" }, [
									createTextVNode(" L'archive sonore"),
									createVNode("br"),
									createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss" }, "de la nature")
								]),
								createVNode("p", {
									class: "text-lg sm:text-xl text-arbor-sage max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up",
									style: { "animation-delay": "0.1s" }
								}, " Découvrez, partagez et préservez les sons du monde vivant. Une plateforme pour les field recorders et les rêveurs d'espaces sauvages. "),
								createVNode("div", {
									class: "flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up",
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
									href: "/register",
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
										d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
									})])), createTextVNode(" Publier un son ")]),
									_: 1
								})])
							]),
							createVNode("div", { class: "absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" }, [(openBlock(), createBlock("svg", {
								class: "w-6 h-6 text-arbor-sage",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M19 14l-7 7m0 0l-7-7m7 7V3"
							})]))])
						]),
						createVNode("section", {
							id: "stats-section",
							class: "py-20 border-y border-arbor-glass-border bg-arbor-deep/50"
						}, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-8" }, [
							createVNode("div", { class: "text-center group" }, [createVNode("div", { class: "font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110" }, toDisplayString(animatedStats.value.sounds) + "+ ", 1), createVNode("div", { class: "text-arbor-sage text-sm" }, "Sons naturels")]),
							createVNode("div", { class: "text-center group" }, [createVNode("div", { class: "font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110" }, toDisplayString(animatedStats.value.creators) + "+ ", 1), createVNode("div", { class: "text-arbor-sage text-sm" }, "Créateurs")]),
							createVNode("div", { class: "text-center group" }, [createVNode("div", { class: "font-display text-4xl font-bold text-arbor-emerald mb-2 transition-transform duration-300 group-hover:scale-110" }, toDisplayString(animatedStats.value.countries) + "+ ", 1), createVNode("div", { class: "text-arbor-sage text-sm" }, "Pays")])
						])])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "text-center mb-16" }, [createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4" }, " Une expérience sonore unique "), createVNode("p", { class: "text-arbor-sage max-w-xl mx-auto" }, " Arborisis combine cartographie interactive, lecture haute-fidélité et communauté passionnée. ")]), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-8" }, [(openBlock(true), createBlock(Fragment, null, renderList(features.value, (feature, index) => {
							return openBlock(), createBlock("div", {
								key: feature.title,
								class: ["glass-card p-8 hover:bg-white/10 transition-all duration-300 group hover-lift", `stagger-${index + 1}`],
								style: {
									"animation": "fadeInUp 0.6s ease-out forwards",
									"animation-delay": "${index * 0.15}s",
									"opacity": "0"
								}
							}, [
								createVNode("div", { class: "w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mb-6 group-hover:bg-arbor-moss/30 transition-colors group-hover:scale-110 duration-300" }, [(openBlock(), createBlock("svg", {
									class: "w-6 h-6 text-arbor-emerald",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: feature.icon
								}, null, 8, ["d"])]))]),
								createVNode("h3", { class: "text-lg font-semibold text-arbor-cream mb-3" }, toDisplayString(feature.title), 1),
								createVNode("p", { class: "text-arbor-sage text-sm leading-relaxed" }, toDisplayString(feature.description), 1)
							], 2);
						}), 128))])])]),
						createVNode("section", { class: "py-24 bg-arbor-deep/30" }, [createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" }, [createVNode("div", null, [
							createVNode("h2", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-6" }, [
								createTextVNode(" Explorez le monde"),
								createVNode("br"),
								createTextVNode("à travers le son ")
							]),
							createVNode("p", { class: "text-arbor-sage mb-8 leading-relaxed" }, " Chaque point sur la carte représente un moment capturé dans la nature : le chant d'un oiseau à l'aube, le murmure d'une rivière, le vent dans les cimes. Naviguez, filtrez et plongez dans l'acoustique des paysages. "),
							createVNode("div", { class: "flex flex-wrap gap-3 mb-8" }, [(openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
								return openBlock(), createBlock("span", {
									key: cat.name,
									class: ["px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 cursor-default", cat.color]
								}, toDisplayString(cat.name), 3);
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
						]), createVNode("div", { class: "glass-card aspect-[4/3] relative overflow-hidden rounded-2xl border border-arbor-glass-border hover-lift" }, [mapLoading.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "absolute inset-0 flex flex-col items-center justify-center bg-arbor-deep/80 z-10"
						}, [createVNode("div", { class: "w-10 h-10 border-2 border-arbor-emerald/30 border-t-arbor-emerald rounded-full animate-spin mb-4" }), createVNode("p", { class: "text-arbor-sage text-sm" }, "Chargement de la carte...")])) : (openBlock(), createBlock(unref(SoundMap), {
							key: 1,
							sounds: mapSounds.value,
							"initial-zoom": 2,
							"initial-center": [25, 10]
						}, null, 8, ["sounds"])), createVNode("div", { class: "absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5" })])])])]),
						createVNode("section", { class: "py-24" }, [createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [createVNode("div", { class: "glass-card p-12 relative overflow-hidden hover-lift" }, [createVNode("div", { class: "absolute top-0 right-0 w-64 h-64 bg-arbor-moss/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" }), createVNode("div", { class: "relative z-10" }, [
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
						])])])]),
						createVNode("section", { class: "py-24 bg-arbor-deep/30 border-y border-arbor-glass-border" }, [createVNode("div", { class: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, [
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
						])]),
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
