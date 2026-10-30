export type Category =
  | "Physics"
  | "Math"
  | "Space"
  | "Biology"
  | "Chemistry"
  | "History"
  | "Geography"
  | "Language"
  | "Art"
  | "Film"
  | "Tech"
  | "Philosophy"
  | "Economics"
  | "Music";

export type Difficulty = "Hard" | "Brutal" | "Legendary";

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  question: string;
  options: string[];
  answer: number;
  logic: string;
  takeaway: string;
}

export const CATEGORY_META: Record<Category, { color: string; short: string }> = {
  Physics: { color: "#7dd3fc", short: "PHY" },
  Math: { color: "#d3f94a", short: "MAT" },
  Space: { color: "#c4b5fd", short: "SPC" },
  Biology: { color: "#6ee7b7", short: "BIO" },
  Chemistry: { color: "#fbbf24", short: "CHM" },
  History: { color: "#fda4af", short: "HIS" },
  Geography: { color: "#5eead4", short: "GEO" },
  Language: { color: "#f0abfc", short: "LNG" },
  Art: { color: "#fdba74", short: "ART" },
  Film: { color: "#fca5a5", short: "FLM" },
  Tech: { color: "#67e8f9", short: "TEC" },
  Philosophy: { color: "#a5b4fc", short: "PHL" },
  Economics: { color: "#fde047", short: "ECO" },
  Music: { color: "#f9a8d4", short: "MUS" },
};

