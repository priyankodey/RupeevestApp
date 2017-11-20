// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var curr_ip='http://192.168.1.22:3000/'

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    // console.log("Device is ready!");
    //  console.log("-------------------------1----------------");
    $$.get('http://192.168.1.22:3000/functionalities/get_user_info', {iin: 5011179660},function (data) {
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
       // console.log(data);
        //console.log(data[inv_name]);
});

                // $$.getJSON('http://192.168.1.22:3000/functionalities/get_user_info?iin=5011179660', function (data) {
                //     console.log(data);
                // });
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page


})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
    //console.log(page.url);

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');
    }

    if (page.url === 'login.html') {
        // $$("body.with-panel-left-reveal .views").css("transform","translate3d(0,0,0)");
        $$('.form-to-data').on('click', function(){
            //console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
            // var formData = myApp.formToData('#my-form');
            // alert(JSON.stringify(formData));
            var email = $$('#email').val();
            var password= $$('#password').val();
            console.log(email);
            console.log(password);
            $$.get('http://192.168.1.22:3000/users/sign_in', {email: email,password: password},function (data) {
                // console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
                console.log(data);
                //console.log(data[inv_name]);
            });

        }); 
    }
    
    if(page.name === 'fund_details')
    {
        //console.log(page.url);
        var query = $$.parseUrlQuery(page.url);
        //console.log(query);
        var scheme_code=query.scheme_code;
        $$.get(curr_ip+'functionalities/get_fund_info', {schemecode: +scheme_code},function (data) 
        {
            //console.log(data);
            var myObj = JSON.parse(data);
            //console.log(myObj.CLient[0].s_name);
            $$('#schemename').val(myObj.CLient[0].s_name);
            $$('#schemclassification').val(myObj.CLient[0].classification);
            x=2;
            if(x==1){
                console.log("11111111111111");
            }
            else{
                console.log("222222222222222");
            }
            test_graph(myObj.CLient[0].s_name,scheme_code);
        });
        // chart_1();
    }


   if(page.name==='mutualfund')
    {
        console.log("MF");
        $$.get(curr_ip+'home/mf_home_for_app', {schemecode: +scheme_code},function (data) 
        {
            var myObj = JSON.parse(data);
            console.log(myObj);
            console.log(myObj.equity_lc[0].s_name);
            console.log(myObj.equity_mc[0].s_name);
    
           var i;
           var table_data_equity_lc="";
            for (i = 0; i < myObj.equity_lc.length; i++) 
            {
                table_data_equity_lc=table_data_equity_lc+"<tr><td><a href=fund_details.html?scheme_code="+myObj.equity_lc[i].schemecode+">"+myObj.equity_lc[i].s_name+"</a></td></tr>";
            }
            $$('#Elargecap1 tbody').html(table_data_equity_lc);

            var table_data_equity_mc="";
            for (i = 0; i < myObj.equity_mc.length; i++) 
            {
                table_data_equity_mc=table_data_equity_mc+"<tr><td><a href=fund_details.html?scheme_code="+myObj.equity_mc[i].schemecode+">"+myObj.equity_mc[i].s_name+"</a></td></tr>";
            }
            $$('#Emulti1 tbody').html(table_data_equity_mc);

            var table_data_equity_msc="";
            for (i = 0; i < myObj.equity_msc.length; i++) 
            {
                table_data_equity_msc=table_data_equity_msc+"<tr><td><a href=fund_details.html?scheme_code="+myObj.equity_msc[i].schemecode+">"+myObj.equity_msc[i].s_name+"</a></td></tr>";
            }
             $$('#Emidsmall1 tbody').html(table_data_equity_msc);

            var table_data_equity_elss="";
            for (i = 0; i < myObj.elss.length; i++) 
            {
                table_data_equity_elss=table_data_equity_elss+"<tr><td><a href=fund_details.html?scheme_code="+myObj.elss[i].schemecode+">"+myObj.elss[i].s_name+"</a></td></tr>";
            }
             $$('#Eelss1 tbody').html(table_data_equity_elss);

            var table_data_debt_liq="";
            for (i = 0; i < myObj.debt_liq.length; i++) 
            {
                table_data_debt_liq=table_data_debt_liq+"<tr><td><a href=fund_details.html?scheme_code="+myObj.debt_liq[i].schemecode+">"+myObj.debt_liq[i].s_name+"</a></td></tr>";
            }
             $$('#DebtLiquid tbody').html(table_data_debt_liq);

            var table_data_debt_ust="";
            for (i = 0; i < myObj.debt_ust.length; i++) 
            {
                table_data_debt_ust=table_data_debt_ust+"<tr><td><a href=fund_details.html?scheme_code="+myObj.debt_ust[i].schemecode+">"+myObj.debt_ust[i].s_name+"</a></td></tr>";
            }
             $$('#DebtUltraShortTerm tbody').html(table_data_debt_ust);

            var table_data_debt_st="";
            for (i = 0; i < myObj.debt_st.length; i++) 
            {
                table_data_debt_st=table_data_debt_st+"<tr><td><a href=fund_details.html?scheme_code="+myObj.debt_st[i].schemecode+">"+myObj.debt_st[i].s_name+"</a></td></tr>";
                //console.log(myObj.debt_ust.length);
            }
             $$('#DebtShortTermGILT tbody').html(table_data_debt_st);

            var table_data_debt_m_lt="";
            for (i = 0; i < myObj.debt_m_lt.length; i++) 
            {
                table_data_debt_m_lt=table_data_debt_m_lt+"<tr><td><a href=fund_details.html?scheme_code="+myObj.debt_m_lt[i].schemecode+">"+myObj.debt_m_lt[i].s_name+"</a></td></tr>";
                //console.log(myObj.debt_ust.length);
            }
             $$('#DebtMediumLongTermGILT tbody').html(table_data_debt_m_lt);

            var table_data_hybrid_eo="";
            for (i = 0; i < myObj.hybrid_eo.length; i++) 
            {
                table_data_hybrid_eo=table_data_hybrid_eo+"<tr><td><a href=fund_details.html?scheme_code="+myObj.hybrid_eo[i].schemecode+">"+myObj.hybrid_eo[i].s_name+"</a></td></tr>";
                //console.log(myObj.debt_ust.length);
            }
             $$('#HybridBalancedEquityOriented tbody').html(table_data_hybrid_eo);

            var table_data_hybrid_do="";
            for (i = 0; i < myObj.hybrid_do.length; i++) 
            {
                table_data_hybrid_do=table_data_hybrid_do+"<tr><td><a href=fund_details.html?scheme_code="+myObj.hybrid_do[i].schemecode+">"+myObj.hybrid_do[i].s_name+"</a></td></tr>";
                //console.log(myObj.debt_ust.length);
            }
             $$('#HybridBalancedDebtOriented tbody').html(table_data_hybrid_do);

            var table_data_hybrid_arb="";
            for (i = 0; i < myObj.hybrid_arb.length; i++) 
            {
                table_data_hybrid_arb=table_data_hybrid_arb+"<tr><td><a href=fund_details.html?scheme_code="+myObj.hybrid_arb[i].schemecode+">"+myObj.hybrid_arb[i].s_name+"</a></td></tr>";
                //console.log(myObj.debt_ust.length);
            }
             $$('#HybridArbitrage tbody').html(table_data_hybrid_arb);

             $$('#EquityLargeCap .mf_as_on h6, #EquityMultiCap .mf_as_on h6, #EquityMidSmallCap .mf_as_on h6, #DebtLiquid .mf_as_on h6, #DebtUltraShortTerm .mf_as_on h6, #DebtShortTermGILT .mf_as_on h6, #DebtMediumLongTermGILT .mf_as_on h6, #HybridBalancedEquityOriented .mf_as_on h6, #HybridBalancedDebtOriented .mf_as_on h6, #HybridArbitrage .mf_as_on h6').html("As on 01 Oct 2017");
             $$('#EquityTaxSavingELSS .mf_as_on h6').html("As on 01 Apr 2017");

        });


    }


})

// Option 2. Using live 'pageInit' event handlers for each page
//$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
//})




$$('.form-to-data').on('click', function(){
  // var formData = myApp.formToData('#my-form');
 // console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQ");
}); 