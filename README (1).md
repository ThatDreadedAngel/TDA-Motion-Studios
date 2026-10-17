# TDA Motion Studio — 3D Animation Edition

This package includes the website plus a procedural, animated Three.js scene. The scene runs on the mode-selection screen and can also be used as the background in the visualizer preview/export. It features a cinematic portal, rocky landscape, floating shards, glowing monoliths, particle embers, and slow camera movement.

## Files
- `index.html` — main site and editor
- `three-world.js` — real-time 3D scene (Three.js module loaded from jsDelivr CDN)
- `README.md` — these instructions

## Test locally
Because `three-world.js` is an ES module, opening `index.html` directly as a `file://` URL may block module imports in some browsers. For best results, publish to GitHub Pages or run a local static server.

### Publish with GitHub Pages
1. Upload all three files to the root of your repository. Keep `index.html` and `three-world.js` side by side.
2. Commit the changes.
3. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. Open the published website over HTTPS. Internet access is needed to download Three.js from jsDelivr.

## Use the 3D background in a video
1. Open the site and choose a video mode.
2. In **Animation controls → On-screen layers**, leave **3D animated world** checked.
3. Upload your music and preview/export. The 3D scene is drawn into the canvas used by the browser exporter.
4. If you import a generated video clip, that clip takes priority as the background; uncheck the 3D option to return to the regular procedural visualizer.

## Notes
- No API key or paid asset is required.
- Three.js is fetched from a public CDN, so the first load requires internet access.
- Performance depends on the device/GPU. The particle count and pixel ratio are capped for smoother playback.
- This is a procedural 3D environment, not AI-generated character animation.
- Video export is still browser-based and typically produces WebM in real time.
