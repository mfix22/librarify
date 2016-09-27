const Library = require('../src/librarify');
const assert = require('assert');
const {expect} = require('chai');

const slackSettings = {
  'url' : 'https://slack.com/api',
  'config' : {
    'token' : {
      'required' : true
    }
  },
  'fns' : {
    'users.list' : {
      'type' : 'POST'
    }
  }
}

const w3wsettings = {
  'package' : 'w3w',
  'url' : 'https://api.what3words.com/v2',
  'config' : {
    key : {
      required : true
    },
    lang : 'en',
    format : 'json',
    display : 'full'
  },

  'fns' : {
    'forward' : {
      route : '/forward',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
    },
    'reverse' : {
      route : '/reverse',
      requiredConfig : ['key'],
      requiredParam : ['coords'],
      optionalConfig : true,
    },
    'autosuggest' : {
      route : '/autosuggest',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
      optionalConfig : true,
      optionalParam : ['focus', 'clip']
    },
    'standardblend' : {
      route : '/standardblend',
      requiredConfig : ['key'],
      requiredParam : ['addr'],
      optionalConfig : ['lang', 'format'],
      optionalParam : ['focus']
    },
    'grid' : {
      requiredConfig : ['key'],
      requiredParam : ['bbox'],
      optionalConfig : ['format'],
    },
    'languages' : {
      requiredConfig : ['key'],
      optionalConfig : ['format'],
    }
  }
}

const slack = new Library(slackSettings);
slack.config({
  'token' : process.env.SLACK_TOKEN // <INSERT_YOUR_SLACK_TOKEN_HERE>
});

const w3w = new Library(w3wsettings);
w3w.config({
  key : process.env.W3W_KEY, // <INSERT_YOUR_W3W_KEY_HERE>
  lang : 'en',
  format : "json",
});


describe('Slack', function() {
  describe('users.list()', function() {
    it('res.ok should equal true if API call is correct', function() {
      slack.users.list({}, function(err, res){
        expect(err).to.equal(null)
        expect(res.ok).to.equal(true);
      });
    });
  });
});


describe('w3w', function() {
  describe('forward()', function() {
    it('steep.sober.potato should get coordinates', function() {
      w3w.forward({
        addr : 'steep.sober.potato',
        display : 'terse'
      }, function (err, res){
        expect(err).to.equal(null);
        expect(res.status.status).to.equal(200);
        expect(res.status.reason).to.equal('ok');
      });
    });
  });
});
