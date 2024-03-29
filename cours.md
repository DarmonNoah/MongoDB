# Notes

## Notes MongoDB
Systeme de gestion de bdd orientée doc et cross platform.  
BDD = conteneur physique des collections qui contiennent des documents.  
Groupe de document en mongodb -> équivalent d'une table en sql.  
Les docs présent dans la même collections peuvent avoir des champs différents.  
Un document est un ensemble de clé-valeur.  

Les types sur mongo sont les même que le format json :  
-Booleen  
-Numeriques  
-Chaine de caracteres  
-Tableau  
-Objet  
-Null  

Bson est comme json mais possède des types supplémentaires.  

### Termes SQL en MongoDB
Bdd / Bdd  
Table / Collection  
Tuple, Ligne, Row / Document  
Colonne / Field  
Jointure / Documents imbriqués  
Clé primaire / Clé primaire*  
Mysql / mongod  
mysql / mongo

### Compass
Clear : cls  
Delete : Drop  
Insert : db.someColl.insertOne({"foo":"bar"});  
Find : db.someColl.find();  
vérifier la non duplication : $addtoset

Création d'une colletion : une collection se configure avec un objet type collation :  
db.createCollection(  
"maCollection",  
"collation": {  
"locale": "fr",  
"caseLevel": false,  
"strength": 3,  
"numericOrdering": false,  
"alternate": "non-ignorable",  
"backwards": false,  
"normalization": false  
    }  
)  

Projection : condition que l'on applique à un find afin de retirer une ou plusieurs données (comme un select).  

### Premeiere etape du pipeline: $match

var pipeline = [
{   
    $match: {
    "interets": "jardinage"
        }
    }   
]

db. users. aggregate(pipeline) .pretty()

### Exercices Mongo
### Exercices 1

Créez une base de données sample nommée "sample_db" et une collection appelée "employees":    
use sample_db

Insérez les documents suivants dans la collection "employees":  
db.employees.insertMany([{
   name: "John Doe",
   age: 35,
   job: "Manager",
   salary: 80000
}
,
{
   name: "Jane Doe",
   age: 32,
   job: "Developer",
   salary: 75000
}
,
{
   name: "Jim Smith",
   age: 40,
   job: "Manager",
   salary: 85000
}  
]);  

Écrivez une requête MongoDB pour trouver tous les documents dans la collection "employees".  
db.employees.find();

Écrivez une requête pour trouver tous les documents où l'âge est supérieur à 33.  
db.employees.find({age:{$gt:33}});

Écrivez une requête pour trier les documents dans la collection "employees" par salaire décroissant.
db.employees.aggregate({$sort : {salary : -1}});

Écrivez une requête pour sélectionner uniquement le nom et le job de chaque document.
db.employees.find({},{_id:false,name:true,job:true});

Écrivez une requête pour compter le nombre d'employés par poste.
db.employees.aggregate({$group:{_id:"$job", count:{$sum: 1}}})

Écrivez une requête pour mettre à jour le salaire de tous les développeurs à 80000.
db.employees.updateMany(
        {job : "Developer"},
        {$set: {salary : 80000}}
    )
----------------------------------------------------------------------------------------
### Exercices 2


Voici la base de donnees qui permet d'effectuer la serie d'exercices : 

```
db.salles.insertMany([ 
   { 
       "_id": 1, 
       "nom": "AJMI Jazz Club", 
       "adresse": { 
           "numero": 4, 
           "voie": "Rue des Escaliers Sainte-Anne", 
           "codePostal": "84000", 
           "ville": "Avignon", 
           "localisation": { 
               "type": "Point", 
               "coordinates": [43.951616, 4.808657] 
           } 
       }, 
       "styles": ["jazz", "soul", "funk", "blues"], 
       "avis": [{ 
               "date": new Date('2019-11-01'), 
               "note": NumberInt(8) 
           }, 
           { 
               "date": new Date('2019-11-30'), 
               "note": NumberInt(9) 
           } 
       ], 
       "capacite": NumberInt(300), 
       "smac": true 
   }, { 
       "_id": 2, 
       "nom": "Paloma", 
       "adresse": { 
           "numero": 250, 
           "voie": "Chemin de l'Aérodrome", 
           "codePostal": "30000", 
           "ville": "Nîmes", 
           "localisation": { 
               "type": "Point", 
               "coordinates": [43.856430, 4.405415] 
           } 
       }, 
       "avis": [{ 
               "date": new Date('2019-07-06'), 
               "note": NumberInt(10) 
           } 
       ], 
       "capacite": NumberInt(4000), 
       "smac": true 
   }, 
    { 
       "_id": 3, 
       "nom": "Sonograf", 
       "adresse": { 
           "voie": "D901", 
           "codePostal": "84250", 
           "ville": "Le Thor", 
           "localisation": { 
               "type": "Point", 
               "coordinates": [43.923005, 5.020077] 
           } 
       }, 
       "capacite": NumberInt(200), 
       "styles": ["blues", "rock"] 
   } 
]) 
```
Exercice 1

