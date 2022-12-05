
import Mock from 'mockjs'

export default [
  {
    url: 'svr/bugstat/report_count_daily/',
    type: 'get',
    response: () => {
      return Mock.mock({
        code: 0,
        msg: 'succ',
        data: [
          {
            day: '2022-11-21',
            'per_day|100-1000': 1000
          },
          {
            day: '2022-11-22',
            'per_day|100-1000': 1000
          },
          {
            day: '2022-11-23',
            'per_day|100-1000': 1000
          },
          {
            day: '2022-11-24',
            'per_day|100-1000': 1000
          },
          {
            day: '2022-11-25',
            'per_day|100-1000': 1000
          },
          {
            day: '2022-11-26',
            'per_day|100-1000': 1000
          }
        ]
      })
    }
  },
  {
    url: 'svr/bugstat/version_list',
    type: 'get',
    response: () => {
      return Mock.mock({
        code: 0,
        msg: 'succ',
        data: [
          {
            app_business_version: '20221111102157',
            app_version: '3.7.0'
          },
          {
            app_business_version: '20221111102158',
            app_version: '3.7.0'
          },
          {
            app_business_version: '20221211102157',
            app_version: '3.8.0'
          },
          {
            app_business_version: '20221229102157',
            app_version: '3.8.1'
          }
        ]
      })
    }
  },
  {
    url: 'svr/bugstat/bug_list/',
    type: 'get',
    response: () => {
      return Mock.mock({
        code: 0,
        msg: 'succ',
        data: [
          {
            'bug_count|100-1000': 100,
            bug_err_md5: '4djf7h6ccaddd2134y838njdsjrhjsdf',
            bug_err_txt: 'unhandleRejectedPromise'
          },
          {
            'bug_count|100-1000': 100,
            bug_err_md5: '4djf7h6ccaddd2134y838njdsjrhjsdf',
            bug_err_txt: 'unhandleRejectedPromise'
          },
          {
            'bug_count|100-1000': 100,
            bug_err_md5: '4djf7h6ccaddd2134y838njdsjrhjsdf',
            bug_err_txt: 'unhandleRejectedPromise'
          },
          {
            'bug_count|100-1000': 100,
            bug_err_md5: '4djf7h6ccaddd2134y838njdsjrhjsdf',
            bug_err_txt: 'unhandleRejectedPromise'
          },
          {
            'bug_count|100-1000': 100,
            bug_err_md5: '4djf7h6ccaddd2134y838njdsjrhjsdf',
            bug_err_txt: 'unhandleRejectedPromise'
          }
        ]
      })
    }
  }
]
