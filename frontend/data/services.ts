export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  longDescription: string;
  features: string[];
  benefits: string[];
}

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies',
    icon: '🌐',
    longDescription: 'We build robust, scalable, and high-performance web applications tailored to your business needs. Using the latest technologies like Next.js, React, and Node.js, we ensure your digital presence is not only visually stunning but also technically superior.',
    features: [
      'Custom Web Application Development',
      'Responsive & Mobile-First Design',
      'Progressive Web Apps (PWA)',
      'CMS Development & Integration',
      'Maintenance & Support'
    ],
    benefits: [
      'Enhanced user experience',
      'Improved performance and speed',
      'Scalable architecture for growth',
      'SEO-friendly structure'
    ]
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications',
    icon: '📱',
    longDescription: 'Reach your customers wherever they are with our cutting-edge mobile application development services. We create seamless, intuitive, and engaging mobile experiences for both iOS and Android platforms using React Native and native technologies.',
    features: [
      'iOS & Android App Development',
      'Cross-Platform Solutions (React Native)',
      'UI/UX Design for Mobile',
      'App Store Optimization (ASO)',
      'App Maintenance & Updates'
    ],
    benefits: [
      'Wider market reach',
      'Direct marketing channel',
      'Improved customer engagement',
      'Brand recognition'
    ]
  },
  {
    id: 'domain-hosting',
    title: 'Domain & Hosting',
    description: 'Complete domain and hosting solutions',
    icon: '🌍',
    longDescription: 'Secure your digital identity with our reliable domain registration and high-performance hosting services. We provide secure, fast, and scalable hosting environments to ensure your website is always up and running smoothly.',
    features: [
      'Domain Name Registration',
      'SSL Certificate Installation',
      'Cloud Hosting Services',
      'Dedicated Server Solutions',
      '24/7 Technical Support'
    ],
    benefits: [
      '99.9% Uptime Guarantee',
      'Enhanced Security',
      'Fast Page Load Speeds',
      'Hassle-free Management'
    ]
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    description: 'Professional branding and visual identity',
    icon: '🎨',
    longDescription: 'Make a lasting impression with our creative graphics design services. From logos to marketing materials, our designs communicate your brand\'s message effectively and aesthetically.',
    features: [
      'Logo Design & Branding',
      'Brochure & Flyer Design',
      'Social Media Graphics',
      'Product Packaging Design',
      'Infographics & Illustrations'
    ],
    benefits: [
      'Strong Brand Identity',
      'Professional Appearance',
      'Increased Engagement',
      'Clear Communication'
    ]
  },
  {
    id: 'video-production',
    title: 'Video Production',
    description: 'High-quality video content creation',
    icon: '🎬',
    longDescription: 'Tell your story through compelling video content. Our video production team handles everything from scriptwriting to post-production, delivering high-quality videos that captivate your audience.',
    features: [
      'Promotional Videos',
      'Corporate Explainers',
      'Social Media Reels & Shorts',
      'Product Demos',
      'Video Editing & Post-Production'
    ],
    benefits: [
      'Higher Conversion Rates',
      'Improved SEO',
      'Emotional Connection',
      'Versatile Content'
    ]
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    description: 'Strategic social media campaigns',
    icon: '📊',
    longDescription: 'Grow your brand presence and engage with your audience through our strategic social media marketing services. We create data-driven campaigns that drive awareness, engagement, and conversions.',
    features: [
      'Social Media Strategy',
      'Content Creation & Curation',
      'Community Management',
      'Paid Social Advertising',
      'Analytics & Reporting'
    ],
    benefits: [
      'Increased Brand Awareness',
      'Targeted Audience Reach',
      'Improved Customer Insights',
      'Cost-Effective Marketing'
    ]
  },
  {
    id: '3d-animation',
    title: '3D Animation',
    description: 'Stunning 3D animations and visual effects',
    icon: '✨',
    longDescription: 'Bring your ideas to life with our immersive 3D animation services. Whether for product visualization, architectural walkthroughs, or creative storytelling, we create stunning visual experiences.',
    features: [
      '3D Modeling & Rendering',
      'Product Visualization',
      'Architectural Visualization',
      'Character Animation',
      'Motion Graphics'
    ],
    benefits: [
      'Visual Clarity',
      'Interactive Experience',
      'Modern Appeal',
      'Detailed Presentation'
    ]
  },
  {
    id: 'seo-strategy',
    title: 'SEO & Strategy',
    description: 'Data-driven SEO and digital marketing',
    icon: '🚀',
    longDescription: 'Improve your visibility and ranking on search engines with our comprehensive SEO strategies. We use ethical, white-hat techniques to drive organic traffic and sustainable growth for your business.',
    features: [
      'Keyword Research & Strategy',
      'On-Page & Off-Page SEO',
      'Technical SEO Audits',
      'Content Marketing Strategy',
      'Local SEO Optimization'
    ],
    benefits: [
      'Higher Search Rankings',
      'Increased Organic Traffic',
      'Better User Experience',
      'Long-term ROI'
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Complete online store development',
    icon: '🛒',
    longDescription: 'Launch and grow your online store with our robust e-commerce solutions. We build secure, user-friendly, and conversion-optimized platforms that help you sell more effectively.',
    features: [
      'Custom E-commerce Development',
      'Payment Gateway Integration',
      'Inventory Management Systems',
      'Shopping Cart Optimization',
      'Security & Fraud Protection'
    ],
    benefits: [
      'Global Reach',
      '24/7 Availability',
      'Lower Operational Costs',
      'Customer Data Insights'
    ]
  },
  {
    id: 'api-development',
    title: 'API Development',
    description: 'Custom API development and integrations',
    icon: '🔌',
    longDescription: 'Connect your systems and streamline your operations with our custom API development services. We build secure, scalable, and documented APIs that enable seamless data exchange between applications.',
    features: [
      'RESTful API Development',
      'GraphQL API Development',
      'Third-party Integrations',
      'API Documentation',
      'API Security & Testing'
    ],
    benefits: [
      'Improved Efficiency',
      'Seamless Integration',
      'Scalability',
      'Automation'
    ]
  },
  {
    id: 'google-business',
    title: 'Google Business',
    description: 'Local SEO and Google My Business management',
    icon: '📍',
    longDescription: 'Dominate your local market with our Google Business Profile management services. We optimize your listing to ensure customers find you first when searching locally.',
    features: [
      'Profile Setup & Verification',
      'Review Management',
      'Post & Offer Updates',
      'Local Citation Building',
      'Performance Insights'
    ],
    benefits: [
      'Increased Local Visibility',
      'Trust & Credibility',
      'Higher Foot Traffic',
      'Direct Customer Interaction'
    ]
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'End-to-end digital transformation consulting',
    icon: '💡',
    longDescription: 'Future-proof your business with our digital transformation consulting. We help you identify opportunities, optimize processes, and implement the right technologies to drive innovation.',
    features: [
      'Digital Maturity Assessment',
      'Technology Roadmap Planning',
      'Process Automation',
      'Cloud Migration Strategy',
      'Change Management'
    ],
    benefits: [
      'Operational Efficiency',
      'Competitive Advantage',
      'Data-Driven Decision Making',
      'Innovation Culture'
    ]
  }
];
