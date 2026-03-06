// Batch 8: Breed Details voor hondenpups.be - Molossers & Mastiff Types
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

// ===== 141. Mastiff (Engels) =====
export const englishMastiff: BreedDetails = {
  breedName: "English Mastiff",
  breedNameNL: "Mastiff (Engels)",
  faqs: [
    {
      question: "Hoe groot wordt een Mastiff?",
      answer: "Een Mastiff is één van de grootste hondenrassen ter wereld. Reuen worden 76-91 cm hoog en wegen 73-100 kg, teven 70-84 cm en 54-82 kg. Sommige exemplaren kunnen zelfs meer dan 110 kg wegen. Ze hebben veel ruimte nodig."
    },
    {
      question: "Is een Mastiff geschikt voor een appartement?",
      answer: "Nee, Mastiffs zijn niet geschikt voor appartementen. Ze hebben veel ruimte nodig en bewegen zich het prettigst in een huis met een grote tuin. Hun formaat maakt een appartement onpraktisch en oncomfortabel."
    },
    {
      question: "Hoeveel beweging heeft een Mastiff nodig?",
      answer: "Mastiffs hebben matig beweging nodig: 1-1,5 uur per dag verdeeld over meerdere wandelingen. Vermijd overmatige inspanning, vooral bij jonge honden, omdat dit schadelijk is voor groeiende gewrichten. Ze zijn geen marathonlopers."
    },
    {
      question: "Zijn Mastiffs goede waakhonden?",
      answer: "Ja, Mastiffs zijn uitstekende waakhonden. Ze zijn natuurlijk beschermend, alert en intimiderend door hun imposante formaat. Ze zijn echter niet agressief en zullen pas ingrijpen als ze een echte bedreiging waarnemen."
    },
    {
      question: "Kwijlt een Mastiff veel?",
      answer: "Ja, Mastiffs kwijlen flink door hun losse lippen en grote bek. Houd doeken bij de hand en bereid je voor op kwijlsporen op meubilair en kleding. Dit is normaal voor het ras en niet te voorkomen."
    },
    {
      question: "Hoe oud wordt een Mastiff?",
      answer: "Mastiffs hebben helaas een relatief korte levensverwachting van 6 tot 10 jaar, met een gemiddelde van 7-8 jaar. Reuzenhondenrassen leven over het algemeen korter dan kleinere honden."
    },
    {
      question: "Zijn Mastiffs goed met kinderen?",
      answer: "Ja, Mastiffs zijn zachtaardig en geduldig met kinderen uit hun eigen gezin. Hun kalme karakter maakt ze geschikte gezinshonden, maar hun formaat vereist toezicht bij kleine kinderen die ze per ongeluk kunnen omverlopen."
    },
    {
      question: "Wat kost een Mastiff pup in België?",
      answer: "Een Mastiff pup met stamboom kost tussen €1.200 en €2.000 in België. Let op: de onderhoudskosten zijn hoog door de grote hoeveelheid voer, potentiële gezondheidsproblemen en hogere dierenartsenrekeningen."
    }
  ],
  funFacts: [
    "De zwaarste hond ooit gemeten was een Mastiff genaamd Zorba: hij woog 155,6 kg en was 94 cm hoog!",
    "Mastiffs werden door de oude Romeinen gebruikt als gevechtshonden in arena's tegen leeuwen en beren.",
    "Ondanks hun imposante formaat zijn Mastiffs vaak bang voor kleine dieren zoals katten of muizen.",
    "Het ras overleefde bijna niet na de Tweede Wereldoorlog – er waren minder dan 14 exemplaren in Engeland.",
    "Mastiffs hebben de krachtigste beet van alle hondenrassen, met een bijtdruk tot 556 PSI (pounds per square inch).",
    "Ze slapen gemiddeld 12-14 uur per dag en zijn daarmee echte 'gentle giants' die van luieren houden."
  ],
  history: {
    origin: "De Mastiff is één van de oudste hondenrassen ter wereld en stamt af van oude molossoïde honden uit Azië, waarschijnlijk Tibet. De Feniciërs brachten deze gigantische honden rond 500 v.Chr. naar Groot-Brittannië via handelsroutes. De Romeinen ontdekten de Britse Mastiffs tijdens hun invasie van Brittannië en waren zo onder de indruk dat ze exemplaren mee terug namen naar Rome.",
    development: "In de Middeleeuwen werden Mastiffs in Engeland gebruikt als jachthonden op groot wild zoals beren en wolven, en als bewakers van landgoederen. Hun moed en kracht maakten ze waardevol voor edellieden. Na de afschaffing van dierenvechten in de 19e eeuw werd het ras verfijnd tot een rustiger, gezinsgerichter dier.\n\nTijdens de Tweede Wereldoorlog stierf het ras bijna uit door voedseltekorten – grote honden waren te duur om te voeden. Slechts 14 Mastiffs overleefden in Engeland. Amerikaanse fokkers hielpen het ras te herstellen met import van Amerikaanse lijnen. De moderne Mastiff is een kalme, waardige wachter die door zijn imposante uiterlijk intimideert, maar door zijn zachte karakter wordt geliefd."
  },
  similarBreeds: [
    "Bullmastiff",
    "Napolitaanse Mastiff",
    "Tibetaanse Mastiff",
    "Bordeaux Dog"
  ],
  commonMistakes: [
    "Jonge Mastiffs te veel laten bewegen: Te veel inspanning tijdens de groei (tot 18-24 maanden) kan blijvende gewrichtsschade veroorzaken. Korte wandelingen zijn essentieel.",
    "Overvoeren: Mastiffs zijn gevoelig voor obesitas, wat gewrichten en hart extra belast. Volg voedingsrichtlijnen strikt.",
    "Te laat socialiseren: Een ongesocialiseerde Mastiff kan angstig of te beschermend worden. Begin vroeg met positieve ervaringen.",
    "Onvoldoende training: Ondanks hun kalme aard moet een Mastiff goed getraind zijn – een ongecontroleerde hond van 80 kg is gevaarlijk.",
    "Hitte onderschatten: Mastiffs zijn gevoelig voor oververhitting. Zorg voor schaduw, koelmatten en vermijd wandelen in de hitte.",
    "Kwijl negeren: Zonder hygiëne kunnen kwijlresten huidirritaties of infecties veroorzaken rondom de bek."
  ],
  monthlyCosts: {
    food: "€120-€180",
    vet: "€40-€80",
    grooming: "€15-€30",
    insurance: "€30-€60",
    total: "€205-€350",
    note: "Mastiffs zijn dure honden in onderhoud door hun enorme voedingsbehoefte en gezondheidsproblemen zoals heupdysplasie en hartproblemen. Dierenartsenrekeningen zijn hoger door het hogere gewicht (medicatie wordt per kg berekend). Levenslange kosten: €18.000-€30.000."
  }
};

// ===== 142. Bullmastiff =====
export const bullmastiff: BreedDetails = {
  breedName: "Bullmastiff",
  breedNameNL: "Bullmastiff",
  faqs: [
    {
      question: "Wat is het verschil tussen een Mastiff en een Bullmastiff?",
      answer: "Een Bullmastiff is kleiner en athletischer dan een Mastiff. Bullmastiffs werden gefokt door Mastiffs te kruisen met Bulldogs, wat resulteerde in een sneller, wendbaarder ras met een kortere snuit. Ze zijn actiever en hebben meer beweging nodig."
    },
    {
      question: "Zijn Bullmastiffs agressief?",
      answer: "Nee, goed gesocialiseerde Bullmastiffs zijn niet agressief. Ze zijn kalm, zelfverzekerd en beschermend zonder vijandig te zijn. Ze werden gefokt om indringers te tackelen zonder te bijten. Socialisatie en training zijn wel essentieel."
    },
    {
      question: "Hoeveel beweging heeft een Bullmastiff nodig?",
      answer: "Een Bullmastiff heeft matig beweging nodig: 1-1,5 uur per dag. Ze houden van wandelen en lichte activiteit, maar zijn geen marathonlopers. Vermijd te veel inspanning bij jonge honden vanwege groeiende gewrichten."
    },
    {
      question: "Zijn Bullmastiffs geschikt voor beginners?",
      answer: "Nee, Bullmastiffs zijn niet ideaal voor beginners. Ze zijn krachtig, eigenzinnig en hebben een zelfverzekerde, ervaren eigenaar nodig die consistent kan trainen. Zonder goede leiding kunnen ze dominant worden."
    },
    {
      question: "Kwijlt een Bullmastiff veel?",
      answer: "Ja, Bullmastiffs kwijlen door hun korte snuit en losse lippen, vooral na drinken of bij anticipatie op voedsel. Houd kwijldoeken bij de hand en accepteer dit als onderdeel van het ras."
    },
    {
      question: "Hoe oud wordt een Bullmastiff?",
      answer: "Een Bullmastiff wordt gemiddeld 7 tot 9 jaar oud. Zoals bij de meeste grote rassen is de levensverwachting korter dan bij kleinere honden."
    },
    {
      question: "Zijn Bullmastiffs goed met kinderen?",
      answer: "Ja, Bullmastiffs kunnen uitstekend met kinderen omgaan als ze goed gesocialiseerd zijn. Ze zijn geduldig en beschermend, maar hun formaat vereist toezicht bij jonge kinderen. Leer kinderen respectvol met de hond om te gaan."
    },
    {
      question: "Wat kost een Bullmastiff pup in België?",
      answer: "Een Bullmastiff pup met stamboom kost tussen €1.000 en €1.800 in België. Kies een erkende fokker die ouderdieren screent op heupdysplasie en andere erfelijke aandoeningen."
    }
  ],
  funFacts: [
    "Bullmastiffs werden in de 19e eeuw gefokt als 'gamekeeper's night dogs' om stropers te vangen op Engelse landgoederen.",
    "Ze werden getraind om indringers stil te tackelen en vast te houden zonder te bijten – hun taak was vangen, niet doden.",
    "De ideale mix voor dit werk was 60% Mastiff (kracht) en 40% Bulldog (moed en snelheid).",
    "Sylvester Stallone had een Bullmastiff genaamd Butkus die verscheen in de eerste twee Rocky-films.",
    "Ondanks hun imposante uiterlijk zijn Bullmastiffs vaak gevoelige honden die slecht reageren op harde training.",
    "Ze hebben een van de kortste vachten van alle honden en zijn daardoor gevoelig voor koude en hitte."
  ],
  history: {
    origin: "De Bullmastiff ontstond in het midden van de 19e eeuw in Engeland, specifiek gefokt voor de bescherming van landgoederen tegen stropers. Tijdens de Industriële Revolutie was stroperij een groot probleem – arme arbeiders jaagden illegaal op wild van rijke landeigenaren. Wildbeheerders (gamekeepers) hadden een hond nodig die stil, moedig en krachtig genoeg was om stropers te tackelen en vast te houden.",
    development: "Fokkers kruisten Mastiffs (voor kracht en massa) met Bulldogs (voor moed, vastberadenheid en snelheid), wat resulteerde in de ideale verhouding van 60% Mastiff en 40% Bulldog. Vroege Bullmastiffs waren donker van kleur om beter te camoufleren in de nacht. Later werden ook Bloodhounds ingekruist voor een betere reukvermogen.\n\nHet ras werd officieel erkend door de Kennel Club in 1924. Na de behoefte aan wildbescherming afnam, transformeerde de Bullmastiff tot een veelzijdige waakhond en gezinshond. Ze behielden hun natuurlijke beschermingsinstinct, maar werden vriendelijker en beheersder door selectieve fokkerij. Tegenwoordig zijn ze populair als zowel familie- als waakhond."
  },
  similarBreeds: [
    "Mastiff (Engels)",
    "Bordeaux Dog",
    "Cane Corso",
    "Rottweiler"
  ],
  commonMistakes: [
    "Jonge Bullmastiffs te hard trainen: Overmatige inspanning tijdens de groei kan blijvende gewrichtsschade veroorzaken. Rustig opbouwen is essentieel.",
    "Geen consequente training: Bullmastiffs zijn eigenzinnig en testen grenzen. Inconsistentie leidt tot dominantie.",
    "Te weinig socialisatie: Een ongesocialiseerde Bullmastiff kan te beschermend of wantrouwend worden. Vroege, positieve ervaringen zijn cruciaal.",
    "Harde trainingsmethoden: Bullmastiffs zijn gevoelig en reageren slecht op harde correcties. Gebruik altijd positieve bekrachtiging.",
    "Oververhitting: Bullmastiffs zijn gevoelig voor hitte door hun korte snuit. Vermijd wandelen in warme uren.",
    "Ondergewicht of overgewicht: Beide zijn schadelijk. Houd een gezond gewicht aan om gewrichten te beschermen."
  ],
  monthlyCosts: {
    food: "€80-€120",
    vet: "€30-€60",
    grooming: "€10-€20",
    insurance: "€25-€50",
    total: "€145-€250",
    note: "Bullmastiffs hebben hogere dierenartsenkosten door gezondheidsproblemen zoals heupdysplasie, elleboogdysplasie en opgeblazenheid (maagdraaiing). Budget voor jaarlijkse screenings en mogelijke operaties. Levenslange kosten: €15.000-€25.000."
  }
};

// ===== 143. Napolitaanse Mastiff =====
export const neapolitanMastiff: BreedDetails = {
  breedName: "Neapolitan Mastiff",
  breedNameNL: "Napolitaanse Mastiff",
  faqs: [
    {
      question: "Waarom heeft een Napolitaanse Mastiff zoveel rimpels?",
      answer: "De rimpels van de Napolitaanse Mastiff zijn oorspronkelijk gefokt om de hond te beschermen tegen bijtwonden – aanvallers kregen een mond vol losse huid in plaats van vlees of vitale organen. Tegenwoordig zijn de rimpels een kenmerkend rasattribuut."
    },
    {
      question: "Kwijlt een Napolitaanse Mastiff veel?",
      answer: "Ja, Napolitaanse Mastiffs kwijlen extreem veel door hun losse lippen en overvloed aan huid. Bereid je voor op constant kwijl op vloeren, meubilair en kleding. Dit is onvermijdelijk bij dit ras."
    },
    {
      question: "Zijn Napolitaanse Mastiffs agressief?",
      answer: "Nee, goed gesocialiseerde Napolitaanse Mastiffs zijn niet agressief, maar wel zeer beschermend en wantrouwend tegenover vreemden. Ze werden gefokt als wachthonden en nemen hun rol serieus. Training en socialisatie zijn absoluut essentieel."
    },
    {
      question: "Hoeveel beweging heeft een Napolitaanse Mastiff nodig?",
      answer: "Napolitaanse Mastiffs hebben matige beweging nodig: 1 uur per dag verdeeld over meerdere korte wandelingen. Ze zijn geen energieke atleten en overmatige inspanning kan schadelijk zijn voor hun gewrichten."
    },
    {
      question: "Zijn Napolitaanse Mastiffs geschikt voor beginners?",
      answer: "Nee, absoluut niet. Dit ras vereist een zeer ervaren eigenaar die assertief, consistent en kalm kan leiden. Een slecht opgevoede Napolitaanse Mastiff kan gevaarlijk zijn door hun kracht en beschermingsinstinct."
    },
    {
      question: "Hoe oud wordt een Napolitaanse Mastiff?",
      answer: "Een Napolitaanse Mastiff wordt gemiddeld 7 tot 9 jaar oud. Hun grote formaat en gezondheidsproblemen dragen bij aan een relatief korte levensverwachting."
    },
    {
      question: "Hoeveel weegt een Napolitaanse Mastiff?",
      answer: "Reuen wegen 60-70 kg en worden 66-79 cm hoog, teven 50-60 kg en 61-74 cm hoog. Sommige reuen kunnen nog zwaarder worden. Ze behoren tot de zwaarste hondenrassen."
    },
    {
      question: "Wat kost een Napolitaanse Mastiff pup in België?",
      answer: "Een Napolitaanse Mastiff pup met stamboom kost tussen €1.500 en €2.500 in België. Dit ras is relatief zeldzaam en kosten kunnen hoger liggen bij gerenommeerde fokkers."
    }
  ],
  funFacts: [
    "De Napolitaanse Mastiff speelde Fang, de hond van Hagrid, in de Harry Potter films.",
    "Het ras werd gebruikt door het Romeinse leger om in oorlog te vechten – ze droegen soms zwaarden en vuurpotten op hun rug.",
    "Hun huid is zo los dat ze hun hoofd kunnen draaien binnen hun vel – een beet in de huid doet geen pijn.",
    "Napolitaanse Mastiffs snurken extreem hard door hun korte snuit en losse huid.",
    "Ze eten en drinken zeer rommelig – water en voedsel belanden overal door hun losse lippen.",
    "Het ras stierf bijna uit na WWII, maar werd gered door de Italiaanse kunstenaar Piero Scanziani in de jaren 1940."
  ],
  history: {
    origin: "De Napolitaanse Mastiff stamt af van de oude Molosser honden die door Alexander de Grote van India naar Griekenland werden gebracht rond 300 v.Chr. De Romeinen adopteerden deze honden en gebruikten ze als oorlogshonden en arenagevechters. Na de val van het Romeinse Rijk bleven deze honden bestaan in Zuid-Italië, vooral in de regio Napels, waar ze werden gebruikt als wachthonden voor landgoederen en bezittingen.",
    development: "Eeuwenlang werden Napolitaanse Mastiffs gefokt door lokale boeren zonder formele stamboeken, wat leidde tot geïsoleerde, pure lijnen. Het ras was bijna onbekend buiten Zuid-Italië tot 1946, toen de Italiaanse journalist en kunstenaar Piero Scanziani ze ontdekte op een tentoonstelling in Napels. Hij realiseerde zich dat dit een uniek overblijfsel was van de oude Romeinse Molossers.\n\nScanziani schreef de eerste rasstandaard in 1948 en werkte aan het behoud en de promotie van het ras. De Napolitaanse Mastiff werd officieel erkend door de FCI in 1949. Het ras verspreidde zich langzaam naar andere landen, waarbij fokkers de nadruk legden op het behoud van het imposante, afschrikwekkende uiterlijk en het loyale, waakzame karakter. Tegenwoordig zijn ze geliefd als indrukwekkende waakhonden en trouwe gezinsleden."
  },
  similarBreeds: [
    "Mastiff (Engels)",
    "Cane Corso",
    "Bordeaux Dog",
    "Fila Brasileiro"
  ],
  commonMistakes: [
    "Rimpels niet reinigen: De diepe huidplooien moeten dagelijks gereinigd worden om infecties te voorkomen. Gebruik speciale doekjes.",
    "Onvoldoende socialisatie: Een ongesocialiseerde Napolitaanse Mastiff kan te beschermend of agressief worden. Begin vroeg en consistent.",
    "Harde trainingsmethoden: Dit ras reageert slecht op harde correcties en kan koppig of defensief worden. Gebruik positieve bekrachtiging.",
    "Jonge honden te veel belasten: Overmatige beweging tijdens de groei veroorzaakt blijvende gewrichtsschade.",
    "Oververhitting: Vermijd wandelen in de hitte – hun korte snuit en overvloed aan huid maken ze gevoelig voor hittestress.",
    "Kwijl negeren: Zonder regelmatige reiniging kunnen kwijlresten huidirritaties en infecties veroorzaken."
  ],
  monthlyCosts: {
    food: "€100-€150",
    vet: "€40-€80",
    grooming: "€20-€40",
    insurance: "€30-€60",
    total: "€190-€330",
    note: "Napolitaanse Mastiffs hebben hoge gezondheidskosten door heupdysplasie, oogproblemen (ectropion, entropion) en huidinfecties. Oogoperaties kosten €800-€1.500 per oog. Budget voor hogere dierenartsenkosten en regelmatige screenings. Levenslange kosten: €20.000-€35.000."
  }
};

