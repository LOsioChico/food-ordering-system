# NestJS

This repo stages a NestJS microservices system inspired by the attached DDD / Hexagonal / SAGA / Outbox architecture but using NestJS.

## Start Kafka

```sh
cd ./apps/infrastructure/docker-compose
# Start Kafka Cluster
docker compose -f ./common.yml -f ./zookeeper.yml -f ./kafka_cluster.yml up -d
# Initialize Kafka Topics
docker compose -f ./common.yml -f ./init_kafka.yml up -d
# Start Kafka UI
docker compose -f ./common.yml -f ./kafka_ui.yml up -d
```

You can access the kafka-ui at http://localhost:8080
Configure the default Kafka Cluster called "local" on the kafka-ui with the following configurations:

- Cluster name: food-ordering-system-cluster
- Bootstrap Servers: kafka-broker-1:9092,kafka-broker-2:9092,kafka-broker-3:9092 (already configured)
- Schema Registry: http://schema-registry:8081

This cluster should have the following topics:
- customer
- payment-request
- payment-response
- restaurant-approval-request
- restaurant-approval-response
- __consumer_offsets (default)
- _schemas (default)

## References
[Microservices: Clean Architecture, DDD, SAGA, Outbox & Kafka (Udemy Course)](https://www.udemy.com/course/microservices-clean-architecture-ddd-saga-outbox-kafka-kubernetes)

## Status

Currently I'm dropping this project because it has a lot of overengineering and I'm not sure if it's worth the effort.