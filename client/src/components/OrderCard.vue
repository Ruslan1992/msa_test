<template>
  <router-link :to="'/' + order.id" tag="div" class="orders__item">
    <OrderHeader :order="order" />
    <div class="delivery">
      <div class="delivery__date">
        <div>
          <div class="delivery__month">{{futureDelivery.dateDelivery.month}}</div>
          <div class="delivery__day">{{futureDelivery.dateDelivery.day}}</div>
        </div>
      </div>
      <div class="delivery__content">
        <div class="delivery__title">
          Ближайшая доставка <span>{{futureDelivery.dateDelivery.weekday}} -</span>
        </div>
        <div class="delivery__time">{{ futureDelivery.intervalDelivery }}</div>
        <div class="delivery__address">{{ futureDelivery.addressDelivery }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
import OrderHeader from "@/components/OrderHeader.vue";
import {filterDeliveries, parseDeliveryDate} from '@/helpers/date.js'

export default {
  name: "OrderCard",  
  props: ["order"],
  components: {
    OrderHeader
  },
  computed: {
    futureDelivery() {
      const firstDelivery = filterDeliveries(this.order.deliveries)[0];
      return {
        dateDelivery: parseDeliveryDate(firstDelivery.date),      
        intervalDelivery: firstDelivery.interval,     
        addressDelivery: firstDelivery.address,
      }
    }
  }
};
</script>

<style lang="scss">
.orders__item {
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}
.delivery {
  display: flex;
  align-items: stretch;
}
.delivery__date {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  width: 60px;
  background: #1e6fb9;
  color: #fff;
  border-radius: 4px;
  text-align: center;
}
.delivery__month {
  font-size: 11px;
  line-height: 15px;
}
.delivery__day {
  font-size: 20px;
  line-height: 1;
}
.delivery__content {
  padding: 6px 0;
}
.delivery__title {
  font-size: 17px;
  line-height: 1.2;
  font-weight: 600;
  margin-bottom: 10px;
  span {
    display: block;
    color: #1e6fb9;
  }
}
.delivery__time,
.delivery__address {
  font-size: 12px;
  line-height: 13px;
}
.delivery__time {
  font-weight: 600;
  color: #313113;
  margin-bottom: 3px;
}
.delivery__address {
  color: #949494;
}
</style>
