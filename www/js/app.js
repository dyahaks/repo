var app = angular.module('myApp', ['onsen']);

//ons.platform.select('ios');

document.addEventListener('deviceready', onDeviceReady, false);
//var myNav = document.getElementById('myNav');

//ons.ready(function() {
//      myNav.resetToPage('screen.html');
//    });
localStorage.setItem('page', '');
function onDeviceReady(){
    myNav.resetToPage('signin.html');
    localStorage.setItem('page', ''); //untuk inisialisasi ke halaman sms verification
}

app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});

//window.screen.orientation.lock('landscape').then(function success() {
//    console.log("Successfully locked the orientation");
//}, function error(errMsg) {
//    console.log("Error locking the orientation :: " + errMsg);
//});

app.controller('dashboard',['$scope', function($scope) {
    document.addEventListener('show', function(event) {
      var page = event.target;
      var titleElement = document.querySelector('#toolbar-title');
      if (page.matches('#home-page')) {
        titleElement.innerHTML = 'RUPI';
      } else if (page.matches('#transaction-page')) {
        titleElement.innerHTML = 'RUPI - Transaction';
      } else if (page.matches('#help-page')) {
        titleElement.innerHTML = 'RUPI - Help';
      } else if (page.matches('#profile')) {
        titleElement.innerHTML = 'RUPI - Profile';
      }
    });
    
//    document.addEventListener('ons-carousel:postchange', function(event){
//        document.querySelectorAll('.indicators')[event.lastActiveIndex].style.color = '#DCDCDC';
//        document.querySelectorAll('.indicators')[event.activeIndex].style.color = '#A9A9A9';
//        $scope.active = event.activeIndex;
//    });

    $scope.stat=0;
    $scope.showMenu = function(){
        console.log($scope.stat);
        if(document.getElementById('top-menu')){
            if($scope.stat==0){
                $scope.stat = 1;
            }else{
                $scope.stat = 0;
            }
        }
    }
}]);

app.controller('signinCtrl', ['$scope', function($scope){
    $scope.stat = 0;
    
    $scope.signIn = function(){
        console.log('signin');
        localStorage.setItem('page', 'signin'); //untuk inisialisasi ke halaman sms verification
    }  
//    $scope.sign = function(){
//        console.log("sign");
//        $scope.stat = 1;
//    }
}]);

app.controller('registerCtrl', function($scope){
   localStorage.setItem('page', 'register'); //untuk inisialisasi ke halaman sms verification
});

app.controller('walkthroughCtrl', ['$scope', function($scope){
    console.log("display");
    hide(document.querySelectorAll('.btnWhite'));
    $scope.stat = 0;
    //scope.active = 0;
    
    function hide (elements) {
      elements = elements.length ? elements : [elements];
      for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = 'none';
      }
    };
    function show (elements) {
      elements = elements.length ? elements : [elements];
      for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = 'inline-block';
      }
    };
    
        
        document.addEventListener('ons-carousel:postchange', changeSlide);
        
        function changeSlide(event){
            document.querySelectorAll('.indicators')[event.lastActiveIndex].style.color = '#3a5a91';
            document.querySelectorAll('.indicators')[event.activeIndex].style.color = '#FFFFFF';
            
            console.log("active " + event.activeIndex);
            console.log("last " + event.lastActiveIndex);
            $scope.activeSlide = event.activeIndex;
            
            $scope.stat = 0;
           
            if (event.activeIndex == 2){
                $scope.stat = 1;
                hide(document.querySelectorAll('.indicators'));
                show(document.querySelectorAll('.btnWhite'));
            }else{               
                $scope.stat = 0;
                hide(document.querySelectorAll('.btnWhite'));
                show(document.querySelectorAll('.indicators'));
            }
        }
        
//        document.addEventListener('ons-carousel:postchange', function(event){
//            document.querySelectorAll('.indicators')[event.lastActiveIndex].style.color = '#3a5a91';
//            document.querySelectorAll('.indicators')[event.activeIndex].style.color = '#FFFFFF';
//            
//            console.log("active " + event.activeIndex);
//            console.log("last " + event.lastActiveIndex);
//            $scope.activeSlide = event.activeIndex;
//           
//            if (event.activeIndex == 2){
//                $scope.stat = 1;
//                alert("last");
//                //myNav.pushPage('dashboard.html');
//                //document.getElementById('footer').innerHTML='<ons-button ng-click="myNav.pushPage(dashboard.html);" class="btnWhite indicators" style="border-radius: 15pt; padding: 1%; margin-left: 5%; margin-right: 5%; font-size: 12pt; font-style: bold; width: 80%;">GET STARTED</ons-button>';
//            }else{
//                $scope.stat = 0;
//                alert(event.activeIndex);
//                //document.getElementById('footer').innerHTML = "";
//            }
//            
//        });
}]);

