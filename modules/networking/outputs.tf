output "network_name" {
  value = google_compute_network.vpc.name # Antes tenías vpc_network
}

output "subnet_name" {
  value = google_compute_subnetwork.subnet.name # Antes tenías vpc_subnetwork
}

output "pods_range_name" {
  value = google_compute_subnetwork.subnet.secondary_ip_range[0].range_name
}

output "services_range_name" {
  value = google_compute_subnetwork.subnet.secondary_ip_range[1].range_name
}

output "pods_ip_cidr_range" {
    value = google_compute_subnetwork.subnet.secondary_ip_range[0].ip_cidr_range
}

output "services_ip_cidr_range" {
  value = google_compute_subnetwork.subnet.secondary_ip_range[1].ip_cidr_range
}
  
output "vpc_id" {
  # IMPORTANTE: Usar .id, no .name
  value = google_compute_network.vpc.id 
}