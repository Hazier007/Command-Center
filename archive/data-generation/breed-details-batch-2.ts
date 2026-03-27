// Batch 2: Breed Details voor hondenpups.be
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

// ===== Chihuahua =====
export const chihuahua: BreedDetails = {
  breedName: "Chihuahua",
  breedNameNL: "Chihuahua",
  faqs: [
    {
      question: "Zijn Chihuahua's geschikt voor gezinnen met kinderen?",
      answer: "Chihuahua's zijn beter geschikt voor gezinnen met oudere kinderen (8+). Ze zijn kwetsbaar en kunnen angstig of defensief worden bij ruw spel. Jonge kinderen kunnen de kleine hond per ongeluk pijn doen. Leer kinderen altijd voorzichtig te zijn."
    },
    {
      question: "Hoeveel beweging heeft een Chihuahua nodig?",
      answer: "Een Chihuahua heeft relatief weinig beweging nodig: 30-60 minuten per dag verdeeld over 2-3 korte wandelingen. Ze vermoeien snel door hun kleine formaat. Binnenspel en mentale stimulatie zijn ook belangrijk."
    },
    {
      question: "Trillen Chihuahua's altijd?",
      answer: "Chihuahua's trillen vaak, maar niet altijd. Dit kan komen door kou (ze hebben weinig lichaamsvet), spanning, opwinding of angst. In koude omstandigheden hebben ze een jasje nodig. Trillen kan ook op gezondheidsproblemen wijzen – raadpleeg een dierenarts bij twijfel."
    },
    {
      question: "Kunnen Chihuahua's lang alleen blijven?",
      answer: "Nee, Chihuahua's zijn zeer aanhankelijk en kunnen scheidingsangst ontwikkelen. Laat ze maximaal 4-6 uur alleen. Ze houden ervan om bij hun baas te zijn en kunnen destructief of angstig worden bij lange afwezigheid."
    },
    {
      question: "Zijn Chihuahua's gemakkelijk te trainen?",
      answer: "Chihuahua's zijn intelligent maar kunnen koppig zijn. Ze reageren goed op positieve bekrachtiging met kleine beloningen. Begin vroeg met training en wees consistent. Zindelijkheidstraining kan langer duren vanwege hun kleine blaas."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Chihuahua's?",
      answer: "Chihuahua's zijn gevoelig voor tandproblemen, patellaluxatie (knieschijf), hartproblemen (hartklepafwijkingen), hypoglykemie, en hydrocefalus (vooral bij appelkopjes). Regelmatige tandencontroles zijn essentieel."
    },
    {
      question: "Hoe oud wordt een Chihuahua?",
      answer: "Chihuahua's behoren tot de langstlevende hondenrassen en worden gemiddeld 14 tot 18 jaar oud. Met goede zorg kunnen sommige zelfs 20 jaar oud worden."
    },
    {
      question: "Wat kost een Chihuahua pup in België?",
      answer: "Een Chihuahua pup met stamboom kost tussen €800 en €2.000, afhankelijk van de fokker, kleur en grootte. Zeldzamere kleuren en kleinere teacup Chihuahua's zijn vaak duurder. Kies altijd een erkende fokker."
    }
  ],
  funFacts: [
    "Chihuahua's zijn het kleinste hondenras ter wereld – sommige wegen maar 1 kg!",
    "Ze hebben het grootste brein ten opzichte van hun lichaamsgrootte van alle hondenrassen.",
    "Veel Chihuahua's worden geboren met een molera (zachte plek op de schedel), vergelijkbaar met baby's. Deze sluit meestal rond 6 maanden.",
    "Chihuahua's waren heilige honden bij de Azteken en werden gebruikt in religieuze ceremonies.",
    "Ze hebben twee erkende vachttypes: kortharig (smooth coat) en langharig (long coat).",
    "Ondanks hun kleine formaat hebben Chihuahua's een groot persoonlijkheid – ze denken vaak dat ze veel groter zijn dan ze werkelijk zijn!"
  ],
  history: {
    origin: "De Chihuahua is vernoemd naar de Mexicaanse staat Chihuahua, waar het ras in de 19e eeuw werd ontdekt door toeristen. De voorouders van de Chihuahua gaan echter veel verder terug: de Techichi, een kleine hond die werd gehouden door de Tolteken-beschaving vanaf de 9e eeuw. Deze honden waren groter en zwaarder dan de moderne Chihuahua en werden als heilig beschouwd.",
    development: "Na de Spaanse verovering van Mexico raakte de Techichi bijna uitgestorven. In de afgelegen berggebieden van Chihuahua overleefden enkele honden, waar ze in het midden van de 19e eeuw werden ontdekt door Amerikaanse toeristen. Deze kleine honden werden meegenomen naar de Verenigde Staten en begonnen populair te worden.\n\nAmerikaanse fokkers verfijnden het ras en creëerden de moderne Chihuahua zoals we die nu kennen: kleiner, lichter en met de karakteristieke appelkop of hertenkop. De American Kennel Club erkende het ras officieel in 1904. Tegenwoordig is de Chihuahua één van de populairste speelhondrassen ter wereld en een favoriet onder stadsbewoners vanwege hun compacte formaat en lange levensduur."
  },
  similarBreeds: [
    "Yorkshire Terrier",
    "Papillon",
    "Toy Poodle",
    "Pomeranian",
    "Prazsky Krysarik"
  ],
  commonMistakes: [
    "Te weinig socialisatie: Chihuahua's kunnen angstig of agressief worden zonder goede socialisatie. Stel ze vroeg bloot aan verschillende mensen, honden en omgevingen.",
    "Overmatig verwennen: Behandel een Chihuahua als een hond, niet als een baby. Dit voorkomt gedragsproblemen zoals overmatig blaffen of agressie.",
    "Onvoldoende tandzorg: Hun kleine bek is gevoelig voor tandproblemen. Poets dagelijks en plan regelmatige controles.",
    "Te koud houden: Chihuahua's zijn zeer gevoelig voor kou en hebben in koud weer een jasje en warme slaapplaats nodig.",
    "Verkeerd oppakken: Ondersteun altijd hun volledige lichaam, vooral de achterpoten. Til ze niet op aan de voorpoten.",
    "Te veel eten: Obesitas is gevaarlijk voor hun kleine gewrichten en hart. Volg portiegroottes nauwkeurig."
  ],
  monthlyCosts: {
    food: "€20-€40",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€15-€30",
    total: "€65-€130",
    note: "Kosten blijven relatief laag door hun kleine formaat. Tandverzorging kan extra kosten met zich meebrengen (€150-€300/jaar voor professionele reiniging). Let op extra kosten voor winterkleding (€20-€50 per jasje)."
  }
};

// ===== Rhodesian Ridgeback =====
export const rhodesianRidgeback: BreedDetails = {
  breedName: "Rhodesian Ridgeback",
  breedNameNL: "Rhodesian Ridgeback",
  faqs: [
    {
      question: "Wat is de 'ridge' bij een Rhodesian Ridgeback?",
      answer: "De ridge is een strook haar op de rug die in tegengestelde richting groeit, van staart naar schouders. Dit is het kenmerkende kenmerk van het ras. De ridge is erfelijk en pups zonder ridge worden niet geaccepteerd in rasstandaarden."
    },
    {
      question: "Zijn Rhodesian Ridgebacks geschikt voor beginners?",
      answer: "Nee, Rhodesian Ridgebacks zijn niet ideaal voor beginners. Ze zijn krachtig, eigenzinnig en hebben een ervaren baas nodig die consequent en zelfverzekerd is. Zonder goede training en leiderschap kunnen ze dominant worden."
    },
    {
      question: "Hoeveel beweging heeft een Rhodesian Ridgeback nodig?",
      answer: "Een volwassen Rhodesian Ridgeback heeft minimaal 1,5 tot 2 uur beweging per dag nodig. Ze houden van hardlopen, wandelen en vrij spelen in een afgesloten gebied. Pups moeten voorzichtig worden opgebouwd om gewrichtsproblemen te voorkomen."
    },
    {
      question: "Zijn Rhodesian Ridgebacks goed met kinderen?",
      answer: "Ja, Rhodesian Ridgebacks kunnen uitstekend met kinderen omgaan als ze goed gesocialiseerd zijn. Ze zijn beschermend en geduldig, maar hun grote formaat en energie kunnen te overweldigend zijn voor kleine kinderen. Toezicht is belangrijk."
    },
    {
      question: "Zijn Rhodesian Ridgebacks agressief?",
      answer: "Rhodesian Ridgebacks zijn niet van nature agressief, maar ze zijn wel beschermend en terughoudend tegenover vreemden. Met goede socialisatie en training zijn ze kalm en stabiel. Ze hebben een sterke jachtdrift, dus voorzichtigheid met kleine dieren is geboden."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Rhodesian Ridgebacks?",
      answer: "Rhodesian Ridgebacks zijn gevoelig voor heupdysplasie, elleboogdysplasie, dermoid sinus (huidafwijking langs de ridge), hypothyreoïdie en bepaalde vormen van kanker. Kies een fokker die screent op erfelijke aandoeningen."
    },
    {
      question: "Hoe oud wordt een Rhodesian Ridgeback?",
      answer: "Een gezonde Rhodesian Ridgeback wordt gemiddeld 10 tot 12 jaar oud. Met goede zorg en preventieve gezondheidszorg kunnen sommige 13-14 jaar oud worden."
    },
    {
      question: "Wat kost een Rhodesian Ridgeback pup in België?",
      answer: "Een Rhodesian Ridgeback pup met stamboom kost tussen €1.200 en €2.000 in België. Kies een fokker die ouderdieren screent op heupdysplasie, elleboogdysplasie en dermoid sinus."
    }
  ],
  funFacts: [
    "Rhodesian Ridgebacks werden oorspronkelijk gefokt om leeuwen te jagen in Zuid-Afrika en staan bekend als de 'Leeuwenjachthond'.",
    "De ridge (haarstrook op de rug) wordt veroorzaakt door een genetische mutatie en komt bij slechts drie hondenrassen voor wereldwijd.",
    "Ze kunnen sprinten tot 64 km/u – bijna net zo snel als een greyhound!",
    "Rhodesian Ridgebacks kunnen tot 24 uur zonder water in extreme woestijncondities – een eigenschap ontwikkeld in Zuid-Afrika.",
    "Ze zijn zeer stille honden en blaffen zelden, tenzij er echt iets mis is.",
    "Errol Flynn, de beroemde Hollywood-acteur, was een grote liefhebber van Rhodesian Ridgebacks en hield meerdere exemplaren."
  ],
  history: {
    origin: "De Rhodesian Ridgeback stamt uit Zuid-Afrika, waar Europese kolonisten in de 16e en 17e eeuw hun jachthonden meenamen. Deze honden werden gekruist met een semi-gedomesticeerde hond van de Khoikhoi-stam, die al de kenmerkende ridge op de rug had. Deze lokale honden waren perfect aangepast aan het harde Afrikaanse klimaat en waren moedige jagers.",
    development: "In de 19e eeuw verfijnden kolonisten in Rhodesië (nu Zimbabwe) het ras door kruisingen met Great Danes, Mastiffs, Greyhounds en Bloodhounds. Het doel was een veelzijdige jachthond te creëren die kon overleven in extreme hitte, leeuwen kon confronteren en opsporen, en 's nachts het kamp kon bewaken. De honden werkten meestal in paren: ze joegen leeuwen op totdat de jager kon schieten, maar doodden de leeuwen zelf niet.\n\nDe rasstandaard werd in 1922 officieel vastgesteld door een groep fokkers in Bulawayo, Zimbabwe. De Rhodesian Ridgeback werd erkend door de South African Kennel Union en later internationaal. Tegenwoordig is het ras populair als gezinshond, waakhond en gezelschapsdier, hoewel hun jachtinstinct en onafhankelijke karakter behouden zijn gebleven."
  },
  similarBreeds: [
    "Vizsla",
    "Weimaraner",
    "Pharaoh Hound",
    "Thai Ridgeback",
    "Phu Quoc Ridgeback"
  ],
  commonMistakes: [
    "Onvoldoende training: Ridgebacks hebben consequente, vroege training nodig. Zonder leiderschap kunnen ze dominant en onhandelbaar worden.",
    "Te weinig socialisatie: Ze zijn van nature terughoudend tegenover vreemden. Socialiseer vroeg om overdreven wantrouwen te voorkomen.",
    "Te veel beweging als pup: Overmatige inspanning bij jonge Ridgebacks kan gewrichtsproblemen veroorzaken. Bouw langzaam op.",
    "Klein huisdieren zonder toezicht: Hun sterke jachtdrift kan problematisch zijn met katten, konijnen of andere kleine dieren.",
    "Slechte omheining: Ridgebacks kunnen hoog springen en graven. Zorg voor een veilige, hoge omheining.",
    "Verwaarlozen van mentale stimulatie: Dit zijn intelligente honden die naast fysieke beweging ook mentale uitdaging nodig hebben."
  ],
  monthlyCosts: {
    food: "€70-€120",
    vet: "€30-€50",
    grooming: "€10-€20",
    insurance: "€25-€40",
    total: "€135-€230",
    note: "Kosten kunnen hoger uitvallen door gezondheidsproblemen zoals heupdysplasie of dermoid sinus correctie (chirurgie €500-€1.500). Hun grote formaat betekent hogere voedingskosten. Eerste jaar totaal: €2.500-€3.500."
  }
};

