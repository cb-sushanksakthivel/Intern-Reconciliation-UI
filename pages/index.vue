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
          :title=cardcbdomain
          sub-title="Chargebee Domain"
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
      <v-spacer></v-spacer>
      <div style="padding-top:55px;">
        <v-btn 
          :disabled="dialog" 
          :loading="dialog" 
          elevation="2" 
          color="#03cefc" 
          v-on:click="dialog=true" 
        >
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

export default {
  components: { card,datepicker},
  name: 'IndexPage',
  data:() => ({
    fdate: null,
    tdate: null,
    jobId: "",
    renderComponent: false,
    cardmatches:"0",
    cardmismatches:"0",
    cardpercentage:"0%",
    cardcbdomain:"your-site",
    search: '',
    headers: [
      { text: 'Name', align: 'start', value: 'id' },
      { text: 'Date', value: 'date' },
      { text: 'Transaction Type', value: 'transactionType' },
      { text: 'Currency Code', value: 'currencyCode' },
      { text: 'Amount', value: 'amount' },
      { text: 'Gateway', value: 'gateWay' },
      { text: 'Payment Method', value: 'paymentMethod' },
      { text: 'Issue', value: 'issues' },
    ],
    datafetched:[],
    mismatchdata: [],
    status: "",
    error: "",
    pollInterval: null,
    dialog: false,
  }),
  watch: {
    dialog (val) {
      if (!val) return
      this.mismatchdata=[];
      this.reconcile();
      setTimeout(() => (this.dialog = false), 4000);
    },
  },
  mounted(){
    this.getcburl();
  },
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
        this.mismatchdata=this.datafetched.data.mismatched;
        var m1=this.datafetched.data.metadata.matchedCount,m2=this.datafetched.data.metadata.mismatchedCount;
        this.cardmatches=m1.toString();
        this.cardmismatches=m2.toString();
        if(m1+m2!=0){
          this.cardpercentage=(((m2/(m1+m2))*100).toFixed(2)).toString();
        }
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
    async getcburl(){
      const res= await this.$axios.get('/api/v1/site_url');
      this.cardcbdomain=res.data;
    },
  }
}
</script>