output "grafana_public_ip" {
  value = google_compute_address.static_ip_grafana.address
}

# modules/networking/outputs.tf

