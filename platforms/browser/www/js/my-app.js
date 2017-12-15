// Initialize app
//var myApp = new Framework7();
var myApp = new Framework7({pushState: true,});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var curr_ip='http://192.168.1.22:3000/'

var RVNav="";
RVNav ="<div class='navbar'><div class='navbar-inner'><div class='left'><a href='#' class='link icon-only open-panel'><i class='icon icon-bars'></i></a></div><div class='center'><span id='navbar_info_span'>RupeeVest</span><input type='text' id='fund_names' class='form-control ui-autocomplete-input' placeholder='Search mutual funds here...' autocomplete='off'></div><div class='right'><a href='#' class='' id='navbar_search_btn'><i class='fa fa-search' aria-hidden='true'></i></a><a href='#' class='' id='navbar_close_btn'><i class='fa fa-times' aria-hidden='true'></i></a></div></div></div>"


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

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

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    // console.log("Device is ready!");
        
    $$('#RVNavbar').html(RVNav);
    fundname_search();
    function myFunction () 
    {
       var status = navigator.onLine;
       if (status) 
       {            
           $$('#adv').html("<a href='ContactUs.html' class='link'>Contact Us</a><a href='FAQs.html' class='link'>FAQs</a>");
       } 
       else 
       {
           $$('#adv').html("<span class='fa fa-exclamation-triangle' aria-hidden='true'></span>No internet connection");
       }
   }

   var interval = setInterval(function () { myFunction(); }, 1000);

    $$.get('http://192.168.1.22:3000/functionalities/get_user_info', {iin: 5011179660},function (data) {
       });

            $$('#fund_names').hide();
            $$('#navbar_close_btn').hide();
            $$('#navbar_search_btn').on('click', function (e) {
                $$('#fund_names').show();
                $$('#navbar_info_span').hide();
                $$('#navbar_close_btn').show();
                $$('#navbar_search_btn').hide();
            });

            $$('#navbar_close_btn').on('click', function (e) {
                $$('#fund_names').hide();
                $$('#navbar_info_span').show();
                $$('#navbar_close_btn').hide();
                $$('#navbar_search_btn').show();
            });
            $$('li.accordion-item .item-content.item-link').on('click', function (e) {
                $(this.children[0].children[2]).toggleClass("fa-minus");
             });

            
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page


})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    
    var page = e.detail.page;
    //console.log(page.url);

    $$('#RVNavbar').html(RVNav);
    fundname_search();
    $$('#fund_names').hide();
    $$('#navbar_close_btn').hide();
    $$('#navbar_search_btn').on('click', function (e) {
        $$('#fund_names').show();
        $$('#navbar_info_span').hide();
        $$('#navbar_close_btn').show();
        $$('#navbar_search_btn').hide();
    });

    $$('#navbar_close_btn').on('click', function (e) {
        $$('#fund_names').hide();
        $$('#navbar_info_span').show();
        $$('#navbar_close_btn').hide();
        $$('#navbar_search_btn').show();
    });

    if (page.url.includes('.html')===true){
        $('#RVSidebar').removeClass("active");
        $('body').removeClass("with-panel-left-reveal");

    }

    if (page.name === 'about') {
        
    }

    if (page.url === 'login.html') {
        
        $$('.form-to-data').on('click', function(){
           
            var email = $$('#email').val();
            var password= $$('#password').val();
            console.log(email);
            console.log(password);
            $$.get('http://192.168.1.22:3000/users/sign_in', {email: email,password: password},function (data) {
                
                console.log(data);
               
            });

        }); 
    }
    

    
