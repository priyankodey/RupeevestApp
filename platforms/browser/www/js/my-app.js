// Initialize app
//var myApp = new Framework7();
var myApp = new Framework7({pushState: true,});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var curr_ip='http://192.168.1.13:3000/'

var RVNav="";
RVNav ="<div class='navbar'><div class='navbar-inner'><div class='left'><a href='#' class='link icon-only open-panel'><i class='icon icon-bars'></i></a></div><div class='center'><span id='navbar_info_span'><a href='index.html'><img src='img/icons/logo.png' alt='RupeeVest'></a></span><input type='text' id='fund_names' class='form-control ui-autocomplete-input' placeholder='Search mutual funds here...' autocomplete='off'></div><div class='right'><a href='#' class='' id='navbar_search_btn'><i class='fa fa-search' aria-hidden='true'></i></a><a href='#' class='' id='navbar_close_btn'><i class='fa fa-times' aria-hidden='true'></i></a></div></div></div>"
var Client_Name="";

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

    // $$.get('http://192.168.1.13:3000/functionalities/get_user_info', {iin: 5011179660},function (data) {
    //    });

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
            $$.get(curr_ip+'app_services/dashboard', function (client_data_ajax) {
            var client_data=JSON.parse(client_data_ajax);
            $("#sidepanel_user_name").html("Hello "+client_data.name);
            Client_Name=client_data.name;
            $("#sidepanel_log_out_flag").show();
            $("#sidepanel_log_flag").hide();

            });
            
            $$('#sidepanel_log_out_flag').on('click', function () {
                console.log("LOg out");
                  $$.ajax({
                    type: 'DELETE',
                    url: curr_ip+'users/sign_out',
                    
                    success: function(response){
      
                        console.log(response);
                        mainView.router.loadPage('index.html');
                        $("#sidepanel_log_out_flag").hide();
                        $("#sidepanel_log_flag").show();
                         $("#sidepanel_user_name").html("Hello Guest");
                         Client_Name="";
                        
                    },
                    error: function(){
                        alert('got an error');
                    }
                });
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


/******************* Signin / Signout / Forgot Password START *******************/

if (page.name === 'RVSign') {
    
$("#new_user").submit(function(e) {
    e.preventDefault();
    var $form = $(e.target);
    $.ajax({
    type: 'POST',
    url: $form.attr('action'),
    data: $form.serialize(),
    success: function(data){
        myApp.alert("You have been successfully logged in",'');
      $$.get(curr_ip+'app_services/dashboard', function (client_data_ajax) {
          //console.log(client_data_ajax);
          var client_data=JSON.parse(client_data_ajax);
          //console.log(client_data.name);
          Client_Name=client_data.name;
          $("#sidepanel_user_name").html("Hello "+client_data.name);
          $("#sidepanel_log_out_flag").show();
          $("#sidepanel_log_flag").hide();

        });
      
      mainView.router.loadPage('DashboardIndex.html');
    },
    error: function(){
     myApp.alert("Invalid Email id or password",'');
     $("#error_msg").removeClass("d_none");      
    }
  });
 });
    $$('.ForgotPass').on('click', function () {
        myApp.prompt('Forgot your password ?', '', function (value) {
           
            if (value == '') { 
                myApp.alert('Enter some value','');
            }
            else {
                myApp.alert('"' + value + '" email not found','');
            }
           
        });
    });
    
}   

/******************* Signin / Signout / Forgot Password END *******************/

/******************************** Dashboard START ******************************/

if(page.name === 'DashboardIndex') {

    console.log(" inside DashboardIndex");
    
    // 3 Slides Per View, 10px Between
    var mySwiper3 = myApp.swiper('.swiper-DIndex', {
      pagination:'.swiper-DIndex .swiper-pagination',
      spaceBetween: 10,
      slidesPerView: 4
    });
    $$.get(curr_ip+'app_services/dashboard', function (client_data_ajax) {
      //console.log(client_data_ajax);
      var client_data=JSON.parse(client_data_ajax);
      // console.log(client_data);
      // console.log(client_data.client.length);
      $("#ClientName").html(client_data.name);
      var temp="<option value=''>Select an Investor</option>";
      for(var j=0;j<client_data.client.length;j++){
        // console.log(client_data.client[j].iin);
        var temp=temp+"<option value='"+client_data.client[j].iin+"'>"+client_data.client[j].inv_name+"</option>"
      }
        $('#client_name').html(temp);

    });
      $(".disclaimer").on("click", function() {
        
        if($('.disclaimer').html()==="Current Value"){
          $('.disclaimer').html("Amt. Invested");
           $("#mf_fund_table tbody tr td:nth-child(4)").hide();
            $("#mf_fund_table tbody tr td:nth-child(5)").show();
        }
        else if($('.disclaimer').html()==="Amt. Invested"){
          $('.disclaimer').html("Current Value");
          $("#mf_fund_table tbody tr td:nth-child(5)").hide();
               $("#mf_fund_table tbody tr td:nth-child(4)").show();
        }
      });



$("#client_name").change(function(){
      if($('#client_name').val()!="" ){
        console.log(client_name.value);
        var iin=client_name.value;

        $$.get(curr_ip+'dashboards/dashboard_update',{iin: iin,'fund' : 'All'},function (dashboards_data_ajax)
      {
        dashboards_data=JSON.parse(dashboards_data_ajax);
        console.log(dashboards_data);
        var tab_data=""
        var fund_name=[];
        var amt_invested=[];
        var curr_val=[];
        var gain_loss=[];
        var percent=[];
        var total_amt_invested=0;
        var total_curr_val=0;
        if(dashboards_data.trans_group.length===0)
        {
          $("#mf_fund_table tbody").html("<tr><td>-</td><td><span>-</span></td><td>-</td><td class='d_none'>-</td></tr>");
          $("#mf_total_table tbody").html("<tr><td>-</td><td>-</td><td>-</td></tr>");
        }
        else
        {
          for(var i=0;i<dashboards_data.trans_group[0].length;i++){
          fund_name[i]=dashboards_data.trans_group[0][i].s_name;
          amt_invested[i]=Math.round(dashboards_data.trans_group[0][i].COST_VALUE);
          curr_val[i]=Math.round(dashboards_data.trans_group[0][i].BALANCE_UNITS*dashboards_data.trans_group[0][i].navrs)
          gain_loss[i]=Math.round(curr_val[i]-amt_invested[i])
          percent[i]=((gain_loss[i]/amt_invested[i])*100).toFixed(2);
          fund_checkbox="<span><input type='checkbox' value='"+fund_name[i]+"'></span>"
          tab_data=tab_data+"<tr><td>"+fund_checkbox+"</td><td>"+fund_name[i]+"</td><td><span>"+gain_loss[i]+" (&#8377;)</span><h5> "+percent[i]+" %</h5></td><td>"+curr_val[i]+" (&#8377;)</td><td class='d_none'>"+amt_invested[i]+" (&#8377;)</td></tr>"
          total_amt_invested=total_amt_invested+amt_invested[i];
          total_curr_val=total_curr_val+curr_val[i];
        }
        $("#mf_fund_table tbody").html(tab_data);
        var total_gain_loss=(total_curr_val-total_amt_invested);
        var tab_data_1="<tr><td>"+total_amt_invested+"</td><td>"+total_curr_val+"</td><td>"+total_gain_loss+"</td></tr>"
        $("#mf_total_table tbody").html(tab_data_1);
        }

        var sip_fund_name="";
        var sip_amt=0;
        var sip_date="";
        var sip_frequency="";
        var tab_data_sip=""
        if(dashboards_data.sip_transactions.length===0){
          $("#mf_sip_table tbody").html("<tr><td>-</td><td>-</td><td>-</td><td></td></tr>");
        }
        else{
          for(var i=0;i<dashboards_data.sip_transactions[0].length;i++){
            sip_fund_name=dashboards_data.sip_transactions[0][i].s_name;
            sip_amt=dashboards_data.sip_transactions[0][i].AMOUNT;
            sip_date=dashboards_data.sip_transactions[0][i].INSTDATE;
            // sip_frequency=dashboards_data.sip_transactions[0][i].FREQUENCY;
            sip_cease_id=dashboards_data.sip_transactions[0][i].AUTO_TRXN_NO+"_SIP_"+iin+"_"+dashboards_data.sip_transactions[0][i].id
            sip_cease_button="<button id='"+sip_cease_id+"'>Stop SIP</button>"
            tab_data_sip=tab_data_sip+"<tr><td>"+sip_fund_name+"</td><td>"+sip_amt+"</td><td>"+sip_date+"</td><td>"+sip_cease_button+"</td></tr>"

          }
          console.log(tab_data_sip);
          $("#mf_sip_table tbody").html(tab_data_sip);
        }
        


      });
         
      }
  });
      







}

/********************************* Dashboard END ******************************/

/**************************** Investor Profile START ******************************/

if(page.name === 'DashboardProfile') {
    
    // 3 Slides Per View, 10px Between
    var mySwiper3 = myApp.swiper('.swiper-DProfile', {
      pagination:'.swiper-DProfile .swiper-pagination',
      spaceBetween: 10,
      slidesPerView: 4
    });




  // $$.get(curr_ip+'app_services/complete_reg', function (client_data_ajax) {
  //   data=JSON.parse(client_data_ajax);
  //   console.log(data);
  //   console.log(data.clients[0].inv_name);
  //   var option_list_active="";
  //   var option_list_inactive="";
  //   for(var i=0;i<data.clients.length;i++)
  //   {
  //     if(data.clients[i].part_validation=="ready")
  //     {
  //         option_list_active=option_list_active+"<option value='"+data.clients[i].id+"'>"+data.clients[i].inv_name+"</option>"
  //     }
  //     else
  //     {
  //       option_list_inactive=option_list_inactive+"<option value='"+data.clients[i].id+"'>"+data.clients[i].inv_name+"</option>"
  //     }
  //   }
  //   $("#client_name_active").html(option_list_active);
  //   $("#client_name_inactive").html(option_list_inactive);

  //   $("#client_name_active").change(function(){
  //     console.log("Hi");
  //   });


  // });

   $$.get(curr_ip+'app_services/investor_profile', function (client_data_ajax) {
     data=JSON.parse(client_data_ajax);
      console.log(data);
      if (data.status==="OK"){
        var option_list_active="<option value=''>Select an investor</option>";
        // var full_dtls_client="";
        for(var i=0;i<data.clients_active.length;i++)
        {
          option_list_active=option_list_active+"<option value='"+data.clients_active[i].iin+"'>"+data.clients_active[i].inv_name+"</option>";
          // full_dtls_client=full_dtls_client+"<div class='s_none' id='"+data.clients_active[i].id+"'>"+data.clients_active[i].inv_name+"</div>";
        }
        // console.log(full_dtls_client);
        $("#client_name_active").html(option_list_active);
         // $("#full_dtls").html(full_dtls_client);    
      }

       
   });

   $("#client_name_active").change(function(){
      var iin=client_name_active.value;
      console.log(iin);
       // $("#full_dtls1").hide();
      if(iin=="")
      {
        $("#full_dtls1").hide();
      }
      else
      {
        $$.get(curr_ip+'app_services/investor_iin', {iin: iin} ,function (client_all_data_ajax) 
         {
            client_all_data=JSON.parse(client_all_data_ajax);
            console.log(client_all_data);
            if(client_all_data.status==="OK")
            {
              $("#full_dtls1").show();
              $("#dash_inv_name").html(client_all_data.clients.inv_name);
              var client_dob=new Date(client_all_data.clients.dob);
              var client_dob_month=client_dob.getMonth()+1;
              client_dob=client_dob.getDate()+"/"+client_dob_month+"/"+client_dob.getFullYear();
              $("#dash_inv_dob").html(client_dob);
              $("#dash_inv_mob").html(client_all_data.clients.mobile_no);
              var client_addr="";
              client_addr=client_all_data.clients.addr1;
              if(client_all_data.clients.addr2!="" && client_all_data.clients.addr2!=null){
                client_addr=client_addr+", "+client_all_data.clients.addr2;
              }
              if(client_all_data.clients.addr3!="" && client_all_data.clients.addr3!=null){
                client_addr=client_addr+", "+client_all_data.clients.addr3;
              }
              $("#dash_inv_addr").html(client_addr);
              $("#dash_inv_city").html(client_all_data.clients.city);
              if(client_all_data.clients.state==client_all_data.state_tmp.STATE_CODE){
              $("#dash_inv_state").html(client_all_data.state_tmp.STATE_NAME);
              }
              $("#dash_inv_pin").html(client_all_data.clients.pincode);
              if(client_all_data.clients.country==client_all_data.country_tmp.COUNTRY_CODE){
                $("#dash_inv_country").html(client_all_data.country_tmp.COUNTRY_NAME);
              }
              
              $("#dash_inv_pan").html(client_all_data.clients.pan);
              $("#dash_inv_kyc").html(client_all_data.clients.kyc);
              $("#dash_inv_email").html(client_all_data.clients.email);
              if(client_all_data.clients.nominee1_name=="" || client_all_data.clients.nominee1_name==null)
              {
                    $("#nominee_dtls").hide();
                    $("#no_nominee_dtls").show();
              }
              else
              {
                $("#nominee_dtls").show();
                  $("#no_nominee_dtls").hide();
                $("#dash_nom_name").html(client_all_data.clients.nominee1_name);
                var client_nom_addr="";
                client_nom_addr=client_all_data.clients.nominee1_addr1;
                if(client_all_data.clients.nominee1_addr2!="" && client_all_data.clients.nominee1_addr2!=null){
                client_nom_addr=client_nom_addr+","+client_all_data.clients.nominee1_addr2;
                }
                if(client_all_data.clients.nominee1_addr3!="" && client_all_data.clients.nominee1_addr3!=null){
                  client_nom_addr=client_nom_addr+","+client_all_data.clients.nominee1_addr3;
                }
                $("#dash_nom_addr").html(client_nom_addr);
                $("#dash_nom_city").html(client_all_data.clients.nominee1_city);
                if(client_all_data.clients.nominee1_state==client_all_data.state_tmp_nominee.STATE_CODE){
                $("#dash_nom_state").html(client_all_data.state_tmp_nominee.STATE_NAME);
                }
                $("#dash_nom_pin").html(client_all_data.clients.nominee1_pincode);
              }
              $("#all_bank_dtls").html("");
              for(var i=0;i<client_all_data.additional_bank.length;i++)
              {
                var acc_no="";
                var bank_name="";
                var acc_type="";
                var ifsc_code="";
                var status="";
                var default_bank="";
                 acc_no="<p>Account No: "+client_all_data.additional_bank[i].acc_no+"</p>";
                if(client_all_data.additional_bank[i].bank_name==client_all_data.bnk_tmp[i].BANK_CODE)
                {
                  bank_name="<p>Bank Name: "+client_all_data.bnk_tmp[i].BANK_NAME+"</p>";      
                }                
                if(client_all_data.additional_bank[i].acc_type==client_all_data.cc_tmp.ACC_TYPE)
                {
                  acc_type="<p>Account Type: "+client_all_data.cc_tmp.DESCRIPTION+"</p>";
                }
                ifsc_code="<p>IFSC Code: "+client_all_data.additional_bank[i].ifsc_code+"</p>";
                status="<p>Status: "+client_all_data.additional_bank[i].status+"</p>";
                if(client_all_data.additional_bank[i].default_bank=="Y"){
                  default_bank="<label class='label-checkbox item-content'><div class = 'item-inner'><p class = 'item-title'>Default: <input type='checkbox' name='ks-checkbox' value='"+client_all_data.additional_bank[i].acc_no+"' id='"+client_all_data.additional_bank[i].acc_no+"_"+client_all_data.additional_bank[i].ifsc_code+"' checked><span class='item-media'><i class='icon icon-form-checkbox'></i></span></p></div></label>";
                }
                else if(client_all_data.additional_bank[i].default_bank=="N"){
                  default_bank="<label class='label-checkbox item-content'><div class = 'item-inner'><p class = 'item-title'>Default: <input type='checkbox' name='ks-checkbox' value='"+client_all_data.additional_bank[i].acc_no+"' id='"+client_all_data.additional_bank[i].acc_no+"_"+client_all_data.additional_bank[i].ifsc_code+"'><span class='item-media'><i class='icon icon-form-checkbox'></i></span></p></div></label>";
                }
  
                $("#all_bank_dtls").append("<div class=''><div class='alert alert-success'>"+acc_no+bank_name+acc_type+ifsc_code+status+default_bank+"</div></div>")

              }

              $("#dash_inv_iin").html(client_all_data.clients.iin);
              $('#dash_inv_dp').html(client_all_data.clients.dp_id);

              $("#all_otm_dtls").html("");
              if(client_all_data.umrn_lst_accepted[0].length==0){
                $("#all_otm_dtls").html("<div class=''><div class='alert alert-success'>No OTM Details Available</div></div>");
              }
              else{
                for (var i=0;i<client_all_data.umrn_lst_accepted[0].length;i++)
                {
                  var bank_name_1="";
                  var otm_no="";
                  var mandate_amt="";
                  bank_name="<p>BANK NAME: "+client_all_data.umrn_lst_accepted[0][i].BANK_NAME+"</p>";
                  otm_no="<p>OTM NO: "+client_all_data.umrn_lst_accepted[0][i].UMRN_NO+"</p>";
                  mandate_amt="<p>MANDATE AMOUNT: "+client_all_data.umrn_lst_accepted[0][i].AMOUNT+"</P>";

                  $("#all_otm_dtls").append("<div class=''><div class='alert alert-success'>"+bank_name+otm_no+mandate_amt+"</div></div>")
                }
              }
            }
        
         });
      }
         

   });




}

/**************************** Investor Profile END ******************************/

/************************** Transaction Status START ***************************/

if(page.name === 'DashboardTransStatus') {
    
    // 3 Slides Per View, 10px Between
    var mySwiper3 = myApp.swiper('.swiper-DTrans', {
      pagination:'.swiper-DTrans .swiper-pagination',
      spaceBetween: 10,
      slidesPerView: 4
    });

     $$.get(curr_ip+'app_services/investor_profile', function (client_data_ajax) {
     data=JSON.parse(client_data_ajax);
      console.log(data);
      if (data.status==="OK"){
        var option_list_active="<option value=''>Select an investor</option>";

        for(var i=0;i<data.clients_active.length;i++)
        {
          option_list_active=option_list_active+"<option value='"+data.clients_active[i].iin+"'>"+data.clients_active[i].inv_name+"</option>"
        }
        $("#client_name").html(option_list_active);
  
      }
       
   });


     $("#client_name").change(function(){
         var iin=client_name.value;
         console.log("-----")
         $$.get(curr_ip+'dashboards/transaction_calculation',{iin : iin, flag :1},function (trans_data_ajax) {
          data=JSON.parse(trans_data_ajax);
          console.log("--------")
          console.log(data.info);
          console.log("----------");
          var payment_ref_no="";
          var fund_name="";
          var trans_date="";
          var trans_amount="";
          var trans_unit="";
          var trans_type="";
          var trans_status="";
          var total_div="";
          for( var i=0;i<data.info.length;i++)
          {
            payment_ref_no=data.info[i].unique_no;
            fund_name=data.info[i].s_name;
            trans_date=data.info[i].date_of_trxn_request;
            if(data.info[i].amt!=null)
            {
              trans_amount=data.info[i].amt+" (&#8377;)";
            }
            else if(data.info[i].units!=null)
            {
              trans_amount=data.info[i].units+" (Units)";
            }
            else
            {
              trans_amount=0;
            }
            trans_type=data.info[i].trxn_type;
            trans_status=data.info[i].trxn_status;
            alert_head="<div class='row alert_head'><div class='col-xs-8'><h6>Payment Ref. No. : "+payment_ref_no+"</h6></div><div class='col-xs-4'><h6>"+trans_date+"</h6></div></div>"
            alert_body="<div class='row alert_content'><div class='col-xs-8'><p>"+fund_name+"</p></div><div class='col-xs-4'><h6>"+trans_amount+"</h6><h6>"+trans_type+"</h6></div></div>"
            alert_footer="<div class='row alert_footer'><div class='col-xs-12'><h6>Transaction Status: "+trans_status+"</h6></div></div>";
            total_div=total_div+"<div class='row'><div class='col-xs-12'><div class='alert alert-success'>"+alert_head+alert_body+alert_footer+"</div></div></div>";
            
          }
          $("#all_trans_data").html(total_div);

         });

     });



}

/************************** Transaction Status END ***************************/

/*************************** Saved Portfolio START ***************************/

if(page.name === 'DashboardSavedPort') {
    
    // 3 Slides Per View, 10px Between
    var mySwiper3 = myApp.swiper('.swiper-DPort', {
      pagination:'.swiper-DPort .swiper-pagination',
      spaceBetween: 10,
      slidesPerView: 4
    });
}

/*************************** Saved Portfolio END ***************************/

/************************* Schedule a pickup START ***************************/

if(page.name === 'DashboardSchedule') {
    
  // 3 Slides Per View, 10px Between
  var mySwiper3 = myApp.swiper('.swiper-DSchedule', {
    pagination:'.swiper-DSchedule .swiper-pagination',
    spaceBetween: 10,
    slidesPerView: 4
  });

  $$.get(curr_ip+'app_services/fedex_form', function (Scheduledata) 
  {

      $('#submit_btn').prop( "disabled", true ); 
      $("#info").hide();
      $("#no_of_pieces").hide();
      $("#wait1").hide();


      var schedule_data = JSON.parse(Scheduledata);
      console.log(schedule_data);

      for (var j = 0; j< schedule_data.clients.length ; j++) {

        investor_name = schedule_data.clients[j].inv_name;
        console.log(investor_name);
        $("#client_name").append("<option value = "+schedule_data.clients[j].id+">"+investor_name+"</option>");

      }



 $('#client_name').change(function()   ///for normal transaction 
 {
var id=$('#client_name').val();
if(id=="")
{
$("#fedex_desc").show();
 $('#info').hide();
 }
 else
  $("#fedex_desc").hide();
$("#no_of_pieces").hide();
$("#addr1").val("");
$("#addr2").val("");

 $('#date_availability').prop( "disabled", false ); 

var id=$('#client_name').val();

$("#result_submit").hide();
 
$("#cl_id").val(id);

    $('.form-group').find('small.help-block').hide();
   
     $('.form-group').find('i.form-control-feedback').hide();
     $('.form-group').removeClass('has-error has-feedback');
 
      
    if (id.length!=0)
    {  
         $.ajax({
         type: 'GET',
         url: curr_ip+'dashboards/client_populate',
         dataType: 'json',
         data: { 'id' : id},
         success: function(data)
           {         
               var i=0;
               var row="";               
               console.log(data);               

              if( data.details.tax_status!="21" && data.details.tax_status!="26" && data.details.tax_status!="27" && data.details.tax_status!="11"&& data.details.tax_status!="28" )
              {
                $("#nri_investor").hide();
             $("#count").val(data.cancel.length);
             console.log(data.cancel[0].name)
             if(data.cancel=="no")
             {
                $("#cancel_pickup").hide();
               $('#info').show();
             }
            else
            {
              $('#info').hide();
              $("#cancel_pickup").show();
               // $("#sel_fund_list").empty();
                $("#cancel_pickup").empty();
            //   $('#c_name').val(data.cancel[i].name);
            // $('#c_addr').val(data.cancel[i].addr1);
            // $('#c_city').val(data.cancel[i].city);
            // $('#c_state').val(data.cancel[i].state);
            // $('#c_pincode').val(data.cancel[i].pincode);
            // $('#c_pick_up_date').val(data.cancel[i].pickup_time.slice(0,10));
            // $('#cli_id').val(data.cancel[i].id);
              
                    for(i=0;i<data.cancel.length;i++)
                    {
                      row=row+"<div class = 'list-block'><ul><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Name</div><div class = 'item-input'> <input type='text' name='c_name' id='c_name' class='form-control' value='"+data.cancel[i].name+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Address 1</div><div class = 'item-input'> <input type='text' name='c_addr' id='c_addr' class='form-control' value='"+data.cancel[i].addr1+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Address 2</div><div class = 'item-input'> <input type='text' name='c_addr2' id='c_addr2' class='form-control' value='"+data.cancel[i].addr2+"' readonly><h6>Address should not contain city name, state name and postal code and should not exceed 35 characters</h6></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Pincode</div><div class = 'item-input'> <input type='text' name='c_pincode' id='c_pincode' class='form-control' value='"+data.cancel[i].pincode+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>City</div><div class = 'item-input'> <input type='text' name='c_city' id='c_city' class='form-control' value='"+data.cancel[i].city+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>State</div><div class = 'item-input'> <input type='text' name='c_state' id='c_state' class='form-control' value='"+data.cancel[i].state+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Pick-up Date:</div><div class = 'item-input'> <input type='text' name='c_pick_up_date' id='c_pick_up_date' class='form-control' value='"+data.cancel[i].pickup_time.slice(0,10)+"' readonly> <input type='hidden' name='cli_id' id='cli_id' class='form-control' value='"+data.cancel[i].id+"' readonly></div></div></div></li></ul><div class='row'><div class='col-xs-12'> <button type='button' id='cancel' class='btn btn-RV cancel'>Cancel Pick Up</button><h6 id='can'>Please Wait.... Your request for cancelling the pickup is being processed</h6></div></div><div class='row'><div class='col-xs-12'><div id='c_confirm'></div></div></div></div>"
                    }
            
                    $("#cancel_pickup").append(row);
                    $("#can").hide();
            
                    cancel_date=data.cancel[0].pickup_time;
                }
           
                $("#q_info").hide();
                $('#time_info').hide();
                
                
                $('#name').val(data.details.inv_name);
                
                $('#city').val(data.details.city);
                $('#state').val(data.state.STATE_NAME);
                $('#pincode').val(data.details.pincode);
                $('#country').val(data.country.COUNTRY_NAME);
                $('#mobile_no').val(data.details.mobile_no);
                $('#email').val(data.details.email);
            
              }
              else
              {
                $("#nri_investor").show();
                $("#cancel_pickup").hide();
                $('#info').hide();
              }
           }
         });
      }
   });





$('#date_availability').click(function() {
    address=$("#addr1").val();
    address1=$("#addr2").val();
    pincode=$("#pincode").val();
    city=$("#city").val();
    state=$("#state").val();
    mobile_no=$("#mobile_no").val();
    email=$("#email").val();
    country=$("#country").val();
    name=$("#name").val();
    if (name=="")
      myApp.alert("Please enter your name",'');
    else if(address=="")
      myApp.alert("Please enter your address",'');
    else if(address.length>35)
      myApp.alert("Address1 should not exceed 35 characters",'');
    else if(address1.length>35)
      myApp.alert("Address2 should not exceed 35 characters",'');
    else if(city=="")
      myApp.alert("Please enter your city",'');
    else if(state=="")
      myApp.alert("Please enter your state",'');
    else if(pincode=="")
      myApp.alert("Please enter your pincode",'');
    else if(country=="")
      myApp.alert("Please enter your country",'');
    else if(mobile_no=="")
      myApp.alert("Please enter your mobile_no",'');
    else if(email=="")
      myApp.alert("Please enter your email",'');
    
    else
    {
      $('#addr1 .validtor').removeClass('has-error has-feedback');
      $('#addr2 .validtor').removeClass('has-error has-feedback');
      $('#pincode .validtor').removeClass('has-error has-feedback');
      $('#city .validtor').removeClass('has-error has-feedback');
      $('#state .validtor').removeClass('has-error has-feedback');
      $('#mobile_no .validtor').removeClass('has-error has-feedback');
      $('#email .validtor').removeClass('has-error has-feedback');
      $('#country .validtor').removeClass('has-error has-feedback');
      $('#name .validtor').removeClass('has-error has-feedback');
      $("#wait1").show();
      $('#date_availability').prop( "disabled", true ); 
      var addr=$("#addr1").val()+"@"+$("#pincode").val()

      $.ajax({
              url: curr_ip+"dashboards/fedex_pickup_availability",
              dataType: "text",
              type: 'GET',
              data: {
                   'addr' : addr
              },
              success: function(data) {
                                   
                  console.log(data);
                        if (data!="Pickup is not available in this pincode." && data !="Fedex server not reachable. Please Try after Some Time")
                        {
                            var i;
                            result=data;
                            $("#wait1").hide();
                            $('#q_info').show();
                            $('#no_of_pieces').hide();
                            $("#time").hide();
                            $("#date").empty();
                            var array_frequencies = data.split("/");
                            console.log(array_frequencies[0])
                            var d = new Date(); // for now
                            d.getHours(); // => 9
                            console.log( d.getHours());
                            var t=array_frequencies[1].split(':')
                            console.log(t[0])
                            // d.getMinutes(); // =>  30
                            // d.getSeconds()    
                            var tras_freq = "<div class = 'list-block'><ul><li class = 'item-content'><div class = 'item-input'><select id='date_avail' name='date_avail'>"
                            tras_freq=tras_freq+"<option>Select</option>"
                            if(d.getHours()<(t[0]-2))
                            {
                              for (i=0;i<array_frequencies.length-10;i=i+2)
                              {

                               tras_freq=tras_freq+"<option value="+array_frequencies[i]+">"+moment(array_frequencies[i]).format('DD-MMM-YY')+"</option>"
                              }
                             tras_freq=tras_freq+"</select></div></li></ul></div>"
                           }
                           else
                           {
                            for (i=2;i<array_frequencies.length-10;i=i+2)
                              {
                               tras_freq=tras_freq+"<option value="+array_frequencies[i]+">"+moment(array_frequencies[i]).format('DD-MMM-YY')+"</option>"
                              }
                             tras_freq=tras_freq+"</select></div></li></ul></div>"
                           }
                           
                             $("#date").append(tras_freq)
                            
                            // $.each(array_frequencies, function( index, value ) 
                            // {
                            //   console.log(value);
                            // })
                             $("#cust_tansid").val(array_frequencies[array_frequencies.length-1])
                              // $('#submit_btn').prop( "disabled", true ); 
                            }
                            else
                              {
                              $("#wait1").hide();
                              myApp.alert(data,'');
                              $('#date_availability').prop( "disabled", false ); 
                            }
                  // console.log(data);
                  
                  
              }
          });
    }
});

$("#date").change(function()   ///for normal transaction 
{
  // alert("dsadsd");
  var date=$("#date_avail").val();
   // alert(date);
   var date1=date+"/"+$('#client_name').val()
   
  // d1=date.split('/')
  $("#pickup_time").val(date)
  // alert(result)
  var array_frequencies = result.split("/");
  for (var i=0;i<array_frequencies.length;i++)
  {
    if(array_frequencies[i]==date)
    {
      var time=array_frequencies[i+1]
      var t=time.split(":")
      a=parseInt(t[0])-2
      
      $("#cut_off_time").val(a.toString()+":"+t[1]+":"+t[2]);
      // alert(time);
       $.ajax({
                    url: curr_ip+"dashboards/cross_check",
                    dataType: "text",
                    type: 'GET',
                    data: {
                         'date1' : date1
                    },
                    success: function(data) {
                       
                        console.log(data);
                        if (data=="yes")
                          {
                            myApp.alert("You have already done a schedule on that day. Choose another date",'');
                        // $('#submit_btn').prop( "disabled", true ); 
                      }
                      else
                        { $("#time").show(); 
                          $('#no_of_pieces').show();
                          $("#wait").hide();
                         $('#submit_btn').prop( "disabled", false ); 
                        }}});
      return
    }
  }
  // $("#cut_off__time").val(d1[1])
  // $('#time_info').show();
});

$("#cancel_pickup").on('click','.cancel',function(){
       // debugger;
  // var id= $(this.parentElement.parentElement.parentElement.parentElement.childNodes[7]).val();
  var id=$("#cli_id").val();
// $('#cancel').click(function() {
  // var cancel_info=$(this.parentElement.parentElement.parentElement.parentElement.childNodes[9].children[0].children[0].children[0]);
  // cancel_info=cancel_info.empty();
  // var submit=$(this.parentElement.children[0]);
  // var can_req=$(this.parentElement.children[1]);
  // alert(cancel_info);
  $("#can").show();
  // var id=$('#cl_id').val()+"/"+cancel_date;
  console.log(id);
  // console.log($('#c_pick_up_date').val());
   $("#cancel").prop( "disabled", true ); 
  $.ajax({
                    url: curr_ip+"dashboards/fedex_cancel_pickup",
                    dataType: "text",
                    type: 'GET',
                    data: {
                         'id' : id
                    },
                    success: function(data) {
                       
                        console.log(data);
                        if (data=="Cancelled")
                          {
                            // cancel_info.append("Successfully cancelled the pickup");
                            $("#info").show();
                            $("#result_submit").show();
                            $("#result_submit").text("Successfully cancelled the pickup");
                            myApp.alert("Successfully cancelled the pickup",'');
                            $("#cancel_pickup").hide();
                            $("#q_info").hide();
                            $("#no_of_pieces").hide();
                            $('#time_info').hide();
                            $('#date_availability').prop( "disabled", false ); 
                        // submit.prop( "disabled", true ); 
                      }
                        else
                        {
                          $("#can").text(data);
                          $("#cancel_pickup").show();
                          $("#info").hide();
                          $("#q_info").hide();
                          $("#no_of_pieces").hide();
                          $('#time_info').hide();
                        }
                      }
                        //   cancel_info.append(data);
                        // can_req.hide();
                        
                      });
});

 $('#submit_btn').click(function() {
  
   // $("#form3").submit
   no_pieces=$("#no_pieces").val();
   if (no_pieces =="")
   {
      myApp.alert("Please enter the number of forms in a package",'');
   }
   else
   {
     $("#wait").show();
     $('#submit_btn').prop( "disabled", true ); 
     $.ajax({
                    url: curr_ip+"dashboards/fedex_create_pickup",
                    dataType: "text",
                    type: 'GET',
                    data: {
                         'name' : $("#name").val(), 'mobile_no':$("#mobile_no").val(), 'email':$("#email").val(), 'addr1':$("#addr1").val(), 'addr2':$("#addr2").val(), 'city': $("#city").val(), 'state':$("#state").val(), 'pincode':$("#pincode").val(), 'country':$("#country").val(), 'pickup_time':$("#pickup_time").val(), 'cut_off_time':$("#cut_off_time").val(), 'cl_id':$("#cl_id").val(), 'no_pieces':$("#no_pieces").val(), 'cust_tansid': $("#cust_tansid").val()
                    },
                    success: function(data) 
                    {
                       
                        console.log(data);
                        if(data=="Your Pick up has been suceessfully scheduled and an airway bill has been sent to your mail")
                        {
                          var result="Your Pick up has been successfully scheduled. An email has been sent to your registered email id with all the details."
                          var id=$('#client_name').val();
                          myApp.alert(result,'');
                          $.ajax({
                             type: 'GET',
                             url: curr_ip+'dashboards/client_populate',
                             dataType: 'json',
                             data: { 'id' : id},
                             success: function(data)
                             {
                                 var i=0;
                                 var row="";
                                 console.log(data);
                                 $("#count").val(data.cancel.length);
                                 console.log(data.cancel[0].name)
                                 if(data.cancel=="no")
                                    $("#cancel_pickup").hide();
                                 else
                                 {
                                    $("#cancel_pickup").show();
                                    $("#cancel_pickup").empty();
                        
                                    for(i=0;i<data.cancel.length;i++)
                                    {
                                     row=row+"<div class = 'list-block'><ul><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Name</div><div class = 'item-input'> <input type='text' name='c_name' id='c_name' class='form-control' value='"+data.cancel[i].name+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Address 1</div><div class = 'item-input'> <input type='text' name='c_addr' id='c_addr' class='form-control' value='"+data.cancel[i].addr1+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Address 2</div><div class = 'item-input'> <input type='text' name='c_addr2' id='c_addr2' class='form-control' value='"+data.cancel[i].addr2+"' readonly><h6>Address should not contain city name, state name and postal code and should not exceed 35 characters</h6></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Pincode</div><div class = 'item-input'> <input type='text' name='c_pincode' id='c_pincode' class='form-control' value='"+data.cancel[i].pincode+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>City</div><div class = 'item-input'> <input type='text' name='c_city' id='c_city' class='form-control' value='"+data.cancel[i].city+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>State</div><div class = 'item-input'> <input type='text' name='c_state' id='c_state' class='form-control' value='"+data.cancel[i].state+"' readonly></div></div></div></li><li><div class = 'item-content'><div class = 'item-inner'><div class = 'item-title'>Pick-up Date:</div><div class = 'item-input'> <input type='text' name='c_pick_up_date' id='c_pick_up_date' class='form-control' value='"+data.cancel[i].pickup_time.slice(0,10)+"' readonly> <input type='hidden' name='cli_id' id='cli_id' class='form-control' value='"+data.cancel[i].id+"' readonly></div></div></div></li></ul><div class='row'><div class='col-xs-12'> <button type='button' id='cancel' class='btn btn-RV cancel'>Cancel Pick Up</button><h6 id='can'>Please Wait.... Your request for cancelling the pickup is being processed</h6></div></div><div class='row'><div class='col-xs-12'><div id='c_confirm'></div></div></div></div>"
                                  }
                           
                                  $("#cancel_pickup").append(row);
                                 
                                      $("#can").hide();
                                 
                                  
                                  cancel_date=data.cancel[0].pickup_time;
                               }
                               // $("#result_submit").show();
                               // $('#result_submit').text(result);
                               // alert(result);
                                $('#info').hide();
                                $("#q_info").hide();
                                $('#time_info').hide();
                             }
                          })
                        }
                  }
});
}
});






   


  });


}

/************************* Schedule a pickup END ***************************/

/************************* Investor Details START ***************************/

if(page.name === 'InvestInvestorDetails') {
    
    // 3 Slides Per View, 10px Between
    var mySwiper3 = myApp.swiper('.swiper-DInvest', {
      pagination:'.swiper-DInvest .swiper-pagination',
      spaceBetween: 10,
      slidesPerView: 4
    });
}

/************************* Investor Details END ***************************/

/***************************** About Us START ***************************/
if (page.name === 'about') {
    
}

/****************************** About Us END ***************************/

/******************************* FAQs START ****************************/

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
    
/****************************************** FAQs END **************************************/

/******************************* Fund Details / Overview START ****************************/
    
if(page.name === 'FundDetails')
{
  var query = $$.parseUrlQuery(page.url);
  var scheme_code=query.scheme_code;
  $$.get(curr_ip+'app_services/get_fund_info', {schemecode: +scheme_code},function (data) 
  {
    var scheme_data = JSON.parse(data);
    console.log(scheme_data);
    var scheme_item = scheme_data.schemedata[0];
    var min_sip_inv = "-";
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
    $("#minimum_investment").html(" &#8377; "+minimum_investment+" / "+min_sip_inv);
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
    $("#classification").html(classification);
    $("#growth").html(navrs_gp);
    $("#type").html(type);
    $("#exitload-modal").html(exitloadremarks);

    get_return_data(scheme_code);                 // Return (%)
    //test_graph(s_name,scheme_code);             // NAV Movement 
    asect_alloc(scheme_code);                     // Asset allocation 
    get_peer_comparision(scheme_code);            // peer comparison
    get_portfolio_holdings(scheme_code);          // portfolio holding
    get_hold_asset(scheme_code);                  // All Equity Debt chart table    
    get_status(scheme_code);                      // Status of open/close subscription

    // if (val_1=='True' && val_2=='True' && val_3=='True' && val_4=='True' && val_5=='True' && val_6=='True')
    // {
    //   $("#FundDetailsID .container").css('display','block');
    //   $("#FundDetailsID .fa.fa-spinner.fa-pulse").css('display','none');
    // }
    


    // Click on 1 Year in Return Table     

      $( "#FundDetailsID #return" ).on( "click", ".chng_return", function() {
    //$( document ).delegate("#FundDetailsID #return .chng_return", "click", function() {
      if($('#FundDetailsID #return .chng_return').html()==="3 Year"){
        console.log("remove 3 Year");
        console.log("show 5 Year");
        console.log("----------------------");
        $('#FundDetailsID #return .chng_return').html("5 Year");
        $("#FundDetailsID #return tbody tr td:nth-child(4)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(5)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(7)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(6)").show();
      }
      else if($('#FundDetailsID #return .chng_return').html()==="5 Year"){
        console.log("remove 5 Year");
        console.log("show 10 Year");
        console.log("----------------------");
        $('#FundDetailsID #return .chng_return').html("10 Year");
        $("#FundDetailsID #return tbody tr td:nth-child(4)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(5)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(6)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(7)").show();
      }
      else if($('#FundDetailsID #return .chng_return').html()==="10 Year"){
        console.log("remove 10 Year");
        console.log("show 1 Year");
        console.log("----------------------");
        $('#FundDetailsID #return .chng_return').html("1 Year");
        $("#FundDetailsID #return tbody tr td:nth-child(5)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(6)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(7)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(4)").show();
      }
      else if($('#FundDetailsID #return .chng_return').html()==="1 Year"){
        console.log("remove 1 Year");
        console.log("show 3 Year");
        console.log("----------------------");
        $('#FundDetailsID #return .chng_return').html("3 Year");
        $("#FundDetailsID #return tbody tr td:nth-child(4)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(6)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(7)").hide();
        $("#FundDetailsID #return tbody tr td:nth-child(5)").show();
      }      

    });


    // Click on 1 Year in Peer Comparison Table
    
      $( "#FundDetailsID #peertabl" ).on( "click", ".chng_peercomp", function() {
    
      if($('#FundDetailsID #peertabl .chng_peercomp').html()==="3&nbsp;Year"){
        console.log("remove 3 Year");
        console.log("show 5 Year");
        console.log("----------------------");
        $('#FundDetailsID #peertabl .chng_peercomp').html("5&nbsp;Year");
        $("#FundDetailsID #peertabl tbody tr td:nth-child(6)").hide();
        $("#FundDetailsID #peertabl tbody tr td:nth-child(7)").hide();
        $("#FundDetailsID #peertabl tbody tr td:nth-child(8)").show();
      }
      else if($('#FundDetailsID #peertabl .chng_peercomp').html()==="5&nbsp;Year"){
        console.log("remove 5 Year");
        console.log("show 1 Year");
        console.log("----------------------");
        $('#FundDetailsID #peertabl .chng_peercomp').html("1&nbsp;Year");
        $("#FundDetailsID #peertabl tbody tr td:nth-child(7)").hide();
        $("#FundDetailsID #peertabl tbody tr td:nth-child(8)").hide();
        $("#FundDetailsID #peertabl tbody tr td:nth-child(6)").show();
      }
      else if($('#FundDetailsID #peertabl .chng_peercomp').html()==="1&nbsp;Year"){
        console.log("remove 1 Year");
        console.log("show 3 Year");
        console.log("----------------------");
        $('#FundDetailsID #peertabl .chng_peercomp').html("3&nbsp;Year");
        $("#FundDetailsID #peertabl tbody tr td:nth-child(6)").hide();
        $("#FundDetailsID #peertabl tbody tr td:nth-child(8)").hide();
        $("#FundDetailsID #peertabl tbody tr td:nth-child(7)").show();
      }      

    });



  });


        
}


/*************************** Fund Details / Overview END ************************/   

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
            table_data_equity_lc=table_data_equity_lc+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.equity_lc[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.equity_lc[i].s_name+"</div></div></div></a></div>";
        }
        $$('#equity_large_tab div').html(table_data_equity_lc+"<h6 class='mf_as_on'></h6>");

        var table_data_equity_mc="";
        for (i = 0; i < myObj.equity_mc.length; i++) 
        {
            table_data_equity_mc=table_data_equity_mc+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.equity_mc[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.equity_mc[i].s_name+"</div></div></div></a></div>";
        }
        $$('#equity_multi_tab div').html(table_data_equity_mc+"<h6 class='mf_as_on'></h6>");

        var table_data_equity_msc="";
        for (i = 0; i < myObj.equity_msc.length; i++) 
        {
            table_data_equity_msc=table_data_equity_msc+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.equity_msc[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.equity_msc[i].s_name+"</div></div></div></a></div>";
        }
        $$('#equity_mid_small_tab div').html(table_data_equity_msc+"<h6 class='mf_as_on'></h6>");

        var table_data_equity_elss="";
        for (i = 0; i < myObj.elss.length; i++) 
        {
            table_data_equity_elss=table_data_equity_elss+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.elss[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.elss[i].s_name+"</div></div></div></a></div>";
        }
        $$('#equity_elss_tab div').html(table_data_equity_elss+"<h6 class='mf_as_on'></h6>");

        var table_data_debt_liq="";
        for (i = 0; i < myObj.debt_liq.length; i++) 
        {
            table_data_debt_liq=table_data_debt_liq+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.debt_liq[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.debt_liq[i].s_name+"</div></div></div></a></div>";
        }
        $$('#debt_liquid_tab div').html(table_data_debt_liq+"<h6 class='mf_as_on'></h6>");

        var table_data_debt_ust="";
        for (i = 0; i < myObj.debt_ust.length; i++) 
        {
            table_data_debt_ust=table_data_debt_ust+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.debt_ust[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.debt_ust[i].s_name+"</div></div></div></a></div>";
        }
        $$('#debt_ultra_short_tab div').html(table_data_debt_ust+"<h6 class='mf_as_on'></h6>");

        var table_data_debt_st="";
        for (i = 0; i < myObj.debt_st.length; i++) 
        {
            table_data_debt_st=table_data_debt_st+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.debt_st[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.debt_st[i].s_name+"</div></div></div></a></div>";
        }
        $$('#debt_short_tab div').html(table_data_debt_st+"<h6 class='mf_as_on'></h6>");

        var table_data_debt_m_lt="";
        for (i = 0; i < myObj.debt_m_lt.length; i++) 
        {
            table_data_debt_m_lt=table_data_debt_m_lt+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.debt_m_lt[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.debt_m_lt[i].s_name+"</div></div></div></a></div>";
        }
        $$('#debt_medium_long_tab div').html(table_data_debt_m_lt+"<h6 class='mf_as_on'></h6>");

        var table_data_hybrid_eo="";
        for (i = 0; i < myObj.hybrid_eo.length; i++) 
        {
            table_data_hybrid_eo=table_data_hybrid_eo+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.hybrid_eo[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.hybrid_eo[i].s_name+"</div></div></div></a></div>";
        }
        $$('#hybrid_equity_tab div').html(table_data_hybrid_eo+"<h6 class='mf_as_on'></h6>");

        var table_data_hybrid_do="";
        for (i = 0; i < myObj.hybrid_do.length; i++) 
        {
            table_data_hybrid_do=table_data_hybrid_do+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.hybrid_do[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.hybrid_do[i].s_name+"</div></div></div></a></div>";
        }
        $$('#hybrid_debt_tab div').html(table_data_hybrid_do+"<h6 class='mf_as_on'></h6>");

        var table_data_hybrid_arb="";
        for (i = 0; i < myObj.hybrid_arb.length; i++) 
        {
            table_data_hybrid_arb=table_data_hybrid_arb+"<div class='breadcrumb'><a href=FundDetails.html?scheme_code="+myObj.hybrid_arb[i].schemecode+" class=''><div class='row'><div class='col-xs-12'><div class='mf_name'>"+myObj.hybrid_arb[i].s_name+"</div></div></div></a></div>";
        }
        $$('#hybrid_arbitage_tab div').html(table_data_hybrid_arb+"<h6 class='mf_as_on'></h6>");

        $$('#equity_large_tab .mf_as_on, #equity_multi_tab .mf_as_on, #equity_mid_small_tab .mf_as_on, #debt_liquid_tab .mf_as_on, #debt_ultra_short_tab .mf_as_on, #debt_short_tab .mf_as_on, #debt_medium_long_tab .mf_as_on, #hybrid_equity_tab .mf_as_on, #hybrid_debt_tab .mf_as_on, #hybrid_arbitage_tab .mf_as_on').html("As on 01 Jan 2018");
        $$('#equity_elss_tab .mf_as_on').html("As on 01 Apr 2017");

    });
}

/****************** MF Home / Top Rated MF END ******************************/

/************* ToolsComparison / MF Comparison START ******************* */ 

if(page.name==='ToolsComparison')
{
    var array_id=[];
    var array_id1=[];
    var color_arr=['#2d94e7','#85c953','#a55fa9','#00C78C'];
    var query = $$.parseUrlQuery(page.url);
    console.log(page.url);
    var scheme_codes=query.scheme_codes;
    console.log(scheme_codes);
    var id="";
    if(scheme_codes==null)
    {      

       $$.get(curr_ip+'app_services/comparison',function (data) 
        {
          var myObjdata = JSON.parse(data);
          //console.log(myObjdata.s_code.split('-'));
          schemecode_array=myObjdata.s_code.split('-');
          for (var i=0;i<schemecode_array.length;i++){
            console.log(schemecode_array[i]);
            array_id.push(schemecode_array[i]);
            array_id1.push(schemecode_array[i]);
             $(".fund_head_"+i).removeClass("d_none");
          }
          generate_chart(array_id1,color_arr);
          compare_value(array_id);
          add_fundname_search();

        });
        
    }
    else
    {
      id=scheme_codes.split(',');
      for(var t=0;t<id.length;t++)
      {
        array_id1.push(id[t]);
        array_id.push(id[t]);
        $(".fund_head_"+t).removeClass("d_none");
      }
      generate_chart(array_id1,color_arr);
      compare_value(array_id);
      add_fundname_search();
    }

    $("#srch-term").autocomplete({

            select: function (a, b) 
            {
                console.log("aaa");
                console.log(b.item.value)
              $(this).val(b.item.value);
                $("#add_btn_search").click();
                $$.post(curr_ip+'/home/index_search',{schemename: b.item.value},function (data) {
                var scheme_code=JSON.parse(data);
                console.log(array_id.length)
                if (array_id.length>1) {
                  myApp.alert("You can add only 2 funds",'');                      
                }
                else if (array_id[0]==scheme_code.schemecode)
                {
                    myApp.alert("You have already added that fund",'')
                }
                else{
                  array_id.push(scheme_code.schemecode);
                  if (array_id[1]!=undefined) {
                    mainView.router.reloadPage('ToolsComparison.html?scheme_codes='+array_id[0]+','+array_id[1]);
                  } 
                  else{
                    mainView.router.reloadPage('ToolsComparison.html?scheme_codes='+array_id[0]);
                  };
                  
                }
                
            });                   

            }
       });

      $(".comparison_fund_inner_top.ct1 .close_image").click(function() 
       {
          array_id.splice(0, 1);
          if (array_id[0]!=undefined) 
          {
            mainView.router.reloadPage('ToolsComparison.html?scheme_codes='+array_id[0]);
          } 
          else
          {
            mainView.router.reloadPage('ToolsComparison.html');
          };
        })
       $(".comparison_fund_inner_top.ct2 .close_image").click(function() {
           array_id.pop();
            mainView.router.reloadPage('ToolsComparison.html?scheme_codes='+array_id[0]);
       })

       $(".close_image").click(function(){ 
            if(array_id.length>0)
            {
              generate_chart(array_id,color_arr);
            }
            else
            {
               $("#compare_chart").empty();                      
            }
     });
          
}

/************* ToolsComparison / MF Comparison END ******************** */ 

/*********************** SIP Return START ***********************************/

if(page.name==='ToolsSIPReturn')
{ 

  function getYesterdaysDate() {
      var date = new Date();
      date.setDate(date.getDate()-1);
      return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();    
  }

  function getFiveYearsAgoDate () {
       var date = new Date();
      date.setDate(date.getDate()-1);
      return (date.getMonth()+1) + '/' + date.getDate() + '/' + (date.getFullYear()-5);  
  }

  $("#from_date").val(getFiveYearsAgoDate());
  $("#to_date").val(getYesterdaysDate());

  
  $$.get(curr_ip+'app_services/sip_return', function (data) 
  {
      console.log("Inside Ajax");
      var data = JSON.parse(data);
      console.log(data);      

      var schemecode = data.selected_schemcode;
      var scheme_name = data.actual_fund_name.replace(/-/g,' ');
      
      $('#fund_names_sip').val(scheme_name);
      $('#full_url').val(data.full_url);
      $('#schemecode_selected').val(data.selected_schemcode);
      $('#fund_name_rec').val(data.fund_name);
      $('#fund_name_actual').val(data.actual_fund_name);

      var startDate = new Date(a+" GMT");
      var endDate = new Date(b+" GMT");
          startDate = moment(startDate).format('YYYY-MM-DD');
          endDate = moment(endDate).format('YYYY-MM-DD');
          console.log("+++++++++++++++++++++++++++++++");
          console.log(startDate); 
          console.log(endDate); 
          console.log("+++++++++++++++++++++++++++++++");
      test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);

    //debugger;
 });
      // function commaSeparateNumber(val){
      //   while (/(\d)(?=(\d\d)+\d$)/g.test(val.toString())){
      //     val = val.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
      //   }
      //   return val;
      // }    


      fundname_search_sip_return();
      
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


      var url = $('#full_url').val();
              


      $("#fund_names_sip").autocomplete({
        select: function (a, b) 
        {
            $(this).val(b.item.value); 
               
            $('#container-head').show();
            //debugger;

            var scheme_name = $('#fund_names_sip').val();
                scheme_name = scheme_name.replace(/-/g,' ');
                // debugger;
            var schemecode = map_sip[scheme_name];

            var frequency = $('#frequency :selected').text();
            var amount = $('#amt').val();
                amount=amount.replace(/,/g, '');
                //$('#amt').html(commaSeparateNumber(amount));                
                a=$('#from_date').val().replace(/-/g," ");
                b=$('#to_date').val().replace(/-/g," ");
            var startDate = new Date(a+" GMT");
            var endDate = new Date(b+" GMT");
                startDate = moment(startDate).format('YYYY-MM-DD');
                endDate = moment(endDate).format('YYYY-MM-DD');
                                        
            var scheme_name1 = $('#fund_names_sip').val();
            var url_fund_name;
                url_fund_name = scheme_name1.replace(/&/g,'');
                url_fund_name = url_fund_name.replace(/-/g,' ');
                url_fund_name = url_fund_name.replace(/'/g,'');
                url_fund_name = url_fund_name.replace("[",'(');
                url_fund_name = url_fund_name.replace("]",')');
                url_fund_name = url_fund_name.replace("<",'LT');
                url_fund_name = url_fund_name.replace(">",'Gt');
                url_fund_name = url_fund_name.replace("/",'');
                url_fund_name = url_fund_name.replace("‘",'');
                url_fund_name = url_fund_name.replace("'",'');
                url_fund_name = url_fund_name.replace("%",'');  // added 29.08.2017
                url_fund_name = url_fund_name.replace(/\./g,"");
                url_fund_name = url_fund_name.replace(/ *\([^)]*\) */g, "")
                
                url_fund_name = url_fund_name.trim().replace(/ /g,'-');
                      
                test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);

        }  

      });

      if(url=="ERROR")
      {
          
           // window.history.pushState('','','/Mutual-Fund-Calculator/Sip-Return/');
      }
      if(url!="NONE" && url!="ERROR")
      {
            
          $('#full_url').val("NONE"); 
          var schemecode =  $('#schemecode_selected').val();
          var amount = $('#amt').val();
              amount=amount.replace(/,/g, '');
              a=$('#from_date').val().replace(/-/g," ");
              b=$('#to_date').val().replace(/-/g," ");
          var startDate = new Date(a+" GMT");
          var endDate = new Date(b+" GMT");
              startDate = moment(startDate).format('YYYY-MM-DD');
              endDate = moment(endDate).format('YYYY-MM-DD');

          var frequency = $('#frequency :selected').text();
          var fund_name = $('#fund_name_rec').val();
              fund_name=fund_name.replace(/-/g,' ');

          test_graph_sip(fund_name,schemecode,"container-sip",amount,frequency,startDate,endDate);  
             
          $('#container-head').show();                            
          $('#fund_names_sip').val($("#fund_name_actual").val().replace(/-/g,' '));
          // window.history.pushState('','',url);
      }


      $("#frequency").change(function() 
      {
          // alert( $('option:selected', this).text() );

          if($('#fund_names_sip').val()!='' && $('#fund_names_sip').val()!='undefined')
          {
              var scheme_name = $('#fund_names_sip').val();
                  scheme_name = scheme_name.replace(/-/g,' ');
              var schemecode = map_sip[scheme_name];
              var frequency = $('#frequency :selected').text();
              var amount = $('#amt').val();
                  amount=amount.replace(/,/g, '');
                  a=$('#from_date').val().replace(/-/g," ");
                  b=$('#to_date').val().replace(/-/g," ");
              var startDate = new Date(a+" GMT");
              var endDate = new Date(b+" GMT");
                  startDate = moment(startDate).format('YYYY-MM-DD');
                  endDate = moment(endDate).format('YYYY-MM-DD');

              //test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);
          }
              
      });

              
      $('#amt').focusout(function() 
      {
          if($('#fund_names_sip').val()!='' && $('#fund_names_sip').val()!='undefined')
          {
              var scheme_name = $('#fund_names_sip').val();
                  scheme_name = scheme_name.replace(/-/g,' ');
              var schemecode = map_sip[scheme_name];
              var frequency = $('#frequency :selected').text();
              var amount = $('#amt').val();
                  amount=amount.replace(/,/g, '');
                  a=$('#from_date').val().replace(/-/g," ");
                  b=$('#to_date').val().replace(/-/g," ");
              var startDate = new Date(a+" GMT");
              var endDate = new Date(b+" GMT");
                  startDate = moment(startDate).format('YYYY-MM-DD');
                  endDate = moment(endDate).format('YYYY-MM-DD');

              //test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);
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
                var schemecode = map_sip[scheme_name];
                var frequency = $('#frequency :selected').text();
                var amount = $('#amt').val();
                    amount=amount.replace(/,/g, '');
                    a=$('#from_date').val().replace(/-/g," ");
                    b=$('#to_date').val().replace(/-/g," ");
                var startDate = new Date(a+" GMT");
                var endDate = new Date(b+" GMT");
                    startDate = moment(startDate).format('YYYY-MM-DD');
                    endDate = moment(endDate).format('YYYY-MM-DD');

               // test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);
            } 

          }
      });


      $$(document).on('click', '#SubmitSipRet', function(e){ 
          var scheme_name = $('#fund_names_sip').val();
              scheme_name = scheme_name.replace(/-/g,' ');
          var schemecode = map_sip[scheme_name];
          var frequency = $('#frequency :selected').text();
          var amount = $('#amt').val();
              amount=amount.replace(/,/g, '');
              a=$('#from_date').val().replace(/-/g," ");
              b=$('#to_date').val().replace(/-/g," ");
          var startDate = new Date(a+" GMT");
          var endDate = new Date(b+" GMT");
              startDate = moment(startDate).format('YYYY-MM-DD');
              endDate = moment(endDate).format('YYYY-MM-DD');
            
            //var myDate = new Date();
            if(startDate > endDate)
            {
              //myDate.setFullYear(myDate.getFullYear() - 1);
              alert("Start date can not be greater than End date");
              //$("#from_date").datepicker("update", myDate);
            }

          test_graph_sip(scheme_name,schemecode,"container-sip",amount,frequency,startDate,endDate);

      });


      var inner_flag=0;
      var from_date=0;
      var to_date=0;
      var choosedate ;
      var sec_flag_sts=0;

      $('#from_date').datepicker({
          format: 'dd MM, yyyy'       
      });

      $('#to_date').datepicker({
          format: 'dd MM, yyyy'
      });
 

//---------------------------- from_date Date picker ---------------------------------------

   var todayFD = new Date();
   var pickerInline = myApp.picker ({
      input: '#from_date',            
      toolbarTemplate:
         '<div class = "toolbar">' +
            '<div class = "toolbar-inner">' +
               '<div class = "left">' +
                  '<a href = "#" class = "link close-picker" id="FromDatePickerCancel"></a>' +
               '</div>' +
               
               '<div class = "right">' +
                  '<a href = "#" class="link close-picker" id="FromDatePickerDone">Done</a>' +
               '</div>' +
            '</div>' +
         '</div>',
      rotateEffect: true,
      value: [            
         todayFD.getMonth(),
         todayFD.getDate(), 
         todayFD.getFullYear()
      ],  
      onChange: function (picker, values, displayValues) {
         // var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();               
         // if (values[1] > daysInMonth) {
         //    picker.cols[1].setValue(daysInMonth);
         // }
      },            
      formatValue: function (p, values, displayValues) {
               return values[1] + ' ' + displayValues[0] + ', ' + values[2];
      },
      cols: [
         {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
         },               
         {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         },                             
         {
            values: (function () {
               var arr = [];
               for (var i = 1980; i <= todayFD.getFullYear(); i++) { arr.push(i); }
               return arr;
            })(),
         },
         {
            divider: true,
            content: '  '
         }
      ]
      //, 
      // onOpen: function (picker) { 
      //     picker.container.find('#FromDatePickerCancel').on('click', function () {                                   
      //      $("#from_date").val('');                 
      //     });
      // }

   });               

//---------------------------------------------------------------------------------------------

//---------------------------- to_date Date picker ---------------------------------------

   var todayTD = new Date();
   var pickerInline1 = myApp.picker ({
      input: '#to_date',
      toolbarTemplate:
         '<div class = "toolbar">' +
            '<div class = "toolbar-inner">' +
               '<div class = "left">' +
                  '<a href = "#" class = "link close-picker" id="ToDatePickerCancel"></a>' +
               '</div>' +
               
               '<div class = "right">' +
                  '<a href = "#" class="link close-picker" id="ToDatePickerDone">Done</a>' +
               '</div>' +
            '</div>' +
         '</div>',
      rotateEffect: true,
      value: [            
         todayTD.getMonth(),
         todayTD.getDate(), 
         todayTD.getFullYear()
      ],            
      onChange: function (picker, values, displayValues) {
         // var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();               
         // if (values[1] > daysInMonth) {
         //    picker.cols[1].setValue(daysInMonth);
         // }
      },            
      formatValue: function (p, values, displayValues) {
         return values[1] + ' ' + displayValues[0] + ', ' + values[2];
      },            
      cols: [
         {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
         },
         {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         },
         {
            values: (function () {
               var arr = [];
               for (var i = 1980; i <= todayTD.getFullYear(); i++) { arr.push(i); }
               return arr;
            })(),
         },
         {
            divider: true,
            content: '  '
         },
      ]
      // ,
      // onOpen: function (picker) { 
      //     picker.container.find('#ToDatePickerCancel').on('click', function () {                                   
      //      $("#to_date").val('');                 
      //     });
      // }

   });             

//---------------------------------------------------------------------------------------------

  
}

/*********************** SIP Return END ***********************************/

/*********************** Stocks Held START *********************************/
if(page.name==='ToolsStocksHeld')
{
    var global_date_hldr="";
    var stock_name =[];
    var map = {};    
    
    if($('#load_info').val()=="not_loaded")
    {   
      Load_stock_data_autocomplete();
      Load_stock_data_autocomplete_1();
      $('#load_info').val("loaded");
    } 
    
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
        

    function Load_stock_data_autocomplete()
    { 
      
      $$.get(curr_ip+'app_services/get_search_data_stock',function (data)       
      {    
          var myObj = JSON.parse(data);                    
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

          var table2mon_1 = data.month_name_1;
          var table2mon_2 = data.month_name_2;
          var table2mon_3 = data.month_name_3;
          var table2mon_4 = data.month_name_4;

          var th = "<table id='stock_ret_data' class='table table-bordered table-striped table-condensed FixedLayoutTable'> <thead><tr><th rowspan='2'>Fund Name</th ><th rowspan='2' >Fund Manager</th><th rowspan='2' class='perc_aum'>AUM (in ₹ cr)<h6><em>As on "+table2mon_1+"</em></h6></th><th rowspan='2'>% of AUM<h6><em>As on "+table2mon_1+"</em></h6></th><th colspan='1' class='StockChngMonths'>"+data.month_name_1+"</th><th colspan='1'>"+data.month_name_2+"</th><th colspan='1'>"+data.month_name_3+"</th><th colspan='1'>"+data.month_name_4+"</th></tr><tr><th>No. of Shares</th><th>No. of Shares</th><th>No. of Shares</th><th>No. of Shares</th></tr></thead>";
           
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
              tblData = th + "<tbody><tr>"+"<td>"+"<a target = '_blank' href='/Mutual-Funds-India/"+schemecode+"'>"+s_name+"</a>"+"</td>"+"<td>"+"<span id='fund_manager' onclick=setvalue_asset_temp('"+fund_manager_1+"','fund_manager')>"+fund_manager+"</span>"+"</td><td>"+aum+"</td>"+"<td>"+prcnt_aum+"</td>"+"<td>"+"<span class='pull-right'><span>"+mnth_1+"</span><span id='mon_1' class='"+mnth_1_cls+"'></span></span>"+"</td>"+"<td>"+"<span class='pull-right'><span>"+mnth_2+"</span><span id='mon_2' class='"+mnth_2_cls+"'></span></span>"+"</td>"+"<td>"+"<span class='pull-right'><span>"+mnth_3+"</span><span id='mon_3' class='"+mnth_3_cls+"'></span></span>"+"</td>"+"<td>"+"<span class='pull-right'><span>"+mnth_4+"</span><span id='mon_4' class='"+mnth_4_cls+"'></span></span>"+"</td></tr>"
            }
            else
            {          
              tblData = tblData + "<tr>"+"<td>"+"<a target = '_blank' href='/Mutual-Funds-India/"+schemecode+"'>"+s_name+"</a>"+"</td>"+"<td>"+"<span id='fund_manager' onclick=setvalue_asset_temp('"+fund_manager_1+"','fund_manager')>"+fund_manager+"</span>"+"</td><td>"+aum+"</td>"+"<td>"+prcnt_aum+"</td>"+"<td>"+"<span class='pull-right'><span>"+mnth_1+"</span><span id='mon_1' class='"+mnth_1_cls+"'></span></span>"+"</td>"+"<td>"+"<span class='pull-right'><span>"+mnth_2+"</span> <span id='mon_2' class='"+mnth_2_cls+"'></span></span>"+"</td>"+"<td>"+"<span class='pull-right'><span>"+mnth_3+"</span><span id='mon_3' class='"+mnth_3_cls+"'></span></span>"+"</td>"+"<td>"+"<span class='pull-right'><span>"+mnth_4+"</span><span id='mon_4' class='"+mnth_4_cls+"'></span></span>"+"</td></tr>"
            }
          }
                         
                     
                          
            tblData = tblData+"</tbody></table>"
                      
                       

            $('#stoct_ret_div').html("");
            $('#stoct_ret_div').html(tblData); 
            // $('#stock_ret_data').DataTable({
            //   "paging": false,
            //   "ordering": true,
            //   "info": true,
            //   "searching": true,"order": [[ 4, "desc" ]]
            // });
                                
                       
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



             // Click on Change in column for StockHeldMF 1st table      

            var table1mon_1 = $("#mon_1_head").html();
            var table1mon_2 = $("#mon_2_head").html();
            var table1mon_3 = $("#mon_3_head").html();
            var table1mon_4 = $("#mon_4_head").html();
            // console.log(table1mon_1);
            // console.log(table1mon_2);
            // console.log(table1mon_3);
            // console.log(table1mon_4);

            $( "#rv_stock #stock_summary" ).on( "click", ".StockChngMonth", function() {
          
              if($('#rv_stock #stock_summary .StockChngMonth').html()=== table1mon_1 ){                
                
                $('#rv_stock #stock_summary .StockChngMonth').html(table1mon_2);
                $("#rv_stock #stock_summary tbody tr td:nth-child(3)").hide();            
                $("#rv_stock #stock_summary tbody tr td:nth-child(5)").hide();
                $("#rv_stock #stock_summary tbody tr td:nth-child(6)").hide();            
                $("#rv_stock #stock_summary tbody tr td:nth-child(4)").show();
              }
              else if($('#rv_stock #stock_summary .StockChngMonth').html()=== table1mon_2 ){                
                
                $('#rv_stock #stock_summary .StockChngMonth').html(table1mon_3);
                $("#rv_stock #stock_summary tbody tr td:nth-child(3)").hide();            
                $("#rv_stock #stock_summary tbody tr td:nth-child(4)").hide();
                $("#rv_stock #stock_summary tbody tr td:nth-child(6)").hide();            
                $("#rv_stock #stock_summary tbody tr td:nth-child(5)").show();
              }
              else if($('#rv_stock #stock_summary .StockChngMonth').html()=== table1mon_3 ){                
                
                $('#rv_stock #stock_summary .StockChngMonth').html(table1mon_4);
                $("#rv_stock #stock_summary tbody tr td:nth-child(3)").hide();            
                $("#rv_stock #stock_summary tbody tr td:nth-child(4)").hide();
                $("#rv_stock #stock_summary tbody tr td:nth-child(5)").hide();            
                $("#rv_stock #stock_summary tbody tr td:nth-child(6)").show();
              }
              else if($('#rv_stock #stock_summary .StockChngMonth').html()=== table1mon_4 ){                
                
                $('#rv_stock #stock_summary .StockChngMonth').html(table1mon_1);
                $("#rv_stock #stock_summary tbody tr td:nth-child(4)").hide();            
                $("#rv_stock #stock_summary tbody tr td:nth-child(5)").hide();
                $("#rv_stock #stock_summary tbody tr td:nth-child(6)").hide();            
                $("#rv_stock #stock_summary tbody tr td:nth-child(3)").show();
              }            

            });

            // Click on Change in column for StockHeldMF 2nd table  (AUM change)
          
            $( "#rv_stock #stock_ret_data" ).on( "click", ".perc_aum", function() {
          
              if($('#rv_stock #stock_ret_data .perc_aum').html()==="AUM (in ₹ cr)<h6><em>As on "+table2mon_1+"</em></h6>"){
                
                $('#rv_stock #stock_ret_data .perc_aum').html("% of AUM<h6><em>As on "+table2mon_1+"</em></h6>");
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(3)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(4)").show();
              }
              else if($('#rv_stock #stock_ret_data .perc_aum').html()==="% of AUM<h6><em>As on "+table2mon_1+"</em></h6>"){
                
                $('#rv_stock #stock_ret_data .perc_aum').html("AUM (in ₹ cr)<h6><em>As on "+table2mon_1+"</em></h6>");
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(4)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(3)").show();
              }              

            });

            // Click on Change in column for StockHeldMF 2nd table (Month change)  

            
            
            $( "#rv_stock #stock_ret_data" ).on( "click", ".StockChngMonths", function() {
          
              if($('#rv_stock #stock_ret_data .StockChngMonths').html()=== table2mon_1 ){                
                
                $('#rv_stock #stock_ret_data .StockChngMonths').html(table2mon_2);
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(5)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(7)").hide();
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(8)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(6)").show();
              }
              else if($('#rv_stock #stock_ret_data .StockChngMonths').html()=== table2mon_2 ){                
                
                $('#rv_stock #stock_ret_data .StockChngMonths').html(table2mon_3);
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(5)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(6)").hide();
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(8)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(7)").show();
              }
              else if($('#rv_stock #stock_ret_data .StockChngMonths').html()=== table2mon_3 ){                
                
                $('#rv_stock #stock_ret_data .StockChngMonths').html(table2mon_4);
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(5)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(6)").hide();
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(7)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(8)").show();
              }
              else if($('#rv_stock #stock_ret_data .StockChngMonths').html()=== table2mon_4 ){                
                
                $('#rv_stock #stock_ret_data .StockChngMonths').html(table2mon_1);
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(6)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(7)").hide();
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(8)").hide();            
                $("#rv_stock #stock_ret_data tbody tr td:nth-child(5)").show();
              }            

            });




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
        var th ="<thead><tr><th>Stock Name</th><th class='sec_classific'>Sector</th><th>Classification</th><th>Month</th><th class='qty_val_change'>Net Qty Bought</th><th>Approx. Buy Value (In ₹ cr)</th></tr></thead><tbody>";
                     
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

        // $('#stock_price_compare').DataTable({
        //     "paging": false,
        //     "ordering": true,
        //     "info": true,
        //     "searching": true,"order": [[ 5, "desc" ]]
        // });


        $('#tot_price_all').text(commaSeparateNumber(total_price.toFixed(2)));
        $('#tot_count_all').text(tot_count);
                       
                    
        tot_count=0;
        total_price=0; 
                   
        var th_1 ="<thead><tr><th>Stock Name</th><th class='sec_classific_1'>Sector</th><th>Classification</th><th>Month</th><th class='qty_val_change_1'>Net Qty Sold</th><th>Approx. Sell Value (In ₹ cr)</th></tr></thead><tbody>";
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

        // $('#stock_price_compare_1').DataTable({
        //     "paging": false,
        //     "ordering": true,
        //     "info": true,
        //     "searching": true,"order": [[ 5, "desc" ]]
        // });

        $('#tot_price_all_1').text(commaSeparateNumber(total_price.toFixed(2)));
        $('#tot_count_all_1').text(tot_count);


      

        // Click on Change in table column for StocksAttractingFundManagers  
      
        $( "#rv_stock #stock_price_compare" ).on( "click", ".sec_classific", function() {
      
          if($('#rv_stock #stock_price_compare .sec_classific').html()==="Classification"){
            
            $('#rv_stock #stock_price_compare .sec_classific').html("Sector");
            $("#rv_stock #stock_price_compare tbody tr td:nth-child(3)").hide();            
            $("#rv_stock #stock_price_compare tbody tr td:nth-child(2)").show();
          }
          else if($('#rv_stock #stock_price_compare .sec_classific').html()==="Sector"){
            
            $('#rv_stock #stock_price_compare .sec_classific').html("Classification");
            $("#rv_stock #stock_price_compare tbody tr td:nth-child(2)").hide();            
            $("#rv_stock #stock_price_compare tbody tr td:nth-child(3)").show();
          }              

        });

        $( "#rv_stock #stock_price_compare" ).on( "click", ".qty_val_change", function() {
      
          if($('#rv_stock #stock_price_compare .qty_val_change').html()==="Net Qty Bought"){

            $('#rv_stock #stock_price_compare .qty_val_change').html("Approx. Buy Value (In ₹ cr)");            
            $("#rv_stock #stock_price_compare tbody tr td:nth-child(5)").hide();            
            $("#rv_stock #stock_price_compare tbody tr td:nth-child(6)").show();
          }
          else if($('#rv_stock #stock_price_compare .qty_val_change').html()==="Approx. Buy Value (In ₹ cr)"){
           
            $('#rv_stock #stock_price_compare .qty_val_change').html("Net Qty Bought");            
            $("#rv_stock #stock_price_compare tbody tr td:nth-child(6)").hide();            
            $("#rv_stock #stock_price_compare tbody tr td:nth-child(5)").show();
          }                       

        });

         // Click on Change in table column for StocksSeeingSellingPressure  
      
        $( "#rv_stock #stock_price_compare_1" ).on( "click", ".sec_classific_1", function() {
      
          if($('#rv_stock #stock_price_compare_1 .sec_classific_1').html()==="Classification"){
            
            $('#rv_stock #stock_price_compare_1 .sec_classific_1').html("Sector");
            $("#rv_stock #stock_price_compare_1 tbody tr td:nth-child(3)").hide();            
            $("#rv_stock #stock_price_compare_1 tbody tr td:nth-child(2)").show();
          }
          else if($('#rv_stock #stock_price_compare_1 .sec_classific_1').html()==="Sector"){
            
            $('#rv_stock #stock_price_compare_1 .sec_classific_1').html("Classification");
            $("#rv_stock #stock_price_compare_1 tbody tr td:nth-child(2)").hide();            
            $("#rv_stock #stock_price_compare_1 tbody tr td:nth-child(3)").show();
          }              

        });

        $( "#rv_stock #stock_price_compare_1" ).on( "click", ".qty_val_change_1", function() {
      
          if($('#rv_stock #stock_price_compare_1 .qty_val_change_1').html()==="Net Qty Sold"){

            $('#rv_stock #stock_price_compare_1 .qty_val_change_1').html("Approx. Sell Value (In ₹ cr)");            
            $("#rv_stock #stock_price_compare_1 tbody tr td:nth-child(5)").hide();            
            $("#rv_stock #stock_price_compare_1 tbody tr td:nth-child(6)").show();
          }
          else if($('#rv_stock #stock_price_compare_1 .qty_val_change_1').html()==="Approx. Sell Value (In ₹ cr)"){
           
            $('#rv_stock #stock_price_compare_1 .qty_val_change_1').html("Net Qty Sold");            
            $("#rv_stock #stock_price_compare_1 tbody tr td:nth-child(6)").hide();            
            $("#rv_stock #stock_price_compare_1 tbody tr td:nth-child(5)").show();
          }                       

        });



              
    });

  }




}



/*********************** Stocks Held END *********************************/   

/*********************** Fixed Deposit START *********************************/

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
               list_fd = list_fd + "<div class='breadcrumb'><a href='OfferFD"+ComName+".html?FDName="+myObj.fds[i].name+"&Period="+myObj.fds[i].period+"&Interest="+myObj.fds[i].interest+"&InterestOption="+myObj.fds[i].interest_option+"'><div class='row'><div class='col-xs-6'><div class='FDName'>"+myObj.fds[i].name+"</div></div><div class='col-xs-3'><div class='FDPeriod'>"+myObj.fds[i].period+"</div></div><div class='col-xs-3'><div class='FDInterest'>"+myObj.fds[i].interest+"</div></div></div></a></div>"
            };

        $$('#fd_all_list').html(list_fd);
           
   });
}

