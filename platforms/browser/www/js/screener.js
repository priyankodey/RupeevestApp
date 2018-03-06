
console.log("Hi Screener");


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

//print_fund_type_selection();
 schemedata_landing();

//query_run();
      
       
    

            
// $(window).scroll(function () {

//     var homeClassName = $('#home').attr('class');
    
//     if (homeClassName == "tab-pane active") {
//         var scrollTopHeight = 476;
//     } else if (menu1ClassName == "tab-pane active" || menu3ClassName == "tab-pane active") {
//         var scrollTopHeight = 630;
//     } else if (menu2ClassName == "tab-pane active") {
//         var scrollTopHeight = 459;
//     } else {
//         var scrollTopHeight = 205;
//     }               
    
// })
            
   // $(".asset-class-section input[type=checkbox]").on("click", function (){
   //  $(".tags").html('');
   //     $('.asset-class-section input:checked').each(function() {
   //     if(  $(this).hasClass('chkbox')) {}
   //      else{
   //     var selected=$(this).attr('data-text');
   //     $(".tags").append('<span class="label label-default" id="Id' + $(this).val() + '">' + selected + '&nbsp;&nbsp;<i data-text="'+$(this).val()+'" class="glyphicon glyphicon-remove tagClose" id="' + selected + '"></i></span>');
   //     }
   //  });
   //  });
                

  // $('.ck').change(function() {
  //     if($(this).is(":checked")) 
  //     {
  //       insert_asset_selection(this.dataset.text)
  //       query_run();
  //     }        
  //     else
  //     {            
  //       del_asset_selection(this.dataset.text)
  //       query_run();      
  //     }       
  // });

  function insert_asset_selection(value)
  {
     
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
          //document.getElementById("ChkAllCategories").checked = false;
          //print_asset_selection();               
      }

  }

    

   
    // function print_asset_selection()
    // {

    //      $("#ui_classification").empty();
    //      if(asset_selection.length==0 && asset_selected_flag2==1)
    //      {
        
    //         asset_selection=["All Funds"];
    //      }
       
    //      for(var i=0;i<asset_selection.length;i++)
    //      {
                
    //       var asset="<span class='btn btn-primary btn-xs' >"+asset_selection[i]+"<span class='fund_attr_close'><span class='glyphicon glyphicon-remove asset_child'></span>";

    //       $("#ui_classification").append(asset);
    //     }
        
    // }

       

  // $("#asset_selection").click(function()
  // {
  //     print_asset_selection();
  //     query_run();
  // });


      

        // function  select_asset()
        // {
           
        //     document.getElementById(asset_selection[0].replace(/(:| |-|amp;)/g, "")).checked = true;

        // }
        // function unselect_asset(value)
        // {
             
        //      if(value=="All Funds")
        //      {
        //         document.getElementById("ChkAllCategories").checked = false;
        //         asset_selected_flag=1;
        //      }
        //     else
        //     {
        //      document.getElementById(value.replace(/(:| |-)/g, "")).checked = false;
        //     }
        // }

              

       
        // $(".reset_asset").click(function(){         
        //        for(var i=0;i<asset_selection.length;i++)
        //                 {
        //                   if(asset_selection[i]=="All Funds")
        //                     document.getElementById("ChkAllCategories").checked = false;
        //                   else
        //                     document.getElementById(asset_selection[i].replace(/(:| |-)/g, "")).checked = false;
        //                 }
        //                 asset_selection = [];
        //                 asset_selection.push("Equity : Large Cap");

        //            query_run();

        //            print_asset_selection();

        //            for(var i=0;i<asset_selection.length;i++)
        //                 {
                                      
        //                                document.getElementById(asset_selection[i].replace(/(:| |-)/g, "")).checked = true;
        //                 }
        //  });


        

      //  label.label-checkbox input[type=checkbox]:checked+.item-media i.icon-form-checkbox

      



      // if ($('label-checkbox ').is(':checked')){
      //   console.log("checked");
      // }


      // $$(document).on('click', '.page.smart-select-page .item-divider', function(e){ 
      //   var nextGroup; 
      //   var divider = $$(this); 
      //   var isChecked = divider.next('li').find('input:checked').length > 0; 
      //   divider.nextAll('li').each(function () 
      //     { 
      //       if (nextGroup) return; 
      //       var li = $$(this); 
      //       li.find('input').prop('checked', isChecked ? false : true).trigger('change'); 
      //       if (li.hasClass('item-divider')) 
      //         { 
      //           nextGroup = true; 
      //         } 
      //     }); 
      // });



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
                // if(rating_selection.length==0 && rate_selected_flag==0)
                // {
                //     flag=1;
                    
                    rating_selection=["1","2","3","4","5","Unrated"];
                // }
                // if(rating_selection.length==0 && rate_selected_flag==1)
                // { 
                //     var data1="";
                //    fill_snapshot_table(data1);
                // fill_landing_returns(data1);
                // $("#total_res").html("0");
                // return
                // }


                // if(asset_selection.length==0)
                // {
                //     flag=1;
                //     asset_selection=["all"];
                // }
                // if(amc_selection.length==0 && amc_selected_flag==0)
                // {
                //     flag_amc=1;
                    amc_selection=["all"];

                // }
                // else if(amc_selection.length==0 && amc_selected_flag==1)
                // {
                //     var data1="";
                //    fill_snapshot_table(data1);
                // fill_landing_returns(data1);
                // $("#total_res").html("0");
                // return
                // }
                // if(fund_m_selection.length==0 && manager_selected_flag==0)
                // {
                //     flag_manager=1;
                    fund_m_selection=["all"];
                // }
                // else if(fund_m_selection.length==0 && manager_selected_flag==1)
                // {
                //     var data1="";
                //    fill_snapshot_table(data1);
                // fill_landing_returns(data1);
                // $("#total_res").html("0");
                // return
                // }
                // if(index_selection.length==0 && index_selected_flag==0)
                // {
                    
                    index_selection=["all"];
                // }
                // else if(index_selection.length==0 && index_selected_flag==1)
                // {
                //     var data1="";
                //    fill_snapshot_table(data1);
                // fill_landing_returns(data1);
                // $("#total_res").html("0");
                // return
                // }
                // else if(fund_id.length==0 && fund_type_selected_flag==1)
                // {
                //     var data1="";
                //    fill_snapshot_table(data1);
                // fill_landing_returns(data1);
                // $("#total_res").html("0");
                // return
                // }
                //  if(asset_selection.length==0 && asset_selected_flag==0)
                // {
                //     asset_flag=1;
                    //asset_selection=["All Funds"];
                //     print_asset_selection();

                // }
                // else if(asset_selection.length==0 && asset_selected_flag==1)
                // {
                //     var data1="";
                //    fill_snapshot_table(data1);
                // fill_landing_returns(data1);
                // $("#total_res").html("0");
                // return
                // }
                // else if(fund_type_selection.length==0 && fund_type_selected_flag==1)
                // {
                //     var data1="";
                //    fill_snapshot_table(data1);
                // fill_landing_returns(data1);
                // $("#total_res").html("0");
                // return
                // }

                

                $.ajax({
                type: "POST",
                url: curr_ip+'/functionalities/asset_class_section?',
                data: { selected_schemes : asset_selection ,selected_rating : rating_selection,selected_amc : amc_selection,selected_manager : fund_m_selection,selected_index : index_selection,selected_fund_type : fund_id,selected_from_date : from_date,selected_to_date : to_date,condn_type:"asset"},
                datatype:'json',
                success:function(data1, textStatus, jqXHR) {
                //console.log(data1);
               // debugger;
                // console.log(data1.schemedata[0].classification);

               // fill_snapshot_table(data1);
               fill_snapshot_table(data1);
                 console.log("Done");
                // if (data1.schemedata.length==0)
                // {
                //     var data1="";
                //    fill_snapshot_table(data1);
                //      fill_landing_returns(data1);
                //      $("#total_res").html("0");

                // }
                // else
                // {
                // if (asset_flag==1)
                // {
                //     asset_selection=[];
                // }

                //     fill_snapshot_table(data1);
                //     fill_landing_returns(data1);
                //     sorting_mobile();

                   
                // }
                }
                });


            
        }


  // $("li").on("click", function (){  
  //   console.log("inside li");      
  //      $('input[type=checkbox]').each(function() {
  //       if($(this).is(':checked')) {
  //         console.log("inside check");
  //      console.log($(this).val());
  //       }

        
  //   });
  // });

   // $$('input[type=checkbox]').on('change', function()
   //  { 
   //    if (this.checked) {
   //      $$('.smart-select option').prop('selected', true); 
   //      alert("hi");
   //      console.log("checked");
   //      console.log($(this).val());
        
   //    }        
   //    else {
   //      $$('.smart-select option').prop('selected', false);
   //      console.log("checked remove"); 
   //    } 
        
   //  });



// var myflag = 0;
  $$(document).on('click', '.close-popup', function(e){     
     //console.log('closed popup');
     $("#scr_datacard .card").css("display","none");
    asset_selection=[];
    
    $("input[type=checkbox]").each(function(){

       if (this.checked) {
        // myflag = 0;
        // console.log("flag 0");
        //debugger;
       // $$('.smart-select option').prop('selected', true); 
        asset_selection.push(this.parentElement.children[2].children[0].innerText);
        console.log(asset_selection);

        
      }
      //else if($$('.smart-select option').prop('selected', false)) {
        // else if ($('.input[type=checkbox]').filter(':checked').length < 1) {
        // myflag = 1;
        // console.log("flag 1");      

      //}        
      // else {
      //   $$('.smart-select option').prop('selected', false);
      //   console.log("checked remove"); 
      // } 
      // if (myflag == 1) {
      //   alert("Please select atleast one category");
      //   myflag = 0;
      //   console.log("flag 0");
      //   return false;  
      // }
      
    query_run();
});

         
     


   });

