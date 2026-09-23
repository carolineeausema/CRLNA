# CRLNA Website — Content Export

Exported for editing. Field names match the code (`app/data.ts`, `app/page.tsx`, etc.) so edits can be pasted back in cleanly. Don't edit structure/punctuation like `\n`, `[text](url)`, or `->` unless you mean to change formatting — those are rendered specially.

---

## Site metadata (app/layout.tsx)

- Title: `CRLNA`
- Description: `Strategy and design in critical spaces.`

---

## Navigation (app/page.tsx)

- Work
- About
- Contact
- Availability badge: `Open to new roles`
- GitHub link label: `GitHub ->`

---

## Hero (app/page.tsx)

- Eyebrow: `Product Design & Engineering`
- Title: `Strategy + Design\nin critical spaces` (the `\n` is a line break)
- Description: `Where design decisions become code.`
- Primary button: `See the work ->`
- Secondary button: `Get in touch`
- Scroll cue: `↓  Work`

---

## About (app/page.tsx)

- Heading: `About`
- Subheading: `Design thinking, engineering judgment, and the journey as the destination.`
- Body:

I came to product design by way of sociology: studying computer science with the same curiosity about why systems work the way they do, aimed at something I could actually build. I think about infrastructure a lot: it's invisible until it breaks. My job is usually to notice the quiet failure point before anyone else does. Staying curious, open, and sensitive to problems that aren't mine is what makes that possible.

---

## Work section (app/page.tsx)

- Heading: `Work`
- Filter options: `All / Engineering / Design / Creative`
- Column headers: `YR / PROJECT / WHAT IT DOES / STACK / IMPACT`

