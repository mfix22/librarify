var Library = require('../librarify');

var settings = {
  'url' : 'https://slack.com/api',
  'defaults' : {
  },
  'fns' : {
    'users.list' : {
      // route : '/users.list',
      requiredConfig : ['token'],
      requiredParam : [],
      optionalConfig : [],
      optionalParam : []
    }
  }
}

var slack = new Library(settings);
slack.config({
  'token' : process.env.SLACK_TOKEN // <INSERT_YOUR_SLACK_TOKEN_HERE>
})

slack.users.list({}, function(err, res){
  console.log(JSON.stringify(err || res, null, 4));
})
