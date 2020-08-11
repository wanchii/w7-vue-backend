<template>
    <div class="coupons">
    <h2 class="pt-3 text-center">優惠券</h2>
    <div class="d-flex justify-content-end">
        <div type="button" class="btn btn-primary mb-3"
        @click="open">
        建立優惠券
        </div>
    </div>
        <!-- 表格 -->
        <table class="table product">
            <thead class="font-weight-bold">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">名稱</th>
                    <th scope="col">折扣百分比</th>
                    <th scope="col">到期日</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col">編輯</th>
                </tr>
            </thead>
            <tbody v-if="coupons.length">
                <tr v-for="(item, key) in coupons" :key="key">
                    <td v-for="(num, i) in 25" :key="i">{{ i }}</td>
                    <td>{{ item.title}}</td>
                    <td>{{ item.percent }}</td>
                    <td>{{ item.deadline.datetime }}</td>
                    <td>
                        <span class="text-success"  v-if="item.enabled">啟用</span>
                        <span class="text-secondary" v-else>未啟用</span>
                    </td>
                    <td>
                      <div class="btn-group btn-group-sm" role="group" aria-label="Basic">
                          <button type="button" class="btn btn-outline-primary"
                          @click="openCouponModal('edit', item)"
                          >編輯</button>
                          <button button type="button" class="btn btn-outline-danger"
                          @click="openCouponModal('delete', item)"
                          >刪除</button>
                      </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 頁碼 -->
        <pagination :pages="pagination" @update="getCoupons"></pagination>
        <!-- 新增/編輯modal -->
        <div class="modal fade" id="couponModal"
          tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
            <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-secondary text-white">
                            <h5 class="modal-title">新增/編輯 優惠券</h5>
                            <button type="button"
                            class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group">
                              <label for="textInputTitle" class="mb-1">標題</label>
                              <input type="text" class="form-control" id="textInputTitle">
                          </div>
                          <div class="form-group">
                              <label for="textInputCode" class="mb-1">優惠碼</label>
                              <input type="text" class="form-control" id="textInputCode">
                          </div>
                          <div class="form-group">
                              <label for="expiryDate">到期日</label>
                              <input type="date" class="form-control" id="expiryDate" >
                          </div>
                          <div class="form-group">
                              <label for="expiryTime">到期時間</label>
                              <input type="time" class="form-control" id="expiryTime" >
                          </div>
                          <div class="form-group">
                              <label for="inputPercent">折扣百分比</label>
                              <input type="num" class="form-control" id="inputPercent" >
                          </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary"
                            data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary"
                            @click="updateCoupon">
                              {{ status === 'created' ? '新增優惠卷' : '更新優惠券' }}
                            </button>
                        </div>
                    </div>
            </div>
        </div>
        <!-- 刪除 Modal -->
        <div class="modal fade" id="delCouponModal"
          tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header bg-danger">
                      <h5 class="modal-title" id="exampleModalLabel">刪除優惠券</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      是否刪除 優惠券名稱(刪除後將無法恢復)。
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-outline-secondary"
                      data-dismiss="modal">取消</button>
                      <button type="button" class="btn btn-danger"
                      @click="deleteCoupon">確認刪除</button>
                  </div>
              </div>
            </div>
        </div>

    </div>
</template>
<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      coupons: {
      },
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 10,
        deadline_at: 0,
        code: '',
      },
      due_date: '',
      due_time: '',
      status: '',
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons(pages = 1) {
      // GET api/{uuid}/admin/ec/coupons
      this.isLoading = true;

      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${pages}`;

      this.$http.get(url).then((response) => {
        this.coupons = response.data.data;
        this.pagination = response.data.meta.pagination;
        this.isLoading = false;
      });
    },
    openCouponModal(action, item) {
      switch (action) {
        case 'create':
          this.tempCoupon = {
            title: '',
            code: '',
            percent: 0,
            enabled: false,
            deadline_at: 0,
          };
          $('#couponModal').modal('show');
          break;
        case 'edit': // 編輯
          $('#couponModal').modal('show');
          break;
        case 'delete':// 刪除
          this.tempCoupon = { ...item };
          $('#delCouponModal').modal('show');
          break;
        default:
          break;
      }
    },
    updateCoupon() {
      // POST api/{uuid}/admin/ec/coupon
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      this.$http.post(url).then(() => {
        this.getCoupons();
        $('#couponModal').modal('hide');
        this.isLoading = false;
      });
    },
    deleteCoupon() {
      this.isLoading = true;
      // DELETE api/{uuid}/admin/ec/coupon/{id}
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempCoupon.id}`;

      this.$http.delete(url).then(() => {
        this.getCoupons();
        this.isLoading = false;
        this.$bus.$emit('message:push',
          '刪除優惠券',
          'success');
        $('#deleteCouponModal').modal('hide');
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        this.$bus.$emit('message:push',
          '刪除失敗，請找工程師XD',
          'warning');
        this.isLoading = false;
      });
    },
    open() {
      $('#couponModal').modal('show');
    },
  },
};

</script>