// ===== Old English Bulldog =====
export const oldEnglishBulldog: BreedDetails = {
  breedName: "Old English Bulldog",
  breedNameNL: "Olde English Bulldogge",
  faqs: [
    {
      question: "Wat is het verschil tussen een Old English Bulldog en een Engelse Bulldog?",
      answer: "De Old English Bulldog (ook Olde English Bulldogge) is een moderne recreatie van de oorspronkelijke Engelse Bulldog uit de 18th eeuw. Ze zijn atletischer, gezonder en hebben een langere snuit dan moderne Engelse Bulldogs. Ze hebben minder ademhalingsproblemen en kunnen beter sporten."
    },
    {
      question: "Zijn Old English Bulldogs geschikt voor beginners?",
      answer: "Old English Bulldogs kunnen geschikt zijn voor beginners, maar ze hebben wel consequente training nodig. Ze zijn eigenzinnig en koppig, dus ervaring met honden is een voordeel. Met de juiste aanpak zijn ze loyale, trainbare gezinshonden."
    },
    {
      question: "Hoeveel beweging heeft een Old English Bulldog nodig?",
      answer: "Een Old English Bulldog heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn atletischer dan moderne Bulldogs en houden van wandelen, rennen en spelen. Let wel op bij warm weer vanwege hun brede bouw."
    },
    {
      question: "Zijn Old English Bulldogs goed met kinderen?",
      answer: "Ja, Old English Bulldogs zijn uitstekend met kinderen. Ze zijn geduldig, beschermend en speels. Hun robuuste bouw maakt ze geschikt voor gezinnen, maar toezicht blijft belangrijk bij jonge kinderen vanwege hun kracht."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Old English Bulldogs?",
      answer: "Old English Bulldogs zijn gezonder dan moderne Engelse Bulldogs, maar kunnen nog steeds last hebben van heupdysplasie, elleboogdysplasie, huidproblemen en hartproblemen. Kies een fokker die screent op erfelijke aandoeningen."
    },
    {
      question: "Snurken Old English Bulldogs?",
      answer: "Sommige Old English Bulldogs snurken licht, maar veel minder dan moderne Engelse Bulldogs. Hun langere snuit en betere luchtwegen resulteren in minder ademhalingsproblemen."
    },
    {
      question: "Hoe oud wordt een Old English Bulldog?",
      answer: "Old English Bulldogs worden gemiddeld 10 tot 14 jaar oud – aanzienlijk langer dan moderne Engelse Bulldogs (8-10 jaar). Hun verbeterde gezondheid draagt bij aan een langere levensverwachting."
    },
    {
      question: "Wat kost een Old English Bulldog pup in België?",
      answer: "Een Old English Bulldog pup met stamboom kost tussen €1.500 en €2.500 in België. Dit ras is zeldzamer dan de moderne Engelse Bulldog, waardoor de prijs hoger kan zijn."
    }
  ],
  funFacts: [
    "De Old English Bulldog is een moderne recreatie gestart in de jaren '70 door David Leavitt om de gezondheid van Bulldogs te verbeteren.",
    "Ze zijn gefokt met een mix van Engelse Bulldog, American Bulldog, Bull Mastiff en American Pit Bull Terrier.",
    "Old English Bulldogs kunnen zwemmen – in tegenstelling tot moderne Engelse Bulldogs die dit vaak niet kunnen.",
    "Ze werden oorspronkelijk gebruikt voor 'bull-baiting' in Engeland (nu verboden), waar ze stieren moesten grijpen.",
    "Hun naam 'Bulldogge' met dubbele 'g' is opzettelijk gekozen om het ras te onderscheiden van de moderne Engelse Bulldog.",
    "Ze hebben een bijtkracht van ongeveer 210 PSI – krachtiger dan een Duitse Herder!"
  ],
  history: {
    origin: "De Old English Bulldog, zoals we die nu kennen, is geen oud ras maar een moderne recreatie. De oorspronkelijke Engelse Bulldog uit de 18e eeuw was een atletische, gezonde werkhond gebruikt voor 'bull-baiting' – een wrede sport waarbij honden stieren moesten grijpen. Deze honden waren functioneel gebouwd met langere snuiten en benen dan moderne Bulldogs.",
    development: "Toen bull-baiting in 1835 werd verboden in Engeland, veranderde de fokkerij richting. Fokkers begonnen te selecteren op uiterlijk in plaats van functie, wat leidde tot de moderne Engelse Bulldog met extreme kenmerken: korte snuit, zware bouw en talloze gezondheidsproblemen.\n\nIn 1971 begon David Leavitt in Pennsylvania een programma om de oorspronkelijke, gezonde Bulldog te herecreëren. Hij kruiste Engelse Bulldogs met American Bulldogs, Bull Mastiffs en American Pit Bull Terriers. Het resultaat was de Olde English Bulldogge: atletischer, gezonder en meer functioneel. Het ras werd in 2014 erkend door de United Kennel Club. Tegenwoordig winnen Old English Bulldogs aan populariteit onder mensen die de look van een Bulldog willen zonder de extreme gezondheidsproblemen."
  },
  similarBreeds: [
    "Engelse Bulldog",
    "American Bulldog",
    "Victorian Bulldog",
    "Continental Bulldog"
  ],
  commonMistakes: [
    "Verwachten dat ze hetzelfde zijn als Engelse Bulldogs: Old English Bulldogs zijn atletischer en hebben meer beweging en mentale stimulatie nodig.",
    "Te weinig training: Ze kunnen koppig zijn. Begin vroeg met consequente, positieve training.",
    "Onvoldoende socialisatie: Old English Bulldogs kunnen beschermend zijn. Socialiseer breed om agressie te voorkomen.",
    "Overvoeren: Net als andere Bulldogs zijn ze gevoelig voor obesitas. Volg voedingsrichtlijnen.",
    "Te weinig rimpelverzorging: Hoewel ze minder rimpels hebben dan moderne Bulldogs, moeten rimpels nog steeds gereinigd worden.",
    "Verwaarlozen van gezondheidstests: Kies een fokker die screent op heupdysplasie en hartproblemen."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€45",
    grooming: "€15-€25",
    insurance: "€20-€35",
    total: "€120-€195",
    note: "Kosten zijn lager dan moderne Engelse Bulldogs door betere gezondheid. Ze hoeven zelden een keizersnede bij geboorte (€1.000-€2.000), wat een groot verschil maakt voor fokkers en prijzen."
  }
};

// ===== Beauceron =====
export const beauceron: BreedDetails = {
  breedName: "Beauceron",
  breedNameNL: "Beauceron",
  faqs: [
    {
      question: "Zijn Beaucerons geschikt voor beginners?",
      answer: "Nee, Beaucerons zijn niet aanbevolen voor beginners. Ze zijn krachtig, intelligent en eigenzinnig. Ze hebben een ervaren baas nodig die consequent en zelfverzekerd is. Zonder goede leiding kunnen ze dominant gedrag ontwikkelen."
    },
    {
      question: "Hoeveel beweging heeft een Beauceron nodig?",
      answer: "Een Beauceron heeft minimaal 2 uur intensieve beweging per dag nodig. Ze zijn werkhonden die graag rennen, wandelen, sporten (agility, obedience) en mentale uitdagingen aangaan. Zonder voldoende uitlaatklep worden ze destructief."
    },
    {
      question: "Zijn Beaucerons goed met kinderen?",
      answer: "Beaucerons kunnen uitstekend met kinderen zijn als ze goed gesocialiseerd zijn. Ze zijn beschermend en loyaal, maar hun hoederdrift kan leiden tot 'herding' gedrag (duwen, bijten in hielen). Toezicht en training zijn essentieel."
    },
    {
      question: "Wat zijn de dubbele dauwklauwen bij een Beauceron?",
      answer: "Beaucerons hebben karakteristieke dubbele dauwklauwen (extra tenen) aan hun achterpoten. Dit is een erfelijke eigenschap en onderdeel van de rasstandaard. Deze moeten niet verwijderd worden en vereisen regelmatige nagelcontrole."
    },
    {
      question: "Zijn Beaucerons agressief?",
      answer: "Beaucerons zijn niet van nature agressief, maar ze zijn wel beschermend en waakzaam. Met goede socialisatie en training zijn ze stabiel en betrouwbaar. Ze kunnen territoriaal zijn en argwanend tegenover vreemden, wat hen goede waakhonden maakt."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Beaucerons?",
      answer: "Beaucerons zijn relatief gezonde honden, maar kunnen last hebben van heupdysplasie, elleboogdysplasie, hartziekten (gedilateerde cardiomyopathie) en maagdraaiing. Regelmatige controles zijn belangrijk."
    },
    {
      question: "Hoe oud wordt een Beauceron?",
      answer: "Een Beauceron wordt gemiddeld 10 tot 12 jaar oud. Met goede zorg kunnen sommige 13-14 jaar oud worden. Dit is een goede levensverwachting voor een grote hond."
    },
    {
      question: "Wat kost een Beauceron pup in België?",
      answer: "Een Beauceron pup met stamboom kost tussen €1.000 en €1.800 in België. Dit ras is zeldzamer, dus beschikbaarheid kan beperkt zijn. Kies een fokker die screent op erfelijke aandoeningen."
    }
  ],
  funFacts: [
    "Beaucerons werden oorspronkelijk gebruikt om kuddes van honderden schapen te hoeden in de vlaktes van Frankrijk.",
    "Ze hebben karakteristieke dubbele dauwklauwen aan hun achterpoten – een zeldzaam kenmerk bij honden.",
    "Beaucerons werden door het Franse leger gebruikt in beide Wereldoorlogen als boodschappenhonden en mijndetectie.",
    "Hun bijnaam is 'Bas Rouge' (rode kousen) vanwege de rode aftekening op hun poten.",
    "Ze worden vaak verward met Dobermanns vanwege hun zwart-rode kleur en bouw, maar Beaucerons zijn ouder en robuuster.",
    "Beaucerons rijpen langzaam – ze gedragen zich vaak als pups tot ze 2-3 jaar oud zijn."
  ],
  history: {
    origin: "De Beauceron is één van de oudste Franse hondenrassen en stamt uit de vlakte gebieden rond Parijs, vooral de regio Beauce (waaraan het ras zijn naam dankt). De eerste geschreven vermelding dateert uit de 16e eeuw, maar het ras is waarschijnlijk veel ouder. Beaucerons werden eeuwenlang gebruikt als veelzijdige boerderijhonden: ze hoedden schapen en runderen, bewaakten eigendommen en beschermden vee tegen wolven.",
    development: "In 1863 werden Beaucerons officieel onderscheiden van hun langharige verwanten, de Briards. Pierre Mégnin, een Franse veterinair, speelde een belangrijke rol in het classificeren van Franse herdershonden en beschreef de Beauceron als een aparte ras. De eerste rasclub werd opgericht in 1922.\n\nTijdens de Eerste en Tweede Wereldoorlog werden Beaucerons ingezet door het Franse leger voor verschillende taken: boodschappen bezorgen, mijnendetectie en zoeken naar gewonden. Hun intelligentie, moed en veelzijdigheid maakten hen onmisbaar. Tegenwoordig worden Beaucerons gebruikt als politiehond, reddingshond en in gehoorzaamheid- en beschermingssporten. Ze blijven populair in Frankrijk, maar zijn buiten Europa nog relatief zeldzaam."
  },
  similarBreeds: [
    "Dobermann",
    "Rottweiler",
    "Hollandse Herder",
    "Briard",
    "Cane Corso"
  ],
  commonMistakes: [
    "Te weinig beweging en mentale stimulatie: Beaucerons zijn werkhonden en worden ongelukkig en destructief zonder uitdaging.",
    "Onvoldoende training: Ze zijn intelligent en koppig. Zonder consequente training kunnen ze dominant worden.",
    "Te weinig socialisatie: Begin vroeg met breed socialiseren om overdreven waakzaamheid of agressie te voorkomen.",
    "Dubbele dauwklauwen verwijderen: Deze zijn onderdeel van de rasstandaard en functioneel. Verwijder ze niet.",
    "Te lang alleen laten: Beaucerons zijn gezelschapshonden die niet goed omgaan met lange perioden alleen.",
    "Te jong intensief sporten: Bouw beweging langzaam op om gewrichtsproblemen te voorkomen."
  },
  monthlyCosts: {
    food: "€70-€110",
    vet: "€30-€50",
    grooming: "€15-€30",
    insurance: "€25-€40",
    total: "€140-€230",
    note: "Kosten kunnen hoger uitvallen voor hondensporten zoals agility of obedience training (€50-€100/maand). Hun grote formaat betekent hogere voedingskosten. Eerste jaar totaal: €2.200-€3.500."
  }
};

// ===== Mopshond (Pug) =====
export const mopshond: BreedDetails = {
  breedName: "Pug",
  breedNameNL: "Mopshond",
  faqs: [
    {
      question: "Zijn Mopshonden geschikt voor appartementen?",
      answer: "Ja, Mopshonden zijn uitstekend geschikt voor appartementen. Ze zijn klein, rustig en hebben weinig beweging nodig. Ze passen zich gemakkelijk aan verschillende leefomgevingen aan en blaffen niet veel."
    },
    {
      question: "Hoeveel beweging heeft een Mopshond nodig?",
      answer: "Een Mopshond heeft weinig beweging nodig: 2-3 korte wandelingen van 15-20 minuten per dag is voldoende. Vermijd overmatige inspanning, vooral bij warm weer, vanwege hun korte snuit die ademhalingsproblemen kan veroorzaken."
    },
    {
      question: "Snurken Mopshonden?",
      answer: "Ja, de meeste Mopshonden snurken flink door hun korte snuit en platte gezicht. Dit is normaal voor het ras, maar kan wijzen op ernstige ademhalingsproblemen (BOAS) als het extreem is. Sommige Mopshonden hebben chirurgie nodig om beter te kunnen ademen."
    },
    {
      question: "Zijn Mopshonden goed met kinderen?",
      answer: "Ja, Mopshonden zijn uitstekend met kinderen. Ze zijn vriendelijk, geduldig en speels. Hun robuuste bouw maakt ze geschikt voor gezinnen, maar leer kinderen voorzichtig te zijn met de ogen en ademhaling."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Mopshonden?",
      answer: "Mopshonden hebben helaas veel gezondheidsproblemen: brachycefaal syndroom (ademhalingsproblemen), oogproblemen (uitpuilende ogen), huidinfecties in rimpels, patellaluxatie, rugproblemen en oververhitting. Kies een fokker die werkt aan gezondere lijnen."
    },
    {
      question: "Verharen Mopshonden veel?",
      answer: "Ja, Mopshonden verharen enorm ondanks hun korte vacht. Ze verliezen het hele jaar door haar, met extra verharing in het voorjaar en najaar. Dagelijks borstelen helpt losse haren te verwijderen."
    },
    {
      question: "Hoe oud wordt een Mopshond?",
      answer: "Een Mopshond wordt gemiddeld 12 tot 15 jaar oud, afhankelijk van hun gezondheid. Mopshonden zonder extreme brachycefalie (korte snuit) leven vaak langer."
    },
    {
      question: "Wat kost een Mopshond pup in België?",
      answer: "Een Mopshond pup met stamboom kost tussen €800 en €1.800 in België. Let op fokkers die werken aan gezondere Mopshonden met langere snuiten ('retromops'). Vermijd extreem platte gezichten."
    }
  ],
  funFacts: [
    "Mopshonden zijn één van de oudste hondenrassen – ze bestaan al meer dan 2.000 jaar en waren favorieten van Chinese keizers.",
    "Hun naam 'Pug' komt mogelijk van het Latijnse woord 'pugnus' (vuist), omdat hun gezicht lijkt op een gebalde vuist.",
    "Een groep Mopshonden wordt een 'grumble' genoemd (Eng: gegrom).",
    "Queen Victoria was dol op Mopshonden en had 38 tijdens haar leven! Ze fokten ze zelfs in Buckingham Palace.",
    "Mopshonden hebben de meeste huidrimpels van alle hondenrassen – soms meer dan 40 rimpels in het gezicht.",
    "Hun staartjes die dubbel krullen worden beschouwd als 'perfectie' in rasstandaarden."
  ],
  history: {
    origin: "De Mopshond is één van de oudste hondenrassen ter wereld en stamt uit China, waar ze meer dan 2.000 jaar geleden werden gefokt voor Chinese keizers tijdens de Shang-dynastie (1600-1046 v.Chr.). Deze kleine honden leefden in luxe in keizerlijke paleizen en werden bewaakt door soldaten. Alleen de rijkste families mochten Mopshonden bezitten.",
    development: "In de 16e eeuw brachten Nederlandse handelaren van de VOC (Vereenigde Oost-Indische Compagnie) Mopshonden mee naar Europa. Het ras werd populair in Nederland en kreeg de naam 'Mopshond' (mogelijk van het woord 'mokken' vanwege hun gezichtsuitdrukking). Mopshonden werden favorieten van Europese royalty: Prinses Mary van Oranje had meerdere Mopshonden, en in 1688 volgde het ras Willem III naar Engeland.\n\nIn de 19e eeuw werden Mopshonden populair in Engeland en werden gestandaardiseerd door Queen Victoria, die 38 Mopshonden had. De moderne Mopshond werd erkend door de Kennel Club in 1883. Helaas heeft fokkerij op extreme kenmerken (kortere snuiten, meer rimpels) geleid tot ernstige gezondheidsproblemen. Recent zijn er bewegingen om gezondere 'retromops' lijnen te creëren met langere snuiten."
  },
  similarBreeds: [
    "Franse Bulldog",
    "Boston Terrier",
    "Bullmastiff (in karakter)",
    "Retromops (gezondere variant)"
  ],
  commonMistakes: [
    "Overvoeren: Mopshonden zijn extreem gevoelig voor obesitas, wat ademhalings- en gewrichtsproblemen verergert. Volg voedingsrichtlijnen strikt.",
    "Te veel inspanning bij warm weer: Hun korte snuit maakt ze zeer gevoelig voor oververhitting. Wandel alleen tijdens koele momenten.",
    "Rimpels niet reinigen: Huidrimpels moeten dagelijks gereinigd worden om infecties te voorkomen. Gebruik speciale doekjes.",
    "Ogen verwaarlozen: Hun uitpuilende ogen zijn gevoelig voor krabben en infecties. Controleer dagelijks.",
    "Geen chirurgie overwegen: Sommige Mopshonden hebben neuscorrectie (BOAS-chirurgie) nodig om beter te ademen. Dit verbetert hun kwaliteit van leven.",
    "Extreme fokkers ondersteunen: Kies fokkers die werken aan gezondere lijnen met langere snuiten."
  ],
  monthlyCosts: {
    food: "€30-€50",
    vet: "€30-€70",
    grooming: "€15-€30",
    insurance: "€25-€50",
    total: "€100-€200",
    note: "Kosten kunnen aanzienlijk hoger uitvallen door gezondheidsproblemen. BOAS-chirurgie kost €1.000-€2.500. Oogbehandelingen en huidinfecties verhogen dierenarts kosten. Overweeg een uitgebreide verzekering."
  }
};

