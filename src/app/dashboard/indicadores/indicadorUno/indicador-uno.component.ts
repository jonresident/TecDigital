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
          new Vivus('icono_register',{
            duration: 50,
            reverse: true,
            dashGap: 20
          },).reset();
          new Vivus('icono_diagnosis',{
            duration: 50,
            reverse: true,
            dashGap: 20
          },).reset();
          new Vivus('icono_mapping',{
            duration: 50,
            reverse: true,
            dashGap: 20
          },).reset();
          new Vivus('icono_mapping_colombia',{
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
    new Vivus('icono_register',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_diagnosis',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_mapping',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset();
    new Vivus('icono_mapping_colombia',{
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
              max:544,
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
                    {name: 'ANTIOQUIA', value: 253},
                    {name: 'ATLANTICO', value: 83},
                    {name: 'SANTAFE DE BOGOTA D.C', value: 544},
                    {name: 'BOLIVAR', value: 0},
                    {name: 'BOYACA', value: 60},
                    {name: 'CALDAS', value: 199},
                    {name: 'CAQUETA', value: 0},
                    {name: 'CAUCA', value: 0},
                    {name: 'CESAR', value: 0},
                    {name: 'CORDOBA', value: 0},
                    {name: 'CUNDINAMARCA', value: 151},
                    {name: 'CHOCO', value: 0},
                    {name: 'HUILA', value: 0},
                    {name: 'LA GUAJIRA', value: 0},
                    {name: 'MAGDALENA', value: 0},
                    {name: 'META', value: 0},
                    {name: 'NARIÑO', value: 67},
                    {name: 'NORTE DE SANTANDER', value: 0},
                    {name: 'QUINDIO', value: 0},
                    {name: 'RISARALDA', value: 0},
                    {name: 'SANTANDER', value: 58},
                    {name: 'SUCRE', value: 0},
                    {name: 'TOLIMA', value: 70},
                    {name: 'VALLE DEL CAUCA', value: 131},
                    {name: 'ARAUCA', value: 0},
                    {name: 'CASANARE', value: 0},
                    {name: 'PUTUMAYO', value: 0},
                    {name: 'AMAZONAS', value: 0},
                    {name: 'GUAINIA', value: 0},
                    {name: 'GUAVIARE', value: 0},
                    {name: 'VAUPES', value: 0},
                    {name: 'VICHADA', value: 0},
                    {name: 'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA', value: 0}
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

    $.get('../../../../assets/data/COLOMBIAMUNI.json', function (colombiaJson) {
      chartTwoQuestionOne.hideLoading();
        echarts.registerMap('COLOMBIA_MUNI', colombiaJson, {});
        optionChartTwo = {
            tooltip: {
              trigger: 'item',
              showDelay: 0,
              transitionDuration: 0.2,
              formatter: function (params) {
                let value = (params.value + '').split('.');
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
                max:544,
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
                    map: 'COLOMBIA_MUNI',
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
                      { name: '44847', value: 4822023, label:{formatter:'URIBIA'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'URIBIA' + ': ' + value;
                        }}
                      },
                      { name: '44560', value: 731449, label:{formatter:'MANAURE'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'MANAURE' + ': ' + value;
                        }}
                      },
                      { name: '44430', value: 2949131, label:{formatter:'MAICAO'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'MAICAO' + ': ' + value;
                        }}
                      },
                      { name: '44001', value: 38041430, label:{formatter:'RIOHACHA'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'RIOHACHA' + ': ' + value;
                        }}
                      },
                      { name: '44090', value: 5187582, label:{formatter:'DIBULLA'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'DIBULLA' + ': ' + value;
                        }}
                      },{ name: '47001', value: 3590347, label:{formatter:'SANTA MARTA'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'SANTA MARTA' + ': ' + value;
                        }}
                      },
                      { name: '44378', value: 917092, label:{formatter:'HATONUEVO'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'HATONUEVO' + ': ' + value;
                        }}
                      },
                      { name: '44078', value: 632323, label:{formatter:'BARRANCAS'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'BARRANCAS' + ': ' + value;
                        }}
                      },
                      { name: '47189', value: 19317568, label:{formatter:'CIENAGA'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'CIENAGA' + ': ' + value;
                        }}
                      },
                      { name: '08001', value: 9919945, label:{formatter:'BARRANQUILLA'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'BARRANQUILLA' + ': ' + value;
                        }}
                      },
                      { name: '47745', value: 1392313, label:{formatter:'SITIONUEVO'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'SITIONUEVO' + ': ' + value;
                        }}
                      },{ name: '08573', value: 1595728, label:{formatter:'PUERTO COLOMBIA'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'PUERTO COLOMBIA' + ': ' + value;
                        }}
                      },
                      { name: '44098', value: 12875255, label:{formatter:'DISTRACCION'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'DISTRACCION' + ': ' + value;
                        }}
                      },
                      { name: '44279', value: 6537334, label:{formatter:'FONSECA'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'FONSECA' + ': ' + value;
                        }}
                      },
                      { name: '44650', value: 3074186, label:{formatter:'SAN JUAN DEL CESAR'}, tooltip: {
                        formatter: function (params) {
                          var value = (params.value + '').split('.');
                          value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                          return params.seriesName + '<br/>' + 'SAN JUAN DEL CESAR' + ': ' + value;
                        }}
                      }
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
        optionChartTwo && chartTwoQuestionOne.setOption(optionChartTwo);
      });

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
