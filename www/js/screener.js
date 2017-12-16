

console.log("AAAAAAAAAAAAAAAAAAAAAAA");
start_loading();
function export_table_to_csv_screener(filename,id)
     {
            var csv = [];
            var rows="";
            var cols="";  
          var rows = document.querySelectorAll("table#"+id+" thead tr");
          // console.log(rows);
          if (rows.length>0)
            {
                for (var i = 0; i < rows.length; i++) {
                var row = []; 
                var cols = rows[i].querySelectorAll("th");
                    
                   // debugger;
                   
                    for (var j = 0; j < cols.length; j++) 
                       if (id =="screener_table"){
                       if((j>0)&&(j!=6))
                       {
                        // debugger;
                        var a1 = cols[j].textContent.replace("\n"," ").replace(/,/g,"");
                        row.push(a1);
                        if(j==1)
                          {
                            row.push("Fund Manager");
                          }

                        }
                      }else{
                        if(j>0)
                       {
                        
                        var a1 = cols[j].textContent.replace("\n"," ").replace(/,/g,"");
                        row.push(a1);
                        if(j==1)
                          {
                            row.push("Fund Manager");
                          }

                        }

                      }
                csv.push(row.join(","));    
              }
              var rows = document.querySelectorAll("table#"+id+" tbody tr");
              // console.log(rows);
              
                for (var i = 0; i < rows.length; i++) {
                var row = [];
                var cols = rows[i].querySelectorAll("td");
                
                    for (var j = 0; j < cols.length; j++) 
                      if (id =="screener_table"){
                       if((j>0)&&(j!=6))
                        {
                          if(j==1)
                          {
                            // debugger;
                            // var b1 = cols[j].textContent.split("\n");
                            row.push(cols[j].firstChild.text);
                            row.push(cols[j].lastChild.textContent);

                          }
                          else
                          {
                            // debugger;
                        var b1 = cols[j].textContent.replace('<br style="pointer-events: auto;">','').replace(/,/g,"");
                        if(b1=="UnratedUnrated")
                          b1="Unrated";
                        row.push(b1);
                      }
                        }
                      }else{
                         if(j>0)
                        {
                          if(j==1)
                          {
                            // var b1 = cols[j].textContent.split("\n");
                            row.push(cols[j].firstChild.text);
                            row.push(cols[j].lastChild.textContent);

                          }
                          else
                          {
                        var b1 = cols[j].textContent.replace('<br style="pointer-events: auto;">','').replace(/,/g,"");
                        row.push(b1);

                      }
                        }


                      }
                    
                csv.push(row.join(","));    
              }
          }
        

          // Download CSV
          download_csv(csv.join("\n"), filename);
     }



        $(document).ready(function () { 

//           $(window).bind('beforeunload',function(){

//      //save info somewhere
//      // swal("kjk");
//      createCookie("asset","",-1);
     
//         createCookie("rating","",-1);
//         createCookie("amc","",-1);
//         createCookie("fund_manager","",-1);
//         createCookie("index","",-1);
//         createCookie("fund_type","",-1);
//         asset_selection=[];
//     return 'are you sure you want to leave?';


// });
          
     // download csv Screen
       document.querySelector("#screener_download").addEventListener("click", function () 
       {      var click=0;  
              
                    if($('#screener_table_div').is(':visible')) // or swal($(this).attr('id'));
                          export_table_to_csv_screener("screener.csv","screener_table");
                    if($('#annuallyTable_div').is(':visible')) // or swal($(this).attr('id'));
                          export_table_to_csv_screener("screener.csv","annuallyTable");
                     if($('#quarterlyTable_div').is(':visible')) // or swal($(this).attr('id'));
                          export_table_to_csv_screener("screener.csv","quarterlyTable");
                     if($('#monthlyTable_div').is(':visible'))// or swal($(this).attr('id'));
                          export_table_to_csv_screener("screener.csv","monthlyTable");
            
               });



$(document).on('click','input[name=chkCompare]',function(){

    var len =$("input[name=chkCompare]:checked").length;
    // swal(len);
    if(len > 4){
        swal("You can select upto 4 funds for comparison");
        $(this).prop("checked", false);
    }

// if($('input[name=chkCompare]').length > 4){
// swal('Checked');

// }
// if($('input[name=chkCompare]').is(':checked')){
//  swal('Checked');

// }
// else{
//  swal('Not checked');
// }
// })
// $('input[name=chkCompare]').click(function(){
//  swal("hi");
// if($('input[name=chkCompare]').is(':checked')){
//         swal('Checked');
//     } else {
//         swal('Not checked');
//     }
});
 });


$(document).ready(function()
    {
        // $("#quarterlyTable").tablesorter();
        // $("#quarterlyTable").tablesorter( {sortList: [[0,0], [1,0]]} );

    }
);
// $(window).load(function(){
//   $("#quarterlyTable").tablesorter();
//   $("#quarterlyTable").tablesorter( {sortList: [[0,0], [1,0]]} );
// });

        $(document).ready(function()
    {
        // $("#quarterlyTable").tablesorter();
        // $("#quarterlyTable").tablesorter( {sortList: [[0,0], [1,0]]} );
      //$("#snapShotTable").tablesorter( {sortList: [[0,0], [1,0]]} ); 
    }
);


    $('.adding-link').on('click', function(){
     window.location = "https://www.google.com/";
});


    // $(document).ready(function(){
 //     $('#filters').on('click',function(){
 //     $(".filetring-hide").hide();
 //    });
 //   });

//rating
    $(document).on('click','.hidecontent',function(){
        $(".content-hide").hide();
    });
    $(document).on('click','#one',function(){
        $(".content-hide").show();
    });
// filter

    $(document).on('click','#filters',function(){
        $(".open-closed-button-wrapper").hide();
    });
    $(document).on('click','#filter-nav',function(){
        $(".open-closed-button-wrapper").show();
    });

