// Batch 6: Breed Details voor hondenpups.be
// Focus: Herdershonden & Werkhonden
// 20 rassen: Hollandse Herder tot Catalaanse Herdershond

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

// ===== 101. Hollandse Herder =====
export const hollandseHerder: BreedDetails = {
  breedName: "Dutch Shepherd",
  breedNameNL: "Hollandse Herder",
  faqs: [
    {
      question: "Is een Hollandse Herder geschikt voor beginners?",
      answer: "Een Hollandse Herder is niet ideaal voor beginners. Ze zijn zeer intelligent, energiek en hebben een ervaren baas nodig die consequent kan leiden. Zonder juiste begeleiding kunnen ze dominant of destructief gedrag ontwikkelen."
    },
    {
      question: "Hoeveel beweging heeft een Hollandse Herder nodig?",
      answer: "Een Hollandse Herder heeft minimaal 2 uur intensieve beweging per dag nodig, plus mentale stimulatie. Ze zijn geboren werkers en gedijen bij agility, speurwerk, herding of hondensporten. Zonder uitdaging worden ze ongelukkig."
    },
    {
      question: "Kan een Hollandse Herder in een appartement wonen?",
      answer: "Technisch kan het, maar het is niet ideaal. Hollandse Herders zijn actieve werkhonden die ruimte nodig hebben. Een huis met grote tuin is beter. Als je in een appartement woont, zorg dan voor minstens 3 uur buitenactiviteiten per dag."
    },
    {
      question: "Zijn Hollandse Herders goed met kinderen?",
      answer: "Ja, met goede socialisatie zijn Hollandse Herders uitstekend met kinderen. Ze zijn loyaal en beschermend. Wel kunnen ze proberen kinderen te 'hoeden' door te duwen of te bijten in hakken. Train dit af vanaf puppyleeftijd."
    },
    {
      question: "Wat is het verschil tussen een Hollandse Herder en een Malinois?",
      answer: "Hollandse Herders hebben een gevlekte brindle vacht (korthaar, langhaar of ruwharig), terwijl Malinois altijd kort gevlekt bruin-zwart haar hebben. Hollandse Herders zijn iets zelfstandiger en veelzijdiger, Malinois zijn extremer in hun werkdrift."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Hollandse Herders?",
      answer: "Hollandse Herders zijn over het algemeen gezond. Ze kunnen gevoelig zijn voor heupdysplasie, elleboogdysplasie en goniodysplasie (oogaandoening). Kies een fokker die ouderdieren screent. Levensverwachting: 12-15 jaar."
    },
    {
      question: "Zijn er verschillende types Hollandse Herder?",
      answer: "Ja, er zijn drie vachttypes: korthaar (meest voorkomend), langhaar (zeldzaam) en ruwharig (zeer zeldzaam). Alle types hebben dezelfde karaktereigenschappen, alleen de verzorging verschilt."
    },
    {
      question: "Wat kost een Hollandse Herder pup in België?",
      answer: "Een Hollandse Herder pup met stamboom kost tussen €800 en €1.500, afhankelijk van de fokker en bloedlijnen (vooral werklijnen zijn duurder). Ruwharige en langharige exemplaren zijn zeldzamer en kunnen duurder zijn."
    }
  ],
  funFacts: [
    "De Hollandse Herder is één van de weinige rassen met een natuurlijke brindle (gestreepte) vacht – elke hond heeft een uniek patroon.",
    "Ze worden veel ingezet door de Nederlandse politie, douane en militaire eenheden vanwege hun veelzijdigheid en betrouwbaarheid.",
    "Het ras stond in de jaren '70 op het punt van uitsterven, maar is gered door een kleine groep toegewijde fokkers.",
    "Hollandse Herders kunnen zowel linkshandig als rechtshandig zijn – net als mensen hebben ze een voorkeursvoet.",
    "Ze hebben een 'glimlach reflex' waarbij ze hun tanden laten zien bij blijdschap – dit is geen agressie maar een karaktertrek van het ras.",
    "Een Hollandse Herder kan tot 30 km/u hardlopen en urenlang dit tempo volhouden bij kuddewerk."
  ],
  history: {
    origin: "De Hollandse Herder ontstond in het begin van de 19e eeuw in Nederland als een veelzijdige boerenhond. Deze honden werden ingezet voor het hoeden van schapen, het bewaken van boerderijen, het trekken van karren en zelfs het drijven van vee naar de markt. Ze waren onmisbaar voor Nederlandse boeren en werden geselecteerd op functionaliteit en werkdrift, niet op uiterlijk.",
    development: "Tot 1898 werden Hollandse Herders, Duitse Herders en Belgische Herders als één ras beschouwd. Tijdens het eerste officiële rashondencongres in Nederland werden ze gescheiden op basis van kleur en vachttype. De Hollandse Herder kreeg als kenmerk de brindle vacht.\n\nDe industrialisatie van de landbouw in de 20e eeuw reduceerde de behoefte aan herdershonden dramatisch, en het ras raakte bijna uitgestorven. In de jaren '60 en '70 pakten fokkers het ras op en behielden de focus op werkdrift. Tegenwoordig wordt de Hollandse Herder wereldwijd ingezet als politie-, zoek- en reddingshond, en wint hij steeds meer populariteit als veelzijdige sporthond."
  },
  similarBreeds: [
    "Belgische Herder (Malinois)",
    "Duitse Herder",
    "Belgische Herder (Tervueren)",
    "Australian Cattle Dog"
  ],
  commonMistakes: [
    "Onderschatten van de werkdrift: Hollandse Herders zijn geen gezinshonden die tevreden zijn met wandelingen. Ze hebben werk nodig.",
    "Te weinig mentale uitdaging: Zonder puzzels, training of taken worden ze destructief. Een verveelde Hollandse Herder vernielt je huis.",
    "Geen consequente leiding: Dit ras test grenzen. Zonder duidelijke regels nemen ze de leiding over.",
    "Te vroeg stoppen met socialisatie: Hollandse Herders kunnen wantrouwig zijn tegenover vreemden. Blijf socialiseren, ook na de puppyfase.",
    "Geen uitlaatklep voor energie: Zonder voldoende beweging ontwikkelen ze gedragsproblemen zoals blaffen, graven of achternazitten van voertuigen.",
    "Verwachten dat ze kalm zijn als volwassene: Hollandse Herders blijven tot 3-4 jaar energiek en speels. Pas daarna worden ze rustiger."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€20-€40",
    grooming: "€10-€30",
    insurance: "€15-€30",
    total: "€95-€180",
    note: "Hollandse Herders zijn over het algemeen gezond, maar houd rekening met kosten voor hondensporten (agility €20-€40/les), speciaal voer voor werkdrift, en hogere premies voor actieve honden. Eenmalig: aanschaf €800-€1.500, cursussen €150-€300."
  }
};

// ===== 102. Belgische Herder (Tervueren) =====
export const belgischeHerderTervueren: BreedDetails = {
  breedName: "Belgian Shepherd Tervueren",
  breedNameNL: "Belgische Herder (Tervueren)",
  faqs: [
    {
      question: "Wat is het verschil tussen een Tervueren en een Malinois?",
      answer: "Het enige verschil is de vacht: Tervuerens hebben lang, gevlekt bruin-zwart haar, terwijl Malinois kort haar hebben. Karaktereigenschappen en werkdrift zijn vrijwel identiek. Tervuerens vereisen meer vachtverzorging."
    },
    {
      question: "Is een Tervueren geschikt voor beginners?",
      answer: "Nee, Tervuerens zijn niet geschikt voor beginners. Ze zijn extreem intelligent, energiek en gevoelig. Ze vereisen een ervaren baas die consequent kan leiden en voldoende mentale en fysieke uitdaging kan bieden."
    },
    {
      question: "Hoeveel beweging heeft een Tervueren nodig?",
      answer: "Een Tervueren heeft minimaal 2-3 uur beweging per dag nodig, inclusief mentale stimulatie. Ze excelleren in agility, herding, tracking en gehoorzaamheidswerk. Zonder uitdaging ontwikkelen ze gedragsproblemen."
    },
    {
      question: "Verhaart een Tervueren veel?",
      answer: "Ja, Tervuerens verharen intensief door hun lange, dubbele vacht. Vooral in het voorjaar en najaar verliezen ze flink wat haar. Borstel minimaal 3-4x per week, dagelijks tijdens de verhaarperiode."
    },
    {
      question: "Zijn Tervuerens goed met kinderen?",
      answer: "Met goede socialisatie zijn Tervuerens uitstekend met kinderen. Ze zijn loyaal en beschermend, maar kunnen proberen kinderen te 'hoeden'. Leer kinderen respectvol met de hond omgaan en train het hoedgedrag af."
    },
    {
      question: "Zijn Tervuerens agressief?",
      answer: "Nee, maar ze zijn wel beschermend en kunnen wantrouwig zijn tegenover vreemden. Zonder socialisatie kunnen ze angstig of territoriaal worden. Vroege en voortdurende socialisatie is essentieel."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Tervuerens?",
      answer: "Tervuerens kunnen gevoelig zijn voor epilepsie, heupdysplasie, elleboogdysplasie, oogproblemen en schildklierproblemen. Kies een fokker die ouderdieren screent. Levensverwachting: 12-14 jaar."
    },
    {
      question: "Wat kost een Tervueren pup?",
      answer: "Een Tervueren pup met stamboom kost tussen €1.000 en €1.800, afhankelijk van de fokker en bloedlijnen (show- vs werklijnen). Controleer altijd gezondheidsscreenings van de ouders."
    }
  ],
  funFacts: [
    "Tervuerens zijn vernoemd naar het Belgische dorp Tervuren, waar fokker M.F. Corbeel het langharige type verfijnde in de late 19e eeuw.",
    "Ze werden ingezet als boodschappenhonden tijdens de Eerste Wereldoorlog, waarbij ze berichten tussen loopgraven overbrachten.",
    "Tervuerens kunnen tot 120 verschillende commando's leren en onthouden – behorend tot de top 10 meest intelligente rassen.",
    "Hun vacht is waterafstotend door natuurlijke oliën, waardoor ze perfect geschikt zijn voor werk in alle weersomstandigheden.",
    "De eerste Tervueren in de VS was 'Milsart', geïmporteerd in 1954. Het ras groeide snel in populariteit bij politie-eenheden.",
    "Tervuerens hebben een 'zesde zintuig' voor de emoties van hun baas – ze voelen stress, verdriet of blijdschap aan en reageren erop."
  ],
  history: {
    origin: "De Tervueren is één van de vier variëteiten van de Belgische Herder, die aan het einde van de 19e eeuw als afzonderlijk ras werden erkend. Net als de andere Belgische Herders ontstond de Tervueren uit lokale herdershonden die in heel België werden gebruikt voor kuddewerk en bewaking.",
    development: "In 1891 richtte Professor Adolphe Reul van de Veterinaire School in Cureghem een studie in om Belgische herdershonden te classificeren. Hij identificeerde verschillende types op basis van vachtlengte en kleur. De langharige, gevlekte bruin-zwarte variant werd de Tervueren genoemd, naar het dorp waar fokker M.F. Corbeel woonde.\n\nDe eerste geregistreerde Tervueren was 'Tom' en 'Poes', een fokpaar uit 1891. Het ras werd in 1901 officieel erkend. Tijdens beide wereldoorlogen werd het ras ingezet als boodschappenhond, ambulancehond en wachthond. Na WOII raakte het ras bijna uitgestorven, maar fokkers herbouwden de populatie. Tegenwoordig is de Tervueren populair als politie-, zoek- en sporthond, en wint hij terrein als gezinshond voor actieve gezinnen."
  },
  similarBreeds: [
    "Belgische Herder (Malinois)",
    "Belgische Herder (Groenendael)",
    "Duitse Herder",
    "Hollandse Herder"
  ],
  commonMistakes: [
    "Te weinig mentale stimulatie: Tervuerens zijn geniaal en vervelen zich snel. Zonder puzzels of training worden ze destructief.",
    "Inconsistente training: Dit ras detecteert zwakheden in leiderschap. Wees altijd consequent en duidelijk.",
    "Onderschatten van de vachtverzorging: Hun lange vacht klit snel en vereist dagelijkse aandacht tijdens verhaarperiodes.",
    "Onvoldoende socialisatie: Tervuerens kunnen angstig of agressief worden tegenover vreemden zonder vroege socialisatie.",
    "Te lang alleen laten: Ze zijn extreem aan hun gezin gehecht en kunnen scheidingsangst ontwikkelen. Plan gezelschap in.",
    "Geen uitdaging bieden: Een Tervueren zonder werk is een ongelukkige hond. Geef ze taken, ook al is het speelgoed opruimen."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€50",
    grooming: "€20-€50",
    insurance: "€20-€40",
    total: "€115-€220",
    note: "Tervuerens kunnen hogere vachtkosten hebben (professionele trimming €40-€70 per sessie, 3-4x per jaar). Houd rekening met kosten voor hondensporten, speelgoed voor mentale stimulatie, en mogelijk hogere premies door sportblessures. Eenmalig: aanschaf €1.000-€1.800."
  }
};

// ===== 103. Belgische Herder (Laekenois) =====
export const belgischeHerderLaekenois: BreedDetails = {
  breedName: "Belgian Shepherd Laekenois",
  breedNameNL: "Belgische Herder (Laekenois)",
  faqs: [
    {
      question: "Waarom is de Laekenois zo zeldzaam?",
      answer: "De Laekenois is de zeldzaamste van de vier Belgische Herders. Na beide wereldoorlogen raakte het ras bijna uitgestorven. Er zijn nu wereldwijd slechts enkele duizenden exemplaren. Dit maakt het vinden van een goede fokker uitdagend."
    },
    {
      question: "Wat is het verschil tussen een Laekenois en andere Belgische Herders?",
      answer: "De Laekenois heeft een ruige, draderige vacht met een rossige kleur en zwart masker. Dit is uniek onder de Belgische Herders. Karakter en werkdrift zijn identiek aan Malinois, Tervueren en Groenendael."
    },
    {
      question: "Is een Laekenois geschikt voor beginners?",
      answer: "Nee, net als andere Belgische Herders is de Laekenois te intens voor beginners. Ze zijn zeer energiek, intelligent en gevoelig. Ze vereisen een ervaren baas die consequent kan leiden en voldoende uitdaging kan bieden."
    },
    {
      question: "Hoeveel beweging heeft een Laekenois nodig?",
      answer: "Een Laekenois heeft minimaal 2-3 uur beweging per dag nodig, plus mentale stimulatie. Ze excelleren in agility, herding, tracking en zoekwerk. Zonder voldoende uitdaging worden ze destructief."
    },
    {
      question: "Verhaart een Laekenois veel?",
      answer: "Ja, Laekenois verharen gematigd tot veel, vooral in het voorjaar en najaar. Hun ruige vacht vereist wekelijks borstelen om dode haren te verwijderen en klitten te voorkomen. Trim overtollig haar rond oren en poten."
    },
    {
      question: "Zijn Laekenois goed met andere honden?",
      answer: "Met goede socialisatie zijn Laekenois goed met andere honden. Ze kunnen wel dominant zijn tegenover honden van hetzelfde geslacht. Vroege socialisatie en training zijn essentieel om problematisch gedrag te voorkomen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Laekenois?",
      answer: "Laekenois zijn over het algemeen gezond, maar kunnen gevoelig zijn voor heupdysplasie, elleboogdysplasie, epilepsie en oogproblemen. Door de kleine genenpool is inteelt een risico. Kies een fokker die screent. Levensverwachting: 10-12 jaar."
    },
    {
      question: "Wat kost een Laekenois pup?",
      answer: "Een Laekenois pup is zeldzaam en kost tussen €1.200 en €2.000. Door de beperkte beschikbaarheid zijn wachtlijsten normaal. Kies een geregistreerde fokker die genetische diversiteit waarborgt."
    }
  ],
  funFacts: [
    "De Laekenois is vernoemd naar het Kasteel van Laken bij Brussel, waar Koningin Marie-Henriette van België het ras in de late 19e eeuw bevorderde.",
    "Ze werden oorspronkelijk ingezet om linnen te bewaken dat te drogen lag in de velden – vandaar hun ruige, weerbestendige vacht.",
    "De Laekenois werd pas in 2011 officieel erkend door de American Kennel Club (AKC) – meer dan 100 jaar na de andere Belgische Herders.",
    "Hun ruige vacht is zelfreinigend en vergt minder baden dan andere rassen – vuil valt er vanzelf uit.",
    "Tijdens WO I werden Laekenois ingezet als boodschappenhonden en voor het trekken van machinegeweren naar frontlinies.",
    "Er zijn wereldwijd minder dan 1.000 Laekenois – dit maakt het één van de zeldzaamste herkenbare hondenrassen."
  ],
  history: {
    origin: "De Laekenois is de oudste en zeldzaamste van de vier Belgische Herders. Net als de andere variëteiten ontstond het ras uit lokale herdershonden in België. De ruige vacht ontwikkelde zich natuurlijk in de regio rond Boom, waar de honden linnen bewakten dat te drogen lag in de velden langs de rivier.",
    development: "Koningin Marie-Henriette van België was dol op deze ruigharige herders en hield ze op haar residentie, het Kasteel van Laken. Dit gaf het ras status en de naam 'Laekenois'. In 1891 classificeerde Professor Adolphe Reul de Belgische Herders in vier types, waarbij de Laekenois werd gedefinieerd als de ruigharige, rossige variant.\n\nTijdens beide wereldoorlogen werd het ras zwaar getroffen en raakte bijna uitgestorven. Een handvol toegewijde fokkers in België en Nederland redde het ras in de jaren '60 en '70. Door de kleine genenpool blijft de Laekenois zeldzaam. Pas in 2011 kreeg het volledige erkenning van de AKC. Tegenwoordig wordt het ras langzaam populairder bij liefhebbers van zeldzame rassen, maar het blijft de minst bekende Belgische Herder."
  },
  similarBreeds: [
    "Belgische Herder (Malinois)",
    "Belgische Herder (Tervueren)",
    "Hollandse Herder (Ruwharig)",
    "Bouvier des Flandres"
  ],
  commonMistakes: [
    "Onderschatten van de zeldzaamheid: Het vinden van een goede fokker is moeilijk. Wees geduldig en vermijd broodfokkers.",
    "Te weinig socialisatie: Laekenois kunnen wantrouwig zijn. Socialiseer vroeg en blijf het doen.",
    "Geen mentale uitdaging: Ze zijn net zo intelligent als Malinois en vervelen zich snel zonder werk.",
    "Vacht verwaarlozen: Hun ruige vacht klit snel zonder regelmatig borstelen. Check wekelijks op klitten.",
    "Te lang alleen laten: Laekenois zijn zeer aan hun gezin gehecht en kunnen scheidingsangst ontwikkelen.",
    "Geen consequente leiding: Dit ras test grenzen. Wees duidelijk en consistent in regels."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€50",
    grooming: "€15-€40",
    insurance: "€20-€40",
    total: "€110-€210",
    note: "Laekenois zijn over het algemeen gezond, maar de kleine genenpool kan leiden tot hogere dierenarts kosten. Houd rekening met kosten voor hondensporten en speelgoed. Eenmalig: aanschaf €1.200-€2.000, lange wachtlijsten zijn normaal."
  }
};

