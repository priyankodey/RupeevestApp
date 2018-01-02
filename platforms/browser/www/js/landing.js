


var univ_as_on_date;
var no_of_funds_year1;

$(document).ready(function(){
	$(document).on('click','#main-tabs li.nav-menu a',function(){
	if($(this).closest('li').hasClass('active')){
	$(this).closest('li').removeClass('active');
	}
	});
});


function display_info(schemecode,container_id,rol_ret,startDate,color_arr)
{
	$("#loading").show();
    $("#rv_Rolling_Return *").css('pointer-events','none');
    $('#rv_Rolling_Return').css("opacity", "0.5");
	$.ajax({
         type: 'GET',
         url: '/home/display_info',
          data :{schemecode:schemecode},
         dataType: 'json',
         success: function(data)
         {
         	// console.log("+++++++++++")
         	// console.log(data)
         	var aumtotal;
         	$("#comparison_fund").show();
          $("#comparison_Chart").show();
          $("#Return_Table").show();
          $("#Period").show();
         	for(var i=0;i<data.scheme_info.length;i++)
         	{
	if(data.scheme_info[i].aumtotal==null || data.scheme_info[i].aumtotal=='undefined')
	{
	aumtotal = "-";
	}
	else
	{
	aumtotal = (parseFloat(data.scheme_info[i].aumtotal)).toFixed(1);
	aumtotal = commaSeparateNumber(aumtotal);
	}
	$(".col_"+i).css("display", "inline");
	$("#s_name_"+i).html("<a target='_blank' class= 'compare' id='"+data.scheme_info[i].schemecode+"' href='/Mutual-Funds-India/"+data.scheme_info[i].schemecode+"''>"+data.scheme_info[i].s_name+"</a");
	$("#aumtotal_"+i).html(aumtotal);
	$('#scheme_code_'+i).val(data.scheme_info[i].schemecode);
	$('#classification_'+i).html(data.scheme_info[i].classification);
	var rupeevest_rating=data.scheme_info[i].rupeevest_rating
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

	}
	test_graph_rolling_return(array_id1,container_id,rol_ret,startDate,color_arr);
         }
     });
}
 function get_selected_item()
          {

             for (var i=5;i<32;i++)
             {
             	   $('#'+i).prop('checked',false);
             	   $('#screener_table tr > *:nth-child('+i+')').hide(); 
             }

             for(var i=0;i< column_limit.length ; i++)
             {
                  // alert(column_limit[i]);

                  $('#'+column_limit[i]).prop('checked',true);
                  
                 $('#screener_table tr > *:nth-child('+column_limit[i]+')').show(); 
             }
          }

//  function tick_checkbox()
//       {
//                  // alert(document.getElementById(fund_m_selection[0].replace(/(:| |-)/g, "")));
//              document.getElementById(fund_m_selection[0].replace(/(:| |-)/g, "")).checked = true;

//             }
//  function tick_checkbox_1()
//             {
//                 // alert(amc_selection[0].replace(/(:| |-)/g, ""));
//                 document.getElementById(amc_selection[0].replace(/(:| |-)/g, "")).checked = true;
//             }

// function tick_checkbox_2()
//             {
//                 // alert(document.getElementById(index_selection[0].replace(/(:| |-)/g, "")));
//                 document.getElementById(index_selection[0].replace(/(:| |-)/g, "")).checked = true;
//             }



function check_cookie_asset_value()
{
	 if(document.cookie!="")
      {
          var sep=document.cookie.split(';');
          for(var j=0;j<sep.length;j++)
          {

            var key=sep[j].split('=');
            // alert(key[0]);
            if (key[0]==" asset") 
            {


            var value=key[1].split(',');
	            if(value.length>0)
	            {
	                
	                  for(var i=0;i<value.length;i++)
	                  {
	                     if(asset_selection.indexOf(value[i])== -1)
	                     	{
	                     	asset_selection.push(value[i]);
	                     	}
	                  }
	            }
	     }
    	   }
	}

	//alert(asset_selection.length);

	return asset_selection.length;
        
}

