# Describe Features and Tools in Azure for Governance and Compliance

Table of Contents

- [Describe Features and Tools in Azure for Governance and Compliance](#describe-features-and-tools-in-azure-for-governance-and-compliance)
  - [Microsoft Purview](#microsoft-purview)
  - [Azure Policy](#azure-policy)
  - [Resource Locks](#resource-locks)
  - [Service Trust Portal](#service-trust-portal)

## Microsoft Purview

- **Microsoft Purview** is a comprehensive set of data governance, risk, and compliance solutions that helps organizations govern, protect, and manage their entire data estate.
- Microsoft Purview provides:
  - **Data Map**: Automated data discovery and classification across your on-premises, multi-cloud, and SaaS data.
  - **Data Catalog**: A business-friendly data discovery experience that allows users to find and understand data assets.
  - **Data Estate Insights**: A bird's-eye view of the governance status of your data estate, showing sensitivity labels, classifications, and compliance information.
  - **Compliance Manager**: A tool that helps organizations manage compliance activities, track regulatory requirements, and assess their compliance posture.
- Microsoft Purview brings together capabilities from the former Azure Purview and Microsoft 365 Compliance solutions into a unified platform.

## Azure Policy

- **Azure Policy** is a service that allows you to create, assign, and manage policies that enforce rules and effects over your Azure resources.
- Azure Policy helps ensure that resources comply with your organization's standards and service-level agreements (SLAs).
- Key features of Azure Policy:
  - **Policy Definitions**: Define what conditions are evaluated and what actions are taken when those conditions are met. For example, a policy definition might restrict the types of virtual machines that can be deployed or require that all resources have specific tags.
  - **Policy Assignments**: Apply a policy definition to a specific scope, such as a management group, subscription, or resource group. All resources within that scope will be evaluated against the policy.
  - **Policy Initiatives**: A collection of policy definitions grouped together to achieve a broader goal. For example, a "Security" initiative might include multiple policies related to network security, encryption, and access control.
  - **Compliance Dashboard**: Provides a centralized view of the overall compliance state of your environment, showing which resources are compliant or non-compliant with assigned policies.
- Azure Policy evaluates resources and marks them as compliant or non-compliant. It can also prevent non-compliant resources from being created.
- Azure Policy can automatically **remediate** non-compliant resources by applying the required configuration.
- Azure Policy is inherited through the resource hierarchy (Management Groups → Subscriptions → Resource Groups → Resources).

## Resource Locks

- **Resource Locks** are a feature in Azure that allows you to prevent accidental deletion or modification of critical Azure resources.
- There are two types of resource locks:
  1. **Delete Lock (CanNotDelete)**: Authorized users can still read and modify the resource, but they cannot delete it. The resource must first have the lock removed before it can be deleted.
  2. **Read-Only Lock (ReadOnly)**: Authorized users can read the resource, but they cannot modify or delete it. This lock restricts all modification operations on the resource.
- Resource locks can be applied at the **resource**, **resource group**, or **subscription** level.
- Resource locks are **inherited** by child resources. For example, if you apply a lock to a resource group, all resources within that resource group will also be locked.
- To modify or delete a locked resource, you must first **remove the lock**. This two-step process helps prevent accidental changes to critical resources.
- Resource locks apply regardless of RBAC (Role-Based Access Control) permissions. Even an Owner of a resource must remove the lock before performing the restricted action.

## Service Trust Portal

- The **Microsoft Service Trust Portal** is a platform that provides access to various content, tools, and resources about Microsoft's security, privacy, and compliance practices.
- It provides information about:
  - **Audit Reports**: Independent third-party audit reports that demonstrate Microsoft's compliance with various industry standards and regulations (e.g., ISO 27001, SOC 1, SOC 2, GDPR).
  - **Compliance Guides**: Detailed guides that help organizations understand how Microsoft services can be used in compliance with specific regulations and standards.
  - **Trust Documents**: Whitepapers, FAQs, and other documents that provide information about Microsoft's security, privacy, and compliance practices.
  - **Data Protection Resources**: Information about how Microsoft protects customer data, including encryption, data residency, and data handling practices.
- The Service Trust Portal is available at [https://servicetrust.microsoft.com](https://servicetrust.microsoft.com).
- Access to the Service Trust Portal requires signing in with a Microsoft cloud services account (Microsoft Entra account).
