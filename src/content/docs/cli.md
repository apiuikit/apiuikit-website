# CLI

Turn an OpenAPI or AsyncAPI file — local or hosted at a URL — into a static documentation site from your terminal. No React, no bundler, no frontend toolchain: one command produces a folder of HTML, JS, and CSS that you can open from disk or publish anywhere. It is built for projects where apiuikit's React components are not an option, such as Spring or Maven services, Go and Python APIs, docs-only repos, and CI pipelines.

## Install

```bash
npm install -g @apiuikit/cli
```

The binary is called `apiuikit`. Node 18 or newer is required.

You can also skip the install entirely and run it on demand:

```bash
npx @apiuikit/cli generate ./openapi.yaml
```

## Your first site

```bash
apiuikit generate ./openapi.yaml
apiuikit serve
```

The first command writes the site to `apiuikit-docs/`; the second serves that folder at `http://127.0.0.1:4300`. `serve` defaults to the same directory `generate` writes to, so neither command needs an argument beyond the spec.

A successful generate looks like this:

```text
╭───────────────────────────────────────────╮
│ ✔ Generated API documentation site       │
│                                           │
│ Spec type  OpenAPI                        │
│ Title      Swagger Petstore - OpenAPI 3.0 │
│ Output     apiuikit-docs                  │
╰───────────────────────────────────────────╯

Open it in a browser:
  file:///path/to/apiuikit-docs/index.html
```

## Commands

Three commands, no subcommands. `apiuikit --help` prints the same summary, and `apiuikit help <command>` prints one command's flags.

| Command | What it does |
| --- | --- |
| `generate <input>` | Build a static documentation site from a spec file. Aliased as `gen`. |
| `serve [dir]` | Serve a generated site locally for preview. |
| `validate <input>` | Check a spec for errors and warnings. |

`-v, --version` prints the CLI version.

### The spec argument

`generate` and `validate` both take either a path to a local file or a `http://`/`https://` URL, with a `.yaml`, `.yml`, or `.json` extension either way. A local path is resolved relative to your current directory; a URL is fetched directly — nothing is downloaded to disk first.

```bash
apiuikit generate https://example.com/asyncapi.yaml
apiuikit validate https://example.com/asyncapi.yaml
```

This is handy for specs published from another repo, an API gateway, or a docs CDN — point the CLI at the URL and skip the manual download-and-copy step. If the URL can't be reached, or the server responds with an error status, the command fails with a message describing what went wrong instead of writing anything out.

The CLI decides how to render the document by looking for a top-level `asyncapi`, `openapi`, or `swagger` field, in that order. Swagger 2.0 documents are treated as OpenAPI. If none of those fields are present you will get:

```text
✖ Error: Could not detect a valid OpenAPI or AsyncAPI document — expected a top-level "openapi" or "asyncapi" field.
```

The page title comes from `info.title`, falling back to "API Documentation".

### generate

```bash
apiuikit generate <input> [options]
```

| Flag | Description | Default |
| --- | --- | --- |
| `-o, --output <dir>` | Directory to write the site into | `apiuikit-docs` |
| `-c, --config <file>` | JSON or YAML config passed through to apiuikit — path or URL | none |
| `--header <file>` | HTML file injected at the top of the page, before the documentation — path or URL | none |
| `--footer <file>` | HTML file injected at the bottom of the page, after the documentation — path or URL | none |
| `-f, --force` | Overwrite an output directory that already has files in it | `false` |
| `--single-file` | Embed the script and stylesheet in the HTML file instead of writing `assets/` — one portable file, but much larger (~3–4 MB) | `false` |
| `--out-file-name <name>` | Custom filename for the generated HTML file. Only valid together with `--single-file`; must end in `.html` or `.htm` | `index.html` |

The output directory is created if it does not exist. If it exists and is not empty, the command refuses to touch it unless you pass `--force`:

```text
✖ Error: Output directory is not empty: /path/to/apiuikit-docs
Pass --force to overwrite its contents, or choose a different --output directory.
```

