const CACHE='jone-golf-final-v2';
const ASSETS=['./', './index.html', './profile.html', './lesson.html', './program.html', './tour.html', './booking.html', './styles.css', './app.js', './assets/8585.png', './assets/8586.png', './assets/8618.jpg', './assets/8626.png', './assets/8662.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
