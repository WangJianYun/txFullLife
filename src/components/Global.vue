<script type="text/javascript">

export default {
  install (Vue, options) {
    const pageSize = 5
    Vue.prototype.preSetPageSize = pageSize

    const whether = [
      { state: true, type: '是' },
      { state: false, type: '否' }
    ]
    Vue.prototype.whether = whether
  }
}

</script>
<style>
</style>
