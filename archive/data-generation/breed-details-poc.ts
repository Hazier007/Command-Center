// Proof of Concept: Breed Details voor hondenpups.be
// Format: TypeScript object per ras (kan naar JSON geconverteerd worden)

interface BreedDetails {
  breedName: string; // Engelse naam (canonical)
  breedNameNL: string; // Nederlandse naam
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  funFacts: string[];
  history: {
    origin: string; // Alinea 1: waar komt het ras vandaan
    development: string; // Alinea 2-3: hoe is het ras ontwikkeld
  };
  similarBreeds: string[]; // Vergelijkbare rassen
  commonMistakes: string[]; // Veelgemaakte fouten
  monthlyCosts: {
    food: string;
    vet: string;
    grooming: string;
    insurance: string;
    total: string;
    note: string;
  };
}

// ===== Labrador Retriever =====
export const labradorRetriever: BreedDetails = {
  breedName: "Labrador Retriever",
  breedNameNL: "Labrador Retriever",
  faqs: [
    {
      question: "Verhaart een Labrador veel?",
      answer: "Ja, Labradors verharen intensief door hun dubbele vacht. Vooral in het voorjaar en najaar verliezen ze flink wat haar. Borstel je Labrador minimaal 2x per week om losse haren te verwijderen en de vacht gezond te houden."
    },
    {
      question: "Is een Labrador geschikt voor een appartement?",
      answer: "Een Labrador kan in een appartement wonen, maar het is niet ideaal. Ze hebben veel beweging nodig (1,5-2 uur per dag) en voelen zich het prettigst met een tuin. Zonder voldoende uitlaatmogelijkheden kunnen gedragsproblemen ontstaan."
    },
    {
      question: "Hoeveel beweging heeft een Labrador nodig?",
      answer: "Een volwassen Labrador heeft minimaal 1,5 tot 2 uur beweging per dag nodig. Dit kan bestaan uit wandelen, rennen, zwemmen of apporteren. Labradors zijn actieve honden die zonder voldoende beweging overgewicht kunnen krijgen."
    },
    {
      question: "Zijn Labradors goed met kinderen?",
      answer: "Ja, Labradors staan bekend als uitstekende gezinshonden. Ze zijn geduldig, vriendelijk en speels met kinderen. Hun vriendelijke karakter en drang om te behagen maken ze perfect voor gezinnen, maar leer kinderen wel respectvol met de hond om te gaan."
    },
    {
      question: "Welke gezondheidsproblemen komen vaak voor bij Labradors?",
      answer: "Labradors zijn gevoelig voor heupdysplasie, elleboogdysplasie, obesitas, oorinfecties en oogproblemen zoals progressieve retina-atrofie (PRA). Kies altijd een fokker die ouderdieren screent op erfelijke aandoeningen."
    },
    {
      question: "Hoe oud wordt een Labrador gemiddeld?",
      answer: "Een gezonde Labrador wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles bij de dierenarts kan je Labrador een lang en gezond leven leiden."
    },
    {
      question: "Wat kost een Labrador pup in België?",
      answer: "Een Labrador pup met stamboom kost in België tussen €1.000 en €2.000, afhankelijk van de fokker en de kleur (chocolade is vaak duurder). Pups zonder stamboom zijn iets goedkoper (€850-€1.500), maar controleer altijd de gezondheid van de ouders."
    },
    {
      question: "Zijn Labradors makkelijk te trainen?",
      answer: "Ja, Labradors behoren tot de meest intelligente en trainbare rassen. Ze willen graag hun baas plezieren en reageren uitstekend op positieve bekrachtiging. Begin vroeg met training en socialisatie voor de beste resultaten."
    }
  ],
  funFacts: [
    "Labradors hebben een 'zachte bek' – ze kunnen een rauw ei dragen zonder het kapot te bijten. Dit maakt ze perfect voor het apporteren van wild tijdens de jacht.",
    "De oorspronkelijke naam van het ras was 'St. John's water dog', naar de stad in Newfoundland waar ze vandaan kwamen.",
    "Labradors zijn één van de populairste rassen ter wereld en staan al decennia in de top 3 van meest geregistreerde honden.",
    "Ze hebben zwemvliezen tussen hun tenen, wat hen uitstekende zwemmers maakt.",
    "Labradors komen in drie officiële kleuren: zwart, geel (van crème tot rood) en chocolade. De genetica bepaalt de kleur van de pups."
  ],
  history: {
    origin: "De Labrador Retriever vindt zijn oorsprong niet in Labrador, maar in Newfoundland, Canada. In de 18e eeuw fokten vissers daar de voorouder van de Labrador: de St. John's water dog. Deze honden hielpen vissers door netten uit het ijskoude water te halen en ontsnapte vis terug te brengen.",
    development: "In de 19e eeuw werden St. John's water dogs geïmporteerd naar Engeland, waar ze de aandacht trokken van jachtliefhebbers. Edellieden zoals de Earl of Malmesbury en de Duke of Buccleuch begonnen deze honden te fokken en kruisten ze met rassen zoals de Tweed Water Spaniel. Zo ontstond de moderne Labrador Retriever, een ras dat uitblonk in het apporteren van waterwild.\n\nHet ras werd in 1903 officieel erkend door de Kennel Club in Engeland. Sindsdien is de Labrador uitgegroeid tot één van de meest veelzijdige rassen: ze werken als blindengeleidehond, reddingshond, speurhond en blijven populair als gezinshond en jachthond."
  },
  similarBreeds: [
    "Golden Retriever",
    "Flat-Coated Retriever",
    "Chesapeake Bay Retriever",
    "Curly-Coated Retriever"
  ],
  commonMistakes: [
    "Overvoeren: Labradors hebben een enorm eetlust en zijn gevoelig voor obesitas. Volg de voedingsrichtlijnen strikt en beperk tussendoortjes.",
    "Te weinig beweging: Een Labrador zonder voldoende beweging wordt ongelukkig en kan destructief gedrag vertonen of overgewicht krijgen.",
    "Geen mentale uitdaging: Labradors zijn intelligent en hebben naast fysieke beweging ook mentale stimulatie nodig (zoals apporteerspelletjes, zoekwerk of training).",
    "Te laat starten met training: Begin zo vroeg mogelijk met gehoorzaamheidstraining en socialisatie om ongewenst gedrag te voorkomen.",
    "Oren verwaarlozen: Labradors hebben hangende oren en zijn gevoelig voor oorinfecties. Controleer en reinig de oren regelmatig."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€15-€30",
    total: "€95-€170",
    note: "Kosten kunnen hoger uitvallen door gezondheidsproblemen zoals heupdysplasie of obesitas. Houd rekening met eenmalige kosten zoals aanschaf (€1.000-€2.000), puppy cursus (€100-€200) en hondenbelasting (€30-€100/jaar afhankelijk van gemeente)."
  }
};

