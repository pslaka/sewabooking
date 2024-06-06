
document.addEventListener('DOMContentLoaded', function() {
  const formElement = document.getElementById('my-form');
  const modalElement = document.getElementById('modal');
  const modalContent = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-head');
  const closeButton = document.getElementById('closeButton');
  const toggleButton = document.getElementById('modal-button');

  
  let step = 1;

  const showModal = () => {
    modalElement.classList.remove('hidden');
    modalElement.setAttribute('aria-hidden', 'false');

  };

  const hideModal = () => {
    modalElement.classList.add('hidden');
    modalElement.setAttribute('aria-hidden', 'true');
    step = 1;
  };
// const showModal = () => {
//     modalElement.classList.remove('hidden');
//     setTimeout(() => {
//       modalElement.classList.remove('translate-y-full');
//     }, 10);
//   };

//   const hideModal = () => {
//     modalElement.classList.add('translate-y-full');
//     setTimeout(() => {
//       modalElement.classList.add('hidden');
//     }, 300);
//     step = 1;
//   };

  formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(formElement); // build form data
    let type = formData.get('vehicle');
    let cc = formData.get('cc'); // get form field values
    let renew_date = formData.get('renew_date');
    let expiry_date_nepali = formData.get('expiry_date');
    let model = formData.get('age');
    let checked = document.getElementById('checked').checked;
    let paid = document.getElementById('paid').checked;
    console.log(checked)

    let current_date_nepali = NepaliFunctions.ConvertDateFormat(NepaliFunctions.GetCurrentBsDate(), "YYYY-MM-DD")
    let fiscal_year = [ '2080-04-01',  '2079-04-01',  '2078-04-01',  '2077-04-01',  '2076-04-01'];
    let charge = [0 , 0];    


      // converting string in JS date object
    const current_date = convertNepaliDateToJSDate(current_date_nepali);
    const expiry_date = convertNepaliDateToJSDate(expiry_date_nepali);
    const fiscal_year_80_81 = convertNepaliDateToJSDate(fiscal_year[0]);
    const fiscal_year_79_80 = convertNepaliDateToJSDate(fiscal_year[1]);
    const fiscal_year_78_79 = convertNepaliDateToJSDate(fiscal_year[2]);
    const fiscal_year_77_78 = convertNepaliDateToJSDate(fiscal_year[3]);
    const fiscal_year_76_77 = convertNepaliDateToJSDate(fiscal_year[4]);


         //Cheching if its two wheelers or four wheelers
      if( type == 2)
        {
            // Getting value from Function Calculate_current_tax an then return value in current-tax DOTM
            var current_tax = Calculate_Current_Tax(cc, expiry_date_nepali, current_date_nepali,paid);         
            var unpaid_tax = Calculate_Unpaid_Tax(cc, expiry_date_nepali,fiscal_year[0],fiscal_year[1],fiscal_year[2],fiscal_year[3],fiscal_year[4]);
            var tax_penalty = Calculate_Tax_Penalty(fiscal_year_80_81, unpaid_tax, expiry_date,current_tax,current_date);
            var model_charge= Calculate_Model_charge(model, current_tax);
            var renewal_charge = Calculate_Renewal_Charge(expiry_date,current_date,fiscal_year_80_81,fiscal_year_79_80,fiscal_year_78_79,fiscal_year_77_78);
            var renewal_fine = Calculate_Renewal_Fine(expiry_date,current_date,fiscal_year_80_81,fiscal_year_79_80,fiscal_year_78_79,fiscal_year);
            var service_charge = charge[0];
            var insurance = Calculate_insurance(cc,checked);
            var total_bill = current_tax + unpaid_tax + tax_penalty + model_charge + renewal_charge + renewal_fine + charge[0] + insurance;
        }else{

            // document.getElementById('seats').required = true; 
            console.log('This section for Four Wheelers');
            //service charge
            document.getElementById('charge').innerHTML = 'Rs ' + charge[1];
        }
    modalTitle.innerText = 'Submission Result';
    modalContent.innerHTML = `
         <table class="shadow-xl w-full">
                <thead class="border-b-2 border-black font-bold py-2 ">
                        <td class="px-6 py-3">Particulars</td>
                        <td class="px-6 py-3">Amount</td>
                </thead>
                <tr class=" hover:bg-gray-100">
                        <td class="px-6 py-1">Model (Old Age Tax)</td>
                        <td class="px-6 py-1" id="model-charge">Rs  ${model_charge}</td>
                </tr>
                <tr class=" bg-gray-200 hover:bg-gray-100">
                        <td class="px-6 py-1">Model Fine</td>
                        <td class="px-6 py-1" id="model-fine"></td>
                </tr>
                <tr class=" hover:bg-gray-100">
                        <td class="px-6 py-1">Unpaid Tax</td>
                        <td class="px-6 py-1" id="unpaidtax"></td>
                </tr>
                <tr class=" bg-gray-200 hover:bg-gray-100">
                        <td class="px-6 py-1">Unpaid Tax Penalty</td>
                        <td class="px-6 py-1" id="tax-penalty"></td>
                </tr>
                <tr class=" hover:bg-gray-100">
                        <td class="px-6 py-1">Renewal Fine</td>
                        <td class="px-6 py-1" id="renewal-fine"></td>
                </tr>
                <tr class=" bg-gray-200 hover:bg-gray-100">
                        <td class="px-6 py-1">Renewal Charge</td>
                        <td class="px-6 py-1" id="renewal-charge"></td>
                </tr>
                <tr class=" hover:bg-gray-100">
                        <td class="px-6 py-1">Current Tax</td>
                        <td class="px-6 py-1" id="current-tax"></td>
                </tr>

                <tr class=" bg-gray-200 hover:bg-gray-100">
                        <td class="px-6 py-1">Service Charge</td>
                        <td class="px-6 py-1" id="charge"></td>
                </tr>
                <tr class=" hover:bg-gray-100">
                        <td class="px-6 py-1">Third-Party Insurance Charge</td>
                        <td class="px-6 py-1" id="insurance"></td>
                </tr>
                <thead class="border-t-[1px] border-black font-bold">
                        <td class="px-6 py-3">Total Bill Amount</td>
                        <td class="px-6 py-3" id="totalamt"> </td>
                </thead>
                </table>       
           `;
    showModal();
  });

  toggleButton.addEventListener('click', function() {
    if (step === 1) {
      modalTitle.innerText = 'Register';
      modalContent.innerHTML = `
        <form id="registrationForm">
          <div class="mb-4">
            <label for="username" class="block text-gray-700">Username:</label>
            <input type="text" id="username" class="mt-2 p-2 border border-gray-300 rounded w-full" >
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email:</label>
            <input type="email" id="email" class="mt-2 p-2 border border-gray-300 rounded w-full" >
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700">Password:</label>
            <input type="password" id="password" class="mt-2 p-2 border border-gray-300 rounded w-full" >
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </form>`;
      toggleButton.innerText = 'Submit';
      step++;
    } else if (step === 2) {
      const registrationForm = document.getElementById('registrationForm');
      registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log({ username, email, password });
        modalTitle.innerText = 'QR Code';
        modalContent.innerHTML = `
          <div class="flex justify-center items-center h-full">
            <img src="https://via.placeholder.com/150" alt="QR Code" class="w-32 h-32">
          </div>`;
        toggleButton.innerText = 'Close';
        step++;
      });
    } else if (step === 3) {
      hideModal();
    }
  });

  closeButton.addEventListener('click', hideModal);
});





