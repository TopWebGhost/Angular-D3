
(() => {
  angular.module('app')
  .component('costView', {
    templateUrl: 'costview/costview.html',
    controller: CostViewController,
    controllerAs: 'vm'
  });

  CostViewController.$inject = ['$rootScope', '$location'];

  function CostViewController($rootScope, $location) {
    const vm = this;

    vm.moveOverlay = function(e) {
      var currentTarget;
      if(e == undefined) {
        currentTarget = $('.cost-view .nav-tabs li')[0];
      } else {
        currentTarget = e.event.currentTarget;
      }
      var overlay = $('.cost-view .overlay');
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
      //console.log('width:', width, 'left', left);
      overlay.css('width', width + 'px');
      overlay.css('height', height + 'px');
      overlay.css('left', left + 'px');
    };

    vm.moveOverlay();
  }


})();
