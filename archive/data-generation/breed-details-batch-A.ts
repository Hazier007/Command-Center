// Breed Details Batch A - Top 5 Populaire Rassen
// hondenpups.be

interface BreedDetails {
  breedName: string;
  breedNameNL: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  funFacts: string[];
  history: {
    origin: string;
    development: string;
  };
  similarBreeds: string[];
  commonMistakes: string[];
  monthlyCosts: {
    food: string;
    vet: string;
    grooming: string;
    insurance: string;
    total: string;
    note: string;
  };
}

// ===== Border Collie =====
export const borderCollie: BreedDetails = {
  breedName: "Border Collie",
  breedNameNL: "Border Collie",
  faqs: [
    {
      question: "Is een Border Collie geschikt voor beginners?",
      answer: "Nee, een Border Collie is **niet** aangeraden voor beginners. Dit ras vereist veel ervaring, tijd en energie. Ze zijn extreem intelligent en energiek, en zonder voldoende mentale en fysieke stimulatie ontwikkelen ze gedragsproblemen zoals obsessief gedrag of destructiviteit."
    },
    {
      question: "Hoeveel beweging heeft een Border Collie nodig?",
      answer: "Een Border Collie heeft minimaal 2 uur intensieve beweging per dag nodig. Dit moet bestaan uit rennen, spelen, agility of herding-activiteiten. Daarnaast hebben ze mentale uitdaging nodig zoals puzzels, training of zoekwerk. Een wandeling om het blok is absoluut niet genoeg."
    },
    {
      question: "Kan een Border Collie in een appartement wonen?",
      answer: "Technisch gezien kan het, maar het is **niet ideaal**. Border Collies voelen zich het best met een grote tuin waar ze kunnen rennen en spelen. Als je toch in een appartement woont, moet je zeker zijn dat je meerdere keren per dag uitgebreide beweging en mentale stimulatie kan bieden."
    },
    {
      question: "Zijn Border Collies goed met kinderen?",
      answer: "Ja, Border Collies kunnen geweldig zijn met kinderen als ze goed gesocialiseerd zijn. Let wel op: hun hoedinstinct kan ervoor zorgen dat ze kinderen proberen te 'drijven' of achterna rennen. Leer kinderen en hond hoe ze respectvol met elkaar omgaan."
    },
    {
      question: "Welke gezondheidsproblemen komen vaak voor bij Border Collies?",
      answer: "Border Collies zijn gevoelig voor Collie Eye Anomaly (CEA), heupdysplasie, epilepsie, Trapped Neutrophil Syndrome (TNS) en Border Collie Collapse (BCC). Kies altijd een fokker die DNA-tests uitvoert op de ouders om deze erfelijke aandoeningen uit te sluiten."
    },
    {
      question: "Hoe oud wordt een Border Collie gemiddeld?",
      answer: "Een gezonde Border Collie wordt gemiddeld 12 tot 15 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles bij de dierenarts kunnen ze zelfs ouder worden."
    },
    {
      question: "Wat kost een Border Collie pup in België?",
      answer: "Een Border Collie pup met stamboom kost in België tussen €900 en €1.800, afhankelijk van de fokker, bloedlijn en gezondheidstesten. Pups van werklijnen zijn vaak goedkoper dan showlijnen, maar hebben vaak nóg meer energie."
    },
    {
      question: "Zijn Border Collies makkelijk te trainen?",
      answer: "Ja, Border Collies behoren tot de meest intelligente hondenrassen en zijn zeer goed trainbaar. Ze leren razendsnel nieuwe commando's, maar dit betekent ook dat ze slechte gewoonten net zo snel oppikken! Consistentie en positieve bekrachtiging zijn essentieel."
    }
  ],
  funFacts: [
    "Border Collies worden vaak beschouwd als het **intelligentste hondenras** ter wereld. Ze kunnen meer dan 1000 woorden leren en begrijpen.",
    "Een Border Collie genaamd 'Chaser' werd wereldberoemd omdat ze de namen van meer dan 1000 verschillende speeltjes kon onderscheiden.",
    "De 'Border Collie stare' (intense oogcontact) is een kenmerkend kijkgedrag dat ze gebruiken om schapen te controleren tijdens het hoeden.",
    "De eerste officiële sheepdog trial werd in 1873 gehouden in Wales en gewonnen door een Schotse Border Collie genaamd 'Tweed'.",
    "Border Collies kunnen obsessief fixeren op bewegende objecten zoals schaduwen, lichtreflecties of auto's als ze ondergestimuleerd zijn.",
    "Ze zijn zo energiek dat ze tot 80 km kunnen rennen op een dag tijdens herding-work."
  ],
  history: {
    origin: "De Border Collie ontstond aan de grens (border) tussen Schotland en Engeland als schaapherder. Het ras ontwikkelde zich in de Schotse hooglanden en de noordelijke graafschappen van Engeland, waar schapen herderen het landschap beheersten. De naam 'Border' verwijst naar deze grensregio.",
    development: "In de 19e eeuw begonnen fokkers te selecteren op werkprestaties in plaats van uiterlijk. De eerste officiële sheepdog trial vond plaats in 1873 in Wales, waar de superieure herdersvaardigheden van deze honden duidelijk werden. In 1906 werd de International Sheep Dog Society opgericht, die het ras verder standaardiseerde.\n\nDe Border Collie werd pas in 1995 officieel erkend door de Kennel Club, omdat fokkers zich voornamelijk richtten op werkprestaties. Zelfs vandaag zijn er twee hoofdlijnen: werklijnen (gefokt voor herding) en showlijnen (gefokt voor uiterlijk). De werklijnen zijn over het algemeen energieker en hebben een sterker hoedinstinct."
  },
  similarBreeds: [
    "Australian Shepherd",
    "Kelpie",
    "Australian Cattle Dog",
    "Shetland Sheepdog",
    "English Shepherd"
  ],
  commonMistakes: [
    "Te weinig beweging: Een Border Collie die niet genoeg beweegt wordt ongelukkig en ontwikkelt gedragsproblemen zoals blaffen, graven of destructief gedrag.",
    "Geen mentale uitdaging: Zonder puzzels, training of werk vervelen Border Collies zich en gaan ze zelf 'werk' zoeken (vaak ongewenst gedrag).",
    "Hoedinstinct negeren: Als je het hoedinstinct niet kanaliseer t via training of herding-activiteiten, kan je hond kinderen, auto's of andere dieren gaan 'drijven'.",
    "Te lange trainingen: Border Collies leren snel, maar vervelen zich ook snel. Houd trainingen kort (10-15 minuten) en gevarieerd.",
    "Onvoldoende socialisatie: Border Collies kunnen terughoudend zijn bij vreemden. Vroege socialisatie voorkomt angst of nervositeit.",
    "Obsessief gedrag aanmoedigen: Laat je hond niet fixeren op één speeltje of activiteit (zoals ballen apporteren) – wissel af om obsessie te voorkomen."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€15-€30",
    total: "€95-€170",
    note: "Border Collies zijn over het algemeen gezond, maar DNA-tests bij aanschaf kunnen erfelijke aandoeningen uitsluiten. Houd rekening met extra kosten voor training (agility, herding, gehoorzaamheid) en mentale speeltjes. Aanschafprijs: €900-€1.800."
  }
};

