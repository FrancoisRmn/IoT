# Réveil connecté

## Descritpion de l'application

Le mec configure un lien vers son agenda personnel (format ics - url).
1 calndrier pro pour savoir si il doit rester chez lui ou aller au boulot.
Si il met télétravail -> il reste d'office chez lui
Si il a une réunion -> travail

## A configurer :
* Agenda (url)
* Lieu de travail
* Son adressse
* Moyen de transport (voiture - train - bus) => checkbox => l'app choisit le plus rapide

Liste des APIS : 
* Trajet -> google direction
* Météo -> openWeatherMap
* Qualité de l'air -> openWeatherMap

Liste des capteurs :
* Qualité de l'air (pm2.5)
* Lumière (si temps) -> peu de lumiere -> c'est dangereux -> télétravail
* Alarme pour réveiller le monsieur
* Bouton pour arreter l'alarme 

Affichage
* Vue synthétique de la config (app)
* Matrice led montre l'heure

=> Tout tourne sur le raspberry

## Requirements

Application mobile : flutter
Back-end : 
* Scala (récup données capteurs)
* js pour l'algo de réveil + API - express js