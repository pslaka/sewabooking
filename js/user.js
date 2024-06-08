


/// list of Function
function myFunction() {
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.submit();
  }


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
