#! /bin/bash

header() {
  echo "==========================================="
  echo "$*"
  echo "==========================================="
}

header "CHECKING ELASTICSEARCH HEALTH..."
while [ "$(curl -s -w "%{http_code}" http://elasticsearch_container:9200)" -ne 200 ]; do
  echo "still waiting..."
  sleep 2
done
header "elasticsearch_container is UP!"

