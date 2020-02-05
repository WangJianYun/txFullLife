<template>
    <div id="yhCostMap">
      <span style="display:inline-block;margin-bottom:20px;">>> 历年费用收支详情</span>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" size="small">新增</el-button>
          <el-button type="primary"  size="small">批量删除</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          资产类别
          <el-select v-model="zclb" placeholder="请选择">
            <el-option
              v-for="item in zclbs"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          养护工程
          起点桩号
          终点桩号
          自
          至
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style>

</style >
