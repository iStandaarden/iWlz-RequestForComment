![header](../imagesrc/ZinBanner.png "template_header")

# RFC0024 - Opslag en raadplegen (iWlz-)notificatietypen in dienstencatalogus

@N.B.
- [ ] Dit is de eerste conceptbeschrijving van de functionalitiet *Dienstencatalogus.*
 - [ ] De interface van de *Dienstencatalogus* moet nog worden gespecificeerd evenals de concrete invulling van dit generieke component. 
 - [ ] In de eerste realisaties van Notificaties is er geen *Diensten catalogus* nodig.
  

<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**

>```Nieuwe voorziening```

**Beoogde situatie**

Deze RFC beschrijft de werking van de *Dienstencatalogus* binnen het iWLZ netwerk. In de *Dienstencatalogus* wordt vast gelegd welke typen notificatie door de diverse netwerkdeelnemers worden aangeboden en onder welke voorwaarden deze kunnen worden afgesloten. 

<font size="4">**Status RFC**</font>

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/29) om de actuele status van deze RFC te bekijken.

---
**Inhoudsopgave**
- [RFC0024 - Opslag en raadplegen (iWlz-)notificatietypen in dienstencatalogus](#rfc0024---opslag-en-raadplegen-iwlz-notificatietypen-in-dienstencatalogus)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
  - [1.2 Relatie andere RFC's](#12-relatie-andere-rfcs)
  - [1.3 Code-repository](#13-code-repository)
- [2. Terminologie](#2-terminologie)
- [3 *Dienstencatalogus* voor Notificatie-typen](#3-dienstencatalogus-voor-notificatie-typen)
  - [3.1 Inleiding](#31-inleiding)
  - [3.2 Vastleggen notificatie-typen](#32-vastleggen-notificatie-typen)
    - [3.2.2 Inhoud notificatietype](#322-inhoud-notificatietype)
    - [3.2.3 Voorbeeld notificatietype-specificatie](#323-voorbeeld-notificatietype-specificatie)
    - [3.2.x Voorbeeld publiceren notificatie-type](#32x-voorbeeld-publiceren-notificatie-type)
  - [3.3 Raadplegen beschikbare notificatietypen](#33-raadplegen-beschikbare-notificatietypen)

---
# 1. Inleiding
Deze RFC beschrijft de werking van de *Dienstencatalogus* binnen het iWLZ netwerk. In de *Dienstencatalogus* wordt vast gelegd welke typen notificatie door de diverse netwerkdeelnemers worden aangeboden en onder welke voorwaarden deze kunnen worden afgesloten.


## 1.1. Uitgangspunten
- Dienstencatalogus is de functionele **werknaam** om deze dienst te beschrijven. Het kan goed dat deze dienst in de praktijk in een ander onderdeel wordt opgenomen.
- Het publiceren van notificatietypen in de *Dienstencatalogus* beperkt zich niet tot enkel de iWlz-verplichte en iWlz-vrijwillige notificatietypen.

## 1.2 Relatie andere RFC's
Deze RFC is noodzakelijk voor de volgende RFC's en daar een relatie mee. 
|RFC | onderwerp | relatie<sup>*</sup> | toelichting |issue |
|:--|:--|:--| :--|:--|
|[RFC0008](/RFC/RFC0008%20-%20Notificaties.md) | Notificaties | voorwaardelijk voor de ondersteuning van (iWlz) vrijwille notificaties | <ul><li>Er is een ***Dienstencatalogus*** waarin notificatietypen gepubliceerd kunnen worden.</li> <li>Netwerkdeelnemers raadplegen de ***Dienstencatalogus*** om op te halen welke abonnementen geplaatst kunnen worden en welke voorwaarden hier aan zitten. </li></ul>|[#2](https://github.com/iStandaarden/iWlz-RFC/issues/2) |


<sup>*</sup>Relatie andere RFC = voorwaardelijk, *voor andere RFC* / afhankelijk, *van andere RFC*

## 1.3 Code-repository
De benodigde code staat in @@@

# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| :-------- | :-------- | 
| DID | Decentralized Identifiers (DIDs) ofwel Gedecentraliseerde Identificatoren, zijn unieke identificatiemiddelen voor digitale identiteiten. Ze zijn ontworpen om zelfsoevereiniteit te bevorderen, waarbij individuen controle hebben over hun digitale identiteiten zonder afhankelijk te zijn van centrale autoriteiten. DIDs zijn gedecentraliseerd, veilig door cryptografie, interoperabel en persistent. De W3C-standaard Decentralized Identifiers maakt het verifiëren van  decentrale digitale identiteiten mogelijk. |

# 3 *Dienstencatalogus* voor Notificatie-typen

## 3.1 Inleiding
In [RFC-0008 - Notificaties](/RFC/RFC0008%20-%20Notificaties.md) is beschreven hoe notificaties een belangrijk onderdeel vormen in de werking van het iWlz-netwerkmodel. Deelnemers worden in dat netwerk door middel van notificaties op de hoogte gebracht van nieuwe of gewijzigde informatie die relevant is voor die deelnemer. Daarna en met gegevens uit de notificatie kan een deelnemer de informatie raadplegen. Het soort notificatie of de reden van een notificatie wordt bepaald door het verantwoordelijke **notificatie-type**.  Zo is er bijvoorbeeld een notificatie die het Zorgkantoor op de hoogte stelt van een nieuwe Wlz indicatie van een client die volgens de postcode in het BRP woont in de regio van dat zorgkantoor. 

De ***Dienstencatalogus*** faciliteert het vastleggen van de beschikbare notificatie-typen in het netwerk zodat een deelnemer informatie hierover centraal kan raadplegen. 

![publiceer_raadpleeg](../plantUMLsrc/rfc0008-03-publiceren_raadplegen_notificatietype.svg "publiceer_raadpleeg_nt")

<details>
  <summary>plantUML-source</summary>

  ```plantuml
  @startuml rfc0008-03-publiceren_raadplegen_notificatietype
  title Publiceren & raadplegen notificatietype

  skinparam handwritten false
  skinparam participantpadding 20
  skinparam boxpadding 40
  autonumber "<b>[00]"
  box bronhouder #lightblue
  participant "Backoffice" as bs
  participant "Netwerkpunt" as npb
  end box

  box 
  participant "Dienstencatalogus" as sd
  end box

  box deelnemer #lightyellow
  participant "Netwerkpunt" as nps
  participant "Backoffice" as dbs
  end box
  
  group vastleggen notificatietype
    bs -> sd : publiceren notificatietype
    activate bs
    activate sd
    return response
    deactivate bs
  end

  ||25|||

  group raadplegen notificatietype
    dbs -> sd: raadpleeg notificatietype
    activate dbs
    activate sd 
    return response
    deactivate dbs
  end
  @enduml
  ```
</details>

| #  | Beschrijving              | Toelichting                                                           |
|----|---------------------------|-----------------------------------------------------------------------|
| 01 | publiceer notificatietype | registreer de gegevens van het notificatietype in de dienstencatalogus |
| 02 | response                  | verwerk response                                                      |
| 03 | raadpleeg notificatietype | raadpleeg de dienstencatalogus op de beschikbare notificaties          |
| 04 | informatie                | beoordeel de informatie over het abonnementtype                       |


## 3.2 Vastleggen notificatie-typen
De verschillende notificatie-typen die een organisatie aanbiedt worden gepubliceerd in de *Dienstencatalogus*. In de iStandaard iWlz (informatiemodel/afsprakenstelsel) worden alleen die notificatie-typen beschreven die relevant zijn voor de Wlz en volgens afspraak met alle deelnemers van de iWlz door een bronhouder van een register moet(en) worden gerealiseerd. Zie hiervoor [4.2 Typen notificatie in RFC0008](/RFC/RFC0008%20-%20Notificaties%20en%20Abonnementen.md)

![publiceren notificatietype](../plantUMLsrc/rfc0024-02-publiceren_notificatietype.svg "publiceren notificatietype")

<details>
  <summary>plantUML-source</summary>

  ```plantuml
  @startuml rfc0024-02-publiceren_notificatietype
  title Publiceren & raadplegen notificatietype

  skinparam handwritten false
  skinparam participantpadding 20
  skinparam boxpadding 40
  autonumber "<b>[00]"
  box bronhouder #lightblue
  participant "Backoffice" as bs
  participant "Netwerkpunt" as npb
  end box

  box 
  participant "Dienstencatalogus" as sd
  end box

  box deelnemer #lightyellow
  end box
  
  group vastleggen notificatietype
    bs -> sd : publiceren notificatietype
    activate bs
    activate sd
    sd -> sd: valideer {notificatyType}
    return response
    deactivate bs
  end
  @enduml
  ```
</details>

| #  | Beschrijving               | Toelichting                                                           |
|:--:|----------------------------|-----------------------------------------------------------------------|
| 01 | publiceer notificatietype  | registreer de gegevens van het notificatietype in de dienstencatalogus |
| 03 | valideer notificatieTypeID | valideer of het meegegeven notificatieTypeID niet bestaat             |
| 02 | response                   | verwerk response                                                      |

### 3.2.2 Inhoud notificatietype
De interface van de *Dienstencatalogus* moet nog worden gespecificeerd evenals de invulling van dit generieke component. Bij het vastleggen van een abonnementtype in de ***Dienstencatalogus*** worden de volgende gegevens geregistreerd:

| Gegeven                  | Beschrijving                                                                                                                                  | V/O<sup>*</sup> | Datatype                                                                   |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|:---------------:|:---------------------------------------------------------------------------|
| organisatieID            | Identificatie van de partij die het abonnement verstrekt in het netwerk                                                                       |        V        | DID                                                                     |
| notificatieTypeID        | Identificatie van het abonnement type                                                                                                         |        V        | String                                                                     |
| notificatieType          | Aanduiding van de abonnementsvorm                                                                                                             |        V        | Enum[iWlz-Verplicht, iWlz-Vrijwillig, Vrijwillig ]                         |
| notificatieDoel          | Aanduiding voor welke partij(rol) de notificatie is bedoeld                                                                                   |        V        | ENUM[WLZ_ZORGAANBIEDER, ZORGKANTOOR, CIZ, CAK, ZIN, ANDERS]                                                                     |
| notificatieOmschrijving  | Beschrijving van het abonnement                                                                                                               |        V        | String                                                                     |
| idTypeAbonnee            | Aanduiding van het type Id dat moet worden meegegeven bij het afsluiten van het abonnement. Alleen bij een (iWlz-)vrijwillige notificatietype |        O        | Enum[Uzovi, AGB, ..]                                                       |
| eventType                | Aanduiding welke register event de notificatie veroorzaakt                                                                                    |        V        | Enum[Create, Update, All] *(Is deze nodig, voldoet de omschrijving niet?)* |
| objectIDType             | Beschrijving welke ObjectID wordt teruggeven in de notificatie, voor gebruik als juiste ID in de GraphQL query                                |        V        | String                                                                     |

<sup>*</sup> V = verplicht / O = Optioneel


### 3.2.3 Voorbeeld notificatietype-specificatie

Het voorbeeld beschrijft de json-string voor het verplichte abonnement  van een zorgkantoor, dat een zorgaanbieder notificeert op een nieuwe bemiddeling wanneer de betreffende zorgaanbieder de of een van de bemiddelde aanbieders is. 

```json
  {
  "organisatieId": "89e0e41a-13df-4fe2-ad72-d9c32ca5641c",
  "notificatieTypeID": "NIEUWE_BEMIDDELING_VOOR_ZORGAANBIEDER",
  "notificatieType": "IWLZ_VERPLICHT",
  "notificatieDoel": "iWlz Zorgaanbieder",
  "notificatieOmschrijving": "Bij elke registratie van een nieuwe ZorgInNatura voor een instelling, ontvangt die instelling daarvan een notificatie",
  "idTypeAbonnee": "AgbCode",
  "eventType": "CREATE",
  "objectIDType": "zorgInNaturaID"
  }
```
### 3.2.x Voorbeeld publiceren notificatie-type

Voor het publiceren van een notificatie:
 
  - gql-specificatie/netwerkpunt.graphql → Mutation: PublishNotificatieType

```graphql
query PublishNotificatieType
  {
  "organisatieId": "89e0e41a-13df-4fe2-ad72-d9c32ca5641c",
  "notificatieTypeID": "NIEUWE_BEMIDDELING_VOOR_ZORGAANBIEDER",
  "notificatieType": "IWLZ_VERPLICHT",
  "notificatieDoel": "iWlz Zorgaanbieder",
  "notificatieOmschrijving": "Bij elke registratie van een nieuwe ZorgInNatura voor een instelling, ontvangt die instelling daarvan een notificatie",
  "idTypeAbonnee": "AgbCode",
  "eventType": "CREATE",
  "objectIDType": "zorgInNaturaID"
}
```

succesvol response: 
```http
HTTP/1.1 204 (No content)
```
validatie fout response:
```http
HTTP/1.1 400 Bad Request
  {"ErrorCode" : "invalid_request", "Error" :"Invalid notificatieTypeID"}
```

## 3.3 Raadplegen beschikbare notificatietypen
Een deelnemer van het iWlz netwerk kan in de ***Dienstencatalogus*** raadplegen welke notificatietypen er beschikbaar zijn, welke voor zijn rol/type en welke notificatietypen optioneel op te abonneren zijn. 

  - gql-specificatie/netwerkpunt.graphql → Query: GetNotificatieType

```graphql
query getNotificatieTypen()
  {
  ntb.
  }
```

succesvol response: 
```json
  {
  "organisatieId": "89e0e41a-13df-4fe2-ad72-d9c32ca5641c",
  "notificatieTypeID": "NIEUWE_BEMIDDELING_VOOR_ZORGAANBIEDER",
  "notificatieType": "IWLZ_VERPLICHT",
  "notificatieDoel": "iWlz Zorgaanbieder",
  "notificatieOmschrijving": "Bij elke registratie van een nieuwe ZorgInNatura voor een instelling, ontvangt die instelling daarvan een notificatie",
  "idTypeAbonnee": "AgbCode",
  "eventType": "CREATE",
  "objectIDType": "zorgInNaturaID"
  }
  
```
validatie fout response:
```http
HTTP/1.1 400 Bad Request
    {"ErrorCode" : "invalid_request", "Error" :"Invalid notificatieTypeID"}
```

