import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BjJHhBxR.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
//#region resources/js/Components/PrimaryButton.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center justify-center rounded-xl border border-transparent bg-arbor-moss px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-arbor-moss-light hover:shadow-lg hover:shadow-arbor-moss/25 focus:outline-none focus:ring-2 focus:ring-arbor-emerald focus:ring-offset-2 focus:ring-offset-arbor-night active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed" }, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</button>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PrimaryButton.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PrimaryButton_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { PrimaryButton_default as t };
