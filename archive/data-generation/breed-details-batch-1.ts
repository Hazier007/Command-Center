// Breed Details Batch 1 voor hondenpups.be
// Format: TypeScript object per ras (kan naar JSON geconverteerd worden)

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
      question: "Is een Border Collie geschikt voor een appartement?",
      answer: "Een Border Collie kan in een appartement wonen, maar het is uitdagend. Ze hebben minimaal 1,5-2 uur intensieve beweging en mentale stimulatie per dag nodig. Zonder voldoende uitlaatkans en 'hersenwerk' worden ze ongelukkig en kunnen gedragsproblemen ontstaan. Een tuin is ideaal, maar niet verplicht als je voldoende beweging buiten biedt."
    },
    {
      question: "Hoeveel beweging heeft een Border Collie nodig?",
      answer: "Een Border Collie heeft minimaal 1,5 tot 2 uur beweging per dag nodig, maar veel hebben meer nodig. Dit moet echte actieve beweging zijn: rennen, apporteren, zwemmen of hondensporten zoals agility. Wandelen alleen is niet voldoende - ze hebben taken en mentale uitdagingen nodig om hun enorme intelligentie te kanaliseren."
    },
    {
      question: "Zijn Border Collies goed met kinderen?",
      answer: "Ja, Border Collies kunnen uitstekend met kinderen omgaan als ze goed gesocialiseerd zijn. Ze zijn geduldig en beschermend. Let wel op: hun herdersinstinct kan ertoe leiden dat ze kinderen proberen te 'hoeden' door achter hakken te lopen of te bijten. Leer kinderen én hond respect voor elkaar en houd toezicht bij jonge kinderen."
    },
    {
      question: "Is een Border Collie makkelijk te trainen?",
      answer: "Ja, Border Collies behoren tot de meest intelligente en trainbare rassen ter wereld. Ze leren nieuwe commando's vaak in slechts 5 herhalingen. Maar let op: hun intelligentie betekent ook dat ze uitdaging nodig hebben. Houd trainingen kort en gevarieerd om verveling te voorkomen, en gebruik positieve bekrachtiging."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Border Collies?",
      answer: "Border Collies zijn gevoelig voor epilepsie, heupdysplasie, oogaandoeningen zoals CEA (Collie Eye Anomaly) en PRA (progressieve retinale atrofie), en TNS (Trapped Neutrophil Syndrome). Kies altijd een fokker die ouderdieren screent op deze erfelijke aandoeningen. Border Collie Collapse (BCC) kan ook voorkomen bij intensieve inspanning."
    },
    {
      question: "Hoe oud wordt een Border Collie gemiddeld?",
      answer: "Een gezonde Border Collie wordt gemiddeld 10 tot 15 jaar oud, met een gemiddelde rond de 12-13 jaar. Met goede voeding, voldoende beweging, mentale stimulatie en regelmatige veterinaire controles kunnen sommige Border Collies ouder worden."
    },
    {
      question: "Wat kost een Border Collie pup in België?",
      answer: "Een Border Collie pup met stamboom kost in België tussen €850 en €1.250, afhankelijk van de fokker en de bloedlijn. In Nederland liggen prijzen tussen €600 en €1.500, met een gemiddelde rond €800-€1.000. Kies altijd een erkende fokker die genetische tests uitvoert."
    },
    {
      question: "Kan een Border Collie lang alleen zijn?",
      answer: "Nee, Border Collies zijn niet geschikt om lang alleen te zijn. Ze zijn zeer sociaal en kunnen scheidingsangst ontwikkelen. Maximaal 4-6 uur alleen laten is het absolute maximum, en dan nog alleen als ze vóór en na voldoende beweging en mentale uitdaging krijgen."
    }
  ],
  funFacts: [
    "Border Collies worden beschouwd als het meest intelligente hondenras ter wereld - ze kunnen gemiddeld meer dan 1.000 woorden begrijpen.",
    "Chaser, een Border Collie uit South Carolina, kende de namen van 1.022 verschillende speelgoedjes en kon ze op commando ophalen.",
    "De legendarische werkhond Old Hemp (1893-1901) wordt beschouwd als de stamvader van alle moderne Border Collies.",
    "Border Collies hebben een karakteristieke 'eye' - een intense blik waarmee ze schapen controleren zonder te blaffen of te bijten.",
    "Het ras werd pas in 1995 officieel erkend door de American Kennel Club, omdat fokkers vreesden dat show-fokkerij hun werkvaardigheden zou aantasten.",
    "Border Collies kunnen zwart-wit, rood-wit, blauw-merle en zelfs volledig zwart zijn - de klassieke zwart-witte variant is slechts één van de vele kleuren."
  ],
  history: {
    origin: "De Border Collie ontstond in de grensstreek (de 'Border') tussen Schotland en Engeland, waar al eeuwenlang honden werden ingezet om schapen te hoeden in het ruige heuvelland. De naam 'Collie' komt mogelijk van een oud-Keltisch woord voor 'nuttig' of verwijst naar zwarte schapen. Deze honden werden niet geselecteerd op uiterlijk, maar puur op werkvaardigheden: intelligentie, wendbaarheid en een intense werkdrang.",
    development: "Vanaf de late 19e eeuw won het ras aan bekendheid via schapendrijfwedstrijden, met de eerste trial in 1873 in Wales. In 1906 werd de International Sheep Dog Society (ISDS) opgericht, die het ras registreerde op basis van werkvermogen in plaats van uiterlijk. De naam 'Border Collie' werd in 1915 geïntroduceerd door James Reid. Old Hemp (1893-1901) wordt gezien als de legendarische stamvader, en later verfijnde Wiston Cap (1963-1979) het type verder. Het ras verspreidde zich wereldwijd naar Australië en Nieuw-Zeeland als werkhond, en kreeg pas in de 20e eeuw officiële stamboek-erkenning (AKC in 1995). In Nederland groeide de populariteit in de jaren '70 met hondensporten, met de oprichting van de Border Collie Club Nederland in 1977."
  },
  similarBreeds: [
    "Australische Herder",
    "Bearded Collie",
    "Kelpie",
    "Shetland Sheepdog",
    "Welsh Sheepdog"
  ],
  commonMistakes: [
    "Te weinig mentale stimulatie: Border Collies hebben naast beweging ook hersenwerk nodig zoals puzzels, training en zoekspelletjes. Alleen wandelen is niet genoeg.",
    "Onderschatten van de energie: Veel mensen kopen een Border Collie zonder te beseffen hoeveel tijd en energie het kost. Dit is geen bankhond.",
    "Geen consequente training: Deze intelligente honden hebben duidelijke regels en grenzen nodig. Zonder structuur nemen ze zelf beslissingen.",
    "Te jong beginnen met intensieve sport: Border Collie pups groeien snel en zware inspanning kan gewrichten beschadigen. Bouw beweging geleidelijk op.",
    "Kuddegedrag negeren: Hun instinct om te hoeden kan leiden tot achtervolgen en bijten in hakken. Vroege socialisatie en training zijn essentieel.",
    "Alleen laten te lang: Border Collies ontwikkelen snel scheidingsangst en kunnen destructief worden als ze zich vervelen of eenzaam zijn."
  ],
  monthlyCosts: {
    food: "€45-€85",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€17-€31",
    total: "€92-€176",
    note: "Kosten kunnen oplopen door erfelijke aandoeningen zoals epilepsie of heupdysplasie. Reken ook op extra kosten voor mentale stimulatie, trainingen en hondensporten (€100-€200 per cursus). Aanschafkosten: €600-€1.500."
  }
};

// ===== Beagle =====
export const beagle: BreedDetails = {
  breedName: "Beagle",
  breedNameNL: "Beagle",
  faqs: [
    {
      question: "Is een Beagle geschikt voor een appartement?",
      answer: "Ja, een Beagle kan prima in een appartement wonen als hij dagelijks voldoende beweging krijgt. Ze zijn middelgroot en rustig binnenshuis, maar hebben wel minimaal 1 uur stevige beweging per dag nodig. Let wel: Beagles kunnen vocaal zijn (janken, huilen) wat voor overlast kan zorgen bij buren."
    },
    {
      question: "Hoeveel beweging heeft een Beagle nodig?",
      answer: "Een volwassen Beagle heeft minimaal 1 uur beweging per dag nodig, maar liever meer. Dit kunnen lange wandelingen, rennen of spelen zijn. Ze hebben een sterk jachtinstinct en volgen graag geuren, dus zorg voor mentale stimulatie zoals geurspelletjes om hun neus te laten werken."
    },
    {
      question: "Zijn Beagles goed met kinderen?",
      answer: "Ja, Beagles zijn uitstekende gezinshonden! Ze zijn speels, geduldig en vriendelijk met kinderen. Hun vrolijke en sociale karakter maakt ze perfect voor gezinnen. Wel is toezicht nodig bij jonge kinderen vanwege hun energieke en enthousiaste speelgedrag."
    },
    {
      question: "Waarom jankt mijn Beagle zo veel?",
      answer: "Beagles zijn jachthonden die van nature vocaal zijn - ze hebben een 'baying' geluid ontwikkeld om jagers te waarschuwen. Janken kan wijzen op verveling, eenzaamheid of dat ze een interessante geur hebben opgepikt. Training en voldoende beweging helpen dit te verminderen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Beagles?",
      answer: "Beagles zijn gevoelig voor obesitas (door hun enorme eetlust), oorinfecties, allergieën en huidproblemen, heupdysplasie, epilepsie, hypothyreoïdie en oogaandoeningen zoals glaucoom en 'kersenoog'. Beagle Pain Syndrome (hersenvliesontsteking) kan ook voorkomen. Regelmatige controles zijn belangrijk."
    },
    {
      question: "Hoe oud wordt een Beagle gemiddeld?",
      answer: "Een gezonde Beagle wordt gemiddeld 12 tot 15 jaar oud. Met goede voeding (let op obesitas!), voldoende beweging en regelmatige veterinaire zorg kunnen ze een lang en gezond leven leiden."
    },
    {
      question: "Wat kost een Beagle pup in België?",
      answer: "Een Beagle pup met stamboom kost in België tussen €900 en €2.150, afhankelijk van de fokker en bloedlijn. Adoptie uit een asiel is goedkoper (€200-€400) maar dan mis je de puppy-fase. Kies altijd voor een fokker die ouderdieren screent op erfelijke aandoeningen."
    },
    {
      question: "Zijn Beagles makkelijk te trainen?",
      answer: "Beagles zijn intelligent maar ook eigenwijs en afleidbaar door hun sterke neus. Training vraagt geduld en consequentie. Positieve bekrachtiging met treats werkt het best, maar gebruik geen overdreven veel snacks (obesitas-risico). Begin vroeg met lijntraining en 'hier' commando's."
    }
  ],
  funFacts: [
    "Beagles hebben één van de beste neuzen in het hondenrijk - ze hebben meer dan 220 miljoen geurreceptoren (mensen hebben er 5 miljoen).",
    "Snoopy uit de Peanuts-strip is waarschijnlijk 's werelds beroemdste Beagle.",
    "Beagles worden vaak ingezet op vliegvelden om voedsel en contrabande op te sporen in bagage - hun vriendelijke uiterlijk maakt reizigers minder nerveus.",
    "Koningin Elizabeth I hield van 'Pocket Beagles' die zo klein waren (20-25 cm) dat ze in jaszakken pasten.",
    "De oorsprong van de naam 'Beagle' is onduidelijk - het komt mogelijk van het Keltische 'beag' (klein) of het Franse 'be'geule' (open keel, verwijzend naar hun gehuil).",
    "President Lyndon B. Johnson had twee Beagles in het Witte Huis genaamd Him en Her."
  ],
  history: {
    origin: "De Beagle heeft oude wortels die teruggaan tot de 5e eeuw v.Chr. in Griekenland, waar kleine jagershonden werden gebruikt. De moderne Beagle zoals we die kennen is echter een Engelse ontwikkeling. In de 11e eeuw werden Talbot-honden en St. Hubert-honden door Willem de Veroveraar vanuit Normandië naar Engeland gebracht en gekruist met Greyhounds voor snelheid. Tegen de 14e-15e eeuw werden kleine honden al 'Beagles' genoemd en waren populair onder de Engelse adel voor de jacht op konijnen en hazen.",
    development: "In de 18e eeuw ontstonden twee types: de Southern Hound (zwaarder, met uitstekend reukvermogen) en de North Country Beagle (kleiner en sneller). De moderne Beagle werd grotendeels gestandaardiseerd door Reverend Phillip Honeywood, die in de jaren 1830 een fokprogramma in Essex startte. Zijn Beagles waren klein (ongeveer 25 cm hoog) en overwegend wit. In 1890 werd de Beagle Club opgericht en de eerste officiële rasstandaard vastgesteld. Tegen 1902 waren er al 44 Beagle-packs in Engeland. Het ras verspreidde zich naar de Verenigde Staten, waar het uitgroeide tot één van de populairste gezinshonden."
  },
  similarBreeds: [
    "Basset Hound",
    "Harrier",
    "Foxhound",
    "Treeing Walker Coonhound"
  ],
  commonMistakes: [
    "Overvoeren: Beagles zijn gevoelig voor obesitas door hun onverzadigbare eetlust. Volg voedingsrichtlijnen strikt en limiteer treats.",
    "Loslaten zonder veilige omheining: Hun neus regeert - een Beagle die een interessante geur oppikt, kan kilometers ver dwalen en komt niet terug op roepen.",
    "Oren verwaarlozen: Hangende oren vangen vocht en vuil, wat leidt tot oorinfecties. Controleer en reinig wekelijks.",
    "Te weinig mentale stimulatie: Beagles vervelen zich snel zonder geurspelletjes of snuffelwerk, wat kan leiden tot huilen en destructief gedrag.",
    "Geen consequente training: Hun eigenwijsheid vereist geduld en consistentie. Geef niet toe aan hun smekende blik bij het eten!",
    "Te lang alleen laten: Beagles zijn roedeldieren en kunnen scheidingsangst ontwikkelen, wat leidt tot excessief janken."
  ],
  monthlyCosts: {
    food: "€25-€50",
    vet: "€20-€35",
    grooming: "€10-€15",
    insurance: "€15-€32",
    total: "€70-€132",
    note: "Kosten kunnen hoger uitvallen door gezondheidsproblemen zoals obesitas, allergieën of oorinfecties. Aanschafkosten: €900-€2.150. Eerste jaar inclusief basisbenodigdheden: €1.500-€2.500."
  }
};