// ===== 144. Tibetaanse Mastiff =====
export const tibetanMastiff: BreedDetails = {
  breedName: "Tibetan Mastiff",
  breedNameNL: "Tibetaanse Mastiff",
  faqs: [
    {
      question: "Waarom zijn Tibetaanse Mastiffs zo duur?",
      answer: "Tibetaanse Mastiffs behoren tot de duurste hondenrassen ter wereld, met prijzen tot €1,5 miljoen in China. Ze zijn zeldzaam, moeilijk te fokken (teven krijgen maar één keer per jaar loops), en worden gezien als statussymbolen. In België kosten pups €2.000-€5.000."
    },
    {
      question: "Zijn Tibetaanse Mastiffs geschikt voor beginners?",
      answer: "Absoluut niet. Tibetaanse Mastiffs zijn extreem onafhankelijk, koppig en territoriaal. Ze vereisen een zeer ervaren eigenaar met kennis van dominante rassen en consequente training. Een slecht opgevoede Tibetaanse Mastiff kan onhandelbaar worden."
    },
    {
      question: "Hoeveel beweging heeft een Tibetaanse Mastiff nodig?",
      answer: "Tibetaanse Mastiffs hebben matige beweging nodig: 1-1,5 uur per dag. Ze zijn geen energieke atleten, maar hebben wel mentale stimulatie en ruimte om te patrouilleren nodig. Ze zijn 's nachts actiever (nachtelijke waakinstinct)."
    },
    {
      question: "Blaffen Tibetaanse Mastiffs veel?",
      answer: "Ja, Tibetaanse Mastiffs blaffen en zijn vooral 's nachts vocaal – dit is hun natuurlijke waakinstinct. Hun diep, luid geblaf kan kilometers ver dragen. Dit maakt ze ongeschikt voor dichtbevolkte gebieden."
    },
    {
      question: "Kunnen Tibetaanse Mastiffs in warme klimaten leven?",
      answer: "Nee, Tibetaanse Mastiffs hebben een extreem dikke dubbele vacht die hen beschermt tegen extreme koude. Ze lijden in warme klimaten en hebben airconditioning of koele omgevingen nodig in de zomer. Ze gedijen het best in koude streken."
    },
    {
      question: "Zijn Tibetaanse Mastiffs goed met kinderen?",
      answer: "Tibetaanse Mastiffs kunnen goed zijn met kinderen uit hun eigen gezin als ze goed gesocialiseerd zijn, maar ze zijn beschermend en kunnen te heftig reageren op ruwe kinderspelen. Toezicht is altijd noodzakelijk."
    },
    {
      question: "Hoe oud wordt een Tibetaanse Mastiff?",
      answer: "Een Tibetaanse Mastiff wordt gemiddeld 10 tot 12 jaar oud, wat langer is dan veel andere grote rassen. Goede verzorging en een koel klimaat dragen bij aan een langer leven."
    },
    {
      question: "Wat maakt Tibetaanse Mastiffs zo moeilijk te trainen?",
      answer: "Tibetaanse Mastiffs werden gefokt om onafhankelijk te beslissen en vee te beschermen zonder menselijke supervisie. Ze zijn intelligent maar koppig, en zien niet altijd in waarom ze moeten gehoorzamen. Geduld en respect zijn essentieel."
    }
  ],
  funFacts: [
    "In 2014 werd een Tibetaanse Mastiff verkocht voor €1,5 miljoen in China – de duurste hond ooit verkocht.",
    "Tibetaanse Mastiffs hebben één van de diepste en luidste blafgeluiden van alle hondenrassen – het klinkt als een leeuw.",
    "Ze werden door Tibetaanse nomaden gebruikt om tenten en vee te beschermen tegen wolven, sneeuwluipaarden en beren.",
    "Het ras heeft een extreem laag metabolisme en eet opmerkelijk weinig voor hun formaat (ongeveer 2-3 koppen voer per dag).",
    "Tibetaanse Mastiffs ruien maar één keer per jaar (in het voorjaar), waarbij ze hun volledige ondervacht verliezen in enorme plukken.",
    "Marco Polo beschreef Tibetaanse Mastiffs in 1271 als 'zo groot als een ezel met een stem als een leeuw'."
  ],
  history: {
    origin: "De Tibetaanse Mastiff is één van de oudste en meest primitieve hondenrassen ter wereld, met een geschiedenis die teruggaat tot minstens 1100 v.Chr. Ze evolueerden in de geïsoleerde hoogvlaktes van Tibet en de Himalaya, waar ze werden gebruikt door nomadische herders om kampementen en vee te beschermen tegen roofdieren zoals wolven, sneeuwluipaarden en beren. Door de geografische isolatie ontwikkelde het ras zich met minimale menselijke interventie.",
    development: "Tibetaanse Mastiffs waren onbekend buiten Tibet tot de 19e eeuw, toen Britse ontdekkingsreizigers exemplaren meenamen naar Europa. Koningin Victoria ontving een Tibetaanse Mastiff als geschenk in 1847. Het ras trok aandacht door zijn imposante uiterlijk en leonachtige manen, maar bleef zeldzaam.\n\nTijdens de Chinese bezetting van Tibet in de jaren 1950 werd het ras bijna uitgeroeid. Fokkers in India, Nepal en het Westen werkten aan het behoud van het ras. In de 21e eeuw explodeerde de populariteit in China, waar Tibetaanse Mastiffs statussymbolen werden voor de rijke elite, met recordprijzen tot miljoenen euro's. Deze zeepbel barstte in 2015, wat leidde tot duizenden verwaarloosde Mastiffs. Tegenwoordig is het ras zeldzaam maar stabiel, met fokkers die streven naar behoud van het originele karakter en uiterlijk."
  },
  similarBreeds: [
    "Kaukasische Ovtcharka",
    "Centraal-Aziatische Ovtcharka",
    "Pyrenese Berghond",
    "Anatolische Herder"
  ],
  commonMistakes: [
    "Onvoldoende socialisatie: Tibetaanse Mastiffs zijn van nature wantrouwend. Zonder vroege, intensieve socialisatie worden ze te beschermend of agressief.",
    "Harde trainingsmethoden: Dit ras reageert slecht op dwang en kan koppig of defensief worden. Respect en geduld zijn essentieel.",
    "In warme klimaten houden: Hun dikke vacht maakt ze ongeschikt voor warme streken. Ze lijden in de hitte.",
    "Te veel vrijheid: Een ongetrainde Tibetaanse Mastiff kan ontsnappen en territoriaal gedrag vertonen buiten het eigen terrein.",
    "Onderschatten van hun kracht: Dit zijn enorm krachtige honden die gevaarlijk kunnen zijn zonder goede training.",
    "Vacht niet onderhouden tijdens rui: De jaarlijkse rui produceert enorme hoeveelheden haar dat dagelijks geborsteld moet worden."
  ],
  monthlyCosts: {
    food: "€80-€120",
    vet: "€30-€60",
    grooming: "€40-€80",
    insurance: "€30-€60",
    total: "€180-€320",
    note: "Tibetaanse Mastiffs zijn duur in aanschaf (€2.000-€5.000 in België, meer in China). Gezondheidsproblemen omvatten heupdysplasie, elleboogdysplasie en hypothyreoïdie. Professionele trimming tijdens rui kost €80-€150. Levenslange kosten: €25.000-€40.000."
  }
};

// ===== 145. Pyrenese Berghond =====
export const greatPyrenees: BreedDetails = {
  breedName: "Great Pyrenees",
  breedNameNL: "Pyrenese Berghond",
  faqs: [
    {
      question: "Waarom heeft een Pyrenese Berghond dubbele achterklauwen?",
      answer: "Pyrenese Berghonden hebben dubbele achterklauwen (polydactylie) aan elk achterpoot – dit is een rasspecifiek kenmerk. Deze extra klauwen hielpen historisch met grip in bergachtig terrein. Het is een gewenste eigenschap volgens de rasstandaard."
    },
    {
      question: "Verhaart een Pyrenese Berghond veel?",
      answer: "Ja, Pyrenese Berghonden verharen extreem veel door hun dikke, dubbele witte vacht. Ze ruien het hele jaar door, met twee intensieve ruiperiodes in voorjaar en najaar. Dagelijks borstelen is noodzakelijk om losse haren te beheren."
    },
    {
      question: "Blaffen Pyrenese Berghonden veel?",
      answer: "Ja, Pyrenese Berghonden blaffen veel – het is hun primaire verdedigingsmethode. Ze werden gefokt om vee te beschermen door roofdieren af te schrikken met hun luid, diep geblaf. Ze zijn vooral 's nachts vocaal. Dit maakt ze ongeschikt voor dichtbevolkte gebieden."
    },
    {
      question: "Zijn Pyrenese Berghonden geschikt voor appartementen?",
      answer: "Nee, absoluut niet. Pyrenese Berghonden zijn grote, onafhankelijke honden die ruimte en een omheind terrein nodig hebben om te patrouilleren. Hun blafgedrag en formaat maken ze ongeschikt voor appartementen of stedelijke omgevingen."
    },
    {
      question: "Zijn Pyrenese Berghonden goed met kinderen?",
      answer: "Ja, Pyrenese Berghonden zijn geduldig, zachtaardig en beschermend tegenover kinderen uit hun eigen gezin. Ze zijn uitstekende gezinshonden, maar hun grote formaat vereist toezicht bij jonge kinderen."
    },
    {
      question: "Hoeveel beweging heeft een Pyrenese Berghond nodig?",
      answer: "Pyrenese Berghonden hebben matige beweging nodig: 1-1,5 uur per dag verdeeld over meerdere wandelingen. Ze zijn geen marathonlopers maar houden van rustig patrouilleren. Overmatige inspanning kan schadelijk zijn voor gewrichten."
    },
    {
      question: "Hoe oud wordt een Pyrenese Berghond?",
      answer: "Een Pyrenese Berghond wordt gemiddeld 10 tot 12 jaar oud, wat langer is dan veel andere grote rassen."
    },
    {
      question: "Zijn Pyrenese Berghonden makkelijk te trainen?",
      answer: "Nee, Pyrenese Berghonden zijn koppig en onafhankelijk. Ze werden gefokt om zelf beslissingen te nemen zonder menselijke supervisie. Training vereist geduld, consistentie en positieve bekrachtiging. Ze zijn intelligent maar niet altijd gehoorzaam."
    }
  ],
  funFacts: [
    "Pyrenese Berghonden hebben zes tenen aan elk achterpoot (dubbele dauwklauwen) – een uniek rasspecifiek kenmerk.",
    "Hun dikke witte vacht reflecteert licht en maakt ze 's nachts zichtbaar voor herders, terwijl ze overdag camoufleren tussen schapen.",
    "Ze werden gebruikt door Marie Antoinette als waakhonden in Versailles – het ras werd een favoriet aan het Franse hof.",
    "Pyrenese Berghonden kunnen individueel 11-54 kg wegen, maar sommige reuen kunnen tot 70 kg bereiken.",
    "Ze hebben een natuurlijke afkeer van water en zwemmen meestal niet graag, in tegenstelling tot veel andere honden.",
    "Hun geblaf kan gehoord worden op meer dan 1,5 km afstand – essentieel voor het waarschuwen van herders in de bergen."
  ],
  history: {
    origin: "De Pyrenese Berghond ontstond in de Pyreneeën, het berggebied tussen Frankrijk en Spanje, waar het ras al sinds 3000 v.Chr. zou bestaan volgens archeologische vondsten. Ze werden gebruikt door Baskische herders om schapen en vee te beschermen tegen wolven, beren en dieven in de ruige bergterreinen. Hun witte vacht maakte ze onderscheidbaar van roofdieren in het donker.",
    development: "In de Middeleeuwen werden Pyrenese Berghonden ontdekt door Franse edellieden en werden ze populair als waakhonden van kastelen en landgoederen. Koning Lodewijk XIV verklaarde de Pyrenese Berghond tot de 'Koninklijke Hond van Frankrijk' in 1675, wat de status van het ras verhoogde. Ze werden gebruikt door zowel herders in de bergen als aristocraten in de valleien.\n\nHet ras kwam naar Noord-Amerika in de jaren 1930 en werd officieel erkend door de AKC in 1933. Tijdens WWII smokkelden Pyrenese Berghonden boodschappen en contrabande over de Frans-Spaanse grens. Tegenwoordig zijn ze geliefd als gezinshonden en veewachters, met behoud van hun onafhankelijke, beschermende instinct. Hun zachte karakter en majestueuze uiterlijk maken ze populair wereldwijd."
  },
  similarBreeds: [
    "Kuvasz",
    "Maremma Sheepdog",
    "Anatolische Herder",
    "Akbash"
  ],
  commonMistakes: [
    "Onvoldoende omheining: Pyrenese Berghonden zullen hun 'territorium' uitbreiden als ze niet beperkt worden. Een omheining van minimaal 1,8 meter is nodig.",
    "Blaffen proberen te stoppen: Blaffen is diep geworteld in hun DNA. Accepteer dit of kies een ander ras.",
    "Te weinig socialisatie: Zonder vroege socialisatie kunnen ze te wantrouwend of beschermend worden.",
    "Harde trainingsmethoden: Dit ras reageert slecht op dwang. Geduld en positieve bekrachtiging zijn essentieel.",
    "Vacht verwaarlozen: Zonder regelmatig borstelen ontstaan ernstige klitten en huidproblemen.",
    "In warme klimaten houden zonder klimaatbeheersing: Hun dikke vacht maakt ze gevoelig voor oververhitting."
  ],
  monthlyCosts: {
    food: "€80-€120",
    vet: "€30-€60",
    grooming: "€40-€80",
    insurance: "€25-€50",
    total: "€175-€310",
    note: "Pyrenese Berghonden hebben hoge verzorgingskosten door hun dikke vacht. Professionele trimming kost €60-€120 per sessie (3-4x per jaar). Gezondheidsproblemen omvatten heupdysplasie, patellaluxatie en osteosarcoom (botkanker). Levenslange kosten: €22.000-€35.000."
  }
};

