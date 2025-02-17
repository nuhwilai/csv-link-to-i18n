﻿# csv-url-to-i18n

Generate i18n JSON/JS files from a CSV Google Sheets spreadsheet

## Installation

### npm

`npm install -g @nuhwilai/csv-url-to-i18n`

or

`yarn global add @nuhwilai/csv-url-to-i18n`

or 

`npm install -g https://github.com/nuhwilai/csv-url-to-i18n`

or 

`yarn global add https://github.com/nuhwilai/csv-url-to-i18n`

## Usage

```
Usage: csv-url-to-i18n <csv-url-with-one-column-key-name-"i18n"> [options]

To customize the options, see the [API section](#api).

## API


Options:
  -b, --beautify <number>     number of spaces to insert white space in JSON/JS files (min: 0, max: 10) (default: 2)
  -p, --path <path>           path of client secret file (default: "./")
  -l, --lang <all | th | en>  lang (default: "all")
  -d, --deep <fasle | true>   boolean of deep key (default: false)
  -h, --help              output usage information
```

## Credits
- https://github.com/VictorCazanave/google-sheets-i18n-generator
