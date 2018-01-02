 // function add_id_array()
 //         {
 //          var id=(window.location.search).split(',');
      

 //          alert(document.location.pathname);

 //          id1=id[0].split('=');

 //          // alert(id1[1]);
 //          // alert(id[1]);
 //          array_id.push(id1[1]);
 //          for(var i=1;i<id.length;i++)
 //          {
 //          	 array_id.push(id[i]);
 //          }
         
 //         }

  function generate_chart(array_id,color_arr)
 {

 	    // console.log(array_id);
 	    // get_graph_data(array_id); 


 	      $.ajax({
						type:'GET',
						url: curr_ip+'fund_comparision/get_graph_data',
						data: { scheme_list : array_id},
						datatype:'json',
						success:function(data1, textStatus, jqXHR) 
						{
  								var final_array=[] ;
  								var name_arr=[];

  								console.log(data1);

  								if (data1.Response=="Error")
  								{
  									// alert(data1.result);
  								}
  								else
  								{
  									 for(var i=0;i<data1.scheme_name.length;i++)
  									 {
  									 	name_arr.push(data1.scheme_name[i].s_name);
  									 } 

  									for(var k=0;k<array_id.length;k++)
  									{
  										var arr_new=[];
  										// console.log("---------------------jkjkljkljklj-------------------------")

  									    for(var i=0;i<data1.result.length;i++)
  									 {    				  									 
  									        if(k==0){
  									         var date2 = new Date(data1.result[i].navdate);  									 	    
  									 	     arr_new.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data1.result[i].navrs_1]);	
  									        }
  									        else if(k==1)
  									        {
  									         var date2 = new Date(data1.result[i].navdate);  									 	    
  									 	     arr_new.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data1.result[i].navrs_2]);		
  									        }
  									        else if(k==2)
  									        {
  									         var date2 = new Date(data1.result[i].navdate);  									 	    
  									 	     arr_new.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data1.result[i].navrs_3]);		
  									        }
  									        else if(k==3)
  									        {
  									         var date2 = new Date(data1.result[i].navdate);  									 	    
  									 	     arr_new.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data1.result[i].navrs_4]);		
  									        }
  									 		
  									 }	

  									  final_array.push(arr_new);

  									}
  									
  								}


  								comparison_graph(final_array , array_id , name_arr, color_arr );
  								// console.log("====================================================================")
  								// 	console.log(final_array.length);
  								// 	console.log(final_array);
  								// console.log("====================================================================")

                        }
                 });


 }


 // function add_id_array()
 //         {
	//           var id=(document.location.pathname).split('/');
	         
	//           // console.log(id);

	//           id1=id[2].split('-');

	//           for(var i=0;i<id1.length;i++)
	//           {
	//           	 array_id.push(id1[i]);
	//           }
 //         }
 function add_id_array()
         {
	          var id=(document.location.pathname).split('/');
	         var index=document.location.pathname.indexOf(",");
	         if(index!=-1)
	         {
	         	var path=document.location.pathname.replace(/,/g,"-");
	         	window.location=path;
	         }
	          // console.log(id);

	          id1=id[2].split('-');

	          for(var i=0;i<id1.length;i++)
	          {
	          	 array_id.push(id1[i]);
	          }
         }

// function compare_value()
// {
// 	// $(".col_0").hide();
// 	// $(".col_1").hide();
// 	// $(".col_2").hide();
// 	// $(".col_3").hide();
// 	// alert(window.location.search);
	
// 	   $.ajax({
// 						type:'GET',
// 						url: '/fund_comparision/get_compare_value?',
// 						data: { selected_schemes : array_id},
// 						datatype:'json',
// 						success:function(data1, textStatus, jqXHR) {
//   // console.log(data1);
  
// 	// for (var i = data1.comp.length+1; i < 5; i++) {
// 	// 	 closecomaparevalue("Section"+i);
// 	// }
//   for(var i =0;i <= data1.comp.length-1;i++)
//   {
// 	var item1 = data1.comp[i];
// 	var schemecode = item1.schemecode;
// 	var s_name = item1.s_name;
// 	var lockperiod = item1.lockperiod;
	