/*********************** Fixed Deposit END *********************************/

/*********************** FD - Bajaj START *********************************/

if(page.name==='OfferFDBajajFinanceLimited')
{
    var query_Baj = $$.parseUrlQuery(page.url);
    // console.log(query_Baj);
    var FDName_Baj=query_Baj.FDName;
    var Period_Baj=query_Baj.Period;
    var Interest_Baj=query_Baj.Interest;
    var InterestOption_Baj=query_Baj.InterestOption;
  

// console.log(FDName);
// console.log(Period);
// console.log(Interest);
// console.log(InterestOption);

    $("#BajajFin #period").val(Period_Baj);
    $("#BajajFin #interest").val(Interest_Baj);
    $("#BajajFin #interest_option").val(InterestOption_Baj);

    


 //   $$('#RevProceed').html("<a class='btn btn-RV' href='OfferFixedDepositCreate.html?Period="+ $("#period").val() +"'>Proceed</a>");

   $$.get(curr_ip+'app_services/fd_all_data_bajaj',function (data) 
   {
    var myObj = JSON.parse(data);
    console.log(myObj);
    var table_tr = "";
    var period;
    var cinterest=0, minterest=0, qinterest=0, hinterest=0, yinterest=0;
     // console.log(myObj.fds[0].rating);
    $("#Rating").html(myObj.fds[0].rating);
         
    period = myObj.fds[0].period;

    for (var i = 0; i < myObj.fds.length; i++) { 

      if (myObj.fds[i].period == period ) {

          if ( myObj.fds[i].interest_option == "Cumulative" ) {            
                 cinterest = myObj.fds[i].interest;  
              }
          else if ( myObj.fds[i].interest_option == "Monthly" ) {            
                 minterest = myObj.fds[i].interest;
              }
          else if ( myObj.fds[i].interest_option == "Quarterly" ) {            
                 qinterest = myObj.fds[i].interest;
              }
          else if ( myObj.fds[i].interest_option == "Half Yearly" ) {            
                 hinterest = myObj.fds[i].interest;
              }
          else if ( myObj.fds[i].interest_option == "Yearly" ) {            
                 yinterest = myObj.fds[i].interest;
              }
      }
      else {

        table_tr = table_tr + "<tr><td>"+period+"</td><td class = 'abc cum'><span class='tcontent'>"+cinterest.toFixed(2)+"%</span></td><td class = 'abc mon'><span class='tcontent'>"+minterest.toFixed(2)+"%</span></td><td class = 'abc quar'><span class='tcontent'>"+qinterest.toFixed(2)+"%</span></td><td class = 'abc half'><span class='tcontent'>"+hinterest.toFixed(2)+"%</span></td><td class = 'abc year'><span class='tcontent'>"+yinterest.toFixed(2)+"%</span></td></tr>"
          
          if ( myObj.fds[i].interest_option == "Cumulative" ) {            
                 cinterest = myObj.fds[i].interest;  
              }
          else if ( myObj.fds[i].interest_option == "Monthly" ) {            
                 minterest = myObj.fds[i].interest;
              }
          else if ( myObj.fds[i].interest_option == "Quarterly" ) {            
                 qinterest = myObj.fds[i].interest;
              }
          else if ( myObj.fds[i].interest_option == "Half Yearly" ) {            
                 hinterest = myObj.fds[i].interest;
              }
          else if ( myObj.fds[i].interest_option == "Yearly" ) {            
                 yinterest = myObj.fds[i].interest;
              }

          period = myObj.fds[i].period;
      }

    };
      
    $$('#BajajFin .IntRates .table tbody').html(table_tr);





    var c, d, x, p ,q ;
  x = parseFloat(document.getElementById("interest").value);
$('.abc').click(function(){

   // x = parseFloat(document.getElementById("interest").value);
   // debugger;
  if (document.getElementById("privilege").checked==true)
  {
    p = parseFloat(this.textContent)+ 0.25;
      document.getElementById("interest").value = p.toFixed(2) + "%";
  }
  else if(document.getElementById("more_than_50").checked==true)
  {
     c = parseFloat(this.textContent)+ 0.10;
     document.getElementById("interest").value = c.toFixed(2) + "%";
  }
  else
  {
    document.getElementById("interest").value = this.textContent;
  }

    // $('.chk_pri').attr('checked' , false);
    // $(".chk_pri").attr ( "disabled" , false );
    // $('.chk_emp').attr('checked' , false);
    // $(".chk_emp").attr ( "disabled" , false );
    // $(".radio_pri").prop ( "checked" , false );
    // $(".radio_pri").attr ( "disabled" , true );
    
    document.getElementById("period").value = this.parentElement.childNodes[0].textContent;
    // document.getElementById("interest").value = this.textContent;
     x = parseFloat(document.getElementById("interest").value);


});

 $("#pri_senior").val("");
 $("#more_than_50").val("");

$(".chk_pri").change(function() {
    if(this.checked){
        if (document.getElementById("more_than_50").checked==true)
        {    
          x = x- 0.10;      
        // document.getElementById("interest").value = p.toFixed(2) + "%";
        }
        $(".chk_emp").prop ( "checked" , false );
        $(".radio_senior").prop ( "checked" , true );
        $("#pri_senior").val("Senior Citizen");
        $("#more_than_50").val("");
    }
    else {
        $(".radio_pri").prop ( "checked" , false );
        $("#pri_senior").val("");
    }

    $('.radio_pri').prop('disabled', !this.checked);
    if(this.checked){
     p = x+ 0.25;
      document.getElementById("interest").value = p.toFixed(2) + "%";
    }
     else{
     q = x- 0.25;
      document.getElementById("interest").value = q.toFixed(2) + "%";

    }
     x = parseFloat(document.getElementById("interest").value);
  });

$(".chk_emp").change(function() {

    if(this.checked){
     if (document.getElementById("privilege").checked==true)
      {
          x = x- 0.25;
          // document.getElementById("interest").value = p.toFixed(2) + "%";
      }
      $(".chk_pri").prop ( "checked" , false );
      $(".radio_pri").prop ( "checked" , false );
      $(".radio_pri").attr ( "disabled" , true );
     c = x+ 0.10;
      document.getElementById("interest").value = c.toFixed(2) + "%";
      $("#pri_senior").val("");
      $("#more_than_50").val("Yes");
    }
     else {
     d = x- 0.10;
      document.getElementById("interest").value = d.toFixed(2) + "%";
      $("#more_than_50").val("");
    }
      x = parseFloat(document.getElementById("interest").value);

});

$('.cum').click(function(){
    document.getElementById("interest_option").value = "Cumulative";
});
$('.mon').click(function(){
    document.getElementById("interest_option").value = "Monthly";
});
$('.quar').click(function(){
    document.getElementById("interest_option").value = "Quarterly";
});
$('.half').click(function(){
    document.getElementById("interest_option").value = "Half Yearly";
});
$('.year').click(function(){
    document.getElementById("interest_option").value = "Yearly";
});


$('.tcontent').click(function(){
  $(".tcontent").css("color","#6d9f00");
  $(this).css("color","#5f6469");
});


    $("#RevProceed").attr ( "disabled" , false );
    $$("#RevProceed").click(function() {    
    mainView.router.loadPage("OfferFixedDepositCreate.html?FDNameR="+FDName_Baj+"&PeriodR="+ $("#BajajFin #period").val() +"&InterestR="+ $("#BajajFin #interest").val() + "&InterestOptionR=" +$("#BajajFin #interest_option").val() + "&pri_seniorR=" +$("#BajajFin #pri_senior").val() + "&more_than_50R=" +$("#BajajFin #more_than_50").val());
  //mainView.router.loadPage("OfferFixedDepositCreate.html?FDDetails="+FDName+","+$("#period").val() +","+$("#interest").val()+","+$("#interest_option").val()+","+$("#pri_senior").val()+","+$("#more_than_50").val());
  
    })



   });

    
}

