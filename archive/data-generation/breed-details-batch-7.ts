// Batch 7: Breed Details voor hondenpups.be - Jachthonden & Setters
// 20 rassen: English Setter tot Braque Français

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

// ===== 121. English Setter =====
export const englishSetter: BreedDetails = {
  breedName: "English Setter",
  breedNameNL: "Engelse Setter",
  faqs: [
    {
      question: "Is een English Setter geschikt voor een appartement?",
      answer: "Nee, een English Setter is niet ideaal voor een appartement. Dit is een actieve jachthond die veel ruimte nodig heeft om te rennen. Een huis met een grote omheinde tuin is het beste. Zonder voldoende ruimte en beweging kunnen gedragsproblemen ontstaan."
    },
    {
      question: "Hoeveel beweging heeft een English Setter nodig?",
      answer: "Een English Setter heeft minimaal 2 uur intensieve beweging per dag nodig. Ze houden van rennen, zwemmen en apporteren. Naast wandelen hebben ze ook mentale uitdaging nodig zoals zoekwerk of jachttraining. Dit is geen ras voor mensen met een rustige levensstijl."
    },
    {
      question: "Verhaart een English Setter veel?",
      answer: "Ja, English Setters verharen matig tot veel, vooral tijdens seizoenswisselingen. Hun lange, zijdeachtige vacht vraagt regelmatig onderhoud: borstel minimaal 3-4x per week om klitten te voorkomen. Professionele trimming elke 6-8 weken wordt aangeraden."
    },
    {
      question: "Zijn English Setters makkelijk te trainen?",
      answer: "English Setters zijn intelligent maar kunnen koppig zijn. Ze reageren goed op positieve bekrachtiging, maar hun jachtinstinct kan ze afleiden. Training vereist geduld en consistentie. Ze zijn niet het makkelijkste ras voor beginners."
    },
    {
      question: "Zijn English Setters goed met kinderen?",
      answer: "Ja, English Setters zijn vriendelijk en geduldig met kinderen. Ze zijn speels en aanhankelijk, wat ze goede gezinshonden maakt. Wel zijn ze enthousiast en kunnen jonge kinderen omverlopen tijdens het spelen. Supervisie is belangrijk bij kleine kinderen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij English Setters?",
      answer: "English Setters kunnen last hebben van heupdysplasie, elleboogdysplasie, hypothyreoïdie (schildklieraandoening), doofheid en progressieve retina-atrofie (PRA). Kies een fokker die ouderdieren screent op deze aandoeningen. Regelmatige controles zijn belangrijk."
    },
    {
      question: "Kunnen English Setters lang alleen zijn?",
      answer: "Nee, English Setters zijn sociale honden die niet graag lang alleen zijn. Ze kunnen scheidingsangst ontwikkelen als ze regelmatig te lang alleen gelaten worden. Plan gezelschap in als je langere werkdagen hebt."
    },
    {
      question: "Hoe oud wordt een English Setter?",
      answer: "Een gezonde English Setter wordt gemiddeld 11 tot 15 jaar oud. Met goede voeding, voldoende beweging en regelmatige dierenarts controles kunnen ze een lang en actief leven leiden."
    }
  ],
  funFacts: [
    "English Setters werden oorspronkelijk gefokt om wild te 'setten' (zitten) en aan te wijzen in plaats van op te jagen.",
    "Hun gevlekte vacht wordt 'Belton' genoemd, naar een klein dorp in Northumberland waar het ras werd verfijnd.",
    "English Setters zijn uitstekende zwemmers en houden van water – hun vacht is waterafstotend.",
    "Het ras was een favoriet van koning Edward VII van Engeland, die meerdere English Setters hield.",
    "Hun elegante uiterlijk en vriendelijke karakter maken ze populair op hondenshows, maar ze blijven echte werkende jachthonden.",
    "English Setters hebben een 'zachte mond' en kunnen zelfs een ei vasthouden zonder het te breken."
  ],
  history: {
    origin: "De English Setter is één van de oudste setterrassen en vindt zijn oorsprong in Engeland in de 14e eeuw. Het ras werd ontwikkeld uit oude spaniel-type jachthonden die gebruikt werden om vogels te lokaliseren. De naam 'setter' komt van het gedrag van de hond om te gaan zitten ('to set') bij het vinden van wild.",
    development: "In de 19e eeuw verfijnde Edward Laverack het ras gedurende 35 jaar door selectieve fokkerij, met de nadruk op uiterlijk en temperament. Zijn lijn werd bekend als de 'Laverack Setter'. Tegelijkertijd ontwikkelde R. Purcell Llewellin een werkende lijn door Laverack's honden te kruisen met andere setters, wat resulteerde in de 'Llewellin Setter' – gefokt voor prestaties in het veld.\n\nDe English Setter werd in 1873 officieel erkend door de Kennel Club. Het ras werd zowel populair als showhond vanwege zijn elegante uiterlijk als jachthond vanwege zijn uitzonderlijke neus en uithoudingsvermogen. Moderne English Setters worden nog steeds voor beide doeleinden gefokt, hoewel showlijnen vaak zwaarder en minder atletisch zijn dan werklijnen."
  },
  similarBreeds: [
    "Gordon Setter",
    "Irish Setter",
    "Pointer",
    "Bracco Italiano"
  ],
  commonMistakes: [
    "Te weinig beweging geven: English Setters zijn jachthonden en hebben veel dagelijkse beweging nodig. Verwaarlozing leidt tot gedragsproblemen.",
    "Vacht onderhoud negeren: Hun lange vacht klitteen snel zonder regelmatig borstelen. Verwaarlozing leidt tot huidproblemen.",
    "Geen vroege socialisatie: Zonder goede socialisatie kunnen ze schuw of nerveus worden. Begin vroeg met puppy training.",
    "Jachtinstinct onderschatten: Ze kunnen kleine huisdieren achternazitten. Training en veilige omheiningen zijn essentieel.",
    "Te weinig mentale uitdaging: Deze intelligente honden vervelen zich snel zonder puzzels, training of zoekwerk.",
    "Te lang alleen laten: English Setters zijn sociale honden die gezelschap nodig hebben om gelukkig te blijven."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€50",
    grooming: "€50-€100",
    insurance: "€20-€40",
    total: "€155-€280",
    note: "Professionele trimming kost €60-€100 per sessie (om de 6-8 weken). Aanschafprijs pup: €800-€1.500. Eerste jaar totaal inclusief aanschaf: €2.500-€4.000. Houd rekening met hogere kosten voor gezondheidsscreening en eventuele erfelijke aandoeningen."
  }
};

// ===== 122. Gordon Setter =====
export const gordonSetter: BreedDetails = {
  breedName: "Gordon Setter",
  breedNameNL: "Gordon Setter",
  faqs: [
    {
      question: "Zijn Gordon Setters geschikt voor beginners?",
      answer: "Gordon Setters zijn niet ideaal voor beginners. Ze zijn intelligent maar koppig, en hebben een ervaren eigenaar nodig die consequent kan zijn. Hun hoge energie niveau en trainingsbehoeften kunnen overweldigend zijn voor iemand zonder honden ervaring."
    },
    {
      question: "Hoeveel beweging heeft een Gordon Setter nodig?",
      answer: "Een Gordon Setter heeft minimaal 2 uur intensieve beweging per dag nodig. Ze zijn gebouwd voor het jagen en hebben uitgestrekte loopgebieden nodig. Naast wandelen hebben ze ook mentale uitdaging nodig zoals jachttraining, rally of agility."
    },
    {
      question: "Zijn Gordon Setters goed met kinderen?",
      answer: "Ja, Gordon Setters kunnen uitstekende gezinshonden zijn. Ze zijn loyaal, beschermend en vriendelijk met kinderen. Vanwege hun formaat en enthousiasme kunnen ze jonge kinderen omverlopen, dus supervisie is belangrijk. Ze doen het best met oudere kinderen."
    },
    {
      question: "Verhaart een Gordon Setter veel?",
      answer: "Ja, Gordon Setters verharen matig tot veel. Hun lange, glanzende vacht vraagt regelmatig onderhoud: borstel minimaal 3-4x per week. Tijdens seizoenswisselingen (voorjaar en najaar) verharen ze intensiever. Regelmatige trimming helpt losse haren te verminderen."
    },
    {
      question: "Zijn Gordon Setters goede waakhonden?",
      answer: "Gordon Setters zijn alerter en beschermender dan andere setters, wat ze tot betere waakhonden maakt. Ze zijn gereserveerd tegenover vreemden en zullen blaffen bij ongewone geluiden. Ze zijn echter niet agressief en zijn niet geschikt als bewakingshonden."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Gordon Setters?",
      answer: "Gordon Setters zijn gevoelig voor heupdysplasie, elleboogdysplasie, maagdilatatie-volvulus (maagtorsie), hypothyreoïdie en progressieve retina-atrofie (PRA). Kies een fokker die ouderdieren screent. Regelmatige check-ups zijn essentieel."
    },
    {
      question: "Hoe oud wordt een Gordon Setter?",
      answer: "Een gezonde Gordon Setter wordt gemiddeld 10 tot 12 jaar oud. Met goede zorg, voeding en voldoende beweging kunnen sommige exemplaren 13-14 jaar oud worden."
    },
    {
      question: "Wat kost een Gordon Setter pup?",
      answer: "Een Gordon Setter pup met stamboom kost tussen €1.000 en €1.800 in België. Controleer altijd de gezondheidsscreening van de ouders en kies een erkende fokker."
    }
  ],
  funFacts: [
    "Gordon Setters zijn de zwaarste en grootste van alle setterrassen.",
    "Het ras is vernoemd naar Alexander Gordon, 4e Hertog van Gordon, die het ras in de 18e eeuw ontwikkelde op zijn kasteel in Schotland.",
    "Gordon Setters zijn de enige setters met een zwart-tan kleur – alle andere setters zijn lichter gekleurd.",
    "Ze staan ook bekend als 'Gordon Castle Setters' naar het kasteel waar ze werden gefokt.",
    "Daniel Webster, een beroemd Amerikaans senator in de 19e eeuw, importeerde de eerste Gordon Setters naar Amerika in 1842.",
    "Gordon Setters hebben een uitzonderlijk geheugen en kunnen jachtgebieden herinneren die ze jaren niet hebben bezocht."
  ],
  history: {
    origin: "De Gordon Setter vindt zijn oorsprong in Schotland in de vroege 17e eeuw. Het ras werd ontwikkeld als jachthond voor het Schotse hoogland, waar een robuuste, geduldige hond nodig was die wilde vogels kon opsporen in moeilijk terrein. De voorouders waren waarschijnlijk setters, spaniels en mogelijk bloedspeurhonden.",
    development: "In de late 18e eeuw verfijnde Alexander Gordon, 4e Hertog van Gordon, het ras op zijn landgoed Gordon Castle in Banffshire. Hij selecteerde honden met een zwart-tan vacht die uitblonken in jachtvermogen en uithoudingsvermogen. De honden van Gordon Castle werden beroemd en vormden de basis van het moderne ras.\n\nIn 1842 werden de eerste Gordon Setters geïmporteerd naar Amerika door Daniel Webster en George Blunt. Het ras werd officieel erkend door de Kennel Club in 1873 en door de American Kennel Club in 1884. Hoewel Gordon Setters minder populair zijn dan English of Irish Setters, blijven ze gewaardeerd als veelzijdige jachthonden en loyale gezelschapshonden."
  },
  similarBreeds: [
    "English Setter",
    "Irish Setter",
    "Flat-Coated Retriever",
    "Hovawart (vergelijkbaar karakter)"
  ],
  commonMistakes: [
    "Te weinig beweging: Gordon Setters zijn gebouwd voor lange jachtdagen en raken gefrustreerd zonder voldoende fysieke activiteit.",
    "Inconsistente training: Hun koppigheid vereist consequente, positieve training vanaf jonge leeftijd.",
    "Slecht socialisatie: Zonder vroege socialisatie kunnen ze schuw of gereserveerd worden tegenover vreemden.",
    "Maagtorsie risico onderschatten: Voed kleinere porties verspreid over de dag en vermijd zware beweging direct na eten.",
    "Vacht verwaarlozen: Hun lange vacht klitteen snel zonder regelmatig borstelen, vooral achter de oren en onder de buik.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben."
  ],
  monthlyCosts: {
    food: "€70-€100",
    vet: "€30-€50",
    grooming: "€50-€90",
    insurance: "€25-€45",
    total: "€175-€285",
    note: "Gordon Setters zijn grote honden en eten meer dan gemiddeld. Professionele trimming kost €60-€90 per sessie (elke 6-8 weken). Aanschafprijs: €1.000-€1.800. Eerste jaar totaal: €3.000-€4.500. Hogere dierenarts kosten mogelijk door erfelijke aandoeningen."
  }
};

