const Twitter = require('twitter');
const Exec = require('child_process').exec;
const burnito = require('./secret/burnito');
const client = new Twitter(burnito);


function parseJson(path){
  return path
}

function streamTweet(path){
  const stream = client.stream('statuses/filter', {follow:'394746333,89005816,1912617043,831889083446222849'});
stream.on('data', function(tweet) {
  writeOnLp(tweet.user.name,tweet.text);
});

stream.on('error', function(error) {
  throw error;
});
}

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

exports.streamTweet = streamTweet;