// 	var exitload;

// 	if(item1.exitload==null || item1.exitload=='undefined')
// 	{
// 		exitload = "-";
// 	}
// 	else
// 	{
// 		exitload = item1.exitload;
// 	}

	

// 	var expenceratio = item1.expenceratio;

// 	var inception_date = moment(item1.inception_date).format('DD-MMM-YY');
// 	var inception_return = item1.inception_return;
// 	var turnover_ratio = item1.turnover_ratio;
// 	var navdate  = item1.navdate ;
// 	var navrs = item1.navrs;
// 	var navchange = item1.navchange;


// 	var minimum_investment = commaSeparateNumber(item1.minimum_investment);
	 


	




// 	var sdx_returns;
// 	if(item1.sdx_returns==null || item1.sdx_returns=='undefined' || item1.sdx_returns==0)
// 	{
// 		sdx_returns = "-";
// 	}
// 	else
// 	{
// 		sdx_returns = item1.sdx_returns;
// 	}
	
// 	var betax_returns;
// 	if(item1.betax_returns==null || item1.betax_returns=='undefined' || item1.betax_returns==0)
// 	{
// 		betax_returns = "-";
// 	}
// 	else
// 	{
// 	   betax_returns = item1.betax_returns;	
// 	}
	
// 	var sharpex_returns;
     
//      if(item1.sharpex_returns==null || item1.sharpex_returns=='undefined' || item1.sharpex_returns==0)
//      {
//        sharpex_returns = "-";
//      }
//      else
//      {
//        sharpex_returns = item1.sharpex_returns; 	
//      }
	  
// 	  var alphax_returns;
// 	  if(item1.alphax_returns==null || item1.alphax_returns=='undefined' || item1.alphax_returns==0)
// 	  {
//         alphax_returns = "-";
// 	  }
// 	  else
// 	  {
// 	    alphax_returns = item1.alphax_returns;  	
// 	  }
	
//     var sotinox_returns;
//       if(item1.sotinox_returns==null || item1.sotinox_returns=='undefined' || item1.sotinox_returns==0)
//       {
//       	sotinox_returns = "-";
//       }
//       else
//       {
//         sotinox_returns = item1.sotinox_returns;  	
//       }

    

// 		        var now = moment(new Date()); //todays date
// 				var end = moment(item1.inception_date); // another date
// 				var duration = moment.duration(now.diff(end));
// 				var days = duration.asDays();

// 		       if( days < 365 )
// 		       {
// 		       	sdx_returns = "-";
// 				betax_returns = "-";
// 				sharpex_returns = "-";
// 				alphax_returns = "-";
// 				sotinox_returns = "-";
                   
// 		       }
		  


	
// 	var rupeevest_rating = item1.rupeevest_rating;
// 	// var consistency_of_return = item1.consistency_of_return;
// 	// var risk = item1.risk;
// 	// var cost_factor = item1.cost_factor;
// 	// var portfolio_attributes = item1.portfolio_attributes;
// 	var fund_manager = item1.fund_manager;
// 	var aumtotal;

// 	if(item1.aumtotal==null || item1.aumtotal=='undefined')
// 	{
// 		aumtotal = "--";
// 	}
// 	else
// 	{
// 		aumtotal = commaSeparateNumber((parseFloat(item1.aumtotal)).toFixed(2))
// 	}
// 	var redemption_period = item1.redemption_period;
// 	var classification = item1.classification;
// 	var index_name = item1.index_name;
	
// 	var lcap;
// 	if(item1.lcap==null || item1.lcap=='undefined' || item1.lcap==0)
// 	{
// 		lcap="-";
// 	}
// 	else
// 	{
// 		lcap = item1.lcap;
// 	}

//     var mcap;

//     if(item1.mcap==null || item1.mcap=='undefined' || item1.mcap==0)
//     {
//        mcap = "-";
//     }
//     else
//     {
//        mcap = item1.mcap;	
//     }
	
// 	var scap;
// 	if(item1.scap==null || item1.scap=='undefined' || item1.scap==0)
// 	{
// 		scap = "-";
// 	}
// 	else
// 	{
// 	   scap = item1.scap;	
// 	}
	
	