// ===== 123. Pointer (Engels) =====
export const englishPointer: BreedDetails = {
  breedName: "Pointer",
  breedNameNL: "Pointer (Engels)",
  faqs: [
    {
      question: "Is een Pointer geschikt voor een appartement?",
      answer: "Nee, Pointers zijn niet geschikt voor appartementen. Dit zijn atletische jachthonden die veel ruimte en beweging nodig hebben. Een huis met een grote omheinde tuin is minimaal nodig. Zonder voldoende ruimte worden ze ongelukkig en destructief."
    },
    {
      question: "Hoeveel beweging heeft een Pointer nodig?",
      answer: "Een Pointer heeft minimaal 2 uur intensieve beweging per dag nodig. Ze zijn gebouwd voor hardlopen en hebben lange afstanden nodig. Ideaal zijn hardlopen, fietsen, jachttraining of hondensporten zoals agility. Zonder voldoende beweging ontwikkelen ze gedragsproblemen."
    },
    {
      question: "Zijn Pointers makkelijk te trainen?",
      answer: "Pointers zijn intelligent en leergierig, maar hun sterke jachtinstinct kan afleidend werken. Ze reageren goed op positieve bekrachtiging en consistente training. Ze zijn niet het makkelijkste ras voor beginners vanwege hun hoge energie en concentratiebehoeften."
    },
    {
      question: "Verhaart een Pointer veel?",
      answer: "Pointers verharen matig. Hun korte vacht is onderhoudsvriendelijk en vereist alleen wekelijks borstelen om losse haren te verwijderen. Tijdens seizoenswisselingen verharen ze iets meer. Ze hebben geen professionele trimming nodig."
    },
    {
      question: "Zijn Pointers goed met kinderen?",
      answer: "Ja, Pointers kunnen goed met kinderen omgaan, maar hun hoge energie en enthousiasme kunnen overweldigend zijn voor jonge kinderen. Ze doen het best in gezinnen met oudere, actieve kinderen die mee kunnen rennen en spelen. Supervisie is belangrijk."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Pointers?",
      answer: "Pointers zijn over het algemeen gezond, maar kunnen last hebben van heupdysplasie, epilepsie, hypothyreoïdie en neurologische aandoeningen. Kies een fokker die ouderdieren screent. Ze zijn ook gevoelig voor huidallergieën."
    },
    {
      question: "Kunnen Pointers lang alleen zijn?",
      answer: "Nee, Pointers zijn sociale honden die niet graag lang alleen zijn. Ze kunnen scheidingsangst en destructief gedrag ontwikkelen als ze te vaak alleen gelaten worden. Plan gezelschap in of overweeg een hondenoppas."
    },
    {
      question: "Hoe oud wordt een Pointer?",
      answer: "Een gezonde Pointer wordt gemiddeld 12 tot 15 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en actief leven leiden."
    }
  ],
  funFacts: [
    "Pointers kunnen urenlang in hun kenmerkende 'point' positie blijven staan – met één poot opgetrokken en neus naar het wild wijzend.",
    "Westminster Kennel Club, de oudste hondenshow van Amerika, gebruikt een Pointer als officieel logo sinds 1877.",
    "Pointers kunnen snelheden tot 72 km/u bereiken tijdens de jacht.",
    "Het ras kan temperaturen onder -6°C en boven 32°C verdragen dankzij hun korte, dichte vacht.",
    "Pointers hebben een 'hondengeheugen' en kunnen gebieden waar ze ooit wild hebben gevonden nog jaren later herkennen.",
    "Ze zijn zo gefokt op jachtinstinct dat sommige pups al op 8 weken beginnen te 'pointen' naar speelgoed of vogels."
  ],
  history: {
    origin: "De Pointer ontstond in Engeland in de 17e eeuw, hoewel de exacte oorsprong onduidelijk blijft. Waarschijnlijk werden Spaanse Pointers geïmporteerd naar Engeland na de Spaanse Successieoorlog (1701-1714) en gekruist met lokale jachthonden. Er zijn ook theorieën dat Foxhounds, Greyhounds en Bloodhounds werden ingebracht voor snelheid, uithoudingsvermogen en reukzin.",
    development: "In de 18e en 19e eeuw werd het ras verfijnd voor het jagen op vogels, vooral patrijs en fazant. Pointers werden gebruikt in combinatie met Greyhounds: de Pointer wees het wild aan, waarna de Greyhound het opjoeg. Later, na de invoering van jachtwapens, werd de Pointer onmisbaar voor het lokaliseren van wild voordat de jager schoot.\n\nHet ras werd officieel erkend door de Kennel Club in 1873 en de American Kennel Club in 1878. Pointers bleven populair als jachthonden in Engeland en Amerika, en worden nog steeds ingezet in veldwedstrijden en jachtactiviteiten. Hun atletische bouw en elegante 'point' maken ze ook populair in showringen."
  },
  similarBreeds: [
    "German Shorthaired Pointer",
    "English Setter",
    "Vizsla",
    "Weimaraner"
  ],
  commonMistakes: [
    "Te weinig beweging: Pointers zijn marathonlopers en hebben dagelijks intensieve beweging nodig. Korte wandelingen zijn niet voldoende.",
    "Geen mentale uitdaging: Zonder zoekwerk, training of puzzels raken ze verveeld en destructief.",
    "Jachtinstinct onderschatten: Ze zullen vogels, katten en andere kleine dieren achternazitten zonder goede training.",
    "Te vroeg aan intensieve sport beginnen: Hun gewrichten ontwikkelen tot 18 maanden. Wacht met hardlopen en springen tot ze volgroeid zijn.",
    "Geen vroege socialisatie: Zonder socialisatie kunnen ze nerveus of schuw worden.",
    "Te lang alleen laten: Pointers zijn sociale honden die gezelschap nodig hebben."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€20-€35",
    total: "€110-€185",
    note: "Pointers hebben relatief lage onderhoudskosten vanwege hun korte vacht. Aanschafprijs pup: €800-€1.500. Eerste jaar totaal: €2.000-€3.500. Houd rekening met hogere voedingskosten vanwege hun atletische behoeften en mogelijke kosten voor hondensporten of jachttraining."
  }
};

// ===== 124. Pointer (Duits Korthaar) =====
export const germanShorthairedPointer: BreedDetails = {
  breedName: "German Shorthaired Pointer",
  breedNameNL: "Duits Korthaar",
  faqs: [
    {
      question: "Is een Duits Korthaar geschikt voor beginners?",
      answer: "Een Duits Korthaar is niet ideaal voor beginners. Ze zijn zeer intelligent maar hebben een hoog energie niveau en sterke wil. Ze vereisen consequente training, veel beweging en mentale uitdaging. Ervaring met actieve honden is sterk aangeraden."
    },
    {
      question: "Hoeveel beweging heeft een Duits Korthaar nodig?",
      answer: "Een Duits Korthaar heeft minimaal 2 uur intensieve beweging per dag nodig. Ze houden van hardlopen, zwemmen, jagen en hondensporten zoals agility of flyball. Zonder voldoende beweging worden ze destructief en ongelukkig. Dit is een ras voor zeer actieve mensen."
    },
    {
      question: "Zijn Duits Korthaars goed met kinderen?",
      answer: "Ja, Duits Korthaars zijn vriendelijk en speels met kinderen, maar hun enthousiasme kan overweldigend zijn voor jonge kinderen. Ze doen het best in gezinnen met oudere kinderen die actief zijn. Goede training en socialisatie zijn essentieel."
    },
    {
      question: "Verhaart een Duits Korthaar veel?",
      answer: "Duits Korthaars verharen matig het hele jaar door. Hun korte vacht is onderhoudsvriendelijk en vereist wekelijks borstelen. Tijdens seizoenswisselingen verharen ze meer. Regelmatig borstelen helpt losse haren te verminderen."
    },
    {
      question: "Kunnen Duits Korthaars lang alleen zijn?",
      answer: "Nee, Duits Korthaars zijn zeer sociale honden die niet graag alleen zijn. Ze kunnen ernstige scheidingsangst ontwikkelen en destructief gedrag vertonen als ze te lang alleen gelaten worden. Plan gezelschap in als je lange werkdagen hebt."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Duits Korthaars?",
      answer: "Duits Korthaars kunnen last hebben van heupdysplasie, elleboogdysplasie, maagdilatatie-volvulus (maagtorsie), Von Willebrand ziekte (bloedstollingsstoornis) en hypothyreoïdie. Kies een fokker die ouderdieren screent op deze aandoeningen."
    },
    {
      question: "Zijn Duits Korthaars goede waakhonden?",
      answer: "Duits Korthaars zijn alert en zullen blaffen bij ongewone geluiden, maar ze zijn te vriendelijk om echte waakhonden te zijn. Ze begroeten vreemden meestal enthousiast. Ze zijn geweldige gezinshonden maar geen bewakers."
    },
    {
      question: "Hoe oud wordt een Duits Korthaar?",
      answer: "Een gezonde Duits Korthaar wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige dierenarts controles kunnen ze een lang en actief leven leiden."
    }
  ],
  funFacts: [
    "Duits Korthaars kunnen hardlopen tot 72 km/u en urenlang volhouden – ze zijn gebouwd als atleten.",
    "Ze hebben zwemvliezen tussen hun tenen, wat ze uitstekende zwemmers maakt.",
    "Duits Korthaars zijn één van de meest veelzijdige jachthonden en kunnen pointen, apporteren en sporen in water én op land.",
    "Hun bruine neus matcht altijd hun vacht – leverbontjes hebben bruine neuzen, zwartbontjes hebben zwarte neuzen.",
    "Ze worden vaak ingezet als reddingshonden, politiehonden en explosievenspeurhonden vanwege hun uitzonderlijke neus.",
    "CJ, een Duits Korthaar, won de Westminster Kennel Club Dog Show in 2016 – de eerste van het ras."
  ],
  history: {
    origin: "De Duits Korthaar (German Shorthaired Pointer) werd ontwikkeld in Duitsland in de 19e eeuw. Duitse jagers wilden een veelzijdige jachthond die kon pointen, apporteren en sporen, zowel op land als in water. De basis werd gevormd door oude Duitse vogelhonden zoals de Duitse Vogelhond en Hannoverse Zweethoonden.",
    development: "Duitse fokkers kruisten deze honden met Spaanse Pointers voor het pointen, Engelse Pointers voor snelheid en elegantie, en mogelijk Bloodhounds voor spoorzoeken. Het resultaat was een atletische, intelligente hond met een korte vacht die geschikt was voor alle weersomstandigheden.\n\nHet ras werd in 1872 officieel erkend in Duitsland met de oprichting van het 'Klub Kurzhaar'. In 1930 werden de eerste Duits Korthaars geïmporteerd naar Amerika, waar ze snel populair werden. De AKC erkende het ras in 1930. Tegenwoordig behoren Duits Korthaars tot de populairste jachthonden wereldwijd en winnen regelmatig veldwedstrijden en hondenshows."
  },
  similarBreeds: [
    "German Wirehaired Pointer",
    "Vizsla",
    "Weimaraner",
    "English Pointer"
  ],
  commonMistakes: [
    "Te weinig beweging: Dit zijn marathonlopers die dagelijks urenlang actief moeten zijn. Een kort rondje is absoluut niet voldoende.",
    "Geen mentale uitdaging: Ze vervelen zich snel en worden destructief zonder puzzels, training of zoekwerk.",
    "Te laat starten met training: Begin vanaf dag één met training en socialisatie om hun sterke wil te kanaliseren.",
    "Jachtinstinct onderschatten: Ze zullen alles achternazitten zonder goede afroepoefening en impulcontrole training.",
    "Maagtorsie risico negeren: Voed meerdere kleine porties en vermijd beweging direct na eten.",
    "Te lang alleen laten: Deze honden hebben gezelschap nodig en ontwikkelen gemakkelijk scheidingsangst."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€45",
    grooming: "€10-€20",
    insurance: "€25-€40",
    total: "€120-€195",
    note: "Duits Korthaars hebben relatief lage onderhoudskosten door hun korte vacht. Aanschafprijs pup: €800-€1.500. Eerste jaar totaal: €2.200-€3.800. Houd rekening met kosten voor hondensporten, jachttraining of dagopvang als je lange werkdagen hebt."
  }
};

// ===== 125. Pointer (Duits Draad haar) =====
export const germanWirehairedPointer: BreedDetails = {
  breedName: "German Wirehaired Pointer",
  breedNameNL: "Duits Draad haar",
  faqs: [
    {
      question: "Wat is het verschil tussen Duits Draad haar en Duits Korthaar?",
      answer: "Het grootste verschil is de vacht: Duits Draad haar heeft een ruw, waterafstotend draad haar dat bescherming biedt tegen doorns en weer, terwijl Duits Korthaar een gladde korte vacht heeft. Duits Draad haar is ook iets groter, robuuster en heeft meer onderhoud nodig (hand-strippen)."
    },
    {
      question: "Hoeveel beweging heeft een Duits Draad haar nodig?",
      answer: "Een Duits Draad haar heeft minimaal 2 uur intensieve beweging per dag nodig. Ze zijn gebouwd voor jagen in ruw terrein en hebben uitdagingen nodig zoals hardlopen, zwemmen, jachttraining of hondensporten. Zonder voldoende beweging worden ze destructief."
    },
    {
      question: "Is een Duits Draad haar geschikt voor beginners?",
      answer: "Nee, een Duits Draad haar is niet geschikt voor beginners. Ze zijn intelligent maar koppig, hebben veel beweging en mentale uitdaging nodig, en vereisen consistente training. Dit is een ras voor ervaren hondeneigenaren met een actieve levensstijl."
    },
    {
      question: "Verhaart een Duits Draad haar veel?",
      answer: "Duits Draad haar verharen minimaal als ze regelmatig gehand-stript worden (overtollig dood haar wordt met de hand verwijderd). Zonder strippen verharen ze meer. Hun vacht vereist meer onderhoud dan kortharige rassen maar is wel waterafstotend en beschermend."
    },
    {
      question: "Zijn Duits Draad haars goed met kinderen?",
      answer: "Ja, Duits Draad haars kunnen goed met kinderen omgaan als ze goed gesocialiseerd zijn. Ze zijn loyaal en beschermend, maar hun energie en enthousiasme kunnen overweldigend zijn voor jonge kinderen. Ze doen het best met oudere, actieve kinderen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Duits Draad haars?",
      answer: "Duits Draad haars kunnen last hebben van heupdysplasie, elleboogdysplasie, Von Willebrand ziekte (bloedstollingsstoornis), hypothyreoïdie en oogproblemen. Kies een fokker die ouderdieren screent. Ze zijn over het algemeen robuust en gezond."
    },
    {
      question: "Kunnen Duits Draad haars goed zwemmen?",
      answer: "Ja, Duits Draad haars zijn uitstekende zwemmers. Hun waterafstotende vacht en natuurlijke zwemvaardigheid maken ze perfect voor waterjacht. Ze houden van zwemmen en apporteren uit het water."
    },
    {
      question: "Hoe oud wordt een Duits Draad haar?",
      answer: "Een gezonde Duits Draad haar wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en actief leven leiden."
    }
  ],
  funFacts: [
    "Duits Draad haar heeft een kenmerkende 'baard' en borstelige wenkbrauwen die hun gezicht een karakteristieke uitdrukking geven.",
    "Hun vacht is zo waterafstotend dat ze na zwemmen bijna direct droog zijn – ideaal voor jagen bij slecht weer.",
    "Ze zijn één van de meest veelzijdige jachthonden en kunnen jagen op vogels, klein wild én groot wild zoals herten en wilde zwijnen.",
    "Duits Draad haar wordt ook ingezet als politiehond en reddingshond vanwege hun intelligentie en speurvermogen.",
    "Het ras werd gefokt om te werken in de ruwste omstandigheden van Duitsland, inclusief dichte bossen en ijzige wateren.",
    "Hun draad haar groeit constant en moet elke 3-4 maanden gehand-stript worden om de juiste textuur te behouden."
  ],
  history: {
    origin: "De Duits Draad haar (German Wirehaired Pointer of Deutsch Drahthaar) werd ontwikkeld in Duitsland in de late 19e eeuw. Duitse jagers wilden een veelzijdige jachthond met een beschermende vacht die kon werken in ruw terrein en slecht weer. Het ras ontstond uit de behoefte aan een robuustere versie van de Duits Korthaar.",
    development: "Fokkers kruisten verschillende rassen om de ideale jachthond te creëren: de Pudlepointer (voor de draad haar), Duits Korthaar (voor jachtinstinct), Griffon (voor vachtstructuur) en mogelijk Airedale Terrier (voor karakter). Het resultaat was een hond met een ruw, waterafstotend draad haar dat bescherming bood tegen doorns, kou en water.\n\nHet ras werd officieel erkend in Duitsland in 1902 met de oprichting van de 'Verein Deutsch Drahthaar'. In 1920 werden de eerste exemplaren geïmporteerd naar Amerika, waar het ras in 1959 werd erkend door de AKC. Duits Draad haar is vandaag één van de populairste jachthonden in Duitsland en blijft een veelzijdige werkhond wereldwijd."
  },
  similarBreeds: [
    "German Shorthaired Pointer",
    "Wirehaired Pointing Griffon (Korthals)",
    "Pudelpointer",
    "Spinone Italiano"
  ],
  commonMistakes: [
    "Vacht scheren in plaats van strippen: Scheren beschadigt de waterafstotende eigenschappen. Hand-strippen is essentieel.",
    "Te weinig beweging: Dit zijn werkende jachthonden die dagelijks intensieve beweging nodig hebben.",
    "Geen mentale uitdaging: Ze vervelen zich snel zonder training, zoekwerk of puzzels.",
    "Jachtinstinct onderschatten: Ze zullen vogels en klein wild achternazitten zonder goede training.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze gereserveerd of territoriaal worden.",
    "Te lang alleen laten: Deze sociale honden hebben gezelschap nodig en kunnen scheidingsangst ontwikkelen."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€45",
    grooming: "€40-€80",
    insurance: "€25-€40",
    total: "€150-€255",
    note: "Hand-strippen kost €50-€80 per sessie (elke 3-4 maanden). Aanschafprijs pup: €900-€1.600. Eerste jaar totaal: €2.500-€4.000. Houd rekening met kosten voor professionele vacht onderhoud en eventuele hondensporten of jachttraining."
  }
};