`--force` overwrites the files the CLI writes; it does not clear anything else out of the directory first.

#### What gets written

By default:

```text
apiuikit-docs/
  index.html
  assets/
    apiuikit.js
    apiuikit.css
```

`index.html` embeds your spec inline and hands it to an `<apiuikit-openapi-renderer>` or `<apiuikit-asyncapi-renderer>` custom element. The site makes no network requests and needs no server, so it works over `file://` as well as from GitHub Pages, S3, nginx, or any static host.

#### Single-file output

`--single-file` inlines the script and stylesheet into the HTML file instead of writing `assets/`, so the whole site is one file — useful for emailing, attaching, or dropping somewhere without keeping a folder together. By default that file is still named `index.html`:

```bash
apiuikit generate ./openapi.yaml --single-file
```

```text
apiuikit-docs/
  index.html
```

The tradeoff is size: the file grows to several megabytes, and the script is no longer separately cacheable. Rendered output is otherwise identical to the default mode.

Pass `--out-file-name` to name the file something other than `index.html` — handy when you're generating a portable file meant to be shared, emailed, or dropped into another project directly:

```bash
apiuikit generate ./openapi.yaml --single-file --out-file-name widgets-api-docs.html
```

```text
apiuikit-docs/
  widgets-api-docs.html
```

`--out-file-name` only makes sense in single-file mode — without `--single-file` you already control the destination via `--output`, and `index.html` is the convention `serve` and static hosts expect for a directory's entry point. Passing it without `--single-file` fails:

```text
✖ Error: --out-file-name can only be used together with --single-file.
```

The name must be a plain filename ending in `.html` or `.htm` — no path separators, and no `.`/`..`:

```text
✖ Error: Invalid --out-file-name: "docs" must end with .html or .htm.
✖ Error: Invalid --out-file-name: "../evil.html" must be a plain filename, not a path.
```

Because `--force` only overwrites the files this run writes, renaming with `--out-file-name` leaves any previous `index.html` in place. Remove the old file yourself (or clear the output directory) if you don't want both sitting side by side — otherwise `serve` will keep preferring `index.html`.

### serve

```bash
apiuikit serve [dir] [options]
```

| Flag | Description | Default |
| --- | --- | --- |
| `-p, --port <port>` | Port to listen on | `4300` |
| `--open` | Open the site in your default browser | `false` |

`[dir]` defaults to `apiuikit-docs`. The server binds to `127.0.0.1` only, so it is a preview tool rather than a way to host the site. If the port you asked for is taken it tries the next one, up to twenty times. `Ctrl+C` stops it.

If the directory does not exist:

```text
✖ Error: No such directory: apiuikit-docs
Run "apiuikit generate <input>" first, or pass the directory to serve.
```

If the directory has no `index.html`, `serve` looks for a single `.html`/`.htm` file and uses that as the entry point at `/`. That covers a custom-named single-file site:

```bash
apiuikit generate ./openapi.yaml --single-file --out-file-name widgets-api-docs.html
apiuikit serve
```

If there's no `index.html` and zero or multiple `.html` files to choose from, `serve` warns and starts anyway. Other files in the directory are still reachable; visiting `/` returns 404 because there is no entry point.

### validate

```bash
apiuikit validate <input> [options]
```

| Flag | Description | Default |
| --- | --- | --- |
| `-y, --yes` | Install the required validator package without prompting | `false` |

Errors and warnings are both printed, but only errors make the command fail. Exit code is 0 when the document is valid and 1 when it is not, which is what you want in a pipeline.

#### Validator packages

The parsers are large, so they are not bundled. The first time you validate a document, the CLI needs one of them:

```bash
npm install --save-dev @scalar/openapi-parser@^0.28.10   # OpenAPI
npm install --save-dev @asyncapi/parser@^3.6.0           # AsyncAPI
```

If the package is missing, an interactive terminal will offer to install it for you as a dev dependency of the current project, using whichever package manager your lockfile implies (npm, pnpm, yarn, or bun). Pass `--yes` to accept without being asked.

