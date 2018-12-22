# vue-formatter

vue-beautifier for node

```shell
npm install -g vue-formatter
```
## Using

### Cli
```shell
cat my-compnet.vue | vue-formatter | sponge my-compnet.vue
```
or alternatively
```shell
cat my-compnet.vue | vue-formatter > my-compnet.vue.tmp && mv my-compnet.vue.tmp my-compnet.vue
```



### JavaScript
```shell
npm install vue-formatter
```

```javascript
const formatter = require('vue-formatter');
const fs = require('fs');

fs.readFile('foo.vue', 'utf8', function (err, data) {
    if (err) { throw err; }
    console.log(formatter(data));
});
```

### Using on VIM

Key map on `.vimrc`

```shell
autocmd FileType vue noremap <buffer> <c-f> :%!vue-formatter<CR>
```

## Defaults options for JS-beautify

```json
{
  "indent_size": 2,
  "indent_char": " ",
  "indent_with_tabs": false,
  "eol": "\n",
  "end_with_newline": false,
  "indent_level": 0,
  "preserve_newlines": true,
  "max_preserve_newlines": 3,
  "space_in_paren": false,
  "space_in_empty_paren": false,
  "jslint_happy": true,
  "space_after_anon_function": true,
  "brace_style": "collapse,preserve-inline",
  "break_chained_methods": false,
  "keep_array_indentation": true,
  "unescape_strings": false,
  "wrap_line_length": 0,
  "e4x": false,
  "comma_first": false,
  "operator_position": "before-newline"
}
```
