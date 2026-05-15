import { t as _sfc_main$1 } from "./ChatLayout-DU6mmbP-.js";
import { createBlock, createVNode, mergeProps, openBlock, useSSRContext, withCtx } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Chat/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		rooms: Array,
		conversations: Array
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, mergeProps({
				rooms: __props.rooms,
				conversations: __props.conversations
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="flex-1 flex items-center justify-center text-arbor-sage"${_scopeId}><div class="text-center"${_scopeId}><svg class="w-12 h-12 mx-auto mb-4 text-arbor-emerald/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"${_scopeId}></path></svg><h2 class="text-xl font-semibold text-arbor-cream mb-2"${_scopeId}>Bienvenue dans le chat</h2><p class="text-sm"${_scopeId}>Sélectionnez un salon ou une conversation pour commencer.</p></div></div>`);
					else return [createVNode("div", { class: "flex-1 flex items-center justify-center text-arbor-sage" }, [createVNode("div", { class: "text-center" }, [
						(openBlock(), createBlock("svg", {
							class: "w-12 h-12 mx-auto mb-4 text-arbor-emerald/50",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "1.5",
							d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						})])),
						createVNode("h2", { class: "text-xl font-semibold text-arbor-cream mb-2" }, "Bienvenue dans le chat"),
						createVNode("p", { class: "text-sm" }, "Sélectionnez un salon ou une conversation pour commencer.")
					])])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Chat/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
