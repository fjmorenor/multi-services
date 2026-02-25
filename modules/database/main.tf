resource "google_sql_database_instance" "db-instance" {
    name = var.db_instance_name
    region = var.region
    project = var.project_id
    database_version = "POSTGRES_15"


settings {
  tier = "db-f1-micro"

ip_configuration {
  ipv4_enabled = false
  private_network ="private_network_name"
}
}

deletion_protection = false
    
}

resource "google_sql_database" "database" {
    name = var.db_multiservicio
    instance = google_sql_database_instance.db-instance.name
    
}

resource "google_pubsub_topic" "topic" {
    name = var.db_multiservicio
    project = var.project_id
    
}

resource "google_pubsub_subscription" "subscription" {
    name = "multiservicio-subscription"
    topic = google_pubsub_topic.topic.name
    project = var.project_id

    message_retention_duration = "604800s"
    
}