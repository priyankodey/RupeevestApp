// Initialize app
//var myApp = new Framework7();
var myApp = new Framework7({pushState: true,});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var curr_ip='http://192.168.1.22:3000/'

var RVNav="";
RVNav ="<div class='navbar'><div class='navbar-inner'><div class='left'><a href='#' class='link icon-only open-panel'><i class='icon icon-bars'></i></a></div><div class='center'><span id='navbar_info_span'><a href='index.html'><img src='img/icons/logo.png' alt='RupeeVest'></a></span><input type='text' id='fund_names' class='form-control ui-autocomplete-input' placeholder='Search mutual funds here...' autocomplete='off'></div><div class='right'><a href='#' class='' id='navbar_search_btn'><i class='fa fa-search' aria-hidden='true'></i></a><a href='#' class='' id='navbar_close_btn'><i class='fa fa-times' aria-hidden='true'></i></a></div></div></div>"


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

   if(page.name==='FAQs'){
        
        $$.get(curr_ip+'app_services/faq_list_of_details', function (faq_data_ajax) 
        {
            var faq_data=JSON.parse(faq_data_ajax);
            var tab_bank_data="";
            for (var i=0; i<faq_data.bank_list.length;i++){

                tab_bank_data=tab_bank_data+"<tr><td>"+(i+1)+"</td><td>"+faq_data.bank_list[i].BANK_NAME+"</td></tr>";                
            }
            
            var tab_bank_data_final="<thead><tr><th>Sl.No.</th><th>Bank Name</th></tr></thead><tbody>"+tab_bank_data+"</tbody>";

            $("#faq_bank_table").html(tab_bank_data_final);
            var li_amc_data="";
            for (i=0; i<faq_data.amc_list.length;i++){
                
                li_amc_data=li_amc_data+"<li>"+faq_data.amc_list[i].amc+"</li>";                
            }
            $("#faq_amc_list").html(li_amc_data);

        });

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

    

/*********************** MF Home / Top Rated MF START *****************************/

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

/****************** MF Home / Top Rated MF END ******************************/

/*********************** SIP Return START ***********************************/

if(page.name==='ToolsSIPReturn')
{
    
    $$.get(curr_ip+'app_services/sip_return_page', function (data) 
    {
        var data = JSON.parse(data);

        $("#full_url").val(data.full_url);
        $("#schemecode_selected").val(data.selected_schemecode);
        $("#fund_name_rec").val(data.fund_name_rec);
        $("#fund_name_actual").val(data.fund_name);
              

             
        var endDate = new Date();
        var startDate = new Date("1999-02-01");
        startDate = moment(startDate).format('YYYY-MM-DD');
        endDate = moment(endDate).format('YYYY-MM-DD');         

        $("#from_date").val(startDate);
        $("#to_date").val(endDate);                  

        fundname_search_sip_return();

        var url = $('#full_url').val();
                      
        if(url=="ERROR")
        {              
           // window.history.pushState('','','/Mutual-Fund-Calculator/Sip-Return/');
        }
        if(url!="NONE" && url!="ERROR")
        {                         
            $('#full_url').val("NONE"); 
            var schemecode =  $('#schemecode_selected').val();

            var amount = $('#amt').val();
                amount = amount.replace(/,/g, '');

            var startDate = new Date($('#from_date').val());
            var endDate = new Date($('#to_date').val());
                startDate = moment(startDate).format('YYYY-MM-DD');
                endDate = moment(endDate).format('YYYY-MM-DD');

            var frequency = $('#frequency :selected').text();
            var fund_name = $('#fund_name_rec').val();
                fund_name = fund_name.replace(/-/g,' ');

            test_graph_sip(fund_name,schemecode,"container-sip",amount,frequency,startDate,endDate);  
             
            $('#container-head').show();

            $('#fund_names_sip').val($("#fund_name_actual").val().replace(/-/g,' '));
                // window.history.pushState('','',url);                     
        }

        $("#frequency").change(function() 
        {                      
            if($('#fund_names_sip').val()!='' && $('#fund_names_sip').val()!='undefined')
            {
                var scheme_name = $('#fund_names_sip').val();
                    scheme_name = scheme_name.replace(/-/g,' ');
                var schemecode =  $('#schemecode_selected').val();
                var frequency = $('#frequency :selected').text();
                var amount = $('#amt').val();
                    amount = amount.replace(/,/g, '');
                var startDate = new Date($('#from_date').val());
                var endDate = new Date($('#to_date').val());
                    startDate = moment(startDate).format('YYYY-MM-DD');
                    endDate = moment(endDate).format('YYYY-MM-DD');

                test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);
            }
        });  


        $('#amt').focusout(function() 
        {
            if($('#fund_names_sip').val()!='' && $('#fund_names_sip').val()!='undefined')
            {
                var scheme_name = $('#fund_names_sip').val();
                    scheme_name = scheme_name.replace(/-/g,' ');
                var schemecode = map[scheme_name];
                var frequency = $('#frequency :selected').text();
                var amount = $('#amt').val();
                    amount = amount.replace(/,/g, '');
                var startDate = new Date($('#from_date').val());
                var endDate = new Date($('#to_date').val());
                    startDate = moment(startDate).format('YYYY-MM-DD');
                    endDate = moment(endDate).format('YYYY-MM-DD');

                test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);
            }
        });


        $('#amt').keydown(function(e) 
        {   
            if (e.keyCode == 13) 
            {                
                if($('#fund_names_sip').val()!='' && $('#fund_names_sip').val()!='undefined')
                {
                    var scheme_name = $('#fund_names_sip').val();
                        scheme_name = scheme_name.replace(/-/g,' ');
                    var schemecode = map[scheme_name];
                    var frequency = $('#frequency :selected').text();
                    var amount = $('#amt').val();
                        amount = amount.replace(/,/g, '');
                    var startDate = new Date($('#from_date').val());
                    var endDate = new Date($('#to_date').val());
                        startDate = moment(startDate).format('YYYY-MM-DD');
                        endDate = moment(endDate).format('YYYY-MM-DD');

                    test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);
                }
            }
        });  

          


        var inner_flag=0;
        var from_date=0;
        var to_date=0;
        var choosedate ;
        var sec_flag_sts=0;

        $('#from_date').datepicker({
            format: 'dd-M-yyyy',                
            endDate: '-1d',
            autoclose: true       
        }).on('changeDate', function(e) {

            var startDate = new Date($('#from_date').val());
            var endDate = new Date($('#to_date').val());
            var myDate = new Date();
            if(startDate > endDate)
            {
                myDate.setFullYear(myDate.getFullYear() - 1);
                swal("start date can not tbe greater than End date");
                $("#from_date").datepicker("update", myDate);
            }
            else
            {
                if($('#fund_names_sip').val()!='' && $('#fund_names_sip').val()!='undefined')
                {
                    var scheme_name = $('#fund_names_sip').val();
                        scheme_name = scheme_name.replace(/-/g,' ');
                    var schemecode = map[scheme_name];
                    var frequency = $('#frequency :selected').text();
                    var amount = $('#amt').val();
                        amount = amount.replace(/,/g, '');
                    var startDate = new Date($('#from_date').val());
                    var endDate = new Date($('#to_date').val());
                        startDate = moment(startDate).format('YYYY-MM-DD');
                        endDate = moment(endDate).format('YYYY-MM-DD');
                       
                        test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);
                }

                $('#to_date').datepicker('remove');
                inner_flag=1
                sec_flag_sts=1;
                $('#to_date').datepicker({
                  format: 'dd-M-yyyy',                          
                  startDate: new Date($('#from_date').val()),
                  endDate: new Date(),
                  autoclose: true
                }).on('changeDate', function(e) {
                    if($('#fund_names_sip').val()!='' && $('#fund_names_sip').val()!='undefined')
                    {
                        var scheme_name = $('#fund_names_sip').val();
                            scheme_name = scheme_name.replace(/-/g,' ');
                        var schemecode = map[scheme_name];
                        var frequency = $('#frequency :selected').text();
                        var amount = $('#amt').val();
                            amount = amount.replace(/,/g, '');
                        var startDate = new Date($('#from_date').val());
                        var endDate = new Date($('#to_date').val());
                            startDate = moment(startDate).format('YYYY-MM-DD');
                            endDate = moment(endDate).format('YYYY-MM-DD');                            
                        if(inner_flag==1)
                        {
                            test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);  
                            inner_flag=0;                                
                        }
                        else
                        {
                            test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);                                 
                        }                              
                    }
                });
            }
        });

        $('#to_date').datepicker({
            format: 'dd-M-yyyy',             
            startDate: new Date($('#from_date').val()),
            endDate: new Date(),
            autoclose: true
        }).on('changeDate', function(e) {

            if(sec_flag_sts!=1)
            {
               if($('#fund_names_sip').val()!='' && $('#fund_names_sip').val()!='undefined')
                {
                    var scheme_name = $('#fund_names_sip').val();
                        scheme_name = scheme_name.replace(/-/g,' ');                            
                    var schemecode = map[scheme_name];
                    var frequency = $('#frequency :selected').text();
                    var amount = $('#amt').val();
                        amount = amount.replace(/,/g, '');
                    var startDate = new Date($('#from_date').val());
                    var endDate = new Date($('#to_date').val());
                        startDate = moment(startDate).format('YYYY-MM-DD');
                        endDate = moment(endDate).format('YYYY-MM-DD');
                   
                    if(inner_flag==1)
                    {                     
                        inner_flag=0;                   
                    }
                    else
                    {
                        test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);                     
                    }
                }
            }

        });


        function setvalue_asset_temp( fund_mgr , consnt)
        {
            fund_mgr = fund_mgr.replace(/_/g,' ');
            
            $.ajax({
                type:'post',
                url: curr_ip+'home/set_asset_class',
                data :{selection:fund_mgr,condition:consnt},
                datatype:'json',
                success:function(data) { 
                    window.open('/Mutual-Funds-India/Screener','_blank')     
                },
                async: false,
                error:function(jqXHR, textStatus, errorThrown) {        
                }
            })
        }

        $('#amt').keyup(function(event) {               
            $('#amt').val($('#amt').val().replace(/\D/g, "")
            .replace(/\B(?=(\d\d)+\d$)/g, ","));
        });

        $("[data-toggle=popover]").popover();

        $( ".XIRRhover").hover(function(){
            $('.XIRRhover').attr('data-content', 'XIRR or Extended Internal Rate of Return is a way of calculating the annualized return for a series of cash flows occurring at various intervals throughout the investment period.');
            $(".XIRRhover").popover('toggle');
        });

        $('#sip_return').on('click', function (e) {
            $('[data-toggle="popover"]').each(function () {
                if(!$(this).is(e.target) &&
                        $(this).has(e.target).length === 0 &&
                        $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });
        });
    });


}

/*********************** SIP Return END ***********************************/