// ===== 104. Belgische Herder (Groenendael) =====
export const belgischeHerderGroenendael: BreedDetails = {
  breedName: "Belgian Shepherd Groenendael",
  breedNameNL: "Belgische Herder (Groenendael)",
  faqs: [
    {
      question: "Wat is het verschil tussen een Groenendael en een Tervueren?",
      answer: "Het enige verschil is de kleur: Groenendaels zijn volledig zwart met mogelijk kleine witte vlekken op borst/tenen, terwijl Tervuerens gevlekt bruin-zwart zijn. Karakter, werkdrift en vachtverzorging zijn identiek."
    },
    {
      question: "Is een Groenendael geschikt voor beginners?",
      answer: "Nee, Groenendaels zijn niet geschikt voor beginners. Ze zijn extreem intelligent, energiek en gevoelig. Ze vereisen een ervaren baas die consequent kan leiden en voldoende mentale en fysieke uitdaging kan bieden."
    },
    {
      question: "Hoeveel beweging heeft een Groenendael nodig?",
      answer: "Een Groenendael heeft minimaal 2-3 uur beweging per dag nodig, inclusief mentale stimulatie. Ze excelleren in agility, herding, tracking, gehoorzaamheidswerk en zoek- en reddingswerk. Zonder uitdaging ontwikkelen ze gedragsproblemen."
    },
    {
      question: "Verhaart een Groenendael veel?",
      answer: "Ja, Groenendaels verharen intensief door hun lange, dikke dubbele vacht. Vooral in het voorjaar en najaar verliezen ze veel haar. Borstel minimaal 3-4x per week, dagelijks tijdens de verhaarperiode om losse haren te verwijderen."
    },
    {
      question: "Zijn Groenendaels goede waakhonden?",
      answer: "Ja, Groenendaels zijn uitstekende waakhonden. Ze zijn alert, beschermend en wantrouwig tegenover vreemden. Ze blaffen om bezoekers aan te kondigen, maar zijn niet agressief met goede socialisatie. Ze zijn loyaal en verdedigen hun gezin."
    },
    {
      question: "Zijn Groenendaels goed met kinderen?",
      answer: "Met goede socialisatie zijn Groenendaels uitstekend met kinderen. Ze zijn beschermend en geduldig, maar kunnen proberen kinderen te 'hoeden' door duwen of hakken bijten. Train dit gedrag af en leer kinderen respectvol met de hond omgaan."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Groenendaels?",
      answer: "Groenendaels kunnen gevoelig zijn voor epilepsie, heupdysplasie, elleboogdysplasie, oogproblemen (progressieve retina-atrofie), en schildklierproblemen. Kies een fokker die ouderdieren screent. Levensverwachting: 12-14 jaar."
    },
    {
      question: "Wat kost een Groenendael pup?",
      answer: "Een Groenendael pup met stamboom kost tussen €1.000 en €1.800, afhankelijk van de fokker en bloedlijnen (show- vs werklijnen). Controleer altijd gezondheidsscreenings en vraag naar de temperamenten van de ouders."
    }
  ],
  funFacts: [
    "Groenendaels zijn vernoemd naar het dorp Groenendaal bij Brussel, waar restaurateur Nicolas Rose in 1885 het eerste zwarte langharige paar fokte: 'Picard d'Uccle' en 'Petite'.",
    "Ze werden massaal ingezet tijdens WO I en WO II als boodschappenhonden, ambulancehonden en Red Cross honden – veel Groenendaels stierven heldhaftig in dienst.",
    "De eerste politiehond in New York (1908) was een Groenendael genaamd 'Bruin'.",
    "Hun zwarte vacht heeft een natuurlijke glans door oliën in de huid – ze lijken altijd fris gepoetst.",
    "Groenendaels kunnen tot 40 km/u sprinten en hebben het uithoudingsvermogen om uren te rennen.",
    "Ze hebben een fenomenaal geheugen en kunnen plaatsen en routes onthouden die ze jaren geleden maar één keer zijn gelopen."
  ],
  history: {
    origin: "De Groenendael is één van de vier variëteiten van de Belgische Herder en ontstond aan het einde van de 19e eeuw uit lokale herdershonden in België. Net als de andere types werden ze gebruikt voor kuddewerk, bewaking en algemene boerderijdaken.",
    development: "In 1885 fokte restaurateur Nicolas Rose uit Groenendaal (bij Brussel) het eerste zwarte langharige paar: 'Picard d'Uccle' en 'Petite'. Hun nakomelingen vormden de basis van het moderne Groenendael ras. In 1891 classificeerde Professor Adolphe Reul de Belgische Herders, waarbij de Groenendael werd gedefinieerd als de langharige, volledig zwarte variant.\n\nHet ras werd in 1901 officieel erkend. Tijdens WO I werden duizenden Groenendaels ingezet als oorlogshonden – ze brachten berichten over, sleepten gewonden naar ambulances, en waarschuwden voor gasaanvallen. Na de oorlog groeide de populariteit wereldwijd. Groenendaels worden nu ingezet als politie-, zoek-, therapie- en sporthond. Ze zijn de meest herkenbare van de vier Belgische Herders en populair bij actieve gezinnen die een loyale, intelligente werkhond zoeken."
  },
  similarBreeds: [
    "Belgische Herder (Tervueren)",
    "Belgische Herder (Malinois)",
    "Duitse Herder",
    "Hollandse Herder"
  ],
  commonMistakes: [
    "Te weinig mentale uitdaging: Groenendaels zijn geniaal en vervelen zich snel. Zonder puzzels, training of werk worden ze destructief.",
    "Inconsistente training: Dit ras is gevoelig en detecteert zwakheden. Wees consequent maar positief in training.",
    "Onderschatten van de vachtverzorging: Hun lange vacht vereist dagelijkse aandacht tijdens verhaarperiodes, anders klit het.",
    "Onvoldoende socialisatie: Zonder vroege socialisatie kunnen Groenendaels angstig of agressief worden tegenover vreemden.",
    "Te lang alleen laten: Ze zijn extreem aan hun gezin gehecht en kunnen scheidingsangst ontwikkelen. Plan gezelschap in.",
    "Geen uitlaatklep voor energie: Zonder 2-3 uur beweging per dag worden ze hyperactief, blaffen excessief of ontwikkelen dwangmatig gedrag."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€50",
    grooming: "€20-€50",
    insurance: "€20-€40",
    total: "€115-€220",
    note: "Groenendaels kunnen hogere vachtkosten hebben (professionele trimming €40-€70, 3-4x per jaar). Houd rekening met kosten voor hondensporten (agility, herding), speelgoed voor mentale stimulatie, en mogelijk hogere premies door sportblessures. Eenmalig: aanschaf €1.000-€1.800."
  }
};

// ===== 105. Kelpie =====
export const kelpie: BreedDetails = {
  breedName: "Australian Kelpie",
  breedNameNL: "Kelpie",
  faqs: [
    {
      question: "Is een Kelpie geschikt voor beginners?",
      answer: "Nee, Kelpies zijn niet geschikt voor beginners. Ze zijn extreem energiek, intelligent en eigenwijzig. Ze zijn gefokt om zelfstandig te werken en vereisen een ervaren baas die consequent kan leiden en voldoende uitdaging kan bieden."
    },
    {
      question: "Hoeveel beweging heeft een Kelpie nodig?",
      answer: "Een Kelpie heeft minimaal 2-3 uur intensieve beweging per dag nodig, plus mentale stimulatie. Ze zijn geboren om 12+ uur per dag schapen te hoeden. Zonder werk worden ze destructief, hyperactief of ontwikkelen dwangmatig gedrag."
    },
    {
      question: "Kan een Kelpie in een appartement wonen?",
      answer: "Absoluut niet aanbevolen. Kelpies zijn arbeidshonden die ruimte nodig hebben om te rennen. Een appartement is te beperkend. Een groot huis met enorme tuin of een boerderij is ideaal. Anders is dit ras niet geschikt voor je."
    },
    {
      question: "Zijn Kelpies goed met kinderen?",
      answer: "Kelpies kunnen goed met kinderen zijn, maar hun hoedinstinct is extreem sterk. Ze zullen proberen kinderen (en andere dieren) te hoeden door achtervolgen, bijten in hakken en duwen. Dit gedrag is moeilijk af te leren. Niet ideaal voor gezinnen met jonge kinderen."
    },
    {
      question: "Hoe intelligent zijn Kelpies?",
      answer: "Kelpies behoren tot de meest intelligente hondenrassen ter wereld. Ze leren extreem snel, maar zijn ook eigenzinnig. Ze kunnen problemen zelfstandig oplossen, wat zowel geweldig als frustrerend kan zijn. Ze hebben consequente, uitdagende training nodig."
    },
    {
      question: "Wat is het verschil tussen een Working Kelpie en een Show Kelpie?",
      answer: "Working Kelpies zijn gefokt voor werk en hebben extreme werkdrift en energie. Show Kelpies zijn gefokt voor uiterlijk en zijn iets rustiger, maar nog steeds zeer actief. Working Kelpies zijn niet geschikt als huisdier zonder werk."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Kelpies?",
      answer: "Kelpies zijn over het algemeen gezond en robuust. Ze kunnen gevoelig zijn voor progressieve retina-atrofie (PRA), cerebellair abiotrofie (neurologische aandoening) en heupdysplasie. Kies een fokker die screent. Levensverwachting: 10-14 jaar."
    },
    {
      question: "Wat kost een Kelpie pup?",
      answer: "Een Kelpie pup kost tussen €600 en €1.200 in België/Nederland. Working Kelpies van werklijnen zijn vaak duurder (tot €2.000) omdat ze van gechampioneerde werk-ouders komen. Controleer altijd de werkdrift van de ouders."
    }
  ],
  funFacts: [
    "Kelpies kunnen over de ruggen van schapen rennen om aan de voorkant van de kudde te komen – een techniek die 'backing' heet.",
    "Een Kelpie kan gemakkelijk 60 km per dag rennen tijdens kuddewerk – ze hebben grenzeloze energie.",
    "Het ras is vernoemd naar een mythologische Schotse waterspirit die van vorm kon veranderen – passend voor hun behendigheid.",
    "Kelpies kunnen hypnotiseren: ze gebruiken een intense 'eye' (blik) om schapen te controleren, net als Border Collies.",
    "In Australië zijn er meer dan 100.000 werkende Kelpies – ze zijn onmisbaar voor de schapenteelt industrie.",
    "Kelpies kunnen temperaturen van -10°C tot +40°C tolereren en werken in alle weersomstandigheden."
  ],
  history: {
    origin: "De Kelpie ontstond in de late 19e eeuw in Australië, waar kolonisten behoefte hadden aan honden die grote kuddes schapen konden hoeden in het uitgestrekte, harde landschap. Het ras stamt af van Schotse Collies die werden geïmporteerd in de 1800s, mogelijk gekruist met Dingo's (wilde Australische honden) voor extra hardheid en zelfstandigheid.",
    development: "De naam 'Kelpie' komt van een beroemde teef genaamd 'Kelpie', gefokt door George Robertson in 1872. Kelpie won meerdere herderwedstrijden en werd een legendarische moeder van de lijn. Haar nakomelingen verspreidden zich over Australië en werden de basis van het moderne ras.\n\nKelpies werden geselecteerd op werkdrift, intelligentie, uithoudingsvermogen en het vermogen om zelfstandig te werken zonder menselijke supervisie. Ze konden kuddes van duizenden schapen over kilometers drijven in extreme hitte. Het ras werd in 1902 officieel erkend. Tegenwoordig zijn Kelpies wereldwijd populair bij boeren en ook bij liefhebbers van hondensport (vooral agility en herding trials), maar ze blijven primair een werkhond."
  },
  similarBreeds: [
    "Border Collie",
    "Australian Cattle Dog",
    "Australian Shepherd",
    "Bearded Collie"
  ],
  commonMistakes: [
    "Kopen zonder werk te hebben: Een Kelpie zonder werk (kuddes, agility, herding) is een ongelukkige, destructieve hond.",
    "Te weinig beweging: 2-3 uur is het minimum. Kelpies die niet uitgeput zijn, zullen je huis vernietigen.",
    "Geen mentale uitdaging: Ze vervelen zich snel. Geef puzzels, training, zoekwerk of herding.",
    "Proberen het hoedinstinct af te leren: Dit is genetisch en bijna onmogelijk te verwijderen. Accepteer het en kanaliseer het.",
    "Te weinig consequentie: Kelpies zijn eigenwijs en zullen grenzen testen. Wees duidelijk en streng (maar positief).",
    "Denken dat ze volwassen kalmer worden: Kelpies blijven energiek tot hoge leeftijd. Dit is geen ras dat op oudere leeftijd rustig wordt."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€20-€40",
    grooming: "€5-€15",
    insurance: "€15-€30",
    total: "€80-€155",
    note: "Kelpies zijn goedkoop in onderhoud maar duur in activiteiten. Houd rekening met kosten voor herding lessen (€30-€60/les), agility, speciaal speelgoed, en mogelijke schade door destructief gedrag als ze verveeld zijn. Eenmalig: aanschaf €600-€1.200."
  }
};