if(page.name === 'fund_details')
    {
        var query = $$.parseUrlQuery(page.url);
        var scheme_code=query.scheme_code;
        $$.get(curr_ip+'app_services/get_fund_info', {schemecode: +scheme_code},function (data) 
        {
            var scheme_data = JSON.parse(data);
            console.log(scheme_data);
            var scheme_item = scheme_data.schemedata[0];
            var min_sip_inv = "-"
            if(scheme_data.sip_min_investment[0]!=undefined)
            {
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

                // get_growth_plan(schemecode);
                var val_1=get_return_data(scheme_code);
                var val_2=test_graph(s_name,scheme_code);
                var val_3=asect_alloc(scheme_code);
                var val_4=get_portfolio_holdings(scheme_code);
                // port_avgcap();
                var val_5=get_hold_asset(scheme_code);


                 var val_6=get_status(scheme_code);

                if (val_1=='True' && val_2=='True' && val_3=='True' && val_4=='True' && val_5=='True' && val_6=='True')
                {
                  $("#fund_details .container").css('display','block');
                  $("#fund_details .fa.fa-spinner.fa-pulse").css('display','none');
                }


        });
        
    }

    if(page.name==='OfferFixedDeposit')
    {
       
       $$.get(curr_ip+'app_services/fd_all_data',function (data) 
       {
               var myObj = JSON.parse(data);              
               var i;
               var list_fd = "";               

               for (var i = 0; i < myObj.fds.length; i++) { 
                   var ComName = myObj.fds[i].name;
                   ComName = ComName.replace(/[.\s]/g, '');                                     
                   list_fd = list_fd + "<div class='breadcrumb'><a href='OfferFD"+ComName+".html'><div class='row'><div class='col-xs-6'><div class='FDName'>"+myObj.fds[i].name+"</div></div><div class='col-xs-3'><div class='FDPeriod'>"+myObj.fds[i].period+"</div></div><div class='col-xs-3'><div class='FDInterest'>"+myObj.fds[i].interest+"</div></div></div></a></div>"
                };

            $$('#fd_all_list').html(list_fd);
               
       });
    }



    if(page.name==='OfferMutualFund')
    {
        $$.get(curr_ip+'app_services/mf_home_for_app',function (data) 
        {
            var myObj = JSON.parse(data);
            var i;
            var table_data_equity_lc="";

            for (i = 0; i < myObj.equity_lc.length; i++) 
            {
                table_data_equity_lc=table_data_equity_lc+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.equity_lc[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.equity_lc[i].s_name+"</div></div></div></a></div>";
            }
            $$('#equity_large_tab div').html(table_data_equity_lc+"<h6 class='mf_as_on'></h6>");

            var table_data_equity_mc="";
            for (i = 0; i < myObj.equity_mc.length; i++) 
            {
                table_data_equity_mc=table_data_equity_mc+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.equity_mc[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.equity_mc[i].s_name+"</div></div></div></a></div>";
            }
            $$('#equity_multi_tab div').html(table_data_equity_mc+"<h6 class='mf_as_on'></h6>");

            var table_data_equity_msc="";
            for (i = 0; i < myObj.equity_msc.length; i++) 
            {
                table_data_equity_msc=table_data_equity_msc+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.equity_msc[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.equity_msc[i].s_name+"</div></div></div></a></div>";
            }
            $$('#equity_mid_small_tab div').html(table_data_equity_msc+"<h6 class='mf_as_on'></h6>");

            var table_data_equity_elss="";
            for (i = 0; i < myObj.elss.length; i++) 
            {
                table_data_equity_elss=table_data_equity_elss+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.elss[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.elss[i].s_name+"</div></div></div></a></div>";
            }
            $$('#equity_elss_tab div').html(table_data_equity_elss+"<h6 class='mf_as_on'></h6>");

            var table_data_debt_liq="";
            for (i = 0; i < myObj.debt_liq.length; i++) 
            {
                table_data_debt_liq=table_data_debt_liq+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.debt_liq[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.debt_liq[i].s_name+"</div></div></div></a></div>";
            }
            $$('#debt_liquid_tab div').html(table_data_debt_liq+"<h6 class='mf_as_on'></h6>");

            var table_data_debt_ust="";
            for (i = 0; i < myObj.debt_ust.length; i++) 
            {
                table_data_debt_ust=table_data_debt_ust+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.debt_ust[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.debt_ust[i].s_name+"</div></div></div></a></div>";
            }
            $$('#debt_ultra_short_tab div').html(table_data_debt_ust+"<h6 class='mf_as_on'></h6>");

            var table_data_debt_st="";
            for (i = 0; i < myObj.debt_st.length; i++) 
            {
                table_data_debt_st=table_data_debt_st+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.debt_st[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.debt_st[i].s_name+"</div></div></div></a></div>";
            }
            $$('#debt_short_tab div').html(table_data_debt_st+"<h6 class='mf_as_on'></h6>");

            var table_data_debt_m_lt="";
            for (i = 0; i < myObj.debt_m_lt.length; i++) 
            {
                table_data_debt_m_lt=table_data_debt_m_lt+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.debt_m_lt[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.debt_m_lt[i].s_name+"</div></div></div></a></div>";
            }
            $$('#debt_medium_long_tab div').html(table_data_debt_m_lt+"<h6 class='mf_as_on'></h6>");

            var table_data_hybrid_eo="";
            for (i = 0; i < myObj.hybrid_eo.length; i++) 
            {
                table_data_hybrid_eo=table_data_hybrid_eo+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.hybrid_eo[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.hybrid_eo[i].s_name+"</div></div></div></a></div>";
            }
            $$('#hybrid_equity_tab div').html(table_data_hybrid_eo+"<h6 class='mf_as_on'></h6>");

            var table_data_hybrid_do="";
            for (i = 0; i < myObj.hybrid_do.length; i++) 
            {
                table_data_hybrid_do=table_data_hybrid_do+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.hybrid_do[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.hybrid_do[i].s_name+"</div></div></div></a></div>";
            }
            $$('#hybrid_debt_tab div').html(table_data_hybrid_do+"<h6 class='mf_as_on'></h6>");

            var table_data_hybrid_arb="";
            for (i = 0; i < myObj.hybrid_arb.length; i++) 
            {
                table_data_hybrid_arb=table_data_hybrid_arb+"<div class='breadcrumb'><a href=fund_details.html?scheme_code="+myObj.hybrid_arb[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.hybrid_arb[i].s_name+"</div></div></div></a></div>";
            }
            $$('#hybrid_arbitage_tab div').html(table_data_hybrid_arb+"<h6 class='mf_as_on'></h6>");

             $$('#equity_large_tab .mf_as_on, #equity_multi_tab .mf_as_on, #equity_mid_small_tab .mf_as_on, #debt_liquid_tab .mf_as_on, #debt_ultra_short_tab .mf_as_on, #debt_short_tab .mf_as_on, #debt_medium_long_tab .mf_as_on, #hybrid_equity_tab .mf_as_on, #hybrid_debt_tab .mf_as_on, #hybrid_arbitage_tab .mf_as_on').html("As on 01 Oct 2017");
             $$('#equity_elss_tab .mf_as_on').html("As on 01 Apr 2017");

        });
    }

    if(page.name==='OfferInvestmentSolution')
    {

    }

    if(page.name==='OfferISAABP')
    {       
       $$.get(curr_ip+'app_services/is_portfolio',function (data) 
       {

            var myObj = JSON.parse(data);
                               
            var total_weightage = myObj.total_weightage;
            var total_classification = myObj.total_classification;
            var total_asset_class = myObj.total_asset_class;
            var total_color = myObj.total_color;

var array_w=[],array_c=[],array_class=[],array_color=[];
var a="",b="",s=0,s1=0,s2=0;

  for(var i=0;i<total_weightage.length;i++)
  {
    if(total_weightage[i]=="[" || total_weightage[i]=="," )
    {
      if(total_weightage[i]=="," && s1==0)
        a=a+";";
    }
      else
      {
        if(total_weightage[i]=="]")
          {
            s1=1;
            if(a!="")
            {
              array_w.push(a);
            }
            a="";
          }
          else
          {
            s1=0;
            a=a+total_weightage[i];
          }
        }
        
  }
  var k=0;
  for(var i=0;i<total_classification.length;i++)
  {
    if(total_classification[i]=="[" || total_classification[i]=="," )
    {
      if(total_classification[i]=="," && s==0)
       {
        b=b+";";
        k=1;
       } 
    }
      else
      {
        if(total_classification[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_c.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            if(k!=1)
            {
              if(b=="" && total_classification[i]==" ")
              {

              }
              else
              {
              b=b+total_classification[i];
            }
            }
            k=0;
          }
        }
        
  }
  b=""
  s=0
   for(var i=0;i<total_asset_class.length;i++)
  {
    if(total_asset_class[i]=="[" || total_asset_class[i]=="," )
    {
      if(total_asset_class[i]=="," && s==0)
        b=b+";";
    }
      else
      {
        if(total_asset_class[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_class.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            b=b+total_asset_class[i];
          }
        }
        
  }


  b=""
   for(var i=0;i<total_color.length;i++)
  {
    if(total_color[i]=="[" || total_color[i]=="," )
    {
      if(total_color[i]=="," && s2==0)
        b=b+";";
    }
      else
      {
        if(total_color[i]=="]")
          {
            s2=1;
            if(b!="")
            {
              // b=b+";"
              array_color.push(b);
            }
            b="";
          }
          else
          {
            s2=0;
            b=b+total_color[i];
          }
        }
        
  }

 var classification=[],color=[];
 var cfic,we,ass_class,colour;
 var seriesdate=[];
 var total_eq=0,total_db=0;
chart_drawn(0,4);
chart_drawn(4,7);
chart_drawn(7,11);
function chart_drawn(start,end)
 {
  for(var i=start;i<end;i++)
{

  classification=[];
  seriesdate=[];
  total_eq=0,total_db=0;
  cfic=array_c[i].split(";");
  we=array_w[i].split(";");
  colour=array_color[i].split(";");
  ass_class=array_class[i].replace(/ /g, '').split(";");


  for(var j=0;j<cfic.length;j++)
  {

     if(j!=0 && cfic[j-1]==cfic[j] )
    {
      for(var k=0;k<seriesdate.length;k++)
      {
        var index=seriesdate[k].indexOf(cfic[j])
        if(index!=-1)
        {
          var s=seriesdate[k][1]+parseInt(we[j]);
          seriesdate[k][1]=s;
          break;
        }
      }
    }
    else
    {
     classification.push(cfic[j]);
    classification.push(parseInt(we[j]));
     color.push(colour[j]);
    seriesdate.push(classification)
    }
    if(ass_class[j]=="Equity")
    {
      total_eq=total_eq+parseInt(we[j]);
    }
    else if(ass_class[j]=="Debt")
    {
      total_db=total_db+parseInt(we[j]);
    }
    else if(ass_class[j]=="Gold")
    {
      total_gold=total_gold+parseInt(we[j]);
    }
    classification=[];
   

  }
  seriesdate=seriesdate.reverse();
      color=color.reverse();

  
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'AssetsChart_'+(i+1),
            type: 'pie',
            margin: [0, 0, 0, 0],
            backgroundColor: 'transparent'            
        },
        credits:{enabled: false},
        colors:color,
        title:{text: ''},
        plotOptions: {
            pie: {
                innerSize: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
               point: {
          events: {
            mouseOver: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            },
            mouseOut: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            }
          }
        },
        states: {
          hover: {
            brightness: 0,
            lineWidth: 0,
            halo: {
              size: 0
            }

          }
        }
            }
            
        
        },
        tooltip: {

              backgroundColor: 'transparent',
              borderColor: "none",
              shadow: false,
              useHTML: true,
              formatter: function () {      
                   return '<div class="tooltop">'+this.key + '<br>' + '<b>'+this.y+' %</b></div>';
                }
                
    },
        series:[{
                    name: ' ',
                      data: seriesdate
                    
                }]
    },
                                     
    function(chart) { // on complete
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);


var span = '<div class="row d_inline_f chartCircleInside" id="pieChartInfoText'+(i+1)+'"style="position:relative;">';
        
        span += '<div class="col-xs-6"><div class="ChartCIEQ"><div class="ChartCIP">'+total_eq+'</div><div class="ChartCIT">EQUITY</div></div></div>';
        span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+total_db+'</div><div class="ChartCIT">DEBT</div></div></div>';
        span += '</div>';

         $("#addText_"+(i+1)).empty();

        $("#addText_"+(i+1)).append(span);
        span = $('#pieChartInfoText'+(i+1));
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
}
}


    $("#AABtnGrowth").click(function(){
      chart_drawn(0,4);
    });
    $("#AABtnBalanced").click(function(){
      chart_drawn(4,7);
    });
    $("#AABtnCons").click(function(){
      chart_drawn(7,11);
    });



// $$('.tab').on('swipeLeft', function(){
//     chart_drawn(0,4);
//     chart_drawn(4,7);
//     chart_drawn(7,11);
// });




// $(window).bind('resize', function() { location.reload(); });
window.onorientationchange = function()
{
   window.location.reload();
}






               
       });
    }


/************************************ Wealth Creation START ******************************** */ 

    if(page.name==='OfferISGBPWealth')
    {
        $$.get(curr_ip+'app_services/is_goal_wealth',function (data) 
       {
                var myObj = JSON.parse(data);               
              
    $$('#Tab5Years .table tbody').html("<tr><td>"+myObj.portfolio_name[0]+"</td><td>"+myObj.year_1[0]+"</td><td>"+myObj.year_3[0]+"</td><td>"+myObj.year_5[0]+"</td></tr>");
    $$('#Tab5to10Years .table tbody').html("<tr><td>"+myObj.portfolio_name[1]+"</td><td>"+myObj.year_1[1]+"</td><td>"+myObj.year_3[1]+"</td><td>"+myObj.year_5[1]+"</td></tr>");
    $$('#Tab10Years .table tbody').html("<tr><td>"+myObj.portfolio_name[2]+"</td><td>"+myObj.year_1[2]+"</td><td>"+myObj.year_3[2]+"</td><td>"+myObj.year_5[2]+"</td></tr>");

    var total_weightage = myObj.total_weightage;
    var total_classification =  myObj.total_classification;
    var total_asset_class =  myObj.total_asset_class;
    var total_color =  myObj.total_color;

    var chart ;

    var array_w=[],array_c=[],array_class=[],array_col=[];
    var a="",b="",s=0,s1=0;

  
  for(var i=0;i<total_weightage.length;i++)
  {
    if(total_weightage[i]=="[" || total_weightage[i]=="," )
    {
      if(total_weightage[i]=="," && s1==0)
        a=a+";";
    }
      else
      {
        if(total_weightage[i]=="]")
          {
            s1=1;
            if(a!="")
            {
              array_w.push(a);
            }
            a="";
          }
          else
          {
            s1=0;
            a=a+total_weightage[i];
          }
        }
        
  }

  var k=0;
  for(var i=0;i<total_classification.length;i++)
  {
    if(total_classification[i]=="[" || total_classification[i]=="," )
    {
      if(total_classification[i]=="," && s==0)
       {
        b=b+";";
        k=1;
       } 
    }
      else
      {
        if(total_classification[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_c.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            if(k!=1)
            {
              if(b=="" && total_classification[i]==" ")
              {

              }
              else
              {
              b=b+total_classification[i];
            }
            }
            k=0;
          }
        }
        
  }


  var k=0;
  b="";
  s=0;
  for(var i=0;i<total_color.length;i++)
  {
    if(total_color[i]=="[" || total_color[i]=="," )
    {
      if(total_color[i]=="," && s==0)
       {
        b=b+";";
       } 
    }
      else
      {
        if(total_color[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_col.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            
              b=b+total_color[i];
           
          }
        }
        
  }


  
  b=""
   for(var i=0;i<total_asset_class.length;i++)
  {
    if(total_asset_class[i]=="[" || total_asset_class[i]=="," )
    {
      if(total_asset_class[i]=="," && s==0)
        b=b+";";
    }
      else
      {
        if(total_asset_class[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_class.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            b=b+total_asset_class[i];
          }
        }
        
  }
  
 
 var classification=[],color=[];
 var cfic,we,ass_class,colour;
 var seriesdate=[];
 var total_eq=0,total_db=0,total_gold=0;

chart_drawn(0,1);
chart_drawn(1,2);
chart_drawn(2,3);

function chart_drawn(start,end)
{

// ################### Chart ##########################
for(var i=start;i<end;i++)
{
  color=[];
  classification=[];
  seriesdate=[];
  total_eq=0,total_db=0,total_gold=0;
  cfic=array_c[i].split(";");
  we=array_w[i].replace(/ /g, '').split(";");
  colour=array_col[i].replace(/ /g, '').split(";");
  ass_class=array_class[i].replace(/ /g, '').split(";");
  for(var j=0;j<cfic.length;j++)
  {
    if(j!=0 && cfic[j-1]==cfic[j] )
    {
     // var s=seriesdate[j-1][1]+parseInt(we[j]);
      // var s=parseInt(we[j-1])+parseInt(we[j]);
      for(var k=0;k<seriesdate.length;k++)
      {
        var index=seriesdate[k].indexOf(cfic[j])
        if(index!=-1)
        {
          var s=seriesdate[k][1]+parseInt(we[j]);
          seriesdate[k][1]=s;
          break;
        }
      }
      // seriesdate[j-1][1]=s;
    }
    else
    {
     classification.push(cfic[j]);
    classification.push(parseInt(we[j]));
    color.push(colour[j]);
    seriesdate.push(classification)
    }
   //  debugger;
    if(ass_class[j]=="Equity")
    {
      total_eq=total_eq+parseInt(we[j]);
    }
    else if(ass_class[j]=="Debt")
    {
      total_db=total_db+parseInt(we[j]);
    }
    else if(ass_class[j]=="Gold")
    {
      total_gold=total_gold+parseInt(we[j]);
    }
    classification=[];
   

  }
   seriesdate=seriesdate.reverse();
      color=color.reverse();
      

     chart = new Highcharts.Chart({
        chart: {
            renderTo: 'GoalIndiC'+(i+1),
            type: 'pie',
            margin: [0, 0, 0, 0],
            backgroundColor: 'transparent'
            
        },
        credits:{enabled: false},
        colors:color,
        title:{text: ''},
        // subtitle: {text:'60% Equity 40% Debt', style: {
        //         color: '#0000ff',
        //         fontWeight: 'bold'
        //     }
        //   },
        plotOptions: {
            pie: {
                innerSize: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
               point: {
          events: {
            mouseOver: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            },
            mouseOut: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            }
          }
        },
        states: {
          hover: {
            brightness: 0,
            lineWidth: 0,
            halo: {
              size: 0
            }

          }
        }
            }
            
        
        },
        tooltip: {
          backgroundColor: 'transparent',
               borderColor: "none",
              // followPointer: true,
              shadow: false,
              useHTML: true,
              formatter: function () {      
                   return '<div class="tooltop">'+this.key + '<br>' + '<b>'+this.y+' %</b></div>';
                }
    },
        series: [{
                            name: ' ',
                              data: seriesdate
                            
                        }]
    },
                                     
    function(chart) { // on complete
      // alert(i);
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);
        // for(var k=0;k<cfic.length;k++)
        // {

        // }
        var span = '<div class="row d_inline_f chartCircleInside" id="pieChartInfoTextC'+(i+1)+'"style="position:relative;">';
        span += '<div class="col-xs-6"><div class="ChartCIEQ"><div class="ChartCIP">'+total_eq+'</div><div class="ChartCIT">EQUITY</div></div></div>';
        span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+total_db+'</div><div class="ChartCIT">DEBT</div></div></div>';
        span += '</div>';
        $("#addTextC"+(i+1)).empty();
        $("#addTextC"+(i+1)).append(span);
        span = $('#pieChartInfoTextC'+(i+1));
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
}


}
 

    $("#GBILow").click(function(){
      chart_drawn(0,1);
    });
    $("#GBIMod").click(function(){
      chart_drawn(1,2);
    });
    $("#GBIHigh").click(function(){
      chart_drawn(2,3);
    });


window.onorientationchange = function()
{
   window.location.reload();
}
                      
       });
    }

/************************************ Wealth Creation END ******************************** */ 

/************************************ Beat Bank FDs START ******************************** */  

if(page.name==='OfferISGBPBank')
{
  $$.get(curr_ip+'app_services/is_goal_bankFD',function (data) 
  {
    var myObj = JSON.parse(data);
              
$$('#BankFDReturn .table tbody').html("<tr><td>"+myObj.portfolio_name[0]+"</td><td>"+myObj.year_1[0]+"</td><td>"+myObj.year_3[0]+"</td><td>"+myObj.year_5[0]+"</td></tr>");

var total_weightage = myObj.total_weightage;
var total_classification =  myObj.total_classification;
var total_asset_class =  myObj.total_asset_class;
var total_color =  myObj.total_color;

var array_w=[],array_c=[],array_class=[],array_col=[];
var a="",b="",s=0,s1=0;
  
  for(var i=0;i<total_weightage.length;i++)
  {
    if(total_weightage[i]=="[" || total_weightage[i]=="," )
    {
      if(total_weightage[i]=="," && s1==0)
        a=a+";";
    }
      else
      {
        if(total_weightage[i]=="]")
          {
            s1=1;
            if(a!="")
            {
              array_w.push(a);
            }
            a="";
          }
          else
          {
            s1=0;
            a=a+total_weightage[i];
          }
        }
        
  }

  var k=0;
  for(var i=0;i<total_classification.length;i++)
  {
    if(total_classification[i]=="[" || total_classification[i]=="," )
    {
      if(total_classification[i]=="," && s==0)
       {
        b=b+";";
        k=1;
       } 
    }
      else
      {
        if(total_classification[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_c.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            if(k!=1)
            {
              if(b=="" && total_classification[i]==" ")
              {

              }
              else
              {
              b=b+total_classification[i];
            }
            }
            k=0;
          }
        }
        
  }

  var k=0;
  b="";
  s=0;
  for(var i=0;i<total_color.length;i++)
  {
    if(total_color[i]=="[" || total_color[i]=="," )
    {
      if(total_color[i]=="," && s==0)
       {
        b=b+";";
       } 
    }
      else
      {
        if(total_color[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_col.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            
              b=b+total_color[i];
           
          }
        }
        
  }

 
  b=""
   for(var i=0;i<total_asset_class.length;i++)
  {
    if(total_asset_class[i]=="[" || total_asset_class[i]=="," )
    {
      if(total_asset_class[i]=="," && s==0)
        b=b+";";
    }
      else
      {
        if(total_asset_class[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_class.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            b=b+total_asset_class[i];
          }
        }
        
  }
  
 
 var classification=[],color=[];
 var cfic,we,ass_class,colour;
 var seriesdate=[];
 var total_eq=0,total_db=0,total_gold=0;



$(function() {

for(var i=0;i<1;i++)
{
  color=[];
  classification=[];
  seriesdate=[];
  total_eq=0,total_db=0,total_gold=0;
  cfic=array_c[i].split(";");
  we=array_w[i].replace(/ /g, '').split(";");
  colour=array_col[i].replace(/ /g, '').split(";");
  ass_class=array_class[i].replace(/ /g, '').split(";");

  for(var j=0;j<cfic.length;j++)
  {
    if(j!=0 && cfic[j-1]==cfic[j] )
    {
      for(var k=0;k<seriesdate.length;k++)
      {
        var index=seriesdate[k].indexOf(cfic[j])
        if(index!=-1)
        {
          var s=seriesdate[k][1]+parseInt(we[j]);
          seriesdate[k][1]=s;
          break;
        }
      }
    }
    else
    {
     classification.push(cfic[j]);
    classification.push(parseInt(we[j]));
    color.push(colour[j]);
    seriesdate.push(classification)
    }
     
    if(ass_class[j]=="Equity")
    {
      total_eq=total_eq+parseInt(we[j]);
    }
    else if(ass_class[j]=="Debt")
    {
      total_db=total_db+parseInt(we[j]);
    }
    else if(ass_class[j]=="Gold")
    {
      total_gold=total_gold+parseInt(we[j]);
    }
    classification=[];
   

  }
   seriesdate=seriesdate.reverse();
      color=color.reverse();
      

 var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'GoalIndiC'+(i+1),
            type: 'pie',
            margin: [0, 0, 0, 0],
            backgroundColor: null
            
        },
        credits:{enabled: false},
        colors:color,
        title:{text: ''},
        plotOptions: {
            pie: {
                innerSize: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
               point: {
          events: {
            mouseOver: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            },
            mouseOut: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            }
          }
        },
        states: {
          hover: {
            brightness: 0,
            lineWidth: 0,
            halo: {
              size: 0
            }

          }
        }
            }
            
        
        },
        tooltip: {
              backgroundColor: 'transparent',
              borderColor: "none",
              shadow: false,
              useHTML: true,
              formatter: function () {      
                   return '<div class="tooltop">'+this.key + '<br>' + '<b>'+this.y+' %</b></div>';
                }
    },
        series: [{
                    name: ' ',
                    data: seriesdate
                    
                }]
    },
                                     
    function(chart) { 
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);
        for(var k=0;k<cfic.length;k++)
        {

        }
        var span = '<div class="row d_inline_f chartCircleInside" id="pieChartInfoTextC'+(i+1)+'"style="position:relative;">';
        span += '<div class="col-xs-6"><div class="ChartCIEQ"><div class="ChartCIP">'+total_eq+'</div><div class="ChartCIT">EQUITY</div></div></div>';
        span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+total_db+'</div><div class="ChartCIT">DEBT</div></div></div>';
        span += '</div>';

        $("#addTextC"+(i+1)).append(span);
        span = $('#pieChartInfoTextC'+(i+1));
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
}
});


window.onorientationchange = function()
{
   window.location.reload();
}




  });
}

/************************************ Beat Bank FDs END ******************************** */ 

/************************************ Child Education START ****************************** */

if(page.name==='OfferISGBPChild')
{
  $$.get(curr_ip+'app_services/is_goal_child',function (data) 
  {
    var myObj = JSON.parse(data);
              
    $$('#Tab5Years .table tbody').html("<tr><td>"+myObj.portfolio_name[0]+"</td><td>"+myObj.year_1[0]+"</td><td>"+myObj.year_3[0]+"</td><td>"+myObj.year_5[0]+"</td></tr>");
    $$('#Tab5to10Years .table tbody').html("<tr><td>"+myObj.portfolio_name[1]+"</td><td>"+myObj.year_1[1]+"</td><td>"+myObj.year_3[1]+"</td><td>"+myObj.year_5[1]+"</td></tr>");
    $$('#Tab10Years .table tbody').html("<tr><td>"+myObj.portfolio_name[2]+"</td><td>"+myObj.year_1[2]+"</td><td>"+myObj.year_3[2]+"</td><td>"+myObj.year_5[2]+"</td></tr>");


var total_weightage = myObj.total_weightage;
var total_classification =  myObj.total_classification;
var total_asset_class =  myObj.total_asset_class;
var total_color =  myObj.total_color;

var array_w=[],array_c=[],array_class=[],array_col=[];
var a="",b="",s=0,s1=0;

  for(var i=0;i<total_weightage.length;i++)
  {
    if(total_weightage[i]=="[" || total_weightage[i]=="," )
    {
      if(total_weightage[i]=="," && s1==0)
        a=a+";";
    }
      else
      {
        if(total_weightage[i]=="]")
          {
            s1=1;
            if(a!="")
            {
              array_w.push(a);
            }
            a="";
          }
          else
          {
            s1=0;
            a=a+total_weightage[i];
          }
        }
        
  }

  var k=0;
  for(var i=0;i<total_classification.length;i++)
  {
    if(total_classification[i]=="[" || total_classification[i]=="," )
    {
      if(total_classification[i]=="," && s==0)
       {
        b=b+";";
        k=1;
       } 
    }
      else
      {
        if(total_classification[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_c.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            if(k!=1)
            {
              if(b=="" && total_classification[i]==" ")
              {

              }
              else
              {
              b=b+total_classification[i];
            }
            }
            k=0;
          }
        }
        
  }

  var k=0;
  b="";
  s=0;
  for(var i=0;i<total_color.length;i++)
  {
    if(total_color[i]=="[" || total_color[i]=="," )
    {
      if(total_color[i]=="," && s==0)
       {
        b=b+";";
       } 
    }
      else
      {
        if(total_color[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_col.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            
              b=b+total_color[i];
           
          }
        }
        
  }


  b=""
   for(var i=0;i<total_asset_class.length;i++)
  {
    if(total_asset_class[i]=="[" || total_asset_class[i]=="," )
    {
      if(total_asset_class[i]=="," && s==0)
        b=b+";";
    }
      else
      {
        if(total_asset_class[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_class.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            b=b+total_asset_class[i];
          }
        }
        
  }
  
 
 var classification=[],color=[];
 var cfic,we,ass_class,colour;
 var seriesdate=[];
 var total_eq=0,total_db=0,total_gold=0;

chart_drawn(0,1)
chart_drawn(1,2);
chart_drawn(2,3);
;

function chart_drawn(start,end)
{

for(var i=start;i<end;i++)
{
  color=[];
  classification=[];
  seriesdate=[];
  total_eq=0,total_db=0,total_gold=0;
  cfic=array_c[i].split(";");
  we=array_w[i].replace(/ /g, '').split(";");
  colour=array_col[i].replace(/ /g, '').split(";");
  ass_class=array_class[i].replace(/ /g, '').split(";");
  for(var j=0;j<cfic.length;j++)
  {
    if(j!=0 && cfic[j-1]==cfic[j] )
    {
     // var s=seriesdate[j-1][1]+parseInt(we[j]);
      // var s=parseInt(we[j-1])+parseInt(we[j]);
      for(var k=0;k<seriesdate.length;k++)
      {
        var index=seriesdate[k].indexOf(cfic[j])
        if(index!=-1)
        {
          var s=seriesdate[k][1]+parseInt(we[j]);
          seriesdate[k][1]=s;
          break;
        }
      }
      // seriesdate[j-1][1]=s;
    }
    else
    {
    classification.push(cfic[j]);
    classification.push(parseInt(we[j]));
    color.push(colour[j]);
    seriesdate.push(classification)
    }
     
    if(ass_class[j]=="Equity")
    {
      total_eq=total_eq+parseInt(we[j]);
    }
    else if(ass_class[j]=="Debt")
    {
      total_db=total_db+parseInt(we[j]);
    }
    else if(ass_class[j]=="Gold")
    {
      total_gold=total_gold+parseInt(we[j]);
    }
    classification=[];
   

  }
    seriesdate=seriesdate.reverse();
    color=color.reverse();

 var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'GoalIndiC'+(i+1),
            type: 'pie',
            margin: [0, 0, 0, 0],
            backgroundColor: null
            
        },
        credits:{enabled: false},
        colors:color,
        title:{text: ''},
        // subtitle: {text:'60% Equity 40% Debt', style: {
        //         color: '#0000ff',
        //         fontWeight: 'bold'
        //     }
        //   },
        plotOptions: {
            pie: {
                innerSize: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
               point: {
          events: {
            mouseOver: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            },
            mouseOut: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            }
          }
        },
        states: {
          hover: {
            brightness: 0,
            lineWidth: 0,
            halo: {
              size: 0
            }

          }
        }
            }
            
        
        },
        tooltip: {
               backgroundColor: 'transparent',
               borderColor: "none",
              // followPointer: true,
              shadow: false,
              useHTML: true,
              formatter: function () {      
                   return '<div class="tooltop">'+this.key + '<br>' + '<b>'+this.y+' %</b></div>';
                }
    },
        series: [{
                            name: ' ',
                              data: seriesdate
                            
                        }]
    },
                                     
    function(chart) { // on complete
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);
        for(var k=0;k<cfic.length;k++)
        {

        }
        var span = '<div class="row d_inline_f chartCircleInside" id="pieChartInfoTextC'+(i+1)+'"style="position:relative;">';
        span += '<div class="col-xs-6"><div class="ChartCIEQ"><div class="ChartCIP">'+total_eq+'</div><div class="ChartCIT">EQUITY</div></div></div>';
        span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+total_db+'</div><div class="ChartCIT">DEBT</div></div></div>';
        span += '</div>';
        $("#addTextC"+(i+1)).empty();
        $("#addTextC"+(i+1)).append(span);
        span = $('#pieChartInfoTextC'+(i+1));
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
}
}



    $("#GBILow").click(function(){      
      chart_drawn(0,1);
    });
    $("#GBIMod").click(function(){     
      chart_drawn(1,2);
    });
    $("#GBIHigh").click(function(){      
      chart_drawn(2,3);
    });
 




window.onorientationchange = function()
{
   window.location.reload();
}



  });
}



/************************************ Child Education END ******************************** */

/************************************ Tax START ****************************** */

if(page.name==='OfferISGBPTax')
{
  $$.get(curr_ip+'app_services/is_goal_tax',function (data) 
  {
    var myObj = JSON.parse(data);
              
    $$('#TaxReturn .table tbody').html("<tr><td>"+myObj.portfolio_name[0]+"</td><td>"+myObj.year_1[0]+"</td><td>"+myObj.year_3[0]+"</td><td>"+myObj.year_5[0]+"</td></tr>");
    
    var total_weightage = myObj.total_weightage;
    var total_classification =  myObj.total_classification;
    var total_asset_class =  myObj.total_asset_class;
    var total_color =  myObj.total_color;


var array_w=[],array_c=[],array_class=[],array_col=[];
var a="",b="",s=0,s1=0;

  for(var i=0;i<total_weightage.length;i++)
  {
    if(total_weightage[i]=="[" || total_weightage[i]=="," )
    {
      if(total_weightage[i]=="," && s1==0)
        a=a+";";
    }
      else
      {
        if(total_weightage[i]=="]")
          {
            s1=1;
            if(a!="")
            {
              array_w.push(a);
            }
            a="";
          }
          else
          {
            s1=0;
            a=a+total_weightage[i];
          }
        }
        
  }

  var k=0;
  for(var i=0;i<total_classification.length;i++)
  {
    if(total_classification[i]=="[" || total_classification[i]=="," )
    {
      if(total_classification[i]=="," && s==0)
       {
        b=b+";";
        k=1;
       } 
    }
      else
      {
        if(total_classification[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_c.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            if(k!=1)
            {
              if(b=="" && total_classification[i]==" ")
              {

              }
              else
              {
              b=b+total_classification[i];
            }
            }
            k=0;
          }
        }
        
  }

  var k=0;
  b="";
  s=0;
  for(var i=0;i<total_color.length;i++)
  {
    if(total_color[i]=="[" || total_color[i]=="," )
    {
      if(total_color[i]=="," && s==0)
       {
        b=b+";";
       } 
    }
      else
      {
        if(total_color[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_col.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            
              b=b+total_color[i];
           
          }
        }
        
  }


  
  b=""
   for(var i=0;i<total_asset_class.length;i++)
  {
    if(total_asset_class[i]=="[" || total_asset_class[i]=="," )
    {
      if(total_asset_class[i]=="," && s==0)
        b=b+";";
    }
      else
      {
        if(total_asset_class[i]=="]")
          {
            s=1;
            if(b!="")
            {
              // b=b+";"
              array_class.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            b=b+total_asset_class[i];
          }
        }
        
  }
  
 
 var classification=[],color=[];
 var cfic,we,ass_class,colour;
 var seriesdate=[];
 var total_eq=0,total_db=0,total_gold=0;

$(function() {

for(var i=0;i<1;i++)
{
  color=[];
  classification=[];
  seriesdate=[];
  total_eq=0,total_db=0,total_gold=0;
  cfic=array_c[i].split(";");
  we=array_w[i].replace(/ /g, '').split(";");
  colour=array_col[i].replace(/ /g, '').split(";");
  ass_class=array_class[i].replace(/ /g, '').split(";");
  for(var j=0;j<cfic.length;j++)
  {
    if(j!=0 && cfic[j-1]==cfic[j] )
    {
     // var s=seriesdate[j-1][1]+parseInt(we[j]);
      // var s=parseInt(we[j-1])+parseInt(we[j]);
      for(var k=0;k<seriesdate.length;k++)
      {
        var index=seriesdate[k].indexOf(cfic[j])
        if(index!=-1)
        {
          var s=seriesdate[k][1]+parseInt(we[j]);
          seriesdate[k][1]=s;
          break;
        }
      }
      // seriesdate[j-1][1]=s;
    }
    else
    {
     classification.push(cfic[j]);
    classification.push(parseInt(we[j]));
    color.push(colour[j]);
    seriesdate.push(classification)
    }
     
    if(ass_class[j]=="Equity")
    {
      total_eq=total_eq+parseInt(we[j]);
    }
    else if(ass_class[j]=="Debt")
    {
      total_db=total_db+parseInt(we[j]);
    }
    else if(ass_class[j]=="Gold")
    {
      total_gold=total_gold+parseInt(we[j]);
    }
    classification=[];
   

  }
   seriesdate=seriesdate.reverse();
      color=color.reverse();
      

 var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'GoalIndiC'+(i+1),
            type: 'pie',
            margin: [0, 0, 0, 0],
            backgroundColor: null
            
        },
        credits:{enabled: false},
        colors:color,
        title:{text: ''},
        // subtitle: {text:'60% Equity 40% Debt', style: {
        //         color: '#0000ff',
        //         fontWeight: 'bold'
        //     }
        //   },
        plotOptions: {
            pie: {
                innerSize: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
               point: {
          events: {
            mouseOver: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            },
            mouseOut: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            }
          }
        },
        states: {
          hover: {
            brightness: 0,
            lineWidth: 0,
            halo: {
              size: 0
            }

          }
        }
            }
            
        
        },
        tooltip: {
              backgroundColor: 'transparent',
               borderColor: "none",
              // followPointer: true,
              shadow: false,
              useHTML: true,
              formatter: function () {      
                   return '<div class="tooltop">'+this.key + '<br>' + '<b>'+this.y+' %</b></div>';
                }
    },
        series: [{
                            name: ' ',
                              data: seriesdate
                            
                        }]
    },
                                     
    function(chart) { // on complete
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);
        for(var k=0;k<cfic.length;k++)
        {

        }
        var span = '<div class="row d_inline_f chartCircleInside" id="pieChartInfoTextC'+(i+1)+'"style="position:relative;">';
        span += '<div class="col-xs-6"><div class="ChartCIEQ"><div class="ChartCIP">'+total_eq+'</div><div class="ChartCIT">EQUITY</div></div></div>';
        span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+total_db+'</div><div class="ChartCIT">DEBT</div></div></div>';
        span += '</div>';

        $("#addTextC"+(i+1)).append(span);
        span = $('#pieChartInfoTextC'+(i+1));
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
}
});


window.onorientationchange = function()
{
   window.location.reload();
}


  });
}


/************************************ Tax END ******************************** */ 

/************************************ Park Surplus Cash START ****************************** */ 

if(page.name==='OfferISGBPCash')
{
  $$.get(curr_ip+'app_services/is_goal_cash',function (data) 
  {
    var myObj = JSON.parse(data);
              
    $$('#CashReturn .table tbody').html("<tr><td>"+myObj.portfolio_name+"</td><td>"+myObj.year_1[0]+"</td><td>"+myObj.year_3[0]+"</td><td>"+myObj.year_5[0]+"</td></tr>");
    
    var total_weightage = myObj.total_weightage;
    var total_classification =  myObj.total_classification;
    var total_asset_class =  myObj.total_asset_class;
    var total_color =  myObj.total_color;

var array_w=[],array_c=[],array_class=[],array_col=[];
var a="",b="",s=0,s1=0;

  for(var i=0;i<total_weightage.length;i++)
  {
    if(total_weightage[i]=="[" || total_weightage[i]=="," )
    {
      if(total_weightage[i]=="," && s1==0)
        a=a+";";
    }
      else
      {
        if(total_weightage[i]=="]")
          {
            s1=1;
            if(a!="")
            {
              array_w.push(a);
            }
            a="";
          }
          else
          {
            s1=0;
            a=a+total_weightage[i];
          }
        }
        
  }

  var k=0;
  for(var i=0;i<total_classification.length;i++)
  {
    if(total_classification[i]=="[" || total_classification[i]=="," )
    {
      if(total_classification[i]=="," && s==0)
       {
        b=b+";";
        k=1;
       } 
    }
      else
      {
        if(total_classification[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_c.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            if(k!=1)
            {
              if(b=="" && total_classification[i]==" ")
              {

              }
              else
              {
              b=b+total_classification[i];
            }
            }
            k=0;
          }
        }
        
  }

  var k=0;
  b="";
  s=0;
  for(var i=0;i<total_color.length;i++)
  {
    if(total_color[i]=="[" || total_color[i]=="," )
    {
      if(total_color[i]=="," && s==0)
       {
        b=b+";";
       } 
    }
      else
      {
        if(total_color[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_col.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            
              b=b+total_color[i];
           
          }
        }
        
  }


  b=""
   for(var i=0;i<total_asset_class.length;i++)
  {
    if(total_asset_class[i]=="[" || total_asset_class[i]=="," )
    {
      if(total_asset_class[i]=="," && s==0)
        b=b+";";
    }
      else
      {
        if(total_asset_class[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_class.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            b=b+total_asset_class[i];
          }
        }
        
  }
  
 
 var classification=[],color=[];
 var cfic,we,ass_class,colour;
 var seriesdate=[];
 var total_eq=0,total_db=0,total_gold=0;

$(function() {

for(var i=0;i<1;i++)
{
  color=[];
  classification=[];
  seriesdate=[];
  total_eq=0,total_db=0,total_gold=0;
  cfic=array_c[i].split(";");
  we=array_w[i].replace(/ /g, '').split(";");
  colour=array_col[i].replace(/ /g, '').split(";");
  ass_class=array_class[i].replace(/ /g, '').split(";");
  for(var j=0;j<cfic.length;j++)
  {
    if(j!=0 && cfic[j-1]==cfic[j] )
    {
     
      for(var k=0;k<seriesdate.length;k++)
      {
        var index=seriesdate[k].indexOf(cfic[j])
        if(index!=-1)
        {
          var s=seriesdate[k][1]+parseInt(we[j]);
          seriesdate[k][1]=s;
          break;
        }
      }
      
    }
    else
    {
     classification.push(cfic[j]);
    classification.push(parseInt(we[j]));
    color.push(colour[j]);
    seriesdate.push(classification)
    }
     
    if(ass_class[j]=="Equity")
    {
      total_eq=total_eq+parseInt(we[j]);
    }
    else if(ass_class[j]=="Debt")
    {
      total_db=total_db+parseInt(we[j]);
    }
    else if(ass_class[j]=="Gold")
    {
      total_gold=total_gold+parseInt(we[j]);
    }
    classification=[];
   

  }
   seriesdate=seriesdate.reverse();
   color=color.reverse();

 var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'GoalIndiC'+(i+1),
            type: 'pie',
            margin: [0, 0, 0, 0],
            backgroundColor: null
            
        },
        credits:{enabled: false},
        colors:color,
        title:{text: ''},
        plotOptions: {
            pie: {
                innerSize: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
               point: {
          events: {
            mouseOver: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            },
            mouseOut: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            }
          }
        },
        states: {
          hover: {
            brightness: 0,
            lineWidth: 0,
            halo: {
              size: 0
            }

          }
        }
            }
            
        
        },
        tooltip: {
               backgroundColor: 'transparent',
               borderColor: "none",
               shadow: false,
               useHTML: true,
               formatter: function () {      
                   return '<div class="tooltop">'+this.key + '<br>' + '<b>'+this.y+' %</b></div>';
                }
    },
        series: [{
                    name: ' ',
                    data: seriesdate
                    
                }]
    },
                                     
    function(chart) {
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);
        for(var k=0;k<cfic.length;k++)
        {

        }
        var span = '<div class="row d_inline_f chartCircleInside" id="pieChartInfoTextC'+(i+1)+'"style="position:relative;">';
        span += '<div class="col-xs-6"><div class="ChartCIEQ"><div class="ChartCIP">'+total_eq+'</div><div class="ChartCIT">EQUITY</div></div></div>';
        span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+total_db+'</div><div class="ChartCIT">DEBT</div></div></div>';
        span += '</div>';

        $("#addTextC"+(i+1)).append(span);
        span = $('#pieChartInfoTextC'+(i+1));
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
}
});


window.onorientationchange = function()
{
   window.location.reload();
}




  });
}


/************************************ Park Surplus Cash END ******************************** */ 


/************************************ Capital Preservation START ****************************** */ 

    if(page.name==='OfferISGBPCapital')
    {
        $$.get(curr_ip+'app_services/is_goal_capital',function (data) 
       {
          var myObj = JSON.parse(data);               
              
    $$('#Tab5Years .table tbody').html("<tr><td>"+myObj.portfolio_name[0]+"</td><td>"+myObj.year_1[0]+"</td><td>"+myObj.year_3[0]+"</td><td>"+myObj.year_5[0]+"</td></tr>");
    $$('#Tab5to10Years .table tbody').html("<tr><td>"+myObj.portfolio_name[1]+"</td><td>"+myObj.year_1[1]+"</td><td>"+myObj.year_3[1]+"</td><td>"+myObj.year_5[1]+"</td></tr>");
    $$('#Tab10Years .table tbody').html("<tr><td>"+myObj.portfolio_name[2]+"</td><td>"+myObj.year_1[2]+"</td><td>"+myObj.year_3[2]+"</td><td>"+myObj.year_5[2]+"</td></tr>");

    var total_weightage = myObj.total_weightage;
    var total_classification =  myObj.total_classification;
    var total_asset_class =  myObj.total_asset_class;
    var total_color =  myObj.total_color;

var array_w=[],array_c=[],array_class=[],array_col=[];
var a="",b="",s=0,s1=0;

  for(var i=0;i<total_weightage.length;i++)
  {
    if(total_weightage[i]=="[" || total_weightage[i]=="," )
    {
      if(total_weightage[i]=="," && s1==0)
        a=a+";";
    }
      else
      {
        if(total_weightage[i]=="]")
          {
            s1=1;
            if(a!="")
            {
              array_w.push(a);
            }
            a="";
          }
          else
          {
            s1=0;
            a=a+total_weightage[i];
          }
        }
        
  }

  var k=0;
  for(var i=0;i<total_classification.length;i++)
  {
    if(total_classification[i]=="[" || total_classification[i]=="," )
    {
      if(total_classification[i]=="," && s==0)
       {
        b=b+";";
        k=1;
       } 
    }
      else
      {
        if(total_classification[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_c.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            if(k!=1)
            {
              if(b=="" && total_classification[i]==" ")
              {

              }
              else
              {
              b=b+total_classification[i];
            }
            }
            k=0;
          }
        }
        
  }

  var k=0;
  b="";
  s=0;
  for(var i=0;i<total_color.length;i++)
  {
    if(total_color[i]=="[" || total_color[i]=="," )
    {
      if(total_color[i]=="," && s==0)
       {
        b=b+";";
       } 
    }
      else
      {
        if(total_color[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_col.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            
              b=b+total_color[i];
           
          }
        }
        
  }


  b=""
   for(var i=0;i<total_asset_class.length;i++)
  {
    if(total_asset_class[i]=="[" || total_asset_class[i]=="," )
    {
      if(total_asset_class[i]=="," && s==0)
        b=b+";";
    }
      else
      {
        if(total_asset_class[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_class.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            b=b+total_asset_class[i];
          }
        }
        
  }
  

 var classification=[],color=[];
 var cfic,we,ass_class,colour;
 var seriesdate=[];
 var total_eq=0,total_db=0,total_gold=0;

chart_drawn(0,1);
chart_drawn(1,2);
chart_drawn(2,3);

function chart_drawn(start,end)
{

for(var i=start;i<end;i++)
{
  color=[];
  classification=[];
  seriesdate=[];
  total_eq=0,total_db=0,total_gold=0;
  cfic=array_c[i].split(";");
  we=array_w[i].replace(/ /g, '').split(";");
  colour=array_col[i].replace(/ /g, '').split(";");
  ass_class=array_class[i].replace(/ /g, '').split(";");
  for(var j=0;j<cfic.length;j++)
  {
    if(j!=0 && cfic[j-1]==cfic[j] )
    {
     
      for(var k=0;k<seriesdate.length;k++)
      {
        var index=seriesdate[k].indexOf(cfic[j])
        if(index!=-1)
        {
          var s=seriesdate[k][1]+parseInt(we[j]);
          seriesdate[k][1]=s;
          break;
        }
      }
      
    }
    else
    {
     classification.push(cfic[j]);
    classification.push(parseInt(we[j]));
    color.push(colour[j]);
    seriesdate.push(classification)
    }
     
    if(ass_class[j]=="Equity")
    {
      total_eq=total_eq+parseInt(we[j]);
    }
    else if(ass_class[j]=="Debt")
    {
      total_db=total_db+parseInt(we[j]);
    }
    else if(ass_class[j]=="Gold")
    {
      total_gold=total_gold+parseInt(we[j]);
    }
    classification=[];
   

  }
   seriesdate=seriesdate.reverse();
   color=color.reverse();
      

 var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'GoalIndiC'+(i+1),
            type: 'pie',
            margin: [0, 0, 0, 0],
            backgroundColor: null
            
        },
        credits:{enabled: false},
        colors:color,
        title:{text: ''},
        plotOptions: {
            pie: {
                innerSize: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
               point: {
          events: {
            mouseOver: function() {
              this.graphic.attr({
                r: this.shapeArgs.r + 10
              });
            },
            mouseOut: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            }
          }
        },
        states: {
          hover: {
            brightness: 0,
            lineWidth: 0,
            halo: {
              size: 0
            }

          }
        }
            }
            
        
        },
        tooltip: {
              backgroundColor: 'transparent',
              borderColor: "none",
              shadow: false,
              useHTML: true,
              formatter: function () {      
                   return '<div class="tooltop">'+this.key + '<br>' + '<b>'+this.y+' %</b></div>';
                }
    },
        series: [{
                    name: ' ',
                    data: seriesdate
                    
                }]
    },
                                     
    function(chart) { 
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);
        for(var k=0;k<cfic.length;k++)
        {

        }
        var span = '<div class="row d_inline_f chartCircleInside" id="pieChartInfoTextC'+(i+1)+'"style="position:relative;">';
        span += '<div class="col-xs-6"><div class="ChartCIEQ"><div class="ChartCIP">'+total_eq+'</div><div class="ChartCIT">EQUITY</div></div></div>';
        span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+total_db+'</div><div class="ChartCIT">DEBT</div></div></div>';
        span += '</div>';
        $("#addTextC"+(i+1)).empty();
        $("#addTextC"+(i+1)).append(span);
        span = $('#pieChartInfoTextC'+(i+1));
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
}



}


    $("#GBILow").click(function(){
      chart_drawn(0,1);
    });
    $("#GBIMod").click(function(){
      chart_drawn(1,2);
    });
    $("#GBIHigh").click(function(){
      chart_drawn(2,3);
    });
    


window.onorientationchange = function()
{
   window.location.reload();
}

                      
       });
    }

/************************************ Capital Preservation END ******************************** */ 


/************************************ Gold START ****************************** */ 

if(page.name==='OfferISGBPGold')
{
  $$.get(curr_ip+'app_services/is_goal_gold',function (data) 
  {
    var myObj = JSON.parse(data);
              
    $$('#GoldReturn .table tbody').html("<tr><td>"+myObj.portfolio_name[0]+"</td><td>"+myObj.year_1[0]+"</td><td>"+myObj.year_3[0]+"</td><td>"+myObj.year_5[0]+"</td></tr>");
    
    var total_weightage = myObj.total_weightage;
    var total_classification =  myObj.total_classification;
    var total_asset_class =  myObj.total_asset_class;
    var total_color =  myObj.total_color;

var array_w=[],array_c=[],array_class=[],array_col=[];
var a="",b="",s=0,s1=0;

  for(var i=0;i<total_weightage.length;i++)
  {
    if(total_weightage[i]=="[" || total_weightage[i]=="," )
    {
      if(total_weightage[i]=="," && s1==0)
        a=a+";";
    }
      else
      {
        if(total_weightage[i]=="]")
          {
            s1=1;
            if(a!="")
            {
              array_w.push(a);
            }
            a="";
          }
          else
          {
            s1=0;
            a=a+total_weightage[i];
          }
        }
        
  }

  var k=0;
  for(var i=0;i<total_classification.length;i++)
  {
    if(total_classification[i]=="[" || total_classification[i]=="," )
    {
      if(total_classification[i]=="," && s==0)
       {
        b=b+";";
        k=1;
       } 
    }
      else
      {
        if(total_classification[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_c.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            if(k!=1)
            {
              if(b=="" && total_classification[i]==" ")
              {

              }
              else
              {
              b=b+total_classification[i];
            }
            }
            k=0;
          }
        }
        
  }

  var k=0;
  b="";
  s=0;
  for(var i=0;i<total_color.length;i++)
  {
    if(total_color[i]=="[" || total_color[i]=="," )
    {
      if(total_color[i]=="," && s==0)
       {
        b=b+";";
       } 
    }
      else
      {
        if(total_color[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_col.push(b);
            }
            b="";
          }
          else
            {
              s=0;
              b=b+total_color[i];
            }
          }
        
  }

  b=""
   for(var i=0;i<total_asset_class.length;i++)
  {
    if(total_asset_class[i]=="[" || total_asset_class[i]=="," )
    {
      if(total_asset_class[i]=="," && s==0)
        b=b+";";
    }
      else
      {
        if(total_asset_class[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_class.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            b=b+total_asset_class[i];
          }
        }
        
  }
  
 
 var classification=[],color=[];
 var cfic,we,ass_class,colour;
 var seriesdate=[];
 var total_eq=0,total_db=0,total_gold=0;

$(function() {

for(var i=0;i<1;i++)
{
  color=[];
  classification=[];
  seriesdate=[];
  total_eq=0,total_db=0,total_gold=0;
  cfic=array_c[i].split(";");
  we=array_w[i].replace(/ /g, '').split(";");
  colour=array_col[i].replace(/ /g, '').split(";");
  ass_class=array_class[i].replace(/ /g, '').split(";");
  for(var j=0;j<cfic.length;j++)
  {
    if(j!=0 && cfic[j-1]==cfic[j] )
    {
     
      for(var k=0;k<seriesdate.length;k++)
      {
        var index=seriesdate[k].indexOf(cfic[j])
        if(index!=-1)
        {
          var s=seriesdate[k][1]+parseInt(we[j]);
          seriesdate[k][1]=s;
          break;
        }
      }
  
    }
    else
    {
    classification.push(cfic[j]);
    classification.push(parseInt(we[j]));
    color.push(colour[j]);
    seriesdate.push(classification)
    }
     
    if(ass_class[j]=="Equity")
    {
      total_eq=total_eq+parseInt(we[j]);
    }
    else if(ass_class[j]=="Debt")
    {
      total_db=total_db+parseInt(we[j]);
    }
    else if(ass_class[j]=="Gold")
    {
      total_gold=total_gold+parseInt(we[j]);
    }
    classification=[];
   

  }
    seriesdate=seriesdate.reverse();
    color=color.reverse();

 var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'GoalIndiC'+(i+1),
            type: 'pie',
            margin: [0, 0, 0, 0],
            backgroundColor: null
            
        },
        credits:{enabled: false},
        colors:color,
        title:{text: ''},
        plotOptions: {
            pie: {
                innerSize: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
               point: {
          events: {
            mouseOver: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            },
            mouseOut: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            }
          }
        },
        states: {
          hover: {
            brightness: 0,
            lineWidth: 0,
            halo: {
              size: 0
            }

          }
        }
            }
            
        
        },
        tooltip: {
              backgroundColor: 'transparent',
              borderColor: "none",
              shadow: false,
              useHTML: true,
              formatter: function () {      
                   return '<div class="tooltop">'+this.key + '<br>' + '<b>'+this.y+' %</b></div>';
                }
    },
        series: [{
                    name: ' ',
                    data: seriesdate
                    
                }]
    },
                                     
    function(chart) {
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);
        for(var k=0;k<cfic.length;k++)
        {

        }
        var span = '<div class="row d_inline_f chartCircleInside" id="pieChartInfoTextC'+(i+1)+'"style="position:relative;">';
        span += '<div class="col-xs-12"><div class="ChartCIEQ"><div class="ChartCIP">'+total_gold+'</div><div class="ChartCIT">GOLD</div></div></div>';
        // span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+total_db+'</div><div class="ChartCIT">DEBT</div></div></div>';
        span += '</div>';

        $("#addTextC"+(i+1)).append(span);
        span = $('#pieChartInfoTextC'+(i+1));
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
}
});

window.onorientationchange = function()
{
   window.location.reload();
}




  });
}


/************************************ Gold END ******************************** */ 


/************************************ Sectoral Play START ****************************** */ 

if(page.name==='OfferISGBPSectoral')
{
  $$.get(curr_ip+'app_services/is_goal_sectoral',function (data) 
  {
    var myObj = JSON.parse(data);
              
    $$('#TabPharma .table tbody').html("<tr><td>"+myObj.portfolio_name[0]+"</td><td>"+myObj.year_1[0]+"</td><td>"+myObj.year_3[0]+"</td><td>"+myObj.year_5[0]+"</td></tr>");
    $$('#TabFinancial .table tbody').html("<tr><td>"+myObj.portfolio_name[1]+"</td><td>"+myObj.year_1[1]+"</td><td>"+myObj.year_3[1]+"</td><td>"+myObj.year_5[1]+"</td></tr>");
    $$('#TabIT .table tbody').html("<tr><td>"+myObj.portfolio_name[2]+"</td><td>"+myObj.year_1[2]+"</td><td>"+myObj.year_3[2]+"</td><td>"+myObj.year_5[2]+"</td></tr>");
    $$('#TabInfra .table tbody').html("<tr><td>"+myObj.portfolio_name[3]+"</td><td>"+myObj.year_1[3]+"</td><td>"+myObj.year_3[3]+"</td><td>"+myObj.year_5[3]+"</td></tr>");
 
    var total_weightage = myObj.total_weightage;
    var total_classification =  myObj.total_classification;
    var total_asset_class =  myObj.total_asset_class;
    var total_color =  myObj.total_color;

var array_w=[],array_c=[],array_class=[],array_col=[];
var a="",b="",s=0,s1=0;

  for(var i=0;i<total_weightage.length;i++)
  {
    if(total_weightage[i]=="[" || total_weightage[i]=="," )
    {
      if(total_weightage[i]=="," && s1==0)
        a=a+";";
    }
      else
      {
        if(total_weightage[i]=="]")
          {
            s1=1;
            if(a!="")
            {
              array_w.push(a);
            }
            a="";
          }
          else
          {
            s1=0;
            a=a+total_weightage[i];
          }
        }
        
  }

  var k=0;
  for(var i=0;i<total_classification.length;i++)
  {
    if(total_classification[i]=="[" || total_classification[i]=="," )
    {
      if(total_classification[i]=="," && s==0)
       {
        b=b+";";
        k=1;
       } 
    }
      else
      {
        if(total_classification[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_c.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            if(k!=1)
            {
              if(b=="" && total_classification[i]==" ")
              {

              }
              else
              {
              b=b+total_classification[i];
            }
            }
            k=0;
          }
        }
        
  }

  var k=0;
  b="";
  s=0;
  for(var i=0;i<total_color.length;i++)
  {
    if(total_color[i]=="[" || total_color[i]=="," )
    {
      if(total_color[i]=="," && s==0)
       {
        b=b+";";
       } 
    }
      else
      {
        if(total_color[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_col.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            
              b=b+total_color[i];
           
          }
        }
        
  }


  
  b=""
   for(var i=0;i<total_asset_class.length;i++)
  {
    if(total_asset_class[i]=="[" || total_asset_class[i]=="," )
    {
      if(total_asset_class[i]=="," && s==0)
        b=b+";";
    }
      else
      {
        if(total_asset_class[i]=="]")
          {
            s=1;
            if(b!="")
            {
              array_class.push(b);
            }
            b="";
          }
          else
          {
            s=0;
            b=b+total_asset_class[i];
          }
        }
        
  }
  
 
 var classification=[],color=[];
 var cfic,we,ass_class,colour;
 var seriesdate=[];
 var total_eq=0,total_db=0,total_gold=0;

chart_drawn(0,1);
chart_drawn(1,2);
chart_drawn(2,3);
chart_drawn(3,4);

function chart_drawn(start,end)
{

for(var i=start;i<end;i++)
{
  color=[];
  classification=[];
  seriesdate=[];
  total_eq=0,total_db=0,total_gold=0;
  cfic=array_c[i].split(";");
  we=array_w[i].replace(/ /g, '').split(";");
  colour=array_col[i].replace(/ /g, '').split(";");
  ass_class=array_class[i].replace(/ /g, '').split(";");
  for(var j=0;j<cfic.length;j++)
  {
    if(j!=0 && cfic[j-1]==cfic[j] )
    {
     
      for(var k=0;k<seriesdate.length;k++)
      {
        var index=seriesdate[k].indexOf(cfic[j])
        if(index!=-1)
        {
          var s=seriesdate[k][1]+parseInt(we[j]);
          seriesdate[k][1]=s;
          break;
        }
      }
     
    }
    else
    {
     classification.push(cfic[j]);
    classification.push(parseInt(we[j]));
    color.push(colour[j]);
    seriesdate.push(classification)
    }
     
    if(ass_class[j]=="Equity")
    {
      total_eq=total_eq+parseInt(we[j]);
    }
    else if(ass_class[j]=="Debt")
    {
      total_db=total_db+parseInt(we[j]);
    }
    else if(ass_class[j]=="Gold")
    {
      total_gold=total_gold+parseInt(we[j]);
    }
    classification=[];
   

  }
    seriesdate=seriesdate.reverse();
    color=color.reverse();

 var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'GoalIndiC'+(i+1),
            type: 'pie',
            margin: [0, 0, 0, 0],
            backgroundColor: null
            
        },
        credits:{enabled: false},
        colors:color,
        title:{text: ''},
        plotOptions: {
            pie: {
                innerSize: '80%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
               point: {
          events: {
            mouseOver: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            },
            mouseOut: function() {
              this.graphic.attr({
                r: this.shapeArgs.r
              });
            }
          }
        },
        states: {
          hover: {
            brightness: 0,
            lineWidth: 0,
            halo: {
              size: 0
            }

          }
        }
            }
            
        
        },
        tooltip: {
              backgroundColor: 'transparent',
              borderColor: "none",
              shadow: false,
              useHTML: true,
              formatter: function () {      
                   return '<div class="tooltop">'+this.key + '<br>' + '<b>'+this.y+' %</b></div>';
                }
    },
        series: [{
                    name: ' ',
                    data: seriesdate                    
                }]
    },
                                     
    function(chart) { 
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);
        for(var k=0;k<cfic.length;k++)
        {

        }
        var span = '<div class="row d_inline_f chartCircleInside" id="pieChartInfoTextC'+(i+1)+'"style="position:relative;">';
        span += '<div class="col-xs-6"><div class="ChartCIEQ"><div class="ChartCIP">'+total_eq+'</div><div class="ChartCIT">EQUITY</div></div></div>';
        span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+total_db+'</div><div class="ChartCIT">DEBT</div></div></div>';
        span += '</div>';
        $("#addTextC"+(i+1)).empty();
        $("#addTextC"+(i+1)).append(span);
        span = $('#pieChartInfoTextC'+(i+1));
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
}


}


    $("#GBIPharm").click(function(){
      chart_drawn(0,1);
    });
    $("#GBIFin").click(function(){
      chart_drawn(1,2);
    });
    $("#GBIIT").click(function(){
      chart_drawn(2,3);
    });
    $("#GBIInfra").click(function(){
      chart_drawn(3,4);
    });


window.onorientationchange = function()
{
   window.location.reload();
}


  });
}


/************************************ Sectoral Play END ******************************** */ 





    if(page.name==='ToolsScreener')
    {
      
        $.getScript("js/screener.js");
        //start_loading();

        $(".dropbox_close").click(function(){
            $(".tab-wrapper .tab-content").find(".active").removeClass("active").addClass("fade");
            $("#main-tabs li").removeClass("tab-active");
             $('.ptp_show').prop("disabled",false)
                 $('#error_msg').html("");
                 $('#from_date').val("");
                 $('#to_date').val("");

         });

        

        
    }



})

// Option 2. Using live 'pageInit' event handlers for each page
//$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
//})



