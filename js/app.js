

//to trigger thr my-form div for input and popup div for output
document.addEventListener('DOMContentLoaded', e => {
  let formElement = document.getElementById('my-form');
//   let resultDiv = document.getElementById('popup');




  //to prevent from form submitting  
  formElement.addEventListener('submit', e => {
      e.preventDefault();
      // getting field value by name
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
      let charge =[250 , 350];    


        // converting string in JS date object
      const current_date = convertNepaliDateToJSDate(current_date_nepali);
      const expiry_date = convertNepaliDateToJSDate(expiry_date_nepali);
      const fiscal_year_80_81 = convertNepaliDateToJSDate(fiscal_year[0]);
      const fiscal_year_79_80 = convertNepaliDateToJSDate(fiscal_year[1]);
      const fiscal_year_78_79 = convertNepaliDateToJSDate(fiscal_year[2]);
      const fiscal_year_77_78 = convertNepaliDateToJSDate(fiscal_year[3]);
      const fiscal_year_76_77 = convertNepaliDateToJSDate(fiscal_year[4]);

      console.log('current dates',current_date );
      var timestampDifference = NepaliFunctions.BsDatesDiff(current_date_nepali,expiry_date_nepali);
      console.log('difference :',timestampDifference);


      // //Cheching if its two wheelers or four wheelers
      // if( type == 2)
      //   {
      //       // Getting value from Function Calculate_current_tax an then return value in current-tax DOTM
      //       var current_tax = Calculate_Current_Tax(cc, expiry_date_nepali, current_date_nepali,paid);
      //       console.log('Current Tax',current_tax);
      //       document.getElementById('current-tax').innerHTML = 'Rs '+ current_tax; // put your results where they need to be

      //       // Getting value from Function Calculate_unpaid_Tax an then return value in unpaid-tax DOTM
      //       var unpaid_tax = Calculate_Unpaid_Tax(cc, expiry_date_nepali,fiscal_year[0],fiscal_year[1],fiscal_year[2],fiscal_year[3],fiscal_year[4]);
      //       console.log('Current unpaid-tax',unpaid_tax);
      //       document.getElementById('unpaidtax').innerHTML = 'Rs '+ unpaid_tax;

      //       // Getting value from Function Calculate_unpaid_Tax an then return value in unpaid-tax DOTM
      //       var tax_penalty = Calculate_Tax_Penalty(fiscal_year_80_81, unpaid_tax, expiry_date,current_tax,current_date);
      //       console.log('Tax-Penalty',tax_penalty);
      //       document.getElementById('tax-penalty').innerHTML ='Rs ' +  tax_penalty;

      //       // Getting value from Function Calculate_Model_charege an then return value in  DOTM
      //       var model_charge= Calculate_Model_charge(model, current_tax);
      //       console.log('Model charge',model_charge);
      //       document.getElementById('model-charge').innerHTML = 'Rs ' + model_charge.toFixed(0);
            
      //       // Getting value from Function Calculate_Renewal_charge an then return value in  DOTM
      //       // var renewal_charge = Calculate_Renewal_Charge(expiry_date,current_date);
      //       // console.log('renewal Charge',renewal_charge);
      //       // document.getElementById('renewal-charge').innerHTML = 'Rs ' + renewal_charge;

      //       // Getting value from Function Calculate_Renewal_charge an then return value in  DOTM (passing date format)
      //       var renewal_charge = Calculate_Renewal_Charge(expiry_date,current_date,fiscal_year_80_81,fiscal_year_79_80,fiscal_year_78_79,fiscal_year_77_78);
      //       console.log('renewal Charge',renewal_charge);
      //       document.getElementById('renewal-charge').innerHTML = 'Rs ' + renewal_charge;

      //       // Getting value from Function Calculate_Renewal_charege an then return value in  DOTM
      //       var renewal_fine = Calculate_Renewal_Fine(expiry_date,current_date,fiscal_year_80_81,fiscal_year_79_80,fiscal_year_78_79,fiscal_year);
      //       console.log('renewal fine',renewal_fine);
      //       document.getElementById('renewal-fine').innerHTML = 'Rs ' + renewal_fine;

      //       //service charge
      //       document.getElementById('charge').innerHTML = 'Rs ' + charge[0];

      //       // Getting value from Function Calculate_insurance an then return value in  DOTM
      //       var insurance = Calculate_insurance(cc,checked);
      //       console.log('insurance',insurance);
      //       document.getElementById('insurance').innerHTML = 'Rs ' + insurance;

      //       // calculate total bill amt
      //       var total_bill =current_tax + unpaid_tax + tax_penalty + model_charge + renewal_charge + renewal_fine + charge[0] + insurance;
      //       var total_amt ='Rs ' + total_bill;
      //       document.getElementById('totalamt').innerHTML = total_amt;

      //   }else{

      //       // document.getElementById('seats').required = true; 
      //       console.log('This section for Four Wheelers');
      //       //service charge
      //       document.getElementById('charge').innerHTML = 'Rs ' + charge[1];
      //   }


  


        

  });




  
});
