let query = new URLSearchParams(location.search);

if(query.has('mql') && query.has('cpo') && query.has('cpd') &&  query.has('months') && query.has('closer_comission') && query.has('mql_payment')&& query.has('lv')&& query.has('closeRatio')&& query.has('ratio') && query.has('result') && query.has('lead') && query.has('payment')){

  
  

  // Query Variables
  let price = Number(query.get('mql')).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;
  let mql_payment = Number(query.get('mql_payment')).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;
  let closer_comission = Number(query.get('closer_comission')).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;
  let closer = Number(query.get('closer')).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;
  let cost_per_open = Number(query.get('cpo')).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;
  let cost_per_dial =  Number(query.get('cpd')).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;
  let payment_months = Number(query.get('months'));
  let lv = Number(query.get('lv')) * 100 ;
  let closeRatio = Number(query.get('closeRatio')) * 100 ;
  let ratio = ((1/ Number(query.get('ratio'))  ) * 100).toFixed(0) ;
  let cac = Number(query.get('cac')).toLocaleString(undefined, { maximumFractionDigits: 2 });
  let landed_deal = Number(query.get('landed_deal')).toLocaleString(undefined, { maximumFractionDigits: 2 });
  let phone = query.get('phone');
  let email = query.get('email');
  let result_toggler_status = query.get('result');
  let lead_toggler_status = query.get('lead');
  let payment_toggler_status = query.get('payment');

  //  Quote Cases
  
  if(result_toggler_status == 'true'  && lead_toggler_status == 'false' && payment_toggler_status == 'false'){

      // Lead Generation  with payment plan OFF
      //render graphs and setting data
      graphs(ratio , closeRatio , cac , phone , email);

      // Add Table row 
      add_row("Marketing Qualified Lead" , `$${price}` , 1 , `$${price}`);
      document.getElementById('total').textContent =  `$${price}`;

  }else if(result_toggler_status == 'true'  && lead_toggler_status == 'false' && payment_toggler_status == 'true'){

     // Lead Generation  with payment plan ON

    //render graphs and setting data
    graphs(ratio , closeRatio , cac , phone , email);

     add_row("Marketing Qualified Lead Payment Plan Pricing" , `$${mql_payment}` , payment_months , `$${price}`);
    document.getElementById('x-payments').textContent =  `${payment_months} Payments of $${mql_payment}`;
    document.getElementById('total').textContent =  `$${price}`;

  }else if (result_toggler_status == 'true'  && lead_toggler_status == 'true' && payment_toggler_status == 'false'){

      
      // Sales Closing  with payment plan OFF 

      //render graphs and setting data
      graphs(ratio , closeRatio , cac , phone , email);

      //calc mql  * 6 
      let months_total_price = (Number(price.replace(',','')) * 6).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;
      //calc total payment and closer comission
      let total = (Number(months_total_price.replace(',','')) + Number(closer_comission.replace(',',''))).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;

      add_row("Marketing Qualified Lead" , `$${price}`  , 6 , `$${months_total_price}` );
      add_row("Closed Deal" , `$${closer_comission}` , 1 , `$${closer_comission}`);
      document.getElementById('total').textContent = `$${total}`  ;
      
  }else if (result_toggler_status == 'true'  && lead_toggler_status == 'true' && payment_toggler_status == 'true'){

    // Sales Closing  with payment plan ON

    //render graphs and setting data
    graphs(ratio , closeRatio, cac , phone , email);


    let mql_months = (Number(mql_payment.replace(',','')) * payment_months).toLocaleString(undefined, { maximumFractionDigits: 2 }); 
    for( let i = 0; i < 20 ; i++){
      add_row("Marketing Qualified Lead Payment Plan" , `$${mql_payment}`  , payment_months , `$${mql_months}` );
    }
    //Calc Closer * payments months 
    let closer_months = (Number(closer.replace(',','')) * payment_months).toLocaleString(undefined, { maximumFractionDigits: 2 }); 
    add_row("Closed Sale Payment Plan" , `$${closer}` , payment_months , `$${closer_months}`);
    //calc total payment and closer 
    let total = ((Number(mql_months.replace(',','')) * 20 ) +  Number(closer_months.replace(',',''))).toLocaleString(undefined, { maximumFractionDigits: 2 }); 
    let total_payments = (Number(closer.replace(',','')) +  ( Number(mql_payment.replace(',','')) * 20)).toLocaleString(undefined, { maximumFractionDigits: 2 }); 
    document.getElementById('x-payments').textContent =  `${payment_months} Payments of $${total_payments}`;
    document.getElementById('total').textContent =  `$${total}`;
    
  }else if (result_toggler_status == 'false'  && lead_toggler_status == 'false' && payment_toggler_status == 'false') {
    // Priced Per Task
    //render graphs and setting data
    graphs(ratio , closeRatio , cac , phone , email);

    let total_cost_per_dial =  (Number(cost_per_dial.replace(',','')) * 400).toLocaleString(undefined, { maximumFractionDigits: 2 })  ;
    let total_cost_per_open =  (Number(cost_per_open.replace(',','')) * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })  ;
    
    if ($('#email').is(":checked") && $('#phone').is(":checked")){
      
      add_row("Cost Per Dial" , `$${cost_per_dial}` , 400 , `$${total_cost_per_dial}`);
      add_row("Cost Per Open" , `$${cost_per_open}` , 100 , `$${total_cost_per_open}`);
      let total = (Number(total_cost_per_dial.replace(',','')) + Number(total_cost_per_open.replace(',',''))).toLocaleString(undefined, { maximumFractionDigits: 2 });  
      document.getElementById('total').textContent =  `$${total}`;
    }else if ($('#email').is(":checked")){
      add_row("Cost Per Dial" , `N/A` , `N/A` , `N/A`);
      add_row("Cost Per Open" , `$${cost_per_open}` , 100 , `$${total_cost_per_open}`);
      document.getElementById('total').textContent =  `$${total_cost_per_open}`;
    }else {
      add_row("Cost Per Dial" , `$${cost_per_dial}` , 400 , `$${total_cost_per_dial}`);
      add_row("Cost Per Open" , `N/A` , `N/A` , `N/A`);
      document.getElementById('total').textContent =  `$${total_cost_per_dial}`;
    }
    
  }
  

}else{
  console.log("there are a missing query");
} 
function Campaign_Description () {
  if ($('#email').is(":checked") && $('#phone').is(":checked")){
    //set Compaign Description 
    $('#description').text('Phone & E-mail Campaign');

  }else if ($('#email').is(":checked")){
    // set Compaign Description 
    $('#description').text('E-mail Campaign Only');

  }else {
    // set Compaign Description 
    $('#description').text('Telemarketing Campaign Only');

  }
}

