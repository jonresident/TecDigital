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
  selector: 'app-indicador-uno',
  templateUrl: './indicador-uno.component.html',
  styles: [
  ]
})
export class IndicadorUnoComponent implements OnInit {

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
    },
    {
      Nombre_curso: 'Programadores Mentalmente Saludables Ciclo1 ',
      Promedio_numero_personas: '48',
      Promedio_asistencia_personas: '19.91',
      Porcentaje_asistencia: '48.48',
    },
    {
      Nombre_curso: 'Programadores Mentalmente Saludables Ciclo1 ',
      Promedio_numero_personas: '48',
      Promedio_asistencia_personas: '19.91',
      Porcentaje_asistencia: '48.48',
    },
    {
      Nombre_curso: 'Programadores Mentalmente Saludables Ciclo1 ',
      Promedio_numero_personas: '48',
      Promedio_asistencia_personas: '19.91',
      Porcentaje_asistencia: '48.48',
    },
    {
      Nombre_curso: 'Programadores Mentalmente Saludables Ciclo1 ',
      Promedio_numero_personas: '48',
      Promedio_asistencia_personas: '19.91',
      Porcentaje_asistencia: '48.48',
    },
    {
      Nombre_curso: 'Programadores Mentalmente Saludables Ciclo1 ',
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
        new Vivus('icono_business',{
          duration: 50,
          reverse: true,
          dashGap: 20
        },).reset();
        new Vivus('icono_diagnostico',{
          duration: 50,
          reverse: true,
          dashGap: 20
        },).reset();
        new Vivus('icono_mapeo',{
          duration: 50,
          reverse: true,
          dashGap: 20
        },).reset();
        new Vivus('icono_evaluacion',{
          duration: 50,
          reverse: true,
          dashGap: 20
        },).reset();
        new Vivus('icono_consolidacion',{
          duration: 50,
          reverse: true,
          dashGap: 20
        },).reset();
        new Vivus('icono_despegue',{
          duration: 50,
          reverse: true,
          dashGap: 20
        },).reset();
        new Vivus('icono_mapping_colombia',{
          duration: 50,
          reverse: true,
          dashGap: 20
        },).reset();
        new Vivus('icono_bar_1',{
          duration: 50,
          reverse: true,
          dashGap: 20
        },).reset();
        new Vivus('icono_bar_2',{
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
    this.chartQuestionTwo();
    this.chartQuestionThree();
  }

  initVivus() {
    new Vivus('icono_business',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_diagnostico',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_mapeo',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_evaluacion',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_consolidacion',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_despegue',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_mapping_colombia',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_bar_1',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_bar_2',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
  }

  initializerOdometer() {
    setTimeout(function () {
      $('.resultActivityOne').html('161');
      $('.resultActivityTwo').html('36');
      $('.resultActivityThree').html('18 ');
      $('.resultActivityFour').html('188 ');
      $('.resultActivityFive').html('158 ');
      $('.resultActivitySix').html('158 ');
    }, 200);
  }

  chartQuestionOne() {

    let chartQuestionOne = echarts.init(document.getElementById('chart-question-one'));
    let chartTwoQuestionOne = echarts.init(document.getElementById('chart-two-question-one'));
    let optionChartOne;
    let optionChartTwo;

    $.get('../../../../assets/data/COLOMBIADEP.json', function (colombiaJson) {
    chartQuestionOne.hideLoading();
      echarts.registerMap('COLOMBIA_DEP', colombiaJson, {});
      optionChartOne = {
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
              let value = (params.value + '').split('.');
              var nota_uno = (params.nota_uno + '').split('.');
              value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
              return params.seriesName + '<br/>' + params.name + ': ' + value;
            },
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
            left: '1.2%',
            top: '-1%',
            textStyle: {
              color: '#212121',
              fontSize: 12,
              fontWeight: 'bold',
              fontFamily: 'Roboto-Light'
            },
            feature: {
                mark: {show: true},
                dataView: {show: false, readOnly: false},
                restore: {
                  show: true,
                  title: 'restaurar',
                  iconStyle: {
                    borderColor: '#1D244A'
                  },
                  emphasis: {
                    borderColor: '#2a52bb'
                  }
                },
                saveAsImage: {show: false}
            }
          },
          visualMap: {
              top: 'middle',
              right: -5,
              max:53,
              min:0,
              text: ['Maximo', 'Minimo'],
              textStyle: {
                color: '#212121',
                fontSize: 12,
                fontWeight: 'bold',
                fontFamily: 'Roboto-Light'
              },
              inRange: {
                  color: ['#9AC331', '#FFDA00', 'rgb(239, 36, 105)']
              }
          },
          series: [
              {
                  type: 'map',
                  roam: true,
                  map: 'COLOMBIA_DEP',
                  emphasis: {
                    label: {
                        show: true
                    }
                  },
                  scaleLimit: {
                    min: 1,
                    max: 15,
                  },
                  aspectScale: 1,
                  zoom: 1.2,
                  top: '7%',
                  label: {
                    normal: {
                      show: false,
                      textStyle: {
                        color: '#FAFAFA',
                        fontSize: 10,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto-Light'
                      }
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        color: '#FAFAFA',
                        fontSize: 10,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto-Light'
                      }
                    }
                  },
                  itemStyle: {
                    borderColor: '#FAFAFA',
                    borderWidth: 1.3,
                    emphasis: {
                      areaColor: '#1D244A',
                      borderColor: '#FAFAFA',
                      borderWidth: 1.3
                    }
                  },
                  data:[
                    {name: 'ANTIOQUIA', value: 17},
                    {name: 'ATLANTICO', value: 1},
                    {name: 'SANTAFE DE BOGOTA D.C', value: 53},
                    {name: 'BOLIVAR', value: 3},
                    {name: 'BOYACA', value: 4},
                    {name: 'CALDAS', value: 18},
                    {name: 'CAUCA', value: 1},
                    {name: 'CESAR', value: 3},
                    {name: 'CUNDINAMARCA', value: 15},
                    {name: 'HUILA', value: 1},
                    {name: 'LA GUAJIRA', value: 2},
                    {name: 'META', value: 1},
                    {name: 'NARIÑO', value: 1},
                    {name: 'NORTE DE SANTANDER', value: 1},
                    {name: 'QUINDIO', value: 2},
                    {name: 'RISARALDA', value: 1},
                    {name: 'SANTANDER', value: 1},
                    {name: 'SUCRE', value: 3},
                    {name: 'TOLIMA', value: 4},
                    {name: 'VALLE DEL CAUCA', value: 3},
                    {name: 'CASANARE', value: 1},
                    {name: 'AMAZONAS', value: 5}
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
    });

        optionChartTwo = {
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
              type: 'category',
              data: ['ANTIOQUIA','ATLANTICO','SANTAFE DE BOGOTA D.C','BOLIVAR','BOYACA','CALDAS','CAUCA','CESAR','CUNDINAMARCA','HUILA','LA GUAJIRA','META','NARIÑO','NORTE DE SANTANDER','QUINDIO','RISARALDA','SANTANDER','SUCRE','TOLIMA','VALLE DEL CAUCA','CASANARE','AMAZONAS'],

              axisLabel: {
                formatter : function(params, value){
                  var newParamsName = "";
                  var paramsNameNumber = params.length;
                  var provideNumber = 6;
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                  if (paramsNameNumber > provideNumber) {
                      for (var p = 0; p < rowNumber; p++) {
                          var tempStr = "";
                          if (p == rowNumber - 1) {
                              tempStr = (params.length > 6 ? (params.slice(0,6)+"...") : '' );
                          } else {}
                          newParamsName += tempStr;
                      }
                  } else {
                      newParamsName = params;
                  }
                  return newParamsName
                },
                color: '#212121',
                fontWeight: 'bold',
                fontFamily: 'Roboto-Light'
            }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                color: '#212121',
                fontWeight: 'bold',
                fontFamily: 'Roboto-Light'
              }
          },
          visualMap: {
              top: 'middle',
              right: -5,
              min: 0,
              max: 100,
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
          grid: [
            {
              right: '14%'
            }
          ],
          series: [
              {
                data: [17,1,53,3,4,18,1,3,15,1,2,1,1,1,2,1,1,3,4,3,1,5],
                name: '',
                type: 'bar',
                label: {
                  color: '#212121',
                  fontWeight: 'bold',
                  fontFamily: 'Roboto-Light',
                  position: 'top',
                  show: true
                },
                itemStyle: {
                },
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

  chartQuestionTwo() {

    let chartQuestionTwo = echarts.init(document.getElementById('chart-question-two'));
    let chartTwoQuestionTwo = echarts.init(document.getElementById('chart-two-question-two'));
    let optionChartOne;
    let optionChartTwo;

      optionChartOne = {
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
            type: 'category',
            data: ['Nivel 1 básica', 'Nivel 2 básica', 'Nivel 3 básica', 'Nivel 4 básica'],
            axisLabel: {
              formatter : function(params, value){
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 6;
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                        var tempStr = "";
                        if (p == rowNumber - 1) {
                            tempStr = (params.length > 6 ? (params.slice(0,6)+"...") : '' );
                        } else {}
                        newParamsName += tempStr;
                    }
                } else {
                    newParamsName = params;
                }
                return newParamsName
              },
              color: '#212121',
              fontWeight: 'bold',
              fontFamily: 'Roboto-Light'
          }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              color: '#212121',
              fontWeight: 'bold',
              fontFamily: 'Roboto-Light'
            }
        },
        visualMap: {
            top: 'middle',
            right: -5,
            min: 0,
            max: 100,
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
        grid: [
          {
            right: '14%'
          }
        ],
        series: [
            {
              data: [90, 38, 10, 50],
              name: '',
              type: 'bar',
              label: {
                color: '#212121',
                fontWeight: 'bold',
                fontFamily: 'Roboto-Light',
                position: 'top',
                show: true
              },
              itemStyle: {
              },
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
      legend: {
        show: false,
        top: 'top',
        textStyle: {
          color: '#212121',
          fontSize: 13,
          lineHeight:10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light'
        },
        icon: 'rect'
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
          max:100,
          min:0,
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
                  fontFamily: 'Roboto-Light',
                  formatter : function(d){
                    var newParamsName = "";
                    var paramsNameNumber = d.name.length;
                    var provideNumber = 6;
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            if (p == rowNumber - 1) {
                                tempStr = (d.name.length > 6 ? (d.name.slice(0,6)+"...") : '' );
                            } else {}
                            newParamsName += tempStr;
                        }
                    } else {
                        newParamsName = d.name;
                    }
                    return newParamsName
                  }
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
                    shadowOffsetY: 0,
                }
              },
              data: [
                  {value: 90, name: 'Nivel 1 básica'},
                  {value: 38, name: 'Nivel 2 básica'},
                  {value: 10, name: 'Nivel 3 básica'},
                  {value: 50, name: 'Nivel 4 básica'}
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

    optionChartOne && chartQuestionTwo.setOption(optionChartOne);
    optionChartTwo && chartTwoQuestionTwo.setOption(optionChartTwo);

    $(window).on('resize', function(){
        if(chartQuestionTwo != null && chartQuestionTwo != undefined){
            chartQuestionTwo.resize();
        }
    });

    $(window).on('resize', function(){
        if(chartTwoQuestionTwo != null && chartTwoQuestionTwo != undefined){
            chartTwoQuestionTwo.resize();
        }
    });

  }

  chartQuestionThree() {

    let chartQuestionThree = echarts.init(document.getElementById('chart-question-three'));
    let chartTwoQuestionThree = echarts.init(document.getElementById('chart-two-question-three'));
    let optionChartOne;
    let optionChartTwo;

      optionChartOne = {
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
            type: 'category',
            data: ['Nivel 1 avanzada', 'Nivel 2 avanzada', 'Nivel 3 avanzada', 'Nivel 4 avanzada'],
            axisLabel: {
              formatter : function(params, value){
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 6;
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                        var tempStr = "";
                        if (p == rowNumber - 1) {
                            tempStr = (params.length > 6 ? (params.slice(0,6)+"...") : '' );
                        } else {}
                        newParamsName += tempStr;
                    }
                } else {
                    newParamsName = params;
                }
                return newParamsName
              },
              color: '#212121',
              fontWeight: 'bold',
              fontFamily: 'Roboto-Light'
          }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              color: '#212121',
              fontWeight: 'bold',
              fontFamily: 'Roboto-Light'
            }
        },
        visualMap: {
            top: 'middle',
            right: -5,
            min: 0,
            max: 100,
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
        grid: [
          {
            right: '14%'
          }
        ],
        series: [
            {
              data: [90, 38, 10, 50],
              name: '',
              type: 'bar',
              label: {
                color: '#212121',
                fontWeight: 'bold',
                fontFamily: 'Roboto-Light',
                position: 'top',
                show: true
              },
              itemStyle: {
              },
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
      legend: {
        show: false,
        top: 'top',
        textStyle: {
          color: '#212121',
          fontSize: 13,
          lineHeight:10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light'
        },
        icon: 'rect'
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
          max:100,
          min:0,
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
                  fontFamily: 'Roboto-Light',
                  formatter : function(d){
                    var newParamsName = "";
                    var paramsNameNumber = d.name.length;
                    var provideNumber = 6;
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            if (p == rowNumber - 1) {
                                tempStr = (d.name.length > 6 ? (d.name.slice(0,6)+"...") : '' );
                            } else {}
                            newParamsName += tempStr;
                        }
                    } else {
                        newParamsName = d.name;
                    }
                    return newParamsName
                  }
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
                    shadowOffsetY: 0,
                }
              },
              data: [
                  {value: 90, name: 'Nivel 1 avanzada'},
                  {value: 38, name: 'Nivel 2 avanzada'},
                  {value: 10, name: 'Nivel 3 avanzada'},
                  {value: 50, name: 'Nivel 4 avanzada'}
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

    optionChartOne && chartQuestionThree.setOption(optionChartOne);
    optionChartTwo && chartTwoQuestionThree.setOption(optionChartTwo);

    $(window).on('resize', function(){
        if(chartQuestionThree != null && chartQuestionThree != undefined){
            chartQuestionThree.resize();
        }
    });

    $(window).on('resize', function(){
        if(chartTwoQuestionThree != null && chartTwoQuestionThree != undefined){
            chartTwoQuestionThree.resize();
        }
    });

  }

}
