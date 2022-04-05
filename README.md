# CrUX-Lookup

A simple CLI utility for grabbing URL-/origin-level <a href="https://web.dev/vitals" target="_blank" rel="noopener noreferrer">Core Web Vitals</a> histograms using the Chrome User Experience Report (CrUX) API. Results are returned visually or as unaltered JSON from the CrUX API.
<img width="1136" alt="Screen Shot 2022-04-05 at 11 20 16" src="https://user-images.githubusercontent.com/16639987/161788178-933e2e50-1dc1-441e-8e03-a4c112e5864a.png">
### _Much_ Faster than using PageSpeed Insights, WebPageTest, etc. for CrUX data
crux-lookup is very quick, often returning results in under a second. If you just want to see some histograms for a given site or origin, it can save you a lot of time compared to more comprehensive tools like PSI and WebPageTest, which can take several minutes to generate and show their reports.


### Getting Started

1. Install the utility via NPM

```shell
$ npm i -g crux-lookup
```

2. Add a CrUX API Key

   **You can get a (free) CrUX API key <a href="https://developers.google.com/web/tools/chrome-user-experience-report/api/guides/getting-started" target="_blank" rel="noopener noreferrer">here</a>.**

```shell
$ crux-lookup config --updateKey <your API key>
```

3. Query a URL or origin

```shell
$ crux-lookup https://www.google.com --origin # omit --origin to get results for the page at the submitted URL
```

### Usage

**Viewing, removing or changing your stored API Key**

```shell
$ crux-lookup config # run without options to view the currently stored API key
```

Options:

- `--updateKey <key>` Add/update a CrUX API key to use for queries
- `--removeKey` Remove stored CrUX API key from configuration

**Looking up a single URL or origin**

```shell
$ crux-lookup single <url> # as of v0.3.0, the `single` subcommand is default; it can be omitted
```

Arguments:

- `url` URL for which to get CrUX record

Options:

- `-r, --origin` Lookup the submitted URL as an origin
- `-j, --json` Output raw JSON from CrUX
- `-o, --output <file>` Valid filepath for saving lookup results (forces JSON output)

**Looking up multiple URLs and/or origins**

_coming soon!_