// ===== Beagle =====
export const beagle: BreedDetails = {
  breedName: "Beagle",
  breedNameNL: "Beagle",
  faqs: [
    {
      question: "Is een Beagle geschikt voor een appartement?",
      answer: "Ja, een Beagle kan in een appartement wonen, maar let op: ze kunnen **flink blaffen en janken** als ze zich vervelen of iets ruiken. Zorg voor voldoende beweging (1-1,5 uur per dag) en train ze om rustig te zijn als je weg bent."
    },
    {
      question: "Hoeveel beweging heeft een Beagle nodig?",
      answer: "Een Beagle heeft minimaal 1 tot 1,5 uur beweging per dag nodig. Ze houden van snuffeltochten, speuren en apporteren. Zonder voldoende beweging kunnen ze overgewicht krijgen – Beagles eten graag!"
    },
    {
      question: "Zijn Beagles goed met kinderen?",
      answer: "Ja, Beagles zijn uitstekende gezinshonden! Ze zijn vriendelijk, speels en geduldig met kinderen. Hun energieke karakter maakt ze ideaal voor actieve gezinnen. Leer kinderen wel om de hond met respect te behandelen."
    },
    {
      question: "Kunnen Beagles lang alleen zijn?",
      answer: "Nee, Beagles zijn roedeldieren en houden niet van lang alleen zijn. Ze kunnen scheidingsangst ontwikkelen en dan beginnen blaffen, janken of dingen kapot maken. Laat ze maximaal 4-5 uur alleen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Beagles?",
      answer: "Beagles zijn gevoelig voor obesitas, heupdysplasie, oorinfecties (door hun hangende oren), epilepsie en hypothyreoïdie. Regelmatige controles bij de dierenarts en een gezond dieet zijn essentieel."
    },
    {
      question: "Hoe oud wordt een Beagle gemiddeld?",
      answer: "Een gezonde Beagle wordt gemiddeld 12 tot 15 jaar oud. Met goede zorg en een gezond gewicht kunnen ze zelfs ouder worden."
    },
    {
      question: "Wat kost een Beagle pup in België?",
      answer: "Een Beagle pup met stamboom kost in België tussen €800 en €2.000, afhankelijk van de fokker en afstamming. Pups zonder stamboom zijn goedkoper (€600-€800), maar controleer altijd de gezondheid van de ouders."
    },
    {
      question: "Zijn Beagles makkelijk te trainen?",
      answer: "Beagles zijn intelligent, maar ook **eigenwijs**. Ze zijn gefokt om zelfstandig te werken tijdens de jacht, dus ze luisteren niet altijd direct. Training vereist geduld, consistentie en veel lekkere beloningen!"
    }
  ],
  funFacts: [
    "Het woord 'Beagle' werd voor het eerst gebruikt in 1475, en de eerste vermelding in officiële documenten was in de boekhouding van Koning Hendrik VIII (1509-1547).",
    "Koningin Elizabeth I had 'Pocket Beagles' – extreem kleine Beagles van slechts 20 cm hoog die in zadeltassen pasten tijdens jachtpartijen.",
    "Beagles hebben meer dan 220 miljoen geurreceptoren (mensen hebben er 5 miljoen), waardoor ze uitstekende speurhonden zijn.",
    "De tekenfilmhond 'Snoopy' uit Peanuts is de beroemdste Beagle ter wereld!",
    "Beagles worden vaak ingezet op luchthavens om voedsel en contrabande op te sporen – hun vriendelijke uitstraling maakt reizigers minder nerveus dan bij grotere politiehonden.",
    "Een Beagle kan tot wel 3 verschillende types geblaf produceren: een standaard blaf, een jankend gehuil ('bay') en een half-blaf/half-jank geluid."
  ],
  history: {
    origin: "De Beagle is een oud ras met wortels in de Griekse Oudheid. Rond 400 v.Chr. beschreef de schrijver Xenophon kleine jachthonden die hazen volgden op geur. Het moderne ras ontwikkelde zich in Engeland, waar ze vanaf de 16e eeuw werden ingezet voor de jacht op klein wild zoals hazen en konijnen.",
    development: "In de 16e eeuw werden Beagles populair bij de Engelse adel. Koningin Elizabeth I riep de Beagle uit tot 'koninklijke gezelschapshond'. Het ras ontstond waarschijnlijk uit kruisingen van renhonden die de Noormannen naar Engeland brachten en Zuid-Franse jachthonden.\n\nIn de 19e eeuw werd het ras verder gestandaardiseerd. In 1887 werd de National Beagle Club opgericht in de Verenigde Staten, waar de Beagle enorm populair werd. Tegenwoordig is de Beagle één van de meest geliefde gezinshonden ter wereld, hoewel ze nog steeds worden ingezet als speurhond op luchthavens en in douane."
  },
  similarBreeds: [
    "Basset Hound",
    "Foxhound",
    "Harrier",
    "English Foxhound",
    "Petit Basset Griffon Vendéen"
  ],
  commonMistakes: [
    "Overvoeren: Beagles hebben een enorm eetlust en zullen alles opeten wat ze vinden. Obesitas is een veelvoorkomend probleem – volg voedingsrichtlijnen strikt.",
    "Loslopen zonder training: Door hun sterke jachtinstinct rennen Beagles achter geuren aan en komen soms niet terug. Train een goede 'kom hier' commando voordat je ze loslaat.",
    "Oren verwaarlozen: Hangende oren zijn gevoelig voor infecties. Controleer en reinig de oren wekelijks.",
    "Te weinig mentale uitdaging: Beagles zijn slim en hebben naast fysieke beweging ook geurwerk en zoekspelletjes nodig.",
    "Geen consequentie in training: Beagles zijn koppig. Als je niet consistent bent, leren ze dat ze regels kunnen negeren.",
    "Alleen laten zonder training: Beagles kunnen scheidingsangst ontwikkelen. Wen ze geleidelijk aan om alleen te zijn."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€20-€40",
    grooming: "€10-€15",
    insurance: "€15-€30",
    total: "€85-€155",
    note: "Beagles zijn relatief goedkoop in onderhoud, maar let op overgewicht (hogere dierenarts kosten). Eerste jaar kosten (inclusief puppy cursus en basisbenodigdheden): €1.500-€2.500. Aanschafprijs: €800-€2.000."
  }
};

