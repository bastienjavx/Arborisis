import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-D-F0WtqU.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
//#region resources/js/Components/ApplicationLogo.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<img${ssrRenderAttrs(mergeProps({
		src: "/images/<redacted>-site-logo-white.svg",
		alt: "Arborisis"
	}, _attrs))}>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ApplicationLogo_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { ApplicationLogo_default as t };
