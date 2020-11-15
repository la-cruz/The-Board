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

En plus des composants requis (`AppToolbar`, `Board`, `Postit`), nous avons décidé de créer d'autres composants pour éviter la surcharge en code de ces derniers.
Nous avons créé deux composants pour les listes dans les toolbars (`BoardList` et `PostitList`) qui nous permette de générer la liste présente dans les menus.
Nous avons aussi choisi de dissocier la liste des Postits du composant `Board.jsx` (voir `Dissociation des vues desktop et mobile`)
Pour finir, nous avons choisi de créer un composant `Canvas.jsx` pour gérer la logique de dessin et de reconnaissance de geste.

Pour alléger nos composants, nous avons aussi créé quelque fichier `.js` pour les gestes enregistrés et le test de la disponibilité du fullscreen.

### :eyes: Visibilité des Boards / Postits

Nous avons remarqué que les data donnée comportait un champs `visible`, nous l'avons pris en compte pour les Postits, c'est pourquoi nous avons dù faire un traitement du tableau de postits dans le composant `Board.jsx` pour garder l'index correct pour le dispatch des actions relatives aux postits.

### :clipboard: ​Valeur de retour du reducer

Pour la valeur de retour du reducer, nous avons choisi d'utiliser la déstructuration pour faire une copie de notre objet. Nous aurions pu utiliser `Object.assign()` ou faire une copie qu'on aurait ensuite modifiée, mais nous voulions suivre la même logique de code pour toutes les actions.

### :link: Synchronisation de l'etat et de l'url

Pour la synchronisation de notre état avec l'URL de l'application, nous avons décidé tout d'abord de changer l'index de notre état en fonction de l'URL dans un `useEffect()` dans le composant `Board.jsx`, ce qui permet de pouvoir facilement partager le lien d'un board à un autre utilisateur.
Par la suite, lors de la synchronisation entre différents appareils, nous avons choisi de mettre le changement de route en fonction de l'index dans le middleware de notre Redux au lieu de le mettre dans un subscribe. Nous avons fait ce choix car nous avions plus de contrôles sur le changement de la route, puisqu'elle ne change qu'en cas d'action `SET_BOARD` avec une meta `propagate` à `false`.

### :computer: Dissociation des vues desktop et mobile :iphone:

Pour la dissociation des vues, nous avons choisi de faire deux routes différentes :

- `/board/:idBoard`, qui est la route nous amenant à la vue Desktop
- `/board/:idBoard/:idPostit`, qui est la route nous amenant à la vue Mobile

En plus de ses deux routes, nous avons rajouté un `<Redirect>` qui nous permet, en fonction du booléen `isMobile` provenant de `react-device-detect`, de rediriger les utilisateurs mobiles vers la bonne route s'ils rentre l'url `/board/:idBoard`, ce qui permet qu'il ne se retrouve pas sur une page illisible.

Les deux routes affichent le même composant (`Board.jsx`), mais avec un booléen `mobile` dans le cas de la vue éponyme, qui permet à l'intérieur du composant d'avoir un affichage légèrement différent.
En fonction de la vue, c'est la liste de Postit qui change. Nous avons donc créé deux composants différents :

- `PostitList` pour la vue desktop, qui itère sur le tableau de postits pour tous les afficher l'un après l'autre.
- `PostitListMobile` pour la vue mobile, qui affiche un seul Postit en fonction de l'id contenu dans l'URL (`idPostit`).

Nous avons aussi ajouté une toolbar en bas de l'écran en vue mobile (`BottomAppToolbar.jsx`), qui permet de changer rapidement de postit avec un menu et des boutons suivants et précédents.

Avec ce système, il suffit de charger la page `/board/:idBoard/:idPostit` sur desktop pour avoir la vue mobile, ce qui est utile pour tester.

### :paintbrush: Dessin et reconnaissance de geste

Pour le canvas, nous avons choisi de permettre le dessin avec un `event.pointerType` de type `pen` que nous avons pu tester sur Ipad. On a alors un dessin de couleur rouge avec une épaisseur de trait de 3, qui s'affiche sur tous les dispositifs quand il est terminé.
Les gestes eux, sont permis avec un `event.pointerType` de type `touch`. On a alors le dessin du geste en bleu avec une épaisseur de trait de 7, qui s'efface dès que le geste est terminé, en déclenchant un changement de board si le geste est `>` ou `<` si possible.
Un `event.pointerType` de type `mouse` est bloqué, et ne permet donc ni de dessiner ni de faire des gestes.

### :rotating_light: Page d'accueil et page 404

Nous avons rajouté une page d'accueil disponible à l'URL `/`, ce qui permet d'avoir un affichage accueillant lors de la visite de l'application, sans avoir à taper directement une route vers un board. Elle contient une liste des boards ainsi que le logo de l'application.
Nous avons aussi rajouté une page 404, qui nous s'affiche lors d'une erreur dans l'URL. Ce qui permet d'indiquer à l'utilisateur qu'il s'est trompé et de le rediriger vers la page d'accueil. Nous avons géré son affichage côté client avec `react-router`, mais il est aussi possible de le faire côté NodeJs.

### :art: Style de l'application

Nous avons utilisé la librairie `material-ui` pour faire le style global de notre application. Cela permet de pouvoir aller plus vite sur le style pour prendre plus de temps sur la partie applicative, bien que nous ayons par la suite amélioré l'affichage de notre application avec du Sass et du Css-in-js, qui permet d'être bien plus précis.
Nous avons décider pour cela de créer des fichiers Sass dans notre dossier assets pour ensuite les importers dans nos composants, ce qui permet d'avoir un code plus clair, au détriment de tout avoir au même endroit.
Nous avons aussi utilisé un `reset.scss` qui nous permet d'annuler le style par défaut du navigateur.