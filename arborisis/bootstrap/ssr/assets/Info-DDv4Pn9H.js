import { t as _sfc_main$1 } from "./GuestLayout-pnlb6vqh.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Echo/Info.vue
var echoRate = 10;
var _sfc_main = {
	__name: "Info",
	__ssrInlineRender: true,
	setup(__props) {
		const splits = [
			{
				label: "Créateur",
				percent: 70,
				color: "bg-arbor-emerald",
				desc: "Reçu directement par l'auteur du son"
			},
			{
				label: "Infrastructure",
				percent: 20,
				color: "bg-arbor-moss",
				desc: "Maintenance de la plateforme et stockage"
			},
			{
				label: "Communauté",
				percent: 10,
				color: "bg-arbor-amber",
				desc: "Fonds dédié aux projets collectifs"
			}
		];
		const principles = [
			{
				title: "Pas une cryptomonnaie",
				desc: "ECHO ne peut pas être échangé contre de la monnaie réelle en dehors de la plateforme."
			},
			{
				title: "Pas un investissement",
				desc: "Aucune promesse de rendement. Les crédits servent uniquement à soutenir les créateurs."
			},
			{
				title: "Transactions atomiques",
				desc: "Chaque transfert est immédiat et irréversible, garanti par un journal immuable."
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Le système ECHO" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-50"${_scopeId}></div><div class="absolute top-40 right-20 w-72 h-72 bg-arbor-amber/5 rounded-full blur-3xl"${_scopeId}></div></div><div class="relative z-10"${_scopeId}><section class="pt-32 pb-20 section-padding"${_scopeId}><div class="max-w-4xl mx-auto text-center"${_scopeId}><div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-arbor-amber/15 mb-8 animate-glow-pulse"${_scopeId}><span class="text-3xl font-display font-bold text-arbor-amber"${_scopeId}>E</span></div><h1 class="font-display text-5xl sm:text-6xl font-bold text-arbor-cream leading-tight mb-6"${_scopeId}> Le système <span class="text-arbor-amber"${_scopeId}>ECHO</span></h1><p class="text-arbor-sage text-lg max-w-2xl mx-auto leading-relaxed"${_scopeId}> Des crédits internes pour soutenir directement les enregistreurs de sons naturels. Simple, transparent, sans intermédiaire opaque. </p></div></section><section class="pb-20 section-padding"${_scopeId}><div class="max-w-3xl mx-auto"${_scopeId}><div class="glass-card p-10 text-center relative overflow-hidden"${_scopeId}><div class="absolute top-0 right-0 w-40 h-40 bg-arbor-amber/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"${_scopeId}></div><div class="relative z-10"${_scopeId}><p class="text-arbor-sage text-sm uppercase tracking-wider mb-4"${_scopeId}>Taux de conversion</p><div class="flex items-center justify-center gap-6 mb-6"${_scopeId}><div class="text-center"${_scopeId}><div class="font-mono text-4xl text-arbor-cream"${_scopeId}>1 €</div><div class="text-arbor-sage text-xs mt-1"${_scopeId}>euro</div></div><div class="w-12 h-px bg-arbor-glass-border relative"${_scopeId}><div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-arbor-amber/30 border border-arbor-amber"${_scopeId}></div></div><div class="text-center"${_scopeId}><div class="font-mono text-4xl text-arbor-amber"${_scopeId}>${ssrInterpolate(echoRate)}</div><div class="text-arbor-sage text-xs mt-1"${_scopeId}>ECHO</div></div></div><p class="text-arbor-sage text-sm"${_scopeId}> Achetez des crédits par carte bancaire via Stripe. Ils sont crédités instantanément sur votre portefeuille. </p></div></div></div></section><section class="pb-20 section-padding"${_scopeId}><div class="max-w-5xl mx-auto"${_scopeId}><div class="text-center mb-12"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream mb-3"${_scopeId}>Répartition de chaque don</h2><p class="text-arbor-sage"${_scopeId}>Chaque ECHO envoyé est divisé de manière transparente.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
						ssrRenderList(splits, (split, index) => {
							_push(`<div class="glass-card p-8 text-center hover:bg-white/10 transition-all duration-300 hover-lift" style="${ssrRenderStyle(`animation: fadeInUp 0.6s ease-out forwards; animation-delay: ${index * .15}s; opacity: 0;`)}"${_scopeId}><div class="${ssrRenderClass([split.color.replace("bg-", "text-"), "font-mono text-5xl font-medium mb-3"])}"${_scopeId}>${ssrInterpolate(split.percent)}% </div><h3 class="text-arbor-cream font-medium mb-2"${_scopeId}>${ssrInterpolate(split.label)}</h3><p class="text-arbor-sage text-sm"${_scopeId}>${ssrInterpolate(split.desc)}</p></div>`);
						});
						_push(`<!--]--></div><div class="mt-10 flex h-4 rounded-full overflow-hidden glass-card p-0"${_scopeId}><div class="bg-arbor-emerald h-full" style="${ssrRenderStyle({ "width": "70%" })}"${_scopeId}></div><div class="bg-arbor-moss h-full" style="${ssrRenderStyle({ "width": "20%" })}"${_scopeId}></div><div class="bg-arbor-amber h-full" style="${ssrRenderStyle({ "width": "10%" })}"${_scopeId}></div></div><div class="flex justify-between mt-3 text-xs text-arbor-sage px-1"${_scopeId}><span class="text-arbor-emerald"${_scopeId}>70 % créateur</span><span class="text-arbor-moss"${_scopeId}>20 % infra</span><span class="text-arbor-amber"${_scopeId}>10 % communauté</span></div></div></section><section class="pb-20 section-padding bg-arbor-deep/30 border-y border-arbor-glass-border"${_scopeId}><div class="max-w-4xl mx-auto"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream text-center mb-12"${_scopeId}>Nos engagements</h2><div class="space-y-6"${_scopeId}><!--[-->`);
						ssrRenderList(principles, (principle, index) => {
							_push(`<div class="flex items-start gap-5 p-6 rounded-2xl bg-arbor-charcoal/30 border border-arbor-fog/30 hover:border-arbor-moss/30 transition-colors" style="${ssrRenderStyle(`animation: slideUp 0.5s ease-out forwards; animation-delay: ${index * .1}s; opacity: 0;`)}"${_scopeId}><div class="w-10 h-10 rounded-xl bg-arbor-emerald/15 flex items-center justify-center shrink-0"${_scopeId}><svg class="w-5 h-5 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="text-arbor-cream font-medium mb-1"${_scopeId}>${ssrInterpolate(principle.title)}</h3><p class="text-arbor-sage text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(principle.desc)}</p></div></div>`);
						});
						_push(`<!--]--></div></div></section><section class="py-24 section-padding"${_scopeId}><div class="max-w-2xl mx-auto text-center"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream mb-4"${_scopeId}>Prêt à soutenir ?</h2><p class="text-arbor-sage mb-8"${_scopeId}> Créez un compte, achetez des crédits ECHO et commencez à soutenir les enregistreurs dont vous appréciez le travail. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"${_scopeId}>`);
						if (_ctx.$page.props.auth.user) _push(ssrRenderComponent(unref(Link), {
							href: "/wallet",
							class: "btn-amber text-base px-8 py-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Accéder à mon portefeuille `);
								else return [createTextVNode(" Accéder à mon portefeuille ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(unref(Link), {
								href: "/register",
								class: "btn-primary text-base px-8 py-4"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Créer un compte `);
									else return [createTextVNode(" Créer un compte ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(unref(Link), {
								href: "/login",
								class: "btn-secondary text-base px-8 py-4"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` J&#39;ai déjà un compte `);
									else return [createTextVNode(" J'ai déjà un compte ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`<!--]-->`);
						}
						_push(`</div></div></section></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-50" }), createVNode("div", { class: "absolute top-40 right-20 w-72 h-72 bg-arbor-amber/5 rounded-full blur-3xl" })]), createVNode("div", { class: "relative z-10" }, [
						createVNode("section", { class: "pt-32 pb-20 section-padding" }, [createVNode("div", { class: "max-w-4xl mx-auto text-center" }, [
							createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-arbor-amber/15 mb-8 animate-glow-pulse" }, [createVNode("span", { class: "text-3xl font-display font-bold text-arbor-amber" }, "E")]),
							createVNode("h1", { class: "font-display text-5xl sm:text-6xl font-bold text-arbor-cream leading-tight mb-6" }, [createTextVNode(" Le système "), createVNode("span", { class: "text-arbor-amber" }, "ECHO")]),
							createVNode("p", { class: "text-arbor-sage text-lg max-w-2xl mx-auto leading-relaxed" }, " Des crédits internes pour soutenir directement les enregistreurs de sons naturels. Simple, transparent, sans intermédiaire opaque. ")
						])]),
						createVNode("section", { class: "pb-20 section-padding" }, [createVNode("div", { class: "max-w-3xl mx-auto" }, [createVNode("div", { class: "glass-card p-10 text-center relative overflow-hidden" }, [createVNode("div", { class: "absolute top-0 right-0 w-40 h-40 bg-arbor-amber/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" }), createVNode("div", { class: "relative z-10" }, [
							createVNode("p", { class: "text-arbor-sage text-sm uppercase tracking-wider mb-4" }, "Taux de conversion"),
							createVNode("div", { class: "flex items-center justify-center gap-6 mb-6" }, [
								createVNode("div", { class: "text-center" }, [createVNode("div", { class: "font-mono text-4xl text-arbor-cream" }, "1 €"), createVNode("div", { class: "text-arbor-sage text-xs mt-1" }, "euro")]),
								createVNode("div", { class: "w-12 h-px bg-arbor-glass-border relative" }, [createVNode("div", { class: "absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-arbor-amber/30 border border-arbor-amber" })]),
								createVNode("div", { class: "text-center" }, [createVNode("div", { class: "font-mono text-4xl text-arbor-amber" }, toDisplayString(echoRate)), createVNode("div", { class: "text-arbor-sage text-xs mt-1" }, "ECHO")])
							]),
							createVNode("p", { class: "text-arbor-sage text-sm" }, " Achetez des crédits par carte bancaire via Stripe. Ils sont crédités instantanément sur votre portefeuille. ")
						])])])]),
						createVNode("section", { class: "pb-20 section-padding" }, [createVNode("div", { class: "max-w-5xl mx-auto" }, [
							createVNode("div", { class: "text-center mb-12" }, [createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream mb-3" }, "Répartition de chaque don"), createVNode("p", { class: "text-arbor-sage" }, "Chaque ECHO envoyé est divisé de manière transparente.")]),
							createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [(openBlock(), createBlock(Fragment, null, renderList(splits, (split, index) => {
								return createVNode("div", {
									key: split.label,
									class: "glass-card p-8 text-center hover:bg-white/10 transition-all duration-300 hover-lift",
									style: `animation: fadeInUp 0.6s ease-out forwards; animation-delay: ${index * .15}s; opacity: 0;`
								}, [
									createVNode("div", { class: ["font-mono text-5xl font-medium mb-3", split.color.replace("bg-", "text-")] }, toDisplayString(split.percent) + "% ", 3),
									createVNode("h3", { class: "text-arbor-cream font-medium mb-2" }, toDisplayString(split.label), 1),
									createVNode("p", { class: "text-arbor-sage text-sm" }, toDisplayString(split.desc), 1)
								], 4);
							}), 64))]),
							createVNode("div", { class: "mt-10 flex h-4 rounded-full overflow-hidden glass-card p-0" }, [
								createVNode("div", {
									class: "bg-arbor-emerald h-full",
									style: { "width": "70%" }
								}),
								createVNode("div", {
									class: "bg-arbor-moss h-full",
									style: { "width": "20%" }
								}),
								createVNode("div", {
									class: "bg-arbor-amber h-full",
									style: { "width": "10%" }
								})
							]),
							createVNode("div", { class: "flex justify-between mt-3 text-xs text-arbor-sage px-1" }, [
								createVNode("span", { class: "text-arbor-emerald" }, "70 % créateur"),
								createVNode("span", { class: "text-arbor-moss" }, "20 % infra"),
								createVNode("span", { class: "text-arbor-amber" }, "10 % communauté")
							])
						])]),
						createVNode("section", { class: "pb-20 section-padding bg-arbor-deep/30 border-y border-arbor-glass-border" }, [createVNode("div", { class: "max-w-4xl mx-auto" }, [createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream text-center mb-12" }, "Nos engagements"), createVNode("div", { class: "space-y-6" }, [(openBlock(), createBlock(Fragment, null, renderList(principles, (principle, index) => {
							return createVNode("div", {
								key: principle.title,
								class: "flex items-start gap-5 p-6 rounded-2xl bg-arbor-charcoal/30 border border-arbor-fog/30 hover:border-arbor-moss/30 transition-colors",
								style: `animation: slideUp 0.5s ease-out forwards; animation-delay: ${index * .1}s; opacity: 0;`
							}, [createVNode("div", { class: "w-10 h-10 rounded-xl bg-arbor-emerald/15 flex items-center justify-center shrink-0" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-arbor-emerald",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M5 13l4 4L19 7"
							})]))]), createVNode("div", null, [createVNode("h3", { class: "text-arbor-cream font-medium mb-1" }, toDisplayString(principle.title), 1), createVNode("p", { class: "text-arbor-sage text-sm leading-relaxed" }, toDisplayString(principle.desc), 1)])], 4);
						}), 64))])])]),
						createVNode("section", { class: "py-24 section-padding" }, [createVNode("div", { class: "max-w-2xl mx-auto text-center" }, [
							createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream mb-4" }, "Prêt à soutenir ?"),
							createVNode("p", { class: "text-arbor-sage mb-8" }, " Créez un compte, achetez des crédits ECHO et commencez à soutenir les enregistreurs dont vous appréciez le travail. "),
							createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-4" }, [_ctx.$page.props.auth.user ? (openBlock(), createBlock(unref(Link), {
								key: 0,
								href: "/wallet",
								class: "btn-amber text-base px-8 py-4"
							}, {
								default: withCtx(() => [createTextVNode(" Accéder à mon portefeuille ")]),
								_: 1
							})) : (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode(unref(Link), {
								href: "/register",
								class: "btn-primary text-base px-8 py-4"
							}, {
								default: withCtx(() => [createTextVNode(" Créer un compte ")]),
								_: 1
							}), createVNode(unref(Link), {
								href: "/login",
								class: "btn-secondary text-base px-8 py-4"
							}, {
								default: withCtx(() => [createTextVNode(" J'ai déjà un compte ")]),
								_: 1
							})], 64))])
						])])
					])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Echo/Info.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
