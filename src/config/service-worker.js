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
  console.log('[ServiceWorker] Installed')
  e.waitUntil(preCache())
})

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cachedName && key !== dataCachedName) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', e => {
  console.log('[ServiceWorker] Serving the asset.')
  e.respondWith(fromNetwork(e.request, 400).catch(() => {
    return fromCache(e.request)
  }))
})

const preCache = () => {
  caches.open(cachedName).then((cache) => {
    console.log('[ServiceWorker] Caching app shell')
    return cache.addAll(filesToCache)
  })
}

const fromNetwork = (req, timeout) => {
  return Promise((fulfill, reject) => {
    let timeoutId = setTimeout(reject, timeout)
    fetch(req).then((res) => {
      clearTimeout(timeoutId)
      fulfill(res)
    }, reject)
  })
}

const fromCache = (req) => {
  return caches.open(cachedName).then(cache => {
    return cache.match(req).then(matching => {
      return matching || Promise.reject(new Error('no-match'))
    })
  })
}
