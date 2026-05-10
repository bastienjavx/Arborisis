import { t as _sfc_main$1 } from "./AuthenticatedLayout-Ct-jPMsT.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Wallet/DonationHistory.vue
var _sfc_main = {
	__name: "DonationHistory",
	__ssrInlineRender: true,
	props: {
		sent: {
			type: Object,
			default: () => ({ data: [] })
		},
		received: {
			type: Object,
			default: () => ({ data: [] })
		}
	},
	setup(__props) {
		const props = __props;
		const activeTab = ref("sent");
		const formatDate = (dateString) => {
			if (!dateString) return "-";
			return new Date(dateString).toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "short",
				year: "numeric"
			});
		};
		const getAvatarUrl = (user) => {
			return user?.profile?.avatar || null;
		};
		const getInitials = (name) => {
			return name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
		};
		const totalSent = props.sent.data.reduce((sum, d) => sum + parseFloat(d.amount), 0);
		const totalReceived = props.received.data.reduce((sum, d) => sum + parseFloat(d.amount), 0);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Historique des dons" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hero-glow opacity-40"${_scopeId}></div></div><div class="relative z-10 pt-24 pb-24 section-padding"${_scopeId}><div class="max-w-4xl mx-auto"${_scopeId}><div class="mb-10 animate-fade-in"${_scopeId}><div class="flex items-center gap-2 mb-3"${_scopeId}><div class="w-8 h-8 rounded-lg bg-arbor-emerald/15 flex items-center justify-center"${_scopeId}><svg class="w-4 h-4 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><span class="text-arbor-sage text-sm font-medium uppercase tracking-wider"${_scopeId}>Historique</span></div><h1 class="font-display text-4xl sm:text-5xl font-semibold text-arbor-cream leading-tight"${_scopeId}> Vos dons ECHO </h1></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-slide-up"${_scopeId}><div class="glass-card p-6 relative overflow-hidden"${_scopeId}><div class="absolute top-0 right-0 w-24 h-24 bg-arbor-amber/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"${_scopeId}></div><p class="text-arbor-sage text-xs uppercase tracking-wider mb-1"${_scopeId}>Total envoyé</p><p class="font-mono text-3xl text-arbor-amber"${_scopeId}>${ssrInterpolate(unref(totalSent).toLocaleString("fr-FR"))} <span class="text-lg"${_scopeId}>ECHO</span></p></div><div class="glass-card p-6 relative overflow-hidden"${_scopeId}><div class="absolute top-0 right-0 w-24 h-24 bg-arbor-emerald/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"${_scopeId}></div><p class="text-arbor-sage text-xs uppercase tracking-wider mb-1"${_scopeId}>Total reçu</p><p class="font-mono text-3xl text-arbor-emerald"${_scopeId}>${ssrInterpolate(unref(totalReceived).toLocaleString("fr-FR"))} <span class="text-lg"${_scopeId}>ECHO</span></p></div></div><div class="glass-card p-2 mb-6 inline-flex rounded-xl animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}"${_scopeId}><button class="${ssrRenderClass([activeTab.value === "sent" ? "bg-arbor-amber/20 text-arbor-amber" : "text-arbor-sage hover:text-arbor-cream", "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200"])}"${_scopeId}> Envoyés </button><button class="${ssrRenderClass([activeTab.value === "received" ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:text-arbor-cream", "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200"])}"${_scopeId}> Reçus </button></div>`);
						if (activeTab.value === "sent") {
							_push(`<div class="space-y-4 animate-fade-in"${_scopeId}><!--[-->`);
							ssrRenderList(__props.sent.data, (donation, index) => {
								_push(`<div class="glass-card p-5 flex items-start gap-4 hover:bg-white/10 transition-colors" style="${ssrRenderStyle(`animation: slideUp 0.4s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`)}"${_scopeId}><div class="shrink-0"${_scopeId}>`);
								if (getAvatarUrl(donation.recipient)) _push(`<div class="w-12 h-12 rounded-xl overflow-hidden bg-arbor-deep"${_scopeId}><img${ssrRenderAttr("src", getAvatarUrl(donation.recipient))} class="w-full h-full object-cover"${_scopeId}></div>`);
								else _push(`<div class="w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center text-arbor-moss-light font-medium text-sm"${_scopeId}>${ssrInterpolate(getInitials(donation.recipient?.name))}</div>`);
								_push(`</div><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center justify-between mb-1"${_scopeId}><p class="text-arbor-cream font-medium text-sm"${_scopeId}> À <span class="text-arbor-emerald"${_scopeId}>${ssrInterpolate(donation.recipient?.name)}</span></p><span class="font-mono text-arbor-amber text-sm"${_scopeId}>-${ssrInterpolate(donation.amount)} ECHO</span></div>`);
								if (donation.message) _push(`<p class="text-arbor-sage text-sm mb-2 italic"${_scopeId}> &quot;${ssrInterpolate(donation.message)}&quot; </p>`);
								else _push(`<!---->`);
								_push(`<div class="flex items-center gap-3 text-xs text-arbor-sage"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(donation.created_at))}</span>`);
								if (donation.sound) _push(`<span class="px-2 py-0.5 rounded bg-arbor-charcoal/50"${_scopeId}>${ssrInterpolate(donation.sound.title)}</span>`);
								else _push(`<!---->`);
								_push(`</div></div></div>`);
							});
							_push(`<!--]-->`);
							if (__props.sent.data.length === 0) _push(`<div class="text-center py-16 glass-card"${_scopeId}><p class="text-arbor-sage text-sm"${_scopeId}>Vous n&#39;avez pas encore envoyé de dons.</p></div>`);
							else _push(`<!---->`);
							if (__props.sent.links && __props.sent.links.length > 3) {
								_push(`<div class="flex justify-center gap-2 mt-6"${_scopeId}><!--[-->`);
								ssrRenderList(__props.sent.links, (link) => {
									_push(ssrRenderComponent(unref(Link), {
										key: link.label,
										href: link.url,
										class: ["px-3 py-1 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-amber/20 text-arbor-amber" : "text-arbor-sage hover:bg-arbor-charcoal/50"],
										"preserve-state": ""
									}, null, _parent, _scopeId));
								});
								_push(`<!--]--></div>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else {
							_push(`<div class="space-y-4 animate-fade-in"${_scopeId}><!--[-->`);
							ssrRenderList(__props.received.data, (donation, index) => {
								_push(`<div class="glass-card p-5 flex items-start gap-4 hover:bg-white/10 transition-colors" style="${ssrRenderStyle(`animation: slideUp 0.4s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`)}"${_scopeId}><div class="shrink-0"${_scopeId}>`);
								if (getAvatarUrl(donation.donor)) _push(`<div class="w-12 h-12 rounded-xl overflow-hidden bg-arbor-deep"${_scopeId}><img${ssrRenderAttr("src", getAvatarUrl(donation.donor))} class="w-full h-full object-cover"${_scopeId}></div>`);
								else _push(`<div class="w-12 h-12 rounded-xl bg-arbor-emerald/15 flex items-center justify-center text-arbor-emerald font-medium text-sm"${_scopeId}>${ssrInterpolate(getInitials(donation.donor?.name))}</div>`);
								_push(`</div><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center justify-between mb-1"${_scopeId}><p class="text-arbor-cream font-medium text-sm"${_scopeId}> De <span class="text-arbor-emerald"${_scopeId}>${ssrInterpolate(donation.donor?.name)}</span></p><span class="font-mono text-arbor-emerald text-sm"${_scopeId}>+${ssrInterpolate(donation.amount)} ECHO</span></div>`);
								if (donation.message) _push(`<p class="text-arbor-sage text-sm mb-2 italic"${_scopeId}> &quot;${ssrInterpolate(donation.message)}&quot; </p>`);
								else _push(`<!---->`);
								_push(`<div class="flex items-center gap-3 text-xs text-arbor-sage"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(donation.created_at))}</span>`);
								if (donation.sound) _push(`<span class="px-2 py-0.5 rounded bg-arbor-charcoal/50"${_scopeId}>${ssrInterpolate(donation.sound.title)}</span>`);
								else _push(`<!---->`);
								_push(`</div></div></div>`);
							});
							_push(`<!--]-->`);
							if (__props.received.data.length === 0) _push(`<div class="text-center py-16 glass-card"${_scopeId}><p class="text-arbor-sage text-sm"${_scopeId}>Vous n&#39;avez pas encore reçu de dons.</p></div>`);
							else _push(`<!---->`);
							if (__props.received.links && __props.received.links.length > 3) {
								_push(`<div class="flex justify-center gap-2 mt-6"${_scopeId}><!--[-->`);
								ssrRenderList(__props.received.links, (link) => {
									_push(ssrRenderComponent(unref(Link), {
										key: link.label,
										href: link.url,
										class: ["px-3 py-1 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:bg-arbor-charcoal/50"],
										"preserve-state": ""
									}, null, _parent, _scopeId));
								});
								_push(`<!--]--></div>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						}
						_push(`</div></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hero-glow opacity-40" })]), createVNode("div", { class: "relative z-10 pt-24 pb-24 section-padding" }, [createVNode("div", { class: "max-w-4xl mx-auto" }, [
						createVNode("div", { class: "mb-10 animate-fade-in" }, [createVNode("div", { class: "flex items-center gap-2 mb-3" }, [createVNode("div", { class: "w-8 h-8 rounded-lg bg-arbor-emerald/15 flex items-center justify-center" }, [(openBlock(), createBlock("svg", {
							class: "w-4 h-4 text-arbor-emerald",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "1.5",
							d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						})]))]), createVNode("span", { class: "text-arbor-sage text-sm font-medium uppercase tracking-wider" }, "Historique")]), createVNode("h1", { class: "font-display text-4xl sm:text-5xl font-semibold text-arbor-cream leading-tight" }, " Vos dons ECHO ")]),
						createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-slide-up" }, [createVNode("div", { class: "glass-card p-6 relative overflow-hidden" }, [
							createVNode("div", { class: "absolute top-0 right-0 w-24 h-24 bg-arbor-amber/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" }),
							createVNode("p", { class: "text-arbor-sage text-xs uppercase tracking-wider mb-1" }, "Total envoyé"),
							createVNode("p", { class: "font-mono text-3xl text-arbor-amber" }, [createTextVNode(toDisplayString(unref(totalSent).toLocaleString("fr-FR")) + " ", 1), createVNode("span", { class: "text-lg" }, "ECHO")])
						]), createVNode("div", { class: "glass-card p-6 relative overflow-hidden" }, [
							createVNode("div", { class: "absolute top-0 right-0 w-24 h-24 bg-arbor-emerald/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" }),
							createVNode("p", { class: "text-arbor-sage text-xs uppercase tracking-wider mb-1" }, "Total reçu"),
							createVNode("p", { class: "font-mono text-3xl text-arbor-emerald" }, [createTextVNode(toDisplayString(unref(totalReceived).toLocaleString("fr-FR")) + " ", 1), createVNode("span", { class: "text-lg" }, "ECHO")])
						])]),
						createVNode("div", {
							class: "glass-card p-2 mb-6 inline-flex rounded-xl animate-slide-up",
							style: { "animation-delay": "0.1s" }
						}, [createVNode("button", {
							onClick: ($event) => activeTab.value = "sent",
							class: ["px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200", activeTab.value === "sent" ? "bg-arbor-amber/20 text-arbor-amber" : "text-arbor-sage hover:text-arbor-cream"]
						}, " Envoyés ", 10, ["onClick"]), createVNode("button", {
							onClick: ($event) => activeTab.value = "received",
							class: ["px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200", activeTab.value === "received" ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:text-arbor-cream"]
						}, " Reçus ", 10, ["onClick"])]),
						activeTab.value === "sent" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "space-y-4 animate-fade-in"
						}, [
							(openBlock(true), createBlock(Fragment, null, renderList(__props.sent.data, (donation, index) => {
								return openBlock(), createBlock("div", {
									key: donation.id,
									class: "glass-card p-5 flex items-start gap-4 hover:bg-white/10 transition-colors",
									style: `animation: slideUp 0.4s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
								}, [createVNode("div", { class: "shrink-0" }, [getAvatarUrl(donation.recipient) ? (openBlock(), createBlock("div", {
									key: 0,
									class: "w-12 h-12 rounded-xl overflow-hidden bg-arbor-deep"
								}, [createVNode("img", {
									src: getAvatarUrl(donation.recipient),
									class: "w-full h-full object-cover"
								}, null, 8, ["src"])])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center text-arbor-moss-light font-medium text-sm"
								}, toDisplayString(getInitials(donation.recipient?.name)), 1))]), createVNode("div", { class: "flex-1 min-w-0" }, [
									createVNode("div", { class: "flex items-center justify-between mb-1" }, [createVNode("p", { class: "text-arbor-cream font-medium text-sm" }, [createTextVNode(" À "), createVNode("span", { class: "text-arbor-emerald" }, toDisplayString(donation.recipient?.name), 1)]), createVNode("span", { class: "font-mono text-arbor-amber text-sm" }, "-" + toDisplayString(donation.amount) + " ECHO", 1)]),
									donation.message ? (openBlock(), createBlock("p", {
										key: 0,
										class: "text-arbor-sage text-sm mb-2 italic"
									}, " \"" + toDisplayString(donation.message) + "\" ", 1)) : createCommentVNode("", true),
									createVNode("div", { class: "flex items-center gap-3 text-xs text-arbor-sage" }, [createVNode("span", null, toDisplayString(formatDate(donation.created_at)), 1), donation.sound ? (openBlock(), createBlock("span", {
										key: 0,
										class: "px-2 py-0.5 rounded bg-arbor-charcoal/50"
									}, toDisplayString(donation.sound.title), 1)) : createCommentVNode("", true)])
								])], 4);
							}), 128)),
							__props.sent.data.length === 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "text-center py-16 glass-card"
							}, [createVNode("p", { class: "text-arbor-sage text-sm" }, "Vous n'avez pas encore envoyé de dons.")])) : createCommentVNode("", true),
							__props.sent.links && __props.sent.links.length > 3 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "flex justify-center gap-2 mt-6"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.sent.links, (link) => {
								return openBlock(), createBlock(unref(Link), {
									key: link.label,
									href: link.url,
									innerHTML: link.label,
									class: ["px-3 py-1 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-amber/20 text-arbor-amber" : "text-arbor-sage hover:bg-arbor-charcoal/50"],
									"preserve-state": ""
								}, null, 8, [
									"href",
									"innerHTML",
									"class"
								]);
							}), 128))])) : createCommentVNode("", true)
						])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "space-y-4 animate-fade-in"
						}, [
							(openBlock(true), createBlock(Fragment, null, renderList(__props.received.data, (donation, index) => {
								return openBlock(), createBlock("div", {
									key: donation.id,
									class: "glass-card p-5 flex items-start gap-4 hover:bg-white/10 transition-colors",
									style: `animation: slideUp 0.4s ease-out forwards; animation-delay: ${index * .06}s; opacity: 0;`
								}, [createVNode("div", { class: "shrink-0" }, [getAvatarUrl(donation.donor) ? (openBlock(), createBlock("div", {
									key: 0,
									class: "w-12 h-12 rounded-xl overflow-hidden bg-arbor-deep"
								}, [createVNode("img", {
									src: getAvatarUrl(donation.donor),
									class: "w-full h-full object-cover"
								}, null, 8, ["src"])])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "w-12 h-12 rounded-xl bg-arbor-emerald/15 flex items-center justify-center text-arbor-emerald font-medium text-sm"
								}, toDisplayString(getInitials(donation.donor?.name)), 1))]), createVNode("div", { class: "flex-1 min-w-0" }, [
									createVNode("div", { class: "flex items-center justify-between mb-1" }, [createVNode("p", { class: "text-arbor-cream font-medium text-sm" }, [createTextVNode(" De "), createVNode("span", { class: "text-arbor-emerald" }, toDisplayString(donation.donor?.name), 1)]), createVNode("span", { class: "font-mono text-arbor-emerald text-sm" }, "+" + toDisplayString(donation.amount) + " ECHO", 1)]),
									donation.message ? (openBlock(), createBlock("p", {
										key: 0,
										class: "text-arbor-sage text-sm mb-2 italic"
									}, " \"" + toDisplayString(donation.message) + "\" ", 1)) : createCommentVNode("", true),
									createVNode("div", { class: "flex items-center gap-3 text-xs text-arbor-sage" }, [createVNode("span", null, toDisplayString(formatDate(donation.created_at)), 1), donation.sound ? (openBlock(), createBlock("span", {
										key: 0,
										class: "px-2 py-0.5 rounded bg-arbor-charcoal/50"
									}, toDisplayString(donation.sound.title), 1)) : createCommentVNode("", true)])
								])], 4);
							}), 128)),
							__props.received.data.length === 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "text-center py-16 glass-card"
							}, [createVNode("p", { class: "text-arbor-sage text-sm" }, "Vous n'avez pas encore reçu de dons.")])) : createCommentVNode("", true),
							__props.received.links && __props.received.links.length > 3 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "flex justify-center gap-2 mt-6"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.received.links, (link) => {
								return openBlock(), createBlock(unref(Link), {
									key: link.label,
									href: link.url,
									innerHTML: link.label,
									class: ["px-3 py-1 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-emerald/20 text-arbor-emerald" : "text-arbor-sage hover:bg-arbor-charcoal/50"],
									"preserve-state": ""
								}, null, 8, [
									"href",
									"innerHTML",
									"class"
								]);
							}), 128))])) : createCommentVNode("", true)
						]))
					])])])];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Wallet/DonationHistory.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
