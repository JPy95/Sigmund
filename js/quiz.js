(function() {
  var questions = [{
    question: "Eu sou", //1
    choices: ['Idealista, criativo e visionário',
              'Divertido, espiritual e benéfico', 
              'Confiável, meticuloso e previsível', 
              'Focado, determinado e persistente'],
  }, {
    question: "Eu gosto de", //2
    choices: ['Explorar novas rotas', 
              'Conversar com os passageiros', 
              'Planejar a viagem', 
              'Ser piloto'],
  }, {
    question: "Se você quiser se dar bem comigo", //3
    choices: ['Me dê liberdade ', 
              'Seja amigável, carinhoso e compreensivo', 
              'Me deixe saber sua expectativa ', 
              'Lidere, siga ou saia do caminho '],
  }, {
    question: "Para conseguir obter bons resultados é preciso", //4
    choices: ['Ter incertezas ', 
              'Diversão e celebração', 
              'Controlar o essencial', 
              'Planejar e obter recursos'],
  }, {
    question: "Eu me divirto quando", //5
    choices: ['Tenho novidades  ', 
              'Estou com os outros  ', 
              'Determino as regras ', 
              'Estou me exercitando '],
  }, {
    question: "Eu penso que", //6
    choices: ['É bom ser manso, mas andar com um porrete ', 
              'Unidos venceremos, divididos perderemos ', 
              'Um homem prevenido vale por dois ', 
              'O ataque é melhor que a defesa '],
  }, {
    question: "Minha preocupação é", //7
    choices: ['Gerar a ideia global ', 
              'Fazer com que as pessoas gostem ', 
              'Fazer com que funcione ', 
              'Fazer com que aconteça '],
  }, {
    question: "Eu prefiro", //8
    choices: ['Perguntas a respostas ', 
              'Que todos tenham a chance de serem ouvidos ', 
              'Ter todos os detalhes ', 
              'Vantagens a meu favor '],
  }, {
    question: "Eu gosto de", //9
    choices: ['Construir memórias ', 
              'Tornar as pessoas confortáveis ', 
              'Fazer sentido ', 
              'Fazer progresso '],
  }, {
    question: "Eu gosto de chegar", //10
    choices: ['Em outro lugar ', 
              'Junto', 
              'Na hora', 
              'Na frente'],
  }, {
    question: "Um ótimo dia para mim é quando", //11
    choices: ['Desfruto de coisas novas e estimulantes ', 
              'Me divirto com meus amigos ', 
              'Tudo segue conforme planejado ', 
              'Consigo fazer muitas coisas '],
  }, {
    question: "Eu vejo a morte como", //12
    choices: ['Uma grande aventura misteriosa ', 
              'Oportunidade para rever os falecidos ', 
              'Um modo de receber recompensas ', 
              'Algo que sempre chega muito cedo '],
  }, {
    question: " Minha filosofia de vida é", //13
    choices: ['Para ganhar, é necessário inventar novas regras ', 
              'Para eu ganhar, ninguém precisa perder ', 
              'Para ganhar, é preciso seguir as regras ', 
              'Há ganhadores e perdedores, e eu acredito ser um ganhador '],
  }, {
    question: "Eu sempre gostei de", //14
    choices: ['Explorar ', 
              'Realizar uma abordagem natural ', 
              'Evitar surpresas ', 
              'Focalizar a meta '],
  }
  , {
    question: "Eu gosto de mudanças se ", //15
    choices: ['Me der mais liberdade e variedade ', 
              'For divertido e puder ser compartilhado ', 
              'Melhorar ou me der mais controle ', 
              'Me der uma vantagem competitiva '],
  }
  , {
    question: "Não existe nada de errado em", //16
    choices: ['Mudar de ideia ', 
              'Colocar os outros na frente ', 
              'Ser consistente', 
              'Se colocar na frente '],
  }
  , {
    question: "Eu gosto de buscar conselhos de", //17
    choices: ['Lugares, os mais estranhos ', 
              'Anciões e conselheiros ', 
              'Autoridades no assunto ', 
              'Pessoas bem-sucedidas '],
  }
  , {
    question: "Meu lema é", //18
    choices: ['Fazer o que precisa ser feito ', 
              'Fazer junto com o grupo ', 
              'Fazer bem feito ', 
              'Simplesmente fazer '],
  }
  , {
    question: "Eu gosto de", //19
    choices: ['Complexidade, mesmo se confuso ', 
              'Calor humano e animação ', 
              'Ordem e sistematização ', 
              'Coisas claras e simples '],
  }
  , {
    question: "Tempo para mim é", //20
    choices: ['Irrelevante ', 
              'Um grande ciclo ', 
              'Uma flecha que leva ao inevitável ', 
              'Algo que detesto desperdiçar '],
  }
  , {
    question: "Se eu fosse bilionário", //21
    choices: ['Faria o que desse na cabeça ', 
              'Faria doações para muitas entidades ', 
              'Criaria uma poupança avantajada ', 
              'Me exibiria bastante para algumas pessoas '],
  }
  , {
    question: "Eu acredito que", //22
    choices: ['Bastam um navio e uma estrela para navegar ', 
              'A jornada é mais importante que o destino ', 
              'Um centavo economizado é um centavo ganho ', 
              'O destino é mais importante que a jornada '],
  }
  , {
    question: "Eu acredito também que", //23
    choices: ['Um sorriso ou uma careta é o mesmo para quem é cego ', 
              'O que vai, volta ', 
              'De grão em grão a galinha enche o papo ', 
              'Aquele que hesita está perdido '],
  }
  , {
    question: "Eu acredito ainda que", //24
    choices: ['De grão em grão a galinha enche o papo ', 
              'Um sorriso ou uma careta é o mesmo para quem é cego ', 
              'Aquele que hesita está perdido ', 
              'O que vai, volta '],
  }
  , {
    question: "Eu penso que", //25
    choices: ['Não é fácil ficar encurralado ', 
              'Duas cabeças pensam melhor do que uma ', 
              ' É preferível olhar, antes de pular ', 
              'Se você não tem condições de competir,não compita '],
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  var values = [1,2,3,4]; //value inputs

  /*
    1 - Analista
    2 - Comunicador
    3 - Planejador
    4 - Executor
  */
  
  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }    
    // If no user selection, progress is stopped
    if (choose()) {
      questionCounter++;
      displayNext();
    } 
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<div id="title"><h2>' + (questions[index].question) + '...</h2></div>');
    qElement.append(header);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<label><input type="radio" name="answer" value=' + values[i] + ' />';
      input += questions[index].choices[i] +'</label>';
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    if ($('input[name="answer"]:checked').val() === undefined) {
      alert('Por favor selecione uma opção!');
    } else {
      selections[questionCounter] = $('input[name="answer"]:checked').val();
      return true;
    }
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(selections[questionCounter] === undefined)) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
      }else {
        //var projeto = window.location.search.substring(1).split('&')[0].split('=')[1];
        //var aluno = window.location.search.substring(1).split('&')[1].split('=')[1];
        window.location.replace("result.html");
        /*
        $.ajax({
          data: 'result='+selections+'&projeto='+projeto+'&aluno='+aluno,
          url: 'php/servicos/_questionario.php?',
          method: 'POST', // or GET
          success: function(result){
            window.location.replace("questionario.php");
          }
        });*/
        $('#next').hide();
      }
    });
  }
});