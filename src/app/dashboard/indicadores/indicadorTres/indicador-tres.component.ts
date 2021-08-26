import { Component, OnInit, Inject, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Chart } from "chart.js";
import * as echarts from 'echarts';
import 'chartjs-plugin-style';
import 'chartjs-plugin-zoom';
import 'chartjs-plugin-annotation';
import 'chartjs-plugin-draggable';
import 'chartjs-adapter-moment';
import * as moment from 'moment';
import 'moment/locale/es-mx';
import 'hammerjs';
import * as Vivus from 'vivus';
declare var $: any;
declare const initSidebar: any;
declare const initFlip: any;

@Component({
  selector: 'app-indicador-tres',
  templateUrl: './indicador-tres.component.html',
  styles: [
  ]
})
export class IndicadorTresComponent implements OnInit {

  chart: any;

  datosReportOne = [
    {
      Nombre_curso: 'Habilidades Personales e Inserción Laboral',
      Promedio_numero_personas: '48',
      Promedio_asistencia_personas: '19.91',
      Porcentaje_asistencia: '48.48',
    },
    {
      Nombre_curso: 'Fundamentos de Programación Inglés',
      Promedio_numero_personas: '48',
      Promedio_asistencia_personas: '19.91',
      Porcentaje_asistencia: '48.48',
    },
    {
      Nombre_curso: 'Programadores Mentalmente Saludables Ciclo1 ',
      Promedio_numero_personas: '48',
      Promedio_asistencia_personas: '19.91',
      Porcentaje_asistencia: '48.48',
    }
  ];

