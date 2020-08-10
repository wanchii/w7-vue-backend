<template>
    <div class="orders">
        <Loading :active.sync="isLoading" />
        <h2 class="py-3 text-center">訂單列表</h2>

        <!-- 表格 -->
        <table class="table product">
            <thead class="font-weight-bold">
                <tr>
                    <th scope="col">下單時間</th>
                    <th scope="col">購買款項</th>
                    <th scope="col">付款方式</th>
                    <th scope="col">應付金額</th>
                    <th scope="col">是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in orders" :key="key"
                :class="{'text-secondary': !item.is_paid}">
                        <td>{{item.created.datetime}}</td>
                        <td>
                            <!-- <ul class="list-unstyled">
                                <li
                                    v-for="(product, i) in item.products"
                                    :key="i"
                                    >
                                    {{ product.product.title }}
                                    數量：{{ product.quantity }}
                                    {{ product.product.unit }}
                                </li>
                            </ul> -->
                        </td>
                        <td >{{ item.payment }}</td>
                        <td class="text-right">{{ item.amount }}</td>
                        <td>
                            <!-- <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input"
                                id="customSwitch1">
                                <label class="custom-control-label" for="customSwitch1">已付款</label>
                            </div> -->
                            <span class="text-success" v-if="item.paid">已付款</span>
                            <span class="text-secondary" v-else >未付款</span>
                        </td>

                </tr>
            </tbody>
        </table>
        <!-- 頁碼 -->
        <pagination :pages="pagination" @update="getOrders"></pagination>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: {
        user: {},
      },
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      // GET api/{uuid}/admin/ec/orders
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;
      this.$http.get(url)
        .then((response) => {
        // eslint-disable-next-line no-console
          console.log(response.data);
          this.orders = response.data.data;
          this.pagination = response.data.meta.pagination;
          // eslint-disable-next-line no-console
          console.log(this.orders.created);

          this.isLoading = false;
        });
    },
  },
};
</script>