// ===== 126. Pointer (Duits Langhaar) =====
export const germanLonghairedPointer: BreedDetails = {
  breedName: "German Longhaired Pointer",
  breedNameNL: "Duits Langhaar",
  faqs: [
    {
      question: "Is een Duits Langhaar geschikt voor beginners?",
      answer: "Een Duits Langhaar is niet ideaal voor beginners. Ze zijn intelligent maar koppig, hebben veel beweging nodig en vereisen consequente training. Dit ras is het best geschikt voor ervaren hondeneigenaren met een actieve levensstijl en ervaring met jachthonden."
    },
    {
      question: "Hoeveel beweging heeft een Duits Langhaar nodig?",
      answer: "Een Duits Langhaar heeft minimaal 1,5 tot 2 uur beweging per dag nodig. Ze houden van lange wandelingen, zwemmen, jachttraining en hondensporten. Zonder voldoende beweging kunnen ze ongelukkig en destructief worden."
    },
    {
      question: "Verhaart een Duits Langhaar veel?",
      answer: "Ja, Duits Langhaar verharen matig tot veel, vooral tijdens seizoenswisselingen. Hun lange, zijdeachtige vacht vereist regelmatig borstelen (3-4x per week) om klitten te voorkomen. Regelmatige trimming helpt de vacht gezond te houden."
    },
    {
      question: "Zijn Duits Langhaars goed met kinderen?",
      answer: "Ja, Duits Langhaars zijn vriendelijk en geduldig met kinderen als ze goed gesocialiseerd zijn. Ze zijn loyaal en beschermend, maar hun enthousiasme kan overweldigend zijn voor jonge kinderen. Ze doen het best met oudere kinderen."
    },
    {
      question: "Wat is het verschil tussen Duits Langhaar en Duits Korthaar?",
      answer: "Het grootste verschil is de vacht: Duits Langhaar heeft een lange, zijdeachtige vacht met franje aan oren, staart en benen, terwijl Duits Korthaar een korte gladde vacht heeft. Duits Langhaar is ook iets zwaarder en heeft een rustiger temperament, hoewel beide rassen veel beweging nodig hebben."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Duits Langhaars?",
      answer: "Duits Langhaars kunnen last hebben van heupdysplasie, elleboogdysplasie, hypothyreoïdie en oogproblemen zoals entropion (naar binnen gedraaide oogleden). Kies een fokker die ouderdieren screent. Ze zijn over het algemeen gezond."
    },
    {
      question: "Zijn Duits Langhaars zeldzaam?",
      answer: "Ja, Duits Langhaar is vrij zeldzaam buiten Duitsland. Het ras is minder bekend dan Duits Korthaar en Duits Draad haar. Fokkers zijn schaars, vooral in België, dus wachtlijsten zijn gebruikelijk."
    },
    {
      question: "Hoe oud wordt een Duits Langhaar?",
      answer: "Een gezonde Duits Langhaar wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en gezond leven leiden."
    }
  ],
  funFacts: [
    "Duits Langhaar is één van de oudste Duitse jachthondenrassen, met wortels die teruggaan tot de Middeleeuwen.",
    "Ze worden ook wel 'GLP' (German Longhaired Pointer) of 'Deutsch Langhaar' genoemd.",
    "Duits Langhaar heeft een rustiger temperament dan Duits Korthaar, wat ze geschikter maakt als gezinshond.",
    "Hun lange vacht is niet alleen mooi, maar ook functioneel – het biedt bescherming tegen doorns en koud weer tijdens de jacht.",
    "Het ras kwam bijna uit te sterven na de Tweede Wereldoorlog, maar werd gered door toegewijde fokkers in Duitsland.",
    "Duits Langhaar excelt in waterjacht en zwemt graag, zelfs in koud water."
  ],
  history: {
    origin: "De Duits Langhaar (German Longhaired Pointer of Deutsch Langhaar) is één van de oudste Duitse jachthondenrassen en ontstond in de Middeleeuwen. Het ras stamt af van middeleeuwse vogelhonden die werden gebruikt door adellijke jagers in Duitsland. Deze honden werden gekruist met lokale spaniels en setters om een veelzijdige jachthond te creëren.",
    development: "In de 19e eeuw verfijnden Duitse fokkers het ras door kruisingen met Ierse Setters, Gordon Setters en mogelijk Franse spaniels. Het doel was een elegante, veelzijdige jachthond met een mooie lange vacht die kon pointen, apporteren en sporen.\n\nHet ras werd officieel erkend in Duitsland in 1879 met de oprichting van de 'Verein Deutsch Langhaar'. Na de Tweede Wereldoorlog kwam het ras bijna uit te sterven, maar toegewijde fokkers brachten het terug. In 2006 werd Duits Langhaar erkend door de United Kennel Club in Amerika. Het ras blijft zeldzaam buiten Duitsland, maar wint langzaam aan populariteit onder jachtliefhebbers."
  },
  similarBreeds: [
    "German Shorthaired Pointer",
    "Large Munsterlander",
    "English Setter",
    "Irish Setter"
  ],
  commonMistakes: [
    "Te weinig beweging: Duits Langhaars zijn jachthonden en hebben dagelijks intensieve beweging nodig.",
    "Vacht onderhoud verwaarlozen: Hun lange vacht klitteen snel zonder regelmatig borstelen, vooral achter de oren.",
    "Geen mentale uitdaging: Ze vervelen zich zonder training, zoekwerk of puzzels.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze schuw of nerveus worden.",
    "Jachtinstinct onderschatten: Ze zullen vogels en klein wild achternazitten zonder goede training.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€45",
    grooming: "€50-€90",
    insurance: "€25-€40",
    total: "€160-€265",
    note: "Professionele trimming kost €60-€90 per sessie (elke 6-8 weken). Aanschafprijs pup: €1.000-€1.800 (kan hoger zijn vanwege zeldzaamheid). Eerste jaar totaal: €2.800-€4.500. Houd rekening met mogelijke extra reiskosten naar fokkers in Duitsland."
  }
};

// ===== 127. Braque de Weimar (Weimaraner) =====
export const weimaraner: BreedDetails = {
  breedName: "Weimaraner",
  breedNameNL: "Weimaraner (Braque de Weimar)",
  faqs: [
    {
      question: "Is een Weimaraner geschikt voor beginners?",
      answer: "Nee, Weimaraners zijn niet geschikt voor beginners. Ze zijn zeer intelligent maar koppig, hebben extreem veel beweging nodig en kunnen scheidingsangst ontwikkelen. Dit ras vereist een ervaren eigenaar die consequent kan zijn en veel tijd heeft."
    },
    {
      question: "Hoeveel beweging heeft een Weimaraner nodig?",
      answer: "Een Weimaraner heeft minimaal 2 uur intensieve beweging per dag nodig. Ze zijn gebouwd voor jagen en hebben lange afstanden nodig om te rennen. Ideaal zijn hardlopen, fietsen, jachttraining of canicross. Zonder voldoende beweging worden ze extreem destructief."
    },
    {
      question: "Waarom worden Weimaraners 'klittenband honden' genoemd?",
      answer: "Weimaraners staan bekend als 'Velcro dogs' (klittenband honden) omdat ze constant bij hun eigenaar willen zijn. Ze volgen je van kamer naar kamer en kunnen ernstige scheidingsangst ontwikkelen. Dit is geen ras voor mensen die vaak van huis zijn."
    },
    {
      question: "Zijn Weimaraners goed met kinderen?",
      answer: "Weimaraners kunnen goed met kinderen omgaan, maar hun hoge energie en formaat kunnen overweldigend zijn voor jonge kinderen. Ze doen het best met oudere kinderen (10+). Goede training en socialisatie zijn essentieel om overdreven enthousiasme te beheersen."
    },
    {
      question: "Verhaart een Weimaraner veel?",
      answer: "Weimaraners verharen matig het hele jaar door. Hun korte vacht is onderhoudsvriendelijk en vereist alleen wekelijks borstelen. Tijdens seizoenswisselingen verharen ze iets meer. Professionele grooming is niet nodig."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Weimaraners?",
      answer: "Weimaraners zijn gevoelig voor maagdilatatie-volvulus (maagtorsie), heupdysplasie, hypothyreoïdie, Von Willebrand ziekte en entropion (naar binnen gedraaide oogleden). Kies een fokker die ouderdieren screent. Maagtorsie is levensbedreigend – wees alert op symptomen."
    },
    {
      question: "Kunnen Weimaraners lang alleen zijn?",
      answer: "Absoluut niet. Weimaraners zijn beruchte 'schaduw honden' die ernstige scheidingsangst ontwikkelen als ze te lang alleen zijn. Ze kunnen destructief gedrag vertonen, blaffen en ontsnappen. Dit is geen ras voor mensen met lange werkdagen."
    },
    {
      question: "Hoe oud wordt een Weimaraner?",
      answer: "Een gezonde Weimaraner wordt gemiddeld 10 tot 13 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang leven leiden."
    }
  ],
  funFacts: [
    "Weimaraners hebben unieke 'spookachtige' zilver-grijze ogen die als pups blauw zijn en later amberklerig worden.",
    "Ze worden ook wel 'Gray Ghosts' (grijze spoken) genoemd vanwege hun zilverkleurige vacht en spookachtige stille gang.",
    "President Eisenhower had een Weimaraner genaamd Heidi die vrij rondliep in het Witte Huis.",
    "Fotograaf William Wegman maakte Weimaraners beroemd met zijn humoristische foto's en video's in menselijke kleding.",
    "Weimaraners kunnen snelheden tot 56 km/u bereiken.",
    "Het ras werd oorspronkelijk gefokt om groot wild zoals beren, herten en wilde zwijnen te jagen."
  ],
  history: {
    origin: "De Weimaraner ontstond in het begin van de 19e eeuw in Duitsland, aan het hof van de Groothertog Karl August van Saksen-Weimar-Eisenach. De Duitse adel wilde een exclusieve jachthond voor groot wild zoals beren, wolven en herten. De exacte afstamming is onduidelijk, maar waarschijnlijk werden Bloodhounds, Duitse jachthonden en mogelijk Pointer ingebracht.",
    development: "Het ras werd streng bewaakt door de Duitse adel en alleen beschikbaar voor leden van de exclusieve 'Weimaraner Club', opgericht in 1897. Leden mochten niet fokken met andere rassen en puppies buiten Duitsland verkopen was verboden. Deze strenge controle hield het ras zeldzaam en zuiver.\n\nNa de Eerste Wereldoorlog, toen groot wild schaars werd, begon men Weimaraners in te zetten voor vogeljacht. In 1929 importeerde Howard Knight de eerste Weimaraners naar Amerika, waar het ras werd erkend door de AKC in 1943. Na de Tweede Wereldoorlog won de Weimaraner aan populariteit als gezinshond en jachthond. Vandaag blijft het een geliefde maar uitdagende hond voor actieve eigenaren."
  },
  similarBreeds: [
    "Vizsla",
    "German Shorthaired Pointer",
    "Rhodesian Ridgeback",
    "Pointer"
  ],
  commonMistakes: [
    "Te weinig beweging: Weimaraners zijn extreem energiek en worden destructief zonder dagelijkse urenlange beweging.",
    "Te lang alleen laten: Dit is het grootste probleem. Weimaraners kunnen niet goed alleen zijn en ontwikkelen scheidingsangst.",
    "Geen vroege training: Hun intelligentie en koppigheid vereisen consequente training vanaf puppy leeftijd.",
    "Maagtorsie risico onderschatten: Voed meerdere kleine porties en vermijd beweging direct na eten. Maagtorsie is levensbedreigend.",
    "Geen mentale uitdaging: Ze vervelen zich snel zonder puzzels, training of zoekwerk.",
    "Slecht socialisatie: Zonder vroege socialisatie kunnen ze schuw, nerveus of zelfs agressief worden.",
    "Onderschatten van hun kracht: Weimaraners zijn groot en sterk. Zonder goede training kunnen ze aan de lijn trekken of springen."
  ],
  monthlyCosts: {
    food: "€70-€100",
    vet: "€30-€60",
    grooming: "€10-€20",
    insurance: "€30-€50",
    total: "€140-€230",
    note: "Weimaraners zijn grote honden en eten meer dan gemiddeld. Aanschafprijs pup: €1.000-€2.000. Eerste jaar totaal: €3.000-€5.000. Houd rekening met mogelijke hogere kosten voor gedragstraining, hondenopvang (ze kunnen niet goed alleen zijn) en eventuele maagtorsie chirurgie (€1.500-€3.000)."
  }
};

