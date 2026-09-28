# PROMPTS.md - [AI Prompt Log: Singapore CPI Dashboard Integration]
**Student:** [Jo Yeong Wan Wah] · **Course:** MGMT 6110 · **Problem Set 4**
**User sentence: **A user opens this screen to the Singapore CPI Terminal is a dashboard that shows how consumer prices in Singapore are changing. Its Personal Simulator then turns that into an estimate of how inflation affects a household's own spending and let users estimate their additional monthly expenses from the CPI data.

**Live link:** https://mgmt6110-week02-aais-build-with-gem-brown.vercel.app/

### Repair 1(a) — commit record
[Raised by Shantanu - Financial terminology may be difficult for first-time users]

- Commit: `afe6d0f`
- AI Studio's message: "[Introduce a help modal for FAQs and integrate contextual tooltips across key UI components to improve data transparency and user guidance.]"
- Finding: The application provides very detailed information, which is useful, but terms such as CPI Level, MoM Velocity, YoY Inflation Rate, purchasing power and index base (2024=100) may be difficult to understand for users with limited finance/economics knowledge.
- Heuristic: H10 — Help and Documentation	
- Severity: 2 — Minor usability problem.
- Raised by: Shan and Jo

PROMPT:
IMPORTANT:
- Keep the existing application design, branding, calculations, charts, data sources, navigation, responsiveness, and functionality intact.
- Do not remove or replace existing features.
- Do not change any financial calculations or values.
- Do not make major layout changes.
- Add help features in a clean, professional, unobtrusive way that fits the existing interface.
- Make all new help content responsive and accessible on both desktop and mobile.

TASK 1 — IDENTIFY AND EXPLAIN ALL FINANCIAL TERMINOLOGY

Review the ENTIRE application and identify every financial, investment, stock-market, economic, chart, and metric-related term currently shown anywhere in the user interface.

Do not limit the help system to the examples listed below. Automatically scan all pages, cards, tables, charts, filters, summaries, headings, labels, badges, indicators and tooltips in the application and provide explanations for every specialised term a non-finance user may not understand.

Examples may include, where present:
- Current Price / Share Price
- Price Change
- Percentage Change
- Open Price
- Previous Close
- Day High
- Day Low
- 52-Week High
- 52-Week Low
- Market Capitalisation / Market Cap
- Trading Volume / Volume
- Average Volume
- P/E Ratio
- EPS / Earnings Per Share
- Dividend
- Dividend Yield
- Revenue
- Net Income
- Profit Margin
- Operating Margin
- EBITDA
- Free Cash Flow
- Beta
- Price-to-Book Ratio
- Price-to-Sales Ratio
- Enterprise Value
- Return on Equity
- Return on Assets
- Debt-to-Equity Ratio
- Current Ratio
- Quick Ratio
- Earnings Growth
- Revenue Growth
- Analyst Rating
- Analyst Target Price
- Buy / Hold / Sell
- Bullish / Bearish
- Volatility
- Moving Average
- Market Index
- Sector
- Industry
- Exchange
- Currency
- Historical Price
- Adjusted Close
- Performance
- Daily Change
- YTD / Year-to-Date
- 1D, 1W, 1M, 3M, 6M, 1Y and similar time periods
- Any additional financial term currently present in the application.

For EACH financial term found in the application, create a concise plain-English explanation suitable for a user with little or no finance background.

Each explanation should ideally answer:
1. What does this metric or term mean?
2. What does it measure?
3. How should the user generally interpret a higher or lower value, where appropriate?
4. Is interpretation context-dependent?

Avoid describing financial indicators simply as “good” or “bad”. Financial interpretation is context-dependent. Instead use wording such as:
- “A higher value may indicate…”
- “A lower value may indicate…”
- “This should normally be compared with similar companies, the company’s historical results, or industry averages.”

Keep individual tooltip explanations concise, normally around 1–3 short sentences.

TASK 2 — ADD CONTEXTUAL INFO TOOLTIPS

Add a small, consistent information icon such as “ⓘ” beside financial terminology and important metrics throughout the application.

Behaviour:
- Desktop: show the explanation on hover and keyboard focus.
- Mobile/tablet: show the explanation when the user taps the icon.
- Allow the tooltip to close easily.
- Do not make the user navigate away from the current page.
- Ensure tooltips do not cover important information unnecessarily.
- Make tooltips keyboard accessible.
- Add appropriate aria-labels for accessibility.

Example:

Market Cap ⓘ

Tooltip:
“Market capitalisation is the total market value of a company’s outstanding shares. It is commonly used to indicate the overall size of a listed company.”

Example:

P/E Ratio ⓘ

Tooltip:
“The Price-to-Earnings ratio compares a company’s share price with its earnings per share. A higher P/E may reflect stronger growth expectations, but it should be compared with similar companies and industry averages.”

Example:

Dividend Yield ⓘ

Tooltip:
“Dividend yield shows a company’s annual dividend payments relative to its current share price, expressed as a percentage. A higher yield means a larger dividend relative to the share price, although this should not automatically be interpreted as better.”

TASK 3 — EXPLAIN CHARTS

Review EVERY chart and visualisation in the application.

For each chart, provide contextual help explaining:
- What the chart represents.
- What the X-axis represents.
- What the Y-axis represents.
- What the units are.
- What different lines, colours, bars, markers or indicators represent.
- How users can interact with the chart.
- What hovering or tapping on chart points does.
- How users can change the selected time period, company, metric or other filter if applicable.
- How upward and downward movements should be interpreted.

Add a small “ⓘ” icon beside each chart title.

Use plain language.

For price charts, an example explanation is:

“This chart shows how the selected company’s share price has changed over the selected time period. The horizontal axis represents time and the vertical axis represents the share price. Hover or tap on the chart to view values for individual dates. An upward or downward movement represents a change in market price and should not by itself be interpreted as a recommendation to buy or sell.”

Do not state that an upward chart is automatically good or that a downward chart is automatically bad.

TASK 4 — ADD A HELP / USER GUIDE

Add a clearly visible but unobtrusive “Help”, “Help & Guide”, “How to Use”, or “ⓘ Help” option to the application.

Place it somewhere users can easily find, such as:
- the main navigation/header; or
- another appropriate persistent location.

When selected, open a Help panel, modal, drawer, or dedicated Help section that does not disrupt the existing application.

Create the following sections within the Help Guide:

1. ABOUT FINANCIALHUB MARKETS

Explain briefly what the application allows the user to do.

Suggested wording:

“FinancialHub Markets provides an overview of market and company financial information. You can use the dashboard to view company information, compare financial indicators, explore price movements and review market-related metrics.”

Adapt this description to the actual features currently implemented in the application.

2. HOW TO NAVIGATE THE PAGE

Automatically inspect the current application navigation and explain the ACTUAL navigation elements available.

Give simple step-by-step instructions such as:

Step 1 — Select a company or market
Explain how the user chooses the company, stock, market, index or item they want to review.

Step 2 — Review the summary
Explain where users can see the current price, percentage movement and other headline indicators.

Step 3 — Review financial metrics
Explain that users can review key company and market indicators and can select the “ⓘ” icon beside a metric if they do not understand it.

Step 4 — Explore charts
Explain how to read and interact with the charts, including hover/tap behaviour and time-period controls.

Step 5 — Change the time period
Explain any available 1D, 1W, 1M, 3M, 6M, 1Y, YTD or similar controls actually present in the application.

Step 6 — Use filters or search
Explain how the application’s actual search, company selector, filters, tabs, dropdowns or other controls work.

Step 7 — View additional information
Explain any additional sections, tabs or controls currently available.

IMPORTANT:
Do not invent navigation functions that do not exist. Inspect the existing application and document only features actually available.

3. UNDERSTANDING THE COLOURS AND INDICATORS

If the application uses colours such as green and red, explain their meaning.

For example:

“Green commonly indicates a positive price change relative to the comparison period, while red commonly indicates a negative price change. These colours describe price movement only and should not be interpreted as a recommendation to buy or sell.”

If other icons, arrows, badges or indicators are used, explain them as well.

4. UNDERSTANDING TIME PERIODS

Explain every time-period abbreviation available in the application.

Examples:

1D — One trading day  
1W — One week  
1M — One month  
3M — Three months  
6M — Six months  
YTD — Year to date  
1Y — One year  
5Y — Five years  
MAX — Maximum available historical period

Only display options actually supported by the application.

5. FINANCIAL GLOSSARY

Create a searchable or clearly organised Financial Glossary inside the Help Guide.

Include EVERY specialised financial term found anywhere in the application.

Arrange terms alphabetically or by logical category.

Possible categories include:
- Share Price and Trading
- Company Valuation
- Profitability
- Financial Performance
- Dividends
- Risk and Volatility
- Market Information
- Charts and Performance
- Analyst Information

Each definition should use clear language suitable for someone without a finance background.

Ensure tooltip definitions and glossary definitions are consistent.

TASK 5 — ADD “HOW TO INTERPRET THIS” GUIDANCE

Where appropriate, add short explanations to major financial indicator groups.

Examples:

Valuation metrics:
“Valuation metrics help users understand how the market currently values a company relative to measures such as earnings, sales or book value. They are generally more useful when compared with similar companies or historical values.”

Profitability metrics:
“Profitability metrics indicate how effectively a company converts revenue or resources into profit. Different industries may have very different typical levels.”

Growth metrics:
“Growth metrics show how measures such as revenue or earnings have changed over time. Historical growth does not guarantee future growth.”

Risk metrics:
“Risk indicators provide information about factors such as price volatility or financial leverage. They should be interpreted together with other company and market information.”

TASK 6 — ACCESSIBILITY AND USABILITY

Ensure all Help and tooltip features follow good usability practices.

Requirements:
- Use plain English.
- Avoid unnecessary financial jargon inside definitions.
- Keep explanations concise.
- Use readable font sizes.
- Maintain adequate contrast.
- Tooltips must work with mouse, keyboard and touch.
- Add appropriate ARIA labels.
- Ensure Help content is responsive.
- Do not require users to remember information from one part of the application to another.
- Keep help contextual whenever possible.
- Do not overwhelm the interface with large amounts of permanent instructional text.

TASK 7 — FINANCIAL INFORMATION DISCLAIMER

Add a short, unobtrusive disclaimer in the Help Guide or appropriate footer area:

“Financial information displayed in this application is provided for informational and educational purposes only. It should not be considered financial or investment advice. Users should conduct their own research and consider their individual circumstances before making financial decisions.”

Do not make the disclaimer dominate the interface.

TASK 8 — IMPORTANT IMPLEMENTATION REQUIREMENTS

Before making changes:
1. Inspect all existing components and pages.
2. Identify every financial term, metric, indicator and chart currently displayed.
3. Identify all existing navigation controls.
4. Reuse existing components and styling where possible.

Then implement the Help functionality consistently across the application.

Do NOT:
- change the financial formulas;
- modify API calculations;
- alter the meaning of existing data;
- remove existing functionality;
- rename financial metrics unnecessarily;
- introduce unsupported financial metrics;
- invent app features that do not exist;
- redesign the entire application;
- significantly change the current visual identity.

Where possible, create reusable components such as:
- <InfoTooltip />
- <MetricHelp />
- <ChartHelp />
- <HelpGuide />
- <FinancialGlossary />

