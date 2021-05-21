#!/usr/bin/env node

"use strict";

const fs = require("fs");
const getCSV = require("get-csv");
const _ = require("lodash");

const program = require("commander");

const DEFAULT_LANG = "all";
const DEFAULT_DIR = "./";
const DEFAULT_BEAUTIFY = 2;
const DEFAULT_DEEP = false;

program
  .name("csv-url-to-i18n")
  .usage("<url> [options]")
  .arguments("<url>")
  .option(
    "-b, --beautify <number>",
    "number of spaces to insert white space in JSON/JS files (min: 0, max: 10)",
    parseInt,
    DEFAULT_BEAUTIFY
  )
  .option("-p, --path <path>", "path of client secret file", DEFAULT_DIR)
  .option("-l, --lang <all | th | en>", "lang", DEFAULT_LANG)
  .option(
    "-d, --deep <fasle | true>",
    "boolean of deep key",
    JSON.parse,
    DEFAULT_DEEP
  )
  .parse(process.argv);

const options = program.opts();
main();

async function main() {
  if (program.args[0]) {
    const [results, langs] = await getDateFromGoogleSpreadSheet(
      program.args[0]
    );
    if (options.lang) {
      let lang = _.lowerCase(options.lang);

      if (lang === "all") {
        _.forEach(langs, (lang) => {
          selectLang(results, lang);
        });
      } else {
        const _langs = _.split(options.lang, " ");
        _.forEach(_langs, (lang) => {
          selectLang(results, lang);
        });
      }
    }
  } else {
    console.log("url is required");
  }
}

function selectLang(results, lang) {
  let data = _.chain(results)
    .mapKeys((o) => {
      return o.i18n.trim();
    })
    .mapValues(lang)
    .value();

  if (options.deep) {
    let obj = {};
    _.forEach(data, (v, k) => {
      _.set(obj, k, v);
    });
    data = obj;
  }

  exportDataToJSON(data, lang);
}

async function getDateFromGoogleSpreadSheet(url) {
  try {
    const results = await getCSV(url);
    const langs = [];
    _.forEach(results[0], (v, k) => {
      if (k != "i18n") {
        langs.push(k);
      }
    });
    return [results, langs];
  } catch (err) {
    console.error(err.message);
  }
}

function exportDataToJSON(data, type) {
  try {
    var dir = options.path;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(
      `${dir}/${type}.json`,
      JSON.stringify(data, null, options.beautify)
    );
  } catch (err) {
    console.error(err.message);
  }
}
