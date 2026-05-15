import Echo from "laravel-echo";
import Pusher from "pusher-js";
//#region resources/js/echo.js
window.Pusher = Pusher;
var echo = new Echo({
	broadcaster: "reverb",
	key: "<redacted>-local-key",
	wsHost: "<redacted>.com",
	wsPort: "443",
	wssPort: "443",
	forceTLS: true,
	enabledTransports: ["ws", "wss"]
});
//#endregion
export { echo as t };
