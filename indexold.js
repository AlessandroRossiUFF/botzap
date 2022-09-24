const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const fs = require('fs');
const token = "5785772507:AAF2gFn2FkcwqufDdXk2b6EX4-gqimbDJsI"

const call = require('./funcoes_auxiliares');

function tiraSufixo(string) {
  let aux = ""
  for (let i = 0; i < string.length - 1; i++)
    aux += string[i]
  return aux
}

function pegaSufixo(string) {
  return string[string.length - 1]
}

let clientes = []; var linhas = ''; var listaComandos = []
let subMenus = call.ArqvToArray('partesCardapio.txt')
let produtos = call.ArrayToArrayStruct(call.ArqvToArray('produtosCardapio.txt'))
let todosProdutos = call.listarCatalogo(produtos)
let produtosMenager = call.sufixarStrings(todosProdutos, 'Menager')
let produtosObservacoes = call.sufixarStrings(todosProdutos, 'Descricao')
let comandos = {
  "lista": todosProdutos,
  "lista0": call.sufixarStrings(todosProdutos, '0'),
  "lista1": call.sufixarStrings(todosProdutos, '1'),
  "lista2": call.sufixarStrings(todosProdutos, '2'),
  "lista3": call.sufixarStrings(todosProdutos, '3'),
  "lista4": call.sufixarStrings(todosProdutos, '4'),
  "lista5": call.sufixarStrings(todosProdutos, '5')
}

listaComandos = call.concat(listaComandos, todosProdutos)
listaComandos = call.concat(listaComandos, call.sufixarStrings(todosProdutos, '0'))
listaComandos = call.concat(listaComandos, call.sufixarStrings(todosProdutos, '1'))
listaComandos = call.concat(listaComandos, call.sufixarStrings(todosProdutos, '2'))
listaComandos = call.concat(listaComandos, call.sufixarStrings(todosProdutos, '3'))
listaComandos = call.concat(listaComandos, call.sufixarStrings(todosProdutos, '4'))
listaComandos = call.concat(listaComandos, call.sufixarStrings(todosProdutos, '5'))
//console.log(listaComandos)
const bot = new Telegraf(token)

const menuInicial = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('CARDÁPIO', 'cardapio'),
  Markup.callbackButton('PROMOÇÕES', '/inicio'),
  Markup.callbackButton('EVENTOS', '/inicio'),
  Markup.callbackButton('SOBRE NÓS', '/inicio'),
  Markup.callbackButton('🔃 FAZER PEDIDO', '/inicio'),
  Markup.callbackButton('CARRINHO', 'carrinho')
], { columns: 2 }))


bot.start(async ctx => {
  let id = ctx.from.id
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)
  clientes[iC].estado = 'cardapio'
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻 /start' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
}) // <- necessário passar para arquivo antes da produção

bot.action('inicio', async ctx => {
  let id = ctx.from.id
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)
  clientes[iC].estado = 'cardapio'
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻 /start' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
}
)

bot.action('cardapio', async ctx => {
  let id = ctx.from.id
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)
  clientes[iC].estado = 'cardapio'
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻' })
  let menuCardapio = []
  for (let i = 0; i < subMenus.length; i++) {
    menuCardapio.push(Markup.callbackButton(subMenus[i], subMenus[i]))
  }
  menuCardapio.push(Markup.callbackButton('Voltar', 'inicio'))
  menuCardapio.push(Markup.callbackButton('CARRINHO', 'carrinho'))
  let menuProduto = Extra.markup(Markup.inlineKeyboard(menuCardapio, { columns: 2 }))
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuProduto)
}
) // <- falta estado