// columns
    $(document).on('click','.hide-choose',function(){
        // swal('hi');
        $(".hide-section").hide();
    });
    $(document).on('click','#columns-nav',function(){
        // swal('hi');
        $(".hide-section").show();
    });

    $(document).on('click','.rating-hide',function(){
        $(".rupeevest-nav-hide").hide();
    });
    $(document).on('click','.factor-hide',function(){
        $(".rupeevest-nav-hide").hide();
    });
    $(document).on('click','#rating-nav',function(){
        $(".rupeevest-nav-hide").show();
    });


        var asset_selection =[];
          var rating_selection =[];
        var amc_selection =[];
        var amc_selected_flag=0;
        var rate_selected_flag=0;
        var fund_m_selection=[];
        var manager_selected_flag=0;
         var index_selection=[];
        var index_selected_flag=0;
        var fund_type_selection=["Open Ended"];
        var fund_type_selected_flag=0;
        var fund_id=["1"];
        var column_limit = ["5","6","7","15","17","18"];
        // var column_limit = ["5","6","11","13","14","16","31"]; 
        var refresh=0;
        var asset_selected_flag=0; 
        var asset_selected_flag2=0;
        var from_date=0;
        var to_date=0;
         var ajax_flag=0;
         var overview;
        print_fund_type_selection();
      
        var slider = document.getElementById('slider');

        var slider = document.getElementById('slider1');

        var slider = document.getElementById('slider2');

        var slider = document.getElementById('slider3');

        $('#from_date').datepicker({
            format: 'dd/mm/yyyy',
            startDate: "01-01-2000",
            endDate: '-1d',
            autoclose: true,
        }).on('changeDate', function (selected){
            $('#to_date').val("");
            var choosedate ;
            choosedate = new Date(selected.date.valueOf() + (1000 * 60 * 60 * 24 * 1) );
            $('#to_date').datepicker('setStartDate', choosedate);
            $('.ptp_show').prop("disabled",false);
            // $('#error_msg_from').html("");
        });

        $('#to_date').datepicker({
            format: 'dd/mm/yyyy',
            startDate: '0d',
            endDate: '0d',  
            autoclose: true
        }).on('changeDate', function (selected){
          $('.ptp_show').prop("disabled",false);
          $('#error_msg').html("");
        });
         
  


        /*var nowTemp = new Date();
         var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

         var checkin = $('.date-picker').datepicker({
          onRender: function(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
          }
         }).on('changeDate', function(ev) {
          if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate = new Date(ev.date)
            newDate.setDate(newDate.getDate() + 1);
            checkout.setValue(newDate);
          }
          checkin.hide();
          $('#dpd2')[0].focus();
         }).data('datepicker');
         var checkout = $('#dpd2').datepicker({
          onRender: function(date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
          }
         }).on('changeDate', function(ev) {
          checkout.hide();
         }).data('datepicker');*/

        // jQuery("#Slider1").slider({ from: 0, to: 2056, step: 50, smooth: true, round: 0, skin: "plastic" });
        $(document).ready(function () {
    

           
         if (ajax_flag==0)
         {      
                $(document).ajaxStart(function () {
                    
                        $('#wait').show();
                        $('#main_div').hide();
                });
                $(document).ajaxStop(function () {
                    $('#wait').hide();
                    $('#main_div').show();
                });
                $(document).ajaxError(function () {
                    $('#wait').hide();
                    $('#main_div').show();
                });
            }
              

            $('.nav-menu').click(function () {

                var contentDiv = $(this).find('a').attr('data-toggle');
                if ($(this).hasClass('tab-active')) {

                    $(this).removeClass('tab-active');
                    $(contentDiv).removeClass('active').addClass('fade');
                    $(".tab-wrapper .tab-content").find(".active").removeClass("active").addClass("fade");
                    return false;
                     }

                $('.nav-menu').removeClass('tab-active')
                $(this).addClass('tab-active');
                if (contentDiv == "#menu1") {
                    setTimeout(function () {

                        jQuery("#Slider6").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });
                        jQuery("#Slider7").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });
                        jQuery("#Slider8").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });
                        jQuery("#Slider9").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });
                        jQuery("#Slider10").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });
                    }, 500)
                } else if (contentDiv == "#menu2") {
                    setTimeout(function () {
                        jQuery("#Slider1").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });
                        jQuery("#Slider2").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });
                        jQuery("#Slider3").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });
                        jQuery("#Slider4").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });
                        jQuery("#Slider5").slider({
                            from: 0,
                            to: 2056,
                            step: 50,
                            smooth: true,
                            round: 0,
                            skin: "plastic"
                        });

                    }, 500)
                }

                $('.tab-pane').removeClass('active').addClass('fade');
                $(contentDiv).addClass('active').removeClass('fade')

            });

            jQuery(document).on("scroll", function () {
                /*console.log('hjdbshjas');*/

            });
            $(window).scroll(function () {

                var homeClassName = $('#home').attr('class');
                var menu1ClassName = $('#menu1').attr('class');
                var menu2ClassName = $('#menu2').attr('class');
                var menu3ClassName = $('#menu3').attr('class');
                if (homeClassName == "tab-pane active") {
                    var scrollTopHeight = 476;
                } else if (menu1ClassName == "tab-pane active" || menu3ClassName == "tab-pane active") {
                    var scrollTopHeight = 630;
                } else if (menu2ClassName == "tab-pane active") {
                    var scrollTopHeight = 459;
                } else {
                    var scrollTopHeight = 205;
                }
                //swal(jQuery(document).scrollTop());
                if (jQuery(document).scrollTop() > scrollTopHeight) {
                    //jQuery('.bg-color').css({'position': 'fixed', 'top': '54px'});
                   // jQuery('.landingpage #table-main-header .bg-color th').css('width', '11.21%');
                } else {
                    //jQuery('.bg-color').css({'position': 'relative', 'top': '0px'});
                    //jQuery('.landingpage #table-main-header .bg-color th').css('width', '11%');
                }
            })

            $(".annuallyTab").css("display", "none");
            $(".quarterlyTab").css("display", "none");
            $(".monthlyTab").css("display", "none");
            $("#screener_table_div").css("display", "block");
            $("#annuallyTable_div").css("display", "none");
            $("#quarterlyTable_div").css("display", "none");
            $("#monthlyTable_div").css("display", "none");
            
            $(".snapShotTab").click(function () {
                $(".snapShotTab").addClass('active');
                $(".historicalTab").removeClass('active');
                $(".annuallyTab").css("display", "none");
                $(".quarterlyTab").css("display", "none");
                $(".monthlyTab").css("display", "none");
                $("#screener_table_div").css("display", "block");
                $("#annuallyTable_div").css("display", "none");
                $("#quarterlyTable_div").css("display", "none");
                $("#monthlyTable_div").css("display", "none");                
                //$(".snapShotTab").css({"display": "block",'background':'#b9dbf7'});
                //$(".historicalTab").css({"display": "block",'background':''});
                $('#screener_table thead').removeClass('navbar-fixed-top container');
            });
            $(".historicalTab").click(function () {
                $(".historicalTab").addClass('active');
                $(".snapShotTab").removeClass('active');
                $(".annuallyTab").addClass('active');
                $(".quarterlyTab").removeClass('active');
                $(".monthlyTab").removeClass('active');
                //$(".historicalTab").css({"display": "block"});
                //$(".snapShotTab").css({"display": "block","border-bottom": "2px solid #f1f2f2"});
                $(".annuallyTab").css({"display": "inline-block"});
                 $("#annuallyTable_div").css("display", "block");
                $(".quarterlyTab").css("display", "inline-block");
                $(".monthlyTab").css("display", "inline-block");
                 $("#screener_table_div").css("display", "none");
                $('#annuallyTable thead').removeClass('navbar-fixed-top container');
                $('#quarterlyTable thead').removeClass('navbar-fixed-top container');
                $('#monthlyTable thead').removeClass('navbar-fixed-top container');


            });
            $(".annuallyTab").click(function () {
                $(".annuallyTab").css({"display": "inline-block"});
                $(".quarterlyTab").css({"display": "inline-block"});
                $(".monthlyTab").css({"display": "inline-block"});
                $(".annuallyTab").addClass('active');
                $(".quarterlyTab").removeClass('active');
                $(".monthlyTab").removeClass('active');
                $("#screener_table_div").css("display", "none");
                $("#annuallyTable_div").css("display", "block");
                $("#quarterlyTable_div").css("display", "none");
                $("#monthlyTable_div").css("display", "none");
                $('#annuallyTable thead').removeClass('navbar-fixed-top container');
            });
            $(".quarterlyTab").click(function () {
                $(".quarterlyTab").css({"display": "inline-block"});
                $(".annuallyTab").css({"display": "inline-block"});
                $(".monthlyTab").css({"display": "inline-block"});
                $(".quarterlyTab").addClass('active');
                $(".annuallyTab").removeClass('active');
                $(".monthlyTab").removeClass('active');
                $("#screener_table_div").css("display", "none");
                $("#annuallyTable_div").css("display", "none");
                $("#quarterlyTable_div").css("display", "block");
                $("#monthlyTable_div").css("display", "none");
                $('#quarterlyTable thead').removeClass('navbar-fixed-top container');
            });
            $(".monthlyTab").click(function () {
                $(".monthlyTab").css({"display": "inline-block"});
                $(".quarterlyTab").css({"display": "inline-block"});
                $(".annuallyTab").css({"display": "inline-block"});
                $(".monthlyTab").addClass('active');
                $(".annuallyTab").removeClass('active');
                $(".quarterlyTab").removeClass('active');
                $("#screener_table_div").css("display", "none");
                $("#annuallyTable_div").css("display", "none");
                $("#quarterlyTable_div").css("display", "none");
                $("#monthlyTable_div").css("display", "block");
                 $('#monthlyTable thead').removeClass('navbar-fixed-top container');
            });
            /*$(".div-tag").on("click", function () {
                //swal("cd"+$(this).val());
                if ($(this).is(":checked")) {
                    $(".tags").append('<span class="label label-default" id="Id' + $(this).val() + '">' + $(this).attr("data-text") + '&nbsp;&nbsp;<i class="glyphicon glyphicon-remove tagClose" id="' + $(this).val() + '"></i></span>');
                } else {
                    $("#Id" + $(this).val()).remove();
                }
            });*/
           $(".asset-class-section input[type=checkbox]").on("click", function (){
            $(".tags").html('');
               $('.asset-class-section input:checked').each(function() {
               if(  $(this).hasClass('chkbox')) {}
                else{
               var selected=$(this).attr('data-text');
               $(".tags").append('<span class="label label-default" id="Id' + $(this).val() + '">' + selected + '&nbsp;&nbsp;<i data-text="'+$(this).val()+'" class="glyphicon glyphicon-remove tagClose" id="' + selected + '"></i></span>');
               }
            });
            });

            $(".asset-class-section input[name='chkAllEquity']").on("click", function (){
              if($(this).is(':checked')){
              }
              else
              {
                $('#chkAllEquity').prop('checked',false);
               }
            });
            $(".asset-class-section input[name='chkAllDebt']").on("click", function (){
              if($(this).is(':checked')){
              }
              else
              {
                $('#chkAllDebt').prop('checked',false);
               }
            });
            $(".asset-class-section input[name='chkAllHybrid']").on("click", function (){
              if($(this).is(':checked')){
              }
              else
              {
                $('#chkAllHybrid').prop('checked',false);
               }
            });
            $(".asset-class-section input[name='chkAllEtfs']").on("click", function (){
              if($(this).is(':checked')){
              }
              else
              {
                $('#chkAllEtfs').prop('checked',false);
               }
            });
            $(".asset-class-section input[name='chkAllothers']").on("click", function (){
              if($(this).is(':checked')){
              }
              else
              {
                $('#chkAllothers').prop('checked',false);
               }
            });





            $(document.body).on('click', '.tagClose', function () {
                //$(".tagClose").on("click",function(){
                var vname=$(this).attr("data-text");
               // swal(vname);
                $('input[value="'+vname+'"]').prop("checked",false);
              $(this).parent().remove();
            });
        });

        $(window).load(function () {
          // check_manager();
            //var widthOfthTable = $('#table-main-header table').width();

            //  var checkingBGcolor=setInterval(function(){   if($('table .bg-color').length>1){      $('table .bg-color').css({'width':widthOfthTable});      console.log('interval');   }
            //
            //  },1000);
            //setInterval(function () {
               // $('table .bg-color').css({'width': widthOfthTable});
            //}, 1000);
        });