/*********************** FD - Bajaj END *********************************/

/*********************** FD - Review Details START *********************************/

if(page.name==='OfferFixedDepositCreate')
{
    var query1 = $$.parseUrlQuery(page.url);
    console.log(query1);    

    // var FDDetailsArray = query1.FDDetails.split(',');
    // console.log(FDDetailsArray);

    // $("#FDCreate #fdName").html(FDDetailsArray[0]);
    // $("#FDCreate #period").html(FDDetailsArray[1]);
    // $("#FDCreate #interest").html(FDDetailsArray[2]);
    // $("#FDCreate #interest_option").html(FDDetailsArray[3]);
    // $("#FDCreate #pri_senior").html(FDDetailsArray[4]);
    // $("#FDCreate #more_than_50").html(FDDetailsArray[5]);  

    var FDNameRC=query1.FDNameR;
    var PeriodRC=query1.PeriodR;
    var InterestRC=query1.InterestR;
    var InterestOptionRC=query1.InterestOptionR;
    var pri_seniorRC=query1.pri_seniorR;
    var more_than_50RC=query1.more_than_50R;

    if (pri_seniorRC == "") {
      $(".PrivilegeCreate").hide();
    }
    else {
      $(".PrivilegeCreate").show();
    }
    if (more_than_50RC == "") {
      $(".EmployeeCreate").hide();
    }
    else {
      $(".EmployeeCreate").show();
    }

    $("#FDCreate #fdName").html(FDNameRC);
    $("#FDCreate #period").html(PeriodRC);
    $("#FDCreate #interest").html(InterestRC);
    $("#FDCreate #interest_option").html(InterestOptionRC);
    $("#FDCreate #pri_senior").html(pri_seniorRC);
    $("#FDCreate #more_than_50").html(more_than_50RC);


    var CurUsrname;
    var SelInv; 

    $$.get(curr_ip+'app_services/fd_review',function (data) 
    {
      var myObj = JSON.parse(data);
      console.log(myObj);
      
      var list_inv=""; 

      CurUsrname =  myObj.name; 
      $("#CurrentUser").html(CurUsrname);    

      for (var i=0; i < myObj.clients.length ; i++) {

        list_inv = list_inv + "<li><label><input type='radio' class='invRadio' name='investorRadios' value='"+myObj.clients[i].id+"'>"+ myObj.clients[i].inv_name +"</label></li>";
        //console.log(list_inv);
        
      }
                      
      $("#Investor ul").html(list_inv);

      $('input[name="investorRadios"]').first().prop('checked', true);

        SelInv =  $("input[name='investorRadios']:checked").val(); 
      $( ".invRadio" ).change(function() {
         SelInv =  $("input[name='investorRadios']:checked").val(); 

      });

               
      
      $("#FormProceed").attr ( "disabled" , false );
      $$("#FormProceed").click(function() {    
        mainView.router.loadPage("OfferFixedDepositCreateForm.html?SelInvCF="+SelInv+"&FDNameCF="+FDNameRC+"&PeriodCF="+ $("#FDCreate #period").html() +"&InterestCF="+ $("#FDCreate #interest").html() + "&InterestOptionCF=" +$("#FDCreate #interest_option").html()+ "&pri_seniorCF=" + $("#FDCreate #pri_senior").html() + "&more_than_50CF=" + $("#FDCreate #more_than_50").html());
      })


    });
    

}

