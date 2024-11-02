//import { db } from 'lib/db';
//import { items } from 'lib/items-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    message: 'Uncomment to seed data after DB is set up.'
  });

  //const mockItems = [
  //  { 
  //    name: 'Cloud Foundations', 
  //    type: 'accelerator',
  //    description: 'A comprehensive cloud adoption framework',
  //    linked_service: 'Customer Engagement Hub', 
  //    linked_accelerators: ['DR Migrate', 'Sentinel Migration'],
  //    status: 'active', 
  //    effort: 50, 
  //    times_used: 10, 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'Cloud Architect',
  //          want: 'clarity in their cloud adoption strategy',
  //          externalProblem: 'Unclear cloud adoption strategy',
  //          internalProblem: 'Feeling overwhelmed by cloud options',
  //          philosophicalProblem: 'Cloud should simplify, not complicate',
  //          empathyStatement: 'We understand the challenges of navigating cloud adoption.',
  //          authorityStatement: 'Our consultants have guided numerous successful cloud adoptions.',
  //          plan: 'Develop a tailored cloud adoption roadmap',
  //          callToActions: 'Start your cloud journey with us',
  //          avoidFailure: 'Wasted resources and misaligned business goals',
  //          successLooksLike: 'Seamless cloud integration and enhanced business agility',
  //          oneLiner: 'Cloud Architects gain clarity in their cloud adoption strategy with our guidance.',
  //          elevatorPitch: 'We help Cloud Architects who face unclear cloud adoption strategies. By developing a tailored cloud adoption roadmap, we guide them towards seamless cloud integration and enhanced business agility, avoiding wasted resources and misaligned business goals.',
  //          landingPage: '<h1>Cloud Architects, are you struggling with unclear cloud adoption strategies?</h1><p>Meet your Cloud Strategy Consultant who will help you develop a tailored cloud adoption roadmap.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Start your cloud journey with us</li><li>Avoid wasted resources and misaligned goals</li><li>Achieve seamless cloud integration</li></ul><button>Get Started Now</button>'
  //        },
  //        {
  //          character: 'IT Manager',
  //          want: 'control over cloud costs',
  //          externalProblem: 'Lack of oversight on cloud costs',
  //          internalProblem: 'Frustration over unpredictable cloud bills',
  //          philosophicalProblem: 'Cloud should be cost-efficient and transparent',
  //          empathyStatement: 'We understand the difficulties of managing cloud costs effectively.',
  //          authorityStatement: 'We\'ve helped businesses optimize their cloud expenses while maintaining performance.',
  //          plan: 'Implement cost management tools and reporting',
  //          callToActions: 'Optimize your cloud costs with us',
  //          avoidFailure: 'Overspending and budget overruns',
  //          successLooksLike: 'Controlled cloud costs and increased transparency',
  //          oneLiner: 'IT Managers gain control over cloud costs with our tailored strategies.',
  //          elevatorPitch: 'We help IT Managers who struggle with cloud cost management by implementing reporting tools and cost optimization strategies, ensuring transparency and avoiding budget overruns.',
  //          landingPage: '<h1>IT Managers, are you struggling with cloud cost control?</h1><p>Meet your Cloud Strategy Consultant to develop a cost optimization plan.</p><h2>Here\'s how we help:</h2><ul><li>Optimize costs and avoid budget overruns</li><li>Achieve cost transparency</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.cloud-foundations.com",
  //      video: "https://videos.cloud-foundations.com/intro"
  //    }
  //  },
  //  { 
  //    name: 'DR Migrate', 
  //    type: 'accelerator',
  //    description: 'A comprehensive migration strategy',
  //    linked_service: 'Customer Engagement Hub', 
  //    linked_accelerators: ['Cloud Foundations'],
  //    status: 'active', 
  //    effort: 75, 
  //    times_used: 15, 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'IT Manager',
  //          want: 'secure data during migration',
  //          externalProblem: 'Data loss risk during migration',
  //          internalProblem: 'Anxiety about data integrity',
  //          philosophicalProblem: 'Data should be secure and intact',
  //          empathyStatement: 'We know how critical your data is to your operations.',
  //          authorityStatement: 'Our specialists have successfully managed numerous migrations.',
  //          plan: 'Implement a comprehensive migration strategy',
  //          callToActions: 'Ensure your data is safe during migration',
  //          avoidFailure: 'Potential data loss and compliance issues',
  //          successLooksLike: 'A smooth migration process with zero data loss',
  //          oneLiner: 'IT Managers secure their data during migration with our proven strategies.',
  //          elevatorPitch: 'We assist IT Managers who worry about data loss risks during migration. By implementing a comprehensive migration strategy, we ensure their data is safe, avoiding potential data loss and compliance issues for a smooth migration process.',
  //          landingPage: '<h1>IT Managers, are you worried about data loss during migration?</h1><p>Meet your Disaster Recovery Specialist who will implement a comprehensive migration strategy to ensure your data is safe.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Secure your data during migration</li><li>Avoid data loss and compliance issues</li><li>Achieve a smooth migration process</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.drmigrate.com",
  //      video: "https://videos.drmigrate.com/demo"
  //    }
  //  },
  //  { 
  //    name: 'Sentinel Migration', 
  //    type: 'accelerator',
  //    description: 'A secure migration process',
  //    linked_service: 'Customer Engagement Hub',
  //    linked_accelerators: ['Cloud Foundations'], 
  //    status: 'active', 
  //    effort: 60, 
  //    times_used: 8, 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'Security Officer',
  //          want: 'security in migration processes',
  //          externalProblem: 'Vulnerabilities in migration processes',
  //          internalProblem: 'Fear of security breaches',
  //          philosophicalProblem: 'Security should be integral to every process',
  //          empathyStatement: 'We understand the importance of securing your data.',
  //          authorityStatement: 'Our consultants are experts in integrating security into DevOps.',
  //          plan: 'Integrate security practices into DevOps',
  //          callToActions: 'Secure your migration with our expertise',
  //          avoidFailure: 'Security breaches and compliance failures',
  //          successLooksLike: 'A secure migration process with embedded security practices',
  //          oneLiner: 'Security Officers fortify their migration processes with our DevSecOps expertise.',
  //          elevatorPitch: 'We help Security Officers concerned about vulnerabilities in migration processes. By integrating security practices into DevOps, we guide them to a secure migration process, avoiding security breaches and compliance failures.',
  //          landingPage: '<h1>Security Officers, are you concerned about vulnerabilities in your migration processes?</h1><p>Meet your DevSecOps Consultant who will integrate security practices into your DevOps.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Secure your migration with our expertise</li><li>Avoid security breaches and compliance failures</li><li>Achieve a secure migration process</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.sentinel-migration.com",
  //      video: "https://videos.sentinel-migration.com/overview"
  //    }
  //  },
  //  { 
  //    name: 'Vision Workshop', 
  //    type: 'accelerator',
  //    description: 'A workshop to clarify cloud vision',
  //    linked_service: 'Customer Engagement Hub', 
  //    linked_accelerators: ['Cloud Foundations'],
  //    status: 'draft', 
  //    effort: 30, 
  //    times_used: 5, 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'Business Executive',
  //          want: 'a clear vision for cloud adoption',
  //          externalProblem: 'Unclear vision for cloud adoption',
  //          internalProblem: 'Frustration with lack of direction',
  //          philosophicalProblem: 'Vision should drive cloud strategy',
  //          empathyStatement: 'We know how vital a clear vision is for success.',
  //          authorityStatement: 'Our advisors have helped many businesses set clear cloud visions.',
  //          plan: 'Facilitate a vision-setting workshop',
  //          callToActions: 'Clarify your cloud vision today',
  //          avoidFailure: 'Missed business opportunities and slow growth',
  //          successLooksLike: 'A clear, actionable cloud strategy',
  //          oneLiner: 'Business Executives clarify their cloud vision through our workshops.',
  //          elevatorPitch: 'We help Business Executives who struggle with unclear visions for cloud adoption. By facilitating a vision-setting workshop, we guide them to a clear, actionable cloud strategy, avoiding missed business opportunities and slow growth.',
  //          landingPage: '<h1>Business Executives, are you unsure of your cloud adoption vision?</h1><p>Meet your Cloud Strategy Advisor who will facilitate a vision-setting workshop to clarify your cloud vision.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Clarify your cloud vision today</li><li>Avoid missed opportunities and slow growth</li><li>Achieve a clear, actionable cloud strategy</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.vision-workshop.com"
  //    }
  //  },
  //  { 
  //    name: 'Azure Landing Zone', 
  //    type: 'accelerator',
  //    description: 'An optimal Azure architecture',
  //    linked_service: 'Data Analytics Platform', 
  //    linked_accelerators: ['Cloud Foundations'],
  //    status: 'active', 
  //    effort: 80, 
  //    times_used: 20, 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'Cloud Engineer',
  //          want: 'simplified Azure architecture',
  //          externalProblem: 'Complex Azure setup and architecture',
  //          internalProblem: 'Overwhelmed by Azure configurations',
  //          philosophicalProblem: 'Cloud architecture should be efficient and manageable',
  //          empathyStatement: 'We understand the complexities of Azure setups.',
  //          authorityStatement: 'Our experts have streamlined numerous Azure environments.',
  //          plan: 'Design and implement an optimal Azure landing zone',
  //          callToActions: 'Simplify your Azure architecture today',
  //          avoidFailure: 'Inefficient cloud utilization and high costs',
  //          successLooksLike: 'A streamlined Azure environment that maximizes resources',
  //          oneLiner: 'Cloud Engineers streamline their Azure setups with our expert design.',
  //          elevatorPitch: 'We help Cloud Engineers facing complex Azure setups. By designing and implementing an optimal Azure landing zone, we simplify their architecture, avoiding inefficient cloud utilization and high costs for a streamlined environment.',
  //          landingPage: '<h1>Cloud Engineers, is your Azure setup overly complex?</h1><p>Meet your Azure Expert who will design and implement an optimal Azure landing zone to simplify your architecture.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Simplify your Azure architecture today</li><li>Avoid inefficient utilization and high costs</li><li>Achieve a streamlined Azure environment</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.azure-landing-zone.com",
  //      video: "https://videos.azure-landing-zone.com/intro"
  //    }
  //  },
  //  { 
  //    name: 'AWS Landing Zone', 
  //    type: 'accelerator',
  //    description: 'A standardized AWS environment',
  //    linked_service: 'Data Analytics Platform', 
  //    linked_accelerators: ['Cloud Foundations'],
  //    status: 'archived', 
  //    effort: 70, 
  //    times_used: 18, 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'AWS Administrator',
  //          want: 'consistent AWS environments',
  //          externalProblem: 'Inconsistent AWS environments across teams',
  //          internalProblem: 'Frustration with lack of standardization',
  //          philosophicalProblem: 'AWS environments should be consistent and secure',
  //          empathyStatement: 'We understand the challenges of managing multiple AWS environments.',
  //          authorityStatement: 'Our architects have standardized numerous AWS setups.',
  //          plan: 'Standardize and optimize AWS accounts',
  //          callToActions: 'Achieve AWS consistency and efficiency',
  //          avoidFailure: 'Configuration drift and security risks',
  //          successLooksLike: 'Consistent and secure AWS environments',
  //          oneLiner: 'AWS Administrators achieve consistent environments with our help.',
  //          elevatorPitch: 'We assist AWS Administrators struggling with inconsistent AWS environments across teams. By standardizing and optimizing AWS accounts, we guide them to consistent and secure environments, avoiding configuration drift and security risks.',
  //          landingPage: '<h1>AWS Administrators, are your environments inconsistent?</h1><p>Meet your AWS Solutions Architect who will standardize and optimize your AWS accounts for consistency.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Achieve AWS consistency and efficiency</li><li>Avoid configuration drift and security risks</li><li>Ensure secure AWS environments</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.aws-landing-zone.com",
  //      video: "https://videos.aws-landing-zone.com/intro"
  //    }
  //  },
  //  { 
  //    name: 'AEP', 
  //    type: 'accelerator',
  //    description: 'Accelerate software delivery with AI',
  //    linked_service: 'Development Platform', 
  //    linked_accelerators: ['Azure Landing Zone'],
  //    status: 'active', 
  //    effort: 55, 
  //    times_used: 12, 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'DevOps Team',
  //          want: 'fast and reliable software deployment',
  //          externalProblem: 'Slow and manual software deployment',
  //          internalProblem: 'Frustration with deployment delays',
  //          philosophicalProblem: 'Software deployment should be fast and reliable',
  //          empathyStatement: 'We understand the need for speed and reliability in deployments.',
  //          authorityStatement: 'Our specialists have automated numerous deployment pipelines.',
  //          plan: 'Implement CI/CD practices',
  //          callToActions: 'Automate your deployment pipeline now',
  //          avoidFailure: 'Deployment delays and quality issues',
  //          successLooksLike: 'Rapid, reliable software delivery',
  //          oneLiner: 'DevOps Teams accelerate software delivery with our automation expertise.',
  //          elevatorPitch: 'We support DevOps Teams facing slow and manual software deployments. By implementing CI/CD practices, we guide them to rapid, reliable software delivery, avoiding delays and quality issues.',
  //          landingPage: '<h1>DevOps Teams, are your deployments slow and manual?</h1><p>Meet your Automation Specialist who will help you implement CI/CD practices.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Automate your deployment pipeline now</li><li>Avoid delays and quality issues</li><li>Achieve rapid, reliable software delivery</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.aep.com",
  //      video: "https://videos.aep.com/overview"
  //    }
  //  },
  //  { 
  //    name: 'Cost Automation', 
  //    type: 'accelerator',
  //    description: 'Optimize cloud costs with FinOps',
  //    linked_service: 'Development Platform', 
  //    linked_accelerators: ['Green Gauge'],
  //    status: 'active', 
  //    effort: 40, 
  //    times_used: 9, 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'Finance Officer',
  //          want: 'visibility into cloud spending',
  //          externalProblem: 'High cloud spend without visibility',
  //          internalProblem: 'Concern about uncontrolled costs',
  //          philosophicalProblem: 'Cloud spending should be transparent and controlled',
  //          empathyStatement: 'We understand the importance of managing cloud costs.',
  //          authorityStatement: 'Our experts have optimized cloud costs for many organizations.',
  //          plan: 'Implement cost tracking and optimization tools',
  //          callToActions: 'Gain visibility into your cloud spending',
  //          avoidFailure: 'Uncontrolled costs and budget overruns',
  //          successLooksLike: 'Optimized cloud costs with full visibility',
  //          oneLiner: 'Finance Officers gain visibility into their cloud spending with our expertise.',
  //          elevatorPitch: 'We help Finance Officers struggling with high cloud spend without visibility. By implementing cost tracking and optimization tools, we guide them to optimized cloud costs, avoiding uncontrolled costs and budget overruns.',
  //          landingPage: '<h1>Finance Officers, is your cloud spending out of control?</h1><p>Meet your FinOps Expert who will implement cost tracking and optimization tools for visibility.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Gain visibility into your cloud spending</li><li>Avoid uncontrolled costs and budget overruns</li><li>Achieve optimized cloud costs</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.cost-automation.com",
  //      video: "https://videos.cost-automation.com/overview"
  //    }
  //  },
  //  { 
  //    name: 'Green Gauge', 
  //    type: 'accelerator',
  //    description: 'Reduce carbon emissions with IT strategies',
  //    linked_service: 'Customer Engagement Hub', 
  //    linked_accelerators: ['Cost Automation'],
  //    status: 'active', 
  //    effort: 20, 
  //    times_used: 3, 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'Sustainability Officer',
  //          want: 'lower carbon emissions',
  //          externalProblem: 'High carbon emissions from IT infrastructure',
  //          internalProblem: 'Concern about environmental impact',
  //          philosophicalProblem: 'IT should contribute to sustainability',
  //          empathyStatement: 'We understand the importance of reducing carbon emissions.',
  //          authorityStatement: 'Our consultants have successfully implemented carbon reduction strategies.',
  //          plan: 'Implement carbon reduction strategies',
  //          callToActions: 'Start reducing your carbon footprint today',
  //          avoidFailure: 'Negative impact on the environment and brand reputation',
  //          successLooksLike: 'Lower carbon emissions and enhanced corporate responsibility',
  //          oneLiner: 'Sustainability Officers reduce their carbon footprint with our strategies.',
  //          elevatorPitch: 'We assist Sustainability Officers concerned about high carbon emissions from IT infrastructure. By implementing carbon reduction strategies, we guide them to lower emissions, avoiding negative environmental impacts and enhancing corporate responsibility.',
  //          landingPage: '<h1>Sustainability Officers, are your carbon emissions too high?</h1><p>Meet your Sustainability Consultant who will help you implement effective carbon reduction strategies.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Start reducing your carbon footprint today</li><li>Avoid negative impacts on the environment and brand</li><li>Enhance corporate responsibility</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.green-gauge.com",
  //      video: "https://videos.green-gauge.com/overview"
  //    }
  //  },
  //  { 
  //    name: 'Development Platform', 
  //    type: 'service',
  //    description: 'A comprehensive development platform as a service (PaaS) for building, testing, and deploying applications.',
  //    status: 'active', 
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'Cloud Architect',
  //          want: 'clarity in their devops adoption strategy',
  //          externalProblem: 'Unclear devops adoption strategy',
  //          internalProblem: 'Feeling overwhelmed by devops options',
  //          philosophicalProblem: 'Cloud should simplify, not complicate',
  //          empathyStatement: 'We understand the challenges of navigating devops adoption.',
  //          authorityStatement: 'Our consultants have guided numerous successful devops adoptions.',
  //          plan: 'Develop a tailored devops adoption roadmap',
  //          callToActions: 'Start your devops journey with us',
  //          avoidFailure: 'Wasted resources and misaligned business goals',
  //          successLooksLike: 'Seamless devops integration and enhanced business agility',
  //          oneLiner: 'Cloud Architects gain clarity in their devops strategy with our guidance.',
  //          elevatorPitch: 'We help Cloud Architects who face unclear devops strategies. By developing a tailored devops adoption roadmap, we guide them towards seamless developer integration and enhanced business agility, avoiding wasted resources and misaligned business goals.',
  //          landingPage: '<h1>Cloud Architects, are you struggling with unclear devops adoption strategies?</h1><p>Meet your Cloud Strategy Consultant who will help you develop a tailored devops adoption roadmap.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Start your devops journey with us</li><li>Avoid wasted resources and misaligned goals</li><li>Achieve seamless devops integration</li></ul><button>Get Started Now</button>'
  //        },
  //        {
  //          character: 'IT Manager',
  //          want: 'control over devops costs',
  //          externalProblem: 'Lack of oversight on devops costs',
  //          internalProblem: 'Frustration over unpredictable devops bills',
  //          philosophicalProblem: 'Cloud should be cost-efficient and transparent',
  //          empathyStatement: 'We understand the difficulties of managing devops costs effectively.',
  //          authorityStatement: 'We\'ve helped businesses optimize their devops expenses while maintaining performance.',
  //          plan: 'Implement cost management tools and reporting',
  //          callToActions: 'Optimize your devops costs with us',
  //          avoidFailure: 'Overspending and budget overruns',
  //          successLooksLike: 'Controlled devops costs and increased transparency',
  //          oneLiner: 'IT Managers gain control over devops costs with our tailored strategies.',
  //          elevatorPitch: 'We help IT Managers who struggle with devops cost management by implementing reporting tools and cost optimization strategies, ensuring transparency and avoiding budget overruns.',
  //          landingPage: '<h1>IT Managers, are you struggling with devops cost control?</h1><p>Meet your Cloud Strategy Consultant to develop a cost optimization plan.</p><h2>Here\'s how we help:</h2><ul><li>Optimize costs and avoid budget overruns</li><li>Achieve cost transparency</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.devops-foundations.com",
  //      video: "https://videos.devops-foundations.com/intro"
  //    }
  //  },{
  //    name: 'Data Analytics Platform',
  //    type: 'service',
  //    description: 'An end-to-end data analytics platform for collecting, processing, and visualizing data insights in real time.',
  //    status: 'active',
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'Data Scientist',
  //          want: 'faster, actionable insights from large datasets',
  //          externalProblem: 'Slow processing of large datasets',
  //          internalProblem: 'Feeling frustrated by limited analytical capabilities',
  //          philosophicalProblem: 'Data should empower decisions, not delay them',
  //          empathyStatement: 'We understand the need for efficient, scalable data solutions.',
  //          authorityStatement: 'Our platform powers rapid data processing for top enterprises.',
  //          plan: 'Deploy scalable data processing pipelines and custom visualizations',
  //          callToActions: 'Unleash the power of your data',
  //          avoidFailure: 'Missed insights and ineffective decision-making',
  //          successLooksLike: 'Rapid, actionable insights driving strategic decisions',
  //          oneLiner: 'Data Scientists access faster insights with our platform’s analytics tools.',
  //          elevatorPitch: 'We empower Data Scientists to process and analyze large datasets rapidly, offering efficient data pipelines that prevent missed insights and support strategic decisions.',
  //          landingPage: '<h1>Data Scientists, do you need faster insights?</h1><p>Discover how our analytics platform accelerates your data pipeline.</p><h2>Here\'s how we help:</h2><ul><li>Process large datasets efficiently</li><li>Uncover insights faster</li><li>Drive impactful decisions</li></ul><button>Get Started Now</button>'
  //        },
  //        {
  //          character: 'Business Analyst',
  //          want: 'real-time access to key metrics',
  //          externalProblem: 'Delayed access to critical business data',
  //          internalProblem: 'Feeling anxious about incomplete data for decisions',
  //          philosophicalProblem: 'Business decisions should be based on real-time data',
  //          empathyStatement: 'We understand the pressure of making timely, data-driven decisions.',
  //          authorityStatement: 'We enable businesses to act on real-time data insights.',
  //          plan: 'Set up live dashboards and automated data refreshes',
  //          callToActions: 'Get real-time data at your fingertips',
  //          avoidFailure: 'Delayed decisions and missed opportunities',
  //          successLooksLike: 'Timely, well-informed business decisions',
  //          oneLiner: 'Business Analysts gain real-time insights with our live dashboards.',
  //          elevatorPitch: 'We equip Business Analysts with real-time dashboards, ensuring they can make timely, data-informed decisions and avoid missed opportunities.',
  //          landingPage: '<h1>Business Analysts, do you need real-time data?</h1><p>Our platform offers live dashboards with key metrics always up-to-date.</p><h2>Here\'s how we help:</h2><ul><li>Real-time access to critical data</li><li>Empowered decision-making</li><li>Enhanced business performance</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.data-analytics-platform.com",
  //      video: "https://videos.data-analytics-platform.com/overview"
  //    }
  //  },
  //  {
  //    name: 'Customer Engagement Hub',
  //    type: 'service',
  //    description: 'A platform for managing and enhancing customer engagement through personalized communication and insights.',
  //    status: 'active',
  //    story_branding: {
  //      characters: [
  //        {
  //          character: 'Marketing Specialist',
  //          want: 'personalized customer engagement at scale',
  //          externalProblem: 'Limited personalization capabilities',
  //          internalProblem: 'Frustration with one-size-fits-all communication',
  //          philosophicalProblem: 'Customer engagement should feel personal',
  //          empathyStatement: 'We understand the challenge of connecting meaningfully with every customer.',
  //          authorityStatement: 'Our platform enables personalized engagement for large audiences.',
  //          plan: 'Implement segmentation and automated personalized messaging',
  //          callToActions: 'Transform your customer engagement',
  //          avoidFailure: 'Lost engagement and missed revenue',
  //          successLooksLike: 'Enhanced customer loyalty and engagement',
  //          oneLiner: 'Marketing Specialists achieve personalized customer engagement with our platform.',
  //          elevatorPitch: 'Our platform helps Marketing Specialists deliver personalized engagement at scale, ensuring meaningful connections that enhance loyalty and drive revenue.',
  //          landingPage: '<h1>Marketing Specialists, want personalized engagement at scale?</h1><p>Our platform lets you segment and engage customers effectively.</p><h2>Here\'s how we help:</h2><ul><li>Deliver personalized experiences</li><li>Boost customer loyalty</li><li>Drive meaningful interactions</li></ul><button>Start Engaging Now</button>'
  //        },
  //        {
  //          character: 'Customer Success Manager',
  //          want: 'better customer satisfaction metrics',
  //          externalProblem: 'Difficult to track customer satisfaction trends',
  //          internalProblem: 'Concerned about client retention rates',
  //          philosophicalProblem: 'Customer success should be easily measurable',
  //          empathyStatement: 'We know how critical customer satisfaction is to retention.',
  //          authorityStatement: 'Our hub offers real-time customer satisfaction insights.',
  //          plan: 'Provide satisfaction tracking and insights on engagement trends',
  //          callToActions: 'Improve customer satisfaction with us',
  //          avoidFailure: 'Increased churn and reduced customer loyalty',
  //          successLooksLike: 'Improved customer satisfaction and retention rates',
  //          oneLiner: 'Customer Success Managers improve satisfaction with our tracking tools.',
  //          elevatorPitch: 'We enable Customer Success Managers to track satisfaction trends, helping improve client retention and foster stronger customer relationships.',
  //          landingPage: '<h1>Customer Success Managers, ready to boost satisfaction?</h1><p>Our platform offers tools for tracking and improving customer satisfaction.</p><h2>Here\'s how we help:</h2><ul><li>Monitor customer satisfaction</li><li>Enhance retention rates</li><li>Build loyal relationships</li></ul><button>Get Started Now</button>'
  //        }
  //      ]
  //    },
  //    links: {
  //      documentation: "https://docs.customer-engagement-hub.com",
  //      video: "https://videos.customer-engagement-hub.com/overview"
  //    }
  //  }    
  //];
  //
  //
  //await db.insert(items).values(
  //  mockItems.map(acc => ({
  //    name: acc.name,
  //    type: acc.type,
  //    description: acc.description,
  //    linkedService: acc.linked_service,
  //    linkedAccelerators: acc.linked_accelerators,
  //    status: acc.status,
  //    effort: acc.effort,
  //    timesUsed: acc.times_used,
  //    createdDate: new Date(),
  //    createdBy: 'system',
  //    storyBranding: JSON.stringify(acc.story_branding),
  //    links: JSON.stringify(acc.links)
  //  }))
  //);
}
