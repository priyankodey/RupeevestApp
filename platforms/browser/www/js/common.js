var idleTime_gbl = 50; // to logout after time out

$(document).ready(function(){
	$(document).on('click','#main-tabs li.nav-menu a',function(){
		if($(this).closest('li').hasClass('active')){
			$(this).closest('li').removeClass('active');
		}
	});
	$(document).on('click','.ui-autocomplete li',function(){
		//alert();
		// setvalue_schemename()
	});
});

// ////xirr-FUNCTIon-APAche Open-Office (Used in Sip Return) ////// ///// 
 

 function XIRR(values, dates, guess) 
 {
  // Credits: algorithm inspired by Apache OpenOffice
   
  // Calculates the resulting amount
  var irrResult = function(values, dates, rate) {
    var r = rate + 1;
    var result = values[0];
    for (var i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, moment(dates[i]).diff(moment(dates[0]), 'days') / 365);
    }
    return result;

  }


  // Calculates the first derivation
  var irrResultDeriv = function(values, dates, rate) {
    var r = rate + 1;
    var result = 0;
    for (var i = 1; i < values.length; i++) {
      var frac = moment(dates[i]).diff(moment(dates[0]), 'days') / 365;
      result -= frac * values[i] / Math.pow(r, frac + 1);
    }
    return result;
  }


  // Check that values contains at least one positive value and one negative value
  var positive = false;
  var negative = false;
  for (var i = 0; i < values.length; i++) {
    if (values[i] > 0) positive = true;
    if (values[i] < 0) negative = true;
  }
  

  // Return error if values does not contain at least one positive value and one negative value
  if (!positive || !negative) return '#NUM!';

  // Initialize guess and resultRate
  var guess = (typeof guess === 'undefined') ? 0.1 : guess;
  var resultRate = guess;
  
  // Set maximum epsilon for end of iteration
  var epsMax = 1e-10;
  
  // Set maximum number of iterations
  var iterMax = 100;

  // Implement Newton's method
  var newRate, epsRate, resultValue;
  var iteration = 0;
  var contLoop = true;
  do {
    resultValue = irrResult(values, dates, resultRate);
    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
    epsRate = Math.abs(newRate - resultRate);
    resultRate = newRate;
    // console.log(epsRate);
    // console.log(resultValue);
    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
  } while(contLoop && (++iteration < iterMax));

  if(contLoop) return '#NUMjhj!';

  // Return internal rate of return
  return resultRate;
}





 //////////////END///////////////////////





// function schemedata_landing()
// {
	
// 	$.ajax({
// 			type:'GET',
// 			url: '/functionalities/schemedata_landing',
// 			datatype:'json',
// 			success:function(data1, textStatus, jqXHR) {
// 				console.log("check1");
// 				console.log(data1);
// 				fill_snapshot_table(data1);
// 				// debugger;

// 				// $('#ui_classification').html(data1.selected_asset_class);
//             	if(data1.condition=="asset")
//             	{
// 	                insert_asset_selection(data1.selected_asset_class[0].replace(/(')/g, ""));
// 	                print_asset_selection();
// 	                select_asset();
// 	                var id=data1.selected_asset_class[0].replace(/(:| |-|')/g, "");
// 	             	 alert(id);
// 	             	 $("#"+id).attr('checked','true');
// 	                $("#fmanager").attr('checked','true');
// 	                $("#fund_index").attr('checked','true');
// 	                $("#ChkAmc").attr('checked','true');
// 	                $("#chkratingAll").attr('checked','true');
// 	             }
// 	             else if(data1.condition=="fund_manager")
// 	             {
// 	             	fund_m_selection.push(data1.selected_asset_class[0].replace(/(')/g, ""))
	             	
// 	             	 print_manager_selection();
// 	             	 var id=data1.selected_asset_class[0].replace(/(:| |-|')/g, "");
// 	             	 alert(id);
// 	             	 $("#"+id).attr('checked','true');
// 	             	 $("#fmanager").attr('checked','false');
// 	             	 $("#fund_index").attr('checked','true');
// 	                $("#ChkAmc").attr('checked','true');
// 	                $("#chkratingAll").attr('checked','true');
// 	             }
// 	             else if(data1.condition=="index_name")
// 	             {
// 	             	index_selection.push(data1.selected_asset_class[0].replace(/(')/g, ""))
	             	
// 	             	 print_index_selection();
// 	             	 var id=data1.selected_asset_class[0].replace(/(:| |-|')/g, "");
// 	             	 alert(id);
// 	             	 $("#"+id).attr('checked','true');

// 	             	 // document.getElementById(data1.selected_asset_class[0].replace(/(:| |-|')/g, "")).checked = true;

// 	             	 $("#fund_index").attr('checked','false');
// 	               $("#ChkAmc").attr('checked','true');
// 	                $("#chkratingAll").attr('checked','true');
// 	                $("#fmanager").attr('checked','true');
// 	             }
// 	             else if(data1.condition=="fund_house")
// 	             {
// 	             	amc_selection.push(data1.selected_asset_class[0].replace(/(')/g, ""))
	             	