// ===== Schnauzer (Standaard) =====
export const schnauzer: BreedDetails = {
  breedName: "Standard Schnauzer",
  breedNameNL: "Schnauzer (Standaard)",
  faqs: [
    {
      question: "Wat is het verschil tussen de drie Schnauzer types?",
      answer: "Er zijn drie Schnauzer types: Dwerg (Miniature, 30-35 cm), Standaard (45-50 cm) en Reuzen (Giant, 60-70 cm). De Standaard Schnauzer is het oorspronkelijke ras; de andere twee zijn later ontwikkeld. Ze verschillen in grootte maar hebben vergelijkbare karakters."
    },
    {
      question: "Zijn Schnauzers geschikt voor beginners?",
      answer: "Schnauzers kunnen geschikt zijn voor beginners, maar ze zijn wel eigenzinnig en koppig. Ze hebben consequente, positieve training nodig en kunnen uitdagend zijn zonder ervaring. Hun intelligentie maakt ze trainbaar, maar ze testen grenzen graag."
    },
    {
      question: "Hoeveel beweging heeft een Standaard Schnauzer nodig?",
      answer: "Een Standaard Schnauzer heeft minimaal 1 tot 1,5 uur beweging per dag nodig. Ze houden van wandelen, rennen en spelen. Mentale stimulatie is net zo belangrijk – ze vervelen zich snel zonder uitdaging."
    },
    {
      question: "Verharen Schnauzers?",
      answer: "Nee, Schnauzers verharen nauwelijks en worden vaak beschouwd als hypoallergeen. Hun vacht groeit continu en moet elke 6-8 weken geplukt of geknipt worden. Dagelijks borstelen voorkomt klitten in de baard en poten."
    },
    {
      question: "Zijn Schnauzers goed met kinderen?",
      answer: "Ja, Schnauzers zijn goede gezinshonden en beschermend over kinderen. Ze zijn speels en energiek, maar kunnen te enthousiast zijn voor hele jonge kinderen. Toezicht en training zijn belangrijk."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Schnauzers?",
      answer: "Standaard Schnauzers zijn relatief gezond, maar kunnen last hebben van heupdysplasie, oogproblemen (cataract, progressieve retina-atrofie), hypothyreoïdie en urinestenen. Regelmatige controles zijn belangrijk."
    },
    {
      question: "Hoe oud wordt een Standaard Schnauzer?",
      answer: "Een Standaard Schnauzer wordt gemiddeld 13 tot 16 jaar oud. Met goede zorg kunnen sommige zelfs 17-18 jaar oud worden. Dit is een uitstekende levensverwachting voor een middelgrote hond."
    },
    {
      question: "Wat kost een Standaard Schnauzer pup in België?",
      answer: "Een Standaard Schnauzer pup met stamboom kost tussen €1.000 en €1.800 in België. Kies een fokker die screent op erfelijke aandoeningen en werklijnen of showlijnen duidelijk maakt."
    }
  ],
  funFacts: [
    "De naam 'Schnauzer' komt van het Duitse woord 'Schnauze' (snuit), verwijzend naar hun kenmerkende baard.",
    "Schnauzers waren de favoriete hond van kunstenaar Albrecht Dürer, die zijn Schnauzer portretteerde in vele schilderijen in de 15e eeuw.",
    "Ze werden oorspronkelijk gefokt als veelzijdige boerderijhonden in Duitsland: ze vingen ratten, bewaakten karren en hoedden vee.",
    "Tijdens de Eerste en Tweede Wereldoorlog werden Schnauzers gebruikt als Rode Kruishonden en boodschappenhonden.",
    "Schnauzers hebben kenmerkende wenkbrauwen en baard die hen een 'oude man' uitdrukking geven.",
    "Ze zijn één van de weinige rassen met een gestructureerde, draadhaar vacht die geplukt moet worden in plaats van knippen."
  ],
  history: {
    origin: "De Standaard Schnauzer is het oudste van de drie Schnauzer types en stamt uit de regio Baden-Württemberg in Zuid-Duitsland, waar ze al sinds de Middeleeuwen voorkomen. Ze werden oorspronkelijk gebruikt als veelzijdige boerderijhonden: ze bewaakten boerderijen, vingen ratten en andere ongedierte, en werden ingezet om koetsiers te vergezellen en hun karren te bewaken op markten.",
    development: "Het ras werd voor het eerst officieel tentoongesteld in 1879 op een hondenshow in Hannover onder de naam 'Wire-Haired Pinscher'. De eerste rasclub werd opgericht in 1895, en de naam werd veranderd naar Schnauzer. De standaard werd vastgelegd op basis van een beroemde showkampioenen genaamd 'Schnauzer' – een peper-en-zout gekleurde reu.\n\nTijdens de wereldoorlogen werden Schnauzers ingezet door het Duitse en Oostenrijkse leger als boodschappenhonden en Rode Kruishonden. Hun intelligentie, moed en veelzijdigheid maakten hen waardevol. Na de Tweede Wereldoorlog verspreidde het ras zich over de hele wereld. Tegenwoordig worden Standaard Schnauzers ingezet als politiehond, detectiehond en gezinshond. Ze blijven populair in Duitsland en winnen langzaam aan populariteit in andere landen."
  },
  similarBreeds: [
    "Airedale Terrier",
    "German Pinscher",
    "Bouvier des Flandres",
    "Black Russian Terrier"
  ],
  commonMistakes: [
    "Onvoldoende vachtverzorging: Hun draadhaar vacht moet elke 6-8 weken geplukt of geknipt worden. Verwaarlozing leidt tot klitten en huidproblemen.",
    "Te weinig mentale stimulatie: Schnauzers zijn intelligent en vervelen zich snel. Zonder puzzels en training worden ze destructief.",
    "Onvoldoende socialisatie: Schnauzers kunnen argwanend tegenover vreemden en andere honden zijn. Socialiseer vroeg en breed.",
    "Te weinig training: Ze zijn koppig en testen grenzen. Consequente training vanaf puppyperiode is essentieel.",
    "Baard verwaarlozen: Hun baard moet dagelijks gecontroleerd en gereinigd worden – voedsel en vuil blijven makkelijk hangen.",
    "Te lang alleen laten: Schnauzers zijn sociale honden die niet goed omgaan met langdurige afwezigheid."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€40",
    grooming: "€40-€70",
    insurance: "€20-€35",
    total: "€135-€225",
    note: "Professionele trimming/plukken kost €50-€80 per sessie (6-8x per jaar). Leer zelf plukken kan kosten besparen. Eerste jaar totaal: €2.000-€3.000."
  }
};

// ===== Siberische Husky =====
export const siberischeHusky: BreedDetails = {
  breedName: "Siberian Husky",
  breedNameNL: "Siberische Husky",
  faqs: [
    {
      question: "Zijn Siberische Husky's geschikt voor beginners?",
      answer: "Nee, Siberische Husky's zijn niet aanbevolen voor beginners. Ze zijn eigenzinnig, hebben een sterke wil, en zijn meesters in ontsnappen. Ze vereisen ervaring, consequente training en veel tijd. Zonder goede leiding kunnen ze onhandelbaar worden."
    },
    {
      question: "Hoeveel beweging heeft een Siberische Husky nodig?",
      answer: "Een Siberische Husky heeft minimaal 2 uur intensieve beweging per dag nodig. Ze zijn gefokt om de hele dag te rennen en hebben een onuitputtelijke energie. Rennen, fietsen, sledehondensport en lange wandelingen zijn ideaal."
    },
    {
      question: "Kunnen Siberische Husky's in warme klimaten leven?",
      answer: "Siberische Husky's kunnen in warme klimaten leven, maar het is niet ideaal. Hun dikke dubbele vacht is gebouwd voor extreme kou. In warme klimaten hebben ze airconditioning, schaduw en veel water nodig. Wandel alleen tijdens koele momenten."
    },
    {
      question: "Zijn Siberische Husky's gemakkelijk te trainen?",
      answer: "Nee, Siberische Husky's zijn notorisch moeilijk te trainen. Ze zijn intelligent maar eigenzinnig en vragen zich vaak af 'waarom' ze een commando moeten uitvoeren. Positieve bekrachtiging werkt het beste, maar ze blijven onafhankelijk."
    },
    {
      question: "Huilen Siberische Husky's echt?",
      answer: "Ja, Siberische Husky's zijn zeer vocaal en 'praten' en huilen vaak. Ze blaffen zelden, maar uiten zich door janken, huilen en zingen. Dit kan storend zijn voor buren. Training kan helpen, maar het is onderdeel van hun karakter."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Siberische Husky's?",
      answer: "Siberische Husky's zijn relatief gezond, maar kunnen last hebben van heupdysplasie, oogproblemen (cataract, progressieve retina-atrofie, cornea dystrofie), en hypothyreoïdie. Kies een fokker die screent op erfelijke aandoeningen."
    },
    {
      question: "Hoe oud wordt een Siberische Husky?",
      answer: "Een Siberische Husky wordt gemiddeld 12 tot 15 jaar oud. Dit is een uitstekende levensverwachting voor een middelgrote hond. Met goede zorg kunnen sommige 16-17 jaar oud worden."
    },
    {
      question: "Wat kost een Siberische Husky pup in België?",
      answer: "Een Siberische Husky pup met stamboom kost tussen €800 en €1.500 in België. Pups met blauwe ogen of bijzondere kleuren kunnen duurder zijn. Let op: veel Husky's eindigen in asielen door onderschatting van hun behoeften."
    }
  ],
  funFacts: [
    "Siberische Husky's werden gefokt door de Tsjoektsjen-stam in Siberië om sleeën te trekken over honderden kilometers in extreme kou (tot -60°C).",
    "In 1925 redde een team Husky's de stad Nome, Alaska, tijdens een difterie-uitbraak door medicijnen over 1.085 km door een sneeuwstorm te vervoeren (de 'Serum Run').",
    "Husky's hebben een bijzonder metabolisme: ze kunnen vet verbranden in plaats van koolhydraten, waardoor ze uren kunnen rennen zonder uit te putten.",
    "Hun blauwe ogen worden veroorzaakt door een genetische mutatie en zijn niet gekoppeld aan doofheid (in tegenstelling tot andere rassen).",
    "Husky's kunnen temperaturen tot -75°C overleven dankzij hun dubbele vacht en vermogen om zich op te krullen met hun staart over hun neus.",
    "Ze zijn meesters in ontsnappen – ze kunnen over omheiningen klimmen, er onderdoor graven en zelfs simpele sloten openen."
  ],
  history: {
    origin: "De Siberische Husky stamt van het Tsjoektsjen-volk, een semi-nomadische stam in Noordoost-Siberië (nu Rusland). Deze honden werden meer dan 3.000 jaar geleden gefokt om sleeën te trekken over enorme afstanden in extreme kou, waarbij ze voedsel, goederen en mensen vervoerden. De Tsjoektsjen-mensen selecteerden op uithoudingsvermogen, vriendelijkheid en het vermogen om in extreme omstandigheden te overleven.",
    development: "In 1908 werden de eerste Siberische Husky's geïmporteerd naar Alaska voor sleeënracen. Ze werden aanvankelijk uitgelachen vanwege hun kleinere formaat vergeleken met Alaskaanse Malamutes, maar hun snelheid en uithoudingsvermogen maakten hen onverslaanbaar in races. In 1925 werden Husky's wereldberoemd door de 'Serum Run to Nome', waarbij een team sleeënhonden medicijnen bezorgde om een difterie-uitbraak te stoppen. De leider van het laatste team, Balto, kreeg een standbeeld in New York's Central Park.\n\nHet ras werd officieel erkend door de American Kennel Club in 1930. Tijdens de Tweede Wereldoorlog werden Husky's ingezet in Arctic Search and Rescue. Tegenwoordig worden ze gebruikt voor sledehondensport, gezelschapshonden en in sommige gebieden nog steeds voor transport in arctische regio's."
  },
  similarBreeds: [
    "Alaskan Malamute",
    "Samojeed",
    "Groenlandse Hond",
    "Alaskan Husky (geen officieel ras)"
  ],
  commonMistakes: [
    "Onderschatten van bewegingsbehoefte: Husky's zijn marathonlopers. Zonder voldoende beweging worden ze destructief en ongelukkig.",
    "Slechte omheining: Husky's zijn ontsnappingskunstenaars. Een hoge, stevige omheining (minimaal 1,8 m) zonder gaten onder de grond is essentieel.",
    "Te weinig mentale stimulatie: Naast fysieke beweging hebben Husky's mentale uitdaging nodig. Verveling leidt tot destructief gedrag.",
    "Scheren in de zomer: Scheer een Husky NOOIT. Hun dubbele vacht reguleert temperatuur en beschermt tegen zon. Scheren veroorzaakt huidproblemen.",
    "Te weinig socialisatie: Husky's hebben een sterke jachtdrift. Socialiseer vroeg met katten en kleine dieren, maar wees voorzichtig.",
    "Zonder lijn laten lopen: Husky's hebben een enorme drang om te rennen en komen niet altijd terug. Laat ze alleen los in veilige, omheinde gebieden."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€25-€40",
    grooming: "€20-€40",
    insurance: "€20-€35",
    total: "€125-€215",
    note: "Kosten kunnen hoger uitvallen tijdens verhaartijd (extra borstels en stofzuigen). Overweeg kosten voor sledehondensport of doggy daycare om aan bewegingsbehoefte te voldoen (€10-€20/dag). Eerste jaar totaal: €1.800-€2.800."
  }
};

// ===== Hongaarse Vizsla =====
export const hongaarseVizsla: BreedDetails = {
  breedName: "Hungarian Vizsla",
  breedNameNL: "Hongaarse Vizsla",
  faqs: [
    {
      question: "Zijn Vizsla's geschikt voor beginners?",
      answer: "Vizsla's kunnen geschikt zijn voor actieve beginners, maar ze zijn veeleisend. Ze hebben veel beweging, aandacht en mentale stimulatie nodig. Zonder ervaring kunnen hun energie en aanhankelijkheid overweldigend zijn. Ze zijn niet geschikt voor mensen met een rustige levensstijl."
    },
    {
      question: "Hoeveel beweging heeft een Vizsla nodig?",
      answer: "Een Vizsla heeft minimaal 2 uur intensieve beweging per dag nodig. Ze zijn gefokt als jachthonden en hebben een onuitputtelijke energie. Rennen, zwemmen, wandelen en apporteren zijn ideaal. Zonder voldoende beweging worden ze destructief."
    },
    {
      question: "Zijn Vizsla's aanhankelijk?",
      answer: "Ja, Vizsla's zijn extreem aanhankelijk en worden vaak 'Velcro dogs' genoemd omdat ze constant bij hun baas willen zijn. Ze volgen je van kamer naar kamer en kunnen scheidingsangst ontwikkelen. Ze zijn niet geschikt voor mensen die lange dagen weg zijn."
    },
    {
      question: "Zijn Vizsla's geschikt voor appartementen?",
      answer: "Nee, Vizsla's zijn niet ideaal voor appartementen. Ze zijn grote, energieke honden die veel ruimte en beweging nodig hebben. Een huis met tuin en toegang tot open ruimtes is veel beter. In een appartement kunnen ze onrustig en ongelukkig worden."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Vizsla's?",
      answer: "Vizsla's zijn relatief gezond, maar kunnen last hebben van heupdysplasie, epilepsie, hypothyreoïdie, en bepaalde vormen van kanker (lymfoom, hemangiosaroom). Kies een fokker die screent op erfelijke aandoeningen."
    },
    {
      question: "Verharen Vizsla's?",
      answer: "Vizsla's verharen matig. Hun korte, gladde vacht laat wat haar achter, maar veel minder dan dubbel-gevachte rassen. Wekelijks borstelen met een zachte borstel is voldoende om losse haren te verwijderen."
    },
    {
      question: "Hoe oud wordt een Vizsla?",
      answer: "Een Vizsla wordt gemiddeld 12 tot 14 jaar oud. Dit is een goede levensverwachting voor een grote hond. Met goede zorg kunnen sommige 15-16 jaar oud worden."
    },
    {
      question: "Wat kost een Vizsla pup in België?",
      answer: "Een Vizsla pup met stamboom kost tussen €1.200 en €2.000 in België. Kies een fokker die screent op heupdysplasie, epilepsie en andere erfelijke aandoeningen. Wachtlijsten zijn vaak lang vanwege de populariteit van het ras."
    }
  ],
  funFacts: [
    "Vizsla's zijn één van de weinige rassen met een volledig goudroest gekleurde vacht, inclusief neus en ogen – geen zwarte pigmentatie!",
    "Ze worden ook wel 'Velcro dogs' genoemd omdat ze altijd bij hun baas willen zijn – ze volgen je zelfs naar de badkamer.",
    "Vizsla's zijn uitstekende zwemmers en houden van water, ondanks dat ze geen zwemvliezen hebben zoals Labradors.",
    "Het ras overleefde bijna twee wereldoorlogen en de Hongaarse Revolutie – in de jaren '40 waren er maar 12 Vizsla's over in Hongarije.",
    "Hun naam 'Vizsla' betekent 'zoeker' of 'pointer' in het Hongaars, verwijzend naar hun rol als jachthond.",
    "Vizsla's hebben een uniek 'zachte bek' waardoor ze wild kunnen apporteren zonder het te beschadigen."
  ],
  history: {
    origin: "De Vizsla is één van de oudste Europese jachthondrassen en stamt uit Hongarije, waar ze meer dan 1.000 jaar geleden werden gefokt door de Magyaren (Hongaarse stammen). Vroege afbeeldingen van Vizsla-achtige honden zijn gevonden in 10e-eeuwse steengravures. De Hongaarse adel gebruikte Vizsla's voor de jacht op wilde vogels en konijnen in de vlaktes en bossen van Hongarije.",
    development: "In de 19e en vroege 20e eeuw werd het ras verfijnd en gekruist met Duitse Pointers en mogelijk Engelse Pointers om hun jachtvermogen te verbeteren. De Vizsla was favoriet onder Hongaarse aristocraten en werd gebruikt voor falconry (jacht met roofvogels).\n\nTijdens de Eerste en Tweede Wereldoorlog en de Hongaarse Revolutie raakte het ras bijna uitgestorven. In de jaren '40 waren er slechts ongeveer 12 Vizsla's over in Hongarije. Enkele toegewijde fokkers smokkelden honden naar Oostenrijk en later naar de Verenigde Staten om het ras te redden. De Amerikaanse Kennel Club erkende de Vizsla in 1960. Tegenwoordig is de Vizsla populair als jachthond, gezinshond en in hondensport zoals agility en field trials."
  },
  similarBreeds: [
    "Weimaraner",
    "Rhodesian Ridgeback",
    "German Shorthaired Pointer",
    "Redbone Coonhound"
  ],
  commonMistakes: [
    "Te weinig beweging: Vizsla's zijn onvermoeibaar en hebben extreem veel beweging nodig. Zonder dit worden ze destructief en angstig.",
    "Te lang alleen laten: Vizsla's zijn zeer aanhankelijk en ontwikkelen makkelijk scheidingsangst. Plan gezelschap of hondenoppas in.",
    "Onvoldoende mentale stimulatie: Naast fysieke beweging hebben ze mentale uitdagingen nodig zoals apporteren, zoekwerk of training.",
    "Te jong intensief sporten: Bouw beweging langzaam op om gewrichtsproblemen te voorkomen, vooral in het eerste jaar.",
    "Geen kou bescherming: Hun korte vacht biedt weinig isolatie. In koude maanden hebben ze een jasje nodig.",
    "Te strenge training: Vizsla's zijn gevoelig en reageren slecht op harde correcties. Positieve bekrachtiging werkt het beste."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€25-€45",
    grooming: "€10-€20",
    insurance: "€25-€40",
    total: "€120-€205",
    note: "Kosten kunnen hoger uitvallen door hun energiebehoefte (hondenoppas €10-€20/dag, doggy daycare). Overweeg kosten voor hondensport zoals field trials of agility (€50-€100/maand). Eerste jaar totaal: €2.200-€3.200."
  }
};

