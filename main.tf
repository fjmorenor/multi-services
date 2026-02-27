module "networking" {
    source = "./modules/networking"
    project_id = var.project_id
    region = var.region
    pods_ip_cidr_range = var.ip_cidr_range
    pods_range_name = var.pods_range_name
    services_ip_cidr_range = var.services_ip_cidr_range
    services_range_name = var.services_range_name
    network_name = var.network_name
    subnet_name = var.subnet_name
    ip_cidr_range = var.ip_cidr_range
    depends_on = [google_project_service.apis]
}

module "kubernetes" {
    source = "./modules/kubernetes"
    project_id = var.project_id
    region = var.region
    pods_range_name = var.pods_range_name
    services_range_name = var.services_range_name
    repository_id = var.repository_id
    cluster_name = var.cluster_name
    network_name = var.network_name
    subnet_name = var.subnet_name
    depends_on = [google_project_service.apis]

  
}

module "database" {
    source = "./modules/database"
    project_id = var.project_id
    region = var.region
    db_multiservicio = var.db_multiservicio
    db_instance_name = var.db_instance_name
    vpc_id = module.networking.vpc_id
    depends_on = [google_project_service.apis]

      
}

module "monitoring" {
  source          = "./modules/monitoring"
  project_id      = var.project_id
  region          = var.region
  zone = var.zone
   # A la izquierda: el nombre de la variable DENTRO del módulo
  # A la derecha: el valor que viene del módulo de red
  network_name    = module.networking.network_name    
  subnetwork_name = module.networking.subnet_name 
}