let orderTotal = 0;

function addPizza(size){
    console.log(size);
    let list = document.getElementById("order_list");
    let newPizza = document.createElement("li");
    let cost = document.getElementById("cost");

    newPizza.innerHTML = size;
 
    list.appendChild(newPizza);

    orderTotal += checkCost(size);

    cost.innerHTML = formatCurrency(orderTotal);
}

function checkCost(size){
    if(size == "x-Small"){
        return 4.99;
    }else if(size == "Small"){
        return 6.99;
    }else if(size == "Medium"){
        return 8.99;
    }else if(size == "Large"){
        return 10.99;
    }else if(size == "x-Large"){
        return 12.99;
    }
}

function resetOrder(){
    console.log("Bleh");
    document.getElementById("order_list").innerHTML = "";
    orderTotal = 0;
    cost.innerHTML = formatCurrency(orderTotal);
}

function retrieve(){
    for(let i = 1; i<localStorage.length; i++){
        let li = document.createElement("li");
        let h3 = document.createElement("h3");
        h3.setAttribute("id","order_label");

        let el = document.createElement("li");
        el.innerHTML = localStorage.getItem("Order " + i);

        h3.innerHTML = "Order " + i + " - ";
        
        li.appendChild(h3);
        li.appendChild(el);

        document.getElementById("recent_orders").appendChild(li);
    }
}


function saveOrder(){
    let list = document.getElementById("order_list").getElementsByTagName("li");
    let isOrder = false;

    
    if(list.length > 0){
        isOrder = true;
    }

    if(isOrder){
        if(localStorage.getItem("nums") == undefined){
            localStorage.setItem("nums", 1);
        }

        let numOrders = localStorage.getItem("nums");
        let order = document.getElementById("order_list");
        localStorage.setItem("Order " + numOrders, order.innerHTML);

        numOrders = Number(numOrders) + 1;
        localStorage.setItem("nums", numOrders);
    }else{
        preventDefault();
    }
}

function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g, '');
	if (isNaN(num)) 
	{
		num = "0";
	}
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	cents = num % 100;	
	num = Math.floor(num / 100).toString();
	if (cents < 10) 
	{
		cents = "0" + cents;
	}
	for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
	{
		num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
	}
	return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}

function load(){
    document.getElementById("order_form").addEventListener("submit", function(){
        saveOrder();
    });

    retrieve();
    document.getElementById("reset_order").addEventListener("click", function(){
        resetOrder();
    });


    let cost = document.getElementById("cost");
    cost.innerHTML = formatCurrency(0.00);
    document.getElementById("add_pizza").addEventListener("click", function(){
        let checkboxes= document.querySelectorAll('input[name="size"]:checked');
            let output;
            output = checkboxes[0].value;
        addPizza(output);
    });

    
}

document.addEventListener("DOMContentLoaded", load);



