"use client";

import React, { useState } from "react";
import {
  Cloud,
  Database,
  Lock,
  Server,
  Zap,
  Network,
  Code,
  MonitorIcon,
  Users,
  Settings,
  BarChart3,
  FileText,
  Container,
  Cpu,
  MessageSquare,
  Package,
  GitBranch,
  Shield,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Layers,
  Search,
  Clock,
  DollarSign,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface AWSService {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  shortDesc: string;
  fullDesc: string;
  useCases: string[];
  pricing: string;
  benefits: string[];
  alternatives: string;
}

interface BlogSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const AWSBlog: React.FC = () => {
  const [expandedServices, setExpandedServices] = useState<Set<string>>(
    new Set()
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleService = (serviceId: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  // AWS Services Database
  const awsServices: AWSService[] = [
    // Compute Services
    {
      id: "ec2",
      name: "Amazon EC2",
      category: "Compute",
      icon: <Server className="w-6 h-6" />,
      shortDesc: "Elastic Compute Cloud - Virtual servers in AWS",
      fullDesc: `Amazon EC2 provides scalable computing capacity in the AWS cloud. It allows you to launch virtual machines (instances) with different configurations. EC2 instances can run Windows, Linux, or other operating systems. You pay only for what you use with various pricing options including On-Demand, Reserved Instances, and Spot Instances.`,
      useCases: [
        "Web hosting and application servers",
        "High-performance computing (HPC)",
        "Batch processing and data analysis",
        "Enterprise applications",
        "Development and testing environments",
        "Media transcoding and rendering",
      ],
      pricing:
        "On-Demand (hourly), Reserved Instances (1-3 year), Spot (up to 90% discount)",
      benefits: [
        "Elastic scaling - add or remove capacity as needed",
        "Multiple instance types optimized for different workloads",
        "Integration with other AWS services",
        "Auto Scaling groups for automatic scaling",
        "Elastic Load Balancing for traffic distribution",
        "Security groups for network access control",
      ],
      alternatives:
        "Google Compute Engine, Microsoft Azure VMs, DigitalOcean, Linode",
    },
    {
      id: "lambda",
      name: "AWS Lambda",
      category: "Compute",
      icon: <Zap className="w-6 h-6" />,
      shortDesc:
        "Serverless compute service - Run code without provisioning servers",
      fullDesc: `AWS Lambda is a serverless computing service that lets you run code without managing servers. You upload your code as a function, and Lambda handles scaling, patching, and administration. You pay only for the compute time your code consumes. Supports Node.js, Python, Java, C#, Go, and Ruby.`,
      useCases: [
        "Real-time file processing (S3 events)",
        "API backends with API Gateway",
        "IoT data processing",
        "Scheduled tasks with CloudWatch Events",
        "Data transformation pipelines",
        "Chatbots and voice assistants",
        "Mobile app backends",
      ],
      pricing:
        "1 million requests free monthly, $0.20 per million requests after",
      benefits: [
        "No server management - fully managed",
        "Automatic scaling - handles millions of requests",
        "Pay-per-use pricing model",
        "Built-in fault tolerance and availability",
        "Easy integration with other AWS services",
        "Multiple language support",
      ],
      alternatives:
        "Google Cloud Functions, Azure Functions, Netlify Functions",
    },
    {
      id: "ecs",
      name: "Amazon ECS",
      category: "Compute",
      icon: <Container className="w-6 h-6" />,
      shortDesc: "Elastic Container Service - Docker container orchestration",
      fullDesc: `Amazon ECS is a fully managed container orchestration service that makes it easy to deploy, manage, and scale Docker containers. ECS can be used with AWS Fargate (serverless) or EC2 instances. Integrates with ALB/NLB for load balancing and CloudWatch for monitoring.`,
      useCases: [
        "Microservices architecture",
        "Containerized web applications",
        "Batch processing jobs",
        "Machine learning inference",
        "CI/CD pipelines",
        "Real-time data streaming",
      ],
      pricing: "EC2 (pay for instances), Fargate (pay per vCPU and memory)",
      benefits: [
        "Managed container orchestration",
        "AWS Fargate for serverless containers",
        "Deep integration with other AWS services",
        "Auto Scaling capabilities",
        "Load balancing options (ALB, NLB)",
        "Service discovery and networking",
      ],
      alternatives: "Amazon EKS (Kubernetes), Kubernetes self-managed",
    },
    {
      id: "eks",
      name: "Amazon EKS",
      category: "Compute",
      icon: <Cpu className="w-6 h-6" />,
      shortDesc: "Elastic Kubernetes Service - Managed Kubernetes clusters",
      fullDesc: `Amazon EKS is a managed Kubernetes service that makes it easy to run Kubernetes on AWS. AWS manages the Kubernetes control plane and worker nodes. Supports both EC2 and Fargate for running pods. Compatible with standard Kubernetes tools and applications.`,
      useCases: [
        "Complex containerized applications",
        "Multi-container deployments",
        "Kubernetes-native workloads",
        "Hybrid and multi-cloud strategies",
        "Enterprise container platforms",
      ],
      pricing: "$0.10 per cluster per hour + EC2/Fargate compute costs",
      benefits: [
        "Managed Kubernetes control plane",
        "High availability across availability zones",
        "Automatic security patches",
        "Integration with AWS IAM",
        "Support for standard Kubernetes manifests",
        "Add-on ecosystem (monitoring, networking, storage)",
      ],
      alternatives: "Self-managed Kubernetes, Google GKE, Azure AKS",
    },

    // Storage Services
    {
      id: "s3",
      name: "Amazon S3",
      category: "Storage",
      icon: <Package className="w-6 h-6" />,
      shortDesc:
        "Simple Storage Service - Object storage with 99.99% availability",
      fullDesc: `Amazon S3 is object storage with high durability and availability. Store and retrieve any amount of data from anywhere. Data is automatically replicated across multiple availability zones. Supports versioning, lifecycle policies, and encryption. Integrates with most AWS services.`,
      useCases: [
        "Data backup and archival",
        "Static website hosting",
        "Data lakes for analytics",
        "Application asset storage",
        "Log file storage and analysis",
        "Content distribution with CloudFront",
        "Machine learning training data",
      ],
      pricing:
        "$0.023 per GB/month for standard storage, lower for infrequent access",
      benefits: [
        "99.99% availability, 99.999999999% durability",
        "Unlimited storage capacity",
        "Lifecycle policies for cost optimization",
        "Server-side encryption",
        "Access control and IAM policies",
        "CloudFront integration for global distribution",
      ],
      alternatives: "Google Cloud Storage, Azure Blob Storage, MinIO",
    },
    {
      id: "ebs",
      name: "Amazon EBS",
      category: "Storage",
      icon: <Database className="w-6 h-6" />,
      shortDesc: "Elastic Block Store - Persistent block storage for EC2",
      fullDesc: `Amazon EBS provides persistent block-level storage for EC2 instances. Create snapshots for backup and recovery. Multiple volume types optimized for different workloads (SSD, HDD). Volumes can be encrypted and automatically replicated within AZ.`,
      useCases: [
        "Primary storage for EC2 instances",
        "Transactional databases",
        "Data warehouse storage",
        "No-SQL databases (MongoDB, Cassandra)",
        "High-performance computing",
        "Boot volumes for instances",
      ],
      pricing: "$0.10-0.125 per GB-month (SSD), $0.025-0.045 (HDD)",
      benefits: [
        "High performance and availability",
        "Point-in-time snapshots",
        "Multiple volume types for different needs",
        "Encryption at rest and in transit",
        "Easy resize and modification",
        "Auto-replicated within AZ",
      ],
      alternatives: "Local instance storage, EFS, AWS Backup",
    },
    {
      id: "efs",
      name: "Amazon EFS",
      category: "Storage",
      icon: <Layers className="w-6 h-6" />,
      shortDesc: "Elastic File System - Managed NFS file system",
      fullDesc: `Amazon EFS provides scalable NFS file storage for EC2 instances across multiple AZs. Automatically grows and shrinks as you add/remove files. Multiple instances can access same file system simultaneously. Fully managed with automatic backups.`,
      useCases: [
        "Shared file storage for EC2 instances",
        "Media processing and rendering",
        "Machine learning training",
        "Database backups",
        "Web application file storage",
        "Development environments",
      ],
      pricing: "$0.30 per GB-month for standard storage",
      benefits: [
        "Shared access across instances",
        "Automatic scaling",
        "High throughput and availability",
        "Lifecycle management for cost optimization",
        "Encryption at rest",
        "Fully managed service",
      ],
      alternatives: "Amazon FSx, NFS servers, EBS with iSCSI",
    },

    // Database Services
    {
      id: "rds",
      name: "Amazon RDS",
      category: "Database",
      icon: <Database className="w-6 h-6" />,
      shortDesc: "Relational Database Service - Managed SQL databases",
      fullDesc: `Amazon RDS is a managed relational database service supporting MySQL, PostgreSQL, MariaDB, Oracle, SQL Server. Automated backups, patching, and failover. Multi-AZ deployments for high availability. Read replicas for scaling read operations.`,
      useCases: [
        "Web and mobile applications",
        "Enterprise applications",
        "Business intelligence",
        "Data warehousing (use Redshift)",
        "Content management systems",
        "ERP systems",
      ],
      pricing:
        "On-Demand instances ($0.013-0.48/hour), Reserved Instances (1-3 year)",
      benefits: [
        "Automated backups and point-in-time recovery",
        "Multi-AZ for automatic failover",
        "Automated patching and maintenance",
        "Read replicas for scaling",
        "Enhanced monitoring",
        "Database activity streams for auditing",
      ],
      alternatives:
        "Self-managed EC2 databases, Google Cloud SQL, Azure Database",
    },
    {
      id: "dynamodb",
      name: "Amazon DynamoDB",
      category: "Database",
      icon: <Zap className="w-6 h-6" />,
      shortDesc: "NoSQL database - Fully managed, serverless key-value store",
      fullDesc: `Amazon DynamoDB is a fully managed NoSQL database service. Supports both key-value and document data models. Automatic scaling, built-in security, and millisecond latency. Global Tables for multi-region replication.`,
      useCases: [
        "Real-time big data analytics",
        "Web sessions and user profiles",
        "IoT applications",
        "Gaming leaderboards",
        "Mobile and web applications",
        "Content catalogs",
      ],
      pricing: "On-Demand (pay per request) or Provisioned (capacity-based)",
      benefits: [
        "Fully serverless and managed",
        "Automatic scaling",
        "Millisecond latency",
        "Global Tables for multi-region",
        "Built-in encryption",
        "Point-in-time recovery",
      ],
      alternatives: "MongoDB Atlas, Apache Cassandra, Google Datastore",
    },
    {
      id: "redshift",
      name: "Amazon Redshift",
      category: "Database",
      icon: <BarChart3 className="w-6 h-6" />,
      shortDesc: "Data warehouse - Petabyte-scale data analytics",
      fullDesc: `Amazon Redshift is a fully managed data warehouse. Analyze petabytes of structured and semi-structured data using standard SQL. Columnar storage and compression for efficient querying. Single-digit millisecond query response times.`,
      useCases: [
        "Business intelligence and analytics",
        "Data consolidation from multiple sources",
        "Historical data analysis",
        "Report generation",
        "Data lake analytics",
        "Operational analytics",
      ],
      pricing:
        "Dense Compute nodes ($0.25/hour) or Dense Storage ($1.99-2.00/hour)",
      benefits: [
        "Petabyte-scale data warehouse",
        "Columnar storage for fast queries",
        "Scalable compute and storage",
        "Concurrency scaling for parallel queries",
        "Automatic backups and recovery",
        "Encryption and security",
      ],
      alternatives: "Google BigQuery, Snowflake, Apache Spark with S3",
    },

    // Networking Services
    {
      id: "vpc",
      name: "Amazon VPC",
      category: "Networking",
      icon: <Network className="w-6 h-6" />,
      shortDesc: "Virtual Private Cloud - Isolated cloud network",
      fullDesc: `Amazon VPC lets you provision a logically isolated section of AWS cloud. Define IP address ranges, create subnets, and configure routing tables. Control traffic flow with network ACLs and security groups. Connect to on-premises networks via VPN or Direct Connect.`,
      useCases: [
        "Isolated application environments",
        "Multi-tier application architecture",
        "Hybrid cloud connectivity",
        "Network isolation and security",
        "Private database networks",
        "VPN and site-to-site connectivity",
      ],
      pricing: "Free tier available, then minimal charges for traffic",
      benefits: [
        "Network isolation and control",
        "Custom IP addressing",
        "Multiple availability zones",
        "Security groups and network ACLs",
        "VPN and Direct Connect options",
        "Flow logs for monitoring",
      ],
      alternatives:
        "Custom networking on other clouds, self-managed infrastructure",
    },
    {
      id: "cloudfront",
      name: "Amazon CloudFront",
      category: "Networking",
      icon: <MapPin className="w-6 h-6" />,
      shortDesc: "CDN - Global content delivery network",
      fullDesc: `Amazon CloudFront is a content delivery network (CDN) that securely delivers data with low latency and high transfer speeds. 500+ edge locations worldwide. Integrates with S3, EC2, ELB, and custom origins.`,
      useCases: [
        "Static content delivery (HTML, CSS, images)",
        "Video streaming",
        "API acceleration",
        "Software distribution",
        "DDoS protection",
        "Website acceleration",
      ],
      pricing: "Per GB transferred ($0.085-0.60 depending on region)",
      benefits: [
        "500+ edge locations for global reach",
        "Low latency for end users",
        "DDoS protection with AWS Shield",
        "AWS WAF integration",
        "Real-time metrics and logging",
        "Flexible origin support",
      ],
      alternatives: "Cloudflare, Akamai, Google Cloud CDN",
    },
    {
      id: "elb",
      name: "Elastic Load Balancer",
      category: "Networking",
      icon: <Server className="w-6 h-6" />,
      shortDesc: "Load balancing - Distribute traffic across instances",
      fullDesc: `AWS ELB distributes incoming application traffic across multiple targets (EC2 instances, containers, Lambda). Three types: ALB (Layer 7), NLB (Layer 4), CLB (Layer 4/7 legacy). Automatic scaling and health checks.`,
      useCases: [
        "High availability for applications",
        "Traffic distribution",
        "Auto Scaling integration",
        "Microservices routing",
        "Websocket support",
        "SSL/TLS termination",
      ],
      pricing: "ALB $0.0225/hour + LCU charges, NLB $0.006/hour + data charges",
      benefits: [
        "Automatic scaling and health checks",
        "Support for multiple protocols",
        "Sticky sessions for session persistence",
        "SSL/TLS termination",
        "Connection draining",
        "Real-time monitoring",
      ],
      alternatives: "Nginx, HAProxy, Google Cloud Load Balancing",
    },

    // Management and Monitoring
    {
      id: "cloudwatch",
      name: "Amazon CloudWatch",
      category: "Monitoring",
      icon: <Eye className="w-6 h-6" />,
      shortDesc: "Monitoring and observability - Metrics, logs, and alarms",
      fullDesc: `Amazon CloudWatch collects monitoring and operational data from AWS resources. Provides metrics, logs, and alarms. Create custom dashboards and set alarms for automatic notifications. Integrated log group analysis with Logs Insights.`,
      useCases: [
        "Application performance monitoring",
        "Infrastructure monitoring",
        "Log aggregation and analysis",
        "Setting alarms for notifications",
        "Anomaly detection",
        "Creating custom dashboards",
      ],
      pricing: "Free tier includes 10 custom metrics, then $0.10 per metric",
      benefits: [
        "Unified monitoring across AWS",
        "Real-time insights",
        "Automated alarms and notifications",
        "Log Insights for powerful querying",
        "Custom dashboards",
        "Cross-service correlation",
      ],
      alternatives: "Prometheus, Grafana, Datadog, New Relic",
    },
    {
      id: "cloudtrail",
      name: "AWS CloudTrail",
      category: "Management",
      icon: <FileText className="w-6 h-6" />,
      shortDesc: "Audit logging - Track API calls and changes",
      fullDesc: `AWS CloudTrail logs API activity across AWS services. Track who did what, when, and from where. Essential for compliance, auditing, and troubleshooting. Can store logs in S3 for long-term retention.`,
      useCases: [
        "Compliance and auditing",
        "Security analysis",
        "Troubleshooting changes",
        "Change tracking",
        "Account activity monitoring",
        "Fraud detection",
      ],
      pricing: "1 trail free, additional trails $2.00 per trail per month",
      benefits: [
        "Complete API audit trail",
        "User and service activity tracking",
        "Compliance support (PCI, HIPAA, etc.)",
        "S3 integration for log storage",
        "CloudWatch Logs integration",
        "Integrity validation with digital signatures",
      ],
      alternatives: "Google Cloud Audit Logs, Azure Activity Log",
    },
    {
      id: "autoscaling",
      name: "AWS Auto Scaling",
      category: "Management",
      icon: <TrendingUp className="w-6 h-6" />,
      shortDesc: "Auto Scaling - Automatic resource scaling",
      fullDesc: `AWS Auto Scaling automatically adds or removes compute resources based on policies and target metrics. Supports EC2, ECS, RDS, DynamoDB, and other services. Predictive scaling using machine learning.`,
      useCases: [
        "Handling traffic spikes",
        "Cost optimization",
        "Maintaining application performance",
        "Scheduled scaling for predictable patterns",
        "Target tracking scaling policies",
        "Load-based scaling",
      ],
      pricing: "Free service, only pay for resources created",
      benefits: [
        "Automatic capacity adjustment",
        "Cost optimization",
        "Improved application availability",
        "Predictive scaling with ML",
        "Multiple scaling policies",
        "Integration with CloudWatch alarms",
      ],
      alternatives: "Kubernetes HPA, KEDA, Cloud Autoscaling",
    },

    // Security Services
    {
      id: "iam",
      name: "AWS IAM",
      category: "Security",
      icon: <Lock className="w-6 h-6" />,
      shortDesc:
        "Identity and Access Management - Authentication and authorization",
      fullDesc: `AWS IAM manages who has access to AWS services and resources. Create users, groups, and roles with fine-grained permissions. Implement least privilege principle. Multi-factor authentication (MFA) support.`,
      useCases: [
        "User account management",
        "Cross-account access",
        "Service role creation",
        "Temporary credentials",
        "MFA implementation",
        "Access auditing",
      ],
      pricing: "Free service",
      benefits: [
        "Fine-grained access control",
        "MFA support",
        "Cross-account access",
        "Temporary credentials with STS",
        "Access advisor and analysis",
        "IAM Access Analyzer",
      ],
      alternatives: "Azure AD, Google Cloud IAM, Okta",
    },
    {
      id: "kms",
      name: "AWS KMS",
      category: "Security",
      icon: <Shield className="w-6 h-6" />,
      shortDesc: "Key Management Service - Encryption key management",
      fullDesc: `AWS KMS creates and manages cryptographic keys for data encryption. Integrates with AWS services (S3, EBS, RDS). Hardware security module (HSM) backed. Audit key usage with CloudTrail.`,
      useCases: [
        "Encryption key management",
        "Service-level encryption",
        "Application-level encryption",
        "Compliance with encryption requirements",
        "Key rotation and lifecycle management",
      ],
      pricing: "$1.00 per key per month, $0.03 per 10k requests",
      benefits: [
        "HSM-backed encryption keys",
        "Automatic key rotation",
        "Fine-grained access control",
        "Audit trail with CloudTrail",
        "Integration with AWS services",
        "Compliance support",
      ],
      alternatives: "HashiCorp Vault, Azure Key Vault, Google Cloud KMS",
    },
    {
      id: "secretsmanager",
      name: "AWS Secrets Manager",
      category: "Security",
      icon: <Lock className="w-6 h-6" />,
      shortDesc: "Secrets Manager - Store and manage secrets securely",
      fullDesc: `AWS Secrets Manager stores database credentials, API keys, and other secrets. Automatic rotation for supported databases. Fine-grained access control with IAM. Encrypted storage with KMS.`,
      useCases: [
        "Database credentials",
        "API keys and OAuth tokens",
        "SSH key pairs",
        "Application secrets",
        "Third-party service credentials",
      ],
      pricing: "$0.40 per secret per month, $0.05 per 10k API calls",
      benefits: [
        "Automatic secret rotation",
        "Fine-grained access control",
        "Encrypted storage",
        "Audit logging",
        "Cost-effective",
        "Application integration",
      ],
      alternatives: "HashiCorp Vault, Azure Key Vault, CyberArk",
    },

    // Application Services
    {
      id: "sns",
      name: "Amazon SNS",
      category: "Application",
      icon: <MessageSquare className="w-6 h-6" />,
      shortDesc: "Simple Notification Service - Pub/sub messaging",
      fullDesc: `Amazon SNS is a fully managed pub/sub messaging service. Send messages to topics and distribute to subscribers (SQS, Lambda, HTTP, email, SMS). Supports message filtering and encryption.`,
      useCases: [
        "Application notifications",
        "Email and SMS alerts",
        "Lambda function triggers",
        "Cross-service communication",
        "Fan-out messaging pattern",
        "Mobile push notifications",
      ],
      pricing: "First 1 million requests free, then $0.50 per million",
      benefits: [
        "Fully managed pub/sub",
        "Multiple protocol support",
        "Message filtering",
        "Dead letter queues",
        "Encryption support",
        "High throughput",
      ],
      alternatives: "RabbitMQ, Apache Kafka, Google Cloud Pub/Sub",
    },
    {
      id: "sqs",
      name: "Amazon SQS",
      category: "Application",
      icon: <MessageSquare className="w-6 h-6" />,
      shortDesc: "Simple Queue Service - Fully managed message queue",
      fullDesc: `Amazon SQS is a fully managed message queue service. Decouple components of applications. Standard queues (at-least-once) and FIFO queues (exactly-once). Visibility timeout and dead letter queues for reliability.`,
      useCases: [
        "Asynchronous task processing",
        "Application decoupling",
        "Batch processing",
        "Microservices communication",
        "Reliable message delivery",
        "Rate limiting",
      ],
      pricing: "First 1 million requests free, then $0.40 per million",
      benefits: [
        "Fully managed queues",
        "FIFO and standard queue types",
        "Dead letter queues",
        "Visibility timeout",
        "Message deduplication",
        "Long polling for efficiency",
      ],
      alternatives: "RabbitMQ, Apache Kafka, Google Cloud Tasks",
    },
    {
      id: "apigateway",
      name: "Amazon API Gateway",
      category: "Application",
      icon: <Code className="w-6 h-6" />,
      shortDesc: "API Gateway - Create, manage, and deploy APIs",
      fullDesc: `Amazon API Gateway creates RESTful and WebSocket APIs. Integrates with Lambda, EC2, ECS for backend. Built-in authentication, throttling, and caching. API versioning and deployment stages.`,
      useCases: [
        "REST API creation",
        "Microservices API gateway",
        "WebSocket APIs for real-time",
        "API management and versioning",
        "API monetization",
        "Mobile app backends",
      ],
      pricing: "$3.50 per million API calls, $0.09 per GB data transfer",
      benefits: [
        "Easy API creation and management",
        "Multiple authentication methods",
        "Request/response transformation",
        "Caching for performance",
        "Rate limiting and throttling",
        "WebSocket support",
      ],
      alternatives: "Kong, AWS AppSync, Google Cloud Endpoints",
    },

    // Developer Tools
    {
      id: "codecommit",
      name: "AWS CodeCommit",
      category: "Developer Tools",
      icon: <GitBranch className="w-6 h-6" />,
      shortDesc: "CodeCommit - Managed Git repositories",
      fullDesc: `AWS CodeCommit is a fully managed Git repository hosting service. Store code, branches, and commit history. Integrates with CodePipeline and CodeBuild. IAM-based access control.`,
      useCases: [
        "Git repository hosting",
        "Source code version control",
        "Team collaboration",
        "CI/CD pipeline integration",
        "Code review workflows",
        "Access control management",
      ],
      pricing: "1 active user free, additional users $1.00/month",
      benefits: [
        "Fully managed Git",
        "High availability",
        "Fine-grained access control",
        "Encryption in transit and at rest",
        "Integration with CodePipeline",
        "Pull request workflows",
      ],
      alternatives: "GitHub, GitLab, Bitbucket",
    },
    {
      id: "codebuild",
      name: "AWS CodeBuild",
      category: "Developer Tools",
      icon: <Package className="w-6 h-6" />,
      shortDesc: "CodeBuild - Fully managed build service",
      fullDesc: `AWS CodeBuild compiles source code, runs tests, and produces deployable artifacts. Pre-packaged build environments or custom Docker images. Integrates with CodePipeline.`,
      useCases: [
        "Application builds",
        "Docker image creation",
        "Running test suites",
        "Code compilation",
        "Artifact generation",
        "Multi-language support",
      ],
      pricing:
        "Pay per minute of build time ($0.005-0.013 depending on instance)",
      benefits: [
        "Fully managed build service",
        "Multiple language support",
        "Docker image support",
        "Parallel builds",
        "Build logs in CloudWatch",
        "Cost-effective pricing",
      ],
      alternatives: "Jenkins, Travis CI, CircleCI, GitHub Actions",
    },
    {
      id: "codepipeline",
      name: "AWS CodePipeline",
      category: "Developer Tools",
      icon: <Zap className="w-6 h-6" />,
      shortDesc: "CodePipeline - Automated CI/CD pipeline service",
      fullDesc: `AWS CodePipeline automates continuous deployment processes. Define stages (Source, Build, Test, Deploy). Integrates with CodeCommit, CodeBuild, CodeDeploy, and third-party tools.`,
      useCases: [
        "CI/CD pipeline automation",
        "Continuous deployment",
        "Multi-stage deployments",
        "Approval workflows",
        "Release automation",
        "Infrastructure updates",
      ],
      pricing: "$1.00 per active pipeline per month",
      benefits: [
        "Fully managed CI/CD",
        "Stage-based workflow",
        "Multiple source integrations",
        "Deployment approvals",
        "Failure notifications",
        "Pipeline visualization",
      ],
      alternatives: "Jenkins, GitLab CI, GitHub Actions, CircleCI",
    },
    {
      id: "codedeploy",
      name: "AWS CodeDeploy",
      category: "Developer Tools",
      icon: <Server className="w-6 h-6" />,
      shortDesc: "CodeDeploy - Deployment service for on-premises and cloud",
      fullDesc: `AWS CodeDeploy automates application deployments to EC2, on-premises servers, or Lambda. Blue/green deployments for zero downtime. Rollback on failure.`,
      useCases: [
        "Application deployments",
        "Blue/green deployments",
        "Canary deployments",
        "On-premises server deployments",
        "Automatic rollback",
        "Load balancer integration",
      ],
      pricing: "No charge for CodeDeploy, only pay for compute resources",
      benefits: [
        "Zero-downtime deployments",
        "Automatic rollback",
        "On-premises and cloud support",
        "Integration with CodePipeline",
        "Deployment strategies",
        "Application revisions management",
      ],
      alternatives: "Jenkins, Ansible, Terraform, Kubernetes deployments",
    },

    // Analytics and Machine Learning
    {
      id: "sagemaker",
      name: "Amazon SageMaker",
      category: "ML",
      icon: <BarChart3 className="w-6 h-6" />,
      shortDesc: "SageMaker - Build, train, deploy ML models",
      fullDesc: `Amazon SageMaker fully managed ML service for building, training, and deploying models. Pre-built algorithms, notebooks, and built-in model hosting. AutoML capabilities.`,
      useCases: [
        "Predictive analytics",
        "Computer vision applications",
        "Natural language processing",
        "Recommendation systems",
        "Time series forecasting",
        "Fraud detection",
      ],
      pricing:
        "Pay per training hours, inference endpoint hours, notebook instances",
      benefits: [
        "Fully managed ML pipeline",
        "Pre-built algorithms",
        "Automatic model tuning",
        "Built-in model hosting",
        "A/B testing for models",
        "Multi-model endpoints",
      ],
      alternatives: "Google Vertex AI, Azure ML, Hugging Face",
    },
    {
      id: "athena",
      name: "Amazon Athena",
      category: "Analytics",
      icon: <Search className="w-6 h-6" />,
      shortDesc: "Athena - Query S3 data with SQL",
      fullDesc: `Amazon Athena queries data stored in S3 using standard SQL. No infrastructure to manage. Pay only for data scanned. Supports various formats (Parquet, CSV, JSON, ORC).`,
      useCases: [
        "Ad hoc SQL queries on data lakes",
        "Log analysis",
        "Cost analysis",
        "Data exploration",
        "Reporting",
        "Data catalog integration",
      ],
      pricing: "$5 per TB of data scanned",
      benefits: [
        "No infrastructure management",
        "Standard SQL queries",
        "Fast query results",
        "Partitioning for performance",
        "Cost optimization",
        "Glue Catalog integration",
      ],
      alternatives: "Google BigQuery, Snowflake, Presto",
    },

    // Integration Services
    {
      id: "eventbridge",
      name: "Amazon EventBridge",
      category: "Integration",
      icon: <Zap className="w-6 h-6" />,
      shortDesc: "EventBridge - Serverless event bus",
      fullDesc: `Amazon EventBridge connects applications using event-driven architecture. Route events from AWS services, custom applications, SaaS providers. Real-time event processing.`,
      useCases: [
        "Event-driven architectures",
        "SaaS integration",
        "Cross-service communication",
        "Event routing and filtering",
        "Real-time data processing",
        "Scheduled tasks",
      ],
      pricing: "Free tier: 1 million events/month, then $1.00 per million",
      benefits: [
        "Serverless event routing",
        "Multiple event sources",
        "Event filtering and transformation",
        "SaaS provider integration",
        "Scheduled rules",
        "Built-in schema registry",
      ],
      alternatives: "Apache Kafka, AWS SNS, Google Cloud Pub/Sub",
    },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(awsServices.map((s) => s.category))),
  ];
  const filteredServices =
    selectedCategory === "all"
      ? awsServices
      : awsServices.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-950 via-slate-900 to-black text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
            Complete AWS Services Guide
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-300">
            My First Next.js Project Deployment in EC2 Machine - By Surya Pratap
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            Comprehensive documentation of all major Amazon Web Services with
            detailed explanations, use cases, pricing, and alternatives
          </p>

          {/* Service Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-orange-900 bg-opacity-30 border border-orange-700 rounded-lg p-4">
              <p className="text-orange-300 text-sm">Total Services</p>
              <p className="text-3xl font-bold text-orange-400">40+</p>
            </div>
            <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
              <p className="text-yellow-300 text-sm">Categories</p>
              <p className="text-3xl font-bold text-yellow-400">
                {categories.length}
              </p>
            </div>
            <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-4">
              <p className="text-red-300 text-sm">Global Regions</p>
              <p className="text-3xl font-bold text-red-400">30+</p>
            </div>
            <div className="bg-pink-900 bg-opacity-30 border border-pink-700 rounded-lg p-4">
              <p className="text-pink-300 text-sm">Monthly Users</p>
              <p className="text-3xl font-bold text-pink-400">Millions</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-4 mb-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-orange-500 transition-all"
            >
              <button
                onClick={() => toggleService(service.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors text-left"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-orange-400">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-100 mb-1">
                      {service.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{service.shortDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-orange-900 text-orange-300 rounded-full text-xs font-semibold">
                    {service.category}
                  </span>
                  {expandedServices.has(service.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedServices.has(service.id) && (
                <div className="px-6 py-6 bg-black bg-opacity-40 border-t border-gray-700 space-y-4">
                  {/* Full Description */}
                  <div>
                    <h4 className="text-lg font-bold text-orange-300 mb-2">
                      Overview
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {service.fullDesc}
                    </p>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h4 className="text-lg font-bold text-orange-300 mb-3">
                      Use Cases
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.useCases.map((useCase, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 text-gray-300 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-lg font-bold text-orange-300 mb-3">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 text-gray-300 text-sm"
                        >
                          <ArrowRight className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & Alternatives */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-700 bg-opacity-50 rounded p-4 border border-gray-600">
                      <h5 className="text-orange-300 font-bold mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Pricing Model
                      </h5>
                      <p className="text-gray-300 text-sm">{service.pricing}</p>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 rounded p-4 border border-gray-600">
                      <h5 className="text-orange-300 font-bold mb-2">
                        Alternatives
                      </h5>
                      <p className="text-gray-300 text-sm">
                        {service.alternatives}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AWS Best Practices Section */}
        <div className="bg-linear-to-br from-orange-900 to-orange-800 border border-orange-700 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-orange-100 mb-6">
            AWS Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Security First",
                points: [
                  "Use IAM for fine-grained access control",
                  "Enable MFA for all user accounts",
                  "Encrypt data at rest and in transit",
                  "Use AWS KMS for key management",
                  "Regular security audits with AWS Config",
                ],
              },
              {
                title: "Cost Optimization",
                points: [
                  "Use Reserved Instances for predictable workloads",
                  "Implement Auto Scaling for dynamic loads",
                  "Monitor costs with AWS Cost Explorer",
                  "Use Spot Instances for flexible workloads",
                  "Archive old data to S3 Glacier",
                ],
              },
              {
                title: "High Availability",
                points: [
                  "Deploy across multiple availability zones",
                  "Use Auto Scaling groups",
                  "Implement load balancing",
                  "Multi-region replication for critical data",
                  "Regular backup and disaster recovery testing",
                ],
              },
              {
                title: "Performance",
                points: [
                  "Use CloudFront for content delivery",
                  "Enable caching (ElastiCache, CloudFront)",
                  "Optimize database queries and indexing",
                  "Use read replicas for databases",
                  "Monitor performance with CloudWatch",
                ],
              },
            ].map((section, idx) => (
              <div
                key={idx}
                className="bg-black bg-opacity-40 rounded-lg p-6 border border-orange-700"
              >
                <h3 className="text-xl font-bold text-orange-300 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.points.map((point, pidx) => (
                    <li
                      key={pidx}
                      className="flex gap-2 text-orange-100 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* AWS Architecture Patterns */}
        <div className="bg-linear-to-br from-yellow-900 to-yellow-800 border border-yellow-700 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-yellow-100 mb-6">
            Common AWS Architecture Patterns
          </h2>

          <div className="space-y-4">
            {[
              {
                name: "Web Application Architecture",
                description:
                  "Route53 → CloudFront → ALB → EC2/ECS/Lambda → RDS/DynamoDB → S3",
              },
              {
                name: "Microservices on Kubernetes",
                description:
                  "ALB → EKS Cluster → Service Mesh (Istio) → Aurora/DynamoDB",
              },
              {
                name: "Serverless Application",
                description:
                  "API Gateway → Lambda → DynamoDB/RDS → S3 → CloudFront",
              },
              {
                name: "Data Lake Architecture",
                description:
                  "Data Sources → S3 (Data Lake) → Glue (ETL) → Athena/Redshift",
              },
              {
                name: "Event-Driven Architecture",
                description:
                  "EventBridge → SNS/SQS → Lambda → DynamoDB → CloudWatch",
              },
              {
                name: "Hybrid Cloud Architecture",
                description:
                  "On-Premises → AWS Direct Connect → VPC → AWS Services",
              },
            ].map((pattern, idx) => (
              <div
                key={idx}
                className="bg-black bg-opacity-40 rounded-lg p-4 border border-yellow-700"
              >
                <h3 className="text-lg font-bold text-yellow-300 mb-2">
                  {pattern.name}
                </h3>
                <p className="text-yellow-100 text-sm font-mono">
                  {pattern.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Start Your AWS Journey</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            AWS offers a comprehensive suite of cloud services. Start with free
            tier, experiment, and scale as your needs grow.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold text-white transition-colors">
              Get Started Free
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-gray-100 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AWSBlog;
