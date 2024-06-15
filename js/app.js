
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
    setTimeout(() => {
      modalElement.classList.remove('translate-y-full', 'opacity-0');
      modalElement.classList.add('-translate-y-0', 'opacity-100');
    }, 10);
  };

  const hideModal = () => {
    modalElement.classList.remove('translate-y-0', 'opacity-100');
    modalElement.classList.add('translate-y-full', 'opacity-0');
    setTimeout(() => {
      modalElement.classList.add('hidden');
      step = 1;
      toggleButton.innerText = 'Procced To Payment';
    }, 300); // Match the duration with the transition duration
  };


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

    
    modalTitle.innerText = 'Vehicle tax Details';
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
                        <td class="px-6 py-1" id="model-fine">Rs </td>
                </tr>
                <tr class=" hover:bg-gray-100">
                        <td class="px-6 py-1">Unpaid Tax</td>
                        <td class="px-6 py-1" id="unpaidtax">Rs ${unpaid_tax}</td>
                </tr>
                <tr class=" bg-gray-200 hover:bg-gray-100">
                        <td class="px-6 py-1">Unpaid Tax Penalty</td>
                        <td class="px-6 py-1" id="tax-penalty">Rs ${tax_penalty}</td>
                </tr>
                <tr class=" hover:bg-gray-100">
                        <td class="px-6 py-1">Renewal Fine</td>
                        <td class="px-6 py-1" id="renewal-fine">Rs ${renewal_fine}</td>
                </tr>
                <tr class=" bg-gray-200 hover:bg-gray-100">
                        <td class="px-6 py-1">Renewal Charge</td>
                        <td class="px-6 py-1" id="renewal-charge">Rs ${renewal_charge}</td>
                </tr>
                <tr class=" hover:bg-gray-100">
                        <td class="px-6 py-1">Current Tax</td>
                        <td class="px-6 py-1" id="current-tax">Rs ${current_tax}</td>
                </tr>

                <tr class=" bg-gray-200 hover:bg-gray-100">
                        <td class="px-6 py-1">Service Charge</td>
                        <td class="px-6 py-1" id="charge">Rs ${service_charge}</td>
                </tr>
                <tr class=" hover:bg-gray-100">
                        <td class="px-6 py-1">Third-Party Insurance Charge</td>
                        <td class="px-6 py-1" id="insurance">Rs ${insurance}</td>
                </tr>
                <thead class="border-t-[1px] border-black font-bold">
                        <td class="px-6 py-3">Total Bill Amount</td>
                        <td class="px-6 py-3" id="totalamt">Rs ${total_bill}</td>
                </thead>
                </table>       
           `;
    showModal();
  });
  if (step === 2) {
    // Display the QR code after the form submission
    modalTitle.innerText = 'QR Code';
    modalContent.innerHTML = `
      <div class="flex justify-center items-center h-full">
        <img src="https://via.placeholder.com/150" alt="QR Code" class="w-32 h-32">
      </div>`;
    toggleButton.innerText = 'Close';
    step++;
    showModal();
  }

  toggleButton.addEventListener('click', function() {
    console.log('Toggle Button Clicked:', step);
    if (step === 1) {
      modalTitle.innerText = 'Form Fill Up';
      modalContent.innerHTML = `
          <form  id="registrationForm" class="max-w-xl w-full mx-auto " action="https://pslaka.github.io/register" method="post">
                <div class="grid md:grid-cols-2 md:gap-3">
                    <div class="flex flex-col  w-full font-medium">
                        <label for="full_name" class="py-2">Full Name <span class="text-red-600">*</span></label>                    
                        <input type="text" name="full_name" id="full_name" placeholder="Full Name"  value="" class="px-2 py-1.5 text-gray-500 border border-gray-400 rounded-lg bg-gray-50 focus:border-purple-700 focus:ring-0 ring-offset-0 sm:text-sm sm:leading-6 hover:border-purple-800 hover:shadow-md hover:shadow-purple-400 ease-out duration-300" required >
                    </div>
                    <div class="flex flex-col  w-full font-medium">
                        <label for="vehicle_number" class="py-2">Vehicle Number <span class="text-red-600">*</span></label>                    
                        <input type="text" name="vehicle_number" id="vehicle_number" placeholder="Eg: ba 12 pa 1234"  value="" class="px-2 py-1.5 text-gray-500 border border-gray-400 rounded-lg bg-gray-50 focus:border-purple-700 focus:ring-0 ring-offset-0 sm:text-sm sm:leading-6 hover:border-purple-800 hover:shadow-md hover:shadow-purple-400 ease-out duration-300" required>
                    </div>
                    <div class="flex flex-col  w-full font-medium">
                        <label for="vehicle" class="py-2">Type of Vehicle</label>
                        <!-- <input type="text" placeholder="Name" class="rounded-md py-1.5 pl-2 pr-2 text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-purple-600 sm:text-sm sm:leading-6" > -->
                        <select name="vehicle" id="vehicle" class="px-2 py-1.5 text-gray-500 border border-gray-400 rounded-lg bg-gray-50 focus:border-purple-700 focus:ring-0 ring-offset-0 sm:text-sm sm:leading-6 hover:border-purple-800 hover:shadow-md hover:shadow-purple-400 ease-out duration-300" >
                            <option selected value="2">Two Wheelers</option>
                            <option value="4">Four Wheelers</option>
                        </select>                     
                    </div> 
                    <div class="flex flex-col  w-full font-medium">
                        <label for="email" class="py-2">Email <span class="text-red-600">*</span></label>                    
                        <input type="email" name="email" id="email" placeholder="@gmail.com"  value="" class="px-2 py-1.5 text-gray-500 border border-gray-400 rounded-lg bg-gray-50 focus:border-purple-700 focus:ring-0 ring-offset-0 sm:text-sm sm:leading-6 hover:border-purple-800 hover:shadow-md hover:shadow-purple-400 ease-out duration-300" required >
                    </div>
                    <div class="flex flex-col  w-full font-medium">
                        <label for="address" class="py-2">Address <span class="text-red-600">*</span></label>                    
                        <input type="text" name="address" id="address" placeholder="Your location"  value="" class="px-2 py-1.5 text-gray-500 border border-gray-400 rounded-lg bg-gray-50 focus:border-purple-700 focus:ring-0 ring-offset-0 sm:text-sm sm:leading-6 hover:border-purple-800 hover:shadow-md hover:shadow-purple-400 ease-out duration-300" required >
                    </div>
                    <div class="flex flex-col  w-full font-medium">
                        <label for="phone_number" class="py-2">Phone Number <span class="text-red-600">*</span></label>                    
                        <input type="number" name="phone_number" id="phone_number" placeholder="Your Contact Number "  value="" class="px-2 py-1.5 text-gray-500 border border-gray-400 rounded-lg bg-gray-50 focus:border-purple-700 focus:ring-0 ring-offset-0 sm:text-sm sm:leading-6 hover:border-purple-800 hover:shadow-md hover:shadow-purple-400 ease-out duration-300" >
                    </div>
                          
                  <div class="flex justify-center items-center p-3 border-t border-gray-200 rounded-b col-span-1 md:col-span-2">  
                    <button id="modal-button"  type="submit" class="text-white bg-purple-500 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ease-in-out duration-200">Register</button>
                </div>                
              </div>
          </form>`;
        toggleButton.classList.add('hidden');
      

      //form submission and handler (registrationForm)
      const registrationForm = document.getElementById('registrationForm');
      registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(document.getElementById('registrationForm'));
        // const formObject = {};
        //       formData.forEach((value, key) => {
        //         formObject[key] = value;
        //       });
        //       // console.log(formData);
        //       console.log(formObject)
        try {
          const response = await fetch('/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.text();
          console.log('Server Response:', data);
            //if form success on submission then it will go on next step 
          modalTitle.innerText = 'QR Code';
          modalContent.innerHTML = `
            <div class="flex justify-center items-center h-full">
              <img src="https://via.placeholder.com/150" alt="QR Code" class="w-32 h-32">
            </div>`;
          toggleButton.innerText = 'Close';
          toggleButton.classList.remove('hidden');
          step++;
        } catch (error) {
          console.error('Error submitting form:', error.message || error);
          alert('Error submitting form. Please try again.');
        }
            
      }); 
                
    } else if (step === 2) {
      
      hideModal();
    }
  });
  closeButton.addEventListener('click', hideModal);

});
