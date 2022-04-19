<template>
  <v-app>
    <div style="display:flex;padding-top:15px;">
      <datepicker
        when="From Date"
        @getdate="getfdate">
      </datepicker>
      &nbsp;
      &nbsp;
      <datepicker
        when="To Date"
        @getdate="gettdate">
      </datepicker>
      <v-spacer></v-spacer>
      <div style="padding-top:20px;">
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
      <recondata
        :cardmatches=cardmatches
        :cardmismatches=cardmismatches
        :cardpercentage=cardpercentage
        :cardcbdomain=cardcbdomain
        :search=search
        :mismatchdata=mismatchdata>
      </recondata>
    </div>
    <v-dialog
      v-model="dialog2"
      max-width="320"
    >
      <v-card>
        <v-card-title class="text-h5">
          Check the dates chosen
        </v-card-title>
        <v-card-text>
          Looks like you didn't enter one or both of the dates or you might have entered the from date ahead of to date.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog2 = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import card from '../components/card.vue'
import datepicker from '../components/datepicker.vue'
import recondata from '../components/recondata.vue'

export default {
  components: { card, datepicker, recondata},
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
    mismatchdata: [],
    datafetched:[],
    status: "",
    error: "",
    pollInterval: null,
    dialog: false,
    dialog2: false,
  }),
  watch: {
    dialog (val) {
      if(this.fdate<=this.tdate && !(this.fdate==null||this.tdate==null)){
        if (!val) return
        this.mismatchdata=[];
        this.reconcile();
        setTimeout(() => (this.dialog = false), 8000);
      }
      else{
        this.dialog=false;
        this.dialog2=true;
      }
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
        console.log(this.mismatchdata);
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
