<template>
  <div class="order__header">
    <div class="order__title">
      <div class="order__title_left">
        <div class="order__day">{{parseDate.passedDays}}</div>
      </div>
      <div class="order__title_right">
        <div class="order__name">
          {{ order.packageName }}
        </div>
        <div class="order__calories">
          {{ order.packageCalories }}
        </div>
      </div>
    </div>
    <div class="progress">
      <div class="progress__line">
        <div class="progress__line_inner" :style="progreeBar"></div>
      </div>
      <div class="progress__description">
        <div class="start">{{parseDate.startDate}}</div>
        <div class="remainder">{{parseDate.remainingDays}}</div>
        <div class="finish">{{parseDate.finishDate}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {toLocalDate, fixDay, filterDeliveries} from '@/helpers/date.js'

export default {
  name: "OrderHeader",
  props: ["order"],
  computed: {
    parseDate() {
      const order = this.order;
      const currentDate = Date.parse(new Date());
      const passedDays = Math.round((currentDate - Date.parse(order.startDate)) / 86400000);
      const remainingDays = Math.round((Date.parse(order.finishDate) - currentDate) / 86400000);
      
      return {
        startDate: toLocalDate(order.startDate),
        finishDate: toLocalDate(order.finishDate),
        passedDays: fixDay(passedDays + 1),
        remainingDays: 'осталось ' + fixDay(remainingDays - 1)
      }
    },
    progreeBar() {
      const order = this.order;
      if(order.deliveries && order.deliveries.length) {
        const progreeBarWidth = (order.deliveries.length - filterDeliveries(order.deliveries).length) / order.deliveries.length * 100;
        return {'width': '' + progreeBarWidth + '%'}
      }
      return {'width': 0}
    }
  }
};
</script>

<style lang="scss">
.order__title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 15px;
}
.order__day {
  font-size: 35px;
  line-height: 1;
  font-weight: 700;
}
.order__name {
  font-size: 9.75px;
  line-height: 1.6;
  color: #818181;
}
.order__calories {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: #000;
}
.progress {
  margin-bottom: 24px;
}
.progress__line {
  width: 100%;
  height: 6px;
  margin-bottom: 8px;
  border-radius: 4px;
  background: #e9e9e9;

  .progress__line_inner {
    position: relative;
    height: 100%;
    border-radius: 4px;
    background: #1e6fb9;
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      right: -1px;
      top: -1px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
  }
}
.progress__description {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  line-height: 1;
  .start,
  .finish {
    color: #9e9e9e;
  }
  .remainder {
    font-weight: 600;
  }
}
</style>
