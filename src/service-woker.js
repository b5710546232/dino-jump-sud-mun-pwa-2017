const dataCachedName = 'GameData'
const cachedName = 'GameContents'
const filesToCache = [
  '/',
  '/index.html',
  '/dist/bundle.js',
  '/dist/bundle.js.map',
  '/dist/vendor.bundle.js',
  '/dist/vendor.bundle.js.map',
  '/assets/css/style.css',
  '/assets/images/bg.png',
  '/assets/images/cactus01.png',
  '/assets/images/cactus02.png',
  '/assets/images/cactus03.png',
  '/assets/images/cloud01.png',
  '/assets/images/cloud02.png',
  '/assets/images/cloud03.png',
  '/assets/images/dino.png',
  '/assets/images/dino_fix_52x58.png',
  '/assets/images/ground.png',
  '/assets/images/loader-bar.png',
  '/assets/images/loader-bg.png',
  '/assets/images/mushroom2.png',
  '/assets/images/obstacle.png',
  '/assets/images/phaser-es6-webpack.png',
  '/assets/images/playAgainButton.png',
  '/assets/sfx/jump.wav',
  '/assets/sprites/dino_52x58.png',
  '/assets/sprites/player_sheet.png'
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
  return new Promise((resolve, reject) => {
    let timeoutId = setTimeout(reject, timeout)
    fetch(req).then((res) => {
      clearTimeout(timeoutId)
      resolve(res)
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