// ===== 146. Leonberger =====
export const leonberger: BreedDetails = {
  breedName: "Leonberger",
  breedNameNL: "Leonberger",
  faqs: [
    {
      question: "Hoe groot wordt een Leonberger?",
      answer: "Leonbergers zijn zeer grote honden. Reuen worden 72-80 cm hoog en wegen 54-77 kg, teven 65-75 cm en 45-59 kg. Hun imposante verschijning en leonachtige manen maken ze indrukwekkend."
    },
    {
      question: "Zijn Leonbergers geschikt voor beginners?",
      answer: "Leonbergers kunnen geschikt zijn voor gemotiveerde beginners, maar ze vereisen toewijding. Ze zijn vriendelijk en trainbaar, maar hun grote formaat vereist consequente training en vroege socialisatie. Een ongetrainde Leonberger is moeilijk te hanteren."
    },
    {
      question: "Verhaart een Leonberger veel?",
      answer: "Ja, Leonbergers verharen intensief door hun lange, dikke dubbele vacht. Ze ruien twee keer per jaar zwaar, waarbij ze enorme hoeveelheden haar verliezen. Dagelijks borstelen is noodzakelijk, vooral tijdens ruiperiodes."
    },
    {
      question: "Zijn Leonbergers goede zwemmers?",
      answer: "Ja, Leonbergers zijn uitstekende zwemmers! Ze hebben gedeeltelijke zwemvliezen tussen hun tenen en werden historisch gebruikt als waterreddingshonden. Ze houden van water en zwemmen instinctief graag."
    },
    {
      question: "Hoeveel beweging heeft een Leonberger nodig?",
      answer: "Leonbergers hebben matige tot hoge beweging nodig: 1,5-2 uur per dag. Ze houden van wandelen, zwemmen en rustig rennen. Vermijd overmatige inspanning bij jonge honden (tot 18-24 maanden) om gewrichtsschade te voorkomen."
    },
    {
      question: "Zijn Leonbergers goed met kinderen?",
      answer: "Ja, Leonbergers zijn uitstekende gezinshonden en zeer geduldig met kinderen. Ze zijn zachtaardig, vriendelijk en beschermend. Hun grote formaat vereist wel toezicht bij jonge kinderen om ongelukjes te voorkomen."
    },
    {
      question: "Hoe oud wordt een Leonberger?",
      answer: "Leonbergers hebben een relatief korte levensverwachting van 8 tot 10 jaar, zoals bij de meeste reuzenrassen. Goede verzorging kan helpen deze te verlengen."
    },
    {
      question: "Wat kost een Leonberger pup in België?",
      answer: "Een Leonberger pup met stamboom kost tussen €1.200 en €2.000 in België. Kies altijd een erkende fokker die ouderdieren screent op erfelijke aandoeningen zoals heupdysplasie en hartproblemen."
    }
  ],
  funFacts: [
    "De Leonberger werd specifiek gefokt om op een leeuw te lijken – de leeuw is het symbool van de stad Leonberg in Duitsland.",
    "Leonbergers hebben gedeeltelijke zwemvliezen tussen hun tenen, wat ze uitstekende waterreddingshonden maakt.",
    "Het ras stierf bijna uit na beide Wereldoorlogen – slechts 5 Leonbergers overleefden WWI en ongeveer 8 na WWII.",
    "Keizer Napoleon III, Tsaar Alexander II en de Prins van Wales bezaten allemaal Leonbergers.",
    "Ondanks hun imposante formaat zijn Leonbergers bekend als 'gentle giants' met een uitzonderlijk zacht karakter.",
    "Leonbergers hebben een unieke 'waterproef' in hun fokprogramma in Duitsland – ze moeten kunnen zwemmen en apporteren uit water."
  ],
  history: {
    origin: "De Leonberger werd in het midden van de 19e eeuw gecreëerd in de stad Leonberg, Duitsland, door de politicus en entrepreneur Heinrich Essig. Zijn doel was een hond te fokken die leek op de leeuw in het stadswapen van Leonberg. Tussen 1830 en 1850 kruiste Essig Sint-Bernards, Newfoundlanders en Pyrenese Berghonden om het gewenste uiterlijk en temperament te bereiken.",
    development: "De eerste officiële Leonbergers werden in 1846 geregistreerd en werden snel populair onder Europese royalty en aristocraten. Keizers, koningen en tsaren bezaten Leonbergers als statussymbolen. Het ras werd ook gebruikt als veelzijdige werkhond: ze trokken karren, bewaakten boerderijen en werkten als waterreddingshonden.\n\nBeide Wereldoorlogen decimeerden het ras bijna volledig. Na WWI bleven slechts 5 Leonbergers over, en na WWII ongeveer 8. Toegewijde fokkers, vooral Karl Stadelmann en Otto Josenhans, herbouwden het ras uit deze kleine genenpoel. De moderne Leonberger werd officieel erkend door de FCI in 1955. Tegenwoordig zijn ze geliefd als veelzijdige gezinshonden die uitmunten in gehoorzaamheid, therapiewerk en waterredding. Hun vriendelijke, evenwichtige karakter maakt ze ideale familieleden."
  },
  similarBreeds: [
    "Sint-Bernard",
    "Newfoundlander",
    "Pyrenese Berghond",
    "Berner Sennenhond"
  ],
  commonMistakes: [
    "Jonge Leonbergers te veel laten bewegen: Overmatige inspanning tijdens de groei (tot 18-24 maanden) kan blijvende gewrichtsschade veroorzaken.",
    "Vacht verwaarlozen: Hun lange vacht klittert snel zonder regelmatig borstelen (minimaal 3x per week).",
    "Onvoldoende socialisatie: Hoewel Leonbergers vriendelijk zijn, is vroege socialisatie essentieel om angst of nervositeit te voorkomen.",
    "Overvoeren: Leonbergers zijn gevoelig voor obesitas en maagdraaiing. Voer in meerdere kleine maaltijden en vermijd inspanning na het eten.",
    "Te lang alleen laten: Leonbergers zijn zeer sociaal en kunnen scheidingsangst ontwikkelen zonder gezelschap.",
    "Hitte onderschatten: Hun dikke vacht maakt ze gevoelig voor oververhitting. Vermijd wandelen in warme uren."
  ],
  monthlyCosts: {
    food: "€90-€140",
    vet: "€30-€70",
    grooming: "€40-€80",
    insurance: "€30-€60",
    total: "€190-€350",
    note: "Leonbergers hebben hogere gezondheidskosten door heupdysplasie, elleboogdysplasie, hartproblemen (dilaterende cardiomyopathie) en kanker. Professionele trimming kost €70-€120 per sessie (3-4x per jaar). Levenslange kosten: €20.000-€32.000."
  }
};

// ===== 147. Hovawart =====
export const hovawart: BreedDetails = {
  breedName: "Hovawart",
  breedNameNL: "Hovawart",
  faqs: [
    {
      question: "Wat betekent 'Hovawart'?",
      answer: "Hovawart betekent 'hoedewachter' in Middelhoogduits (Hova = boerderij/hof, wart = wachter). De naam verwijst naar hun historische rol als bewakers van boerderijen en eigendommen."
    },
    {
      question: "Zijn Hovawarts geschikt voor beginners?",
      answer: "Nee, Hovawarts zijn niet ideaal voor beginners. Ze zijn intelligent maar onafhankelijk en eigenzinnig. Ze vereisen een ervaren, zelfverzekerde eigenaar die consequent kan trainen en leiding kan geven."
    },
    {
      question: "Hoeveel beweging heeft een Hovawart nodig?",
      answer: "Hovawarts zijn actieve honden die 1,5-2 uur beweging per dag nodig hebben. Ze houden van wandelen, rennen, zwemmen en mentale uitdagingen zoals zoekwerk of gehoorzaamheidstraining."
    },
    {
      question: "Zijn Hovawarts goede waakhonden?",
      answer: "Ja, Hovawarts zijn uitstekende waakhonden. Ze zijn natuurlijk beschermend, alert en wantrouwend tegenover vreemden. Ze bewaken hun territorium zonder onnodige agressie en reageren bedachtzaam op bedreigingen."
    },
    {
      question: "Verhaart een Hovawart veel?",
      answer: "Ja, Hovawarts verharen matig tot veel, vooral tijdens de twee jaarlijkse ruiperiodes in voorjaar en najaar. Regelmatig borstelen (2-3x per week) helpt losse haren te verwijderen en de vacht gezond te houden."
    },
    {
      question: "Hoe oud wordt een Hovawart?",
      answer: "Een Hovawart wordt gemiddeld 10 tot 14 jaar oud, wat langer is dan veel andere grote rassen. Ze blijven vaak actief tot op latere leeftijd."
    },
    {
      question: "Zijn Hovawarts goed met kinderen?",
      answer: "Ja, goed gesocialiseerde Hovawarts zijn uitstekend met kinderen uit hun eigen gezin. Ze zijn geduldig, speels en beschermend. Hun grote formaat vereist wel toezicht bij jonge kinderen."
    },
    {
      question: "Wat kost een Hovawart pup in België?",
      answer: "Een Hovawart pup met stamboom kost tussen €1.000 en €1.800 in België. Het ras is relatief zeldzaam, dus wachtlijsten bij goede fokkers zijn normaal."
    }
  ],
  funFacts: [
    "Hovawarts werden in de Middeleeuwen zo gewaardeerd dat wie er één stal werd zwaarder bestraft dan bij diefstal van een paard.",
    "Het ras stierf bijna uit in de vroege 20e eeuw en werd in de jaren 1920 heropgebouwd met behulp van honden uit het Zwarte Woud.",
    "Hovawarts zijn 'laatbloeiers' – ze bereiken pas volledige mentale en fysieke volwassenheid op 3-4 jaar.",
    "Ze hebben een uitzonderlijk goed geheugen en vergeten zelden een persoon of plek die ze één keer hebben ontmoet.",
    "Hovawarts zijn uitstekende reddingshonden en worden ingezet bij lawine- en aardbevingsreddingen.",
    "Ze komen in drie kleuren: zwart, blond en zwart-en-bruin (zoals een Rottweiler)."
  ],
  history: {
    origin: "De Hovawart is één van de oudste Duitse hondenrassen, met wortels die teruggaan tot de Middeleeuwen (13e eeuw). Het ras wordt genoemd in historische documenten zoals de 'Schwabenspiegel' (1275), waarin Hovawarts worden beschreven als waardevolle boerderijhonden. Ze werden gebruikt door boeren en landgoedeigenaren om bezittingen te bewaken en vee te beschermen. Legends vertellen over Hovawarts die kinderen redden uit branden en vijanden afweren.",
    development: "In de vroege 20e eeuw was het ras bijna uitgestorven door industrialisatie en veranderende landbouwpraktijken. In de jaren 1920 besloten de zoölogen Kurt en Bertram König het ras te reconstrueren. Ze verzamelden overgebleven boerderijhonden uit het Zwarte Woud en kruisten deze met Newfoundlanders, Duitse Herders, Leonbergers en mogelijk Hongaarse Kuvasz om de Hovawart te herbouwen.\n\nHet gereconstrueerde ras werd officieel erkend door de FCI in 1937. Het fokdoel was een veelzijdige werkhond met uitstekende waakinstincten, intelligentie en een sterk, gezond gestel. Na WWII groeide de populariteit van het ras gestaag. Moderne Hovawarts worden gebruikt als zoek- en reddingshonden, therapiehonden en gezinshonden. Ze behouden hun onafhankelijke, beschermende karakter en vereisen een ervaren hand."
  },
  similarBreeds: [
    "Duitse Herder",
    "Berner Sennenhond",
    "Leonberger",
    "Rottweiler"
  ],
  commonMistakes: [
    "Te vroeg intense training starten: Hovawarts rijpen langzaam en zijn pas op 3-4 jaar volledig volwassen. Wees geduldig en forceer niets.",
    "Onvoldoende socialisatie: Zonder vroege socialisatie kunnen Hovawarts te wantrouwend of defensief worden.",
    "Harde trainingsmethoden: Hovawarts zijn gevoelig en koppig. Harde correcties leiden tot weerstand. Gebruik positieve bekrachtiging.",
    "Te weinig mentale stimulatie: Deze intelligente honden vervelen snel zonder puzzels, zoekwerk of training.",
    "Jonge Hovawarts te veel laten bewegen: Overmatige inspanning tijdens de groei kan gewrichtsschade veroorzaken.",
    "Te lang alleen laten: Hovawarts zijn sociaal en kunnen destructief worden zonder gezelschap."
  ],
  monthlyCosts: {
    food: "€70-€110",
    vet: "€25-€50",
    grooming: "€20-€40",
    insurance: "€25-€45",
    total: "€140-€245",
    note: "Hovawarts zijn relatief gezond vergeleken met andere grote rassen, maar kunnen heupdysplasie en hypothyreoïdie ontwikkelen. Regelmatige controles en gezonde voeding zijn essentieel. Levenslange kosten: €18.000-€28.000."
  }
};

// ===== 148. Tosa Inu =====
export const tosaInu: BreedDetails = {
  breedName: "Tosa Inu",
  breedNameNL: "Tosa Inu",
  faqs: [
    {
      question: "Is een Tosa Inu verboden in België?",
      answer: "Ja, de Tosa Inu staat op de lijst van verboden rassen in het Brussels Hoofdstedelijk Gewest en sommige andere gemeenten in België. In Vlaanderen en Wallonië is het ras niet algemeen verboden, maar lokale regelgeving kan variëren. Controleer altijd lokale wetgeving voordat je een Tosa Inu aanschaft."
    },
    {
      question: "Waarom is de Tosa Inu verboden in veel landen?",
      answer: "De Tosa Inu werd gefokt als vechthond en heeft een krachtige beet, hoog pijndrempel en natuurlijke vechtinstinct. Door hun geschiedenis en potentiële gevaar staan ze op de lijst van gevaarlijke rassen in Nederland, VK, Denemarken, Noorwegen en vele andere landen."
    },
    {
      question: "Zijn Tosa Inu's agressief?",
      answer: "Niet per definitie. Goed gesocialiseerde en getrainde Tosa Inu's kunnen kalm en waardig zijn, maar ze behouden een sterk territorium- en verdedigingsinstinct. Ze vereisen zeer ervaren eigenaren en zijn absoluut niet geschikt voor beginners."
    },
    {
      question: "Hoeveel weegt een Tosa Inu?",
      answer: "Tosa Inu's variëren sterk in formaat. Japanse lijnen wegen 36-61 kg en zijn compacter. Westerse lijnen (gefokt voor groter formaat) kunnen 60-90 kg of meer wegen. Reuen zijn aanzienlijk groter dan teven."
    },
    {
      question: "Zijn Tosa Inu's goed met andere honden?",
      answer: "Nee, Tosa Inu's zijn over het algemeen niet goed met andere honden, vooral niet met honden van hetzelfde geslacht. Ze werden gefokt voor hondengevechten en behouden een sterke drang tot dominantie. Vroege socialisatie is cruciaal maar geen garantie."
    },
    {
      question: "Hoeveel beweging heeft een Tosa Inu nodig?",
      answer: "Tosa Inu's hebben matige beweging nodig: 1-1,5 uur per dag. Ze zijn geen hyperactieve honden, maar hebben wel mentale stimulatie en structuur nodig. Houdt ze altijd aangelijnd in openbare ruimtes."
    },
    {
      question: "Hoe oud wordt een Tosa Inu?",
      answer: "Een Tosa Inu wordt gemiddeld 10 tot 12 jaar oud, wat normaal is voor grote rassen."
    },
    {
      question: "Zijn Tosa Inu's geschikt voor beginners?",
      answer: "Absoluut niet. Tosa Inu's vereisen zeer ervaren eigenaren met kennis van dominante, krachtige rassen. Zonder correcte training en socialisatie kunnen ze gevaarlijk zijn."
    }
  ],
  funFacts: [
    "In Japan worden Tosa Inu's die uitblinken in traditionele hondengevechten (nu zeldzaam maar nog steeds legaal in bepaalde regio's) geëerd met ceremoniële kwasten en schorten zoals Sumo-worstelaars.",
    "De naam 'Tosa' komt van de oude provincie Tosa (nu Kochi Prefecture) op het eiland Shikoku, waar het ras ontstond.",
    "Tosa Inu's werden gefokt om stil te vechten – blaffen of janken tijdens gevechten werd beschouwd als lafheid.",
    "Het ras is zeldzaam buiten Japan – er zijn slechts enkele duizenden exemplaren wereldwijd.",
    "Tosa Inu's hebben een extreem hoge pijndrempel en tonen zelden tekenen van pijn of ongemak.",
    "In Japan worden ze beschouwd als nationale schatten en symboliseren ze moed en loyaliteit."
  ],
  history: {
    origin: "De Tosa Inu ontstond in de late 19e eeuw (ongeveer 1860-1870) in de Tosa-regio (nu Kochi) op het Japanse eiland Shikoku. Hondengevechten waren een populaire sport in Japan, maar de native Japanse honden (zoals Shikoku en Shiba) waren te klein. Fokkers wilden een groter, krachtiger gevechtshond creëren die kon wedijveren met westerse rassen.",
    development: "Tosa-fokkers kruisten native Shikoku-honden met geïmporteerde westerse rassen: Bulldogs (voor kracht en vastberadenheid), Mastiffs (voor grootte), Bull Terriers (voor vechtvermogen), Duitse Doggen (voor formaat) en mogelijk Saint Bernards en Pointers. Het resultaat was de Tosa Inu – een massieve, moedige vechthond met hoge pijndrempel.\n\nTijdens WWII stierf het ras bijna uit door voedseltekorten, maar toegewijde fokkers herbouwden de lijnen. Na de oorlog splitste het ras in twee lijnen: compacte Japanse Tosa's (36-61 kg) en grotere westerse Tosa's (tot 90 kg). Hondengevechten werden verboden in de meeste landen, maar blijven legaal in bepaalde Japanse regio's onder strikte regels. De Tosa wordt nu gefokt als wachthond en gezelschapshond, maar hun vechtverleden en kracht maken ze controversieel. Ze zijn verboden in vele landen en vereisen extreem verantwoord eigenaarschap."
  },
  similarBreeds: [
    "Cane Corso",
    "Presa Canario",
    "Dogo Argentino",
    "Fila Brasileiro"
  ],
  commonMistakes: [
    "Onderschatten van hun kracht: Tosa Inu's zijn extreem krachtig. Zonder goede training kunnen ze onhandelbaar worden.",
    "Onvoldoende socialisatie: Vroege, intensieve socialisatie is cruciaal, maar geen garantie dat ze goed met andere honden omgaan.",
    "Harde trainingsmethoden: Tosa Inu's reageren slecht op agressieve training en kunnen defensief of vijandig worden.",
    "Loslopen: Laat een Tosa Inu nooit los in openbare ruimtes – hun vechtinstinct kan onverwacht activeren.",
    "Geen training in impulse control: Tosa Inu's moeten leren hun instincten te beheersen. Dit vereist professionele training.",
    "Wetgeving negeren: Controleer lokale wetgeving – bezit van een Tosa kan illegaal zijn of een muilkorf en verzekering vereisen."
  ],
  monthlyCosts: {
    food: "€80-€130",
    vet: "€30-€70",
    grooming: "€10-€20",
    insurance: "€50-€100",
    total: "€170-€320",
    note: "Tosa Inu's hebben hogere verzekeringspremies als 'gevaarlijk ras'. Sommige verzekeraars dekken ze niet. Gezondheidsproblemen omvatten heupdysplasie, opgeblazenheid en hartproblemen. Wettelijke eisen (muilkorf, speciale vergunning) kunnen extra kosten met zich meebrengen. Levenslange kosten: €22.000-€38.000."
  }
};

