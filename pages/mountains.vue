<template>
  <div>
    <p v-if="status == 'PENDING'">Fetching mountains...</p>
    <p v-else-if="error">An error occurred :(</p>
    <div v-else>
      <h1>Nuxt Mismatched</h1>
        <v-simple-table class="border-separate border border-slate-500 ...">
            <thead>
                <tr>
                    <th class="border border-slate-600 ...">Id</th>
                    <th class="border border-slate-600 ...">Type</th>
                    <th class="border border-slate-600 ...">Issue</th>
                </tr>
            </thead>
            <tbody v-if="mountains.length!=0">
                <tr v-for="mountain in mountains.data.mismatched" v-bind:key="mountain.id">
                    <td class="border border-slate-700 ...">{{mountain.id}}</td>
                    <td class="border border-slate-700 ...">{{mountain.transactionType}}</td>
                    <td class="border border-slate-700 ...">{{mountain.issues}}</td>
                </tr>
            </tbody>
            <tbody v-else>
              <h1>No data Available</h1>
            </tbody>
        </v-simple-table>
        <v-btn @click="mounted()" v-if="job.renderComponent">status: {{status}}</v-btn>
      <v-btn elevation="2" color="#03cefc" @click="fetch()" v-if="status== 'SUCCESS'">Get Data</v-btn>
      <v-btn elevation="2" color="#03cefc"  v-else disabled>Get Data</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
   job: Object
 },
    data() {
      return {
        mountains: [],
        status: "",
        error: "",
      pollInterval: null,
      render: this.job.renderComponent,

      }
    },

    watch: {
      render: function(){
        console.log("helloi");
        this.fetchStatus();
      }
    },

    methods : {
      async fetchStatus() {
        // get request
        console.log("status");
        if(this.job.jobId!=""){
        await this.$axios.get('/api/v1/job/status/'+this.job.jobId)
        .then((res)=> {
          if(res.data.status == 'SUCCESS') {
                  clearInterval(this.pollInterval) //won't be polled anymore 
              }
              this.status = res.data.status; 
              console.log(res);
        });
        }
      },

       mounted(){
        this.fetchStatus();
        if(this.status != 'SUCCESS') {
              this.pollInterval = setInterval(()=>{this.fetchStatus();}, 1000); //save reference to the interval
              setTimeout(() => {clearInterval(this.pollInterval)}, 60000); //stop polling after an hour
          }
      },

      async fetch() {
        // get request
        if(this.job.jobId!="" && this.status=="SUCCESS"){
        this.mountains = await this.$axios.get('/api/v1/job/'+this.job.jobId)
        console.log(this.mountains);
        }
        console.log(this.job.jobId);
      },

    },
    // async mounted() {
    // if(this.job.jobId!=""){
    //     await this.$axios.get('/api/v1/job/'+this.job.jobId+'/status')
    //     .then((res)=> {
    //        this.status = res.data.status; 
    //        console.log(this.status);
    //        this.forceRerender();
    //     });
    //     }
        
    // }

  }
</script>