(function() {
  var questions = [{
    question: "What is Pending intent in android?",
    choices: ["kind of intent","use to pass data between activity","fire at future point of time","None of above"],
    correctAnswer: 2
  }, {
    question: "What is android view group?",
    choices: ["collection of views","base class of bulding block","Layouts","None of above"],
    correctAnswer: 0
  }, {
    question: "What is sleep mode in android?",
    choices: ["radio interface layer","switched off","Airplane Mode","None of Above"],
    correctAnswer: 0
  }, {
    question: "Which permissions are require to get a location in android?",
    choices: ["ACCESS_FINE & ACCESS_COARSE","GPRS","INTERNET","WIFI"],
    correctAnswer: 0
  }, {
    question: "What are debugging techniques available in android?",
    choices: ["DDMS","Breaking Point","Memory Profile","All of Above"],
    correctAnswer: 3
  }, {
    question: "How to fix crash using logcat in android?",
    choices: ["Gmail","Google search","Name along with line number","None of above"],
    correctAnswer: 2
  }, {
    question: "How to find JSON element length in android?",
    choices: ["count()","sum()","add()","length()"],
    correctAnswer: 3
  }, {
    question: "Which is magic constant of PHP return class method name?",
    choices: ["_METHOD_","_FILE_","_FUNCTION_","_CLASS_"],
    correctAnswer: 0
  }, {
    question: "Which function is use to read file content?",
    choices: ["fopen()","fread()","filesize()","file_exist()"],
    correctAnswer: 1
  }, {
    question: "Which function is use to get cookies in PHP?",
    choices: ["getcookie()","$_COOKIE","isset()","None of Above"],
    correctAnswer: 1
  },{
    question: "Which is used to parse an XML document in PHP?",
    choices: ["simplexml_load_string()","loadxml()","Both A and B","None of above"],
    correctAnswer: 2
  }, {
    question: "What is size of short variable?",
    choices: [8,16,32,64],
    correctAnswer: 2
  }, {
    question: "What is default value of int?",
    choices: [0,"0.0","null","Not of Above"],
    correctAnswer: 0
  }, {
    question: "What is default value of local variable?",
    choices: ["null",0,"depend on variable","not assign"],
    correctAnswer: 3
  }, {
    question: "Method overloading is example of?",
    choices: ["static binding","dnamic binding","Both","None of Above"],
    correctAnswer: 0
  }, {
    question: "Can you assign anonymous function to a variable?",
    choices: ["true","false"],
    correctAnswer: 0
  }, {
    question: "Which of following JQuery method remove set of method element?",
    choices: ["empty()","delete()","remove(expr)","none of above"],
    correctAnswer: 2
  }, {
    question: "Which is JQuery method sets the height property of element?",
    choices: ["set height()","set height(value)","height(value)","None of Above"],
    correctAnswer: 2
  }, {
    question: "Which return the character at specific index?",
    choices: ["characterAt()","charAt()","getcharAt()","None of Above"],
    correctAnswer: 1
  }, {
    question: "Which method reverse the order in an array?",
    choices: ["changeorder()","reverse()","sort(order)","None of Above"],
    correctAnswer: 1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
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
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
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
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Result: ' + numCorrect + ' / ' +
                 questions.length);
    return score;
  }
})();