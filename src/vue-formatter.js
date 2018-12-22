'use strict';
const beautify = require('js-beautify');

// const templateReg = /<(?:\/)?template[\s\S]*?(?:lang="\s*(.*)\s*")?\s*>/ig;
const templateReg = /(<template\s*?(?:lang=["']\s*pug\s*['"])?\s*>)|(<\/template>)(?=[\s]*<script>)/ig;
const scriptReg = /<(?:\/)?script[\s\S]*?(?:lang="\s*(.*)\s*")?\s*>/ig;
const styleReg = /<(?:\/)?style[\s\S]*?(?:lang="\s*(.*)\s*")?\s*(?:scoped)?\s*>/ig;

const config = {
  "brace_style": "collapse,preserve-inline",
  "indent_level": 1,
  "indent_size": 2,
  "jslint_happy": true,
  "keep_array_indentation": true,
  "max_preserve_newlines": 3,
  "space_after_anon_function": true,
  "space-in-paren": false
};


function getCode(code, block, expReg) {
  let split;
  // Encuentra las etiquetas templete,script,style
  let match = code.match(expReg);
  if (!match) {
    return null;
  }
  if (!/src/.test(match)) {
    if (block === "template") {
      split = code.split(expReg, 6);
      // console.log(split);
      // console.log(beautify.html(code.split(expReg, 6)[3], config));
      if (split.length > 0) {
        return match[0] + '\n' + beautify.html(split[3], config) + '\n' + match[1];
      }
    } else if (block === "style") {
      split = code.split(expReg, 4);
      if (typeof split[1] === 'undefined' || split[1] === 'scss' || split[1] === 'less') {
        return match[0] + '\n' + beautify.css(split[2], config) + '\n' + match[1];
      }
    } else {
      split = code.split(expReg, 4);
      if (typeof split[1] === 'undefined' || split[1] === 'TypeScript') {
        return match[0] + '\n' + beautify(split[2], config) + '\n' + match[1];
      }
    }
  }
  return match[0] + split[2] + match[1];
}

module.exports = function (text) {
  if (!text) {
    return;
  } else {
    let html = getCode(text, 'template', templateReg);
    let script = getCode(text, 'script', scriptReg);
    let style = getCode(text, 'style', styleReg);
    return (html ? html + '\n' : '') + (script ? '\n' + script + '\n' : '') + (style ? '\n' + style + '\n' : '');
  }
};
