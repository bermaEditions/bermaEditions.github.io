var marche = false; // 170619
var instantDuDepart; // 170626 copié de 160624
var dejaJoueTempsPair = false;
var dejaJoueTempsImpair = false; // 170710

function etablirInstantPresent(){ // 170626 recopié de 160616 
	var dateActuelle = new Date();
	var minutes = dateActuelle.getMinutes();
	var secondes = dateActuelle.getSeconds();
	var millisecondes = dateActuelle.getMilliseconds();
	var instantPresent;
	
	instantPresent = millisecondes + (1000 * secondes) + (60000* minutes);
	
	return instantPresent;
}

function recupTempo(){
	var tempo;
	tempo = document.getElementById("champTempo").value; // 170630 recopié de 160622
	var dureeTemps, dureeTempsCor;
	dureeTemps = 60000/tempo;
	dureeTempsCor = Math.floor(dureeTemps); // 170710 
	
	return dureeTempsCor; // 170710 d'après 160623
}

function etablirDureeTemps(){ // 170627: formule provisoire, ensuite avec recupTempo()
	dureeTemps = recupTempo();
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
		
		var pisteClicPair = document.querySelector('#metroClic'); // 170624
		var pisteClicImpair = document.querySelector('#metroClicImpair'); // 170709 d'après 170624
		
		if (marche == true){
			var instantPresent, tempsSequence, dureeTemps, prochainTempsDans, prochainTempsA, prochainTempsPairDans, prochainTempsImpairDans, prochainTempsPairA, prochainTempsImpairA, dureeCourse, dureeCoursePair, dureeCourseImpair;
			instantPresent = etablirInstantPresent();
			dureeTemps = etablirDureeTemps(); // 170627: 500 ms pour le moment. 
			tempsSequence = instantPresent - instantDuDepart;
			
			prochainTempsDans = dureeTemps - (tempsSequence % dureeTemps); //170626
			prochainTempsA = tempsSequence + prochainTempsDans; // 170701
			
			prochainTempsImpairA = prochainTempsA +(((prochainTempsA / dureeTemps)%2) == 1)* dureeTemps; // 170704 modifie 170702
			prochainTempsImpairDans = prochainTempsImpairA - tempsSequence;
			
			prochainTempsPairA = prochainTempsA +(((prochainTempsA / dureeTemps)%2) == 0)* dureeTemps; // 170704 modifie 170702
			prochainTempsPairDans = prochainTempsPairA - tempsSequence;
			
			messageSec = 'dureeTemps: ' + dureeTemps ;
			
			if (tempsSequence < 30){ // 170721: reprise après + de papa.
				pisteClicPair.currentTime = 0.6;
				pisteClicPair.play();
				dejaJoueTempsPair = true;
			}
			
			else if (prochainTempsPairDans < 90 && dejaJoueTempsPair == false){
				dureeCoursePair = (600 - prochainTempsPairDans)*0.001;
				pisteClicPair.currentTime = dureeCoursePair;
				pisteClicPair.play();
				dejaJoueTempsPair = true;
			}
			else if (prochainTempsPairDans >= 90) dejaJoueTempsPair = false;
			
			if (prochainTempsImpairDans < 90 && dejaJoueTempsImpair == false){
				dureeCourseImpair = (600 - prochainTempsImpairDans)*0.001;
				pisteClicImpair.currentTime = dureeCourseImpair;
				pisteClicImpair.play();
				dejaJoueTempsImpair = true;
			}
			else if (prochainTempsImpairDans >= 90) dejaJoueTempsImpair = false;
		} else { // marche == false
			messageSec = 'Temps séquence: ' + 0;
		}	
		ecrireMessageSec(canvas, messageSec);
		
		window.requestAnimationFrame(function() {jouer() });
	
	}

	 jouer();
}); // fin window fonction porteuse de l'écouteur du canvas et contenant des fonctions, ouverte à "Gestion du canvas" (161012, l.139)


// var pisteClicPair = document.querySelector('#metroClic'); // 170624
// pisteClicPair.currentTime = 0.5;
// pisteClicPair.play();