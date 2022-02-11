// Start CLV

  //setup cleave 
  let cleave = new Cleave('#average_sales_price', {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      prefix: '$',
      rawValueTrimPrefix: true,
  });

  //margin slider
  var margin = $( "#margin" );
  var margin_Slider = $( "#margin-slider" ).slider({
      min: 1,
      max: 4,
      range: "min",
      value: 2,
      slide: function( event, ui ) {
          margin[ 0 ].selectedIndex = ui.value - 1;
          $(margin).trigger("change");
      }
  });
  $(margin).on("change",function(){
      margin_Slider.slider("value", this.selectedIndex + 1);
  });
  //purchase frequency
  var purchaseFrequency = $( "#purchase-frequency" );
  var slider = $( "#purchase-frequency-slider" ).slider({
      min: 1,
      max: 8,
      range: "min",
      value: 8,
      slide: function( event, ui ) {
          purchaseFrequency[ 0 ].selectedIndex = ui.value - 1;
          $(purchaseFrequency).trigger("change");
      }
  });
  
  $( purchaseFrequency ).on( "change", function() {
      slider.slider( "value", this.selectedIndex + 1 );
  });

  // years of retentions sliders
  $( "#years-of-retentions-slider" ).slider({
      range: "min",
      value: 3,
      min: 1,
      max: 10,
      slide: function( event, ui ) {
          $("#years-of-retentions").val( ui.value );
          $( "#years-of-retentions" ).trigger("change");
      }
  });
  $( "#years-of-retentions" ).val( $( "#years-of-retentions-slider" ).slider( "value" ) );
  // close-ratio sliders
  $( "#close-ratio-slider" ).slider({
      range: "min",
      value: 1,
      min: 5,
      max: 100,
      step: 5,
      slide: function( event, ui ) {
          $("#close-ratio").val( ui.value );
          $("#close-ratio").trigger("change");
      }
  });
  $( "#close-ratio" ).val( $( "#close-ratio-slider" ).slider( "value" ) );

// End CLV
// Start Strategy 
const result_toggler = document.getElementById("eventsCheckBox");
const lead_toggler = document.getElementById("leadCheckBox");
const payment_toggler = document.getElementById("paymentCheckBox");
// Dynamic Labels
result_toggler.addEventListener("change" , ()=> {

    if(result_toggler.checked){
        // Change Label Content
        result_toggler.parentElement.previousElementSibling.textContent = "Results Up Front";
        lead_toggler.disabled = false;
        payment_toggler.disabled = false;
    }else{
        // Change Label Content
        result_toggler.parentElement.previousElementSibling.textContent = "Priced Per Task";
        // Uncheck other toggler & disabled it 
        lead_toggler.disabled = true;
        payment_toggler.checked = false;
        payment_toggler.disabled = true;
    }
});

lead_toggler.addEventListener("change" , ()=> {
    if(lead_toggler.checked){
        // Change Label Content
        lead_toggler.parentElement.previousElementSibling.textContent = "Sales Closing";
        // Uncheck or check other toggler & enable or disabled it 
        result_toggler.disabled = true;
        result_toggler.checked = true;
        // set close ratio to 5% and disabled its slider
        $('#close-ratio-slider').slider({ value: 1 });
        $( "#close-ratio" ).val( $( "#close-ratio-slider" ).slider( "value" ) );
        $("#close-ratio").trigger("change");
        $('#close-ratio-slider').slider({ disabled: true });
    }else{
        // Change Label Content
        lead_toggler.parentElement.previousElementSibling.textContent = "Lead Generation";
        // Uncheck other toggler & disabled it 
        result_toggler.disabled = false;
        
        // enable close ratio slider
        $('#close-ratio-slider').slider({ disabled: false });
    }
});
// End Strategy 
// Start Risk

