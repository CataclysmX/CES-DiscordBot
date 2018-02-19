const Discord = require("discord.js");
const client = new Discord.Client();
var request = require('request');
var fs = require('fs');
var JsonDB = require('node-json-db');
var randomColor = require('randomcolor');
var db = new JsonDB("Note", true, false);

const music = require('discord.js-music-v11');

let prefix = ";";


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`Use with ` + prefix);
});

client.on('message', msg => {
  if(msg.content.substring(0, 1) != prefix) return;
  if(msg.channel.type == "dm") return;
  color = randomColor({luminosity: 'bright', hue: 'blue'});
  var sender = msg.author;
  const args = msg.content.slice(prefix.length).trim().split(/ \"(.*?)\"+/g);
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

  if (command === "ping") {
    Logs();
    msg.reply('Pong!');
  }

  if (command === "help") {
    msg.delete();
    Logs();
    msg.reply('sorry but no help currently :confused:');
  }

  if (command === "kebab") {
    msg.delete();
    Logs();
    msg.reply(':stuffed_flatbread: : et voila :smiley:');
  }

  if (command === "okjs") {
    msg.delete();
    Logs();
    msg.channel.send("Ho non encore une querelle de couple... ");
  }

  if (command === "say") {
    msg.delete();
    Logs();
    msg.channel.send(args[0]);
  }


  if (command === "test") {
    msg.delete();
    Logs();
    msg.channel.send(sender.id);
  }


  if (command === "correct") {

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

  if (command === "noteadd") {
    console.log("Received");
    db.push("Note2/"+sender.id+"/name[]", args[0], false);
    msg.reply('saved')
  }

  if (command === "notelist")
  {
    console.log("Sent");
    username = "<@"+sender.id+">";
    if(typeof args[0] === 'undefined')
    {
      try
      {
        var data = db.getData("Note2/"+sender.id+"/name");
      }
      catch(error)
      {
        console.error('nothing for : '+sender);
        msg.channel.send("Error encounter :confused: \nsorry");
        return;
      }
      const embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(data)

      msg.channel.send({ embed });
    }
    else
    {
      req = args[0].replace("<@","").replace(">","").replace(" ","");
      try
      {
        var data = db.getData("Note2/"+req+"/name");
      }
      catch(error)
      {
        console.log('nothing for : '+sender);
        msg.channel.send('nothing for : ' + sender);
        return;
      }
      const embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(data)

      msg.channel.send({ embed });
    }
  }
  
  if (command === "carglass")
{
  Logs()
    var time = 0;
    if(typeof args[0] === 'undefined')
    {
        msg.channel.send("Il me faut un numéro de telephone en premier parametre, ainsi que le delai en minutes en second parametre.");
        console.log("1 : OK")
        return;
    }
    if(typeof args[1] !== 'undefined')
    {
        var time = args[1];
        console.log("2 : OK")
    }
    
    console.log("3 : OK")
    msg.channel.send("J'envoie donc un rappel pour : " +args[0]+ " avec un delai de " +time+ " minutes.");
    request('https://www.carglass.fr/webservice/contact?name=Alain&e164=' + args[0] + '&delay=' + time + '&id_tracking=7926&csrf_token=7P2YcTAAJnIQR0sGr7thef-OqoxJ1FEP-uU3s7RmWVM', function (error, response, body){console.log(body)});
}
});
client.login(process.env.BOT_TOKEN);
