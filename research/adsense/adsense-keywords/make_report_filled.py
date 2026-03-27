import json, os
base='/data/.openclaw/workspace'
outdir=base+'/adsense-keywords/out'
kw=json.load(open(base+'/adsense-keywords/keywords.json'))

def load_map(path):
    obj=json.load(open(path))
    task=obj.get('tasks',[{}])[0]
    res=task.get('result') or []
    m={}
    for r in res:
        m[r['keyword']]={'sv':r.get('search_volume'), 'comp':r.get('competition_index'), 'cpc':r.get('cpc')}
    return m

def intent_for(keyword, site):
    k=keyword.lower()
    buyer_markers=['kopen','goedkoop','beste','vergelijk','prijs','tarief','vergoeding','calculator']
    if any(x in k for x in buyer_markers):
        return 'buyer'
    # some clearly informational patterns
    info_markers=['wat is','hoe','wanneer','symptomen','overzicht','opbouw','berekenen','tabel','verschil','tips']
    if any(x in k for x in info_markers):
        return 'info'
    # default by site
    if site in ('goedkoopstroom.be','huurrendementcalculator.be','btw-calculator.be','kmvergoeding.be','interesten.be'):
        return 'buyer'
    return 'info'

def title_for(keyword, site):
    k=keyword.strip()
    # Dutch title casing heuristics
    if site=='buitendrogen.be':
        return k[0].upper()+k[1:]+': tips + do’s & don’ts'
    if site=='kleurcodes.be':
        return k[0].upper()+k[1:]+' (uitleg + voorbeelden)'
    if site=='ibanvalidator.be':
        return k[0].upper()+k[1:]+': zo werkt het + veelgemaakte fouten'
    if site=='datumberekenen.be':
        return k[0].upper()+k[1:]+' (stappenplan + voorbeelden)'
    if site=='zwangerschapscalculator.be':
        return k[0].upper()+k[1:]+' (uitleg + checklist)'
    # default
    return k[0].upper()+k[1:]+' (uitleg + voorbeeld)'

order=[
 'btw-calculator.be','buitendrogen.be','kmvergoeding.be','zwangerschapscalculator.be','kleurcodes.be','goedkoopstroom.be','huurrendementcalculator.be','ibanvalidator.be','datumberekenen.be','interesten.be'
]

parts=[]
parts.append('# AdSense tool-sites — longtail keyword research (NL/BE)\n')
parts.append('- Bron: DataForSEO Google Ads search volume (live)\n- Locaties: NL=2528, BE=2056\n- Taal: nl\n- Datum: 2026-02-19\n\n')

for site in order:
    safe=site.replace('.','_')
    nl=load_map(f'{outdir}/{safe}_nl.json')
    be=load_map(f'{outdir}/{safe}_be.json')
    parts.append(f'## {site}\n')
    parts.append('| Keyword | NL SV | BE SV | Ads comp idx | CPC | Intent | Artikel-titel suggestie |\n')
    parts.append('|---|---:|---:|---:|---:|---|---|\n')
    for keyword in kw[site]:
        n=nl.get(keyword,{}); b=be.get(keyword,{})
        comp=n.get('comp') if n.get('comp') is not None else b.get('comp')
        cpc=n.get('cpc') if n.get('cpc') is not None else b.get('cpc')
        intent=intent_for(keyword, site)
        title=title_for(keyword, site)
        parts.append(f"| {keyword} | {n.get('sv','')} | {b.get('sv','')} | {comp if comp is not None else ''} | {cpc if cpc is not None else ''} | {intent} | {title} |\n")
    parts.append('\n')

out_path=base+'/docs/seo/adsense_tool_sites_longtails_nlbe.md'
os.makedirs(os.path.dirname(out_path),exist_ok=True)
open(out_path,'w',encoding='utf8').write(''.join(parts))
print('written',out_path)
