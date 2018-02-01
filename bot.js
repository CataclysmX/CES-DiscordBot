const Discord = require("discord.js");
const client = new Discord.Client();
var request = require('request');



let prefix = ";";


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`My Prefix is ; :-)`);
});

client.on('message', msg => {
  var sender = msg.author;
  const args = msg.content.slice(prefix.length).trim().split(/\"(.*?)\"/g);
  const command = args.shift().toLowerCase();
  var d = new Date();
  function Logs(opt)
  {
    console.log('[ ' + msg.author.username + ' ] : ' + msg.content + ' '+opt+'                               ' + d.toISOString());
  }

  if (sender.id === '404312431771516938') {
    //msg.delete();
    return;
  }



  if (msg.content.startsWith(prefix + "ping")) {
    Logs();
    msg.reply('Pong!');
  }

  if (msg.content.startsWith(prefix + "help")) {
    msg.delete();
    Logs();
    msg.reply('sorry but no help currently :confused:');
  }

  if (msg.content.startsWith(prefix + "kebab")) {
    msg.delete();
    Logs();
    msg.reply(':stuffed_flatbread: : et voila :smiley:');
  }

  if (msg.content.startsWith(prefix + "okjs")) {
    msg.delete();
    Logs();
    msg.channel.send("Ho non encore une querelle de couple... ");
  }

  if (msg.content.startsWith(prefix + "say")) {
    msg.delete();
    Logs();
    msg.channel.send(args[0]);
  }
  
  
  if (msg.content.startsWith(prefix + "test")) {
  msg.delete();
  Logs();
  msg.channel.send(message.author.name);
  }


  if (msg.content.startsWith(prefix + "correct")) {

    var dataString = args[0];

    var headers = {
        'Username': 'OnlineSpellerWS',
        'Host': 'orthographe.reverso.net',
        'Accept': 'application/json, text/javascript, /; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
        'Origin': 'http://www.reverso.net/',
        'Created': '01/01/0001 00:00:00'
    };



    var options = {
        url: 'http://orthographe.reverso.net/RISpellerWS/RestSpeller.svc/v1/CheckSpellingAsXml/language=fra?outputFormat=json&doReplacements=true&interfLang=fr&dictionary=both&spellOrigin=interactive&includeSpellCheckUnits=true&includeExtraInfo=true&isStandaloneSpeller=true',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var t = JSON.parse(body);
            var body2 = t['AutoCorrectedText'];
            //console.log(body);
            msg.delete();
            Logs(args[0]);
            msg.reply(body2);
            //msg.reply(args[0]);
        }

    }
    request(options, callback);


  }




});
client.login('NDA0MzEyNDMxNzcxNTE2OTM4.DUUA2A.WkhEuO_5S_3hihh-fJlf1z3ZQRk');
client.login(process.env.BOT_TOKEN);
