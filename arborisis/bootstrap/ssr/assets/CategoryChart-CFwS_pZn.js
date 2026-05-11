import { mergeProps, onMounted, ref, useSSRContext, watch } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import Plotly from "plotly.js-dist-min";
//#region resources/js/Components/Scientific/CategoryChart.vue
var _sfc_main = {
	__name: "CategoryChart",
	__ssrInlineRender: true,
	props: { categories: {
		type: Array,
		default: () => []
	} },
	setup(__props) {
		const props = __props;
		const chartRef = ref(null);
		const colors = [
			"#4A6741",
			"#34D399",
			"#8FA68E",
			"#D4A574",
			"#B87333",
			"#2a3142",
			"#5a7d4f",
			"#C9842B"
		];
		function render() {
			if (!chartRef.value || props.categories.length === 0) return;
			const names = props.categories.map((c) => c.name);
			const counts = props.categories.map((c) => c.count);
			props.categories.map((c) => c.avg_duration);
			const data = [{
				x: names,
				y: counts,
				type: "bar",
				name: "Nombre d'enregistrements",
				marker: {
					color: names.map((_, i) => colors[i % colors.length]),
					line: {
						color: "rgba(255,255,255,0.1)",
						width: 1
					}
				},
				text: counts.map(String),
				textposition: "auto",
				textfont: {
					color: "#F3F0E7",
					size: 12
				}
			}];
			Plotly.newPlot(chartRef.value, data, {
				paper_bgcolor: "transparent",
				plot_bgcolor: "transparent",
				font: {
					color: "#F3F0E7",
					family: "DM Sans, sans-serif",
					size: 12
				},
				margin: {
					t: 30,
					r: 20,
					b: 60,
					l: 50
				},
				xaxis: {
					tickangle: -30,
					gridcolor: "rgba(255,255,255,0.05)",
					zerolinecolor: "rgba(255,255,255,0.1)"
				},
				yaxis: {
					gridcolor: "rgba(255,255,255,0.05)",
					zerolinecolor: "rgba(255,255,255,0.1)",
					title: {
						text: "Quantité",
						font: { size: 12 }
					}
				},
				showlegend: false,
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
		watch(() => props.categories, render, { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Répartition par catégorie</h3><div class="w-full h-72"></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Scientific/CategoryChart.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
