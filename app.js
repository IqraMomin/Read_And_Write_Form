const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "POST") {

        let body = [];
      
        req.on("data", (chunk) => {
          body.push(chunk);
        });
      
        req.on("end", () => {
          const buffer = Buffer.concat(body);
          const formData = buffer.toString();
          const value = decodeURIComponent(formData.split("=")[1]);
      
          fs.writeFile("formValues.txt", value, () => {
      
            // ✅ Read again after writing
            fs.readFile("formValues.txt", "utf-8", (err, data) => {
              res.setHeader("Content-Type", "text/html");
      
              res.write(`
                <body>
                  <p>${data || ""}</p>
                  <form action="/" method="POST">
                    <label>Name:</label>  
                    <input type="text" name="username"/>  
                    <button type="submit">Add</button>
                  </form>
                </body>
              `);
      
              res.end();
            });
      
          });
        });
      }

  else if (req.url === "/" && req.method === "POST") {

    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const buffer = Buffer.concat(body);
      const formData = buffer.toString();
      const value = decodeURIComponent(formData.split("=")[1]);

      fs.writeFile("formValues.txt", value, () => {


        res.setHeader("Content-Type", "text/html");

        res.write(`
          <body>
            <p>${value}</p>
            <form action="/" method="POST">
              <label>Name:</label>  
              <input type="text" name="username"/>  
              <button type="submit">Add</button>
            </form>
          </body>
        `);
        res.end();
      });
    });
  }
});

server.listen(3000);