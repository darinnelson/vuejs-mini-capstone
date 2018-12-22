<template>
  <div class="home">

    <nav class="white" role="navigation">
        <div class="nav-wrapper container">
          <a id="logo-container" href="/#/" class="brand-logo">Native Talk</a>
          <ul class="right hide-on-med-and-down">
            <li><a href="#/leaderboards">Leaderboards</a></li>
          </ul>

    <!--       <ul id="nav-mobile" class="sidenav">
            
          </ul> -->
          <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
      </nav>


  <!-- Modal Trigger -->
<!--   <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a> -->
  <br>
  <br>
  <br>
  <div class="container">
  <!-- Modal Structure -->
    <div id="modal1" class="modal dismissible">
      <div class="modal-content">
        <h4 v-if="correctCheck">Correct!</h4>
        <h4 v-else>Incorrect</h4>
        <h4 v-if="!correctCheck">The correct answer is: <span>{{ correctAnswer }}</span></h4>
      </div>
      <div class="modal-footer dismissible">
        <a class="modal-close waves-effect waves-green btn-flat">Continue</a>
      </div>
    </div>

    <div id="modal2" class="modal">
      <div class="modal-content">
        <h4 v-if="correctCheck">Correct!</h4>
        <h4 v-else>Incorrect</h4>
        <h4 v-if="!correctCheck">The correct answer is: <span>{{ correctAnswer }}</span></h4>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat">Continue</a>
      </div>
    </div>

    <div id="end" class="modal">
      <div class="modal-content">
        <h4>You gained 10 XP!</h4>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat">Continue</a>
      </div>
    </div>

    <div v-if="getStarted === true" class="col s12" style="text-align: center;">
      <div style="text-align: center;">
        <br><br> <br> <br> <br>  
        <button style="text-align:center" class="btn-large" v-on:click="initialize()">Let's get started!</button>
      </div>
    </div>

    <div v-if="teachingWords === true">
      <h4>The words are shown below with the translation. You will be quized on these words after you view them all.</h4>
      <br><br>
    </div>
    <div v-if="teachingWords === true">
      <div v-for="initialExpression in initialExpressions">
        <div v-if="initialExpression.hidden === true">

          <div class="row">
            <div class="col s12">
              <h4 style="text-align:center; margin:bottom:25px">{{ initialExpression.spanish}} - {{initialExpression.english}}</h4>
              <br><br>
            </div>
            <div class="col s12" style="text-align: right;">
              <button style="text-align:center" class="btn-large" v-on:click="nextPair()">Next <i class="material-icons right">send</i></button>
            </div>

          </div>

<!--           <div class="row">
            <div class="col s6 teal lighten-2" style="text-align:center"><h1>{{ initialExpression.english}}</h1></div>
            <div class="col s6 teal lighten-2" style="text-align:center"><h1>{{ initialExpression.spanish}}</h1></div>
          </div>
          <button class="btn" v-on:click="nextPair()">Next</button> -->

      <!--     <h4>{{ initialExpression.english}} - {{initialExpression.spanish}}</h4>
          <button class="btn" v-on:click="nextPair()">Next</button> -->
        </div>
      </div>
    </div>

    <div v-if="endHidden === false">
      <div v-if="typeTranslate === true">
        <h3>Type the translation for the following word.</h3>
        <br>
      </div>
      <div v-for="mixedExpression in mixedExpressions">
        <div v-if="random > 0.5">
          <div v-if="mixedExpression.hidden===true">
            <h4>{{ mixedExpression.english }} <span @>  </span></h4>

            <div class="row">
              <div class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <!-- <i class="material-icons prefix">textsms</i> -->
                    <input type="text" v-model="attempt">
                    <label>Type the translation here</label>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="specialShow === true">
              <div style="text-align:center">
                <h6>Special Characters</h6>
                <div>
                <span>
                  <button style="margin:5px" class="btn" v-on:click="insertCharacter(specialCharacters[0])">{{ specialCharacters[0]}}</button>
                </span>
                <span>
                  <button style="margin:5px" class="btn" v-on:click="insertCharacter(specialCharacters[1])">{{ specialCharacters[1]}}</button>
                </span>
                </div>
              </div>
            </div>

            <!-- Modal Trigger -->
            <a class="waves-effect waves-light btn-large modal-trigger" href="#modal1" v-on:click='checkAnswer(mixedExpression.spanish, mixedExpression)'>Check</a>
            <h1></h1>
            
          </div>
        </div>
        <div v-else>
          <div v-if="mixedExpression.hidden===true">
            <h4>{{ mixedExpression.spanish }}</h4>

            <div class="row">
              <div class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <!-- <i class="material-icons prefix">textsms</i> -->
                    <input type="text" v-model="attempt">
                    <label>Type the translation here</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div v-if="specialShow === true">
              <div style="text-align:center">
                <h6>Special Characters</h6>
                <div>
                <span>
                  <button style="margin:5px" class="btn" v-on:click="insertCharacter(specialCharacters[0])">{{ specialCharacters[0]}}</button>
                </span>
                <span>
                  <button style="margin:5px" class="btn" v-on:click="insertCharacter(specialCharacters[1])">{{ specialCharacters[1]}}</button>
                </span>
                </div>
              </div>
            </div>
            <br><br> -->

            <a class="waves-effect waves-light btn-large modal-trigger" href="#modal2" v-on:click='checkAnswer(mixedExpression.english, mixedExpression)'>Check</a>
            <h1></h1>

          </div>
        </div>
      </div>
      
      <div v-if="typePair === true">
        <h4>Match each the words with the its correct translation.</h4>
        <br><br>
      </div>
      <div v-if="fiveHidden===true">
        <div style="text-align:center" v-for="item in eachFiveArray">
          <div v-if="item.hidden_grid===false">
            <button style="margin:5px"  class="btn"v-on:click="matchingPair(item.english, item.spanish, item)">{{ item.english }}</button>
            <button style="margin:5px"  class="btn"v-on:click="matchingPair(item.spanish, item.english, item)">{{ item.spanish }}</button>
            <h1></h1>
          </div>
        </div>
      </div>
      
    </div>

