import { t as _sfc_main$2 } from "./GuestLayout-30iBKZwO.js";
import { n as _sfc_main$3, r as _sfc_main$5, t as _sfc_main$4 } from "./TextInput-BZZClIMG.js";
import { t as PrimaryButton_default } from "./PrimaryButton-CErzNidA.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, onMounted, openBlock, ref, toDisplayString, unref, useSSRContext, withCtx, withModifiers } from "vue";
import { ssrGetDynamicModelProps, ssrInterpolate, ssrLooseContain, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/Checkbox.vue
var _sfc_main$1 = {
	__name: "Checkbox",
	__ssrInlineRender: true,
	props: {
		checked: {
			type: [Array, Boolean],
			required: true
		},
		value: { default: null }
	},
	emits: ["update:checked"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const props = __props;
		const proxyChecked = computed({
			get() {
				return props.checked;
			},
			set(val) {
				emit("update:checked", val);
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			let _temp0;
			_push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
				type: "checkbox",
				value: __props.value,
				checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
				class: "rounded border-arbor-fog/60 bg-arbor-charcoal/80 text-arbor-emerald shadow-sm focus:ring-arbor-emerald/40 focus:ring-offset-arbor-night"
			}, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Auth/Login.vue
var _sfc_main = {
	__name: "Login",
	__ssrInlineRender: true,
	props: {
		canResetPassword: { type: Boolean },
		status: { type: String }
	},
	setup(__props) {
		const form = useForm({
			email: "",
			password: "",
			remember: false
		});
		const mounted = ref(false);
		onMounted(() => {
			setTimeout(() => {
				mounted.value = true;
			}, 50);
		});
		const submit = () => {
			form.post(route("login"), { onFinish: () => form.reset("password") });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$2, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Connexion" }, null, _parent, _scopeId));
						_push(`<div class="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none"${_scopeId}><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90", "absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-arbor-moss/10 blur-[100px] transition-all duration-1000"])}"${_scopeId}></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90", "absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-arbor-emerald/5 blur-[120px] transition-all duration-1000 delay-200"])}"${_scopeId}></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90", "absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-arbor-amber/5 blur-[80px] transition-all duration-1000 delay-300"])}"${_scopeId}></div><svg viewBox="0 0 100 100" fill="currentColor" class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "absolute top-20 right-[15%] w-32 h-32 text-arbor-moss/10 animate-pulse-slow transition-all duration-800"])}" style="${ssrRenderStyle({ "transition-delay": "0.4s" })}"${_scopeId}><path d="M50 5 C20 5 5 30 5 55 C5 80 25 95 50 95 C75 95 95 80 95 55 C95 30 80 5 50 5 Z M50 85 C30 85 15 70 15 55 C15 35 30 20 50 20 C70 20 85 35 85 55 C85 70 70 85 50 85 Z"${_scopeId}></path></svg><svg viewBox="0 0 100 100" fill="currentColor" style="${ssrRenderStyle({ "animation-delay": "2s" })}" class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "absolute bottom-32 left-[10%] w-24 h-24 text-arbor-emerald/10 animate-pulse-slow"])}"${_scopeId}><path d="M50 10 Q30 40 10 50 Q30 60 50 90 Q70 60 90 50 Q70 40 50 10 Z"${_scopeId}></path></svg><div class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "absolute bottom-[20%] right-[8%] flex items-end gap-1 h-16"])}" style="${ssrRenderStyle({ "transition": "opacity 1s ease-out 0.6s" })}"${_scopeId}><div class="w-0.5 bg-arbor-emerald/20 rounded-full animate-wave" style="${ssrRenderStyle({
							"height": "20px",
							"animation-delay": "0s"
						})}"${_scopeId}></div><div class="w-0.5 bg-arbor-emerald/20 rounded-full animate-wave" style="${ssrRenderStyle({
							"height": "40px",
							"animation-delay": "0.1s"
						})}"${_scopeId}></div><div class="w-0.5 bg-arbor-emerald/20 rounded-full animate-wave" style="${ssrRenderStyle({
							"height": "30px",
							"animation-delay": "0.2s"
						})}"${_scopeId}></div><div class="w-0.5 bg-arbor-emerald/20 rounded-full animate-wave" style="${ssrRenderStyle({
							"height": "50px",
							"animation-delay": "0.3s"
						})}"${_scopeId}></div><div class="w-0.5 bg-arbor-emerald/20 rounded-full animate-wave" style="${ssrRenderStyle({
							"height": "25px",
							"animation-delay": "0.15s"
						})}"${_scopeId}></div><div class="w-0.5 bg-arbor-emerald/20 rounded-full animate-wave" style="${ssrRenderStyle({
							"height": "35px",
							"animation-delay": "0.25s"
						})}"${_scopeId}></div><div class="w-0.5 bg-arbor-emerald/20 rounded-full animate-wave" style="${ssrRenderStyle({
							"height": "15px",
							"animation-delay": "0.05s"
						})}"${_scopeId}></div></div><div class="absolute inset-0 opacity-[0.02]" style="${ssrRenderStyle({
							"background-image": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
							"background-size": "40px 40px"
						})}"${_scopeId}></div></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6", "relative z-10 w-full max-w-md mx-auto px-4 sm:px-6"])}" style="${ssrRenderStyle({ "transition": "all 0.7s ease-out 0.2s" })}"${_scopeId}><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-95", "glass-card p-8 sm:p-10 relative overflow-hidden"])}" style="${ssrRenderStyle({ "transition": "all 0.6s ease-out 0.3s" })}"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-arbor-emerald/40 to-transparent"${_scopeId}></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "text-center mb-8"])}" style="${ssrRenderStyle({ "transition": "all 0.6s ease-out 0.4s" })}"${_scopeId}><div class="${ssrRenderClass([mounted.value ? "scale-100" : "scale-90", "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-arbor-moss/20 mb-5 ring-1 ring-arbor-emerald/20"])}" style="${ssrRenderStyle({ "transition": "transform 0.5s ease-out 0.5s" })}"${_scopeId}><svg class="w-7 h-7 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"${_scopeId}></path></svg></div><h1 class="font-display text-3xl font-bold text-arbor-cream mb-2"${_scopeId}> Bon retour </h1><p class="text-arbor-sage text-sm"${_scopeId}> Connectez-vous pour explorer les sons de la nature </p></div>`);
						if (__props.status) _push(`<div class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "mb-6 p-3 rounded-lg bg-arbor-emerald/10 border border-arbor-emerald/20 text-sm text-arbor-emerald text-center"])}" style="${ssrRenderStyle({ "transition": "opacity 0.5s ease-out 0.45s" })}"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
						else _push(`<!---->`);
						_push(`<form class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "space-y-5"])}" style="${ssrRenderStyle({ "transition": "opacity 0.6s ease-out 0.5s" })}"${_scopeId}><div class="${ssrRenderClass(mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")}" style="${ssrRenderStyle({ "transition": "all 0.5s ease-out 0.55s" })}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$3, {
							for: "email",
							value: "Adresse e-mail"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$4, {
							id: "email",
							type: "email",
							class: "mt-1 block w-full",
							modelValue: unref(form).email,
							"onUpdate:modelValue": ($event) => unref(form).email = $event,
							required: "",
							autofocus: "",
							autocomplete: "username",
							placeholder: "vous@exemple.com"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$5, {
							class: "mt-2",
							message: unref(form).errors.email
						}, null, _parent, _scopeId));
						_push(`</div><div class="${ssrRenderClass(mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")}" style="${ssrRenderStyle({ "transition": "all 0.5s ease-out 0.6s" })}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$3, {
							for: "password",
							value: "Mot de passe"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$4, {
							id: "password",
							type: "password",
							class: "mt-1 block w-full",
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							required: "",
							autocomplete: "current-password",
							placeholder: "••••••••"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$5, {
							class: "mt-2",
							message: unref(form).errors.password
						}, null, _parent, _scopeId));
						_push(`</div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3", "flex items-center justify-between"])}" style="${ssrRenderStyle({ "transition": "all 0.5s ease-out 0.65s" })}"${_scopeId}><label class="flex items-center gap-2.5 cursor-pointer group"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$1, {
							name: "remember",
							checked: unref(form).remember,
							"onUpdate:checked": ($event) => unref(form).remember = $event
						}, null, _parent, _scopeId));
						_push(`<span class="text-sm text-arbor-sage group-hover:text-arbor-cream transition-colors"${_scopeId}>Se souvenir de moi</span></label>`);
						if (__props.canResetPassword) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("password.request"),
							class: "text-sm text-arbor-emerald hover:text-arbor-emerald-dark transition-colors hover:underline underline-offset-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Mot de passe oublié ? `);
								else return [createTextVNode(" Mot de passe oublié ? ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3", "pt-2"])}" style="${ssrRenderStyle({ "transition": "all 0.5s ease-out 0.7s" })}"${_scopeId}>`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: ["w-full justify-center py-3.5 text-base", { "opacity-50 cursor-wait": unref(form).processing }],
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (unref(form).processing) _push(`<span${_scopeId}>Connexion...</span>`);
								else _push(`<span${_scopeId}>Se connecter</span>`);
								else return [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Connexion...")) : (openBlock(), createBlock("span", { key: 1 }, "Se connecter"))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form><div class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "relative my-6"])}" style="${ssrRenderStyle({ "transition": "opacity 0.5s ease-out 0.75s" })}"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><div class="w-full border-t border-arbor-glass-border"${_scopeId}></div></div><div class="relative flex justify-center text-xs"${_scopeId}><span class="bg-arbor-deep px-3 text-arbor-sage/60"${_scopeId}>ou</span></div></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3", "text-center"])}" style="${ssrRenderStyle({ "transition": "all 0.5s ease-out 0.8s" })}"${_scopeId}><p class="text-sm text-arbor-sage"${_scopeId}> Pas encore de compte ? `);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("register"),
							class: "text-arbor-emerald hover:text-arbor-emerald-dark font-medium transition-colors hover:underline underline-offset-4 ml-1"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Rejoindre Arborisis `);
								else return [createTextVNode(" Rejoindre Arborisis ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</p></div></div><div class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "mt-6 text-center"])}" style="${ssrRenderStyle({ "transition": "opacity 0.5s ease-out 0.9s" })}"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/",
							class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors inline-flex items-center gap-1.5"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Retour à l&#39;accueil `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M10 19l-7-7m0 0l7-7m-7 7h18"
								})])), createTextVNode(" Retour à l'accueil ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></div>`);
					} else return [createVNode(unref(Head), { title: "Connexion" }), createVNode("div", { class: "relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16" }, [createVNode("div", { class: "absolute inset-0 overflow-hidden pointer-events-none" }, [
						createVNode("div", { class: ["absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-arbor-moss/10 blur-[100px] transition-all duration-1000", mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90"] }, null, 2),
						createVNode("div", { class: ["absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-arbor-emerald/5 blur-[120px] transition-all duration-1000 delay-200", mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90"] }, null, 2),
						createVNode("div", { class: ["absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-arbor-amber/5 blur-[80px] transition-all duration-1000 delay-300", mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90"] }, null, 2),
						(openBlock(), createBlock("svg", {
							class: ["absolute top-20 right-[15%] w-32 h-32 text-arbor-moss/10 animate-pulse-slow transition-all duration-800", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"],
							viewBox: "0 0 100 100",
							fill: "currentColor",
							style: { "transition-delay": "0.4s" }
						}, [createVNode("path", { d: "M50 5 C20 5 5 30 5 55 C5 80 25 95 50 95 C75 95 95 80 95 55 C95 30 80 5 50 5 Z M50 85 C30 85 15 70 15 55 C15 35 30 20 50 20 C70 20 85 35 85 55 C85 70 70 85 50 85 Z" })], 2)),
						(openBlock(), createBlock("svg", {
							class: ["absolute bottom-32 left-[10%] w-24 h-24 text-arbor-emerald/10 animate-pulse-slow", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"],
							viewBox: "0 0 100 100",
							fill: "currentColor",
							style: { "animation-delay": "2s" }
						}, [createVNode("path", { d: "M50 10 Q30 40 10 50 Q30 60 50 90 Q70 60 90 50 Q70 40 50 10 Z" })], 2)),
						createVNode("div", {
							class: ["absolute bottom-[20%] right-[8%] flex items-end gap-1 h-16", mounted.value ? "opacity-100" : "opacity-0"],
							style: { "transition": "opacity 1s ease-out 0.6s" }
						}, [
							createVNode("div", {
								class: "w-0.5 bg-arbor-emerald/20 rounded-full animate-wave",
								style: {
									"height": "20px",
									"animation-delay": "0s"
								}
							}),
							createVNode("div", {
								class: "w-0.5 bg-arbor-emerald/20 rounded-full animate-wave",
								style: {
									"height": "40px",
									"animation-delay": "0.1s"
								}
							}),
							createVNode("div", {
								class: "w-0.5 bg-arbor-emerald/20 rounded-full animate-wave",
								style: {
									"height": "30px",
									"animation-delay": "0.2s"
								}
							}),
							createVNode("div", {
								class: "w-0.5 bg-arbor-emerald/20 rounded-full animate-wave",
								style: {
									"height": "50px",
									"animation-delay": "0.3s"
								}
							}),
							createVNode("div", {
								class: "w-0.5 bg-arbor-emerald/20 rounded-full animate-wave",
								style: {
									"height": "25px",
									"animation-delay": "0.15s"
								}
							}),
							createVNode("div", {
								class: "w-0.5 bg-arbor-emerald/20 rounded-full animate-wave",
								style: {
									"height": "35px",
									"animation-delay": "0.25s"
								}
							}),
							createVNode("div", {
								class: "w-0.5 bg-arbor-emerald/20 rounded-full animate-wave",
								style: {
									"height": "15px",
									"animation-delay": "0.05s"
								}
							})
						], 2),
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
								d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
							})]))], 2),
							createVNode("h1", { class: "font-display text-3xl font-bold text-arbor-cream mb-2" }, " Bon retour "),
							createVNode("p", { class: "text-arbor-sage text-sm" }, " Connectez-vous pour explorer les sons de la nature ")
						], 2),
						__props.status ? (openBlock(), createBlock("div", {
							key: 0,
							class: ["mb-6 p-3 rounded-lg bg-arbor-emerald/10 border border-arbor-emerald/20 text-sm text-arbor-emerald text-center", mounted.value ? "opacity-100" : "opacity-0"],
							style: { "transition": "opacity 0.5s ease-out 0.45s" }
						}, toDisplayString(__props.status), 3)) : createCommentVNode("", true),
						createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: ["space-y-5", mounted.value ? "opacity-100" : "opacity-0"],
							style: { "transition": "opacity 0.6s ease-out 0.5s" }
						}, [
							createVNode("div", {
								class: mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
								style: { "transition": "all 0.5s ease-out 0.55s" }
							}, [
								createVNode(_sfc_main$3, {
									for: "email",
									value: "Adresse e-mail"
								}),
								createVNode(_sfc_main$4, {
									id: "email",
									type: "email",
									class: "mt-1 block w-full",
									modelValue: unref(form).email,
									"onUpdate:modelValue": ($event) => unref(form).email = $event,
									required: "",
									autofocus: "",
									autocomplete: "username",
									placeholder: "vous@exemple.com"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$5, {
									class: "mt-2",
									message: unref(form).errors.email
								}, null, 8, ["message"])
							], 2),
							createVNode("div", {
								class: mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
								style: { "transition": "all 0.5s ease-out 0.6s" }
							}, [
								createVNode(_sfc_main$3, {
									for: "password",
									value: "Mot de passe"
								}),
								createVNode(_sfc_main$4, {
									id: "password",
									type: "password",
									class: "mt-1 block w-full",
									modelValue: unref(form).password,
									"onUpdate:modelValue": ($event) => unref(form).password = $event,
									required: "",
									autocomplete: "current-password",
									placeholder: "••••••••"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$5, {
									class: "mt-2",
									message: unref(form).errors.password
								}, null, 8, ["message"])
							], 2),
							createVNode("div", {
								class: ["flex items-center justify-between", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"],
								style: { "transition": "all 0.5s ease-out 0.65s" }
							}, [createVNode("label", { class: "flex items-center gap-2.5 cursor-pointer group" }, [createVNode(_sfc_main$1, {
								name: "remember",
								checked: unref(form).remember,
								"onUpdate:checked": ($event) => unref(form).remember = $event
							}, null, 8, ["checked", "onUpdate:checked"]), createVNode("span", { class: "text-sm text-arbor-sage group-hover:text-arbor-cream transition-colors" }, "Se souvenir de moi")]), __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
								key: 0,
								href: _ctx.route("password.request"),
								class: "text-sm text-arbor-emerald hover:text-arbor-emerald-dark transition-colors hover:underline underline-offset-4"
							}, {
								default: withCtx(() => [createTextVNode(" Mot de passe oublié ? ")]),
								_: 1
							}, 8, ["href"])) : createCommentVNode("", true)], 2),
							createVNode("div", {
								class: ["pt-2", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"],
								style: { "transition": "all 0.5s ease-out 0.7s" }
							}, [createVNode(PrimaryButton_default, {
								class: ["w-full justify-center py-3.5 text-base", { "opacity-50 cursor-wait": unref(form).processing }],
								disabled: unref(form).processing
							}, {
								default: withCtx(() => [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Connexion...")) : (openBlock(), createBlock("span", { key: 1 }, "Se connecter"))]),
								_: 1
							}, 8, ["class", "disabled"])], 2)
						], 34),
						createVNode("div", {
							class: ["relative my-6", mounted.value ? "opacity-100" : "opacity-0"],
							style: { "transition": "opacity 0.5s ease-out 0.75s" }
						}, [createVNode("div", { class: "absolute inset-0 flex items-center" }, [createVNode("div", { class: "w-full border-t border-arbor-glass-border" })]), createVNode("div", { class: "relative flex justify-center text-xs" }, [createVNode("span", { class: "bg-arbor-deep px-3 text-arbor-sage/60" }, "ou")])], 2),
						createVNode("div", {
							class: ["text-center", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"],
							style: { "transition": "all 0.5s ease-out 0.8s" }
						}, [createVNode("p", { class: "text-sm text-arbor-sage" }, [createTextVNode(" Pas encore de compte ? "), createVNode(unref(Link), {
							href: _ctx.route("register"),
							class: "text-arbor-emerald hover:text-arbor-emerald-dark font-medium transition-colors hover:underline underline-offset-4 ml-1"
						}, {
							default: withCtx(() => [createTextVNode(" Rejoindre Arborisis ")]),
							_: 1
						}, 8, ["href"])])], 2)
					], 2), createVNode("div", {
						class: ["mt-6 text-center", mounted.value ? "opacity-100" : "opacity-0"],
						style: { "transition": "opacity 0.5s ease-out 0.9s" }
					}, [createVNode(unref(Link), {
						href: "/",
						class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors inline-flex items-center gap-1.5"
					}, {
						default: withCtx(() => [(openBlock(), createBlock("svg", {
							class: "w-4 h-4",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M10 19l-7-7m0 0l7-7m-7 7h18"
						})])), createTextVNode(" Retour à l'accueil ")]),
						_: 1
					})], 2)], 2)])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
