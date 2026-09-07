// TellerTicks Mock Data Engine — Single Source of Truth
// All types and data are defined in this file.

export type Platform = 'x' | 'telegram' | 'instagram' | 'facebook' | 'reddit' | 'youtube';
export type Scope = 'worldwide' | 'national' | 'statewise';
export type Persona = 'tech-policy' | 'genz-culture' | 'finance' | 'geopolitics';

export interface XMetrics { reposts: number; quotes: number; likes: number; views: number; }
export interface TelegramMetrics { views: number; forwards: number; replies: number; }
export interface InstagramMetrics { likes: number; views: number; saves: number; shares: number; }
export interface RedditMetrics { upvotes: number; comments: number; crossposts: number; }
export interface YouTubeMetrics { views: number; likes: number; comments: number; }
export interface FacebookMetrics { reactions: number; shares: number; comments: number; views: number; }

export type PlatformMetrics = XMetrics | TelegramMetrics | InstagramMetrics | RedditMetrics | YouTubeMetrics | FacebookMetrics;

export interface NetworkNode {
  id: string;
  handle: string;
  role: 'Originator' | 'Key Amplifier' | 'Bridge Node' | 'Community Hub';
  influenceScore: number;
  x: number; y: number;
  connections: string[];
}

export interface TrendDossier {
  narrativeEssay: string;
  catalystAccount: string;
  catalystTimestamp: string;
  emotionalBreakdown: {
    excitement: number; sarcasm: number; anxiety: number; supportive: number; outrage: number;
    timeline: Array<{ hour: string; excitement: number; sarcasm: number; anxiety: number; supportive: number; outrage: number; }>;
  };
  demographics: Array<{ ageGroup: string; engagement: number; }>;
  networkTopology: {
    originator: NetworkNode;
    amplifiers: NetworkNode[];
  };
}

export interface TrendItem {
  id: string;
  title: string;
  platform: Platform;
  scope: Scope[];
  personas: Persona[];
  rank: number;
  velocityScore: number;
  velocityLabel: string;
  summary: string;
  whyMatches?: string;
  platformMetrics: PlatformMetrics;
  timestamp: string;
  dossier: TrendDossier;
}

export interface InstagramReel {
  id: string;
  audioName: string;
  creator: string;
  uses: number;
  velocity: number;
  gradient: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  views: number;
  duration: string;
  gradient: string;
}

export interface FacebookVideo {
  id: string;
  title: string;
  page: string;
  views: number;
  reactions: number;
  gradient: string;
}

export interface PlatformSynthesis {
  platform: Platform | 'all';
  summary: string;
}

export interface PersonaConfig {
  id: Persona;
  title: string;
  description: string;
  icon: string;
  interestSegments: string[];
}

// 1. PERSONAS
export const PERSONAS: PersonaConfig[] = [
  {
    id: 'tech-policy',
    title: 'Tech & Policy Analyst',
    description: 'Focuses on global tech regulation, AI ethics, and data privacy.',
    icon: 'cpu',
    interestSegments: ['AI Regulation', 'Cybersecurity', 'Digital Rights']
  },
  {
    id: 'genz-culture',
    title: 'Gen-Z Culture Tracker',
    description: 'Tracks viral trends, digital subcultures, and creator economies.',
    icon: 'sparkles',
    interestSegments: ['Viral Memes', 'Creator Economy', 'Pop Culture']
  },
  {
    id: 'finance',
    title: 'Finance & Markets',
    description: 'Monitors macroeconomic shifts, crypto markets, and equity trends.',
    icon: 'line-chart',
    interestSegments: ['Crypto Markets', 'Central Bank Policy', 'Equity Analysis']
  },
  {
    id: 'geopolitics',
    title: 'Geopolitical Strategist',
    description: 'Analyzes international relations, trade corridors, and defense intel.',
    icon: 'globe',
    interestSegments: ['BRICS Dynamics', 'Trade Corridors', 'Defense Intel']
  }
];

// Helper to generate generic timelines
const generateTimeline = () => {
  return [0, 4, 8, 12, 16, 20, 24].map(h => ({
    hour: `${h}h`,
    excitement: Math.floor(Math.random() * 40),
    sarcasm: Math.floor(Math.random() * 30),
    anxiety: Math.floor(Math.random() * 30),
    supportive: Math.floor(Math.random() * 20),
    outrage: Math.floor(Math.random() * 20)
  }));
};

const generateDemographics = () => {
  return [
    { ageGroup: '13-17', engagement: Math.floor(Math.random() * 20) },
    { ageGroup: '18-24', engagement: Math.floor(Math.random() * 30 + 10) },
    { ageGroup: '25-34', engagement: Math.floor(Math.random() * 40 + 10) },
    { ageGroup: '35-44', engagement: Math.floor(Math.random() * 20) },
    { ageGroup: '45-54', engagement: Math.floor(Math.random() * 10) },
    { ageGroup: '55+', engagement: Math.floor(Math.random() * 5) }
  ];
};

const generateNetworkTopology = (orig: string, amps: string[]) => {
  return {
    originator: {
      id: 'n1', handle: orig, role: 'Originator' as const, influenceScore: 98,
      x: 250, y: 200, connections: ['n2', 'n3', 'n4']
    },
    amplifiers: amps.map((amp, i) => ({
      id: `n${i+2}`, handle: amp, role: 'Key Amplifier' as const, influenceScore: 70 + Math.random() * 20,
      x: 100 + (Math.random() * 300), y: 100 + (Math.random() * 200), connections: ['n1']
    }))
  };
};

