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
  let result_toggler_status = query.get('result');
  let lead_toggler_status = query.get('lead');
  let payment_toggler_status = query.get('payment');

  //  Quote Cases
  
  if(result_toggler_status == 'true'  && lead_toggler_status == 'false' && payment_toggler_status == 'false'){

      // Lead Generation  with payment plan OFF
      // Add Table row 
      add_row("Marketing Qualified Lead" , `$${price}` , 1 , `$${price}`);
      document.getElementById('total').textContent =  `$${price}`;
      grahps(ratio , closeRatio,lv);
  }else if(result_toggler_status == 'true'  && lead_toggler_status == 'false' && payment_toggler_status == 'true'){

     // Lead Generation  with payment plan ON
     add_row("Marketing Qualified Lead Payment Plan Pricing" , `$${mql_payment}` , payment_months , `$${price}`);
    document.getElementById('total-title').textContent =  `${payment_months} Payments of`;
    document.getElementById('total').textContent =  `$${mql_payment}`;
    grahps(ratio , closeRatio,lv);
  }else if (result_toggler_status == 'true'  && lead_toggler_status == 'true' && payment_toggler_status == 'false'){

      
      // Sales Closing  with payment plan OFF 
      //calc mql  * 6 
      let months_total_price = (Number(price.replace(',','')) * 6).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;
      //calc total payment and closer comission
      let total = (Number(months_total_price.replace(',','')) + Number(closer_comission.replace(',',''))).toLocaleString(undefined, { maximumFractionDigits: 2 }) ;

      add_row("Marketing Qualified Lead" , `$${price}`  , 6 , `$${months_total_price}` );
      add_row("Closed Deal" , `$${closer_comission}` , 1 , `$${closer_comission}`);
      document.getElementById('total').textContent = `$${total}`  ;
      grahps(ratio , closeRatio,lv);
  }else if (result_toggler_status == 'true'  && lead_toggler_status == 'true' && payment_toggler_status == 'true'){

    // Sales Closing  with payment plan ON
    let mql_months = (Number(mql_payment.replace(',','')) * payment_months).toLocaleString(undefined, { maximumFractionDigits: 2 }); 
    for( let i = 0; i < 20 ; i++){
      add_row("Marketing Qualified Lead Payment Plan" , `$${mql_payment}`  , payment_months , `$${mql_months}` );
    }
    //Calc Closer * payments months 
    let closer_months = (Number(closer.replace(',','')) * payment_months).toLocaleString(undefined, { maximumFractionDigits: 2 }); 
    add_row("Closed Sale Payment Plan" , `$${closer}` , payment_months , `$${closer_months}`);
    //calc total payment and closer 
    let total = (Number(closer.replace(',','')) +  ( Number(mql_payment.replace(',','')) * 20)).toLocaleString(undefined, { maximumFractionDigits: 2 }); 
    document.getElementById('total-title').textContent =  `${payment_months} Payments of`;
    document.getElementById('total').textContent =  `$${total}`;
    grahps(ratio , closeRatio,lv);
  }else if (result_toggler_status == 'false'  && lead_toggler_status == 'false' && payment_toggler_status == 'false') {
    // Priced Per Task
    let total_cost_per_dial =  (Number(cost_per_dial.replace(',','')) * 400).toLocaleString(undefined, { maximumFractionDigits: 2 })  ;
    let total_cost_per_open =  (Number(cost_per_open.replace(',','')) * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })  ;
    add_row("Cost Per Dial" , `$${cost_per_dial}` , 400 , `$${total_cost_per_dial}`);
    add_row("Cost Per Open" , `$${cost_per_open}` , 100 , `$${total_cost_per_open}`);
    let total = (Number(total_cost_per_dial.replace(',','')) + Number(total_cost_per_open.replace(',',''))).toLocaleString(undefined, { maximumFractionDigits: 2 });  
    document.getElementById('total').textContent =  `$${total}`;
    grahps(ratio , closeRatio,lv);
  }
  

}else{
  console.log("there are a missing query");
} 
function grahps(ratio , closeRatio,lv) {
  let graph = document.querySelectorAll('.graph');
  graph[0].style.width = `${ratio}%`;
  graph[0].textContent = `${ratio}%`;
  

  if(closeRatio > 5){
    graph[1].style.width = `${closeRatio}%`;
  }
  graph[1].textContent = `${closeRatio}%`;
  
  graph[2].style.width = `${lv}%`;
  graph[2].textContent = `${lv}%`;
}
function add_row(disc , price , qty , total){
  let tableRows = document.createElement('tr');
  tableRows.innerHTML = `
                            <td class="col-4 text-1">${disc}</td>
                            <td class="col-1 text-center">${price}</td>
                            <td class="col-1 text-center">${qty}</td>
                            <td class="col-2 text-end">${total}</td>
                          `
  document.querySelector('tbody').appendChild(tableRows);
} 