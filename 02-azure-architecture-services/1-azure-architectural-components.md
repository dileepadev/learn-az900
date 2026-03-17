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
  - [Azure Resources and Resource Groups](#azure-resources-and-resource-groups)
    - [Azure Resources](#azure-resources)
    - [Azure Resource Groups](#azure-resource-groups)
  - [Azure Subscriptions](#azure-subscriptions)
  - [Azure Management Groups](#azure-management-groups)
  - [Hierarchy of Resource Groups, Subscriptions, and Management Groups](#hierarchy-of-resource-groups-subscriptions-and-management-groups)

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

## Azure Resources and Resource Groups

### Azure Resources

- An Azure resource is an instance of a service that can be created, managed, and used in Azure. Examples of Azure resources include virtual machines, storage accounts, databases, and web apps.
- Each Azure resource has a unique identifier and is associated with a specific Azure region, resource group, and subscription.
- Azure resources can be created, updated, and deleted using the Azure portal, Azure CLI, Azure PowerShell, or Azure Resource Manager templates.

### Azure Resource Groups

- An Azure resource group is a logical container that holds related Azure resources. It provides a way to manage and organize resources based on their lifecycle, permissions, and billing.
- One resource group can contain multiple resources but a resource can only belong to one resource group.
- Resources in a resource group can be located in different regions.
- Resources can move between resource groups.
- Resource groups cannot be nested within other resource groups.
- If applying certain actions to a resource group, such as deleting it, all resources within that resource group will also be affected.
- Resource groups can be used to manage access control, monitor resources, and organize billing for Azure resources. They provide a way to group related resources together for easier management and organization.

## Azure Subscriptions

- An Azure subscription is a logical container that holds Azure resources and provides a way to manage access, billing, and resource usage for those resources.
- One Azure account can have multiple Azure subscriptions, and each subscription can have multiple resource groups and resources within it.
- Each Azure subscription is associated with a specific Azure account and can have multiple resource groups and resources within it.
- Azure subscriptions provide a way to manage access control and permissions for resources, allowing you to assign different roles and permissions to users and groups at the subscription level.
- Azure subscriptions also provide a way to manage billing and costs for Azure resources, allowing you to track usage and costs for resources within the subscription and set up budgets and alerts to manage costs effectively.
- Azure subscriptions can be used to separate resources and manage access for different teams, projects, or environments within an organization, providing a way to organize and manage Azure resources effectively.
- Boundaries of Azure subscriptions:
  - Billing boundary: Each subscription has its own billing and cost management, allowing you to track and manage costs for resources within that subscription.
  - Access control boundary: Each subscription has its own access control and permissions, allowing you to assign different roles and permissions to users and groups at the subscription level.

## Azure Management Groups

- Azure management groups are a way to organize and manage multiple Azure subscriptions within an organization. They provide a way to apply governance, policies, and access control across multiple subscriptions.
- Management groups can be used to group subscriptions based on organizational structure, business units, or any other logical grouping that makes sense for the organization.
- Management groups can be nested, allowing you to create a hierarchy of management groups to reflect the structure of your organization and apply policies and access control at different levels of the hierarchy.
- Management groups provide a way to apply policies and access control across multiple subscriptions, allowing you to enforce compliance and security policies consistently across your organization.
- Management groups can also be used to manage costs and billing across multiple subscriptions, allowing you to track and manage costs for resources across your organization effectively.
- Examples of how management groups can be used include:
  - Grouping subscriptions by department or business unit (e.g., Finance, HR, IT)
  - Grouping subscriptions by environment (e.g., Development, Testing, Production)
  - Grouping subscriptions by project or application (e.g., Project A, Project B)
- Management groups provide a way to organize and manage Azure subscriptions effectively, allowing you to apply governance, policies, and access control consistently across your organization.
- 10,000 management groups can be created in a single directory.
- 6 levels of depth can be created in the management group hierarchy.

## Hierarchy of Resource Groups, Subscriptions, and Management Groups

- The hierarchy of resource groups, subscriptions, and management groups in Azure is as follows:
  - **Management Groups**: At the top level of the hierarchy, management groups are used to organize and manage multiple Azure subscriptions. They provide a way to apply governance, policies, and access control across multiple subscriptions.
  - **Subscriptions**: Below management groups, subscriptions are used to hold Azure resources and provide a way to manage access, billing, and resource usage for those resources. Each subscription can have multiple resource groups and resources within it.
  - **Resource Groups**: At the lowest level of the hierarchy, resource groups are used to hold related Azure resources. They provide a way to manage and organize resources based on their lifecycle, permissions, and billing. Each resource group can contain multiple resources but a resource can only belong to one resource group.
  - **Resources**: At the lowest level of the hierarchy, resources are instances of Azure services that can be created, managed, and used in Azure. Each resource has a unique identifier and is associated with a specific Azure region, resource group, and subscription.
- This hierarchy allows for effective organization and management of Azure resources, providing a way to apply governance, policies, and access control at different levels of the hierarchy based on the needs of the organization.