// ===== Mechelse Herder (Malinois) =====
export const mechelseHerder: BreedDetails = {
  breedName: "Belgian Malinois",
  breedNameNL: "Mechelse Herder",
  faqs: [
    {
      question: "Is een Mechelse Herder geschikt voor beginners?",
      answer: "**Absoluut niet.** Een Mechelse Herder is alleen geschikt voor zeer ervaren hondenbezitters. Dit ras vereist consequente training, sterke leiderschap en enorm veel beweging en mentale uitdaging. Zonder ervaring loopt het vrijwel altijd mis."
    },
    {
      question: "Hoeveel beweging heeft een Mechelse Herder nodig?",
      answer: "Minimaal 2-3 uur intensieve beweging per dag. Dit moet bestaan uit rennen, sporten (agility, IPO, obedience) en werkoefeningen. Een wandeling is niet genoeg – deze honden zijn gefokt om de hele dag te werken."
    },
    {
      question: "Kan een Mechelse Herder in een appartement wonen?",
      answer: "Nee, dit is **niet** aan te raden. Mechelse Herders hebben ruimte nodig om te bewegen en zijn erg actief. Een appartement is te klein, tenzij je meerdere keren per dag uitgebreid sport met je hond."
    },
    {
      question: "Zijn Mechelse Herders goed met kinderen?",
      answer: "Ja, mits goed gesocialiseerd. Ze zijn loyaal en beschermend tegenover hun gezin. Let wel op: hun hoge energie en beschermingsinstinct vereisen toezicht bij jonge kinderen. Ze zijn geen 'babysitter'-hond."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Mechelse Herders?",
      answer: "Mechelse Herders zijn relatief gezond, maar gevoelig voor heupdysplasie, elleboogdysplasie, progressieve retina-atrofie (PRA) en epilepsie. Kies een fokker die ouderdieren laat testen op deze aandoeningen."
    },
    {
      question: "Hoe oud wordt een Mechelse Herder?",
      answer: "Een gezonde Mechelse Herder wordt gemiddeld 12 tot 14 jaar oud. Met goede zorg en voldoende beweging kunnen ze ouder worden."
    },
    {
      question: "Wat kost een Mechelse Herder pup in België?",
      answer: "Een pup van een erkende fokker kost tussen €1.000 en €2.500, afhankelijk van bloedlijn, gezondheidstesten en werklijnen. Pups van werklijnen (politie/leger) zijn vaak duurder."
    },
    {
      question: "Zijn Mechelse Herders agressief?",
      answer: "Nee, niet van nature. Ze zijn **beschermend** en alert, maar niet agressief als ze goed gesocialiseerd zijn. Agressie ontstaat meestal door slechte training, gebrek aan socialisatie of onervaren eigenaars."
    }
  ],
  funFacts: [
    "Mechelse Herders worden wereldwijd ingezet bij politie, leger en speciale eenheden – bijvoorbeeld bij de Navy SEALs in de VS.",
    "Een Mechelse Herder genaamd 'Cairo' was onderdeel van het SEAL Team Six tijdens de operatie die leidde tot de dood van Osama bin Laden in 2011.",
    "Ze kunnen sprongen maken van meer dan 2 meter hoog en worden vaak ingezet voor parkour-achtige obstakelparcoursen.",
    "Mechelse Herders hebben een 'bite force' van ongeveer 195 PSI (pounds per square inch), krachtiger dan veel andere rassen.",
    "Het ras ontstond specifiek in Mechelen, België, rond 1900, als kortharige variant van de Belgische Herdershond.",
    "Ze zijn zo energiek dat ze letterlijk kunnen 'klimmen' tegen verticale muren als ze voldoende vaart nemen."
  ],
  history: {
    origin: "De Mechelse Herder ontstond eind 19e eeuw in België, rond de stad Mechelen. Het ras is één van de vier varianten van de Belgische Herdershond (samen met Tervueren, Groenendael en Laekenois). Oorspronkelijk werden deze honden ingezet om schapen te hoeden en boerderijen te bewaken.",
    development: "In 1891 richtte professor Adolphe Reul de Club du Chien de Berger Belge op om herdershonden te standaardiseren. De Mechelse Club werd in 1898 opgericht en richtte zich specifiek op de kortharige variant uit de regio Mechelen. Het ras werd in 1901 officieel erkend in het Belgische stamboek.\n\nTijdens de Eerste en Tweede Wereldoorlog werden Mechelse Herders ingezet als boodschappenhonden en bewakers. Na de oorlog groeide hun populariteit als politiehond door hun intelligentie, trainbaarheid en onvermoeibare werklust. Tegenwoordig is de Mechelse Herder één van de meest gebruikte werkh onden ter wereld."
  },
  similarBreeds: [
    "Duitse Herder",
    "Hollandse Herder",
    "Tervueren (Belgische Herder)",
    "Dutch Shepherd",
    "Australian Cattle Dog"
  ],
  commonMistakes: [
    "Te weinig beweging en werk: Een Mechelse Herder zonder voldoende uitdaging wordt destructief, hyperactief of ontwikkelt dwanggedrag.",
    "Geen consequente training: Dit ras test grenzen en heeft een sterke leider nodig. Inconsistentie leidt tot ongewenst gedrag.",
    "Te laat starten met socialisatie: Begin zo vroeg mogelijk met socialisatie om angst of overprotectie te voorkomen.",
    "Denken dat 'vermoeid = gehoorzaam': Zelfs een vermoeide Malinois blijft alert en heeft mentale rust nodig via structured training.",
    "Overmatige bescherming aanmoedigen: Train je hond om vreemden te accepteren – overprotectie kan leiden tot agressie.",
    "Geen duidelijk werk geven: Mechelse Herders hebben een 'baan' nodig – zonder werk gaan ze zelf werk zoeken (vaak ongewenst)."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€25-€50",
    grooming: "€10-€20",
    insurance: "€20-€40",
    total: "€115-€210",
    note: "Mechelse Herders zijn relatief gezond, maar training (IPO, obedience, agility) kost extra (€500-€1.500/jaar). Houd ook rekening met kosten voor werk-speelgoed en mentale uitdaging. Aanschafprijs: €1.000-€2.500."
  }
};

