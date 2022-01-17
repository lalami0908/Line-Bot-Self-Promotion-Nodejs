const express = require('express')
const app = express()
const linebot = require('linebot');
if (process.env.NODE_ENV !== 'production') {
 require('dotenv').config()
}

const bot = linebot({
 channelId: process.env.CHANNEL_ID,
 channelSecret: process.env.CHANNEL_SECRET,
 channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});
const linebotParser = bot.parser();

var indroduce = '- 您好，我叫王佩琳，今年就讀台大資訊管理研究所碩一。\n還請多多指教。(⁎⁍̴̛ᴗ⁍̴̛⁎) \n- 研究所目前在鑽研自然語言處理領域，希望能結合商業智慧與知識管理，利用各種結構或非結構文本創造價值';
var experience = '- 我目前在翱翔實習，主要參與一與國研院科政中心研究計畫，建立語言模型\n- 之前實習經驗在叡揚資訊擔任java後端實習生\n- 也曾在國泰新型態商業發展科實習，規劃內部商業專案流程管理系統'

bot.on('join', function (event) {
  event.reply('lalami line bot 為你服務：）');
});

bot.on('leave', function (event) {
  event.reply('期待我們再相見，祝你有個愉快的一天');
});

bot.on('follow', function (event) {
  event.reply('很高興認識你：)');
});

bot.on('unfollow', function (event) {
  event.reply('真的要走了嗎，我會想你的');
});

// buttons -> postback data
// confirm -> message text
var lineTemplate={
  type: 'template',
  altText: 'this is a confirm template',
  template: {
      type: 'confirm',
      text: '你想知道關於 lalami 的什麼事情？',
      actions: [{
        type: 'message',
        label: '自我介紹',
        text: '自我介紹'
      }, {
        type: 'message',
        label: '經歷',
        text: '經歷'
      }]
  }
};
function processText(msg){
  result = '';
  if (msg==='自我介紹'){
    result = indroduce;
  }else if(msg==='經歷'){
    result = experience;
  }else{
    result = lineTemplate;
  }
  return result;
}

bot.on('message', function(event) {

  var reply='';
  if (event.message.type === 'text') {
    reply = processText(event.message.text);
  }
  else if (event.message.type === 'sticker') {
    reply = {
      type: 'sticker',
      packageId: '1',
      stickerId: '1'
    };
  }
  else if (event.message.type === 'image') {
     reply = {
      type: 'image',
      originalContentUrl: 'https://i.imgur.com/Mmt0d15.jpg',
      previewImageUrl: 'https://i.imgur.com/ij2153G.jpg'
    };
  }
  event.reply(reply).then(function(data) {
    // console.log(reply);
  }).catch(function(error) {
     console.log('error');
  });
});

app.post('/', linebotParser);

app.listen(process.env.PORT || 3000, () => {
  console.log('Express server start')
 });