# Cloud Computing

Table of Contents

- [Cloud Computing](#cloud-computing)
  - [What is Cloud Computing?](#what-is-cloud-computing)
  - [What is Microsoft Azure?](#what-is-microsoft-azure)
  - [Shared Responsibility Model](#shared-responsibility-model)
  - [Cloud Models](#cloud-models)
  - [Azure Arc](#azure-arc)
  - [Azure Stack](#azure-stack)
  - [Serverless Computing](#serverless-computing)
  - [Capital Expenditure vs Operational Expenditure](#capital-expenditure-vs-operational-expenditure)
  - [Consumption-Based Pricing Model](#consumption-based-pricing-model)

## What is Cloud Computing?

- Cloud computing is the delivery of computing services over the internet.
- It allows users to access and use resources such as **servers**, **storage**, **databases**, **networking**, **software**, and **analytics** without having to manage physical hardware or infrastructure.

## What is Microsoft Azure?

- Microsoft Azure is a cloud computing platform and service created by Microsoft.
- It provides a wide range of cloud services, including those for computing, analytics, storage, and networking.
- Users can choose and configure these services to meet their specific needs, allowing them to build, deploy, and manage applications through Microsoft-managed data centers.
- Azure supports various programming languages, tools, and frameworks, making it a versatile platform for developers and businesses of all sizes.

## Shared Responsibility Model

- In cloud computing, the shared responsibility model defines the division of responsibilities between the cloud service provider and the customer.
- See more details in the [Cloud Service Types / Shared Responsibility Model](./3.cloud-service-types.md#shared-responsibility-model) section.

## Cloud Models

There are three main cloud models:

1. **Private Cloud**:
   - Services are dedicated to a single organization running on a private network within the organization's data center or hosted by a third-party provider.
   - It can be hosted on-premises or by a third-party provider Examples include Microsoft Azure Stack, which allows organizations to run Azure services in their own data centers.
   - Private cloud does not provide access to users outside of the organization.
   - Organizations are responsible for managing and maintaining the infrastructure and services, which can be costly and require significant resources.
2. **Public Cloud**:
   - Services are provided over the public internet and shared among multiple customers. Examples include Microsoft Azure and other competitors like Amazon Web Services (AWS) and Google Cloud Platform (GCP).
   - Public cloud services are typically offered on a pay-as-you-go basis, allowing customers to scale resources up or down as needed.
   - Public cloud providers are responsible for managing and maintaining the infrastructure and services, which can reduce costs and allow organizations to focus on their core business activities.
3. **Hybrid Cloud**:
   - A combination of public and private cloud services, allowing data and applications to be shared between them.
   - Hybrid cloud provides flexibility and scalability while allowing organizations to maintain control over their data and applications. Examples include Microsoft Azure Arc, which allows organizations to manage and govern resources across on-premises, multi-cloud, and edge environments.

**Multi-Cloud**:

- The use of multiple cloud services from different providers to meet specific business needs.
- Multi-cloud allows organizations to avoid vendor lock-in and take advantage of the strengths of different cloud providers. For example, an organization might use Microsoft Azure for its AI and machine learning capabilities while using AWS for its storage and database services.
- Multi-cloud can provide redundancy and improve resilience by distributing workloads across multiple cloud providers, reducing the risk of downtime or service disruptions. However, it can also introduce complexity in terms of management and integration between different cloud services and providers.

## Azure Arc

- Azure Arc is a service that allows organizations to manage and govern resources across on-premises, multi-cloud, and edge environments.
- It provides a unified management experience for resources, regardless of where they are located, allowing organizations to use Azure services and tools to manage their entire infrastructure, including resources running in other cloud providers or on-premises data centers.
- Azure Arc enables organizations to extend Azure services and capabilities to their existing infrastructure, providing flexibility and scalability while maintaining control over their data and applications.

## Azure Stack

- Azure Stack is a hybrid cloud platform that allows organizations to run Azure services in their own data centers.
- It provides a consistent experience with Azure, allowing organizations to use the same tools and services to manage their on-premises and cloud resources.
- Azure Stack enables organizations to take advantage of the benefits of cloud computing while maintaining control over their data and applications, making it an ideal solution for organizations with specific regulatory or compliance requirements that require data to be stored on-premises.

## Serverless Computing

- Serverless computing is a cloud computing execution model where the cloud provider dynamically manages the allocation of resources and automatically scales applications based on demand.
- In a serverless model, developers can focus on writing code and building applications without having to worry about managing servers or infrastructure.
- Serverless computing allows for greater flexibility and scalability, as resources are automatically provisioned and deprovisioned based on demand, reducing costs and improving efficiency.
- Azure Functions is an example of a serverless computing service provided by Microsoft Azure, allowing developers to run event-driven code without having to manage infrastructure.

## Capital Expenditure vs Operational Expenditure

- **Capital Expenditure (CapEx)** refers to the upfront costs of purchasing and maintaining physical hardware and infrastructure. This includes costs for servers, storage devices, networking equipment, and data centers.

- **Operational Expenditure (OpEx)** refers to the ongoing costs of using cloud services. This includes costs for subscription fees, data transfer, and usage-based pricing.

- Cloud computing allows organizations to shift from CapEx to OpEx, providing flexibility and scalability while reducing the need for large upfront investments in hardware.

## Consumption-Based Pricing Model

- Cloud providers typically offer a consumption-based pricing model, where customers pay for the resources they use on a pay-as-you-go basis.
