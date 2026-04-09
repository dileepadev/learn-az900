# Azure Storage Services

Table of Contents

- [Azure Storage Services](#azure-storage-services)
  - [Azure Storage Accounts](#azure-storage-accounts)
  - [Storage Redundancy Options](#storage-redundancy-options)
    - [Locally Redundant Storage (LRS)](#locally-redundant-storage-lrs)
    - [Zone-Redundant Storage (ZRS)](#zone-redundant-storage-zrs)
    - [Geo-Redundant Storage (GRS)](#geo-redundant-storage-grs)
    - [Geo-Zone-Redundant Storage (GZRS)](#geo-zone-redundant-storage-gzrs)
    - [Summary of Redundancy Options](#summary-of-redundancy-options)
  - [Compare Azure Storage Services](#compare-azure-storage-services)
    - [Azure Blob Storage](#azure-blob-storage)
    - [Azure File Storage](#azure-file-storage)
    - [Azure Queue Storage](#azure-queue-storage)
    - [Azure Table Storage](#azure-table-storage)
    - [Azure Disk Storage](#azure-disk-storage)
    - [Summary of Azure Storage Services](#summary-of-azure-storage-services)
  - [Azure Storage Access Tiers](#azure-storage-access-tiers)
    - [Hot Tier](#hot-tier)
    - [Cool Tier](#cool-tier)
    - [Cold Tier](#cold-tier)
    - [Archive Tier](#archive-tier)
    - [Summary of Access Tiers](#summary-of-access-tiers)
  - [Azure Migration Options](#azure-migration-options)
    - [Azure Migrate](#azure-migrate)
    - [Azure Data Box](#azure-data-box)
  - [Azure File Management Options](#azure-file-management-options)
    - [AzCopy](#azcopy)
    - [Azure Storage Explorer](#azure-storage-explorer)
    - [Azure File Sync](#azure-file-sync)

## Azure Storage Accounts

- Azure Storage Accounts are a fundamental component of Azure Storage Services that provide a secure and scalable way to store data in the cloud.
- A storage account is a container for all of your Azure Storage data, including blobs, files, queues, and tables.
- Storage accounts must have a unique name and are created in a specific Azure region, which determines the physical location of the data.

## Storage Redundancy Options

- Azure Storage offers several redundancy options to ensure data durability and availability.

### Locally Redundant Storage (LRS)

LRS replicates your data three times within a single data center in the same region. This provides protection against hardware failures but does not protect against data center outages.

### Zone-Redundant Storage (ZRS)

ZRS replicates your data across three availability zones within the same region. This provides protection against data center outages and ensures high availability.

### Geo-Redundant Storage (GRS)

GRS replicates your data to a secondary region that is hundreds of miles away from the primary region. This provides protection against regional outages and ensures data durability.

### Geo-Zone-Redundant Storage (GZRS)

GZRS combines the benefits of ZRS and GRS by replicating your data across three availability zones in the primary region and replicating it to a secondary region. This provides the highest level of durability and availability for your data.

### Summary of Redundancy Options

| Redundancy Option | Deployment |
| ------------------- | ------------ |
| Locally Redundant Storage (LRS) | 3 copies within a single data center in the primary region |
| Zone-Redundant Storage (ZRS) | 3 copies across three availability zones in the primary region |
| Geo-Redundant Storage (GRS) | 3 copies in the single data center in the primary region and 3 copies in a secondary region |
| Geo-Zone-Redundant Storage (GZRS) | 3 copies across three availability zones in the primary region and 3 copies in a secondary region |

```md
STORAGE REDUNDANCY

-----------------------------------------------------
LRS (Locally Redundant Storage)
-----------------------------------------------------
REGION 1
┌───────────────┐
│ Data Center 1 │
│  ●  ●  ●      │  → 3 copies in one datacenter
└───────────────┘


-----------------------------------------------------
ZRS (Zone-Redundant Storage)
-----------------------------------------------------
REGION 1
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Data Center 1 │   │ Data Center 2 │   │ Data Center 3 │
│      ●        │   │      ●        │   │      ●        │
└───────────────┘   └───────────────┘   └───────────────┘
→ 3 copies across 3 availability zones


-----------------------------------------------------
GRS (Geo-Redundant Storage)
-----------------------------------------------------
REGION 1                     REGION 2
┌───────────────┐            ┌───────────────┐
│ Data Center 1 │            │ Data Center A │
│  ●  ●  ●      │            │  ●  ●  ●      │
└───────────────┘            └───────────────┘
→ 3 copies primary + 3 copies secondary region


-----------------------------------------------------
GZRS (Geo-Zone-Redundant Storage)
-----------------------------------------------------
REGION 1                     REGION 2
┌───────────────┐ ┌───────────────┐ ┌───────────────┐   ┌───────────────┐
│ Data Center 1 │ │ Data Center 2 │ │ Data Center 3 │   │ Data Center A │
│      ●        │ │      ●        │ │      ●        │   │  ●  ●  ●      │
└───────────────┘ └───────────────┘ └───────────────┘   └───────────────┘
→ ZRS in primary + GRS replication to secondary
```

## Compare Azure Storage Services

### Azure Blob Storage

A service for storing large amounts of unstructured data, such as text and binary data. It is optimized for storing and serving large files, such as images, videos, and backups.

### Azure File Storage
  
A service that provides fully managed file shares in the cloud. It is designed for scenarios where you need to share files across multiple virtual machines or applications.

### Azure Queue Storage

A service for storing and retrieving messages. It is designed for scenarios where you need to decouple components of an application, such as processing tasks asynchronously.

### Azure Table Storage

A service for storing structured NoSQL data. It is designed for scenarios where you need to store large amounts of structured data that does not require complex querying capabilities.

### Azure Disk Storage

A service that provides persistent block storage for Azure virtual machines. It is designed for scenarios where you need high-performance storage for virtual machine workloads, such as databases and applications.

### Summary of Azure Storage Services

| Storage Service | Type | Use When |
| --- | --- | --- |
| Azure Blob Storage | Object Storage | Storing large unstructured data like images, videos, and backups |
| Azure File Storage | File Storage | Sharing files across multiple VMs or applications |
| Azure Queue Storage | Message Queue | Decoupling components of an application for asynchronous processing |
| Azure Table Storage | NoSQL Storage | Storing large amounts of structured data without complex querying |
| Azure Disk Storage | Block Storage | Providing persistent storage for Azure VMs, especially for databases and applications |

## Azure Storage Access Tiers

- Azure Storage offers different access tiers to optimize costs based on how frequently data is accessed.

### Hot Tier

Optimized for data that is accessed frequently. It has higher storage costs but lower access costs.

### Cool Tier

Optimized for data that is infrequently accessed and stored for at least 30 days. It has lower storage costs but higher access costs compared to the hot tier.

### Cold Tier

Optimized for data that is rarely accessed and stored for at least 90 days. It has the lowest storage costs but the highest access costs compared to the hot and cool tiers.

### Archive Tier

Optimized for data that is rarely accessed and stored for at least 180 days. It has the lowest storage costs but the highest access costs compared to all other tiers. Data in the archive tier is offline and requires rehydration before it can be accessed.

### Summary of Access Tiers

| Access Tier | Use When |
| --- | --- |
| Hot Tier | Data that is accessed frequently |
| Cool Tier | Data that is infrequently accessed and stored for at least 30 days |
| Cold Tier | Data that is rarely accessed and stored for at least 90 days |
| Archive Tier | Data that is rarely accessed and stored for at least 180 days, and can tolerate high access costs and latency |

## Azure Migration Options

### Azure Migrate

- Azure Migrate is a service that helps you discover, assess, and migrate on-premises applications, infrastructure, and data to Azure.
- Azure Migrate provides tools and services to assist with the migration process, including discovery and assessment tools, migration tools, and guidance for best practices.
- Azure Migrate supports various migration scenarios, including server migration, database migration, web application migration, and virtual desktop infrastructure (VDI) migration.
- Azure Migrate helps you plan and execute your migration to Azure, ensuring a smooth transition and minimizing downtime and disruption to your applications and services.

### Azure Data Box

- Azure Data Box is a service that provides secure and efficient data transfer solutions for moving large amounts of data to Azure.
- Azure Data Box offers physical devices that can be shipped to your location, allowing you to transfer data to Azure without relying on network connectivity.
- Azure Data Box supports various data transfer scenarios, including offline data transfer, edge data transfer, and high-speed data transfer.
- Azure Data Box provides a secure and efficient way to transfer large amounts of data to Azure, ensuring that your data is protected during transit and minimizing the time and effort required for data transfer.

## Azure File Management Options

### AzCopy

- AzCopy is a command-line utility designed for copying data to and from Azure Storage accounts.
- It supports various data transfer scenarios, including uploading and downloading blobs, files, and tables.
- AzCopy is optimized for performance and can handle large data transfers efficiently, making it a popular choice for managing data in Azure Storage.

### Azure Storage Explorer

- Azure Storage Explorer is a graphical user interface (GUI) tool that allows you to manage and interact with your Azure Storage accounts.
- It provides a user-friendly interface for browsing, uploading, downloading, and managing data in Azure Storage.
- It uses AzCopy to handle file operations.

### Azure File Sync

- Azure File Sync is a service that allows you to centralize your file shares in Azure Storage while keeping the flexibility and performance of on-premises file servers.
- Azure File Sync enables you to synchronize files between your on-premises file servers and Azure Storage, allowing you to access your files from anywhere while maintaining local performance.
