# CrUX-Lookup

A simple CLI utility for grabbing URL-/origin-level Core Web Vitals using the Chrome User Experience Report (CrUX) API. Results are returned visually or as Raw JSON from the CrUX API.

### Installation

Install the utility via NPM

```shell
npm i -g crux-lookup
```

### Usage

**Looking up a single URL or origin**

```shell
crux-lookup single https://www.google.com # make sure you enter the full origin URL, i.e. https://www.google.com, not https://google.com
```

Arguments:
url URL for which to get CrUX record

Options:
`-r, --origin` Lookup the origin of the URL
`-j, --json` Output raw JSON from CrUX
`-o, --output <file>` Valid filepath for saving lookup results (forces JSON output)

**Looking up multiple URLs and/or origins**

*coming soon!*