Affichez l’identifiant et le nom des salles qui sont des SMAC.
```js
db.salles.find({smac:true},{nom:true});
```
Exercice 2

Affichez le nom des salles qui possèdent une capacité d’accueil strictement supérieure à 1000 places.
```js
db.salles.find({capacite:{$gt:1000}},{nom:true, '_id':false});
```
Exercice 3

Affichez l’identifiant des salles pour lesquelles le champ adresse ne comporte pas de numéro.
```js
db.salles.find({"adresse.numero":null},{_id:true});
```

Exercice 4

Affichez l’identifiant puis le nom des salles qui ont exactement un avis.
```js
db.salles.find({ avis: { $size: 1 } },{_id:true},{nom:true});
```
Exercice 5

Affichez tous les styles musicaux des salles qui programment notamment du blues.
```js
db.salles.find({ styles: { $elemMatch: {$eq:"blues"} } },{styles:true});
```
Exercice 6

Affichez tous les styles musicaux des salles qui ont le style « blues » en première position dans leur tableau styles.
```js
db.salles.find({ "styles.0" : "blues" },{styles:true});
```
Exercice 7

Affichez la ville des salles dont le code postal commence par 84 et qui ont une capacité strictement inférieure à 500 places (pensez à utiliser une expression régulière).
```js
db.salles.find({"adresse.codePostal": {$regex:/\A84/},capacite:{$lt:500}},{"adresse.ville":true});
```
Exercice 8

Affichez l’identifiant pour les salles dont l’identifiant est pair ou le champ avis est absent.
```js
db.salles.find({$or:[{_id: { $mod: [ 2, 0 ] }},{avis:null}]},{_id:true});
```
Exercice 9

Affichez le nom des salles dont au moins un des avis comporte une note comprise entre 8 et 10 (tous deux inclus).
```js
db.salles.find({"avis.note":{$gte:8},"avis.note":{$lte:10}},{nom:true});
```
Exercice 10

Affichez le nom des salles dont au moins un des avis comporte une date postérieure au 15/11/2019 (pensez à utiliser le type JavaScript Date).
```js
    db.salles.find({"avis.date":{$gt:new Date('2019-11-15')}},{nom:1, '_id': 0})

    db.salles.find({"avis": {$elemMatch: {date: {$gt: new Date('2019-11-15')}}},{nom:1, '_id': 0})
```
Exercice 11

Affichez le nom ainsi que la capacité des salles dont le produit de la valeur de l’identifiant par 100 est strictement supérieur à la capacité.
```js
db.salles.find({$expr: { $gt: [{ $multiply: ["$_id", 100] }, "$capacite"] }}, {_id: true,nom: true,capacite: true})
```
Exercice 12

Affichez le nom des salles de type SMAC programmant plus de deux styles de musiques différents en utilisant l’opérateur $where qui permet de faire usage de JavaScript.
```js
recup exo 12 du prof
db.salles.find({smac: true,$where: function() {return this.styles && this.styles.length > 2;}}, {_id: 0,nom: 1})
```
Exercice 13

Affichez les différents codes postaux présents dans les documents de la collection salles.
```js
db.salles.distinct("adresse.codePostal")
```
Exercice 14

Mettez à jour tous les documents de la collection salles en rajoutant 100 personnes à leur capacité actuelle.
```js
db.salles.updateMany({}, {$inc: { capacite: 100 }})
```
TODO: Comment cast 100 en NumberInt ?

$toInt has the following syntax:
{
   $toInt: <expression>
}
The $toInt
 takes any valid expression.
The $toInt is a shorthand for the following $convert expression:
{ 
    $convert: { input: <expression>, to: "int" } 
}

