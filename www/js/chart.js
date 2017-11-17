// function chart_1(){
// 	  var chart = new Highcharts.Chart({
//             chart: {
//                 renderTo: 'chart_div'
//             },

//             xAxis: {
//                 categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
//                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//             },

//             series: [{
//                 data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
//             }]

//         });
// }
var curr_ip='http://192.168.1.22:3000/'

function test_graph(scheme_name,schemecode)
 {
 	
    // alert("hiiiii");;
    // alert(schemecode);

    // $.ajax({
    //      type: 'GET',
    //      url: curr_ip+'functionalities/navgraph_new',
    //       data :{schemecode:schemecode},
    //      dataType: 'json',
    //      // data: { 'iin' : $('#client_name').val()},
    //      success: function(data)
    $$.get(curr_ip+'functionalities/navgraph_new', {schemecode: schemecode},function (data1) {
         {
             // console.log("#########################")
             // console.log(data1);
             var data=JSON.parse(data1);
             var i;
             var navrs1=[];

              var scheme_classification=data.classification[0].classification;
             // alert(scheme_classification);

             for(i=0;i<data.nav_data.length;i=i+1)
             {
                 var date2 = new Date(data.nav_data[i].navdate);
                  navrs1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.nav_data[i].navrs])
             }
              
               var nifty1=[];
               var index_name="";
               for(i=0;i<data.nifty_data.length;i=i+1)
             {
                 var date2 = new Date(data.nifty_data[i].date);
                  nifty1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.nifty_data[i].close])
                  index_name = data.nifty_data[i].indexname
             }
             
 
        test_graph_new_graph(scheme_name,index_name,navrs1,nifty1)   //added on 6.3.2017
    }
});
 }

          function test_graph_new_graph(scheme_name,index_name,navrs1,nifty1)   //added on 6.3.2017
                   {
                          var seriesOptions = [],
                          seriesCounter = 0,
                          names = [];

                            seriesOptions[0] = {
                                name: scheme_name,
                                data: navrs1,
                                color: '#429EE9'
                            };


                            if(nifty1.length > 0)
                            {
                                    seriesOptions[1] = {
                                        name: index_name,
                                        data: nifty1,
                                        color: '#A8A8A8'
                                        }; 
                            }
                  
                        



                         Highcharts.stockChart('fund_details_chart', {

                          rangeSelector: {
                              selected: 4
                          },

                          yAxis: {
                              labels: {
                                  formatter: function () {
                                      return (this.value > 0 ? ' + ' : '') + this.value + '%';
                                  }
                              },
                              plotLines: [{
                                  value: 0,
                                  width: 2
                                 // colors: ['#429EE9', '#A8A8A8']
    

                              }]
                          },

                          plotOptions: {
                              series: {
                                  compare: 'percent',
                                  showInNavigator: true,
                                  colors: ['#429EE9', '#A8A8A8'],
                                  states: {
                                            hover: {
                                                lineWidth: 2
                                            }
                                        }

                              }
                          },
                           legend: {
                                    enabled: true,
                                    align: 'center',
                                    borderColor: '#c0c1c1',
                                    itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "11px", "fontWeight": "normal" },
                                    borderWidth: 1,
                                    y: 34,
                                    layout: 'horizontal',
                                    verticalAlign: 'top',
                                    floating: true
                                   },

                          tooltip: {
                              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                              valueDecimals: 2,
                              split: true
                          },
                           credits: {
                                 text: 'rupeevest',
                                 href: 'http://www.rupeevest.com'
                                 // enabled: false
                            },
                            exporting: { enabled: false },

                          series: seriesOptions,
                          rangeSelector: {
                                       buttonTheme: { // styles for the buttons
                                              //fill: 'none',
                                              stroke: 'none',
                                              'stroke-width': 0,
                                              //r: 10,
                                              //width:40,
                                              style: {
                                                //color: '#039',
                                                //fontWeight: 'bold'
                                              },
                                              states: {
                                                hover: {

                                                },
                                                select: {
                                                  fill: '#b9dbf7',
                                                  style: {
                                                    color: '#3b3f42'
                                                  }
                                                }
                                              }
                                            },
                                            
                            allButtonsEnabled: true,
                            buttons: [{
                                type: 'month',
                                count: 1,
                                text: '1m'
                            }, {
                                type: 'month',
                                count: 3,
                                text: '3m'
                            }, {
                                type: 'month',
                                count: 6,
                                text: '6m'
                            }, {
                                type: 'ytd',
                                text: 'YTD'
                            }, {
                                type: 'year',
                                count: 1,
                                text: '1y'
                            }, {
                                type: 'year',
                                count: 2,
                                text: '2y'
                            }, {
                                type: 'year',
                                count: 3,
                                text: '3y'
                            }, {
                                type: 'year',
                                count: 5,
                                text: '5y'
                            }, {
                                type: 'all',
                                text: 'All'
                            }],
                            
                            selected: 4
                        } 

                      }, function (chart) {

        // apply the date pickers
        setTimeout(function () {
        	console.log("333333333333333333333");
            $('input.highcharts-range-selector', $(chart.container).parent()).datepicker();
             console.log("333333333333333333333");  
        }, 0);
    });

                  }

$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    onSelect: function () {
        this.onchange();
        this.onblur();
    }
});