import { mergeProps, onMounted, ref, useSSRContext, watch } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import Plotly from "plotly.js-dist-min";
//#region resources/js/Components/Scientific/EnvironmentChart.vue
var _sfc_main = {
	__name: "EnvironmentChart",
	__ssrInlineRender: true,
	props: { data: {
		type: Array,
		default: () => []
	} },
	setup(__props) {
		const props = __props;
		const chartRef = ref(null);
		function render() {
			if (!chartRef.value || props.data.length === 0) return;
			const names = props.data.map((d) => d.name);
			const data = [{
				values: props.data.map((d) => d.count),
				labels: names,
				type: "pie",
				hole: .45,
				marker: {
					colors: [
						"#4A6741",
						"#34D399",
						"#8FA68E",
						"#D4A574",
						"#B87333",
						"#2a3142",
						"#5a7d4f",
						"#C9842B",
						"#1a1f2e",
						"#0B1220"
					],
					line: {
						color: "rgba(255,255,255,0.08)",
						width: 1
					}
				},
				textinfo: "label+percent",
				textposition: "outside",
				textfont: {
					color: "#F3F0E7",
					size: 11
				},
				hovertemplate: "<b>%{label}</b><br>%{value} enregistrements<br>%{percent}<extra></extra>"
			}];
			Plotly.newPlot(chartRef.value, data, {
				paper_bgcolor: "transparent",
				plot_bgcolor: "transparent",
				font: {
					color: "#F3F0E7",
					family: "DM Sans, sans-serif"
				},
				margin: {
					t: 20,
					r: 20,
					b: 20,
					l: 20
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
		watch(() => props.data, render, { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Répartition par environnement</h3><div class="w-full h-64"></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Scientific/EnvironmentChart.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