// 	var ppmcap;
//     // alert(item1.ppmcap);

//     if(item1.ppmcap==null || item1.ppmcap=='-')
//     {
//        ppmcap = "-";
//     }
//     else
//     {
//     	 ppmcap = commaSeparateNumber((parseFloat(item1.ppmcap)).toFixed(2));
//     }
	
	

// 	var one_y = item1.one_y;
// 	var two_y = item1.two_y;
// 	var three_y = item1.three_y;
// 	var six_m = item1.six_m;
// 	var pe = item1.pe;
// 	var pb = item1.pb;
// 	var ytm=item1.ytm;
// 	var mod_duration=item1.mod_duration;
// 	var five_y=item1.five_y;
// 	var avg_mat=item1.avg_mat;
// 	var holding_1=item1.compname_1;
// 	var holding_2=item1.compname_2;
// 	var holding_3=item1.compname_3;
// 	var holding_4=item1.compname_4;
// 	var holding_5=item1.compname_5;
// 	var holding_6=item1.compname_6;
// 	var holding_7=item1.compname_7;
// 	var holding_8=item1.compname_8;
// 	var holding_9=item1.compname_9;
// 	var holding_10=item1.compname_10;
// 	var percentage_1=item1.holdpercentage_1;
// 	var percentage_2=item1.holdpercentage_2;
// 	var percentage_3=item1.holdpercentage_3;
// 	var percentage_4=item1.holdpercentage_4;
// 	var percentage_5=item1.holdpercentage_5;
// 	var percentage_6=item1.holdpercentage_6;
// 	var percentage_7=item1.holdpercentage_7;
// 	var percentage_8=item1.holdpercentage_8;
// 	var percentage_9=item1.holdpercentage_9;
// 	var percentage_10=item1.holdpercentage_10;
	

// 	// var compname_1=item1.compname_1+"-"+item1.holdpercentage_1;
// 	// var compname_2=item1.compname_2+"-"+item1.holdpercentage_2;
// 	// var compname_3=item1.compname_3+"-"+item1.holdpercentage_3;
// 	// var compname_4=item1.compname_4+"-"+item1.holdpercentage_4;
// 	// var compname_5=item1.compname_5+"-"+item1.holdpercentage_5;
// 	// var compname_6=item1.compname_6+"-"+item1.holdpercentage_6;
// 	// var compname_7=item1.compname_7+"-"+item1.holdpercentage_7;
// 	// var compname_8=item1.compname_8+"-"+item1.holdpercentage_8;
// 	// var compname_9=item1.compname_9+"-"+item1.holdpercentage_9;
// 	// var compname_10=item1.compname_10+"-"+item1.holdpercentage_10;
	
//     $('#scheme_code_'+i).text(schemecode);

//     if(rupeevest_rating=='5')
//     {
//       $('#five_'+i).show();
//       $('#four_'+i).hide();
//       $('#three_'+i).hide();
//       $('#two_'+i).hide();
//       $('#one_'+i).hide();
//       $('#unrated_'+i).hide();
//     }
//     else if(rupeevest_rating=='4')
//     {
//       $('#five_'+i).hide();
//       $('#four_'+i).show();
//       $('#three_'+i).hide();
//       $('#two_'+i).hide();
//       $('#one_'+i).hide();
//       $('#unrated_'+i).hide();
//     }
//     else if(rupeevest_rating=='3')
//     {
//     	$('#five_'+i).hide();
//       $('#four_'+i).hide();
//       $('#three_'+i).show();
//       $('#two_'+i).hide();
//       $('#one_'+i).hide();
//       $('#unrated_'+i).hide();
//     }
//     else if(rupeevest_rating=='2')
//     {
//        $('#five_'+i).hide();
//       $('#four_'+i).hide();
//       $('#three_'+i).hide();
//       $('#two_'+i).show();
//       $('#one_'+i).hide();
//       $('#unrated_'+i).hide();
//     }
//     else if(rupeevest_rating=='1')
//     {
//       $('#five_'+i).hide();
//       $('#four_'+i).hide();
//       $('#three_'+i).hide();
//       $('#two_'+i).hide();
//       $('#one_'+i).show();
//       $('#unrated_'+i).hide();
//     }
//     else
//     {
//       $('#five_'+i).hide();
//       $('#four_'+i).hide();
//       $('#three_'+i).hide();
//       $('#two_'+i).hide();
//       $('#one_'+i).hide();
//       $('#unrated_'+i).show();
//     }

