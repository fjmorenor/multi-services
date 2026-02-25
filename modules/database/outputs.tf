output "db_connection_name" {
  value = google_sql_database_instance.db.instance.db_connection_name
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