/*********************** Stocks Held START *********************************/
    if(page.name==='ToolsStocksHeld')
    {
         var global_date_hldr="";
    var stock_name =[];
    var map = {};
  

    $( document ).ready(function() {
  
        if($('#load_info').val()=="not_loaded")
        {
       
          Load_stock_data_autocomplete();
          Load_stock_data_autocomplete_1();

          $('#load_info').val("loaded");
     
        } 

    // if($('#company_fincode_param').val()!='' && $('#company_fincode_param').val()!='undefined' )
    // {
    //      // var fincode = map[$('#company_name_param').val()] ;
    //      var fincode = $('#company_fincode_param').val();
         
       

    //     load_stock_data(fincode);
    //     $('#main_content_div').attr("style","display:block;");
    // }

    
    //  if($('#company_fincode_param').val()!='' && $('#company_fincode_param').val()!='undefined' )
    // {
    //      // var fincode = map[$('#company_name_param').val()] ;
    //      var fincode = $('#company_fincode_param').val();
         
       
    //     if(fincode!="error")
    //     {
    //         $('#msg').attr("style","display:none;");
    //        load_stock_data(fincode);
    //       $('#main_content_div').attr("style","display:block;");
    //     }
    //     else
    //     {
    //        $('#msg').attr("style","display:block;");
    //        window.history.pushState('','','/Mutual-Fund-Holdings');
    //     }
          
    // }


        $("#srch_fund").autocomplete({
     select: function (a, b) {
        $(this).val(b.item.value);
        // $("#fund_click").click();

        // console.log($(this).val(b.item.value));
        
       

        var fincode = map[$('#srch_fund').val()] ;
         

    

        load_stock_data(fincode);
        $('#main_content_div').attr("style","display:block;");

    }
         // $('#fund_names').change(function()
});
        

       // swal($('#fin_code').val());
       // load_stock_data($('#fin_code').val());
         

    });   //end of document-ready


        function Load_stock_data_autocomplete()
   { 
      
       $$.get(curr_ip+'app_services/get_search_data_stock',function (data) 
       
               {    
                var myObj = JSON.parse(data);
                // console.log(data);
                     stock_name = [];
                     map = {};

                    for (var i=0; i< myObj.stock_data_search.length ; i++)
                    {                        
                         stock_name.push(myObj.stock_data_search[i].stock_search);
                         map[myObj.stock_data_search[i].stock_search] = myObj.stock_data_search[i].fincode;
                    }
                
                    $("#srch_fund").autocomplete({
                        maxResults: 10,
                        source: stock_name
                    });



            $.ui.autocomplete.filter = function (array, term) {
                var matcher = new RegExp("(^| )" + $.ui.autocomplete.escapeRegex(term), "i");
                return $.grep(array, function (value) {
                    return matcher.test(value.label || value.value || value);
                });
              };

             
               
       });
    }


function load_stock_data(fincode_tmp)
   { 
    var tblData;
      var mnth_1_cls="";
      var mnth_2_cls="";
      var mnth_3_cls="";
      var mnth_4_cls="";
$$.get(curr_ip+'app_services/get_stock_detail',{fin_code:fincode_tmp},function (data) 
     
             {    
               // data.month_name_4

 var data = JSON.parse(data);

               console.log(data);
                  
               if(data.stock_data.length>0)
               {
                $("#msg").hide();
                            var mnth_1 = 0;
                            var mnth_2 = 0;
                            var mnth_3 = 0;
                            var mnth_4 = 0;

                              var mnth_1_chk = 0;
                              var mnth_2_chk = 0;
                              var mnth_3_chk = 0;
                              var mnth_4_chk = 0;
          
                           var th = "<table id='stock_ret_data' class='table table-bordered table-striped table-condensed sortable-theme-bootstrap' data-sortable> <thead><tr><th rowspan='2'>Fund Name</th ><th rowspan='2' >Fund Manager</th><th colspan='3'>"+data.month_name_1+"</th><th colspan='1'>"+data.month_name_2+"</th><th colspan='1'>"+data.month_name_3+"</th><th colspan='1'>"+data.month_name_4+"</th></tr><tr><th>AUM (in ₹ cr)</th><th>% of AUM</th><th>No. of Shares</th><th>No. of Shares</th><th>No. of Shares</th><th>No. of Shares</th></tr></thead>";
                           
                          $('#mon_1_head').text(data.month_name_1);
                          $('#mon_2_head').text(data.month_name_2);
                          $('#mon_3_head').text(data.month_name_3);
                          $('#mon_4_head').text(data.month_name_4);    
                 


                          var temp_stock;
                          
                          $('#comp_name').text(data.comp_data[0].compname);
                          $('#date_as_on').text(moment(data.first_month_end).format('DD-MMM-YY'));
                            $('#srch_fund').val(data.comp_data[0].compname);
                            // console.log(data.stock_data);
                           
                          var sect_name = data.stock_data[0].rv_sect_name;
                          
                          var nw_comp_name = data.comp_data[0].compname;
                              nw_comp_name = nw_comp_name.replace( / /g,'-');
                              nw_comp_name = nw_comp_name.replace( '.','');
                              nw_comp_name = nw_comp_name.replace( '&','And');

                          var no_of_stock = data.stock_data.length;
                          var mnth_1_total=0,mnth_2_total=0,mnth_3_total=0,mnth_4_total=0; 

                             // window.history.pushState('','','/Mutual-Fund-Holdings/'+nw_comp_name+'/'+fincode_tmp+'');



                          for(var i=0; i<data.stock_data.length ; i++)
                          {
                            mnth_1 = 0;
                            mnth_2 = 0;
                            mnth_3 = 0;
                            mnth_4 = 0;

                              mnth_1_chk = 0;
                              mnth_2_chk = 0;
                              mnth_3_chk = 0;
                              mnth_4_chk = 0;

                             temp_stock = data.stock_data[i];
                            
                             var schemecode = temp_stock.schemecode;
                             var fund_manager = temp_stock.fund_mgr1;
                            
                             var fund_manager_1 = fund_manager.replace(' ','_');
                            
                             var s_name = temp_stock.s_name;
                             var fincode = temp_stock.fincode;               
                             var compname = temp_stock.compname;
                             
                             var aum = temp_stock.aum;
                              
                             if(aum!=null && aum!='' && aum!='undefined')
                             {
                               aum = aum.toFixed(2);
                               aum =  commaSeparateNumber(aum);
                             } 

                             mnth_1 = temp_stock.month_name_1;
                            
                             if(mnth_1==null)
                             {
                              mnth_1=0;
                             }
                             else
                             {
                              mnth_1_total = mnth_1_total + mnth_1;
                              mnth_1_chk = mnth_1;
                              mnth_1 = commaSeparateNumber(mnth_1);
                              
                             }

                             mnth_2 = temp_stock.month_name_2;
                            
                             if(mnth_2==null)
                             {
                              mnth_2=0;
                             }
                             else
                             {
                              mnth_2_total = mnth_2_total + mnth_2;
                              mnth_2_chk = mnth_2;
                              mnth_2 = commaSeparateNumber(mnth_2);
                             
                             }
                             mnth_3 = temp_stock.month_name_3;
                             
                             if(mnth_3==null)
                             {
                              mnth_3=0;
                             }
                             else
                             {
                               mnth_3_total = mnth_3_total + mnth_3;
                                mnth_3_chk = mnth_3;
                               mnth_3 = commaSeparateNumber(mnth_3);
                              
                             }
                             mnth_4 = temp_stock.month_name_4;
                             
                             if(mnth_4==null)
                             {
                              mnth_4=0;
                             }
                             else
                             {
                               mnth_4_total = mnth_4_total + mnth_4;
                                mnth_4_chk = mnth_4;
                               mnth_4 = commaSeparateNumber(mnth_4);
                              
                             }

                             var prcnt_aum = temp_stock.percent_aum;
                            
                             

                              if(prcnt_aum!=null && prcnt_aum!='' && prcnt_aum!='undefined')
                             {
                               prcnt_aum = prcnt_aum.toFixed(2);
                             }
                             else
                             {
                              prcnt_aum="-";
                             } 

                              mnth_1_cls="no_sign";
                              mnth_2_cls="no_sign";
                              mnth_3_cls="no_sign";
                              mnth_4_cls="nochange";
             

                                if(mnth_4_chk=="-" && mnth_3!="-" )
                                 {
                                   mnth_3_cls="incr";
                                 }
                               else if(mnth_3_chk > mnth_4_chk && mnth_3!="-")
                                 {
                                    mnth_3_cls="incr";
                                 }
                                 else if(mnth_3_chk < mnth_4_chk && mnth_3!="-")
                                 {
                                    mnth_3_cls="decr";
                                 }
                                 else
                                 {
                                    mnth_3_cls="nochange";
                                 }
                           
                               if(mnth_3_chk=="-" && mnth_2!="-")
                                 {
                                   mnth_2_cls="incr";
                                 }
                                 else if(mnth_2_chk > mnth_3_chk && mnth_2!="-")
                                 {
                                    mnth_2_cls="incr";
                                 }
                                 else if(mnth_2_chk < mnth_3_chk && mnth_2!="-")
                                 {
                                    mnth_2_cls="decr";
                                 }
                                 else
                                 {
                                    mnth_2_cls="nochange";
                                 }
                         
                                if(mnth_2_chk=="-" && mnth_1!="-")
                                {
                                   mnth_1_cls="incr";
                                }
                                else if(mnth_1_chk > mnth_2_chk && mnth_1!="-")
                                 {
                                    mnth_1_cls="incr";
                                 }
                                else if(mnth_1_chk < mnth_2_chk && mnth_1!="-" )
                                 {
                                    mnth_1_cls="decr";
                                 }
                                else
                                 {
                                    mnth_1_cls="nochange";
                                 }
                             

                                  



                             if(i==0)
                             {

                         



                              tblData = th + "<tbody><tr>"+"<td>"+"<a target = '_blank' href='/Mutual-Funds-India/"+schemecode+"'>"+s_name+"</a>"+"</td>"+"<td>"+"<span id='fund_manager' onclick=setvalue_asset_temp('"+fund_manager_1+"','fund_manager')>"+fund_manager+"</span>"+"</td><td>"+aum+"</td>"+"<td>"+prcnt_aum+"</td>"+"<td>"+"<span>"+mnth_1+"</span><span id='mon_1' class='"+mnth_1_cls+"'></span>"+"</td>"+"<td>"+"<span>"+mnth_2+"</span><span id='mon_2' class='"+mnth_2_cls+"'></span>"+"</td>"+"<td>"+"<span>"+mnth_3+"</span><span id='mon_3' class='"+mnth_3_cls+"'></span>"+"</td>"+"<td>"+"<span>"+mnth_4+"</span><span id='mon_4' class='"+mnth_4_cls+"'></span>"+"</td></tr>"
                     

                              

                             }
                             else
                             {
                            
                              tblData = tblData + "<tr>"+"<td>"+"<a target = '_blank' href='/Mutual-Funds-India/"+schemecode+"'>"+s_name+"</a>"+"</td>"+"<td>"+"<span id='fund_manager' onclick=setvalue_asset_temp('"+fund_manager_1+"','fund_manager')>"+fund_manager+"</span>"+"</td><td>"+aum+"</td>"+"<td>"+prcnt_aum+"</td>"+"<td>"+"<span>"+mnth_1+"</span><span id='mon_1' class='"+mnth_1_cls+"'></span>"+"</td>"+"<td>"+"<span>"+mnth_2+"</span> <span id='mon_2' class='"+mnth_2_cls+"'></span>"+"</td>"+"<td>"+"<span>"+mnth_3+"</span><span id='mon_3' class='"+mnth_3_cls+"'></span>"+"</td>"+"<td>"+"<span>"+mnth_4+"</span><span id='mon_4' class='"+mnth_4_cls+"'></span>"+"</td></tr>"
                             }
                          }
                         
                     
                          
                       tblData = tblData+"</tbody></table>"
                      
                       

                        $('#stoct_ret_div').html("");
                        $('#stoct_ret_div').html(tblData); 

                        $('#stock_ret_data').DataTable({
                    "paging": false,
                    "ordering": true,
                    "info": true,
                    "searching": true,"order": [[ 4, "desc" ]]
                });
                                
                       
                        if(mnth_4_chk=="-" && mnth_3!="-" )
                                 {
                                   mnth_3_cls="incr";
                                 }
                               else if(mnth_3_chk > mnth_4_chk && mnth_3!="-")
                                 {
                                    mnth_3_cls="incr";
                                 }
                                 else if(mnth_3_chk < mnth_4_chk && mnth_3!="-")
                                 {
                                    mnth_3_cls="decr";
                                 }
                                 else
                                 {
                                    mnth_3_cls="nochange";
                                 }


                       var mnth_1_total_tmp=0,mnth_2_total_tmp=0,mnth_3_total_tmp=0,mnth_4_total_tmp=0;

                      

                        mnth_1_total_tmp = data.mnth_1_sum[0].sum_mnth_1;
                        if(mnth_1_total_tmp==null)
                        {
                          mnth_1_total_tmp=0;
                        }
                        mnth_2_total_tmp = data.mnth_2_sum[0].sum_mnth_2;
                        if(mnth_2_total_tmp==null)
                        {
                          mnth_2_total_tmp=0;
                        }
                        mnth_3_total_tmp = data.mnth_3_sum[0].sum_mnth_3;
                          if(mnth_3_total_tmp==null)
                        {
                          mnth_3_total_tmp=0;
                        }
                        mnth_4_total_tmp = data.mnth_4_sum[0].sum_mnth_4;

                          if(mnth_4_total_tmp==null)
                        {
                          mnth_4_total_tmp=0;
                        }

                        mnth_1_total = data.mnth_1_sum[0].sum_mnth_1;
                          if(mnth_1_total==null)
                          {
                            mnth_1_total=0;
                          }
                        mnth_2_total = data.mnth_2_sum[0].sum_mnth_2;
                          if(mnth_2_total==null)
                          {
                            mnth_2_total=0;
                          }
                        mnth_3_total = data.mnth_3_sum[0].sum_mnth_3;
                         if(mnth_3_total==null)
                          {
                            mnth_3_total=0;
                          }
                        mnth_4_total = data.mnth_4_sum[0].sum_mnth_4;
                        if(mnth_4_total==null)
                          {
                            mnth_4_total=0;
                            }

                        

                        if(mnth_3_total_tmp >  mnth_4_total_tmp)
                        {
                            $('#tot_monval_3').attr('class','incr');
                        }
                        else if(mnth_3_total_tmp <  mnth_4_total_tmp)
                        {
                            $('#tot_monval_3').attr('class','decr');
                        }
                        else
                        {
                            $('#tot_monval_3').attr('class','nochange');  
                        }


                         if(mnth_2_total_tmp >  mnth_3_total_tmp)
                        {
                            $('#tot_monval_2').attr('class','incr');
                        }
                        else if(mnth_2_total_tmp <  mnth_3_total_tmp)
                        {
                            $('#tot_monval_2').attr('class','decr');
                        }
                        else
                        {
                            $('#tot_monval_2').attr('class','nochange');  
                        }  

                         if(mnth_1_total_tmp >  mnth_2_total_tmp)
                        {
                            $('#tot_monval_1').attr('class','incr');
                        }
                        else if(mnth_1_total_tmp <  mnth_2_total_tmp)
                        {
                            $('#tot_monval_1').attr('class','decr');
                        }
                        else
                        {
                            $('#tot_monval_1').attr('class','nochange');  
                        }  

                        mnth_1_total = commaSeparateNumber(mnth_1_total);
                        mnth_2_total = commaSeparateNumber(mnth_2_total);
                        mnth_3_total = commaSeparateNumber(mnth_3_total);
                        mnth_4_total = commaSeparateNumber(mnth_4_total);

                        
                        $('#sec_tor').text(sect_name);
                        $('#n_o_f').text(no_of_stock);
                      


                        $('#no_o_s_m1').text(mnth_1_total);
                        $('#no_o_s_m2').text(mnth_2_total);
                        $('#no_o_s_m3').text(mnth_3_total);
                        $('#no_o_s_m4').text(mnth_4_total);

               }
               else
               {
                 $("#msg").show();
              
                 $('#main_content_div').attr("style","display:none;");
               }

         
             });
   }


function Load_stock_data_autocomplete_1()
   { 
       $$.get(curr_ip+'app_services/get_compare_data_stock',function (data) 
     
             {    
               // data.month_name_4

 var data = JSON.parse(data);



        
                 
                // console.log(data)
                 //id = stock_price_compare
                var th ="<thead><tr><th>Stock Name</th><th>Sector</th><th>Classification</th><th>Month</th><th>Net Qty Bought</th><th>Approx. Buy Value<br>(In ₹ cr)</th></tr></thead><tbody>";
                     
                 var stock_name="";
                 var classification="";
                 var no_of_share_change=0;
                 var price_of_share_change=0;     
                 var tb=" ";
                 var rv_sector=" ";
                 var fincode=0;
                 
                  var day = new Date(data.stock_compare_data[0].day);

                          var mon_1 = moment(day).format('MMMM-YYYY');

                          
                          global_date_hldr = moment(day).format('MMM-YY');
                          $('#stock_att_month_yr').text(global_date_hldr); // set month in this tab
                          $('#stock_att_month_yr_1').text(global_date_hldr); // set month in this tab

                          // var year_1 = moment(day).format('YYYY');
                          // var date2 = new Date(); 
                          // date2 = date2.setMonth(day.getMonth()-1);
                          // var mon_2 = moment(date2).format('MMMM');
                  
                  var tot_count=0;
                  var total_price=0; 

                
                  tot_count = data.stock_compare_data.length;
                     
                  console.log(data);


                   for (var i=0; i< tot_count ; i++)
                   {
                          stock_name=" ";
                          classification=" ";
                          no_of_share_change=0;
                          price_of_share_change=0;  
                          rv_sector=" "; 
                          fincode=0;
                         
                          
                         

                          stock_name=data.stock_compare_data[i].compname;
                          classification=data.stock_compare_data[i].classification;
                          rv_sector = data.stock_compare_data[i].rv_sect_name;
                          fincode = data.stock_compare_data[i].fincode;

                            if(classification=="M")
                            {
                              classification="Mid-Cap";
                            }
                            else if(classification=="L")
                            {
                              classification="Large-Cap";
                            }
                            else if(classification=="S")
                            {
                              classification="Small-Cap";
                            }

                          no_of_share_change=data.stock_compare_data[i].no_of_share_change;
                          price_of_share_change= (data.stock_compare_data[i].price_of_share_change/10000000).toFixed(2);

                          // no_of_share_change=data.stock_compare_data[i].no_of_share_change; 

                          total_price = parseFloat(total_price) + parseFloat(price_of_share_change);

                        

                          // var day=data.stock_compare_data[i].day;
                           // "<a href='/Mutual-Fund-Holdings/"+fincode+"'>"+stock_name+"</a>"
                           // "<a href='/Mutual-Funds-India/"+schemecode+"'>"+s_name+"</a>"

                          if(i==0)
                          {
                 tb = th + "<tr><td>"+"<a href='/Mutual-Fund-Holdings/"+fincode+"'>"+stock_name+"</a>"+"</td><td>"+rv_sector+"</td><td>"+classification+"</td><td>"+ mon_1+"</td><td>"+commaSeparateNumber(no_of_share_change)+"</td><td>"+commaSeparateNumber(price_of_share_change)+"</td></tr>";
                          }
                          else
                          {
                             tb = tb + "<tr><td>"+"<a href='/Mutual-Fund-Holdings/"+fincode+"'>"+stock_name+"</a>"+"</td><td>"+rv_sector+"</td><td>"+classification+"</td><td>"+ mon_1+"</td><td>"+commaSeparateNumber(no_of_share_change)+"</td><td>"+commaSeparateNumber(price_of_share_change)+"</td></tr>";
                          }

                       
                   }
                         tb=tb+"</tbody>"

                   $('#stock_price_compare').html(tb);

                    $('#stock_price_compare').DataTable({
                    "paging": false,
                    "ordering": true,
                    "info": true,
                    "searching": true,"order": [[ 5, "desc" ]]
                });


                    $('#tot_price_all').text(commaSeparateNumber(total_price.toFixed(2)));
                    $('#tot_count_all').text(tot_count);
                       
                    
                      tot_count=0;
                      total_price=0; 


                   
                      var th_1 ="<thead><tr><th>Stock Name</th><th>Sector</th><th>Classification</th><th>Month</th><th>Net Qty Sold</th><th>Approx. Sell Value<br>(In ₹ cr)</th></tr></thead><tbody>";
                    tot_count = data.stock_compare_data_1.length;
                     
                  // console.log(data);


                   for (var i=0; i< tot_count ; i++)
                   {
                          stock_name=" ";
                          classification=" ";
                          no_of_share_change=0;
                          price_of_share_change=0;  
                          rv_sector=" "; 
                          fincode=0;
                         
                          
                         

                          stock_name=data.stock_compare_data_1[i].compname;
                          classification=data.stock_compare_data_1[i].classification;
                          rv_sector = data.stock_compare_data_1[i].rv_sect_name;
                          fincode = data.stock_compare_data_1[i].fincode;

                            if(classification=="M")
                            {
                              classification="Mid-Cap";
                            }
                            else if(classification=="L")
                            {
                              classification="Large-Cap";
                            }
                            else if(classification=="S")
                            {
                              classification="Small-Cap";
                            }

                          no_of_share_change=Math.abs(data.stock_compare_data_1[i].no_of_share_change);
                          price_of_share_change= Math.abs((data.stock_compare_data_1[i].price_of_share_change/10000000).toFixed(2));

                          // no_of_share_change=data.stock_compare_data[i].no_of_share_change; 

                          total_price = parseFloat(total_price) + parseFloat(price_of_share_change);

                           if(price_of_share_change==0)
                           {
                              continue;
                           }




                          // var day=data.stock_compare_data[i].day;
                           // "<a href='/Mutual-Fund-Holdings/"+fincode+"'>"+stock_name+"</a>"
                           // "<a href='/Mutual-Funds-India/"+schemecode+"'>"+s_name+"</a>"

                          if(i==0)
                          {
                 tb = th_1 + "<tr><td>"+"<a href='/Mutual-Fund-Holdings/"+fincode+"'>"+stock_name+"</a>"+"</td><td>"+rv_sector+"</td><td>"+classification+"</td><td>"+ mon_1+"</td><td>"+commaSeparateNumber(no_of_share_change)+"</td><td>"+commaSeparateNumber(price_of_share_change)+"</td></tr>";
                          }
                          else
                          {
                             tb = tb + "<tr><td>"+"<a href='/Mutual-Fund-Holdings/"+fincode+"'>"+stock_name+"</a>"+"</td><td>"+rv_sector+"</td><td>"+classification+"</td><td>"+ mon_1+"</td><td>"+commaSeparateNumber(no_of_share_change)+"</td><td>"+commaSeparateNumber(price_of_share_change)+"</td></tr>";
                          }

                       
                   }
                         tb=tb+"</tbody>"

                   $('#stock_price_compare_1').html(tb);

                    $('#stock_price_compare_1').DataTable({
                    "paging": false,
                    "ordering": true,
                    "info": true,
                    "searching": true,"order": [[ 5, "desc" ]]
                });


                    $('#tot_price_all_1').text(commaSeparateNumber(total_price.toFixed(2)));
                    $('#tot_count_all_1').text(tot_count);


              
              });




   }




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


    if(page.name==='OfferFDBajajFinanceLimited')
    {
       
       $$.get(curr_ip+'app_services/fd_all_data',function (data) 
       {
               var myObj = JSON.parse(data); 
               console.log(myObj);             
               // var i;
               // var list_fd = "";               

            //    for (var i = 0; i < myObj.fds.length; i++) { 
            //        var ComName = myObj.fds[i].name;
            //        ComName = ComName.replace(/[.\s]/g, '');                                     
            //        list_fd = list_fd + "<div class='breadcrumb'><a href='OfferFD"+ComName+".html'><div class='row'><div class='col-xs-6'><div class='FDName'>"+myObj.fds[i].name+"</div></div><div class='col-xs-3'><div class='FDPeriod'>"+myObj.fds[i].period+"</div></div><div class='col-xs-3'><div class='FDInterest'>"+myObj.fds[i].interest+"</div></div></div></a></div>"
            //     };

            // $$('#fd_all_list').html(list_fd);
               
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

/**************************** OfferISDesign / Combined MF START ************************* */ 

if(page.name==='OfferISDesign')
    {
        var query = $$.parseUrlQuery(page.url);
        // console.log(query);
        var p_code=query.scheme_code;
        // console.log(scheme_code);
        s_code=[];
        weight=[];
        min_investment_sip=[];
        min_investment=[];
        colour=[]

        $$.get(curr_ip+'app_services/combined_mf', {p_code: +p_code},function (data)
        {
            var data = JSON.parse(data);              
             console.log(data);
            // debugger;
            $("#ItemCount").html(data.s_code_new.length);
            $("#append_scheme").empty();
               //  debugger;               
                var add_fund="";               
              $("#port_name").html(data.portfoliio.portfolio_name);
              $("#port_subname").html(data.portfoliio.portfolio_sub_name);
              
                for(var i=0;i<data.s_code_new.length;i++)
                {
                  s_code[i]=data.s_code_new[i].toString();
                  weight[i]=parseInt(data.weightage_new[i]);                  
                  min_investment_sip[i]= data.minimum_investment_sip[i].toString();                  
                  if(data.minimum_investment[i]==null)
                  {
                    min_investment[i]="0";
                  }
                  else
                  {
                     min_investment[i]=data.minimum_investment[i].toString();
                  }
               
                var weight_id="weightage"+data.s_code_new[i];
                var range_id="rg"+data.s_code_new[i];
                var lock_id="lk"+data.s_code_new[i];
                var fund_hover="FundHover_"+data.s_code_new[i];
                var s_name="s_name_"+data.s_code_new[i];
                var rating="rating_"+data.s_code_new[i];
                var aReadMore="#ReadMore_"+data.s_code_new[i];
                var ReadMore="ReadMore_"+data.s_code_new[i];
                var more="more_"+data.s_code_new[i];
                var objective="objective_"+data.s_code_new[i];
                var fm="fm_"+data.s_code_new[i];
                var expenceratio="expenceratio_"+data.s_code_new[i];
                var inception_date="inception_date_"+data.s_code_new[i];
                var aumtotal="aumtotal_"+data.s_code_new[i];
                var dialogmodal="dialogmodal_"+data.s_code_new[i];
                var exitload="exitload_"+data.s_code_new[i];
                var color="border-color:"+data.colour_code[i];
                var sin_col="color:"+data.colour_code[i];
                var back_col="background-color:"+data.colour_code[i];
                colour[i]=data.colour_code[i];
                  
                 

                add_fund=add_fund+"<div class='card' style='"+color+"'> <div class='card-header' style='"+color+"'> <div class='row'> <div class='col-xs-10'> <h5><a target='_blank' href='/Mutual-Funds-India/"+data.s_code_new[i]+"'>"+data.scheme_name[i]+"</a></h5> <h6><span>"+data.classification[i]+"</span></h6></div> <div class='col-xs-2'> <div class='close close_image1 ' ><span class='fa fa-times' aria-hidden='true'></span></div> </div> </div> </div> <div class='card-content'> <div class='row'> <div class='col-xs-7'> <div class=''> <div class='CPOverviewSlider'> <input type='range' value='"+data.weightage_new[i]+"' id='"+range_id+"' class='rg'> </div> </div> </div> <div class='col-xs-5 text-right'> <div class='btn-toolbar' role='toolbar' aria-label='Customize and Invest Now'> <div class='btn-group Rangebtn' role='group' aria-label='First group'> <div class='form-control'><span id='"+weight_id+"' class='wt readonly_div' >"+data.weightage_new[i]+"</span> %</div> </div> <div class='btn-group Lockbtn' role='group' aria-label='Second group' > <div class='form-control locked ' id='"+lock_id+"'style='"+back_col+"'><span class='fa fa-lock' aria-hidden='true'></span></div> </div> </div> </div> </div> </div> </div>"

        
                 }




// console.log(add_fund);

                            // console.log(add_fund_hover);
                           $("#append_scheme").append(add_fund);
// var schemecode = "<%=@s_code_new%>";
//  schemecode=schemecode.replace(/&quot;/g,'');
//  schemecode=schemecode.replace("[",'');
//  schemecode=schemecode.replace("]",'');
//  schemecode=schemecode.replace(/ /g,'');
 // if(schemecode!="")
 // {
//var s_code=data.s_code_new;

calculate_min_invest();
calculate_min_invest_sip();
get_return_data_portfolio(s_code,weight);

asset_allocation(s_code,weight);
nav_movement(s_code,weight);
get_portfolio(s_code , weight);

// }


               
       });  


    function calculate_min_invest()
     {
        // console.log(s_code);
              if(s_code.length==0)
          {
            $("#imdone").prop('disabled', true);
            $("#container").empty();
            console.log("Please select mutual funds from the search box above.");
              
              $("#min_invest").text("-");
              $("#min_invest_sip").text("-");

              $("#addText").text("");
              $("#asset_alloc").html("<p class='text-center'>No Fund Selected</p>")
              

              $("#return_portfolio").empty();
              var th = "<table class='table table-responsive table-striped table-condensed'><thead><tr><th>1 Month </th><th>3 Month </th><th>6 Month </th><th>1 Year </th><th>3 Year </th><th>5 Year </th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr></tbody><table>";
              $("#return_portfolio").html(th);
              $("#container").empty();
              $("#container_equity").empty();
              $("#container_credit_rating").empty();
              $("#equity_port").empty();
              $("#debt_port").empty();
              $("#cash_port").empty();

              $("#others_port").empty();
               $("#pages").empty();
                $("#pagesd").empty();
                $('#rec_m_funds').show();


              
              $("#no_fund").show();
              $("#no_fund").html("<p class='text-center'>No Fund Selected</p>")
          }
          else
          {
            // console.log(min_investment);
            // $("#imdone").prop('disabled', false);
            // $('#rec_m_funds').hide();



            //                   $("#wait_2").show();
            //                   $('#CPOverview').css("opacity", "0.5");
            var res=[];
            var min;
            for(var i=0;i<s_code.length;i++)
            {       
            // console.log(parseInt($('#weightage'+s_code[i]).html()))    ;
              if(parseInt($('#weightage'+s_code[i]).html())!=0)      
            {
              
              res[i]=parseInt(parseInt((min_investment[i])*100)/parseInt($('#weightage'+s_code[i]).html()));
            }
            else
            {
              res[i]=0;
            }
          }
         // console.log(res);
           var quo=parseInt(Math.max.apply(null, res)/500);
            
            var rem=Math.max.apply(null, res) % 1000;
           

            min=Math.max.apply(null, res);
           
            if (s_code.length!=1)
            {
            if(rem!=0)
              {
              
                  var kk=1;
                  while(kk!=0)
                  {
                    var multiple=1000*kk;
                    if(multiple>min)
                    {
                      min=multiple;
                      break;
                    }
                    else
                    {
                      kk=kk+1
                    }
                  }
                }
            }

            $('#min_invest').html(commaSeparateNumber(min));
          }
     }

function calculate_min_invest_sip()
     {
      if(s_code.length==0)
          {
            $("#container").empty();
            $("#imdone").prop('disabled', true);
           
              // swal("coming here---");
              $("#min_invest").text("-");
              $("#min_invest_sip").text("-");

              // $("#asset_alloc").text("");
              $("#addText").text("");
              $("#asset_alloc").html("<p class='text-center'>No Fund Selected</p>")
              

              $("#return_portfolio").empty();
              var th = "<table class='table table-responsive table-striped table-condensed'><thead><tr><th>1 Month </th><th>3 Month </th><th>6 Month </th><th>1 Year </th><th>3 Year </th><th>5 Year </th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr></tbody><table>";
              $("#return_portfolio").html(th);
              $("#container").empty();
              $("#container_equity").empty();
              $("#container_credit_rating").empty();
              $("#equity_port").empty();
              $("#debt_port").empty();
              $("#cash_port").empty();

              $("#others_port").empty();
               $("#pages").empty();
                $("#pagesd").empty();
                $('#rec_m_funds').show();


               // $("#container").html("<p class='text-center'>No Fund Selected</p>")
              // $("#CPPortfolio").hide();
              $("#no_fund").show();
              $("#no_fund").html("<p class='text-center'>No Fund Selected</p>")
          }
          else
          {
            $("#imdone").prop('disabled', false);

            $('#rec_m_funds').hide();
         // min_investment_sip
          // min_invest_sip
         var res=[];
            var min;
            for(var i=0;i<s_code.length;i++)
            {            
              if(parseInt($('#weightage'+s_code[i]).html())!=0)      
            {
              // swal($('#weightage'+s_code[i]).val());
              // swal(min_investment[i])
                res[i]=parseInt(parseInt((min_investment_sip[i])*100)/parseInt($('#weightage'+s_code[i]).html()));

            }
            else
            {
              res[i]=0;
            }
          }
            // swal(Math.max.apply(null, res));
            var quo=parseInt(Math.max.apply(null, res)/500);
            // swal(quo);
            // var rem=Math.max.apply(null, res) % 500;
            var rem=Math.max.apply(null, res) % 1000;
            // alert(rem);

            min=Math.max.apply(null, res);
            // alert(min);
            // if(rem!=0)
            // {
            //   quo+=1;
            //   min=quo*500;
            // }
            if (s_code.length!=1)
            {
            if(rem!=0)
            {
              // if(rem<=500)
              // {
              //   min=min-rem;
              //   if(min==0)
              //   {
              //     min=min+rem;
              //   }
              // }
              // else
              // {
                var kk=1;
                while(kk!=0)
                {
                  var multiple=1000*kk;
                  if(multiple>min)
                  {
                    min=multiple;
                    break;
                  }
                  else
                  {
                    kk=kk+1
                  }
                }
              }
          }

            $('#min_invest_sip').html(commaSeparateNumber(min));
            } 


     }


function get_return_data_portfolio(scheme_code,weightage)
  { 
if(s_code.length!=0)

{
    var tbldata;
    $$.get(curr_ip+'home/get_portfolio_return_combined', {schemecode:scheme_code,weightage:weightage},function (returns_data)
        {
            var returns_data = JSON.parse(returns_data); 
    // currentRequest_return = jQuery.ajax({
    //     type:'GET',
    //     url: '/home/get_portfolio_return_combined',
    //     data :{schemecode:scheme_code,weightage:weightage},
    //     datatype:'json',
    //     beforeSend : function()    {           
    //     if(currentRequest_return != null) {
    //         currentRequest_return.abort();
    //     }
    // },
    //     success:function(returns_data, textStatus, jqXHR) {
        
        var mf_data;
        var tblData;
        var total_month_ret_1=0;
        var total_month_ret_3=0;
        var total_month_ret_6=0;
        var total_year_ret_1=0;
        var total_year_ret_3=0;
        var total_year_ret_5=0;

        var th = "<table class='table table-striped table-condensed'><thead><tr><th>6 Month </th><th>1 Year </th><th>3 Year </th><th>5 Year </th></tr></thead>";
        for(var i =0;i <= returns_data.return.length-1;i++)
        {
    mf_data = returns_data.return[i];
   
    var monthret_1 = mf_data.returns_1month;
    if(monthret_1==null)
        {
          monthret_1="-";
        }
        else
        {
          monthret_1=parseFloat(monthret_1);
        } 

    if (monthret_1!="-")
    {  
        if(i==0)
        {
          total_month_ret_1 = parseFloat(total_month_ret_1) + parseFloat(monthret_1);
        }  
        else
        {
           if(total_month_ret_1!="-")
           {
             total_month_ret_1 = parseFloat(total_month_ret_1) + parseFloat(monthret_1);   
           }
        } 
          

    }
    else
    {
       total_month_ret_1="-";
    }     


    var monthret_3 = mf_data.returns_3month;
       if(monthret_3==null)
        {
          monthret_3="-";
        }
        else
        {
          monthret_3= parseFloat(monthret_3);
        }
   
     if (monthret_3!="-")
    {  
        if(i==0)
        {
          total_month_ret_3 = parseFloat(total_month_ret_3) + parseFloat(monthret_3);
        }  
        else
        {
           if(total_month_ret_3!="-")
           {
             total_month_ret_3 = parseFloat(total_month_ret_3) + parseFloat(monthret_3);   
           }
        } 
          

    }
    else
    {
       total_month_ret_3="-";
    } 
  

     var monthret_6 = mf_data.returns_6month;
        if(monthret_6==null)
        {
          monthret_6="-";
        }
        else
        {
          monthret_6=parseFloat(monthret_6);
        }
 
    
       if (monthret_6!="-")
    {  
        if(i==0)
        {
          total_month_ret_6 = parseFloat(total_month_ret_6) + parseFloat(monthret_6);
        }  
        else
        {
           if(total_month_ret_6!="-")
           {
             total_month_ret_6 = parseFloat(total_month_ret_6) + parseFloat(monthret_6);   
           }
        } 
          

    }
    else
    {
       total_month_ret_6="-";
    }



    var yrret_1 = mf_data.returns_1year;
    if(yrret_1==null)
        {
          yrret_1="-";
        }
        else
        {
          yrret_1=parseFloat(yrret_1);
        } 
     
    if (yrret_1!="-")
     {  
        if(i==0)
        {
          total_year_ret_1 = parseFloat(total_year_ret_1) + parseFloat(yrret_1);
        }  
        else
        {
           if(total_year_ret_1!="-")
           {
             total_year_ret_1 = parseFloat(total_year_ret_1) + parseFloat(yrret_1);   
           }
        } 
          

    }
    else
    {
       total_year_ret_1="-";
    } 

     

    var yearret_3 = mf_data.returns_3year;
      if(yearret_3==null)
        {
          yearret_3="-";
        }
         else
        {
          yearret_3=parseFloat(yearret_3)
        } 
       
    if (yearret_3!="-")
     {  
        if(i==0)
        {
          total_year_ret_3 = parseFloat(total_year_ret_3) + parseFloat(yearret_3);
        }  
        else
        {
           if(total_year_ret_3!="-")
           {
             total_year_ret_3 = parseFloat(total_year_ret_3) + parseFloat(yearret_3);   
           }
        } 
          

    }
    else
    {
       total_year_ret_3="-";
    } 



    var yearret_5 = mf_data.returns_5year;
      if(yearret_5==null)
        {
          yearret_5="-";
        }
        else
        {
          yearret_5= parseFloat(yearret_5)
        }


     if (yearret_5!="-")
     {  
        if(i==0)
        {
          total_year_ret_5 = parseFloat(total_year_ret_5) + parseFloat(yearret_5);
        }  
        else
        {
           if(total_year_ret_5!="-")
           {
             total_year_ret_5 = parseFloat(total_year_ret_5) + parseFloat(yearret_5);   
           }
        } 
    }
    else
    {
       total_year_ret_5="-";
    }    

     
    
         }

         if(total_month_ret_1!="-")
         {
           total_month_ret_1=total_month_ret_1.toFixed(2);
         }

         if(total_month_ret_3!="-")
         {
           total_month_ret_3=total_month_ret_3.toFixed(2);
         }

         if(total_month_ret_6!="-")
         {
           total_month_ret_6=total_month_ret_6.toFixed(2);
         }

          if(total_year_ret_1!="-")
         {
           total_year_ret_1=total_year_ret_1.toFixed(2);
         }

         if(total_year_ret_3!="-")
         {
           total_year_ret_3=total_year_ret_3.toFixed(2);
         }

         if(total_year_ret_5!="-")
         {
           total_year_ret_5=total_year_ret_5.toFixed(2);
         }

         tblData = th + "<tr><td>"+total_month_ret_6+"</td><td>"+total_year_ret_1+"</td><td>"+total_year_ret_3+"</td><td>"+total_year_ret_5+"</td></tr><table>";
      

        $("#return_portfolio").html("");
        $("#return_portfolio").html(tblData);
        tbldata="";
        // },
    // error:function(jqXHR, textStatus, errorThrown) {
    
    //     }
    })
  }
}


  function asset_allocation(scheme_code,weightage)
 {
  
    
     $("#addText").empty();
if(s_code.length!=0)
{

        $$.get(curr_ip+'home/asset_allocation', {schemecode:scheme_code},function (data)
        {
            var data = JSON.parse(data);
            // console.log("dataaaaaaaaaaaaaaaaaaa") ;
            // console.log(data) ;


    // currentRequest_asset = jQuery.ajax({
    //      type: 'GET',
    //      url: '/home/asset_allocation',
    //       data :{schemecode:schemecode},
    //      dataType: 'json',
    //      // data: { 'iin' : $('#client_name').val()},
    //      beforeSend : function()    {           
    //     if(currentRequest_asset != null) {
    //         currentRequest_asset.abort();
    //     }
    // },
         // success: function(data)
         // {
             
             // swal(scheme_classification);
             var classification=[],color=[],seriesdate=[];
             var eq=0,db=0,gold=0,other=0;
             console.log(data);

             for(i=0;i<data.classification.length;i=i+1)
             {
                // classification=classification+"["+data.classification[i].classification+","+weight[i]+"]"
                // if(i!= data.classification.length-1)
                // {
                //   classification=classification+","
                // }
                  if(i!=0 && data.classification[i-1].classification==data.classification[i].classification )
                  {
                    // var s=seriesdate[i-1][1]+parseInt(weight[i]);
                    // seriesdate[i-1][1]=s;
                    for(var k=0;k<seriesdate.length;k++)
                      {
                        var index=seriesdate[k].indexOf(data.classification[i].classification)
                        if(index!=-1)
                        {
                          var s=seriesdate[k][1]+parseInt(weight[i]);
                          seriesdate[k][1]=s;
                          break;
                        }
                      }
                  }
                  else
                  {
                  classification.push(data.classification[i].classification);
                  classification.push(parseInt(weight[i]));
                  color.push(data.classification[i].colour_code);
                  seriesdate.push(classification)
                  classification=[];
                  }
                  if(data.classification[i].asset_class == "Equity")
                  {
                    eq=eq+parseInt(weight[i]);
                  }
                  else if(data.classification[i].asset_class == "Debt")
                  {
                    db=db+parseInt(weight[i]);
                  }
                  else if(data.classification[i].asset_class == "Gold")
                  {
                    gold=gold+parseInt(weight[i]);
                  }
                  else if(data.classification[i].asset_class == "Others")
                  {
                    other=other+parseInt(weight[i]);
                  }
                }
             
              
              // var seriesOptions=[];
              // seriesOptions[0] = [{
              //               name: ' ',
              //                 data: seriesdate
                            
              //           }];
                        console.log(seriesdate.reverse());
             //   var index_name="";
             //   for(i=0;i<data.nifty_data.length;i=i+1)
             // {
             //     var date2 = new Date(data.nifty_data[i].date);
             //      nifty1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.nifty_data[i].close])
             //      index_name = data.nifty_data[i].indexname
             // }
             
 
        asset_allocation_chart(classification,weight,eq,db,color,seriesdate.reverse(),gold,other)   //added on 6.3.2017
    });
 }
}

    function asset_allocation_chart(classification,weight,eq,db,color,seriesdate,gold,other)
    {
      seriesdate=seriesdate.reverse();
      color=color.reverse();
        
        var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'asset_alloc',
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
                dataLabels: { enabled: false },
                point:  {
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

        var span = '<div class=" chartCircleInside" id="pieChartInfoText2" style="position:relative;">';
        if(gold>0)
        {
          span += '<div class="row"><div class="col-xs-12"><div class="ChartCIDT"><div class="ChartCIP">'+gold+'</div><div class="ChartCIT">GOLD</div></div></div></div>';
        }
       if(gold!=100)
       {
          span += '<div class="row"><div class="col-xs-6"><div class="ChartCIEQ"><div class="ChartCIP">'+eq+'</div><div class="ChartCIT">EQUITY</div></div></div>';
          span += '<div class="col-xs-6 vr_left"><div class="ChartCIDT"><div class="ChartCIP">'+db+'</div><div class="ChartCIT">DEBT</div></div></div></div>';
        }
        if(other>0)
        {
          span += '<div class="row"><div class="col-xs-12"><div class="ChartCIDT"><div class="ChartCIP">'+other+'</div><div class="ChartCIT">OTHERS</div></div></div></div>';
        }
       
        span += '</div>';
        $("#addText").empty();
        $("#addText").append(span);
        span = $('#pieChartInfoText2');
        span.css('left', textX + (span.width() * -0.5));
        span.css('top', textY + (span.height() * -0.5));
    });
                  }





function nav_movement(scheme_code,weightage)
   {
    // for(var i=0;i<weightage.length;i++)
       // swal(weightage[i]);
      // swal(schemecode);
      if(s_code.length!=0)
      {
      $("#container").empty();


$$.get(curr_ip+'home/navgraph_combine', {schemecode:scheme_code,weightage:weightage},function (data)
        {
            var data = JSON.parse(data);




    //   currentRequest_nav = jQuery.ajax({
    //  type: 'GET',
    //  url: '/home/navgraph_combine',
    //   data :{schemecode:scheme_code,weightage:weightage},
    //  dataType: 'json',
    //  // data: { 'iin' : $('#client_name').val()},
    //  beforeSend : function()    {           
    //     if(currentRequest_nav != null) {
    //         currentRequest_nav.abort();
    //     }
    // },
    //  success: function(data)
    //  {
      // console.log(data);
         var i;
         var navrs1=[];
            
          // var scheme_classification=data.classification[0].classification;
         // swal(scheme_classification);
      // for(i=data.navdate.length-1;i>0;i--)
      // {
      //   for(j=1;j<=s_code.length;j++)
      //   {
      //     if(data.navdate[j].navrs)
      //   }
      // }
      var flag_1=0;

         var scc = scheme_code.toString();
         var s_code = scc.split(',');  
         var m=0;
          
         var prev_day_array=[];

         for(i=0;i<data.nav_data.length;i=i+1)
         {
             var date2 = new Date(data.nav_data[i].navdate);
              flag_1=0;
              // if (prev_day_array.length==1)
              // {
              //   prev_day_array=[]
              // }

              // for(ii=1;ii<=s_code.length;ii++)
              // {   if(ii==1)
              //      {
              //         // if(data.nav_data[i].navdate1!=null)
              //         // {
              //           prev_day_array<<data.nav_data[i].navdate1
              //         // }

              //      }

              //      if(ii==2)
              //      {
              //         // if(data.nav_data[i].navdate1!=null)
              //         // {
              //           prev_day_array<<data.nav_data[i].navdate2
              //         // }  
              //      }

              //      if(ii==3)
              //      {
              //         // if(data.nav_data[i].navdate1!=null)
              //         // {
              //           prev_day_array<<data.nav_data[i].navdate3
              //         // }  
              //      }

              //       if(ii==4)
              //      {
              //         // if(data.nav_data[i].navdate1!=null)
              //         // {
              //           prev_day_array<<data.nav_data[i].navdate4
              //         // }  
              //      }

              //       if(ii==5)
              //      {
              //         // if(data.nav_data[i].navdate1!=null)
              //         // {
              //           prev_day_array<<data.nav_data[i].navdate5
              //         // }  
              //      }

              //       if(ii==6)
              //      {
              //         // if(data.nav_data[i].navdate1!=null)
              //         // {
              //           prev_day_array<<data.nav_data[i].navdate6
              //         // }  
              //      }

                  
              // }
          if(i!=0)
                  {
                  for(k=0;k<s_code.length;k=k+1)
                   { 
                        

                            if(k==0)
                              {   
                                 if(data.nav_data[i].navrs0==null && data.nav_data[i-1].navrs0!=null)
                                    {
                                       flag_1=1;
                                       break;
                                    }

                              }  
                              else if(k==1)
                              {   
                                 if(data.nav_data[i].navrs1==null && data.nav_data[i-1].navrs1!=null)
                                    {
                                       flag_1=1;
                                       break;
                                    }

                              }   

                              else if(k==2)
                              {
                                 if(data.nav_data[i].navrs2==null && data.nav_data[i-1].navrs2!=null)
                                    {
                                       flag_1=1;
                                       break;
                                    }

                              }

                              else if(k==3)
                              {
                                 if(data.nav_data[i].navrs3==null && data.nav_data[i-1].navrs3!=null)
                                    {
                                       flag_1=1;
                                       break;
                                    }

                              }

                              else if(k==4)
                              {
                                 if(data.nav_data[i].navrs4==null && data.nav_data[i-1].navrs4!=null)
                                    {
                                       flag_1=1;
                                       break;
                                    }

                              }

                              else if(k==5)
                              {
                                 if(data.nav_data[i].navrs5==null && data.nav_data[i-1].navrs5!=null)
                                    {
                                       flag_1=1;
                                       break;
                                    }

                              }

                        }
                            
             }

            
                if(flag_1==0)
                {
                    navrs1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.nav_data[i].average]);
                }
              
         }
          
         //   var nifty1=[];
         //   var index_name="";
         //   for(i=0;i<data.nifty_data.length;i=i+1)
         // {
         //     var date2 = new Date(data.nifty_data[i].date);
         //      nifty1.push([(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())),data.nifty_data[i].close])
         //      index_name = data.nifty_data[i].indexname
         // }
         
      test_graph_new_graph(navrs1)
     // test_graph_new_graph(scheme_name,index_name,navrs1,nifty1)   //added on 6.3.2017
   
  });
   }
 }

      function test_graph_new_graph(navrs1)   //added on 6.3.2017
               {
                      var seriesOptions = [],
                      seriesCounter = 0,
                      names = [];

                        seriesOptions[0] = {
                            name: $("#port_name").text(),
                            data: navrs1,
                            color: '#429EE9'
                        };


                         var xxx="";
                         var selected=4;
                   
                        if (navrs1.length >= 350  &&  navrs1.length <= 1090)
                        {
                              // var xxx=[{type: 'month', count: 1, text: '1m'}, {type: 'month', count: 3, text: '3m'}, {type: 'month', count: 6, text: '6m'}, {type: 'year', count: 1, text: '1y'},{type: 'year', count: 2, text: '2y'}, {type: 'all', text: 'All'}]; 
                              selected=3;
                        }
                        else if (navrs1.length > 1090 && navrs1.length <= 1825)
                        {
                             // var xxx=[{type: 'month', count: 1, text: '1m'}, {type: 'month', count: 3, text: '3m'}, {type: 'month', count: 6, text: '6m'}, {type: 'year', count: 1, text: '1y'}, {type: 'year', count: 2, text: '2y'}, {type: 'year', count: 3, text: '3y'},  {type: 'all', text: 'All'}]; 
                             selected=5;
                        }
                        else if(navrs1.length > 180 && navrs1.length <= 365)
                        {
                             // var xxx=[{type: 'month', count: 1, text: '1m'}, {type: 'month', count: 3, text: '3m'}, {type: 'month', count: 6, text: '6m'},{type: 'all', text: 'All'}];
                             selected=7; 
                        }
                        else if(navrs1.length > 90 && navrs1.length <= 180)
                        {
                             // var xxx=[{type: 'month', count: 1, text: '1m'}, {type: 'month', count: 3, text: '3m'},{type: 'all', text: 'All'}];
                             selected=7; 
                        }
                        else if(navrs1.length > 30 && navrs1.length <= 90)
                        {
                             // var xxx=[{type: 'month', count: 1, text: '1m'},{type: 'all', text: 'All'}];
                             selected=7; 
                        }
                        else
                        {
                            
                               var xxx = [{type: 'month', count: 1, text: '1m'}, {type: 'month', count: 3, text: '3m'}, {type: 'month', count: 6, text: '6m'},  {type: 'year', count: 1, text: '1y'}, {type: 'year', count: 2, text: '2y'}, {type: 'year', count: 3, text: '3y'}, {type: 'year', count: 5, text: '5y'}, {type: 'all', text: 'All'}]; 
                               selected=5;

                        }


                       

                     Highcharts.stockChart('container', {

                       title: {
                              text: 'NAV Movement',
                              align: 'left',
                              x: -6,
                              style: {
                                  fontSize: '16px',
                                  color: '#3b3f42',
                                  'letter-spacing': '-1px',
                                  'font-family': 'verdana, arial, helvetica, sans-serif'                
                              }
                          },

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
                                y: 68,
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
                             href: 'http://www.rupeevest.com',
                             enabled: true
                        },
                        chart:{ zoomType : false },
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
                        buttons:[{type: 'month', count: 1, text: '1m'}, {type: 'month', count: 3, text: '3m'}, {type: 'month', count: 6, text: '6m'}, {type: 'year', count: 1, text: '1y'}, {type: 'year', count: 2, text: '2y'}, {type: 'year', count: 3, text: '3y'}, {type: 'year', count: 5, text: '5y'}, {type: 'all', text: 'All'}],
                         // buttons:xxx,
                        
                        selected: selected
                    } 

                  }, function (chart) {

    // apply the date pickers
    setTimeout(function () {
        $('input.highcharts-range-selector', $(chart.container).parent())
            .datepicker();
    }, 0);
      });
// chart = new Highcharts.chart(options);
//  chart.redraw();
$('#CPOverview').css("opacity", "1");
$('#wait_2').hide();
                
              }


  $.datepicker.setDefaults({
      dateFormat: 'yy-mm-dd',
      onSelect: function () {
    this.onchange();
    this.onblur();
      },
       beforeShow: function (input, inst) {
        setTimeout(function () {
            inst.dpDiv.css({
                // top: 100,
                // left: 980
                left: '75%'
            });
        }, 0);
    }
  });



