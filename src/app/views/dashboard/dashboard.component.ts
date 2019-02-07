import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { DashboardService } from '../../services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  completeDashboardData: any
  garphData: any;
  mainChartData1: Array<number> = [];;
  mainChartData1Test: Array<number> = [];

  constructor(private spinner: NgxSpinnerService, private service: DashboardService) {
  }

  ngOnInit() {
    this.spinner.show()
    this.service.getallCountForDashboard().subscribe(res => {
      this.spinner.hide()
      console.log(res.json())
      this.completeDashboardData = res.json();
    })

    this.mainChartData1.push(1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 4, 3, 1, 1, 3, 3, 2, 1, 2, 2, 2, 1);
  }

  transformJsonToCustomFormat(input: any[]) {
    const response = [];
    input.forEach(item => {
      response.push(item.count);
    });
    return response;
  }

  transformJsonToCustomFormat1(input: any[]) {
    const response = [];
    input.forEach(item => {
      response.push(item.dayname);
    });
    return response;
  }

  // mainChart

  public mainChartElements = 30;


  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = [];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(50 / 5),
          max: 50
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';
}