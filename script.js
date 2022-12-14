const cases = document.querySelectorAll('.case');
const indicateur = document.getElementById('indicateur');
const body = document.querySelector("body");
const voile = document.createElement("div");
voile.setAttribute("id", "voileT");
const popup = document.createElement("div");
const joueur1 = 'X';
const joueur2 = 'O';
let msgFinPartie ="";
let scoreJ1 = 0;
let scoreJ2 = 0;
let matchNul = 0;
let nbreCoup = 0;
let tourJoueur = joueur1;

const combinaisonsGagnantes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cases.forEach(maCase => {
    maCase.addEventListener('click', () => {
        if(maCase.innerText==="") {
            nbreCoup++;
            if(tourJoueur === joueur1) {
                maCase.classList.add("red");
            }
            else {
                maCase.classList.add("blue");
            }
            maCase.innerText=tourJoueur;            
            if(controleVictoire(tourJoueur)) {
                if(tourJoueur === joueur1) {
                    scoreJ1++;
                    msgFinPartie ="Victoire Joueur 1";
                }
                else {
                    scoreJ2++;
                    msgFinPartie ="Victoire Joueur 2";
                }
                ecranScore();
            }
            if(nbreCoup === 9) {
                matchNul++;
                msgFinPartie ="Match Nul";                
                ecranScore();
            }
            if( tourJoueur === joueur1 ) {
                tourJoueur = joueur2;
                indicateur.innerText="Tour du joueur 2";
                indicateur.setAttribute("class","blue");
            }
            else {  tourJoueur = joueur1;
                indicateur.innerText="Tour du joueur 1";
                indicateur.setAttribute("class","red");
            }
        }
    });
});

function controleVictoire(tourJoueur) {
    for (const recupCombinaison of combinaisonsGagnantes) {        
        if( cases[recupCombinaison[0]].innerText === tourJoueur &&
            cases[recupCombinaison[1]].innerText === tourJoueur &&
            cases[recupCombinaison[2]].innerText === tourJoueur) {
                for (const caseGagnante of recupCombinaison) {
                    cases[caseGagnante].classList.add("victoire");                   
                }
                return true;
            }                                    
        }           
    }
    
function ecranScore() {    
    nbreCoup=0;
    popup.classList.add("popup");
    let msgResult="";
    if(msgFinPartie === "Match Nul") {
        msgResult="nul"
    }
    else {
        msgResult=tourJoueur;
    }
    popup.innerHTML =   `
                        <div class="popup-header">
                        <h2 class="${msgResult}">${msgFinPartie}</h2>
                        <p class="red">Joueur 1  : ${scoreJ1}</p>
                        <p class="blue">Joueur 2  : ${scoreJ2}</p>
                        <p class="nul">Match Nul : ${matchNul}</p>                            
                        <button id="rejouer">Rejouer</button>
                        </div>
                        ` 
    body.append(voile);
    setTimeout(() => { 
        rejouer();
    }, 2000);    
}

function rejouer() {
    body.append(popup);
    voile.setAttribute("id","voileO")
    const boutonRejouer = document.getElementById("rejouer");
    boutonRejouer.addEventListener("click", () => {
        voile.setAttribute("id","voileT");
        voile.remove();
        popup.remove();
        cases.forEach(maCase => {
            maCase.innerText = "";
            maCase.setAttribute("class","case");            
        });
    });
}