$('.ck').change(function() {
        if($(this).is(":checked")) 
        {
                insert_asset_selection(this.dataset.text)
                 query_run();
        }
        // debugger;
        else
        {
            
                del_asset_selection(this.dataset.text)
                 query_run();
        // debugg
        }
       
    });

    function insert_asset_selection(value)
    {
       // swal(value.replace(/(amp;)/g, ""));
        if($.inArray(value.replace(/(amp;)/g, ""), asset_selection) > -1)
        {}
            else
            {
                asset_selected_flag1=0;
                if (asset_selection[0]=="All Funds")
                {
                    asset_selection=[];
                    asset_selected_flag=1;
                }
                asset_selection.push(value.replace(/(amp;)/g, ""));
                document.getElementById("ChkAllCategories").checked = false;
                print_asset_selection();
               
            }



    }

   
    function print_asset_selection()
    {

         $("#ui_classification").empty();
         if(asset_selection.length==0 && asset_selected_flag2==1)
         {
        
            asset_selection=["All Funds"];
         }
       
         for(var i=0;i<asset_selection.length;i++)
         {
                
                var asset="<span class='btn btn-primary btn-xs' >"+asset_selection[i]+"<span class='fund_attr_close'><span class='glyphicon glyphicon-remove asset_child'></span>";

                $("#ui_classification").append(asset);
        }
        // if(asset_selection[0]=="all" && asset_selected_flag2==1 && asset_selected_flag==1)
        //  {
        //     asset_selection=[];
        //  }
    }

 

    function del_asset_selection(value)
    {
        var index = asset_selection.indexOf(value);
        if (index > -1) {
           asset_selected_flag1=1;
           asset_selected_flag2=0;
                asset_selected_flag=1;

            asset_selection.splice(index, 1);
           
            
             print_asset_selection();
           
            unselect_asset(value);
           

             
        }
    }
   

        $(document).on('click', ".categories_all", function()
{
    if($(this).is(":checked")) 
    {
        asset_selected_flag1=0;
      
          
           for(var i=0;i<asset_selection.length;i++)
                        {
                                      //swal(fund_m_selection[i].replace(/(:| |-)/g, ""));


                                       unselect_asset(asset_selection[i]);
                        }
               asset_selection=[];
               asset_selected_flag=0;


         
            }
    else
    {

        asset_selected_flag=1;
        asset_selected_flag2=0;
        del_asset_selection(asset_selection[0]);
        print_asset_selection();
      
    }
    query_run();
});



   // $('.categories_all').click
  
        $(document).on('click', ".asset_child", function() {
               
             // debugger;    
                asset_selected_flag2=0;
                asset_selected_flag=1;
               
                  del_asset_selection(this.parentElement.parentElement.textContent);
                  // if(rating_selection.length==0)
                  // {
                  //   document.getElementById("ChkAllCategories").checked = true;
                  //   asset_selected_flag=0;
                  // }
                   query_run();
              
          });

        $("#asset_selection").click(function()
        {
            print_asset_selection();
            query_run();
           

        });


        // function query_run()
        // {
        //     if (asset_selection.length!=0 && rating_selection.length!=0 && amc_selection.length!=0)
        //     {
        //         swal("inside");
        //         if(rating_selection.length==0 && rate_selected_flag==0)
        //         {
        //             flag=1;
        //             rating_selection=["1","2","3","4","5","Unrated"];
        //         }
        //         if(amc_selection.length==0 && amc_selected_flag==0)
        //         {
        //             flag_amc=1;
        //             amc_selection=["all"];
        //         }
        //         ajax_query_call();
        //     }
        //     else
        // }

        // function  ajax_query_call()
        // {
        //         $.ajax({
        //         type: "POST",
        //         url: '/functionalities/asset_class_section?',
        //         data: { selected_schemes : asset_selection ,selected_rating : rating_selection,selected_amc : amc_selection,condn_type:"asset"},
        //         datatype:'json',
        //         success:function(data1, textStatus, jqXHR) {
        //         console.log(data1);
        //         if (flag==1)
        //         {
        //             rating_selection=[];
        //         }
        //         fill_snapshot_table(data1);
        //         fill_landing_returns(data1);
        //         }
        //         });
        // }

       function query_run()
        {
            //  swal("js");
     // createCookie("asset","",-1);
     
     //    createCookie("rating","",-1);
     //    createCookie("amc","",-1);
     //    createCookie("fund_manager","",-1);
     //    createCookie("index","",-1);
     //    createCookie("fund_type","",-1);
          
            var flag=0;// if (asset_selection.length!=0 && rating_selection.length!=0)
            var flag_amc=0
            var flag_manager=0;
            var asset_flag=0;
            // if (asset_selection.length!=0 )
            // {
                // swal("inside");
                if(rating_selection.length==0 && rate_selected_flag==0)
                {
                    flag=1;
                    
                    rating_selection=["1","2","3","4","5","Unrated"];
                }
                if(rating_selection.length==0 && rate_selected_flag==1)
                { 
                    var data1="";
                   fill_snapshot_table(data1);
                fill_landing_returns(data1);
                $("#total_res").html("0");
                return
                }


                // if(asset_selection.length==0)
                // {
                //     flag=1;
                //     asset_selection=["all"];
                // }
                if(amc_selection.length==0 && amc_selected_flag==0)
                {
                    flag_amc=1;
                    amc_selection=["all"];

                }
                else if(amc_selection.length==0 && amc_selected_flag==1)
                {
                    var data1="";
                   fill_snapshot_table(data1);
                fill_landing_returns(data1);
                $("#total_res").html("0");
                return
                }
                if(fund_m_selection.length==0 && manager_selected_flag==0)
                {
                    flag_manager=1;
                    fund_m_selection=["all"];
                }
                else if(fund_m_selection.length==0 && manager_selected_flag==1)
                {
                    var data1="";
                   fill_snapshot_table(data1);
                fill_landing_returns(data1);
                $("#total_res").html("0");
                return
                }
                if(index_selection.length==0 && index_selected_flag==0)
                {
                    
                    index_selection=["all"];
                }
                else if(index_selection.length==0 && index_selected_flag==1)
                {
                    var data1="";
                   fill_snapshot_table(data1);
                fill_landing_returns(data1);
                $("#total_res").html("0");
                return
                }
                else if(fund_id.length==0 && fund_type_selected_flag==1)
                {
                    var data1="";
                   fill_snapshot_table(data1);
                fill_landing_returns(data1);
                $("#total_res").html("0");
                return
                }
                 if(asset_selection.length==0 && asset_selected_flag==0)
                {
                    asset_flag=1;
                    asset_selection=["All Funds"];
                    print_asset_selection();

                }
                else if(asset_selection.length==0 && asset_selected_flag==1)
                {
                    var data1="";
                   fill_snapshot_table(data1);
                fill_landing_returns(data1);
                $("#total_res").html("0");
                return
                }
                else if(fund_type_selection.length==0 && fund_type_selected_flag==1)
                {
                    var data1="";
                   fill_snapshot_table(data1);
                fill_landing_returns(data1);
                $("#total_res").html("0");
                return
                }

                // check_manager();

                $.ajax({
                type: "POST",
                url: curr_ip+'functionalities/asset_class_section?',
                data: { selected_schemes : asset_selection ,selected_rating : rating_selection,selected_amc : amc_selection,selected_manager : fund_m_selection,selected_index : index_selection,selected_fund_type : fund_id,selected_from_date : from_date,selected_to_date : to_date,condn_type:"asset"},
                datatype:'json',
                success:function(data1, textStatus, jqXHR) {
                console.log(data1);
               
                // if (flag==1)
                // {
                //     swal("rating")
                //     rating_selection=[];
                // }
                if (data1.schemedata.length==0)
                {
                    var data1="";
                   fill_snapshot_table(data1);
                     fill_landing_returns(data1);
                     $("#total_res").html("0");

                }
                else
                {
                if (asset_flag==1)
                {
                    asset_selection=[];
                }

                    fill_snapshot_table(data1);
                    fill_landing_returns(data1);
                    sorting_mobile();

                    // if (asset_selection.length >0)
                    // {
                        
                    //     var asset_name=asset_selection[0];
                    //     for(var i=1;i<asset_selection.length;i++)
                    //     {
                    //         asset_name=asset_name+",";
                    //         asset_name=asset_name+asset_selection[i];
                    //     }
                    //     asset_name=asset_name+";"
                    //     // swal(asset_name);
                    //     createCookie("asset",asset_name,1);
                        
                    //     // swal(document.cookie);
                    // }
                    // if (rating_selection.length >0)
                    // {
                        
                    //     var rating_val=rating_selection[0];
                    //     for(var i=1;i<rating_selection.length;i++)
                    //     {
                    //         rating_val=rating_val+",";
                    //         rating_val=rating_val+rating_selection[i];
                    //     }
                    //     rating_val=rating_val+";"
                    //     // swal(rating_val);
                    //     createCookie("rating",rating_val,1);
                        
                    //     // swal(document.cookie);
                    // }
                    // if (amc_selection.length >0)
                    // {
                        
                    //     var amc_val=amc_selection[0];
                    //     for(var i=1;i<amc_selection.length;i++)
                    //     {
                    //         amc_val=amc_val+",";
                    //         amc_val=amc_val+amc_selection[i];
                    //     }
                    //     amc_val=amc_val+";"
                    //     // swal(amc_val);
                    //     createCookie("amc",amc_val,1);
                        
                    //     // swal(document.cookie);
                    // }

                    // if (fund_m_selection.length >0)
                    // {
                        
                    //     var manager_val=fund_m_selection[0];
                    //     for(var i=1;i<fund_m_selection.length;i++)
                    //     {
                    //         manager_val=manager_val+",";
                    //         manager_val=manager_val+fund_m_selection[i];
                    //     }
                    //     manager_val=manager_val+";"
                    //     // swal(manager_val);
                    //     createCookie("fund_manager",manager_val,1);
                        
                    //     // swal(document.cookie);
                    // }
                    // if (index_selection.length >0)
                    // {
                        
                    //     var index_val=index_selection[0];
                    //     for(var i=1;i<index_selection.length;i++)
                    //     {
                    //         index_val=index_val+",";
                    //         index_val=index_val+index_selection[i];
                    //     }
                    //     // swal(manager_val);
                    //     index_val=index_val+";"
                    //     createCookie("index",index_val,1);
                        
                    //     // swal(document.cookie);
                    // }
                    // if (fund_type_selection.length >0)
                    // {
                        
                    //     var fund_type_val=fund_type_selection[0];
                    //     for(var i=1;i<fund_type_selection.length;i++)
                    //     {
                    //         fund_type_val=fund_type_val+",";
                    //         fund_type_val=fund_type_val+fund_type_selection[i];
                    //     }
                    //     // swal(manager_val);
                    //     createCookie("fund_type",fund_type_val,1);
                        
                    //     // swal(document.cookie);
                    // }
                }
                }
                });
            // }
            // else
            // {
            //     var data1="";
            //     fill_snapshot_table(data1);
            //     fill_landing_returns(data1);

            // }


            
        }


        function  select_asset()
        {
           // swal(asset_selection[0].replace(/(:| |-)/g, ""));
            document.getElementById(asset_selection[0].replace(/(:| |-|amp;)/g, "")).checked = true;

        }
        function unselect_asset(value)
        {
             
             if(value=="All Funds")
             {
                document.getElementById("ChkAllCategories").checked = false;
                asset_selected_flag=1;
             }
            else
            {
             document.getElementById(value.replace(/(:| |-)/g, "")).checked = false;
            }
        }

        $('.rating').change(function() {
        
         document.getElementById("chkratingAll").checked = false;


            if($(this).is(":checked")) 
        {
            // debugger;
           
           if(rating_selection.length==6)
           {
            rating_selection=[];
           }
           
            rating_selection.push(this.value);
            
        }
        else
        {
            del_rating_selection(this.value);
        }
        if(rating_selection.length==0)
                  {
                    document.getElementById("chkratingAll").checked = true;
                    rate_selected_flag=0;
                  }
        print_rating_selection();
        query_run();

        });

        function print_rating_selection()
        {
           
             $("#ui_rating").empty();
            $("#rating_display").css("display", "block");
            if (rating_selection.length==0)
                {
                    // $("#rating_display").attr('style','display:none');
                     $('#rating_display').css("display", "none");
                }

         for(var i=0;i<rating_selection.length;i++)
         {
                var star="";
                if(rating_selection[i]!="Unrated")
                  star=" Star Funds";

                var asset="<span class='btn btn-primary btn-xs' >"+rating_selection[i]+"<span>"+star+"</span><span class='fund_attr_close'><span class='glyphicon glyphicon-remove rate_child'></span>";

                $("#ui_rating").append(asset);
            }
        }

         $(document).on('click', ".rate_child", function() {
                  // debugger;
                  var value= this.parentElement.parentElement.innerHTML.split("<");
                  del_rating_selection(value[0]);
                  document.getElementById("rating"+value[0]).checked = false;
                  if(rating_selection.length==0)
                  {
                    document.getElementById("chkratingAll").checked = true;
                    rate_selected_flag=0;
                  }
                  print_rating_selection();
                  query_run();
         });
         function del_rating_selection(value)
         {
            
            var index = rating_selection.indexOf(value);
            if (index > -1) 
            {
            rate_selected_flag=1;
            rating_selection.splice(index, 1);
            }
                document.getElementById("chkratingAll").checked = false;
                

                
                
                
            }

            $(document).on('click', ".amc", function() {
                document.getElementById("ChkAmc").checked = false;

            if($(this).is(":checked")) 
        {
             var index = amc_selection.indexOf("all");
            if (index > -1) {
           
            amc_selection.splice(index, 1);
                }
          
                amc_selection.push(this.value);
            
            
        }
        else
        {
            del_amc_selection(this.value);
        }
         if(amc_selection.length==0)
                  {
                    document.getElementById("ChkAmc").checked = true;
                    amc_selected_flag=0;
                  }
        print_amc_selection();
        query_run();
        // query_run();

        });

           function print_amc_selection()
           {
                $("#ui_filter").empty();
                $("#amc_display").css("display", "block")
                
                 if (amc_selection.length==0 || amc_selection[0]=="all")
                {
                    // $("#rating_display").attr('style','display:none');
                     $('#amc_display').css("display", "none");
                }

         for(var i=0;i<amc_selection.length;i++)
         {
                
                var asset="<span class='btn btn-primary btn-xs' >"+amc_selection[i]+"<span class='fund_attr_close'><span class='glyphicon glyphicon-remove amc_child'></span>";

                $("#ui_filter").append(asset);
            }
           }

            function del_amc_selection(value)
         {
            
            var index = amc_selection.indexOf(value);
            if (index > -1) {
            amc_selected_flag=1
            amc_selection.splice(index, 1);
                }
                
                
            }
             $(document).on('click', ".amc_child", function() {
           
                  del_amc_selection(this.parentElement.parentElement.textContent);
                  document.getElementById(this.parentElement.parentElement.textContent.replace(/(:| |-)/g, "")).checked = false;
                  if(amc_selection.length==0)
                  {
                    document.getElementById("ChkAmc").checked = true;
                    amc_selected_flag=0;
                  }
                  print_amc_selection();
                  query_run();
         });

              $(document).on('click', ".amc_all", function() 
             {
                // swal("coming here-----> "+ $(this).is(":checked")); 
               if($(this).is(":checked")) 
                {
                        $('.amc').attr('checked',false);
                        
                   
                        amc_selection=[];
                        amc_selection=["all"];
                }
                else
                {
                        $('.amc').attr('checked',false); 
                        amc_selected_flag=1;
                        amc_selection=[]; 
                }
                print_amc_selection();
                query_run();
             });

             function menu_selector()
             {
                $(".tab-wrapper .tab-content").find(".active").removeClass("active").addClass("fade");
                if (asset_selection.length==0)
                {

                    $("#home.tab-pane").removeClass("fade").addClass("active");
                    $("#main-tabs li#one").addClass("tab-active");
                    $("#main-tabs li#filter-nav").removeClass("tab-active");
                    $("#main-tabs li#columns-nav").removeClass("tab-active");
                    $("#main-tabs li#date-nav").removeClass("tab-active");

                }
                else if (rating_selection.length==0)
                {
                    
                    $("#menu2.tab-pane").removeClass("fade").addClass("active");
                    $("#main-tabs li#one").removeClass("tab-active");
                    $("#main-tabs li#filter-nav").addClass("tab-active");
                    $("#main-tabs li#columns-nav").removeClass("tab-active");
                    $("#main-tabs li#date-nav").removeClass("tab-active");

                }
                else if (amc_selection.length==0)
                {
                    
                    $("#menu2.tab-pane").removeClass("fade").addClass("active");
                    $("#main-tabs li#one").removeClass("tab-active");
                    $("#main-tabs li#filter-nav").addClass("tab-active");
                    $("#main-tabs li#columns-nav").removeClass("tab-active");
                    $("#main-tabs li#date-nav").removeClass("tab-active");

                }
                else if (fund_m_selection.length==0)
                {
                    
                    $("#menu2.tab-pane").removeClass("fade").addClass("active");
                    $("#main-tabs li#one").removeClass("tab-active");
                    $("#main-tabs li#filter-nav").addClass("tab-active");
                    $("#main-tabs li#columns-nav").removeClass("tab-active");
                    $("#main-tabs li#date-nav").removeClass("tab-active");

                }
                else
                {
                    
                    $("#menu2.tab-pane").removeClass("fade").addClass("active");
                    $("#main-tabs li#one").removeClass("tab-active");
                    $("#main-tabs li#filter-nav").addClass("tab-active");
                    $("#main-tabs li#columns-nav").removeClass("tab-active");
                    $("#main-tabs li#date-nav").removeClass("tab-active");

                }
             }

             $(document).on('click', ".f_manager", function() {
                 document.getElementById("fmanager").checked = false;

            if($(this).is(":checked")) 
        {
             var index = fund_m_selection.indexOf("all");
            if (index > -1) {
           
            fund_m_selection.splice(index, 1);
                }
          
                fund_m_selection.push(this.value);
            
            
        }
        else
        {
            del_manager_selection(this.value);
        }
        if(fund_m_selection.length==0)
                  {
                    document.getElementById("fmanager").checked = true;
                    manager_selected_flag=0;
                  }
        print_manager_selection();
        query_run();
        // query_run();

        });

             function del_manager_selection(value)
         {
            
            var index = fund_m_selection.indexOf(value);
            if (index > -1) {
            manager_selected_flag=1
            fund_m_selection.splice(index, 1);
                }
                
                
            }

            function print_manager_selection()
           {
                $("#ui_manager").empty();
                $("#manager_display").css("display", "block")
                
                 if (fund_m_selection.length==0 || fund_m_selection[0]=="all")
                {
                    // $("#rating_display").attr('style','display:none');
                     $('#manager_display').css("display", "none");
                }

         for(var i=0;i<fund_m_selection.length;i++)
         {
                
                var asset="<span class='btn btn-primary btn-xs' >"+fund_m_selection[i]+"<span class='fund_attr_close'><span class='glyphicon glyphicon-remove manager_child'></span>";

                $("#ui_manager").append(asset);
            }
           }


           $(document).on('click', ".manager_child", function() {
            // swal(this.parentElement.parentElement.textContent);
                  del_manager_selection(this.parentElement.parentElement.textContent);
                  document.getElementById(this.parentElement.parentElement.textContent.replace(/(:| |-)/g, "")).checked = false;
                  if(fund_m_selection.length==0)
                  {
                    document.getElementById("fmanager").checked = true;
                    manager_selected_flag=0;
                  }
                  print_manager_selection();
                  query_run();
         });


              $(document).on('click', ".Chkfmanager", function() 
             {
                // swal("coming here-----> "+ $(this).is(":checked")); 
               if($(this).is(":checked")) 
                {
                        $('.f_manager').attr('checked',false);
                        
                        manager_selected_flag=0;
                        fund_m_selection=[];
                        fund_m_selection=["all"];
                }
                else
                {
                        $('.f_manager').attr('checked',false); 
                        manager_selected_flag=1;
                        fund_m_selection=[]; 
                }
                print_manager_selection();
                query_run();
             });



               $(document).on('click', ".index", function() {
                 document.getElementById("fund_index").checked = false;

            if($(this).is(":checked")) 
        {
             var index = index_selection.indexOf("all");
            if (index > -1) {
           
            index_selection.splice(index, 1);
                }
          
                index_selection.push(this.value);
            
            
        }
        else
        {
            del_index_selection(this.value);
        }
        if(index_selection.length==0)
                  {
                    document.getElementById("fund_index").checked = true;
                    index_selected_flag=0;
                  }
        print_index_selection();
        query_run();
        // query_run();

        });

               function del_index_selection(value)
         {
            
            var index = index_selection.indexOf(value);
            if (index > -1) {
            index_selected_flag=1
            index_selection.splice(index, 1);
                }
                
                
            }

            function print_index_selection()
           {
                $("#ui_index").empty();
                $("#index_display").css("display", "block")
                
                 if (index_selection.length==0 || index_selection[0]=="all")
                {
                    // $("#rating_display").attr('style','display:none');
                     $('#index_display').css("display", "none");
                }

         for(var i=0;i<index_selection.length;i++)
         {
                
                var asset="<span class='btn btn-primary btn-xs' >"+index_selection[i]+"<span class='fund_attr_close'><span class='glyphicon glyphicon-remove index_child'></span>";

                $("#ui_index").append(asset);
            }
           }

           $(document).on('click', ".index_child", function() {
            // swal(this.parentElement.parentElement.textContent);
                  del_index_selection(this.parentElement.parentElement.textContent);
                  document.getElementById(this.parentElement.parentElement.textContent.replace(/(:| |-)/g, "")).checked = false;
                   if(index_selection.length==0)
                  {
                    document.getElementById("fund_index").checked = true;
                    index_selected_flag=0;
                  }
                  print_index_selection();
                  query_run();
         });


              $(document).on('click', ".f_index", function() 
             {
                // swal("coming here-----> "+ $(this).is(":checked")); 
               if($(this).is(":checked")) 
                {
                        $('.index').attr('checked',false);
                        
                        index_selected_flag=0;
                        index_selection=[];
                        index_selection=["all"];
                }
                else
                {
                        $('.index').attr('checked',false); 
                        index_selected_flag=1;
                        index_selection=[]; 
                }
                print_index_selection();
                query_run();
             });


     $(document).on('click', ".fund_type", function() {
                 // document.getElementById("fund_index").checked = false;

            if($(this).is(":checked")) 
        {
                if(this.value=="Open Ended")
                {
                    fund_id.push("1");
                }
                else if(this.value=="Closed Ended")
                {
                    fund_id.push("2");
                }
                else if(this.value=="Interval")
                {
                    fund_id.push("3");
                }
                fund_type_selected_flag=0;

                fund_type_selection.push(this.value);
            
            
        }
        else
        {
            del_fund_type_selection(this.value);
        }
        if(fund_id.length==0)
                  {
                    document.getElementById("OpenEnded").checked = true;
                    fund_type_selection=["Open Ended"]
                    fund_id=["1"]
                    fund_type_selected_flag=0;
                    print_fund_type_selection();
                  }
        print_fund_type_selection();
        query_run();
        // query_run();

        });
   

        function del_fund_type_selection(value)
         {
           // debugger;
            var index = fund_type_selection.indexOf(value);
            if (index > -1) {
            fund_type_selected_flag=1;
             // swal(value);
             fund_id.splice(index, 1);
            fund_type_selection.splice(index, 1);
                }
                
                
            }

            function print_fund_type_selection()
           {
                $("#ui_fund_type").empty();
                // $("#FundType_display").css("display", "block")
                
                 // if (fund_type_selection.length==0 || fund_type_selection[0]=="all")
                if (fund_type_selection.length==0 )
                {
                    // $("#rating_display").attr('style','display:none');
                     $('#FundType_display').css("display", "none");
                }
                else
                {
                    $('#FundType_display').css("display", "block");
                }

         for(var i=0;i<fund_type_selection.length;i++)
         {
                
                var asset="<span class='btn btn-primary btn-xs' >"+fund_type_selection[i]+"<span class='fund_attr_close'><span class='glyphicon glyphicon-remove fund_type_child'></span>";

                $("#ui_fund_type").append(asset);
            }
           }

           $(document).on('click', ".fund_type_child", function() {
           
                  del_fund_type_selection(this.parentElement.parentElement.textContent);
                   print_fund_type_selection();
                  document.getElementById(this.parentElement.parentElement.textContent.replace(/(:| |-)/g, "")).checked = false;
                 if(fund_id.length==0)
                  {
                    document.getElementById("OpenEnded").checked = true;
                    fund_type_selection=["Open Ended"]
                    fund_id=["1"]
                    fund_type_selected_flag=0;
                    print_fund_type_selection();
                  }
                  query_run();
         });

            
           

            // function tick_checkbox_2()
            // {
            //     swal(index_selection[0].replace(/(:| |-)/g, ""));
            //     document.getElementById(index_selection[0].replace(/(:| |-)/g, "")).checked = true;
            // }


             $(document).on('click', ".ptp_show", function()
             {
               if(column_limit.length>=8 && column_limit.indexOf("31")==-1)
               {
                 swal("Max. 8 columns can be selected");
               }
               else
               {
                        from_date=$("#from_date").val();
                       to_date=$("#to_date").val();
                                                
                        if(from_date == "" && to_date == "")
                        {
                          $('.ptp_show').prop("disabled",true);
                          $('#error_msg').html("Start Date and End Date is required");
                          $("#error_msg").css("color", "#da4453");
                        }
                       else if(to_date == "")
                       {
                        // swal("null");
                        $('.ptp_show').prop("disabled",true);
                        $('#error_msg').html("End Date is required");
                        $("#error_msg").css("color", "#da4453");
                       }
                       else if(from_date == "")
                       {
                        // swal("null");
                        $('.ptp_show').prop("disabled",true);
                        // $('#error_msg_from').html("Start Date is required");
                        // $("#error_msg_from").css("color", "#da4453");
                       }
                       else
                       {
                        $('.ptp_show').prop("disabled",false)
                        $('#error_msg').html("");
                        // $('#error_msg_from').html("");
                       }
                       

                      // var from_d=new Date(from_date);
                      //  var to_d=new Date(to_date);
                      // // swal(from_date);
                      
                      
                      //                if (from_d>to_d)
                      // {
                      //    swal("To date should be greater than from date");
                      // }
                      // else
                      {
                            if(column_limit.indexOf("31")==-1)
                                 {
                                    column_limit.push("31");    
                                 }

                                 if (!($('.ptp_show').is(":disabled")))
                                {

                                query_run();
                              }

                      }
               }
               

             });



        $(document).on('click', ".ptp_remove", function()
              {
                from_date=$("#from_date").val("");
                to_date=$("#to_date").val("");
                from_date=0;
                to_date=0;
                $('.ptp_show').prop("disabled",false)
                 $('#error_msg').html("");
                 if(column_limit.indexOf("31")!=-1)
                 {
                    column_limit.splice(column_limit.indexOf("31"),1);

                     query_run();
                 }


              });

