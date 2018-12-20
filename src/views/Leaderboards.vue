<template>
  <div class="course_home">

      <nav class="white" role="navigation">
        <div class="nav-wrapper container">
          <a id="logo-container" href="/#/" class="brand-logo">Native Talk</a>
          <ul class="right hide-on-med-and-down">
            <li><a href="#/login">Log In</a></li>
            <li><a href="#/signup">Sign Up</a></li>
          </ul>

    <!--       <ul id="nav-mobile" class="sidenav">
            
          </ul> -->
          <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
      </nav>

    <div class="container">



      <h4 style="text-align:center">Leaderboards</h4>
      <br><br>
      <table class="table" id="leaderboard">
        <thead>
          <tr>
            <th style="text-align:center" v-for="item in headers" scope="col">{{ item }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows">
            <td style="text-align:center" v-for="item in row">{{item}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      users: [],
      courses: [],
      headers: [],
      rows: []
    };
  },
  created: function() {

    axios.get("http://localhost:3000/api/courses")
      .then(response => {
        this.courses = response.data;
        this.headers.push("Name");
        this.headers.push("XP");
        this.courses.forEach(course => {
          this.headers.push(course.name);
        });

        return axios.get("http://localhost:3000/api/users");

      })
      .then(response => {
        this.users = response.data;
        this.users.forEach(user => {
          var currentRow = [];
          currentRow.push(user.name);
          currentRow.push(user.xp);
        
          var tempXP;
          this.courses.forEach(course => {
            var foundCourseUser = false;
            user.course_users.forEach(courseUser => {
              console.log(course.id, course.name, courseUser.course_id);
              if (course.id === courseUser.course_id && courseUser.xp !== 0) {
                foundCourseUser = true;
                tempXP = courseUser.xp;
              }
            });

            if (foundCourseUser) {
              currentRow.push(tempXP);
            } else {
              currentRow.push("---");
            } 
          });

          this.rows.push(currentRow);
        });
      })
      .then(function() {
        $('#leaderboard').DataTable(
            {"dom": ''}
          );
      });
  },
  methods: {
    combine: function() {

    }

  },
  computed: {}
};
</script>




 for (var i = this.current; i < this.mixedExpressions.length - 1; i++) {
        this.mixedExpressions.forEach(function(mixedExpression) {
          if (mixedExpression.correct !== true)
        });
      }