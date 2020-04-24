(function() {
  var questions = [{
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
  }, {
    question: "Meu lema é", //18
    choices: ['Fazer o que precisa ser feito ', 
              'Fazer junto com o grupo ', 
              'Fazer bem feito ', 
              'Simplesmente fazer '],
  }, {
    question: "Se eu fosse bilionário", //21
    choices: ['Faria o que desse na cabeça ', 
              'Faria doações para muitas entidades ', 
              'Criaria uma poupança avantajada ', 
              'Me exibiria bastante para algumas pessoas '],
  }, {
    question: "Eu acredito que", //22
    choices: ['Bastam um navio e uma estrela para navegar ', 
              'A jornada é mais importante que o destino ', 
              'Um centavo economizado é um centavo ganho ', 
              'O destino é mais importante que a jornada '],
  }, {
    question: "Eu acredito também que", //23
    choices: ['Um sorriso ou uma careta é o mesmo para quem é cego ', 
              'O que vai, volta ', 
              'De grão em grão a galinha enche o papo ', 
              'Aquele que hesita está perdido '],
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
    
    var header = $('<div id="title"><h2>' + (questions[index].question) + '...</h2></div><div class="progress" style="height: 2px;"> <div class="progress-bar" role="progressbar" style="width: '+(index/12)*100+'%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div></div>');
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
        var nomeAluno = localStorage.getItem('nomeAluno');
        var emailAluno = localStorage.getItem('emailAluno');
        var chaveProjeto = localStorage.getItem('chaveProjeto');
        $.ajax({
          data: 'answers='+selections+'&nomeAluno='+nomeAluno+'&emailAluno='+emailAluno+'&chaveProjeto='+chaveProjeto,
          url: '../../control/alunos_service.php?',
          method: 'POST', // or GET
          success: function(result){
            console.log(result);
            //window.location.replace("../result/result.php?perfil="+result);
          }
        });
        $('#next').hide();
      }
    });
  }
})();