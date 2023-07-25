![header](../imagesrc/ZinBanner.png "template_header")

# RFC0006 - AutorisatieCredential

<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**

```nog invullen```

**Beoogde situatie**

Dit document beschrijft de wijze en AutorisatieCredential. Een AutorisatieCredential is een verifiable credential die gebruikt wordt om toegang te geven tot gegevens in het iWlz-netwerkmodel. Het beschrijft welke gegevens een deelnemer mag opvragen en geeft hierin aan welke dienst, bronhouder en cliënt betrokken zijn. Een zorgaanbieder heeft dus voor één cliënt per dienst per bronhouder een AutorisatieCredential nodig om gegevens op te vragen (bijvoorbeeld een bemiddeling van cliënt A bij zorgkantoor B).

De AutorisatieCredential is gebaseerd op de internationale standaard Verifiable Credentials en heeft de vorm van een attest (zie ook RFC004). De AutorisatieCredential wordt gebruikt samen met de inhoud van het afgesproken access policy (zie RFC00Z Access Policy) om toegang te verlenen tot brongegevens in een register.

<font size="4">**Status RFC**</font>

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/7) om de actuele status van deze RFC te bekijken.

---
**Inhoudsopgave**
- [RFC0006 - AutorisatieCredential](#rfc0006---autorisatiecredential)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
  - [1.2 Relatie andere RFC](#12-relatie-andere-rfc)
- [2. Terminologie](#2-terminologie)
- [3. Credential data model AutorisatieCredential](#3-credential-data-model-autorisatiecredential)
  - [3.1 Credential velden](#31-credential-velden)
  - [3.2 CredentialSubject](#32-credentialsubject)
    - [3.2.1 Verplichte velden](#321-verplichte-velden)
    - [3.2.2 Scoping](#322-scoping)
    - [3.2.3 Wettelijke grondslag (legalBase)](#323-wettelijke-grondslag-legalbase)
    - [3.2.4 Resources](#324-resources)
    - [3.2.5 LocalParameters](#325-localparameters)
- [4. Toegangsbeheer](#4-toegangsbeheer)
  - [4.1 Access policy](#41-access-policy)
  - [4.2 Access token request](#42-access-token-request)
  - [4.3 Runtime handhaving toegangsbeleid](#43-runtime-handhaving-toegangsbeleid)
- [5. Uitgifte \& distributie](#5-uitgifte--distributie)
- [6. Ondersteunde bewijzen](#6-ondersteunde-bewijzen)
- [7. Vertrouwen](#7-vertrouwen)
- [8. Herroeping](#8-herroeping)
- [9. Use cases](#9-use-cases)
- [10. Privacyoverwegingen](#10-privacyoverwegingen)
- [11. Services](#11-services)
- [12. Voorbeelden](#12-voorbeelden)

---
# 1. Inleiding
In het iWlz-netwerkmodel worden persoonlijke gegevens gedeeld tussen verschillende deelnemers. Dit is alleen toegestaan als er een geldige juridische grondslag is voor de gegevensverwerking, zoals een wettelijke plicht (zie ook iWlz afsprakenstelsel: Randvoorwaarden & ontwerpkeuzes). Het is belangrijk om de gegevensuitwisseling te beperken tot het delen van alleen de gegevens die nodig zijn voor de specifieke situatie en om de privé-levenssfeer van de cliënt te beschermen. Ook het feit dat er twee deelnemers gegevens over een cliënt uitwisselen is privacygevoelige informatie en dient alleen bij deze afnemer en bronhouder bekend te zijn.

De redenen voor het delen van gegevens kunnen variëren, zoals het inzien van indicatiegegevens door een zorgkantoor of het inzien van bemiddelingsgegevens door een zorgaanbieder.

Deze RFC bouwt voort op [RFC004 Verifiable Credentials](RFC0004%20-%20Verifiable%20Credentials.md).


## 1.1. Uitgangspunten
>```uitgangspunten```

## 1.2 Relatie andere RFC
Deze RFC heeft een relatie met de volgende RFC(s)
>```Relaties```


# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| :-------- | :-------- | 
| Access policy | Access policy is een set van regels die bepalen wie toegang heeft tot welke gegevens en onder welke omstandigheden. Deze regels beschrijven onder andere wie verantwoordelijk is voor de gegevens, welke gegevens er gedeeld mogen worden en onder welke voorwaarden. Access policy's zijn vaak onderdeel van een beveiligingsstrategie van een bronhouder en zijn bedoeld om de privacy en veiligheid van gegevens te waarborgen. In het iWlz-netwerkmodel wordt gebruikgemaakt van een access policy (RFC00Z) om te bepalen wie toegang heeft tot welke resources en gegevens in het netwerk. |
| DID | Decentralized Identifiers. De W3C-standaard Decentralized Identifiers maakt het verifiëren van  decentrale digitale identiteiten mogelijk. Deze decentrale identificatoren kunnen gebruikt worden bij self-sovereign identity. | 
| VC | Attest volgens de standaard Verifiable Credentials. Een attest is een valideerbare en  interpreteerbare verklaring met daarin één of meerdere claims. In de context van het iWlz-netwerkmodel worden attesten gebruikt om bepaalde claims te maken over een onderwerp, zoals een organisatie.   |

# 3. Credential data model AutorisatieCredential
Dit hoofdstuk specificeert het AutorisatieCredential in het iWlz-netwerkmodel wordt opgebouwd.

## 3.1 Credential velden
Het veld `issuer` van de credential MOET de DID van de bronhouder bevatten. Het veld `type` MOET zowel de waarden `VerifiableCredential` als `<<iwlz>>AutorisatieCredential` bevatten. In de access policy dient te worden gespecificeerd wat de maximale geldigheid van de AutorisatieCredential is.

## 3.2 CredentialSubject
Het `credentialSubject`-veld dient als volgt te worden opgebouwd:

```
{
  "id": "did:<<iwlz>>:SjkuVHVqZndMVVJwcnUzbjhuZklhODB1M1M0LW9LcWY0WUs5S2",
  "legalBase": {
    "consentType": "implicit"
  },
  "localParameters": {...},
  "resources": [
    {
      "path": "/wlzindicaties/wlzindicatiespersoon",
      "operations": ["query"],
      "userContext": false
    }
  ],
  "purposeOfUse": "iwlz-raadplegen",
  "subject": "urn:oid:2.16.840.1.113883.2.4.6.3:123456780"
}
```

In bovenstaand voorbeeld worden op basis van de wettelijke grondslag “wettelijke taak” lees-rechten gegeven op de indicatiegegevens van een persoon met bsn 123456780.

```
{
  "id": "did:<<iwlz>>:SjkuVHVqZndMVVJwcnUzbjhuZklhODB1M1M0LW9LcWY0WUs5S2",
  "legalBase": {
    "consentType": "explicit",
    "evidence": {
      "path": "pdf/f2aeec97-fc0d-42bf-8ca7-0548192d4231",
      "type": "application/pdf"
    }
  },
  "localParameters": {...},
  "resources": [
    {
      "path": "/contactgegevens",
      "operations": ["query"],
      "userContext": false
    }
  ],
  "purposeOfUse": "iwlz-raadplegen-contactgegevens",
  "subject": "urn:oid:2.16.840.1.113883.2.4.6.3:123456780"
}
```

In bovenstaand voorbeeld worden op basis van de wettelijke grondslag “expliciete toestemming” lees-rechten gegeven op de contactpersoongegevens van een persoon met bsn 123456780.

### 3.2.1 Verplichte velden
De velden `id`, `legalBase` en `purposeOfUse` **MOETEN** worden ingevuld. Binnen het `legalBase`-object **MOET** `consentType` `implicit` of `explicit` zijn. Indien `explicit` (dit is het geval wanneer een autorisatie-record is gebaseerd op een expliciete toestemming van de cliënt),  **MOET** het veld `subject` worden ingevuld.

### 3.2.2 Scoping
Het veld `id` MOET de DID van de afnemer bevatten. Het veld `subject` **KAN** de patiëntidentificatie bevatten. In het bovenstaande voorbeeld wordt de oid gebruikt voor het Nederlandse burgerservicenummer (BSN). Het veld `purposeOfUse` verwijst naar een toegangsbeleid. In het iWlz-netwerkmodel zal een accesspolicy dit toegangsbeleid MOETEN specificeren in de vorm van GraphQL-logica die beschrijft waartoe toegang kan worden verkregen met de AutorizationCredential. De `resources`-array uit het AutorisatieCredential bouwt voort op het afgesproken toegangsbeleid. De `resources`-array definieert specifieke bronnen waartoe naast het toegangsbeleid toegang kan worden verkregen. Als er geen `subject` wordt gegeven, **MOET** het AutorisatieCredential `resources` bevatten die verwijzen naar individuele bronnen. Zonder specificatie van het `subject` **MAG** de inhoud van die individuele bronnen **GEEN** persoonlijke informatie bevatten. Wanneer een AutorisatieCredential geen subject en geen `resources` bevat KAN een afnemer een access token aanvragen met alleen de `purposeOfUse` in de JWT-grant.

### 3.2.3 Wettelijke grondslag (legalBase)
De toestemming van de patiënt kan impliciet of expliciet zijn. Wanneer het wordt geïmpliceerd (bijvoorbeeld wanneer gebruik wordt gemaakt van de wettelijke grondslag “wettelijke taak“,) moet dit worden weerspiegeld door de `purposeOfUse`. Per dienst die in het iWlz-netwerkmodel **MOET** daarom worden beschreven of er sprake is van expliciete of impliciete toestemming. Als `legalBase.evidence` gevuld is, **MOET** het een waarde bevatten voor de `path`- en `type`-velden. Het `path` is een relatief pad naar het servicedata-endpoint en het `type` bevat het mediatype zoals gespecificeerd door [RFC6838](https://datatracker.ietf.org/doc/html/rfc6838). De resources die het bewijs representeert **MOET** toegankelijk zijn met een toegangstoken dat is gemaakt met de bijbehorende AutorisatieCredential.

### 3.2.4 Resources
Het `resources`-object KAN worden gebruikt om de toegang uit te breiden. De basistoegang wordt geleverd door het toegangsbeleid (`purposeOfUse`) zoals gedefinieerd door in het access policy. Als er resources worden toegevoegd, bouwen deze voort op het afgesproken toegangsbeleid. Alle referenties in de `resources`-lijst bevatten een pad. Het padveld bevat het relatieve pad naar de betreffende resource. Het `operations`-veld bevat een lijst met toegestane bewerkingen op deze resource. De geldige opties komen overeen met de GrapHQL operatietypes: `query`, `mutation` en `subscription`. Het veld `userContext` definieert of toegang tot de resource gebruikerscontext vereist. Indien `true`, **MOET** er een authenticatietoken aanwezig zijn in de OAuth-flow.

### 3.2.5 LocalParameters
Met het object `localParameters` kan een uitgever aanvullende parameters aan de AutorisatieCredential toevoegen. Deze parameters kunnen helpen bij het bepalen van de toegang tijdens runtime. De inhoud van `localParameters` is een custom JSON-object. Aangezien de inhoud niet gespecificeerd is, moet het een aantal regels volgen:

- De parameters **MOGEN GEEN** invloed hebben op de actor (CredentialSubject.id)van de AutorisatieCredential. De actor **MOET** de AutorisatieCredential kunnen gebruiken alsof de parameters er niet zijn.
- De parameters **MOGEN** het gedrag, de specificatie of functionaliteit van een afgesproken toegangsbeleid **NIET** wijzigen.
- Een toegangsbeleid **MAG GEEN** gebruik van de parameters vereisen.
- Parameters **MOGEN GEEN** persoonsgegevens bevatten.
- De parameters zijn alleen van waarde voor de uitgever. Dit zou impliceren dat parameters alleen nuttig zijn in het geval dat de bronhouder de uitgever is.

Voorbeeld:
```
{
  "language": "NL",
  "internalIDs": ["1987gskljh42989hkpjh"]
}
```

# 4. Toegangsbeheer

## 4.1 Access policy
Een bronhouder gebruikt de AutorisatieCredential om de toegangsrechten van een afnemer te controleren. De regels voor het bepalen van toegang zijn een combinatie van een dienst-specifiek toegangsbeleid en eventuele aanvullende informatie uit de AutorisatieCredential. Identificatie en authenticatie vallen onder RFC007 OAuth-flow. Het toegangsbeleid vermeldt de bewerkingen en resourcetypen waartoe toegang kan worden verkregen. Zie ook RFC007 §7. Een toegangsbeleid **KAN** ook bepaalde parameters vereisen. Als er bijvoorbeeld een query-actie wordt uitgevoerd op een GraphQL-endpoint, kan het toegangsbeleid een regel hebben die een queryparameter vereist die het `subject`-veld (zijnde een bsn) van de AutorisatieCredential gebruikt. Alle beperkingen en beleidsregels **MOETEN** paden gebruiken die relatief zijn ten opzichte van het endpoint voor de gegeven service. [RFC0003](/RFC/RFC0003%20-%20Adresboek.md) Adresboek iWlz-netwerkmodel heeft betrekking op de registratie van services. Als er `resources` aanwezig zijn in de AutorisatieCredential, kan de bronhouder de operation en het relatieve pad van het request vergelijken met de `resources` die aanwezig zijn in de AutorisatieCredential.

## 4.2 Access token request
De volgende validaties moeten worden uitgevoerd door de autorisatieserver tijdens een verzoek om een access token. Deze zijn een aanvulling op degene die worden vermeld in §5.2.1.7 van RFC007.

- De issuer van de AutorisatieCredential is gelijk aan het `sub`-veld van de JWT in het access token request.
- De [credentialSubject.id](http://credentialsubject.id/) van de AutorisatieCredential is gelijk aan het `iss`-veld van de JWT in het access token request.

Een AutorisatieCredential is niet nodig wanneer de `requester` en de `authorizer` dezelfde zijn.

## 4.3 Runtime handhaving toegangsbeleid
Hoewel AutorisatieCredentials deel uitmaken van de OAuth-flow van RFC007, wordt de daadwerkelijke toegangscontrole uitgevoerd op het moment van een binnenkomend request. Dit betekent dat de resource server het toegangsbeleid moet toepassen op het binnenkomende request. Dit model is te vergelijken met een [Attribute Based Access Control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control) model. Het toegangsbeleid wordt toegevoegd aan het Policy Administration Point (PAP, zie [XACML](https://en.wikipedia.org/wiki/XACML)), het applicatiecomponent Trust Agent fungeert als Policy Information Point (PIP). De resource server is het Policy Enforcement Point (PEP). Het is aan de leverancier om het Policy Decision Point (PDP) te implementeren.

# 5. Uitgifte & distributie
Een AutorisatieCredential is een privé document dat gebruikt wordt voor autorisatie van toegang tot gegevens binnen het iWlz-netwerkmodel. Het wordt gepubliceerd via een trust-netwerk en alleen de bronhouder en afnemer hebben toegang tot de inhoud van de transactie. Elke DID kan een AutorisatieCredential uitgeven en voegt ook geen vereisten toe aan andere Verifiable Credentials die in het iWlz-netwerkmodel worden gebruikt.

# 6. Ondersteunde bewijzen
Alleen de bewijzen (profs) genoemd in [RFC004](/RFC/RFC0004%20-%20Verifiable%20Credentials.md) worden ondersteund.

# 7. Vertrouwen
De AutorisatieCredential heeft alleen invloed op de afnemer en bronhouder. Het **MOET** automatisch worden vertrouwd.

# 8. Herroeping
De AutorisatieCredential volgt de intrekkingsregels zoals vermeld in [RFC004](/RFC/RFC0004%20-%20Verifiable%20Credentials.md).

# 9. Use cases
De AutorisatieCredential MOET worden gebruikt in de OAuth-flow, zoals vermeld in RFC007.

# 10. Privacyoverwegingen
De AutorisatieCredential zal in veel gevallen een burgerservicenummer bevatten en **MOET** daarom privé zijn voor de afnemer en bronhouder. Privétransacties kunnen bijvoorbeeld met behulp van gRPC worden gedistribueerd.

# 11. Services
Een AutorisatieCredential is altijd gericht op een specifieke dienst (bijv. raadplegen of notificeren).

# 12. Voorbeelden
Voorbeeld van een AutorisatieCredential met brede raadpleeg-rechten voor één cliënt:

```
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "id": "did:<<iwlz>>:custodian#90382475609238467",
  "type": ["VerifiableCredential", "<<iwlz>AutorisatieCredential"],
  "issuer": "did:<<iwlz>>:EgFjg8zqN6eN3oiKtSvmUucao4VF18m2Q9fftAeANTBd",
  "issuanceDate": "2010-01-01T19:73:24Z",
  "expirationDate": "2010-02-01T19:73:24Z",
  "credentialSubject": {
    "id": "did:<<iwlz>>:SjkuVHVqZndMVVJwcnUzbjhuZklhODB1M1M0LW9LcWY0WUs5S2",
    "purposeOfUse": "raadplegen",
    "subject": "urn:oid:2.16.840.1.113883.2.4.6.3:123456780"
  },
  "proof": {...}
}
```
Voorbeeld van een AutorisatieCredential met rechten op een specifieke set resources (in dit geval) :

```
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "id": "did:<<iwlz>>:custodian#90382475609238467",
  "type": ["VerifiableCredential", "<<iwlz>>AutorisatieCredential"],
  "issuer": "did:<<iwlz>>:EgFjg8zqN6eN3oiKtSvmUucao4VF18m2Q9fftAeANTBd",
  "issuanceDate": "2010-01-01T19:73:24Z",
  "expirationDate": "2010-02-01T19:73:24Z",
  "credentialSubject": {
    "id": "did:<<iwlz>>:SjkuVHVqZndMVVJwcnUzbjhuZklhODB1M1M0LW9LcWY0WUs5S2",
    "localParameters": {
        "internalID": "skljcnydtlikjdrvy34bn8ts675druytk"    
    },
    "resources": [
      {
        "path": "/wlzindicaties/wlzindicatiespersoon",
        "operations": ["query"],
        "userContext": false
      }
    ],
    "purposeOfUse": "raadplegen",
    "subject": "urn:oid:2.16.840.1.113883.2.4.6.3:123456780"
  },
  "proof": {...}
}
```
