/*
 * Creator: Playwright 1.60.0
 * Browser: chromium 148.0.7778.96
 */

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {}

export default function main() {
  let response

  group('page@c4ed40a140d7b8b9dba85039f81cbd16 - StackDemo', function () {
    response = http.get('https://bugbash.online/', {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://bugbash.online/_next/static/chunks/412b7dee.11f4ec51.chunk.css', {
      headers: {
        Accept: 'text/css,*/*;q=0.1',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/',
        'Sec-Fetch-Dest': 'style',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://bugbash.online/_next/static/chunks/styles.e2bb0603.chunk.css', {
      headers: {
        Accept: 'text/css,*/*;q=0.1',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/',
        'Sec-Fetch-Dest': 'style',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://bugbash.online/_next/static/chunks/main-92d707d8168284fc6668.js', {
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/',
        'Sec-Fetch-Dest': 'script',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get(
      'https://bugbash.online/_next/static/chunks/webpack-5d8f33dd1528121872ab.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/framework.9707fddd9ae5927c17c3.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/412b7dee.748f7f460fe4ac62566f.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/commons.8dd95e2c8a426fce4243.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/f86b6e29883aa668a624259c19aba9c4b16c8858.45364f83391b4c7c6cfc.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/680059dc96e4c38580eb8670aeeedd940b19f861.c6faee76adb648d5a01e.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/styles.b589c95bae47a4b56802.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/pages/_app-d7ee92cb023e6877be12.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/29107295.60aed194eb277afd0454.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/b8893a6f06b70a9cc8257c2531fbea864096704d.05e7f7f46ea57d13f14e.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/0d59522aa4d49d537fa1e452691a43255e2011f7.adbef18771ef32571618.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/5dd68d992e454f53e934be0a6bdc449c090bf9c7.f2490c72bf1e9ef92406.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/2b8c65fe6e4196f9b8c8b1e63b2b0283938369f1.eb7071b213b115eacbb9.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/pages/index-46025e1d8ae72b35b244.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/4E4RJZfI6OnXJ7SU1DPw4/_buildManifest.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/4E4RJZfI6OnXJ7SU1DPw4/_ssgManifest.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap',
      {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US',
          priority: 'u=0',
          referer: 'https://bugbash.online/',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'style',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-storage-access': 'active',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        },
      }
    )

    response = http.get('https://sdk.birdeatsbug.com/v2/core.js', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US',
        origin: 'https://bugbash.online',
        priority: 'u=1',
        referer: 'https://bugbash.online/',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
      },
    })

    response = http.get('https://sdk.birdeatsbug.com/v2/style.css', {
      headers: {
        accept: 'text/css,*/*;q=0.1',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US',
        priority: 'u=0',
        referer: 'https://bugbash.online/',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'style',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'cross-site',
        'sec-fetch-storage-access': 'active',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
      },
    })

    response = http.get(
      'https://rawcdn.githack.com/jeffersonRibeiro/react-shopping-cart/ccf64841ddfdfedfce9821b2b7ff2c8075afb17c/src/static/bag-icon.png',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US',
          priority: 'u=1, i',
          referer: 'https://bugbash.online/',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-storage-access': 'active',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        },
      }
    )

    response = http.get('https://bugbash.online/failed-request', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://bugbash.online/api/products', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get(
      'https://bugbash.online/_next/static/images/iPhone12-device-info-ae9cbd420e3fd8ba91e664d60ac12117.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/iPhone12Pro-device-info-5e543206a6555d05dfe97191c4283f73.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/iPhone11-device-info-271b6e122eab30028885b99ddf1897f2.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/infocardiphone11Pro-b38c45f2dbc8bf3d015ad5df3675c44e.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/infocard-c81eec0e8c6a112a8d29e14b666bd73a.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/infoiphoneXR-1e7e90357d8dbe28e588246dc25bc6e8.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/samsung-S20-device-info-4ab282506f4122c9b67a274bf84d0904.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/samsung-S20+-device-info-8ee506199a5b71b64f3a3110c23a1469.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/samsung-S20Ultra-device-info-b93a8e6bcaa77328bffa2d6e6f03344a.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/samsung-S10-device-info-9f3928ba960dc83a678cb6ff1462db2f.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/samsung-s9-device-info-d75c525dac1b0cf0a136fd01a55bc50d.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/Note20-device-info-99c852e5f52ddbc899791be3dd959250.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/Note20Ultra-device-info-a1bbf05183e009b70302625ccc0b6956.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/GooglePixel4-device-info-89a633a90cb47defe8be62ef9d7fab55.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/GooglePixel3-device-info-aa71987dd931d10cec5869115acb14d8.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/OnePlus8-device-info-8dcc8a8866758f442dcd6320b427ddb1.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/OnePlus7T-DeviceInfo-474bb8055a5f4e9844902c12686fe7a7.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/oneplus7device-info-f5dd98801fff2db5313fbd1a184ff12a.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/images/Oneplus6T_infocard-f7aca55bf5ed2d738101270c59c704e4.png',
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'image',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/ccf64841ddfdfedfce9821b2b7ff2c8075afb17c/src/static/bag-icon.png',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US',
          priority: 'u=1, i',
          referer: 'https://bugbash.online/',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-storage-access': 'active',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/29107295.60aed194eb277afd0454.js',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Purpose': 'prefetch',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/b8893a6f06b70a9cc8257c2531fbea864096704d.05e7f7f46ea57d13f14e.js',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Purpose': 'prefetch',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/0d59522aa4d49d537fa1e452691a43255e2011f7.adbef18771ef32571618.js',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Purpose': 'prefetch',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/5dd68d992e454f53e934be0a6bdc449c090bf9c7.f2490c72bf1e9ef92406.js',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Purpose': 'prefetch',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/2b8c65fe6e4196f9b8c8b1e63b2b0283938369f1.eb7071b213b115eacbb9.js',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Purpose': 'prefetch',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/pages/index-46025e1d8ae72b35b244.js',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Purpose': 'prefetch',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/pages/offers-13780a7a3e9ab1a28d94.js',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Purpose': 'prefetch',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/pages/orders-223096301414cf664756.js',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Purpose': 'prefetch',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/pages/favourites-2cd72172780bef47423d.js',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Purpose': 'prefetch',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://bugbash.online/favicon.svg', {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get(
      'https://bugbash.online/_next/static/chunks/pages/offers-13780a7a3e9ab1a28d94.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get(
      'https://bugbash.online/_next/static/chunks/pages/signin-6c7cad8c939f99206e7e.js',
      {
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          Host: 'bugbash.online',
          Referer: 'https://bugbash.online/',
          'Sec-Fetch-Dest': 'script',
          'Sec-Fetch-Mode': 'no-cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://bugbash.online/favicon.svg', {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/signin',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.post(
      'https://bugbash.online/api/signin',
      '{"userName":"demouser","password":"testingisfun99"}',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'en-US',
          Connection: 'keep-alive',
          'Content-Type': 'application/json;charset=UTF-8',
          Host: 'bugbash.online',
          Origin: 'https://bugbash.online',
          Referer: 'https://bugbash.online/signin',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
        },
      }
    )

    response = http.get('https://bugbash.online/failed-request', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/?signin=true',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://bugbash.online/api/products?userName=demouser', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/?signin=true',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get('https://bugbash.online/favicon.svg', {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US',
        Connection: 'keep-alive',
        Host: 'bugbash.online',
        Referer: 'https://bugbash.online/?signin=true',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })

    response = http.get(
      'https://rawcdn.githack.com/jeffersonRibeiro/react-shopping-cart/ccf64841ddfdfedfce9821b2b7ff2c8075afb17c/src/static/sprite_delete-icon.png',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US',
          priority: 'i',
          referer: 'https://bugbash.online/',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-storage-access': 'active',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        },
      }
    )

    response = http.get(
      'https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/ccf64841ddfdfedfce9821b2b7ff2c8075afb17c/src/static/sprite_delete-icon.png',
      {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US',
          priority: 'u=1, i',
          referer: 'https://bugbash.online/',
          'sec-ch-ua': '"Not/A)Brand";v="99", "Chromium";v="148"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-storage-access': 'active',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36',
        },
      }
    )
  })

  // Automatically added sleep
  sleep(1)
}
