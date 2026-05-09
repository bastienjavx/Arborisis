import { t as _sfc_main$1 } from "./AuthenticatedLayout-CVogD1xR.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, onMounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Dashboard.vue
var _sfc_main = {
	__name: "Dashboard",
	__ssrInlineRender: true,
	props: {
		stats: {
			type: Object,
			default: () => ({
				totalSounds: 0,
				totalPlays: 0,
				totalLikes: 0,
				totalFollowers: 0
			})
		},
		recentSounds: {
			type: Array,
			default: () => []
		},
		activities: {
			type: Array,
			default: () => []
		},
		echoBalance: {
			type: Number,
			default: 0
		}
	},
	setup(__props) {
		const props = __props;
		const waveformBars = ref(48);
		const greeting = computed(() => {
			const hour = (/* @__PURE__ */ new Date()).getHours();
			if (hour < 6) return "Bonne nuit";
			if (hour < 12) return "Bon matin";
			if (hour < 18) return "Bon après-midi";
			return "Bonsoir";
		});
		const animatedStats = ref({
			totalSounds: 0,
			totalPlays: 0,
			totalLikes: 0,
			totalFollowers: 0
		});
		const statsAnimated = ref(false);
		const animateCount = (target, key, duration = 1200) => {
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
			setTimeout(() => {
				statsAnimated.value = true;
				animateCount(props.stats.totalSounds, "totalSounds");
				animateCount(props.stats.totalPlays, "totalPlays");
				animateCount(props.stats.totalLikes, "totalLikes");
				animateCount(props.stats.totalFollowers, "totalFollowers");
			}, 300);
		});
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
		};
		const formatDate = (dateString) => {
			if (!dateString) return null;
			const date = new Date(dateString);
			const diff = Math.floor((/* @__PURE__ */ new Date() - date) / 1e3);
			if (diff < 60) return "À l'instant";
			if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
			if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`;
			if (diff < 604800) return `Il y a ${Math.floor(diff / 86400)} j`;
			return date.toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "short"
			});
		};
		const formatNumber = (num) => {
			if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
			if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
			return num.toString();
		};
		const quickActions = computed(() => {
			const actions = [
				{
					label: "Nouvel enregistrement",
					description: "Publier un son",
					href: "/sounds/create",
					icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
					color: "emerald"
				},
				{
					label: "Explorer la carte",
					description: "Découvrir des sons",
					href: "/map",
					icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m0 0L9 7",
					color: "moss"
				},
				{
					label: "Mon profil",
					description: "Gérer mon compte",
					href: "/profile",
					icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
					color: "sage"
				}
			];
			const latestSound = props.recentSounds[0];
			if (latestSound) actions.unshift({
				label: "Analyser mon dernier son",
				description: latestSound.title,
				href: route("sounds.analysis.show", latestSound.id),
				icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
				color: "amber"
			});
			return actions;
		});
		const getActivityIcon = (type) => {
			const icons = {
				like: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
				play: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
				follow: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
				comment: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
			};
			return icons[type] || icons.play;
		};
		const getActivityColor = (type) => {
			const colors = {
				like: "text-rose-400 bg-rose-400/15",
				play: "text-arbor-emerald bg-arbor-emerald/15",
				follow: "text-arbor-amber bg-arbor-amber/15",
				comment: "text-sky-400 bg-sky-400/15"
			};
			return colors[type] || colors.play;
		};
		const getMiniWaveform = (seed) => {
			return Array.from({ length: 12 }, (_, i) => {
				const base = 20 + Math.abs(Math.sin(seed + i * .8)) * 60;
				return Math.max(8, Math.min(100, base));
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Studio" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hero-glow opacity-40"${_scopeId}></div><div class="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center gap-[3px] opacity-10 px-8"${_scopeId}><!--[-->`);
						ssrRenderList(waveformBars.value, (i) => {
							_push(`<div class="w-[3px] bg-arbor-emerald rounded-full origin-bottom" style="${ssrRenderStyle([{
								height: `${20 + Math.random() * 80}%`,
								animationDelay: `${i * .05}s`,
								animationDuration: `${.8 + Math.random() * .6}s`
							}, { "animation": "wave 1.2s ease-in-out infinite" }])}"${_scopeId}></div>`);
						});
						_push(`<!--]--></div><div class="absolute inset-0 opacity-[0.015]" style="${ssrRenderStyle({
							"background-image": "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
							"background-repeat": "repeat"
						})}"${_scopeId}></div></div><div class="relative z-10"${_scopeId}><section class="pt-24 pb-12 section-padding"${_scopeId}><div class="max-w-7xl mx-auto"${_scopeId}><div class="animate-fade-in"${_scopeId}><div class="mb-2"${_scopeId}><span class="text-arbor-sage text-sm font-medium tracking-wide uppercase"${_scopeId}>${ssrInterpolate(greeting.value)}</span></div><h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-arbor-cream leading-tight mb-4"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)}</h1><p class="text-arbor-sage text-lg max-w-xl leading-relaxed"${_scopeId}> Bienvenue dans votre studio. Voici ce qui se passe avec vos enregistrements. </p></div></div></section><section class="pb-12 section-padding"${_scopeId}><div class="max-w-7xl mx-auto"${_scopeId}><div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"${_scopeId}><div class="stat-card group"${_scopeId}><div class="flex items-center gap-3 mb-4"${_scopeId}><div class="w-10 h-10 rounded-xl bg-arbor-emerald/15 flex items-center justify-center transition-transform group-hover:scale-110"${_scopeId}><svg class="w-5 h-5 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><span class="text-arbor-sage text-xs font-medium uppercase tracking-wider"${_scopeId}>Enregistrements</span></div><div class="animate-count-up"${_scopeId}><span class="font-display text-3xl lg:text-4xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(formatNumber(animatedStats.value.totalSounds))}</span></div></div><div class="stat-card group"${_scopeId}><div class="flex items-center gap-3 mb-4"${_scopeId}><div class="w-10 h-10 rounded-xl bg-arbor-moss/20 flex items-center justify-center transition-transform group-hover:scale-110"${_scopeId}><svg class="w-5 h-5 text-arbor-moss-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><span class="text-arbor-sage text-xs font-medium uppercase tracking-wider"${_scopeId}>Écoutes</span></div><div class="animate-count-up"${_scopeId}><span class="font-display text-3xl lg:text-4xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(formatNumber(animatedStats.value.totalPlays))}</span></div></div><div class="stat-card group"${_scopeId}><div class="flex items-center gap-3 mb-4"${_scopeId}><div class="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center transition-transform group-hover:scale-110"${_scopeId}><svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"${_scopeId}></path></svg></div><span class="text-arbor-sage text-xs font-medium uppercase tracking-wider"${_scopeId}>J&#39;aime</span></div><div class="animate-count-up"${_scopeId}><span class="font-display text-3xl lg:text-4xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(formatNumber(animatedStats.value.totalLikes))}</span></div></div><div class="stat-card group"${_scopeId}><div class="flex items-center gap-3 mb-4"${_scopeId}><div class="w-10 h-10 rounded-xl bg-arbor-amber/15 flex items-center justify-center transition-transform group-hover:scale-110"${_scopeId}><svg class="w-5 h-5 text-arbor-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div><span class="text-arbor-sage text-xs font-medium uppercase tracking-wider"${_scopeId}>Abonnés</span></div><div class="animate-count-up"${_scopeId}><span class="font-display text-3xl lg:text-4xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(formatNumber(animatedStats.value.totalFollowers))}</span></div></div></div></div></section><section class="pb-24 section-padding"${_scopeId}><div class="max-w-7xl mx-auto"${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 space-y-8"${_scopeId}><div class="glass-card p-6 lg:p-8"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h2 class="font-display text-2xl font-semibold text-arbor-cream"${_scopeId}> Vos enregistrements </h2><p class="text-arbor-sage text-sm mt-1"${_scopeId}> Les sons que vous avez partagés avec la communauté </p></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/sounds/create",
							class: "btn-primary text-sm px-4 py-2"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Publier `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-4 h-4 mr-2",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M12 4v16m8-8H4"
								})])), createTextVNode(" Publier ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						if (__props.recentSounds.length > 0) {
							_push(`<div${_scopeId}><div class="space-y-4"${_scopeId}><!--[-->`);
							ssrRenderList(__props.recentSounds.slice(0, 5), (sound, index) => {
								_push(ssrRenderComponent(unref(Link), {
									key: sound.id,
									href: _ctx.route("sounds.show", sound.slug),
									class: "flex items-center gap-4 p-4 rounded-xl bg-arbor-charcoal/50 border border-arbor-fog/50 hover:border-arbor-moss/50 hover:bg-arbor-charcoal transition-all duration-300 group",
									style: `animation: slideInRight 0.4s ease-out forwards; animation-delay: ${index * .08}s; opacity: 0;`
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-arbor-deep"${_scopeId}>`);
											if (sound.cover_url) _push(`<div class="absolute inset-0 bg-cover bg-center" style="${ssrRenderStyle(`background-image: url(${sound.cover_url})`)}"${_scopeId}></div>`);
											else _push(`<div class="absolute inset-0 flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div>`);
											_push(`<div class="sound-card-overlay rounded-xl"${_scopeId}><div class="w-8 h-8 rounded-full bg-arbor-emerald/90 flex items-center justify-center"${_scopeId}><svg class="w-4 h-4 text-arbor-night ml-0.5" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M8 5v14l11-7z"${_scopeId}></path></svg></div></div></div><div class="flex-1 min-w-0"${_scopeId}><h3 class="font-medium text-arbor-cream truncate group-hover:text-arbor-emerald transition-colors"${_scopeId}>${ssrInterpolate(sound.title)}</h3><p class="text-sm text-arbor-sage truncate"${_scopeId}>${ssrInterpolate(sound.category?.name || "Sans catégorie")}</p></div><div class="hidden sm:flex items-end gap-[2px] h-6 opacity-40 group-hover:opacity-70 transition-opacity"${_scopeId}><!--[-->`);
											ssrRenderList(getMiniWaveform(sound.id), (h, i) => {
												_push(`<div class="w-[2px] bg-arbor-emerald rounded-full" style="${ssrRenderStyle({ height: `${h}%` })}"${_scopeId}></div>`);
											});
											_push(`<!--]--></div><div class="hidden sm:flex items-center gap-4 text-sm text-arbor-sage shrink-0"${_scopeId}><span class="flex items-center gap-1.5"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> ${ssrInterpolate(formatNumber(sound.play_count || 0))}</span><span class="flex items-center gap-1.5"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"${_scopeId}></path></svg> ${ssrInterpolate(formatNumber(sound.like_count || 0))}</span><span class="text-xs"${_scopeId}>${ssrInterpolate(formatDuration(sound.duration))}</span></div>`);
										} else return [
											createVNode("div", { class: "relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-arbor-deep" }, [sound.cover_url ? (openBlock(), createBlock("div", {
												key: 0,
												class: "absolute inset-0 bg-cover bg-center",
												style: `background-image: url(${sound.cover_url})`
											}, null, 4)) : (openBlock(), createBlock("div", {
												key: 1,
												class: "absolute inset-0 flex items-center justify-center"
											}, [(openBlock(), createBlock("svg", {
												class: "w-6 h-6 text-arbor-moss/40",
												fill: "none",
												stroke: "currentColor",
												viewBox: "0 0 24 24"
											}, [createVNode("path", {
												"stroke-linecap": "round",
												"stroke-linejoin": "round",
												"stroke-width": "1",
												d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
											})]))])), createVNode("div", { class: "sound-card-overlay rounded-xl" }, [createVNode("div", { class: "w-8 h-8 rounded-full bg-arbor-emerald/90 flex items-center justify-center" }, [(openBlock(), createBlock("svg", {
												class: "w-4 h-4 text-arbor-night ml-0.5",
												fill: "currentColor",
												viewBox: "0 0 24 24"
											}, [createVNode("path", { d: "M8 5v14l11-7z" })]))])])]),
											createVNode("div", { class: "flex-1 min-w-0" }, [createVNode("h3", { class: "font-medium text-arbor-cream truncate group-hover:text-arbor-emerald transition-colors" }, toDisplayString(sound.title), 1), createVNode("p", { class: "text-sm text-arbor-sage truncate" }, toDisplayString(sound.category?.name || "Sans catégorie"), 1)]),
											createVNode("div", { class: "hidden sm:flex items-end gap-[2px] h-6 opacity-40 group-hover:opacity-70 transition-opacity" }, [(openBlock(true), createBlock(Fragment, null, renderList(getMiniWaveform(sound.id), (h, i) => {
												return openBlock(), createBlock("div", {
													key: i,
													class: "w-[2px] bg-arbor-emerald rounded-full",
													style: { height: `${h}%` }
												}, null, 4);
											}), 128))]),
											createVNode("div", { class: "hidden sm:flex items-center gap-4 text-sm text-arbor-sage shrink-0" }, [
												createVNode("span", { class: "flex items-center gap-1.5" }, [(openBlock(), createBlock("svg", {
													class: "w-4 h-4",
													fill: "none",
													stroke: "currentColor",
													viewBox: "0 0 24 24"
												}, [createVNode("path", {
													"stroke-linecap": "round",
													"stroke-linejoin": "round",
													"stroke-width": "2",
													d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												})])), createTextVNode(" " + toDisplayString(formatNumber(sound.play_count || 0)), 1)]),
												createVNode("span", { class: "flex items-center gap-1.5" }, [(openBlock(), createBlock("svg", {
													class: "w-4 h-4",
													fill: "none",
													stroke: "currentColor",
													viewBox: "0 0 24 24"
												}, [createVNode("path", {
													"stroke-linecap": "round",
													"stroke-linejoin": "round",
													"stroke-width": "2",
													d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
												})])), createTextVNode(" " + toDisplayString(formatNumber(sound.like_count || 0)), 1)]),
												createVNode("span", { class: "text-xs" }, toDisplayString(formatDuration(sound.duration)), 1)
											])
										];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
						} else {
							_push(`<div class="text-center py-16"${_scopeId}><div class="w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110"${_scopeId}><svg class="w-8 h-8 text-arbor-moss/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><h3 class="font-display text-xl text-arbor-cream mb-2"${_scopeId}>Aucun enregistrement</h3><p class="text-arbor-sage text-sm mb-6"${_scopeId}>Partagez votre premier son naturel avec la communauté.</p>`);
							_push(ssrRenderComponent(unref(Link), {
								href: "/sounds/create",
								class: "btn-primary"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Publier un son `);
									else return [createTextVNode(" Publier un son ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						}
						_push(`</div><div class="glass-card p-6 lg:p-8"${_scopeId}><h2 class="font-display text-2xl font-semibold text-arbor-cream mb-6"${_scopeId}> Activité récente </h2>`);
						if (__props.activities.length > 0) {
							_push(`<div class="space-y-4"${_scopeId}><!--[-->`);
							ssrRenderList(__props.activities.slice(0, 6), (activity, index) => {
								_push(`<div class="flex items-start gap-4 p-4 rounded-xl hover:bg-arbor-charcoal/30 transition-colors" style="${ssrRenderStyle(`animation: slideInRight 0.4s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`)}"${_scopeId}><div class="${ssrRenderClass([getActivityColor(activity.type), "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform hover:scale-110"])}"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", getActivityIcon(activity.type))}${_scopeId}></path></svg></div><div class="flex-1 min-w-0"${_scopeId}><p class="text-arbor-cream text-sm"${_scopeId}><span class="font-medium"${_scopeId}>${ssrInterpolate(activity.user?.name)}</span> ${ssrInterpolate(activity.description)}</p><p class="text-arbor-sage text-xs mt-1"${_scopeId}>${ssrInterpolate(formatDate(activity.created_at))}</p></div></div>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<div class="text-center py-12"${_scopeId}><p class="text-arbor-sage text-sm"${_scopeId}>Aucune activité récente à afficher.</p></div>`);
						_push(`</div></div><div class="space-y-8"${_scopeId}><div class="glass-card p-6 relative overflow-hidden"${_scopeId}><div class="absolute top-0 right-0 w-32 h-32 bg-arbor-amber/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"${_scopeId}></div><div class="relative z-10"${_scopeId}><div class="flex items-center gap-2 mb-4"${_scopeId}><div class="w-8 h-8 rounded-lg bg-arbor-amber/20 flex items-center justify-center"${_scopeId}><span class="font-mono text-sm font-medium text-arbor-amber"${_scopeId}>E</span></div><span class="text-arbor-sage text-xs font-medium uppercase tracking-wider"${_scopeId}>Solde ECHO</span></div><div class="font-mono text-3xl font-medium text-arbor-amber mb-2 relative"${_scopeId}>${ssrInterpolate(__props.echoBalance.toLocaleString("fr-FR"))} `);
						if (__props.echoBalance > 0) _push(`<div class="absolute inset-0 shimmer-text opacity-20 pointer-events-none"${_scopeId}></div>`);
						else _push(`<!---->`);
						_push(`</div><p class="text-arbor-sage text-xs"${_scopeId}> Crédits disponibles </p><div class="mt-4 pt-4 border-t border-arbor-glass-border"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/wallet",
							class: "text-arbor-amber text-sm hover:underline inline-flex items-center gap-1 group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Voir l&#39;historique <svg class="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
								else return [createTextVNode(" Voir l'historique "), (openBlock(), createBlock("svg", {
									class: "w-3 h-3 transition-transform group-hover:translate-x-0.5",
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
						_push(`</div></div></div><div class="glass-card p-6"${_scopeId}><h3 class="font-display text-lg font-semibold text-arbor-cream mb-4"${_scopeId}> Actions rapides </h3><div class="space-y-3"${_scopeId}><!--[-->`);
						ssrRenderList(quickActions.value, (action) => {
							_push(ssrRenderComponent(unref(Link), {
								key: action.label,
								href: action.href,
								class: "flex items-center gap-4 p-3 rounded-xl hover:bg-arbor-charcoal/50 transition-colors group"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<div class="${ssrRenderClass([{
										"bg-arbor-emerald/15 text-arbor-emerald": action.color === "emerald",
										"bg-arbor-moss/20 text-arbor-moss-light": action.color === "moss",
										"bg-arbor-sage/15 text-arbor-sage": action.color === "sage"
									}, "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"])}"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", action.icon)}${_scopeId}></path></svg></div><div${_scopeId}><div class="text-arbor-cream text-sm font-medium group-hover:text-arbor-emerald transition-colors"${_scopeId}>${ssrInterpolate(action.label)}</div><div class="text-arbor-sage text-xs"${_scopeId}>${ssrInterpolate(action.description)}</div></div>`);
									else return [createVNode("div", { class: ["w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", {
										"bg-arbor-emerald/15 text-arbor-emerald": action.color === "emerald",
										"bg-arbor-moss/20 text-arbor-moss-light": action.color === "moss",
										"bg-arbor-sage/15 text-arbor-sage": action.color === "sage"
									}] }, [(openBlock(), createBlock("svg", {
										class: "w-5 h-5",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "1.5",
										d: action.icon
									}, null, 8, ["d"])]))], 2), createVNode("div", null, [createVNode("div", { class: "text-arbor-cream text-sm font-medium group-hover:text-arbor-emerald transition-colors" }, toDisplayString(action.label), 1), createVNode("div", { class: "text-arbor-sage text-xs" }, toDisplayString(action.description), 1)])];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]--></div></div><div class="glass-card p-6 bg-gradient-to-br from-arbor-moss/10 to-transparent hover-lift"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="w-8 h-8 rounded-lg bg-arbor-emerald/20 flex items-center justify-center shrink-0 mt-0.5"${_scopeId}><svg class="w-4 h-4 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><h4 class="text-arbor-cream text-sm font-medium mb-1"${_scopeId}>Astuce</h4><p class="text-arbor-sage text-xs leading-relaxed"${_scopeId}> Ajoutez une photo de couverture à vos enregistrements pour augmenter les écoutes de 40%. </p></div></div></div></div></div></div></section></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [
						createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hero-glow opacity-40" }),
						createVNode("div", { class: "absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center gap-[3px] opacity-10 px-8" }, [(openBlock(true), createBlock(Fragment, null, renderList(waveformBars.value, (i) => {
							return openBlock(), createBlock("div", {
								key: i,
								class: "w-[3px] bg-arbor-emerald rounded-full origin-bottom",
								style: [{
									height: `${20 + Math.random() * 80}%`,
									animationDelay: `${i * .05}s`,
									animationDuration: `${.8 + Math.random() * .6}s`
								}, { "animation": "wave 1.2s ease-in-out infinite" }]
							}, null, 4);
						}), 128))]),
						createVNode("div", {
							class: "absolute inset-0 opacity-[0.015]",
							style: {
								"background-image": "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
								"background-repeat": "repeat"
							}
						})
					]), createVNode("div", { class: "relative z-10" }, [
						createVNode("section", { class: "pt-24 pb-12 section-padding" }, [createVNode("div", { class: "max-w-7xl mx-auto" }, [createVNode("div", { class: "animate-fade-in" }, [
							createVNode("div", { class: "mb-2" }, [createVNode("span", { class: "text-arbor-sage text-sm font-medium tracking-wide uppercase" }, toDisplayString(greeting.value), 1)]),
							createVNode("h1", { class: "font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-arbor-cream leading-tight mb-4" }, toDisplayString(_ctx.$page.props.auth.user.name), 1),
							createVNode("p", { class: "text-arbor-sage text-lg max-w-xl leading-relaxed" }, " Bienvenue dans votre studio. Voici ce qui se passe avec vos enregistrements. ")
						])])]),
						createVNode("section", { class: "pb-12 section-padding" }, [createVNode("div", { class: "max-w-7xl mx-auto" }, [createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" }, [
							createVNode("div", { class: "stat-card group" }, [createVNode("div", { class: "flex items-center gap-3 mb-4" }, [createVNode("div", { class: "w-10 h-10 rounded-xl bg-arbor-emerald/15 flex items-center justify-center transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-emerald",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
							})]))]), createVNode("span", { class: "text-arbor-sage text-xs font-medium uppercase tracking-wider" }, "Enregistrements")]), createVNode("div", { class: "animate-count-up" }, [createVNode("span", { class: "font-display text-3xl lg:text-4xl font-semibold text-arbor-cream" }, toDisplayString(formatNumber(animatedStats.value.totalSounds)), 1)])]),
							createVNode("div", { class: "stat-card group" }, [createVNode("div", { class: "flex items-center gap-3 mb-4" }, [createVNode("div", { class: "w-10 h-10 rounded-xl bg-arbor-moss/20 flex items-center justify-center transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-moss-light",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							})]))]), createVNode("span", { class: "text-arbor-sage text-xs font-medium uppercase tracking-wider" }, "Écoutes")]), createVNode("div", { class: "animate-count-up" }, [createVNode("span", { class: "font-display text-3xl lg:text-4xl font-semibold text-arbor-cream" }, toDisplayString(formatNumber(animatedStats.value.totalPlays)), 1)])]),
							createVNode("div", { class: "stat-card group" }, [createVNode("div", { class: "flex items-center gap-3 mb-4" }, [createVNode("div", { class: "w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-rose-400",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							})]))]), createVNode("span", { class: "text-arbor-sage text-xs font-medium uppercase tracking-wider" }, "J'aime")]), createVNode("div", { class: "animate-count-up" }, [createVNode("span", { class: "font-display text-3xl lg:text-4xl font-semibold text-arbor-cream" }, toDisplayString(formatNumber(animatedStats.value.totalLikes)), 1)])]),
							createVNode("div", { class: "stat-card group" }, [createVNode("div", { class: "flex items-center gap-3 mb-4" }, [createVNode("div", { class: "w-10 h-10 rounded-xl bg-arbor-amber/15 flex items-center justify-center transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-amber",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
							})]))]), createVNode("span", { class: "text-arbor-sage text-xs font-medium uppercase tracking-wider" }, "Abonnés")]), createVNode("div", { class: "animate-count-up" }, [createVNode("span", { class: "font-display text-3xl lg:text-4xl font-semibold text-arbor-cream" }, toDisplayString(formatNumber(animatedStats.value.totalFollowers)), 1)])])
						])])]),
						createVNode("section", { class: "pb-24 section-padding" }, [createVNode("div", { class: "max-w-7xl mx-auto" }, [createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [createVNode("div", { class: "lg:col-span-2 space-y-8" }, [createVNode("div", { class: "glass-card p-6 lg:p-8" }, [createVNode("div", { class: "flex items-center justify-between mb-6" }, [createVNode("div", null, [createVNode("h2", { class: "font-display text-2xl font-semibold text-arbor-cream" }, " Vos enregistrements "), createVNode("p", { class: "text-arbor-sage text-sm mt-1" }, " Les sons que vous avez partagés avec la communauté ")]), createVNode(unref(Link), {
							href: "/sounds/create",
							class: "btn-primary text-sm px-4 py-2"
						}, {
							default: withCtx(() => [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 mr-2",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M12 4v16m8-8H4"
							})])), createTextVNode(" Publier ")]),
							_: 1
						})]), __props.recentSounds.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("div", { class: "space-y-4" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.recentSounds.slice(0, 5), (sound, index) => {
							return openBlock(), createBlock(unref(Link), {
								key: sound.id,
								href: _ctx.route("sounds.show", sound.slug),
								class: "flex items-center gap-4 p-4 rounded-xl bg-arbor-charcoal/50 border border-arbor-fog/50 hover:border-arbor-moss/50 hover:bg-arbor-charcoal transition-all duration-300 group",
								style: `animation: slideInRight 0.4s ease-out forwards; animation-delay: ${index * .08}s; opacity: 0;`
							}, {
								default: withCtx(() => [
									createVNode("div", { class: "relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-arbor-deep" }, [sound.cover_url ? (openBlock(), createBlock("div", {
										key: 0,
										class: "absolute inset-0 bg-cover bg-center",
										style: `background-image: url(${sound.cover_url})`
									}, null, 4)) : (openBlock(), createBlock("div", {
										key: 1,
										class: "absolute inset-0 flex items-center justify-center"
									}, [(openBlock(), createBlock("svg", {
										class: "w-6 h-6 text-arbor-moss/40",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "1",
										d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
									})]))])), createVNode("div", { class: "sound-card-overlay rounded-xl" }, [createVNode("div", { class: "w-8 h-8 rounded-full bg-arbor-emerald/90 flex items-center justify-center" }, [(openBlock(), createBlock("svg", {
										class: "w-4 h-4 text-arbor-night ml-0.5",
										fill: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", { d: "M8 5v14l11-7z" })]))])])]),
									createVNode("div", { class: "flex-1 min-w-0" }, [createVNode("h3", { class: "font-medium text-arbor-cream truncate group-hover:text-arbor-emerald transition-colors" }, toDisplayString(sound.title), 1), createVNode("p", { class: "text-sm text-arbor-sage truncate" }, toDisplayString(sound.category?.name || "Sans catégorie"), 1)]),
									createVNode("div", { class: "hidden sm:flex items-end gap-[2px] h-6 opacity-40 group-hover:opacity-70 transition-opacity" }, [(openBlock(true), createBlock(Fragment, null, renderList(getMiniWaveform(sound.id), (h, i) => {
										return openBlock(), createBlock("div", {
											key: i,
											class: "w-[2px] bg-arbor-emerald rounded-full",
											style: { height: `${h}%` }
										}, null, 4);
									}), 128))]),
									createVNode("div", { class: "hidden sm:flex items-center gap-4 text-sm text-arbor-sage shrink-0" }, [
										createVNode("span", { class: "flex items-center gap-1.5" }, [(openBlock(), createBlock("svg", {
											class: "w-4 h-4",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24"
										}, [createVNode("path", {
											"stroke-linecap": "round",
											"stroke-linejoin": "round",
											"stroke-width": "2",
											d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										})])), createTextVNode(" " + toDisplayString(formatNumber(sound.play_count || 0)), 1)]),
										createVNode("span", { class: "flex items-center gap-1.5" }, [(openBlock(), createBlock("svg", {
											class: "w-4 h-4",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24"
										}, [createVNode("path", {
											"stroke-linecap": "round",
											"stroke-linejoin": "round",
											"stroke-width": "2",
											d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										})])), createTextVNode(" " + toDisplayString(formatNumber(sound.like_count || 0)), 1)]),
										createVNode("span", { class: "text-xs" }, toDisplayString(formatDuration(sound.duration)), 1)
									])
								]),
								_: 2
							}, 1032, ["href", "style"]);
						}), 128))])])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "text-center py-16"
						}, [
							createVNode("div", { class: "w-16 h-16 rounded-2xl bg-arbor-moss/10 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110" }, [(openBlock(), createBlock("svg", {
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
							createVNode("h3", { class: "font-display text-xl text-arbor-cream mb-2" }, "Aucun enregistrement"),
							createVNode("p", { class: "text-arbor-sage text-sm mb-6" }, "Partagez votre premier son naturel avec la communauté."),
							createVNode(unref(Link), {
								href: "/sounds/create",
								class: "btn-primary"
							}, {
								default: withCtx(() => [createTextVNode(" Publier un son ")]),
								_: 1
							})
						]))]), createVNode("div", { class: "glass-card p-6 lg:p-8" }, [createVNode("h2", { class: "font-display text-2xl font-semibold text-arbor-cream mb-6" }, " Activité récente "), __props.activities.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "space-y-4"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.activities.slice(0, 6), (activity, index) => {
							return openBlock(), createBlock("div", {
								key: activity.id,
								class: "flex items-start gap-4 p-4 rounded-xl hover:bg-arbor-charcoal/30 transition-colors",
								style: `animation: slideInRight 0.4s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
							}, [createVNode("div", { class: ["w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform hover:scale-110", getActivityColor(activity.type)] }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: getActivityIcon(activity.type)
							}, null, 8, ["d"])]))], 2), createVNode("div", { class: "flex-1 min-w-0" }, [createVNode("p", { class: "text-arbor-cream text-sm" }, [createVNode("span", { class: "font-medium" }, toDisplayString(activity.user?.name), 1), createTextVNode(" " + toDisplayString(activity.description), 1)]), createVNode("p", { class: "text-arbor-sage text-xs mt-1" }, toDisplayString(formatDate(activity.created_at)), 1)])], 4);
						}), 128))])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "text-center py-12"
						}, [createVNode("p", { class: "text-arbor-sage text-sm" }, "Aucune activité récente à afficher.")]))])]), createVNode("div", { class: "space-y-8" }, [
							createVNode("div", { class: "glass-card p-6 relative overflow-hidden" }, [createVNode("div", { class: "absolute top-0 right-0 w-32 h-32 bg-arbor-amber/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" }), createVNode("div", { class: "relative z-10" }, [
								createVNode("div", { class: "flex items-center gap-2 mb-4" }, [createVNode("div", { class: "w-8 h-8 rounded-lg bg-arbor-amber/20 flex items-center justify-center" }, [createVNode("span", { class: "font-mono text-sm font-medium text-arbor-amber" }, "E")]), createVNode("span", { class: "text-arbor-sage text-xs font-medium uppercase tracking-wider" }, "Solde ECHO")]),
								createVNode("div", { class: "font-mono text-3xl font-medium text-arbor-amber mb-2 relative" }, [createTextVNode(toDisplayString(__props.echoBalance.toLocaleString("fr-FR")) + " ", 1), __props.echoBalance > 0 ? (openBlock(), createBlock("div", {
									key: 0,
									class: "absolute inset-0 shimmer-text opacity-20 pointer-events-none"
								})) : createCommentVNode("", true)]),
								createVNode("p", { class: "text-arbor-sage text-xs" }, " Crédits disponibles "),
								createVNode("div", { class: "mt-4 pt-4 border-t border-arbor-glass-border" }, [createVNode(unref(Link), {
									href: "/wallet",
									class: "text-arbor-amber text-sm hover:underline inline-flex items-center gap-1 group"
								}, {
									default: withCtx(() => [createTextVNode(" Voir l'historique "), (openBlock(), createBlock("svg", {
										class: "w-3 h-3 transition-transform group-hover:translate-x-0.5",
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
							createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-display text-lg font-semibold text-arbor-cream mb-4" }, " Actions rapides "), createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(quickActions.value, (action) => {
								return openBlock(), createBlock(unref(Link), {
									key: action.label,
									href: action.href,
									class: "flex items-center gap-4 p-3 rounded-xl hover:bg-arbor-charcoal/50 transition-colors group"
								}, {
									default: withCtx(() => [createVNode("div", { class: ["w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", {
										"bg-arbor-emerald/15 text-arbor-emerald": action.color === "emerald",
										"bg-arbor-moss/20 text-arbor-moss-light": action.color === "moss",
										"bg-arbor-sage/15 text-arbor-sage": action.color === "sage"
									}] }, [(openBlock(), createBlock("svg", {
										class: "w-5 h-5",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "1.5",
										d: action.icon
									}, null, 8, ["d"])]))], 2), createVNode("div", null, [createVNode("div", { class: "text-arbor-cream text-sm font-medium group-hover:text-arbor-emerald transition-colors" }, toDisplayString(action.label), 1), createVNode("div", { class: "text-arbor-sage text-xs" }, toDisplayString(action.description), 1)])]),
									_: 2
								}, 1032, ["href"]);
							}), 128))])]),
							createVNode("div", { class: "glass-card p-6 bg-gradient-to-br from-arbor-moss/10 to-transparent hover-lift" }, [createVNode("div", { class: "flex items-start gap-3" }, [createVNode("div", { class: "w-8 h-8 rounded-lg bg-arbor-emerald/20 flex items-center justify-center shrink-0 mt-0.5" }, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4 text-arbor-emerald",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							})]))]), createVNode("div", null, [createVNode("h4", { class: "text-arbor-cream text-sm font-medium mb-1" }, "Astuce"), createVNode("p", { class: "text-arbor-sage text-xs leading-relaxed" }, " Ajoutez une photo de couverture à vos enregistrements pour augmenter les écoutes de 40%. ")])])])
						])])])])
					])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