// 	$("#basic_lock_in_period_"+i).html(lockperiod);
// 	$("#basic_exit_load_"+i).html(exitload);
// 	$("#basic_expense_ratio_"+i).html(expenceratio);
// 	$("#basic_launch_date_"+i).html(inception_date);
// 	$("#inception_return"+i).html(inception_return);
// 	$("#port_attr_turnover_ratio_"+i).html(turnover_ratio);
// 	$("#navdate"+i).html(navdate);
// 	$("#navrs"+i).html(navrs);
// 	$("#basic_min_inv_"+i).html(minimum_investment);
// 	$("#navchange"+i).html(navchange);
// 	$("#performance_stand_dev_"+i).html(sdx_returns);
// 	$("#performance_beta_"+i).html(betax_returns);
// 	$("#performance_sharpe_"+i).html(sharpex_returns);
// 	$("#performance_alpha_"+i).html(alphax_returns);
// 	$("#performance_sortino_"+i).html(sotinox_returns);
// 	// $("#total_return"+i).html(total_return);
// 	// $("#consistency_of_return"+i).html(consistency_of_return);
// 	// $("#risk"+i).html(risk);
// 	// $("#cost_factor"+i).html(cost_factor);
// 	// $("#portfolio_attributes"+i).html(portfolio_attributes);
// 	$("#s_name_"+i).html("<a target='_blank' class= 'compare' id='"+schemecode+"' href='/Mutual-Funds-India/"+schemecode+"''>"+s_name+"</a");
// 	$("#fund_manager_"+i).html(fund_manager);
// 	$("#redemption_period"+i).html(redemption_period);
// 	$("#classification_"+i).html(classification);
// 	$("#aumtotal_"+i).html(aumtotal);
// 	$("#index_name_"+i).html(index_name);
// 	$("#port_market_large_"+i).html(lcap);
// 	$("#port_market_mid_"+i).html(mcap);
// 	$("#port_market_small_"+i).html(scap);
// 	$("#port_market_avg_cap_"+i).html(ppmcap);
// 	$("#port_attr_pe_ratio_"+i).html(pe);
// 	$("#port_attr_pb_ratio_"+i).html(pb);
// 	$("#return_1y_"+i).html(one_y);
// 	$("#return_2y_"+i).html(two_y);
// 	$("#return_3y_"+i).html(three_y);
// 	$("#return_6m_"+i).html(six_m);
// 	$("#return_5y_"+i).html(five_y);
// 	$("#port_attr_avg_maturity_"+i).html(avg_mat);
// 	$("#port_attr_mod_dur_"+i).html(mod_duration);
// 	$("#port_attr_yield_maturity_"+i).html(ytm);
// 	$("#comp1_hold"+i).html(holding_1);
// 	$("#comp2_hold"+i).html(holding_2);
// 	$("#comp3_hold"+i).html(holding_3);
// 	$("#comp4_hold"+i).html(holding_4);
// 	$("#comp5_hold"+i).html(holding_5);
// 	$("#comp6_hold"+i).html(holding_6);
// 	$("#comp7_hold"+i).html(holding_7);
// 	$("#comp8_hold"+i).html(holding_8);
// 	$("#comp9_hold"+i).html(holding_9);
// 	$("#comp10_hold"+i).html(holding_10);
// 	$("#comp1_percent"+i).html(percentage_1);
// 	$("#comp2_percent"+i).html(percentage_2);
// 	$("#comp3_percent"+i).html(percentage_3);
// 	$("#comp4_percent"+i).html(percentage_4);
// 	$("#comp5_percent"+i).html(percentage_5);
// 	$("#comp6_percent"+i).html(percentage_6);
// 	$("#comp7_percent"+i).html(percentage_7);
// 	$("#comp8_percent"+i).html(percentage_8);
// 	$("#comp9_percent"+i).html(percentage_9);
// 	$("#comp10_percent"+i).html(percentage_10);
// 	// $("#comp1_hold_percent_"+i).html(compname_1);
// 	// $("#comp2_hold_percent_"+i).html(compname_2);
// 	// $("#comp3_hold_percent_"+i).html(compname_3);
// 	// $("#comp4_hold_percent_"+i).html(compname_4);
// 	// $("#comp5_hold_percent_"+i).html(compname_5);
// 	// $("#comp6_hold_percent_"+i).html(compname_6);
// 	// $("#comp7_hold_percent_"+i).html(compname_7);
// 	// $("#comp8_hold_percent_"+i).html(compname_8);
// 	// $("#comp9_hold_percent_"+i).html(compname_9);
// 	// $("#comp10_hold_percent_"+i).html(compname_10);
// 	$(".col_"+i).css("display", "block");
	
	
// }

