//import { db, accelerators } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  //return Response.json({
  //  message: 'Uncomment to seed data after DB is set up.'
  //});

  //const mockAccelerators = [
  //  { 
  //    id: 1, 
  //    name: 'Cloud Foundations', 
  //    offerings: ['Core Cloud'], 
  //    status: 'active', 
  //    effort: 50.00, 
  //    times_used: 10, 
  //    story_branding: {
  //      character: 'Cloud Architect',
  //      problem: 'Unclear cloud adoption strategy',
  //      guide: 'Cloud Strategy Consultant',
  //      plan: 'Develop a tailored cloud adoption roadmap',
  //      callToAction: 'Start your cloud journey with us',
  //      failureAvoidance: 'Wasted resources and misaligned business goals',
  //      success: 'Seamless cloud integration and enhanced business agility'
  //    },
  //    marketing: {
  //      oneLiner: 'Cloud Architects gain clarity in their cloud adoption strategy with our guidance.',
  //      elevatorPitch: 'We help Cloud Architects who face unclear cloud adoption strategies. By developing a tailored cloud adoption roadmap, we guide them towards seamless cloud integration and enhanced business agility, avoiding wasted resources and misaligned business goals.',
  //      landingPage: '<h1>Cloud Architects, are you struggling with unclear cloud adoption strategies?</h1><p>Meet your Cloud Strategy Consultant who will help you develop a tailored cloud adoption roadmap.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Start your cloud journey with us</li><li>Avoid wasted resources and misaligned goals</li><li>Achieve seamless cloud integration</li></ul><button>Get Started Now</button>'
  //    },
  //    links: {
  //      documentation: "https://docs.cloud-foundations.com",
  //      video: "https://videos.cloud-foundations.com/intro"
  //    }
  //  },
  //  { 
  //    id: 2, 
  //    name: 'DR Migrate', 
  //    offerings: ['Discovery', 'Datacentre', 'Polycloud'], 
  //    status: 'active', 
  //    effort: 75.00, 
  //    times_used: 15, 
  //    story_branding: {
  //      character: 'IT Manager',
  //      problem: 'Data loss risk during migration',
  //      guide: 'Disaster Recovery Specialist',
  //      plan: 'Implement a comprehensive migration strategy',
  //      callToAction: 'Ensure your data is safe during migration',
  //      failureAvoidance: 'Potential data loss and compliance issues',
  //      success: 'A smooth migration process with zero data loss'
  //    },
  //    marketing: {
  //      oneLiner: 'IT Managers secure their data during migration with our proven strategies.',
  //      elevatorPitch: 'We assist IT Managers who worry about data loss risks during migration. By implementing a comprehensive migration strategy, we ensure their data is safe, avoiding potential data loss and compliance issues for a smooth migration process.',
  //      landingPage: '<h1>IT Managers, are you worried about data loss during migration?</h1><p>Meet your Disaster Recovery Specialist who will implement a comprehensive migration strategy to ensure your data is safe.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Secure your data during migration</li><li>Avoid data loss and compliance issues</li><li>Achieve a smooth migration process</li></ul><button>Get Started Now</button>'
  //    },
  //    links: {
  //      documentation: "https://docs.drmigrate.com",
  //      video: "https://videos.drmigrate.com/demo"
  //    }
  //  },
  //  { 
  //    id: 3, 
  //    name: 'Sentinel Migration', 
  //    offerings: ['DevSecOps', 'Secure by Design'], 
  //    status: 'active', 
  //    effort: 60.00, 
  //    times_used: 8, 
  //    story_branding: {
  //      character: 'Security Officer',
  //      problem: 'Vulnerabilities in migration processes',
  //      guide: 'DevSecOps Consultant',
  //      plan: 'Integrate security practices into DevOps',
  //      callToAction: 'Secure your migration with our expertise',
  //      failureAvoidance: 'Security breaches and compliance failures',
  //      success: 'A secure migration process with embedded security practices'
  //    },
  //    marketing: {
  //      oneLiner: 'Security Officers fortify their migration processes with our DevSecOps expertise.',
  //      elevatorPitch: 'We help Security Officers concerned about vulnerabilities in migration processes. By integrating security practices into DevOps, we guide them to a secure migration process, avoiding security breaches and compliance failures.',
  //      landingPage: '<h1>Security Officers, are you concerned about vulnerabilities in your migration processes?</h1><p>Meet your DevSecOps Consultant who will integrate security practices into your DevOps.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Secure your migration with our expertise</li><li>Avoid security breaches and compliance failures</li><li>Achieve a secure migration process</li></ul><button>Get Started Now</button>'
  //    },
  //    links: {
  //      documentation: "https://docs.sentinel-migration.com",
  //      video: "https://videos.sentinel-migration.com/overview"
  //    }
  //  },
  //  { 
  //    id: 4, 
  //    name: 'Vision Workshop', 
  //    offerings: ['Cloud strategy'], 
  //    status: 'inactive', 
  //    effort: 30.00, 
  //    times_used: 5, 
  //    story_branding: {
  //      character: 'Business Executive',
  //      problem: 'Unclear vision for cloud adoption',
  //      guide: 'Cloud Strategy Advisor',
  //      plan: 'Facilitate a vision-setting workshop',
  //      callToAction: 'Clarify your cloud vision today',
  //      failureAvoidance: 'Missed business opportunities and slow growth',
  //      success: 'A clear, actionable cloud strategy'
  //    },
  //    marketing: {
  //      oneLiner: 'Business Executives clarify their cloud vision through our workshops.',
  //      elevatorPitch: 'We help Business Executives who struggle with unclear visions for cloud adoption. By facilitating a vision-setting workshop, we guide them to a clear, actionable cloud strategy, avoiding missed business opportunities and slow growth.',
  //      landingPage: '<h1>Business Executives, are you unsure of your cloud adoption vision?</h1><p>Meet your Cloud Strategy Advisor who will facilitate a vision-setting workshop to clarify your cloud vision.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Clarify your cloud vision today</li><li>Avoid missed opportunities and slow growth</li><li>Achieve a clear, actionable cloud strategy</li></ul><button>Get Started Now</button>'
  //    },
  //    links: {
  //      documentation: "https://docs.vision-workshop.com"
  //    }
  //  },
  //  { 
  //    id: 5, 
  //    name: 'Azure Landing Zone', 
  //    offerings: ['Platform', 'Architecture'], 
  //    status: 'active', 
  //    effort: 80.00, 
  //    times_used: 20, 
  //    story_branding: {
  //      character: 'Cloud Engineer',
  //      problem: 'Complex Azure setup and architecture',
  //      guide: 'Azure Expert',
  //      plan: 'Design and implement an optimal Azure landing zone',
  //      callToAction: 'Simplify your Azure architecture today',
  //      failureAvoidance: 'Inefficient cloud utilization and high costs',
  //      success: 'A streamlined Azure environment that maximizes resources'
  //    },
  //    marketing: {
  //      oneLiner: 'Cloud Engineers streamline their Azure setups with our expert design.',
  //      elevatorPitch: 'We help Cloud Engineers facing complex Azure setups. By designing and implementing an optimal Azure landing zone, we simplify their architecture, avoiding inefficient cloud utilization and high costs for a streamlined environment.',
  //      landingPage: '<h1>Cloud Engineers, is your Azure setup overly complex?</h1><p>Meet your Azure Expert who will design and implement an optimal Azure landing zone to simplify your architecture.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Simplify your Azure architecture today</li><li>Avoid inefficient utilization and high costs</li><li>Achieve a streamlined Azure environment</li></ul><button>Get Started Now</button>'
  //    },
  //    links: {
  //      documentation: "https://docs.azure-landing-zone.com",
  //      video: "https://videos.azure-landing-zone.com/intro"
  //    }
  //  },
  //  { 
  //    id: 6, 
  //    name: 'AWS Landing Zone', 
  //    offerings: ['Platform', 'Architecture'], 
  //    status: 'archived', 
  //    effort: 70.00, 
  //    times_used: 18, 
  //    story_branding: {
  //      character: 'AWS Administrator',
  //      problem: 'Inconsistent AWS environments across teams',
  //      guide: 'AWS Solutions Architect',
  //      plan: 'Standardize and optimize AWS accounts',
  //      callToAction: 'Achieve AWS consistency and efficiency',
  //      failureAvoidance: 'Configuration drift and security risks',
  //      success: 'Consistent and secure AWS environments'
  //    },
  //    marketing: {
  //      oneLiner: 'AWS Administrators achieve consistent environments with our help.',
  //      elevatorPitch: 'We assist AWS Administrators struggling with inconsistent AWS environments across teams. By standardizing and optimizing AWS accounts, we guide them to consistent and secure environments, avoiding configuration drift and security risks.',
  //      landingPage: '<h1>AWS Administrators, are your environments inconsistent?</h1><p>Meet your AWS Solutions Architect who will standardize and optimize your AWS accounts for consistency.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Achieve AWS consistency and efficiency</li><li>Avoid configuration drift and security risks</li><li>Ensure secure AWS environments</li></ul><button>Get Started Now</button>'
  //    },
  //    links: {
  //      documentation: "https://docs.aws-landing-zone.com",
  //      video: "https://videos.aws-landing-zone.com/intro"
  //    }
  //  },
  //  { 
  //    id: 7, 
  //    name: 'AEP', 
  //    offerings: ['Automation', 'CICD'], 
  //    status: 'active', 
  //    effort: 55.00, 
  //    times_used: 12, 
  //    story_branding: {
  //      character: 'DevOps Team',
  //      problem: 'Slow and manual software deployment',
  //      guide: 'Automation Specialist',
  //      plan: 'Implement CI/CD practices',
  //      callToAction: 'Automate your deployment pipeline now',
  //      failureAvoidance: 'Deployment delays and quality issues',
  //      success: 'Rapid, reliable software delivery'
  //    },
  //    marketing: {
  //      oneLiner: 'DevOps Teams accelerate software delivery with our automation expertise.',
  //      elevatorPitch: 'We support DevOps Teams facing slow and manual software deployments. By implementing CI/CD practices, we guide them to rapid, reliable software delivery, avoiding delays and quality issues.',
  //      landingPage: '<h1>DevOps Teams, are your deployments slow and manual?</h1><p>Meet your Automation Specialist who will help you implement CI/CD practices.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Automate your deployment pipeline now</li><li>Avoid delays and quality issues</li><li>Achieve rapid, reliable software delivery</li></ul><button>Get Started Now</button>'
  //    },
  //    links: {
  //      documentation: "https://docs.aep.com",
  //      video: "https://videos.aep.com/overview"
  //    }
  //  },
  //  { 
  //    id: 8, 
  //    name: 'Cost Automation', 
  //    offerings: ['FinOps'], 
  //    status: 'active', 
  //    effort: 40.00, 
  //    times_used: 9, 
  //    story_branding: {
  //      character: 'Finance Officer',
  //      problem: 'High cloud spend without visibility',
  //      guide: 'FinOps Expert',
  //      plan: 'Implement cost tracking and optimization tools',
  //      callToAction: 'Gain visibility into your cloud spending',
  //      failureAvoidance: 'Uncontrolled costs and budget overruns',
  //      success: 'Optimized cloud costs with full visibility'
  //    },
  //    marketing: {
  //      oneLiner: 'Finance Officers gain visibility into their cloud spending with our expertise.',
  //      elevatorPitch: 'We help Finance Officers struggling with high cloud spend without visibility. By implementing cost tracking and optimization tools, we guide them to optimized cloud costs, avoiding uncontrolled costs and budget overruns.',
  //      landingPage: '<h1>Finance Officers, is your cloud spending out of control?</h1><p>Meet your FinOps Expert who will implement cost tracking and optimization tools for visibility.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Gain visibility into your cloud spending</li><li>Avoid uncontrolled costs and budget overruns</li><li>Achieve optimized cloud costs</li></ul><button>Get Started Now</button>'
  //    },
  //    links: {
  //      documentation: "https://docs.cost-automation.com",
  //      video: "https://videos.cost-automation.com/overview"
  //    }
  //  },
  //  { 
  //    id: 9, 
  //    name: 'Green Gauge', 
  //    offerings: ['Carbon Reduction'], 
  //    status: 'active', 
  //    effort: 20.00, 
  //    times_used: 3, 
  //    story_branding: {
  //      character: 'Sustainability Officer',
  //      problem: 'High carbon emissions from IT infrastructure',
  //      guide: 'Sustainability Consultant',
  //      plan: 'Implement carbon reduction strategies',
  //      callToAction: 'Start reducing your carbon footprint today',
  //      failureAvoidance: 'Negative impact on the environment and brand reputation',
  //      success: 'Lower carbon emissions and enhanced corporate responsibility'
  //    },
  //    marketing: {
  //      oneLiner: 'Sustainability Officers reduce their carbon footprint with our strategies.',
  //      elevatorPitch: 'We assist Sustainability Officers concerned about high carbon emissions from IT infrastructure. By implementing carbon reduction strategies, we guide them to lower emissions, avoiding negative environmental impacts and enhancing corporate responsibility.',
  //      landingPage: '<h1>Sustainability Officers, are your carbon emissions too high?</h1><p>Meet your Sustainability Consultant who will help you implement effective carbon reduction strategies.</p><h2>Here\'s how we\'ll help:</h2><ul><li>Start reducing your carbon footprint today</li><li>Avoid negative impacts on the environment and brand</li><li>Enhance corporate responsibility</li></ul><button>Get Started Now</button>'
  //    },
  //    links: {
  //      documentation: "https://docs.green-gauge.com",
  //      video: "https://videos.green-gauge.com/overview"
  //    }
  //  }
  //];
  //
  //
  //await db.insert(accelerators).values(
  //  mockAccelerators.map(acc => ({
  //    id: acc.id,
  //    name: acc.name,
  //    offerings: JSON.stringify(acc.offerings),
  //    status: acc.status,
  //    effort: acc.effort,
  //    times_used: acc.times_used,
  //    createdDate: new Date(),
  //    createdBy: 'system',
  //    timesUsed: acc.times_used,
  //    story_branding: JSON.stringify(acc.story_branding),
  //    marketing: JSON.stringify(acc.marketing),
  //    links: JSON.stringify(acc.links)
  //  }))
  //);
}
