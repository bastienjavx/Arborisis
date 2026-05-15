import { t as _sfc_main$1 } from "./GuestLayout-30iBKZwO.js";
import { n as _sfc_main$2, r as _sfc_main$4, t as _sfc_main$3 } from "./TextInput-BZZClIMG.js";
import { t as PrimaryButton_default } from "./PrimaryButton-CErzNidA.js";
import { Head, useForm } from "@inertiajs/vue3";
import { createBlock, createVNode, onMounted, openBlock, ref, unref, useSSRContext, withCtx, withModifiers } from "vue";
import { ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Auth/ConfirmPassword.vue
var _sfc_main = {
	__name: "ConfirmPassword",
	__ssrInlineRender: true,
	setup(__props) {
		const form = useForm({ password: "" });
		const submit = () => {
			form.post(route("password.confirm"), { onFinish: () => form.reset() });
		};
		const mounted = ref(false);
		onMounted(() => {
			setTimeout(() => {
				mounted.value = true;
			}, 50);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Confirmer le mot de passe" }, null, _parent, _scopeId));
						_push(`<div class="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16 py-12"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none"${_scopeId}><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90", "absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-arbor-moss/10 blur-[100px] transition-all duration-1000"])}"${_scopeId}></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90", "absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full bg-arbor-emerald/5 blur-[120px] transition-all duration-1000 delay-200"])}"${_scopeId}></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90", "absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-arbor-amber/5 blur-[80px] transition-all duration-1000 delay-300"])}"${_scopeId}></div><svg viewBox="0 0 100 100" fill="currentColor" class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "absolute top-24 right-[12%] w-28 h-28 text-arbor-moss/10 animate-pulse-slow"])}" style="${ssrRenderStyle({ "transition": "all 0.8s ease-out 0.4s" })}"${_scopeId}><path d="M50 5 C20 5 5 30 5 55 C5 80 25 95 50 95 C75 95 95 80 95 55 C95 30 80 5 50 5 Z M50 85 C30 85 15 70 15 55 C15 35 30 20 50 20 C70 20 85 35 85 55 C85 70 70 85 50 85 Z"${_scopeId}></path></svg><svg viewBox="0 0 100 100" fill="currentColor" class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "absolute bottom-24 left-[12%] w-20 h-20 text-arbor-emerald/10 animate-pulse-slow"])}" style="${ssrRenderStyle({
							"animation-delay": "2s",
							"transition": "all 0.8s ease-out 0.5s"
						})}"${_scopeId}><path d="M50 10 Q30 40 10 50 Q30 60 50 90 Q70 60 90 50 Q70 40 50 10 Z"${_scopeId}></path></svg><div class="absolute inset-0 opacity-[0.02]" style="${ssrRenderStyle({
							"background-image": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
							"background-size": "40px 40px"
						})}"${_scopeId}></div></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6", "relative z-10 w-full max-w-md mx-auto px-4 sm:px-6"])}" style="${ssrRenderStyle({ "transition": "all 0.7s ease-out 0.2s" })}"${_scopeId}><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-95", "glass-card p-8 sm:p-10 relative overflow-hidden"])}" style="${ssrRenderStyle({ "transition": "all 0.6s ease-out 0.3s" })}"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-arbor-emerald/40 to-transparent"${_scopeId}></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "text-center mb-8"])}" style="${ssrRenderStyle({ "transition": "all 0.6s ease-out 0.4s" })}"${_scopeId}><div class="${ssrRenderClass([mounted.value ? "scale-100" : "scale-90", "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-arbor-moss/20 mb-5 ring-1 ring-arbor-emerald/20"])}" style="${ssrRenderStyle({ "transition": "transform 0.5s ease-out 0.5s" })}"${_scopeId}><svg class="w-7 h-7 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"${_scopeId}></path></svg></div><h1 class="font-display text-3xl font-bold text-arbor-cream mb-2"${_scopeId}> Zone sécurisée </h1><p class="text-arbor-sage text-sm"${_scopeId}> Confirmez votre identité pour continuer </p></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3", "mb-6 text-sm text-arbor-sage leading-relaxed"])}" style="${ssrRenderStyle({ "transition": "all 0.5s ease-out 0.5s" })}"${_scopeId}> Cette zone de l&#39;application est sécurisée. Veuillez confirmer votre mot de passe avant de continuer. </div><form class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "space-y-5"])}" style="${ssrRenderStyle({ "transition": "opacity 0.6s ease-out 0.55s" })}"${_scopeId}><div class="${ssrRenderClass(mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")}" style="${ssrRenderStyle({ "transition": "all 0.5s ease-out 0.6s" })}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							for: "password",
							value: "Mot de passe"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$3, {
							id: "password",
							type: "password",
							class: "mt-1 block w-full",
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							required: "",
							autocomplete: "current-password",
							autofocus: "",
							placeholder: "••••••••"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$4, {
							class: "mt-2",
							message: unref(form).errors.password
						}, null, _parent, _scopeId));
						_push(`</div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3", "flex justify-end pt-2"])}" style="${ssrRenderStyle({ "transition": "all 0.5s ease-out 0.7s" })}"${_scopeId}>`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: { "opacity-50 cursor-wait": unref(form).processing },
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (unref(form).processing) _push(`<span${_scopeId}>Vérification...</span>`);
								else _push(`<span${_scopeId}>Confirmer</span>`);
								else return [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Vérification...")) : (openBlock(), createBlock("span", { key: 1 }, "Confirmer"))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form></div></div></div>`);
					} else return [createVNode(unref(Head), { title: "Confirmer le mot de passe" }), createVNode("div", { class: "relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16 py-12" }, [createVNode("div", { class: "absolute inset-0 overflow-hidden pointer-events-none" }, [
						createVNode("div", { class: ["absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-arbor-moss/10 blur-[100px] transition-all duration-1000", mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90"] }, null, 2),
						createVNode("div", { class: ["absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full bg-arbor-emerald/5 blur-[120px] transition-all duration-1000 delay-200", mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90"] }, null, 2),
						createVNode("div", { class: ["absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-arbor-amber/5 blur-[80px] transition-all duration-1000 delay-300", mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90"] }, null, 2),
						(openBlock(), createBlock("svg", {
							class: ["absolute top-24 right-[12%] w-28 h-28 text-arbor-moss/10 animate-pulse-slow", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"],
							viewBox: "0 0 100 100",
							fill: "currentColor",
							style: { "transition": "all 0.8s ease-out 0.4s" }
						}, [createVNode("path", { d: "M50 5 C20 5 5 30 5 55 C5 80 25 95 50 95 C75 95 95 80 95 55 C95 30 80 5 50 5 Z M50 85 C30 85 15 70 15 55 C15 35 30 20 50 20 C70 20 85 35 85 55 C85 70 70 85 50 85 Z" })], 2)),
						(openBlock(), createBlock("svg", {
							class: ["absolute bottom-24 left-[12%] w-20 h-20 text-arbor-emerald/10 animate-pulse-slow", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"],
							viewBox: "0 0 100 100",
							fill: "currentColor",
							style: {
								"animation-delay": "2s",
								"transition": "all 0.8s ease-out 0.5s"
							}
						}, [createVNode("path", { d: "M50 10 Q30 40 10 50 Q30 60 50 90 Q70 60 90 50 Q70 40 50 10 Z" })], 2)),
						createVNode("div", {
							class: "absolute inset-0 opacity-[0.02]",
							style: {
								"background-image": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
								"background-size": "40px 40px"
							}
						})
					]), createVNode("div", {
						class: ["relative z-10 w-full max-w-md mx-auto px-4 sm:px-6", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"],
						style: { "transition": "all 0.7s ease-out 0.2s" }
					}, [createVNode("div", {
						class: ["glass-card p-8 sm:p-10 relative overflow-hidden", mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-95"],
						style: { "transition": "all 0.6s ease-out 0.3s" }
					}, [
						createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-arbor-emerald/40 to-transparent" }),
						createVNode("div", {
							class: ["text-center mb-8", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"],
							style: { "transition": "all 0.6s ease-out 0.4s" }
						}, [
							createVNode("div", {
								class: ["inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-arbor-moss/20 mb-5 ring-1 ring-arbor-emerald/20", mounted.value ? "scale-100" : "scale-90"],
								style: { "transition": "transform 0.5s ease-out 0.5s" }
							}, [(openBlock(), createBlock("svg", {
								class: "w-7 h-7 text-arbor-emerald",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
							})]))], 2),
							createVNode("h1", { class: "font-display text-3xl font-bold text-arbor-cream mb-2" }, " Zone sécurisée "),
							createVNode("p", { class: "text-arbor-sage text-sm" }, " Confirmez votre identité pour continuer ")
						], 2),
						createVNode("div", {
							class: ["mb-6 text-sm text-arbor-sage leading-relaxed", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"],
							style: { "transition": "all 0.5s ease-out 0.5s" }
						}, " Cette zone de l'application est sécurisée. Veuillez confirmer votre mot de passe avant de continuer. ", 2),
						createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: ["space-y-5", mounted.value ? "opacity-100" : "opacity-0"],
							style: { "transition": "opacity 0.6s ease-out 0.55s" }
						}, [createVNode("div", {
							class: mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
							style: { "transition": "all 0.5s ease-out 0.6s" }
						}, [
							createVNode(_sfc_main$2, {
								for: "password",
								value: "Mot de passe"
							}),
							createVNode(_sfc_main$3, {
								id: "password",
								type: "password",
								class: "mt-1 block w-full",
								modelValue: unref(form).password,
								"onUpdate:modelValue": ($event) => unref(form).password = $event,
								required: "",
								autocomplete: "current-password",
								autofocus: "",
								placeholder: "••••••••"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_sfc_main$4, {
								class: "mt-2",
								message: unref(form).errors.password
							}, null, 8, ["message"])
						], 2), createVNode("div", {
							class: ["flex justify-end pt-2", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"],
							style: { "transition": "all 0.5s ease-out 0.7s" }
						}, [createVNode(PrimaryButton_default, {
							class: { "opacity-50 cursor-wait": unref(form).processing },
							disabled: unref(form).processing
						}, {
							default: withCtx(() => [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Vérification...")) : (openBlock(), createBlock("span", { key: 1 }, "Confirmer"))]),
							_: 1
						}, 8, ["class", "disabled"])], 2)], 34)
					], 2)], 2)])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
