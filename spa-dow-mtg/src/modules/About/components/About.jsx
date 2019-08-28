import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/About.css';

class About extends React.Component {
  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/...</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
        <h1 id="faasuaspacomoumbackendfaria">Faça sua SPA como um Backend faria</h1>

        <p>Repositório para o Webinar da DigitalOne | Magic: The Gathering - Card Collection</p>

        <h2 id="sobre">Sobre</h2>

        <p>O cenário frontend tem crescido cada vez mais e em uma velocidade que por vezes não conseguimos acompanhar. E em meio a tantos frameworks podemos nos sentir ilhados, sem saber qual a melhor forma de construir de forma sustentável nossas aplicações. O que já não é um grande problema para o backend que vem por anos se renovando em sua arquitetura. Nossa ideia é tentar trazer o pensamento do backend para o front e ver se temos algum ganho.</p>

        <h2 id="introduoaoproblema">Introdução ao Problema</h2>

        <p>A ideia aqui é organizar a arquitetura do projeto de tal forma, que a escalabilidade e independência dos componentes esteja completamente garantida.</p>

        <p>Por vezes encontramos arquiteturas no padrão "TODO list" onde temos basicamente:</p>

        <pre><code>/src
        | /components
        | /containers
        | index.js
        | Home.jsx
        | App.jsx
        | ...
        </code></pre>

        <p>Colocar todos os componentes dentro da pasta <code>components</code> parece uma solução interessante, até o momento em que seu projeto começa a escalar a um ponto em que você tem uma quantidade muito grande de itens para orquestrar. E existe o agravante time, onde você terá outras pessoas usando esse código, e suas referências começam a ficar perdidas, e cada vez mais difíceis de dar manutenção.</p>

        <p>Como se não bastasse temos ainda uma utilização desorganizada do <code>redux</code>, onde em alguns projetos, deveria ser algo que viria como um facilitador, nesses casos pode se mostrar um grande amontoado de problemas.</p>

        <h2 id="casosreais">Casos reais</h2>

        <p>Por um senso ético, não vou citar o nome da empresa, nem mesmo o projeto em questão. Mas essa ideia, dessa arquitetura, foi sendo construída ao logo das minhas percepções juntamente a dificuldade que tive ao dar manutenção no projeto.</p>

        <p>A organização estava estabelecida sob o padrão citado anteriormente, conhecido como "TODO list", que é muito utilizado em tutoriais mais básicos sobre react, pois em sua aplicação, você consegue aprender a dinâmica mais fundamental de uma SPA, com o redux, sem perder muito tempo com vários tipos de importações, e configurações. Logo, essa arquitetura tem seu papel, e seu valor garantidos, dentro de um escopo minimalista. Assim que evoluímos nossa aplicação, ela pode se tornar o gargalo no desenvolvimento.</p>

        <p>A SPA que tínhamos que manter possuía uma característica interessante, que era, além da organização pouco escalável de seus componentes, a utilização inapropriada do <code>redux</code>. Como assim? Bom, basicamente imagine que você possui a seguinte estrutura na sua store do redux:</p>

        <pre><code class="json language-json">
        {`{
          user:  {
            name:  "",
            cpf:  "",
            endereco:  ""
          },
          profile:  {
            user:  {
              name:  "",
              cpf:  "",
              endereco:  ""
            },
            is-admin:  false,
            modules:  [...]
          }
        }`}
        </code></pre>

        <p>Conseguiu perceber algo estranho? Em 90% dos casos dentro da aplicação uma informação comum que deveria estar sendo centralizada, para fácil acesso como o <code>user</code> era replicada em outros galhos da arvore da store. E qual a implicação disso. Se você não tiver um controle muito eficiente da sua store, essas informações podem e em grande parte dos casos dentro daquela aplicação, ficavam desatualizados. E qual o efeito? A curto prazo, você vai acabar com a mesma informação em dois pontos diferentes da store, que eventualmente vão ficar desatualizadas, e para garantir a consistência desses dados será necessário realizar alguns malabarismos, como por exemplo, ficar solicitando para a API essas informações atualizadas, gerando custo transacional. Pois a vantagem de guardar essas infos no redux é que você cria uma espécie de cache, e simplesmente puxa elas quando necessário. Mas, se você não pode garantir o que está armazenado no cache, de que ele serve exatamente?</p>

        <h2 id="histriadasoluo">História da solução</h2>

        <p>Dentro dos projetos que apliquei esse conhecimento, não vi nenhum grande problema e foi muito satisfatório todo o processo de desenvolvimento, inclusive por agilizar algumas etapas que se tornam repetitivas. E tudo isso graças a forma backend de modelar esse tipo de sistemas.</p>

        <p>Mas como assim? O que você quer dizer sobre "a forma backend de modelar"?</p>

        <p>Em um meetup na Caelum, tive a oportunidade de conversar com <a href="https://github.com/omariosouto">Mario Souto</a> e contar parte da minha experiencia e sobre essa ideia de trazer o backend para o front, e minha surpresa foi que ele aplica algo similar em suas aplicações. O que me deu mais gás para tentar formalizar essa ideia e poder aplicar. Antes a esse evento, tive um teste em um <a href="https://www.meetup.com/pt-BR/Nerdzao/events/260540678/">meetup</a> do <a href="https://www.meetup.com/pt-BR/Nerdzao/">Nerdzão</a>, onde apresentei a versão inicial dessa proposta. E recebi muitos feedbacks positivos da galera, o que me deixou bastante motivado a melhorar ainda mais.</p>

        <h2 id="propostadesoluo">Proposta de solução</h2>

