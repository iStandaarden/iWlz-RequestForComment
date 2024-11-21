![header](../imagesrc/ZinBanner.png "template_header")

# RFC0014 - Functionele uitwerking aanvragen van autorisatie

versie 1.9 - dd. 21-11-2024

**SAMENVATTING**

**Huidige situatie:**

Ongewenste afhankelijkheid in autorisatie tussen notificatie en raadpleging en inflexibel werking autorisatiemodel. 

**Beoogde situatie**

Dit document beschrijft functioneel de generieke wijze van autoriseren in het Netwerkmodel iWlz. Met de juiste autorisatie kunnen bronhouders en deelnemers acties uitvoeren zoals notificaties versturen, registers bevragen en sturen van meldingen.

**Status RFC**

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/9) om de actuele status van deze RFC te bekijken.

***

Inhoudsopgave

- [RFC0014 - Functionele uitwerking aanvragen van autorisatie](#rfc0014---functionele-uitwerking-aanvragen-van-autorisatie)
- [1. Inleiding](#1-inleiding)
  - [1.1 Uitgangspunten](#11-uitgangspunten)
  - [1.2 Scope RFC](#12-scope-rfc)
- [2. Terminologie](#2-terminologie)
- [3. Schematische weergave](#3-schematische-weergave)
- [4. Netwerkcomponenten](#4-netwerkcomponenten)
  - [4.1 Autorisatieserver](#41-autorisatieserver)
    - [4.1.1 Grant\_type](#411-grant_type)
    - [4.1.2 Scopes](#412-scopes)
    - [4.1.3 Audience](#413-audience)
    - [4.1.4 Token request](#414-token-request)
      - [4.1.4.1 Token request als partij zelf](#4141-token-request-als-partij-zelf)
      - [4.1.4.2 Token request namens een andere partij (actor)](#4142-token-request-namens-een-andere-partij-actor)
  - [4.2 Policy Enforcement Point (PEP)](#42-policy-enforcement-point-pep)
  - [4.3 Policy Decision Point (PDP)](#43-policy-decision-point-pdp)
- [5 Raadplegen registers](#5-raadplegen-registers)
  - [5.1 Raadplegen Indicatieregister](#51-raadplegen-indicatieregister)
  - [5.2 Raadplegen Bemiddelingsregister](#52-raadplegen-bemiddelingsregister)
- [6 Foutmeldingen](#6-foutmeldingen)
  - [6.1 Foutmeldingen Aanvraag van Autorisatie](#61-foutmeldingen-aanvraag-van-autorisatie)
    - [\[01\] 400 Audience Required](#01-400-audience-required)
    - [\[02\] 403 Not Allowed](#02-403-not-allowed)
    - [\[03\] 403 Invalid Client Certificate](#03-403-invalid-client-certificate)
    - [\[04\] 404 Not Found](#04-404-not-found)
    - [\[05\] 500 Internal Server Error](#05-500-internal-server-error)
  - [6.2 Foutmeldingen PEP endpoint bij GraphQL request](#62-foutmeldingen-pep-endpoint-bij-graphql-request)
    - [\[06\] 400 Invalid Query Syntax](#06-400-invalid-query-syntax)
    - [\[07\] 400 No Operation](#07-400-no-operation)
    - [\[08\] 400 Invalid Scope](#08-400-invalid-scope)
    - [\[09\] 403 Invalid Client Certificate](#09-403-invalid-client-certificate)
    - [\[10\] 403 Not Allowed](#10-403-not-allowed)
    - [\[11\] 403 Unauthorized](#11-403-unauthorized)
    - [\[12\] 403 Policy: Access Denied](#12-403-policy-access-denied)
    - [\[13\] 403 Request Does Not Match Scopes](#13-403-request-does-not-match-scopes)
    - [\[14\] 500 Internal Server Error](#14-500-internal-server-error)
    - [\[15\] 502 Bad Gateway](#15-502-bad-gateway)
    - [\[16\] 504 Gateway Timeout](#16-504-gateway-timeout)
- [**7. Referenties**](#7-referenties)

***

# 1. Inleiding

Binnen het iWlz netwerkmodel werken we met generieke technische oplossingen zoveel mogelijk afgeleid van open standaarden. Dit om de noodzaak van gezamenlijke releases te beperken en een duurzaam informatiestelsel binnen de zorg te bewerkstelligen. Er is bijvoorbeeld voor GraphQL gekozen voor het delen van informatie zodat het toevoegen van extra of nieuwe gegevens vanuit een register geen impact hoeft te hebben op de bestaande deelnemers aan het netwerk. (Wanneer een deelnemer de nieuwe gegevens wil raadplegen heeft het uiteraard wel impact voor die raadpleger).

Het mechanisme voor autoriseren blijkt in de huidige opzet niet voldoende generiek. Het is namelijk niet mogelijk om een open bevraging te doen op een (iWlz-)register. De reden hiervoor is dat autorisaties nu alleen worden uitgedeeld op initiatief van een register door het toesturen van een notificatie (Notified Pull) hierdoor is notificeren en autoriseren met elkaar verweven. 

Deze RFC beschrijft een oplossingsrichting om deze verwevenheid te corrigeren. Het zorgt voor losse autorisatie op het mogen versturen, raadplegen of wijzigen van informatie op een databron (scope) en is het mogelijk om voor elk van de deelnemers beleidsregels op te stellen onder en met welke voorwaarden een deelnemer dat mag (policy). 


## 1.1 Uitgangspunten

- Elke deelnemer heeft een authenticatiemiddel van een vertrouwde uitgever. Waar momenteel een VECOZO systeemcertificaat wordt gebruikt, kan t.z.t. ook PKIOverheid worden vertrouwd of het gebruik van DiD en Verifiable Credentials mogelijk zijn.
- Om als deelnemer notificaties te kunnen ontvangen moet deze deelnemer een notificatie-endpoint beschikbaar stellen. Deelnemers binnen het iWlz Netwerkmodel moeten een notificatie-endpoint conform RFC0008 implementeren.
- Elke deelnemer moet in het Adresboek zijn endpoints registreren. (N.B. op dit moment is het adresboek nog niet gerealiseerd, endpoints worden nu in een lijst bijgehouden. Zie onder referenties). 
- Elke deelnemer in het iWlz Netwerkmodel heeft een attest van deelname nodig. Momenteel wordt dit via VECOZO verzorgd tijdens de onboarding.

## 1.2 Scope RFC
Deze RFC beschrijft de fase van implementatie Indicatieregister 2 en de ontwikkelfase Bemiddelingsregister 1. Deelnemers zijn op dit moment het CIZ, de (softwareleveranciers van de) zorgkantoren en VECOZO. 


# 2. Terminologie

Opsomming van de in dit document gebruikte termen.

| Terminologie                 | Omschrijving                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Claims                       | Een claim is een kwalificatie, een behaalde prestatie of een stukje informatie over de achtergrond van een entiteit, zoals een naam, id, huisadres of afgeronde opleiding. Een claim zegt iets over de entiteit (deelnemer) en helpt bij het bepalen van toegang en rechten binnen een systeem.                                                                                            |
| Scopes                       | Een scope geeft de limieten van autorisatie tot een resource aan. Een scope kan een deelnemer bij de autorisatieserver aanvragen. Dit zal het systeem gebruiken om na te gaan welke acties een gebruiker mag doen voor het raadplegen van registers.                                                                                                                                       |
| OAuth 2 Authorization server | Een OAuth 2 authorization server deelt Access-Tokens uit om te kunnen communiceren met een resource-server. communicatie met een resource-server verloopt in het het netwerkstelsel altijd via een policy-enforcement-point (PEP).                                                                                                                                                         |
| Access-Token                 | Een access-token wordt uitgegeven aan een deelnemer door de autorisatieserver. Een Access-Token heeft een korte levensduur en bevat informatie over de deelnemer, de scopes(permissies) en diverse tijdsaspecten.                                                                                                                                                                          |
| Audience                     | De audience staat voor de bedoelde ontvanger waarvoor het access-token bedoeld is. In dit geval is het de locatie oftewel de URL van de resource-server.                                                                                                                                                                                                                                   |
| Resource-Server              | In het netwerkstelsel is een resource-server een Graphql server van een netwerk deelnemer die GraphQL-queries accepteert en uitvoert naar onder andere de brondata.                                                                                                                                                                                                                        |
| OPA                          | De **Open Policy Agent** (OPA) is een open-source, generiek policy gebaseerde beleidsengine waarmee je consistente en flexibele toegangscontrole kunt instellen en afdwingen in softwaretoepassingen. Het framework is  om beleidsregels (policies) te beheren, te evalueren en te handhaven bij het raadplegen van de registers.. Het bestaat onder andere uit de componenten PEP en PDP. |
| PEP                          | Policy Enforcement Point: service die het OPA framework aanroept om een beleidsbeslissing aan te vragen of te verkrijgen                                                                                                                                                                                                                                                                   |
| PDP                          | Policy Decision Point: Neemt de beleidsbeslissingen, voert de policy uit.                                                                                                                                                                                                                                                                                                                  |


# 3. Schematische weergave

Voor alle activiteiten in het netwerkstelstel is autorisatie noodzakelijk, deze autorisaties kunnen worden aangevraagd bij de autorisatieserver. Voorbeelden van activiteiten zijn: lezen, schrijven, aanpassen en verwijderen van data uit registers, maar ook autorisatie voor het mogen versturen van notificaties en meldingen.

In het onderstaande schema wordt de basis uitgelegd voor het aanvragen van autorisatie en hoe vervolgens een raadpleging (GraphQL request) verloopt.

![aanvraag_autorisatie](../plantUMLsrc/rfc0014-01-aanvragen_autorisatie.svg "aanvraag_autorisatie")

_rfc0014-01-aanvragen\_autorisatie\_flow_

| #  | Beschrijving                    | Toelichting                                                                                                                                          |
| -- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01 | Aanvraag van autorisatie        | Client wil een actie uitvoeren op een register en vraagt hiervoor autorisatie aan bij het token endpoint van de autorisatieserver                    |
| 02 | Valideer Authenticatiemiddel    | De autorisatieserver valideert de client o.b.v. het aangeboden authenticatiemiddel                                                                   |
| 03 | Run rule-engine o.b.v. scope(s) | De autorisatieserver doorloopt voor elke aanvraag (scope) de rule-engine.                                                                               |
| 04 | Valideer autorisatie            | In de rule-engine wordt de scope gevalideerd m.b.v. de ingestelde regels voor de aangevraagde scope(s).                                              |
| 05 | Genereer Access-Token           | Een access-token wordt gegenereerd, hierin zijn de scopes en de resources verwerkt.                                                                  |
| 06 | Response (Access-Token)         | Indien succesvol doorlopen wordt een access-token uitgedeeld aan de client.                                                                          |
| 07 | GraphQL Request                 | Een client kan met het access-token een verzoek uitzetten bij de PEP om een raadpleging te doen bij een resource-server.                             |
| 08 | Valideer Authenticatiemiddel    | Valideren van de client o.b.v. het aangeboden authenticatiemiddel.                                                                                   |
| 09 | Valideer Access-Token           | Valideren van de access-token o.a. op eigenaar en geldigheid.                                                                                        |
| 10 | Valideer query tegen policy     | De query wordt aangeboden aan de PDP om te beoordelen of deelnemer de ingediende query mag uitvoeren  en of de verplichte onderdelen aanwezig zijn.  |
| 11 | Valideer query                  | Bepaal of de query aan de gestelde policy of beleidsregel voldoet.                                                                                   |
| 12 | Verify context information      | Het kan nodig zijn dat de PDP contextinformatie nodig heeft om de query te valideren. Dit kan de PDP doen bij een externe resource.                  |
| 13 | Query allow                     | Query voldoet aan de policy.                                                                                                                         |
| 14 | GraphQL Request                 | De PEP routeert het graphQL verzoek aan de juiste resource-server.                                                                                   |
| 15 | Response (GraphQL)              | De resource-server stuurt het GraphQL resultaat terug.                                                                                               |
| 16 | Response (GraphQL)              | De PEP routeert het resultaat terug aan de client.                                                                                                   |


# 4. Netwerkcomponenten

Het nID netwerkstelsel voorziet in de volgende key netwerkservices.

- Autorisatieserver
- Policy Enforcement Point
- Policy Decision Point


## 4.1 Autorisatieserver

Binnen het netwerk is momenteel een autorisatieserver beschikbaar, bij deze autorisatieserver kunnen netwerkdeelnemers toestemming tot autorisatie aanvragen. De autorisatieaanvraag voldoet aan de OAuth 2.0 standaard. Het resultaat van de aanvraag is een access-token (JWT).

Toegang tot deze autorisatieserver is beperkt tot alleen netwerkdeelnemers en alleen via het token-endpoint waarvoor een vertrouwd authenticatiemiddel vereist is. Momenteel alleen met gebruik van een VECOZO systeemcertificaat.

De volgende token-endpoints zijn voor netwerkdeelnemers beschikbaar:

|              |                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Omgeving** | **URL**                                                                                                                |
| TST          | [https://tst-api.vecozo.nl/tst/netwerkmodel/v3/auth/token](https://tst-api.vecozo.nl/tst/netwerkmodel/v2/oauth2/token) |
| PRD          | [https://api.vecozo.nl/netwerkmodel/v3/auth/token](https://api.vecozo.nl/netwerkmodel/v2/oauth2/token)                 |


### 4.1.1 Grant_type

OAuth 2.0 ondersteunt verschillende "flow standaarden" (ook wel grants genoemd) om toegang te verlenen. Voor server-naar-server communicatie wordt meestal de “Client Credential Flow” toegepast. Deze “Client Credential flow” wordt ook gebruikt bij het aanvragen van toestemming tot autorisatie bij de autorisatieserver in het netwerk stelsel.


### 4.1.2 Scopes

De autorisatieserver “vereist” dat de client in het autorisatieverzoek een "scope" parameter specificeert. 

De “scope” speelt een cruciale rol in het aanvragen van autorisatie. De scope geeft het bereik aan waarvoor autorisatie wordt aangevraagd en daarmee beperkt en specificeert welke gegevens of functionaliteiten de client kan gebruiken of bevragen. 

Een scope is opgebouwd uit de combinatie van resource\_type en de benodigde toegang.

**Voorbeeld:** De onderstaande scope is bruikbaar voor de autorisatieaanvraag tot het opvragen (read) van indicatiegegevens uit het indicatieregister:

```json
"scope":"registers/wlzindicatieregister/indicaties:read" 
```

Indien de autorisatieserver de scope van de aanvraag goedkeurt, zal de “scope” in het access-token terugkomen. De waarde van de scope parameter in het verzoek is uitgedrukt als een spatie-gescheiden lijst van case-sensitive strings.

De volgorde van de spatie-gescheiden strings is onbelangrijk. De autorisatieserver zal elke string verwerken als extra scope in het access-token. Indien er 2 dezelfde scopes worden meegegeven, dan worden deze samengevoegd tot 1 unieke scope. 

Voor een goede request flow is het nodig om de scope in de request body op te stellen zoals in onderstaande voorbeelden wordt weergegeven.

**Voorbeeld:** van een scope request parameter waarin meerdere scopes worden aangevraagd:

```json
"scope":"registers/wlzbemiddelingsregister/bemiddelingen:read registers/wlzbemiddelingsregister/bemiddelingen:write"
```

Als een client een scope aanvraagt waarvoor hij geen autorisatie heeft, dan zal de autorisatieserver een foutmelding retourneren "Access denied, invalid scope", ongeacht of er in dezelfde aanvraag scopes zitten waarvoor wel is geautoriseerd. 

Als de client geen of een lege scope parameter meegeeft in zijn request aan de autorisatieserver, dan MOET de autorisatieserver het verzoek verwerken door een vooraf gedefinieerde standaard scope toe te passen of een "Invalid scope" foutmelding te retourneren. Als de autorisatieserver een verzoek ontvangt waar 1 of meerdere scopes incorrect zijn MOET de autorisatieserver een "Access denied, invalid scope" retourneren.

Een standaard scope zou kunnen zijn: *“user/profile:read”* (Deze scope is als voorbeeld en bestaat in het huidige netwerkmodel niet)

Hieronder zijn alle scope(s) gedocumenteerd die op moment van schrijven mogelijk zijn in het iWlz Netwerkmodel.

Afhankelijk van de definitie in de access-policy kan een deelnemer deze aanvragen.

| Resource             | Scope                                                              | Omschrijving                                                                          |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
|                      | (no scope)                                                         | Retourneert de "Defaultscope", (momenteel niet mogelijk)                              |
| Notificatie          | organisaties/zorgkantoor/notificaties/notificatie:create           | Geeft recht om een notificatie te sturen aan het zorgkantoor                          |
| Notificatie          | organisaties/zorgaanbieder/notificaties/notificatie:create         | Geeft recht om een notificatie te sturen aan een zorgaanbieder                        |
| Melding              | organisaties/zorgkantoor/meldingen/melding:create                  | Geeft recht om een melding te sturen aan het zorgkantoor                              |
| Melding              | organisaties/zorgaanbieder/meldingen/melding:create                | Geeft recht om een melding te sturen aan een zorgaanbieder                            |
| Indicatie-register   | registers/wlzindicatieregister/indicaties:read                     | Geeft leesrechten tot indicatie uit het indicatieregister                             |
| Bemiddelingsregister | registers/wlzbemiddelingsregister/bemiddelingen/bemiddeling:read   | Geeft leesrechten tot bemiddelingen uit het Bemiddelingsregister.                      |
| Bemiddelingsregister | registers/wlzbemiddelingsregister/bemiddelingen/bemiddeling:create | Geeft create rechten om nieuwe bemiddelingen aan te maken in het Bemiddelingsregister. |


### 4.1.3 Audience

Als je in OAuth een access-token aanvraagt, moet je specificeren wie of wat de uiteindelijke ontvanger van deze token is, deze ontvanger wordt aangeduid als “audience”. Dit helpt om te verzekeren dat het token alleen kan worden gebruikt bij de bedoelde resource-server en nergens anders.

- Het opgeven van een “audience” is verplicht. 
- Enkel is één audience toegestaan.
- De audience moet een valide “https” URL zijn. De audience is de afgeschermde URL van de resource-server welke ook alleen de Policy Enforcement Point van de resource-server vertrouwd,


### 4.1.4 Token request

In het token request kan aangegeven worden namens wie het request wordt uitgevoerd. Dit kan op twee manieren, als de partij zelf of als “actor” namens een partij. Wanneer als partij een request wordt gedaan, dan wordt het Vecozo certificaat/Vecozo identity gebruikt om te bepalen wie de partij is.  Als “actor” moet (naast het Vecozo certificaat) in het token request worden opgegeven namens welke partij geacteerd moet worden. Op het moment kunnen deze partijen zorgaanbieders (agb’s) en zorgkantoren (uzovi’s) zijn.

**Opmerking:** Een request header MOET het Content-Type: application/json bevatten om aan te geven dat de body in JSON formaat is.

#### 4.1.4.1 Token request als partij zelf
De partij vraagt een token aan voor zichzelf.

Voorbeeld van een token request voor en door de partij zelf:
```http
POST https://api.vecozo.nl/netwerkmodel/v3/auth/token

{
    "grant_type": "client_credentials",
    "scope": "registers/wlzindicatieregister/indicaties:read",
    "audience": "https://koppelpunt.ciz.nl/iwlz/indicatieregister/v2/graphql"
}
```

De response is een JWT:
```json
{
  "iss":"auth.nid",
  "sub":"20001000001131",
  "aud":"https://koppelpunt.ciz.nl/iwlz/indicatieregister/v2/graphql",
  "exp":1731318519,
  "nbf":1730713599,
  "iat":1730713719,
  "jti":"eaa55b46-8d97-46ab-82a3-3a5a44170c67",
  "_claim_names":{
    "agb":"localhost",
    "uzovi":"localhost"
  },
  "_claim_sources":{
    "localhost":{
      "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2IiOiIwMTIzNDUxMjMiLCJ1em92aSI6bnVsbH0.Y6XJZI7Ri0gV8Xqh6HZ0kk97oLu6sixc3T2v2K2GKfU"
    }
  },
  "client_id":"20001000001131",
  "subjects":null,
  "scopes":[
    "registers/wlzindicatieregister/indicaties:read"
  ],
  "consent_id":"7a8ddf4d-8953-4232-9714-4d1926888a65",
  "client_metadata":null
}
```

**Opmerking:** De maximale token-duration (exp) is 1 uur, ongeacht de scope. 

#### 4.1.4.2 Token request namens een andere partij (actor)
 
Wanneer als actor een request wordt ingediend, moet het token worden uitgebreid met een “access_token/sub” element. Dit element bevat de identificatie van de partij waarvoor een token wordt opgehaald. Op het moment kan er geacteerd worden als zorgkantoor of zorgaanbieder. De waarde van het element kan er als volgt uit zien:

| Instantie Type | Identificatie   | Element waarde    |
| :------------- | :-------------- | :---------------- |
| Zorgkantoor    | 5000 (uzovi)    | uzovi:5000        |
| Zorgaanbieder  | 012345678 (agb) | agbcode:012345678 |


Voorbeeld token request als actor voor een partij:
```http
POST https://api.vecozo.nl/netwerkmodel/v3/auth/token

{
    "grant_type": "client_credentials",
    "scope": "registers/wlzindicatieregister/indicaties:read",
    "audience": "https://koppelpunt.ciz.nl/iwlz/indicatieregister/v2/graphql",
    "access_token" : {
       "sub" : "uzovi:5000"
    }
}
```

```json
{
  "iss":"auth.nid",
  "sub":"20001000001131",
  "aud":"https://koppelpunt.ciz.nl/iwlz/indicatieregister/v2/graphql",
  "exp":1731318519,
  "nbf":1730713599,
  "iat":1730713719,
  "jti":"eaa55b46-8d97-46ab-82a3-3a5a44170c67",
  "_claim_names":{
    "agb":"localhost",
    "uzovi":"localhost"
  },
  "_claim_sources":{
    "localhost":{
      "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2IiOm51bGwsInV6b3ZpIjoiNTAwMCJ9.9mRf50AuhkVfGwIcqYA4I_8fChcXg_N9h-VHhMo2MlE"
    }
  },
  "client_id":"uzovi:5000",
  "subjects":null,
  "scopes":[
    "registers/wlzindicatieregister/indicaties:read"
  ],
  "consent_id":"7a8ddf4d-8953-4232-9714-4d1926888a65",
  "client_metadata":null,
  "act":{
    "sub":"20001000001131"
  }
}
```
 

## 4.2 Policy Enforcement Point (PEP)

Een “Policy Enforcement Point” (kortweg PEP) regelt toegang tot resource-servers van deelnemers en beschermt deze resource-servers tegen ongeautoriseerde toegang/verzoeken. 

De PEP stuurt alle toegangsverzoeken naar resource-servers eerst door naar de PDP ter beoordeling. Waarna (conform de beslissing) het verzoek wordt toegestaan of wordt afgewezen (Allow of Deny).

- De PEP is voor netwerkdeelnemers alleen toegankelijk op het GraphQL-endpoint.
- De PEP vereist een vertrouwd authenticatiemiddel en een geldig Access-Token.
- De netwerkdeelnemer registreert zelf in het adresboek welke PEP zijn resource-server beschermt.
- De resource-servers van de netwerkdeelnemers vertrouwen de PEP op het valideren van de grondslag.
- In het netwerk is momenteel maar één PEP(redundant) beschikbaar. In de toekomst zijn meerdere zelfstandige PEPs voorstelbaar.

Wanneer het request wordt toegestaan en wordt doorgestuurd naar de resource server, dan wordt een “claims” request header gezet met daarin de door de deelnemer gebruikte JWT exclusief de JWT header en signature. Deze header kan gebruikt worden voor eventuele logging doeleinden.

Voorbeeld van claims header:
```json
{
  "iss": "auth.nid",
  "sub": "uzovi:5529",
  "aud": "https://koppelpunt.test.ciz.nl/iwlz/indicatieregister/v2/graphql",
  "exp": 1729689721,
  "nbf": 1729084801,
  "iat": 1729084921,
  "jti": "38679b9f-6495-44d4-9875-503aff8e669e",
  "_claim_names": {
    "agb": "localhost",
    "uzovi": "localhost"
  },
  "_claim_sources": {
    "localhost": {
      "jwt": "eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJhZ2IiOiBudWxsLCAidXpvdmkiOiAiNTUyOSJ9.4YmLNTMhftIz7jL3_BOuJG0uBVHA2MobjsbMXJ9hctw"
    }
  },
  "client_id": "uzovi:5529",
  "subjects": null,
  "scopes": [
    "registers/wlzindicatieregister/indicaties:read"
  ],
  "consent_id": "5879861e-ddee-4212-974c-1cdbb4a0c61b",
  "client_metadata": null,
  "act": {
    "sub": "40000000100507"
  }
}
```





In het netwerkstelsel zijn momenteel onderstaande PEP’s in gebruik.

| Omgeving | URL                                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------- |
| TST      | [https://tst-api.vecozo.nl/tst/netwerkmodel/v3/resource-server/](https://tst-api.vecozo.nl/tst/netwerkmodel/v2/GraphQL) |
| PRD      | [https://api.vecozo.nl/netwerkmodel/v3/resource-server](https://api.vecozo.nl/netwerkmodel/v2/GraphQL)/                 |

**_Let op:_** _De URL bevat de term resource-server, dit is incorrect en zal tzt worden vervangen door PEP_


## 4.3 Policy Decision Point (PDP)

Een “Policy Decision Point” (kortweg PDP) is het belangrijkste component in de toegangscontrole binnen het netwerkstelsel en is verantwoordelijk voor het nemen van beslissingen over toegangsverzoeken. 

De PDP beoordeelt het toegangsverzoek in de vorm van een GraphQL-query aan de hand van de gedefinieerde beleidsregels (policies). Deze regels kunnen gebaseerd zijn op verschillende factoren zoals de scope, specifieke claims, eventueel verplichte operators en de opgevraagde entiteiten in de query.

- Het verzoek tot een beslissing door de PDP verloopt altijd via de Policy Enforcement Point (PEP).
- Het genomen besluit wordt vervolgens teruggestuurd naar de PEP.
- Elk besluit is gekoppeld aan een beleid(policy).
- Elk besluit wordt vastgelegd (decision-log).


# 5 Raadplegen registers

Hieronder de algemene beschrijving voor het raadplegen van het Indicatieregister en Bemiddelingsregister in de vorm van twee voorbeelden.


## 5.1 Raadplegen Indicatieregister

> **Benodigde scope: registers/wlzindicatieregister/indicaties:read** 

Deze scope staat toe om een indicatie op te vragen uit het Indicatieregister. De autorisatieserver heeft bij het aanvragen van de autorisatie-token gecontroleerd of de deelnemer hiertoe is gemachtigd. Daarna mag de deelnemer een GrapqhQL query opsturen. 

Wat en hoe de raadpleger met een GraphQL query mag raadplegen wordt bepaald door bijbehorende policy.

**Voorbeeld:** Opvragen indicatie door het initieel verantwoordelijke zorgkantoor. 

Het zorgkantoor moet hierbij verplicht zowel de eigen uzovi-code als het ID van de te raadplegen Wlz-indicatie meesturen. Als een van deze ontbreekt, wordt de query niet uitgevoerd. De PDP controleert of beide aanwezig zijn en beoordeelt ook welke gegevens worden opgevraagd. Alleen als er een gegeven wordt aangevraagd waarvoor het zorgkantoor geen toegang heeft (meer dan is toegestaan volgens de query-template), zal de PDP de query afkeuren.

```gql
# QIR-0001-ZKi.graphql
# Query voor initieel Verantwoordelijk Zorgkantoor op Indicatieregister
# Verplichte input:
#   - wlzIndicatieID = te raadplegen WlzIndicatie
#   - uzovicode zorgkantoor = eigen uzovicode raadpleger
# versie 1.0.0 - 2024-10-04

query WlzIndicatie(
    $wlzIndicatieID: UUID!
    $initieelVerantwoordelijkZorgkantoor: String!
) {
    wlzIndicatie(
      where: {
        wlzindicatieID: {eq: $wlzIndicatieID}
        initieelVerantwoordelijkZorgkantoor: {eq: $initieelVerantwoordelijkZorgkantoor}
        }
    ) {
        wlzindicatieID
        bsn
        besluitnummer
        soortWlzindicatie
        afgiftedatum
        ingangsdatum
        ...
        grondslag {
            grondslagID
            grondslag
            volgorde
        }
        geindiceerdZorgzwaartepakket {
            geindiceerdZorgzwaartepakketID
            zzpCode
            ingangsdatum
            ...
        }
   ...
}
```
_(De volledige query-template is te vinden op:_  [_https://github.com/iStandaarden/iWlz-indicatie/tree/Indicatieregister-2_](https://github.com/iStandaarden/iWlz-indicatie/tree/Indicatieregister-2)_)_

**Let op**: Of het raadplegende zorgkantoor uiteindelijk gegevens ontvangt, hangt er ook van af of de combinatie van _initieelVerantwoordelijkZorgkantoor_ en _wlzIndicatieID_ daadwerkelijk in het register voorkomt.


## 5.2 Raadplegen Bemiddelingsregister

> **Benodigde scope: registers/wlzbemiddelingsregister/bemiddelingen/bemiddeling:read** 

Deze scope verleent toestemming om een bemiddeling op te vragen uit het Bemiddelingsregister. De autorisatieserver controleert of de deelnemer hiervoor bevoegd is. Vervolgens mag de deelnemer een GraphQL-query indienen. Wat en hoe de deelnemer gegevens mag raadplegen met een GraphQL-query, wordt bepaald door de policy die bij de query hoort.

**Voorbeeld:** Raadplegen van een bemiddeling door de toegewezen zorgaanbieder.  

De zorgaanbieder moet hierbij zowel de eigen AGB-code als het ID van de bemiddelingsspecificatie waarin deze zorgaanbieder is benoemd meesturen. Als een van deze ontbreekt, wordt de query niet uitgevoerd. De PDP controleert op de aanwezigheid van beide waarden en beoordeelt welke gegevens worden opgevraagd. Alleen als er informatie wordt opgevraagd waarvoor de zorgaanbieder op dat moment geen toegang heeft, zal de PDP de query afkeuren.

```gql
# QBR-0001-ZA.graphql
# Query voor Zorgaanbieder op Bemiddelingsregister
# Verplichte input:
#   - bemiddelingspecificatieID = te raadplegen bemiddelingsspecificatie
#   - agbcode instelling = eigen agbcode raadpleger

query Bemiddelingspecificatie(
  $BemiddelingspecificatieID: UUID!
  $Instelling: String!
) {
  bemiddelingspecificatie(
    where: {
      bemiddelingspecificatieID: { eq: $BemiddelingspecificatieID }
      instelling: { eq: $Instelling }
    }
  ) {
    bemiddelingspecificatieID
    leveringsvorm
    zzpCode
    toewijzingIngangsdatum
    toewijzingEinddatum
    instelling
    ...
    bemiddeling {
      bemiddelingID
      wlzIndicatieID
      verantwoordelijkZorgkantoor
      verantwoordelijkheidIngangsdatum
      verantwoordelijkheidEinddatum
      # Overige Bemiddelingspecificaties van de bemiddeling mag je niet ophalen zonder datumfilter - zie QBR-0002-ZA.graphql
      client {
        bsn
        clientID
        taal
        communicatievorm
        huisarts
        leefeenheid
        # Sub entiteiten van de client mag je niet ophalen zonder datumfilter - zie QBR-0002-ZA.graphql
      }
    }
  }
}
```


(Voor de volledige query-template en andere templates, zie:[ https://github.com/iStandaarden/iWlz-bemiddeling](https://github.com/iStandaarden/iWlz-bemiddeling))

**Let op**: Of de raadplegende zorgaanbieder daadwerkelijk gegevens ontvangt, hangt ervan af of de combinatie van _instelling_ en _bemiddelingsspecificatieID_ ook in het register voorkomt.


# 6 Foutmeldingen

**OAuth HTTP Error Responses**In het onderstaande schema staan de mogelijke foutmeldingen die kunnen optreden bij het ophalen van autorisaties of het uitvoeren van een GraphQL-verzoek.

**Overzicht van HTTP Error Responses**Let op: foutmeldingen kunnen afhankelijk van de geïmplementeerde client anders worden weergegeven.

> **NB 1: GraphQL 200 OK**
> 
> Een GraphQL 200 OK response kan inhoudelijk nog steeds een fout-melding bevatten. De standaard beschrijft dat wanneer een GraphQL request door de server is ontvangen er altijd een 200 OK response volgt. Dit betekent niet automatisch dat de query volledig succesvol kon worden afgehandeld. 

> **NB 2: Inhoud Error Responses**
> 
> Het overzicht geeft de mogelijke HTTP Error responses vanuit voornamelijk de PEP. Dezelfde fouten kunnen ook voorkomen bij de Resource-server. Een onderscheid in afzender moet mogelijk zijn.  In een volgende update zal er afzenderinformatie in de message-body moeten worden toegevoegd. 


![foutmeldingen_overzicht](../plantUMLsrc/rfc0014-02-foutmeldingen_overzicht.svg "foutmeldingen_overzicht")


## 6.1 Foutmeldingen Aanvraag van Autorisatie

### [01] 400 Audience Required

- **HTTP Response:**
    ```http
    HTTP/1.1 400 Bad Request
    "audience is required"
     ```
- **Details**:\
    Controleer of alle headers op de juiste manier worden meegegeven zoals: ‘content-type’.
    Het netwerkmodel gebruikt de flow standaard (grant_type) “client_credentials”. Een ***audience*** en ***scope*** parameter zijn vereist bij het aanvragen van een token. Voeg deze toe aan de request body. 

    Bijvoorbeeld:
    ```json
    {
    "grant_type": "client_credentials",
    "scope": "registers/wlzindicatieregister/indicaties:read",
    "audience": "https://koppelpunt.ciz.nl/iwlz/indicatieregister/graphql/v2/graphql"
    }
    ```

### [02] 403 Not Allowed

- **HTTP Response:** 
    ```http
    HTTP/1.1 403 Forbidden 
    ```

- **Details**:\
  Mogelijke oorzaken zijn:

  - Het IP-adres is niet geregistreerd bij het authenticatiemiddel.
  - Het authenticatiemiddel kan geblokkeerd zijn. Neem contact op met de VECOZO contactpersoon binnen uw organisatie, deze kan in de portaal van VECOZO controleren of uw IP-adres is opgenomen in de lijst van IP-adressen.
  - [Hoe kan ik mijn IP-adres registreren?](https://www.vecozo.nl/support/controle-op-ip-adressen/ip-adres-registreren/hoe-kan-ik-mijn-ip-adres-registreren/) - (https://www.vecozo.nl/support/controle-op-ip-adressen/ip-adres-registreren/hoe-kan-ik-mijn-ip-adres-registreren/)


### [03] 403 Invalid Client Certificate

- **HTTP Response**: 
    ```http
    HTTP/1.1 403 Invalid Client Certificate 
    ```

- **Details**:\
  Het certificaat ontbreekt, is ongeldig of verlopen (van toepassing bij gebruik van een VECOZO-systeemcertificaat). Zorg ervoor dat het authenticatiemiddel overeenkomt met de juiste omgeving.

  [Uw certificaat installeren of vernieuwen](https://www.vecozo.nl/certificaten-installerenvernieuwen/) - (https://www.vecozo.nl/certificaten-installerenvernieuwen/) of neem contact op met VECOZO Functioneel Beheer.


### [04] 404 Not Found

- **HTTP Response**: 
    ```http
    HTTP/1.1 404 Not Found
    ```

- **Details**:\
  Een onjuist endpoint van de autorisatieserver is gebruikt. Controleer of het correcte endpoint is geconfigureerd, zoals gespecificeerd in dit document onder de details van de autorisatieserver.


### \[05] 500 Internal Server Error

- **HTTP Response**: 
    ```http
    HTTP/1.1 500 Internal Server Error
    ```
- **Details**:\
  Een onverwachte fout is opgetreden op de autorisatieserver. Probeer het later opnieuw of volg het incidentbeheerproces indien nodig.


## 6.2 Foutmeldingen PEP endpoint bij GraphQL request

### [06] 400 Invalid Query Syntax

- **HTTP Response**: 
    ```http
    HTTP/1.1 400 Bad Request
    ```

- **Details**:\
    De query voldoet niet aan de vereiste syntax. Controleer de structuur van de query aan de hand van de specificaties.

### [07] 400 No Operation

- **HTTP Response**: 
    ```http
    HTTP/1.1 400 Bad Request
    {"ErrorCode": "bad_request", "Error": "No operation found to evaluate"} 
    ```

- **Details**:\
    Er ontbreekt een geldige operatie in de GraphQL-aanvraag. Controleer en pas de query aan om een bewerking te definiëren.


### [08] 400 Invalid Scope

- **HTTP Response**: 
    ```http
    HTTP/1.1 400 Bad Request
    "Scope is not allowed"
    ```

- **Details**:\
    De opgevraagde scope komt niet overeen met de toegestane scope. Controleer de scope-instellingen.


### [09] 403 Invalid Client Certificate

- **HTTP Response**: 
    ```http
    HTTP/1.1 403 Invalid Client Certificate
    ```

- **Details**:\
    Het certificaat ontbreekt, is ongeldig of verlopen (van toepassing bij gebruik van een VECOZO-systeemcertificaat). Zorg ervoor dat het authenticatiemiddel overeenkomt met de juiste omgeving.

    Voor meer informatie ga naar: [Uw certificaat installeren of vernieuwen](https://www.vecozo.nl/certificaten-installerenvernieuwen/) - https://www.vecozo.nl/certificaten-installerenvernieuwen/ of neem contact op met VECOZO Functioneel Beheer


### [10] 403 Not Allowed

- **HTTP Response**: 
    ```http
    HTTP/1.1 403 Not Allowed 
    ```

- **Details**:\
    Mogelijke oorzaken zijn:
    - Het IP-adres is niet geregistreerd bij het authenticatiemiddel.
    - Het authenticatiemiddel kan geblokkeerd zijn. Neem contact op met de VECOZO contactpersoon binnen uw organisatie, deze kan in de portaal van VECOZO controleren of uw IP-adres is opgenomen in de lijst van IP-adressen. 
    - Voor meer informatie ga naar: [Hoe kan ik mijn IP-adres registreren?](https://www.vecozo.nl/support/controle-op-ip-adressen/ip-adres-registreren/hoe-kan-ik-mijn-ip-adres-registreren/) - https://www.vecozo.nl/support/controle-op-ip-adressen/ip-adres-registreren/hoe-kan-ik-mijn-ip-adres-registreren/

### [11] 403 Unauthorized
- **HTTP Response:**
    ```http
    HTTP/1.1 403 Unauthorized
    ```

- **Details:**\
    De toegang werd geweigerd, omdat er mogelijk een access token ontbrak. Controleer of het access token correct is aangevraagd en wordt meegegeven. Indien de fout zich blijft voordoen, kunt u het incidentbeheerproces volgen.

### [12] 403 Policy: Access Denied
- **HTTP Response:**
    ```http
    HTTP/1.1 403 Forbidden
    ```

- **Details:**\
    Toegang geweigerd op basis van een policy. De toegangsrechten van het gebruikte authenticatiemiddel voldoen niet aan de toegangsvereisten. Controleer de query en probeer opnieuw.

### [13] 403 Request Does Not Match Scopes
- **HTTP Response:**
    ```http
    HTTP/1.1 403 Forbidden
    ```

- **Details:**\
     De aanvraag voldoet niet aan de vereiste scopes in het access token. Controleer de toegewezen scopes. Vraag een nieuwe access token aan indien de token voor een andere scope bestemd is.

### [14] 500 Internal Server Error

- **HTTP Response**: 
    ```http
    HTTP/1.1 500 Internal Server Error
    ```

- **Details**:\
  Er is een onverwachte fout opgetreden op de server. Probeer het later opnieuw of raadpleeg het incidentbeheerproces.


### [15] 502 Bad Gateway

- **HTTP Response**: 
    ```http
    HTTP/1.1 502 Bad Gateway 
    ```

- **Details**:\
  De server kreeg een ongeldige reactie van een upstream-server. Controleer de serverinstellingen of probeer het later opnieuw.

### [16] 504 Gateway Timeout

- **HTTP Response**: 
    ```http
    HTTP/1.1 504 Gateway Timeout 
    ```

- **Details**:\
  De server reageerde niet binnen de verwachte tijd. Controleer de serververbindingen of probeer het later opnieuw.



# **7. Referenties**

| Onderwerp                                  |                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| oAuth 2.0                                  | https://oauth.net/2/                                                    |
| OPA                                        | https://www.openpolicyagent.org/                                       |
| Informatiemodel iWlz - Indicatieregister 2 | https://informatiemodel.istandaarden.nl/iWlz-Indicatie-2/               |
| Koppelvlakspecificatie Indicatieregister 2 | https://github.com/iStandaarden/iWlz-indicatie/tree/Indicatieregister-2 |
| Informatiemodel iWlz - Bemiddelingsregister | https://informatiemodel.istandaarden.nl/iWlz-Bemiddeling-1/             |
| Koppelvlakspecificatie Bemiddeling         | https://github.com/iStandaarden/iWlz-bemiddeling                        |
| Audiences (tijdelijk alternatief ZorgAB)   | https://github.com/iStandaarden/iWlz-adresboek                          |

