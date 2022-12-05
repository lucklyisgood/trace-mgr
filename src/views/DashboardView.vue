<template>
  <div>
    <v-chart
      class="chart"
      :option="option"
    />
  </div>
</template>

<script setup lang="ts">
import { AxiosResponse, AxiosError } from 'axios'
import { ref, onBeforeMount, getCurrentInstance } from 'vue'

const proxy = getCurrentInstance()?.proxy

// const router = useRouter()

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  xAxis: {
    type: 'category',
    // axisTick: {
    //   alignWithLabel: true
    // },
    data: [] as string[]
  },
  yAxis: {
    type: 'value',
    name: '上传次数'
  },
  series: [
    {
      type: 'line',
      name: '上传次数',
      // smooth: true,
      data: [] as number[]
    }
  ]
})

onBeforeMount(() => {
  const t = new Date()
  const endDay = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`
  t.setDate(t.getDate() - 6)
  const startDay = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`
  proxy &&
    proxy.$http
      .get(`svr/bugstat/report_count_daily/${startDay}/${endDay}`)
      .then(function (resp: AxiosResponse<{code: number, msg: string, data: unknown}>) {
        console.log(resp)
        // eslint-disable-next-line camelcase
        const d = resp.data.data as Array<{ day: string; per_day: number }>
        const xAxisData: string[] = []
        const seriesData: number[] = []
        d.forEach((v) => {
          xAxisData.push(v.day)
          // eslint-disable-line camelcase
          seriesData.push(v.per_day)
        })
        option.value.xAxis.data = xAxisData
        option.value.series[0].data = seriesData
      })
      .catch(function (e: AxiosError) {
        console.log('页面数据拉取失败: ', e)
      })
})
</script>

<style scoped lang="scss">
.chart {
  height: 400px;
}
</style>
