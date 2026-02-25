terraform {
  required_providers {
    google = {
        source = "hashicorp/google"
        version = "7.15.0"
    }
  }
backend "gcs" {
    bucket  = "multi-services-tfstate" # El nombre del bucket que creamos con gcloud
    prefix  = "terraform/state"       # La "carpeta" dentro del bucket donde se guardará
  }

}

provider "google" {
    project = var.project_id
    region = var.region
}

provider "google-beta" {
    project = var.project_id
    region = var.region
}

