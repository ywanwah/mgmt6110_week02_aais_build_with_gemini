export interface FaqItem {
  id: string;
  category: 'Personal Finances & Savings' | 'Understanding CPI' | 'Policy & Economic Concepts' | 'App & Calculations';
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  keyTakeaway: string;
  relatedTerms?: string[];
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'inflation-savings',
    category: 'Personal Finances & Savings',
    question: 'How does inflation affect my savings and cash reserves?',
    shortAnswer: 'Inflation steadily diminishes the "real" purchasing power of cash sitting in low-interest accounts, meaning $100 today buys fewer goods and services in the future.',
    detailedAnswer: 'When prices of consumer goods and services rise, each dollar of savings can purchase a smaller quantity of goods than before. For instance, if headline inflation is 2.3% per year and your standard bank savings account yields 0.5%, your real (inflation-adjusted) return is -1.8% annually. Over 5 to 10 years, this invisible "inflation tax" significantly erodes cash reserves unless funds are deployed into assets, Singapore Savings Bonds (SSBs), CPF Special Accounts, or dividend investments that keep pace with or exceed inflation.',
    keyTakeaway: 'Cash stored below the prevailing inflation rate loses purchasing power over time. Compare your nominal savings yield against the YoY inflation rate to find your real net return.',
    relatedTerms: ['Real Purchasing Power', 'Headline CPI', 'Base Year']
  },
  {
    id: 'cpi-personal-experience',
    category: 'Understanding CPI',
    question: 'Why does the official CPI differ from my personal experience at the store?',
    shortAnswer: 'The official CPI is a statistical weighted average of all Singapore resident households, whereas your personal lifestyle, commuting choices, and family stage create a unique spending pattern.',
    detailedAnswer: 'The national Consumer Price Index published by SingStat represents an aggregate national average across all income brackets and household profiles derived from the quinquennial Household Expenditure Survey (HES 2023). For example, Housing Accommodation accounts for ~25% and Private Transport accounts for ~14% of the national basket. If you rent a private condo or own a car requiring COE renewals and petrol, your actual inflation will feel much higher when those sectors spike. Conversely, if you reside in a fully paid-off HDB flat and commute exclusively via MRT/bus, your lived inflation may be lower than the headline print. Use the "Personal Simulator" tab in this app to see your custom inflation rate.',
    keyTakeaway: 'No single family perfectly matches the statistical average Singapore household. Discretionary spending choices directly determine your unique lived inflation rate.',
    relatedTerms: ['Basket Weight', 'Personal Inflation Rate', 'Variance vs National']
  },
  {
    id: 'cpi-vs-cost-of-living',
    category: 'Understanding CPI',
    question: 'Is the CPI the same thing as the "Cost of Living"?',
    shortAnswer: 'Not strictly. CPI measures the pure price change of a fixed consumption basket over time, whereas cost of living encompasses lifestyle shifts, substitution, taxes, and family requirements.',
    detailedAnswer: 'CPI is a fixed-weight price index designed to isolate pure price inflation by holding the quality and quantity of items constant. In contrast, "Cost of Living" reflects how much income is required to maintain a specific standard of living, allowing consumers to substitute cheaper products when one becomes expensive (e.g., swapping fresh beef for chicken or dining at hawker centres instead of restaurants). Cost of living also fluctuates when family situations change, such as having a child, caring for elderly parents, or taking on a mortgage.',
    keyTakeaway: 'CPI tracks price tag movements on an identical basket; your actual cost of living also reflects substitution behavior, taxes, subsidies (like CDC vouchers), and life stages.',
    relatedTerms: ['Consumer Price Index', 'Household Economics', 'Personal Inflation']
  },
  {
    id: 'disinflation-vs-deflation',
    category: 'Policy & Economic Concepts',
    question: 'If inflation drops from 4.5% to 2.3%, why are prices still not going down?',
    shortAnswer: 'A decrease in the inflation rate means prices are still rising, just at a slower speed (disinflation). Prices only decrease during outright deflation (negative inflation).',
    detailedAnswer: 'It is common to confuse the rate of inflation with the absolute price level. Think of inflation like the speedometer in a car: dropping your speed from 80 km/h to 40 km/h slows your rate of movement, but the car is still moving forward. Similarly, when YoY inflation moderates from 4.5% to 2.3%, price tags continue climbing, but at a gentler trajectory. For prices to actually drop back to historical levels, the economy would need to experience deflation (e.g., -1.0% YoY).',
    keyTakeaway: 'Disinflation = slower price increases. Deflation = falling price tags. When news headlines state that "inflation is falling", prices are usually still higher than last year.',
    relatedTerms: ['Index Level', 'YoY Inflation Rate', 'MoM Velocity']
  },
  {
    id: 'mas-core-vs-headline',
    category: 'Policy & Economic Concepts',
    question: 'Why does the Monetary Authority of Singapore (MAS) focus on Core Inflation instead of Headline CPI?',
    shortAnswer: 'Accommodation and private car transport are excluded from Core Inflation because they are heavily influenced by government administrative policies rather than everyday consumer demand.',
    detailedAnswer: 'MAS uses Core Inflation as its operational compass when setting monetary policy (S$NEER). Accommodation is excluded because owner-occupied housing includes large "imputed rents"—an accounting calculation of what homeowners would pay if renting their own homes—which does not involve actual cash outlays for 85%+ of Singaporean resident homeowners. Private road transport is excluded because car ownership and COE quota premiums swing dramatically based on government vehicle bidding supply. Stripping both out gives MAS a clearer picture of domestic business costs and consumer demand pressure (food, utilities, healthcare, retail).',
    keyTakeaway: 'MAS Core Inflation gauges persistent domestic cost pressures, filtering out volatile COE premiums and non-cash owner-occupied imputed rents.',
    relatedTerms: ['MAS Core Inflation', 'Headline CPI', 'S$NEER Policy']
  },
  {
    id: 'how-to-beat-inflation',
    category: 'Personal Finances & Savings',
    question: 'What practical steps can Singapore households take to offset rising living costs?',
    shortAnswer: 'Focus on optimizing high-weight household budget categories, maximizing cash yields, and taking full advantage of government support schemes.',
    detailedAnswer: 'Household strategies include:\n1. Target High-Impact Spending: Food & dining (~21%) and utilities (~4%) are frequent outlays. Cooking at home or dining at social enterprise hawker centres yields immediate savings.\n2. Utilize Government Schemes: Fully redeem Community Development Council (CDC) vouchers, U-Save utility rebates, and MediSave top-ups provided in government Budget packages.\n3. Optimize Idle Cash: Move emergency reserves from standard checking accounts to higher-yield vehicles such as Singapore Savings Bonds (SSB), Treasury bills (T-bills), or high-interest salary-crediting accounts.\n4. CPF Compounding: Ordinary Account (2.5%) and Special Account (4.0%+) offer guaranteed, risk-free compounding that often outpaces medium-term inflation.',
    keyTakeaway: 'Inflation is managed through a combination of conscious budget allocation, utilizing official support schemes, and ensuring cash reserves earn competitive yields.',
    relatedTerms: ['Additional Monthly Cost', 'Personal Inflation Rate', 'Real Purchasing Power']
  },
  {
    id: 'singstat-data-frequency',
    category: 'App & Calculations',
    question: 'How frequently does SingStat update the CPI data in this terminal?',
    shortAnswer: 'SingStat publishes new CPI records on a monthly basis, usually around the 23rd of each following month.',
    detailedAnswer: 'The Singapore Department of Statistics (SingStat) releases the official Consumer Price Index monthly report and updates TableBuilder Resource M213751 approximately 23 to 25 days following the close of the reporting month. For instance, data for August is released in late September. This terminal checks the live SingStat API to display the most recently verified monthly release (vintage) with base year 2024=100.0.',
    keyTakeaway: 'Updates occur monthly around the 23rd. The vintage badge in the top stats bar displays the exact reporting month currently reflected.',
    relatedTerms: ['TableBuilder Resource M213751', 'Base Year', 'Data Vintage']
  },
  {
    id: 'personal-calculator-math',
    category: 'App & Calculations',
    question: 'How does the Personal Inflation Simulator calculate my personalized rate?',
    shortAnswer: 'It calculates a custom mathematically-weighted sum: multiplying each category’s annual inflation rate by your unique percentage budget allocation.',
    detailedAnswer: 'The formula calculates: Personal Rate = Σ (Category Weight % × Category YoY Inflation Rate %). For example, if you allocate 40% of your budget to Food (experiencing +2.8% inflation) and 60% to Transport (experiencing +1.5% inflation), your weighted personal rate is (0.40 × 2.8) + (0.60 × 1.5) = 1.12 + 0.90 = +2.02%. The simulator then compares this to the national headline rate (+2.30%) and calculates the exact extra SGD needed per month to preserve your purchasing power.',
    keyTakeaway: 'The simulator replaces national average weights with your own personal household budget split, revealing your authentic cost-of-living shift.',
    relatedTerms: ['Personal Inflation Rate', 'Variance vs National', 'Additional Monthly Cost']
  }
];
