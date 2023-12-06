let cartItem = "";

function createCat() {
    let catalog = document.getElementById("catalog");

    for(var i = 0; i < data.length; i++) {
        //alert(data[i][2]);

        let item = document.createElement("DIV");
        item.setAttribute("class", "item");
        item.setAttribute("id", data[i][0]);
        
        let imgC = document.createElement("DIV");
        imgC.setAttribute("class", "img");
        
        let img = document.createElement("IMG");
        img.setAttribute("src", data[i][1]);
        imgC.append(img);

        item.appendChild(imgC)

        let inf = document.createElement("DIV");
        inf.setAttribute("class", "inf");

        let name = document.createElement("SPAN");
        name.setAttribute("class", "name");
        name.innerHTML = data[i][2];
        inf.appendChild(name);

        let price = document.createElement("SPAN");
        price.setAttribute("class", "price");
        price.innerHTML = data[i][3];
        inf.appendChild(price);

        item.appendChild(inf);

        let inp = document.createElement("INPUT");
        inp.setAttribute("type", "number");
        inp.setAttribute("min", "1");
        inp.value = 1;
        item.appendChild(inp);

        let btn = document.createElement("BUTTON");
        btn.setAttribute("onclick", "addCart(this.parentElement)");
        btn.innerHTML = "add";
        item.appendChild(btn);

        catalog.appendChild(item);
    }


}

function addCart(item) {
    cartItem += "-"+item.id+"-"+parseInt(item.children[2].value);
    updateCart();
}

function updateCart() {
    let serie = "id="+userID+"&cart=" + cartItem.substring(1,cartItem.length);

    $.ajax({
        type: "post",
        url: 'cart.php',
        data: serie,
        success: function () {
            showCart();
            
        }, error: function(){
        }
    });
    
}

let modal = document.getElementById("cartView");
let prods = document.getElementById("prods");

function showCart() {

    modal.style.display = "flex";

    $.ajax({
        type: "post",
        url: 'getCart.php',
        data: "id="+userID,
        success: function (data) {
            cartItem = "-"+data;
            let aux = cartItem.split("-");
            aux.shift()
            let arr = aux;
            if(aux.length <= 1){
                arr = ["",""]
            }
            else {
                arr = aux;
            }
            refreshCart(arr);
        }, error: function(){
        }
    });

}

function serialize() {
    let str = "";
    for(let i = 0; i < prods.children.length; i++) {
        str += "-" + prods.children[i].id + "-" + prods.children[i].children[2].value;
    }
    console.log(str);
    cartItem = str;
    updateCart();
    //setTimeout(showCart(), 5000);
}

function refreshCart(arr) {
    prods.innerHTML = "";
    let listCart = new Array(arr.length/2);
    let id = 0;
    let qtd = 1;
    for(let i = 0; i < arr.length/2; i++) {
        listCart[i] = [arr[id],arr[qtd]]

        id+=2;
        qtd+=2;
    }

    for(let i = 0; i < listCart.length; i++) {
        
        let prodT;

        for(let j = 0; j < data.length; j++) {
            if(listCart[i][0] == data[j][0]) {
                prodT = data[j];
            }
        }
        
        let div = document.createElement("DIV");
        div.setAttribute("class", "prod");
        div.setAttribute("id", prodT[0]);
        
        let name = document.createElement("SPAN");
        name.innerHTML = prodT[2]
        div.appendChild(name);
        
        let price = document.createElement("SPAN");
        price.innerHTML = "R$"+prodT[3];
        div.appendChild(price);
        
        let qtdBuy = document.createElement("INPUT");
        qtdBuy.setAttribute("type", "number");
        qtdBuy.value = listCart[i][1];
        div.appendChild(qtdBuy);
        
        let totalPrice = document.createElement("SPAN");
        totalPrice.innerHTML = "R$"+(prodT[3]*listCart[i][1]).toPrecision(4);
        div.appendChild(totalPrice);
        
        let exc = document.createElement("BUTTON");
        exc.setAttribute("onclick", "this.parentElement.remove(), serialize()");
        exc.innerHTML = "X";
        div.appendChild(exc);
        
        prods.appendChild(div);
    }

    sumCart();
}

function sumCart() {
    let sum = 0;
    for(let i = 0; i < prods.children.length; i++) {
        let x = prods.children[i].children[3].innerHTML;
        x = x.replace("R$","");
        x = parseFloat(x);
        sum += x;
    }

    let tp = document.getElementById("tp");
    tp.innerHTML = "R$"+sum.toPrecision(5);
    
    let tg = document.getElementById("tg");
    tg.innerHTML = "R$"+sum.toPrecision(5);
}