app.controller('enterPinCtrl', ['$scope', function($scope){
    var bullet1 = document.getElementById('pin1');
    var bullet2 = document.getElementById('pin2');
    var bullet3 = document.getElementById('pin3');
    var bullet4 = document.getElementById('pin4');
    var bullet5 = document.getElementById('pin5');
    var bullet6 = document.getElementById('pin6');
    
    var booking_travel = document.getElementById('booking-travel');
    var pin = '123450';
    var number = document.getElementsByClassName('number');
    var dots = document.getElementsByClassName('dot');
    dots    = Array.from(dots);
    
    $scope.init = function(){
        console.log("init");
        $scope.passcode = "";
        console.log("passcode " + $scope.passcode);
    } 
    
    $scope.add = function(value){
        
        if($scope.passcode.length<6){
            console.log($scope.passcode.length);
            $scope.passcode = $scope.passcode + value;
            $( dots[$scope.passcode.length-1] ).addClass( 'active' );
            
            if($scope.passcode.length == 6){
                setTimeout(function(){
                    console.log("pin");
                    console.log($scope.passcode);
                    if($scope.passcode == pin){
                        //alert("true");
                        $scope.passcode = "";
                        if(booking_travel){
                            myNav.replacePage('traveling.html');
                        }
                        myNav.replacePage('walkthrough.html');
                    }else{
                        //alert("false");
                        $scope.passcode = "";
                        document.body.className = '';
                        bullet1.classList.remove('active');
                        bullet2.classList.remove('active');
                        bullet3.classList.remove('active');
                        bullet4.classList.remove('active');
                        bullet5.classList.remove('active');
                        bullet6.classList.remove('active');
                        document.getElementById('incorrect').innerHTML = "Incorrect pin";
//                        this.className = '';
                    }
           
                }, 500);
                
            }
        }
        document.getElementById('incorrect').innerHTML = "";
    }    
    

//      var input   = "",
//        correct = "1234"; // pin code
//      
//      var dots    = document.querySelectorAll(".dot"), 
//        numbers = document.querySelectorAll(".number");
//        dots    = Array.prototype.slice.call(dots);
//        numbers = Array.prototype.slice.call(numbers);
//      
//      numbers.forEach(function(number, index) {
//        number.addEventListener('click', function() {
//          number.className += ' grow';
//          input += (index+1);
//          dots[input.length-1].className += ' active';
//          if(input.length >= 4) {
//            if(input !== correct) {
//              dots.forEach(function(dot, index) {
//                dot.className += " wrong";
//              });
//              document.body.className += " wrong";
//            }
//            else {
//              dots.forEach(function(dot, index) {
//                dot.className += " correct";
//              });
//              document.body.className += " correct";
//              myNav.pushPage('walkthrough.html');
//            }
//            setTimeout(function() {
//              dots.forEach(function(dot, index) {
//                dot.className = "dot";
//              });
//              input = "";
//            }, 900);
//            setTimeout(function() {
//              document.body.className = "";
//            }, 1000);
//          }
//          setTimeout(function() {
//            number.className = 'number';
//          }, 1000);
//        });
//      });
    
}]);

