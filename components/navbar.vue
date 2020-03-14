<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
  >
    <div
      class="w-full px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between sm:w-auto lg:static lg:block md:justify-start"
      >
        <a
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
          href="/"
          >Manbok</a
        ><button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block sm:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div class="flex-auto"></div>
      <div
        class="sm:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
        v-bind:class="{'hidden': !showMenu, 'block': showMenu}"
      >
        <ul class="flex flex-col sm:flex-row list-none md:ml-auto">
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#pablo"
              ><i
                class="lg:text-gray-300 text-gray-500 fab fa-facebook text-lg leading-lg "
              ></i
              ><span class="md:hidden inline-block ml-2">Share</span></a
            >
          </li>
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#pablo"
              ><i
                class="lg:text-gray-300 text-gray-500 fab fa-twitter text-lg leading-lg "
              ></i
              ><span class="md:hidden inline-block ml-2">Tweet</span></a
            >
          </li>
          <client-only>
          <li class="flex items-center" v-if="!isLoggedIn">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="/login"
              ><i
                class="lg:text-gray-300 text-gray-500 fas fa-key text-lg leading-lg "
              ></i
              ><span class="md:hidden inline-block ml-2">Login</span></a
            >
          </li>
          <li class="flex items-center" v-if="isLoggedIn">
            <a
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="#"
              @click="doLogout"
              ><i
                class="lg:text-gray-300 text-gray-500 fas fa-sign-out-alt text-lg leading-lg "
              ></i>
              <span class="md:hidden inline-block ml-2"
              >Logout</span>
            </a>
          </li>
          </client-only>
        </ul>
      </div>
    </div>  
  </nav>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    ...mapState({
      authUser: (state) => state.login.authUser
    }),
    ...mapGetters({
      isLoggedIn: 'login/isLoggedIn'
    })
  },  
  methods: {
    async doLogout(e) {
      this.loading = true
      const alert =  await this.$swal(
        {
          title: "Logout?",
          text: "Are you sure you want to logout?",
          icon: "info",
          buttons: true,
          dangerMode: true,
          buttons: {
            cancel: {
              text: "Cancel",
              value: null,
              visible: true,
              className: "",
              closeModal: true,
            },
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "green-bg",
              closeModal: true
            }
          }
        })
      if (!alert) {
        return
      }
      console.log(alert)
      try {
        await this.$store.dispatch('login/logout')
      } catch (e) {
        this.$toast.error(e.message, { duration: 1500 })
        this.loading = false
      }
      e.preventDefault()
    },
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  }
}
</script>
