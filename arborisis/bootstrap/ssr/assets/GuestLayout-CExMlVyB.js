import { n as ApplicationLogo_default, t as _sfc_main$2 } from "./PushNotificationToggle-B6D0DzcS.js";
import { Link, useForm } from "@inertiajs/vue3";
import { computed, createTextVNode, createVNode, mergeProps, ref, unref, useSSRContext, withCtx } from "vue";
import { defineStore } from "pinia";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
//#region resources/js/Components/NewsletterForm.vue
var _sfc_main$1 = {
	__name: "NewsletterForm",
	__ssrInlineRender: true,
	setup(__props) {
		const form = useForm({ email: "" });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><form class="flex flex-col sm:flex-row gap-3"><div class="relative flex-1"><input${ssrRenderAttr("value", unref(form).email)} type="email" required placeholder="votre@email.com" class="w-full rounded-xl bg-arbor-glass/30 border border-arbor-glass-border px-4 py-3 text-sm text-arbor-cream placeholder:text-arbor-sage/50 focus:outline-none focus:ring-2 focus:ring-arbor-emerald/40 focus:border-arbor-emerald/40 transition-all">`);
			if (unref(form).errors.email) _push(`<div class="absolute -bottom-5 left-0 text-xs text-red-400">${ssrInterpolate(unref(form).errors.email)}</div>`);
			else _push(`<!---->`);
			_push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-arbor-moss to-arbor-moss-light text-white text-sm font-medium hover:shadow-lg hover:shadow-arbor-moss/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">`);
			if (unref(form).processing) _push(`<span>Inscription...</span>`);
			else _push(`<span>S&#39;inscrire</span>`);
			_push(`</button></form>`);
			if (_ctx.$page.props.flash?.success) _push(`<div class="mt-4 p-3 rounded-xl bg-arbor-emerald/10 border border-arbor-emerald/20 text-arbor-emerald text-sm">${ssrInterpolate(_ctx.$page.props.flash.success)}</div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NewsletterForm.vue");
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
		useConsentStore();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-arbor-night text-arbor-cream" }, _attrs))}><nav class="fixed top-0 left-0 right-0 z-[1000] bg-arbor-night/80 backdrop-blur-md border-b border-arbor-glass-border"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/",
				class: "flex items-center gap-3"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(ApplicationLogo_default, { class: "h-8 w-8 text-arbor-emerald shrink-0" }, null, _parent, _scopeId));
						_push(`<span class="font-display text-xl font-semibold tracking-tight"${_scopeId}>Arborisis</span>`);
					} else return [createVNode(ApplicationLogo_default, { class: "h-8 w-8 text-arbor-emerald shrink-0" }), createVNode("span", { class: "font-display text-xl font-semibold tracking-tight" }, "Arborisis")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="hidden md:flex items-center gap-6">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/sounds",
				class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sons `);
					else return [createTextVNode(" Sons ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/map",
				class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Carte `);
					else return [createTextVNode(" Carte ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/arborisis-map",
				class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Carte Arborisis `);
					else return [createTextVNode(" Carte Arborisis ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/creators",
				class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Créateurs `);
					else return [createTextVNode(" Créateurs ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/radio",
				class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Radio `);
					else return [createTextVNode(" Radio ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/contact",
				class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Contact `);
					else return [createTextVNode(" Contact ")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="w-px h-5 bg-arbor-glass-border"></div>`);
			if (_ctx.$page.props.auth.user) _push(ssrRenderComponent(unref(Link), {
				href: "/dashboard",
				class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
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
					class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Connexion `);
						else return [createTextVNode(" Connexion ")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Link), {
					href: "/register",
					class: "btn-primary text-sm px-4 py-2"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Rejoindre `);
						else return [createTextVNode(" Rejoindre ")];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			}
			_push(`</div><div class="flex items-center md:hidden"><button${ssrRenderAttr("aria-label", showingMobileMenu.value ? "Fermer le menu" : "Ouvrir le menu")}${ssrRenderAttr("aria-expanded", showingMobileMenu.value)} class="inline-flex items-center justify-center rounded-xl p-2 text-arbor-sage transition duration-150 ease-in-out hover:bg-arbor-glass hover:text-arbor-cream focus:outline-none"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
				hidden: showingMobileMenu.value,
				"inline-flex": !showingMobileMenu.value
			})}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
				hidden: !showingMobileMenu.value,
				"inline-flex": showingMobileMenu.value
			})}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{
				block: showingMobileMenu.value,
				hidden: !showingMobileMenu.value
			}, "md:hidden bg-arbor-deep/95 backdrop-blur-md border-b border-arbor-glass-border"])}"><div class="space-y-1 pb-3 pt-2 px-4">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/sounds",
				class: ["block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("sounds.*") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sons naturels `);
					else return [createTextVNode(" Sons naturels ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/map",
				class: ["block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("map") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Carte sonore `);
					else return [createTextVNode(" Carte sonore ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/arborisis-map",
				class: ["block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("arborisis-map.index") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Carte Arborisis `);
					else return [createTextVNode(" Carte Arborisis ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/creators",
				class: ["block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("creators.*") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Créateurs `);
					else return [createTextVNode(" Créateurs ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/radio",
				class: ["block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("radio.*") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Radio `);
					else return [createTextVNode(" Radio ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/contact",
				class: ["block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors", _ctx.route().current("contact") ? "text-arbor-emerald bg-arbor-emerald/10" : ""]
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
				class: "block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
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
					class: "block px-3 py-2 rounded-lg text-arbor-sage hover:text-arbor-cream hover:bg-arbor-glass transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Connexion `);
						else return [createTextVNode(" Connexion ")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Link), {
					href: "/register",
					class: "block px-3 py-2 mt-1 rounded-lg text-arbor-emerald bg-arbor-emerald/10 hover:bg-arbor-emerald/15 transition-colors font-medium"
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
			_push(`</main><footer class="border-t border-arbor-glass-border bg-arbor-deep"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-1 md:grid-cols-4 gap-8"><div class="md:col-span-2"><div class="flex items-center gap-3 mb-4">`);
			_push(ssrRenderComponent(ApplicationLogo_default, { class: "h-8 w-8 text-arbor-emerald shrink-0" }, null, _parent));
			_push(`<span class="font-display text-lg font-semibold">Arborisis</span></div><p class="text-arbor-sage text-sm max-w-sm leading-relaxed mb-6"> Une archive sonore vivante dédiée aux créateurs de field recording et aux amoureux de la nature. </p><div class="max-w-sm"><h4 class="text-xs font-medium text-arbor-cream uppercase tracking-wider mb-3">Newsletter</h4>`);
			_push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
			_push(`</div></div><div><h3 class="font-medium text-arbor-cream mb-4 text-sm">Explorer</h3><ul class="space-y-2 text-sm text-arbor-sage"><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/map",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Carte sonore`);
					else return [createTextVNode("Carte sonore")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/arborisis-map",
				class: "hover:text-arbor-emerald transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Carte Arborisis`);
					else return [createTextVNode("Carte Arborisis")];
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
			_push(`</li></ul></div><div><h3 class="font-medium text-arbor-cream mb-4 text-sm">Communauté</h3><ul class="space-y-2 text-sm text-arbor-sage"><li>`);
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
			_push(`</li><li><button class="hover:text-arbor-emerald transition-colors text-left">Cookies</button></li></ul></div><div><h3 class="font-medium text-arbor-cream mb-4 text-sm">Aide</h3><ul class="space-y-2 text-sm text-arbor-sage"><li>`);
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
			_push(`</li></ul></div></div><div class="mt-12 pt-8 border-t border-arbor-glass-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-arbor-sage"><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Arborisis. Tous droits réservés.</p>`);
			_push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
			_push(`</div></div></footer></div>`);
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
export { _sfc_main as t };
