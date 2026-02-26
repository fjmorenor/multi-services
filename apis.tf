resource "google_project_service" "apis" {
for_each =toset( [
    "compute.googleapis.com",
    "container.googleapis.com",
    "sqladmin.googleapis.com",
    "pubsub.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "servicenetworking.googleapis.com"
    ])

project =var.project_id
service = each.key

disable_on_destroy = false


}
