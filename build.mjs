import { readFile, writeFile, mkdir } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
const [source, css, script] = await Promise.all([
  readFile(new URL('index.html', root), 'utf8'),
  readFile(new URL('styles.css', root), 'utf8'),
  readFile(new URL('app.js', root), 'utf8'),
]);
const styleReference = /<link\b[^>]*href="\.\/styles\.css(?:\?[^\"]*)?"[^>]*>/g;
const scriptReference = /<script\s+src="\.\/app\.js(?:\?[^\"]*)?"\s*><\/script>/g;
const svgAssetReference = /src="\.\/(assets\/sidebar\/[^\"]+\.svg)"/g;
if ([...source.matchAll(styleReference)].length !== 1 || [...source.matchAll(scriptReference)].length !== 1) {
  throw new Error('Expected one local stylesheet and one local application script.');
}
const svgPaths = [...new Set([...source.matchAll(svgAssetReference)].map((match) => match[1]))];
const svgAssets = new Map(await Promise.all(svgPaths.map(async (path) => {
  const contents = await readFile(new URL(path, root));
  return [path, contents.toString('base64')];
})));
const html = source
  .replace(svgAssetReference, (_match, path) => `src="data:image/svg+xml;base64,${svgAssets.get(path)}"`)
  .replace(styleReference, () => `<style>\n${css}\n</style>`)
  .replace(scriptReference, () => `<script>\n${script.replaceAll('</script', '<\\/script')}\n</script>`);
await mkdir(new URL('out/', root), { recursive: true });
await writeFile(new URL('out/index.html', root), html);
await writeFile(new URL('team-management-demo.html', root), html);
console.log('Built out/index.html and synchronized the offline demo.');
