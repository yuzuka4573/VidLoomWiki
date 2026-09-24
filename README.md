# VidLoom Wiki 📖

VidLoom（[vid-loom.com](https://vid-loom.com)）の公式ドキュメント・利用マニュアルです。Docsifyによって静的サイトとして提供されています。

## 🌐 オンライン閲覧
- Wiki本番サイト: [vid-loom.com/wiki/](https://vid-loom.com) (またはGitHub Pages)

---

## 🎨 対応素材フォーマット一覧

VidLoomで利用可能なアップロード素材および対応フォーマット一覧です。

| 種別 | 対応フォーマット / 拡張子 | 備考 |
| :--- | :--- | :--- |
| **画像** | **PNG** (`.png`, `.apng`)<br>**JPEG** (`.jpeg`, `.jpg`)<br>**GIF** (`.gif`)<br>**WebP** (`.webp`)<br>**SVG** (`.svg`)<br>**BMP / ICO / AVIF** | **アニメーションGIFに完全対応**。<br>立ち絵、感情差分、感情アイコン、台本画像要素でフレーム単位の同期・ループ再生が行われます。 |
| **音声** | **MP3** (`.mp3`)<br>**WAV** (`.wav`)<br>**OGG** (`.ogg`)<br>**M4A / AAC** (`.m4a`, `.aac`)<br>**MP4** (`.mp4` 音声ストリーム) | BGM・SE（効果音）として利用可能。 |
| **フォント** | **TTF** (`.ttf`)<br>**OTF** (`.otf`)<br>**WOFF** (`.woff`)<br>**WOFF2** (`.woff2`) | アップロード後、字幕・テロップのフォントとして即時利用可能。 |

---

## 🛠️ ドキュメントの保守・画像WebP変換

ドキュメントの更新手順やWebP画像変換ルールについては、[HOWTO_MAINTENANCE.md](./HOWTO_MAINTENANCE.md) を参照してください。

```bash
# 新規画像追加後のWebP一括変換＆Markdownリンク自動置換
node scripts/convert-to-webp.js

# ローカルでのプレビュー起動
npx serve docs
```
