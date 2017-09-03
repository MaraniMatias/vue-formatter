'use strict';
const templateReg = /<(?:\/)?template[\s\S]*?(?:lang="(.*)")?>/ig;
const scriptReg = /<(?:\/)?script[\s\S]*?(?:lang="(.*)")?>/ig;
const styleReg = /<(?:\/)?style[\s\S]*?(?:lang="(.*)")?>/ig;
const config = {
  "indent_size": 2,
  "indent_level": 6,
  "brace_style": "collapse,preserve-inline",
  "jslint_happy": true,
  "keep_array_indentation": true,
  "max_preserve_newlines": 3
};

const beautify = {
  js: require('js-beautify'),
  css: require('js-beautify').css,
  html: require('js-beautify').html
};

function getCode(code, block, expReg) {
  let text = code.replace(expReg, function (match, $, end) {
    return end + "---" + block + "---" + ($ || '');
  });
  let match = text.match(/(\d+)-{3}\w*-{3}(\w*)?/ig);
  let lang = match[0].match(/\d*-{3}\w*-{3}(\w+)?/)[1];
  let index = { start: match[0].match(/\d*/)[0], end: match[1].match(/\d*/)[0] };
  if(block==="template"){
  text = text.substring(
    parseInt(index.start) + 7 + block.length + (lang ? lang.length : 0),
    parseInt(index.end) + (lang ? -index.end.length : +5)
  );
  }else{
  text = text.substring(
    parseInt(index.start) + block.length + 12,
    parseInt(index.end)
  );
  }

  return { text, lang };
}

function build(obj, block, type) {
  if (!obj.lang) {
    return '<' + block + '>\n' + beautify[type](obj.text, config) + '\n</' + block + '>\n';
  } else {
    return '<' + block + ' lang="' + obj.lang + '">' + obj.text + '</' + block + '>\n';
  }
}

module.exports = function (text) {
  if (!text) {
    return;
  }
  return build(getCode(text, 'template', templateReg), 'template', 'html') + '\n' +
    build(getCode(text, 'script', scriptReg), 'script', 'js') + '\n' +
    build( getCode(text, 'style', styleReg), 'style', 'css');
};