// 	             	 print_amc_selection();
// 	             	 var id=data1.selected_asset_class[0].replace(/(:| |-|')/g, "");
// 	           		 alert(id);
// 	             	 $("#"+id).attr('checked','true');
// 	             	 $("#ChkAmc").attr('checked','false');
// 	             	 $("#fmanager").attr('checked','true');
// 	                $("#fund_index").attr('checked','true');
	                
// 	                $("#chkratingAll").attr('checked','true');
// 	             }
// 	             else
// 	             {
// 	             	insert_asset_selection("Equity : Multi Cap");
// 	                print_asset_selection();
// 	                select_asset();
// 	                $("#fmanager").attr('checked','true');
// 	                $("#fund_index").attr('checked','true');
// 	               $("#ChkAmc").attr('checked','true');
// 	               $("#chkratingAll").attr('checked','true');
// 	             }



// 				// var sorter = tsorter.create('snapshotTable');
// 			},
// 			error:function(jqXHR, textStatus, errorThrown) {
// 				alert("AJAX Error:" + textStatus);
// 			}

// 		})
// }

function setvalue_asset(obj,condition)
{
	// if(document.cookie!="")
	// {
	// 	alert("js");

	 //    createCookie("asset","",-1);
		// createCookie("rating","",-1);
		// createCookie("amc","",-1);
		// createCookie("fund_manager","",-1);
		// createCookie("index","",-1);
		// createCookie("fund_type","",-1);
	
	// 	alert("common.js");
	 	// alert(document.cookie);
	// }	
	$.ajax({
			type:'post',
			url: '/home/set_asset_class',
			data :{selection:obj,condition:condition},
			datatype:'json',
			success:function(data) {
				
				 window.open('/Mutual-Funds-India/Screener');
			// window.location = "/Mutual-Funds-India/Screener";
			//redirect_url(scheme_code.schemecode);
			},
			async: false,
			error:function(jqXHR, textStatus, errorThrown) {
				// alert("AJAX Error:" + textStatus);
			  }

			  })
}


