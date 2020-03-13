export const state = () => ({
    authUser: null
})

export const mutations = {
  SET_AUTH_USER (state, user) {
    state.authUser = {
      uid: user.uid,
      email: user.email
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
      throw new Error('An Error Ocurred: ', error)
    })

    commit('SET_AUTH_USER', { authUser })
    console.log(authUser)
  },    
  async login ({ commit }, { email, password }) {
    await this.$fireAuth.signInWithEmailAndPassword(email, password)
    // commit('SET_AUTH_USER', null);
  },
  async logout ({ commit }) {
    await auth.signOut();
    commit('SET_AUTH_USER', null);
  },

  async register ({ commit }, { email, password }) {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      await user.sendEmailVerification();
      commit('SET_AUTH_USER', user.user);
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
          try {
            const user = await this.$fireAuth.signInWithEmailAndPassword(this.email, this.password)
            commit('SET_AUTH_USER', user.user);
          } catch (error) {
            throw new Error('An Error Ocurred: ', error);
          }
        } else {
          throw new Error('An Error Ocurred: ', error);
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
