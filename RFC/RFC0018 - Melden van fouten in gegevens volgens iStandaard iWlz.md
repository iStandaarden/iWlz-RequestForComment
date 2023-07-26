![header](../imagesrc/ZinBanner.png "template_header")

# RFC0018 - Melden van fouten in gegevens volgens iStandaard iWlz
- [ ]  Verwijzing opnemen naar generiek GraphQL KV

<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**

>```nog invullen```

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
- [3. Meldingen](#3-meldingen)
  - [3.1 Melding of notificatie](#31-melding-of-notificatie)
  - [3.2 Meldingsvormen](#32-meldingsvormen)
  - [3.3 Foutmelden](#33-foutmelden)
  - [3.4 Inhoud iWlz Foutmelding](#34-inhoud-iwlz-foutmelding)
    - [3.4.1 Voorbeeld iWlz Foutmelding](#341-voorbeeld-iwlz-foutmelding)


---
# 1. Inleiding
Binnen het iWlz netwerkmodel werken we met generieke technische oplossingen en contracten om minimaal afhankelijk te zijn van gezamenlijke releases. Daarom werken we bijvoorbeeld met GraphQL, zodat het uitleveren van extra gegevens via een register geen impact heeft op de overige deelnemers aan het netwerk. Daarnaast spelen register een centrale rol in het beschikbaarstellen van informatie aan ketenpartijen. Een bronhouder is verantwoordelijk voor de integriteit van de data in haar register. De afspraken met betrekking tot deze integriteit zijn beschreven in het Informatiemodel iWlz, te vinden op [iStandaarden](https://istandaarden.nl) en [Informatiemodel iWlz](https://informatiemodel.istandaarden.nl).

Binnen het estafettemodel wordt gewerkt met heenberichten en retourberichten. Het heenbericht is vergelijkbaar met het raadplegen van gegevens in een register. Hierop volgt het retourbericht waarin het mogelijk is om door middel van retourcodes te melden waar de inhoud van het bericht niet volstaat  volgens de regels van het informatiemodel. 

In het netwerkmodel zal deze functionaliteit vervangen worden door **foutmeldingen**. Deze RFC beschrijft de gewenste functionaliteit


## 1.1. Uitgangspunten
  - Er zijn meerdere vormen voor meldingen. De eerste vorm die geimplementeerd zal worden is de 'foutmelding'. 

## 1.2 Relatie andere RFC's
Deze RFC heeft de volgende relatie met andere RFCs:
| RFC | onderwerp | relatie<sup>*</sup> | toelichting | issue |
|:----|:----------|:--------------------|:------------|:------|
|     |           |                     |             |       |

<sup>*</sup>voorwaardelijk,*voor andere RFC* / afhankelijk, *van andere RFC*

## 1.3 Code
De bijbehorende koppelvlakspecificaties zijn te vinden in [https://github.com/iStandaarden/iWlz-generiek/tree/POC-bemiddeling](https://github.com/iStandaarden/iWlz-generiek/tree/POC-bemiddeling).

# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| :-------- | :-------- | 
| Bronhouder | Aanbieder van de data, houder van het register |
| Deelnemer | De raadpleger van de bron, het register | 
| DID | Decentralized Identifiers. De W3C-standaard Decentralized Identifiers maakt het verifiëren van decentrale digitale identiteiten mogelijk. Deze decentrale identificatoren kunnen gebruikt worden bij self-sovereign identity. | 



# 3. Meldingen

## 3.1 Melding of notificatie
Wanneer een deelnemer andere of nieuwe informatie heeft over gegevens in een register waar de deelnemer zelf geen bronhouder van is, kan die deelnemer dit kenbaar maken bij de bronhouder via een melding.

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

## 3.2 Meldingsvormen
Er zijn drie vormen van meldingen gedefinieerd aan de hand van de gestructueerdheid van de informatie in de melding en of die informatie direct betrekking heeft op gegevens in het register. 

| # | vorm            | omschrijving                                                                                                               | gestructureerdheid/relateerbaarheid                                             |
|:-:|:----------------|:---------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------|
| 1 | **Foutmelding** | Voor het melden van afwijking/overtreding van regels beschreven in de iWlz iStandaard                                      | Zeer, direct te relateren aan een gegeven en afgesproken inhoud dmv (fout-)code |
| 2 | Terugmelding    | Voor het aandragen van een voorstel voor verbetering aandragen aan de bron;  bijvoorbeeld wijziging coördinator zorg thuis | minder, wel te relateren, maar vrije (tekstuele) inhoud                         |
| 3 | Aanvraagmelding | Voor het indienen van nieuwe gegevens, ongerelateerd aan bestaande informatie                                              | ongestructureerd                                                                |

Deze RFC gaat vooral over de **Foutmelding**, waarbij er zoveel mogelijk rekeninggehouden wordt met het mogelijk maken van de overige twee vormen. 

## 3.3 Foutmelden

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
participant "Backoffice" as bs
participant "Register" as rg
participant "Netwerkpunt" as bnp 
end box

box deelnemer #lightyellow
participant "Netwerkpunt" as dnp
participant "Backoffice" as dbs
end box

rg o-> dbs: raadpleging
    activate dbs

group fout melden
    dbs -> dbs: iWlz-Fout \ngeconstateerd
    dbs -> dnp: iWlz-Foutmelding verzenden
    activate dnp
    dnp -> bnp: iWlz-Foutmelding naar \nbronhouder
    activate bnp
    bnp -> bnp: valideer inzending
    bnp -> bs: doorzetten iWlz-foutmelding
    activate bs
    bs -> bnp: return response {204}
    deactivate bs
    bnp -> dnp: return response {204}
    dnp -> dbs: return response {204}

    alt #Pink
      bnp --> dnp: response: {400} ongeldig verzoek
      deactivate bnp
      dnp --> dbs: response: {400} ongeldig verzoek
      deactivate dnp
      deactivate dbs
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
| 04 | iWlz-foutmelding naar bronhouder | routeren naar juiste bronhouder |
| 05 | valideer iWlz-foutmelding | bepaal of afzender melding mag insturen |
| 06 | doorzetten foutmelding | doorzetten foutmelding |
| 07 | http-response {204} | ontvangstbevestiging verzenden aan deelnemer |
| 08 | http-response {204} | routeren ontvangstbevestiging |
| 09 | http-response {204} | ontvangen ontvangstbevestiging |
| ALT | ongeldige inzending | Deelnemer is niet gerechtigd om de iWlz-foutmelding te doen. |
| 10  | response ongeldig verzoek {400} | retourneer ongeldig verzoek |
| 11  | response ongeldig verzoek {400} | ontvang ongeldig verzoek terug |

## 3.4 Inhoud iWlz Foutmelding

De inhoud is in structuur vergelijkbaar met de notificatie met vergelijkbare gegevens:

| Gegeven     | Beschrijving     |  V/O<sup>*</sup> | Datatype
| --- | --- | :--: | :-- |
| afzenderID     | Identificatie van de afzender in het netwerk | V | DID |
| timestamp     | Tijdstip waarop de melding is aangemaakt | V | Datetime |
| meldingType     | Identificatie van het type melding. (nu alleen iWlzFoutmelding) | V | Enum[Foutmelding] |
| melding     | inhoud van de melding (nu alleen een retourcode of regelcode, maar kan in de toekomst ook een tekstuele suggestie voor verbetering zijn) | V | String |
| objectID     | Identificatie van het object waar de melding betrekking op heeft en eventueel input voor de raadpleging. | V | String |

<sup>*</sup> V = verplicht / O = Optioneel

### 3.4.1 Voorbeeld iWlz Foutmelding

Situatie: bij een indicatie voldoet in de klasse Stoornis de waarde van element DiagnoseSubcodelijst niet aan de bijbehorende regel IRG0012: DiagnoseSubcodelijst vullen conform opgegeven DiagnoseCodelijst. Deze fout wordt op de volgende manier worden teruggegeven. Omdat het element niet afzonderlijk is te duiden, bevat het objectId de verwijzing naar het record in de klasse Stoornis, waar het element DiagnoseSubcodelijst onderdeel van is.

```json
{
  "afzenderID": "89e0e41a-13df-4fe2-ad72-d9c32ca5641c",
  "timestamp": "2022-09-27T12:07:07.492Z",
  "meldingType": "IWLZ_FOUTMELDING",
  "melding": "IRG0012",
  "objectId": "https://api.ciz.nl/wlzindicatieregister/wlzindicaties/Stoornis/da8ebd42-d29b-4508-8604-ae7d2c6bbddd"
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