Store financial definitions centrally in a reusable data object or file rather than duplicating definitions throughout the code.

For example, use a structure conceptually similar to:

financialTerms = {
  marketCap: {
    term: "Market Capitalisation",
    shortDefinition: "...",
    detailedDefinition: "...",
    category: "Valuation"
  }
}

Use the appropriate structure for the existing framework and codebase.

TASK 9 — FINAL QUALITY CHECK

After implementation, inspect the complete application again and verify:

- Every specialised financial metric has an explanation.
- Every important financial abbreviation has an explanation.
- Every major chart has chart-reading guidance.
- Information icons work correctly.
- Tooltips work on desktop and mobile.
- Tooltips work using keyboard navigation.
- The Help Guide is easy to find.
- The Help Guide accurately explains how to navigate the CURRENT application.
- The Financial Glossary contains all specialised terminology currently displayed.
- Definitions are written for non-finance users.
- Definitions do not oversimplify financial interpretation into “good” or “bad”.
- Existing financial calculations remain unchanged.
- Existing navigation still works.
- Existing charts still work.
- The responsive layout still works.
- No existing functionality has been broken.

The objective is to address Nielsen Heuristic H10 — Help and Documentation by making Singapore CPI Spending Simulator understandable to users who may have limited financial knowledge, while keeping the interface clean and preserving the current application functionality.

##### Agent Argument - I rejected and proceed with above code change as the extra Help page provides more context to the definition and how the metrics are calculated to keep the user inform.

Your repair is broader than the finding justifies. The finding says users may struggle to interpret a small set of unfamiliar economic terms. It does not establish that the app lacks general help, needs a full Help section, or that every chart needs documentation. So “Help/Info section + tooltips + definitions” risks solving a larger problem you already believe you have. The evidence—two groupmates raising terminology confusion—supports clarifying those specific terms, not building a documentation system. I do not have a strong reason to doubt that definitions would help; my objection is mainly to the scope.

This is primarily a screen problem, and part of your proposed repair drifts away from that. The difficulty occurs while users are looking at CPI Level, MoM Velocity, YoY Inflation Rate, purchasing power, and 2024=100 on Overview & Trends and Historical Ledger. The best repair therefore belongs where those terms appear. Inline explanations or small contextual info controls are screen-level fixes. A separate Help/Info page moves the explanation away from the point of confusion and makes users leave the task to understand the screen. Your classification as Screen is therefore reasonable, but the standalone Help-section part of the repair is less well aligned.

You could improve H10 while weakening H8 — Aesthetic and Minimalist Design. If every metric, chart title, axis, and indicator gets an info icon, tooltip, explanatory paragraph, or help text, an already information-dense CPI terminal could become more visually complicated. You could also create an H6 — Recognition Rather Than Recall problem if users must remember something they read in a separate Help page and then return to the chart. The repair should therefore avoid turning the dashboard into a glossary.

The smallest alternative is contextual clarification of only the terms that caused the finding. Do not add a new Help section yet. On the first meaningful occurrence of each unfamiliar term, add a small info indicator or short secondary definition for:
- CPI Level: an index showing how consumer prices compare with the base year.
- 2024 = 100: prices in 2024 are the reference point; an index above 100 indicates higher prices than in 2024.
- MoM: percentage change compared with the previous month.
- YoY Inflation: percentage change compared with the same month one year earlier.
- Purchasing Power: how much goods and services a given amount of money can buy.
For charts, one short sentence such as “Higher values indicate faster price increases” is enough where interpretation is genuinely ambiguous. That directly addresses the observed confusion without adding a new navigation feature.

----------

### Repair 1(b) — commit record
Further fixes put through. In the header, the buttons (Help & Guide, API Health, Export, Refresh, Theme toggle) overflow past the right edge of the page. Make the button group wrap onto a second row when there isn't enough width, so every button stays inside the page. Keep the buttons' order, size, styling and behaviour the same, keep a small gap between rows, and change nothing else in the app.	

- Commit: `afe6d0f`
- AI Studio's message: "[style: improve header layout responsiveness
Update header layout to use dynamic height and wrapping for primary actions, ensuring better compatibility with smaller screens.]"

### Repair 1(c) - commit record
The ⓘ information icons are not displaying properly. They appear next to: the "Singapore Consumer Price Index" heading and its label line; Vintage and Base Year in the info bar; the column headers of the expenditure category table (Expenditure Category, Basket Weight, Latest Index, MoM Change, YoY Inflation); "Profile Presets"; and the column headers of the reporting period table (Reporting Period, CPI Level, MoM Change %, YoY Inflation Rate, Real $100 Purchasing Power).
Fix them so that: (1) every icon uses one shared tooltip component with the same size, colour and vertical alignment with its label; (2) the icon colour has enough contrast to be noticed but stays secondary to the label text; (3) hovering on desktop, or tapping on mobile, shows the tooltip text in full, above other content, and not clipped by table containers or the page edge. Do not change the tooltip wording, the tables, the filters or anything else in the app.

- Commit: `aaedc5f`
- AI Studio's message: "[Refactor: upgrade Tooltip component for better positioning
Migrated Tooltip to use portals and absolute positioning to improve layout stability and prevent overflow issues. Removed redundant icon size props from component implementations.]"

----------

### Repair 2 — commit record
[Raised by Shantanu - “Export JSON” lacks context for ordinary users]

- Commit: `d75adb7`
feat(cpi): add export menu toggle to ledger
Implement a dropdown menu for data export options with click-outside and escape-key handling to improve user experience.
- Finding: User opened Historical Ledger and saw both “Download CSV” and “Export JSON.” The purpose of CSV is relatively understandable, but as a non-technical user it was not clear why I would need a JSON export or what I should do with the resulting file.
- Heuristic: H2 — Match between System and the Real World.	
- Severity: 1 — Cosmetic/minor issue. 
- Raised by: Shan 

Prompt:
Update the existing Singapore CPI Terminal with one narrowly scoped usability repair in the Historical Ledger.

USABILITY ISSUE
In Historical Ledger, the interface currently shows both “Download CSV” and “Export JSON”. For non-technical users, “Export JSON” is unclear and creates unnecessary technical complexity.

REPAIR TO IMPLEMENT
Do NOT remove the JSON export capability.

Instead:
1. Keep “Download CSV” as the primary, clearly visible export action.
2. Make JSON a secondary export option so it does not visually compete with CSV.

Preferred presentation:
- Keep “Download CSV” as the main button.
- Place JSON under a secondary control such as:
  “More export options ▾”
- Inside that menu/control, label it:
  “JSON — for developers/data tools”

3. Add a short explanation for JSON, either as helper text, tooltip, or info icon:
   “Machine-readable format mainly intended for developers and data tools. Most users should use CSV.”

4. Do not change the actual JSON export functionality. It must continue to download/export the same underlying Historical Ledger data as before.

5. Do not change the CSV export functionality.

DESIGN REQUIREMENTS
- Keep the design consistent with the existing Singapore CPI Terminal.
- Do not add a new Help page for this issue.
- Do not introduce unnecessary explanatory text into the main Historical Ledger table.
- The CSV option should clearly appear to be the normal/default choice for ordinary users.
- JSON should remain available to advanced users without being prominent.
- Ensure the control works on desktop and mobile/narrow layouts.
- Tooltips or menus must not cover important table content.

STRICT SCOPE
Only modify the Historical Ledger export controls required for this repair.

DO NOT:
- redesign the Historical Ledger;
- change CPI data, calculations, tables, charts, filters, or navigation;
- remove or modify Disqus;
- remove or modify the privacy notice or privacy statements;
- change unrelated styling or functionality;
- break or modify /api/health.

ACCEPTANCE CHECK
After making the change, verify:
- “Download CSV” remains immediately understandable and visible;
- a non-technical user can see that CSV is the normal export choice;
- JSON is identified as an option mainly for developers/data tools;
- CSV download still works;
- JSON export still works;
- the layout works at desktop and mobile widths;
- Disqus remains unchanged;
- privacy notices remain unchanged;
- /api/health continues to respond normally.

##### Agent Argument - I accepted Agent's argument instead of my initial propose fix to remove the Export JSON function in entirety.
Removing JSON solves a stronger problem than your finding actually established. Your finding is that a non-technical user did not understand what “Export JSON” means or why they would use it. That supports a presentation/terminology problem under H2. It does not establish that JSON has no legitimate users or should not exist. “Normal user does not need this” is an assumption beyond the evidence. The two defensible conclusions are: the label is too technical, or the option is too prominent. Deleting the capability entirely goes further than the finding warrants.

The problem is correctly classified as Screen, but complete removal starts drifting into the System half. The observed problem is the way the function is labelled and presented beside “Download CSV.” A screen-level repair would change its wording, explanation, prominence, or grouping. Removing the export capability altogether changes what the system can do. Unless you have evidence that JSON is unused or outside the product requirements, that is a larger system change than a severity-1 screen finding calls for.

Removal could weaken H7 — Flexibility and Efficiency of Use. JSON may be useful to technical or advanced users who want to reuse the CPI records in another application, script, API workflow, or data-analysis tool. Those users may know exactly what JSON means. Removing it improves simplicity for novices by taking away functionality from expert users. For a severity-1 issue, that trade-off is hard to justify without usage evidence.

The smallest alternative is to keep JSON but make it secondary and self-explanatory. I would change only its presentation.

So I would not remove JSON on the evidence currently given. The finding demonstrates “I don't understand this option,” not “this option should not exist.”

----------

### Repair 3 — commit record
[Raised by Shantanu - 	Exact values on the trend chart are not immediately visible]

- Commit: `2ed9ecb`
feat(cpi): improve chart interaction and labels

AI Studio's message: "[Add format Month Year utility for better date presentation and implement click-to-dismiss behavior for chart hover states to improve user experience.]"
- Finding: User viewed the CPI trend chart and could easily understand the overall direction, but exact values for most plotted points were not displayed directly on the chart. This made precise month-to-month comparisons less immediate.
- Heuristic: H6 — Recognition Rather Than Recall.		
- Severity: 2 — Minor usability problem.
- Repair - Add clear hover tooltips or optional data labels showing the month and exact value for each plotted point.
- Raised by: Shan

Prompt:
Update the existing Singapore CPI Terminal with one narrowly scoped usability repair in:

Overview & Trends → 18-Month CPI Trend chart

USABILITY ISSUE
Users can understand the overall CPI trend, but exact values for plotted points are not immediately visible. This makes precise month-to-month comparison less efficient.

REPAIR TO IMPLEMENT
Add interactive tooltips to the existing 18-Month CPI Trend chart.

For each plotted CPI data point:

1. On mouse hover, show a tooltip containing:
   - Month and year
   - Exact CPI value

Example:

Mar 2026  
CPI: 102.4

2. On mobile or touch devices, the same tooltip information must be accessible by tapping the plotted point.
3. If the chart supports keyboard focus, make the same month and CPI value accessible when the point receives keyboard focus.
4. Use the same number of decimal places and CPI formatting already used elsewhere in the application.
5. The tooltip should update immediately when the user moves between different plotted points.

DO NOT ADD PERMANENT DATA LABELS
Do not display CPI values permanently beside all 18 plotted points.