Exercice 15

Ajoutez le style « jazz » à toutes les salles qui n’en programment pas.
```js
db.salles.updateMany({}, {$addToSet :{styles : "jazz"}})
```
Exercice 16

Retirez le style «funk» à toutes les salles dont l’identifiant n’est égal ni à 2, ni à 3.
```js
db.salles.updateMany({ _id: { $nin: [2, 3] }, styles: "funk" },{ $pull: { styles: "funk" } } )
```
Exercice 17

Ecraser les styles actuels du tableau composé des styles à la salle dont l’identifiant est 3 par «techno» et « reggae».
```js
db.salles.updateOne({ _id: {$eq : 3}}, {$set : {styles: ["techno","reggae"]}})
```
Exercice 18

Pour les salles dont le nom commence par la lettre P (majuscule ou minuscule), augmentez la capacité de 150 places et rajoutez un champ de type tableau nommé contact dans lequel se trouvera un document comportant un champ nommé telephone dont la valeur sera « 04 11 94 00 10 ».
```js
db.salles.updateMany({ nom: {$regex : /^[pP]/}}, {$set :{"contact.telephone" : "04 11 94 00 10"}, $inc: { capacite: 150 }})
```
Exercice 19

Pour les salles dont le nom commence par une voyelle (peu importe la casse, là aussi), rajoutez dans le tableau avis un document composé du champ date valant la date courante et du champ note valant 10 (double ou entier). L’expression régulière pour chercher une chaîne de caractères débutant par une voyelle suivie de n’importe quoi d’autre est [^aeiou]+$.
```js
db.salles.updateMany({ nom: {$regex : /^[aAeEiIoOuU]+$/}}, {$push :{avis: { date : new Date(), note : 10} }})
```
Exercice 20