In a non-interactive shell, or whenever the `CI` environment variable is set, the CLI never prompts. It fails with install instructions instead. Install the parser as part of your pipeline setup, or pass `--yes`.

## Configuration

`--config` takes a `.json`, `.yaml`, or `.yml` file containing a single object — either a local path or a URL, on the same terms as the spec argument. There is no auto-discovery: the CLI never looks for a config file on its own, so the flag is the only way to supply one.

```json
{
  "show": { "sidebar": true, "codeSamples": false },
  "theme": {
    "dark": {
      "background": "#1a1b26",
      "surface": "#24283b",
      "textPrimary": "#c0caf5"
    }
  }
}
```

```bash
apiuikit generate ./spec.yaml --output ./docs --config ./apiuikit.config.json --force
apiuikit generate ./spec.yaml --config https://example.com/apiuikit.config.json
```

The object is passed through verbatim to the renderer, so anything valid in apiuikit's React or web component `config` prop is valid here, including theming, `show` and `expand` toggles, `topOffset`, and custom labels. See [Configuration](./configuration.md) for the full list of options.

## Header and footer

`--header` and `--footer` point at `.html` files — either a local path or a `http://`/`https://` URL, on the same terms as the spec and config arguments — whose contents are injected verbatim around the documentation: the header just after `<body>` and the footer just before `</body>`. Use them for banners, nav links, custom branding, or a page footer.

Each file is an HTML fragment, not a full document. It needs no `<html>`, `<head>`, or `<body>` wrapper, just the markup you want on the page. A header file might look like this:

```html
<!-- header.html -->
<div class="my-header">
  <style>.my-header { padding: 8px 16px; background: #1a1b26; color: #fff; }</style>
  Beta docs: <a href="https://example.com">back to site</a>
</div>
```

```bash
apiuikit generate ./asyncapi.yaml --header ./header.html --footer ./footer.html
apiuikit generate https://example.com/asyncapi.yaml --header https://example.com/header.html --footer https://example.com/footer.html
```

Remote fragments are fetched at generate time and embedded into `index.html`, so the generated site stays fully static at runtime — no network calls when someone opens the page. If a URL can't be reached, or the server responds with an error status, the command fails before writing anything out.

The fragment becomes real page markup, so any CSS it carries applies normally: `<style>` blocks, inline `style="..."`, or a `<link rel="stylesheet">` pointing at an asset you manage yourself. Relative asset paths in a remotely fetched fragment resolve against the generated page's location, not the remote URL — use absolute URLs for stylesheets and images when the fragment is hosted elsewhere.

Styling is isolated in one direction only. The renderer element draws inside a Shadow DOM, so header and footer CSS cannot leak into the documentation UI or be overridden by it. There is no isolation between the header and the footer, or from the page shell's own minimal CSS, so scope your selectors with a unique class or ID as in the example above.

Both flags fail before anything is written if the file is missing:

```text
✖ Error: No such header file: /path/to/header.html
```

More example fragments live in the [CLI repository](https://github.com/apiuikit/apiuikit-cli/tree/main/examples/branding).

## In a CI pipeline

Fail the build when the spec breaks, then publish the site:

```bash
npm install --save-dev @scalar/openapi-parser@^0.28.10
npx @apiuikit/cli validate ./openapi.yaml
npx @apiuikit/cli generate ./openapi.yaml --output ./public --force
```

`./public` now holds a self-contained site ready for any static host.

If the spec is published by another service rather than checked into this repo, point straight at its URL instead of checking it out first:

```bash
npx @apiuikit/cli validate https://api.example.com/openapi.json
npx @apiuikit/cli generate https://api.example.com/openapi.json --output ./public --force
```

## Where to go next

- [Configuration](./configuration.md): every option you can put in the `--config` file.
- [Web Components](./with-webcomponents.md): the custom elements the generated site is built on, if you want to embed them in a page yourself.
- [Getting Started](./getting-started.md): the React components, if your project has a frontend build.