// ===== Mechelse Herder =====
export const mechelseHerder: BreedDetails = {
  breedName: "Belgian Malinois",
  breedNameNL: "Mechelse Herder",
  faqs: [
    {
      question: "Is een Mechelse Herder geschikt voor beginners?",
      answer: "Nee, een Mechelse Herder is niet geschikt voor beginnende hondenbezitters. Dit ras heeft een extreem hoge werkdrift, intelligentie en energie die ervaren handling vereist. Zonder juiste training en mentale uitdaging kunnen gedragsproblemen ontstaan. Dit is een ras voor actieve, ervaren eigenaren."
    },
    {
      question: "Hoeveel beweging heeft een Mechelse Herder nodig?",
      answer: "Een Mechelse Herder heeft minimaal 1,5 tot 2 uur intensieve beweging per dag nodig, maar veel hebben meer nodig. Dit moet échte inspanning zijn: rennen, fietsen, hondensporten of werkactiviteiten. Wandelen alleen is niet voldoende - ze hebben taken en mentale uitdaging nodig."
    },
    {
      question: "Zijn Mechelse Herders goed met kinderen?",
      answer: "Mechelse Herders kunnen goed met kinderen als ze er vanaf pup aan gewend zijn en goed gesocialiseerd zijn. Ze zijn beschermend en loyaal. Let wel: hun herdersinstinct en energie kunnen overweldigend zijn voor jonge kinderen. Ze zijn beter geschikt voor gezinnen met oudere kinderen die de hond respectvol behandelen."
    },
    {
      question: "Kan een Mechelse Herder in een appartement wonen?",
      answer: "Een appartement is niet ideaal voor een Mechelse Herder. Ze hebben veel ruimte en beweging nodig. Als je wel in een appartement woont, moet je minimaal 2 uur per dag actief bezig zijn met de hond en zorgen voor voldoende mentale stimulatie. Een tuin is sterk aan te raden."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Mechelse Herders?",
      answer: "Mechelse Herders zijn relatief gezond, maar gevoelig voor heupdysplasie, elleboogdysplasie, epilepsie, degeneratieve myelopathie en lumbosacrale stenose. Kies een fokker die ouderdieren screent op deze aandoeningen. Met goede zorg hebben ze weinig gezondheidsproblemen."
    },
    {
      question: "Hoe oud wordt een Mechelse Herder gemiddeld?",
      answer: "Een gezonde Mechelse Herder wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige veterinaire controles kunnen ze een lang actief leven leiden."
    },
    {
      question: "Wat kost een Mechelse Herder pup in België?",
      answer: "Een Mechelse Herder pup met stamboom kost in België tussen €900 en €1.200, afhankelijk van de fokker en bloedlijn (werk- of showlijn). In Nederland liggen prijzen tussen €800 en €2.000. Werklijn pups zijn vaak duurder vanwege specifieke eigenschappen."
    },
    {
      question: "Zijn Mechelse Herders makkelijk te trainen?",
      answer: "Ja, Mechelse Herders zijn zeer trainbaar dankzij hun hoge intelligentie en 'will to please'. Ze leren razendsnel en excelleren in gehoorzaamheid. Maar ze hebben wel een consequente, ervaren hand nodig. Positieve training werkt het best, maar zonder duidelijke leiding kunnen ze dominant worden."
    }
  ],
  funFacts: [
    "Cairo, de Mechelse Herder die deelnam aan de SEAL Team Six raid tegen Osama bin Laden in 2011, kreeg een persoonlijke ontmoeting met president Obama.",
    "Mechelse Herders kunnen sprongen maken tot 2,5 meter hoog - hoger dan een gemiddelde basketbalring.",
    "Het ras wordt vaak ingezet bij speciale militaire eenheden wereldwijd vanwege hun moed, snelheid en betrouwbaarheid onder stress.",
    "In 1903 werd de eerste politiehondenwedstrijd voor Mechelse Herders gehouden in Mechelen, wat de basis legde voor hun carrière in veiligheidsdiensten.",
    "Mechelse Herders hebben een bijtkracht van ongeveer 195 PSI - minder dan een Duitse Herder maar extreem effectief door hun snelheid en wendbaarheid.",
    "De eerste Mechelse Herder 'Vos des Polders' werd in 1901 ingeschreven in het Belgische stamboek."
  ],
  history: {
    origin: "De Mechelse Herder ontstond eind 19e eeuw in België, rond de stad Mechelen (Frans: Malines), vandaar de naam. Het ras ontwikkelde zich als veedrijvershond op kleine Belgische boerderijen. In 1891 promoten een groep liefhebbers onder leiding van professor Adolphe Reul de Belgische Herder, en in 1892 werd de eerste tentoonstelling georganiseerd in Kuregem. De Mechelse Herder is één van de vier variëteiten van de Belgische Herder, onderscheiden door zijn korte, fawnkleurige vacht met zwart masker.",
    development: "Tussen 1890 en 1910 werden de vier Belgische Herder variëteiten gestandaardiseerd: Groenendaeler (zwart langharig), Tervuerense (gevlamd langharig), Laekense (ruwharig) en Mechelse (kortharig). De Mechelse variant werd het populairst door zijn veelzijdigheid en werkdrift. Tijdens de wereldoorlogen dienden Mechelse Herders als boodschappendragers en patrouillehonden. Na de oorlogen werd het ras steeds meer ingezet voor politie- en militair werk wereldwijd. Hun intelligentie, snelheid, uithoudingsvermogen en trainbaarheid maakten ze ideaal voor taken zoals explosievenopsporing, drugsdetectie en verdachtenpackaging. Vandaag de dag is de Mechelse Herder de standaard werkhond voor elite-militaire eenheden en politiekorpsen wereldwijd."
  },
  similarBreeds: [
    "Duitse Herder",
    "Hollandse Herder",
    "Groenendaeler",
    "Tervuerense",
    "Zwitserse Witte Herder"
  ],
  commonMistakes: [
    "Onderschatten van de werkdrift: Dit is geen hond voor een rustig gezin. Zonder werk of sport worden ze ongelukkig en destructief.",
    "Te weinig mentale uitdaging: Mechelse Herders vervelen zich snel en hebben naast beweging ook hersenwerk nodig zoals speurtraining of gehoorzaamheid.",
    "Geen consequente leiding: Deze honden nemen zelf beslissingen als je geen duidelijke leider bent. Consequentie is essentieel.",
    "Te jong beginnen met zware inspanning: Pups groeien snel en te veel springen/rennen kan gewrichten beschadigen. Bouw geleidelijk op.",
    "Socialisatie verwaarlozen: Zonder vroege socialisatie kunnen ze te beschermend of wantrouwend worden tegenover vreemden.",
    "Te lang alleen laten: Mechelse Herders zijn mensen-gericht en kunnen scheidingsangst en destructief gedrag ontwikkelen als ze te lang alleen zijn."
  ],
  monthlyCosts: {
    food: "€50-€100",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€16-€31",
    total: "€96-€191",
    note: "Kosten kunnen oplopen door sportactiviteiten en training (€100-€300 per cursus). Reken ook op hogere voedingskosten voor actieve werklijn honden. Aanschafkosten: €800-€2.000. Extra budget voor speelgoed en mentale stimulatie."
  }
};

// ===== Cavalier King Charles Spaniel =====
export const cavalierKingCharlesSpaniel: BreedDetails = {
  breedName: "Cavalier King Charles Spaniel",
  breedNameNL: "Cavalier King Charles Spaniel",
  faqs: [
    {
      question: "Is een Cavalier King Charles Spaniel geschikt voor een appartement?",
      answer: "Ja, Cavaliers zijn uitstekend geschikt voor appartementen. Ze zijn klein, rustig en passen zich makkelijk aan. Ze hebben wel dagelijkse wandelingen nodig (30-60 minuten), maar zijn binnenshuis kalm en ontspannen. Hun rustige karakter maakt ze ideaal voor stadsleven."
    },
    {
      question: "Hoeveel beweging heeft een Cavalier nodig?",
      answer: "Een Cavalier heeft gematigde beweging nodig: 30 tot 60 minuten per dag, verdeeld over wandelingen en speeltijd. Ze zijn niet hyper-actief, maar genieten wel van rennen en spelen. Ze passen zich aan het activiteitsniveau van hun eigenaar aan - ideaal voor zowel actieve als rustigere mensen."
    },
    {
      question: "Zijn Cavaliers goed met kinderen?",
      answer: "Ja, Cavaliers zijn fantastische gezinshonden en uitstekend met kinderen. Ze zijn vriendelijk, geduldig en zachtaardig. Hun kleine formaat en lieve karakter maken ze perfect voor gezinnen. Leer kinderen wel voorzichtig te zijn met de lange oren en zorg voor toezicht bij jonge kinderen."
    },
    {
      question: "Welke ernstige gezondheidsproblemen komen voor bij Cavaliers?",
      answer: "Cavaliers hebben helaas ernstige erfelijke problemen. Meer dan 50% ontwikkelt mitralisklepziekte (MVD) op 5-jarige leeftijd, wat kan leiden tot hartfalen. Tot 50% heeft syringomyelie (SM), een pijnlijke neurologische aandoening. Kies daarom altijd een fokker die ouderdieren screent op hart- en neurologische problemen."
    },
    {
      question: "Wat is syringomyelie en hoe herken je het?",
      answer: "Syringomyelie (SM) is een ernstige aandoening waarbij holtes in het ruggenmerg ontstaan door een te kleine schedel. Symptomen zijn nekpijn, krabben aan de schouder zonder aanraking, loopproblemen en pijngedrag. Het komt voor bij bijna 100% van de Cavaliers in Nederland/België. Vraag naar MRI-scans van ouderdieren."
    },
    {
      question: "Hoe oud wordt een Cavalier gemiddeld?",
      answer: "Een Cavalier wordt gemiddeld 9 tot 14 jaar oud, met een gemiddelde rond 12 jaar. Helaas wordt de levensduur vaak verkort door hartproblemen. Met goede zorg, regelmatige hartcontroles en een gezond gewicht kunnen ze een redelijk lang leven leiden."
    },
    {
      question: "Wat kost een Cavalier King Charles Spaniel pup in België?",
      answer: "Een Cavalier pup met stamboom kost in België tussen €1.000 en €3.000, met een gemiddelde rond €1.300-€2.000. Kies altijd een erkende fokker die hartscans en neurologische tests doet bij ouderdieren. Goedkopere pups hebben vaak hogere gezondheidsrisico's."
    },
    {
      question: "Kunnen Cavaliers lang alleen zijn?",
      answer: "Nee, Cavaliers zijn zeer aanhankelijk en kunnen scheidingsangst ontwikkelen. Ze zijn gefokt als gezelschapshonden en willen altijd bij hun mensen zijn. Laat ze maximaal 4-6 uur alleen, en bouw dit langzaam op. Ze zijn ideaal voor mensen die vaak thuis zijn."
    }
  ],
  funFacts: [
    "Koning Charles II van Engeland was zo obsessief met deze honden dat er zelfs een wet zou bestaan die ze toegang geeft tot alle publieke gebouwen in het VK (hoewel dit een mythe is).",
    "De vier kleurvariëteiten hebben koninklijke namen: Blenheim (rood-wit), Tricolor (zwart-wit-tan), Black & Tan en Ruby (kastanjebruin).",
    "Cavaliers werden afgebeeld op schilderijen van oude meesters zoals Van Dyck en Gainsborough, vaak op schoot van rijke vrouwen.",
    "Het ras werd in 1926 'herontdekt' toen een Amerikaanse fokker een prijs uitloofde voor de 'oud-type' spaniel met lange snuit.",
    "Charlotte uit 'Sex and the City' had een Cavalier genaamd Elizabeth Taylor.",
    "Cavaliers zijn één van de weinige rassen die bijna altijd met hun staart kwispelen - zelfs als ze in de problemen zitten!"
  ],
  history: {
    origin: "De Cavalier King Charles Spaniel vindt zijn oorsprong in Engeland, waar kleine toy spaniëls al sinds de middeleeuwen populair waren aan het hof. In de 17e eeuw werden ze bijzonder geliefd onder koning Charles II (1630-1685), die ze overal mee naartoe nam - zelfs naar regeringsvergaderingen en parlement. Deze kleine spaniëls werden gekruist met Aziatische rassen zoals de Pekinees, wat leidde tot de 'King Charles Spaniel' met een kortere snuit.",
    development: "In de 19e eeuw werden de originele spaniëls met lange snuit steeds zeldzamer door kruisingen met mopshonden, wat resulteerde in kortere snoeten en bollere koppen. In 1926 loofde de Amerikaanse Roswell Eldridge een prijs uit op Crufts voor fokkers die de 'oud-type' Blenheim spaniels met lange neus konden terugbrengen. Dit leidde tot de oprichting van de Cavalier King Charles Spaniel Club in 1928. Het ras werd officieel erkend door de Kennel Club in 1945 als een apart ras van de King Charles Spaniel. De 'Cavalier' in de naam verwijst naar de royalistische cavaliers uit de tijd van Charles II. Tegenwoordig is het een van de populairste gezelschapshonden wereldwijd."
  },
  similarBreeds: [
    "King Charles Spaniel",
    "Engelse Cocker Spaniel",
    "Springer Spaniel",
    "Papillon"
  ],
  commonMistakes: [
    "Goedkope pup kopen zonder gezondheidsscreening: Dit ras heeft ernstige erfelijke problemen. Bespaar niet op de fokker - het kost je later duizenden euro's aan veterinaire zorg.",
    "Hartproblemen negeren: Cavaliers hebben regelmatige hartcontroles nodig vanaf jonge leeftijd. Wacht niet tot symptomen verschijnen.",
    "Overvoeren: Cavaliers zijn gevoelig voor obesitas, wat hartproblemen verergert. Volg voedingsrichtlijnen strikt.",
    "Te lang alleen laten: Deze honden zijn gefokt als gezelschap en kunnen ernstige scheidingsangst ontwikkelen.",
    "Oren niet controleren: Lange hangende oren vangen vocht en vuil, wat leidt tot oorinfecties. Controleer en reinig wekelijks.",
    "Geen verzekering afsluiten: Door de hoge kans op ernstige gezondheidsproblemen is een goede verzekering essentieel voor Cavaliers."
  ],
  monthlyCosts: {
    food: "€30-€50",
    vet: "€30-€70",
    grooming: "€30-€60",
    insurance: "€25-€50",
    total: "€115-€230",
    note: "Kosten kunnen aanzienlijk hoger uitvallen door hartproblemen (medicatie €30-€100/maand) en neurologische aandoeningen. Hartscans kosten €150-€300 per controle. Reken op hogere dierenarts- en verzekeringkosten dan bij gemiddelde rassen. Aanschafkosten: €1.000-€3.000."
  }
};

