const dataCachedName = 'GameData'
const cachedName = 'GameContents'
const filesToCache = [
  '/',
  '/index.html',
  '/dist/bundle.js',
  '/dist/bundle.js.map',
  '/dist/vendor.bundle.js',
  '/dist/vendor.bundle.js.map'
]

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cachedName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cachedName && key !== dataCachedName) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})
