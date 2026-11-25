import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

var CRC_TABLE = []

for (var n = 0; n < 256; n++) {
  var c = n
  for (var k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  }
  CRC_TABLE[n] = c >>> 0
}

function crc32(buffer) {
  var crc = 0xffffffff
  for (var i = 0; i < buffer.length; i++) {
    crc = CRC_TABLE[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  var typeBuffer = Buffer.from(type, 'ascii')
  var length = Buffer.alloc(4)
  length.writeUInt32BE(data.length, 0)
  var crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0)
  return Buffer.concat([length, typeBuffer, data, crc])
}

function makeIcon(size) {
  var background = [18, 50, 74, 255]
  var foreground = [244, 241, 234, 255]
  var pixels = Buffer.alloc(size * size * 4)

  function setPixel(x, y, color) {
    var offset = (y * size + x) * 4
    pixels[offset] = color[0]
    pixels[offset + 1] = color[1]
    pixels[offset + 2] = color[2]
    pixels[offset + 3] = color[3]
  }

  function fill(x1, y1, x2, y2) {
    for (var y = y1; y < y2; y++) {
      for (var x = x1; x < x2; x++) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
          setPixel(x, y, foreground)
        }
      }
    }
  }

  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      setPixel(x, y, background)
    }
  }

  var left = Math.round(size * 0.28)
  var right = Math.round(size * 0.72)
  var top = Math.round(size * 0.22)
  var bottom = Math.round(size * 0.78)
  var middle = Math.round(size * 0.5)
  var thick = Math.max(6, Math.round(size * 0.075))

  fill(left, top, right, top + thick)
  fill(left, top, left + thick, bottom)
  fill(left, middle - thick / 2, right - Math.round(size * 0.08), middle + thick / 2)
  fill(left, bottom - thick, right, bottom)

  var raw = Buffer.alloc(size * (1 + size * 4))
  for (var row = 0; row < size; row++) {
    var rawOffset = row * (1 + size * 4)
    raw[rawOffset] = 0
    pixels.copy(raw, rawOffset + 1, row * size * 4, (row + 1) * size * 4)
  }

  var ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

var outDir = join(process.cwd(), 'public', 'icons')
mkdirSync(outDir, { recursive: true })

;[192, 512].forEach(function (size) {
  writeFileSync(join(outDir, 'icon-' + size + '.png'), makeIcon(size))
  console.log('Created icon-' + size + '.png')
})