/// list of Function



  // Helper function to convert Nepali date string to JavaScript Date object
  function convertNepaliDateToJSDate(nepaliDateStr) {
    // Example conversion assuming the format is 'YYYY-MM-DD'
    const [year, month, day] = nepaliDateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // JavaScript Date months are 0-indexed
  }

  function js_days_diff(datestr1,datestr2)
  {
        var minus = Math.abs(datestr1 - datestr2);
        const diffDays = Math.ceil(minus / (1000 * 60 * 60 * 24));
        return diffDays;
  }


  function Calculate_Current_Tax(cc, expiry_date, current_date,paid) {

    if(paid === true)
        {
            return 0;
        }  else if (expiry_date > current_date) {
            return 0;
        } else {
            if (cc <= 125) {
                return 3000;
            } else if (cc <= 150) {
                return 5000;
            } else if (cc <= 225) {
                return 6500;
            } else if (cc <= 400) {
                return 12000;
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

    // const differenceInDays = NepaliFunctions.BsDatesDiff(current_date,expiry_date); // Difference in days
    const differenceInDays = js_days_diff(current_date,expiry_date);
    let result = 0;

    if (expiry_date < current_fiscalyear) {
        result += 0.32 * unpaid_tax;
    }

    if (differenceInDays >= 140) {
        result += 0.20 * current_tax;
    } else if (differenceInDays >= 110) {
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





function Calculate_Renewal_Charge(expiry_date,current_date, fy0,fy1,fy2,fy3,fy4) {
        var amount = 0;
    
        if (expiry_date > current_date) {
            amount += 0;
        } else {
            if (expiry_date < fy3) {
                amount += 800;
            } else if (expiry_date < fy2) {
                amount += 700;
            } else if (expiry_date < fy1) {
                amount += 600;
            } else if (expiry_date < fy0) {
                amount += 300;
            }
        }
    
        // Adding the result of the first condition to the result of the second condition
        amount += (expiry_date <= current_date) ? 300 : 0;
    
        return amount;
    }


function Calculate_Renewal_Fine(expiry_date,current_date, fy0,fy1,fy2,fy3,fy4) {
        // var daysDifference = NepaliFunctions.BsDatesDiff(current_date,expiry_date);
        var daysDifference = js_days_diff(current_date,expiry_date);
        console.log(daysDifference)
        var amount = 0;
    
        if (daysDifference >= 90) {
            amount += 300;
        }
    
        if (expiry_date < fy3) {
            amount += 800;
        } else if (expiry_date < fy2) {
            amount += 700;
        } else if (expiry_date < fy1) {
            amount += 600;
        } else if (expiry_date < fy0) {
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
