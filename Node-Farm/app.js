
// core module
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require('./modules/replaceTemplate');
// Read file
const tempOverview = fs.readFileSync(
  "./1-node-farm/starter/templates/template-overview.html",
  "utf-8"
);
const tempProduct = fs.readFileSync(
  "./1-node-farm/starter/templates/template-product.html",
  "utf-8"
);
const tempCard = fs.readFileSync(
  "./1-node-farm/starter/templates/template-card.html",
  "utf-8"
);

const data = fs.readFileSync(
  "./1-node-farm/starter/dev-data/data.json",
  "utf-8"
);
const dataObj = JSON.parse(data);

// craete Server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cardsHtml = dataObj.map((ele) => replaceTemplate(tempCard, ele)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
    //Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    // Api Page
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
    // Not Found Page
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-prop": "Fathy",
    });
    res.end("<h1>Page Not Found 404</h1>");
  }
});
// Run server
server.listen(4000, "localhost", () => {
  console.log("Listening to requests on port 4000");
});
