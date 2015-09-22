# analyticsCNIL

## Présentation
Pour se mettre en conformité avec la [CNIL](http://www.cnil.fr/vos-obligations/sites-web-cookies-et-autres-traceurs/outils-et-codes-sources/la-mesure-daudience/), vous devez ajouter un bandeau sur votre site indiquant au visiteur que vous le traquez.

## Pré-requis
Deux bibliothèques sont nécessaires :
* [jQuery](https://jquery.com/)
* [jQuery Cookie](https://github.com/carhartl/jquery-cookie)


## Installation
Ajoutez le CSS dans le head ou à votre CSS.
Ajoutez le script analyticsCNIL.js à la fin du body.

## Utilisation
Il existe 3 modes :
* normal : le visiteur peut accepter ou refuser le tracking.
* minimal : le visiteur n'a pas d'autres choix que d'accepter. Le tracking commence dès que le visiteur clique sur le bouton.
* dontCare : le bandeau est uniquement présent à titre indicatif. Le visiteur est quand même tracké.

Il est aussi possible de prendre en compte l'option DoNotTrack du navigateur. Si cette option est activée, le utilisateur ne verra pas le bandeau. Le mode "dontCare" ne tient pas compte de cette option.

## Roadmap

[ ] Industrialiser les tests
[ ] Intégrer plateforme intégration continue (Travis)
[ ] Supprimer jQuery-cookie
[ ] Supprimer jQuery
