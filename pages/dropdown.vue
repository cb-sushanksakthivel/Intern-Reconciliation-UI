<template>
    <div>
      <div id='dropdownlist' style="margin:50px auto 0; width:250px;">
        <ejs-dropdownlist popupHeight="200px" popupWidth="250px" 
        :dataSource='localData' :fields='localFields' placeholder='Select a filter'
        sortOrder='Descending' style="color:white;">
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
      localData: [{Id:"Ascending",Filter:"Ascending"},{Id:"Descending",Filter:"Descending"}],
      localFields: { text: 'Filter', value: 'Id' },
    };
  }
}
</script>
<style>
@import url(https://cdn.syncfusion.com/ej2/material.css);

</style>