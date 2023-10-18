![header](../imagesrc/ZinBanner.png "template_header")

# RFC0004 - Verifiable Credentials

<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**

>```nog invullen```

**Beoogde situatie**

Dit document beschrijft de wijze waarop Verifiable Credentials worden gebruikt voor ondertekenings- of validatiebewerkingen  binnen het iWlz-netwerkmodel.

Verifiable Credentials (ook wel bewijs van eigendom of bewijs van identiteit) zijn digitale documenten waarmee een onderwerp (zoals een organisatie) bepaalde claims kan maken over zichzelf of over een ander onderwerp. Deze claims kunnen worden geverifieerd door een derde partij, een andere deelnemer aan het iWlz-netwerk, die de authenticiteit van de claims kan bevestigen. Deze credentials kunnen bijvoorbeeld worden gebruikt voor identiteitsverificatie, toegangscontrole, of het verstrekken van toegang tot bepaalde diensten of informatie. Verifiable Credentials kunnen worden opgeslagen en gedeeld via een Decentralized Identifier (DID) en worden gebruikt in combinatie JSON Web Tokens (JWT's) om authentieke gegevensuitwisseling te garanderen.

Deelnemers aan het iWlz-netwerkmodel kunnen hun identiteit en andere beweringen verifiëren door middel van deze verifiëerbare bewijzen. Hierdoor kan een veilige en betrouwbare uitwisseling van gegevens plaatsvinden tussen de deelnemers van het netwerk.

Zo kan een deelnemer verklaringen geven over andere deelnemers. Bijvoorbeeld: “deelnemer A verklaart dat deelnemer B een zorgaanbieder is” of “deelnemer C verklaart dat deelnemer B toegang heeft tot resource X” of “deelnemer D verklaart dat deelnemer B bedrijfsnaam Y heeft“. Deze verklaringen moeten zo zijn gestructureerd dat ze verifieerbaar en doorzoekbaar zijn. 

Een valideerbare en interpreteerbare verklaring met daarin 1 of meerdere claims wordt in de context van het iWlz-netwerkmodel een ‘attest’ genoemd. Voor het aanmaken, uitgeven, presenteren en controleren van attesten wordt in het iWlz-netwerkmodel de open internationale Verifiable Credentials van W3C gebruikt. Deze RFC specificeert op welke wijze deze standaard dient te worden toegepast.

<font size="4">**Status RFC**</font>

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/5) om de actuele status van deze RFC te bekijken.