// ===== 149. Fila Brasileiro =====
export const filaBrasileiro: BreedDetails = {
  breedName: "Fila Brasileiro",
  breedNameNL: "Fila Brasileiro",
  faqs: [
    {
      question: "Is een Fila Brasileiro verboden in België?",
      answer: "Ja, de Fila Brasileiro staat op de lijst van verboden rassen in België en vele andere Europese landen, waaronder Nederland en het VK. Bezit, import en fokken zijn illegaal. Controleer altijd lokale wetgeving."
    },
    {
      question: "Waarom is de Fila Brasileiro verboden?",
      answer: "De Fila Brasileiro werd gefokt om slaven te vangen en vee te beschermen met extreme agressie tegenover vreemden. Hun sterke beschermingsinstinct, wantrouwen en krachtige beet maken ze potentieel gevaarlijk. Ze zijn verboden in veel landen vanwege het verhoogde risico op aanvallen."
    },
    {
      question: "Wat betekent 'ojeriza' bij Fila Brasileiro's?",
      answer: "'Ojeriza' is een Portugees woord dat het extreme, inherente wantrouwen en agressie van Fila's tegenover vreemden beschrijft. Het is een gewenste eigenschap volgens de originele rasstandaard – Fila's die vriendelijk zijn naar vreemden worden gediskwalificeerd op shows."
    },
    {
      question: "Zijn Fila Brasileiro's loyaal aan hun eigenaren?",
      answer: "Ja, Fila Brasileiro's zijn extreem loyaal en aanhankelijk tegenover hun familie. Ze vormen intense banden en zijn beschermend tot het extreme. Deze loyaliteit gaat gepaard met diep wantrouwen tegenover iedereen buiten het gezin."
    },
    {
      question: "Hoeveel weegt een Fila Brasileiro?",
      answer: "Reuen wegen minimaal 50 kg en worden 65-75 cm hoog, teven minimaal 40 kg en 60-70 cm. Veel exemplaren zijn zwaarder, met reuen tot 90 kg."
    },
    {
      question: "Kunnen Fila Brasileiro's met andere honden omgaan?",
      answer: "Fila Brasileiro's zijn vaak agressief tegenover andere honden, vooral honden van hetzelfde geslacht. Vroege socialisatie kan helpen maar is geen garantie. Voorzichtigheid is altijd geboden."
    },
    {
      question: "Hoeveel beweging heeft een Fila Brasileiro nodig?",
      answer: "Fila Brasileiro's hebben matige beweging nodig: 1-1,5 uur per dag. Ze zijn geen hyperactieve honden, maar hebben wel mentale stimulatie en een veilig, omheind terrein nodig om te patrouilleren."
    },
    {
      question: "Hoe oud wordt een Fila Brasileiro?",
      answer: "Een Fila Brasileiro wordt gemiddeld 9 tot 11 jaar oud."
    }
  ],
  funFacts: [
    "Een Braziliaans gezegde luidt: 'Trouw als een Fila' – wat hun extreme loyaliteit illustreert.",
    "Fila Brasileiro's werden gebruikt om ontsnapte slaven te vangen tijdens de slavernij in Brazilië – een donkere geschiedenis die bijdraagt aan hun verbod.",
    "Op Braziliaanse rashows mogen juryleden Fila's niet aanraken – het ras moet wantrouwend blijven, anders worden ze gediskwalificeerd.",
    "Fila's hebben een unieke manier van lopen die 'camel pace' wordt genoemd – ze bewegen beide benen aan één kant tegelijk.",
    "Ze hebben losse huid rond de nek, vergelijkbaar met een Bloodhound, wat hen beschermde tegen aanvallen van jaguars.",
    "Het ras is in Brazilië zelf controversieel vanwege aanvallen, maar wordt nog steeds gefokt als traditionele wachthond."
  ],
  history: {
    origin: "De Fila Brasileiro ontstond in Brazilië tijdens de koloniale periode (15e-19e eeuw). Het ras werd ontwikkeld door Portugese kolonisten die grote, moedige honden nodig hadden om vee te bewaken, jaguars af te weren en – tragisch genoeg – ontsnapte slaven op te sporen en vast te houden. De Fila werd gefokt om vreemden met extreme agressie te benaderen zonder dat deze doodgebeten werden.",
    development: "Fokkers kruisten verschillende rassen: Engelse Mastiffs (voor kracht en grootte), Bulldogs (voor vastberadenheid), en Bloodhounds (voor reukvermogen en losse huid). Het resultaat was een massieve, atletische hond met een uitzonderlijk reukvermogen en een uniek 'pack walk' (camel pace) waarbij beide benen aan één kant tegelijk bewegen.\n\nNa de afschaffing van de slavernij bleven Fila's populair als veewachters en eigendomsbeschermers op afgelegen fazenda's (boerderijen). Het ras werd officieel erkend door de FCI in 1968. De rasstandaard vereist 'ojeriza' – extreme wantrouwen tegenover vreemden. Honden die vriendelijk zijn naar juryleden worden gediskwalificeerd.\n\nDe extreme beschermingsdrang van de Fila leidde tot aanvallen en beten, wat resulteerde in verboden in vele landen vanaf de jaren 1990. Het ras is nu zeldzaam buiten Brazilië en hoogst controversieel. Fokkers benadrukken loyaliteit en waakinstinct, maar critici wijzen op inherente gevaarlijkheid."
  },
  similarBreeds: [
    "Cane Corso",
    "Presa Canario",
    "Napolitaanse Mastiff",
    "Tosa Inu"
  ],
  commonMistakes: [
    "Onderschatten van 'ojeriza': Dit is geen trainbare eigenschap – het is diep geworteld in het ras. Fila's zullen altijd wantrouwend zijn tegenover vreemden.",
    "Socialisatie forceren: Probeer niet om Fila's 'vriendelijk' te maken – dit gaat tegen hun natuur in en kan stress veroorzaken.",
    "Onvoldoende omheining: Fila's moeten altijd veilig opgesloten zijn. Ze zullen agressief reageren op indringers.",
    "Loslopen in openbare ruimtes: Onverantwoord en vaak illegaal. Fila's moeten altijd aangelijnd en onder controle zijn.",
    "Geen professionele training: Eigenaren moeten professionele hulp zoeken van trainers met ervaring in beschermende rassen.",
    "Wetgeving negeren: In de meeste Europese landen is het bezit illegaal. Dit kan leiden tot confiscatie en strafrechtelijke vervolging."
  ],
  monthlyCosts: {
    food: "€80-€130",
    vet: "€30-€70",
    grooming: "€10-€20",
    insurance: "€60-€120",
    total: "€180-€340",
    note: "Fila Brasileiro's hebben zeer hoge verzekeringspremies als 'gevaarlijk ras' (indien überhaupt verzekerbaar). Gezondheidsproblemen omvatten heupdysplasie en opgeblazenheid. LET OP: Het bezit is illegaal in België en de meeste Europese landen. Levenslange kosten (waar legaal): €20.000-€38.000."
  }
};

// ===== 150. Argentijnse Dog (Dogo Argentino) =====
export const dogoArgentino: BreedDetails = {
  breedName: "Dogo Argentino",
  breedNameNL: "Argentijnse Dog",
  faqs: [
    {
      question: "Is een Dogo Argentino verboden in België?",
      answer: "De Dogo Argentino staat op de lijst van verboden rassen in het Brussels Hoofdstedelijk Gewest. In Vlaanderen en Wallonië is het ras niet algemeen verboden, maar lokale gemeenten kunnen eigen regels hebben. Controleer altijd lokale wetgeving voordat je een Dogo aanschaft."
    },
    {
      question: "Waarom werd de Dogo Argentino gefokt?",
      answer: "De Dogo Argentino werd specifiek gefokt voor de jacht op groot, gevaarlijk wild zoals wilde zwijnen, poema's en jaguars in de Argentijnse pampa's. Ze moesten moedig, krachtig en uithoudend zijn, maar ook teamwerk kunnen vertonen met andere honden."
    },
    {
      question: "Zijn Dogo Argentino's agressief?",
      answer: "Dogo Argentino's zijn niet per definitie agressief, maar ze hebben een sterke prooiaandrift en kunnen agressief zijn tegenover andere honden. Goed gesocialiseerde Dogo's zijn vriendelijk naar mensen, maar vereisen zeer ervaren eigenaren vanwege hun kracht en instincten."
    },
    {
      question: "Hoeveel beweging heeft een Dogo Argentino nodig?",
      answer: "Dogo Argentino's zijn zeer actieve honden die minimaal 2 uur intensieve beweging per dag nodig hebben. Ze houden van rennen, wandelen en spelen. Zonder voldoende beweging kunnen ze destructief worden."
    },
    {
      question: "Zijn Dogo Argentino's goed met kinderen?",
      answer: "Goed gesocialiseerde Dogo's kunnen uitstekend met kinderen zijn – ze zijn geduldig, speels en beschermend. Hun kracht en energie vereisen wel toezicht bij jonge kinderen. Leer kinderen respectvol met de hond om te gaan."
    },
    {
      question: "Waarom zijn Dogo Argentino's vaak wit?",
      answer: "Dogo Argentino's zijn bijna altijd volledig wit (één kleine donkere vlek op de kop is toegestaan volgens de standaard). Dit werd gefokt om ze te onderscheiden van het wild tijdens jachtpartijen – jagers konden zien waar de hond was in dicht kreupelhout."
    },
    {
      question: "Hoe oud wordt een Dogo Argentino?",
      answer: "Een Dogo Argentino wordt gemiddeld 10 tot 12 jaar oud, wat normaal is voor grote rassen."
    },
    {
      question: "Wat kost een Dogo Argentino pup in België?",
      answer: "Een Dogo Argentino pup met stamboom kost tussen €1.200 en €2.500 waar legaal. Het ras is relatief zeldzaam in Europa. Controleer altijd lokale wetgeving voordat je een Dogo aanschaft."
    }
  ],
  funFacts: [
    "De Dogo Argentino is het eerste en enige Argentijnse hondenras dat internationaal erkend is door de FCI.",
    "Ze werden gebruikt om poema's en jaguars te jagen – roofdieren die tot 100 kg kunnen wegen.",
    "Ongeveer 10% van Dogo Argentino's is doof in één of beide oren door het gen voor de witte vacht.",
    "De oprichter van het ras, Dr. Antonio Nores Martínez, werd later vermoord tijdens een jachtpartij – zijn Dogo bleef bij zijn lichaam tot hulp arriveerde.",
    "Dogo Argentino's hebben een bijtdruk van ongeveer 500 PSI – één van de krachtigste beten van alle hondenrassen.",
    "In Argentinië worden ze nog steeds gebruikt voor jacht, zoek- en reddingswerk, en als politiehonden."
  ],
  history: {
    origin: "De Dogo Argentino werd in de jaren 1920 gecreëerd door Dr. Antonio Nores Martínez en zijn broer Agustín in Córdoba, Argentinië. Antonio was een arts en hondenliefhebber die een ideale jachthond wilde creëren voor de jacht op groot wild in de ruige Argentijnse pampa's en bergen. Hij had een hond nodig die moedig genoeg was om poema's en jaguars te confronteren, maar ook intelligent en gehoorzaam.",
    development: "Nores Martínez begon met de oude Cordoba Fighting Dog (nu uitgestorven), een vechthond van Spaanse afkomst. Hij kruiste deze met verschillende rassen: Boxer (voor intelligentie en vriendelijkheid), Duitse Dog (voor grootte), Bull Terrier (voor vastberadenheid), Ierse Wolfshond (voor snelheid), Engelse Pointer (voor reukvermogen), Pyrenese Berghond (voor witte kleur en kracht), en Bordeaux Dog (voor kracht).\n\nHet duurde meer dan 30 jaar om het ras te verfijnen. In 1964 werd de Dogo Argentino officieel erkend door de Argentijnse Kennel Club, en in 1973 door de FCI. Tragisch genoeg werd Antonio Nores Martínez in 1956 vermoord tijdens een jachtpartij – volgens verhalen bleef zijn Dogo bij zijn lichaam tot hulp arriveerde.\n\nDe Dogo verspreidde zich langzaam over de wereld en werd populair als jachthond, wachthond en gezinshond. Hun kracht, prooiaandrift en gebruik in hondengevechten leidden tot verboden in vele landen. Tegenwoordig zijn verantwoordelijke fokkers toegewijd aan het behoud van het veelzijdige, loyale karakter terwijl ze vechtagressie minimaliseren."
  },
  similarBreeds: [
    "Amerikaanse Pitbull Terrier",
    "Cane Corso",
    "Presa Canario",
    "Bull Terrier"
  ],
  commonMistakes: [
    "Onvoldoende socialisatie: Dogo's moeten vanaf puppyhood intensief gesocialiseerd worden met mensen, honden en situaties om agressie te voorkomen.",
    "Te weinig beweging: Dogo's zijn jachthonden en hebben veel intensieve beweging nodig. Verveling leidt tot destructie.",
    "Loslopen bij andere honden: Dogo's kunnen agressief zijn tegenover andere honden. Houd ze aangelijnd in openbare ruimtes.",
    "Geen training in impulse control: Dogo's hebben een sterke prooiaandrift. Training in zelfscontrole is essentieel.",
    "Doofheid niet testen: 10% van Dogo's is doof. Laat pups testen met BAER (Brainstem Auditory Evoked Response) voordat je koopt.",
    "Wetgeving negeren: Controleer lokale wetgeving – bezit kan illegaal zijn of speciale vergunningen vereisen."
  ],
  monthlyCosts: {
    food: "€70-€110",
    vet: "€30-€60",
    grooming: "€10-€20",
    insurance: "€40-€80",
    total: "€150-€270",
    note: "Dogo Argentino's hebben hogere verzekeringspremies als 'gevaarlijk ras'. Gezondheidsproblemen omvatten doofheid (10%), heupdysplasie en huidallergieën (vaak door de witte vacht). BAER-test voor doofheid kost €80-€150. Levenslange kosten: €18.000-€30.000."
  }
};