<!--     <div v-if="typeListMatch">
      
    </div> -->
    <div v-if="endHidden===true && x === 1">
      <h4>Choose the correct translation of the word from the following list</h4>
      <br>
      <div style="text-align:center">
        <h5>{{ currentExpression }}</h5>
        <br>
        <div v-for="finalExpression in scrambledFinalExpressions">
          <div v-if="finalExpression.hidden===true">
            <div v-if="endIndex===scrambledFinalExpressions.length">
              <button class="btn modal-trigger" href="#end" v-on:click="hideFinal(finalExpression)">{{finalExpression.spanish}}</button>
            </div>
            <div v-else>
              <button style="margin:5px"  class="btn" v-on:click="hideFinal(finalExpression)">{{finalExpression.spanish}}</button>
              
            </div>

            <!-- <button v-on:click="hideFinal(finalExpression)">{{finalExpression.spanish}}</button> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="next_hidden===true">
      <div style="text-align:center">
        <div><h4>Would you like to practice this course again?</h4></div>
        <br><br>
        <a style="margin:15px" v-bind:href="`/#/courses/${course.name}`" class="waves-effect waves-light btn-large" v-on:click="hide_factory()">Yes!</a>
        <a href="/#/courses" class="waves-effect waves-light btn-large">No, back to all courses</a>
      </div>
    </div>

    <div v-if="next_hidden===false && getStarted === false">
      <br><br><br>
      <a href="/#/courses" class="btn blue darken-5">Back to all courses</a>
    </div>
  </div>

  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");
var wr = require('wordreference-api');

