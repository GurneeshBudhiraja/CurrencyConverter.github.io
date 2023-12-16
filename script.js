const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector(".submit");


for (let dropdown of dropdowns) {
  for (country in countryList) {
    const option = document.createElement("option");
    option.innerText = country;
    option.value = country;
    if ((dropdown.name === "from" && country==="USD") || 
    (dropdown.name === "to" && country === "INR")) {
      option.selected = true;
    }
    dropdown.append(option);
  }
  dropdown.addEventListener("change", (evt)=> {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  const countryCode  = countryList[element.value];
  const apiImage = `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = element.parentElement.querySelector("img");
  img.src = apiImage;
}



btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  apiFunction();
});


const apiFunction = async ()=> {
  // evt.preventDefault(); //to remove the default function of the button
  let quantity = document.querySelector(".amount input").value; //input quantity
  if (quantity<=0) {
    quantity=1;
  }
  // for API
  const fromCountry = document.querySelector(".from select").value.toLowerCase();
  const toCountry = document.querySelector(".to select").value.toLowerCase();

  
  const URL = `${baseURL}/${fromCountry}/${toCountry}.json`;
  let promise = await fetch(URL); 
  let data = await promise.json();
  let price = data[toCountry];
  // console.log(quantity, price);
  const totalPrice = updatePrice(parseInt(quantity), price);
  document.querySelector(".result").textContent = `${quantity} ${fromCountry.toUpperCase()} = ${totalPrice} ${toCountry.toUpperCase()}`;
}

const updatePrice = (quantity, price) => {
  return Math.round((quantity *price)*100)/100;
}


//for setting the default flag
dropdowns.forEach((dropdown) => {
  updateFlag(dropdown);
});

// for fetching the price at the reload
window.addEventListener("load", apiFunction);











