const cases = document.querySelectorAll('.case');
const indicateur = document.getElementById('indicateur');
const finDePartie = document.getElementById('finDePartie');
const joueur1 = 'X';
const joueur2 = 'O';
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
            if(controleVictoire(tourJoueur)===true) {
                console.log(`Victoire du joueur ${tourJoueur}`);
            };
            if(tourJoueur === joueur1) {
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
        return true
        }                                    
    }
    return false            
}
