# AZ-900 Course 2026

This repository contains the materials and resources for the AZ-900: Microsoft Azure Fundamentals course for the year 2026. The course is designed to provide foundational knowledge of Microsoft Azure services and cloud computing concepts.

Table of Contents:

- [AZ-900 Course 2026](#az-900-course-2026)
  - [Content](#content)
  - [Practice Test Web App](#practice-test-web-app)
  - [Skills measured as of January 14, 2026](#skills-measured-as-of-january-14-2026)
    - [Describe cloud concepts (25–30%)](#describe-cloud-concepts-2530)
    - [Describe Azure architecture and services (35–40%)](#describe-azure-architecture-and-services-3540)
    - [Describe Azure management and governance (30–35%)](#describe-azure-management-and-governance-3035)

## Content

- [01 Cloud Concepts](./docs/modules/01-cloud-concepts)
  - [Cloud Computing](./docs/modules/01-cloud-concepts/1-cloud-computing.md)
  - [Cloud Benefits](./docs/modules/01-cloud-concepts/2.cloud-benifits.md)
  - [Cloud Service Types](./docs/modules/01-cloud-concepts/3.cloud-service-types.md)
- [02 Azure Architecture and Services](./docs/modules/02-azure-architecture-services)
  - [Azure Architectural Components](./docs/modules/02-azure-architecture-services/1-azure-architectural-components.md)
  - [Azure Compute and Networking Services](./docs/modules/02-azure-architecture-services/2-azure-compute-networking.md)
  - [Azure Storage Services](./docs/modules/02-azure-architecture-services/3-azure-storage.md)
  - [Azure Identity, Access, and Security](./docs/modules/02-azure-architecture-services/4-azure-identity-access-security.md)
- [03 Azure Management and Governance](./docs/modules/03-azure-management-governance)
  - [Cost Management in Azure](./docs/modules/03-azure-management-governance/1-cost-management.md)
  - [Features and Tools for Governance and Compliance](./docs/modules/03-azure-management-governance/2-governance-compliance.md)
  - [Features and Tools for Managing and Deploying Azure Resources](./docs/modules/03-azure-management-governance/3-managing-deploying-azure-resources.md)
  - [Monitoring Tools in Azure](./docs/modules/03-azure-management-governance/4-monitoring-tools.md)

## Practice Test Web App

The interactive AZ-900 study hub now lives at the repository root. It combines:

- theory content rendered from the markdown files in `docs/modules/`
- the interactive AZ-900 practice lab

Features included:

- 10 full practice papers
- 400 questions aligned to the January 14, 2026 study guide
- Saved browser progress for each paper
- Flagged questions, instant scoring, and domain breakdown review

Local preview:

```bash
python -m http.server 4173
```

GitHub Pages deployment:

1. Push the repository to GitHub.
2. Open **Settings > Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder.
5. Save the configuration.

## Skills measured as of January 14, 2026

### Describe cloud concepts (25–30%)

- Describe cloud computing
  - Define cloud computing
  - Describe the shared responsibility model
  - Define cloud models, including public, private, and hybrid
  - Identify appropriate use cases for each cloud model
  - Describe the consumption-based model
  - Compare cloud pricing models
  - Describe serverless

- Describe the benefits of using cloud services
  - Describe the benefits of high availability and scalability in the cloud
  - Describe the benefits of reliability and predictability in the cloud
  - Describe the benefits of security and governance in the cloud
  - Describe the benefits of manageability in the cloud

- Describe cloud service types
  - Describe infrastructure as a service (IaaS)
  - Describe platform as a service (PaaS)
  - Describe software as a service (SaaS)
  - Identify appropriate use cases for each cloud service type (IaaS, PaaS, and SaaS)

### Describe Azure architecture and services (35–40%)

- Describe the core architectural components of Azure
  - Describe Azure regions, region pairs, and sovereign regions
  - Describe availability zones
  - Describe Azure datacenters
  - Describe Azure resources and resource groups
  - Describe subscriptions
  - Describe management groups
  - Describe the hierarchy of resource groups, subscriptions, and management groups

- Describe Azure compute and networking services
  - Compare compute types, including containers, virtual machines, and functions
  - Describe virtual machine options, including Azure virtual machines, Azure Virtual Machine Scale Sets, availability sets, and Azure Virtual Desktop
  - Describe the resources required for virtual machines
  - Describe application hosting options, including web apps, containers, and virtual machines
  - Describe virtual networking, including the purpose of Azure virtual networks, Azure virtual subnets, peering, Azure DNS, Azure VPN Gateway, and ExpressRoute
  - Define public and private endpoints

- Describe Azure storage services
  - Compare Azure Storage services
  - Describe storage tiers
  - Describe redundancy options
  - Describe storage account options and storage types
  - Identify options for moving files, including AzCopy, Azure Storage Explorer, and Azure File Sync
  - Describe migration options, including Azure Migrate and Azure Data Box

- Describe Azure identity, access, and security
  - Describe directory services in Azure, including Microsoft Entra ID and Microsoft Entra Domain Services
  - Describe authentication methods in Azure, including single sign-on (SSO), multifactor authentication (MFA), and passwordless
  - Describe external identities in Azure
  - Describe Microsoft Entra Conditional Access
  - Describe Azure role-based access control (RBAC)
  - Describe the concept of Zero Trust
  - Describe the purpose of the defense-in-depth model
  - Describe the purpose of Microsoft Defender for Cloud

### Describe Azure management and governance (30–35%)

- Describe cost management in Azure
  - Describe factors that can affect costs in Azure
  - Explore the pricing calculator
  - Describe cost management capabilities in Azure
  - Describe the purpose of tags
- Describe features and tools in Azure for governance and compliance
  - Describe the purpose of Microsoft Purview in Azure
  - Describe the purpose of Azure Policy
  - Describe the purpose of resource locks
- Describe features and tools for managing and deploying Azure resources
  - Describe the Azure portal
  - Describe Azure Cloud Shell, including Azure Command-Line Interface (CLI) and Azure PowerShell
  - Describe the purpose of Azure Arc
  - Describe infrastructure as code (IaC)
  - Describe Azure Resource Manager (ARM) and ARM templates
- Describe monitoring tools in Azure
  - Describe the purpose of Azure Advisor
  - Describe Azure Service Health
  - Describe Azure Monitor, including Log Analytics, Azure Monitor alerts, and Application Insights
