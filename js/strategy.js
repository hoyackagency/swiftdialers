const s = document.querySelector('input[name=s]:checked');
const closeRatio = document.getElementById('closeRatio');
const leadValue = document.getElementById('lv');



document.getElementById('form').addEventListener('submit', submitForm);

function submitForm(e) {

    e.preventDefault();
    let strategy_name;
    let switchInput = document.querySelector('input[name=s]');
    if(switchInput.checked){
        strategy_name = "2";
    }else{
        strategy_name = "1";
    }
    window.location.href = `index.html?s=${strategy_name}&cr=${closeRatio.value}&lv=${leadValue.value}`
}