// ===== 106. Cattle Dog (Australian) =====
export const cattleDog: BreedDetails = {
  breedName: "Australian Cattle Dog",
  breedNameNL: "Cattle Dog (Australian)",
  faqs: [
    {
      question: "Is een Australian Cattle Dog geschikt voor beginners?",
      answer: "Nee, Australian Cattle Dogs (ACDs) zijn niet geschikt voor beginners. Ze zijn extreem energiek, intelligent en eigenwijzig. Ze zijn gefokt om vee te hoeden door te bijten in hakken en vereisen een ervaren baas die consequent kan leiden."
    },
    {
      question: "Hoeveel beweging heeft een Cattle Dog nodig?",
      answer: "Een Cattle Dog heeft minimaal 2 uur intensieve beweging per dag nodig, plus mentale stimulatie. Ze zijn geboren werkers en gedijen bij agility, herding, lange wandelingen of joggen. Zonder voldoende uitdaging worden ze destructief."
    },
    {
      question: "Waarom heten ze ook wel 'Blue Heeler' of 'Red Heeler'?",
      answer: "Ze worden 'Heelers' genoemd omdat ze vee hoeden door te bijten in de hakken (heels). 'Blue Heeler' verwijst naar de blauwe gevlekte vacht, 'Red Heeler' naar de rode gevlekte vacht. Beide zijn Australian Cattle Dogs."
    },
    {
      question: "Zijn Cattle Dogs goed met kinderen?",
      answer: "Cattle Dogs kunnen goed met kinderen zijn, maar hun hoedinstinct is sterk. Ze zullen proberen kinderen te 'hoeden' door bijten in hakken, duwen of achtervolgen. Dit is moeilijk af te leren en kan pijnlijk zijn voor jonge kinderen. Niet ideaal voor gezinnen met peuters."
    },
    {
      question: "Bijten Cattle Dogs echt in hakken?",
      answer: "Ja, dit is hun genetische hoedstijl. Ze bijten koeien in de hakken om ze te drijven. Dit gedrag doen ze ook bij mensen, vooral kinderen, rennende personen of fietsers. Training kan het verminderen maar niet volledig elimineren."
    },
    {
      question: "Zijn Cattle Dogs agressief?",
      answer: "Cattle Dogs zijn niet agressief maar wel beschermend, territoriaal en wantrouwig tegenover vreemden. Zonder socialisatie kunnen ze argwanend of defensief worden. Ze zijn loyaal aan hun gezin maar moeten vroeg gesocialiseerd worden."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Cattle Dogs?",
      answer: "Cattle Dogs zijn robuust maar kunnen gevoelig zijn voor progressieve retina-atrofie (PRA), doofheid (vooral bij witte exemplaren), heupdysplasie en elleboogdysplasie. Kies een fokker die screent. Levensverwachting: 12-16 jaar (lang voor een middelgroot ras)."
    },
    {
      question: "Wat kost een Cattle Dog pup?",
      answer: "Een Australian Cattle Dog pup met stamboom kost tussen €800 en €1.500 in België/Nederland. Werklijnen van gechampioneerde ouders zijn duurder (tot €2.000). Controleer altijd gezondheidsscreenings en temperamenten."
    }
  ],
  funFacts: [
    "De oudste hond ooit geregistreerd was Bluey, een Australian Cattle Dog die 29 jaar en 5 maanden oud werd (1910-1939) in Australië.",
    "Cattle Dog pups worden wit geboren en ontwikkelen pas na enkele weken hun blauwe of rode spikkeling.",
    "Ze hebben Dingo-bloed in hun genen – vroege fokkers kruisten Collies met Dingo's voor hardheid en hitte-tolerantie.",
    "Cattle Dogs kunnen tot 50 km/u sprinten en koeien bijhouden die over ruige terreinen rennen.",
    "Hun vacht is waterafstotend en zelfonderhoudend – ze ruiken zelden 'honds' en hoeven weinig gebaad te worden.",
    "In Australië worden ze vaak gewoon 'Queensland Heeler' genoemd, naar de staat waar ze oorspronkelijk populair werden."
  ],
  history: {
    origin: "De Australian Cattle Dog werd in de 19e eeuw ontwikkeld in Australië door veehouders die een hond nodig hadden om grote kuddes runderen over lange afstanden te drijven door het ruige, hete outback. Bestaande herdershonden (geïmporteerde Collies) konden de extreme omstandigheden niet aan.",
    development: "In de 1840s kruiste een veehouder genaamd Thomas Hall geïmporteerde Blue Merle Collies met Dingo's. Dit leverde robuste, hittebestendige honden op die het 'Hall's Heeler' ras vormden. Na Hall's dood in 1870 werden deze honden verder verfijnd door kruisingen met Dalmatische honden (voor het werken met paarden en de gespikkelde vacht) en zwarte en bruine Kelpies (voor hoedintelligentie).\n\nHet resultaat was de moderne Australian Cattle Dog: compact, sterk, intelligent en in staat om zelfstandig te werken in extreme omstandigheden. Het ras werd in 1903 officieel erkend. Tegenwoordig zijn Cattle Dogs wereldwijd populair bij boeren, politie-eenheden (speurwerk) en liefhebbers van actieve hondensport. Ze blijven één van de meest veelzijdige werkhonden."
  },
  similarBreeds: [
    "Australian Kelpie",
    "Border Collie",
    "Blue Lacy",
    "Stumpy Tail Cattle Dog"
  ],
  commonMistakes: [
    "Onderschatten van de bijtdrift: Ze bijten genetisch in hakken. Dit is moeilijk af te leren en kan pijnlijk zijn voor kinderen.",
    "Te weinig beweging: Zonder 2+ uur beweging per dag worden ze hyperactief, destructief en ontwikkelen dwangmatig gedrag.",
    "Geen mentale uitdaging: Cattle Dogs zijn briljant en vervelen zich snel. Geef puzzels, training, zoekwerk of herding.",
    "Te lang alleen laten: Ze zijn extreem loyaal aan hun gezin en kunnen scheidingsangst of destructief gedrag ontwikkelen.",
    "Onvoldoende socialisatie: Zonder vroege socialisatie worden ze argwanend, territoriaal of agressief tegenover vreemden en andere honden.",
    "Denken dat ze volwassen rustiger worden: Cattle Dogs blijven energiek tot hoge leeftijd. Dit ras kalmeert niet naarmate ze ouder worden."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€20-€40",
    grooming: "€5-€15",
    insurance: "€15-€30",
    total: "€80-€155",
    note: "Cattle Dogs zijn goedkoop in onderhoud door hun robuuste gezondheid en zelfreingende vacht. Houd rekening met kosten voor hondensporten (agility, herding €25-€50/les), speelgoed voor mentale stimulatie, en mogelijke schade door destructief gedrag. Eenmalig: aanschaf €800-€1.500."
  }
};

// ===== 107. Collie (Langhaar) =====
export const collieLanghaar: BreedDetails = {
  breedName: "Rough Collie",
  breedNameNL: "Collie (Langhaar)",
  faqs: [
    {
      question: "Is een Langhaar Collie geschikt voor beginners?",
      answer: "Ja, Langhaar Collies zijn geschikt voor beginners. Ze zijn vriendelijk, geduldig en graag bereid om te plezieren. Ze zijn minder intens dan Border Collies en passen goed bij gezinnen die bereid zijn tijd te investeren in vachtverzorging en training."
    },
    {
      question: "Hoeveel beweging heeft een Langhaar Collie nodig?",
      answer: "Een Langhaar Collie heeft 1-1,5 uur beweging per dag nodig. Ze zijn minder energiek dan werkende herdershonden maar hebben wel dagelijkse wandelingen, speeltijd en mentale stimulatie nodig. Ze zijn geschikt voor gematigde activiteiten."
    },
    {
      question: "Verhaart een Langhaar Collie veel?",
      answer: "Ja, Langhaar Collies verharen intensief door hun dikke, lange dubbele vacht. Vooral in het voorjaar en najaar verliezen ze veel haar. Borstel minimaal 3-4x per week, dagelijks tijdens verhaarperiodes. Stofzuigen wordt een dagelijkse routine."
    },
    {
      question: "Zijn Langhaar Collies goed met kinderen?",
      answer: "Ja, Langhaar Collies zijn uitstekend met kinderen. Ze zijn geduldig, beschermend en zachtaardig. Ze hebben een mild hoedinstinct maar zijn minder intens dan Border Collies. Ze zijn ideale gezinshonden en houden van spelen met kinderen."
    },
    {
      question: "Zijn Langhaar Collies goede waakhonden?",
      answer: "Langhaar Collies zijn goede alarmhonden – ze blaffen om bezoekers aan te kondigen. Ze zijn echter te vriendelijk om goede waakhonden te zijn; ze zullen eerder inbrekers verwelkomen dan afschrikken. Ze zijn loyaal maar niet agressief."
    },
    {
      question: "Zijn Langhaar Collies net als 'Lassie'?",
      answer: "Ja! De beroemde TV- en filmhond Lassie was een Langhaar Collie. Het ras wordt vaak geassocieerd met loyaliteit, intelligentie en heldhaftigheid dankzij deze iconische personage. Moderne Collies hebben nog steeds deze edele, zachte karakter."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Langhaar Collies?",
      answer: "Langhaar Collies kunnen gevoelig zijn voor Collie Eye Anomaly (CEA), progressieve retina-atrofie (PRA), heupdysplasie, dermatomyositis (huid/spieraandoening), en MDR1-genmutatie (gevoeligheid voor bepaalde medicijnen). Kies een fokker die screent. Levensverwachting: 12-14 jaar."
    },
    {
      question: "Wat kost een Langhaar Collie pup?",
      answer: "Een Langhaar Collie pup met stamboom kost tussen €1.000 en €1.800 in België/Nederland. Show-kwaliteit pups van gechampioneerde ouders kunnen duurder zijn (tot €2.500). Controleer altijd gezondheidsscreenings, vooral voor CEA en MDR1."
    }
  ],
  funFacts: [
    "Koningin Victoria van Engeland was dol op Collies en maakte het ras populair in de 19e eeuw door ze te fokken op Balmoral Castle in Schotland.",
    "'Lassie' werd gespeeld door meerdere mannelijke Collies (niet vrouwelijke) omdat mannelijke Collies een vollere, mooiere vacht hebben voor de camera.",
    "Langhaar Collies hebben een 'Collie nose' – een lange, elegante snuit die hen een aristocratisch uiterlijk geeft.",
    "Ze hebben een natuurlijke neiging om te 'smile' – ze trekken hun lippen op in een glimlach wanneer ze blij zijn.",
    "Collies kunnen extreem gevoelig zijn voor bepaalde medicijnen (ivermectine) door de MDR1-genmutatie – vertel dit altijd aan je dierenarts.",
    "Albert Payson Terhune, een beroemde Amerikaanse schrijver, populariseerde het ras in de vroege 20e eeuw met zijn boeken over Collies."
  ],
  history: {
    origin: "De Langhaar Collie ontstond in Schotland en Noord-Engeland in de 18e en 19e eeuw als herdershond. Het woord 'Collie' komt waarschijnlijk van 'Coaly', een term voor zwarte schapen die deze honden hoedden. Ze werden gebruikt om kuddes schapen te hoeden in de uitgestrekte Schotse Hooglanden.",
    development: "Oorspronkelijk waren Collies kleiner en meer werkzaam dan de moderne show-variant. In de 19e eeuw nam Koningin Victoria interesse in het ras en begon ze Collies te fokken op Balmoral Castle. Dit gaf het ras status en populariteit bij de Britse adel. Fokkers begonnen te selecteren op uiterlijk en elegantie naast werkdrift.\n\nDoor kruisingen met Borzois (voor de lange neus) en mogelijk Ierse Setters (voor grootte) ontstond de moderne Langhaar Collie met zijn edele, aristocratische uiterlijk. Het ras werd officieel erkend in 1881. In de 20e eeuw maakte de TV-serie 'Lassie' (1954-1973) het ras wereldberoemd als loyale, intelligente gezinshond. Tegenwoordig zijn Langhaar Collies populaire show- en gezinshonden, hoewel ze minder vaak voor werk worden gebruikt dan in het verleden."
  },
  similarBreeds: [
    "Shetland Sheepdog (kleinere versie)",
    "Border Collie",
    "Australian Shepherd",
    "English Shepherd"
  ],
  commonMistakes: [
    "Onderschatten van de vachtverzorging: Langhaar Collies vereisen dagelijks borstelen tijdens verhaar. Verwaarlozing leidt tot pijnlijke klitten.",
    "Te weinig socialisatie: Collies kunnen verlegen worden zonder vroege socialisatie. Begin jong en blijf nieuwe ervaringen introduceren.",
    "MDR1-genmutatie negeren: Vraag je fokker altijd naar MDR1-status. Veel medicijnen (ivermectine, loperamide) zijn dodelijk voor Collies met deze mutatie.",
    "Geen mentale uitdaging: Hoewel rustiger dan Border Collies, zijn ze nog steeds intelligent en hebben puzzels of training nodig.",
    "Te lang alleen laten: Collies zijn zeer aan hun gezin gehecht en kunnen scheidingsangst ontwikkelen. Plan gezelschap in.",
    "Overvoeren: Collies hebben een gematigd eetlust maar kunnen overgewicht krijgen. Volg voedingsrichtlijnen."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€50",
    grooming: "€30-€70",
    insurance: "€20-€40",
    total: "€125-€240",
    note: "Langhaar Collies hebben hogere vachtkosten. Professionele trimming/grooming kost €50-€90 per sessie (4-6x per jaar). Houd rekening met kosten voor MDR1-screening (€70-€120 eenmalig), oogcontroles, en mogelijk hogere verzekeringspremies door genetische aandoeningen. Eenmalig: aanschaf €1.000-€1.800."
  }
};

// ===== 108. Collie (Korthaar) =====
export const collieKorthaar: BreedDetails = {
  breedName: "Smooth Collie",
  breedNameNL: "Collie (Korthaar)",
  faqs: [
    {
      question: "Wat is het verschil tussen een Korthaar Collie en een Langhaar Collie?",
      answer: "Het enige verschil is de vacht: Korthaar Collies hebben korte, dichte vacht, terwijl Langhaar Collies lange, luxueuze vacht hebben. Karakter, intelligentie en temperament zijn identiek. Korthaar Collies vereisen minder vachtverzorging."
    },
    {
      question: "Is een Korthaar Collie geschikt voor beginners?",
      answer: "Ja, Korthaar Collies zijn uitstekend voor beginners. Ze zijn vriendelijk, trainbaar en minder veeleisend qua verzorging dan Langhaar Collies. Ze zijn geduldig, intelligent en passen goed bij gezinnen die een actieve, loyale hond willen."
    },
    {
      question: "Hoeveel beweging heeft een Korthaar Collie nodig?",
      answer: "Een Korthaar Collie heeft 1-1,5 uur beweging per dag nodig. Ze zijn minder intens dan Border Collies maar houden van wandelen, spelen en mentale uitdaging. Ze passen bij gezinnen met een gematigd actieve levensstijl."
    },
    {
      question: "Verhaart een Korthaar Collie veel?",
      answer: "Ja, Korthaar Collies verharen gematigd tot veel door hun dubbele vacht. Vooral in het voorjaar en najaar verliezen ze haar. Borstel 2-3x per week om losse haren te verwijderen. Ze verharen minder dan Langhaar Collies maar nog steeds aanzienlijk."
    },
    {
      question: "Zijn Korthaar Collies goed met kinderen?",
      answer: "Ja, Korthaar Collies zijn uitstekend met kinderen. Ze zijn geduldig, beschermend en zachtaardig. Ze hebben een mild hoedinstinct maar zijn vriendelijker dan intensieve werkhonden. Ze zijn ideale gezinshonden en houden van spelen."
    },
    {
      question: "Waarom zijn Korthaar Collies minder bekend dan Langhaar Collies?",
      answer: "Korthaar Collies zijn zeldzamer omdat de Langhaar variant populairder werd door 'Lassie' en hun opvallende uiterlijk. Korthaar Collies zijn praktischer maar minder visueel dramatisch, waardoor ze minder aandacht kregen in media en shows."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Korthaar Collies?",
      answer: "Korthaar Collies delen dezelfde gezondheidsproblemen als Langhaar Collies: Collie Eye Anomaly (CEA), progressieve retina-atrofie (PRA), heupdysplasie, dermatomyositis en MDR1-genmutatie. Kies een fokker die screent. Levensverwachting: 12-14 jaar."
    },
    {
      question: "Wat kost een Korthaar Collie pup?",
      answer: "Een Korthaar Collie pup met stamboom kost tussen €900 en €1.600 in België/Nederland. Ze zijn vaak iets goedkoper dan Langhaar Collies omdat ze minder populair zijn. Controleer altijd gezondheidsscreenings, vooral CEA en MDR1."
    }
  ],
  funFacts: [
    "Korthaar Collies waren oorspronkelijk de norm – Langhaar Collies ontstonden pas later door selectieve fokkerij voor langere vacht.",
    "Ze werden vaak gebruikt als 'drover dogs' om vee over lange afstanden te drijven naar markten – hun korte vacht was praktischer in modderige omstandigheden.",
    "Korthaar Collies zijn atletischer en wendbaarder dan Langhaar Collies omdat hun vacht hen niet belemmert bij rennen en springen.",
    "Ze hebben dezelfde 'Collie smile' als Langhaar Collies – ze laten hun tanden zien bij blijdschap.",
    "In de VS zijn Korthaar en Langhaar Collies aparte rassen, maar in het VK worden ze als één ras beschouwd met twee vachtvarianten.",
    "Korthaar Collies zijn populairder in werkende settings (boerderijen) omdat ze minder onderhoud nodig hebben dan Langhaar Collies."
  ],
  history: {
    origin: "De Korthaar Collie deelt dezelfde oorsprong als de Langhaar Collie. Ze ontstonden in Schotland en Noord-Engeland als herdershonden in de 18e en 19e eeuw. Oorspronkelijk hadden Collies kortere vacht, wat praktischer was voor het harde werk van schapen hoeden in modderige, ruige omstandigheden.",
    development: "Toen Koningin Victoria in de 19e eeuw interesse toonde in Collies, begonnen fokkers te selecteren op uiterlijk. Sommige fokkers focusten op langere vacht (Langhaar Collies) omdat dit visueel indrukwekkender was voor shows. Korthaar Collies behielden hun functionele, kortere vacht en bleven populair bij werkende boeren.\n\nDe twee varianten werden officieel erkend als aparte types binnen hetzelfde ras (in het VK) of als aparte rassen (in de VS). Helaas maakte de TV-serie 'Lassie' alleen Langhaar Collies wereldberoemd, waardoor Korthaar Collies in de schaduw bleven. Tegenwoordig zijn Korthaar Collies zeldzamer maar gewaardeerd door liefhebbers die het Collie-temperament willen zonder de intensieve vachtverzorging."
  },
  similarBreeds: [
    "Rough Collie (Langhaar)",
    "Border Collie",
    "Australian Shepherd",
    "English Shepherd"
  ],
  commonMistakes: [
    "Verwachten dat ze minder intelligent zijn: Korthaar Collies zijn net zo intelligent als Langhaar Collies. Onderschat hun behoefte aan mentale stimulatie niet.",
    "Te weinig socialisatie: Collies kunnen verlegen worden zonder vroege socialisatie. Begin jong en blijf nieuwe ervaringen introduceren.",
    "MDR1-genmutatie negeren: Vraag altijd naar MDR1-status. Veel medicijnen zijn gevaarlijk voor Collies met deze mutatie.",
    "Geen mentale uitdaging: Ze hebben puzzels, training of taken nodig om gelukkig te blijven.",
    "Te lang alleen laten: Collies zijn zeer aan hun gezin gehecht en kunnen scheidingsangst ontwikkelen.",
    "Denken dat ze geen verzorging nodig hebben: Hoewel minder dan Langhaar Collies, verharen ze nog steeds en moeten regelmatig geborsteld worden."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€50",
    grooming: "€10-€25",
    insurance: "€20-€40",
    total: "€105-€195",
    note: "Korthaar Collies zijn goedkoper in verzorging dan Langhaar Collies. Houd wel rekening met kosten voor MDR1-screening (€70-€120 eenmalig), oogcontroles (CEA), en mogelijk hogere verzekeringspremies door genetische aandoeningen. Eenmalig: aanschaf €900-€1.600."
  }
};