export default {
  data: function() {
    return {
      getStarted: true,
      currentTeach: 0,
      course: {},
      user: {},
      attempt: "",
      temp: "",
      current: 0,
      correct: 0,
      attempted: 0,
      next_hidden: false,
      expressions: [],
      mixedExpressions: [],
      expressions_length: 0,  // ü
      tempArray: [],
      eachFiveArray: [],
      fiveHidden: false,
      firstSelected: false,
      first: "",
      gridCorrectCount: 0,
      random: Math.random(),
      endHidden: true,
      currentExpression: "",
      finalExpressions: [],
      scrambledFinalExpressions: [],
      endIndex: 1,
      translation: "",
      translationsArray: [],
      specialCharacters: ["ü", "ñ"],
      specialShow: true,
      typeTranslate: true,
      typePair: false,
      typeListMatch: false,
      modalShow: false,
      correctCheck: false,
      correctAnswer: "",
      toModal: 0,
      x: 0,
      teachingWords: false,
      intitalExpressions: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/courses/" + this.$route.params.name).then(
      function(response) {
        // wr('Rainbow');
        this.current = 0;
        this.correct = 0;
        this.attempted = 0;
        this.course = response.data;
        this.expressions = this.course.expressions;
        this.mixedExpressions = this.shuff(this.expressions).slice(0,4);
        this.finalExpressions = this.shuff(this.mixedExpressions);
        this.scrambledFinalExpressions = this.shuff(this.finalExpressions);
        this.mixedExpressions[this.current].hidden = true;
        this.expressions_length = this.mixedExpressions.length;
      }.bind(this));
  },
  mounted: function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  },

  methods: {
    checkAnswer: function(answer, currentExpression) {
      console.log(this.attempt, answer);
      this.correctAnswer = answer;
      this.modalShow = true;
      this.attempted += 1;
      this.random = Math.random();
      axios.post("http://localhost:3000/increase_global_attempted");
      axios.post("http://localhost:3000/increase_local_attempted/" + this.course.id);
      if (this.attempt === answer) {
        this.correctCheck = true;
        this.correct += 1;
        // alert("Correct");
        axios.post("http://localhost:3000/increase_global_xp");
        axios.post("http://localhost:3000/increase_local_xp/" + this.course.id);
        this.mixedExpressions[this.current].correct = true;
        this.eachFiveArray.push(currentExpression);
        console.log(this.eachFiveArray);
      } else {
        this.correctCheck = false;
        // alert("You're garbage you noob. The correct answer is: " + answer);
        this.tempArray.push(currentExpression);
      }

      this.attempt = "";
      this.mixedExpressions[this.current].hidden = false;
      this.current += 1;

      if (this.eachFiveArray.length % 2 === 0 && this.eachFiveArray.length !== 0) {
        this.typePair = true;
        this.typeTranslate = false;
        this.specialShow = false;
        this.eachFiveArray.forEach(function(each) {
          each.hidden_grid = false;
        });
        this.fiveHidden = true;
      } else {
        for (var i = this.current; i < this.mixedExpressions.length; i++) {
          if (this.mixedExpressions[i].correct === false) {
            this.mixedExpressions[i].hidden = true;
            break;
          }
        }
        if (this.current === this.mixedExpressions.length) {
          this.mixedExpressions = this.tempArray;
          this.mixedExpressions[0].hidden = true;
          console.log(this.mixedExpressions);
          this.tempArray = [];
          this.current = 0;
        }
      }
    },
    shuff: function(originalExpressions) {
      var expressions = originalExpressions.slice();
      for (var i = 0; i < expressions.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (expressions.length - i));
        var temp = expressions[j];
        expressions[j] = expressions[i];
        expressions[i] = temp;
      }
      return expressions;
    },
    hide_factory: function() {
      // this.mixedExpressions[this.expressions_length - 1].hidden = false;
      this.next_hidden = false;
      location.reload(true);
    },
    matchingPair: function(clickedTranslation, desiredTranslation, expression) {
      if (this.firstSelected) {
        if (desiredTranslation === this.first) {
          expression.hidden_grid = true;
          this.firstSelected = false;     // ü
          this.first = "";
          this.gridCorrectCount += 1;
          if (this.gridCorrectCount === this.eachFiveArray.length) {
            this.typePair = false;
            this.typeTranslate = true;
            this.specialShow = true;
            this.eachFiveArray = [];
            if (this.mixedExpressions[this.current]) {
              this.mixedExpressions[this.current].hidden = true;
            }
            this.gridCorrectCount = 0;
            if (this.tempArray.length === 0 && this.current === this.mixedExpressions.length) {
              this.endHidden = true;
              this.x = 1;
              this.currentExpression = this.finalExpressions[0].english;
              this.scrambledFinalExpressions.forEach(function(finalExpression) {
                finalExpression.hidden = true;
              });
            }
          }
        } else {
          this.firstSelected = true;
          this.first = clickedTranslation;
        }
      } else {
        this.firstSelected = true;
        this.first = clickedTranslation;
      }
    },
    hideFinal: function(finalExpression) {
      if (this.endIndex === this.expressions_length) {
        this.typeTranslate = false;
        this.specialShow = false;
        this.endHidden = false;
        this.next_hidden = true;
        finalExpression.hidden = false;
        // alert("Great job! You gained 10 XP!");
      } else {
        if (finalExpression.english === this.currentExpression) {
          this.currentExpression = this.finalExpressions[this.endIndex].english;
          finalExpression.hidden = false;
          this.endIndex += 1;
        }
      }
    },
    translate: function() {
      wr(this.translation,'en','es').then(
        function(result) {
          var translations = result.translations[0].translations;
          this.translationsArray = [];
          translations.forEach(function(translation) {
            this.translationsArray.push(translation.to);
          }.bind(this));
          console.log(this.translationsArray);
        }.bind(this)); 
    },
    insertCharacter: function(specialCharacter) {
      var temp = this.attempt.split("");
      temp.push(specialCharacter);
      console.log(temp);
      this.attempt = temp.join("");
      console.log(this.attempt);
    },
    nextPair: function() {
      this.initialExpressions[this.currentTeach].hidden = false;
      this.currentTeach += 1;
      if (this.currentTeach === this.expressions_length) {
        this.teachingWords = false;
        this.endHidden = false;
        this.mixedExpressions[0].hidden = true;
      } else {
        this.initialExpressions[this.currentTeach].hidden = true;
      }
    },
    initialize: function() {
      var initialExpressions = this.shuff(this.mixedExpressions);
      initialExpressions.forEach(function(initialExpression)  {
        initialExpression.hidden = false;
      });
      this.getStarted = false;
      this.teachingWords = true;
      this.initialExpressions = initialExpressions;
      this.initialExpressions[0].hidden = true;
      console.log(this.initialExpressions);
    }
  },
  computed: {}
};
</script>