// ===== Shiba Inu =====
export const shibaInu: BreedDetails = {
  breedName: "Shiba Inu",
  breedNameNL: "Shiba Inu",
  faqs: [
    {
      question: "Is een Shiba Inu geschikt voor beginners?",
      answer: "Nee, een Shiba Inu is niet ideaal voor beginners. Ze zijn eigenwijs, onafhankelijk en hebben een sterke wil. Training vraagt geduld, consistentie en ervaring. Hun katachtige karakter betekent dat ze niet altijd gehoorzamen - zelfs niet als ze het commando kennen. Dit ras is beter voor ervaren hondenbezitters."
    },
    {
      question: "Hoeveel beweging heeft een Shiba Inu nodig?",
      answer: "Een Shiba Inu heeft minimaal 1 uur beweging per dag nodig. Ze zijn energiek en houden van rennen en spelen. Let wel: hun jachtinstinct is sterk, dus laat ze alleen los in veilig omheinde gebieden. Ze kunnen niet altijd betrouwbaar teruggeroepen worden als ze een interessante geur oppikken."
    },
    {
      question: "Zijn Shiba Inu's goed met kinderen?",
      answer: "Shiba Inu's kunnen goed met kinderen als ze goed gesocialiseerd zijn en de kinderen respectvol omgaan met de hond. Ze zijn loyaal aan hun gezin maar wel gereserveerd en minder geduldig dan bijvoorbeeld een Golden Retriever. Ze zijn beter geschikt voor gezinnen met oudere, rustige kinderen."
    },
    {
      question: "Waarom schreeuwt mijn Shiba Inu?",
      answer: "Shiba Inu's staan bekend om de 'Shiba scream' - een doordringend geluid dat ze maken als ze ontevreden zijn, bijvoorbeeld tijdens nagels knippen of als ze niet krijgen wat ze willen. Dit is normaal gedrag voor het ras, maar kan wel irritant zijn. Training helpt dit te verminderen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Shiba Inu's?",
      answer: "Shiba Inu's zijn over het algemeen gezond met weinig erfelijke problemen. Ze kunnen gevoelig zijn voor allergieën, patella luxatie (knie), heupdysplasie en oogproblemen zoals glaucoom. Ze zijn een robuust ras met relatief weinig gezondheidsproblemen vergeleken met andere rassen."
    },
    {
      question: "Hoe oud wordt een Shiba Inu gemiddeld?",
      answer: "Een Shiba Inu heeft een lange levensverwachting van 12 tot 15 jaar, met sommige exemplaren die tot 18 jaar oud worden. Hun robuuste gezondheid en natuurlijke selectie dragen bij aan hun lange leven."
    },
    {
      question: "Wat kost een Shiba Inu pup in België?",
      answer: "Een Shiba Inu pup met stamboom kost in België tussen €1.350 en €2.000, afhankelijk van de fokker en bloedlijn. In Nederland liggen prijzen tussen €981 en €2.000. Dit is een zeldzamer ras, wat de hogere prijzen verklaart."
    },
    {
      question: "Verhaart een Shiba Inu veel?",
      answer: "Ja, Shiba Inu's verharen intensief, vooral tijdens de jaarlijkse verhaarperiodes in voorjaar en herfst ('blowing coat'). Dan verliezen ze hun ondervacht in grote hoeveelheden. Regelmatig borstelen (3-4x per week, dagelijks tijdens verharen) is essentieel om losse haren te verwijderen."
    }
  ],
  funFacts: [
    "Shiba Inu's werden in 1936 uitgeroepen tot nationaal monument van Japan en zijn een van de zes oorspronkelijke Japanse hondenrassen.",
    "Het beroemde 'Doge' internet meme is gebaseerd op Kabosu, een vrouwelijke Shiba Inu uit Japan.",
    "De naam 'Shiba' betekent 'struikgewas' in het Japans, verwijzend naar de struiken waar ze doorheen joegen tijdens de jacht, of naar hun rode vacht.",
    "Shiba Inu's hebben een katachtig karakter: ze poetsen zichzelf, zijn onafhankelijk en mijden vaak water.",
    "Het ras overleefde bijna uitsterving tijdens WOII door bombardementen en ziekte-uitbraken.",
    "Shiba Inu's hebben een 'urajiro' patroon - witte of crème markering op de wangen, borst, buik en onderkant van de staart."
  ],
  history: {
    origin: "De Shiba Inu is een van de oudste Japanse hondenrassen, met wortels die teruggaan tot ongeveer 7000 v.Chr. Archeologische vondsten tonen aan dat voorouders van de Shiba met de eerste migranten naar Japan kwamen. Oorspronkelijk werden ze gefokt als jachthond op klein wild zoals vogels, konijnen en vossen in de dichte bergbossen van Japan. In de 7e eeuw werd het ras erkend als een van de zes inheemse Japanse rassen.",
    development: "Tijdens de Meiji-periode (1868-1912) werden westerse hondenrassen geïmporteerd naar Japan, wat leidde tot kruisingen die de puurheid van de Shiba bedreigden. In de jaren 1920 begonnen Japanse fokkers met een preservatieprogramma om het originele type te behouden. In 1936 werd de Shiba Inu uitgeroepen tot nationaal monument van Japan. Tijdens WOII raakte het ras bijna uitgestorven door bombardementen en een uitbraak van hondenziekte. Na de oorlog werden de drie overgebleven bloedlijnen (Shinshu Shiba, Mino Shiba en San'in Shiba) samengevoegd om het moderne ras te creëren. De Shiba werd in 1992 officieel erkend door de American Kennel Club en groeide wereldwijd in populariteit door zijn vosachtig uiterlijk en unieke persoonlijkheid."
  },
  similarBreeds: [
    "Akita Inu",
    "Shikoku",
    "Kishu Ken",
    "Hokkaido Inu",
    "Finse Spits"
  ],
  commonMistakes: [
    "Geen consequente training: Shiba's zijn koppig en nemen zelf beslissingen als je niet consequent bent. Begin vroeg met training.",
    "Loslaten zonder veilige omheining: Hun jachtinstinct is zo sterk dat ze kunnen wegrennen en niet terugkomen, zelfs met goede training.",
    "Geen vroege socialisatie: Shiba's kunnen terughoudend of zelfs agressief zijn naar andere honden zonder goede socialisatie.",
    "Verwachten dat ze als een Golden Retriever zijn: Shiba's zijn niet aanhankelijk of gehoorzaam uit wil om te behagen. Ze doen wat ze zelf willen.",
    "Vacht verwaarlozen tijdens verharen: Zonder dagelijks borstelen tijdens 'blowing coat' heb je overal haar in huis.",
    "Te weinig mentale uitdaging: Shiba's zijn intelligent en kunnen destructief worden als ze zich vervelen."
  ],
  monthlyCosts: {
    food: "€30-€50",
    vet: "€15-€30",
    grooming: "€10-€20",
    insurance: "€11-€34",
    total: "€66-€134",
    note: "Kosten blijven relatief laag door de goede gezondheid van het ras. Reken wel op extra kosten tijdens verhaarperiodes voor professionele grooming (€50-€80 per sessie). Aanschafkosten: €1.350-€2.000."
  }
};

// ===== Engelse Cocker Spaniel =====
export const engelsecockerSpaniel: BreedDetails = {
  breedName: "English Cocker Spaniel",
  breedNameNL: "Engelse Cocker Spaniel",
  faqs: [
    {
      question: "Is een Engelse Cocker Spaniel geschikt voor een appartement?",
      answer: "Ja, een Engelse Cocker Spaniel kan in een appartement wonen als hij voldoende beweging krijgt. Ze zijn niet erg groot en rustig binnenshuis na een goede wandeling. Wel hebben ze minimaal 1 uur beweging per dag nodig. Een tuin is fijn maar niet verplicht."
    },
    {
      question: "Hoeveel beweging heeft een Engelse Cocker Spaniel nodig?",
      answer: "Een volwassen Engelse Cocker Spaniel heeft minimaal 1 tot 1,5 uur beweging per dag nodig. Ze zijn energieke jachthonden die houden van rennen, zwemmen en apporteren. Zonder voldoende beweging kunnen ze onrustig en destructief worden. Mentale stimulatie is ook belangrijk."
    },
    {
      question: "Zijn Engelse Cocker Spaniels goed met kinderen?",
      answer: "Ja, Engelse Cocker Spaniels zijn uitstekende gezinshonden. Ze zijn vriendelijk, speels en geduldig met kinderen. Hun vrolijke karakter maakt ze perfect voor actieve gezinnen. Leer kinderen wel respectvol omgaan met de hond en houd toezicht bij jonge kinderen."
    },
    {
      question: "Hoeveel verzorging heeft de vacht nodig?",
      answer: "De Engelse Cocker Spaniel heeft een hoge verzorgingsbehoefte. Borstel minimaal 3-4 keer per week om klitten te voorkomen, vooral achter de oren en poten. Professionele trimming is nodig om de 6-8 weken (€50-€70 per sessie). Oren en poten moeten regelmatig worden gecontroleerd."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Engelse Cocker Spaniels?",
      answer: "Engelse Cocker Spaniels zijn gevoelig voor oorinfecties (door hun lange hangende oren), oogproblemen zoals PRA en staar, heupdysplasie, obesitas, leveraandoeningen en hartziekten. Regelmatige controles en goede preventieve zorg zijn essentieel."
    },
    {
      question: "Hoe oud wordt een Engelse Cocker Spaniel gemiddeld?",
      answer: "Een gezonde Engelse Cocker Spaniel wordt gemiddeld 12 tot 15 jaar oud. Met goede voeding, voldoende beweging, regelmatige verzorging en veterinaire controles kunnen ze een lang en gezond leven leiden."
    },
    {
      question: "Wat kost een Engelse Cocker Spaniel pup in België?",
      answer: "Een Engelse Cocker Spaniel pup met stamboom kost in België tussen €1.000 en €2.000, met een gemiddelde rond €1.250-€1.750. In Nederland liggen prijzen tussen €1.200 en €1.900. Kies altijd een fokker die ouderdieren screent op erfelijke aandoeningen."
    },
    {
      question: "Zijn Engelse Cocker Spaniels makkelijk te trainen?",
      answer: "Ja, Engelse Cocker Spaniels zijn intelligent en leergierig, wat ze redelijk makkelijk trainbaar maakt. Ze reageren goed op positieve bekrachtiging met beloningen en lof. Ze kunnen wel koppig zijn, dus consistentie is belangrijk. Begin vroeg met training en socialisatie."
    }
  ],
  funFacts: [
    "De naam 'Cocker' komt van 'woodcock' (houtsnip), de vogel waar ze oorspronkelijk op joegen in Engeland.",
    "Lady, de hoofdpersoon uit Disney's 'Lady and the Tramp', is een Amerikaanse Cocker Spaniel, een nauw verwant ras.",
    "Engelse Cocker Spaniels staan bekend om hun enthousiast kwispelende staart - zo enthousiast dat ze hele tafels kunnen leegvegen!",
    "Het ras was enorm populair in de jaren 1950-60 en stond vaak in de top 3 van populairste rassen in Engeland.",
    "Prins William en Kate Middleton hebben een Engelse Cocker Spaniel genaamd Lupo (geboren in 2011).",
    "Engelse Cocker Spaniels hebben een uitzonderlijk goede neus en worden soms ingezet als speurhonden voor drugs of explosieven."
  ],
  history: {
    origin: "De Engelse Cocker Spaniel vindt zijn oorsprong in Engeland, met wortels die teruggaan tot de 10e eeuw. Spaniels werden gebruikt voor de jacht op vogels in dichtbegroeide gebieden en moerassen. De naam suggereert dat ze mogelijk uit Spanje kwamen en rond de 14e eeuw in Engeland arriveerden. In de vroege geschiedenis werd onderscheid gemaakt tussen land-spaniels en water-spaniels, waarbij de kleinere exemplaren werden ingezet voor het opjagen van houtsnips (woodcock) - vandaar de naam 'Cocker'.",
    development: "In de 19e eeuw werden spaniels gestandaardiseerd op basis van grootte en functie. De Engelse Cocker Spaniel werd officieel erkend door de Kennel Club in 1893 als een apart ras. In die periode ontstond ook de Amerikaanse Cocker Spaniel als een kleinere, meer gezelschapsgerichte variant. De Engelse versie bleef dichter bij het oorspronkelijke werktype: iets groter, atletischer en met sterkere jachtinstincten. In 1906 werd in Nederland een rasvereniging opgericht. Het ras won aan populariteit door zijn veelzijdigheid: zowel als jachthond, showhond en gezinshond. Engelse Cocker Spaniels excelleren in veldtrials en blijven populair bij jagers, maar zijn ook geliefd als actieve gezinshonden door hun vriendelijke karakter."
  },
  similarBreeds: [
    "Amerikaanse Cocker Spaniel",
    "Springer Spaniel",
    "Field Spaniel",
    "Cavalier King Charles Spaniel"
  ],
  commonMistakes: [
    "Oren verwaarlozen: Lange hangende oren vangen vocht en vuil, wat leidt tot chronische oorinfecties. Controleer en reinig wekelijks.",
    "Vacht niet regelmatig verzorgen: Zonder regelmatig borstelen en trimmen ontstaan klitten en huidproblemen. Dit is een hoge-onderhoudsras.",
    "Overvoeren: Engelse Cocker Spaniels zijn gevoelig voor obesitas. Let op portiegroottes en beperk treats.",
    "Te weinig beweging: Dit zijn actieve jachthonden, geen bankhonden. Zonder voldoende beweging worden ze ongelukkig.",
    "Geen mentale stimulatie: Hun intelligentie en jachtinstinct vragen om mentale uitdaging zoals apporteren, zoekspelletjes of training.",
    "Te lang alleen laten: Engelse Cocker Spaniels zijn sociaal en kunnen scheidingsangst ontwikkelen als ze regelmatig lang alleen zijn."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€20-€40",
    grooming: "€50-€70",
    insurance: "€20-€35",
    total: "€130-€215",
    note: "Groomingkosten zijn hoog door de noodzaak van professionele trimming elke 6-8 weken (€50-€70 per sessie). Oorproblemen kunnen extra dierenarts kosten veroorzaken. Aanschafkosten: €1.000-€2.000. Eerste jaar totaal: €2.000-€3.000."
  }
};