/*********************** FD - Review Details END *********************************/

/*********************** FD - Form Fill START *********************************/

if(page.name==='OfferFixedDepositCreateForm')
{

    var query = $$.parseUrlQuery(page.url);
    console.log(query);

    var SelInvFDCF = query.SelInvCF;
    var FDNameFDCF=query.FDNameCF.toString();
    var PeriodFDCF=query.PeriodCF;
    var InterestFDCF=query.InterestCF.toString();
    var InterestOptionFDCF=query.InterestOptionCF.toString();
    var pri_seniorFDCF=query.pri_seniorCF;
    var more_than_50FDCF=query.more_than_50CF;

    // $("#FDCreateForm #fdName").html(FDNameFDCF);
    // $("#FDCreateForm #period").html(PeriodFDCF);
    // $("#FDCreateForm #interest").html(InterestFDCF);
    // $("#FDCreateForm #interest_option").html(InterestOptionFDCF);
    // $("#FDCreateForm #pri_senior").html(pri_seniorFDCF);
    // $("#FDCreateForm #more_than_50").html(more_than_50FDCF);
      
      console.log(FDNameFDCF);
      console.log(PeriodFDCF);
      console.log(InterestFDCF);
      console.log(InterestOptionFDCF);
      console.log(pri_seniorFDCF);
      console.log(more_than_50FDCF);

  $$.get(curr_ip+'app_services/create_fd_two',{optionsRadios:+SelInvFDCF,client_id:+SelInvFDCF,fd_name:+FDNameFDCF,period:+PeriodFDCF,interest:+InterestFDCF,interest_option:+InterestOptionFDCF,privilege:+pri_seniorFDCF,more_than_50:+more_than_50FDCF,category:+""},function (data) 
  {
    // optionsRadios=SelInvFDCF;
    // client_id=SelInvFDCF;
    // fd_name=FDNameFDCF;
    // period = PeriodFDCF;
    // interest=InterestFDCF;
    // interest_option=InterestOptionFDCF;
    // privilege=pri_seniorFDCF;
    // more_than_50=more_than_50FDCF;   
    // category="";

       var myObjFD = JSON.parse(data);
 console.log("------------------------------");
       console.log(myObjFD);
      //console.log(optionsRadios);
      //console.log(client_id);
      console.log(FDNameFDCF);
      console.log(PeriodFDCF);
      console.log(InterestFDCF);
      console.log(InterestOptionFDCF);
      console.log(pri_seniorFDCF);
      console.log(more_than_50FDCF);
      //console.log(category);
 console.log("------------------------------");

//debugger;
$("#inv_name").val(myObjFD.clients.inv_name);
//$("#datePicker_i").val(myObjFD.clients.dob); 
$("#pan").val(myObjFD.clients.pan);
$("#guardian").val(myObjFD.clients.guard_name);
$("#mobile_no").val(myObjFD.clients.mobile_no);
$("#email").val(myObjFD.clients.email);
$("#addr1").val(myObjFD.clients.addr1);
$("#addr2").val(myObjFD.clients.addr2);
$("#city").val(myObjFD.clients.city);
$("#state").val(myObjFD.state.STATE_NAME);
$("#country").val(myObjFD.country.COUNTRY_NAME);
$("#pincode").val(myObjFD.clients.pincode);

$("#account_no").val(myObjFD.clients.acc_no);
$("#bank_branch").val(myObjFD.clients.branch_name);
$("#bnk_ifsc_code").val(myObjFD.clients.ifsc_code);



console.log(myObjFD.clients.occupation);

//debugger;

  var bnk_acc_no, bnk_name, bnk_acc_type, bnk_branch_name, bnk_ifsc,bnk_micr,tmp;

  $('#overlayTrigger').click(function(event) {
    event.preventDefault();
    $('body').chardinJs('start');
  });

//Fresh renewal
 $(document).ready(function() {  
  in_ni=$("#in_ni").val();
  if(in_ni=="individual")
   { indi();
     
}
  else if (in_ni=="nonindividual")
    non_indi();
});


$("#inline_content input[name='inv_type']").change(function()
{   

    if($('input:radio[name=inv_type]:checked').val()=="renewal" )
    {
         $('#div_inv_renewal').attr("style", "display : inline;");
         $('#fdr_no').attr("class", " ");
          $('#fdr_month').attr("class", " ");
    }
    else if($('input:radio[name=inv_type]:checked').val()=="fresh" )
    {   


    // $("#loginForm")
    //            .formValidation('resetField','fdr_no')
    //            .formValidation('resetField','fdr_month');

          $('#div_inv_renewal').attr("style", "display : none");
          // $('#div_inv_renewal').attr("disabled", true);

         // $('#inv_type_fresh').attr("style", "display : inline;");
         // $('#inv_type_fresh').attr("disabled", false);
          $('#fdr_no').val("");
          $('#fdr_month').val("");
          $('#fdr_no').attr("class", "ignore1");
          $('#fdr_month').attr("class", "ignore2");
         
           


    }
});
 
 // Individual non individual

$$("#fdIndi").click(function indi() {

    $('#user_type_info').val('individual');
    $('#address_proof_div').show();
    $('#address_proof_div').attr("class" , " "); 
    $('#non_individual_div').attr("style", "display: none");
    $('#non_individual_div').attr("class" , "ignore_3");
    $('#non_individual_div input[type="text"]').val('');
    $('#non_individual_div input[type="date"]').val(''); 

    $('#individual_div_single').attr("style", "display : inline;");
    $('#individual_div_single').attr("class" , " ");
    $('#individual_div_single input[type="text"]').val('');
    $('#individual_div_single input[type="date"]').val(''); 
    $('#tab_indi_joint').attr("style", "display : inline");
    $('#indi_sing_joint_single').prop('checked', true);
    name=$("#name").val();
    // alert(name);
    dob=$("#dob").val();
    pan_no=$("#pan_no").val();
    mobile=$("#mobile").val();
    mail=$("#mail").val();
    address=$("#address").val();
    cty=$("#cty").val();
    ste=$("#ste").val();
    cntry=$("#cntry").val();
    pin=$("#pin").val();
    $("#inv_name").val(name);
    $("#datePicker_i").val(dob);
    $("#pan").val(pan_no);
    $("#mobile_no").val(mobile);
    $("#email").val(mail);
    $("#addr1").val(address);
    $("#city").val(cty);
    $("#state").val(ste);
    $("#country").val(cntry);
    $("#pincode").val(pin);
})


$$("#fdNonIndi").click(function non_indi() {
  
    $('#user_type_info').val('nonindividual');
    $('#address_proof_div').hide();
    $('#address_proof_div').attr("class" , "ignore_5"); 
    $('#individual_div_single').attr("style", "display : none;");
    $('#individual_div_single').attr("class" , "ignore_3"); 

    $('#individual_div_joint').attr("style", "display : none");
    $('#individual_div_joint').attr("class" , "ignore_3"); 

    $('#non_individual_div').attr("style", "display: inline");
    $('#non_individual_div').attr("class" , " "); 
    
    $('#tab_indi_joint').attr("style", "display : none");
    $('#individual_div_joint input[type="text"]').val('');
    $('#individual_div_joint input[type="date"]').val('');
  
})


$("#customer_type_content input[name='indi_sing_joint']").change(function()
{
    if($('input:radio[name=indi_sing_joint]:checked').val()=="single" )
    {    
        $('#individual_div_joint').attr("style", "display : none");
    
        $('#individual_div').attr("style", "display : inline;");
        
        $('#individual_div_joint').attr("class" , "ignorejoint"); 
        $('#individual_div_joint input[type="text"]').val('');
        $('#individual_div_joint input[type="date"]').val('');

        //$('#non_individual_div').attr("class" , " ");  // later added for testing
        //$('#individual_div').attr("class" , "ignore_1"); // later added for testing

    }
    else if($('input:radio[name=indi_sing_joint]:checked').val()=="joint" )
    {   

           $('#individual_div_joint').attr("style", "display : inline");
            $('#individual_div_joint').attr("class" , " "); 
         
         // $('#individual_div').attr("style", "display : inline");
          //$('#non_individual_div').attr("style", "display : none");
         // $('#c').attr("style", "display : inline;");

         // $('#non_individual_div').attr("class" , "ignore_1"); // later added for testing
         // $('#individual_div').attr("class" , " "); // later added for testing
           
    
    }
});


                          //occupation
 $('#occu_select').change(function(){
    if ($('#occu_select').val()=='others'){
      $('#occupation').attr('style','display:inline');
       $('#occupation').val('');
    }
      else {
        $('#occupation').attr('style','display:none');
         $('#occupation').val($('#occu_select').val());
      }
 });

  $('#occu_select_j1').change(function(){
    if ($('#occu_select_j1').val()=='others'){
      $('#occupation_j1').attr('style','display:inline');
       $('#occupation_j1').val('');
    }
      else {
        $('#occupation_j1').attr('style','display:none');
         $('#occupation_j1').val($('#occu_select_j1').val());
      }
 });

 $('#occu_select_j2').change(function(){
    if ($('#occu_select_j2').val()=='others'){
      $('#occupation_j2').attr('style','display:inline');
       $('#occupation_j2').val('');
    }
      else {
        $('#occupation_j2').attr('style','display:none');
         $('#occupation_j2').val($('#occu_select_j2').val());
      }
 });
                          
                          //annual income
  $('#income_select').change(function(){
         $('#annual_income').val($('#income_select').val());
 });
   $('#income_select_j1').change(function(){
         $('#annual_income_j1').val($('#income_select_j1').val());
 });
    $('#income_select_j2').change(function(){
         $('#annual_income_j2').val($('#income_select_j2').val());
 });
                        


// Address proof
$("#address_proof_div input[name='address_proof']").change(function()
{
    tmp = $('input:radio[name=address_proof]:checked').val();
            $('#other_addr').val(tmp);


    if($('input:radio[name=address_proof]:checked').val()=="others" )
    {
        $('#other_addr_1').show();
        $('#other_addr').attr("disabled", false);
        $('#other_addr').attr("class", " ");
    }
    else 
    {     
       $('#other_addr_1').hide();
        $('#other_addr').attr("disabled", true);
        $('#other_addr').val(" ");
         $('#other_addr').attr("class", "ignore_4");
          
    }

});

// // new Added  // voter card is added as default value in the addressprof othas text box
// $("#tds_content input[name='address_proof']").change(function()


//     alert($('input:radio[name=address_proof]:checked').val());
//    //tmp = $('input:radio[name=address_proof]:checked').val();
//   //$('#other_addr_1').val(vl);

// )};


//TDS
$("#tds_content input[name='tds_type']").change(function()
{
    if($('input:radio[name=tds_type]:checked').val()=="tds_no" )
    {
         $('#div_tds').attr("style", "display : inline;");
    }
    else 
    {   
          $('#tds_fdr_no').attr("class", "ignore_2");
          $('#div_tds').attr("style", "display : none");
          
          $('input:radio[name=tds_form]').attr('checked' , false);
          $('input:radio[name=tds_above]').attr('checked' , false);
          $('#tds_fdr_no').val(" ");

         $('#tds_content').find('small').attr("style", "display : none;");
          


          //alert("running--");
        //  $('#div_tds .help-block').attr("style", "display : none");

    }

});

$("#tds_content input[name='tds_form']").change(function()
{
    if($('input:radio[name=tds_form]:checked').val()=="tds_above" )
    {
         $('#tds_fdr_no').attr("disabled", false);
          $('#tds_fdr_no').attr("class", " ");
    }
    else 
    {   
        $('#tds_fdr_no').attr("disabled", true);
         $('#tds_fdr_no').attr("class", "ignore_2");
          
    }

});

// Bank 
$("#bank_details_content input[name='mat_acc_type']").change(function()
{ 


           // $("#loginForm")
           //     .formValidation('resetField','bank_name_red')
           //     .formValidation('resetField','account_no_red')
           //     .formValidation('resetField','bank_branch_red')
           //     .formValidation('resetField','ifsc')
           //     .formValidation('resetField','micr_1');


    if($('input:radio[name=mat_acc_type]:checked').val()=="new" )
    {
         //bnk_acc_no, bnk_name, bnk_acc_type, bnk_branch_name, bnk_ifsc
         $('#bank_details_new').show();


// debugger;
          //alert($('#account_no').val());

          $('#bnk_ac_no_1').attr('value','');
          $('#bnk_nm_1').attr('value','');
          $('#bnk_brnch_1').attr('value','');
          $('#bnk_ifsc_1').attr('value','');
          $('#micr_1').attr('value','');


           // $("#loginForm")
           //     .formValidation('resetField','bank_name_red')
           //     .formValidation('resetField','account_no_red')
           //     .formValidation('resetField','bank_branch_red')
           //     .formValidation('resetField','ifsc')
           //     .formValidation('resetField','micr_1');
          
            //alert($('#account_no').val());

          // $('#bank_name').attr("value","");
          // $('#bank_branch').attr("value","");
          // $('#ifsc_code').attr("value","");

    }
    else  if($('input:radio[name=mat_acc_type]:checked').val()=="existing" )
    {   
         $('#bank_details_new').hide();
         $('#bank_details_new input[type="text"]').val('');              

    }
});

//nominee

$("#nom_yes_no_content input[name='nom_yes_no']").change(function()
{      
      // $("#loginForm")
      //          .formValidation('resetField','nominee1_name')
      //          .formValidation('resetField','nominee1_pan')
      //          .formValidation('resetField','nominee1_addr1')
      //          .formValidation('resetField','nominee1_city')
      //          .formValidation('resetField','nominee1_state')
      //          .formValidation('resetField','nominee1_pincode')
      //          .formValidation('resetField','nominee1_relation')
      //          .formValidation('resetField','nominee1_dob');




    if($('input:radio[name=nom_yes_no]:checked').val()=="nom_yes" )
    {
         $('#nom_details').attr("style", "display : inline;");
    }
    else if($('input:radio[name=nom_yes_no]:checked').val()=="nom_no" )
    {   
         $('#nom_details').attr("style", "display : none;");
         $('#nom_details input[type="text"]').val('');
         $('#nom_details input[type="date"]').val('');
         $('#nominee_minor').attr("style", "display : none;");
         
    }

});



$('input:radio[name=ac_type_1]').click(function() { 
    
    var accnt_type = $('input:radio[name=ac_type_1]:checked').val()
    //alert(accnt_type);      

   if (accnt_type=="Current")
   {
       $("#ac_type_Savings").prop("checked", false);  
       $("#ac_type_Current").prop("checked", true);
       //alert("Current checked");
   }
   if(accnt_type=="Savings")
   {
       $("#ac_type_Current").prop("checked", false); 
       $("#ac_type_Savings").prop("checked", true);   

       //alert("Savings checked");
   }




    
});

$('#bank_name').change(function() { 
  
  var bnm_tmp = $('#bank_name').val();
  $('#bnk_nm_1').val(bnm_tmp);

   //alert("Bank Name Running...");
});

$('#account_no').change(function() { 

  var bnm_tmp = $('#account_no').val();
  $('#bnk_ac_no_1').val(bnm_tmp);
   //alert("Account no Running...");
});

$('#bank_branch').change(function() { 
   //alert("bank_branch Running...");
  var bnm_tmp = $('#bank_branch').val();
  $('#bnk_brnch_1').val(bnm_tmp);


});   

$('#bnk_ifsc_code').change(function() { 

  var bnm_tmp = $('#bnk_ifsc_code').val();
  $('#bnk_ifsc').val(bnm_tmp);
   //alert("bank_IFSC CODE Running...");
});   

$('#micr').change(function() { 
   
   var bnm_tmp = $('#micr').val();
   $('#micr_1').val(bnm_tmp);
   //alert("micr Running...");
}); 




    $(document).ready(function() {
    var min_inv;  
      // minimum_investment();

      bnk_acc_no = $('#account_no').val();
         bnk_acc_type = $('input:radio[name=ac_type]:checked').val();
         bnk_name = $('#bank_name').val();
         bnk_branch_name = $('#bank_branch').val();
         bnk_ifsc = $('#bnk_ifsc_2').val();
         bnk_micr = $('#micr').val();

   if (bnk_acc_no !== null){
             $('#bnk_ac_no_1').attr('value',bnk_acc_no);
          }
          if (bnk_name !== null){
            $('#bnk_nm_1').attr('value',bnk_name);
          }
          if (bnk_branch_name !== null){
            $('#bnk_brnch_1').attr('value',bnk_branch_name);
          }
          if (bnk_ifsc !== null){
             $('#bnk_ifsc_1').attr('value',bnk_ifsc);
          }
          if (bnk_acc_type !== null){


            if (bnk_acc_type == "Savings"){
              $('#first_ac_type').attr('checked','checked')
            }
              else if (bnk_acc_type == "Current") {
              $('#second_ac_type').attr('checked','checked')
            }
          }


  


  // $('#loginForm').formValidation({
  //       framework: 'bootstrap',
  //       excluded: [':disabled', ':hidden', ':not(:visible)','.ignore1','.ignore2','.ignorejoint'],
  //       icon: {
  //           valid: 'glyphicon glyphicon-ok',
  //           invalid: 'glyphicon glyphicon-remove',
  //           validating: 'glyphicon glyphicon-refresh'
  //       },
  //       fields: {
  //           fdr_no: {
  //               validators: {
  //                   notEmpty: {
  //                       message: 'FDR no is required'
  //                   },
  //                   regexp: { regexp: /^[0-9]{1,45}$/i, message: 'Please enter only Number' } 
  //               }
  //           },
  //            fdr_month: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Month is required'
  //                    },
  //                    regexp: { regexp: /^[0-9]{1,3}$/i, message: 'Please enter only Number upto 3 digit' } 
  //                }
  //            }, 
  //            inv_name: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Investor name is required'
  //                    }
  //                }
  //            },
  //            dob_doi: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Date of birth is required'
  //                    }
  //                }
  //            },
  //            pan: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'PAN is required'
  //                    },
  //                    regexp: { regexp: /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/i, message: 'Please enter valid PAN number' }
  //                }
  //            },
  //            mobile_no: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Mobile no is required'
  //                    },
  //                    regexp: { regexp: /^(\d{10})$/i, message: 'Please enter 10 digit mobile number' }
  //                }
  //            },
  //            email: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Email is required'
  //                    },
  //                    regexp: { regexp: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, message: 'Please enter valid email' }
  //                }
  //            },
  //            addr1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Address 1 is required'
  //                    }
  //                }
  //            },
  //            city: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'City is required'
  //                    }
  //                }
  //            },
  //            state: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'State is required'
  //                    }
  //                }
  //            },
  //            country: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Country is required'
  //                    }
  //                }
  //            },
  //            pincode: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Pincode is required'
  //                    },
  //                    regexp: { regexp: /^(\d{6})$/i, message: 'Please enter valid pin code' }
  //                }
  //            },            
  //            second_applicant: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Second applicant is required'
  //                    }
  //                }
  //            },
  //            dob_doi_j1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Date of birth is required'
  //                    }
  //                }
  //            },
  //            pan_j1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'PAN is required'
  //                    },
  //                    regexp: { regexp: /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/i, message: 'Please enter valid PAN number' }
  //                }
  //            },
  //            mobile_no_j1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Mobile no is required'
  //                    },
  //                    regexp: { regexp: /^(\d{10})$/i, message: 'Please enter 10 digit mobile number' }
  //                }
  //            },
  //            email_j1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Email is required'
  //                    },
  //                    regexp: { regexp: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, message: 'Please enter valid email' }
  //                }
  //            },
  //            city_j1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'City is required'
  //                    }
  //                }
  //            },
  //            state_j1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'State is required'
  //                    }
  //                }
  //            },
  //            country_j1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Country is required'
  //                    }
  //                }
  //            },
  //             pincode_j1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Pincode is required'
  //                    },
  //                    regexp: { regexp: /^(\d{6})$/i, message: 'Please enter valid pin code' }
  //                }
  //            },
  //            third_applicant: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Third applicant is required'
  //                    }
  //                }
  //            },
  //            dob_doi_j2: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Date of birth is required'
  //                    }
  //                }
  //            },
  //            pan_j2: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'PAN is required'
  //                    },
  //                    regexp: { regexp: /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/i, message: 'Please enter valid PAN number' }
  //                }
  //            },
  //            mobile_no_j2: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Mobile no is required'
  //                    },
  //                    regexp: { regexp: /^(\d{10})$/i, message: 'Please enter 10 digit mobile number' }
  //                }
  //            },
  //            email_j2: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Email is required'
  //                    },
  //                    regexp: { regexp: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, message: 'Please enter valid email' }
  //                }
  //            },
  //            city_j2: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'City is required'
  //                    }
  //                }
  //            },
  //            state_j2: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'State is required'
  //                    }
  //                }
  //            },
  //            country_j2: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Country is required'
  //                    }
  //                }
  //            },
  //             pincode_j2: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Pincode is required'
  //                    },
  //                    regexp: { regexp: /^(\d{6})$/i, message: 'Please enter valid pin code' }
  //                }
  //            },
  //            name_of_ni: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Name is required'
  //                    }
  //                }
  //            },
  //            date_inc: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Date is required'
  //                    }
  //                }
  //            },
  //            pan_ni: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'PAN is required'
  //                    },
  //                    regexp: { regexp: /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/i, message: 'Please enter valid PAN number' }
  //                }
  //            },
  //            mobile_no_ni: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Mobile no is required'
  //                    },
  //                    regexp: { regexp: /^(\d{10})$/i, message: 'Please enter 10 digit mobile number' }
  //                }
  //            },
  //            addr1_ni: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Address 1 is required'
  //                    }
  //                }
  //            },
  //            city_ni: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'City is required'
  //                    }
  //                }
  //            },
  //            state_ni: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'State is required'
  //                    }
  //                }
  //            },
  //            country_ni: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Country is required'
  //                    }
  //                }
  //            },
  //            pincode_ni: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Pincode is required'
  //                    },
  //                    regexp: { regexp: /^(\d{6})$/i, message: 'Please enter valid pin code' }
  //                }
  //            },
  //            cheque_dd_no: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Cheque or DD no is required'
  //                    },
  //                    regexp: { regexp: /^(\d{6})$/i, message: 'Please enter 6 digit Cheque  or DD number' }
  //                }
  //            },
  //            date_fd: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Date is required'
  //                    }
  //                }
  //            },
  //            amount: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Amount is required'
  //                    },
  //                   between: {
  //                           min: $('#minimum_invest').val(),
  //                           max: 999999999999,
  //                           message: 'Amount must be greater than equal to '+$('#minimum_invest').val()
  //                       }

  //                }
  //            },
  //            bank_name: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Bank name is required'
  //                    },
  //                       regexp: { regexp: /^([A-Za-z ]*)$/i, message: 'Please enter valid Bank Name ' }
  //                }
  //            },
  //            account_no: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Account no is required'
  //                    },
  //                       regexp: { regexp: /^([0-9]*)$/i, message: 'Please enter valid Account No ' }
  //                }
  //            },
  //            bank_branch: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Branch name is required'
  //                    },
  //                       regexp: { regexp: /^([A-Za-z ]*)$/i, message: 'Please enter valid Branch Name ' }
  //                }
  //            },
  //            ifsc_code: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'IFSC code is required'
  //                    },
  //                       regexp: { regexp: /^([A-Z|a-z]{4})([0])([\d]{2})([A-Z|a-z|0-9]{1})([\d]{3})$/i, message: 'Please enter valid IFSC CODE ' } 
  //                }
  //            },
  //            micr: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'MICR no is required'
  //                    },
  //                   regexp: { regexp: /^(\d{9})$/i, message: 'Please enter 9 digit MICR CODE' }
  //                }
  //            },
  //            bank_name_red: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Bank name is required'
  //                    },
  //                       regexp: { regexp: /^([A-Za-z ]*)$/i, message: 'Please enter valid Bank Name ' }
  //                }
  //            },
  //            account_no_red: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Account no is required'
  //                    },
  //                       regexp: { regexp: /^([0-9]*)$/i, message: 'Please enter valid Account No ' }
  //                }
  //            },
  //            bank_branch_red: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Branch name is required'
  //                    },
  //                       regexp: { regexp: /^([A-Za-z ]*)$/i, message: 'Please enter valid Branch Name ' }
  //                }
  //            },
  //            ifsc: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'IFSC code is required'
  //                    }
  //                }
  //            },
  //            micr_1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'MICR no is required'
  //                    },
  //                   regexp: { regexp: /^(\d{9})$/i, message: 'Please enter 9 digit MICR CODE' }
  //                }
  //            },
  //            nominee1_name: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Nominee name is required'
  //                    }
  //                }
  //            },
  //            nominee1_pan: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Nominee PAN is required'
  //                    },
  //                    regexp: { regexp: /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/i, message: 'Please enter valid PAN number' }
  //                }
  //            },
  //            nominee1_addr1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Nominee address 1 is required'
  //                    }
  //                }
  //            },
  //            nominee1_city: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Nominee city is required'
  //                    }
  //                }
  //            },
  //            nominee1_state: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Nominee state is required'
  //                    }
  //                }
  //            },
  //            nominee1_pincode: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Nominee pincode is required'
  //                    },
  //                    regexp: { regexp: /^(\d{6})$/i, message: 'Please enter valid pin code' }
  //                }
  //            },
  //            nominee1_relation: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Nominee relation is required'
  //                    }
  //                }
  //            },
  //            nominee1_dob: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Nominee date of birth is required'
  //                    }
  //                }
  //            },
  //            nominee1_guard_name: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Guardian name is required'
  //                    }
  //                }
  //            },
  //            guardian_pan_1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Guardian PAN is required'
  //                    },
  //                    regexp: { regexp: /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/i, message: 'Please enter valid PAN number' }
  //                }
  //            },
  //            nominee1_guard_addr1: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Guardian address 1 is required'
  //                    }
  //                }
  //            },
  //            nominee1_guard_city: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Guardian city is required'
  //                    }
  //                }
  //            },
  //            nominee1_guard_state: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Guardian state is required'
  //                    }
  //                }
  //            },
  //            nominee1_guard_pincode: {
  //                validators: {
  //                    notEmpty: {
  //                        message: 'Guardian pincode is required'
  //                    },
  //                    regexp: { regexp: /^(\d{6})$/i, message: 'Please enter valid pin code' }
  //                }
  //            }
            
  //       }
  //   });


    // nominee

$('#datePicker_nd').change(function()
{
   // alert("rororooro");
   var start = $('#datePicker_nd').datepicker('getDate');
    var end   = new Date();
    var days   = new Date(end - start)/1000/60/60/24/365;
    //alert(days);
   if (((Math.trunc(days)) < 18) && ((days) >= 0)) {
    $('#nominee_minor').show();
   }
   else {
    $('#nominee_minor').hide();
    $('#nominee_minor input[type="text"]').val('');
   }

});




   
    $('#datePicker_i')
        .datepicker({
            format: 'dd/mm/yyyy',
             endDate : '+0d',
            autoclose : true
        })  
        .on('changeDate', function(e) {
            // Revalidate the date field
            $('#loginForm').formValidation('revalidateField', 'dob_doi');
        });
     $('#datePicker_i_j1')
    .datepicker({
        format: 'dd/mm/yyyy',
         endDate : '+0d',
        autoclose : true
    })
    .on('changeDate', function(e) {
            // Revalidate the date field
            $('#loginForm').formValidation('revalidateField', 'dob_doi_j1');
        }); 
     $('#datePicker_i_j2')
    .datepicker({
        format: 'dd/mm/yyyy',
         endDate : '+0d',
        autoclose : true
    })
    .on('changeDate', function(e) {
            // Revalidate the date field
            $('#loginForm').formValidation('revalidateField', 'dob_doi_j2');
        });
    $('#datePicker_ni')
        .datepicker({
            format: 'dd/mm/yyyy',
             endDate : '+0d',
            autoclose : true
        })
        .on('changeDate', function(e) {
            // Revalidate the date field
            $('#loginForm').formValidation('revalidateField', 'date_inc');
        });

    $('#datePicker_dd')
        .datepicker({
            format: 'dd/mm/yyyy',
             endDate : '+0d',
            autoclose : true
        })
        .on('changeDate', function(e) {
            // Revalidate the date field
            $('#loginForm').formValidation('revalidateField', 'date_fd');
        });   
 
    $('#datePicker_nd')
        .datepicker({
            format: 'dd/mm/yyyy', 
            endDate : '+0d',
            autoclose : true
        })
         .on('changeDate', function(e) {
            // Revalidate the date field
            $('#loginForm').formValidation('revalidateField', 'nominee1_dob');
        });   
  

});
$('#third_applicant').change(function() {

  if($('#third_applicant').val()!="")
  {
    $('#th_jh input[type="text"]').removeClass('ignore1');
  }
  else
   {
    $('#th_jh input[type="text"]').addClass('ignore1');
    $('#th_jh .form-group').removeClass('has-error has-feedback');
                  $('#th_jh .validtor').removeClass('has-error has-feedback');
                  $('#th_jh .form-group').find('small.help-block').hide();
                  $('#th_jh .form-group').find('i.form-control-feedback').hide();
                  $('#th_jh .form-group').css("border-color", "green");
  } 
  });


function minimum_investment()
{
  fd_name=$("#fd_name").val();
  amount=$("#amount").val();
  more_than_50=$("#more_than_50").val();
  privilege=$("#privilege").val();
  period=$("#period").val();
  interest=$("#interest").val();
  int_opt=$("#int_opt").val();
   $.ajax({
         type: 'GET',
         url: '/fds/minimum_investment',
         dataType: 'json',
         data: { 'fd_name' : fd_name,'period' : period,'int_opt' : int_opt},
         success: function(data)
         {
          console.log(data.minimum_invest);
         
          console.log(more_than_50);
            min_inv=data.minimum_invest;
            console.log(min_inv);

          // if(more_than_50=="")
          // {
          //   if(amount<data.minimum_invest)
          //   {
          //     alert("Amount should be greater than"+data.minimum_invest);
          //   }
          // }
          // else
          // {
          //   if(amount<5000000)
          //   {
          //     alert("Amount should be greater than 50 lakh");
          //   }
          // }
        }
      });

}   




$("#bank_details").change(function()
{ 
       $("#loginForm")
               .formValidation('resetField','bank_name')
               .formValidation('resetField','account_no')
               .formValidation('resetField','bank_branch')
               .formValidation('resetField','ifsc_code')
               .formValidation('resetField','micr');
               // .formValidation('resetField','nominee1_pincode')
               // .formValidation('resetField','nominee1_relation')
               // .formValidation('resetField','nominee1_dob');

     if (this.value=="N")
     {
      $("#bank_name").val("");
      $("#account_no").val("");
      $("#bank_branch").val("");
      $("#bnk_ifsc_code").val("");
      $("#micr").val("");
     }
     else
     {
      var bank_id=this.value.split("_")
      $.ajax({
         type: 'GET',
         url: '/fds/investor_bank_detail',
         dataType: 'json',
         data: { 'bank_code' : bank_id[1],'client_id' : bank_id[0]},
         success: function(data)
         {
          console.log(data);
          $("#bank_name").val(data.bank_full_name.BANK_NAME);
          $("#account_no").val(data.bank_details.acc_no);
          $("#bank_branch").val(data.bank_details.branch_name);
          $("#bnk_ifsc_code").val(data.bank_details.ifsc_code);
          $("#micr").val(data.bank_details.micr_no);
          if(data.bank_details.acc_type=="SB")
          {
            document.getElementById("ac_type_1_saving").checked=true;
          }
          else
          {
            document.getElementById("ac_type_1_current").checked=true;
          }
          // else if(data.bank_details.acc_type=="CA")
          // {
          //   document.getElementById("ac_type_1_current").checked=true;
          // }
          // else if(data.bank_details.acc_type=="NRE")
          // {
          //   document.getElementById("ac_type_1_nre").checked=true;
          // }
          // else if(data.bank_details.acc_type=="NRO")
          // {
          //   document.getElementById("ac_type_1_nro").checked=true;
          // }
         }
       });
     }
});




//---------------------------- Individual DOB Date picker ---------------------------------------

   var today = new Date();
   var pickerInline = myApp.picker ({
      input: '#datePicker_i',
      // container: '#datePicker_i-container',
      toolbarTemplate:
         '<div class = "toolbar">' +
            '<div class = "toolbar-inner">' +
               '<div class = "left">' +
                  '<a href = "#" class = "link close-picker" id="IndipickerCancel">Reset</a>' +
               '</div>' +
               
               '<div class = "right">' +
                  '<a href = "#" class="link close-picker">Done</a>' +
               '</div>' +
            '</div>' +
         '</div>',
      rotateEffect: true,
      value: [            
         today.getMonth(),
         today.getDate(), 
         today.getFullYear()

         // today.getHours(), 
         // (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())
      ],            
      onChange: function (picker, values, displayValues) {
         var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
         
         if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
         }
      },
      
      formatValue: function (p, values, displayValues) {
         //return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
         return displayValues[0] + ' ' + values[1] + ', ' + values[2];
      },
      
      cols: [
         // Months
         {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
         },
         
         // Days
         {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         },
         
         // Years
         {
            values: (function () {
               var arr = [];
               for (var i = 1950; i <= 2030; i++) { arr.push(i); }
               return arr;
            })(),
         },
         
         // Space divider
         {
            divider: true,
            content: '  '
         },
         
        //  // Hours
        //  {
        //     values: (function () {
        //        var arr = [];
        //        for (var i = 0; i <= 23; i++) { arr.push(i); }
        //        return arr;
        //     })(),
        //  },
         
        //  // Divider
        //  {
        //     divider: true,
        //     content: ':'
        //  },
         
        // // Minutes
        //  {
        //     values: (function () {
        //        var arr = [];
        //        for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
        //        return arr;
        //     })(),
        //  }
      ],
      onOpen: function (picker) {              
          
          picker.container.find('#IndipickerCancel').on('click', function () {                                   
           $("#datePicker_i").val('');                 
          });

      },
   });

          //debugger;

//---------------------------------------------------------------------------------------------


//---------------------------- Joint Holder 1 DOB Date picker ---------------------------------------

   var todayJ1 = new Date();
   var pickerInline = myApp.picker ({
      input: '#datePicker_i_j1',            
      toolbarTemplate:
         '<div class = "toolbar">' +
            '<div class = "toolbar-inner">' +
               '<div class = "left">' +
                  '<a href = "#" class = "link close-picker" id="IndiJ1pickerCancel">Reset</a>' +
               '</div>' +
               
               '<div class = "right">' +
                  '<a href = "#" class="link close-picker">Done</a>' +
               '</div>' +
            '</div>' +
         '</div>',
      rotateEffect: true,
      value: [            
         todayJ1.getMonth(),
         todayJ1.getDate(), 
         todayJ1.getFullYear()
      ],            
      onChange: function (picker, values, displayValues) {
         var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();               
         if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
         }
      },            
      formatValue: function (p, values, displayValues) {              
         return displayValues[0] + ' ' + values[1] + ', ' + values[2];
      },            
      cols: [
         {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
         },               
         {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         },                             
         {
            values: (function () {
               var arr = [];
               for (var i = 1950; i <= 2030; i++) { arr.push(i); }
               return arr;
            })(),
         },
         {
            divider: true,
            content: '  '
         }
      ],
      onOpen: function (picker) { 
          picker.container.find('#IndiJ1pickerCancel').on('click', function () {                                   
           $("#datePicker_i_j1").val('');                 
          });
      },

   });               

//---------------------------------------------------------------------------------------------

//---------------------------- Joint Holder 2 DOB Date picker ---------------------------------------

   var todayJ2 = new Date();
   var pickerInline = myApp.picker ({
      input: '#datePicker_i_j2',
      toolbarTemplate:
         '<div class = "toolbar">' +
            '<div class = "toolbar-inner">' +
               '<div class = "left">' +
                  '<a href = "#" class = "link close-picker" id="IndiJ2pickerCancel">Reset</a>' +
               '</div>' +
               
               '<div class = "right">' +
                  '<a href = "#" class="link close-picker">Done</a>' +
               '</div>' +
            '</div>' +
         '</div>',
      rotateEffect: true,
      value: [            
         todayJ2.getMonth(),
         todayJ2.getDate(), 
         todayJ2.getFullYear()
      ],            
      onChange: function (picker, values, displayValues) {
         var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();               
         if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
         }
      },            
      formatValue: function (p, values, displayValues) {
         return displayValues[0] + ' ' + values[1] + ', ' + values[2];
      },            
      cols: [
         {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
         },
         {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         },
         {
            values: (function () {
               var arr = [];
               for (var i = 1950; i <= 2030; i++) { arr.push(i); }
               return arr;
            })(),
         },
         {
            divider: true,
            content: '  '
         },
      ],
      onOpen: function (picker) { 
          picker.container.find('#IndiJ2pickerCancel').on('click', function () {                                   
           $("#datePicker_i_j2").val('');                 
          });
      },

   });             