// ===== 128. Bracco Italiano =====
export const braccoItaliano: BreedDetails = {
  breedName: "Bracco Italiano",
  breedNameNL: "Bracco Italiano (Italiaanse Staande Hond)",
  faqs: [
    {
      question: "Is een Bracco Italiano geschikt voor beginners?",
      answer: "Een Bracco Italiano kan geschikt zijn voor beginners mits ze voldoende tijd hebben voor beweging en training. Bracco's zijn rustiger en gevoeliger dan andere pointers, wat ze makkelijker maakt, maar ze hebben wel consequente, vriendelijke training nodig."
    },
    {
      question: "Hoeveel beweging heeft een Bracco Italiano nodig?",
      answer: "Een Bracco Italiano heeft 1,5 tot 2 uur beweging per dag nodig. Ze zijn minder hyperactief dan andere pointers maar hebben wel lange wandelingen, zwemmen of jachtactiviteiten nodig. Ze genieten ook van mentale uitdaging zoals speurwerk."
    },
    {
      question: "Zijn Bracco Italianos goed met kinderen?",
      answer: "Ja, Bracco Italianos zijn uitstekend met kinderen. Ze zijn zachtaardig, geduldig en vriendelijk. Hun rustige temperament maakt ze geschikter voor gezinnen met jonge kinderen dan meer energieke pointers. Ze zijn beschermend maar niet agressief."
    },
    {
      question: "Verhaart een Bracco Italiano veel?",
      answer: "Bracco Italianos verharen matig. Hun korte, dichte vacht vereist wekelijks borstelen om losse haren te verwijderen. Tijdens seizoenswisselingen verharen ze iets meer. Hun hangende oren en gezichtsrimpels vereisen regelmatige reiniging."
    },
    {
      question: "Zijn Bracco Italianos makkelijk te trainen?",
      answer: "Bracco Italianos zijn intelligent en willen graag plezieren, maar ze zijn gevoelig en kunnen koppig zijn. Ze reageren het beste op positieve, vriendelijke training. Harde correcties kunnen ze doen 'afsluiten'. Geduld en consistentie zijn essentieel."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Bracco Italianos?",
      answer: "Bracco Italianos kunnen last hebben van heupdysplasie, elleboogdysplasie, entropion (naar binnen gedraaide oogleden), ectropion (naar buiten gedraaide oogleden) en oorinfecties. Kies een fokker die ouderdieren screent. Hun hangende oren vereisen regelmatige controle."
    },
    {
      question: "Kwijlen Bracco Italianos veel?",
      answer: "Ja, Bracco Italianos kwijlen matig tot veel vanwege hun losse lippen. Dit is normaal voor het ras. Houd een handdoek bij de hand, vooral na het drinken. Sommige exemplaren kwijlen meer dan anderen."
    },
    {
      question: "Hoe oud wordt een Bracco Italiano?",
      answer: "Een gezonde Bracco Italiano wordt gemiddeld 10 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang leven leiden."
    }
  ],
  funFacts: [
    "De Bracco Italiano is één van de oudste pointer rassen ter wereld, met afbeeldingen op Italiaanse kunstwerken uit de 5e eeuw.",
    "Ze hebben een unieke 'trotse gang' waarbij ze hun hoofd hoog houden – dit komt van eeuwenlang fokken als adellijke jachthonden.",
    "Bracco Italianos zijn uitstekende zwemmers en werden oorspronkelijk gebruikt voor waterjacht in de Italiaanse moerassen.",
    "Hun expressieve ogen en 'droevige' gezicht hebben ze de bijnaam 'Italiaanse hond met het treurige gezicht' opgeleverd.",
    "Het ras kwam bijna uit te sterven in de 20e eeuw maar werd gered door een groep toegewijde Italiaanse fokkers in de jaren '80.",
    "Bracco's hebben een bijzonder diep, melodieus geblaf dat wordt beschreven als 'zangerig'."
  ],
  history: {
    origin: "De Bracco Italiano is één van de oudste Europese jachthondenrassen en stamt af van honden die al in de 5e eeuw voor Christus werden gebruikt in Italië. Het ras ontstond uit kruisingen tussen de Segugio Italiano (Italiaanse speurhond) en Aziatische mastiff-type honden die door handelaren werden geïmporteerd. Afbeeldingen op Italiaanse kunstwerken uit de Renaissance tonen honden die sterk lijken op de moderne Bracco.",
    development: "Tijdens de Renaissance werd de Bracco Italiano gefokt door Italiaanse adel, met name de families Medici en Gonzaga. Er waren twee variëteiten: de lichtere, snellere Bracco uit Piëmont en de zwaardere, krachtigere Bracco uit Lombardije. Deze werden later samengevoegd tot één ras.\n\nHet ras werd in 1949 officieel erkend door de ENCI (Ente Nazionale della Cinofilia Italiana). Na bijna uitsterven in de 20e eeuw door oorlog en verwaarlozing, werd het ras in de jaren '80 nieuw leven ingeblazen door toegewijde fokkers. In 1994 werd de Bracco erkend door de FCI. Vandaag wint het ras aan populariteit buiten Italië als jachthond en gezinshond."
  },
  similarBreeds: [
    "German Shorthaired Pointer",
    "Vizsla",
    "Spinone Italiano",
    "English Pointer"
  ],
  commonMistakes: [
    "Te harde training: Bracco's zijn gevoelig en reageren slecht op strenge correcties. Gebruik altijd positieve bekrachtiging.",
    "Oren verwaarlozen: Hun hangende oren zijn gevoelig voor infecties. Controleer en reinig ze wekelijks.",
    "Te weinig beweging: Ondanks hun rustige uiterlijk hebben ze dagelijks flinke beweging nodig.",
    "Geen vroege socialisatie: Zonder socialisatie kunnen ze schuw of nerveus worden.",
    "Kwijl onderschatten: Bereid je voor op regelmatig afvegen en kwijlvlekken.",
    "Te lang alleen laten: Bracco's zijn sociale honden die gezelschap nodig hebben."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€50",
    grooming: "€15-€30",
    insurance: "€25-€40",
    total: "€125-€210",
    note: "Bracco Italianos hebben matige onderhoudskosten. Aanschafprijs pup: €1.200-€2.000 (kan hoger zijn vanwege zeldzaamheid in België). Eerste jaar totaal: €2.800-€4.500. Houd rekening met mogelijke kosten voor oor- en oogproblemen."
  }
};

// ===== 129. Spinone Italiano =====
export const spinoneItaliano: BreedDetails = {
  breedName: "Spinone Italiano",
  breedNameNL: "Spinone Italiano (Italiaanse Griffon)",
  faqs: [
    {
      question: "Is een Spinone Italiano geschikt voor beginners?",
      answer: "Ja, de Spinone Italiano is één van de meest geschikte jachthonden voor beginners. Ze zijn rustig, geduldig en willen graag plezieren. Hun vriendelijke karakter en matige energie niveau maken ze makkelijker dan de meeste pointers."
    },
    {
      question: "Hoeveel beweging heeft een Spinone Italiano nodig?",
      answer: "Een Spinone Italiano heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn rustiger dan de meeste jachthonden en genieten van gematigde wandelingen en zwemmen. Ze zijn ook tevreden met mentale uitdaging zoals speurwerk of training."
    },
    {
      question: "Zijn Spinone Italianos goed met kinderen?",
      answer: "Ja, Spinone Italianos zijn uitstekend met kinderen. Ze zijn geduldig, vriendelijk en beschermend. Hun rustige temperament en tolerantie maken ze ideaal voor gezinnen met kinderen van alle leeftijden. Ze zijn zelden agressief of overdreven enthousiast."
    },
    {
      question: "Verhaart een Spinone Italiano veel?",
      answer: "Spinone Italianos verharen minimaal als ze regelmatig gehand-stript worden. Hun ruwe, dichte vacht vereist wel onderhoud: wekelijks borstelen en hand-strippen elke 3-4 maanden. Zonder strippen kunnen ze verhaaren en klitten."
    },
    {
      question: "Zijn Spinone Italianos makkelijk te trainen?",
      answer: "Spinone Italianos zijn intelligent en willen graag plezieren, maar ze kunnen koppig en traag zijn. Ze hebben geduld en consistente, vriendelijke training nodig. Ze werken in hun eigen tempo – verwacht geen snelle resultaten zoals bij Border Collies."
    },
    {
      question: "Kwijlen Spinone Italianos veel?",
      answer: "Ja, Spinone Italianos kwijlen matig tot veel vanwege hun losse lippen en baard. Ze maken ook een rommel bij water drinken doordat hun baard water vasthoudt. Houd een handdoek bij de hand."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Spinone Italianos?",
      answer: "Spinone Italianos kunnen last hebben van heupdysplasie, elleboogdysplasie, cerebellar ataxie (neurologische aandoening), hypothyreoïdie en maagdilatatie-volvulus (maagtorsie). Kies een fokker die ouderdieren screent, vooral voor cerebellar ataxie."
    },
    {
      question: "Hoe oud wordt een Spinone Italiano?",
      answer: "Een gezonde Spinone Italiano wordt gemiddeld 10 tot 12 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en gelukkig leven leiden."
    }
  ],
  funFacts: [
    "De Spinone Italiano is één van de oudste jachthondenrassen en wordt al vermeld in geschriften uit de Renaissance.",
    "Hun naam komt van het Italiaanse woord 'spinoso', wat 'doornig' betekent – ze werden gefokt om te jagen in doornige struiken.",
    "Spinone's hebben een unieke 'menselijke' uitdrukking dankzij hun borstelige wenkbrauwen en baard.",
    "Ze zijn uitstekende zwemmers en hun waterafstotende vacht maakt ze perfect voor waterjacht.",
    "Ondanks hun lome uiterlijk zijn Spinone's krachtige zwemmers die urenlang kunnen jagen.",
    "Hun ruwe vacht beschermt ze tegen doorns, insectenbeten en kou – ze kunnen jagen bij temperaturen onder nul."
  ],
  history: {
    origin: "De Spinone Italiano is één van de oudste Europese jachthondenrassen met wortels die teruggaan tot de Romeinse tijd. Het ras ontstond in de Piëmont regio van Italië en werd ontwikkeld als veelzijdige jachthond voor ruw, doornig terrein en moerassen. De naam 'Spinone' komt van het Italiaanse 'spinoso' (doornig), verwijzend naar de dichte struiken waarin ze jaagden.",
    development: "Spinone Italianos werden gefokt door Italiaanse jagers die een robuuste, geduldige hond nodig hadden met een beschermende vacht. Het ras werd verfijnd door kruisingen met Franse griffons en mogelijk oude Italiaanse setters. Hun ruwe draad haar beschermde ze tegen doorns en koud water.\n\nHet ras werd officieel erkend door de ENCI in 1949 en door de FCI in 1955. Na de Tweede Wereldoorlog kwam het ras bijna uit te sterven, maar werd gered door toegewijde fokkers. In 2000 werd de Spinone erkend door de AKC. Vandaag wordt het ras gewaardeerd als vriendelijke, veelzijdige jachthond en gezinshond, vooral in Europa."
  },
  similarBreeds: [
    "German Wirehaired Pointer",
    "Wirehaired Pointing Griffon (Korthals)",
    "Bracco Italiano",
    "Cesky Fousek"
  ],
  commonMistakes: [
    "Vacht scheren in plaats van strippen: Scheren beschadigt de waterafstotende eigenschappen. Hand-strippen is nodig.",
    "Te weinig geduld bij training: Spinone's leren in hun eigen tempo. Forceren werkt niet.",
    "Kwijl onderschatten: Bereid je voor op dagelijks afvegen en natte baarden.",
    "Oren en baard verwaarlozen: Hun baard houdt vuil en water vast. Reinig dagelijks. Controleer oren wekelijks.",
    "Te veel beweging als pup: Hun gewrichten ontwikkelen tot 18 maanden. Vermijd intensieve sport bij jonge honden.",
    "Geen vroege socialisatie: Zonder socialisatie kunnen ze schuw worden.",
    "Maagtorsie risico negeren: Voed meerdere kleine porties en vermijd beweging direct na eten."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€50",
    grooming: "€40-€80",
    insurance: "€25-€45",
    total: "€150-€265",
    note: "Hand-strippen kost €50-€80 per sessie (elke 3-4 maanden). Aanschafprijs pup: €1.200-€2.000. Eerste jaar totaal: €2.800-€4.500. Houd rekening met kosten voor genetische screening (cerebellar ataxie) en mogelijke gezondheidskosten."
  }
};

// ===== 130. Korthals (Duitshaar) =====
export const korthals: BreedDetails = {
  breedName: "Wirehaired Pointing Griffon",
  breedNameNL: "Korthals (Griffon d'arrêt à poil dur)",
  faqs: [
    {
      question: "Wat is het verschil tussen een Korthals en een Duits Draad haar?",
      answer: "Hoewel beide rassen draad haar hebben, is de Korthals (Wirehaired Pointing Griffon) lichter, heeft een langere vacht en werd in Frankrijk gefokt, terwijl Duits Draad haar zwaarder is en in Duitsland werd ontwikkeld. Korthals heeft ook een vriendelijker, minder intens temperament."
    },
    {
      question: "Is een Korthals geschikt voor beginners?",
      answer: "Een Korthals kan geschikt zijn voor gemotiveerde beginners. Ze zijn vriendelijker en rustiger dan de meeste pointers, willen graag plezieren en zijn minder koppig. Ze hebben wel veel beweging en mentale uitdaging nodig."
    },
    {
      question: "Hoeveel beweging heeft een Korthals nodig?",
      answer: "Een Korthals heeft 1,5 tot 2 uur beweging per dag nodig. Ze houden van lange wandelingen, zwemmen, jachttraining en hondensporten. Ze zijn minder hyperactief dan Duits Korthaar maar hebben wel dagelijkse uitdaging nodig."
    },
    {
      question: "Verhaart een Korthals veel?",
      answer: "Korthals verharen minimaal als ze regelmatig gehand-stript worden (overtollig haar verwijderen). Hun ruwe, waterafstotende vacht vereist wel onderhoud: wekelijks borstelen en hand-strippen elke 3-4 maanden. Zonder strippen verharen ze meer."
    },
    {
      question: "Zijn Korthals honden goed met kinderen?",
      answer: "Ja, Korthals zijn uitstekend met kinderen. Ze zijn geduldig, vriendelijk en beschermend. Hun gematigde energie niveau en tolerantie maken ze geschikter voor gezinnen dan de meeste andere pointers. Ze zijn zelden agressief."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Korthals?",
      answer: "Korthals kunnen last hebben van heupdysplasie, elleboogdysplasie, hypothyreoïdie en oogproblemen zoals progressieve retina-atrofie (PRA). Kies een fokker die ouderdieren screent. Ze zijn over het algemeen gezond."
    },
    {
      question: "Kunnen Korthals goed zwemmen?",
      answer: "Ja, Korthals zijn uitstekende zwemmers. Hun waterafstotende vacht en natuurlijke zwemvaardigheid maken ze perfect voor waterjacht. Ze houden van zwemmen en apporteren uit het water."
    },
    {
      question: "Hoe oud wordt een Korthals?",
      answer: "Een gezonde Korthals wordt gemiddeld 12 tot 15 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en actief leven leiden."
    }
  ],
  funFacts: [
    "De Korthals werd ontwikkeld door Eduard Karel Korthals, een Nederlandse hondenliefhebber die in Frankrijk woonde – daarom is het ras Frans maar heeft een Nederlandse naam.",
    "Korthals startte zijn fokprogramma in 1873 met slechts 7 honden en hield nauwkeurige aantekeningen van elke kruising.",
    "Hun vacht is zo waterafstotend dat ze na zwemmen binnen enkele minuten droog zijn.",
    "Korthals zijn één van de meest veelzijdige jachthonden en kunnen pointen, apporteren en sporen op land én in water.",
    "Hun 'menselijke' gezicht met borstelige wenkbrauwen en baard maakt ze zeer expressief.",
    "Korthals worden vaak ingezet als reddingshonden en therapiehonden vanwege hun vriendelijke karakter."
  ],
  history: {
    origin: "De Korthals (Wirehaired Pointing Griffon) werd ontwikkeld in de late 19e eeuw door Eduard Karel Korthals, een Nederlandse hondenliefhebber die in Frankrijk woonde. Korthals wilde een veelzijdige jachthond creëren met een beschermende draad vacht die kon werken in alle weersomstandigheden. Hij startte zijn fokprogramma in 1873 met 7 zorgvuldig geselecteerde honden.",
    development: "Korthals kruiste oude Franse en Duitse griffons met spaniels en setters. Hij hield nauwkeurige aantekeningen van elke kruising en selecteerde streng op jachtvermogen, vacht kwaliteit en temperament. Het resultaat was een hond met een ruw, waterafstotend draad haar die kon pointen, apporteren en sporen.\n\nHet ras werd officieel erkend in Frankrijk in 1887 en werd populair als 'Griffon d'arrêt à poil dur Korthals' (Korthals' ruwharige staande hond). In 1916 werd het ras erkend door de AKC als 'Wirehaired Pointing Griffon'. Vandaag is de Korthals populair als veelzijdige jachthond en gezinshond, vooral in Europa en Noord-Amerika."
  },
  similarBreeds: [
    "German Wirehaired Pointer",
    "Spinone Italiano",
    "Pudelpointer",
    "Cesky Fousek"
  ],
  commonMistakes: [
    "Vacht scheren in plaats van strippen: Scheren beschadigt de waterafstotende eigenschappen. Hand-strippen is essentieel.",
    "Te weinig beweging: Hoewel rustiger dan sommige pointers, hebben ze wel dagelijks intensieve beweging nodig.",
    "Geen mentale uitdaging: Ze vervelen zich zonder training, zoekwerk of puzzels.",
    "Baard en oren verwaarlozen: Hun baard houdt vuil en water vast. Reinig dagelijks. Controleer oren wekelijks op infecties.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze schuw worden.",
    "Jachtinstinct onderschatten: Ze zullen vogels en klein wild achternazitten zonder goede training."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€45",
    grooming: "€40-€80",
    insurance: "€25-€40",
    total: "€150-€255",
    note: "Hand-strippen kost €50-€80 per sessie (elke 3-4 maanden). Aanschafprijs pup: €1.000-€1.800. Eerste jaar totaal: €2.600-€4.200. Korthals zijn schaars in België, dus mogelijk zijn extra reiskosten naar fokkers nodig."
  }
};

