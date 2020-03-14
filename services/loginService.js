import VueCookie from 'vue-cookie'

const LoginService = {

  async setToken() {
    const _this = this
    console.log(email, password)
    try {
      // const user = await _this.$fireAuth.signInWithEmailAndPassword(email, password)
      // commit('SET_AUTH_USER', user.user)
      // _this.$fireAuth.currentUser.getIdToken(true).then((idToken) => {
      //  _this.$axios.setHeader('Authorization', `JWT ${idToken}`)
      // }).catch((error) => {
      //  throw new Error('An Error Ocurred: ', error)
      // })
    } catch (e) {
      throw new Error('An Error Ocurred: ', e)
    }
  },  
}

export default LoginService
