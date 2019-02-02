 <template>
  <div class="amap-page-container">
    <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
    ></el-amap>
    <el-dialog title="分析" :visible.sync="dialogTableVisible">
      <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
    </el-dialog>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()

export default {
  methods: {
    async getData () {
      const { data } = await this.axios.get(
        `http://api.data-center-service.top:8080/eleme/shops/falvors?latitude=${
          this.latitude
        }&longitude=${this.longitude}`
      )
      if (data.length === 0) {
        alert('该区域暂未收录, 等待后台服务录入')
      } else {
        this.chartData.rows = data.map(item => {
          return {
            店铺类型: item.flavorName,
            区域内数量: item.count
          }
        })
        this.dialogTableVisible = true
      }
    }
  },
  data: function () {
    return {
      latitude: 0,
      longitude: 0,
      amapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {
        init: () => {},
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          this.longitude = e.lnglat.O
          this.latitude = e.lnglat.P
          this.getData()
        }
      },
      plugin: [],
      chartData: {
        columns: ['店铺类型', '区域内数量'],
        rows: []
      },
      chartSettings: {
        dataOrder: {
          label: '区域内数量',
          order: 'desc'
        }
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>

<style scoped>
.amap-demo {
  height: 500px;
}
</style>
