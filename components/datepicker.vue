<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <div>{{when}}</div>
        <v-text-field
          v-model="date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        >
        </v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
  export default {
    props:{
      when:String
    },
    data: () => ({
      activePicker: null,
      date: null,
      menu: false,
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date);
        var d=new Date(date);
        if(this.when.match("From Date")){
          d.setHours(0,0,0,0);
        }
        else{
          d.setHours(23,59,59,59);
        }
        var send=Math.floor(d.getTime()/1000);
        this.$emit('getdate',send);
      },
    },
  }
</script>