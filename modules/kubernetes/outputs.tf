output "google_container_cluster" {
    value = google_container_cluster.gke
  
}

output "endpoint" {
  value = google_container_cluster.gke.endpoint
}

output "registry_url" {
  value = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.repo_fichaje.repository_id}"
  description = "URL completa para el Docker Push"
}