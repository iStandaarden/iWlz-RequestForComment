![header](../imagesrc/ZinBanner.png "template_header")

# Samenvatting

Binnen het iWlz-stelsel is autorisatie momenteel afhankelijk van de technische structuur van API-requests, wat leidt tot inconsistentie en beperkte interoperabiliteit.

Deze RFC stelt voor om autorisatie-attributen expliciet te extraheren in de PEP Gateway en te vertalen naar een gestandaardiseerd autorisatieverzoek. Dit autorisatieverzoek moet conform de standaarden uit hoofdstuk 6 van deze RFC zijn. Deze standaarden zijn in eerste instantie gebaseerd op de NL GOV AuthZEN-standaard en vervolgens specifiek aangepast voor autorisatie binnen het iWlz-domein.

Hiermee wordt autorisatie losgekoppeld van implementatiedetails en gebaseerd op een uniform, expliciet model.

Dit maakt autorisatie stelselbreed normeerbaar, interoperabel en beter toetsbaar.

Deze RFC is bedoeld voor architecten, ontwikkelaars en beleidsmakers die betrokken zijn bij de implementatie of toetsing van autorisatie binnen het iWlz-stelsel.

``` mermaid
flowchart TD
    A[Doel van de RFC] --> B[Autorisatieverzoek standaardiseren]

    B --> D[Binnenkomend API-verzoek]
    D --> H[Extractie autorisatierelevante attributen]

    H --> I[Constructie AuthZEN verzoek conform NLGov profiel]
    I --> J[PDP evaluatie]
    J --> K[Autorisatiebeslissing]
```


Probleem

De autorisatiebeslissing wordt momenteel gebaseerd op het volledige inkomende API-verzoek, inclusief GraphQL-querystructuur, variabelen en token. Hierdoor ontstaat een sterke afhankelijkheid tussen de technische representatie van het verzoek en de autorisatielogica.

In deze RFC wordt voorgesteld om de PEP Gateway conform het bovenstaande schema in te richten.

  - de autorisatierelevante informatie wordt uit het binnenkomende verzoek geëxtraheerd door middel van een preprocessor in de PEP Gateway;
  - de preprocessor construeert op basis hiervan een gestandaardiseerd autorisatieverzoek conform de NLGov AuthZEN-standaard, zoals in dit document gespecificeerd;
  - dit gestandaardiseerde autorisatieverzoek wordt vervolgens aan de PDP ter beoordeling aangeboden.

Hiermee wordt:

- de afhankelijkheid van technische verzoekstructuren doorbroken
- autorisatie gebaseerd op een expliciet en gestandaardiseerd model
- autorisatiebeleid beter technisch testbaar en herbruikbaar gemaakt

Voor implementerende partijen betekent dit:

- gebruik van het gestandaardiseerde AuthZEN-autorisatieverzoek tussen PEP en PDP
- aanpassen van de machineleesbare policies

De NLGov AuthZEN-standaard standaardiseert uitsluitend de interface tussen PEP en PDP en vervangt geen IAM-functionaliteit en geen policy-engine.

```
Hier komt een verwijzing naar een demo die een standaard request laat zien en een authzen request volgens deze RFC ....
```

# 1. Inleiding

Autorisatie is binnen het landelijke zorgstelsel gepositioneerd als een generieke functie. Deze functie dient stelselbreed te functioneren, onafhankelijk te zijn van individuele bronnen (Registers), normeerbaar te zijn en interoperabel toegepast te kunnen worden. Deze uitgangspunten zijn verankerd in beleidskaders rondom generieke functies en worden onder meer bevestigd in het Twiin Vertrouwensmodel.

Binnen het iWlz-stelsel opereren meerdere bronhouders onder een gezamenlijk beleidskader. In deze context is het noodzakelijk dat autorisatie op een consistente en eenduidige wijze wordt toegepast. 