// ===== Cavalier King Charles Spaniel =====
export const cavalierKingCharlesSpaniel: BreedDetails = {
  breedName: "Cavalier King Charles Spaniel",
  breedNameNL: "Cavalier King Charles Spaniel",
  faqs: [
    {
      question: "Is een Cavalier King Charles Spaniel geschikt voor beginners?",
      answer: "Ja, Cavaliers zijn uitstekend voor beginners! Ze zijn vriendelijk, geduldig en gemakkelijk in de omgang. Ze willen graag behagen en zijn over het algemeen niet koppig."
    },
    {
      question: "Hoeveel beweging heeft een Cavalier King Charles Spaniel nodig?",
      answer: "Een Cavalier heeft matige beweging nodig: 30-60 minuten per dag is voldoende. Ze passen zich aan aan jouw levensstijl – ze kunnen zowel actief als rustig zijn, afhankelijk van wat jij doet."
    },
    {
      question: "Kan een Cavalier King Charles Spaniel lang alleen zijn?",
      answer: "Nee, Cavaliers zijn **extreem sociaal** en houden niet van alleen zijn. Ze ontwikkelen gemakkelijk scheidingsangst en kunnen janken, blaffen of destructief gedrag vertonen als ze te lang alleen zijn. Maximaal 4-5 uur."
    },
    {
      question: "Zijn Cavalier King Charles Spaniels goed met kinderen?",
      answer: "Ja, Cavaliers zijn geweldig met kinderen! Ze zijn zacht, geduldig en speels. Hun kleinere formaat maakt ze ook geschikt voor jonge kinderen, maar leer kinderen wel voorzichtig te zijn."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Cavaliers?",
      answer: "Cavaliers zijn helaas gevoelig voor **mitral valve disease (MVD)** – een hartaandoening die veel voorkomt. Daarnaast: syringomyelia (neurologische aandoening), oogproblemen, heupdysplasie en oorinfecties. Regelmatige controles zijn essentieel."
    },
    {
      question: "Hoe oud wordt een Cavalier King Charles Spaniel?",
      answer: "Een Cavalier wordt gemiddeld 9 tot 14 jaar oud. De levensverwachting wordt vaak beperkt door hartproblemen, dus regelmatige hartcontroles zijn belangrijk."
    },
    {
      question: "Wat kost een Cavalier King Charles Spaniel pup?",
      answer: "Een Cavalier pup met stamboom kost tussen €1.500 en €3.000, afhankelijk van de fokker en afstamming. Let op: kies een fokker die hartscreening doet op ouderdieren!"
    },
    {
      question: "Zijn Cavalier King Charles Spaniels goede waakhonden?",
      answer: "Nee, absoluut niet! Cavaliers zijn te vriendelijk en verwelkomen vreemden meestal enthousiast. Ze zijn ideaal als gezelschapshond, niet als bewaker."
    }
  ],
  funFacts: [
    "Koning Charles II van Engeland was zo gek op deze honden dat er een wet werd ingevoerd die toestond dat Cavaliers overal mee naartoe mochten – zelfs in het parlement!",
    "In historische schilderijen uit de 16e-18e eeuw zie je vaak adellijke dames met kleine spaniels op schoot – de voorouders van de moderne Cavalier.",
    "Cavaliers werden in de Victoriaanse tijd gekruist met Pugs en Japanse Chins, wat leidde tot een platter gezicht. In de jaren 1920 wilde fokker Roswell Eldridge terug naar het 'originele' type met een langere neus.",
    "De naam 'Cavalier' verwijst naar de Cavaliers (koningsgetrouwen) tijdens de Engelse Burgeroorlog in de 17e eeuw.",
    "Cavaliers hebben vier erkende kleurvarianten: Blenheim (kastanjebruin-wit), Tricolor (zwart-wit-tan), Black & Tan, en Ruby (helemaal kastanjebruin).",
    "Ze worden vaak 'velcro dogs' genoemd omdat ze hun baas overal volgen – van kamer naar kamer."
  ],
  history: {
    origin: "De Cavalier King Charles Spaniel stamt af van kleine toy spaniels die al in de 16e eeuw populair waren bij de Engelse adel. Deze honden waren geliefde gezelschapshonden van dames aan het hof van de Tudors. Koning Charles I en vooral Koning Charles II waren beroemd om hun liefde voor deze kleine spaniels.",
    development: "In de Victoriaanse tijd (19e eeuw) werden toy spaniels gekruist met Pugs en Japanse Chins, wat leidde tot een platter gezicht en kleinere neus. Dit werd de 'King Charles Spaniel' (Engels: zonder 'Cavalier').\n\nIn de jaren 1920 wilde de Amerikaanse fokker Roswell Eldridge het oorspronkelijke type terughalen zoals te zien op oude schilderijen. Hij bood prijzen aan op Crufts hondenshow voor toy spaniels met langere neuzen. Dit leidde tot de 'herontdekking' van de Cavalier King Charles Spaniel. In 1928 werd de rasclu b opgericht en in 1945 kreeg het ras officiële erkenning van de Kennel Club als apart ras."
  },
  similarBreeds: [
    "King Charles Spaniel (Engels)",
    "Cocker Spaniel (kleiner)",
    "Tibetaanse Spaniel",
    "Papillon",
    "Japanese Chin"
  ],
  commonMistakes: [
    "Te lang alleen laten: Cavaliers zijn extreem sociaal en ontwikkelen scheidingsangst. Plan altijd gezelschap in.",
    "Hartproblemen negeren: Cavaliers zijn gevoelig voor MVD. Laat je hond regelmatig (jaarlijks) screenen door een dierenarts.",
    "Overvoeren: Cavaliers eten graag en kunnen overgewicht krijgen, wat hartproblemen verergert. Volg voedingsrichtlijnen strikt.",
    "Oren verwaarlozen: Hun lange, hangende oren zijn gevoelig voor infecties. Controleer en reinig ze wekelijks.",
    "Geen socialisatie: Hoewel Cavaliers vriendelijk zijn, is vroege socialisatie belangrijk om nervositeit te voorkomen.",
    "Verwachten dat ze een waakhond zijn: Cavaliers zijn veel te vriendelijk – ze begroeten inbrekers waarschijnlijk met een kwispelende staart!"
  ],
  monthlyCosts: {
    food: "€30-€50",
    vet: "€30-€70",
    grooming: "€20-€40",
    insurance: "€20-€40",
    total: "€100-€200",
    note: "Cavaliers hebben hogere dierenarts kosten door hartproblemen (jaarlijkse controles €50-€150, echocardiogram €50-€800). Lifetime kosten worden geschat op €12.000-€15.000. Aanschafprijs: €1.500-€3.000."
  }
};