function schemedata_landing()
{ 
	var f=1;
	if(refresh==1)
	{
	f=0;
	}
	
	$.ajax({
	type:'GET',
	url: curr_ip+'/functionalities/schemedata_landing',
	datatype:'json',
	data: {flag:f},
	success:function(data1, textStatus, jqXHR) {

            	if(data1.condition=="asset")
            	{
	                insert_asset_selection(data1.selected_asset_class[0].replace(/(')/g, ""));
	                print_asset_selection();
	                select_asset();
	                document.getElementById("ChkAmc").checked = true;
	                document.getElementById("fund_index").checked = true;
	                 document.getElementById("fmanager").checked = true;
	             }
	             else if(data1.condition=="fund_manager")
	             {
	             	fund_m_selection.push(data1.selected_asset_class[0].replace(/(')/g, ""))
	             	
	             	 print_manager_selection();
	             	 var id=data1.selected_asset_class[0].replace(/(:| |-|')/g, "").toString();
	         
	             	
	             	  document.getElementById("ChkAmc").checked = true;
	                document.getElementById("fund_index").checked = true;
	                document.getElementById("ChkAllCategories").checked = true;
	                asset_selected_flag2=1;
	                 print_asset_selection();
	   
	             }
	             else if(data1.condition=="index_name")
	             {
	             	index_selection.push(data1.selected_asset_class[0].replace(/(')/g, ""))
	             	
	             	 print_index_selection();
	             	 var id=data1.selected_asset_class[0].replace(/(:| |-|')/g, "").toString();
	             
	             	 document.getElementById("ChkAmc").checked = true;
	             	  document.getElementById("fmanager").checked = true;
	             	  document.getElementById("ChkAllCategories").checked = true;
	             	  asset_selected_flag2=1;
	             	   print_asset_selection();

	             	
	             }
	             else if(data1.condition=="fund_house")
	             {
	             	amc_selection.push(data1.selected_asset_class[0].replace(/(')/g, ""))
	             	
	             	 print_amc_selection();

                      document.getElementById("fund_index").checked = true;
	                 document.getElementById("fmanager").checked = true;
	                 document.getElementById("ChkAllCategories").checked = true;
	                 asset_selected_flag2=1;
	                  print_asset_selection();

	             }
	             else
	             {
	             	insert_asset_selection("Equity : Large Cap");
	                print_asset_selection();
	                select_asset();
	                document.getElementById("ChkAmc").checked = true;
	                document.getElementById("fund_index").checked = true;
	                 document.getElementById("fmanager").checked = true;
	             }

	             if (data1.schemedata.length==0)
                {
                    var data1="";
                   fill_snapshot_table(data1);
                    

                }
                else
                {	
                	fill_snapshot_table(data1);

                }

                get_landing_returns();

	},
	error:function(jqXHR, textStatus, errorThrown) {

	}

	});

}


// function fill_snapshot_table(data1)
// {
// 	$("#snapshottable_div").hide();
// 	$("#snapshotTabletblData").html("");
// 	var tblData;
// 	var th = "<thead><tr class='bg-color'><th style='width:50px'></th><th>Fund</th><th data-name='rup_rating'>Rupeevest </br>Rating</th><th data-name='aum'>AUM </br>(in crores)</th><th>Return</br>(1 year)</th><th>Return</br>(3 year)</th><th>Return</br> (5 year)</th><th>ExpenseRatio</th><th>Highest Sector Allocation</th></tr></thead>";
// 	//var t = document.getElementById("snapshotTabletblData").innerHTML;
// 	if(data1!="")
// 	{
// 	for(var i =0;i <= data1.schemedata.length-1;i++)
// 	{
// 	var scheme_data = data1.schemedata[i];
// 	var scheme_code = scheme_data.schemecode;
// 	var scheme_name = scheme_data.s_name;
// 	var fund_manager = scheme_data.fund_manager;
// 	var scheme_year1 = scheme_data.returns_1year;
// 	var scheme_year3 = scheme_data.returns_3year;
// 	var scheme_year5 = scheme_data.returns_5year;
// 	var scheme_aum_total = scheme_data.aumtotal;
// 	var exratio = scheme_data.expenceratio;
// 	var rr = scheme_data.rupeevest_rating;
// 	var returns_1month = scheme_data.returns_1month;
// 	var returns_3month = scheme_data.returns_3month;
// 	var turnover_ratio = scheme_data.turnover_ratio;
// 	var exitload = scheme_data.exitload;
// 	var navrs = scheme_data.navrs;
// 	var inception_date = scheme_data.inception_date;
// 	var minimum_investment = scheme_data.minimum_investment;
// 	var betax_returns = scheme_data.betax_returns;
// 	var alphax_returns = scheme_data.alphax_returns;
// 	var sotinox_returns = scheme_data.sotinox_returns;
// 	var sharpex_returns = scheme_data.sharpex_returns;


// 	var sdx_returns = scheme_data.sdx_returns;
// 	var portfolio_attributes = scheme_data.portfolio_attributes;
// 	var cost_factor = scheme_data.cost_factor;
// 	var risk = scheme_data.risk;
// 	var consistency_of_return = scheme_data.consistency_of_return;

// 	var total_return = scheme_data.total_return;
// 	var high_sec_alloc;
// 	if(scheme_data.highest_sector)
// 	{
// 	high_sec_alloc = scheme_data.highest_sector;
// 	}
// 	else
// 	{
// 	high_sec_alloc = "NA";
// 	}


// 	var rr;
// 	if (scheme_data.rupeevest_rating)
// 	{
// 	rr = scheme_data.rupeevest_rating;
// 	}
// 	else
// 	{
// 	rr = "-";
// 	}

// 	if(i == 0)
// 	{
// 	  tblData = t + "<tr><td><inputid="+scheme_code+"type='checkbox'name='chkCompare'/></td><td><aid="+scheme_code+"href='#'onclick='setvalue(this.id)'>"+scheme_name+"</a></td><td>"+rr+"</td><td data-name= 'aum' style='display:block;'>"+scheme_aum_total+"</td><td data-name= 'retyr1' style='display:block;'>"+scheme_year1+"</td><tddata-name= 'retyr3' style='display:block;'>"+scheme_year3+"</td><td data-name= 'retyr5' style='display:block;'>"+scheme_year5+"</td><td data-name= 'exratio' style='display:block;'>"+exratio+"</td><td data-name= 'retmth1' style='display:block;'>"+returns_1month+"</td><td data-name= 'retmth3' style='display:block;'>"+returns_3month+"</td><td data-name= 'tnratio' style='display:block;'>"+turnover_ratio+"</td><td data-name= 'exload' style='display:block;'>"+exitload+"</td><td data-name= 'navrs' style='display:block;'>"+navrs+"</td><td data-name= 'indate' style='display:block;'>"+inception_date+"</td><td data-name= 'mininv' style='display:block;'>"+minimum_investment+"</td><td data-name= 'betax' style='display:block;'>"+betax_returns+"</td><td data-name= 'alphax' style='display:block;'>"+alphax_returns+"</td><td data-name= 'sotionox' style='display:block;'>"+sotinox_returns+"</td><td data-name= 'sharpex' style='display:block;'>"+sharpex_returns+"</td><td data-name= 'sdx' style='display:block;'>"+sdx_returns+"</td><td data-name= 'portattr' style='display:block;'>"+portfolio_attributes+"</td><td data-name= 'costfctr' style='display:block;'>"+cost_factor+"</td><td data-name= 'risk' style='display:block;'>"+risk+"</td><td data-name= 'ctrn' style='display:block;'>"+consistency_of_return+"</td><td data-name= 'trtn' style='display:block;'>"+total_return+"</td></tr>";
// 	  tblData = th + "<tr><td style='width:50px'><input id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='#' onclick='setvalue(this.id)'>"+scheme_name+"</a><br><a href='#' >"+fund_manager+"</a></td><td data-name = 'rup_rating'>"+rr+"</td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+high_sec_alloc+"</td></tr>";
// 	}

// 	else
// 	{
// 	   /*tblData = tblData + "<tr><td><inputid="+scheme_code+"type='checkbox'name='chkCompare'/></td><td><a id="+scheme_code+"href='#'onclick='setvalue(this.id)'>"+scheme_name+"</a></td><td>"+rr+"</td><td data-name= 'aum' style='display:block;'>"+scheme_aum_total+"</td><td data-name= 'retyr1' style='display:block;'>"+scheme_year1+"</td><td data-name= 'retyr3' style='display:block;'>"+scheme_year3+"</td><td data-name= 'retyr5' style='display:block;'>"+scheme_year5+"</td><td data-name= 'exratio' style='display:block;'>"+exratio+"</td><td data-name= 'retmth1' style='display:block;'>"+returns_1month+"</td><td data-name= 'retmth3' style='display:block;'>"+returns_3month+"</td><td data-name= 'tnratio' style='display:block;'>"+turnover_ratio+"</td><td data-name= 'exload' style='display:block;'>"+exitload+"</td><td data-name= 'navrs' style='display:block;'>"+navrs+"</td><td data-name= 'indate' style='display:block;'>"+inception_date+"</td><td data-name= 'mininv' style='display:block;'>"+minimum_investment+"</td><td data-name= 'betax' style='display:block;'>"+betax_returns+"</td><td data-name= 'alphax' style='display:block;'>"+alphax_returns+"</td><td data-name= 'sotionox' style='display:block;'>"+sotinox_returns+"</td><td data-name= 'sharpex' style='display:block;'>"+sharpex_returns+"</td><td data-name= 'sdx' style='display:block;'>"+sdx_returns+"</td><td data-name= 'portattr' style='display:block;'>"+portfolio_attributes+"</td><td data-name= 'costfctr' style='display:block;'>"+cost_factor+"</td><td data-name= 'risk' style='display:block;'>"+risk+"</td><td data-name= 'ctrn' style='display:block;'>"+consistency_of_return+"</td><td data-name= 'trtn' style='display:block;'>"+total_return+"</td></tr>";*/


// 	tblData = tblData + "<tr><td><input id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='#' onclick='setvalue(this.id)'>"+scheme_name+"</a><br><a href='#' >"+fund_manager+"</a></td><td data-name = 'rup_rating'>"+rr+"</td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+high_sec_alloc+"</td></tr>";
// 	}
// 	}
	
// 	$("#snapshotTabletblData").html(tblData);
// 	}
// 	else
// 	{
// 	$("#snapshottable_div").show();
// 	}
	
// }




// function fill_snapshot_table(data1)
// {
// 	$("#snapshottable_div").hide();
// 	// $("#snapshotTabletblData").html("");
// 	$("#screener_table_div").html("");
// 	$("#screener_table").html("");
    

//     // $('.cbx').attr('checked',false);
     
//     //  $('.cbx').attr('checked',false);

//     //  $('#4').prop('checked',true);
//     //  $('#5').prop('checked',true);
//     //  $('#6').prop('checked',true);
//     //  $('#7').prop('checked',true);
//     //  $('#8').prop('checked',true);
//     //  $('#9').prop('checked',true);
     


// 	// var tblData;
// 	// var tbl = " <table id='screener_table' name='aum' class='table table-bordered table-striped sortable-theme-bootstrap' data-sortable>"
// 	// if (data1.ptp_returns!=null)
// 	// {
// 	// 	var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Fund</span></th><th data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric' data-name='aum'>AUM <br>(in crores)</th><th data-sortable-type='numeric'>Return<br>(1 year)</th data-sortable-type='numeric'><th>Return<br>(3 year)</th><th data-sortable-type='numeric'>Return<br> (5 year)</th><th data-sortable-type='numeric'>ExpenseRatio</th><th>Highest Sector Allocation</th><th data-sortable-type='numeric' id='rm_1' style='display: none;'>Return(1m)</th><th data-sortable-type='numeric' id='rm_3' style='display: none;'>Return(3m)</th><th data-sortable-type='numeric' id='rm_6' style='display: none;'>Return(6m)</th><th data-sortable-type='numeric' id='ry_2' style='display: none;' >Return(2Yr)</th><th style='display: none;' >BenchMark</th><th id='nav' style='display: none;'>Nav</th><th style='display: none;' >Turnover Ratio</th><th style='display: none;'>Exit Load</th><th data-sortable-type='date' style='display: none;'>Launch Date</th><th style='display: none;'>Minimum Investment</th><th style='display: none;'>Average Maturity</th><th style='display: none;'>Modified Duration</th><th style='display: none;'>YTM</th><th style='display: none;'>Benchmark Index</th><th style='display: none;'>Beta</th><th style='display: none;'>Sharpe</th><th style='display: none;'>Sortino</th><th style='display: none;'>Standard Deviation</th><th style='display: none;'>Alpha</th><th style='display: none;'>YTD</th><th style='display: none;'>Fund House</th><th style='display: none;'>Fund Type</th><th>Point to Point Return</th></tr></thead>";
// 	// }
// 	// else
// 	// {
// 	// 	var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Fund</span></th><th data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric' data-name='aum'>AUM <br>(in crores)</th><th data-sortable-type='numeric'>Return<br>(1 year)</th data-sortable-type='numeric'><th>Return<br>(3 year)</th><th data-sortable-type='numeric'>Return<br> (5 year)</th><th data-sortable-type='numeric'>ExpenseRatio</th><th>Highest Sector Allocation</th><th data-sortable-type='numeric' id='rm_1' style='display: none;'>Return(1m)</th><th data-sortable-type='numeric' id='rm_3' style='display: none;'>Return(3m)</th><th data-sortable-type='numeric' id='rm_6' style='display: none;'>Return(6m)</th><th data-sortable-type='numeric' id='ry_2' style='display: none;' >Return(2Yr)</th><th style='display: none;' >BenchMark</th><th id='nav' style='display: none;'>Nav</th><th style='display: none;' >Turnover Ratio</th><th style='display: none;'>Exit Load</th><th data-sortable-type='date' style='display: none;'>Launch Date</th><th style='display: none;'>Minimum Investment</th><th style='display: none;'>Average Maturity</th><th style='display: none;'>Modified Duration</th><th style='display: none;'>YTM</th><th style='display: none;'>Benchmark Index</th><th style='display: none;'>Beta</th><th style='display: none;'>Sharpe</th><th style='display: none;'>Sortino</th><th style='display: none;'>Standard Deviation</th><th style='display: none;'>Alpha</th><th style='display: none;'>YTD</th><th style='display: none;'>Fund House</th><th style='display: none;'>Fund Type</th></tr></thead>";
// 	// }
// 	// alert("ss");
// 	var tblData="";
// 	var tbl = " <table id='screener_table' name='aum' class='table table-bordered table-striped table-condensed sortable-theme-bootstrap' data-sortable>"
// 	if (data1.ptp_returns!=null)
// 	{
// 	for (var c=0;c<=column_limit.length;c++)
// 	{
// 	   // "<th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' >Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'>Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th style='display:none;'>Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield To Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'  >Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'> Nav </th> <th>Fund Type</th><th data-sortable-type='numeric'>Point to Point Return</th><th style='display:none'>classification</th>";
// 	}
// 	// alert("ss");
// 	// var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest Rating</th><th data-sortable-type='numeric' data-name='aum'>AUM (in ₹ cr)</th><th data-sortable-type='numeric'>Return - 1 yr (%)</th data-sortable-type='numeric'><th>Return - 3 yrs (%)</th><th data-sortable-type='numeric'>Return - 5 yrs (%)</th><th data-sortable-type='numeric'>Expense Ratio (%)</th><th>Highest Sector Allocation</th><th data-sortable-type='numeric' id='rm_1' style='display: none;'>Return - 1mo (%)</th><th data-sortable-type='numeric' id='rm_3' style='display: none;'>Return - 3 mo (%)</th><th data-sortable-type='numeric' id='rm_6' style='display: none;'>Return - 6 mo (%)</th><th data-sortable-type='numeric' id='ry_2' style='display: none;' >Return - 2 yrs (%)</th><th style='display: none;' >BenchMark</th><th id='nav' style='display: none;'>Nav</th><th style='display: none;' >Turnover Ratio (%)</th><th style='display: none;'>Exit Load</th><th data-sortable-type='date' style='display: none;'>Launch Date</th><th style='display: none;'>Min. Investment (in ₹)</th><th style='display: none;'>Avg. Maturity (in yrs)</th><th style='display: none;'>Mod. Duration (in yrs)</th><th style='display: none;'>Yield to Maturity (%)</th><th style='display: none;'>Benchmark Index</th><th style='display: none;'>Beta</th><th style='display: none;'>Sharpe</th><th style='display: none;'>Sortino</th><th style='display: none;'>Standard Deviation</th><th style='display: none;'>Alpha</th><th style='display: none;'>YTD (%)</th><th style='display: none;'>Fund House</th><th style='display: none;'>Fund Type</th><th>Point to Point Return</th></tr></thead>";
// 	    var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span>Funds</span></th><th>Category</th><th data-sortable-type='numeric' data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' >Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'>Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th style='display:none;'>Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield To Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'  >Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th data-sortable-type='alpha' style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'> Nav </th> <th>Fund Type</th><th style='display:none;'><center> No. of<br>Stocks</center></th><th data-sortable-type='numeric'>Point to Point Return</th><th style='display:none'>classification</th></tr></thead>";
//       //var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' > Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'> Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'> Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'> Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th >Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield to Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'>Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'>Nav</th> <th>Fund Type</th><th data-sortable-type='numeric'>Point to Point Return</th><th style='display:none'>classification</th></tr></thead>";

// 	}
// 	else
// 	{
// 	// alert("ss");
// 	// var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest Rating</th><th data-sortable-type='numeric' data-name='aum'>AUM (in ₹ cr)</th><th data-sortable-type='numeric'>Return - 1 yr (%)</th data-sortable-type='numeric'><th>Return - 3 yrs (%)</th><th data-sortable-type='numeric'>Return - 5 yrs (%)</th><th data-sortable-type='numeric'>Expense Ratio (%)</th><th>Highest Sector Allocation</th><th data-sortable-type='numeric' id='rm_1' style='display: none;'>Return - 1mo (%)</th><th data-sortable-type='numeric' id='rm_3' style='display: none;'>Return - 3 mo (%)</th><th data-sortable-type='numeric' id='rm_6' style='display: none;'>Return - 6 mo (%)</th><th data-sortable-type='numeric' id='ry_2' style='display: none;' >Return - 2 yrs (%)</th><th style='display: none;' >BenchMark</th><th id='nav' style='display: none;'>Nav</th><th style='display: none;' >Turnover Ratio (%)</th><th style='display: none;'>Exit Load</th><th data-sortable-type='date' style='display: none;'>Launch Date</th><th style='display: none;'>Min. Investment (in ₹)</th><th style='display: none;'>Avg. Maturity (in yrs)</th><th style='display: none;'>Mod. Duration (in yrs)</th><th style='display: none;'>Yield to Maturity (%)</th><th style='display: none;'>Benchmark Index</th><th style='display: none;'>Beta</th><th style='display: none;'>Sharpe</th><th style='display: none;'>Sortino</th><th style='display: none;'>Standard Deviation</th><th style='display: none;'>Alpha</th><th style='display: none;'>YTD (%)</th><th style='display: none;'>Fund House</th><th style='display: none;'>Fund Type</th></tr></thead>";
// 	// var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest Rating</th><th data-sortable-type='numeric'>AUM</th><th> Expense Ratio (%)</th><th style='display:none;'> Exit Load (%)</th><th> Fund Type</th><th style='display:none;'> Launch Date </th><th style='display:none;'>  Min. Investment (in ₹) </th><th style='display:none;'>  Benchmark Index </th><th style='display:none;'>  Fund House </th> <th style='display:none;'> Nav </th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'> Return (1 mo) </th><th style='display:none;' data-sortable-type='numeric'> Return (3 mo) </th><th style='display:none;' data-sortable-type='numeric'>  Return (6 mo) </th><th data-sortable-type='numeric'> Return (1 yr) </th><th style='display:none;' data-sortable-type='numeric'> Return (2 yrs) </th><th data-sortable-type='numeric'> Return (3 yrs) </th><th data-sortable-type='numeric'> Return (5 yrs) </th><th style='display:none;' data-sortable-type='numeric'>  Turnover Ratio (%) </th><th > Highest Sector</th><th style='display:none;' data-sortable-type='numeric'> Average Maturity (in years) </th><th style='display:none;' data-sortable-type='numeric'> Modified Duration (in years) </th><th style='display:none;' data-sortable-type='numeric'> Yield To Maturity (%) </th><th style='display:none;' data-sortable-type='numeric'> Beta </th><th style='display:none;' data-sortable-type='numeric'> Sharpe </th><th style='display:none;' data-sortable-type='numeric'> Sortino </th><th style='display:none;' data-sortable-type='numeric'> Standard Deviation </th><th style='display:none;' data-sortable-type='numeric'> Alpha </th></tr></thead>";
// 	var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span>Funds</span></th><th>Category</th><th data-sortable-type='numeric' data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' >Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'>Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th style='display:none;'>Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield To Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'>Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th data-sortable-type='alpha' style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'> Nav </th> <th>Fund Type</th><th style='display:none;'> <center>No. of<br>Stocks</center></th><th style='display:none'>classification</th></tr></thead>";
// 	  //var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' > Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'> Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'> Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'> Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th >Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield to Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'>Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'>Nav</th> <th>Fund Type</th><th style='display:none'>classification</th></tr></thead>";
// 	}


// 	if(data1!="")
// 	{
// 	$("#snapshottable_div").addClass("d_none");
// 	for(var i =0;i <= data1.schemedata.length-1;i++)
// 	{
// 	var scheme_data = data1.schemedata[i];

// 	var classification = scheme_data.classification;    // newly taken for classificaton {to use in hover function }

// 	var scheme_code = scheme_data.schemecode;
// 	var scheme_name = scheme_data.s_name;
	
// 	var fund_manager = scheme_data.fund_manager;
// 	var category = scheme_data.remarks1;

// 	var scheme_year1;
//             if( scheme_data.returns_1year==null || scheme_data.returns_1year=='undefined')
//               {
//                 scheme_year1="-";
//               }
//               else
//               {
//               	scheme_year1=scheme_data.returns_1year;
//               }

//         var scheme_year2;
//             if(scheme_data.returns_2year==null || scheme_data.returns_2year=='undefined')
//               {
//                    scheme_year2="-"; 	
//               }
//               else
//               {
//               	 scheme_year2=scheme_data.returns_2year;   
//               }      

// 	var scheme_year3;

//             if( scheme_data.returns_3year==null || scheme_data.returns_3year=='undefined')
//               {
//                scheme_year3="-";    	
//               }
//               else
//               {
//               	scheme_year3=scheme_data.returns_3year;   
//               }

//         var scheme_year5;
//             if( scheme_data.returns_5year==null  || scheme_data.returns_5year=='undefined')
//               {
//                  scheme_year5="-";   	
//               }
//             else
//               {
//   	scheme_year5=scheme_data.returns_5year; 
//               }        
	
// 	var scheme_aum_total;

// 	if(scheme_data.aumtotal==null || scheme_data.aumtotal=='undefined')
// 	{
//            scheme_aum_total = "-";
// 	}
// 	else
// 	{
// 	scheme_aum_total = commaSeparateNumber((parseFloat(scheme_data.aumtotal)).toFixed(2));
// 	}
	
//         var exratio ;

//         if(scheme_data.expenceratio==null || scheme_data.expenceratio=='undefined')
//         {
//         	exratio = "-";
        	
//         }
//         else
//         {
//         	exratio = scheme_data.expenceratio;
//         }
	
// 	var rr = scheme_data.rupeevest_rating;   


//         var returns_1month;
//              if( scheme_data.returns_1month==null || scheme_data.returns_1month=='undefined')
//              {
//                 returns_1month = "-";
//              }
//              else
//              {
//              	returns_1month = scheme_data.returns_1month;
//              }

//         var returns_3month;
//              if( scheme_data.returns_3month==null || scheme_data.returns_3month=='undefined')
//              {
//                 returns_3month = "-";
//              }
//              else
//              {
//              	returns_3month = scheme_data.returns_3month;
//              }

//         var returns_6month;
//              if(scheme_data.returns_6month==null || scheme_data.returns_6month=='undefined')
//              {
//                 returns_6month = "-";
//              }
//              else
//              {
//                returns_6month = scheme_data.returns_6month;
//              }                 

//          var avg_maturity="-";
//               if((scheme_data.avg_maturity!=0) && ( scheme_data.avg_maturity!=null))
//               {
//                   avg_maturity = scheme_data.avg_maturity;

//                   // console.log("Average MAt->"+scheme_data.avg_maturity)
//               }

// 	 var modified_duration="-";
// 	    if((scheme_data.mod_duration!=0) && (scheme_data.mod_duration!=null) )
// 	    {
// 	    	 modified_duration=scheme_data.mod_duration;

// 	    	 // console.log("Modified Duration->"+scheme_data.mod_duration)
// 	    }

// 	 var ytm ="-"
// 	  if((scheme_data.ytm!=0) && (scheme_data.ytm!=null))
// 	  {
//                  ytm=scheme_data.ytm;
                 
//                  // console.log("Ytm->"+scheme_data.ytm)
// 	  }
        
//         var Fund_House=scheme_data.fund_house; 
//         var ytd_returns=scheme_data.ytd_returns;
  
//         var turnover_ratio;

//         if(scheme_data.turnover_ratio==null || scheme_data.turnover_ratio=='undefined')
//         {
//         	turnover_ratio = "-";
//         }
//         else
//         {
//         	turnover_ratio = scheme_data.turnover_ratio;
//         }

// 	var exitload;

// 	if(scheme_data.exitload==null || scheme_data.exitload=='undefined')
// 	{
// 	exitload="-";
// 	} 
// 	else
// 	{
//           exitload = scheme_data.exitload;
// 	}

	
// 	var navrs = scheme_data.navrs;
        

//         // var inception_date = scheme_data.inception_date;

//         var inception_date = "-";
//         if(scheme_data.inception_date!=null)
//         {
//         	// console.log("TIME0000000000------------------------------------------------")
//             // var date = new Date(scheme_data.inception_date);	
//             // console.log(moment(scheme_data.inception_date).format('DD-MMM-YY'));
//             inception_date= moment(scheme_data.inception_date).format('DD-MMM-YY');

//               // console.log("date date date date")
//              // console.log(date.format('MMM D, YYYY') );
             
//              // inception_date = date;

//              // inception_date = DateFormat.format(date, "dd-MMM-yy")

//             // inception_date =  date.getDate() + '/' + (date.getMonth() + 1)+ '/' +  date.getFullYear();
//         }
	   
// 	var minimum_investment;
        
//         if(scheme_data.minimum_investment==null || scheme_data.minimum_investment=='undefined')
//         {
//         	minimum_investment = "-";
//         }
//         else
//         {
//             minimum_investment = commaSeparateNumber(scheme_data.minimum_investment);
//         }

// 	var betax_returns;

// 	if(scheme_data.betax_returns==null || scheme_data.betax_returns=='undefined' || scheme_data.betax_returns==0)
// 	{
//            betax_returns = "-";
// 	}
// 	else
// 	{
//            betax_returns = scheme_data.betax_returns;
// 	}

// 	var alphax_returns;
// 	 if(scheme_data.alphax_returns==null || scheme_data.alphax_returns=='undefined' || scheme_data.alphax_returns==0)
// 	 {
// 	 	alphax_returns ="-";
// 	 }
// 	 else
// 	 {
//               alphax_returns = scheme_data.alphax_returns;
// 	 }

// 	 var sotinox_returns;

// 	 if(scheme_data.sotinox_returns ==null || scheme_data.sotinox_returns=='undefined' || scheme_data.sotinox_returns == 0)
// 	 {
// 	 	sotinox_returns ="-";
// 	 }
// 	 else
// 	 {
// 	    sotinox_returns = scheme_data.sotinox_returns;	
// 	 }
	 
//  	var sharpex_returns;

//  	if(scheme_data.sharpex_returns ==null || scheme_data.sharpex_returns=='undefined' || scheme_data.sharpex_returns==0)
//  	{
//  	sharpex_returns = "-";
//  	}
//  	else
//  	{
//  	sharpex_returns = scheme_data.sharpex_returns;
//  	}

	

//         var Fund_Type=scheme_data.type_code;

//            if(Fund_Type=="1")
//            {
//              Fund_Type="Open Ended";      
//            }  
//            else if(Fund_Type=="2")
//            {
//              Fund_Type="Closed Ended";      
//            }
//            else
//            {
//              Fund_Type="Interval"; 
//            } 

//         var Fund_Benchmark_Index=scheme_data.index_name;

// 	var sdx_returns;

// 	   if( scheme_data.assdx_returns==null || scheme_data.assdx_returns =='undefined' || scheme_data.assdx_returns==0 )
//               {
//                 sdx_returns ="-";	  
//               }
//               else
//               {
//               	sdx_returns = scheme_data.assdx_returns;
//               }
	

// 	var portfolio_attributes = scheme_data.portfolio_attributes;
// 	var cost_factor = scheme_data.cost_factor;
// 	var risk = scheme_data.risk;
// 	var consistency_of_return = scheme_data.consistency_of_return;

// 	var total_return = scheme_data.total_return;
// 	var high_sec_alloc;

                

//                 var now = moment(new Date()); //todays date
// 	var end = moment(scheme_data.inception_date); // another date
// 	var duration = moment.duration(now.diff(end));
// 	var days = duration.asDays();

// 	       if( days < 365 )
// 	       {
// 	       	sdx_returns = "-";
// 	betax_returns = "-";
// 	sharpex_returns = "-";
// 	alphax_returns = "-";
// 	sotinox_returns = "-";
                   
// 	       }

// 	// <td>"+returns_1month+"</td><td>"+returns_3month+"</td><td>"+returns_6month+"</td><td>"+scheme_year2+"</td><td>"+scheme_year10+"</td><td>"+navrs+"</td>

// 	if(scheme_data.highest_sector)
// 	{
// 	high_sec_alloc = scheme_data.highest_sector;
// 	}
// 	else
// 	{
// 	high_sec_alloc = "NA";
// 	}


// 	var rr , rr_ico;
// 	if (scheme_data.rupeevest_rating)
// 	{
// 	rr = scheme_data.rupeevest_rating;
// 	if(rr == 5){
// 	rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"
// 	}
// 	else if (rr == 4){
// 	rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"
// 	}
// 	else if (rr == 3){
// 	rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"	
// 	}
// 	else if (rr == 2){
// 	rr_ico = "<span class = 'glyphicon glyphicon-star'></span><span class = 'glyphicon glyphicon-star'></span>"	
// 	}
// 	else if (rr == 1){
// 	rr_ico = "<span class = 'glyphicon glyphicon-star'></span>"
// 	}
// 	else if (rr == "Unrated"){
// 	rr_ico = "Unrated"
// 	}
// 	}
// 	else
// 	{
// 	rr = "-";
// 	}


//      var no_of_securities="-";
       
      
//        	 no_of_securities=scheme_data.no_of_stocks;
       
//          if (no_of_securities==null)
//          {
//          	 no_of_securities="-";
//          }

// 	if(i == 0)
// 	{
// 	if (data1.ptp_returns!=null)
// 	{
// 	var returns = data1.ptp_returns[i].ptp_return;
	
// 	var days=data1.no_days.split('/');
// 	if (days[0]>365 && returns!="-")
// 	{
// 	var power=(365/days[0]);
	
// 	var returns=((Math.pow((1+(returns/100)), power)-1)*100).toFixed(2);
// 	}
// 	// tblData = th + "<tbody><tr><td><input id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='#' onclick='setvalue(this.id)'>"+scheme_name+"</a><br>"+fund_manager+"</td><td>"+category+"</td><td data-name = 'rup_rating'>"+rr+"</td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+high_sec_alloc+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td style='display: none;'>"+scheme_year2+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+navrs+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+Fund_Type+"</td><td>"+returns+"</td></tr>";
                   
//                    tblData = th + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td> <td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+navrs+"</td><td >"+Fund_Type+"</td><td style='display: none;'>"+no_of_securities+"</td><td>"+returns+"</td><td class='fund_category' style='display:none'>"+classification+"</td></tr>";
                 
                
// 	}
// 	else 
// 	{
// 	 tblData = th + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td> <td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+navrs+"</td><td >"+Fund_Type+"</td><td style='display: none;'>"+no_of_securities+"</td><td class='fund_category' style='display:none'>"+classification+"</td></tr>";
// 	} 
// 	 }         
// 	else
// 	{
// 	   /*tblData = tblData + "<tr><td><inputid="+scheme_code+"type='checkbox'name='chkCompare'/></td><td><a id="+scheme_code+"href='#'onclick='setvalue(this.id)'>"+scheme_name+"</a></td><td>"+rr+"</td><td data-name= 'aum' style='display:block;'>"+scheme_aum_total+"</td><td data-name= 'retyr1' style='display:block;'>"+scheme_year1+"</td><td data-name= 'retyr3' style='display:block;'>"+scheme_year3+"</td><td data-name= 'retyr5' style='display:block;'>"+scheme_year5+"</td><td data-name= 'exratio' style='display:block;'>"+exratio+"</td><td data-name= 'retmth1' style='display:block;'>"+returns_1month+"</td><td data-name= 'retmth3' style='display:block;'>"+returns_3month+"</td><td data-name= 'tnratio' style='display:block;'>"+turnover_ratio+"</td><td data-name= 'exload' style='display:block;'>"+exitload+"</td><td data-name= 'navrs' style='display:block;'>"+navrs+"</td><td data-name= 'indate' style='display:block;'>"+inception_date+"</td><td data-name= 'mininv' style='display:block;'>"+minimum_investment+"</td><td data-name= 'betax' style='display:block;'>"+betax_returns+"</td><td data-name= 'alphax' style='display:block;'>"+alphax_returns+"</td><td data-name= 'sotionox' style='display:block;'>"+sotinox_returns+"</td><td data-name= 'sharpex' style='display:block;'>"+sharpex_returns+"</td><td data-name= 'sdx' style='display:block;'>"+sdx_returns+"</td><td data-name= 'portattr' style='display:block;'>"+portfolio_attributes+"</td><td data-name= 'costfctr' style='display:block;'>"+cost_factor+"</td><td data-name= 'risk' style='display:block;'>"+risk+"</td><td data-name= 'ctrn' style='display:block;'>"+consistency_of_return+"</td><td data-name= 'trtn' style='display:block;'>"+total_return+"</td></tr>";*/

// 	   if (data1.ptp_returns!=null)
// 	{
// 	var returns = data1.ptp_returns[i].ptp_return;
	
// 	var days=data1.no_days.split('/');
// 	if (days[0]>365 && returns!="-")
// 	{
// 	var power=(365/days[0]);
	
// 	var returns=((Math.pow((1+(returns/100)), power)-1)*100).toFixed(2);
// 	}
// 	// tblData = tblData + "<tr><td><input id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='#' onclick='setvalue(this.id)'>"+scheme_name+"</a><br>"+fund_manager+"</td><td>"+category+"</td><td data-name = 'rup_rating'>"+rr+"</td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+high_sec_alloc+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td style='display: none;'>"+scheme_year2+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+navrs+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+Fund_Type+"</td><td>"+returns+"</td></tr>";
// 	tblData = tblData + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td> <td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+navrs+"</td><td >"+Fund_Type+"</td><td style='display: none;'>"+no_of_securities+"</td><td>"+returns+"</td><td class='fund_category' style='display:none'>"+classification+"</td></tr>";
// 	}
// 	else 
// 	{
// 	tblData = tblData + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td> <td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+navrs+"</td><td >"+Fund_Type+"</td><td style='display: none;'>"+no_of_securities+"</td><td class='fund_category' style='display:none'>"+classification+"</td></tr>";
// 	}
// 	}

// 	}
// 	// $("#snapshotTabletblData").html("");
// 	// $("#snapshotTabletblData").html(tblData);
// 	tblData = tblData +"</tbody></table>";
// 	$("#screener_table_div").html(tblData);
// 	 $("#total_res").html(data1.schemedata.length +" out of "+data1.total_count[0].count);
// 	 tbldata="";
// 	Sortable.init();

//     $( ".FundCategory").hover(function(){

//         $("[data-toggle=popover]").popover();
//         var res = (this.parentElement.parentElement.childNodes[this.parentElement.parentElement.childElementCount].innerHTML);         
//         $(this).attr('data-content', res);
    
//     });

//     $( ".CompCheckBox").hover(function(){

//         $("[data-toggle=popover]").popover();
        
//         $(this).attr('data-content', 'Select to compare');
    
//     });

// 	get_selected_item();
// 	}
// 	else
// 	{
// 	$("#snapshottable_div").removeClass("d_none");
// 	$("#snapshottable_div").show();
// 	}
	
// }


function fill_snapshot_table(data1)
{
	$("#snapshottable_div").hide();
	// $("#snapshotTabletblData").html("");
	$("#screener_table_div").html("");
	$("#screener_table").html("");
    

    // $('.cbx').attr('checked',false);
     
    //  $('.cbx').attr('checked',false);

    //  $('#4').prop('checked',true);
    //  $('#5').prop('checked',true);
    //  $('#6').prop('checked',true);
    //  $('#7').prop('checked',true);
    //  $('#8').prop('checked',true);
    //  $('#9').prop('checked',true);
     


	// var tblData;
	// var tbl = " <table id='screener_table' name='aum' class='table table-bordered table-striped sortable-theme-bootstrap' data-sortable>"
	// if (data1.ptp_returns!=null)
	// {
	// 	var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Fund</span></th><th data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric' data-name='aum'>AUM <br>(in crores)</th><th data-sortable-type='numeric'>Return<br>(1 year)</th data-sortable-type='numeric'><th>Return<br>(3 year)</th><th data-sortable-type='numeric'>Return<br> (5 year)</th><th data-sortable-type='numeric'>ExpenseRatio</th><th>Highest Sector Allocation</th><th data-sortable-type='numeric' id='rm_1' style='display: none;'>Return(1m)</th><th data-sortable-type='numeric' id='rm_3' style='display: none;'>Return(3m)</th><th data-sortable-type='numeric' id='rm_6' style='display: none;'>Return(6m)</th><th data-sortable-type='numeric' id='ry_2' style='display: none;' >Return(2Yr)</th><th style='display: none;' >BenchMark</th><th id='nav' style='display: none;'>Nav</th><th style='display: none;' >Turnover Ratio</th><th style='display: none;'>Exit Load</th><th data-sortable-type='date' style='display: none;'>Launch Date</th><th style='display: none;'>Minimum Investment</th><th style='display: none;'>Average Maturity</th><th style='display: none;'>Modified Duration</th><th style='display: none;'>YTM</th><th style='display: none;'>Benchmark Index</th><th style='display: none;'>Beta</th><th style='display: none;'>Sharpe</th><th style='display: none;'>Sortino</th><th style='display: none;'>Standard Deviation</th><th style='display: none;'>Alpha</th><th style='display: none;'>YTD</th><th style='display: none;'>Fund House</th><th style='display: none;'>Fund Type</th><th>Point to Point Return</th></tr></thead>";
	// }
	// else
	// {
	// 	var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Fund</span></th><th data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric' data-name='aum'>AUM <br>(in crores)</th><th data-sortable-type='numeric'>Return<br>(1 year)</th data-sortable-type='numeric'><th>Return<br>(3 year)</th><th data-sortable-type='numeric'>Return<br> (5 year)</th><th data-sortable-type='numeric'>ExpenseRatio</th><th>Highest Sector Allocation</th><th data-sortable-type='numeric' id='rm_1' style='display: none;'>Return(1m)</th><th data-sortable-type='numeric' id='rm_3' style='display: none;'>Return(3m)</th><th data-sortable-type='numeric' id='rm_6' style='display: none;'>Return(6m)</th><th data-sortable-type='numeric' id='ry_2' style='display: none;' >Return(2Yr)</th><th style='display: none;' >BenchMark</th><th id='nav' style='display: none;'>Nav</th><th style='display: none;' >Turnover Ratio</th><th style='display: none;'>Exit Load</th><th data-sortable-type='date' style='display: none;'>Launch Date</th><th style='display: none;'>Minimum Investment</th><th style='display: none;'>Average Maturity</th><th style='display: none;'>Modified Duration</th><th style='display: none;'>YTM</th><th style='display: none;'>Benchmark Index</th><th style='display: none;'>Beta</th><th style='display: none;'>Sharpe</th><th style='display: none;'>Sortino</th><th style='display: none;'>Standard Deviation</th><th style='display: none;'>Alpha</th><th style='display: none;'>YTD</th><th style='display: none;'>Fund House</th><th style='display: none;'>Fund Type</th></tr></thead>";
	// }
	// alert("ss");
	var tblData="";
	var tbl = " <table id='screener_table' name='aum' class='table table-bordered table-striped table-condensed sortable-theme-bootstrap' data-sortable>"
	if (data1.ptp_returns!=null)
	{
	for (var c=0;c<=column_limit.length;c++)
	{
	   // "<th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' >Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'>Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th style='display:none;'>Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield To Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'  >Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'> Nav </th> <th>Fund Type</th><th data-sortable-type='numeric'>Point to Point Return</th><th style='display:none'>classification</th>";
	}
	// alert("ss");
	// var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest Rating</th><th data-sortable-type='numeric' data-name='aum'>AUM (in ₹ cr)</th><th data-sortable-type='numeric'>Return - 1 yr (%)</th data-sortable-type='numeric'><th>Return - 3 yrs (%)</th><th data-sortable-type='numeric'>Return - 5 yrs (%)</th><th data-sortable-type='numeric'>Expense Ratio (%)</th><th>Highest Sector Allocation</th><th data-sortable-type='numeric' id='rm_1' style='display: none;'>Return - 1mo (%)</th><th data-sortable-type='numeric' id='rm_3' style='display: none;'>Return - 3 mo (%)</th><th data-sortable-type='numeric' id='rm_6' style='display: none;'>Return - 6 mo (%)</th><th data-sortable-type='numeric' id='ry_2' style='display: none;' >Return - 2 yrs (%)</th><th style='display: none;' >BenchMark</th><th id='nav' style='display: none;'>Nav</th><th style='display: none;' >Turnover Ratio (%)</th><th style='display: none;'>Exit Load</th><th data-sortable-type='date' style='display: none;'>Launch Date</th><th style='display: none;'>Min. Investment (in ₹)</th><th style='display: none;'>Avg. Maturity (in yrs)</th><th style='display: none;'>Mod. Duration (in yrs)</th><th style='display: none;'>Yield to Maturity (%)</th><th style='display: none;'>Benchmark Index</th><th style='display: none;'>Beta</th><th style='display: none;'>Sharpe</th><th style='display: none;'>Sortino</th><th style='display: none;'>Standard Deviation</th><th style='display: none;'>Alpha</th><th style='display: none;'>YTD (%)</th><th style='display: none;'>Fund House</th><th style='display: none;'>Fund Type</th><th>Point to Point Return</th></tr></thead>";
	    // var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-sortable-type='numeric' data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' >Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'>Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th style='display:none;'>Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield To Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'  >Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th data-sortable-type='alpha' style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'> Nav </th> <th>Fund Type</th><th style='display:none;'><center> No. of<br>Stocks</center></th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>10 yrs</th><th data-sortable-type='numeric'>Point to Point Return</th><th style='display:none'>classification</th></tr></thead>";
       var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span>Funds</span></th><th>Category</th><th data-sortable-type='numeric' data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' >Expense<br>Ratio (%)</th><th>Exit Load<br>(%)</th><th style='display:none;'>Fund Type</th><th data-sortable-type='date' style='display:none;'  >Inception Date</th><th data-sortable-type='alpha' style='display:none;'>Benchmark Index</th><th style='display:none;'> Nav </th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'>Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>10 yrs</th><th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th> <th style='display:none;'><center> No. of<br>Stocks</center></th><th style='display:none;'>Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield To Maturity (%)</th> <th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th data-sortable-type='numeric'>Point to Point Return</th><th style='display:none'>classification</th><th style='display:none'>Exit_load_Remarks</th></tr></thead>";

      //var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' > Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'> Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'> Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'> Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th >Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield to Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'>Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'>Nav</th> <th>Fund Type</th><th data-sortable-type='numeric'>Point to Point Return</th><th style='display:none'>classification</th></tr></thead>";

	}
	else
	{
	// alert("ss");
	// var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest Rating</th><th data-sortable-type='numeric' data-name='aum'>AUM (in ₹ cr)</th><th data-sortable-type='numeric'>Return - 1 yr (%)</th data-sortable-type='numeric'><th>Return - 3 yrs (%)</th><th data-sortable-type='numeric'>Return - 5 yrs (%)</th><th data-sortable-type='numeric'>Expense Ratio (%)</th><th>Highest Sector Allocation</th><th data-sortable-type='numeric' id='rm_1' style='display: none;'>Return - 1mo (%)</th><th data-sortable-type='numeric' id='rm_3' style='display: none;'>Return - 3 mo (%)</th><th data-sortable-type='numeric' id='rm_6' style='display: none;'>Return - 6 mo (%)</th><th data-sortable-type='numeric' id='ry_2' style='display: none;' >Return - 2 yrs (%)</th><th style='display: none;' >BenchMark</th><th id='nav' style='display: none;'>Nav</th><th style='display: none;' >Turnover Ratio (%)</th><th style='display: none;'>Exit Load</th><th data-sortable-type='date' style='display: none;'>Launch Date</th><th style='display: none;'>Min. Investment (in ₹)</th><th style='display: none;'>Avg. Maturity (in yrs)</th><th style='display: none;'>Mod. Duration (in yrs)</th><th style='display: none;'>Yield to Maturity (%)</th><th style='display: none;'>Benchmark Index</th><th style='display: none;'>Beta</th><th style='display: none;'>Sharpe</th><th style='display: none;'>Sortino</th><th style='display: none;'>Standard Deviation</th><th style='display: none;'>Alpha</th><th style='display: none;'>YTD (%)</th><th style='display: none;'>Fund House</th><th style='display: none;'>Fund Type</th></tr></thead>";
	// var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest Rating</th><th data-sortable-type='numeric'>AUM</th><th> Expense Ratio (%)</th><th style='display:none;'> Exit Load (%)</th><th> Fund Type</th><th style='display:none;'> Launch Date </th><th style='display:none;'>  Min. Investment (in ₹) </th><th style='display:none;'>  Benchmark Index </th><th style='display:none;'>  Fund House </th> <th style='display:none;'> Nav </th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'> Return (1 mo) </th><th style='display:none;' data-sortable-type='numeric'> Return (3 mo) </th><th style='display:none;' data-sortable-type='numeric'>  Return (6 mo) </th><th data-sortable-type='numeric'> Return (1 yr) </th><th style='display:none;' data-sortable-type='numeric'> Return (2 yrs) </th><th data-sortable-type='numeric'> Return (3 yrs) </th><th data-sortable-type='numeric'> Return (5 yrs) </th><th style='display:none;' data-sortable-type='numeric'>  Turnover Ratio (%) </th><th > Highest Sector</th><th style='display:none;' data-sortable-type='numeric'> Average Maturity (in years) </th><th style='display:none;' data-sortable-type='numeric'> Modified Duration (in years) </th><th style='display:none;' data-sortable-type='numeric'> Yield To Maturity (%) </th><th style='display:none;' data-sortable-type='numeric'> Beta </th><th style='display:none;' data-sortable-type='numeric'> Sharpe </th><th style='display:none;' data-sortable-type='numeric'> Sortino </th><th style='display:none;' data-sortable-type='numeric'> Standard Deviation </th><th style='display:none;' data-sortable-type='numeric'> Alpha </th></tr></thead>";
	// var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-sortable-type='numeric' data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' >Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'>Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th style='display:none;'>Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield To Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'>Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th data-sortable-type='alpha' style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'> Nav </th> <th>Fund Type</th><th style='display:none;'> <center>No. of<br>Stocks</center></th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>10 yrs</th><th style='display:none'>classification</th></tr></thead>";
	  	var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span>Funds</span></th><th>Category</th><th data-sortable-type='numeric' data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' >Expense<br>Ratio (%)</th><th>Exit Load<br>(%)</th><th style='display:none;'>Fund Type</th><th data-sortable-type='date' style='display:none;'  >Inception Date</th><th data-sortable-type='alpha' style='display:none;'>Benchmark Index</th><th style='display:none;'> Nav </th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'>Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>10 yrs</th><th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th> <th style='display:none;'><center> No. of<br>Stocks</center></th><th style='display:none;'>Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield To Maturity (%)</th> <th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none'>classification</th><th style='display:none'>Exit_load_Remarks</th></tr></thead>";
	  //var th = tbl+"<thead><tr class='bg-color'><th></th><th id='fundTh'><span onclick ='fund_th()'>Funds</span></th><th>Category</th><th data-name='rup_rating'>Rupeevest<br>Rating</th><th data-sortable-type='numeric'>AUM<br>(in ₹ cr)</th><th data-sortable-type='numeric' > Expense<br>Ratio (%)</th><th style='display:none;' data-sortable-type='numeric'> YTD Return </th><th style='display:none;' data-sortable-type='numeric'> Return (%)<br>1 mo</th><th style='display:none;' data-sortable-type='numeric'> Return (%)<br>3 mo</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>6 mo</th><th data-sortable-type='numeric'> Return (%)<br>1 yr</th><th style='display:none;' data-sortable-type='numeric'>Return (%)<br>2 yrs</th><th data-sortable-type='numeric'>Return (%)<br>3 yrs</th><th data-sortable-type='numeric'>Return (%)<br>5 yrs</th> <th style='display:none;' data-sortable-type='numeric'>Turnover Ratio (%)</th><th >Highest Sector</th><th style='display:none;' data-sortable-type='numeric'>Avg. Maturity<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Mod. Duration<br>(in yrs)</th><th style='display:none;' data-sortable-type='numeric'>Yield to Maturity (%)</th><th style='display:none;' data-sortable-type='numeric'>Beta</th><th style='display:none;' data-sortable-type='numeric'>Sharpe</th><th style='display:none;' data-sortable-type='numeric'>Sortino</th><th style='display:none;' data-sortable-type='numeric'>Standard Deviation</th><th style='display:none;' data-sortable-type='numeric'>Alpha</th><th style='display:none;'>Exit Load<br>(%)</th><th data-sortable-type='date' style='display:none;'>Inception Date</th><th style='display:none;'>Min. Inv.<br>(in ₹)</th><th style='display:none;'>Benchmark Index</th><th style='display:none;'>Fund House</th> <th style='display:none;'>Nav</th> <th>Fund Type</th><th style='display:none'>classification</th></tr></thead>";
	}


	if(data1!="")
	{
	$("#snapshottable_div").addClass("d_none");
	for(var i =0;i <= data1.schemedata.length-1;i++)
	{
	var scheme_data = data1.schemedata[i];

	var classification = scheme_data.classification;    // newly taken for classificaton {to use in hover function }

	var scheme_code = scheme_data.schemecode;
	var scheme_name = scheme_data.s_name;
	
	var fund_manager = scheme_data.fund_manager;
	var category = scheme_data.remarks1;

	var scheme_year1;
            if( scheme_data.returns_1year==null || scheme_data.returns_1year=='undefined')
              {
                scheme_year1="-";
              }
              else
              {
              	scheme_year1=scheme_data.returns_1year.toFixed(2);
              }

        var scheme_year2;
            if(scheme_data.returns_2year==null || scheme_data.returns_2year=='undefined')
              {
                   scheme_year2="-"; 	
              }
              else
              {
              	 scheme_year2=scheme_data.returns_2year.toFixed(2);   
              }      

	var scheme_year3;

            if( scheme_data.returns_3year==null || scheme_data.returns_3year=='undefined')
              {
               scheme_year3="-";    	
              }
              else
              {
              	scheme_year3=scheme_data.returns_3year.toFixed(2);   
              }

        var scheme_year5;
            if( scheme_data.returns_5year==null  || scheme_data.returns_5year=='undefined')
              {
                 scheme_year5="-";   	
              }
            else
              {
  	scheme_year5=scheme_data.returns_5year.toFixed(2); 
              }   

          var scheme_year10;
            if( scheme_data.returns_10year==null  || scheme_data.returns_10year=='undefined')
              {
                 scheme_year10="-";   	
              }
            else
              {
  	scheme_year10=scheme_data.returns_10year.toFixed(2); 
              }           
	
	var scheme_aum_total;

	if(scheme_data.aumtotal==null || scheme_data.aumtotal=='undefined')
	{
           scheme_aum_total = "-";
	}
	else
	{
	scheme_aum_total = commaSeparateNumber((parseFloat(scheme_data.aumtotal)).toFixed(2));
	}
	
        var exratio ;

        if(scheme_data.expenceratio==null || scheme_data.expenceratio=='undefined')
        {
        	exratio = "-";
        	
        }
        else
        {
        	exratio = scheme_data.expenceratio.toFixed(2);
        }
	
	var rr = scheme_data.rupeevest_rating;   


        var returns_1month;
             if( scheme_data.returns_1month==null || scheme_data.returns_1month=='undefined')
             {
                returns_1month = "-";
             }
             else
             {
             	returns_1month = scheme_data.returns_1month.toFixed(2);
             }

        var returns_3month;
             if( scheme_data.returns_3month==null || scheme_data.returns_3month=='undefined')
             {
                returns_3month = "-";
             }
             else
             {
             	returns_3month = scheme_data.returns_3month.toFixed(2);
             }

        var returns_6month;
             if(scheme_data.returns_6month==null || scheme_data.returns_6month=='undefined')
             {
                returns_6month = "-";
             }
             else
             {
               returns_6month = scheme_data.returns_6month.toFixed(2);
             }                 

         var avg_maturity="-";
              if((scheme_data.avg_maturity!=0) && ( scheme_data.avg_maturity!=null))
              {
                  avg_maturity = scheme_data.avg_maturity.toFixed(2);

                  // console.log("Average MAt->"+scheme_data.avg_maturity)
              }

	 var modified_duration="-";
	    if((scheme_data.mod_duration!=0) && (scheme_data.mod_duration!=null) )
	    {
	    	 modified_duration=scheme_data.mod_duration.toFixed(2);

	    	 // console.log("Modified Duration->"+scheme_data.mod_duration)
	    }

	 var ytm ="-"
	  if((scheme_data.ytm!=0) && (scheme_data.ytm!=null))
	  {
                 ytm=scheme_data.ytm.toFixed(2);
                 
                 // console.log("Ytm->"+scheme_data.ytm)
	  }
        
        var Fund_House=scheme_data.fund_house; 
        var ytd_returns=scheme_data.ytd_returns;
  
        var turnover_ratio;

        if(scheme_data.turnover_ratio==null || scheme_data.turnover_ratio=='undefined')
        {
        	turnover_ratio = "-";
        }
        else
        {
        	turnover_ratio = scheme_data.turnover_ratio;
        }

	var exitload;

	if(scheme_data.exitload==null || scheme_data.exitload=='undefined' || scheme_data.exitload==0)
	{
	exitload="-";
	} 
	else
	{
          exitload = scheme_data.exitload.toFixed(2);
	}
	var exitload_remarks;

	if(scheme_data.exitload_remarks==null || scheme_data.exitload_remarks=='undefined')
	{
	exitload_remarks="-";
	} 
	else
	{
          exitload_remarks = scheme_data.exitload_remarks;
	}

	
	var navrs = scheme_data.navrs.toFixed(2);
        

        // var inception_date = scheme_data.inception_date;

        var inception_date = "-";
        if(scheme_data.inception_date!=null)
        {
        	// console.log("TIME0000000000------------------------------------------------")
            // var date = new Date(scheme_data.inception_date);	
            // console.log(moment(scheme_data.inception_date).format('DD-MMM-YY'));
            inception_date= moment(scheme_data.inception_date).format('DD-MMM-YY');

              // console.log("date date date date")
             // console.log(date.format('MMM D, YYYY') );
             
             // inception_date = date;

             // inception_date = DateFormat.format(date, "dd-MMM-yy")

            // inception_date =  date.getDate() + '/' + (date.getMonth() + 1)+ '/' +  date.getFullYear();
        }
	   
	var minimum_investment;
        
        if(scheme_data.minimum_investment==null || scheme_data.minimum_investment=='undefined')
        {
        	minimum_investment = "-";
        }
        else
        {
            minimum_investment = commaSeparateNumber(scheme_data.minimum_investment);
        }

	var betax_returns;

	if(scheme_data.betax_returns==null || scheme_data.betax_returns=='undefined' || scheme_data.betax_returns==0)
	{
           betax_returns = "-";
	}
	else
	{
           betax_returns = scheme_data.betax_returns.toFixed(2);
	}

	var alphax_returns;
	 if(scheme_data.alphax_returns==null || scheme_data.alphax_returns=='undefined' || scheme_data.alphax_returns==0)
	 {
	 	alphax_returns ="-";
	 }
	 else
	 {
              alphax_returns = scheme_data.alphax_returns.toFixed(2);
	 }

	 var sotinox_returns;

	 if(scheme_data.sotinox_returns ==null || scheme_data.sotinox_returns=='undefined' || scheme_data.sotinox_returns == 0)
	 {
	 	sotinox_returns ="-";
	 }
	 else
	 {
	    sotinox_returns = scheme_data.sotinox_returns.toFixed(2);	
	 }
	 
 	var sharpex_returns;

 	if(scheme_data.sharpex_returns ==null || scheme_data.sharpex_returns=='undefined' || scheme_data.sharpex_returns==0)
 	{
 	sharpex_returns = "-";
 	}
 	else
 	{
 	sharpex_returns = scheme_data.sharpex_returns.toFixed(2);
 	}

	

        var Fund_Type=scheme_data.type_code;

           if(Fund_Type=="1")
           {
             Fund_Type="Open Ended";      
           }  
           else if(Fund_Type=="2")
           {
             Fund_Type="Closed Ended";      
           }
           else
           {
             Fund_Type="Interval"; 
           } 

        var Fund_Benchmark_Index=scheme_data.index_name;

	var sdx_returns;

	   if( scheme_data.assdx_returns==null || scheme_data.assdx_returns =='undefined' || scheme_data.assdx_returns==0 )
              {
                sdx_returns ="-";	  
              }
              else
              {
              	sdx_returns = scheme_data.assdx_returns.toFixed(2);
              }
	

	var portfolio_attributes = scheme_data.portfolio_attributes;
	var cost_factor = scheme_data.cost_factor;
	var risk = scheme_data.risk;
	var consistency_of_return = scheme_data.consistency_of_return;

	var total_return = scheme_data.total_return;
	var high_sec_alloc;

                

                var now = moment(new Date()); //todays date
	var end = moment(scheme_data.inception_date); // another date
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

	// <td>"+returns_1month+"</td><td>"+returns_3month+"</td><td>"+returns_6month+"</td><td>"+scheme_year2+"</td><td>"+scheme_year10+"</td><td>"+navrs+"</td>

	if(scheme_data.highest_sector)
	{
	high_sec_alloc = scheme_data.highest_sector;
	}
	else
	{
	high_sec_alloc = "NA";
	}


	var rr , rr_ico;
	if (scheme_data.rupeevest_rating)
	{
	rr = scheme_data.rupeevest_rating;
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


     var no_of_securities="-";
       
      
       	 no_of_securities=scheme_data.no_of_stocks;
       
         if (no_of_securities==null)
         {
         	 no_of_securities="-";
         }

	if(i == 0)
	{
	if (data1.ptp_returns!=null)
	{
	var returns = data1.ptp_returns[i].ptp_return;
	
	var days=data1.no_days.split('/');
	if (days[0]>365 && returns!="-")
	{
	var power=(365/days[0]);
	
	var returns=((Math.pow((1+(returns/100)), power)-1)*100).toFixed(2);
	}
	// tblData = th + "<tbody><tr><td><input id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='#' onclick='setvalue(this.id)'>"+scheme_name+"</a><br>"+fund_manager+"</td><td>"+category+"</td><td data-name = 'rup_rating'>"+rr+"</td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+high_sec_alloc+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td style='display: none;'>"+scheme_year2+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+navrs+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+Fund_Type+"</td><td>"+returns+"</td></tr>";
                   
                   // tblData = th + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td> <td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+navrs+"</td><td >"+Fund_Type+"</td><td style='display: none;'>"+no_of_securities+"</td><td style='display: none;'>"+scheme_year10+"</td><td>"+returns+"</td><td class='fund_category' style='display:none'>"+classification+"</td></tr>";
                 tblData = th + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td><span class='exitload_remarks' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+exitload+"</span></td><td style='display: none;'>"+Fund_Type+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+navrs+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+scheme_year10+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+no_of_securities+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+alphax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td>"+returns+"</td><td class='fund_category' style='display:none'>"+classification+"</td><td style='display:none'>"+exitload_remarks+"</td></tr>";

                
	}
	else 
	{
	 // tblData = th + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td> <td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+navrs+"</td><td >"+Fund_Type+"</td><td style='display: none;'>"+no_of_securities+"</td><td style='display: none;'>"+scheme_year10+"</td><td class='fund_category' style='display:none'>"+classification+"</td></tr>";
	tblData = th + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td><span class='exitload_remarks' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+exitload+"</span></td><td style='display: none;'>"+Fund_Type+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+navrs+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+scheme_year10+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+no_of_securities+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+alphax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td class='fund_category' style='display:none'>"+classification+"</td><td style='display:none'>"+exitload_remarks+"</td></tr>";

	} 
	 }         
	else
	{
	   /*tblData = tblData + "<tr><td><inputid="+scheme_code+"type='checkbox'name='chkCompare'/></td><td><a id="+scheme_code+"href='#'onclick='setvalue(this.id)'>"+scheme_name+"</a></td><td>"+rr+"</td><td data-name= 'aum' style='display:block;'>"+scheme_aum_total+"</td><td data-name= 'retyr1' style='display:block;'>"+scheme_year1+"</td><td data-name= 'retyr3' style='display:block;'>"+scheme_year3+"</td><td data-name= 'retyr5' style='display:block;'>"+scheme_year5+"</td><td data-name= 'exratio' style='display:block;'>"+exratio+"</td><td data-name= 'retmth1' style='display:block;'>"+returns_1month+"</td><td data-name= 'retmth3' style='display:block;'>"+returns_3month+"</td><td data-name= 'tnratio' style='display:block;'>"+turnover_ratio+"</td><td data-name= 'exload' style='display:block;'>"+exitload+"</td><td data-name= 'navrs' style='display:block;'>"+navrs+"</td><td data-name= 'indate' style='display:block;'>"+inception_date+"</td><td data-name= 'mininv' style='display:block;'>"+minimum_investment+"</td><td data-name= 'betax' style='display:block;'>"+betax_returns+"</td><td data-name= 'alphax' style='display:block;'>"+alphax_returns+"</td><td data-name= 'sotionox' style='display:block;'>"+sotinox_returns+"</td><td data-name= 'sharpex' style='display:block;'>"+sharpex_returns+"</td><td data-name= 'sdx' style='display:block;'>"+sdx_returns+"</td><td data-name= 'portattr' style='display:block;'>"+portfolio_attributes+"</td><td data-name= 'costfctr' style='display:block;'>"+cost_factor+"</td><td data-name= 'risk' style='display:block;'>"+risk+"</td><td data-name= 'ctrn' style='display:block;'>"+consistency_of_return+"</td><td data-name= 'trtn' style='display:block;'>"+total_return+"</td></tr>";*/

	   if (data1.ptp_returns!=null)
	{
	var returns = data1.ptp_returns[i].ptp_return;
	
	var days=data1.no_days.split('/');
	if (days[0]>365 && returns!="-")
	{
	var power=(365/days[0]);
	
	var returns=((Math.pow((1+(returns/100)), power)-1)*100).toFixed(2);
	}
	// tblData = tblData + "<tr><td><input id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='#' onclick='setvalue(this.id)'>"+scheme_name+"</a><br>"+fund_manager+"</td><td>"+category+"</td><td data-name = 'rup_rating'>"+rr+"</td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+high_sec_alloc+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td style='display: none;'>"+scheme_year2+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+navrs+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+Fund_Type+"</td><td>"+returns+"</td></tr>";
	// tblData = tblData + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td> <td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+navrs+"</td><td >"+Fund_Type+"</td><td style='display: none;'>"+no_of_securities+"</td><td style='display: none;'>"+scheme_year10+"</td><td>"+returns+"</td><td class='fund_category' style='display:none'>"+classification+"</td></tr>";
	tblData = tblData + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td><span class='exitload_remarks' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+exitload+"</span></td><td style='display: none;'>"+Fund_Type+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+navrs+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+scheme_year10+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+no_of_securities+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+alphax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td>"+returns+"</td><td class='fund_category' style='display:none'>"+classification+"</td><td style='display:none'>"+exitload_remarks+"</td></tr>";

	}
	else 
	{
	// tblData = tblData + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td style='display: none;'>"+ytd_returns+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td style='display: none;'>"+alphax_returns+"</td> <td style='display: none;'>"+exitload+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+minimum_investment+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+Fund_House+"</td><td style='display: none;'>"+navrs+"</td><td >"+Fund_Type+"</td><td style='display: none;'>"+no_of_securities+"</td><td style='display: none;'>"+scheme_year10+"</td><td class='fund_category' style='display:none'>"+classification+"</td></tr>";
	tblData = tblData + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+scheme_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td><span class='FundCategory' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+category+"</span></td><td data-name = 'rup_rating'><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td data-name= 'aum'>"+scheme_aum_total+"</td><td>"+exratio+"</td><td><span class='exitload_remarks' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true'>"+exitload+"</span></td><td style='display: none;'>"+Fund_Type+"</td><td style='display: none;'>"+inception_date+"</td><td style='display: none;'>"+Fund_Benchmark_Index+"</td><td style='display: none;'>"+navrs+"</td><td style='display: none;'>"+returns_1month+"</td><td style='display: none;'>"+returns_3month+"</td><td style='display: none;'>"+returns_6month+"</td><td>"+scheme_year1+"</td><td style='display: none;'>"+scheme_year2+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td style='display: none;'>"+scheme_year10+"</td><td style='display: none;'>"+turnover_ratio+"</td><td style='display: none;'>"+no_of_securities+"</td><td style='display: none;'>"+high_sec_alloc+"</td><td style='display: none;'>"+avg_maturity+"</td><td style='display: none;'>"+modified_duration+"</td><td style='display: none;'>"+ytm+"</td><td style='display: none;'>"+alphax_returns+"</td><td style='display: none;'>"+sharpex_returns+"</td><td style='display: none;'>"+sotinox_returns+"</td><td style='display: none;'>"+betax_returns+"</td><td style='display: none;'>"+sdx_returns+"</td><td class='fund_category' style='display:none'>"+classification+"</td><td style='display:none'>"+exitload_remarks+"</td></tr>";
	}
	}

	}
	// $("#snapshotTabletblData").html("");
	// $("#snapshotTabletblData").html(tblData);
	tblData = tblData +"</tbody></table>";
	$("#screener_table_div").html(tblData);
	 $("#total_res").html(data1.schemedata.length +" out of "+data1.total_count[0].count);
	 tbldata="";
	// Sortable.init();

    $( ".FundCategory").hover(function(){

        $("[data-toggle=popover]").popover();
        // debugger;
        var res = (this.parentElement.parentElement.childNodes[this.parentElement.parentElement.childElementCount-2].innerHTML);         
        $(this).attr('data-content', res);
    
    });

    $( ".exitload_remarks").hover(function(){

        $("[data-toggle=popover]").popover();
         // debugger;
        var res = (this.parentElement.parentElement.children[this.parentElement.parentElement.childElementCount-1].innerHTML);         
        $(this).attr('data-content', res);
    
    });

    $( ".CompCheckBox").hover(function(){

        $("[data-toggle=popover]").popover();
        
        $(this).attr('data-content', 'Select to compare');
    
    });

	get_selected_item();
	}
	else
	{
	$("#snapshottable_div").removeClass("d_none");
	$("#snapshottable_div").show();
	}


	
}





function chkbox_click(obj)
{
	var checkboxId= obj.id;
	
	//alert(checkboxId);
	if(checkboxId == "chkAllEquity")
	{
	if(document.getElementById("chkAllEquity").checked == true)
	{
	document.getElementById("chkEo").checked = true;
	document.getElementById("chkDbOt").checked = true;
	document.getElementById("chkHyOth").checked = true;
	}
	else
	{
	document.getElementById("chkEo").checked = false;
	document.getElementById("chkDbOt").checked = false;
	document.getElementById("chkHyOth").checked = false;
	}

	}
	else
	{
	var querstring;
	var checkboxes = document.getElementsByName(checkboxId);
	
	for(var i=0, n=checkboxes.length;i<n;i++)
	{
	checkboxes[i].checked = obj.checked;
	if(i == 0)
	{
	querstring =  checkboxes[i].value;
	}
	else
	{
	querstring = querstring + "," + checkboxes[i].value;
	}
	}
	//alert(querstring);
	}
}





function rating_all()
{
	
	if(document.getElementById("chkratingAll").checked == true)
	{
	document.getElementById("rating5").checked = false;
	document.getElementById("rating4").checked = false;
	document.getElementById("rating3").checked = false;
	document.getElementById("rating2").checked = false;
	document.getElementById("rating1").checked = false;
	document.getElementById("ratingUnrated").checked = false;
	rate_selected_flag=0;
	rating_selection=[];

	}
	else
	{
	document.getElementById("rating5").checked = false;
	document.getElementById("rating4").checked = false;
	document.getElementById("rating3").checked = false;
	document.getElementById("rating2").checked = false;
	document.getElementById("rating1").checked = false;
	document.getElementById("ratingUnrated").checked = false;
	rate_selected_flag=1;
	rating_selection=[];
	}
	print_rating_selection();
	query_run();

}
// function selected_schemes(obj)
// { 

// 	 // alert(val_1);

// 	var selected_schemes = "";
// 	var condn_type = "";
// 	if(obj == "asset_selection")
// 	{
// 	var eqty = document.getElementsByName("chkAllEquity");
// 	var dbt = document.getElementsByName("chkAllDebt");
// 	var hbd = document.getElementsByName("chkAllHybrid");
// 	var etf = document.getElementsByName("chkAllEtfs");

// 	for(var i = 0; i<eqty.length;i++)
// 	{
// 	if(eqty[i].checked == true)
// 	{
// 	if(selected_schemes == "")
// 	{
// 	selected_schemes = eqty[i].value;
// 	}
// 	else
// 	{
// 	selected_schemes = selected_schemes + "," + eqty[i].value;
// 	}
// 	}
// 	}
// 	for(var i = 0; i<dbt.length;i++)
// 	{
// 	if(dbt[i].checked == true)
// 	{
// 	if(selected_schemes == "")
// 	{
// 	selected_schemes = dbt[i].value;
// 	}
// 	else
// 	{
// 	selected_schemes = selected_schemes + "," + dbt[i].value;
// 	}
// 	}
// 	}
// 	for(var i = 0; i<hbd.length;i++)
// 	{
// 	if(hbd[i].checked == true)
// 	{
// 	if(selected_schemes == "")
// 	{
// 	selected_schemes = hbd[i].value;
// 	}
// 	else
// 	{
// 	selected_schemes = selected_schemes + "," + hbd[i].value;
// 	}
// 	}
// 	}
// 	for(var i = 0; i<etf.length;i++)
// 	{
// 	if(etf[i].checked == true)
// 	{
// 	if(selected_schemes == "")
// 	{
// 	selected_schemes = etf[i].value;
// 	}
// 	else
// 	{
// 	selected_schemes = selected_schemes + "," + etf[i].value;
// 	}
// 	}
// 	}
// 	}
// 	else if(obj == "rup_rating")
// 	{
// 	var rating = document.getElementsByName("chkratingAll");
// 	for(var i = 0; i<rating.length;i++)
// 	{
// 	if(rating[i].checked == true)
// 	{
// 	if(selected_schemes == "")
// 	{
// 	selected_schemes = rating[i].value;
// 	}
// 	else
// 	{
// 	selected_schemes = selected_schemes + "," + rating[i].value;
// 	}
// 	}
// 	}
// 	//alert(selected_schemes);
// 	}
// 	else if(obj == "factor_score")
// 	{
// 	selected_schemes = selected_schemes + document.getElementById("totalreturn").value + "," + document.getElementById("consisreturn").value + "," + document.getElementById("risk").value + "," + document.getElementById("costfactor").value + "," + document.getElementById("portattr").value;

// 	condn_type = "factor_score";
// 	}
// 	else if(obj == "filters")
// 	{
// 	var asset_min = $("#fromValueasset").val();
// 	var asset_max = $("#toValueasset").val();
// 	var age_min = $("#fromValueage").val();
// 	var age_max =$("#toValueage").val();
// 	var exitload_min =$("#fromValueexitload").val();
// 	var exitload_max = $("#toValueexitload").val();
// 	var turnover_ratio_min =$("#fromValueturnoverratio").val();
// 	var turnover_ratio_max =$("#toValueturnoverratio").val();
// 	var expenceratio_min =$("#fromValueexpenseratio").val();
// 	var expenceratio_max =$("#toValueexpenseratio").val();
// 	var amc =$("#amcname").val();
// 	var index = $("#indexname").val();
// 	var fund_manager = $("#fundmanager").val();
// 	var amcall = document.getElementById("chkAmc").checked;
// 	var indexall = document.getElementById("chkIndex").checked;
// 	var fundmgrall = document.getElementById("chkFund").checked;
// 	selected_schemes = asset_min +","+ asset_max +","+ age_min +","+ age_max +","+ exitload_min +","+ exitload_max +","+ turnover_ratio_min +","+ turnover_ratio_max +","+ expenceratio_min +","+ expenceratio_max +","+ amc +","+ index +","+ fund_manager+","+amcall+","+indexall+","+fundmgrall;
// 	condn_type = "filters";
// 	debugger;
// 	}
// 	else{

// 	}
// 	if(selected_schemes == "")
// 	{
// 	alert("Select Some parameters to retrieve data");
// 	}
// 	else
// 	{
// 	$("#snapshotTabletblData").html("");
// 	$.ajax({
//                 type: "POST",
//                 url: '/functionalities/asset_class_section?',
//                 data: { selected_schemes : selected_schemes,condn_type:condn_type },
//                 datatype:'json',
// 	success:function(data1, textStatus, jqXHR) {
// 	console.log(data1);
// 	var tblData;
// 	var t = document.getElementById("snapshotTabletblData").innerHTML;
// 	for(var i =0;i <= data1.schemedata.length-1;i++)
// 	{
// 	var scheme_data = data1.schemedata[i];
// 	var scheme_code = scheme_data.schemecode;
// 	var scheme_name = scheme_data.s_name;
// 	var scheme_year1 = scheme_data.returns_1year;
// 	var scheme_year3 = scheme_data.returns_3year;
// 	var scheme_year5 = scheme_data.returns_5year;
// 	var scheme_aum_total = scheme_data.aumtotal;
// 	var exratio = scheme_data.expenceratio;
// 	var rr = scheme_data.rupeevest_rating;
// 	var returns_1month = scheme_data.returns_1month;
// 	var returns_3month = scheme_data.returns_3month;
// 	var turnover_ratio = scheme_data.turnover_ratio;
// 	var exitload = scheme_data.exitload;
// 	var navrs = scheme_data.navrs;
// 	var inception_date = scheme_data.inception_date;
// 	var minimum_investment = scheme_data.minimum_investment;
// 	var betax_returns = scheme_data.betax_returns;
// 	var alphax_returns = scheme_data.alphax_returns;
// 	var sotinox_returns = scheme_data.sotinox_returns;
// 	var sharpex_returns = scheme_data.sharpex_returns;


// 	var sdx_returns = scheme_data.sdx_returns;
// 	var portfolio_attributes = scheme_data.portfolio_attributes;
// 	var cost_factor = scheme_data.cost_factor;
// 	var risk = scheme_data.risk;
// 	var consistency_of_return = scheme_data.consistency_of_return;

// 	var total_return = scheme_data.total_return;
// 	var high_sec_alloc = scheme_data.highest_sector;
//                     var rr;
// 	if (scheme_data.rupeevest_rating)
// 	{
// 	rr = scheme_data.rupeevest_rating;
// 	}
// 	else
// 	{
// 	rr = "-";
// 	}

// 	if(i == 0)
// 	{
// 	  /*tblData = t+"<tr><td><inputid="+scheme_code+"type='checkbox'name='chkCompare'/></td><td><aid="+scheme_code+"href='#'onclick='setvalue(this.id)'>"+scheme_name+"</a></td><td>"+rr+"</td><td>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+returns_1month+"</td><td>"+returns_3month+"</td><td>"+turnover_ratio+"</td><td>"+exitload+"</td><td>"+navrs+"</td><td>"+inception_date+"</td><td>"+minimum_investment+"</td><td>"+betax_returns+"</td><td>"+alphax_returns+"</td><td>"+sotinox_returns+"</td><td>"+sharpex_returns+"</td><td>"+sdx_returns+"</td><td>"+portfolio_attributes+"</td><td>"+cost_factor+"</td><td>"+risk+"</td><td>"+consistency_of_return+"</td><td>"+total_return+"</td></tr>";*/
// 	 /* tblData = t + "<tr><td><input id="+scheme_code+" type='checkbox' name='chkCompare'/></td><td><a id="+scheme_code+" href='#' onclick='setvalue(this.id)'>"+scheme_name+"</a></td><td>"+rr+"</td><td>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+high_sec_alloc+"</td></tr>";
// 	}

// 	else
// 	{*/
//                        /*tblData = tblData +"<tr><td><inputid="+scheme_code+"type='checkbox'name='chkCompare'/></td><td><aid="+scheme_code+"href='#'onclick='setvalue(this.id)'>"+scheme_name+"</a></td><td>"+rr+"</td><td>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+returns_1month+"</td><td>"+returns_3month+"</td><td>"+turnover_ratio+"</td><td>"+exitload+"</td><td>"+navrs+"</td><td>"+inception_date+"</td><td>"+minimum_investment+"</td><td>"+betax_returns+"</td><td>"+alphax_returns+"</td><td>"+sotinox_returns+"</td><td>"+sharpex_returns+"</td><td>"+sdx_returns+"</td><td>"+portfolio_attributes+"</td><td>"+cost_factor+"</td><td>"+risk+"</td><td>"+consistency_of_return+"</td><td>"+total_return+"</td></tr>";*/


// 	/*tblData = tblData + "<tr><td><input id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='#' onclick='setvalue(this.id)'>"+scheme_name+"</a></td><td>"+rr+"</td><td>"+scheme_aum_total+"</td><td>"+scheme_year1+"</td><td>"+scheme_year3+"</td><td>"+scheme_year5+"</td><td>"+exratio+"</td><td>"+high_sec_alloc+"</td></tr>";
// 	}
// 	}
// 	$("#snapshotTabletblData").html("");
// 	$("#snapshotTabletblData").html(tblData);*/
// 	fill_snapshot_table(data1);
// 	fill_landing_returns(data1);
// 	//var sorter = tsorter.create('snapshotTable');

//                 },  error:function(jqXHR, textStatus, errorThrown) {
// 	alert("AJAX Error:" + textStatus);
// 	}
//             });
// 	}

// }


function get_dividend_data(schemecode)
{
	$.ajax({
	type:'GET',
	url: '/functionalities/get_dividend_data',
	data :{schemecode:schemecode},
	datatype:'json',
	success:function(dividend_data, textStatus, jqXHR) {
	// console.log('response')
	var tbldata1="";
	// console.log(dividend_data.dividend_data.length);
	var data;
	if(dividend_data.dividend_data.length==0)
	{
	$("#dividend_data").html("No Recent Dividend Action");
	}
	else
	{


	var th = "<thead><tr><th>Plan</th><th>Record Date</th><th>Dividend (Rs/Unit)</th></tr></thead>";
	for(var i =0; i<= dividend_data.dividend_data.length-1;i++)
	{
	var div_data = dividend_data.dividend_data[i];
	// console.log(div_data)
	var recorddate = moment(div_data.recorddate).format('DD-MMM-YY');
	var gross = parseFloat(div_data.gross).toFixed(4);
	var div_type = div_data.div_type;

	if(i == 0)
	{
	tblData1 = th + "<tr><td>"+div_type+"</td><td>"+recorddate+"</td><td>"+gross+"</td></tr>";
	}
	else
	{
	tblData1 = tblData1 + "<tr><td>"+div_type+"</td><td>"+recorddate+"</td><td>"+gross+"</td></tr>";
	}
	  }

	$("#dividend_data").html("");
	$("#dividend_data").html(tblData1);
	tbldata1="";
	      }
	},
	error:function(jqXHR, textStatus, errorThrown) {
	// alert("AJAX Error:" + textStatus);
	}
  })
}

function get_recent_updates(schemecode)
{  
	 var tblData=""
    $.ajax({
            type:'GET',
            url: '/functionalities/get_recent_updates',
            data :{schemecode:schemecode},
            datatype:'json',
            success:function(Recent_updates, textStatus, jqXHR) {
                
               
            // console.log(Recent_updates.Recent_updates.length);
            var data;
            var th = "<thead><tr> <th></th><th> </th></tr></thead>";
            for(var i =0; i<= Recent_updates.Recent_updates.length-1;i++)
            {
                var recent_data = Recent_updates.Recent_updates[i];
                // console.log(recent_data)
                var headline = recent_data.headline;
                var date = recent_data.date;


                if(i == 0)
                {
                    tblData = th + "<tr><td>"+headline+"</td><td>"+date+"</td></tr>";
                }
               else
                {
                    tblData = tblData + "<tr><td>"+headline+"</td><td>"+date+"</td></tr>";
                }
              }

            $("#Recent_updates").html("");
            $("#Recent_updates").html(tblData);
            tbldata="";
            },
                error:function(jqXHR, textStatus, errorThrown) {
                // alert("AJAX Error:" + textStatus);
            }
  })
}

function get_peer_comparision(schemecode)
{
	var tbldata;

	$$.get(curr_ip+'functionalities/get_peer_comparision', {schemecode: +schemecode},function (peer_comparision_ajax)
    {
    	var peer_comparision = JSON.parse(peer_comparision_ajax);
    	// console.log(peer_comparision);
		var pc_data;
		var th = "<thead class='breadcrumb_3'><tr><th rowspan='2'>Fund</th><th rowspan='2'>Rupeevest<br>Rating</th><th rowspan='2'>AUM (in Cr)</th><th rowspan='2'>Expense (%)</th><th class='peertabl_mon' colspan='4'>Return (%)</th></tr><tr><th>6 Mo</th><th>1 Yr</th><th>3 Yr</th><th>5 Yr</th></tr></thead>";
		for(var i =0;i <= peer_comparision.peer_comparision.length-1;i++)
		{
		var pc_data = peer_comparision.peer_comparision[i];
		var scheme_code = pc_data.schemecode;
		var s_name = pc_data.s_name;
		var rupeevest_rating = pc_data.rupeevest_rating;
		var ytd_returns = "-";
		if(pc_data.ytd_returns!=null)
		{
		ytd_returns = (pc_data.ytd_returns).toFixed(1);;
		}
		var returns_1month = "-";
		if(pc_data.returns_1month!=null)
		{
		returns_1month = (pc_data.returns_1month).toFixed(1);;
		}
		var returns_3month = "-";
		 if(pc_data.returns_3month!=null)
		 {
		 	returns_3month = (pc_data.returns_3month).toFixed(1);;
		 }

		var returns_1year = "-";
		 if(pc_data.returns_1year!=null)
		 {
		 	returns_1year = (pc_data.returns_1year).toFixed(1);;
		 }
		var returns_3year = "-";
		  if(pc_data.returns_3year!=null)
		  {
	 	returns_3year = (pc_data.returns_3year).toFixed(1);;
		  }
		var returns_5year = "-"
		  if(pc_data.returns_5year!=null)
		  {
		  	returns_5year = (pc_data.returns_5year).toFixed(1);;
		  }
	                var returns_6month = "-";
	                  if(pc_data.returns_6month!=null)
	                  {
	                  	returns_6month = (pc_data.returns_6month).toFixed(1);;
	                  }
	                var aumtotal = "-";  
	                 if(pc_data.aumtotal!=null)
	                 {
	                    aumtotal = (parseFloat(pc_data.aumtotal)).toFixed(1); 	
	                    aumtotal = commaSeparateNumber(aumtotal);
	                 }
		        
		var expenceratio ="-"
		if(pc_data.expenceratio!=null)
		{
	  	expenceratio = (pc_data.expenceratio).toFixed(1);;

		}
		 

		


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
	

		if(i == 0)
		{
		tblData = th + "<tr><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '> "+s_name+"</a></td><td><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td>"+aumtotal+"</td><td>"+expenceratio+"</td><td>"+returns_6month+"</td><td>"+returns_1year+"</td><td>"+returns_3year+"</td><td>"+returns_5year+"</td></tr>";
		}
		else
		{
		tblData = tblData + "<tr><td><a target='_blank' id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' '>"+s_name+"</a></td><td><span class='text-hide'>"+rr+"</span><span>"+rr_ico+"</span></td><td>"+aumtotal+"</td><td>"+expenceratio+"</td><td>"+returns_6month+"</td><td>"+returns_1year+"</td><td>"+returns_3year+"</td><td>"+returns_5year+"</td></tr>";
		}
		  }
		$("#peertabl").html("");
		$("#peertabl").html(tblData);
		tbldata="";


   	});
}

// function get_return_data(schemecode)
// {
// 	var tbldata;
// 	$.ajax({
// 	type:'GET',
// 	url: '/functionalities/get_return_data',
// 	data :{schemecode:schemecode},
// 	datatype:'json',
// 	success:function(returns_data, textStatus, jqXHR) {
// 	console.log(returns_data);
// 	var mf_data;
// 	var tblData;
// 	var th = "<thead><tr><th></th><th>1 Month</th><th>3 Month</th><th>6 Month</th><th>1 Year</th><th>3 Year</th><th>5 Year</th></tr></thead>";
// 	for(var i =0;i <= returns_data.returns_data.length-1;i++)
// 	{
// 	mf_data = returns_data.returns_data[i];
// 	var scheme_name = mf_data.s_name;
// 	    if(scheme_name==null)
// 	    {
// 	    	scheme_name="-";
// 	    }
// 	var monthret_1 = mf_data.returns_1month;
// 	if(monthret_1==null)
// 	    {
// 	    	monthret_1="-";
// 	    }
// 	    else
// 	    {
// 	    	monthret_1=monthret_1.toFixed(2);
// 	    }
// 	var monthret_3 = mf_data.returns_3month;
// 	   if(monthret_3==null)
// 	    {
// 	    	monthret_3="-";
// 	    }
// 	    else
// 	    {
// 	    	monthret_3=monthret_3.toFixed(2);
// 	    }
// 	 var monthret_6 = mf_data.returns_6month;
// 	    if(monthret_6==null)
// 	    {
// 	    	monthret_6="-";
// 	    }
// 	    else
// 	    {
// 	    	monthret_6=monthret_6.toFixed(2);
// 	    }

// 	var yrret_1 = mf_data.returns_1year;
// 	if(yrret_1==null)
// 	    {
// 	    	yrret_1="-";
// 	    }
// 	    else
// 	    {
// 	    	yrret_1=yrret_1.toFixed(2);
// 	    }
// 	var yearret_3 = mf_data.returns_3year;
// 	  if(yearret_3==null)
// 	    {
// 	    	yearret_3="-";
// 	    }
// 	     else
// 	    {
// 	    	yearret_3=yearret_3.toFixed(2);
// 	    }
// 	var yearret_5 = mf_data.returns_5year;
// 	  if(yearret_5==null)
// 	    {
// 	    	yearret_5="-";
// 	    }
// 	    else
// 	    {
// 	    	yearret_5=yearret_5.toFixed(2);
// 	    }


// 	var fund = "Fund"; 
// 	  if(fund==null)
// 	    {
// 	    	fund="-";
// 	    }
// 	// var ytd = mf_data.ytd_returns;
// 	var index_name = mf_data.index_name; 
// 	 if(index_name==null)
// 	    {
// 	    	index_name="-";
// 	    }

// 	var category_Average = "category Average";

// 	var Rank =  "Rank Within category";
// 	var Number_fund = " Number Of funds in category";
// 	// var rank_ytd = mf_data.rank_ytd;
// 	var rank_1month = mf_data.rank_1month;
// 	  if(rank_1month==null)
// 	    {
// 	    	rank_1month="-";
// 	    }

	  
// 	var rank_3month = mf_data.rank_3month; 
// 	   if(rank_3month==null)
// 	    {
// 	    	rank_3month="-";
// 	    }
	 
// 	 var rank_6month = mf_data.rank_6month;
// 	    if(rank_6month==null)
// 	    {
// 	    	rank_6month="-";
// 	    }
	  

// 	var rank_1year = mf_data.rank_1year;
// 	   if(rank_1year==null)
// 	    {
// 	    	rank_1year="-";
// 	    }
	

// 	var rank_3year = mf_data.rank_3year; 

// 	    if(rank_3year==null)
// 	    {
// 	    	rank_3year="-";
// 	    }
	


// 	var rank_5year = mf_data.rank_5year; 

// 	   if(rank_5year==null)
// 	    {
// 	    	rank_5year="-";
// 	    }

// 	// var funds_num_ytd = mf_data.funds_num_ytd;
// 	var funds_num_month1 = mf_data.funds_num_month1; 
// 	    if(funds_num_month1==null)
// 	    {
// 	    	funds_num_month1="-";
// 	    }
// 	var funds_num_month3 = mf_data.funds_num_month3; 
//                     if(funds_num_month3==null)
// 	    {
// 	    	funds_num_month3="-";
// 	    }

// 	 var funds_num_month6 = mf_data.funds_num_month6; 
//                      if(funds_num_month6==null)
// 	    {
// 	    	funds_num_month6="-";
// 	    }


// 	var funds_num_year1 = mf_data.funds_num_year1; 
 	
//  	if(funds_num_year1==null)
// 	    {
// 	    	funds_num_year1="-";
// 	    }


// 	var funds_num_year3 = mf_data.funds_num_year3; 
 	
//  	if(funds_num_year3==null)
// 	    {
// 	    	funds_num_year3="-";
// 	    }

// 	var funds_num_year5 = mf_data.funds_num_year5; 

// 	    if(funds_num_year5==null)
// 	    {
// 	    	funds_num_year5="-";
// 	    }

// 	// var ytd_avg = mf_data.ytd_avg;
// 	var avg_month1 = mf_data.avg_month1; 
                     
//                    if(avg_month1==null)
// 	    {
// 	    	avg_month1="-";
// 	    }
// 	    else
// 	    {
// 	    	avg_month1 = avg_month1.toFixed(2);
// 	    }


// 	var avg_month3 = mf_data.avg_month3; 
  	  
//   	  if(avg_month3==null)
// 	        {
// 	    	avg_month3="-";
// 	        }
// 	         else
// 	        {
// 	    	 avg_month3 = avg_month3.toFixed(2);
// 	        }


// 	 var avg_month6 = mf_data.avg_month6;

// 	       if(avg_month6==null)
// 	        {
// 	    	avg_month6="-";
// 	        }
// 	        else
// 	        {
// 	    	 avg_month6 = avg_month6.toFixed(2);
// 	        }

// 	var avg_year1 = mf_data.avg_year1; 

// 	        if(avg_year1==null)
// 	        {
// 	    	avg_year1="-";
// 	        }
// 	        else
// 	        {
// 	    	 avg_year1 = avg_year1.toFixed(2);
// 	        }

// 	var avg_year3 = mf_data.avg_year3; 

// 	        if(avg_year3==null)
// 	        {
// 	    	avg_year3="-";
// 	        }
// 	        else
// 	        {
// 	    	 avg_year3 = avg_year3.toFixed(2);
// 	        }

// 	var avg_year5 = mf_data.avg_year5; 

// 	         if(avg_year5==null)
// 	        {
// 	    	avg_year5="-";
// 	        }
// 	        else
// 	        {
// 	    	 avg_year5 = avg_year5.toFixed(2);
// 	        }

// 	// var ytdret = mf_data.ytdret;
// 	 var monthret_1_bm = mf_data.monthret_1; 
// 	       if(monthret_1_bm==null)
// 	        {
// 	    	monthret_1_bm="-";
// 	        }
// 	        else
// 	        {
// 	    	 monthret_1_bm = monthret_1_bm.toFixed(2);
// 	        }

// 	 var monthret_3_bm = mf_data.monthret_3; 
// 	       if(monthret_3_bm==null)
// 	        {
// 	    	monthret_3_bm="-";
// 	        }
// 	        else
// 	        {
// 	    	 monthret_3_bm = monthret_3_bm.toFixed(2);
// 	        }

//                  var monthret_6_bm = mf_data.monthret_6; 

//                        if(monthret_6_bm==null)
// 	        {
// 	    	monthret_6_bm="-";
// 	        }
// 	        else
// 	        {
// 	    	 monthret_6_bm = monthret_6_bm.toFixed(2);
// 	        }

// 	var yrret_1_bm = mf_data.yrret_1; 
 	
//  	  if(yrret_1_bm==null)
// 	        {
// 	    	yrret_1_bm="-";
// 	        }
// 	       else
// 	        {
// 	    	 yrret_1_bm = yrret_1_bm.toFixed(2);
// 	        }

// 	var yrret_3 = mf_data.yrret_3; 
 	
//  	if(yrret_3==null)
// 	        {
// 	    	yrret_3="-";
// 	        }
// 	        else
// 	        {
// 	    	 yrret_3 = yrret_3.toFixed(2);
// 	        }


// 	var yrret_5 = mf_data.yrret_5;

// 	       	if(yrret_5==null)
// 	        {
// 	    	yrret_5="-";
// 	        }
// 	        else
// 	        {
// 	    	 yrret_5 = yrret_5.toFixed(2);
// 	        }
// 	// "<td>"+monthret_6+"</td><td>"+monthret_6_bm+"</td><td>"+avg_month6+"</td><td>"+rank_6month+"</td><td>"+funds_num_month6+"</td>"
// 	if(i == 0)
// 	{
// 	tblData = th + "<tr><td>"+fund+"</td><td>"+monthret_1+"</td><td>"+monthret_3+"</td><td>"+monthret_6+"</td><td>"+yrret_1+"</td><td>"+yearret_3+"</td><td>"+yearret_5+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+index_name+"</td><td>"+monthret_1_bm+"</td><td>"+monthret_3_bm+"</td><td>"+monthret_6_bm+"</td><td>"+yrret_1_bm+"</td><td>"+yrret_3+"</td><td>"+yrret_5+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+category_Average+"</td><td>"+avg_month1+"</td><td>"+avg_month3+"</td><td>"+avg_month6+"</td><td>"+avg_year1+"</td><td>"+avg_year3+"</td><td>"+avg_year5+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+Rank+"</td><td>"+rank_1month+"</td><td>"+rank_3month+"</td><td>"+rank_6month+"</td><td>"+rank_1year+"</td><td>"+rank_3year+"</td><td>"+rank_5year+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+Number_fund+"</td><td>"+funds_num_month1+"</td><td>"+funds_num_month3+"</td><td>"+funds_num_month6+"</td><td>"+funds_num_year1+"</td><td>"+funds_num_year3+"</td><td>"+funds_num_year5+"</td></tr>";
// 	}
// 	else{
//                    // tblData = tblData + "<tr><td>"+fund+"</td><td>"+ytd+"</td><td>"+monthret_1+"</td><td>"+monthret_3+"</td><td>"+yrret_1+"</td><td>"+yearret_3+"</td><td>"+yearret_5+"</td></tr><tr></tr>";

// 	}
// 	}

// 	$("#return").html("");
// 	$("#return").html(tblData);
// 	tbldata="";
// 	},
// 	error:function(jqXHR, textStatus, errorThrown) {
// 	// alert("AJAX Error:" + textStatus);
// 	}
//   })
// }

// function get_risk_measures(schemecode)
// {
// 	var tblData="";
// 	$.ajax({
// 	type:'GET',
// 	url: '/functionalities/get_risk_measures',
// 	datatype:'json',
// 	data :{schemecode:schemecode},
// 	success:function(risk_data, textStatus, jqXHR) {
// 	console.log(risk_data);
// 	var rm_data="";
	
// 	var th = "<thead><tr><th></th><th>Std Dev</th><th>Beta</th><th>Sharpe</th><th>Sortino</th><th>Alpha</th></tr></thead><tbody>";
            

// 	for(var i =0;i <= risk_data.risk_data.length-1;i++)
// 	{
// 	rm_data = risk_data.risk_data[i];
// 	// var scheme_name = rm_data.s_name;
// 	 var sdx_returns;

// 	 if(rm_data.sdx_returns==null || rm_data.sdx_returns=='undefined' || rm_data.sdx_returns==0)
// 	 {
//                     sdx_returns="-";
// 	 }
// 	 else
// 	 {
//  	 sdx_returns = parseFloat(rm_data.sdx_returns);
// 	     sdx_returns = sdx_returns.toFixed(2);
// 	 }
	
// 	var sharpex_returns;

// 	 if(rm_data.sharpex_returns==null || rm_data.sharpex_returns=='undefined' || rm_data.sharpex_returns==0)
// 	 {
//                    sharpex_returns="-";
// 	 }
// 	 else
// 	 {
//                     sharpex_returns = parseFloat(rm_data.sharpex_returns);
// 	    sharpex_returns =sharpex_returns.toFixed(2);
// 	 }
                 
	   
//                 var sotinox_returns ;

//                 if(rm_data.sotinox_returns==null || rm_data.sotinox_returns=='undefined' || rm_data.sotinox_returns==0)
//                 {
//                 	sotinox_returns="-";
//                 }
//                 else
//                 {
//                 	sotinox_returns = parseFloat(rm_data.sotinox_returns);
// 	    sotinox_returns = sotinox_returns.toFixed(2);
//                 }
	    
//  	var betax_returns;

//  	if(rm_data.betax_returns==null || rm_data.betax_returns=='undefined' || rm_data.betax_returns==0)
//  	{
//  	betax_returns="-";
//  	}
//  	else
//  	{
//  	betax_returns = parseFloat(rm_data.betax_returns);
// 	    betax_returns = betax_returns.toFixed(2);
//  	}
// 	var alphax_returns;

// 	if(rm_data.alphax_returns==null || rm_data.alphax_returns=='undefined' || rm_data.alphax_returns==0)
// 	{
// 	alphax_returns="-";
// 	}
// 	else
// 	{
// 	 alphax_returns = parseFloat(rm_data.alphax_returns);
// 	     alphax_returns = alphax_returns.toFixed(2);
// 	}    

	   

// 	// var treynorx_returns = parseFloat(rm_data.treynorx_returns);
// 	//     treynorx_returns = treynorx_returns.toFixed(2);

// 	var fund = "Fund";
// 	var index_name = rm_data.index_name;
// 	var category_Average = "category Average";
// 	var Rank =  "Rank Within category";
// 	var Number_fund = " Number Of funds in category";
	 
// 	var sdy_returns;
	
// 	if(rm_data.sdy_returns==null || rm_data.sdy_returns=='undefined' || rm_data.sdy_returns==0)
// 	{
// 	sdy_returns="-";
// 	} 
// 	else
// 	{
// 	sdy_returns = parseFloat(rm_data.sdy_returns);
// 	    sdy_returns =sdy_returns.toFixed(2);
// 	}

	 
//  	 var sharpey_returns;

//  	 if(rm_data.sharpey_returns==null || rm_data.sharpey_returns=='undefined' || rm_data.sharpey_returns==0)
//  	 {
//  	 	sharpey_returns="-";
//  	 }
//  	 else
//  	 {
//  	 	sharpey_returns = parseFloat(rm_data.sharpey_returns);
// 	    sharpey_returns=sharpey_returns.toFixed(2);
//  	 }
	 
//  	 var sotinoy_returns;

//  	 if(rm_data.sotinoy_returns==null || rm_data.sotinoy_returns=='undefined'|| rm_data.sotinoy_returns==0)
//  	 {
//  	 	sotinoy_returns="-";
//  	 }
//  	 else
//  	 {
//  	 	sotinoy_returns = parseFloat(rm_data.sotinoy_returns);
// 	    sotinoy_returns=sotinoy_returns.toFixed(2);
//  	 }

	 
//  	 var betay_returns;

//  	 if(rm_data.betay_returns==null || rm_data.betay_returns=='undefined'|| rm_data.betay_returns==0)
//  	 {
//  	 	 betay_returns = "-";
	
//  	 }
//  	 else
//  	 {
//  	 	 betay_returns = parseFloat(rm_data.betay_returns);
// 	     betay_returns=betay_returns.toFixed(2);
//  	 }
	
//                  var alphay_returns;
//                  if(rm_data.alphay_returns==null || rm_data.alphay_returns=='undefined' || rm_data.alphay_returns==0)
//                  {
//                      alphay_returns = "-";
//                  }
//                  else
//                  {
//                  	 alphay_returns = parseFloat(rm_data.alphay_returns);
// 	     alphay_returns = alphay_returns.toFixed(2);
//                  }
	

// 	// var treynory_returns = parseFloat(rm_data.treynory_returns);
// 	//  treynory_returns=treynory_returns.toFixed(2);
                
//                  var rank_sd;
//                  if(rm_data.rank_sd==null || rm_data.rank_sd=='undefined' || rm_data.rank_sd==0)
//                  {
//                    rank_sd="-";
//                  }
//                  else
//                  {
//                    rank_sd = rm_data.rank_sd;	
//                  }
	 
// 	var rank_sharpe;

// 	if(rm_data.rank_sharpe==null || rm_data.rank_sharpe=='undefined' || rm_data.rank_sharpe==0)
// 	{
// 	    rank_sharpe='-';
// 	}
// 	else
// 	{
//   	rank_sharpe = rm_data.rank_sharpe;
// 	}
// 	var rank_sotino;

// 	 if(rm_data.rank_sotino==null || rm_data.rank_sotino=='undefined' || rm_data.rank_sotino==0)
// 	 {
// 	 	rank_sotino="-";
// 	 }
// 	 else
// 	 {
// 	 	rank_sotino = rm_data.rank_sotino;
// 	 }
	
// 	var rank_beta;
// 	if(rm_data.rank_beta==null || rm_data.rank_beta=='undefined' || rm_data.rank_beta==0)
// 	{
// 	rank_beta ="-";
// 	}
// 	else
// 	{
// 	  rank_beta = rm_data.rank_beta;	
// 	}
	
// 	var rank_alpha;

// 	if(rm_data.rank_alpha==null || rm_data.rank_alpha=='undefined' || rm_data.rank_alpha==0)
// 	{
// 	  rank_alpha="-";
// 	}
// 	else
// 	{
// 	  rank_alpha = rm_data.rank_alpha;	
// 	}
	
// 	// var rank_treynor = rm_data.rank_treynor;
               
//                 var avg_std_dev;

//                 if(rm_data.avg_std_dev==null || rm_data.avg_std_dev=='undefined'|| rm_data.avg_std_dev==0)
//                 {
//                 	avg_std_dev="-";
//                 }
//                 else
//                 {
//                    avg_std_dev = parseFloat(rm_data.avg_std_dev);
// 	avg_std_dev = avg_std_dev.toFixed(2);	
//                 }
	
//  	var avg_sharpe;
//  	if(rm_data.avg_sharpe==null || rm_data.avg_sharpe=='undefined' || rm_data.avg_sharpe==0)
//  	{
//  	avg_sharpe = "-";
//  	}
//  	else
//  	{
//  	avg_sharpe = parseFloat(rm_data.avg_sharpe);
// 	avg_sharpe = avg_sharpe.toFixed(2);
//  	}
	    
//  	 var avg_sotino;
//  	 if(rm_data.avg_sotino==null || rm_data.avg_sotino=='undefined' || rm_data.avg_sotino==0)
//  	 {
//  	avg_sotino = "-";
//  	 }
//  	 else
//  	 {
//  	avg_sotino = parseFloat(rm_data.avg_sotino);
// 	avg_sotino=avg_sotino.toFixed(2);
//  	 } 
	    
//  	var avg_beta;

//  	if(rm_data.avg_beta==null || rm_data.avg_beta=='undefined' || rm_data.avg_beta==0)
//  	{
//  	    avg_beta ="-";	
//  	}	
//  	else
//  	{
//  	avg_beta = parseFloat(rm_data.avg_beta);
// 	avg_beta=avg_beta.toFixed(2);
//  	}
	    
//  	  if(rm_data.avg_alpha==null || rm_data.avg_alpha=='undefined' || rm_data.avg_alpha==0)
//  	  {
//  	  	avg_alpha = "-";
//  	  }
//  	  else
//  	  {
//  	avg_alpha = parseFloat(rm_data.avg_alpha);
// 	avg_alpha=avg_alpha.toFixed(2);
//  	  }
	    

// 	// var avg_treyno = parseFloat(rm_data.avg_treyno);
// 	// 	avg_treyno=avg_treyno.toFixed(2);

// 	var avg_t = rm_data.no_of_funds_total;
// 	var avg_ta = rm_data.no_of_funds_total;
// 	var avg_tb = rm_data.no_of_funds_total;
// 	var avg_tc = rm_data.no_of_funds_total;
// 	var avg_td = rm_data.no_of_funds_total;
// 	// var avg_te = rm_data.no_of_funds_total;
               
//                  // var inception_date = new Date(rm_data.incept_date);
         
//                  // var currdate = new Date();

//                  // alert("D1->"+inception_date+"  D2-->"+currdate);
//                  //moment( )c

//                   	var now = moment(new Date()); //todays date
// 	var end = moment(rm_data.incept_date); // another date
// 	var duration = moment.duration(now.diff(end));
// 	var days = duration.asDays();
        
//                    if( days <365)
//                    {
// 	                     tblData=th + "<tr><td>"+fund+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td></tr>";
// 	// tblData = tblData + "<tr><td>"+index_name+"</td><td>"+sdy_returns+"</td><td>"+sharpey_returns+"</td><td>"+sotinoy_returns+"</td><td>"+betay_returns+"</td><td>"+alphay_returns+"</td><td>"+treynory_returns+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+category_Average+"</td><td>"+avg_std_dev+"</td><td>"+avg_beta+"</td><td>"+avg_sharpe+"</td><td>"+avg_sotino+"</td><td>"+avg_alpha+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+Rank+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+Number_fund+"</td><td>"+avg_t+"</td><td>"+avg_tc+"</td><td>"+avg_ta+"</td><td>"+avg_tb+"</td><td>"+avg_td+"</td></tr>";
//                    }
//                    else
//                    {
//                         	if(i == 0)
// 	{
// 	tblData=th + "<tr><td>"+fund+"</td><td>"+sdx_returns+"</td><td>"+betax_returns+"</td><td>"+sharpex_returns+"</td><td>"+sotinox_returns+"</td><td>"+alphax_returns+"</td></tr>";
// 	// tblData = tblData + "<tr><td>"+index_name+"</td><td>"+sdy_returns+"</td><td>"+sharpey_returns+"</td><td>"+sotinoy_returns+"</td><td>"+betay_returns+"</td><td>"+alphay_returns+"</td><td>"+treynory_returns+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+category_Average+"</td><td>"+avg_std_dev+"</td><td>"+avg_beta+"</td><td>"+avg_sharpe+"</td><td>"+avg_sotino+"</td><td>"+avg_alpha+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+Rank+"</td><td>"+rank_sd+"</td><td>"+rank_beta+"</td><td>"+rank_sharpe+"</td><td>"+rank_sotino+"</td><td>"+rank_alpha+"</td></tr>";
// 	tblData = tblData + "<tr><td>"+Number_fund+"</td><td>"+avg_t+"</td><td>"+avg_tc+"</td><td>"+avg_ta+"</td><td>"+avg_tb+"</td><td>"+avg_td+"</td></tr>";
// 	}else
// 	{
//                          	/*tblData = tblData + "<tr class='active'><td>Category Average</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr><td>Rank Within Category</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr class=active><td>Number of funds in category</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr><td>As on April XYZ</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr>";*/
// 	        }
//                    }
//                    // alert(days);

//                  // var inception_date=

	
// 	}

// 	tblData = tblData + "</tbody>"
// 	$("#riskmeasure").html("");
// 	$("#riskmeasure").html(tblData);
// 	tblData="";
// 	},
// 	error:function(jqXHR, textStatus, errorThrown) {
// 	// alert("AJAX Error:" + textStatus);
// 	}
//   })
// }


function get_return_data(schemecode)
{
	var tbldata;
	$$.get(curr_ip+'functionalities/get_return_data', {schemecode: +schemecode},function (returns_data_ajax) 
	{
		var mf_data;
		var tblData;
		 var returns_data = JSON.parse(returns_data_ajax);
		 // console.log("++++++++++++++++++++++++++++++++")
		 // console.log(returns_data_ajax);
		 //  console.log("++++++++++++++++++++++++++++++++")
		var th = "<thead class='breadcrumb_3'><tr><th></th><th>3 Month</th><th>6 Month</th><th>1 Year</th><th>3 Year</th><th>5 Year</th><th>10 Year</th></tr></thead>";
		for(var i =0;i <= returns_data.returns_data.length-1;i++)
		{
			mf_data = returns_data.returns_data[i];
			var scheme_name = mf_data.s_name;
			// console.log(scheme_name);
		    if(scheme_name==null)
		    {
		    	scheme_name="-";
		    }
			var monthret_1 = mf_data.returns_1month;
			if(monthret_1==null)
		    {
		    	monthret_1="-";
		    }
		    else
		    {
		    	monthret_1=monthret_1.toFixed(1);
		    }
			var monthret_3 = mf_data.returns_3month;
		   	if(monthret_3==null)
		    {
		    	monthret_3="-";
		    }
		    else
		    {
		    	monthret_3=monthret_3.toFixed(1);
		    }
		 	var monthret_6 = mf_data.returns_6month;
		    if(monthret_6==null)
		    {
		    	monthret_6="-";
		    }
		    else
		    {
		    	monthret_6=monthret_6.toFixed(1);
		    }
			var yrret_1 = mf_data.returns_1year;
			if(yrret_1==null)
		    {
		    	yrret_1="-";
		    }
		    else
		    {
		    	yrret_1=yrret_1.toFixed(1);
		    }
			var yearret_3 = mf_data.returns_3year;
		  	if(yearret_3==null)
		    {
		    	yearret_3="-";
		    }
		     else
		    {
		    	yearret_3=yearret_3.toFixed(1);
		    }
			var yearret_5 = mf_data.returns_5year;
		  	if(yearret_5==null)
		    {
		    	yearret_5="-";
		    }
		    else
		    {
		    	yearret_5=yearret_5.toFixed(1);
		    }
		    var yearret_10 = mf_data.returns_10year;
		  	if(yearret_10==null)
		    {
		    	yearret_10="-";
		    }
		    else
		    {
		    	yearret_10=yearret_10.toFixed(1);
		    }
			var fund = "Fund"; 
		 	 if(fund==null)
		    {
		    	fund="-";
		    }
			var index_name = mf_data.index_name; 
		 	if(index_name==null)
		    {
		    	index_name="-";
		    }
			var category_Average = "Category Average";
			var Rank =  "Rank Within Category";
			var Number_fund = " Number Of funds in Category";
			var rank_1month = mf_data.rank_1month;
		  	if(rank_1month==null)
		    {
		    	rank_1month="-";
		    }  
			var rank_3month = mf_data.rank_3month; 
		   	if(rank_3month==null)
		    {
		    	rank_3month="-";
		    } 
		 	var rank_6month = mf_data.rank_6month;
		    if(rank_6month==null)
		    {
		    	rank_6month="-";
		    }
			var rank_1year = mf_data.rank_1year;
		   if(rank_1year==null)
		    {
		    	rank_1year="-";
		    }
			var rank_3year = mf_data.rank_3year; 
		    if(rank_3year==null)
		    {
		    	rank_3year="-";
		    }
			var rank_5year = mf_data.rank_5year; 
		   	if(rank_5year==null)
		    {
		    	rank_5year="-";
		    }
			var rank_10year = mf_data.rank_10year; 
		   	if(rank_10year==null)
		    {
		    	rank_10year="-";
		    }
			var funds_num_month1 = mf_data.funds_num_month1; 
		    if(funds_num_month1==null)
		    {
		    	funds_num_month1="-";
		    }
			var funds_num_month3 = mf_data.funds_num_month3; 
	        if(funds_num_month3==null)
		    {
		    	funds_num_month3="-";
		    }
		 	var funds_num_month6 = mf_data.funds_num_month6; 
			if(funds_num_month6==null)
		    {
		    	funds_num_month6="-";
		    }
			var funds_num_year1 = mf_data.funds_num_year1; 
			no_of_funds_year1=mf_data.funds_num_year1;
	 		if(funds_num_year1==null)
		    {
		    	funds_num_year1="-";
		    }
			var funds_num_year3 = mf_data.funds_num_year3; 
	 		if(funds_num_year3==null)
		    {
		    	funds_num_year3="-";
		    }
			var funds_num_year5 = mf_data.funds_num_year5; 
		    if(funds_num_year5==null)
		    {
		    	funds_num_year5="-";
		    }
		 	var funds_num_year10 = mf_data.funds_num_year10; 
		    if(funds_num_year10==null)
		    {
		    	funds_num_year10="-";
		    }
			var avg_month1 = mf_data.avg_month1; 
	                     
	        if(avg_month1==null)
		    {
		    	avg_month1="-";
		    }
		    else
		    {
		    	avg_month1 = avg_month1.toFixed(1);
		    }
			var avg_month3 = mf_data.avg_month3; 
	  	  	if(avg_month3==null)
		    {
		   		avg_month3="-";
		    }
		    else
		    {
		    	avg_month3 = avg_month3.toFixed(1);
		    }
			var avg_month6 = mf_data.avg_month6;
			if(avg_month6==null)
		    {
		    	avg_month6="-";
		    }
		    else
		    {
		    	avg_month6 = avg_month6.toFixed(1);
		    }
			var avg_year1 = mf_data.avg_year1; 
			if(avg_year1==null)
	        {
	    		avg_year1="-";
	        }
	        else
	        {
	    	 	avg_year1 = avg_year1.toFixed(1);
	        }
			var avg_year3 = mf_data.avg_year3; 
	        if(avg_year3==null)
	        {
	    		avg_year3="-";
	        }
	        else
	        {
	    	 	avg_year3 = avg_year3.toFixed(1);
	        }
			var avg_year5 = mf_data.avg_year5; 
			if(avg_year5==null)
			{
				avg_year5="-";
			}
			else
			{
				avg_year5 = avg_year5.toFixed(1);
			}
		 	var avg_year10 = mf_data.avg_year10; 
	        if(avg_year10==null)
	        {
	    		avg_year10="-";
	        }
	        else
	        {
	    	 	avg_year10 = avg_year10.toFixed(1);
	        }
		 	var monthret_1_bm = mf_data.monthret_1; 
		    if(monthret_1_bm==null)
		    {
		    	monthret_1_bm="-";
		    }
		    else
		    {
		    	 monthret_1_bm = monthret_1_bm.toFixed(1);
		    }

	 		var monthret_3_bm = mf_data.monthret_3; 
			if(monthret_3_bm==null)
			{
			monthret_3_bm="-";
			}
			else
			{
			 monthret_3_bm = monthret_3_bm.toFixed(1);
			}
			var monthret_6_bm = mf_data.monthret_6; 
			if(monthret_6_bm==null)
	        {
	    	monthret_6_bm="-";
	        }
	        else
	        {
	    	 monthret_6_bm = monthret_6_bm.toFixed(1);
	        }
			var yrret_1_bm = mf_data.yrret_1; 
			if(yrret_1_bm==null)
	        {
	    		yrret_1_bm="-";
	        }
	       else
	        {
	    	 	yrret_1_bm = yrret_1_bm.toFixed(1);
	        }
			var yrret_3 = mf_data.yrret_3; 
 			if(yrret_3==null)
	        {
	    		yrret_3="-";
	        }
	        else
	        {
	    	 	yrret_3 = yrret_3.toFixed(1);
	        }
			var yrret_5 = mf_data.yrret_5;
	       	if(yrret_5==null)
	        {
	    		yrret_5="-";
	        }
	        else
	        {
	    	 	yrret_5 = yrret_5.toFixed(1);
	        }
	 		var yrret_10 = mf_data.yrret_10;
	       	if(yrret_10==null)
	        {
	    		yrret_10="-";
	        }
	        else
	        {
	    	 	yrret_10 = yrret_10.toFixed(1);
	        }
			if(i == 0)
			{
				tblData = th + "<tr><td>"+fund+"</td><td>"+monthret_3+"</td><td>"+monthret_6+"</td><td>"+yrret_1+"</td><td>"+yearret_3+"</td><td>"+yearret_5+"</td><td>"+yearret_10+"</td></tr>";
				tblData = tblData + "<tr><td>"+index_name+"</td><td>"+monthret_3_bm+"</td><td>"+monthret_6_bm+"</td><td>"+yrret_1_bm+"</td><td>"+yrret_3+"</td><td>"+yrret_5+"</td><td>"+yrret_10+"</td></tr>";
				tblData = tblData + "<tr><td>"+category_Average+"</td><td>"+avg_month3+"</td><td>"+avg_month6+"</td><td>"+avg_year1+"</td><td>"+avg_year3+"</td><td>"+avg_year5+"</td><td>"+avg_year10+"</td></tr>";
				tblData = tblData + "<tr><td>"+Rank+"</td><td>"+rank_3month+"</td><td>"+rank_6month+"</td><td>"+rank_1year+"</td><td>"+rank_3year+"</td><td>"+rank_5year+"</td><td>"+rank_10year+"</td></tr>";
				tblData = tblData + "<tr><td>"+Number_fund+"</td><td>"+funds_num_month3+"</td><td>"+funds_num_month6+"</td><td>"+funds_num_year1+"</td><td>"+funds_num_year3+"</td><td>"+funds_num_year5+"</td><td>"+funds_num_year10+"</td></tr>";
			}
			else
			{
	                
			}
		}
		// console.log("--------------start-----------------");
		// console.log(tblData);
		// console.log("---------------end----------------");
		$("#return").html("");
		$("#return").html(tblData);
		tbldata="";
		//console.log(scheme_name);
		// test_graph(scheme_name,schemecode);
		// asect_alloc(schemecode);
		// get_portfolio_holdings(schemecode);
		// port_avgcap();
	});
	return "True";
}

function get_risk_measures(schemecode)
{
	var tblData="";
	$.ajax({
	type:'GET',
	url: curr_ip+'/functionalities/get_risk_measures',
	datatype:'json',
	data :{schemecode:schemecode},
	success:function(risk_data, textStatus, jqXHR) {
	// console.log(risk_data);
	var rm_data="";
	
	var th = "<thead><tr><th></th><th>Std Dev</th><th>Beta</th><th>Sharpe</th><th>Sortino</th><th>Alpha</th></tr></thead><tbody>";
            

	for(var i =0;i <= risk_data.risk_data.length-1;i++)
	{
	rm_data = risk_data.risk_data[i];
	// var scheme_name = rm_data.s_name;
	 var sdx_returns;

	 if(rm_data.sdx_returns==null || rm_data.sdx_returns=='undefined' || rm_data.sdx_returns==0)
	 {
                    sdx_returns="-";
	 }
	 else
	 {
 	 sdx_returns = parseFloat(rm_data.sdx_returns);
	     sdx_returns = sdx_returns.toFixed(2);
	 }
	
	var sharpex_returns;

	 if(rm_data.sharpex_returns==null || rm_data.sharpex_returns=='undefined' || rm_data.sharpex_returns==0)
	 {
                   sharpex_returns="-";
	 }
	 else
	 {
                    sharpex_returns = parseFloat(rm_data.sharpex_returns);
	    sharpex_returns =sharpex_returns.toFixed(2);
	 }
                 
	   
                var sotinox_returns ;

                if(rm_data.sotinox_returns==null || rm_data.sotinox_returns=='undefined' || rm_data.sotinox_returns==0)
                {
                	sotinox_returns="-";
                }
                else
                {
                	sotinox_returns = parseFloat(rm_data.sotinox_returns);
	    sotinox_returns = sotinox_returns.toFixed(2);
                }
	    
 	var betax_returns;

 	if(rm_data.betax_returns==null || rm_data.betax_returns=='undefined' || rm_data.betax_returns==0)
 	{
 	betax_returns="-";
 	}
 	else
 	{
 	betax_returns = parseFloat(rm_data.betax_returns);
	    betax_returns = betax_returns.toFixed(2);
 	}
	var alphax_returns;

	if(rm_data.alphax_returns==null || rm_data.alphax_returns=='undefined' || rm_data.alphax_returns==0)
	{
	alphax_returns="-";
	}
	else
	{
	 alphax_returns = parseFloat(rm_data.alphax_returns);
	     alphax_returns = alphax_returns.toFixed(2);
	}    

	   

	// var treynorx_returns = parseFloat(rm_data.treynorx_returns);
	//     treynorx_returns = treynorx_returns.toFixed(2);

	var fund = "Fund";
	var index_name = rm_data.index_name;
	var category_Average = "Category Average";
	var Rank =  "Rank Within Category";
	var Number_fund = " Number Of funds in Category";
	 
	var sdy_returns;
	
	if(rm_data.sdy_returns==null || rm_data.sdy_returns=='undefined' || rm_data.sdy_returns==0)
	{
	sdy_returns="-";
	} 
	else
	{
	sdy_returns = parseFloat(rm_data.sdy_returns);
	    sdy_returns =sdy_returns.toFixed(2);
	}

	 
 	 var sharpey_returns;

 	 if(rm_data.sharpey_returns==null || rm_data.sharpey_returns=='undefined' || rm_data.sharpey_returns==0)
 	 {
 	 	sharpey_returns="-";
 	 }
 	 else
 	 {
 	 	sharpey_returns = parseFloat(rm_data.sharpey_returns);
	    sharpey_returns=sharpey_returns.toFixed(2);
 	 }
	 
 	 var sotinoy_returns;

 	 if(rm_data.sotinoy_returns==null || rm_data.sotinoy_returns=='undefined'|| rm_data.sotinoy_returns==0)
 	 {
 	 	sotinoy_returns="-";
 	 }
 	 else
 	 {
 	 	sotinoy_returns = parseFloat(rm_data.sotinoy_returns);
	    sotinoy_returns=sotinoy_returns.toFixed(2);
 	 }

	 
 	 var betay_returns;

 	 if(rm_data.betay_returns==null || rm_data.betay_returns=='undefined'|| rm_data.betay_returns==0)
 	 {
 	 	 betay_returns = "-";
	
 	 }
 	 else
 	 {
 	 	 betay_returns = parseFloat(rm_data.betay_returns);
	     betay_returns=betay_returns.toFixed(2);
 	 }
	
                 var alphay_returns;
                 if(rm_data.alphay_returns==null || rm_data.alphay_returns=='undefined' || rm_data.alphay_returns==0)
                 {
                     alphay_returns = "-";
                 }
                 else
                 {
                 	 alphay_returns = parseFloat(rm_data.alphay_returns);
	     alphay_returns = alphay_returns.toFixed(2);
                 }
	

	// var treynory_returns = parseFloat(rm_data.treynory_returns);
	//  treynory_returns=treynory_returns.toFixed(2);
                
                 var rank_sd;
                 if(rm_data.rank_sd==null || rm_data.rank_sd=='undefined' || rm_data.rank_sd==0)
                 {
                   rank_sd="-";
                 }
                 else
                 {
                   rank_sd = rm_data.rank_sd;	
                 }
	 
	var rank_sharpe;

	if(rm_data.rank_sharpe==null || rm_data.rank_sharpe=='undefined' || rm_data.rank_sharpe==0)
	{
	    rank_sharpe='-';
	}
	else
	{
  	rank_sharpe = rm_data.rank_sharpe;
	}
	var rank_sotino;

	 if(rm_data.rank_sotino==null || rm_data.rank_sotino=='undefined' || rm_data.rank_sotino==0)
	 {
	 	rank_sotino="-";
	 }
	 else
	 {
	 	rank_sotino = rm_data.rank_sotino;
	 }
	
	var rank_beta;
	if(rm_data.rank_beta==null || rm_data.rank_beta=='undefined' || rm_data.rank_beta==0)
	{
	rank_beta ="-";
	}
	else
	{
	  rank_beta = rm_data.rank_beta;	
	}
	
	var rank_alpha;

	if(rm_data.rank_alpha==null || rm_data.rank_alpha=='undefined' || rm_data.rank_alpha==0)
	{
	  rank_alpha="-";
	}
	else
	{
	  rank_alpha = rm_data.rank_alpha;	
	}
	
	// var rank_treynor = rm_data.rank_treynor;
               
                var avg_std_dev;

                if(rm_data.avg_std_dev==null || rm_data.avg_std_dev=='undefined'|| rm_data.avg_std_dev==0)
                {
                	avg_std_dev="-";
                }
                else
                {
                   avg_std_dev = parseFloat(rm_data.avg_std_dev);
	avg_std_dev = avg_std_dev.toFixed(2);	
                }
	
 	var avg_sharpe;
 	if(rm_data.avg_sharpe==null || rm_data.avg_sharpe=='undefined' || rm_data.avg_sharpe==0)
 	{
 	avg_sharpe = "-";
 	}
 	else
 	{
 	avg_sharpe = parseFloat(rm_data.avg_sharpe);
	avg_sharpe = avg_sharpe.toFixed(2);
 	}
	    
 	 var avg_sotino;
 	 if(rm_data.avg_sotino==null || rm_data.avg_sotino=='undefined' || rm_data.avg_sotino==0)
 	 {
 	avg_sotino = "-";
 	 }
 	 else
 	 {
 	avg_sotino = parseFloat(rm_data.avg_sotino);
	avg_sotino=avg_sotino.toFixed(2);
 	 } 
	    
 	var avg_beta;

 	if(rm_data.avg_beta==null || rm_data.avg_beta=='undefined' || rm_data.avg_beta==0)
 	{
 	    avg_beta ="-";	
 	}	
 	else
 	{
 	avg_beta = parseFloat(rm_data.avg_beta);
	avg_beta=avg_beta.toFixed(2);
 	}
	    
 	  if(rm_data.avg_alpha==null || rm_data.avg_alpha=='undefined' || rm_data.avg_alpha==0)
 	  {
 	  	avg_alpha = "-";
 	  }
 	  else
 	  {
 	avg_alpha = parseFloat(rm_data.avg_alpha);
	avg_alpha=avg_alpha.toFixed(2);
 	  }
	    

	// var avg_treyno = parseFloat(rm_data.avg_treyno);
	// 	avg_treyno=avg_treyno.toFixed(2);

	var avg_t = rm_data.no_of_funds_total;
	var avg_ta = rm_data.no_of_funds_total;
	var avg_tb = rm_data.no_of_funds_total;
	var avg_tc = rm_data.no_of_funds_total;
	var avg_td = rm_data.no_of_funds_total;
	// var avg_te = rm_data.no_of_funds_total;
               
                 // var inception_date = new Date(rm_data.incept_date);
         
                 // var currdate = new Date();

                 // alert("D1->"+inception_date+"  D2-->"+currdate);
                 //moment( )c

                  	var now = moment(new Date()); //todays date
	var end = moment(rm_data.incept_date); // another date
	var duration = moment.duration(now.diff(end));
	var days = duration.asDays();
        
                   if( days <365)
                   {
	                     tblData=th + "<tr><td>"+fund+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td></tr>";
	// tblData = tblData + "<tr><td>"+index_name+"</td><td>"+sdy_returns+"</td><td>"+sharpey_returns+"</td><td>"+sotinoy_returns+"</td><td>"+betay_returns+"</td><td>"+alphay_returns+"</td><td>"+treynory_returns+"</td></tr>";
	tblData = tblData + "<tr><td>"+category_Average+"</td><td>"+avg_std_dev+"</td><td>"+avg_beta+"</td><td>"+avg_sharpe+"</td><td>"+avg_sotino+"</td><td>"+avg_alpha+"</td></tr>";
	tblData = tblData + "<tr><td>"+Rank+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td><td>"+"-"+"</td></tr>";
	// tblData = tblData + "<tr><td>"+Number_fund+"</td><td>"+avg_t+"</td><td>"+avg_tc+"</td><td>"+avg_ta+"</td><td>"+avg_tb+"</td><td>"+avg_td+"</td></tr>";
	tblData = tblData + "<tr><td>"+Number_fund+"</td><td>"+no_of_funds_year1+"</td><td>"+no_of_funds_year1+"</td><td>"+no_of_funds_year1+"</td><td>"+no_of_funds_year1+"</td><td>"+no_of_funds_year1+"</td></tr>";
                   }
                   else
                   {
                        	if(i == 0)
	{
	tblData=th + "<tr><td>"+fund+"</td><td>"+sdx_returns+"</td><td>"+betax_returns+"</td><td>"+sharpex_returns+"</td><td>"+sotinox_returns+"</td><td>"+alphax_returns+"</td></tr>";
	// tblData = tblData + "<tr><td>"+index_name+"</td><td>"+sdy_returns+"</td><td>"+sharpey_returns+"</td><td>"+sotinoy_returns+"</td><td>"+betay_returns+"</td><td>"+alphay_returns+"</td><td>"+treynory_returns+"</td></tr>";
	tblData = tblData + "<tr><td>"+category_Average+"</td><td>"+avg_std_dev+"</td><td>"+avg_beta+"</td><td>"+avg_sharpe+"</td><td>"+avg_sotino+"</td><td>"+avg_alpha+"</td></tr>";
	tblData = tblData + "<tr><td>"+Rank+"</td><td>"+rank_sd+"</td><td>"+rank_beta+"</td><td>"+rank_sharpe+"</td><td>"+rank_sotino+"</td><td>"+rank_alpha+"</td></tr>";
	// tblData = tblData + "<tr><td>"+Number_fund+"</td><td>"+avg_t+"</td><td>"+avg_tc+"</td><td>"+avg_ta+"</td><td>"+avg_tb+"</td><td>"+avg_td+"</td></tr>";
	tblData = tblData + "<tr><td>"+Number_fund+"</td><td>"+no_of_funds_year1+"</td><td>"+no_of_funds_year1+"</td><td>"+no_of_funds_year1+"</td><td>"+no_of_funds_year1+"</td><td>"+no_of_funds_year1+"</td></tr>";
	}else
	{
                         	/*tblData = tblData + "<tr class='active'><td>Category Average</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr><td>Rank Within Category</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr class=active><td>Number of funds in category</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr><td>As on April XYZ</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr>";*/
	        }
                   }
                   // alert(days);

                 // var inception_date=

	
	}

	tblData = tblData + "</tbody>"
	$("#riskmeasure").html("");
	$("#riskmeasure").html(tblData);
	tblData="";
	},
	error:function(jqXHR, textStatus, errorThrown) {
	// alert("AJAX Error:" + textStatus);
	}
  })
}
function get_portfolio_holdings(schemecode)
{


	$("#portfolio_holdings").html("");
	$("#holding_table-3").html("");


	$$.get(curr_ip+'functionalities/portfolio_holdings', {schemecode: +schemecode},function (portfolio_holdings_ajax) {
		var portfolio_holdings = JSON.parse(portfolio_holdings_ajax);
		// console.log(portfolio_holdings.portfolio_holdings.length);
		var tblData="";
		var th = "<thead class='border-top breadcrumb_3'><tr><th>Security Name</th><th>Weight (%)</th></tr></thead>";
		   
	    if(portfolio_holdings.portfolio_holdings.length > 0)
	    {
	        for(var i =0;i <= portfolio_holdings.portfolio_holdings.length-1;i++)
		{
		var ph_data = portfolio_holdings.portfolio_holdings[i];
		var compname = ph_data.compname;
		var holdpercentage = ph_data.holdpercentage;
		if(i == 0)
		{
		tblData = th + "<tr class='post'><td>"+compname+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
		}
		else
		{
		tblData = tblData + "<tr class='post'><td>"+compname+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
		}
		  }
		$("#portfolio_holdings").html("");
		$("#portfolio_holdings").html(tblData);



		// $('#portfolio_holdings').DataTable( {
  //       responsive: true,
  //       "pageLength": 10
		// } );

		// console.log("?????????????????????????????????????");
		// console.log(tblData);
		// console.log("?????????????????????????????????????");
		// tbldata="";
		tbldata="";
								portfolio_pagination();
								if( portfolio_holdings.portfolio_holdings.length > 8)
							        {
							          $("#pages").removeClass("d_none");
							        }
							        else
							        {
							          $("#pages").addClass("d_none");
							        }
		}
	    else
	    {
		 	$("#portfolio_holdings").html("Portfolio Data Not Available");
		}


	});

	return "True";
}

// function get_hold_asset()
// {

// 	$.ajax({
// 	type:'GET',
// 	url: '/home/get_holding_asset',
// 	datatype:'json',
// 	success:function(sectordata, textStatus, jqXHR) {
// 	 console.log(sectordata);
// 	 var tblData="";
// 	 var tblData1 ="";
// 	 var th = ""; 
// 	 var th1 = ""; 

// 	 var classification = sectordata.classification;
      

// 	 if(classification == "Equity")
// 	 {

// 	 	th = "<thead><tr><th>Company</th><th>Industry</th><th>Sector</th><th>Assets %</th><th>Previous Quarter %</th></tr></thead>";
// 	 	for(var i =0;i <= sectordata.hold.length-1;i++)
// 	 {
// 	var item1 = sectordata.hold[i];
// 	var scheme_code = item1.schemecode;
// 	var company = item1.compname;
// 	var sector = item1.sect_name;
// 	var rv_sector = item1.rv_sect_name;
// 	var holdpercentage = item1.holdpercentage;
// 	var previous_quarter  = item1.prev_holdperc;
// 	            if(i == 0)
// 	               {
// 	                tblData = th + "<tr><td>"+company+"</td><td>"+sector+"</td><td>"+rv_sector+"</td><td>"+holdpercentage+"</td><td>"+previous_quarter+"</td></tr>";
// 	                      }
// 	              else
// 	              {
// 	               tblData = tblData + "<tr><td>"+company+"</td><td>"+sector+"</td><td>"+rv_sector+"</td><td>"+holdpercentage+"</td><td>"+previous_quarter+"</td></tr>";
// 	                }
// 	 }
// 	 $("#holding_table").html("");
// 	             $("#holding_table").html(tblData);

// 	 }

// 	 else if(classification == "Debt")
// 	 {

// 	 	th = "<thead><tr><th>Company</th><th>Asset Type</th><th>Rating</th><th>Assets %</th></tr></thead>";
// 	 	for(var i =0;i <= sectordata.hold.length-1;i++)
// 	 {
// 	var item1 = sectordata.hold[i];
// 	var scheme_code = item1.schemecode;
// 	var company = item1.compname;
// 	var asect_type = item1.asect_type;
// 	var rating = item1.rating;
// 	var holdpercentage = item1.holdpercentage;
// 	            if(i == 0)
// 	               {
// 	                tblData = th + "<tr><td>"+company+"</td><td>"+asect_type+"</td><td>"+rating+"</td><td>"+holdpercentage+"</td></tr>";
// 	                      }
// 	              else
// 	              {
// 	               tblData = tblData + "<tr><td>"+company+"</td><td>"+asect_type+"</td><td>"+rating+"</td><td>"+holdpercentage+"</td></tr>";
// 	                }
// 	 }
// 	 $("#holding_table").html("");
// 	             $("#holding_table").html(tblData);
// 	 }

// 	 else if(classification == "Hybrid")
// 	 {
              
// 	            th = "<thead><tr><th>Company</th><th>Industry</th><th>Sector</th><th>Assets %</th><th>Previous Quarter %</th></tr></thead>";
// 	 	for(var i =0;i <= sectordata.hold_eq.length-1;i++)
// 	 {
// 	var item1 = sectordata.hold_eq[i];
// 	var scheme_code = item1.schemecode;
// 	var company = item1.compname;
// 	var sector = item1.sect_name;
// 	var rv_sector = item1.rv_sect_name;
// 	var holdpercentage = item1.holdpercentage;
// 	var previous_quarter  = item1.prev_holdperc;
// 	            if(i == 0)
// 	               {
// 	                tblData = th + "<tr><td>"+company+"</td><td>"+sector+"</td><td>"+rv_sector+"</td><td>"+holdpercentage+"</td><td>"+previous_quarter+"</td></tr>";
// 	                      }
// 	              else
// 	              {
// 	               tblData = tblData + "<tr><td>"+company+"</td><td>"+sector+"</td><td>"+rv_sector+"</td><td>"+holdpercentage+"</td><td>"+previous_quarter+"</td></tr>";
// 	                }
// 	 }
// 	 $("#holding_table").html("");
// 	             $("#holding_table").html(tblData);
//   //debt -part




// 	  	th1 = "<thead><tr><th>Company</th><th>Asset Type</th><th>Rating</th><th>Assets %</th></tr></thead>";
// 	 	for(var i =0;i <= sectordata.hold_debt.length-1;i++)
// 	 {
// 	var item1 = sectordata.hold_debt[i];
// 	var scheme_code = item1.schemecode;
// 	var company = item1.compname;
// 	var asect_type = item1.asect_type;
// 	var rating = item1.rating;
// 	var holdpercentage = item1.holdpercentage;
// 	            if(i == 0)
// 	               {
// 	                tblData1 = th1 + "<tr><td>"+company+"</td><td>"+asect_type+"</td><td>"+rating+"</td><td>"+holdpercentage+"</td></tr>";
// 	                      }
// 	              else
// 	              {
// 	               tblData1 = tblData1 + "<tr><td>"+company+"</td><td>"+asect_type+"</td><td>"+rating+"</td><td>"+holdpercentage+"</td></tr>";
// 	                }
// 	 }
// 	 $("#holding_table-1").html("");
// 	             $("#holding_table-1").html(tblData1);





// 	 }
 
// 	},
// 	 error:function(jqXHR, textStatus, errorThrown) {
// 	   alert("AJAX Error:" + textStatus);
// 	 }
//  })
// }


function get_hold_asset(schemecode)
{
    var fincode_array = [];

     $$.get(curr_ip+'home/get_holding_asset',{schemecode: +schemecode},function (sectordata_ajax) 
    {
    	var sectordata=JSON.parse(sectordata_ajax);
    	var tblData_eq="";
	 var tblData_db="";
	 var tblData="";
	 var tblData1 ="";
	 var th = ""; 
	 var th1 = ""; 
	 var total_eq=0;
	 var total_db=0;
	 var total_ot=0;
	 var total_cash=0;

	 var classification = sectordata.classification;
        
         if (sectordata.stock_data_search.length > 1)
         {     

         	   for(var i=0 ; i< sectordata.stock_data_search.length ; i++ )
         	   {
         	   	 fincode_array.push(sectordata.stock_data_search[i].fincode); 
         	   }	
         }

	 if(sectordata.hold_eq.length > 0)
	 {
	 	 var as_on_date=moment(sectordata.hold_eq[0].invdate).format('DD-MMM-YY')
                       
                         univ_as_on_date = as_on_date;

	 	th = "<CAPTION><h4 class='d_inline'>Equity Holdings </h4><h6>&nbsp;&nbsp;(as on "+as_on_date+")</h6></CAPTION><thead><tr><th>Company</th><th>Sector</th><th>Assets %</th></tr></thead>";
	 	for(var i =0;i <= sectordata.hold_eq.length-1;i++)
	 {
	var item1 = sectordata.hold_eq[i];
	var scheme_code = item1.schemecode;
	var company = item1.compname;
	var rv_sector = item1.rv_sect_name;
	var holdpercentage = item1.holdpercentage;
	total_eq = total_eq + holdpercentage;

	var fin_code = item1.fincode;
                        var new_comp_link;

  	if(fincode_array.indexOf(fin_code)!= -1)
  	{
                            new_comp_link="<a target='_blank' href='/Mutual-Fund-Holdings/"+fin_code+"'>"+company+"</a>";
                     
  	}
  	else
  	{
  	new_comp_link=company;
  	}

	            if(i == 0)
	               {
	                tblData_eq = th + "<tr><td>"+new_comp_link+"</td><td>"+rv_sector+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
	               }
	              else
	              {
	               tblData_eq = tblData_eq + "<tr><td>"+new_comp_link+"</td><td>"+rv_sector+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
	               }
	 }
	 	 tblData_eq = tblData_eq+ "<tr><td>"+"Total</td><td>"+"</td><td>"+total_eq.toFixed(2)+"</td></tr>";
	 	
	
	

	

	 }

	 if(sectordata.hold_debt.length > 0)
	 {

	 	var as_on_date=moment(sectordata.hold_debt[0].invdate).format('DD-MMM-YY')
	 	th = "<CAPTION><h4 class='d_inline'>Debt Holdings </h4><h6>&nbsp;&nbsp;(as on "+as_on_date+")</h6></CAPTION><thead><tr><th>Instrument</th><th>Asset Type</th><th>Rating</th><th>Assets %</th></tr></thead>";
	 	for(var i =0;i <= sectordata.hold_debt.length-1;i++)
	 {
	var item1 = sectordata.hold_debt[i];
	var scheme_code = item1.schemecode;
	var company = item1.compname;
	var asect_type = item1.asect_type;
	var rating = item1.rating;
	var holdpercentage = item1.holdpercentage;
	total_db = total_db + holdpercentage;
	            if(i == 0)
	               {
	                tblData_db = th + "<tr><td>"+company+"</td><td>"+asect_type+"</td><td>"+rating+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
	                      }
	              else
	              {
	               tblData_db= tblData_db + "<tr><td>"+company+"</td><td>"+asect_type+"</td><td>"+rating+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
	                }
	 }
	 	tblData_db = tblData_db + "<tr><td>"+"Total</td><td>"+"</td><td>"+"</td><td>"+total_db.toFixed(2)+"</td></tr>";

	
	 }

	 if(sectordata.hold_others.length > 0)
	 {                

	 	                var as_on_date=moment(sectordata.hold_others[0].invdate).format('DD-MMM-YY')
	
	            th = "<CAPTION><h4 class='d_inline'>Miscellaneous Holdings</h4><h6>&nbsp;&nbsp;(as on "+as_on_date+")</h6></CAPTION><thead><tr><th>Instrument</th><th>Assets %</th></tr></thead>";
	 	for(var i =0;i <= sectordata.hold_others.length-1;i++)
	 {
	var item1 = sectordata.hold_others[i];

	var company = item1.compname;

	var holdpercentage = item1.holdpercentage;
	total_ot = total_ot + holdpercentage;

	            if(i == 0)
	               {
	                tblData = th + "<tr><td>"+company+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
	                      }
	              else
	              {
	               tblData = tblData + "<tr><td>"+company+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
	                }
	 }
	 tblData = tblData + "<tr><td>"+"Total</td><td>"+total_ot.toFixed(2)+"</td></tr>";
	 $("#holding_table-2").html("");
	             $("#holding_table-2").html(tblData);
	 }
	 if(sectordata.hold_cash.length > 0)
	 {
                            var as_on_date= moment(sectordata.hold_cash[0].invdate).format('DD-MMM-YY');  

	            th = "<CAPTION><h4 class='d_inline'>Cash & Cash Equivalents</h4><h6>&nbsp;&nbsp;(as on "+as_on_date+")</h6></CAPTION><thead><tr><th>Instrument</th><th>Assets %</th></tr></thead>";
	 	for(var i =0;i <= sectordata.hold_cash.length-1;i++)
	 {
	var item1 = sectordata.hold_cash[i];

	var company = item1.compname;

	var holdpercentage = item1.holdpercentage;
	total_cash = total_cash + holdpercentage;

	            if(i == 0)
	               {
	                tblData = th + "<tr><td>"+company+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
	                      }
	              else
	              {
	               tblData = tblData + "<tr><td>"+company+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
	                }
	 }
	 	tblData = tblData + "<tr><td>"+"Total</td><td>"+total_cash.toFixed(2)+"</td></tr>";
	 $("#holding_table-3").html("");
	             $("#holding_table-3").html(tblData);
	             tbldata="";
	 }
	 var total=total_eq + total_db+total_ot+total_cash;
	 $("#holding_table-3").append("<tr><td>Grand Total</td><td>"+Math.round(total.toFixed(2))+"</td></tr>");
	 plot_data(total_eq,total_db,tblData_eq,tblData_db,schemecode);

   	});

	// $.ajax({
	// type:'GET',
	// url: '/home/get_holding_asset',
	// data :{schemecode:schemecode},
	// datatype:'json',
	// success:function(sectordata, textStatus, jqXHR) {



	
 
	// }
 // })
return "True";
}

function plot_data(total_eq,total_db,tblData_eq,tblData_db,schemecode)
{
	if(total_eq>total_db)
	{
		 $("#holding_table").html("");
		 $("#holding_table").html(tblData_eq);
		 $("#holding_table-1").html("");
		$("#holding_table-1").html(tblData_db);
		if(tblData_eq!="" && total_eq>15)
		{
			port_graph_equity("container-01",schemecode);	
		}
		if(tblData_db!="" && total_db>15)
		{
			port_graph_debt("container-02",schemecode);	
			port_characteristics(schemecode,"portfolio_characteristics");
		}
		get_portfolio_markettable(schemecode,"portfolio_table");
		// get_portfolio_markettable_avgmcap(schemecode);
		// get_portfolio_markettable_allcapavgs(schemecode);
		concentration_values(schemecode,"conval");
		// if(total_db!=0)
		// {
		// 	// alert("debt");
		// 	// port_characteristics(schemecode,"portfolio_characteristics");
		// }
		
	}
	else
	{
		 $("#holding_table-1").html("");
		 $("#holding_table-1").html(tblData_eq);
		 $("#holding_table").html("");
		$("#holding_table").html(tblData_db);
		if(tblData_eq!="" && total_eq>15)
		{
			port_graph_equity("container-02",schemecode);	
			get_portfolio_markettable(schemecode,"portfolio_characteristics");
			// get_portfolio_markettable_avgmcap(schemecode);
			// get_portfolio_markettable_allcapavgs(schemecode);
			concentration_values(schemecode,"conval_2");
		}
		if(tblData_db!="" && total_db>15)
		{
			port_graph_debt("container-01",schemecode);	
			port_characteristics(schemecode,"portfolio_table");

		}
		// if(total_eq!=0)
		// {
		// 			// get_portfolio_markettable(schemecode,"portfolio_characteristics");
		// 			// get_portfolio_markettable_avgmcap(schemecode);
		// 			// get_portfolio_markettable_allcapavgs(schemecode);
		// 			// concentration_values(schemecode,"conval_2");
		// }
		// if(total_db>0)
		// {
		// 	// alert("debt");
		// 	// port_characteristics(schemecode,"portfolio_table");
		// }
		
	}
}

function sector_search()
{

	$.ajax({
	type:'GET',
	url: '/home/get_sector_search',
	datatype:'json',
	success:function(sectordata, textStatus, jqXHR) {
	var fundnames = new Array;

	for(var i =0;i <= sectordata.secsearch.length-1;i++)
	{

	var item1 = sectordata.secsearch[i];
	var sect_code = item1.rv_sect_code;
	fundnames.push(item1.rv_sect_name);
	//console.log(fundnames);

	}
	// console.log(fundnames);
	   $("#sector_names").autocomplete({
	source: fundnames
	});
	//$("#scheme_code").html(scheme_code);
	//$("#s_name").html(s_name);
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })

}
function get_sector()
{
	var obj = document.getElementById("sector_names").value;
	$.ajax({
	type:'post',
	url: '/home/get_sector_data',
	data :{sectorname:obj},
	datatype:'json',
	success:function(sectordata, textStatus, jqXHR) {
	// console.log(sectordata);
	var fundname = [];
	var tblData="";
	var th = "<thead><tr><th>Fund</th><th>Dec-15</th><th>Sep-15</th><th>Jun-15</th><th>Mar-15</th><th>desc-15</th></tr></thead>";


	for(var i =0;i <= sectordata.sec.length-1;i++)
	{
	var item1 = sectordata.sec[i];
	var schemecode = item1.schemecode;
	var s_name = item1.s_name;
	var hold_perc_q1 = item1.hold_perc_q1;
	var hold_perc_q2 = item1.hold_perc_q2;
	var hold_perc_q3 = item1.hold_perc_q3;
	var hold_perc_q4 = item1.hold_perc_q4;
	var hold_perc_q5 = item1.hold_perc_q5;

	fundname.push(item1.fund);
           if(i == 0)
               {
                tblData = th + "<tr><td>"+s_name+"</td><td>"+hold_perc_q1+"</td><td>"+hold_perc_q2+"</td><td>"+hold_perc_q3+"</td><td>"+hold_perc_q4+"</td><td>"+hold_perc_q5+"</td></tr>";
                      }
              else
              {
               tblData = tblData + "<tr><td>"+s_name+"</td><td>"+hold_perc_q1+"</td><td>"+hold_perc_q2+"</td><td>"+hold_perc_q3+"</td><td>"+hold_perc_q4+"</td><td>"+hold_perc_q5+"</td></tr>";
                }
	}
	$("#sector_table").html("");
             $("#sector_table").html(tblData);
             tbldata="";
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })
}
function stock_search()
{

	$.ajax({
	type:'GET',
	url: '/home/get_stock_search',
	datatype:'json',
	success:function(stockdata, textStatus, jqXHR) {
	var stocknames = new Array;

	for(var i =0;i <= stockdata.stocksearch.length-1;i++)
	{

	var item1 = stockdata.stocksearch[i];
	var scheme_code = item1.fincode;
	stocknames.push(item1.compname+"|"+item1.s_name);
	//console.log(stocknames);

	}
	console.log(stocknames);
	   $("#stock_names").autocomplete({
	source: stocknames
	});
	//$("#scheme_code").html(scheme_code);
	//$("#s_name").html(s_name);
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })

}


function stock_data()
{
	var obj = document.getElementById("stock_names").value;
	$.ajax({
	type:'post',
	url: '/home/get_stock_data',
	data :{stockname:obj},
	datatype:'json',
	success:function(stockdata, textStatus, jqXHR) {
	console.log(stockdata);
	var tblData="";
	var th = "<thead><tr><th>S Name</th><th>Hold Perc(%) </th><th>Date</th></tr></thead>";

	for(var i =0;i <= stockdata.stock.length-1;i++)
	{
	var item1 = stockdata.stock[i];
	var compname = item1.compname;
	var s_name = item1.s_name;
	var holdpercentage = item1.holdpercentage;
	var invdate = item1.invdate;
	var name = item1.name;


           if(i == 0)
               {
	$("#stock_head").html(compname+" | "+name);
                tblData = th + "<tr><td>"+s_name+"</td><td>"+holdpercentage+"</td><td>"+invdate+"</td></tr>";
                }
              else
              {
               tblData = tblData + "<tr><td>"+s_name+"</td><td>"+holdpercentage+"</td><td>"+invdate+"</td></tr>";
               }
	}
	    	$("#stock_table").html("");
             $("#stock_table").html(tblData);
             tbldata="";
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })
}

function port_avgcap()
{
	// console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
	// // $$.get(curr_ip+'functionalities/get_protfolio_avgmarketcap', function (sectordata) {
 // //       console.log(sectordata);
 // //    });
	// console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
	$.ajax({
	type:'GET',
	url: '/functionalities/get_protfolio_avgmarketcap',
	datatype:'json',
	success:function(sectordata, textStatus, jqXHR) {
	// console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
	// console.log(sectordata);
	// console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
	var tblData="";
	var th = "<thead><tr><th>Portfolio Market Cap</th><th>Fund</th><th>Category Average</th></tr></thead>";


	for(var i =0;i <= sectordata.market.length-1;i++)
	{
	var item1 = sectordata.market[i];
	var scheme_code = item1.schemecode;
	var portfolio_marketcap = item1.portfolio_marketcap;
	var fund = item1.fund;
	var category_avg = item1.category_avg;
            if(i == 0)
            {
                tblData = th + "<tr><td>"+portfolio_marketcap+"</td><td>"+fund+"</td><td>"+category_avg+"</td></tr>";
                      }
            else
            {
               tblData = tblData + "<tr><td>"+portfolio_marketcap+"</td><td>"+fund+"</td><td>"+category_avg+"</td></tr>";
            }
	}
	$("#portfolio_table").html("");
        $("#portfolio_table").html(tblData);

        tbldata="";
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })
}

/*#pe_pb script */

function concentration_values(schemecode,table_id)
{
	$.ajax({
	type:'GET',
	url: curr_ip+'functionalities/get_concentration_value',
	data :{schemecode:schemecode},
	datatype:'json',
	success:function(scheme_data,textStatus, jqXHR) {
	  console.log(scheme_data);
	  var tblData3=""; 
	var th = "<CAPTION class='portcap'><h4 class='d_inline'>Portfolio Summary</h4><h6 class='d_inline'>&nbsp;&nbsp;(as on "+univ_as_on_date+")</h6></CAPTION><thead class='breadcrumb_3'><tr><th colspan='2'>Concentration &amp; Valuation </th></tr></thead>";

	  for(var i =0;i <= scheme_data.concen_value.length-1;i++)
	  {
	var count =  scheme_data.concen_value[0];
	var pe =  scheme_data.concen_value[1];
	var pb =  scheme_data.concen_value[2];
	var top3 =  scheme_data.concen_value[3];
	var top5 =  scheme_data.concen_value[4];
	var top10 =  scheme_data.concen_value[5];
	if(i == 0)
	{
	
	tblData3 = th + "<tbody><tr><td>Number Of stocks</td><td>"+count+"</td></tr><tr><td>Top 10 stocks (%)</td><td>"+top10+"</td></tr><tr><td>Top 5 stocks (%)</td><td>"+top5+"</td></tr><tr><td>Top 3 stocks (%)</td><td>"+top3+"</td></tr><tr><td>Portfolio P/B Ratio</td><td>"+pb+"</td></tr><tr><td>Portfolio P/E Ratio</td><td>"+pe+"</td></tr></tbody>";
	}
	

	  }
	$("#"+table_id).html("");
	$("#"+table_id).html(tblData3);
	 $("#"+table_id).css("display","table");
	 $("#"+table_id).parent().css("display","block");

	   },
	  error:function(jqXHR, textStatus, errorThrown) {

	  }

	  })
}

function fundmanager()
{
	 console.log("2fund manager");

	$.ajax({
	type: 'GET',
	url: curr_ip+'/home/get_landing_fundmanager',
	datatype: 'json',
	success: function (fundman, textStatus, jqXHR) {
	
	

	 // console.log(Object.keys(fundman).length);
	var fundmanager="";
	$.each(fundman,function(key,value){
	$.each(value,function(key1,value1){

	if(value1.fund_manager!=null)
            {
            	 // console.log("======================="); 

	     // console.log(value1.fund_manager);

	     var id_name=value1.fund_manager.replace(/( )/g, "");
	/*alert(value1.fundmanager);*/
	         fundmanager +="<label><input type='checkbox' id='"+id_name+"'class='f_manager' value='"+value1.fund_manager+"'>&nbsp;"+value1.fund_manager+"</input></label>"
            }
            
	})
	})


        // console.log("-------===========--------=========----------==========");
        // console.log(fundmanager);


  
	$("#fundmanager").html("");
	$("#fundmanager").html(fundmanager);
	// check_manager();
       
        amcname();
	},
	error: function (jqXHR, textStatus, errorThrown) {
	// alert("AJAX Error:" + textStatus);
	}

	})
}

function amcname()
{
	 console.log("3---amc");

	$.ajax({
	type: 'GET',
	url: curr_ip+'/home/get_landing_amc',
	datatype: 'json',
	success: function (amcn, textStatus, jqXHR) {
	// console.log(amcn);

	// console.log(Object.keys(amcn).length);
	var amcname="";
	$.each(amcn,function(key,value){
	$.each(value,function(key1,value1){
	var id_name=value1.amc.replace(/(:| |-)/g, "");
	amcname +="<label><input type='checkbox' id='"+id_name+"'class='amc' value='"+value1.amc+"'>&nbsp;"+value1.amc+"</input></label>"
	})
	})

	$("#amcname").html("");
	$("#amcname").html(amcname);
	 // check_amc();
	// $('#amcname').multiselect();
             index_name();
	},
	error: function (jqXHR, textStatus, errorThrown) {
	// alert("AJAX Error:" + textStatus);
	}

	})
}



function index_name()
{ 
	 console.log("4---inde name");

	$.ajax({
	type: 'GET',
	url: curr_ip+'/home/get_landing_index',
	datatype: 'json',
	success: function (index, textStatus, jqXHR) {
	// console.log(index);

	// console.log(Object.keys(amcn).length);
	var indexname="";
	$.each(index,function(key,value){
	$.each(value,function(key1,value1){
	if(value1.index_name!=null)
	            {
	//alert(value1.indexname);
	var id_name=value1.index_name.replace(/(:| |-)/g, "");
	indexname +="<label><input type='checkbox' id='"+id_name+"'class='index' value='"+value1.index_name+"'>&nbsp;"+value1.index_name+"</input></label>"
	}
	})
	})

	$("#indexname").html("");
	$("#indexname").html(indexname);
	// check_index();
           schemedata_landing();
	},
	error: function (jqXHR, textStatus, errorThrown) {
	// alert("AJAX Error:" + textStatus);
	}

	})
}

// Portfolio table pagination
function portfolio_pagination()
{
	pageSize = 8;
console.log("No. of Pages -- "+$('.pagination .post').length/pageSize);
var totalPages = $('.pagination .post').length/pageSize;
showPage = function(page) {
    $(".post").hide();

    $(".post").each(function(n) {

        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
    });
}

showPage(1);

$("#pages .pages_1").click(function() {
    $("#pages .pages_1").removeClass("current");
    $(this).addClass("current");
    showPage(parseInt($(this).text()));
});

    $('#prev').click(prevPage);
    $('#next').click(nextPage);


var page = 1;

function prevPage() {
    //debugger;
    if (page === 1) {
	//alert("prev");
        //page = Math.floor($('.pagination .post').length/pageSize);
    } else {
        page--;
    }
    console.log(page);
    showPage(page);
}

function nextPage() {
    if (page == Math.floor($('.pagination .post').length/pageSize)) {
	//alert("last");
        //page = 1;
    } else {
        page++;
    }
	console.log(page);
    showPage(page);
}
}

function get_landing_returns()
{
	 console.log("5 ---Landing returns");

	// if(asset_selection.length > 0)
	// {

	// 	query_run();
	// 	stop_loading();
	// }
	// else
	// {
	var f=1;
	if(refresh==1)
	{
	f=0;
	}
	$.ajax({
	type:'GET',
	url: curr_ip+'home/get_landing_returns',
	datatype:'json',
	data: {flag:f},
	success:function(sectordata, textStatus, jqXHR) {
	//console.log(sectordata);
	fill_landing_returns(sectordata);
	stop_loading();
	},
	error:function(jqXHR, textStatus, errorThrown) {
	 // alert("AJAX Error:" + textStatus);
	}
 })
// }
}
function fill_landing_returns(sectordata)
{
	//console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
	console.log(sectordata);
	var annual_return;
	var month_return;
	var quarter_return;

	var tbl_1 = " <table id='annuallyTable' class='table table-bordered table-striped table-condensed sortable-theme-bootstrap' data-sortable>"
        var tbl_2 = " <table id='quarterlyTable' class='table table-bordered table-striped table-condensed sortable-theme-bootstrap' data-sortable>"
        var tbl_3 = " <table id='monthlyTable' class='table table-bordered table-striped table-condensed sortable-theme-bootstrap' data-sortable>"

	if (sectordata !="")
	{
	var ath = tbl_1+"<thead class='bg-color'><tr><th></th><th>Fund</th>";
	var ath_header = sectordata.ten_yrs;
	var ath_split = ath_header.split(",");
	for (var ai=0;ai<=ath_split.length-1;ai++)
	{
	ath = ath + "<th data-sortable-type='numeric'>"+ath_split[ai]+"</th>";
	}
	ath = ath + "</tr></thead>";

	var mth = tbl_3+"<thead class='bg-color'><tr><th></th><th>Fund</th>";
	var mth_header = sectordata.ten_months;
	var mth_split = mth_header.split(",");
	for (var mi=0;mi<=mth_split.length-1;mi++)
	{
	mth = mth + "<th data-sortable-type='numeric'>"+mth_split[mi]+"</th>";
	}
	mth = mth + "</tr></thead>";

	var qth = tbl_2+"<thead class='bg-color'><tr><th></th><th>Fund</th>";
	var qth_header = sectordata.ten_quarters;
	var qth_split = qth_header.split(",");
	for (var qi=0;qi<=qth_split.length-1;qi++)
	{
	qth = qth + "<th data-sortable-type='numeric'>"+qth_split[qi]+"</th>";
	}
	qth = qth + "</tr></thead>";


	for(var i =0;i <= sectordata.return_tab.length-1;i++)
	{
	var ry_data = sectordata.return_tab[i];
	var scheme_code = ry_data.schemecode;
	var s_name = ry_data.s_name;
	var fund_manager=ry_data.fund_manager;
	var classification = ry_data.classification;
	var return_year1 = ry_data.return_year1;
	var return_year2 = ry_data.return_year2;
	var return_year3 = ry_data.return_year3;
	var return_year4 = ry_data.return_year4;
	var return_year5 = ry_data.return_year5;
	var return_year6 = ry_data.return_year6;
	var return_year7 = ry_data.return_year7;
	var return_year8 = ry_data.return_year8;
	var return_year9 = ry_data.return_year9;
	var return_year10 = ry_data.return_year10;
	var return_month1 = ry_data.return_month1;
	var return_month2 = ry_data.return_month2;
	var return_month3 = ry_data.return_month3;
	var return_month4 = ry_data.return_month4;
	var return_month5 = ry_data.return_month5;
	var return_month6 = ry_data.return_month6;
	var return_month7 = ry_data.return_month7;
	var return_month8 = ry_data.return_month8;
	var return_month9 = ry_data.return_month9;
	var return_month10 = ry_data.return_month10;
	    var return_quarter1 = ry_data.return_quarter1;
	var return_quarter2 = ry_data.return_quarter2;
	var return_quarter3 = ry_data.return_quarter3;
	var return_quarter4 = ry_data.return_quarter4;
	var return_quarter5 = ry_data.return_quarter5;
	var return_quarter6 = ry_data.return_quarter6;
	var return_quarter7 = ry_data.return_quarter7;
	var return_quarter8 = ry_data.return_quarter8;
	var return_quarter9 = ry_data.return_quarter9;
	var return_quarter10 = ry_data.return_quarter10;


	            if(i == 0)
	            {
	     //              annual_return = ath + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' onclick='setvalue(this.id)'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_year10+"</td><td>"+return_year9+"</td><td>"+return_year8+"</td><td>"+return_year7+"</td><td>"+return_year6+"</td><td>"+return_year5+"</td><td>"+return_year4+"</td><td>"+return_year3+"</td><td>"+return_year2+"</td><td>"+return_year1+"</td> </tr>";

	 // quarter_return = qth + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' onclick='setvalue(this.id)'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_quarter10+"</td><td>"+return_quarter9+"</td><td>"+return_quarter8+"</td><td>"+return_quarter7+"</td><td>"+return_quarter6+"</td><td>"+return_quarter5+"</td><td>"+return_quarter4+"</td><td>"+return_quarter3+"</td><td>"+return_quarter2+"</td><td>"+return_quarter1+"</td> </tr>";

	 //  month_return = mth + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' onclick='setvalue(this.id)'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_month10+"</td><td>"+return_month9+"</td><td>"+return_month8+"</td><td>"+return_month7+"</td><td>"+return_month6+"</td><td>"+return_month5+"</td><td>"+return_month4+"</td><td>"+return_month3+"</td><td>"+return_month2+"</td><td>"+return_month1+"</td> </tr>";
	        annual_return = ath + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' target='_blank' >"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_year10+"</td><td>"+return_year9+"</td><td>"+return_year8+"</td><td>"+return_year7+"</td><td>"+return_year6+"</td><td>"+return_year5+"</td><td>"+return_year4+"</td><td>"+return_year3+"</td><td>"+return_year2+"</td><td>"+return_year1+"</td> </tr>";

	    quarter_return = qth + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' target='_blank'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_quarter10+"</td><td>"+return_quarter9+"</td><td>"+return_quarter8+"</td><td>"+return_quarter7+"</td><td>"+return_quarter6+"</td><td>"+return_quarter5+"</td><td>"+return_quarter4+"</td><td>"+return_quarter3+"</td><td>"+return_quarter2+"</td><td>"+return_quarter1+"</td> </tr>";

	    month_return = mth + "<tbody><tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' target='_blank' >"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_month10+"</td><td>"+return_month9+"</td><td>"+return_month8+"</td><td>"+return_month7+"</td><td>"+return_month6+"</td><td>"+return_month5+"</td><td>"+return_month4+"</td><td>"+return_month3+"</td><td>"+return_month2+"</td><td>"+return_month1+"</td> </tr>";	 
	            }
	            else
	            {
	      //          annual_return = annual_return + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' onclick='setvalue(this.id)'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_year10+"</td><td>"+return_year9+"</td><td>"+return_year8+"</td><td>"+return_year7+"</td><td>"+return_year6+"</td><td>"+return_year5+"</td><td>"+return_year4+"</td><td>"+return_year3+"</td><td>"+return_year2+"</td><td>"+return_year1+"</td> </tr>";

	   // quarter_return = quarter_return + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' onclick='setvalue(this.id)'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_quarter10+"</td><td>"+return_quarter9+"</td><td>"+return_quarter8+"</td><td>"+return_quarter7+"</td><td>"+return_quarter6+"</td><td>"+return_quarter5+"</td><td>"+return_quarter4+"</td><td>"+return_quarter3+"</td><td>"+return_quarter2+"</td><td>"+return_quarter1+"</td> </tr>";

	   // month_return = month_return + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' onclick='setvalue(this.id)'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_month10+"</td><td>"+return_month9+"</td><td>"+return_month8+"</td><td>"+return_month7+"</td><td>"+return_month6+"</td><td>"+return_month5+"</td><td>"+return_month4+"</td><td>"+return_month3+"</td><td>"+return_month2+"</td><td>"+return_month1+"</td> </tr>";

	       annual_return = annual_return + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' target='_blank'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_year10+"</td><td>"+return_year9+"</td><td>"+return_year8+"</td><td>"+return_year7+"</td><td>"+return_year6+"</td><td>"+return_year5+"</td><td>"+return_year4+"</td><td>"+return_year3+"</td><td>"+return_year2+"</td><td>"+return_year1+"</td> </tr>";

	   quarter_return = quarter_return + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' target='_blank'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_quarter10+"</td><td>"+return_quarter9+"</td><td>"+return_quarter8+"</td><td>"+return_quarter7+"</td><td>"+return_quarter6+"</td><td>"+return_quarter5+"</td><td>"+return_quarter4+"</td><td>"+return_quarter3+"</td><td>"+return_quarter2+"</td><td>"+return_quarter1+"</td> </tr>";

	   month_return = month_return + "<tr><td><input class='CompCheckBox' data-container='body' data-placement='bottom' data-toggle='popover' data-trigger='hover' data-html='true' id="+scheme_code+" type='checkbox' name='chkCompare' /></td><td><a id="+scheme_code+" href='/Mutual-Funds-India/"+scheme_code+"' target='_blank'>"+s_name+"</a><br><span class='fnd_manager'>"+fund_manager+"</span></td><td>"+return_month10+"</td><td>"+return_month9+"</td><td>"+return_month8+"</td><td>"+return_month7+"</td><td>"+return_month6+"</td><td>"+return_month5+"</td><td>"+return_month4+"</td><td>"+return_month3+"</td><td>"+return_month2+"</td><td>"+return_month1+"</td> </tr>";
	            }
	         }
	     }
	     else
	     {
	     	annual_return= "<thead class='bg-color'><tr><th>Fund</th>";
	     	quarter_return="<thead class='bg-color'><tr><th>Fund</th>";
	     	month_return="<thead class='bg-color'><tr><th>Fund</th>";

	     }
        
        annual_return+="</tbody></table>";
	quarter_return+="</tbody></table>";
	month_return+="</tbody></table>"; 


	$("#annuallyTable_div").html("");
	$("#annuallyTable").html("");
        $("#annuallyTable_div").html(annual_return);
        $("#quarterlyTable_div").html("");
        $("#quarterlyTable").html("");
        $("#quarterlyTable_div").html(quarter_return);
        $("#monthlyTable_div").html("");
        $("#monthlyTable").html("");
        $("#monthlyTable_div").html(month_return);
        // Sortable.init();

    $( ".CompCheckBox").hover(function(){

        $("[data-toggle=popover]").popover();
        
        $(this).attr('data-content', 'Select to compare');
    
    });

}
function get_growth_plan(schemecode)
{


	$.ajax({
	type:'GET',
	url: '/functionalities/get_growth_plan',
	data :{schemecode:schemecode},
	datatype:'json',
	success:function(growthdata, textStatus, jqXHR) {
	console.log(growthdata);
	var tblData="";
	var th = "<table class='table table-striped table-condensed table-bordered'><thead><tr><th>Plans </th><th>NAV</th></tr></thead>";

	 //alert(growthdata.growth_plan.length);
	for(var i =0;i <= growthdata.growth_plan.length-1;i++)
	{
	var item1 = growthdata.growth_plan[i];
	var plan = item1.plan;
	var navrs = item1.navrs;

            if(i == 0)
            {
                tblData = th + "<tr><td>"+plan+"</td><td>"+navrs+"</td></tr>";
                      }
            else
            {
               tblData = tblData + "<tr><td>"+plan+"</td><td>"+navrs+"</td></tr>";
            }
	}
	tblData = tblData + "</table>"
	$("#dialog-modal").html("");
        $("#dialog-modal").html(tblData);
        tbldata="";
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })
}

function getAllElementsWithAttribute(attribute)
{
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}


function showcolumns(obj)
{
	   // alert("comingg......");

       if(column_limit.indexOf(obj)==-1)
         {
            column_limit.push(obj);    
         }
         else
         {
         	column_limit.splice(column_limit.indexOf(obj),1);
         }

	 if(column_limit.length <= 8)
	 {
         $('#screener_table tr > *:nth-child('+obj+')').toggle(); 	
	 }
	 else
	 {
	 	 $('#'+obj).attr('checked', false); 
         column_limit.splice(column_limit.indexOf(obj),1)
	 	 swal("Max 8 items can be added");
	     
	 }
	     
    console.log(column_limit);
    // alert(obj);

     // // Codes that i have commented {}

	// var objval = obj;
	// var col = getAllElementsWithAttribute('data-name');
	// //alert(col.length);
 //   	if(document.getElementById(objval).checked == true)
	// {
	// 	alert("inside if");
	// 	for(i=0;i<col.length;i++)
	// 	{

	// 	col[i].style.display = 'block';
	// 	}
	// }
	// else
	// {
	// 	alert("inside else");
	// 	for(i=0;i<col.length;i++)
	// 	{
	// 	col[i].style.display = 'none';
	// 	}
	// }
}


function get_portfolio_markettable(schemecode,table_id)
{
	 var tblData2="";
	$.ajax({
	type:'GET',
	url: curr_ip+'functionalities/portfolio_markettable',
	data :{schemecode:schemecode},
	datatype:'json',
	success:function(port_cap, textStatus, jqXHR) {
	console.log(port_cap);
	var tbldata2="";
	var th = "<CAPTION class='portcap'><h4 class='d_inline'>Portfolio Market Cap</h4><h6 class='d_inline'>&nbsp;&nbsp;(as on "+univ_as_on_date+")</h6></CAPTION><thead class='breadcrumb_3'><tr><th></th><th>Fund</th><th>Category Avg.</th></tr></thead>";
	for(var i =0;i <= port_cap.cap_values.length-1;i++)
	{
	var item1 = port_cap.cap_values[i];
	var lcap = item1.lcap;
	var mcap = item1.mcap;
	var scap = item1.scap;
	var ppmcap = item1.ppmcap;
	ppmcap = commaSeparateNumber((parseFloat(ppmcap)).toFixed(2))
	// if(ppmcap >= 10000000) ppmcap = (ppmcap/10000000).toFixed(2) + ' Cr';
    //   else if(ppmcap >= 100000) ppmcap = (ppmcap/100000).toFixed(2) + ' Lac';
    //   else if(ppmcap >= 1000) ppmcap = (ppmcap/1000).toFixed(2) + ' K';
      if(i == 0)
	{
	
	tblData2 = th + "<tbody><tr class='active'><td>Avg. Mkt. Cap (cr.)</td><td>"+ppmcap+"</td><td id='avgmcap'></td></tr><tr><td>Large (%)</td><td>"+lcap+"</td><td id ='lcapavg'></td></tr><tr><td>Mid (%)</td><td>"+mcap+"</td><td id ='mcapavg'></td></tr><tr><td>Small (%)</td><td>"+scap+"</td><td id ='scapavg'></td></tr></tbody>";
	}
	}
	
	// $("#lcap").html(lcap);
	// $("#mcap").html(mcap);
	// $("#scap").html(scap);
	// $("#ppmcap").html(ppmcap);
	// $("#portfolio_table").html("");
	// $("#portfolio_table").html(tblData2);
	// $("#portfolio_table").css("display","table");
	$("#"+table_id).html("");
	$("#"+table_id).html(tblData2);
	$("#"+table_id).css("display","table");
	get_portfolio_markettable_avgmcap(schemecode);
		get_portfolio_markettable_allcapavgs(schemecode);
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })
}


function get_portfolio_markettable_avgmcap(schemecode)
{
	$.ajax({
	type:'GET',
	url: curr_ip+'functionalities/portfolio_markettable_avgmcap',
	data :{schemecode:schemecode},
	datatype:'json',
	success:function(data, textStatus, jqXHR) {
	console.log(data);
	for(var i =0;i <= data.avg_mcap.length-1;i++)
	{
	var item1 = data.avg_mcap[i];
	var avg_mcap = item1.avg_mcap;
	avg_mcap = commaSeparateNumber((parseFloat(avg_mcap)).toFixed(2))

	// if(avg_mcap >= 10000000) avg_mcap = (avg_mcap/10000000).toFixed(2) + ' Cr';
   //    else if(avg_mcap >= 100000) avg_mcap = (avg_mcap/100000).toFixed(2) + ' Lac';
   //    else if(avg_mcap >= 1000) avg_mcap = (avg_mcap/1000).toFixed(2) + ' K';
      $("#avgmcap").html(avg_mcap);
	}
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })
}

function get_portfolio_markettable_allcapavgs(schemecode)
{
	$.ajax({
	type:'GET',
	url: curr_ip+'functionalities/portfolio_markettable_allcapavgs',
	data :{schemecode:schemecode},
	datatype:'json',
	success:function(avg_allcap, textStatus, jqXHR) {
	console.log(avg_allcap);
	for(var i =0;i <= avg_allcap.avg_allcap.length-1;i++)
	{
	var item1 = avg_allcap.avg_allcap[i];
	var avg_lcap = item1.lcap_avg;
	var avg_mcap = item1.mcap_avg;
	var avg_scap = item1.scap_avg;

	$("#lcapavg").html(avg_lcap);
	$("#mcapavg").html(avg_mcap);
	$("#scapavg").html(avg_scap);
	}
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })
}

function port_characteristics(schemecode,table_id)
{
	$.ajax({
	type:'GET',
	url: curr_ip+'functionalities/portfolio_characteristics',
	data :{schemecode:schemecode},
	datatype:'json',
	success:function(data, textStatus, jqXHR) {
	

	 console.log("----portfolio_characteristics----")
	 console.log(data);
          
          var as_on_date = moment(data.as_on_date).format('DD-MMM-YY'); 

	  var tblData4="";
	  var th = "<CAPTION class='portcap'><h4 class='d_inline'>Debt Profile</h4><h6>&nbsp;&nbsp;(as on "+as_on_date+")</h6></CAPTION><thead class='breadcrumb_3'><tr><th></th><th>Fund</th><th>1 Year High</th><th>1 Year Low</th><th>Cat. Avg.</th></tr></thead>";
	
	 var max_avg_maturity;
	 var min_avg_maturity;	
	 var max_modified_duration;
	 var min_modified_duration;

	 var max_ytm;
	 var min_ytm;
	 var modified_dur;
	 var modified_dur_avg;
	 var avg_mat;
	 var avg_avg_mat;
	 var ytm;
	 var ytm_avg;

                

                if(data.max_avg_maturity=='' || data.max_avg_maturity==null  )
                {
                   
                    // $("#max_avg_maturity").html("-");
                    max_avg_maturity="-"
                }
                else
                {
                	max_avg_maturity= data.max_avg_maturity;
                    max_avg_maturity = max_avg_maturity.toFixed(2);

                }

                // else
                // {
                // 	$("#max_avg_maturity").html(data.max_avg_maturity);
                // }
             	
             	if(data.min_avg_maturity=='' || data.min_avg_maturity==null )
             	{
                    
                    // $("#min_avg_maturity").html("-");
                    min_avg_maturity="-"
             	}
             	else
             	{
             	min_avg_maturity= data.min_avg_maturity;
             	min_avg_maturity=min_avg_maturity.toFixed(2);
             	}

             	// else
             	// {
             	// 	$("#min_avg_maturity").html(data.min_avg_maturity);
             	// }
             	
                if(data.max_modified_duration=='' || data.max_modified_duration==null)
                {
                   max_modified_duration="-"
                    // $("#max_modified_duration").html("-");
                }
                else
                {
                	 max_modified_duration= data.max_modified_duration;
                	 max_modified_duration=max_modified_duration.toFixed(2);
                }

                // else
                // {
                // 	$("#max_modified_duration").html(data.max_modified_duration);
                // }

                 if(data.min_modified_duration=='' || data.min_modified_duration==null )
                {
                	min_modified_duration="-";
                    
                    // $("#min_modified_duration").html("-");
                }
                else
                {
                	min_modified_duration=data.min_modified_duration;
                	min_modified_duration=min_modified_duration.toFixed(2);
                }

                // else
                // {
                // 	$("#min_modified_duration").html(data.min_modified_duration);
                // }
             	

             	if(data.max_ytm=='' || data.max_ytm==null)
             	{
                     max_ytm="-";

                     // $("#max_ytm").html("-");
             	}
             	else
             	{
             	 max_ytm= data.max_ytm;
             	 max_ytm=max_ytm.toFixed(2);
             	}
             	
             	
             	if(data.min_ytm=='' || data.min_ytm==null)
             	{
                     
                     // $("#max_ytm").html("-");
                     min_ytm="-";
             	}
             	else
             	{
             	  min_ytm=data.min_ytm;
             	  min_ytm=min_ytm.toFixed(2);

             	}


             	if(data.modified_dur=='' || data.modified_dur==null)
             	{
                    modified_dur="-";    
             	}
             	else
             	{
             	modified_dur= data.modified_dur;
             	modified_dur=modified_dur.toFixed(2);
             	}


             	if(data.modified_dur_avg=='' || data.modified_dur_avg==null )
             	{
                     
                     modified_dur_avg="-";
             	}
             	else
             	{
             	   modified_dur_avg= data.modified_dur_avg
             	   modified_dur_avg=modified_dur_avg.toFixed(2);	
             	}



             	if(data.avg_mat=='' || data.avg_mat==null )
             	{
                     
                     avg_mat="-"
             	}
             	else
             	{
             	avg_mat= data.avg_mat;
             	avg_mat= avg_mat.toFixed(2);

             	}


             	if(data.avg_avg_mat=='' || data.avg_avg_mat==null)
             	{
                     
                     avg_avg_mat="-";
                     // $("#max_ytm").html("-");
             	}
             	else
             	{
             	avg_avg_mat= data.avg_avg_mat;
             	avg_avg_mat=avg_avg_mat.toFixed(2);
             	}


             	if(data.ytm=='' || data.ytm==null )
             	{
                     ytm="-";
             	}
             	else
             	{
             	ytm= data.ytm;
             	ytm=ytm.toFixed(2);
             	}


             	if(data.ytm_avg=='' || data.ytm_avg==null)
             	{
                     
                    ytm_avg="-";
             	}
             	else
             	{
             	ytm_avg= data.ytm_avg;
             	ytm_avg=ytm_avg.toFixed(2);
             	}
             	
             	
             	tblData4 = th + "<tbody><tr><td>Number of Securities</td><td>"+data.security_count+"</td><td>-</td><td>-</td><td>-</td></tr><tr><td>Modified Duration (yrs)</td><td>"+modified_dur+"</td><td>"+max_modified_duration+"</td><td>"+min_modified_duration+"</td><td>"+modified_dur_avg+"</td></tr><tr><td>Average Maturity (yrs)</td><td>"+avg_mat+"</td><td>"+max_avg_maturity+"</td><td>"+min_avg_maturity+"</td><td>"+avg_avg_mat+"</td></tr><tr><td>Yield to Maturity (%)</td><td>"+ytm+"</td><td>"+max_ytm+"</td><td>"+min_ytm+"</td><td>"+ytm_avg+"</td></tr></tbody>"	 // alert(data.avg_mat);
     
             	// $('#portfolio_characteristics').html("");
             	 // $('#portfolio_characteristics').html(tblData4);
             	 console.log(table_id);
             	 console.log(tblData4);

             	$('#'+table_id).html("");
             	$('#'+table_id).html(tblData4);

         // $("#avg_mat").html(data.avg_mat);
         
         // $("#modified_dur").html(data.modified_dur);
         
         // $("#ytm").html(data.ytm); 

         
           
         // $("#avg_mat_avg").html(data.avg_avg_mat);
         
         // $("#modified_dur_avg").html(data.modified_dur_avg);

         // $("#ytm_avg").html(data.ytm_avg); 
 
         
        
         // $("#no_of_secu").html(data.security_count);                 
 
	// for(var i =0;i <= avg_allcap.avg_allcap.length-1;i++)
	// {
	// 	var item1 = avg_allcap.avg_allcap[i];
	// 	var avg_lcap = item1.lcap_avg;
	// 	var avg_mcap = item1.mcap_avg;
	// 	var avg_scap = item1.scap_avg;

	// 	$("#lcapavg").html(avg_lcap);
	// 	$("#mcapavg").html(avg_mcap);
	// 	$("#scapavg").html(avg_scap);
	// }
	},
	error:function(jqXHR, textStatus, errorThrown) {
	  // alert("AJAX Error:" + textStatus);
	}
 })
}




// function export_table_to_csv(filename)
// {
	
// 	var csv = [];
// 	var id=["holding_table","holding_table-1","holding_table-2","holding_table-3"]
// 	for(var k=0;k<=3;k++)
// 	{
// 	var rows = document.querySelectorAll("table#"+id[k]+" thead tr");
// 	// console.log(rows);
// 	if (rows.length>0)
// 	    {
// 	    for (var i = 0; i < rows.length; i++) {
// 	var row = [], cols = rows[i].querySelectorAll("th");
	
// 	        for (var j = 0; j < cols.length; j++) 
// 	            row.push(cols[j].innerText);
	        
// 	csv.push(row.join(","));	
// 	}
// 	var rows = document.querySelectorAll("table#"+id[k]+" tbody tr");
// 	// console.log(rows);
	
// 	    for (var i = 0; i < rows.length; i++) {
// 	var row = [], cols = rows[i].querySelectorAll("td");
	
// 	        for (var j = 0; j < cols.length; j++) 
// 	            row.push(cols[j].innerText);
	        
// 	csv.push(row.join(","));	
// 	}
// 	}
// 	}

//     // Download CSV
//     download_csv(csv.join("\n"), filename);



// }

function export_table_to_csv(filename)
{
  // alert("b");
  var csv = [];
  var id=["holding_table","holding_table-1","holding_table-2","holding_table-3"]
  for(var k=0;k<=3;k++)
  {
    var rows = document.querySelectorAll("table#"+id[k]+" thead tr");
     console.log("rows");
    console.log(rows);
    if (rows.length>0)
      {
          for (var i = 0; i < rows.length; i++) {
          var row = [], cols = rows[i].querySelectorAll("th");
          
              for (var j = 0; j < cols.length; j++) 
              {
                console.log("columns  :");
              console.log(cols[j].innerHTML);
              // debugger;
                  // row.push(cols[j].innerText);
                  row.push(cols[j].innerHTML);
                  if(cols.length==3)
                  // if(id[k]=="holding_table" )
                  {
                    // alert("aa");
                    if (cols[j].innerHTML=="Sector")
                    {
	                    row.push("");
	                    // row.push("");
	                }
                    // csv.push(row.join(","));
                  } 
                  if(id[k]=="holding_table-2" || id[k]=="holding_table-3")
                  {
                    // alert("aa");
                    row.push("");
                    row.push("");
                    // csv.push(row.join(","));
                  }   
              }
          csv.push(row.join(",")); 

        }
        var rows = document.querySelectorAll("table#"+id[k]+" tbody tr");
        // console.log(rows);
        
          for (var i = 0; i < rows.length; i++) {
          var row = [], cols = rows[i].querySelectorAll("td");
          
              for (var j = 0; j < cols.length; j++)
              { 
                  row.push(cols[j].textContent);
                   if(cols.length==3)
                  // if(id[k]=="holding_table" )
                  {
                    // alert("aa");
                    if (j==1)
                    {
	                    row.push("");
	                    // row.push("");
	                }
                    // csv.push(row.join(","));
                  } 
                  if(id[k]=="holding_table-2" || id[k]=="holding_table-3")
                  {
                    // alert("aa");
                    row.push("");
                    row.push("");
                    // csv.push(row.join(","));
                  }  
                }
              
          csv.push(row.join(","));    
        }
    }
  }

    // Download CSV
    download_csv(csv.join("\n"), filename);



}

function get_status(schemecode)
{
	$.ajax({
	type: 'GET',
	url: curr_ip+'/home/get_status',
	data :{schemecode:schemecode},
	datatype: 'json',
	success: function (data, textStatus, jqXHR) {
	console.log(data);
	if(data.status[0].ispurchaseavailable=="Y")
	{
	var st="Open for Subscription";
	$("#status").html(st);
	}
	else if(data.status[0].ispurchaseavailable=="N")
	{
	var st="Closed for Subscription";
	$("#status").html(st);
	}
	else
	{
	$("#status").html(data.status[0].ispurchaseavailable);
	}

	if(data.status[0].ispurchaseavailable=="Y" && data.status[0].nsc_amc_code !="NA" && data.status[0].nsc_product_code !="NA" && data.purchase_status.length!=0)
	{
	$("#invest_overview").attr("disabled", false);
	}
	else
	{
	$('#invest_overview').prop('disabled',true).addClass('disabled');
	}
	 if ($("#invest_overview").is(":disabled"))
       {
        $( ".invest1").hover(function(){
            $('.invest1').attr('data-content', "Investment not available in this fund");
            $(".invest1").popover('toggle');

         });
      }
	}
});
return "True";
}

function get_objectives(schemecode)
{
	$.ajax({
	type: 'GET',
	url: '/home/get_objectives',
	data :{schemecode:schemecode},
	datatype: 'json',
	success: function (data, textStatus, jqXHR) {
	console.log(data);
	
	$("#objectives").html(data.objectives[0].objective);
	
	}
});

}

 function commaSeparateNumber(val)
    {
       x=val.toString();
	var afterPoint = '';
	if(x.indexOf('.') > 0)
	   afterPoint = x.substring(x.indexOf('.'),x.length);
	x = Math.floor(x);
	x=x.toString();
	var lastThree = x.substring(x.length-3);
	var otherNumbers = x.substring(0,x.length-3);
	if(otherNumbers != '')
	    lastThree = ',' + lastThree;
	var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;	
	return res;
    }

// function get_exitload_remarks()
// {
// 	$.ajax({
// 	type: 'GET',
// 	url: '/home/get_exitload_remarks',
// 	datatype: 'json',
// 	success: function (data, textStatus, jqXHR) {
// 	console.log(data);
	
// 	$("#exitload-modal").html(data.remarks[0].exitload_remarks);
	
// 	}
// });
// }

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
   
}
