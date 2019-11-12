在 webpack 4 中已经取消了该插件的使用，但是对其的掌握有助于后续新的替代品SplitChunksPlugin的学习和理解。

CommonsChunksPlugin的作用是为了在 webpack 进行打包的时候将一些文件中公共部分提取出来。提取有两种情况，一种是仅提取代码，只是在同一个文件中分开放置；另一种情况是提取代码之后将其统一提到一个共同的文件中。


主要是根据每个配置项的作用来总结：

主体的配置项如下：

```
{
  name: string, // 或者为一个元素是string类型的数组
  names: string[], // 设置打包的 chunks  名称，对应[name]

  filename: string, // 一般为模板，例如：’[name].chunk.js’等，会被上面 name 的具体配置内容取代。或者直接命名也可以

  minChunks: number|Infinity|function(module, count) => boolean,
  有三种情况 number|Infinity|function(module, count) => boolean，后续会详细说

  chunks: string[], // 相当于 source, 表示该 chucks 依于什么 chucks 来进行再次的提取

  children: boolean,
  // 如果是 true，则表示对 name 设置的入口 chunk 进行查询其下的子 chunks,对这些子 chunks 进行公共部分的提取。

  deepChildren: boolean,
  // 如果是 true,则表示对 name 设置的入口 chunk 进行查询其下的子 chunks,对这些子 chunks 进行公共部分的提取,对子 chunks 的子 chunks 也执行相同的规则

  async: boolean|string,
  // 如果是 true,则表示将子 chunks 共同的内容提出为一个另外的 js，如果是 string,则与 output 中的 chunksFileName 进行搭配，设置这个额外生成的 js 的名称。

  minSize: number,
  // 所有公共模块的最小大小
}

```


重点细说：

* 如果不加任何别的内容，只是需要从a,b两个入口文件中抽取公共部分的话，配置如下

```
const path = require("path");
const webpack = require("webpack");

const config = {
    entry: {
        a: './src/a.js',
        b: './src/b.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ‘commons',
            filename: 'commons.js'
        }),
    ]
}

module.exports = config;

// 这样打出来是

a.js
b.js
commons.js

```

* 如果需要指定确定的公共部分的内容

```
const path = require("path");
const webpack = require("webpack");


const config = {
    entry: {
        a: './src/a.js',
        b: './src/b.js’,
        vendor: [‘jquery’, 'other-lib']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ‘vendor',
            filename: ‘[name].js'
        }),
    ]
}


module.exports = config;

//这样打出来就是
a.js
b.js
vendor.js
```

* minChunks 的使用规则

minChunks 的意义在于规定共同的内容被至少几个文件所引入，例如，如果规定 minChunks 为 7，则一段共同的内容被 6 个文件所引入，也不能被抽出当做独立的 chunk内容。所以如果设置为Infinity，则表明无论怎样，该配置不会自动抽出设定来源的共同部分。

设置为函数时，接受两个参数，当前 chunk及其包含的模块，被引用的次数，然后传出true 时，合并到 common 中，传出 false,则不合并

使用minChunks 设置达到从vendor中抽离公共代码部分，只保留第三方库内容

```
plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            chunks: ['first','second']//从first.js和second.js中抽取commons chunk
        }),
    ]
```

详细见  https://segmentfault.com/a/1190000012828879?utm_source=tag-newest


* 使用其他属性，例如 children 等

```
  children: boolean,
  // 如果是 true，则表示对 name 设置的入口 chunk 进行查询其下的子 chunks,对这些子 chunks 进行公共部分的提取。

  deepChildren: boolean,
  // 如果是 true,则表示对 name 设置的入口 chunk 进行查询其下的子 chunks,对这些子 chunks 进行公共部分的提取,对子 chunks 的子 chunks 也执行相同的规则

  async: boolean|string,
  // 如果是 true,则表示将子 chunks 共同的内容提出为一个另外的 js，如果是 string,则与 output 中的 chunksFileName 进行搭配，设置这个额外生成的 js 的名称。
```

这些属性主要用于从父 chunks 的子 chunks 筛出公共部分的用途。

那么什么叫父 chunks,子 chunks 又指什么

一般来说，webpack 中所指的动态引入是用两种方式，一种是使用 import()，一种是使用 require.ensure.

Import 如果要用来动态导入某个模块，则需要.then这种语法，其中内置了 promise, 如果要在低版浏览器中使用需要引入polyfill

```
import(’something’).then(res => {
     // then do something
}) //动态引入


Import some from ‘other-file’;  // 静态引入，一般用于初始化依赖加载
```

关于 import  扩展可见  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import
webpack 支持的模块化方法  https://webpack.docschina.org/api/module-methods#import-

使用 require,ensure，一般如下，现在 import 已取代了 require.ensure 

```
require.ensure(
  dependencies: String[],
  callback: function(require),
  errorCallback: function(error),
  chunkName: String
)
```

其中 chunkName, 即代表了其引入的这个子 chunk名，在一个父文件中可以多次这样引入子 chunk.如果使用 import同样可以指定 chunkname,或者一些其他属性。

```
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  'module'
).then(re => {})
```

那么在 webpack  配置 output 中搭配 chunkFilename 可以打出规定名称的动态引入 chunk 包。

如果一个父文件中有多个这样的子 chunks,他们中有一些共同的代码块，则可以将其单独分离。通过设置 children 为 true，分离代码，设置async 为 true，则将这些额外的内容单独打包，设置为字符串，则这个额外的包名为该字符串。

详细内容见  http://qiutianaimeili.com/html/page/2018/06/d348hdviz3w.html