//  },
//   error:function(jqXHR, textStatus, errorThrown) {
//     // alert("AJAX Error:" + textStatus);
//   }

//   })
// }


function compare_value(array_id)
{
	// $(".col_0").hide();
	// $(".col_1").hide();
	// $(".col_2").hide();
	// $(".col_3").hide();
	// alert(window.location.search);
	console.log(array_id);
	   $.ajax({
	type:'GET',
	url: curr_ip+'/fund_comparision/get_compare_value',
	data: { selected_schemes : array_id},
	datatype:'json',
	success:function(data1, textStatus, jqXHR) {
  // console.log(data1);
  
	// for (var i = data1.comp.length+1; i < 5; i++) {
	// 	 closecomaparevalue("Section"+i);
	// }
  for(var i =0;i <= data1.comp.length-1;i++)
  {
	var item1 = data1.comp[i];
	var schemecode = item1.schemecode;
	var s_name = item1.s_name;
	var lockperiod = item1.lockperiod;
	
	var exitload;

	if(item1.exitload==null || item1.exitload=='undefined')
	{
	exitload = "-";
	}
	else
	{
	exitload = item1.exitload;
	}

	

	var expenceratio = item1.expenceratio;

	var inception_date = moment(item1.inception_date).format('DD-MMM-YY');
	var inception_return = item1.inception_return;
	var turnover_ratio = item1.turnover_ratio;
	var navdate  = item1.navdate ;
	var navrs = item1.navrs;
	var navchange = item1.navchange;


	var minimum_investment = commaSeparateNumber(item1.minimum_investment);
	 


	




	var sdx_returns;
	if(item1.sdx_returns==null || item1.sdx_returns=='undefined' || item1.sdx_returns==0)
	{
	sdx_returns = "-";
	}
	else
	{
	sdx_returns = item1.sdx_returns;
	}
	
	var betax_returns;
	if(item1.betax_returns==null || item1.betax_returns=='undefined' || item1.betax_returns==0)
	{
	betax_returns = "-";
	}
	else
	{
	   betax_returns = item1.betax_returns;	
	}
	
	var sharpex_returns;
     
     if(item1.sharpex_returns==null || item1.sharpex_returns=='undefined' || item1.sharpex_returns==0)
     {
       sharpex_returns = "-";
     }
     else
     {
       sharpex_returns = item1.sharpex_returns; 	
     }
	  
	  var alphax_returns;
	  if(item1.alphax_returns==null || item1.alphax_returns=='undefined' || item1.alphax_returns==0)
	  {
        alphax_returns = "-";
	  }
	  else
	  {
	    alphax_returns = item1.alphax_returns;  	
	  }
	
    var sotinox_returns;
      if(item1.sotinox_returns==null || item1.sotinox_returns=='undefined' || item1.sotinox_returns==0)
      {
      	sotinox_returns = "-";
      }
      else
      {
        sotinox_returns = item1.sotinox_returns;  	
      }

    

	        var now = moment(new Date()); //todays date
	var end = moment(item1.inception_date); // another date
	var duration = moment.duration(now.diff(end));
	var days = duration.asDays();

	       if( days < 365 )
	       {
	       	sdx_returns = "-";
	betax_returns = "-";
	sharpex_returns = "-";
	alphax_returns = "-";
	sotinox_returns = "-";
                   
	       }
	  


	
	var rupeevest_rating = item1.rupeevest_rating;
	// var consistency_of_return = item1.consistency_of_return;
	// var risk = item1.risk;
	// var cost_factor = item1.cost_factor;
	// var portfolio_attributes = item1.portfolio_attributes;
	var fund_manager = item1.fund_manager;
	var aumtotal;

	if(item1.aumtotal==null || item1.aumtotal=='undefined')
	{
	aumtotal = "--";
	}
	else
	{
	aumtotal = commaSeparateNumber((parseFloat(item1.aumtotal)).toFixed(2))
	}
	var redemption_period = item1.redemption_period;
	var classification = item1.classification;
	var index_name = item1.index_name;
	
	var lcap;
	if(item1.lcap==null || item1.lcap=='undefined' || item1.lcap==0)
	{
	lcap="-";
	}
	else
	{
	lcap = item1.lcap;
	}

    var mcap;

    if(item1.mcap==null || item1.mcap=='undefined' || item1.mcap==0)
    {
       mcap = "-";
    }
    else
    {
       mcap = item1.mcap;	
    }
	
	var scap;
	if(item1.scap==null || item1.scap=='undefined' || item1.scap==0)
	{
	scap = "-";
	}
	else
	{
	   scap = item1.scap;	
	}
	
	

	var ppmcap;
    // alert(item1.ppmcap);

    if(item1.ppmcap==null || item1.ppmcap=='-')
    {
       ppmcap = "-";
    }
    else
    {
    	 ppmcap = commaSeparateNumber((parseFloat(item1.ppmcap)).toFixed(2));
    }
	
	

	var one_y = item1.one_y;
	var two_y = item1.two_y;
	var three_y = item1.three_y;
	var ten_y = item1.ten_y;
	var six_m = item1.six_m;
	var pe = item1.pe;
	var pb = item1.pb;
	var ytm=item1.ytm;
	var mod_duration=item1.mod_duration;
	var five_y=item1.five_y;
	var avg_mat=item1.avg_mat;
	var holding_1=item1.compname_1;
	var holding_2=item1.compname_2;
	var holding_3=item1.compname_3;
	var holding_4=item1.compname_4;
	var holding_5=item1.compname_5;
	var holding_6=item1.compname_6;
	var holding_7=item1.compname_7;
	var holding_8=item1.compname_8;
	var holding_9=item1.compname_9;
	var holding_10=item1.compname_10;
	var percentage_1=item1.holdpercentage_1;
	var percentage_2=item1.holdpercentage_2;
	var percentage_3=item1.holdpercentage_3;
	var percentage_4=item1.holdpercentage_4;
	var percentage_5=item1.holdpercentage_5;
	var percentage_6=item1.holdpercentage_6;
	var percentage_7=item1.holdpercentage_7;
	var percentage_8=item1.holdpercentage_8;
	var percentage_9=item1.holdpercentage_9;
	var percentage_10=item1.holdpercentage_10;
	

	// var compname_1=item1.compname_1+"-"+item1.holdpercentage_1;
	// var compname_2=item1.compname_2+"-"+item1.holdpercentage_2;
	// var compname_3=item1.compname_3+"-"+item1.holdpercentage_3;
	// var compname_4=item1.compname_4+"-"+item1.holdpercentage_4;
	// var compname_5=item1.compname_5+"-"+item1.holdpercentage_5;
	// var compname_6=item1.compname_6+"-"+item1.holdpercentage_6;
	// var compname_7=item1.compname_7+"-"+item1.holdpercentage_7;
	// var compname_8=item1.compname_8+"-"+item1.holdpercentage_8;
	// var compname_9=item1.compname_9+"-"+item1.holdpercentage_9;
	// var compname_10=item1.compname_10+"-"+item1.holdpercentage_10;
	
    $('#scheme_code_'+i).text(schemecode);

    if(rupeevest_rating=='5')
    {
      $('#five_'+i).show();
      $('#four_'+i).hide();
      $('#three_'+i).hide();
      $('#two_'+i).hide();
      $('#one_'+i).hide();
      $('#unrated_'+i).hide();
    }
    else if(rupeevest_rating=='4')
    {
      $('#five_'+i).hide();
      $('#four_'+i).show();
      $('#three_'+i).hide();
      $('#two_'+i).hide();
      $('#one_'+i).hide();
      $('#unrated_'+i).hide();
    }
    else if(rupeevest_rating=='3')
    {
    	$('#five_'+i).hide();
      $('#four_'+i).hide();
      $('#three_'+i).show();
      $('#two_'+i).hide();
      $('#one_'+i).hide();
      $('#unrated_'+i).hide();
    }
    else if(rupeevest_rating=='2')
    {
       $('#five_'+i).hide();
      $('#four_'+i).hide();
      $('#three_'+i).hide();
      $('#two_'+i).show();
      $('#one_'+i).hide();
      $('#unrated_'+i).hide();
    }
    else if(rupeevest_rating=='1')
    {
      $('#five_'+i).hide();
      $('#four_'+i).hide();
      $('#three_'+i).hide();
      $('#two_'+i).hide();
      $('#one_'+i).show();
      $('#unrated_'+i).hide();
    }
    else
    {
      $('#five_'+i).hide();
      $('#four_'+i).hide();
      $('#three_'+i).hide();
      $('#two_'+i).hide();
      $('#one_'+i).hide();
      $('#unrated_'+i).show();
    }

	$("#basic_lock_in_period_"+i).html(lockperiod);
	$("#basic_exit_load_"+i).html(exitload);
	$("#basic_expense_ratio_"+i).html(expenceratio);
	$("#basic_launch_date_"+i).html(inception_date);
	$("#inception_return"+i).html(inception_return);
	$("#port_attr_turnover_ratio_"+i).html(turnover_ratio);
	$("#navdate"+i).html(navdate);
	$("#navrs"+i).html(navrs);
	$("#basic_min_inv_"+i).html(minimum_investment);
	$("#navchange"+i).html(navchange);
	$("#performance_stand_dev_"+i).html(sdx_returns);
	$("#performance_beta_"+i).html(betax_returns);
	$("#performance_sharpe_"+i).html(sharpex_returns);
	$("#performance_alpha_"+i).html(alphax_returns);
	$("#performance_sortino_"+i).html(sotinox_returns);
	// $("#total_return"+i).html(total_return);
	// $("#consistency_of_return"+i).html(consistency_of_return);
	// $("#risk"+i).html(risk);
	// $("#cost_factor"+i).html(cost_factor);
	// $("#portfolio_attributes"+i).html(portfolio_attributes);
	$("#s_name_"+i).html("<a target='_blank' class= 'compare' id='"+schemecode+"' href='/Mutual-Funds-India/"+schemecode+"''>"+s_name+"</a");
	$("#fund_manager_"+i).html(fund_manager);
	$("#redemption_period"+i).html(redemption_period);
	$("#classification_"+i).html(classification);
	$("#aumtotal_"+i).html(aumtotal);
	$("#index_name_"+i).html(index_name);
	$("#port_market_large_"+i).html(lcap);
	$("#port_market_mid_"+i).html(mcap);
	$("#port_market_small_"+i).html(scap);
	$("#port_market_avg_cap_"+i).html(ppmcap);
	$("#port_attr_pe_ratio_"+i).html(pe);
	$("#port_attr_pb_ratio_"+i).html(pb);
	$("#return_1y_"+i).html(one_y);
	$("#return_2y_"+i).html(two_y);
	$("#return_3y_"+i).html(three_y);
	$("#return_6m_"+i).html(six_m);
	$("#return_5y_"+i).html(five_y);
	$("#return_10y_"+i).html(ten_y);
	$("#port_attr_avg_maturity_"+i).html(avg_mat);
	$("#port_attr_mod_dur_"+i).html(mod_duration);
	$("#port_attr_yield_maturity_"+i).html(ytm);
	$("#comp1_hold"+i).html(holding_1);
	$("#comp2_hold"+i).html(holding_2);
	$("#comp3_hold"+i).html(holding_3);
	$("#comp4_hold"+i).html(holding_4);
	$("#comp5_hold"+i).html(holding_5);
	$("#comp6_hold"+i).html(holding_6);
	$("#comp7_hold"+i).html(holding_7);
	$("#comp8_hold"+i).html(holding_8);
	$("#comp9_hold"+i).html(holding_9);
	$("#comp10_hold"+i).html(holding_10);
	$("#comp1_percent"+i).html(percentage_1);
	$("#comp2_percent"+i).html(percentage_2);
	$("#comp3_percent"+i).html(percentage_3);
	$("#comp4_percent"+i).html(percentage_4);
	$("#comp5_percent"+i).html(percentage_5);
	$("#comp6_percent"+i).html(percentage_6);
	$("#comp7_percent"+i).html(percentage_7);
	$("#comp8_percent"+i).html(percentage_8);
	$("#comp9_percent"+i).html(percentage_9);
	$("#comp10_percent"+i).html(percentage_10);
	// $("#comp1_hold_percent_"+i).html(compname_1);
	// $("#comp2_hold_percent_"+i).html(compname_2);
	// $("#comp3_hold_percent_"+i).html(compname_3);
	// $("#comp4_hold_percent_"+i).html(compname_4);
	// $("#comp5_hold_percent_"+i).html(compname_5);
	// $("#comp6_hold_percent_"+i).html(compname_6);
	// $("#comp7_hold_percent_"+i).html(compname_7);
	// $("#comp8_hold_percent_"+i).html(compname_8);
	// $("#comp9_hold_percent_"+i).html(compname_9);
	// $("#comp10_hold_percent_"+i).html(compname_10);
	$(".col_"+i).css("display", "block");
	
	
}

 },
  error:function(jqXHR, textStatus, errorThrown) {
    // alert("AJAX Error:" + textStatus);
  }

  })
}