//---------------------------------------------------------------------------------------------

//---------------------------- Non Individual DOI Date picker ---------------------------------------

   var todayNi = new Date();
   var pickerInline = myApp.picker ({
      input: '#datePicker_ni',
      toolbarTemplate:
         '<div class = "toolbar">' +
            '<div class = "toolbar-inner">' +
               '<div class = "left">' +
                  '<a href = "#" class = "link close-picker" id="NonIndipickerCancel">Reset</a>' +
               '</div>' +
               
               '<div class = "right">' +
                  '<a href = "#" class="link close-picker">Done</a>' +
               '</div>' +
            '</div>' +
         '</div>',
      rotateEffect: true,
      value: [            
         todayNi.getMonth(),
         todayNi.getDate(), 
         todayNi.getFullYear()
      ],            
      onChange: function (picker, values, displayValues) {
         var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();               
         if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
         }
      },            
      formatValue: function (p, values, displayValues) {
         return displayValues[0] + ' ' + values[1] + ', ' + values[2];
      },            
      cols: [
         {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
         },
         {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         },
         {
            values: (function () {
               var arr = [];
               for (var i = 1950; i <= 2030; i++) { arr.push(i); }
               return arr;
            })(),
         },
         {
            divider: true,
            content: '  '
         }
      ],
      onOpen: function (picker) {              
          
          picker.container.find('#NonIndipickerCancel').on('click', function () {                                   
           $("#datePicker_ni").val('');                 
          });
      },

   });

              