// ===== Australische Herder =====
export const australischeHerder: BreedDetails = {
  breedName: "Australian Shepherd",
  breedNameNL: "Australische Herder",
  faqs: [
    {
      question: "Is een Australische Herder geschikt voor beginners?",
      answer: "Een Australische Herder is uitdagend voor beginners maar niet onmogelijk. Ze zijn zeer intelligent en trainbaar, maar hebben veel energie en mentale stimulatie nodig. Als je bereid bent om tijd te investeren in training, beweging en activiteiten, kan het lukken. Ervaring met honden is wel een voordeel."
    },
    {
      question: "Hoeveel beweging heeft een Australische Herder nodig?",
      answer: "Een Australische Herder heeft minimaal 1,5 tot 2 uur intensieve beweging per dag nodig. Dit moet actieve beweging zijn zoals rennen, fietsen, agility of zwemmen. Alleen wandelen is niet genoeg - ze hebben taken en mentale uitdaging nodig om gelukkig te blijven."
    },
    {
      question: "Zijn Australische Herders goed met kinderen?",
      answer: "Ja, Australische Herders kunnen uitstekend met kinderen omgaan. Ze zijn speels, beschermend en loyaal. Let wel op hun herdersinstinct - ze kunnen kinderen proberen te 'hoeden' door achter hakken te lopen. Vroege socialisatie en training zijn belangrijk. Ze zijn ideaal voor actieve gezinnen."
    },
    {
      question: "Kan een Australische Herder in een appartement wonen?",
      answer: "Een appartement is niet ideaal voor een Australische Herder, maar het kan als je zeer actief bent. Ze hebben veel ruimte nodig om energie kwijt te raken. Als je in een appartement woont, moet je minimaal 2 uur per dag actief bezig zijn en zorgen voor voldoende mentale stimulatie. Een tuin is sterk aan te raden."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Australische Herders?",
      answer: "Australische Herders zijn gevoelig voor heupdysplasie, oogafwijkingen zoals cataracten en Collie Eye Anomaly, epilepsie, MDR1-gen mutatie (overgevoeligheid voor medicijnen) en huidallergieën. Kies een fokker die ouderdieren screent op deze aandoeningen."
    },
    {
      question: "Hoe oud wordt een Australische Herder gemiddeld?",
      answer: "Een gezonde Australische Herder wordt gemiddeld 12 tot 15 jaar oud, met een gemiddelde rond 13-14 jaar. Met goede zorg, voeding, beweging en preventieve gezondheidstesten kunnen ze een lang actief leven leiden."
    },
    {
      question: "Wat kost een Australische Herder pup in België?",
      answer: "Een Australische Herder pup met stamboom kost in België tussen €1.200 en €2.000, afhankelijk van fokker, bloedlijn en gezondheidstesten. In Nederland liggen prijzen tussen €1.000 en €2.000, met een gemiddelde rond €1.064."
    },
    {
      question: "Verhaart een Australische Herder veel?",
      answer: "Ja, Australische Herders verharen matig tot veel, vooral tijdens seizoenswisselingen in voorjaar en herfst. Ze hebben een dikke dubbele vacht die regelmatig borstelen vereist (3-4x per week, dagelijks tijdens verharen) om losse haren te verwijderen en de vacht gezond te houden."
    }
  ],
  funFacts: [
    "Ondanks de naam komt de Australische Herder niet uit Australië, maar uit het westen van de Verenigde Staten!",
    "Australische Herders hebben vaak verschillende gekleurde ogen (heterochromie) - één blauw en één bruin, wat 'split eyes' wordt genoemd.",
    "Sommige Australische Herders worden geboren zonder staart of met een korte 'bob tail' - dit is een natuurlijke variatie.",
    "Het ras werd beroemd door rodeo's in de jaren 1950-60, waar ze optredens gaven met hun behendigheid en trucs.",
    "Australische Herders excelleren in vrijwel alle hondensporten: agility, flyball, frisbee, herding trials en gehoorzaamheid.",
    "Ze worden vaak ingezet als therapie- en hulphonden door hun intuïtieve en empathische karakter."
  ],
  history: {
    origin: "De Australische Herder is ondanks de naam een Amerikaans ras, ontwikkeld in de 19e eeuw op ranches in het westen van de VS, zoals Californië, Colorado en Idaho. De voorouders waren Europese herdershonden, vooral uit het Baskenland en Spanje, die via Australië meekwamen met schapen-importen voor de Amerikaanse veehouderij. De associatie met Australië ontstond doordat veel van deze honden samen met Australische schapen aankwamen.",
    development: "Amerikaanse ranchers fokten deze honden selectief voor hun vermogen om grote kuddes schapen en vee te hoeden in ruig, uitgestrekt terrein. Ze legden nadruk op intelligentie, uithoudingsvermogen, veelzijdigheid en aanpassingsvermogen aan het droge, hete klimaat van het Amerikaanse Westen. Het ras bleef puur een werkhond tot de jaren 1950, toen het bekendheid kreeg via rodeo's waar Australische Herders trucs en hoedetaken demonstreerden. In 1957 werd de Australian Shepherd Club of America opgericht. Het ras werd officieel erkend door de American Kennel Club in 1991. Australische Herders blijven populair als ranchwerkdieren, maar zijn ook geliefd als gezinshonden en excelleren in hondensporten wereldwijd."
  },
  similarBreeds: [
    "Border Collie",
    "Australische Cattle Dog",
    "Blue Heeler",
    "Shetland Sheepdog",
    "Collie"
  ],
  commonMistakes: [
    "Onderschatten van de energiebehoefte: Dit is geen hond voor rustige gezinnen. Zonder voldoende beweging worden ze destructief en ongelukkig.",
    "Geen mentale uitdaging: Australische Herders vervelen zich snel zonder hersenwerk. Zorg voor puzzels, training en taken.",
    "Te weinig socialisatie: Ze kunnen wantrouwend zijn tegenover vreemden zonder vroege en uitgebreide socialisatie.",
    "Kuddegedrag negeren: Hun instinct om te hoeden kan leiden tot achtervolgen van auto's, kinderen of andere dieren. Training is essentieel.",
    "Te lang alleen laten: Australische Herders zijn mensen-gericht en kunnen scheidingsangst en destructief gedrag ontwikkelen.",
    "Geen consequente training: Hun intelligentie betekent dat ze snel leren - zowel goede als slechte gewoonten. Wees consistent."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€50",
    grooming: "€15-€30",
    insurance: "€20-€40",
    total: "€110-€200",
    note: "Kosten kunnen hoger uitvallen door sportactiviteiten en training (€100-€300 per cursus). Reken ook op MDR1-gentests (€50-€100) en oogtests. Aanschafkosten: €1.000-€2.000. Extra budget voor mentale stimulatie en speelgoed."
  }
};

// ===== Duitse Herder =====
export const duitseHerder: BreedDetails = {
  breedName: "German Shepherd",
  breedNameNL: "Duitse Herder",
  faqs: [
    {
      question: "Is een Duitse Herder geschikt voor beginners?",
      answer: "Een Duitse Herder is uitdagend voor beginners maar niet onmogelijk. Ze zijn intelligent en loyaal, maar ook energiek en hebben consequente training nodig. Ze kunnen dominant zijn zonder duidelijke leiding. Als je bereid bent om tijd te investeren in training en socialisatie, kan het lukken. Ervaring met honden is wel een groot voordeel."
    },
    {
      question: "Hoeveel beweging heeft een Duitse Herder nodig?",
      answer: "Een Duitse Herder heeft minimaal 1,5 tot 2 uur beweging per dag nodig. Dit moeten actieve wandelingen, rennen, spelen of hondensporten zijn. Ze zijn werkhonden en hebben naast fysieke beweging ook mentale stimulatie nodig zoals gehoorzaamheidstraining of zoekspelletjes."
    },
    {
      question: "Zijn Duitse Herders goed met kinderen?",
      answer: "Ja, Duitse Herders kunnen uitstekend met kinderen omgaan als ze goed gesocialiseerd zijn. Ze zijn beschermend, loyaal en geduldig met gezinsleden. Hun grote formaat en energie vereisen wel toezicht bij jonge kinderen. Ze zijn ideaal voor gezinnen met oudere kinderen die de hond respectvol behandelen."
    },
    {
      question: "Welke gezondheidsproblemen komen vaak voor bij Duitse Herders?",
      answer: "Duitse Herders zijn zeer gevoelig voor heupdysplasie en elleboogdysplasie. Andere veelvoorkomende problemen zijn degeneratieve myelopathie (DM), maagomslag, schildklierproblemen, allergieën en kanker. Kies altijd een fokker die ouderdieren screent op HD en ED met A- of B-scores."
    },
    {
      question: "Hoe oud wordt een Duitse Herder gemiddeld?",
      answer: "Een Duitse Herder wordt gemiddeld 9 tot 13 jaar oud, met een gemiddelde rond 10-11 jaar. Vrouwelijke honden leven vaak iets langer dan mannetjes. Met goede zorg, voeding en preventie van obesitas en gewrichtsproblemen kunnen sommige ouder worden."
    },
    {
      question: "Wat kost een Duitse Herder pup in België?",
      answer: "Een Duitse Herder pup met stamboom kost in België tussen €800 en €1.650, afhankelijk van fokker, bloedlijn (werk- of showlijn) en gezondheidstesten. In Nederland liggen prijzen tussen €900 en €2.000, met een gemiddelde rond €1.000-€1.500."
    },
    {
      question: "Verhaart een Duitse Herder veel?",
      answer: "Ja, Duitse Herders verharen intensief het hele jaar door en extra veel tijdens seizoenswisselingen. Ze hebben een dikke dubbele vacht die dagelijks borstelen vereist om losse haren te verwijderen. Bereid je voor op veel hondenha ar overal in huis!"
    },
    {
      question: "Zijn Duitse Herders goede waakhonden?",
      answer: "Ja, Duitse Herders zijn uitstekende waakhonden. Ze zijn waakzaam, beschermend en loyaal aan hun gezin. Hun natuurlijke wantrouwen tegenover vreemden en intelligentie maken ze ideaal voor bewaking. Ze zijn vaak ingezet als politie- en legerh onden om deze redenen."
    }
  ],
  funFacts: [
    "Rin Tin Tin, één van de beroemdste honden uit Hollywood, was een Duitse Herder die in 26 films speelde en Warner Bros. Studios financieel redde in de jaren 1920.",
    "Duitse Herders hebben de derde sterkste bijtkracht van alle hondenrassen: ongeveer 238 PSI (pounds per square inch).",
    "Het ras werd ontwikkeld door één man: kapitein Max von Stephanitz, die in 1899 de eerste Duitse Herder registreerde (Horand von Grafrath).",
    "Duitse Herders zijn het meest gebruikte ras voor politie- en militaire doeleinden wereldwijd.",
    "Ze kunnen meer dan 250 commando's en gebaren leren - een van de meest trainbare rassen ter wereld.",
    "Buddy, de eerste officiële blindengeleidehond in de VS (1928), was een Duitse Herder."
  ],
  history: {
    origin: "De Duitse Herder ontstond eind 19e eeuw in Duitsland als werkhond voor het hoeden van schapen. Door de industrialisatie namen schapenkuddes af, wat leidde tot de behoefte aan een uniform ras voor nieuwe taken. Max von Stephanitz, een voormalige legerofficier en hondenfokker, had de visie om een veelzijdige, intelligente werkhond te creëren. In 1899 kocht hij een hond genaamd Hektor Linksrhein (later hernoemd tot Horand von Grafrath) op een hondenshow, die de stamvader werd van alle moderne Duitse Herders.",
    development: "Von Stephanitz richtte datzelfde jaar de Verein für Deutsche Schäferhunde (SV) op, de eerste rasvereniging voor Duitse Herders. Hij ontwikkelde strikte fokstandaarden met nadruk op werkvermogen, anatomie en karakter in plaats van alleen uiterlijk. Het doel was een wolfachtige hond die geschikt was voor politie- en legerwerk. In 1901 organiseerde hij al wedstrijden voor politiehonden. Tijdens de Eerste en Tweede Wereldoorlog werden Duitse Herders massaal ingezet als boodschappenhonden, bewakers en speurhonden, wat hun reputatie wereldwijd vestigde. Na WOII won het ras aan populariteit als gezinshond, politiehond en hulphond. Tegenwoordig zijn Duitse Herders de standaard voor politie-, leger-, douane- en reddingswerk wereldwijd, maar ook geliefd als loyale gezinshonden."
  },
  similarBreeds: [
    "Mechelse Herder",
    "Hollandse Herder",
    "Tervuerense",
    "Zwitserse Witte Herder",
    "King Shepherd"
  ],
  commonMistakes: [
    "Geen consequente training en leiderschap: Duitse Herders hebben duidelijke regels en een sterke leider nodig. Zonder dit kunnen ze dominant worden.",
    "Te weinig socialisatie: Ze kunnen wantrouwend of agressief worden tegenover vreemden en andere honden zonder uitgebreide vroege socialisatie.",
    "Overvoeren en te weinig beweging: Dit leidt tot obesitas, wat heupdysplasie verergert. Houd ze slank en actief.",
    "Pup van onbetrouwbare fokker: Veel Duitse Herders komen van broodfokkers met ernstige gezondheidsproblemen. Kies een fokker met HD/ED-tests.",
    "Te jong beginnen met zware inspanning: Pups groeien snel en te veel springen/rennen beschadigt gewrichten. Bouw beweging geleidelijk op.",
    "Rug verwaarlozen: De typische 'hellende rug' van showlijnen kan leiden tot rugproblemen. Werklijnen hebben vaak een rechter rug."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€30-€60",
    grooming: "€15-€30",
    insurance: "€25-€45",
    total: "€130-€235",
    note: "Kosten kunnen aanzienlijk hoger uitvallen door heupdysplasie en andere gewrichtsproblemen (operaties €2.000-€6.000). Reken op extra kosten voor training en socialisatie. Aanschafkosten: €800-€2.000. Jaarlijkse kosten kunnen oplopen tot €2.000+."
  }
};


// ===== Berner Sennenhond =====
export const bernerSennenhond: BreedDetails = {
  breedName: "Bernese Mountain Dog",
  breedNameNL: "Berner Sennenhond",
  faqs: [
    {
      question: "Is een Berner Sennenhond geschikt voor een appartement?",
      answer: "Nee, een Berner Sennenhond is niet ideaal voor een appartement. Ze zijn grote, zware honden (40-55 kg) die veel ruimte nodig hebben. Ze zijn rustig binnenshuis, maar hebben wel een tuin en voldoende bewegingsruimte nodig. Hun grote formaat maakt hen beter geschikt voor een huis met tuin."
    },
    {
      question: "Hoeveel beweging heeft een Berner Sennenhond nodig?",
      answer: "Een Berner Sennenhond heeft gematigde beweging nodig: 1 tot 1,5 uur per dag. Ze zijn niet hyper-actief zoals Border Collies, maar houden wel van wandelen en zwemmen. Vermijd overmatige inspanning, vooral bij warm weer en in de groeifase, vanwege hun zware gewicht en gevoeligheid voor gewrichtsproblemen."
    },
    {
      question: "Zijn Berner Sennenhonden goed met kinderen?",
      answer: "Ja, Berner Sennenhonden zijn uitstekende gezinshonden! Ze zijn geduldig, vriendelijk en beschermend tegenover kinderen. Hun rustige, goedmoedige karakter maakt ze perfect voor gezinnen. Let wel op hun grote formaat bij jonge kinderen - ze kunnen per ongeluk kleine kinderen omverlopen."
    },
    {
      question: "Waarom is de levensverwachting van Berner Sennenhonden zo kort?",
      answer: "Helaas hebben Berner Sennenhonden een korte levensverwachting van 7 tot 10 jaar, voornamelijk door een hoog risico op kanker. Histiocytair sarcoom en andere kankersoorten zijn de belangrijkste doodsoorzaken. Dit is een bekend probleem in het ras waar fokkers aan werken door genetische screening."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Berner Sennenhonden?",
      answer: "Berner Sennenhonden hebben een hoog risico op kanker (belangrijkste doodsoorzaak), heupdysplasie, elleboogdysplasie, degeneratieve myelopathie, aortastenose (hartprobleem) en mastceltumoren. Kies altijd een fokker die ouderdieren screent, inclusief SH-test voor kankerrisico."
    },
    {
      question: "Hoe oud wordt een Berner Sennenhond gemiddeld?",
      answer: "Een Berner Sennenhond wordt gemiddeld slechts 7 tot 10 jaar oud, met een gemiddelde rond 8-9 jaar. Dit is aanzienlijk korter dan de meeste rassen door het hoge kankerrisico. Met uitstekende zorg en genetische screening kunnen sommige 10-12 jaar bereiken, maar dit is zeldzaam."
    },
    {
      question: "Wat kost een Berner Sennenhond pup in België?",
      answer: "Een Berner Sennenhond pup met stamboom kost in België en Nederland tussen €1.000 en €2.000, met een gemiddelde rond €1.200-€1.500. Kies altijd een fokker die voldoet aan rasverenigingseisen en genetische gezondheidstesten uitvoert, vooral voor kankerrisico (SH-test)."
    },
    {
      question: "Kunnen Berner Sennenhonden tegen de hitte?",
      answer: "Nee, Berner Sennenhonden hebben een dikke, lange vacht en zijn gefokt voor koud bergklimaat. Ze zijn zeer gevoelig voor oververhitting. Vermijd wandelen in de hitte, zorg voor schaduw en airconditioning, en let op tekenen van hittestress. Ze gedijen het best in koelere klimaten."
    }
  ],
  funFacts: [
    "Berner Sennenhonden werden oorspronkelijk gebruikt om melkkarren te trekken van de boerderij naar de markt - ze kunnen tot 500 kg trekken!",
    "Het ras stamt mogelijk af van mastiff-achtige honden die Romeinse legers meebrachten naar Zwitserland meer dan 2.000 jaar geleden.",
    "Berner Sennenhonden hebben een karakteristieke driekleurige vacht: zwart, roestbruin en wit, met een witte 'Zwitsers kruis' op de borst.",
    "Het ras verdween bijna aan het eind van de 19e eeuw en werd gered door kynoloog Franz Schertenleib die het herontdekte in het Dürrbach-gebied.",
    "Berner Sennenhonden zijn één van de vier Zwitserse Sennenhondenrassen, samen met de Grote Zwitserse, Appenzeller en Entlebucher Sennenhond.",
    "Ze worden ook wel 'Velcro dogs' genoemd omdat ze altijd bij hun mensen willen zijn - ze volgen je van kamer naar kamer."
  ],
  history: {
    origin: "De Berner Sennenhond stamt af van oude boerenhonden in Zwitserland, mogelijk afkomstig van zware mastiff-achtige honden die Romeinse legers meebrachten tijdens hun invasie van de Alpen rond 2.000 jaar geleden. Het ras ontwikkelde zich in het voor-Alpengebied rond het kanton Bern in Zwitserland. 'Senne' verwijst naar de Alpweiden waar deze honden werkten. Berner Sennenhonden werden gebruikt als veelzijdige werkh onden: ze hoedden vee, bewaakten boerderijen en trokken karren met melk en kaas naar de markt.",
    development: "Tegen het einde van de 19e eeuw raakte het ras bijna uitgestorven door modernisering en de komst van gemotoriseerd transport. In 1892 herontdekte kynoloog Franz Schertenleib het ras in het Dürrbach-gebied bij Bern en begon een fokprogramma om het te behouden. In 1907 werden enkele exemplaren tentoongesteld, en in 1908 kreeg het ras officieel de naam 'Berner Sennenhond'. De Schweizerische Dürrbach-Klub (later de rasvereniging) werd opgericht om het ras te standaardiseren. In 1937 werd het ras geïmporteerd naar de Verenigde Staten. Het won wereldwijd aan populariteit door zijn vriendelijke karakter en imposante uiterlijk. Helaas heeft intensieve fokkerij geleid tot gezondheidsproblemen, vooral kanker, waar fokkers nu actief aan werken door genetische screening en verantwoord fokken."
  },
  similarBreeds: [
    "Grote Zwitserse Sennenhond",
    "Sint-Bernard",
    "Newfoundlander",
    "Appenzeller Sennenhond",
    "Leonberger"
  ],
  commonMistakes: [
    "Geen screening op kankerrisico: Dit is cruciaal bij Berners. Vraag altijd naar SH-testen bij ouderdieren (A = laag risico, C = hoog risico).",
    "Te veel beweging bij pups: Berner pups groeien snel en zware inspanning beschadigt gewrichten. Beperk springen en rennen tot ze volwassen zijn (18-24 maanden).",
    "Verwaarlozen bij warm weer: Ze zijn zeer gevoelig voor oververhitting. Wandel vroeg in de ochtend of laat in de avond tijdens zomers.",
    "Geen gewichtscontrole: Overgewicht verergert heupdysplasie en andere gewrichtsproblemen. Houd ze slank.",
    "Te lang alleen laten: Berners zijn zeer sociaal en ontwikkelen scheidingsangst als ze regelmatig lang alleen zijn.",
    "Vacht verwaarlozen: Hun lange vacht vraagt regelmatig borstelen (2-3x per week) om klitten te voorkomen."
  ],
  monthlyCosts: {
    food: "€80-€120",
    vet: "€40-€80",
    grooming: "€20-€40",
    insurance: "€30-€60",
    total: "€170-€300",
    note: "Kosten zijn hoog door grote formaat en hoge gezondheidrisico's, vooral kanker. Verzekeringen zijn duurder voor dit ras. Aanschafkosten: €1.000-€2.000. Levenskosten zijn lager dan gemiddeld door korte levensduur, maar intensiever door medische problemen."
  }
};

