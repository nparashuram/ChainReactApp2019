# Chain React App - Performance Comparisons

This repo enables JSC, V8 and Hermes on Chain React. It also has commit to extract performance information for app start on the app. Here are the instructions to run the performance tests on various phones. 

# Running the tests

Download the APKs for for v8, JSC and Hermes. 

To create the APKs for v8, hermes and JSC variants, use the following

1. `git clone https://github.com/nparashuram/ChainReactApp2019.git` 
2. `cd ChainReactApp2019 && yarn install`
3. `cd android && ./gradleClean && JS_ENGINE=hermes && ./gradle assembleRelease` 

Change JS_ENGINE in step 3 with strings like "jsc" or "v8" to generate the APK for the corresponding variants. 

By default, all data is POSTed to localhost:3000. So run `adb reverse tcp:3000 tcp:3000` and run the following server.

```
const http = require("http");
const fs = require("fs");
const server = http.createServer(function(request, response) {
  if (request.method == "POST") {
    console.log("Got POST request");
    var body = "";
    request.on("data", function(data) {
      body += data;
    });
    request.on("end", function() {
      console.log("Recieved Trace");
      fs.writeFile("trace.json", body, err => {
        err && console.log(err);
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("post received");
    });
  } else {
    console.log("GET");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("Use POST method instead of get");
  }
});

const port = 3000;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);

```

### Running the tests

For each of the variant, do the following

1. Start up the Chain React App, and then let it open the main screen. If this is the first time the app is run, you may have to dismiss the intro screen, and run the test again.
2. After aroudn 15 seconds, the server will display a message, saying that it has recieved the data. The data is saved in `trace.json`.
3. Start the app up again, and after it settles, run `adb shell dumpsys meminfo com.chainreactapp` to get memory details of the app.

Post these results !! 