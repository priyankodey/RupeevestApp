var Last_time_Stamp="";
var scheme_name_GBL="";
var schemecode_GBL="";
var container_id_GBL="";
var amount_GBL="";
var frequency_GBL="";
var start_date_GBL="";
var end_date_GBL="";
var data_roll_ret_GBL="";
var schemename_GBL=[];
var startDate1="";
var rolling_table_GBL="";


$(document).ready(function(){
  // $(window).load(function(){
   // alert("windowload chart.js");
    schemecode=$('#scheme_code').val();
  // asect_alloc();
  // port_graph();
  // return_graph("Annual Returns");
// });
  //asect_alloc();
  //port_graph();
  //return_bar();
  //return_graph("Annual Returns");
  $(".annualReturns").addClass("active");

  $(".annualReturns").click(function(){
  $(this).addClass("active");
  $(".quarterlyReturns").removeClass("active");
  $(".monthlyReturns").removeClass("active");
  var annualReturns = $(this).text();
  return_graph(annualReturns,schemecode);
  });

  $(".quarterlyReturns").click(function(){
  $(this).addClass("active");
  $(".annualReturns").removeClass("active");
  $(".monthlyReturns").removeClass("active");
  var quarterlyReturns = $(this).text();
  return_graph(quarterlyReturns,schemecode);
  });

  $(".monthlyReturns").click(function(){
  $(this).addClass("active");
  $(".annualReturns").removeClass("active");
  $(".quarterlyReturns").removeClass("active");
  var monthlyReturns = $(this).text();
  return_graph(monthlyReturns,schemecode);
  });

//$(function () {


 });


function monthly_calculate(count_check)
{
  $("#rolling_return_table").empty();
  var k=0;
  if(rolling_table_GBL.status=="OK" && rolling_table_GBL.sql1!=null)
  {
  for(var i=rolling_table_GBL.sql1.length-1;i>0;i--)
  {
    var date=moment(rolling_table_GBL.sql1[i].date).format('DD-MMM-YYYY')
    // var table_monthly="<table class='table table-bordered table-condensed post' > <thead><tr><th>Nav Date</th><th class='colspan_edit' colspan='"+count_check+"'>"+date+"</th></tr><tr><th>Funds</th><th style='display:none;' class='m_1'>1 Month</th><th style='display:none;' class='m_3'>3 Months</th><th style='display:none;' class='m_6'>6 Months</th><th class='y_1'>1 Year</th><th class='y_3'>3 Years</th><th class='y_5'>5 Years</th><th class='y_7'>7 Years</th><th style='display:none;' class='y_10'>10 Years</th></tr></thead><tbody>"
    var table_monthly="<table class='table table-bordered table-condensed post Monthly' id='monthly_"+k+"'> <thead><tr><th>Return as on "+date+"</th><th style='display:none;' class='m_1'>1 Month (%)</th><th style='display:none;' class='m_3'>3 Months (%)</th><th style='display:none;' class='m_6'>6 Months (%)</th><th class='y_1'>1 Year (%)</th><th class='y_3'>3 Years (%)</th><th class='y_5'>5 Years (%)</th><th class='y_7'>7 Years (%)</th><th style='display:none;' class='y_10'>10 Years (%)</th></tr></thead><tbody>"
    if(rolling_table_GBL.sql1!=null)  
      var sql1=rolling_table_GBL.sql1[i];
    if(rolling_table_GBL.sql2!=null)
      var sql2=rolling_table_GBL.sql2[i];
    if(rolling_table_GBL.sql3!=null)
      var sql3=rolling_table_GBL.sql3[i];
    if(rolling_table_GBL.sql4!=null)
      var sql4=rolling_table_GBL.sql4[i];
    if(rolling_table_GBL.sql5!=null)
      var sql5=rolling_table_GBL.sql5[i];

    for(var j=0;j<rolling_table_GBL.scheme_info.length;j++)
    {
     if(j==0)
     {
      var return_1_months = "-";
        if(sql1.return_1_months!=null)
        {
          return_1_months = parseFloat(sql1.return_1_months).toFixed(2);;
        }
      var return_3_months = "-";
        if(sql1.return_3_months!=null)
        {
          return_3_months = parseFloat(sql1.return_3_months).toFixed(2);;
        }
      var return_6_months = "-";
        if(sql1.return_6_months!=null)
        {
          return_6_months = parseFloat(sql1.return_6_months).toFixed(2);;
        }
      var return_1_years = "-";
        if(sql1.return_1_years!=null)
        {
          return_1_years = parseFloat(sql1.return_1_years).toFixed(2);;
        }
        var return_3_years = "-";
        if(sql1.return_3_years!=null)
        {
          return_3_years = parseFloat(sql1.return_3_years).toFixed(2);;
        }
        var return_5_years = "-";
        if(sql1.return_5_years!=null)
        {
          return_5_years = parseFloat(sql1.return_5_years).toFixed(2);;
        }
        var return_7_years = "-";
        if(sql1.return_7_years!=null)
        {
          return_7_years = parseFloat(sql1.return_7_years).toFixed(2);;
        }
        var return_10_years = "-";
        if(sql1.return_10_years!=null)
        {
          return_10_years = parseFloat(sql1.return_10_years).toFixed(2);;
        }
        table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
     }

      
    else if(j==1)
      {
        var return_1_months = "-";
        if(sql2.return_1_months!=null)
        {
          return_1_months = parseFloat(sql2.return_1_months).toFixed(2);;
        }
      var return_3_months = "-";
        if(sql2.return_3_months!=null)
        {
          return_3_months = parseFloat(sql2.return_3_months).toFixed(2);;
        }
      var return_6_months = "-";
        if(sql2.return_6_months!=null)
        {
          return_6_months = parseFloat(sql2.return_6_months).toFixed(2);;
        }
      var return_1_years = "-";
        if(sql2.return_1_years!=null)
        {
          return_1_years = parseFloat(sql2.return_1_years).toFixed(2);;
        }
        var return_3_years = "-";
        if(sql2.return_3_years!=null)
        {
          return_3_years = parseFloat(sql2.return_3_years).toFixed(2);;
        }
        var return_5_years = "-";
        if(sql2.return_5_years!=null)
        {
          return_5_years = parseFloat(sql2.return_5_years).toFixed(2);;
        }
        var return_7_years = "-";
        if(sql2.return_7_years!=null)
        {
          return_7_years = parseFloat(sql2.return_7_years).toFixed(2);;
        }
        var return_10_years = "-";
        if(sql2.return_10_years!=null)
        {
          return_10_years = parseFloat(sql2.return_10_years).toFixed(2);;
        }
        table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
     
      }

    else if(j==2)
      {
        var return_1_months = "-";
        if(sql3.return_1_months!=null)
        {
          return_1_months = parseFloat(sql3.return_1_months).toFixed(2);;
        }
      var return_3_months = "-";
        if(sql3.return_3_months!=null)
        {
          return_3_months = parseFloat(sql3.return_3_months).toFixed(2);;
        }
      var return_6_months = "-";
        if(sql3.return_6_months!=null)
        {
          return_6_months = parseFloat(sql3.return_6_months).toFixed(2);;
        }
      var return_1_years = "-";
        if(sql3.return_1_years!=null)
        {
          return_1_years = parseFloat(sql3.return_1_years).toFixed(2);;
        }
        var return_3_years = "-";
        if(sql3.return_3_years!=null)
        {
          return_3_years = parseFloat(sql3.return_3_years).toFixed(2);;
        }
        var return_5_years = "-";
        if(sql3.return_5_years!=null)
        {
          return_5_years = parseFloat(sql3.return_5_years).toFixed(2);;
        }
        var return_7_years = "-";
        if(sql3.return_7_years!=null)
        {
          return_7_years = parseFloat(sql3.return_7_years).toFixed(2);;
        }
        var return_10_years = "-";
        if(sql3.return_10_years!=null)
        {
          return_10_years = parseFloat(sql3.return_10_years).toFixed(2);;
        }
        table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
     
      }
    else if(j==3)
      {
        var return_1_months = "-";
        if(sql4.return_1_months!=null)
        {
          return_1_months = parseFloat(sql4.return_1_months).toFixed(2);;
        }
      var return_3_months = "-";
        if(sql4.return_3_months!=null)
        {
          return_3_months = parseFloat(sql4.return_3_months).toFixed(2);;
        }
      var return_6_months = "-";
        if(sql4.return_6_months!=null)
        {
          return_6_months = parseFloat(sql4.return_6_months).toFixed(2);;
        }
      var return_1_years = "-";
        if(sql4.return_1_years!=null)
        {
          return_1_years = parseFloat(sql4.return_1_years).toFixed(2);;
        }
        var return_3_years = "-";
        if(sql4.return_3_years!=null)
        {
          return_3_years = parseFloat(sql4.return_3_years).toFixed(2);;
        }
        var return_5_years = "-";
        if(sql4.return_5_years!=null)
        {
          return_5_years = parseFloat(sql4.return_5_years).toFixed(2);;
        }
        var return_7_years = "-";
        if(sql4.return_7_years!=null)
        {
          return_7_years = parseFloat(sql4.return_7_years).toFixed(2);;
        }
        var return_10_years = "-";
        if(sql4.return_10_years!=null)
        {
          return_10_years = parseFloat(sql4.return_10_years).toFixed(2);;
        }
        table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
     
      }
    else if(j==4)
      {
        var return_1_months = "-";
        if(sql5.return_1_months!=null)
        {
          return_1_months = parseFloat(sql5.return_1_months).toFixed(2);;
        }
      var return_3_months = "-";
        if(sql5.return_3_months!=null)
        {
          return_3_months = parseFloat(sql5.return_3_months).toFixed(2);;
        }
      var return_6_months = "-";
        if(sql5.return_6_months!=null)
        {
          return_6_months = parseFloat(sql5.return_6_months).toFixed(2);;
        }
      var return_1_years = "-";
        if(sql5.return_1_years!=null)
        {
          return_1_years = parseFloat(sql5.return_1_years).toFixed(2);;
        }
        var return_3_years = "-";
        if(sql5.return_3_years!=null)
        {
          return_3_years = parseFloat(sql5.return_3_years).toFixed(2);;
        }
        var return_5_years = "-";
        if(sql5.return_5_years!=null)
        {
          return_5_years = parseFloat(sql5.return_5_years).toFixed(2);;
        }
        var return_7_years = "-";
        if(sql5.return_7_years!=null)
        {
          return_7_years = parseFloat(sql5.return_7_years).toFixed(2);;
        }
        var return_10_years = "-";
        if(sql5.return_10_years!=null)
        {
          return_10_years = parseFloat(sql5.return_10_years).toFixed(2);;
        }
        table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
     
      }
    }
    table_monthly=table_monthly+"</tbody></table>"
    $("#rolling_return_table").append(table_monthly);
    k++;
  }
  $("#rolling_return_table").append("<center><div id='pages' class='portfolioPagination'><span id='prev' class='previous'><span class='glyphicon glyphicon-triangle-left'></span>Previous</span>|<span id='next' class='next'>Next<span class='glyphicon glyphicon-triangle-right'></span></span></div></center>" )
  portfolio_pagination();
}
}
function portfolio_pagination()
{
  pageSize =10;
console.log("kkkNo. of Pages -- "+$('.post').length/pageSize);
// var totalPages = $('.post').length/pageSize
// swal(totalPages);
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
    //swal("prev");
        //page = Math.floor($('.pagination .post').length/pageSize);
    } else {
        page--;
    }
    console.log(page);
    showPage(page);
}

function nextPage() {
    if (page == Math.ceil($('.post').length/pageSize)) {
    //swal("last");
        //page = 1;
    } else {
        page++;
    }
  console.log(page);
    showPage(page);
}
}