//---------------------------------------------------------------------------------------------

//---------------------------- Payment DOI Date picker ---------------------------------------

   var todayPay = new Date();
   var pickerInline = myApp.picker ({
      input: '#datePicker_dd',            
      toolbarTemplate:
         '<div class = "toolbar">' +
            '<div class = "toolbar-inner">' +
               '<div class = "left">' +
                  '<a href = "#" class = "link close-picker" id="PayDOIpickerCancel">Reset</a>' +
               '</div>' +
               
               '<div class = "right">' +
                  '<a href = "#" class="link close-picker">Done</a>' +
               '</div>' +
            '</div>' +
         '</div>',
      rotateEffect: true,
      value: [            
         todayPay.getMonth(),
         todayPay.getDate(), 
         todayPay.getFullYear()
      ],            
      onChange: function (picker, values, displayValues) {
         var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();               
         if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
         }
      },            
      formatValue: function (p, values, displayValues) {              
         return displayValues[0] + ' ' + values[1] + ', ' + values[2];
      },            
      cols: [
         {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
         },               
         {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         },                             
         {
            values: (function () {
               var arr = [];
               for (var i = 1950; i <= 2030; i++) { arr.push(i); }
               return arr;
            })(),
         },
         {
            divider: true,
            content: '  '
         }
      ],
      onOpen: function (picker) { 
          picker.container.find('#PayDOIpickerCancel').on('click', function () {                                   
           $("#datePicker_dd").val('');                 
          });
      },

   });               

