const fs = require('fs');

module.exports = {
  
    funcao1(){
        console.log("f1");
    },

    funcao2(){
        console.log("f2");
    },

    existeEm(elemento, array) {
        for (let i = 0; i < array.length; i++)
          if (elemento == array[i].id)
            return true;
        return false;
    },
      
    existeNDeEm(elemento, array) {
        let n = 0;
        for (let i = 0; i < array.length; i++)
          if (elemento == array[i].id)
            n++;
        return n;
    },
      
    indiceDeEm(valor, lista) {
        for (let i = 0; i < lista.length; i++)
          if (valor == lista[i].id)
            return i;
        return -1
    }, //
      
    indiceDeProdutoEm(valor, lista) {
        for (let i = 0; i < lista.length; i++)
          if (valor == lista[i])
            return i;
        return -1
    }, //
      
    ArqvToArray(arquivo) {
        let array = []
        let dataBufferContainer = '';
        dataBufferContainer = fs.readFileSync(arquivo);
        let data = dataBufferContainer.toString();
        linhas = data.split(/\r?\n/);
        linhas.forEach(function(linha) {
          array.push(linha)
        })
        return array
    },
      
    ArrayToArrayStruct(array) {
        let arrStruct = []
        for (let i = 0; i < array.length; i += 6) {
          let struct = {
            'codigo': i,
            'classe': array[i],
            'produto': array[i + 1],
            'imagem': array[i + 2],
            'preco': Number(array[i + 4]),
            "precos": [Number(array[i + 4])],
            "quantidade": 0.0,
            "variacao": array[i + 3],
            'descricao': array[i + 5],
            'observacoes': ''
          }
          arrStruct.push(struct)
        }
        return arrStruct
    },
      
    listarCatalogo(produtos) {
        let lista = []
        for (let i = 0; i < produtos.length; i++) {
          lista.push(produtos[i].produto)
        }
        return lista
    },
      
    sufixarStrings(array, sufixo) {
        let lista = []
        for (let i = 0; i < array.length; i++) {
          lista.push(array[i] + sufixo)
        }
        return lista
    },
      
    concat(array1, array2) {
        for (let i = 0; i < array2.length; i++) {
          array1.push(array2[i])
        }
        return array1
    },  

    tiraSufixo(string) {
      let aux = ""
      for (let i = 0; i < string.length - 1; i++)
        aux += string[i]
      return aux
    },

    pegaSufixo(string) {
      return string[string.length - 1]
    }
  
}