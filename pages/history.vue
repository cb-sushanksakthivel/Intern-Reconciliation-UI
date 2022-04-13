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
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
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
  mounted(){
    this.fetchItemsHelper();
  },
  methods:{
    fetchItemsHelper(){
      this.fetchItems();
      if(this.status != 'SUCCESS') {
        this.pollInterval = setInterval(()=>{this.fetchItems();}, 1000); //save reference to the interval
        setTimeout(() => {clearInterval(this.pollInterval)}, 60000); //stop polling after an hour
      }
    },
    async fetchItems(){
      if(this.status != "SUCCESS"){
        const res=await this.$axios.get('/api/v1/job/',{"siteUrl": "url1"});
        this.status=res.data.status;
        console.log(res);
        this.items=res.data.jobIds;
      }
      else{
        clearInterval(this.pollInterval); //won't be polled anymore
      }
    }
  }
}
</script>