// ===== Amerikaanse Staffordshire Terrier =====
export const amerikaanseStaffordshireTerrier: BreedDetails = {
  breedName: "American Staffordshire Terrier",
  breedNameNL: "Amerikaanse Staffordshire Terrier",
  faqs: [
    {
      question: "Wat is het verschil tussen een American Staffordshire Terrier en een Pitbull?",
      answer: "De American Staffordshire Terrier (AmStaff) en American Pit Bull Terrier delen dezelfde oorsprong, maar zijn sinds de jaren '30 apart gefokt. AmStaffs zijn rasgebonden volgens kennel clubs (met vaste standaarden), terwijl Pitbulls (APBT) meer variatie kennen. In België vallen beide onder dezelfde wetgeving."
    },
    {
      question: "Zijn AmStaffs gevaarlijk?",
      answer: "Nee, AmStaffs zijn niet van nature gevaarlijk. Met goede socialisatie en training zijn ze vriendelijk en loyaal. Hun kracht en jachtvermogen vereisen wel een verantwoordelijke baas. In België zijn AmStaffs categorie 2 honden en vereisen ze een gedragstest en verzekering."
    },
    {
      question: "Zijn AmStaffs geschikt voor beginners?",
      answer: "AmStaffs zijn niet ideaal voor beginners. Ze zijn krachtig, eigenzinnig en hebben consequente training en socialisatie nodig. Ze vereisen een ervaren baas die leiderschap toont. Zonder goede begeleiding kunnen gedragsproblemen ontstaan."
    },
    {
      question: "Hoeveel beweging heeft een AmStaff nodig?",
      answer: "Een AmStaff heeft minimaal 1,5 tot 2 uur beweging per dag nodig. Ze zijn atletisch en houden van rennen, wandelen, treksporten en spelen. Mentale stimulatie is ook belangrijk om verveling te voorkomen."
    },
    {
      question: "Zijn AmStaffs goed met kinderen?",
      answer: "Ja, AmStaffs kunnen uitstekend met kinderen zijn als ze goed gesocialiseerd zijn. Ze zijn loyaal, beschermend en geduldig. Hun kracht vereist wel toezicht, vooral met jonge kinderen. Leer kinderen respectvol met de hond om te gaan."
    },
    {
      question: "Welke wetgeving geldt voor AmStaffs in België?",
      answer: "In België zijn AmStaffs categorie 2 honden. Je hebt een gedragstest, verplichte verzekering, registratie en in sommige gemeenten een vergunning nodig. Muilkorven zijn verplicht op openbare plaatsen. Controleer lokale regels bij je gemeente."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij AmStaffs?",
      answer: "AmStaffs zijn relatief gezond, maar kunnen last hebben van heupdysplasie, hartziekten, huidallergieën, hypothyreoïdie en bepaalde vormen van kanker. Kies een fokker die screent op erfelijke aandoeningen."
    },
    {
      question: "Hoe oud wordt een AmStaff?",
      answer: "Een AmStaff wordt gemiddeld 12 tot 16 jaar oud. Dit is een uitstekende levensverwachting voor een middelgrote hond. Met goede zorg kunnen sommige 16-18 jaar oud worden."
    }
  ],
  funFacts: [
    "AmStaffs waren oorspronkelijk bekend als 'nanny dogs' in Amerika vanwege hun geduld en beschermend gedrag met kinderen.",
    "Stubby, een AmStaff, was de meest gedecoreerde hond in de Eerste Wereldoorlog en ontving meerdere medailles voor moed.",
    "AmStaffs hebben een bijtkracht van ongeveer 235 PSI – krachtiger dan veel andere rassen, maar minder dan Rottweilers (328 PSI).",
    "Ze zijn uitstekende atleten en kunnen verticaal springen tot 1,5 meter hoog vanuit stilstand!",
    "Beroemdheden zoals Jessica Biel, Kaley Cuoco en Michael J. Fox hebben AmStaffs als huisdier gehad.",
    "AmStaffs hebben één van de breedste glimlachen in de hondenwereld – ze lijken letterlijk te 'grijnen'!"
  ],
  history: {
    origin: "De American Staffordshire Terrier stamt af van Bull-and-Terrier honden die in de 19e eeuw vanuit Engeland naar Amerika werden gebracht. Deze honden waren oorspronkelijk gefokt voor 'bull-baiting' en later voor hondenvechten (nu illegaal). In Engeland werden Bulldogs gekruist met terriërs om een krachtige, moedige hond te creëren met sterk bijtwerk.",
    development: "In Amerika werden deze honden verder gefokt en selecteerden fokkers op groter formaat en kalmer temperament voor gebruik als boerderijhonden, waakhonden en gezelschapshonden. In de vroege 20e eeuw werden ze populair in het Amerikaanse Middenwesten en stonden bekend als loyale gezinshonden, vaak 'nanny dogs' genoemd vanwege hun geduld met kinderen.\n\nIn 1936 erkende de American Kennel Club het ras als 'Staffordshire Terrier' (later hernoemd naar American Staffordshire Terrier in 1972). Dit markeerde een splitsing: AmStaffs werden gefokt volgens rasstandaarden voor shows, terwijl American Pit Bull Terriers (APBT) meer focus hielden op werklijnen. Tegenwoordig zijn AmStaffs populair als gezinshonden, maar worstelen ze met stigma's vanwege hun geschiedenis en negatieve media-aandacht."
  },
  similarBreeds: [
    "American Pit Bull Terrier",
    "Staffordshire Bull Terrier",
    "Bull Terrier",
    "American Bully"
  ],
  commonMistakes: [
    "Onvoldoende socialisatie: AmStaffs kunnen reactief zijn naar andere honden zonder vroege socialisatie. Begin breed en jong.",
    "Te weinig training: Hun kracht en eigenwijsheid vereisen consequente, positieve training. Verwaarlozing leidt tot gedragsproblemen.",
    "Wetgeving negeren: In België hebben AmStaffs specifieke vereisten (gedragstest, verzekering, muilkorf). Neem dit serieus.",
    "Te jong sporten: Hun gespierde bouw vereist voorzichtige opbouw van beweging om gewrichtsproblemen te voorkomen.",
    "Isoleren van andere honden: AmStaffs hebben sociale interactie nodig, maar altijd onder toezicht vanwege mogelijke hond-agressie.",
    "Verkeerde muilkorf: Kies een comfortabele basket muzzle die hijgen en drinken toestaat, geen strakke nylon muilkorven."
  ],
  monthlyCosts: {
    food: "€50-€90",
    vet: "€25-€50",
    grooming: "€10-€20",
    insurance: "€30-€60",
    total: "€115-€220",
    note: "Verplichte verzekering voor categorie 2 honden kost €30-€60/maand (aansprakelijkheidsverzekering). Gedragstest kost eenmalig €150-€300. Overweeg professionele training (€50-€100/maand). Eerste jaar totaal: €2.500-€3.500."
  }
};

// ===== Basenji =====
export const basenji: BreedDetails = {
  breedName: "Basenji",
  breedNameNL: "Basenji",
  faqs: [
    {
      question: "Is het waar dat Basenji's niet kunnen blaffen?",
      answer: "Ja, Basenji's blaffen niet zoals andere honden vanwege hun unieke strottenhoofd. In plaats daarvan maken ze een jodel-achtig geluid genaamd een 'baroo'. Ze kunnen ook janken, grommen en huilen, maar blaffen is onmogelijk."
    },
    {
      question: "Zijn Basenji's geschikt voor beginners?",
      answer: "Nee, Basenji's zijn niet aanbevolen voor beginners. Ze zijn eigenzinnig, slim en gedragen zich meer als katten dan honden. Ze zijn moeilijk te trainen en vereisen veel geduld en consistentie. Ervaring met honden is sterk aanbevolen."
    },
    {
      question: "Hoeveel beweging heeft een Basenji nodig?",
      answer: "Een Basenji heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn atletisch en houden van rennen en spelen. Hun sterke jachtdrift betekent dat ze altijd aan de lijn moeten of in een veilig, omheind gebied."
    },
    {
      question: "Zijn Basenji's hypoallergeen?",
      answer: "Basenji's worden vaak als hypoallergeen beschouwd omdat ze weinig verharen en bijna geen hondengeur hebben. Ze wassen zichzelf zoals katten. Echter, geen enkel ras is 100% hypoallergeen – test altijd eerst bij ernstige allergieën."
    },
    {
      question: "Zijn Basenji's gemakkelijk te trainen?",
      answer: "Nee, Basenji's behoren tot de moeilijkst te trainen rassen. Ze zijn intelligent maar onafhankelijk en vragen zich constant af 'waarom'. Positieve bekrachtiging met hoge-waarde beloningen werkt het beste, maar verwacht geen perfecte gehoorzaamheid."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Basenji's?",
      answer: "Basenji's zijn gevoelig voor Fanconi syndroom (nieraandoening), progressieve retina-atrofie (PRA), hypothyreoïdie, en heupproblemen. Kies een fokker die screent op Fanconi syndroom en PRA."
    },
    {
      question: "Hoe oud wordt een Basenji?",
      answer: "Een Basenji wordt gemiddeld 13 tot 14 jaar oud. Met goede zorg en vroege detectie van Fanconi syndroom kunnen sommige 16-17 jaar oud worden."
    },
    {
      question: "Wat kost een Basenji pup in België?",
      answer: "Een Basenji pup met stamboom kost tussen €1.200 en €2.000 in België. Dit ras is zeldzaam, waardoor beschikbaarheid beperkt is en wachtlijsten lang kunnen zijn."
    }
  ],
  funFacts: [
    "Basenji's zijn één van de oudste hondenrassen ter wereld – ze zijn afgebeeld op wandschilderingen in Egyptische graven uit 2400 v.Chr.",
    "Ze wassen zichzelf zoals katten en hebben bijna geen 'hondengeur'.",
    "Basenji's kunnen niet blaffen vanwege hun unieke strottenhoofd, maar maken een jodel-achtig geluid genaamd 'baroo'.",
    "Teefjes hebben maar één keer per jaar loops (in tegenstelling tot twee keer bij de meeste rassen) – dit is een primitief kenmerk.",
    "Basenji's hebben diepe fronzen op hun voorhoofd, waardoor ze altijd een bezorgde of nadenkende uitdrukking hebben.",
    "Ze zijn extreem goede springers en kunnen tot 1,5 meter hoog springen vanuit stilstand!"
  ],
  history: {
    origin: "De Basenji is één van de oudste hondenrassen ter wereld en stamt uit Centraal-Afrika, waar ze duizenden jaren geleden werden gefokt door stammen in het Congobekken. Deze honden werden gebruikt om wild te jagen en op te sporen in dichte bossen. Basenji's zijn afgebeeld op wandschilderingen in Egyptische graven uit 2400 v.Chr., waar ze werden gegeven als geschenken aan de farao's.",
    development: "Basenji's bleven duizenden jaren geïsoleerd in Afrika en ontwikkelden unieke kenmerken: ze blaffen niet, wassen zichzelf zoals katten, en hebben maar één loopsheid per jaar. In de late 19e eeuw probeerden Europese ontdekkingsreizigers Basenji's naar Europa te brengen, maar de meeste honden stierven aan hondenziekte.\n\nIn de jaren '30 werden succesvol Basenji's geïmporteerd naar Engeland en later naar de Verenigde Staten. De Kennel Club erkende het ras in 1937, en de American Kennel Club volgde in 1943. Tegenwoordig zijn Basenji's populair als zeldzame gezelschapshonden en worden gewaardeerd om hun intelligentie, reinheid en unieke persoonlijkheid. Ze behouden nog steeds veel primitieve kenmerken en gedragen zich vaak meer als wilde dieren dan gedomesticeerde honden."
  },
  similarBreeds: [
    "Pharaoh Hound",
    "Ibizan Hound",
    "Podenco",
    "Shiba Inu (in temperament)"
  ],
  commonMistakes: [
    "Verwachten dat ze gehoorzaam zijn: Basenji's zijn onafhankelijk en eigenzinnig. Ze zullen nooit perfect gehoorzamen zoals een Labrador.",
    "Zonder lijn loslaten: Hun sterke jachtdrift betekent dat ze achter prooi rennen en niet terugkomen. Laat ze alleen los in veilig omheinde gebieden.",
    "Onvoldoende omheining: Basenji's zijn ontsnappingskunstenaars en kunnen hoog springen en graven. Een hoge, stevige omheining is essentieel.",
    "Te weinig mentale stimulatie: Basenji's zijn intelligent en vervelen zich snel. Zonder puzzels en uitdagingen worden ze destructief.",
    "Te jong socialiseren stoppen: Basenji's kunnen terughoudend of argwanend zijn. Blijf socialiseren gedurende hun hele leven.",
    "Geen screening op Fanconi syndroom: Dit is een ernstige nieraandoening. Kies een fokker die test en vraag naar ouderdieren."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€25-€45",
    grooming: "€5-€15",
    insurance: "€20-€35",
    total: "€90-€165",
    note: "Kosten blijven relatief laag door hun kleine formaat en minimale groomingbehoeften. Fanconi syndroom kan dure behandeling vereisen (€100-€300/maand). Overweeg een uitgebreide verzekering. Eerste jaar totaal: €1.800-€2.800."
  }
};

