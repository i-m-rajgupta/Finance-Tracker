
let descript = document.querySelector("#descript");
let amt = document.querySelector("#amt");
let add = document.querySelector("#add");
let list = document.querySelector("#list");
let select = document.querySelector("select");
let reset = document.querySelector("#reset");

let descriptValue ;
let amtValue ;
let type ;
let isClicked;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
console.log(transactions);

function updateLocalStorage(){
    localStorage.setItem("transactions",JSON.stringify(transactions));
}
function renderTransactions(){
    list.innerHTML = "";
    transactions.forEach((el,idx) => {
        let li = document.createElement("li");
        li.classList.add(idx);
        li.innerHTML=`${el.descriptValue} ${el.amtValue} (${el.type})
        <button onclick="removeTransaction(${idx})"><i class="fa-solid fa-xmark"></i></button>`;
       list.appendChild(li);     
    });
    // updateBalance();
    // updateChart();
}
function isValid(input){
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/;
    return regex.test(input);
}

add.addEventListener("click",()=>{
    if(isValid(descript.value)&&isValid(amt.value)){
    const transaction = {
        descriptValue : descript.value,
        amtValue : parseFloat(amt.value),
        type : select.value
    }
    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();
    descript.value = "";
    amt.value = "";
}
});

reset.addEventListener("click",()=>{
     transactions.splice(0,transactions.length);
     updateLocalStorage();
     list.innerHTML = "";
});

descript.addEventListener("keydown",(e)=>{
    if(e.key == "Enter"){
        amt.focus();
    }   
})
amt.addEventListener("keydown",(e)=>{
    if(e.key == "Enter"){
        add.click();
    }   
})
function removeTransaction(idx) {
    transactions.splice(idx,1);
    let li;
    let listItem = list.childNodes;
    for(item of listItem){
        if(item.classList == `${idx}`){
          li = item;
        }
    }
    li.remove();
    updateLocalStorage();
}

