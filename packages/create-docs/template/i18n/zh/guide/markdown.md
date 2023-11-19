# Markdown 拓展

VitePress comes with built in Markdown Extensions.

## 代码块中的语法高亮

VitePress uses [Shiki](https://shiki.matsu.io/) to highlight language syntax in Markdown code blocks, using coloured text. Shiki supports a wide variety of programming languages. All you need to do is append a valid language alias to the beginning backticks for the code block.

```js
export default {
  name: 'MyComponent',
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

[A list of valid languages](https://github.com/shikijs/shiki/blob/main/docs/languages.md) is available on Shiki's repository.

You may also customize syntax highlight theme in app config. Please see [`markdown options`](https://vitepress.dev/reference/site-config#markdown) for more details.

## 自定义容器

Custom containers can be defined by their types, titles, and contents.

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 更多

Check out the documentation for [the full list of markdown extensions](https://vitepress.dev/guide/markdown).