// ===== 151. Presa Canario =====
export const presaCanario: BreedDetails = {
  breedName: "Presa Canario",
  breedNameNL: "Presa Canario",
  faqs: [
    {
      question: "Is een Presa Canario verboden in België?",
      answer: "De Presa Canario is niet algemeen verboden in België, maar sommige gemeenten hebben lokale regelgeving. Het ras staat op de lijst van gevaarlijke honden in landen zoals Australië en Nieuw-Zeeland. Controleer altijd lokale wetgeving."
    },
    {
      question: "Waarom hebben Presa Canario's een slechte reputatie?",
      answer: "Presa Canario's kregen een slechte reputatie door een dodelijke aanval in San Francisco in 2001, waarbij een vrouw werd gedood door twee Presa's. Dit leidde tot media-aandacht en verboden. Goed gefokte en opgevoede Presa's zijn echter stabiel, maar vereisen zeer ervaren eigenaren."
    },
    {
      question: "Hoeveel weegt een Presa Canario?",
      answer: "Reuen wegen 50-65 kg en worden 60-66 cm hoog, teven 38-50 kg en 56-62 cm. Ze zijn massief gebouwd met een krachtige kaakstructuur."
    },
    {
      question: "Zijn Presa Canario's agressief?",
      answer: "Presa Canario's zijn niet per definitie agressief, maar ze zijn zeer territoraal en beschermend. Ze zijn wantrouwend tegenover vreemden en kunnen agressief reageren als ze zich bedreigd voelen. Ze vereisen zeer ervaren, assertieve eigenaren."
    },
    {
      question: "Hoeveel beweging heeft een Presa Canario nodig?",
      answer: "Presa Canario's hebben matige beweging nodig: 1-1,5 uur per dag. Ze zijn geen marathonlopers, maar hebben wel mentale stimulatie en structuur nodig. Houdt ze altijd aangelijnd in openbare ruimtes."
    },
    {
      question: "Zijn Presa Canario's goed met kinderen?",
      answer: "Goed gesocialiseerde Presa's kunnen goed zijn met kinderen uit hun eigen gezin, maar hun kracht en beschermingsinstinct vereisen constant toezicht. Ze zijn niet ideaal voor gezinnen met jonge kinderen of voor onervaren eigenaren."
    },
    {
      question: "Hoe oud wordt een Presa Canario?",
      answer: "Een Presa Canario wordt gemiddeld 9 tot 11 jaar oud."
    },
    {
      question: "Wat betekent 'Presa Canario'?",
      answer: "'Presa Canario' betekent 'Canarische Vanger' in het Spaans – 'Presa' betekent vangen/grijpen, verwijzend naar hun oorspronkelijke rol als vee-vanger en wachthond op de Canarische Eilanden."
    }
  ],
  funFacts: [
    "De Presa Canario wordt ook wel 'Dogo Canario' of 'Canarische Mastiff' genoemd.",
    "Het ras stierf bijna uit in de jaren 1960 toen hondengevechten werden verboden op de Canarische Eilanden.",
    "Presa Canario's hebben één van de krachtigste beten van alle hondenrassen, met een bijtdruk geschat op 540 PSI.",
    "In 2001 werd het ras internationaal bekend door een dodelijke aanval in San Francisco, wat leidde tot verboden en strengere regelgeving.",
    "Op de Canarische Eilanden worden ze nog steeds gebruikt als traditionele veewachters en eigendomsbeschermers.",
    "Het ras heeft een uniek gestreept patroon ('brindle') dat variëert van licht tot zeer donker."
  ],
  history: {
    origin: "De Presa Canario ontstond op de Canarische Eilanden (een Spaanse archipel voor de kust van Afrika) in de 15e en 16e eeuw. Spaanse kolonisten brachten grote Molosser-type honden mee, waarschijnlijk afstammelingen van oorlogshonden en Mastiffs. Deze honden werden gekruist met lokale honden om een robuuste, krachtige hond te creëren die vee kon bewaken en controleren in het ruige terrein van de eilanden.",
    development: "Gedurende eeuwen werden Presa Canario's gebruikt voor het vangen en houden van wild vee, het bewaken van boerderijen, en – helaas – voor hondengevechten. Het ras werd verfijnd voor kracht, moed en territorialiteit. In de jaren 1940-1960 werden hondengevechten populair op de eilanden, wat leidde tot selectie op vechtvermogen.\n\nToen hondengevechten werden verboden in de jaren 1960, daalde de populariteit van het ras dramatisch en stierf het bijna uit. In de jaren 1970 begonnen fokkers zoals Dr. Carl Semencic het ras te herstellen met behulp van overgebleven exemplaren. De Presa Canario werd officieel erkend door de FCI in 2011 onder de naam 'Dogo Canario'.\n\nDe dodelijke aanval in San Francisco in 2001 bracht het ras in een negatief daglicht, wat leidde tot verboden in sommige landen. Verantwoordelijke fokkers werken aan het behoud van een stabiel, betrouwbaar temperament. De Presa blijft een krachtige, beschermende hond die zeer ervaren eigenaarschap vereist."
  },
  similarBreeds: [
    "Cane Corso",
    "Fila Brasileiro",
    "Tosa Inu",
    "Dogo Argentino"
  ],
  commonMistakes: [
    "Onvoldoende socialisatie: Presa's moeten vanaf puppyhood intensief gesocialiseerd worden. Zonder dit worden ze te territoraal of agressief.",
    "Harde trainingsmethoden: Presa's reageren slecht op dwang en kunnen defensief worden. Gebruik altijd positieve bekrachtiging.",
    "Onderschatten van hun kracht: Dit zijn extreem krachtige honden. Zonder goede training kunnen ze onhandelbaar worden.",
    "Loslopen: Laat een Presa nooit los in openbare ruimtes. Hun beschermingsinstinct kan onvoorspelbaar activeren.",
    "Geen professionele training: Eigenaren moeten professionele hulp zoeken van trainers met ervaring in beschermende rassen.",
    "Kinderen onbegeleid laten: Nooit jonge kinderen alleen laten met een Presa, zelfs als de hond goed gesocialiseerd is."
  ],
  monthlyCosts: {
    food: "€70-€110",
    vet: "€30-€60",
    grooming: "€10-€20",
    insurance: "€40-€80",
    total: "€150-€270",
    note: "Presa Canario's hebben hogere verzekeringspremies als 'krachtig ras'. Gezondheidsproblemen omvatten heupdysplasie, elleboogdysplasie en oogproblemen. Wettelijke eisen (muilkorf, vergunning in sommige regio's) kunnen extra kosten met zich meebrengen. Levenslange kosten: €16.000-€28.000."
  }
};

// ===== 152. Kangal =====
export const kangal: BreedDetails = {
  breedName: "Kangal Shepherd Dog",
  breedNameNL: "Kangal",
  faqs: [
    {
      question: "Wat is het verschil tussen een Kangal en een Anatolische Herder?",
      answer: "In Turkije zijn de Kangal en Anatolische Herder (Anatolian Shepherd) aparte rassen, maar buiten Turkije worden ze vaak samengevoegd. Kangals zijn een specifiek type uit de Sivas-regio met een karakteristieke zwarte masker en gerolde staart. Anatolische Herders zijn een bredere categorie."
    },
    {
      question: "Heeft de Kangal de sterkste beet van alle honden?",
      answer: "Ja, de Kangal heeft de krachtigste gemeten bijtdruk van alle hondenrassen: 743 PSI (pounds per square inch). Ter vergelijking: een leeuw heeft 650 PSI en een witte haai 600 PSI. Deze kracht was noodzakelijk om wolven af te weren."
    },
    {
      question: "Zijn Kangals geschikt voor beginners?",
      answer: "Absoluut niet. Kangals zijn onafhankelijke, eigenzinnige honden die gefokt zijn om zelfstandig beslissingen te nemen. Ze vereisen zeer ervaren eigenaren die hun beschermingsinstinct kunnen begrijpen en leiden."
    },
    {
      question: "Hoeveel beweging heeft een Kangal nodig?",
      answer: "Kangals hebben matige beweging nodig: 1-1,5 uur per dag, maar belangrijker is dat ze ruimte hebben om te patrouilleren. Ze zijn geen energieke atleten, maar willen wel hun 'territorium' kunnen bewaken. Een klein appartement is absoluut ongeschikt."
    },
    {
      question: "Zijn Kangals agressief?",
      answer: "Kangals zijn niet per definitie agressief, maar ze zijn zeer beschermend en territoriaal. Ze zijn wantrouwend tegenover vreemden en reageren bedreigd als indringers hun territorium betreden. Socialisatie is cruciaal, maar verandert hun basisinstinct niet."
    },
    {
      question: "Kunnen Kangals in warme klimaten leven?",
      answer: "Ja, Kangals komen uit centraal Turkije waar zomers heet zijn (tot 40°C) en winters koud (-25°C). Hun dubbele vacht beschermt tegen beide extremen. Ze zijn goed aangepast aan verschillende klimaten."
    },
    {
      question: "Hoe oud wordt een Kangal?",
      answer: "Een Kangal wordt gemiddeld 12 tot 15 jaar oud, wat langer is dan veel andere grote rassen. Hun robuuste genetica draagt bij aan hun lange levensduur."
    },
    {
      question: "Wat kost een Kangal pup in België?",
      answer: "Een Kangal pup met stamboom kost tussen €1.000 en €2.000 in België. Het ras is relatief zeldzaam in Europa, dus wachtlijsten bij erkende fokkers zijn normaal."
    }
  ],
  funFacts: [
    "De Kangal heeft de krachtigste beet van alle hondenrassen: 743 PSI – sterker dan een leeuw!",
    "In Turkije is de Kangal een nationale schat en zijn er strikte exportbeperkingen om de zuiverheid van het ras te beschermen.",
    "Kangals worden in Afrika gebruikt om geparden en luipaarden af te schrikken zonder ze te doden – dit helpt bescherming van wilde dieren.",
    "Ze kunnen rennen tot 50 km/u, wat essentieel was om wolven te achtervolgen.",
    "Kangals hebben een unieke zwarte masker en zwarte oren – dit is een kenmerkend rasattribuut.",
    "In sommige delen van Turkije dragen Kangals traditionele spiked collars ('köpeklik') om hun keel te beschermen tegen wolven."
  ],
  history: {
    origin: "De Kangal stamt uit de Sivas-provincie in centraal Turkije, specifiek de stad Kangal, waar het ras al duizenden jaren bestaat. Archeologische vondsten suggereren dat vergelijkbare honden al sinds 6000 v.Chr. in Anatolië leefden. Kangals werden gefokt door nomadische herders om schapen en geiten te beschermen tegen wolven, beren, jakhalzen en andere roofdieren in het ruige, bergachtige terrein.",
    development: "Gedurende millennia selecteerden herders Kangals op kracht, moed, onafhankelijkheid en loyaliteit. De honden moesten in staat zijn om zelfstandig beslissingen te nemen tijdens aanvallen door roofdieren, vaak zonder menselijke supervisie. Hun enorme bijtdruk (743 PSI) en snelheid (tot 50 km/u) maakten ze effectieve beschermers.\n\nIn Turkije is de Kangal een nationale trots en cultureel erfgoed. De Turkse overheid controleert het fokken streng en beperkt de export om de zuiverheid van het ras te behouden. Buiten Turkije wordt de Kangal vaak verward met de Anatolische Herder – de FCI erkent ze als één ras ('Anatolian Shepherd Dog'), maar in Turkije zijn ze gescheiden.\n\nVanaf de jaren 1980 verspreidde het ras zich naar het Westen, waar ze werden gebruikt als veewachters en gezinshonden. Ze worden ook ingezet in Afrika om vee te beschermen tegen grote katten, wat bijdraagt aan de bescherming van bedreigde roofdieren door conflicten te verminderen. De Kangal behoudt zijn onafhankelijke, beschermende karakter en vereist zeer ervaren eigenaarschap."
  },
  similarBreeds: [
    "Anatolische Herder",
    "Centraal-Aziatische Ovtcharka",
    "Kaukasische Ovtcharka",
    "Akbash"
  ],
  commonMistakes: [
    "In kleine ruimtes houden: Kangals hebben veel ruimte nodig om te patrouilleren. Appartementen zijn absoluut ongeschikt.",
    "Onvoldoende omheining: Kangals zullen hun territorium uitbreiden en kunnen ontsnappen. Een hoge, stevige omheining (minimaal 2 meter) is essentieel.",
    "Socialisatie forceren: Kangals blijven altijd wantrouwend tegenover vreemden. Accepteer dit als onderdeel van het ras.",
    "Harde trainingsmethoden: Kangals reageren slecht op dwang. Gebruik respect, geduld en positieve bekrachtiging.",
    "Te vroeg kastreren: Kangals hebben hormonen nodig voor volledige fysieke ontwikkeling. Wacht tot na 18-24 maanden.",
    "Onderschatten van hun beschermingsinstinct: Een Kangal zal reageren op wat hij als bedreiging ziet. Controleer altijd toegang tot je eigendom."
  ],
  monthlyCosts: {
    food: "€80-€120",
    vet: "€25-€50",
    grooming: "€20-€40",
    insurance: "€25-€50",
    total: "€150-€260",
    note: "Kangals zijn relatief gezond vergeleken met andere grote rassen, maar kunnen heupdysplasie en entropion (naar binnen gedraaide oogleden) ontwikkelen. Hun robuuste genetica betekent lagere dierenartsenkosten dan veel andere Mastiff-types. Levenslange kosten: €20.000-€35.000."
  }
};

// ===== 153. Centraal-Aziatische Ovtcharka =====
export const centralAsianShepherd: BreedDetails = {
  breedName: "Central Asian Shepherd Dog",
  breedNameNL: "Centraal-Aziatische Ovtcharka",
  faqs: [
    {
      question: "Wat betekent 'Ovtcharka'?",
      answer: "'Ovtcharka' betekent 'herdershond' in het Russisch. De Centraal-Aziatische Ovtcharka (ook 'Alabai' genoemd) is een oude herdershond uit Centraal-Azië."
    },
    {
      question: "Hoe groot wordt een Centraal-Aziatische Ovtcharka?",
      answer: "Centraal-Aziatische Ovtcharka's zijn enorme honden. Reuen worden minimaal 70 cm hoog en wegen 50-80 kg, teven minimaal 65 cm en 40-65 kg. Sommige reuen kunnen meer dan 100 kg wegen."
    },
    {
      question: "Zijn Centraal-Aziatische Ovtcharka's agressief?",
      answer: "Ze zijn niet per definitie agressief, maar zeer territoriaal en beschermend. Ze zijn wantrouwend tegenover vreemden en reageren assertief op bedreigingen. Ze vereisen zeer ervaren eigenaren die hun beschermingsinstinct kunnen begrijpen en leiden."
    },
    {
      question: "Zijn Centraal-Aziatische Ovtcharka's geschikt voor beginners?",
      answer: "Absoluut niet. Dit zijn onafhankelijke, dominante honden die gefokt zijn om zelfstandig te werken. Ze vereisen een zeer ervaren, assertieve eigenaar met kennis van beschermende rassen."
    },
    {
      question: "Hoeveel beweging heeft een Centraal-Aziatische Ovtcharka nodig?",
      answer: "Ze hebben matige beweging nodig: 1-1,5 uur per dag, maar belangrijker is ruimte om te patrouilleren. Ze zijn geen marathonlopers maar willen wel hun territorium kunnen bewaken."
    },
    {
      question: "Kunnen Centraal-Aziatische Ovtcharka's in warme klimaten leven?",
      answer: "Hoewel ze uit gebieden komen met hete zomers, hebben ze een dikke dubbele vacht die hen beschermt tegen koude. In zeer warme klimaten hebben ze schaduw en klimaatbeheersing nodig."
    },
    {
      question: "Hoe oud wordt een Centraal-Aziatische Ovtcharka?",
      answer: "Een Centraal-Aziatische Ovtcharka wordt gemiddeld 12 tot 15 jaar oud, wat opmerkelijk lang is voor zo'n groot ras. Hun robuuste genetica draagt bij aan hun longeviteit."
    },
    {
      question: "Wat is het verschil tussen een Centraal-Aziatische en Kaukasische Ovtcharka?",
      answer: "Beide zijn grote herdershonden uit voormalige Sovjetgebieden, maar ze komen uit verschillende regio's. Centraal-Aziatische Ovtcharka's komen uit Centraal-Azië (Kazachstan, Turkmenistan, etc.) en zijn iets atletischer. Kaukasische Ovtcharka's komen uit de Kaukasus en zijn zwaarder en wolachtiger."
    }
  ],
  funFacts: [
    "De Centraal-Aziatische Ovtcharka is één van de oudste hondenrassen ter wereld – ze bestaan al meer dan 4.000 jaar!",
    "In Turkmenistan is het ras een nationale trots en staat het afgebeeld op postzegels en munten.",
    "De traditionele naam 'Alabai' betekent 'gevlekt' in Turkmeens, verwijzend naar hun gevlekte vacht.",
    "Deze honden werden gebruikt om te vechten tegen wolven, beren en zelfs tijgers in Centraal-Azië.",
    "In sommige Centraal-Aziatische culturen worden de oren en staart van pups traditioneel gecoupeerd – dit is nu verboden in de EU.",
    "Ze zijn nauw verwant aan de Tibetaanse Mastiff en delen dezelfde oude Molosser-voorouders."
  ],
  history: {
    origin: "De Centraal-Aziatische Ovtcharka is één van de oudste hondenrassen ter wereld, met een geschiedenis die teruggaat tot meer dan 4.000 jaar. Het ras evolueerde in de uitgestrekte steppen, bergen en woestijnen van Centraal-Azië, vooral in landen zoals Kazachstan, Turkmenistan, Oezbekistan, Kirgizië en Tadzjikistan. Deze honden werden gefokt door nomadische herders om vee te beschermen tegen wolven, beren, grote katten en menselijke dieven.",
    development: "Door de geografische isolatie en extreme omstandigheden (van -40°C in de winter tot +40°C in de zomer) ontwikkelde het ras zich met minimale menselijke interventie. Natuurlijke selectie zorgde voor honden die extreem robuust, onafhankelijk en moedig waren. Alleen de sterkste overleefden, wat leidde tot een genetisch gezond ras.\n\nIn de Sovjet-periode probeerde het regime het ras te standaardiseren en te gebruiken als militaire hond, maar de Ovtcharka's waren te onafhankelijk en eigenzinnig voor formele training. Na de val van de Sovjet-Unie werd het ras geëxporteerd naar het Westen. De FCI erkende het ras officieel in 1989.\n\nIn Centraal-Azië worden Ovtcharka's nog steeds gebruikt als traditionele veewachters. In Turkmenistan zijn ze een nationaal symbool en is export streng gereguleerd. Het ras wordt ook gebruikt voor hondengevechten in sommige regio's (controversieel en vaak illegaal). In het Westen zijn ze zeldzaam maar gewaardeerd als imposante wachthonden. Ze behouden hun onafhankelijke, beschermende karakter en vereisen zeer ervaren eigenaarschap."
  },
  similarBreeds: [
    "Kaukasische Ovtcharka",
    "Kangal",
    "Tibetaanse Mastiff",
    "Anatolische Herder"
  ],
  commonMistakes: [
    "In kleine ruimtes houden: Ovtcharka's hebben enorm veel ruimte nodig. Appartementen zijn absoluut ongeschikt.",
    "Onvoldoende omheining: Deze honden kunnen springen en graven. Een hoge, stevige omheining (minimaal 2 meter) is essentieel.",
    "Socialisatie forceren: Ovtcharka's blijven altijd wantrouwend. Accepteer dit als onderdeel van het ras.",
    "Harde trainingsmethoden: Deze honden reageren slecht op dwang en kunnen agressief worden. Gebruik respect en geduld.",
    "Onderschatten van hun kracht en onafhankelijkheid: Een ongetrainde Ovtcharka kan gevaarlijk zijn.",
    "Te jong kastreren: Ovtcharka's hebben hormonen nodig voor volledige ontwikkeling. Wacht tot na 18-24 maanden."
  ],
  monthlyCosts: {
    food: "€100-€150",
    vet: "€30-€60",
    grooming: "€20-€40",
    insurance: "€30-€60",
    total: "€180-€310",
    note: "Centraal-Aziatische Ovtcharka's zijn relatief gezond door natuurlijke selectie. Gezondheidsproblemen omvatten heupdysplasie en elleboogdysplasie. Hun dikke vacht vereist regelmatig borstelen, vooral tijdens rui. Levenslange kosten: €25.000-€40.000."
  }
};

