<template>
  <v-row justify="center" align="center">
    <v-flex lg3 sm6 xs12>
      <card 
        icon="mdi-bookmark-check"
        title="134"
        sub-title="Matches"
        color="green">
      </card>
    </v-flex>
    <v-flex lg3 sm6 xs12>
      <card 
        icon="mdi-bookmark-remove"
        title="7"
        sub-title="Mismatches"
        color="red">
      </card>
    </v-flex>
  </v-row>
</template>

<script>
import card from './card.vue'
export default {
  components: { card },
  name: 'IndexPage'
}
</script>