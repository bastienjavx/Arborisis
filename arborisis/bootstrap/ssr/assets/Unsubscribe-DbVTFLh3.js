import { t as _sfc_main$1 } from "./GuestLayout-30iBKZwO.js";
import { Head } from "@inertiajs/vue3";
import { createBlock, createTextVNode, createVNode, openBlock, unref, useSSRContext, withCtx } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Newsletter/Unsubscribe.vue
var _sfc_main = {
	__name: "Unsubscribe",
	__ssrInlineRender: true,
	props: { success: Boolean },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Désinscription" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night flex items-center justify-center px-4"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40"${_scopeId}></div></div><div class="relative z-10 max-w-md w-full"${_scopeId}><div class="text-center mb-8"${_scopeId}><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-arbor-emerald/10 mb-6"${_scopeId}><svg class="w-8 h-8 text-arbor-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"${_scopeId}></path></svg></div></div>`);
						if (__props.success) _push(`<div class="text-center p-8 rounded-2xl bg-arbor-glass/30 border border-arbor-glass-border backdrop-blur-sm"${_scopeId}><h1 class="font-display text-3xl font-semibold text-arbor-cream mb-4"${_scopeId}> À bientôt </h1><p class="text-arbor-sage leading-relaxed mb-6"${_scopeId}> Vous avez été désinscrit de notre newsletter. Vous ne recevrez plus nos communications. </p><p class="text-arbor-sage text-sm opacity-70"${_scopeId}> Vous pouvez vous réinscrire à tout moment depuis le site. </p></div>`);
						else _push(`<div class="text-center p-8 rounded-2xl bg-arbor-glass/30 border border-arbor-glass-border backdrop-blur-sm"${_scopeId}><h1 class="font-display text-3xl font-semibold text-arbor-cream mb-4"${_scopeId}> Lien invalide </h1><p class="text-arbor-sage leading-relaxed mb-6"${_scopeId}> Ce lien de désinscription est invalide ou a déjà été utilisé. </p><a href="/" class="inline-flex items-center text-arbor-emerald hover:text-arbor-emerald-dark transition-colors text-sm font-medium"${_scopeId}> Retour à l&#39;accueil <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"${_scopeId}></path></svg></a></div>`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night flex items-center justify-center px-4" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40" })]), createVNode("div", { class: "relative z-10 max-w-md w-full" }, [createVNode("div", { class: "text-center mb-8" }, [createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-arbor-emerald/10 mb-6" }, [(openBlock(), createBlock("svg", {
						class: "w-8 h-8 text-arbor-emerald",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "1.5"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
					})]))])]), __props.success ? (openBlock(), createBlock("div", {
						key: 0,
						class: "text-center p-8 rounded-2xl bg-arbor-glass/30 border border-arbor-glass-border backdrop-blur-sm"
					}, [
						createVNode("h1", { class: "font-display text-3xl font-semibold text-arbor-cream mb-4" }, " À bientôt "),
						createVNode("p", { class: "text-arbor-sage leading-relaxed mb-6" }, " Vous avez été désinscrit de notre newsletter. Vous ne recevrez plus nos communications. "),
						createVNode("p", { class: "text-arbor-sage text-sm opacity-70" }, " Vous pouvez vous réinscrire à tout moment depuis le site. ")
					])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "text-center p-8 rounded-2xl bg-arbor-glass/30 border border-arbor-glass-border backdrop-blur-sm"
					}, [
						createVNode("h1", { class: "font-display text-3xl font-semibold text-arbor-cream mb-4" }, " Lien invalide "),
						createVNode("p", { class: "text-arbor-sage leading-relaxed mb-6" }, " Ce lien de désinscription est invalide ou a déjà été utilisé. "),
						createVNode("a", {
							href: "/",
							class: "inline-flex items-center text-arbor-emerald hover:text-arbor-emerald-dark transition-colors text-sm font-medium"
						}, [createTextVNode(" Retour à l'accueil "), (openBlock(), createBlock("svg", {
							class: "w-4 h-4 ml-1",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							"stroke-width": "2"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							d: "M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
						})]))])
					]))])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Newsletter/Unsubscribe.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
