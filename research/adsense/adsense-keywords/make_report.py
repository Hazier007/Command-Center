import json, os, subprocess
base='/data/.openclaw/workspace'
outdir=base+'/adsense-keywords/out'
kw=json.load(open(base+'/adsense-keywords/keywords.json'))

def md_table(site):
    safe=site.replace('.','_')
    nl=f'{outdir}/{safe}_nl.json'
    be=f'{outdir}/{safe}_be.json'
    table=subprocess.check_output(['node',base+'/adsense-keywords/extract.js',nl,be],text=True)
    return table

sections=[]
sections.append('# AdSense tool-sites — longtail keyword research (NL/BE)\n')
sections.append('- Bron: DataForSEO Google Ads search volume (live)\n- Locaties: NL=2528, BE=2056\n- Taal: nl\n- Datum: 2026-02-19\n')
sections.append('> Voeg per keyword nog **Intent** (info/buyer) en **Artikel-titel** toe. SV/comp/cpc staan al ingevuld.\n')

order=[
 'btw-calculator.be','buitendrogen.be','kmvergoeding.be','zwangerschapscalculator.be','kleurcodes.be','goedkoopstroom.be','huurrendementcalculator.be','ibanvalidator.be','datumberekenen.be','interesten.be'
]
for site in order:
    sections.append(f'\n## {site}\n')
    sections.append(md_table(site))

open(base+'/adsense-keywords/adsense_tool_sites_longtails.md','w').write(''.join(sections))
print('written',base+'/adsense-keywords/adsense_tool_sites_longtails.md')
