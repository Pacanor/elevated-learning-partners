export interface PortfolioProject {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  client: string;
  summary: string;
  role: string;
  impact: string[];
  tools: string[];
  cover: string;
  slides: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "faculty-support-hub",
    title: "AI-Powered Faculty Digital Support Hub",
    shortTitle: "Faculty Support Hub",
    category: "AI workflow system",
    client: "Higher education institution",
    summary:
      "A multi-agent support system that classifies faculty requests, routes each request to the right team and creates a searchable record for quality improvement.",
    role: "AI workflow architecture, decision logic, specialist routing, quality checks and analytics logging.",
    impact: [
      "95%+ classification accuracy",
      "Instant routing to specialist teams",
      "Three support teams coordinated in one workflow",
    ],
    tools: ["AI classification", "Workflow automation", "QA analytics"],
    cover: "/portfolio/slide-08.png",
    slides: ["/portfolio/slide-08.png", "/portfolio/slide-09.png"],
  },
  {
    id: "small-business-automation",
    title: "AI Automation for Small Business",
    shortTitle: "Small Business Automation",
    category: "AI assistant and automation",
    client: "Personal training and fitness business",
    summary:
      "A connected automation system for personalised client responses, reminders, scheduling and progress tracking, designed to remove repetitive administration.",
    role: "End-to-end automation architecture, AI response generation, reminder scheduling and progress tracking.",
    impact: [
      "Responses delivered in under two minutes",
      "12+ administrative hours saved each week",
      "Threefold increase in client capacity",
    ],
    tools: ["Google Forms", "Zapier", "Python", "Calendly"],
    cover: "/portfolio/slide-10.png",
    slides: ["/portfolio/slide-10.png", "/portfolio/slide-11.png"],
  },
  {
    id: "ai-course-development",
    title: "AI-Powered Instructional Design and Course Development",
    shortTitle: "AI Course Development",
    category: "Instructional design",
    client: "Higher education",
    summary:
      "An accessible, asynchronous course that makes artificial intelligence practical for non-technical undergraduate learners.",
    role: "Course architecture, UDL-led design, interactive modules, faculty toolkit, AI tutor and learning analytics.",
    impact: [
      "40% increase in student satisfaction",
      "35% reduction in instructor grading time",
      "Full alignment with accessibility requirements",
    ],
    tools: ["Blackboard Ultra", "H5P", "Canva", "ChatPDF"],
    cover: "/portfolio/slide-13.png",
    slides: ["/portfolio/slide-13.png", "/portfolio/slide-14.png", "/portfolio/slide-15.png"],
  },
  {
    id: "un-sdg-zero-hunger",
    title: "United Nations Grant: SDG 2, Zero Hunger",
    shortTitle: "SDG 2 Learning Programme",
    category: "Sustainability education",
    client: "Higher education institution",
    summary:
      "A competency-based online curriculum that helps learners understand food waste and take practical action in their communities.",
    role: "Backward design, multimedia learning, culturally relevant scenarios and scalable course architecture.",
    impact: [
      "Authentic, action-led learning",
      "Designed for UAE learners",
      "Scalable for partner institutions",
    ],
    tools: ["Articulate Rise 360", "Canva", "Jeopardy Labs"],
    cover: "/portfolio/slide-16.png",
    slides: ["/portfolio/slide-16.png", "/portfolio/slide-17.png", "/portfolio/slide-18.png"],
  },
  {
    id: "purchase-card-compliance",
    title: "Gamified Purchase Card Compliance Training",
    shortTitle: "Gamified Compliance Training",
    category: "Compliance learning",
    client: "US government agency",
    summary:
      "Scenario-based eLearning that lets employees practise responsible purchase-card decisions in a safe, engaging environment.",
    role: "Course architecture, branching simulations, gamification and assessment design.",
    impact: [
      "Stronger compliance knowledge",
      "Better real-world decision making",
      "Scalable across departments and locations",
    ],
    tools: ["Lectora", "Adobe eLearning Suite", "Unity", "Moodle"],
    cover: "/portfolio/slide-19.png",
    slides: ["/portfolio/slide-19.png", "/portfolio/slide-20.png"],
  },
  {
    id: "accessibility-compliance",
    title: "Digital Learning Accessibility and Course Compliance",
    shortTitle: "Accessibility and Compliance",
    category: "Accessibility review",
    client: "Higher education and corporate training",
    summary:
      "A structured accessibility review and remediation initiative for digital learning materials, aligned with WCAG guidance and assistive technology testing.",
    role: "PDF tagging, content review, screen-reader testing and practical remediation guidance.",
    impact: [
      "More inclusive learning materials",
      "Standards-aligned remediation",
      "Repeatable review process",
    ],
    tools: ["WAVE", "JAWS", "NVDA", "VoiceOver", "Acrobat Pro"],
    cover: "/portfolio/accessibility-preview.svg",
    slides: ["/portfolio/accessibility-preview.svg"],
  },
  {
    id: "learning-analytics",
    title: "Learning Analytics and Data-Informed Decision Support",
    shortTitle: "Learning Analytics",
    category: "Course analytics",
    client: "Online higher education",
    summary:
      "A redesign of an asynchronous statistics course using student feedback and Blackboard analytics to improve clarity, accessibility and engagement.",
    role: "Instructional design, data analysis, learner feedback review and course revision.",
    impact: [
      "19% more on-time submissions",
      "55% more active discussion engagement",
      "Clearer, rubric-aligned final projects",
    ],
    tools: ["Blackboard Analytics", "Google Forms", "Rise 360", "H5P"],
    cover: "/portfolio/analytics-preview.svg",
    slides: ["/portfolio/analytics-preview.svg"],
  },
  {
    id: "content-curation",
    title: "Smart Content Curation for Educators",
    shortTitle: "Smart Content Curation",
    category: "Faculty development",
    client: "University faculty",
    summary:
      "A blended professional development programme on OER, public-domain materials, copyright-aware practice and accessible course design.",
    role: "Workshop design, content development, facilitation and practical curation tools.",
    impact: [
      "Stronger copyright awareness",
      "Better OER discovery skills",
      "Practical frameworks for accessible curation",
    ],
    tools: ["Canva", "D2L LMS", "OER repositories"],
    cover: "/portfolio/content-curation-preview.svg",
    slides: ["/portfolio/content-curation-preview.svg"],
  },
];
