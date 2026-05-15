import { t as ApplicationLogo_default } from "./ApplicationLogo-z-LAt8b4.js";
import { Link, useForm } from "@inertiajs/vue3";
import { computed, createTextVNode, createVNode, mergeProps, onMounted, onUnmounted, ref, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { defineStore } from "pinia";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
//#region resources/js/Components/NewsletterForm.vue
var _sfc_main$2 = {
	__name: "NewsletterForm",
	__ssrInlineRender: true,
	setup(__props) {
		const form = useForm({ email: "" });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><form class="flex flex-col sm:flex-row gap-3"><div class="relative flex-1"><input${ssrRenderAttr("value", unref(form).email)} type="email" required placeholder="votre@email.com" class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-3 text-base text-arbor-cream placeholder:text-arbor-sage/60 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-colors">`);
			if (unref(form).errors.email) _push(`<div class="absolute -bottom-5 left-0 text-xs text-red-400">${ssrInterpolate(unref(form).errors.email)}</div>`);
			else _push(`<!---->`);
			_push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-arbor-moss to-arbor-moss-light text-white text-sm font-medium hover:shadow-lg hover:shadow-arbor-moss/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">`);
			if (unref(form).processing) _push(`<span>Inscription...</span>`);
			else _push(`<span>S&#39;inscrire</span>`);
			_push(`</button></form>`);
			if (_ctx.$page.props.flash?.success) _push(`<div class="mt-4 p-3 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 text-arbor-emerald text-sm">${ssrInterpolate(_ctx.$page.props.flash.success)}</div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NewsletterForm.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Stores/player.js
var STORAGE_KEY$1 = "arborisis-player-state";
function loadState() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY$1);
		if (raw) return JSON.parse(raw);
	} catch {}
	return null;
}
function saveState(state) {
	try {
		localStorage.setItem(STORAGE_KEY$1, JSON.stringify(state));
	} catch {}
}
var usePlayerStore = defineStore("player", () => {
	const saved = loadState();
	const currentSound = ref(saved?.currentSound || null);
	const isPlaying = ref(false);
	const currentTime = ref(saved?.currentTime || 0);
	const duration = ref(saved?.duration || 0);
	const volume = ref(saved?.volume ?? 1);
	const isMuted = ref(saved?.isMuted || false);
	const currentMode = ref(saved?.currentMode || "sound");
	const radioMetadata = ref(saved?.radioMetadata || null);
	const radioStreamUrl = ref(saved?.radioStreamUrl || "/radio/stream");
	const hasActiveTrack = computed(() => currentSound.value !== null);
	const hasActiveRadio = computed(() => radioMetadata.value !== null);
	function play(sound = null) {
		currentMode.value = "sound";
		radioMetadata.value = null;
		if (sound) {
			if (currentSound.value?.id === sound.id) {
				isPlaying.value = true;
				return;
			}
			currentSound.value = sound;
			isPlaying.value = true;
			currentTime.value = 0;
			duration.value = sound.duration || 0;
		} else if (currentSound.value) isPlaying.value = true;
	}
	function pause() {
		isPlaying.value = false;
	}
	function togglePlay() {
		isPlaying.value = !isPlaying.value;
	}
	function stop() {
		isPlaying.value = false;
		currentTime.value = 0;
	}
	function setTime(time) {
		currentTime.value = time;
	}
	function setDuration(dur) {
		duration.value = dur;
	}
	function setVolume(vol) {
		volume.value = vol;
		if (vol > 0) isMuted.value = false;
	}
	function toggleMute() {
		isMuted.value = !isMuted.value;
	}
	function close() {
		currentSound.value = null;
		radioMetadata.value = null;
		isPlaying.value = false;
		currentTime.value = 0;
		duration.value = 0;
	}
	function connectRadio(metadata = null, streamUrl = "/radio/stream") {
		currentMode.value = "radio";
		currentSound.value = null;
		radioMetadata.value = metadata || radioMetadata.value || {
			title: "Arborisis Radio",
			artist: "En direct"
		};
		radioStreamUrl.value = streamUrl;
		currentTime.value = 0;
		duration.value = 0;
	}
	function updateRadioMetadata(metadata) {
		if (!metadata) return;
		radioMetadata.value = metadata;
	}
	function resumeRadio() {
		currentMode.value = "radio";
		isPlaying.value = true;
	}
	watch(() => ({
		currentSound: currentSound.value,
		currentMode: currentMode.value,
		radioMetadata: radioMetadata.value,
		radioStreamUrl: radioStreamUrl.value,
		currentTime: currentTime.value,
		duration: duration.value,
		volume: volume.value,
		isMuted: isMuted.value
	}), (state) => saveState(state), { deep: true });
	return {
		currentSound,
		isPlaying,
		currentTime,
		duration,
		volume,
		isMuted,
		currentMode,
		radioMetadata,
		radioStreamUrl,
		hasActiveTrack,
		hasActiveRadio,
		play,
		pause,
		togglePlay,
		stop,
		setTime,
		setDuration,
		setVolume,
		toggleMute,
		close,
		connectRadio,
		updateRadioMetadata,
		resumeRadio
	};
});
//#endregion
//#region resources/js/Components/Radio/NowPlayingWidget.vue
var _sfc_main$1 = {
	__name: "NowPlayingWidget",
	__ssrInlineRender: true,
	setup(__props) {
		const player = usePlayerStore();
		const audioRef = ref(null);
		const visible = computed(() => player.currentMode === "radio" && player.radioMetadata && !route().current("radio.index"));
		const streamUrl = computed(() => player.radioStreamUrl || "/radio/stream");
		watch(() => player.isPlaying, (playing) => {
			if (!audioRef.value || player.currentMode !== "radio") return;
			if (playing) audioRef.value.play().catch(() => player.pause());
			else audioRef.value.pause();
		});
		watch(() => player.volume, (volume) => {
			if (audioRef.value) audioRef.value.volume = player.isMuted ? 0 : volume;
		});
		watch(() => player.isMuted, (muted) => {
			if (audioRef.value) audioRef.value.volume = muted ? 0 : player.volume;
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (visible.value) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-5 right-5 z-tooltip w-[min(360px,calc(100vw-2.5rem))] rounded-lg border border-arbor-glass-border bg-arbor-deep/95 p-3 shadow-2xl shadow-black/30 backdrop-blur" }, _attrs))}><audio${ssrRenderAttr("src", streamUrl.value)} crossorigin="anonymous" class="hidden"></audio><div class="flex items-center gap-3"><button type="button" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-arbor-emerald text-arbor-night transition hover:bg-arbor-emerald-dark"${ssrRenderAttr("aria-label", unref(player).isPlaying ? "Mettre la radio en pause" : "Lire la radio")}>`);
				if (!unref(player).isPlaying) _push(`<svg class="h-5 w-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`);
				else _push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path></svg>`);
				_push(`</button><div class="min-w-0 flex-1">`);
				_push(ssrRenderComponent(unref(Link), {
					href: "/radio",
					class: "block truncate text-sm font-semibold text-arbor-cream hover:text-arbor-emerald"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(player).radioMetadata?.title || "Arborisis Radio")}`);
						else return [createTextVNode(toDisplayString(unref(player).radioMetadata?.title || "Arborisis Radio"), 1)];
					}),
					_: 1
				}, _parent));
				_push(`<p class="truncate text-xs text-arbor-sage">${ssrInterpolate(unref(player).radioMetadata?.artist || "En direct")}</p></div><button type="button" class="min-w-[44px] min-h-[44px] flex items-center justify-center text-arbor-sage hover:text-arbor-cream" aria-label="Fermer le widget radio"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M6 18 18 6M6 6l12 12"></path></svg></button></div></div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Radio/NowPlayingWidget.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Stores/consent.js
var STORAGE_KEY = "arborisis-consent";
function loadConsent() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw);
	} catch {}
	return null;
}
function saveConsent(state) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {}
}
function updateGtag(consent) {
	if (typeof window === "undefined" || typeof window.gtag !== "function") return;
	window.gtag("consent", "update", {
		analytics_storage: consent.analytics ? "granted" : "denied",
		ad_storage: consent.ads ? "granted" : "denied",
		ad_user_data: consent.ads ? "granted" : "denied",
		ad_personalization: consent.ads ? "granted" : "denied"
	});
}
var useConsentStore = defineStore("consent", () => {
	const saved = loadConsent();
	const analytics = ref(saved?.analytics ?? null);
	const ads = ref(saved?.ads ?? null);
	const showBanner = ref(saved === null);
	const showDetails = ref(false);
	const hasDecided = computed(() => saved !== null || analytics.value !== null && ads.value !== null);
	function acceptAll() {
		analytics.value = true;
		ads.value = true;
		showBanner.value = false;
		showDetails.value = false;
		saveConsent({
			analytics: true,
			ads: true
		});
		updateGtag({
			analytics: true,
			ads: true
		});
	}
	function rejectAll() {
		analytics.value = false;
		ads.value = false;
		showBanner.value = false;
		showDetails.value = false;
		saveConsent({
			analytics: false,
			ads: false
		});
		updateGtag({
			analytics: false,
			ads: false
		});
	}
	function savePreferences({ analytics: a, ads: d }) {
		analytics.value = a;
		ads.value = d;
		showBanner.value = false;
		showDetails.value = false;
		saveConsent({
			analytics: a,
			ads: d
		});
		updateGtag({
			analytics: a,
			ads: d
		});
	}
	function openBanner() {
		showBanner.value = true;
		showDetails.value = false;
	}
	function openDetails() {
		showDetails.value = true;
	}
	function closeDetails() {
		showDetails.value = false;
	}
	if (typeof window !== "undefined") window.addEventListener("storage", (e) => {
		if (e.key === STORAGE_KEY && e.newValue) {
			const parsed = JSON.parse(e.newValue);
			analytics.value = parsed.analytics ?? null;
			ads.value = parsed.ads ?? null;
		}
	});
	if (saved && typeof window !== "undefined" && typeof window.gtag === "function") updateGtag({
		analytics: saved.analytics,
		ads: saved.ads
	});
	return {
		analytics,
		ads,
		showBanner,
		showDetails,
		hasDecided,
		acceptAll,
		rejectAll,
		savePreferences,
		openBanner,
		openDetails,
		closeDetails
	};
});
//#endregion
//#region resources/js/Layouts/GuestLayout.vue
var _sfc_main = {
	__name: "GuestLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const showingMobileMenu = ref(false);
		const showingMoreDropdown = ref(false);
		useConsentStore();
		const isScrolled = ref(false);
		function handleScroll() {
			isScrolled.value = window.scrollY > 50;
		}
		onMounted(() => {
			window.addEventListener("scroll", handleScroll, { passive: true });
		});
		onUnmounted(() => {
			window.removeEventListener("scroll", handleScroll);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-arbor-night text-arbor-cream" }, _attrs))}><nav class="${ssrRenderClass([isScrolled.value ? "bg-arbor-night/80 backdrop-blur-xl border-b border-arbor-glass-border h-14" : "bg-transparent h-16", "fixed top-0 left-0 right-0 z-fixed-nav transition-colors duration-300"])}"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full"><div class="flex items-center justify-between h-full">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/",
				class: "flex items-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(ApplicationLogo_default, { class: "h-10 w-auto shrink-0" }, null, _parent, _scopeId));
					else return [createVNode(ApplicationLogo_default, { class: "h-10 w-auto shrink-0" })];
				}),
				_: 1
			}, _parent));
			_push(`<div class="hidden md:flex items-center gap-1">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/sounds",
				class: "nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sons `);
					else return [createTextVNode(" Sons ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/map",
				class: "nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Carte `);
					else return [createTextVNode(" Carte ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/creators",
				class: "nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Créateurs `);
					else return [createTextVNode(" Créateurs ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/radio",
				class: "nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Radio `);
					else return [createTextVNode(" Radio ")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="relative"><button class="nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors inline-flex items-center gap-1" aria-haspopup="true"${ssrRenderAttr("aria-expanded", showingMoreDropdown.value)}> Plus <svg class="${ssrRenderClass([showingMoreDropdown.value ? "rotate-180" : "", "w-3 h-3 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
			if (showingMoreDropdown.value) {
				_push(`<div class="absolute right-0 mt-2 w-48 bg-arbor-deep/95 backdrop-blur-xl border border-arbor-glass-border rounded-xl shadow-xl py-1 z-dropdown">`);
				_push(ssrRenderComponent(unref(Link), {
					href: "/blog",
					class: "block px-4 py-2 text-sm text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Chroniques `);
						else return [createTextVNode(" Chroniques ")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Link), {
					href: "/mission",
					class: "block px-4 py-2 text-sm text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Mission `);
						else return [createTextVNode(" Mission ")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Link), {
					href: "/contact",
					class: "block px-4 py-2 text-sm text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Contact `);
						else return [createTextVNode(" Contact ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div><div class="w-px h-5 bg-arbor-glass-border mx-2"></div>`);
			if (_ctx.$page.props.auth.user) _push(ssrRenderComponent(unref(Link), {
				href: "/dashboard",
				class: "nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Dashboard `);
					else return [createTextVNode(" Dashboard ")];
				}),
				_: 1
			}, _parent));
			else {
				_push(`<!--[-->`);
				_push(ssrRenderComponent(unref(Link), {
					href: "/login",
					class: "nav-link px-3 py-2 rounded-lg text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Connexion `);
						else return [createTextVNode(" Connexion ")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Link), {
					href: "/register",
					class: "btn-primary text-sm px-4 py-2 ml-1"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Rejoindre `);
						else return [createTextVNode(" Rejoindre ")];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			}
			_push(`</div><div class="flex items-center md:hidden"><button${ssrRenderAttr("aria-label", showingMobileMenu.value ? "Fermer le menu" : "Ouvrir le menu")}${ssrRenderAttr("aria-expanded", showingMobileMenu.value)} class="inline-flex items-center justify-center rounded-xl p-2.5 text-arbor-sage transition duration-150 ease-in-out hover:bg-arbor-glass hover:text-arbor-cream focus:outline-none min-h-[44px] min-w-[44px]"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
				hidden: showingMobileMenu.value,
				"inline-flex": !showingMobileMenu.value
			})}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
				hidden: !showingMobileMenu.value,
				"inline-flex": showingMobileMenu.value
			})}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{
				block: showingMobileMenu.value,
				hidden: !showingMobileMenu.value
			}, "md:hidden bg-arbor-deep/95 backdrop-blur-xl border-b border-arbor-glass-border"])}"><div class="space-y-1 pb-3 pt-2 px-4">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/sounds",
				class: ["block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("sounds.*") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sons naturels `);
					else return [createTextVNode(" Sons naturels ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/map",
				class: ["block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("map") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Carte des sons `);
					else return [createTextVNode(" Carte des sons ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/creators",
				class: ["block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("creators.*") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Créateurs `);
					else return [createTextVNode(" Créateurs ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/radio",
				class: ["block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("radio.*") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Radio `);
					else return [createTextVNode(" Radio ")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="border-t border-arbor-glass-border my-1"></div>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/blog",
				class: ["block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("blog.*") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Chroniques `);
					else return [createTextVNode(" Chroniques ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/mission",
				class: ["block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("mission") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Mission `);
					else return [createTextVNode(" Mission ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/contact",
				class: ["block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("contact") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Contact `);
					else return [createTextVNode(" Contact ")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="border-t border-arbor-glass-border pb-3 pt-2 px-4">`);
			if (_ctx.$page.props.auth.user) _push(ssrRenderComponent(unref(Link), {
				href: "/dashboard",
				class: "block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Dashboard `);
					else return [createTextVNode(" Dashboard ")];
				}),
				_: 1
			}, _parent));
			else {
				_push(`<!--[-->`);
				_push(ssrRenderComponent(unref(Link), {
					href: "/login",
					class: "block px-3 py-2.5 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Connexion `);
						else return [createTextVNode(" Connexion ")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Link), {
					href: "/register",
					class: "block px-3 py-2.5 mt-1 rounded-lg text-arbor-emerald bg-arbor-emerald/10 hover:bg-arbor-emerald/15 transition-colors font-medium"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Rejoindre `);
						else return [createTextVNode(" Rejoindre ")];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			}
			_push(`</div></div></nav><main>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main>`);
			_push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
			_push(`<footer class="border-t border-arbor-glass-border bg-arbor-deep"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div><div class="flex items-center mb-4">`);
			_push(ssrRenderComponent(ApplicationLogo_default, { class: "h-12 w-auto shrink-0" }, null, _parent));
			_push(`</div><p class="text-arbor-sage text-sm max-w-sm leading-relaxed mb-6"> Une archive sonore vivante dédiée aux créateurs de field recording et aux amoureux de la nature. </p><div class="max-w-sm"><h4 class="text-xs font-medium text-arbor-cream uppercase tracking-wider mb-3">Newsletter</h4>`);
			_push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
			_push(`</div></div><div><h3 class="font-medium text-arbor-cream mb-4 text-sm">Explorer</h3><ul class="space-y-2.5 text-sm text-arbor-sage"><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/map",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Carte des sons`);
					else return [createTextVNode("Carte des sons")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/sounds",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Tous les sons`);
					else return [createTextVNode("Tous les sons")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/creators",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Créateurs`);
					else return [createTextVNode("Créateurs")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/radio",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Radio`);
					else return [createTextVNode("Radio")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/blog",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Chroniques`);
					else return [createTextVNode("Chroniques")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></div><div><h3 class="font-medium text-arbor-cream mb-4 text-sm">À propos</h3><ul class="space-y-2.5 text-sm text-arbor-sage"><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/transparency",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Crédits ECHO`);
					else return [createTextVNode("Crédits ECHO")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/mission",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Notre mission`);
					else return [createTextVNode("Notre mission")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/charte",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Charte`);
					else return [createTextVNode("Charte")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/contact",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Contact`);
					else return [createTextVNode("Contact")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li><button class="hover:text-arbor-emerald transition-colors text-left">Cookies</button></li></ul></div></div><div class="mt-12 pt-8 border-t border-arbor-glass-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-arbor-sage"><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Arborisis. Tous droits réservés.</p><div class="flex items-center gap-4">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/privacy",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Confidentialité`);
					else return [createTextVNode("Confidentialité")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/charte",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Charte`);
					else return [createTextVNode("Charte")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></footer></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { usePlayerStore as n, _sfc_main as t };
