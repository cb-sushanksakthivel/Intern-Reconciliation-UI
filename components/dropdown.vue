<template>
    <div>
      <div id='dropdownlist' style="margin:50px auto 0; width:250px;">
        <ejs-dropdownlist v-if="drop=='sort'" popupHeight="200px" popupWidth="250px" 
        :dataSource='localDataSort' :fields='localFieldsSort' placeholder='Sort By'
        sortOrder='Ascending'>
        </ejs-dropdownlist>
        <ejs-dropdownlist v-else popupHeight="200px" popupWidth="250px" 
        :dataSource='localDataFilter' :fields='localFieldsFilter' placeholder='Filter By'
        sortOrder='Ascending'>
        </ejs-dropdownlist>
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownListPlugin);
export default{
  props:{
    drop:String,
  },
  data: function() {
    return {
      localDataSort:[{Id:"Ascending",Sort:"Ascending"},{Id:"Descending",Sort:"Descending"}],
      localFieldsSort: { text: 'Sort', value: 'Id' },
      localDataFilter:[{Id:"Customer",Filter:"Customer"},{Id:"Amount",Filter:"Amount"},{Id:"Date",Filter:"Date"},{Id:"Type",Filter:"Type"},{Id:"Matching",Filter:"Matching"}],
      localFieldsFilter: { text: 'Filter', value: 'Id' },
    };
  }
}
</script>
<style>
@import url(https://cdn.syncfusion.com/ej2/material.css);

</style>