//---------------------------------------------------------------------------------------------

//---------------------------- Nominee DOB Date picker ---------------------------------------

   var todayNom = new Date();
   var pickerInline = myApp.picker ({
      input: '#datePicker_nd',            
      toolbarTemplate:
         '<div class = "toolbar">' +
            '<div class = "toolbar-inner">' +
               '<div class = "left">' +
                  '<a href = "#" class = "link close-picker" id="NomineepickerCancel">Reset</a>' +
               '</div>' +
               
               '<div class = "right">' +
                  '<a href = "#" class="link close-picker">Done</a>' +
               '</div>' +
            '</div>' +
         '</div>',
      rotateEffect: true,
      value: [            
         todayNom.getMonth(),
         todayNom.getDate(), 
         todayNom.getFullYear()
      ],            
      onChange: function (picker, values, displayValues) {
         var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();               
         if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
         }
      },            
      formatValue: function (p, values, displayValues) {              
         return displayValues[0] + ' ' + values[1] + ', ' + values[2];
      },            
      cols: [
         {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('January February March April May June July August September October November December').split(' '),
            textAlign: 'left'
         },               
         {
            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         },                             
         {
            values: (function () {
               var arr = [];
               for (var i = 1950; i <= 2030; i++) { arr.push(i); }
               return arr;
            })(),
         },
         {
            divider: true,
            content: '  '
         }
      ],
      onOpen: function (picker) { 
          picker.container.find('#NomineepickerCancel').on('click', function () {                                   
           $("#datePicker_nd").val('');                 
          });
      },

   });               

//---------------------------------------------------------------------------------------------

});

}

/*********************** FD - Form Fill END *********************************/

    


    


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
        var p_code=query.scheme_code;
        s_code=[];
        weight=[];
        min_investment_sip=[];
        min_investment=[];
        colour=[]

        $$.get(curr_ip+'app_services/combined_mf', {p_code: +p_code},function (data)
        {
            var data = JSON.parse(data);              
             console.log(data);

            $("#ItemCount").html(data.s_code_new.length);
            $("#append_scheme").empty();

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


                        var $amount_slide_0 = $('#rg'+s_code[0]);
                        var $amount_0 = $('#weightage'+s_code[0]);
                        $amount_slide_0.rangeslider({
                            polyfill: true,
                          })
                          .on('input', function() {

                            $amount_0[0].value = commaSeparateNumber(this.value);
                             $('#weightage'+s_code[0]).html(this.value);
                             // console.log("----")
                             // calculate_min_invest();
                          });
                        $amount_0.on('input', function() {
                          $amount_slide_0.val(commaSeparateNumber(this.value)).change();
                        });

                        var $amount_slide_1 = $('#rg'+s_code[1]);
                        var $amount_1 = $('#weightage'+s_code[1]);
                        $amount_slide_1.rangeslider({
                            polyfill: true,
                          })
                          .on('input', function() {

                            $amount_1[0].value = commaSeparateNumber(this.value);
                             $('#weightage'+s_code[1]).html(this.value);
                          });
                        $amount_1.on('input', function() {
                          $amount_slide_1.val(commaSeparateNumber(this.value)).change();
                        });

                        var $amount_slide_2 = $('#rg'+s_code[2]);
                        var $amount_2 = $('#weightage'+s_code[2]);
                        $amount_slide_2.rangeslider({
                            polyfill: true,
                          })
                          .on('input', function() {

                            $amount_2[0].value = commaSeparateNumber(this.value);
                             $('#weightage'+s_code[2]).html(this.value);
                          });
                        $amount_2.on('input', function() {
                          $amount_slide_2.val(commaSeparateNumber(this.value)).change();
                        });

                        var $amount_slide_3 = $('#rg'+s_code[3]);
                        var $amount_3 = $('#weightage'+s_code[3]);
                        $amount_slide_3.rangeslider({
                            polyfill: true,
                          })
                          .on('input', function() {
                            $amount_3[0].value = commaSeparateNumber(this.value);
                             $('#weightage'+s_code[3]).html(this.value);
                          });
                        $amount_3.on('input', function() {
                          $amount_slide_3.val(commaSeparateNumber(this.value)).change();
                        });

                        var $amount_slide_4 = $('#rg'+s_code[4]);
                        var $amount_4 = $('#weightage'+s_code[4]);
                        $amount_slide_4.rangeslider({
                            polyfill: true,
                          })
                          .on('input', function() {
                            $amount_4[0].value = commaSeparateNumber(this.value);
                             $('#weightage'+s_code[4]).html(this.value);
                          });
                        $amount_4.on('input', function() {
                          $amount_slide_4.val(commaSeparateNumber(this.value)).change();
                        });

                        var $amount_slide_5 = $('#rg'+s_code[5]);
                        var $amount_5 = $('#weightage'+s_code[5]);
                        $amount_slide_5.rangeslider({
                            polyfill: true,
                          })
                          .on('input', function() {
                            $amount_5[0].value = commaSeparateNumber(this.value);
                             $('#weightage'+s_code[5]).html(this.value);
                          });
                        $amount_5.on('input', function() {
                          $amount_slide_5.val(commaSeparateNumber(this.value)).change();
                        });









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
        console.log("+++++++++++++++");
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

                        
                        

                        // var $amount_slide_6 = $('#rg'+s_code[6]);
                        // var $amount_6 = $('#weightage'+s_code[6]);
                        // $amount_slide_6.rangeslider({
                        //     polyfill: true,
                        //   })
                        //   .on('input', function() {
                        //     $amount_6[0].value = commaSeparateNumber(this.value);
                        //      $('#weightage'+s_code[]).html(this.value);
                        //   });
                        // $amount_5.on('input', function() {
                        //   $amount_slide_5.val(commaSeparateNumber(this.value)).change();
                        // });






     }



function calculate_min_invest_sip()
     {
      if(s_code.length==0)
          {
            $("#container").empty();
            $("#imdone").prop('disabled', true);
           
              // alert("coming here---");
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
              // alert($('#weightage'+s_code[i]).val());
              // alert(min_investment[i])
                res[i]=parseInt(parseInt((min_investment_sip[i])*100)/parseInt($('#weightage'+s_code[i]).html()));

            }
            else
            {
              res[i]=0;
            }
          }
            // alert(Math.max.apply(null, res));
            var quo=parseInt(Math.max.apply(null, res)/500);
            // alert(quo);
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
             
             // alert(scheme_classification);
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
       // alert(weightage[i]);
      // alert(schemecode);
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
         // alert(scheme_classification);
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
                     // alert(fin_code);

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
// alert(totalPages);
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
    if (page == Math.floor($('.post').length/pageSize)) {
    //alert("last");
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
    //alert("prev");
        //page = Math.floor($('.pagination .post').length/pageSize);
    } else {
        page--;
    }
    console.log(page);
    showPaged(page);
}

