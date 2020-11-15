# :earth_africa: &nbsp; Name : Alves Mickael p1607349 / Audart Lucas p1509529



## :computer: &nbsp; Installation

:information_source:   Version de développement : react/16.13.1

:information_source:   Version de développement & : node/12.11.1

## :link: Lien vers l'application sur Heroku 

**The app is available at the following url :** [https://tiw8-alves-audart.herokuapp.com](Link to the app)

## :page_facing_up: &nbsp; Scripts disponibles

Dans le répertoire du projet vous pouvez lancer les commandes suivantes :

### `npm install`

:package: &nbsp; Installer tout les modules.
(Version dev : node/12.11.1)

### `npm run build`

Builds l'application pour la productio dans le dossier `dist`.<br />
Le build est minifié et les noms de fichiers comprennent les hashs.<br />
L'application est maintenant prête à être déployée !

### `npm run start`
Lance l'application en mode développement.<br />
Vous pouvez ouvrir [http://localhost:3000](http://localhost:3000) pour voir l'application sur votre navigateur.

### `npm run dev`

Lance la commande webpack pour faire un bundle de votre application avec l'option watch.



## :wrench: Choix techniques



### :construction_worker: ​Architecture des Composants

En plus des composant requis (`AppToolbar`, `Board`, `Postit`), nous avons décider de créer d'autres composants pour eviter la surcharge en code de ses derniers.
Nous avons créer deux composants pour les listes dans les toolbars (`BoardList` et `PostitList`) qui nous permette de générer la liste présentes dans les menus.
Nous avons aussi choisi de dissocier la liste des Postits du composant `Board.jsx` (voir `Dissociation des vue desktop et mobile`)
Pour finir, nous avons choisi de créer un composant `Canvas.jsx` pour gérer la logique de dessin et de reconnaissance de geste.

Pour alléger nos composant, nous avons aussi créer quelque fichier `.js` pour les gestes enregistrer et le test de la disponnibilité du fullscreen.

### :clipboard: ​Valeur de retour du reducer

Pour la valeur de retour du reducer, nous avons choisi d'utiliser la destructuration pour faire une copie de notre objet. Nous aurions pu utiliser `Object.assign()` ou faire une copie qu'on aurait ensuite modifiée, mais nous voulions suivre la même logique de code pour toutes les actions.

### :link: Synchronisation de l'etat et de l'url

Pour la la synchronisation de notre état avec l'url de l'application, nous avons décidé tout d'abord de changer l'index de notre état en fonction de l'url dans un `useEffect()` dans le composant `Board.jsx`, ce qui permet de pouvoir facilement partager le lien d'un board à un autre utilisateur.
Par la suite, lors de la synchronisation entre différents appareils, nous avons choisi de mettre le changement de route en fonction de l'index dans le middleware de notre Redux au lieu de le mettre dans un subscribe. Nous avons fait ce choix car nous avions plus de controle sur le changement de la route, puisqu'elle ne change qu'en cas d'action `SET_BOARD` avec une meta `propagate` à `false`.

### :computer: Dissociation des vues desktop et mobile :iphone:

Pour la dissociation des vues, nous avons choisi de faire deux routes différentes :

- `/board/:idBoard`, qui est la route nous amenant à la vue Desktop
- `/board/:idBoard/:idPostit`, qui est la route nous amenant à la vue Mobile

En plus de ses deux routes, nous avons rajouté un `<Redirect>` qui nous permet, en fonction du booleen `isMobile` provenant de `react-device-detect`, de rediriger les utilisateur mobile vers la bonne route si ils rentre l'url `/board/:idBoard`, ce qui permet qu'il ne se retrouve pas sur une page illisible.

Les deux routes affiche le même composant (`Board.jsx`), mais avec un booléen `mobile` dans le cas de la vue éponyme, qui permet à l'interieur du composant d'avoir un affichage légèrement différents.
En fonction de la vue, c'est la liste de Postit qui change. Nous avons donc créer deux composant différents :

- `PostitList` pour la vue desktop, qui itère sur le tableau de postits pour tous les afficher l'un après l'autre.
- `PostitListMobile` pour la vue mobile, qui affiche un seul Postit en fonction de l'id contenu dans l'url (`idPostit`).

Nous avons aussi ajouter une toolbar en bas de l'ecran en vue mobile (`BottomAppToolbar.jsx`), qui permet de changer rapidement de postit avec un menu et des boutons suivant et précédent.

Avec ce système, il suffit de charger la page `/board/:idBoard/:idPostit` sur desktop pour avoir la vue mobile, ce qui est utile pour tester.

### :paintbrush: Dessin et reconnaissance de geste

Pour le canvas, nous avons choisi de permettre le dessin avec un `event.pointerType` de type `pen` que nous avons pu tester sur Ipad. On a alors le dessin du geste en bleu avec une epaisseur de trait de 7, qui s'efface dès que le geste est terminé, en déclanchant un changement de board si le geste est `>` ou `<` si possible.
Les gestes eux, sont permis avec un `event.pointerType` de type `touch`. On a alors un dessin de couleur rouge avec une épaisseur de trait de 3, qui s'affiche sur tout les dispositif quand il est terminé.
Un `event.pointerType` de type `mouse` est bloqué, et ne permet donc ni de dessiner ni de faire des gestes.

### :rotating_light: Page d'accueil et page 404

Nous avons rajouté une page d'accueil disponible à l'url `/`, ce qui permet d'avoir un affichage accueillant lors de la visite de l'application, sans avoir à taper directement une route vers un board. Elle contient une liste des Boards ainsi que le logo de l'application.
Nous avons aussi rajouté une page 404, qui nous s'affiche lors d'une erreur dans l'url. Ce qui permet d'indiquer à l'utilisateur qu'il s'est trompé et de le rediriger vers la page d'accueil. Nous avons géré son affichage coté client avec `react-router`, mais il est aussi possible de le faire coté NodeJs.

### :art: Style de l'application

Nous avons utilisé la librairie `material-ui` pour faire le style global de notre application. Cela permet de pouvoir aller plus vite sur le style pour prendre plus de temps sur la partie applicative, bien que nous ayons par la suite amélioré l'affichage de notre application avec du Sass et du Css-in-js, qui permet d'être bien plus précis.
Nous avons décider pour cela de créer des fichiers Sass dans notre dossier assets pour ensuite les importers dans nos composants, ce qui permet d'avoir un code plus clair, au détriment de tout avoir au même endroit.
Nous avons aussi utilisé un `reset.scss` qui nous permet d'annuler le style par défaut du navigateur.