function graphs(ratio , closeRatio , cac , phone , email) {
  let graph = document.querySelectorAll('.graph');
  let p_checkBox = document.getElementById('phone');
  let e_checkBox = document.getElementById('email');
  graph[0].style.width = `${ratio}%`;
  graph[0].textContent = `${ratio}%`;
  document.getElementById('cac').value = `$${cac}`;

  if(phone === 'true' && email === 'true'){
    // both phone and email are enabled 
    p_checkBox.checked = true;
    e_checkBox.checked = true;
  }else if(phone === 'true' && email === 'false'){
    // phone enabled and email disabled
    p_checkBox.checked = true;
    e_checkBox.checked = false;
  }else {
    // phone disabled and email enabled
    p_checkBox.checked = false;
    e_checkBox.checked = true;
  }
  

  if(closeRatio > 5){
    graph[1].style.width = `${closeRatio}%`;
  }
  graph[1].textContent = `${closeRatio}%`;
  Campaign_Description ()
}

function add_row(disc , price , qty , total){
  let tableRows = document.createElement('tr');
  tableRows.innerHTML = `
                            <td class="col-4 text-1">${disc}</td>
                            <td class="col-1 text-center">${price}</td>
                            <td class="col-1 text-center">${qty}</td>
                            <td class="col-2 text-end">${total}</td>
                          `
  document.getElementById('main_table').appendChild(tableRows);
} 