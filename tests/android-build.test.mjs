import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const manifest = await readFile(new URL('../android/app/src/main/AndroidManifest.xml', import.meta.url), 'utf8');
const activity = await readFile(new URL('../android/app/src/main/java/com/creekstack/sortrush/MainActivity.kt', import.meta.url), 'utf8');
const buildGradle = await readFile(new URL('../android/app/build.gradle.kts', import.meta.url), 'utf8');

assert.match(manifest, /supports-screens/, 'manifest should declare tablet screen support');
assert.match(manifest, /largeScreens="true"/, 'manifest should support large tablet screens');
assert.match(manifest, /xlargeScreens="true"/, 'manifest should support extra large tablet screens');
assert.match(activity, /WebViewAssetLoader/, 'app should use WebViewAssetLoader for secure offline asset serving');
assert.match(activity, /appassets\.androidplatform\.net/, 'app should load offline assets via the local domain');
assert.match(buildGradle, /syncWebAssets/, 'build should synchronize web assets into the APK');

await access(new URL('../assets/icon.png', import.meta.url));
await access(new URL('../SortRush.apk', import.meta.url));
await access(new URL('../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.webp', import.meta.url));

console.log('Android offline tablet package configuration is verified.');
