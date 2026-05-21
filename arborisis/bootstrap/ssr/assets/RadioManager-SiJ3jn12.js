import { t as _sfc_main$1 } from "./AuthenticatedLayout-BPpla_WX.js";
import { Head, router, useForm } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, onMounted, onUnmounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelCheckbox, vModelText, vShow, withCtx, withDirectives, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Pages/Admin/RadioManager.vue
var _sfc_main = {
	__name: "RadioManager",
	__ssrInlineRender: true,
	props: {
		station: Object,
		status: Object,
		nowPlaying: Object,
		history: Array,
		metrics: Object,
		playlist: Array,
		jingles: Array,
		podcasts: Array,
		generatedSchedule: Array,
		schedules: Array,
		podcast_config: Object
	},
	setup(__props) {
		const props = __props;
		const activeTab = ref("programme");
		const tabs = [
			{
				key: "programme",
				label: "Programme"
			},
			{
				key: "podcasts",
				label: "Podcasts & Flashs"
			},
			{
				key: "grille",
				label: "Grille"
			},
			{
				key: "reglages",
				label: "Réglages"
			}
		];
		const liveStatus = ref(props.status);
		const liveNowPlaying = ref(props.nowPlaying);
		const liveHistory = ref(props.history ?? []);
		const copied = ref(false);
		let interval = null;
		const form = useForm({
			public_stream_url: props.station.public_stream_url ?? "",
			icecast_base_url: props.station.icecast_base_url ?? "",
			icecast_mount: props.station.icecast_mount ?? "/<redacted>.mp3",
			crossfade_seconds: props.station.crossfade_seconds ?? 4,
			dj_enabled: props.station.dj_enabled ?? true,
			dj_announcement_frequency: props.station.dj_announcement_frequency ?? 3,
			dj_voice_id: props.station.dj_voice_id ?? "",
			discord_voice_channel_id: props.station.discord_voice_channel_id ?? "",
			discord_auto_join: props.station.discord_auto_join ?? true
		});
		const streamUrl = computed(() => {
			if (form.public_stream_url) return form.public_stream_url;
			if (!form.icecast_base_url) return null;
			return `${form.icecast_base_url.replace(/\/$/, "")}${form.icecast_mount}`;
		});
		const statusLabel = computed(() => liveStatus.value?.online ? "On air" : "En attente");
		const statusClass = computed(() => liveStatus.value?.online ? "bg-emerald-400" : "bg-amber-400");
		const refreshStatus = async () => {
			try {
				const response = await fetch(route("admin.radio-manager.status"));
				if (!response.ok) return;
				const data = await response.json();
				liveStatus.value = data.status;
				liveNowPlaying.value = data.now_playing;
				liveHistory.value = data.history ?? [];
			} catch {}
		};
		onMounted(() => {
			interval = setInterval(refreshStatus, 5e3);
		});
		onUnmounted(() => {
			if (interval) clearInterval(interval);
		});
		const submitSettings = () => {
			form.put(route("admin.radio-manager.settings.update"), { preserveScroll: true });
		};
		const requestReload = () => {
			router.post(route("admin.radio-manager.reload"), {}, {
				preserveScroll: true,
				onSuccess: refreshStatus
			});
		};
		const copyStream = () => {
			if (!streamUrl.value) return;
			navigator.clipboard.writeText(streamUrl.value);
			copied.value = true;
			setTimeout(() => copied.value = false, 1800);
		};
		const formatDuration = (seconds) => {
			if (!seconds) return "--:--";
			return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
		};
		const formatDate = (iso) => {
			if (!iso) return "—";
			return new Date(iso).toLocaleString("fr-FR", {
				day: "2-digit",
				month: "2-digit",
				hour: "2-digit",
				minute: "2-digit"
			});
		};
		const generateContent = (showType) => {
			router.post(route("admin.radio-manager.generate"), { show_type: showType }, { preserveScroll: true });
		};
		const publishPodcast = (id) => {
			router.post(route("admin.radio-manager.podcasts.publish", id), {}, { preserveScroll: true });
		};
		const rejectPodcast = (id) => {
			router.post(route("admin.radio-manager.podcasts.reject", id), {}, { preserveScroll: true });
		};
		const deletePodcast = (id) => {
			if (!confirm("Supprimer ce contenu ?")) return;
			router.delete(route("admin.radio-manager.podcasts.destroy", id), { preserveScroll: true });
		};
		const statusBadge = (status) => {
			return {
				pending: {
					label: "En attente",
					cls: "bg-amber-500/20 text-amber-300"
				},
				generating: {
					label: "Génération…",
					cls: "bg-blue-500/20 text-blue-300 animate-pulse"
				},
				validating: {
					label: "À valider",
					cls: "bg-orange-500/20 text-orange-300"
				},
				published: {
					label: "En antenne",
					cls: "bg-emerald-500/20 text-emerald-300"
				},
				failed: {
					label: "Échec",
					cls: "bg-red-500/20 text-red-400"
				},
				rejected: {
					label: "Rejeté",
					cls: "bg-stone-500/20 text-stone-400"
				}
			}[status] ?? {
				label: status,
				cls: "bg-stone-500/20 text-stone-400"
			};
		};
		const typeBadge = (type) => {
			return {
				podcast: {
					label: "Podcast",
					cls: "bg-violet-500/20 text-violet-300"
				},
				flash: {
					label: "Flash info",
					cls: "bg-cyan-500/20 text-cyan-300"
				},
				emission: {
					label: "Émission",
					cls: "bg-pink-500/20 text-pink-300"
				}
			}[type] ?? {
				label: type ?? "?",
				cls: "bg-stone-500/20 text-stone-400"
			};
		};
		const repeatLabel = (repeat) => {
			return {
				none: "Unique",
				daily: "Quotidien",
				weekly: "Hebdo",
				monthly: "Mensuel"
			}[repeat] ?? repeat ?? "—";
		};
		const trackKindLabel = (track) => {
			if (track.kind === "podcast") return typeBadge(track.show_type).label;
			if (track.kind === "jingle") return "Jingle";
			return "Son";
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Radio Manager" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"${_scopeId}><div${_scopeId}><p class="text-xs uppercase tracking-[0.3em] text-arbor-sage"${_scopeId}>Station control</p><h1 class="font-display text-3xl font-semibold text-arbor-cream"${_scopeId}>Radio Manager</h1></div><div class="flex items-center gap-3"${_scopeId}><span class="inline-flex items-center gap-2 rounded-full border border-arbor-glass-border bg-arbor-glass px-4 py-2 text-sm text-arbor-cream"${_scopeId}><span class="${ssrRenderClass([statusClass.value, "h-2.5 w-2.5 rounded-full"])}"${_scopeId}></span> ${ssrInterpolate(statusLabel.value)}</span><button type="button" class="rounded-lg bg-arbor-emerald px-4 py-2 text-sm font-semibold text-arbor-night transition hover:bg-arbor-cream"${_scopeId}> Reload </button></div></div>`);
					else return [createVNode("div", { class: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between" }, [createVNode("div", null, [createVNode("p", { class: "text-xs uppercase tracking-[0.3em] text-arbor-sage" }, "Station control"), createVNode("h1", { class: "font-display text-3xl font-semibold text-arbor-cream" }, "Radio Manager")]), createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "inline-flex items-center gap-2 rounded-full border border-arbor-glass-border bg-arbor-glass px-4 py-2 text-sm text-arbor-cream" }, [createVNode("span", { class: ["h-2.5 w-2.5 rounded-full", statusClass.value] }, null, 2), createTextVNode(" " + toDisplayString(statusLabel.value), 1)]), createVNode("button", {
						type: "button",
						onClick: requestReload,
						class: "rounded-lg bg-arbor-emerald px-4 py-2 text-sm font-semibold text-arbor-night transition hover:bg-arbor-cream"
					}, " Reload ")])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6 flex gap-1 rounded-xl border border-arbor-glass-border bg-arbor-night/60 p-1"${_scopeId}><!--[-->`);
						ssrRenderList(tabs, (tab) => {
							_push(`<button type="button" class="${ssrRenderClass([activeTab.value === tab.key ? "bg-arbor-emerald text-arbor-night" : "text-arbor-sage hover:text-arbor-cream", "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition"])}"${_scopeId}>${ssrInterpolate(tab.label)}</button>`);
						});
						_push(`<!--]--></div><div class="space-y-6" style="${ssrRenderStyle(activeTab.value === "programme" ? null : { display: "none" })}"${_scopeId}><div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"${_scopeId}><div class="rounded-lg border border-arbor-glass-border bg-arbor-glass p-4"${_scopeId}><p class="text-xs text-arbor-sage"${_scopeId}>Playlist</p><p class="mt-1 text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.metrics.playlist_tracks)}</p></div><div class="rounded-lg border border-arbor-glass-border bg-arbor-glass p-4"${_scopeId}><p class="text-xs text-arbor-sage"${_scopeId}>Sons publics</p><p class="mt-1 text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.metrics.tracks)}</p></div><div class="rounded-lg border border-arbor-glass-border bg-arbor-glass p-4"${_scopeId}><p class="text-xs text-arbor-sage"${_scopeId}>Schedules</p><p class="mt-1 text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.metrics.schedules)}</p></div><div class="rounded-lg border border-arbor-glass-border bg-arbor-glass p-4"${_scopeId}><p class="text-xs text-arbor-sage"${_scopeId}>Jingles</p><p class="mt-1 text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.metrics.jingles)}</p></div><div class="rounded-lg border border-arbor-glass-border bg-arbor-glass p-4"${_scopeId}><p class="text-xs text-arbor-sage"${_scopeId}>Voix DJ</p><p class="mt-1 text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.metrics.dj_announcements)}</p></div><div class="rounded-lg border border-arbor-glass-border bg-arbor-glass p-4"${_scopeId}><p class="text-xs text-arbor-sage"${_scopeId}>Podcasts on air</p><p class="mt-1 text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.metrics.podcasts_published)}</p></div><div class="rounded-lg border border-arbor-glass-border bg-arbor-glass p-4"${_scopeId}><p class="text-xs text-arbor-sage"${_scopeId}>En génération</p><p class="mt-1 text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.metrics.podcasts_pending)}</p></div></div><div class="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]"${_scopeId}><section class="overflow-hidden rounded-lg border border-arbor-glass-border bg-arbor-deep"${_scopeId}><div class="grid gap-0 md:grid-cols-[220px_1fr]"${_scopeId}><div class="relative min-h-56 bg-arbor-night"${_scopeId}>`);
						if (liveNowPlaying.value?.cover) _push(`<img${ssrRenderAttr("src", liveNowPlaying.value.cover)} alt="" class="absolute inset-0 h-full w-full object-cover"${_scopeId}>`);
						else _push(`<!---->`);
						_push(`<div class="absolute inset-0 bg-gradient-to-t from-arbor-night via-arbor-night/30 to-transparent"${_scopeId}></div><div class="absolute bottom-5 left-5 right-5"${_scopeId}><p class="mb-1 text-xs uppercase tracking-[0.24em] text-arbor-emerald"${_scopeId}>Now playing</p><h2 class="line-clamp-2 font-display text-2xl font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(liveNowPlaying.value?.title ?? "Aucun titre reçu")}</h2><p class="mt-1 truncate text-sm text-arbor-sage"${_scopeId}>${ssrInterpolate(liveNowPlaying.value?.artist ?? "En attente de metadata")}</p>`);
						if (liveNowPlaying.value?.duration) _push(`<p class="mt-1 font-mono text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDuration(liveNowPlaying.value.duration))}</p>`);
						else _push(`<!---->`);
						_push(`</div></div><div class="p-6"${_scopeId}><p class="mb-3 text-xs uppercase tracking-[0.2em] text-arbor-sage"${_scopeId}>Flux public</p><div class="flex items-center gap-2 rounded-lg border border-arbor-glass-border bg-arbor-night/40 p-3"${_scopeId}><p class="min-w-0 flex-1 truncate font-mono text-sm text-arbor-cream"${_scopeId}>${ssrInterpolate(streamUrl.value ?? "Non configuré")}</p><button type="button" class="shrink-0 rounded px-2 py-1 text-xs text-arbor-sage transition hover:text-arbor-cream"${_scopeId}>${ssrInterpolate(copied.value ? "Copié ✓" : "Copier")}</button></div>`);
						if (__props.podcast_config.enabled) _push(`<div class="mt-4 rounded-lg border border-arbor-glass-border bg-arbor-night/40 p-3"${_scopeId}><p class="text-xs text-arbor-sage"${_scopeId}> Podcasts/flashs insérés tous les <span class="font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(__props.podcast_config.interval_tracks)} sons</span></p></div>`);
						else _push(`<div class="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3"${_scopeId}><p class="text-xs text-amber-300"${_scopeId}>Podcasts désactivés — activer <code class="font-mono"${_scopeId}>RADIO_PODCAST_ENABLED</code> ou <code class="font-mono"${_scopeId}>RADIO_HOST_FLASH_ENABLED</code></p></div>`);
						_push(`</div></div></section><section class="rounded-lg border border-arbor-glass-border bg-arbor-deep p-6"${_scopeId}><h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-arbor-sage"${_scopeId}>Historique live</h3><div class="mt-4 space-y-2"${_scopeId}><!--[-->`);
						ssrRenderList(liveHistory.value, (item) => {
							_push(`<div class="flex items-center justify-between gap-4 border-b border-arbor-glass-border pb-2 last:border-0"${_scopeId}><div class="min-w-0"${_scopeId}><p class="truncate text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(item.title)}</p><p class="truncate text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(item.artist)}</p></div><span class="shrink-0 font-mono text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDuration(item.duration))}</span></div>`);
						});
						_push(`<!--]-->`);
						if (!liveHistory.value?.length) _push(`<p class="text-sm text-arbor-sage"${_scopeId}>Aucun historique pour le moment.</p>`);
						else _push(`<!---->`);
						_push(`</div></section></div><section class="rounded-lg border border-arbor-glass-border bg-arbor-deep p-6"${_scopeId}><h3 class="font-display text-lg font-semibold text-arbor-cream"${_scopeId}>Playlist moteur <span class="ml-2 text-sm font-normal text-arbor-sage"${_scopeId}>(30 premiers sons)</span></h3><div class="mt-4 max-h-72 overflow-y-auto"${_scopeId}><!--[-->`);
						ssrRenderList(__props.playlist, (track) => {
							_push(`<div class="grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-arbor-glass-border py-2 last:border-0"${_scopeId}><span class="font-mono text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(track.position + 1)}</span><div class="min-w-0"${_scopeId}><div class="flex min-w-0 items-center gap-2"${_scopeId}><span class="${ssrRenderClass([track.kind === "podcast" ? typeBadge(track.show_type).cls : "bg-arbor-glass text-arbor-sage", "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"])}"${_scopeId}>${ssrInterpolate(trackKindLabel(track))}</span><p class="truncate text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(track.title)}</p></div><p class="truncate text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(track.artist)} `);
							if (track.dj_announcement_url) _push(`<span class="text-arbor-emerald"${_scopeId}> · DJ</span>`);
							else _push(`<!---->`);
							_push(`</p></div><span class="font-mono text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDuration(track.duration))}</span></div>`);
						});
						_push(`<!--]-->`);
						if (!__props.playlist?.length) _push(`<p class="text-sm text-arbor-sage"${_scopeId}>Aucun son jouable exporté.</p>`);
						else _push(`<!---->`);
						_push(`</div></section></div><div class="space-y-6" style="${ssrRenderStyle(activeTab.value === "podcasts" ? null : { display: "none" })}"${_scopeId}><section class="rounded-lg border border-arbor-glass-border bg-arbor-deep p-6"${_scopeId}><h3 class="mb-1 font-display text-xl font-semibold text-arbor-cream"${_scopeId}>Générer un contenu</h3><p class="mb-5 text-sm text-arbor-sage"${_scopeId}>Les générations sont asynchrones (queue radio) — le statut apparaîtra dans la liste ci-dessous.</p><div class="flex flex-wrap gap-3"${_scopeId}><button type="button" class="rounded-lg border border-violet-500/30 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20"${_scopeId}> Générer un podcast </button><button type="button" class="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"${_scopeId}> Flash info </button><button type="button" class="rounded-lg border border-pink-500/30 bg-pink-500/10 px-5 py-2.5 text-sm font-semibold text-pink-300 transition hover:bg-pink-500/20"${_scopeId}> Émission </button></div></section><section class="rounded-lg border border-arbor-glass-border bg-arbor-deep"${_scopeId}><div class="border-b border-arbor-glass-border px-6 py-4"${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream"${_scopeId}>Contenus générés</h3></div><div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-arbor-glass-border text-left"${_scopeId}><th class="px-6 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage"${_scopeId}>Type</th><th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage"${_scopeId}>Titre</th><th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage"${_scopeId}>Statut</th><th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage"${_scopeId}>Durée</th><th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage"${_scopeId}>Créé</th><th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage"${_scopeId}>Actions</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.podcasts, (podcast) => {
							_push(`<tr class="border-b border-arbor-glass-border last:border-0 hover:bg-arbor-glass/30"${_scopeId}><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([typeBadge(podcast.show_type).cls, "rounded-full px-2 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(typeBadge(podcast.show_type).label)}</span></td><td class="max-w-xs px-4 py-4"${_scopeId}><p class="truncate font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(podcast.title)}</p></td><td class="px-4 py-4"${_scopeId}><span class="${ssrRenderClass([statusBadge(podcast.status).cls, "rounded-full px-2 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(statusBadge(podcast.status).label)}</span></td><td class="px-4 py-4 font-mono text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDuration(podcast.duration))}</td><td class="px-4 py-4 text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDate(podcast.created_at))}</td><td class="px-4 py-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
							if (podcast.status === "validating") _push(`<button type="button" class="rounded px-2 py-1 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/10"${_scopeId}> Mettre en antenne </button>`);
							else _push(`<!---->`);
							if (podcast.status === "validating") _push(`<button type="button" class="rounded px-2 py-1 text-xs font-medium text-amber-300 transition hover:bg-amber-500/10"${_scopeId}> Rejeter </button>`);
							else _push(`<!---->`);
							_push(`<button type="button" class="rounded px-2 py-1 text-xs font-medium text-red-400 transition hover:bg-red-500/10"${_scopeId}> Supprimer </button></div></td></tr>`);
						});
						_push(`<!--]--></tbody></table>`);
						if (!__props.podcasts?.length) _push(`<p class="px-6 py-8 text-sm text-arbor-sage"${_scopeId}>Aucun contenu généré pour le moment.</p>`);
						else _push(`<!---->`);
						_push(`</div></section></div><div class="space-y-4" style="${ssrRenderStyle(activeTab.value === "grille" ? null : { display: "none" })}"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="font-display text-xl font-semibold text-arbor-cream"${_scopeId}>Grille de programmation</h3><p class="mt-1 text-sm text-arbor-sage"${_scopeId}>Schedules actifs et contenus générés insérés dans le flux.</p></div><a href="/admin/radio-schedules" class="rounded-lg border border-arbor-glass-border px-4 py-2 text-sm text-arbor-sage transition hover:text-arbor-cream"${_scopeId}> Gérer les schedules → </a></div><section class="rounded-lg border border-arbor-glass-border bg-arbor-deep p-5"${_scopeId}><div class="flex flex-wrap items-start justify-between gap-3"${_scopeId}><div${_scopeId}><h4 class="font-semibold text-arbor-cream"${_scopeId}>Flashs, émissions et podcasts</h4><p class="mt-1 text-sm text-arbor-sage"${_scopeId}> Insertion automatique tous les ${ssrInterpolate(__props.podcast_config.interval_tracks)} sons, avec rotation des contenus publiés. </p></div><span class="rounded border border-arbor-glass-border px-2 py-0.5 text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(__props.generatedSchedule?.length ?? 0)} prêt${ssrInterpolate(__props.generatedSchedule?.length !== 1 ? "s" : "")}</span></div>`);
						if (__props.generatedSchedule?.length) {
							_push(`<div class="mt-4 space-y-2"${_scopeId}><!--[-->`);
							ssrRenderList(__props.generatedSchedule, (item) => {
								_push(`<div class="grid gap-2 border-t border-arbor-glass-border pt-3 sm:grid-cols-[auto_1fr_auto]"${_scopeId}><span class="${ssrRenderClass([typeBadge(item.show_type).cls, "w-fit rounded-full px-2 py-0.5 text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(typeBadge(item.show_type).label)}</span><div class="min-w-0"${_scopeId}><p class="truncate text-sm font-medium text-arbor-cream"${_scopeId}>${ssrInterpolate(item.title)}</p><p class="text-xs text-arbor-sage"${_scopeId}>Publié ${ssrInterpolate(formatDate(item.published_at))}</p></div><span class="font-mono text-xs text-arbor-sage"${_scopeId}>${ssrInterpolate(formatDuration(item.duration))}</span></div>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<p class="mt-4 border-t border-arbor-glass-border pt-4 text-sm text-arbor-sage"${_scopeId}> Aucun contenu généré publié pour l&#39;antenne. </p>`);
						_push(`</section>`);
						if (__props.schedules?.length) {
							_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
							ssrRenderList(__props.schedules, (schedule) => {
								_push(`<div class="${ssrRenderClass([schedule.is_currently_active ? "border-arbor-emerald/40 bg-arbor-emerald/5" : "border-arbor-glass-border", "rounded-lg border bg-arbor-deep p-5 transition"])}"${_scopeId}><div class="flex flex-wrap items-start justify-between gap-3"${_scopeId}><div${_scopeId}><div class="flex items-center gap-2"${_scopeId}><h4 class="font-semibold text-arbor-cream"${_scopeId}>${ssrInterpolate(schedule.name)}</h4>`);
								if (schedule.is_currently_active) _push(`<span class="rounded-full bg-arbor-emerald/20 px-2 py-0.5 text-xs font-medium text-arbor-emerald"${_scopeId}> En cours </span>`);
								else _push(`<!---->`);
								_push(`</div><p class="mt-1 font-mono text-sm text-arbor-sage"${_scopeId}>${ssrInterpolate(schedule.starts_at ?? "--:--")} → ${ssrInterpolate(schedule.ends_at ?? "fin de journée")}</p></div><div class="flex flex-wrap items-center gap-2 text-xs"${_scopeId}><span class="rounded border border-arbor-glass-border px-2 py-0.5 text-arbor-sage"${_scopeId}>${ssrInterpolate(repeatLabel(schedule.repeat))}</span><span class="rounded border border-arbor-glass-border px-2 py-0.5 text-arbor-sage"${_scopeId}> Priorité ${ssrInterpolate(schedule.priority)}</span><span class="rounded border border-arbor-glass-border px-2 py-0.5 text-arbor-sage"${_scopeId}>${ssrInterpolate(schedule.sounds_count)} son${ssrInterpolate(schedule.sounds_count !== 1 ? "s" : "")}</span></div></div></div>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<div class="rounded-lg border border-arbor-glass-border bg-arbor-deep p-10 text-center"${_scopeId}><p class="text-arbor-sage"${_scopeId}>Aucun schedule actif.</p><a href="/admin/radio-schedules" class="mt-3 inline-block text-sm text-arbor-emerald hover:underline"${_scopeId}> Créer un schedule → </a></div>`);
						_push(`</div><div style="${ssrRenderStyle(activeTab.value === "reglages" ? null : { display: "none" })}"${_scopeId}><form class="max-w-2xl rounded-lg border border-arbor-glass-border bg-arbor-deep p-6"${_scopeId}><h3 class="font-display text-2xl font-semibold text-arbor-cream"${_scopeId}>Réglages station</h3><div class="mt-6 grid gap-4 sm:grid-cols-2"${_scopeId}><label class="sm:col-span-2"${_scopeId}><span class="text-sm text-arbor-sage"${_scopeId}>URL publique du flux</span><input${ssrRenderAttr("value", unref(form).public_stream_url)} type="url" class="mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"${_scopeId}></label><label${_scopeId}><span class="text-sm text-arbor-sage"${_scopeId}>Base Icecast</span><input${ssrRenderAttr("value", unref(form).icecast_base_url)} type="url" class="mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"${_scopeId}></label><label${_scopeId}><span class="text-sm text-arbor-sage"${_scopeId}>Mount</span><input${ssrRenderAttr("value", unref(form).icecast_mount)} type="text" class="mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"${_scopeId}></label><label${_scopeId}><span class="text-sm text-arbor-sage"${_scopeId}>Crossfade (secondes)</span><input${ssrRenderAttr("value", unref(form).crossfade_seconds)} type="number" min="0" max="30" class="mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"${_scopeId}></label><label${_scopeId}><span class="text-sm text-arbor-sage"${_scopeId}>Fréquence annonces DJ</span><input${ssrRenderAttr("value", unref(form).dj_announcement_frequency)} type="number" min="1" max="20" class="mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"${_scopeId}></label><label class="sm:col-span-2"${_scopeId}><span class="text-sm text-arbor-sage"${_scopeId}>ElevenLabs voice ID</span><input${ssrRenderAttr("value", unref(form).dj_voice_id)} type="text" class="mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"${_scopeId}></label><label class="sm:col-span-2"${_scopeId}><span class="text-sm text-arbor-sage"${_scopeId}>Discord voice channel ID</span><input${ssrRenderAttr("value", unref(form).discord_voice_channel_id)} type="text" class="mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"${_scopeId}></label></div><div class="mt-5 flex flex-wrap gap-4"${_scopeId}><label class="inline-flex items-center gap-2 text-sm text-arbor-cream"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).dj_enabled) ? ssrLooseContain(unref(form).dj_enabled, null) : unref(form).dj_enabled) ? " checked" : ""} type="checkbox" class="rounded border-arbor-glass-border bg-arbor-night text-arbor-emerald"${_scopeId}> DJ automatique </label><label class="inline-flex items-center gap-2 text-sm text-arbor-cream"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).discord_auto_join) ? ssrLooseContain(unref(form).discord_auto_join, null) : unref(form).discord_auto_join) ? " checked" : ""} type="checkbox" class="rounded border-arbor-glass-border bg-arbor-night text-arbor-emerald"${_scopeId}> Auto-join Discord </label></div><div class="mt-6 flex items-center gap-4"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-lg bg-arbor-emerald px-5 py-2.5 text-sm font-semibold text-arbor-night transition hover:bg-arbor-cream disabled:opacity-60"${_scopeId}> Enregistrer </button>`);
						if (unref(form).wasSuccessful) _push(`<span class="text-sm text-arbor-emerald"${_scopeId}>Sauvegardé ✓</span>`);
						else _push(`<!---->`);
						_push(`</div></form></div></div>`);
					} else return [createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" }, [
						createVNode("div", { class: "mb-6 flex gap-1 rounded-xl border border-arbor-glass-border bg-arbor-night/60 p-1" }, [(openBlock(), createBlock(Fragment, null, renderList(tabs, (tab) => {
							return createVNode("button", {
								key: tab.key,
								type: "button",
								onClick: ($event) => activeTab.value = tab.key,
								class: ["flex-1 rounded-lg px-4 py-2 text-sm font-medium transition", activeTab.value === tab.key ? "bg-arbor-emerald text-arbor-night" : "text-arbor-sage hover:text-arbor-cream"]
							}, toDisplayString(tab.label), 11, ["onClick"]);
						}), 64))]),
						withDirectives(createVNode("div", { class: "space-y-6" }, [
							createVNode("div", { class: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7" }, [
								createVNode("div", { class: "rounded-lg border border-arbor-glass-border bg-arbor-glass p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage" }, "Playlist"), createVNode("p", { class: "mt-1 text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.metrics.playlist_tracks), 1)]),
								createVNode("div", { class: "rounded-lg border border-arbor-glass-border bg-arbor-glass p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage" }, "Sons publics"), createVNode("p", { class: "mt-1 text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.metrics.tracks), 1)]),
								createVNode("div", { class: "rounded-lg border border-arbor-glass-border bg-arbor-glass p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage" }, "Schedules"), createVNode("p", { class: "mt-1 text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.metrics.schedules), 1)]),
								createVNode("div", { class: "rounded-lg border border-arbor-glass-border bg-arbor-glass p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage" }, "Jingles"), createVNode("p", { class: "mt-1 text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.metrics.jingles), 1)]),
								createVNode("div", { class: "rounded-lg border border-arbor-glass-border bg-arbor-glass p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage" }, "Voix DJ"), createVNode("p", { class: "mt-1 text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.metrics.dj_announcements), 1)]),
								createVNode("div", { class: "rounded-lg border border-arbor-glass-border bg-arbor-glass p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage" }, "Podcasts on air"), createVNode("p", { class: "mt-1 text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.metrics.podcasts_published), 1)]),
								createVNode("div", { class: "rounded-lg border border-arbor-glass-border bg-arbor-glass p-4" }, [createVNode("p", { class: "text-xs text-arbor-sage" }, "En génération"), createVNode("p", { class: "mt-1 text-2xl font-semibold text-arbor-cream" }, toDisplayString(__props.metrics.podcasts_pending), 1)])
							]),
							createVNode("div", { class: "grid gap-6 lg:grid-cols-[1.3fr_0.7fr]" }, [createVNode("section", { class: "overflow-hidden rounded-lg border border-arbor-glass-border bg-arbor-deep" }, [createVNode("div", { class: "grid gap-0 md:grid-cols-[220px_1fr]" }, [createVNode("div", { class: "relative min-h-56 bg-arbor-night" }, [
								liveNowPlaying.value?.cover ? (openBlock(), createBlock("img", {
									key: 0,
									src: liveNowPlaying.value.cover,
									alt: "",
									class: "absolute inset-0 h-full w-full object-cover"
								}, null, 8, ["src"])) : createCommentVNode("", true),
								createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-arbor-night via-arbor-night/30 to-transparent" }),
								createVNode("div", { class: "absolute bottom-5 left-5 right-5" }, [
									createVNode("p", { class: "mb-1 text-xs uppercase tracking-[0.24em] text-arbor-emerald" }, "Now playing"),
									createVNode("h2", { class: "line-clamp-2 font-display text-2xl font-semibold text-arbor-cream" }, toDisplayString(liveNowPlaying.value?.title ?? "Aucun titre reçu"), 1),
									createVNode("p", { class: "mt-1 truncate text-sm text-arbor-sage" }, toDisplayString(liveNowPlaying.value?.artist ?? "En attente de metadata"), 1),
									liveNowPlaying.value?.duration ? (openBlock(), createBlock("p", {
										key: 0,
										class: "mt-1 font-mono text-xs text-arbor-sage"
									}, toDisplayString(formatDuration(liveNowPlaying.value.duration)), 1)) : createCommentVNode("", true)
								])
							]), createVNode("div", { class: "p-6" }, [
								createVNode("p", { class: "mb-3 text-xs uppercase tracking-[0.2em] text-arbor-sage" }, "Flux public"),
								createVNode("div", { class: "flex items-center gap-2 rounded-lg border border-arbor-glass-border bg-arbor-night/40 p-3" }, [createVNode("p", { class: "min-w-0 flex-1 truncate font-mono text-sm text-arbor-cream" }, toDisplayString(streamUrl.value ?? "Non configuré"), 1), createVNode("button", {
									type: "button",
									onClick: copyStream,
									class: "shrink-0 rounded px-2 py-1 text-xs text-arbor-sage transition hover:text-arbor-cream"
								}, toDisplayString(copied.value ? "Copié ✓" : "Copier"), 1)]),
								__props.podcast_config.enabled ? (openBlock(), createBlock("div", {
									key: 0,
									class: "mt-4 rounded-lg border border-arbor-glass-border bg-arbor-night/40 p-3"
								}, [createVNode("p", { class: "text-xs text-arbor-sage" }, [createTextVNode(" Podcasts/flashs insérés tous les "), createVNode("span", { class: "font-semibold text-arbor-cream" }, toDisplayString(__props.podcast_config.interval_tracks) + " sons", 1)])])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3"
								}, [createVNode("p", { class: "text-xs text-amber-300" }, [
									createTextVNode("Podcasts désactivés — activer "),
									createVNode("code", { class: "font-mono" }, "RADIO_PODCAST_ENABLED"),
									createTextVNode(" ou "),
									createVNode("code", { class: "font-mono" }, "RADIO_HOST_FLASH_ENABLED")
								])]))
							])])]), createVNode("section", { class: "rounded-lg border border-arbor-glass-border bg-arbor-deep p-6" }, [createVNode("h3", { class: "text-sm font-semibold uppercase tracking-[0.2em] text-arbor-sage" }, "Historique live"), createVNode("div", { class: "mt-4 space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(liveHistory.value, (item) => {
								return openBlock(), createBlock("div", {
									key: `${item.sound_id}-${item.played_at}`,
									class: "flex items-center justify-between gap-4 border-b border-arbor-glass-border pb-2 last:border-0"
								}, [createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate text-sm font-medium text-arbor-cream" }, toDisplayString(item.title), 1), createVNode("p", { class: "truncate text-xs text-arbor-sage" }, toDisplayString(item.artist), 1)]), createVNode("span", { class: "shrink-0 font-mono text-xs text-arbor-sage" }, toDisplayString(formatDuration(item.duration)), 1)]);
							}), 128)), !liveHistory.value?.length ? (openBlock(), createBlock("p", {
								key: 0,
								class: "text-sm text-arbor-sage"
							}, "Aucun historique pour le moment.")) : createCommentVNode("", true)])])]),
							createVNode("section", { class: "rounded-lg border border-arbor-glass-border bg-arbor-deep p-6" }, [createVNode("h3", { class: "font-display text-lg font-semibold text-arbor-cream" }, [createTextVNode("Playlist moteur "), createVNode("span", { class: "ml-2 text-sm font-normal text-arbor-sage" }, "(30 premiers sons)")]), createVNode("div", { class: "mt-4 max-h-72 overflow-y-auto" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.playlist, (track) => {
								return openBlock(), createBlock("div", {
									key: `${track.kind}-${track.id}-${track.position}`,
									class: "grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-arbor-glass-border py-2 last:border-0"
								}, [
									createVNode("span", { class: "font-mono text-xs text-arbor-sage" }, toDisplayString(track.position + 1), 1),
									createVNode("div", { class: "min-w-0" }, [createVNode("div", { class: "flex min-w-0 items-center gap-2" }, [createVNode("span", { class: ["shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", track.kind === "podcast" ? typeBadge(track.show_type).cls : "bg-arbor-glass text-arbor-sage"] }, toDisplayString(trackKindLabel(track)), 3), createVNode("p", { class: "truncate text-sm font-medium text-arbor-cream" }, toDisplayString(track.title), 1)]), createVNode("p", { class: "truncate text-xs text-arbor-sage" }, [createTextVNode(toDisplayString(track.artist) + " ", 1), track.dj_announcement_url ? (openBlock(), createBlock("span", {
										key: 0,
										class: "text-arbor-emerald"
									}, " · DJ")) : createCommentVNode("", true)])]),
									createVNode("span", { class: "font-mono text-xs text-arbor-sage" }, toDisplayString(formatDuration(track.duration)), 1)
								]);
							}), 128)), !__props.playlist?.length ? (openBlock(), createBlock("p", {
								key: 0,
								class: "text-sm text-arbor-sage"
							}, "Aucun son jouable exporté.")) : createCommentVNode("", true)])])
						], 512), [[vShow, activeTab.value === "programme"]]),
						withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode("section", { class: "rounded-lg border border-arbor-glass-border bg-arbor-deep p-6" }, [
							createVNode("h3", { class: "mb-1 font-display text-xl font-semibold text-arbor-cream" }, "Générer un contenu"),
							createVNode("p", { class: "mb-5 text-sm text-arbor-sage" }, "Les générations sont asynchrones (queue radio) — le statut apparaîtra dans la liste ci-dessous."),
							createVNode("div", { class: "flex flex-wrap gap-3" }, [
								createVNode("button", {
									type: "button",
									onClick: ($event) => generateContent("podcast"),
									class: "rounded-lg border border-violet-500/30 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20"
								}, " Générer un podcast ", 8, ["onClick"]),
								createVNode("button", {
									type: "button",
									onClick: ($event) => generateContent("flash"),
									class: "rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
								}, " Flash info ", 8, ["onClick"]),
								createVNode("button", {
									type: "button",
									onClick: ($event) => generateContent("emission"),
									class: "rounded-lg border border-pink-500/30 bg-pink-500/10 px-5 py-2.5 text-sm font-semibold text-pink-300 transition hover:bg-pink-500/20"
								}, " Émission ", 8, ["onClick"])
							])
						]), createVNode("section", { class: "rounded-lg border border-arbor-glass-border bg-arbor-deep" }, [createVNode("div", { class: "border-b border-arbor-glass-border px-6 py-4" }, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream" }, "Contenus générés")]), createVNode("div", { class: "overflow-x-auto" }, [createVNode("table", { class: "w-full text-sm" }, [createVNode("thead", null, [createVNode("tr", { class: "border-b border-arbor-glass-border text-left" }, [
							createVNode("th", { class: "px-6 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage" }, "Type"),
							createVNode("th", { class: "px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage" }, "Titre"),
							createVNode("th", { class: "px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage" }, "Statut"),
							createVNode("th", { class: "px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage" }, "Durée"),
							createVNode("th", { class: "px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage" }, "Créé"),
							createVNode("th", { class: "px-4 py-3 text-xs font-medium uppercase tracking-wide text-arbor-sage" }, "Actions")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.podcasts, (podcast) => {
							return openBlock(), createBlock("tr", {
								key: podcast.id,
								class: "border-b border-arbor-glass-border last:border-0 hover:bg-arbor-glass/30"
							}, [
								createVNode("td", { class: "px-6 py-4" }, [createVNode("span", { class: ["rounded-full px-2 py-0.5 text-xs font-medium", typeBadge(podcast.show_type).cls] }, toDisplayString(typeBadge(podcast.show_type).label), 3)]),
								createVNode("td", { class: "max-w-xs px-4 py-4" }, [createVNode("p", { class: "truncate font-medium text-arbor-cream" }, toDisplayString(podcast.title), 1)]),
								createVNode("td", { class: "px-4 py-4" }, [createVNode("span", { class: ["rounded-full px-2 py-0.5 text-xs font-medium", statusBadge(podcast.status).cls] }, toDisplayString(statusBadge(podcast.status).label), 3)]),
								createVNode("td", { class: "px-4 py-4 font-mono text-xs text-arbor-sage" }, toDisplayString(formatDuration(podcast.duration)), 1),
								createVNode("td", { class: "px-4 py-4 text-xs text-arbor-sage" }, toDisplayString(formatDate(podcast.created_at)), 1),
								createVNode("td", { class: "px-4 py-4" }, [createVNode("div", { class: "flex items-center gap-2" }, [
									podcast.status === "validating" ? (openBlock(), createBlock("button", {
										key: 0,
										type: "button",
										onClick: ($event) => publishPodcast(podcast.id),
										class: "rounded px-2 py-1 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/10"
									}, " Mettre en antenne ", 8, ["onClick"])) : createCommentVNode("", true),
									podcast.status === "validating" ? (openBlock(), createBlock("button", {
										key: 1,
										type: "button",
										onClick: ($event) => rejectPodcast(podcast.id),
										class: "rounded px-2 py-1 text-xs font-medium text-amber-300 transition hover:bg-amber-500/10"
									}, " Rejeter ", 8, ["onClick"])) : createCommentVNode("", true),
									createVNode("button", {
										type: "button",
										onClick: ($event) => deletePodcast(podcast.id),
										class: "rounded px-2 py-1 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
									}, " Supprimer ", 8, ["onClick"])
								])])
							]);
						}), 128))])]), !__props.podcasts?.length ? (openBlock(), createBlock("p", {
							key: 0,
							class: "px-6 py-8 text-sm text-arbor-sage"
						}, "Aucun contenu généré pour le moment.")) : createCommentVNode("", true)])])], 512), [[vShow, activeTab.value === "podcasts"]]),
						withDirectives(createVNode("div", { class: "space-y-4" }, [
							createVNode("div", { class: "flex items-center justify-between" }, [createVNode("div", null, [createVNode("h3", { class: "font-display text-xl font-semibold text-arbor-cream" }, "Grille de programmation"), createVNode("p", { class: "mt-1 text-sm text-arbor-sage" }, "Schedules actifs et contenus générés insérés dans le flux.")]), createVNode("a", {
								href: "/admin/radio-schedules",
								class: "rounded-lg border border-arbor-glass-border px-4 py-2 text-sm text-arbor-sage transition hover:text-arbor-cream"
							}, " Gérer les schedules → ")]),
							createVNode("section", { class: "rounded-lg border border-arbor-glass-border bg-arbor-deep p-5" }, [createVNode("div", { class: "flex flex-wrap items-start justify-between gap-3" }, [createVNode("div", null, [createVNode("h4", { class: "font-semibold text-arbor-cream" }, "Flashs, émissions et podcasts"), createVNode("p", { class: "mt-1 text-sm text-arbor-sage" }, " Insertion automatique tous les " + toDisplayString(__props.podcast_config.interval_tracks) + " sons, avec rotation des contenus publiés. ", 1)]), createVNode("span", { class: "rounded border border-arbor-glass-border px-2 py-0.5 text-xs text-arbor-sage" }, toDisplayString(__props.generatedSchedule?.length ?? 0) + " prêt" + toDisplayString(__props.generatedSchedule?.length !== 1 ? "s" : ""), 1)]), __props.generatedSchedule?.length ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mt-4 space-y-2"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.generatedSchedule, (item) => {
								return openBlock(), createBlock("div", {
									key: `generated-${item.id}`,
									class: "grid gap-2 border-t border-arbor-glass-border pt-3 sm:grid-cols-[auto_1fr_auto]"
								}, [
									createVNode("span", { class: ["w-fit rounded-full px-2 py-0.5 text-xs font-medium", typeBadge(item.show_type).cls] }, toDisplayString(typeBadge(item.show_type).label), 3),
									createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate text-sm font-medium text-arbor-cream" }, toDisplayString(item.title), 1), createVNode("p", { class: "text-xs text-arbor-sage" }, "Publié " + toDisplayString(formatDate(item.published_at)), 1)]),
									createVNode("span", { class: "font-mono text-xs text-arbor-sage" }, toDisplayString(formatDuration(item.duration)), 1)
								]);
							}), 128))])) : (openBlock(), createBlock("p", {
								key: 1,
								class: "mt-4 border-t border-arbor-glass-border pt-4 text-sm text-arbor-sage"
							}, " Aucun contenu généré publié pour l'antenne. "))]),
							__props.schedules?.length ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-3"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.schedules, (schedule) => {
								return openBlock(), createBlock("div", {
									key: schedule.id,
									class: ["rounded-lg border bg-arbor-deep p-5 transition", schedule.is_currently_active ? "border-arbor-emerald/40 bg-arbor-emerald/5" : "border-arbor-glass-border"]
								}, [createVNode("div", { class: "flex flex-wrap items-start justify-between gap-3" }, [createVNode("div", null, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("h4", { class: "font-semibold text-arbor-cream" }, toDisplayString(schedule.name), 1), schedule.is_currently_active ? (openBlock(), createBlock("span", {
									key: 0,
									class: "rounded-full bg-arbor-emerald/20 px-2 py-0.5 text-xs font-medium text-arbor-emerald"
								}, " En cours ")) : createCommentVNode("", true)]), createVNode("p", { class: "mt-1 font-mono text-sm text-arbor-sage" }, toDisplayString(schedule.starts_at ?? "--:--") + " → " + toDisplayString(schedule.ends_at ?? "fin de journée"), 1)]), createVNode("div", { class: "flex flex-wrap items-center gap-2 text-xs" }, [
									createVNode("span", { class: "rounded border border-arbor-glass-border px-2 py-0.5 text-arbor-sage" }, toDisplayString(repeatLabel(schedule.repeat)), 1),
									createVNode("span", { class: "rounded border border-arbor-glass-border px-2 py-0.5 text-arbor-sage" }, " Priorité " + toDisplayString(schedule.priority), 1),
									createVNode("span", { class: "rounded border border-arbor-glass-border px-2 py-0.5 text-arbor-sage" }, toDisplayString(schedule.sounds_count) + " son" + toDisplayString(schedule.sounds_count !== 1 ? "s" : ""), 1)
								])])], 2);
							}), 128))])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "rounded-lg border border-arbor-glass-border bg-arbor-deep p-10 text-center"
							}, [createVNode("p", { class: "text-arbor-sage" }, "Aucun schedule actif."), createVNode("a", {
								href: "/admin/radio-schedules",
								class: "mt-3 inline-block text-sm text-arbor-emerald hover:underline"
							}, " Créer un schedule → ")]))
						], 512), [[vShow, activeTab.value === "grille"]]),
						withDirectives(createVNode("div", null, [createVNode("form", {
							class: "max-w-2xl rounded-lg border border-arbor-glass-border bg-arbor-deep p-6",
							onSubmit: withModifiers(submitSettings, ["prevent"])
						}, [
							createVNode("h3", { class: "font-display text-2xl font-semibold text-arbor-cream" }, "Réglages station"),
							createVNode("div", { class: "mt-6 grid gap-4 sm:grid-cols-2" }, [
								createVNode("label", { class: "sm:col-span-2" }, [createVNode("span", { class: "text-sm text-arbor-sage" }, "URL publique du flux"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).public_stream_url = $event,
									type: "url",
									class: "mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).public_stream_url]])]),
								createVNode("label", null, [createVNode("span", { class: "text-sm text-arbor-sage" }, "Base Icecast"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).icecast_base_url = $event,
									type: "url",
									class: "mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).icecast_base_url]])]),
								createVNode("label", null, [createVNode("span", { class: "text-sm text-arbor-sage" }, "Mount"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).icecast_mount = $event,
									type: "text",
									class: "mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).icecast_mount]])]),
								createVNode("label", null, [createVNode("span", { class: "text-sm text-arbor-sage" }, "Crossfade (secondes)"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).crossfade_seconds = $event,
									type: "number",
									min: "0",
									max: "30",
									class: "mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).crossfade_seconds]])]),
								createVNode("label", null, [createVNode("span", { class: "text-sm text-arbor-sage" }, "Fréquence annonces DJ"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).dj_announcement_frequency = $event,
									type: "number",
									min: "1",
									max: "20",
									class: "mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).dj_announcement_frequency]])]),
								createVNode("label", { class: "sm:col-span-2" }, [createVNode("span", { class: "text-sm text-arbor-sage" }, "ElevenLabs voice ID"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).dj_voice_id = $event,
									type: "text",
									class: "mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).dj_voice_id]])]),
								createVNode("label", { class: "sm:col-span-2" }, [createVNode("span", { class: "text-sm text-arbor-sage" }, "Discord voice channel ID"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).discord_voice_channel_id = $event,
									type: "text",
									class: "mt-1 w-full rounded-lg border-arbor-glass-border bg-arbor-night text-arbor-cream"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).discord_voice_channel_id]])])
							]),
							createVNode("div", { class: "mt-5 flex flex-wrap gap-4" }, [createVNode("label", { class: "inline-flex items-center gap-2 text-sm text-arbor-cream" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).dj_enabled = $event,
								type: "checkbox",
								class: "rounded border-arbor-glass-border bg-arbor-night text-arbor-emerald"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).dj_enabled]]), createTextVNode(" DJ automatique ")]), createVNode("label", { class: "inline-flex items-center gap-2 text-sm text-arbor-cream" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).discord_auto_join = $event,
								type: "checkbox",
								class: "rounded border-arbor-glass-border bg-arbor-night text-arbor-emerald"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).discord_auto_join]]), createTextVNode(" Auto-join Discord ")])]),
							createVNode("div", { class: "mt-6 flex items-center gap-4" }, [createVNode("button", {
								type: "submit",
								disabled: unref(form).processing,
								class: "rounded-lg bg-arbor-emerald px-5 py-2.5 text-sm font-semibold text-arbor-night transition hover:bg-arbor-cream disabled:opacity-60"
							}, " Enregistrer ", 8, ["disabled"]), unref(form).wasSuccessful ? (openBlock(), createBlock("span", {
								key: 0,
								class: "text-sm text-arbor-emerald"
							}, "Sauvegardé ✓")) : createCommentVNode("", true)])
						], 32)], 512), [[vShow, activeTab.value === "reglages"]])
					])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/RadioManager.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
