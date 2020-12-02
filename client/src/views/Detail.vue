<template>
  <div class="detail">
    <div class="back">
      <router-link to="/">Назад</router-link>
    </div>
    <OrderHeader :order="this.order" />
    <div class="deliveries">
      <div class="deliveries__title">
        Доставки
      </div>
      <div class="deliveries__list">
        <Delivery
          v-for="delivery in futureDelivery"
          :key="delivery.id"
          :delivery="delivery"
        />
      </div>
    </div>
    <div class="actions__list">
      <div class="actions__item" @click="dublicate">
        <span>Дублировать заказ</span>
        <img src="@/assets/clone.svg/" />
      </div>
      <div class="actions__item" @click="cancel">
        <span>Отменить заказ</span>
        <img src="@/assets/delete.svg/" />
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader.vue";
import Delivery from "@/components/Delivery.vue";
import { filterDeliveries } from "@/helpers/date.js";

export default {
  name: "OrderCard",
  components: {
    OrderHeader,
    Delivery
  },
  data: function() {
    return {
      id: this.$route.params["id"]
    };
  },
  computed: {
    order() {
      return this.$store.state.orderDetail;
    },
    futureDelivery() {
      return filterDeliveries(this.$store.state.orderDetail.deliveries);
    }
  },
  methods: {
    dublicate: function() {
      this.$store.commit("statusLoading", true);
      this.$store.dispatch("duplicateOrder", this.$store.state.orderDetail);
    },
    cancel: function() {
      if (!this.$store.state.loading) {
        if (!this.$store.state.orderDetail.readOnly) {
          this.$store.commit("statusLoading", true);
          this.$store.dispatch(
            "cancelOrder",
            this.$store.state.orderDetail._id
          );
        } else {
          this.$store.dispatch(
            "showMessage",
            "Данный заказ удалять запрещено!"
          );
        }
      }
    }
  },
  created: function() {
    if (this.$store.state.orders.length === 0) {
      this.$store.dispatch("getOrderById", this.id);
    } else {
      const detail = this.$store.state.orders.find(
        (order) => order.id == this.id
      );
      this.$store.commit("changeDetailOrder", detail);
    }
  }
};
</script>

<style lang="scss" scope>
.detail {
  .back {
    margin-bottom: 22px;
    a {
      font-size: 17px;
      line-height: 22px;
      text-decoration: none;
      color: #1e6fb9;
      &:active,
      :hover {
        color: #1e6fb9;
      }
    }
  }
}
.deliveries {
  margin: 50px 0;
}
.deliveries__title {
  color: #070707;
  font-size: 17px;
  line-height: 1;
  font-weight: 600;
  margin-bottom: 20px;
}
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
.actions__list {
  border-radius: 10px;
  background: #f5f5f5;
}
.actions__item {
  display: flex;
  align-items: center;
  color: #3f3f3f;
  justify-content: space-between;
  border-bottom: 1px solid #d6d6d6;
  padding: 15px;
  &:last-child {
    border-bottom: none;
  }
}
</style>
