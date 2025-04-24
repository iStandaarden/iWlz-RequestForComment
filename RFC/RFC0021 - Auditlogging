![header](../imagesrc/ZinBanner.png "template_header")

# RFC0021 - Logging - Vereisten en Gegevensspecificaties

### :warning: WAARSCHUWING
**Deze RFC is momenteel nog een kopie van de verouderde RFC0019 en moet nog worden bijgewerkt**

@todo
- [ ] 3.2 / 3.4 ZORGSPECIFIEKE BEHEERSMAATREGEL opmerking behouden? 
- [ ] 4 verder uitwerken, bv 4.3 schema is nog niet correct
- [ ] 5.2.1 valideren
- [ ] 5.2.6 Noodzakelijk of schrappen?
- [ ] 5.3.4 Noodzakelijk of schrappen? indien nodig: verder uitwerken
- [ ] 5.4.9 Noodzakelijk of schrappen? indien nodig: verder uitwerken
- [ ] 5.4.10 Noodzakelijk of schrappen? indien nodig: verder uitwerken
- [ ] 5.4.11 Noodzakelijk of schrappen? indien nodig: verder uitwerken
- [ ] 5.5.3 Noodzakelijk of schrappen? indien nodig: verder uitwerken
- [ ] 6 Voorbeeld logbestand toevoegen
- [ ] Terminologie overnemen in terminologie.md

<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**

Nieuwe functionaliteit

**Beoogde situatie**

Dit document beschrijft de wijze van geautomatiseerde registratie van gebeurtenissen in het netwerkmodel en is beschrijft de practische invulling van de norm in het netwerkmodel. Deze RFC is zeker geen vervanging van de wettelijke richtlijnen.

<font size="4">**Status RFC**</font>

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/17) om de actuele status van deze RFC te bekijken.

