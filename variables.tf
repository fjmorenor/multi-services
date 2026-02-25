#providers
variable "region" {
    type = string
}
variable "project_id" {
    type = string
}

#Networking
variable "network_name" {
    type = string
}

variable "subnet_name" {
    type = string
}

variable "ip_cidr_range" {
    type = string
}

variable "pods_range_name" {
    type = string
}

variable "pods_ip_cidr_range" {
    type = string
}

variable "services_range_name" {
    type = string
}

variable "services_ip_cidr_range" {
    type = string
}

#kubernetes
variable "repository_id" {
    type = string
}




variable "pubsub_topic_id" {
}


variable "google_pubsub_topic_name" {
}


variable "cluster_name" {
}

variable "db_multiservicio" {
}

variable "db_instance_name" {
}

variable "vpc_id" {
}