<template>
  <v-app>
    <div justify="center" align="center" style="display:flex;">
      <v-flex lg3 sm6 xs12>
        <card 
          icon="mdi-bookmark-check"
          :title=cardmatches
          sub-title="Matches"
          color="green">
        </card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <card 
          icon="mdi-bookmark-remove"
          :title=cardmismatches
          sub-title="Mismatches"
          color="red">
        </card>
      </v-flex>
      <v-flex lg3 sm6 xs12>
        <card 
          icon="mdi-exclamation"
          :title=cardpercentage
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
        style="padding-top:34px"
        @getdate="getfdate">
      </datepicker>
      &nbsp;
      &nbsp;
      <datepicker
        when="To Date"
        style="padding-top:34px"
        @getdate="gettdate">
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
        <v-btn elevation="2" color="#03cefc" v-on:click="reconcile()" v-if="jobId.length==0">
          Reconcile
        </v-btn>
        <v-btn elevation="2" color="#03cefc" v-on:click="reconcile()" v-else disabled>
          Reconcile
        </v-btn>
      </div>
    </div>
    <div>
      <mountains v-bind:job="{
        jobId: jobId,
        renderComponent: renderComponent
        }">
      </mountains>
    </div>
  </v-app>
</template>

<script>
import card from '../components/card.vue'
import datepicker from '../components/datepicker.vue'
import dropdown from '../components/dropdown.vue'
import mountains from './mountains.vue'

export default {
  components: { card,datepicker, dropdown, mountains },
  name: 'IndexPage',
  data:() => ({
    fdate: null,
    tdate: null,
    jobId: "",
    renderComponent: false,
    cardmatches:"0",
    cardmismatches:"0",
    cardpercentage:"0%",
  }),
  methods: {
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    getfdate(value) {
      this.fdate=value;
      console.log(this.fdate);
    },
    gettdate(value) {
      this.tdate=value;
      console.log(this.tdate);
    },
    async reconcile(){
      const res = await this.$axios.post('/api/v1/reconcile',{
              "siteUrl": "url1",
              "gateway": "stripe",
              "start": this.fdate,
              "end": this.tdate
      })
      console.log(res.data.jobId);
      this.jobId = res.data.jobId;
      this.forceRerender();
    },
 }
}
</script>