// ===== 109. Bearded Collie =====
export const beardedCollie: BreedDetails = {
  breedName: "Bearded Collie",
  breedNameNL: "Bearded Collie",
  faqs: [
    {
      question: "Waarom heten ze 'Bearded' Collie?",
      answer: "Ze heten 'Bearded' (gebaard) omdat ze lange, ruige gezichtshaar hebben die eruitziet als een baard. Dit, samen met hun lange wenkbrauwen, geeft ze een karakteristieke 'schaapachtige' uitstraling. Het is één van hun meest herkenbare kenmerken."
    },
    {
      question: "Is een Bearded Collie geschikt voor beginners?",
      answer: "Bearded Collies kunnen geschikt zijn voor gemotiveerde beginners, maar ze vereisen veel vachtverzorging en energie. Ze zijn vriendelijk, trainbaar en enthousiast, maar hun lange vacht en hoge energie kunnen overweldigend zijn voor mensen zonder ervaring."
    },
    {
      question: "Hoeveel beweging heeft een Bearded Collie nodig?",
      answer: "Een Bearded Collie heeft 1,5-2 uur beweging per dag nodig. Ze zijn energieke, speelse honden die houden van rennen, wandelen, agility en herding. Zonder voldoende beweging worden ze hyperactief of ontwikkelen gedragsproblemen."
    },
    {
      question: "Hoeveel verzorging heeft een Bearded Collie nodig?",
      answer: "Bearded Collies vereisen INTENSE vachtverzorging. Borstel dagelijks (30-60 minuten) om klitten te voorkomen. Hun vacht verzamelt modder, bladeren en vuil. Professionele trimming elke 6-8 weken is aanbevolen. Dit is één van de meest onderhoudsintensieve rassen."
    },
    {
      question: "Zijn Bearded Collies goed met kinderen?",
      answer: "Ja, Bearded Collies zijn uitstekend met kinderen. Ze zijn speels, geduldig en energiek – perfecte speelkameraden. Ze hebben een mild hoedinstinct maar zijn vriendelijker dan Border Collies. Wel kunnen ze enthousiast zijn en jonge kinderen omverstoten."
    },
    {
      question: "Zijn Bearded Collies geschikt voor appartementen?",
      answer: "Niet ideaal. Bearded Collies zijn middelgroot, energiek en hebben ruimte nodig om te spelen. Een huis met tuin is beter. Als je in een appartement woont, zorg dan voor minimaal 2 uur buitenactiviteiten per dag."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Bearded Collies?",
      answer: "Bearded Collies kunnen gevoelig zijn voor heupdysplasie, hypothyreoïdie (schildklieraandoening), Addison's ziekte, auto-immuunziekten en oogproblemen. Kies een fokker die ouderdieren screent. Levensverwachting: 12-14 jaar."
    },
    {
      question: "Wat kost een Bearded Collie pup?",
      answer: "Een Bearded Collie pup met stamboom kost tussen €1.200 en €2.000 in België/Nederland. Show-kwaliteit pups van gechampioneerde ouders zijn duurder (tot €2.500). Controleer altijd gezondheidsscreenings en vraag naar temperamenten."
    }
  ],
  funFacts: [
    "Bearded Collies worden soms 'Bouncers' genoemd omdat ze de neiging hebben om op en neer te springen van opwinding – vooral bij het begroeten van mensen.",
    "Hun vacht verandert van kleur naarmate ze ouder worden. Pups geboren in donkere kleuren (zwart, bruin) worden vaak lichter (grijs, beige) als volwassene.",
    "Het ras stond in de jaren '50 op het punt van uitsterven maar werd gered door één enkele hond: 'Jeannie of Bothkennar', die de moeder werd van het moderne ras.",
    "Bearded Collies zijn 'Peter Pan honden' – ze behouden hun speelse, puppyachtige gedrag tot ver in de volwassenheid (tot 3-4 jaar).",
    "Ze hebben een natuurlijke 'boinging' stijl van rennen waarbij ze hoog opspringen om over struikgewas te kijken tijdens het hoeden.",
    "In de jaren '70 werden Bearded Collies populair nadat een exemplaar genaamd 'Potterdale Classic at Moonhill' Best in Show won op Crufts in 1989."
  ],
  history: {
    origin: "De Bearded Collie is één van de oudste Britse hondenrassen en ontstond in Schotland in de 16e eeuw. Volgens de legende kruiste een Poolse koopman in 1514 zijn Poolse Laaglandse Herdershonden met lokale Schotse herdershonden, wat leidde tot het ontstaan van de Bearded Collie. Ze werden gebruikt om schapen en runderen te hoeden in de ruige Schotse Hooglanden.",
    development: "Eeuwenlang waren Bearded Collies werkende boerenhonden zonder gestandaardiseerd uiterlijk. In de vroege 20e eeuw begon de interesse in het ras als showhond, maar beide wereldoorlogen decimeerden de populatie. In de jaren '50 stond het ras op het punt van uitsterven.\n\nIn 1944 redde mevrouw G.O. Willison het ras door toeval. Ze bestelde een Shetland Sheepdog pup maar kreeg in plaats daarvan een Bearded Collie teef genaamd 'Jeannie of Bothkennar'. Ze was zo gecharmeerd dat ze begon te fokken. Jeannie werd de moeder van het moderne Bearded Collie ras – bijna alle huidige Bearded Collies stammen van haar af. Het ras werd in 1959 officieel erkend en groeide in populariteit als showhond en gezinshond, hoewel ze minder vaak voor werk worden gebruikt dan in het verleden."
  },
  similarBreeds: [
    "Old English Sheepdog",
    "Polish Lowland Sheepdog",
    "Tibetan Terrier",
    "Collie (Langhaar)"
  ],
  commonMistakes: [
    "Onderschatten van de vachtverzorging: Dit is KRITISCH. Dagelijks borstelen is niet optioneel – klitten zijn pijnlijk en kunnen leiden tot huidinfecties.",
    "Niet vroeg beginnen met borstelen: Wen pups vanaf dag 1 aan dagelijks borstelen. Als ze dit niet accepteren, heb je een probleem.",
    "Alleen laten wandelen in regen/modder: Hun vacht is een magneet voor vuil. Na natte wandelingen moet je 30+ minuten borstelen.",
    "Te weinig beweging: Bearded Collies zijn energiek en kunnen hyperactief worden zonder voldoende uitlaatklep.",
    "Geen mentale stimulatie: Ze zijn intelligent en vervelen zich snel. Geef puzzels, training of agility.",
    "Te lang alleen laten: Ze zijn zeer sociaal en kunnen scheidingsangst ontwikkelen. Plan gezelschap in."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€50",
    grooming: "€60-€120",
    insurance: "€20-€40",
    total: "€155-€290",
    note: "Bearded Collies hebben EXTREME vachtkosten. Professionele grooming kost €60-€100 per sessie (elke 6-8 weken). Verwacht dagelijks 30-60 minuten borstelen. Houd ook rekening met kosten voor gespecialiseerde borstels (€50-€100), shampoos, en mogelijk hogere verzekeringspremies. Eenmalig: aanschaf €1.200-€2.000."
  }
};

// ===== 110. Old English Sheepdog =====
export const oldEnglishSheepdog: BreedDetails = {
  breedName: "Old English Sheepdog",
  breedNameNL: "Old English Sheepdog",
  faqs: [
    {
      question: "Waarom heten ze 'Old English Sheepdog' als ze niet zo oud zijn?",
      answer: "Ondanks de naam is het ras relatief jong (midden 19e eeuw). 'Old' verwijst naar 'ouderwetse' hoedstijl, niet naar de ouderdom van het ras. Ze werden ook 'Bobtail' genoemd omdat hun staart vaak werd gecoupeerd."
    },
    {
      question: "Is een Old English Sheepdog geschikt voor beginners?",
      answer: "Nee, Old English Sheepdogs zijn niet ideaal voor beginners. Hun extreme vachtverzorging, grote formaat en eigenzinnige karakter vereisen ervaring. Ze zijn vriendelijk maar koppig, en hun onderhoud is zeer tijdrovend."
    },
    {
      question: "Hoeveel beweging heeft een Old English Sheepdog nodig?",
      answer: "Een Old English Sheepdog heeft 1-1,5 uur beweging per dag nodig. Ze zijn minder energiek dan Border Collies maar hebben wel dagelijkse wandelingen en speeltijd nodig. Ze zijn geschikt voor gematigde activiteiten, niet voor marathonlopen."
    },
    {
      question: "Hoeveel verzorging heeft een Old English Sheepdog nodig?",
      answer: "EXTREEM veel. Old English Sheepdogs vereisen dagelijks borstelen (1-2 uur) om klitten te voorkomen. Hun lange, dikke vacht verzamelt vuil, modder en bladeren. Professionele grooming elke 6-8 weken is essentieel. Dit is één van de meest onderhoudsintensieve rassen."
    },
    {
      question: "Kunnen Old English Sheepdogs goed zien?",
      answer: "Ja, ze kunnen goed zien, hoewel hun haar vaak over hun ogen valt. Fokkers laten het haar groeien voor shows, maar veel eigenaren trimmen het voor comfort. Het haar beschermt oorspronkelijk hun ogen tijdens het hoeden."
    },
    {
      question: "Zijn Old English Sheepdogs goed met kinderen?",
      answer: "Ja, Old English Sheepdogs zijn uitstekend met kinderen. Ze zijn geduldig, beschermend en speels. Hun 'nanny dog' instinct maakt ze waakzaam over kinderen. Wel zijn ze groot en kunnen jonge kinderen omverstoten tijdens spelen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Old English Sheepdogs?",
      answer: "Old English Sheepdogs kunnen gevoelig zijn voor heupdysplasie, oogproblemen (cataract, PRA), hypothyreoïdie, cerebellair ataxie (neurologische aandoening), en maagdraaiing. Kies een fokker die screent. Levensverwachting: 10-12 jaar."
    },
    {
      question: "Wat kost een Old English Sheepdog pup?",
      answer: "Een Old English Sheepdog pup met stamboom kost tussen €1.200 en €2.500 in België/Nederland. Show-kwaliteit pups zijn duurder (tot €3.000). Let op: de aanschafprijs is laag vergeleken met de levenslange vachtkosten."
    }
  ],
  funFacts: [
    "Old English Sheepdogs waren het gezicht van Dulux verf – het 'Dulux Dog' werd een iconisch marketingsymbool sinds de jaren '60.",
    "Ze worden vaak 'Bobtails' genoemd omdat hun staart traditioneel werd gecoupeerd (nu verboden in veel landen). Sommige worden geboren zonder staart.",
    "Hun kenmerkende blaffende 'OES hoest' klinkt als een bellend schaap – perfect voor het hoeden.",
    "In de 19e eeuw werden Old English Sheepdogs gebruikt om vee naar de markt te drijven. Hun lange vacht beschermde hen tegen alle weersomstandigheden.",
    "Ze hebben een 'beer-achtige' manier van lopen waarbij hun achterhand heen en weer beweegt – dit wordt de 'OES roll' genoemd.",
    "Paul McCartney van The Beatles had een Old English Sheepdog genaamd 'Martha', die de inspiratie was voor het Beatles-nummer 'Martha My Dear'."
  ],
  history: {
    origin: "De Old English Sheepdog ontstond in het westen van Engeland (vooral Devon, Somerset en Cornwall) in de vroege tot midden 19e eeuw. Ze werden ontwikkeld door boeren die een robuuste, weerbestendige hond nodig hadden om schapen en runderen naar de markt te drijven over lange afstanden.",
    development: "Het exacte ontstaan is onduidelijk, maar het ras is waarschijnlijk een mix van Schotse Bearded Collies, Russische Owtcharka's en mogelijk lokale herdershonden. De lange, dichte vacht ontwikkelde zich om bescherming te bieden tegen het harde Engelse weer. Hun staarten werden gecoupeerd (vandaar 'Bobtail') omdat herders belastingvrijstelling kregen voor werkende honden zonder staart.\n\nIn 1873 werd de eerste Old English Sheepdog tentoongesteld op een show in Birmingham. Het ras groeide snel in populariteit bij de rijke elite, die werden gecharmeerd door hun teddybeer-achtige uiterlijk. In 1888 werd de Old English Sheepdog Club opgericht. Het ras werd in de 20e eeuw populair als showhond en gezinshond, vooral na de Dulux-reclamecampagnes. Tegenwoordig worden ze zelden voor werk gebruikt maar zijn geliefde (hoewel hoog-onderhoud) gezinshonden."
  },
  similarBreeds: [
    "Bearded Collie",
    "Briard",
    "Polish Lowland Sheepdog",
    "Bergamasco"
  ],
  commonMistakes: [
    "Onderschatten van de vachtverzorging: Dit is het #1 probleem. Verwacht 1-2 uur dagelijks borstelen. Zonder dit krijg je pijnlijke klitten.",
    "Niet trainen vanaf puppyleeftijd: Old English Sheepdogs zijn groot en sterk. Zonder training trekken ze je aan de lijn en nemen ze de leiding.",
    "Te veel voer geven: Ze zijn gevoelig voor obesitas. Volg voedingsrichtlijnen strikt en beperk snacks.",
    "Haar over ogen laten groeien: Dit beperkt hun zicht en kan leiden tot ooginfecties. Trim het haar of bind het vast.",
    "Niet socialiseren: Ze kunnen terughoudend zijn tegenover vreemden. Vroege socialisatie is essentieel.",
    "Geen planning voor grooming-kosten: Professionele grooming kost €70-€120 per sessie, elke 6-8 weken. Dit is een levenslange, aanzienlijke kostenpost."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€30-€60",
    grooming: "€80-€150",
    insurance: "€25-€50",
    total: "€195-€360",
    note: "Old English Sheepdogs zijn één van de duurste rassen qua onderhoud. Professionele grooming kost €70-€120 per sessie (elke 6-8 weken). Verwacht dagelijks 1-2 uur borstelen. Houd rekening met kosten voor gespecialiseerde borstels (€80-€150), shampoos, en mogelijke hoge dierenarts kosten. Eenmalig: aanschaf €1.200-€2.500."
  }
};