In de huidige situatie wordt het inkomende API-request (GraphQL-request) als één geheel in één JSON-document aangeboden aan de policy-engine voor evaluatie. Dit gecombineerde verzoek wordt vervolgens als input gebruikt voor policy-evaluatie. Hierdoor is de autorisatiebeslissing afhankelijk van de technische representatie van het verzoek, zoals querystructuur, variabelen en filters, wat leidt tot een ongewenste koppeling tussen techniek en autorisatie.

Dit document beschrijft een voorstel om deze scheiding te realiseren door de autorisatievraag te standaardiseren. De Policy Enforcement Point (PEP) is hierbij verantwoordelijk voor het afleiden van een gestandaardiseerde autorisatievraag uit het inkomende verzoek, terwijl de Policy Decision Point (PDP) deze vraag evalueert op basis van centraal beheerd autorisatiebeleid.

# 2. Probleemstelling


Binnen het iWlz-stelsel wordt autorisatie toegepast in een context waarin meerdere bronhouders opereren onder een gezamenlijk beleidskader. Hoewel autorisatie als generieke functie stelselbreed consistent en onafhankelijk van applicaties moet functioneren, blijkt in de huidige situatie dat de implementatie van autorisatie sterk verweven is met de technische invulling van individuele API’s.

Concreet wordt een inkomend API-request (bijvoorbeeld een GraphQL-request) momenteel als één geheel verwerkt Dit verzoek wordt als input aangeboden aan de policy-engine voor evaluatie.

Hierdoor ontstaan de volgende knelpunten:

- Verwevenheid van business- en autorisatielogica; Autorisatiebeslissingen zijn direct afhankelijk van de structuur en inhoud van het API-request, zoals query-opbouw, variabelen en filters. Hierdoor ontstaat een ongewenste koppeling tussen businessvraag en autorisatielogica
- Gebrek aan standaardisatie van de autorisatievraag; Er is geen uniform model voor de autorisatievraag tussen Policy Enforcement Points (PEP) en Policy Decision Points (PDP). Iedere implementatie bepaalt zelf hoe autorisatie-attributen worden afgeleid en aangeboden, wat leidt tot inconsistente interpretaties
- Bronhouders zijn nu gebonden aan specieke PEP en PDP "vendor lock-in", de PDP heeft een gekozen taal REGO en ieder Vendor heeft haar eigen implementatie
- Beperkte herbruikbaarheid en toetsbaarheid van beleid; Autorisatiebeleid is gekoppeld aan specifieke API-structuren en daardoor moeilijk herbruikbaar. Daarnaast wordt het lastiger om autorisatiebeslissingen consistent te toetsen en te verantwoorden


# 3. Architectuurprincipes

```
NB Dit principes die niet officieel zijn vastgelegd en zijn niet afkomstig van referentiearchitectuur; deze is er namelijk nog niet.
```

Autorisatie binnen het iWlz-stelsel moet voldoen aan de volgende architectuurprincipes:

- **Scheiding van verantwoordelijkheden**; De verantwoordelijkheid voor policy enforcement, policy decision en policy governance moet expliciet zijn gescheiden. Het Policy Enforcement Point (PEP) is verantwoordelijk voor het afdwingen van autorisatiebesluiten bij de applicatie of gateway. Het Policy Decision Point (PDP) is verantwoordelijk voor het nemen van autorisatiebesluiten. De governance op het autorisatiebeleid is centraal belegd bij ZINL.
- **Standaardisatie van autorisatieverzoeken**; Autorisatieverzoeken tussen PEP en PDP moeten via een uniforme en gestandaardiseerde interface verlopen, zodat autorisatiebesluiten op consistente wijze kunnen worden aangevraagd en verwerkt.
- **Loskoppeling van PEP-PDP interface en GraphQL-implementatie**; De interface waarmee de PEP autorisatiebesluiten opvraagt bij de PDP moet onafhankelijk zijn van de implementatie van de GraphQL-server. Dit betekent dat wijzigingen in de GraphQL-server geen invloed mogen hebben op de manier waarop de PEP autorisatiebesluiten opvraagt.
- **Stelselbrede interoperabiliteit**; Bronhouders en andere stelselpartijen moeten dezelfde autorisatie-interface en semantiek hanteren, zodat autorisatie stelselbreed consistent, uitlegbaar en interoperabel kan worden toegepast.


