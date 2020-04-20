# 📝 Week 1
In this week’s assignment, we’re experimenting with Node, NPM, and Express.

## 💡TIL’s 
>Today(or this week) I Learned

*   [🤖NPM](#🤖NPM)
*   [✨Express](#✨Express)

### 🤖NPM 
>NPM is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry. [Wikipedia](https://en.wikipedia.org/wiki/Npm_(software))

#### ✏️Using NPM 

Synopsis:

```console
npm <command> [args]
```

Options:

`init` - Initializes project

`-i (--install)` - Installs package in *node_modules* folder and adds an entry in the _package.json_

`-g (--global)` - Installs package globally, not the local project. NPM installs the package under _/usr/local/lib/node_modules_

`-s (--save)` - Saves package package.json (**obsolete** since npm 5 and up, modules are added as a dependency by default)


## 👨🏻‍🎓Ask yourself upon completion (AYUC)

1. How does require work under the hood?
  
The require is a preinstalled node module that is globally available. The module loads another module on the server by resolving its path first and then evaluate it to the virtual machine once it's declared by a variable. 

2. What's the difference between `dependencies` and `devDependencies`?

`devDependencies` are packages that are **only** used during development. ESlint for example is used during developement but is not needed in your build.\

`dependencies` are the essential packages used in your project.

3. What are the differences between `global` and `local` dependencies?

**Global packages** such as `require` and `nodemon` are installed on the host system at _/usr/local/lib/node_modules_ and can be used as a command in the terminal. These packages are usually not essential for the project.

**Local packages** are installed in the _node_modules_ folder and are only available within the project folder's scope. You will need to run `npm install` on a fresh copy to install these packages

4. What tasks can you run with `npm run scripts`?

Really anything you would normally use a longer command for; you can start, test and build your project.

---
### 🤖Serve
>In this assignment you’ll build a static file server with a little help from Express.

#### 🛠The DIY way 
The DIY aproach uses the `fs` and `url` modules.

The url module reads the entered url and returns a json to the server, for example:
```json
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: [Object: null prototype] {},
  pathname: '/about',
  path: '/about',
  href: '/about'
}
```
In this return we can see the url deconstructed and that `pathname`, `path` and `href` hold the value entered after /. You can use this value in an if/switch statement to serve static files. We use the `fs` module to point to and serve these files. Mind you that the header's `content-type` changes to `text/html` as it's a html file and that it's status code to 404 if it's a 404.

```js
const url = require('url');
var fs = require('fs');
const homepage = fs.readFileSync('public/index.html');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  switch (parsedUrl.pathname) {
    case '/about':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('about');
    case '/contact':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('contact');
    case '/':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(homepage);
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404');
  }
});
```

#### ✨Express
[TODO]

