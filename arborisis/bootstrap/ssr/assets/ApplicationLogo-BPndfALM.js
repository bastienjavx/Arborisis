import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BjJHhBxR.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
//#region resources/js/Components/ApplicationLogo.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<svg${ssrRenderAttrs(mergeProps({
		viewBox: "0 0 32 32",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, _attrs))}><path d="M16 2C16 2 8 8 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 8 16 2 16 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path><path d="M16 24V30" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M12 28H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><circle cx="16" cy="14" r="3" stroke="currentColor" stroke-width="1.5" fill="none"></circle></svg>`);
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
