# CrUX-Lookup

A simple CLI utility for grabbing URL-/origin-level [Core Web Vitals](https://web.dev/vitals) histograms using the Chrome User Experience Report (CrUX) API. Results are returned visually or as unaltered JSON from the CrUX API.

<img width="794" alt="Screen Shot 2022-03-21 at 16 06 02" src="https://user-images.githubusercontent.com/16639987/159354949-9820e9e1-1627-4946-9d25-54c608c5ee78.png">

### Getting Started

1. Install the utility via NPM

```shell
$ npm i -g crux-lookup
```

2. Add a CrUX API Key

   **You can get a (free) CrUX API key [here](https://developers.google.com/web/tools/chrome-user-experience-report/api/guides/getting-started).**

```shell
$ crux-lookup config --updateKey <your API key>
```

3. Query a URL or origin

```shell
$ crux-lookup single https://www.google.com
```

### Usage

**Viewing, removing or changing your stored API Key**

```shell
$ crux-lookup config
```

Options:

- `--updateKey <key>` Add/update a CrUX API key to use for queries
- `--removeKey` Remove stored CrUX API key from configuration

**Looking up a single URL or origin**

```shell
$ crux-lookup single <url>
```

Arguments:

- `url` URL for which to get CrUX record

Options:

- `-r, --origin` Lookup the submitted URL as an origin
- `-j, --json` Output raw JSON from CrUX
- `-o, --output <file>` Valid filepath for saving lookup results (forces JSON output)

**Looking up multiple URLs and/or origins**

_coming soon!_