// ===== 111. Komondor =====
export const komondor: BreedDetails = {
  breedName: "Komondor",
  breedNameNL: "Komondor",
  faqs: [
    {
      question: "Waarom heeft een Komondor dreadlocks?",
      answer: "De Komondor heeft een unieke 'corded' vacht (dreadlocks/vlechten) die zich natuurlijk ontwikkelt vanaf 9-12 maanden. Deze vacht beschermt hen tegen roofdieren (wolven, beren) en extreme weersomstandigheden. Het maakt ze ook onherkenbaar tussen schapen."
    },
    {
      question: "Is een Komondor geschikt voor beginners?",
      answer: "Absoluut niet. Komondors zijn extreem eigenwijs, beschermend en territoriaal. Ze zijn gefokt om zelfstandig kuddes te bewaken zonder menselijke supervisie. Ze vereisen een zeer ervaren baas die natuurlijk leiderschap kan tonen. Geen ras voor beginners."
    },
    {
      question: "Hoeveel beweging heeft een Komondor nodig?",
      answer: "Komondors zijn verrassend gematigd in beweging. Ze hebben 1 uur wandeling per dag nodig maar zijn geen marathonlopers. Ze zijn bewakers, geen herders. Hun energie gaat naar patrouilleren en waakzaamheid, niet naar rennen."
    },
    {
      question: "Hoe verzorg je de vacht van een Komondor?",
      answer: "De vacht vereist GESPECIALISEERDE verzorging. Vanaf 9 maanden moet je de vlechten handmatig scheiden om klitten te voorkomen (uren per week). Baden duurt 3-4 uur en drogen kan 2-3 DAGEN duren. Veel eigenaren scheren ze kort – anders is de verzorging overweldigend."
    },
    {
      question: "Zijn Komondors agressief?",
      answer: "Komondors zijn niet agressief maar ZEER beschermend en territoriaal. Ze zijn gefokt om roofdieren te doden. Zonder socialisatie kunnen ze agressief worden tegenover vreemden, andere honden en onbekende situaties. Ze zijn niet geschikt voor drukke omgevingen."
    },
    {
      question: "Zijn Komondors goed met kinderen?",
      answer: "Met goede socialisatie kunnen Komondors goed zijn met kinderen van hun eigen gezin – ze zijn zeer beschermend. Ze tolereren GEEN ruwe behandeling en kunnen vreemde kinderen als bedreiging zien. Niet aanbevolen voor gezinnen met jonge kinderen of veel bezoek."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Komondors?",
      answer: "Komondors kunnen gevoelig zijn voor heupdysplasie, maagdraaiing, oogproblemen (entropion) en huidinfecties onder de vlechten. Hun grote formaat verkort hun levensverwachting. Levensverwachting: 10-12 jaar."
    },
    {
      question: "Wat kost een Komondor pup?",
      answer: "Een Komondor pup met stamboom kost tussen €1.500 en €3.000 in Europa. Ze zijn zeldzaam buiten Hongarije. Wachtlijsten zijn normaal. Kies een fokker die socialisatie en temperament test serieus neemt."
    }
  ],
  funFacts: [
    "Komondors werden in de 9e eeuw door nomadische Magyars naar Hongarije gebracht. Ze bewaken al meer dan 1.000 jaar Hongaarse kuddes.",
    "Hun vacht is zo dik dat wolven hun tanden breken als ze proberen te bijten – de vlechten werken als natuurlijk pantser.",
    "Een volwassen Komondor heeft meer dan 2.000 individuele vlechten die elk tot 30 cm lang kunnen worden.",
    "Ze zijn één van de grootste herdershonden ter wereld: mannetjes wegen 50-60 kg en kunnen tot 80 cm schouderhoogte bereiken.",
    "Komondors blaften zelden – ze grommen diep als waarschuwing. Als ze blaffen, is er een serieuze bedreiging.",
    "In WO II beschermden Komondors Hongaarse boerderijen zo fel tegen Duitse en Russische troepen dat veel werden gedood. Het ras raakte bijna uitgestorven."
  ],
  history: {
    origin: "De Komondor is een oude Hongaarse ras dat meer dan 1.000 jaar teruggaat. Ze werden naar Hongarije gebracht door nomadische Magyaren (voorouders van moderne Hongaren) rond de 9e eeuw. Deze stammen brachten hun kuddes en vee mee, samen met grote witte honden om ze te bewaken tegen wolven, beren en dieven.",
    development: "De Komondor werd gefokt om zelfstandig te werken zonder menselijke begeleiding. Ze leefden dag en nacht met de kudde in de velden, waarbij hun witte vacht hen camoufleerde tussen schapen. Hun corded vacht ontwikkelde zich als bescherming tegen roofdieren en het Hongaarse klimaat (hete zomers, vrieskou in winter).\n\nTot de 20e eeuw waren Komondors strikt werkende bewakers. In 1920 werd het ras officieel erkend door de FCI. Tijdens WO II werd het ras zwaar getroffen – Komondors verdedigden boerderijen zo fel dat veel werden gedood door invasietroepen. Het ras raakte bijna uitgestorven maar werd gered door Hongaarse fokkers. Tegenwoordig zijn Komondors zeldzaam maar gewaardeerd als bewakers van boerderijen, landgoederen en kuddes wereldwijd. Ze zijn NIET geschikt als gewone gezinshonden."
  },
  similarBreeds: [
    "Kuvasz (ook Hongaars, maar gladde vacht)",
    "Puli (kleiner, ook corded vacht)",
    "Pyrenese Berghond",
    "Maremmano-Abruzzese"
  ],
  commonMistakes: [
    "Kopen als 'cool' showhond: Komondors zijn GEEN huisdieren. Ze zijn werkende bewakers. Zonder kudde of groot terrein zijn ze ongelukkig.",
    "Onderschatten van beschermend gedrag: Ze zien vreemden als bedreigingen. Dit is niet te 'trainen' – het is genetisch.",
    "Onvoldoende socialisatie: Zonder INTENSE vroege socialisatie worden ze gevaarlijk agressief tegenover alles buiten hun gezin.",
    "Geen ervaring met vachtverzorging: De vlechten vereisen gespecialiseerde kennis. Zonder dit krijg je huidinfecties, schimmel en stank.",
    "Verwachten dat ze gehoorzaam zijn: Komondors zijn NIET gehoorzaam als Labradors. Ze denken zelfstandig en negeren commando's als ze die onnodig vinden.",
    "Te weinig ruimte: Een appartement of kleine tuin is te beperkend. Komondors hebben ruimte nodig om te patrouilleren."
  ],
  monthlyCosts: {
    food: "€70-€120",
    vet: "€30-€70",
    grooming: "€0-€200",
    insurance: "€30-€60",
    total: "€130-€450",
    note: "Grooming-kosten variëren enorm. Als je ze zelf verzorgt: €0 maar 5-10 uur per maand. Professioneel: €100-€200 per sessie (zeldzaam – veel groomers weigeren Komondors). Veel eigenaren scheren ze kort (€80-€150, 2x per jaar). Houd rekening met hoge voedselkosten (groot ras) en mogelijke dierenarts kosten. Eenmalig: aanschaf €1.500-€3.000."
  }
};

// ===== 112. Kuvasz =====
export const kuvasz: BreedDetails = {
  breedName: "Kuvasz",
  breedNameNL: "Kuvasz",
  faqs: [
    {
      question: "Wat is het verschil tussen een Kuvasz en een Komondor?",
      answer: "Beide zijn Hongaarse bewakershonden, maar de Kuvasz heeft een gladde, witte vacht, terwijl de Komondor dreadlocks heeft. Kuvasz is iets vriendelijker en geschikter als gezinshond (maar nog steeds uitdagend). Komondors zijn extremer in beschermend gedrag."
    },
    {
      question: "Is een Kuvasz geschikt voor beginners?",
      answer: "Nee, Kuvasz zijn niet geschikt voor beginners. Ze zijn zeer eigenwijs, beschermend en territoriaal. Ze zijn gefokt om zelfstandig te werken en vereisen een ervaren baas met natuurlijk leiderschap. Ze zijn minder intens dan Komondors maar nog steeds uitdagend."
    },
    {
      question: "Hoeveel beweging heeft een Kuvasz nodig?",
      answer: "Een Kuvasz heeft 1-1,5 uur beweging per dag nodig. Ze zijn geen marathonlopers maar hebben ruimte nodig om te patrouilleren. Een groot, omheind terrein is ideaal. Ze zijn bewakers, geen actieve sporthonden."
    },
    {
      question: "Zijn Kuvasz agressief?",
      answer: "Kuvasz zijn niet agressief maar ZEER beschermend en wantrouwig tegenover vreemden. Ze zijn gefokt om roofdieren te verdrijven en zullen hun territoor verdedigen. Zonder socialisatie kunnen ze agressief worden. Ze zijn niet geschikt voor drukke omgevingen of veel bezoek."
    },
    {
      question: "Zijn Kuvasz goed met kinderen?",
      answer: "Met goede socialisatie kunnen Kuvasz uitstekend zijn met kinderen van hun eigen gezin – ze zijn zeer beschermend. Ze tolereren echter geen ruwe behandeling en kunnen vreemde kinderen als bedreiging zien. Niet ideaal voor gezinnen met jonge kinderen of veel spelende vriendjes."
    },
    {
      question: "Hoeveel verzorging heeft een Kuvasz nodig?",
      answer: "Kuvasz hebben een dikke, dubbele witte vacht die matig verhaart. Borstel 2-3x per week, dagelijks tijdens verhaarperiodes (voorjaar/najaar). Hun vacht is zelfonderhoudend en blijft verrassend schoon. Baden is zelden nodig (2-3x per jaar)."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Kuvasz?",
      answer: "Kuvasz kunnen gevoelig zijn voor heupdysplasie, elleboogdysplasie, hypothyreoïdie (schildklieraandoening), Von Willebrand's ziekte (bloedstollingsstoornis) en maagdraaiing. Kies een fokker die screent. Levensverwachting: 10-12 jaar."
    },
    {
      question: "Wat kost een Kuvasz pup?",
      answer: "Een Kuvasz pup met stamboom kost tussen €1.200 en €2.500 in Europa. Ze zijn zeldzamer buiten Hongarije. Wachtlijsten zijn normaal. Kies een fokker die socialisatie en temperament-screening serieus neemt."
    }
  ],
  funFacts: [
    "De naam 'Kuvasz' komt van het Turkse woord 'kawasz', wat 'bewaker' of 'beschermer' betekent.",
    "In de 15e eeuw waren Kuvasz zo gewaardeerd dat alleen Hongaarse adel ze mocht bezitten. Koning Matthias Corvinus had een kennel vol Kuvasz en vertrouwde ze meer dan zijn hofhouding.",
    "Kuvasz werden tijdens renaissancetijden gebruikt om jachtwild te bewaken – hun witte vacht maakte ze zichtbaar in het donker, zodat jagers niet per ongeluk op hen schoten.",
    "Ze zijn één van de weinige rassen waarbij pups vaak blauwe ogen hebben die later veranderen in amberkleurig.",
    "Tijdens WO II raakte het ras bijna uitgestorven – naar schatting bleven er minder dan 30 exemplaren over in Hongarije. Alle moderne Kuvasz stammen van deze kleine groep.",
    "Kuvasz hebben een 'zesde zintuig' voor gevaar en reageren vaak op bedreigingen voordat hun baas iets opmerkt."
  ],
  history: {
    origin: "De Kuvasz is een oude Hongaarse ras met wortels die teruggaan tot de 9e eeuw, toen nomadische Magyaren (voorouders van moderne Hongaren) het Karpatisch Bekken bereikten. Ze brachten grote witte honden mee om hun kuddes te bewaken tegen wolven, beren en dieven. Deze honden zijn de voorouders van de Kuvasz.",
    development: "Tijdens de Middeleeuwen en Renaissance werden Kuvasz geliefd bij Hongaarse adel, vooral koning Matthias Corvinus (1458-1490), die een grote kennel Kuvasz onderhield en ze meer vertrouwde dan zijn adviseurs. Ze werden gebruikt als bewakers, jachthonden en gezelschap voor de elite.\n\nNa de val van de Hongaarse aristocratie keerden Kuvasz terug naar hun wortels als kuddebewakers op boerderijen. Het ras werd in 1934 officieel erkend door de FCI. Tijdens WO II werd het ras zwaar getroffen – nazi's en Sovjettroepen doodden Kuvasz die boerderijen verdedigden. Minder dan 30 exemplaren overleefden. Hongaarse fokkers herbouwden het ras moeizaam vanaf de jaren '50. Tegenwoordig zijn Kuvasz zeldzaam maar gewaardeerd als bewakers van landgoederen, boerderijen en kuddes wereldwijd."
  },
  similarBreeds: [
    "Komondor",
    "Pyrenese Berghond",
    "Maremmano-Abruzzese Herdershond",
    "Slowaakse Cuvac"
  ],
  commonMistakes: [
    "Kopen zonder ervaring met beschermende rassen: Kuvasz zijn GEEN golden retrievers. Ze zijn wantrouwig en territoriaal.",
    "Onvoldoende socialisatie: Zonder INTENSE vroege socialisatie worden ze gevaarlijk agressief tegenover vreemden.",
    "Geen groot, omheind terrein: Kuvasz zijn ongelukkig in appartementen of kleine tuinen. Ze hebben ruimte nodig om te patrouilleren.",
    "Verwachten dat ze gehoorzaam zijn: Kuvasz denken zelfstandig en negeren commando's als ze die onnodig vinden. Ze zijn geen Duitse Herders.",
    "Te veel vreemden in huis: Kuvasz tolereren geen constante bezoekers. Ze zijn het gelukkigst in rustige, voorspelbare omgevingen.",
    "Geen consequent leiderschap: Dit ras heeft een sterke, kalme leider nodig. Zwakte wordt uitgebuit."
  ],
  monthlyCosts: {
    food: "€70-€120",
    vet: "€30-€60",
    grooming: "€15-€40",
    insurance: "€25-€50",
    total: "€140-€270",
    note: "Kuvasz zijn relatief goedkoop in verzorging (zelfonderhoudende vacht). Houd wel rekening met hoge voedselkosten (groot ras), mogelijk hogere dierenarts kosten door heupdysplasie, en sterke omheining voor groot terrein. Eenmalig: aanschaf €1.200-€2.500, omheining €1.000-€5.000+."
  }
};