// ===== 131. Pudelpointer =====
export const pudelpointer: BreedDetails = {
  breedName: "Pudelpointer",
  breedNameNL: "Pudelpointer",
  faqs: [
    {
      question: "Is een Pudelpointer geschikt voor beginners?",
      answer: "Een Pudelpointer kan geschikt zijn voor gemotiveerde beginners met een actieve levensstijl. Ze zijn intelligenter en willen meer plezieren dan de meeste pointers, maar hebben wel veel beweging en mentale uitdaging nodig. Ervaring met honden is een pluspunt."
    },
    {
      question: "Hoeveel beweging heeft een Pudelpointer nodig?",
      answer: "Een Pudelpointer heeft minimaal 1,5 tot 2 uur beweging per dag nodig. Ze houden van hardlopen, zwemmen, jachttraining en hondensporten. Ze zijn atletisch en hebben zowel fysieke als mentale uitdaging nodig om gelukkig te zijn."
    },
    {
      question: "Verhaart een Pudelpointer veel?",
      answer: "Pudelpointers verharen minimaal tot matig, afhankelijk van hun vacht type (sommigen hebben meer poedelachtig haar, anderen meer pointer haar). Ze vereisen regelmatig borstelen (2-3x per week) en hand-strippen elke 3-4 maanden om de vacht gezond te houden."
    },
    {
      question: "Zijn Pudelpointers goed met kinderen?",
      answer: "Ja, Pudelpointers zijn vriendelijk en geduldig met kinderen. Ze zijn speels en beschermend, maar hun enthousiasme kan overweldigend zijn voor jonge kinderen. Ze doen het best met oudere kinderen die actief zijn. Goede training is belangrijk."
    },
    {
      question: "Zijn Pudelpointers makkelijk te trainen?",
      answer: "Ja, Pudelpointers zijn zeer intelligent en willen graag plezieren, wat ze makkelijker maakt om te trainen dan de meeste jachthonden. Ze reageren goed op positieve bekrachtiging en leren snel. Hun jachtinstinct kan wel afleidend werken."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Pudelpointers?",
      answer: "Pudelpointers zijn over het algemeen gezond, maar kunnen last hebben van heupdysplasie, elleboogdysplasie en oogproblemen. Kies een fokker die ouderdieren screent. Het ras heeft minder erfelijke problemen dan veel andere jachthonden."
    },
    {
      question: "Zijn Pudelpointers zeldzaam?",
      answer: "Ja, Pudelpointers zijn vrij zeldzaam, vooral buiten Duitsland en Noord-Amerika. Fokkers zijn schaars in België, dus wachtlijsten zijn gebruikelijk. Het ras is vooral populair bij jagers vanwege zijn veelzijdigheid."
    },
    {
      question: "Hoe oud wordt een Pudelpointer?",
      answer: "Een gezonde Pudelpointer wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en actief leven leiden."
    }
  ],
  funFacts: [
    "De Pudelpointer is een kruising tussen de Pointer (voor jachtinstinct) en Poedel (voor intelligentie en waterwerk) – het beste van twee werelden.",
    "Het ras werd in slechts 30 jaar (1881-1910) gestandaardiseerd – ongewoon snel voor hondenrassen.",
    "Pudelpointers hebben een 'baard' en borstelige wenkbrauwen die hun gezicht een karakteristieke uitdrukking geven.",
    "Ze zijn één van de meest veelzijdige jachthonden en kunnen gebruikt worden voor alle typen jacht: vogels, wild, water en land.",
    "Hun waterafstotende vacht komt van de poedel-kant en maakt ze uitstekende zwemmers.",
    "Pudelpointers zijn populair bij falconiers (valkeniers) omdat ze natuurlijk samenwerken met roofvogels."
  ],
  history: {
    origin: "De Pudelpointer werd ontwikkeld in Duitsland in de late 19e eeuw door Baron von Zedlitz. Hij wilde een veelzijdige jachthond creëren die het beste van twee rassen combineerde: de jachtinstincten en neus van de Pointer en de intelligentie, trainbaarheid en waterwerk van de Poedel (specifiek de oude Duitse jachtpoedel, de Barbet).",
    development: "Von Zedlitz begon in 1881 met het kruisen van 7 Pointers en 90 Poedels (voornamelijk bruine en zwarte jachtpoedels). Hij selecteerde streng op jachtprestaties, vachtkwaliteit en karakter. Na 30 jaar fokwerk was het ras gestabiliseerd en werd het in 1910 officieel erkend in Duitsland.\n\nDe Pudelpointer bleef populair in Duitsland als jachthond maar was lange tijd onbekend buiten Europa. In 1956 werden de eerste Pudelpointers geïmporteerd naar Noord-Amerika door de familie Bodo Winterhelt. Het ras werd erkend door de UKC in 1995, maar is nog niet erkend door de AKC. Vandaag groeit de populariteit van de Pudelpointer als veelzijdige jachthond en actieve gezinshond."
  },
  similarBreeds: [
    "German Wirehaired Pointer",
    "Wirehaired Pointing Griffon (Korthals)",
    "Spinone Italiano",
    "German Shorthaired Pointer"
  ],
  commonMistakes: [
    "Te weinig beweging: Pudelpointers zijn atleten en hebben dagelijks intensieve beweging nodig.",
    "Geen mentale uitdaging: Hun intelligentie vereist regelmatige puzzels, training of zoekwerk.",
    "Vacht onderhoud verwaarlozen: Hun vacht moet regelmatig geborsteld en gehand-stript worden.",
    "Jachtinstinct onderschatten: Ze zullen vogels en klein wild achternazitten zonder goede training.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze schuw of gereserveerd worden.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€45",
    grooming: "€40-€80",
    insurance: "€25-€40",
    total: "€150-€255",
    note: "Hand-strippen kost €50-€80 per sessie (elke 3-4 maanden). Aanschafprijs pup: €1.200-€2.000 (kan hoger zijn vanwege zeldzaamheid). Eerste jaar totaal: €2.800-€4.500. Mogelijk extra kosten voor import uit Duitsland of Noord-Amerika."
  }
};

// ===== 132. Small Munsterlander =====
export const smallMunsterlander: BreedDetails = {
  breedName: "Small Munsterlander",
  breedNameNL: "Kleine Münsterländer",
  faqs: [
    {
      question: "Is een Small Munsterlander geschikt voor beginners?",
      answer: "Een Small Munsterlander is niet ideaal voor beginners. Ze zijn intelligent maar hebben veel beweging, mentale uitdaging en consequente training nodig. Dit is een ras voor ervaren hondeneigenaren met een actieve levensstijl en bij voorkeur jachtervaring."
    },
    {
      question: "Hoeveel beweging heeft een Small Munsterlander nodig?",
      answer: "Een Small Munsterlander heeft minimaal 2 uur intensieve beweging per dag nodig. Ze zijn gebouwd voor jagen en hebben lange afstanden nodig om te rennen. Ideaal zijn jachttraining, agility, hardlopen of lange wandelingen. Zonder voldoende beweging worden ze ongelukkig."
    },
    {
      question: "Verhaart een Small Munsterlander veel?",
      answer: "Ja, Small Munsterlanders verharen matig tot veel. Hun lange, zijdeachtige vacht vereist regelmatig onderhoud: borstel 3-4x per week om klitten te voorkomen, vooral achter de oren en aan de veren. Professionele trimming elke 6-8 weken wordt aangeraden."
    },
    {
      question: "Zijn Small Munsterlanders goed met kinderen?",
      answer: "Ja, Small Munsterlanders zijn vriendelijk en speels met kinderen. Ze zijn loyaal en beschermend, maar hun hoge energie kan overweldigend zijn voor jonge kinderen. Ze doen het best in gezinnen met oudere, actieve kinderen. Goede training is essentieel."
    },
    {
      question: "Zijn Small Munsterlanders makkelijk te trainen?",
      answer: "Small Munsterlanders zijn intelligent en leergierig, maar hun sterke jachtinstinct kan afleidend werken. Ze reageren goed op positieve bekrachtiging en consistente training. Ze zijn niet het makkelijkste ras voor beginners vanwege hun concentratie uitdagingen."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Small Munsterlanders?",
      answer: "Small Munsterlanders kunnen last hebben van heupdysplasie, elleboogdysplasie, oogproblemen (cataract, progressieve retina-atrofie), epilepsie en schildklieraandoeningen. Kies een fokker die ouderdieren screent. Ze zijn over het algemeen gezond."
    },
    {
      question: "Zijn Small Munsterlanders zeldzaam?",
      answer: "Ja, Small Munsterlanders zijn vrij zeldzaam, vooral buiten Duitsland. Het ras is vooral populair bij jagers en in jachtkringen. Fokkers zijn schaars in België, dus wachtlijsten zijn gebruikelijk."
    },
    {
      question: "Hoe oud wordt een Small Munsterlander?",
      answer: "Een gezonde Small Munsterlander wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en actief leven leiden."
    }
  ],
  funFacts: [
    "Small Munsterlanders komen altijd in bruin-wit – er zijn geen andere kleuren erkend.",
    "Ondanks hun naam zijn ze niet gewoon 'kleine versies' van Large Munsterlanders – het zijn verschillende rassen met andere oorsprongen.",
    "Ze hebben een uitzonderlijk geheugen en kunnen jachtgebieden herinneren die ze jaren niet hebben bezocht.",
    "Small Munsterlanders zijn één van de weinige jachthonden die zowel kunnen pointen als apporteren.",
    "Het ras was bijna uitgestorven in de vroege 20e eeuw maar werd gered door een groep toegewijde fokkers in Münster.",
    "Hun franje (veren) aan oren, borst, buik en staart maakt ze visueel herkenbaar en eleganter dan kortharige pointers."
  ],
  history: {
    origin: "De Small Munsterlander (Kleine Münsterländer) ontstond in de 19e eeuw in de regio Münster in Noordwest-Duitsland. Het ras ontwikkelde zich uit middeleeuwse vogelhonden en lokale spaniels die werden gebruikt door boeren en jagers voor het opsporen van vogels en klein wild. Ze werden gefokt voor veelzijdigheid: pointen, apporteren en sporen.",
    development: "In de vroege 20e eeuw stond het ras op het punt uit te sterven omdat fokkers zich concentreerden op grotere jachthonden. In 1912 richtte Edmund Löns de 'Verein für Kleine Münsterländer Vorstehhunde' op om het ras te redden. Hij stelde strenge fokstandaarden op met nadruk op jachtprestaties en het behouden van de bruin-witte kleur.\n\nHet ras werd officieel erkend in Duitsland in 1921 en door de FCI in 1954. Small Munsterlanders bleven vooral populair in Duitsland en werden pas in de jaren '60 geïmporteerd naar Noord-Amerika. Het ras werd erkend door de UKC in 2006, maar is nog niet erkend door de AKC. Vandaag is de Small Munsterlander een gewaardeerde jachthond en veelzijdige gezelschapshond, vooral in jachtkringen."
  },
  similarBreeds: [
    "Large Munsterlander",
    "English Springer Spaniel",
    "Epagneul Breton",
    "German Longhaired Pointer"
  ],
  commonMistakes: [
    "Te weinig beweging: Small Munsterlanders zijn jachthonden en hebben dagelijks urenlange beweging nodig.",
    "Vacht onderhoud verwaarlozen: Hun lange vacht klitteen snel zonder regelmatig borstelen, vooral achter de oren.",
    "Geen mentale uitdaging: Ze vervelen zich zonder training, zoekwerk of puzzels en worden destructief.",
    "Jachtinstinct onderschatten: Ze zullen alles achternazitten zonder goede training en afroep oefening.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze schuw of nerveus worden.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€25-€45",
    grooming: "€50-€90",
    insurance: "€25-€40",
    total: "€150-€255",
    note: "Professionele trimming kost €60-€90 per sessie (elke 6-8 weken). Aanschafprijs pup: €1.000-€1.800 (kan hoger zijn vanwege zeldzaamheid). Eerste jaar totaal: €2.600-€4.200. Mogelijk extra reiskosten naar fokkers in Duitsland."
  }
};

// ===== 133. Large Munsterlander =====
export const largeMunsterlander: BreedDetails = {
  breedName: "Large Munsterlander",
  breedNameNL: "Grote Münsterländer",
  faqs: [
    {
      question: "Wat is het verschil tussen Large en Small Munsterlander?",
      answer: "Large Munsterlanders zijn groter (58-65 cm vs 50-56 cm), zwaarder (25-32 kg vs 15-22 kg) en hebben zwart-witte vacht in plaats van bruin-wit. Ze zijn ook verschillende rassen met andere oorsprongen, niet gewoon grote en kleine versies van hetzelfde ras."
    },
    {
      question: "Is een Large Munsterlander geschikt voor beginners?",
      answer: "Large Munsterlanders zijn niet ideaal voor beginners. Ze zijn intelligent maar koppig, hebben veel beweging en mentale uitdaging nodig, en vereisen consequente training. Dit ras is geschikt voor ervaren hondeneigenaren met een actieve levensstijl."
    },
    {
      question: "Hoeveel beweging heeft een Large Munsterlander nodig?",
      answer: "Een Large Munsterlander heeft minimaal 2 uur intensieve beweging per dag nodig. Ze zijn gebouwd voor jagen en hebben lange afstanden nodig. Ideaal zijn jachttraining, agility, hardlopen of zwemmen. Zonder voldoende beweging worden ze destructief."
    },
    {
      question: "Verhaart een Large Munsterlander veel?",
      answer: "Ja, Large Munsterlanders verharen matig tot veel. Hun lange, glanzende vacht vereist regelmatig onderhoud: borstel 3-4x per week om klitten te voorkomen. Tijdens seizoenswisselingen verharen ze intensiever. Professionele trimming elke 6-8 weken helpt."
    },
    {
      question: "Zijn Large Munsterlanders goed met kinderen?",
      answer: "Ja, Large Munsterlanders zijn vriendelijk, geduldig en beschermend met kinderen. Ze zijn loyaal en vormen sterke banden met hun gezin. Hun formaat en energie kunnen overweldigend zijn voor jonge kinderen. Ze doen het best met oudere kinderen."
    },
    {
      question: "Zijn Large Munsterlanders makkelijk te trainen?",
      answer: "Large Munsterlanders zijn intelligent en leergierig, maar hun koppigheid en sterke jachtinstinct kunnen uitdagend zijn. Ze reageren goed op positieve, consistente training. Ervaring met jachthonden is een pluspunt."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Large Munsterlanders?",
      answer: "Large Munsterlanders kunnen last hebben van heupdysplasie, elleboogdysplasie, oogproblemen (cataract), hypothyreoïdie en oorinfecties (door hangende oren). Kies een fokker die ouderdieren screent. Ze zijn over het algemeen robuust."
    },
    {
      question: "Hoe oud wordt een Large Munsterlander?",
      answer: "Een gezonde Large Munsterlander wordt gemiddeld 11 tot 13 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en actief leven leiden."
    }
  ],
  funFacts: [
    "Large Munsterlanders komen altijd in zwart-wit met ticking (spikkels) – geen andere kleuren zijn erkend.",
    "Ze werden oorspronkelijk 'zwarte Duitse Langhaars' genoemd voordat ze hun huidige naam kregen.",
    "Large Munsterlanders zijn uitstekende zwemmers en worden vaak ingezet voor waterjacht op eenden.",
    "Het ras is zeer populair in Duitsland maar relatief onbekend in de rest van de wereld.",
    "Ze hebben een 'zachte bek' en kunnen zelfs een rauw ei vasthouden zonder het te breken.",
    "Large Munsterlanders zijn één van de meest veelzijdige jachthonden en kunnen alle typen jacht aan: vogels, klein wild en groot wild."
  ],
  history: {
    origin: "De Large Munsterlander (Große Münsterländer) ontstond in de late 19e eeuw in de regio Münster in Noordwest-Duitsland. Het ras ontwikkelde zich uit Duitse Langhaars (German Longhaired Pointers) die zwart-wit waren in plaats van bruin-wit. In 1878 besloot de Duitse Langhaar Club om alleen bruin-witte honden te erkennen, waardoor zwart-witte exemplaren werden uitgesloten.",
    development: "Fokkers in Münster bleven zwart-witte langharige jachthonden fokken omdat deze kleur populair was bij jagers. In 1919 werd de 'Verein für Große Münsterländer Vorstehhunde' opgericht om het ras officieel te erkennen en te standaardiseren. De fokkers legden de nadruk op jachtprestaties, veelzijdigheid en het zwart-witte kleurpatroon.\n\nHet ras werd officieel erkend in Duitsland in 1922 en door de FCI in 1954. Large Munsterlanders werden geïmporteerd naar Groot-Brittannië in de jaren '70 en naar Noord-Amerika in de jaren '80. Het ras werd erkend door de UKC in 2006 en door de AKC in 2006. Vandaag is de Large Munsterlander een gewaardeerde jachthond en gezinshond, vooral in Duitsland en Groot-Brittannië."
  },
  similarBreeds: [
    "German Longhaired Pointer",
    "Small Munsterlander",
    "English Setter",
    "Gordon Setter"
  ],
  commonMistakes: [
    "Te weinig beweging: Large Munsterlanders zijn jachthonden en raken gefrustreerd zonder dagelijks urenlange beweging.",
    "Vacht onderhoud verwaarlozen: Hun lange vacht klitteen snel zonder regelmatig borstelen, vooral aan de veren.",
    "Geen mentale uitdaging: Ze vervelen zich zonder training, zoekwerk of puzzels.",
    "Jachtinstinct onderschatten: Ze zullen vogels en wild achternazitten zonder goede afroep training.",
    "Oren verwaarlozen: Hun hangende oren zijn gevoelig voor infecties. Controleer en reinig ze wekelijks.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze schuw of gereserveerd worden.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben."
  ],
  monthlyCosts: {
    food: "€60-€90",
    vet: "€25-€50",
    grooming: "€50-€90",
    insurance: "€25-€45",
    total: "€160-€275",
    note: "Professionele trimming kost €60-€90 per sessie (elke 6-8 weken). Aanschafprijs pup: €1.000-€1.800. Eerste jaar totaal: €2.800-€4.500. Houd rekening met mogelijke extra kosten voor jachttraining en eventuele oorinfecties."
  }
};

