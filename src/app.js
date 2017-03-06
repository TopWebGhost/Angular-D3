'use strict';

(() => {
  angular
    .module('app', ['angular-d3'])
    .controller('appController', function($scope) {
        $scope.month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $scope.day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        $scope.getMonDate = function (date) {
          return $scope.month[date.getMonth()] + '/' + date.getDate();
        }
        $scope.tooltipFunc = function (d) {
          if( d == undefined )
            return [{
              label: '',
              value: ''
            }];
          else {
            return [{
              label: parseInt(d[0].row.y1) ,
              value: $scope.getMonDate(d[0].row.x)
            }]
          }
        }
        $scope.apiData = [{
          "txn_id": "ch_19sW3487538573hjfwe",
          "gateway_id": "3c234wer-sdfkjweru-sdfweiruwer",
          "account": "2344356345234",
          "channel": "booking.com",
          "inquiry_id": "345sdf234-sdf32847",
          "status": "success",
          "total": 800,
          "card": {
            "num": 4242,
            "type": "Visa"
          },
          "invoice_id": "32sdf32-2342-we32-wer3-sdfwer2323",
          "rental_id": "234423532-328432-324234",
          "service": "stripe",
          "pkey": "kdshfiuwer-2348kdsf",
          "created": 148833600
        }, {
          "txn_id": "ch_19sW3487538573hjfwe",
          "gateway_id": "3c234wer-sdfkjweru-sdfweiruwer",
          "account": "2344356345234",
          "channel": "booking.com",
          "inquiry_id": "345sdf234-sdf32847",
          "status": "success",
          "total": 400,
          "card": {
            "num": 4242,
            "type": "Visa"
          },
          "invoice_id": "32sdf32-2342-we32-wer3-sdfwer2323",
          "rental_id": "234423532-328432-324234",
          "service": "stripe",
          "pkey": "kdshfiuwer-2348kdsf",
          "created": 3588365606
        }, {
          "txn_id": "ch_19sW3487538573hjfwe",
          "gateway_id": "3c234wer-sdfkjweru-sdfweiruwer",
          "account": "2344356345234",
          "channel": "booking.com",
          "inquiry_id": "345sdf234-sdf32847",
          "status": "error",
          "total": 1600,
          "card": {
            "num": 4242,
            "type": "Visa"
          },
          "invoice_id": "32sdf32-2342-we32-wer3-sdfwer2323",
          "rental_id": "234423532-328432-324234",
          "service": "stripe",
          "pkey": "kdshfiuwer-2348kdsf",
          "created": 3588365606
        },{
          "txn_id": "ch_19sW3487538573hjfwe",
          "gateway_id": "3c234wer-sdfkjweru-sdfweiruwer",
          "account": "2344356345234",
          "channel": "booking.com",
          "inquiry_id": "345sdf234-sdf32847",
          "status": "success",
          "total": 800,
          "card": {
            "num": 4242,
            "type": "Visa"
          },
          "invoice_id": "32sdf32-2342-we32-wer3-sdfwer2323",
          "rental_id": "234423532-328432-324234",
          "service": "stripe",
          "pkey": "kdshfiuwer-2348kdsf",
          "created": 4685369606
        },{
          "txn_id": "ch_19sW3487538573hjfwe",
          "gateway_id": "3c234wer-sdfkjweru-sdfweiruwer",
          "account": "2344356345234",
          "channel": "booking.com",
          "inquiry_id": "345sdf234-sdf32847",
          "status": "error",
          "total": 800,
          "card": {
            "num": 4242,
            "type": "Visa"
          },
          "invoice_id": "32sdf32-2342-we32-wer3-sdfwer2323",
          "rental_id": "234423532-328432-324234",
          "service": "stripe",
          "pkey": "kdshfiuwer-2348kdsf",
          "created": 4685369606
        }, {
          "txn_id": "ch_19sW3487538573hjfwe",
          "gateway_id": "3c234wer-sdfkjweru-sdfweiruwer",
          "account": "2344356345234",
          "channel": "booking.com",
          "inquiry_id": "345sdf234-sdf32847",
          "status": "success",
          "total": 400,
          "card": {
            "num": 4242,
            "type": "Visa"
          },
          "invoice_id": "32sdf32-2342-we32-wer3-sdfwer2323",
          "rental_id": "234423532-328432-324234",
          "service": "stripe",
          "pkey": "kdshfiuwer-2348kdsf",
          "created": 5988779606
        }];

        $scope.data = {
          apiData: $scope.apiData
        };

        $scope.options = {
          margin: {
            top: 20
          },
          series: [
            {
              axis: "y",
              dataset: "datasets",
              key: "value",
              label: '',
              color: "#70d6f8",
              type: ['line', 'dot'],
              id: "mySeries0"
            }
          ],
          axes: {
            x: {
              key:"x",
              type: 'date',
              ticksInterval: d3.time.day,
              padding: {min: 3, max: 6},
            },
            y: {
              padding: {min:3, max:6}
            }
          },
          tooltipHook: function(d) {
            return {
              abscissas: '',
              rows: $scope.tooltipFunc(d)
            }
          }
        };
        $scope.tabs = [
          {
            tabCaption: "Gross Volume", tabField: "total", isCountTab: false
          }, {
            tabCaption: "Change with yours", tabField: "", isCountTab: true
        }];
    })
})();
