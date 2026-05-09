import { mergeProps, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs } from "vue/server-renderer";
//#region resources/js/Components/Social/FollowButton.vue
var _sfc_main = {
	__name: "FollowButton",
	__ssrInlineRender: true,
	props: {
		userId: Number,
		initialFollowing: Boolean,
		size: {
			type: String,
			default: "md"
		}
	},
	setup(__props) {
		const following = ref(__props.initialFollowing);
		const loading = ref(false);
		const sizeClasses = {
			sm: "px-3 py-1.5 text-xs",
			md: "px-4 py-2 text-sm",
			lg: "px-6 py-3 text-base"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				disabled: loading.value,
				class: ["rounded-lg font-medium transition-colors disabled:opacity-50", [sizeClasses[__props.size], following.value ? "bg-arbor-glass text-arbor-sage hover:bg-arbor-glass/50 border border-arbor-glass" : "bg-arbor-emerald text-arbor-night hover:bg-arbor-emerald-dark"]]
			}, _attrs))}>${ssrInterpolate(following.value ? "Suivi" : "Suivre")}</button>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Social/FollowButton.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as t };
