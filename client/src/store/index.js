import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orders: [],
    orderDetail: {},
    loading: true,
    message: null
  },
  mutations: {
    changeOrders: (state, payload) => {
      state.orders = payload
    },
    changeDetailOrder: (state, payload) => {
      state.orderDetail = payload
    },    
    addOrder: (state, payload) => {
      state.orders.push(payload)
    },    
    removeOrder: (state, payload) => {      
      state.orders = state.orders.filter(order => order._id !== payload)
    },
    addMessage: (state, payload) => {      
      state.message = payload
    },
    removeMessage: (state) => {      
      state.message = null
    },
    statusLoading: (state, payload) => {      
      state.loading = payload
    },
  },
  actions: {
    getOrders: async (context) => {
      try{
        const response = await fetch('http://localhost:5000/getOrders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        });
        const data = await response.json();
        context.commit('changeOrders', data);    
        context.commit("statusLoading", false);
      }catch(e){
        console.log(e);
      }
    },
    
    getOrderById: async (context, payload) => {
      try{
        const response = await fetch(`http://localhost:5000/getOrders/${payload}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        });
        const data = await response.json();
        context.commit('changeDetailOrder', data);    
        context.commit("statusLoading", false);
      }catch(e){
        console.log(e);
      }
    },    
    duplicateOrder: async (context, payload) => {
      try{
        const payloadData = {
          packageName: payload.packageName,
          packageCalories: payload.packageCalories,
          deliveries:[
            {
              interval: payload.deliveries[0].interval,
              address: payload.deliveries[0].address,
            }
          ]
        }
        const response = await fetch('http://localhost:5000/duplicateOrder/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(payloadData)
        });
        const data = await response.json();        
        context.commit('addOrder', data);
        router.push({ path: `/` });    
        context.commit("statusLoading", false);
        context.dispatch("showMessage", "Заказ успешно дублирован");
      }catch(e){
        console.log(e);
      }
    },
    cancelOrder: async (context, payload) => {
      try{
        await fetch('http://localhost:5000/cancelOrder/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            id: payload
          })
        }); 
        router.push({ path: `/` })
        context.commit('removeOrder', payload);        
        context.commit("statusLoading", false);
        context.dispatch("showMessage", "Заказ успешно отменен");
      }catch(e){
        console.log(e);
      }
    },
    showMessage: (context, payload) => {      
      context.commit("addMessage", payload);
      setTimeout(() => {        
        context.commit("removeMessage");
      }, 3000)
    }
  },
  modules: {}
});
