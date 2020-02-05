<template>
    <div id="assets">
        <el-row>
        <div id="markerMap">
            <div class="amap-wrapper">
            <el-amap class="amap-box" vid="map"
                :zoom="zoom"
                :center="center">
                <el-amap-marker vid="marker"
                v-for="marker in markers"
                :key="marker.id"
                :icon="marker.icon"
                :position="marker.center"
                :label="marker.label"
                >
                </el-amap-marker>
            </el-amap>
            </div>
        </div>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      zoom: 10,
      center: [108.860159, 34.978],
      markers: [{ id: '', icon: '', position: [], label: { content: '', offset: [] } }]
    }
  }
}
</script>

<style scoped>
</style>