// ===== 154. Kaukasische Ovtcharka =====
export const caucasianShepherd: BreedDetails = {
  breedName: "Caucasian Shepherd Dog",
  breedNameNL: "Kaukasische Ovtcharka",
  faqs: [
    {
      question: "Hoe groot wordt een Kaukasische Ovtcharka?",
      answer: "Kaukasische Ovtcharka's behoren tot de grootste hondenrassen ter wereld. Reuen worden minimaal 72 cm hoog en wegen 50-100 kg, teven minimaal 67 cm en 45-80 kg. Sommige reuen kunnen tot 110 kg wegen."
    },
    {
      question: "Zijn Kaukasische Ovtcharka's agressief?",
      answer: "Ze zijn niet per definitie agressief, maar extreem territoriaal en beschermend. Ze zijn zeer wantrouwend tegenover vreemden en zullen agressief reageren op bedreigingen. Ze vereisen zeer ervaren eigenaren en zijn absoluut niet geschikt voor beginners."
    },
    {
      question: "Waar komt de Kaukasische Ovtcharka vandaan?",
      answer: "De Kaukasische Ovtcharka komt uit het Kaukasusgebergte tussen de Zwarte Zee en de Kaspische Zee, vooral Georgië, Armenië, Azerbeidzjan en Zuid-Rusland. Ze werden gefokt om vee te beschermen tegen wolven en beren."
    },
    {
      question: "Zijn Kaukasische Ovtcharka's geschikt voor beginners?",
      answer: "Absoluut niet. Dit zijn enorm krachtige, dominante honden met sterke beschermingsinstincten. Ze vereisen zeer ervaren eigenaren die assertief kunnen leiden en hun instincten kunnen begrijpen."
    },
    {
      question: "Hoeveel beweging heeft een Kaukasische Ovtcharka nodig?",
      answer: "Kaukasische Ovtcharka's hebben matige beweging nodig: 1-1,5 uur per dag. Ze zijn geen energieke atleten, maar willen wel ruimte om te patrouilleren. Overmatige beweging bij jonge honden kan gewrichtsschade veroorzaken."
    },
    {
      question: "Verhaart een Kaukasische Ovtcharka veel?",
      answer: "Ja, Kaukasische Ovtcharka's hebben een extreem dikke, wolachtige dubbele vacht en verharen intensief, vooral tijdens de twee jaarlijkse ruiperiodes. Dagelijks borstelen is noodzakelijk om losse haren te beheren."
    },
    {
      question: "Hoe oud wordt een Kaukasische Ovtcharka?",
      answer: "Een Kaukasische Ovtcharka wordt gemiddeld 10 tot 12 jaar oud, wat normaal is voor zo'n groot ras."
    },
    {
      question: "Wat kost een Kaukasische Ovtcharka pup in België?",
      answer: "Een Kaukasische Ovtcharka pup met stamboom kost tussen €1.200 en €2.500 in België. Het ras is relatief zeldzaam in West-Europa. Kies altijd een erkende fokker."
    }
  ],
  funFacts: [
    "Kaukasische Ovtcharka's werden gebruikt om de Berlijnse Muur te patrouilleren tijdens de Koude Oorlog.",
    "Ze werden gefokt om te vechten tegen wolven en beren – en ze kunnen winnen. Hun moed is legendar isch.",
    "In Rusland worden ze 'Kavkazskaïa Ovtcharka' genoemd, wat letterlijk 'Kaukasische herder' betekent.",
    "Hun extreem dikke vacht beschermt hen tegen temperaturen tot -40°C in de bergen van de Kaukasus.",
    "De Russische dichter Sergei Yesenin schreef een gedicht genaamd 'De Kaukasische Herdershond' waarin hij hun loyaliteit bezingt.",
    "Sommige Kaukasische Ovtcharka's hebben een 'beer-type' uiterlijk met kortere snuiten, anderen een 'wolf-type' met langere snuiten."
  ],
  history: {
    origin: "De Kaukasische Ovtcharka is één van de oudste herdershondenrassen ter wereld, met een geschiedenis die teruggaat tot minstens 2.000 jaar. Het ras evolueerde in het Kaukasusgebergte – een ruig berggebied tussen de Zwarte Zee en de Kaspische Zee, vooral in Georgië, Armenië, Azerbeidzjan en Zuid-Rusland. Ze werden gefokt door herders om schapen en vee te beschermen tegen wolven, beren, jakhalzen en menselijke dieven in extreme bergomstandigheden.",
    development: "Door de geografische isolatie en harde klimaat ontwikkelde het ras zich met minimale menselijke interventie. Natuurlijke selectie zorgde voor honden met extreme kracht, moed, onafhankelijkheid en een dikke vacht die hen beschermde tegen temperaturen tot -40°C. Alleen de moedigste en sterkste honden overleefden confrontaties met beren en wolven.\n\nIn de Sovjet-periode gebruikte het Rode Leger Kaukasische Ovtcharka's als bewakingshonden voor militaire installaties. Ze patrouilleerden langs de Berlijnse Muur en bewaakten gevangenenkampen in Siberië. Na de val van de Sovjet-Unie begon het ras zich te verspreiden naar het Westen. De FCI erkende het ras officieel in 1984.\n\nHet ras splitste zich in verschillende variaties: de Georgische type (zwaarder, beer-achtig), de Azerbeidzjaanse type (atletischer), en de Armeense type (tussenvorm). Moderne fokkers streven naar behoud van de werkeigenschappen en het imposante uiterlijk. Kaukasische Ovtcharka's zijn zeldzaam maar populair als ultieme wachhonden. Ze behouden hun extreme beschermingsinstinct en vereisen zeer verantwoord eigenaarschap."
  },
  similarBreeds: [
    "Centraal-Aziatische Ovtcharka",
    "Tibetaanse Mastiff",
    "Kangal",
    "Pyrenese Berghond"
  ],
  commonMistakes: [
    "In kleine ruimtes houden: Kaukasische Ovtcharka's hebben enorm veel ruimte nodig. Appartementen zijn absoluut ongeschikt.",
    "Onvoldoende omheining: Een hoge, stevige omheining (minimaal 2 meter) is essentieel om ontsnapping te voorkomen.",
    "Socialisatie forceren: Deze honden blijven altijd wantrouwend. Accepteer dit als onderdeel van het ras.",
    "Harde trainingsmethoden: Kaukasische Ovtcharka's reageren slecht op dwang en kunnen agressief worden.",
    "Vacht verwaarlozen: Hun dikke vacht klittert snel zonder dagelijks borstelen, vooral tijdens rui.",
    "Onderschatten van hun beschermingsinstinct: Deze honden zullen reageren op wat zij als bedreiging zien. Controleer altijd toegang tot je eigendom."
  ],
  monthlyCosts: {
    food: "€100-€160",
    vet: "€30-€70",
    grooming: "€40-€80",
    insurance: "€30-€60",
    total: "€200-€370",
    note: "Kaukasische Ovtcharka's hebben hoge voedingskosten door hun enorme formaat. Gezondheidsproblemen omvatten heupdysplasie, obesitas en hartproblemen. Professionele trimming tijdens rui kost €80-€150. Levenslange kosten: €25.000-€42.000."
  }
};

// ===== 155. Landseer =====
export const landseer: BreedDetails = {
  breedName: "Landseer",
  breedNameNL: "Landseer",
  faqs: [
    {
      question: "Wat is het verschil tussen een Landseer en een Newfoundlander?",
      answer: "In Europa (FCI) zijn Landseer en Newfoundlander aparte rassen. De Landseer is zwart-wit, heeft langere poten en een meer rechthoekig lichaam. In Noord-Amerika (AKC/CKC) is de zwart-witte Newfoundlander gewoon een kleurvariant van de Newfoundlander, niet een apart ras."
    },
    {
      question: "Waarom heet het ras 'Landseer'?",
      answer: "Het ras is vernoemd naar de Britse schilder Sir Edwin Landseer (1802-1873), die beroemd werd door zijn schilderijen van zwart-witte Newfoundland-achtige honden, vooral het iconische schilderij 'A Distinguished Member of the Humane Society' (1838)."
    },
    {
      question: "Zijn Landseers goede zwemmers?",
      answer: "Ja, Landseers zijn uitstekende zwemmers! Ze hebben gedeeltelijke zwemvliezen tussen hun tenen, een waterproof vacht en een krachtige bouw. Ze werden historisch gebruikt als waterreddingshonden."
    },
    {
      question: "Hoeveel weegt een Landseer?",
      answer: "Reuen wegen 60-75 kg en worden 72-80 cm hoog, teven 50-55 kg en 67-72 cm. Ze zijn iets lichter en athletischer dan Newfoundlanders."
    },
    {
      question: "Zijn Landseers geschikt voor beginners?",
      answer: "Landseers kunnen geschikt zijn voor gemotiveerde beginners. Ze zijn vriendelijk, geduldig en willen graag behagen. Hun grote formaat vereist wel consequente training en vroege socialisatie."
    },
    {
      question: "Verhaart een Landseer veel?",
      answer: "Ja, Landseers hebben een dikke, dubbele vacht en verharen intensief, vooral tijdens de twee jaarlijkse ruiperiodes. Dagelijks borstelen is noodzakelijk om losse haren te beheren."
    },
    {
      question: "Hoe oud wordt een Landseer?",
      answer: "Een Landseer wordt gemiddeld 10 tot 12 jaar oud, wat normaal is voor grote rassen."
    },
    {
      question: "Zijn Landseers goed met kinderen?",
      answer: "Ja, Landseers zijn uitstekende gezinshonden. Ze zijn geduldig, zachtaardig en beschermend tegenover kinderen. Hun grote formaat vereist wel toezicht bij jonge kinderen."
    }
  ],
  funFacts: [
    "De beroemde hond in het schilderij 'A Distinguished Member of the Humane Society' van Sir Edwin Landseer heette Bob en redde 23 mensen van verdrinking.",
    "Lord Byron schreef een beroemd gedicht 'Epitaph to a Dog' over zijn Landseer genaamd Boatswain.",
    "Landseers werden door vissers in Newfoundland gebruikt om netten binnen te halen en overboord gevallen zeelieden te redden.",
    "Ze hebben een natuurlijk reddingsinstinct en zullen vaak spontaan 'reddingspogingen' ondernemen als ze mensen in het water zien.",
    "Landseers hebben een waterafstotende dubbele vacht die hen beschermt tegen ijskoud water.",
    "In Zwitserland en Duitsland zijn Landseers populairder dan in hun land van oorsprong (Newfoundland/Canada)."
  ],
  history: {
    origin: "De Landseer deelt zijn oorsprong met de Newfoundlander en komt van het eiland Newfoundland, Canada. In de 18e en 19e eeuw werkten zwart-witte Newfoundland-honden naast volledig zwarte exemplaren als hulphonden voor vissers. Ze haalden netten binnen, droegen lijnen naar de kust en redden overboord gevallen zeelieden. De zwart-witte variant werd populair in Europa, vooral na de beroemde schilderijen van Sir Edwin Landseer in de vroege 19e eeuw.",
    development: "In Europa begonnen fokkers de zwart-witte Newfoundlanders selectief te fokken als een apart ras, waarbij ze de nadruk legden op langere poten en een meer rechthoekig lichaam (in tegenstelling tot de vierkante, compactere Newfoundlander). In Zwitserland en Duitsland werd dit type vooral populair en werd het officieel erkend als 'Landseer European Continental Type' om het te onderscheiden van de Noord-Amerikaanse zwart-witte Newfoundlander.\n\nDe FCI erkende de Landseer als apart ras in 1960, met Duitsland en Zwitserland als oorsprongslanden. In Noord-Amerika (AKC, CKC) wordt de zwart-witte Newfoundlander echter nog steeds beschouwd als een kleurvariant van de Newfoundlander, niet als apart ras. Dit leidt tot verwarring.\n\nDe moderne Landseer behoudt de waterreddingsinstincten en het vriendelijke karakter van zijn voorouders. Ze worden gebruikt als therapiehonden, waterreddingshonden en geliefde gezinsleden. Hun zachte aard en imposante uiterlijk maken ze populair, hoewel ze minder bekend zijn dan de Newfoundlander."
  },
  similarBreeds: [
    "Newfoundlander",
    "Sint-Bernard",
    "Leonberger",
    "Pyrenese Berghond"
  ],
  commonMistakes: [
    "Jonge Landseers te veel laten bewegen: Overmatige inspanning tijdens de groei (tot 18-24 maanden) kan gewrichtsschade veroorzaken.",
    "Vacht verwaarlozen: Hun dikke vacht klittert snel zonder dagelijks borstelen, vooral tijdens rui.",
    "Overvoeren: Landseers zijn gevoelig voor obesitas. Volg voedingsrichtlijnen strikt.",
    "Te lang alleen laten: Landseers zijn zeer sociaal en kunnen scheidingsangst ontwikkelen.",
    "Hitte onderschatten: Hun dikke vacht maakt ze gevoelig voor oververhitting. Vermijd wandelen in warme uren.",
    "Water verwaarlozen: Landseers houden van water en hebben regelmatige zwemgelegenheid nodig voor fysiek en mentaal welzijn."
  ],
  monthlyCosts: {
    food: "€90-€140",
    vet: "€30-€60",
    grooming: "€40-€80",
    insurance: "€25-€50",
    total: "€185-€330",
    note: "Landseers hebben hogere verzorgingskosten door hun dikke vacht. Professionele trimming kost €70-€120 per sessie (3-4x per jaar). Gezondheidsproblemen omvatten heupdysplasie, elleboogdysplasie en cystinurie (niersteentjes). Levenslange kosten: €22.000-€36.000."
  }
};

