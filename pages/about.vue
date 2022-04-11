<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/chargebee-icon-brand.png"
        alt="Vuetify.js"
        class="mb-5"
        height="200px"
        width="180px"
        @load="onImgLoad"
      >
      <blockquote class="blockquote">
        Chargebee is the subscription billing and revenue 
        management platform that lets you solve for your today, 
        and scale for your tomorrow.
        <footer>
          <small>
            <em>&mdash;Chargebee</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  data () {
    return {
      isLoaded: false
    }
  },
  methods: {
    onImgLoad () {
      this.isLoaded = true
    }
  }
}
</script>
