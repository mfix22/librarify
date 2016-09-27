var Library = require('../../src/librarify');

var settings = require('./settings.json');

var slack = new Library(settings);
slack.config({
  'token' : process.env.SLACK_TOKEN // <INSERT_YOUR_SLACK_TOKEN_HERE>
})

slack.users.list({}, function(err, res){
  console.log(JSON.stringify(err || res, null, 4));
})