export const TRENDS: TrendItem[] = [
  {
    id: 't1',
    title: 'EU AI Act Enforcement Begins',
    platform: 'x',
    scope: ['worldwide', 'national'],
    personas: ['tech-policy', 'geopolitics'],
    rank: 1,
    velocityScore: 92,
    velocityLabel: 'Accelerating',
    summary: 'The EU AI Act enters its first phase of enforcement, sparking massive debate among tech leaders.',
    whyMatches: 'Direct match for your interest in AI Regulation.',
    platformMetrics: { reposts: 45000, quotes: 12000, likes: 150000, views: 2500000 } as XMetrics,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    dossier: {
      narrativeEssay: `The European Union’s landmark Artificial Intelligence Act has officially entered its first enforcement phase, sending shockwaves across the global tech ecosystem. Initial reports suggest sweeping compliance audits are already underway for major foundational models, leading to widespread speculation about potential market exits by smaller AI startups who cannot bear the regulatory overhead.

Critics argue that the stringent transparency requirements will stifle innovation within the EU, potentially creating a "tech drain" as developers migrate to more permissive jurisdictions. Conversely, privacy advocates and digital rights groups are hailing the enforcement as a necessary bulwark against unchecked corporate surveillance and biased algorithmic decision-making. 

The ripple effects are being felt beyond Europe, with US and Asian regulators closely monitoring the rollout. The discourse on X has fractured into highly polarized camps, with regulatory optimists clashing directly with tech libertarians in lengthy, heavily cited threads.`,
      catalystAccount: '@TechPolicyEU',
      catalystTimestamp: new Date(Date.now() - 4800000).toISOString(),
      emotionalBreakdown: { excitement: 15, sarcasm: 25, anxiety: 40, supportive: 10, outrage: 10, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@TechPolicyEU', ['@DigitalRightsOrg', '@AI_Critic', '@VCEurope'])
    }
  },
  {
    id: 't2',
    title: 'OpenAI GPT-5 Benchmark Leaks',
    platform: 'reddit',
    scope: ['worldwide'],
    personas: ['tech-policy', 'genz-culture'],
    rank: 2,
    velocityScore: 95,
    velocityLabel: 'Viral',
    summary: 'Leaked benchmarks purportedly belonging to GPT-5 show near-AGI capabilities on complex reasoning tasks.',
    platformMetrics: { upvotes: 45000, comments: 8500, crossposts: 1200 } as RedditMetrics,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    dossier: {
      narrativeEssay: `A supposedly verified leak on the r/MachineLearning subreddit has set the AI community ablaze. The leaked documents, which outline benchmark scores for an unnamed "next-gen frontier model" widely assumed to be GPT-5, indicate a massive leap in multi-step logical reasoning and zero-shot coding abilities.

The community reaction is a potent mix of skepticism and awe. Many prominent researchers are demanding reproducible proof, pointing out inconsistencies in the documented methodology. However, amateur enthusiasts and AI influencers have already begun extrapolating these numbers to predict imminent structural shifts in the white-collar labor market.

The leak has catalyzed a broader discussion on the safety protocols surrounding such powerful models. Debates over open-source vs. closed-source development have resurfaced with renewed intensity, dominating the front page of several major subreddits and spilling over into adjacent tech-adjacent spaces.`,
      catalystAccount: 'u/throwaway_ai_leak',
      catalystTimestamp: new Date(Date.now() - 14400000).toISOString(),
      emotionalBreakdown: { excitement: 50, sarcasm: 10, anxiety: 25, supportive: 5, outrage: 10, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('u/throwaway_ai_leak', ['u/ml_researcher', 'u/tech_news_bot'])
    }
  },
  {
    id: 't3',
    title: 'RBI Holds Rates Amid Global Uncertainty',
    platform: 'x',
    scope: ['national'],
    personas: ['finance'],
    rank: 3,
    velocityScore: 78,
    velocityLabel: 'Steady',
    summary: 'The Reserve Bank of India maintains its repo rate, citing persistent inflation concerns and global headwinds.',
    platformMetrics: { reposts: 15000, quotes: 3000, likes: 45000, views: 800000 } as XMetrics,
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    dossier: {
      narrativeEssay: `In a move anticipated by most macroeconomists but feared by the equity markets, the Reserve Bank of India has opted to keep its key lending rates unchanged. The governor's accompanying statement highlighted "stubborn food inflation" and "volatile global crude prices" as primary drivers for the hawkish hold.

Financial analysts on X are vigorously dissecting the MPC's forward guidance. The consensus suggests a rate cut is off the table until at least Q3, prompting a mild sell-off in rate-sensitive sectors like auto and real estate. However, the banking sector index showed resilience, buoyed by the prospect of sustained net interest margins.

Retail investors are voicing their frustration over high EMI burdens, while institutional voices praise the central bank's prudent risk management. The discourse highlights the delicate balancing act between stimulating growth and anchoring inflationary expectations in a complex geopolitical environment.`,
      catalystAccount: '@FinMinIndia',
      catalystTimestamp: new Date(Date.now() - 28800000).toISOString(),
      emotionalBreakdown: { excitement: 5, sarcasm: 20, anxiety: 45, supportive: 20, outrage: 10, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@FinMinIndia', ['@MarketMojo', '@DalalStreetBull', '@MacroEconIn'])
    }
  },
  {
    id: 't4',
    title: 'Brat Summer 2.0 Goes Viral',
    platform: 'instagram',
    scope: ['worldwide'],
    personas: ['genz-culture'],
    rank: 4,
    velocityScore: 99,
    velocityLabel: 'Explosive',
    summary: 'A resurgence of the messy, unapologetic aesthetic dominates fashion reels and lifestyle content.',
    platformMetrics: { likes: 1200000, views: 15000000, saves: 300000, shares: 450000 } as InstagramMetrics,
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    dossier: {
      narrativeEssay: `Just when digital sociologists thought the 'clean girl' aesthetic had fully reclaimed the throne, 'Brat Summer' has returned with a vengeance. This iteration, dubbed 2.0, leans even harder into chaotic party energy, neon green motifs, and a deliberate rejection of curated perfection.

The trend has saturated Instagram Reels, driven by a highly infectious audio remix that merges late 2000s electro-pop with heavy bass drops. Creators are actively mocking perfectly organized morning routines, instead showcasing smudged eyeliner, energy drinks, and erratic dance routines in fluorescent-lit bathrooms.

Brands are scrambling to keep up, with several major fashion houses attempting (and mostly failing) to capture the authentic grunge feel in their marketing. The cultural commentary surrounding the trend suggests it's a collective manifestation of exhaustion with self-optimization culture, offering a cathartic release for Gen-Z users.`,
      catalystAccount: '@charlixcx_archive',
      catalystTimestamp: new Date(Date.now() - 86400000).toISOString(),
      emotionalBreakdown: { excitement: 60, sarcasm: 15, anxiety: 5, supportive: 15, outrage: 5, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@charlixcx_archive', ['@fashion_shitpost', '@popculture_brain'])
    }
  },
  {
    id: 't5',
    title: 'Taiwan Strait Naval Exercises Escalate',
    platform: 'telegram',
    scope: ['worldwide'],
    personas: ['geopolitics'],
    rank: 5,
    velocityScore: 88,
    velocityLabel: 'Accelerating',
    summary: 'Unannounced naval drills in the Taiwan Strait lead to heightened regional tensions and intense OSINT activity.',
    platformMetrics: { views: 850000, forwards: 120000, replies: 35000 } as TelegramMetrics,
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    dossier: {
      narrativeEssay: `Unscheduled and highly visible naval maneuvers in the Taiwan Strait have triggered a massive spike in activity across geopolitical Telegram channels. Open-source intelligence (OSINT) analysts are working around the clock to geolocate vessels, analyze flight transponder data, and decipher encrypted radio traffic intercepts.

The exercises appear significantly larger in scale than the standard seasonal drills, featuring live-fire components and simulated blockade formations. The rhetoric circulating in regional channels is deeply polarized, with state-aligned media amplifying narratives of sovereign strength while independent observers express grave concern over miscalculation risks.

The rapid dissemination of satellite imagery and tactical analyses on Telegram underscores the platform's role as the primary nervous system for modern conflict observation. The situation remains fluid, with global markets beginning to price in potential supply chain disruptions in the semiconductor sector.`,
      catalystAccount: '@OSINT_Global',
      catalystTimestamp: new Date(Date.now() - 24000000).toISOString(),
      emotionalBreakdown: { excitement: 10, sarcasm: 5, anxiety: 65, supportive: 5, outrage: 15, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@OSINT_Global', ['@IntelSlava', '@PacificWatch', '@DefenseNewsNet'])
    }
  },
  {
    id: 't6',
    title: 'Crypto ETF Inflows Hit $2B Weekly',
    platform: 'reddit',
    scope: ['worldwide'],
    personas: ['finance', 'tech-policy'],
    rank: 6,
    velocityScore: 85,
    velocityLabel: 'Trending',
    summary: 'Record-breaking institutional inflows into spot crypto ETFs reignite retail FOMO.',
    platformMetrics: { upvotes: 25000, comments: 4200, crossposts: 850 } as RedditMetrics,
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    dossier: {
      narrativeEssay: `The latest SEC filings reveal a staggering $2 billion in net weekly inflows across major spot cryptocurrency ETFs, crushing previous records. This massive institutional capital deployment has sent shockwaves through r/CryptoCurrency and r/WallStreetBets, signaling what many users are calling the true beginning of the 'Institutional Supercycle'.

Retail sentiment has rapidly shifted from cautious optimism to unbridled euphoria. Discussion threads are dominated by portfolio screenshots, highly leveraged options strategies, and aggressive price predictions for Q4. However, some veteran traders are urging caution, pointing to highly overleveraged funding rates as a precursor to a violent long-squeeze.

The influx of traditional finance (TradFi) capital is also sparking debates about the core ethos of decentralization. Purists argue that the ecosystem is being co-opted by the very institutions it was designed to bypass, while pragmatists celebrate the mainstream validation and resulting price appreciation.`,
      catalystAccount: 'u/ETF_Tracker_Bot',
      catalystTimestamp: new Date(Date.now() - 10800000).toISOString(),
      emotionalBreakdown: { excitement: 70, sarcasm: 10, anxiety: 10, supportive: 5, outrage: 5, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('u/ETF_Tracker_Bot', ['u/crypto_analyst', 'u/moon_boi', 'u/bear_hunter'])
    }
  },
  {
    id: 't7',
    title: 'India\'s DPDP Rules Notified',
    platform: 'x',
    scope: ['national', 'statewise'],
    personas: ['tech-policy', 'finance'],
    rank: 7,
    velocityScore: 75,
    velocityLabel: 'Steady',
    summary: 'The Digital Personal Data Protection Act rules have been officially published, setting strict compliance deadlines.',
    platformMetrics: { reposts: 18000, quotes: 4500, likes: 32000, views: 1200000 } as XMetrics,
    timestamp: new Date(Date.now() - 36000000).toISOString(),
    dossier: {
      narrativeEssay: `The long-awaited rules for India's Digital Personal Data Protection (DPDP) Act have finally been notified by the Ministry of Electronics and IT. The document outlines stringent consent management protocols, data localization mandates for critical sectors, and substantial financial penalties for breaches.

Corporate legal teams and compliance officers are in overdrive, decoding the dense legalese on X and LinkedIn. Startups, in particular, are voicing concerns over the high cost of implementing verifiable parental consent mechanisms for users under 18. Conversely, privacy activists argue the rules still leave too many loopholes for state surveillance exemptions.

The immediate market reaction has seen cybersecurity and compliance software firms rally, as enterprises rush to procure auditing solutions before the impending deadlines. The discourse reflects a nation grappling with the balance between rapid digital public infrastructure growth and fundamental privacy rights.`,
      catalystAccount: '@MeitYIndia',
      catalystTimestamp: new Date(Date.now() - 43200000).toISOString(),
      emotionalBreakdown: { excitement: 10, sarcasm: 20, anxiety: 40, supportive: 15, outrage: 15, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@MeitYIndia', ['@InternetFreedomIN', '@StartupIndiaOrg', '@TechLawyer_IN'])
    }
  },
  {
    id: 't8',
    title: 'Apple Vision Pro 2 Launch',
    platform: 'youtube',
    scope: ['worldwide'],
    personas: ['tech-policy', 'genz-culture'],
    rank: 8,
    velocityScore: 96,
    velocityLabel: 'Viral',
    summary: 'Apple unexpectedly drops a teaser for a lighter, more affordable spatial computing headset.',
    platformMetrics: { views: 12000000, likes: 850000, comments: 120000 } as YouTubeMetrics,
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    dossier: {
      narrativeEssay: `In a surprise digital event, Apple has unveiled the Vision Pro 2, directly addressing the primary criticisms of its predecessor: weight and price. The new headset, teased in a slick, highly-produced YouTube video, appears significantly slimmer and is rumored to launch at a price point targeting the prosumer market rather than just hardcore early adopters.

Tech YouTubers are heavily scrutinizing every frame of the teaser, analyzing the new strap design, the apparent removal of the external 'EyeSight' display, and hints at deeper integration with the broader Apple ecosystem. Reaction videos and spec-speculation streams are dominating the platform's trending page.

While the hardcore tech community is energized, mainstream consumers remain somewhat skeptical of the 'spatial computing' paradigm. The narrative is heavily focused on whether Apple has finally found the 'killer app' to justify the hardware, or if this remains a brilliant piece of engineering searching for a practical daily use case.`,
      catalystAccount: 'Apple',
      catalystTimestamp: new Date(Date.now() - 21600000).toISOString(),
      emotionalBreakdown: { excitement: 55, sarcasm: 15, anxiety: 5, supportive: 20, outrage: 5, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('Apple', ['MKBHD', 'Mrwhosetheboss', 'Dave2D'])
    }
  },
  {
    id: 't9',
    title: 'Very Demure Very Mindful Resurgence',
    platform: 'instagram',
    scope: ['worldwide'],
    personas: ['genz-culture'],
    rank: 9,
    velocityScore: 82,
    velocityLabel: 'Trending',
    summary: 'The satirical workplace etiquette trend returns, targeting corporate absurdity.',
    platformMetrics: { likes: 850000, views: 10000000, saves: 120000, shares: 250000 } as InstagramMetrics,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    dossier: {
      narrativeEssay: `The internet's favorite satirical etiquette lesson, 'Very Demure, Very Mindful,' has made an unexpected comeback. Originally a commentary on feminine presentation, the current iteration has morphed into a biting critique of corporate jargon, toxic workplace positivity, and the absurdities of return-to-office mandates.

Creators are posting hyper-curated Reels detailing how they 'mindfully' ignore emails after 5 PM, or 'demurely' decline unpaid overtime. The tone is heavily sarcastic, pairing soft, pastel aesthetics and whispered voiceovers with deeply cynical career advice and anti-hustle culture sentiments.

Human Resources professionals and career coaches are struggling to respond, with some attempting to co-opt the trend only to be swiftly ratioed in the comments. The trend serves as a fascinating linguistic Trojan horse, using the language of wellness and compliance to express deep-seated millennial and Gen-Z labor dissatisfaction.`,
      catalystAccount: '@corporate_millennial',
      catalystTimestamp: new Date(Date.now() - 120000000).toISOString(),
      emotionalBreakdown: { excitement: 20, sarcasm: 60, anxiety: 10, supportive: 10, outrage: 0, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@corporate_millennial', ['@anti_work_memes', '@HR_nightmares'])
    }
  },
  {
    id: 't10',
    title: 'Nvidia Surpasses $4T Market Cap',
    platform: 'x',
    scope: ['worldwide'],
    personas: ['finance', 'tech-policy'],
    rank: 10,
    velocityScore: 91,
    velocityLabel: 'Accelerating',
    summary: 'Driven by insatiable demand for next-gen AI chips, Nvidia hits a historic valuation milestone.',
    platformMetrics: { reposts: 55000, quotes: 18000, likes: 210000, views: 4500000 } as XMetrics,
    timestamp: new Date(Date.now() - 28800000).toISOString(),
    dossier: {
      narrativeEssay: `Nvidia has shattered yet another ceiling, crossing the unprecedented $4 Trillion market capitalization mark during intraday trading. The surge follows an earnings call that not only beat astronomical estimates but also provided forward guidance indicating that demand for their Blackwell architecture is outstripping supply by a massive margin.

The financial commentary on X is a mix of awe and bubble-anxiety. Value investors are publishing detailed DCF models attempting to rationalize the valuation, while momentum traders celebrate massive gains. The discourse frequently spirals into broader philosophical debates about whether we are witnessing an industrial revolution or a classic dot-com era manic episode.

Geopolitical analysts are also heavily involved in the conversation, noting Nvidia's critical role in national security and global supply chains. Discussions about export controls to China and the strategic vulnerability of TSMC's Taiwan foundries are inextricably linked to the stock's meteoric rise.`,
      catalystAccount: '@CNBC',
      catalystTimestamp: new Date(Date.now() - 36000000).toISOString(),
      emotionalBreakdown: { excitement: 45, sarcasm: 15, anxiety: 25, supportive: 10, outrage: 5, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@CNBC', ['@JimCramer', '@TechInvestorPro', '@MacroAlf'])
    }
  },
  {
    id: 't11',
    title: 'AI Ghibli Art Trend Backlash',
    platform: 'x',
    scope: ['worldwide'],
    personas: ['genz-culture', 'tech-policy'],
    rank: 11,
    velocityScore: 80,
    velocityLabel: 'Trending',
    summary: 'A viral trend turning user photos into Studio Ghibli-style art faces severe pushback from human artists.',
    platformMetrics: { reposts: 35000, quotes: 28000, likes: 110000, views: 3200000 } as XMetrics,
    timestamp: new Date(Date.now() - 72000000).toISOString(),
    dossier: {
      narrativeEssay: `What began as a seemingly innocuous TikTok filter turning user selfies into lush, Studio Ghibli-inspired animations has rapidly devolved into a fierce copyright and ethics war on X. A major generative AI platform integrated the filter, prompting millions of uses but triggering an organized boycott from professional illustrators and animation guilds.

The backlash centers on the dataset used to train the specific LoRA (Low-Rank Adaptation) model, which critics have definitively proven contains thousands of copyrighted frames from Hayao Miyazaki's films without permission or compensation. The discourse is highly adversarial, pitting the "democratization of art" crowd against staunch defenders of intellectual property and artistic labor.

The outrage has moved beyond standard internet drama, with prominent animation studios releasing statements condemning the tool. The incident is being cited in ongoing class-action lawsuits against AI companies, serving as a highly visible, emotionally resonant example of generative AI's impact on creative livelihoods.`,
      catalystAccount: '@ArtistRightsNow',
      catalystTimestamp: new Date(Date.now() - 86400000).toISOString(),
      emotionalBreakdown: { excitement: 5, sarcasm: 20, anxiety: 15, supportive: 20, outrage: 40, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@ArtistRightsNow', ['@AnimationGuild', '@TechEthicist', '@DefendArt'])
    }
  },
  {
    id: 't12',
    title: 'BRICS+ Currency Basket Proposal',
    platform: 'x',
    scope: ['worldwide'],
    personas: ['geopolitics', 'finance'],
    rank: 12,
    velocityScore: 72,
    velocityLabel: 'Steady',
    summary: 'Leaked documents suggest a concrete framework for a gold-backed BRICS trading currency.',
    platformMetrics: { reposts: 22000, quotes: 6000, likes: 45000, views: 1800000 } as XMetrics,
    timestamp: new Date(Date.now() - 48000000).toISOString(),
    dossier: {
      narrativeEssay: `Rumors of a unified BRICS currency have circulated for years, but newly leaked policy drafts from a summit preparatory committee provide the first concrete framework. The proposal outlines a multi-currency basket backed heavily by gold and rare earth commodities, designed specifically to bypass the SWIFT network and reduce reliance on the US Dollar in bilateral trade.

Geopolitical analysts are intensely debating the feasibility of the project. Skeptics point out the massive macroeconomic divergences and historic border tensions between member states like India and China, arguing that monetary union is a pipe dream without political integration. Conversely, proponents argue that even a partial adoption for commodity trading could severely dent US monetary hegemony.

The financial sector is watching closely, particularly commodity traders. The discourse reflects a growing realization that the 'de-dollarization' narrative is shifting from theoretical academic discussions to actionable, albeit highly complex, geopolitical strategy.`,
      catalystAccount: '@GeopoliticsLive',
      catalystTimestamp: new Date(Date.now() - 60000000).toISOString(),
      emotionalBreakdown: { excitement: 25, sarcasm: 25, anxiety: 30, supportive: 15, outrage: 5, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@GeopoliticsLive', ['@MacroEcon', '@GoldBug_Central', '@EurasiaGroup'])
    }
  },
  {
    id: 't13',
    title: 'Subway Surfers Lore TikTok Trend',
    platform: 'youtube',
    scope: ['worldwide'],
    personas: ['genz-culture'],
    rank: 13,
    velocityScore: 89,
    velocityLabel: 'Explosive',
    summary: 'Deep-dive video essays analyzing fabricated lore for the mobile game Subway Surfers are dominating algorithms.',
    platformMetrics: { views: 8500000, likes: 620000, comments: 45000 } as YouTubeMetrics,
    timestamp: new Date(Date.now() - 24000000).toISOString(),
    dossier: {
      narrativeEssay: `In a bizarre but highly entertaining evolution of internet irony, elaborate video essays detailing the 'deep lore' of the casual mobile game Subway Surfers have taken over YouTube and TikTok. Creators are producing hour-long, overly dramatic analyses of the game's characters, inventing complex dystopian narratives and tragic backstories.

The trend is a meta-commentary on the video essay format itself. By applying hyper-serious, academic-style critique to a game that literally consists of running endlessly from a grumpy inspector, Gen-Z creators are satirizing the internet's tendency to over-analyze pop culture. The videos are characterized by intense background music, dramatic voiceovers, and complex 'evidence' boards.

The algorithmic success of these videos is undeniable, capturing millions of views. It highlights a fascinating cultural shift where the absurdity of the content is the core appeal, relying on a shared understanding among viewers that the entire premise is a massive, collective inside joke.`,
      catalystAccount: 'LoreMaster',
      catalystTimestamp: new Date(Date.now() - 36000000).toISOString(),
      emotionalBreakdown: { excitement: 40, sarcasm: 45, anxiety: 0, supportive: 10, outrage: 5, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('LoreMaster', ['MemeAnalysis', 'GenZ_Critique'])
    }
  },
  {
    id: 't14',
    title: 'Sudan Humanitarian Corridor Stalls',
    platform: 'telegram',
    scope: ['worldwide'],
    personas: ['geopolitics'],
    rank: 14,
    velocityScore: 65,
    velocityLabel: 'Stable',
    summary: 'Negotiations for safe passage of aid in conflict zones break down, prompting international outcry.',
    platformMetrics: { views: 450000, forwards: 60000, replies: 12000 } as TelegramMetrics,
    timestamp: new Date(Date.now() - 120000000).toISOString(),
    dossier: {
      narrativeEssay: `Efforts to establish a vital humanitarian corridor in Sudan have completely collapsed following renewed clashes between rival factions. Telegram channels dedicated to regional conflict monitoring are flooded with distressing reports of aid convoys being turned back and critical supply lines severed.

The discourse is characterized by intense frustration with the international community's perceived inaction. Aid workers and local journalists are using encrypted channels to broadcast raw, unfiltered realities on the ground, bypassing traditional media blockades. The narratives starkly contrast official diplomatic press releases, highlighting the grim tactical realities of the civil war.

Global human rights organizations are amplifying these Telegram reports to pressure the UN Security Council into stronger intervention. The situation exemplifies the critical role of secure messaging platforms in conflict zones, serving as lifelines for information and coordination when traditional infrastructure fails.`,
      catalystAccount: '@SudanUpdatesLive',
      catalystTimestamp: new Date(Date.now() - 150000000).toISOString(),
      emotionalBreakdown: { excitement: 0, sarcasm: 10, anxiety: 40, supportive: 20, outrage: 30, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@SudanUpdatesLive', ['@UNWatch', '@ConflictObserver', '@AidReliefNet'])
    }
  },
  {
    id: 't15',
    title: 'Meta Open-Sources Llama 4 Base',
    platform: 'x',
    scope: ['worldwide'],
    personas: ['tech-policy'],
    rank: 15,
    velocityScore: 94,
    velocityLabel: 'Explosive',
    summary: 'Meta unexpectedly releases the weights for their latest flagship model, intensifying the open-source AI debate.',
    platformMetrics: { reposts: 65000, quotes: 22000, likes: 180000, views: 5500000 } as XMetrics,
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    dossier: {
      narrativeEssay: `In a move that caught competitors entirely off guard, Meta has open-sourced the base weights for Llama 4, their most capable foundational model to date. The release includes massive parameter variants that benchmark favorably against the best closed-source offerings from OpenAI and Anthropic, effectively commoditizing state-of-the-art AI capabilities overnight.

The developer community on X is in a state of euphoria, with thousands of repositories springing up within hours to fine-tune, quantize, and deploy the model on consumer hardware. The sheer speed of community innovation is staggering, demonstrating the immense power of decentralized AI development.

However, the policy sphere is reacting with deep alarm. Regulators and AI safety advocates are heavily criticizing Mark Zuckerberg's strategy, arguing that releasing such powerful dual-use technology without adequate guardrails is highly irresponsible. The debate over regulatory capture versus open innovation has reached a fever pitch.`,
      catalystAccount: '@YannLeCun',
      catalystTimestamp: new Date(Date.now() - 24000000).toISOString(),
      emotionalBreakdown: { excitement: 60, sarcasm: 10, anxiety: 20, supportive: 5, outrage: 5, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@YannLeCun', ['@HuggingFace', '@AISafetyOrg', '@OpenSourceDev'])
    }
  },
  {
    id: 't16',
    title: 'TikTok Ban Legislation Resurfaces',
    platform: 'facebook',
    scope: ['national'],
    personas: ['tech-policy', 'geopolitics', 'genz-culture'],
    rank: 16,
    velocityScore: 79,
    velocityLabel: 'Trending',
    summary: 'A new bipartisan bill aiming to force the divestiture or ban of TikTok moves rapidly through committee.',
    platformMetrics: { reactions: 150000, shares: 45000, comments: 85000, views: 2200000 } as FacebookMetrics,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    dossier: {
      narrativeEssay: `National security concerns regarding data sovereignty have thrust TikTok back into the legislative crosshairs. A newly introduced, aggressively fast-tracked bipartisan bill mandates ByteDance to divest its US operations within 180 days or face a comprehensive ban across domestic app stores.

The discourse on Facebook is deeply polarized along generational and political lines. Older demographics heavily favor the ban, frequently sharing news clips highlighting national security threats and algorithmic manipulation theories. Conversely, creators and small business owners are mobilizing fierce opposition campaigns, arguing the ban would destroy their livelihoods.

Legal experts are debating the First Amendment implications of the proposed legislation. The situation is evolving into a major flashpoint ahead of the upcoming election cycle, forcing politicians to weigh the national security arguments against alienating a massive block of younger voters who rely on the platform.`,
      catalystAccount: 'Fox News',
      catalystTimestamp: new Date(Date.now() - 96000000).toISOString(),
      emotionalBreakdown: { excitement: 10, sarcasm: 15, anxiety: 30, supportive: 20, outrage: 25, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('Fox News', ['CNN', 'ACLU', 'CreatorCoalition'])
    }
  },
  {
    id: 't17',
    title: 'Global Supply Chain Bottlenecks Easing',
    platform: 'reddit',
    scope: ['worldwide'],
    personas: ['finance', 'geopolitics'],
    rank: 17,
    velocityScore: 58,
    velocityLabel: 'Stable',
    summary: 'Logistics data indicates a significant normalization in shipping rates and transit times.',
    platformMetrics: { upvotes: 12000, comments: 1500, crossposts: 300 } as RedditMetrics,
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    dossier: {
      narrativeEssay: `In a rare piece of unequivocally positive macroeconomic news, major logistics indices are showing a sustained normalization of global supply chains. Ocean freight rates have fallen sharply from their pandemic peaks, and port congestion in critical hubs like Los Angeles and Shenzhen has largely dissipated.

Discussions in r/Economics and r/SupplyChain focus on the disinflationary impact of this normalization. Analysts suggest that the easing bottlenecks should relieve upward pressure on consumer goods prices, providing central banks with more leeway in their monetary policy decisions over the coming quarters.

However, industry insiders are warning against complacency. Threads emphasize that while current conditions have improved, the underlying infrastructure remains vulnerable to geopolitical shocks, particularly regarding crucial chokepoints like the Panama and Suez canals. Companies are still actively pursuing 'nearshoring' strategies to build long-term resilience.`,
      catalystAccount: 'u/LogisticsPro',
      catalystTimestamp: new Date(Date.now() - 200000000).toISOString(),
      emotionalBreakdown: { excitement: 30, sarcasm: 5, anxiety: 15, supportive: 45, outrage: 5, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('u/LogisticsPro', ['u/EconNerd', 'u/PortWorker', 'u/MacroAnalyst'])
    }
  },
  {
    id: 't18',
    title: 'Quantum Supremacy Claim Debunked',
    platform: 'x',
    scope: ['worldwide'],
    personas: ['tech-policy'],
    rank: 18,
    velocityScore: 84,
    velocityLabel: 'Trending',
    summary: 'A highly publicized claim of quantum computational supremacy is thoroughly dismantled by peer review.',
    platformMetrics: { reposts: 18000, quotes: 5000, likes: 65000, views: 1500000 } as XMetrics,
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    dossier: {
      narrativeEssay: `A sensational preprint paper claiming to have achieved unambiguous 'quantum supremacy' on a commercially relevant problem has been publicly and systematically dismantled. Rival research teams replicated the classical baseline and demonstrated that standard supercomputers could solve the exact same problem faster and with higher fidelity using optimized tensor network algorithms.

The scientific community on X is engaged in a rigorous, highly technical post-mortem. While the tone is mostly professional, there is a strong undercurrent of frustration regarding the hype cycle surrounding quantum computing. Experts are calling for more rigorous verification standards before companies issue press releases that heavily influence stock prices and funding rounds.

The incident serves as a stark reminder of the immense difficulty in scaling quantum hardware and mitigating error rates. It has injected a dose of healthy skepticism into the sector, forcing investors and policymakers to re-evaluate realistic timelines for practical quantum utility.`,
      catalystAccount: '@ScottAaronson',
      catalystTimestamp: new Date(Date.now() - 60000000).toISOString(),
      emotionalBreakdown: { excitement: 5, sarcasm: 35, anxiety: 10, supportive: 40, outrage: 10, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@ScottAaronson', ['@QuantumInst', '@PhysicsToday', '@TechSkeptic'])
    }
  },
  {
    id: 't19',
    title: 'Minimalist "Dumb Phone" Sales Surge',
    platform: 'instagram',
    scope: ['worldwide'],
    personas: ['genz-culture', 'tech-policy'],
    rank: 19,
    velocityScore: 87,
    velocityLabel: 'Accelerating',
    summary: 'A movement to reclaim attention spans drives massive sales for stripped-down, featureless mobile phones.',
    platformMetrics: { likes: 650000, views: 8000000, saves: 200000, shares: 150000 } as InstagramMetrics,
    timestamp: new Date(Date.now() - 120000000).toISOString(),
    dossier: {
      narrativeEssay: `The pushback against constant digital connectivity has materialized into a significant commercial trend. Sales of 'dumb phones'—devices restricted to calls, texts, and basic utilities like maps—have skyrocketed, driven ironically by viral campaigns on platforms like Instagram and TikTok. 

Users, particularly high school and college students, are documenting their 'digital detox' journeys. Reels showcase the aesthetic appeal of minimalist E-ink devices and the psychological relief of escaping algorithmic feeds. The movement frames constant smartphone use not just as a distraction, but as a genuine public health crisis affecting mental well-being and genuine human connection.

Tech companies are taking note, with several startups launching premium, design-focused dumb phones catering specifically to this burgeoning market. The trend represents a fascinating cultural pendulum swing, where intentional disconnection is increasingly viewed as a luxury status symbol.`,
      catalystAccount: '@DigitalMinimalist',
      catalystTimestamp: new Date(Date.now() - 150000000).toISOString(),
      emotionalBreakdown: { excitement: 35, sarcasm: 10, anxiety: 15, supportive: 35, outrage: 5, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('@DigitalMinimalist', ['@MentalHealthAdvocate', '@TechDetox', '@LightPhone'])
    }
  },
  {
    id: 't20',
    title: 'SpaceX Starship Commercial Payload',
    platform: 'youtube',
    scope: ['worldwide'],
    personas: ['tech-policy', 'finance'],
    rank: 20,
    velocityScore: 76,
    velocityLabel: 'Steady',
    summary: 'SpaceX successfully deploys its first massive commercial payload using the fully reusable Starship architecture.',
    platformMetrics: { views: 6500000, likes: 450000, comments: 25000 } as YouTubeMetrics,
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    dossier: {
      narrativeEssay: `The aerospace industry has crossed a monumental threshold. SpaceX's Starship has successfully completed its first orbital mission carrying a commercial payload, deploying a massive constellation of next-generation communication satellites. The successful return and catch of both the booster and the ship mark the true realization of fully reusable heavy-lift architecture.

YouTube space flight commentators are euphoric, breaking down the telemetry data and the financial implications of the launch. The dramatic reduction in the cost-per-kilogram to orbit is expected to ignite a new space economy, enabling ambitious projects ranging from orbital manufacturing facilities to large-scale lunar bases that were previously financially unviable.

Incumbent aerospace contractors are facing intense scrutiny from investors as their expendable launch vehicles are rendered obsolete overnight. The discourse highlights the brutal efficiency of iterative engineering and the geopolitical implications of a single private company dominating global space access.`,
      catalystAccount: 'SpaceX',
      catalystTimestamp: new Date(Date.now() - 300000000).toISOString(),
      emotionalBreakdown: { excitement: 75, sarcasm: 5, anxiety: 5, supportive: 15, outrage: 0, timeline: generateTimeline() },
      demographics: generateDemographics(),
      networkTopology: generateNetworkTopology('SpaceX', ['EverydayAstronaut', 'ScottManley', 'NASA'])
    }
  }
];

// 3. MEDIA BOARDS
export const INSTAGRAM_REELS: InstagramReel[] = [
  { id: 'ir1', audioName: 'Original Sound - @charlixcx', creator: '@charlixcx_archive', uses: 1500000, velocity: 99, gradient: 'linear-gradient(135deg, #00ff00 0%, #003300 100%)' },
  { id: 'ir2', audioName: 'Very Demure - @jools', creator: '@corporate_millennial', uses: 850000, velocity: 85, gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  { id: 'ir3', audioName: 'Corporate Drone Core', creator: '@anti_work_memes', uses: 420000, velocity: 75, gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
  { id: 'ir4', audioName: 'Dumb Phone Aesthetic', creator: '@DigitalMinimalist', uses: 210000, velocity: 90, gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
  { id: 'ir5', audioName: 'Synthwave Night Drive', creator: '@neon_dreams', uses: 600000, velocity: 60, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'ir6', audioName: 'Ghibli Piano Cover', creator: '@anime_beats', uses: 1200000, velocity: 82, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
];

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  { id: 'yv1', title: 'Apple Vision Pro 2: Did they fix it?', channel: 'MKBHD', views: 8500000, duration: '14:22', gradient: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' },
  { id: 'yv2', title: 'The ENTIRE Subway Surfers Lore Explained', channel: 'LoreMaster', views: 5200000, duration: '1:04:12', gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)' },
  { id: 'yv3', title: 'Starship Catch FULL MULTICAM', channel: 'EverydayAstronaut', views: 3100000, duration: '45:10', gradient: 'linear-gradient(135deg, #09203f 0%, #537895 100%)' },
  { id: 'yv4', title: 'I tried a dumb phone for 30 days', channel: 'TechDetox', views: 1800000, duration: '22:15', gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)' },
  { id: 'yv5', title: 'Why Llama 4 Changes Everything', channel: 'AI Explained', views: 950000, duration: '18:45', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'yv6', title: 'Quantum Supremacy Debunked', channel: 'PhysicsToday', views: 450000, duration: '32:20', gradient: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)' }
];

export const FACEBOOK_VIDEOS: FacebookVideo[] = [
  { id: 'fv1', title: 'Congress Debates TikTok Ban', page: 'Fox News', views: 3500000, reactions: 120000, gradient: 'linear-gradient(135deg, #c71d6f 0%, #d09693 100%)' },
  { id: 'fv2', title: 'Small Business Owners Protest App Ban', page: 'NowThis', views: 1800000, reactions: 85000, gradient: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)' },
  { id: 'fv3', title: 'Market Update: Nvidia Surges', page: 'CNBC', views: 950000, reactions: 25000, gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 'fv4', title: 'Is AI Stealing Art?', page: 'Tech Insider', views: 2200000, reactions: 95000, gradient: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)' },
  { id: 'fv5', title: 'Supply Chain Crisis Over?', page: 'WSJ', views: 750000, reactions: 12000, gradient: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)' },
  { id: 'fv6', title: 'The Return of the Dumb Phone', page: 'The Verge', views: 1500000, reactions: 65000, gradient: 'linear-gradient(135deg, #cc2b5e 0%, #753a88 100%)' }
];

// 4. PLATFORM SYNTHESES
export const SYNTHESES: PlatformSynthesis[] = [
  { platform: 'all', summary: 'Global narrative is heavily fragmented. Tech optimism is clashing aggressively with regulatory anxiety (EU AI Act, TikTok Ban). Generational divides are expanding as Gen-Z retreats into curated aesthetics and digital minimalism.' },
  { platform: 'x', summary: 'Discourse dominated by EU AI Act compliance deadlines and Nvidia earnings reaction. Sentiment skews analytical with elevated sarcasm in tech communities.' },
  { platform: 'instagram', summary: 'Aesthetic fatigue is driving the "Brat Summer 2.0" and "Dumb Phone" trends. High engagement on satirical corporate workplace content.' },
  { platform: 'telegram', summary: 'High volume OSINT activity regarding Taiwan Strait naval drills and Sudan humanitarian corridors. Sentiment is highly anxious and fast-moving.' },
  { platform: 'reddit', summary: 'Retail euphoria returns with Crypto ETF inflows, while deep technical skepticism surrounds leaked GPT-5 benchmarks and Quantum Supremacy claims.' },
  { platform: 'youtube', summary: 'Long-form deep dives into niche topics (Subway Surfers lore) are outperforming standard tech reviews, except for the highly anticipated Vision Pro 2 teaser.' },
  { platform: 'facebook', summary: 'Political polarization is peaking around the TikTok Ban legislation, with high engagement on both traditional news broadcasts and grassroots mobilization pages.' }
];

// 5. HELPER FUNCTIONS
export function getTrendsByScope(scope: Scope): TrendItem[] {
  return TRENDS.filter(t => t.scope.includes(scope));
}

export function getTrendsByPlatform(platform: Platform | 'all', scope: Scope): TrendItem[] {
  let filtered = getTrendsByScope(scope);
  if (platform !== 'all') {
    filtered = filtered.filter(t => t.platform === platform);
  }
  return filtered.sort((a, b) => a.rank - b.rank);
}

export function getTrendsForPersona(persona: Persona, scope: Scope): TrendItem[] {
  return getTrendsByScope(scope)
    .filter(t => t.personas.includes(persona))
    .sort((a, b) => a.rank - b.rank);
}

export function getMediaForPlatform(platform: Platform): { reels?: InstagramReel[]; videos?: YouTubeVideo[] | FacebookVideo[]; } {
  switch (platform) {
    case 'instagram': return { reels: INSTAGRAM_REELS };
    case 'youtube': return { videos: YOUTUBE_VIDEOS };
    case 'facebook': return { videos: FACEBOOK_VIDEOS };
    default: return {};
  }
}

export function getSynthesis(platform: Platform | 'all'): string {
  const synth = SYNTHESES.find(s => s.platform === platform);
  return synth ? synth.summary : 'Real-time synthesis pending...';
}

export function getPersonaConfig(persona: Persona): PersonaConfig {
  const config = PERSONAS.find(p => p.id === persona);
  if (!config) throw new Error(`Persona not found: ${persona}`);
  return config;
}

// Re-export with camelCase aliases for component compatibility
export const trends = TRENDS;
export const personas = PERSONAS;
export const instagramReels = INSTAGRAM_REELS;
export const youtubeVideos = YOUTUBE_VIDEOS;
export const facebookVideos = FACEBOOK_VIDEOS;
export const syntheses = SYNTHESES;
