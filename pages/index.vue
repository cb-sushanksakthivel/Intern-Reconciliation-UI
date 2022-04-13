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
          sub-title="Mismatch Rate"
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
      <v-card>
        <v-card-title>
          Mismatched Data
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="mismatchdata"
          :search="search"
        ></v-data-table>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import card from '../components/card.vue'
import datepicker from '../components/datepicker.vue'
import dropdown from '../components/dropdown.vue'

export default {
  components: { card,datepicker, dropdown},
  name: 'IndexPage',
  data:() => ({
    fdate: null,
    tdate: null,
    jobId: "",
    renderComponent: false,
    cardmatches:"0",
    cardmismatches:"0",
    cardpercentage:"0%",
    search: '',
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Date', value: 'date' },
      { text: 'Transaction Type', value: 'transactionType' },
      { text: 'Currency Code', value: 'currencyCode' },
      { text: 'Amount', value: 'amount' },
      { text: 'Issue', value: 'issues' },
    ],
    datafetched:[],
    mismatchdata: [],
    status: "",
    error: "",
    pollInterval: null,
  }),
  methods: {
    async fetchStatus() {
      // get request
      console.log("status");
      if(this.jobId!=""){
        await this.$axios.get('/api/v1/job/status/'+this.jobId)
        .then((res)=> {
          if(res.data.status == 'SUCCESS') {
            clearInterval(this.pollInterval); //won't be polled anymore 
            this.status = res.data.status; 
            console.log(res);
            this.fetch();
          }
        });
        //console.log("We are venom");
        //this.fetch();
      }
    },
    fetchStatusHelper() {
      this.fetchStatus();
      if(this.status != 'SUCCESS') {
        console.log(this.status);
        this.pollInterval = setInterval(()=>{this.fetchStatus();}, 1000); //save reference to the interval
        setTimeout(() => {clearInterval(this.pollInterval)}, 60000); //stop polling after an hour
      }
    },
    getfdate(value) {
      this.fdate=value;
      console.log(this.fdate);
    },
    gettdate(value) {
      this.tdate=value;
      console.log(this.tdate);
    },
    async fetch() {
      // get request
      if(this.jobId!="" && this.status=="SUCCESS"){
        this.datafetched = await this.$axios.get('/api/v1/job/'+this.jobId);
        console.log(this.datafetched);
        this.mismatchdata=this.datafetched.data.mismatched;
        console.log(this.mismatchdata);
        this.cardmatches=this.datafetched.data.metadata.matchedCount;
        this.cardmismatches=this.datafetched.data.metadata.mismatchedCount;
        this.cardpercentage=((this.cardmismatches/(this.cardmatches+this.cardmismatches))*100).toFixed(2);
        console.log(this.cardmatches+" "+this.cardmismatches+" "+this.cardpercentage);
      }
      console.log(this.jobId);
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
      this.fetchStatusHelper();
    },
 }
}
</script>