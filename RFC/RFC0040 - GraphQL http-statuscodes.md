![header](../imagesrc/ZinBanner.png "template_header")

# RFC0040 - GraphQL gebruik HTTP statuscodes

> [!CAUTION]  
> **Deze Reqeust for comment is nog onderhanden en inhoud is sterk aan wijzigingen onderhevig**

TODO:
- [ ] nalopen spelling statuscode of status-code
- [ ] spelling HTTP-status of HTTP status


## Samenvatting

**Huidige situatie:**

Er is in het technische afstemmingsoverleg afgesproken dat het gebruik van HTTP-statuscodes binnen het (iWlz-) netwerk worden gereguleerd en situationeel worden bepaald. Hierom is de eerdere Request for Comment [RFC0009](https://github.com/iStandaarden/iWlz-RequestForComment/issues/12) over dit onderwerp is daarom ook komen te vervallen. Die was te globaal van opzet.

De uitwissel standaard binnen het netwerk is GraphQL. De standaard van GraphQL schrijft ook een wijze van gebruik van HTTP statuscodes voor en met name het gebruik van _http 200 OK-status_ behoeft in deze contect meer uitleg omdat er bij een GraphQL Response met _http 200 OK-status_ niet automatische vanuit kan gaan dat het beoogde resultaat is bereikt.

**Beoogde situatie**

Duidelijkheid van welke situatie er sprake is bij een GraphQL 200 OK-status met een **_bad-result_** inhoud.

---

## Inhoudsopgave

- [RFC0040 - GraphQL gebruik HTTP statuscodes](#rfc0040---graphql-gebruik-http-statuscodes)
  - [Samenvatting](#samenvatting)
  - [Inhoudsopgave](#inhoudsopgave)
- [1. Inleiding](#1-inleiding)
  - [1.1 Uitgangspunten](#11-uitgangspunten)
  - [1.2 Status RFC](#12-status-rfc)
- [2. GraphQL over HTTP](#2-graphql-over-http)
  - [2.1 Standaard GraphQL response](#21-standaard-graphql-response)
  - [2.2 `application/json` of `application/graphql-response+json`](#22-applicationjson-of-applicationgraphql-responsejson)
    - [2.2.1 `application/json`](#221-applicationjson)
    - [2.2.2. `application/graphql-response+json`](#222-applicationgraphql-responsejson)
    - [**Response met `application/json`**](#response-met-applicationjson)
      - [HTTP Header](#http-header)
      - [Body](#body)
    - [**Uitleg van het voorbeeld**](#uitleg-van-het-voorbeeld)
    - [**Alternatief: Volledige fout**](#alternatief-volledige-fout)
      - [HTTP Header](#http-header-1)
      - [Body](#body-1)
    - [**Belangrijk verschil met `application/graphql-response+json`:**](#belangrijk-verschil-met-applicationgraphql-responsejson)
    - [**Response met `application/graphql-response+json`**](#response-met-applicationgraphql-responsejson)
      - [HTTP Header](#http-header-2)
      - [Body](#body-2)
    - [**Uitleg van het voorbeeld**](#uitleg-van-het-voorbeeld-1)
    - [**Alternatief voorbeeld bij een volledige fout**](#alternatief-voorbeeld-bij-een-volledige-fout)
      - [HTTP Header](#http-header-3)
      - [Body](#body-3)
    - [**Samenvatting**](#samenvatting-1)
    - [**Conclusie**](#conclusie)
    - [**Voorbeeld**](#voorbeeld)
    - [**Uitleg**](#uitleg)
    - [**Voorbeeld**](#voorbeeld-1)
    - [**Uitleg**](#uitleg-1)
    - [**Wanneer komt dit voor?**](#wanneer-komt-dit-voor)
    - [**Samenvatting**](#samenvatting-2)
- [3. iWlz netwerk validatiemomenten](#3-iwlz-netwerk-validatiemomenten)
  - [3.1 Validaties en responses](#31-validaties-en-responses)
- [3 Error vs bad-result](#3-error-vs-bad-result)
- [3. GraphQL statuscodes](#3-graphql-statuscodes)
  - [3.x GraphQL response format](#3x-graphql-response-format)
  - [3.x GraphQL extension.codes lijst](#3x-graphql-extensioncodes-lijst)
- [X. Referenties](#x-referenties)


---

# 1. Inleiding

De uitwissel standaard binnen het iWlz netwerk is GraphQL. De standaard van GraphQL beschrijft de wijze van gebruik van HTTP statuscodes voor en met name het gebruik van _http 200 OK-status_ behoeft meer uitleg omdat er bij een GraphQL Response met _HTTP 200 OK statuscode_ niet automatische vanuit kan gaan dat het beoogde resultaat is bereikt.

Deze RFC beschrijft de afspraken rondom het gebruik van HTTP-statuscodes op een GraphQL request in de response en gaat in op het onderscheidt tussen **_errors_** en **_'bad-results'_**. Dit is nodig omdat er bij gebruik van GraphQL volgens de standaard sprake kan zijn van beide typen bij een **GrapQL Request**, maar nooit op hetzelfde moment. In het geval dat een GraphQL Request wel een geldige GraphQL response kan opleveren (syntactisch) kan er inhoudelijk nog steeds sprake zijn van een ongewenst resultaat. In dat geval is er sprake van een **_'bad-results'_**

## 1.1 Uitgangspunten

> `nog verder invullen`

1. In het geval dat er op een GraphQL Request een geldige, ***'well-formed'***, GraphQL response gegenereerd kan worden inclusief een ***'not-null'*** `data`-object is er **altijd** sprake van een response HTTP 200 OK-status.
2. Alleen als er sprake is van een GraphQL endpoint (of Resource-server) waar daadwerkelijk sprake is van afhandeling van het GraphQL Request moet er **altijd** gereageerd worden met een HTTP 200 OK-status wanneer de GraphQL correct geinterpreteerd kan worden (zie uitgangspunt 1).
3. Een HTTP 200 OK-status response vanuit een GraphQL-server (of Resource-server) op een GraphQL Request kan inhoudelijk verwijzingen naar fouten bevatten.
4. Wanneer er geen sprake is van directe afhandeling van het GraphQL-request, maar bijvoorbeeld sprake is van autorisatie controle van het GraphQL request mag er afgeweken worden van uitgangspunt 1 en 2.
5. De indeling van HTTP status-codes volgt de internet standaard met betrekking tot HTTP-semantiek beschreven in [RFC9110](https://www.rfc-editor.org/rfc/rfc9110).
6. De situationele HTTP statuscodes zijn en worden beschreven in afzonderlijke Request For Comment (zie onder referenties).

## 1.2 Status RFC

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/40) om de actuele status van deze RFC te bekijken.


# 2. GraphQL over HTTP

## 2.1 Standaard GraphQL response

GraphQL responses hebben standaard twee hoofdvelden:
- **data**: Bevat de gevraagde data als de query succesvol is uitgevoerd.
- **errors**: Bevat een array van foutmeldingen, indien van toepassing.

Zelfs bij een 200 OK-status, kan de errors-array worden gebruikt om fouten te communiceren. Hieronder staat een gestandaardiseerde aanpak:
Responsindeling
- data:
    - Bevat de data die succesvol is opgehaald.
    - Als er fouten zijn, kunnen sommige velden null bevatten.
- errors:
    - Een array van foutobjecten, die elk de volgende velden kunnen bevatten:
      - message (vereist): Beschrijft de fout in begrijpelijke taal.
      - locations (optioneel): Geeft de locaties in de GraphQL-query aan waar de fout is opgetreden.
      - path (optioneel): Specificeert het pad naar het veld in de respons waar de fout betrekking op heeft.
      - extensions (optioneel): Bevat extra metadata over de fout, zoals een foutcode en details voor debugging.

Voorbeeld
```json
  {
    "data": {
      "userID": "123"
    },
    "errors": [
      {
        "message": "some message",
        "locations": [
          { "line": 2, "column": 3 }
        ],
        "path": ["path/to/"],
        "extensions": {
          "code": "STANDAARD_CODE",
          "timestamp": "2024-11-18T10:15:00Z"
        }
      }
    ]
  }
```

## 2.2 `application/json` of `application/graphql-response+json`
Het verschil tussen `application/json` en `application/graphql-response+json` ligt in hoe de server en de client omgaan met de inhoud en de verwachtingen van de response. Hieronder een overzicht:


### 2.2.1 `application/json`
- **Algemene JSON-structuur:**  
  - Dit mediatype wordt algemeen gebruikt voor alle soorten JSON-reacties, niet specifiek voor GraphQL.
  - Het kan door verschillende tussenliggende lagen (zoals proxies, API-gateways) worden gewijzigd of gegenereerd.
  
- **GraphQL-specificatie en gebruik:**  
  - GraphQL-specificatie staat het gebruik van `application/json` toe, maar er zijn beperkingen:
    - De server MOET altijd de HTTP-statuscode **200 OK** gebruiken, zelfs bij fouten, om ervoor te zorgen dat de client kan vertrouwen dat de JSON-reactie van de server komt en niet is aangepast door een tussenliggende laag.
    - Eventuele fouten worden beschreven in de `errors`-sleutel van de JSON-reactie, niet in de HTTP-statuscode.

- **Voordelen:**  
  - Compatibel met oudere clients en middleware.
  - Brede ondersteuning in JSON-gerelateerde tooling.

- **Nadelen:**  
  - Geen onderscheid tussen succesvolle en mislukte aanvragen op basis van de HTTP-statuscode.
  - Foutafhandeling vereist dat de client altijd naar de `errors`-sleutel kijkt.


### 2.2.2. `application/graphql-response+json`
- **GraphQL-specifieke JSON-structuur:**  
  - Dit mediatype is specifiek ontworpen voor GraphQL-responses.
  - Het ondersteunt betere foutafhandeling door zowel de HTTP-statuscode als de inhoud van de GraphQL-respons (`data` en `errors`) te gebruiken.

- **GraphQL-specificatie en gebruik:**  
  - De HTTP-statuscode geeft de status van de aanvraag aan:
    - **2xx (bijvoorbeeld 200):** Wanneer de query geheel of gedeeltelijk succesvol is.
    - **4xx of 5xx:** Wanneer de aanvraag ongeldig is of volledig is mislukt (bijvoorbeeld syntaxfouten, validatiefouten).
  - De server en client kunnen vertrouwen op de HTTP-statuscode, en fouten worden specifieker afgehandeld.

- **Voordelen:**  
  - Helder onderscheid tussen succesvolle en mislukte aanvragen via de HTTP-statuscode.
  - Meer in lijn met REST-achtige foutafhandeling.
  - Betere interoperabiliteit en duidelijkere semantiek voor foutverwerking.

- **Nadelen:**  
  - Vereist ondersteuning door zowel server als client.
  - Minder breed ondersteund in oudere tooling en middleware.

Hier is een voorbeeld van een GraphQL-respons met het mediatype `application/graphql-response+json`. Dit voorbeeld laat een gedeeltelijk succesvolle uitvoering zien, inclusief zowel data als fouten.

Hier is een voorbeeld van een GraphQL-respons met het mediatype `application/json`. Dit voorbeeld illustreert een gedeeltelijk succesvolle uitvoering van een query, waarbij de HTTP-statuscode **altijd 200 OK** is, ongeacht de aanwezigheid van fouten.

---

### **Response met `application/json`**
#### HTTP Header
```http
Content-Type: application/json
Status: 200 OK
```

#### Body
```json
{
  "data": {
    "user": {
      "id": "123",
      "name": "Alice"
    },
    "posts": null
  },
  "errors": [
    {
      "message": "You do not have permission to access the 'posts' field.",
      "locations": [
        {
          "line": 3,
          "column": 5
        }
      ],
      "path": ["posts"]
    }
  ]
}
```

---

### **Uitleg van het voorbeeld**

1. **HTTP-statuscode 200 OK:**  
   - Bij `application/json` MOET de server altijd een HTTP-statuscode van **200 OK** retourneren, zelfs als er fouten optreden in de query.
   - Fouten worden niet gesignaleerd via de HTTP-statuscode, maar via de inhoud van de `errors`-sleutel.

2. **`data`:**  
   - Bevat de velden die succesvol zijn opgehaald (`user`-object).  
   - Velden die niet konden worden opgehaald (`posts`) zijn opgenomen met een waarde van `null`.

3. **`errors`:**  
   - Bevat details over de fout(en):
     - **`message`:** De foutbeschrijving ("geen toestemming voor 'posts'").
     - **`locations`:** De locatie in de query waar de fout is opgetreden (regel 3, kolom 5).
     - **`path`:** Het pad naar het veld dat de fout veroorzaakte (`posts`).

---

### **Alternatief: Volledige fout**
Als de query volledig faalt (bijvoorbeeld vanwege een syntaxfout), blijft de HTTP-statuscode nog steeds **200 OK** en wordt de fout uitsluitend in de `errors`-sleutel gerapporteerd.

#### HTTP Header
```http
Content-Type: application/json
Status: 200 OK
```

#### Body
```json
{
  "data": null,
  "errors": [
    {
      "message": "Syntax Error: Unexpected <EOF>.",
      "locations": [
        {
          "line": 1,
          "column": 7
        }
      ]
    }
  ]
}
```

---

### **Belangrijk verschil met `application/graphql-response+json`:**
- Bij `application/json` wordt altijd een **200 OK**-statuscode gebruikt, ongeacht de aanwezigheid van fouten.  
- Dit kan verwarrend zijn voor clients, omdat ze de `errors`-sleutel moeten inspecteren om fouten te herkennen.
- Bij `application/graphql-response+json` worden 4xx- of 5xx-statuscodes gebruikt om fouten direct te signaleren via de HTTP-respons.
---

### **Response met `application/graphql-response+json`**  
#### HTTP Header
```http
Content-Type: application/graphql-response+json
Status: 200 OK
```

#### Body
```json
{
  "data": {
    "user": {
      "id": "123",
      "name": "Alice"
    },
    "posts": null
  },
  "errors": [
    {
      "message": "You do not have permission to access the 'posts' field.",
      "locations": [
        {
          "line": 3,
          "column": 5
        }
      ],
      "path": ["posts"]
    }
  ]
}
```

---

### **Uitleg van het voorbeeld**  
1. **HTTP-statuscode 200 OK:**  
   - De server geeft aan dat de query is uitgevoerd, maar mogelijk met fouten.  
   - Dit is een geldige 2xx-respons, omdat er een niet-nulle `data`-sleutel aanwezig is.

2. **`data`:**  
   - Bevat gegevens die succesvol zijn opgehaald (`user`-object).  
   - Het `posts`-veld is echter `null`, wat aangeeft dat er een fout is opgetreden bij het ophalen van dat veld.

3. **`errors`:**  
   - De foutdetails worden vermeld in de `errors`-sleutel:
     - **`message`:** Beschrijft het probleem ("geen toestemming voor 'posts'").  
     - **`locations`:** Specificeert waar in de query het probleem zich bevindt (regel 3, kolom 5).  
     - **`path`:** Geeft het exacte veld (`posts`) aan waar de fout is opgetreden.

---

### **Alternatief voorbeeld bij een volledige fout**
Als de gehele query faalt en er geen `data` kan worden geretourneerd, wordt een andere HTTP-statuscode gebruikt, zoals **400 Bad Request**:

#### HTTP Header
```http
Content-Type: application/graphql-response+json
Status: 400 Bad Request
```

#### Body
```json
{
  "errors": [
    {
      "message": "Syntax Error: Unexpected <EOF>.",
      "locations": [
        {
          "line": 1,
          "column": 7
        }
      ]
    }
  ]
}
```

---

### **Samenvatting**
Het mediatype `application/graphql-response+json` biedt flexibele foutafhandeling door het gebruik van zowel de HTTP-statuscode als de `data`- en `errors`-sleutels in de respons. Hierdoor kunnen clients beter omgaan met gedeeltelijke en volledige fouten.

**Samenvatting van de verschillen**

| Kenmerk                        | `application/json`                 | `application/graphql-response+json` |
|---------------------------------|-------------------------------------|-------------------------------------|
| **Toepassing**                 | Algemeen JSON-mediate type         | Specifiek voor GraphQL-responses    |
| **Statuscode bij fouten**      | Altijd **200 OK**                  | 2xx, 4xx, of 5xx afhankelijk van fout |
| **Foutinformatie**             | Alleen in `errors`-sleutel         | In `errors` én HTTP-statuscode     |
| **Middleware-interferentie**   | Gevoelig voor tussenliggende lagen | Minder gevoelig voor interferentie |
| **Specifieke GraphQL-support** | Nee                                | Ja                                 |

### **Conclusie**
- Gebruik `application/json` als je backward compatibility nodig hebt of met oudere systemen werkt.
- Gebruik `application/graphql-response+json` als je een modernere, robuustere aanpak voor foutafhandeling wilt, met duidelijke HTTP-statuscodes.


---
Deze zin betekent dat:

- Wanneer een geldige GraphQL-operatie **faalt** (bijvoorbeeld doordat bepaalde velden of bewerkingen fouten veroorzaken), kunnen de HTTP-responsstatuscodes variëren afhankelijk van het gebruikte mediatype van de reactie.  
  - Bijvoorbeeld: `application/json` of `application/graphql-response+json`.

- Echter, **als de GraphQL-reactie een niet-nulle `data`-sleutel bevat**, wordt dit beschouwd als een gedeeltelijke succesvolle uitvoering. Dit betekent dat:
  - De server zal antwoorden met een **2xx HTTP-statuscode** (meestal 200 OK).
  - Dit geldt ook als er fouten zijn opgetreden bij specifieke velden in de GraphQL-operatie.  

Kort gezegd: zolang er **iets** (geen `null`) in de `data`-sleutel van de reactie zit, beschouwt de server het als een gedeeltelijke succesreactie en geeft het een **2xx-statuscode**.

Hier is een voorbeeld van een GraphQL-respons met zowel een `data`-sleutel als een `errors`-sleutel, wat typisch is voor een gedeeltelijke reactie:  

### **Voorbeeld**  
```json
{
  "data": {
    "user": {
      "id": "123",
      "name": "Alice"
    },
    "posts": null
  },
  "errors": [
    {
      "message": "You do not have permission to access the 'posts' field.",
      "locations": [
        { "line": 3, "column": 5 }
      ],
      "path": ["posts"]
    }
  ]
}
```

### **Uitleg**  
1. **`data`**:  
   - Bevat gedeeltelijke gegevens (`user` met `id` en `name`).  
   - Het `posts`-veld is echter `null` omdat er een fout optrad bij het ophalen van die gegevens.  

2. **`errors`**:  
   - Geeft een gedetailleerde foutmelding aan waarin wordt uitgelegd waarom het `posts`-veld niet beschikbaar is.  
   - Bevat context, zoals de locatie in de GraphQL-query (regel en kolom) en het pad naar het veld (`posts`).  

3. **HTTP-statuscode**:  
   - De server zou in dit geval een **200 OK**-statuscode retourneren, omdat er een niet-nulle `data`-sleutel aanwezig is.  
   - Dit betekent dat de operatie gedeeltelijk succesvol was, ondanks de fout.  

Hier is een voorbeeld van een GraphQL-respons zonder `data`, wat vaak voorkomt bij een ernstige fout die het uitvoeren van de query volledig verhindert:  

### **Voorbeeld**  
```json
{
  "errors": [
    {
      "message": "Syntax Error: Unexpected <EOF>.",
      "locations": [
        {
          "line": 1,
          "column": 7
        }
      ]
    }
  ]
}
```

### **Uitleg**  
1. **Geen `data`-sleutel**:  
   - Dit gebeurt wanneer de server geen gegevens kan retourneren, bijvoorbeeld vanwege een fout in de query (zoals een syntaxfout, validatiefout of een andere grote fout).  
   - De GraphQL-specificatie schrijft voor dat in dit geval alleen de `errors`-sleutel aanwezig is.

2. **`errors`**:  
   - De `errors`-sleutel bevat details over wat er misging.  
   - In dit geval is er een syntaxfout opgetreden (bijvoorbeeld een niet-afgesloten query). De foutmelding bevat de locatie in de query waar het probleem is gevonden.

3. **HTTP-statuscode**:  
   - De server MOET een 4xx- of 5xx-statuscode retourneren, afhankelijk van het probleem:  
     - Syntaxfout: **400 Bad Request**  
     - Validatiefout of niet-machtige toegang: **403 Forbidden** of **401 Unauthorized**  

### **Wanneer komt dit voor?**
- Syntaxfouten in de query, zoals ontbrekende haakjes of komma’s.  
- Een volledig ongeldig verzoek, bijvoorbeeld een lege of beschadigde payload.  

### **Samenvatting**  
Dit is een voorbeeld van een situatie waarin er geen `data`-sleutel in de GraphQL-respons aanwezig is omdat de server geen enkele bruikbare uitvoer kon genereren.


# 3. iWlz netwerk validatiemomenten

Op dit moment zijn er drie soorten verkeer binnen het iWlz netwerk:

1. GraphQL request met een **_raadpleging_** van informatie bij een register.
2. GraphQL request voor het **_notificeren_** van een deelnemer door een bronhouder.
3. GraphQL request voor het **_foutmelden_** door een deelnemer aan een bronhouder.

Voor al het verkeer in het iWlz netwerk vormt nID de centrale voorziening voor het regelen van de toegang tot iWlz registers. Voor elk van de drie soorten verkeer verloopt het proces als volgt:

```mermaid
---
config:
  theme: default
---
sequenceDiagram
autonumber
  box Client
  actor Deelnemer
  end

  box lightyellow nID
  participant authz as oAuth-server
  participant PEP
  participant PDP
  end

  box lightgreen Resource
  participant Resource
  end

  Deelnemer->>authz: request authorisation
  activate authz
  activate Deelnemer

    authz-->>Deelnemer: token
  deactivate authz
  deactivate Deelnemer

  Deelnemer->>+PEP: GraphQL request + token
  activate Deelnemer
    activate PEP

    PEP->>PDP: Policy controle
      activate PDP

      PDP-->>PEP: allow
      deactivate PDP
    PEP->>Resource: GraphQL request forward
      activate PEP
        activate Resource

        Resource-->>PEP: GraphQL response
        deactivate Resource
      deactivate PEP
    PEP-->> Deelnemer: GraphQL response forward
    deactivate PEP
  deactivate Deelnemer

```

| #   | Beschrijving               | Toelichting                                                                                                                    |
| --- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | request authorisation      | De flow begint met het aanvragen van toestemming door de deelnemer.                                                            |
| 2   | token                      | Indien succesvol doorlopen wordt een access-token uitgedeeld aan de deelnemer.                                                 |
| 3   | GraphQL Request + token    | De deelnemer kan met het access-token een verzoek uitzetten bij de PEP om een GraphQL-request te doen bij een resource-server. |
| 4   | Policy controle            | Het request wordt aangeboden aan de PDP om te beoordelen of deelnemer het request mag indienen                                 |
| 5   | Request allow              | Request voldoet aan autorisatie en beleid                                                                                      |
| 6   | GraphQL Request forward    | De PEP routeert het graphQL request aan de juiste resource-server.                                                             |
| 7   | Response (GraphQL)         | De resource-server stuurt het GraphQL resultaat terug.                                                                         |
| 8   | Response (GraphQL) forward | De PEP routeert het resultaat terug aan de client.                                                                             |

## 3.1 Validaties en responses

```mermaid
---
config:
  theme: default
---
sequenceDiagram
  box Client
  actor Deelnemer
  end

  box lightyellow nID
  participant authz as oAuth-server
  participant PEP
  participant PDP
  end

  box lightgreen Resource
  participant Resource
  end

  Deelnemer->>authz: request authorisation
  activate authz
  activate Deelnemer
    note right of authz: Validatie 1
    authz --x Deelnemer: HTTP-error {40x-50x}
    authz-->>Deelnemer: token
  deactivate authz
  deactivate Deelnemer

  Deelnemer->>+PEP: GraphQL request + token
  activate Deelnemer
    activate PEP
    note right of PEP: Validatie 2
    PEP --x Deelnemer: HTTP-error {40x-50x}
    PEP->>PDP: Policy controle
      activate PDP
      note right of PDP: Validatie 3
      PDP--xDeelnemer: HTTP-error {40x-50x}
      PDP-->>PEP: allow
      deactivate PDP
    PEP->>Resource: GraphQL request forward
      activate PEP
        activate Resource
        note right of Resource: Validatie 4
        Resource--xDeelnemer: HTTP-error {40x-50x}
        Resource-->>PEP: GraphQL response 200 {data (+error)}
        Resource--xPEP: GraphQL response 4xx {error}
        deactivate Resource
      deactivate PEP
    PEP-->> Deelnemer: GraphQL response 200 {data (+ error)} forward
    PEP--X Deelnemer: GraphQL response 4xx {error} forward
    deactivate PEP
  deactivate Deelnemer

```

| Validatiemoment | Doel | GraphQL controle | GraphQL Verwerking |
|---|---|---|---|
| Validatiemoment 1: Autorisatieserver | **Doel:** Uitgeven van autorisatie token voor het mogen uitvoeren van een GraphQL request.  <br/><br/>Client kan toestemming vragen voor het uitsturen van een GraphQL-request. Bij het ontvangen van het verzoek en valideren ervan vinden de volgende acties plaats:      <br/>•  De autorisatieserver valideert de client o.b.v. het aangeboden authenticatiemiddel      <br/>•  De autorisatieserver doorloopt voor elke aanvraag (scope) de rule-engine.      <br/>•  In de rule-engine wordt de scope gevalideerd m.b.v. de ingestelde regels voor de aangevraagde scope(s).      <br/><br/>Indien succesvol doorlopen wordt er een access-token wordt gegenereerd, hierin zijn de scopes en de resources verwerkt en auitgedeeld aan de client.     <br/><br/>Bij een fout-situatie worden er reguliere HTTP status-codes teruggegeven in de range 40x en 50x. De specificatie daarvan voor dit moment is te vinden in: [RFC0014 - Functionele uitwerking aanvragen van autorisatie - 6.1 Foutmeldingen Aanvraag van Autorisatie](https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0014%20-%20Functionele%20uitwerking%20aanvragen%20van%20autorisatie.md#6-foutmeldingen) | Nee | Nee |
| Validatiemoment 2: PEP | **Doel:** controleren toegang tot (GraphQL-) Resource-server    <br/><br/>Een “Policy Enforcement Point” (kortweg PEP) regelt toegang tot resource-servers van deelnemers en beschermt deze resource-servers tegen ongeautoriseerde toegang/verzoeken.      <br/>•  PEP: Valideren van de client o.b.v. het aangeboden authenticatiemiddel.    <br/>•  PEP: Valideren van de access-token o.a. op eigenaar en geldigheid.      <br/><br/>Bij een fout-situatie worden er reguliere HTTP status-codes teruggegeven in de range 40x en 50x. De specificatie daarvan voor dit moment is te vinden in: [RFC0014 - Functionele uitwerking aanvragen van autorisatie - 6.2 Foutmeldingen PEP endpoint op GraphQL request](https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0014%20-%20Functionele%20uitwerking%20aanvragen%20van%20autorisatie.md#6-foutmeldingen) | Nee | Nee |
| Validatiemoment 3: PDP | **Doel:** controleren of GraphQL-request is toegestaan voor deelnemer    <br/><br/>Een “Policy Decision Point” (kortweg PDP) is verantwoordelijk voor het nemen van beslissingen over toegangsverzoeken. Het GraphQL-request wordt vanuit de PEP aangeboden aan de PDP om te beoordelen of deelnemer de ingediende query mag uitvoeren en of de verplichte onderdelen aanwezig zijn.    <br/>•  PDP: Bepalen of de query aan de gestelde policy of beleidsregel voldoet.      <br/><br/>Bij een fout-situatie worden er reguliere HTTP status-codes teruggegeven in de range 40x en 50x. De specificatie daarvan voor dit moment is te vinden in: [RFC0014 - Functionele uitwerking aanvragen van autorisatie - 6.2 Foutmeldingen PEP endpoint op GraphQL request](https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0014%20-%20Functionele%20uitwerking%20aanvragen%20van%20autorisatie.md#6-foutmeldingen) | Ja (maar nooit {data})| Nee |
| Validatiemoment 4: (GraphQL) Resource-server | **Doel:** Afhandelen van het GraphQL-request     <br/><br/>De (GraphQL) Resource-server zorgt voor de afhandeling en vewerking van het GraphQL request. Dit kan betekenen dat er bij een query data wordt teruggegeven, dat de er een bevestiging volgt op juiste ontvangst van een notificatie (GraphQL 200 {data}) of foutmelding of dat de verwerking van het request een ongewenst resultaat geeft (bad-result: GraphQL 200 {error}).  <br/><br/>De afspraken hierover volgen in @@@@  <br/><br/>Is de (GraphQL) Resource-server niet bereikbaar of kan de GraphQL niet verwerkt worden, dan worden er reguliere HTTP status-codes teruggegeven in de range 40x en 50x. De specificatie daarvan voor dit moment is te vinden in:   <br/>• [RFC0014 - Functionele uitwerking aanvragen van autorisatie - #6.2](https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0014%20-%20Functionele%20uitwerking%20aanvragen%20van%20autorisatie.md#6-foutmeldingen)  <br/>• [RFC0008 - Notificaties - #3.6](https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0008%20-%20Notificaties.md#36-notificatie-responses-vanuit-opa) <br/>• [RFC0018 - Foutmeldingen - #3.6](https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0018%20-%20Melden%20van%20fouten%20in%20gegevens%20volgens%20iStandaard%20iWlz.md#36-response-op-inzenden-foutmelding-vanuit-opa) | Nee | **Ja** (en data) |




# 3 Error vs bad-result

```mermaid
---
config:
  theme: base
---
kanban
  column1[Errors]
    task1[Bad Gateway]
    task2[Server timeout]
  column2['bad-results']
    task1[user not found]
    task2[bad input]
    task3[invalid structure]
```

# 3. GraphQL statuscodes


## 3.x GraphQL response format

## 3.x GraphQL extension.codes lijst

# X. Referenties

Hieronder de verwijzingen naar relevante artikelen.

| Onderwerp                            |                                                                                                                                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Overzicht HTTP status codes          | https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes                                                                                                                                            |
| GrapQL over HTTP                     | https://graphql.org/learn/serving-over-http/                                                                                                                                                             |
| GraphQL status codes                 | https://graphql.github.io/graphql-over-http/draft/#sec-Status-Codes                                                                                                                                      |
| Foutmeldingen RFC0014 - OAuth 2.0    | https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0014%20-%20Functionele%20uitwerking%20aanvragen%20van%20autorisatie.md#6-foutmeldingen                                           |
| Http reponses uit OPA op notificatie | https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0008%20-%20Notificaties.md#36-notificatie-responses-vanuit-opa                                                                   |
| Http responses uit OPA op melding    | https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0018%20-%20Melden%20van%20fouten%20in%20gegevens%20volgens%20iStandaard%20iWlz.md#36-response-op-inzenden-foutmelding-vanuit-opa |


