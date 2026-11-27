var CACHE_NAME = 'english-practice-v3'
var APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
]

function absolute(path) {
  return new URL(path, self.location.href).href
}

function assetUrls(html) {
  var urls = []
  var pattern = /(?:src|href)="([^"]+\.(?:js|css))"/g
  var match = pattern.exec(html)
  while (match) {
    urls.push(absolute(match[1]))
    match = pattern.exec(html)
  }
  return urls
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL.map(absolute)).then(function () {
        return fetch(absolute('./index.html')).then(function (response) {
          if (!response || !response.ok) {
            return null
          }
          return response.text().then(function (html) {
            return cache.addAll(assetUrls(html))
          })
        }).catch(function () {
          return null
        })
      })
    }).then(function () {
      return self.skipWaiting()
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_NAME) {
          return caches.delete(key)
        }
      }))
    }).then(function () {
      return self.clients.claim()
    })
  )
})

self.addEventListener('fetch', function (event) {
  var request = event.request

  if (request.method !== 'GET') {
    return
  }

  var url = new URL(request.url)
  if (url.origin !== self.location.origin) {
    return
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) {
        fetch(request).then(function (response) {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(request, response.clone())
            })
          }
        }).catch(function () {})
        return cached
      }

      return fetch(request).then(function (response) {
        if (response && response.status === 200) {
          var copy = response.clone()
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy)
          })
        }
        return response
      }).catch(function () {
        if (request.mode === 'navigate') {
          return caches.match(new URL('./index.html', self.location.href).href)
        }
      })
    })
  )
})
