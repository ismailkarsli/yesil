# Yeşil

Yeşil siteyi geliştiren birtakım özellikler. Şu an için:

- bulunduğunuz başlıktaki entryleri otomatik olarak güncel tutar (içerik, fav falan)
- son sayfadaysanız, yeni entryleri otomatik olarak sayfaya ekler. yeni sayfalar dahil.
- başlık filtreleme gibi 1-2 genel şeyleri eklemeyi düşünüyorum bir ara.

## Kurulum

- Firefox: <https://addons.mozilla.org/en-US/firefox/addon/yesil/>
- Chrome: <https://chromewebstore.google.com/detail/yeşil/cfbimojpjjpkcidbhcidhndkbopmbhae>

## Derleme

Eklenti [esbuild](https://github.com/evanw/esbuild) ile paketlenir. Eklentiyi derlemek, eklenti için gerekli dosyaları toplamak ve zip dosyasına arşivlemek için aşağıdaki komutu kullanabilirsiniz:

```plain
pnpm package
```

## Lisans

Eklenti lisans olarak AGPLv3 kullanıyor. Yani *sanırım* buradaki kodları oluşturduğunuz projenizi açık kaynak olarak yayınlarsanız kullanabiliyor olmanız anlamına geliyor.
