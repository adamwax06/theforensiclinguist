export const categories = [
  { id: "authorship", name: "Authorship & stylometry", color: "#344c43" },
  { id: "sociolinguistics", name: "Sociolinguistics", color: "#876d92" },
  { id: "discourse", name: "Discourse & deception", color: "#ac664e" },
  { id: "speech", name: "Speech & phonetics", color: "#627f89" },
  { id: "methods", name: "Methods & evidence", color: "#aa864c" },
] as const;

export type Category = (typeof categories)[number]["id"];

export type Article = {
  id: string;
  title: string;
  coverTitle: string;
  authors: string[];
  year: number;
  publication: string;
  categories: Category[];
  tags: string[];
  summary: string;
  takeaways: string[];
  citation: string;
  sourceUrl: string;
  pdfUrl?: string;
};

export const articles: Article[] = [
  {
    id: "style-in-authorship",
    title: "What represents “style” in authorship attribution?",
    coverTitle: "What represents style?",
    authors: ["Kalaivani Sundararajan", "Damon Woodard"],
    year: 2018,
    publication: "COLING",
    categories: ["authorship"],
    tags: ["stylometry", "syntax", "word choice", "cross-domain", "topic bias"],
    summary:
      "Which features capture a writer’s style, and which simply reveal their subject? This study examines syntax and word choice across topics and genres. It finds that useful stylistic signals depend on the setting, while proper nouns can introduce strong topic effects.",
    takeaways: [
      "Distinguish evidence about writing style from evidence about topic.",
      "Syntax can help across genres, but a purely syntactic model is insufficient on its own.",
      "Masking topic-related words can help reveal the contribution of other features.",
    ],
    citation:
      "Sundararajan, K., & Woodard, D. (2018). What represents “style” in authorship attribution? Proceedings of COLING, 2814–2822.",
    sourceUrl: "https://aclanthology.org/C18-1238/",
    pdfUrl: "https://aclanthology.org/C18-1238.pdf",
  },
  {
    id: "dialect-in-social-media",
    title:
      "Demographic Dialectal Variation in Social Media: A Case Study of African-American English",
    coverTitle: "Dialect in social media",
    authors: ["Su Lin Blodgett", "Lisa Green", "Brendan O’Connor"],
    year: 2016,
    publication: "EMNLP",
    categories: ["sociolinguistics"],
    tags: [
      "African-American English",
      "AAE",
      "dialect",
      "Twitter",
      "language variation",
      "NLP",
    ],
    summary:
      "A study of African-American English in online conversation. The authors develop a model for identifying AAE-like language, examine its linguistic features, and show that existing language-identification and parsing tools perform unevenly across language varieties.",
    takeaways: [
      "Language variation matters when evaluating computational tools.",
      "A model’s errors may reflect the varieties represented in its training data.",
      "Demographic associations in a corpus are not individual identity determinations.",
    ],
    citation:
      "Blodgett, S. L., Green, L., & O’Connor, B. (2016). Demographic Dialectal Variation in Social Media: A Case Study of African-American English. Proceedings of EMNLP, 1119–1130. https://doi.org/10.18653/v1/D16-1120",
    sourceUrl: "https://aclanthology.org/D16-1120/",
    pdfUrl: "https://aclanthology.org/D16-1120.pdf",
  },
  {
    id: "deceptive-opinion-spam",
    title: "Finding Deceptive Opinion Spam by Any Stretch of the Imagination",
    coverTitle: "The language of deception",
    authors: ["Myle Ott", "Yejin Choi", "Claire Cardie", "Jeffrey T. Hancock"],
    year: 2011,
    publication: "ACL",
    categories: ["discourse"],
    tags: [
      "deception",
      "reviews",
      "opinion spam",
      "psycholinguistics",
      "genre",
    ],
    summary:
      "How does fabricated praise differ from a genuine review? This paper introduces a dataset of truthful and deliberately deceptive hotel reviews and compares text classification, psychological language features, and genre-based approaches to identifying deception.",
    takeaways: [
      "The study concerns a specific review dataset, rather than a universal test for lying.",
      "Text features and psychological features can offer complementary information.",
      "Context and motivation matter when interpreting apparent deception cues.",
    ],
    citation:
      "Ott, M., Choi, Y., Cardie, C., & Hancock, J. T. (2011). Finding Deceptive Opinion Spam by Any Stretch of the Imagination. Proceedings of ACL, 309–319.",
    sourceUrl: "https://aclanthology.org/P11-1032/",
    pdfUrl: "https://aclanthology.org/P11-1032.pdf",
  },
  {
    id: "voice-comparison-precision",
    title:
      "Estimating the Precision of the Likelihood-Ratio Output of a Forensic-Voice-Comparison System",
    coverTitle: "Voice comparison & precision",
    authors: [
      "Geoffrey Stewart Morrison",
      "Tharmarajah Thiruvaran",
      "Julien Epps",
    ],
    year: 2010,
    publication: "Odyssey",
    categories: ["speech", "methods"],
    tags: [
      "forensic voice comparison",
      "speaker comparison",
      "likelihood ratios",
      "precision",
      "reliability",
    ],
    summary:
      "Accuracy and precision describe different aspects of forensic evidence. This paper presents parametric and non-parametric procedures for estimating the precision of a voice-comparison system’s likelihood-ratio output, and examines the effect of the amount of questioned-speaker data.",
    takeaways: [
      "Assess precision as well as accuracy when evaluating a comparison system.",
      "The quantity of available speech is part of the evaluation context.",
      "An uncertainty interval conveys information that a point estimate alone cannot.",
    ],
    citation:
      "Morrison, G. S., Thiruvaran, T., & Epps, J. (2010). Estimating the Precision of the Likelihood-Ratio Output of a Forensic-Voice-Comparison System. Odyssey 2010: The Speaker and Language Recognition Workshop.",
    sourceUrl:
      "https://www.isca-archive.org/odyssey_2010/morrison10_odyssey.html",
    pdfUrl: "https://www.isca-archive.org/odyssey_2010/morrison10_odyssey.pdf",
  },
  {
    id: "racial-bias-hate-speech",
    title: "The Risk of Racial Bias in Hate Speech Detection",
    coverTitle: "Dialect, bias & interpretation",
    authors: [
      "Maarten Sap",
      "Dallas Card",
      "Saadia Gabriel",
      "Yejin Choi",
      "Noah A. Smith",
    ],
    year: 2019,
    publication: "ACL",
    categories: ["sociolinguistics", "discourse"],
    tags: [
      "dialect",
      "annotation",
      "racial bias",
      "AAE",
      "hate speech",
      "language interpretation",
    ],
    summary:
      "This study examines how dialect-insensitive annotation can introduce racial bias into hate-speech datasets and the models trained on them. It also tests whether making annotators aware of dialect reduces their tendency to label African-American English as offensive.",
    takeaways: [
      "Annotations can carry biases into downstream language models.",
      "A surface linguistic feature can be mistaken for an indicator of offensiveness.",
      "Dialect awareness is relevant to the design and interpretation of annotation tasks.",
    ],
    citation:
      "Sap, M., Card, D., Gabriel, S., Choi, Y., & Smith, N. A. (2019). The Risk of Racial Bias in Hate Speech Detection. Proceedings of ACL, 1668–1678. https://doi.org/10.18653/v1/P19-1163",
    sourceUrl: "https://aclanthology.org/P19-1163/",
    pdfUrl: "https://aclanthology.org/P19-1163.pdf",
  },
  {
    id: "rethinking-authorship-verification",
    title: "Rethinking the Authorship Verification Experimental Setups",
    coverTitle: "Rethinking authorship verification",
    authors: [
      "Florin Brad",
      "Andrei Manolache",
      "Elena Burceanu",
      "Antonio Barbalau",
      "Radu Tudor Ionescu",
      "Marius Popescu",
    ],
    year: 2022,
    publication: "EMNLP",
    categories: ["methods", "authorship"],
    tags: [
      "authorship verification",
      "evaluation",
      "PAN",
      "named entities",
      "topic bias",
      "BERT",
    ],
    summary:
      "A closer look at what authorship-verification benchmarks actually measure. The authors propose new PAN dataset splits to separate topic and author effects, evaluate neural baselines, and find that named entities can bias model decisions. Removing them improves generalization in their experiments.",
    takeaways: [
      "Evaluation splits influence which signals a model can exploit.",
      "Strong benchmark performance may partly reflect topic or named-entity cues.",
      "Testing on a separate corpus helps assess generalization beyond a benchmark.",
    ],
    citation:
      "Brad, F., Manolache, A., Burceanu, E., Barbalau, A., Ionescu, R. T., & Popescu, M. (2022). Rethinking the Authorship Verification Experimental Setups. Proceedings of EMNLP, 5634–5643. https://doi.org/10.18653/v1/2022.emnlp-main.380",
    sourceUrl: "https://aclanthology.org/2022.emnlp-main.380/",
    pdfUrl: "https://aclanthology.org/2022.emnlp-main.380.pdf",
  },
];
