// 푸시 알림 수신 + 표시 핸들러
// VitePWA의 workbox SW(sw.js)와 별도로 로드되어야 함.
// vite.config.ts의 injectManifest 또는 importScripts로 포함.

self.addEventListener("push", (event) => {
  if (!event.data) return;
  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "알림", body: event.data.text() };
  }

  const title = payload.title || "calendar-hunto";
  const options = {
    body: payload.body || "",
    icon: "/calendar/icons/icon-192.png",
    badge: "/calendar/icons/icon-192.png",
    data: { url: "/calendar/#/" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/calendar/#/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          if (client.url.includes("/calendar/") && "focus" in client) {
            return client.focus();
          }
        }
        return self.clients.openWindow(url);
      }),
  );
});
