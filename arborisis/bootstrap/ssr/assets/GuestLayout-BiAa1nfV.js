import { t as ApplicationLogo_default } from "./ApplicationLogo-BPndfALM.js";
import { Link } from "@inertiajs/vue3";
import { createTextVNode, createVNode, mergeProps, ref, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
//#region resources/js/Layouts/GuestLayout.vue
var _sfc_main = {
	__name: "GuestLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const showingMobileMenu = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-arbor-night text-arbor-cream" }, _attrs))}><nav class="fixed top-0 left-0 right-0 z-50 bg-arbor-night/80 backdrop-blur-md border-b border-arbor-glass-border"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16">`);
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
			_push(`<span class="font-display text-lg font-semibold">Arborisis</span></div><p class="text-arbor-sage text-sm max-w-sm leading-relaxed"> Une archive sonore vivante dédiée aux créateurs de field recording et aux amoureux de la nature. </p></div><div><h3 class="font-medium text-arbor-cream mb-4 text-sm">Explorer</h3><ul class="space-y-2 text-sm text-arbor-sage"><li>`);
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
			_push(`</li></ul></div></div><div class="mt-12 pt-8 border-t border-arbor-glass-border text-center text-xs text-arbor-sage"><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Arborisis. Tous droits réservés.</p></div></div></footer></div>`);
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
