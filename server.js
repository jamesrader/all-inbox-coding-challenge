var fs = require("fs");
var array = fs
  .readFileSync("data/mbox_example")
  .toString()
  .split("\n");
for (i = 0; i < array.length; i++) {
  console.log(array[i]);
}
