# Describe Monitoring Tools in Azure

Table of Contents

- [Describe Monitoring Tools in Azure](#describe-monitoring-tools-in-azure)
  - [Azure Advisor](#azure-advisor)
  - [Azure Service Health](#azure-service-health)
  - [Azure Monitor](#azure-monitor)
    - [Azure Log Analytics](#azure-log-analytics)
    - [Azure Monitor Alerts](#azure-monitor-alerts)
    - [Application Insights](#application-insights)

## Azure Advisor

- **Azure Advisor** is a free, personalized cloud consultant that helps you follow best practices to optimize your Azure deployments.
- It analyzes your resource configuration and usage telemetry and then recommends solutions to help improve the following areas:
  1. **Reliability (formerly High Availability)**: Recommendations to ensure and improve the continuity of your business-critical applications. Examples include adding VMs to availability sets or using geo-redundant storage.
  2. **Security**: Recommendations to detect threats and vulnerabilities that might lead to security breaches. Examples include enabling Microsoft Defender for Cloud or applying network security group rules.
  3. **Performance**: Recommendations to improve the speed and responsiveness of your applications. Examples include reducing SQL query response times or resizing underutilized VMs.
  4. **Cost**: Recommendations to optimize and reduce your overall Azure spending. Examples include shutting down underutilized VMs, purchasing reserved instances, or rightsizing resources.
  5. **Operational Excellence**: Recommendations to help you achieve process and workflow efficiency, resource manageability, and deployment best practices. Examples include configuring service health alerts or using Azure Policy for governance.
- Azure Advisor recommendations are available in the Azure portal and can be filtered by subscription, resource group, or specific service.
- Recommendations are updated regularly based on your resource usage and configuration changes.

## Azure Service Health

- **Azure Service Health** is a suite of experiences that provides personalized guidance and support when issues with Azure services affect you.
- Azure Service Health is composed of three main components:
  1. **Azure Status**: A global view of the health of all Azure services across all Azure regions. It provides a broad picture of service outages that affect a wide range of Azure customers. Useful for incidents with widespread impact.
  2. **Service Health**: A personalized view of the health of the Azure services and regions that you are actually using. It tracks events such as:
     - **Service Issues**: Active problems in Azure that are currently affecting your resources.
     - **Planned Maintenance**: Upcoming scheduled maintenance that could affect the availability of your services.
     - **Health Advisories**: Changes in Azure services that require your attention, such as feature deprecations or upcoming requirements.
  3. **Resource Health**: A personalized view of the health of your specific Azure resources (e.g., a specific virtual machine instance). It uses signals from Azure to assess whether a resource is healthy or experiencing problems and provides guidance on corrective actions.
- Azure Service Health allows you to set up **alerts** so you are notified of service issues, planned maintenance, or health advisories that may affect your resources.
- Service Health events are retained for **90 days** in the activity log, helping you review past incidents and their impact.

## Azure Monitor

- **Azure Monitor** is a comprehensive monitoring solution for collecting, analyzing, and responding to telemetry data from your cloud and on-premises environments.
- Azure Monitor helps you maximize the availability and performance of your applications and services by collecting data from multiple sources, including:
  - **Application Data**: Performance and functionality data from your application code.
  - **Guest OS Data**: Data about the operating system on which your application is running.
  - **Azure Resource Data**: Data about the operation of an Azure resource.
  - **Azure Subscription Data**: Data about the operation and management of Azure subscriptions.
  - **Azure Tenant Data**: Data about the operation of tenant-level Azure services, such as Microsoft Entra ID.
- Azure Monitor collects two fundamental types of data:
  - **Metrics**: Numerical values that describe some aspect of a system at a particular point in time. They are lightweight and capable of supporting near real-time scenarios.
  - **Logs**: Events that occurred within the system. They can contain different kinds of data and may be structured or free-form text with a timestamp.

### Azure Log Analytics

- **Azure Log Analytics** is a tool in the Azure portal used to write and run log queries on the data collected by Azure Monitor.
- It supports both simple and complex queries, including data analysis and visualization.
- Log Analytics uses the **Kusto Query Language (KQL)** to query and analyze log data from Azure Monitor.
- You can use Log Analytics to explore data, identify trends, analyze patterns, and gain insights from your logs.

### Azure Monitor Alerts

- **Azure Monitor Alerts** allow you to set up automated notifications and actions when specific conditions are met in your monitoring data.
- Alerts can be configured based on:
  - **Metrics**: Triggered when a metric value crosses a defined threshold (e.g., CPU usage exceeds 80%).
  - **Log Queries**: Triggered when results of a log query match specific criteria.
  - **Activity Log Events**: Triggered by specific Azure platform events (e.g., a VM is deallocated or a resource is deleted).
- Alerts can notify you through various **action groups**, which can include:
  - Email and SMS notifications
  - Azure Functions or Logic Apps triggers
  - Webhooks
  - ITSM (IT Service Management) tool integrations
- Alerts help you proactively identify and address issues before they affect your users.

### Application Insights

- **Application Insights** is an Application Performance Management (APM) service within Azure Monitor that helps developers monitor and diagnose issues with their live web applications.
- Key features include:
  - **Request Rates, Response Times, and Failure Rates**: Monitor the performance of your application endpoints.
  - **Dependency Tracking**: Track calls to external services such as databases, REST APIs, and other dependencies to identify performance bottlenecks.
  - **Page Views and Load Performance**: Monitor client-side performance and user experience.
  - **Exception Tracking**: Capture and analyze exceptions thrown by your application.
  - **User Telemetry**: Track user sessions, custom events, and usage patterns.
- Application Insights can be configured by installing an SDK (Software Development Kit) in your application or by using the Application Insights agent (for supported platforms without code changes).
- It supports applications built on multiple platforms, including .NET, Node.js, Java, and Python.