// ===== 156. St. Bernard (Bernhardiner) =====
export const saintBernard: BreedDetails = {
  breedName: "Saint Bernard",
  breedNameNL: "Sint-Bernard (Bernhardiner)",
  faqs: [
    {
      question: "Droegen Sint-Bernards echt vaten met alcohol om hun nek?",
      answer: "Nee, dit is een mythe! Het beroemde beeld van een Sint-Bernard met een brandy-vat komt van een schilderij van Edwin Landseer uit 1820. In werkelijkheid droegen reddingshonden nooit alcohol – het zou hypothermie verergeren, niet verlichten."
    },
    {
      question: "Hoeveel mensen hebben Sint-Bernards gered?",
      answer: "Tussen 1800 en 1897 hebben Sint-Bernards van het hospice op de Grote Sint-Bernhardpas meer dan 2.000 mensen gered van lawines en sneeuwstormen. De beroemdste, Barry, redde 40-100 mensen (afhankelijk van de bron)."
    },
    {
      question: "Kwijlt een Sint-Bernard veel?",
      answer: "Ja, vooral langhaar Sint-Bernards kwijlen flink door hun losse lippen en zware koppen. Houd doeken bij de hand en bereid je voor op kwijlsporen overal."
    },
    {
      question: "Hoeveel weegt een Sint-Bernard?",
      answer: "Reuen wegen 70-90 kg en worden 70-90 cm hoog, teven 60-80 kg en 65-80 cm. Sommige exemplaren kunnen meer dan 100 kg wegen. Ze behoren tot de zwaarste hondenrassen."
    },
    {
      question: "Zijn Sint-Bernards goed met kinderen?",
      answer: "Ja, Sint-Bernards zijn uitstekend met kinderen. Ze zijn geduldig, zachtaardig en beschermend. Hun grote formaat vereist wel toezicht bij jonge kinderen om ongelukjes te voorkomen."
    },
    {
      question: "Hoeveel beweging heeft een Sint-Bernard nodig?",
      answer: "Sint-Bernards hebben matige beweging nodig: 1 uur per dag verdeeld over meerdere wandelingen. Ze zijn geen energieke atleten. Vermijd overmatige inspanning, vooral bij jonge honden en in warme weer."
    },
    {
      question: "Hoe oud wordt een Sint-Bernard?",
      answer: "Sint-Bernards hebben een relatief korte levensverwachting van 8 tot 10 jaar, zoals bij de meeste reuzenrassen."
    },
    {
      question: "Wat kost een Sint-Bernard pup in België?",
      answer: "Een Sint-Bernard pup met stamboom kost tussen €1.200 en €2.000 in België. Kies altijd een erkende fokker die ouderdieren screent op erfelijke aandoeningen."
    }
  ],
  funFacts: [
    "De zwaarste hond ooit gemeten was een Sint-Bernard genaamd Benedictine: hij woog 166,4 kg!",
    "Barry, de beroemdste reddingshond, redde tussen 1800-1814 naar schatting 40-100 mensen. Zijn lichaam is tentoongesteld in het Natuurhistorisch Museum in Bern.",
    "Sint-Bernards werden oorspronkelijk kortharig gefokt – de langhaar variant ontstond later door kruising met Newfoundlanders.",
    "De kortharige variant is beter geschikt voor reddingswerk in sneeuw – lange haren bevriezen en belemmeren beweging.",
    "Het hospice op de Grote Sint-Bernhardpas fokt nog steeds Sint-Bernards en gebruikt ze voor demonstraties (niet meer voor actieve redding).",
    "Beethoven, de beroemde Sint-Bernard uit de gelijknamige filmreeks, maakte het ras enorm populair in de jaren 1990."
  ],
  history: {
    origin: "De Sint-Bernard ontstond in de Zwitserse Alpen, specifiek bij het hospice op de Grote Sint-Bernhardpas – een gevaarlijke bergpas op 2.469 meter hoogte tussen Zwitserland en Italië. Het hospice werd in de 11e eeuw gesticht door monniken om reizigers onderdak te bieden. Rond 1660 begonnen de monniken grote honden te fokken om reizigers te helpen vinden die verdwaald waren in sneeuwstormen of begraven lagen onder lawines.",
    development: "Deze vroege Sint-Bernards waren kortharig en lichter dan moderne exemplaren. Ze werkten in paren: één hond bleef bij het slachtoffer om warmte te geven, terwijl de andere terugkeerde naar het hospice om hulp te halen. Tussen 1800 en 1897 redden deze honden meer dan 2.000 mensen. De beroemdste was Barry (1800-1814), die 40-100 levens redde.\n\nIn de vroege 19e eeuw stierf het ras bijna uit door extreme winters en inteelt. De monniken kruisten de overgebleven honden met Newfoundlanders om het ras te herstellen, wat resulteerde in de langhaar variant. Ironisch genoeg bleken langhaar Sint-Bernards minder geschikt voor reddingswerk – hun vacht bevroor en belemmerde beweging.\n\nHet ras werd officieel erkend in 1884 en verspreidde zich over de wereld als gezinshond. Het romantische beeld van de Sint-Bernard met een brandy-vat (gecreëerd door schilder Edwin Landseer) werd iconisch, hoewel het nooit waar was. Tegenwoordig zijn Sint-Bernards geliefde gentle giants, bekend om hun geduld en loyaliteit."
  },
  similarBreeds: [
    "Leonberger",
    "Newfoundlander",
    "Landseer",
    "Bernese Mountain Dog"
  ],
  commonMistakes: [
    "Jonge Sint-Bernards te veel laten bewegen: Overmatige inspanning tijdens de groei veroorzaakt blijvende gewrichtsschade.",
    "Overvoeren: Sint-Bernards zijn gevoelig voor obesitas en maagdraaiing. Voer in meerdere kleine maaltijden.",
    "Hitte onderschatten: Sint-Bernards zijn zeer gevoelig voor oververhitting. Vermijd wandelen in warme uren.",
    "Kwijl negeren: Zonder regelmatige reiniging kunnen kwijlresten huidirritaties veroorzaken.",
    "Vacht verwaarlozen: Vooral langhaar Sint-Bernards klitten snel zonder regelmatig borstelen.",
    "Te lang alleen laten: Sint-Bernards zijn zeer sociaal en kunnen scheidingsangst ontwikkelen."
  ],
  monthlyCosts: {
    food: "€100-€150",
    vet: "€40-€80",
    grooming: "€40-€80",
    insurance: "€30-€60",
    total: "€210-€370",
    note: "Sint-Bernards hebben hoge onderhoudskosten door hun enorme formaat. Gezondheidsproblemen omvatten heupdysplasie, elleboogdysplasie, opgeblazenheid, oogproblemen (ectropion, entropion) en hartproblemen. Oogoperaties kosten €800-€1.500 per oog. Levenslange kosten: €20.000-€35.000."
  }
};

// ===== 157. Estrela Berghond =====
export const estrelaMountainDog: BreedDetails = {
  breedName: "Estrela Mountain Dog",
  breedNameNL: "Estrela Berghond",
  faqs: [
    {
      question: "Waar komt de Estrela Berghond vandaan?",
      answer: "De Estrela Berghond komt uit de Serra da Estrela, het hoogste berggebied van Portugal. Het ras werd al eeuwen gefokt door herders om schapen te beschermen tegen wolven en dieven."
    },
    {
      question: "Zijn er verschillende types Estrela Berghonden?",
      answer: "Ja, er zijn twee vachttypes: kort haar (meer traditioneel) en langhaar. Beide types hebben dezelfde eigenschappen en afmetingen, alleen de vachtlengte verschilt."
    },
    {
      question: "Hoeveel weegt een Estrela Berghond?",
      answer: "Reuen wegen 40-50 kg en worden 65-72 cm hoog, teven 30-40 kg en 62-68 cm. Ze zijn kleiner dan veel andere berghonden maar zeer krachtig gebouwd."
    },
    {
      question: "Zijn Estrela Berghonden geschikt voor beginners?",
      answer: "Nee, Estrela Berghonden zijn niet ideaal voor beginners. Ze zijn onafhankelijk, eigenzinnig en territoriaal. Ze vereisen een ervaren eigenaar die consistent kan trainen en hun beschermingsinstinct kan begrijpen."
    },
    {
      question: "Hoeveel beweging heeft een Estrela Berghond nodig?",
      answer: "Estrela Berghonden hebben matige beweging nodig: 1-1,5 uur per dag. Ze zijn geen marathonlopers maar houden van patrouilleren en wandelen. Mentale stimulatie is even belangrijk als fysieke beweging."
    },
    {
      question: "Zijn Estrela Berghonden goed met kinderen?",
      answer: "Ja, goed gesocialiseerde Estrela Berghonden zijn uitstekend met kinderen uit hun eigen gezin. Ze zijn geduldig en beschermend, maar hun onafhankelijke aard vereist toezicht bij jonge kinderen."
    },
    {
      question: "Hoe oud wordt een Estrela Berghond?",
      answer: "Een Estrela Berghond wordt gemiddeld 10 tot 14 jaar oud, wat langer is dan veel andere grote rassen."
    },
    {
      question: "Wat kost een Estrela Berghond pup in België?",
      answer: "Een Estrela Berghond pup met stamboom kost tussen €1.000 en €1.800 in België. Het ras is zeldzaam buiten Portugal, dus wachtlijsten zijn normaal."
    }
  ],
  funFacts: [
    "De Estrela Berghond is één van de oudste Portugese hondenrassen en bestaat al minstens sinds de Middeleeuwen.",
    "In Portugal worden ze 'Cão da Serra da Estrela' genoemd – letterlijk 'Hond van de Estrela Bergen'.",
    "Estrela Berghonden hebben een unieke 'mastino' (Mastiff-achtige) uitstraling ondanks hun kleinere formaat.",
    "Ze werden traditioneel niet alleen gebruikt om schapen te beschermen, maar ook om kaas-transporten te bewaken tijdens de afdaling van de bergen.",
    "Het ras is zo zeldzaam dat er wereldwijd slechts enkele duizenden exemplaren zijn.",
    "Estrela Berghonden hebben een karakteristiek diepe, luid geblaf dat kilometers ver draagt in de bergen."
  ],
  history: {
    origin: "De Estrela Berghond is één van de oudste Portugese hondenrassen en stamt uit de Serra da Estrela, het hoogste berggebied van Portugal (piek op 1.993 meter). Het ras bestaat al sinds de Middeleeuwen, toen herders robuuste honden nodig hadden om schapen te beschermen tegen wolven, dieven en andere roofdieren in het ruige, geïsoleerde bergterrein. De afgelegen ligging zorgde voor een pure, onvermengde bloedlijn gedurende eeuwen.",
    development: "Estrela Berghonden werden geselecteerd op moed, onafhankelijkheid, weersbestendigheid en loyaliteit. Ze werkten vaak alleen of in kleine groepen, zonder directe menselijke supervisie, waardoor zelfstandigheid een kernkwaliteit werd. Naast het beschermen van vee werden ze ook gebruikt om kaas en andere goederen te bewaken tijdens transporten van de bergen naar de valleien.\n\nHet ras werd pas in de 20e eeuw officieel gestandaardiseerd. In 1908 werd de eerste rasstandaard geschreven, en in 1922 werd het ras erkend door de Portugese Kennel Club. De FCI erkende het ras in 1955. Twee vachttypes ontstonden: kortharig (oorspronkelijk, praktischer voor werk) en langharig (later ontwikkeld, populairder als gezelschapshond).\n\nDe Estrela Berghond bleef relatief onbekend buiten Portugal tot de late 20e eeuw. Tegenwoordig is het ras zeldzaam maar gewaardeerd door liefhebbers van traditionele herdershonden. Ze behouden hun onafhankelijke, beschermende karakter en vereisen ervaren eigenaarschap."
  },
  similarBreeds: [
    "Pyrenese Berghond",
    "Rafeiro do Alentejo",
    "Cao de Castro Laboreiro",
    "Kuvasz"
  ],
  commonMistakes: [
    "Onvoldoende socialisatie: Estrela's zijn van nature wantrouwend. Zonder vroege socialisatie worden ze te beschermend.",
    "Harde trainingsmethoden: Dit ras reageert slecht op dwang. Gebruik geduld en positieve bekrachtiging.",
    "Te veel vrijheid: Een ongetrainde Estrela kan territoriaal gedrag vertonen. Zorg voor goede controle en omheining.",
    "Vacht verwaarlozen: Vooral langhaar Estrela's klitten snel. Regelmatig borstelen is essentieel.",
    "Te lang alleen laten: Ondanks hun onafhankelijkheid zijn ze loyaal aan hun gezin en kunnen ze scheidingsangst ontwikkelen.",
    "Blaffen onderschatten: Estrela's blaffen om te waarschuwen. Accepteer dit of kies een ander ras."
  ],
  monthlyCosts: {
    food: "€70-€100",
    vet: "€25-€50",
    grooming: "€30-€60",
    insurance: "€25-€45",
    total: "€150-€255",
    note: "Estrela Berghonden zijn relatief gezond. Gezondheidsproblemen omvatten heupdysplasie en elleboogdysplasie. Langhaar types hebben hogere groomingkosten. Levenslange kosten: €18.000-€30.000."
  }
};

// ===== 158. Cao de Castro Laboreiro =====
export const castroLaboreirodog: BreedDetails = {
  breedName: "Cão de Castro Laboreiro",
  breedNameNL: "Cao de Castro Laboreiro",
  faqs: [
    {
      question: "Waar komt de Cao de Castro Laboreiro vandaan?",
      answer: "De Cao de Castro Laboreiro komt uit het dorp Castro Laboreiro in Noord-Portugal, nabij de Spaanse grens. Het ras werd gefokt om vee te beschermen in het ruige, bergachtige terrein van de Peneda-Gerês regio."
    },
    {
      question: "Wat maakt het geblaf van de Cao de Castro Laboreiro uniek?",
      answer: "De Cao de Castro Laboreiro heeft een zeer uniek geblaf dat wordt beschreven als 'crescendo' – het begint laag en stijgt in toonhoogte en volume. Dit geblaf is zo kenmerkend dat het wordt gebruikt om het ras te identificeren."
    },
    {
      question: "Hoeveel weegt een Cao de Castro Laboreiro?",
      answer: "Reuen wegen 30-40 kg en worden 58-64 cm hoog, teven 25-35 kg en 55-61 cm. Ze zijn atletisch en gespierd gebouwd, ideaal voor bergwerk."
    },
    {
      question: "Zijn Cao de Castro Laboreiro's geschikt voor beginners?",
      answer: "Nee, dit ras is niet geschikt voor beginners. Ze zijn zeer onafhankelijk, eigenzinnig en territoriaal. Ze vereisen een ervaren eigenaar die hun beschermingsinstinct kan begrijpen en leiden."
    },
    {
      question: "Hoeveel beweging heeft een Cao de Castro Laboreiro nodig?",
      answer: "Cao de Castro Laboreiro's zijn actieve honden die 1,5-2 uur beweging per dag nodig hebben. Ze houden van wandelen, patrouilleren en hebben mentale stimulatie nodig. Een kleine tuin is onvoldoende."
    },
    {
      question: "Zijn Cao de Castro Laboreiro's goed met kinderen?",
      answer: "Ja, goed gesocialiseerde Cao's zijn uitstekend met kinderen uit hun eigen gezin. Ze zijn loyaal en beschermend, maar hun onafhankelijke aard vereist toezicht."
    },
    {
      question: "Hoe oud wordt een Cao de Castro Laboreiro?",
      answer: "Een Cao de Castro Laboreiro wordt gemiddeld 11 tot 14 jaar oud, wat langer is dan veel andere grote rassen dankzij hun robuuste genetica."
    },
    {
      question: "Wat kost een Cao de Castro Laboreiro pup in België?",
      answer: "Een Cao de Castro Laboreiro pup met stamboom kost tussen €800 en €1.500 in België. Het ras is zeer zeldzaam buiten Portugal, dus import kan noodzakelijk zijn."
    }
  ],
  funFacts: [
    "Het unieke 'crescendo' geblaf van de Cao de Castro Laboreiro kan worden gehoord op meer dan 2 km afstand in de bergen.",
    "Het ras is zo zeldzaam dat er wereldwijd slechts enkele honderden exemplaren zijn.",
    "In Portugal wordt het ras beschouwd als nationaal erfgoed en zijn er fokprogramma's om het ras te behouden.",
    "Cao de Castro Laboreiro's hebben een unieke vachtkleur die 'lobeiro' (wolf-kleurig) wordt genoemd – verschillende tinten grijs tot bruin.",
    "Ze werden traditioneel gebruikt in een transhumance systeem: zomers in de bergen, winters in de valleien.",
    "Het ras is zo oud dat exacte oorsprong onbekend is – mogelijk duizenden jaren."
  ],
  history: {
    origin: "De Cao de Castro Laboreiro is één van de oudste Portugese hondenrassen en komt uit het bergdorp Castro Laboreiro in Noord-Portugal, nabij de Spaanse grens in het Peneda-Gerês gebied. Het ras bestaat al eeuwenlang, mogelijk sinds de pre-Romeinse tijd, hoewel exacte oorsprong onbekend is. Deze honden werden gefokt door herders om vee te beschermen tegen wolven en andere roofdieren in het ruige, geïsoleerde bergterrein.",
    development: "Cao de Castro Laboreiro's werden geselecteerd op moed, onafhankelijkheid, intelligentie en een uniek geblaf dat roofdieren afschrikte en herders waarschuwde over kilometers afstand. Hun wolf-grijze vacht ('lobeiro') hielp hen camoufleren in het berglandschap. Ze werkten in een traditioneel transhumance systeem: zomers brachten herders het vee naar hoge bergweiden, winters keerden ze terug naar de valleien.\n\nHet ras bleef puur door geografische isolatie – Castro Laboreiro is een afgelegen bergdorp met beperkte toegang. In de 20e eeuw daalde het aantal drastisch door modernisering van de landbouw en afname van de wolven populatie. In 1914 werd de eerste rasstandaard geschreven door de Portugese kynoloog José Manuel Gonçalves Marques. De FCI erkende het ras in 1955.\n\nTegenwoordig is de Cao de Castro Laboreiro extreem zeldzaam, zelfs in Portugal. Fokprogramma's proberen het ras te behouden als onderdeel van het Portugese culturele erfgoed. Buiten Portugal zijn ze bijna onbekend. Ze behouden hun onafhankelijke, waakzame karakter en vereisen zeer ervaren eigenaarschap."
  },
  similarBreeds: [
    "Estrela Berghond",
    "Rafeiro do Alentejo",
    "Pyrenese Berghond",
    "Catalaanse Herdershond"
  ],
  commonMistakes: [
    "Onvoldoende socialisatie: Cao's zijn zeer territoriaal. Zonder vroege socialisatie worden ze te beschermend of agressief.",
    "Blaffen proberen te stoppen: Hun unieke geblaf is diep geworteld. Accepteer dit als onderdeel van het ras.",
    "In stedelijke omgevingen houden: Dit ras heeft ruimte en een landelijke omgeving nodig. Stedelijke appartementen zijn ongeschikt.",
    "Harde trainingsmethoden: Cao's reageren slecht op dwang en kunnen koppig worden. Gebruik geduld en respect.",
    "Te weinig mentale stimulatie: Deze intelligente honden vervelen snel. Geef ze werk of training.",
    "Onvoldoende omheining: Cao's kunnen springen en graven. Een hoge, stevige omheining is essentieel."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€20-€40",
    grooming: "€15-€30",
    insurance: "€20-€40",
    total: "€115-€200",
    note: "Cao de Castro Laboreiro's zijn zeer gezond dankzij natuurlijke selectie. Gezondheidsproblemen zijn zeldzaam, maar heupdysplasie kan voorkomen. Hun korte vacht vereist minimaal onderhoud. Levenslange kosten: €14.000-€24.000."
  }
};

