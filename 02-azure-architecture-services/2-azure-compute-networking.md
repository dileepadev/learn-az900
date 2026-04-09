# Azure Compute and Networking Services

Table of Contents

- [Azure Compute and Networking Services](#azure-compute-and-networking-services)
  - [Azure Compute Services](#azure-compute-services)
    - [Azure Virtual Machines](#azure-virtual-machines)
      - [VM Scale Sets](#vm-scale-sets)
      - [VM Availability Sets](#vm-availability-sets)
    - [Azure Virtual Desktop](#azure-virtual-desktop)
    - [Azure Containers](#azure-containers)
      - [Azure Container Instances](#azure-container-instances)
      - [Azure Container Apps](#azure-container-apps)
      - [Azure Kubernetes Service](#azure-kubernetes-service)
    - [Azure Functions](#azure-functions)
    - [Azure App Service](#azure-app-service)
  - [Azure Networking Services](#azure-networking-services)
    - [Azure Virtual Network (VNet)](#azure-virtual-network-vnet)
    - [Azure Virtual Private Network (VPN) Gateway](#azure-virtual-private-network-vpn-gateway)
    - [Azure ExpressRoute](#azure-expressroute)
    - [Azure Domain Name System (DNS)](#azure-domain-name-system-dns)

## Azure Compute Services

- Azure compute is an on-demand computing service that provides computing resources such as processing power, memory, networking, and storage.
- Azure compute services allow you to run applications and workloads in the cloud without having to manage the underlying infrastructure.

### Azure Virtual Machines

- Azure Virtual Machines (VMs) are a type of compute service that allows you to create and manage virtualized computing resources in the cloud.
- Azure VMs include virtualized hardware resources such as CPU, memory, storage, and networking.
- Azure VMs can run a variety of operating systems, including Windows and Linux.
- Azure VMs can be used for a wide range of applications, including web hosting, application development, and data processing.
- Azure VMs can be scaled up or down based on demand, allowing you to optimize costs and performance.
- Azure VMs can be managed using the Azure portal, Azure CLI, PowerShell, or Azure Resource Manager templates.

#### VM Scale Sets

- Azure Virtual Machine Scale Sets (VMSS) are a type of compute service that allows you to load balance and automatically scale a group of identical VMs.
- VMSS allows you to create and manage a group of VMs that are configured identically and can be automatically scaled based on demand.
- VMSS can automatically scale the number of VMs based on demand, allowing you to optimize costs and performance.
- VMSS can be used for applications that require high availability and scalability, such as web applications, microservices, and big data processing.

#### VM Availability Sets

- Azure VM Availability Sets are a feature that allows you to group VMs together to ensure high availability and fault tolerance.
- Availability Sets ensure that VMs are distributed across multiple fault domains and update domains, reducing the risk of downtime due to hardware failures or maintenance.
- VMs in an Availability Set are automatically distributed across multiple fault domains and update domains, ensuring that if one domain experiences a failure, the other VMs in the set will continue to operate.
- Availability Sets are recommended for applications that require high availability, such as web applications, databases, and critical workloads.

### Azure Virtual Desktop

- Azure Virtual Desktop (AVD) is a desktop and application virtualization service that allows you to provide remote access to desktops and applications from anywhere.
- AVD allows you to create and manage virtual desktops and applications in the cloud, providing a secure and scalable solution for remote work and application delivery.
- AVD support Windows virtual desktops and applications, allowing you to provide a consistent experience for users regardless of their device or location.

### Azure Containers

- A container is a lightweight, portable package that includes your app code and everything it needs to run (libraries, settings, dependencies).
- Unlike a Virtual Machine, a container does not include a full operating system. It shares the host OS kernel, making it much smaller and faster to start.
- Think of it as a box with everything your app needs, that works the same way on any machine.

| Service | Type | Use When |
| --- | --- | --- |
| Container Instances | PaaS | Quickly run a single container, no infrastructure setup |
| Container Apps | PaaS | Build microservices or event-driven apps with auto-scaling |
| Kubernetes Service | PaaS | Manage complex, large-scale containerized apps with full control |

#### Azure Container Instances

- The simplest way to run a container in Azure. No need to set up VMs, clusters, or any infrastructure.
- Just provide a container image and Azure runs it for you instantly.
- **Best for:** one-off tasks, batch jobs, quick testing, or simple apps that don't need scaling.

#### Azure Container Apps

- A managed service for running containers that need to scale automatically based on traffic or events.
- Supports running containerized applications without managing infrastructure.
- **Best for:** microservices, API backends, background workers, and event-driven applications.

#### Azure Kubernetes Service

- A fully managed Kubernetes service on Azure.
- Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.
- Provides advanced orchestration features like load balancing, service discovery, rolling updates, and self-healing.
- Gives you full control over how containers are deployed, networked, and scaled.
- **Best for:** enterprise-grade, large-scale applications that need advanced orchestration, custom configurations, and full Kubernetes capabilities.

### Azure Functions

- Azure Functions is a serverless compute service that allows you to run code on-demand without having to manage infrastructure.
- Azure Functions can be triggered by various events, such as HTTP requests, timers, or messages from other Azure services.
- Azure Functions can be used for a wide range of applications, including data processing, event handling, and backend services.
- Azure Functions can automatically scale based on demand, allowing you to optimize costs and performance.
- Azure Functions can be developed using various programming languages, including C#, JavaScript, Python, and PowerShell.

### Azure App Service

- Azure App Service is a fully managed platform for building, deploying, and scaling web apps and APIs.
- This is a PaaS offering that abstracts away the underlying infrastructure, allowing developers to focus on building their applications.
- Azure App Service supports multiple programming languages, including .NET, Java, Node.js, Python, and PHP.
- It provides built-in features such as auto-scaling, load balancing, and integrated security, making it easy to create and manage web applications without worrying about the underlying infrastructure.

## Azure Networking Services

- Azure networking services provide the infrastructure and tools to connect and secure your applications and resources in the cloud.
- Azure networking services include virtual networks, subnets, peering, DNS, VPN Gateway, ExpressRoute, and public and private endpoints.

### Azure Virtual Network (VNet)

- VNet enables Azure resources to securely communicate with each other, the internet, and on-premises networks.
- Public endpoints allow resources to be accessed over the internet from anywhere.
- Private endpoints allow resources to be accessed securely within the Azure network, without exposing them to the internet.
- VNets can be segmented into subnets, which can be used to organize and secure resources within the VNet.
- VNet peering allows you to connect VNets together, enabling resources in different VNets to communicate with each other as if they were on the same network.

### Azure Virtual Private Network (VPN) Gateway

- A VPN Gateway is a service that enables you to create secure, encrypted connections between your on-premises network and Azure Virtual Networks (VNets) over the public internet using VPN protocols (like IPsec/IKE).

### Azure ExpressRoute

- ExpressRoute is a service that enables you to create private, dedicated connections between your on-premises network and Azure VNets, bypassing the public internet, which can provide higher reliability, faster speeds, lower latency, and improved security.

> Quick Summary:
>
> - **VPN Gateway:** Uses the public internet (encrypted)
> - **ExpressRoute:** Uses a private dedicated connection (no public internet)

### Azure Domain Name System (DNS)

- Azure DNS is a hosting service for DNS domains that provides name resolution using Microsoft Azure infrastructure.
- Azure DNS allows you to manage your DNS records using the same credentials, APIs, tools, and billing as your other Azure services.
- Azure DNS provides high availability and performance for your DNS queries, ensuring that your applications and services are always accessible to users.
- Azure DNS supports both public and private DNS zones, allowing you to manage DNS for both internet-facing and internal resources.