En mode upsert(si rien, création d'un nouveau), vous mettrez à jour tous les documents dont le nom commence par un z ou un Z en leur affectant comme nom « Pub Z », comme valeur du champ capacite 50 personnes (type entier et non décimal) et en positionnant le champ booléen smac à la valeur « false ».
```js
db.salles.updateMany(
  { nom: /^z/i },
  { $set: { nom: "Pub Z", capacite: 50, smac: false } },
  { upsert: true }
);
```

Exercice 21

Affichez le décompte des documents pour lesquels le champ _id est de type « objectId ».
```js
db.salles.find({"_id": {$type: "objectId"}}).count()

db.salles.countDocuments({"_id": {$type: "objectId"}})
```

Exercice 22

Pour les documents dont le champ _id n’est pas de type « objectId », affichez le nom de la salle ayant la plus grande capacité. Pour y parvenir, vous effectuerez un tri dans l’ordre qui convient tout en limitant le nombre de documents affichés pour ne retourner que celui qui comporte la capacité maximale.
```js
db.salles.find({"_id": {$not: {$type: "objectId"}}}, {"_id": 0, "nom": 1 }).sort({"capacite": -1}).limit(1)
```

Exercice 23

Remplacez, sur la base de la valeur de son champ _id, le document créé à l’exercice 20 par un document contenant seulement le nom préexistant et la capacité, que vous monterez à 60 personnes.
```js
db.salles.replaceOne(
  { _id: ObjectId("5d12edfd09ffef") },
  { nom: "Pub Z", capacite: 60 }
);
```

Exercice 24

Effectuez la suppression d’un seul document avec les critères suivants : le champ _id est de type « objectId » et la capacité de la salle est inférieure ou égale à 60 personnes.
```js
db.salles.deleteOne({"_id": {$type: "objectId"}, "capacite": {$lte: 60}})
```

Exercice 25

À l’aide de la méthode permettant de trouver un seul document et de le mettre à jour en même temps, réduisez de 15 personnes la capacité de la salle située à Nîmes.
```js
db.salles.findOneAndUpdate(
  { "adresse.ville": "Nîmes" },
  { $inc: { capacite: -15 } }
);
```

## Notes autres

### Notes docker
Pour lancer mongo avec docker :
```bash
#dans le terminal

docker pull mongo # récupère l'image mongo

docker run -d -p 27017:27017 --name mongo mongo #lance un container mongo

docker exec -it mongo /bin/bash # se connecte au container mongo

mongosh # lance le shell mongo

docker run -d -p 27017:27017 --name mongo -v C:\Users\Administrateur\Desktop\mongoCSV:/home mongo

docker exec -it mongo /bin/bash # se connecte au container mongo

cd home

mongoimport --db=sample_db --collection="MotorVehiculeCollisions" --type=csv --headerline --file="Motor_Vehicule_Collisions_-_Crashes_20240130.csv"

service windows -> fermer mongo et compass

ouvrir docker et faire "mongosh" dans exec 

#ensite dans compass "new connexion" mettre le lien suivant qui l'on obtient dans docker :
mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1
```
Expliquation des options :

- -- type: precise le type de fichier, par defaut json
- -d: nom de la base de données
- -c/ -- collection: nom de la collection
- -- headerline: indique que la premiere ligne du fichier est le header
- -- drop: supprime la collection avant d'importer les données

#### Exercice docker 
ajouter les restaurants : 
cd home  
mongoimport --db=restaurant_db --collection=restaurant --type=json --file=restaurants.json

récupérez la liste des restaurants ayant un grade inférieur à un score de 10 (Afficher cette liste sous forme de projection {name, grades.scores}) 
```js
db.restaurant.find({$or:[{_id: { $mod: [ 2, 0 ] }},{avis:null}]},{name, grades.scores})
```
récupérez la liste des restaurants ayant uniquement des grades inférieur à 10 
```js

```
### Notes geospatiales
Index : Ralentit l'écriture mais optimise les opérations de lecture dans la bdd.  
Un index est une stucture de donnees qui stockent une petite partie des donnees de la collection. Cela
permet d'accelerer les requetes. Les indexes ameliorent aussi les performances des requetes de tri et de
regroupement.

Pour créer un index :
```bash
db .< collection>. createIndex({"<champ>": "<type d'index>")
```

Pour lister les indexes d'une collection :
```bash
db .< collection>.getIndexes()
```

Pour supprimer un index :
```bash
db .< collection>.dropIndex({"<champ>": "<type d\'index>"})
```

#### Les requetes geospatiales 

##### Le standard GeoJson

GEOJson est un format open-source pour representer des donnees geographiques. Il est base sur le format
JSON. Il permet de représenter des points, des lignes, des polygones, des multipoints, des multilignes,
des multipolygones et des géométries géométriques.

Plus d'informations sur le site officiel : https://geojson.org/

#### Les index geospatiaux

MongoDB vous propose des index geospatiaux pour améliorer les performances des requêtes geospatiales. Il
existe deux types d'index geospatiaux : les index 2d et les index 2dsphere.

```sh
db.plan. createIndex({"geodata": "2d"}) # index 2d
```
##### Les index 2d

Ils utilisent des couples de coordonnées appelés `legacy`. Les index 2d ne prennent pas en charge les sphères et les calculs de distance sur une sphère. Ils ne prennent pas en charge les index sur plusieurs champs.

Exemple d'insertion de données :

```sh
db.plan. insert({"nom": "Point 1", "geodata": [1,1]})
```
On peut aussi stocker des coordonnees avec des index2d:
```js
db.plan.insert({"nom": "Point 1", "geodata": [4.805528, 43.949317]}); // lon en premier puis lat
//ou
db.plan. insert ({
"nom": "Point 2",
"geodata": {"lon": 4.805528, "lat": 43.949317},
});
```
#### Les index 2dsphere

Comme nous l'avons déjà dit, l'index 2dsphere est préconisé dès lors que des requêtes géospatiales
utilisent la géométrie sphérique. Ce type d'index géospatial prend en charge deux sortes de coordonnées :

- les coordonnées legacy dont nous avons parlé plus haut

- les objets GeoJSON

Lorsque des coordonnees legacy sont utilisees, MongoDB les convertit en objet GeoJSON de type Point donc,
quoiqu'il arrive, ce sont ces objets qui sont utilisés en coulisses !

### Les objets GeoJSON

Voici la structure d'un objet GeoJSON :

```json
{
"type": "Point",
"coordinates": [125.6, 10.1]
}
```
et la structure generique :
`{ "type": "<type>", "coordinates": <coordinates> }`

#### L'operateur $nearSphere

La syntaxe generique est la suivante:

```js
{
$nearSphere: {
    $geometry: {
        type : "Point",
        coordinates : [ <longitude>,
        <latitude> ]
    },
    $minDistance: <distance en mètres>,
    $maxDistance: <distance en mètres>
    }
}
```

#### L'operateur $geoWithin

la syntaxe generique est :

```js
{
    <champ des documents contenant les
    coordonnées>: {
        $geoWithin: {
            $geometry: {
                type: < "Polygon" ou
                bien "MultiPolygon
                > ,
                coordinates: [ <
                coordonnées > ]
            }
        }
    }
}
```

#### L'operateur $geoIntersects

La syntaxe generique est :
```js
{
    <champ des documents contenant les
    coordonnées>: {
        $geoIntersects: {
            $geometry: {
                "type": < Tout type
                d objet GeoJSON> ,
                "coordinates": [ <
                coordonnées > ]
            }
        }
    }
}
```
### Exercices Geo

Exercice 1
Vous disposez du code JavaScript suivant qui comporte une fonction de conversion d’une distance exprimée en kilomètres vers des radians ainsi que d’un document dont les coordonnées serviront de centre à notre sphère de recherche. Écrivez la requête qui affichera le nom des salles situées dans un rayon de 60 kilomètres et qui programment du Blues et de la Soul.

```js
var KilometresEnRadians = function(kilometres){ var rayonTerrestreEnKm = 6371;
return kilometres / rayonTerrestreEnKm;
};
 
var salle = db.salles.findOne({"adresse.ville": "Nîmes"});
 
var requete = {"adresse.localisation": {
    $geoWithin: {
      $centerSphere: [salle.adresse.localisation.coordinates, KilometresEnRadians(60)]
    }
  },
  "styles": { $all: ["blues", "soul"] }
};
 
db.salles.find(requete, { _id: 0, nom: 1 });
```

Exercice 2
Écrivez la requête qui permet d’obtenir la ville des salles situées dans un rayon de 100 kilomètres autour de Marseille, triées de la plus proche à la plus lointaine :

```js
  var marseille = {"type": "Point", "coordinates": [43.300000, 5.400000]};
  db.salles.find({"adresse.localisation.coordinates": { $geoWithin: { $centerSphere: [marseille.coordinates, 100 / 6371] }}}, { "_id": 0, "adresse.ville": 1 }).sort({"adresselocalisation.coordinates": 1 });
```

Exercice 3
 Soit un objet GeoJSON de la forme suivante :
```js
var polygone = {
  type: "Polygon",
  coordinates: [
    [
      [43.94899, 4.80908],
      [43.95292, 4.80929],
      [43.95174, 4.8056],
      [43.94899, 4.80908],
    ],
  ],
};
```
Donnez le nom des salles qui résident à l’intérieur.
```js
var polygone = {type:"Polygon",coordinates: [[[43.94899, 4.80908], [43.95292, 4.80929],[43.95174, 4.8056],[43.94899, 4.80908],],],  };

  db.salles.find({"adresse.localisation.coordinates": {$geoWithin: {$geometry: polygone}}},    { "_id": 0, "nom": 1 });
  ```

### Exercice GEO suite : 

Télécharger les jeux d'essais suivants : https://raw.githubusercontent.com/mongodb/docs-assets/geospatial/restaurants.json https://raw.githubusercontent.com/mongodb/docs-assets/geospatial/neighborhoods.json
1.
Creation d'un index 2dsphere Un index géospatial, et améliore presque toujours les performances des requêtes $geoWithin et $geoIntersects. Comme ces données sont géographiques, créez un index2dsphère sur chaque collection en utilisant le shell mongo :
```js
db.restaurants2.createIndex({"location": "2dsphere"});
```
```js
db.neighborhoods.createIndex({"geometry": "2dsphere"});
```
Pour consulter les indexes disponibles faire : db.x.getIndexes();
2.
Attention, la création d'un index est OBLIGATOIRE pour permettre l'utilisation des arguments :$geoIntersects, $geoSphere, $geoNear, $geoWithin, $centerSphere, $nearSphere , etc...
Explorez les données, documentez votre démarche et vos résultats dans un fichier geo_exo_suite_suite.md (dans mon cas je vais continuer dans ce fichier).

Trouvez la commande qui va retourner le restaurant Riviera Caterer... De quel type d'objet GeoJSON s'agit-il ?
```js
db.restaurants2.find({name:'Riviera Caterer'});
```
```js

{
  _id: ObjectId('55cba2476c522cafdb053adf'),
  location: {
    coordinates: [
      -73.98241999999999,
      40.579505
    ],
    type: 'Point'
  },
  name: 'Riviera Caterer'
}
```
3.
Trouvez "Hell's kitchen"("Hell'S Kitchen"dans la bdd) au sein de la collection "neighborhoods" et retournez le nom du quartier. Quelle est la superficie totale de ce quartier ?
```js
var requete = db.restaurants2.findOne({name:"Hell'S Kitchen"});
  db.neighborhoods.find({geometry: {$geoIntersects: {$geometry: requete.location}}},{ "_id": 0, "name": 1 });
  ```
  J'utilise findOne dans la premiere requete pour recevoir un document au lieu d'un tableau de docuement afin de simplifier l'utilisation de la variable requete.
4.
Trouvez la requete type qui permet de recuperer le nom du quartier a partir d'un point donné.
```js
var point = {coordinates:[-73.99067,40.761553], type: 'Point'} 
    db.Neighborhoods.findOne({ geometry: {$geoIntersects: {$geometry: point}}},{ "geometry": 0, "_id": 0})
  ```
5.
Trouver la requete qui trouve les restaurants dans un rayon donné (8km par exemple)
```js
var rayondonne = 8000;
var point = {type: 'Point',coordinates:[-73.99067,40.761553]};
db.restaurants2.find({location:{$nearSphere: {$geometry: point,$maxDistance: rayondonne}}},{ _id: 0, name: 1 });
```

### Text Search
MongoDB prend en charge les opérations de requête qui effectuent une recherche sémantique sur le contenu des chaînes de caractères. Pour effectuer une recherche textuelle, MongoDB utilise un index de texte et l'opérateur $text.

#### Création d'un jeu d'essai
Commandes:
```js
use stores
db.stores.insertMany(
    [
        {_id: 1, name: "Java Hut", description: "Coffee and cakes"},
        {_id: 2, name: "Burger Buns", description: "Gourmet hamburgers"},
        {_id: 3, name: "Coffee Shop", description: "Just coffee"},
        {_id: 4, name: "Clothes Clothes Clothes", description: "Discount clothing"},
        {_id: 5, name: "Java Shopping", description: "Indonesian goods"}
    ]
)
```
#### Création d'un index de texte
MongoDB fournit des index de texte afin de permettre d'effectuer des recherches semantiques sur le contenu des chaines de caracteres. Ces index peuvent inclure n'importe quel champ de type string ou array de string. Pour effectuer ce type de recherche, il faut créer un index de texte sur le champ de la collection. Une collection ne peut avoir qu'un seul index de texte, mais cet index peut inclure plusieurs champs. Par exemple, pour créer un index de texte sur les champs name et description de la collection stores, il faut utiliser la commande suivante:
```js
db.stores.createIndex({ name: "text", description: "text" });
```
-L'operateur $text
Vous pouvez utiliser l'opérateur de recherche $text pour effectuer des recherches textuelles sur un champ indexé de type string ou array de string. Par exemple, pour rechercher les documents qui contiennent le mot "coffee" dans le champ name ou description, il faut utiliser la commande suivante:
```js
db.stores.find({ $text: { $search: "coffee" } });
```
-Term Exclusion
Pour exclure un mot, vous pouvez le 'marquer' avec un signe - (moins). Par exemple, pour rechercher les documents qui contiennent le mot "coffee" dans le champ name ou description mais pas le mot "shop", il faut utiliser la commande suivante:
```js
db.stores.find({ $text: { $search: "coffee -shop" } });
```
-Sort by Text Score
L'opérateur $text attribue un score à chaque document qui contient les termes de recherche. Le score représente la pertinence d'un document par rapport à la recherche. MongoDB retourne les documents triés par ordre décroissant du score de pertinence. Le score de pertinence est le nombre de fois que le terme de recherche apparaît dans le document. Afin de trier les résultats dans l'ordre du score de pertinence, vous devez explicitement projeter le champ $meta:textScore et utiliser la méthode sort().
```js
db.stores
  .find(
    { $text: { $search: "java coffee shop" } },
    { score: { $meta: "textScore" } }
  )
  .sort({ score: { $meta: "textScore" } });
```
#### Exercice:

Récupérez le jeu de données suivant:

https://124492699-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-MSOt80X0hisISagHUcn%2F-MT530f32heVh6pbC-yL%2F-MT5GBX4l_aq7_jYugje%2FlistingsAndReviews.rar?alt=media&token=6ff79e5f-b538-4597-a200-4c957618939d&__cf_chl_tk=3QSalTOgSvpjHiE91qYx7luk0EeVESonVaDdE.DFSdk-1706708124-0-gaNycGzND5A

#### Consignes :

importez le jeu d'essai, decrivez le
Le jeu d'essai contient une liste de logement.

creer un index de text sur les champs summary, description et name
```js
db.stores.createIndex({summary: "text",description:"text",name:"text"});
```

Lister tous les appartements contenant le terme duplex
```js
db.stores.find({ $text: { $search: "duplex" } },{name:1});
```

Compter le nombre d'appartements qui possède un lit king size
```js
db.stores.count({bed_type: "king size" });
```

Compter combien d'appartements ont pour description cozy, studio mais pas furnish (a partir de cette etape supprimez l'index et le placer uniquement sur la description)
```js
db.stores.dropIndex('summary_text_description_text_name_text');
db.stores.createIndex({description:"text"});
db.stores.find({ $text: { $search: "cozy, studio -furnish" } ,property_type:"Apartment"}).count();
```

