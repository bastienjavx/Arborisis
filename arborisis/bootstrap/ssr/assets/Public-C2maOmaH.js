import { computed, mergeProps, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/AudioAnalysis/Public.vue
var _sfc_main = {
	__name: "Public",
	__ssrInlineRender: true,
	props: { analysis: Object },
	setup(__props) {
		const props = __props;
		const formatNum = (val, digits = 2) => {
			if (val === null || val === void 0) return "-";
			return Number(val).toFixed(digits);
		};
		const summary = computed(() => {
			const features = props.analysis?.features ?? {};
			const temporal = features.temporal ?? {};
			const spectral = features.spectral ?? {};
			return {
				duration: temporal.duration_seconds ?? 0,
				rms: temporal.rms?.stats?.mean ?? null,
				zcr: temporal.zcr?.stats?.mean ?? null,
				centroid: spectral.centroid?.stats?.mean ?? null
			};
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.analysis) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-5" }, _attrs))}><h4 class="font-semibold text-arbor-cream text-sm mb-3">Analyse audio</h4><div class="grid grid-cols-2 gap-3"><div class="bg-arbor-glass/30 rounded-lg p-3"><div class="text-xs text-arbor-sage">Durée</div><div class="text-sm font-mono text-arbor-cream">${ssrInterpolate(formatNum(summary.value.duration))}s</div></div><div class="bg-arbor-glass/30 rounded-lg p-3"><div class="text-xs text-arbor-sage">RMS moyen</div><div class="text-sm font-mono text-arbor-cream">${ssrInterpolate(formatNum(summary.value.rms))}</div></div><div class="bg-arbor-glass/30 rounded-lg p-3"><div class="text-xs text-arbor-sage">ZCR moyen</div><div class="text-sm font-mono text-arbor-cream">${ssrInterpolate(formatNum(summary.value.zcr))}</div></div><div class="bg-arbor-glass/30 rounded-lg p-3"><div class="text-xs text-arbor-sage">Centroïde (Hz)</div><div class="text-sm font-mono text-arbor-cream">${ssrInterpolate(formatNum(summary.value.centroid, 0))}</div></div></div>`);
				if (__props.analysis.visualizations?.length) {
					_push(`<div class="mt-4"><!--[-->`);
					ssrRenderList(__props.analysis.visualizations.filter((v) => v.type === "mel_spectrogram"), (viz) => {
						_push(`<img${ssrRenderAttr("src", viz.url)} alt="Spectrogramme Mel" class="w-full rounded-lg border border-arbor-glass-border" loading="lazy">`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/AudioAnalysis/Public.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
