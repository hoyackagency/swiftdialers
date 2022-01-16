$( function() {
    //setup cleave 
    let cleave = new Cleave('#average_sales_price', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        prefix: '$',
        rawValueTrimPrefix: true,
    });

    //margin slider
    var margin = $( "#margin" );
    var slider = $( "#margin-slider" ).slider({
        min: 1,
        max: 4,
        range: "min",
        value: 2,
        slide: function( event, ui ) {
            margin[ 0 ].selectedIndex = ui.value - 1;
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
        }
    });
    $( "#years-of-retentions" ).val( $( "#years-of-retentions-slider" ).slider( "value" ) );


    $('form').on('submit', (e) => {

        e.preventDefault();
        
        if(cleave.getRawValue()){

            //form input values
            const formValues = {
                averageSale: cleave.getRawValue(),
                margin: $('#margin').val(),
                purchaseFrequency:  $('#purchase-frequency').val(),
                yearOfRetentions:  $('#years-of-retentions').val(),
            }
            //calcuate clv 
            const clv = (((formValues.averageSale * formValues.purchaseFrequency) * formValues.yearOfRetentions) * ( formValues.margin/100 ))
            //set results in hidden div
            $('#clv').val('$' + clv)
            //showing loading 
            document.getElementById('loading').classList.remove('d-none');
            //showing results div
            setTimeout(showResults,1000);
        }else{
            showError('Please check your numbers');
        }
    });

   
});

function showError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger' ;
    errorDiv.textContent = error;
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(errorDiv, heading);
    setTimeout(clearError , 3000);
}
function clearError () {
    document.querySelector('.alert').remove();
}
function showResults () {
    document.getElementById('loading').classList.add('d-none');
    document.getElementById('results').classList.remove('d-none');
}