$(document).ready(function()
    {  
         $(".dropbox_close").click(function(){
            $(".tab-wrapper .tab-content").find(".active").removeClass("active").addClass("fade");
            $("#main-tabs li").removeClass("tab-active");
             $('.ptp_show').prop("disabled",false)
                 $('#error_msg').html("");
                 $('#from_date').val("");
                 $('#to_date').val("");

         });

       
        $(".reset_asset").click(function(){         
               for(var i=0;i<asset_selection.length;i++)
                        {
                          if(asset_selection[i]=="All Funds")
                            document.getElementById("ChkAllCategories").checked = false;
                          else
                            document.getElementById(asset_selection[i].replace(/(:| |-)/g, "")).checked = false;
                        }
                        asset_selection = [];
                        asset_selection.push("Equity : Large Cap");

                   query_run();

                   print_asset_selection();

                   for(var i=0;i<asset_selection.length;i++)
                        {
                                      //swal(fund_m_selection[i].replace(/(:| |-)/g, ""));
                                       document.getElementById(asset_selection[i].replace(/(:| |-)/g, "")).checked = true;
                        }
         });


        
        $(".reset_filter").click(function(){   
                 

                    // rating_selection
                    // amc_selection
                    // fund_m_selection
                    // index_selection
               //      // fund_type_selection
                  

               // for(var i=0;i<rating_selection.length;i++)
               //          {
               //                         document.getElementById("rating"+rating_selection[i].replace(/(:| |-)/g, "")).checked = false;
               //          }

               //          rating_selection = [];
                        
               //          rating_selection =["1", "2", "3", "4", "5", "Unrated"];
               //     query_run();

               //     print_rating_selection();

                   document.getElementById("chkratingAll").checked = true;


                      if (amc_selection[0]!="all"){
                      for(var i=0;i<amc_selection.length;i++)
                        {
                                       document.getElementById(amc_selection[i].replace(/(:| |-)/g, "")).checked = false;
                        }
                      }
                   
                    document.getElementById("ChkAmc").checked = true;  
                    amc_selection=[];
                    amc_selection=["all"];
                    print_amc_selection();



                     if (fund_m_selection[0]!="all"){
                      for(var i=0;i<fund_m_selection.length;i++)
                        {
                                       document.getElementById(fund_m_selection[i].replace(/(:| |-)/g, "")).checked = false;
                        }
                      }
                   
                    document.getElementById("fmanager").checked = true;  
                    fund_m_selection=[];
                    fund_m_selection=["all"];
                    print_manager_selection();

                    if (index_selection[0]!="all"){
                      for(var i=0;i<index_selection.length;i++)
                        {
                                       document.getElementById(index_selection[i].replace(/(:| |-)/g, "")).checked = false;
                        }
                      }
                   
                    document.getElementById("fund_index").checked = true;  
                    index_selection=[];
                    index_selection=["all"];
                    print_index_selection();

                     for(var i=0;i<fund_type_selection.length;i++)
                        {
                                       document.getElementById(fund_type_selection[i].replace(/(:| |-)/g, "")).checked = false;
                        }
                    document.getElementById("OpenEnded").checked = true;  
                    fund_type_selection=[];
                    fund_id=[];
                    fund_type_selection=["Open Ended"];
                    fund_id=["1"];
                    print_fund_type_selection();
                   
                   



                   // $(".amc_all").click();
                   //  document.getElementById("fmanager").checked = true;

                   //  $(".Chkfmanager").click();
                   //   document.getElementById("fund_index").checked = true;
                   //  $(".f_index").click();

                   rating_all();
                   
                        
         });



        
            $(".reset_column").click(function(){         
              
              column_limit = []; 
              column_limit = ["5", "11", "13", "14", "6", "31"];

               get_selected_item();
             });

       


    });