# 4. Huidige situatie

De huidige situatie is gebaseerd op één GraphQL-request dat binnenkomt bij de PEP (gateway). De PEP leidt hieruit de input voor de policy-evaluatie af en biedt deze als een JSON-document aan aan de Open Policy Agent (OPA). Dit JSON-document is niet gedefinieerd volgens een open standaard; de structuur en inhoud ervan worden bepaald door de specifieke PEP-implementatie en kunnen daardoor verschillen.

OPA evalueert deze input op basis van de in de policy bundle gedefinieerde Rego-policies en de bijbehorende policy-structuur. Hierbij worden zowel verzoekattributen als elementen uit de GraphQL-query, zoals variabelen en filters, betrokken in de autorisatiebeslissing.

In deze opzet is geen expliciete scheiding aanwezig tussen businessvraag en autorisatielogica. Beide zijn impliciet verweven in de input voor de policy-evaluatie, waardoor autorisatiebeslissingen afhankelijk zijn van de specifieke technische representatie van het inkomende GraphQL-request en de wijze waarop de PEP dit vertaalt naar OPA-input.

Binnen het iWLZ domein fungeert de Open Policy Agent (OPA) als Policy Decision Point (PDP).


```mermaid
flowchart TD
A[1. Client] --> B[2. PEP gateway]

B --> C[3. Verwerkt GraphQL verzoek<br/>business + autorisatie verweven]

C --> D[4. OPA input direct afgeleid van verzoek<br/>parsed_body + attributes]

D --> E[5. OPA / PDP]
E --> F[6. Rego policies<br/>parsen GraphQL query + variables]

F --> G[7. Allow / Deny]

G --> B
B --> H{8. Decision}
H -->|allow| I[9. Businessvraag doorzetten]
H -->|deny| J[10. Weigeren]

I --> L[11. Resource server]
L --> K[12. Response]
```

- (1-2) Het verzoek komt binnen via de GraphQL applicatie / PEP gateway  
- (3-4) Het verzoek wordt als geheel gebruikt als input voor autorisatievraag 
- (5-7) De PDP evalueert dit via Rego policies  
- (8-11) Op basis van de beslissing wordt de businessvraag doorgezet of geweigerd

# 5. Doelarchitectuur

Het is wenselijk om een expliciete scheiding aan te brengen tussen businessvraag en autorisatievraag.
Daartoe wordt voorgesteld dat de implementerende partij binnen de Policy Enforcement Point (PEP)-gateway voorziet in een pre-processing functie.

De implementerende partij is vrij in de keuze van technologie voor deze functionaliteit, mits wordt voldaan aan de volgende uitgangspunten:
-	De autorisatievraag wordt opgebouwd conform de specificaties zoals in Hoofdstuk 6 omschreven.
- De pre processor dient alleen gebruikt te worden voor het aanmaken van het autorisatieverzoek; het mag nooit eigen geimplementeerde businesslogica bevatten

In het kader van stelselbrede interoperabiliteit dient de oplossing niet beperkt te zijn tot één specifieke API-technologie. Naast GraphQL-requests moeten ook andere API-protocollen ondersteund kunnen worden.

Hierbij geldt:

