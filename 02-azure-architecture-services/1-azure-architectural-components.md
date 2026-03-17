# Core Architectural Components of Azure

Table of Contents

- [Core Architectural Components of Azure](#core-architectural-components-of-azure)
  - [Azure Accounts](#azure-accounts)
  - [Azure Datacenters](#azure-datacenters)
  - [Azure Regions, Region Pairs, and Sovereign Regions](#azure-regions-region-pairs-and-sovereign-regions)
    - [Azure Regions](#azure-regions)
    - [Azure Region Pairs](#azure-region-pairs)
    - [Azure Sovereign Regions](#azure-sovereign-regions)
  - [Azure Availability Zones](#azure-availability-zones)

## Azure Accounts

- An Azure account is a user identity that allows you to access Azure services and resources. It is associated with an email address and can be used to sign in to the Azure portal, manage resources, and access billing information.
- Popular Account types:
  - Azure Account - Pay-As-You-Go account
  - Azure Account - Enterprise Agreement (EA) account
  - Azure Free Account - Free credits and some free services for 12 months
  - Azure for Students Account - Free credits and some free services for 12 months

## Azure Datacenters

- Azure datacenters are physical facilities that house the infrastructure and hardware required to provide Azure services and resources.
- Each datacenter is equipped with redundant power, cooling, and networking to ensure high availability and reliability for Azure services.
- Azure datacenters are distributed globally across multiple regions, allowing customers to deploy resources close to their users and meet data residency requirements.
- Azure datacenters are designed to provide secure and compliant environments for hosting Azure services and resources, with features such as physical security, access controls, and compliance certifications.

## Azure Regions, Region Pairs, and Sovereign Regions

### Azure Regions

- An Azure region is a geographical area that contains one or more datacenters.
- Each region is designed to provide high availability and low latency for Azure services and resources.
- Azure regions are distributed globally, allowing customers to deploy resources close to their users, meet data residency requirements and ensure compliance with local regulations.
- Examples of Azure regions include:
  - East US
  - West US
  - North Europe
  - West Europe
  - Southeast Asia
  - Japan East
  - Australia East
  - ... and many more.

### Azure Region Pairs

- Azure region pairs are two regions within the same geography that are paired together for disaster recovery and high availability purposes.
- Each region pair is designed to provide redundancy and failover capabilities in the event of a regional outage or disaster.
- Azure automatically replicates resources and data between the paired regions, ensuring that if one region experiences an outage, the other region can take over and provide continuity of service.
- Examples of Azure region pairs include:
  - East US and West US
  - North Europe and West Europe
  - UK South and UK West
  - Southeast Asia and East Asia
  - Japan East and Japan West
  - Australia East and Australia Southeast
  - ... and many more.

### Azure Sovereign Regions

- Azure sovereign regions are specialized regions that are designed to meet specific regulatory and compliance requirements for certain industries or government entities.
- These regions are isolated from the global Azure infrastructure and are operated by Microsoft in partnership with local providers to ensure compliance with local laws and regulations.
- Azure sovereign regions provide enhanced security, data residency, and compliance features to meet the needs of customers in regulated industries or government organizations.
- Examples of Azure sovereign regions include:
  - Azure Government (US)
  - Azure China (operated by 21Vianet)
  - Azure Germany (operated by Deutsche Telekom)
  - ... and many more.

## Azure Availability Zones

- Azure Availability Zones are physically separate locations (datacenters) within an Azure region that provide high availability and fault tolerance for Azure services and resources.
- Each Availability Zone is equipped with independent power, cooling, and networking to ensure that if one zone experiences an outage, the other zones can continue to operate.
- Availability Zones are designed to protect applications and data from datacenter failures, providing a higher level of availability and resilience.
- Examples of Azure services that support Availability Zones include:
  - Virtual Machines
  - Managed Disks
  - Load Balancers
  - SQL Databases
  - ... and many more.
