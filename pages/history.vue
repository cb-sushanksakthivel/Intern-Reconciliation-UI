<template>
  <v-app>
    <v-card
    class="mx-auto"
    max-width="400"
    tile
    >
      <v-list rounded>
        <v-header>Previous Reconciliations</v-header>
        <br>
        <br>
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
              <v-list-item-icon>
                <v-icon v-text="i"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
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
      selectedItem: null,
      items: [],
      search: '',
      headers: [
        { text: 'Name', align: 'start', value: 'id' },
        { text: 'Date', value: 'date' },
        { text: 'Transaction Type', value: 'transactionType' },
        { text: 'Currency Code', value: 'currencyCode' },
        { text: 'Amount', value: 'amount' },
        { text: 'Issue', value: 'issues' },
      ],
      reconcileddata:[],
      status:"",
      pollInterval: null,
    }
  },
  watch: {
    selectedItem (val) {
      if(val!=null){
        const jobid=this.items[val];
        this.fetchreconcileddata(jobid);
      }
    },
  },
  mounted(){
    this.fetchItems();
  },
  methods:{
    async fetchItems(){
      const res=await this.$axios.post("/api/v1/job/",{"siteUrl": "url1"});
      this.items=res.data.jobIds;
    },
    async fetchreconcileddata(val){
      const res=await this.$axios.get('/api/v1/job/'+val);
      this.reconcileddata=res.data.mismatched;
    },
  }
}
</script>