- Binnen het iWlz-stelsel wordt gebruik gemaakt van GraphQL. Voor GraphQL worden expliciet GraphQL directives gebruikt om te signaleren dat voor een bepaalde operatie een autorisatiebesluit vereist is. Deze directives hebben een directe relatie met de AuthZEN Access Evaluation Request, zoals beschreven in Hoofdstuk 6.
- De wijze waarop de pre-processing functie deze directives herkent en interpreteert is een implementatiedetail. De standaardisatie richt zich uitsluitend op de autorisatievraag die door de PEP aan de Policy Decision Point (PDP) wordt aangeboden.

Noot: Deze RFC beperkt zich tot GraphQL als protocol binnen het iWlz-stelsel. Voor andere protocollen, zoals CloudEvents, dient in de betreffende RFC rekening te worden gehouden met het autorisatiemodel uit deze RFC.

```
NB Nog aan werken.....ahv directives verhaal v vandaag
```

## 5.1 Doelarchitectuur 

```mermaid
flowchart TD
    A[Client]

    subgraph B[PEP Gateway]
        C[1. Verzoek binnenkomst PEP]
        C --> C1[2. Token validatie<br/>rudimentaire controles]
        C1 --> CALL[3. Aanroep Preprocessor<br/>volledige context meegeven]

        subgraph P[Autorisatie Preprocessor]
            P1[4. Valideer GraphQL verzoek<br/>tegen GraphQL schema]
            P1 --> P2[5. Bepaal van toepassing zijnde<br/>policy directives]
            P2 --> P3[6. Construeer Access Evaluation Requests<br/>per directive]
            P3 --> P4[7. Retourneer Array of Access Evaluation Requests]
        end

        CALL --> P1
        P4 --> E[8. Construeer AuthZEN bericht<br/>subject + action + context<br/>+ Array of Access Evaluation Requests<br/>zie Hfdst. 6]

        K{11. Decision}
        K -->|deny| L[12. Toegang geweigerd]
        K -->|allow| FWD[13. Stuur businessverzoek door<br/>naar bronregister]
    end

    subgraph O[PDP]
        H[9. Evalueer AuthZEN bericht<br/>policy-engine / OPA]
        H --> J[10. Allow / Deny]
    end

    A --> C
    E --> H
    J --> K
    FWD --> M[14. Response van bronregister]
    M --> N[15. Response naar client]
    L --> N


```

Dit houdt in:

- Implementatie van Pre Processor
- Binnen de Pre Processor wordt de Authorisatie attributen geextraheerd
- De Pre Processor zorgt ervoor dat deze Authorisatiedata die wordt aangeboden aan de PDP volgens de structuur en standaarden voldoet zoals omschreven in Hoofdstuk 6; maw de PEP stelt het AuthZen bericht op


# 6. Autorisatiecontract iWlz AuthZEN-profiel

```
NB Dit is work in progress; wij zijn op zoek naar een werkbare oplossing die wel duidelijkheid en structuur biedt.
```



Dit hoofdstuk beschrijft hoe een autorisatieverzoek eruit moet zien binnen het iWlz-stelsel.

Het model is gebaseerd op:

- OpenID AuthZEN Authorization API 1.0  
- NLGov AuthZEN profiel  

Dit document definieert een iWlz-profiel op deze standaarden.

Dat betekent:

- de structuur volgt AuthZEN;
- de betekenis van velden en waarden wordt hier vastgelegd;
- codelijsten onderdeel zijn van de standaard.

De technische implementatie van autorisatie (zoals policy-engines of architectuurkeuzes) valt buiten scope.

Naast de beschrijving in dit hoofdstuk is een JSON Schema beschikbaar dat het autorisatieverzoek machine-valideerbaar maakt.

Dit schema kan worden gebruikt voor:
- validatie van autorisatieverzoeken
- contractafspraken tussen partijen
- implementatie in PEP gateway

U kunt het schema [hier](./RFC0052-schema.json) downloaden.

## 6.1 Structuur van het autorisatieverzoek

Een autorisatieverzoek bestaat altijd uit:

- subject
- action
- resource
- context


## 6.2 Subject