function start_loading()
{
  console.log("1. in startloading---");
  if (window.performance) 
  {
    console.info("window.performance work's fine on this browser");
  }
  if (performance.navigation.type == 1) 
  {
    console.info( "This page is reloaded" );
    refresh=1;


        asset_selection=[];
        rating_selection =[];
        amc_selection =[];
        amc_selected_flag=0;
        rate_selected_flag=0;
        fund_m_selection=[];
        manager_selected_flag=0;
         index_selection=[];
        index_selected_flag=0;
        fund_type_selection=["Open Ended"];
        fund_type_selected_flag=0;
        fund_id=["1"];


} 
else 
{
         
  }


   fundmanager();
  
       $('#main_1').css("display", "block");
      $("#main_1 *").css('pointer-events','none');

}

function stop_loading()
{ 
    console.log("6 ---In stop Loading ");

    setTimeout(function(){
     $('#wait_1').css("display", "none");
      // $('#main_1').css("display", "block");
      $('#main_1').css("opacity", "1");
      $("#main_1 *").css('pointer-events','auto');
      check_manager();
      check_amc();
      check_index();
   
 //your code here
}, 1200);
      // $('#wait_1').css("display", "none");
      // $('#main_1').css("display", "block");
        // createCookie(" asset","",-1);
     
        // createCookie(" rating","",-1);
        // createCookie(" amc","",-1);
        // createCookie(" fund_manager","",-1);
        // createCookie(" index","",-1);
        // createCookie(" fund_type","",-1);
        // swal("stop");
        // swal(document.cookie);
        // display_check();

        // check_amc_index_manager();
         display_check();
          sorting_mobile();
    
      // swal("stop");
}

