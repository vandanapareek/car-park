<template>
<div class="content">
     <div class="flex-container">
            <div v-if="loading" id="loading">
                  <!-- here put a spinner or whatever you want to indicate that a request is in progress -->
                  <img id="loading-image" src="../assets/loading-gif.gif" alt="Loading..." />
              </div>
              <table id="tableComponent" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th> 
                        Category
                      </th>
                      <th> 
                        Highest
                      </th>
                      <th> 
                        Lowest
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      <!-- Get small car park data -->
                      <tr>
                      <td><b>SMALL</b></td>
                      <td>
                        <p style="color:red;">({{small_carpark.maxLot }} lots available)</p> <br/>
                        {{this.getAllCarParkNumber(small_carpark.maxLotItems)}}
                      </td>
                      <td>
                        <p style="color:red;">({{small_carpark.minLot }} lots available)</p> <br/>
                        {{this.getAllCarParkNumber(small_carpark.minLotItems)}}
                      </td>
                    </tr>

                    <!-- Get medium car park data -->
                    <tr>
                      <td><b>MEDIUM</b></td>
                      <td>
                        <p style="color:red;">({{med_carpark.maxLot }} lots available)</p> <br/>
                        {{this.getAllCarParkNumber(med_carpark.maxLotItems)}}
                      </td>
                      <td>
                        <p style="color:red;">({{med_carpark.minLot }} lots available)</p> <br/>
                        {{this.getAllCarParkNumber(med_carpark.minLotItems)}}
                      </td>
                    </tr>

                    <!-- Get big car park data -->
                    <tr>
                      <td><b>BIG</b></td>
                      <td>
                        <p style="color:red;">({{big_carpark.maxLot }} lots available)</p> <br/>
                        {{this.getAllCarParkNumber(big_carpark.maxLotItems)}}
                      </td>
                      <td>
                        <p style="color:red;">({{big_carpark.minLot }} lots available)</p> <br/>
                        {{this.getAllCarParkNumber(big_carpark.minLotItems)}}
                      </td>
                    </tr>

                    <!-- Get large car park data -->
                    <tr>
                      <td><b>LARGE</b></td>
                      <td>
                        <p style="color:red;">({{large_carpark.maxLot }} lots available)</p> <br/>
                        {{this.getAllCarParkNumber(large_carpark.maxLotItems)}}
                      </td>
                      <td>
                        <p style="color:red;">({{large_carpark.minLot }} lots available)</p> <br/>
                        {{this.getAllCarParkNumber(large_carpark.minLotItems)}}
                      </td>
                    </tr>
                  </tbody>
              </table> 
      </div>
    </div>
</template>

<script>

/**
 * @author Vandana Pareek
 * @version 0.0.1
 */

import { defineComponent } from "vue";
import axios from 'axios'

export default defineComponent({
  components: { },
  data() {
      return {
        items:[],
        small_carpark:{minLot:0 ,minLotItems:[], maxLot:0, maxLotItems:[]},
        med_carpark:{minLot:0, minLotItems:[], maxLot:0, maxLotItems:[]},
        big_carpark:{minLot:0, minLotItems:[], maxLot:0, maxLotItems:[]},
        large_carpark:{minLot:0, minLotItems:[], maxLot:0, maxLotItems:[]},
        timer: null,
        loading: false
      }
   },
   mounted() {
     //Retrieve car park data
     this.getCarParkData();
      this.timer = setInterval(() => {
        this.resetData();
        this.getCarParkData();
      }, 60000)
    },
    methods:{
      resetData(){
        this.loading = true;
        this.small_carpark = {minLot:0, minLotItems:[], maxLot:0, maxLotItems:[]};
        this.med_carpark = {minLot:0, minLotItems:[], maxLot:0, maxLotItems:[]};
        this.big_carpark = {minLot:0, minLotItems:[], maxLot:0, maxLotItems:[]};
        this.large_carpark = {minLot:0, minLotItems:[], maxLot:0, maxLotItems:[]};
      },
      getCategory(total) {
        switch (true) {
         case total < 100:
            return "small";
         case total >=100 && total < 300:
            return "med";
         case total >=300 && total < 400:
            return "big";
         default:
            return "large";
        }
      },
      getCarParkData() {
        axios.get("/transport/carpark-availability").then(response => {
            this.items = response.data.items[0].carpark_data;
            this.items.forEach(function(val){
                var total = 0;
                val.carpark_info.forEach(item => {
                    total += parseInt(item.lots_available);
                });
                let catname = this.getCategory(total);
                this.setMinLot(this.$data[`${catname}_carpark`],total,val.carpark_number);
                this.setMaxLot(this.$data[`${catname}_carpark`],total,val.carpark_number);
            }.bind(this));
        }).catch((error) => {
        console.log(error);
        }).finally(() => (this.loading = false))
      },
      setMinLot(obj, total, carparkNum) {
        if (obj.minLotItems.length == 0 || total == obj.minLot) {
          obj.minLot = total;
          obj.minLotItems.push(carparkNum);
        } else if (total < obj.minLot) {
          obj.minLot = total;
          obj.minLotItems.length = [];
          obj.minLotItems.push(carparkNum);
        }
      },
      setMaxLot(obj, total, carparkNum) {
        if (obj.maxLotItems.length == 0 ||total == obj.maxLot) {
          obj.maxLot = total;
          obj.maxLotItems.push(carparkNum);
        } else if (total > obj.maxLot) {
          obj.maxLot = total;
          obj.maxLotItems.length = [];
          obj.maxLotItems.push(carparkNum);
        } 
      },
      getAllCarParkNumber(arr) {
        return arr.join(", ");
      }
    },
    beforeUnmount() {
      clearInterval(this.timer)
    }
});
</script>