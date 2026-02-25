resource "google_artifact_registry_repository" "repo" {
    location = var.region
    repository_id = var.repository_id
    format = "DOCKER"
    project = var.project_id

    cleanup_policies {
      id = "keep-minium-versions"
      action = "KEEP"
      most_recent_versions {
        keep_count = 3
      }
    }
    
}

resource "google_artifact_registry_repository_iam_member" "viewer" {
    project = var.project_id
    repository = google_artifact_registry_repository.repo.name
    location = var.region
    role = "roles/artifactregistry.reader"
    member = "serviceAccount:${var.project_id}.svc.id.goog[default/default]"
    depends_on = [ google_container_cluster.gke ]
}