import { t as _sfc_main$1 } from "./AuthenticatedLayout-Ct-jPMsT.js";
import { Head, Link } from "@inertiajs/vue3";
import { createBlock, createTextVNode, createVNode, openBlock, unref, useSSRContext, withCtx } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Wallet/Cancel.vue
var _sfc_main = {
	__name: "Cancel",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Paiement annulé" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night flex items-center justify-center"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arbor-amber/5 rounded-full blur-3xl"${_scopeId}></div></div><div class="relative z-10 max-w-md w-full mx-4"${_scopeId}><div class="glass-card p-10 text-center animate-slide-up"${_scopeId}><div class="w-20 h-20 rounded-full bg-arbor-amber/10 flex items-center justify-center mx-auto mb-6"${_scopeId}><svg class="w-10 h-10 text-arbor-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></div><h1 class="font-display text-3xl font-semibold text-arbor-cream mb-3"${_scopeId}> Paiement annulé </h1><p class="text-arbor-sage leading-relaxed mb-8"${_scopeId}> Le paiement a été annulé. Aucun montant n&#39;a été débité. Vous pouvez réessayer quand vous le souhaitez. </p><div class="space-y-3"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/wallet",
							class: "btn-amber w-full justify-center"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Réessayer `);
								else return [createTextVNode(" Réessayer ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: "/dashboard",
							class: "btn-secondary w-full justify-center"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Retour au dashboard `);
								else return [createTextVNode(" Retour au dashboard ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night flex items-center justify-center" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arbor-amber/5 rounded-full blur-3xl" })]), createVNode("div", { class: "relative z-10 max-w-md w-full mx-4" }, [createVNode("div", { class: "glass-card p-10 text-center animate-slide-up" }, [
						createVNode("div", { class: "w-20 h-20 rounded-full bg-arbor-amber/10 flex items-center justify-center mx-auto mb-6" }, [(openBlock(), createBlock("svg", {
							class: "w-10 h-10 text-arbor-amber",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M6 18L18 6M6 6l12 12"
						})]))]),
						createVNode("h1", { class: "font-display text-3xl font-semibold text-arbor-cream mb-3" }, " Paiement annulé "),
						createVNode("p", { class: "text-arbor-sage leading-relaxed mb-8" }, " Le paiement a été annulé. Aucun montant n'a été débité. Vous pouvez réessayer quand vous le souhaitez. "),
						createVNode("div", { class: "space-y-3" }, [createVNode(unref(Link), {
							href: "/wallet",
							class: "btn-amber w-full justify-center"
						}, {
							default: withCtx(() => [createTextVNode(" Réessayer ")]),
							_: 1
						}), createVNode(unref(Link), {
							href: "/dashboard",
							class: "btn-secondary w-full justify-center"
						}, {
							default: withCtx(() => [createTextVNode(" Retour au dashboard ")]),
							_: 1
						})])
					])])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Wallet/Cancel.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