// ===== Zwitserse Witte Herder =====
export const zwitserseWitteHerder: BreedDetails = {
  breedName: "White Swiss Shepherd",
  breedNameNL: "Zwitserse Witte Herder",
  faqs: [
    {
      question: "Wat is het verschil tussen een Zwitserse Witte Herder en een Duitse Herder?",
      answer: "De Zwitserse Witte Herder is afkomstig van witte Duitse Herders maar heeft een zachter, rustiger karakter. Ze zijn minder dominant, gevoeliger en geschikter voor gezinnen. Fysiek hebben ze een rechter rug (geen hellende rug zoals veel Duitse Herders) en altijd witte vacht. Ze zijn gezonder met minder heupdysplasie."
    },
    {
      question: "Hoeveel beweging heeft een Zwitserse Witte Herder nodig?",
      answer: "Een Zwitserse Witte Herder heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn actief maar niet zo intensief als Border Collies of Mechelse Herders. Ze genieten van wandelen, rennen, zwemmen en hondensporten, maar passen zich aan het activiteitsniveau van hun eigenaar aan."
    },
    {
      question: "Zijn Zwitserse Witte Herders goed met kinderen?",
      answer: "Ja, Zwitserse Witte Herders zijn uitstekende gezinshonden! Ze zijn vriendelijk, geduldig en beschermend tegenover kinderen. Hun zachte karakter maakt ze beter geschikt voor gezinnen dan Duitse Herders. Ze vormen sterke banden met alle gezinsleden en zijn loyaal."
    },
    {
      question: "Kunnen Zwitserse Witte Herders lang alleen zijn?",
      answer: "Nee, Zwitserse Witte Herders kunnen slecht tegen eenzaamheid. Ze volgen hun eigenaar als een 'witte schaduw' en ontwikkelen snel scheidingsangst als ze te lang alleen zijn. Laat ze maximaal 4-6 uur alleen. Ze zijn ideaal voor mensen die vaak thuis zijn of thuiswerken."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Zwitserse Witte Herders?",
      answer: "Zwitserse Witte Herders zijn gezonder dan Duitse Herders maar nog steeds gevoelig voor heupdysplasie (minder frequent), elleboogdysplasie, degeneratieve myelopathie en primaire lenslu xatie. Ze hebben ook een gevoelig spijsverteringssysteem. Kies een fokker die ouderdieren screent."
    },
    {
      question: "Hoe oud wordt een Zwitserse Witte Herder gemiddeld?",
      answer: "Een gezonde Zwitserse Witte Herder wordt gemiddeld 12 tot 14 jaar oud. Dit is langer dan Duitse Herders door minder genetische gezondheidsproblemen. Met goede zorg kunnen ze een lang, actief leven leiden."
    },
    {
      question: "Wat kost een Zwitserse Witte Herder pup in België?",
      answer: "Een Zwitserse Witte Herder pup met stamboom kost in Europa gemiddeld tussen €800 en €1.500, afhankelijk van de fokker en bloedlijn. In Noord-Amerika zijn prijzen hoger ($3.000-$4.500). Kies altijd een erkende fokker met gezondheidsscreening."
    },
    {
      question: "Is de witte vacht moeilijk schoon te houden?",
      answer: "Verrassend genoeg niet! De witte vacht heeft een zelf-reinigend effect en vuil valt er gemakkelijk af als het droogt. Regelmatig borstelen (3x per week) is belangrijker dan baden. Ze verharen wel matig tot veel, vooral tijdens seizoenswisselingen."
    }
  ],
  funFacts: [
    "De Zwitserse Witte Herder werd pas in 2011 officieel erkend door de FCI, wat het tot een relatief 'jong' ras maakt.",
    "Witte Duitse Herders werden in Duitsland gediskwalificeerd voor fokkerij, maar bleven populair in Noord-Amerika en Zwitserland.",
    "Lobo, geboren op 5 maart 1966 in Amerika, was de eerste witte herder geïmporteerd naar Zwitserland voor fokkerij.",
    "De witte vacht is niet gerelateerd aan albinisme - het is een recessief gen voor kleur, en de honden hebben normale pigmentatie in ogen en neus.",
    "Zwitserse Witte Herders worden vaak ingezet als therapie honden door hun kalme, empathische karakter.",
    "Ze staan ook bekend als 'Berger Blanc Suisse' (Frans) of 'Weisser Schweizer Schäferhund' (Duits)."
  ],
  history: {
    origin: "De Zwitserse Witte Herder heeft zijn wortels in Duitsland, waar witte exemplaren van Duitse Herders voorkwamen sinds het begin van het ras. Horand von Grafrath, de stamvader van alle Duitse Herders (1899), had een witte grootmoeder. In de vroege 20e eeuw werden witte Duitse Herders in Duitsland gediskwalificeerd omdat men vreesde dat de witte kleur gekoppeld was aan gezondheidsproblemen (wat later ontkracht werd). In Noord-Amerika bleef de witte variant echter populair en werd in de jaren 1960 een aparte fokkerij opgezet.",
    development: "In de vroege jaren 1970 werden witte Duitse Herders vanuit de VS en Canada naar Zwitserland geïmporteerd. De eerste geregistreerde hond was Lobo, geboren in 1966 in Amerika. Zwitserse fokkers begonnen een fokprogramma om de witte variant als een apart ras te erkennen, met nadruk op een zachter karakter en betere gezondheid dan werkl ijn Duitse Herders. In 1991 erkende Zwitserland het als een apart ras onder de naam 'Berger Blanc Suisse'. De FCI gaf voorlopige erkenning in 2002 en volledige erkenning in 2011. Het ras groeide in populariteit door zijn vriendelijke karakter, gezondheid en toepasbaarheid als gezinshond, waarbij het zich onderscheidde van de vaak dominantere Duitse Herder."
  },
  similarBreeds: [
    "Duitse Herder",
    "Mechelse Herder",
    "Hollandse Herder",
    "Tervuerense",
    "Groenendaeler"
  ],
  commonMistakes: [
    "Behandelen als een Duitse Herder: Ze hebben een zachter karakter en hebben geen harde hand nodig. Gebruik positieve training.",
    "Te lang alleen laten: Ze kunnen extreem slecht tegen eenzaamheid en worden destructief of angstig zonder gezelschap.",
    "Voeding te vaak wisselen: Ze hebben een gevoelig spijsverteringssysteem. Houd het voer consistent en van hoge kwaliteit.",
    "Geen socialisatie: Hoewel vriendelijk, kunnen ze schuw worden zonder vroege en uitgebreide socialisatie met mensen en honden.",
    "Vacht verwaarlozen: Ondanks de zelf-reinige nde eigenschap vereist de vacht regelmatig borstelen, vooral tijdens verharen.",
    "Geen mentale stimulatie: Ze zijn intelligent en hebben naast beweging ook hersenwerk nodig zoals training of puzzels."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€25-€50",
    grooming: "€20-€40",
    insurance: "€20-€40",
    total: "€125-€230",
    note: "Kosten zijn vergelijkbaar met Duitse Herders maar iets lager door betere gezondheid. Reken op hogere voedingskosten voor kwaliteitsvoer (gevoelige maag). Aanschafkosten: €800-€1.500 in Europa. Groomingkosten kunnen hoger zijn door de witte vacht."
  }
};

// ===== Maltezer =====
export const maltezer: BreedDetails = {
  breedName: "Maltese",
  breedNameNL: "Maltezer",
  faqs: [
    {
      question: "Is een Maltezer geschikt voor een appartement?",
      answer: "Ja, een Maltezer is perfect voor een appartement! Ze zijn klein (3-4 kg), rustig en passen zich makkelijk aan. Ze hebben slechts 20-30 minuten beweging per dag nodig en blaffen weinig. Hun compacte formaat en lage bewegingsbehoefte maken ze ideaal voor stadsleven."
    },
    {
      question: "Hoeveel verzorging heeft de vacht van een Maltezer nodig?",
      answer: "Veel! De Maltezer heeft een lange, zijdeachtige witte vacht die dagelijks borstelen vereist om klitten te voorkomen. Professionele grooming elke 4-6 weken is nodig (€40-€80 per sessie). Veel eigenaren kiezen voor een 'puppy cut' (korter knippen) om onderhoud te verminderen."
    },
    {
      question: "Zijn Maltezers goed met kinderen?",
      answer: "Maltezers kunnen goed met kinderen, maar zijn beter geschikt voor gezinnen met oudere, rustige kinderen (8+ jaar). Ze zijn klein en fragiel - jonge kinderen kunnen ze per ongeluk pijn doen. Ze zijn aanhankelijk en speels, maar vereisen voorzichtige behandeling."
    },
    {
      question: "Waarom heeft mijn Maltezer bruine traanstrepen?",
      answer: "Bruine traanstrepen ('tear staining') zijn heel gebruikelijk bij Maltezers door hun witte vacht en anatomie. Het wordt veroorzaakt door overmatig tranen, wat bacteriën en gist voedt. Dagelijks reinigen met speciale doekjes helpt. Soms wijst het op een verstopte traankanaal - raadpleeg je dierenarts."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Maltezers?",
      answer: "Maltezers zijn gevoelig voor Chiari malformatie (te kleine schedel met pijn), hartklepproblemen (MVD), levershunts, patella luxatie (losse knieschijf), tandproblemen en oogaandoeningen zoals glaucoom. Regelmatige controles en goede gebitsverzorging zijn essentieel."
    },
    {
      question: "Hoe oud wordt een Maltezer gemiddeld?",
      answer: "Een Maltezer heeft een lange levensverwachting van 12 tot 15 jaar, met sommige exemplaren die zelfs 16-18 jaar oud worden. Hun kleine formaat draagt bij aan een lang leven. Met goede zorg en preventieve veterinaire controles leven ze lang."
    },
    {
      question: "Wat kost een Maltezer pup in België?",
      answer: "Een Maltezer pup met stamboom kost in België tussen €1.000 en €2.000, met een gemiddelde rond €1.250-€1.500. In Nederland liggen prijzen tussen €800 en €1.500. Vermijd te goedkope pups om gezondheidsrisico's te minimaliseren."
    },
    {
      question: "Kunnen Maltezers lang alleen zijn?",
      answer: "Nee, Maltezers zijn gefokt als gezelschapshonden en kunnen slecht tegen eenzaamheid. Ze ontwikkelen snel scheidingsangst en kunnen blaffen, janken of destructief worden. Laat ze maximaal 4-6 uur alleen. Ze zijn ideaal voor mensen die vaak thuis zijn."
    }
  ],
  funFacts: [
    "Maltezers behoren tot de oudste hondenrassen ter wereld - ze werden al afgebeeld in Egyptische graven van meer dan 2.000 jaar geleden.",
    "De Romeinen noemden ze 'Melitaie Dogs' en beschouwden ze als status symbolen voor rijke vrouwen.",
    "Maltezers verharen bijna niet en worden vaak als 'hypoallergeen' beschouwd (hoewel geen hond 100% hypoallergeen is).",
    "Koningin Elizabeth I, Koningin Victoria en Josephine Bonaparte hadden allemaal Maltezers.",
    "Hun witte vacht kan wel 20 cm lang worden als je hem laat groeien!",
    "Ondanks hun prinses-achtig uiterlijk, waren Maltezers vroeger ook populair als rattenvang ers op schepen."
  ],
  history: {
    origin: "De Maltezer heeft een mysterieuze oorsprong die teruggaat tot de oudheid in het Middellandse Zeegebied. Hoewel vaak geassocieerd met Malta, is het niet zeker dat het ras daar echt vandaan komt - de naam kan ook verwijzen naar de Semitische wor tel 'málat' (haven), wat aangeeft dat ze in vele havensteden voorkwamen. Archeologisch bewijs toont Maltezer-achtige honden in het oude Egypte en Griekenland, meer dan 2.000 jaar geleden. Ze werden waarschijnlijk door Feniciërs en handelaren verspreid over de Middellandse Zee.",
    development: "In de Romeinse tijd waren Maltezers geliefd als luxe schoot honden bij rijke Romeinse matrones en werden ze geprezen door schrijvers zoals Plinius de Oudere. Ze overleefden de val van het Romeinse Rijk en bleven populair in Europa tijdens de middeleeuwen en renaissance, vaak afgebeeld in schilderijen van edellieden. In de 19e eeuw werd het ras verder verfijnd in Engeland, waar het werd gekruist met kleine spaniels en poodles. De moderne Maltezer werd officieel erkend door de Kennel Club. Het ras verspreidde zich wereldwijd als gezelschapshond voor de elite en later ook als populaire huishond voor iedereen. Vandaag de dag is het een van de meest populaire kleine gezelschapsrassen wereldwijd."
  },
  similarBreeds: [
    "Bichon Frisé",
    "Havanezer",
    "Bolognezer",
    "Coton de Tuléar",
    "Löwchen"
  ],
  commonMistakes: [
    "Vacht verwaarlozen: Zonder dagelijks borstelen ontstaan pijnlijke klitten. Dit is een hoge-onderhoudsras qua verzorging.",
    "Gebit niet verzorgen: Maltezers zijn zeer gevoelig voor tandproblemen. Poets dagelijks de tanden en geef dentale snacks.",
    "Geen socialisatie: Zonder vroege socialisatie kunnen ze schuw, blaffig of nerveus worden tegenover vreemden.",
    "Behandelen als speelgoed: Maltezers zijn fragiel maar wel echte honden met beweging en training nodig. Verwend ze niet teveel.",
    "Overvoeren: Hun kleine formaat betekent kleine porties. Overgewicht belast hun kleine gewrichten.",
    "Traanstrepen negeren: Dit kan wijzen op verstopping of infectie. Reinig dagelijks en raadpleeg een dierenarts bij verergering."
  ],
  monthlyCosts: {
    food: "€20-€40",
    vet: "€20-€40",
    grooming: "€40-€80",
    insurance: "€15-€30",
    total: "€95-€190",
    note: "Groomingkosten zijn hoog door de noodzaak van professionele verzorging elke 4-6 weken. Reken ook op extra kosten voor gebitsverzorging en speciale voeding. Aanschafkosten: €800-€2.000. Kleine formaat houdt voedingskosten laag."
  }
};

