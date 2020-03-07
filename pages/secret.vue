<template>
  <div class="home flex justify-center flex-col items-center p-20">
    <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      @click="ping"
      type="button">
      Ping
    </button>
    <div class="w-full"> {{ displayText }}
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      displayText:'response'
    }
  },
  methods: {
    ping(e) {
      this.$axios.get('/ping/').
      then((res) => {
        this.displayText = JSON.stringify(res.data)
      })
      e.preventDefault()
    }
  }
}
</script>

<style>

</style>