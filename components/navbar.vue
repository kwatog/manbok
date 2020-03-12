<template>
  <nav
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
  >
  <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
  >
    <button
      class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
      type="button"
      v-on:click="toggleNavbar()"
    >
      <i class="fas fa-bars"></i>Menu
    </button>
  </div>
  <a href="/login">Login</a>
  <span>Logout</span>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  }
}
</script>
