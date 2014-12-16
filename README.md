# ReduJS

Esse pacote de NodeJS encapsula as funcionalidades da API REST abstraindo a lógica das requisições HTTP.

Depedências utilizados:

- OAuth
- Querystring
- RequestJS

## Instalação

É necessário npm (Node package manager) para a instalação do ReduJS.

```sh
$ sudo npm install git+git://github.com:godely/redujs.git
```

## Como usar a api

A implementação da biblioteca segue os mesmos padrões definidos na [documentação](http://developers.redu.com.br). Ou seja, os argumentos dos metódos possuem os mesmos nomes que foram documentados.
Por exemplo, se na documentação há uma requisição tipo ``GET`` onde é possível passar um parâmetro ``type`` via querystring, a chamada da função Python teria esse formato:

```javascript
redu.nomeDaFuncao({id: "um id", type: "um tipo"}, callback)
```

callback é uma função executada assim que a função chamada termina de executar, e ela pode retornar um objeto ou uma lista de objetos.

Para ver os detalhes de todas as funções bastar usar a função ``help`` no shell interativo Python:

## QuickStart

Comece instanciando um novo objeto ``Redu``. Esse objeto recebe sua **consumer key** e **consumer secret** e a **base_url**. Mais instruções sobre como obte-las podem ser encontradas na [página de desenvolvedores](http://developers.redu.com.br).

```javascript
var Redu = require('../redujs/api');

var redu = new Redu("yourconsumerkey", "yoursecretkey", "http://base_url");

redu.initClient("pin", function(error, access_token) {
  if (!error) {
    // você está autenticado e pode começar a fazer requisições na API
  }
});
```

Adquira o seu PIN visitando a URL retornada por ``redu.getAuthorizeUrl()`` e inicie o cliente.

Teste a autenticação com uma requisição simples, este metódo deve retornar as informações do seu login:

```javascript
console.log(redu.getMe())
```

Mais exemplos [aqui](https://github.com/godely/redujs/examples).

## Como contribuir

1. Fork redujs no github.com
2. Crie um novo branch
3. Dê commit nas mudanças
4. Mande um pull request

<img src="https://github.com/downloads/redu/redupy/redutech-marca.png" alt="Redu Educational Technologies" width="300">

Este projeto é financiado e mantido pelo [Redu Educational Techologies](http://tech.redu.com.br).

## Copyright

Copyright (c) 2012 Redu Educational Technologies

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
