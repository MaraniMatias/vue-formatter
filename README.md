# vue-formatter

vue-beautifier for node

```shell
npm install -g vue-formatter
```
## Using

```shell
cat my-compnet.vue | vue-formatter > my-compnet.vue
```

### Using on VIM

map on `.vimrc`

```shell
autocmd FileType vue noremap <buffer> <c-f> :%!vue-formatter<CR>
```