var oldValue = 50;
function changeProgressDial(value) {
  var $progressDial = $('.radial-progress-wrapper');
  var $leftSection = $progressDial.find('.radial-left-section .wedge');
  var $rightSection = $progressDial.find('.radial-right-section .wedge');
  var $marker = $progressDial.find('.marker.end');
  
  var rightAnimationDuration = 0;
  var leftAnimationDuration = 0;
  
  if(value <= 66) {
    // Ensure the right side is hidden
		if(oldValue > 66) {
      rightAnimationDuration = (oldValue - 67) * 10;
      console.log('rightAnimationDuration: ', rightAnimationDuration);
      
      changeTransitionDuration($rightSection, rightAnimationDuration);
      changeTransitionDuration($marker, rightAnimationDuration);
      
      changeTrasformRotateZ($rightSection, -181);
      changeTrasformRotateZ($marker, 0);
    }
    
    var leftDeg = -Math.abs(180 - Math.round(2.7 * value));
    var threshold = oldValue > 66 ? 67 : oldValue;
    
    setTimeout(function(){
      leftAnimationDuration = Math.abs(threshold - value) * 10;
      
      changeTransitionDuration($leftSection, leftAnimationDuration);
      changeTransitionDuration($marker, leftAnimationDuration);
      
      changeTrasformRotateZ($leftSection, leftDeg);
      changeTrasformRotateZ($marker, leftDeg);
    }, rightAnimationDuration);
  } else {
    // See if LHS needs to change
    if (oldValue <= 66) {
      leftAnimationDuration = (67 - oldValue) * 10;
      
      changeTransitionDuration($leftSection, leftAnimationDuration);
      changeTransitionDuration($marker, leftAnimationDuration);
      
	    changeTrasformRotateZ($leftSection, 0);
      changeTrasformRotateZ($marker, 0);
    }
    
    var rightDeg = -90 - ((100 - value) * 2.7);
    var threshold = oldValue < 67 ? 67 : oldValue;
    
    setTimeout(function(){
      rightAnimationDuration = Math.abs(threshold - value) * 10;
      
      changeTransitionDuration($rightSection, rightAnimationDuration);
      changeTransitionDuration($marker, rightAnimationDuration);
      
      changeTrasformRotateZ($rightSection, rightDeg);
      changeTrasformRotateZ($marker, (180 + rightDeg));
    }, leftAnimationDuration)
  }
  
  oldValue = value;
}

function changeTransitionDuration(element, duration) {
  element.css('transition-duration', duration + 'ms');
}

function changeTrasformRotateZ(element, deg) {
  element.css('transform', 'rotateZ(' + deg + 'deg)');
}

changeProgressDial(50);
// End Risk
// main Variables
const strategy_form = document.querySelector("#strategy form");
let leadValue = 0.25;
let ratio = 3;
let openRate = 0.25;
let responseRate = 0.015;
let dialsPerDay = 100;
let emailsPerDay = 30;
let burdenRate = 55;
let emailWeight = 5;
let hoursInDay = 8;
let paymentPlan = 12 ;
let months;
let closer_comission;
let closer;
let r;
function getDifferentRisks(lv = leadValue) {

  // calc clv
  const formValues = {
    averageSale: cleave.getRawValue(),
    margin: $('#margin').val(),
    purchaseFrequency:  $('#purchase-frequency').val(),
    yearOfRetentions:  $('#years-of-retentions').val(),
  }
  // clv eq
  const clv = (((formValues.averageSale * formValues.purchaseFrequency) * formValues.yearOfRetentions) * ( formValues.margin/100 ))
  // calc mql
  let closeRatio = $( "#close-ratio" ).val() / 100 ;
  let CAC = clv/ratio;
  let CPD = CAC * lv;
  let MQL = CPD * closeRatio;
  //calc Closer Comission
  closer_comission =  CAC - CPD;
  // Calc Cost Per Dial & Open
  let emailValue = (( 1 - openRate ) * MQL) * responseRate;
  let phoneValue = MQL * responseRate;
  // Calc Dialing Rate & Email Rate
  let emailRate = (((emailsPerDay / openRate) * emailValue) / emailWeight)
  let phoneRate = ((phoneValue * dialsPerDay) / hoursInDay);
  // Calc Dialing Risk & Email Risk & Combined Risk
  let emailRisk = (((((emailRate * 2) - burdenRate) / emailRate) /2)  * 100).toFixed(2);
  let phoneRisk = (((((phoneRate * 2) - burdenRate) / phoneRate) / 2) * 100).toFixed(2);
  let combinedRisk = ((Number(emailRisk) + Number(phoneRisk) ) /2 ).toFixed(2);

  r = {
     MQL,
     emailValue,
     phoneValue
  }
  return {
    emailRisk,
    phoneRisk,
    combinedRisk
  }
}

$(strategy_form).on('change', 'input', (e)=>{
  
  // disable phone or email checkbox 
  disable_checkbox(e.target);
  
});