app.controller('smsVerificationCtrl', ['$scope', function($scope){
    var local = localStorage.getItem('page');
    console.log(local);
    
    countdown( "timer", 3, 0 );
    function countdown( elementName, minutes, seconds )
    {
        var element, endTime, hours, mins, msLeft, time;
    
        function twoDigits( n )
        {
            return (n <= 9 ? "0" + n : n);
        }
    
        function updateTimer()
        {
            msLeft = endTime - (+new Date);
            if ( msLeft < 1000 ) {
                element.innerHTML = "<u> Resend Code </u>";
            } else {
                time = new Date( msLeft );
                hours = time.getUTCHours();
                mins = time.getUTCMinutes();
                element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
                setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
            }
        }
    
        element = document.getElementById( elementName );
        endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
        updateTimer();
    }
    
    $scope.count = function(){
        countdown( "timer", 3, 0 );
    }
    
    var bullet1 = document.getElementById('bullet1');
    var bullet2 = document.getElementById('bullet2');
    var bullet3 = document.getElementById('bullet3');
    var bullet4 = document.getElementById('bullet4');
    
    var pin = '1204';
    var number = document.getElementsByClassName('number');
    var dots = document.getElementsByClassName('dot');
    dots    = Array.from(dots);
    
    $scope.init = function(){
        console.log("init");
        $scope.passcode = "";
        console.log("passcode " + $scope.passcode);
    } 
    
    $scope.add = function(value){
        
        if($scope.passcode.length<4){
            console.log($scope.passcode.length);
            
            $scope.passcode = $scope.passcode + value;
            $( dots[$scope.passcode.length-1] ).addClass( 'no' );
            
            if ($scope.passcode.length == 1){
                bullet1.classList.remove('dot');
                document.getElementById('bullet1').innerHTML = value;
            }else if ($scope.passcode.length == 2){
                bullet2.classList.remove('dot');
                document.getElementById('bullet2').innerHTML = value;
            }else if ($scope.passcode.length == 3){
                bullet3.classList.remove('dot');    
                document.getElementById('bullet3').innerHTML = value;
            }else{
                bullet4.classList.remove('dot');
                document.getElementById('bullet4').innerHTML = value;
            }
            
            if($scope.passcode.length == 4){
                setTimeout(function(){
                    console.log("pin");
                    console.log($scope.passcode);
                    if($scope.passcode == pin){
                        //alert("true");
                        $scope.passcode = "";
                        if(local == 'register'){
                            myNav.replacePage('hello_signup.html');
                        }else if(local == 'signin'){
                            myNav.replacePage('hello.html');
                        }
                    }else{
                        //alert("false");
                        $scope.wrongPin();
                    }
           
                }, 500);
                
            }
        }
    }
    
    $scope.wrongPin = function(){
        console.log($scope.passcode);
        $scope.passcode = "";
        $scope.stat = 0;
        $scope.passcode.substring(0);
        
        setTimeout(function(){
            document.body.className = '';
            bullet1.classList.remove('no');
            bullet2.classList.remove('no');
            bullet3.classList.remove('no');
            bullet4.classList.remove('no');
            console.log($scope.passcode);
            $( dots[0] ).addClass( 'dot' );
            $( dots[1] ).addClass( 'dot' );
            $( dots[2] ).addClass( 'dot' );
            $( dots[3] ).addClass( 'dot' );
            document.getElementById('bullet1').innerHTML = "";
            document.getElementById('bullet2').innerHTML = "";
            document.getElementById('bullet3').innerHTML = "";
            document.getElementById('bullet4').innerHTML = "";
            
        }, 300);
    }
    
    //delete button
    $scope.hapus = function() {
        if($scope.passcode.length > 0) {
            $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
        }
    }
    
}]);


