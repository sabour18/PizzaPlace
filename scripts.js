let orderTotal = 0;

function addPizza(size){
    let list = document.getElementById("order_list");
    let li = document.createElement("li");

    let pLi = document.createElement("pLi");
    pLi.innerHTML = size;
    pLi.setAttribute("class" , "pizza_label");

    let cost = document.getElementById("cost");

    let button = document.createElement("button");
    button.setAttribute("id", "del_pizza");
    button.setAttribute("onclick", "deletePizza(this)")
    button.innerHTML = "x";

    li.appendChild(button);
    li.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
    li.appendChild(pLi);
    list.appendChild(li);

    orderTotal += checkCost(size);

    cost.innerHTML = formatCurrency(orderTotal);
}

function deletePizza(li){
    let cost = document.getElementById("cost");
    console.log(li.parentElement.lastChild.innerHTML);

    orderTotal -= checkCost(li.parentElement.lastChild.innerHTML);
    cost.innerHTML = formatCurrency(orderTotal);

    li.parentElement.remove();
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
        let div = document.createElement("div");
        div.setAttribute("class","order_label");
        
        let h3 = document.createElement("h3");
        let title = "Order " + i;
        h3.innerHTML = title + " - ";
        div.appendChild(h3);

        let ul = document.createElement("ul");

        let n = JSON.parse(localStorage.getItem(title));

        for(let j = 0; j < n.length; j++){
            let li = document.createElement("li");
            li.innerHTML = n[j];
            ul.appendChild(li);
        }

        div.appendChild(ul);
        document.getElementById("recent_orders").appendChild(div);
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
        let order = document.getElementsByClassName("pizza_label");

        let arr = Array(order.length);
        for(let i = 0; i < order.length; i++){
            arr[i] = order[i].innerHTML;
        }

        localStorage.setItem("Order " + numOrders, JSON.stringify(arr));

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