$('.changeable').on('change', function (e) {
  

  if($('#average_sales_price').val() === '$') return;

  //Check if payment plan is on so lv = 50% by default 

  let paymentPlanChecked = $('#paymentCheckBox').is(':checked');

  if(paymentPlanChecked) {

    //Combined Risk Logic

    if($('#email').is(':checked') && $('#phone').is(':checked')) {

      let {combinedRisk} = getDifferentRisks(0.50);

      if(combinedRisk < 50) {
        // disable phone checkbox
        // trigger email risk calc
        $('#phone').prop("checked" , false);
       

      }else if(combinedRisk >= 50) {
        //acceptance
        acceptance(combinedRisk)
      }

    }

    //Phone Risk 
    if($('#phone').is(':checked') && !$('#email').is(':checked')) {
      
      //starting with lv = 50%
      let {phoneRisk} = getDifferentRisks(0.50);
      
      if(phoneRisk < 50) {
        //too risky 
        tooRisky(phoneRisk);

      }else if(phoneRisk >= 50) {
    
        //acceptance 
        acceptance(phoneRisk)
      }
    }

    //Email risk
    if($('#email').is(':checked') && !$('#phone').is(':checked')) {

      let {emailRisk} = getDifferentRisks(0.50);

      if(emailRisk < 50) {
        //too risky 
        tooRisky(emailRisk);

      }else if(emailRisk >= 50) {

        //acceptance
        acceptance(emailRisk);
      }
      
    }

  } else {

    //Combined Risk Logic

    if($('#email').is(':checked') && $('#phone').is(':checked')) {

      let {combinedRisk} = getDifferentRisks();

      if(combinedRisk < 50) {
        //lv = 50%
        combinedRisk = getDifferentRisks(0.50).combinedRisk

        if(combinedRisk < 50) {

          // disable phone 
          // trigger email risk calc
          $( "#phone" ).prop( "checked", false );

        }else if(combinedRisk >= 50) {

          //acceptance
          acceptance(combinedRisk);
          
        }

      }else if(combinedRisk >= 50) {
        //acceptance
        acceptance(combinedRisk);
      }

    }

    //Phone Risk 
    if($('#phone').is(':checked') && !$('#email').is(':checked')) {
      
      //starting with lv = 50%
      let {phoneRisk} = getDifferentRisks(0.50);
      
      if(phoneRisk < 50) {
        //too risky 
        tooRisky(phoneRisk);

      }else if(phoneRisk > 80) {
    
        //lv = 25%
        phoneRisk = getDifferentRisks(0.25).phoneRisk
    
        if(phoneRisk < 50 ) {
          
          phoneRisk = getDifferentRisks(0.50).phoneRisk;
        
          //acceptance with lv = 50%
          acceptance(phoneRisk);

        }else if(phoneRisk > 50) {

          //acceptance
          acceptance(phoneRisk);

        }
      }

    }

    //Email risk
    if($('#email').is(':checked') && !$('#phone').is(':checked')) {
      
      //starting with lv = 50%
      let {emailRisk} = getDifferentRisks(0.50);

      if(emailRisk < 50) {
        //too risky 
        tooRisky(emailRisk);

      }else if(emailRisk > 80) {
    
        //lv = 25%
        emailRisk = getDifferentRisks(0.25).emailRisk
    
        if(emailRisk < 50 ) {
          
          emailRisk = getDifferentRisks(0.50).emailRisk;
        
          //acceptance with lv = 50%
          acceptance(emailRisk);

        }else if(emailRisk > 50) {

          //acceptance
          acceptance(emailRisk);
        }
      }
      
    }

  }

  

})



// disable email or phone checkbox to make one of them must be checked
function disable_checkbox(input){
  if(input.id == "email"){
    if(input.checked){
      document.getElementById("phone").disabled = false;
    }else{
      document.getElementById("phone").disabled = true;
    }
  }else if (input.id == "phone"){
    if(input.checked){
      document.getElementById("email").disabled = false;
    }else{
      document.getElementById("email").disabled = true;
    }
  }
}





function acceptance(acceptedRisk) {
  $('#status').val('The Deal Is Acceptable')
  showRisk(acceptedRisk)
  //Calc Payment Plan Months &  mql_payment
  
  months =  Math.round((acceptedRisk/100) * paymentPlan ) ;
  closer = closer_comission / ((acceptedRisk/100) * paymentPlan);
  mql_payment =  r.MQL / ((acceptedRisk/100) * paymentPlan );
  $('#generateQuoteBtn').prop('disabled', false)
  return;
}

function tooRisky(risk) {
  $('#status').val('The Deal Is Too Risky')
  showRisk(risk)
  //disable generate quote btn 
  $('#generateQuoteBtn').prop('disabled', true)
  return;
}


function showRisk(risk) {

  let riskLabel = document.querySelector(".risk-rate"); 
  if(risk >= 0 && risk <= 100){
      riskLabel.textContent = `${risk} %` ;
      changeProgressDial(risk);
  }else if(risk <= 0) {

    riskLabel.textContent = `${0} %` ;
    changeProgressDial(0.2);
  }else if(risk >= 100) {

    riskLabel.textContent = `${100} %` ;
    changeProgressDial(100);
  }

}

// // Generate Quote Cases
$('#risk-form').on('submit', function (e) {

  let quote_data = {
    mql_price : r.MQL ,
    cost_per_dial : r.phoneValue ,
    cost_per_open : r.emailValue ,
    payment_months : months,
    mql_payment : mql_payment ,
    closer_comission: closer_comission,
    closer : closer,
    result_status : result_toggler.checked,
    lead_status : lead_toggler.checked,
    payment_status : payment_toggler.checked,
  }
  e.preventDefault(); 
  window.location.href = `invoice.html?mql=${quote_data.mql_price}&cpo=${quote_data.cost_per_open}&cpd=${quote_data.cost_per_dial}&months=${quote_data.payment_months}&mql_payment=${mql_payment}&closer_comission=${closer_comission}&closer=${closer}&result=${quote_data.result_status}&lead=${quote_data.lead_status}&payment=${quote_data.payment_status}`
})




