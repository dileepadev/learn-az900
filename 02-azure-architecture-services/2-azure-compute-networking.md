# Azure Compute and Networking Services

Table of Contents

- [Azure Compute and Networking Services](#azure-compute-and-networking-services)
  - [Azure Compute Services](#azure-compute-services)
    - [Azure Virtual Machines](#azure-virtual-machines)
      - [VM Scale Sets](#vm-scale-sets)
      - [VM Availability Sets](#vm-availability-sets)
    - [Azure Virtual Desktop](#azure-virtual-desktop)

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
- AVD supports both Windows and Linux virtual desktops and applications, allowing you to provide a consistent experience for users regardless of their device or location.
