<template>
    <div class="coupons">
    <h2 class="pt-3 text-center">優惠券</h2>
    <div class="d-flex justify-content-end">
        <div type="button" class="btn btn-primary mb-3"  >建立優惠券</div>
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
            <tbody>
                <tr >
                    <td></td>
                        <td></td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td>
                            <span class="text-success" >啟用</span>
                            <span class="text-secondary" >未啟用</span>
                        </td>
                        <td>
                            <div class="btn-group btn-group-sm" role="group" aria-label="Basic">
                                <button type="button" class="btn btn-outline-primary"
                                >編輯</button>
                                <button button type="button" class="btn btn-outline-danger"
                                >刪除</button>
                            </div>
                        </td>
                </tr>
            </tbody>
        </table>
        <!-- 頁碼 -->
        <pagination :pages="pagination" @update="getProducts"></pagination>

    </div>
</template>
<script>

</script>