// ===== 113. Maremmano-Abruzzese Herdershond =====
export const maremmaNoAbruzzese: BreedDetails = {
  breedName: "Maremma Sheepdog",
  breedNameNL: "Maremmano-Abruzzese Herdershond",
  faqs: [
    {
      question: "Wat is een Maremmano-Abruzzese Herdershond?",
      answer: "De Maremmano-Abruzzese is een Italiaanse kuddebewaker met een grote, witte vacht. Ze zijn gefokt om kuddes schapen te bewaken tegen wolven en beren in de Italiaanse bergen. Ze zijn zelfstandig, beschermend en niet geschikt als gewone gezinshond."
    },
    {
      question: "Is een Maremmano-Abruzzese geschikt voor beginners?",
      answer: "Absoluut niet. Maremmanos zijn extreem eigenwijs, beschermend en territoriaal. Ze zijn gefokt om zelfstandig te werken zonder menselijke supervisie en vereisen een zeer ervaren baas. Ze zijn niet gehoorzaam en negeren commando's als ze die onnodig vinden."
    },
    {
      question: "Hoeveel beweging heeft een Maremmano-Abruzzese nodig?",
      answer: "Maremmanos hebben 1 uur wandeling per dag nodig maar zijn geen actieve sporthonden. Ze zijn bewakers die energie besteden aan patrouilleren, niet rennen. Een groot, omheind terrein waar ze kunnen patrouilleren is essentieel."
    },
    {
      question: "Zijn Maremmanos agressief?",
      answer: "Maremmanos zijn niet agressief maar ZEER beschermend en territoriaal. Ze zijn gefokt om roofdieren te doden. Zonder socialisatie kunnen ze agressief worden tegenover vreemden, andere honden en onbekende situaties. Ze zijn niet geschikt voor drukke omgevingen."
    },
    {
      question: "Zijn Maremmanos goed met kinderen?",
      answer: "Met goede socialisatie kunnen Maremmanos goed zijn met kinderen van hun eigen gezin – ze zijn zeer beschermend. Ze tolereren echter geen ruwe behandeling en kunnen vreemde kinderen als bedreiging zien. Niet aanbevolen voor gezinnen met jonge kinderen of veel bezoek."
    },
    {
      question: "Hoeveel verzorging heeft een Maremmano-Abruzzese nodig?",
      answer: "Maremmanos hebben een dikke, weerbestendige witte vacht die gematigd verhaart. Borstel 2-3x per week, dagelijks tijdens verhaarperiodes (voorjaar/najaar). Hun vacht is zelfonderhoudend en blijft verrassend schoon. Baden is zelden nodig."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Maremmanos?",
      answer: "Maremmanos zijn over het algemeen gezond en robuust. Ze kunnen gevoelig zijn voor heupdysplasie, maagdraaiing en oogproblemen (entropion). Door hun grote formaat hebben ze een kortere levensverwachting. Levensverwachting: 10-13 jaar."
    },
    {
      question: "Wat kost een Maremmano-Abruzzese pup?",
      answer: "Een Maremmano-Abruzzese pup met stamboom kost tussen €800 en €1.800 in Europa. Ze zijn zeldzaam buiten Italië. Wachtlijsten zijn normaal. Kies een fokker die socialisatie serieus neemt en bij voorkeur met kuddes werkt."
    }
  ],
  funFacts: [
    "Maremmanos worden in Australië massaal ingezet om pinguïnkolonies te beschermen tegen vossen – het 'Maremma Project' redde de Middle Island pinguïns van uitsterving.",
    "Ze leven vaak maandenlang alleen met kuddes in de bergen zonder menselijk contact – hun zelfstandigheid is extreem.",
    "Hun witte vacht camoufleerde hen tussen schapen, waardoor roofdieren hen niet zagen tot het te laat was.",
    "Maremmanos blaffen zelden tijdens het hoeden maar grommen diep en dreigend als ze een bedreiging detecteren.",
    "Ze kunnen temperaturen van -20°C tot +40°C tolereren dankzij hun dichte, gelaagde vacht.",
    "In Italië worden ze nog steeds gebruikt om kuddes te bewaken in de Abruzzi-bergen, waar wolven en beren voorkomen."
  ],
  history: {
    origin: "De Maremmano-Abruzzese Herdershond is een oude Italiaanse ras met wortels die minstens 2.000 jaar teruggaan. Ze ontwikkelden zich in de regio's Maremma (Toscane) en Abruzzi (centraal Italië) als kuddebewakers. Romeinse schrijvers beschreven al grote witte honden die kuddes beschermden tegen wolven.",
    development: "Eeuwenlang werkten deze honden zelfstandig in de bergen, waar ze kuddes schapen bewakten tijdens seizoensgebonden trekken tussen zomer- en winterweiden. Ze leefden maanden zonder menselijk contact en moesten zelfstandig beslissingen nemen om roofdieren te verdrijven.\n\nTot 1958 werden de Maremma (uit Toscane) en Abruzzese (uit Abruzzi) als aparte rassen beschouwd, maar ze werden samengevoegd omdat ze vrijwel identiek waren. Het ras werd officieel erkend door de FCI. Tijdens de 20e eeuw nam het aantal wolven in Italië af, maar Maremmanos bleven populair als kuddebewakers. Tegenwoordig worden ze wereldwijd ingezet om kuddes, pinguïnkolonies en landgoederen te beschermen. Ze zijn NIET geschikt als gewone huisdieren."
  },
  similarBreeds: [
    "Kuvasz",
    "Pyrenese Berghond",
    "Slowaakse Cuvac",
    "Akbash"
  ],
  commonMistakes: [
    "Kopen als gezinshond: Maremmanos zijn GEEN huisdieren. Ze zijn werkende bewakers. Zonder kudde of groot terrein zijn ze ongelukkig.",
    "Onderschatten van beschermend gedrag: Ze zien vreemden als bedreigingen. Dit is genetisch en niet weg te trainen.",
    "Onvoldoende socialisatie: Zonder INTENSE vroege socialisatie worden ze gevaarlijk agressief tegenover alles buiten hun gezin.",
    "Geen groot, omheind terrein: Maremmanos zijn ongelukkig in appartementen of kleine tuinen. Ze hebben hectares nodig om te patrouilleren.",
    "Verwachten dat ze gehoorzaam zijn: Maremmanos zijn NIET gehoorzaam. Ze denken zelfstandig en negeren commando's.",
    "Te veel interactie verwachten: Maremmanos zijn geen knuffelhonden. Ze zijn onafhankelijk en prefereren afstand tot hun werk."
  ],
  monthlyCosts: {
    food: "€70-€120",
    vet: "€25-€50",
    grooming: "€10-€30",
    insurance: "€25-€50",
    total: "€130-€250",
    note: "Maremmanos zijn relatief goedkoop in verzorging. Houd wel rekening met hoge voedselkosten (groot ras), sterke omheining voor groot terrein (€1.000-€5.000+), en mogelijke dierenarts kosten door heupdysplasie. Eenmalig: aanschaf €800-€1.800."
  }
};

// ===== 114. Bergamasco =====
export const bergamasco: BreedDetails = {
  breedName: "Bergamasco Shepherd",
  breedNameNL: "Bergamasco",
  faqs: [
    {
      question: "Waarom heeft een Bergamasco zo'n vreemde vacht?",
      answer: "De Bergamasco heeft een unieke 'gefilte' vacht die zich vanaf 1 jaar ontwikkelt in platte, viltige lagen (flocks). Deze vacht beschermt hen tegen extreme weersomstandigheden in de Italiaanse Alpen en tegen roofdieren. Het is een natuurlijk proces dat minimale verzorging vereist."
    },
    {
      question: "Is een Bergamasco geschikt voor beginners?",
      answer: "Nee, Bergamascos zijn niet ideaal voor beginners. Ze zijn intelligent, eigenwijs en onafhankelijk. Ze zijn minder intens dan Border Collies maar vereisen wel ervaring, consequente training en begrip van hun unieke vacht. Gemotiveerde beginners kunnen slagen met goede begeleiding."
    },
    {
      question: "Hoeveel beweging heeft een Bergamasco nodig?",
      answer: "Een Bergamasco heeft 1-1,5 uur beweging per dag nodig. Ze zijn minder energiek dan Border Collies maar houden van wandelen, herding en mentale uitdaging. Ze zijn geschikt voor gematigde activiteiten en gedijen in bergachtige omgevingen."
    },
    {
      question: "Hoe verzorg je de vacht van een Bergamasco?",
      answer: "De vacht is verrassend onderhoudsarm NA het eerste jaar. Vanaf 9-12 maanden moet je de flocks handmatig scheiden (ripping) om ze in platte lagen te laten groeien. Dit duurt enkele uren. Daarna is minimale verzorging nodig – NOOIT borstelen. Baden is zelden nodig (2-3x per jaar) en drogen duurt lang."
    },
    {
      question: "Zijn Bergamascos goed met kinderen?",
      answer: "Ja, Bergamascos zijn uitstekend met kinderen. Ze zijn geduldig, beschermend en speels. Hun hoedinstinct is mild en ze zijn zachter dan Border Collies. Ze zijn goede gezinshonden voor actieve gezinnen die hun vacht begrijpen."
    },
    {
      question: "Ruikt een Bergamasco niet naar natte hond?",
      answer: "Nee! Ondanks hun dikke vacht ruiken Bergamascos zelden honds. Hun vacht is zelfonderhoudend en droogt snel. Ze moeten zelden gebaad worden. Als ze nat zijn, kunnen ze wel sterker ruiken, maar dit verdwijnt snel."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Bergamascos?",
      answer: "Bergamascos zijn over het algemeen gezond en robuust. Ze kunnen gevoelig zijn voor heupdysplasie en enkele oogproblemen. Door de kleine genenpool is genetische diversiteit belangrijk. Levensverwachting: 13-15 jaar (lang voor een groot ras)."
    },
    {
      question: "Wat kost een Bergamasco pup?",
      answer: "Een Bergamasco pup met stamboom kost tussen €1.500 en €2.500 in Europa. Ze zijn zeldzaam buiten Italië. Wachtlijsten van 1-2 jaar zijn normaal. Kies een fokker die vachtmangement en socialisatie serieus neemt."
    }
  ],
  funFacts: [
    "De Bergamasco is één van de oudste Europese hondenrassen – ze werden al beschreven door Romeinse schrijvers 2.000 jaar geleden.",
    "Hun vacht bestaat uit drie soorten haar: 'dog' (ondervacht), 'goat' (ruig buitenhaar) en 'wool' (wol). Deze vermengen zich tot de unieke flocks.",
    "Bergamascos werden gebruikt om kuddes over de Alpen te drijven tijdens seizoensmigraties – hun vacht beschermde hen tegen sneeuw en kou.",
    "Ze zijn één van de weinige rassen waarbij de vacht NOOIT geborsteld mag worden – borstelen vernietigt de natuurlijke flocks.",
    "Bergamasco pups worden geboren met zachte vacht die pas vanaf 9-12 maanden begint te vilten.",
    "Het ras stond in de jaren '60 op het punt van uitsterven maar werd gered door één fokker: Maria Andreoli, die het ras herbouwde."
  ],
  history: {
    origin: "De Bergamasco is een oude Italiaanse ras afkomstig uit de Alpen nabij Bergamo (Noord-Italië). Ze stammen waarschijnlijk af van honden die door nomadische herders werden gebracht naar Italië vanuit het Midden-Oosten meer dan 2.000 jaar geleden. Ze werden gebruikt om kuddes schapen te hoeden in de ruige, bergachtige terreinen van de Italiaanse Alpen.",
    development: "Eeuwenlang waren Bergamascos onmisbaar voor Italiaanse herders. Hun unieke vacht ontwikkelde zich als bescherming tegen extreme weersomstandigheden (koude winters, hete zomers) en roofdieren (wolven, beren). De gefilte lagen werkten als natuurlijk pantser en isolatie.\n\nDe industrialisatie van de landbouw in de 20e eeuw reduceerde de behoefte aan herdershonden dramatisch. In de jaren '60 stond het ras op het punt van uitsterven. Maria Andreoli, een gepassioneerde fokster, redde het ras door toegewijde fokkerij en het promoten van hun unieke eigenschappen. Het ras werd officieel erkend door de FCI in 1956. Tegenwoordig zijn Bergamascos zeldzaam maar gewaardeerd als veelzijdige herdershonden en unieke gezinshonden voor liefhebbers van zeldzame rassen."
  },
  similarBreeds: [
    "Komondor (ook gevilte vacht, maar corded)",
    "Puli (kleiner, ook gevilte vacht)",
    "Catalan Sheepdog",
    "Bearded Collie"
  ],
  commonMistakes: [
    "Proberen de vacht te borstelen: NOOIT borstelen! Dit vernietigt de natuurlijke flocks en leidt tot een oncontroleerbare wirwar.",
    "Te vaak baden: Bergamascos hoeven maar 2-3x per jaar gebaad te worden. Te vaak baden verstoort de natuurlijke oliën.",
    "Flocks niet scheiden: Vanaf 9-12 maanden MOET je de flocks handmatig scheiden (ripping). Zonder dit klitteren ze tot één grote massa.",
    "Te weinig socialisatie: Bergamascos kunnen terughoudend zijn. Vroege socialisatie is essentieel.",
    "Verwachten dat ze snel gehoorzamen: Bergamascos denken zelfstandig en kunnen koppig zijn. Training vereist geduld.",
    "Geen mentale uitdaging: Ze zijn intelligent en vervelen zich zonder puzzels of werk."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€20-€40",
    grooming: "€0-€30",
    insurance: "€20-€40",
    total: "€90-€190",
    note: "Bergamascos zijn goedkoop in verzorging (zelfonderhoudende vacht). Professionele grooming is NIET aanbevolen – doe het zelf. Houd rekening met kosten voor speciaal speelgoed, training, en mogelijke hogere verzekeringspremies door zeldzaamheid. Eenmalig: aanschaf €1.500-€2.500, lange wachtlijsten."
  }
};

// ===== 115. Briard =====
export const briard: BreedDetails = {
  breedName: "Briard",
  breedNameNL: "Briard",
  faqs: [
    {
      question: "Wat is een Briard?",
      answer: "De Briard is een grote Franse herdershond met een lange, golvende vacht en een kenmerkende 'baard' en wenkbrauwen. Ze zijn intelligent, loyaal en energiek. Ze werden oorspronkelijk gebruikt om kuddes te hoeden en te beschermen in Frankrijk."
    },
    {
      question: "Is een Briard geschikt voor beginners?",
      answer: "Nee, Briards zijn niet ideaal voor beginners. Ze zijn zeer intelligent, energiek en eigenwijs. Ze vereisen consequente training, voldoende beweging en INTENSE vachtverzorging. Gemotiveerde beginners met tijd kunnen slagen, maar het is uitdagend."
    },
    {
      question: "Hoeveel beweging heeft een Briard nodig?",
      answer: "Een Briard heeft minimaal 1,5-2 uur beweging per dag nodig, plus mentale stimulatie. Ze houden van wandelen, rennen, herding en agility. Zonder voldoende uitdaging worden ze destructief of ontwikkelen gedragsproblemen."
    },
    {
      question: "Hoeveel verzorging heeft een Briard nodig?",
      answer: "Briards vereisen INTENSE vachtverzorging. Borstel minimaal 3-4x per week (30-60 minuten per sessie) om klitten te voorkomen. Hun lange, golvende vacht verzamelt vuil en klit snel. Professionele grooming elke 6-8 weken is aanbevolen. Dit is één van de meest onderhoudsintensieve rassen."
    },
    {
      question: "Zijn Briards goed met kinderen?",
      answer: "Ja, Briards zijn uitstekend met kinderen van hun eigen gezin. Ze zijn beschermend, geduldig en speels. Wel hebben ze een sterk hoedinstinct en kunnen proberen kinderen te 'hoeden' door duwen of hakken bijten. Train dit af en leer kinderen respectvol met de hond omgaan."
    },
    {
      question: "Zijn Briards goede waakhonden?",
      answer: "Ja, Briards zijn uitstekende waakhonden. Ze zijn beschermend, alert en wantrouwig tegenover vreemden. Ze blaffen om bezoekers aan te kondigen. Met goede socialisatie zijn ze niet agressief maar wel territoriaal."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Briards?",
      answer: "Briards kunnen gevoelig zijn voor heupdysplasie, elleboogdysplasie, progressieve retina-atrofie (PRA), hypothyreoïdie, maagdraaiing en Von Willebrand's ziekte (bloedstollingsstoornis). Kies een fokker die screent. Levensverwachting: 10-12 jaar."
    },
    {
      question: "Wat kost een Briard pup?",
      answer: "Een Briard pup met stamboom kost tussen €1.200 en €2.000 in België/Nederland. Ze zijn relatief zeldzaam. Show-kwaliteit pups zijn duurder (tot €2.500). Controleer altijd gezondheidsscreenings en vraag naar temperamenten."
    }
  ],
  funFacts: [
    "Briards werden tijdens WO I massaal ingezet als oorlogshonden door het Franse leger – ze zochten gewonden, droegen berichten en bewakten troepen. Duizenden Briards stierven in dienst.",
    "Napoleon Bonaparte, Thomas Jefferson en Lafayette hadden allemaal Briards – het ras was populair bij de Franse elite.",
    "Briards hebben dubbele dauwklauwen (extra tenen) aan hun achterpoten – een kenmerk van het ras. Deze werden gebruikt voor grip in bergachtige terreinen.",
    "Hun lange vacht beschermde hen tegen roofdieren (wolven) en weersomstandigheden – het werkte als natuurlijk pantser.",
    "De Briard is de officiële hond van de Franse marine – ze worden gebruikt voor zoek- en reddingsoperaties.",
    "Hun kenmerkende 'watervalgel' (cascading fall) ogen zijn vaak verborgen onder lange wenkbrauwen – dit beschermde hun ogen tijdens het hoeden."
  ],
  history: {
    origin: "De Briard is een oude Franse ras dat minstens 1.000 jaar teruggaat. Ze zijn vernoemd naar de regio Brie in Noord-Frankrijk, hoewel ze in heel Frankrijk voorkwamen. Ze werden gebruikt als veelzijdige boerenhonden: kuddes hoeden, vee beschermen tegen roofdieren (wolven) en boerderijen bewaken.",
    development: "In de Middeleeuwen werden Briards gewaardeerd door Franse boeren en adel. Ze werden geselecteerd op werkdrift, intelligentie en veelzijdigheid. Hun lange vacht beschermde hen tegen roofdieren en het Franse klimaat. In 1863 werd de eerste Briard geregistreerd op een hondenshow in Parijs.\n\nDe eerste officiële Briard-standaard werd opgesteld in 1897. Tijdens WO I werden duizenden Briards ingezet door het Franse leger als boodschappenhonden, zoek- en reddingshonden, en wachthonden. Veel stierven in dienst, wat het ras decimeerde. Na de oorlog herbouwden fokkers de populatie. Het ras werd in 1928 erkend door de AKC. Tegenwoordig zijn Briards populair als politie-, zoek-, en therapiehonden, en als loyale gezinshonden voor actieve eigenaren."
  },
  similarBreeds: [
    "Bearded Collie",
    "Bergamasco",
    "Catalan Sheepdog",
    "Polish Lowland Sheepdog"
  ],
  commonMistakes: [
    "Onderschatten van de vachtverzorging: Briards vereisen 3-4x per week intensief borstelen. Zonder dit krijg je pijnlijke klitten.",
    "Te weinig socialisatie: Briards kunnen wantrouwig worden tegenover vreemden. Begin vroeg en blijf socialiseren.",
    "Geen mentale uitdaging: Ze zijn zeer intelligent en vervelen zich snel. Geef puzzels, training of werk.",
    "Inconsistente training: Briards zijn eigenwijs en detecteren zwakheden. Wees consequent maar positief.",
    "Te lang alleen laten: Briards zijn zeer aan hun gezin gehecht en kunnen scheidingsangst ontwikkelen.",
    "Geen uitlaatklep voor energie: Zonder 1,5-2 uur beweging per dag worden ze destructief of hyperactief."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€25-€50",
    grooming: "€50-€100",
    insurance: "€20-€40",
    total: "€155-€290",
    note: "Briards hebben hoge vachtkosten. Professionele grooming kost €60-€100 per sessie (elke 6-8 weken). Verwacht 3-4x per week borstelen (30-60 minuten). Houd rekening met kosten voor gespecialiseerde borstels, shampoos, en mogelijke hogere verzekeringspremies. Eenmalig: aanschaf €1.200-€2.000."
  }
};

