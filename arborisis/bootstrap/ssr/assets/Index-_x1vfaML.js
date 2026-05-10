import { t as _sfc_main$1 } from "./GuestLayout-CExMlVyB.js";
import { t as usePlayerStore } from "./player-CnXA8IIe.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createTextVNode, createVNode, onMounted, onUnmounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Radio/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		nowPlaying: Object,
		history: Array,
		listenerCount: Number
	},
	setup(__props) {
		const props = __props;
		const player = usePlayerStore();
		const audioRef = ref(null);
		const isPlaying = ref(false);
		const volume = ref(.8);
		const isMuted = ref(false);
		const currentMetadata = ref(props.nowPlaying);
		const currentListeners = ref(props.listenerCount);
		const nextUp = ref(null);
		const copiedStream = ref(false);
		const copiedM3u = ref(false);
		let metadataInterval = null;
		const currentSound = computed(() => currentMetadata.value);
		const effectiveVolume = computed(() => {
			if (isMuted.value) return 0;
			return volume.value;
		});
		const streamUrl = computed(() => `/radio/stream?_=${Date.now()}`);
		onMounted(() => {
			if (player.isPlaying) player.pause();
			fetchMetadata();
			metadataInterval = setInterval(fetchMetadata, 5e3);
		});
		onUnmounted(() => {
			if (metadataInterval) clearInterval(metadataInterval);
			if (audioRef.value) {
				audioRef.value.pause();
				audioRef.value.src = "";
				audioRef.value.load();
			}
		});
		const fetchMetadata = async () => {
			try {
				const response = await fetch("/api/radio/now-playing");
				if (response.ok) {
					const data = await response.json();
					currentMetadata.value = data.now_playing;
					currentListeners.value = data.listener_count;
					nextUp.value = data.next_up;
				}
			} catch {}
		};
		const togglePlay = () => {
			if (!audioRef.value) return;
			if (isPlaying.value) {
				audioRef.value.pause();
				isPlaying.value = false;
			} else audioRef.value.play().then(() => {
				isPlaying.value = true;
			}).catch(() => {});
		};
		const onAudioPlay = () => {
			isPlaying.value = true;
		};
		const onAudioPause = () => {
			isPlaying.value = false;
		};
		const setVolume = (value) => {
			volume.value = value;
			if (audioRef.value) audioRef.value.volume = effectiveVolume.value;
			if (value > 0) isMuted.value = false;
		};
		const toggleMute = () => {
			isMuted.value = !isMuted.value;
			if (audioRef.value) audioRef.value.volume = effectiveVolume.value;
		};
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
		};
		const copyStreamUrl = () => {
			navigator.clipboard.writeText(window.location.origin + "/radio/stream");
			copiedStream.value = true;
			setTimeout(() => copiedStream.value = false, 2e3);
		};
		const copyM3uUrl = () => {
			navigator.clipboard.writeText(window.location.origin + "/radio/stream.m3u");
			copiedM3u.value = true;
			setTimeout(() => copiedM3u.value = false, 2e3);
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Radio" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="pt-24 pb-16"${_scopeId}><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-12"${_scopeId}><div class="flex items-center gap-3 mb-4"${_scopeId}><div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"${_scopeId}></div><span class="text-sm text-arbor-sage font-medium tracking-wide uppercase"${_scopeId}>En direct</span></div><h1 class="font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4"${_scopeId}> Arborisis Radio </h1><p class="text-arbor-sage max-w-xl"${_scopeId}> Un flux continu de field recordings soigneusement sélectionnés parmi les créations de notre communauté. </p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 space-y-8"${_scopeId}><div class="aspect-square sm:aspect-[16/9] rounded-2xl overflow-hidden bg-arbor-deep relative"${_scopeId}>`);
						if (currentSound.value?.cover) _push(`<div class="absolute inset-0 bg-cover bg-center" style="${ssrRenderStyle(`background-image: url(${currentSound.value.cover})`)}"${_scopeId}></div>`);
						else _push(`<div class="absolute inset-0 bg-gradient-to-br from-arbor-moss/20 to-arbor-emerald/10 flex items-center justify-center"${_scopeId}><svg class="w-32 h-32 text-arbor-moss/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg></div>`);
						_push(`<div class="absolute inset-0 bg-gradient-to-t from-arbor-night/80 via-transparent to-transparent"${_scopeId}></div><div class="absolute bottom-0 left-0 right-0 p-6"${_scopeId}><div class="flex items-center gap-3 mb-2"${_scopeId}><div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"${_scopeId}></div><span class="text-xs text-arbor-sage uppercase tracking-wider"${_scopeId}>Now Playing</span></div><h2 class="font-display text-2xl font-bold text-arbor-cream mb-1 truncate"${_scopeId}>${ssrInterpolate(currentSound.value?.title ?? "Chargement...")}</h2><p class="text-arbor-sage truncate"${_scopeId}>${ssrInterpolate(currentSound.value?.artist ?? "Arborisis")}</p></div></div><div class="glass-card p-6"${_scopeId}><audio${ssrRenderAttr("src", streamUrl.value)} crossorigin="anonymous"${_scopeId}></audio><div class="flex items-center gap-4 mb-6"${_scopeId}><button class="w-16 h-16 rounded-full bg-arbor-emerald flex items-center justify-center hover:bg-arbor-emerald-dark transition-colors shrink-0 shadow-lg shadow-arbor-emerald/20 group"${_scopeId}>`);
						if (!isPlaying.value) _push(`<svg class="w-7 h-7 text-arbor-night ml-1 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M8 5v14l11-7z"${_scopeId}></path></svg>`);
						else _push(`<svg class="w-7 h-7 text-arbor-night" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"${_scopeId}></path></svg>`);
						_push(`</button><div class="flex-1 min-w-0"${_scopeId}><div class="text-sm text-arbor-sage mb-1"${_scopeId}>Flux continu</div><div class="text-arbor-cream font-medium truncate"${_scopeId}>${ssrInterpolate(isPlaying.value ? "Lecture en cours" : "En pause")}</div></div><div class="flex items-center gap-2 text-sm text-arbor-sage"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(currentListeners.value)} auditeur${ssrInterpolate(currentListeners.value !== 1 ? "s" : "")}</span></div></div><div class="flex items-center gap-3"${_scopeId}><button class="text-arbor-sage hover:text-arbor-cream transition-colors"${_scopeId}>`);
						if (isMuted.value || volume.value === 0) _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"${_scopeId}></path></svg>`);
						else _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"${_scopeId}></path></svg>`);
						_push(`</button><input type="range" min="0" max="1" step="0.01"${ssrRenderAttr("value", volume.value)} class="flex-1 h-1.5 bg-arbor-glass rounded-full appearance-none cursor-pointer accent-arbor-emerald"${_scopeId}></div></div><div class="flex flex-wrap gap-3"${_scopeId}><button class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-all"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"${_scopeId}></path></svg>`);
						if (copiedStream.value) _push(`<span${_scopeId}>URL copiée !</span>`);
						else _push(`<span${_scopeId}>Copier l&#39;URL du flux</span>`);
						_push(`</button><button class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-all"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg>`);
						if (copiedM3u.value) _push(`<span${_scopeId}>M3U copié !</span>`);
						else _push(`<span${_scopeId}>Copier le lien M3U</span>`);
						_push(`</button><a href="/radio/stream.m3u" download="arborisis-radio.m3u" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-emerald/15 border border-arbor-emerald/30 text-arbor-emerald text-sm hover:bg-arbor-emerald/25 transition-all"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"${_scopeId}></path></svg> Télécharger M3U </a></div></div><div class="space-y-6"${_scopeId}><div class="glass-card p-6"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-4 text-sm"${_scopeId}>Prochainement</h3>`);
						if (nextUp.value) {
							_push(`<div class="flex items-center gap-3"${_scopeId}><div class="w-12 h-12 rounded-lg bg-arbor-deep overflow-hidden shrink-0"${_scopeId}>`);
							if (nextUp.value.cover_url) _push(`<img${ssrRenderAttr("src", nextUp.value.cover_url)} class="w-full h-full object-cover" alt=""${_scopeId}>`);
							else _push(`<div class="w-full h-full flex items-center justify-center"${_scopeId}><svg class="w-5 h-5 text-arbor-moss/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg></div>`);
							_push(`</div><div class="min-w-0"${_scopeId}><div class="text-sm font-medium text-arbor-cream truncate"${_scopeId}>${ssrInterpolate(nextUp.value.title)}</div><div class="text-xs text-arbor-sage truncate"${_scopeId}>${ssrInterpolate(nextUp.value.user_name ?? "Arborisis")}</div></div><span class="text-xs text-arbor-sage font-mono shrink-0"${_scopeId}>${ssrInterpolate(formatDuration(nextUp.value.duration))}</span></div>`);
						} else _push(`<div class="text-sm text-arbor-sage"${_scopeId}> Sélection en cours... </div>`);
						_push(`</div><div class="glass-card p-6"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-4 text-sm"${_scopeId}>Historique</h3>`);
						if (__props.history.length > 0) {
							_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
							ssrRenderList(__props.history, (sound) => {
								_push(ssrRenderComponent(unref(Link), {
									key: sound.id,
									href: _ctx.route("sounds.show", sound.slug),
									class: "flex items-center gap-3 group"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="w-10 h-10 rounded-lg bg-arbor-deep overflow-hidden shrink-0"${_scopeId}>`);
											if (sound.cover_url) _push(`<img${ssrRenderAttr("src", sound.cover_url)} class="w-full h-full object-cover" alt=""${_scopeId}>`);
											else _push(`<div class="w-full h-full flex items-center justify-center"${_scopeId}><svg class="w-4 h-4 text-arbor-moss/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"${_scopeId}></path></svg></div>`);
											_push(`</div><div class="min-w-0 flex-1"${_scopeId}><div class="text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate"${_scopeId}>${ssrInterpolate(sound.title)}</div><div class="text-xs text-arbor-sage truncate"${_scopeId}>${ssrInterpolate(sound.user_name ?? "Arborisis")}</div></div><span class="text-xs text-arbor-sage font-mono shrink-0"${_scopeId}>${ssrInterpolate(formatDuration(sound.duration))}</span>`);
										} else return [
											createVNode("div", { class: "w-10 h-10 rounded-lg bg-arbor-deep overflow-hidden shrink-0" }, [sound.cover_url ? (openBlock(), createBlock("img", {
												key: 0,
												src: sound.cover_url,
												class: "w-full h-full object-cover",
												alt: ""
											}, null, 8, ["src"])) : (openBlock(), createBlock("div", {
												key: 1,
												class: "w-full h-full flex items-center justify-center"
											}, [(openBlock(), createBlock("svg", {
												class: "w-4 h-4 text-arbor-moss/50",
												fill: "none",
												stroke: "currentColor",
												viewBox: "0 0 24 24"
											}, [createVNode("path", {
												"stroke-linecap": "round",
												"stroke-linejoin": "round",
												"stroke-width": "1.5",
												d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
											})]))]))]),
											createVNode("div", { class: "min-w-0 flex-1" }, [createVNode("div", { class: "text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(sound.title), 1), createVNode("div", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(sound.user_name ?? "Arborisis"), 1)]),
											createVNode("span", { class: "text-xs text-arbor-sage font-mono shrink-0" }, toDisplayString(formatDuration(sound.duration)), 1)
										];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else _push(`<div class="text-sm text-arbor-sage"${_scopeId}> Aucun son dans l&#39;historique. </div>`);
						_push(`</div><div class="glass-card p-6"${_scopeId}><h3 class="font-semibold text-arbor-cream mb-3 text-sm"${_scopeId}>Écouter ailleurs</h3><p class="text-sm text-arbor-sage leading-relaxed mb-4"${_scopeId}> Le flux Arborisis Radio est compatible avec tous les lecteurs audio : VLC, iTunes, Foobar2000, et les appareils mobiles. </p><div class="space-y-2 text-xs text-arbor-sage"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><span class="text-arbor-emerald"${_scopeId}>●</span><span${_scopeId}>Format MP3 continu</span></div><div class="flex items-center gap-2"${_scopeId}><span class="text-arbor-emerald"${_scopeId}>●</span><span${_scopeId}>Métadonnées temps réel</span></div><div class="flex items-center gap-2"${_scopeId}><span class="text-arbor-emerald"${_scopeId}>●</span><span${_scopeId}>Pas de publicité</span></div></div></div></div></div></div></div>`);
					} else return [createVNode("div", { class: "pt-24 pb-16" }, [createVNode("div", { class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" }, [createVNode("div", { class: "mb-12" }, [
						createVNode("div", { class: "flex items-center gap-3 mb-4" }, [createVNode("div", { class: "w-3 h-3 rounded-full bg-red-500 animate-pulse" }), createVNode("span", { class: "text-sm text-arbor-sage font-medium tracking-wide uppercase" }, "En direct")]),
						createVNode("h1", { class: "font-display text-3xl sm:text-4xl font-bold text-arbor-cream mb-4" }, " Arborisis Radio "),
						createVNode("p", { class: "text-arbor-sage max-w-xl" }, " Un flux continu de field recordings soigneusement sélectionnés parmi les créations de notre communauté. ")
					]), createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [createVNode("div", { class: "lg:col-span-2 space-y-8" }, [
						createVNode("div", { class: "aspect-square sm:aspect-[16/9] rounded-2xl overflow-hidden bg-arbor-deep relative" }, [
							currentSound.value?.cover ? (openBlock(), createBlock("div", {
								key: 0,
								class: "absolute inset-0 bg-cover bg-center",
								style: `background-image: url(${currentSound.value.cover})`
							}, null, 4)) : (openBlock(), createBlock("div", {
								key: 1,
								class: "absolute inset-0 bg-gradient-to-br from-arbor-moss/20 to-arbor-emerald/10 flex items-center justify-center"
							}, [(openBlock(), createBlock("svg", {
								class: "w-32 h-32 text-arbor-moss/30",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1",
								d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
							})]))])),
							createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-arbor-night/80 via-transparent to-transparent" }),
							createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-6" }, [
								createVNode("div", { class: "flex items-center gap-3 mb-2" }, [createVNode("div", { class: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }), createVNode("span", { class: "text-xs text-arbor-sage uppercase tracking-wider" }, "Now Playing")]),
								createVNode("h2", { class: "font-display text-2xl font-bold text-arbor-cream mb-1 truncate" }, toDisplayString(currentSound.value?.title ?? "Chargement..."), 1),
								createVNode("p", { class: "text-arbor-sage truncate" }, toDisplayString(currentSound.value?.artist ?? "Arborisis"), 1)
							])
						]),
						createVNode("div", { class: "glass-card p-6" }, [
							createVNode("audio", {
								ref_key: "audioRef",
								ref: audioRef,
								src: streamUrl.value,
								onPlay: onAudioPlay,
								onPause: onAudioPause,
								crossorigin: "anonymous"
							}, null, 40, ["src"]),
							createVNode("div", { class: "flex items-center gap-4 mb-6" }, [
								createVNode("button", {
									onClick: togglePlay,
									class: "w-16 h-16 rounded-full bg-arbor-emerald flex items-center justify-center hover:bg-arbor-emerald-dark transition-colors shrink-0 shadow-lg shadow-arbor-emerald/20 group"
								}, [!isPlaying.value ? (openBlock(), createBlock("svg", {
									key: 0,
									class: "w-7 h-7 text-arbor-night ml-1 transition-transform group-hover:scale-110",
									fill: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", { d: "M8 5v14l11-7z" })])) : (openBlock(), createBlock("svg", {
									key: 1,
									class: "w-7 h-7 text-arbor-night",
									fill: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" })]))]),
								createVNode("div", { class: "flex-1 min-w-0" }, [createVNode("div", { class: "text-sm text-arbor-sage mb-1" }, "Flux continu"), createVNode("div", { class: "text-arbor-cream font-medium truncate" }, toDisplayString(isPlaying.value ? "Lecture en cours" : "En pause"), 1)]),
								createVNode("div", { class: "flex items-center gap-2 text-sm text-arbor-sage" }, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
								})])), createVNode("span", null, toDisplayString(currentListeners.value) + " auditeur" + toDisplayString(currentListeners.value !== 1 ? "s" : ""), 1)])
							]),
							createVNode("div", { class: "flex items-center gap-3" }, [createVNode("button", {
								onClick: toggleMute,
								class: "text-arbor-sage hover:text-arbor-cream transition-colors"
							}, [isMuted.value || volume.value === 0 ? (openBlock(), createBlock("svg", {
								key: 0,
								class: "w-5 h-5",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
							}), createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
							})])) : (openBlock(), createBlock("svg", {
								key: 1,
								class: "w-5 h-5",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
							})]))]), createVNode("input", {
								type: "range",
								min: "0",
								max: "1",
								step: "0.01",
								value: volume.value,
								onInput: ($event) => setVolume(parseFloat($event.target.value)),
								class: "flex-1 h-1.5 bg-arbor-glass rounded-full appearance-none cursor-pointer accent-arbor-emerald"
							}, null, 40, ["value", "onInput"])])
						]),
						createVNode("div", { class: "flex flex-wrap gap-3" }, [
							createVNode("button", {
								onClick: copyStreamUrl,
								class: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-all"
							}, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
							})])), copiedStream.value ? (openBlock(), createBlock("span", { key: 0 }, "URL copiée !")) : (openBlock(), createBlock("span", { key: 1 }, "Copier l'URL du flux"))]),
							createVNode("button", {
								onClick: copyM3uUrl,
								class: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-glass border border-arbor-glass-border text-arbor-sage text-sm hover:text-arbor-cream hover:bg-white/10 transition-all"
							}, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
							})])), copiedM3u.value ? (openBlock(), createBlock("span", { key: 0 }, "M3U copié !")) : (openBlock(), createBlock("span", { key: 1 }, "Copier le lien M3U"))]),
							createVNode("a", {
								href: "/radio/stream.m3u",
								download: "arborisis-radio.m3u",
								class: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-arbor-emerald/15 border border-arbor-emerald/30 text-arbor-emerald text-sm hover:bg-arbor-emerald/25 transition-all"
							}, [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							})])), createTextVNode(" Télécharger M3U ")])
						])
					]), createVNode("div", { class: "space-y-6" }, [
						createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-semibold text-arbor-cream mb-4 text-sm" }, "Prochainement"), nextUp.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex items-center gap-3"
						}, [
							createVNode("div", { class: "w-12 h-12 rounded-lg bg-arbor-deep overflow-hidden shrink-0" }, [nextUp.value.cover_url ? (openBlock(), createBlock("img", {
								key: 0,
								src: nextUp.value.cover_url,
								class: "w-full h-full object-cover",
								alt: ""
							}, null, 8, ["src"])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "w-full h-full flex items-center justify-center"
							}, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-moss/50",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
							})]))]))]),
							createVNode("div", { class: "min-w-0" }, [createVNode("div", { class: "text-sm font-medium text-arbor-cream truncate" }, toDisplayString(nextUp.value.title), 1), createVNode("div", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(nextUp.value.user_name ?? "Arborisis"), 1)]),
							createVNode("span", { class: "text-xs text-arbor-sage font-mono shrink-0" }, toDisplayString(formatDuration(nextUp.value.duration)), 1)
						])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "text-sm text-arbor-sage"
						}, " Sélection en cours... "))]),
						createVNode("div", { class: "glass-card p-6" }, [createVNode("h3", { class: "font-semibold text-arbor-cream mb-4 text-sm" }, "Historique"), __props.history.length > 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "space-y-3"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.history, (sound) => {
							return openBlock(), createBlock(unref(Link), {
								key: sound.id,
								href: _ctx.route("sounds.show", sound.slug),
								class: "flex items-center gap-3 group"
							}, {
								default: withCtx(() => [
									createVNode("div", { class: "w-10 h-10 rounded-lg bg-arbor-deep overflow-hidden shrink-0" }, [sound.cover_url ? (openBlock(), createBlock("img", {
										key: 0,
										src: sound.cover_url,
										class: "w-full h-full object-cover",
										alt: ""
									}, null, 8, ["src"])) : (openBlock(), createBlock("div", {
										key: 1,
										class: "w-full h-full flex items-center justify-center"
									}, [(openBlock(), createBlock("svg", {
										class: "w-4 h-4 text-arbor-moss/50",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "1.5",
										d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
									})]))]))]),
									createVNode("div", { class: "min-w-0 flex-1" }, [createVNode("div", { class: "text-sm text-arbor-cream group-hover:text-arbor-emerald transition-colors truncate" }, toDisplayString(sound.title), 1), createVNode("div", { class: "text-xs text-arbor-sage truncate" }, toDisplayString(sound.user_name ?? "Arborisis"), 1)]),
									createVNode("span", { class: "text-xs text-arbor-sage font-mono shrink-0" }, toDisplayString(formatDuration(sound.duration)), 1)
								]),
								_: 2
							}, 1032, ["href"]);
						}), 128))])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "text-sm text-arbor-sage"
						}, " Aucun son dans l'historique. "))]),
						createVNode("div", { class: "glass-card p-6" }, [
							createVNode("h3", { class: "font-semibold text-arbor-cream mb-3 text-sm" }, "Écouter ailleurs"),
							createVNode("p", { class: "text-sm text-arbor-sage leading-relaxed mb-4" }, " Le flux Arborisis Radio est compatible avec tous les lecteurs audio : VLC, iTunes, Foobar2000, et les appareils mobiles. "),
							createVNode("div", { class: "space-y-2 text-xs text-arbor-sage" }, [
								createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-arbor-emerald" }, "●"), createVNode("span", null, "Format MP3 continu")]),
								createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-arbor-emerald" }, "●"), createVNode("span", null, "Métadonnées temps réel")]),
								createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-arbor-emerald" }, "●"), createVNode("span", null, "Pas de publicité")])
							])
						])
					])])])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Radio/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