function get_portfolio(schemecode , weightage)
     {
      
      if(s_code.length!=0)
      {
        // alert("hjhj");
      var total_eq=0;
      var total_ot=0;
      var total_db=0;
      var total_cash=0;
      var tblData_eq="";
      var tblData_db="";
      var count=0;
      var count_eq=0;


      $$.get(curr_ip+'home/combined_portfolio', {schemecode:schemecode,weightage:weightage},function (data)
        {
            var data = JSON.parse(data);


    //    currentRequest_portfolio = jQuery.ajax({
    //  type: 'GET',
    //  url: '/home/combined_portfolio',
    //   data :{schemecode:schemecode,weightage:weightage},
    //  dataType: 'json',
    //  // data: { 'iin' : $('#client_name').val()},
    //  beforeSend : function()    {           
    //     if(currentRequest_portfolio != null) {
    //         currentRequest_portfolio.abort();
    //     }
    // },
    //  success: function(data)
    //  {
       console.log(data);
       if(data.port_eq.length > 0)
       {
         var as_on_date=moment(data.port_eq[0].invdate).format('DD-MMM-YY')
                   
                     univ_as_on_date = as_on_date;

        th = "<table><CAPTION><h4 class='d_inline'>Equity Holdings </h4><h6>&nbsp;&nbsp;(as on "+as_on_date+")</h6></CAPTION><thead><tr><th>Company</th><th>Sector</th><th>Assets %</th></tr></thead>";
        
        for(var i =0;i <= data.port_eq.length-1;i++)
       {
        // if (i<10)
        // {
            var item1 = data.port_eq[i];
            var scheme_code = item1.schemecode;
            var company = item1.compname;
            // var sector = item1.sect_name;
            var rv_sector = item1.rv_sect_name;
            var holdpercentage = item1.hp;
            total_eq = total_eq + holdpercentage;
            // var previous_quarter  = item1.prev_holdperc;

            var fin_code = item1.fincode;
                        var new_comp_link;
                     // swal(fin_code);

          // if(fincode_array.indexOf(fin_code)!= -1)
          // {
          //               new_comp_link="<a target='_blank' href='/Mutual-Fund-Holdings/"+fin_code+"'>"+company+"</a>";
                 
          // }
          // else
          // {
            new_comp_link=company;
          // }

              if(i == 0)
                 {
                  if(parseFloat(holdpercentage)!=0.0)
                       {
                        count_eq=1;
                  tblData_eq = th + "<tr class='post'><td>"+new_comp_link+"</td><td>"+rv_sector+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
                 }
                 else
                 {
                  tblData_eq = th;
                 }
               }
                else
                {
                  if(parseFloat(holdpercentage)!=0.0)
                       {
                        count_eq++
                 tblData_eq = tblData_eq + "<tr class='post'><td>"+new_comp_link+"</td><td>"+rv_sector+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
               }
                 }
         
         
       // }
       // else
       // {
       //  var item1 = data.port_eq[i];
       //  var holdpercentage = item1.hp;
       //  total_eq = total_eq + holdpercentage;
       // }
     }
     
     tblData_eq = tblData_eq+"</table>";
         // $('#equity_port').html("");
         // $('#equity_port').html(tblData_eq);
        
        
        

        

       }

       if(data.port_debt.length > 0)
       {
        // port_graph_debt();
        var as_on_date=moment(data.port_debt[0].invdate).format('DD-MMM-YY')
        th = "<table><CAPTION><h4 class='d_inline'>Debt Holdings </h4><h6>&nbsp;&nbsp;(as on "+as_on_date+")</h6></CAPTION><thead><tr><th>Instrument</th><th>Asset Type</th><th>Rating</th><th>Assets %</th></tr></thead>";
        
        for(var i =0;i <= data.port_debt.length-1;i++)
       {
        // if(i<10)
        // {
            var item1 = data.port_debt[i];
            var scheme_code = item1.schemecode;
            var company = item1.compname;
            var asect_type = item1.asect_type;
            var rating = item1.rating;
            var holdpercentage = item1.hp;
            total_db = total_db + holdpercentage;

                  if(i == 0)
                     {
                      if(parseFloat(holdpercentage)!=0.0)
                       {
                      count=1;
                      tblData_db = th + "<tr class='postd'><td>"+company+"</td><td>"+asect_type+"</td><td>"+rating+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
                    }
                    else
                    {
                      tblData_db=th;
                    }
                            }
                    else
                    {
                       if(parseFloat(holdpercentage)!=0.0)
                       {

                        count++;
                          tblData_db= tblData_db + "<tr class='postd'><td>"+company+"</td><td>"+asect_type+"</td><td>"+rating+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
                   }
                      }
           
            
          // }
          // else
          // {
          //   var item1 = data.port_debt[i];
          //   var holdpercentage = item1.hp;
          //   total_db = total_db + holdpercentage;
          // }
        }
        // alert(count);

        
        tblData_db = tblData_db + "</table>";
       
        // $('#debt_port').html("");
        //  $('#debt_port').html(tblData_db);
        
       }

       if(data.port_others.length > 0)
       {                

                  var as_on_date=moment(data.port_others[0].invdate).format('DD-MMM-YY')
          
                th = "<table><CAPTION><h4 class='d_inline'>Miscellaneous Holdings</h4><h6>&nbsp;&nbsp;(as on "+as_on_date+")</h6></CAPTION><thead><tr><th>Instrument</th><th>Assets %</th></tr></thead>";
          for(var i =0;i <= data.port_others.length-1;i++)
         {
          var item1 = data.port_others[i];
          // var scheme_code = item1.schemecode;
          var company = item1.compname;
          // var sector = item1.sect_name;
          // var rv_sector = item1.rv_sect_name;
          var holdpercentage = item1.hp;
          total_ot = total_ot + holdpercentage;
          // var previous_quarter  = item1.prev_holdperc;
                if(i == 0)
                   {
                    tblData = th + "<tr><td>"+company+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
                          }
                  else
                  {
                   tblData = tblData + "<tr><td>"+company+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
                    }
         }
         // tblData = tblData + "<tr><td>"+"Total</td><td>"+total_ot.toFixed(2)+"</td></tr></table>";
         tblData = tblData + "</table>";
         console.log(tblData);
         $('#others').show();
           $('#others_port').html("");
         $('#others_port').html(tblData);
         tbldata="";
       }
       else
       {
         $('#others').hide();
       }
       if(data.port_cash.length > 0)
       {
                        var as_on_date= moment(data.port_cash[0].invdate).format('DD-MMM-YY');  

                th = "<table><CAPTION><h4 class='d_inline'>Cash & Cash Equivalents</h4><h6>&nbsp;&nbsp;(as on "+as_on_date+")</h6></CAPTION><thead><tr><th>Instrument</th><th>Assets %</th></tr></thead>";
          for(var i =0;i <= data.port_cash.length-1;i++)
         {
          var item1 = data.port_cash[i];
          // var scheme_code = item1.schemecode;
          var company = item1.compname;
          // var sector = item1.sect_name;
          // var rv_sector = item1.rv_sect_name;
          var holdpercentage = item1.hp;
          total_cash = total_cash + holdpercentage;
          // var previous_quarter  = item1.prev_holdperc;
                if(i == 0)
                   {
                    // tblData = th + "<tr><td>"+company+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
                          }
                  else
                  {
                   // tblData = tblData + "<tr><td>"+company+"</td><td>"+holdpercentage.toFixed(2)+"</td></tr>";
                    }
         }
          tblData = th + "<tr><td>"+"Cash Equivalents</td><td>"+total_cash.toFixed(2)+"</td></tr></table>";
           $("#cash_port").html("");
                 $("#cash_port").html(tblData);
                 tbldata="";
       }
       // if( count > 10)
       //  {
       //    $("#pagesd").removeClass("d_none");
       //  }
       //  else
       //  {
       //    // alert("jkjk");
       //    $("#pagesd").addClass("d_none");
       //  }
       //  if( count_eq > 10)
       //  {
       //    $("#pages").removeClass("d_none");
       //  }
       //  else
       //  {
       //    $("#pages").addClass("d_none");
       //  }
       // var total=total_eq + total_db+total_ot+total_cash;
       // $("#holding_table-3").append("<tr><td>Grand Total</td><td>"+Math.round(total.toFixed(2))+"</td></tr>");
       // plot_data(total_eq,total_db,tblData_eq,tblData_db,schemecode);


         plot_data(total_eq,total_db,tblData_eq,tblData_db,schemecode,weightage,count,count_eq);
         // $('#wait_3').css("display", "none");
     
    
     });
}
     }

