import { readFile, writeFile, mkdir } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
const [source, css, script] = await Promise.all([
  readFile(new URL('index.html', root), 'utf8'),
  readFile(new URL('styles.css', root), 'utf8'),
  readFile(new URL('app.js', root), 'utf8'),
]);
const styleReference = /<link\b[^>]*href="\.\/styles\.css(?:\?[^\"]*)?"[^>]*>/g;
const scriptReference = /<script\s+src="\.\/app\.js(?:\?[^\"]*)?"\s*><\/script>/g;
if ([...source.matchAll(styleReference)].length !== 1 || [...source.matchAll(scriptReference)].length !== 1) {
  throw new Error('Expected one local stylesheet and one local application script.');
}
const html = source
  .replace(styleReference, () => `<style>\n${css}\n</style>`)
  .replace(scriptReference, () => `<script>\n${script.replaceAll('</script', '<\\/script')}\n</script>`);
await mkdir(new URL('out/', root), { recursive: true });
await writeFile(new URL('out/index.html', root), html);
await writeFile(new URL('team-management-demo.html', root), html);
console.log('Built out/index.html and synchronized the offline demo.');