function check_amc()
{
    // swal("in function");
    if(amc_selection.length>0)
    {
            // print_amc_selection();
             if (amc_selection[0]!="all")
             {
                // document.getElementById("ChkAmc").checked = false;
                for(var i=0;i< amc_selection.length;i++)
            {
                 // swal(amc_selection[i].replace(/(:| |-)/g, ""));
              document.getElementById(amc_selection[i].replace(/(:| |-)/g, "")).checked = true;
            }
             }
             // amc_selection=[];
             
            
    }
}
function check_manager()
{
  
    if(fund_m_selection.length>0)
    {
             // print_manager_selection();
             if (fund_m_selection[0]!="all")
             {
                // document.getElementById("fmanager").checked = false;
                  for(var i=0;i< fund_m_selection.length;i++)
                {
                  document.getElementById(fund_m_selection[i].replace(/(:| |-)/g, "")).checked = true;
                 
                }
             }
            // for(var i=0;i< fund_m_selection.length;i++)
            // {
            //   document.getElementById(fund_m_selection[i].replace(/(:| |-)/g, "")).checked = true;
            // }
            // fund_m_selection=[];
    }
}
function check_index()
{
    if(index_selection.length>0)
    {
             print_index_selection();
             if (index_selection[0]!="all")
             {
                // document.getElementById("fund_index").checked = false;
                for(var i=0;i< index_selection.length;i++)
            {
              document.getElementById(index_selection[i].replace(/(:| |-)/g, "")).checked = true;
            }
             }
            
            // for(var i=0;i< fund_m_selection.length;i++)
            // {
            //   document.getElementById(fund_m_selection[i].replace(/(:| |-)/g, "")).checked = true;
            // }
            // index_selection=[];
    }
}