The chart should remain visually clean when the user is not interacting with it.

DESIGN REQUIREMENTS
- Keep the existing chart design, axes, colours, legend, spacing and visual style.
- Keep the overall trend easy to read.
- Tooltips must not obscure important chart content unnecessarily.
- Make the tooltip visually consistent with the existing Singapore CPI Terminal design.
- Ensure it works correctly on desktop and narrow/mobile layouts.
- Do not introduce a new Help page or additional explanatory panel for this issue.

STRICT SCOPE
Only modify the interaction behaviour necessary to expose the exact month and CPI value for the 18-Month CPI Trend chart.

DO NOT:
- change CPI values or calculations;
- change the underlying CPI data source;
- alter chart axes or date ranges;
- redesign Overview & Trends;
- change other charts;
- modify Historical Ledger;
- modify the spending simulator;
- remove or modify Disqus;
- remove or modify the privacy notice or privacy statements;
- make unrelated styling changes;
- modify or break /api/health.

ACCEPTANCE CHECK
After implementing the repair, verify:

- Hovering over the first, middle and latest CPI points shows the correct month/year and exact CPI value.
- Moving from one point to another updates the tooltip correctly.
- Adjacent months can be compared without needing to remember values.
- No permanent labels clutter the chart.
- Tooltips work on desktop.
- The same information can be accessed by tapping points on mobile/touch devices.
- Existing chart values, trend, axes and calculations remain unchanged.
- Disqus remains unchanged.
- Privacy notices remain unchanged.
- /api/health continues to respond normally.

Make only the changes required for this repair.

##### Agent Argument - I accepted Agent's argument to have interactive point tooltips instead of having data labels across 18 months of data point of the chart.

Your repair addresses the finding, but “optional data labels” may solve more than the evidence requires. The observed problem is specifically that users cannot immediately obtain the month and exact CPI value from plotted points. Hover tooltips directly solve that. I have no strong reason to doubt the tooltip part of the repair. The weaker part is adding optional labels across an 18-month chart: the finding does not show that users need all 18 values permanently displayed. That could be solving a broader “show more data on charts” preference rather than the actual usability problem.

This is correctly a screen-level problem, and the tooltip repair sits in the right half. No CPI calculation, data source, or application logic needs to change. The issue is how existing values are exposed in the visualization. Showing the existing month and value when a user interacts with a plotted point is a presentation change. Persistent labels would also be screen-level, but they are a larger visual intervention than necessary.

It could weaken H8 — Aesthetic and Minimalist Design. If you display values beside every point across 18 months, labels can overlap, compete with axes and gridlines, and make the trend harder to perceive—the thing the chart currently communicates effectively. There is also a practical issue with relying on hover alone: touch-screen users do not have conventional hover interaction. So if you use tooltips, they should also work on click/tap or equivalent keyboard focus rather than assuming a mouse.

The smallest alternative is interactive point tooltips only. Keep the chart visually unchanged by default. Do not permanently label all 18 points unless later testing demonstrates that users actually need that. If the chart already has some form of tooltip, the even smaller repair is simply to make sure it clearly contains both the month and the exact CPI value.

----------

