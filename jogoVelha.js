
function verPos(tecla, board){
    
    if(board[tecla] === ""){
        return true;
    }else{
        return false;
    }
}

function fillBoard(tecla, board, jogador){
   
    document.querySelector(`.${tecla}`).innerHTML = `${jogador}`;
    board[tecla] = `${jogador}`;
    
}

function togglePlayer(jogador){
    if(jogador === "X"){
        jogador = "O";
        return jogador;
    }else{
        jogador = "X";
        return jogador;
    }
}

function checkBoard(board,teclas){
   let cont = 0;
    for(let i of teclas){

        console.log(`${i} - ${board[i]}`)
        if(board[`${i}`] !== ""){
            cont += 1;
        }
     
    }

    if(cont === 9){
        return true;
    }else{
        return false;
    }
    
}

function resetBoard(board,teclas){
   let cont = 0;
    for(let i of teclas){
        board[`${i}`] = "";
        document.querySelector(`.${i}`).innerHTML = "";
   }
}

function checkVictory(board, jogador){

    
    if(board["i"] === board["ii"] && board["i"] === board["iii"] && board["i"] === `${jogador}`){
        return true;
    }else if(board["iv"] === board["v"] && board["iv"] === board["vi"] && board["iv"] === `${jogador}`){
        return true;
    }else if(board["vii"] === board["viii"] && board["vii"] === board["ix"] && board["vii"] === `${jogador}`){
        return true;
    }else if(board["i"] === board["iv"] && board["i"] === board["vii"] && board["i"] === `${jogador}`){
        return true;
    }else if(board["ii"] === board["v"] && board["ii"] === board["viii"] && board["ii"] === `${jogador}`){
        return true;
    }else if(board["iii"] === board["vi"] && board["iii"] === board["ix"] && board["iii"] === `${jogador}`){
        return true;
    }else if(board["i"] === board["v"] && board["i"] === board["ix"] && board["i"] === `${jogador}`){
        return true;
    }else if(board["iii"] === board["v"] && board["iii"] === board["vii"] && board["iii"] === `${jogador}`){
        return true;
    }else{
        return false;
    }

}
let jogo = {

    j1: "X",
    j2: "O",
    pontj1: 0,
    pontj2: 0,
    teclas : ["i","ii","iii","iv","v","vi","vii","viii","ix"],

    lobby(){
        let board = {
            i: "", ii: "", iii: "",
            iv: "", v: "", vi: "",
            vii: "", viii: "", ix: ""
        };
        
        let jogador = "X"
        document.querySelector(".start").addEventListener("click",() => this.start(board, jogador));
    },

    start(board, jogador){
        document.querySelector(".placar").innerHTML = `J1 - ${this.pontj1} x J2 - ${this.pontj2}`;
        document.querySelector(".log").innerHTML = `${jogador} está jogando...`;
        document.querySelector(".end").addEventListener("click",() => {
            resetBoard(board, this.teclas);
            this.pontj1 = 0;
            this.pontj2 = 0;
            document.querySelector(".placar").innerHTML = `${this.j1} - ${this.pontj1} x ${this.j2} - ${this.pontj2}`;
            
        })
        for(let i of this.teclas){
            
            document.querySelector(`.${i}`).addEventListener("click",() => {
                
                let tecla = `${i}`;
                if(verPos(tecla, board)){

                    fillBoard(tecla, board, jogador);
                    if(checkVictory(board, jogador)){
                       
                       document.querySelector(".log").innerHTML = `O ${jogador} venceu!`;
                       if(jogador === "X"){
                         this.pontj1 += 1;
                       }else{
                         this.pontj2 += 1;
                       }
                       document.querySelector(".placar").innerHTML = `${this.j1} - ${this.pontj1} x ${this.j2} - ${this.pontj2}`;

                       setTimeout(resetBoard(board, this.teclas), 2000);
        
                    }else{

                        if(checkBoard(board,this.teclas)){ 
                        
                            document.querySelector(".log").innerHTML = `A partida empatou...`;
                            setTimeout(resetBoard(board, this.teclas), 2000); 

                        }else if(checkBoard(board,this.teclas) === false){
                            checkBoard(board,this.teclas);
                            jogador = togglePlayer(jogador)
                            
                            document.querySelector(".log").innerHTML = `${jogador} está jogando...`;
                            console.log(jogador);
                        }
                    };
                    
                   
                   
                    
                }else{
                   console.log("Posicao Ocupada, tente outra!")
                };             

            });

        }
       
     
    },

    

}    

jogo.lobby();