// setup varriables 
const form = document.getElementById('form')
const emailCheckbox = document.getElementById('email');
const phoneCheckbox = document.getElementById('phone');
const CLV = document.getElementById('clv');
let cleave = new Cleave('#clv', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    prefix: '$',
    rawValueTrimPrefix: true,
  });
let strategyMqlValue;
let strategyClosingRatio;
let strategyName = 'results';
let openRate = 0.25;
let responseRate = 0.015;

function determineIfRedirectedFromStrategyPage() {
    
    const params = new URLSearchParams(window.location.search)
    
    if(params.has('lv') && params.has('cr') && params.has('s')) {

        setupPage(params.get('lv'), params.get('cr'), params.get('s'));
    }
}

determineIfRedirectedFromStrategyPage()

function setupPage(mql, ratio, s) {

    strategyMqlValue = mql;
    strategyClosingRatio = ratio;
    strategyName = s;
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search)

    // UI Variables
    const CAC_Value = document.getElementById('cac');
    const r_Value = document.getElementById('r');
    const lv_Value = document.getElementById('lv');
    const cr_Value = document.getElementById('cr');
    const MQL_Results = document.getElementById('mql');
    const emailOpens = document.getElementById('emailOpens');
    const phoneDials = document.getElementById('phoneDials');
    const eventsBox = document.getElementById('eventsBox');

    let closeRatio = 0.25;
    let leadValue = 0.15;
    let ratio = 3;

    if (window.location.search && window.location.search != '?'){
        
        closeRatio = Number(params.get('cr'))/100;

        leadValue = Number(params.get('lv'))/100;
        ratio = params.has('r') ? Number(params.get('r')) : ratio;
    }
    r_Value.nextElementSibling.textContent = `${((1/ratio) * 100).toFixed(0)}%`;
    r_Value.nextElementSibling.style.width = `${((1/ratio) * 100).toFixed(0)}%`;
    lv_Value.nextElementSibling.textContent = `${leadValue * 100}%`;
    lv_Value.nextElementSibling.style.width = `${leadValue * 100}%`;
    cr_Value.nextElementSibling.textContent = `${closeRatio * 100}%`;
    cr_Value.nextElementSibling.style.width = `${closeRatio * 100}%`;

    if(cleave.getRawValue()) {
        let CAC = cleave.getRawValue()/ratio;
        CAC_Value.value = `$${CAC.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
        let CPD = CAC * closeRatio;
        let MQL = CPD * leadValue;
        if(MQL > 200){
            emailCheckbox.checked = true;
            phoneCheckbox.checked = true;
            emailCheckbox.classList.remove('wrong');
            phoneCheckbox.classList.remove('wrong');

            MQL_Results.value = `$${MQL.toLocaleString(undefined, { maximumFractionDigits: 2 })} `;

        }else if(MQL < 200 && MQL > 25) {
            emailCheckbox.checked = true;
            emailCheckbox.classList.remove('wrong');

            phoneCheckbox.classList.add('wrong');
        MQL_Results.value = `$${MQL.toLocaleString(undefined, { maximumFractionDigits: 2 })} `;
        }else if(MQL < 25) {
            phoneCheckbox.classList.add('wrong');
            emailCheckbox.classList.add('wrong');
            MQL_Results.value = "Your CLV is to low";
        }
        if(params.has('s')) {
            if(params.get('s') === '1')  {
                MQL_Results.parentElement.parentElement.style.display = "none";
                let emailValue = (( 1 - openRate ) * MQL) * responseRate;
                let phoneValue = MQL * responseRate;
                emailOpens.value =`$${emailValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} `;
                phoneDials.value = `$${phoneValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} `;
                eventsBox.classList.remove('d-none');
            }
            
        }
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        setTimeout(showResults,1000);

    } else {
        showError('Please check your numbers');
    }
    
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
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}