let meow = "http://local.com:3000"
var urlGroups = meow.match(/(\S+):\/\/(\S+):?(\d*)/)
console.log(urlGroups);
console.log(urlGroups[3]);