// ===== Shiba Inu =====
export const shibaInu: BreedDetails = {
  breedName: "Shiba Inu",
  breedNameNL: "Shiba Inu",
  faqs: [
    {
      question: "Is een Shiba Inu geschikt voor beginners?",
      answer: "Nee, Shiba Inu's zijn **niet** aan te raden voor beginners. Ze zijn eigenwijs, onafhankelijk en kunnen koppig zijn in training. Je hebt geduld, consistentie en ervaring nodig om met dit ras om te gaan."
    },
    {
      question: "Hoeveel beweging heeft een Shiba Inu nodig?",
      answer: "Een Shiba Inu heeft 1-1,5 uur beweging per dag nodig. Ze zijn actief en energiek, en houden van wandelen, rennen en spelen. Daarnaast hebben ze mentale uitdaging nodig om zich niet te vervelen."
    },
    {
      question: "Kan een Shiba Inu in een appartement wonen?",
      answer: "Ja, Shiba's kunnen prima in een appartement wonen als ze voldoende beweging krijgen. Ze zijn relatief rustig binnenshuis en blaffen niet veel (maar ze maken wel andere geluiden zoals de beroemde 'Shiba scream')."
    },
    {
      question: "Zijn Shiba Inu's goed met kinderen?",
      answer: "Shiba's kunnen goed zijn met kinderen mits vroeg gesocialiseerd, maar ze zijn niet zo geduldig als sommige andere rassen. Ze houden niet van ruw spel en kunnen snauwen als ze zich ongemakkelijk voelen. Toezicht is belangrijk."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Shiba Inu's?",
      answer: "Shiba Inu's zijn over het algemeen gezond, maar kunnen last hebben van heupdysplasie, patellaluxatie (knieschijf), allergieën en oogproblemen zoals glaucoom. Kies een fokker die gezondheidstes ten uitvoert."
    },
    {
      question: "Hoe oud wordt een Shiba Inu?",
      answer: "Een gezonde Shiba Inu wordt gemiddeld 12 tot 15 jaar oud. Met goede zorg kunnen ze zelfs ouder worden – dit is een relatief gezond ras."
    },
    {
      question: "Wat kost een Shiba Inu pup?",
      answer: "Een Shiba Inu pup met stamboom kost tussen €1.350 en €2.000, afhankelijk van de fokker en bloedlijn. Shiba's zijn duurder dan gemiddelde rassen door hun populariteit."
    },
    {
      question: "Zijn Shiba Inu's makkelijk te trainen?",
      answer: "Nee, Shiba's zijn **eigenwijs** en gefokt om zelfstandig te werken. Ze zijn intelligent, maar trainen hen vereist veel geduld en consistentie. Ze doen niet altijd wat je vraagt – alleen als ze er zin in hebben!"
    }
  ],
  funFacts: [
    "De Shiba Inu is het **oudste en kleinste** van de zes oorspronkelijke Japanse hondenrassen. Hun geschiedenis gaat terug tot 14.000 v.Chr.!",
    "In 1936 werd de Shiba Inu uitgeroepen tot nationaal monument van Japan.",
    "De beroemde 'Doge' meme (met teksten zoals 'much wow, very doge') is gebaseerd op een Shiba Inu genaamd Kabosu.",
    "Shiba's maken een uniek geluid genaamd de 'Shiba scream' – een hoge, doordringende gil die ze uiten als ze opgewonden, boos of gestrest zijn.",
    "De naam 'Shiba' betekent 'klein' of 'struikgewas' in het Japans, verwijzend naar hun kleine formaat of de struiken waarin ze jaagden.",
    "Shiba Inu's zijn extreem reinlijk – veel eigenaren vergelijken hun gedrag met katten. Ze poetsen zichzelf en vermijden vieze plekken."
  ],
  history: {
    origin: "De Shiba Inu vindt zijn oorsprong in Japan, met wortels in de Jomon-periode (14.000-300 v.Chr.), waar kleine tot middelgrote honden werden gedomesticeerd door jager-verzamelaars. Deze honden werden ingezet om wild zoals vogels en klein game te jagen in bergachtig, struikgewas-rijk terrein.",
    development: "Tijdens de Edo-periode (1603-1868) ontwikkelden zich drie regionale varianten van de Shiba: Shinshu Shiba, Mino Shiba en Sanin Shiba, genoemd naar de regio's waar ze vandaan kwamen. Begin 20e eeuw werd het ras bijna uitgeroeid door westerse hondenimport (waarmee werd gekruist) en door de Tweede Wereldoorlog.\n\nIn 1928 begonnen Japanse liefhebbers fokprogramma's om het ras te redden. In 1936 werd de Shiba Inu officieel erkend als nationaal monument van Japan. Het moderne ras is een combinatie van de drie oorspronkelijke varianten. In de jaren 1950 werd de Shiba geïntroduceerd in de Verenigde Staten, en sindsdien is het ras wereldwijd populair geworden."
  },
  similarBreeds: [
    "Akita Inu",
    "Shikoku",
    "Hokkaido",
    "Kai Ken",
    "Finnish Spitz"
  ],
  commonMistakes: [
    "Onvoldoende socialisatie: Shiba's zijn van nature gereserveerd. Begin vroeg met socialisatie om angst of agressie te voorkomen.",
    "Geen consequente training: Shiba's zijn eigenwijs en testen grenzen. Inconsistentie leidt tot ongewenst gedrag.",
    "Loslopen zonder betrouwbare terugroep: Hun jachtinstinct is sterk – veel Shiba's rennen weg als ze iets ruiken of zien. Train eerst goed voordat je ze loslaat.",
    "Verwachten dat ze gehoorzaam zijn zoals een Labrador: Shiba's zijn onafhankelijk en doen niet altijd wat je vraagt. Dit is deel van hun karakter.",
    "Tandverzorging verwaarlozen: Shiba's zijn gevoelig voor tandproblemen. Poets regelmatig hun tanden.",
    "Te veel tussendoortjes: Shiba's kunnen overgewicht krijgen. Volg voedingsrichtlijnen en beperk snacks."
  ],
  monthlyCosts: {
    food: "€35-€60",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€15-€30",
    total: "€80-€150",
    note: "Shiba Inu's zijn relatief gezond en goedkoop in onderhoud. Houd wel rekening met mogelijke allergieën (speciale voeding kan duurder zijn). Lifetime kosten over 15 jaar: ongeveer €5.000 exclusief aanschaf. Aanschafprijs: €1.350-€2.000."
  }
};

// Export all breeds
export const breedDetailsBatchA = [
  borderCollie,
  beagle,
  mechelseHerder,
  cavalierKingCharlesSpaniel,
  shibaInu
];
