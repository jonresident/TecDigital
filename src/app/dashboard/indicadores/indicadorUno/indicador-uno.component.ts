import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IndicadoresService } from '../indicadores.service';
import { IndicadorUnoDetail, Beneficiario_departamento } from '../indicadores.models';
//import { from, Observable, Subscription } from 'rxjs';
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
import * as Odometer from 'odometer';
import { PreloadService } from '../../dashboard.service';
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

  data: IndicadorUnoDetail;

  chart: any;

  datosDepartamento: any = [ ];

  datosNivelMadurezBasico = [ ];

  datosNivelMadurezAvanzadado = [ ];


  windowScrolled: boolean;
  Vivus: any;

  constructor(
    private indicadorService: IndicadoresService,
    private preloadService: PreloadService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
      new Vivus('icono_business', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      new Vivus('icono_diagnostico', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      new Vivus('icono_mapeo', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      new Vivus('icono_evaluacion', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      new Vivus('icono_consolidacion', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      new Vivus('icono_despegue', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      new Vivus('icono_mapping_colombia', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      new Vivus('icono_bar_1', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      new Vivus('icono_bar_2', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
    }
  }

  ngOnInit(): void {
    initFlip();
    setTimeout(() => {
      this.preloadService.cargando$.emit(true);
    });
    this.observeCharts();
  }

  initVivus() {
    new Vivus('icono_business', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    new Vivus('icono_diagnostico', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    new Vivus('icono_mapeo', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    new Vivus('icono_evaluacion', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    new Vivus('icono_consolidacion', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    new Vivus('icono_despegue', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    new Vivus('icono_mapping_colombia', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    new Vivus('icono_bar_1', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    new Vivus('icono_bar_2', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
  }

  obtenerDatosDepartamento(datosDepartamento: Beneficiario_departamento): any {
    let deptos: any = [];
    let depto = {};

    for (let i = 0; i < datosDepartamento.Departamento.length; i++) {
      if (datosDepartamento.Departamento[i] === "BOGOTÁ, D. C.") {
        depto = { name: "SANTAFE DE BOGOTA D.C", value: datosDepartamento.Cantidad[i] }
      }
      else {
        depto = { name: datosDepartamento.Departamento[i], value: datosDepartamento.Cantidad[i] }
      }
      deptos.push(Object.assign({}, depto));
    }
    return deptos;
  }

  obtenerTablaDepartamento(datosDepartamento: Beneficiario_departamento): any {
    let deptos: any = [];
    let depto = {};

    for (let i = 0; i < datosDepartamento.Departamento.length; i++) {

      depto = { Departamento: datosDepartamento.Departamento[i], Empresas_registradas: datosDepartamento.Cantidad[i] }
      deptos.push(Object.assign({}, depto));
    }
    return deptos;
  }

  definirTablas(deptos: Beneficiario_departamento, arrNivelBasico: number[], arrNivelAvanzado: number[]) {
    this.datosDepartamento = this.obtenerTablaDepartamento(deptos);

    this.datosNivelMadurezBasico = [
      { Empresas_registradas: arrNivelBasico[0], Nivel_madurez: 'Nivel 1 básica' },
      { Empresas_registradas: arrNivelBasico[1], Nivel_madurez: 'Nivel 2 básica' },
      { Empresas_registradas: arrNivelBasico[2], Nivel_madurez: 'Nivel 3 básica' },
      { Empresas_registradas: arrNivelBasico[3], Nivel_madurez: 'Nivel 4 básica' }
    ];

    this.datosNivelMadurezAvanzadado = [
      { Empresas_registradas: arrNivelAvanzado[0], Nivel_madurez: 'Nivel 1 avanzada' },
      { Empresas_registradas: arrNivelAvanzado[1], Nivel_madurez: 'Nivel 2 avanzada' },
      { Empresas_registradas: arrNivelAvanzado[2], Nivel_madurez: 'Nivel 3 avanzada' },
      { Empresas_registradas: arrNivelAvanzado[3], Nivel_madurez: 'Nivel 4 avanzada' }
    ];
  }

  observeCharts() {
    this.indicadorService.getBeneficiarias().subscribe((resp: any) => {
      this.data = resp;

      let diagnostico: number = this.data.faseDiagnostico;
      let mapeo: number = this.data.faseMapeo;
      let evaluacion: number = this.data.faseEvaluacion;
      let consolidacion: number = this.data.faseConsolidacion;
      let despegue: number = this.data.faseDespegue;

      let beneficiario_departamento = this.data.beneficiario_departamento;
      

      let arrNivelBasico: number[] = [
        this.data.nivel_1_basicas,
        this.data.nivel_2_basicas,
        this.data.nivel_3_basicas,
        this.data.nivel_4_basicas];

      let arrNivelAvanzado: number[] = [
        this.data.nivel_1_avanzadas,
        this.data.nivel_2_avanzadas,
        this.data.nivel_3_avanzadas,
        this.data.nivel_4_avanzadas];

      this.initVivus();
      this.initializerOdometer(diagnostico, mapeo, evaluacion, consolidacion, despegue);
      this.chartQuestionOne(beneficiario_departamento);
      this.chartQuestionTwo(arrNivelBasico);
      this.chartQuestionThree(arrNivelAvanzado);

      this.definirTablas(beneficiario_departamento, arrNivelBasico, arrNivelAvanzado);
      
      setTimeout(() => {
        this.preloadService.cargando$.emit(false);
      });

      /* this.preloadService.cargando$.emit(false); */
      
    })
  }

  initializerOdometer(diagnostico: number, mapeo: number, evaluacion: number, consolidacion: number, despegue: number) {
    let total: number = diagnostico + mapeo + evaluacion + consolidacion + despegue;

    var OdometerUno = document.querySelector('.resultActivityOne');
    let odUno = new Odometer({
      el: OdometerUno,
      value: 0,
      format: '',
      theme: ''
    });
    odUno.update(total)

    var OdometerDos = document.querySelector('.resultActivityTwo');
    let odDos = new Odometer({
      el: OdometerDos,
      value: 0,
      format: '',
      theme: ''
    });
    odDos.update(diagnostico)

    var OdometerTres = document.querySelector('.resultActivityThree');
    let odTres = new Odometer({
      el: OdometerTres,
      value: 0,
      format: '',
      theme: ''
    });
    odTres.update(mapeo)

    var OdometerFour = document.querySelector('.resultActivityFour');
    let odFour = new Odometer({
      el: OdometerFour,
      value: 0,
      format: '',
      theme: ''
    });
    odFour.update(evaluacion)

    var OdometerFive = document.querySelector('.resultActivityFive');
    let odFive = new Odometer({
      el: OdometerFive,
      value: 0,
      format: '',
      theme: ''
    });
    odFive.update(consolidacion)

    var OdometerSix = document.querySelector('.resultActivitySix');
    let odSix = new Odometer({
      el: OdometerSix,
      value: 0,
      format: '',
      theme: ''
    });
    odSix.update(despegue)
  }

  chartQuestionOne(beneficiario_departamento: any) {

    let dataDeptos = this.obtenerDatosDepartamento(beneficiario_departamento);

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
            lineHeight: 10,
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
            mark: { show: true },
            dataView: { show: false, readOnly: false },
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
            saveAsImage: { show: false }
          }
        },
        visualMap: {
          top: 'middle',
          right: -5,
          /* max: Math.max(...beneficiario_departamento.Cantidad),
          min: Math.min(...beneficiario_departamento.Cantidad), */
          max: 50,
          min: 0,
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
            data: dataDeptos,
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
          lineHeight: 10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light'
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
      },
      xAxis: {
        type: 'category',

        data: beneficiario_departamento.Departamento,

        axisLabel: {
          formatter: function (params, value) {
            var newParamsName = "";
            var paramsNameNumber = params.length;
            var provideNumber = 6;
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
            if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                if (p == rowNumber - 1) {
                  tempStr = (params.length > 6 ? (params.slice(0, 6) + "...") : '');
                } else { }
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
        min: Math.min(...beneficiario_departamento.Cantidad),
        max: Math.max(...beneficiario_departamento.Cantidad),
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
          data: beneficiario_departamento.Cantidad,
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

    $(window).on('resize', function () {
      if (chartQuestionOne != null && chartQuestionOne != undefined) {
        chartQuestionOne.resize();
      }
    });

    $(window).on('resize', function () {
      if (chartTwoQuestionOne != null && chartTwoQuestionOne != undefined) {
        chartTwoQuestionOne.resize();
      }
    });

  }

  chartQuestionTwo(arrNivelBasico: any) {

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
          lineHeight: 10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light'
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
      },
      xAxis: {
        type: 'category',
        data: ['Nivel 1 básica', 'Nivel 2 básica', 'Nivel 3 básica', 'Nivel 4 básica'],
        axisLabel: {
          formatter: function (params, value) {
            var newParamsName = "";
            var paramsNameNumber = params.length;
            var provideNumber = 6;
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
            if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                if (p == rowNumber - 1) {
                  tempStr = (params.length > 6 ? (params.slice(0, 6) + "...") : '');
                } else { }
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
        min: Math.min(...arrNivelBasico),
        max: Math.max(...arrNivelBasico),
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
          data: arrNivelBasico,
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
          lineHeight: 10,
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
          lineHeight: 10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light'
        },
        icon: 'rect'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: false, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: false }
        }
      },
      visualMap: {
        top: 'middle',
        right: -5,
        max: Math.max(...arrNivelBasico),
        min: Math.min(...arrNivelBasico),
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
              formatter: function (d) {
                var newParamsName = "";
                var paramsNameNumber = d.name.length;
                var provideNumber = 6;
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p == rowNumber - 1) {
                      tempStr = (d.name.length > 6 ? (d.name.slice(0, 6) + "...") : '');
                    } else { }
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
            { value: arrNivelBasico[0], name: 'Nivel 1 básica' },
            { value: arrNivelBasico[1], name: 'Nivel 2 básica' },
            { value: arrNivelBasico[2], name: 'Nivel 3 básica' },
            { value: arrNivelBasico[3], name: 'Nivel 4 básica' }
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

    $(window).on('resize', function () {
      if (chartQuestionTwo != null && chartQuestionTwo != undefined) {
        chartQuestionTwo.resize();
      }
    });

    $(window).on('resize', function () {
      if (chartTwoQuestionTwo != null && chartTwoQuestionTwo != undefined) {
        chartTwoQuestionTwo.resize();
      }
    });

  }

  chartQuestionThree(arrNivelAvanzado: any) {

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
          lineHeight: 10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light'
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
      },
      xAxis: {
        type: 'category',
        data: ['Nivel 1 avanzada', 'Nivel 2 avanzada', 'Nivel 3 avanzada', 'Nivel 4 avanzada'],
        axisLabel: {
          formatter: function (params, value) {
            var newParamsName = "";
            var paramsNameNumber = params.length;
            var provideNumber = 6;
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
            if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                if (p == rowNumber - 1) {
                  tempStr = (params.length > 6 ? (params.slice(0, 6) + "...") : '');
                } else { }
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
        min: Math.min(...arrNivelAvanzado),
        max: Math.max(...arrNivelAvanzado),
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
          data: arrNivelAvanzado,
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
          lineHeight: 10,
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
          lineHeight: 10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light'
        },
        icon: 'rect'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: false, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: false }
        }
      },
      visualMap: {
        top: 'middle',
        right: -5,
        max: Math.max(...arrNivelAvanzado),
        min: Math.min(...arrNivelAvanzado),
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
              formatter: function (d) {
                var newParamsName = "";
                var paramsNameNumber = d.name.length;
                var provideNumber = 6;
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p == rowNumber - 1) {
                      tempStr = (d.name.length > 6 ? (d.name.slice(0, 6) + "...") : '');
                    } else { }
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
            { value: arrNivelAvanzado[0], name: 'Nivel 1 avanzada' },
            { value: arrNivelAvanzado[1], name: 'Nivel 2 avanzada' },
            { value: arrNivelAvanzado[2], name: 'Nivel 3 avanzada' },
            { value: arrNivelAvanzado[3], name: 'Nivel 4 avanzada' }
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

    $(window).on('resize', function () {
      if (chartQuestionThree != null && chartQuestionThree != undefined) {
        chartQuestionThree.resize();
      }
    });

    $(window).on('resize', function () {
      if (chartTwoQuestionThree != null && chartTwoQuestionThree != undefined) {
        chartTwoQuestionThree.resize();
      }
    });

  }

}