function display_check()
{
  $(".ck").attr('checked', false);
  $(".rating").attr('checked', false);
   
   $(".amc").attr('checked', false);
   $(".f_manager").attr('checked', false);
   $(".index").attr('checked', false);
   $(".fund_type").attr('checked', false);
  
    if(asset_selection.length>0)
    {
        print_asset_selection();
        for(var i=0;i< asset_selection.length;i++)
        {
          if(asset_selection[i]=='All Funds')
          {
            document.getElementById("ChkAllCategories").checked = true;
          }
          else
          {
          document.getElementById(asset_selection[i].replace(/(:| |-)/g, "")).checked = true;
        }
           document.getElementById("ChkAmc").checked = true;
          document.getElementById("fund_index").checked = true;
          document.getElementById("fmanager").checked = true;
      }
      // asset_selection=[];
     
    }

    if(rating_selection.length>0)
    {
         
         if (rating_selection.length!=6)
         {
            print_rating_selection();
            for(var i=0;i< rating_selection.length;i++)
            {
              document.getElementById("rating"+rating_selection[i].replace(/(:| |-)/g, "")).checked = true;
            }
            document.getElementById("chkratingAll").checked = false;
        }
        // rating_selection=[];
    }
    if(amc_selection.length>0)
    {
            print_amc_selection();
             if (amc_selection[0]!="all")
             {
                document.getElementById("ChkAmc").checked = false;
            //     for(var i=0;i< amc_selection.length;i++)
            // {
            //      swal(amc_selection[i].replace(/(:| |-)/g, ""));
            //   document.getElementById(amc_selection[i].replace(/(:| |-)/g, "")).checked = true;
            // }
             }
             // amc_selection=[];
             
            
    }
    if(fund_m_selection.length>0)
    {
             print_manager_selection();
             if (fund_m_selection[0]!="all")
             {
                document.getElementById("fmanager").checked = false;
             }
            // for(var i=0;i< fund_m_selection.length;i++)
            // {
            //   document.getElementById(fund_m_selection[i].replace(/(:| |-)/g, "")).checked = true;
            // }
            // fund_m_selection=[];
    }
    if(index_selection.length>0)
    {
             print_index_selection();
             if (index_selection[0]!="all")
             {
                document.getElementById("fund_index").checked = false;
             }
            
            // for(var i=0;i< fund_m_selection.length;i++)
            // {
            //   document.getElementById(fund_m_selection[i].replace(/(:| |-)/g, "")).checked = true;
            // }
            // index_selection=[];
    }
    if(fund_type_selection.length>0)
    {
             print_fund_type_selection();
            for(var i=0;i< fund_type_selection.length;i++)
            {
              document.getElementById(fund_type_selection[i].replace(/(:| |-)/g, "")).checked = true;
            }
            // fund_type_selection=[];
    }

    document.getElementById("chkratingAll").checked = true;
}

