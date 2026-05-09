import { t as _sfc_main$1 } from "./GuestLayout-BiAa1nfV.js";
import { t as PrimaryButton_default } from "./PrimaryButton-DTnevw1i.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { computed, createBlock, createCommentVNode, createTextVNode, createVNode, onMounted, openBlock, ref, unref, useSSRContext, withCtx, withModifiers } from "vue";
import { ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Auth/VerifyEmail.vue
var _sfc_main = {
	__name: "VerifyEmail",
	__ssrInlineRender: true,
	props: { status: { type: String } },
	setup(__props) {
		const props = __props;
		const form = useForm({});
		const submit = () => {
			form.post(route("verification.send"));
		};
		const verificationLinkSent = computed(() => props.status === "verification-link-sent");
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
						_push(ssrRenderComponent(unref(Head), { title: "Vérification de l'email" }, null, _parent, _scopeId));
						_push(`<div class="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16 py-12"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none"${_scopeId}><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90", "absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-arbor-moss/10 blur-[100px] transition-all duration-1000"])}"${_scopeId}></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90", "absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-arbor-emerald/5 blur-[120px] transition-all duration-1000 delay-200"])}"${_scopeId}></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-90", "absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-arbor-amber/5 blur-[80px] transition-all duration-1000 delay-300"])}"${_scopeId}></div><svg viewBox="0 0 100 100" fill="currentColor" class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "absolute top-20 right-[15%] w-32 h-32 text-arbor-moss/10 animate-pulse-slow transition-all duration-800"])}" style="${ssrRenderStyle({ "transition-delay": "0.4s" })}"${_scopeId}><path d="M50 5 C20 5 5 30 5 55 C5 80 25 95 50 95 C75 95 95 80 95 55 C95 30 80 5 50 5 Z M50 85 C30 85 15 70 15 55 C15 35 30 20 50 20 C70 20 85 35 85 55 C85 70 70 85 50 85 Z"${_scopeId}></path></svg><svg viewBox="0 0 100 100" fill="currentColor" style="${ssrRenderStyle({ "animation-delay": "2s" })}" class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "absolute bottom-32 left-[10%] w-24 h-24 text-arbor-emerald/10 animate-pulse-slow"])}"${_scopeId}><path d="M50 10 Q30 40 10 50 Q30 60 50 90 Q70 60 90 50 Q70 40 50 10 Z"${_scopeId}></path></svg><div class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "absolute bottom-[20%] right-[8%] flex items-end gap-1 h-16"])}" style="${ssrRenderStyle({ "transition": "opacity 1s ease-out 0.6s" })}"${_scopeId}><div class="w-0.5 bg-arbor-emerald/20 rounded-full animate-wave" style="${ssrRenderStyle({
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
						})}"${_scopeId}></div></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6", "relative z-10 w-full max-w-md mx-auto px-4 sm:px-6"])}" style="${ssrRenderStyle({ "transition": "all 0.7s ease-out 0.2s" })}"${_scopeId}><div class="${ssrRenderClass([mounted.value ? "opacity-100 scale-100" : "opacity-0 scale-95", "glass-card p-8 sm:p-10 relative overflow-hidden"])}" style="${ssrRenderStyle({ "transition": "all 0.6s ease-out 0.3s" })}"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-arbor-emerald/40 to-transparent"${_scopeId}></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "text-center mb-8"])}" style="${ssrRenderStyle({ "transition": "all 0.6s ease-out 0.4s" })}"${_scopeId}><div class="${ssrRenderClass([mounted.value ? "scale-100" : "scale-90", "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-arbor-moss/20 mb-5 ring-1 ring-arbor-emerald/20"])}" style="${ssrRenderStyle({ "transition": "transform 0.5s ease-out 0.5s" })}"${_scopeId}><svg class="w-7 h-7 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"${_scopeId}></path></svg></div><h1 class="font-display text-3xl font-bold text-arbor-cream mb-2"${_scopeId}> Vérifiez votre email </h1><p class="text-arbor-sage text-sm"${_scopeId}> Une dernière étape avant de rejoindre la communauté </p></div><div class="${ssrRenderClass([mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3", "mb-6 text-sm text-arbor-sage leading-relaxed"])}" style="${ssrRenderStyle({ "transition": "all 0.5s ease-out 0.5s" })}"${_scopeId}> Merci de votre inscription ! Avant de commencer, veuillez vérifier votre adresse e-mail en cliquant sur le lien que nous venons de vous envoyer. Si vous n&#39;avez pas reçu l&#39;e-mail, nous vous en enverrons un autre avec plaisir. </div>`);
						if (verificationLinkSent.value) _push(`<div class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "mb-6 p-3 rounded-lg bg-arbor-emerald/10 border border-arbor-emerald/20 text-sm text-arbor-emerald text-center"])}" style="${ssrRenderStyle({ "transition": "opacity 0.5s ease-out 0.45s" })}"${_scopeId}> Un nouveau lien de vérification a été envoyé à l&#39;adresse e-mail que vous avez fournie lors de l&#39;inscription. </div>`);
						else _push(`<!---->`);
						_push(`<form class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "space-y-5"])}" style="${ssrRenderStyle({ "transition": "opacity 0.6s ease-out 0.55s" })}"${_scopeId}><div class="flex flex-col sm:flex-row items-center justify-between gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(PrimaryButton_default, {
							class: [{ "opacity-50 cursor-wait": unref(form).processing }, "w-full sm:w-auto justify-center py-3 px-6"],
							disabled: unref(form).processing
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (unref(form).processing) _push(`<span${_scopeId}>Envoi en cours...</span>`);
								else _push(`<span${_scopeId}>Renvoyer l&#39;e-mail de vérification</span>`);
								else return [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Envoi en cours...")) : (openBlock(), createBlock("span", { key: 1 }, "Renvoyer l'e-mail de vérification"))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("logout"),
							method: "post",
							as: "button",
							class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors underline underline-offset-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Se déconnecter `);
								else return [createTextVNode(" Se déconnecter ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form></div><div class="${ssrRenderClass([mounted.value ? "opacity-100" : "opacity-0", "mt-6 text-center"])}" style="${ssrRenderStyle({ "transition": "opacity 0.5s ease-out 0.8s" })}"${_scopeId}>`);
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
					} else return [createVNode(unref(Head), { title: "Vérification de l'email" }), createVNode("div", { class: "relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16 py-12" }, [createVNode("div", { class: "absolute inset-0 overflow-hidden pointer-events-none" }, [
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
								d: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
							})]))], 2),
							createVNode("h1", { class: "font-display text-3xl font-bold text-arbor-cream mb-2" }, " Vérifiez votre email "),
							createVNode("p", { class: "text-arbor-sage text-sm" }, " Une dernière étape avant de rejoindre la communauté ")
						], 2),
						createVNode("div", {
							class: ["mb-6 text-sm text-arbor-sage leading-relaxed", mounted.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"],
							style: { "transition": "all 0.5s ease-out 0.5s" }
						}, " Merci de votre inscription ! Avant de commencer, veuillez vérifier votre adresse e-mail en cliquant sur le lien que nous venons de vous envoyer. Si vous n'avez pas reçu l'e-mail, nous vous en enverrons un autre avec plaisir. ", 2),
						verificationLinkSent.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: ["mb-6 p-3 rounded-lg bg-arbor-emerald/10 border border-arbor-emerald/20 text-sm text-arbor-emerald text-center", mounted.value ? "opacity-100" : "opacity-0"],
							style: { "transition": "opacity 0.5s ease-out 0.45s" }
						}, " Un nouveau lien de vérification a été envoyé à l'adresse e-mail que vous avez fournie lors de l'inscription. ", 2)) : createCommentVNode("", true),
						createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: ["space-y-5", mounted.value ? "opacity-100" : "opacity-0"],
							style: { "transition": "opacity 0.6s ease-out 0.55s" }
						}, [createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-between gap-4" }, [createVNode(PrimaryButton_default, {
							class: [{ "opacity-50 cursor-wait": unref(form).processing }, "w-full sm:w-auto justify-center py-3 px-6"],
							disabled: unref(form).processing
						}, {
							default: withCtx(() => [unref(form).processing ? (openBlock(), createBlock("span", { key: 0 }, "Envoi en cours...")) : (openBlock(), createBlock("span", { key: 1 }, "Renvoyer l'e-mail de vérification"))]),
							_: 1
						}, 8, ["class", "disabled"]), createVNode(unref(Link), {
							href: _ctx.route("logout"),
							method: "post",
							as: "button",
							class: "text-sm text-arbor-sage hover:text-arbor-cream transition-colors underline underline-offset-4"
						}, {
							default: withCtx(() => [createTextVNode(" Se déconnecter ")]),
							_: 1
						}, 8, ["href"])])], 34)
					], 2), createVNode("div", {
						class: ["mt-6 text-center", mounted.value ? "opacity-100" : "opacity-0"],
						style: { "transition": "opacity 0.5s ease-out 0.8s" }
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
