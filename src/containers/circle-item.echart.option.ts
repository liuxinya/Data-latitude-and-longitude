import { percentageTransformer } from "../pipes/percentage";

export function generateCircleItemOption(value: number) {
    let perentValue = Math.abs(value * 100);
    return  {
        legend: {
          show: false
        },
        tooltip: {
          show: false,
          trigger: 'none'
        },
        series: [
          {
            type: 'pie',
            hoverAnimation: false,
            startAngle: 180,
            radius: [
              '84%', '100%'
            ],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: perentValue,
                name: percentageTransformer(value),
                itemStyle: {
                  normal: {
                    color: value > 0 ? '#55A0F5' : '#D03869'
                  },
                  emphasis: {
                    color: value > 0 ? '#55A0F5' : '#D03869'
                  }
                },
                label: {
                  normal: {
                    show: true,
                    color: 'white',
                    fontWeight: 'bold'
                  },
                  emphasis: {
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }
              }, {
                value: 100 - perentValue,
                name: '邮件营销',
                itemStyle: {
                  normal: {
                    color: 'white'
                  }
                },
                label: {
                  normal: {
                    show: false,
                  }
                }
              }
            ]
          }
        ]
      };
}