export const QUESTIONS: Question[] = [
  /* ------------------------------- HARD ------------------------------- */
  {
    id: "h-bat-ball",
    category: "Math",
    difficulty: "Hard",
    question: "A bat and a ball cost $1.10 together. The bat costs $1.00 more than the ball. What does the ball cost?",
    options: ["$0.10", "$0.05", "$0.01", "$0.15"],
    answer: 1,
    logic:
      "If the ball costs b, the bat costs b + $1.00. So 2b + $1.00 = $1.10, which means b = $0.05. A $0.10 ball would make the total $1.20.",
    takeaway: "The intuitive answer is usually the trap answer.",
  },
  {
    id: "h-nepal-flag",
    category: "Geography",
    difficulty: "Hard",
    question: "Which is the only national flag that is not a quadrilateral?",
    options: ["Nepal", "Switzerland", "Vatican City", "Bhutan"],
    answer: 0,
    logic:
      "Nepal's flag is a double pennant, built from two overlapping triangles. Switzerland and Vatican City have square flags â€” unusual, but still four-sided.",
    takeaway: "Square flags exist. Only Nepal breaks the four-sided rule.",
  },
  {
    id: "h-red-blood-cells",
    category: "Biology",
    difficulty: "Hard",
    question: "Which human cells contain no mitochondria at all?",
    options: ["Neurons", "Mature red blood cells", "Sperm cells", "Liver cells"],
    answer: 1,
    logic:
      "As red blood cells mature, they eject their nucleus and organelles â€” including mitochondria â€” to make room for haemoglobin. They survive on anaerobic glycolysis alone.",
    takeaway: "Erythrocytes trade metabolic flexibility for oxygen capacity.",
  },
  {
    id: "h-ionization",
    category: "Chemistry",
    difficulty: "Hard",
    question: "Which element has the highest first ionisation energy?",
    options: ["Helium", "Neon", "Fluorine", "Hydrogen"],
    answer: 0,
    logic:
      "Helium's two electrons sit in the innermost shell, tightly bound to a +2 nucleus with no screening from other electrons. Its first ionisation energy is about 2,372 kJ/mol â€” the highest of any element.",
    takeaway: "Small, unscreened, full shells are brutally hard to break.",
  },
  {
    id: "h-salt-ice",
    category: "Chemistry",
    difficulty: "Hard",
    question: "Why does rock salt melt ice on a road?",
    options: [
      "Salt releases heat as it dissolves",
      "Salt lowers water's freezing point",
      "Salt absorbs the cold from the ice",
      "Salt turns ice directly into vapour",
    ],
    answer: 1,
    logic:
      "Dissolved salt ions interfere with the orderly crystal lattice of ice. The freezing point drops â€” a colligative effect â€” so ice melts at temperatures where pure water would stay solid.",
    takeaway: "Salt doesn't add heat; it changes when freezing becomes possible.",
  },
  {
    id: "h-aztecs",
    category: "History",
    difficulty: "Hard",
    question: "Which city was the capital of the Aztec Empire?",
    options: ["TenochtitlÃ¡n", "Cusco", "Tikal", "TeotihuacÃ¡n"],
    answer: 0,
    logic:
      "TenochtitlÃ¡n was founded on islands in Lake Texcoco around 1325 and grew into a city of perhaps 200,000 people. Cusco was Inca; Tikal was Maya; TeotihuacÃ¡n predates the Aztecs.",
    takeaway: "Mexico City now sits directly on TenochtitlÃ¡n's ruins.",
  },
  {
    id: "h-time-zones",
    category: "Geography",
    difficulty: "Hard",
    question: "Which country has the most time zones, counting its territories?",
    options: ["France", "Russia", "United States", "China"],
    answer: 0,
    logic:
      "France has 12 time zones thanks to territories from French Polynesia to RÃ©union. Russia and the United States each cover 11; China, despite its width, uses just one.",
    takeaway: "Territories count. Empire still leaves echoes in the clock.",
  },
  {
    id: "h-quixotic",
    category: "Language",
    difficulty: "Hard",
    question: "What does the adjective â€œquixoticâ€ mean?",
    options: ["Idealistic and impractical", "Fiercely loyal", "Overly cautious", "Deeply pessimistic"],
    answer: 0,
    logic:
      "It comes from Don Quixote, Cervantes's knight who charges at windmills believing they are giants. The word describes noble ideals pursued with no regard for reality.",
    takeaway: "A single fictional character can bend a whole language.",
  },
  {
    id: "h-perspective",
    category: "Art",
    difficulty: "Hard",
    question: "Which is the earliest surviving painting to use systematic one-point linear perspective?",
    options: [
      "Masaccio's Holy Trinity",
      "Leonardo's Last Supper",
      "Giotto's Lamentation",
      "Michelangelo's Creation of Adam",
    ],
    answer: 0,
    logic:
      "Masaccio's Holy Trinity, painted around 1427 in Florence, uses a vanishing point to build a convincing illusion of depth. Brunelleschi had demonstrated the geometry a few years earlier, but Masaccio's work is the earliest surviving painted application.",
    takeaway: "Renaissance depth was engineering before it was decoration.",
  },
  {
    id: "h-harp",
    category: "Music",
    difficulty: "Hard",
    question: "Which instrument has 47 strings and seven pedals?",
    options: ["Concert harp", "Grand piano", "Pipe organ", "Harpsichord"],
    answer: 0,
    logic:
      "The modern double-action concert harp has 47 strings and seven pedals â€” one per note name â€” each with three positions. Pedals change the pitch of whole sets of strings at once.",
    takeaway: "A harp is a machine for retuning itself mid-piece.",
  },
  {
    id: "h-compiler",
    category: "Tech",
    difficulty: "Hard",
    question: "Which technology is Grace Hopper credited with pioneering?",
    options: ["The compiler", "The computer mouse", "The transistor", "The web browser"],
    answer: 0,
    logic:
      "Hopper's A-0 system in 1952 translated symbolic instructions into machine code â€” an early compiler. She later helped drive COBOL, making code portable between machines.",
    takeaway: "The compiler is the invisible translator beneath every program.",
  },
  {
    id: "h-venus-day",
    category: "Space",
    difficulty: "Hard",
    question: "Why is a day on Venus longer than its year?",
    options: [
      "Venus rotates extremely slowly and in reverse",
      "Venus orbits the Sun in reverse",
      "Venus has no axis of rotation",
      "The Sun's gravity has locked Venus in place",
    ],
    answer: 0,
    logic:
      "Venus orbits the Sun in about 225 Earth days but takes roughly 243 Earth days to rotate once â€” and it spins retrograde. Its sidereal day genuinely exceeds its year.",
    takeaway: "There's no law that a planet's day must be shorter than its year.",
  },
  {
    id: "h-hydrogen",
    category: "Space",
    difficulty: "Hard",
    question: "What is the most abundant element in the universe by mass?",
    options: ["Hydrogen", "Helium", "Oxygen", "Carbon"],
    answer: 0,
    logic:
      "Hydrogen makes up roughly three quarters of ordinary matter by mass, with helium a distant second at around a quarter. Everything heavier comes from stars and supernovae.",
    takeaway: "The universe is mostly the simplest possible atom.",
  },
  {
    id: "h-occam",
    category: "Philosophy",
    difficulty: "Hard",
    question: "What does Occam's razor advise?",
    options: [
      "Prefer the simplest sufficient explanation",
      "Complicated explanations are likelier to be true",
      "Only observable claims are meaningful",
      "Everything should be doubted at all times",
    ],
    answer: 0,
    logic:
      "The principle is usually stated as â€œdo not multiply entities beyond necessity.â€ It does not say simple theories are always true â€” just that unnecessary assumptions should be trimmed first.",
    takeaway: "A razor cuts assumptions, not truth.",
  },
  {
    id: "h-jaws",
    category: "Film",
    difficulty: "Hard",
    question: "Which 1975 Steven Spielberg film is widely credited with inventing the summer blockbuster?",
    options: ["Jaws", "Star Wars", "Jurassic Park", "E.T. the Extra-Terrestrial"],
    answer: 0,
    logic:
      "Jaws opened wide on hundreds of screens with a huge national marketing push, then became the highest-grossing film of its time. Studios copied that wide-release model for decades.",
    takeaway: "A mechanical shark and a two-note theme rewired the movie business.",
  },
  {
    id: "h-mobius",
    category: "Math",
    difficulty: "Hard",
    question: "How many edges does a MÃ¶bius strip have?",
    options: ["0", "1", "2", "Infinite"],
    answer: 1,
    logic:
      "A MÃ¶bius strip has one surface and one edge. Trace the boundary with a finger: you return to your starting point having covered what looks like two edges at once.",
    takeaway: "Topology cares about connectivity, not what your eyes expect.",
  },
  {
    id: "h-challenger-deep",
    category: "Geography",
    difficulty: "Hard",
    question: "What is the deepest known point in Earth's oceans?",
    options: ["Challenger Deep", "Tonga Trench", "Java Trench", "Puerto Rico Trench"],
    answer: 0,
    logic:
      "Challenger Deep, at the southern end of the Mariana Trench, reaches roughly 10,935 metres below sea level â€” deeper than Everest is tall.",
    takeaway: "The deepest ocean is less mapped than the surface of Mars.",
  },
  {
    id: "h-octopus-hearts",
    category: "Biology",
    difficulty: "Hard",
    question: "Which animal has three hearts?",
    options: ["Octopus", "Shark", "Elephant", "Hummingbird"],
    answer: 0,
    logic:
      "An octopus has two branchial hearts that push blood through the gills and one systemic heart for the rest of the body. Its blood is blue because it uses copper-based haemocyanin.",
    takeaway: "Evolution solves circulation with whatever chemistry is available.",
  },
  {
    id: "h-ultramarine",
    category: "Art",
    difficulty: "Hard",
    question: "Which pigment was so expensive that Renaissance artists reserved it for the Virgin Mary's robes?",
    options: ["Ultramarine", "Cochineal red", "Lead white", "Malachite green"],
    answer: 0,
    logic:
      "Ultramarine was ground from lapis lazuli mined in Afghanistan. At times it cost more than gold, so contracts often specified exactly how much could be used on a sacred figure.",
    takeaway: "Before synthetic dyes, colour was a line item in a contract.",
  },
  {
    id: "h-maya-zero",
    category: "History",
    difficulty: "Hard",
    question: "Which civilisation independently developed the concept of zero?",
    options: ["The Maya", "The Aztecs", "The Inca", "The Olmec"],
    answer: 0,
    logic:
      "Maya scribes used a shell-like glyph for zero in their vigesimal (base-20) calendar and number system, centuries before it reached Europe from India via the Arab world.",
    takeaway: "Zero is an invention, not an obvious observation.",
  },

  /* ------------------------------ BRUTAL ------------------------------ */
  {
    id: "b-light-speed",
    category: "Physics",
    difficulty: "Brutal",
    question: "A ship moves at 0.6c past Earth. At what speed does the light from its headlights move relative to Earth?",
    options: ["1.6c", "1.0c", "0.4c", "1.25c"],
    answer: 1,
    logic:
      "Light speed is invariant: every inertial observer measures it as c. The everyday â€œadd the speedsâ€ rule fails near light speed; the relativistic velocity addition formula gives (0.6c + c) / (1 + 0.6) = c.",
    takeaway: "Speeds don't simply add. Light always wins by exactly c.",
  },
  {
    id: "b-blue-sky",
    category: "Physics",
    difficulty: "Brutal",
    question: "Why is the sky blue rather than violet, even though violet light scatters more?",
    options: [
      "The atmosphere absorbs all violet light",
      "Sunlight contains less violet, and our eyes are less sensitive to it",
      "Violet light is refracted back into space",
      "Ozone converts violet into blue",
    ],
    answer: 1,
    logic:
      "Rayleigh scattering scales roughly as 1/Î»â´, so violet does scatter more. But the Sun emits less violet than blue, and human cone cells respond far less to violet. The mix that reaches your brain reads as blue.",
    takeaway: "Perception is a filter, not a measurement.",
  },
  {
    id: "b-e-pi",
    category: "Math",
    difficulty: "Brutal",
    question: "Which is larger: e^Ï€ or Ï€^e?",
    options: ["e^Ï€", "Ï€^e", "They are exactly equal", "There is no way to compare them"],
    answer: 0,
    logic:
      "Take natural logs: ln(e^Ï€) = Ï€ â‰ˆ 3.142, while ln(Ï€^e) = eÂ·ln Ï€ â‰ˆ 2.718 Ã— 1.145 â‰ˆ 3.111. Since Ï€ > eÂ·ln Ï€, e^Ï€ is larger (â‰ˆ 23.14 vs â‰ˆ 22.46).",
    takeaway: "Logarithms turn exponential beauty contests into simple comparisons.",
  },
  {
    id: "b-sevenths",
    category: "Math",
    difficulty: "Brutal",
    question: "What is the 100th digit after the decimal point in 1/7?",
    options: ["1", "4", "8", "5"],
    answer: 2,
    logic:
      "1/7 = 0.142857142857â€¦ â€” the block â€œ142857â€ repeats every 6 digits. 100 mod 6 = 4, and the fourth digit of the block is 8.",
    takeaway: "Reduce the index modulo the period, then count.",
  },
  {
    id: "b-immortal-jelly",
    category: "Biology",
    difficulty: "Brutal",
    question: "Which animal can, in principle, reverse its life cycle back to youth?",
    options: [
      "Axolotl",
      "Turritopsis dohrnii, the immortal jellyfish",
      "Tardigrade",
      "Lobster",
    ],
    answer: 1,
    logic:
      "Under stress, Turritopsis dohrnii can revert from adult medusa to its juvenile polyp stage through transdifferentiation. It can repeat the trick indefinitely unless it is eaten or killed.",
    takeaway: "â€œImmortalâ€ means biologically reversible, not indestructible.",
  },
  {
    id: "b-mitochondrial-eve",
    category: "Biology",
    difficulty: "Brutal",
    question: "What does â€œmitochondrial Eveâ€ actually refer to?",
    options: [
      "The first human female who ever lived",
      "Our most recent common ancestor in the maternal line",
      "The oldest human fossil ever found",
      "A purely mythological figure",
    ],
    answer: 1,
    logic:
      "She is the most recent woman from whom all living humans descend through an unbroken maternal line â€” roughly 150,000â€“200,000 years ago. Many other women lived then; she is the one whose mitochondrial lineage survived.",
    takeaway: "A common ancestor is not the only ancestor.",
  },
  {
    id: "b-planarian",
    category: "Biology",
    difficulty: "Brutal",
    question: "How can a planarian flatworm regrow an entire body from a small fragment?",
    options: [
      "Neoblasts â€” stem cells spread through its body",
      "Bacteria living in its gut",
      "It sheds its old body and starts over",
      "A single organ that regenerates everything else",
    ],
    answer: 0,
    logic:
      "Around 20â€“30% of a planarian's cells are neoblasts, pluripotent stem cells distributed throughout the body. After injury they migrate, multiply, and rebuild whatever tissue is missing.",
    takeaway: "Regeneration is a stem-cell logistics problem.",
  },
  {
    id: "b-diamond-graphite",
    category: "Chemistry",
    difficulty: "Brutal",
    question: "Diamond and graphite are both pure carbon. Why do they behave so differently?",
    options: [
      "Diamond contains different carbon isotopes",
      "Their carbon atoms are bonded into different networks",
      "Diamond is a metal and graphite is not",
      "Graphite has oxygen trapped between its layers",
    ],
    answer: 1,
    logic:
      "Diamond is a rigid three-dimensional tetrahedral network. Graphite is stacked sheets of hexagonal rings with weak forces between layers, so sheets slide free â€” that's why it writes.",
    takeaway: "Same atoms, different architecture, entirely different material.",
  },
  {
    id: "b-paper-money",
    category: "History",
    difficulty: "Brutal",
    question: "Which civilisation issued the first government-backed paper currency?",
    options: ["Song dynasty China", "The Roman Empire", "The Ottoman Empire", "Medieval Venice"],
    answer: 0,
    logic:
      "Private paper notes called jiaozi appeared in Sichuan in the 10th century. The Song state took the system over and began issuing government notes around 1024 to ease a copper shortage.",
    takeaway: "Paper money began as a solution to a coin shortage.",
  },
  {
    id: "b-tordesillas",
    category: "History",
    difficulty: "Brutal",
    question: "What did the Treaty of Tordesillas (1494) do?",
    options: [
      "Split newly claimed lands outside Europe between Spain and Portugal",
      "Ended the Hundred Years' War",
      "Created the Holy Roman Empire",
      "Abolished the transatlantic slave trade",
    ],
    answer: 0,
    logic:
      "Backed by Pope Alexander VI, the treaty drew a meridian through the Atlantic and divided claims to supposedly undiscovered non-European lands between the two sea powers.",
    takeaway: "Two European states tried to divide the planet with a line on a map.",
  },
  {
    id: "b-khmer",
    category: "Language",
    difficulty: "Brutal",
    question: "Which language's script holds the Guinness record for the world's largest alphabet, at 74 letters?",
    options: ["Khmer", "Georgian", "Japanese", "Tamil"],
    answer: 0,
    logic:
      "Khmer, the official language of Cambodia, is credited with 74 letters, counting its consonants, vowels and their variants. Georgian has 33 letters and the Japanese kana sets are syllabaries, not alphabets.",
    takeaway: "An alphabet is not the same thing as a writing system.",
  },
  {
    id: "b-bauhaus",
    category: "Art",
    difficulty: "Brutal",
    question: "In which German city did the Bauhaus school open in 1919?",
    options: ["Weimar", "Berlin", "Dessau", "Munich"],
    answer: 0,
    logic:
      "Walter Gropius founded the Bauhaus in Weimar. Political pressure later moved it to Dessau (1925) and then Berlin (1932) before the Nazis forced it closed in 1933.",
    takeaway: "The Bauhaus was a moving target â€” three cities in fourteen years.",
  },
  {
    id: "b-kuleshov",
    category: "Film",
    difficulty: "Brutal",
    question: "What does the Kuleshov effect demonstrate about film editing?",
    options: [
      "Meaning emerges from the juxtaposition of shots",
      "Sound matters more than the image",
      "Color is the strongest carrier of emotion",
      "Slow motion creates suspense",
    ],
    answer: 0,
    logic:
      "Soviet filmmaker Lev Kuleshov cut the same neutral actor's face against a bowl of soup, a coffin and a child. Audiences read different emotions into the identical shot. The cut created the meaning.",
    takeaway: "In cinema, the edit is a co-author of the performance.",
  },
  {
    id: "b-lamarr",
    category: "Tech",
    difficulty: "Brutal",
    question: "Who co-invented a frequency-hopping communication system that helped pave the way for Wi-Fi and Bluetooth?",
    options: ["Hedy Lamarr", "Ada Lovelace", "Grace Hopper", "Marie Curie"],
    answer: 0,
    logic:
      "Film star Hedy Lamarr and composer George Antheil patented a frequency-hopping torpedo-guidance system in 1942. The idea â€” jumping across frequencies to resist jamming â€” echoes through modern spread-spectrum wireless.",
    takeaway: "Breakthroughs often arrive from outside the obvious field.",
  },
  {
    id: "b-stable-sort",
    category: "Tech",
    difficulty: "Brutal",
    question: "Which sorting algorithm has an O(n log n) worst case AND is stable?",
    options: ["Merge sort", "Quicksort", "Heapsort", "Selection sort"],
    answer: 0,
    logic:
      "Merge sort reliably splits and merges in O(n log n), and it preserves the relative order of equal elements when merge comparisons are written correctly. Heapsort is O(n log n) but unstable; quicksort can degrade to O(nÂ²).",
    takeaway: "Big-O alone doesn't capture stability â€” or worst-case luck.",
  },
  {
    id: "b-theseus",
    category: "Philosophy",
    difficulty: "Brutal",
    question: "What question is the Ship of Theseus paradox really asking?",
    options: [
      "Whether an object stays the same when every part is replaced",
      "How ancient ships were navigated",
      "Whether free will exists",
      "Why the past cannot be known",
    ],
    answer: 0,
    logic:
      "If every plank of a ship is replaced one by one, is it still the same ship? The thought experiment tests whether identity comes from material parts, continuity, or something else â€” the same puzzle applies to your cells over time.",
    takeaway: "Persistence through change is a believe-it-into-being question.",
  },
  {
    id: "b-opportunity-cost",
    category: "Economics",
    difficulty: "Brutal",
    question: "Which economist is credited with coining the term â€œopportunity costâ€?",
    options: ["John Stuart Mill", "Adam Smith", "John Maynard Keynes", "Milton Friedman"],
    answer: 0,
    logic:
      "Mill used the phrase in his 1848 Principles of Political Economy. The idea predates him, but his framing of the cost of a choice as the value of the next-best alternative stuck.",
    takeaway: "Every â€œyesâ€ is a silent â€œnoâ€ to something else.",
  },
  {
    id: "b-point-nemo",
    category: "Geography",
    difficulty: "Brutal",
    question: "Point Nemo, the point on the ocean farthest from any land, lies in which ocean?",
    options: ["The Pacific Ocean", "The Atlantic Ocean", "The Indian Ocean", "The Southern Ocean"],
    answer: 0,
    logic:
      "Point Nemo sits in the South Pacific, roughly 2,688 km from the nearest land â€” often the International Space Station is the closest thing to another human. It is named after Captain Nemo.",
    takeaway: "The farthest place from land is also a spacecraft graveyard.",
  },
  {
    id: "b-event-horizon",
    category: "Space",
    difficulty: "Brutal",
    question: "For a non-rotating black hole, the radius of the event horizon grows how with mass?",
    options: ["Linearly with mass", "With the square of mass", "With the spin only", "It does not change at all"],
    answer: 0,
    logic:
      "The Schwarzschild radius is Rs = 2GM/cÂ², which is directly proportional to mass. Double the mass and the event horizon doubles in radius.",
    takeaway: "Event horizons scale simply; the weirdness lives inside.",
  },
  {
    id: "b-tristan",
    category: "Music",
    difficulty: "Brutal",
    question: "Why is the â€œTristan chordâ€ from Wagner's Tristan und Isolde famous?",
    options: [
      "Its unresolved harmonic ambiguity",
      "It was the first chord ever played on a piano",
      "It is a twelve-tone row",
      "It contains no notes, only silence",
    ],
    answer: 0,
    logic:
      "The opening chord's function is ambiguous and its resolution is famously delayed. For Wagner's contemporaries it sounded like tonal gravity had been suspended, a landmark moment in the breakdown of traditional harmony.",
    takeaway: "A single chord can destabilise an entire musical language.",
  },
  {
    id: "b-birthday",
    category: "Math",
    difficulty: "Brutal",
    question: "In a room of 23 people, roughly what is the chance that two share a birthday?",
    options: ["About 12%", "About 25%", "About 50%", "About 90%"],
    answer: 2,
    logic:
      "23 people create 253 possible pairs. The chance that all birthdays differ is about 49.3%, leaving roughly 50.7% for at least one match.",
    takeaway: "Count pairs, not people â€” intuition misreads probability growth.",
  },
  {
    id: "b-gut-bacteria",
    category: "Biology",
    difficulty: "Brutal",
    question: "Where in the human body do bacteria make up the greatest total biomass?",
    options: ["The large intestine (colon)", "The skin", "The mouth", "The small intestine"],
    answer: 0,
    logic:
      "The colon hosts an enormous, dense microbial community â€” trillions of cells. Acid in the stomach and rapid transit in the small intestine keep those regions much sparser.",
    takeaway: "Living with microbes is a designed feature, not an accident.",
  },
  {
    id: "b-gdp",
    category: "Economics",
    difficulty: "Brutal",
    question: "Why is GDP criticised as a measure of national welfare?",
    options: [
      "It omits unpaid household work, inequality and environmental damage",
      "It counts only exports",
      "It counts only government spending",
      "It ignores corporate profits",
    ],
    answer: 0,
    logic:
      "GDP measures market transactions, not wellbeing. A parent caring for a child, a thriving ecosystem, or the distribution of income barely register â€” while destructive activity can push GDP upward.",
    takeaway: "Measuring output is not the same as measuring progress.",
  },
  {
    id: "b-titan",
    category: "Space",
    difficulty: "Brutal",
    question: "Which planet's moon Titan has a thick nitrogen-rich atmosphere and lakes of liquid methane?",
    options: ["Jupiter", "Saturn", "Neptune", "Mars"],
    answer: 1,
    logic:
      "Titan is Saturn's largest moon. It is the only moon known to have a substantial atmosphere, and its surface hosts stable lakes and seas of liquid hydrocarbons.",
    takeaway: "In our Solar System, other worlds have weather â€” just not water's.",
  },

  /* ----------------------------- LEGENDARY ----------------------------- */
  {
    id: "l-photon-redshift",
    category: "Physics",
    difficulty: "Legendary",
    question: "A photon climbs out of a gravity well. What happens to it?",
    options: [
      "It slows down",
      "It speeds up",
      "Its speed stays c, but its frequency drops",
      "It stops completely at infinity",
    ],
    answer: 2,
    logic:
      "The photon loses energy to gravity, but locally every observer still measures light at c. Energy falls as E = hf, so frequency drops and wavelength lengthens â€” gravitational redshift.",
    takeaway: "Light can lose energy without slowing down.",
  },
  {
    id: "l-entanglement",
    category: "Physics",
    difficulty: "Legendary",
    question: "According to the no-signalling theorem, quantum entanglement cannot be used to do what?",
    options: [
      "Send information faster than light",
      "Produce correlated measurements",
      "Remain correlated across vast distances",
      "Violate Bell's inequality",
    ],
    answer: 0,
    logic:
      "Entangled outcomes are correlated, but each party's local results look random until classical information is shared. No measurement choice can transmit a faster-than-light signal.",
    takeaway: "Spooky correlation is not a telegraph.",
  },
  {
    id: "l-mersenne",
    category: "Math",
    difficulty: "Legendary",
    question: "What makes the number 2Â³Â¹ âˆ’ 1 (2,147,483,647) remarkable?",
    options: [
      "It is prime",
      "It is a perfect square",
      "It is divisible by 7",
      "It is a Fibonacci number",
    ],
    answer: 0,
    logic:
      "2,147,483,647 is a Mersenne prime, proved by Euler in 1772. It was the largest known prime for over a century â€” and later became infamous as the maximum value of a 32-bit signed integer.",
    takeaway: "A number can be both a mathematical marvel and a crash waiting to happen.",
  },
  {
    id: "l-paperfold",
    category: "Math",
    difficulty: "Legendary",
    question: "Starting with a sheet 0.1 mm thick, about how many folds would reach the Moon?",
    options: ["About 12 folds", "About 22 folds", "About 42 folds", "About 72 folds"],
    answer: 2,
    logic:
      "Every fold doubles the thickness: 0.1 mm Ã— 2^42 â‰ˆ 4.4 Ã— 10^8 m, around 440,000 km. The Moon averages about 384,400 km away, so 42 doublings get you there.",
    takeaway: "Exponential growth hides in plain sight â€” until it doesn't.",
  },
  {
    id: "l-dark-energy",
    category: "Space",
    difficulty: "Legendary",
    question: "Roughly what share of the universe's total energy density is dark energy?",
    options: ["About 5%", "About 27%", "About 68%", "About 95%"],
    answer: 2,
    logic:
      "Planck mission data put dark energy near 68%, dark matter near 27%, and ordinary baryonic matter near 5%. Everything humans have ever seen is the small slice.",
    takeaway: "The universe is not made of the stuff that makes up you.",
  },
  {
    id: "l-shortest-war",
    category: "History",
    difficulty: "Legendary",
    question: "Which conflict is generally considered the shortest war in recorded history, lasting about 38 minutes?",
    options: ["The Anglo-Zanzibar War", "The Six-Day War", "The Pig War", "The War of the Bucket"],
    answer: 0,
    logic:
      "In 1896, a British ultimatum to Zanzibar expired and naval bombardment began. The sultan's forces surrendered after roughly 38 minutes. The â€œwarâ€ is cited as the briefest recorded international conflict.",
    takeaway: "History's extremes are often administrative accidents.",
  },
  {
    id: "l-antikythera",
    category: "History",
    difficulty: "Legendary",
    question: "What was the Antikythera mechanism, recovered from a Roman-era shipwreck, designed to do?",
    options: [
      "Predict astronomical positions and eclipses",
      "Navigate using magnetism",
      "Record the first Olympic winners",
      "Encode a lost alphabet",
    ],
    answer: 0,
    logic:
      "The bronze geared device, dated to around the 2nd century BCE, modeled the movements of the Sun and Moon and predicted eclipses. It is often called the world's oldest known analog computer.",
    takeaway: "Complex geared computing existed long before the Industrial Revolution.",
  },
  {
    id: "l-baikal",
    category: "Geography",
    difficulty: "Legendary",
    question: "Which lake holds roughly one fifth of the world's unfrozen surface fresh water?",
    options: ["Lake Baikal", "Lake Superior", "Lake Victoria", "Lake Michigan"],
    answer: 0,
    logic:
      "Lake Baikal in Siberia is the deepest and oldest freshwater lake on Earth, containing more water than all the North American Great Lakes combined â€” about 22% of the world's unfrozen surface fresh water.",
    takeaway: "One rift lake holds more fresh water than a continent.",
  },
  {
    id: "l-set",
    category: "Language",
    difficulty: "Legendary",
    question: "Which English word is usually cited as having the most distinct dictionary definitions?",
    options: ["Run", "Set", "Take", "Get"],
    answer: 1,
    logic:
      "The Oxford English Dictionary lists â€œsetâ€ with hundreds of distinct senses and compounds â€” the standard pub-quiz answer, though lexicographers argue over how senses are counted. â€œRunâ€ is a strong runner-up.",
    takeaway: "Dictionaries don't define words; they negotiate them.",
  },
  {
    id: "l-nietzsche",
    category: "Philosophy",
    difficulty: "Legendary",
    question: "Nietzsche's thought experiment of â€œeternal recurrenceâ€ asks you to do what?",
    options: [
      "Live so you could will every moment to repeat forever",
      "Accept literal reincarnation",
      "Reject all moral values",
      "Put the state above the individual",
    ],
    answer: 0,
    logic:
      "In The Gay Science, a demon asks whether you would curse or bless the news that you must live your life again, endlessly, with every pain and joy. It is a test of whether you affirm your life as it is.",
    takeaway: "The thought experiment is about affirmation, not reincarnation.",
  },
  {
    id: "l-coase",
    category: "Economics",
    difficulty: "Legendary",
    question: "What does the Coase theorem say happens when transaction costs are zero?",
    options: [
      "The initial allocation of property rights doesn't affect efficiency",
      "Tariffs always increase national welfare",
      "Inflation is always a monetary phenomenon",
      "Governments can never create a market",
    ],
    answer: 0,
    logic:
      "If parties can bargain freely and costlessly, they will reach an efficient outcome regardless of who starts with the rights. Coase's point was that in the real world, transaction costs are precisely why institutions matter.",
    takeaway: "The theorem's assumption is the real-world lesson.",
  },
  {
    id: "l-halting",
    category: "Tech",
    difficulty: "Legendary",
    question: "What did Alan Turing prove about the halting problem in 1936?",
    options: [
      "No general algorithm can decide whether every program halts",
      "Every program eventually halts",
      "Infinite loops are impossible in theory",
      "AI can never pass the Turing test",
    ],
    answer: 0,
    logic:
      "By diagonalisation, Turing showed that a general program able to decide halting for all possible programs would contradict itself. Some questions about code are provably undecidable.",
    takeaway: "Computing has fundamental limits â€” and they were proved on paper.",
  },
];
