output "acceso_grafana" {
  description = "Copia y pega esta URL en tu navegador"
  value       = "http://${module.monitoring.grafana_public_ip}:3000"
}