// ===== Shetland Sheepdog (Sheltie) =====
export const shetlandSheepdog: BreedDetails = {
  breedName: "Shetland Sheepdog",
  breedNameNL: "Shetland Sheepdog (Sheltie)",
  faqs: [
    {
      question: "Wat is het verschil tussen een Sheltie en een Collie?",
      answer: "Shelties lijken op miniatuur Rough Collies, maar zijn een apart ras. Shelties zijn kleiner (33-40 cm), terwijl Collies 56-61 cm zijn. Shelties hebben ook een ander temperament: ze zijn gevoeliger, waakzamer en hebben vaak meer neiging tot blaffen."
    },
    {
      question: "Zijn Shelties geschikt voor beginners?",
      answer: "Ja, Shelties kunnen geschikt zijn voor beginners. Ze zijn intelligent, trainbaar en graag hun baas ter wille. Ze zijn wel gevoelig en vereisen zachte, positieve training. Hun neiging tot blaffen en schuwheid kan uitdagend zijn zonder goede socialisatie."
    },
    {
      question: "Hoeveel beweging heeft een Sheltie nodig?",
      answer: "Een Sheltie heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn atletisch en houden van wandelen, rennen en hondensport zoals agility. Mentale stimulatie is net zo belangrijk – ze vervelen zich snel zonder uitdaging."
    },
    {
      question: "Verharen Shelties veel?",
      answer: "Ja, Shelties verharen intensief vanwege hun dikke dubbele vacht. Ze verharen het hele jaar door met extra verhaartijd in het voorjaar en najaar. Borstel minimaal 3-4x per week, dagelijks tijdens verhaartijd, om losse haren te verwijderen."
    },
    {
      question: "Zijn Shelties goed met kinderen?",
      answer: "Ja, Shelties zijn goed met kinderen, vooral oudere kinderen. Ze zijn vriendelijk en speels, maar kunnen gevoelig zijn voor hard geluid en ruw spel. Socialiseer jonge Shelties vroeg met kinderen om schuwheid te voorkomen."
    },
    {
      question: "Blaffen Shelties veel?",
      answer: "Ja, Shelties hebben een sterke neiging tot blaffen. Als waakhonden waren ze gefokt om alarm te slaan. Zonder training kunnen ze problematische blaffers worden. Vroege training om 'stil' te leren is essentieel."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Shelties?",
      answer: "Shelties zijn gevoelig voor collie eye anomaly (CEA), progressieve retina-atrofie (PRA), hypothyreoïdie, patellaluxatie, en dermatomyositis (huidziekte). Kies een fokker die screent op erfelijke oogaandoeningen."
    },
    {
      question: "Hoe oud wordt een Sheltie?",
      answer: "Een Sheltie wordt gemiddeld 12 tot 14 jaar oud. Met goede zorg kunnen sommige 15-16 jaar oud worden. Dit is een goede levensverwachting voor een kleine tot middelgrote hond."
    }
  ],
  funFacts: [
    "Shelties stamen van de Shetland eilanden in Schotland, waar ze schapen, pony's en kippen hoedden op kleine boerderijen.",
    "Ze zijn één van de slimste hondenrassen – ze staan op plaats 6 in Stanley Coren's hondenintelligentie ranking.",
    "Shelties hebben een natuurlijke neiging tot 'herding': ze kunnen kinderen, andere honden of zelfs stofzuigers proberen te hoeden!",
    "Hun vacht is zo dik dat het bijna waterdicht is – ontwikkeld om te overleven in het koude, natte klimaat van de Shetland eilanden.",
    "Shelties zijn uitstekend in hondensport zoals agility en obedience – ze winnen regelmatig competities.",
    "Ze hebben een breed scala aan geluiden: van zacht janken tot luid blaffen, en zelfs een uniek 'Sheltie scream' wanneer opgewonden!"
  ],
  history: {
    origin: "De Shetland Sheepdog stamt van de Shetland eilanden, een ruig, bergachtig eilandengroep ten noorden van Schotland. Deze eilanden zijn bekend om hun miniatuur dieren – Shetland pony's, Shetland schapen – en de Sheltie was geen uitzondering. Vroege Shelties waren waarschijnlijk kruisingen tussen lokale Border Collies, King Charles Spaniels en mogelijk Pomeranians. Ze werden gebruikt om kleine schapen te hoeden, kippen te bewaken en pony's in toom te houden.",
    development: "In de 19e eeuw begonnen toeristen en zeelieden Shelties mee te nemen van de Shetland eilanden naar het vasteland. Het ras werd aanvankelijk 'Shetland Collie' genoemd, maar Collie-fokkers verzetten zich hiertegen. In 1909 werd het ras officieel erkend als 'Shetland Sheepdog'.\n\nTijdens de vroege 20e eeuw werden Shelties verfijnd door kruisingen met Rough Collies om hun uiterlijk te verbeteren. Dit leidde tot de moderne Sheltie: kleiner dan een Collie maar met een vergelijkbare elegante uitstraling. Het ras werd populair in de jaren '50 en '60 in de Verenigde Staten en Europa. Tegenwoordig zijn Shelties geliefd als gezinshonden, therapiehonden en in hondensport zoals agility en obedience, waar hun intelligentie en atletisch vermogen excelleren."
  },
  similarBreeds: [
    "Rough Collie",
    "Border Collie",
    "Australian Shepherd",
    "Icelandic Sheepdog"
  ],
  commonMistakes: [
    "Onvoldoende vachtverzorging: Hun dikke vacht klittert makkelijk. Borstel minimaal 3-4x per week om klitten en huidproblemen te voorkomen.",
    "Te weinig socialisatie: Shelties kunnen schuw zijn. Socialiseer breed en jong om angst en overdreven blaffen te voorkomen.",
    "Geen blaftraining: Zonder training kunnen Shelties problematische blaffers worden. Leer 'stil' vroeg aan.",
    "Te weinig mentale stimulatie: Shelties zijn zeer intelligent en vervelen zich snel. Zonder puzzels en training worden ze angstig.",
    "Harde training: Shelties zijn gevoelig en reageren slecht op strenge correcties. Gebruik altijd positieve bekrachtiging.",
    "Te lang alleen laten: Shelties zijn aanhankelijk en kunnen scheidingsangst ontwikkelen. Plan gezelschap in."
  ],
  monthlyCosts: {
    food: "€40-€70",
    vet: "€25-€40",
    grooming: "€30-€60",
    insurance: "€20-€35",
    total: "€115-€205",
    note: "Professionele trimming kost €40-€70 per sessie (4-6x per jaar). Investeer in goede borstels en tools voor thuisverzorging (€50-€100 eenmalig). Eerste jaar totaal: €2.000-€3.000."
  }
};

// ===== Flatcoated Retriever =====
export const flatcoatedRetriever: BreedDetails = {
  breedName: "Flat-Coated Retriever",
  breedNameNL: "Flatcoated Retriever",
  faqs: [
    {
      question: "Wat is het verschil tussen een Flatcoated Retriever en een Labrador?",
      answer: "Flatcoats zijn slanker en eleganter dan Labradors, met een lange, glanzende vacht (geen dubbele ondervacht). Ze zijn energieker, blijven langer speels ('Peter Pan' syndroom), en zijn vaak uitbundiger. Labradors zijn robuuster en kalmeren sneller na puppyperiode."
    },
    {
      question: "Zijn Flatcoated Retrievers geschikt voor beginners?",
      answer: "Flatcoats kunnen geschikt zijn voor actieve beginners, maar ze zijn wel uitdagend. Ze blijven jaren energiek en speels ('puppyachtig' tot 4-5 jaar). Ze hebben veel geduld, consistentie en tijd nodig. Een rustige levensstijl past niet bij dit ras."
    },
    {
      question: "Hoeveel beweging heeft een Flatcoated Retriever nodig?",
      answer: "Een Flatcoat heeft minimaal 2 uur beweging per dag nodig. Ze zijn onvermoeibare atleten die graag zwemmen, apporteren, wandelen en rennen. Mentale stimulatie is net zo belangrijk om verveling te voorkomen."
    },
    {
      question: "Zijn Flatcoated Retrievers goed met kinderen?",
      answer: "Ja, Flatcoats zijn uitstekend met kinderen. Ze zijn vriendelijk, speels en geduldig. Hun hoge energie en uitbundigheid kunnen te overweldigend zijn voor hele jonge kinderen – ze kunnen per ongeluk omverduwen. Toezicht is belangrijk."
    },
    {
      question: "Verharen Flatcoated Retrievers?",
      answer: "Ja, Flatcoats verharen matig tot veel. Hun lange vacht laat het hele jaar door haren achter, met extra verharing in het voorjaar en najaar. Wekelijks borstelen (dagelijks tijdens verhaartijd) helpt losse haren te verwijderen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Flatcoated Retrievers?",
      answer: "Flatcoats hebben helaas een hoger risico op kanker (vooral hemangiosaroom en osteosaroom), heupdysplasie, patellaluxatie en hypothyreoïdie. Kanker is de grootste zorg – tot 50% van Flatcoats sterft aan kanker."
    },
    {
      question: "Hoe oud wordt een Flatcoated Retriever?",
      answer: "Een Flatcoat wordt gemiddeld 8 tot 10 jaar oud. Dit is helaas korter dan de meeste retrievers door het hoge kankerrisico. Met goede zorg kunnen sommige 11-12 jaar oud worden."
    },
    {
      question: "Wat kost een Flatcoated Retriever pup in België?",
      answer: "Een Flatcoat pup met stamboom kost tussen €1.200 en €2.000 in België. Kies een fokker die screent op heupdysplasie en andere erfelijke aandoeningen. Dit ras is zeldzamer dan Labradors en Golden Retrievers."
    }
  ],
  funFacts: [
    "Flatcoats worden ook wel de 'Peter Pan' van hondenrassen genoemd omdat ze jarenlang puppyachtig gedrag behouden.",
    "Ze zijn uitstekende zwemmers en werden oorspronkelijk gefokt om waterwild te apporteren, zelfs in ijskoud water.",
    "Flatcoats hebben een unieke 'wigvormige' kop die hen onderscheidt van andere retrievers.",
    "Ze zijn de enige retriever met een volledig zwarte of lever (chocolade) gekleurde vacht zonder aftekening.",
    "Flatcoats hebben een natuurlijke glimlach – hun monddhoeken krullen omhoog, waardoor ze altijd gelukkig lijken.",
    "Ze waren één van de populairste hondenrassen in Engeland in de vroege 20e eeuw, maar werden later overschaduwd door Labradors en Goldens."
  ],
  history: {
    origin: "De Flatcoated Retriever is één van de oudste retrieverrassen en werd in de 19e eeuw ontwikkeld in Engeland. Het ras ontstond uit kruisingen tussen Newfoundland honden (kleine water dogs), Setters, Collies en mogelijk Labradors. Het doel was een veelzijdige jachthond te creëren die zowel op land als in water kon werken en wild kon apporteren zonder schade.",
    development: "In de late 19e eeuw werden Flatcoats extreem populair onder Britse jagers en aristocraten. Ze excelleerden in field trials en waren de favoriete jachthonden op landgoederen. Het ras werd officieel erkend door de Kennel Club in 1873. Tijdens deze periode waren bijna alle Flatcoats zwart; de lever (chocolade) kleur werd pas later geaccepteerd.\n\nTijdens de Eerste en Tweede Wereldoorlog daalde de populariteit van Flatcoats dramatisch, en ze werden bijna overschaduwd door Labradors en Golden Retrievers. Een kleine groep toegewijde fokkers redde het ras van uitsterven. In de jaren '60 en '70 herstelde de populatie langzaam. Tegenwoordig zijn Flatcoats geliefd als jachthonden, gezinshonden en in hondensport, hoewel ze minder algemeen zijn dan andere retrievers."
  },
  similarBreeds: [
    "Labrador Retriever",
    "Golden Retriever",
    "Gordon Setter",
    "Irish Setter"
  ],
  commonMistakes: [
    "Onderschatten van energieniveau: Flatcoats zijn extreem energiek en blijven jarenlang 'puppyachtig'. Ze zijn niet geschikt voor rustige levensstijlen.",
    "Te weinig beweging: Zonder voldoende beweging worden Flatcoats destructief, hyperactief en ongelukkig.",
    "Onvoldoende mentale stimulatie: Ze zijn intelligent en vervelen zich snel. Apporteren, zoekwerk en training zijn essentieel.",
    "Te jong intensief sporten: Bouw beweging langzaam op om gewrichtsproblemen te voorkomen, vooral in het eerste jaar.",
    "Geen kanker-bewustzijn: Flatcoats hebben een hoog kankerrisico. Regelmatige controles en vroege detectie zijn cruciaal.",
    "Te strenge training: Flatcoats zijn gevoelig en reageren het beste op positieve bekrachtiging. Harde correcties schaden hun vertrouwen."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€30-€60",
    grooming: "€20-€40",
    insurance: "€25-€50",
    total: "€135-€250",
    note: "Kosten kunnen aanzienlijk hoger uitvallen door kankerbehandelingen (chemotherapie €1.000-€5.000+). Overweeg een uitgebreide verzekering die kanker dekt. Eerste jaar totaal: €2.500-€3.800."
  }
};

// ===== Anatolische Herder =====
export const anatolischeHerder: BreedDetails = {
  breedName: "Anatolian Shepherd Dog",
  breedNameNL: "Anatolische Herder",
  faqs: [
    {
      question: "Zijn Anatolische Herders geschikt voor beginners?",
      answer: "Nee, Anatolische Herders zijn absoluut niet geschikt voor beginners. Ze zijn enorm (60-80 kg), onafhankelijk, beschermend en koppig. Ze vereisen een zeer ervaren baas die leiderschap toont. Zonder goede training en socialisatie kunnen ze agressief worden."
    },
    {
      question: "Hoeveel beweging heeft een Anatolische Herder nodig?",
      answer: "Een Anatolische Herder heeft 1,5 tot 2 uur beweging per dag nodig, maar ze zijn niet hyperactief. Ze patrouilleren graag en bewaken hun territorium. Lange wandelingen en ruimte om te patrouilleren zijn ideaal. Ze zijn geen honden voor intensieve speeltijd."
    },
    {
      question: "Zijn Anatolische Herders goed met kinderen?",
      answer: "Anatolische Herders kunnen goed met kinderen zijn als ze samen opgroeien. Ze zijn beschermend maar niet altijd speels. Hun enorme formaat en kracht vereisen toezicht. Ze zijn beter geschikt voor gezinnen met oudere kinderen (10+)."
    },
    {
      question: "Zijn Anatolische Herders agressief?",
      answer: "Anatolische Herders zijn niet van nature agressief, maar wel zeer beschermend en territoriaal. Ze zijn gefokt om vee te beschermen tegen roofdieren en zullen bedreigingen confronteren. Met goede socialisatie zijn ze stabiel, maar argwanend tegenover vreemden."
    },
    {
      question: "Kunnen Anatolische Herders met andere honden leven?",
      answer: "Anatolische Herders kunnen met andere honden leven als ze jong gesocialiseerd zijn, maar ze zijn vaak dominant. Ze doen het beter met honden van het andere geslacht. Hun beschermende instinct kan leiden tot agressie naar vreemde honden."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Anatolische Herders?",
      answer: "Anatolische Herders zijn relatief gezond, maar kunnen last hebben van heupdysplasie, elleboogdysplasie, hypothyreoïdie, en entropion (naar binnen gedraaide oogleden). Maagdraaiing is ook een risico bij grote honden."
    },
    {
      question: "Hoe oud wordt een Anatolische Herder?",
      answer: "Een Anatolische Herder wordt gemiddeld 11 tot 13 jaar oud. Dit is een goede levensverwachting voor zo'n grote hond. Met goede zorg kunnen sommige 14-15 jaar oud worden."
    },
    {
      question: "Wat kost een Anatolische Herder pup in België?",
      answer: "Een Anatolische Herder pup met stamboom kost tussen €1.000 en €1.800 in België. Dit ras is zeldzaam buiten Turkije, dus beschikbaarheid kan beperkt zijn. Kies een fokker die screent op heupdysplasie."
    }
  ],
  funFacts: [
    "Anatolische Herders zijn geen echte 'herdershonden' – ze beschermen vee tegen roofdieren zoals wolven en beren in plaats van ze te hoeden.",
    "Ze zijn één van de oudste hondenrassen ter wereld – hun voorouders dateren uit 4000 v.Chr. in Turkije.",
    "Anatolische Herders kunnen tot 80 kg wegen en hebben een bijtkracht van ongeveer 700 PSI – één van de krachtigste van alle hondenrassen!",
    "Ze kunnen temperaturen overleven van -40°C tot +40°C dankzij hun dubbele vacht.",
    "Anatolische Herders patrouilleren 's nachts en slapen overdag – een aangeboren beschermingsgedrag.",
    "Ze worden nog steeds gebruikt in conservatieprogramma's wereldwijd om vee te beschermen tegen grote roofdieren zoals cheetahs en wolven."
  ],
  history: {
    origin: "De Anatolische Herder stamt uit de Anatolische plateau in Turkije, waar ze meer dan 6.000 jaar geleden werden gefokt om vee te beschermen tegen roofdieren zoals wolven, beren en jakhalzen. Het ras is vernoemd naar de regio Anatolië, maar werd oorspronkelijk 'Çoban Köpeği' (herdershond) genoemd in Turkije. Deze honden werkten onafhankelijk en moesten beslissingen nemen zonder menselijke begeleiding.",
    development: "Anatolische Herders werden eeuwenlang gefokt voor functie in plaats van uiterlijk. Nomadische herders in Turkije selecteerden op moed, kracht, intelligentie en het vermogen om in extreme weersomstandigheden te overleven. De honden leefden met de kuddes en beschermden ze 24/7 tegen predatoren.\n\nIn de jaren '70 werden de eerste Anatolische Herders geïmporteerd naar de Verenigde Staten voor gebruik in veehoeder programma's en conservatieprojecten. De American Kennel Club erkende het ras in 1996. Tegenwoordig worden Anatolische Herders wereldwijd ingezet in conservatieprogramma's – bijvoorbeeld in Namibië om cheetahs te weren van veekuddes, waardoor de cheetapopulatie beschermd wordt zonder dat ze gedood worden. Ze blijven populair als bewakingshonden en beschermers van vee."
  },
  similarBreeds: [
    "Kangal (vaak als hetzelfde ras beschouwd)",
    "Kuvasz",
    "Grote Pyreneese Berghond",
    "Maremma Sheepdog",
    "Akbash"
  ],
  commonMistakes: [
    "Onderschatten van kracht en beschermingsinstinct: Anatolische Herders zijn enorm krachtig en nemen hun beschermingsrol serieus. Dit is niet geschikt voor onervaren eigenaren.",
    "Onvoldoende socialisatie: Zonder brede, vroege socialisatie kunnen ze overdreven territoriaal en agressief worden.",
    "Te weinig ruimte: Ze hebben veel ruimte nodig om te patrouilleren. Een klein appartement is absoluut niet geschikt.",
    "Verwachten dat ze speels zijn: Anatolische Herders zijn rustig en serieus. Ze zijn geen fetch-spelers zoals Labradors.",
    "Te lang alleen met vreemden laten: Hun beschermingsinstinct kan gevaarlijk zijn. Introduceer vreemden altijd zorgvuldig.",
    "Geen sterke omheining: Ze zijn territoriaal en kunnen agressief zijn naar vreemde honden of mensen. Een hoge, stevige omheining is essentieel."
  ],
  monthlyCosts: {
    food: "€90-€150",
    vet: "€35-€60",
    grooming: "€20-€40",
    insurance: "€30-€50",
    total: "€175-€300",
    note: "Hun enorme formaat betekent hoge voedingskosten. Maagdraaiing kan een noodoperatie vereisen (€1.000-€3.000). Overweeg professionele training (€100-€200/maand). Eerste jaar totaal: €3.500-€5.000."
  }
};