(Row content for each project — title, description, stack, impact — is listed under **Projects** below, since it's the same data.)

---

## Contact (app/page.tsx)

- Title: `Currently open to product design and front-end engineering roles.`
- Description: `Also happy to talk about projector mappings, planes, and yoga. I reply within a day or two.`
- Status line: `Currently: full-time at Deloitte, open to conversations about what's next.`
- Email: `carolineeausema@gmail.com`
- Links: `GitHub ->`, `LinkedIn ->`, `Resume PDF ↓`
- Form labels: `Name`, `Email`, `Message`
- Form placeholders: `Jane Doe`, `you@example.com`, `What are you working on?`
- Submit button: `Send ->` (sending state: `Sending...`)
- Success message: `Message sent! I'll reply within a day or two.`
- Error message: `Something went wrong. Try again, or email me directly.`

---

## Footer (app/page.tsx)

- `© 2026 CRLNA / React / Next / TypeScript / p5`
- Easter egg link: `p.s. these r my side quests →`
- `Built with a little sparkle in my eye.`

---

## 404 page (app/not-found.tsx)

- Code: `404`
- Heading: `Whoops!`
- Body: `The route you followed does not exist... this is awk.`
- Buttons: `Back home`, `See the work`

---

## Side Quests page intro (app/QuestsPage.tsx)

- Heading: `Side Quests`
- Subheading: `You found my work in progress. This will be added to the main page soon!`

---

# Projects (app/data.ts)

Sorted newest first on the site. Listed here in source order.

## 1. Federal Client

- slug: `federal-account`
- year: `2025`
- org: `Deloitte`
- track: `Engineering`
- title: `Federal Client`
- description: `Documentation and systems design for tax access serving 36M+ business users`
- stack: `AWS / PlantUML / Visio / GitHub / Figma / Markdown`
- impact: `36M+`
- eyebrow: `Deloitte / Systems Engineer / Engineering`
- oneLiner: `A system giving 36M+ business users, with 29K daily active users, secure digital access to their tax information, documented through the user flows, sequence diagrams, and architecture diagrams that guided how it was built.`
- statLabel: `Business users`
- stat: `36M+`
- role: `Systems Engineer`
- team: `Deloitte, Architecture Design team`
- problem: `A notoriously opaque government process had to become something a small business owner could actually use without help.`
- work: `I designed and documented client releases through user flows, sequence diagrams, API specifications, and architecture diagrams. I mapped the logic behind different transaction types, like generating and confirming PINs, across business entity categories such as partnerships, exempt organizations, and government entities, each pulling from its own API, and used return codes to trace what had actually happened in a transaction when something failed. I also facilitated team meetings and wrote weekly, biweekly, and monthly status reports to keep a program of thousands of practitioners aligned with stakeholder reporting requirements.`
- different: `The gap between what was compliant and what was actually usable didn't show up until later than it should have. That kind of gap is easier to notice from outside the room than from inside the discussions I was documenting. Earlier user testing with actual small business owners, not just internal stakeholders, would have caught it sooner.`
- confidentialityNote: `Built under federal client confidentiality. Shown here through description and illustrative diagrams, not the actual interface or government systems involved.`
- diagrams: 2 (User flow; Sequence diagram: transaction logic — not included here, diagram code not prose content)

## 2. Pathfinder: AI Compliance & Security Tool

- slug: `pathfinder`
- year: `2025`
- org: `Deloitte`
- track: `Engineering`
- title: `Pathfinder: AI Compliance & Security Tool`
- description: `Full-stack compliance monitoring built against NIST CSF 2.0, extensible to additional frameworks`
- stack: `Next.js / AWS / Python / SQL / Figma / Docker`
- impact: `Shipped`
- eyebrow: `Deloitte / Software Engineer / Engineering`
- oneLiner: `A tool that keeps compliance monitoring current and searchable, built first against the NIST CSF 2.0 framework and designed to expand to other regulatory frameworks over time.`
- statLabel: `Status`
- stat: `Shipped`
- role: `Software Engineer`
- team: `Deloitte, Cyber AI team`
- problem: `Large documentation corpora change constantly, and compliance teams needed a way to monitor them against an initial cybersecurity framework, NIST CSF 2.0, in a system that could grow to support other frameworks later without being rebuilt.`
- work: `I worked as a software engineer on a product team, delivering end to end features across the front end and back end, fixing bugs, reviewing pull requests, and pushing rapid UI updates to keep pace with evolving data models while keeping the interface stable. I led quality and modernization efforts, including a migration to Amazon S3, SonarQube-driven code improvements, and front end unit testing up to about 85% coverage. I also implemented and validated UAT feedback through to release.`
- different: `I would establish a stronger evaluation set before expanding the monitoring surface. The product got useful quickly, and its quality bar should have been made explicit sooner. I would also get a UX/UI designer involved earlier. The product was useful, but it could have been more usable.`
- confidentialityNote: `Built under client confidentiality. Shown here through description and illustrative UI and flow visuals rather than the actual product or client data.`
- detailShots: `Compliance monitoring overview`, `Document intake`
- diagrams: 2 (NIST CSF 2.0 compliance monitoring flow; Architecture-level view)

## 3. State Child Welfare Referral System

- slug: `state-child-welfare`
- year: `2026`
- org: `Deloitte`
- track: `Design`
- title: `State Child Welfare Referral System`
- description: `UX research and product design for a closed-loop referral system connecting families to community care`
- stack: `Product design / Systems design / User Research`
- impact: `Statewide`
- eyebrow: `Deloitte / UX Researcher & Systems Designer / Design`
- oneLiner: `A closed-loop referral system designed so families who don't meet the threshold for a child abuse case still get connected to the community resources they actually need, with the loop closed so those connections can be tracked.`
- statLabel: `Reach`
- stat: `Statewide`
- role: `UX Researcher & Systems Designer, Product Management`
- team: `Cross-functional public-sector team, with systems architecture work contributed through a multi-state referral consortium`
- problem: `Many families who contact the child welfare system don't meet the threshold for a child abuse case, but still need help. The existing process had no reliable way to connect them to community resources or to track whether that connection actually happened.`
- work: `I conducted user experience research on child welfare processes, including journey maps and personas, and rapidly prototyped concepts for multiple pilots. I authored and maintained the research documentation and prepared visual stories to support stakeholder review. I contributed to systems architecture design for the closed-loop referral system as part of a multi-state consortium work stream, developing prototypes with applicability beyond this state alone. I also supported preparation for a state executive lab by shaping the technical and logistical details needed for rapid prototyping, and translated research findings into structured, sprint-ready user stories across multiple workstreams and epics, keeping sprint planning aligned with what the research actually found.`
- different: `I would bring more frontline voices into the earliest systems conversations. The strongest decisions came from direct experience with hotline callers and case workers, and they deserved even more influence from the start.`
- confidentialityNote: `Built under state client confidentiality. Shown here through description and an illustrative flow diagram rather than the actual product or internal systems involved.`
- detailShots: `Referral journey map`
- diagrams: 1 (Referral journey: hotline to community resource)

## 4. Public Utility Distributed Energy Interconnection Platform

- slug: `distributed-energy-interconnection`
- year: `2023`
- org: `West Monroe`
- track: `Engineering`
- title: `Public Utility Distributed Energy Interconnection Platform`
- description: `SaaS product for reviewing distributed energy resources`
- stack: `Angular / ASP.NET / C# / Azure DevOps`
- impact: `Shipped`
- eyebrow: `West Monroe / PXEL Engineering Intern / Engineering`
- oneLiner: `A web-based SaaS product built with West Monroe's Product Experience & Engineering Lab that streamlined how distributed energy resources, with a specific focus on solar integration, get reviewed and approved for interconnection.`
- statLabel: `Role`
- stat: `PXEL`
- role: `PXEL Engineering Intern`
- team: `West Monroe's Product Experience & Engineering Lab, working directly with an Energy & Utility client, based in downtown Chicago`
- problem: `Interconnection review required a clearer way to move from complex project data to the decisions an energy and utility client needed to make, especially as solar applications increased in volume.`
- work: `I collaborated directly with the client on a web-based SaaS product that optimized and enhanced the interconnection review process for distributed energy resources. I proposed and built dynamic review pages that streamlined how applications were reviewed and managed, giving the people responsible for approvals a more usable workflow.`
- different: `I was still an intern here, figuring out how to be a developer on a team. I would have asked more questions about the end-user experience, rather than exclusively tackling feature implementation. This was a really interesting product with a lot to learn from.`
- confidentialityNote: `Built under client confidentiality for an Energy & Utility client. Shown here through description and an illustrative flow diagram rather than the actual product or internal review systems.`
- differentImage: `/work/west-monroe.jpg`
- diagrams: 1 (Interconnection application flow)

## 5. Critical Cyber Asset Compliance Automation

- slug: `critical-cyber-asset-compliance`
- year: `2022`
- org: `MISO Energy`
- track: `Engineering`
- title: `Critical Cyber Asset Compliance Automation`
- description: `Full-stack automation for cyber-asset certification`
- stack: `Angular / Flask / Python / Docker / Jenkins / BlackDuck / Fortify`
- impact: `15 months`
- eyebrow: `MISO Energy / Data Analyst Intern / Engineering`
- oneLiner: `A web application that replaced a 15-month manual certification process, ensuring compliance of confidential cyber assets critical to the bulk electric system.`
- statLabel: `Replaced`
- stat: `15 mo`
- role: `Data Analyst Intern`
- team: `MISO Energy compliance team`
- problem: `Manual certification created a long, fragile path to proving that critical cyber assets met the requirements of the bulk electric system.`
- work: `I automated a manual, 15-month certification process by developing a full-stack web application that ensures compliance of confidential cyber assets critical to the bulk electric system. I built it using Angular, Flask, and Python, with Docker and Jenkins for deployment, and BlackDuck and Fortify for security and dependency scanning in production.`
- different: `I would involve the eventual operators earlier in the workflow design. The system automated the process, but its everyday ergonomics could have been shaped more directly by the people running it.`
- heroImage: `/work/miso-intern.jpg`

## 6. Fellowship Application: City Circuit

- slug: `city-circuit`
- year: `2025`
- org: `Deloitte<>Doblin`
- track: `Engineering`
- title: `Fellowship Application: City Circuit`
- description: `Transit equity visualization platform for public-sector transit planning`
- stack: `React / Next.js / Mapbox GL`
- impact: `Accepted!`
- eyebrow: `Doblin Innovation and Design Fellowship / Product Designer & Engineer / Engineering`
- oneLiner: `A proof of concept for making transit planning's equity tradeoffs visible: who benefits, who doesn't, and what a different route could change.`
- statLabel: `Simulated access gain`
- stat: `+35%`
- role: `Product Designer & Engineer`
- team: `Solo, built for Deloitte's Doblin Fellowship application prompt: find a public sector problem and propose a solution, in whatever format I wanted. Most applicants used a video or a slide deck. I chose to build a working site instead.`
- problem: `Transit planning stays opaque to the communities it affects most. In the US, [700,000+ zero-vehicle households](https://www.brookings.edu/research/transit-access-and-zero-vehicle-households/) in major metros lack reliable transit access, [43% of transit-dependent residents](https://digitalcommons.usf.edu/cgi/viewcontent.cgi?article=1054&context=jpt) in major cities live in what amount to transit deserts, and [6.2% of adults](https://meps.ahrq.gov/data_files/publications/st558/stat558.shtml) report missing work or appointments due to unreliable transit. Residents don't have an easy way to understand or influence local transit changes.`
- work: `Designed and built a proof-of-concept platform illustrating what transit equity planning could look like: an interactive transit map, a mocked-up "what if" simulator showing how commute times, reachability, and emissions would shift if a route changed, and exportable equity visualizations designed for grant proposals and community outreach. I researched and identified the real data sources a functional version would draw on, including GTFS feeds, Census ACS, LODES, BLS, and TIGER/Line, and used one scenario, a South Sacramento student's commute to Sacramento State, to illustrate the kind of impact the tool is meant to surface: a hypothetical cross-town connector dropping a 70-minute commute to 45, with a simulated 35% increase in reachable opportunity.`
- different: `This was built as a proof of concept, not a functioning tool, so the map and simulator illustrate the idea rather than run on live data. The next real step would be grounding it in one city's actual GTFS feed and census data, and validating the approach with a real planning agency before building further.`
- heroImage: `/work/city-circuit-figma-planning.png`
- link: `https://citycircuit.vercel.app/`

---

# Side Quests (app/data.ts)

Sorted newest first on the site. Listed here in source order.

## 1. Student pilot

- status: `Paused`
- date: `2020–21`
- title: `Student pilot`
- domain: `Aviation`
- body: `Learned to fly a Piper Warrior II in my Indiana hometown. I love planes, and this was a dream opportunity during late high school and early college.`
- label: `FLIGHT LOG`
- caption: `Piper Warrior II, Indiana`
- photo: `/quests/soloflight.jpg`
- facts: Aircraft — Piper Warrior II · Groundschool score — 96% · Guided hours — 150+ hours · Solo hours — 20+ hours

## 2. RYT 200 yoga teacher

- status: `Certified`
- date: `2026`
- title: `RYT 200 yoga teacher`
- domain: `Movement`
- body: `Occasionally teaching, but always learning and practicing. I love the yoga community I've found in Sacramento, CA.`
- label: `PRACTICE NOTES`
- caption: `Practice session`
- photo: `/quests/yoga1.jpg`
- facts: Credential — RYT 200 · Training hours — 200 hours · Studio — — · Year — —

## 3. Freq of Nature Projector Mapping

- status: `Completed`
- date: `2026`
- title: `Freq of Nature Projector Mapping`
- domain: `Light`
- body: `Created visuals for a dancefloor at a Sacramento, CA art collective fundraiser.`
- label: `DJ VISUALS`
- caption: `Sacramento art collective fundraiser`
- links: Freq of Nature -> https://www.freq0fnature.com/ (process)
- photo: `/quests/freq1.jpg`
- facts: Venue — Sacramento, CA art collective · Surface area — — · Runtime — — · Attendance — —

## 4. Camp U-Kai Photographer

- status: `Completed`
- date: `2026`
- title: `Camp U-Kai Photographer`
- domain: `Photography`
- body: `Camp photographer at a DIY weekend gathering in the mountains of Ukiah, CA.`
- label: `TEST SHOTS`
- caption: `Ukiah, CA`
- link: `https://campukai.com/`
- photo: `/quests/camp-ukai-003.jpg`
- facts: Location — Ukiah, CA · Dates — — · Frames delivered — —

## 5. Printmaking on an 18th century printing press

- status: `Completed`
- date: `2023`
- title: `Printmaking on an 18th century printing press`
- domain: `Craft`
- body: `Set type by hand and pulled prints on a centuries-old letterpress.`
- label: `PRESS PROOFS`
- caption: `Letterpress proof`
- photo: `/quests/printmaking.jpg`
- facts: Press — 18th century letterpress · Technique — Hand-set type · Output — — · Location — —

## 6. Studying globalization in Egypt

- status: `Completed`
- date: `2023`
- title: `Studying globalization in Egypt`
- domain: `Field`
- body: `Coursework and fieldwork on globalization, based abroad.`
- label: `FIELD NOTES`
- caption: `Alexandria, Egypt`
- photo: `/quests/alexandria.jpg`
- facts: Location — Egypt · Focus — Globalization · Format — Coursework + fieldwork · Duration — —

## 7. Taste of Tippecanoe — Projection Mapping

- status: `Completed`
- date: `2022`
- title: `Taste of Tippecanoe — Projection Mapping`
- domain: `Light`
- body: `Generative art and 3D models projected onto the Lafayette County Courthouse for a festival audience of 35,000+.`
- label: `COURTHOUSE MAPPING`
- caption: `Lafayette County Courthouse`
- links:
  - "Courthouse to be transformed for the arts" — Purdue Exponent -> https://www.purdueexponent.org/city_state/courthouse-to-be-transformed-for-the-arts/article_efe7d104-ed8a-11ec-b80e-9b1b0f5c3f28.html (press)
  - Light show video — Purdue Exponent -> https://www.purdueexponent.org/city_state/6-18-22-taste-of-tippecanoe-light-show/video_4aa5065e-f0a9-11ec-b444-5f7aa794071e.html (press)
  - 3D model — Sketchfab -> https://sketchfab.com/3d-models/tippecanoe-county-courthouse-fdc8a0a85c12419fb210015df0faa03b (process)
  - Projection mapping documentation — YouTube -> https://www.youtube.com/watch?v=-_CBYaIbPRE (process)
- photo: `/quests/taste-of-tippecanoe.jpg`
- facts: Venue — Lafayette County Courthouse · Attendance — 35,000+ · Projectors — Two 30,000-lumen projectors · Medium — Generative art / 3D models

## 8. Open House — Projection Mapping

- status: `Completed`
- date: `2026`
- title: `Open House — Projection Mapping`
- domain: `Light`
- body: `Interactive projector mapping installation for a music non-profit and instrument library fundraiser.`
- label: `OPEN HOUSE`
- caption: `Open House installation`
- photo: `/quests/open-house.jpg`
- facts: Attendance — 300+ · Mappings — 3 separate mappings · Visuals — 5 generative visuals · Purpose — Music non-profit fundraiser

## 9. WA/VASH

- status: `Completed`
- date: `2023`
- title: `WA/VASH`
- domain: `Light`
- body: `Projection-mapped visuals performed at WA/VASH (Wabash Audiovisual), an outdoor AV festival at Tapawingo Park in West Lafayette, IN, curated by Esteban García Bravo and presented by West Lafayette Parks and Recreation and the Arts Federation.`
- label: `PROJECT NOTES`
- caption: `Tapawingo Park, West Lafayette, IN`
- links: Project page — sesseka.com -> https://www.sesseka.com/projects/wavash (process)
- photo: `/quests/wavash-web.jpg`
- facts: Venue — Tapawingo Park, West Lafayette, IN · Festival — WA/VASH (Wabash Audiovisual) · Curator — Esteban García Bravo · Presented by — West Lafayette Parks and Recreation / the Arts Federation

---

*Note: Mermaid diagram code (flowcharts for Federal Client, Pathfinder, State Child Welfare, and Distributed Energy projects) is not included above since it's structural/code, not prose. Let me know if you want those exported too.*
