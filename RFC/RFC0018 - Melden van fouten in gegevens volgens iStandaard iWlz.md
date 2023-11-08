![header](../imagesrc/ZinBanner.png "template_header")

# RFC0018 - Melden van fouten in gegevens volgens iStandaard iWlz
  

<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**

>```nieuwe functionaliteit```

**Beoogde situatie**

Dit document beschrijft functioneel de generieke werking van regelfout meldingen in het Netwerkmodel iWlz. Het gaat om het melden van geconstateerde afwijking(en) op regels die voorgeschreven zijn in de iStandaard iWlz. Met notificaties of meldingen worden respectievelijke afnemer of bronhouder geattendeerd op nieuwe informatie die relevant is voor die afnemer of bronhouder.

<font size="4">**Status RFC**</font>

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/16) om de actuele status van deze RFC te bekijken.

**Inhoudsopgave**
- [RFC0018 - Melden van fouten in gegevens volgens iStandaard iWlz](#rfc0018---melden-van-fouten-in-gegevens-volgens-istandaard-iwlz)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
  - [1.2 Relatie andere RFC's](#12-relatie-andere-rfcs)
  - [1.3 Code](#13-code)
- [2. Terminologie](#2-terminologie)
- [3. Melding of notificatie; wat is het verschil?](#3-melding-of-notificatie-wat-is-het-verschil)
- [4. Meldingen](#4-meldingen)
  - [4.1 Doel melding](#41-doel-melding)
  - [4.2 Typen melding](#42-typen-melding)
  - [4.3 Inhoud iWlz Foutmelding](#43-inhoud-iwlz-foutmelding)
  - [4.4 Foutmelden](#44-foutmelden)
    - [4.4.1 Voorbeeld iWlz Foutmelding](#441-voorbeeld-iwlz-foutmelding)


---
# 1. Inleiding
Binnen het iWlz netwerkmodel werken we met generieke technische oplossingen en contracten om minimaal afhankelijk te zijn van gezamenlijke releases. Daarom werken we bijvoorbeeld met GraphQL, zodat het uitleveren van extra gegevens via een register geen impact heeft op de overige deelnemers aan het netwerk. Daarnaast spelen register een centrale rol in het beschikbaarstellen van informatie aan ketenpartijen. Een bronhouder is verantwoordelijk voor de integriteit van de data in haar register. De afspraken met betrekking tot deze integriteit zijn beschreven in het Informatiemodel iWlz, te vinden op [iStandaarden](https://istandaarden.nl) en [Informatiemodel iWlz](https://informatiemodel.istandaarden.nl).

Binnen het estafettemodel wordt gewerkt met heenberichten en retourberichten. Het heenbericht is vergelijkbaar met het raadplegen van gegevens in een register. Hierop volgt het retourbericht waarin het mogelijk is om door middel van retourcodes te melden waar de inhoud van het bericht niet volstaat  volgens de regels van het informatiemodel. 

In het netwerkmodel zal deze functionaliteit vervangen worden door **foutmeldingen**. Deze RFC beschrijft de gewenste functionaliteit


## 1.1. Uitgangspunten
  - Er zijn meerdere vormen voor meldingen. De eerste vorm die geimplementeerd zal worden is de 'foutmelding'. 

## 1.2 Relatie andere RFC's
Deze RFC heeft de volgende relatie met andere RFCs:
| RFC                                                               | onderwerp                    | relatie<sup>*</sup> | toelichting                                                   | issue                                                   |
|:------------------------------------------------------------------|:-----------------------------|:--------------------|:--------------------------------------------------------------|:--------------------------------------------------------|
| [RFC0008](/RFC/RFC0008%20-%20Notificaties%20en%20Abonnementen.md) | Notificaties en abonnementen | gerelateerd         | Notificaties is de berichtgeving van bronhouder aan deelnemer | [#2](https://github.com/iStandaarden/iWlz-RFC/issues/2) |

<sup>*</sup>voorwaardelijk,*voor andere RFC* / afhankelijk, *van andere RFC*

## 1.3 Code
De bijbehorende koppelvlakspecificaties zijn te vinden in [https://github.com/iStandaarden/iWlz-generiek/tree/POC-bemiddeling](https://github.com/iStandaarden/iWlz-generiek/tree/POC-bemiddeling).

# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| :-------- | :-------- | 
| Bronhouder | Aanbieder van de data, houder van het register |
| Deelnemer | De raadpleger van de bron, het register | 
| Register | Omgeving rondom register, o.a. voor afhandelen van netwerk-diensten |
| Register-data | De feitelijke databron / database | 


# 3. Melding of notificatie; wat is het verschil?

![melding_notificatie](../plantUMLsrc/rfc0018-01-melding_notificatie.svg "melding_notificatie")
<details>
<summary>plantUML-source</summary>

```plantuml
@startuml rfc0018-01-melding_notificatie
title melding of notificatie
skinparam handwritten false
skinparam participantpadding 20
skinparam boxpadding 40
autonumber "<b>[00]"
box  #lightblue
participant "bronhouder" as bs
end box

box  #lightyellow
participant "deelnemer" as dbs
end box

Group Melden
    dbs -> bs: sturen melding
    hnote over dbs #GreenYellow :melding
    activate bs
    activate dbs
    return response
    deactivate dbs
end

Group Notificeren
    bs -> dbs : sturen notificatie
    hnote over bs #GreenYellow :notificatie 
    activate bs
    activate dbs
    return response
    deactivate bs
end
@enduml
```
</details>

|             | Van        | Naar       | Omschrijving                                                                                                                                                                |
|:------------|:-----------|:-----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Melding     | Deelnemer  | Bronhouder | verzoek tot muteren of het beschikbaar stellen van nieuwe informatie naar aanleiding van een gebeurtenis van een deelnemer aan een bron                                     |
| Notificatie | Bronhouder | Deelnemer  | op de hoogte stellen van een deelnemer over dat er nieuwe (of gewijzigde) informatie in een bron beschikbaar is die directe of afgeleide betrekking heeft op die deelnemer. |

Het onderdeel Notificatie is verder uitgewerkt in **RFC0008 - Functionele uitwerking notificaties en abonnementen**.

# 4. Meldingen

## 4.1 Doel melding
Door middel van een melding kan een raadpleger van een bron de bronhouder voorzien van nieuwe informatie die direct betrekking heeft op data in die bron. Een melding loopt altijd van deelnemer (raadpleger) naar een bronhouder. 

## 4.2 Typen melding
Er zijn drie vormen van meldingen gedefinieerd aan de hand van de gestructueerdheid van de informatie in de melding en of die informatie direct betrekking heeft op gegevens in het register. 

| # | Type melding    | omschrijving                                                                                                               | gestructureerdheid/relateerbaarheid                                             |
|:-:|:----------------|:---------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------|
| 1 | **Foutmelding** | Voor het melden van afwijking/overtreding van regels beschreven in de iWlz iStandaard                                      | Zeer, direct te relateren aan een gegeven en afgesproken inhoud dmv (fout-)code |
| 2 | Terugmelding    | Voor het aandragen van een voorstel voor verbetering aandragen aan de bron;  bijvoorbeeld wijziging coördinator zorg thuis | minder, wel te relateren, maar vrije (tekstuele) inhoud                         |
| 3 | Aanvraagmelding | Voor het indienen van nieuwe gegevens, ongerelateerd aan bestaande informatie                                              | ongestructureerd                                                                |

Deze RFC gaat vooral over de **Foutmelding**, waarbij er zoveel mogelijk rekeninggehouden wordt met het mogelijk maken van de overige twee vormen. 

## 4.3 Inhoud iWlz Foutmelding

De inhoud is in structuur vergelijkbaar met de notificatie met vergelijkbare gegevens:

| Gegeven          | Algemene beschrijving                                              | Beschrijving                                                                                                                             | V/O<sup>*</sup> | Datatype |
|------------------|--------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|:---------------:|----------|
| timestamp        | Tijdstip waarop de notificatie is aangemaakt                       |                                                                                                                                          |        V        | Datetime |
| afzenderIDType   | Kenmerk van het type ID van de verzendende partij                  |                                                                                                                                          |        V        | Enum     |
| afzenderID       | Identificatie van de verzender van het bericht                     |                                                                                                                                          |        V        | DID      |
| ontvangerIDType  | Kenmerk van het type ID van de ontvangende partij                  |                                                                                                                                          |        V        | Enum     |
| ontvangerID      | Identifictie van de ontvanger van het bericht                      |                                                                                                                                          |        V        | DID      |
| ontvangerKenmerk | Kenmerk van de ontvanger:                                          | Identificatie van de melder. Meestal gelijk aan de afzender                                                                              |        O        | String   |
| eventType      | Onderwerptype van het bericht                                      | Identificatie van het type melding. (nu alleen iWlzFoutmelding)                                                                          |        V        | String   |
| subjectList | Lijst met meldingen | | V | Array |
| .. / subject          | Onderwerp van het bericht                                          | inhoud van de melding (nu alleen een retourcode of regelcode, maar kan in de toekomst ook een tekstuele suggestie voor verbetering zijn) |        V        | String   |
| .. / recordID         | Identificatie van het record waar het bericht betrekking op heeft. | Identificatie van het record waar de melding betrekking op heeft.                                                                        |        V        | String   |

<sup>*</sup> V = verplicht / O = Optioneel

![notificatie_erd](../plantUMLsrc/rfc0008-06-message-erd.svg "notificatie_erd")

<details>
  <summary>plantUML-source</summary>

```plantuml
@startuml rfc0008-06-message-erd.puml

entity Notification {
  timestamp : Datetime,
  afzenderIDType : string,
  afzenderID : string,
  ontvangerIDType : string,
  ontvangerID : string,
  ontvangerKenmerk : string[0..1],
  eventType : string,
}
entity SubjectList {
      subject : string
      recordID : string
    }

Notification "1" *-- "1..*" SubjectList: contains

@enduml
```
</details>

<details>
  <summary>open json-schema</summary>

```json
{
  "title": "message-definition",
  "description": "json-schema definitie voor iWlz-notificatie en iWlz-melding",
  "type": "object",
  "properties": {
    "timestamp": {
      "type": "string"
    },
    "afzenderIDType": {
      "type": "string"
    },
    "afzenderID": {
      "type": "string"
    },
    "ontvangerIDType": {
      "type": "string"
    },
    "ontvangerID": {
      "type": "string"
    },
    "ontvangerKenmerk": {
      "type": "string"
    },
    "eventType": {
      "type": "string"
    },
    "subjectList": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "subject": {
            "type": "string"
          },
          "recordID": {
            "type": "string"
          }
        },
        "required": [
          "subject",
          "recordID"
        ]
      }
    }
  },
  "required": [
    "timestamp",
    "afzenderIDType",
    "afzenderID",
    "ontvangerIDType",
    "ontvangerID",
    "eventType",
    "subjectList"
  ]
}
```
</details>

## 4.4 Foutmelden

iWlz foutmeldingen zijn nodig om een bronhouder te attenderen op overtredingen van een regel in het informatiemodel iWlz. Wanneer een deelnemer een dergelijke situatie detecteert stuurt deze een (fout-)melding aan de bronhouder. 

![foutmelden](../plantUMLsrc/rfc0018-02-foutmelden.svg "foutmelden")

<details>
<summary>plantUML-source</summary>

```plantuml
@startuml rfc0018-02-foutmelden
skinparam handwritten false
skinparam participantpadding 20
skinparam boxpadding 40
autonumber "<b>[00]"
box bronhouder #lightblue
participant "Register" as brs
participant "Register-data" as rg
participant "Netwerkpunt" as bnp 
end box

box deelnemer #lightyellow
participant "Resource" as rsrc
end box

rg o-> rsrc: raadpleging
    activate rsrc

group fout melden
    rsrc -> rsrc: iWlz-Fout \ngeconstateerd
    rsrc -> bnp: iWlz-Foutmelding naar \nbronhouder
    activate bnp
    bnp -> bnp: valideer inzending
    bnp -> brs: doorzetten iWlz-foutmelding
    activate brs
    brs -> bnp: return response {204}
    deactivate brs
    bnp -> rsrc: return response {204}

    alt #Pink
      bnp --> rsrc: response: {400} ongeldig verzoek
      deactivate bnp
      deactivate rsrc
    end alt

end

@enduml
```
</details>

| # | Beschrijving | Toelichting |
|:---:|---|---|
| 01 | raadpleging | Raadplegen van gegevens door de deelnemer |
| 02 | iWlz-fout geconstateerd | Na raadpleging van gegevens in het register constateert de deelnemer een fout volgens de regels in het informatiemodel iWlz. De deelnemer maakt hiervoor een foutmelding aan met daarin het corresponderende foutcode van de regel die is overtreden |
| 03 | iWlz-foutmelding verzenden | foutmelding aanmaken en verzenden |
| 04 | valideer iWlz-foutmelding | bepaal of afzender melding mag insturen |
| 05 | doorzetten foutmelding | doorzetten foutmelding |
| 06 | http-response {204} | ontvangstbevestiging verzenden aan deelnemer |
| 07 | http-response {204} | routeren ontvangstbevestiging |
| ALT | ongeldige inzending | Deelnemer is niet gerechtigd om de iWlz-foutmelding te doen. |
| 08  | response ongeldig verzoek {400} | ontvang ongeldig verzoek terug |


### 4.4.1 Voorbeeld iWlz Foutmelding

Situatie: bij een indicatie voldoet in de klasse Stoornis de waarde van element DiagnoseSubcodelijst niet aan de bijbehorende regel IRG0012: DiagnoseSubcodelijst vullen conform opgegeven DiagnoseCodelijst. Deze fout wordt op de volgende manier worden teruggegeven. Omdat het element niet afzonderlijk is te duiden, bevat het objectId de verwijzing naar het record in de klasse Stoornis, waar het element DiagnoseSubcodelijst onderdeel van is. Ook overlappen er periodes voor Geindiceerde Zorgzwaartepakketen. 

```json
{
  "timestamp": "2022-09-27T12:07:07.492Z",
  "afzenderTypeID": "Agbcode",
  "afzenderID": "12341234",
  "ontvangerIDType": "Uzovi",
  "ontvangerID": "1234",
  "ontvangerKenmerk": "AGB: 12341234",
  "eventType": "iWLZFOUTMELDING",
  "subjectList": [
    {
      "subject": "IRG0012",
      "recordID": "wlzindicatie/Stoornis/da8ebd42-d29b-4508-8604-ae7d2c6bbddd"     
    },
    {
      "subject": "IRG0028",
      "recordID": "wlzindicatie/GeindiceerdZorgzwaartepakket/5850ad49-7cf4-4711-8215-e160715900e7"     
    }
  ]
}
```

Succesvol response: 
```http
HTTP/1.1 204 (No content)
```
Validatie fout response:
```http
HTTP/1.1 400 Bad Request
{"ErrorCode" : "invalid_request", "Error" :"Validation failed"}
```
