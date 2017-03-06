
(() => {
  angular
  .module('angular-d3', ['n3-line-chart'])
  .component('costView', {
    bindings: {
      data: "=",
      options: "=",
      tabs: "="
    },
    templateUrl: 'costview/costview.html',
    controller: CostViewController,
    controllerAs: 'vm'
  });

  CostViewController.$inject = ['$rootScope', '$location', '$window', '$timeout'];

  function CostViewController($rootScope, $location, $window, $timeout) {
    const vm = this;
    vm.isVisible = false;
    vm.currentView = 0;
    vm.chartData = [];
    vm.total = 0;
    vm.totalprice = 0;
    vm.error = 0;
    vm.success = 0;

    vm.$onInit = function() {
      vm.extractChartData(vm.data.apiData, 0);
      $timeout(vm.moveOverlay, 300);
    };
    vm.selectView = function(e, type) {
      vm.moveOverlay(e, type);
      vm.extractChartData(vm.data.apiData, type);
    }
    vm.moveOverlay = function(e, index) {

      vm.currentView = index;
      var currentTarget;
      if(e == undefined) {
        currentTarget = $('.cost-view .nav-tabs li')[0];
      } else {
        currentTarget = e.event.currentTarget;
      }
      var overlay = $('.cost-view .overlay-move');
      var width = 0;
      var left = 0;
      var height = 0;
      var lists = $('.cost-view .nav-tabs li');
      for (var i = 0; i < lists.length; i++) {
        if(lists[i] != currentTarget) {
          left += parseInt($(lists[i]).css('width'));
        } else {
          width = parseInt($(lists[i]).css('width'));
          height = parseInt($(lists[i]).css('height'));
          break;
        }
      }

      overlay.css('width', width + 'px');
      overlay.css('height', height + 'px');
      overlay.css('left', left + 'px');

      $timeout(function() {
        $window.dispatchEvent(new Event('resize'));
      }, 500);
    };

    vm.readyDraw = function(index) {
      return vm.currentView == index;
    };

    vm.extractCaption = function (type) {
      vm.total = 0;
      vm.count = 0;
      for(var i = 0 ; i < vm.data.apiData.length; i++) {
        vm.count ++;
        vm.total += parseFloat(vm.data.apiData[i][vm.tabs[type].tabField]);
      }
      if (vm.tabs[type].isCountTab) {
        return vm.count;
      } else {
        return vm.total;
      }
    }
    vm.extractChartData = function(data, type) {
      vm.chartData = {datasets: []};
      vm.chartOptions = {};

      //     vm.buildXAxisData('1m');   // for date-filter
      var datasets = [];
      var tempIndex = -1;

      for(var i = 0 ; i < data.length; i++) {
          tempIndex = -1;
          for (var j = 0; j < datasets.length; j++) {
            if (datasets[j].x.getTime() === (new Date(data[i].created).getTime())) {
              tempIndex = j;
            }
          }
          if(tempIndex == -1) {
            if(!vm.tabs[type].isCountTab) {
              datasets.push({x: new Date(data[i].created), value: data[i][vm.tabs[type].tabField]});
            } else {
              datasets.push({x: new Date(data[i].created), value: 1});
            }
          } else {
            if(!vm.tabs[type].isCountTab) {
              datasets[tempIndex].value += data[i][vm.tabs[type].tabField];
            } else {
              datasets[tempIndex].value += 1;
            }
          }
      }
      datasets.sort(function(a, b) {
        return a.x.getTime() - b.x.getTime();
      });
      vm.chartData = {datasets: datasets};
      vm.modifyOptions(vm.chartData, type);
    };

    vm.modifyOptions = function(chartData, type) {
      var max = chartData.datasets[0].value;
      var min = chartData.datasets[0].value;

      for(var i = 0; i < chartData.datasets.length; i++) {
        if(min > chartData.datasets[i].value) {
          min = chartData.datasets[i].value;
        }
        if(max < chartData.datasets[i].value) {
          max = chartData.datasets[i].value;
        }
      }
      var yAxisCount = 0;
      var yAxixTicks = [];
      var interval = 0;
      if(vm.tabs[type].isCountTab) {
        if(max-min <=4) {
          yAxisCount = max-min;
          interval = 1;
        } else {
          yAxisCount = 2;
          interval = (max-min)/2;
        }
      } else {
        yAxisCount = 4;
        interval = (max-min) / yAxisCount;

      }

      yAxixTicks.push(min);
      for(i = 1; i <= yAxisCount; i++) {
        yAxixTicks.push(min + interval*i);
      }
      vm.options.axes.y.ticks = yAxixTicks;
    };

    vm.buildXAxisData = function(type) {   //date-filter function

      vm.datasets = [];
      vm.shortdates = [];
      vm.today = new Date();
      vm.from = new Date();

      if(type == '1w') {
        vm.from.setDate(vm.today.getDate() - 6);
      } else if (type == '2w') {
        vm.from.setDate(vm.today.getDate() - 13);
      } else if (type == '1m') {
        vm.from.setMonth(vm.today.getMonth() - 1);
      } else if (type == '3m') {
        vm.from.setMonth(vm.today.getMonth() - 3);
      } else if (type == '1y') {
        vm.from.setYear(vm.today.getFullYear()  - 1);
      }
      //for(var d = new Date(vm.today); d >= vm.from; d.setDate(d.getDate() - 1)) {
      //  vm.datasets.push({x:new Date(d), value: 0});
      //  vm.shortdates.push(vm.getMonDate(d));
      //}
    };
  }


})();