// ===== Golden Retriever =====
export const goldenRetriever: BreedDetails = {
  breedName: "Golden Retriever",
  breedNameNL: "Golden Retriever",
  faqs: [
    {
      question: "Zijn Golden Retrievers geschikt voor beginners?",
      answer: "Ja, Golden Retrievers zijn uitstekend voor beginners. Ze zijn vriendelijk, trainbaar en geduldig. Hun drang om te behagen maakt training eenvoudig, maar ze hebben wel veel aandacht en beweging nodig."
    },
    {
      question: "Hoeveel beweging heeft een Golden Retriever nodig?",
      answer: "Een Golden Retriever heeft minimaal 1,5 tot 2 uur beweging per dag nodig. Ze houden van wandelen, zwemmen, rennen en apporteren. Zonder voldoende beweging kunnen ze verveling en gedragsproblemen ontwikkelen."
    },
    {
      question: "Verhaart een Golden Retriever veel?",
      answer: "Ja, Golden Retrievers verharen intensief door hun lange, dubbele vacht. Vooral in het voorjaar en najaar verliezen ze veel haar. Borstel je Golden minimaal 3-4x per week om losse haren te verwijderen."
    },
    {
      question: "Zijn Golden Retrievers goede waakhonden?",
      answer: "Nee, Golden Retrievers zijn te vriendelijk om goede waakhonden te zijn. Ze begroeten vreemden meestal enthousiast in plaats van afwerend. Ze zijn ideaal als gezinshond, maar niet als bewaker."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Golden Retrievers?",
      answer: "Golden Retrievers hebben een hoger risico op kanker (tot 65% kans), heupdysplasie, elleboogdysplasie, hartproblemen en oogaandoeningen zoals progressieve retina-atrofie (PRA). Regelmatige controles zijn essentieel."
    },
    {
      question: "Hoe oud wordt een Golden Retriever?",
      answer: "Een Golden Retriever wordt gemiddeld 10 tot 12 jaar oud. Helaas is de levensverwachting lager dan bij veel andere rassen door de hoge kans op kanker."
    },
    {
      question: "Kunnen Golden Retrievers lang alleen zijn?",
      answer: "Nee, Golden Retrievers zijn zeer sociaal en kunnen scheidingsangst ontwikkelen als ze te lang alleen zijn. Laat ze maximaal 4-7 uur alleen en zorg voor gezelschap of een hondenoppas bij langere afwezigheid."
    },
    {
      question: "Wat kost een Golden Retriever pup?",
      answer: "Een Golden Retriever pup met stamboom kost tussen €1.200 en €2.500, afhankelijk van de fokker en afstamming. Kies altijd een erkende fokker die ouderdieren screent op erfelijke aandoeningen."
    }
  ],
  funFacts: [
    "De eerste foto ooit geüpload op Instagram (2010) was van een Golden Retriever pup!",
    "Finley, een Golden uit New York, houdt het wereldrecord voor het meeste aantal tennisballen tegelijk in zijn bek: 6 stuks.",
    "Charlie, een Golden uit Australië, heeft het luidste hondenblaf ooit gemeten: 113,1 decibel (zo luid als een kettingzaag).",
    "Golden Retrievers hebben zwemvliezen tussen hun tenen en zwemmen instinctief graag.",
    "Ze hebben een 'zachte bek' zo zacht dat ze een rauw ei kunnen dragen zonder de schaal te breken.",
    "Twee Amerikaanse presidenten (Gerald Ford en Ronald Reagan) hadden Golden Retrievers tijdens hun ambtsperiode."
  ],
  history: {
    origin: "De Golden Retriever werd in de late 19e eeuw ontwikkeld in Schotland door Sir Dudley Marjoribanks, later bekend als de eerste Lord Tweedmouth. Hoewel er een mythe bestaat dat het ras afstamt van Russische circushonden, is de echte oorsprong veel prozaïscher: in 1865 kocht Marjoribanks een gele Flat-Coated Retriever genaamd 'Nous' van een schoenmaker in Brighton.",
    development: "Marjoribanks kruiste Nous met een Tweed Water Spaniel (nu uitgestorven) genaamd 'Belle', wat leidde tot het eerste nest in 1868. Dit nest bevatte drie beroemde pups: Cowslip, Crocus en Primrose, die de basis vormden van het moderne ras. Gedurende 20 jaar verfijnde Marjoribanks de lijn door kruisingen met Labradors, Ierse Setters en andere retrievers.\n\nHet doel was een robuuste jachthond te creëren die zowel op land als in water kon werken, en die een zachte bek had om wild onbeschadigd terug te brengen. Het ras werd officieel erkend in 1911 door de Kennel Club. Sindsdien is de Golden Retriever uitgegroeid tot één van de meest populaire gezinshonden ter wereld, en wordt hij ook veel ingezet als therapiehond, reddingshond en blindengeleidehond."
  },
  similarBreeds: [
    "Labrador Retriever",
    "Flat-Coated Retriever",
    "Nova Scotia Duck Tolling Retriever",
    "English Setter"
  ],
  commonMistakes: [
    "Te weinig beweging: Golden Retrievers zijn actieve honden die niet als bankhonden moeten worden behandeld. Zonder beweging worden ze ongelukkig.",
    "Overvoeren: Net als Labradors hebben Goldens een groot eetlust en zijn ze gevoelig voor obesitas. Let op portiegroottes.",
    "Verwaarlozen van de vacht: Hun lange vacht vraagt veel onderhoud. Regelmatig borstelen voorkomt klitten en huidproblemen.",
    "Te lang alleen laten: Goldens zijn extreem sociaal en kunnen scheidingsangst ontwikkelen. Plan gezelschap in.",
    "Geen vroege socialisatie: Hoewel Goldens vriendelijk zijn, is socialisatie essentieel om nervositeit of angst te voorkomen.",
    "Onvoldoende mentale uitdaging: Deze intelligente honden hebben naast fysieke beweging ook puzzels, training en zoekwerk nodig."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€30-€60",
    grooming: "€40-€80",
    insurance: "€20-€40",
    total: "€150-€280",
    note: "Kosten kunnen hoger uitvallen door het verhoogde risico op kanker en andere gezondheidsproblemen. Professionele trimming kost €50-€100 per sessie (4-6x per jaar). Levenslange kosten worden geschat op €23.000 over 10-12 jaar."
  }
};

