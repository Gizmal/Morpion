const cases = document.querySelectorAll('.case');
const indicateur = document.getElementById('indicateur');
const finDePartie = document.getElementById('finDePartie');
const body = document.querySelector("body");
const voile = document.createElement("div");
voile.setAttribute("id", "voile");
const joueur1 = 'X';
const joueur2 = 'O';
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
            maCase.innerText=tourJoueur;
            nbreCoup++;
            if(controleVictoire(tourJoueur)) {
                if(tourJoueur === joueur1) {
                    scoreJ1++;
                }
                else {
                    scoreJ2++;
                }
                ecranScore();
            };            
            if(nbreCoup === 9) {
                matchNul++;                
                ecranScore();
            }
            if( tourJoueur === joueur1 ) {
                tourJoueur = joueur2;                
            }
            else { tourJoueur = joueur1;
            }
        }
    });
});

function controleVictoire(tourJoueur) {
    for (const recupCombinaison of combinaisonsGagnantes) {        
        if( cases[recupCombinaison[0]].innerText === tourJoueur &&
            cases[recupCombinaison[1]].innerText === tourJoueur &&
            cases[recupCombinaison[2]].innerText === tourJoueur) {
        return true;
        }                                    
    }           
}

function ecranScore() {
    const popup = document.createElement("div");
    nbreCoup=0;
    popup.classList.add("popup");
    popup.innerHTML =   `
                        <div class="popup-header">
                            <p>Joueur 1  : ${scoreJ1}</p>
                            <p>Joueur 2  : ${scoreJ2}</p>
                            <p>Match Nul : ${matchNul}</p>                            
                            <button id="rejouer">Rejouer</button>
                        </div>
                        ` 
    body.append(voile);
    body.append(popup);
    boutonRejouer = document.getElementById("rejouer");
    boutonRejouer.addEventListener("click", () => {
        voile.remove();
        popup.remove();
        cases.forEach(maCase => {
            maCase.innerText = "";
        });
    });
};
