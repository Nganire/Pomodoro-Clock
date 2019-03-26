$('#show').text('25' + ":" + '00');
$('.heading').text('#Session');
/*********library.js***********
******************************/
var PomodoroClock = function(elem){
  //private variables for session state
  var min = 24;
  var sec = 60;
  var f1;
  //private variables for break state
  var bmin = 4;
  var bsec = 60;
  var f2;
  //keeps track to whether play the timer or pause the timer
  var flag = false;
  //displays default session time and default break time
  $('#sessionDisplay').text(min+1);
  $('#breakDisplay').text(bmin+1);
  //this private module, implements the session state (runs the timer)
  var session = function(){
    if(flag){
      sec--;
      $(elem).text(min + ":" + sec);
      $('.heading').text('#Session');
      if(sec === 0){
        sec = 59;
        min--;
      }
      //calls break state as the session gets over
      if(min < 0){
        $('.heading').text('#Break!');
        $(elem).text(bmin+ ":"+bsec);
        clearInterval(f1);
        breakk();
        return 0;
      }
      f1 = setTimeout(session,1000);
    }
  };
  //implements the break state
  var breakk = function(){
    bsec--;
    $(elem).text(bmin+ ":"+bsec);
    if(bsec === 0){
        bsec = 59;
        bmin--;
    }
    if( bmin<0 ){
      clearInterval(f2);
      min = 24;
      sec = 59;
      console.log(min+" "+sec);
      session();
      return  0;
    }
    f2 = setTimeout(breakk,1000);
  };
  //public modules of the class
  this.update = function() {
    if (!flag){
      flag = true;
      $('#show').addClass('animated pulse');
      session();
    }
    else{
      flag = false;
      clearInterval(f1);
      $('#show').removeClass('animated pulse');
    }
  };
  this.reset = function(){
    clearInterval(f1);
    $(elem).text('25' + ":" + '00');
    $('#sessionDisplay').text('25');
    $('#breakDisplay').text('5');
    min = 24;
    sec = 60;
    bmin = 4;
    flag = false;
  };
  this.sessionPlus = function(){
    //ensures session gets only manipulated if the timer is at pause
    if(!flag){
      min++;
      $(elem).text((min+1) + ":" + '00');
      $('#sessionDisplay').text(min+1);
    }
  };
  this.sessionMinus = function(){
    //ensures session gets only manipulated if the timer is at pause
    if(!flag){
      min--;
      $(elem).text((min+1) + ":" + '00');
      $('#sessionDisplay').text(min+1);
    }
  };
  this.breakPlus = function(){
    //ensures break gets only manipulated if the timer is at pause
    if(!flag){
      bmin++;
      $('#breakDisplay').text(bmin+1);
    }
  };
  this.breakMinus = function(){
    //ensures break gets only manipulated if the timer is at pause
    if(!flag){
      bmin--;
      $('#breakDisplay').text(bmin+1);
    }
  };
};




/***********Main.js************
******************************/
//creates instance of class 'pomodoroClock'
var pomodoro = new PomodoroClock($('#show'));
//calls the modules of the pomodoro clock according to the user events
$('#show').click(function(event) {
  pomodoro.update();
});
$('#reset').click(function(event) {
  pomodoro.reset();
});
$('.sessionPlus').click(function(event) {
    pomodoro.sessionPlus();
});
$('.sessionMinus').click(function(event) {
  pomodoro.sessionMinus();
});

$('.breakPlus').click(function(){
  pomodoro.breakPlus();
});
$('.breakMinus').click(function(){
  pomodoro.breakMinus();
});