---
**Inhoudsopgave**
- [RFC0004 - Verifiable Credentials](#rfc0004---verifiable-credentials)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
- [2. Terminologie](#2-terminologie)
- [3. W3C Verifiable Credentials](#3-w3c-verifiable-credentials)
  - [3.1 JSON-LD-context](#31-json-ld-context)
  - [3.2 Ondersteunde bewijzen](#32-ondersteunde-bewijzen)
    - [3.2.1 JSON Web Signature 2020](#321-json-web-signature-2020)
  - [3.3 Content-type](#33-content-type)
  - [3.4 Updates](#34-updates)
  - [3.5 Identificatiegegevens](#35-identificatiegegevens)
  - [3.6 Actieve uitgever](#36-actieve-uitgever)
  - [3.7 VC-voorbeeld](#37-vc-voorbeeld)
- [4 Vereiste hoofdstukken voor verifiable credential-types in het iWlz-netwerkmodel](#4-vereiste-hoofdstukken-voor-verifiable-credential-types-in-het-iwlz-netwerkmodel)
  - [4.1 CredentialSubject](#41-credentialsubject)
  - [4.2 Uitgifte \& distributie](#42-uitgifte--distributie)
  - [4.3 Ondersteunde bewijzen](#43-ondersteunde-bewijzen)
  - [4.4 Vertrouwen](#44-vertrouwen)
  - [4.5 Revocation (herroeping)](#45-revocation-herroeping)
  - [4.5.1 Standaard-intrekkingsmechanisme (default revocation)](#451-standaard-intrekkingsmechanisme-default-revocation)
  - [4.6 Use cases](#46-use-cases)
  - [4.7 Privacyoverwegingen](#47-privacyoverwegingen)
  - [4.8 Services](#48-services)

---
# 1. Inleiding
>```nog invullen```


## 1.1. Uitgangspunten
>```nog invullen```

# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| :-------- | :-------- | 
| DID | Decentralized Identifiers (DIDs) ofwel Gedecentraliseerde Identificatoren, zijn unieke identificatiemiddelen voor digitale identiteiten. Ze zijn ontworpen om zelfsoevereiniteit te bevorderen, waarbij individuen controle hebben over hun digitale identiteiten zonder afhankelijk te zijn van centrale autoriteiten. DIDs zijn gedecentraliseerd, veilig door cryptografie, interoperabel en persistent. De W3C-standaard Decentralized Identifiers maakt het verifiëren van  decentrale digitale identiteiten mogelijk. |
| VC-Houder | Een "Verifiable Credentials-houder" is een entiteit, meestal een individu, die in het bezit is van verifieerbare identiteitsbewijzen (Verifiable Credentials of VC's). Deze VC-houder kan VC's ontvangen, bewaren en presenteren als bewijs van bepaalde identiteits- of verificatiegegevens. Het belangrijkste kenmerk van een VC-houder is dat ze controle hebben over hun eigen digitale identiteitsinformatie en kunnen bepalen welke gegevens ze delen en met wie, terwijl ze tegelijkertijd de verifieerbaarheid van die gegevens behouden. <br><br> Een VC-houder kan bijvoorbeeld VC's ontvangen van verschillende uitgevende instanties, zoals overheidsinstanties, financiële instellingen of andere organisaties, en deze VC's opslaan in een digitaal portemonnee-achtig systeem. Wanneer ze toegang tot bepaalde services of informatie nodig hebben, kunnen ze de relevante VC's presenteren aan de dienstverlener of verificatieautoriteit als bewijs van hun identiteit of kwalificaties, zonder de eigenlijke gegevens vrij te geven. <br><br> Dit geeft individuen meer controle over hun digitale identiteit en biedt mogelijkheden voor een veiliger en privacyvriendelijker manier van gegevensverificatie in de digitale wereld. | 
| VC-Uitgever | Een "Verifiable Credentials-uitgever" is een entiteit die digitale verifieerbare referenties of certificaten genereert en uitgeeft. Deze digitale referenties, vaak aangeduid als "Verifiable Credentials," bevatten informatie over een individu, zoals identiteitsgegevens, academische prestaties, professionele certificaten, of andere attributen. Het belangrijkste kenmerk van deze referenties is dat ze digitaal ondertekend zijn en cryptografisch beveiligd, waardoor ze veilig en verifieerbaar zijn. <br><br> De uitgegeven Verifiable Credentials worden vaak opgeslagen in digitale portefeuilles die eigendom zijn van individuen, en ze kunnen worden gepresenteerd aan verificerende partijen, zoals werkgevers of dienstverleners, om de authenticiteit van de verstrekte informatie te bevestigen. Deze aanpak heeft toepassingen op gebieden zoals identiteitsverificatie, onderwijs, gezondheidszorg, en meer, en maakt gebruik van technologieën zoals blockchain en gedecentraliseerde identiteitssystemen om de veiligheid en betrouwbaarheid te waarborgen. |
| ~~Bewijs~~ | ~~Proof, bewijs dat een VC geldig is met behulp van cryptografie~~ | 
| VC-Bewijs | Een Verifiable Credential (VC)-bewijs is een cryptografische methode die wordt gebruikt om de authenticiteit en integriteit van een verifieerbaar credential aan te tonen. VC's zijn een onderdeel van het opkomende veld van gedecentraliseerde identiteitssystemen en bieden een manier voor individuen om certificeringen op een veilige en private manier in digitale vorm te delen met anderen. <br><br> Het W3C (World Wide Web Consortium) heeft standaarden en specificaties ontwikkeld voor VC's en hun bewijzen, zoals het Verifiable Credentials Data Model en de Decentralized Identifiers (DIDs)-specificatie. Deze standaarden dragen bij aan interoperabiliteit en beveiliging in gedecentraliseerde identiteitssystemen. | 
| ~~VC~~ | ~~Attest volgens de standaard Verifiable Credentials. Een attest is een valideerbare en  interpreteerbare verklaring met daarin één of meerdere claims. In de context van het iWlz-netwerkmodel worden attesten gebruikt om bepaalde claims te maken over een onderwerp, zoals een organisatie.~~ | 
| VC | Verifiable Credentials zijn digitale attestaties die informatie bevatten over claims met betrekking tot een individu, zoals identiteit, kwalificaties, lidmaatschappen, enz. Deze credentials worden doorgorgaans uitgegeven door vertrouwde entiteiten, zoals overheden, onderwijsinstellingen, werkgevers, en andere betrouwbare bronnen. <br><br> VC's zijn gestructureerd en gecodeerd om gegevensintegriteit en verifieerbaarheid te waarborgen. Ze worden digitaal ondertekend door de uitgevende instantie en kunnen worden geverifieerd door derden. <br><br> VC's spelen een cruciale rol in het opkomende veld van gedecentraliseerde identiteit en zelfsoevereine identiteit, waar individuen meer controle hebben over hun digitale identiteiten en persoonlijke gegevens. Ze bieden een basis voor het opbouwen van vertrouwen en het vergemakkelijken van veilige gegevensuitwisseling in een breed scala van toepassingen. <br><br> In de context van het iWlz-netwerkmodel worden attesten gebruikt om bepaalde claims te maken over een onderwerp, zoals een organisatie. | 
| ~~VP~~ | ~~Verifiable Presentation, een presentatie van een of meerdere VC’s~~ | 
| VP | Een Verifiable Presentation is een manier om één of meerdere Verifiable Credentials te presenteren in een gestructureerd formaat. Het is een bundeling van VC's en eventueel andere relevante informatie die wordt aangeboden aan een verzoekende partij (bijvoorbeeld een dienstverlener, een werkgever, of een andere entiteit). <br><br> Een VP bevat informatie over de presentator (de persoon of entiteit die de referenties deelt) en wordt digitaal ondertekend. Het bevat ook bewijs dat de presentator controle heeft over de verifieerbare referenties. | 

# 3. W3C Verifiable Credentials
Om verschillende claims en attesten te ondersteunen, gebruikt het iWlz-netwerkmodel het Verifiable Credential (VC)-formaat zoals beschreven in de W3C Verifiable Credential-specificatie. Ieder VC- en bewijs-type dat wordt gebruikt in het iWlz-netwerkmodel moet voldoen aan de W3C-specificatie. Als de W3C-specificatie optionele velden biedt, moet worden gespecificeerd of en hoe deze velden moeten worden gebruikt. Alle VC's **MOETEN DID's** gebruiken zoals gespecificeerd in RFC015 Identiteit om naar de uitgever en het subject van het attest te verwijzen.

## 3.1 JSON-LD-context
Verifiable Credentials worden meestal weergegeven in JSON-LD-indeling. Elk JSON-LD-document vereist een of meer contextdefinities. Elk VC-type en elk bewijs-type dat wordt gebruikt in het iWlz-netwerkmodel MOET worden gespecificeerd in een publiek beschikbare JSON-LD-context-definitie. Netwerkpunten MOETEN deze context en de [W3C Verifiable Credential-context](https://www.w3.org/2018/credentials/v1) ondersteunen. Een netwerkpunt KAN aanvullende contexten ondersteunen.

## 3.2 Ondersteunde bewijzen
Om de authenticiteit en integriteit van de VC te waarborgen, MOET een VC-document een ingesloten bewijs bevatten in een bewijssectie zoals beschreven in sectie 2.2.1 van [Verifiable Credential Data Integrity Specification](https://w3c.github.io/vc-data-integrity/#signatures). De volgende bewijstypen moeten worden ondersteund door een netwerkpunt in het iWlz-netwerkmodel:

### 3.2.1 JSON Web Signature 2020
Deze handtekeningsuite wordt gespecificeerd door [JSON Web Signature 2020](https://w3c-ccg.github.io/lds-jws2020). Het gebruikt een vrijstaande `JWS` voor het presenteren van de handtekening in het `jws`-gedeelte van het bewijs. [RFC7797](https://tools.ietf.org/html/rfc7797) beschrijft hoe een 'detached' `JWS` werkt. Het hash-algoritme MOET van het type `ES256` zijn.
Het bewijs MOET een `verificationMethod` hebben die een assertMethod-ID bevat van een resolvable DID-document van een openbare sleutel van het type `JSONWebKey2020`.

```
{
  "type": "JsonWebSignature2020",
  "proofPurpose": "assertionMethod",
  "verificationMethod": "did:<<iwlz>>:EgFjg8zqN6eN3oiKtSvmUucao4VF18m2Q9fftAeANTBd#twlH6rB8ArZrknmBRWLXhao3FutZtvOm0hnNhcruenI",
  "created": "2021-03-09T11:44:56.382202+01:00"
  "jws": "eyJhbGciOiJFUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ZXlKaGJHY2lPaUpGVXpJMU5pSjkuVHVqZndMVVJwcnUzbjhuZklhODB1M1M0LW9LcWY0WUs5S2hoZEktUkZPSzdlbnZJTTdLN1E5SzBSeHhRSzNIVWJPTUJyLVlZX1g0eW1YR0pXOHF4UkEuN0F4a3lZekNXTElPZ2Q5TlpnR3p2aHd2UzZZQ3FpRTRPX3FwWGVOSEN6X091S1c0TmJsWkJueTBkZVhXT0lXZ3JNczF4OTZlNmtnaGZGYTRNd0J3TlE="
}
```

## 3.3 Content-type
Alle VC's **MOETEN** een content-type hebben dat gelijk is aan `application/vc+json`. VC's **MOGEN NIET** meer dan één extra type specificeren naast `VerifiableCredential`.

## 3.4 Updates
VC's kunnen niet worden bijgewerkt, een update kan worden uitgevoerd door de huidige in te trekken en een nieuwe VC uit te geven.

## 3.5 Identificatiegegevens
VC-identfiiers **MOETEN** worden geconstrueerd als DID#id waarbij `id` uniek is voor de betreffende uitgever.

## 3.6 Actieve uitgever
Een VC MOET een actieve uitgever hebben op het moment van gebruik. Gebruik omvat het gebruik van de VC om een VP te genereren of deze mee te sturen in een OAuth-flow. Als de uitgever op het moment van gebruik is gedeactiveerd, MOET de VC als ongeldig worden beschouwd.

## 3.7 VC-voorbeeld
Hieronder ziet u een informatief voorbeeld van een verifiable credential.

```
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "type": [
    "VecozoOrganizationCredential",
    "VerifiableCredential"
  ],
  "id": "did:<<iwlz>>:abc#6f91673b-afa9-4d26-9e0f-00d989943275",
  "issuanceDate": "2021-03-15T16:34:17.687862+01:00",
  "issuer": "did:<<iwlz>>:abc",
  "credentialSubject": {
    "id": "did:<<iwlz>>:xyz",
    "organization": {
      "city": "Enschede",
      "name": "Menzis",
      "organization-type": "zorgkantoor"
    }
  },
  "proof": {
    "type": "JsonWebSignature2020",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:<<iwlz>>:abc#h22vbXHX7-lRd1qAJnU63liaehb9sAoBS7RavhvfgR8",
    "created": "2021-03-15T16:34:17.687862+01:00",
    "jws": "eyJhbGciOiJFUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..hKcboC8m6YnZPi6ReJAYs0J0Ztn5nxcx2EavoXdtrkWxmE1JZmImW89_8IIgjvfI8XtGeDlEnGywAuY2u7y9Bw"
  }
}
```

# 4 Vereiste hoofdstukken voor verifiable credential-types in het iWlz-netwerkmodel
Alle volgende hoofdstukken **MOETEN** aanwezig zijn in de specificatie van een VC die wordt gebruik binnen de context van het iWlz-netwerkmodel.

## 4.1 CredentialSubject
De VC-specificatie **MOET** de inhoud van het JSON-veld `credentialSubject` specificeren. Het **MOET** specificeren welke delen van het `credentialSubject` verplicht of optioneel zijn, en het formaat.

## 4.2 Uitgifte & distributie
Een VC-specificatie MOET specificeren hoe een VV wordt uitgegeven en of er vereisten zijn voor de uitgever. Het MOET alle vereisten voor de houder specificeren. Het MOET specificeren of VC's of andere inloggegevens vereist zijn om de VC te verkrijgen. Het MOET het content-type in het `type` specificeren.

## 4.3 Ondersteunde bewijzen
Een VC-specificatie **MOET** specificeren welke bewijstypes acceptabel zijn of dat er een beperking is voor bepaalde bewijstypes. Dit betekent ook dat de specificaties MOETEN worden bijgewerkt wanneer er nieuwe bewijstypes beschikbaar zijn.

## 4.4 Vertrouwen
Een VC-specificatie **MOET** de vereisten opsommen voor wanneer een VC te vertrouwen is. Het zou bijvoorbeeld kunnen vereisen dat elk netwerkpunt in het iWlz-netwerkmodel standaard een bepaalde uitgever vertrouwt.

## 4.5 Revocation (herroeping)
Een VC-specificatie **MOET** specificeren hoe een VC kan worden ingetrokken door de uitgever, of het **MOET** een vervalduur specificeren. Het **KAN** verwijzen naar het hieronder vermelde standaard-intrekkingsmechanisme.

## 4.5.1 Standaard-intrekkingsmechanisme (default revocation)
VC's die zijn uitgegeven door een issuer met een DID kunnen worden ingetrokken door de volgende transactie op het netwerk te publiceren:

```
{
  "issuer": "did:<<iwlz>>:t1DVVAs5fmNba8fdKoTSQNtiGcH49vicrkjZW2KRqpv",
  "subject": "did:<<iwlz>>:t1DVVAs5fmNba8fdKoTSQNtiGcH49vicrkjZW2KRqpv#6f91673b-afa9-4d26-9e0f-00d989943275",
  "date": "2021-03-15T16:34:47.422436+01:00",
  "proof": {
    "type": "JsonWebSignature2020",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:<<iwlz>>:t1DVVAs5fmNba8fdKoTSQNtiGcH49vicrkjZW2KRqpv#h22vbXHX7-lRd1qAJnU63liaehb9sAoBS7RavhvfgR8",
    "created": "2021-03-15T16:34:47.422436+01:00",
    "jws": "eyJhbGciOiJFUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..Rc7iK7wXabMx24ZNAFJIwxqpYGCdye0EmdOYwu5CO54pwEPNIQt-9qIvqEZ7ZBFcFUdhnNCvYkR8IDtFAM18Rw"
  }
}
```
Een dergelijke intrekkingstransactie heeft de volgende vereisten:

- De uitgever **MOET** overeenkomen met de DID als het uitgeversveld van de VC.
- Het onderwerp **MOET** overeenkomen met het id-veld van de VC.
- Een reden **KAN** worden gevuld met een intrekkingsreden.
- De datum **MOET** de datum in RFC3339-indeling bevatten. Vanaf dit moment wordt de VC ingetrokken.
- Het bewijs **MOET** een `JsonWebSignature2020`-bewijs zijn.
- De transactie **MOET** worden gepubliceerd op het gebruikte trust-netwerk. Het inhoudstype is `application/vc+json;type=revocation`.
- De handtekening **MOET** worden berekend als JsonWebSignature2020 zoals vermeld in §1.2.1.

## 4.6 Use cases
Een VC-specificatie **MOET** specificeren waar de VC **MOET** worden gebruikt: als vereiste voor andere VC's, in de OAuth-flow volgens RFC007 of een andere use case. Als een VC kan worden gebruikt in een verifieerbare presentatie (VP), **MOET** de VC-specificatie aangeven of er extra VC's in de VP kunnen worden verwacht. De VC-specificatie **MOET** de use case goed genoeg beschrijven zodat elke implementatie passende maatregelen kan nemen voor het optimaliseren van query's/controles, zoals het indexeren van bepaalde velden.

## 4.7 Privacyoverwegingen
Een VC-specificatie **MOET** specificeren of een VC op de een of andere manier **MOET** worden gepubliceerd. De VC-specificatie **MOET** specificeren of het persoonlijke informatie bevat zoals geïdentificeerd door de AVG of andere (lokale) wetgeving. De VC-specificatie **MOET** specificeren wie de VC MAG ontvangen en/of opslaan.

## 4.8 Services
Een VC-specificatie **MOET** specificeren welke services (zoals bijvoorbeeld het Nuts-netwerk) vereist zijn om de VC uit te geven en/of te verkrijgen. De VC-specificatie **MOET** het het protocol van de vereiste services specificeren.