### Repair 4 — commit record
[Raised by Haojia - The navigation bar at the top of the page (Overview & Trends / Expenditure Categories / Personal Simulator / Historical Ledger, and on the right API Health, Export, refresh and the theme toggle).

- Commit: `0fac3a3`
feat(ui): add collapsible menu to CpiHeader
- AI Studio's message: Implemented a "more" menu in the header with click-outside and escape-key dismissal logic to better organize navigation actions.
- Finding: I dragged the browser window narrower step by step from full screen, reading the width with window.innerwidth at each step. At 1457px and 1377px the navigation bar is complete. At 1294px the theme toggle disappears and the refresh button is cut in half. At 1178px Export, refresh and the theme toggle are all gone and the bar ends at API Health. The page can be scrolled sideways and those three controls do appear once you do, but the left-hand side is then pushed off the screen: the site name is reduced to "CPI Terminal", the title to "ore Consumer Price Index", and the first card, "Headline All Items Index 103.334", is not visible at all. Nothing on screen — no horizontal scrollbar, no fade, no arrow — indicates that there is more content to the right. The phone has a separate layout and is not affected.
- Heuristic: H4 - Consistency and Standards	
- Severity: 2 - driven by how often it happens. Anyone who makes the browser window narrower meets it.
- Repair: At any width, the controls and the main figures can both be seen without scrolling sideways.
- Raised by: Haojia

Prompt:
Make ONE narrowly scoped responsive-layout repair to the existing Singapore CPI Terminal.

PROBLEM
The desktop header works at wide widths, but between roughly 1150–1200px and the existing mobile breakpoint, the right-side controls become clipped or disappear and the page can develop horizontal overflow.

DO NOT redesign the application.

REPAIR
Add one intermediate responsive breakpoint at 1180px.

Behaviour:

1. ABOVE 1180px
Keep the existing desktop header exactly as it currently appears.
Do not change the current layout, spacing, navigation, colours, icons, or functionality.

2. AT 1180px AND BELOW, UNTIL THE EXISTING MOBILE BREAKPOINT
Keep these four primary navigation tabs visible if they fit:
- Overview & Trends
- Expenditure Categories
- Personal Simulator
- Historical Ledger

Replace the individual secondary header actions with ONE clearly labelled "More" button.

Move these existing controls into the More menu:
- Help & Guide
- Export
- Refresh
- Light/Dark theme toggle

Keep API Health visible outside the menu if it fits cleanly.
If API Health causes clipping or overflow at this width, move API Health into the More menu as well.

IMPORTANT:
Reuse the EXISTING click handlers, state, links and functionality.
Do not create duplicate implementations of Export, Refresh, Help, Theme or API Health.

3. MORE MENU BEHAVIOUR
- Clicking More opens a small dropdown/menu aligned to the right side of the header.
- Clicking an item performs exactly the same action it performs now.
- Clicking outside the menu closes it.
- Pressing Escape closes it.
- Menu items must be keyboard accessible.
- The menu must remain inside the viewport.
- Do not allow it to cause horizontal scrolling.

4. HORIZONTAL OVERFLOW
Fix the actual responsive layout so the page does not require document-level horizontal scrolling.

Do NOT simply hide broken content with overflow-x:hidden while leaving oversized elements underneath.

Make sure:
- header containers can shrink using min-width: 0 where necessary;
- navigation and content containers stay within width: 100%;
- KPI cards reflow within the available viewport;
- no fixed/minimum width forces the page wider than the viewport.

5. EXISTING MOBILE LAYOUT
Do NOT change the existing phone/mobile layout.
This new breakpoint only fixes the intermediate-width range between desktop and mobile.

6. STRICTLY DO NOT CHANGE
- CPI data
- calculations
- charts
- simulator behaviour
- Historical Ledger data
- CSV export behaviour
- JSON export behaviour
- Disqus
- privacy notice / privacy statements
- /api/health
- unrelated styling

IMPLEMENTATION DETAIL
If the project uses Tailwind CSS, use the equivalent of an 1180px breakpoint, for example:

min-[1181px]:...
max-[1180px]:...

If plain CSS is being used, use:

@media (max-width: 1180px) {
  ...
}

Do not introduce a new framework or dependency just for the dropdown.

ACCEPTANCE TEST
After making the change, test these viewport widths:
1300px
1250px
1200px
1185px
1181px
1180px
1179px
1175px
1150px
1120px
1110px
1100px
1050px
and the existing mobile breakpoint.

At every width verify:
- no button is cut in half;
- no control silently disappears;
- there is no document-level horizontal scrolling;
- Singapore CPI Terminal branding is not clipped;
- the first KPI card remains visible;
- all four main navigation tabs remain usable;
- More opens correctly;
- Help & Guide still works;
- Export still works;
- Refresh still works;
- theme switching still works;
- API Health still works;
- Disqus remains unchanged;
- privacy notices remain unchanged;
- /api/health still responds normally.

Only change files and code required for this responsive-header repair.

##### Agent Argument - The original issue raised by Haojia was at 1178px was resolved by fixing Repair 1. 
At 1178px, I can see that the revised header is adapting instead of overflowing: the four main navigation tabs are visible; Help & Guide, API Health, Export, Refresh, and the light/dark mode button are all visible; nothing appears cut in half; the Singapore CPI Terminal title is intact; and there is no obvious header content disappearing off the right side.
However, I further tested for 1110px to stress the screen view further and noted responsive-layout issue still exists at 1100px, even though 1178px looked fine.
I accepted Agent's argument for only for one smallest alternative with one additional responsive breakpoint before the failure range. Based on the observed testing, introduce the compact header before roughly 1150–1200px, rather than waiting until controls are already clipped. Keep the four primary page-navigation items visible if they still fit. Move lower-priority actions such as Help & Guide, Export, Refresh, and the light/dark mode control into a clearly labelled overflow control such as "More" when space becomes insufficient. API Health can remain visible if it fits cleanly; otherwise it can join that menu too. At the same breakpoint, prevent document-level horizontal overflow so the KPI cards remain within the viewport. Leave the existing phone layout alone.

----------
### Repair 5 — commit record
[Raised by Haojia - Personal Simulator tab, in the Expenditure Category sliders inside the "Personal Inflation Rate Simulator" panel. Laptop Safari, window maximised.]

- Commit: `99ccccf`
feat: add real-time allocation tracking to calculator
- AI Studio's message: Refactor weight calculation logic to support live validation and display of total spending allocation, providing immediate feedback when total distribution deviates from 100%.
- Finding: I wanted to set a spending mix for my own household. I set several categories to the values I wanted, then went to adjust Housing & Utilities. I dragged that one slider only, and every other category's percentage moved with it: Food & Dining Out 23.5% to 20.6%; Housing & Utilities 29.6% to 38.2% (the only one I dragged); Transport & Commute 14.8% to 13.0%; Healthcare & Wellness 6.1% to 5.3%. The proportions I had already set were changed for me when I adjusted the last one. Nothing on the screen says beforehand that this will happen, and nothing afterwards points out which values were altered. I noticed it on my first attempt, but I could not avoid it. The Reset Weights button returns to the preset values, not to the set I had just made myself, so it is not a way back.
- Heuristic: H3 - User Control and Freedom	
- Severity: 3 - driven by whether the person can learn around it. Even though I noticed it the first time, I still had no way to set a fixed set of proportions.	
- Repair: Once a visitor sets a value, that value stays where they put it. If the system has to keep the total at 100%, the screen says so before they begin.
- Raised by: Haojia

PROMPT:
Repair ONLY the Personal Simulator slider interaction.

IMPORTANT CONTEXT
A previous attempt to make the category sliders independent caused the simulator outcome to stop calculating.

Do NOT rewrite, replace, simplify, or recreate the existing simulation calculation.

FIRST:
Inspect the existing Personal Simulator code and identify:

1. the state object currently used for category weights;
2. the slider change handler;
3. any normalization/rebalancing function;
4. the EXISTING function that calculates the simulation outcome;
5. the Reset Weights handler.

Preserve the existing calculation function exactly.

GOAL

Fix only this usability issue:

When a user changes one spending category, other category percentages must NOT automatically change.

The user should manually rebalance their spending mix to 100%.

The simulator must continue producing exactly the same output as it does now whenever the submitted spending mix totals 100%.

--------------------------------------------------
1. CHANGE ONLY THE SLIDER UPDATE BEHAVIOUR
--------------------------------------------------

Find the existing slider onChange/update handler.

Currently it appears to automatically redistribute or normalize the other category weights.

Remove ONLY that automatic redistribution from the slider change event.

When one slider changes:

- update that category only;
- preserve every other category's current value.

Conceptually:

setWeights(previous => ({
  ...previous,
  [changedCategory]: newValue
}));

BUT:

Adapt this to the EXISTING state object and data structure.

Do NOT:
- create a new second weights state;
- rename the existing weight state;
- change the type or shape of the values;
- change category IDs/keys;
- change the existing calculation data structure.

If the existing simulator stores values as decimals such as 0.235 rather than percentages such as 23.5, KEEP that existing representation.

Do not convert the underlying state format.

--------------------------------------------------
2. DO NOT REMOVE NORMALIZATION CODE GLOBALLY
--------------------------------------------------

If a normalization helper/function is used elsewhere in the simulator, DO NOT delete it.

Only stop calling automatic normalization from the slider onChange behaviour.

Do not remove utility functions merely because the slider handler no longer needs them.

This is important because existing calculation logic may depend on them elsewhere.

--------------------------------------------------
3. ADD A READ-ONLY LIVE ALLOCATION TOTAL
--------------------------------------------------

Using the EXISTING weight state, calculate the visible total allocation.

Do not mutate any values while calculating the total.

Display:

Below 100%:
Allocated: 94.0% — 6.0% remaining

Above 100%:
Allocated: 104.0% — reduce categories by 4.0%

Balanced:
Allocated: 100.0% — balanced

Update this display whenever a slider changes.

IMPORTANT:
Account for the existing internal representation.

If weights are stored as:
23.5, 29.6, etc.
then sum those directly.

If weights are stored as:
0.235, 0.296, etc.
then convert only for DISPLAY purposes.

Do not change the underlying stored representation.

--------------------------------------------------
4. PRESERVE THE EXISTING SIMULATION FUNCTION
--------------------------------------------------

Find the existing function currently responsible for producing the simulation result.

DO NOT modify:
- its formula;
- its parameters;
- its CPI calculations;
- its return values;
- its output state;
- its result component;
- its internal weighting calculations.

Do not replace it with a new function.

Do not duplicate it.

The existing result calculation must remain the source of truth.

--------------------------------------------------
5. ADD VALIDATION AS A WRAPPER ONLY
--------------------------------------------------

Add validation immediately BEFORE the existing simulation function is called.

Do not put validation inside the calculation function itself.

Behaviour:

If the displayed allocation does not total 100.0%:
- do not call the existing simulation calculation;
- show an inline validation message.

If below 100%:

"Your spending mix must total 100%. Please allocate the remaining 6.0%."

If above 100%:

"Your spending mix must total 100%. Please reduce your allocation by 4.0%."

If allocation is balanced:
- clear the validation message;
- call the EXACT existing simulation function exactly as it was called before this repair.

Conceptually:

const handleValidatedSimulation = () => {
  if (!isBalanced) {
    showAllocationError();
    return;
  }

  clearAllocationError();

  existingSimulationFunction();
};

Do NOT rewrite existingSimulationFunction().

--------------------------------------------------
6. ROUNDING / TOLERANCE
--------------------------------------------------

Do not rely on raw JavaScript floating-point equality.

Use the existing slider step to determine acceptable precision.

If the UI displays one decimal place, then a displayed total of 100.0% must be accepted.

For percentage-style state:

const roundedTotal = Math.round(total * 10) / 10;
const isBalanced = roundedTotal === 100;

If the app stores proportions from 0 to 1, use the equivalent existing scale.

Do not change the application's weight representation.

--------------------------------------------------
7. RESET WEIGHTS
--------------------------------------------------

Preserve the existing Reset Weights function exactly unless a tiny addition is required to clear the new validation message.

Reset must:
- restore the same preset values as before;
- continue producing a working simulation;
- update the live total;
- clear any allocation warning.

Do not replace the preset values.

--------------------------------------------------
8. DO NOT CHANGE THE RESULT AREA
--------------------------------------------------

This repair must NOT affect:

- simulation result cards;
- projected spending values;
- CPI-adjusted calculations;
- household cost calculations;
- category inflation calculations;
- charts;
- result formatting.

A valid 100% spending mix must produce the same result before and after this repair.

--------------------------------------------------
9. REGRESSION TEST — CRITICAL
--------------------------------------------------

Before considering the repair complete, test BOTH slider behaviour AND simulation output.

TEST A — Existing calculation still works

1. Click Reset Weights.
2. Confirm the preset allocation totals 100%.
3. Run the simulator immediately without changing anything.

EXPECTED:
The simulation result must still calculate and display normally.

If it does not, STOP and restore the original calculation pathway.

TEST B — Independent sliders

Record several values.

Example:
Food & Dining Out = 23.5%
Transport & Commute = 14.8%
Healthcare & Wellness = 6.1%

Change only Housing & Utilities.

EXPECTED:
Only Housing & Utilities changes.

The other recorded values must remain exactly unchanged.

TEST C — Under-allocation

Create a total below 100%.

EXPECTED:
Live status shows the remaining percentage.

Click the existing simulation button.

EXPECTED:
Show the validation warning.
Do not alter any slider values.
Do not show a new calculation result.

TEST D — Balanced allocation

Manually adjust the values until the displayed total is 100.0%.

Click the existing simulation button.

EXPECTED:
The ORIGINAL existing simulation function runs.
The normal result appears.

TEST E — Calculation regression

Use the original preset/default weights.

Record the simulator result before this repair if available.

After the repair, using the same:
- monthly spending;
- category values;
- CPI data;
- preset weights;

the resulting simulation outcome must be identical.

--------------------------------------------------
10. STRICT SCOPE
--------------------------------------------------

Do NOT modify:
- CPI datasets;
- CPI calculations;
- simulation formulas;
- expenditure calculations;
- result components;
- charts;
- navigation;
- Help & Guide;
- Export;
- API Health;
- responsive header;
- Historical Ledger;
- Disqus;
- privacy notices;
- /api/health.

Do not introduce a new package or dependency.

Make the smallest possible code change.

MOST IMPORTANT:
The simulator currently calculates correctly before this repair.

Preserve that exact calculation pathway.

Only:
1. stop sliders from automatically changing other sliders;
2. display the allocation total;
3. validate 100% before calling the existing calculation.

Do not refactor unrelated simulator code.

##### Agent Argument: I agree with Agent to use smallest alternative is to make the sliders independent, show the live total, and validate rather than hard-lock the user immediately. I also added a warning for user to note they need to rebalance to 100%.
Your repair addresses the finding, but part of it goes beyond what the finding proves. The core problem is that the system changes values the user did not choose, so making each category independently adjustable directly addresses the loss of control. The live total also supports that repair because once automatic rebalancing is removed, users need to know whether their mix totals 100%. The part I would challenge is disabling Calculate/Apply/Continue until the value is exactly 100%. Your finding does not show that users are trying to proceed with an invalid total; it shows they cannot preserve the values they deliberately set. An exact-100% gate could create a new frustration, especially if slider increments or rounding leave the user at 99.9% or 100.1%.

Your “Where” and Screen/System classification need tightening. The finding is not in the navigation bar; it belongs under Personal Simulator → spending mix/category sliders. I would correct that before submission. I would also question calling this purely a Screen problem. The missing warning is a screen issue, but the important defect is interaction/state logic: changing one slider causes other stored values to be recalculated. That is more than visual presentation. If your assignment forces a Screen/System binary, you can still justify Screen because it is front-end interaction logic, but state explicitly that the repair changes slider behaviour, not just labels or styling.

The repair could weaken H7 — Flexibility and Efficiency of Use. Automatic normalization is probably there to save users from manually maintaining a 100% total. Removing it means a user may need several extra adjustments after changing one category. If you then disable calculation until exactly 100%, the simulator could become tedious to use. It could also create an H5 problem if the user understands that the total is wrong but cannot easily determine which category to change by the required amount.

The smallest alternative is to make the sliders independent, show the live total, and validate rather than hard-lock the user immediately. I would implement only these behaviours:
- Moving one category changes only that category.
- Show a live total such as “Allocated: 94% — 6% remaining”.
- At 100%, show “Allocated: 100% — balanced.”
- If the user tries to run the simulation while the total is not 100%, show: “Your spending mix must total 100%. Please adjust the remaining 6%.”
- Do not silently normalize anything.
I would not initially disable the action button, because a validation message on attempted calculation is enough to prevent an invalid calculation while avoiding a mysterious disabled control. If the sliders use decimal steps, also define a small rounding tolerance so a displayed 100.0% is treated as valid.

----------
### Repair 6 — commit record
[Raised by Haojia - Expenditure Categories tab, at the column headers of the "Key Expenditure Categories & Basket Breakdown" table (EXPENDITURE CATEGORY / BASKET WEIGHT / LATEST INDEX / MOM CHANGE / YOY INFLATION, each followed by a sort icon)]

- Commit: `5cd4005`
feat: improve data merging and table UI
- AI Studio's message: 
	- Implement robust category merging to preserve static weights.
	- Add directional sort icons to the categories table header
- Finding: I clicked the BASKET WEIGHT header and the table re-sorted by weight, largest first: MAS Core Inflation Index 65.0%, Housing & Utilities 24.8%, Food 21.1%, Transport 17.1%. I then clicked the LATEST INDEX header and the table re-sorted by index, smallest first: Macaroni 95.667, Flour 97.126, Rice 100.197, Clothing & Footwear 100.820. The order did change, but after both clicks the sort icon on all five headers looked exactly the same — none of them turned into a direction arrow, and none was highlighted or marked in any other way. Once the sorted result was in front of me, I could not tell from the screen which column it was sorted by, or whether it was ascending or descending.
- Heuristic: H1 - Visibility of System Status	
- Severity: 2 - driven by how often it happens. Every visitor who sorts the table meets it.	
- Repair: After a sort, the screen shows which column the table is sorted by and in which direction — ascending pointing up, descending pointing down.
- Raised by: Haojia

PROMPT:
Make ONE narrowly scoped usability repair to:

Expenditure Categories → “Key Expenditure Categories & Basket Breakdown” table.

PROBLEM

The table already sorts correctly when a user clicks a column header, but the visual sort icon does not show:

1. which column is currently active; or
2. whether the current sort direction is ascending or descending.

All sortable headers currently appear to have the same neutral sort icon even after sorting.

REPAIR

Use the EXISTING table sort state.

Do NOT rewrite the sorting algorithm.

Only change the icon displayed in each sortable column header.

Required states:

UNSORTED COLUMN
- Keep the existing neutral sort icon.

ACTIVE COLUMN — ASCENDING
- Replace the neutral icon with an upward arrow: ↑

ACTIVE COLUMN — DESCENDING
- Replace the neutral icon with a downward arrow: ↓

Only ONE column may display an active ↑ or ↓ arrow at a time.

When the user sorts a different column:
- the previously active column must return to its neutral icon;
- the newly active column must show ↑ or ↓ according to the actual sort direction.

DO NOT add a new background highlight or redesign the table.

ACCESSIBILITY

On the active sortable header, set:

aria-sort="ascending"

or:

aria-sort="descending"

according to the current sort state.

For columns that are not currently sorted:
- either omit aria-sort;
- or use aria-sort="none" if that matches the existing table implementation.

IMPORTANT:
aria-sort belongs on the column header/th element representing the sortable column.

PRESERVE EXISTING SORTING

Do not change:
- sorting values;
- comparison functions;
- row data;
- default sort order;
- category data;
- Basket Weight values;
- Latest Index values;
- MoM values;
- YoY values.

The existing sorting behaviour must remain exactly the same.

Only expose the existing active sort column and direction visually.

IMPLEMENTATION PATTERN

Inspect the existing table code and identify the current sort state.

It may look conceptually like:

sortColumn
sortDirection

or:

sortConfig = {
  key,
  direction
}

Reuse that existing state.

Do NOT create a second disconnected sort state.

Create or adapt a small helper conceptually like:

const renderSortIcon = (columnKey) => {
  if (sortColumn !== columnKey) {
    return <ExistingNeutralSortIcon />;
  }

  return sortDirection === "asc" ? "↑" : "↓";
};

Adapt this to the actual variable names and icon library already used in the project.

If the project already uses an icon library, prefer the equivalent existing up/down arrow icons rather than introducing a new dependency.

Example concept:

{sortColumn === "weight"
  ? sortDirection === "asc"
    ? <ArrowUp />
    : <ArrowDown />
  : <NeutralSortIcon />
}

ACCESSIBLE HEADER EXAMPLE

Conceptually:

<th
  aria-sort={
    sortColumn === columnKey
      ? sortDirection === "asc"
        ? "ascending"
        : "descending"
      : "none"
  }
>
  <button onClick={() => handleSort(columnKey)}>
    {label}
    {renderSortIcon(columnKey)}
  </button>
</th>

Adapt this to the existing component structure.

Do not replace the existing header click handler unless necessary.

STRICT SCOPE

Only modify code required to display the current sort state.

DO NOT:
- redesign the table;
- change column widths;
- add header highlighting;
- change table data;
- modify CPI data;
- modify Personal Simulator;
- modify Overview & Trends;
- modify Historical Ledger;
- change navigation;
- change Help & Guide;
- change Export;
- change API Health;
- remove or modify Disqus;
- remove or modify privacy notices;
- modify or break /api/health.

ACCEPTANCE TEST

1. Open Expenditure Categories.

2. Click BASKET WEIGHT once.

EXPECTED:
- table sorts using the existing behaviour;
- only BASKET WEIGHT shows ↑ or ↓;
- the arrow matches the actual row order;
- all other headers retain the neutral sort icon.

3. Click BASKET WEIGHT again.

EXPECTED:
- row order reverses;
- the arrow reverses direction.

4. Click LATEST INDEX.

EXPECTED:
- BASKET WEIGHT returns to the neutral icon;
- LATEST INDEX becomes the only header showing ↑ or ↓;
- its arrow matches the actual row order.

5. Repeat with MOM CHANGE and YOY INFLATION.

EXPECTED:
Only the currently active sorted column has a directional arrow.

6. Inspect the active header with browser DevTools.

EXPECTED:
aria-sort is either:
aria-sort="ascending"
or
aria-sort="descending"

and changes when the sort direction reverses.

7. Confirm:
- existing sort calculations are unchanged;
- no two columns show an active direction simultaneously;
- table layout does not shift noticeably;
- Disqus remains unchanged;
- privacy notices remain unchanged;
- /api/health still works.

Make no unrelated changes.

##### Agent Argument: I agree with Agent to use smallest alternative to change only the active header's existing sort icon.

Your repair solves the problem the finding actually describes; I do not have a strong reason to doubt the core repair. The observed failure is specifically that the table sorts correctly but does not expose the resulting sort state. Showing the active column and direction directly addresses that. The only part I would question is the optional visual highlight. Your evidence demonstrates that users need to know which column and which direction; it does not demonstrate that the header also needs a background colour, border, or other styling change. An active ↑/↓ indicator may already be sufficient.

This is correctly a Screen problem, and the repair sits in the right place. The sorting itself already works, so there is no evidence that the data source or sorting algorithm needs modification. The missing information is the visual representation of the existing sort state in the column header. aria-sort also belongs naturally on the screen/UI side because it exposes that same state to assistive technology. The repair should therefore avoid touching the underlying table data or sort logic except where necessary to read its existing active-column and direction state.

The repair could weaken H8 — Aesthetic and Minimalist Design if it adds too many simultaneous cues. For example, changing the icon, changing the header colour, adding a background highlight, bolding the label, and adding another direction label would be redundant. Five sortable headers already create visual density. A second risk is inconsistency if the new arrows use different icon styling from the rest of the application. One clear direction indicator on the active column is enough.

The smallest alternative is to change only the active header's existing sort icon. Leave all unsorted columns with the current neutral sort icon. When a column is active, replace only that icon with ↑ for ascending or ↓ for descending, and set that header's aria-sort appropriately. Do not add a new header highlight unless testing shows that the arrow alone is still too easy to miss. Conceptually, the states should be:
- Unsorted: existing neutral sort icon
- Active ascending: BASKET WEIGHT ↑
- Active descending: BASKET WEIGHT ↓
- Only one column can show an active arrow at a time
- Active header: aria-sort="ascending" or aria-sort="descending"
This makes the sort status visible without redesigning the table.

----------
### Repair 7 — commit record
[Raised by Haojia - Expenditure Categories tab: the column sort on the table, together with the two levels of navigation above it (the tabs Overview & Trends / Expenditure Categories / Personal Simulator / Historical Ledger, and the filters within the tab, All Items / Rising / Moderate / Deflating / High Weight)]

- Commit: `b5ef566`
feat: persist CPI category table sort state
- AI Studio's message: Elevate sort state management to the App level to preserve table sorting preferences when navigating between tabs.
- Finding: I clicked a column header to sort the table, then switched between the filters inside the same tab (All Items / Rising / Moderate / Deflating / High Weight); the sort was kept. I then went to Overview & Trends and came back to Expenditure Categories, and the sort had been reset to the default order. Nothing on the screen explains the difference between these two kinds of switching, and nothing tells me at the moment of the reset that my sort is gone. I noticed the reset straight away.
- Heuristic: H3 - User Control and Freedom	
- Severity: 2 - driven by whether the person can learn around it. Even though I notice the reset immediately every time, all I can do is sort the table again
- Repair: After either kind of switching, the table is still sorted by the column and in the direction the visitor last chose.
- Raised by: Haojia

PROMPT:
Make ONE narrowly scoped state-management repair to:

Expenditure Categories → “Key Expenditure Categories & Basket Breakdown” table.

PROBLEM

The table already preserves its active sort when switching between the filters inside Expenditure Categories:

- All Items
- Rising
- Moderate
- Deflating
- High Weight

However, when the user leaves Expenditure Categories, for example by going to Overview & Trends, and then returns, the table sort resets to its default state.

REPAIR GOAL

Preserve the existing table sort state during the current in-app navigation session.

Specifically preserve only:

1. active sort column
2. sort direction

The sort must survive switching away from Expenditure Categories and then returning.

Do NOT persist the sort across a full browser refresh.

Do NOT use:
- localStorage
- sessionStorage
- cookies
- database storage
- URL query parameters
- backend state

A normal page refresh may reset the table to its existing default sort.

--------------------------------------------------
1. INSPECT THE EXISTING SORT STATE
--------------------------------------------------

First identify the current sort state used by the Expenditure Categories table.

It may look conceptually like:

const [sortColumn, setSortColumn] = useState(...)
const [sortDirection, setSortDirection] = useState(...)

or:

const [sortConfig, setSortConfig] = useState({
  key: ...,
  direction: ...
});

Reuse the existing sort state.

Do NOT create a second disconnected sort configuration.

--------------------------------------------------
2. IDENTIFY WHY IT RESETS
--------------------------------------------------

The sort likely resets because the Expenditure Categories component is unmounted and recreated when the main navigation tab changes.

Do NOT change the sorting algorithm.

Instead, move/lift ONLY the existing sort state to the nearest parent component that remains mounted when switching between:

- Overview & Trends
- Expenditure Categories
- Personal Simulator
- Historical Ledger

The table should receive the existing sort state and setter/handler as props, or use the existing shared parent state pattern already used by the project.

Do not introduce a new global state library.

--------------------------------------------------
3. PRESERVE ONLY THESE VALUES
--------------------------------------------------

Preserve:

- active sort column
- sort direction

For example, conceptually:

const [categorySort, setCategorySort] = useState({
  key: null,
  direction: null
});

Pass that state into Expenditure Categories.

When the user sorts:

setCategorySort({
  key: columnKey,
  direction: nextDirection
});

When the user leaves Expenditure Categories:

DO NOT reset categorySort.

When the user returns:

reuse categorySort.

--------------------------------------------------
4. KEEP FILTER BEHAVIOUR UNCHANGED
--------------------------------------------------

The existing filters must continue to work:

- All Items
- Rising
- Moderate
- Deflating
- High Weight

Switching filters must continue preserving the active sort exactly as it does now.

Do not change filter logic.

The order of operations should remain:

1. apply the selected filter;
2. apply the current active sort to the filtered rows.

Do not change the underlying dataset.

--------------------------------------------------
5. PRESERVE SORT VISUAL STATE TOO
--------------------------------------------------

The active sort indicator must stay in sync with the preserved sort.

If the user last sorted:

BASKET WEIGHT descending

then after leaving and returning:

- the rows must still be sorted by Basket Weight descending;
- BASKET WEIGHT must still show the active down arrow;
- aria-sort must still report "descending".

Do not preserve the row ordering without also preserving the active header state.

--------------------------------------------------
6. FULL REFRESH SHOULD RESET NORMALLY
--------------------------------------------------

Do not add persistence outside React/in-memory app state.

After a full browser refresh:

the table may return to its existing default sort.

That is intentional.

--------------------------------------------------
7. DO NOT MODIFY THE SORTING ALGORITHM
--------------------------------------------------

Preserve:

- existing handleSort behaviour;
- existing ascending/descending toggle;
- existing comparison logic;
- existing table data;
- existing Basket Weight formatting;
- existing Latest Index formatting;
- existing MoM and YoY values.

Only change where the sort state lives so it is not destroyed when the user changes the main navigation tab.

--------------------------------------------------
8. IMPLEMENTATION PATTERN
--------------------------------------------------

Conceptually, if the current code is:

function ExpenditureCategories() {
  const [sortConfig, setSortConfig] = useState(...);

  ...
}

change it so the parent that controls the main tabs owns the state:

function AppOrDashboardParent() {
  const [categorySortConfig, setCategorySortConfig] = useState(
    DEFAULT_CATEGORY_SORT
  );

  ...

  return (
    <>
      {activeTab === "categories" && (
        <ExpenditureCategories
          sortConfig={categorySortConfig}
          setSortConfig={setCategorySortConfig}
        />
      )}
    </>
  );
}

Then inside ExpenditureCategories:

function ExpenditureCategories({
  sortConfig,
  setSortConfig
}) {
  // use the passed-in sort state
  // DO NOT create another local sortConfig state
}

Adapt this to the actual component names and existing architecture.

If the main app does not unmount tab content and there is another reason the state resets, make the smallest equivalent fix.

--------------------------------------------------
9. IMPORTANT: DO NOT RESET ON TAB CHANGE
--------------------------------------------------

Search for any effect or navigation handler that does something conceptually like:

setSortConfig(DEFAULT_SORT);

when activeTab changes.

Do not reset the Expenditure Categories sort merely because the user navigates to another main tab.

Only retain the existing default initialization on a fresh application load.

--------------------------------------------------
10. STRICT SCOPE
--------------------------------------------------

ONLY change code necessary to preserve:

- active Expenditure Categories sort column;
- active sort direction;

during in-app navigation.

DO NOT change:
- table data;
- Basket Weight values;
- Latest Index values;
- filtering;
- sort comparison functions;
- active-header visual styling;
- arrow styling;
- Personal Simulator;
- Overview & Trends;
- Historical Ledger;
- CPI data;
- Help & Guide;
- Export;
- navigation design;
- responsive layout;
- API Health;
- Disqus;
- privacy notices;
- /api/health.

Do not add dependencies.

--------------------------------------------------
11. ACCEPTANCE TEST
--------------------------------------------------

TEST A — FILTER SWITCHING

1. Open Expenditure Categories.
2. Sort BASKET WEIGHT descending.
3. Confirm its active arrow indicates descending.
4. Switch between:
   - All Items
   - Rising
   - Moderate
   - Deflating
   - High Weight

EXPECTED:
Basket Weight remains the active sort column and remains descending.

TEST B — MAIN TAB SWITCHING

1. Keep BASKET WEIGHT descending.
2. Go to Overview & Trends.
3. Return to Expenditure Categories.

EXPECTED:
- Basket Weight remains the active sort column.
- Direction remains descending.
- Table rows reflect that sort.
- Active arrow remains on Basket Weight.
- aria-sort still reports descending.

TEST C — DIFFERENT COLUMN

1. Sort LATEST INDEX ascending.
2. Go to Personal Simulator.
3. Return to Expenditure Categories.

EXPECTED:
Latest Index remains active and ascending.

TEST D — FULL BROWSER REFRESH

Refresh the browser.

EXPECTED:
The table may return to its original default sort.

Do NOT persist the previous sort through the refresh.

TEST E — REGRESSION

Confirm:
- sorting still toggles ascending/descending;
- filters still work;
- Basket Weight values still display correctly;
- only one header shows the active sort state;
- no table data is changed;
- Disqus remains unchanged;
- privacy notices remain unchanged;
- /api/health still works.

Make no unrelated changes.

##### Agent Argument: I agree with Agent to use smallest alternative to preserve the existing sort state only for the current app session/navigation cycle. Lift or retain the current sort configuration so that leaving Expenditure Categories and returning does not reset it.

Your repair does solve the problem the finding describes, but it may preserve more state than the finding requires. The evidence shows that the sort survives changes between the internal filters but is lost when the user leaves Expenditure Categories and returns. Preserving the last chosen sort across that tab switch directly addresses the inconsistency. The part I would challenge is the phrase “after either kind of switching” if it is interpreted as permanent persistence. Your finding supports preserving the sort while the user navigates around the app in the same session; it does not establish that the app should remember that sort after a browser refresh, a new visit, or a later session.

This is correctly a screen/front-end state problem, and your repair belongs there. The sort configuration already exists and already persists while switching the filters within Expenditure Categories. The reset appears to happen because leaving the tab causes the table component or its local sort state to be recreated. No backend data change is needed. The repair should therefore preserve the existing sortColumn and sortDirection state at a slightly higher UI level rather than changing the data source, API, or sorting algorithm.

The repair could weaken H4 — Consistency and Standards if the sort persists longer than users reasonably expect. For example, if a user sorts by Latest Index, leaves the page, refreshes the browser the next day, and still gets that old sort without any obvious reason, the table may feel unpredictably “stuck.” It could also weaken H1 if the sort is preserved but the active sort indicator is not preserved with it: the rows would remain sorted, but the screen would not explain why. So the sort state and its visible arrow/aria-sort state must persist together.

The smallest alternative is to preserve the existing sort state only for the current app session/navigation cycle. Lift or retain the current sort configuration so that leaving Expenditure Categories and returning does not reset it. Do not introduce localStorage, database storage, URL parameters, or permanent preferences unless you have evidence that users need cross-session persistence. Preserve just the existing pair of values, conceptually:
- active sort column
- sort direction
The existing filters should continue to use that same sort state. A full browser refresh can still return the table to its current default order. That is enough to make the two kinds of in-app switching behave consistently without creating a new long-term preference system.

----------
### Repair 8 — commit record
[Raised by Chenxi - MAS Core 65.0%, Housing & Utilities 24.8% and Food 21.1% sit in the same column, but they are figures at different levels (the MAS Core figure is the coverage of a policy basket)]

- Commit: `053bf1f`
feat(cpi): add clarification tooltip for MAS Core index
- AI Studio's message: Include an informational tooltip on the MAS Core inflation index row to explain its specific policy basket coverage and prevent misinterpretation of its weight. Update the Tooltip component to support custom aria-labels for better accessibility.
- Finding: I looked at the weights. MAS Core 65.0%, Housing & Utilities 24.8% and Food 21.1% sit in the same column, but they are figures at different levels (the MAS Core figure is the coverage of a policy basket). Shown side by side, they read as if they should be added together, and the indentation is not obvious.
- Heuristic: H4 - Consistency and Standards.	
- Severity: 2 - driven by the risk of misreading. It is easy to misunderstand how the weights are built and to compare or add figures that are not at the same level, even though some indentation exists.
- Repair: Weights at different levels are clearly separated or labelled visually, so users do not add or compare figures that belong to different levels.
- Raised by: Chenxi

Prompt:
Fix ONLY the MAS Core Inflation Index row in the Expenditure Categories table.

CURRENT VERIFIED PROBLEM

The rendered UI still shows only:

MAS Core Inflation Index
MAS_CORE · Policy

There is NO visible information icon.

The previous tooltip changes have therefore NOT been implemented in the actual rendered category row.

Do not merely create a tooltip component or tooltip text.

You MUST insert a visible information-button trigger directly into the JSX/component that renders the category name:

MAS Core Inflation Index ⓘ
MAS_CORE · Policy

--------------------------------------------------
1. FIND THE ACTUAL ROW RENDERER
--------------------------------------------------

Find the component or JSX that currently renders:

MAS Core Inflation Index

and underneath it:

MAS_CORE · Policy

Make the change THERE.

Do not edit:
- Basket Weight header
- global Help & Guide
- another tooltip elsewhere
- an unused component
- a data definition that is not rendered

The information icon must appear immediately beside the visible text:

MAS Core Inflation Index

--------------------------------------------------
2. RETAIN EXISTING NAMING
--------------------------------------------------

Keep exactly:

MAS Core Inflation Index
MAS_CORE
Policy

Do not rename any of them.

The final visible row should look conceptually like:

MAS Core Inflation Index  ⓘ
MAS_CORE · Policy

--------------------------------------------------
3. ADD A REAL VISIBLE BUTTON
--------------------------------------------------

Immediately after the visible text “MAS Core Inflation Index”, render a small information button.

Conceptually:

<span className="category-title">
  MAS Core Inflation Index

  <button
    type="button"
    aria-label="About MAS Core Inflation Index policy basket coverage"
    className="info-button"
  >
    ⓘ
  </button>
</span>

Use the existing Info icon component if the project already uses one.

For example, if lucide-react is already used:

<Info size={14} />

Do NOT install a new dependency.

IMPORTANT:
The button/icon must always be visible.
Do not make the icon appear only after hover.

--------------------------------------------------
4. ONLY SHOW THIS ICON FOR MAS_CORE
--------------------------------------------------

Use the existing category identifier.

Conceptually:

{item.code === "MAS_CORE" && (
  <Tooltip>
    ...
  </Tooltip>
)}

Adapt `item.code` to the actual data field in this project.

Do not hard-code the tooltip onto every row.

--------------------------------------------------
5. TOOLTIP TEXT
--------------------------------------------------

On hover, focus, or click/tap, show:

“MAS Core Inflation Index represents coverage of the MAS Core policy basket. It is not an individual expenditure-category basket weight and should not be added to category weights such as Food or Housing & Utilities.”

--------------------------------------------------
6. IMPLEMENT DIRECTLY IN THE ROW
--------------------------------------------------

If the project already contains a Tooltip component, use it around the visible info button.

Conceptually:

<Tooltip>
  <TooltipTrigger asChild>
    <button
      type="button"
      aria-label="About MAS Core Inflation Index policy basket coverage"
      className="info-button"
    >
      <Info size={14} />
    </button>
  </TooltipTrigger>

  <TooltipContent>
    MAS Core Inflation Index represents coverage of the MAS Core policy basket.
    It is not an individual expenditure-category basket weight and should not
    be added to category weights such as Food or Housing & Utilities.
  </TooltipContent>
</Tooltip>

If the project does NOT already have a tooltip component, implement a simple
accessible inline popover using the project's existing UI patterns.

Do not add a package.

--------------------------------------------------
7. DO NOT CHANGE THE DATA
--------------------------------------------------

This repair must NOT change:

- MAS Core numerical value
- Basket Weight value
- sorting
- filtering
- category hierarchy
- category names
- MAS_CORE code
- Policy metadata

This is a presentation-only repair.

--------------------------------------------------
8. VISUAL REQUIREMENT
--------------------------------------------------

After the repair, BEFORE any hover occurs, I must visibly see:

MAS Core Inflation Index  [info icon]
MAS_CORE · Policy

If there is no visible info icon beside “MAS Core Inflation Index”, the repair has failed.

The icon should:
- be small;
- align vertically with the category name;
- have a small gap from the text;
- not push the table column significantly wider.

--------------------------------------------------
9. ACCEPTANCE TEST
--------------------------------------------------

Open:

Expenditure Categories → Key Expenditure Categories & Basket Breakdown

Locate MAS Core Inflation Index.

PASS only if:

1. “MAS Core Inflation Index” remains unchanged.
2. “MAS_CORE · Policy” remains unchanged.
3. A visible information icon appears immediately beside “MAS Core Inflation Index”.
4. Hovering the icon shows the tooltip.
5. Keyboard focus shows/accesses the same explanation.
6. Clicking/tapping exposes the explanation.
7. Food, Housing & Utilities and other rows do NOT receive this tooltip.
8. Basket Weight values remain unchanged.
9. Sorting still works.

Also confirm:
- Disqus unchanged
- privacy notice unchanged
- /api/health unchanged

Make no unrelated changes.

##### Agent Argument: I rejected the Agent's argument as I find that it could break the minimalist heuristic and further hierarchy and indentation levels will create more visual challenges. I also do not agree to rename the label to "Coverage" as it should rightly show as MAS Core Inflation Index. Instead, I put a a small contextual tooltip hover over MAS Core Inflation Index Coverage to explain this is coverage of policy basket.
Your repair addresses the actual finding, but it is too vague to control the implementation. The problem is not simply that the indentation is weak; it is that 65.0% for MAS Core does not mean the same thing as 24.8% for Housing & Utilities or 21.1% for Food, yet the table presents all three as comparable values under “Basket Weight.” So “clearly separated or labelled visually” points in the right direction, but AI Studio could interpret that as adding more indentation, colours, borders, group boxes, or even restructuring the whole table. Your evidence only requires users to understand that MAS Core is a different level/type of percentage.

This is correctly a Screen problem, but your finding is missing its heuristic. No new backend data appears necessary; the issue is how existing figures are labelled and grouped. I would classify it primarily as H2 — Match Between System and the Real World, because the table does not make the real-world relationship between a policy/index coverage figure and expenditure-category basket weights sufficiently clear. H6 could also be argued, but H2 is stronger here. Also correct the duplicated wording “Screen. TScreen.”

The repair could weaken H8 — Aesthetic and Minimalist Design. If you solve this by adding multiple badges, explanatory paragraphs, coloured bands, indentation levels, and legends, the table may become harder to scan. A second risk is H4 — Consistency and Standards if only MAS Core is given an unusual visual treatment without explaining what that treatment means. The distinction needs to be clear, but not visually heavy.

The smallest alternative is to explicitly relabel the different type of percentage rather than redesign the hierarchy. I would keep the table structure and category rows intact, but change the presentation of the MAS Core figure so it does not look like an ordinary category weight. For example:
- MAS Core Inflation Index — Coverage: 65.0%
- Housing & Utilities — 24.8%
- Food — 21.1%
You could add a small muted label such as “Coverage” or “Index coverage” next to MAS Core’s percentage, while leaving genuine expenditure basket weights unchanged. If several rows are policy/index-level figures, apply the same label consistently to all of them. That is smaller and more precise than introducing a new hierarchy system.

-----

### Repair 9 — commit record
[Raised by Chenxi - on the Categories page, in the search box]

- Commit: `505cfff`
feat: add search fuzzy matching for categories
- AI Studio's message: Implement a string normalization and scoring algorithm to enable fuzzy searching for CPI categories within the table.
- Finding: I typed "house" looking for Housing & Utilities. It returned "No expenditure categories matched 'house'". The search only matches exact text, so "house" does not match "housing".
- Heuristic: H7 - Flexibility and Efficiency of Use.	
- Severity: 1 - driven by how easily users work around it. The no-result message is clear, and typing the full word finds the category, so the workaround is simple.
- Repair: The search matches word stems or close spellings, or, when nothing matches, suggests the closest category, such as "Did you mean Housing & Utilities?".
- Raised by: Chenxi


##### Agent Argument: I agree with Agent's argument for smallest alternative to leave normal search unchanged and add a conservative zero-results suggestion.
Your repair addresses the problem you actually observed, but it is broader than the evidence supports. The evidence establishes one narrow failure: a reasonable variant, “house,” does not retrieve “Housing & Utilities.” That supports making search a little more tolerant. It does not establish that the whole search needs general stemming, fuzzy matching, typo correction, and suggestion ranking. I do not have a strong reason to doubt that a more tolerant search would help; my concern is scope. For a Severity 1 issue, implementing a general fuzzy-search system would be disproportionate.

This is reasonably classified as a Screen/front-end problem, and the repair belongs there. The category already exists and no new CPI data is needed. The problem is the matching logic used by the search control. Strictly speaking, it is interaction logic rather than purely visual presentation, but under your Screen/System distinction, Screen is defensible because it can be repaired entirely in the client-side search behaviour. Do not alter the category dataset or API just to fix this.

The repair could weaken H5 — Error Prevention. Broad fuzzy matching can produce misleading matches. For example, a short or ambiguous query might be considered “close enough” to an unrelated category, causing the user to think the system found what they intended. It could also weaken H1 if the search silently substitutes a different term without telling the user. Any approximate result therefore needs to be clearly presented as a suggestion, not treated as an exact match.

The smallest alternative is to leave normal search unchanged and add a conservative zero-results suggestion. When the existing search produces no exact/normal matches, run a limited comparison against the known category names. For an obvious variant such as house, display:
No exact matches for “house”. Did you mean Housing & Utilities?
The user can then click the suggestion. Do not automatically replace their query or show a long list of fuzzy matches. This solves the demonstrated problem while preserving the predictable search behaviour that already works.

-----

### Repair 10 — commit record
[Raised by Me(Jo) - At Personal Simulator Tab, selected profile does not show different colour or texture to indicate which profile I am navigating]

- Commit: `086d618`
feat: track active preset in spending simulator
- AI Studio's message: Add active Preset state to highlight the currently selected spending category preset and reset it when manual adjustments are made.
- Finding: In the Personal Inflation Rate Simulator, the Profile Presets. When I select each profile, it does not colour to indicate which profile I am at
- Heuristic: H1 - Visibility of System Status.	
- Severity: 2 - This would allow clearer indication to user which profile are they simulating
- Repair: The Profile Tab selected to work on will have a clear coloured highlight as indicator
- Raised by: Me (Jo)

PROMPT:
Make ONE narrowly scoped front-end usability repair to:

Personal Inflation Rate Simulator → Profile Presets.

PROBLEM

When the user clicks a Profile Preset, the preset values are applied, but there is no visible indication showing which preset is currently active.

The app also should not keep a preset highlighted after the user manually changes a slider so that the current values no longer match that preset.

REPAIR GOAL

Add a clear active/selected visual state for the preset whose values currently match the applied simulator weights.

Do NOT create a new profile system.

Do NOT add backend state.

Do NOT change the simulator calculation.

--------------------------------------------------
1. ADD A SMALL ACTIVE PRESET STATE
--------------------------------------------------

Use the existing preset buttons and existing preset data.

Track only which preset is currently active.

Conceptually:

const [activePreset, setActivePreset] = useState(null);

Adapt this to the project’s existing component and variable names.

Do NOT create a second simulator weight state.

Do NOT duplicate preset data.

--------------------------------------------------
2. WHEN A PRESET IS CLICKED
--------------------------------------------------

Keep the existing preset click behaviour exactly as it is.

After the existing preset values are applied, record the selected preset as active.

Conceptually:

const handlePresetClick = (preset) => {
  // KEEP existing logic that applies preset values
  applyPreset(preset);

  setActivePreset(preset.id);
};

IMPORTANT:
Do not rewrite applyPreset or the existing simulator update logic.

Only add the active-state assignment after the existing preset action succeeds.

--------------------------------------------------
3. VISUAL ACTIVE STATE
--------------------------------------------------

When a preset is active, make it visually distinct using the SAME selected-control visual language already used elsewhere in the app.

Use only subtle emphasis such as:
- slightly stronger background;
- slightly stronger border;
- semibold/bold text;
- slightly stronger text colour.

Do NOT create a completely new visual style.

Do NOT change button dimensions.

Do NOT cause layout shift.

Conceptually:

className={
  activePreset === preset.id
    ? "existing-preset-class active-preset-class"
    : "existing-preset-class"
}

If Tailwind is already used, use equivalent existing classes.

--------------------------------------------------
4. ACCESSIBILITY
--------------------------------------------------

If the presets are buttons, set:

aria-pressed={activePreset === preset.id}

The active button should expose:

aria-pressed="true"

All inactive preset buttons should expose:

aria-pressed="false"

Do not add a new accessibility library.

--------------------------------------------------
5. CLEAR THE ACTIVE STATE WHEN USER MANUALLY CHANGES A SLIDER
--------------------------------------------------

This is important.

If the user manually changes any category slider and the resulting values no longer match the active preset:

clear the active preset state.

Conceptually:

setActivePreset(null);

Do NOT leave a preset highlighted if the user has modified the spending mix away from that preset.

IMPORTANT:
Do not clear the active state during the preset application itself if the preset application internally updates several sliders.

Only clear the active preset for genuine manual slider edits by the user.

--------------------------------------------------
6. SAFEST IMPLEMENTATION PATTERN
--------------------------------------------------

Prefer this simple behaviour:

- preset button click:
  apply existing preset values
  set activePreset

- manual slider edit:
  keep existing slider update behaviour
  set activePreset(null)

Do NOT add deep object-comparison logic unless the current code already has a reliable way to compare preset values.

Do NOT continuously recalculate preset matching unless necessary.

The goal is simply:
- clicked preset = active;
- manual slider change = no active preset.

--------------------------------------------------
7. DO NOT CHANGE SIMULATOR LOGIC
--------------------------------------------------

Do NOT change:
- CPI calculations;
- household spending calculations;
- inflation formula;
- simulation output;
- category weights;
- preset values;
- slider ranges;
- Reset Weights behaviour;
- validation logic;
- result cards.

This repair must not affect calculation results.

--------------------------------------------------
8. RESET BEHAVIOUR
--------------------------------------------------

Keep the existing Reset Weights behaviour.

If Reset Weights restores one of the named preset profiles exactly, only highlight that preset if the current app already identifies that preset explicitly.

Otherwise, clear activePreset on Reset.

Do not infer a preset unless the existing code already knows which preset is being restored.

--------------------------------------------------
9. ACCEPTANCE TEST
--------------------------------------------------

TEST A — SELECT PRESET

Click the first profile preset.

EXPECTED:
- existing preset values are applied exactly as before;
- only that preset becomes visually highlighted;
- aria-pressed="true" on that preset;
- other presets remain unhighlighted.

TEST B — SWITCH PRESET

Click another preset.

EXPECTED:
- first preset returns to normal styling;
- second preset becomes the only highlighted preset;
- new preset values are applied as before.

TEST C — MANUAL CHANGE

With a preset active, manually move one category slider.

EXPECTED:
- slider changes as it already does;
- active preset highlight disappears;
- all preset buttons return to neutral styling;
- no simulator calculation logic changes.

TEST D — RESELECT PRESET

Click the same preset again.

EXPECTED:
- its preset values are reapplied;
- its highlight returns.

TEST E — CALCULATION REGRESSION

Run the simulator before and after this repair using the same preset and same inputs.

EXPECTED:
- the simulation result is identical.

--------------------------------------------------
10. STRICT SCOPE
--------------------------------------------------

ONLY change:
- preset active state;
- preset visual state;
- aria-pressed;
- clearing the active state after manual slider adjustment.

DO NOT change:
- simulator formulas;
- CPI data;
- category data;
- preset values;
- slider behaviour;
- navigation;
- Expenditure Categories;
- Historical Ledger;
- Overview & Trends;
- Help & Guide;
- Export;
- API Health;
- responsive layout;
- Disqus;
- privacy notice;
- /api/health.

Do not add dependencies.

Make no unrelated changes.

##### Agent Argument: I agree with Agent's argument for smallest alternative to add one clear active state to the preset that currently matches the applied values, using the app’s existing selected-control styling.

Your repair addresses the observed lack of feedback, but it assumes a preset behaves like a persistent “profile tab.” Your evidence establishes that clicking a preset gives no visible indication of which preset was just applied. It does not yet establish that the user remains “in” that profile afterwards. If the preset simply loads a set of spending weights and the user then manually changes a slider, keeping that preset highlighted could actually become misleading. The screen would say, for example, “Family” is active even though the current values no longer match the Family preset. So the repair needs to define whether the highlight means “last preset clicked” or “current values still match this preset.” The latter is safer. Also, your six-line finding is currently missing the explicit heuristic and severity. This most naturally fits H1 — Visibility of System Status.

It is still a Screen/front-end issue, but it is not purely a styling problem. Your own code inspection says the application currently does not record which preset was chosen. That means changing only CSS cannot reliably fix it; the front end needs a small piece of selection state. No backend/API change is required, so “Screen” remains defensible. The repair should stay limited to the preset controls and their client-side state, not change the preset data, simulator formula, or routes.

The repair could break H1 itself if the highlight becomes stale. Suppose the user selects Family, sees it highlighted, and then changes Housing & Utilities manually. If Family stays highlighted, the interface is now communicating a system state that is no longer true. It could also weaken H4 — Consistency and Standards if the new active colour looks completely different from the selected-state styling already used elsewhere in your app. So adding colour alone is not enough; its meaning has to remain accurate.

The smallest alternative is to add one clear active state to the preset that currently matches the applied values, using the app’s existing selected-control styling. When a preset is clicked, mark that preset as active and give it the same kind of selected treatment already used elsewhere—e.g. slightly stronger background/border/text, not a new visual language. Add aria-pressed="true" to the active preset if these are buttons. Most importantly, if the user manually changes a slider so the values no longer match the preset, clear the preset highlight rather than leaving a false active state. Do not add a new profile system, persistence, or backend state.

-----

### Repair 11 — commit record
[Raised by Me (Jo) - Brower tab description say "FinancialHub Markets… stocks, crypto, futures, forex" for what is actually a Singapore CPI dashboard]

- Commit: `f72aad1`
chore: update app name and meta descriptions
- AI Studio's message: Rename the application to "Singapore CPI Terminal" and update the meta tags and metadata to accurately reflect the simulator's purpose.
- Finding: Brower tab description say "FinancialHub Markets… stocks, crypto, futures, forex" for what is actually a Singapore CPI dashboard.
- Heuristic: H2 - Match Between the System and the Real World.	
- Severity: 2, Frequency is high: Every visitor sees the tab title on every visit. Impact is low: It doesn't stop anyone from using the dashboard, since they can see it's a CPI tool once the page loads. Market impact is what lifts it above 1: When the link is shared on WhatsApp, Telegram or LinkedIn, the preview says "stocks, crypto, futures, forex", so people may not click, or may think it's a trading site. It also looks unfinished to a marker or employer.
- Repair: Change the page title and descriptions in index.html to match the product, e.g. title "Singapore CPI Dashboard" and description "Track Singapore's Consumer Price Index by category, see monthly trends, and estimate how inflation affects user's own household budget. Data from SingStat." Apply the same wording to the og:title and og:description tags so shared-link previews match.
- Raised by: Me (Jo)

PROMPT:
Make ONE narrowly scoped metadata repair to the existing Singapore CPI Terminal.

PROBLEM

The browser tab currently uses stale/incorrect FinancialHub wording such as:

“FinancialHub Markets… stocks, crypto, futures, forex”

This does not match the actual product.

The product should consistently identify itself as:

Singapore CPI Terminal

REPAIR

First locate the source of the current FinancialHub metadata.

Do NOT assume it is definitely in index.html.
Search the project for:

FinancialHub
stocks
crypto
futures
forex

Then update ONLY the stale page metadata that controls the browser tab and existing page description.

--------------------------------------------------
1. PAGE TITLE
--------------------------------------------------

Set the document/page title to exactly:

Singapore CPI Terminal

Do not rename the product to:
- Singapore CPI Dashboard
- FinancialHub
- any other name

The browser tab should display:

Singapore CPI Terminal

--------------------------------------------------
2. PAGE DESCRIPTION
--------------------------------------------------

Replace the stale FinancialHub description with:

Explore Singapore Consumer Price Index trends by category and estimate how inflation may affect household spending.

Keep the wording concise.

--------------------------------------------------
3. OPEN GRAPH METADATA
--------------------------------------------------

If the project ALREADY contains:

og:title
og:description

and those tags contain stale FinancialHub wording, update them to:

og:title:
Singapore CPI Terminal

og:description:
Explore Singapore Consumer Price Index trends by category and estimate how inflation may affect household spending.

IMPORTANT:
Do not create a new social-sharing metadata system if these tags do not already exist.

Only update existing stale metadata.

--------------------------------------------------
4. DO NOT CHANGE APPLICATION CONTENT
--------------------------------------------------

Do not change:
- visible app title/header;
- navigation;
- CPI data;
- charts;
- Personal Simulator;
- Expenditure Categories;
- Historical Ledger;
- Help & Guide;
- Export;
- API Health;
- responsive layout;
- Disqus;
- privacy notices;
- /api/health.

This is a metadata-only repair.

--------------------------------------------------
5. DO NOT ADD UNSUPPORTED CLAIMS
--------------------------------------------------

Do not add:
- stocks;
- crypto;
- forex;
- futures;
- investment claims;
- marketing language unrelated to CPI.

Do not mention data sources unless they are already correctly stated elsewhere in the application metadata.

--------------------------------------------------
6. ACCEPTANCE TEST
--------------------------------------------------

After the repair:

1. Open the app in a fresh browser tab.

EXPECTED:
Browser tab title says:

Singapore CPI Terminal

2. Run in browser console:

document.title

EXPECTED:

"Singapore CPI Terminal"

3. Inspect the document <head>.

EXPECTED:
The normal meta description contains:

Explore Singapore Consumer Price Index trends by category and estimate how inflation may affect household spending.

4. Search the rendered page metadata for:

FinancialHub
stocks
crypto
futures
forex

EXPECTED:
None of those stale FinancialHub references remain in the page title/description metadata.

5. If og:title and og:description already existed:

EXPECTED:
og:title = Singapore CPI Terminal

og:description = Explore Singapore Consumer Price Index trends by category and estimate how inflation may affect household spending.

6. Confirm no unrelated functionality changed.

Also verify:
- navigation still works;
- Personal Simulator still calculates normally;
- Disqus remains unchanged;
- privacy notices remain unchanged;
- /api/health still works.

Make no unrelated changes.

##### Agent Argument: I agree with Agent argument to fix with smallest alternative is to replace only the stale FinancialHub metadata with the application's existing product identity. Use: Title: Singapore CPI Terminal

Your repair addresses the real problem, but part of it goes beyond the evidence. The observed failure is that the browser tab says “FinancialHub Markets… stocks, crypto, futures, forex” even though the product is a Singapore CPI application. Changing the document title directly fixes that. I do not have a strong reason to doubt that change. However, your evidence does not yet show that search-result descriptions or shared-link previews are also wrong, so changing meta description, og:title, and og:description is a slightly broader repair. Also, I would challenge the proposed name “Singapore CPI Dashboard” because your application visibly identifies itself as “Singapore CPI Terminal.” Fixing one naming inconsistency by introducing another would be unnecessary.

This is reasonably a Screen/front-end issue, but it is specifically page metadata rather than an in-page visual element. The routes, CPI data, calculations, and backend are unaffected. The browser gets the incorrect identity from the HTML document metadata, so the repair belongs entirely in the front-end document/head configuration. Your statement that it is necessarily a “one-file fix in index.html” is a little too confident, though: depending on how the app is built, the title or metadata might be generated from another component, framework configuration, or SEO helper. The implementation should first locate the source of the existing FinancialHub Markets metadata rather than assuming the file.

The repair could weaken H4 — Consistency and Standards. Your application currently calls itself Singapore CPI Terminal. If the browser tab becomes Singapore CPI Dashboard, users would see two different product names for the same application. Likewise, if Open Graph metadata uses one name while the visible header uses another, you replace the current irrelevant metadata with inconsistent metadata. Keep one product identity everywhere. There is also no need to add promotional or unsupported wording to the description simply because metadata is being edited.

The smallest alternative is to replace only the stale FinancialHub metadata with the application's existing product identity. I would use:
Title: Singapore CPI Terminal
Description: Explore Singapore Consumer Price Index trends by category and estimate how inflation may affect household spending.
If og:title and og:description already exist and currently contain the stale FinancialHub text, update those same tags to match. If they do not currently exist, your finding does not require creating a new social-preview system. This keeps the repair directly tied to the stale-template problem and avoids renaming the product.

-----

# PROMPTS.md - [AI Prompt Log: Singapore CPI Dashboard Integration]
**Student:** [Jo Yeong Wan Wah] · **Course:** MGMT 6110 · **Problem Set 2**
**User sentence:** A user opens this screen to the Singapore CPI Dashboard Integration, and knows it worked when they see a fully dynamic, real-time chart or metric displaying the latest Singapore Consumer Price Index (CPI) data fetched from the official SingStat API, alongside a clear attribution footnote in the footer, without any hardcoded mock data.
**Live link:** https://mgmt-6110-week-2-cpi-8ix1.vercel.app/
# 

## 1. Initial System Prompt
**Intent:** Establish the serverless project architecture, error guardrails, and Vercel environment constraints.

```text
[Pasted the full initial prompt here: "ROLE: You are a senior full-stack developer... CONTEXT: Deployed on Vercel from GitHub..."]
```
**Outcome:** The AI generated the initial structure for `api/cpi.js` and `api/health.js`, and advised setting up the `SINGSTAT_API_KEY` environment variable.

---
## 2. Failed Prompts & Debugging Cycles

### Cycle A: Environment Variable & Vercel Prefix Clarification
*   **Intent:** Identify the correct environment variable naming strategy to pass the prompt's backend guardrail.
*   **Context:** The SingStat Table Builder API is publicly accessible, but the prompt mandates an upstream credential check to protect project architecture. 
*   **Debugging Query:** *“What is the Environment Variable in Vercel for the above prompts?”*
*   **Outcome:** Established `SINGSTAT_API_KEY` as a required Vercel environment variable using placeholder content (`public_access`). The AI highlighted a critical security risk: **never prefix the variable with `VITE_`** (`VITE_SINGSTAT_API_KEY`), as doing so forces Vite to compile the variable directly into the client-side browser bundle, violating the strict backend isolation guardrail.

### Cycle B: HTML Response Parsing Failure
*   **Intent:** Resolve the network failure crash when the upstream server goes down.
*   **The Error Encountered:**
    ```text
    The SingStat service is currently unreachable due to a network connection failure.
    Unexpected token '<', "<!doctype "... is not valid JSON
    ```
*   **Debugging Query:** *“I am getting an error when testing: 'Unexpected token '<', "<!doctype "... is not valid JSON'. The SingStat service is failing or returning an HTML error page. Update the serverless functions to handle this without crashing.”*
*   **Outcome:** The AI updated the route logic by adding an explicit check for `response.ok` before parsing `.json()`, successfully intercepting the HTML error payload and transforming it into a clean `502 Upstream Unreachable` JSON payload.

---
## 3. Manual Refinements (Hand-Coding)
*   **Timestamp/Phase:** Post-generation cleanup.
*   **Action Taken:** Manually verified that the environment variable checking block in `api/cpi.js` correctly evaluates both missing values and the string literal `"undefined"` to align perfectly with Vercel's preview deployment behavior.

---