        <p>É interessante imaginar o quão prepotente posso parecer ao falar que tenho a solução para um problema assim, que aparece em muitos lugares, e magicamente tenho a chave secreta do baú do conhecimento.</p>

        <p>Na verdade a minha ideia é trazer uma proposta de solução para esse problema. E por ser uma proposta, ainda está carente de algumas avaliações e testes.</p>

        <p>Mas vamos ao que interessa. O sistema é baseado inicialmente em módulos e centralizadores. Quando criamos SPAs, é comum perceber que temos objetos que são compartilhados por todos dentro do sistema e esses seriam componentes padrão para a aplicação, mas por vezes sentimos a necessidade de realizar uma alteração bem básica no comportamento de um desses e acabamos encapsulando em diversas condições para garantir que apenas naquele lugar aquela ação aconteça. Dessa forma uma estrutura mais interessante serial algo como ter componente "públicos", mas garantir um comportamento de um deles dentro de qualquer ponto, sem se preocupar com a refatoração do original. Ok, não tem nada de original aqui, mas imagine na estrutura "TODO list", você teria algo como <code>Button.jsx</code> e na mesma pasta <code>ButtonUserSend.jsx</code> e depois um <code>ButtonProfileSend.jsx</code>, sendo que nesses dois últimos existe um encapsulamento do <code>Button.jsx</code>. Em pouco tempo, posso garantir, que essa pasta ira se tornar um amontoado de componentes prontos para um maravilhosos código espaguete.</p>

        <h3 id="componentizao">Componentização</h3>

        <p>Sendo assim, por que não <strong>modularizar</strong> as estruturas fundamentais do seu código. Onde em um CRUD mais básico, você conseguiria garantir qual componente pertence exatamente a o que?</p>

        <p>Para isso pensei em algo como:</p>

        <pre><code>/src
        | /modules
        | | /App
        | | | /components
        | | | | App.jsx
        | | | /styles
        | | | index.js
        | /User
        | | index.js
        | index.js
        </code></pre>

        <p>Perceba, temos uma pasta modules, onde dentro dela temos um <code>index.js</code> que é um centralizador de todos os modules que existem ali. Dentro de qualquer module, você vai encontrar a pasta <code>components</code> e a <code>styles</code> e um <code>index.js</code> também. Esse <code>index.js</code> do App é responsável por importar todos os componentes do módulo, e depois vai ser chamado pelo <code>index.js</code> do modules. Parece confuso, mas isso garante que você só precise exportar o componente em um único lugar, assim, ele se torna disponível com muito mais facilidade na aplicação inteira.</p>

        <p>Para entender melhor, o código você pode encontrar na pasta <code>spa-dow-mtg</code>, ali está tudo que explico aqui.</p>

        <h3 id="store">Store</h3>

        <p>Temos então a explicação sobre a utilização dos componentes, agora como organizar a store. E você deve estar se perguntando. Onde está a filosofia backend nisso tudo? É justamente aqui, onde vamos brilhar meu querido caminhante.</p>

        <p>Existe uma forma bem tradicional, de organizar suas aplicações no backend que é o famoso <a href="https://pt.wikipedia.org/wiki/MVC">MVC</a>. Toda a parte de componentização é responsável pela <code>View</code>, então já matamos uma etapa, mas como adotar a <code>Model</code> e <code>Controllers</code> no front?</p>

        <p>Vamos imaginar um lugar único que garante todos os métodos transacionais dos objetos que estou utilizando no meu sistema e mais interessante ainda. Onde posso garantir o que está sendo retornado da API, pois eu vou consumir na verdade um <code>Objeto</code> vindo de uma <code>Classe</code> e não uma estrutura qualquer retornada do endpoint. Eu obrigo a minha View a consumir a apenas aquilo que meu Controller está me enviando. E não qualquer coisa que venha da API. E dentro do Controller eu apenas acesso aquilo que está na minha store e que foi anteriormente tratado pela minha Model.</p>

        <p>Temos então:</p>

        <pre><code>/src
        | /models
        | | /User
        | | | actions.js
        | | | constants.js
        | | | store.js
        | /modules
        | /store
        | /reducers
        | /utils
        | index.js
        </code></pre>

        <p>Temos agora um aumento considerável na organização da nossa aplicação. E algo interessante ali em <code>Models</code>.</p>

        <p>A ideia principal dessa model, é que ela seja uma estrutura idêntica à mesma entidade no backend. Essa classe estaria em actions, onde teríamos os atributos e os métodos da nossa model. Dentro do arquivo <code>store.js</code> vamos ter uma espécie de controller, onde vamos conseguir controlar o que vem de retorno da API e adaptar isso para ser lançado na Store, deixando assim público o compartilhamento padronizado daquela estrutura.</p>

        <p>Isso elimina algumas checagens no front daquelas <code>{`if ('name' in object) {...}`}</code> para ter certeza que a sua pagina não vai quebrar.</p>

        <h2 id="consideraes">Considerações</h2>

        <p>Para entender mais a fundo, vou explicar tudo no webinar que vai acontecer, e posteriormente , disponibilizar o link aqui nesse mesmo repositório.</p>

        <p>Agradeço desde já, estou completamente aberto a novas ideias e críticas, então caso queriam falar sobre algum detalhe, fiquem a vontade.</p>

        <p>Seria interessante se abrissem issues com as perguntas para que pudêssemos responde-las e ter um histórico sobre elas.</p>

        <p>Imagino que uma comunidade é criada através de um pensamento construtivo sobre as coisas. E minha ideia aqui é fermentar esse assunto, e compartilhar parte da minha experiência! Muito Obrigado! Vida longa e próspera!</p>
      </>
    );
  }
}

export default About;
