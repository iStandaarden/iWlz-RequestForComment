![header](../imagesrc/ZinBanner.png "template_header")

# RFC0022a - Tracelogging - TraceID en SpanID
<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**  
Binnen het iWlz-netwerkmodel ontbreekt het aan gestandaardiseerde tracelogging, waardoor het lastig is om transacties en gebeurtenissen end-to-end te volgen en analyseren.

**Beoogde situatie:**  
- **Traceerbare loggegevens over verschillende registers heen:** Door het implementeren van gestandaardiseerde tracelogging wordt het mogelijk om de volledige keten van gebeurtenissen consistent en eenduidig te volgen binnen het iWlz-netwerkmodel.  
- **Gefaseerde uitbreiding van functionaliteit:** De implementatie van tracelogging is gepland in drie fasen. In de eerste fase ligt de focus op het introduceren van `TraceId` en  `SpanId` voor basis traceerbaarheid. In latere fasen wordt `ParentSpanId` en mechanismen voor het beschikbaar stellen van loggingdata toegevoegd om de traceerbaarheid en analyse verder te verdiepen.

<font size="4">**Status RFC**</font>

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/37) om de actuele status van deze RFC te bekijken.

---

**Inhoudsopgave**
- [SAMENVATTING](#samenvatting)
- [1. Inleiding](#1-inleiding)
  - [1.1 Uitgangspunten](#11-uitgangspunten)
    - [Fase 1: Invoering van TraceID](#📘-fase-1-invoering-van-traceid)
    - [Fase 2: Uitbreiding met SpanID en ParentSpanID](#📘-fase-2-uitbreiding-met-spanid-en-parentspanid)
    - [Fase 3: Beschikbaar stellen van tracing-data](#📘-fase-3-beschikbaar-stellen-van-tracing-data)
- [2. Terminologie](#2-terminologie)
- [3. Traceerbaarheid](#3-traceerbaarheid)
  - [3.1 Fase 1: Invoering van TraceID](#31-fase-1-invoering-van-traceid)
    - [3.1.1 Standaardisatie van TraceId-generatie via OpenTelemetry](#311-standaardisatie-van-traceid-generatie-via-opentelemetry)
    - [3.1.2 Toevoegen aan uitgaande requests](#312-toevoegen-aan-uitgaande-requests)
    - [3.1.3 Randvoorwaarden voor TraceId](#313-randvoorwaarden-voor-traceid)
    - [3.1.4 Validatie en foutafhandeling van TraceId](#314-validatie-en-foutafhandeling-van-traceid)
  - [3.2 Fase 2: Uitbreiding met SpanID en ParentSpanID](#32-fase-2-uitbreiding-met-spanid-en-parentspanid)
  - [3.3 Fase 3: Beschikbaar stellen van tracing-data](#33-fase-3-beschikbaar-stellen-van-tracing-data)
- [4. Privacyoverwegingen en AVG-toetsing](#3-privacyoverwegingen-en-avg-toetsing)

---
# 1. Inleiding

In een gedistribueerd netwerkmodel, zoals dat van iWlz, is het essentieel om gebeurtenissen (events) effectief te kunnen volgen en analyseren. Dit is cruciaal voor het waarborgen van de betrouwbaarheid, prestaties en transparantie van het systeem. Het ontbreken van gestandaardiseerde tracelogging belemmert momenteel het vermogen om transacties effectief te traceren, wat leidt tot inefficiënties en uitdagingen bij het oplossen van incidenten.​

Deze RFC introduceert een gestandaardiseerde aanpak voor tracelogging binnen het iWlz-netwerkmodel. Het doel is om een uniforme structuur en semantiek te definiëren voor het vastleggen van events in tracelogs, waardoor traceerbaarheid over verschillende systemen en domeinen heen mogelijk wordt. Dit zal bijdragen aan een verbeterde monitoring, foutopsporing en algemene systeemtransparantie.​

De focus van deze RFC ligt uitsluitend op tracelogging en de bijbehorende traceerbaarheid. Aspecten zoals auditlogging en exportmechanismen worden als aparte onderwerpen beschouwd en vallen buiten de scope van dit document.​

## 1.1 Uitgangspunten

De implementatie van tracelogging is gestructureerd in drie fasen, die samen zorgen voor volledige traceerbaarheid binnen het iWlz-netwerkmodel. De uitgangspunten vormen de drie fasen en geven richting aan de verdere uitwerking en implementatie daarvan.
### 📘 Fase 1: Invoering van TraceID en SpanID

- **Traceerbaarheid over domeinen heen:** Het is essentieel dat logging traceerbaar is over de registers heen, waarbij loggebeurtenissen nauwkeurig kunnen worden gevolgd en gekoppeld, ook wanneer deze gebeurtenissen zich over verschillende delen van het netwerk verspreiden.

- **Uniformiteit van logging:** Logging vanuit verschillende bronnen binnen het netwerkmodel moet uniform en vergelijkbaar zijn. Dit zorgt voor consistentie en vereenvoudigt het proces van gegevensanalyse en -interpretatie.

### 📘 Fase 2: Uitbreiding met ParentSpanID

- **Hiërarchische traceerbaarheid:** Door het introduceren van ParentSpanID kan een hiërarchische structuur van de trace worden opgebouwd. Dit maakt het mogelijk om de relatie tussen verschillende events binnen een trace te begrijpen en te visualiseren.

### 📘 Fase 3: Beschikbaar stellen van tracing-data

- **Aanwezigheid van exportfaciliteit:** Om traceerbare loggegevens te waarborgen en de mogelijkheid te bieden voor gegevensanalyse buiten het directe netwerkmodel, moet een exportfaciliteit aanwezig zijn. Deze faciliteit stelt gebruikers in staat om loggegevens veilig en efficiënt te exporteren naar externe systemen of opslaglocaties.

- **Standaardisatie van syntax en semantiek:** Bij het ontwikkelen van de exportfaciliteit is het van cruciaal belang om de syntax en semantiek van de export vast te leggen. Dit zorgt ervoor dat loggegevens op een consistente en begrijpelijke manier worden gepresenteerd, ongeacht het doel of de bestemming van de export.

- **Behoud van integriteit en beveiliging:** De exportfaciliteit moet worden ontworpen met het oog op het behoud van de integriteit en beveiliging van loggegevens. Dit omvat maatregelen om de vertrouwelijkheid, beschikbaarheid en authenticiteit van de geëxporteerde gegevens te waarborgen, evenals mechanismen voor het detecteren en voorkomen van manipulatie tijdens het exportproces.

*Opmerking:* Deze gefaseerde aanpak is in lijn met best practices voor het implementeren van distributed tracing, zoals aanbevolen door o.a. OpenTelemetry. De initiële implementatie met alleen een TraceId en SpanId biedt al waardevolle traceerbaarheid en legt de basis voor verdere uitbreidingen. In latere fasen kunnen ParentSpanId en exportfunctionaliteiten worden toegevoegd om de traceerbaarheid en analyse verder te verbeteren.

## 1.2 Relatie andere RFC
Deze RFC heeft een relatie met de volgende RFC(s)

| RFC       | onderwerp                                      | relatie        | toelichting            | issue                                                                 |
|:----------|:-----------------------------------------------|:---------------|:------------------------|:----------------------------------------------------------------------|
| RFC0022b  | Tracelogging - ParentSpanID                    | voorwaardelijk | Tracelogging - Fase 2  | [#48](https://github.com/iStandaarden/iWlz-RequestForComment/issues/48) |
| RFC0022c  | Tracelogging - Beschikbaar stellen van tracing-data | voorwaardelijk | Tracelogging - Fase 3  | [#49](https://github.com/iStandaarden/iWlz-RequestForComment/issues/49) |


<sup>*</sup>voorwaardelijk, *voor andere RFC* / afhankelijk, *van andere RFC*


# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| :------------ | :------------ |
| Actie | *Verwerking* in een *informatiesysteem*, in het kader van een *gebeurtenis* |
| Autorisatie | Het toekennen van bevoegdheden |
| Autorisatieprotocol | Autorisatietabel, die bepaalt welke categorieën *cliënt*gegevens voor welke categorieën *zorginstellingen* toegankelijk zijn onder welke voorwaarden. |
| Cliënt | Persoon die zorg vraagt of aan wie zorg wordt verleend of de identificeerbare persoon van wie *persoonlijke gezondheidsinformatie* wordt verwerkt |
| Directie | Persoon of groep van personen die een organisatie op het hoogste niveau bestuurt en beheert |
| Elektronisch patiëntdossier | Verzameling van alle elektronisch vastgelegde persoonlijke gezondheidsinformatie van een *cliënt* bij een *zorginstelling* of een andere organisatie die *persoonlijke gezondheidsinformatie* verwerkt |
| Gebeurtenis | Voorval, activiteit of optreden van een wijziging in een *informatiesysteem* |
| Gebruiker | Natuurlijke persoon, organisatie of proces in een informatiesysteem, betrokken bij een *actie* |
| Identificatie | Kenmerk dat een persoon of andere entiteit identificeert |
| Identificator | Kenmerk dat een persoon of andere entiteit identificeert |
| Informatiedomein | Gespecificeerd gebied waarbinnen de verantwoordelijkheden voor de informatievoorziening zijn bepaald, dezelfde regels gelden voor informatiebeveiliging en dezelfde systematiek wordt gevolgd voor *identificatie* van personen, systemen en andere *objecten* |
| Informatiesysteem | Toepassingen, diensten, informatietechnologische bedrijfsmiddelen of andere gegevensverwerkende componenten |
| Logbeheerder | Functionaris die binnen een *zorginstelling* of andere organisatie die *persoonlijke gezondheidsinformatie* verwerkt, verantwoordelijk is voor het beheren van de logging en het uitvoeren van het door de *logverantwoordelijke* vastgestelde beleid |
| Loggegevens | elektronisch vastgelegde gegevens die bij een bepaalde *gebeurtenis* worden gelogd |
| Loggen | *Gebeurtenissen* chronologisch vastleggen |
| Logging | Resultaat van het *loggen* |
| Logverantwoordelijke | *Directie* van de organisatie die *persoonlijke gezondheidsinformatie* verwerkt |
| Object | Zaak of persoon waarop een *actie* betrekking heeft |
| Persoonlijke gezondheidsinformatie | Informatie over een identificeerbare persoon die verband houdt met de lichamelijke of geestelijke gesteldheid van, of de verlening van zorgdiensten aan, de persoon in kwestie |
| Toegangspunt | Aansluiting van waaruit de *gebruiker* de *gebeurten*is in het *informatiesysteem* heeft doen plaatsvinden |
| Toestemmingsprofiel | Vastlegging, landelijk, regionaal of lokaal, door de *cliënt* zelf bepaald, van wie in welke omstandigheden al of niet toegang mag krijgen tot bepaalde gegevens van de desbetreffende *cliënt* |
| Toezichthouder | Functie van een persoon die binnen een zorginstelling of een andere organisatie die *persoonlijke gezondheidsinformatie* verwerkt, dan wel landelijk of regionaal toezicht houdt op de naleving van weten regelgeving rond de toegang tot *elektronische patiëntdossiers* |
| Verantwoordelijke gebruiker | Natuurlijke persoon die verantwoordelijk is voor een *actie* |
| Verwerking | Een bewerking of een geheel van bewerkingen met betrekking tot persoonsgegevens of een geheel van persoonsgegevens, al dan niet uitgevoerd via geautomatiseerde procedés, zoals het verzamelen, vastleggen, ordenen, structureren, opslaan, bijwerken of wijzigen, opvragen, raadplegen, gebruiken, verstrekken door middel van doorzending, verspreiden of op andere wijze ter beschikking stellen, aligneren of combineren, afschermen, wissen of vernietigen van gegevens |
| XML‐exportfaciliteit | Dienst die de complete *logging* volgens een gevraagde selectie oplevert in de vorm van een XMLbestand waarbij alle velden herleidbaar zijn naar de in hoofdstuk 5 van deze norm benoemde gegevensvelden |
| Zorgaanbieder | *Zorgverlener* of *zorginstelling* |
| Zorginstelling | Rechtspersoon die bedrijfsmatig zorg verleent, alsmede een organisatorisch verband van natuurlijke personen die bedrijfsmatig zorg verlenen of doen verlenen, alsmede een natuurlijke persoon die bedrijfsmatig zorg doet verlenen, alsmede een solistisch werkende *zorgverlener* |
| Zorgverlener | Een natuurlijke persoon die beroepsmatig zorg verleent |

# 3. Traceerbaarheid
Traceerbaarheid binnen het iWlz-netwerkmodel wordt geïmplementeerd in drie opeenvolgende fasen. Elke fase bouwt voort op de vorige en introduceert aanvullende functionaliteiten om de traceerbaarheid te verbeteren.

## 3.1 Fase 1: Invoering van TraceID en SpanID

In de eerste fase wordt een unieke `TraceId` geïntroduceerd voor elke inkomende request. Deze `TraceId` wordt doorgegeven aan alle downstream-services, waardoor gerelateerde logregels kunnen worden gecorreleerd en een globaal overzicht van de requestflow kan worden verkregen.

Daarnaast wordt per verwerkingsstap of service-aanroep een unieke `SpanId` gegenereerd. Deze identifier maakt het mogelijk om individuele bewerkingen binnen een trace afzonderlijk te volgen en in context te plaatsen. Hiermee ontstaat meer inzicht in de interne opbouw en timing van een ketenverzoek.

### 3.1.1 Standaardisatie van TraceId- en SpanId-generatie via OpenTelemetry

Om de kans op botsingen in een gedistribueerde omgeving te minimaliseren, moeten zowel `TraceId`- als `SpanId`-waarden worden gegenereerd met een mechanisme dat voldoet aan de eisen van randomness en voldoende entropie.

Alle partijen dienen gebruik te maken van dezelfde library voor het genereren van deze identifiers. Daarom wordt voorgeschreven dat alle partijen de [OpenTelemetry SDK](https://opentelemetry.io/docs/) gebruiken voor het genereren van zowel `TraceId`- als `SpanId`-waarden. Voor vrijwel alle gangbare programmeertalen zijn OpenTelemetry-implementaties beschikbaar.

In de praktijk kan bijvoorbeeld gebruik worden gemaakt van de volgende compliant libraries:

- `@opentelemetry/api` (JavaScript/Node.js)
- `io.opentelemetry:opentelemetry-api` (Java)
- `opentelemetry-api` (Python)

Hiermee wordt gegarandeerd dat alle gegenereerde `TraceId`- en `SpanId`-waarden voldoen aan de juiste lengte, entropie en formatvereisten.

In Fase 1 wordt bij elk inkomend request op een service een nieuwe `SpanId` gegenereerd. Indien binnen een service onderscheid wordt gemaakt tussen afzonderlijke verwerkingsstappen (zoals authenticatie, validatie of routering), mag hiervoor ook een nieuwe `SpanId` worden aangemaakt.

### 3.1.2 Toevoegen aan uitgaande requests

Zowel de `TraceId` als de `SpanId` worden toegevoegd aan de headers van alle uitgaande requests.

Gebruik hiervoor de volgende headers, conform de [B3 Propagation-standaard](https://github.com/openzipkin/b3-propagation):

- `X-B3-TraceId` – een unieke ID voor het volledige ketenverzoek.
- `X-B3-SpanId` – een unieke ID voor de huidige verwerkingsstap.

> Let op: HTTP-headers zijn niet hoofdlettergevoelig. Conform de B3-standaard wordt aanbevolen de headers te noteren als `X-B3-TraceId` en `X-B3-SpanId` (in kebab-case met hoofdletters).


### 3.1.3 Randvoorwaarden voor TraceId:

Een `TraceId` moet:

- Exact 16 bytes groot zijn, wat overeenkomt met 32 hexadecimale tekens (lowercase).
- Niet uitsluitend uit nullen bestaan (bijv. `0000000000000000` is ongeldig).
- Uniek zijn. TraceIds dienen gegenereerd te worden met behulp van een UUID-generator of via de OpenTelemetry SDK om duplicaten binnen een trace te voorkomen.

**Voorbeeld van een geldig TraceID:**

```http
X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124
```

### 3.1.4 Randvoorwaarden voor SpanId

Een `SpanId` moet:

- Exact 8 bytes groot zijn, wat overeenkomt met 16 hexadecimale tekens (lowercase).
- Niet uitsluitend uit nullen bestaan (bijv. `0000000000000000` is ongeldig).
- Uniek zijn. SpanIds dienen gegenereerd te worden met behulp van een UUID-generator of via de OpenTelemetry SDK om duplicaten binnen een trace te voorkomen.

**Voorbeeld van een geldig SpanId:**

```http
X-B3-SpanId: 0020000000000001
```

### 3.1.5 Validatie en foutafhandeling van TraceId:

Bij binnenkomst wordt gecontroleerd of een `TraceId` aanwezig is:

- Indien aanwezig, wordt deze gebruikt voor verdere verwerking.
- Indien afwezig, wordt het verzoek afgewezen met de volgende foutmelding:

```http
HTTP/1.1 400 Bad Request
{"ErrorCode": "invalid_request", "Error": "The request is missing header X-B3-TraceId"}
```

> Opmerking: Deze validatie is een aanvulling op de OpenTelemetry-specificatie. Die stelt alleen eisen aan de structuur van een `TraceId`, maar schrijft geen validatiegedrag voor aan ontvangende systemen.

Inkomende `X-B3-SpanId`-headers worden in Fase 1 genegeerd. Elke service genereert bij binnenkomst zelf een nieuwe `SpanId`.

### 3.1.6 Flow Fase 1:

![Flow Fase 1](../plantUMLsrc/rfc0022-02-Fase1_flow.svg "Flow Fase 1")
<details>
<summary>plantUML-source</summary>

```plantuml
@startuml
' !pragma teoz true

skinparam ParticipantPadding 20
skinparam BoxPadding 10

box "Deelnemer"
    participant "Client" as Client
end box

box "nID"
    participant "autorisatieserver" as AuthzServer
    participant "nID Filter" as Filter
    participant "Resource-server" as nIDResourceServer
end box

box "Register"
    participant "Resource" as BEMRegister
end box

autonumber "<b>[000]"
activate Client
    Client -> AuthzServer: **Aanvragen van autorisatie**\n"scope": "registers/resource:read"\n Authenticatiemiddel\n<font color=red>X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124\n<font color=red>X-B3-SpanId: a2fb4a1d1a96d312\n<font color=red>
    activate AuthzServer
        AuthzServer -> AuthzServer: Valideer Authenticatiemiddel
        AuthzServer -> AuthzServer: Run Rule-engine o.b.v. scope(s)\n<font color=red>X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124\n<font color=red>X-B3-SpanId: 34cfd3ee730bbe13
        activate AuthzServer #LightGray
            AuthzServer -> AuthzServer: Valideer autorisatie
            AuthzServer -> AuthzServer: Genereer Access-Token\n<font color=red>X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124\n<font color=red>X-B3-SpanId: 34cfd3ee730bbe13
            activate AuthzServer #LightGray
            deactivate AuthzServer
        deactivate AuthzServer
        AuthzServer --> Client --: 200 Response (Access-Token)
    deactivate AuthzServer
deactivate Client

Client -> Filter: **GraphQL Query**\nAuthenticatiemiddel + Access-Token\n<font color=red>X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124\n<font color=red>X-B3-SpanId: 2edb09379a27bfb1\n<font color=red>

activate Filter
note right of Filter: Inline filtering requests
activate Client
Filter -> Filter: Valideer Authenticatiemiddel
Filter -> Filter: Valideer Access-Token
Filter -> Filter: Valideer GraphQL
Filter -> Filter: Valideer GraphQL request met scope(s)


Filter -> nIDResourceServer
deactivate Filter


activate nIDResourceServer
nIDResourceServer -> BEMRegister: GraphQL Request\n<font color=red>X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124\n<font color=red>X-B3-SpanId: 75c38117346fa472

BEMRegister --> nIDResourceServer: 200 Response (GraphQL)
deactivate BEMRegister

nIDResourceServer --> Client: 200 Response (GraphQL)
deactivate nIDResourceServer

deactivate Client
@enduml
```
</details>


# 4. Privacyoverwegingen en AVG-toetsing (TraceId en SpanId)

Het gebruik van een `TraceId` binnen deze RFC is uitsluitend bedoeld voor **technische traceerbaarheid van verzoeken over systeemgrenzen heen**. De `TraceId` is een **willekeurig gegenereerde identificatiecode** die wordt opgenomen in de header van een verzoek en niet wordt opgeslagen in combinatie met identificerende gegevens.

De berichten waarop de `TraceId` betrekking heeft, bevatten reeds persoonsgegevens, waaronder velden als:
- `bsn` (Burgerservicenummer),
- `wlzindicatieID`,
- `besluitnummer`.

Daarmee is duidelijk dat de verwerking van deze berichten onder de AVG valt. Het toevoegen van een `TraceId` **wijzigt het juridische kader van deze verwerking niet**.

Hoewel het theoretisch denkbaar is dat een `TraceId` of `SpanId` – in combinatie met andere gegevens – **indirect herleidbaar zou kunnen zijn tot een persoon**, worden deze identifiers **op zichzelf niet als persoonsgegevens aangemerkt** in de zin van de AVG[^1].

Deze kwalificatie is gebaseerd op de volgende overwegingen:
- beide identifiers worden willekeurig gegenereerd en bevatten geen identificeerbare informatie;
- er is geen directe koppeling met natuurlijke personen;
- de toepassing is strikt technisch en beperkt tot tijdelijke traceerbaarheid van ketenverzoeken (`TraceId`) of afzonderlijke verwerkingsstappen (`SpanId`);
- zij worden uitsluitend gebruikt binnen de context van technische logverwerking en worden niet gekoppeld aan gebruikersinformatie.

Het gebruik van `TraceId` draagt bovendien bij aan **dataminimalisatie**: het maakt het mogelijk om fouten te analyseren zonder dat identificerende gegevens, zoals BSN of IP-adressen, hoeven te worden gelogd. De `TraceId` wordt niet centraal opgeslagen, noch gebruikt voor profilering of gedragsanalyse (AVG, art. 4(4)).

Voor fase 1 van deze RFC geldt dat:
- de `TraceId` en `SpanId` uitsluitend technisch aanwezig zijn in headers;
- zij uitsluitend bedoeld zijn voor tijdelijke technische verwerking, en niet voor centrale of langdurige opslag;
- zij niet worden gekoppeld aan logging van gebruikersinformatie.

De vraag of een `TraceId` in deze context als persoonsgegeven moet worden beschouwd, is voorgelegd aan juridische experts. Mocht uit nader advies blijken dat aanvullende maatregelen vereist zijn, dan worden deze meegenomen in een volgende release of opgenomen in een afzonderlijke verwerkingsbijlage.

[^1]: Zie AVG, artikel 4, lid 1: “Persoonsgegeven: alle informatie over een geïdentificeerde of identificeerbare natuurlijke persoon.” Zie ook EDPB, *Guidelines 4/2019 on the interpretation of personal data in the context of online identifiers*.