bot.action(subMenus, async ctx => {
  let id = ctx.from.id
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)
  clientes[iC].estado = 'submenus'
  let match = ctx.match
  let txt = ''
  for (let i = 0; i < produtos.length; i++) {
    if (match == produtos[i].classe)
      txt += produtos[i].produto + '\n' + produtos[i].descricao + '\n' + produtos[i].preco + '\n'
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: '🍕 UHUMMM, NOSSAS PIZZAS SÃO UMA DELICIA! MASSA FININHA E MUITO BEM RECHEADAS 🍕\nObservação:todas pizzas são forradas com mussarela e todas pizzas salgadas contém molho e orégano.\n' + txt })

  let menuSubmenu = Extra.markup(Markup.inlineKeyboard(
    [
      Markup.callbackButton('Voltar', 'cardapio'),
      Markup.callbackButton('Carrinho', 'carrinho')
    ], { columns: 2 }))

  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuSubmenu)
}) // ver submenu 18 <- falta estado

bot.hears(todosProdutos, async ctx => {
  let produto = ctx.match
  let id = ctx.from.id
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)
  clientes[iC].estado = produto
  let iP = call.indiceDeProdutoEm(produto, todosProdutos)
  produto = {
    'codigo': produtos[iP].codigo,
    "produto": produtos[iP].produto,
    "preco": produtos[iP].preco,
    "quantidade": produtos[iP].quantidade,
    "classe": produtos[iP].classe,
    "variacao": produtos[iP].variacao,
    "precos": produtos[iP].precos,
    "observacoes": produtos[iP].observacoes,
    "descricao": produtos[iP].descricao
  }
  let menager = produtos[iP].produto + 'Menager'
  let observacao = produtos[iP].produto + 'Descricao'
  console.log(menager)
  let menuProduto = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('alterar observações', observacao),
    Markup.callbackButton('alterar quantidade', menager),
    Markup.callbackButton('voltar ao cardápio', 'cardapio')
  ], { columns: 2 }))
  await ctx.replyWithPhoto({ source: produtos[iP].imagem }, { caption: 'Item: ' + produtos[iP].produto + '\nQuantidade do item no carrinho: ' + produtos[iP].quantidade + '\nValor unitário do item: R$' + produtos[iP].preco + '\nValor total do item no carrinho: R$' + (produtos[iP].preco * produtos[iP].quantidade) + '\n' + produtos[iP].descricao, menuProduto })
  await ctx.reply('Escolha: ', menuProduto)
}) // ver item 31 - estado 

bot.action(produtosMenager, async ctx => {
  let produto = ctx.match
  produto = produtos[call.indiceDeProdutoEm(produto, produtosMenager)].produto
  let id = ctx.from.id
  console.log(produto)
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)
  clientes[iC].estado = produto
  let iP = call.indiceDeProdutoEm(produto, todosProdutos)
  produto = {
    'codigo': produtos[iP].codigo,
    "produto": produtos[iP].produto,
    "preco": produtos[iP].preco,
    "quantidade": produtos[iP].quantidade,
    "classe": produtos[iP].classe,
    "variacao": produtos[iP].variacao,
    "precos": produtos[iP].precos,
    "observacoes": produtos[iP].observacoes,
    "descricao": produtos[iP].descricao
  }
  let menuProduto = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('zerar item', comandos.lista0[iP]),
    Markup.callbackButton('somar 1', comandos.lista1[iP]),
    Markup.callbackButton('somar 2', comandos.lista2[iP]),
    Markup.callbackButton('somar 3', comandos.lista3[iP]),
    Markup.callbackButton('somar 4', comandos.lista4[iP]),
    Markup.callbackButton('somar 5', comandos.lista5[iP]),
    Markup.callbackButton('VOLTAR', 'cardapio')
  ], { columns: 3 }))
  let txt = produtos[iP].produto + '\nQuantidade do item no carrinho: ' + produtos[iP].quantidade + '\nValor unitário do item: R$' + produtos[iP].preco + '\nValor total do item no carrinho: R$' + (produtos[iP].preco * produtos[iP].quantidade) + '\n'
  await ctx.replyWithPhoto({ source: produtos[iP].imagem }, { caption: txt + "Observações do produto: " })
  await ctx.reply('Escolha: ', menuProduto)
}) // ver item 31 + menu do item

