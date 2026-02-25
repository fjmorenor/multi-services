output "db_connection_name" {
  value = google_sql_database_instance.db_instance
}

output "db_multiservicio" {
  value = google_sql_database.database.name
}

output "pubsub_topic_id" {
    value = google_pubsub_topic.topic.name
  
}

output "google_pubsub_topic_name" {
    value =google_pubsub_topic.topic.name
  
}

output "google_pubsub_subscription_name" {
    value = google_pubsub_subscription.subscription.name
}

output "vpc_id" {
  value       = google_compute_network.vpc.id
  description = "El ID de la red VPC para que otros módulos lo usen"
}