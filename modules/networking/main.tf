resource "google_compute_network" "vpc" {
    name = var.network_name
    auto_create_subnetworks = false 
    project = var.project_id
    
}

resource "google_compute_subnetwork" "subnet" {
    name = var.subnet_name
    network = google_compute_network.vpc.id
    ip_cidr_range = "10.0.0.0/24"
    project = var.project_id
    region = var.region
    

secondary_ip_range {
  range_name = var.pods_range_name
  ip_cidr_range = "10.1.0.0/16"
  }

  secondary_ip_range {
    range_name = var.services_range_name
    ip_cidr_range = "10.2.0.0/20"
  }
    
}

resource "google_compute_router" "router" {
    name = "${var.network_name}-router"
    network = google_compute_network.vpc.name
    region = var.region
    project = var.project_id
    
}

resource "google_compute_router_nat" "nat" {
    name = "${var.network_name}-nat"
    router = google_compute_router.router.name
    nat_ip_allocate_option ="AUTO_ONLY"
    source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
}

resource "google_compute_firewall" "firewall" {
    name = "firewall"
    network = google_compute_network.vpc.name
    source_ranges = [ "130.211.0.0/22", "35.191.0.0/16" ]
    project = var.project_id
    allow {
      protocol = "tcp"
      ports = [ "80", "443" ]
    }
    allow {
      protocol = "icmp"
    }
    
}

resource "google_compute_global_address" "private_ip_address" {
  name = "google-managed-services-vpc"
  purpose = "VPC_PEERING"
  address_type = "INTERNAL"
  prefix_length = 16
  network = google_compute_network.vpc.id
  
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network = google_compute_network.vpc.id
  reserved_peering_ranges = [google_compute_global_address.private_ip_address.name]
  service = "servicenetworking.googleapis.com"
  
}