function quarterly_calculate(count_check)
{
  $("#rolling_return_table").empty();
  var k=0
  if(rolling_table_GBL.status=="OK" && rolling_table_GBL.sql1!=null)
  {
  for(var i=rolling_table_GBL.sql1.length-1;i>0;i--)
  {
    var d=new Date(rolling_table_GBL.sql1[i].date)
    var quarter_d=d.getMonth()+1;
    if(quarter_d==3 || quarter_d==6 || quarter_d==9 || quarter_d==12 )
    {
      var date=moment(rolling_table_GBL.sql1[i].date).format('DD-MMM-YYYY')
      // var table_monthly="<table class='table table-bordered table-condensed post'> <thead><tr><th>Nav Date</th><th class='colspan_edit' colspan='"+count_check+"'>"+date+"</th></tr><tr><th>Funds</th><th style='display:none;' class='m_1'>1 Month</th><th style='display:none;' class='m_3'>3 Months</th><th style='display:none;' class='m_6'>6 Months</th><th class='y_1'>1 Year</th><th class='y_3'>3 Years</th><th class='y_5'>5 Years</th ><th class='y_7'>7 Years</th><th style='display:none;' class='y_10'>10 Years</th></tr></thead><tbody>"
     var table_monthly="<table class='table table-bordered table-condensed post Quarterly' id='quarterly_"+k+"' > <thead><tr><th>Return as on "+date+"</th><th style='display:none;' class='m_1'>1 Month (%)</th><th style='display:none;' class='m_3'>3 Months (%)</th><th style='display:none;' class='m_6'>6 Months (%)</th><th class='y_1'>1 Year (%)</th><th class='y_3'>3 Years (%)</th><th class='y_5'>5 Years (%)</th><th class='y_7'>7 Years (%)</th><th style='display:none;' class='y_10'>10 Years (%)</th></tr></thead><tbody>"
      if(rolling_table_GBL.sql1!=null)  
        var sql1=rolling_table_GBL.sql1[i];
      if(rolling_table_GBL.sql2!=null)
        var sql2=rolling_table_GBL.sql2[i];
      if(rolling_table_GBL.sql3!=null)
        var sql3=rolling_table_GBL.sql3[i];
      if(rolling_table_GBL.sql4!=null)
        var sql4=rolling_table_GBL.sql4[i];
      if(rolling_table_GBL.sql5!=null)
        var sql5=rolling_table_GBL.sql5[i];

      for(var j=0;j<rolling_table_GBL.scheme_info.length;j++)
      {
       if(j==0)
       {
        var return_1_months = "-";
          if(sql1.return_1_months!=null)
          {
            return_1_months = parseFloat(sql1.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql1.return_3_months!=null)
          {
            return_3_months = parseFloat(sql1.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql1.return_6_months!=null)
          {
            return_6_months = parseFloat(sql1.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql1.return_1_years!=null)
          {
            return_1_years = parseFloat(sql1.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql1.return_3_years!=null)
          {
            return_3_years = parseFloat(sql1.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql1.return_5_years!=null)
          {
            return_5_years = parseFloat(sql1.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql1.return_7_years!=null)
          {
            return_7_years = parseFloat(sql1.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql1.return_10_years!=null)
          {
            return_10_years = parseFloat(sql1.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       }
        
      else if(j==1)
        {
          var return_1_months = "-";
          if(sql2.return_1_months!=null)
          {
            return_1_months = parseFloat(sql2.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql2.return_3_months!=null)
          {
            return_3_months = parseFloat(sql2.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql2.return_6_months!=null)
          {
            return_6_months = parseFloat(sql2.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql2.return_1_years!=null)
          {
            return_1_years = parseFloat(sql2.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql2.return_3_years!=null)
          {
            return_3_years = parseFloat(sql2.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql2.return_5_years!=null)
          {
            return_5_years = parseFloat(sql2.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql2.return_7_years!=null)
          {
            return_7_years = parseFloat(sql2.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql2.return_10_years!=null)
          {
            return_10_years = parseFloat(sql2.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }

      else if(j==2)
        {
          var return_1_months = "-";
          if(sql3.return_1_months!=null)
          {
            return_1_months = parseFloat(sql3.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql3.return_3_months!=null)
          {
            return_3_months = parseFloat(sql3.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql3.return_6_months!=null)
          {
            return_6_months = parseFloat(sql3.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql3.return_1_years!=null)
          {
            return_1_years = parseFloat(sql3.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql3.return_3_years!=null)
          {
            return_3_years = parseFloat(sql3.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql3.return_5_years!=null)
          {
            return_5_years = parseFloat(sql3.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql3.return_7_years!=null)
          {
            return_7_years = parseFloat(sql3.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql3.return_10_years!=null)
          {
            return_10_years = parseFloat(sql3.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }
      else if(j==3)
        {
          var return_1_months = "-";
          if(sql4.return_1_months!=null)
          {
            return_1_months = parseFloat(sql4.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql4.return_3_months!=null)
          {
            return_3_months = parseFloat(sql4.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql4.return_6_months!=null)
          {
            return_6_months = parseFloat(sql4.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql4.return_1_years!=null)
          {
            return_1_years = parseFloat(sql4.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql4.return_3_years!=null)
          {
            return_3_years = parseFloat(sql4.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql4.return_5_years!=null)
          {
            return_5_years = parseFloat(sql4.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql4.return_7_years!=null)
          {
            return_7_years = parseFloat(sql4.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql4.return_10_years!=null)
          {
            return_10_years = parseFloat(sql4.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }
      else if(j==4)
        {
          var return_1_months = "-";
          if(sql5.return_1_months!=null)
          {
            return_1_months = parseFloat(sql5.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql5.return_3_months!=null)
          {
            return_3_months = parseFloat(sql5.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql5.return_6_months!=null)
          {
            return_6_months = parseFloat(sql5.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql5.return_1_years!=null)
          {
            return_1_years = parseFloat(sql5.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql5.return_3_years!=null)
          {
            return_3_years = parseFloat(sql5.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql5.return_5_years!=null)
          {
            return_5_years = parseFloat(sql5.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql5.return_7_years!=null)
          {
            return_7_years = parseFloat(sql5.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql5.return_10_years!=null)
          {
            return_10_years = parseFloat(sql5.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }
      }
      table_monthly=table_monthly+"</tbody></table>"
      $("#rolling_return_table").append(table_monthly);
      k++;
    }
  }

  $("#rolling_return_table").append("<center><div id='pages' class='portfolioPagination'><span id='prev' class='previous'><span class='glyphicon glyphicon-triangle-left'></span>Previous</span>|<span id='next' class='next'>Next<span class='glyphicon glyphicon-triangle-right'></span></span></div></center>" )
  portfolio_pagination();
}
}

function halfyearly_calculate(count_check)
{
  $("#rolling_return_table").empty();
  var k=0;
  if(rolling_table_GBL.status=="OK" && rolling_table_GBL.sql1!=null)
  {
  for(var i=rolling_table_GBL.sql1.length-1;i>0;i--)
  {
    var d=new Date(rolling_table_GBL.sql1[i].date)
    var quarter_d=d.getMonth()+1;
    if(quarter_d==6 || quarter_d==12 )
    {
      var date=moment(rolling_table_GBL.sql1[i].date).format('DD-MMM-YYYY')
      // var table_monthly="<table class='table table-bordered table-condensed post'> <thead><tr><th>Nav Date</th><th class='colspan_edit' colspan='"+count_check+"'>"+date+"</th></tr><tr><th>Funds</th><th style='display:none;' class='m_1'>1 Month</th><th style='display:none;' class='m_3'>3 Months</th><th style='display:none;' class='m_6'>6 Months</th><th class='y_1'>1 Year</th><th class='y_3'>3 Years</th><th class='y_5'>5 Years</th><th class='y_7'>7 Years</th><th style='display:none;' class='y_10'>10 Years</th></tr></thead><tbody>"
      var table_monthly="<table class='table table-bordered table-condensed post Half-Yearly' id='half_yearly_"+k+"' > <thead><tr><th>Return as on "+date+"</th><th style='display:none;' class='m_1'>1 Month (%)</th><th style='display:none;' class='m_3'>3 Months (%)</th><th style='display:none;' class='m_6'>6 Months (%)</th><th class='y_1'>1 Year (%)</th><th class='y_3'>3 Years (%)</th><th class='y_5'>5 Years (%)</th><th class='y_7'>7 Years (%)</th><th style='display:none;' class='y_10'>10 Years (%)</th></tr></thead><tbody>"
      if(rolling_table_GBL.sql1!=null)  
        var sql1=rolling_table_GBL.sql1[i];
      if(rolling_table_GBL.sql2!=null)
        var sql2=rolling_table_GBL.sql2[i];
      if(rolling_table_GBL.sql3!=null)
        var sql3=rolling_table_GBL.sql3[i];
      if(rolling_table_GBL.sql4!=null)
        var sql4=rolling_table_GBL.sql4[i];
      if(rolling_table_GBL.sql5!=null)
        var sql5=rolling_table_GBL.sql5[i];

      for(var j=0;j<rolling_table_GBL.scheme_info.length;j++)
      {
       if(j==0)
       {
        var return_1_months = "-";
          if(sql1.return_1_months!=null)
          {
            return_1_months = parseFloat(sql1.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql1.return_3_months!=null)
          {
            return_3_months = parseFloat(sql1.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql1.return_6_months!=null)
          {
            return_6_months = parseFloat(sql1.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql1.return_1_years!=null)
          {
            return_1_years = parseFloat(sql1.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql1.return_3_years!=null)
          {
            return_3_years = parseFloat(sql1.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql1.return_5_years!=null)
          {
            return_5_years = parseFloat(sql1.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql1.return_7_years!=null)
          {
            return_7_years = parseFloat(sql1.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql1.return_10_years!=null)
          {
            return_10_years = parseFloat(sql1.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       }
        
      else if(j==1)
        {
          var return_1_months = "-";
          if(sql2.return_1_months!=null)
          {
            return_1_months = parseFloat(sql2.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql2.return_3_months!=null)
          {
            return_3_months = parseFloat(sql2.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql2.return_6_months!=null)
          {
            return_6_months = parseFloat(sql2.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql2.return_1_years!=null)
          {
            return_1_years = parseFloat(sql2.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql2.return_3_years!=null)
          {
            return_3_years = parseFloat(sql2.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql2.return_5_years!=null)
          {
            return_5_years = parseFloat(sql2.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql2.return_7_years!=null)
          {
            return_7_years = parseFloat(sql2.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql2.return_10_years!=null)
          {
            return_10_years = parseFloat(sql2.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }

      else if(j==2)
        {
          var return_1_months = "-";
          if(sql3.return_1_months!=null)
          {
            return_1_months = parseFloat(sql3.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql3.return_3_months!=null)
          {
            return_3_months = parseFloat(sql3.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql3.return_6_months!=null)
          {
            return_6_months = parseFloat(sql3.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql3.return_1_years!=null)
          {
            return_1_years = parseFloat(sql3.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql3.return_3_years!=null)
          {
            return_3_years = parseFloat(sql3.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql3.return_5_years!=null)
          {
            return_5_years = parseFloat(sql3.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql3.return_7_years!=null)
          {
            return_7_years = parseFloat(sql3.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql3.return_10_years!=null)
          {
            return_10_years = parseFloat(sql3.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }
      else if(j==3)
        {
          var return_1_months = "-";
          if(sql4.return_1_months!=null)
          {
            return_1_months = parseFloat(sql4.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql4.return_3_months!=null)
          {
            return_3_months = parseFloat(sql4.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql4.return_6_months!=null)
          {
            return_6_months = parseFloat(sql4.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql4.return_1_years!=null)
          {
            return_1_years = parseFloat(sql4.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql4.return_3_years!=null)
          {
            return_3_years = parseFloat(sql4.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql4.return_5_years!=null)
          {
            return_5_years = parseFloat(sql4.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql4.return_7_years!=null)
          {
            return_7_years = parseFloat(sql4.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql4.return_10_years!=null)
          {
            return_10_years = parseFloat(sql4.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }
      else if(j==4)
        {
          var return_1_months = "-";
          if(sql5.return_1_months!=null)
          {
            return_1_months = parseFloat(sql5.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql5.return_3_months!=null)
          {
            return_3_months = parseFloat(sql5.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql5.return_6_months!=null)
          {
            return_6_months = parseFloat(sql5.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql5.return_1_years!=null)
          {
            return_1_years = parseFloat(sql5.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql5.return_3_years!=null)
          {
            return_3_years = parseFloat(sql5.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql5.return_5_years!=null)
          {
            return_5_years = parseFloat(sql5.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql5.return_7_years!=null)
          {
            return_7_years = parseFloat(sql5.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql5.return_10_years!=null)
          {
            return_10_years = parseFloat(sql5.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }
      }
      table_monthly=table_monthly+"</tbody></table>"
      $("#rolling_return_table").append(table_monthly);
      k++;
    }
  }
  $("#rolling_return_table").append("<center><div id='pages' class='portfolioPagination'><span id='prev' class='previous'><span class='glyphicon glyphicon-triangle-left'></span>Previous</span>|<span id='next' class='next'>Next<span class='glyphicon glyphicon-triangle-right'></span></span></div></center>" )
  portfolio_pagination();
}
}


function yearly_calculate(count_check)
{
  $("#rolling_return_table").empty();
  var k=0;
  if(rolling_table_GBL.status=="OK" && rolling_table_GBL.sql1!=null)
  {
  for(var i=rolling_table_GBL.sql1.length-1;i>0;i--)
  {
    var d=new Date(rolling_table_GBL.sql1[i].date)
    var quarter_d=d.getMonth()+1;
    if(quarter_d==12 )
    {
      var date=moment(rolling_table_GBL.sql1[i].date).format('DD-MMM-YYYY')
      // var table_monthly="<table class='table table-bordered table-condensed post'> <thead><tr><th>Nav Date</th><th class='colspan_edit' colspan='"+count_check+"'>"+date+"</th></tr><tr><th>Funds</th><th style='display:none;' class='m_1'>1 Month</th><th style='display:none;' class='m_3'>3 Months</th><th style='display:none;' class='m_6'>6 Months</th><th class='y_1'>1 Year</th><th class='y_3'>3 Years</th><th class='y_5'>5 Years</th><th class='y_7'>7 Years</th><th style='display:none;' class='y_10'>10 Years</th></tr></thead><tbody>"
      var table_monthly="<table class='table table-bordered table-condensed post Annually' id='yearly_"+k+"'> <thead><tr><th>Return as on "+date+"</th><th style='display:none;' class='m_1'>1 Month (%)</th><th style='display:none;' class='m_3'>3 Months (%)</th><th style='display:none;' class='m_6'>6 Months (%)</th><th class='y_1'>1 Year (%)</th><th class='y_3'>3 Years (%)</th><th class='y_5'>5 Years (%)</th><th class='y_7'>7 Years (%)</th><th style='display:none;' class='y_10'>10 Years (%)</th></tr></thead><tbody>"
      if(rolling_table_GBL.sql1!=null)  
        var sql1=rolling_table_GBL.sql1[i];
      if(rolling_table_GBL.sql2!=null)
        var sql2=rolling_table_GBL.sql2[i];
      if(rolling_table_GBL.sql3!=null)
        var sql3=rolling_table_GBL.sql3[i];
      if(rolling_table_GBL.sql4!=null)
        var sql4=rolling_table_GBL.sql4[i];
      if(rolling_table_GBL.sql5!=null)
        var sql5=rolling_table_GBL.sql5[i];

      for(var j=0;j<rolling_table_GBL.scheme_info.length;j++)
      {
       if(j==0)
       {
        var return_1_months = "-";
          if(sql1.return_1_months!=null)
          {
            return_1_months = parseFloat(sql1.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql1.return_3_months!=null)
          {
            return_3_months = parseFloat(sql1.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql1.return_6_months!=null)
          {
            return_6_months = parseFloat(sql1.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql1.return_1_years!=null)
          {
            return_1_years = parseFloat(sql1.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql1.return_3_years!=null)
          {
            return_3_years = parseFloat(sql1.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql1.return_5_years!=null)
          {
            return_5_years = parseFloat(sql1.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql1.return_7_years!=null)
          {
            return_7_years = parseFloat(sql1.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql1.return_10_years!=null)
          {
            return_10_years = parseFloat(sql1.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       }
        
      else if(j==1)
        {
          var return_1_months = "-";
          if(sql2.return_1_months!=null)
          {
            return_1_months = parseFloat(sql2.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql2.return_3_months!=null)
          {
            return_3_months = parseFloat(sql2.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql2.return_6_months!=null)
          {
            return_6_months = parseFloat(sql2.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql2.return_1_years!=null)
          {
            return_1_years = parseFloat(sql2.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql2.return_3_years!=null)
          {
            return_3_years = parseFloat(sql2.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql2.return_5_years!=null)
          {
            return_5_years = parseFloat(sql2.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql2.return_7_years!=null)
          {
            return_7_years = parseFloat(sql2.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql2.return_10_years!=null)
          {
            return_10_years = parseFloat(sql2.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }

      else if(j==2)
        {
          var return_1_months = "-";
          if(sql3.return_1_months!=null)
          {
            return_1_months = parseFloat(sql3.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql3.return_3_months!=null)
          {
            return_3_months = parseFloat(sql3.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql3.return_6_months!=null)
          {
            return_6_months = parseFloat(sql3.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql3.return_1_years!=null)
          {
            return_1_years = parseFloat(sql3.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql3.return_3_years!=null)
          {
            return_3_years = parseFloat(sql3.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql3.return_5_years!=null)
          {
            return_5_years = parseFloat(sql3.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql3.return_7_years!=null)
          {
            return_7_years = parseFloat(sql3.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql3.return_10_years!=null)
          {
            return_10_years = parseFloat(sql3.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }
      else if(j==3)
        {
          var return_1_months = "-";
          if(sql4.return_1_months!=null)
          {
            return_1_months = parseFloat(sql4.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql4.return_3_months!=null)
          {
            return_3_months = parseFloat(sql4.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql4.return_6_months!=null)
          {
            return_6_months = parseFloat(sql4.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql4.return_1_years!=null)
          {
            return_1_years = parseFloat(sql4.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql4.return_3_years!=null)
          {
            return_3_years = parseFloat(sql4.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql4.return_5_years!=null)
          {
            return_5_years = parseFloat(sql4.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql4.return_7_years!=null)
          {
            return_7_years = parseFloat(sql4.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql4.return_10_years!=null)
          {
            return_10_years = parseFloat(sql4.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }
      else if(j==4)
        {
          var return_1_months = "-";
          if(sql5.return_1_months!=null)
          {
            return_1_months = parseFloat(sql5.return_1_months).toFixed(2);;
          }
        var return_3_months = "-";
          if(sql5.return_3_months!=null)
          {
            return_3_months = parseFloat(sql5.return_3_months).toFixed(2);;
          }
        var return_6_months = "-";
          if(sql5.return_6_months!=null)
          {
            return_6_months = parseFloat(sql5.return_6_months).toFixed(2);;
          }
        var return_1_years = "-";
          if(sql5.return_1_years!=null)
          {
            return_1_years = parseFloat(sql5.return_1_years).toFixed(2);;
          }
          var return_3_years = "-";
          if(sql5.return_3_years!=null)
          {
            return_3_years = parseFloat(sql5.return_3_years).toFixed(2);;
          }
          var return_5_years = "-";
          if(sql5.return_5_years!=null)
          {
            return_5_years = parseFloat(sql5.return_5_years).toFixed(2);;
          }
          var return_7_years = "-";
          if(sql5.return_7_years!=null)
          {
            return_7_years = parseFloat(sql5.return_7_years).toFixed(2);;
          }
          var return_10_years = "-";
          if(sql5.return_10_years!=null)
          {
            return_10_years = parseFloat(sql5.return_10_years).toFixed(2);;
          }
          table_monthly=table_monthly+"<tr><td><a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[j].schemecode+"' target='_blank'>"+rolling_table_GBL.scheme_info[j].s_name+"</a></td><td style='display:none;' class='m_1'>"+return_1_months+"</td><td style='display:none;' class='m_3'>"+return_3_months+"</td><td style='display:none;' class='m_6'>"+return_6_months+"</td><td class='y_1'>"+return_1_years+"</td><td class='y_3'>"+return_3_years+"</td><td class='y_5'>"+return_5_years+"</td><td class='y_7'>"+return_7_years+"</td><td style='display:none;' class='y_10'>"+return_10_years+"</td></tr>"
       
        }
      }
      table_monthly=table_monthly+"</tbody></table>"
      $("#rolling_return_table").append(table_monthly);
      k++;
    }
  }
  $("#rolling_return_table").append("<center><div id='pages' class='portfolioPagination'><span id='prev' class='previous'><span class='glyphicon glyphicon-triangle-left'></span>Previous</span>|<span id='next' class='next'>Next<span class='glyphicon glyphicon-triangle-right'></span></span></div></center>" )
  portfolio_pagination();
}
}

function rolling_return_table(schemecode,count_check)
{
  $.ajax({
         type: 'GET',
         url: '/home/return_rolling_table',
         data :{schemecode:schemecode},
         dataType: 'json',
         // data: { 'iin' : $('#client_name').val()},
         success: function(data)
         {
          console.log("-----------------")
          console.log(data);
          rolling_table_GBL=data;
          $("#time_period").val("Quarterly")
          // $("#quarterly").click();
          quarterly_calculate(count_check);

         }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
       });


}

function test_graph_rolling_return(schemecode,container_id,return_year,start_date,color_arr)
 {

      $("#loading").show();
              // $('#data').css("display", "block");
              $("#rv_Rolling_Return *").css('pointer-events','none');
                $('#rv_Rolling_Return').css("opacity", "0.5");
          var x = new Date();

              $.ajax({
         type: 'GET',
         url: '/home/return_rolling',
          data :{schemecode:schemecode,return_year:return_year,from_date:start_date},
         dataType: 'json',
         // data: { 'iin' : $('#client_name').val()},
         success: function(data)
         {
          schemename_GBL=[];
          data_roll_ret_GBL=""
           var inception_date=[]
          $("#loading").hide();
              // $('#data').css("display", "block");
               $("#rv_Rolling_Return *").css('pointer-events','block');
                $('#rv_Rolling_Return').css("opacity", "1");
           console.log(data);
          if(data.status=="Error")
          {
              swal(data.message);
          }
          else
          {
           for(i=0;i<data.scheme_info.length;i++)
           {
            inception_date.push(new Date(data.scheme_info[i].inception_date));
            schemename_GBL.push(data.scheme_info[i].s_name)
           }
            var maxDate=new Date(Math.max.apply(null,inception_date));
            // $("#from_date").datepicker("setStartDate", new Date(maxDate));
           data_roll_ret_GBL=data;

           
             if(return_year=="1_yr")
            {
               // alert(return_year);
              // first_date = moment(new Date(data.sql1[0].date)).subtract(1, 'years').format('DD-MMM-YYYY');
              // alert(first_date)
              first_date = moment(new Date(data.sql1[0].date)).format('DD-MMM-YYYY');
             var start_date= moment(maxDate).add(1,'years').format('DD-MMM-YYYY');
            }
            else if(return_year=="3_yr")
            {
              // first_date = moment(new Date(data.sql1[0].date)).subtract(3, 'years').format('DD-MMM-YYYY');
              first_date = moment(new Date(data.sql1[0].date)).format('DD-MMM-YYYY');
              var start_date= moment(maxDate).add(3,'years').format('DD-MMM-YYYY');
            }
            else if(return_year=="5_yr")
            {
              // first_date = moment(new Date(data.sql1[0].date)).subtract(5, 'years').format('DD-MMM-YYYY');
              first_date = moment(new Date(data.sql1[0].date)).format('DD-MMM-YYYY');
              var start_date= moment(maxDate).add(5,'years').format('DD-MMM-YYYY');
            }
            else if(return_year=="7_yr")
            {
              // first_date = moment(new Date(data.sql1[0].date)).subtract(7, 'years').format('DD-MMM-YYYY');
              first_date = moment(new Date(data.sql1[0].date)).format('DD-MMM-YYYY');
              var start_date= moment(maxDate).add(7,'years').format('DD-MMM-YYYY');
            }
            else if(return_year=="10_yr")
            {
              // first_date = moment(new Date(data.sql1[0].date)).subtract(10, 'years').format('DD-MMM-YYYY');
              first_date = moment(new Date(data.sql1[0].date)).format('DD-MMM-YYYY');
              var start_date= moment(maxDate).add(10,'years').format('DD-MMM-YYYY');
            }
            else if(return_year=="1_mon")
            {
              // first_date = moment(new Date(data.sql1[0].date)).subtract(1, 'months').format('DD-MMM-YYYY');
              first_date = moment(new Date(data.sql1[0].date)).format('DD-MMM-YYYY');
              var start_date= moment(maxDate).add(1,'months').format('DD-MMM-YYYY');
            }
            else if(return_year=="3_mon")
            {
              // first_date = moment(new Date(data.sql1[0].date)).subtract(3, 'months').format('DD-MMM-YYYY');
              first_date = moment(new Date(data.sql1[0].date)).format('DD-MMM-YYYY');
              var start_date= moment(maxDate).add(3,'months').format('DD-MMM-YYYY');
            }
            else if(return_year=="6_mon")
            {
              // first_date = moment(new Date(data.sql1[0].date)).subtract(6, 'months').format('DD-MMM-YYYY');
              first_date = moment(new Date(data.sql1[0].date)).format('DD-MMM-YYYY');
              var start_date= moment(maxDate).add(6,'months').format('DD-MMM-YYYY');
            }
            $("#from_date").datepicker("setStartDate", start_date);
   
          $('#from_date').val(first_date);
          startDate1=new Date($('#from_date').val());
          $("#date_range").html(first_date+" to "+ moment(new Date(data.sql1[data.sql1.length-1].date)).format('DD-MMM-YYYY'))
          // start_page=0;
       

           $("#from_date").datepicker("update", first_date);

           rolling_return_array(data,return_year,from_date,schemecode,color_arr);
           
           }

       
    }
});
      // }
 }

 function rolling_return_array(data_roll_ret_GBL,return_year,from_date,schemecode,color_arr)
 {
  var arr_1_mon_1=[]
  var arr_3_mon_1=[]
  var arr_6_mon_1=[]
  var arr_1_yr_1=[]
  var arr_3_yr_1=[]
  var arr_5_yr_1=[]
  var arr_7_yr_1=[]
  var arr_10_yr_1=[]

  var arr_1_mon_2=[]
  var arr_3_mon_2=[]
  var arr_6_mon_2=[]
  var arr_1_yr_2=[]
  var arr_3_yr_2=[]
  var arr_5_yr_2=[]
  var arr_7_yr_2=[]
  var arr_10_yr_2=[]

  var arr_1_mon_3=[]
  var arr_3_mon_3=[]
  var arr_6_mon_3=[]
  var arr_1_yr_3=[]
  var arr_3_yr_3=[]
  var arr_5_yr_3=[]
  var arr_7_yr_3=[]
  var arr_10_yr_3=[]

  var arr_1_mon_4=[]
  var arr_3_mon_4=[]
  var arr_6_mon_4=[]
  var arr_1_yr_4=[]
  var arr_3_yr_4=[]
  var arr_5_yr_4=[]
  var arr_7_yr_4=[]
  var arr_10_yr_4=[]

  var arr_1_mon_5=[]
  var arr_3_mon_5=[]
  var arr_6_mon_5=[]
  var arr_1_yr_5=[]
  var arr_3_yr_5=[]
  var arr_5_yr_5=[]
  var arr_7_yr_5=[]
  var arr_10_yr_5=[]
  var count_0=0;
  var count_1=0;
  var count_2=0;
  var count_3=0;
  var count_4=0;
  var sum=0;
  var max_min=[]
  if(data_roll_ret_GBL.sql1!=null)
  {
    for(i=0;i<data_roll_ret_GBL.sql1.length;i=i+1)
    {
       var date2 = new Date(data_roll_ret_GBL.sql1[i].date);
       arr_1_mon_1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql1[i].return_1_months)]);
       arr_3_mon_1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql1[i].return_3_months)]);
       arr_6_mon_1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql1[i].return_6_months)]);
       arr_1_yr_1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql1[i].return_1_years)]);
       arr_3_yr_1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql1[i].return_3_years)]);
       arr_5_yr_1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql1[i].return_5_years)]);
       arr_7_yr_1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql1[i].return_7_years)]);
       arr_10_yr_1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql1[i].return_10_years)]);
      
       if(return_year=="1_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql1[i].return_1_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql1[i].return_1_years));
        if(data_roll_ret_GBL.sql1[i].return_1_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_1_years>0 && data_roll_ret_GBL.sql1[i].return_1_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_1_years>10 && data_roll_ret_GBL.sql1[i].return_1_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_1_years>20 && data_roll_ret_GBL.sql1[i].return_1_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_1_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="3_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql1[i].return_3_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql1[i].return_3_years));
        if(data_roll_ret_GBL.sql1[i].return_3_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_3_years>0 && data_roll_ret_GBL.sql1[i].return_3_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_3_years>10 && data_roll_ret_GBL.sql1[i].return_3_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_3_years>20 && data_roll_ret_GBL.sql1[i].return_3_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_3_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="5_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql1[i].return_5_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql1[i].return_5_years));
        if(data_roll_ret_GBL.sql1[i].return_5_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_5_years>0 && data_roll_ret_GBL.sql1[i].return_5_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_5_years>10 && data_roll_ret_GBL.sql1[i].return_5_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_5_years>20 && data_roll_ret_GBL.sql1[i].return_5_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_5_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="7_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql1[i].return_7_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql1[i].return_7_years));
        if(data_roll_ret_GBL.sql1[i].return_7_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_7_years>0 && data_roll_ret_GBL.sql1[i].return_7_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_7_years>10 && data_roll_ret_GBL.sql1[i].return_7_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_7_years>20 && data_roll_ret_GBL.sql1[i].return_7_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_7_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else   if(return_year=="10_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql1[i].return_10_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql1[i].return_10_years));
        if(data_roll_ret_GBL.sql1[i].return_10_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_10_years>0 && data_roll_ret_GBL.sql1[i].return_10_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_10_years>10 && data_roll_ret_GBL.sql1[i].return_10_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_10_years>20 && data_roll_ret_GBL.sql1[i].return_10_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_10_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="1_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql1[i].return_1_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql1[i].return_1_months));
        if(data_roll_ret_GBL.sql1[i].return_1_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_1_months>0 && data_roll_ret_GBL.sql1[i].return_1_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_1_months>10 && data_roll_ret_GBL.sql1[i].return_1_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_1_months>20 && data_roll_ret_GBL.sql1[i].return_1_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_1_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="3_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql1[i].return_3_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql1[i].return_3_months));
        if(data_roll_ret_GBL.sql1[i].return_3_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_3_months>0 && data_roll_ret_GBL.sql1[i].return_3_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_3_months>10 && data_roll_ret_GBL.sql1[i].return_3_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_3_months>20 && data_roll_ret_GBL.sql1[i].return_3_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_3_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="6_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql1[i].return_6_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql1[i].return_6_months));
        if(data_roll_ret_GBL.sql1[i].return_6_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_6_months>0 && data_roll_ret_GBL.sql1[i].return_6_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_6_months>10 && data_roll_ret_GBL.sql1[i].return_6_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_6_months>20 && data_roll_ret_GBL.sql1[i].return_6_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql1[i].return_6_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
   }
   // alert(sum);
   avg=parseFloat(sum/data_roll_ret_GBL.sql1.length).toFixed(2);
   // alert(avg);
   var max_ret= Math.max.apply(null,max_min);
    var min_ret= Math.min.apply(null,max_min);
   $("#rolling_table_0").show();
   $("#rolling_table_1").hide();
   $("#rolling_table_2").hide();
   $("#rolling_table_3").hide();
   $("#rolling_table_4").hide();
   $("#rolling_s_name_0").html("<a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[0].schemecode+"' target='_blank'>"+schemename_GBL[0]+"</a>");
   $("#avg_0").html(avg);
   $("#max_0").html(max_ret.toFixed(2));
   $("#min_0").html(min_ret.toFixed(2));
   $("#lt_0_0").html((parseFloat(count_0/data_roll_ret_GBL.sql1.length)*100).toFixed(2))
   $("#lt_10_0").html((parseFloat(count_1/data_roll_ret_GBL.sql1.length)*100).toFixed(2))
   $("#lt_20_0").html((parseFloat(count_2/data_roll_ret_GBL.sql1.length)*100).toFixed(2))
   $("#lt_30_0").html((parseFloat(count_3/data_roll_ret_GBL.sql1.length)*100).toFixed(2))
   $("#gt_30_0").html((parseFloat(count_4/data_roll_ret_GBL.sql1.length)*100).toFixed(2))
 }
 if(data_roll_ret_GBL.sql2!=null)
 {
   count_0=0;
   count_1=0;
   count_2=0;
   count_3=0;
   count_4=0;
   sum=0;
   max_min=[]
  for(i=0;i<data_roll_ret_GBL.sql2.length;i=i+1)
   {
       var date2 = new Date(data_roll_ret_GBL.sql2[i].date);
       arr_1_mon_2.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql2[i].return_1_months)]);
       arr_3_mon_2.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql2[i].return_3_months)]);
       arr_6_mon_2.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql2[i].return_6_months)]);
       arr_1_yr_2.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql2[i].return_1_years)]);
       arr_3_yr_2.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql2[i].return_3_years)]);
       arr_5_yr_2.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql2[i].return_5_years)]);
       arr_7_yr_2.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql2[i].return_7_years)]);
       arr_10_yr_2.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql2[i].return_10_years)]);
       if(return_year=="1_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql2[i].return_1_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql2[i].return_1_years));
        if(data_roll_ret_GBL.sql2[i].return_1_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_1_years>0 && data_roll_ret_GBL.sql2[i].return_1_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_1_years>10 && data_roll_ret_GBL.sql2[i].return_1_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_1_years>20 && data_roll_ret_GBL.sql2[i].return_1_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_1_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="3_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql2[i].return_3_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql2[i].return_3_years));
        if(data_roll_ret_GBL.sql2[i].return_3_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_3_years>0 && data_roll_ret_GBL.sql2[i].return_3_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_3_years>10 && data_roll_ret_GBL.sql2[i].return_3_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_3_years>20 && data_roll_ret_GBL.sql2[i].return_3_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_3_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="5_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql2[i].return_5_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql2[i].return_5_years));
        if(data_roll_ret_GBL.sql2[i].return_5_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_5_years>0 && data_roll_ret_GBL.sql2[i].return_5_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_5_years>10 && data_roll_ret_GBL.sql2[i].return_5_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_5_years>20 && data_roll_ret_GBL.sql2[i].return_5_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_5_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="7_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql2[i].return_7_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql2[i].return_7_years));
        if(data_roll_ret_GBL.sql2[i].return_7_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_7_years>0 && data_roll_ret_GBL.sql2[i].return_7_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_7_years>10 && data_roll_ret_GBL.sql2[i].return_7_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_7_years>20 && data_roll_ret_GBL.sql2[i].return_7_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_7_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else   if(return_year=="10_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql2[i].return_10_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql2[i].return_10_years));
        if(data_roll_ret_GBL.sql2[i].return_10_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_10_years>0 && data_roll_ret_GBL.sql2[i].return_10_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_10_years>10 && data_roll_ret_GBL.sql2[i].return_10_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_10_years>20 && data_roll_ret_GBL.sql2[i].return_10_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_10_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="1_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql2[i].return_1_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql2[i].return_1_months));
        if(data_roll_ret_GBL.sql2[i].return_1_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_1_months>0 && data_roll_ret_GBL.sql2[i].return_1_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_1_months>10 && data_roll_ret_GBL.sql2[i].return_1_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_1_months>20 && data_roll_ret_GBL.sql2[i].return_1_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_1_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="3_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql2[i].return_3_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql2[i].return_3_months));
        if(data_roll_ret_GBL.sql2[i].return_3_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_3_months>0 && data_roll_ret_GBL.sql2[i].return_3_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_3_months>10 && data_roll_ret_GBL.sql2[i].return_3_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_3_months>20 && data_roll_ret_GBL.sql2[i].return_3_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_3_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="6_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql2[i].return_6_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql2[i].return_6_months));
        if(data_roll_ret_GBL.sql2[i].return_6_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_6_months>0 && data_roll_ret_GBL.sql2[i].return_6_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_6_months>10 && data_roll_ret_GBL.sql2[i].return_6_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_6_months>20 && data_roll_ret_GBL.sql2[i].return_6_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql2[i].return_6_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
   }
   // alert(sum);
   avg=parseFloat(sum/data_roll_ret_GBL.sql2.length).toFixed(2);
   // alert(avg);
   var max_ret= Math.max.apply(null,max_min);
    var min_ret= Math.min.apply(null,max_min);
   $("#rolling_table_1").show();
   $("#rolling_table_2").hide();
   $("#rolling_table_3").hide();
   $("#rolling_table_4").hide();
   $("#rolling_s_name_1").html("<a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[1].schemecode+"' target='_blank'>"+schemename_GBL[1]+"</a>");
   $("#avg_1").html(avg);
   $("#max_1").html(max_ret.toFixed(2));
   $("#min_1").html(min_ret.toFixed(2));
   $("#lt_0_1").html((parseFloat(count_0/data_roll_ret_GBL.sql2.length)*100).toFixed(2))
   $("#lt_10_1").html((parseFloat(count_1/data_roll_ret_GBL.sql2.length)*100).toFixed(2))
   $("#lt_20_1").html((parseFloat(count_2/data_roll_ret_GBL.sql2.length)*100).toFixed(2))
   $("#lt_30_1").html((parseFloat(count_3/data_roll_ret_GBL.sql2.length)*100).toFixed(2))
   $("#gt_30_1").html((parseFloat(count_4/data_roll_ret_GBL.sql2.length)*100).toFixed(2))
 } 
 if(data_roll_ret_GBL.sql3!=null)
 {
   count_0=0;
   count_1=0;
   count_2=0;
   count_3=0;
   count_4=0;
   sum=0;
   max_min=[]
  for(i=0;i<data_roll_ret_GBL.sql3.length;i=i+1)
   {
       var date2 = new Date(data_roll_ret_GBL.sql3[i].date);
       arr_1_mon_3.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql3[i].return_1_months)]);
       arr_3_mon_3.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql3[i].return_3_months)]);
       arr_6_mon_3.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql3[i].return_6_months)]);
       arr_1_yr_3.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql3[i].return_1_years)]);
       arr_3_yr_3.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql3[i].return_3_years)]);
       arr_5_yr_3.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql3[i].return_5_years)]);
       arr_7_yr_3.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql3[i].return_7_years)]);
       arr_10_yr_3.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql3[i].return_10_years)]);
       if(return_year=="1_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql3[i].return_1_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql3[i].return_1_years));
        if(data_roll_ret_GBL.sql3[i].return_1_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_1_years>0 && data_roll_ret_GBL.sql3[i].return_1_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_1_years>10 && data_roll_ret_GBL.sql3[i].return_1_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_1_years>20 && data_roll_ret_GBL.sql3[i].return_1_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_1_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="3_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql3[i].return_3_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql3[i].return_3_years));
        if(data_roll_ret_GBL.sql3[i].return_3_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_3_years>0 && data_roll_ret_GBL.sql3[i].return_3_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_3_years>10 && data_roll_ret_GBL.sql3[i].return_3_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_3_years>20 && data_roll_ret_GBL.sql3[i].return_3_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_3_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="5_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql3[i].return_5_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql3[i].return_5_years));
        if(data_roll_ret_GBL.sql3[i].return_5_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_5_years>0 && data_roll_ret_GBL.sql3[i].return_5_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_5_years>10 && data_roll_ret_GBL.sql3[i].return_5_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_5_years>20 && data_roll_ret_GBL.sql3[i].return_5_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_5_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="7_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql3[i].return_7_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql3[i].return_7_years));
        if(data_roll_ret_GBL.sql3[i].return_7_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_7_years>0 && data_roll_ret_GBL.sql3[i].return_7_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_7_years>10 && data_roll_ret_GBL.sql3[i].return_7_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_7_years>20 && data_roll_ret_GBL.sql3[i].return_7_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_7_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else   if(return_year=="10_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql3[i].return_10_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql3[i].return_10_years));
        if(data_roll_ret_GBL.sql3[i].return_10_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_10_years>0 && data_roll_ret_GBL.sql3[i].return_10_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_10_years>10 && data_roll_ret_GBL.sql3[i].return_10_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_10_years>20 && data_roll_ret_GBL.sql3[i].return_10_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_10_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="1_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql3[i].return_1_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql3[i].return_1_months));
        if(data_roll_ret_GBL.sql3[i].return_1_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_1_months>0 && data_roll_ret_GBL.sql3[i].return_1_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_1_months>10 && data_roll_ret_GBL.sql3[i].return_1_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_1_months>20 && data_roll_ret_GBL.sql3[i].return_1_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_1_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="3_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql3[i].return_3_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql3[i].return_3_months));
        if(data_roll_ret_GBL.sql3[i].return_3_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_3_months>0 && data_roll_ret_GBL.sql3[i].return_3_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_3_months>10 && data_roll_ret_GBL.sql3[i].return_3_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_3_months>20 && data_roll_ret_GBL.sql3[i].return_3_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_3_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="6_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql3[i].return_6_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql3[i].return_6_months));
        if(data_roll_ret_GBL.sql3[i].return_6_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_6_months>0 && data_roll_ret_GBL.sql3[i].return_6_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_6_months>10 && data_roll_ret_GBL.sql3[i].return_6_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_6_months>20 && data_roll_ret_GBL.sql3[i].return_6_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql3[i].return_6_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
   }
   // alert(sum);
   avg=parseFloat(sum/data_roll_ret_GBL.sql3.length).toFixed(2);
   // alert(avg);
   var max_ret= Math.max.apply(null,max_min);
    var min_ret= Math.min.apply(null,max_min);
   $("#rolling_table_2").show();
   $("#rolling_table_3").hide();
   $("#rolling_table_4").hide();
   $("#rolling_s_name_2").html("<a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[2].schemecode+"' target='_blank'>"+schemename_GBL[2]+"</a>");
   $("#avg_2").html(avg);
   $("#max_2").html(max_ret.toFixed(2));
   $("#min_2").html(min_ret.toFixed(2));
   $("#lt_0_2").html((parseFloat(count_0/data_roll_ret_GBL.sql3.length)*100).toFixed(2))
   $("#lt_10_2").html((parseFloat(count_1/data_roll_ret_GBL.sql3.length)*100).toFixed(2))
   $("#lt_20_2").html((parseFloat(count_2/data_roll_ret_GBL.sql3.length)*100).toFixed(2))
   $("#lt_30_2").html((parseFloat(count_3/data_roll_ret_GBL.sql3.length)*100).toFixed(2))
   $("#gt_30_2").html((parseFloat(count_4/data_roll_ret_GBL.sql3.length)*100).toFixed(2))
 } 
 if(data_roll_ret_GBL.sql4!=null)
 {
   count_0=0;
   count_1=0;
   count_2=0;
   count_3=0;
   count_4=0;
   sum=0;
   max_min=[];
  for(i=0;i<data_roll_ret_GBL.sql4.length;i=i+1)
   {
       var date2 = new Date(data_roll_ret_GBL.sql4[i].date);
       arr_1_mon_4.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql4[i].return_1_months)]);
       arr_3_mon_4.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql4[i].return_3_months)]);
       arr_6_mon_4.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql4[i].return_6_months)]);
       arr_1_yr_4.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql4[i].return_1_years)]);
       arr_3_yr_4.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql4[i].return_3_years)]);
       arr_5_yr_4.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql4[i].return_5_years)]);
       arr_7_yr_4.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql4[i].return_7_years)]);
       arr_10_yr_4.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql4[i].return_10_years)]);
       if(return_year=="1_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql4[i].return_1_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql4[i].return_1_years));
        if(data_roll_ret_GBL.sql4[i].return_1_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_1_years>0 && data_roll_ret_GBL.sql4[i].return_1_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_1_years>10 && data_roll_ret_GBL.sql4[i].return_1_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_1_years>20 && data_roll_ret_GBL.sql4[i].return_1_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_1_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="3_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql4[i].return_3_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql4[i].return_3_years));
        if(data_roll_ret_GBL.sql4[i].return_3_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_3_years>0 && data_roll_ret_GBL.sql4[i].return_3_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_3_years>10 && data_roll_ret_GBL.sql4[i].return_3_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_3_years>20 && data_roll_ret_GBL.sql4[i].return_3_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_3_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="5_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql4[i].return_5_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql4[i].return_5_years));
        if(data_roll_ret_GBL.sql4[i].return_5_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_5_years>0 && data_roll_ret_GBL.sql4[i].return_5_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_5_years>10 && data_roll_ret_GBL.sql4[i].return_5_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_5_years>20 && data_roll_ret_GBL.sql4[i].return_5_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_5_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="7_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql4[i].return_7_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql4[i].return_7_years));
        if(data_roll_ret_GBL.sql4[i].return_7_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_7_years>0 && data_roll_ret_GBL.sql4[i].return_7_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_7_years>10 && data_roll_ret_GBL.sql4[i].return_7_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_7_years>20 && data_roll_ret_GBL.sql4[i].return_7_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_7_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else   if(return_year=="10_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql4[i].return_10_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql4[i].return_10_years));
        if(data_roll_ret_GBL.sql4[i].return_10_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_10_years>0 && data_roll_ret_GBL.sql4[i].return_10_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_10_years>10 && data_roll_ret_GBL.sql4[i].return_10_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_10_years>20 && data_roll_ret_GBL.sql4[i].return_10_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_10_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="1_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql4[i].return_1_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql4[i].return_1_months));
        if(data_roll_ret_GBL.sql4[i].return_1_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_1_months>0 && data_roll_ret_GBL.sql4[i].return_1_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_1_months>10 && data_roll_ret_GBL.sql4[i].return_1_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_1_months>20 && data_roll_ret_GBL.sql4[i].return_1_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_1_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="3_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql4[i].return_3_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql4[i].return_3_months));
        if(data_roll_ret_GBL.sql4[i].return_3_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_3_months>0 && data_roll_ret_GBL.sql4[i].return_3_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_3_months>10 && data_roll_ret_GBL.sql4[i].return_3_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_3_months>20 && data_roll_ret_GBL.sql4[i].return_3_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_3_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="6_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql4[i].return_6_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql4[i].return_6_months));
        if(data_roll_ret_GBL.sql4[i].return_6_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_6_months>0 && data_roll_ret_GBL.sql4[i].return_6_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_6_months>10 && data_roll_ret_GBL.sql4[i].return_6_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_6_months>20 && data_roll_ret_GBL.sql4[i].return_6_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql4[i].return_6_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
   }
   // alert(sum);
   avg=parseFloat(sum/data_roll_ret_GBL.sql4.length).toFixed(2);
   // alert(avg);
   var max_ret= Math.max.apply(null,max_min);
    var min_ret= Math.min.apply(null,max_min);
   $("#rolling_table_3").show();
   $("#rolling_table_4").hide();
   $("#rolling_s_name_3").html("<a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[3].schemecode+"' target='_blank'>"+schemename_GBL[3]+"</a>");
   $("#avg_3").html(avg);
   $("#max_3").html(max_ret.toFixed(2));
   $("#min_3").html(min_ret.toFixed(2));
   $("#lt_0_3").html((parseFloat(count_0/data_roll_ret_GBL.sql4.length)*100).toFixed(2))
   $("#lt_10_3").html((parseFloat(count_1/data_roll_ret_GBL.sql4.length)*100).toFixed(2))
   $("#lt_20_3").html((parseFloat(count_2/data_roll_ret_GBL.sql4.length)*100).toFixed(2))
   $("#lt_30_3").html((parseFloat(count_3/data_roll_ret_GBL.sql4.length)*100).toFixed(2))
   $("#gt_30_3").html((parseFloat(count_4/data_roll_ret_GBL.sql4.length)*100).toFixed(2))
 } 
 if(data_roll_ret_GBL.sql5!=null)
 {
   count_0=0;
   count_1=0;
   count_2=0;
   count_3=0;
   count_4=0;
   sum=0;
   max_min=[];
  for(i=0;i<data_roll_ret_GBL.sql5.length;i=i+1)
   {
       var date2 = new Date(data_roll_ret_GBL.sql5[i].date);
       arr_1_mon_5.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql5[i].return_1_months)]);
       arr_3_mon_5.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql5[i].return_3_months)]);
       arr_6_mon_5.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql5[i].return_6_months)]);
       arr_1_yr_5.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql5[i].return_1_years)]);
       arr_3_yr_5.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql5[i].return_3_years)]);
       arr_5_yr_5.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql5[i].return_5_years)]);
       arr_7_yr_5.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql5[i].return_7_years)]);
       arr_10_yr_5.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),parseFloat(data_roll_ret_GBL.sql5[i].return_10_years)]);
       if(return_year=="1_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql5[i].return_1_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql5[i].return_1_years));
        if(data_roll_ret_GBL.sql5[i].return_1_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_1_years>0 && data_roll_ret_GBL.sql5[i].return_1_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_1_years>10 && data_roll_ret_GBL.sql5[i].return_1_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_1_years>20 && data_roll_ret_GBL.sql5[i].return_1_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_1_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="3_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql5[i].return_3_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql5[i].return_3_years));
        if(data_roll_ret_GBL.sql5[i].return_3_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_3_years>0 && data_roll_ret_GBL.sql5[i].return_3_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_3_years>10 && data_roll_ret_GBL.sql5[i].return_3_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_3_years>20 && data_roll_ret_GBL.sql5[i].return_3_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_3_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else if(return_year=="5_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql5[i].return_5_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql5[i].return_5_years));
        if(data_roll_ret_GBL.sql5[i].return_5_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_5_years>0 && data_roll_ret_GBL.sql5[i].return_5_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_5_years>10 && data_roll_ret_GBL.sql5[i].return_5_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_5_years>20 && data_roll_ret_GBL.sql5[i].return_5_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_5_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="7_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql5[i].return_7_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql5[i].return_7_years));
        if(data_roll_ret_GBL.sql5[i].return_7_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_7_years>0 && data_roll_ret_GBL.sql5[i].return_7_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_7_years>10 && data_roll_ret_GBL.sql5[i].return_7_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_7_years>20 && data_roll_ret_GBL.sql5[i].return_7_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_7_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else   if(return_year=="10_yr")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql5[i].return_10_years);
         max_min.push(parseFloat(data_roll_ret_GBL.sql5[i].return_10_years));
        if(data_roll_ret_GBL.sql5[i].return_10_years<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_10_years>0 && data_roll_ret_GBL.sql5[i].return_10_years <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_10_years>10 && data_roll_ret_GBL.sql5[i].return_10_years <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_10_years>20 && data_roll_ret_GBL.sql5[i].return_10_years <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_10_years>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="1_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql5[i].return_1_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql5[i].return_1_months));
        if(data_roll_ret_GBL.sql5[i].return_1_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_1_months>0 && data_roll_ret_GBL.sql5[i].return_1_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_1_months>10 && data_roll_ret_GBL.sql5[i].return_1_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_1_months>20 && data_roll_ret_GBL.sql5[i].return_1_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_1_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="3_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql5[i].return_3_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql5[i].return_3_months));
        if(data_roll_ret_GBL.sql5[i].return_3_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_3_months>0 && data_roll_ret_GBL.sql5[i].return_3_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_3_months>10 && data_roll_ret_GBL.sql5[i].return_3_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_3_months>20 && data_roll_ret_GBL.sql5[i].return_3_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_3_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
       else  if(return_year=="6_mon")
       {
         sum=sum+parseFloat(data_roll_ret_GBL.sql5[i].return_6_months);
         max_min.push(parseFloat(data_roll_ret_GBL.sql5[i].return_6_months));
        if(data_roll_ret_GBL.sql5[i].return_6_months<=0)
        {
          count_0=count_0+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_6_months>0 && data_roll_ret_GBL.sql5[i].return_6_months <=10 )
        {
          count_1=count_1+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_6_months>10 && data_roll_ret_GBL.sql5[i].return_6_months <=20)
        {
          count_2=count_2+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_6_months>20 && data_roll_ret_GBL.sql5[i].return_6_months <=30)
        {
          count_3=count_3+1;
        }
        else if(data_roll_ret_GBL.sql5[i].return_6_months>30 )
        {
          count_4=count_4+1;
        }

        
       }
   }
   // alert(sum);
   avg=parseFloat(sum/data_roll_ret_GBL.sql5.length).toFixed(2);
   // alert(avg);
   var max_ret= Math.max.apply(null,max_min);
    var min_ret= Math.min.apply(null,max_min);
   $("#rolling_table_4").show();
   $("#rolling_s_name_4").html("<a href='/Mutual-Funds-India/"+rolling_table_GBL.scheme_info[4].schemecode+"' target='_blank'>"+schemename_GBL[4]+"</a>");

   $("#avg_4").html(avg);
   $("#max_4").html(max_ret.toFixed(2));
   $("#min_4").html(min_ret.toFixed(2));
   $("#lt_0_4").html((parseFloat(count_0/data_roll_ret_GBL.sql5.length)*100).toFixed(2))
   $("#lt_10_4").html((parseFloat(count_1/data_roll_ret_GBL.sql5.length)*100).toFixed(2))
   $("#lt_20_4").html((parseFloat(count_2/data_roll_ret_GBL.sql5.length)*100).toFixed(2))
   $("#lt_30_4").html((parseFloat(count_3/data_roll_ret_GBL.sql5.length)*100).toFixed(2))
   $("#gt_30_4").html((parseFloat(count_4/data_roll_ret_GBL.sql5.length)*100).toFixed(2))
 }
 if ( $(window).width() > 769) 
 {

     if(return_year=="1_mon")
     {
      test_graph_new_graph_rolling(schemename_GBL,arr_1_mon_1,arr_1_mon_2,arr_1_mon_3,arr_1_mon_4,arr_1_mon_5,return_year,color_arr); 
     }
     else if(return_year=="3_mon")
     {
      test_graph_new_graph_rolling(schemename_GBL,arr_3_mon_1,arr_3_mon_2,arr_3_mon_3,arr_3_mon_4,arr_3_mon_5,return_year,color_arr); 
     }
     else if(return_year=="6_mon")
     {
      test_graph_new_graph_rolling(schemename_GBL,arr_6_mon_1,arr_6_mon_2,arr_6_mon_3,arr_6_mon_4,arr_6_mon_5,return_year,color_arr); 
     }
     else if(return_year=="1_yr")
     {
      test_graph_new_graph_rolling(schemename_GBL,arr_1_yr_1,arr_1_yr_2,arr_1_yr_3,arr_1_yr_4,arr_1_yr_5,return_year,color_arr); 
     }
     else if(return_year=="3_yr")
     {
      test_graph_new_graph_rolling(schemename_GBL,arr_3_yr_1,arr_3_yr_2,arr_3_yr_3,arr_3_yr_4,arr_3_yr_5,return_year,color_arr); 
     }
     else if(return_year=="5_yr")
     {
      test_graph_new_graph_rolling(schemename_GBL,arr_5_yr_1,arr_5_yr_2,arr_5_yr_3,arr_5_yr_4,arr_5_yr_5,return_year,color_arr); 
     }
     else if(return_year=="7_yr")
     {
      test_graph_new_graph_rolling(schemename_GBL,arr_7_yr_1,arr_7_yr_2,arr_7_yr_3,arr_7_yr_4,arr_7_yr_5,return_year,color_arr); 
     }
     else if(return_year=="10_yr")
     {
      test_graph_new_graph_rolling(schemename_GBL,arr_10_yr_1,arr_10_yr_2,arr_10_yr_3,arr_10_yr_4,arr_10_yr_5,return_year,color_arr); 
     }
} 
else
{
  if(return_year=="1_mon")
     {
      test_graph_new_graph_rolling_small_screen(schemename_GBL,arr_1_mon_1,arr_1_mon_2,arr_1_mon_3,arr_1_mon_4,arr_1_mon_5,return_year,color_arr); 
     }
     else if(return_year=="3_mon")
     {
      test_graph_new_graph_rolling_small_screen(schemename_GBL,arr_3_mon_1,arr_3_mon_2,arr_3_mon_3,arr_3_mon_4,arr_3_mon_5,return_year,color_arr); 
     }
     else if(return_year=="6_mon")
     {
      test_graph_new_graph_rolling_small_screen(schemename_GBL,arr_6_mon_1,arr_6_mon_2,arr_6_mon_3,arr_6_mon_4,arr_6_mon_5,return_year,color_arr); 
     }
     else if(return_year=="1_yr")
     {
      test_graph_new_graph_rolling_small_screen(schemename_GBL,arr_1_yr_1,arr_1_yr_2,arr_1_yr_3,arr_1_yr_4,arr_1_yr_5,return_year,color_arr); 
     }
     else if(return_year=="3_yr")
     {
      test_graph_new_graph_rolling_small_screen(schemename_GBL,arr_3_yr_1,arr_3_yr_2,arr_3_yr_3,arr_3_yr_4,arr_3_yr_5,return_year,color_arr); 
     }
     else if(return_year=="5_yr")
     {
      test_graph_new_graph_rolling_small_screen(schemename_GBL,arr_5_yr_1,arr_5_yr_2,arr_5_yr_3,arr_5_yr_4,arr_5_yr_5,return_year,color_arr); 
     }
     else if(return_year=="7_yr")
     {
      test_graph_new_graph_rolling_small_screen(schemename_GBL,arr_7_yr_1,arr_7_yr_2,arr_7_yr_3,arr_7_yr_4,arr_7_yr_5,return_year,color_arr); 
     }
     else if(return_year=="10_yr")
     {
      test_graph_new_graph_rolling_small_screen(schemename_GBL,arr_10_yr_1,arr_10_yr_2,arr_10_yr_3,arr_10_yr_4,arr_10_yr_5,return_year,color_arr); 
     }
}

 }



function test_graph_new_graph_rolling(scheme_name,roll_ret1,roll_ret2,roll_ret3,roll_ret4,roll_ret5,return_year,color_arr)   //added on 6.3.2017
   {
   
        // alert(color_arr)
var seriesOptions = [],
                          seriesCounter = 0,
                          names = [];
                          // for(var i=0;i<scheme_name.length;i++)
                          console.log(scheme_name[0])
                          console.log(color_arr[0])

                          if(roll_ret1.length!=0)
                          {
                             // console.log("----------1----------");
                             // console.log(roll_ret1);
                            seriesOptions[0] = {
                                name: scheme_name[0],
                                data: roll_ret1,
                                color: color_arr[0] 
                            };
                          }

                          if(roll_ret2.length!=0)
                          {
                             // console.log("----------2----------");
                             // console.log(roll_ret2);
                            seriesOptions[1] = {
                                name: scheme_name[1],
                                data: roll_ret2,
                               color: color_arr[1] 
                            };
                          }
                          if(roll_ret3.length!=0)
                          {
                             console.log("----------3----------");
                             console.log(roll_ret3);
                            seriesOptions[2] = {
                                name: scheme_name[2],
                                data: roll_ret3,
                                color: color_arr[2] 
                            };
                          }
                          if(roll_ret4.length!=0)
                          {

                            seriesOptions[3] = {
                                name: scheme_name[3],
                                data: roll_ret4,
                                color: color_arr[3] 
                            };
                          }
                          if(roll_ret5.length!=0)
                          {

                            seriesOptions[4] = {
                                name: scheme_name[4],
                                data: roll_ret5,
                                color: color_arr[4] 
                            };
                          }


                            // if(nifty1.length > 0)
                            // {
                            //         seriesOptions[1] = {
                            //             name: index_name,
                            //             data: nifty1,
                            //             color: '#A8A8A8'
                            //             }; 
                            // }
                  
                        var selected=0;
                        //     console.log("-----------navrs---------")
                        //     console.log(navrs1.length)

                            if (roll_ret1.length >= 350  )
                        {
                              selected=4;
                        }
                        
                        else
                        {
                               selected=9;

                        }
                  



                         Highcharts.stockChart('rolling_chart', {

                          // rangeSelector: {     
                          //     selected: 4,
                          //     inputEnabled:false
                          // },
                          // yAxis: {
                          //     labels: {
                          //         formatter: function () {
                          //           console.log(this.value)
                          //             return (this.value > 0 ? ' + ' : '') + this.value + '%';
                          //         }
                          //     },
                          //     plotLines: [{
                          //         value: 0,
                          //         width: 2
                          //        // colors: ['#429EE9', '#A8A8A8']
    

                          //     }]
                          // },

                          // plotOptions: {
                          //     series: {
                          //         compare: 'percent',
                          //         showInNavigator: true,
                          //         colors: ['#429EE9', '#A8A8A8'],
                          //         states: {
                          //                   hover: {
                          //                       lineWidth: 2
                          //                   }
                          //               }

                          //     }
                          // },
                           legend: {
                                    enabled: true,
                                    align: 'right',
                                    borderColor: '#c0c1c1',
                                    itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "11px", "fontWeight": "normal" },
                                    borderWidth: 1,
                                    itemMarginTop: 10,
                                    itemMarginBottom: 10,
                                    y: 34,
                                    layout: 'vertical',
                                    verticalAlign: 'top',
                                    floating: false

                                   },

                          // tooltip: {
                          //     pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                          //     valueDecimals: 2,
                          //     split: true
                          // },
                          tooltip: {
                              // valuePrefix: '₹',
                               split: true,
                                valueDecimals: 1,
                                    formatter: function() {
                                      // console.log("-------------")
                                      // console.log(return_year)
                                        var s = [];
                                        // console.log(return_year)
                                        if(return_year=="1_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(1, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="3_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(3, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="5_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(5, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="7_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(7, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="10_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(10, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="1_mon")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(1, 'months').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="3_mon")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(3, 'months').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="6_mon")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(6, 'months').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        
                                        
                                        

                                        $.each(this.points, function(i, point) {
                                          // debugger;

                                            // console.log(point.series.color);
                                            // console.log(series.point.change);
                                            // console.log("---------------")
                                        //       if(point.series.name=="Return")
                                        //       {
                                        // s.push('<span style="color: #44a0ea ;font-weight:bold;">'+ point.series.name +' : '+
                                        //         commaSeparateNumber(parseFloat(point.y).toFixed(2))+'% <span>');
                                        //       }
                                        //       else
                                              {
                                          // s.push('<span style="color:'+point.series.color+';font-weight:bold;">'+ point.series.name +' : '+
                                                // commaSeparateNumber(parseFloat(point.y).toFixed(2)) +'% <span>');
                                          s.push('<span style="color:'+point.color+'">'+point.series.name+'</span>: <b>'+point.y.toFixed(2)+'%</b><br/>');
                                              // debugger;  
                                              }

                                        });

                                        return s.join('<br/>');
                                    },
                                    
                                    shared: true
                                },
                          // tooltip: {
                          //     pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                          //     valueDecimals: 2,
                          //     split: true
                          // },
                           credits: {
                                 text: 'RupeeVest',
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
                            },
                             {
                                type: 'year',
                                count: 10,
                                text: '10y'
                            }, {
                                type: 'all',
                                 // count: 1,
                                text: 'All'
                                
                            }],
                            
                            selected: selected,
                            inputEnabled:false
                        } 

                      }, function (chart) {

        // apply the date pickers
        setTimeout(function () {
            $('input.highcharts-range-selector', $(chart.container).parent())
                .datepicker();
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



function test_graph_new_graph_rolling_small_screen(scheme_name,roll_ret1,roll_ret2,roll_ret3,roll_ret4,roll_ret5,return_year,color_arr)   //added on 6.3.2017
   {
   
        // alert(color_arr)
var seriesOptions = [],
                          seriesCounter = 0,
                          names = [];
                          // for(var i=0;i<scheme_name.length;i++)
                          console.log(scheme_name[0])
                          console.log(color_arr[0])

                          if(roll_ret1.length!=0)
                          {
                             // console.log("----------1----------");
                             // console.log(roll_ret1);
                            seriesOptions[0] = {
                                name: scheme_name[0],
                                data: roll_ret1,
                                color: color_arr[0] 
                            };
                          }

                          if(roll_ret2.length!=0)
                          {
                             // console.log("----------2----------");
                             // console.log(roll_ret2);
                            seriesOptions[1] = {
                                name: scheme_name[1],
                                data: roll_ret2,
                               color: color_arr[1] 
                            };
                          }
                          if(roll_ret3.length!=0)
                          {
                             console.log("----------3----------");
                             console.log(roll_ret3);
                            seriesOptions[2] = {
                                name: scheme_name[2],
                                data: roll_ret3,
                                color: color_arr[2] 
                            };
                          }
                          if(roll_ret4.length!=0)
                          {

                            seriesOptions[3] = {
                                name: scheme_name[3],
                                data: roll_ret4,
                                color: color_arr[3] 
                            };
                          }
                          if(roll_ret5.length!=0)
                          {

                            seriesOptions[4] = {
                                name: scheme_name[4],
                                data: roll_ret5,
                                color: color_arr[4] 
                            };
                          }


                            // if(nifty1.length > 0)
                            // {
                            //         seriesOptions[1] = {
                            //             name: index_name,
                            //             data: nifty1,
                            //             color: '#A8A8A8'
                            //             }; 
                            // }
                  
                        var selected=0;
                        //     console.log("-----------navrs---------")
                        //     console.log(navrs1.length)

                            if (roll_ret1.length >= 350  )
                        {
                              selected=4;
                        }
                        
                        else
                        {
                               selected=9;

                        }
                  



                         Highcharts.stockChart('rolling_chart', {

                          // rangeSelector: {     
                          //     selected: 4,
                          //     inputEnabled:false
                          // },
                          // yAxis: {
                          //     labels: {
                          //         formatter: function () {
                          //           console.log(this.value)
                          //             return (this.value > 0 ? ' + ' : '') + this.value + '%';
                          //         }
                          //     },
                          //     plotLines: [{
                          //         value: 0,
                          //         width: 2
                          //        // colors: ['#429EE9', '#A8A8A8']
    

                          //     }]
                          // },

                          // plotOptions: {
                          //     series: {
                          //         compare: 'percent',
                          //         showInNavigator: true,
                          //         colors: ['#429EE9', '#A8A8A8'],
                          //         states: {
                          //                   hover: {
                          //                       lineWidth: 2
                          //                   }
                          //               }

                          //     }
                          // },
                           legend: {
                                    enabled: false,
                                    align: 'top',
                                    borderColor: '#c0c1c1',
                                    itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "11px", "fontWeight": "normal" },
                                    borderWidth: 1,
                                    itemMarginTop: 10,
                                    itemMarginBottom: 10,
                                    y: 34,
                                    layout: 'horizontal',
                                    verticalAlign: 'top',
                                    floating: true

                                   },

                          // tooltip: {
                          //     pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                          //     valueDecimals: 2,
                          //     split: true
                          // },
                          tooltip: {
                              // valuePrefix: '₹',
                               split: true,
                                valueDecimals: 1,
                                    formatter: function() {
                                      // console.log("-------------")
                                      // console.log(return_year)
                                        var s = [];
                                        // console.log(return_year)
                                        if(return_year=="1_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(1, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="3_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(3, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="5_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(5, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="7_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(7, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="10_yr")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(10, 'years').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="1_mon")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(1, 'months').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="3_mon")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(3, 'months').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        else if(return_year=="6_mon")
                                        {
                                          s.push('<span>'+ moment(new Date(this.x).toUTCString()).subtract(6, 'months').format('DD MMMM YYYY')+' - '+moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');
                                        }
                                        
                                        
                                        

                                        $.each(this.points, function(i, point) {
                                          // debugger;

                                            // console.log(point.series.color);
                                            // console.log(series.point.change);
                                            // console.log("---------------")
                                        //       if(point.series.name=="Return")
                                        //       {
                                        // s.push('<span style="color: #44a0ea ;font-weight:bold;">'+ point.series.name +' : '+
                                        //         commaSeparateNumber(parseFloat(point.y).toFixed(2))+'% <span>');
                                        //       }
                                        //       else
                                              {
                                          // s.push('<span style="color:'+point.series.color+';font-weight:bold;">'+ point.series.name +' : '+
                                                // commaSeparateNumber(parseFloat(point.y).toFixed(2)) +'% <span>');
                                          s.push('<span style="color:'+point.color+'">'+point.series.name+'</span>: <b>'+point.y.toFixed(2)+'%</b><br/>');
                                              // debugger;  
                                              }

                                        });

                                        return s.join('<br/>');
                                    },
                                    
                                    shared: true
                                },
                          // tooltip: {
                          //     pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                          //     valueDecimals: 2,
                          //     split: true
                          // },
                           credits: {
                                 text: 'RupeeVest',
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
                            },
                             {
                                type: 'year',
                                count: 10,
                                text: '10y'
                            }, {
                                type: 'all',
                                 // count: 1,
                                text: 'All'
                                
                            }],
                            
                            selected: selected,
                            inputEnabled:false
                        } 

                      }, function (chart) {

        // apply the date pickers
        setTimeout(function () {
            $('input.highcharts-range-selector', $(chart.container).parent())
                .datepicker();
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



  function test_graph(scheme_name,schemecode)
 {
  
     //alert("hiiiii");
    // alert(scheme_name);
    // alert(schemecode);

    $$.get(curr_ip+'functionalities/navgraph_new', {schemecode: schemecode},function (data1) 
         {
             var i;
             var navrs1=[];
             var data=JSON.parse(data1);
             console.log(data);
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
        });
return "True"
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
                            //console.log(seriesOptions);

                            if(nifty1.length > 0)
                            {
                                    seriesOptions[1] = {
                                        name: index_name,
                                        data: nifty1,
                                        color: '#A8A8A8'
                                        }; 
                            }
                  
                        



                         Highcharts.stockChart('container-0', {

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
                                 href: 'http://www.rupeevest.com',
                                 enabled: false
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
                            buttons: 
                            [
                            // {
                            //     type: 'month',
                            //     count: 1,
                            //     text: '1m'
                            // }, {
                            //     type: 'month',
                            //     count: 3,
                            //     text: '3m'
                            // },
                             {
                                type: 'month',
                                count: 6,
                                text: '6m'
                            },
                            // {
                            //     type: 'ytd',
                            //     text: 'YTD'
                            // },
                             {
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
                            
                            selected: 1
                        } 

                      }, function (chart) {

        // apply the date pickers
        setTimeout(function () {
            $('input.highcharts-range-selector', $(chart.container).parent())
                .datepicker();
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


// Start - sip- Return//


//  function test_graph_sip(scheme_name,schemecode,container_id,amount,frequency,start_date,end_date)
//  {
//     $.ajax({
//          type: 'GET',
//          url: '/functionalities/sip_return_graph',
//           data :{schemecode:schemecode,amount:amount,frequency:frequency,start_date:start_date,end_date:end_date},
//          dataType: 'json',
//          // data: { 'iin' : $('#client_name').val()},
//          success: function(data)
//          {
//              var i;
//              var navrs1=[];
//              var ratio=[];
            
//               var first_date,last_date;

//               var amt_invstd_tbl=0;
//               var cur_val=0;
//               var no_of_instlmnts=data.no_of_inst;
//               var abs_retn=0;
               
//               var xirr_val_ue=[];
//               var xirr_date =[]; 
//               // var scheme_classification=data.classification[0].classification;
//              // alert(scheme_classification);

//              // for(i=0;i<data.nav_data.length;i=i+1)
//              // {
//              //     var date2 = new Date(data.nav_data[i].navdate);
//              //      navrs1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.nav_data[i].navrs])
//              // }
//                var nifty1=[];
//                var index_name="";
//                for(i=0;i<data.array.length;i=i+1)
//              {
//                   var date2 = new Date(data.array[i].navdate); 
//                    if(i==0)
//                    {
//                        first_date = date2;
//                    }
//                   nifty1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.array[i].amount])
//                   amt_invstd_tbl = data.array[i].amount;
//                   // xirr_val_ue.push(-1000);
//                   // var dd = moment(date2).format('DD/MM/YYYY');

//                   // alert(date2);
//                   // var tmmmm = moment(date2);
//                   // alert(" moment js--->>"+tmmmm);
//                   // xirr_date.push(date2);
//                   // index_name = data.nifty_data[i].indexname
//              }   

//                 last_date= date2; 
//                 // console.log(first_date);
//                 // console.log(last_date);  
//               for(i=0;i<data.array.length;i=i+1)
//              {
//                  var date2 = new Date(data.nav_data[i].navdate);
//                  navrs1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.array[i].current_value])
//                  cur_val = parseFloat(data.array[i].current_value);
//              }
              
//               for(i=0;i<data.array.length;i=i+1)
//              {
//                  var date2 = new Date(data.nav_data[i].navdate);
//                  var nv =((data.array[i].current_value/data.array[i].amount) - 1)*100;
//                  ratio.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),nv])
//                  abs_retn = nv;
//              }
            
//              // alert(data.xirr[0].value);
//              // alert(data.xirr[0].date);

//              for(var i=0;i<data.xirr.length;i=i+1)
//              {
//                 xirr_val_ue.push(data.xirr[i].value);
//                 xirr_date.push(data.xirr[i].date);
//              }
            
//              var xirr = XIRR ( xirr_val_ue,xirr_date,0.1);
//              // console.log(xirr_val_ue);
//              // console.log(xirr_date);
//              xirr = parseFloat(xirr) * 100;
             
//            // setting the value in the info-table

//            $('#amt_invstd').text(commaSeparateNumber(amt_invstd_tbl));
//            $('#currnt_val').text(commaSeparateNumber(cur_val.toFixed(0)));
//            $('#no_inv').text(no_of_instlmnts);
//            $('#abs_ret').text(abs_retn.toFixed(2)+" %");
//            $('#xirr').text(xirr.toFixed(2));
              
//           first_date = moment(first_date).format('DD-MMM-YYYY');
//           last_date = moment(last_date).format('DD-MMM-YYYY');
   
//           $('#from_date').val(first_date);
//           $('#to_date').val(last_date); 


//           $('#fund_name').html("<a target ='_blank' href='/Mutual-Funds-India/"+data.fund_data[0].schemecode+"'>"+data.fund_data[0].s_name+"</a>");
//           // $('#fund_manger').html(data.fund_data[0].fund_mgr1);
//               // "<span id='classification' onclick=setvalue_asset_temp('"+data.fund_data[0].classification+"','asset')>"+data.fund_data[0].classification+"</span>"


//           $('#fund_category').html("<span id='classification' onclick=setvalue_asset_temp('"+data.fund_data[0].classification.replace(/ /g,'_')+"','asset')>"+data.fund_data[0].classification+"</span>");

//          test_graph_new_graph_sip(scheme_name,navrs1,nifty1,container_id,ratio)   //added on 6.3.2017
//     }
// });
//  }

function test_graph_sip(scheme_name,schemecode,container_id,amount,frequency,start_date,end_date)
 {


   var x = new Date();

    if ((x - Last_time_Stamp >= 5000) || (scheme_name_GBL != scheme_name) || (schemecode_GBL != schemecode) || (container_id_GBL != container_id) || (amount_GBL!= amount) || (frequency_GBL!= frequency) || (start_date_GBL!= start_date) || (end_date_GBL != end_date))
     {
        Last_time_Stamp = x;
        scheme_name_GBL = scheme_name;
        schemecode_GBL = schemecode;
        container_id_GBL = container_id;
        amount_GBL= amount;
        frequency_GBL = frequency;
        start_date_GBL = start_date;
        end_date_GBL = end_date;

        console.log(schemecode);
    console.log(amount);
    console.log(frequency);
    console.log(start_date);
    console.log(end_date);
    console.log("--------------");
 $$.get(curr_ip+'functionalities/sip_return_graph', {schemecode:schemecode,amount:amount,frequency:frequency,start_date:start_date,end_date:end_date},function (data) 
{

         //      $.ajax({
         // type: 'GET',
         // url: curr_ip+'functionalities/sip_return_graph',
         // //url: curr_ip+'functionalities/sip_return_graph',
         //  data :{schemecode:schemecode,amount:amount,frequency:frequency,start_date:start_date,end_date:end_date},
         // dataType: 'json',
         // // data: { 'iin' : $('#client_name').val()},
         // success: function(data)
         // {
          // console.log(data);
            var data = JSON.parse(data);

            console.log(data);
             var i;
             var navrs1=[];
             var ratio=[];
            
              var first_date,last_date;

              var amt_invstd_tbl=0;
              var cur_val=0;
              var no_of_instlmnts=data.no_of_inst;
              var abs_retn=0;
               
              var xirr_val_ue=[];
              var xirr_date =[]; 
              var inception_date= new Date(data.inception_date[0].inception_date);
        //        $('#from_date').datepicker('remove');
        //  $('#from_date').datepicker({
        //     format: 'dd-M-yyyy',
        //     startDate: inception_date,
        //      // endDate : '+0d',
        //     autoclose : true
        // })
            $("#from_date").datepicker("setStartDate", inception_date);
              // var scheme_classification=data.classification[0].classification;
             // alert(scheme_classification);

             // for(i=0;i<data.nav_data.length;i=i+1)
             // {
             //     var date2 = new Date(data.nav_data[i].navdate);
             //      navrs1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.nav_data[i].navrs])
             // }
               var nifty1=[];
               var index_name="";
               for(i=0;i<data.array.length;i=i+1)
             {
                  var date2 = new Date(data.array[i].navdate); 
                   if(i==0)
                   {
                       first_date = date2;
                   }
                  nifty1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.array[i].amount])
                  amt_invstd_tbl = data.array[i].amount;
                  // xirr_val_ue.push(-1000);
                  // var dd = moment(date2).format('DD/MM/YYYY');

                  // alert(date2);
                  // var tmmmm = moment(date2);
                  // alert(" moment js--->>"+tmmmm);
                  // xirr_date.push(date2);
                  // index_name = data.nifty_data[i].indexname
             }   

                last_date= date2; 
                // console.log(first_date);
                // console.log(last_date);  
              for(i=0;i<data.array.length;i=i+1)
             {
                 var date2 = new Date(data.nav_data[i].navdate);
                 navrs1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.array[i].current_value])
                 cur_val = parseFloat(data.array[i].current_value);
             }
              
              for(i=0;i<data.array.length;i=i+1)
             {
                 var date2 = new Date(data.nav_data[i].navdate);
                 var nv =((data.array[i].current_value/data.array[i].amount) - 1)*100;
                 ratio.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),nv])
                 abs_retn = nv;
             }
            
             // alert(data.xirr[0].value);
             // alert(data.xirr[0].date);

             for(var i=0;i<data.xirr.length;i=i+1)
             {
                xirr_val_ue.push(data.xirr[i].value);
                xirr_date.push(data.xirr[i].date);
             }
            
             // var xirr = XIRR ( xirr_val_ue,xirr_date,0.1);
             // console.log(xirr_val_ue);
             // console.log(xirr_date);
             // xirr = parseFloat(xirr) * 100;
             // console.log(data.calculated_xirr)
             xirr = parseFloat(data.calculated_xirr).toFixed(2);
             
           // setting the value in the info-table

           $('#amt_invstd').text(commaSeparateNumber(amt_invstd_tbl));
           $('#currnt_val').text(commaSeparateNumber(cur_val.toFixed(0)));
           $('#no_inv').text(no_of_instlmnts);
           $('#abs_ret').text(abs_retn.toFixed(2)+" %");
           $('#xirr').text(xirr);
              
          first_date = moment(first_date).format('DD-MMM-YYYY');
          last_date = moment(last_date).format('DD-MMM-YYYY');
   
          $('#from_date').val(first_date);
          $('#to_date').val(last_date); 

          $("#from_date").datepicker("update", first_date);
          $("#to_date").datepicker("update", last_date);
          
          $('#fund_name').html("<a href='/Mutual-Funds-India/"+data.fund_data[0].schemecode+"' target='_blank'>"+data.fund_data[0].s_name+"</a>");
          // $('#fund_manger').html(data.fund_data[0].fund_mgr1);
              // "<span id='classification' onclick=setvalue_asset_temp('"+data.fund_data[0].classification+"','asset')>"+data.fund_data[0].classification+"</span>"


          $('#fund_category').html("<span id='classification' onclick=setvalue_asset_temp('"+data.fund_data[0].classification.replace(/ /g,'_')+"','asset')>"+data.fund_data[0].classification+"</span>");

         test_graph_new_graph_sip(scheme_name,navrs1,nifty1,container_id,ratio)   //added on 6.3.2017
    // }
});
      }
 }


function test_graph_new_graph_sip(scheme_name,navrs1,nifty1,container_id,ratio)   //added on 6.3.2017
   {
                          var index_name="Current Value";
                          var seriesOptions = [],
                          seriesCounter = 0,
                          names = [];

                            seriesOptions[0] = {
                                name: "Worth Of Investment",
                                data: navrs1,
                                color: '#429EE9'
                            };
                          seriesOptions[1] = {
                                name: "Amount Invested",
                                data: nifty1,
                                color: '#A8A8A8'
                            };

                          // seriesOptions[2] = {
                          //       name: "Return",
                          //       data: ratio,
                          //       color: 'transparent',
                          //       showInLegend: false,
                          //       enableMouseTracking: false
                          //   };   


                       Highcharts.setOptions({
                            colors: ['#429EE9', '#A8A8A8'],
                            lang: {
                                     thousandsSep: ','
                                  }
                        }); 
                              Highcharts.stockChart(container_id, {

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
                                allButtonsEnabled: false,
                                buttons: [{
                                //     type: 'month',
                                //     count: 1,
                                //     text: '1m'
                                // }, {
                                //     type: 'month',
                                //     count: 3,
                                //     text: '3m'
                                // }, {
                                //     type: 'month',
                                //     count: 6,
                                //     text: '6m'
                                // }, {
                                //     type: 'ytd',
                                //     text: 'YTD'
                                // }, {
                                //     type: 'year',
                                //     count: 1,
                                //     text: '1y'
                                // }, {
                                //     type: 'year',
                                //     count: 2,
                                //     text: '2y'
                                // }, {
                                //     type: 'year',
                                //     count: 3,
                                //     text: '3y'
                                // }, {
                                //    type: 'year',
                                //    count: 5,
                                //    text: '5y'
                                // }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                
                                selected: 2
                            },
                             rangeSelector : {
                               inputEnabled:false,
                                enabled: false
                            },
                            plotOptions:{
                                series:{
                                    turboThreshold:5000//larger threshold or set to 0 to disable
                                }
                            },
                            navigator: {
                                enabled: false
                            },
                            series : seriesOptions,
                            xAxis: {
                                type: 'datetime',
                                 gridLineWidth: 1
                            },
                            yAxis: {                              
                                gridLineWidth: 1
                            },
                            scrollbar: {
                                enabled: false
                            },
                           legend: {
                                    enabled: true,
                                    backgroundColor: '#fff',
                                    align: 'center',
                                    borderColor: '#c0c1c1',
                                    itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "11px", "fontWeight": "normal"},
                                    borderWidth: 1,                                    
                                    layout: 'horizontal',
                                    verticalAlign: 'top',
                                    floating: true,
                                    y: -1
                                   },
                               // legend: {
                               //      enabled: true,
                               //      align: 'center',
                               //      borderColor: '#c0c1c1',
                               //      itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "11px", "fontWeight": "normal" },
                               //      borderWidth: 1,
                               //      y: 34,
                               //      layout: 'horizontal',
                               //      verticalAlign: 'top',
                               //      floating: true
                               //     },
                          // tooltip: {
                          //     valuePrefix: '₹',
                          //     pointFormat: '<span style="color:{series.color}"><bold>{series.name} : </bold></span> <b> <span style="color:{series.color}">{point.y}</span></b><br/>',
                          //     // footerFormat: '<span><bold>{series.name} : </bold></span> <b> <span>{point.y}</span></b><br/>',
                          //     valueDecimals: 1,
                          //     split: true
                          // },

                          tooltip: {
                              // valuePrefix: '₹',
                               split: true,
                                valueDecimals: 1,
                                    formatter: function() {
                                        var s = [];
                                        
                                        s.push('<span>'+ moment(new Date(this.x).toUTCString()).format('DD MMMM YYYY')+'</span>');

                                        $.each(this.points, function(i, point) {


                                        //       if(point.series.name=="Return")
                                        //       {
                                        // s.push('<span style="color: #44a0ea ;font-weight:bold;">'+ point.series.name +' : '+
                                        //         commaSeparateNumber(parseFloat(point.y).toFixed(2))+'% <span>');
                                        //       }
                                        //       else
                                              {
                                          s.push('<span style="color:'+point.series.color+';font-weight:bold;">'+ point.series.name +' : ₹'+
                                                commaSeparateNumber(parseFloat(point.y).toFixed(2)) +'<span>');
                                              }

                                        });

                                        return s.join('<br/>');
                                    },
                                    shared: true
                                },
                            
                          credits: {
                                 text: 'RupeeVest',
                                 href: 'https://www.rupeevest.com'
                                 // enabled: false
                            },
                            exporting: { enabled: false }
                        });


                  }

$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    onSelect: function () {
        // this.onchange();
        // this.onblur();
    }
});
// end - sip- Return//



 function asect_alloc(schemecode)
  {
    //console.log(schemecode);
    // debugger;
    $$.get(curr_ip+'functionalities/asect_allocation_chart', {schemecode: +schemecode},function (asect_alloc_ajax)
    {
        var asect_alloc = JSON.parse(asect_alloc_ajax);
        // console.log(asect_alloc);
        var sect_code=[];
        var hold_perc=[];
        var table_thead="<thead class='breadcrumb_3'><tr><th>Sector Name</th><th>Sector Percentage</th></thead>"
        var table_tbody_temp=""
        for(var i =0;i <= asect_alloc.asect_alloc_chart.length-1;i++)
        {
          var asect_data = asect_alloc.asect_alloc_chart[i];
          sect_code.push(asect_data.rupeevest_asect);
          hold_perc.push(asect_data.holdpercentage.toFixed(2));
          // debugger;
          table_tbody_temp=table_tbody_temp+"<tr><td>"+asect_data.rupeevest_asect+"</td><td>"+asect_data.holdpercentage.toFixed(2)+"</td></tr>";
        }
        //console.log(table_tbody_temp);
        var table_asset_data=table_thead+"<tbody>"+table_tbody_temp+"</tbody>";
        //console.log(table_asset_data);
        $("#asset_alloc_table").html("");
        $("#asset_alloc_table").html(table_asset_data);
        table_asset_data="";

    })
  get_peer_comparision(schemecode);
  return "True";
  }

  function asect_alloc_piechart(objText,objChart,color)
  {
        var seriesOptions = [];

        if(objText.length >0)
        {

          for(var i = 0; i < objText.length; i++){
            seriesOptions[i] = {
                    name:objText[i],
                    data: objChart[i],
                    color: color[i]
                                };

           }
        

        // As we're loading the data asynchronously, we don't know what order it will arrive. So
        // we keep a counter and create the chart when all the data is loaded.
    
            createChart1(seriesOptions);

        }
        else
        {
          $('#container-7').html("Asset Allocation Data Not Available");
          // alert("no data in asset alloc");
        }
        
        }



        function createChart1(seriesOptions) {
        var options = {
            chart: {
                renderTo: 'container-7',
                type: 'bar'
            },
            title: {
                text: ''
            },
         xAxis: {
                categories: [
                    ''
                ]
            },
        yAxis: {
            title: {
                text: '(in %)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '{series.name}: {point.y}',
            valueSuffix: ' %',
            useHTML: true
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'bottom',
            floating: false,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: []
    }
    
    chart = new Highcharts.chart(options);
        
        $.each(seriesOptions, function (itemNo, item) {
    // console.log(item.data);
   
            chart.addSeries({                        
                name: item.name,
                data: [item.data],
                color: item.color
            }, false);

        });
        chart.redraw();
}


  // console.log('type ::' +typeof objChart);
  // console.log(objChart);
  // var array1=[];
  // var array2=[];
  // var array3=[];
  // var array4=[];
  // for(var j=0;j<objChart.length;j++){
  //  if(j==0){
  //  array1.push(objChart[j].char);
  //  array1.push(objChart[j].value);
  //  }
  //  if(j==1){
  //  array2.push(objChart[j].char);
  //  array2.push(objChart[j].value);
  //  }
  //  if(j==2){
  //  array3.push(objChart[j].char);
  //  array3.push(objChart[j].value);
  //  }
  //  if(j==3){
  //  array4.push(objChart[j].char);
  //  array4.push(objChart[j].value);
  //  }
  // }
  // if(array1.length<1){
  //  array1=['W',0];
  // }
  // if(array2.length<1){
  //  array2=['X',0];
  // }
  // if(array3.length<1){
  //  array3=['Y',0];

  // }if(array4.length<1){
  //  array4=['Z',0];
  // }
  // console.log('array1');
  // console.log(array1);
  // console.log('array2');
  // console.log(array2);

  // $('#container-7').highcharts({
  //           chart: {
  //               plotBackgroundColor: null,
  //               plotBorderWidth: 0,
  //               plotShadow: false
  //           },
  //           title: {
  //               //text: 'EQUITY - 70<br>DEBT - 20<br>CASH - 10',
  //  text : objText,
  //               align: 'center',
  //               verticalAlign: 'middle',
  //                                       style: {
  //                           fontWeight: 'normal',
  //                           color: '#000'
  //                       },
  //               margin:50,
  //               x: 0,
  //               y: -15
  //           },
  //           exporting: { enabled: false },
  //           tooltip: {
  //               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  //           },
  //           plotOptions: {
  //               pie: {
  //                   dataLabels: {
  //                       enabled: false,
  //                       distance: -50,
  //                       style: {
  //                           fontWeight: 'bold',
  //                           color: 'white'
  //                       }
  //                   },
  //                   startAngle: -180,
  //                   endAngle: 180,
  //                   center: ['50%', '50%']
  //               }
  //           },
  //           series: [{
  //               type: 'pie',
  //               name: 'Asset Allocation',
  //               innerSize: '75%',
  //               data: [
  //  //['E', 98.8],['C', 1.2],['A',0],
  //  array1,array2,array3,array4,
  //  //['C',1.8],['E',98.2],
  //                   //['EQUITY', 70],['DEBT', 20],['CASH', 10],
  //  //objChart
  //                   /*{
  //                       name: 'Proprietary or Undetectable',
  //                       y: 0.4,
  //                       dataLabels: {
  //                           enabled: false
  //                       }
  //                   }*/
  //               ]
  //           }]
  //       });
        // Highcharts.chart('container-7', {
        // chart: {
        //     type: 'bar'
        // },
 
        // yAxis: {
            
        //     title: {
        //         text: '(in %)',
        //         align: 'high'
        //     },
        //     labels: {
        //         overflow: 'justify'
        //     }
        // },
        // tooltip: {
        //     valueSuffix: ' %'
        // },
        // plotOptions: {
        //     bar: {
        //         dataLabels: {
        //             enabled: true
        //         }
        //     }
        // },
        // legend: {
        //     layout: 'vertical',
        //     align: 'right',
        //     verticalAlign: 'top',
        //     x: 40,
        //     y: 80,
        //     floating: true,
        //     borderWidth: 1,
        //     backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        //     shadow: true
        // },
        // credits: {
        //     enabled: false
        // },
        // series: [{
        //     name: 'Year 1800',
        //     data: [107]
        // }, {
        //     name: 'Year 1900',
        //     data: [133]
        // }, {
        //     name: 'Year 2012',
        //     data: [-25]
        // }]
 //        series: [
 //        data1
 //        ]
 //    });

  // }




   
    
    //});
//return_bar();

//    function return_graph(tabValue)
// {
//  $.ajax({
//  type:'GET',
//  url: '/functionalities/get_returns_year',
//  datatype:'json',
//  success:function(return_data, textStatus, jqXHR) {
//  console.log(return_data);
//  var ry_data;
//  var returnYear = [];
//  var returnAvgYear = [];
//  var th = "<thead><tr><th>Historical Performance</th><th>2005</th><th>2006</th><th>2007</th><th>2008</th><th>2009</th><th>2010</th><th>2011</th><th>2012</th><th>2013</th><th>2014</th></tr></thead>";
//  for(var i =0;i <= return_data.returns_year.length-1;i++)
//  {
//  ry_data = return_data.returns_year[i];
//  var s_name = ry_data.s_name;
//  if(tabValue == "Annual Returns"){
//  for(var j=1;j<=10;j++){
//  var return_year = ry_data["return_year"+j];
//  console.log(return_year);
//  returnYear.push(return_year);
//  }

//  for(var j=1;j<=10;j++){
//  var return_avg_year = ry_data["avg_year"+j];
//  console.log(return_avg_year);
//  returnAvgYear.push(return_avg_year);
//  //tblData=th + "<tr><td>"+s_name+"</td><td>"+ry_data["avg_year"+j]+"</td></tr>";
//  }
//  }


//  if(tabValue == "Quarterly Returns"){
//  for(var j=1;j<=10;j++){
//  var return_quarter = ry_data["return_quarter"+j];
//  console.log(return_quarter);
//  returnYear.push(return_quarter);
//  }

//  for(var j=1;j<=10;j++){
//  var return_avg_quarter = ry_data["avg_quarter"+j];
//  console.log(return_avg_quarter);
//  returnAvgYear.push(return_avg_quarter);
//  }

//  }


//  if(tabValue == "Monthly Returns"){

//  for(var j=1;j<=10;j++){
//  var return_month = ry_data["return_month"+j];
//  console.log(return_month);
//  returnYear.push(return_month);
//  }

//  for(var j=1;j<=10;j++){
//  var return_avg_month = ry_data["avg_month"+j];
//  console.log(return_avg_month);
//  returnAvgYear.push(return_avg_month);
//  }

//  }

//  }
//  console.log("---Starts---");
//  console.log(returnYear);
//  console.log("---Ends---");
//  var obj={};
//  returns_barchart("text",returnYear,returnAvgYear);

//  for(var i =0;i <= return_data.returns_year.length-1;i++)
//  {
//  ry_data = return_data.returns_year[i];
//  var s_name = ry_data.s_name;
//  var classification = ry_data.classification;
//  var return_year1 = ry_data.return_year1;
//  var return_year2 = ry_data.return_year2;
//  var return_year3 = ry_data.return_year3;
//  var return_year4 = ry_data.return_year4;
//  var return_year5 = ry_data.return_year5;
//  var return_year6 = ry_data.return_year6;
//  var return_year7 = ry_data.return_year7;
//  var return_year8 = ry_data.return_year8;
//  var return_year9 = ry_data.return_year9;
//  var return_year10 = ry_data.return_year10;
//  var rank_year1 = ry_data.rank_year1;
//  var rank_year2 = ry_data.rank_year2;
//  var rank_year3 = ry_data.rank_year3;
//  var rank_year4 = ry_data.rank_year4;
//  var rank_year5 = ry_data.rank_year5;
//  var rank_year6 = ry_data.rank_year6;
//  var rank_year7 = ry_data.rank_year7;
//  var rank_year8 = ry_data.rank_year8;
//  var rank_year9 = ry_data.rank_year9;
//  var rank_year10 = ry_data.rank_year10;
//  var avg_year1 = ry_data.avg_year1;
//  var avg_year2 = ry_data.avg_year2;
//  var avg_year3 = ry_data.avg_year3;
//  var avg_year4 = ry_data.avg_year4;
//  var avg_year5 = ry_data.avg_year5;
//  var avg_year6 = ry_data.avg_year6;
//  var avg_year7 = ry_data.avg_year7;
//  var avg_year8 = ry_data.avg_year8;
//  var avg_year9 = ry_data.avg_year9;
//  var avg_year10 = ry_data.avg_year10;
//  var rank = "Rank";

//  var return_month1 = ry_data.return_month1;
//  var return_month2 = ry_data.return_month2;
//  var return_month3 = ry_data.return_month3;
//  var return_month4 = ry_data.return_month4;
//  var return_month5 = ry_data.return_month5;
//  var return_month6 = ry_data.return_month6;
//  var return_month7 = ry_data.return_month7;
//  var return_month8 = ry_data.return_month8;
//  var return_month9 = ry_data.return_month9;
//  var return_month10 = ry_data.return_month10;
//  var rank_month1 = ry_data.rank_month1;
//  var rank_month2 = ry_data.rank_month2;
//  var rank_month3 = ry_data.rank_month3;
//  var rank_month4 = ry_data.rank_month4;
//  var rank_month5 = ry_data.rank_month5;
//  var rank_month6 = ry_data.rank_month6;
//  var rank_month7 = ry_data.rank_month7;
//  var rank_month8 = ry_data.rank_month8;
//  var rank_month9 = ry_data.rank_month9;
//  var rank_month10 = ry_data.rank_month10;
//  var avg_month1 = ry_data.avg_month1;
//  var avg_month2 = ry_data.avg_month2;
//  var avg_month3 = ry_data.avg_month3;
//  var avg_month4 = ry_data.avg_month4;
//  var avg_month5 = ry_data.avg_month5;
//  var avg_month6 = ry_data.avg_month6;
//  var avg_month7 = ry_data.avg_month7;
//  var avg_month8 = ry_data.avg_month8;
//  var avg_month9 = ry_data.avg_month9;
//  var avg_month10 = ry_data.avg_month10;

//         var return_quarter1 = ry_data.return_quarter1;
//  var return_quarter2 = ry_data.return_quarter2;
//  var return_quarter3 = ry_data.return_quarter3;
//  var return_quarter4 = ry_data.return_quarter4;
//  var return_quarter5 = ry_data.return_quarter5;
//  var return_quarter6 = ry_data.return_quarter6;
//  var return_quarter7 = ry_data.return_quarter7;
//  var return_quarter8 = ry_data.return_quarter8;
//  var return_quarter9 = ry_data.return_quarter9;
//  var return_quarter10 = ry_data.return_quarter10;


//  var rank_quarter1 = ry_data.rank_quarter1;
//  var rank_quarter2 = ry_data.rank_quarter2;
//  var rank_quarter3 = ry_data.rank_quarter3;
//  var rank_quarter4 = ry_data.rank_quarter4;
//  var rank_quarter5 = ry_data.rank_quarter5;
//  var rank_quarter6 = ry_data.rank_quarter6;
//  var rank_quarter7 = ry_data.rank_quarter7;
//  var rank_quarter8 = ry_data.rank_quarter8;
//  var rank_quarter9 = ry_data.rank_quarter9;
//  var rank_quarter10 = ry_data.rank_quarter10;
//  var avg_quarter1 = ry_data.avg_quarter1;
//  var avg_quarter2 = ry_data.avg_quarter2;
//  var avg_quarter3 = ry_data.avg_quarter3;
//  var avg_quarter4 = ry_data.avg_quarter4;
//  var avg_quarter5 = ry_data.avg_quarter5;
//  var avg_quarter6 = ry_data.avg_quarter6;
//  var avg_quarter7 = ry_data.avg_quarter7;
//  var avg_quarter8 = ry_data.avg_quarter8;
//  var avg_quarter9 = ry_data.avg_quarter9;
//  var avg_quarter10 = ry_data.avg_quarter10;

//  var an1 = return_year1 - avg_year1;
//  var diff_year1 = an1.toFixed(2);
//  var an2 = return_year2 - avg_year2;
//  var diff_year2 = an2.toFixed(2);
//  var an3 = return_year3 - avg_year3;
//  var diff_year3 = an3.toFixed(2);
//  var an4 = return_year4 - avg_year4;
//  var diff_year4 = an4.toFixed(2);
//  var an5 = return_year5 - avg_year5;
//  var diff_year5 = an5.toFixed(2);
//  var an6 = return_year6 - avg_year6;
//  var diff_year6 = an6.toFixed(2);
//  var an7 = return_year7 - avg_year7;
//  var diff_year7 = an7.toFixed(2);
//  var an8 = return_year8 - avg_year8;
//  var diff_year8 = an8.toFixed(2);
//  var an9 = return_year9 - avg_year9;
//  var diff_year9 = an9.toFixed(2);
//  var an10 = return_year10 - avg_year10;
//  var diff_year10 = an10.toFixed(2);

//  var m1 = return_month1 - avg_month1;
//  var diff_month1 = m1.toFixed(2);
//  var m2 = return_month2 - avg_month2;
//                 var diff_month2 = m2.toFixed(2);

//  var m3 = return_month3 - avg_month3;
//  var diff_month3 = m3.toFixed(2);
//  var m4 = return_month4 - avg_month4;
//  var diff_month4 = m4.toFixed(2);
//  var m5 = return_month5 - avg_month5;
//  var diff_month5 = m5.toFixed(2);
//  var m6 = return_month6 - avg_month6;
//  var diff_month6 = m6.toFixed(2);
//  var m7 = return_month7 - avg_month7;
//  var diff_month7 = m7.toFixed(2);
//  var m8 = return_month8 - avg_month8;
//  var diff_month8 = m8.toFixed(2);
//  var m9 = return_month9 - avg_month9;
//  var diff_month9 = m9.toFixed(2);
//  var m10 = return_month10 - avg_month10;
//  var diff_month10 = m10.toFixed(2);
//  var q1 = return_quarter1 - avg_quarter1;
//  var diff_quarter1 = q1.toFixed(2);
//  var q2 = return_quarter2 - avg_quarter2;
//  var diff_quarter2 = q2.toFixed(2);
//  var q3 = return_quarter3 - avg_quarter3;
//  var diff_quarter3 = q3.toFixed(2);
//  var q4 = return_quarter4 - avg_quarter4;
//  var diff_quarter4 = q4.toFixed(2);
//  var q5 = return_quarter5 - avg_quarter5;
//  var diff_quarter5 = q5.toFixed(2);
//  var q6 = return_quarter6 - avg_quarter6;
//  var diff_quarter6 = q6.toFixed(2);
//  var q7 = return_quarter7 - avg_quarter7;
//  var diff_quarter7 = q7.toFixed(2);
//  var q8 = return_quarter8 - avg_quarter8;
//  var diff_quarter8 = q8.toFixed(2);
//  var q9 = return_quarter9 - avg_quarter9;
//  var diff_quarter9 = q9.toFixed(2);
//  var q10 = return_quarter10 - avg_quarter10;
//  var diff_quarter10 = q10.toFixed(2);
//  var category = ry_data.classification;

//  if(i == 0)
//  {


//  if(tabValue == "Annual Returns"){
//  tblData=th + "<tr><td>"+s_name+"</td><td>"+return_year1+"</td><td>"+return_year2+"</td><td>"+return_year3+"</td><td>"+return_year4+"</td><td>"+return_year5+"</td><td>"+return_year6+"</td><td>"+return_year7+"</td><td>"+return_year8+"</td><td>"+return_year9+"</td><td>"+return_year10+"</td></tr>";
//  tblData = tblData + "<tr><td> Category ("+classification+")</td><td>"+avg_year1+"</td><td>"+avg_year2+"</td><td>"+avg_year3+"</td><td>"+avg_year4+"</td><td>"+avg_year5+"</td><td>"+avg_year6+"</td><td>"+avg_year7+"</td><td>"+avg_year8+"</td><td>"+avg_year9+"</td><td>"+avg_year10+"</td></tr>";
//  tblData = tblData + "<tr><td> -/+Category ("+category +")</td><td>"+diff_year1+"</td><td>"+diff_year2+"</td><td>"+diff_year3+"</td><td>"+diff_year4+"</td><td>"+diff_year5+"</td><td>"+diff_year6+"</td><td>"+diff_year7+"</td><td>"+diff_year8+"</td><td>"+diff_year9+"</td><td>"+diff_year10+"</td></tr>";
//  tblData = tblData + "<tr><td>"+rank+"</td><td>"+rank_year1+"</td><td>"+rank_year2+"</td><td>"+rank_year3+"</td><td>"+rank_year4+"</td><td>"+rank_year5+"</td><td>"+rank_year6+"</td><td>"+rank_year7+"</td><td>"+rank_year8+"</td><td>"+rank_year9+"</td><td>"+rank_year10+"</td></tr>";
//  }

//  if(tabValue == "Quarterly Returns"){
//  tblData=th + "<tr><td>"+s_name+"</td><td>"+return_quarter1+"</td><td>"+return_quarter2+"</td><td>"+return_quarter3+"</td><td>"+return_quarter4+"</td><td>"+return_quarter5+"</td><td>"+return_quarter6+"</td><td>"+return_quarter7+"</td><td>"+return_quarter8+"</td><td>"+return_quarter9+"</td><td>"+return_quarter10+"</td></tr>";
//  tblData = tblData + "<tr><td> Category ("+classification+")</td><td>"+avg_quarter1+"</td><td>"+avg_quarter2+"</td><td>"+avg_quarter3+"</td><td>"+avg_quarter4+"</td><td>"+avg_quarter5+"</td><td>"+avg_quarter6+"</td><td>"+avg_quarter7+"</td><td>"+avg_quarter8+"</td><td>"+avg_quarter9+"</td><td>"+avg_quarter10+"</td></tr>";
//  tblData = tblData + "<tr><td> -/+Category ("+category +")</td><td>"+  diff_quarter1 +"</td><td>"+ diff_quarter2+"</td><td>"+ diff_quarter3 +"</td><td>"+ diff_quarter4+"</td><td>"+ diff_quarter5 +"</td><td>"+ diff_quarter6 +"</td><td>"+ diff_quarter7 +"</td><td>"+ diff_quarter8 +"</td><td>"+ diff_quarter9+"</td><td>"+ diff_quarter10+"</td></tr>";
//  tblData = tblData + "<tr><td>"+rank+"</td><td>"+rank_quarter1+"</td><td>"+rank_quarter2+"</td><td>"+rank_quarter3+"</td><td>"+rank_quarter4+"</td><td>"+rank_quarter5+"</td><td>"+rank_quarter6+"</td><td>"+rank_quarter7+"</td><td>"+rank_quarter8+"</td><td>"+rank_quarter9+"</td><td>"+rank_quarter10+"</td></tr>";
//  }
//  if(tabValue == "Monthly Returns"){
//                      tblData=th + "<tr><td>"+s_name+"</td><td>"+return_month1+"</td><td>"+return_month2+"</td><td>"+return_month3+"</td><td>"+return_month4+"</td><td>"+return_month5+"</td><td>"+return_month6+"</td><td>"+return_month7+"</td><td>"+return_month8+"</td><td>"+return_month9+"</td><td>"+return_month10+"</td></tr>";
//  tblData = tblData + "<tr><td> Category ("+classification+")</td><td>"+avg_month1+"</td><td>"+avg_month2+"</td><td>"+avg_month3+"</td><td>"+avg_month4+"</td><td>"+avg_month5+"</td><td>"+avg_month6+"</td><td>"+avg_month7+"</td><td>"+avg_month8+"</td><td>"+avg_month9+"</td><td>"+avg_month10+"</td></tr>";
//  tblData = tblData + "<tr><td>-/+Category ("+category +")</td><td>"+diff_month1+"</td><td>"+diff_month2+"</td><td>"+diff_month3+"</td><td>"+diff_month4+"</td><td>"+diff_month5+"</td><td>"+diff_month6+"</td><td>"+diff_month7+"</td><td>"+diff_month8+"</td><td>"+diff_month9+"</td><td>"+diff_month10+"</td></tr>";
//  tblData = tblData + "<tr><td>"+rank+"</td><td>"+rank_month1+"</td><td>"+rank_month2+"</td><td>"+rank_month3+"</td><td>"+rank_month4+"</td><td>"+rank_month5+"</td><td>"+rank_month6+"</td><td>"+rank_month7+"</td><td>"+rank_month8+"</td><td>"+rank_month9+"</td><td>"+rank_month10+"</td></tr>";
//  }

//  }


//  else{

//  //tblData = tblData + "<tr class='active'><td>Category Average</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr><td>Rank Within Category</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr class=active><td>Number of funds in category</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr><td>As on April XYZ</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr>";
//  }

//  $("#yearreturn").html("");
//  $("#yearreturn").html(tblData);

// }
//                 },

//  error:function(jqXHR, textStatus, errorThrown) {
//  alert("AJAX Error:" + textStatus);
//  }
//             });

// }

// function returns_barchart(objText,returnYear,returnAvgYear)
// {

//  $('#container-6').highcharts({
//                 chart: {
//                     type: 'column'
//                 },
//                 title: {
//                     text: ''
//                 },
//                 exporting: { enabled: false },
//                 xAxis: {
//                     categories: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015']
//                 },
//                 yAxis: {
//                     title: {
//                         text: 'Returns ( % )'
//                     },
//                     categories: ['-100', '-50', '0', '50', '100', '150']
//                 },
//                 credits: {
//                     enabled: true
//                 },
//                 series: [{
//                     name: 'HDFC Top 200 Fund',
//                     data: returnYear
//                 },
//                 {
//                     name: 'Equity: Large Cap',
//                     data: returnAvgYear
//                 }]
//             });
//         }
function return_graph(tabValue,schemecode)
{


  $.ajax({
  type:'GET',
  url: '/functionalities/get_returns_year',
      data :{schemecode:schemecode},
  datatype:'json',
  success:function(return_data, textStatus, jqXHR) {
  // console.log(return_data);
  var ry_data;
  var returnYear = [];
  var returnAvgYear = [];
  var year = [];
       var mon=[];
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  var k=[2,5,8,11];
  
  for(var i =0;i <= (return_data.returns_year.length-1);i++)
  {
  ry_data = return_data.returns_year[i];
  var s_name = ry_data.s_name;
  if(tabValue == "Annual Returns"){
  // alert("Annual");
  var d = new Date();
  var n = d.getFullYear()-10;
  for (var j=0;j<10;j++)
  {
  year.push(n);
  n=n+1;
  }
  for(var j=1;j<=10;j++){
  var return_year = ry_data["return_year"+j];
  // console.log(return_year);
  returnYear.push(return_year);
  }

  for(var j=1;j<=10;j++){
  var return_avg_year = ry_data["avg_year"+j];
  // console.log(return_avg_year);
  returnAvgYear.push(return_avg_year);
  //tblData=th + "<tr><td>"+s_name+"</td><td>"+ry_data["avg_year"+j]+"</td></tr>";
  }
  }


  if(tabValue == "Quarterly Returns"){
  // alert("Quarterly");
  // var d = new Date();
  // var n = d.getMonth()-1;
  // var y = d.getFullYear();
  // var f = y.toString().substring(2);
  // if (n>=10 && n<=12)
  // {
  //  n=8;
  // }
  // else if(n>=6 && n<=9)
  // {
  //  n=5;
  // }
  // else if(n>=3 && n<=5)
  // {
  //  n=2;
  // }
  // else
  // {
  //  n=11;
  // }
  // for (var j=0;j<10;j++)
  // {
  
  //  year.push(monthNames[n]+" "+f);
  //  var a = k.indexOf(n);
  //  if (a==0)
  //  {
  //  n=11;
  //  f=f-1;
  //  }
  //  else
  //  {
  //  n=n-3;
  //  }
  // }

      var qth_header = return_data.ten_quarters;
      var qth_split = qth_header.split(",");
      for (var qi=0;qi<=qth_split.length-1;qi++)
      {
        year.push(qth_split[qi]);
      }
  for(var j=1;j<=10;j++){
  var return_quarter = ry_data["return_quarter"+j];
  // console.log(return_quarter);
  returnYear.push(return_quarter);
  }

  for(var j=1;j<=10;j++){
  var return_avg_quarter = ry_data["avg_quarter"+j];
  // console.log(return_avg_quarter);
  returnAvgYear.push(return_avg_quarter);
  }

  }


  if(tabValue == "Monthly Returns"){
  // alert("monthly");
  // var d = new Date();
  // var n = d.getMonth()-1;
     //      var y = d.getFullYear();
     //      var f = y.toString().substring(2);
         

     //      if (n==0)
     //      {
     //        n=12;
     //        f=f-1
     //      }
          
     //          for(var i=0;i<10;i++)
     //          {
     //            mon.push(n);
     //            n=n-1;
     //            if (n==-1)
     //            {
     //              n=12;
     //            }

     //          }
     //          var c=9;
     //          console.log(mon);
  
  // for (var j=0;j<10;j++)
  // {
            
  //  year.push(monthNames[mon[c]-1]+" " +f);
  //  c=c-1;
  //  if (mon[c]==0)
  //  {
  //  f=f-1;
  //  }
  // }
          var mth_header = return_data.ten_months;
      var mth_split = mth_header.split(",");
          for (var mi=0;mi<=mth_split.length-1;mi++)
      {
        year.push(mth_split[mi]);
      }
      // mth = mth + "</tr></thead>";

      
  for(var j=1;j<=10;j++){
  var return_month = ry_data["return_month"+j];
  // console.log(return_month);
  returnYear.push(return_month);
  }

  for(var j=1;j<=10;j++){
  var return_avg_month = ry_data["avg_month"+j];
  // console.log(return_avg_month);
  returnAvgYear.push(return_avg_month);
  }

  }

  }
  console.log("<<<--------return---year------>>>");
  console.log(returnYear);
  var obj={};

      $("#yearreturn").html("");

      if(return_data.returns_year.length > 0)
      {
          returns_barchart("text",returnYear,returnAvgYear,year,return_data.returns_year[0].s_name,return_data.returns_year[0].classification);
      }
      else
      {
          
            $("#yearreturn").html("Historical Return Data not available.");
         
      }
  

  var th = "<thead><tr><th></th><th>"+year[0]+"</th><th>"+year[1]+"</th><th>"+year[2]+"</th><th>"+year[3]+"</th><th>"+year[4]+"</th><th>"+year[5]+"</th><th>"+year[6]+"</th><th>"+year[7]+"</th><th>"+year[8]+"</th><th>"+year[9]+"</th></tr></thead>";
   for(var i =0;i <= return_data.returns_year.length-1;i++)
      // for(var i =return_data.returns_year.length-1;i >= 0;i--)
  { 

         d
  ry_data = return_data.returns_year[i];
  var s_name = ry_data.s_name;
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
        // if (return_year10 == 0) return_year10 = '-';
  var rank_year1 = ry_data.rank_year1;
  var rank_year2 = ry_data.rank_year2;
  var rank_year3 = ry_data.rank_year3;
  var rank_year4 = ry_data.rank_year4;
  var rank_year5 = ry_data.rank_year5;
  var rank_year6 = ry_data.rank_year6;
  var rank_year7 = ry_data.rank_year7;
  var rank_year8 = ry_data.rank_year8;
  var rank_year9 = ry_data.rank_year9;
  var rank_year10 = ry_data.rank_year10;
  var avg_year1 = ry_data.avg_year1;
  var avg_year2 = ry_data.avg_year2;
  var avg_year3 = ry_data.avg_year3;
  var avg_year4 = ry_data.avg_year4;
  var avg_year5 = ry_data.avg_year5;
  var avg_year6 = ry_data.avg_year6;
  var avg_year7 = ry_data.avg_year7;
  var avg_year8 = ry_data.avg_year8;
  var avg_year9 = ry_data.avg_year9;
  var avg_year10 = ry_data.avg_year10;
  var rank = "Rank (in Category)";

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
  var rank_month1 = ry_data.rank_month1;
  var rank_month2 = ry_data.rank_month2;
  var rank_month3 = ry_data.rank_month3;
  var rank_month4 = ry_data.rank_month4;
  var rank_month5 = ry_data.rank_month5;
  var rank_month6 = ry_data.rank_month6;
  var rank_month7 = ry_data.rank_month7;
  var rank_month8 = ry_data.rank_month8;
  var rank_month9 = ry_data.rank_month9;
  var rank_month10 = ry_data.rank_month10;
  var avg_month1 = ry_data.avg_month1;
  var avg_month2 = ry_data.avg_month2;
  var avg_month3 = ry_data.avg_month3;
  var avg_month4 = ry_data.avg_month4;
  var avg_month5 = ry_data.avg_month5;
  var avg_month6 = ry_data.avg_month6;
  var avg_month7 = ry_data.avg_month7;
  var avg_month8 = ry_data.avg_month8;
  var avg_month9 = ry_data.avg_month9;
  var avg_month10 = ry_data.avg_month10;

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


  var rank_quarter1 = ry_data.rank_quarter1;
  var rank_quarter2 = ry_data.rank_quarter2;
  var rank_quarter3 = ry_data.rank_quarter3;
  var rank_quarter4 = ry_data.rank_quarter4;
  var rank_quarter5 = ry_data.rank_quarter5;
  var rank_quarter6 = ry_data.rank_quarter6;
  var rank_quarter7 = ry_data.rank_quarter7;
  var rank_quarter8 = ry_data.rank_quarter8;
  var rank_quarter9 = ry_data.rank_quarter9;
  var rank_quarter10 = ry_data.rank_quarter10;
  var avg_quarter1 = ry_data.avg_quarter1;
  var avg_quarter2 = ry_data.avg_quarter2;
  var avg_quarter3 = ry_data.avg_quarter3;
  var avg_quarter4 = ry_data.avg_quarter4;
  var avg_quarter5 = ry_data.avg_quarter5;
  var avg_quarter6 = ry_data.avg_quarter6;
  var avg_quarter7 = ry_data.avg_quarter7;
  var avg_quarter8 = ry_data.avg_quarter8;
  var avg_quarter9 = ry_data.avg_quarter9;
  var avg_quarter10 = ry_data.avg_quarter10;

  var an1 = return_year1 - avg_year1;
  var diff_year1 = an1.toFixed(2);
        if (return_year1 == '-') diff_year1 ='-';
  var an2 = return_year2 - avg_year2;
  var diff_year2 = an2.toFixed(2);
        if (return_year2 == '-') diff_year2 ='-';
  var an3 = return_year3 - avg_year3;
  var diff_year3 = an3.toFixed(2);
        if (return_year3 == '-') diff_year3 ='-';
  var an4 = return_year4 - avg_year4;
  var diff_year4 = an4.toFixed(2);
        if (return_year4 == '-') diff_year4 ='-';
  var an5 = return_year5 - avg_year5;
  var diff_year5 = an5.toFixed(2);
        if (return_year5 == '-') diff_year5 ='-';
  var an6 = return_year6 - avg_year6;
  var diff_year6 = an6.toFixed(2);
        if (return_year6 == '-') diff_year6 ='-';
  var an7 = return_year7 - avg_year7;
  var diff_year7 = an7.toFixed(2);
        if (return_year7 == '-') diff_year7 ='-';
  var an8 = return_year8 - avg_year8;
  var diff_year8 = an8.toFixed(2);
        if (return_year8 == '-') diff_year8 ='-';
  var an9 = return_year9 - avg_year9;
  var diff_year9 = an9.toFixed(2);
        if (return_year9 == '-') diff_year9 ='-';
  var an10 = return_year10 - avg_year10;
  var diff_year10 = an10.toFixed(2);
        if (return_year10 == '-') diff_year10 ='-';

  var m1 = return_month1 - avg_month1;
  var diff_month1 = m1.toFixed(2);
         if (return_month1 == '-') diff_month1 ='-';
  var m2 = return_month2 - avg_month2;
        var diff_month2 = m2.toFixed(2);
         if (return_month2 == '-') diff_month2 ='-';
  var m3 = return_month3 - avg_month3;
  var diff_month3 = m3.toFixed(2);
         if (return_month3 == '-') diff_month3 ='-';
  var m4 = return_month4 - avg_month4;
  var diff_month4 = m4.toFixed(2);
         if (return_month4 == '-') diff_month4 ='-';
  var m5 = return_month5 - avg_month5;
  var diff_month5 = m5.toFixed(2);
         if (return_month5 == '-') diff_month5 ='-';
  var m6 = return_month6 - avg_month6;
  var diff_month6 = m6.toFixed(2);
         if (return_month6 == '-') diff_month6 ='-';
  var m7 = return_month7 - avg_month7;
  var diff_month7 = m7.toFixed(2);
         if (return_month7 == '-') diff_month7 ='-';
  var m8 = return_month8 - avg_month8;
  var diff_month8 = m8.toFixed(2);
         if (return_month8 == '-') diff_month8 ='-';
  var m9 = return_month9 - avg_month9;
  var diff_month9 = m9.toFixed(2);
         if (return_month9 == '-') diff_month9 ='-';
  var m10 = return_month10 - avg_month10;
  var diff_month10 = m10.toFixed(2);
         if (return_month10 == '-') diff_month10 ='-';
  
        var q1 = return_quarter1 - avg_quarter1;
  var diff_quarter1 = q1.toFixed(2);
         if (return_quarter1 == '-') diff_quarter1 ='-';
  var q2 = return_quarter2 - avg_quarter2;
  var diff_quarter2 = q2.toFixed(2);
         if (return_quarter2 == '-') diff_quarter2 ='-';
  var q3 = return_quarter3 - avg_quarter3;
  var diff_quarter3 = q3.toFixed(2);
         if (return_quarter3 == '-') diff_quarter3 ='-';
  var q4 = return_quarter4 - avg_quarter4;
  var diff_quarter4 = q4.toFixed(2);
         if (return_quarter4 == '-') diff_quarter4 ='-';
  var q5 = return_quarter5 - avg_quarter5;
  var diff_quarter5 = q5.toFixed(2);
         if (return_quarter5 == '-') diff_quarter5 ='-';
  var q6 = return_quarter6 - avg_quarter6;
  var diff_quarter6 = q6.toFixed(2);
         if (return_quarter6 == '-') diff_quarter6 ='-';
  var q7 = return_quarter7 - avg_quarter7;
  var diff_quarter7 = q7.toFixed(2);
         if (return_quarter7 == '-') diff_quarter7 ='-';
  var q8 = return_quarter8 - avg_quarter8;
  var diff_quarter8 = q8.toFixed(2);
         if (return_quarter8 == '-') diff_quarter8 ='-';
  var q9 = return_quarter9 - avg_quarter9;
  var diff_quarter9 = q9.toFixed(2);
         if (return_quarter9 == '-') diff_quarter9 ='-';
  var q10 = return_quarter10 - avg_quarter10;
  var diff_quarter10 = q10.toFixed(2);
         if (return_quarter10 == '-') diff_quarter10 ='-';
  var category = ry_data.classification;

        var num_funds_year1 = ry_data.num_funds_year1;
        var num_funds_year2 = ry_data.num_funds_year2;
        var num_funds_year3 = ry_data.num_funds_year3;
        var num_funds_year4 = ry_data.num_funds_year4;
        var num_funds_year5 = ry_data.num_funds_year5;
        var num_funds_year6 = ry_data.num_funds_year6;
        var num_funds_year7 = ry_data.num_funds_year7;
        var num_funds_year8 = ry_data.num_funds_year8;
        var num_funds_year9 = ry_data.num_funds_year9;
        var num_funds_year10 = ry_data.num_funds_year10;

        var num_funds_quater1 = ry_data.num_funds_quater1;
        var num_funds_quater2 = ry_data.num_funds_quater2;
        var num_funds_quater3 = ry_data.num_funds_quater3;
        var num_funds_quater4 = ry_data.num_funds_quater4;
        var num_funds_quater5 = ry_data.num_funds_quater5;
        var num_funds_quater6 = ry_data.num_funds_quater6;
        var num_funds_quater7 = ry_data.num_funds_quater7;
        var num_funds_quater8 = ry_data.num_funds_quater8;
        var num_funds_quater9 = ry_data.num_funds_quater9;
        var num_funds_quater10 = ry_data.num_funds_quater10;

        var num_funds_month1 = ry_data.num_funds_month1;
        var num_funds_month2 = ry_data.num_funds_month2;
        var num_funds_month3 = ry_data.num_funds_month3;
        var num_funds_month4 = ry_data.num_funds_month4;
        var num_funds_month5 = ry_data.num_funds_month5;
        var num_funds_month6 = ry_data.num_funds_month6;
        var num_funds_month7 = ry_data.num_funds_month7;
        var num_funds_month8 = ry_data.num_funds_month8;
        var num_funds_month9 = ry_data.num_funds_month9;
        var num_funds_month10 = ry_data.num_funds_month10;



        


  if(i == 0)
  {


  if(tabValue == "Annual Returns"){
  tblData=th + "<tr><td>"+s_name+"</td><td>"+return_year10+"</td><td>"+return_year9+"</td><td>"+return_year8+"</td><td>"+return_year7+"</td><td>"+return_year6+"</td><td>"+return_year5+"</td><td>"+return_year4+"</td><td>"+return_year3+"</td><td>"+return_year2+"</td><td>"+return_year1+"</td></tr>";
  tblData = tblData + "<tr><td>Category Avg.</td><td>"+avg_year10+"</td><td>"+avg_year9+"</td><td>"+avg_year8+"</td><td>"+avg_year7+"</td><td>"+avg_year6+"</td><td>"+avg_year5+"</td><td>"+avg_year4+"</td><td>"+avg_year3+"</td><td>"+avg_year2+"</td><td>"+avg_year1+"</td></tr>";
  tblData = tblData + "<tr><td>+/- Category</td><td>"+diff_year10+"</td><td>"+diff_year9+"</td><td>"+diff_year8+"</td><td>"+diff_year7+"</td><td>"+diff_year6+"</td><td>"+diff_year5+"</td><td>"+diff_year4+"</td><td>"+diff_year3+"</td><td>"+diff_year2+"</td><td>"+diff_year1+"</td></tr>";
  tblData = tblData + "<tr><td>"+rank+"</td><td>"+rank_year10+"</td><td>"+rank_year9+"</td><td>"+rank_year8+"</td><td>"+rank_year7+"</td><td>"+rank_year6+"</td><td>"+rank_year5+"</td><td>"+rank_year4+"</td><td>"+rank_year3+"</td><td>"+rank_year2+"</td><td>"+rank_year1+"</td></tr>";
            tblData = tblData + "<tr><td>No. of Funds (in Cat.)</td><td>"+num_funds_year10+"</td><td>"+num_funds_year9+"</td><td>"+num_funds_year8+"</td><td>"+num_funds_year7+"</td><td>"+num_funds_year6+"</td><td>"+num_funds_year5+"</td><td>"+num_funds_year4+"</td><td>"+num_funds_year3+"</td><td>"+num_funds_year2+"</td><td>"+num_funds_year1+"</td></tr>";
  }

  if(tabValue == "Quarterly Returns"){
  // tblData=th + "<tr><td>"+s_name+"</td><td>"+return_quarter1+"</td><td>"+return_quarter2+"</td><td>"+return_quarter3+"</td><td>"+return_quarter4+"</td><td>"+return_quarter5+"</td><td>"+return_quarter6+"</td><td>"+return_quarter7+"</td><td>"+return_quarter8+"</td><td>"+return_quarter9+"</td><td>"+return_quarter10+"</td></tr>";
  // tblData = tblData + "<tr><td> Category ("+classification+")</td><td>"+avg_quarter1+"</td><td>"+avg_quarter2+"</td><td>"+avg_quarter3+"</td><td>"+avg_quarter4+"</td><td>"+avg_quarter5+"</td><td>"+avg_quarter6+"</td><td>"+avg_quarter7+"</td><td>"+avg_quarter8+"</td><td>"+avg_quarter9+"</td><td>"+avg_quarter10+"</td></tr>";
  // tblData = tblData + "<tr><td> -/+Category ("+category +")</td><td>"+  diff_quarter1 +"</td><td>"+ diff_quarter2+"</td><td>"+ diff_quarter3 +"</td><td>"+ diff_quarter4+"</td><td>"+ diff_quarter5 +"</td><td>"+ diff_quarter6 +"</td><td>"+ diff_quarter7 +"</td><td>"+ diff_quarter8 +"</td><td>"+ diff_quarter9+"</td><td>"+ diff_quarter10+"</td></tr>";
  // tblData = tblData + "<tr><td>"+rank+"</td><td>"+rank_quarter1+"</td><td>"+rank_quarter2+"</td><td>"+rank_quarter3+"</td><td>"+rank_quarter4+"</td><td>"+rank_quarter5+"</td><td>"+rank_quarter6+"</td><td>"+rank_quarter7+"</td><td>"+rank_quarter8+"</td><td>"+rank_quarter9+"</td><td>"+rank_quarter10+"</td></tr>";
            tblData=th + "<tr><td>"+s_name+"</td><td>"+return_quarter10+"</td><td>"+return_quarter9+"</td><td>"+return_quarter8+"</td><td>"+return_quarter7+"</td><td>"+return_quarter6+"</td><td>"+return_quarter5+"</td><td>"+return_quarter4+"</td><td>"+return_quarter3+"</td><td>"+return_quarter2+"</td><td>"+return_quarter1+"</td></tr>";
            tblData = tblData + "<tr><td>Category Avg.</td><td>"+avg_quarter10+"</td><td>"+avg_quarter9+"</td><td>"+avg_quarter8+"</td><td>"+avg_quarter7+"</td><td>"+avg_quarter6+"</td><td>"+avg_quarter5+"</td><td>"+avg_quarter4+"</td><td>"+avg_quarter3+"</td><td>"+avg_quarter2+"</td><td>"+avg_quarter1+"</td></tr>";
            tblData = tblData + "<tr><td>+/- Category</td><td>"+diff_quarter10+"</td><td>"+diff_quarter9+"</td><td>"+diff_quarter8+"</td><td>"+diff_quarter7+"</td><td>"+diff_quarter6+"</td><td>"+diff_quarter5+"</td><td>"+diff_quarter4+"</td><td>"+diff_quarter3+"</td><td>"+diff_quarter2+"</td><td>"+diff_quarter1+"</td></tr>";
            tblData = tblData + "<tr><td>"+rank+"</td><td>"+rank_quarter10+"</td><td>"+rank_quarter9+"</td><td>"+rank_quarter8+"</td><td>"+rank_quarter7+"</td><td>"+rank_quarter6+"</td><td>"+rank_quarter5+"</td><td>"+rank_quarter4+"</td><td>"+rank_quarter3+"</td><td>"+rank_quarter2+"</td><td>"+rank_quarter1+"</td></tr>";
            tblData = tblData + "<tr><td>No. of Funds (in Cat.)</td><td>"+num_funds_quater10+"</td><td>"+num_funds_quater9+"</td><td>"+num_funds_quater8+"</td><td>"+num_funds_quater7+"</td><td>"+num_funds_quater6+"</td><td>"+num_funds_quater5+"</td><td>"+num_funds_quater4+"</td><td>"+num_funds_quater3+"</td><td>"+num_funds_quater2+"</td><td>"+num_funds_quater1+"</td></tr>";
  }
  if(tabValue == "Monthly Returns"){
       //                tblData=th + "<tr><td>"+s_name+"</td><td>"+return_month1+"</td><td>"+return_month2+"</td><td>"+return_month3+"</td><td>"+return_month4+"</td><td>"+return_month5+"</td><td>"+return_month6+"</td><td>"+return_month7+"</td><td>"+return_month8+"</td><td>"+return_month9+"</td><td>"+return_month10+"</td></tr>";
  // tblData = tblData + "<tr><td> Category ("+classification+")</td><td>"+avg_month1+"</td><td>"+avg_month2+"</td><td>"+avg_month3+"</td><td>"+avg_month4+"</td><td>"+avg_month5+"</td><td>"+avg_month6+"</td><td>"+avg_month7+"</td><td>"+avg_month8+"</td><td>"+avg_month9+"</td><td>"+avg_month10+"</td></tr>";
  // tblData = tblData + "<tr><td>-/+Category ("+category +")</td><td>"+diff_month1+"</td><td>"+diff_month2+"</td><td>"+diff_month3+"</td><td>"+diff_month4+"</td><td>"+diff_month5+"</td><td>"+diff_month6+"</td><td>"+diff_month7+"</td><td>"+diff_month8+"</td><td>"+diff_month9+"</td><td>"+diff_month10+"</td></tr>";
  // tblData = tblData + "<tr><td>"+rank+"</td><td>"+rank_month1+"</td><td>"+rank_month2+"</td><td>"+rank_month3+"</td><td>"+rank_month4+"</td><td>"+rank_month5+"</td><td>"+rank_month6+"</td><td>"+rank_month7+"</td><td>"+rank_month8+"</td><td>"+rank_month9+"</td><td>"+rank_month10+"</td></tr>";
            tblData=th + "<tr><td>"+s_name+"</td><td>"+return_month10+"</td><td>"+return_month9+"</td><td>"+return_month8+"</td><td>"+return_month7+"</td><td>"+return_month6+"</td><td>"+return_month5+"</td><td>"+return_month4+"</td><td>"+return_month3+"</td><td>"+return_month2+"</td><td>"+return_month1+"</td></tr>";
            tblData = tblData + "<tr><td>Category Avg.</td><td>"+avg_month10+"</td><td>"+avg_month9+"</td><td>"+avg_month8+"</td><td>"+avg_month7+"</td><td>"+avg_month6+"</td><td>"+avg_month5+"</td><td>"+avg_month4+"</td><td>"+avg_month3+"</td><td>"+avg_month2+"</td><td>"+avg_month1+"</td></tr>";
            tblData = tblData + "<tr><td>+/- Category</td><td>"+diff_month10+"</td><td>"+diff_month9+"</td><td>"+diff_month8+"</td><td>"+diff_month7+"</td><td>"+diff_month6+"</td><td>"+diff_month5+"</td><td>"+diff_month4+"</td><td>"+diff_month3+"</td><td>"+diff_month2+"</td><td>"+diff_month1+"</td></tr>";
            tblData = tblData + "<tr><td>"+rank+"</td><td>"+rank_month10+"</td><td>"+rank_month9+"</td><td>"+rank_month8+"</td><td>"+rank_month7+"</td><td>"+rank_month6+"</td><td>"+rank_month5+"</td><td>"+rank_month4+"</td><td>"+rank_month3+"</td><td>"+rank_month2+"</td><td>"+rank_month1+"</td></tr>";
            tblData = tblData + "<tr><td>No. of Funds (in Cat.)</td><td>"+num_funds_month10+"</td><td>"+num_funds_month9+"</td><td>"+num_funds_month8+"</td><td>"+num_funds_month7+"</td><td>"+num_funds_month6+"</td><td>"+num_funds_month5+"</td><td>"+num_funds_month4+"</td><td>"+num_funds_month3+"</td><td>"+num_funds_month2+"</td><td>"+num_funds_month1+"</td></tr>";
  }

  }


  else{

  //tblData = tblData + "<tr class='active'><td>Category Average</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr><td>Rank Within Category</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr class=active><td>Number of funds in category</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr><tr><td>As on April XYZ</td><td colspan='2'></td><td></td><td></td><td></td><td></td><td colspan='2'></td><td colspan='2'></td></tr>";
  }

  $("#yearreturn").html("");
  $("#yearreturn").html(tblData);

        }
                },

  error:function(jqXHR, textStatus, errorThrown) {
  alert("AJAX Error:" + textStatus);
  }
            });

}

function returns_barchart(objText,returnYear,returnAvgYear,year,name,classification)
{
  Highcharts.setOptions({
          colors: ['#7cb5ec','#bbbbbb']
      });
returnYear.reverse();
returnAvgYear.reverse();



 for( var i=0;i<returnYear.length;i++)
{ 
  if (returnYear[i]=="-")
  {
      returnYear[i]=parseFloat(0);
  }
   else
  {
     returnYear[i]=parseFloat(returnYear[i]);
  }
}

for( var j=0;j<returnAvgYear.length;j++)
{ 
  if (returnAvgYear[j]=="-")
  {
      returnAvgYear[j]=parseFloat(0);
  }
  else
  {
     returnAvgYear[j]=parseFloat(returnAvgYear[j]);
  }
}


Highcharts.setOptions({
    colors: ['#429EE9', '#A8A8A8']
});
 $('#container-6').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                exporting: { enabled: false },
                xAxis: {
                    categories: year
                },
                yAxis: {
                    title: {
                        text: 'Returns ( % )'
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: name,
                    data: returnYear
                },
                {
                    name: classification,
                    data: returnAvgYear
                }]
            });
        }
/*     function alloc_bench_chart(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category,id){
         alert(id);

          $(function () {
  var txt = "";
  $('#'+id).show();

  if(classification == "Equity")
  {
  txt = "Sector Allocation v/s Category Average";
  }
  else if(classification == "Debt")
  {
  txt = "Credit Rating v/s Category Average";

  var arrayOfNumbers = portCatArray.map(Number);
  portCatArray = arrayOfNumbers;

  }
  else if(classification == "Hybrid")
   {

    if (portCatArray.length==0)
    {
    $('#container-01').hide();
    }
   }
    var chart = new Highcharts.Chart({
    //$('#container').highcharts({
        chart: {
            renderTo: id,
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 15,
                depth: 0,
                viewDistance: 50
            }
        },
        title: {
            //text: 'Section Allocation v/s Category Average'
  text: txt
        },
        subtitle: {
            text: ''
        },
                        xAxis: {
                    categories: portSectArray
                },
        yAxis: {
                    title: {
                        text: 'Assets ( % )'
                    },
                     min: 0,
                     max: 50,
                     tickInterval: 5
        },
        exporting: { enabled: false },
        plotOptions: {
            column: {
                depth: 45
            }
        },
        series: [{
            name: scheme_name,
            data: portHoldArray
        },{
            name: category,
            data: portCatArray
        }]
    });
});
}

function alloc_bench_chart_debt(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category,id){
    alert(id);

          $(function () {
  var txt = "";
  if(classification == "Equity")
  {
  txt = "Sector Allocation v/s Category Average";
  }
  else if(classification == "Debt")
  {
  txt = "Credit Rating v/s Category Average";
  }
  else{

  }
  var arrayOfNumbers = portCatArray.map(Number);
  portCatArray = arrayOfNumbers;
    var chart = new Highcharts.Chart({
    //$('#container').highcharts({
        chart: {
            renderTo: id,
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 15,
                depth: 0,
                viewDistance: 50
            }
        },
        title: {
            //text: 'Section Allocation v/s Category Average'
  text: txt
        },
        subtitle: {
            text: ''
        },
                        xAxis: {
                    categories: portSectArray
                },
        yAxis: {
                    title: {
                        text: 'Assets ( % )'
                    },
                     min: 0,
                     max: 50,
                     tickInterval: 5
        },
        exporting: { enabled: false },
        plotOptions: {
            column: {
                depth: 45
            }
        },
        series: [{
            name: scheme_name,
            data: portHoldArray
        },{
            name: category,
            data: portCatArray
        }]
    });
});
}*/


 function alloc_bench_chart(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category,id){
    
        i=0;   
    scheme_name_graph=[];
    category_graph=[];
    portHoldArray_graph=[];
    portSectArray_graph=[];
    portCatArray_graph=[]
    while (i<5)
    {
      // scheme_name_graph=scheme_name[i]
      // category_graph=category[i]
      portHoldArray_graph.push(portHoldArray[i])
      portSectArray_graph.push(portSectArray[i])
      portCatArray_graph.push(portCatArray[i])
      i=i+1
    }
    console.log("--------------GRAPH===============")
    // console.log()
    console.log(portHoldArray.sort())

        $(function () {
        //$(".PortHeading").html("Sector Allocation v/s Category Average");
        /*var txt = "";        
        $('#'+id).show();
        if(classification == "Equity")
        {         
          $("#port_heading").html("Sector Allocation v/s Category Average");
        }
        else if(classification == "Debt")
        {
          $("#port_heading").html("Credit Rating v/s Category Average");
          var arrayOfNumbers = portCatArray.map(Number);
          portCatArray = arrayOfNumbers;
        }
        else if(classification == "Hybrid")
         {
            if (portCatArray.length==0)
            {
              $('#container-01').hide();
            }
         }*/
         
Highcharts.setOptions({
    colors: ['#429EE9', '#A8A8A8']
});
    var chart = new Highcharts.Chart({
    //$('#container').highcharts({
        chart: {
            renderTo: id,
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 15,
                depth: 0,
                viewDistance: 50
            }
        },
        title: {            
            //text: txt
            align: 'left',
            text: 'Sector Allocation v/s Category Average',
            style: { "color": '#3b3f42', 'letter-spacing': "-1px", "font-family": "verdana, arial, helvetica, sans-serif", "margin-left": "10px" }
          
        },
        subtitle: {
            text: ''
        },
        xAxis: {
                categories: portSectArray_graph,
                labels: {
                            formatter: function () {
                                return this.value.replace(/ /g, '<br />');
                            }
                        }
               },
        yAxis: {
                title: {
                        text: 'Assets ( % )'
                      },
                     //min: 0,
                     //max: 50,
                     tickInterval: 5
        },
        exporting: { enabled: false },
        credits: { enabled: false },
        plotOptions: {
            column: {
                depth: 45
            }
        },
        series: [{
            name: scheme_name,
            data: portHoldArray_graph
        },{
            name: category,
            data: portCatArray_graph
        }]
    });
});
}

function alloc_bench_chart_debt(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category,id){

 i=0;   
    scheme_name_graph=[];
    category_graph=[];
    portHoldArray_graph=[];
    portSectArray_graph=[];
    portCatArray_graph=[]
    while (i<5)
    {
      // scheme_name_graph=scheme_name[i]
      // category_graph=category[i]
      portHoldArray_graph.push(portHoldArray[i])
      portSectArray_graph.push(portSectArray[i])
      portCatArray_graph.push(portCatArray[i])
      i=i+1
    }

        $(function () {
        //$(".PortHeading").html("Credit Rating v/s Category Average");
        /*var txt = "Credit Rating v/s Category Average";
        if(classification == "Equity")
        {
          txt = "Sector Allocation v/s Category Average";
        }
        else if(classification == "Debt")
        {
          txt = "Credit Rating v/s Category Average";
        }
        else{
        }*/
        var arrayOfNumbers = portCatArray_graph.map(Number);
          portCatArray = arrayOfNumbers;
        var chart = new Highcharts.Chart({
        //$('#container').highcharts({
        chart: {
            renderTo: id,
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 15,
                depth: 0,
                viewDistance: 50
            }
        },
        title: {
          //text: txt
            align: 'left',
            text: 'Credit Rating v/s Category Average',
            style: { "color": '#3b3f42', 'letter-spacing': "-1px", "font-family": "verdana, arial, helvetica, sans-serif", "margin-left": "10px" }
             
        },
        subtitle: {
            text: ''
        },
                        xAxis: {
                    categories: portSectArray_graph
                },
        yAxis: {
                    title: {
                        text: 'Assets ( % )'
                    },
                     //min: 0,
                     //max: 50,
                     tickInterval: 5
        },
        exporting: { enabled: false },
        credits: { enabled: false },
        plotOptions: {
            column: {
                depth: 45
            }
        },
        series: [{
            name: scheme_name,
            data: portHoldArray_graph,
            color: '#429EE9'
        },{
            name: category,
            data: portCatArray_graph,
            color: '#A8A8A8'
        }]
    });
});
}


// function port_graph()
// {

//  $.ajax({
//  type:'GET',
//  url: '/functionalities/get_protfolio_graph',
//  datatype:'json',
//  success:function(sectordata, textStatus, jqXHR) {
//  console.log(sectordata);
//             var portCatArray = [];
//             var portHoldArray = [];
//             var portSectArray = [];
//  var portCatArray_h = [];
//             var portHoldArray_h = [];
//             var portSectArray_h = [];
//  var classification = sectordata.classification;
//  var scheme_name = sectordata.scheme_name;
//  var category = sectordata.category;
//             if(classification == "Equity")
//  {
//  for(var i=0;i<=sectordata.port_graph.length-1;i++){
//  //console.log(sectordata.port_graph[i].cat_avg);
//  //console.log(sectordata.port_graph[i].rv_sect_name);
//  //console.log(sectordata.port_graph[i].hold_perc);
//  //chart = chart + "['" +cat_avg+ "', "+hold_perc+"],";
//     //console.log(sectordata["port_graph"][i].cat_avg);
//  portCatArray.push(sectordata["port_graph"][i].cat_avg);
//  portHoldArray.push(sectordata["port_graph"][i].hold_perc);
//  portSectArray.push(sectordata["port_graph"][i].rv_sect_name);
//  }
//  }
//  else if(classification == "Debt")
//  {
//  alert("here 1245");
//  console.log("asdsadsdfsdafasdfsdafsadf");
//  console.log(sectordata);
//  for(var i=0;i<=sectordata.port_graph.length-1;i++){
//  portCatArray.push(sectordata["port_graph"][i].average);
//  portHoldArray.push(sectordata["port_graph"][i].holdpercentage);
//  portSectArray.push(sectordata["port_graph"][i].rupeevest_group);
//  }
//  }
//  else if(classification == "Hybrid")
//  {
//  for(var i=0;i<=sectordata.port_graph_sector.length-1;i++){
//  portCatArray.push(sectordata["port_graph_sector"][i].cat_avg);
//  portHoldArray.push(sectordata["port_graph_sector"][i].hold_perc);
//  portSectArray.push(sectordata["port_graph_sector"][i].rv_sect_name);
//  }
//  for(var i=0;i<=sectordata.port_graph_credit.length-1;i++){
//  portCatArray_h.push(sectordata["port_graph_credit"][i].average);
//  portHoldArray_h.push(sectordata["port_graph_credit"][i].holdpercentage);
//  portSectArray_h.push(sectordata["port_graph_credit"][i].rupeevest_group);
//  }
//  }



//  /*console.log("string after loop");
//  console.log(portCatArray);
//  console.log(portHoldArray);
//  console.log(portSectArray);
// */ if(classification == "Hybrid")
//  {
//  alloc_bench_chart(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category);


//  alloc_bench_chart_hybrid(portCatArray_h,portHoldArray_h,portSectArray_h,classification,scheme_name,category);
//  }
//  else
//  {
//  alloc_bench_chart(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category);
//  }

//  },
//  error:function(jqXHR, textStatus, errorThrown) {
//    alert("AJAX Error:" + textStatus);
//  }
//  })
// }
   //   function createChart() {
   // var seriesOptions = [],
   //              seriesCounter = 0,
   //              names = ['MSFT', 'AAPL', 'GOOG'];

   //          $('#container-0').highcharts('StockChart', {

   //              rangeSelector: {
   //                  selected: 4
   //              },

   //              yAxis: {
   //                  labels: {
   //                      formatter: function () {
   //                          return (this.value > 0 ? ' + ' : '') + this.value + '%';
   //                      }
   //                  },
   //                  plotLines: [{
   //                      value: 0,
   //                      width: 2,
   //                      color: 'silver'
   //                  }]
   //              },

   //              plotOptions: {
   //                  series: {
   //                      compare: 'percent'
   //                  }
   //              },

   //              tooltip: {
   //                  pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
   //                  valueDecimals: 2
   //              },

   //              series: seriesOptions
   //          });
  // $.each(names, function (i, name) {

   //          $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?', function (data) {

   //              seriesOptions[i] = {
   //                  name: name,
   //                  data: data
   //              };

   //              // As we're loading the data asynchronously, we don't know what order it will arrive. So
   //              // we keep a counter and create the chart when all the data is loaded.
   //              seriesCounter += 1;

   //              if (seriesCounter === names.length) {
   //                  createChart();
   //              }
   //          });
   //      });
   //      }


function port_graph_equity(id , schemecode)
{

    $.ajax({
        type:'GET',
        url: curr_ip+'functionalities/get_protfolio_graph_equity',
        data :{schemecode:schemecode},
        datatype:'json',
        success:function(sectordata, textStatus, jqXHR) {
        console.log(sectordata);
            var portCatArray = [];
            var portHoldArray = [];
            var portSectArray = [];
            var portCatArray_h = [];
            var portHoldArray_h = [];
            var portSectArray_h = [];

             var temp_port
            var classification = sectordata.classification;
            var scheme_name = sectordata.scheme_name;
            var category = sectordata.category;
            // if(classification == "Equity")
            // {

             
              // alert("in graph --");

                var cat_avg_tmp;
                var hold_perc_tmp;

                for(var i=0;i<=sectordata.port_graph.length-1;i++)
                {
                //console.log(sectordata.port_graph[i].cat_avg);
                //console.log(sectordata.port_graph[i].rv_sect_name);
                //console.log(sectordata.port_graph[i].hold_perc);
                //chart = chart + "['" +cat_avg+ "', "+hold_perc+"],";
               //console.log(sectordata["port_graph"][i].cat_avg);
               
               cat_avg_tmp = parseFloat(sectordata["port_graph"][i].cat_avg).toFixed(2);
               hold_perc_tmp = parseFloat(sectordata["port_graph"][i].hold_perc).toFixed(2);

                portCatArray.push(parseFloat(cat_avg_tmp));
                portHoldArray.push(parseFloat(hold_perc_tmp));
                portSectArray.push(sectordata["port_graph"][i].rv_sect_name);
                }
            // }
            // else if(classification == "Debt")
            // {
            //     alert("here 1245");
            //     console.log("asdsadsdfsdafasdfsdafsadf");
            //     console.log(sectordata);
            //     for(var i=0;i<=sectordata.port_graph.length-1;i++){
            //     portCatArray.push(sectordata["port_graph"][i].average);
            //     portHoldArray.push(sectordata["port_graph"][i].holdpercentage);
            //     portSectArray.push(sectordata["port_graph"][i].rupeevest_group);
            //     }
            // }
            // else if(classification == "Hybrid")
            // {
            //     for(var i=0;i<=sectordata.port_graph_sector.length-1;i++){
            //     portCatArray.push(sectordata["port_graph_sector"][i].cat_avg);
            //     portHoldArray.push(sectordata["port_graph_sector"][i].hold_perc);
            //     portSectArray.push(sectordata["port_graph_sector"][i].rv_sect_name);
            //     }
            //     for(var i=0;i<=sectordata.port_graph_credit.length-1;i++){
            //     portCatArray_h.push(sectordata["port_graph_credit"][i].average);
            //     portHoldArray_h.push(sectordata["port_graph_credit"][i].holdpercentage);
            //     portSectArray_h.push(sectordata["port_graph_credit"][i].rupeevest_group);
            //     }
            // }



        /*console.log("string after loop");
        console.log(portCatArray);
        console.log(portHoldArray);
        console.log(portSectArray);
// */      
//         {
//             alloc_bench_chart(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category);


//             alloc_bench_chart_hybrid(portCatArray_h,portHoldArray_h,portSectArray_h,classification,scheme_name,category);
//         }
//         else
//         {
            alloc_bench_chart(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category,id);
        // }

        }
 })
}

function port_graph_debt(id,schemecode)
{

    $.ajax({
        type:'GET',
        url: curr_ip+'functionalities/get_protfolio_graph_debt',
        data :{schemecode:schemecode},
        datatype:'json',
        success:function(sectordata, textStatus, jqXHR) {
        console.log(sectordata);
            var portCatArray = [];
            var portHoldArray = [];
            var portSectArray = [];
            var portCatArray_h = [];
            var portHoldArray_h = [];
            var portSectArray_h = [];
            var classification = sectordata.classification;
            var scheme_name = sectordata.scheme_name;
            var category = sectordata.category;
            // if(classification == "Equity")
            // {
            //     for(var i=0;i<=sectordata.port_graph.length-1;i++){
            //     //console.log(sectordata.port_graph[i].cat_avg);
            //     //console.log(sectordata.port_graph[i].rv_sect_name);
            //     //console.log(sectordata.port_graph[i].hold_perc);
            //     //chart = chart + "['" +cat_avg+ "', "+hold_perc+"],";
            //    //console.log(sectordata["port_graph"][i].cat_avg);
            //     portCatArray.push(sectordata["port_graph"][i].cat_avg);
            //     portHoldArray.push(sectordata["port_graph"][i].hold_perc);
            //     portSectArray.push(sectordata["port_graph"][i].rv_sect_name);
            //     }
            // }
            // else if(classification == "Debt")
            // {
                
               // console.log(sectordata);

               
               var average_tmp;
               var holdpercentage_tmp;
      

                for(var i=0;i<=sectordata.port_graph.length-1;i++){
                  
                average_tmp = parseFloat(sectordata["port_graph"][i].average).toFixed(2);
                holdpercentage_tmp = parseFloat(sectordata["port_graph"][i].holdpercentage).toFixed(2);

                portCatArray.push(parseFloat(average_tmp));
                portHoldArray.push(parseFloat(holdpercentage_tmp));
                portSectArray.push(sectordata["port_graph"][i].rupeevest_group);   




              //     console.log("---------GRAH EQUITY----------------"); 
              // console.log(parseFloat(sectordata["port_graph"][i].average).toFixed(2));
              // console.log(parseFloat(sectordata["port_graph"][i].holdpercentage).toFixed(2));
              // console.log(sectordata["port_graph"][i].rupeevest_group);
              // console.log("---------GRAH END----------------"); 

                }
            // }
            // else if(classification == "Hybrid")
            // {
            //     for(var i=0;i<=sectordata.port_graph_sector.length-1;i++){
            //     portCatArray.push(sectordata["port_graph_sector"][i].cat_avg);
            //     portHoldArray.push(sectordata["port_graph_sector"][i].hold_perc);
            //     portSectArray.push(sectordata["port_graph_sector"][i].rv_sect_name);
            //     }
            //     for(var i=0;i<=sectordata.port_graph_credit.length-1;i++){
            //     portCatArray_h.push(sectordata["port_graph_credit"][i].average);
            //     portHoldArray_h.push(sectordata["port_graph_credit"][i].holdpercentage);
            //     portSectArray_h.push(sectordata["port_graph_credit"][i].rupeevest_group);
            //     }
            // }


     // if(classification == "Hybrid")
     //    {
     //        alloc_bench_chart(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category);


     //        alloc_bench_chart_hybrid(portCatArray_h,portHoldArray_h,portSectArray_h,classification,scheme_name,category);
     //    }
     //    else
     //    {
            alloc_bench_chart_debt(portCatArray,portHoldArray,portSectArray,classification,scheme_name,category,id);
        // }

        },
        error:function(jqXHR, textStatus, errorThrown) {
          alert("AJAX Error:" + textStatus);
        }
 })
}

function createNavChart() {
//  $.ajax({
//          type: 'GET',
//          url: '/functionalities/navgraph_new',
//          dataType: 'json',
//          // data: { 'iin' : $('#client_name').val()},
//          success: function(data)
//          {
//              var i;
//              var navrs1=[];
//              for(i=0;i<data.length;i=i+1)
//              {
//                  var date2 = new Date(data[i].navdate);
//                   navrs1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data[i].navrs])
//              }

//              $('#container-0').highcharts.stockChart({
     

//              rangeSelector: {
//                 allButtonsEnabled: true,
//                 buttons: [{
//                     type: 'month',
//                     count: 1,
//                     text: '1m'
//                 }, {
//                     type: 'month',
//                     count: 3,
//                     text: '3m'
//                 }, {
//                     type: 'month',
//                     count: 6,
//                     text: '6m'
//                 }, {
//                     type: 'ytd',
//                     text: 'YTD'
//                 }, {
//                     type: 'year',
//                     count: 1,
//                     text: '1y'
//                 }, {
//                     type: 'year',
//                     count: 2,
//                     text: '2y'
//                 }, {
//                     type: 'year',
//                     count: 3,
//                     text: '3y'
//                 }, {
//                     type: 'all',
//                     text: 'All'
//                 }],
                
//                 selected: 4
//             },

//             title: {
//                 text: 'AAPL Stock Price'
//             },
//             plotOptions:{
//                 series:{
//                     turboThreshold:5000//larger threshold or set to 0 to disable
//                 }
//             },
//             series: [{
//                 name: 'nav ',
//                 data:navrs1 ,
//                 tooltip: {
//                     valueDecimals: 2
//                 }
//             }],
//             xAxis: {
//                 type: 'datetime'
//             },
//               credits: {
//                  text: 'rupeevest',
//                  href: 'http://www.rupeevest.com'
//                  // enabled: false
//             },
//             exporting: { enabled: false }

           
           
           
//         })
//     }
// });


}
