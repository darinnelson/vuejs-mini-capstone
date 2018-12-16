<template>
  <div class="home">
    <div v-if="endHidden === false">
      <div v-for="mixedExpression in mixedExpressions">
        <div v-if="random > 0.5">
          <div v-if="mixedExpression.hidden===true">
            <h2>{{ mixedExpression.english }}</h2>
            <input type="text" v-model="attempt">
            <div><input type="submit" value="Check" v-on:click='checkAnswer(mixedExpression.spanish, mixedExpression)'></div>
          </div>
        </div>
        <div v-else>
          <div v-if="mixedExpression.hidden===true">
            <h2>{{ mixedExpression.spanish }}</h2>
            <input type="text" v-model="attempt">
            <div><input type="submit" value="Check" v-on:click='checkAnswer(mixedExpression.english, mixedExpression)'></div>
          </div>
        </div>
      </div>

      <div v-if="fiveHidden===true">
        <div v-for="item in eachFiveArray">
          <div v-if="item.hidden_grid===false">
            <button v-on:click="matchingPair(item.english, item.spanish, item)">{{ item.english }}</button>
            <button v-on:click="matchingPair(item.spanish, item.english, item)">{{ item.spanish }}</button>
          </div>
        </div>
      </div>
      
      <div v-if="specialShow === true">
        <div v-for="specialCharacter in specialCharacters">
          <button v-on:click="insertCharacter(specialCharacter)">{{ specialCharacter}}</button>
        </div>
      </div>
    </div>

    <div v-if="endHidden===true">
      <div>{{ currentExpression }}</div> 
      <div v-for="finalExpression in scrambledFinalExpressions">
        <div v-if="finalExpression.hidden===true">
          <button v-on:click="hideFinal(finalExpression)">{{finalExpression.spanish}}</button>
        </div>
      </div>
    </div>

    <div v-if="next_hidden===true">
      <div><h4>Would you like to practice this course again?</h4></div>
      <a v-bind:href="`/#/courses/${course.name}`" class="button" v-on:click="hide_factory()">Yes!</a>
      <a href="/#/courses" class="button">No, take me back to all courses</a>
    </div>

    <a href="/#/courses">Back to all courses</a>

<!--     <div> 
      <p>Interested in translating a specific word? Type it below.</p>
      <input type="text" v-model="translation">
      <div><input type="submit" v-on:click='translate()'></div>
      <div v-for="trans in translationsArray">
        <h2>{{ trans }}</h2>
      </div>
    </div> -->

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
      endHidden: false,
      currentExpression: "",
      finalExpressions: [],
      scrambledFinalExpressions: [],
      endIndex: 1,
      translation: "",
      translationsArray: [],
      specialCharacters: ["ü", "ñ"],
      specialShow: true
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
        this.mixedExpressions = this.shuff(this.expressions).slice(0,9);
        this.finalExpressions = this.shuff(this.mixedExpressions);
        this.scrambledFinalExpressions = this.shuff(this.finalExpressions);
        this.mixedExpressions[this.current].hidden = true;
        this.expressions_length = this.mixedExpressions.length;
      }.bind(this));
  },

  methods: {
    checkAnswer: function(answer, currentExpression) {
      this.attempted += 1;
      this.random = Math.random();
      axios.post("http://localhost:3000/increase_global_attempted");
      axios.post("http://localhost:3000/increase_local_attempted/" + this.course.id);
      if (this.attempt === answer) {
        this.correct += 1;
        alert("Correct");
        axios.post("http://localhost:3000/increase_global_xp");
        axios.post("http://localhost:3000/increase_local_xp/" + this.course.id);
        this.mixedExpressions[this.current].correct = true;
        this.eachFiveArray.push(currentExpression);
        console.log(this.eachFiveArray);
      } else {
        alert("You're garbage you noob. The correct answer is: " + answer);
        this.tempArray.push(currentExpression);
      }

      this.attempt = "";
      this.mixedExpressions[this.current].hidden = false;
      this.current += 1;

      if (this.eachFiveArray.length % 3 === 0 && this.eachFiveArray.length !== 0) {
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
            this.specialShow = true;
            this.eachFiveArray = [];
            if (this.mixedExpressions[this.current]) {
              this.mixedExpressions[this.current].hidden = true;
            }
            this.gridCorrectCount = 0;
            if (this.tempArray.length === 0 && this.current === this.mixedExpressions.length) {
              this.endHidden = true;
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
        this.specialShow = false;
        this.endHidden = false;
        this.next_hidden = true;
        finalExpression.hidden = false;
        alert("Great job! You gained 10 XP!");
      } else {
        if (finalExpression.english === this.currentExpression) {
          this.currentExpression = this.finalExpressions[this.endIndex].english;
          finalExpression.hidden = false;
          this.endIndex += 1
        }
      }
    },
    translate: function() {
      wr(this.translation,'en','es').then(
        function(result) {
          var translations = result.translations[0].translations
          this.translationsArray = []
          translations.forEach(function(translation) {
            this.translationsArray.push(translation.to);
          }.bind(this))
          console.log(this.translationsArray);
        }.bind(this)); 
    },
    insertCharacter: function(specialCharacter) {
      var temp = this.attempt.split("");
      temp.push(specialCharacter);
      console.log(temp);
      this.attempt = temp.join("");
      console.log(this.attempt);
    }
  },
  computed: {}
};
</script>