function createCookie(name,value,days)
{
   if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function setvalue(obj)
{
	// ajax_flag=1;
	// alert(ajax_flag);
	
	window.location = "/Mutual-Funds-India/"+obj
	// $.ajax({
	// 		type:'post',
	// 		url: '/home/index',
	// 		data :{schemecode:obj},
	// 		datatype:'json',
	// 		success:function(scheme_code, textStatus, jqXHR) {
	// 		console.log(scheme_code);
	// 		window.location = "/home/index_latest?";//redirect_url(scheme_code.schemecode);
	// 		},
	// 		error:function(jqXHR, textStatus, errorThrown) {
	// 			alert("AJAX Error:" + textStatus);
	// 		  }

	// 		  })
}

function setvalue_schemename()
{
	var obj = document.getElementById("fund_names").value;
	$.ajax({
			type:'post',
			url: '/home/index_search',
			data :{schemename:obj},
			datatype:'json',
			success:function(scheme_code, textStatus, jqXHR) {

				if(scheme_code.schemecode!='undefined')
				{
					console.log(scheme_code);
				    window.location = "/Mutual-Funds-India/"+scheme_code.schemecode;//redirect_url(scheme_code.schemecode);
				}
				

			},
			error:function(jqXHR, textStatus, errorThrown) {
				// alert("AJAX Error:" + textStatus);
			  }

			  })
}
function redirect_url(scheme_code)
{
      
     // alert(scheme_code);
     // console.log("in redirect_url");
     // console.log(scheme_code);
var schemecode = scheme_code;
	$.ajax({
			type: "get",
			// url: '/Mutual-Funds-India/dummy_fund_house/dummy_fund_name/'+schemecode,
			url: '/home/index_latest_new',
			data :{schemecode:schemecode},
			datatype:'json',
			success:function(scheme_data, textStatus, jqXHR) {

				console.log(scheme_data);
				var scheme_item = scheme_data.schemedata[0]
				var min_sip_inv = "-"

				if(scheme_data.sip_min_investment[0]!=undefined)
				{
                      // alert(scheme_data.sip_min_investment[0]!=undefined);

                      // alert(scheme_data.sip_min_investment);

                 if(scheme_data.sip_min_investment[0].sipmininvest!=null || scheme_data.sip_min_investment[0].sipmininvest!='')
				     {
								min_sip_inv = scheme_data.sip_min_investment[0].sipmininvest;
								min_sip_inv = commaSeparateNumber(min_sip_inv);
				      }

				}
				
				
				var s_name = scheme_item.s_name;
				var fund_manager = scheme_item.fund_manager;
				var navdate = "Nav as on " + moment(scheme_item.navdate).format('DD-MMM-YY');
				var navrs = parseFloat(scheme_item.navrs).toFixed(2);
				
				if (typeof scheme_item.navchange === 'undefined' || scheme_item.navchange === null)
                 {
                 	var navchange = "-" ;
                 }
                 else
                 {
                 	var navchange = parseFloat(scheme_item.navchange) + "%";	
                 }

				var inception_date = moment(scheme_item.inception_date).format('DD-MMM-YY');
				var inception_return;
                
                if(scheme_item.inception_return==null || scheme_item.inception_return=="undefined")
                {
             		inception_return = "-";
                }
                else
                {
                	inception_return = scheme_item.inception_return;
                	inception_return =inception_return+" %";
                }
				

				var exitload;
               
                if(scheme_item.exitload==null || scheme_item.exitload=="undefined")
                {
                	exitload = "-";
                }
                else
                {
                	exitload = scheme_item.exitload;
                	exitload=exitload+" %";
                }

				
				var expenceratio;
                 
                if(scheme_item.expenceratio==null || scheme_item.expenceratio=="undefined") 
                {
                	 expenceratio = "-";
                }
                else
                {
                	expenceratio = scheme_item.expenceratio;
                	expenceratio = expenceratio+" %";
                }


				var turnover_ratio;
				

				if (parseInt(scheme_item.turnover_ratio)==0 || scheme_item.turnover_ratio==null || scheme_item.turnover_ratio=='undefined')
                  {
                  		turnover_ratio = "-";
                  }
                  else
                  {
                     turnover_ratio = scheme_item.turnover_ratio+" %";  	
                  }
				
				var minimum_investment;
               
                 if(scheme_item.minimum_investment==0 || scheme_item.minimum_investment==null ||  scheme_item.minimum_investment=='undefined' )
                 {
                 	 minimum_investment = "-";
                 }
                 else
                 {
                 	minimum_investment = scheme_item.minimum_investment;
                 	minimum_investment = commaSeparateNumber(minimum_investment);
                 }
					
				var lockperiod;

               if(scheme_item.lockperiod==null)
               {
                  lockperiod="-"; 
               }
               else
               {
               	 if(parseInt(scheme_item.lockperiod) > 0)
               	 {
                    lockperiod = scheme_item.lockperiod+" Years";
               	 }
               	 else
               	 {
               	 	lockperiod = scheme_item.lockperiod;
               	 }
               	 
               }

				


				// var index_name = scheme_item.index_name;
				var redemption_period = scheme_item.redemption_period;
				
				var aumtotal;

				if(scheme_item.aumtotal==null || scheme_item.aumtotal=='undefined')
				{
					aumtotal = "-";
				}
				else
				{
					aumtotal = (parseFloat(scheme_item.aumtotal)).toFixed(1);
					aumtotal = commaSeparateNumber(aumtotal);
				}
				
				var aumdate;
             
               // alert(scheme_item.aumdate);
				if(aumtotal=="-")
				{
					aumdate = "AUM Not Available";
				}
				else
				{
					aumdate = "AUM as on "+ moment(scheme_item.aumdate).format('DD-MMM-YY');
				}

				var portfolio_attributes = scheme_item.portfolio_attributes;
				var cost_factor = scheme_item.cost_factor;
				var risk = scheme_item.risk;
				var consistency_of_return = scheme_item.consistency_of_return;
				var total_return = scheme_item.total_return;
				var fund_house = scheme_item.fund_house;
				var index_name = scheme_item.index_name;
				var classification = scheme_item.classification;
				var navrs_gp = scheme_item.navrs_gp;
				var type = scheme_item.type;   
 
                  if(type=="Open ended scheme")
                  {
                  		type="Open Ended";
                  }
                  else if(type=="Close ended scheme")
                  {
                  		type="Closed Ended";
                  }
                  else
                  {
                       type="Interval Fund";
                  }
              

				var rating = scheme_item.rupeevest_rating;
				var exitloadremarks = scheme_item.exitload_remarks;
        var rr , rr_ico;
		if (rating)
		{
			rr = rating;
			if(rr == 5){
				rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"
			}
			else if (rr == 4){
				rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"
			}
			else if (rr == 3){
				rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"				
			}
			else if (rr == 2){
				rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"	
			}
			else if (rr == 1){
				rr_ico = "<span class = 'glyphicon glyphicon-star'></span>"
			}
			else if (rr == "Unrated"){
				rr_ico = "Unrated"
			}
		}
		else
		{
			rr = "-";
		}


				$("#s_name").html(s_name);
				$("#rv_rating").html("<span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span>");
				$("#fund_manager").html(fund_manager);
				$("#navrs").html(navrs);

				$("#navchange").html(navchange);
                

                

				if(parseFloat(scheme_item.navchange)>=0)
				{
					    
						$("#navchange").css("color", "#6d9f00");

				}
				else
				{     
                        $("#navchange").css("color", "#ff0000");
				}
				$("#navdate").html(navdate);
				$("#inception_date").html(inception_date);
				$("#inception_return").html(inception_return);
				$("#exitload").html(exitload);

				$("#expenceratio").html(expenceratio);

				$("#turnover_ratio").html(turnover_ratio);
				$("#minimum_investment").html(minimum_investment+" / "+min_sip_inv);
			    $("#index_name").html(index_name);
				$("#lockperiod").html(lockperiod);
				$("#redemption_period").html(redemption_period);
				$("#portfolio_attributes").html(portfolio_attributes);
				$("#cost_factor").html(cost_factor);
				$("#risk").html(risk);
				$("#consistency_of_return").html(consistency_of_return);
				$("#total_return").html(total_return);
				$("#aumtotal").html(aumtotal);
				$("#aumdate").html(aumdate);
				$("#fund_house").html(fund_house);
				// $("#index_name").html(index_name);
				$("#classification").html(classification);
				$("#growth").html(navrs_gp);
				$("#type").html(type);
				$("#exitload-modal").html(exitloadremarks);

				get_growth_plan(schemecode);
				get_return_data(schemecode);
				// get_risk_measures(schemecode);
				get_peer_comparision(schemecode);
				// concentration_values();
				get_portfolio_holdings(schemecode);
				get_dividend_data(schemecode);
				get_hold_asset(schemecode);
				// get_portfolio_markettable();
				// get_portfolio_markettable_avgmcap();
				// get_portfolio_markettable_allcapavgs();
				// get_recent_updates(schemecode); #commented on 24.01.2017 as its not needed but keep it for later use
				get_status(schemecode);
				get_objectives(schemecode);
				// get_exitload_remarks();
				/*get_risk_measures();
                

				port_avgcap();*/

				get_fund_manager(schemecode);

				get_rt_info(schemecode);
				get_amc_info(schemecode);
				
				get_indexe_name(schemecode);
				get_related_funds(classification);

			},
			error:function(jqXHR, textStatus, errorThrown) {
				// alert("AJAX Error:" + textStatus);
			}
		});
}

function get_related_funds(classification)
{
	  $.ajax({
		 type:'GET',
		 url: '/home/related_funds',
		 data :{classification:classification},
		 datatype:'json',
		 success:function(searchdata, textStatus, jqXHR) {
		 
		 
		 // console.log("--------------< index_name >--------------");
		 // console.log(searchdata);
		 // console.log("--------------< index_name >--------------");
		 tblData_1="";
		 var count=0;
          var tblData_1="<thead><tr><th>Fund Name</th><th>5 Yr Return (%)</th></tr></thead><tbody>";
            for(var i=0; i< searchdata.related_funds.length;i++)
            {
                 var s_name = searchdata.related_funds[i].s_name;
                 var returns_5year = searchdata.related_funds[i].returns_5year;
                 var rupeevest_rating = searchdata.related_funds[i].rupeevest_rating;
                 var schemecode =  searchdata.related_funds[i].schemecode;
                 var rr , rr_ico;
				if (rupeevest_rating)
				{
					rr = rupeevest_rating;
					if(rr == 5){
						rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"
					}
					else if (rr == 4){
						rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"
					}
					else if (rr == 3){
						rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"				
					}
					else if (rr == 2){
						rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"	
					}
					else if (rr == 1){
						rr_ico = "<span class = 'glyphicon glyphicon-star'></span>"
					}
					else if (rr == "Unrated"){
						rr_ico = "Unrated"
					}
				}
				else
				{
					rr = "-";
				}

// <td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' onclick='setvalue(this.id)'>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td>
                 if(i==0)
                 {
                      tblData_1 = tblData_1+"<tr><td><a target='_blank' id="+schemecode+" href='/Mutual-Funds-India/"+schemecode+"' '>"+s_name+"</a><br><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td>"+returns_5year+"</td></tr>";
                      count++;
                 }
                else 
                 {
                    tblData_1 = tblData_1+"<tr><td><a target='_blank' id="+schemecode+" href='/Mutual-Funds-India/"+schemecode+"' >"+s_name+"</a><br><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td>"+returns_5year+"</td></tr>";
                 }
                 // tblData_1 = tblData_1 + '<span id="'indexname_'"'+i+'" onclick='setvalue_asset('$(#indexname_"'+i+'").html()','index_name')'>"'+indexname+"("+weight+")"+"</span>'
           
                 // tblData_1 = tblData_1 +'<span id="indexname_'+i+'" onclick = "setvalue_asset( $(#indexname_'+i+').html() ,'+ndex_n+')">'+indexname+' ('+weight+')'+'</span>'
                  
                
                   

            }
                tblData_1 = tblData_1+"</tbody>";

              // $('#fund_mgr_table').html("");
              // $('#fund_mgr_table').html(tblData1);
          
              // alert(tblData_1);
              
		      $("#related_funds").html("");
		      $("#related_funds").html(tblData_1);
		      tblData_1="";
		     // alert($("#index_name_div").html(tblData_1));
		},
		 error:function(jqXHR, textStatus, errorThrown) {
		   // alert("AJAX Error:" + textStatus);
		 }
 })
}


function get_indexe_name(schemecode)
{
      $.ajax({
		 type:'GET',
		 url: '/home/get_indexe_name_scheme_wise',
		 data :{schemecode:schemecode},
		 datatype:'json',
		 success:function(searchdata, textStatus, jqXHR) {
		 
		 
		 // console.log("--------------< index_name >--------------");
		 // console.log(searchdata);
		 // console.log("--------------< index_name >--------------");
		 var count=0;
          var tblData_1="<thead><tr><th>Index</th><th>Weight (%)</th></tr></thead><tbody>";
            for(var i=0; i<= searchdata.index_name.length-1;i++)
            {
                 var index_code = searchdata.index_name[i].indexcode;
                 var indexname = searchdata.index_name[i].indexname;
                 var weight = searchdata.index_name[i].weightage;
                 var weight_new=0 

                 if(weight != null || searchdata.index_name[i].weightage!= null)
                 {
                     weight_new = parseFloat(weight);
                 }


                 if(weight_new!=0)
                 {
                      tblData_1 = tblData_1+"<tr><td>"+indexname+"</td><td>"+weight_new+"</td></tr>";
                      count++;
                 }
                else if(count==0 && i==(searchdata.index_name.length-1))
                 {
                    tblData_1 = tblData_1+"<tr><td>"+searchdata.index_name[0].indexname+"</td><td>"+"100"+"</td></tr>";
                 }
                 // tblData_1 = tblData_1 + '<span id="'indexname_'"'+i+'" onclick='setvalue_asset('$(#indexname_"'+i+'").html()','index_name')'>"'+indexname+"("+weight+")"+"</span>'
           
                 // tblData_1 = tblData_1 +'<span id="indexname_'+i+'" onclick = "setvalue_asset( $(#indexname_'+i+').html() ,'+ndex_n+')">'+indexname+' ('+weight+')'+'</span>'
                  
                
                   

            }
                tblData_1 = tblData_1+"</tbody>";

              // $('#fund_mgr_table').html("");
              // $('#fund_mgr_table').html(tblData1);
          
              // alert(tblData_1);
              
		      $("#benchmark_indices_table").html("");
		      $("#benchmark_indices_table").html(tblData_1);
		     // alert($("#index_name_div").html(tblData_1));
		},
		 error:function(jqXHR, textStatus, errorThrown) {
		   // alert("AJAX Error:" + textStatus);
		 }
 })
}


function get_rt_info(schemecode)
{
		 $.ajax({
		 type:'GET',
		 url: '/home/get_root_mst_info',
		 data :{schemecode:schemecode},
		 datatype:'json',
		 success:function(searchdata, textStatus, jqXHR) {
		 
		
		 console.log(searchdata);
          var tblData1="";
          var th = "<thead><tr><th>RT Name</th><tr><th>Email</th><tr><th>Tel No</th><tr><th>website</th></tr></thead>";
            for(var i =0; i<= searchdata.rt_info.length-1;i++)
            {

            	
                 var recent_data = searchdata.rt_info[i];
                 console.log(recent_data);
                 // alert(recent_data);
              //   var fundmanager = recent_data.fundmanager;
               

     //               CIRTARTA
					// CIRTAPhone
					// CIRTAEmail
					// CIRTAWebsite
                    
                     $('#CIRTARTA').html(recent_data.rt_name);
	                 $('#CIRTAPhone').html(recent_data.tel);
					 $('#CIRTAEmail').html(recent_data.email);
					 if(recent_data.website.indexOf("http")==-1)
					 {
					 	website1="https://"+recent_data.website
					 }
					 else
					 {
					 	website1=recent_data.website
					}
					 $('#CIRTAWebsite').html(website1);
					 $('#CIRTAWebsite').attr("href",website1);
                    // recent_data.rt_name
	            	// recent_data.email
	            	// recent_data.tel
	            	// recent_data.website
 
            
            }
           
              // $('#fund_mgr_table').html("");
              // $('#fund_mgr_table').html(tblData1);
		 
		},
		 error:function(jqXHR, textStatus, errorThrown) {
		   // alert("AJAX Error:" + textStatus);
		 }
 })
}


function get_amc_info(schemecode)
{
		 $.ajax({
		 type:'GET',
		 url: '/home/get_amc_mst_info',
		 data :{schemecode:schemecode},
		 datatype:'json',
		 success:function(searchdata, textStatus, jqXHR) {
		 
		
		 // console.log(searchdata);
   //       alert(searchdata);

          var tblData1="";
          var website;
          var th = "<thead><tr><th>Fund Manager</th></tr></thead>";
            for(var i =0; i<= searchdata.amc_info.length-1;i++)
            {

            	
                var recent_data = searchdata.amc_info[i];
                console.log(recent_data)
                 // alert(recent_data);
                  
                 
                 $('#CIFHAMC').html(recent_data.amc);
                  $('#CIFHPhone').html(recent_data.phone);
				 $('#CIFHEmail').html(recent_data.email);
				 if(recent_data.website.indexOf("http")==-1)
				 {
				 	website="https://"+recent_data.website
				 }
				 else
				 {
				 	website=recent_data.website
				 }

				 $('#CIFHWebsite').html(website);
				$('#CIFHWebsite').attr("href",website);
                

    //             alert(recent_data.amc); 
    //             alert(recent_data.phone);
				// alert(recent_data.email);
    // 			alert(recent_data.website);

                 // recent_data.amc
            	 // recent_data.phone
            	 // recent_data.email
            	 // recent_data.website



            }
           
              // $('#fund_mgr_table').html("");
              // $('#fund_mgr_table').html(tblData1);
		 
		},
		 error:function(jqXHR, textStatus, errorThrown) {
		   // alert("AJAX Error:" + textStatus);
		 }
 })
}

function get_fund_manager(schemecode)
{
		 $.ajax({
		 type:'GET',
		 url: '/home/get_fund_manager',
		 data :{schemecode:schemecode},
		 datatype:'json',
		 success:function(searchdata, textStatus, jqXHR) {
		 
		
		 console.log(searchdata);
          var tblData1="";
          var th = "<thead><tr><th>Fund Manager</th></tr></thead>";
            for(var i =0; i<= searchdata.fund_managers.length-1;i++)
            {
                var recent_data = searchdata.fund_managers[i];
                // console.log(recent_data)
                var fundmanager = recent_data.fundmanager;
               


                if(i == 0)
                {
                    tblData1 = th + "<tr><td>"+fundmanager+"</td><</tr>";
                }
               else
                {
                    tblData1 = tblData1 + "<tr><td>"+fundmanager+"</td></tr>";
                }
              }
           
              $('#fund_mgr_table').html("");
              $('#fund_mgr_table').html(tblData1);
		 
		},
		 error:function(jqXHR, textStatus, errorThrown) {
		   // alert("AJAX Error:" + textStatus);
		 }
 })
}

function add_compare()
{
	// location.href = 'http://localhost:3000/home/comparison';
	var checkboxId;
	var chkbox_counter = 0;
	var array_scheme=[]
	var chkboxes = document.getElementsByName("chkCompare");
	//alert(chkboxes.length);
	for(var i=0;i<=chkboxes.length-1;i++)
	{
		if(chkboxes[i].checked == true)
		{

			if(chkbox_counter >= 4)

			{
				alert("only maximum of 4 funds can be selected");
				break;
			}
			else
			{
				array_scheme.push(chkboxes[i].id);
				if(chkbox_counter == 0)
				{
					checkboxId = chkboxes[i].id;
				}
				else
				{
					checkboxId = checkboxId + "-" + chkboxes[i].id;
				}
				chkbox_counter = chkbox_counter + 1;
			}
		}
	}
	// alert(''+chkbox_counter);
	// localStorage.setItem('selectedFunds',checkboxId);
	if(chkbox_counter < 2)
	{
		swal("Select at least 2 funds");
	}
	else
	{
		// alert(checkboxId);
		// window.location = "/home/index1_latest";
		 // window.location="/home/comparison?ids="+checkboxId
       var url = "/Mutual-Fund-Comparison/"+checkboxId;
       
		 window.open(url,'_blank');
	}
}

function fundname_search_rolling_return()
{
	$.ajax({
		type:'GET',
		url: '/home/get_search_data',
		datatype:'json',
		success:function(searchdata, textStatus, jqXHR) {
				 
				 
						 var schemename = [];
						 map = {};
 

						 for(var i =0;i <= searchdata.search_data.length-1;i++)
						 {
							var item1 = searchdata.search_data[i];
							var scheme_code = item1.scheme_code;
							var s_name = item1.s_name;
							schemename.push(item1.s_name);                               
                            s_name_temp = item1.s_name                            
                            s_name_temp=s_name_temp.replace(/-/g,' ');
							map[s_name_temp] = item1.schemecode
						 }
                          

						 //    $("#fund_names_sip").autocomplete({
						 //    	maxResults: 10,
							// 	source: schemename,
							// });
 						
						    	
							// $.ui.autocomplete.filter = function (array, term) {
				   //      var matcher = new RegExp("(^| )" + $.ui.autocomplete.escapeRegex(term), "i");
				   //      return $.grep(array, function (value) {
				   //          return matcher.test(value.label || value.value || value);
				   //      });
				   //  	};
                           

                           $("#fund_rolling").autocomplete ( {
    source: function (requestObj, responseFunc) {
                var matchArry   = schemename.slice (); //-- Copy the array
                var srchTerms   = $.trim (requestObj.term).split (/\s+/);

                //--- For each search term, remove non-matches.
                $.each (srchTerms, function (J, term) {
                    var regX    = new RegExp (term, "i");
                    matchArry   = $.map (matchArry, function (item) {
                        return regX.test (item)  ?  item  : null;
                    } );
                } );


                

                /* New jQuery-UI busts this AND the old highlighting!
                    //--- For any surviving matches, highlight the terms.
                    $.each (srchTerms, function (J, term) {
                        matchArry       = $.map (matchArry, function (item) {
                            var regX    = new RegExp (term, "ig");

                            return item.replace (regX, '<span class="srchHilite">' + term + '</span>');
                        } );
                    } );
                */

                //--- Return the match results.
                responseFunc (matchArry);
            },
         open: function (event, ui) {
                /*--- This function provides no hooks to the results list, so we have to trust the
                    selector, for now.
                */
                var resultsList = $("ul.ui-autocomplete > li.ui-menu-item > a");
                var srchTerm    = $.trim ( $("#fund_rolling").val () ).split (/\s+/).join ('|');

                //--- Loop through the results list and highlight the terms.
                resultsList.each ( function () {
                    var jThis   = $(this);
                    var regX    = new RegExp ('(' + srchTerm + ')', "ig");
                    var oldTxt  = jThis.text ();

                    jThis.html (oldTxt.replace (regX, '<span class="srchHilite">$1</span>') );
                } );
            }
        });
						//$("#scheme_code").html(scheme_code);
						//$("#s_name").html(s_name);
						// console.log(schemename);

		},
		 error:function(jqXHR, textStatus, errorThrown) {
		   // alert("AJAX Error:" + textStatus);
		 }
 })
}

function fundname_search()
{
	$$.get(curr_ip+'/home/get_search_data',function (data) {
		var searchdata=JSON.parse(data);
		var schemename = [];
		for(var i =0;i <= searchdata.search_data.length-1;i++)
		{
			var item1 = searchdata.search_data[i];
			var scheme_code = item1.scheme_code;
			var s_name = item1.s_name;
			schemename.push(item1.s_name);
		}
		$( "#fund_names" ).autocomplete({
      		source: schemename,
      		select: function (e, ui) {
		        var schemename= ui.item.value;
		        $$.post(curr_ip+'/home/index_search',{schemename: schemename},function (data) {
		        	var scheme_code_new=JSON.parse(data);
    				if(myApp.getCurrentView().activePage.name==='FundDetails'){
    					mainView.router.reloadPage('FundDetails.html?scheme_code='+scheme_code_new.schemecode);
    				}
    				else{
    					mainView.router.loadPage('FundDetails.html?scheme_code='+scheme_code_new.schemecode);
    				}
		        });
		    }
    	});
       });
}




// function fundname_search_sip_return()
// {
// 	$.ajax({
// 		type:'GET',
// 		url: curr_ip+'home/get_search_data',
// 		datatype:'json',
// 		success:function(searchdata, textStatus, jqXHR) {
				 
				 
// 		 var schemename = [];
// 		 map = {};


// 		 for(var i =0;i <= searchdata.search_data.length-1;i++)
// 		 {
// 			var item1 = searchdata.search_data[i];
// 			var scheme_code = item1.scheme_code;
// 			var s_name = item1.s_name;
// 			schemename.push(item1.s_name);                               
//             s_name_temp = item1.s_name                            
//             s_name_temp=s_name_temp.replace(/-/g,' ');
// 			map[s_name_temp] = item1.schemecode
// 		 }
// 						console.log(map); 
                           

//        $("#fund_names_sip").autocomplete ( {
//     		source: function (requestObj, responseFunc) {
//                 var matchArry   = schemename.slice (); 
//                 var srchTerms   = $.trim (requestObj.term).split (/\s+/);

//                 console.log("aaaaaaaaaaaaaaaaaaaaaa");
//                 $.each (srchTerms, function (J, term) {
//                     var regX    = new RegExp (term, "i");
//                     matchArry   = $.map (matchArry, function (item) {
//                         return regX.test (item)  ?  item  : null;
//                     } );
//                 } );

                
              
//                 responseFunc (matchArry);
//             },
//          open: function (event, ui) {
                
//                 var resultsList = $("ul.ui-autocomplete > li.ui-menu-item > a");
//                 var srchTerm    = $.trim ( $("#fund_names_sip").val () ).split (/\s+/).join ('|');

               
//                 resultsList.each ( function () {
//                     var jThis   = $(this);
//                     var regX    = new RegExp ('(' + srchTerm + ')', "ig");
//                     var oldTxt  = jThis.text ();

//                     jThis.html (oldTxt.replace (regX, '<span class="srchHilite">$1</span>') );
//                 } );
//             },
//             select: function (a, b) 
//                    {
//                         $(this).val(b.item.value); 
                         
//                           $('#container-head').show();
//                           var scheme_name = $('#fund_names_sip').val();
//                             scheme_name = scheme_name.replace(/-/g,' ');
//                             console.log(scheme_name);
//                             console.log(map);
//                             var schemecode = map[scheme_name];
//                           var frequency = $('#frequency :selected').text();

//                           var amount = $('#amt').val();
//                               amount=amount.replace(/,/g, '');
//                              //$('#amt').html(commaSeparateNumber(amount));

//                           var startDate = new Date($('#from_date').val());
//                           var endDate = new Date($('#to_date').val());

//                           console.log("//////////////////////");
//           console.log(startDate);
          
//                           startDate = moment(startDate).format('YYYY-MM-DD');
//                           endDate = moment(endDate).format('YYYY-MM-DD');
//           console.log("//////////////////////");
//           console.log(startDate);                                          

//                            var scheme_name1 = $('#fund_names_sip').val();
//                           var url_fund_name;
//                               url_fund_name = scheme_name1.replace(/&/g,'');
//                               url_fund_name = url_fund_name.replace(/-/g,' ');
//                               url_fund_name = url_fund_name.replace(/'/g,'');
//                               url_fund_name = url_fund_name.replace("[",'(');
//                               url_fund_name = url_fund_name.replace("]",')');
//                               url_fund_name = url_fund_name.replace("<",'LT');
//                               url_fund_name = url_fund_name.replace(">",'Gt');
//                               url_fund_name = url_fund_name.replace("/",'');
//                               url_fund_name = url_fund_name.replace("‘",'');
//                               url_fund_name = url_fund_name.replace("'",'');
//                               url_fund_name = url_fund_name.replace("%",'');  // added 29.08.2017

//                               url_fund_name = url_fund_name.replace(/ *\([^)]*\) */g, "")
//                               // alert(url_fund_name);
//                               url_fund_name = url_fund_name.trim().replace(/ /g,'-');


//                           var url1 = "/Mutual-Fund-Calculator/Sip-Return/"+url_fund_name+"/"+schemecode
//                         //  window.history.pushState('','',url1);
//                           console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjj");

//                           test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);


//                     }


//         });
						

// 		},
// 		 error:function(jqXHR, textStatus, errorThrown) {
// 		   // alert("AJAX Error:" + textStatus);
// 		 }
//  })
// }

function fundname_search_sip_return()
{
    $.ajax({
        type:'GET',
        url: curr_ip+'home/get_search_data',
        datatype:'json',
        success:function(searchdata, textStatus, jqXHR) {
                 
                 
     	var schemename = [];
     	map_sip = {}; 

     	for(var i =0;i <= searchdata.search_data.length-1;i++)
     	{     		
	        var item1 = searchdata.search_data[i];
	        var scheme_code = item1.scheme_code;
	        var s_name = item1.s_name;
	        schemename.push(item1.s_name);                               
	        s_name_temp = item1.s_name                            
	        s_name_temp=s_name_temp.replace(/-/g,' ');
	        map_sip[s_name_temp] = item1.schemecode;
	        //debugger;
     	}
                          

       $("#fund_names_sip").autocomplete ( {
    		source: function (requestObj, responseFunc) {
                var matchArry   = schemename.slice (); //-- Copy the array
                var srchTerms   = $.trim (requestObj.term).split (/\s+/);

                //--- For each search term, remove non-matches.
                $.each (srchTerms, function (J, term) {
                    var regX    = new RegExp (term, "i");
                    matchArry   = $.map (matchArry, function (item) {
                        return regX.test (item)  ?  item  : null;
                    } );
                } );

                //--- Return the match results.
                responseFunc (matchArry);
            },
         	open: function (event, ui) {
                /*--- This function provides no hooks to the results list, so we have to trust the
                    selector, for now.
                */
                var resultsList = $("ul.ui-autocomplete > li.ui-menu-item > a");
                var srchTerm    = $.trim ( $("#fund_names_sip").val () ).split (/\s+/).join ('|');

                //--- Loop through the results list and highlight the terms.
                resultsList.each ( function () {
                    var jThis   = $(this);
                    var regX    = new RegExp ('(' + srchTerm + ')', "ig");
                    var oldTxt  = jThis.text ();

                    jThis.html (oldTxt.replace (regX, '<span class="srchHilite">$1</span>') );
                } );
            }
        });
                        //$("#scheme_code").html(scheme_code);
                        //$("#s_name").html(s_name);
                        // console.log(schemename);

        },
     	error:function(jqXHR, textStatus, errorThrown) {
           // alert("AJAX Error:" + textStatus);
     	}
 	})
}


function add_fundname_search()
{
	$.ajax({
		type:'GET',
		url: curr_ip+'home/get_search_data',
		datatype:'json',
		success:function(searchdata, textStatus, jqXHR) {
		 console.log(searchdata);
		 var schemename = [];

		 for(var i =0;i <= searchdata.search_data.length-1;i++)
		 {
			var item1 = searchdata.search_data[i];
			var scheme_code = item1.scheme_code;
			var s_name = item1.s_name;
			schemename.push(item1.s_name);

		 }
		 //    $("#srch-term").autocomplete({
			// 	source: schemename
			// });

		//$("#scheme_code").html(scheme_code);
		//$("#s_name").html(s_name);
           

           $("#srch-term").autocomplete ( {
              source: function (requestObj, responseFunc) {
                var matchArry   = schemename.slice (); //-- Copy the array
                var srchTerms   = $.trim (requestObj.term).split (/\s+/);

                //--- For each search term, remove non-matches.
                $.each (srchTerms, function (J, term) {
                    var regX    = new RegExp (term, "i");
                    matchArry   = $.map (matchArry, function (item) {
                        return regX.test (item)  ?  item  : null;
                    } );
                } );

                /* New jQuery-UI busts this AND the old highlighting!
                    //--- For any surviving matches, highlight the terms.
                    $.each (srchTerms, function (J, term) {
                        matchArry       = $.map (matchArry, function (item) {
                            var regX    = new RegExp (term, "ig");

                            return item.replace (regX, '<span class="srchHilite">' + term + '</span>');
                        } );
                    } );
                */

                //--- Return the match results.
                responseFunc (matchArry);
            },
         open: function (event, ui) {
                /*--- This function provides no hooks to the results list, so we have to trust the
                    selector, for now.
                */
                var resultsList = $("ul.ui-autocomplete > li.ui-menu-item > a");
                var srchTerm    = $.trim ( $("#srch-term").val () ).split (/\s+/).join ('|');

                //--- Loop through the results list and highlight the terms.
                resultsList.each ( function () {
                    var jThis   = $(this);
                    var regX    = new RegExp ('(' + srchTerm + ')', "ig");
                    var oldTxt  = jThis.text ();

                    jThis.html (oldTxt.replace (regX, '<span class="srchHilite">$1</span>') );
                } );
            }
        });
              


		console.log(schemename);
		},
		 error:function(jqXHR, textStatus, errorThrown) {
		   // alert("AJAX Error:" + textStatus);
		 }
 })
}