### API

Télécharger la dernière version de node.js.
· Créez une application Web :
    - npm init -y
    - npm install express
    - npm i mongoose
    - npm i dotenv
    - npm install --save-dev nodemon <!--/!\ car "npm i nodemon" seul n'est pas bon /!\-->
· Utilisez le pattern MVC pour l'architecture de votre application.
· Expliquez le principe de middlewares (express) et utilisez en dans votre application.
· Connectez votre application à une base de données MongoDB
· Mettez en place l'authentification avec JWT:
    - npm i jsonwebtoken
    - npm i bcryptjs

Faites attention à la façon dont vous installez ces différents packages. Certains ne sont utiles que pour le développement, d'autres pour la production.

### Exercice d'entrainement au contrôle

Je souhaite mettre en place l'équivalent d'une jointure sql dans un cas d'utilisation de mongoDB, je vais donc utiliser aggregate et $lookup.
Je dois faire en sorte d'avoir un champ similaire dans mes tables qui me servira de clef, ici ce sera le nom Palais des Papes provenant de la collection d'avignon que je vais utiliser, je vais créer une quatrième salle dans ma collection salles et tenter de mettre en place mon équivalent de jointure.

```js
db.salles.insertOne({_id : 4, nom : "Palais des Papes"}); //créer une salle avec un champ qui servira de clef

db.salles.aggregate([{$lookup: {from: "avignon", localField: "nom", foreignField : "nom", as: "avignon"}}, {$match : {nom : "Palais des Papes"}},{$project : {_id:0, nom:1, "avignon.localisation": 1}}])  //créer l'équivalent de la jointure pour récupérer des données de la collection avignon
```

