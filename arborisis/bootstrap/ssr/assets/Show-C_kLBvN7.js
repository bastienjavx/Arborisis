import { t as _sfc_main$1 } from "./AuthenticatedLayout-C3aZldG3.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelText, withCtx, withDirectives } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Wallet/Show.vue
var echoRate = 10;
var _sfc_main = {
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		balance: {
			type: Number,
			default: 0
		},
		transactions: {
			type: Object,
			default: () => ({ data: [] })
		}
	},
	setup(__props) {
		const form = useForm({ amount: 10 });
		const echoAmount = computed(() => {
			return Math.round(form.amount * echoRate);
		});
		const presetAmounts = [
			5,
			10,
			20,
			50,
			100
		];
		const submitting = ref(false);
		const submitCheckout = () => {
			submitting.value = true;
			form.post(route("wallet.checkout"), {
				preserveScroll: true,
				onFinish: () => {
					submitting.value = false;
				}
			});
		};
		const formatDate = (dateString) => {
			if (!dateString) return "-";
			return new Date(dateString).toLocaleDateString("fr-FR", {
				day: "numeric",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
		};
		const getStatusColor = (status) => {
			const colors = {
				completed: "text-arbor-emerald bg-arbor-emerald/15",
				pending: "text-amber-400 bg-amber-400/15",
				failed: "text-rose-400 bg-rose-400/15",
				cancelled: "text-arbor-sage bg-arbor-sage/15"
			};
			return colors[status] || colors.pending;
		};
		const getStatusLabel = (status) => {
			return {
				completed: "Complété",
				pending: "En cours",
				failed: "Échoué",
				cancelled: "Annulé"
			}[status] || status;
		};
		const getTypeLabel = (type) => {
			return {
				purchase: "Achat",
				donation: "Don",
				tip: "Pourboire",
				withdrawal: "Retrait",
				refund: "Remboursement",
				commission: "Commission",
				community_fund: "Fonds communautaire"
			}[type] || type;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Portefeuille ECHO" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hero-glow opacity-40"${_scopeId}></div><div class="absolute top-20 right-20 w-64 h-64 bg-arbor-amber/5 rounded-full blur-3xl"${_scopeId}></div></div><div class="relative z-10 pt-24 pb-24 section-padding"${_scopeId}><div class="max-w-5xl mx-auto"${_scopeId}><div class="mb-10 animate-fade-in"${_scopeId}><div class="flex items-center gap-2 mb-3"${_scopeId}><div class="w-8 h-8 rounded-lg bg-arbor-amber/20 flex items-center justify-center"${_scopeId}><span class="font-mono text-sm font-medium text-arbor-amber"${_scopeId}>E</span></div><span class="text-arbor-sage text-sm font-medium uppercase tracking-wider"${_scopeId}>Portefeuille</span></div><h1 class="font-display text-4xl sm:text-5xl font-semibold text-arbor-cream leading-tight"${_scopeId}> Vos crédits ECHO </h1></div><div class="grid grid-cols-1 lg:grid-cols-5 gap-8"${_scopeId}><div class="lg:col-span-3 space-y-8"${_scopeId}><div class="glass-card p-8 relative overflow-hidden animate-slide-up"${_scopeId}><div class="absolute top-0 right-0 w-40 h-40 bg-arbor-amber/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"${_scopeId}></div><div class="relative z-10"${_scopeId}><p class="text-arbor-sage text-sm mb-2"${_scopeId}>Solde disponible</p><div class="font-mono text-5xl font-medium text-arbor-amber mb-1"${_scopeId}>${ssrInterpolate(__props.balance.toLocaleString("fr-FR"))}</div><p class="text-arbor-sage text-xs"${_scopeId}>ECHO</p></div></div><div class="glass-card p-8 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}"${_scopeId}><h2 class="font-display text-2xl font-semibold text-arbor-cream mb-2"${_scopeId}> Recharger votre solde </h2><p class="text-arbor-sage text-sm mb-6"${_scopeId}> Achetez des crédits ECHO via Stripe. 1 € = ${ssrInterpolate(echoRate)} ECHO. </p><div class="flex flex-wrap gap-2 mb-6"${_scopeId}><!--[-->`);
						ssrRenderList(presetAmounts, (preset) => {
							_push(`<button class="${ssrRenderClass([unref(form).amount === preset ? "bg-arbor-amber/20 border-arbor-amber/50 text-arbor-amber" : "bg-arbor-glass border-arbor-glass-border text-arbor-sage hover:text-arbor-cream hover:border-arbor-sage/30", "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border"])}"${_scopeId}>${ssrInterpolate(preset)} € </button>`);
						});
						_push(`<!--]--></div><div class="mb-6"${_scopeId}><label class="block text-arbor-sage text-sm mb-2"${_scopeId}>Montant personnalisé (1–500 €)</label><div class="flex items-center gap-4"${_scopeId}><div class="relative flex-1"${_scopeId}><input${ssrRenderAttr("value", unref(form).amount)} type="number" min="1" max="500" class="w-full bg-arbor-charcoal/50 border border-arbor-fog/50 rounded-xl px-4 py-3 text-arbor-cream focus:border-arbor-amber/50 focus:ring-1 focus:ring-arbor-amber/30 outline-none transition-colors"${_scopeId}><span class="absolute right-4 top-1/2 -translate-y-1/2 text-arbor-sage text-sm"${_scopeId}>EUR</span></div></div>`);
						if (unref(form).errors.amount) _push(`<p class="text-rose-400 text-xs mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.amount)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="flex items-center justify-between p-4 rounded-xl bg-arbor-charcoal/50 border border-arbor-fog/50 mb-6"${_scopeId}><span class="text-arbor-sage text-sm"${_scopeId}>Vous recevrez</span><span class="font-mono text-xl text-arbor-amber"${_scopeId}>${ssrInterpolate(echoAmount.value.toLocaleString("fr-FR"))} ECHO</span></div><button${ssrIncludeBooleanAttr(submitting.value || unref(form).amount < 1 || unref(form).amount > 500) ? " disabled" : ""} class="btn-amber w-full justify-center text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>`);
						if (submitting.value) _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-arbor-night" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
						else _push(`<span class="flex items-center justify-center gap-2"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"${_scopeId}></path></svg> Payer ${ssrInterpolate(unref(form).amount)} € avec Stripe </span>`);
						_push(`</button><p class="text-center text-arbor-sage text-xs mt-4"${_scopeId}> Paiement sécurisé via Stripe. Les crédits sont ajoutés immédiatement après confirmation. </p></div></div><div class="lg:col-span-2 space-y-8"${_scopeId}><div class="glass-card p-6 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}"${_scopeId}><h3 class="font-display text-lg font-semibold text-arbor-cream mb-4"${_scopeId}>Actions</h3><div class="space-y-3"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/donations/history",
							class: "flex items-center gap-4 p-3 rounded-xl hover:bg-arbor-charcoal/50 transition-colors group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="w-10 h-10 rounded-xl bg-arbor-emerald/15 flex items-center justify-center transition-transform group-hover:scale-110"${_scopeId}><svg class="w-5 h-5 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><div class="text-arbor-cream text-sm font-medium group-hover:text-arbor-emerald transition-colors"${_scopeId}>Historique des dons</div><div class="text-arbor-sage text-xs"${_scopeId}>Envoyés et reçus</div></div>`);
								else return [createVNode("div", { class: "w-10 h-10 rounded-xl bg-arbor-emerald/15 flex items-center justify-center transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 text-arbor-emerald",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								})]))]), createVNode("div", null, [createVNode("div", { class: "text-arbor-cream text-sm font-medium group-hover:text-arbor-emerald transition-colors" }, "Historique des dons"), createVNode("div", { class: "text-arbor-sage text-xs" }, "Envoyés et reçus")])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: "/transparency",
							class: "flex items-center gap-4 p-3 rounded-xl hover:bg-arbor-charcoal/50 transition-colors group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="w-10 h-10 rounded-xl bg-arbor-moss/20 flex items-center justify-center transition-transform group-hover:scale-110"${_scopeId}><svg class="w-5 h-5 text-arbor-moss-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><div class="text-arbor-cream text-sm font-medium group-hover:text-arbor-emerald transition-colors"${_scopeId}>Transparence ECHO</div><div class="text-arbor-sage text-xs"${_scopeId}>Comment fonctionne le système</div></div>`);
								else return [createVNode("div", { class: "w-10 h-10 rounded-xl bg-arbor-moss/20 flex items-center justify-center transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 text-arbor-moss-light",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								})]))]), createVNode("div", null, [createVNode("div", { class: "text-arbor-cream text-sm font-medium group-hover:text-arbor-emerald transition-colors" }, "Transparence ECHO"), createVNode("div", { class: "text-arbor-sage text-xs" }, "Comment fonctionne le système")])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="glass-card p-6 bg-gradient-to-br from-arbor-moss/10 to-transparent animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="w-8 h-8 rounded-lg bg-arbor-emerald/20 flex items-center justify-center shrink-0 mt-0.5"${_scopeId}><svg class="w-4 h-4 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><h4 class="text-arbor-cream text-sm font-medium mb-1"${_scopeId}>À propos d&#39;ECHO</h4><p class="text-arbor-sage text-xs leading-relaxed"${_scopeId}> ECHO n&#39;est pas une cryptomonnaie ni un investissement. C&#39;est un système de crédits internes pour soutenir les créateurs. </p></div></div></div></div></div><div class="mt-10 glass-card p-6 lg:p-8 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}"${_scopeId}><h2 class="font-display text-2xl font-semibold text-arbor-cream mb-6"${_scopeId}> Historique des transactions </h2>`);
						if (__props.transactions.data.length > 0) {
							_push(`<div class="overflow-x-auto"${_scopeId}><table class="w-full text-left"${_scopeId}><thead${_scopeId}><tr class="border-b border-arbor-glass-border"${_scopeId}><th class="pb-3 text-arbor-sage text-xs font-medium uppercase tracking-wider"${_scopeId}>Date</th><th class="pb-3 text-arbor-sage text-xs font-medium uppercase tracking-wider"${_scopeId}>Type</th><th class="pb-3 text-arbor-sage text-xs font-medium uppercase tracking-wider"${_scopeId}>Montant</th><th class="pb-3 text-arbor-sage text-xs font-medium uppercase tracking-wider"${_scopeId}>Statut</th></tr></thead><tbody class="divide-y divide-arbor-glass-border"${_scopeId}><!--[-->`);
							ssrRenderList(__props.transactions.data, (tx) => {
								_push(`<tr class="hover:bg-arbor-charcoal/30 transition-colors"${_scopeId}><td class="py-4 text-arbor-cream text-sm"${_scopeId}>${ssrInterpolate(formatDate(tx.created_at))}</td><td class="py-4 text-arbor-cream text-sm"${_scopeId}>${ssrInterpolate(getTypeLabel(tx.type?.value || tx.type))}</td><td class="${ssrRenderClass([tx.echo_amount > 0 ? "text-arbor-amber" : "text-arbor-sage", "py-4 font-mono text-sm"])}"${_scopeId}>${ssrInterpolate(tx.echo_amount > 0 ? "+" : "")}${ssrInterpolate(tx.echo_amount)} ECHO </td><td class="py-4"${_scopeId}><span class="${ssrRenderClass([getStatusColor(tx.status?.value || tx.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(getStatusLabel(tx.status?.value || tx.status))}</span></td></tr>`);
							});
							_push(`<!--]--></tbody></table></div>`);
						} else _push(`<div class="text-center py-12"${_scopeId}><p class="text-arbor-sage text-sm"${_scopeId}>Aucune transaction pour le moment.</p></div>`);
						if (__props.transactions.links && __props.transactions.links.length > 3) {
							_push(`<div class="mt-6 flex justify-center gap-2"${_scopeId}><!--[-->`);
							ssrRenderList(__props.transactions.links, (link) => {
								_push(ssrRenderComponent(unref(Link), {
									key: link.label,
									href: link.url,
									class: ["px-3 py-1 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-amber/20 text-arbor-amber" : "text-arbor-sage hover:bg-arbor-charcoal/50"],
									"preserve-state": true
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`</div></div></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hero-glow opacity-40" }), createVNode("div", { class: "absolute top-20 right-20 w-64 h-64 bg-arbor-amber/5 rounded-full blur-3xl" })]), createVNode("div", { class: "relative z-10 pt-24 pb-24 section-padding" }, [createVNode("div", { class: "max-w-5xl mx-auto" }, [
						createVNode("div", { class: "mb-10 animate-fade-in" }, [createVNode("div", { class: "flex items-center gap-2 mb-3" }, [createVNode("div", { class: "w-8 h-8 rounded-lg bg-arbor-amber/20 flex items-center justify-center" }, [createVNode("span", { class: "font-mono text-sm font-medium text-arbor-amber" }, "E")]), createVNode("span", { class: "text-arbor-sage text-sm font-medium uppercase tracking-wider" }, "Portefeuille")]), createVNode("h1", { class: "font-display text-4xl sm:text-5xl font-semibold text-arbor-cream leading-tight" }, " Vos crédits ECHO ")]),
						createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-5 gap-8" }, [createVNode("div", { class: "lg:col-span-3 space-y-8" }, [createVNode("div", { class: "glass-card p-8 relative overflow-hidden animate-slide-up" }, [createVNode("div", { class: "absolute top-0 right-0 w-40 h-40 bg-arbor-amber/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" }), createVNode("div", { class: "relative z-10" }, [
							createVNode("p", { class: "text-arbor-sage text-sm mb-2" }, "Solde disponible"),
							createVNode("div", { class: "font-mono text-5xl font-medium text-arbor-amber mb-1" }, toDisplayString(__props.balance.toLocaleString("fr-FR")), 1),
							createVNode("p", { class: "text-arbor-sage text-xs" }, "ECHO")
						])]), createVNode("div", {
							class: "glass-card p-8 animate-slide-up",
							style: { "animation-delay": "0.1s" }
						}, [
							createVNode("h2", { class: "font-display text-2xl font-semibold text-arbor-cream mb-2" }, " Recharger votre solde "),
							createVNode("p", { class: "text-arbor-sage text-sm mb-6" }, " Achetez des crédits ECHO via Stripe. 1 € = " + toDisplayString(echoRate) + " ECHO. "),
							createVNode("div", { class: "flex flex-wrap gap-2 mb-6" }, [(openBlock(), createBlock(Fragment, null, renderList(presetAmounts, (preset) => {
								return createVNode("button", {
									key: preset,
									onClick: ($event) => unref(form).amount = preset,
									class: ["px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border", unref(form).amount === preset ? "bg-arbor-amber/20 border-arbor-amber/50 text-arbor-amber" : "bg-arbor-glass border-arbor-glass-border text-arbor-sage hover:text-arbor-cream hover:border-arbor-sage/30"]
								}, toDisplayString(preset) + " € ", 11, ["onClick"]);
							}), 64))]),
							createVNode("div", { class: "mb-6" }, [
								createVNode("label", { class: "block text-arbor-sage text-sm mb-2" }, "Montant personnalisé (1–500 €)"),
								createVNode("div", { class: "flex items-center gap-4" }, [createVNode("div", { class: "relative flex-1" }, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).amount = $event,
									type: "number",
									min: "1",
									max: "500",
									class: "w-full bg-arbor-charcoal/50 border border-arbor-fog/50 rounded-xl px-4 py-3 text-arbor-cream focus:border-arbor-amber/50 focus:ring-1 focus:ring-arbor-amber/30 outline-none transition-colors"
								}, null, 8, ["onUpdate:modelValue"]), [[
									vModelText,
									unref(form).amount,
									void 0,
									{ number: true }
								]]), createVNode("span", { class: "absolute right-4 top-1/2 -translate-y-1/2 text-arbor-sage text-sm" }, "EUR")])]),
								unref(form).errors.amount ? (openBlock(), createBlock("p", {
									key: 0,
									class: "text-rose-400 text-xs mt-2"
								}, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true)
							]),
							createVNode("div", { class: "flex items-center justify-between p-4 rounded-xl bg-arbor-charcoal/50 border border-arbor-fog/50 mb-6" }, [createVNode("span", { class: "text-arbor-sage text-sm" }, "Vous recevrez"), createVNode("span", { class: "font-mono text-xl text-arbor-amber" }, toDisplayString(echoAmount.value.toLocaleString("fr-FR")) + " ECHO", 1)]),
							createVNode("button", {
								onClick: submitCheckout,
								disabled: submitting.value || unref(form).amount < 1 || unref(form).amount > 500,
								class: "btn-amber w-full justify-center text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed"
							}, [submitting.value ? (openBlock(), createBlock("svg", {
								key: 0,
								class: "animate-spin -ml-1 mr-3 h-5 w-5 text-arbor-night",
								xmlns: "http://www.w3.org/2000/svg",
								fill: "none",
								viewBox: "0 0 24 24"
							}, [createVNode("circle", {
								class: "opacity-25",
								cx: "12",
								cy: "12",
								r: "10",
								stroke: "currentColor",
								"stroke-width": "4"
							}), createVNode("path", {
								class: "opacity-75",
								fill: "currentColor",
								d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							})])) : (openBlock(), createBlock("span", {
								key: 1,
								class: "flex items-center justify-center gap-2"
							}, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
							})])), createTextVNode(" Payer " + toDisplayString(unref(form).amount) + " € avec Stripe ", 1)]))], 8, ["disabled"]),
							createVNode("p", { class: "text-center text-arbor-sage text-xs mt-4" }, " Paiement sécurisé via Stripe. Les crédits sont ajoutés immédiatement après confirmation. ")
						])]), createVNode("div", { class: "lg:col-span-2 space-y-8" }, [createVNode("div", {
							class: "glass-card p-6 animate-slide-up",
							style: { "animation-delay": "0.2s" }
						}, [createVNode("h3", { class: "font-display text-lg font-semibold text-arbor-cream mb-4" }, "Actions"), createVNode("div", { class: "space-y-3" }, [createVNode(unref(Link), {
							href: "/donations/history",
							class: "flex items-center gap-4 p-3 rounded-xl hover:bg-arbor-charcoal/50 transition-colors group"
						}, {
							default: withCtx(() => [createVNode("div", { class: "w-10 h-10 rounded-xl bg-arbor-emerald/15 flex items-center justify-center transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-emerald",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							})]))]), createVNode("div", null, [createVNode("div", { class: "text-arbor-cream text-sm font-medium group-hover:text-arbor-emerald transition-colors" }, "Historique des dons"), createVNode("div", { class: "text-arbor-sage text-xs" }, "Envoyés et reçus")])]),
							_: 1
						}), createVNode(unref(Link), {
							href: "/transparency",
							class: "flex items-center gap-4 p-3 rounded-xl hover:bg-arbor-charcoal/50 transition-colors group"
						}, {
							default: withCtx(() => [createVNode("div", { class: "w-10 h-10 rounded-xl bg-arbor-moss/20 flex items-center justify-center transition-transform group-hover:scale-110" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-moss-light",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "1.5",
								d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							})]))]), createVNode("div", null, [createVNode("div", { class: "text-arbor-cream text-sm font-medium group-hover:text-arbor-emerald transition-colors" }, "Transparence ECHO"), createVNode("div", { class: "text-arbor-sage text-xs" }, "Comment fonctionne le système")])]),
							_: 1
						})])]), createVNode("div", {
							class: "glass-card p-6 bg-gradient-to-br from-arbor-moss/10 to-transparent animate-slide-up",
							style: { "animation-delay": "0.3s" }
						}, [createVNode("div", { class: "flex items-start gap-3" }, [createVNode("div", { class: "w-8 h-8 rounded-lg bg-arbor-emerald/20 flex items-center justify-center shrink-0 mt-0.5" }, [(openBlock(), createBlock("svg", {
							class: "w-4 h-4 text-arbor-emerald",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						})]))]), createVNode("div", null, [createVNode("h4", { class: "text-arbor-cream text-sm font-medium mb-1" }, "À propos d'ECHO"), createVNode("p", { class: "text-arbor-sage text-xs leading-relaxed" }, " ECHO n'est pas une cryptomonnaie ni un investissement. C'est un système de crédits internes pour soutenir les créateurs. ")])])])])]),
						createVNode("div", {
							class: "mt-10 glass-card p-6 lg:p-8 animate-slide-up",
							style: { "animation-delay": "0.4s" }
						}, [
							createVNode("h2", { class: "font-display text-2xl font-semibold text-arbor-cream mb-6" }, " Historique des transactions "),
							__props.transactions.data.length > 0 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "overflow-x-auto"
							}, [createVNode("table", { class: "w-full text-left" }, [createVNode("thead", null, [createVNode("tr", { class: "border-b border-arbor-glass-border" }, [
								createVNode("th", { class: "pb-3 text-arbor-sage text-xs font-medium uppercase tracking-wider" }, "Date"),
								createVNode("th", { class: "pb-3 text-arbor-sage text-xs font-medium uppercase tracking-wider" }, "Type"),
								createVNode("th", { class: "pb-3 text-arbor-sage text-xs font-medium uppercase tracking-wider" }, "Montant"),
								createVNode("th", { class: "pb-3 text-arbor-sage text-xs font-medium uppercase tracking-wider" }, "Statut")
							])]), createVNode("tbody", { class: "divide-y divide-arbor-glass-border" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.data, (tx) => {
								return openBlock(), createBlock("tr", {
									key: tx.id,
									class: "hover:bg-arbor-charcoal/30 transition-colors"
								}, [
									createVNode("td", { class: "py-4 text-arbor-cream text-sm" }, toDisplayString(formatDate(tx.created_at)), 1),
									createVNode("td", { class: "py-4 text-arbor-cream text-sm" }, toDisplayString(getTypeLabel(tx.type?.value || tx.type)), 1),
									createVNode("td", { class: ["py-4 font-mono text-sm", tx.echo_amount > 0 ? "text-arbor-amber" : "text-arbor-sage"] }, toDisplayString(tx.echo_amount > 0 ? "+" : "") + toDisplayString(tx.echo_amount) + " ECHO ", 3),
									createVNode("td", { class: "py-4" }, [createVNode("span", { class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(tx.status?.value || tx.status)] }, toDisplayString(getStatusLabel(tx.status?.value || tx.status)), 3)])
								]);
							}), 128))])])])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "text-center py-12"
							}, [createVNode("p", { class: "text-arbor-sage text-sm" }, "Aucune transaction pour le moment.")])),
							__props.transactions.links && __props.transactions.links.length > 3 ? (openBlock(), createBlock("div", {
								key: 2,
								class: "mt-6 flex justify-center gap-2"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.links, (link) => {
								return openBlock(), createBlock(unref(Link), {
									key: link.label,
									href: link.url,
									innerHTML: link.label,
									class: ["px-3 py-1 rounded-lg text-sm transition-colors", link.active ? "bg-arbor-amber/20 text-arbor-amber" : "text-arbor-sage hover:bg-arbor-charcoal/50"],
									"preserve-state": true
								}, null, 8, [
									"href",
									"innerHTML",
									"class"
								]);
							}), 128))])) : createCommentVNode("", true)
						])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Wallet/Show.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