function comparison_graph(final_array , array_id , name_arr, color_arr)   //added on 6.3.2017
                   {

                          var seriesOptions = [],
                          seriesCounter = 0,
                          names = [];
                          for(var t=0;t<final_array.length;t++)
                          {
                            seriesOptions[t] = {
                                name: name_arr[t],
                                data: final_array[t],
                                color: color_arr[t]   
                                             }; 
                          }
                         var selected=4;
                   
                        if (final_array[0].length >= 350  &&  final_array[0].length <= 1090)
                        {
                              selected=3;
                        }
                        else if (final_array[0].length > 1090 && final_array[0].length <= 1825)
                        {
              
                             selected=5;
                        }
                        else if(final_array[0].length > 180 && final_array[0].length <= 365)
                        {
                             
                             selected=8; 
                        }
                        else if(final_array[0].length > 90 && final_array[0].length <= 180)
                        {
                             
                             selected=8; 
                        }
                        else if(final_array[0].length > 30 && final_array[0].length <= 90)
                        {
                             
                             selected=8; 
                        }
                        else
                        {
                               selected=5;

                        }



                         Highcharts.stockChart('compare_chart', {

                          

                          yAxis: {
                              labels: {
                                  formatter: function () {
                                      return (this.value > 0 ? ' + ' : '') + this.value + '%';
                                  }
                              },
                              plotLines: [{
                                  value: 0,
                                  width: 2
                               
    

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
                                 text: 'RupeeVest',
                                 href: 'https://www.rupeevest.com/'
                                 
                            },
                            exporting: { enabled: false },

                          series: seriesOptions,
                          rangeSelector: {
                                       buttonTheme: { 
                                              
                                              stroke: 'none',
                                              'stroke-width': 0,
                                              
                                              style: {
                                                
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
                                            
                            allButtonsEnabled: false,
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
                            },{
                                type: 'year',
                                count: 1,
                                text: '1y'
                            },{
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
                            },
                            , {
                                type: 'year',
                                count: 10,
                                text: '10y'
                            }, {
                                type: 'all',
                                text: 'All'
                            }],
                            
                            selected: selected
                        } 

                      }, function (chart) {

      
        setTimeout(function () {
            $('input.highcharts-range-selector', $(chart.container).parent())
                .datepicker();
        }, 0);
    });

                  }