encore une requete d'entrainement :
```js
db.salles.updateOne({_id : 4}, {$set:{bed_type : "Real Bed"}}); //créer un nouveau champ dans la meme salle qui re-servira de clef

db.salles.aggregate([{$lookup: {from: "stores", localField: "bed_type", foreignField : "bed_type", as: "stores"}}, {$match : {bed_type : "Real Bed"}},{$project : {_id:0, bed_type:1, "stores.room_type": 1}}])  //créer l'équivalent de la jointure pour récupérer des données de la collection store
```

### Evaluation

Vous devez interroger une collection de personnes pour trouver les trois individus les plus jeunes qui ont un emploi dans le domaine de l'ingénierie, triés par le plus jeune en premier

```js
db.persons.find({ vocation: "ENGINEER" }).sort({ dateofbirth: -1 }).limit(3)
```

Vous devez générer un rapport pour montrer ce que chaque client de la boutique a acheté en 2020. Vous regrouperez les enregistrements de commandes individuelles par client, en notant la date du premier achat de chaque client, le nombre de commandes qu'ils ont passées, la valeur totale de toutes leurs commandes, et une liste de leurs articles de commande triés par date.

```js
db.orders.aggregate([
  {
    $match: {
      orderdate: {
        $gte: ISODate("2020-01-01T00:00:00Z"),
        $lt: ISODate("2021-01-01T00:00:00Z")
      }
    }
  },
  {
    $sort: {
      orderdate: 1
    }
  },
  {
    $group: {
      _id: "$customer_id",
      firstPurchase: { $first: "$orderdate" },
      totalOrders: { $sum: 1 },
      totalValue: { $sum: "$value" },
      items: {
        $push: {
          orderdate: "$orderdate",
          value: "$value"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      customer_id: "$_id",
      firstPurchase: 1,
      totalOrders: 1,
      totalValue: 1,
      items: 1
    }
  }
]);
```

