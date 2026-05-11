import { mergeProps, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Components/Scientific/ApiDocs.vue
var _sfc_main = {
	__name: "ApiDocs",
	__ssrInlineRender: true,
	setup(__props) {
		const endpoints = [
			{
				method: "GET",
				path: "/api/scientific-stats/global",
				desc: "Statistiques globales (total, durée, créateurs, analyses)"
			},
			{
				method: "GET",
				path: "/api/scientific-stats/categories",
				desc: "Distribution par catégorie avec durée moyenne"
			},
			{
				method: "GET",
				path: "/api/scientific-stats/environments",
				desc: "Distribution par environnement"
			},
			{
				method: "GET",
				path: "/api/scientific-stats/temporal",
				desc: "Série temporelle mensuelle (quantité + durée moyenne)"
			},
			{
				method: "GET",
				path: "/api/scientific-stats/geo-heatmap",
				desc: "Heatmap géographique agrégée (privacy-safe)"
			},
			{
				method: "GET",
				path: "/api/scientific-stats/audio-features",
				desc: "Statistiques descriptives et distributions des features audio"
			},
			{
				method: "GET",
				path: "/api/scientific-stats/top-locations",
				desc: "Top lieux par nombre d'enregistrements"
			},
			{
				method: "GET",
				path: "/api/scientific-stats/equipment",
				desc: "Distribution des équipements de recording"
			},
			{
				method: "GET",
				path: "/api/scientific-stats/raw-data?limit=100",
				desc: "Échantillon de données brutes (max 1000 lignes)"
			}
		];
		const colors = { GET: "text-arbor-emerald bg-arbor-emerald/10 border-arbor-emerald/30" };
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-2">API Open Data</h3><p class="text-sm text-arbor-sage mb-6"> Toutes les données exposées sont agrégées et anonymisées. Aucune coordonnée exacte ni donnée personnelle n&#39;est accessible. </p><div class="space-y-3"><!--[-->`);
			ssrRenderList(endpoints, (ep) => {
				_push(`<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl border border-arbor-glass-border bg-arbor-deep/40 hover:bg-arbor-deep/70 transition-colors"><div class="flex items-center gap-3 min-w-[260px]"><span class="${ssrRenderClass(["text-xs font-bold px-2 py-0.5 rounded border", colors[ep.method]])}">${ssrInterpolate(ep.method)}</span><code class="text-arbor-cream font-mono text-sm">${ssrInterpolate(ep.path)}</code></div><p class="text-sm text-arbor-sage">${ssrInterpolate(ep.desc)}</p></div>`);
			});
			_push(`<!--]--></div><div class="mt-6 p-4 rounded-xl bg-arbor-deep/60 border border-arbor-glass-border"><p class="text-xs text-arbor-sage font-mono mb-2">Exemple de requête :</p><code class="block text-arbor-emerald font-mono text-sm"> curl -H &quot;Accept: application/json&quot; \\ <br>  https://<redacted>.fr/api/scientific-stats/global </code></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Scientific/ApiDocs.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
