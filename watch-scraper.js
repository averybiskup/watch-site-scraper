// const request = require("tinyreq");


// this is getting data too
// request("http://ionicabizau.net/", function (err, body) {
//     //console.log(err || body); // Print out the HTML
// });

// const cheerioReq = require("cheerio-req");


// this is getting data
// cheerioReq("http://ionicabizau.net", (err, $) => {
//     console.log($(".header h1").text());
//     //=> Ionică Bizău
// });
// Import the dependencies

const cheerio = require("cheerio"), req = require("tinyreq");

var transform = require('./arr-to-obj.js')
// Define the scrape function
function scrape(url, data, cb) {
    // 1. Create the request
    req(url, (err, body) => {
        if (err) { return cb(err); }

        // 2. Parse the HTML
        let $ = cheerio.load(body), pageData = {};

        // 3. Extract the data
        Object.keys(data).forEach(k => {
            pageData[k] = $(data[k]).text();
        });

        // Send the data in the callback
        cb(null, pageData);
    });
}

//start = 13
//end = 240

let large_data_map = []
let data_map;
for (var i = 13; i < 240; i++) {
  scrape("http://www.orient-watch.com/products/category/item/?category_id=" + i, {
      title: "#spec p",
      name: "#item_title"
  }, (err, data) => {
      data_map = data.title.split("\n")
      if (data_map.length >= 3) {
        large_data_map.push([data.name, data_map])
        //console.log(large_data_map.length)
      }
      if (large_data_map.length == 124) {
        for (var n = 0; n < large_data_map.length; n++) {
          console.log(transform.intoObj(large_data_map[n]))
        }
        //console.log(transform.intoObj(large_data_map[i]))
      }
  });
}





// ORIENT PAGES
