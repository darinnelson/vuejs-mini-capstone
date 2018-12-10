<template>
  <div class="course_home">

      <table class="table" id="leaderboard">
        <thead>
          <tr>
            <th v-for="item in headers" scope="col">{{ item }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows">
            <td v-for="item in row">{{item}}</td>
          </tr>
        </tbody>
      </table>

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