function nextPaged() {
  // alert("kjkj");
  console.log(Math.floor($('.postd').length/pageSized))
    if (page == Math.floor($('.postd').length/pageSized)) {
    //alert("last");
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
  // alert(total_eq);
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
        // alert("debt");
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
              // alert("coming here---");
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
              // alert("coming here---");
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
  // alert(id);
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




$("#Lumpsum").click(function()
    {
     console.log("========")
      if(s_code.length !=0)
      {
       var index = min_investment.indexOf("0")
        if(index>-1)
        {
          alert("Lump Sum is not allowed in " +  map[s_code[index]]);
            $("#invest").val("Invest Now");
        }
        else
        {
          invest_normal();
        }
      }
      else
      {
        alert("Please add atleast 1 fund");
      }

      
    });



function invest_normal()
  {
    var weight=[];
    var url="";
    // alert(s_code.length);
    for(var i=0;i<s_code.length;i++)
    {
      if($('#weightage'+s_code[i]).html()!="0")
      {
        if(i!=s_code.length && url!="")
        {
          url=url+","
        }
        weight[i]=$('#weightage'+s_code[i]).html();
        url=url+s_code[i]+","+weight[i];

        
    }
    }
   var min_in=$('#min_invest').html().replace(/,/g, "");
   $("#loading").show();
              // $('#data').css("display", "block");
              $("#combined_mf_check *").css('pointer-events','none');
                $('#combined_mf_check').css("opacity", "0.5");

            $.ajax({
            type:'GET',
            url: curr_ip+'home/server_availability_check',
            datatype:'json',
            success:function(data, textStatus, jqXHR)
         {
          if (data.msg=="ERROR")
          {
            $("#loading").hide();
            $("#combined_mf_check *").css('pointer-events','block');
            $('#combined_mf_check').css("opacity", "1");
            console.log("Server is under maintainence.Please try after sometime.");
          }
          else
          {
            $("#loading").hide();
            console.log("Server is not under maintainence.Please try after sometime.");
            $("#combined_mf_check *").css('pointer-events','block');
            $('#combined_mf_check').css("opacity", "1");
            console.log(Client_Name);
            if(Client_Name=="")
            {
                  mainView.router.loadPage('RVSign.html');
            }else
            {
                 mainView.router.loadPage('InvestmentLumpsum.html?s='+url+","+min_in);
            }
           
           // window.location.href="/InvestmLumpsum?s="+url+","+min_in;
          }
        }
         }); 
    

  }
    $("#SIP").click(function()
        {
          
            // var index = min_investment_sip.indexOf("0")
            if(s_code.length !=0)
          {
            var index1=[];
            for(var i=0;i<s_code.length;i++)
            {
              if(min_investment_sip[i]=="0")
              {
                index1.push(i)
              }
            }
            var name="";
            if(index1.length>0)
            {
              for(var i=0;i<index1.length;i++)
              {
                if(i!=0)
                    name=name+", "+map[s_code[index1[i]]];
                  else
                    name=name+map[s_code[index1[i]]];
              }
              alert("SIP is not allowed in " + name);
              $("#invest").val("Invest Now");

            }
            else
            {
              invest_sip();
            }
            }
          else
          {
            alert("Please add atleast 1 fund");
          }
          
        });

function invest_sip()
  {
    var weight=[];
    var url="";
    for(var i=0;i<s_code.length;i++)
    {
       if($('#weightage'+s_code[i]).html()!="0")
      {
        if(i!=s_code.length && url!="")
      {
        url=url+","
      }
      weight[i]=$('#weightage'+s_code[i]).html();
      url=url+s_code[i]+","+weight[i]
      
    }
    }
   var min_in_sip=$('#min_invest_sip').html().replace(/,/g, "");
$("#loading").show();
              // $('#data').css("display", "block");
              $("#combined_mf_check *").css('pointer-events','none');
                $('#combined_mf_check').css("opacity", "0.5");

            $.ajax({
            type:'GET',
            url: curr_ip+'home/server_availability_check',
            datatype:'json',
            success:function(data, textStatus, jqXHR)
         {
          if (data.msg=="ERROR")
          {
            $("#loading").hide();
            $("#combined_mf_check *").css('pointer-events','block');
            $('#combined_mf_check').css("opacity", "1");
            alert("Server is under maintainence.Please try after sometime.");
          }
          else
          {
            $("#loading").hide();
            $("#combined_mf_check *").css('pointer-events','block');
            $('#combined_mf_check').css("opacity", "1");
           // window.location.href="/Mutual-Funds/Portfolio-Investment/SIP?s="+url+","+min_in_sip;
           if(Client_Name=="")
            {
                  mainView.router.loadPage('RVSign.html');
            }else
            {
                 mainView.router.loadPage('InvestmentSIP.html?s='+url+","+min_in_sip);
            }
          }
        }
         }); 
    
    

  }


        
    }

/***************************** OfferISDesign / Combined MF END ************************** */ 


/***************************** ToolsScreener / Screener START ************************** */ 

  if(page.name==='ToolsScreener')
  {
      $.getScript("js/screener.js");       
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
        console.log(commaSeparateNumber(this.value));
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

    $('#amount').keyup(function(event) {
   
       $('#amount').val($('#amount').val().replace(/\D/g, "")
        .replace(/\B(?=(\d\d)+\d$)/g, ","));
    });

    $("#calculate").click(function () {

      // var abc=$('#amount').val().replace(/\D/g, "").replace(/\B(?=(\d\d)+\d$)/g, ",");
      // console.log(abc)  ;
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
        $(".col-xs-12 .breadcrumb").css("border","1px solid #ccc");


            if($("#amount").val() < 1 ) {
                $("#amount_valid").show();
                $("#amount_valid").text('Please Fill The Amount') ; 
                // console.log("aa")
                $(".col-xs-12 .breadcrumb:nth-child(1)").css("border","1px dashed red");
                return;               
           }        
           else {
                $("#amount_valid").hide();
           }   
           if($("#year").val() == 0 && $("#month").val() == 0 && $("#day").val() == 0) {
                $("#period_valid").show();
                $("#period_valid").text('Please Choose period') ;
                $(".col-xs-12 .breadcrumb:nth-child(2)").css("border","1px dashed red");
                return;
           }
           else {
                $("#period_valid").hide();
           }
           if($("#interest").val() < 1 ) {
            $("#interest_valid").show();
                $("#interest_valid").text('Please Fill The Interest') ;
                $(".col-xs-12 .breadcrumb:nth-child(3)").css("border","1px dashed red");
                return;
           }
           else {
                $("#interest_valid").hide();
           }
           
        $('.table').show();

        for(z=1; z<=x;z++)
        {
            console.log("a");
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
            console.log("b")
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

        // console.log(amount);
        // console.log(year);
        // console.log(interest);
        // console.log(opening);
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
            
            console.log(tot_maturity_amt);
        // draw_charts(opening_final,interest_final,year_final );    
        
    
    });


    }


/***************************** ToolsCalculatorFD / FD Calcultor END ************************** */ 

/***************************** ToolsCalculatorSIP / SIP Calcultor START ************************** */ 

if(page.name==='ToolsCalculatorSIP'){

  var $amount_slide = $('#js-amount-range');
    var $amount = $('#amount');

    $amount_slide.rangeslider({
        polyfill: true,
      })
      .on('input', function() {
        // var abc=commaSeparateNumber(this.value);
        console.log(commaSeparateNumber(this.value));
        $amount[0].value = commaSeparateNumber(this.value);
      });

    $amount.on('input', function() {
        // console.log(commaSeparateNumber(this.value));
      $amount_slide.val(commaSeparateNumber(this.value)).change();
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

    var $installment_slide = $('#js-installment-range');
    var $installment = $('#installment');

    $installment_slide.rangeslider({
        polyfill: true
      })
      .on('input', function() {
        $installment[0].value = this.value;
      });

    $installment.on('input', function() {
      $installment_slide.val(this.value).change();
    });

    $('#amount').keyup(function(event) {
   
       $('#amount').val($('#amount').val().replace(/\D/g, "")
        .replace(/\B(?=(\d\d)+\d$)/g, ","));
    });

    $("#calculate").click(function () {

      // console.log("Calcultor");
       var a = parseInt($("#amount").val().replace(/,/g, ''));
             var p = parseInt($("input[name='frequency']:checked").val());
             var i = parseFloat($("#interest").val() / 100);       
             var x = parseInt($("#installment").val());
        console.log(a);
        console.log(p);
        console.log(i);
        console.log(x);
        fav = Math.round(a * (Math.pow((1 + i),(x / p)) - 1) / (1 - (Math.pow((1 /(1 + i)),(1 / p)))));     
        var ti = a * x ;


        if(p==12){
             y = parseInt(x / 12);
             m = x % 12;   
             //console.log("hi")             
         }
         else if(p==4){
             y = parseInt(x / 4);
             m = (x % 4) * 3;
         }
         else if(p==2){
             y = parseInt(x / 2);
             m = (x % 2) * 6;
         }
         else if(p==1){
             y = parseInt(x);
             m = 0;
         }


        console.log(fav);
        console.log(ti);

        $(".table").show();
        $('#amt').html(commaSeparateNumber(a));       // Amount
             $('#rate').text($("#interest").val());                    //Interest rate
             $('.freq').text($("#frequency option:selected").text());    // Frequency



             $('#year').text(y);   // Duration in year
             $('#month').text(m);    // Duration in month
             $('#tot_inv').html(commaSeparateNumber(ti));     // Total investment 
             $('#fut_value').html(commaSeparateNumber(fav));   // Future value




    });

}



/***************************** ToolsCalculatorSIP / SIP Calcultor END ************************** */ 



/***************************** InvestmentLumpsum / Lumpsum Investment START ************************** */ 

if(page.name==='InvestmentLumpsum')
{
  var query = $$.parseUrlQuery(page.url);

var idleTime = 0;
 var data_umrn="";
 var Child_trans_count=1;
 var amt=0;



  var adjust="";
  var schemecode="";
  var weightage="";
  var ratio ="";
  $$.get(curr_ip+'app_services/invest_now',{'s': query.s} ,function (client_name_list_ajax) {
    client_name_list=JSON.parse(client_name_list_ajax);
    console.log(client_name_list);
    adjust=client_name_list.adjust;
    schemecode=client_name_list.s_code;
    weightage=client_name_list.weight;
    ratio=client_name_list.ratio;

    console.log(adjust);
    // ratio=ratio.replace(/&quot;/g,'');
    // ratio=ratio.replace("[",'');
    // ratio=ratio.replace("]",'');
    // ratio=ratio.replace(/ /g,'');
console.log(schemecode);
console.log(weightage);
console.log(ratio);

    // adjust=adjust.replace(/&quot;/g,'');
    // adjust=adjust.replace("[",'');
    // adjust=adjust.replace("]",'');
    // adjust=adjust.replace(/ /g,'');

    // weightage=weightage.replace(/&quot;/g,'');
    // weightage=weightage.replace("[",'');
    // weightage=weightage.replace("]",'');
    // weightage=weightage.replace(/ /g,'');

    var client_list_option="<option value>Please select investor</option>";
    for(var i in client_name_list.client_list) 
    { 
      client_list_option=client_list_option+"<option value="+client_name_list.client_list[i]+">"+i+"</option>"
    }
    $("#client_name").html(client_list_option);

    var fund_td_data="";
    var total_amount=0;
    var amount="";
    var fund_name="";
    var ratio="";
    for(var i=0;i<client_name_list.s_name.length;i++){
      fund_name=client_name_list.s_name[i];
      amount="<input type='text' id='weightage"+client_name_list.s_code[i]+"' class='wt readonly_div' value='"+client_name_list.adjust[i]+"'>"
      amount_min_symbol="<span type='button' class='btn btnPM inv_m' id='min_"+client_name_list.s_code[i]+"'><i class='fa fa-minus-square-o fa-2x' aria-hidden='true'></i></span>"
      amount_plus_symbol="<span type='button' class='btn btnPM inv_p' id='pls_"+client_name_list.s_code[i]+"'><i class='fa fa-plus-square-o fa-2x' aria-hidden='true'></i></span>"
      console.log(amount_min_symbol);
      fund_td_data=fund_td_data+"<tr><td>"+client_name_list.s_name[i]+"</td><td>"+amount+amount_min_symbol+amount_plus_symbol+"</td><td>"+client_name_list.ratio[i]+"</td></tr>";
      total_amount=total_amount+client_name_list.adjust[i];
    }
    console.log(fund_td_data);
    fund_td_data=fund_td_data+"<tr><td>Total Investment Amount (₹)</td><td>"+total_amount+"</td><td></td></tr>"
    $('.all_fund_table tbody').html(fund_td_data);
    $('#amt_invested').val(total_amount);
  });
  
  $("#client_name").change(function(){
      if($('#client_name').val()!="" ){
         get_client_details();
      }
  });

  function get_client_details()
  {  
    var id=$('#client_name').val();
    var bk_name=[];
    var acc_no=[];
    var ifsc_code_arr=[];

    if (id.length!=0)
     {  
      $$.get(curr_ip+'investments/client_populate',{'id' : id },function (data_ajax) {
        
        var data=JSON.parse(data_ajax);

        $('#acc_no').empty();
        $('#iin').empty();
        $('#status_amount').empty();
        $('#otm').empty();

        $('#acc_no').append(data.bank_details[0].acc_no);
        $('#iin').append(data.info.iin);
        ifsc_code=data.info.ifsc_code;
        $('#ifsc_code').append(data.info.ifsc_code);
        $('#Instru_rtgs_cd').val(data.bank_details[0].ifsc_code);
        if(data.mandate!=null)
       {
        $('#status_amount').append("OTM Amount :");
        $('#otm').append("₹ "+commaSeparateNumber(data.mandate.AMOUNT)) ;
         
       }
        else if(data.pending_otm!=null)
        {
           $('#otm').append("Pending");
           $('#status_amount').append("OTM Status :");
         }
         else
         {
         $('#otm').append("Inactive");
          $('#status_amount').append("OTM Status :");
        }

          if(data.bank_details.length==1)
          {
            bk_name.push(data.bank_details[0].bank_name)
            acc_no.push(data.bank_details[0].acc_no)
            ifsc_code_arr.push(data.bank_details[0].ifsc_code)
          }
          else
          {
            for(var i=0;i<data.bank_details.length;i++)
            {
              bk_name.push(data.bank_details[i].bank_name)
              acc_no.push(data.bank_details[i].acc_no)
              ifsc_code_arr.push(data.bank_details[i].ifsc_code)
            }
          }
          console.log(bk_name)
          console.log(acc_no)
          console.log(ifsc_code_arr)
          $$.get(curr_ip+'investments/get_bank_desc',{ 'bank_code' : bk_name},function (bank_data_ajax) {
            var data=JSON.parse(bank_data_ajax);
            if(data.fl_bnk_name.length==1)
            {
               $('#bank_name').empty();
              $('#bank_name').append("<h5 class='white_col tab_move_1'>"+data.fl_bnk_name[0].BANK_NAME+"</h5>");
            }
            else
            {  
              $('#bank_name').empty();
             var bb="<div class='white_col'><select class='form-control tab_move_1 bnk_change' id='bank_det_name'>";  
              for(var i=0;i<data.fl_bnk_name.length;i++)
              {  
                var value_to_sent=acc_no[i]+"_"+ifsc_code_arr[i]
                console.log(i);
               bb=bb+"<option value="+value_to_sent+" >"+data.fl_bnk_name[i].BANK_NAME+"</option>"

              }
               $('#bank_name').html(bb+"</select></div>");
               var sent="";
               for(var i=0;i<s_code.length;i++)
                {
                  sent=sent+s_code[i]+","+$("#ratio_"+s_code[i]).val().replace(/,/g,'')+","
                }
                sent=sent+$('#amt_invested').val().replace(/,/g,'')
                $("#sent_url").val(sent);
            }
            generate_umrn();
            // Multiple bank account holder bank account change function later
          });
      });

  }
       

}

ratio=ratio.replace(/&quot;/g,'');
ratio=ratio.replace("[",'');
ratio=ratio.replace("]",'');
ratio=ratio.replace(/ /g,'');

adjust=adjust.replace(/&quot;/g,'');
adjust=adjust.replace("[",'');
adjust=adjust.replace("]",'');
adjust=adjust.replace(/ /g,'');

weightage=weightage.replace(/&quot;/g,'');
weightage=weightage.replace("[",'');
weightage=weightage.replace("]",'');
weightage=weightage.replace(/ /g,'');

console.log("-----")
console.log(ratio);
console.log("-----")
  
}



$('#payment_type_selector').change(function()
 {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  $('#submit_btn').prop("disabled",false);
   if($(this).val()=="Y")
   {
    // alert($(this).val());
      $("#pay_select").show();
      $("#payment_amt").show();
      $("#payment_type_selector option[value='OL']").prop('selected', true);
      // $("#payment_type_selector").addClass('readonly_div');
      // $("#payment_type_selector").addClass('NoAppearance');
       $("#payment_type_selector option[value='M']").hide();
      $("#payment_type_selector option[value='Q']").hide();
      // $('#IA').hide();
        $('#IN').hide();
        $('#IB').hide();
        $('#IBrnch').hide();
        $('#IDate').hide();
        $('#IAccNo').hide();
        $('#IRtgsCode').hide();
        $('#IMICRCode').hide();
        $('#IMandate').hide();
        $('#IMandateAmount').hide();
        $('#no_otm').hide();
         $('#no_otm_ls').hide();
        flag=0;
        $("#submit_btn").removeClass("disabled");
                 $("#submit_btn").prop("disabled",false);

        REinit();

   }
   else
   {
    //  $("#payment_type_selector").append('<option value="M">OTM</option>');
    // $("#payment_type_selector").append('<option value="Q">Cheque</option>');
     $("#pay_select").show();
     $("#payment_amt").show();
     $('#IUtr').hide();
     $('#ITransfer').hide();
     // if($("#payment_type_selector").val()=="TR")
     //    $('#form5').bootstrapValidator('resetForm', true)
   }
   change_otm_lumpsum();
 });


function change_otm_lumpsum()
{

   $('#Instru_amt').val(commaSeparateNumber(amt));
   if($("#payment_type_selector").val()=="OL")
     {

        $('#IA').hide();
        $('#IN').hide();
        $('#IB').hide();
        $('#IBrnch').hide();
        $('#IDate').hide();
        $('#IAccNo').hide();
        $('#IRtgsCode').hide();
        $('#IMICRCode').hide();
        $('#IMandate').hide();
        $('#IMandateAmount').hide();
        $('#no_otm').hide();
         $('#no_otm_ls').hide();
         $('#IUtr').hide();
          $('#ITransfer').hide();
         $("#cheque_image_1").hide();
         $('.net_btn_info').show();
          $("#rtgs_info").hide();
        flag=0;
        $("#submit_btn").removeClass("disabled");
        $("#submit_btn").prop("disabled",false);
        $("#submit_btn_later").show();
        $("#submit_btn_later").removeClass("disabled");
        $("#submit_btn").val("Purchase (Pay Now)");
        $("#submit_btn_later").prop("disabled",false);

         
        REinit();
     }
     else if($("#payment_type_selector").val()=="Q")
     {
        $('#IA').show();
        $('#IN').show();
        $('#IB').show();

        $('#IDate').show();
        $('#IAccNo').show();
        
        $('#IRtgsCode').hide();
        $('#IMICRCode').show();
        $('#IMandate').hide();
        $('#IMandateAmount').hide();
        $('#no_otm').hide();
         $('#no_otm_ls').hide();
          $("#IB").addClass('readonly_div');
          $("#IAccNo").addClass('readonly_div');
          $('#IUtr').hide();
          $('#ITransfer').hide();
          $("#cheque_image_1").show();
          $("#submit_btn_later").hide();
          $("#submit_btn").val("Purchase");
          $('.net_btn_info').hide();
          $("#rtgs_info").hide();
          REinit();


     }
     else if($("#payment_type_selector").val()=="TR")
     {
        $('#IRtgsCode').hide();
        $('#IA').hide();
        $('#IRtgsCode').hide();

        $('#IMICRCode').hide();
        $('#IB').hide();
        $('#IBrnch').hide();

        $('#IN').hide();
        $('#IDate').hide();
        $('#IAccNo').hide();
        $('#IMandate').hide();
        $('#IMandateAmount').hide();
        $('#no_otm').hide();
         $('#no_otm_ls').hide();
         $("#cheque_image_1").hide();
          $('.net_btn_info').hide();
         $("#rtgs_info").show();

            $('#IUtr').show();
            $('#ITransfer').show();
 
          if($("#utr_no").parent()[0].className.indexOf("has-success")!=-1)

            $('#form5').bootstrapValidator('resetForm', true) ;
          $("#submit_btn_later").hide();
          $("#submit_btn").val("Purchase");
          REinit();

     }
     else if($("#payment_type_selector").val()=="M")
     {
      $("#submit_btn").removeClass("disabled");
                 $("#submit_btn").prop("disabled",false);
        $('#IRtgsCode').hide();
        $('#IA').hide();
        $('#IRtgsCode').hide();

        $('#IMICRCode').hide();
        $('#IB').hide();
        $('#IBrnch').hide();

        $('#IN').hide();
        $('#IDate').hide();
        $('#IAccNo').hide();
        $("#cheque_image_1").hide();
        $('#IUtr').hide();
          $('#ITransfer').hide();
          $('.net_btn_info').hide();
         $("#rtgs_info").hide();



        if(data_umrn!="")
        {         
          $('#IMandate').show();
         $('#no_otm_ls').hide();
       }
        else
        {
          $('#no_otm_ls').show();
          $('#IMandate').hide();
        }
        umrn_status();

        $("#submit_btn_later").hide();
          $("#submit_btn").val("Purchase");
         REinit();
     }

  if(($("#payment_type_selector").val()=="M" && data_umrn.length==0 )|| ($("#payment_type_selector").val()=="M" && $("#umrn_status").html()!=""))
    $('#submit_btn').prop( "disabled", true );
  else
     $('#submit_btn').prop( "disabled", false );
  
  if($("#payment_type_selector").val()=="Q" || $("#payment_type_selector").val()=="TR" )
  {
    $('#Instru_amt').val(commaSeparateNumber(amt));

    // alert("tr");
    $("#form5").formValidation({
            framework: 'bootstrap',
            icon: {
                required: 'glyphicon glyphicon-asterisk',
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
              'MicrCode': {
                    row: '.validtor',
                     enabled: false,
                    validators: {
                    notEmpty: {
                        message: 'MICR Code is required'
                    },
                    regexp: { regexp: /^(\d{9})$/i, message: 'Please enter 9 digit MICR CODE' }
                  }
                }, 
                'Instru_nmbr': {
                    row: '.validtor',
                     enabled: false,
                    validators: {
                    notEmpty: {
                        message: 'Cheque number is required'
                    },
                    regexp: { regexp: /^(\d{6})$/i, message: 'Please enter 6 digit Cheque number' }
                  }
                },
                'Instru_rtgs_cd': {
                    row: '.validtor',
                    validators: {
                    notEmpty: {
                        message: 'RTGS CODE is required'

                    },
                        regexp: { regexp: /^([A-Z|a-z]{4})([0])([\d]{6})$/i, message: 'Please enter valid RTGS CODE ' } 
                  }
                },
                'Instru_date': {
                    row: '.validtor',
                     enabled: false,
                    validators: {
                    notEmpty: {
                        message: 'Cheque date is required'

                    }
                  }
                }
              }
              })   
             
         }
          if($("#payment_type_selector").val()=="Q") 
          {
           
            if(flag_cheque==1)
            {
              $('#form5').data('formValidation').validate();
            }
            flag_cheque=1;
            $('#form5')
                    .formValidation('enableFieldValidators', 'MicrCode', true)
                    .formValidation('enableFieldValidators', 'Instru_nmbr', true)
                    .formValidation('enableFieldValidators', 'Instru_date', true);

                   
          }
          if($("#payment_type_selector").val()=="TR") 
          {

           $('#Instru_amt').val($('#amt_invested').val().replace(/,/g , ""));
           $("#submit_btn").removeClass("disabled");
                 $("#submit_btn").prop("disabled",false);
                   if ($("#sumbit_btn").is(":disabled"))
                   {}
                      else
                      {

          }

        }

}
 function REinit()   // function for disabling / Enabling Submit button 
            {
                
            }

 function umrn_status()
{
  // alert("umrn");
  // alert(amt);
    if(parseInt($('#umrn_mandate_amt').val().replace(/,/g , ""))<amt)
    {
      // alert(parseInt($('#umrn_mandate_amt').val()))
      $('#umrn_status').html("");
      $('#umrn_status').html("Your Existing Mandate amount is less than total amount. Please choose another UMRN or another Payment Mode");
      $('#umrn_status').show();
      flag=1;
      if($("#payment_type_selector").val()=="M")
        $("#submit_btn").prop("disabled",true);
    }
    else
    {
      flag=0;
      $('#umrn_status').html("");
      if($("#payment_type_selector").val()=="M")
        $("#submit_btn").prop("disabled",false);
    }

}


function generate_umrn()
{
     var umrn_index=0;
     sip_umrn_amount=0;
     var umrn_obj=[]; 
     var acc_no=$("#acc_no").text();
     var ifsc_code=$('#Instru_rtgs_cd').val();
     console.log("%%%%%%%")
     console.log(acc_no);
      console.log(ifsc_code);
      console.log($('#iin'))
      console.log("%%%%%%%")
      $.ajax({
         type: 'GET',
         url: curr_ip+'investments/get_umrn_info',
         dataType: 'json',
         data: { 'iin' : $('#iin').text(),acc_no:acc_no,ifsc_code:ifsc_code},
         success: function(data)
            {
                console.log(data)
                data_umrn=data;
               if(data.length!=0)
               {
                // $('#no_otm_status_ls').html("")
                $('#umrn_mandate').empty();
                $('#umrn_mandate_amt').empty();
                var t_r="";
                var t_r=" <select id='mandate_no' name='mandate_no' class='form-control'>"
                for(var i=0;i<data.length ;i++)
                {
                t_r =t_r+"<option value="+data[i].UMRN_NO+" >"+data[i].UMRN_NO+"</option>" 
                   sip_umrn_amount = data[0].AMOUNT;
                 }
               $('#umrn_mandate').append(t_r+"</select>");
               $('#umrn_info').html("Existing Umrn");
               $('#umrn_mandate_amt').val(commaSeparateNumber(sip_umrn_amount));
               
               umrn_status()
               }
               else
               {
                 $('#no_otm_status_ls').html("There is no existing OTM. Please select another payment Mode")
                 
               }
                change_otm_lumpsum(); 
            } 
         
         });

}





/***************************** InvestmentLumpsum / Lumpsum Investment END ************************** */ 


})

// Option 2. Using live 'pageInit' event handlers for each page
//$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
//})



