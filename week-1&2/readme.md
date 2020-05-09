# 📝 Week 1 & 2
In this week’s assignment, we’re experimenting with Node, NPM, and Express.
Code over at https://github.com/sjagoori/be/tree/develop/week-1

## 💡TIL’s 
>Today(or this week) I Learned

*   [🤖NPM](#NPM)
*   [✨Express](#Express)

### 🤖NPM 
>NPM is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It consists of a command-line client, also called npm, and an online database of public and paid-for private packages called the npm registry. [Wikipedia](https://en.wikipedia.org/wiki/Npm_(software))

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

`devDependencies` are packages that are **only** used during development. ESlint, for example, is used during development but is not needed in your build.\

`dependencies` are the essential packages used in your project.

3. What are the differences between `global` and `local` dependencies?

**Global packages** such as `require` and `nodemon` are installed on the host system at _/usr/local/lib/node_modules_ and can be used as a command in the terminal. These packages are usually not essential for the project.

**Local packages** are installed in the _node_modules_ folder and are only available within the project folder's scope. You will need to run `npm install` on a fresh copy to install these packages

4. What tasks can you run with `npm run scripts`?

Really anything you would normally use a longer command for; you can start, test, and build your project.

---
### 🍽Serve
>In this assignment you’ll build a static file server with a little help from Express.

#### 🛠The DIY way 
The DIY approach uses the `fs` and `url` modules.

The URL module reads the entered URL and returns a JSON to the server, for example:
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
In this return we can see the URL deconstructed and that `pathname`, `path` and `href` hold the value entered after /. You can use this value in an if/switch statement to serve static files. We use the `fs` module to point to and serve these files. Mind you that the header's `content-type` changes to `text/html` as it's a HTML file and that it's status code to 404 if it's a 404.

```js
./index.js

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
Routing with Express is vastly different than the DIY method described above. Express has a structured approach to handling routes.

Compared to the DIY, Express uses 2 additional folders: routes and views. In the routes folder we create a router module that handles and processes the routing. For example:

```js
./routes/indexRouter.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
  const query = req.query.query
  res.render('indexView', {query: query});
});

module.exports = router;
```
In this router, we use the `express router` to process the GET request on /. Using the `req` we get to use it's `.query` method that we can use. In the `res.render()` are the view name (without file extension) and data (as object) passed. In this example, we used an `EJS file` for templating.

```js
./views/indexView.ejs

<%= query %>
```

With the router in place, we can use the view to display the data object we constructed previously.

Now, in your index.js (or whatever is named in your package.json) we can start putting everything together. 

```js
./index.js

const port = 3001;
const express = require('express');
const app = express();
const indexRouter = require('./routes/indexRouter');

app.set('view engine', 'ejs');
app.use('/express', indexRouter);

app.listen(port);
```
In our index.js we, again, declare our express variables and this time around also declare the router. 

We have to set a `view engine` which is an `EJS` in our case but it can be HTML if you're not templating. Once that's set we're using `app.use()` to bind anything `/express` to the `indexRouter`. The `indexRouter` handles the URL and its parameters or queries from there.

With all that in place, you should be able to display the query by entering /express?query=queryString

## 👨🏻‍🎓Ask yourself upon completion (AYUC)

1. How does the `app instance` work? What makes it possible you can do things like `app.get` or `app.listen`?

The app instance in Express is a middleware. A request is made, the server receives it by listening to the port defined in `app.listen(PORT)` and the middleware process starts. For example, if you're expecting to receive `GET requests` then `app.get()` would be appropriate, if its a `post` then `app.post()` would fit. These methods allow the usage of `req` and `res`, allowing the server to process the data from the request to be processed before it can be returned with a response.

2. What are the `req` and `res` parameters?

The `req` parameter is short for request, it can be used to access the information in a request. For example, it would allow the backend to process parameters that are passed in the URL as `req.param.parameter` for `/:parameter` or queries as `req.query.que` for `?que=Hello`.

The `res` parameter is short for the response, it can be used to respond for example after a request is processed. The request parameter can send status codes, headers, files, and more.

3. The confusing part is that your laptop is both the client and the server. It's a local development environment.

That is true, though, the Node server is running on your machine and your browser is the client. Devices on your local network can, if your router allows it, access your Node project hosted on your laptop by entering {laptops.ip}:{port} in their browser.

4. How does Express combine the data from the server with the templating?
Express extracts the data from the middleware process and passes the data as object to the views as they are rendered.

5. How do partials work? Can you set-up a folder structure for your component system?
Partials are reusable components such as the nav or header/footer. One could make a separate components folder and include those components in each EJS like <% include ./component/header %>