// ===== Akita Inu =====
export const akitaInu: BreedDetails = {
  breedName: "Akita Inu",
  breedNameNL: "Akita Inu",
  faqs: [
    {
      question: "Is een Akita Inu geschikt voor beginners?",
      answer: "Nee, een Akita Inu is absoluut niet geschikt voor beginners. Ze zijn dominant, onafhankelijk en kunnen agressief zijn naar andere honden. Ze hebben een ervaren, consequente eigenaar nodig die leiderschap kan tonen. Dit is een ras voor zeer ervaren hondenbezitters."
    },
    {
      question: "Hoeveel beweging heeft een Akita Inu nodig?",
      answer: "Een Akita Inu heeft gematigde beweging nodig: 1 tot 1,5 uur per dag. Ze zijn niet hyper-actief maar hebben wel dagelijkse wandelingen en speeltijd nodig. Let op: ze kunnen agressief zijn naar andere honden, dus socialisatie en controle zijn essentieel tijdens wandelingen."
    },
    {
      question: "Zijn Akita Inu's goed met kinderen?",
      answer: "Akita Inu's kunnen goed met kinderen van hun eigen gezin als ze er vanaf pup aan gewend zijn. Ze zijn beschermend en loyaal. Maar ze tolereren geen ruw spel of vreemde kinderen goed. Ze zijn beter geschikt voor gezinnen met oudere, rustige kinderen die de hond respecteren. Altijd toezicht vereist."
    },
    {
      question: "Waarom zijn Akita Inu's agressief naar andere honden?",
      answer: "Akita Inu's zijn gefokt voor jacht op groot wild en vechten, wat een sterke dominantie en territoriumdrift heeft gecreëerd. Ze accepteren vaak geen andere honden, vooral van hetzelfde geslacht. Vroege en uitgebreide socialisatie kan helpen, maar sommige Akita's blijven altijd dog-aggressive."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Akita Inu's?",
      answer: "Akita Inu's zijn gevoelig voor heupdysplasie, elleboogdysplasie, patella luxatie, auto-immuunaandoeningen zoals sebaceous adenitis (huidproblemen) en VKH-syndroom (oog- en hersenontsteking), schildklierproblemen en maagomslag. Kies een fokker die ouderdieren screent."
    },
    {
      question: "Hoe oud wordt een Akita Inu gemiddeld?",
      answer: "Een Akita Inu wordt gemiddeld 10 tot 15 jaar oud, met een gemiddelde rond 11-13 jaar. Met goede voeding, beweging en preventieve zorg kunnen ze een gezond, lang leven leiden ondanks hun grote formaat."
    },
    {
      question: "Wat kost een Akita Inu pup in België?",
      answer: "Een Akita Inu pup met stamboom kost in Nederland en België tussen €700 en €1.500, met een gemiddelde rond €1.000. Topbloedlijnen kunnen tot €4.000 kosten. Dit is een zeldzamer ras, dus zoek zorgvuldig naar erkende fokkers."
    },
    {
      question: "Wat is het verhaal van Hachiko?",
      answer: "Hachiko was een Akita Inu geboren in 1923 die elke dag zijn baasje, professor Ueno, ophaalde van station Shibuya. Toen de professor onverwacht overleed in 1925, bleef Hachiko negen jaar lang dagelijks op hem wachten bij het station. Dit symboliseert de extreme loyaliteit van het ras."
    }
  ],
  funFacts: [
    "Hachiko's verhaal is zo beroemd dat er standbeelden van hem staan bij station Shibuya in Tokyo en een jaarlijkse herdenkingsdag wordt gehouden.",
    "Akita Inu's werden in Japan uitgeroepen tot nationaal monument en natuurschat in 1931.",
    "Helen Keller importeerde in 1937 de eerste Akita Inu naar de Verenigde Staten als geschenk uit Japan.",
    "In Japan worden Akita-beeldjes gegeven bij de geboorte van een baby als symbool van gezondheid en geluk.",
    "Akita Inu's blaffen zelden - ze maken een reeks vreemde geluiden waaronder 'mouthing' (tandenknarsen) en brommen.",
    "Het ras werd bijna uitgeroeid tijdens WOII toen de Japanse overheid beval alle honden (behalve Duitse Herders) te doden voor hun vacht."
  ],
  history: {
    origin: "De Akita Inu vindt zijn oorsprong in Noord-Japan, in de bergachtige regio rond Odate in de prefectuur Akita, met een geschiedenis die teruggaat tot 4.000-5.000 jaar geleden. Archeologische vondsten tonen overblijfselen van honden die lijken op moderne Akita's. Oorspronkelijk werden ze gefokt als jachthonden op groot wild zoals beren, zwijnen en herten tijdens de Edo-periode (1616-1868). Ze waren zo gewaardeerd dat alleen de adel en samoerai ze mochten bezitten, en ze kregen een status aan het keizerlijke hof.",
    development: "In de late 19e eeuw raakte het ras bijna uitgestorven door kruisingen met geïmporteerde westerse rassen zoals mastiffs en Duitse herders, wat leidde tot een grotere, zwaardere variant. In 1927 werd de Akita Inu Hozonkai (AKIHO) opgericht om het originele type te behouden. Tijdens WOII beval de Japanse overheid alle honden (behalve Duitse Herders voor militair gebruik) te doden voor hun vacht, wat het ras bijna uitroeide. Na de oorlog werden de overgebleven Akita's heropgebouwd tot het moderne ras. De Japanse regering erkende het in 1931 als nationaal monument. Amerikaanse soldaten brachten Akita's mee naar de VS, wat leidde tot de Amerikaanse Akita (groter en zwaarder). De Japanse variant (Akita Inu) bleef trouw aan het originele type: smaller, lichter en meer vosachtig. Vandaag is het ras een symbool van loyaliteit en trots in Japan."
  },
  similarBreeds: [
    "Shiba Inu",
    "Hokkaido Inu",
    "Shikoku",
    "Amerikaanse Akita",
    "Siberische Husky"
  ],
  commonMistakes: [
    "Geen consequent leiderschap: Akita's testen grenzen en worden dominant zonder duidelijke, ferme leiding. Dit is geen ras voor zachte eigenaren.",
    "Onvoldoende socialisatie: Zonder extensieve vroege socialisatie worden ze agressief naar andere honden en wantrouwend naar vreemden.",
    "Loslaten in hondenparken: Akita's accepteren vaak geen andere honden. Laat ze nooit los bij andere honden zonder zorgvuldige introductie.",
    "Geen respect voor hun territorium: Akita's zijn extreem territoriaal. Verwacht agressie naar bezoekers zonder juiste introductie.",
    "Te weinig mentale stimulatie: Ondanks hun rustige uiterlijk zijn ze intelligent en hebben ze training en taken nodig.",
    "Reuen samen houden: Twee mannelijke Akita's kunnen zelden samen leven - ze zullen vechten om dominantie."
  ],
  monthlyCosts: {
    food: "€70-€110",
    vet: "€25-€50",
    grooming: "€15-€30",
    insurance: "€25-€45",
    total: "€135-€235",
    note: "Kosten kunnen hoger uitvallen door gezondheidsproblemen zoals auto-immuunaandoeningen en gewrichtsproblemen. Aanschafkosten: €700-€1.500 (tot €4.000 voor topbloedlijnen). Reken op hogere verzekeringspremies door het 'gevaarlijk ras' label in sommige regio's."
  }
};


// ===== Shih Tzu =====
export const shihTzu: BreedDetails = {
  breedName: "Shih Tzu",
  breedNameNL: "Shih Tzu",
  faqs: [
    {
      question: "Is een Shih Tzu geschikt voor een appartement?",
      answer: "Ja, Shih Tzu's zijn perfect voor appartementen! Ze zijn klein, rustig en hebben weinig beweging nodig. Ze passen zich makkelijk aan en zijn niet hyper-actief. 20-30 minuten wandelen per dag is voldoende. Hun rustige karakter en lage bewegingsbehoefte maken ze ideaal voor stadsleven en senioren."
    },
    {
      question: "Hoeveel verzorging heeft de vacht nodig?",
      answer: "Heel veel! De Shih Tzu heeft een lange, dubbele vacht die dagelijks borstelen vereist om klitten te voorkomen. Professionele grooming elke 4-6 weken is essentieel (€50-€80 per sessie). Veel eigenaren kiezen voor een 'puppy cut' om onderhoud te verminderen. Dit is een hoog-onderhoudsras."
    },
    {
      question: "Zijn Shih Tzu's goed met kinderen?",
      answer: "Ja, Shih Tzu's zijn vriendelijk en speels met kinderen, maar beter geschikt voor oudere, rustige kinderen. Ze zijn klein en kunnen gekwetst worden door ruw spel. Ze zijn geduldig en aanhankelijk, maar vereisen voorzichtige behandeling. Ideaal voor gezinnen met kinderen van 6+ jaar."
    },
    {
      question: "Waarom snurkt mijn Shih Tzu?",
      answer: "Shih Tzu's zijn een brachycefaal ras (korte snuit) en snurken vaak flink. Dit is normaal door hun platte gezicht en korte luchtwegen. Let wel op tekenen van ademhalingsproblemen zoals zware hijging of benauwdheid - dit kan brachycefaal syndroom zijn en vereist veterinaire hulp."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Shih Tzu's?",
      answer: "Shih Tzu's zijn gevoelig voor brachycefaal syndroom (ademhalingsproblemen), oogproblemen (omdat hun ogen uitpuilen), patella luxatie, heupdysplasie, tandproblemen en oorinfecties. Oververhitting is ook een risico door hun korte snuit. Regelmatige controles zijn belangrijk."
    },
    {
      question: "Hoe oud wordt een Shih Tzu gemiddeld?",
      answer: "Een Shih Tzu heeft een lange levensverwachting van 10 tot 16 jaar, met een gemiddelde rond 12-14 jaar. Hun kleine formaat draagt bij aan een lang leven. Met goede zorg, gezond gewicht en preventie van oververhitting kunnen ze zeer oud worden."
    },
    {
      question: "Wat kost een Shih Tzu pup in België?",
      answer: "Een Shih Tzu pup met stamboom kost ongeveer €800-€2.000, afhankelijk van de fokker, kleur en bloedlijn. Zeldzame kleuren kunnen tot €3.000 kosten. Kies altijd een erkende fokker die ouderdieren screent op gezondheidsproblemen."
    },
    {
      question: "Kunnen Shih Tzu's lang alleen zijn?",
      answer: "Nee, Shih Tzu's zijn gefokt als gezelschapshonden en kunnen slecht tegen eenzaamheid. Ze ontwikkelen snel scheidingsangst en kunnen destructief worden (kauwen op meubels) of blaffen. Laat ze maximaal 4-6 uur alleen. Ze zijn ideaal voor mensen die vaak thuis zijn."
    }
  ],
  funFacts: [
    "De naam 'Shih Tzu' betekent 'kleine leeuw' in het Chinees, genoemd naar hun leeuwachtige uiterlijk (ondanks hun lieve karakter).",
    "Shih Tzu's werden meer dan 1.000 jaar gefokt voor Chinese keizers en mochten niet buiten het paleis komen - ze werden als heilig beschouwd.",
    "Keizerin Cixi (1861-1908) had een obsessieve voorliefde voor Shih Tzu's en had honderden in haar paleizen.",
    "Shih Tzu's werden vaak afgebeeld in Chinese kunst en wandtapijten uit de Tang-dynastie (618-907 n.Chr.).",
    "Het ras was zo exclusief dat China weigerde ze te verkopen of weggeven aan het Westen tot de jaren 1930.",
    "Shih Tzu's kunnen 14-18 uur per dag slapen - ze zijn meesters in ontspannen!"
  ],
  history: {
    origin: "De Shih Tzu stamt oorspronkelijk uit Tibet, met een gedocumenteerde geschiedenis van meer dan 1.000 jaar. Het ras werd waarschijnlijk gecreëerd door kruisingen tussen de Tibetaanse bergenhond, Lhasa Apso en Pekingese. Tibetaanse monniken gaven deze honden als geschenken aan Chinese keizers, waar ze geliefd raakten aan het keizerlijke hof. Documentair bewijs van het ras gaat terug tot 824 na Christus, met afbeeldingen in de Verboden Stad uit de Tang-dynastie. Ze werden beschouwd als heilige honden die geluk brachten.",
    development: "Tijdens de Ming- en Qing-dynastieën werden Shih Tzu's exclusief gefokt aan het keizerlijke hof, vooral onder Keizerin Cixi (1861-1908) die het ras adoreerde en honderden hield. De honden leefden in luxe en werden zorgvuldig gefokt voor hun unieke uiterlijk. China weigerde jarenlang om ze te verkopen, ruilen of weggeven aan buitenlanders. Pas in de jaren 1930 werden de eerste exemplaren naar Europa en Amerika gebracht. Na de Chinese Revolutie van 1949 verdween het ras bijna uit China, maar overleefde in het Westen. Het werd officieel erkend door de American Kennel Club in 1969. Moderne Shih Tzu's stammen af van slechts 14 honden die naar het Westen waren geëxporteerd. Tegenwoordig is het een van de populairste gezelschapsrassen wereldwijd, geliefd om hun lieve karakter en komische persoonlijkheid."
  },
  similarBreeds: [
    "Lhasa Apso",
    "Pekingese",
    "Tibetaanse Spaniel",
    "Havanezer",
    "Maltezer"
  ],
  commonMistakes: [
    "Vacht verwaarlozen: Zonder dagelijks borstelen ontstaan pijnlijke klitten en huidproblemen. Dit is een hoog-onderhoudsras qua verzorging.",
    "Ogen niet controleren: Hun uitpuilende ogen zijn gevoelig voor verwondingen en infecties. Controleer dagelijks en reinig voorzichtig.",
    "Oververhitting: Door hun korte snuit kunnen ze snel oververhit raken. Vermijd wandelen in de hitte en zorg voor airconditioning.",
    "Gebit niet verzorgen: Shih Tzu's hebben tandproblemen. Poets dagelijks de tanden en geef dentale snacks.",
    "Geen socialisatie: Zonder vroege socialisatie kunnen ze schuw of blafferig worden. Begin vroeg met verschillende mensen, plaatsen en geluiden.",
    "Verwennen tot ongehoorzaamheid: Shih Tzu's zijn lief maar kunnen eigenwijs worden. Ze hebben consequente training nodig ondanks hun kleine formaat."
  ],
  monthlyCosts: {
    food: "€20-€45",
    vet: "€25-€60",
    grooming: "€50-€80",
    insurance: "€20-€40",
    total: "€115-€225",
    note: "Groomingkosten zijn hoog door de noodzaak van professionele verzorging elke 4-6 weken. Reken ook op potentiële extra kosten voor ademhalingsproblemen en oogproblemen. Aanschafkosten: €800-€2.000 (zeldzame kleuren tot €3.000). Eerste jaar totaal: €2.000-€3.500."
  }
};