// ===== 116. Puli =====
export const puli: BreedDetails = {
  breedName: "Puli",
  breedNameNL: "Puli",
  faqs: [
    {
      question: "Waarom heeft een Puli dreadlocks?",
      answer: "De Puli heeft een unieke 'corded' vacht (dreadlocks/vlechten) die zich natuurlijk ontwikkelt vanaf 9 maanden. Deze vacht beschermt hen tegen extreme weersomstandigheden in Hongarije en roofdieren. Het maakt ze ook onherkenbaar tussen schapen. De vlechten groeien tot op de grond."
    },
    {
      question: "Is een Puli geschikt voor beginners?",
      answer: "Nee, Pulis zijn niet ideaal voor beginners. Ze zijn zeer intelligent, energiek en eigenwijs. Hun unieke vacht vereist gespecialiseerde verzorging. Ze zijn minder intens dan Border Collies maar vereisen wel ervaring en geduld."
    },
    {
      question: "Hoeveel beweging heeft een Puli nodig?",
      answer: "Een Puli heeft 1-1,5 uur beweging per dag nodig. Ze zijn energiek en houden van rennen, springen en agility. Ondanks hun vacht zijn ze verrassend atletisch en wendbaar. Zonder voldoende beweging worden ze destructief."
    },
    {
      question: "Hoe verzorg je de vacht van een Puli?",
      answer: "De vacht vereist GESPECIALISEERDE verzorging. Vanaf 9 maanden moet je de vlechten handmatig scheiden om klitten te voorkomen (uren per maand). NOOIT borstelen – dit vernietigt de vlechten. Baden duurt lang (1-2 uur) en drogen kan 2-4 DAGEN duren. Veel eigenaren scheren ze kort."
    },
    {
      question: "Kunnen Pulis goed zien?",
      answer: "Ja, Pulis kunnen perfect zien ondanks hun vacht die over hun ogen valt. De vlechten beschermen hun ogen maar belemmeren hun zicht niet. Ze kunnen de vlechten opzij schuiven. Sommige eigenaren binden de vlechten vast voor comfort."
    },
    {
      question: "Zijn Pulis goed met kinderen?",
      answer: "Ja, Pulis zijn uitstekend met kinderen. Ze zijn speels, beschermend en energiek. Wel hebben ze een sterk hoedinstinct en kunnen proberen kinderen te 'hoeden'. Ze zijn loyaal en houden van actieve gezinnen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Pulis?",
      answer: "Pulis zijn over het algemeen gezond. Ze kunnen gevoelig zijn voor heupdysplasie, progressieve retina-atrofie (PRA) en huidinfecties onder de vlechten (als niet goed verzorgd). Levensverwachting: 12-16 jaar (lang voor een middelgroot ras)."
    },
    {
      question: "Wat kost een Puli pup?",
      answer: "Een Puli pup met stamboom kost tussen €1.200 en €2.000 in België/Nederland. Ze zijn zeldzaam. Zwarte Pulis zijn het meest voorkomend, witte en grijze zijn zeldzamer en soms duurder. Wachtlijsten zijn normaal."
    }
  ],
  funFacts: [
    "Pulis zijn verrassend atletisch – ze kunnen tot 2 meter hoog springen ondanks hun zware vacht.",
    "Hun vacht is zo dik dat ze eruit zien alsof ze drijven als ze zwemmen – alleen hun kop is zichtbaar boven water.",
    "Mark Zuckerberg (oprichter van Facebook) heeft een Puli genaamd 'Beast' die zijn eigen Facebook-pagina heeft met miljoenen volgers.",
    "Pulis werden door nomadische Magyaren naar Hongarije gebracht in de 9e eeuw – ze zijn meer dan 1.000 jaar oud als ras.",
    "Hun naam 'Puli' betekent 'leider' in het Hongaars – ze leiden kuddes in plaats van ze alleen te bewaken.",
    "Een volwassen Puli kan meer dan 2.000 individuele vlechten hebben die elk tot 30 cm lang worden."
  ],
  history: {
    origin: "De Puli is een oud Hongaars ras dat meer dan 1.000 jaar teruggaat. Ze werden naar Hongarije gebracht door nomadische Magyaren (voorouders van moderne Hongaren) rond de 9e eeuw. Deze stammen brachten hun kuddes mee, samen met kleine, wendbare honden om schapen te hoeden. De Puli werd gefokt als actieve herder, terwijl de grotere Komondor kuddes bewaakt.",
    development: "Eeuwenlang waren Pulis onmisbaar voor Hongaarse herders. Hun corded vacht ontwikkelde zich als bescherming tegen het Hongaarse klimaat (hete zomers, koude winters) en roofdieren. Hun kleine formaat en wendbaarheid maakten ze perfect voor het hoeden van schapen in moeilijke terreinen. Hun zwarte kleur maakte ze zichtbaar tegen witte schapen.\n\nDe industrialisatie van de landbouw in de 20e eeuw reduceerde de behoefte aan herdershonden. Het ras raakte bijna uitgestorven na WO II maar werd gered door toegewijde Hongaarse fokkers. Het ras werd officieel erkend door de FCI in 1924. Tegenwoordig zijn Pulis populair als agility-honden (hun wendbaarheid is fenomenaal), showhonden en loyale gezinshonden voor liefhebbers van unieke rassen."
  },
  similarBreeds: [
    "Komondor (groter, ook corded vacht)",
    "Pumi (Hongaars, maar geen corded vacht)",
    "Bergamasco (gevilte vacht maar in flocks)",
    "Spanish Water Dog"
  ],
  commonMistakes: [
    "Proberen de vacht te borstelen: NOOIT borstelen! Dit vernietigt de vlechten en creëert een oncontroleerbare wirwar.",
    "Te vaak baden: Pulis hoeven maar 3-4x per jaar gebaad te worden. Te vaak baden verstoort de natuurlijke oliën en verlengt droogtijd.",
    "Vlechten niet scheiden: Vanaf 9 maanden MOET je de vlechten handmatig scheiden. Zonder dit klitteren ze tot één massa.",
    "Onderschatten van droogtijd: Baden kan 1-2 uur duren, maar drogen duurt 2-4 DAGEN. Plan vooruit!",
    "Te weinig beweging: Pulis zijn energiek ondanks hun vacht. Zonder beweging worden ze destructief.",
    "Geen mentale uitdaging: Ze zijn zeer intelligent en vervelen zich snel zonder puzzels of training."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€20-€40",
    grooming: "€0-€50",
    insurance: "€20-€40",
    total: "€80-€200",
    note: "Pulis zijn goedkoop als je de vacht zelf verzorgt (€0 maar 5-10 uur per maand). Professioneel: €50-€150 per sessie (zeldzaam – veel groomers weigeren Pulis). Veel eigenaren scheren ze kort (€40-€80, 2-3x per jaar) voor gemakkelijker onderhoud. Eenmalig: aanschaf €1.200-€2.000."
  }
};

// ===== 117. Pumi =====
export const pumi: BreedDetails = {
  breedName: "Pumi",
  breedNameNL: "Pumi",
  faqs: [
    {
      question: "Wat is een Pumi?",
      answer: "De Pumi is een middelgrote Hongaarse herdershond met een krullende, ruige vacht en kenmerkende rechtopstaande, half-gevouwen oren die lijken op Batman. Ze zijn energiek, intelligent en veelzijdig – perfect voor actieve eigenaars die een werkhond willen."
    },
    {
      question: "Is een Pumi geschikt voor beginners?",
      answer: "Pumis kunnen geschikt zijn voor gemotiveerde beginners, maar ze zijn energiek en eigenwijs. Ze vereisen veel beweging, mentale stimulatie en consequente training. Gemotiveerde beginners met tijd en energie kunnen slagen."
    },
    {
      question: "Hoeveel beweging heeft een Pumi nodig?",
      answer: "Een Pumi heeft minimaal 1,5-2 uur beweging per dag nodig, plus mentale stimulatie. Ze houden van rennen, agility, herding, tracking en puzzels. Zonder voldoende uitdaging worden ze destructief of ontwikkelen gedragsproblemen."
    },
    {
      question: "Hoeveel verzorging heeft een Pumi nodig?",
      answer: "Pumis hebben gematigde vachtverzorging. Hun krullende vacht moet 1-2x per week geborsteld worden om klitten te voorkomen. NOOIT te veel borstelen – dit vernietigt de natuurlijke krullen. Trim overtollig haar rond oren en poten elke 2-3 maanden."
    },
    {
      question: "Zijn Pumis goed met kinderen?",
      answer: "Ja, Pumis zijn uitstekend met kinderen. Ze zijn speels, energiek en beschermend. Wel hebben ze een sterk hoedinstinct en kunnen proberen kinderen te 'hoeden'. Vroege socialisatie en training zijn essentieel."
    },
    {
      question: "Zijn Pumis vocaal?",
      answer: "Ja, Pumis zijn zeer vocaal. Ze blaffen om te communiceren, te waarschuwen en uit opwinding. Dit maakt ze goede alarmhonden maar kan irritant zijn voor buren. Train vroeg om excessief blaffen te beperken."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Pumis?",
      answer: "Pumis zijn over het algemeen gezond. Ze kunnen gevoelig zijn voor heupdysplasie, progressieve retina-atrofie (PRA) en patella luxatie (knieschijfproblemen). Kies een fokker die screent. Levensverwachting: 12-14 jaar."
    },
    {
      question: "Wat kost een Pumi pup?",
      answer: "Een Pumi pup met stamboom kost tussen €1.000 en €1.800 in Europa. Ze zijn zeldzaam buiten Hongarije. Wachtlijsten van 6-12 maanden zijn normaal. Controleer altijd gezondheidsscreenings en vraag naar temperamenten."
    }
  ],
  funFacts: [
    "Pumis hebben unieke 'Batman oren' – half rechtop, half gevouwen – die hen een karakteristieke alerte uitdrukking geven.",
    "Ze zijn de jongste van de drie Hongaarse herdershonden (Puli, Pumi, Mudi) en ontstonden in de 17e-18e eeuw door kruisingen tussen Pulis en Duitse/Franse herders.",
    "Pumis zijn verrassend vocaal en 'praten' graag met hun eigenaar door grommen, janken en blaffen.",
    "Hun krullige vacht is hypoallergeen – ze verharen weinig en zijn geschikt voor mensen met lichte hondenallergie.",
    "Pumis zijn excellente rattenvangers en werden oorspronkelijk ook gebruikt om ongedierte op boerderijen te bestrijden.",
    "Het ras werd pas in 2016 officieel erkend door de American Kennel Club (AKC) – ze zijn nog relatief onbekend buiten Hongarije."
  ],
  history: {
    origin: "De Pumi ontstond in de 17e en 18e eeuw in Hongarije door kruisingen tussen Pulis (oude Hongaarse herdershond) en geïmporteerde Franse en Duitse terriërachtige herders. Het resultaat was een kleinere, wendbaarder herdershond met een krulliger vacht en opvallende oren. Ze werden gebruikt om vee (schapen, koeien, varkens) te hoeden op Hongaarse boerderijen.",
    development: "Eeuwenlang werd de Pumi niet als apart ras beschouwd maar gezien als een variant van de Puli. In 1920 begon dr. Emil Raitsits (een Hongaarse cynoloog) de Pumi te standaardiseren als apart ras. In 1935 werd het ras officieel erkend door de FCI.\n\nDe industrialisatie reduceerde de behoefte aan herdershonden, maar de Pumi overleefde dankzij zijn veelzijdigheid. In de late 20e en vroege 21e eeuw groeide de interesse in het ras bij liefhebbers van zeldzame herdershonden en agility-enthousiastelingen (Pumis zijn fenomenaal wendbaar). In 2016 kreeg het ras AKC-erkenning. Tegenwoordig zijn Pumis zeldzaam maar gewaardeerd als energieke, intelligente gezinshonden voor actieve eigenaren."
  },
  similarBreeds: [
    "Puli",
    "Mudi (ook Hongaars)",
    "Portuguese Water Dog",
    "Spanish Water Dog"
  ],
  commonMistakes: [
    "Te veel borstelen: Pumis hebben krullen die je niet mag uitborstelen. Gebruik een grove kam en borstel niet te vaak.",
    "Geen mentale uitdaging: Pumis zijn briljant en vervelen zich snel. Geef puzzels, training, agility of herding.",
    "Te weinig beweging: Ze zijn energiek en hebben minimaal 1,5-2 uur per dag nodig.",
    "Niet trainen tegen blaffen: Pumis zijn vocaal. Train vroeg om excessief blaffen te beperken, anders irriteer je je buren.",
    "Te lang alleen laten: Ze zijn sociaal en kunnen scheidingsangst ontwikkelen. Plan gezelschap in.",
    "Geen consequente leiding: Pumis zijn eigenwijs. Wees consequent maar positief in training."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€20-€40",
    grooming: "€15-€40",
    insurance: "€20-€40",
    total: "€95-€190",
    note: "Pumis zijn relatief goedkoop in onderhoud. Hun vacht vereist trimming elke 3-4 maanden (€30-€60 per sessie). Houd rekening met kosten voor hondensporten (agility, herding), speelgoed, en mogelijk hogere premies door zeldzaamheid. Eenmalig: aanschaf €1.000-€1.800, wachtlijsten normaal."
  }
};

