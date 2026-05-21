import { mergeProps, onMounted, ref, useSSRContext, watch } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import Plotly from "plotly.js-dist-min";
//#region resources/js/Components/Scientific/EquipmentChart.vue
var _sfc_main = {
	__name: "EquipmentChart",
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
			const counts = props.data.map((d) => d.count);
			const data = [{
				y: names.reverse(),
				x: counts.reverse(),
				type: "bar",
				orientation: "h",
				marker: {
					color: counts.map((_, i) => {
						const palette = [
							"#4A6741",
							"#5a7d4f",
							"#34D399",
							"#8FA68E",
							"#D4A574",
							"#B87333",
							"#C9842B",
							"#2a3142",
							"#1a1f2e",
							"#0B1220"
						];
						return palette[i % palette.length];
					}),
					line: {
						color: "rgba(255,255,255,0.08)",
						width: 1
					}
				},
				text: counts.reverse().map(String),
				textposition: "auto",
				textfont: {
					color: "#F3F0E7",
					size: 11
				}
			}];
			Plotly.newPlot(chartRef.value, data, {
				paper_bgcolor: "transparent",
				plot_bgcolor: "transparent",
				font: {
					color: "#F3F0E7",
					family: "DM Sans, sans-serif",
					size: 11
				},
				margin: {
					t: 10,
					r: 30,
					b: 30,
					l: 140
				},
				xaxis: {
					gridcolor: "rgba(255,255,255,0.05)",
					zerolinecolor: "rgba(255,255,255,0.1)"
				},
				yaxis: {
					gridcolor: "transparent",
					zerolinecolor: "transparent"
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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Équipements</h3><div class="w-full h-80"></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Scientific/EquipmentChart.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
