resource "google_compute_address" "static_ip_grafana" {
    name = "ipv4-estatica-grafana"
    region = var.region
    
    }

resource "google_compute_instance" "grafana_vm" {
    machine_type = "e2-medium"
    name = "instancia-grafana"
    
    zone = var.zone
    tags = ["grafana-server"]

    boot_disk {
        initialize_params {
          image = "debian-cloud/debian-11"
        }
    }

    network_interface {
        network = var.network_name
        subnetwork = var.subnetwork_name

        access_config {
            nat_ip = google_compute_address.static_ip_grafana.address
          
        }
    }

 # Script de instalación automática
  metadata_startup_script = <<-EOT
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install -y apt-transport-https software-properties-common wget
    wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
    echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
    sudo apt-get update
    sudo apt-get install -y grafana
    sudo systemctl start grafana-server
    sudo systemctl enable grafana-server
  EOT 
    
}

