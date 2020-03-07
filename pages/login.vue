<template>
  <div class="home flex justify-center flex-col items-center align-middle">
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="email" type="text" 
      v-model="email"
      placeholder="email">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="password" 
      v-model="password"
      type="password" 
      placeholder="******************">
      <p class="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div class="flex items-center justify-between">
      <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      @click="doLogin"
      type="button">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
      <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      @click="ping"
      type="button">
        Ping
      </button>
    </div>
  </div>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>
</template>

<script>
// import VueCookie from 'vue-cookie'
export default {
  name: 'Login',
  data() {
    return {
      email: 'mikoy@kwatog.com',
      password: 'j5rrqivh'
    }
  },
  methods: {
    doLogin(e) {
      const _this = this
      this.$fireAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        _this.$fireAuth.currentUser.getIdToken(true).then((idToken) => {
          _this.$axios.setHeader('Authorization', `JWT ${idToken}`)
        }).catch((error) => {
          // Handle error
        })
      })
      .catch(e => {
        console.log(e)
      })
      e.preventDefault()
    },
    ping(e) {
      this.$axios.get('/ping/')
      e.preventDefault()
    }
  },
}
</script>

<style></style>
