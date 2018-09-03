var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
  // GET requests for JSON in path /listings
  if (request.method === "GET" && parsedUrl.path === "/listings") {
    response.statusCode = 200;
    response.write(listingData);
  } else { // 404 error all other requests
    response.statusCode = 404;
    response.write("Bad gateway error");
  }
  response.end();
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
  listingData = data;

  // A server is created, but not started
  var server = http.createServer(requestHandler);

  // The server is now started, listening for requests on port 8080
  server.listen(port, function() {
    // Once the server is listening, this callback function is executed
    console.log('Server listening on: http://127.0.0.1:' + port);})
});
