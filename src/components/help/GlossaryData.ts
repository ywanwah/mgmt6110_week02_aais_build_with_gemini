export interface GlossaryItem {
  id: string;
  term: string;
  category: 'CPI & Inflation Metrics' | 'Household Economics' | 'Policy & Governance' | 'Chart & Data Metrics';
  shortTooltip: string;
  definition: string;
  measures: string;
  interpretation: string;
  contextNote?: string;
  keywords: string[];
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'cpi',
    term: 'Consumer Price Index (CPI)',
    category: 'CPI & Inflation Metrics',
    shortTooltip: 'A statistical measure tracking the average price change over time of a fixed basket of consumer goods and services commonly purchased by resident households in Singapore.',
    definition: 'The Consumer Price Index (CPI) measures the average price level changes of a representative basket of goods and services purchased by households in Singapore. It is compiled by the Singapore Department of Statistics (SingStat).',
    measures: 'The aggregate changes in out-of-pocket prices paid by resident households across essential goods and services such as food, transport, housing, and healthcare.',
    interpretation: 'An increasing CPI indicates an expansion in the average price level of consumer goods, meaning everyday expenses are rising. A declining CPI indicates price contractions across the basket. This should be interpreted in relation to household wage growth and nominal income expansion.',
    contextNote: 'A higher CPI is not inherently negative if incomes rise faster, but rapid increases strain household real purchasing power.',
    keywords: ['cpi', 'consumer price index', 'inflation', 'prices', 'singstat', 'basket']
  },
  {
    id: 'headline-cpi',
    term: 'Headline CPI / All Items Index',
    category: 'CPI & Inflation Metrics',
    shortTooltip: 'The comprehensive all-inclusive index that tracks all goods and services across the economy, including volatile components like accommodation (rent/imputed rent) and private transport.',
    definition: 'Headline All Items CPI represents the entire consumer basket without exclusions. It incorporates all 10 major expenditure divisions including private road transport (cars, COE, petrol) and accommodation (housing rent and imputed rentals of owner-occupied homes).',
    measures: 'Overall inflation experienced by households, capturing all direct consumer spending areas regardless of price volatility.',
    interpretation: 'A higher headline number reflects broader cost-of-living increases across the total economy. A lower number indicates price moderation. Headline inflation often fluctuates more than core inflation due to global crude oil prices and domestic COE quotas.',
    contextNote: 'Headline CPI can be volatile due to government vehicle quotas (COE) and accommodation costs that do not involve immediate cash outlays for homeowners.',
    keywords: ['headline', 'all items', 'headline inflation', 'headline cpi', 'total']
  },
  {
    id: 'index-level',
    term: 'Index Level / Points (pts)',
    category: 'CPI & Inflation Metrics',
    shortTooltip: 'The numerical value expressing the current price level relative to the designated base period of 100.000 (currently Base Year 2024 = 100.0).',
    definition: 'An index number is an economic benchmark that reflects relative price changes against a fixed baseline year. For Singapore CPI, the base year is 2024, calibrated to 100.000.',
    measures: 'The cumulative percentage change in prices relative to the base year (2024). For example, an index of 103.334 represents a 3.334% net increase in basket prices since the 2024 baseline.',
    interpretation: 'Index points above 100.0 indicate prices have grown relative to the base year. Values below 100.0 indicate overall prices are lower than in 2024. Differences between consecutive months reveal short-term price momentum.',
    contextNote: 'Index levels are not dollar amounts; they represent relative price ratios standardized to 100.0.',
    keywords: ['index level', 'points', 'pts', 'index', 'level', '2024=100']
  },
  {
    id: 'base-year',
    term: 'Base Year (2024 = 100)',
    category: 'CPI & Inflation Metrics',
    shortTooltip: 'The benchmark reference year against which price movements in all subsequent months and years are mathematically compared. SingStat re-bases the CPI every 5 years.',
    definition: 'The base period is the reference anchor where the index value is set to exactly 100.000. SingStat periodically rebases the Singapore CPI every five years to reflect modern consumption patterns derived from the latest Household Expenditure Survey (HES 2023).',
    measures: 'The baseline expenditure weights and pricing standards for the entire basket.',
    interpretation: 'A recent base year ensures that new consumer habits (such as digital streaming, electric vehicles, and ride-hailing services) are appropriately weighted.',
    contextNote: 'Rebasing does not change underlying economic reality; it refreshes basket weighting to reflect contemporary household lifestyles.',
    keywords: ['base year', '2024=100', 'base period', 'rebase', 'hes']
  },
  {
    id: 'mom-change',
    term: 'Month-on-Month (MoM) Change / Velocity',
    category: 'CPI & Inflation Metrics',
    shortTooltip: 'The percentage or point difference in prices compared to the immediate preceding month, reflecting short-term price momentum and seasonality.',
    definition: 'Month-on-Month (MoM) change measures the price movement from one month to the next (e.g., July 2026 to August 2026).',
    measures: 'Short-term price velocity, immediate supply disruptions, seasonal promotions, or sudden utility tariff adjustments.',
    interpretation: 'A positive MoM (+0.62%) indicates prices accelerated over the last 30 days. A negative MoM indicates price decreases. Short-term MoM figures can be noisy due to festive seasons or school holidays and should be assessed alongside Year-on-Year trends.',
    contextNote: 'Single-month spikes often reverse in subsequent periods due to temporary promotions or holiday travel cycles.',
    keywords: ['mom', 'month-on-month', 'monthly', 'velocity', 'mom change', 'mom percent']
  },
  {
    id: 'yoy-inflation',
    term: 'Year-on-Year (YoY) Inflation Rate',
    category: 'CPI & Inflation Metrics',
    shortTooltip: 'The annual percentage price change compared with the exact same month of the previous calendar year, smoothing out regular seasonal fluctuations.',
    definition: 'Year-on-Year (YoY) inflation calculates the percentage price difference between the current month and the corresponding month twelve months earlier (e.g., August 2026 vs August 2025).',
    measures: 'The standard annual inflation rate experienced over a 12-month horizon, removing annual seasonality.',
    interpretation: 'A positive YoY rate (e.g., +2.30%) means everyday items cost 2.30% more than one year ago. A moderating rate (e.g., falling from 3.5% to 2.3%) indicates disinflation (prices are still rising, but at a slower pace). Negative YoY indicates deflation.',
    contextNote: 'YoY comparisons can be influenced by the "base effect" if prices in the comparison month one year prior were exceptionally high or low.',
    keywords: ['yoy', 'year-on-year', 'annual inflation', 'yoy rate', 'inflation rate']
  },
  {
    id: 'mas-core-inflation',
    term: 'MAS Core Inflation',
    category: 'Policy & Governance',
    shortTooltip: 'The preferred monetary policy gauge monitored by the Monetary Authority of Singapore, stripping out accommodation and private road transport.',
    definition: 'MAS Core Inflation is the central bank’s operational metric. It excludes accommodation (which is influenced by non-cash imputed rents) and private road transport (which is heavily driven by vehicle quotas and COE premiums).',
    measures: 'Underlying, persistent domestic inflation trends driven by consumer demand and commercial operating costs (such as food, retail, utilities, and domestic services).',
    interpretation: 'A higher core inflation reading may signal building domestic cost pressures that could prompt MAS to steepen the slope of the S$NEER exchange rate band to strengthen the Singapore dollar.',
    contextNote: 'MAS focuses on Core rather than Headline because accommodation and private cars are heavily governed by administrative policies (HDB policies and COE bidding) rather than underlying demand-pull pressures.',
    keywords: ['mas core', 'core inflation', 'mas', 'monetary authority', 'policy gauge', 'underlying']
  },
  {
    id: 'purchasing-power',
    term: 'Real Purchasing Power (Base $100 SGD)',
    category: 'Household Economics',
    shortTooltip: 'The real buying power of $100 Singapore dollars today compared to what $100 could purchase in the 2024 base year (computed as $100 / (CPI / 100)).',
    definition: 'Real purchasing power measures the quantity of goods and services that a unit of currency can buy after adjusting for changes in the price index.',
    measures: 'How much the real value of cash savings has eroded or expanded over time. At an index of 103.334, $100 SGD in 2024 buys approximately $96.77 worth of goods today.',
    interpretation: 'A lower purchasing power figure indicates that money buys fewer real items than during the base period. Users should evaluate whether their wage growth or investment returns outpace this erosion.',
    contextNote: 'Purchasing power erosion is standard in expanding economies; the critical factor is whether nominal wages rise at a faster pace.',
    keywords: ['purchasing power', 'real value', 'buying power', '100 sgd', 'erosion']
  },
  {
    id: 'basket-weight',
    term: 'Basket Weight (%)',
    category: 'Household Economics',
    shortTooltip: 'The proportion of total household spending allocated to a specific category out of 100% (or 10,000 basis points) according to the Household Expenditure Survey.',
    definition: 'Basket weights represent the relative expenditure significance of each consumption category in the average household budget. SingStat derives these weights from the quinquennial Household Expenditure Survey (HES).',
    measures: 'The impact a price shift in that category will exert on the national headline CPI number.',
    interpretation: 'A category with a high weight (e.g., Food & Dining Out at 21.1%) exerts a far greater impact on the headline CPI than a low-weighted category (e.g., Education at 6.1%), even if both experience the exact same percentage price hike.',
    contextNote: 'Your personal household spending may differ considerably from national average weights, which is why a personal inflation simulator is essential.',
    keywords: ['weight', 'basket weight', 'expenditure share', 'proportion', 'budget share']
  },
  {
    id: 'personal-inflation',
    term: 'Personal Inflation Rate',
    category: 'Household Economics',
    shortTooltip: 'An individual household’s tailored inflation rate, calculated by weighting specific category inflation rates by that household’s unique monthly spending patterns.',
    definition: 'The personal inflation rate recalculates price changes using your household’s actual spending distribution rather than the nationwide statistical average.',
    measures: 'The true change in everyday living costs experienced by your household based on how you allocate your budget across dining, housing, commute, and healthcare.',
    interpretation: 'If your personal rate exceeds the national headline CPI (+2.65% vs +2.30%), you spend a higher proportion of income on items experiencing above-average price spikes. If it is lower, your spending is concentrated in items with slower price growth.',
    contextNote: 'No single household matches the national average consumption basket perfectly; high-commute households or families with tuition fees often experience divergent rates.',
    keywords: ['personal inflation', 'simulator', 'custom inflation', 'household rate']
  },
  {
    id: 'variance-delta',
    term: 'Variance vs National (Delta)',
    category: 'Household Economics',
    shortTooltip: 'The mathematical difference between your simulated personal inflation rate and the official Singapore headline CPI benchmark.',
    definition: 'Variance expresses how much faster or slower your personalized living expenses are rising relative to the official national average.',
    measures: 'Budget divergence from the statistical benchmark. A +0.35% variance means your household costs are rising 0.35 percentage points faster per year than the median national basket.',
    interpretation: 'A positive delta suggests budgeting vigilance in high-inflation categories. A negative delta indicates your specific lifestyle is insulated from the primary drivers of national price increases.',
    contextNote: 'Divergence is largely driven by discretionary spending choices, household life stage, and property ownership status.',
    keywords: ['variance', 'delta', 'difference', 'divergence', 'vs national']
  },
  {
    id: 'extra-monthly-cost',
    term: 'Additional Cost to Maintain Living Standard',
    category: 'Household Economics',
    shortTooltip: 'The estimated extra Singapore Dollars (SGD) your household must spend each month simply to consume the identical basket of goods as one year ago.',
    definition: 'The monetary equivalent of annual inflation applied to your specified monthly expenditure. Calculated as: Monthly Budget × Personal Inflation Rate.',
    measures: 'The tangible dollar impact of price increases on your family wallet each month.',
    interpretation: 'A higher dollar figure highlights the amount of additional salary or savings return needed to avoid downgrading living standards.',
    contextNote: 'This calculation assumes your consumption volume stays constant; in practice, consumers often substitute expensive brands for affordable alternatives.',
    keywords: ['extra cost', 'additional monthly cost', 'maintain living standard', 'sgd per month']
  },
  {
    id: 'sneer-policy',
    term: 'MAS S$NEER Policy Framework',
    category: 'Policy & Governance',
    shortTooltip: 'The Singapore Dollar Nominal Effective Exchange Rate policy framework used by the Monetary Authority of Singapore to manage imported inflation and achieve price stability.',
    definition: 'Unlike typical central banks that use interest rates to steer the economy, Singapore manages the trade-weighted exchange rate (S$NEER) within an undisclosed policy band because Singapore is a small, highly trade-dependent economy.',
    measures: 'The foreign exchange strength of the Singapore Dollar against a trade-weighted basket of major trading partners currencies.',
    interpretation: 'A stronger S$NEER curbs imported inflation by making foreign food, energy, and manufactured goods cheaper in domestic currency terms.',
    contextNote: 'Exchange rate tightening helps stabilize domestic price levels, but can make domestic exports more expensive for overseas buyers.',
    keywords: ['sneer', 'exchange rate', 'monetary policy', 'mas policy', 'price stability']
  },
  {
    id: 'target-band',
    term: 'MAS Medium-Term Target Band (1.5% - 2.5%)',
    category: 'Policy & Governance',
    shortTooltip: 'The inflation rate range that the Monetary Authority of Singapore considers consistent with long-term sustainable economic growth and domestic price stability.',
    definition: 'The benchmark target corridor of 1.5% to 2.5% Core Inflation viewed by MAS as optimal for the Singapore economy. When core inflation falls comfortably in this band, policy is considered balanced.',
    measures: 'Policy alignment and macroeconomic stability.',
    interpretation: 'Readings inside 1.5%–2.5% indicate stable price conditions. Readings significantly above 2.5% indicate persistent inflation risks; readings below 1.5% may suggest economic stagnation.',
    contextNote: 'The band is an informal guiding corridor for medium-term price stability rather than a hard statutory ceiling.',
    keywords: ['target band', '1.5% - 2.5%', 'price stability', 'target range']
  },
  {
    id: 'volatility-drivers',
    term: 'Top Price Volatility Drivers',
    category: 'Chart & Data Metrics',
    shortTooltip: 'The specific consumption categories displaying the largest annual percentage price expansions or contractions across the national basket.',
    definition: 'The categories with the greatest absolute Year-on-Year percentage movements, highlighting where the most extreme upward or downward price shifts are concentrated.',
    measures: 'Category-level price volatility across the 10 major expenditure divisions.',
    interpretation: 'Identifying volatility drivers helps consumers understand whether inflation is broad-based across all sectors or driven by a few isolated categories like electricity or airfares.',
    contextNote: 'Volatile items often experience cyclical corrections when supply bottlenecks ease.',
    keywords: ['volatility drivers', 'price swings', 'top movers', 'drivers']
  },
  {
    id: 'net-expansion',
    term: 'Net Level Expansion',
    category: 'Chart & Data Metrics',
    shortTooltip: 'The total cumulative point and percentage increase of the CPI index from the start of the observed historical period to the most recent month.',
    definition: 'The total change in index points between the first data point (e.g. 100.599 in March 2025) and the latest reading (e.g. 103.334 in August 2026).',
    measures: 'Cumulative price creep across the multi-month window.',
    interpretation: 'Shows the aggregate upward climb in prices over the full 18-month duration.',
    contextNote: 'Calculated as: Latest Value minus Starting Value.',
    keywords: ['net expansion', 'net change', 'cumulative change', 'level expansion']
  },
  {
    id: 'run-rate',
    term: 'Avg Monthly Run Rate',
    category: 'Chart & Data Metrics',
    shortTooltip: 'The mathematical compound or arithmetic average monthly percentage price shift recorded across the tracked historical series.',
    definition: 'The annualized or monthly pacing rate showing the average monthly change in price levels over the observed timeline.',
    measures: 'The baseline monthly pace at which prices are expanding.',
    interpretation: 'A run rate around +0.18%/month translates to roughly 2.1% to 2.2% annual inflation, which is considered moderate and healthy for an advanced economy.',
    contextNote: 'Comparing the recent MoM change with the average run rate reveals whether recent price pressure is accelerating or cooling.',
    keywords: ['run rate', 'average run rate', 'monthly pace', 'avg monthly']
  },
  {
    id: 'range-high-low',
    term: '18-Month Range High & Low',
    category: 'Chart & Data Metrics',
    shortTooltip: 'The peak maximum and minimum index levels observed over the full 18-month historical tracking timeline.',
    definition: 'The lowest recorded index value and highest recorded index value during the historical data window.',
    measures: 'The historical price corridor and boundary extremes for the consumer basket.',
    interpretation: 'In an inflationary environment, the Range Low typically occurs at the beginning of the period, while the Range High occurs at or near the most recent month.',
    contextNote: 'If the range high occurred several months ago, it signifies that price levels have peaked and are beginning to retreat.',
    keywords: ['range low', 'range high', '18-month range', 'min', 'max']
  },
  {
    id: 'tablebuilder',
    term: 'SingStat TableBuilder Resource M213751',
    category: 'Policy & Governance',
    shortTooltip: 'The official open data API series maintained by the Singapore Department of Statistics that feeds authenticated CPI datasets to this application.',
    definition: 'Resource M213751 is the machine-readable data repository hosted on singstat.gov.sg containing monthly historical records of the Singapore Consumer Price Index (2024=100).',
    measures: 'Official government economic statistics for public research and transparent economic analysis.',
    interpretation: 'Data sourced from this table represents verified national statistics published by SingStat under the Singapore Open Data Licence.',
    contextNote: 'SingStat publishes new monthly data around the 23rd of every following month.',
    keywords: ['m213751', 'tablebuilder', 'singstat api', 'datasource', 'resource']
  }
];
