// import LoginService from '../services/loginService'
export default function({ $axios, redirect }) {
    $axios.setBaseURL(process.env.BASE_URL)
    $axios.defaults.withCredentials = true
    // const jwt = LoginService.getToken()
  
    $axios.onRequest((config) => {
      console.log('Making request to ' + config.url)
    })
  
    // $axios.onError((error) => {
    //  const code = parseInt(error.response && error.response.status)
    //  if (code === 400) {
    //    redirect('/400')
    //  }
    // })
  }
