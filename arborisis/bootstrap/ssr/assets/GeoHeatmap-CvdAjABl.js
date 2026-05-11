import { mergeProps, onMounted, ref, useSSRContext, watch } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import Plotly from "plotly.js-dist-min";
//#region resources/js/Components/Scientific/GeoHeatmap.vue
var _sfc_main = {
	__name: "GeoHeatmap",
	__ssrInlineRender: true,
	props: { points: {
		type: Array,
		default: () => []
	} },
	setup(__props) {
		const props = __props;
		const chartRef = ref(null);
		function render() {
			if (!chartRef.value || props.points.length === 0) return;
			const lats = props.points.map((p) => p.lat);
			const lngs = props.points.map((p) => p.lng);
			const counts = props.points.map((p) => p.count);
			const trace = {
				type: "scattergeo",
				mode: "markers",
				lat: lats,
				lon: lngs,
				text: props.points.map((p) => `${p.count} enregistrement${p.count > 1 ? "s" : ""}<br>${p.categories ?? ""}`),
				marker: {
					size: counts.map((c) => Math.max(6, Math.min(30, c * 3))),
					color: counts,
					colorscale: [
						[0, "#8FA68E"],
						[.3, "#4A6741"],
						[.6, "#34D399"],
						[1, "#D4A574"]
					],
					cmin: Math.min(...counts),
					cmax: Math.max(...counts),
					colorbar: {
						title: {
							text: "Densité",
							font: {
								color: "#F3F0E7",
								size: 11
							}
						},
						tickfont: {
							color: "#F3F0E7",
							size: 10
						},
						thickness: 12,
						len: .6,
						bgcolor: "rgba(17,24,39,0.6)"
					},
					line: {
						color: "rgba(255,255,255,0.15)",
						width: .5
					},
					opacity: .85
				},
				hovertemplate: "<b>%{text}</b><extra></extra>"
			};
			Plotly.newPlot(chartRef.value, [trace], {
				paper_bgcolor: "transparent",
				plot_bgcolor: "transparent",
				font: {
					color: "#F3F0E7",
					family: "DM Sans, sans-serif"
				},
				margin: {
					t: 10,
					r: 10,
					b: 10,
					l: 10
				},
				geo: {
					bgcolor: "transparent",
					showland: true,
					landcolor: "#1a1f2e",
					showocean: true,
					oceancolor: "#0B1220",
					showlakes: true,
					lakecolor: "#0B1220",
					showrivers: false,
					showcountries: true,
					countrycolor: "rgba(255,255,255,0.06)",
					countrywidth: .5,
					showcoastlines: true,
					coastlinecolor: "rgba(255,255,255,0.08)",
					coastlinewidth: .5,
					showframe: false,
					projection: { type: "equirectangular" },
					center: {
						lat: 46.6,
						lon: 1.9
					},
					lonaxis: { range: [-10, 20] },
					lataxis: { range: [35, 55] }
				},
				hoverlabel: {
					bgcolor: "#111827",
					bordercolor: "rgba(255,255,255,0.1)",
					font: { color: "#F3F0E7" }
				}
			}, {
				responsive: true,
				displayModeBar: false
			});
		}
		onMounted(render);
		watch(() => props.points, render, { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><div class="flex items-center justify-between mb-4"><h3 class="font-display text-xl font-semibold text-arbor-cream">Heatmap géographique</h3><span class="text-xs text-arbor-sage bg-arbor-deep px-2 py-1 rounded border border-arbor-glass-border"> Agrégation 0.1° — coordonnées approximatives </span></div><div class="w-full h-[500px]"></div><p class="mt-3 text-xs text-arbor-sage/70"> Les coordonnées exactes sont volontairement agrégées pour préserver la confidentialité des lieux sensibles. </p></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Scientific/GeoHeatmap.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