// ===== Teckel (Dashond) =====
export const teckel: BreedDetails = {
  breedName: "Dachshund",
  breedNameNL: "Teckel (Dashond)",
  faqs: [
    {
      question: "Is een Teckel geschikt voor een appartement?",
      answer: "Ja, Teckels zijn goed geschikt voor appartementen door hun kleine tot middelgrote formaat. Ze zijn rustig binnenshuis maar hebben wel dagelijkse wandelingen nodig (30-60 minuten). Let op: ze kunnen blafferig zijn, wat overlast kan geven bij buren. Zorg voor training om overmatig blaffen te voorkomen."
    },
    {
      question: "Hoeveel beweging heeft een Teckel nodig?",
      answer: "Een volwassen Teckel heeft 30-60 minuten beweging per dag nodig, verdeeld over meerdere wandelingen. Ze zijn verrassend energiek en houden van snuffelen en graven. Vermijd springen, trappen lopen en harde inspanning vanwege hun lange rug en risico op rugproblemen."
    },
    {
      question: "Zijn Teckels goed met kinderen?",
      answer: "Teckels kunnen goed met kinderen als ze goed gesocialiseerd zijn, maar zijn beter geschikt voor gezinnen met oudere kinderen (8+ jaar). Ze zijn speels en loyaal maar ook eigenwijs en kunnen happen als ze ruw behandeld worden. Hun lange rug is kwetsbaar voor ruw spel. Toezicht is belangrijk."
    },
    {
      question: "Waarom is rugverlamming zo'n groot risico bij Teckels?",
      answer: "Teckels hebben een genetische aanleg voor IVDD (Intervertebral Disc Disease of 'Teckelverlamming') door hun lange rug en korte poten. Tussenwervelschijven kunnen verschuiven of breken, wat pijn en verlamming veroorzaakt. Ongeveer 25% van de Teckels krijgt hiermee te maken. Preventie is cruciaal: geen springen, gezond gewicht en voorzichtig tillen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Teckels?",
      answer: "Naast IVDD (rugproblemen) zijn Teckels gevoelig voor obesitas, patella luxatie, Lafora ziekte (epilepsie), tandproblemen, diabetes en oogaandoeningen zoals PRA. Hun lange rug maakt ze kwetsbaar voor gewrichtsproblemen. Kies een fokker die screent op erfelijke aandoeningen."
    },
    {
      question: "Hoe oud wordt een Teckel gemiddeld?",
      answer: "Een Teckel heeft een lange levensverwachting van 12 tot 16 jaar, met sommige exemplaren die 17+ jaar oud worden. Hun lange leven wordt vaak verkort door rugproblemen. Met goede zorg en preventie kunnen ze een zeer lang leven leiden."
    },
    {
      question: "Wat kost een Teckel pup in België?",
      answer: "Een Teckel pup met stamboom kost in België en Nederland tussen €800 en €2.000, afhankelijk van variëteit (korthaar, langhaar, ruwhaar), grootte (standaard, dwerg, kaninchen) en fokker. Prijzen variëren ook per kleur. Asielhonden zijn goedkoper (€200-€400)."
    },
    {
      question: "Zijn Teckels makkelijk te trainen?",
      answer: "Nee, Teckels zijn notoir koppig en eigenwijs. Ze zijn intelligent maar selectief gehoorzaam - ze doen wat ze zelf willen. Training vraagt veel geduld, positieve bekrachtiging en consequentie. Begin vroeg en verwacht geen blinde gehoorzaamheid. Hun jachtinstinct maakt ze afleidbaar."
    }
  ],
  funFacts: [
    "Teckels werden oorspronkelijk gefokt om in dassenburcht en te kruipen - hun naam 'Dachshund' betekent letterlijk 'dashond' in het Duits.",
    "Er zijn drie vachttypes (korthaar, langhaar, ruwhaar) en drie maten (standaard 7-14 kg, dwerg 4-7 kg, kaninchen <4 kg) - in totaal 9 variëteiten!",
    "Crusoe de Celebrity Dachshund heeft meer dan 1 miljoen Instagram-volgers en is een van de beroemdste honden op social media.",
    "Teckels waren de mascotte van de Olympische Spelen in München in 1972 - 'Waldi' was de eerste officiële Olympische mascotte ooit.",
    "Koningin Victoria was dol op Teckels en introduceerde ze in de Britse adel in de 19e eeuw.",
    "Teckels kunnen drie keer zo snel graven als een mens met een schep!"
  ],
  history: {
    origin: "De Teckel ontstond in Duitsland, met wortels die teruggaan tot de 15e-17e eeuw. Het ras werd specifiek gefokt voor ondergrondse jacht op dassen, vossen en konijnen. Hun lange, lage lichaam en korte poten maakten het mogelijk om in smalle tunnels en burchtingen te kruipen. De naam 'Dachshund' komt van het Duitse 'Dachs' (das) en 'Hund' (hond). In de 17e eeuw werd het ras selectief gefokt uit brakken en andere jachthonden, met nadruk op moed, vastberadenheid en een sterke neus.",
    development: "Duitse fokkers ontwikkelden verschillende variëteiten voor verschillende jachtdoeleinden: korthaar voor algemene jacht, langhaar voor veldwerk en ruwhaar voor ruig terrein. In de 19e eeuw werden ook kleinere variëteiten (dwerg en kaninchen) ontwikkeld voor jacht op konijnen in smalle gangen. Het ras won aan populariteit in heel Europa, vooral aan koninklijke hoven. Koningin Victoria introduceerde Teckels in Engeland in de jaren 1840. In 1888 werd de eerste Duitse Teckelclub opgericht. Het ras kreeg tijdelijk een slechte reputatie tijdens de wereldoorlogen door anti-Duitse sentimenten, maar herstelde daarna. In de 20e eeuw evolueerde de Teckel van puur jachthond naar ook gezelschapshond. Tegenwoordig is het een van de populairste rassen wereldwijd, geliefd om hun uniek uiterlijk, moedige karakter en eigenwijze persoonlijkheid."
  },
  similarBreeds: [
    "Basset Hound",
    "Welsh Corgi",
    "Dandie Dinmont Terrier",
    "Skye Terrier"
  ],
  commonMistakes: [
    "Springen toestaan: Laat Teckels NOOIT van meubels springen of trappen lopen zonder begeleiding. Dit is de hoofdoorzaak van rugproblemen. Gebruik ramps en trap en til ze voorzichtig op.",
    "Overgewicht: Obesitas is de tweede grote oorzaak van rugproblemen. Houd je Teckel slank - je moet hun ribben kunnen voelen.",
    "Geen consequente training: Hun koppigheid vraagt consequentie. Geef niet toe aan hun smeekblik of ze worden onhandelbaar.",
    "Rugpijn negeren: Symptomen zoals stijfheid, aarzeling om te bewegen of opgetrokken rug zijn noodgevallen. Zoek onmiddellijk hulp.",
    "Gebruik maken van halsbanden: Gebruik altijd een harnas in plaats van een halsband om druk op de nek en rug te voorkomen.",
    "Te weinig mentale stimulatie: Teckels zijn jachthonden en hebben snuffelwerk en mentale uitdaging nodig om verveling te voorkomen."
  ],
  monthlyCosts: {
    food: "€25-€50",
    vet: "€30-€70",
    grooming: "€10-€30",
    insurance: "€25-€50",
    total: "€90-€200",
    note: "Verzekeringen zijn vaak duurder door het hoge risico op rugproblemen. IVDD-operaties kosten €2.000-€6.000. Reken op potentieel hoge dierenarts kosten. Aanschafkosten: €800-€2.000. Preventieve zorg (harnas, ramps) is essentieel."
  }
};

// ===== Havanezer =====
export const havanezer: BreedDetails = {
  breedName: "Havanese",
  breedNameNL: "Havanezer",
  faqs: [
    {
      question: "Is een Havanezer geschikt voor een appartement?",
      answer: "Ja, Havanezers zijn perfect voor appartementen! Ze zijn klein, rustig en passen zich uitstekend aan. Ze hebben slechts 20-30 minuten beweging per dag nodig en blaffen weinig. Hun vriendelijke karakter en lage bewegingsbehoefte maken ze ideaal voor stadsleven en ook voor senioren."
    },
    {
      question: "Hoeveel verzorging heeft de vacht nodig?",
      answer: "De Havanezer heeft een lange, zijdeachtige vacht die regelmatig borstelen vereist (3-4x per week, dagelijks ideaal) om klitten te voorkomen. Professionele grooming elke 6-8 weken is aan te raden (€40-€70 per sessie). Veel eigenaren kiezen voor een kortere 'puppy cut' om onderhoud te verminderen."
    },
    {
      question: "Zijn Havanezers goed met kinderen?",
      answer: "Ja, Havanezers zijn uitstekende gezinshonden! Ze zijn vriendelijk, speels, geduldig en dol op kinderen. Hun vrolijke, clowneske karakter maakt ze perfect voor actieve gezinnen. Ze zijn stevig genoeg voor spelen maar klein genoeg om niet intimiderend te zijn. Ideaal voor gezinnen met kinderen van alle leeftijden."
    },
    {
      question: "Waarom volgt mijn Havanezer me overal?",
      answer: "Havanezers zijn gefokt als gezelschapshonden en willen altijd bij hun mensen zijn. Ze worden ook wel 'Velcro dogs' genoemd omdat ze letterlijk aan je plakken. Dit is normaal gedrag voor het ras - ze zijn extreem sociaal en gehecht aan hun gezin."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Havanezers?",
      answer: "Havanezers zijn relatief gezond maar gevoelig voor oogproblemen (staar, PRA), patella luxatie, heupdysplasie, Legg-Calvé-Perthes ziekte, levershunts en hartziekten. Vanaf 5 jaar zijn regelmatige oog- en hartcontroles aan te raden. Kies een fokker die ouderdieren screent."
    },
    {
      question: "Hoe oud wordt een Havanezer gemiddeld?",
      answer: "Een Havanezer heeft een lange levensverwachting van 14 tot 16 jaar, met sommige exemplaren die zelfs 18 jaar oud worden. Hun kleine formaat en relatief goede gezondheid dragen bij aan een lang leven. Met goede zorg leven ze zeer lang."
    },
    {
      question: "Wat kost een Havanezer pup in België?",
      answer: "Een Havanezer pup met stamboom kost in België tussen €800 en €1.700, met een gemiddelde rond €1.200-€1.500. In Nederland liggen prijzen tussen €1.490 en €2.000. Kies altijd een erkende fokker met gezondheidstesten voor gezonde pups."
    },
    {
      question: "Kunnen Havanezers lang alleen zijn?",
      answer: "Nee, Havanezers kunnen zeer slecht tegen eenzaamheid. Ze zijn gefokt voor gezelschap en ontwikkelen snel scheidingsangst als ze te lang alleen zijn. Laat ze maximaal 4-6 uur alleen en bouw dit langzaam op. Ze zijn ideaal voor mensen die thuiswerken of vaak thuis zijn."
    }
  ],
  funFacts: [
    "De Havanezer is de enige hondenras die oorspronkelijk uit Cuba komt - vernoemd naar de hoofdstad Havana.",
    "Het ras was het lievelingshondje van de rijke Cubaanse elite op suikerplantages in de 18e-19e eeuw.",
    "Havanezers werden vaak 'ringmaster dogs' genoemd omdat ze graag trucs leren en optredens geven in circussen.",
    "Na de Cubaanse Revolutie van 1959 vluchtten veel Cubanen naar de VS en namen hun Havanezers mee - deze 11 honden vormden de basis van alle moderne Havanezers buiten Cuba.",
    "Ernest Hemingway, die lange tijd in Cuba woonde, had meerdere Havanezers.",
    "Havanezers kunnen op hun achterpoten lopen en dansen - een natuurlijke vaardigheid die ze graag laten zien!"
  ],
  history: {
    origin: "De Havanezer is de enige oorspronkelijke hondenras uit Cuba, ontwikkeld in Havana als gezelschapshond voor de rijke elite op suikerplantages. Het ras ontstond waarschijnlijk uit kruisingen van Bichon-type honden zoals de Maltezer, Bichon Frisé en Bolognezer met kleine poedels. Deze honden werden meegebracht door Spaanse kolonisten of Italiaanse zeelieden vanaf de 16e eeuw. De zachte, zijdeachtige vacht beschermde hen tegen het tropische klimaat van Cuba.",
    development: "Gedurende de 18e en 19e eeuw werd de Havanezer het lievelingshondje van de Cubaanse aristocratie. Ze leefden in luxe op plantages en in Havana, waar ze werden verwend en verfijnd gefokt. Het ras ontwikkelde zich geïsoleerd op het eiland, wat leidde tot unieke kenmerken. Na de Cubaanse Revolutie in 1959 vluchtten veel welgestelde Cubanen naar de Verenigde Staten en namen hun geliefde Havanezers mee. Deze 11 honden vormden de basis van het moderne ras buiten Cuba - vrijwel alle Havanezers vandaag stammen af van deze kleine groep. Het ras kreeg officiële erkenning in de VS in 1996 en groeide snel in populariteit. In Cuba zelf was het ras bijna uitgestorven maar wordt nu heropgebouwd. Tegenwoordig is de Havanezer geliefd wereldwijd als een vrolijke, intelligente en aanhankelijke gezinshond."
  },
  similarBreeds: [
    "Bichon Frisé",
    "Maltezer",
    "Coton de Tuléar",
    "Bolognezer",
    "Löwchen"
  ],
  commonMistakes: [
    "Vacht verwaarlozen: Zonder regelmatig borstelen ontstaan klitten en huidproblemen. Borstel minimaal 3-4x per week.",
    "Geen socialisatie: Havanezers zijn van nature vriendelijk maar kunnen nerveus worden zonder vroege blootstelling aan verschillende mensen en situaties.",
    "Te lang alleen laten: Ze ontwikkelen ernstige scheidingsangst en kunnen destructief of depressief worden.",
    "Verwennen tot verwend gedrag: Havanezers zijn lief maar moeten wel opvoeding krijgen. Train consistent.",
    "Geen mentale stimulatie: Ze zijn intelligent en vervelen zich snel. Bied trucs, puzzels en training.",
    "Traanstrepen negeren: Hun lichte vacht toont traanstrepen. Reinig dagelijks en controleer op blokkades of infecties."
  ],
  monthlyCosts: {
    food: "€20-€40",
    vet: "€20-€40",
    grooming: "€40-€70",
    insurance: "€15-€30",
    total: "€95-€180",
    note: "Groomingkosten zijn matig tot hoog door de vacht. Reken op extra kosten voor oogcontroles en harttests vanaf 5 jaar. Aanschafkosten: €800-€2.000. Jaarlijkse kosten: €1.000-€1.500 inclusief alle zorg."
  }
};

