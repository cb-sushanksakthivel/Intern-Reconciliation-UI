<template>
  <v-app>
    <div justify="center" align="center" style="display:flex;">
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
      <v-flex lg3 sm6 xs12>
        <card 
          icon="mdi-exclamation"
          title="94%"
          sub-title="Percent of matches"
          color="purple">
        </card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <card 
          icon="mdi-account"
          title="123456789"
          sub-title="Customer Id"
          color="orange">
        </card>
      </v-flex>
    </div>
    <div style="display:flex;">
      <datepicker
        when="From Date"
        style="padding-top:34px">
      </datepicker>
      &nbsp;
      &nbsp;
      <datepicker
        when="To Date"
        style="padding-top:34px">
      </datepicker>
      &nbsp;
      &nbsp;
      <div>
      <dropdown
        drop="sort" style="padding-top:26px">
      </dropdown>
      </div>
      &nbsp;
      &nbsp;
      <dropdown
        drop="filter" style="padding-top:26px">
      </dropdown>
      &nbsp;
      &nbsp;
      &nbsp;
      <div style="padding-top:55px;">
        <v-btn elevation="2" color="#03cefc">
          Reconcile
        </v-btn>
      </div>
    </div>
    <div>
      <mountains></mountains>
    </div>
  </v-app>
</template>

<script>
import card from './card.vue'
import datepicker from './datepicker.vue'
import dropdown from './dropdown.vue'
import Mountains from './mountains.vue'
import mountains from './mountains.vue'

export default {
  components: { card,datepicker, dropdown, Mountains },
  name: 'IndexPage',
}
</script>