// ===== Chow Chow =====
export const chowChow: BreedDetails = {
  breedName: "Chow Chow",
  breedNameNL: "Chow Chow",
  faqs: [
    {
      question: "Waarom hebben Chow Chows een blauwe tong?",
      answer: "De blauwe-zwarte tong van de Chow Chow is een uniek kenmerk veroorzaakt door extra pigmentatie. Legenden beweren dat de Chow de lucht lekte toen het werd gecreëerd. Wetenschappelijk is het gewoon een genetische eigenschap die het ras onderscheidt."
    },
    {
      question: "Zijn Chow Chows geschikt voor beginners?",
      answer: "Nee, Chow Chows zijn niet aanbevolen voor beginners. Ze zijn eigenzinnig, dominant en terughoudend. Ze vereisen een ervaren baas die consequent en zelfverzekerd is. Zonder goede training en socialisatie kunnen ze agressief worden."
    },
    {
      question: "Hoeveel beweging heeft een Chow Chow nodig?",
      answer: "Chow Chows hebben matig beweging nodig: 45 minuten tot 1 uur per dag. Ze zijn niet hyperactief en genieten van korte wandelingen. Vermijd overmatige inspanning bij warm weer vanwege hun dikke vacht."
    },
    {
      question: "Zijn Chow Chows goed met kinderen?",
      answer: "Chow Chows kunnen goed met kinderen zijn als ze samen opgroeien, maar ze zijn niet de meest geduld ige gezinshonden. Ze tolereren geen ruw spel en kunnen defensief worden. Ze zijn beter geschikt voor gezinnen met oudere, rustige kinderen."
    },
    {
      question: "Zijn Chow Chows agressief?",
      answer: "Chow Chows zijn niet van nature agressief, maar wel zeer beschermend en territoriaal. Ze zijn terughoudend tegenover vreemden en kunnen agressief reageren als ze zich bedreigd voelen. Goede socialisatie en training zijn essentieel."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Chow Chows?",
      answer: "Chow Chows zijn gevoelig voor heupdysplasie, elleboogdysplasie, entropion (naar binnen gedraaide oogleden), huidproblemen in rimpels, en oververhitting. Hun dikke vacht maakt ze gevoelig voor hitte."
    },
    {
      question: "Hoe oud wordt een Chow Chow?",
      answer: "Een Chow Chow wordt gemiddeld 9 tot 12 jaar oud. Met goede zorg en vermijding van oververhitting kunnen sommige 13-14 jaar oud worden."
    },
    {
      question: "Wat kost een Chow Chow pup in België?",
      answer: "Een Chow Chow pup met stamboom kost tussen €1.500 en €2.500 in België. Kies een fokker die screent op heupdysplasie, elleboogdysplasie en entropion."
    }
  ],
  funFacts: [
    "Chow Chows zijn één van de oudste hondenrassen ter wereld – DNA-onderzoek toont aan dat ze meer dan 2.000 jaar oud zijn.",
    "Ze hebben een unieke blauwe-zwarte tong – het enige andere hondenras met deze eigenschap is de Chinese Shar-Pei.",
    "Chow Chows hebben rechte achterpoten in plaats van gebogen, waardoor ze een stijve, stijlvolle loopstijl hebben.",
    "Ze werden oorspronkelijk gefokt in China als bewakingshonden, jachthonden en helaas ook voor vlees en bont.",
    "Queen Victoria had een Chow Chow, wat het ras populair maakte in Engeland in de late 19e eeuw.",
    "Sigmund Freud had een Chow Chow genaamd Jofi die aanwezig was bij therapiesessies – Freud geloofde dat de hond patiënten hielp ontspannen."
  ],
  history: {
    origin: "De Chow Chow is één van de oudste hondenrassen ter wereld en stamt uit Noord-China, waar ze meer dan 2.000 jaar geleden werden gefokt. DNA-onderzoek toont aan dat ze nauw verwant zijn aan wolven en behoren tot de meest 'primitieve' hondenrassen. Chow Chows werden gebruikt voor verschillende doeleinden: bewakingshonden in tempels en paleizen, jachthonden voor fazanten en gevechtshonden.",
    development: "Tragisch genoeg werden Chow Chows ook gefokt voor hun vlees en bont in sommige delen van China (een praktijk die nu verboden is). De naam 'Chow Chow' komt mogelijk van het Pidgin-Engelse woord voor 'gemengde goederen' dat werd gebruikt op handelschepen in de 18e eeuw.\n\nIn de late 19e eeuw werden Chow Chows geïmporteerd naar Engeland door handelaren. Queen Victoria kreeg een Chow Chow cadeau, wat het ras populair maakte onder de Britse aristocratie. De Kennel Club erkende het ras in 1894, en de American Kennel Club volgde in 1903. Tegenwoordig zijn Chow Chows populair als bewakingshonden en gezelschapshonden, hoewel ze relatief zeldzaam zijn vanwege hun uitdagende temperament."
  },
  similarBreeds: [
    "Akita",
    "Shar-Pei",
    "Eurasier",
    "Samojeed (in uiterlijk, niet temperament)"
  ],
  commonMistakes: [
    "Onvoldoende socialisatie: Chow Chows zijn van nature terughoudend. Zonder vroege, brede socialisatie kunnen ze agressief of angstig worden.",
    "Te weinig training: Ze zijn koppig en dominant. Consequente training vanaf jonge leeftijd is essentieel.",
    "Verwaarlozen van vachtverzorging: Hun dikke vacht moet minimaal 3x per week geborsteld worden om klitten te voorkomen.",
    "Te veel warmte: Chow Chows zijn extreem gevoelig voor oververhitting. Wandel alleen tijdens koele momenten en zorg voor airconditioning.",
    "Onvoldoende oogcontroles: Entropion (naar binnen gedraaide oogleden) is veel voorkomend en vereist vaak chirurgie (€500-€1.500 per oog).",
    "Te veel vreemde honden: Chow Chows zijn vaak agressief naar vreemde honden. Houd ze aan de lijn en socialiseer voorzichtig."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€30-€60",
    grooming: "€50-€100",
    insurance: "€30-€50",
    total: "€170-€300",
    note: "Professionele trimming kost €60-€100 per sessie (4-6x per jaar). Entropion correctie kan €500-€1.500 per oog kosten. Overweeg een uitgebreide verzekering. Eerste jaar totaal: €3.000-€4.500."
  }
};

// ===== Duitse Dog =====
export const duitseDog: BreedDetails = {
  breedName: "Great Dane",
  breedNameNL: "Duitse Dog",
  faqs: [
    {
      question: "Hoe groot wordt een Duitse Dog?",
      answer: "Duitse Doggen behoren tot de grootste hondenrassen ter wereld. Reuen worden 76-86 cm hoog en wegen 54-90 kg, teven 71-81 cm en 45-59 kg. De hoogste hond ooit was een Duitse Dog genaamd Zeus met 111,8 cm schofthoogte!"
    },
    {
      question: "Zijn Duitse Doggen geschikt voor appartementen?",
      answer: "Duitse Doggen kunnen in appartementen wonen, maar het is niet ideaal. Ze hebben veel ruimte nodig om zich te bewegen en liggen graag uitgestrekt. Een huis met tuin is beter. Hun grootte betekent ook meer hondenhaar en speeksel."
    },
    {
      question: "Hoeveel beweging heeft een Duitse Dog nodig?",
      answer: "Volwassen Duitse Doggen hebben 1 tot 1,5 uur beweging per dag nodig. Ze zijn minder energiek dan je zou verwachten en genieten van rustige wandelingen. Jonge Doggen moeten voorzichtig opgebouwd worden om gewrichtsproblemen te voorkomen."
    },
    {
      question: "Zijn Duitse Doggen goed met kinderen?",
      answer: "Ja, Duitse Doggen zijn zachte reuzen en uitstekend met kinderen. Ze zijn geduldig, vriendelijk en beschermend. Hun grote formaat vereist wel toezicht – ze kunnen per ongeluk kleine kinderen omverduwen. Leer kinderen respectvol omgaan."
    },
    {
      question: "Kwijlen Duitse Doggen veel?",
      answer: "Ja, Duitse Doggen kwijlen flink, vooral na eten, drinken of wanneer ze opgewonden zijn. Dit is normaal voor het ras vanwege hun losse lippen. Houd handdoeken bij de hand en reinig hun bek regelmatig."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Duitse Doggen?",
      answer: "Duitse Doggen zijn gevoelig voor maagdraaiing (levensbedreigende noodsituatie), hartziekten (gedilateerde cardiomyopathie), heupdysplasie, botkanker (osteosaroom), en hypo thyreoïdie. Hun korte levensduur is de grootste zorg."
    },
    {
      question: "Hoe oud wordt een Duitse Dog?",
      answer: "Duitse Doggen hebben helaas een korte levensverwachting: gemiddeld 7 tot 10 jaar. Dit is typisch voor reuzenrassen. Met uitstekende zorg kunnen sommige 11-12 jaar oud worden, maar dit is zeldzaam."
    },
    {
      question: "Wat kost een Duitse Dog pup in België?",
      answer: "Een Duitse Dog pup met stamboom kost tussen €1.500 en €2.500 in België. Kies een fokker die screent op hartziekten, heupdysplasie en andere erfelijke aandoeningen. Blauwe en Harlekin kleuren zijn vaak duurder."
    }
  ],
  funFacts: [
    "De hoogste hond ooit gemeten was Zeus, een Duitse Dog uit Michigan, die 111,8 cm hoog was (2012).",
    "Duitse Doggen zijn helemaal niet Duits – ze stammen uit Duitsland maar worden daar 'Deutsche Dogge' genoemd. In het Engels heten ze 'Great Dane' (Grote Deen).",
    "Scooby-Doo, de beroemde cartoon hond, is een Duitse Dog!",
    "Duitse Doggen werden oorspronkelijk gefokt om wilde zwijnen en herten te jagen – hun grootte was functioneel, niet decoratief.",
    "Ze hebben één van de grootste harten van alle hondenrassen (letterlijk) – maar dit maakt ze ook gevoelig voor hartziekten.",
    "Duitse Doggen denken vaak dat ze schoothondjes zijn – ondanks hun enorme formaat willen ze graag op de bank bij je zitten!"
  ],
  history: {
    origin: "De Duitse Dog stamt uit Duitsland, waar ze in de Middeleeuwen werden gefokt om wild zwijn en herten te jagen. De voorouders van de Duitse Dog waren kruisingen tussen Engelse Mastiffs en Ierse Wolfshonden, wat resulteerde in een groot, krachtig en snel ras. Deze honden werden gebruikt door Duitse adel voor de jacht op gevaarlijke dieren zoals wilde zwijnen, die zonder grote, moedige honden levensgevaarlijk waren.",
    development: "In de 16e en 17e eeuw werden Duitse Doggen ook gebruikt als bewakingshonden op landgoederen. In de 19e eeuw verschoof de fokkerij van functie naar esthetiek: fokkers selecteerden op elegante lijnen, rustig temperament en gestandaardiseerde kleuren. In 1880 werd de rasstandaard vastgesteld in Berlijn, en de naam 'Deutsche Dogge' werd officieel.\n\nIn het Engels werd het ras 'Great Dane' genoemd, ondanks geen directe link met Denemarken – mogelijk vanwege een Frans natuurwetenschapper die de hond 'Grand Danois' noemde. De American Kennel Club erkende het ras in 1887. Tegenwoordig zijn Duitse Doggen populair als gezinshonden en showdieren, geliefd om hun imposante uitstraling en zachte karakter. Helaas blijft hun korte levensduur een groot nadeel."
  },
  similarBreeds: [
    "Ierse Wolfshond",
    "Mastiff",
    "Leonberger",
    "Deense Broholmer"
  ],
  commonMistakes: [
    "Te jong intensief bewegen: Duitse Dog pups groeien extreem snel. Overmatige beweging voor 18 maanden kan ernstige gewrichtsproblemen veroorzaken.",
    "Verkeerd voeren: Reuzenrassen hebben speciaal voer nodig voor langzame groei. Overvoeren of verkeerd voer kan botproblemen veroorzaken.",
    "Geen maagdraaiing-preventie: Grote honden zijn gevoelig voor maagdraaiing (levensbedreigende noodsituatie). Voer kleinere porties, vermijd beweging na eten.",
    "Onvoldoende ruimte: Duitse Doggen hebben veel ruimte nodig om comfortabel te liggen en bewegen. Een klein appartement is niet ideaal.",
    "Geen hartscreening: Hartziekten zijn veelvoorkomend. Regelmatige echo's kunnen vroege detectie mogelijk maken.",
    "Te weinig socialisatie: Hun grote formaat kan intimiderend zijn. Socialiseer vroeg zodat ze zelfverzekerd en vriendelijk blijven."
  ],
  monthlyCosts: {
    food: "€100-€180",
    vet: "€40-€80",
    grooming: "€15-€30",
    insurance: "€35-€70",
    total: "€190-€360",
    note: "Enorme voedingskosten door hun grootte. Maagdraaiing kan een noodoperatie vereisen (€2.000-€5.000). Hartziekten vereisen levenslange medicatie (€50-€150/maand). Overweeg een uitgebreide verzekering. Eerste jaar totaal: €4.000-€6.500."
  }
};

