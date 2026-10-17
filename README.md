# TDA Motion Studio

A free browser-based music visualizer and video export prototype.

## Run locally
Open `index.html` in a recent desktop Chrome or Edge browser. Upload a song, select a visual style, set title/artist and motion settings, then click **Export video**. Export records in real time, so keep the tab open. WebM is the expected output format.

## Publish with GitHub Pages
1. Create a GitHub repository.
2. Upload `index.html` and `README.md` to the repository root.
3. Open Settings → Pages.
4. Choose deploy from branch, select `main` and `/ (root)`, then save.

## Current limits
- This is an audio-reactive animated visualizer, not AI-generated 3D character animation yet.
- Exports run in real time (a 3-minute video takes about 3 minutes).
- Browser export support varies. Chrome/Edge recommended; WebM is expected, MP4 is not built in.
- Very high resolution/frame rate may lag on slower devices.
- Audio stays in the browser; there is no upload server or account system.

## AI animation roadmap
1. Add scene/storyboard prompts and reusable scene presets.
2. Connect an AI video-generation provider through a backend; never expose API keys in browser JavaScript.
3. Generate short clips per scene, then stitch them with the song using FFmpeg on a backend or desktop worker.
4. Add job status, cost estimates, and a review step before rendering.
5. Only use music, images, voices and characters the user has permission to use.
