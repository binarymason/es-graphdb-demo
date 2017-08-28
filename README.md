# ElasticSearch and Neo4j Demo

## Importing data

Download data
```
bin/download
```

Start the docker stack
```
docker-compose up
```

In another window, start a neo4j shell inside the container
```
docker exec --interactive --tty neo4j_container bin/cypher-shell
```

Run this:
```
CREATE CONSTRAINT ON (n:Movie) ASSERT n.objectId IS UNIQUE;

CREATE CONSTRAINT ON (n:User) ASSERT n.objectId IS UNIQUE;

USING PERIODIC COMMIT 500
LOAD CSV FROM "file:///data/import/ml-100k/u.user" AS line FIELDTERMINATOR '|'
CREATE (:User {objectId: toInt(line[0]), age: toInt(line[1]), gender: line[2], occupation: line[3]});

USING PERIODIC COMMIT 500
LOAD CSV FROM "file:///data/import/ml-100k/u.item" AS line FIELDTERMINATOR '|'
CREATE (:Movie {objectId: toInt(line[0]), title: line[1], date: line[2], imdblink: line[4]});

USING PERIODIC COMMIT 500
LOAD CSV FROM "file:///data/import/ml-100k/u.data" AS line FIELDTERMINATOR '\t'
MATCH (u:User {objectId: toInt(line[1])})
MATCH (p:Movie {objectId: toInt(line[0])})
CREATE UNIQUE (u)-[:LIKES {user_age: u.age, user_gender: u.gender, user_id: u.id, user_occupation: u.occupation, movie_title: p.title, movie_id: p.id, rate: ROUND(toFloat(line[2])), timestamp: line[3]}]->(p);
```


## How to drop db

```
MATCH (n)
DETACH DELETE n;
```