function portfolio_pagination()
{
  pageSize =10;
console.log("kkkNo. of Pages -- "+$('.pagination .post').length/pageSize);
var totalPages = $('.pagination .post').length/pageSize
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
    if (page == Math.floor($('.post').length/pageSize)) {
    //swal("last");
        //page = 1;
    } else {
        page++;
    }
  console.log(page);
    showPage(page);
}
}


function portfolio_pagination1()
{
  pageSized =10;
console.log("jjjNo. of Pages -- "+$('.pagination1 .postd').length/pageSized);
var totalPages = $('.pagination1 .postd').length/pageSized;
 console.log($('.postd').length);
showPaged = function(page) {
    $(".postd").hide();

    $(".postd").each(function(n) {
      // console.log(n)

        if (n >= pageSized * (page - 1) && n < pageSized * page)
            $(this).show();
    });
}

showPaged(1);




$("#pagesd .pages_1").click(function() {
    $("#pages .pages_1").removeClass("current");
    $(this).addClass("current");
    showPage(parseInt($(this).text()));
});

    

    $('#prevd').click(prevPaged);
    $('#nextd').click(nextPaged);


var page = 1;

function prevPaged() {
    //debugger;
    if (page === 1) {
    //swal("prev");
        //page = Math.floor($('.pagination .post').length/pageSize);
    } else {
        page--;
    }
    console.log(page);
    showPaged(page);
}

function nextPaged() {
  // swal("kjkj");
  console.log(Math.floor($('.postd').length/pageSized))
    if (page == Math.floor($('.postd').length/pageSized)) {
    //swal("last");
        //page = 1;
    } else {
        page++;
    }
  console.log(page);
    showPaged(page);
}
}

    function plot_data(total_eq,total_db,tblData_eq,tblData_db,schemecode,weightage,count,count_eq)
  {
    $("#container_equity").empty();
    $("#container_credit_rating").empty();
     $("#equity_port").html("");
     $("#debt_port").html("");
     $("#pre_nex_eq").html("");
     $("#pre_nex_de").html("");
  // swal(total_eq);
    if(total_eq>total_db)
    {
      
       if(total_eq !=0)
       {
          $("#equity_port").html(tblData_eq);
          $("#equity_port").removeClass("debt_table");
          $("#equity_port").addClass("equity_table");
          $("#pre_nex_eq").html("<center><div id='pages' class='portfolioPagination d_none'><span id='prev' class='previous'><span class='glyphicon glyphicon-triangle-left'></span>&nbsp;&nbsp;Previous</span> |<span id='next' class='next'>Next&nbsp;&nbsp;<span class='glyphicon glyphicon-triangle-right'></span></span></div></center>" )
          portfolio_pagination();
        }
       
       if(total_db !=0)
       {
          $("#debt_port").html(tblData_db);
          $("#debt_port").removeClass("equity_table");
          $("#debt_port").addClass("debt_table");
          $("#pre_nex_de").html( "<center><div id='pagesd' class='portfolioPagination d_none'><span id='prevd' class='previous'><span class='glyphicon glyphicon-triangle-left'></span>&nbsp;&nbsp;Previous</span> |<span id='nextd' class='next'>Next&nbsp;&nbsp;<span class='glyphicon glyphicon-triangle-right'></span></span></div></center>")
        portfolio_pagination1();
         }
      if(tblData_eq!="" && total_eq>15)
      {
        get_equity_graph("container_equity",schemecode,weightage); 

          // portfolio_pagination();

      }
      if(tblData_db!="" && total_db>10)
      {
        $("#others").show();
        reflow_graph=1;
        get_credit_rating_graph("container_credit_rating",schemecode,weightage); 
        
      }
      else
      {
        reflow_graph=0;
      }
      
    }
    else
    {
       $("#debt_port").html("");
       if(total_eq !=0)
       {
          $("#debt_port").html(tblData_eq);
          $("#debt_port").removeClass("debt_table");
           $("#debt_port").addClass("equity_table");
            $("#pre_nex_de").html("<center><div id='pages' class='portfolioPagination d_none'><span id='prev' class='previous'><span class='glyphicon glyphicon-triangle-left'></span>&nbsp;&nbsp;Previous</span> |<span id='next' class='next'>Next&nbsp;&nbsp;<span class='glyphicon glyphicon-triangle-right'></span></span></div></center>" )
          portfolio_pagination();
        }
       $("#equity_port").html("");
       if(total_db !=0)
       {
          $("#equity_port").html(tblData_db);
          $("#equity_port").removeClass("equity_table");
          $("#equity_port").addClass("debt_table");
           $("#pre_nex_eq").html( "<center><div id='pagesd' class='portfolioPagination d_none'><span id='prevd' class='previous'><span class='glyphicon glyphicon-triangle-left'></span>&nbsp;&nbsp;Previous</span> |<span id='nextd' class='next'>Next&nbsp;&nbsp;<span class='glyphicon glyphicon-triangle-right'></span></span></div></center>")
          portfolio_pagination1();
        }
      if(tblData_eq!="" && total_eq>15)
      {
        reflow_graph=1;
        get_equity_graph("container_credit_rating",schemecode,weightage); 
        // get_portfolio_markettable(schemecode,"portfolio_characteristics");
        // get_portfolio_markettable_avgmcap(schemecode);
        // get_portfolio_markettable_allcapavgs(schemecode);
        // concentration_values(schemecode,"conval_2");
      }
      else
      {
        reflow_graph=0;
      }
      if(tblData_db!="" && total_db>10)
      {
        get_credit_rating_graph("container_equity",schemecode,weightage); 
        // port_characteristics(schemecode,"portfolio_table");

      }
      if(total_eq!=0)
      {
      // get_portfolio_markettable(schemecode,"portfolio_characteristics");
      // get_portfolio_markettable_avgmcap(schemecode);
      // get_portfolio_markettable_allcapavgs(schemecode);
      // concentration_values(schemecode,"conval_2");
      }
      if(total_db>0)
      {
        // swal("debt");
        // port_characteristics(schemecode,"portfolio_table");
      }
      
    }
    if( count > 10)
        {
          $("#pagesd").removeClass("d_none");
        }
        else
        {
          // alert("jkjk");
          $("#pagesd").addClass("d_none");
        }
        if( count_eq > 10)
        {
          $("#pages").removeClass("d_none");
        }
        else
        {
          $("#pages").addClass("d_none");
        }
 // setTimeout(function(){
     $('#wait_3').css("display", "none");
     $('#CPPortfolio').css("opacity", "1");
    
   
 //your code here
// }, 3000);
  }

  function get_equity_graph(id,s_code,weight)
   {
    var s=[];
    var tbldata;
    var series1=[];
    var p=0;
    var flag;
    var sector_name=[];


      $$.get(curr_ip+'home/get_combine_portfolio_equity', {schemecode:s_code,weightage:weight},function (data)
        {
            var data = JSON.parse(data);


   // currentRequest_equity_graph = jQuery.ajax({
   //      type:'GET',
   //      url: '/home/get_combine_portfolio_equity',
   //      data :{schemecode:s_code,weightage:weight},
   //      datatype:'json',
   //      beforeSend : function()    {           
   //      if(currentRequest_equity_graph != null) {
   //          currentRequest_equity_graph.abort();
   //      }
   //  },
   //      success:function(data, textStatus, jqXHR)
   //       {
     // console.log(data);
     // console.log(data.sect_name);
     for(var i=0;i<data.sect_name.length;i++)
     {
      sector_name[i]=data.sect_name[i];
      series1[i]=data.weighted_sum[i]
     
       }
    
      plot_equity_graph(id,sector_name,series1);
      if(s_code.length==0)
          {
            $("#container").empty();
            $("#imdone").prop('disabled', true);
            console.log("kkkk");
              // swal("coming here---");
              $("#min_invest").text("-");
              $("#min_invest_sip").text("-");

              // $("#asset_alloc").text("");
              $("#addText").text("");
              $("#asset_alloc").html("<p class='text-center'>No Fund Selected</p>")
              

              $("#return_portfolio").empty();
              var th = "<table class='table table-responsive table-striped table-condensed'><thead><tr><th>1 Month </th><th>3 Month </th><th>6 Month </th><th>1 Year </th><th>3 Year </th><th>5 Year </th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr></tbody><table>";
              $("#return_portfolio").html(th);
              $("#container").empty();
              $("#container_equity").empty();
              $("#container_credit_rating").empty();
              $("#equity_port").empty();
              $("#debt_port").empty();
              $("#cash_port").empty();

              $("#others_port").empty();
               $("#pages").empty();
                $("#pagesd").empty();
                $('#rec_m_funds').show();


               // $("#container").html("<p class='text-center'>No Fund Selected</p>")
              // $("#CPPortfolio").hide();
              $("#no_fund").show();
              $("#no_fund").html("<p class='text-center'>No Fund Selected</p>")
          }

         

       });
       
  }

  function get_credit_rating_graph(id,s_code,weight)
   {
    var s=[];
    var tbldata;
    var series1=[];
    var p=0;
    var flag;
    var sector_name=[];

    $$.get(curr_ip+'home/get_combine_portfolio_credit_rating', {schemecode:s_code,weightage:weight},function (data)
        {
            var data = JSON.parse(data);


    // currentRequest_debt_graph = jQuery.ajax({
    //     type:'GET',
    //     url: '/home/get_combine_portfolio_credit_rating',
    //     data :{schemecode:s_code,weightage:weight},
    //     datatype:'json',
    //     beforeSend : function()    {           
    //     if(currentRequest_debt_graph != null) {
    //         currentRequest_debt_graph.abort();
    //     }
    // },
    //     success:function(data, textStatus, jqXHR)
    //      {
     // console.log(data);
     // console.log(data.rupeevest_group);
     if(data.rupeevest_group!=null||data.rupeevest_group!=undefined)
     {
     for(var i=0;i<data.rupeevest_group.length;i++)
     {
      sector_name[i]=data.rupeevest_group[i];
      series1[i]=data.weighted_sum[i]
     
       }
      plot_credit_rating_graph(id,sector_name,series1);
}
 if(s_code.length==0)
          {
            $("#container").empty();
            $("#imdone").prop('disabled', true);
            console.log("kkkk");
              // swal("coming here---");
              $("#min_invest").text("-");
              $("#min_invest_sip").text("-");

              // $("#asset_alloc").text("");
              $("#addText").text("");
              $("#asset_alloc").html("<p class='text-center'>No Fund Selected</p>")
              

              $("#return_portfolio").empty();
              var th = "<table class='table table-responsive table-striped table-condensed'><thead><tr><th>1 Month </th><th>3 Month </th><th>6 Month </th><th>1 Year </th><th>3 Year </th><th>5 Year </th></tr></thead><tbody><tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr></tbody><table>";
              $("#return_portfolio").html(th);
              $("#container").empty();
              $("#container_equity").empty();
              $("#container_credit_rating").empty();
              $("#equity_port").empty();
              $("#debt_port").empty();
              $("#cash_port").empty();

              $("#others_port").empty();
               $("#pages").empty();
                $("#pagesd").empty();
                $('#rec_m_funds').show();


               // $("#container").html("<p class='text-center'>No Fund Selected</p>")
              // $("#CPPortfolio").hide();
              $("#no_fund").show();
              $("#no_fund").html("<p class='text-center'>No Fund Selected</p>")
          }
         
       });
       
  }

  function plot_equity_graph(id,sector_name,series1)
  {
  // swal(id);
    Highcharts.chart(id, {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Sector Allocation',
         align: 'left',
         x: -6,
        style: {
              fontSize: '16px',
              color: '#3b3f42',
              'letter-spacing': '-1px',
              'font-family': 'verdana, arial, helvetica, sans-serif'                
          }
      },
      xAxis: {
        categories: sector_name
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Assets ( % )'
        },
        stackLabels: {
            enabled: true,
            style: {
                // fontWeight: 'normal',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
      },
      legend: {
          align: 'center',
          //x: -30,
          verticalAlign: 'top',
          y: 33,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false,
          itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "11px", "fontWeight": "normal" }
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      credits: {
           text: 'RupeeVest',
           href: 'http://www.rupeevest.com',
           enabled: true
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: false,
                  color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
              }
          }
      },
      // series: series1
      series:[{
        name:$("#port_name").text(), 
        data:series1
      }]
  });
  }


  function plot_credit_rating_graph(id,sector_name,series1)
  {

    Highcharts.chart(id, {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Credit Rating',
        align: 'left',
        x: -6,
        style: {
              fontSize: '16px',
              color: '#3b3f42',
              'letter-spacing': '-1px',
              'font-family': 'verdana, arial, helvetica, sans-serif'                
          }
      },
      xAxis: {
        categories: sector_name
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Assets ( % )'
      },
      stackLabels: {
        enabled: true,
        style: {
                // fontWeight: 'normal',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        }
      },
      legend: {
        align: 'center',
        //x: -30,
        verticalAlign: 'top',
        y: 33,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false,
        itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "11px", "fontWeight": "normal" }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      credits: {
           text: 'RupeeVest',
           href: 'http://www.rupeevest.com',
           enabled: true
      },
      plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
      },
      // series: series1
      series:[{
        name:$("#port_name").text(), 
        data:series1
      }]
  });
  }



 jQuery(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function () { 
      // $('.ChartReflow').each(function() { 
      //     $(this).highcharts().reflow();

      // });
    // debugger;
    if(this.id=="port_tab")
      // $("#container").highcharts().reflow();
    {
      if($("#container_equity").html()!="")
          $("#container_equity").highcharts().reflow();
      if(reflow_graph==1)
            $("#container_credit_rating").highcharts().reflow();
       }
       else
       {
        $("#container").highcharts().reflow();
       }
    
  });





        
    }

