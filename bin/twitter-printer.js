const Twitter = require('twitter');
const Exec = require('child_process').exec;
const burnito = require('./secret/burnito');
const client = new Twitter(burnito);

function TwitterPrinter(json) {
  this.stream = client.stream('statuses/filter', { follow: json["follow"], keepAlive: false});
}

TwitterPrinter.prototype.streamTweet = function (){

  this.stream.on('data', function(tweet) {
    writeOnLp(tweet.user.name,tweet.text);
  });

  function parseJson(path){
    return path
  }

  this.stream.on('error', function(error) {
    throw error;
  });
};

TwitterPrinter.prototype.changeStreamParameter = function(json){
  this.stream.destroy();
  setTimeout(function() {
  this.stream = client.stream('statuses/filter', { follow: json["follow"], keepAlive: false});
}, 5000);
  this.streamTweet();
};


function writeOnLp(tweetUser,tweetText){
  hyphen = "\n" + "-".repeat(34) + "\n"
  out = '@' + tweetUser  + ': ' + tweetText.replace(/\n/g," ") + hyphen;
  console.log(out)
  Exec('printf \"' + out + "\" | lp -o cpi=18", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

module.exports = TwitterPrinter;
