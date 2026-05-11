import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-D-F0WtqU.js";
import { computed, mergeProps, onMounted, ref, unref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs } from "vue/server-renderer";
//#region resources/js/Components/ApplicationLogo.vue
var _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<svg${ssrRenderAttrs(mergeProps({
		viewBox: "0 0 32 32",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, _attrs))}><path d="M16 2C16 2 8 8 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 8 16 2 16 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path><path d="M16 24V30" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M12 28H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><circle cx="16" cy="14" r="3" stroke="currentColor" stroke-width="1.5" fill="none"></circle></svg>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ApplicationLogo_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region resources/js/Composables/usePushNotifications.js
var isSubscribed = ref(false);
var isLoading = ref(false);
var error = ref(null);
var vapidPublicKey = ref("");
function usePushNotifications() {
	const isSupported = computed(() => {
		return typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window;
	});
	async function fetchVapidKey() {
		try {
			vapidPublicKey.value = (await (await fetch("/api/vapid-public-key")).json()).key;
		} catch (e) {
			console.error("Impossible de récupérer la clé VAPID", e);
		}
	}
	async function checkSubscription() {
		if (!isSupported.value) return;
		isSubscribed.value = !!await (await navigator.serviceWorker.ready).pushManager.getSubscription();
	}
	function urlBase64ToUint8Array(base64String) {
		const base64 = (base64String + "=".repeat((4 - base64String.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/");
		const rawData = window.atob(base64);
		return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
	}
	async function subscribe() {
		if (!isSupported.value || !vapidPublicKey.value) return;
		isLoading.value = true;
		error.value = null;
		try {
			if (await Notification.requestPermission() !== "granted") throw new Error("Permission de notification refusée.");
			const subscription = await (await navigator.serviceWorker.ready).pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(vapidPublicKey.value)
			});
			await fetch("/api/push-subscriptions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content") || ""
				},
				body: JSON.stringify({
					endpoint: subscription.endpoint,
					keys: {
						p256dh: subscription.toJSON().keys.p256dh,
						auth: subscription.toJSON().keys.auth
					}
				})
			});
			isSubscribed.value = true;
		} catch (e) {
			error.value = e.message || "Erreur lors de l'abonnement.";
			console.error(e);
		} finally {
			isLoading.value = false;
		}
	}
	async function unsubscribe() {
		if (!isSupported.value) return;
		isLoading.value = true;
		error.value = null;
		try {
			const subscription = await (await navigator.serviceWorker.ready).pushManager.getSubscription();
			if (subscription) {
				await fetch("/api/push-subscriptions", {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content") || ""
					},
					body: JSON.stringify({ endpoint: subscription.endpoint })
				});
				await subscription.unsubscribe();
			}
			isSubscribed.value = false;
		} catch (e) {
			error.value = e.message || "Erreur lors du désabonnement.";
			console.error(e);
		} finally {
			isLoading.value = false;
		}
	}
	onMounted(() => {
		if (isSupported.value) {
			fetchVapidKey();
			checkSubscription();
		}
	});
	return {
		isSupported,
		isSubscribed,
		isLoading,
		error,
		subscribe,
		unsubscribe
	};
}
//#endregion
//#region resources/js/Components/PushNotificationToggle.vue
var _sfc_main = {
	__name: "PushNotificationToggle",
	__ssrInlineRender: true,
	setup(__props) {
		const { isSupported, isSubscribed, isLoading, subscribe, unsubscribe } = usePushNotifications();
		return (_ctx, _push, _parent, _attrs) => {
			if (unref(isSupported)) {
				_push(`<button${ssrRenderAttrs(mergeProps({
					disabled: unref(isLoading),
					class: "inline-flex items-center gap-2 text-sm text-arbor-sage hover:text-arbor-emerald transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
					title: unref(isSubscribed) ? "Désactiver les notifications" : "Activer les notifications"
				}, _attrs))}>`);
				if (unref(isSubscribed)) _push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>`);
				else _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`);
				_push(`<span class="hidden sm:inline">${ssrInterpolate(unref(isSubscribed) ? "Notifications activées" : "Notifications")}</span></button>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PushNotificationToggle.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { ApplicationLogo_default as n, _sfc_main as t };
