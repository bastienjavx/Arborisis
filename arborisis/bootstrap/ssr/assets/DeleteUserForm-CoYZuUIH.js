import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BjJHhBxR.js";
import { n as _sfc_main$4, r as _sfc_main$6, t as _sfc_main$5 } from "./TextInput-D3-qAvbf.js";
import { useForm } from "@inertiajs/vue3";
import { computed, createTextVNode, createVNode, mergeProps, nextTick, onMounted, onUnmounted, ref, unref, useSSRContext, watch, withCtx, withKeys } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/DangerButton.vue
var _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 dark:focus:ring-offset-gray-800" }, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</button>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DangerButton.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var DangerButton_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region resources/js/Components/Modal.vue
var _sfc_main$2 = {
	__name: "Modal",
	__ssrInlineRender: true,
	props: {
		show: {
			type: Boolean,
			default: false
		},
		maxWidth: {
			type: String,
			default: "2xl"
		},
		closeable: {
			type: Boolean,
			default: true
		}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const dialog = ref();
		const showSlot = ref(props.show);
		watch(() => props.show, () => {
			if (props.show) {
				document.body.style.overflow = "hidden";
				showSlot.value = true;
				dialog.value?.showModal();
			} else {
				document.body.style.overflow = "";
				setTimeout(() => {
					dialog.value?.close();
					showSlot.value = false;
				}, 200);
			}
		});
		const close = () => {
			if (props.closeable) emit("close");
		};
		const closeOnEscape = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				if (props.show) close();
			}
		};
		onMounted(() => document.addEventListener("keydown", closeOnEscape));
		onUnmounted(() => {
			document.removeEventListener("keydown", closeOnEscape);
			document.body.style.overflow = "";
		});
		const maxWidthClass = computed(() => {
			return {
				sm: "sm:max-w-sm",
				md: "sm:max-w-md",
				lg: "sm:max-w-lg",
				xl: "sm:max-w-xl",
				"2xl": "sm:max-w-2xl"
			}[props.maxWidth];
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<dialog${ssrRenderAttrs(mergeProps({
				class: "z-50 m-0 min-h-full min-w-full overflow-y-auto bg-transparent backdrop:bg-transparent",
				ref_key: "dialog",
				ref: dialog
			}, _attrs))}><div class="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0" scroll-region><div class="fixed inset-0 transform transition-all" style="${ssrRenderStyle(__props.show ? null : { display: "none" })}"><div class="absolute inset-0 bg-arbor-night/80 backdrop-blur-sm"></div></div><div class="${ssrRenderClass([maxWidthClass.value, "mb-6 transform overflow-hidden rounded-2xl border border-arbor-glass-border bg-arbor-deep/95 backdrop-blur-xl shadow-2xl shadow-black/40 transition-all sm:mx-auto sm:w-full"])}" style="${ssrRenderStyle(__props.show ? null : { display: "none" })}">`);
			if (showSlot.value) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			else _push(`<!---->`);
			_push(`</div></div></dialog>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/SecondaryButton.vue
var _sfc_main$1 = {
	__name: "SecondaryButton",
	__ssrInlineRender: true,
	props: { type: {
		type: String,
		default: "button"
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				type: __props.type,
				class: "btn-secondary text-xs font-semibold uppercase tracking-widest disabled:opacity-25"
			}, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</button>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SecondaryButton.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Profile/Partials/DeleteUserForm.vue
var _sfc_main = {
	__name: "DeleteUserForm",
	__ssrInlineRender: true,
	setup(__props) {
		const confirmingUserDeletion = ref(false);
		const passwordInput = ref(null);
		const form = useForm({ password: "" });
		const confirmUserDeletion = () => {
			confirmingUserDeletion.value = true;
			nextTick(() => passwordInput.value.focus());
		};
		const deleteUser = () => {
			form.delete(route("profile.destroy"), {
				preserveScroll: true,
				onSuccess: () => closeModal(),
				onError: () => passwordInput.value.focus(),
				onFinish: () => form.reset()
			});
		};
		const closeModal = () => {
			confirmingUserDeletion.value = false;
			form.clearErrors();
			form.reset();
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><header><h2 class="text-lg font-medium text-arbor-cream"> Supprimer le compte </h2><p class="mt-1 text-sm text-arbor-sage"> Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Avant de supprimer votre compte, veuillez télécharger les données que vous souhaitez conserver. </p></header>`);
			_push(ssrRenderComponent(DangerButton_default, { onClick: confirmUserDeletion }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Supprimer le compte`);
					else return [createTextVNode("Supprimer le compte")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_sfc_main$2, {
				show: confirmingUserDeletion.value,
				onClose: closeModal
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-6"${_scopeId}><h2 class="text-lg font-medium text-arbor-cream"${_scopeId}> Êtes-vous sûr de vouloir supprimer votre compte ? </h2><p class="mt-1 text-sm text-arbor-sage"${_scopeId}> Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Veuillez saisir votre mot de passe pour confirmer que vous souhaitez supprimer définitivement votre compte. </p><div class="mt-6"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$4, {
							for: "password",
							value: "Mot de passe",
							class: "sr-only"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$5, {
							id: "password",
							ref_key: "passwordInput",
							ref: passwordInput,
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							type: "password",
							class: "mt-1 block w-3/4",
							placeholder: "Mot de passe",
							onKeyup: deleteUser
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$6, {
							message: unref(form).errors.password,
							class: "mt-2"
						}, null, _parent, _scopeId));
						_push(`</div><div class="mt-6 flex justify-end gap-3"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$1, { onClick: closeModal }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Annuler `);
								else return [createTextVNode(" Annuler ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(DangerButton_default, {
							class: { "opacity-25": unref(form).processing },
							disabled: unref(form).processing,
							onClick: deleteUser
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Supprimer le compte `);
								else return [createTextVNode(" Supprimer le compte ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "p-6" }, [
						createVNode("h2", { class: "text-lg font-medium text-arbor-cream" }, " Êtes-vous sûr de vouloir supprimer votre compte ? "),
						createVNode("p", { class: "mt-1 text-sm text-arbor-sage" }, " Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Veuillez saisir votre mot de passe pour confirmer que vous souhaitez supprimer définitivement votre compte. "),
						createVNode("div", { class: "mt-6" }, [
							createVNode(_sfc_main$4, {
								for: "password",
								value: "Mot de passe",
								class: "sr-only"
							}),
							createVNode(_sfc_main$5, {
								id: "password",
								ref_key: "passwordInput",
								ref: passwordInput,
								modelValue: unref(form).password,
								"onUpdate:modelValue": ($event) => unref(form).password = $event,
								type: "password",
								class: "mt-1 block w-3/4",
								placeholder: "Mot de passe",
								onKeyup: withKeys(deleteUser, ["enter"])
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$6, {
								message: unref(form).errors.password,
								class: "mt-2"
							}, null, 8, ["message"])
						]),
						createVNode("div", { class: "mt-6 flex justify-end gap-3" }, [createVNode(_sfc_main$1, { onClick: closeModal }, {
							default: withCtx(() => [createTextVNode(" Annuler ")]),
							_: 1
						}), createVNode(DangerButton_default, {
							class: { "opacity-25": unref(form).processing },
							disabled: unref(form).processing,
							onClick: deleteUser
						}, {
							default: withCtx(() => [createTextVNode(" Supprimer le compte ")]),
							_: 1
						}, 8, ["class", "disabled"])])
					])];
				}),
				_: 1
			}, _parent));
			_push(`</section>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
