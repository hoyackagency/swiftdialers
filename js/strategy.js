const s = document.querySelector('input[name=s]:checked');
document.getElementById('form').addEventListener('submit', submitForm);
function submitForm(e) {
    e.preventDefault();
    const closeRatio = document.querySelector('input[name=cr]:checked');
    const leadValue = document.querySelector('input[name=lv]:checked');
    let strategy_name;
    let switchInput = document.querySelector('input[name=s]');
    if(switchInput.checked){
        strategy_name = "2";
    }else{
        strategy_name = "1";
    }
    window.location.href = `index.html?s=${strategy_name}&cr=${closeRatio.value}&lv=${leadValue.value}`
}