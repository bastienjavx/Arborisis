import { t as PrimaryButton_default } from "./PrimaryButton-CErzNidA.js";
import { useForm, usePage } from "@inertiajs/vue3";
import { computed, createTextVNode, ref, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Profile/Partials/UpdateAvatarForm.vue
var _sfc_main = {
	__name: "UpdateAvatarForm",
	__ssrInlineRender: true,
	props: { avatarUrl: {
		type: String,
		default: null
	} },
	setup(__props) {
		const props = __props;
		const user = usePage().props.auth.user;
		const fileInput = ref(null);
		const previewUrl = ref(null);
		const form = useForm({ avatar: null });
		const displayUrl = computed(() => previewUrl.value ?? props.avatarUrl);
		const submit = () => {
			if (!form.avatar) return;
			form.post(route("profile.avatar"), {
				forceFormData: true,
				onSuccess: () => {
					previewUrl.value = null;
					if (fileInput.value) fileInput.value.value = "";
				}
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-arbor-cream"> Photo de profil </h2><p class="mt-1 text-sm text-arbor-sage"> Choisissez une image pour votre profil public. </p></header><div class="mt-6 flex items-center gap-6"><div class="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-arbor-glass-border/50 bg-arbor-moss/30 flex items-center justify-center shrink-0 cursor-pointer group">`);
			if (displayUrl.value) _push(`<img${ssrRenderAttr("src", displayUrl.value)}${ssrRenderAttr("alt", unref(user).name)} class="w-full h-full object-cover">`);
			else _push(`<span class="text-3xl font-display font-bold text-arbor-emerald">${ssrInterpolate(unref(user).name?.charAt(0)?.toUpperCase() ?? "?")}</span>`);
			_push(`<div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div></div><div class="flex-1"><input type="file" accept="image/*" class="hidden"><button type="button" class="text-sm text-arbor-emerald hover:text-arbor-emerald/80 underline underline-offset-2"> Choisir une image </button><p class="text-xs text-arbor-sage/60 mt-1"> JPG, PNG. Max 2 Mo. </p>`);
			if (unref(form).errors.avatar) _push(`<p class="text-xs text-rose-400 mt-1">${ssrInterpolate(unref(form).errors.avatar)}</p>`);
			else _push(`<!---->`);
			_push(`</div></div>`);
			if (unref(form).avatar) {
				_push(`<div class="mt-4 flex items-center gap-4">`);
				_push(ssrRenderComponent(PrimaryButton_default, {
					disabled: unref(form).processing,
					onClick: submit
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(form).processing ? "Envoi..." : "Enregistrer la photo")}`);
						else return [createTextVNode(toDisplayString(unref(form).processing ? "Envoi..." : "Enregistrer la photo"), 1)];
					}),
					_: 1
				}, _parent));
				_push(`<button type="button" class="text-sm text-arbor-sage hover:text-arbor-cream"> Annuler </button></div>`);
			} else _push(`<!---->`);
			_push(`</section>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateAvatarForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
