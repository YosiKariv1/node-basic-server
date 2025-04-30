const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Welcome</title></head>");
    res.write("<body>");
    res.write("<h1>Hello! Enter a username:</h1>");
    res.write(`
      <form action="/create-user" method="POST">
        <input type="text" name="username" placeholder="Username">
        <button type="submit">Create</button>
      </form>
    `);
    res.write("</body></html>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html><head><title>Users</title></head><body>");
    res.write("<h1>List of users:</h1>");
    res.write("<ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>");
    res.write("</body></html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log("Username:", username);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html><head><title>Not found</title></head>");
  res.write("<body><h1>404 Page Not Found</h1></body></html>");
  res.end();
});

server.listen(3000);
