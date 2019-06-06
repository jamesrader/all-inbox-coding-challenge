var fs = require("fs");
var fileName = "data/mbox_example";
var array = fs
  .readFileSync(fileName)
  .toString()
  .split("\n");

var headerFlag = 0;
var bodyFlag = 0;
var footerFlag = 0;
var reverseArr = [];
var outArr = [];
var outString = "";

for (i = 0; i < array.length; i++) {
  if (array[i].indexOf("From ") === 0) {
    //console.log("HEADER START ********");
    headerFlag = 1;
    footerFlag = 0;
  }
  if (headerFlag === 1) {
    console.log(array[i]);
    outArr.push(array[i]);
  }
  if (headerFlag === 1 && array[i] === "") {
    //console.log("BODY START *********");
    headerFlag = 0;
    bodyFlag = 1;
    reverseArr = [];
    continue;
  }
  if (bodyFlag === 1 && array[i].indexOf("-- ") == 0) {
    for (j = 0; j < reverseArr.length; j++) {
      console.log(reverseArr[j]);
      outArr.push(reverseArr[j]);
    }
    bodyFlag = 0;
    footerFlag = 1;
  } else if (bodyFlag === 1) {
    reverseArr.unshift(array[i]);
  }
  if (footerFlag === 1) {
    console.log(array[i]);
    outArr.push(array[i]);
  }
}

var str = outArr.join("\n");

fs.writeFile(fileName + "_reversed_jamesrader", str, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("File written!");
  }
});
