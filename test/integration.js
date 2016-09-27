const Library = require('../src/librarify');
const assert = require('assert');
const {expect} = require('chai');

const slackSettings = require('../examples/slack/settings.json');
const w3wsettings = require('../examples/what3words/settings.json');

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
