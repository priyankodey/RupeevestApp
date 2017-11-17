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