// ===== 134. Epagneul Breton =====
export const epagneulBreton: BreedDetails = {
  breedName: "Brittany",
  breedNameNL: "Epagneul Breton (Bretonse Spaniel)",
  faqs: [
    {
      question: "Is een Epagneul Breton geschikt voor beginners?",
      answer: "Een Epagneul Breton kan geschikt zijn voor gemotiveerde beginners met een actieve levensstijl. Ze zijn vriendelijker en willen meer plezieren dan de meeste jachthonden, maar hebben wel veel beweging en mentale uitdaging nodig."
    },
    {
      question: "Hoeveel beweging heeft een Epagneul Breton nodig?",
      answer: "Een Epagneul Breton heeft minimaal 1,5 tot 2 uur beweging per dag nodig. Ze zijn zeer energiek en houden van hardlopen, zwemmen, agility en jachttraining. Zonder voldoende beweging kunnen ze hyperactief en destructief worden."
    },
    {
      question: "Verhaart een Epagneul Breton veel?",
      answer: "Epagneul Bretons verharen matig. Hun middellange vacht is relatief onderhoudsvriendelijk en vereist 2-3x per week borstelen om losse haren te verwijderen. Tijdens seizoenswisselingen verharen ze meer. Lichte trimming helpt de vacht netjes te houden."
    },
    {
      question: "Zijn Epagneul Bretons goed met kinderen?",
      answer: "Ja, Epagneul Bretons zijn uitstekend met kinderen. Ze zijn vriendelijk, speels en geduldig. Hun energie en enthousiasme maken ze perfect voor actieve gezinnen. Ze doen het best met kinderen die mee kunnen rennen en spelen."
    },
    {
      question: "Zijn Epagneul Bretons makkelijk te trainen?",
      answer: "Ja, Epagneul Bretons zijn intelligent en willen graag plezieren, wat ze relatief makkelijk maakt om te trainen. Ze reageren uitstekend op positieve bekrachtiging. Hun gevoeligheid betekent dat harde correcties averechts werken."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Epagneul Bretons?",
      answer: "Epagneul Bretons kunnen last hebben van heupdysplasie, epilepsie, hypothyreoïdie en oogproblemen zoals progressieve retina-atrofie (PRA). Kies een fokker die ouderdieren screent. Ze zijn over het algemeen gezond."
    },
    {
      question: "Hebben alle Epagneul Bretons een korte staart?",
      answer: "Veel Epagneul Bretons worden geboren met een natuurlijk korte staart of geen staart (bobbed tail). Sommige worden geboren met een lange staart die vroeger werd gecoupeerd, maar dit is nu verboden in veel landen, waaronder België."
    },
    {
      question: "Hoe oud wordt een Epagneul Breton?",
      answer: "Een gezonde Epagneul Breton wordt gemiddeld 12 tot 15 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en actief leven leiden."
    }
  ],
  funFacts: [
    "Epagneul Bretons zijn de kleinste van alle Franse jachthonden, maar wat ze missen in grootte maken ze goed in energie.",
    "Ongeveer 10-15% van Epagneul Bretons wordt geboren zonder staart (natuurlijke bobtail).",
    "Ze zijn één van de populairste jachthonden in Frankrijk en Noord-Amerika.",
    "Epagneul Bretons kunnen zowel pointen als apporteren – een zeldzame combinatie voor spaniels.",
    "Het ras wordt soms gewoon 'Brittany' genoemd in Engelssprekende landen (zonder 'Spaniel' omdat ze pointen zoals setters).",
    "Ze hebben een ongelooflijke neus en worden vaak ingezet als speurhonden voor zoek- en reddingsoperaties."
  ],
  history: {
    origin: "De Epagneul Breton (Brittany) ontstond in de 17e eeuw in de regio Bretagne in Noordwest-Frankrijk. Het ras ontwikkelde zich uit lokale Franse spaniels die werden gebruikt door boeren en stropers voor het jagen op vogels en klein wild. Deze honden waren compact, energiek en veelzijdig – ideaal voor het ruige Bretonse landschap.",
    development: "In de 19e eeuw kruisten Franse fokkers Bretonse spaniels met Engelse Setters en Pointers die werden geïmporteerd door Britse jagers. Dit leidde tot een compactere hond met de pointing instincten van setters en de apporteer vaardigheden van spaniels. Het eerste officiële exemplaar werd geregistreerd in 1907.\n\nHet ras werd erkend door de Société Centrale Canine (Franse Kennel Club) in 1907 en door de AKC in 1934. In Amerika werd de naam veranderd van 'Brittany Spaniel' naar gewoon 'Brittany' in 1982 omdat het ras meer werkt als een setter dan een spaniel. Vandaag is de Epagneul Breton één van de populairste jachthonden in Frankrijk en Noord-Amerika, en wint regelmatig veldwedstrijden."
  },
  similarBreeds: [
    "English Springer Spaniel",
    "Welsh Springer Spaniel",
    "Small Munsterlander",
    "English Setter"
  ],
  commonMistakes: [
    "Te weinig beweging: Epagneul Bretons zijn zeer energiek en worden hyperactief zonder dagelijkse intensieve beweging.",
    "Geen mentale uitdaging: Ze vervelen zich snel zonder training, puzzels of zoekwerk.",
    "Te harde training: Ze zijn gevoelig en reageren slecht op harde correcties. Gebruik altijd positieve bekrachtiging.",
    "Jachtinstinct onderschatten: Ze zullen vogels en klein wild achternazitten zonder goede training.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze schuw of nerveus worden.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben en scheidingsangst kunnen ontwikkelen."
  ],
  monthlyCosts: {
    food: "€50-€75",
    vet: "€25-€45",
    grooming: "€30-€60",
    insurance: "€20-€40",
    total: "€125-€220",
    note: "Epagneul Bretons zijn relatief klein voor jachthonden, dus voedingskosten zijn lager. Aanschafprijs pup: €800-€1.500. Eerste jaar totaal: €2.200-€3.800. Houd rekening met mogelijke kosten voor hondensporten of jachttraining."
  }
};

// ===== 135. Stabyhoun =====
export const stabyhoun: BreedDetails = {
  breedName: "Stabyhoun",
  breedNameNL: "Stabyhoun (Stabij)",
  faqs: [
    {
      question: "Is een Stabyhoun geschikt voor beginners?",
      answer: "Ja, de Stabyhoun is geschikt voor gemotiveerde beginners. Ze zijn vriendelijk, willen graag plezieren en zijn rustiger dan de meeste jachthonden. Ze hebben wel voldoende beweging en training nodig, maar zijn over het algemeen makkelijker dan pointers of setters."
    },
    {
      question: "Hoeveel beweging heeft een Stabyhoun nodig?",
      answer: "Een Stabyhoun heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn actief maar niet hyperactief en genieten van wandelingen, zwemmen en apporteren. Ze zijn veelzijdig en passen zich aan aan het activiteitenniveau van hun eigenaar."
    },
    {
      question: "Zijn Stabyhouns goed met kinderen?",
      answer: "Ja, Stabyhouns zijn uitstekend met kinderen. Ze zijn geduldig, vriendelijk en beschermend. Hun rustige karakter en tolerantie maken ze ideaal voor gezinnen. Ze zijn zelden agressief en genieten van gezinsactiviteiten."
    },
    {
      question: "Verhaart een Stabyhoun veel?",
      answer: "Stabyhouns verharen matig, vooral tijdens seizoenswisselingen. Hun lange, zijdeachtige vacht vereist regelmatig borstelen (2-3x per week) om klitten te voorkomen. Ze hebben geen professionele trimming nodig, maar moeten wel goed verzorgd worden."
    },
    {
      question: "Zijn Stabyhouns zeldzaam?",
      answer: "Ja, de Stabyhoun is één van de zeldzaamste hondenrassen ter wereld. Er zijn wereldwijd slechts ongeveer 7.000 Stabyhouns. Het ras is beschermd in Nederland en fokkers worden streng gescreend. Wachtlijsten zijn lang (vaak 1-2 jaar)."
    },
    {
      question: "Zijn Stabyhouns makkelijk te trainen?",
      answer: "Ja, Stabyhouns zijn intelligent en willen graag plezieren, wat ze relatief makkelijk maakt om te trainen. Ze reageren goed op positieve bekrachtiging. Ze kunnen wel eigenzinnig zijn, dus consistentie is belangrijk."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Stabyhouns?",
      answer: "Stabyhouns kunnen last hebben van heupdysplasie, elleboogdysplasie, epilepsie en Von Willebrand ziekte (bloedstollingsstoornis). Kies een erkende fokker die ouderdieren screent. Het ras is over het algemeen gezond dankzij strenge fokcontrole."
    },
    {
      question: "Hoe oud wordt een Stabyhoun?",
      answer: "Een gezonde Stabyhoun wordt gemiddeld 13 tot 15 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en gezond leven leiden."
    }
  ],
  funFacts: [
    "De Stabyhoun is één van de vijf Nederlandse hondenrassen (samen met Kooikerhondje, Wetterhoun, Saarlooswolfhond en Hollandse Herdershond).",
    "Het ras is zo zeldzaam dat het op de lijst van 'bedreigde inheemse rassen' staat van de Nederlandse Kennel Club.",
    "'Stabyhoun' komt van het Friese 'sta me bij hond' – letterlijk 'sta mij bij hond', wat hun veelzijdigheid beschrijft.",
    "Stabyhouns kunnen jagen, apporteren, vangen van mollen en ratten, en werken als waakhond – echte boerderijhonden.",
    "Het ras werd bijna uitgestorven na de Tweede Wereldoorlog maar werd gered door een handvol toegewijde fokkers.",
    "Stabyhouns zijn uitstekende zwemmers en worden nog steeds gebruikt voor waterjacht in Nederland."
  ],
  history: {
    origin: "De Stabyhoun ontstond in de 19e eeuw in de provincie Friesland in het noorden van Nederland. Het ras werd ontwikkeld als veelzijdige boerderijhond die kon jagen (vooral op vogels en klein wild), bewaken, ongedierte vangen en gezelschap bieden. De exacte oorsprong is onduidelijk, maar waarschijnlijk werd het ras ontwikkeld uit lokale spaniels en mogelijk Duitse jachthonden.",
    development: "Stabyhouns werden vooral gehouden door Friese boeren die een betaalbare, veelzijdige hond nodig hadden. Het ras bleef lokaal en onbekend buiten Friesland tot de 20e eeuw. In 1942 werd de 'Nederlandse Vereniging Stabyhoun' opgericht om het ras te beschermen en standaardiseren.\n\nNa de Tweede Wereldoorlog was het ras bijna uitgestorven, maar toegewijde fokkers brachten het terug door strenge fokprogramma's. Het ras werd erkend door de FCI in 1960. Vandaag is de Stabyhoun beschermd als zeldzaam inheems ras en worden fokkers streng gecontroleerd. Het ras wint langzaam aan populariteit buiten Nederland als gezinshond en jachthond."
  },
  similarBreeds: [
    "Wetterhoun",
    "English Springer Spaniel",
    "Drentse Patrijshond",
    "Small Munsterlander"
  ],
  commonMistakes: [
    "Onderschatten van hun jachtinstinct: Stabyhouns zullen vogels en klein wild achternazitten zonder goede training.",
    "Te weinig beweging: Hoewel rustiger dan sommige jachthonden, hebben ze wel dagelijkse beweging nodig.",
    "Vacht onderhoud verwaarlozen: Hun lange vacht klitteen zonder regelmatig borstelen, vooral achter de oren.",
    "Geen vroege socialisatie: Zonder socialisatie kunnen ze schuw of gereserveerd worden tegenover vreemden.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben.",
    "Ongeduld met wachtlijst: Stabyhouns zijn zeldzaam. Wees bereid te wachten 1-2 jaar op een pup."
  ],
  monthlyCosts: {
    food: "€50-€75",
    vet: "€20-€40",
    grooming: "€20-€40",
    insurance: "€20-€35",
    total: "€110-€190",
    note: "Stabyhouns hebben relatief lage onderhoudskosten. Aanschafprijs pup: €1.200-€1.800 (streng gecontroleerd door fokvereniging). Eerste jaar totaal: €2.500-€3.800. Houd rekening met lange wachtlijsten en mogelijke reiskosten naar fokkers in Nederland."
  }
};

