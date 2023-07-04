# Adresboek

**SAMENVATTING**

Dit document beschrijft de wijze waarop de adresseringsvoorziening binnen het iWlz-netwerkmodel wordt geïmplementeerd. Deze implementatie maakt gebruikt van RFC0002 Decentralized Identifiers iWlz-netwerkmodel.

---
**Inhoudsopgave**
- [Adresboek](#adresboek)
- [1. Inleiding](#1-inleiding)
  - [1.1 Uitgangspunten](#11-uitgangspunten)
- [2. Terminologie](#2-terminologie)
- [4. Services](#4-services)
  - [4.1 Service referenties](#41-service-referenties)
  - [4.2 Contactgegevens](#42-contactgegevens)
- [5 Foutmeldingen](#5-foutmeldingen)

---
# 1. Inleiding
>```Inleiding```
<br>

## 1.1 Uitgangspunten
>```uitgangspunten```

# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| -------- | :-------- | 
| DID-document   | Onderdeel van de DID-standaard die wordt gebruikt voor het publiceren van eigenschappen van een deelnemer of dienstverlener, in dit geval informatie over services en endpoints   | 
| Organisatie   | Een deelnemer in het iWlz-netwerkmodel die gegevens uitwisselt met andere deelnemers. Een organisatie kan een andere partij controle geven over haar DID-document wanneer zij gegevensuitwisseling wil delegeren aan die andere partij (bijv. een softwareleverancier of een SaaS-aanbieder)   | 
| Endpoint   | Een URI of URL die wordt gepubliceerd door een deelnemer en die door andere deelnemers kan worden gebruikt om gebruik te maken van een service   | 
| Service   | Iedere deelnemer biedt één of meerdere diensten  aan andere deelnemers in het iWlz-netwerkmodel aan. Voorbeelden van diensten zijn: abonneren, notificeren, autoriseren, raadplegen. Een service is de technische implementatie van een dienst en bestaat uit één of meerdere endpoints   | 

# 4. Services
>```Peter van Toorn: Bij het adresbook is het de bedoeling dat je kunt zoeken op een bepaalde deelnemer en dat het zodoende mogelijk is om een dienst te lokaliseren. Nu gaat deze RfC over het toevoegen van de benodigde informatie aan het DID document. Voordat het uiteindelijk gaat leiden tot een adresboek is toch nog wel iets meer nodig?  Hangt ook af van de gebruikte DID methode en de functionaliteit van de VDR.```

In het iWlz-netwerkmodel worden services geregistreerd in het DID-document van de deelnemer. Dit gebeurt door de service toe te voegen aan het document. Dit zorgt voor een overzichtelijke en toegankelijke manier om de services van de deelnemer te raadplegen. De services die worden gepubliceerd worden gespecificeerd in de verschillende uitwisselprofielen. Dit kan een absoluut endpoint-URI zijn, een samengestelde service of een verwijzing naar een andere service.

>```Jorrit Spee: m.b.t. ondstaand stukje tekst wellicht een opsomming maken? Tekst is nu niet echt makkelijk leesbaar. Iets als: de kenmerken van de verschillende soorten services zijn:…```

Voor een absoluut endpoint-URI MOET het `serviceEndpoint` een tekenreeks zijn die een URL bevat. Voor een samengestelde service MOET het `serviceEndpoint` een JSON object literal bevatten met absolute endpoint-URL's en/of verwijzingen naar andere services. Zie §3.2 van did-core voor DID URL-syntaxis en RFC3986 voor generieke URL-standaarden.

Een DID-document MAG NIET meer dan één dienst van hetzelfde type bevatten.

De service-ID MOET worden samengesteld uit de DID gevolgd door een # en een id-tekenreeks. De service-ID MOET uniek zijn voor het DID-document.

De id-string wordt berekend als: `idstring = BASE-58(SHA-256(json-bytes-zonder-id))`

Hieronder vindt u een voorbeeld van een dienst geregistreerd door een deelnemer aan het iWlz-netwerkmodel die gebruik maakt van de endpoints van een SaaS-dienstverlener. De SaaS-dienstverlener definieert de daadwerkelijke URL’s:




```

{
  "@context": [ "https://www.w3.org/ns/did/v1" ],
  "id": "did:<<iwlz>>:123",
  "service": [
    {
      "id": "did:<<iwlz>>:123#IyvdTGF1Dsgwngfdg3SH6TpDv0Ta1aOEkw",
      "type": "oauth",
      "serviceEndpoint": "https://example.com/oauth"
    },
    {
      "id": "did:<<iwlz>>:123#_TKzHv2jFIF1Dsgwngfdg3SH6TpDv0Ta1aOEkw",
      "type": "abonneren",
      "serviceEndpoint": "https://example.com/abo"
    },
    {
      "id": "did:<<iwlz>>:123#_TKzHv2jFIF1Dsgwngfdg3SH6TpDv0Ta1aOEkw",
      "type": "notificeren",
      "serviceEndpoint": "https://example.com/notify"
    },
    {
      "id": "did:<<iwlz>>:123#_TKzHv2jFIF1Dsgwngfdg3SH6TpDv0Ta1aOEkw",
      "type": "raadplegen",
      "serviceEndpoint": "https://example.com/raadplegen"
    }
  ]
}

```

De deelnemer verwijst vervolgens naar de door de SaaS-dienstverlener geregistreerde services:

```
{
  "@context": [ "https://www.w3.org/ns/did/v1" ],
  "id": "did:<<iwlz>>:abc",
  "service": [
    {
      "id": "did:<<iwlz>>:abc#F1Dsgwngfdg3SH6TpDv0Ta1aOE",
      "type": "<<iwlz>>CompoundService",
      "serviceEndpoint": {
        "oauth": "did:<<iwlz>>:123?type=oauth",
        "abonneren": "did:<<iwlz>>:123?type=abonneren",
        "notificeren": "did:<<iwlz>>:123?type=notificeren",
        "raadplegen": "did:<<iwlz>>:123?type=raadplegen"
      }
    }
  ]
}

```

## 4.1 Service referenties
In het iWlz-netwerkmodel worden services gepubliceerd door deze toe te voegen aan het DID-document. Elke verwijzing naar een service dient volgens specifieke regels te worden opgebouwd.

Elk `serviceEndpoint` met een waarde die begint met did: is een verwijzing naar een andere service. Een referentie MOET de queryparameter type gebruiken om het type service waarnaar wordt verwezen op te geven. Het URI-pad MOET worden ingesteld op `/serviceEndpoint` om aan te geven dat het verwijst naar het `serviceEndpoint`-veld van de service. Andere zoekparameters, paden of fragmenten MOGEN NIET worden gebruikt. Bij het resolven van een service MOET een referentie-URI worden vervangen door de waarde uit het veld `serviceEndpoint` van de service waarnaar wordt verwezen.

Wanneer een eindgebruiker om bepaalde diensten vraagt, moeten de referenties worden omgezet in url’s. Het gebruik van referenties MAG GEEN oneindige lus creëren. Het resolven van een referentie MAG NIET dieper gaan dan 5 niveaus. Gegeven 5 services waarbij A uiteindelijk verwijst naar E via B, C en D (A -> B -> C -> D -> E). Gezien de maximale diepte van 5, MOET E een absolute endpoint-URI bevatten.

Een andere beperking is dat een verwijzing die afkomstig is van een samengestelde service NIET MOET worden omgezet naar een andere samengestelde service. Bij het resolven zou dan namelijk een JSON object literal met URI's worden genest in een JSON object literal met URI's, wat een ongeldige syntax is.

Een voorbeeld van een diep geneste structuur:

```
{
  "@context": [ "https://www.w3.org/ns/did/v1" ],
  "id": "did:<<iwlz>>:abc",
  "service": [
    {
      "id": "did:<<iwlz>>:abc#1",
      "type": "<<iwlz>>CompoundServiceRef",
      "serviceEndpoint": "did:<<iwlz>>:123/serviceEndpoint?type=<<iwlz>>CompoundService"
    },
    {
      "id": "did:<<iwlz>>:abc#2",
      "type": "<<iwlz>>CompoundService",
      "serviceEndpoint": {
        "oauth": "did:<<iwlz>>:123/serviceEndpoint?type=oauth"
      }
    },
    {
      "id": "did:<<iwlz>>:abc#3",
      "type": "oauth",
      "serviceEndpoint": "did:<<iwlz>>:123/serviceEndpoint?type=oauth_prod"
    },
    {
      "id": "did:<<iwlz>>:abc#4",
      "type": "oauth_prod",
      "serviceEndpoint": "https://auth.example.com"
    }
  ]
}

```

Het resolven van `did:<<iwlz>>:123/serviceEndpoint?type=<<iwlz>>CompoundServiceRef` zou resulteren in:

```
{
  "id": "did:<<iwlz>>:abc#1",
  "type": "<<iwlz>>CompoundServiceRef",
  "serviceEndpoint": {
    "oauth": "https://auth.example.com"
  }
}
```

## 4.2 Contactgegevens

>```DID-documenten kunnen een node-contact-info service bevatten die contactinformatie voor de operator van het netwerkpunt bevat zonder persoonlijke identificeerbare informatie, zoals bedrijfs-/eenheidsnaam, e-mailadres en telefoonnummer. De serviceEndpoint moet een JSON object literal zijn met een verplichte key email en optionele keys voor telephone, name, website.```

Een DID-document KAN een service van het type `node-contact-info` bevatten die informatie bevat die gebruikt kan worden om contact op te nemen met de operator van het netwerkpunt dat het DID-document beheert. De informatie MAG GEEN persoonlijk identificeerbare informatie (PII) bevatten, zoals persoonlijke namen, e-mailadressen of telefoonnummers. Het MOET in plaats daarvan een bedrijfs-/eenheidsnaam, e-mailadres en/of telefoonnummer bevatten. Het serviceEndpoint MOET een JSON object literal zijn en MOET de key `email` bevatten. Daarnaast KAN het de volgende eigenschappen bevatten: `telephone`, `name` (bedrijfs-/unitnaam), `website` (website-URL). Alle eigenschappen MOETEN worden opgemaakt als tekenreeks. Bijvoorbeeld:


```
{
    "serviceEndpoint": {
        "name": "Testorganisatie",
        "email": "administrator@test.nl",
        "telephone": "00316123456",
        "website": "https://www.test.nl"
    }
}
```

De service KAN ook verwijzen naar de contactinformatieservice van een andere DID (in het geval van een SaaS-provider). In dit geval MOET het service-eindpunt een DID-URL zijn als tekenreeks die de service waarnaar wordt verwezen, opvraagt:

```
{
  "serviceEndpoint": "did:<<iwlz>>:some-other-did?type=node-contact-info"
}
```

De referentie MOET verwijzen naar een contactinformatiedienst zoals hierboven beschreven.
Aangezien de informatie zelfverklaard is en op geen enkele manier geauthentiseerd of geverifieerd, MOETEN toepassingen deze met de grootste zorg als niet-vertrouwd behandelen. Als u dit niet doet, kan de operator van het knooppunt kwetsbaar worden voor spoofing en andere aanvallen.


>```DID-documenten bevatten contactinformatie voor de operator van een netwerkpunt, zoals bedrijfsnaam, e-mailadres, telefoonnummer en website. Deze informatie moet worden behandeld als niet-vertrouwd om spoofing en andere aanvallen te voorkomen.```





# 5 Foutmeldingen
>```Foutmeldingen.```
