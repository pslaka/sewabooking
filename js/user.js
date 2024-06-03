
// document.addEventListener('DOMContentLoaded', function() {
//   const formElement = document.getElementById('my-form');
//   const modalElement = document.getElementById('modal');
//   const modalContent = document.getElementById('modalContent');
//   const modalTitle = document.getElementById('modalTitle');
//   const closeButton = document.getElementById('closeButton');
//   const toggleButton = document.getElementById('toggleContent');

  
//   let step = 1;

//   const showModal = () => {
//     modalElement.classList.remove('hidden');
//   };

//   const hideModal = () => {
//     modalElement.classList.add('hidden');
//     step = 1;
//   };
// // const showModal = () => {
// //     modalElement.classList.remove('hidden');
// //     setTimeout(() => {
// //       modalElement.classList.remove('translate-y-full');
// //     }, 10);
// //   };

// //   const hideModal = () => {
// //     modalElement.classList.add('translate-y-full');
// //     setTimeout(() => {
// //       modalElement.classList.add('hidden');
// //     }, 300);
// //     step = 1;
// //   };

//   formElement.addEventListener('submit', function(event) {
//     event.preventDefault();
//     const inputVal = document.getElementById('input').value;
//     modalTitle.innerText = 'Submission Result';
//     modalContent.innerHTML = `You entered: ${inputVal}
//       <table class="shadow-xl w-full mt-4">
//         <thead class="border-b-2 border-black font-bold hover:bg-gray-50">
//           <tr>
//             <th class="px-6 py-3">Particulars</th>
//             <th class="px-6 py-3">Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr class="border-b-[1px] border-violet-300 hover:bg-gray-50">
//             <td class="px-6 py-1">Model (Old Age Tax)</td>
//             <td class="px-6 py-1" id="model-charge">${inputVal}</td>
//           </tr>
//           <tr class="border-b-[1px] border-violet-300 hover:bg-gray-50">
//             <td class="px-6 py-1">Model Fine</td>
//             <td class="px-6 py-1" id="model-fine"></td>
//           </tr>
//           <tr class="border-b-[1px] border-violet-300 hover:bg-gray-50">
//             <td class="px-6 py-1">Unpaid Tax</td>
//             <td class="px-6 py-1" id="unpaidtax"></td>
//           </tr>
//           <tr class="border-b-[1px] border-violet-300 hover:bg-gray-50">
//             <td class="px-6 py-1">Unpaid Tax Penalty</td>
//             <td class="px-6 py-1" id="tax-penalty"></td>
//           </tr>
//           <tr class="border-b-[1px] border-violet-300 hover:bg-gray-50">
//             <td class="px-6 py-1">Renewal Fine</td>
//             <td class="px-6 py-1" id="renewal-fine"></td>
//           </tr>
//           <tr class="border-b-[1px] border-violet-300 hover:bg-gray-50">
//             <td class="px-6 py-1">Renewal Charge</td>
//             <td class="px-6 py-1" id="renewal-charge"></td>
//           </tr>
//           <tr class="border-b-[1px] border-violet-300 hover:bg-gray-50">
//             <td class="px-6 py-1">Current Tax</td>
//             <td class="px-6 py-1" id="current-tax"></td>
//           </tr>
//           <tr class="border-b-[1px] border-violet-300 hover:bg-gray-50">
//             <td class="px-6 py-1">Service Charge</td>
//             <td class="px-6 py-1" id="charge"></td>
//           </tr>
//           <tr class="hover:bg-gray-50">
//             <td class="px-6 py-1">Third-Party Insurance Charge</td>
//             <td class="px-6 py-1" id="insurance"></td>
//           </tr>
//           <tr class="border-t-[2px] border-black font-bold">
//             <td class="px-6 py-3">Total Bill Amount</td>
//             <td class="px-6 py-3" id="totalamt"></td>
//           </tr>
//         </tbody>
//       </table>`;
//     showModal();
//   });

//   toggleButton.addEventListener('click', function() {
//     if (step === 1) {
//       modalTitle.innerText = 'Register';
//       modalContent.innerHTML = `
//         <form id="registrationForm">
//           <div class="mb-4">
//             <label for="username" class="block text-gray-700">Username:</label>
//             <input type="text" id="username" class="mt-2 p-2 border border-gray-300 rounded w-full" >
//           </div>
//           <div class="mb-4">
//             <label for="email" class="block text-gray-700">Email:</label>
//             <input type="email" id="email" class="mt-2 p-2 border border-gray-300 rounded w-full" >
//           </div>
//           <div class="mb-4">
//             <label for="password" class="block text-gray-700">Password:</label>
//             <input type="password" id="password" class="mt-2 p-2 border border-gray-300 rounded w-full" >
//           </div>
//           <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
//         </form>`;
//       toggleButton.innerText = 'Submit';
//       step++;
//     } else if (step === 2) {
//       const registrationForm = document.getElementById('registrationForm');
//       registrationForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const username = document.getElementById('username').value;
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         console.log({ username, email, password });
//         modalTitle.innerText = 'QR Code';
//         modalContent.innerHTML = `
//           <div class="flex justify-center items-center h-full">
//             <img src="https://via.placeholder.com/150" alt="QR Code" class="w-32 h-32">
//           </div>`;
//         toggleButton.innerText = 'Close';
//         step++;
//       });
//     } else if (step === 3) {
//       hideModal();
//     }
//   });

//   closeButton.addEventListener('click', hideModal);
// });