// ===== 136. Wetterhoun =====
export const wetterhoun: BreedDetails = {
  breedName: "Wetterhoun",
  breedNameNL: "Wetterhoun (Friese Waterhond)",
  faqs: [
    {
      question: "Is een Wetterhoun geschikt voor beginners?",
      answer: "Nee, een Wetterhoun is niet geschikt voor beginners. Ze zijn koppig, onafhankelijk en kunnen territoriaal zijn. Dit ras vereist een ervaren eigenaar die consequent kan zijn en ervaring heeft met koppige rassen. Ze zijn ook zeer zeldzaam."
    },
    {
      question: "Hoeveel beweging heeft een Wetterhoun nodig?",
      answer: "Een Wetterhoun heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn rustiger dan de meeste jachthonden maar houden wel van zwemmen en apporteren uit het water. Ze zijn ideaal voor eigenaren die bij water wonen of regelmatig naar het water gaan."
    },
    {
      question: "Zijn Wetterhouns goed met kinderen?",
      answer: "Wetterhouns kunnen goed met kinderen omgaan als ze vanaf puppy leeftijd met ze zijn opgegroeid. Ze zijn loyaal en beschermend tegenover hun gezin, maar kunnen gereserveerd of territoriaal zijn tegenover vreemde kinderen. Goede socialisatie is essentieel."
    },
    {
      question: "Verhaart een Wetterhoun veel?",
      answer: "Wetterhouns verharen minimaal als ze regelmatig gehand-stript worden. Hun dikke, olieachtige krulvacht is waterafstotend en beschermt tegen kou. Ze vereisen wel onderhoud: borstelen 1-2x per week en hand-strippen elke 3-4 maanden."
    },
    {
      question: "Zijn Wetterhouns zeldzaam?",
      answer: "Ja, de Wetterhoun is één van de zeldzaamste hondenrassen ter wereld. Er zijn wereldwijd slechts ongeveer 1.500 Wetterhouns. Het ras is beschermd als zeldzaam inheems ras in Nederland. Wachtlijsten zijn extreem lang (vaak 2-3 jaar)."
    },
    {
      question: "Zijn Wetterhouns agressief?",
      answer: "Wetterhouns zijn niet agressief naar hun gezin, maar kunnen territoriaal en beschermend zijn. Ze zijn gereserveerd tegenover vreemden en kunnen confronterend zijn tegenover andere honden. Vroege socialisatie en training zijn essentieel."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Wetterhouns?",
      answer: "Wetterhouns kunnen last hebben van heupdysplasie, elleboogdysplasie, PRA (progressieve retina-atrofie) en patellaluxatie (knieschijf problemen). Kies een erkende fokker die ouderdieren screent. Het ras is over het algemeen gezond."
    },
    {
      question: "Hoe oud wordt een Wetterhoun?",
      answer: "Een gezonde Wetterhoun wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang leven leiden."
    }
  ],
  funFacts: [
    "De naam 'Wetterhoun' komt uit het Fries en betekent letterlijk 'waterhond'.",
    "Wetterhouns werden oorspronkelijk gefokt om otters te jagen – een gevaarlijke klus die een moedige, koppige hond vereiste.",
    "Hun olieachtige krulvacht is zo waterafstotend dat ze bijna onmiddellijk droog zijn na zwemmen.",
    "Wetterhouns zijn één van de vijf Nederlandse hondenrassen en worden beschermd als nationaal erfgoed.",
    "Het ras was bijna uitgestorven in de jaren '60 maar werd gered door een kleine groep Friese fokkers.",
    "Wetterhouns hebben zwemvliezen tussen hun tenen, wat ze uitstekende zwemmers maakt."
  ],
  history: {
    origin: "De Wetterhoun ontstond in de 17e eeuw in de provincie Friesland in het noorden van Nederland. Het ras werd ontwikkeld als gespecialiseerde waterjachthond voor het jagen op otters en andere waterdieren in de Friese meren en kanalen. De exacte oorsprong is onduidelijk, maar waarschijnlijk kruisten Friese boeren lokale waterhonden met Old English Water Dogs en mogelijk waterspaniels.",
    development: "Wetterhouns werden gefokt voor moed, koppigheid en zwemvermogen – eigenschappen die nodig waren om otters te jagen (otters zijn gevaarlijke tegenstanders). De honden moesten ook onafhankelijk kunnen werken en beschermen. Hun dikke, olieachtige vacht beschermde ze tegen ijskoud water.\n\nIn de 20e eeuw, toen otterjacht werd verboden, verloor het ras zijn functie en werd bijna uitgestorven. In 1942 werd de 'Nederlandse Vereniging Wetterhoun' opgericht om het ras te redden. Het ras werd erkend door de FCI in 1959. Vandaag is de Wetterhoun één van de zeldzaamste rassen ter wereld, met slechts ongeveer 1.500 exemplaren wereldwijd. Het ras blijft beschermd als zeldzaam inheems ras in Nederland."
  },
  similarBreeds: [
    "Stabyhoun",
    "Barbet",
    "Portuguese Water Dog",
    "Irish Water Spaniel"
  ],
  commonMistakes: [
    "Te zachte training: Wetterhouns zijn koppig en hebben consequente, stevige (maar vriendelijke) training nodig.",
    "Onvoldoende socialisatie: Zonder vroege socialisatie kunnen ze territoriaal of agressief worden tegenover vreemden en andere honden.",
    "Te lang alleen laten: Ondanks hun onafhankelijke karakter hebben ze gezelschap nodig.",
    "Vacht scheren: Scheren beschadigt de waterafstotende eigenschappen. Hand-strippen is essentieel.",
    "Geen toegang tot water: Wetterhouns zijn waterhonden en hebben regelmatig toegang tot zwemwater nodig om gelukkig te zijn.",
    "Onderschatten van hun territoriaal gedrag: Ze kunnen beschermend zijn. Train vroeg en zorg voor goede afbakening.",
    "Ongeduld met wachtlijst: Wetterhouns zijn extreem zeldzaam. Wees bereid jaren te wachten."
  ],
  monthlyCosts: {
    food: "€50-€75",
    vet: "€20-€40",
    grooming: "€30-€60",
    insurance: "€20-€35",
    total: "€120-€210",
    note: "Hand-strippen kost €40-€60 per sessie (elke 3-4 maanden). Aanschafprijs pup: €1.500-€2.200 (streng gecontroleerd, extreem zeldzaam). Eerste jaar totaal: €2.800-€4.500. Wachtlijsten kunnen 2-3 jaar duren. Mogelijk reiskosten naar fokkers in Nederland."
  }
};

// ===== 137. Drentse Patrijshond =====
export const drentsePatrijshond: BreedDetails = {
  breedName: "Drentsche Patrijshond",
  breedNameNL: "Drentse Patrijshond (Drentsche Patrijshond)",
  faqs: [
    {
      question: "Is een Drentse Patrijshond geschikt voor beginners?",
      answer: "Ja, de Drentse Patrijshond is één van de meest geschikte jachthonden voor beginners. Ze zijn vriendelijk, willen graag plezieren en hebben een rustig temperament. Ze zijn ook veelzijdig en passen zich goed aan aan gezinsomgevingen."
    },
    {
      question: "Hoeveel beweging heeft een Drentse Patrijshond nodig?",
      answer: "Een Drentse Patrijshond heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn actief maar niet hyperactief en genieten van wandelingen, zwemmen en apporteren. Ze zijn ook tevreden met mentale uitdaging zoals speurwerk of training."
    },
    {
      question: "Zijn Drentse Patrijshonden goed met kinderen?",
      answer: "Ja, Drentse Patrijshonden zijn uitstekend met kinderen. Ze zijn geduldig, vriendelijk en beschermend. Hun rustige karakter en tolerantie maken ze ideaal voor gezinnen met kinderen van alle leeftijden. Ze zijn één van de beste gezinshonden onder jachtrassen."
    },
    {
      question: "Verhaart een Drentse Patrijshond veel?",
      answer: "Drentse Patrijshonden verharen matig tot veel, vooral tijdens seizoenswisselingen. Hun middellange vacht vereist regelmatig borstelen (2-3x per week) om losse haren te verwijderen en klitten te voorkomen. Lichte trimming helpt de vacht netjes te houden."
    },
    {
      question: "Zijn Drentse Patrijshonden makkelijk te trainen?",
      answer: "Ja, Drentse Patrijshonden zijn intelligent en willen graag plezieren, wat ze makkelijk maakt om te trainen. Ze reageren uitstekend op positieve bekrachtiging. Hun gevoeligheid betekent dat harde correcties averechts werken."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Drentse Patrijshonden?",
      answer: "Drentse Patrijshonden kunnen last hebben van heupdysplasie, elleboogdysplasie, progressieve retina-atrofie (PRA) en hereditary stomatocytosis (erfelijke bloedziekte). Kies een fokker die ouderdieren screent. Het ras is over het algemeen gezond."
    },
    {
      question: "Zijn Drentse Patrijshonden zeldzaam?",
      answer: "De Drentse Patrijshond is vrij zeldzaam buiten Nederland. In Nederland is het ras populair als jacht- en gezinshond. In België zijn fokkers schaars, dus wachtlijsten zijn gebruikelijk."
    },
    {
      question: "Hoe oud wordt een Drentse Patrijshond?",
      answer: "Een gezonde Drentse Patrijshond wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en gezond leven leiden."
    }
  ],
  funFacts: [
    "De Drentse Patrijshond is één van de vijf Nederlandse hondenrassen en wordt beschouwd als het oudste Nederlandse jachthondenras.",
    "'Patrijshond' betekent letterlijk 'patrijs hond' – ze werden gefokt om patrijzen op te sporen.",
    "Het ras was bijna uitgestorven in de jaren '40 maar werd gered door één enkele fokker, Baronesse van Hardenbroek van Ammerstol.",
    "Drentse Patrijshonden hebben een kenmerkende witte vlek op hun voorhoofd, ook wel de 'stervlam' genoemd.",
    "Ze zijn zo veelzijdig dat ze worden ingezet als jachthonden, gezinshonden, therapiehonden en speurhonden.",
    "Het ras is nauw verwant aan de Epagneul Breton en Small Munsterlander."
  ],
  history: {
    origin: "De Drentse Patrijshond ontstond in de 16e eeuw in de provincie Drenthe in het noordoosten van Nederland. Het ras werd ontwikkeld door boeren en jagers die een veelzijdige hond nodig hadden voor het jagen op patrijzen, fazanten en ander klein wild. De oorsprong ligt waarschijnlijk bij Spaanse spaniels die naar Nederland werden gebracht tijdens de Spaanse overheersing (1568-1648).",
    development: "Het ras werd verfijnd door kruisingen met lokale Nederlandse jachthonden en mogelijk Franse spaniels. Drentse Patrijshonden werden gefokt om dicht bij de jager te werken, wild op te sporen en op te jagen (zonder te pointen zoals setters). Ze waren populair bij boeren vanwege hun veelzijdigheid en vriendelijke karakter.\n\nIn de jaren '40 was het ras bijna uitgestorven. Baronesse van Hardenbroek van Ammerstol redde het ras door de laatste exemplaren te verzamelen en een fokprogramma op te zetten. In 1948 werd de 'Vereniging de Drentsche Patrijshond' opgericht. Het ras werd erkend door de FCI in 1943 en door de UKC in 2006. Vandaag is de Drentse Patrijshond populair in Nederland als jacht- en gezinshond en wint langzaam aan bekendheid in andere landen."
  },
  similarBreeds: [
    "Epagneul Breton",
    "Small Munsterlander",
    "English Springer Spaniel",
    "Stabyhoun"
  ],
  commonMistakes: [
    "Te weinig beweging: Hoewel rustiger dan sommige jachthonden, hebben ze wel dagelijkse beweging nodig.",
    "Vacht onderhoud verwaarlozen: Hun vacht klitteen zonder regelmatig borstelen, vooral achter de oren.",
    "Geen mentale uitdaging: Ze vervelen zich zonder training, speurwerk of puzzels.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze schuw worden.",
    "Jachtinstinct onderschatten: Ze zullen vogels en klein wild achternazitten zonder goede training.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben."
  ],
  monthlyCosts: {
    food: "€50-€75",
    vet: "€20-€40",
    grooming: "€30-€60",
    insurance: "€20-€35",
    total: "€120-€210",
    note: "Drentse Patrijshonden hebben matige onderhoudskosten. Aanschafprijs pup: €900-€1.500. Eerste jaar totaal: €2.200-€3.800. Houd rekening met mogelijke wachtlijsten en reiskosten naar fokkers in Nederland."
  }
};

// ===== 138. Perdigueiro Português =====
export const perdigueiro Português: BreedDetails = {
  breedName: "Portuguese Pointer",
  breedNameNL: "Perdigueiro Português (Portugese Pointer)",
  faqs: [
    {
      question: "Is een Perdigueiro Português geschikt voor beginners?",
      answer: "Ja, de Perdigueiro Português kan geschikt zijn voor gemotiveerde beginners. Ze zijn vriendelijker, rustiger en minder koppig dan de meeste pointers. Ze willen graag plezieren en hebben een gematigder energie niveau, maar ze hebben wel voldoende beweging nodig."
    },
    {
      question: "Hoeveel beweging heeft een Perdigueiro Português nodig?",
      answer: "Een Perdigueiro Português heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn rustiger dan de meeste pointers en genieten van gematigde wandelingen, zwemmen en jachttraining. Ze zijn ook tevreden met mentale uitdaging zoals speurwerk."
    },
    {
      question: "Zijn Perdigueiro Português honden goed met kinderen?",
      answer: "Ja, Perdigueiro Português zijn uitstekend met kinderen. Ze zijn geduldig, vriendelijk en beschermend. Hun rustige temperament en tolerantie maken ze ideaal voor gezinnen. Ze zijn zelden agressief en genieten van gezinsactiviteiten."
    },
    {
      question: "Verhaart een Perdigueiro Português veel?",
      answer: "Perdigueiro Português verharen matig. Hun korte, gladde vacht is onderhoudsvriendelijk en vereist alleen wekelijks borstelen om losse haren te verwijderen. Tijdens seizoenswisselingen verharen ze iets meer. Professionele grooming is niet nodig."
    },
    {
      question: "Zijn Perdigueiro Português zeldzaam?",
      answer: "Ja, de Perdigueiro Português is zeldzaam buiten Portugal. Het ras is populair in Portugal maar weinig bekend in de rest van Europa. Fokkers zijn schaars in België, dus wachtlijsten en import uit Portugal kunnen nodig zijn."
    },
    {
      question: "Zijn Perdigueiro Português makkelijk te trainen?",
      answer: "Ja, Perdigueiro Português zijn intelligent en willen graag plezieren, wat ze relatief makkelijk maakt om te trainen. Ze reageren goed op positieve bekrachtiging. Hun gevoeligheid betekent dat harde correcties averechts werken."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Perdigueiro Português?",
      answer: "Perdigueiro Português kunnen last hebben van heupdysplasie, elleboogdysplasie en oogproblemen. Kies een fokker die ouderdieren screent. Het ras is over het algemeen gezond en robuust dankzij minder intensieve fokkerij."
    },
    {
      question: "Hoe oud wordt een Perdigueiro Português?",
      answer: "Een gezonde Perdigueiro Português wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en gezond leven leiden."
    }
  ],
  funFacts: [
    "De Perdigueiro Português is één van de oudste pointer rassen ter wereld en wordt beschouwd als de voorouder van de Engelse Pointer.",
    "Het ras was een favoriet van de Portugese koninklijke familie en werd gehouden op koninklijke landgoederen.",
    "Perdigueiro betekent letterlijk 'patrijs hond' in het Portugees – ze werden gefokt om patrijzen op te sporen.",
    "Het ras kwam bijna uit te sterven in de 20e eeuw maar werd gered door een groep toegewijde Portugese fokkers.",
    "Perdigueiro Português zijn uitstekende zwemmers en werden vaak gebruikt voor waterjacht langs de Portugese kust.",
    "Het ras heeft een kenmerkende 'zachte blik' met grote, expressieve bruine ogen die hun vriendelijke karakter weerspiegelen."
  ],
  history: {
    origin: "De Perdigueiro Português is één van de oudste Europese pointer rassen en ontstond waarschijnlijk in de 12e eeuw in Portugal. Het ras stamt af van oude Iberische jachthonden die werden gebruikt door de Portugese adel. Sommige historici geloven dat het ras voorkomt uit Saluki's en Podenco's die door Moorse handelaren werden geïmporteerd, gekruist met lokale jachthonden.",
    development: "In de 14e en 15e eeuw, tijdens de Portugese ontdekkingsreizen, namen zeelieden Perdigueiro Português mee op schepen. Het ras werd geïntroduceerd in Engeland tijdens handelsrelaties tussen Portugal en Engeland en wordt beschouwd als de voorouder van de moderne Engelse Pointer.\n\nHet ras werd populair bij de Portugese koninklijke familie en adel voor het jagen op patrijzen en fazanten. In de 20e eeuw kwam het ras bijna uit te sterven door verwaarlozing en kruisingen met andere rassen. In de jaren '90 startten toegewijde fokkers een herstelproject. Het ras werd erkend door de FCI in 1954 en wint langzaam aan populariteit buiten Portugal als veelzijdige jachthond en gezinshond."
  },
  similarBreeds: [
    "English Pointer",
    "Bracco Italiano",
    "Braque Français",
    "Spanish Pointer"
  ],
  commonMistakes: [
    "Te weinig socialisatie: Zonder vroege socialisatie kunnen ze schuw worden.",
    "Geen mentale uitdaging: Ze vervelen zich zonder training, speurwerk of puzzels.",
    "Jachtinstinct onderschatten: Ze zullen vogels en wild achternazitten zonder goede training.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben.",
    "Onderschatten van hun gevoeligheid: Ze reageren slecht op harde correcties. Gebruik altijd positieve training.",
    "Oren verwaarlozen: Hun hangende oren zijn gevoelig voor infecties. Controleer en reinig ze wekelijks."
  ],
  monthlyCosts: {
    food: "€50-€75",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€20-€35",
    total: "€100-€170",
    note: "Perdigueiro Português hebben relatief lage onderhoudskosten door hun korte vacht. Aanschafprijs pup: €1.000-€1.800 (kan hoger zijn bij import uit Portugal). Eerste jaar totaal: €2.200-€3.800. Mogelijk extra kosten voor import en transport."
  }
};

