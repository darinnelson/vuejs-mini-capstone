<template>
  <div class="home">
    <div v-for="expression in mixedExpressions">
      <div v-if="expression.hidden===true">
        <h2>{{ expression.english }}</h2>
        <input type="text" v-model="attempt">
        <div><input type="submit" value="Check" v-on:click='checkAnswer(expression.spanish)'></div>
      </div>
    </div>
    <div v-if="next_hidden===true">
      <div><h4>Would you like to practice this course again?</h4></div>
      <a v-bind:href="`/#/courses/${course.name}`" class="button" v-on:click="hide_factory()">Yes!</a>
      <a href="/#/courses" class="button">No, take me back to all courses</a>
    </div>
    <a href="/#/courses">Back to all courses</a>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

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
      expressions_length: 0
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/courses/" + this.$route.params.name).then(
      function(response) {
        console.log(response.data);
        this.current = 0;
        this.correct = 0;
        this.attempted = 0;
        this.course = response.data;
        this.expressions = this.course.expressions;
        this.mixedExpressions = this.shuff(this.expressions).slice(0,2);
        this.mixedExpressions[this.current].hidden = true;
        this.expressions_length = this.mixedExpressions.length;

        // var expressions = [];
        // this.course.expressions.forEach(function(courseExpression) {
        //   expressions.push(courseExpression); 
        // });
        // var mixedEpressions = shuff(expressions);
        // this.expressions_length = this.course.expressions.length;
      }.bind(this));
  },
  methods: {
    checkAnswer: function(answer) {
      this.attempted += 1;
      axios.post("http://localhost:3000/increase_global_attempted");
      axios.post("http://localhost:3000/increase_local_attempted/" + this.course.id);
      if (this.attempt === answer) {
        this.correct += 1;
        alert("Correct");
        axios.post("http://localhost:3000/increase_global_xp");
        axios.post("http://localhost:3000/increase_local_xp/" + this.course.id);
      } else {
        alert("You are trash. The correct answer is: " + answer);
      }
      this.attempt = "";
      this.expressions[this.current].hidden = false;
      this.current += 1;
      if (this.current < this.expressions_length) {
        this.expressions[this.current].hidden = true;
      } else {
        // this.expressions[0].hidden = true;
        this.next_hidden = true;
        this.current = 0;
        console.log(this.course.name);
        alert("Results: " + Math.round((this.correct / this.attempted) * 100).toFixed(0) + "%");
        // this.$router.push("/courses");
      }
    },
    shuff: function(expressions) {
      for (var i = 0; i < expressions.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (expressions.length - i));

        var temp = expressions[j];
        expressions[j] = expressions[i];
        expressions[i] = temp;
      }
      return expressions;
    },
    hide_factory: function() {
      this.course.expressions[0].hidden = true;
      this.next_hidden = false;
      location.reload(true);
    }
  },
  computed: {}
};
</script>

<!-- v-bind:src="recipe.image_url" -->
<!-- <a v-bind:href="    `/#/recipes/${recipe.id}`     " class="btn btn-primary">go somewhere</a> -->