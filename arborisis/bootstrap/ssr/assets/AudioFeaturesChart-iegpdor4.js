import { mergeProps, onMounted, ref, useSSRContext, watch } from "vue";
import { ssrInterpolate, ssrRenderAttrs } from "vue/server-renderer";
import Plotly from "plotly.js-dist-min";
//#region resources/js/Components/Scientific/AudioFeaturesChart.vue
var _sfc_main = {
	__name: "AudioFeaturesChart",
	__ssrInlineRender: true,
	props: {
		features: {
			type: Object,
			default: () => ({})
		},
		distributions: {
			type: Object,
			default: () => ({})
		}
	},
	setup(__props) {
		const props = __props;
		const radarRef = ref(null);
		const histRef = ref(null);
		const featureLabels = {
			zcr: "ZCR",
			rms: "RMS",
			spectral_centroid: "Centroid",
			spectral_rolloff: "Rolloff",
			spectral_bandwidth: "Bandwidth",
			zero_crossing_rate: "ZCR (alt.)"
		};
		function renderRadar() {
			if (!radarRef.value) return;
			const entries = Object.entries(props.features);
			if (entries.length === 0) return;
			const labels = entries.map(([k]) => featureLabels[k] ?? k);
			const means = entries.map(([, v]) => v.mean);
			const maxVal = Math.max(...means) || 1;
			const normalized = means.map((m) => m / maxVal * 100);
			const data = [{
				type: "scatterpolar",
				r: [...normalized, normalized[0]],
				theta: [...labels, labels[0]],
				fill: "toself",
				fillcolor: "rgba(52, 211, 153, 0.15)",
				line: {
					color: "#34D399",
					width: 2
				},
				marker: {
					size: 6,
					color: "#34D399"
				},
				name: "Moyenne normalisée"
			}];
			Plotly.newPlot(radarRef.value, data, {
				paper_bgcolor: "transparent",
				plot_bgcolor: "transparent",
				font: {
					color: "#F3F0E7",
					family: "DM Sans, sans-serif",
					size: 11
				},
				margin: {
					t: 40,
					r: 40,
					b: 40,
					l: 40
				},
				polar: {
					bgcolor: "transparent",
					radialaxis: {
						visible: true,
						range: [0, 110],
						gridcolor: "rgba(255,255,255,0.08)",
						tickfont: { size: 9 }
					},
					angularaxis: {
						gridcolor: "rgba(255,255,255,0.08)",
						tickfont: { size: 10 }
					}
				},
				showlegend: false
			}, {
				responsive: true,
				displayModeBar: false
			});
		}
		function renderHistogram() {
			if (!histRef.value) return;
			const entries = Object.entries(props.distributions);
			if (entries.length === 0) return;
			const [key, bins] = entries[0];
			if (!bins || bins.length === 0) return;
			const mids = bins.map((b) => b.mid);
			const counts = bins.map((b) => b.count);
			const data = [{
				x: mids,
				y: counts,
				type: "bar",
				name: featureLabels[key] ?? key,
				marker: {
					color: "#D4A574",
					line: {
						color: "rgba(255,255,255,0.1)",
						width: 1
					}
				},
				text: counts.map(String),
				textposition: "auto",
				textfont: {
					color: "#F3F0E7",
					size: 10
				}
			}];
			const layout = {
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
					b: 50,
					l: 50
				},
				xaxis: {
					title: {
						text: featureLabels[key] ?? key,
						font: { size: 11 }
					},
					gridcolor: "rgba(255,255,255,0.05)",
					zerolinecolor: "rgba(255,255,255,0.1)"
				},
				yaxis: {
					title: {
						text: "Fréquence",
						font: { size: 11 }
					},
					gridcolor: "rgba(255,255,255,0.05)",
					zerolinecolor: "rgba(255,255,255,0.1)"
				},
				showlegend: false
			};
			Plotly.newPlot(histRef.value, data, layout, {
				responsive: true,
				displayModeBar: false
			});
		}
		onMounted(() => {
			renderRadar();
			renderHistogram();
		});
		watch(() => props.features, renderRadar, { deep: true });
		watch(() => props.distributions, renderHistogram, { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, _attrs))}><div class="glass-card p-6"><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Profil audio moyen</h3><div class="w-full h-80"></div><p class="mt-2 text-xs text-arbor-sage/70">Valeurs normalisées sur l&#39;échelle du dataset.</p></div><div class="glass-card p-6"><h3 class="font-display text-xl font-semibold text-arbor-cream mb-4">Distribution — ${ssrInterpolate(Object.keys(__props.distributions)[0] ? featureLabels[Object.keys(__props.distributions)[0]] ?? Object.keys(__props.distributions)[0] : "")}</h3><div class="w-full h-80"></div><p class="mt-2 text-xs text-arbor-sage/70">Histogramme de la première feature disponible.</p></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Scientific/AudioFeaturesChart.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
