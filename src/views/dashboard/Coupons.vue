<template>
    <div class="coupons">
      <Loading :active.sync="isLoading" />
      <h2 class="pt-3 text-center">優惠券</h2>
      <div class="d-flex justify-content-end">
        <div type="button" class="btn btn-primary mb-3"
        @click="openCouponModal('create')">
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
                    <td >{{ key+1 }}</td>
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
                              <input type="text" class="form-control"
                                id="textInputTitle" v-model="tempCoupon.title">
                          </div>
                          <div class="form-group">
                              <label for="textInputCode" class="mb-1">優惠碼</label>
                              <input type="text" class="form-control"
                              id="textInputCode" v-model="tempCoupon.code">
                          </div>
                          <div class="form-group">
                              <label for="expiryDate">到期日</label>
                              <input type="date" class="form-control"
                              id="expiryDate" v-model="due_date" >
                          </div>
                          <div class="form-group">
                              <label for="expiryTime">到期時間</label>
                              <input type="time" class="form-control"
                              id="expiryTime" v-model="due_time">
                          </div>
                          <div class="form-group">
                              <label for="inputPercent">折扣百分比</label>
                              <input type="num" class="form-control"
                              id="inputPercent"  v-model="tempCoupon.percent">
                          </div>
                          <div class="form-group form-check">
                              <input type="checkbox" class="form-check-input"
                              id="checkEnabled"
                              v-model="tempCoupon.enabled">
                              <label class="form-check-label"
                              for="checkEnabled">是否啟用</label>
                          </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary"
                            data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary"
                            @click="updateCoupon">
                              {{ status === 'create' ? '新增優惠卷' : '更新優惠券' }}
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
                      是否刪除 {{ tempCoupon.title }} (刪除後將無法恢復)。
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
        deadline_at: 0,
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
      this.status = action;
      switch (action) {
        case 'create':// 新增
          this.tempCoupon = {};
          $('#couponModal').modal('show');
          break;
        case 'edit': { // 編輯
          this.tempCoupon = { ...item };// 淺拷貝
          // 用 split 來處理時間
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = dedlineAt; // 日期-用解構來給值

          $('#couponModal').modal('show');
          break;
        }
        case 'delete':// 刪除
          this.tempCoupon = { ...item };// 淺拷貝
          $('#delCouponModal').modal('show');
          break;
        default:
          break;
      }
    },
    updateCoupon() {
      // 用status狀態來判斷是新增(post)還是編輯(patch)
      // POST api/{uuid}/admin/ec/coupon
      // PATCH api/{uuid}/admin/ec/coupon/{id}
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      const editUrl = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
      // deadline_at 要符合 Y-m-d H:i:s 的格式例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      if (this.status === 'create') {
        this.$http.post(url, this.tempCoupon).then(() => {
          $('#couponModal').modal('hide');
          this.$bus.$emit('message:push',
            '完成新增優惠券 ',
            'success');
          this.getCoupons();
          this.isLoading = false;
        });
      } else {
        this.$http.patch(editUrl, this.tempCoupon)
          .then(() => {
            $('#couponModal').modal('hide');
            this.$bus.$emit('message:push',
              '完成編輯優惠券資訊 ',
              'success');
            this.getCoupons();
            this.isLoading = false;
          });
      }
    },
    deleteCoupon() {
      this.isLoading = true;
      // DELETE api/{uuid}/admin/ec/coupon/{id}
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;

      this.$http.delete(url).then(() => {
        $('#deleteCouponModal').modal('hide');
        this.$bus.$emit('message:push',
          '刪除優惠券',
          'success');
        this.getCoupons();
        this.isLoading = false;
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
        $('#deleteCouponModal').modal('hide');
        this.$bus.$emit('message:push',
          '刪除失敗，請找工程師XD',
          'warning');
        this.isLoading = false;
      });
    },

  },
};

</script>