// ===== 139. Braque d'Auvergne =====
export const braquedAuvergne: BreedDetails = {
  breedName: "Braque d'Auvergne",
  breedNameNL: "Braque d'Auvergne (Auvergne Pointer)",
  faqs: [
    {
      question: "Is een Braque d'Auvergne geschikt voor beginners?",
      answer: "Een Braque d'Auvergne kan geschikt zijn voor gemotiveerde beginners met een actieve levensstijl. Ze zijn vriendelijker en rustiger dan de meeste pointers, willen graag plezieren en hebben een gematigder energie niveau. Ze vereisen wel voldoende beweging en training."
    },
    {
      question: "Hoeveel beweging heeft een Braque d'Auvergne nodig?",
      answer: "Een Braque d'Auvergne heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn actief maar niet hyperactief en genieten van wandelingen, zwemmen en jachttraining. Ze zijn ook tevreden met mentale uitdaging zoals speurwerk of training."
    },
    {
      question: "Zijn Braque d'Auvergne honden goed met kinderen?",
      answer: "Ja, Braque d'Auvergne zijn uitstekend met kinderen. Ze zijn geduldig, vriendelijk en beschermend. Hun rustige temperament en tolerantie maken ze ideaal voor gezinnen. Ze zijn zelden agressief en genieten van gezinsactiviteiten."
    },
    {
      question: "Verhaart een Braque d'Auvergne veel?",
      answer: "Braque d'Auvergne verharen matig. Hun korte, gladde vacht is onderhoudsvriendelijk en vereist alleen wekelijks borstelen om losse haren te verwijderen. Tijdens seizoenswisselingen verharen ze iets meer. Professionele grooming is niet nodig."
    },
    {
      question: "Zijn Braque d'Auvergne zeldzaam?",
      answer: "Ja, de Braque d'Auvergne is zeldzaam buiten Frankrijk. Het ras is populair in de Auvergne regio maar weinig bekend in de rest van Europa. Fokkers zijn schaars in België, dus wachtlijsten en import uit Frankrijk kunnen nodig zijn."
    },
    {
      question: "Zijn Braque d'Auvergne makkelijk te trainen?",
      answer: "Ja, Braque d'Auvergne zijn intelligent en willen graag plezieren, wat ze relatief makkelijk maakt om te trainen. Ze reageren goed op positieve bekrachtiging. Hun gevoeligheid betekent dat harde correcties averechts werken."
    },
    {
      question: "Welke gezondheidsproblemen komen voor bij Braque d'Auvergne?",
      answer: "Braque d'Auvergne kunnen last hebben van heupdysplasie, elleboogdysplasie, oogproblemen en oorinfecties (door hangende oren). Kies een fokker die ouderdieren screent. Het ras is over het algemeen gezond en robuust."
    },
    {
      question: "Hoe oud wordt een Braque d'Auvergne?",
      answer: "Een gezonde Braque d'Auvergne wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en gezond leven leiden."
    }
  ],
  funFacts: [
    "De Braque d'Auvergne is één van de oudste Franse pointer rassen en stamt uit de vulkanische regio Auvergne in Midden-Frankrijk.",
    "Hun kenmerkende zwart-witte vacht met ticking (spikkels) maakt ze visueel herkenbaar.",
    "Het ras werd bijna uitgestorven na de Tweede Wereldoorlog maar werd gered door een kleine groep Franse fokkers.",
    "Braque d'Auvergne hebben een uitzonderlijke neus en worden vaak ingezet voor het opsporen van truffels.",
    "Ze zijn uitstekende zwemmers en houden van waterjacht.",
    "Het ras is nauw verwant aan de Braque Français en deelt dezelfde voorouders."
  ],
  history: {
    origin: "De Braque d'Auvergne ontstond in de 18e eeuw in de Auvergne regio in Midden-Frankrijk. Het ras werd ontwikkeld door lokale jagers die een robuuste, veelzijdige pointer nodig hadden voor het jagen in het bergachtige, vulkanische terrein van de Auvergne. De exacte oorsprong is onduidelijk, maar waarschijnlijk stamt het ras af van oude Franse braques (pointers) en mogelijk Gascogne honden.",
    development: "In de 19e eeuw verfijnden Franse fokkers het ras door selectieve fokkerij. De Braque d'Auvergne werd gefokt voor uithoudingsvermogen, een uitstekende neus en aanpassingsvermogen aan ruw terrein. Het ras werd populair bij lokale jagers maar bleef relatief onbekend buiten de Auvergne.\n\nNa de Tweede Wereldoorlog kwam het ras bijna uit te sterven door verwaarlozing. In de jaren '50 startten een groep toegewijde fokkers een herstelproject. Het ras werd officieel erkend door de Société Centrale Canine in 1955 en door de FCI in 1963. Vandaag is de Braque d'Auvergne nog steeds zeldzaam maar wint langzaam aan populariteit als veelzijdige jachthond en gezinshond, vooral in Frankrijk."
  },
  similarBreeds: [
    "Braque Français",
    "Bracco Italiano",
    "German Shorthaired Pointer",
    "Pointer"
  ],
  commonMistakes: [
    "Te weinig beweging: Hoewel rustiger dan sommige pointers, hebben ze wel dagelijkse beweging nodig.",
    "Geen mentale uitdaging: Ze vervelen zich zonder training, speurwerk of puzzels.",
    "Jachtinstinct onderschatten: Ze zullen vogels en wild achternazitten zonder goede training.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze schuw worden.",
    "Oren verwaarlozen: Hun hangende oren zijn gevoelig voor infecties. Controleer en reinig ze wekelijks.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben.",
    "Onderschatten van hun gevoeligheid: Ze reageren slecht op harde correcties."
  ],
  monthlyCosts: {
    food: "€50-€75",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€20-€35",
    total: "€100-€170",
    note: "Braque d'Auvergne hebben relatief lage onderhoudskosten door hun korte vacht. Aanschafprijs pup: €1.000-€1.800 (kan hoger zijn bij import uit Frankrijk). Eerste jaar totaal: €2.200-€3.800. Mogelijk extra kosten voor import en transport uit Frankrijk."
  }
};

// ===== 140. Braque Français =====
export const braqueFrancais: BreedDetails = {
  breedName: "Braque Français",
  breedNameNL: "Braque Français (Franse Pointer)",
  faqs: [
    {
      question: "Wat is het verschil tussen Braque Français Gascogne en Pyrénées?",
      answer: "Er zijn twee variëteiten: de Braque Français type Gascogne (groter, 56-69 cm, zwaarder gebouwd) en de Braque Français type Pyrénées (kleiner, 47-58 cm, compacter). Beide hebben hetzelfde temperament en zijn uitstekende jachthonden, maar de Pyrénées is populairder als gezinshond vanwege het kleinere formaat."
    },
    {
      question: "Is een Braque Français geschikt voor beginners?",
      answer: "Ja, de Braque Français kan geschikt zijn voor gemotiveerde beginners. Ze zijn vriendelijk, willen graag plezieren en hebben een rustiger temperament dan de meeste pointers. Ze vereisen wel voldoende beweging en training maar zijn makkelijker te hanteren dan bijvoorbeeld Weimaraners of Duits Korthaar."
    },
    {
      question: "Hoeveel beweging heeft een Braque Français nodig?",
      answer: "Een Braque Français heeft 1 tot 1,5 uur beweging per dag nodig. Ze zijn actief maar niet hyperactief en genieten van wandelingen, zwemmen en jachttraining. Ze passen zich goed aan aan het activiteitenniveau van hun eigenaar."
    },
    {
      question: "Zijn Braque Français honden goed met kinderen?",
      answer: "Ja, Braque Français zijn uitstekend met kinderen. Ze zijn geduldig, vriendelijk en beschermend. Hun rustige temperament en tolerantie maken ze ideaal voor gezinnen. Ze zijn zelden agressief en genieten van gezinsactiviteiten."
    },
    {
      question: "Verhaart een Braque Français veel?",
      answer: "Braque Français verharen matig. Hun korte, dichte vacht is onderhoudsvriendelijk en vereist alleen wekelijks borstelen om losse haren te verwijderen. Tijdens seizoenswisselingen verharen ze iets meer. Professionele grooming is niet nodig."
    },
    {
      question: "Zijn Braque Français zeldzaam?",
      answer: "De Braque Français is vrij zeldzaam buiten Frankrijk. Het ras is populair in Frankrijk, vooral in het zuidwesten, maar weinig bekend in de rest van Europa. Fokkers zijn schaars in België, dus wachtlijsten en import uit Frankrijk kunnen nodig zijn."
    },
    {
      question: "Zijn Braque Français makkelijk te trainen?",
      answer: "Ja, Braque Français zijn intelligent en willen graag plezieren, wat ze makkelijk maakt om te trainen. Ze reageren uitstekend op positieve bekrachtiging. Hun gevoeligheid betekent dat harde correcties averechts werken."
    },
    {
      question: "Hoe oud wordt een Braque Français?",
      answer: "Een gezonde Braque Français wordt gemiddeld 12 tot 14 jaar oud. Met goede voeding, voldoende beweging en regelmatige controles kunnen ze een lang en gezond leven leiden."
    }
  ],
  funFacts: [
    "De Braque Français is één van de oudste pointer rassen ter wereld en wordt beschouwd als de voorouder van de meeste moderne pointers, inclusief de Engelse Pointer.",
    "Het ras was een favoriet van koning Hendrik IV van Frankrijk (1589-1610), die meerdere Braque Français hield voor de jacht.",
    "Braque Français komen in twee officiële variëteiten: Gascogne (groot) en Pyrénées (klein).",
    "Hun bruine neus met roze vlekken is kenmerkend voor het ras en wordt 'vlinderneus' genoemd.",
    "Ze zijn uitstekende zwemmers en werden vaak gebruikt voor waterjacht in de Franse moerassen.",
    "Het ras kwam bijna uit te sterven na de Franse Revolutie maar werd gered door jagers in het zuidwesten van Frankrijk."
  ],
  history: {
    origin: "De Braque Français is één van de oudste pointer rassen en ontstond in de 15e eeuw in Frankrijk. Het ras stamt af van oude Zuideuropese jachthonden, waarschijnlijk gekruist met Spaanse en Italiaanse pointers die tijdens de Renaissance naar Frankrijk werden gebracht. De Braque Français werd populair bij de Franse adel voor het jagen op vogels en klein wild.",
    development: "In de 17e en 18e eeuw werd het ras verfijnd door de Franse adel, met name in de regio's Gascogne en Pyrénées. Twee variëteiten ontstonden: de grotere, zwaardere Braque Français type Gascogne en de kleinere, compactere Braque Français type Pyrénées. Tijdens de Franse Revolutie kwam het ras bijna uit te sterven omdat de adel werd vervolgd.\n\nIn de 19e eeuw werd het ras gered door jagers in het zuidwesten van Frankrijk. Het werd officieel erkend door de Société Centrale Canine in 1850 en door de FCI in 1954. De Braque Français werd geëxporteerd naar Engeland in de 19e eeuw en wordt beschouwd als de voorouder van de Engelse Pointer. Vandaag is het ras populair in Frankrijk als veelzijdige jachthond en gezinshond, maar zeldzaam buiten Frankrijk."
  },
  similarBreeds: [
    "Braque d'Auvergne",
    "Bracco Italiano",
    "Perdigueiro Português",
    "English Pointer"
  ],
  commonMistakes: [
    "Te weinig beweging: Hoewel rustiger dan sommige pointers, hebben ze wel dagelijkse beweging nodig.",
    "Geen mentale uitdaging: Ze vervelen zich zonder training, speurwerk of puzzels.",
    "Jachtinstinct onderschatten: Ze zullen vogels en wild achternazitten zonder goede training.",
    "Te laat socialiseren: Zonder vroege socialisatie kunnen ze schuw worden.",
    "Oren verwaarlozen: Hun hangende oren zijn gevoelig voor infecties. Controleer en reinig ze wekelijks.",
    "Te lang alleen laten: Dit zijn sociale honden die gezelschap nodig hebben.",
    "Onderschatten van hun gevoeligheid: Ze reageren slecht op harde correcties. Gebruik altijd positieve training."
  ],
  monthlyCosts: {
    food: "€50-€80",
    vet: "€20-€40",
    grooming: "€10-€20",
    insurance: "€20-€35",
    total: "€100-€175",
    note: "Braque Français hebben relatief lage onderhoudskosten door hun korte vacht. Aanschafprijs pup: €1.000-€1.800 (kan hoger zijn bij import uit Frankrijk). Eerste jaar totaal: €2.200-€3.800. Mogelijk extra kosten voor import en transport uit Frankrijk. De kleinere Pyrénées variant heeft iets lagere voedingskosten."
  }
};

// ===== Export All Breeds =====
export const breedDetailsBatch7 = [
  englishSetter,
  gordonSetter,
  englishPointer,
  germanShorthairedPointer,
  germanWirehairedPointer,
  germanLonghairedPointer,
  weimaraner,
  braccoItaliano,
  spinoneItaliano,
  korthals,
  pudelpointer,
  smallMunsterlander,
  largeMunsterlander,
  epagneulBreton,
  stabyhoun,
  wetterhoun,
  drentsePatrijshond,
  perdigueiro Português,
  braquedAuvergne,
  braqueFrancais
];