// ===== Kooikerhondje =====
export const kooikerhondje: BreedDetails = {
  breedName: "Kooikerhondje",
  breedNameNL: "Kooikerhondje",
  faqs: [
    {
      question: "Is een Kooikerhondje geschikt voor beginners?",
      answer: "Een Kooikerhondje kan geschikt zijn voor gemotiveerde beginners, maar ze zijn wel uitdagend. Ze zijn intelligent en trainbaar maar ook eigenwijs en gevoelig. Ze hebben consequente, positieve opvoeding nodig. Als je bereid bent om tijd te investeren in training en socialisatie, kan het lukken. Ervaring met honden is wel een voordeel."
    },
    {
      question: "Hoeveel beweging heeft een Kooikerhondje nodig?",
      answer: "Een Kooikerhondje heeft minimaal 1 tot 1,5 uur beweging per dag nodig. Ze zijn actieve, energieke honden die houden van wandelen, rennen en apporteren. Ze excelleren in hondensporten zoals agility, flyball en vooral zoekwerk. Mentale stimulatie is net zo belangrijk als fysieke beweging."
    },
    {
      question: "Zijn Kooikerhondjes goed met kinderen?",
      answer: "Ja, Kooikerhondjes kunnen goed met kinderen als ze goed gesocialiseerd zijn. Ze zijn speels en energiek maar ook gevoelig. Ze zijn beter geschikt voor gezinnen met oudere kinderen (6+ jaar) die de hond respectvol behandelen. Hun gevoelige kant vraagt om rustige, vriendelijke interactie."
    },
    {
      question: "Waarom is mijn Kooikerhondje zo waakzaam en blafferig?",
      answer: "Kooikerhondjes zijn van nature waakzaam en alert - dit was hun taak om eendenkooien te bewaken. Ze blaffen om hun territorium te verdedigen en te waarschuwen voor vreemden. Training kan helpen om overmatig blaffen te verminderen, maar hun waakzaamheid is inherent aan het ras."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Kooikerhondjes?",
      answer: "Kooikerhondjes zijn gevoelig voor patella luxatie (18-20% heeft graad 1), polymyositis (spierontsteking), epilepsie (1,5%), Von Willebrand type III (stollingsziekte), kooikerverlamming (ENM) en nekhernia. Kies een fokker die DNA-tests uitvoert en ouderdieren screent. Het is een relatief gezond ras."
    },
    {
      question: "Hoe oud wordt een Kooikerhondje gemiddeld?",
      answer: "Een gezond Kooikerhondje wordt gemiddeld 12 tot 14 jaar oud, met een gemiddelde rond 13-14 jaar. Met goede zorg, voeding en preventieve screening kunnen ze een lang leven leiden."
    },
    {
      question: "Wat kost een Kooikerhondje pup in België?",
      answer: "Een Kooikerhondje pup met FCI-stamboom kost in Nederland en België gemiddeld €1.500-€2.000 bij erkende fokkers van de rasvereniging. Dit is een zeldzaam Nederlands ras, dus koop altijd bij een geregistreerde fokker die DNA-tests doet. Vermijd goedkope pups zonder stamboom."
    },
    {
      question: "Zijn Kooikerhondjes makkelijk te trainen?",
      answer: "Kooikerhondjes zijn intelligent en kunnen goed getraind worden, maar ze zijn ook eigenwijs en gevoelig. Ze reageren het best op positieve bekrachtiging en werken graag voor beloningen. Harde methodes werken niet - ze sluiten zich dan af. Consequentie en geduld zijn essentieel."
    }
  ],
  funFacts: [
    "Het Kooikerhondje is een van de weinige echt Nederlandse hondenrassen en werd bijna uitgestorven in de 20e eeuw.",
    "Prinses Juliana had een Kooikerhondje dat haar leven redde door te blaffen toen een moordenaar het paleis binnensloop in de 16e eeuw (volgens de legende).",
    "Kooikerhondjes werden gebruikt in eendenkooien om eenden naar de vangpijp te lokken met hun wuivende witte staartpluim - ze imiteerden vossen.",
    "Het ras werd gered van uitsterving door Baronesse Van Hardenbroek, die in 1942 begon met het zoeken naar overgebleven exemplaren.",
    "Tommie, een teef gevonden bij een voerman, werd de stammoeder van alle moderne Kooikerhondjes.",
    "Kooikerhondjes komen voor op 17e-eeuwse schilderijen van Jan Steen en andere Nederlandse meesters."
  ],
  history: {
    origin: "Het Kooikerhondje is een oud Nederlands ras dat teruggaat tot de 16e-17e eeuw. Het ras ontstond waarschijnlijk uit kruisingen van Spaanse spioenen of kleine jachthonden met lokale Nederlandse honden. De hoofdfunctie was het lokken van eenden in eendenkooien - kunstmatige vanginstallaties voor eenden. De honden lokten eenden met hun opvallende witte staartpluim en rood-witte vacht naar de vangpijp, waar ze gevangen werden. 'Kooiker' was de beroepsnaam van de persoon die de eendenkooi beheerde.",
    development: "Kooikerhondjes werden afgebeeld op 17e-eeuwse schilderijen van meesters zoals Jan Steen, wat hun lange geschiedenis in Nederland bewijst. Door de afname van eendenkooien in de vroege 20e eeuw raakte het ras bijna uitgestorven. In 1942 begon Baronesse Van Hardenbroek een reddingsprogramma door Nederland te doorreizen op zoek naar overgebleven exemplaren. Ze vond Tommie, een teef bij een voerman, die de stammoeder werd van het moderne ras. Met grote inspanning werd het ras heropgebouwd. De Nederlandse Kooikerhondje Club werd opgericht en het ras kreeg voorlopige erkenning in 1966 en definitieve erkenning door de Raad van Beheer in 1971. Tegenwoordig is het Kooikerhondje een nationaal symbool en geliefd als actieve gezinshond en sporthond, vooral in agility en zoekwerk."
  },
  similarBreeds: [
    "Bretagne Spaniel",
    "Nova Scotia Duck Tolling Retriever",
    "English Springer Spaniel",
    "Epagneul Breton"
  ],
  commonMistakes: [
    "Geen DNA-tests bij de fokker: Dit is essentieel om erfelijke aandoeningen te voorkomen. Koop alleen bij rasvereniging-fokkers met tests.",
    "Te harde training: Kooikerhondjes zijn gevoelig en sluiten zich af bij harde methodes. Gebruik altijd positieve bekrachtiging.",
    "Onvoldoende socialisatie: Ze kunnen schuw of wantrouwend worden naar vreemden en andere honden zonder uitgebreide vroege socialisatie.",
    "Te weinig mentale stimulatie: Deze intelligente honden vervelen zich snel en kunnen destructief worden. Bied zoekwerk en training.",
    "Waakzaamheid niet in goede banen leiden: Hun natuurlijke waakzaamheid kan leiden tot overmatig blaffen zonder training.",
    "Geen respect voor hun eigenwijsheid: Ze zijn niet blindelings gehoorzaam zoals een Labrador. Accepteer hun onafhankelijke kant."
  ],
  monthlyCosts: {
    food: "€35-€60",
    vet: "€20-€40",
    grooming: "€15-€25",
    insurance: "€20-€35",
    total: "€90-€160",
    note: "Kosten kunnen hoger uitvallen door erfelijke aandoeningen zoals polymyositis of patella luxatie. Reken op DNA-tests (€50-€150) en regelmatige controles. Aanschafkosten: €1.500-€2.000. Extra budget voor hondensporten en training."
  }
};

// ===== Basset Hound =====
export const bassetHound: BreedDetails = {
  breedName: "Basset Hound",
  breedNameNL: "Basset Hound",
  faqs: [
    {
      question: "Is een Basset Hound geschikt voor een appartement?",
      answer: "Ja, Basset Hounds kunnen in een appartement wonen. Ze zijn rustig en lui binnenshuis, maar hebben wel dagelijkse wandelingen nodig (30-60 minuten). Let op: ze kunnen luid blaffen of janken, wat overlast kan geven. Ze zijn beter geschikt voor huizen met tuin vanwege hun formaat en bewegingsbehoefte."
    },
    {
      question: "Hoeveel beweging heeft een Basset Hound nodig?",
      answer: "Een Basset Hound heeft gematigde beweging nodig: 30-60 minuten per dag. Ze zijn niet hyper-actief maar wel gevoelig voor obesitas, dus regelmatige wandelingen zijn essentieel. Vermijd overmatige inspanning - ze zijn gebouwd voor uithoudingsvermogen, niet snelheid. Geen springen of zware inspanning vanwege hun lange rug."
    },
    {
      question: "Zijn Basset Hounds goed met kinderen?",
      answer: "Ja, Basset Hounds zijn uitstekende gezinshonden! Ze zijn geduldig, vriendelijk en zeer zachtaardig met kinderen. Hun rustige, tolerante karakter maakt ze perfect voor gezinnen. Let wel op hun grote formaat - ze kunnen per ongeluk kleine kinderen omverlopen. Ze zijn loyaal en beschermend."
    },
    {
      question: "Waarom ruikt mijn Basset Hound zo?",
      answer: "Basset Hounds hebben een karakteristieke 'hondengeur' door hun overvloedige huidplooien die vocht en bacteriën vasthouden, en olieproductie in de huid. Regelmatig baden (elke 4-6 weken) en plooien reinigen helpt. Hun lange oren vangen ook geur - controleer en reinig wekelijks."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Basset Hounds?",
      answer: "Basset Hounds zijn gevoelig voor maagomslag (levensbedreigende noodgeval), oorinfecties, heupdysplasie (zeer hoog risico), elleboogdysplasie, rugproblemen, obesitas, oogproblemen (entropion, ectropion) en huidproblemen. Hun extreme anatomie (lange rug, korte poten, lange oren) veroorzaakt veel gezondheidsproblemen."
    },
    {
      question: "Hoe oud wordt een Basset Hound gemiddeld?",
      answer: "Een Basset Hound wordt gemiddeld 10 tot 13 jaar oud, met een gemiddelde rond 11-12 jaar. Hun levensduur wordt vaak verkort door obesitas en gewrichtsproblemen. Met gezond gewicht en goede zorg kunnen ze aan de hogere kant van dit bereik komen."
    },
    {
      question: "Wat kost een Basset Hound pup in België?",
      answer: "Een Basset Hound pup met stamboom kost in Nederland en België tussen €1.500 en €2.000, afhankelijk van de fokker en bloedlijn. Adoptie uit een asiel is veel goedkoper (€300). Kies een fokker die ouderdieren screent op heupdysplasie en andere erfelijke aandoeningen."
    },
    {
      question: "Zijn Basset Hounds makkelijk te trainen?",
      answer: "Nee, Basset Hounds zijn notoir eigenwijs en koppig. Ze zijn intelligent maar selectief gehoorzaam - hun neus regeert en ze doen wat ze zelf willen. Training vraagt veel geduld en positieve bekrachtiging. Verwacht geen blinde gehoorzaamheid. Begin vroeg en gebruik treats (maar let op obesitas)."
    }
  ],
  funFacts: [
    "Basset Hounds hebben de tweede beste neus van alle honden - alleen de Bloodhound is beter. Ze hebben meer dan 220 miljoen geurreceptoren!",
    "Hun lange oren slepen over de grond en 'vegen' geuren op naar hun neus - dit helpt bij het volgen van sporen.",
    "De naam 'Basset' komt van het Franse woord 'bas', wat 'laag' betekent, verwijzend naar hun korte poten.",
    "Elvis Presley zong voor zijn Basset Hound op televisie in de Steve Allen Show in 1956.",
    "Fred Basset, een komische strip-hond, is een beroemde Basset Hound die sinds 1963 verschijnt in kranten wereldwijd.",
    "Basset Hounds kunnen tot 7 octaven lager 'zingen' dan de gemiddelde hond - een uniek, melodieus gehuil."
  ],
  history: {
    origin: "De Basset Hound stamt af van de 6e-eeuwse honden van Sint-Hubertus van België. Deze St. Hubert-honden werden rond het jaar 1000 verder ontwikkeld door de Benedictijnse Abdij van Sint-Hubertus en zijn afstammelingen van de Lakonische (Spartaanse) jachthond uit de oudheid. De naam 'Basset' komt van het Franse woord 'bas' (laag), verwijzend naar hun korte poten. In de 16e eeuw werden Basset-achtige honden al genoemd in Frankrijk, waar ze werden gebruikt voor dassenjacht en jacht op klein wild.",
    development: "De gecontroleerde fokkerij van laagbenige Bassets begon rond 1870 in Frankrijk. Twee Franse fokkers ontwikkelden verschillende varianten: Graaf Le Couteulx de Canteleu creëerde de Chien d'Artois met rechte voorpoten, terwijl Louis Lane de Basset Normand ontwikkelde met gekromde voorpoten. Deze twee lijnen werden later samengevoegd tot de Basset Artésien Normand. In 1867 importeerde Engeland twee Franse Bassets, die de basis vormden voor de Engelse variant. Engelse fokkers kruisten het ras met Bloodhounds en Beagles om de fragiele lichaamsbouw te versterken en het reukvermogen te verbeteren, wat leidde tot de moderne Basset Hound. Het ras werd erkend door de Kennel Club en verspreidde zich wereldwijd als jachthond en gezinshond. Vandaag de dag is de Basset Hound geliefd om zijn unieke uiterlijk, lieve karakter en uitstekende neus, hoewel ze meer als gezelschapshond dan jachthond worden gehouden."
  },
  similarBreeds: [
    "Beagle",
    "Bloodhound",
    "Dachshund (Teckel)",
    "Basset Artésien Normand",
    "Petit Basset Griffon Vendéen"
  ],
  commonMistakes: [
    "Overvoeren: Basset Hounds zijn extreem gevoelig voor obesitas. Volg voedingsrichtlijnen strikt en beperk treats, ondanks hun smekende blik.",
    "Springen toestaan: Hun lange rug en korte poten maken springen gevaarlijk. Gebruik ramps voor meubels en auto.",
    "Oren verwaarlozen: Lange hangende oren vangen vocht en vuil, wat leidt tot chronische oorinfecties. Controleer en reinig wekelijks.",
    "Huidplooien niet reinigen: Plooien in de huid moeten regelmatig gereinigd worden om infecties te voorkomen.",
    "Maagomslag niet herkennen: Dit is een noodgeval. Symptomen: opgeblazen buik, kokhalzen zonder braken, rusteloosheid. Zoek ONMIDDELLIJK hulp.",
    "Loslaten zonder veilige omheining: Hun neus regeert - een Basset die een interessante geur oppikt, verdwijnt en komt niet terug."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€30-€70",
    grooming: "€20-€40",
    insurance: "€25-€50",
    total: "€125-€240",
    note: "Kosten kunnen aanzienlijk hoger uitvallen door chronische gezondheidsproblemen zoals heupdysplasie, oorinfecties en obesitas-gerelateerde aandoeningen. Maagomslag-operaties kosten €1.500-€3.000. Aanschafkosten: €1.500-€2.000. Jaarlijkse kosten: €1.500-€3.000 inclusief alle zorg."
  }
};

// Export all breeds as array
export const breedDetailsBatch1 = [
  borderCollie,
  beagle,
  mechelseHerder,
  cavalierKingCharlesSpaniel,
  shibaInu,
  engelsecockerSpaniel,
  australischeHerder,
  duitseHerder,
  bernerSennenhond,
  zwitserseWitteHerder,
  maltezer,
  akitaInu,
  shihTzu,
  teckel,
  havanezer,
  kooikerhondje,
  bassetHound
];
