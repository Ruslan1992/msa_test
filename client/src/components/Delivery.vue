<template>
  <div class="deliveries__item">
    <div class="deliveries__item_icon">
      <img src="@/assets/bag.svg/" />
    </div>
    <div class="deliveries__item_date">{{parseDate}}</div>
    <div class="deliveries__item_time">{{delivery.interval}}</div>
    <div class="deliveries__item_arrow">
      <img src="@/assets/arrow.svg/" />
    </div>
  </div>
</template>

<script>
import {parseDeliveryDateDetail} from '@/helpers/date.js';
export default {
  name: "Delivery",
  props: ["delivery"],
  computed: {
    parseDate(){
      return parseDeliveryDateDetail(this.delivery.date)
    }
  }
};
</script>

<style lang="scss">
.deliveries__item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
  line-height: 1.4;
  &:last-child {
    border-bottom: none;
  }
}
.deliveries__item_icon {
  margin-right: 10px;
}
.deliveries__item_time {
  margin: 0 25px 0 auto;
}
</style>
