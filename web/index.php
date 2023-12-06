<?php
    $server = "localhost";
    $user = "root";//"id15949507_root";
    $password = "";//"root235711ROOT!";
    $db = "cake";

    $connection = mysqli_connect($server, $user, $password, $db);

    
?>

<?php

            $query = mysqli_query($connection, "SELECT * from catalogo");
            $data = array();
            while($vol = mysqli_fetch_array($query))
            {   
                $data[] = $vol;
            }
        ?>
        

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="reset.css">
        <link rel="stylesheet" href="home.css">   
    </head>
    <body onload="createCat()">
        <nav>
            <img src="./images/logo.png" class="logo">
            <div class="func">
                <span>Horário de funcionamento</span>
                <span>8:00</span>
                <span>17:00</span>
            </div>
            <div class="acc">
                <div class="col1">
                    <span class="user">Usuário</span>
                    <button id="btnCart" value="0" onclick="showCart()">Carrinho</button>
                </div>
                <div class="col2">
                    <img class="avatar" src="./images/user.png" >
                </div>
            </div>
            <ul>
                <li>inicio</li>
                <li class="active">catalogo</li>
                <li>contato</li>
                <li>politicas</li>
                <li>quem somos</li>
            </ul>
        </nav>


    <main id="catalog">
        <!--<div class="item" id="0">
            <div class="img"><img src="./cupcake/choco.png"></div>
            <div class="inf">
                <span class="name">Choco Cake</span>
                <span class="price">R$5,99</span>
            </div>
            <input type="number">
            <button onclick="addCart(this.parentElement)">add</button>
        </div>-->
        
    </main>

    <div class="modal" id="cartView">
            <button class="close" onclick="this.parentElement.style.display = 'none'">X</button>
            <div class="prods" id="prods"></div>
            <div class="pag" id="pag">
                <span>Pedido</span><span id="tp"></span>
                <span>Frete</span><span>R$0,00</span>
                <span>Total</span><span id="tg"></span>

                <select class="slcPag">
                    <option default>Pix</option>
                    <option>Transf. bancária</option>
                    <option>Cartão de crédito</option>
                </select>

                <button class="fp" disabled >Finalizar pedido</button>
                </div>
            <button class="refresh" onclick="serialize()">Atualizar</button>
    </div>
    <script src="js/jquery-3.6.0.js"></script>
    <script id="jsdel">const data = <?php echo json_encode($data);?>; const userID = 1;</script>
    <script src="home.js"></script>
    </body>
</html>