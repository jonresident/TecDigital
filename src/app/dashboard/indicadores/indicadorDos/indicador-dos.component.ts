import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IndicadoresService } from '../indicadores.service';
import { IndicadorDosDetail, OferentesPorTipoEmpresas, CantidadTiposApoyo, Sectores } from '../indicadores.models';
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
  selector: 'app-indicador-dos',
  templateUrl: './indicador-dos.component.html',
  styles: [
  ]
})
export class IndicadorDosComponent implements OnInit {

  data: IndicadorDosDetail;
  fecha: Date;

  
  chart: any;

  datosSectores = [];
  datosMecanismosApoyo = [];
  datosTipoEmpresa = [];

  windowScrolled: boolean;
  Vivus: any;

  constructor(
    private preloadService: PreloadService,
    private indicadorService: IndicadoresService,
    @Inject(DOCUMENT) private document: Document) { }

  @HostListener("window:scroll")
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
      new Vivus('icono_offer', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      new Vivus('icono_business', {
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
      new Vivus('icono_burbuja_1', {
        duration: 50,
        reverse: true,
        dashGap: 20
      }).reset();
      /*new Vivus('icono_burbuja_2',{
        duration: 50,
        reverse: true,
        dashGap: 20
      },).reset();*/
    }
  }

  ngOnInit(): void {
    initFlip();
    setTimeout(() => {
      this.preloadService.cargando$.emit(true);
    });
    this.observeCharts();
  }

  obtenerObjetosSectores(sectores: Sectores) {
    let objetos: any = [];
    let objeto = {};

    for (let i = 0; i < sectores.sectores.length; i++) {
      objeto = { name: sectores.sectores[i], value: sectores.cantidad[i] }
      objetos.push(Object.assign({}, objeto));
    }
    return objetos;
  }

  obtenerTablasSectores(sectores: Sectores) {
    let objetos: any = [];
    let objeto = {};

    for (let i = 0; i < sectores.sectores.length; i++) {
      objeto = { Sector: sectores.sectores[i], Numero_empresas: sectores.cantidad[i] }
      objetos.push(Object.assign({}, objeto));
    }
    return objetos;
  }

  definirTablas(sectores: Sectores, tipoEmpresas: OferentesPorTipoEmpresas, tiposApoyo: CantidadTiposApoyo ) {
    this.datosSectores = this.obtenerTablasSectores(sectores);
  
    this.datosMecanismosApoyo = [
      { Numero_empresas: tiposApoyo.capacitacionformacion, Mecanismo: 'CapacitaciónFormación' },
      { Numero_empresas: tiposApoyo.plataformasbasesdatosestudios, Mecanismo: 'PlataformaBase' },
      { Numero_empresas: tiposApoyo.asesoriaconsultoriaasistenciatecnica, Mecanismo: 'AsesoriaConsultoria' },
      { Numero_empresas: tiposApoyo.relacionamiento, Mecanismo: 'Relacionamiento' },
      { Numero_empresas: tiposApoyo.financiero, Mecanismo: 'financiero' },
      { Numero_empresas: tiposApoyo.reembolsable, Mecanismo: 'reembolsable' },
      { Numero_empresas: tiposApoyo.contrapartida, Mecanismo: 'contrapartida' },
      { Numero_empresas: tiposApoyo.otrostipoapoyo, Mecanismo: 'otrostipoapoyo' }
    ]
  
    this.datosTipoEmpresa = [
      { Tipo_empresa: 'Emprendedor', Numero_empresas: tipoEmpresas.emprendedor },
      { Tipo_empresa: 'Micro empresas', Numero_empresas: tipoEmpresas.microempresas },
      { Tipo_empresa: 'Empresas pequeñas', Numero_empresas: tipoEmpresas.empresaspequenas },
      { Tipo_empresa: 'Medianas empresas', Numero_empresas: tipoEmpresas.medianasempresas },
      { Tipo_empresa: 'Grandes empresas', Numero_empresas: tipoEmpresas.grandesempresas },
      { Tipo_empresa: 'Gobierno', Numero_empresas: tipoEmpresas.gobierno },
      { Tipo_empresa: 'Academia', Numero_empresas: tipoEmpresas.academia },
      { Tipo_empresa: 'Entidad soporte', Numero_empresas: tipoEmpresas.entidadessoporte },
      { Tipo_empresa: 'Personas naturales', Numero_empresas: tipoEmpresas.personasnaturales },
      { Tipo_empresa: 'Otros usuarios', Numero_empresas: tipoEmpresas.otrosusuarioobjetivo }
    ];
  }

  observeCharts() {

    this.indicadorService.getOferentes().subscribe((resp: any) => {
      this.data = resp;

      let registradas: number = this.data.empresasRegistradas;
      let ofertados: number = this.data.portafoliosOfertados;
      let sectores: Sectores = this.data.sectores;
      let tipoEmpresas: OferentesPorTipoEmpresas = this.data.oferentesPorTipoEmpresas;
      let tiposApoyo: CantidadTiposApoyo = this.data.cantidadTiposApoyo;


      this.initVivus();
      this.initializerOdometer(registradas, ofertados);
      this.chartQuestionOne(sectores);
      this.chartQuestionTwo(tiposApoyo);
      this.chartQuestionThree(tipoEmpresas);

      this.definirTablas(sectores, tipoEmpresas, tiposApoyo);

      setTimeout(() => {
        this.preloadService.cargando$.emit(false);
      });

      /* this.preloadService.cargando$.emit(false); */
    })
  }

  initVivus() {
    new Vivus('icono_offer', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    new Vivus('icono_business', {
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
    new Vivus('icono_burbuja_1', {
      duration: 50,
      reverse: true,
      dashGap: 20
    }).reset();
    /* new Vivus('icono_burbuja_2',{
      duration: 50,
      reverse: true,
      dashGap: 20
    },).reset(); */
  }

  initializerOdometer(registradas: number, ofertados: number) {
    var OdometerUno = document.querySelector('.resultActivityOne');
    let odUno = new Odometer({
      el: OdometerUno,
      value: 0,
      format: '',
      theme: ''
    });
    odUno.update(registradas)

    var OdometerDos = document.querySelector('.resultActivityTwo');
    let odDos = new Odometer({
      el: OdometerDos,
      value: 0,
      format: '',
      theme: ''
    });
    odDos.update(ofertados)
  }

  /*chartQuestionOne() {

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

  }*/

  chartQuestionOne(sectores: Sectores) {

    let chartQuestionOne = echarts.init(document.getElementById('chart-question-one'));
    let chartTwoQuestionOne = echarts.init(document.getElementById('chart-two-question-one'));
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
        data: sectores.sectores,
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
        min: Math.min(...sectores.cantidad),
        max: Math.max(...sectores.cantidad),
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
          data: sectores.cantidad,
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
        max: Math.max(...sectores.cantidad),
        min: Math.min(...sectores.cantidad),
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
          data: this.obtenerObjetosSectores(sectores),
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

  chartQuestionTwo(tiposApoyo: CantidadTiposApoyo) {

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
        data: ['CapacitaciónFormación', 'PlataformaBase', 'AsesoriaConsultoria', 'Relacionamiento', 'financiero', 'reembolsable', 'contrapartida', 'otrostipoapoyo'],
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
        min: Math.min(...Object.values(tiposApoyo)),
        max: Math.max(...Object.values(tiposApoyo)),
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
          data: [11, 10, 13, 10, 3, 3, 3, 6],
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
        max: Math.max(...Object.values(tiposApoyo)),
        min: Math.min(...Object.values(tiposApoyo)),
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
            { value: tiposApoyo.capacitacionformacion, name: 'CapacitaciónFormación' },
            { value: tiposApoyo.plataformasbasesdatosestudios, name: 'PlataformaBase' },
            { value: tiposApoyo.asesoriaconsultoriaasistenciatecnica, name: 'AsesoriaConsultoria' },
            { value: tiposApoyo.relacionamiento, name: 'Relacionamiento' },
            { value: tiposApoyo.financiero, name: 'financiero' },
            { value: tiposApoyo.reembolsable, name: 'reembolsable' },
            { value: tiposApoyo.contrapartida, name: 'contrapartida' },
            { value: tiposApoyo.otrostipoapoyo, name: 'otrostipoapoyo' }
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

  chartQuestionThree(tipoEmpresas: OferentesPorTipoEmpresas) {

    let chartQuestionThree = echarts.init(document.getElementById('chart-question-three'));
    let chartTwoQuestionThree = echarts.init(document.getElementById('chart-two-question-three'));
    let optionChartOne;
    let optionChartTwo;

    optionChartOne = {
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: "{a} <br/>{b} : {c}",
        backgroundColor: '#FFFFFF',
        padding: 5,
        textStyle: {
          color: '#212121',
          fontSize: 13,
          lineHeight: 10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light',
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
      },
      animation: true,
      animationThreshold: 2000,
      animationDuration: 1000,
      animationEasing: 'bounceIn',
      animationDelay: 0,
      animationDurationUpdate: 400,
      animationEasingUpdate: 'bounceIn',
      animationDelayUpdate: 0,
      color: ['#fff', '#fff', '#fff'],
      textStyle: {
        fontWeight: 'bold',
        fontFamily: 'Roboto-Light',
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
        max: Math.max(...Object.values(tipoEmpresas)),
        min: Math.min(...Object.values(tipoEmpresas)),
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
          name: 'Tipo de empresa',
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 150,
            edgeLength: 10,
            gravity: 0.1,
          },
          roam: true,
          label: {
            normal: {
              show: true,
              position: 'top',
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
              position: 'top',
              fontSize: 12,
              fontWeight: 'bold',
              fontFamily: 'Roboto-Light'
            }
          },
          data: [
            {
              "name": "Emprendedor",
              "value": tipoEmpresas.emprendedor,
              "symbolSize": tipoEmpresas.emprendedor + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Micro empresas",
              "value": tipoEmpresas.microempresas,
              "symbolSize": tipoEmpresas.microempresas + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Empresas pequeñas",
              "value": tipoEmpresas.empresaspequenas,
              "symbolSize": tipoEmpresas.empresaspequenas + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Medianas empresas",
              "value": tipoEmpresas.medianasempresas,
              "symbolSize": tipoEmpresas.medianasempresas + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Grandes empresas",
              "value": tipoEmpresas.grandesempresas,
              "symbolSize": tipoEmpresas.grandesempresas + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Gobierno",
              "value": tipoEmpresas.gobierno,
              "symbolSize": tipoEmpresas.gobierno + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Academia",
              "value": tipoEmpresas.academia,
              "symbolSize": tipoEmpresas.academia + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Entidad soporte",
              "value": tipoEmpresas.entidadessoporte,
              "symbolSize": tipoEmpresas.entidadessoporte + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Personas naturales",
              "value": tipoEmpresas.personasnaturales,
              "symbolSize": tipoEmpresas.personasnaturales + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Otros usuarios",
              "value": tipoEmpresas.otrosusuarioobjetivo,
              "symbolSize": tipoEmpresas.otrosusuarioobjetivo + 20,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            }
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
            return idx * 5;
          }
        }
      ]
    };

    optionChartTwo = {
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: "{a} <br/>{b}: {c}",
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
        max: Math.max(...Object.values(tipoEmpresas)),
        min: Math.min(...Object.values(tipoEmpresas)),
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
      series: [{
        breadcrumb: {
          show: false,
          left: 'center',
          top: 'auto',
          right: 'auto',
          bottom: 15,
          height: 22,
          itemStyle: {
            color: '#1D244A'
          },
          textStyle: {
            color: '#FAFAFA',
            fontSize: 12,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        width: '70%',
        height: '70%',
        name: 'Todo',
        type: 'treemap',
        leafDepth: 1,
        data: [{
          name: 'Emprendedor',
          value: 37,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Micro empresas',
          value: tipoEmpresas.microempresas,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Empresas pequeñas',
          value: tipoEmpresas.empresaspequenas,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Medianas empresas',
          value: tipoEmpresas.medianasempresas,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Grandes empresas',
          value: tipoEmpresas.grandesempresas,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Gobierno',
          value: tipoEmpresas.gobierno,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Academia',
          value: tipoEmpresas.academia,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Entidad soporte',
          value: tipoEmpresas.entidadessoporte,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Personas naturales',
          value: tipoEmpresas.personasnaturales,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Otros usuarios',
          value: tipoEmpresas.otrosusuarioobjetivo,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        }]
      }],
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

  chartQuestionFour() {

    let chartQuestionFour = echarts.init(document.getElementById('chart-question-four'));
    let chartTwoQuestionFour = echarts.init(document.getElementById('chart-two-question-four'));
    let optionChartOne;
    let optionChartTwo;

    optionChartOne = {
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: "{a} <br/>{b} : {c}",
        backgroundColor: '#FFFFFF',
        padding: 5,
        textStyle: {
          color: '#212121',
          fontSize: 13,
          lineHeight: 10,
          fontWeight: 'bold',
          fontFamily: 'Roboto-Light',
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
      },
      animation: true,
      animationThreshold: 2000,
      animationDuration: 1000,
      animationEasing: 'bounceIn',
      animationDelay: 0,
      animationDurationUpdate: 400,
      animationEasingUpdate: 'bounceIn',
      animationDelayUpdate: 0,
      color: ['#fff', '#fff', '#fff'],
      textStyle: {
        fontWeight: 'bold',
        fontFamily: 'Roboto-Light',
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
        max: 3865,
        min: 0,
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
          name: 'Tipo de oferta',
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 150,
            edgeLength: 10,
            gravity: 0.1,
          },
          roam: true,
          label: {
            normal: {
              show: true,
              position: 'top',
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
              position: 'top',
              fontSize: 12,
              fontWeight: 'bold',
              fontFamily: 'Roboto-Light'
            }
          },
          data: [
            {
              "name": "innovación",
              "value": 2181,
              "symbolSize": 48,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Emprendimiento",
              "value": 1386,
              "symbolSize": 73,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Transferencia de conocimiento",
              "value": 2055,
              "symbolSize": 67,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Investigación",
              "value": 2518,
              "symbolSize": 50,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Formación capital humano",
              "value": 3730,
              "symbolSize": 88,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Tipo de formación",
              "value": 1952,
              "symbolSize": 55,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Calidad",
              "value": 1898,
              "symbolSize": 70,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Entidad soporte",
              "value": 1484,
              "symbolSize": 67,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Cluster de encadenamiento",
              "value": 3865,
              "symbolSize": 47,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            },
            {
              "name": "Financiación",
              "value": 493,
              "symbolSize": 82,
              "draggable": true,
              "itemStyle": {
                "normal": {
                  "shadowBlur": 0
                }
              }
            }
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
            return idx * 5;
          }
        }
      ]
    };

    optionChartTwo = {
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: "{a} <br/>{b}: {c}",
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
        max: 40,
        min: 28,
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
      series: [{
        breadcrumb: {
          show: false,
          left: 'center',
          top: 'auto',
          right: 'auto',
          bottom: 15,
          height: 22,
          itemStyle: {
            color: '#1D244A'
          },
          textStyle: {
            color: '#FAFAFA',
            fontSize: 12,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        width: '70%',
        height: '70%',
        name: 'Todo',
        type: 'treemap',
        leafDepth: 1,
        data: [{
          name: 'Innovación',
          value: 100,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Emprendimiento',
          value: 27,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Trasnferencia de conocimiento',
          value: 5,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Investigación',
          value: 10,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Formación de capital humano',
          value: 35,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Tipo de formación',
          value: 8,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Calidad',
          value: 40,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Cluster de encadenamiento',
          value: 15,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Financiación',
          value: 10,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        },
        {
          name: 'Comercialización',
          value: 10,
          label: {
            show: true,
            position: 'inside',
            color: '#FAFAFA',
            fontSize: 11,
            lineHeight: 10,
            fontWeight: 'bold',
            fontFamily: 'Roboto-Light'
          }
        }]
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };

    optionChartOne && chartQuestionFour.setOption(optionChartOne);
    optionChartTwo && chartTwoQuestionFour.setOption(optionChartTwo);

    $(window).on('resize', function () {
      if (chartQuestionFour != null && chartQuestionFour != undefined) {
        chartQuestionFour.resize();
      }
    });

    $(window).on('resize', function () {
      if (chartTwoQuestionFour != null && chartTwoQuestionFour != undefined) {
        chartTwoQuestionFour.resize();
      }
    });

  }

}