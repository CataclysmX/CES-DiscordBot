const Discord = require("discord.js");
const client = new Discord.Client();
var request = require('request');
var fs = require('fs');
var JsonDB = require('node-json-db');
var randomColor = require('randomcolor');
var db = new JsonDB("Note", true, false);


const faceapp = require('faceapp');
const superagent = require('superagent');
const music = require('discord.js-music-v11');

let prefix = ";";


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`Use with ` + prefix);
});

music(client, {
  prefix: ';',
  clearInvoker: true,
  volume: 2
});

client.on('message', msg => {
  if (msg.content.substring(0, 1) != prefix) return;
  if (msg.channel.type == "dm") return;
  color = randomColor({
    luminosity: 'bright',
    hue: 'blue'
  });
  
  
  
  var sender = msg.author;
  const command = msg.content.trim().substring(prefix.length).split(/[ \n]/)[0].toLowerCase().trim();
  const args = msg.content.trim().substring(prefix.length + command.length).trim();
  
  switch (command) {
      case 'immagic':
        return immagic(msg, args);
      case 'stream':
        return stream(msg, args);
    }
  
  /*const args = msg.content.slice(prefix.length).trim().split(/ \"(.*?)\"+/g);
  const command = args.shift().toLowerCase();*/
  var d = new Date();

  function Logs(opt) {
    console.log('[ ' + msg.author.username + ' ] : ' + msg.content + ' ' + opt + '                               ' + d.toISOString());
  }


  function carglassCall(number, howmanytimes) {
    msg.channel.send("J'envoie donc un rappel pour : " + number + " avec un delai de " + time + " minutes, " + howmanytimes + " fois.");
    for (i = howmanytimes; i > 0; i--) {

      request('https://www.carglass.fr/webservice/contact?name=Alain&e164=' + +number + +'&delay=' + time + '&id_tracking=7926&csrf_token=7P2YcTAAJnIQR0sGr7thef-OqoxJ1FEP-uU3s7RmWVM', function(error, response, body)

        {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
          msg.channel.send("Reponse de Carglass : " + "json\n" + body + "\n");
        }
      )

    }
  }

  function carglassCallInf(number) {
    if (command != "stop") {
      msg.channel.send("J'envoie donc un rappel pour : " + args[0] + " avec un delai de " + time + " minutes, pour toujours lol.");
      request('https://www.carglass.fr/webservice/contact?name=Alain&e164=' + args[0] + '&delay=' + time + '&id_tracking=7926&csrf_token=7P2YcTAAJnIQR0sGr7thef-OqoxJ1FEP-uU3s7RmWVM', function(error, response, body) {

        msg.channel.send("Reponse de Carglass : " + "json\n" + body + "\n");
      })
    } else {
      msg.channel.send("J'arrete.");
      return;
    }
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
  if (command === "yo") {
    msg.delete();
    const embed = new Discord.RichEmbed()
      .setThumbnail("https://media.giphy.com/media/l0HlMr2G3EKFgpUY0/giphy.gif")
      .setTitle("wesh les négros c'est jhon casseault")
      .setColor(color)

    msg.channel.send({
      embed
    });
  }

  if (command === "say") {
    msg.delete();
    Logs();
    msg.channel.send(suffix);
  }

  if (command === "test") {
    msg.delete();
    Logs();
    msg.channel.send(sender.id);
  }

  if (command === "test2") {

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
    db.push("Note2/" + sender.id + "/name[]", args[0], false);
    msg.reply('saved')
  }

  if (command === "notelist") {
    console.log("Sent");
    username = "<@" + sender.id + ">";
    if (typeof args[0] === 'undefined') {
      try {
        var data = db.getData("Note2/" + sender.id + "/name");
      } catch (error) {
        console.error('nothing for : ' + sender);
        msg.channel.send("Error encounter :confused: \nsorry");
        return;
      }
      const embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(data)

      msg.channel.send({
        embed
      });
    } else {
      req = args[0].replace("<@", "").replace(">", "").replace(" ", "");
      try {
        var data = db.getData("Note2/" + req + "/name");
      } catch (error) {
        console.log('nothing for : ' + sender);
        msg.channel.send('nothing for : ' + sender);
        return;
      }
      const embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(data)

      msg.channel.send({
        embed
      });
    }
  }

  if (command === "carglass") {
    var time = 0;
    var howmanytimes = 1;
    if (typeof args[0] === 'undefined') {
      msg.channel.send("Usage :\n" + prefix + "carglass <numero de tel> (possible d'indiquer 'carglass') <dans combien de temps> <combien de fois> (possible d'indiquer 'infini', necessite le second parametre)\n");
      return;
    }
    if (args[0] === "carglass") {
      msg.channel.send("Mdr Carglass vont reparer leur pare-brise.");
      args[0] = "0977401927";
    }
    if (args[0] === "0611246485" || args[0] === "33611246485") {
      msg.channel.send("Ca c'est le num du boss, deso.");
      return;
    }
    if (typeof args[1] != 'undefined') {
      var time = args[1];
    }
    switch (args[2]) {
      case 'infini':
        msg.channel.send("Putain mais quel fils de pute ololololo les pauvres mdr");
        setInterval(function() {
          carglassCallInf(args[0], 1);
        }, 1000);
        break;
      case undefined:
        var howmanytimes = 1;
        carglassCall(args[0], howmanytimes);
        break;
      default:
        var howmanytimes = args[2];
        msg.channel.send("T'es vraiment un fdp mdr. Je fais ca " + howmanytimes + " fois.");
        carglassCall(args[0], howmanytimes);
        break;
    }
  }


  async function immagic(msg, args)
  {
    filter = ["fun_glasses","mustache","mustache_free","smile","smile_2","hot","old","young","female_2","female","male","pan","hitman","hollywood","heisenberg","impression","lion","goatee","hipster","bangs","glasses","wave","makeup"]
      console.log(args.split(/[ ]/)[0])
    arg1 = args.split(/[ ]/)[0]
      console.log(filter.includes(arg1))

    msg.delete()

    if(filter.includes(arg1) == false)
    {
      msg.channel.send("**__ERROR__ :**\nWrong filter. Retry with : \n\n" + filter.join(', ').toString()+`\n\n**e.g. **: ${prefix + command} smile` )
      return;
    }

      var Attachment = await (msg.attachments).array();
      var nURL = Attachment[0].url
      console.log(nURL+"\n");


    try
    {
      let { body } = await superagent.get(nURL)
      let image = await faceapp.process(body, arg1)
      msg.channel.send({
          file: image // Or replace with FileOptions object
      });
    }
    catch (e)
    {
      console.log(e)
      msg.channel.send("**ERROR :** \nNo faces found.")
      return
    }
  }
  function IMGCheck(img, str, i)
    {
      request.get(img,function (error, response, body)
      {
        //console.log(response.headers["content-type"])
        if(response.headers["content-type"] == "text/html")
        {
          embed = {
            "title": str.results[i].titleNoFormatting + ' ('+str.results[i].visibleUrl+')',
            "url": str.results[i].unescapedUrl.replace("rutube.ru/video","rutube.ru/embed"),
            "color": 16717848,
            "image": {
                "url": img
              }
            };
          msg.channel.send({ embed });
          //return 16717848
        }
        else {
          embed = {
            "title": str.results[i].titleNoFormatting + ' ('+str.results[i].visibleUrl+')',
            "url": str.results[i].unescapedUrl.replace("rutube.ru/video","rutube.ru/embed"),
            "color": 2161787,
            "image": {
                "url": img
              }
            };
          msg.channel.send({ embed });
        }
      })
    }

    async function stream(msg, suffix) {
      if(suffix.length < 2)
      {return}
      console.log("ok")
      var urlFinal = suffix.replace(" ","%20")
      request('https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=5&num=5&hl=fr&prettyPrint=true&source=gcsc&gss=.com&sig=f9d319213db9a87438e3102cff9a2ec9&cx=009653229415439608404:1m_ttrdetu8&q='+urlFinal+'&cse_tok=ABPF6Hha94XrtAEY088JhVEcmfw3yTuagQ:1525555164946&googlehost=www.google.com', function (error, response, body)
      {
        msg.channel.send('``` Red Banner is bad link, "no image Available" is for no streaming ```')
        var str = JSON.parse(body);
        //JSON.parse(str)
        //console.log(str)
        var i = 0;
        var y = 0;
        var color = 0000000
        if(str.results.length < 1)
        {
          msg.channel.send('```Nothing found```');
        }
        else {
          for(i = 0; i != str.results.length; i++)
          {
            try
            {
              var img = str.results[i].richSnippet.cseImage.src
            }
            catch (e)
            {
              var img = "https://vignette.wikia.nocookie.net/yakusokunoneverland/images/3/3c/NoImageAvailable.png"
            }
              IMGCheck(img, str, i)
          }
        }

      })
    }
});
client.login(process.env.BOT_TOKEN);
