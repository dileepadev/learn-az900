# Azure Identity, Access, and Security

Table of Contents

- [Azure Identity, Access, and Security](#azure-identity-access-and-security)
  - [Directory Services](#directory-services)
    - [Azure Entra ID](#azure-entra-id)
    - [Microsoft Entra Domain Services](#microsoft-entra-domain-services)
  - [Authentication and Authorization](#authentication-and-authorization)
    - [Azure Multifactor Authentication (MFA)](#azure-multifactor-authentication-mfa)
    - [Single Sign-On (SSO)](#single-sign-on-sso)
    - [Passwordless Authentication](#passwordless-authentication)
  - [External Identities](#external-identities)
  - [Microsoft Entra Conditional Access](#microsoft-entra-conditional-access)
  - [Azure Role-Based Access Control (RBAC)](#azure-role-based-access-control-rbac)
  - [Zero Trust](#zero-trust)
  - [Defense-in-Depth Model](#defense-in-depth-model)
  - [Microsoft Defender for Cloud](#microsoft-defender-for-cloud)

## Directory Services

### Azure Entra ID

- Azure Entra ID is a cloud-based identity and access management service.
- Previously known as Azure Active Directory or Azure AD.
- It provides a centralized platform for:
  - Authentication
  - Single sign-on (SSO)
  - Device management
  - Application management
  - Business-to-business (B2B) collaboration
  - etc.

### Microsoft Entra Domain Services

- Microsoft Entra Domain Services (Domain Services) is a managed domain service that provides domain join, group policy, LDAP, and Kerberos/NTLM authentication capabilities.
- It allows you to use domain services without the need to deploy and manage domain controllers in the cloud.
- Domain Services is integrated with Azure Entra ID, allowing you to use your existing Azure Entra ID users and groups to authenticate and authorize access to resources in the domain.
- It allows to run legacy applications that can't use modern auth standards in the cloud.

## Authentication and Authorization

- Authentication is the process of verifying the identity of a user or application.
- Authorization is the process of granting or denying access to resources based on the authenticated identity and its permissions.
- Azure provides various authentication methods, including:
  - Single sign-on (SSO)
  - Multifactor authentication (MFA)
  - Passwordless authentication

### Azure Multifactor Authentication (MFA)

- Azure MFA is a security feature that requires users to provide two or more forms of authentication to access resources.
- It adds an additional layer of security by requiring users to provide something they know (password) and something they have (a phone or hardware token) to verify their identity.
- Azure MFA can be used to protect access to applications, data, and resources in Azure and on-premises environments.

### Single Sign-On (SSO)

- Single sign-on (SSO) is an authentication method that allows users to access multiple applications and resources with a single set of credentials.
- SSO eliminates the need for users to remember multiple usernames and passwords, improving user experience and reducing the risk of password-related security issues.
- Azure Entra ID provides SSO capabilities for thousands of pre-integrated applications, as well as support for custom applications.

### Passwordless Authentication

- Passwordless authentication is an authentication method that allows users to authenticate without using a password.
- It provides a more secure and convenient authentication experience by eliminating the need for passwords, which can be weak, reused, or stolen.
- Azure supports various passwordless authentication methods, including:
  - Microsoft Authenticator app
  - Windows Hello for Business
  - FIDO2 security keys
  - etc.

## External Identities

- Azure External Identities is a service that allows you to manage and authenticate external users, such as customers, partners, and suppliers, who need access to your applications and resources.
- It provides a secure and scalable solution for managing external identities and access to your applications and resources.
- Azure External Identities supports various authentication methods, including social identities (e.g., Google, Facebook), enterprise identities (e.g., Azure Entra ID, SAML), and custom identities.

## Microsoft Entra Conditional Access

- Microsoft Entra Conditional Access is a security feature that allows you to define and enforce access policies based on specific conditions, such as user location, device state, and risk level.
- It helps protect your applications and resources by allowing you to control access based on the context of the access request.
- Conditional Access policies can be used to require multifactor authentication, block access from specific locations, or require compliant devices for access.

## Azure Role-Based Access Control (RBAC)

- Azure Role-Based Access Control (RBAC) is a system that provides fine-grained access management for Azure resources.
- It allows you to assign specific permissions to users, groups, and applications at different scopes (subscription, resource group, or individual resource).
- RBAC helps ensure that users have the appropriate level of access to resources based on their roles and responsibilities, following the principle of least privilege.
- Azure provides built-in roles (e.g., Owner, Contributor, Reader, User Access Administrator) and allows you to create custom roles to meet specific access requirements.

## Zero Trust

- Zero Trust is a security model that assumes that threats can exist both inside and outside the network perimeter, and therefore requires strict verification of every user and device trying to access resources.
- The Zero Trust model is based on the principle of "never trust, always verify," meaning that access to resources is granted only after verifying the identity and trustworthiness of the user and device.
- Azure provides various services and features to help implement a Zero Trust security model, including:
  - Azure Entra ID for identity and access management
  - Microsoft Defender for Cloud for threat detection and response
  - Azure Firewall and Azure DDoS Protection for network security
  - Azure Security Center for security management and monitoring
  - etc.

## Defense-in-Depth Model

- The defense-in-depth model is a security strategy that involves implementing multiple layers of security controls to protect resources and data.
- The idea is to create a series of defenses that an attacker would have to bypass in order to successfully compromise a system, making it more difficult for attackers to achieve their goals.
- Azure provides various services and features that can be used to implement a defense-in-depth strategy, including:
  - Azure Entra ID for identity and access management
  - Microsoft Defender for Cloud for threat detection and response
  - Azure Firewall and Azure DDoS Protection for network security
  - Azure Security Center for security management and monitoring
  - Azure Key Vault for secrets management
  - Azure Sentinel for security information and event management (SIEM)
  - etc.

```md
DEFENSE IN DEPTH

A layered approach to securing systems
--------------------------------------

┌───────────────────────────────────────────────┐
│               Physical Security               │
│  ┌─────────────────────────────────────────┐  │
│  │             Identity & Access           │  │
│  │  ┌───────────────────────────────────┐  │  │
│  │  │             Perimeter             │  │  │
│  │  │  ┌─────────────────────────────┐  │  │  │
│  │  │  │           Network           │  │  │  │
│  │  │  │  ┌───────────────────────┐  │  │  │  │
│  │  │  │  │        Compute        │  │  │  │  │
│  │  │  │  │  ┌─────────────────┐  │  │  │  │  │
│  │  │  │  │  │       App       │  │  │  │  │  │
│  │  │  │  │  │  ┌───────────┐  │  │  │  │  │  │
│  │  │  │  │  │  │   Data    │  │  │  │  │  │  │
└───────────────────────────────────────────────┘
```

## Microsoft Defender for Cloud

- Microsoft Defender for Cloud is a unified security management system that provides advanced threat protection across both Azure and on-premises environments.
- It helps you prevent, detect, and respond to threats with increased visibility and control over the security of your Azure resources and workloads.
- Defender for Cloud provides various features, including:
  - Security posture management: Assess and improve the security posture of your Azure resources with recommendations and best practices.
  - Threat detection: Detect threats and vulnerabilities in your Azure resources with advanced analytics and machine learning.
  - Security alerts: Receive actionable security alerts and recommendations to help you respond to threats in a timely manner.
  - Regulatory compliance: Monitor and maintain compliance with regulatory standards and industry best practices.
