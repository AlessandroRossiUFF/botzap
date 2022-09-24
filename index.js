const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const twilio = require('twilio');
const call = require('./mylib');

const accountSid = 'ACa8cf937dc029e87f429a13a309a27c66';
const authToken = 'd8c641cfd0b010031c51151cbd21451f';
const client = require('twilio')(accountSid, authToken);


app.use(bodyParser.urlencoded({ extended: true }));

let clientes = [];
let subMenus = call.ArqvToArray('partesCardapio.txt')
let produtos = call.ArrayToArrayStruct(call.ArqvToArray('produtosCardapio.txt'))


app.post('/message', (req, res) => {
  console.log(req.body)
  let id = req.body.WaId
  
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)

  if (clientes[iC].estado == '' && req.body.Body == '1') {
    let menuCardapio = ''
    for (let i = 0; i < subMenus.length; i++) {
      menuCardapio = menuCardapio + i + ' - ' + subMenus[i] + '\n'
    }
    res.send('<Response><Message>' + menuCardapio + '</Message></Response>')
    clientes[iC].estado = '1'
  } // MENU DO CARDÁPIO
    
  else if (clientes[iC].estado == '1'){
    let subMenu = ''
    for (let i = 0; i < produtos.length; i++) {
      if(produtos[i].classe == subMenus[parseInt(req.body.Body)])
        subMenu = subMenu + i + ' - ' + produtos[i].produto + '\n'
    }
    res.send('<Response><Message>' + subMenu + '</Message></Response>')
    // console.log()
    clientes[iC].estado = 'produto'
  } // SUB-MENU DO CARDÁPIO

    
  else if (clientes[iC].estado == 'produto'){
    const twiml = new twilio.twiml.MessagingResponse();
      
    res.send('<Response><Message>' + 'PRODUTO  |  VALOR R$\n' + produtos[parseInt(req.body.Body)].produto + '   |  R$' + produtos[parseInt(req.body.Body)].preco + '\nQuantidade no meu carrinho: ' + produtos[parseInt(req.body.Body)].quantidade + '\n\n'+produtos[parseInt(req.body.Body)].descricao + '</Message></Response>')

    client.messages
     .create({
       from: req.body.To,
       to: req.body.From,
       body: 'PRODUTO  |  VALOR R$\n' + produtos[parseInt(req.body.Body)].produto + '   |  R$' + produtos[parseInt(req.body.Body)].preco + '\nQuantidade no meu carrinho: ' + produtos[parseInt(req.body.Body)].quantidade + '\n\n'+produtos[parseInt(req.body.Body)].descricao ,
       mediaUrl: 'https://bit.ly/whatsapp-image-example',
     })
     .then(message => {
       console.log(message.sid);
     })
     .catch(err => {
       console.error(err);
    });
    
    clientes[iC].estado = ''
  } // SUB-MENU DO PRODUTO
    
    
  else if (clientes[iC].estado == '') {
    res.send('<Response><Message> 1 - VER CARDÁPIO\n 2 - VER CARRINHO</Message></Response>')
  } // MENU INICIAL

  console.log('\nNova mensagem:', req.body.Body);
  console.log('Id:', id);

});


app.listen(3000, function() {
  console.log('Servidor ativo na porta 3000!');
})

// criar a interface de usuário do cliente - em andamento
// Criar sessão do produto - em andamento
// criar sessão do carrinho
// criar sessão do pedido

// criar a interface de usuário do logista


// cd Desktop/NODE
// node botzap.js
// https://botzap.lojaonline.repl.co/message
// ./ngrok http 3000