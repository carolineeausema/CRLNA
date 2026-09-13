export type Track = "Engineering" | "Design" | "Creative";

export type Diagram = {
  title?: string;
  chart: string;
};

export type Project = {
  slug: string;
  year: string;
  org: string;
  track: Track;
  title: string;
  description: string;
  stack: string;
  impact: string;
  eyebrow: string;
  oneLiner: string;
  statLabel: string;
  stat: string;
  role: string;
  team: string;
  problem: string;
  work: string;
  different: string;
  confidentialityNote?: string;
  diagrams?: Diagram[];
  link?: string;
  heroImage?: string;
  detailShots?: DetailShot[];
  differentImage?: string;
};

export type DetailShot = {
  src: string;
  label: string;
};

export type Fact = {
  label: string;
  value: string;
};

export type Quest = {
  status: string;
  date: string;
  title: string;
  domain: string;
  body: string;
  label: string;
  caption?: string;
  link?: string;
  links?: { label: string; href: string; type: "press" | "process" }[];
  photo: string;
  facts: Fact[];
};

function dateSortValue(date: string) {
  if (/ongoing/i.test(date)) return Infinity;
  const match = date.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

export const availability = "Open to new roles";

const projectsData: Project[] = [
  {
    slug: "federal-account",
    year: "2025",
    org: "Deloitte",
    track: "Engineering",
    title: "Federal Client",
    description: "Documentation and systems design for tax access serving 36M+ business users",
    stack: "AWS / PlantUML / Visio / GitHub / Figma / Markdown",
    impact: "36M+",
    eyebrow: "Deloitte / Systems Engineer / Engineering",
    oneLiner: "A system giving 36M+ business users, with 29K daily active users, secure digital access to their tax information, documented through the user flows, sequence diagrams, and architecture diagrams that guided how it was built.",
    statLabel: "Business users",
    stat: "36M+",
    role: "Systems Engineer",
    team: "Deloitte, Architecture Design team",
    problem: "A notoriously opaque government process had to become something a small business owner could actually use without help.",
    work: "I designed and documented client releases through user flows, sequence diagrams, API specifications, and architecture diagrams. I mapped the logic behind different transaction types, like generating and confirming PINs, across business entity categories such as partnerships, exempt organizations, and government entities, each pulling from its own API, and used return codes to trace what had actually happened in a transaction when something failed. I also facilitated team meetings and wrote weekly, biweekly, and monthly status reports to keep a program of thousands of practitioners aligned with stakeholder reporting requirements.",
    different: "The gap between what was compliant and what was actually usable didn't show up until later than it should have. That kind of gap is easier to notice from outside the room than from inside the discussions I was documenting. Earlier user testing with actual small business owners, not just internal stakeholders, would have caught it sooner.",
    confidentialityNote: "Built under federal client confidentiality. Shown here through description and illustrative diagrams, not the actual interface or government systems involved.",
    diagrams: [
      {
        title: "User flow",
        chart: `flowchart LR
    A[Business owner needs tax info] --> B{Old process}
    B --> C[Phone call to agency]
    B --> D[Physical mail request]
    C --> E[Long wait / limited hours]
    D --> F[Days to weeks delay]

    LEGACY[(Legacy backend: C / COBOL mainframe systems)] -.-> C
    LEGACY -.-> D

    A --> G{New process}
    G --> H[Secure digital account]
    H --> I[Self-serve access to tax records]
    I --> J[Business gets answer in minutes]

    H -.must remain compatible with.-> LEGACY
    I -.must remain compatible with.-> LEGACY`,
      },
      {
        title: "Sequence diagram: transaction logic (my focus area)",
        chart: `flowchart LR
    A[Request Type] --> B{Entity type}
    B --> C[Partnership]
    B --> D[Exempt organization]
    B --> E[Government entity]
    C --> F[Call entity-specific API]
    D --> F
    E --> F
    F --> G{Return code}
    G -->|200| H[Transaction logged as successful]
    G -->|Error| I[Trace originating API]
    I --> J[Determine whether call originated from Request PIN or Confirm PIN]
    H --> K[Status tracked for cross-team visibility]
    J --> K

    subgraph "My focus area"
    F
    G
    H
    I
    J
    K
    end`,
      },
    ],
  },
  {
    slug: "pathfinder",
    year: "2025",
    org: "Deloitte",
    track: "Engineering",
    title: "Pathfinder: AI Compliance & Security Tool",
    description: "Full-stack compliance monitoring built against NIST CSF 2.0, extensible to additional frameworks",
    stack: "Next.js / AWS / Python / SQL / Figma / Docker",
    impact: "Shipped",
    eyebrow: "Deloitte / Software Engineer / Engineering",
    oneLiner: "A tool that keeps compliance monitoring current and searchable, built first against the NIST CSF 2.0 framework and designed to expand to other regulatory frameworks over time.",
    statLabel: "Status",
    stat: "Shipped",
    role: "Software Engineer",
    team: "Deloitte, Cyber AI team",
    problem: "Large documentation corpora change constantly, and compliance teams needed a way to monitor them against an initial cybersecurity framework, NIST CSF 2.0, in a system that could grow to support other frameworks later without being rebuilt.",
    work: "I worked as a software engineer on a product team, delivering end to end features across the front end and back end, fixing bugs, reviewing pull requests, and pushing rapid UI updates to keep pace with evolving data models while keeping the interface stable. I led quality and modernization efforts, including a migration to Amazon S3, SonarQube-driven code improvements, and front end unit testing up to about 85% coverage. I also implemented and validated UAT feedback through to release.",
    different: "I would establish a stronger evaluation set before expanding the monitoring surface. The product got useful quickly, and its quality bar should have been made explicit sooner. I would also get a UX/UI designer involved earlier. The product was useful, but it could have been more usable.",
    confidentialityNote: "Built under client confidentiality. Shown here through description and illustrative UI and flow visuals rather than the actual product or client data.",
    detailShots: [
      { src: "/work/pathfinder-01-overview.png", label: "Compliance monitoring overview" },
      { src: "/work/pathfinder-02-intake.png", label: "Document intake" },
    ],
    diagrams: [
      {
        title: "NIST CSF 2.0 compliance monitoring flow",
        chart: `flowchart LR
    A[Client documentation corpus] --> B[AI parsing layer]
    B --> C{Is this doc current?}
    C -->|Yes| D[No action needed]
    C -->|No / stale| E[Flagged for update]

    B --> F[Tailored monitoring rules]
    F --> G{Client regulatory domain}
    G --> H[Domain-specific compliance checks]

    E --> I[Compliance team notified]
    H --> I
    I --> J[Client stays audit-ready]

    style E fill:#e2e4e6,stroke:#c8522a,color:#1b1d1f
    style J fill:#b5b89a,stroke:#8a8c72,color:#1b1d1f`,
      },
      {
        title: "Architecture-level view (my focus area)",
        chart: `flowchart TB
    UI[Frontend — Next.js] --> API[Backend — Python / AWS]
    API --> AI[AI parsing / flagging engine]

    subgraph "My focus area"
    UI
    API
    end`,
      },
    ],
  },
  {
    slug: "state-child-welfare",
    year: "2026",
    org: "Deloitte",
    track: "Design",
    title: "State Child Welfare Referral System",
    description: "UX research and product design for a closed-loop referral system connecting families to community care",
    stack: "Product design / Systems design / User Research",
    impact: "Statewide",
    eyebrow: "Deloitte / UX Researcher & Systems Designer / Design",
    oneLiner: "A closed-loop referral system designed so families who don't meet the threshold for a child abuse case still get connected to the community resources they actually need, with the loop closed so those connections can be tracked.",
    statLabel: "Reach",
    stat: "Statewide",
    role: "UX Researcher & Systems Designer, Product Management",
    team: "Cross-functional public-sector team, with systems architecture work contributed through a multi-state referral consortium",
    problem: "Many families who contact the child welfare system don't meet the threshold for a child abuse case, but still need help. The existing process had no reliable way to connect them to community resources or to track whether that connection actually happened.",
    work: "I conducted user experience research on child welfare processes, including journey maps and personas, and rapidly prototyped concepts for multiple pilots. I authored and maintained the research documentation and prepared visual stories to support stakeholder review. I contributed to systems architecture design for the closed-loop referral system as part of a multi-state consortium work stream, developing prototypes with applicability beyond this state alone. I also supported preparation for a state executive lab by shaping the technical and logistical details needed for rapid prototyping, and translated research findings into structured, sprint-ready user stories across multiple workstreams and epics, keeping sprint planning aligned with what the research actually found.",
    different: "I would bring more frontline voices into the earliest systems conversations. The strongest decisions came from direct experience with hotline callers and case workers, and they deserved even more influence from the start.",
    confidentialityNote: "Built under state client confidentiality. Shown here through description and an illustrative flow diagram rather than the actual product or internal systems involved.",
    detailShots: [
      { src: "/work/referral-journey-map.png", label: "Referral journey map" },
    ],
    diagrams: [
      {
        title: "Referral journey: hotline to community resource",
        chart: `flowchart LR
    A[Report initiated] --> B{Reporting channel}
    B --> C[Hotline]
    B --> D[Self-service portal]
    C --> E[Hotline worker conducts intake call]
    D --> E
    E --> F[Identify individuals and roles]
    E --> G[Collect situation narrative]
    F --> H{Case designation}
    G --> H
    H --> I[CPS case]
    H --> J[GPS case]
    H --> K[Community response case]

    I --> L[Allegations added per alleged perpetrator]
    J --> L
    L --> M[Referral submitted and transmitted]
    M --> N[Case enters child welfare system for CPS / GPS casework]

    K --> O[Routed to county well-being unit]
    O --> P[Unit contacts family and child]
    P --> Q[Conduct assessment / needs determination]
    Q --> R[Warm handoff to community services]
    R --> S[Family supported with community resources]

    subgraph "New in this redesign"
    K
    O
    P
    Q
    R
    S
    end`,
      },
    ],
  },
  {
    slug: "distributed-energy-interconnection",
    year: "2023",
    org: "West Monroe",
    track: "Engineering",
    title: "Public Utility Distributed Energy Interconnection Platform",
    description: "SaaS product for reviewing distributed energy resources",
    stack: "Angular / ASP.NET / C# / Azure DevOps",
    impact: "Shipped",
    eyebrow: "West Monroe / PXEL Engineering Intern / Engineering",
    oneLiner: "A web-based SaaS product built with West Monroe's Product Experience & Engineering Lab that streamlined how distributed energy resources, with a specific focus on solar integration, get reviewed and approved for interconnection.",
    statLabel: "Role",
    stat: "PXEL",
    role: "PXEL Engineering Intern",
    team: "West Monroe's Product Experience & Engineering Lab, working directly with an Energy & Utility client, based in downtown Chicago",
    problem: "Interconnection review required a clearer way to move from complex project data to the decisions an energy and utility client needed to make, especially as solar applications increased in volume.",
    work: "I collaborated directly with the client on a web-based SaaS product that optimized and enhanced the interconnection review process for distributed energy resources. I proposed and built dynamic review pages that streamlined how applications were reviewed and managed, giving the people responsible for approvals a more usable workflow.",
    different: "I was still an intern here, figuring out how to be a developer on a team. I would have asked more questions about the end-user experience, rather than exclusively tackling feature implementation. This was a really interesting product with a lot to learn from.",
    confidentialityNote: "Built under client confidentiality for an Energy & Utility client. Shown here through description and an illustrative flow diagram rather than the actual product or internal review systems.",
    differentImage: "/work/west-monroe.jpg",
    diagrams: [
      {
        title: "Interconnection application flow",
        chart: `flowchart LR
    A[Applicant submits interconnection request] --> B[Utility intake / initial review]
    B --> C{Passes initial screening?}
    C -->|No| D[Returned with required changes]
    D --> B
    C -->|Yes| E[Technical impact screening]
    E --> F{Requires broader grid study?}
    F -->|No| G[Utility approval]
    F -->|Yes| H[Coordination with ISO / transmission layer]
    H --> I[Impact study]
    I --> G
    G --> J[Interconnection agreement issued]
    J --> K[Project cleared to proceed]

    style G fill:#b5b89a,stroke:#8a8c72,color:#1b1d1f
    style J fill:#b5b89a,stroke:#8a8c72,color:#1b1d1f
    style K fill:#b5b89a,stroke:#8a8c72,color:#1b1d1f`,
      },
    ],
  },
  {
    slug: "critical-cyber-asset-compliance",
    year: "2022",
    org: "MISO Energy",
    track: "Engineering",
    title: "Critical Cyber Asset Compliance Automation",
    description: "Full-stack automation for cyber-asset certification",
    stack: "Angular / Flask / Python / Docker / Jenkins / BlackDuck / Fortify",
    impact: "15 months",
    eyebrow: "MISO Energy / Data Analyst Intern / Engineering",
    oneLiner: "A web application that replaced a 15-month manual certification process, ensuring compliance of confidential cyber assets critical to the bulk electric system.",
    statLabel: "Replaced",
    stat: "15 mo",
    role: "Data Analyst Intern",
    team: "MISO Energy compliance team",
    problem: "Manual certification created a long, fragile path to proving that critical cyber assets met the requirements of the bulk electric system.",
    work: "I automated a manual, 15-month certification process by developing a full-stack web application that ensures compliance of confidential cyber assets critical to the bulk electric system. I built it using Angular, Flask, and Python, with Docker and Jenkins for deployment, and BlackDuck and Fortify for security and dependency scanning in production.",
    different: "I would involve the eventual operators earlier in the workflow design. The system automated the process, but its everyday ergonomics could have been shaped more directly by the people running it.",
    heroImage: "/work/miso-intern.jpg",
  },
  {
    slug: "city-circuit",
    year: "2025",
    org: "Deloitte<>Doblin",
    track: "Engineering",
    title: "Fellowship Application: City Circuit",
    description: "Transit equity visualization platform for public-sector transit planning",
    stack: "React / Next.js / Mapbox GL",
    impact: "Accepted!",
    eyebrow: "Doblin Innovation and Design Fellowship / Product Designer & Engineer / Engineering",
    oneLiner: "A proof of concept for making transit planning's equity tradeoffs visible: who benefits, who doesn't, and what a different route could change.",
    statLabel: "Simulated access gain",
    stat: "+35%",
    role: "Product Designer & Engineer",
    team: "Solo, built for Deloitte's Doblin Fellowship application prompt: find a public sector problem and propose a solution, in whatever format I wanted. Most applicants used a video or a slide deck. I chose to build a working site instead.",
    problem: "Transit planning stays opaque to the communities it affects most. In the US, [700,000+ zero-vehicle households](https://www.brookings.edu/research/transit-access-and-zero-vehicle-households/) in major metros lack reliable transit access, [43% of transit-dependent residents](https://digitalcommons.usf.edu/cgi/viewcontent.cgi?article=1054&context=jpt) in major cities live in what amount to transit deserts, and [6.2% of adults](https://meps.ahrq.gov/data_files/publications/st558/stat558.shtml) report missing work or appointments due to unreliable transit. Residents don't have an easy way to understand or influence local transit changes.",
    work: "Designed and built a proof-of-concept platform illustrating what transit equity planning could look like: an interactive transit map, a mocked-up \"what if\" simulator showing how commute times, reachability, and emissions would shift if a route changed, and exportable equity visualizations designed for grant proposals and community outreach. I researched and identified the real data sources a functional version would draw on, including GTFS feeds, Census ACS, LODES, BLS, and TIGER/Line, and used one scenario, a South Sacramento student's commute to Sacramento State, to illustrate the kind of impact the tool is meant to surface: a hypothetical cross-town connector dropping a 70-minute commute to 45, with a simulated 35% increase in reachable opportunity.",
    different: "This was built as a proof of concept, not a functioning tool, so the map and simulator illustrate the idea rather than run on live data. The next real step would be grounding it in one city's actual GTFS feed and census data, and validating the approach with a real planning agency before building further.",
    heroImage: "/work/city-circuit-figma-planning.png",
    link: "https://citycircuit.vercel.app/",
  },
];

export const projects = [...projectsData].sort(
  (a, b) => dateSortValue(b.year) - dateSortValue(a.year)
);

const questsData: Quest[] = [
  {
    status: "Paused",
    date: "2020–21",
    title: "Student pilot",
    domain: "Aviation",
    body: "Learned to fly a Piper Warrior II in my Indiana hometown. I love planes, and this was a dream opportunity during late high school and early college.",
    label: "FLIGHT LOG",
    caption: "Piper Warrior II, Indiana",
    photo: "/quests/soloflight.jpg",
    facts: [
      { label: "Aircraft", value: "Piper Warrior II" },
      { label: "Groundschool score", value: "96%" },
      { label: "Guided hours", value: "150+ hours" },
      { label: "Solo hours", value: "20+ hours" },
    ],
  },
  {
    status: "Certified",
    date: "2026",
    title: "RYT 200 yoga teacher",
    domain: "Movement",
    body: "Occasionally teaching, but always learning and practicing. I love the yoga community I've found in Sacramento, CA.",
    label: "PRACTICE NOTES",
    caption: "Practice session",
    photo: "/quests/yoga1.jpg",
    facts: [
      { label: "Credential", value: "RYT 200" },
      { label: "Training hours", value: "200 hours" },
      { label: "Studio", value: "—" },
      { label: "Year", value: "—" },
    ],
  },
  {
    status: "Completed",
    date: "2026",
    title: "Freq of Nature Projector Mapping",
    domain: "Light",
    body: "Created visuals for a dancefloor at a Sacramento, CA art collective fundraiser.",
    label: "DJ VISUALS",
    caption: "Sacramento art collective fundraiser",
    links: [
      { label: "Freq of Nature", href: "https://www.freq0fnature.com/", type: "process" },
    ],
    photo: "/quests/freq1.jpg",
    facts: [
      { label: "Venue", value: "Sacramento, CA art collective" },
      { label: "Surface area", value: "—" },
      { label: "Runtime", value: "—" },
      { label: "Attendance", value: "—" },
    ],
  },
  {
    status: "Completed",
    date: "2026",
    title: "Camp U-Kai Photographer",
    domain: "Photography",
    body: "Camp photographer at a DIY weekend gathering in the mountains of Ukiah, CA.",
    label: "TEST SHOTS",
    caption: "Ukiah, CA",
    link: "https://campukai.com/",
    photo: "/quests/camp-ukai-003.jpg",
    facts: [
      { label: "Location", value: "Ukiah, CA" },
      { label: "Dates", value: "—" },
      { label: "Frames delivered", value: "—" },
    ],
  },
  {
    status: "Completed",
    date: "2023",
    title: "Printmaking on an 18th century printing press",
    domain: "Craft",
    body: "Set type by hand and pulled prints on a centuries-old letterpress.",
    label: "PRESS PROOFS",
    caption: "Letterpress proof",
    photo: "/quests/printmaking.jpg",
    facts: [
      { label: "Press", value: "18th century letterpress" },
      { label: "Technique", value: "Hand-set type" },
      { label: "Output", value: "—" },
      { label: "Location", value: "—" },
    ],
  },
  {
    status: "Completed",
    date: "2023",
    title: "Studying globalization in Egypt",
    domain: "Field",
    body: "Coursework and fieldwork on globalization, based abroad.",
    label: "FIELD NOTES",
    caption: "Alexandria, Egypt",
    photo: "/quests/alexandria.jpg",
    facts: [
      { label: "Location", value: "Egypt" },
      { label: "Focus", value: "Globalization" },
      { label: "Format", value: "Coursework + fieldwork" },
      { label: "Duration", value: "—" },
    ],
  },
  {
    status: "Completed",
    date: "2022",
    title: "Taste of Tippecanoe — Projection Mapping",
    domain: "Light",
    body: "Generative art and 3D models projected onto the Lafayette County Courthouse for a festival audience of 35,000+.",
    label: "COURTHOUSE MAPPING",
    caption: "Lafayette County Courthouse",
    links: [
      { label: "\"Courthouse to be transformed for the arts\" — Purdue Exponent", href: "https://www.purdueexponent.org/city_state/courthouse-to-be-transformed-for-the-arts/article_efe7d104-ed8a-11ec-b80e-9b1b0f5c3f28.html", type: "press" },
      { label: "Light show video — Purdue Exponent", href: "https://www.purdueexponent.org/city_state/6-18-22-taste-of-tippecanoe-light-show/video_4aa5065e-f0a9-11ec-b444-5f7aa794071e.html", type: "press" },
      { label: "3D model — Sketchfab", href: "https://sketchfab.com/3d-models/tippecanoe-county-courthouse-fdc8a0a85c12419fb210015df0faa03b", type: "process" },
      { label: "Projection mapping documentation — YouTube", href: "https://www.youtube.com/watch?v=-_CBYaIbPRE", type: "process" },
    ],
    photo: "/quests/taste-of-tippecanoe.jpg",
    facts: [
      { label: "Venue", value: "Lafayette County Courthouse" },
      { label: "Attendance", value: "35,000+" },
      { label: "Projectors", value: "Two 30,000-lumen projectors" },
      { label: "Medium", value: "Generative art / 3D models" },
    ],
  },
  {
    status: "Completed",
    date: "2026",
    title: "Open House — Projection Mapping",
    domain: "Light",
    body: "Interactive projector mapping installation for a music non-profit and instrument library fundraiser.",
    label: "OPEN HOUSE",
    caption: "Open House installation",
    photo: "/quests/open-house.jpg",
    facts: [
      { label: "Attendance", value: "300+" },
      { label: "Mappings", value: "3 separate mappings" },
      { label: "Visuals", value: "5 generative visuals" },
      { label: "Purpose", value: "Music non-profit fundraiser" },
    ],
  },
  {
    status: "Completed",
    date: "2023",
    title: "WA/VASH",
    domain: "Light",
    body: "Projection-mapped visuals performed at WA/VASH (Wabash Audiovisual), an outdoor AV festival at Tapawingo Park in West Lafayette, IN, curated by Esteban García Bravo and presented by West Lafayette Parks and Recreation and the Arts Federation.",
    label: "PROJECT NOTES",
    caption: "Tapawingo Park, West Lafayette, IN",
    links: [
      { label: "Project page — sesseka.com", href: "https://www.sesseka.com/projects/wavash", type: "process" },
    ],
    photo: "/quests/wavash-web.jpg",
    facts: [
      { label: "Venue", value: "Tapawingo Park, West Lafayette, IN" },
      { label: "Festival", value: "WA/VASH (Wabash Audiovisual)" },
      { label: "Curator", value: "Esteban García Bravo" },
      { label: "Presented by", value: "West Lafayette Parks and Recreation / the Arts Federation" },
    ],
  },
];

export const quests = [...questsData].sort(
  (a, b) => dateSortValue(b.date) - dateSortValue(a.date)
);
