import VueCookie from 'vue-cookie'

const LoginService = {
  getToken() {
    return VueCookie.get('jwt') || ''
  }
}

export default LoginService