// ===== 118. Mudi =====
export const mudi: BreedDetails = {
  breedName: "Mudi",
  breedNameNL: "Mudi",
  faqs: [
    {
      question: "Wat is een Mudi?",
      answer: "De Mudi is een zeldzame Hongaarse herdershond met een golvende vacht, spitse oren en een atletisch lichaam. Ze zijn extreem veelzijdig – geschikt voor herding, agility, zoekwerk, en als gezinshond. Ze zijn intelligenter en energieker dan de meeste rassen."
    },
    {
      question: "Is een Mudi geschikt voor beginners?",
      answer: "Nee, Mudis zijn niet ideaal voor beginners. Ze zijn extreem energiek, intelligent en eigenwijs. Ze vereisen een ervaren baas die consequent kan leiden en voldoende mentale en fysieke uitdaging kan bieden. Zonder dit worden ze destructief."
    },
    {
      question: "Hoeveel beweging heeft een Mudi nodig?",
      answer: "Een Mudi heeft minimaal 2 uur intensieve beweging per dag nodig, plus mentale stimulatie. Ze excelleren in agility, herding, tracking, flyball en andere hondensporten. Zonder voldoende uitdaging worden ze hyperactief of ontwikkelen gedragsproblemen."
    },
    {
      question: "Hoeveel verzorging heeft een Mudi nodig?",
      answer: "Mudis hebben gematigde vachtverzorging. Hun golvende vacht moet 1-2x per week geborsteld worden om losse haren te verwijderen. Ze verharen gematigd en hebben weinig trimming nodig. Baden is zelden nodig (3-4x per jaar)."
    },
    {
      question: "Zijn Mudis vocaal?",
      answer: "Ja, Mudis zijn ZEER vocaal. Ze blaffen om te communiceren, te waarschuwen en uit opwinding. Ze hebben een hoge, doordringende blaf. Train vroeg om excessief blaffen te beperken, anders irriteer je je buren."
    },
    {
      question: "Zijn Mudis goed met kinderen?",
      answer: "Met goede socialisatie zijn Mudis goed met kinderen van hun eigen gezin. Ze zijn speels en energiek maar kunnen intens zijn. Hun hoedinstinct kan leiden tot hakken bijten. Niet ideaal voor gezinnen met jonge kinderen tenzij ze vroeg gesocialiseerd zijn."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Mudis?",
      answer: "Mudis zijn over het algemeen zeer gezond en robuust. Ze kunnen gevoelig zijn voor heupdysplasie, epilepsie en oogproblemen (cataract). Door de kleine genenpool is genetische screening belangrijk. Levensverwachting: 12-14 jaar."
    },
    {
      question: "Wat kost een Mudi pup?",
      answer: "Een Mudi pup met stamboom kost tussen €1.200 en €2.000 in Europa. Ze zijn ZEER zeldzaam buiten Hongarije – er zijn wereldwijd slechts enkele duizenden exemplaren. Wachtlijsten van 1-2 jaar zijn normaal. Kies een geregistreerde fokker."
    }
  ],
  funFacts: [
    "De Mudi is het zeldzaamste van de drie Hongaarse herdershonden (Puli, Pumi, Mudi) – er zijn wereldwijd slechts 2.000-3.000 exemplaren.",
    "Het ras ontstond spontaan in de vroege 20e eeuw door natuurlijke kruisingen tussen Pulis, Pumis en lokale honden – het was geen doelbewuste fokkerij.",
    "Mudis zijn zo veelzijdig dat ze worden ingezet als herdershonden, politiehonden, zoek- en reddingshonden, en explosievenopsporingshonden.",
    "Ze hebben een unieke manier van hoeden waarbij ze laag bij de grond blijven en tussen de poten van schapen duiken.",
    "Mudis kunnen tot 60 cm hoog springen zonder aanloop – hun atletische vermogen is fenomenaal.",
    "Het ras werd pas in 2004 officieel erkend door de AKC – ze zijn nog grotendeels onbekend buiten Hongarije."
  ],
  history: {
    origin: "De Mudi ontstond in de vroege 20e eeuw in Hongarije, maar niet door doelbewuste fokkerij. Het ras ontwikkelde zich spontaan door natuurlijke kruisingen tussen Pulis (oude Hongaarse herdershond), Pumis en mogelijk lokale Duitse herders en Spitz-type honden. Het resultaat was een middelgrote, atletische herdershond met spitse oren en een golvende vacht.",
    development: "Tot 1930 werd de Mudi niet als apart ras beschouwd. Dr. Dezső Fényesi, een Hongaarse directeur van het Hongaars Museum, identificeerde deze honden als een uniek ras en begon ze te standaardiseren. In 1936 werd het ras officieel erkend door de FCI.\n\nTijdens WO II raakte het ras zwaar getroffen en was bijna uitgestorven. Een kleine groep fokkers redde het ras na de oorlog, maar het bleef extreem zeldzaam. De Mudi werd grotendeels overgenomen door de populairdere Puli en Pumi. In de 21e eeuw groeide de interesse in het ras bij liefhebbers van zeldzame herdershonden en agility-enthousiastelingen. In 2004 kreeg het AKC-erkenning. Tegenwoordig zijn Mudis zeldzaam maar gewaardeerd als veelzijdige, intelligente werkhonden."
  },
  similarBreeds: [
    "Pumi",
    "Puli",
    "Croatian Sheepdog (Kroatische Herder)",
    "Belgian Shepherd (Malinois)"
  ],
  commonMistakes: [
    "Kopen zonder werk te hebben: Mudis zijn GEEN huisdieren. Ze hebben werk (herding, agility, zoekwerk) nodig om gelukkig te zijn.",
    "Te weinig mentale uitdaging: Ze zijn briljant en vervelen zich snel. Zonder puzzels, training of taken worden ze destructief.",
    "Niet trainen tegen blaffen: Mudis blaffen excessief zonder training. Begin vroeg met blaftraining.",
    "Onvoldoende socialisatie: Mudis kunnen wantrouwig zijn tegenover vreemden. Vroege socialisatie is essentieel.",
    "Te lang alleen laten: Ze zijn zeer aan hun gezin gehecht en kunnen scheidingsangst ontwikkelen.",
    "Geen consequente leiding: Mudis zijn eigenwijs en testen grenzen. Wees consequent maar positief."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€20-€40",
    grooming: "€10-€25",
    insurance: "€20-€40",
    total: "€90-€175",
    note: "Mudis zijn goedkoop in onderhoud door hun robuuste gezondheid en minimale vachtverzorging. Houd rekening met kosten voor hondensporten (agility, herding €25-€50/les), speelgoed voor mentale stimulatie, en mogelijke hogere premies door zeldzaamheid. Eenmalig: aanschaf €1.200-€2.000, lange wachtlijsten."
  }
};

// ===== 119. Kroatische Herder =====
export const kroatischeHerder: BreedDetails = {
  breedName: "Croatian Sheepdog",
  breedNameNL: "Kroatische Herder",
  faqs: [
    {
      question: "Wat is een Kroatische Herder?",
      answer: "De Kroatische Herder (Hrvatski Ovčar) is een middelgrote Kroatische herdershond met een zwarte, golvende vacht en spitse oren. Ze zijn energiek, intelligent en loyaal. Ze zijn zeldzaam buiten Kroatië maar excellent als werkhonden en actieve gezinshonden."
    },
    {
      question: "Is een Kroatische Herder geschikt voor beginners?",
      answer: "Nee, Kroatische Herders zijn niet ideaal voor beginners. Ze zijn extreem energiek, intelligent en eigenwijs. Ze vereisen een ervaren baas die consequent kan leiden en voldoende mentale en fysieke uitdaging kan bieden."
    },
    {
      question: "Hoeveel beweging heeft een Kroatische Herder nodig?",
      answer: "Een Kroatische Herder heeft minimaal 1,5-2 uur beweging per dag nodig, plus mentale stimulatie. Ze houden van wandelen, rennen, herding, agility en zoekwerk. Zonder voldoende uitdaging worden ze destructief of hyperactief."
    },
    {
      question: "Hoeveel verzorging heeft een Kroatische Herder nodig?",
      answer: "Kroatische Herders hebben gematigde vachtverzorging. Hun golvende vacht moet 2-3x per week geborsteld worden om losse haren te verwijderen en klitten te voorkomen. Ze verharen gematigd en hebben weinig trimming nodig."
    },
    {
      question: "Zijn Kroatische Herders vocaal?",
      answer: "Ja, Kroatische Herders zijn vocaal. Ze blaffen om te communiceren, te waarschuwen en tijdens het hoeden. Train vroeg om excessief blaffen te beperken, vooral in stedelijke omgevingen."
    },
    {
      question: "Zijn Kroatische Herders goed met kinderen?",
      answer: "Met goede socialisatie zijn Kroatische Herders uitstekend met kinderen van hun eigen gezin. Ze zijn loyaal en beschermend. Wel hebben ze een hoedinstinct en kunnen proberen kinderen te 'hoeden'. Vroege socialisatie is essentieel."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Kroatische Herders?",
      answer: "Kroatische Herders zijn over het algemeen gezond en robuust. Ze kunnen gevoelig zijn voor heupdysplasie en enkele oogproblemen. Door de kleine genenpool is genetische diversiteit belangrijk. Levensverwachting: 12-14 jaar."
    },
    {
      question: "Wat kost een Kroatische Herder pup?",
      answer: "Een Kroatische Herder pup met stamboom kost tussen €800 en €1.500 in Europa. Ze zijn zeldzaam buiten Kroatië. Wachtlijsten van 6-12 maanden zijn normaal. Kies een geregistreerde fokker die gezondheidsscreenings doet."
    }
  ],
  funFacts: [
    "De Kroatische Herder is een van de oudste rassen ter wereld – ze worden al beschreven in documenten uit de 14e eeuw.",
    "Ze zijn het nationale ras van Kroatië en staan afgebeeld op Kroatische postzegels.",
    "Hun zwarte vacht heeft vaak een witte vlek op de borst – dit wordt 'the white mark of the shepherd' genoemd en is geaccepteerd in de rasstandaard.",
    "Kroatische Herders hebben een natuurlijk 'glimlach' waarbij ze hun lippen optrekken bij blijdschap.",
    "Ze werden oorspronkelijk gebruikt om varkens te hoeden (naast schapen) – een zeldzame specialisatie.",
    "Het ras is zo zeldzaam dat er wereldwijd slechts enkele duizenden exemplaren zijn, vooral geconcentreerd in Oost-Kroatië."
  ],
  history: {
    origin: "De Kroatische Herder (Hrvatski Ovčar) is een van de oudste hondenrassen van Europa en stamt uit de regio Slavonië in Oost-Kroatië. Het eerste geschreven bewijs van het ras dateert uit 1374, toen bisschop Petar van Đakovo ze beschreef in zijn archieven. Ze werden eeuwenlang gebruikt om schapen en varkens te hoeden op Kroatische boerderijen.",
    development: "Eeuwenlang bleef het ras relatief onveranderd en werd lokaal gefokt door boeren in Slavonië. In 1935 begon Dr. Stjepan Romić, een veterinair professor, het ras te standaardiseren. Hij documenteerde hun karakteristieken en begon systematische fokkerij. In 1969 werd het ras officieel erkend door de FCI.\n\nTijdens de Joegoslavische oorlogen in de jaren '90 raakte het ras bedreigd, maar Kroatische fokkers bleven het in stand houden. Tegenwoordig is de Kroatische Herder zeldzaam maar gewaardeerd in Kroatië als nationaal symbool en veelzijdige werkhond. Buiten Kroatië is het ras grotendeels onbekend maar groeit de interesse bij liefhebbers van zeldzame herdershonden."
  },
  similarBreeds: [
    "Mudi (Hongaars)",
    "Pumi (Hongaars)",
    "Schipperke",
    "Belgian Shepherd (Groenendael)"
  ],
  commonMistakes: [
    "Te weinig beweging: Kroatische Herders zijn energiek en hebben minimaal 1,5-2 uur per dag nodig.",
    "Geen mentale uitdaging: Ze zijn intelligent en vervelen zich snel zonder puzzels, training of werk.",
    "Onvoldoende socialisatie: Ze kunnen wantrouwig zijn tegenover vreemden. Vroege socialisatie is essentieel.",
    "Te lang alleen laten: Ze zijn zeer aan hun gezin gehecht en kunnen scheidingsangst ontwikkelen.",
    "Niet trainen tegen blaffen: Ze zijn vocaal en moeten geleerd worden wanneer blaffen gepast is.",
    "Geen consequente leiding: Dit ras test grenzen. Wees duidelijk en consistent in regels."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€20-€40",
    grooming: "€10-€25",
    insurance: "€20-€40",
    total: "€90-€175",
    note: "Kroatische Herders zijn goedkoop in onderhoud door hun robuuste gezondheid en minimale vachtverzorging. Houd rekening met kosten voor hondensporten (agility, herding), speelgoed, en mogelijke hogere premies door zeldzaamheid. Eenmalig: aanschaf €800-€1.500."
  }
};

// ===== 120. Catalaanse Herdershond =====
export const catalaanse Herdershond: BreedDetails = {
  breedName: "Catalan Sheepdog",
  breedNameNL: "Catalaanse Herdershond",
  faqs: [
    {
      question: "Wat is een Catalaanse Herdershond?",
      answer: "De Catalaanse Herdershond (Gos d'Atura Català) is een middelgrote Spaanse herdershond met een lange, ruige vacht en een vriendelijk karakter. Ze zijn intelligent, loyaal en veelzijdig. Ze zijn zeldzaam buiten Spanje maar uitstekend als werkhonden en gezinshonden."
    },
    {
      question: "Is een Catalaanse Herdershond geschikt voor beginners?",
      answer: "Ja, Catalaanse Herdershonden kunnen geschikt zijn voor gemotiveerde beginners. Ze zijn vriendelijker en rustiger dan Border Collies maar vereisen wel voldoende beweging, training en vachtverzorging. Ze zijn geduldig en trainbaar."
    },
    {
      question: "Hoeveel beweging heeft een Catalaanse Herdershond nodig?",
      answer: "Een Catalaanse Herdershond heeft 1-1,5 uur beweging per dag nodig. Ze houden van wandelen, rennen, herding en agility maar zijn minder intens dan Border Collies. Ze passen bij actieve gezinnen met een gematigde levensstijl."
    },
    {
      question: "Hoeveel verzorging heeft een Catalaanse Herdershond nodig?",
      answer: "Catalaanse Herdershonden vereisen regelmatige vachtverzorging. Borstel 2-3x per week om klitten te voorkomen en losse haren te verwijderen. Hun lange, ruige vacht verzamelt vuil en bladeren. Trim overtollig haar rond ogen, oren en poten elke 2-3 maanden."
    },
    {
      question: "Zijn Catalaanse Herdershonden goed met kinderen?",
      answer: "Ja, Catalaanse Herdershonden zijn uitstekend met kinderen. Ze zijn geduldig, beschermend en speels. Hun hoedinstinct is mild vergeleken met Border Collies. Ze zijn ideale gezinshonden voor actieve gezinnen."
    },
    {
      question: "Zijn Catalaanse Herdershonden goede waakhonden?",
      answer: "Ja, Catalaanse Herdershonden zijn goede waakhonden. Ze zijn alert en blaffen om bezoekers aan te kondigen. Met goede socialisatie zijn ze niet agressief maar wel beschermend tegenover hun gezin."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Catalaanse Herdershonden?",
      answer: "Catalaanse Herdershonden zijn over het algemeen gezond. Ze kunnen gevoelig zijn voor heupdysplasie, progressieve retina-atrofie (PRA) en enkele oogproblemen. Kies een fokker die ouderdieren screent. Levensverwachting: 12-14 jaar."
    },
    {
      question: "Wat kost een Catalaanse Herdershond pup?",
      answer: "Een Catalaanse Herdershond pup met stamboom kost tussen €1.000 en €1.800 in Europa. Ze zijn zeldzaam buiten Spanje (vooral Catalonië). Wachtlijsten van 6-12 maanden zijn normaal. Controleer altijd gezondheidsscreenings."
    }
  ],
  funFacts: [
    "De Catalaanse Herdershond is het nationale ras van Catalonië en een symbool van Catalaanse identiteit.",
    "Ze werden gebruikt als koeriers- en boodschappenhonden tijdens de Spaanse Burgeroorlog (1936-1939).",
    "Hun lange, ruige vacht beschermde hen tegen de extreme weersomstandigheden in de Pyreneeën – van hitte in de zomer tot sneeuw in de winter.",
    "Catalaanse Herdershonden hebben vaak een 'baard' en 'snor' die hen een wijze, oude man-achtige uitstraling geven.",
    "Ze zijn verrassend stille werkers – in tegenstelling tot veel herdershonden blaffen ze zelden tijdens het hoeden.",
    "Het ras stond in de jaren '70 op het punt van uitsterven maar werd gered door een kleine groep Catalaanse fokkers die het ras als cultureel erfgoed beschouwden."
  ],
  history: {
    origin: "De Catalaanse Herdershond (Gos d'Atura Català) is een oud ras afkomstig uit de regio Catalonië in Noord-Oost Spanje. Ze werden eeuwenlang gebruikt om kuddes schapen en geiten te hoeden in de Pyreneeën en het Catalaanse platteland. Hun exacte oorsprong is onduidelijk, maar ze worden al eeuwenlang beschreven in Catalaanse literatuur.",
    development: "Tot de vroege 20e eeuw waren Catalaanse Herdershonden ongestandaardiseerde werkende honden zonder officiële erkenning. In 1929 werd de eerste rasstandaard opgesteld door de Club del Gos d'Atura. Het ras kreeg internationale erkenning in de jaren '50 en '60.\n\nDe industrialisatie en de Spaanse Burgeroorlog decimeerden het ras. In de jaren '70 stond het op het punt van uitsterven. Een kleine groep Catalaanse fokkers, gedreven door culturele trots, redde het ras. Sinds de jaren '80 groeit de populatie gestaag. Tegenwoordig is de Catalaanse Herdershond het nationale ras van Catalonië en wordt gevierd als symbool van Catalaanse identiteit. Buiten Spanje is het ras zeldzaam maar gewaardeerd als vriendelijke, veelzijdige gezinshond."
  },
  similarBreeds: [
    "Bearded Collie",
    "Polish Lowland Sheepdog",
    "Bergamasco",
    "Pyrenese Herder"
  ],
  commonMistakes: [
    "Onderschatten van de vachtverzorging: Hun lange vacht vereist 2-3x per week borstelen om klitten te voorkomen.",
    "Te weinig socialisatie: Catalaanse Herdershonden kunnen terughoudend zijn tegenover vreemden. Begin vroeg met socialisatie.",
    "Geen mentale uitdaging: Ze zijn intelligent en hebben puzzels, training of taken nodig om gelukkig te blijven.",
    "Te lang alleen laten: Ze zijn zeer aan hun gezin gehecht en kunnen scheidingsangst ontwikkelen.",
    "Geen consequente training: Ze zijn eigenwijs en testen grenzen. Wees consequent maar positief.",
    "Verwaarlozen van de vacht tijdens natte wandelingen: Hun vacht verzamelt modder en vuil. Borstel na elke natte wandeling."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€20-€40",
    grooming: "€20-€50",
    insurance: "€20-€40",
    total: "€110-€210",
    note: "Catalaanse Herdershonden hebben gematigde kosten. Professionele trimming kost €40-€70 per sessie (elke 3-4 maanden). Houd rekening met kosten voor speelgoed, training, en mogelijk hogere premies door zeldzaamheid. Eenmalig: aanschaf €1.000-€1.800."
  }
};

// ===== Export alle rassen =====
export const breedDetailsBatch6 = [
  hollandseHerder,
  belgischeHerderTervueren,
  belgischeHerderLaekenois,
  belgischeHerderGroenendael,
  kelpie,
  cattleDog,
  collieLanghaar,
  collieKorthaar,
  beardedCollie,
  oldEnglishSheepdog,
  komondor,
  kuvasz,
  maremmaNoAbruzzese,
  bergamasco,
  briard,
  puli,
  pumi,
  mudi,
  kroatischeHerder,
  catalaanse Herdershond
];
