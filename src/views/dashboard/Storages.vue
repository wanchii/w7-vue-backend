<template>
    <div class="coupons">
        <Loading :active.sync="isLoading" />
        <h2 class="py-3 text-center">圖片列表</h2>
        <!-- 表格 -->
        <table class="table product">
            <thead class="font-weight-bold">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">縮圖</th>
                    <th scope="col">路徑</th>
                    <th scope="col">功能</th>
                </tr>
            </thead>
            <tbody v-if="storages.length">
                <tr v-for="(item, key) in storages" :key="key">
                    <td class="align-middle">{{ key+1 }}</td>
                    <td>
                      <img
                        :src="item.path"
                        width="200px"
                        class="img-fluid"
                      >
                    </td>
                    <td class="align-middle">
                      <div class="input-group">
                          <input type="text" class="form-control"
                            aria-describedby="button-addon2"
                            v-model="item.path">
                          <div class="input-group-append">
                            <button class="btn btn-outline-primary" type="button"
                            id="button-addon2"
                            v-clipboard:copy="item.path"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            >
                            取得網址
                            </button>
                          </div>
                      </div>
                    </td>
                    <td class="align-middle">
                        <button button type="button" class="btn btn-outline-danger"
                          @click="openModel(item)"
                          >刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 頁碼 -->
        <pagination :pages="pagination" @update="getStorages"></pagination>
        <!-- 刪除 Modal -->
        <div class="modal fade" id="delModal"
          tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header bg-danger">
                      <h5 class="modal-title" id="exampleModalLabel">刪除圖片</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      是否刪除  (刪除後將無法恢復)。
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-outline-secondary"
                      data-dismiss="modal">取消</button>
                      <button type="button" class="btn btn-danger"
                      @click="deleteData">確認刪除</button>
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
      storages: {},
      tempStorage: {},
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  created() {
    this.getStorages();
  },
  methods: {
    getStorages(pages = 1) {
      this.isLoading = true;
      // GET api/{uuid}/admin/storage
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage?page=${pages}`;
      this.$http.get(url).then((response) => {
        this.storages = response.data.data;
        this.pagination = response.data.meta.pagination;
        this.isLoading = false;
      });
    },
    openModel(item) {
      this.tempStorage = { ...item };// 淺拷貝
      $('#delModal').modal('show');
    },
    deleteData() {
      this.isLoading = true;
      // DELETE api/{uuid}/admin/storage/{id}
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage/${this.tempStorage.id}`;
      this.$http.delete(url).then(() => {
        $('#deleteModal').modal('hide');
        this.$bus.$emit('message:push',
          '刪除成功',
          'success');
        this.isLoading = false;
        this.getStorages();
      });
    },
    getPath() {
      this.$copyText(this.storages.path).then(() => {
        this.$bus.$emit('message:push',
          '已複製網址',
          'success');
      }, () => {
        this.$bus.$emit('message:push',
          '出現錯誤，請確認',
          'danger');
      });
    },
    onCopy() {
      this.$bus.$emit('message:push',
        '已複製網址',
        'success');
    },
    onError() {
      this.$bus.$emit('message:push',
        '出現錯誤，請確認',
        'danger');
    },
  },
};
</script>
