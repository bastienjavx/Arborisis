import { t as _sfc_main$1 } from "./GuestLayout-CqMC9M4d.js";
import { Head, Link } from "@inertiajs/vue3";
import { Fragment, createBlock, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Mission.vue
var _sfc_main = {
	__name: "Mission",
	__ssrInlineRender: true,
	setup(__props) {
		const values = [
			{
				title: "Respect de la nature",
				desc: "Nous encourageons une écoute attentive et non intrusive. Les enregistrements doivent préserver l'intégrité des écosystèmes et ne pas perturber la faune.",
				icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
			},
			{
				title: "Transparence",
				desc: "Notre modèle économique est entièrement public. Chaque don ECHO est réparti selon des règles claires : 70 % au créateur, 20 % à l'infrastructure, 10 % à la communauté.",
				icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
			},
			{
				title: "Communauté",
				desc: "Arborisis est avant tout un réseau de passionnés. Nous croyons au partage des savoirs, à l'entraide entre enregistreurs et à la diversité des paysages sonores.",
				icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Notre mission" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative min-h-screen bg-arbor-night"${_scopeId}><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"${_scopeId}><div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40"${_scopeId}></div></div><div class="relative z-10"${_scopeId}><section class="pt-24 pb-16 section-padding"${_scopeId}><div class="max-w-4xl mx-auto text-center"${_scopeId}><h1 class="font-display text-5xl sm:text-6xl font-bold text-arbor-cream leading-tight mb-6"${_scopeId}> Préserver l&#39;écoute <span class="text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss"${_scopeId}>du monde vivant</span></h1><p class="text-arbor-sage text-lg max-w-2xl mx-auto leading-relaxed"${_scopeId}> Arborisis naît d&#39;une conviction : les paysages sonores naturels sont un patrimoine fragile méritant d&#39;être documenté, partagé et protégé. </p></div></section><section class="py-20 section-padding bg-arbor-deep/30 border-y border-arbor-glass-border"${_scopeId}><div class="max-w-3xl mx-auto text-center"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream mb-6"${_scopeId}>La genèse d&#39;Arborisis</h2><div class="space-y-6 text-arbor-sage leading-relaxed text-left"${_scopeId}><p${_scopeId}> Dans un monde de plus en plus bruyant, les espaces de silence deviennent rares. Les sons de la nature — le chant d&#39;un oiseau à l&#39;aube, le murmure d&#39;une rivière, le vent dans les cimes — sont des témoignages éphémères de la biodiversité. Pourtant, ils disparaissent souvent sans laisser de trace. </p><p${_scopeId}> Arborisis est née de la rencontre entre des passionnés de field recording et des développeurs convaincus que la technologie peut servir la préservation. Notre ambition est de créer l&#39;archive sonore la plus complète du monde vivant, accessible à tous et alimentée par une communauté d&#39;enregistreurs du monde entier. </p><p${_scopeId}> En donnant une voix aux espaces silencieux, nous espérons susciter une écologie de l&#39;attention et une reconnaissance envers ceux qui consacrent leur temps à capturer ces instants éphémères. </p></div></div></section><section class="py-20 section-padding"${_scopeId}><div class="max-w-3xl mx-auto text-center"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream mb-6"${_scopeId}>Notre vision</h2><div class="glass-card p-8 lg:p-10 text-left"${_scopeId}><p class="text-arbor-sage leading-relaxed mb-6"${_scopeId}> Nous imaginons une plateforme où chaque son naturel partagé contribue à une mémoire collective du monde vivant. Une ressource ouverte pour les chercheurs, les artistes, les méditateurs et tous ceux qui cherchent à reconnecter avec la nature à travers l&#39;ouïe. </p><p class="text-arbor-sage leading-relaxed"${_scopeId}> Notre modèle économique repose sur le soutien direct : pas de publicité, pas de revente de données. Les créateurs sont rémunérés par la communauté, et la plateforme vit de la confiance de ses membres. </p></div></div></section><section class="py-20 section-padding bg-arbor-deep/30 border-y border-arbor-glass-border"${_scopeId}><div class="max-w-5xl mx-auto"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream text-center mb-12"${_scopeId}>Nos valeurs</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8"${_scopeId}><!--[-->`);
						ssrRenderList(values, (value, index) => {
							_push(`<div class="glass-card p-8 hover:bg-white/10 transition-all duration-300 hover-lift group" style="${ssrRenderStyle(`animation: fadeInUp 0.6s ease-out forwards; animation-delay: ${index * .15}s; opacity: 0;`)}"${_scopeId}><div class="w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mb-6 group-hover:bg-arbor-moss/30 transition-colors group-hover:scale-110 duration-300"${_scopeId}><svg class="w-6 h-6 text-arbor-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", value.icon)}${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-arbor-cream mb-3"${_scopeId}>${ssrInterpolate(value.title)}</h3><p class="text-arbor-sage text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(value.desc)}</p></div>`);
						});
						_push(`<!--]--></div></div></section><section class="py-24 section-padding"${_scopeId}><div class="max-w-2xl mx-auto text-center"${_scopeId}><h2 class="font-display text-3xl font-bold text-arbor-cream mb-4"${_scopeId}>Rejoignez l&#39;aventure</h2><p class="text-arbor-sage mb-8"${_scopeId}> Créez votre profil, publiez vos premiers enregistrements et connectez-vous avec d&#39;autres passionnés de sons naturels. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: "/register",
							class: "btn-primary text-base px-8 py-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Créer un compte gratuit `);
								else return [createTextVNode(" Créer un compte gratuit ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: "/sounds",
							class: "btn-secondary text-base px-8 py-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Explorer les sons `);
								else return [createTextVNode(" Explorer les sons ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></section></div></div>`);
					} else return [createVNode("div", { class: "relative min-h-screen bg-arbor-night" }, [createVNode("div", {
						class: "absolute inset-0 overflow-hidden pointer-events-none",
						"aria-hidden": "true"
					}, [createVNode("div", { class: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-hero-glow opacity-40" })]), createVNode("div", { class: "relative z-10" }, [
						createVNode("section", { class: "pt-24 pb-16 section-padding" }, [createVNode("div", { class: "max-w-4xl mx-auto text-center" }, [createVNode("h1", { class: "font-display text-5xl sm:text-6xl font-bold text-arbor-cream leading-tight mb-6" }, [createTextVNode(" Préserver l'écoute "), createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-arbor-emerald to-arbor-moss" }, "du monde vivant")]), createVNode("p", { class: "text-arbor-sage text-lg max-w-2xl mx-auto leading-relaxed" }, " Arborisis naît d'une conviction : les paysages sonores naturels sont un patrimoine fragile méritant d'être documenté, partagé et protégé. ")])]),
						createVNode("section", { class: "py-20 section-padding bg-arbor-deep/30 border-y border-arbor-glass-border" }, [createVNode("div", { class: "max-w-3xl mx-auto text-center" }, [createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream mb-6" }, "La genèse d'Arborisis"), createVNode("div", { class: "space-y-6 text-arbor-sage leading-relaxed text-left" }, [
							createVNode("p", null, " Dans un monde de plus en plus bruyant, les espaces de silence deviennent rares. Les sons de la nature — le chant d'un oiseau à l'aube, le murmure d'une rivière, le vent dans les cimes — sont des témoignages éphémères de la biodiversité. Pourtant, ils disparaissent souvent sans laisser de trace. "),
							createVNode("p", null, " Arborisis est née de la rencontre entre des passionnés de field recording et des développeurs convaincus que la technologie peut servir la préservation. Notre ambition est de créer l'archive sonore la plus complète du monde vivant, accessible à tous et alimentée par une communauté d'enregistreurs du monde entier. "),
							createVNode("p", null, " En donnant une voix aux espaces silencieux, nous espérons susciter une écologie de l'attention et une reconnaissance envers ceux qui consacrent leur temps à capturer ces instants éphémères. ")
						])])]),
						createVNode("section", { class: "py-20 section-padding" }, [createVNode("div", { class: "max-w-3xl mx-auto text-center" }, [createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream mb-6" }, "Notre vision"), createVNode("div", { class: "glass-card p-8 lg:p-10 text-left" }, [createVNode("p", { class: "text-arbor-sage leading-relaxed mb-6" }, " Nous imaginons une plateforme où chaque son naturel partagé contribue à une mémoire collective du monde vivant. Une ressource ouverte pour les chercheurs, les artistes, les méditateurs et tous ceux qui cherchent à reconnecter avec la nature à travers l'ouïe. "), createVNode("p", { class: "text-arbor-sage leading-relaxed" }, " Notre modèle économique repose sur le soutien direct : pas de publicité, pas de revente de données. Les créateurs sont rémunérés par la communauté, et la plateforme vit de la confiance de ses membres. ")])])]),
						createVNode("section", { class: "py-20 section-padding bg-arbor-deep/30 border-y border-arbor-glass-border" }, [createVNode("div", { class: "max-w-5xl mx-auto" }, [createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream text-center mb-12" }, "Nos valeurs"), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-8" }, [(openBlock(), createBlock(Fragment, null, renderList(values, (value, index) => {
							return createVNode("div", {
								key: value.title,
								class: "glass-card p-8 hover:bg-white/10 transition-all duration-300 hover-lift group",
								style: `animation: fadeInUp 0.6s ease-out forwards; animation-delay: ${index * .15}s; opacity: 0;`
							}, [
								createVNode("div", { class: "w-12 h-12 rounded-xl bg-arbor-moss/20 flex items-center justify-center mb-6 group-hover:bg-arbor-moss/30 transition-colors group-hover:scale-110 duration-300" }, [(openBlock(), createBlock("svg", {
									class: "w-6 h-6 text-arbor-emerald",
									fill: "none",
									stroke: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "1.5",
									d: value.icon
								}, null, 8, ["d"])]))]),
								createVNode("h3", { class: "text-lg font-semibold text-arbor-cream mb-3" }, toDisplayString(value.title), 1),
								createVNode("p", { class: "text-arbor-sage text-sm leading-relaxed" }, toDisplayString(value.desc), 1)
							], 4);
						}), 64))])])]),
						createVNode("section", { class: "py-24 section-padding" }, [createVNode("div", { class: "max-w-2xl mx-auto text-center" }, [
							createVNode("h2", { class: "font-display text-3xl font-bold text-arbor-cream mb-4" }, "Rejoignez l'aventure"),
							createVNode("p", { class: "text-arbor-sage mb-8" }, " Créez votre profil, publiez vos premiers enregistrements et connectez-vous avec d'autres passionnés de sons naturels. "),
							createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-4" }, [createVNode(unref(Link), {
								href: "/register",
								class: "btn-primary text-base px-8 py-4"
							}, {
								default: withCtx(() => [createTextVNode(" Créer un compte gratuit ")]),
								_: 1
							}), createVNode(unref(Link), {
								href: "/sounds",
								class: "btn-secondary text-base px-8 py-4"
							}, {
								default: withCtx(() => [createTextVNode(" Explorer les sons ")]),
								_: 1
							})])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Mission.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