// ===== Boxer =====
export const boxer: BreedDetails = {
  breedName: "Boxer",
  breedNameNL: "Boxer",
  faqs: [
    {
      question: "Zijn Boxers geschikt voor beginners?",
      answer: "Boxers kunnen geschikt zijn voor actieve beginners, maar ze zijn wel energiek en koppig. Ze hebben consequente training en veel beweging nodig. Hun speelsheid en kracht kunnen overweldigend zijn zonder ervaring. Een actieve levensstijl is essentieel."
    },
    {
      question: "Hoeveel beweging heeft een Boxer nodig?",
      answer: "Een Boxer heeft minimaal 1,5 tot 2 uur beweging per dag nodig. Ze zijn zeer energiek en houden van rennen, spelen en sporten. Zonder voldoende beweging worden ze hyperactief, destructief en ongelukkig."
    },
    {
      question: "Zijn Boxers goed met kinderen?",
      answer: "Ja, Boxers zijn uitstekend met kinderen. Ze zijn speels, beschermend en geduldig. Hun hoge energie en uitbundigheid kunnen te overweldigend zijn voor hele jonge kinderen – ze kunnen per ongeluk omverduwen. Toezicht is belangrijk."
    },
    {
      question: "Kwijlen Boxers?",
      answer: "Ja, Boxers kwijlen matig tot veel, vooral na eten, drinken of wanneer ze opgewonden zijn. Dit komt door hun korte snuit en losse lippen. Houd handdoeken bij de hand."
    },
    {
      question: "Zijn Boxers gemakkelijk te trainen?",
      answer: "Boxers zijn intelligent maar kunnen koppig zijn. Ze reageren goed op positieve bekrachtiging met speeltjes en lof. Ze vervelen zich snel bij repetitieve training. Houd trainingsessies kort, gevarieerd en leuk."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Boxers?",
      answer: "Boxers zijn gevoelig voor kanker (vooral mast cell tumoren, lymfoom), hartziekten (Boxer cardiomyopathie), heupdysplasie, en brachycefaal syndroom (ademhalingsproblemen). Regelmatige controles zijn essentieel."
    },
    {
      question: "Hoe oud wordt een Boxer?",
      answer: "Een Boxer wordt gemiddeld 10 tot 12 jaar oud. Met goede zorg kunnen sommige 13-14 jaar oud worden. Kanker is helaas een belangrijke oorzaak van vroegtijdig overlijden."
    },
    {
      question: "Wat kost een Boxer pup in België?",
      answer: "Een Boxer pup met stamboom kost tussen €1.200 en €2.000 in België. Kies een fokker die screent op hartziekten (Boxer cardiomyopathie), heupdysplasie en andere erfelijke aandoeningen."
    }
  ],
  funFacts: [
    "Boxers zijn beroemd om hun 'Boxer wiggle' – ze kwispelen zo enthousiast dat hun hele achterlijf meeschud!",
    "Ze heten 'Boxer' vanwege hun speelstijl: ze gebruiken hun voorpoten als een bokser die slaat.",
    "Boxers hebben een ongelooflijk expressief gezicht en worden vaak de 'clowns van de hondenwereld' genoemd.",
    "Ze hebben een langere puppyperiode dan de meeste rassen – Boxers blijven vaak speels tot 3-4 jaar oud.",
    "Humphrey Bogart, Sylvester Stallone en Justin Timberlake hadden allemaal Boxers.",
    "Boxers waren één van de eerste rassen die werd ingezet als politiehond in Duitsland in de vroege 20e eeuw."
  ],
  history: {
    origin: "De Boxer stamt uit Duitsland en werd in de late 19e eeuw ontwikkeld. Het ras ontstond uit kruisingen tussen de Bullenbeisser (een uitgestorven Duitse jachthond) en Engelse Bulldogs. De Bullenbeisser werd gebruikt om groot wild zoals beren, wilde zwijnen en herten vast te houden tot de jager arriveerde. Toen de jacht afnam, veranderde de focus naar het creëren van een veelzijdige werkhond.",
    development: "In 1895 werd de eerste Boxer-club opgericht in München, en de rasstandaard werd vastgesteld. De naam 'Boxer' komt mogelijk van hun speelstijl (gebruiken van voorpoten als een bokser) of van het Duitse woord 'Boxl', een bijnaam voor de Bullenbeisser.\n\nTijdens de Eerste en Tweede Wereldoorlog werden Boxers ingezet door het Duitse leger als boodschappenhonden, bewakingshonden en zelfs als pakdragers. Na de Tweede Wereldoorlog namen soldaten Boxers mee naar huis, wat het ras populair maakte in de Verenigde Staten en elders. In de jaren '50 en '60 waren Boxers één van de populairste rassen in Amerika. Tegenwoordig zijn ze geliefd als gezinshonden, therapiehonden, en in sommige landen nog steeds als politiehonden."
  },
  similarBreeds: [
    "Bullmastiff",
    "Amerikaanse Staffordshire Terrier",
    "Rhodesian Ridgeback",
    "Cane Corso"
  ],
  commonMistakes: [
    "Te weinig beweging: Boxers zijn extreem energiek. Zonder voldoende beweging worden ze hyperactief en destructief.",
    "Onvoldoende mentale stimulatie: Ze zijn intelligent en vervelen zich snel. Variatie in training en spel is essentieel.",
    "Te lang alleen laten: Boxers zijn zeer sociaal en kunnen scheidingsangst ontwikkelen. Ze willen altijd bij hun gezin zijn.",
    "Te strenge training: Boxers zijn gevoelig en reageren het beste op positieve bekrachtiging. Harde correcties schaden hun vertrouwen.",
    "Geen kanker-bewustzijn: Boxers hebben een hoog risico op verschillende vormen van kanker. Regelmatige controles en vroege detectie zijn cruciaal.",
    "Oververhitting: Hun korte snuit maakt ze gevoelig voor hitte. Wandel alleen tijdens koele momenten en zorg voor schaduw en water."
  ],
  monthlyCosts: {
    food: "€60-€100",
    vet: "€30-€70",
    grooming: "€10-€20",
    insurance: "€25-€50",
    total: "€125-€240",
    note: "Kosten kunnen aanzienlijk hoger uitvallen door kankerbehandelingen (chemotherapie €1.000-€5.000+) en hartproblemen (medicatie €50-€150/maand). Overweeg een uitgebreide verzekering. Eerste jaar totaal: €2.500-€3.800."
  }
};

// ===== Yorkshire Terrier =====
export const yorkshireTerrier: BreedDetails = {
  breedName: "Yorkshire Terrier",
  breedNameNL: "Yorkshire Terrier",
  faqs: [
    {
      question: "Hoe groot wordt een Yorkshire Terrier?",
      answer: "Yorkshire Terriers zijn één van de kleinste hondenrassen. Ze wegen 2-3,5 kg en worden 18-20 cm hoog. 'Teacup' Yorkies (onder 2 kg) zijn niet gezond en worden ontraden – ze hebben vaak ernstige gezondheidsproblemen."
    },
    {
      question: "Zijn Yorkshire Terriers geschikt voor gezinnen met kinderen?",
      answer: "Yorkshire Terriers zijn beter geschikt voor gezinnen met oudere kinderen (8+). Ze zijn kwetsbaar en kunnen angstig of defensief worden bij ruw spel. Jonge kinderen kunnen de kleine hond per ongeluk pijn doen. Toezicht is essentieel."
    },
    {
      question: "Verharen Yorkshire Terriers?",
      answer: "Nee, Yorkshire Terriers verharen nauwelijks en worden vaak beschouwd als hypoallergeen. Hun vacht lijkt meer op mensenhaar en groeit continu. Ze hebben regelmatige trimming (elke 6-8 weken) en dagelijks borstelen nodig."
    },
    {
      question: "Hoeveel beweging heeft een Yorkshire Terrier nodig?",
      answer: "Yorkshire Terriers hebben relatief weinig beweging nodig: 30-45 minuten per dag verdeeld over 2-3 korte wandelingen. Ze zijn energiek voor hun formaat, maar vermoeien snel. Binnenspel is ook waardevol."
    },
    {
      question: "Blaffen Yorkshire Terriers veel?",
      answer: "Ja, Yorkshire Terriers hebben een sterke neiging tot blaffen. Ze zijn waakzame kleine honden met een grote persoonlijkheid. Zonder training kunnen ze problematische blaffers worden. Vroege training om 'stil' te leren is essentieel."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Yorkshire Terriers?",
      answer: "Yorkshire Terriers zijn gevoelig voor patellaluxatie (knieschijf), tandproblemen, trachea-collaps (luchtpijp), hypoglykemie, leverafwijkingen (portosystemische shunt), en Legg-Calvé-Perthes (heupziekte). Regelmatige controles zijn belangrijk."
    },
    {
      question: "Hoe oud wordt een Yorkshire Terrier?",
      answer: "Yorkshire Terriers hebben een lange levensverwachting: gemiddeld 13 tot 16 jaar. Met goede zorg kunnen sommige 17-20 jaar oud worden. Dit is uitstekend voor een kleine hond."
    },
    {
      question: "Wat kost een Yorkshire Terrier pup in België?",
      answer: "Een Yorkshire Terrier pup met stamboom kost tussen €1.000 en €2.000 in België. Vermijd 'teacup' Yorkies (extreem kleine varianten) – ze hebben vaak ernstige gezondheidsproblemen."
    }
  ],
  funFacts: [
    "Yorkshire Terriers werden oorspronkelijk gefokt om ratten te vangen in Engelse mijnen en textielfabrieken in de 19e eeuw.",
    "Ondanks hun kleine formaat denken Yorkies vaak dat ze veel groter zijn – ze schrikken niet terug voor grote honden!",
    "Smoky, een beroemde Yorkshire Terrier, was een oorlogsheld in de Tweede Wereldoorlog en ontving meerdere onderscheidingen.",
    "Hun vacht groeit continu en kan tot op de grond groeien als het niet wordt geknipt – showhonden hebben vachten die 20+ cm lang zijn!",
    "Audrey Hepburn was dol op haar Yorkie genaamd 'Mr. Famous' en nam hem overal mee naartoe.",
    "Yorkies hebben blauw-goud gekleurde vacht bij volwassenheid, maar worden geboren zwart met tan aftekening."
  ],
  history: {
    origin: "De Yorkshire Terrier werd in de 19e eeuw ontwikkeld in Yorkshire, Engeland, tijdens de Industriële Revolutie. Schotse arbeiders die naar Yorkshire kwamen om in textielfabrieken en kolenmijnen te werken, brachten kleine terriërs mee. Deze honden werden gekruist met lokale terriërs om een kleine, moedige hond te creëren die ratten en muizen in mijnen en fabrieken kon vangen.",
    development: "De exacte kruisingen zijn onbekend, maar waarschijnlijk werden Skye Terriers, Maltezers en misschien Manchester Terriers gebruikt. Het resultaat was een kleine hond met een lange, zijdeachtige vacht en een moedig karakter. In de jaren 1860 begon het ras op te vallen op hondenshows, waar hun elegante uiterlijk populair werd bij de Victoriaanse upper class.\n\nDe rasstandaard werd vastgesteld in de late 19e eeuw, en de Kennel Club erkende het ras in 1886. Yorkies transformeerden van werkhonden naar gezelschapshonden en werden favorieten onder aristocraten en later beroemdheden. Tijdens de Tweede Wereldoorlog werd de beroemde Yorkie 'Smoky' een oorlogsheld. Tegenwoordig zijn Yorkies één van de populairste speelhondrassen ter wereld en worden gezien als statussymbolen onder stedelijke bewoners."
  ],
  similarBreeds: [
    "Silky Terrier",
    "Maltese",
    "Biewer Terrier",
    "Papillon"
  ],
  commonMistakes: [
    "Verwaarlozen van tandzorg: Yorkies hebben kleine bekken en zijn zeer gevoelig voor tandproblemen. Poets dagelijks en plan regelmatige controles.",
    "Onvoldoende socialisatie: Zonder socialisatie kunnen Yorkies angstig of agressief worden. Stel ze vroeg bloot aan verschillende mensen en honden.",
    "Overmatig verwennen: Behandel een Yorkie als een hond, niet als een baby. 'Klein hondje syndroom' kan leiden tot gedragsproblemen.",
    "Te koud houden: Yorkies hebben weinig lichaamsvet en zijn gevoelig voor kou. In koude maanden hebben ze een jasje nodig.",
    "Verkeerd oppakken: Ondersteun altijd hun volledige lichaam, vooral de achterpoten. Til ze niet op aan de voorpoten.",
    "Teacup Yorkies kopen: Extreem kleine Yorkies (onder 2 kg) hebben ernstige gezondheidsproblemen. Vermijd onethische fokkers."
  ],
  monthlyCosts: {
    food: "€20-€40",
    vet: "€20-€40",
    grooming: "€30-€60",
    insurance: "€15-€30",
    total: "€85-€170",
    note: "Professionele trimming kost €30-€60 per sessie (elke 6-8 weken). Tandverzorging kan extra kosten met zich meebrengen (€150-€300/jaar voor professionele reiniging). Trachea-collaps kan chirurgie vereisen (€1.000-€2.500)."
  }
};

// ===== Bordeauxdog =====
export const bordeauxdog: BreedDetails = {
  breedName: "Dogue de Bordeaux",
  breedNameNL: "Bordeauxdog",
  faqs: [
    {
      question: "Zijn Bordeauxdogs geschikt voor beginners?",
      answer: "Nee, Bordeauxdogs zijn niet aanbevolen voor beginners. Ze zijn enorm (45-68 kg), koppig en krachtig. Ze hebben een ervaren baas nodig die consequent en zelfverzekerd is. Zonder goede training kunnen ze dominant worden."
    },
    {
      question: "Hoeveel beweging heeft een Bordeauxdog nodig?",
      answer: "Bordeauxdogs hebben matig beweging nodig: 1 tot 1,5 uur per dag. Ze zijn niet hyperactief en genieten van rustige wandelingen. Vermijd overmatige inspanning, vooral bij warm weer, vanwege hun korte snuit."
    },
    {
      question: "Zijn Bordeauxdogs goed met kinderen?",
      answer: "Ja, Bordeauxdogs kunnen uitstekend met kinderen zijn als ze goed gesocialiseerd zijn. Ze zijn geduldig en beschermend, maar hun enorme formaat en kracht vereisen toezicht, vooral met jonge kinderen. Ze kunnen per ongeluk omverduwen."
    },
    {
      question: "Kwijlen Bordeauxdogs?",
      answer: "Ja, Bordeauxdogs kwijlen enorm veel vanwege hun losse lippen en jowls. Verwacht veel kwijl, vooral na eten, drinken of wanneer ze opgewonden zijn. Houd handdoeken bij de hand!"
    },
    {
      question: "Snurken Bordeauxdogs?",
      answer: "Ja, de meeste Bordeauxdogs snurken flink door hun korte snuit en brachycefale structuur. Dit is normaal voor het ras, maar kan wijzen op ademhalingsproblemen als het extreem is."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Bordeauxdogs?",
      answer: "Bordeauxdogs zijn gevoelig voor heupdysplasie, elleboogdysplasie, hartziekten, huidproblemen, ademhalingsproblemen (brachycefaal syndroom), en kanker. Hun levensverwachting is helaas kort."
    },
    {
      question: "Hoe oud wordt een Bordeauxdog?",
      answer: "Bordeauxdogs hebben helaas één van de kortste levensverwachtingen van alle rassen: gemiddeld 5 tot 8 jaar. Met uitstekende zorg kunnen sommige 9-11 jaar oud worden, maar dit is zeldzaam."
    },
    {
      question: "Wat kost een Bordeauxdog pup in België?",
      answer: "Een Bordeauxdog pup met stamboom kost tussen €1.500 en €2.500 in België. Kies een fokker die screent op heupdysplasie, elleboogdysplasie en hartziekten."
    }
  ],
  funFacts: [
    "De Bordeauxdog werd wereldberoemd door de film 'Turner & Hooch' (1989) met Tom Hanks, wat leidde tot een enorme toename in populariteit.",
    "Ze behoren tot de oudste Franse hondenrassen en werden gebruikt voor jacht op groot wild, bewaking en zelfs stierengevechten in de Middeleeuwen.",
    "Bordeauxdogs hebben één van de grootste koppen ten opzichte van hun lichaam van alle hondenrassen.",
    "Ze hebben een bijtkracht van ongeveer 556 PSI – één van de krachtigste van alle honden!",
    "Tijdens de Franse Revolutie raakte het ras bijna uitgestorven omdat ze werden geassocieerd met de aristocratie.",
    "Hun roodbruine kleur is hun meest kenmerkende eigenschap – ze komen alleen in verschillende tinten rood voor."
  ],
  history: {
    origin: "De Bordeauxdog, ook wel Dogue de Bordeaux genoemd, is één van de oudste Franse hondenrassen en stamt uit de regio Aquitaine in Zuid-Frankrijk. Het ras dateert uit de Middeleeuwen, waar ze werden gebruikt voor verschillende doeleinden: jacht op groot wild zoals beren en wilde zwijnen, bewaking van eigendommen, en helaas ook voor bloedsporten zoals stierengevechten en hondengevechten.",
    development: "In de 14e eeuw waren Bordeauxdogs populair onder de Franse aristocratie als bewakingshonden op landgoederen. Tijdens de Franse Revolutie (1789) raakte het ras bijna uitgestorven omdat ze werden gezien als symbolen van de aristocratie. Slechts enkele honden overleefden in afgelegen landelijke gebieden.\n\nIn de 19e eeuw werd het ras hersteld en gestandaardiseerd. In 1863 verscheen de eerste Bordeauxdog op een hondenshow in Parijs. De rasstandaard werd vastgesteld in 1926. Het ras bleef relatief onbekend buiten Frankrijk tot de film 'Turner & Hooch' (1989) het internationaal populair maakte. Tegenwoordig zijn Bordeauxdogs geliefd als gezinshonden en bewakingshonden, hoewel hun korte levensverwachting en gezondheidsproblemen zorgen blijven."
  },
  similarBreeds: [
    "Mastiff",
    "Bullmastiff",
    "Cane Corso",
    "Tosa Inu"
  ],
  commonMistakes: [
    "Onderschatten van kracht: Bordeauxdogs zijn extreem krachtig. Zonder training kunnen ze onhandelbaar zijn aan de lijn.",
    "Te weinig socialisatie: Ze zijn beschermend en kunnen territoriaal zijn. Socialiseer vroeg en breed om agressie te voorkomen.",
    "Overvoeren: Bordeauxdogs zijn gevoelig voor obesitas, wat gewrichts- en hartproblemen verergert. Volg voedingsrichtlijnen strikt.",
    "Te veel beweging bij warm weer: Hun korte snuit maakt ze zeer gevoelig voor oververhitting. Wandel alleen tijdens koele momenten.",
    "Rimpels verwaarlozen: Hun gezichtsrimpels moeten regelmatig gereinigd worden om infecties te voorkomen.",
    "Geen maagdraaiing-preventie: Grote honden zijn gevoelig voor maagdraaiing (levensbedreigende noodsituatie). Voer kleinere porties, vermijd beweging na eten."
  ],
  monthlyCosts: {
    food: "€80-€130",
    vet: "€40-€80",
    grooming: "€15-€30",
    insurance: "€35-€70",
    total: "€170-€310",
    note: "Hun korte levensverwachting betekent vaak aanzienlijke dierenarts kosten in latere jaren. Overweeg een uitgebreide verzekering die erfelijke aandoeningen dekt. Eerste jaar totaal: €3.500-€5.000."
  }
};

