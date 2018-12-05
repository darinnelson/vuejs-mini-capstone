<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div>
      <h1>newwww</h1>
      Name: <input type="text" v-model="newName">
      Email: <input type="text" v-model="newEmail">
      Password: <input type="text" v-model="newPassword">
      Password Confirmation: <input type="text" v-model="newPasswordConfirmation"><br>
      <button v-on:click="createUser()" class=btn btn-primary>Create</button>
      <ul>
        <li v-for="error in errors">{{error}}</li>
      </ul>
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
      newName: "",
      newEmail: "",
      newPassword: "",
      newPasswordConfirmation: "",
      message: "Welcome to Vue.js!"
    };
  },
  created: function() {},
  methods: {
    createUser: function() {
      console.log("create user");
      this.errors = []
      var params = {
        name: this.newName,
        email: this.newEmail,
        password: this.newPassword,
        password_confirmation: this.newPasswordConfirmation
      };
      if (params["name"] && params["email"] && params["password"] && params["password_confirmation"]) {
        axios
          .post("http://localhost:3000/api/users", params)
          .then(
            function(response) {
              console.log(response);
              this.users.push(response.data);
              this.newName = "";
              this.newEmail = "";
              this.newPassword = "";
              this.newPasswordConfirmation = "";
            }.bind(this)
          )
          .catch(
            function(error) {
              console.log(error.response.data.errors);
              this.errors = error.response.data.errors;
            }.bind(this)
          );
      }
    }
  },
  computed: {}
};
</script>