  windowScrolled: boolean;
  Vivus: any;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener("window:scroll")
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
        this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
          new Vivus('icono_leads',{
            duration: 50,
            reverse: true,
            dashGap: 20
          },).reset();
          new Vivus('icono_customers',{
            duration: 50,
            reverse: true,
            dashGap: 20
          },).reset();
          new Vivus('icono_register',{
            duration: 50,
            reverse: true,
            dashGap: 20
          },).reset();
          new Vivus('icono_gender',{
            duration: 50,
            reverse: true,
            dashGap: 20
          },).reset();
      }
  }

  ngOnInit(): void {
    initFlip();
    this.initVivus();
    this.initializerOdometer();
    this.chartQuestionOne();
  }

  initVivus() {
    new Vivus('icono_leads',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_customers',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_register',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_gender',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
  }

  initializerOdometer() {
    setTimeout(function () {
      $('.resultActivityOne').html('9');
      $('.resultActivityTwo').html('16 ');
      $('.resultActivityThree').html('0');
    }, 200);
  }

  chartQuestionOne() {

    let pathSymbols = {
        male: 'path://M7.938,8.13c0.09,0.414,0.228,0.682,0.389,0.849c0.383,2.666,2.776,4.938,4.698,4.843 c2.445-0.12,4.178-2.755,4.567-4.843c0.161-0.166,0.316-0.521,0.409-0.938c0.104-0.479,0.216-1.201-0.072-1.583    c-0.017-0.02-0.127-0.121-0.146-0.138c0.275-0.992,0.879-2.762-0.625-4.353c-0.815-0.862-1.947-1.295-2.97-1.637    c-3.02-1.009-5.152,0.406-6.136,2.759C7.981,3.256,7.522,4.313,8.078,6.32C8.024,6.356,7.975,6.402,7.934,6.458    C7.645,6.839,7.833,7.651,7.938,8.13z M23.557,22.792c-0.084-1.835-0.188-4.743-1.791-7.122c0,0-0.457-0.623-1.541-1.037    c0,0-2.354-0.717-3.438-1.492l-0.495,0.339l0.055,3.218l-2.972,7.934c-0.065,0.174-0.231,0.289-0.416,0.289    s-0.351-0.115-0.416-0.289l-2.971-7.934c0,0,0.055-3.208,0.054-3.218c0.007,0.027-0.496-0.339-0.496-0.339    c-1.082,0.775-3.437,1.492-3.437,1.492c-1.084,0.414-1.541,1.037-1.541,1.037c-1.602,2.379-1.708,5.287-1.792,7.122    c-0.058,1.268,0.208,1.741,0.542,1.876c4.146,1.664,15.965,1.664,20.112,0C23.35,24.534,23.614,24.06,23.557,22.792z M13.065,14.847l-0.134,0.003c-0.432,0-0.868-0.084-1.296-0.232l1.178,1.803l-1.057,1.02    l1.088,6.607c0.009,0.057,0.058,0.098,0.116,0.098c0.057,0,0.106-0.041,0.116-0.098l1.088-6.607l-1.058-1.02l1.161-1.776    C13.888,14.756,13.487,14.83,13.065,14.847z',
        female: 'path://M300.506,309.912L300.506,309.912v-20.5c0,0,64.6,2,95.3-29.3c0,0-44.6-12.6-36.6-93.9c8-81.2-10-152.5-75.3-146.5    c0,0-28.3-34.1-84.6-12.6c-19.3,7.4-71.2,25.9-68.6,138.5c2.6,112.5-40,113.2-40,113.2s22,32,96.6,31.3v21l56.7,165.6l56.6-165.3    L300.506,309.912z M452.806,479.112l-11.4-63c-3.7-20.4-16.9-37.9-35.5-47.1l-71.4-35.2c-4.1-2-8.1-4.3-12.1-6.5l22.5,66.4l-31.5-2.4    l-69.4,85.4l-69.4-85.4l-31.5,2.4l23-66.4l-14.3,7.3l-69.7,34.4c-18.6,9.2-31.8,26.7-35.5,47.1l-11.4,63c-0.8,4.6,2.7,8.9,7.4,8.9    h198.7h5.2h198.7C450.106,488.012,453.606,483.712,452.806,479.112z'
    };

    let chartQuestionOne = echarts.init(document.getElementById('chart-question-one'));
    let chartTwoQuestionOne = echarts.init(document.getElementById('chart-two-question-one'));
    let optionChartOne;
    let optionChartTwo;

      optionChartOne = {
        color: ["#1D244A", "#ef2469"],
        legend: {
          data: ['Hombres', 'Mujeres'],
          textStyle: {
            color: '#212121',
            fontSize: 13,
            lineHeight:10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          },
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          backgroundColor: '#FFFFFF',
          padding: 5,
          textStyle: {
            color: '#212121',
            fontSize: 13,
            lineHeight:10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          },
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
        },
        xAxis: {
          splitLine: {show: false},
          axisLabel: {show: false},
          axisTick: {show: false},
          axisLine: {show: false}
        },
        yAxis: {
          data: ['Genero'],
          inverse: true,
          axisLine: {show: false},
          axisTick: {show: false},
          axisLabel: {
            margin: 30,
            fontSize: 14,
            color: '#212121',
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          },
          axisPointer: {
            label: {
                show: true,
                margin: 30
            }
          }
        },
        grid: [
          {
            containLabel: true,
            left: 20
          }
        ],
        series: [{
          name: 'Hombres',
          type: 'pictorialBar',
          label: {
            color: '#212121',
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light',
            position: 'right',
            offset: [10, 0],
            show: true
          },
          symbolRepeat: true,
          symbolSize: ['65%', '80%'],
          barCategoryGap: '70%',
          data: [{
              value: 157,
              symbol: pathSymbols.male
          }],
          animationDelay: function (idx) {
            return idx * 15;
          }
      }, {
        name: 'Mujeres',
        type: 'pictorialBar',
        barGap: '10%',
        label: {
          color: '#212121',
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light',
          position: 'right',
          offset: [10, 0],
          show: true
        },
        symbolRepeat: true,
        symbolSize: ['65%', '80%'],
        data: [{
            value: 184,
            symbol: pathSymbols.female
        }],
        animationDelay: function (idx) {
          return idx * 15;
        }
      }]
    };

    optionChartTwo = {
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        backgroundColor: '#FFFFFF',
        padding: 5,
        textStyle: {
          color: '#212121',
          fontSize: 13,
          lineHeight:10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light'
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
      },
      toolbox: {
          show: true,
          feature: {
              mark: {show: true},
              dataView: {show: false, readOnly: false},
              restore: {show: false},
              saveAsImage: {show: false}
          }
      },
      visualMap: {
          top: 'middle',
          right: -5,
          max:40,
          min:28,
          text: ['Maximo', 'Minimo'],
          inRange: {
              color: ['#9AC331', '#FFDA00', 'rgb(239, 36, 105)']
          },
          textStyle: {
            color: '#212121',
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
      },
      series: [
          {
            name: 'Dato',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            hoverOffset: 12,
            emphasis: {
                label: {
                    show: true
                }
            },
            label: {
              normal: {
                show: true,
                fontSize: 12,
                fontWeight: 'bold',
                fontFamily: 'Roboto-Light'
              },
              emphasis: {
                show: true,
                fontSize: 12,
                fontWeight: 'bold',
                fontFamily: 'Roboto-Light'
              }
            },
            lableLine: {
              normal: {
                show: false,
                fontSize: 12,
                fontWeight: 'bold',
                fontFamily: 'Roboto-Light'
              },
              emphasis: {
                show: true,
                fontSize: 12,
                fontWeight: 'bold',
                fontFamily: 'Roboto-Light'
              }
            },
            itemStyle: {
              borderRadius: 8,
              normal: {
                  opacity: 1,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0
              }
            },
            data: [
                {value: 40, name: 'Mon'},
                {value: 38, name: 'Tue'},
                {value: 32, name: 'Wed'},
                {value: 30, name: 'Thu'},
                {value: 28, name: 'Fri'}
            ],
            animationDelay: function (idx) {
              return idx * 15;
            }
          }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
          return idx * 5;
      }
  };

    optionChartOne && chartQuestionOne.setOption(optionChartOne);
    optionChartTwo && chartTwoQuestionOne.setOption(optionChartTwo);

    $(window).on('resize', function(){
        if(chartQuestionOne != null && chartQuestionOne != undefined){
            chartQuestionOne.resize();
        }
    });

    $(window).on('resize', function(){
        if(chartTwoQuestionOne != null && chartTwoQuestionOne != undefined){
            chartTwoQuestionOne.resize();
        }
    });

  }
}