function sorting_mobile()
{
  var tapped=false
    $("#main_div table tr th").on("touchstart",function(e){
        if(!tapped){ //if tap is not set, set up single tap
          tapped=setTimeout(function(){
              tapped=null
              //insert things you want to do when single tapped
          },300);   //wait 300ms then run single click code
        } else {    //tapped within 300ms of last tap. double tap
          clearTimeout(tapped); //stop single tap callback
          tapped=null
          //insert things you want to do when double tapped
        }
        e.preventDefault()
    });
}


        $(document).ready(function(){ 

        var mq = window.matchMedia("screen and (min-width: 768px)");
    if (mq.matches) {      

            $(window).scroll(function() { 
              if($("#snapshottable_div").hasClass("d_none"))
              {
                var top = parseInt($('#annuallyTable').offset().top - $(window).scrollTop()); 
              
              if( top <= 80 ){
                    $('#annuallyTable thead').addClass('navbar-fixed-top container');
                    $('#annuallyTable thead').css({"padding-top": "5.5em", "background":"#fff", "z-index":"1"});
                    $('#annuallyTable thead tr').css({"border-top": "1px solid #ddd"});

                    //$('#comparison_basic').css({"padding-top": "16em"});
              }
              else {
                    $('#annuallyTable thead').removeClass('navbar-fixed-top container');
                    $('#annuallyTable thead').css({"padding-top": "0", "background":"#fff", "z-index":"1"});
                    //$('#comparison_basic').css({"padding-top": "0"});
              }


              var top1 = parseInt($('#quarterlyTable').offset().top - $(window).scrollTop()); 
              
              if( top1 <= 80 ){
                    

                    $('#quarterlyTable thead').addClass('navbar-fixed-top container');
                    $('#quarterlyTable thead').css({"padding-top": "5.5em", "background":"#fff", "z-index":"1"});
                    $('#quarterlyTable thead tr').css({"border-top": "1px solid #ddd"});


                    //$('#comparison_basic').css({"padding-top": "16em"});
              }
              else {
                   
                    $('#quarterlyTable thead').removeClass('navbar-fixed-top container');
                    $('#quarterlyTable thead').css({"padding-top": "0", "background":"#fff", "z-index":"1"});

                    
              }

              var top2 = parseInt($('#monthlyTable').offset().top - $(window).scrollTop()); 
              
              if( top2 <= 80 ){
                   
                    $('#monthlyTable thead').addClass('navbar-fixed-top container');
                    $('#monthlyTable thead').css({"padding-top": "5.5em", "background":"#fff", "z-index":"1"});
                    $('#monthlyTable thead tr').css({"border-top": "1px solid #ddd"});


                    //$('#comparison_basic').css({"padding-top": "16em"});
              }
              else {
                    
                    $('#monthlyTable thead').removeClass('navbar-fixed-top container');
                    $('#monthlyTable thead').css({"padding-top": "0", "background":"#fff", "z-index":"1"});
              }

              var top3 = parseInt($('#screener_table').offset().top - $(window).scrollTop()); 
              
              if( top3 <= 80 ){
                   //var ths = $('#screener_table thead th');
                    $('#screener_table thead').addClass('navbar-fixed-top container');
                    $('#screener_table thead').css({"padding-top": "5.5em", "background":"#fff", "z-index":"1"});
                    $('#screener_table thead tr').css({"border-top": "1px solid #ddd"});
                    

                    

                    

                                   

              }
              else {
                    
                    $('#screener_table thead').removeClass('navbar-fixed-top container');
                    $('#screener_table thead').css({"padding-top": "0", "background":"#fff", "z-index":"1"});
              }
            }


               });

          }


          var mq = window.matchMedia("screen and (min-width: 768px ) and (max-width: 1024px)");
            if (mq.matches) { 
                
                $("#rv_index #menu2 .pull-right span:contains('Select')").css( "display", "none" );
                    
              }

          var mq = window.matchMedia("screen and (max-width: 1024px)");
            if (mq.matches) { 
                
                $('.aqm').insertBefore('.docp');               
                    
              }


          //dismiss popover on iphone
        $('#rv_index').on('click', function (e) {
            $('[data-toggle="popover"]').each(function () {
                if(!$(this).is(e.target) &&
                        $(this).has(e.target).length === 0 &&
                        $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });
        });


       


        }); 

 /*$(document).ready(function(){       

            $(document).scroll(function() { 
                var topLC300916 = parseInt($('#LC300916').offset().top - $(document).scrollTop()); 
              
              if( topLC300916 <= 250 ){$("#LC300916").popover('destroy').popover({trigger: "hover focus", placement: "bottom"});}

               });

        });  
 
   $(window).scroll(function(){
      if ($(this).scrollTop() > 80) {
          $('#screener_table thead').addClass('navbar-fixed-top container');
          $('#screener_table thead').css({"padding-top": "7em", "background":"#fff", "z-index":"1"});
          //$('#comparison_basic').css({"padding-top": "16em"});
      } else {
          $('#screener_table thead').removeClass('navbar-fixed-top container');
          $('#screener_table thead').css({"padding-top": "0", "background":"#fff", "z-index":"1"});
          //$('#comparison_basic').css({"padding-top": "0"});
      }
  });*/

     $(document).ready(function(){

        $("[data-toggle=popover]").popover();
        
        $( ".FundCategory").hover(function(){


            var res = (this.parentElement.parentElement.childNodes[this.parentElement.parentElement.childElementCount].innerHTML);
            // debugger;
              $('.FundCategory').attr('data-content', res);
            //  // $('.FundCategory').attr('data-content','Hi Akansha');
            // $(".FundCategory").popover('toggle');
         });

      });

  $( document ).ready(function() {
    var mq = window.matchMedia("screen and (max-width: 768px )");
      if (mq.matches) 
      {
        /* Asset class selection start */
        $("#db_selector").hide();
        $("#hb_selector").hide();
        $("#etf_selector").hide();
        $("#home .selector_head").css("border", "2px solid #2d94e7");
        $("#eq_selector_head").css("background","#2d94e7");
        $("#eq_selector_head").css("color","#fff");
        
        $("#eq_selector_head").click(function(){
          $("#home .ineer_wrapper_fund").hide();
          $("#home .ineer_wrapper_fund_last").hide();
          $("#eq_selector").show();
          $("#home .selector_head").css("background","#f1f2f2");
          $("#home .selector_head").css("color","#5f6469");
          $("#eq_selector_head").css("background","#2d94e7");
          $("#eq_selector_head").css("color","#fff");
        }); 

        $("#db_selector_head").click(function(){
          $("#home .ineer_wrapper_fund").hide();
          $("#home .ineer_wrapper_fund_last").hide();
          $("#db_selector").show();
          $("#home .selector_head").css("background","#f1f2f2");
          $("#home .selector_head").css("color","#5f6469");
          $("#db_selector_head").css("background","#2d94e7");
          $("#db_selector_head").css("color","#fff");
        });    

        $("#hb_selector_head").click(function(){
          $("#home .ineer_wrapper_fund").hide();
          $("#home .ineer_wrapper_fund_last").hide();
          $("#hb_selector").show();
          $("#home .selector_head").css("background","#f1f2f2");
          $("#home .selector_head").css("color","#5f6469");
          $("#hb_selector_head").css("background","#2d94e7");
          $("#hb_selector_head").css("color","#fff");
        });

        $("#etf_selector_head").click(function(){
          $("#home .ineer_wrapper_fund").hide();
          $("#home .ineer_wrapper_fund_last").hide();
          $("#etf_selector").show();
          $("#home .selector_head").css("background","#f1f2f2");
          $("#home .selector_head").css("color","#5f6469");
          $("#etf_selector_head").css("background","#2d94e7");
          $("#etf_selector_head").css("color","#fff");
        });
        /* Asset class selection end */

        /*Filters Start */
        $("#amcname").hide();
        $("#fundmanager").hide();
        $("#indexname").hide();
        $("#fundtype").hide();
        $("#menu2 .fund_head").css("border", "2px solid #2d94e7");
        $("#rvfundrating_head").css("background","#2d94e7");
        $("#rvfundrating_head").css("color","#fff");
        $("#rv_index #menu2 .outer_wrapper_fund").css("height","250px");
        
        $("#rvfundrating_head").click(function(){
          $("#menu2 .ineer_wrapper_fund").hide();
          $("#menu2 .ineer_wrapper_fund_last").hide();
          $("#rvfundrating").show();
          $("#rv_index #menu2 .outer_wrapper_rating").css("height","225px");
          $("#rv_index #menu2 .outer_wrapper_fund").css("height","250px");
          $("#menu2 .fund_head").css("background","#f1f2f2");
          $("#menu2 .fund_head").css("color","#5f6469");
          $("#rvfundrating_head").css("background","#2d94e7");
          $("#rvfundrating_head").css("color","#fff");
        });

        $("#amcname_head").click(function(){
          $("#menu2 .ineer_wrapper_fund").hide();
          $("#menu2 .ineer_wrapper_fund_last").hide();
          $("#rvfundrating").hide();
          $("#mf_screener #menu2 .outer_wrapper_rating").css("height","60px");
          $("#mf_screener #menu2 .outer_wrapper_fund").css("height","400px");
          $("#amcname").show();
          $("#menu2 .fund_head").css("background","#f1f2f2");
          $("#menu2 .fund_head").css("color","#5f6469");
          $("#amcname_head").css("background","#2d94e7");
          $("#amcname_head").css("color","#fff");
        });

        $("#fundmanager_head").click(function(){
          $("#menu2 .ineer_wrapper_fund").hide();
          $("#menu2 .ineer_wrapper_fund_last").hide();
          $("#rvfundrating").hide();
          $("#mf_screener #menu2 .outer_wrapper_rating").css("height","60px");
          $("#mf_screener #menu2 .outer_wrapper_fund").css("height","400px");
          $("#fundmanager").show();
          $("#menu2 .fund_head").css("background","#f1f2f2");
          $("#menu2 .fund_head").css("color","#5f6469");
          $("#fundmanager_head").css("background","#2d94e7");
          $("#fundmanager_head").css("color","#fff");
        });

        $("#indexname_head").click(function(){
          $("#menu2 .ineer_wrapper_fund").hide();
          $("#menu2 .ineer_wrapper_fund_last").hide();
          $("#rvfundrating").hide();
          $("#rv_index #menu2 .outer_wrapper_rating").css("height","60px");
          $("#rv_index #menu2 .outer_wrapper_fund").css("height","400px");
          $("#indexname").show();
          $("#menu2 .fund_head").css("background","#f1f2f2");
          $("#menu2 .fund_head").css("color","#5f6469");
          $("#indexname_head").css("background","#2d94e7");
          $("#indexname_head").css("color","#fff");
        });

        $("#fundtype_head").click(function(){
          $("#menu2 .ineer_wrapper_fund").hide();
          $("#menu2 .ineer_wrapper_fund_last").hide();
          $("#rvfundrating").hide();
          $("#mf_screener #menu2 .outer_wrapper_rating").css("height","60px");
          $("#mf_screener #menu2 .outer_wrapper_fund").css("height","400px");
          $("#fundtype").show();
          $("#menu2 .fund_head").css("background","#f1f2f2");
          $("#menu2 .fund_head").css("color","#5f6469");
          $("#fundtype_head").css("background","#2d94e7");
          $("#fundtype_head").css("color","#fff");
        });
        /* Filters End */

        /*Choose Columns start*/
        $("#return_columns").hide();
        $("#portfolio_attributes_columns").hide();
        $("#mf_ratio_columns").hide();
        $("#menu3 .columns_head").css("border", "2px solid #2d94e7");
        $("#basic_columns_head").css("background","#2d94e7");
        $("#basic_columns_head").css("color","#fff");

        $("#basic_columns_head").click(function(){
          $("#menu3 .ineer_wrapper_fund").hide();
          $("#menu3 .ineer_wrapper_fund_last").hide();
          $("#basic_columns").show();
          $("#menu3 .columns_head").css("background","#f1f2f2");
          $("#menu3 .columns_head").css("color","#5f6469");
          $("#basic_columns_head").css("background","#2d94e7");
          $("#basic_columns_head").css("color","#fff");
        });

        $("#return_columns_head").click(function(){
          $("#menu3 .ineer_wrapper_fund").hide();
          $("#menu3 .ineer_wrapper_fund_last").hide();
          $("#return_columns").show();
          $("#menu3 .columns_head").css("background","#f1f2f2");
          $("#menu3 .columns_head").css("color","#5f6469");
          $("#return_columns_head").css("background","#2d94e7");
          $("#return_columns_head").css("color","#fff");
        });
        $("#portfolio_attributes_columns_head").click(function(){
          $("#menu3 .ineer_wrapper_fund").hide();
          $("#menu3 .ineer_wrapper_fund_last").hide();
          $("#portfolio_attributes_columns").show();
          $("#menu3 .columns_head").css("background","#f1f2f2");
          $("#menu3 .columns_head").css("color","#5f6469");
          $("#portfolio_attributes_columns_head").css("background","#2d94e7");
          $("#portfolio_attributes_columns_head").css("color","#fff");
        });
        $("#mf_ratio_columns_head").click(function(){
          $("#menu3 .ineer_wrapper_fund").hide();
          $("#menu3 .ineer_wrapper_fund_last").hide();
          $("#mf_ratio_columns").show();
          $("#menu3 .columns_head").css("background","#f1f2f2");
          $("#menu3 .columns_head").css("color","#5f6469");
          $("#mf_ratio_columns_head").css("background","#2d94e7");
          $("#mf_ratio_columns_head").css("color","#fff");
        });
        /*Choose Columns end*/


      }



     });





