import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import { DataService } from './data.service';
import worldMap from '@highcharts/map-collection/custom/world.geo.json'
import worldMapTopo from '@highcharts/map-collection/custom/world.topo.json'
import DarkUnicaTheme from 'highcharts/themes/dark-unica.js'
import './proj4loader'
import markerClusters from "highcharts/modules/marker-clusters";
import { ThreatDto } from './threat.dto';

markerClusters(Highcharts);
MapModule(Highcharts);
DarkUnicaTheme(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      map: worldMap
    },
    title: {
      text: 'Threat Map'
    },
    mapNavigation: {
      enabled: true
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<div style="font-family: \'NotoColorEmojiLimited\'">{point.countryFlag}</div> <b>{point.country} / {point.city}</b><br>IP: {point.ip}<br>Attempted login: {point.attemptedLogin}<br>Attempt date: {point.attemptDate}<br>ISP: {point.isp} ({point.type})<br>Known attacker: {point.isKnownAttacker}<br>Known abuser: {point.isKnownAbuser}'
    },
    colorAxis: {
      min: 0,
      max: 100
    },
    plotOptions: {
      mappoint: {
          cluster: {
              enabled: true,
              allowOverlap: true,
              animation: {
                  duration: 450
              },
              layoutAlgorithm: {
                  type: 'grid',
                  gridSize: 70
              },
              zones: [{
                  from: 1,
                  to: 4,
                  marker: {
                      radius: 13
                  }
              }, {
                  from: 5,
                  to: 9,
                  marker: {
                      radius: 15
                  }
              }, {
                  from: 10,
                  to: 15,
                  marker: {
                      radius: 17
                  }
              }, {
                  from: 16,
                  to: 20,
                  marker: {
                      radius: 19
                  }
              }, {
                  from: 21,
                  to: 100,
                  marker: {
                      radius: 21
                  }
              }]
          }
      }
    },
    series: [{
        name: 'Basemap',
        borderColor: '#A0A0A0',
        nullColor: 'rgba(177, 244, 177, 0.5)',
        showInLegend: false
      },
      {
        type: 'mappoint',
        enableMouseTracking: true,
        colorKey: 'clusterPointsAmount',
        name: "Threats",
        data: []
      }
    ] as Highcharts.SeriesOptionsType[]
  }
  // updateFlag = false;
  chartConstructor = "mapChart";

  constructor(private dataservice: DataService) {}
  
  ngOnInit(): void {
    this.getThreats();
  }

  getThreats() {
    this.dataservice.getThreats().subscribe((data: any) => {
      this.drawThreats(data);
    });
  }

  drawThreats(data: any) {

    // let pointsToAdd = [{
    //   "name": "Entzheim",
    //   "lat": 48.54699,
    //   "lon": 7.62794,
    //   "country": "FR",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Aéroport Paris Roissy Charles de Gaulle CDG",
    //   "lat": 49.00412433626132,
    //   "lon": 2.5707364082336426,
    //   "country": "FR",
    //   "ip": "182.123.3.15"
    // }, {
    //   "name": "Lyon St-Exupéry TGV",
    //   "lat": 45.721109,
    //   "lon": 5.074969,
    //   "country": "FR",
    //   "ip": "10.123.3.11"
    // }, {
    //   "name": "Aéroport Marseille-Provence",
    //   "lat": 43.44129735202746,
    //   "lon": 5.237088203430176,
    //   "country": "FR",
    //   "ip": "1.123.3.11"
    // }, {
    //   "name": "Brussels-Airport-Zaventem",
    //   "lat": 50.8985400058829,
    //   "lon": 4.483022689819336,
    //   "country": "BE",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Genève",
    //   "lat": 46.232376,
    //   "lon": 6.112098,
    //   "country": "CH",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Frankfurt",
    //   "lat": 50.051209,
    //   "lon": 8.570971,
    //   "country": "DE",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Berlin-Schönefeld",
    //   "lat": 52.391641,
    //   "lon": 13.513178,
    //   "country": "DE",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Düsseldorf",
    //   "lat": 51.292008,
    //   "lon": 6.786837,
    //   "country": "DE",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Köln/Bonn",
    //   "lat": 50.8789,
    //   "lon": 7.119303,
    //   "country": "DE",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Southampton",
    //   "lat": 50.950638,
    //   "lon": -1.36362,
    //   "country": "GB",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Gatwick",
    //   "lat": 51.156425,
    //   "lon": -0.161022,
    //   "country": "GB",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Luton",
    //   "lat": 51.880918,
    //   "lon": -0.413341,
    //   "country": "GB",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Manchester",
    //   "lat": 53.361568,
    //   "lon": -2.268941,
    //   "country": "GB",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Stansted",
    //   "lat": 51.888979,
    //   "lon": 0.26162,
    //   "country": "GB",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Heathrow",
    //   "lat": 51.478443,
    //   "lon": -0.46134,
    //   "country": "GB",
    //   "ip": "82.123.3.11"
    // }, {
    //   "name": "Schiphol",
    //   "lat": 52.308787,
    //   "lon": 4.761487,
    //   "country": "NL",
    //   "ip": "82.123.3.11"
    // }] //as Highcharts.SeriesMappointDataOptions

    data.forEach(function(p: Highcharts.PointOptionsType) {
      Highcharts.charts[0]!.series[1].addPoint(p, false);
    });
  }
}