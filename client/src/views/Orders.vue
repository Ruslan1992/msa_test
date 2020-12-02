<template>
  <div class="orders">
    <div class="title">
      <h1>Мои заказы</h1>
      <span>{{ orders.length }}</span>
    </div>
    <div class="orders__list">
      <OrderCard v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import OrderCard from "@/components/OrderCard.vue";

export default {
  name: "Orders",
  components: {
    OrderCard
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },
  created: function() {
    this.$store.dispatch("getOrders");
  }
};
</script>

<style lang="scss" scope>
.title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  h1 {
    margin: 0 10px 0 0;
    color: #252525;
    font-size: 22px;
    line-height: 26.25px;
    letter-spacing: 0.3px;
  }
  span {
    font-size: 20px;
    color: #929292;
    line-height: 16px;
  }
}
</style>
