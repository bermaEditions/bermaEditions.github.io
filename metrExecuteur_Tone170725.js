var marche = false; // 170619
var instantDuDepart; // 170626 copié de 160624
var dejaJoueTemps = false;

function etablirInstantPresent(){ // 170626 recopié de 160616 
	var dateActuelle = new Date();
	var minutes = dateActuelle.getMinutes();
	var secondes = dateActuelle.getSeconds();
	var millisecondes = dateActuelle.getMilliseconds();
	var instantPresent;
	
	instantPresent = millisecondes + (1000 * secondes) + (60000* minutes);
	
	return instantPresent;
}

function etablirDureeTemps(){ // 170627: formule provisoire, ensuite avec recupTempo()
	dureeTemps = 500;
	return dureeTemps;
}

function demarArrete(){
   if (marche == false){
       document.getElementById("boutonDemAr").innerHTML = "Arrêter"
	   instantDuDepart = etablirInstantPresent(); // 170626 d'après 1606..
       marche = true;
   }else{
      marche = false;
      document.getElementById("boutonDemAr").innerHTML = "Démarrer";
       
    }
}

window.addEventListener('load', function() { // 170625 d'après 160616: jusqu'à la fin du fichier js

	var canvas  = document.querySelector('#canvas');
	var context = canvas.getContext('2d');
	
	function ecrireMessageSec(canvas, messageSec) { // 170625 d'après 1606..
        context.font = '14pt Calibri';
        context.fillStyle = 'grey';
        context.fillText(messageSec, 25, 25);
	}	
	
	function jouer() { // 170625 d'après 160616: draw sur le modèle, le nom de fonction est peut-être important, test: NON, animerCurseur ou chien ou chat vont aussi bien.
		context.save();
		context.clearRect(0, 0, 515, 400);
		
		var temps = new Date();
		var minutes = temps.getMinutes();
		var secondes = temps.getSeconds();
		var millisecondes = temps.getMilliseconds();
		
		var pisteClicNormal = document.querySelector('#metroClic'); // 170624
		
		if (marche == true){
			var instantPresent, tempsSequence, dureeTemps, prochainTempsDans, dureeCourse;
			instantPresent = etablirInstantPresent();
			dureeTemps = etablirDureeTemps(); // 170627: 500 ms pour le moment. 
			tempsSequence = instantPresent - instantDuDepart;
			prochainTempsDans = dureeTemps - (tempsSequence % dureeTemps); //170626
			messageSec = 'Prochain temps dans: ' + prochainTempsDans;
			
			if (prochainTempsDans < 90 && dejaJoueTemps == false){
				dureeCourse = (600 - prochainTempsDans)*0.001;
				pisteClicNormal.currentTime = dureeCourse;
				pisteClicNormal.play();
				dejaJoueTemps = true;
			}
			else if (prochainTempsDans >= 90) dejaJoueTemps = false;
		} else { // marche == false
			messageSec = 'Temps séquence: ' + 0;
		}	
		ecrireMessageSec(canvas, messageSec);
		
		window.requestAnimationFrame(function() {jouer() });
	
	}

	 jouer();
}); // fin window fonction porteuse de l'écouteur du canvas et contenant des fonctions, ouverte à "Gestion du canvas" (161012, l.139)


// var pisteClicNormal = document.querySelector('#metroClic'); // 170624
// pisteClicNormal.currentTime = 0.5;
// pisteClicNormal.play();