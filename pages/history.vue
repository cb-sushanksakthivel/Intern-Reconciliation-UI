<template>
  <v-app>
    <v-card
    class="mx-auto"
    max-width="700"
    tile
    >
      <v-list rounded>
        <v-header>Previous Reconciliations</v-header>
        <br>
        <br>
        <div justify="center" style="display:flex;">
        &nbsp;
        &nbsp;
        &nbsp;
        <p>From Date</p>
        &nbsp;
        &nbsp;
        &nbsp;
        <p>To Date</p>
        </div>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <div v-if="items.length!=0">
            <hr>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item[1]"></v-list-item-title>
              </v-list-item-content>
              &nbsp;
              &nbsp;
              <v-list-item-content>
                <v-list-item-title v-text="item[2]"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-else>
            <card 
              icon="mdi-emoticon-sad-outline"
              sub-title="No Data Found"
              font-size=34
              color="black"
            >
            </card>
          </div>
        </v-list-item-group>
      </v-list>
    </v-card>
    <div justify="center" style="display:flex;">
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
    <v-card>
      <v-card-title>
        Reconciled Data
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
        :items="reconcileddata"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'HistoryPage',
  data () {
    return {
      cardmatches:"0",
      cardmismatches:"0",
      cardpercentage:"0%",
      cardcbdomain:"your-site",
      selectedItem: null,
      items: [],
      search: '',
      headers: [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Date', value: 'date' },
        { text: 'Transaction Type', value: 'transactionType' },
        { text: 'Currency Code', value: 'currencyCode' },
        { text: 'Gateway', value: 'gateWay' },
        { text: 'Payment Method', value: 'paymentMethod' },
        { text: 'Amount', value: 'actualamount' },
        { text: 'Gateway Fee', value: 'gatewayFee'},
        { text: 'Total Amount', value: 'amount' },
        { text: 'Issue', value: 'issues' }
      ],
      reconcileddata:[],
      status:"",
      pollInterval: null,
    }
  },
  watch: {
    selectedItem (val) {
      if(val!=null){
        console.log(val);
        const jobid=this.items[val][0];
        this.fetchreconcileddata(jobid);
      }
    },
  },
  mounted(){
    this.fetchItems();
    this.getcburl();
  },
  methods:{
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
    async fetchreconcileddata(val){
      const res=await this.$axios.get('/api/v1/job/'+val);
      this.reconcileddata=res.data.mismatched;
      var m1=res.data.metadata.matchedCount,m2=res.data.metadata.mismatchedCount;
      this.cardmatches=m1.toString();
      this.cardmismatches=m2.toString();
      if(m1+m2!=0){
        this.cardpercentage=(((m2/(m1+m2))*100).toFixed(2)).toString();
      }
    },
    async getcburl(){
      const res= await this.$axios.get('/api/v1/site_url');
      this.cardcbdomain=res.data;
    },
  }
}
</script>