// ===== Nova Scotia Duck Tolling Retriever (Toller) =====
export const novaScotiaDuckTollingRetriever: BreedDetails = {
  breedName: "Nova Scotia Duck Tolling Retriever",
  breedNameNL: "Nova Scotia Duck Tolling Retriever (Toller)",
  faqs: [
    {
      question: "Wat is 'tolling' bij een Toller?",
      answer: "Tolling is een unieke jachttechniek waarbij de hond speels langs de waterkant rent en speelt, wat eenden nieuwsgierig maakt en dichterbij lokt ('tolled'). Wanneer de jager schiet, apporteert de Toller de eenden uit het water. Deze techniek is uniek voor dit ras."
    },
    {
      question: "Zijn Tollers geschikt voor beginners?",
      answer: "Tollers kunnen geschikt zijn voor actieve beginners, maar ze zijn wel uitdagend. Ze zijn zeer energiek, intelligent en hebben veel mentale en fysieke stimulatie nodig. Zonder voldoende uitlaatklep kunnen ze destructief worden."
    },
    {
      question: "Hoeveel beweging heeft een Toller nodig?",
      answer: "Een Toller heeft minimaal 1,5 tot 2 uur intensieve beweging per dag nodig. Ze zijn onvermoeibare atleten die graag zwemmen, apporteren, wandelen en rennen. Mentale stimulatie is net zo belangrijk om verveling te voorkomen."
    },
    {
      question: "Zijn Tollers goed met kinderen?",
      answer: "Ja, Tollers zijn goed met kinderen als ze goed gesocialiseerd zijn. Ze zijn speels en energiek, maar kunnen te enthousiast zijn voor hele jonge kinderen. Hun hoge energie vereist toezicht. Ze zijn beter geschikt voor gezinnen met actieve kinderen."
    },
    {
      question: "Wat is het 'Toller Scream'?",
      answer: "Het 'Toller Scream' is een uniek, doordringend geluid dat Tollers maken wanneer ze opgewonden zijn. Het klinkt als een mengeling van een schreeuw en gehuil. Dit is normaal gedrag maar kan verrassend zijn voor nieuwe eigenaren!"
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Tollers?",
      answer: "Tollers zijn gevoelig voor heupdysplasie, progressieve retina-atrofie (PRA), Addison's ziekte (bijnierinsufficiëntie), auto-immuunziekten, en epilepsie. Kies een fokker die screent op erfelijke aandoeningen."
    },
    {
      question: "Hoe oud wordt een Toller?",
      answer: "Een Toller wordt gemiddeld 12 tot 14 jaar oud. Met goede zorg kunnen sommige 15-16 jaar oud worden. Dit is een goede levensverwachting voor een middelgrote hond."
    },
    {
      question: "Wat kost een Toller pup in België?",
      answer: "Een Toller pup met stamboom kost tussen €1.200 en €2.000 in België. Dit ras is zeldzaam, dus beschikbaarheid kan beperkt zijn en wachtlijsten zijn vaak lang. Kies een fokker die screent op PRA, heupdysplasie en Addison's."
    }
  ],
  funFacts: [
    "Tollers zijn de kleinste van alle retrieverrassen, maar hebben net zoveel energie en uithoudingsvermogen als grotere retrievers.",
    "De 'tolling' techniek (speels langs water rennen om eenden te lokken) werd geïnspireerd door vossen, die hetzelfde gedrag vertonen.",
    "Tollers zijn de officiële hond van Nova Scotia, Canada, en verschijnen op Canadese postzegels.",
    "Hun roodorange vacht en witte aftekening maken ze één van de meest kleurrijke retrieverrassen.",
    "Tollers hebben een uniek 'scream' dat ze maken wanneer ze opgewonden zijn – het klinkt als niets anders in de hondenwereld!",
    "Ze zijn uitstekende zwemmers met waterafstotende vachten en zwemmen graag zelfs in koud water."
  ],
  history: {
    origin: "De Nova Scotia Duck Tolling Retriever (vaak 'Toller' genoemd) stamt uit Nova Scotia, Canada, waar het ras in de vroege 19e eeuw werd ontwikkeld. De exacte oorsprong is onzeker, maar waarschijnlijk werden Cocker Spaniels, Golden Retrievers, Chesapeake Bay Retrievers, en mogelijk Collies en Ierse Setters gekruist. Het doel was een kleine, veelzijdige jachthond te creëren die de unieke 'tolling' techniek kon uitvoeren.",
    development: "Tolling is een jachttechniek waarbij de hond speels langs de waterkant rent en speelt, wat nieuwsgierige eenden dichterbij lokt. Deze methode werd geïnspireerd door vossen, die hetzelfde gedrag vertonen. Toen de eenden dichtbij genoeg waren, schoot de jager, en de Toller apporteerde de vogels uit het water.\n\nHet ras werd in 1945 officieel erkend door de Canadian Kennel Club als 'Nova Scotia Duck Tolling Retriever' – een lange naam die hun functie beschrijft. In 1987 werd de Toller de officiële hond van Nova Scotia. Het ras bleef relatief onbekend buiten Canada tot de jaren '90, toen ze langzaam populair werden in Europa en de Verenigde Staten. De American Kennel Club erkende het ras in 2003. Tegenwoordig zijn Tollers geliefd als jachthonden, gezinshonden en in hondensport zoals agility en field trials."
  },
  similarBreeds: [
    "Golden Retriever (kleiner)",
    "Cocker Spaniel",
    "Irish Setter (in kleur)",
    "Chesapeake Bay Retriever"
  ],
  commonMistakes: [
    "Te weinig beweging: Tollers zijn extreem energiek. Zonder voldoende beweging worden ze destructief en ongelukkig.",
    "Onvoldoende mentale stimulatie: Ze zijn zeer intelligent en vervelen zich snel. Apporteren, zoekwerk en training zijn essentieel.",
    "Te jong intensief sporten: Bouw beweging langzaam op om gewrichtsproblemen te voorkomen, vooral in het eerste jaar.",
    "Geen water toegang: Tollers zijn geboren zwemmers en hebben toegang tot water nodig voor hun welzijn.",
    "Te weinig socialisatie: Tollers kunnen terughoudend zijn tegenover vreemden. Socialiseer vroeg om schuwheid te voorkomen.",
    "Het 'Toller Scream' niet verwachten: Dit doordringende geluid kan verrassend zijn. Train vroeg om overmatig 'schreeuwen' te verminderen."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€45",
    grooming: "€20-€40",
    insurance: "€25-€40",
    total: "€120-€205",
    note: "Kosten kunnen hoger uitvallen door auto-immuunziekten of Addison's ziekte (levenslange medicatie €50-€150/maand). Overweeg een uitgebreide verzekering. Eerste jaar totaal: €2.200-€3.200."
  }
};

// ===== Bichon Frise =====
export const bichonFrise: BreedDetails = {
  breedName: "Bichon Frise",
  breedNameNL: "Bichon Frise",
  faqs: [
    {
      question: "Verharen Bichon Frises?",
      answer: "Nee, Bichon Frises verharen nauwelijks en worden vaak beschouwd als hypoallergeen. Hun vacht groeit continu en moet elke 4-6 weken professioneel getrimd worden. Dagelijks borstelen is nodig om klitten te voorkomen."
    },
    {
      question: "Zijn Bichon Frises geschikt voor beginners?",
      answer: "Ja, Bichon Frises zijn uitstekend voor beginners. Ze zijn vriendelijk, trainbaar en passen zich gemakkelijk aan. Hun vachtverzorging is wel tijdsintensief, maar hun temperament maakt ze ideaal voor eerste-hondenbezitters."
    },
    {
      question: "Hoeveel beweging heeft een Bichon Frise nodig?",
      answer: "Een Bichon Frise heeft matig beweging nodig: 30 tot 60 minuten per dag. Ze zijn actief en speels maar vermoeien sneller dan grote rassen. Korte wandelingen en binnenspel zijn voldoende."
    },
    {
      question: "Zijn Bichon Frises goed met kinderen?",
      answer: "Ja, Bichon Frises zijn uitstekend met kinderen. Ze zijn speels, vriendelijk en geduldig. Hun kleine formaat vereist wel voorzichtigheid met hele jonge kinderen om per ongeluk verwonden te voorkomen."
    },
    {
      question: "Kunnen Bichon Frises lang alleen zijn?",
      answer: "Nee, Bichon Frises zijn zeer sociaal en kunnen scheidingsangst ontwikkelen. Laat ze maximaal 4-6 uur alleen. Ze zijn gezelschapshonden die graag constant bij hun familie zijn."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Bichon Frises?",
      answer: "Bichon Frises zijn gevoelig voor allergieën (huid en voedsel), patellaluxatie (knieschijf), tandproblemen, blaasproblemen (blaasinfecties, stenen), en oogproblemen (cataract). Regelmatige controles zijn belangrijk."
    },
    {
      question: "Hoe oud wordt een Bichon Frise?",
      answer: "Een Bichon Frise wordt gemiddeld 14 tot 15 jaar oud. Met goede zorg kunnen sommige 16-18 jaar oud worden. Dit is een uitstekende levensverwachting voor een kleine hond."
    },
    {
      question: "Wat kost een Bichon Frise pup in België?",
      answer: "Een Bichon Frise pup met stamboom kost tussen €1.000 en €2.000 in België. Kies een fokker die screent op erfelijke aandoeningen en gezonde ouderdieren heeft."
    }
  ],
  funFacts: [
    "De naam 'Bichon Frise' betekent 'gekruld schoothondje' in het Frans.",
    "Bichons waren favorieten van Europese royalty en werden vaak afgebeeld in Renaissance schilderijen.",
    "Hun witte, pluizige vacht is zo dik dat je hun ogen soms nauwelijks kunt zien!",
    "Bichons werden vroeger gebruikt als circushonden vanwege hun intelligentie en trainbaarheid.",
    "Ze hebben een natuurlijke 'glimlach' – hun monddhoeken krullen omhoog, waardoor ze altijd gelukkig lijken.",
    "Bichons werden in de 16e eeuw meegenomen op Spaanse zeilschepen als gezelschapshonden voor matrozen."
  ],
  history: {
    origin: "De Bichon Frise stamt uit het Middellandse Zee-gebied, waarschijnlijk afkomstig van de Canarische Eilanden (nu Spanje). Het ras ontwikkelde zich uit de 'Barbichon'-familie, die ook de voorouders van de Maltezer en andere kleine witte honden omvat. In de 14e eeuw werden Bichons populair onder Italiaanse en Franse zeelieden, die ze meenamen op handelsschepen.",
    development: "In de 16e eeuw werden Bichons extreem populair onder Europese aristocratie, vooral in Frankrijk. Koning Henri III van Frankrijk was zo dol op Bichons dat hij ze overal mee naartoe nam in een mandje dat aan zijn nek hing. Tijdens het bewind van Napoleon III waren Bichons favoriet aan het Franse hof.\n\nNa de Franse Revolutie verloren Bichons hun status en werden straathonden, vaak gebruikt door orgeldraaiersrs en circusartiesten vanwege hun trainbaarheid. In de jaren '30 werden Franse fokkers georganiseerd om het ras te redden en te standaardiseren. De officiële naam 'Bichon à Poil Frisé' (Bichon met gekrulde vacht) werd vastgesteld. Het ras werd erkend door de Fédération Cynologique Internationale in 1960 en door de American Kennel Club in 1973. Tegenwoordig zijn Bichons populair als gezelschapshonden en therapiehonden."
  },
  similarBreeds: [
    "Maltezer",
    "Coton de Tulear",
    "Havanezer",
    "Bolognese"
  ],
  commonMistakes: [
    "Onvoldoende vachtverzorging: Hun vacht klittert extreem snel. Dagelijks borstelen en professionele trimming elke 4-6 weken zijn essentieel.",
    "Te weinig socialisatie: Bichons kunnen angstig worden zonder vroege socialisatie. Stel ze bloot aan verschillende mensen, honden en omgevingen.",
    "Overmatig verwennen: 'Klein hondje syndroom' kan leiden tot gedragsproblemen zoals blaffen, agressie en angst. Behandel ze als honden.",
    "Verwaarlozen van tandzorg: Bichons zijn gevoelig voor tandproblemen. Poets dagelijks en plan regelmatige controles.",
    "Te lang alleen laten: Ze zijn zeer aanhankelijk en kunnen scheidingsangst ontwikkelen. Plan gezelschap in.",
    "Ogen verwaarlozen: Hun ogen kunnen traanvlekken ontwikkelen. Reinig dagelijks met speciale doekjes."
  },
  monthlyCosts: {
    food: "€30-€50",
    vet: "€20-€40",
    grooming: "€40-€80",
    insurance: "€20-€35",
    total: "€110-€205",
    note: "Professionele trimming kost €40-€80 per sessie (elke 4-6 weken). Tandverzorging kan extra kosten met zich meebrengen (€150-€300/jaar voor professionele reiniging). Allergieën kunnen dieet- en medicatiekosten verhogen. Eerste jaar totaal: €2.200-€3.200."
  }
};

// Export all breeds as array voor eenvoudige import
export const breedDetailsBatch2 = [
  chihuahua,
  rhodesianRidgeback,
  oldEnglishBulldog,
  beauceron,
  mopshond,
  schnauzer,
  siberischeHusky,
  hongaarseVizsla,
  amerikaanseStaffordshireTerrier,
  basenji,
  shetlandSheepdog,
  flatcoatedRetriever,
  anatolischeHerder,
  chowChow,
  duitseDog,
  boxer,
  yorkshireTerrier,
  bordeauxdog,
  novaScotiaDuckTollingRetriever,
  bichonFrise
];