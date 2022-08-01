 const listaPokemonsOriginal = [ 
    {
      "id": 1,
      "nome": "Squirtle",
      "poderAtaque": 1,
      "levelInicial": 1,
      "evolucao": {
        "level": 5,
        "id": 2
      } 
    },
    {
      "id": 2,
      "nome": "Wartortle",
      "poderAtaque": 10,
      "levelInicial": 5,
      "evolucao": {
        "level": 10,
        "id": 3
      } 
    },
    {
      "id": 3,
      "nome": "Blastoise",
      "poderAtaque": 100,
      "levelInicial": 10,
      "evolucao": null
    },
    {
      "id": 4,
      "nome": "Cyndaquil",
      "poderAtaque": 1,
      "levelInicial": 1,
      "evolucao": {
        "level": 5,
        "id": 5
      }
    },
    {
      "id": 5,
      "nome": "Quilava",
      "poderAtaque": 10,
      "levelInicial": 5,
      "evolucao": {
        "level": 10,
        "id": 6
      }
    }, 
    {
      "id": 6,
      "nome": "Thyphlosion",
      "poderAtaque": 100,
      "levelInicial": 10,
      "evolucao": null
    }, 
    {
      "id": 7,
      "nome": "Bulbasaur",
      "poderAtaque": 1,
      "levelInicial": 1,
      "evolucao": {
        "level": 5,
        "id": 8
      }
    },
    {
      "id": 8,
      "nome": "Ivysaur",
      "poderAtaque": 10,
      "levelInicial": 5,
      "evolucao": {
        "level": 10,
        "id": 9
      }
    },
    {
      "id": 9,
      "nome": "Venusaur",
      "poderAtaque": 100,
      "levelInicial": 10,
      "evolucao": null
    }
  ]
  function listaPokemons(listapokemontreinador){
    let listaPokemons = listapokemontreinador
    return listaPokemons
  }

 function novoTreinador (nome, idade, pokeInicial) {
    let lista = listaPokemons(listaPokemonsOriginal)
    const pokemoninicial = lista.find(pokemon => pokemon.nome == pokeInicial)
    let treinador = {
        nome,
        idade,
        listapokemontreinador:[{... pokemoninicial}]
    }
    return treinador
}

 function addPokemon(treinador, pokemon) {
    let lista = listaPokemons(listaPokemonsOriginal)
    treinador.listapokemontreinador.push(lista.find(poke => poke.nome == pokemon))
}

 function subirLevel(treinador){
    return treinador.listapokemontreinador.map(pokemon =>{return {...pokemon, levelInicial: pokemon.levelInicial++}})
}

 function evoluir(treinador){
  let lista = listaPokemons(listaPokemonsOriginal)
    for (let index = 0; index < treinador.listapokemontreinador.length; index++) {
        if (treinador.listapokemontreinador[index].evolucao !== null) {
            if (treinador.listapokemontreinador[index].evolucao.level == treinador.listapokemontreinador[index].levelInicial) {
                treinador.listapokemontreinador[index] = lista.find(pokemon => pokemon.id == treinador.listapokemontreinador[index].evolucao.id)
            }
         }
    } 
}

 function capturarpokemon(treinador, pokemon) {
    
    addPokemon(treinador, pokemon)
    subirLevel(treinador)
    evoluir(treinador)   
}
// const treinadoratualizado = novoTreinador('Pietro', 26, 'Squirtle')
// capturarpokemon(treinadoratualizado, 'Bulbasaur')
// capturarpokemon(treinadoratualizado, 'Cyndaquil')
// capturarpokemon(treinadoratualizado, 'Squirtle')
// capturarpokemon(treinadoratualizado, 'Thyphlosion')
// //capturarpokemon(treinadoratualizado, 'Venusaur')
// console.log(treinadoratualizado)

export { capturarpokemon, evoluir, subirLevel, addPokemon, novoTreinador };


export function contPosicao(pista, personagens) {
  for (let index = 0; index < personagens.length; index++) {
      let posicaoAtual = personagens[index].posicaoPista
      let vantagemPista = 0
      let auxAliado = 0
      let auxInimigo = 0
      let posicaoAlido = null
      let posicaoInimigo = null
      if(personagens[index].vantagem == pista.tipo){
        vantagemPista = 2
      }
      let corredor = personagens.find(carro => carro.nome == personagens[index].aliado)
      if (corredor == undefined) {
        posicaoAlido = null
      }else{posicaoAlido = corredor.posicaoPista}
        if (posicaoAlido != null) {
          auxAliado = (posicaoAtual - posicaoAlido)
        if((auxAliado <= 2 && auxAliado >= -2)){
          auxAliado = 1
         }else{auxAliado = 0}}
      corredor = personagens.find(carro => carro.nome == personagens[index].inimigo)
      if (corredor == undefined) {
        posicaoInimigo = null
      }else{posicaoInimigo = corredor.posicaoPista}
        if (posicaoInimigo != null) {
        auxInimigo = (posicaoAtual - posicaoInimigo)
        if((auxInimigo <= 2 && auxInimigo >= -2)){
          auxInimigo = 1
        }else{auxInimigo = 0}}
      let posicao = personagens[index].posicaoPista
      if (pista.rodada < 4) {
        posicao = personagens[index].aceleracao + pista.debuff + vantagemPista + auxAliado - auxInimigo
      }else if (pista.rodada % 4 == 0) {
          posicao = personagens[index].drift + pista.debuff + vantagemPista + auxAliado - auxInimigo
      }else{
        posicao = personagens[index].velocidade + pista.debuff + vantagemPista + auxAliado - auxInimigo
      }
      if (posicao < 0) {
        posicao = 0
      }
      if (personagens[index].nome == 'Dick Vigarista'){
        if((personagens[index].posicaoPista + posicao) >= pista.tamanho){
          personagens[index].posicaoPista = personagens[index].posicaoPista
      }else{personagens[index].posicaoPista += posicao}
    }else{personagens[index].posicaoPista += posicao}
      
      console.log("rodada:" + pista.rodada + ", " +personagens[index].nome + ", posicao: " + personagens[index].posicaoPista + "\n" +
      "aliado:" + personagens[index].aliado + "-" + auxAliado + ", inimigo: " + personagens[index].inimigo + "-" + auxInimigo + "\n" +
      "vantagem de pista:" + vantagemPista)
  }
}