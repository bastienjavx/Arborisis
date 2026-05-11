import { computed, mergeProps, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Components/Scientific/DataTable.vue
var _sfc_main = {
	__name: "DataTable",
	__ssrInlineRender: true,
	props: { data: {
		type: Array,
		default: () => []
	} },
	setup(__props) {
		const props = __props;
		const search = ref("");
		const sortKey = ref("recorded_at");
		const sortAsc = ref(false);
		const filtered = computed(() => {
			let rows = props.data;
			if (search.value.trim()) {
				const q = search.value.toLowerCase();
				rows = rows.filter((r) => r.title?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q) || r.location_name?.toLowerCase().includes(q) || r.equipment?.toLowerCase().includes(q));
			}
			return [...rows].sort((a, b) => {
				const va = a[sortKey.value] ?? "";
				const vb = b[sortKey.value] ?? "";
				if (typeof va === "number" && typeof vb === "number") return sortAsc.value ? va - vb : vb - va;
				return sortAsc.value ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
			});
		});
		function formatDuration(s) {
			if (!s) return "-";
			return `${Math.floor(s / 60)}m ${Math.round(s % 60).toString().padStart(2, "0")}s`;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card p-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"><h3 class="font-display text-xl font-semibold text-arbor-cream">Échantillon de données</h3><div class="flex items-center gap-3"><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Rechercher..." class="bg-arbor-deep border border-arbor-glass-border rounded-lg px-3 py-1.5 text-sm text-arbor-cream placeholder-arbor-sage/50 focus:outline-none focus:border-arbor-emerald/50"><button class="btn-primary text-sm px-4 py-1.5 rounded-lg"> CSV </button></div></div><div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead class="text-xs text-arbor-sage uppercase border-b border-arbor-glass-border"><tr><th class="px-3 py-2 cursor-pointer hover:text-arbor-cream select-none">Titre ↕</th><th class="px-3 py-2 cursor-pointer hover:text-arbor-cream select-none">Durée ↕</th><th class="px-3 py-2 cursor-pointer hover:text-arbor-cream select-none">Catégorie ↕</th><th class="px-3 py-2 cursor-pointer hover:text-arbor-cream select-none">Lieu ↕</th><th class="px-3 py-2 cursor-pointer hover:text-arbor-cream select-none">Date ↕</th><th class="px-3 py-2">Coords</th></tr></thead><tbody><!--[-->`);
			ssrRenderList(filtered.value, (row) => {
				_push(`<tr class="border-b border-arbor-glass-border/50 hover:bg-arbor-glass/30 transition-colors"><td class="px-3 py-2 text-arbor-cream font-medium truncate max-w-[200px]">${ssrInterpolate(row.title)}</td><td class="px-3 py-2 text-arbor-sage">${ssrInterpolate(formatDuration(row.duration))}</td><td class="px-3 py-2 text-arbor-sage">${ssrInterpolate(row.category ?? "-")}</td><td class="px-3 py-2 text-arbor-sage">${ssrInterpolate(row.location_name ?? "-")}</td><td class="px-3 py-2 text-arbor-sage">${ssrInterpolate(row.recorded_at ? new Date(row.recorded_at).toLocaleDateString("fr-FR") : "-")}</td><td class="px-3 py-2 text-arbor-sage font-mono text-xs">${ssrInterpolate(row.latitude?.toFixed(2))}, ${ssrInterpolate(row.longitude?.toFixed(2))}</td></tr>`);
			});
			_push(`<!--]-->`);
			if (filtered.value.length === 0) _push(`<tr><td colspan="6" class="px-3 py-6 text-center text-arbor-sage">Aucun résultat.</td></tr>`);
			else _push(`<!---->`);
			_push(`</tbody></table></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Scientific/DataTable.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
