<template>
  <v-app>
    <div>
      <v-card
        class="mx-auto"
        max-width="700"
        tile
      >
        <div v-if="items.length!=0">          
          <v-list rounded>
            <v-header>Previous Reconciliations</v-header>
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <div style="display:flex;">
                &nbsp;
                &nbsp;
                &nbsp;
                <v-list-item-content>
                  <v-list-item-title>From Date</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>To Date</v-list-item-title>
                </v-list-item-content>
              </div>
              <hr>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item[1]"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title v-text="item[2]"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
        <div v-else>
          <card 
            icon="mdi-emoticon-sad-outline"
            sub-title="No Previous Reconciliations"
            font-size=34
            color="black"
          >
          </card>
        </div>
      </v-card>
    </div>
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
    selectedItem: null,
    items: [],
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
    selectedItem (val) {
      if(val!=null){
        console.log(val);
        this.jobId=this.items[val][0];
        this.status="SUCCESS";
        this.fetch();
      }
    },
  },
  mounted(){
    this.getcburl();
    this.fetchItems();
  },
  methods: {
    async fetchItems(){
      const res=await this.$axios.post("/api/v1/job/",{"siteUrl": "url1"});
      let splt=res.data.arr;
      let temp=[];
      for(let spl of splt){
        var temp2=spl.split(",");
        temp2[1]=temp2[1].split(" ")[0];
        temp2[2]=temp2[2].split(" ")[0];
        temp.push(temp2);
      }
      console.log(temp);
      this.items=temp;
    },
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
      console.log(this.jobId+" "+this.status);
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
