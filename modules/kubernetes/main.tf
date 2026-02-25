resource "google_container_cluster" "gke" {
    name = var.cluster_name
    location = var.region 

enable_autopilot = true

 network = var.network_name
 subnetwork = var.subnet_name

 ip_allocation_policy {
   cluster_secondary_range_name = var.pods_range_name
   services_secondary_range_name = var.services_range_name
 }   

release_channel {
  channel = "REGULAR"
}

private_cluster_config {
  enable_private_nodes = true
  enable_private_endpoint = false
  master_ipv4_cidr_block = "172.16.0.0/28"
}
}