app.controller('qrCodeCtrl', ['$scope', function($scope){
    var qrcode = new QRCode("qrcode", {
        text: "john",
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    //qrcode.makeCode("12345");
    $("#qrcode > img").css({"margin":"auto"});
}]);
app.controller('notifications', ['$scope', function($scope){
$scope.date = [
            {'date': '11 Feb 2017'},
            {'date': '12 Feb 2017'},
            {'date': '13 Feb 2017'},
            {'date': '14 Feb 2017'}];
    $scope.notif = [
        {
            'id':1,
            'date': '11 Feb 2017',
            'time': '16.00',
            'subject':'You get cashback..',
            'stat':'read'
        },
        {
            'id':1,
            'date': '11 Feb 2017',
            'time': '12.00',
            'subject':'Sucess transfer to 0123456',
            'stat':'read'
        },
        {
            'id':1,
            'date': '11 Feb 2017',
            'time': '10.00',
            'subject':'Lorem ipsum tera bili hai',
            'stat':'read'
        },
        {
            'id':1,
            'date': '11 Feb 2017',
            'time': '09.00',
            'subject':'Your new membership has been',
            'stat':'read'
        },
        {
            'id':2,
            'date': '12 Feb 2017',
            'time': '16.10',
            'subject':'Lopem ipsum tera bili hai',
            'message':'Your Highlights'+
                'Chordae Tendineae'+
                '@dyah'+
                'Korsel punya tuntutan knetizen bagi idolnya. twitter.com/bitxt/status/9…',
            'stat':'read'
        },
        {
            'id':3,
            'date': '13 Feb 2017',
            'time': '17.30',
            'subject':'Success transfer to 01235675345',
            'message':'Your Highlights'+
                'Chordae Tendineae'+
                '@widia'+
                'Korsel punya tuntutan knetizen bagi idolnya. twitter.com/bitxt/status/9…',
            'stat':'read'
        },
        {
            'id':4,
            'date': '14 Feb 2017',
            'time': '19.00',
            'subject':'Your new membership has been',
            'message':'Your Highlights'+
                'Chordae Tendineae'+
                '@nida'+
                'Korsel punya tuntutan knetizen bagi idolnya. twitter.com/bitxt/status/9…',
            'stat':'no read'
        },
        {
            'id':5,
            'date': '14 Feb 2017',
            'time': '19.30',
            'subject':'Lorem ipsum tera bili hai',
            'message':'Your Highlights'+
                'Chordae Tendineae'+
                '@yotsuta'+
                'Korsel punya tuntutan knetizen bagi idolnya. twitter.com/bitxt/status/9…',
            'stat':'read'
        }
    ];    
}]);
app.controller('notifications-detail', ['$scope', function($scope){
$scope.date = [
            {'date': '11 Feb 2017'},
            {'date': '12 Feb 2017'},
            {'date': '13 Feb 2017'},
            {'date': '14 Feb 2017'}];
    $scope.notif = [
        {
            'id':1,
            'date': '11 Feb 2017',
            'time': '16.00',
            'subject':'You get cashback..',
            'stat':'read'
        },
        {
            'id':1,
            'date': '11 Feb 2017',
            'time': '12.00',
            'subject':'Sucess transfer to 0123456',
            'stat':'read'
        },
        {
            'id':1,
            'date': '11 Feb 2017',
            'time': '10.00',
            'subject':'Lorem ipsum tera bili hai',
            'stat':'read'
        },
        {
            'id':1,
            'date': '11 Feb 2017',
            'time': '09.00',
            'subject':'Your new membership has been',
            'stat':'read'
        },
        {
            'id':2,
            'date': '12 Feb 2017',
            'time': '16.10',
            'subject':'Lopem ipsum tera bili hai',
            'message':'Your Highlights'+
                'Chordae Tendineae'+
                '@dyah'+
                'Korsel punya tuntutan knetizen bagi idolnya. twitter.com/bitxt/status/9…',
            'stat':'read'
        },
        {
            'id':3,
            'date': '13 Feb 2017',
            'time': '17.30',
            'subject':'Success transfer to 01235675345',
            'message':'Your Highlights'+
                'Chordae Tendineae'+
                '@widia'+
                'Korsel punya tuntutan knetizen bagi idolnya. twitter.com/bitxt/status/9…',
            'stat':'read'
        },
        {
            'id':4,
            'date': '14 Feb 2017',
            'time': '19.00',
            'subject':'Your new membership has been',
            'message':'Your Highlights'+
                'Chordae Tendineae'+
                '@nida'+
                'Korsel punya tuntutan knetizen bagi idolnya. twitter.com/bitxt/status/9…',
            'stat':'no read'
        },
        {
            'id':5,
            'date': '14 Feb 2017',
            'time': '19.30',
            'subject':'Lorem ipsum tera bili hai',
            'message':'Your Highlights'+
                'Chordae Tendineae'+
                '@yotsuta'+
                'Korsel punya tuntutan knetizen bagi idolnya. twitter.com/bitxt/status/9…',
            'stat':'read'
        }
    ];    
}]);

app.controller('transferCtrl', ['$scope', function($scope){
    $scope.scanBarcode = function() {
        window.plugins.barcodeScanner.scan( function(result) {
                alert("We got a barcode\n" +
                          "Result: " + result.text + "\n" +
                          "Format: " + result.format 
                         // "Cancelled: " + result.cancelled
                         );
            }, function(error) {
                alert("Scanning failed: " + error);
            }
        );
    }
    
    $scope.dialogs = {};
      $scope.show = function(dlg) {
        if (!$scope.dialogs[dlg]) {
          ons.createDialog(dlg).then(function(dialog) {
            $scope.dialogs[dlg] = dialog;
            dialog.show();
          });
        } else {
          $scope.dialogs[dlg].show();
        }
    }
      
      $scope.sendTransfer = function(){
        
        $scope.show('transfer_success_dialog.html');
        dialog.hide();
      }
      
      $scope.closeDialog = function(){
          dialog.hide();
          document.getElementById('trf').value = "";
          document.getElementById('amount').value = "";
          document.getElementById('message').value = "";
      }

}]);

app.controller('pulsa', ['$scope', function($scope){
    $scope.pulsa = [
        {
            'price':'Rp 12.000',
            'discPrice' : 'Rp 10.000',
            'desc' : 'Masa Aktif 7 hari',
            'promo' : 'PALING MURAH'
        },
        {
            'price':'Rp 20.000',
            'discPrice' : '',
            'desc' : 'Masa Aktif 7 hari',
            'promo' : 'PALING MURAH'
        },
        {
            'price':'Rp 50.000',
            'discPrice' : '',
            'desc' : 'Masa Aktif 7 hari',
            'promo' : 'PALING MURAH'
        },
        {
            'price':'Rp 10.000',
            'discPrice' : '',
            'desc' : 'Masa Aktif 7 hari',
            'promo' : 'PALING MURAH'
        }
    ];
        
    $scope.dialogs = {};
      $scope.show = function(dlg) {
        if (!$scope.dialogs[dlg]) {
          ons.createDialog(dlg).then(function(dialog) {
            $scope.dialogs[dlg] = dialog;
            dialog.show();
          });
        } else {
          $scope.dialogs[dlg].show();
        }
      }
      
    $scope.pay = function(){
        $scope.show('pulsa_success.html');
        dialog.hide();
    }
    
    $scope.closeDialog = function(){
        dialog.hide();
          document.getElementById('noHP').value = "";
    }
}]);


app.controller('paketData', ['$scope', function($scope){
    $scope.paket_data = [
        {
            'price':'Rp 72.000',
            'discPrice' : 'Rp 59.000',
            'desc' : '5GB (2G/3G/4G) kuota youtube blablabla',
            'promo' : 'PALING MURAH'
        },
        {
            'price':'Rp 83.000',
            'discPrice' : '',
            'desc' : '5GB (2G/3G/4G) kuota youtube blablabla',
            'promo' : 'PALING MURAH'
        },
        {
            'price':'Rp 100.000',
            'discPrice' : '',
            'desc' : '5GB (2G/3G/4G) kuota youtube blablabla',
            'promo' : 'PALING MURAH'
        },
        {
            'price':'Rp 120.000',
            'discPrice' : '',
            'desc' : '5GB (2G/3G/4G) kuota youtube blablabla',
            'promo' : 'PALING MURAH'
        }
        ];
}]);

app.controller('setPinCtrl', ['$scope', function($scope){
    
    var bullet1 = document.getElementById('sPin1');
    var bullet2 = document.getElementById('sPin2');
    var bullet3 = document.getElementById('sPin3');
    var bullet4 = document.getElementById('sPin4');
    var bullet5 = document.getElementById('sPin5');
    var bullet6 = document.getElementById('sPin6');
  
    var number = document.getElementsByClassName('number');
    var dots = document.getElementsByClassName('dot');
    dots    = Array.from(dots);
    
    $scope.init = function(){
        console.log("init");
        $scope.passcode = "";
        console.log("passcode " + $scope.passcode);
    } 
    
    $scope.add = function(value){
        
        if($scope.passcode.length<6){
            console.log($scope.passcode.length);
            $scope.passcode = $scope.passcode + value;
            $( dots[$scope.passcode.length-1] ).addClass( 'active' );
            
            if($scope.passcode.length == 6){
                localStorage.setItem('myPin', $scope.passcode);
                setTimeout(function(){
                    myNav.replacePage('reenterPin.html', {animation: 'none'});
                    $scope.passcode = "";
                }, 500);
                
            }
        }
    }    
}]);

app.controller('reenterPinCtrl', ['$scope', function($scope){
    
    var bullet1 = document.getElementById('rPin1');
    var bullet2 = document.getElementById('rPin2');
    var bullet3 = document.getElementById('rPin3');
    var bullet4 = document.getElementById('rPin4');
    var bullet5 = document.getElementById('rPin5');
    var bullet6 = document.getElementById('rPin6');
    
    var pin = localStorage.getItem('myPin');
    var number = document.getElementsByClassName('number');
    var dots = document.getElementsByClassName('dotR');
    dots    = Array.from(dots);
    
    $scope.init = function(){
        console.log("init");
        $scope.passcode = "";
        console.log("passcode " + $scope.passcode);
    } 
    
    $scope.add = function(value){
        
        if($scope.passcode.length<6){
            console.log($scope.passcode.length);
            $scope.passcode = $scope.passcode + value;
            $( dots[$scope.passcode.length-1] ).addClass( 'active' );
            
            if($scope.passcode.length == 6){
                setTimeout(function(){
                    console.log("pin");
                    console.log($scope.passcode);
                    if($scope.passcode == pin){
                        //alert("true");
                        $scope.passcode = "";
                        myNav.replacePage('walkthrough.html');
                    }else{
                        //alert("false");
                        $scope.passcode = "";
                        document.body.className = '';
                        bullet1.classList.remove('active');
                        bullet2.classList.remove('active');
                        bullet3.classList.remove('active');
                        bullet4.classList.remove('active');
                        bullet5.classList.remove('active');
                        bullet6.classList.remove('active');
                        document.getElementById('wrong').innerHTML = "Pin must same";
//                        this.className = '';
                    }
           
                }, 500);
                
            }
        }
        document.getElementById('wrong').innerHTML = "";
    }    
}]);

app.controller('topup', function($scope,$http,$rootScope){
    
    $scope.topup_payment_bank = [
        {
            'nominal' : 'Rp 50.000',
            'logo':'assets/icon/mandiri.png',
            'name_bank':'Bank Mandiri',
            'total':'Rp 50.250'
        },
        {
            'nominal' : 'Rp 50.000',
            'logo':'assets/icon/bca.png',
            'name_bank':'Bank BCA',
            'total':'Rp 50.250'
        },
        {
            'nominal' : 'Rp 50.000',
            'logo':'assets/icon/cimb.png',
            'name_bank':'Bank CIMB',
            'total':'Rp 50.250'
        },
        {
            'nominal' : 'Rp 100.000',
            'logo':'assets/icon/mandiri.png',
            'name_bank':'Bank Mandiri',
            'total':'Rp 100.250'
        },
        {
            'nominal' : 'Rp 100.000',
            'logo':'assets/icon/bca.png',
            'name_bank':'Bank BCA',
            'total':'Rp 100.250'
        },
        {
            'nominal' : 'Rp 100.000',
            'logo':'assets/icon/cimb.png',
            'name_bank':'Bank CIMB',
            'total':'Rp 100.250'
        },
        {
            'nominal' : 'Rp 150.000',
            'logo':'assets/icon/mandiri.png',
            'name_bank':'Bank Mandiri',
            'total':'Rp 150.250'
        },
        {
            'nominal' : 'Rp 150.000',
            'logo':'assets/icon/bca.png',
            'name_bank':'Bank BCA',
            'total':'Rp 150.250'
        },
        {
            'nominal' : 'Rp 150.000',
            'logo':'assets/icon/cimb.png',
            'name_bank':'Bank CIMB',
            'total':'Rp 150.250'
        },
        {
            'nominal' : 'Rp 200.000',
            'logo':'assets/icon/mandiri.png',
            'name_bank':'Bank Mandiri',
            'total':'Rp 200.250'
        },
        {
            'nominal' : 'Rp 200.000',
            'logo':'assets/icon/bca.png',
            'name_bank':'Bank BCA',
            'total':'Rp 200.250'
        },
        {
            'nominal' : 'Rp 200.000',
            'logo':'assets/icon/cimb.png',
            'name_bank':'Bank CIMB',
            'total':'Rp 200.250'
        }
        ];
    $scope.topup_payment_ritel = [
        {
            'nominal' : 'Rp 50.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Indomaret',
            'total':'Rp 50.250'
        },
        {
            'nominal' : 'Rp 50.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Alfamart',
            'total':'Rp 50.250'
        },
        {
            'nominal' : 'Rp 50.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Lawson',
            'total':'Rp 50.250'
        },
        {
            'nominal' : 'Rp 100.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Indomaret',
            'total':'Rp 100.250'
        },
        {
            'nominal' : 'Rp 100.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Alfamart',
            'total':'Rp 100.250'
        },
        {
            'nominal' : 'Rp 100.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Lawson',
            'total':'Rp 100.250'
        },
        {
            'nominal' : 'Rp 150.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Indomaret',
            'total':'Rp 150.250'
        },
        {
            'nominal' : 'Rp 150.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Alfamart',
            'total':'Rp 150.250'
        },
        {
            'nominal' : 'Rp 150.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Lawson',
            'total':'Rp 150.250'
        },
        {
            'nominal' : 'Rp 200.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Indomaret',
            'total':'Rp 200.250'
        },
        {
            'nominal' : 'Rp 200.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Alfamart',
            'total':'Rp 200.250'
        },
        {
            'nominal' : 'Rp 200.000',
            'logo':'assets/icon/mandiri.png',
            'name_ritel':'Lawson',
            'total':'Rp 200.250'
        }
        ];
    $scope.pushNominal = function (){
        var index = document.getElementById('selectNominal').selectedIndex;
        var options = document.getElementById('selectNominal').options;
        var nominal = options[index].text;
        myNav.pushPage('topup_payment.html', {animation: 'none', data: {nominal: nominal}});
        $rootScope.nominal = nominal;
    }
    $scope.loadTopupPayment = function(){
        $scope.nominal = $rootScope.nominal;
//        document.addEventListener('init', function (event) {
//            $scope.nominal = event.target.data.nominal;
//            document.getElementById('nominalTopup').innerHTML = $scope.nominal;
//        });
    }
    
    $scope.pushNominal2 = function(){
        var nominal = document.getElementById('nominalTopup').innerText;
        myNav.pushPage('topup_payment_detail.html', {animation: 'none', data:{nominal:nominal}});
    }
    
    function countdown( elementName, minutes, seconds ){
        var element, endTime, hours, mins, msLeft, time;
    
        function twoDigits( n )
        {
            return (n <= 9 ? "0" + n : n);
        }
    
        function updateTimer()
        {
            msLeft = endTime - (+new Date);
            if ( msLeft < 1000 ) {
                element.innerHTML = "<u> Resend Code </u>";
            } else {
                time = new Date( msLeft );
                hours = time.getUTCHours();
                mins = time.getUTCMinutes();
                element.innerHTML = ('<ons-col>'+hours ? hours +'</ons-col>'+
                '<ons-col> : </ons-col>'+
                '<ons-col>'+ twoDigits( mins ) : mins) +'</ons-col>'+
                '<ons-col> : </ons-col>'+
                '<ons-col>'+twoDigits( time.getUTCSeconds() )+'</ons-col>';
//                element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
                setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
            }
        }
    
        element = document.getElementById( elementName );
        endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
        updateTimer();
    }
    $scope.count = function(){
        countdown( "timer", 240, 0 );
    }
    
    $scope.loadTopupPaymentDetail = function(){
        $scope.nominal = $rootScope.nominal;
//        document.addEventListener('init', function (event) {
//            $scope.nominal = event.target.data.nominal;
//            console.log($scope.nominal);
//            document.getElementById('nominalTopupDetail').innerHTML = $scope.nominal;
//        });
        countdown( "timer", 240, 0 );
    }
    
});

app.controller('travelingCtrl', function($scope,$http,$rootScope){
    $scope.today = new Date();
    var currentDate = $scope.today.toISOString().slice(0,10);
    document.getElementById('departure-date').value = currentDate;
    document.getElementById('departure-date').min = currentDate;
    document.getElementById('return-date').value = currentDate;
    document.getElementById('return-date').min = currentDate;
    $scope.bandara = [
        {
            'kode':'CGK',
            'kota' : 'Jakarta',
            'negara' : 'Indonesia'
        },
        {
            'kode':'BDO',
            'kota' : 'Bandung',
            'negara' : 'Indonesia'
        },
        {
            'kode':'JOG',
            'kota' : 'Yogyakarta',
            'negara' : 'Indonesia'
        },
        {
            'kode':'DPS',
            'kota' : 'Bali',
            'negara' : 'Indonesia'
        },
        {
            'kode':'MLG',
            'kota' : 'Malang',
            'negara' : 'Indonesia'
        },
        {
            'kode':'SUB',
            'kota' : 'Surabaya',
            'negara' : 'Indonesia'
        }
    ];

    $scope.round_trip = function(){
        $scope.stat = document.getElementById('rount-trip').checked;
        if($scope.stat==true){
            document.getElementById('rount-trip').show();
        }else{
            document.getElementById('rount-trip').hide();
        }
    }
    
    $scope.dateTest = function() {
        var myNewDate = new Date();
        // Same handling for iPhone and Android
        window.plugins.datePicker.show({
            date : myNewDate,
            mode : 'date', // date or time or blank for both
            allowOldDates : true
        }, function(returnDate) {
            $scope.newDate = new Date(returnDate);
            //alert(newDate.toString());
        });
    }
    
    $scope.traveler = function(count, type){
        $rootScope.typePassenger = type;
        $rootScope.selectCountPassenger = count+1;
        myNav.pushPage('travelers_detail.html');
    }
    
    $scope.traveler_detail = function(){
        $scope.typePassenger = $rootScope.typePassenger;
        $scope.selectCountPassenger = $rootScope.selectCountPassenger;
    }
    
    $scope.flight_detail = function(){
//        $rootScope.fullNamePassenger = document.getElementById('fullname_travelers'+$rootScope.type+$rootScope.count+'').value;
//        console.log($rootScope.fullNamePassenger + document.getElementById('fullname_travelers'+$rootScope.type+$rootScope.count+'').value);

        $rootScope.fullNamePassenger = document.getElementById('fullname'+$rootScope.typePassenger+$rootScope.selectCountPassenger+'').value;
        console.log($rootScope.fullNamePassenger + document.getElementById('fullname'+$rootScope.typePassenger+$rootScope.selectCountPassenger+'').value);
        myNav.pushPage('flight_detail.html');
    }
    
    $scope.search_flight = function(){
        $rootScope.adult = document.getElementById('adult').value;
        $rootScope.child = document.getElementById('child').value;
        $rootScope.infant = document.getElementById('infant').value;
        $rootScope.total_passenger = parseFloat( "0" + $rootScope.adult ) + parseFloat( "0" + $rootScope.child ) +parseFloat( "0" + $rootScope.infant );
        $rootScope.select_class_flight = document.getElementById('select-class-flight').value;
        
        $rootScope.date = document.getElementById('departure-date').value;
        
        $rootScope.from = document.getElementById('city_from').value;
        $rootScope.to = document.getElementById('city_to').value;
        myNav.pushPage('select_flight.html');
    }
    
    $scope.data_search_flight = function(){
        $scope.adult = $rootScope.adult;
        $scope.child = $rootScope.child;
        $scope.infant = $rootScope.infant;
        $scope.total_passenger = $rootScope.total_passenger;
        $scope.select_class_flight = $rootScope.select_class_flight;
        $scope.from = $rootScope.from;
        $scope.to = $rootScope.to;
        
        $scope.type = $rootScope.typePassenger;
        $scope.count = $rootScope.selectCountPassenger;
        $scope.fullNamePassenger = $rootScope.fullNamePassenger;
        console.log($rootScope.fullNamePassenger);
    }
    
    $scope.dialogs = {};
    $scope.show = function(dlg) {
        if (!$scope.dialogs[dlg]) {
          ons.createDialog(dlg).then(function(dialog) {
            $scope.dialogs[dlg] = dialog;
            dialog.show();
          });
        } else {
          $scope.dialogs[dlg].show();
        }
    }

});

app.controller('profileCtrl', ['$scope', function($scope){
    $scope.dialogs = {};
    $scope.show = function(dlg) {
        if (!$scope.dialogs[dlg]) {
          ons.createDialog(dlg).then(function(dialog) {
            $scope.dialogs[dlg] = dialog;
            dialog.show();
          });
        } else {
          $scope.dialogs[dlg].show();
        }
    }
    
    $scope.upgrade_profile = function(){
        $scope.show('profile_upgrade.html');
    }
}]);

app.controller('uploadKtpCtrl', ['$scope', function($scope){
    $scope.take_photo = function(){
        navigator.camera.getPicture(cameraSuccess, cameraError, {
            quality : 50,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            correctOrientation: true
        });
        function cameraSuccess(imageData){
            console.log(imageData);
            var photo_ktp = document.getElementById('photo_ktp');
            photo_ktp.src = "data:image/jpeg;base64," + imageData;
            
        }
        function cameraError(message){
            console.log(message);
        }
    }
}]);

app.controller('uploadKtpBackCtrl', ['$scope', function($scope){
    $scope.take_photo = function(){
        navigator.camera.getPicture(cameraSuccess, cameraError, {
            quality : 50,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            correctOrientation: true
        });
        function cameraSuccess(imageData){
            console.log(imageData);
            var photo_ktp = document.getElementById('photo_ktp_back');
            photo_ktp.src = "data:image/jpeg;base64," + imageData;
            
        }
        function cameraError(message){
            console.log(message);
        }
    }
}]);

app.controller('uploadSelfieCtrl', ['$scope', function($scope){
    $scope.take_photo = function(){
        navigator.camera.getPicture(cameraSuccess, cameraError, {
            quality : 50,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            correctOrientation: true
        });
        function cameraSuccess(imageData){
            console.log(imageData);
            var photo_ktp = document.getElementById('photo_selfie');
            photo_ktp.src = "data:image/jpeg;base64," + imageData;
            
        }
        function cameraError(message){
            console.log(message);
        }
    }
    $scope.dialogs = {};
    $scope.show = function(dlg) {
        if (!$scope.dialogs[dlg]) {
          ons.createDialog(dlg).then(function(dialog) {
            $scope.dialogs[dlg] = dialog;
            dialog.show();
          });
        } else {
          $scope.dialogs[dlg].show();
        }
    }
    
    $scope.upgrade_proceed = function(){
        $scope.show('profile_proceed.html');
    }
}]);