// ===== Franse Bulldog =====
export const franseBulldog: BreedDetails = {
  breedName: "French Bulldog",
  breedNameNL: "Franse Bulldog",
  faqs: [
    {
      question: "Is een Franse Bulldog geschikt voor een appartement?",
      answer: "Ja, Franse Bulldogs zijn uitstekend geschikt voor appartementen. Ze zijn klein, rustig en hebben weinig beweging nodig. Ze blaffen niet veel en passen goed in stadsomgevingen."
    },
    {
      question: "Hoeveel beweging heeft een Franse Bulldog nodig?",
      answer: "Franse Bulldogs hebben weinig beweging nodig: 2-3 korte wandelingen van 15-20 minuten per dag is voldoende. Vermijd overmatige inspanning, vooral bij warm weer, vanwege hun korte snuit."
    },
    {
      question: "Kunnen Franse Bulldogs goed zwemmen?",
      answer: "Nee, Franse Bulldogs zijn slechte zwemmers door hun korte snuit, zware kop en korte poten. Ze kunnen snel verdrinken. Laat ze nooit zonder toezicht bij water en overweeg een zwemvest."
    },
    {
      question: "Zijn Franse Bulldogs goed met kinderen?",
      answer: "Ja, Franse Bulldogs zijn vriendelijk, geduldig en speels met kinderen. Ze zijn aanhankelijk en houden ervan om in het middelpunt te staan. Leer kinderen wel voorzichtig te zijn met de oren en rug."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Franse Bulldogs?",
      answer: "Franse Bulldogs zijn gevoelig voor ademhalingsproblemen (brachycefaal syndroom), huidproblemen in rimpels, rugproblemen, ooginfecties en oververhitting. Regelmatige controles en voorzichtigheid bij warm weer zijn essentieel."
    },
    {
      question: "Snurken Franse Bulldogs?",
      answer: "Ja, de meeste Franse Bulldogs snurken flink door hun korte snuit en platte gezicht. Dit is normaal voor het ras, maar kan wijzen op ademhalingsproblemen als het extreem is."
    },
    {
      question: "Hoe oud wordt een Franse Bulldog?",
      answer: "Een Franse Bulldog wordt gemiddeld 10 tot 12 jaar oud. Met goede zorg, een gezond gewicht en vermijding van oververhitting kunnen sommige ouder worden."
    },
    {
      question: "Wat kost een Franse Bulldog pup in België?",
      answer: "Een Franse Bulldog pup met stamboom kost tussen €1.500 en €3.000 in België, afhankelijk van de fokker en kleur (zeldzame kleuren zoals blauw zijn duurder). Controleer altijd de gezondheid van de ouders en vermijd broodfokkers."
    }
  ],
  funFacts: [
    "Franse Bulldogs kunnen niet zwemmen door hun lichaamsbouw – hun zware kop en korte poten maken het bijna onmogelijk.",
    "Het ras was enorm populair bij Parijse kunstenaars en schrijvers in de 19e eeuw, waaronder Toulouse-Lautrec.",
    "Franse Bulldogs hebben 'vleermuis oren' die rechtop staan, in tegenstelling tot de ronde 'roos oren' van Engelse Bulldogs.",
    "Ze zijn één van de weinige rassen die vaak door keizersnede geboren moeten worden vanwege hun grote kop.",
    "Franse Bulldogs zijn meesters in het slapen – ze kunnen gemakkelijk 12-14 uur per dag slapen.",
    "Ondanks hun kleine formaat zijn ze opmerkelijk moedig en beschermend tegenover hun gezin."
  ],
  history: {
    origin: "De Franse Bulldog ontstond in de 19e eeuw, maar niet in Frankrijk. Het ras stamt af van kleinere Engelse 'toy bulldogs' die door Engelse kantwerkers werden meegenomen naar Noord-Frankrijk tijdens de Industriële Revolutie, vooral naar de regio's rond Parijs en Calais.",
    development: "In Frankrijk werden deze kleine bulldogs populair bij arbeiders en later bij de Parijse bohème. Franse fokkers kruisten de toy bulldogs met lokale rassen, waaronder mogelijk mopshonden en terriërs, wat leidde tot de kenmerkende 'vleermuis oren' die we nu kennen.\n\nHet ras werd in 1898 officieel erkend in de Verenigde Staten, en later in Europa. De Franse Bulldog werd een statussymbool onder kunstenaars, schrijvers en de welgestelde elite. Tegenwoordig is het één van de populairste stadsrassen ter wereld, geliefd om hun compacte formaat, vriendelijke karakter en onderhoudsvriendelijke vacht."
  },
  similarBreeds: [
    "Engelse Bulldog",
    "Boston Terrier",
    "Mopshond",
    "Bullmastiff (in karakter, niet formaat)"
  ],
  commonMistakes: [
    "Overvoeren: Franse Bulldogs zijn gevoelig voor obesitas, wat ademhalings- en gewrichtsproblemen verergert. Volg voedingsrichtlijnen strikt.",
    "Te veel inspanning bij warm weer: Hun korte snuit maakt ze gevoelig voor oververhitting. Vermijd wandelen in de hitte en zorg voor airconditioning.",
    "Rimpels niet reinigen: Huidrimpels moeten regelmatig gereinigd worden om infecties te voorkomen. Gebruik speciale doekjes.",
    "Geen socialisatie: Franse Bulldogs kunnen koppig zijn. Begin vroeg met training en socialisatie.",
    "Te lang alleen laten: Ze zijn zeer aanhankelijk en kunnen scheidingsangst ontwikkelen. Plan gezelschap in.",
    "Zwemmen zonder toezicht: Laat een Franse Bulldog nooit alleen bij water – ze kunnen niet zwemmen en verdrinken snel."
  ],
  monthlyCosts: {
    food: "€40-€60",
    vet: "€30-€70",
    grooming: "€10-€20",
    insurance: "€25-€50",
    total: "€105-€200",
    note: "Kosten kunnen hoger uitvallen door gezondheidsproblemen zoals ademhalingsproblemen, huidinfecties en oogproblemen. Franse Bulldogs zijn duur in aanschaf (€1.500-€3.000) en hebben vaak hogere dierenarts kosten dan gemiddeld. Eerste jaar totaal: €2.500-€4.000."
  }
};

// Export all breeds as array voor eenvoudige import
export const breedDetailsPoC = [
  labradorRetriever,
  goldenRetriever,
  franseBulldog
];