/***************************** OfferISDesign / Combined MF END ************************** */ 


/***************************** ToolsScreener / Screener START ************************** */ 

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

/***************************** ToolsScreener / Screener END ************************** */ 


/***************************** ToolsCalculatorFD / FD Calcultor START ************************** */ 


    if(page.name==='ToolsCalculatorFD'){

    var $amount_slide = $('#js-amount-range');
    var $amount = $('#amount');

    $amount_slide.rangeslider({
        polyfill: true,
      })
      .on('input', function() {
        // var abc=commaSeparateNumber(this.value);
        $amount[0].value = commaSeparateNumber(this.value);
      });

    $amount.on('input', function() {
      $amount_slide.val(commaSeparateNumber(this.value)).change();
    });


    var $year_slide = $('#js-year-range');
    var $year = $('#year');

    $year_slide.rangeslider({
        polyfill: true
      })
      .on('input', function() {
        $year[0].value = this.value;
        $("#tot_year").html(this.value);
      });

    $year.on('input', function() {
      $year_slide.val(this.value).change();
      $("#tot_year").html(this.value);
    });


    var $month_slide = $('#js-month-range');
    var $month = $('#month');

    $month_slide.rangeslider({
        polyfill: true
      })
      .on('input', function() {
        $month[0].value = this.value;
        $("#tot_month").html(this.value);
      });

    $month.on('input', function() {
      $month_slide.val(this.value).change();
      $("#tot_month").html(this.value);
    });


    var $day_slide = $('#js-day-range');
    var $day = $('#day');

    $day_slide.rangeslider({
        polyfill: true
      })
      .on('input', function() {
        $day[0].value = this.value;
        $("#tot_day").html(this.value);
      });

    $day.on('input', function() {
      $day_slide.val(this.value).change();
      $("#tot_day").html(this.value);
    });


    var $interest_slide = $('#js-interest-range');
    var $interest = $('#interest');

    $interest_slide.rangeslider({
        polyfill: true
      })
      .on('input', function() {
        $interest[0].value = this.value;
      });

    $interest.on('input', function() {
      $interest_slide.val(this.value).change();
    });

    $("#calculate").click(function () {

      var abc=$('#amount').val().replace(/\D/g, "").replace(/\B(?=(\d\d)+\d$)/g, ",");
      
        var a = parseInt($("#amount").val().replace(/,/g, ''));
        var r = parseFloat($("#interest").val() / 100);
        var y = parseInt($("#year").val());
        var m = parseInt($("#month").val());
        var d = parseInt($("#day").val());
        var p = parseInt($("input[name='frequency']:checked").val());
        var n = 1;
        var x = (y + m/12 + d/365);
        var year=[];
        var amount=[];
        var interest = [];
        var opening = [];

            if($("#amount").val() < 1 ) {
                $("#amount_valid").show();
                $("#amount_valid").text('Please Fill The Amount') ; 
                return;               
           }        
           else {
                $("#amount_valid").hide();
           }   
           if($("#year").val() == 0 && $("#month").val() == 0 && $("#day").val() == 0) {
                $("#period_valid").show();
                $("#period_valid").text('Please Choose period') ;
                return;
           }
           else {
                $("#period_valid").hide();
           }
           if($("#interest").val() < 1 ) {
            $("#interest_valid").show();
                $("#interest_valid").text('Please Fill The Interest') ;
                return;
           }
           else {
                $("#interest_valid").hide();
           }
           
        $('.table').show();

        for(z=1; z<=x;z++)
        {
            
             var cb = a * Math.pow((1 + (r / p)) , (z * p));
            if (z>1){
              interest[z-1]= cb-amount[z-2]; 
              opening[z-1] = amount[z-2];     
            }else{
              interest[z-1]= cb-a;
              opening[z-1] = a;     
            }
             
             amount[z-1]=cb;
             year[z-1]=z;
             
        }

        if(x>z-1){
           
            var cb = a * Math.pow((1 + (r / p)) , (x * p));
            amount[z-1]= cb;
            year[z-1]= x;
            if (z>1){
              interest[z-1]= cb-amount[z-2]; 
              opening[z-1] = amount[z-2];     
            }else{
              interest[z-1]= cb-a;
              opening[z-1] = a;     
            }
        }

        var opening_final=[], interest_final=[] , year_final=[];
        var tot_intrst_earned=0, tot_maturity_amt=0;
         $('#part_calculations').empty();
        for(var i=0;i<opening.length;i++)
        {
             opening_final[i] = Math.round(opening[i]); 
             interest_final[i] = Math.round(interest[i]);

             if(i==(opening.length-1))
             {
                if(m==0 && d==0)
                {
                    year_final[i] = year[i];
                }
                else {
                    year_final[i] =  parseFloat(year[i]).toFixed(2);
                }
             }
             else
             {
                year_final[i] = year[i];
             }

             tot_intrst_earned = tot_intrst_earned + Math.round(interest[i]);
             tot_maturity_amt = Math.round(interest[i]+opening[i]);

              $('#part_calculations').append("<tr><td>"+year_final[i]+"</td><td>"+commaSeparateNumber(Math.round(opening[i]))+"</td><td>"+commaSeparateNumber(Math.round(interest[i]))+"</td><td>"+commaSeparateNumber(Math.round(interest[i]+opening[i]))+"</td></tr>")
 
            
        }
            $('#maturity_amt').html(commaSeparateNumber(tot_maturity_amt));
            $('#total_int').html(commaSeparateNumber(tot_intrst_earned));
            
           
        
        
    
    });


    }


/***************************** ToolsCalculatorFD / FD Calcultor END ************************** */ 





})

// Option 2. Using live 'pageInit' event handlers for each page
//$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
//})



