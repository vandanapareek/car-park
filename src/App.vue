<template>
  <div class="img-container">
  </div>
  <HeaderComp/>
  <ParkingLot/>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue'
import ParkingLot from './components/ParkingLot.vue'

export default {
  name: 'App',
  components: {
    HeaderComp,
    ParkingLot
  }
}
</script>