bot.action(listaComandos, async ctx => {
  console.log(ctx.match)
  let produto = ctx.match // 
  let sufixo = pegaSufixo(produto)
  produto = tiraSufixo(produto)

  let id = ctx.from.id
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)
  let iP = call.indiceDeProdutoEm(produto, todosProdutos)
  
  let carrinhoUsuario = []
  for(let i=0; i< clientes[iC].carrinho.length; i++){
    carrinhoUsuario.push(clientes[iC].carrinho[i].produto)
  }

  if(call.indiceDeProdutoEm(produto, carrinhoUsuario)!=-1){
    if(sufixo=='0'){
      clientes[iC].carrinho[call.indiceDeProdutoEm(produto, carrinhoUsuario)].quantidade = 0
    }
    else{
      clientes[iC].carrinho[call.indiceDeProdutoEm(produto, carrinhoUsuario)].quantidade = parseInt(clientes[iC].carrinho[call.indiceDeProdutoEm(produto, carrinhoUsuario)].quantidade ) + parseInt(sufixo)
    }
  }else{
    console.log(iP)
    clientes[iC].estado = produto
    produto = {
      'codigo': produtos[iP].codigo,
      "produto": produtos[iP].produto,
      "preco": produtos[iP].preco,
      "quantidade": sufixo,
      "classe": produtos[iP].classe,
      "variacao": produtos[iP].variacao,
      "precos": produtos[iP].precos,
      "observacoes": produtos[iP].observacoes,
      "descricao": produtos[iP].descricao
    }
    clientes[iC].carrinho.push(produto)
  }

  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: 'Bem vindo ao atendimento automático do ESQUINA DO CHOPP BAR E RESTAURANTE 🥘🍕🍻' })
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuInicial)
}) // adicionar item 31 <- estado




bot.action(produtosObservacoes, async ctx => {
  let produto = ctx.match
  produto = produtos[call.indiceDeProdutoEm(produto, produtosObservacoes)].produto
  let id = ctx.from.id
  console.log(produto)
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)
  clientes[iC].estado = ctx.match
 
}) // adicionar item 31 <- estado


bot.on('text', ctx =>{
  let id = ctx.from.id
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "estado": '',
      "id": id,
      "carrinho": []
    }
    clientes.push(cliente)
  }
  let iC = call.indiceDeEm(id, clientes)
  console.log("Estado: " + clientes[iC].estado)

  ctx.reply(`Texto '${ctx.update.message.text}' recebido com sucesso!\nID: ` + id)
  clientes[iC].estado = ""
})

    

bot.action('carrinho', async ctx => {
  let id = ctx.from.id
  if (!call.existeEm(id, clientes) && call.existeNDeEm(id, clientes) < 1) {
    let cliente = {
      "id": id,
      "carrinho": [],
      "estado": ""
    }
    clientes.push(cliente)
    console.log(call.existeNDeEm(id, clientes))
  }
  let iC = call.indiceDeEm(id, clientes)
  let txt = 'CARRINHO\n'
  txt += '\nPRODUTO | QTD | R$\n'

  for (let i = 0; i < clientes[iC].carrinho.length; i++) {
    if (clientes[iC].carrinho[i].variacao == '0') {
      clientes[iC].carrinho[i].variacao = ''
    }
    if(clientes[iC].carrinho[i].quantidade != '0')
      txt += clientes[iC].carrinho[i].produto + ' ' + clientes[iC].carrinho[i].variacao + ' | ' + clientes[iC].carrinho[i].quantidade + ' | ' + clientes[iC].carrinho[i].precos[0] + '\n'
  }
  await ctx.replyWithPhoto({ source: `marj.png` },
    { caption: txt })
  let menuCarrinho = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('CARDÁPIO', 'cardapio'),
    Markup.callbackButton('FAZER PEDIDO', 'inicio'),
  ], { columns: 2 }))
  await ctx.reply('ESCOLHA ENTRE AS OPÇÕES ABAIXO:', menuCarrinho)
}) // 24 <- estado

console.log('rodando')

bot.startPolling()

// Resolver listagem de itens no carrinho por quantidade == resolvido

// Resolver observações de produtos == em andamento -> endereçar obsercações

// criar interface de usuário

// programar especificidades dos produtos


// criar especificidades de serviços

// node index.js

// nexe -i index.js -o index