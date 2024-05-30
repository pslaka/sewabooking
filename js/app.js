
//to trigger thr my-form div for input and popup div for output
document.addEventListener('DOMContentLoaded', e => {
  let formElement = document.getElementById('my-form');
  let resultDiv = document.getElementById('popup');

  //to prevent from form submitting  
  formElement.addEventListener('submit', e => {
      e.preventDefault();
      // getting field value by name
      let formData = new FormData(formElement); // build form data
      let type = formData.get('vehicle');
      let cc = formData.get('cc'); // get form field values
      let renew_date = formData.get('renew_date');
      let expiry_date = formData.get('expiry_date');
      let model = formData.get('age');
      let checked = document.getElementById('checked').checked;
      console.log(checked)

      let current_date = NepaliFunctions.ConvertDateFormat(NepaliFunctions.GetCurrentBsDate(), "YYYY-MM-DD")
      let fiscal_year = [ '2080-04-01',  '2079-04-01',  '2078-04-01',  '2077-04-01',  '2076-04-01'];
      let charge =[200 , 300];

      //Cheching if its two wheelers or four wheelers
      if( type == 2)
        {
            // Getting value from Function Calculate_current_tax an then return value in current-tax DOTM
            var current_tax = Calculate_Current_Tax(cc, expiry_date, current_date);
            console.log('Current Tax',current_tax);
            document.getElementById('current-tax').innerHTML = 'Rs '+ current_tax; // put your results where they need to be

            // Getting value from Function Calculate_unpaid_Tax an then return value in unpaid-tax DOTM
            var unpaid_tax = Calculate_Unpaid_Tax(cc, expiry_date, fiscal_year[0], fiscal_year[1], fiscal_year[2], fiscal_year[3]);
            console.log('Current unpaid-tax',unpaid_tax);
            document.getElementById('unpaidtax').innerHTML = 'Rs '+ unpaid_tax;

            // Getting value from Function Calculate_unpaid_Tax an then return value in unpaid-tax DOTM
            var tax_penalty = Calculate_Tax_Penalty(fiscal_year[0], unpaid_tax, expiry_date, current_tax,current_date);
            console.log('Tax-Penalty',tax_penalty);
            document.getElementById('tax-penalty').innerHTML ='Rs ' +  tax_penalty;

            // Getting value from Function Calculate_Model_charege an then return value in  DOTM
            var model_charge= Calculate_Model_charge(model, current_tax);
            console.log('Model charge',model_charge);
            document.getElementById('model-charge').innerHTML = 'Rs ' + model_charge;
            
            // Getting value from Function Calculate_Renewal_charge an then return value in  DOTM
            var renewal_charge = Calculate_Renewal_Charge(expiry_date,current_date);
            console.log('renewal Charge',renewal_charge);
            document.getElementById('renewal-charge').innerHTML = 'Rs ' + renewal_charge;

            // Getting value from Function Calculate_Renewal_charege an then return value in  DOTM
            var renewal_fine = Calculate_Renewal_Fine(expiry_date,current_date);
            console.log('renewal fine',renewal_fine);
            document.getElementById('renewal-fine').innerHTML = 'Rs ' + renewal_fine;

            //service charge
            document.getElementById('charge').innerHTML = 'Rs ' + charge[0];

            // Getting value from Function Calculate_insurance an then return value in  DOTM
            var insurance = Calculate_insurance(cc,checked);
            console.log('insurance',insurance);
            document.getElementById('insurance').innerHTML = 'Rs ' + insurance;

            // calculate total bill amt
            var total_bill =current_tax + unpaid_tax + tax_penalty + model_charge + renewal_charge + renewal_fine + charge[0] + insurance;
            var total_amt ='Rs ' + total_bill;
            document.getElementById('totalamt').innerHTML = total_amt;

        }else{
            document.getElementById('seats').style.required; 
            console.log('This section for Four Wheelers');
            //service charge
            document.getElementById('charge').innerHTML = 'Rs ' + charge[1];
        }


        console.log('current dates',current_date );
        var timestampDifference = NepaliFunctions.BsDatesDiff(current_date,expiry_date);
        console.log('difference :',timestampDifference);

        // //to close popup while click outside of box
        // window.addEventListener("click" , (event) => {
        //     if (!popup.contains(event.target))  {
        //         popup.style.display = "none";
        //         //to reset the form data
                
        //     }
        // })
        document.getElementById('my-form').reset();
   
        

  });


  function Calculate_Current_Tax(cc, expiry_date, current_date) {
    if (expiry_date > current_date) {
        return 0;
    } else {
        if (cc <= 125) {
            return 3000;
        } else if (cc <= 150) {
            return 5000;
        } else if (cc <= 225) {
            return 6500;
        } else if (cc <= 400) {
            return 12500;
        } else if (cc <= 650) {
            return 25000;
        } else {
            return 35000;
        }
    }
  }

  function Calculate_Unpaid_Tax(cc, expiry_date, a, b, c, d) {
    if (cc <= 125) {
        if (expiry_date < d) {
            return 11550;
        } else if (expiry_date < c) {
            return 8800;
        } else if (expiry_date < b) {
            return 6000;
        } else if (expiry_date < a) {
            return 3000;
        } else {
            return 0;
        }
    } else if (cc <= 150) {
        if (expiry_date < d) {
            return 18900;
        } else if (expiry_date < c) {
            return 14500;
        } else if (expiry_date < b) {
            return 10000;
        } else if (expiry_date < a) {
            return 5000;
        } else {
            return 0;
        }
    } else if (cc <= 225) {
        if (expiry_date < d) {
            return 27300;
        } else if (expiry_date < c) {
            return 18500;
        } else if (expiry_date < b) {
            return 13000;
        } else if (expiry_date < a) {
            return 6500;
        } else {
            return 0;
        }
    } else if (cc <= 400) {
        if (expiry_date < d) {
            return 39800;
        } else if (expiry_date < c) {
            return 31000;
        } else if (expiry_date < b) {
            return 22000;
        } else if (expiry_date < a) {
            return 11000;
        } else {
            return 0;
        }
    } else {
        if (expiry_date < d) {
            return 76500;
        } else if (expiry_date < c) {
            return 60000;
        } else if (expiry_date < b) {
            return 40000;
        } else if (expiry_date < a) {
            return 20000;
        } else {
            return 0;
        }
    }
  }

  function Calculate_Tax_Penalty(current_fiscalyear, unpaid_tax, expiry_date, current_tax,current_date) {

    const differenceInDays = NepaliFunctions.BsDatesDiff(current_date,expiry_date); // Difference in days
    let result = 0;

    if (expiry_date < current_fiscalyear) {
        result += 0.32 * unpaid_tax;
    }

    if (differenceInDays >= 170) {
        result += 0.20 * current_tax;
    } else if (differenceInDays >= 124) {
        result += 0.10 * current_tax;
    } else if (differenceInDays >= 90) {
        result += 0.05 * current_tax;
    }

    return result;
  }

  function Calculate_Model_charge(model, current_tax) {
    let date_in_AD = new Date().getFullYear();
    var yearsDifference = date_in_AD - model;
    // var today = 
    var percentage = 0;

    if (yearsDifference === 15) {
        percentage = 0.05 * current_tax;
    } else if (yearsDifference === 16) {
        percentage = 0.1 * current_tax;
    } else if (yearsDifference === 17) {
        percentage = 0.15 * current_tax;
    } else if (yearsDifference === 18) {
        percentage = 0.2 * current_tax;
    } else if (yearsDifference === 19) {
        percentage = 0.25 * current_tax;
    } else if (yearsDifference === 20) {
        percentage = 0.3 * current_tax;
    } else if (yearsDifference === 21) {
        percentage = 0.35 * current_tax;
    } else if (yearsDifference === 22) {
        percentage = 0.4 * current_tax;
    } else if (yearsDifference === 23) {
        percentage = 0.45 * current_tax;
    } else if (yearsDifference === 24) {
        percentage = 0.5 * current_tax;
    } else if (yearsDifference === 25) {
        percentage = 0.55 * current_tax;
    } else if (yearsDifference === 26) {
        percentage = 0.6 * current_tax;
    } else if (yearsDifference === 27) {
        percentage = 0.65 * current_tax;
    } else if (yearsDifference === 28) {
        percentage = 0.7 * current_tax;
    } else if (yearsDifference === 29) {
        percentage = 0.75 * current_tax;
    } else if (yearsDifference === 30) {
        percentage = 0.8 * current_tax;
    } else if (yearsDifference === 31) {
        percentage = 0.85 * current_tax;
    } else if (yearsDifference === 32) {
        percentage = 0.9 * current_tax;
    } else if (yearsDifference === 33) {
        percentage = 0.95 * current_tax;
    } else if (yearsDifference >= 34) {
        percentage = current_tax;
    }

    return percentage;
 }


function Calculate_Renewal_Charge(expiry_date,current_date) {
    var diffDays = NepaliFunctions.BsDatesDiff(current_date,expiry_date);
    var amount = 0;

    if (expiry_date > current_date) {
        amount += 0;
    } else {
        if (diffDays > 1460) {
            amount += 800;
        } else if (diffDays > 1095) {
            amount += 700;
        } else if (diffDays > 370) {
            amount += 600;
        } else if (diffDays > 365) {
            amount += 300;
        }
    }

    // Adding the result of the first condition to the result of the second condition
    amount += (expiry_date <= current_date) ? 300 : 0;

    return amount;
}


function Calculate_Renewal_Fine(expiry_date,current_date) {
    var daysDifference = NepaliFunctions.BsDatesDiff(current_date,expiry_date);
    var amount = 0;

    if (daysDifference >= 93) {
        amount += 300;
    }

    if (daysDifference > 1460) {
        amount += 800;
    } else if (daysDifference > 1095) {
        amount += 700;
    } else if (daysDifference > 370) {
        amount += 600;
    } else if (daysDifference > 365) {
        amount += 300;
    }

    return amount;
}
function Calculate_insurance(cc,checked) {
    if (checked === true) {
        if (cc < 150) {
            return 1705;
        } else if (cc <= 250) {
            return 1931;
        } else if (cc > 250) {
            return 2157;
        }
    } else {
        return 0;
    }
}




  
});