Vous souhaitez générer un rapport de vente au détail pour lister la valeur totale et la quantité de produits chers vendus (d'une valeur supérieure à 15 dollars). Les données sources sont une liste de commandes de magasin, où chaque commande contient l'ensemble des produits achetés dans le cadre de la commande.
Operateur : $unwind :
(from doc) Document Operand with Options, You can pass a document to $unwind to specify various behavior options :
{
  $unwind:
    {
      path: <field path>,
      includeArrayIndex: <string>,
      preserveNullAndEmptyArrays: <boolean>
    }
}

```js
db.orders.aggregate([
  { $unwind: "$products" },
  { $match: { "products.price": { $gt: NumberDecimal("15") } } },
  { $group: {
      totalValue: { $sum: "$products.price" },
      totalCount: { $sum: 1 },
      _id: 0
    }
  }
]);
```

Vous souhaitez interroger une collection de personnes où chaque document contient des données sur une ou plusieurs langues parlées par la personne. Le résultat de la requête doit être une liste alphabétiquement triée de langues uniques qu'un développeur peut ensuite utiliser pour peupler une liste de valeurs dans un widget de liste déroulante d'une interface utilisateur.
Cet exemple est l'équivalent d'une instruction SELECT DISTINCT en SQL.

```js
db.persons.distinct("language");

//////////////////    ou     //////////////////

db.persons.aggregate([
  { $unwind: "$language" },
  { $group: { _id: null, languages: { $addToSet: "$language" } } },
  { $unwind: "$languages" },
  { $sort: { languages: 1 } },
  { $group: { _id: null, languages: { $push: "$languages" } } }
]);
```

Vous souhaitez générer un rapport pour lister tous les achats en magasin pour 2020, en montrant le nom et la catégorie du produit pour chaque commande, plutôt que l'ID du produit. Pour ce faire, vous devez prendre la collection de commandes des clients et joindre chaque enregistrement de commande au produit correspondant dans la collection de produits. Il y a une relation plusieurs-à-un entre les deux collections, résultant en une jointure un-à-un lors de la correspondance d'une commande à un produit. La jointure utilisera une comparaison de champ unique entre les deux côtés, basée sur l'ID du produit.
Commençons par choisir le jeu de données et le préparer pour le pipeline d'agrégation.
Operateur: $lookup

```js
db.orders.aggregate([
  {
    $match: {
      orderdate: {
        $gte: ISODate("2020-01-01T00:00:00Z"),
        $lt: ISODate("2021-01-01T00:00:00Z")
      }
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "id",
      as: "product_info"
    }
  },
  {
    $unwind: "$product_info"
  },
  {
    $project: {
      _id: 0,
      customer_id: 1,
      orderdate: 1,
      value: 1,
      product_name: "$product_info.name",
      product_category: "$product_info.category"
    }
  }
]);
```

Vous voulez générer un rapport pour lister toutes les commandes effectuées pour chaque produit en 2020. Pour ce faire, vous devez prendre une collection de produits d'une boutique et joindre chaque enregistrement de produit à toutes ses commandes stockées dans une collection de commandes. Il y a une relation un-à-plusieurs entre les deux collections, basée sur la correspondance de deux champs de chaque côté. Plutôt que de joindre sur un seul champ tel que product_id (qui n'existe pas dans ce jeu de données), vous devez utiliser deux champs communs pour joindre (product_name et product_variation).

```js
db.products.aggregate([
  {
    $lookup: {
      from: "orders",
      let: { product_name: "$name", product_variation: "$variation" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$$product_name", "$product_name"] },
                { $eq: ["$$product_variation", "$product_variation"] },
                {
                  $gte: ["$orderdate", ISODate("2020-01-01T00:00:00Z")],
                },
                {
                  $lt: ["$orderdate", ISODate("2021-01-01T00:00:00Z")]
                }
              ]
            }
          }
        }
      ],
      as: "product_orders"
    }
  },
  {
    $match: {
      product_orders: { $ne: [] }
    }
  }
]);
```