---
**Inhoudsopgave**
- [RFC0021 - Logging - Vereisten en Gegevensspecificaties](#rfc0021---logging---vereisten-en-gegevensspecificaties)
    - [:warning: WAARSCHUWING](#warning-waarschuwing)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
  - [1.2 Relatie andere RFC](#12-relatie-andere-rfc)
- [2. Terminologie](#2-terminologie)
- [3 Zekerheidseisen](#3-zekerheidseisen)
  - [3.1 Gebeurtenissen registreren](#31-gebeurtenissen-registreren)
  - [3.2 Beschermen van informatie in logbestanden](#32-beschermen-van-informatie-in-logbestanden)
  - [3.3 Logbestanden van beheerders en operators](#33-logbestanden-van-beheerders-en-operators)
  - [3.4 Kloksynchronisatie](#34-kloksynchronisatie)
  - [3.5 De verantwoordelijkheid voor de logging](#35-de-verantwoordelijkheid-voor-de-logging)
  - [3.6 De beschikbaarheid van de logging](#36-de-beschikbaarheid-van-de-logging)
  - [3.7 De toegang tot de logging](#37-de-toegang-tot-de-logging)
  - [3.8 De bewaartermijn van loggegevens](#38-de-bewaartermijn-van-loggegevens)
  - [3.9 Voorwaarden voor interoperabiliteit](#39-voorwaarden-voor-interoperabiliteit)
- [4 Traceerbaarheid](#4-traceerbaarheid)
  - [4.1 TraceContext](#41-tracecontext)
  - [4.2 X-B3-TraceId](#42-x-b3-traceid)
  - [4.3 X-B3-SpanId](#43-x-b3-spanid)
  - [4.4 X-B3-ParentSpanId](#44-x-b3-parentspanid)
  - [4.3 Voorbeeld van een flow](#43-voorbeeld-van-een-flow)
- [5. Gegevensvelden in de logging](#5-gegevensvelden-in-de-logging)
  - [5.1 Algemeen](#51-algemeen)
  - [5.2 Gebeurtenis](#52-gebeurtenis)
    - [5.2.1 Gebeurteniscode](#521-gebeurteniscode)
    - [5.2.2 Actiecode](#522-actiecode)
    - [5.2.3 Datum en tijd](#523-datum-en-tijd)
    - [5.2.4 Aard van de gebeurtenis](#524-aard-van-de-gebeurtenis)
    - [5.2.5 Resultaat](#525-resultaat)
    - [5.2.6 Controles](#526-controles)
  - [5.3 Gebruiker](#53-gebruiker)
    - [5.3.1 Gebruikers-ID](#531-gebruikers-id)
    - [5.3.2 Lokale gebruikers-ID](#532-lokale-gebruikers-id)
    - [5.3.3 Gebruikersnaam](#533-gebruikersnaam)
    - [5.3.4 Gebruikersrol](#534-gebruikersrol)
    - [5.3.5 Gebruiker is de initiator](#535-gebruiker-is-de-initiator)
    - [5.3.6 ID van verantwoordelijke gebruiker](#536-id-van-verantwoordelijke-gebruiker)
    - [5.3.7 Naam van verantwoordelijke gebruiker](#537-naam-van-verantwoordelijke-gebruiker)
    - [5.3.8 Rol van verantwoordelijke gebruiker](#538-rol-van-verantwoordelijke-gebruiker)
    - [5.3.9 Type toegangspunt](#539-type-toegangspunt)
    - [5.3.10 Identificatie toegangspunt](#5310-identificatie-toegangspunt)
  - [5.4 Object](#54-object)
    - [5.4.1 Identificatortype](#541-identificatortype)
    - [5.4.2 Klasse](#542-klasse)
    - [5.4.3 Identificator](#543-identificator)
    - [5.4.4 Naam](#544-naam)
    - [5.4.5 Details](#545-details)
    - [5.4.6 Autorisatieprotocol](#546-autorisatieprotocol)
    - [5.4.7 Behandelrelatieprotocol](#547-behandelrelatieprotocol)
    - [5.4.8 Toestemmingsprofiel](#548-toestemmingsprofiel)
    - [5.4.9 Gevoeligheid](#549-gevoeligheid)
    - [5.4.10 Categorie](#5410-categorie)
    - [5.4.11 Stadium](#5411-stadium)
    - [5.4.12 Zoekvraag](#5412-zoekvraag)
  - [5.5 Loggegevens](#55-loggegevens)
    - [5.5.1 Identificatie van de locatie](#551-identificatie-van-de-locatie)
    - [5.5.2 Identificatie van de bron](#552-identificatie-van-de-bron)
    - [5.5.3 Type bron van de loggegevens](#553-type-bron-van-de-loggegevens)
- [6. Export](#6-export)

---
# 1. Inleiding

Om de privacy van burgers te waarborgen is het meer dan ooit noodzakelijk om heldere afspraken te maken over de bescherming van (medische) gegevens tegen onbevoegde inzage en onbevoegd gebruik. De in deze RFC voorgeschreven wijze van logging heeft als doel een transparant beeld te geven van de gebeurtenissen in het netwerkmodel m.b.t. alle elektronische gegevensuitwisselingen en de toegang tot (zorg)informatiesystemen.

Logging is de stelselmatige geautomatiseerde registratie van gegevens rond de toegang tot gegevens met als primaire doel de controle van de rechtmatigheid ervan achteraf mogelijk te maken. De logging levert een betrouwbaar overzicht van de gebeurtenissen waarbij (persoonlijke) (gezondheids)informatie is verwerkt. Met de logging kan door verwerkingsverantwoordelijken controle worden uitgeoefend op (on)rechtmatige toegang tot informatie en
verantwoording worden afgelegd aan cliënten/burgers (die recht hebben op inzage van deze gegevens), collega’s en *toezichthouders* over de zorgvuldige en juiste omgang met de (gezondheids)gegevens. Cliënten kunnen de loggegevens gebruiken bij een klacht over (vermeende) onrechtmatige toegang tot persoonlijke informatie. De *zorgaanbieder* en verwerkingsverantwoordelijken kunnen
de logging gebruiken voor het verbeteren van het proces van de toegangscontrole tot (patiënt)gegevens en zo nodig om zich te verdedigen bij aansprakelijkheidsstellingen door cliënten of anderen betrokkenen.

Het complete inzicht in de gegevensstromen biedt de mogelijkheid om snel verdachte patronen te signaleren en kan worden gebruikt om verantwoording af te leggen over onder meer privacy en informatieveiligheid.


## 1.1. Uitgangspunten


| Uitgangspunt | Omschrijving |
| :-------- | :-------- | 
| *Normering* | *Elke netwerkbeheerder dient aantoonbaar logging toe te passen voor informatiebeveiliging, ~~waarbij de logging voldoet aan relevante normen. In de context van de gezondheidszorg is naleving van de NEN 7513-norm voor logging essentieel.~~* |
| *Standaardisatie* | *Alle ketendeelnemers voldoen aan de norm zoals vastgelegd in het afsprakenstelsel iWlz, waaronder eenduidige logging en de mogelijkheid tot exporteren.*
| *Onweerlegbaarheid* | *~~Volgens NEN 7513~~ moet de logging kunnen voorzien in informatie waardoor achteraf onweerlegbaar kan worden vastgesteld welke gebeurtenissen hebben plaatsgevonden op een patiëntendossier of op een elektronisch uitwisselingssysteem.* |

## 1.2 Relatie andere RFC
Deze RFC heeft een relatie met de volgende RFC(s)
|RFC | onderwerp | relatie<sup>*</sup> | toelichting |issue |
|:--|:--|:--| :--|:--|
| - |  -  |  -  |  -  |

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

# 3 Zekerheidseisen

De logging moet een getrouw beeld geven van de gebeurtenissen waarop de logging betrekking heeft. Daartoe moet zekerheid worden geboden dat alle gebeurtenissen waarvoor dit geldt op de voorgeschreven wijze worden gelogd en dat de beschikbaarheid, integriteit en vertrouwelijkheid van de loging is gewaarborgd.

De volgende zekerheidseisen, zoals beschreven in paragraaf 12.4 van NEN 7510-2017 (Verslaglegging en monitoren), zijn van toepassing op dit document:
- Gebeurtenissen registreren (3.1)
- Beschermen van informatie in logbestanden (3.2)
- Logbestanden van beheerders en operators (3.3)
- Kloksynchronisatie (3.4)

De volgende zekerheidseisen, afkomstig uit hoofdstuk 8 van NEN 7513, zijn van toepassing in aanvulling op de eisen uit hoofdstuk 12.4 van NEN 7510-2017 en betreffen:
- De verantwoodelijkheid voor de logging (3.5)
- De beschikbaarheid van de logging (3.6)
- De toegang tot de logging (3.7)
- De bewaartermijn van loggegevens (3.8)
- Voorwaarden voor interoperabiliteit (3.9)

## 3.1 Gebeurtenissen registreren
Logbestanden van gebeurtenissen die gebruikersactiviteiten, uitzonderingen en informatiebeveiligingsgebeurtenissen registreren, moeten worden gemaakt, bewaard en regelmatig worden beoordeeld.

## 3.2 Beschermen van informatie in logbestanden
Logfaciliteiten en informatie in logbestanden moeten worden beschermd tegen vervalsing en onbevoegde toegang.

>```ZORGSPECIFIEKE BEHEERSMAATREGEL:```<br>
Auditverslagen moeten beveiligd zijn en mogen niet gemanipuleerd kunnen worden. De toegang tot hulpmiddelen voor audits van systemen en audittrajecten moet worden beveiligd om misbruik of compromittering te voorkomen.

## 3.3 Logbestanden van beheerders en operators
Activiteiten van systeembeheerders en -operators moeten worden vastgelegd en de logbestanden moeten worden beschermd en regelmatig worden beoordeeld.

## 3.4 Kloksynchronisatie
De klokken van alle relevante informatieverwerkende systemen binnen een organisatie of beveiligingsdomein moeten worden gesynchroniseerd met één referentietijdbron.

>```ZORGSPECIFIEKE BEHEERSMAATREGEL:```<br>
Gezondheidsinformatiesystemen die tijdkritische activiteiten voor gedeelde zorg ondersteunen, moeten in tijdssynchronisatiediensten voorzien om het traceren en reconstrueren van de tijdlijnen voor activiteiten waar vereist te ondersteunen.

## 3.5 De verantwoordelijkheid voor de logging
Elke netwerkdeelnemer en elke deelnemende organisatie, dient zich te kunnen verantwoorden en is gebaat bij een betrouwbare logging. Elke organisatie die faciliteerd in de elektronische gegevensuitwisselingen of een informatiesysteem heeft aangesloten op het netwerkmodel, is dan ook zelf *logverantwoordelijke* zoals beschreven in deze RFC.

## 3.6 De beschikbaarheid van de logging
Het is essentieel dat het loggingsysteem zodanig is ingericht dat het tegemoetkomt aan zowel de informatieve behoeften als aan de wettelijke vereisten. De *logverantwoordelijke* moet daartoe regels vaststellen. dient hiervoor specifieke regels op te stellen. Dit is met name van belang wanneer het contract met de IT-dienstverlener wordt beëindigd of wanneer er een overgang plaatsvindt als gevolg van een fusie of overname.
Bij het uitbesteden van taken aan een externe dienstverlener en bij de beëindiging van het contract moeten er afspraken worden vastgelegd om zowel de bewaartermijn als de toegang tot de loggegevens te waarborgen na het beëindigen van de overeenkomst.

## 3.7 De toegang tot de logging
De logging bevat net als het onderliggend dossier zeer gevoelige informatie. Op de logging moet daarom een strikte toegangsbeheersing worden toegepast, waarop controle moet worden uitgevoerd. Verantwoordelijkheid voor de controle moet in de organisatie zijn belegd. Directe toegang tot loggegevens en tot zoekvragen moet alleen mogelijk zijn op basis van expliciete autorisatie. De *logverantwoordelijke* moet daartoe regels vaststellen die vallen binnen de kaders van de WGBO ([Wet geneeskundige behandelingsovereenkomst](https://www.rivm.nl/cpt/kwaliteit-wet-en-regelgeving/wetgeving/wgbo)), de
WBP ([Wet bescherming persoonsgegevens](https://wetten.overheid.nl/BWBR0011468/2018-05-01)) en de AVG ([Algemene verordening gegevensbescherming](https://www.autoriteitpersoonsgegevens.nl/themas/basis-avg/avg-algemeen/de-avg-in-het-kort)). Specifieke aandacht moet daarbij zijn voor gebruikers met uitgebreide toegangsrechten, zoals de *logbeheerder* en de systeembeheerder. Het uitgangspunt bij het inrichten van de toegangsbeheersing moet zijn dat er alleen toegang is indien dit strikt noodzakelijk is.

## 3.8 De bewaartermijn van loggegevens
Bij het bepalen van de bewaartermijn van logging is het van belang een zorgvuldige afweging te maken tussen de belangen van de cliënt/patiënt/burger enerzijds en de belangen van de medewerker van de netwerkdeelnemers en het elektronisch uitwisselingssysteem anderzijds.

Op basis van [Besluit van de Minister voor Medische Zorg van 27 juni 2019, kenmerk 1529221-190512-WJZ](https://zoek.officielebekendmakingen.nl/stcrt-2019-38007.html) is de bewaartermijn vastgesteld op minimaal **5** jaar en maximaal gelijk aan de bewaartermijn van het medisch dossier.

| Bewaartermijn|          |
|------|----------|
| Minimale | 5 jaar |
| Maximaal | gelijk aan de bewaartermijn van het medisch dossier |

## 3.9 Voorwaarden voor interoperabiliteit
In het netwerkmodel vindt veel informatiedomein overstijgende communicatie plaats. Logging uit verschillende bronnen moeten vergelijkbaar zijn. Hiertoe moet een exportfaciliteit aanwezig zijn. Hierbij moeten de syntax en semantiek van de export vastliggen volgens het gestelde in hoofdstuk 4.

# 4 Traceerbaarheid
Traceerbaarheid is de mogelijkheid om gebeurtenissen in de hele of gedeeltelijke keten te traceren. Het traceren geeft:
- Inzicht in de herkomst en bestemmingen van events.
- Inzicht in de stadia van verwerking.
- Inzicht in de opeenvolging van gebeurtenissen.
- Inzicht in de performance en efficiëntie van de keten.
- Inzicht in afwijkingen in de keten.
- Transparantie over informatiedomeinen heen.

## 4.1 TraceContext

Om over informatiedomeinen heen events en gebeurtenissen te kunnen traceren is het nodig om met elkaar afspraken te maken waarop informatie met elkaar kan worden gerelateerd. Deze afspraken worden distributed tracing genoemd. In het netwerkmodel gebruiken we de standaard "B3 Propagation", deze is breed toepasbaar en wordt ondersteund vanuit vele programmeertalen en frameworks.

In het netwerkmodel moet voor alle communicatie deze zogenaamde “B Propagation headers” worden gebruikt. In de gehele keten is het verplicht om de volgende ID headers mee te geven: 
- X-B3-TraceId 
- X-B3-SpanId
- X-B3-ParentSpanId

Notitie: Deze Headers zijn niet case-sensitive

## 4.2 X-B3-TraceId

De X-B3-TraceId is het ID wat door de gehele trace/keten wordt gebruikt om gerelateerde acties/gebeurtenissen en events met elkaar te relateren.

De X-B3-TraceId header wordt gecodeerd als 32 of 16 hexadecimale tekens in kleine letters 

Bijvoorbeeld, een TraceId-header van 128 bits kan er zo uitzien: X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124

Indien de X-B3-TraceId Header bij een binnenkomende verbinding niet aanwezeg of leeg is, moet het verzoek worden geweigerd en resulteren in:
```json
HTTP/1.1 400 Bad Request
{"ErrorCode" : "invalid_request", "Error" :"The request is missing header X-B3-TraceId"}
```

## 4.3 X-B3-SpanId

De X-B3-SpanId geeft samen met de X-B3-ParentSpanID de positie van de operatie in de trace/keten weer.

De X-B3-SpanId header wordt gecodeerd als 16 hexadecimale tekens in kleine letters.

Bijvoorbeeld: X-B3-SpanId: a2fb4a1d1a96d312.

## 4.4 X-B3-ParentSpanId

De ParentSpanId is het ID van de operatie die de oorzaak is van het verzoek, Dit is de X-B3-SpanId van een voorgaand verzoek of een scheduled job. ParentSpanId geeft de mogelijkheid om decentrale gebeurtenissen juist op de tijdlijn te plaatsen.

De X-B3-ParentSpanId header is aanwezig bij een child span en moet leeg zijn indien het om de root span gaat. De X-B3-ParentSpanId header wordt gecodeerd als 16 hexadecimale tekens in kleine letters.

Bijvoorbeeld: X-B3-ParentSpanId: 0020000000000001


## 4.3 Voorbeeld van een flow
De X-B3-TraceId header wordt hergebruikt in elke request binnen één trace. Zodra er een nieuwe flow ontstaat, moet er een nieuwe X-B3-TraceId worden gebruikt.

Een flow kan bijvoorbeeld een raadpleging zijn naar aanleiding van een notificatie. De ontvangen notificatie heeft een X-B3-TraceId, X-B3-SpanId en eventueel een X-B3-ParentSpanId in de header. In elke opvolgende gerelateerde actie wordt het ontvangen X-B3-TraceId header doorgegeven. Ook bijvoorbeeld bij het opvragen van autorisatie als het onderdeel uitmaakt van deze flow. 


<font color=red>LET OP: Onderstaande schema moet nog correct  worden aangepast.</font>

![voorbeeld_flow](../plantUMLsrc/rfc0021-01-voorbeeld_flow.svg "voorbeeld_flow")

<details>
<summary>plantUML-source</summary>

```plantuml
@startuml rfc0019-01-voorbeeldflow
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
        AuthzServer -> AuthzServer: Run Rule-engine o.b.v. scope(s)\n<font color=red>X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124\n<font color=red>X-B3-SpanId: 34cfd3ee730bbe13\n<font color=red>X-B3-ParentSpanId: a2fb4a1d1a96d312
        activate AuthzServer #LightGray
            AuthzServer -> AuthzServer: Valideer autorisatie
            AuthzServer -> AuthzServer: Genereer Access-Token\n<font color=red>X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124\n<font color=red>X-B3-SpanId: 34cfd3ee730bbe13\n<font color=red>X-B3-ParentSpanId: a2fb4a1d1a96d312
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
nIDResourceServer -> BEMRegister: GraphQL Request\n<font color=red>X-B3-TraceId: 463ac35c9f6413ad48485a3953bb6124\n<font color=red>X-B3-SpanId: 75c38117346fa472\n<font color=red>X-B3-ParentSpanId: 2edb09379a27bfb1
activate BEMRegister

BEMRegister --> nIDResourceServer: 200 Response (GraphQL)
deactivate BEMRegister

nIDResourceServer --> Client: 200 Response (GraphQL)
deactivate nIDResourceServer

deactivate Client
@enduml
```
</details>


# 5. Gegevensvelden in de logging

## 5.1 Algemeen
<font color=red>LET OP: In onderstaande schema moet nog de trace informatie worden toegevoegd.</font>

![gegevensvelden](../plantUMLsrc/rfc0021-02-gegevensvelden.svg "gegevensvelden")

<details>
<summary>plantUML-source</summary>

```plantuml
@startuml rfc0019-02-gegevensvelden

object NEN7513 {
  <#lightblue,#black>|=  Veld           |=  optionaliteit           |=  cardinaliteit  |
  <#white>|  7.2 Gebeurtenis             | verplicht                 | 1...1 |
  <#white>|  7.3 Gebruiker               | verplicht                 | 1...* |
  <#white>|  7.4 Object                  | verplicht                 | 1...* |
  <#white>|  7.5 Loggegevens             | verplicht                 | 1...1 |
}

object Gebeurtenis {
  <#lightblue,#black>|=  Veld           |= soort    |=  optionaliteit           |=  cardinaliteit  |
  <#white>|  1. Gebeurteniscode         |  code     | verplicht                 | 1...1 |
  <#white>|  2. Actiecode               |  code     | verplicht                 | 1...1 |
  <#white>|  3. Datum en tijd           |  datetime | verplicht                 | 1...1 |
  <#white>|  4. Aard van de gebeurtenis |  code     | optioneel                 | 0...1 |
  <#white>|  5. Resultaat               |  code     | optioneel                 | 1...1 |
  <#white>|  6. Controles               |  tekst    | conditioneel\n verplicht  | 0...1 |
}


object Gebruiker {
  <#lightblue,#black>|=  Veld                       |= soort          |=  optionaliteit           |=  cardinaliteit  |
  <#white>|  1. Gebruikers-ID                       |  identificatie  | verplicht                 | 1...1 |
  <#white>|  2. Lokale gebruikers-ID                |  identificatie  | optioneel                 | 0...1 |
  <#white>|  3. Gebruikersnaam                      |  tekst          | optioneel                 | 0...1 |
  <#white>|  4. Gebruikersrol                       |  code           | verplicht                 | 1...1 |
  <#white>|  5. Gebruiker is initiator              |  boolean        | optioneel                 | 0...1 |
  <#white>|  6. ID van verantwoordelijke gebruiker  |  identificatie  | conditioneel\n verplicht  | 0...1 |
  <#white>|  7. Naam van verantwoordelijke gebruiker|  tekst          | optioneel                 | 0...1 |
  <#white>|  8. Rol van verantwoordelijke gebruiker |  code           | conditioneel\n verplicht  | 0...1 |
  <#white>|  9. Type Toegangspunt                   |  code           | optioneel                 | 0...1 |
  <#white>|  10.Identificatie toegangspunt          |  identificatie  | optioneel                 | 0...1 |
}

object Object {
  <#lightblue,#black>|=  Veld           |= soort            |=  optionaliteit           |=  cardinaliteit  |
  <#white>|  1. Identificatortype       |  tekst            | verplicht                 | 1...1 |
  <#white>|  2. Klasse                  |  tekst            | optioneel                 | 0...1 |
  <#white>|  3. Identificator           |  tekst            | verplicht                 | 1...1 |
  <#white>|  4. Naam                    |  tekst            | optioneel                 | 0...1 |
  <#white>|  5. Details                 |  tekst            | optioneel                 | 0...1 |
  <#white>|  6. Autorisatieprotocol     |  tekst            | verplicht                 | 1...1 |
  <#white>|  7. Behandelrelatieprotocol |  inditificatie    | conditioneel\n verplicht  | 0...1 |
  <#white>|  8. Toestemminsprofiel      |  inditificatie    | conditioneel\n verplicht  | 1...1 |
  <#white>|  9. Gevoeligheid            |  tekst            | optioneel                 | 0...1 |
  <#white>|  10. Categorie               |  code             | optioneel                 | 0...1 |
  <#white>|  11. Stadium                 |  code             | optioneel                 | 0...1 |
  <#white>|  12. Zoekvraag              |  string           | optioneel                 | 0...1 |
}

object Loggegevens {
  <#lightblue,#black>|=  Veld                    |= soort            |=  optionaliteit            |=  cardinaliteit  |
  <#white>|  1. Identificatie van de locatie     |  identificatie    | optioneel                  | 0...1 |
  <#white>|  2. Identificatie van de bron        |  identificatie    | verplicht                  | 1...1 |
  <#white>|  3. Type bron van de loggegevens     |  code             | optioneel                  | 0...1 |
}


NEN7513 ||--|| Gebeurtenis
NEN7513 ||--{ Gebruiker
NEN7513 ||--{ Object
NEN7513 ||--|| Loggegevens

@enduml
```
</details>

## 5.2 Gebeurtenis
**Omschrijving:** *identificatie* van de *gebeurtenis*. Duidt de gebeurtenis die is uitgevoerd met welk resultaat.
**Optionaliteit:** verplicht

### 5.2.1 Gebeurteniscode
*Indentificator* van het type *gebeurtenis*; het type *gebeurtenis* duidt aan wat er in het systeem is gedaan.

**Optionaliteit:** verplicht<br>
**Formaat/waarde:** code

| Attribuut        | Waarde                                      |
|------------------|---------------------------------------------|
| CodeSystem       | OID van het codestelsel                      |
| CodeSystemName   | De naam van het codestelsel                  |
| DisplayName      | Het tekstlabel van de code                   |
| OriginalText     | De oorspronkelijke tekst die is vertaald naar de code |

Voorbeelden:
- nID,authz,1,'autorisatie request'
- nID,RS,1,'GraphQL mutation'

### 5.2.2 Actiecode
Aanduiding van de *actie* bij deze *gebeurtenis*.

**Optionaliteit:** verplicht<br>
**Formaat/waarde:** volgens onderstaande tabel

| Actiecode |Omschrijving |
|-|-|
| C | Create; creëren van nieuwe gegevens |
| R | Read; lezen van gegevens door een gebruiker of proces |
| U | Update; aanpassen van bestaande gegevens |
| D | Delete; verwijderen of als verwijderd markeren van gegevens |
| E | Execute; starten |

Voorbeeld:
- R (Read)

### 5.2.3 Datum en tijd
**Optionaliteit:** verplicht<br>
**Formaat/waarde:** UTC datum en tijd. Notatie volgens NEN‐ISO 8601:2005

>TOELICHTING: Het tijdstip van de gebeurtenis wordt eenduidig vastgelegd en onafhankelijk van de actuele tijdzone waar het informatiesysteem of de gebruiker zich bevinden. Voor de tijd wordt gekozen het begin van de gebeurtenis.

|| Tijdstempelprecisie | Standaard |
|-|-|-|
| Eigenschappen | Ten minste jaar (yyyy), maand (mm), en dag (dd); uur (hh), minuut (mm) en seconde (ss) | ~~NEN-ISO 8601:2005~~ NEN 8601:2019 |

Voorbeeld:
- 2023-07-14T14:12:12

### 5.2.4 Aard van de gebeurtenis
Code voor de aard van de *gebeurtenis* volgens het aangegeven codestelsel; via dit gegeven kan de *gebeurtenis*, aangeduid met de gebeurtenis‐code, desgewenst nader worden gespecificeerd.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** code

Naar het toegepaste codestelsel wordt als volgt verwezen:

| Attribuut |Waarde |
|-|-|
| CodeSystem | OID (Objectidentificator) van het codestelsel                               |
| CodeSystemName | De naam van het codestelsel                           |
| DisplayName | Het tekstlabel van de code                            |
| OriginalText | De oorspronkelijke tekst die is vertaald naar de code |

>TOELICHTING: Voor rapportages uit de logging en analyses is de aard van de gebeurtenis een belangrijk sorteer‐ en selectiecriterium. Door het toekennen van een code aan het soort gebeurtenis kunnen bijvoorbeeld reguliere acties direct worden onderscheiden van noodsituaties of gebeurtenissen die de logging zelf betreffen.

Voorbeelden:
- [OID],DCM,110122, ‘Login’;
- [OID],DCM,110123, ‘Logout’.

### 5.2.5 Resultaat

Een indicatie van het resultaat van de *gebeurtenis*. Hiermee kan worden aangegeven of de gelogde *gebeurtenis* is gelukt of niet. Het volgende codesysteem wordt gebruikt.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** code

Voorbeelden:
 - 1:Success
 - 2:Refused
 - 3:Error


### 5.2.6 Controles
Beschrijft de resultaten van de uitgevoerde controles op *autorisatie*, behandelrelatie, toestemming *cliënt* en noodprocedure.

**Optionaliteit:** verplicht<br>
**Formaat/waarde:** volgens onderstaande tabel
| Positie | Waarde | Weergavenaam |
|-|-|-|
| 1 | T/F | Resultaat controle autorisatie |
| 2 | T/F | Resultaat controle behandelrelatie |
| 3 | T/F | Resultaat controle toestemming cliënt |
| 4 | T/F | Resultaat controle noodknopgebruik |

Voorbeeld:
- TFTT


## 5.3 Gebruiker
*Identificatie* van de gebruiker.

De gebruiker kan een natuurlijk persoon zijn, maar ook een organisatie of een proces in een *informatiesysteem*

Bij elke *gebeurtenis* hoort ten minste één *gebruiker*; dit is de verantwoordelijke *gebruiker*. Een verantwoordelijke *gebruiker* is altijd een natuurlijk persoon. Deze *gebruiker* kan ook de initiator van de *gebeurtenis* zijn en kan dan als initiator worden gemarkeerd (‘*Gebruiker* is initiator’). Dit kan slechts bij één *gebruiker* het geval zijn. 

Indien een andere *gebruiker* dan de verantwoordelijke *gebruiker* of een proces de *gebeurtenis* initieert, dan moet deze *gebruiker* of dit proces ook worden meegestuurd in de log.

**Optionaliteit:** verplicht

### 5.3.1 Gebruikers-ID
*Identificator* van de *gebruiker* die de gebeurtenis initieert, uniek voor de bron van *logging*.

**Optionaliteit:** verplicht<br>
**Formaat/waarde:** alfanumerieke aanduiding die de gebruiker uniek identificeert in het authenticatiesysteem dat als bron voor de *logging* dient

Voorbeelden:
- ‘VECOZO Systeemcertificaat’
- ‘ClientID’
- ‘DiD
- ‘u12344’
- ‘1234567890’
- ‘jjan@zorgkantoor’

### 5.3.2 Lokale gebruikers-ID
*Identificator* waarmee de *gebruiker* in eerste instantie inlogt.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** alfanumerieke aanduiding die de gebruiker uniek identificeert in het authenticatiesysteem dat bij inloggen wordt gebruikt

Voorbeelden:
- ‘jjan1234’
- ‘jan.janssen’

### 5.3.3 Gebruikersnaam
Naam van de *gebruiker* in leesbare vorm.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** alfanumerieke tekst

Voorbeelden:
- ‘Jan Janssen’
- ‘Klaas de Vries’

### 5.3.4 Gebruikersrol
De rol van de *gebruiker* bij de *gebeurtenis*.

Optionaliteit: verplicht
Formaat/waarde: code voor de rol

Naar het toegepaste codestelsel wordt als volgt verwezen:
| Attribuut       | Waarde                                   |
|-----------------|------------------------------------------|
| CodeSystem      | OID van het codestelsel                   |
| CodeSystemName  | De naam van het codestelsel               |
| DisplayName     | Het tekstlabel van de code                |
| OriginalText    | De oorspronkelijke tekst die is vertaald naar de code |

>TOELICHTING: De rol van de gebruiker is in combinatie met het autorisatieprotocol bepalend voor het verlenen van toegang tot een patiëntdossier. ISO/TS 22600‐1:2014 en NEN‐EN‐ISO 21298:2017 gelden hier als leidraad, maar eigen codestelsels binnen het informatiedomein mogen ook worden gebruikt. In beginsel is de functionele rol bepalend voor de toegangsverlening, maar de verwijzing naar het feitelijk toegepaste codestelsel laat ook andere keuzen en ontwikkeling daarin toe. Indien de gebruiker bij deze gebeurtenis gedelegeerde is van een verantwoordelijke, behoren de identiteit en de rol van de verantwoordelijke ook te worden vastgelegd.

Hieronder volgt de tabel van functionele rollen uit NEN‐EN‐ISO 21298:2017:

Voorbeelden:
| Code | Role                                          | Description                                                 |
|------|-----------------------------------------------|-------------------------------------------------------------|
| 01   | Subject of care                               | Recipient of care services, e.g. cliënt                    |
| 02   | Subject of care proxy                         | e.g. parent, guardian, carer, or other legal representative  |
| 03   | Personal healthcare professional              | Healthcare professional with the closest relationship to the subject of care, often the subject of care’s GP|
| 04   | Privileged healthcare professional            | Healthcare professional nominated by the subject of care OR Nominated by the healthcare facility of care (if there is a nomination by regulation, practice, etc. such as an emergency over‐ride)  |
| 05   | Directly involved healthcare professional     | Healthcare professional involved in providing direct care to the subject of care |
| 06   | Indirectly involved healthcare professional   | Healthcare professional indirectly involved in caring the subject of care (teaching, research, etc.)    |
| 07   | Supporting healthcare party                   | Party supporting service provision to the subject of care     |

### 5.3.5 Gebruiker is de initiator

Aanduiding dat de *gebruiker* de *gebeurtenis* al of niet initieert.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** Boolean (true/false); ‘nil’ is de default waarde

Voorbeelden:
- true
- false

### 5.3.6 ID van verantwoordelijke gebruiker
Unieke *identificator* van de *verantwoordelijke gebruiker* samen met zijn organisatie voor het initiëren van de *gebeurtenis*.

**Optionaliteit:** conditioneel verplicht
**Formaat/waarde:** alfanumerieke aanduiding die de *verantwoordelijke gebruiker* uniek identificeert; bijvoorbeeld in de vorm userid@organisatie

>TOELICHTING: Dit veld is verplicht in het geval dat de gebruiker ook de initiator is.

### 5.3.7 Naam van verantwoordelijke gebruiker
Naam van de *verantwoordelijke gebruiker* in leesbare vorm.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** alfanumerieke tekst

### 5.3.8 Rol van verantwoordelijke gebruiker
De rol van de *verantwoordelijke gebruiker* bij de *gebeurtenis*.

**Optionaliteit:** conditioneel verplicht<br>
**Formaat/waarde:** code voor de rol

Naar het toegepaste codestelsel wordt als volgt verwezen:

| Attribuut       | Waarde                                   |
|-----------------|------------------------------------------|
| CodeSystem      | OID van het codestelsel                   |
| CodeSystemName  | De naam van het codestelsel               |
| DisplayName     | Het tekstlabel van de code                |
| OriginalText    | De oorspronkelijke tekst die is vertaald naar de code |

>TOELICHTING: De rol van de *verantwoordelijke gebruiker* is een essentieel gegeven voor de toegang tot een patiëntdossier. Als leidraad gelden hier ISO/TS 22600‐1:2006 en NEN‐EN‐ISO 21298:2017. In beginsel is de functionele rol bepalend voor de toegangsverlening, maar de verwijzing naar het feitelijk toegepaste codestelsel laat ook andere keuzen en ontwikkeling daarin toe. Zie tabel 3 die is opgenomen bij 7.3.4.

Voorbeeld:
- [OID],[NAAM],[LABEL],[TEKST].

### 5.3.9 Type toegangspunt
Aanduiding van het type *toegangspunt* van waaruit de *gebeurtenis* is geïnitieerd.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** code

Voorbeeld:
| Code | Weergavenaam                    |
|------|---------------------------------|
| 1    | Machinenaam, ook DNS‐naam       |
| 2    | IP‐adres                         |


### 5.3.10 Identificatie toegangspunt
*Identificator* van het *toegangspunt* van waaruit de *gebeurtenis* is geïnitieerd.

**Optionaliteit:** optioneel
**Formaat/waarde:** volgens de voor het desbetreffende toegangspunttype geldende regels

Voorbeeld:
- Type toegangspunt : 2<br>
  identificatie toegangspunt : 10.145.240.60; 

## 5.4 Object
*Identificatie* van een betrokken *object*

**Optionaliteit:** verplicht

### 5.4.1 Identificatortype
Code die het type identificator van het betrokken object weergeeft

**Optionaliteit:** verplicht<br>
**Formaat/waarde:** code

Naar het toegepaste codestelsel wordt als volgt verwezen:

| Attribuut       | Waarde                                   |
|-----------------|------------------------------------------|
| CodeSystem      | OID van het codestelsel                   |
| CodeSystemName  | De naam van het codestelsel               |
| DisplayName     | Het tekstlabel van de code                |
| OriginalText    | De oorspronkelijke tekst die is vertaald naar de code |

>TOELICHTING: Het aangeven van het identificatortype is nodig om de identificator van het object te kunnen
interpreteren en om onderscheid te kunnen maken tussen de verschillende identificatoren die verwijzen naar
eenzelfde betrokken object, bijvoorbeeld naar eenzelfde cliënt.

Voorbeeld:
- [OID],[NAAM],[LABEL],[TEKST].

### 5.4.2 Klasse
Klasse van het betrokken *object* waarop de *gebeurtenis* betrekking heeft.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** code

Voorbeeld:
| Code | Weergavenaam    |
|------|-----------------|
| 1    | Persoon         |
| 2    | Systeem object  |
| 3    | Organisatie     |
| 4    | Overig          |

### 5.4.3 Identificator
Unieke identificator van een bij de gebeurtenis betrokken object, bijvoorbeeld het dossiernummer of patiëntnummer.

**Optionaliteit:** verplicht
**Formaat/waarde:** string. Alfanumeriek. Formaat en waarden hangen af van het identificatortype

Voorbeelden:
- [GUID]

### 5.4.4 Naam
Nadere aanduiding van het betrokken *object*, bijvoorbeeld de naam van de *cliënt*.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** tekst. Alfanumeriek

### 5.4.5 Details
Detailkenmerk over het *object* dat bij de *gebeurtenis* was betrokken.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** tekst

### 5.4.6 Autorisatieprotocol
*Identificator* van het *autorisatieprotocol* dat bij de gebeurtenis is gehanteerd.

**Optionaliteit:** verplicht<br>
**Formaat/waarde:** code

Voorbeelden:
- Accesspolicy(JSON) + versie ID

### 5.4.7 Behandelrelatieprotocol
*Identificator* van het protocol dat beschrijft hoe wordt vastgesteld dat er sprake is van een behandelrelatie.

**Optionaliteit:** conditioneel verplicht<br>
**Formaat/waarde:** identificatie

>TOELICHTING: Het behandelrelatieprotocol bepaalt of de gebruiker op basis van de behandelrelatie toegang mag krijgen tot de medische gegevens.

### 5.4.8 Toestemmingsprofiel
*Identificator* van het *toestemmingsprofiel* dat bij de gebeurtenis is gehanteerd.

**Optionaliteit:** conditioneel verplicht

>TOELICHTING: Dit is verplicht indien het object patiëntgebonden is, bijvoorbeeld de cliënt, zijn dossier, resultaten, enz.

### 5.4.9 Gevoeligheid
Classificatie van de gevoeligheid van het betrokken object.
**Optionaliteit:** optioneel

### 5.4.10 Categorie
Code die de categorie van het betrokken object weergeeft, zoals ‘Cliënt’, ‘Arts’, enz.

**Optionaliteit:** optioneel

### 5.4.11 Stadium
Code die het stadium van het betrokken object weergeeft voor een object dat een bepaalde levenscyclus kent, zoals een dossier.

**Optionaliteit:** optioneel

### 5.4.12 Zoekvraag
De feitelijke formulering van de opdracht ingeval het betrokken *object* een zoekvraag is.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** door het informatiesysteem bepaald

Voorbeelden:
- GetWlzIndicatieVoorIndicatieID

## 5.5 Loggegevens
*Identificatie* van de bron van de *loggegevens*

**Optionaliteit:** verplicht

### 5.5.1 Identificatie van de locatie
*Identificator* van de locatie waar is gelogd.

**Optionaliteit:** optioneel<br>
**Formaat/waarde:** alfanumerieke tekst

Voorbeelden:
- 'AZ/NEU/PRD'

### 5.5.2 Identificatie van de bron
Unieke *identificator* van de bron in het *informatiedomein* waar de *gebeurtenis* is gelogd.

**Optionaliteit:** verplicht<br>
**Formaat/waarde:** alfanumerieke tekst

Voorbeelden:
- 'nID/authservice'
- 'nID/nID-Filter'

### 5.5.3 Type bron van de loggegevens
Type (device) van de bron waar de *gebeurtenis* is gelogd.

**Optionaliteit:** optioneel


# 6. Export
Een export in de vorm van een *XML-exportfaciliteit* is essentieel, waarbij de syntax en semantiek van de export moeten voldoen aan de richtlijnen uiteengezet in hoofdstuk 5.

De *XML-exportfaciliteit* genereert een uitgebreide logging op basis van een opgegeven selectie. Alle velden in dit XML-bestand zijn herleidbaar naar de naar de gegevensvelden zoals beschreven in hoofdstuk 5.



>```Voorbeeld export logrecord nID:```