Het `subject` beschrijft de actor die de actie uitvoert.

De structuur van het subject volgt het AuthZEN-model en bestaat uit:

- `type` → het type actor
- `id` → de unieke identificatie van de actor
- `properties` → aanvullende kenmerken van de actor

| Attribuut | Verplicht | Toelichting |
|---|---|---|
| type | Ja | Type actor (bijv. `organization`, `user`, `system`) |
| id | Ja | Unieke identifier van de actor |
| properties | Nee | Aanvullende domeinspecifieke gegevens |


### Toelichting

- Het veld `type` geeft aan wat voor soort actor het betreft (bijvoorbeeld een organisatie of een gebruiker).
- Het veld `id` identificeert de actor uniek binnen het stelsel. In de praktijk is dit vaak afkomstig uit het access-token.
- Het veld `properties` bevat aanvullende kenmerken die relevant zijn voor autorisatie, zoals:
  - rollen (`roles`)
  - organisatiekenmerken (`organization_type`)
  - identifiers (bijv. UZOVI- of AGB-code)
  - regio (`region`)

Deze attributen sluiten aan op de codelijsten in paragraaf 6.6.


### Richtlijnen

- Het id attribuut is conform de specificaties van [RFC0008](https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0008%20-%20Notificaties.md#331-afzender-en-ontvanger-lijst).
- Domeinspecifieke attributen worden onder `properties` geplaatst.
- De betekenis van attributen in `properties` is consistent met de codelijsten.
- Het moet mogelijk zijn om de waarden van het subject te herleiden naar een betrouwbare bron (bijv. een access-token of een externe bron).

## 6.3 Action

De `action` beschrijft welke handeling wordt uitgevoerd op de resource.

De structuur van `action` volgt het AuthZEN-model en bestaat uit een object met een `name` veld.

```json
{
  "action": {
    "name": "read"
  }
}
```

| Attribuut | Verplicht | Toelichting |
|---|---|---|
|name|Ja|De uit te voeren handeling(bijv. query/mutation)|


### Toelichting

- Het veld name geeft aan wat de actor wil doen met de resource (bijvoorbeeld raadplegen of wijzigen).
- De waarde van action.name bepaalt samen met resource en context welke autorisatieregels van toepassing zijn.
- De toegestane waarden zijn vastgelegd in de codelijsten (zie paragraaf 6.6).

### Richtlijnen

- De action wordt conform AuthZEN altijd als object vastgelegd (bijvoorbeeld { "name": "read" }).
- Het gebruik van een losse string zoals "action": "read" is niet toegestaan.
- De waarde van `action.name` moet afkomstig zijn uit de vastgestelde codelijst.
- De betekenis van de gekozen actie moet consistent zijn binnen het stelsel.

```
NB dit zou in de toekomst nog verder uitgebreid kunnen worden, dit is afhankelijk van toekomstige ontwikkelingen.
```

## 6.4 Resource

De `resource` beschrijft het object waarop de actie wordt uitgevoerd.

Binnen het iWlz-stelsel wordt voor gegevensuitwisseling gebruikgemaakt van GraphQL.

In deze context wordt de op te vragen dataset in belangrijke mate bepaald door filtercriteria, zoals vastgelegd in de GraphQL `where` clause.

Een groot deel van de autorisatielogica is gebaseerd op deze filtercriteria. Autorisatie vindt daarmee niet alleen plaats op het niveau van de resource, maar ook op de selectie van gegevens binnen die resource.

Om deze reden wordt binnen het iWlz-profiel de filtercontext expliciet opgenomen in het autorisatieverzoek.

Deze filtercontext wordt gemodelleerd als onderdeel van de `resource`, onder `resource.properties.query_filter`.

De `query_filter` bevat een genormaliseerde representatie van de filtercriteria uit het inkomende verzoek. Voor GraphQL-verzoeken komt deze overeen met de `where` clause.

De structuur van de resource volgt het AuthZEN-model en bestaat uit:

- `type` → het soort resource
- `id` → de unieke identificatie van de resource
- `properties` → aanvullende kenmerken, inclusief filtercontext

| Attribuut | Verplicht | Toelichting |
|---|---|---|
| type | Ja | Type van de resource (bijv. WLZ_INDICATIE, BEMIDDELING) |
| id | Ja | Unieke identifier van de resource   |
| properties.query_filter | Ja | Genormaliseerde representatie van de filtercriteria (bijv. GraphQL `where` clause) |
| properties | Nee | Overige attributen die relevant zijn voor autorisatie |


```
NB ID nader te bepalen..zou bijv (bijv audienceURL) kunnen worden. Sommige velden kunnen Dieper gequeried kunnen worden dan andere velden, wellicht dit toch onderdeel maken van de autorisatie. Om bepaalde kwetsbaarheden die gerelateerd zijn aan diepe queries (overload) te mitigeren wordt ook gedacht aan edge oplossing (bijv APIM).
```

### Toelichting

- Het veld `type` bepaalt op welk soort object de autorisatie betrekking heeft en moet aansluiten bij de functionele context (bijv. service en operation).
- Het veld `id` identificeert de specifieke resource waarop de actie wordt uitgevoerd. De herkomst ligt doorgaans in het inkomende API-verzoek.
- Het veld `properties` bevat aanvullende kenmerken die nodig kunnen zijn voor autorisatiebeslissingen, zoals:
  - eigenaar (`owner`)
  - regio (`region`)
  - gevoeligheid (`sensitivity`)

### Richtlijnen

- De filtercontext wordt opgenomen onder `resource.properties.query_filter`.
- De inhoud van `query_filter` is herleidbaar naar het inkomende verzoek.

Deze aanvullende attributen sluiten aan op de codelijsten in paragraaf 6.6.


## 6.5 Context

De `context` bevat aanvullende informatie die nodig is om een autorisatiebeslissing te kunnen nemen.

De context beschrijft de omstandigheden waaronder de actie plaatsvindt, zoals het doel van gebruik, de functionele dienst en de relatie tussen betrokken partijen.

| Attribuut | Verplicht | Toelichting |
|---|---|---|
| purpose_of_use | Ja | Doel van de gegevensverwerking |
| service | Ja | Functionele dienst waarop de actie betrekking heeft |
| operation | Ja | Specifieke handeling binnen de service |
| relation | Ja | Relatie tussen subject en resource-eigenaar (bijv. WLZ_EXECUTION) |
| contract_active | Ja | Of er een geldige relatie bestaat |
| time | Ja | Tijdstip van het verzoek (ISO 8601) |

### Toelichting

- `service` en `operation` beschrijven samen de functionele context van het verzoek en bepalen welke autorisatieregels van toepassing zijn.
- `relation` geeft de aard van de relatie tussen de actor en de resource weer (bijv. binnen het iWlz-domein).
- `contract_active` geeft aan of er een geldige relatie bestaat die toegang rechtvaardigt.
- `time` legt het moment van het verzoek vast en wordt gebruikt voor tijdsafhankelijke autorisatie.

### Richtlijnen

- De combinatie van `service` en `operation` moet overeenkomen met de codelijsten in paragraaf 6.6.
- De waarden in `context` moeten consistent zijn met de betekenis van de bijbehorende codelijsten.
- Het moet altijd mogelijk zijn om de waarden in de context te herleiden naar een bron (bijv. API-verzoek, token of externe bron).

## 6.6 Codelijsten (normatief)

Deze codelijsten zijn onderdeel van de standaard.

- Gebruik is verplicht  
- Afwijkingen zijn niet toegestaan  

```
NB De codelijsten zijn nog ter discussie; uiteindelijke doel is duidelijkheid en niet stricte koppeling waardoor er een onwerkbare situatie ontstaat
```

### 6.6.1 action

| Waarde |
|---|
| QUERY |
| MUTATION |


### 6.6.2 service

| Waarde |
|---|
| INDICATIEREGISTER |
| BEMIDDELINGSREGISTER |
| LEVERINGSREGISTER |
| NOTIFICATIESERVICE |
| MELDINGSERVICE|


NB  dit kan in de toekomst nog uitgebreid worden

### 6.6.3 operation


NB dubbelcheck...nl gov authzen...als niet verplicht...dan operation eruit halen

#### INDICATIEREGISTER
- raadpleegIndicatie

#### BEMIDDELINGSREGISTER
- raadpleegBemiddeling  
- raadpleegRegiehouder  
- raadpleegOverdracht  
- raadpleegBemiddelingspecificatie

#### CLIENTREGISTER
- raadpleegClient  
- wijzigClient  

#### LEVERINGSREGISTER
- raadpleegToewijzing  
- wijzigToewijzing  

#### NOTIFICATIESERVICE
- zendNotificatie  
- zendMelding  

**Validatieregel:**  
De combinatie van `service` en `operation` moet logisch kloppen.  
Een ongeldige combinatie moet worden afgewezen.


### 6.6.4 organization_type

ZORGKANTOOR  
ZORGAANBIEDER  
CIZ  
VECOZO  
BURGER

Bronnen:

- https://www.agbcode.nl/  
- https://www.vecozo.nl/  
- https://istandaarden.nl/iwlz  


## 6.7 Herkomst van attributen

Attributen kunnen uit verschillende bronnen komen:

- token  
- API-verzoek  
- externe bron  
- configuratie  

De herkomst moet altijd herleidbaar zijn naar een betrouwbare bron (bijv. access-token, API-verzoek of externe bron).


# 7. Terminologie

| ***Term*** | ***Omschrijving*** |
|---|---|
| PEP | Policy Enforcement Point; Handhaving autorisatie (entrypoint) |
| PAP | Policy Administration Point; Beheer autorisatiebeleid, publiceert policies  |
| PRP | Policy Retrieval Point; Stelt policies beschikbaar aan PDP's |
| PIP | Policy Information Point; Levert attributen en contextinformatie voor autorisatiebesluiten |
| PDP | Policy Decision Point; Evalueert policies en neemt het autorisatiebesluit |
| AuthZEN | Autorisatie API standaard |
| OPA | Open Policy Agent |
| TWIIN | Transport, Wisselwerking, Informatie, In Netwerken |


# 8. Referenties

- [GEN_FUNC_AUTORISEREN] Ist en soll - onderzoek voor de generieke functie Autoriseren, Open Overheid: https://open.overheid.nl/documenten/423d14f1-5228-4dd1-b79f-97a78b58eff5/file
- [TWIIN_VERTRAUWENSMODEL] Twiin Vertrouwensmodel: https://www.twiin.nl/twiin-vertrouwensmodel
- [TWIIN_BEGRIP_VERTRAUWENSMODEL] Begrip: Twiin Vertrouwensmodel, Twiin Afsprakenstelsel: https://afsprakenstelsel.twiin.nl/normatief/ta140/begrip-twiin-vertrouwensmodel
- [AUTHZEN_FINAL] OpenID Autorisatie API 1.0 Final Specification: https://openid.net/specs/authorization-api-1_0.html
- [AUTHZEN_FINAL_APPROVAL] OpenID Autorisatie API 1.0 Final Specification Approved: https://openid.net/autorisatie-api-1-0-final-specification-approved/
- [NLGOV_AUTHZEN] NLGov Profile for OpenID AuthZEN Autorisatie API: https://logius-standaarden.github.io/authzen-nlgov/
- [OPA] Open Policy Agent: https://www.openpolicyagent.org/
- [RFC_STATUS] Status RFC: https://github.com/iStandaarden/iWlz-RequestForComment/issues/52