// ===== 159. Rafeiro do Alentejo =====
export const rafeiroDoAlentejo: BreedDetails = {
  breedName: "Rafeiro do Alentejo",
  breedNameNL: "Rafeiro do Alentejo",
  faqs: [
    {
      question: "Waar komt de Rafeiro do Alentejo vandaan?",
      answer: "De Rafeiro do Alentejo komt uit de Alentejo-regio in Zuid-Portugal – een uitgestrekt, droog vlakland bekend voor landbouw en veeteelt. Het ras werd gefokt om kuddes en boerderijen te beschermen."
    },
    {
      question: "Hoeveel weegt een Rafeiro do Alentejo?",
      answer: "Rafeiro's behoren tot de grootste Portugese rassen. Reuen wegen 40-60 kg en worden 66-74 cm hoog, teven 35-50 kg en 64-70 cm. Ze zijn imposant en krachtig gebouwd."
    },
    {
      question: "Zijn Rafeiro do Alentejo's nachtelijke honden?",
      answer: "Ja, Rafeiro's zijn van nature nachtactief – ze werden gefokt om 's nachts te patrouilleren en vee te beschermen terwijl herders sliepen. Ze zijn vaak actiever en alerter 's nachts."
    },
    {
      question: "Zijn Rafeiro do Alentejo's geschikt voor beginners?",
      answer: "Absoluut niet. Rafeiro's zijn zeer onafhankelijk, eigenzinnig en territoriaal. Ze vereisen een zeer ervaren eigenaar met kennis van beschermende herdershonden."
    },
    {
      question: "Hoeveel beweging heeft een Rafeiro do Alentejo nodig?",
      answer: "Rafeiro's hebben matige beweging nodig: 1-1,5 uur per dag. Ze zijn geen energieke atleten, maar hebben wel ruimte nodig om te patrouilleren. Ze zijn 's nachts actiever."
    },
    {
      question: "Blaffen Rafeiro do Alentejo's veel?",
      answer: "Ja, Rafeiro's blaffen, vooral 's nachts wanneer ze patrouilleren. Hun diep, luid geblaf is een waarschuwing tegen indringers. Dit maakt ze ongeschikt voor dichtbevolkte gebieden."
    },
    {
      question: "Hoe oud wordt een Rafeiro do Alentejo?",
      answer: "Een Rafeiro do Alentejo wordt gemiddeld 10 tot 14 jaar oud, wat goed is voor zo'n groot ras."
    },
    {
      question: "Wat kost een Rafeiro do Alentejo pup in België?",
      answer: "Een Rafeiro do Alentejo pup met stamboom kost tussen €800 en €1.500 waar beschikbaar. Het ras is zeer zeldzaam buiten Portugal. Import kan noodzakelijk zijn."
    }
  ],
  funFacts: [
    "De naam 'Rafeiro' betekent 'bastaard' of 'gemengde hond' in het Portugees – ironisch voor een oud, puur ras.",
    "Rafeiro's slapen overdag en patrouilleren 's nachts – een aangeboren circadiaan ritme dat moeilijk te veranderen is.",
    "Het ras stond op de rand van uitsterven in de jaren 1970 en werd gered door toegewijde Portugese fokkers.",
    "Rafeiro's hebben een karakteristieke 'beer-achtige' gang – langzaam maar krachtig.",
    "In Portugal worden ze nog steeds traditioneel ingezet op grote fazenda's om vee te beschermen.",
    "Ze hebben één van de diepste, luidste blafgeluiden van alle hondenrassen."
  ],
  history: {
    origin: "De Rafeiro do Alentejo is een oud Portugees ras uit de Alentejo-regio – een uitgestrekt, droog vlakland in Zuid-Portugal dat grenst aan Spanje. Het ras bestaat al eeuwenlang, mogelijk sinds de Romeinse tijd, toen Molosser-type honden werden gebracht door bezetters en handelaars. Deze honden werden gefokt door boeren en herders om kuddes schapen, geiten en vee te beschermen tegen wolven, dieven en andere bedreigingen in de open, vlakke landschappen.",
    development: "Rafeiro's werden geselecteerd op onafhankelijkheid, moed en nachtelijke waakzaamheid. Ze werkten 's nachts zonder menselijke supervisie, patrouillerend rond kuddes en boerderijen terwijl herders sliepen. Hun witte of lichte vacht maakte ze zichtbaar in het donker, wat hielp om ze te onderscheiden van roofdieren. Hun diepe, luid geblaf diende als afschrikmiddel en waarschuwingssysteem.\n\nIn de 20e eeuw daalde het aantal Rafeiro's drastisch door modernisering, afname van wolven en veranderingen in landbouwpraktijken. In de jaren 1970 stond het ras op de rand van uitsterven. De Portugese kynoloog António José Andrade do Rosário leidde herstel inspanningen en schreef de eerste moderne rasstandaard in 1953. De FCI erkende het ras officieel in 1954.\n\nTegenwoordig is de Rafeiro do Alentejo zeldzaam maar stabiel. In Portugal worden ze nog steeds gebruikt op traditionele fazenda's. Buiten Portugal zijn ze bijna onbekend. Ze behouden hun nachtelijke instincten, onafhankelijk karakter en beschermende aard. Ze vereisen zeer ervaren eigenaarschap en zijn niet geschikt voor stedelijke omgevingen."
  },
  similarBreeds: [
    "Estrela Berghond",
    "Pyrenese Berghond",
    "Anatolische Herder",
    "Kuvasz"
  ],
  commonMistakes: [
    "Nachtelijk geblaf proberen te stoppen: Rafeiro's zijn van nature nachtactief en zullen 's nachts blaffen. Dit is onveranderbaar.",
    "In stedelijke omgevingen houden: Dit ras heeft landelijke ruimte nodig en is ongeschikt voor appartementen of dichtbevolkte gebieden.",
    "Overdag veel activiteit verwachten: Rafeiro's slapen overdag en zijn 's nachts actief. Accepteer dit ritme.",
    "Onvoldoende socialisatie: Zonder vroege socialisatie worden ze te wantrouwend of agressief.",
    "Harde trainingsmethoden: Rafeiro's reageren slecht op dwang. Gebruik geduld en respect.",
    "Te weinig ruimte: Rafeiro's hebben grote, omheinde terreinen nodig om te patrouilleren."
  ],
  monthlyCosts: {
    food: "€70-€110",
    vet: "€25-€50",
    grooming: "€20-€40",
    insurance: "€25-€45",
    total: "€140-€245",
    note: "Rafeiro do Alentejo's zijn relatief gezond dankzij natuurlijke selectie. Gezondheidsproblemen omvatten heupdysplasie en elleboogdysplasie. Hun vacht vereist matig onderhoud. Levenslange kosten: €16.000-€28.000."
  }
};

// ===== 160. Boerboel =====
export const boerboel: BreedDetails = {
  breedName: "Boerboel",
  breedNameNL: "Boerboel",
  faqs: [
    {
      question: "Waar komt de Boerboel vandaan?",
      answer: "De Boerboel komt uit Zuid-Afrika en werd gefokt door Afrikaner-boeren ('boer' betekent boer in het Afrikaans) om boerderijen te beschermen tegen roofdieren zoals leeuwen, luipaarden en hyena's. Het is het enige echt Zuid-Afrikaanse hondenras."
    },
    {
      question: "Is een Boerboel verboden in België?",
      answer: "De Boerboel is niet algemeen verboden in België, maar sommige gemeenten kunnen lokale regelgeving hebben. In landen zoals Denemarken, Frankrijk en Zwitserland is het ras verboden of streng gereguleerd. Controleer altijd lokale wetgeving."
    },
    {
      question: "Hoeveel weegt een Boerboel?",
      answer: "Boerboels zijn zeer grote, krachtige honden. Reuen wegen 65-90 kg en worden 64-70 cm hoog, teven 60-75 kg en 59-65 cm. Ze zijn extreem gespierd en krachtig gebouwd."
    },
    {
      question: "Zijn Boerboels agressief?",
      answer: "Boerboels zijn niet per definitie agressief, maar ze zijn zeer beschermend en territoriaal. Ze zijn wantrouwend tegenover vreemden en kunnen agressief reageren als ze zich bedreigd voelen. Ze vereisen zeer ervaren eigenaren en intensieve socialisatie."
    },
    {
      question: "Zijn Boerboels geschikt voor beginners?",
      answer: "Absoluut niet. Boerboels zijn krachtig, dominant en hebben sterke beschermingsinstincten. Ze vereisen zeer ervaren eigenaren die assertief kunnen leiden en hun instincten kunnen begrijpen."
    },
    {
      question: "Hoeveel beweging heeft een Boerboel nodig?",
      answer: "Boerboels hebben matige tot hoge beweging nodig: 1,5-2 uur per dag. Ze zijn athletisch en hebben mentale stimulatie nodig. Vermijd overmatige inspanning bij jonge honden (tot 18-24 maanden) om gewrichtsschade te voorkomen."
    },
    {
      question: "Hoe oud wordt een Boerboel?",
      answer: "Een Boerboel wordt gemiddeld 10 tot 12 jaar oud, wat normaal is voor grote rassen."
    },
    {
      question: "Zijn Boerboels goed met kinderen?",
      answer: "Goed gesocialiseerde Boerboels kunnen uitstekend zijn met kinderen uit hun eigen gezin – ze zijn geduldig, speels en beschermend. Hun kracht en formaat vereisen wel constant toezicht bij jonge kinderen."
    }
  ],
  funFacts: [
    "De naam 'Boerboel' komt van 'boer' (boer in het Afrikaans) en 'boel' (grote hond) – letterlijk 'boerenhond'.",
    "Boerboels werden gefokt om leeuwen en andere grote roofdieren af te schrikken op Zuid-Afrikaanse boerderijen.",
    "Het ras heeft één van de krachtigste beten van alle hondenrassen, geschat op 450-800 PSI.",
    "Boerboels zijn extreem loyaal en vormen intense banden met één persoon of gezin, vaak tot het extreme.",
    "In Zuid-Afrika worden ze beschouwd als nationale trots en zijn ze zeer populair als wachthonden.",
    "Het ras werd bijna uitgeroeid tijdens de apartheid-periode maar werd hersteld in de jaren 1980 door toegewijde fokkers."
  ],
  history: {
    origin: "De Boerboel ontstond in Zuid-Afrika in de 17e eeuw toen Nederlandse, Duitse en Franse kolonisten (later bekend als Afrikaners of Boeren) zich vestigden aan de Kaap. Deze kolonisten brachten grote Molosser-type honden mee uit Europa, waaronder Bulldogs, Mastiffs en mogelijk Bullenbijters. Deze honden werden gekruist met lokale Afrikaanse honden om een robuuste, veelzijdige werkhond te creëren die kon overleven in de harde Afrikaanse omstandigheden.",
    development: "Boeren hadden een hond nodig die boerderijen kon beschermen tegen leeuwen, luipaarden, hyena's, bavianen en andere gevaarlijke wilde dieren, maar ook kon helpen met vee en vriendelijk was naar het gezin. De Boerboel werd geselecteerd op moed, kracht, loyaliteit en beschermingsinstinct. Ze werkten op afgelegen boerderijen waar zelfstandigheid en besluitvaardigheid essentieel waren.\n\nTijdens de 19e en vroege 20e eeuw was het ras wijdverspreid op Zuid-Afrikaanse boerderijen, maar formele fokkerij was beperkt. In de jaren 1980 , na de apartheid-periode, begonnen fokkers zoals Jannie Bouwer en Lucas van der Merwe het ras te standaardiseren en te promoten. De Zuid-Afrikaanse Boerboel Fokkers Vereniging (SABT) werd opgericht in 1983, en de eerste rasstandaard werd geschreven in 1990.\n\nDe FCI erkende de Boerboel voorlopig in 2006 en definitief in 2014. Het ras verspreidde zich internationaal maar bleef controversieel door zijn kracht en beschermingsinstinct. Aanvallen leidden tot verboden in sommige landen. Verantwoordelijke fokkers werken aan het behoud van een stabiel, betrouwbaar temperament. Boerboels blijven populair in Zuid-Afrika en wereldwijd als ultieme beschermers, maar vereisen zeer ervaren, verantwoord eigenaarschap."
  },
  similarBreeds: [
    "Bullmastiff",
    "Cane Corso",
    "Presa Canario",
    "Fila Brasileiro"
  ],
  commonMistakes: [
    "Onvoldoende socialisatie: Boerboels moeten vanaf puppyhood intensief gesocialiseerd worden. Zonder dit worden ze te territoriaal of agressief.",
    "Harde trainingsmethoden: Boerboels reageren slecht op agressieve training en kunnen defensief worden. Gebruik altijd positieve bekrachtiging.",
    "Onderschatten van hun kracht: Dit zijn extreem krachtige honden. Zonder goede training kunnen ze onhandelbaar en gevaarlijk worden.",
    "Jonge Boerboels te veel laten bewegen: Overmatige inspanning tijdens de groei veroorzaakt blijvende gewrichtsschade.",
    "Te lang alleen laten: Boerboels zijn extreem loyaal en kunnen scheidingsangst of destructief gedrag ontwikkelen.",
    "Geen professionele training: Eigenaren moeten professionele hulp zoeken van trainers met ervaring in krachtige, beschermende rassen."
  ],
  monthlyCosts: {
    food: "€90-€140",
    vet: "€30-€70",
    grooming: "€10-€20",
    insurance: "€40-€80",
    total: "€170-€310",
    note: "Boerboels hebben hogere verzekeringspremies als 'krachtig ras'. Gezondheidsproblemen omvatten heupdysplasie, elleboogdysplasie, oogproblemen (entropion, ectropion) en hartproblemen. Wettelijke eisen (muilkorf, vergunning in sommige regio's) kunnen extra kosten met zich meebrengen. Levenslange kosten: €20.000-€35.000."
  }
};

// Export all breeds as array voor eenvoudige import
export const breedDetailsBatch8 = [
  englishMastiff,
  bullmastiff,
  neapolitanMastiff,
  tibetanMastiff,
  greatPyrenees,
  leonberger,
  hovawart,
  tosaInu,
  filaBrasileiro,
  dogoArgentino,
  presaCanario,
  kangal,
  centralAsianShepherd,
  caucasianShepherd,
  landseer,
  saintBernard,
  estrelaMountainDog,
  castroLaboreirodog,
  rafeiroDoAlentejo,
  boerboel
];