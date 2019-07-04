#!/usr/bin/env node

const http = require("http")
const fs = require("fs")
const server = http.createServer(function(request, response) {
  if (request.method == "POST") {
    console.log("POST")
    var body = ""
    request.on("data", function(data) {
      body += data
    })
    request.on("end", function() {
      const filename = `trace-${new Date().getTime()}.json`
      console.log(`Recieved Trace, saving it to ${filename}`)
      fs.writeFile(filename, body, err => {
        err && console.log(err)
      })
      response.writeHead(200, { "Content-Type": "text/html" })
      response.end("post received")
    })
  } else {
    console.log("GET")
    response.writeHead(200, { "Content-Type": "text/html" })
    response.end("Use POST method instead of get")
  }
})

const port = 3000
const host = "127.0.0.1"
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
