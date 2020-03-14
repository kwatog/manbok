export const state = () => ({
    authUser: null
})

export const mutations = {
  SET_AUTH_USER (state, user) {
    if (user) {
      state.authUser = {
        uid: user.uid,
        email: user.email
      }
    } else {
      state.authUser = null
    }
    console.log(user)
  }
}
export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.authUser.id !== null
    } catch {
      return false
    }
  }
}


export const actions = {
  handleSuccessfulAuthentication({ commit }, { authUser, claims }) {
    const _this = this
    // Install servicerWorker if supported on sign-in/sign-up page.
    // if (process.browser && 'serviceWorker' in navigator) {
    //    navigator.serviceWorker.register('/firebase-auth-sw.js', { scope: '/' })
    // }
    _this.$fireAuth.currentUser.getIdToken(true).then((idToken) => {
      _this.$axios.setHeader('Authorization', `JWT ${idToken}`)
    }).catch((error) => {
      throw new Error('An Error Ocurred: ', error.message)
    })

    commit('SET_AUTH_USER', { authUser })
  },   
  onErrorAction( { commit} , error) {
    console.log('hey!')
    console.log(error)
  }, 
  async login ({ commit }, { email, password }) {
    try {
      const user = await this.$fireAuth.signInWithEmailAndPassword(email, password)
    }
    catch (e) {
      throw new Error(e.message)
    }    
  },
  async logout ({ commit }) {
    await this.$fireAuth.signOut()
    commit('SET_AUTH_USER', null)
  },

  async register ({ commit }, { email, password }) {
    try {
      const user = await this.$fireAuth.createUserWithEmailAndPassword(email, password)
      // const user = auth.currentUser
      await this.$fireAuth.currentUser.sendEmailVerification()
      // console.log(user)
      // commit('SET_AUTH_USER', user)
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
          throw new Error('This email is already registered. Please key-in the correct email.')
        } else {
          throw new Error(error.message)
        }
      }
    },


  async loginGithub({ commit }) {
    try {
      const user = await auth.signInWithPopup(github);
      commit('SET_AUTH_USER', user.user);
      } catch (error) {
      throw new Error('An Error Ocurred: ', error);
    }
  }
}
