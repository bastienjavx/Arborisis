import { Link } from "@inertiajs/vue3";
import { createTextVNode, mergeProps, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Components/Breadcrumb.vue
var _sfc_main = {
	__name: "Breadcrumb",
	__ssrInlineRender: true,
	props: { items: {
		type: Array,
		required: true
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<nav${ssrRenderAttrs(mergeProps({
				"aria-label": "Fil d'Ariane",
				class: "mb-6"
			}, _attrs))}><ol class="flex items-center gap-2 text-sm text-arbor-sage"><!--[-->`);
			ssrRenderList(__props.items, (item, index) => {
				_push(`<li class="flex items-center gap-2">`);
				if (index > 0) _push(`<span aria-hidden="true" class="text-arbor-sage/30">/</span>`);
				else _push(`<!---->`);
				if (item.href && index < __props.items.length - 1) _push(ssrRenderComponent(unref(Link), {
					href: item.href,
					class: "hover:text-arbor-emerald transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.label)}`);
						else return [createTextVNode(toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
				else _push(`<span class="text-arbor-cream">${ssrInterpolate(item.label)}</span>`);
				_push(`</li>`);
			});
			_push(`<!--]--></ol></nav>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Breadcrumb.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as t };
