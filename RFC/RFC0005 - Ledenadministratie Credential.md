# RFC0005 - Ledenadministratie Credential

<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**

```nog invullen```

**Beoogde situatie**

Dit document beschrijft de wijze van ledenadministratie. De deelnemers aan het iWlz-netwerkmodel moeten andere deelnemers kunnen herkennen. Om dit te kunnen doen zijn er registraties nodig waarin de rollen en kenmerken van deelnemers te controleren zijn. Een voorbeeld hiervan is de registratie van zorgaanbieders inclusief rollen en kenmerken in het Landelijk Register Zorgaanbieders (LRZa). Een ander voorbeeld is de registratie van zorgkantoren in het UZOVI-register. Het beheren van een registratie van leden is de verantwoordelijkheid van de rol ledenadministratie. Binnen het iWlz-netwerkmodel is sprake van meerdere ledenadministraties. Deze ledenadministraties zijn verantwoordelijk voor het beheer van hun eigen informatie en communicatie met andere deelnemers in het iWlz-netwerkmodel.

Wanneer deelnemer A aan deelnemer B wil bewijzen dat hij bepaalde kenmerken heeft (bijv. “Deelnemer A is een zorgaanbieder“, “Deelnemer A heeft organisatienaam TestZorgkantoor“ of “Deelnemer A heeft UZOVI-code 123“) overlegt deelnemer A aan deelnemer B een verifieerbare verklaring die is gekoppeld aan de DID (zie RFC002) van deelnemer A en is ondertekend met behulp van één van de versleutelingsmethodes uit de DID van een erkende ledenadministratie. Deelnemer B kan vervolgens de echtheid van de verklaring controleren aan de hand van de gebruikte ondertekening.

Met het LedenadministratieCredential, dat wordt gespecificeerd in deze RFC, kan een aangewezen entiteit (DID-subject) optreden als ledenadministratie in het iWlz-netwerkmodel. Hiermee kan deze entiteit verifiëerbare bewijzen (Verifiable Credentials) uitgeven. Vertrouwen in deze ledenadministraties wordt gewaarborgd door ze toe te voegen aan een lijst met vertrouwde uitgevers, die wordt beheerd door de Stelsel Functioneel beheerder (in DIZRA: Stelselbeheerder).

Deze RFC vervangt RFC001A “iWlz Attest deelnemer en validatie abonnement”.

<font size="4">**Status RFC**</font>

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/6) om de actuele status van deze RFC te bekijken.

---
**Inhoudsopgave**
- [RFC0005 - Ledenadministratie Credential](#rfc0005---ledenadministratie-credential)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
- [2. Terminologie](#2-terminologie)
- [3. CredentialSubject](#3-credentialsubject)
  - [3.1 Role en role\_type](#31-role-en-role_type)
- [4. Uitgifte \& distributie](#4-uitgifte--distributie)
- [5. Ondersteunde bewijzen](#5-ondersteunde-bewijzen)
- [6. Vertrouwen](#6-vertrouwen)
- [7. Herroeping](#7-herroeping)
- [8. Use cases](#8-use-cases)
- [9. Privacyoverwegingen](#9-privacyoverwegingen)
- [10. Services](#10-services)
- [11. Voorbeeld](#11-voorbeeld)

---
# 1. Inleiding
De LedenadministratieCredential is een Verifiable Credential type dat in het iWlz-netwerkmodel wordt gebruikt om informatie over deelnemers toe te voegen aan hun DID's (in de vorm van claims). Hierdoor kunnen deelnemers met elkaar communiceren met behulp van de organisatienaam en weten zij welke andere kenmerken (bijv. rol in het iWlz-proces) een deelnemer heeft. Dit vergemakkelijkt ook het zoeken van deelnemers eenvoudig.

Deze RFC bouwt voort op [RFC004 Verifiable Credentials](RFC0004%20-%20Verifiable%20Credentials.md).


## 1.1. Uitgangspunten
>```uitgangspunten```

# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| :-------- | :-------- | 
| DID | Decentralized Identifiers. De W3C-standaard Decentralized Identifiers maakt het verifiëren van  decentrale digitale identiteiten mogelijk. Deze decentrale identificatoren kunnen gebruikt worden bij self-sovereign identity. | 
| VC | Attest volgens de standaard Verifiable Credentials. Een attest is een valideerbare en  interpreteerbare verklaring met daarin één of meerdere claims. In de context van het iWlz-netwerkmodel worden attesten gebruikt om bepaalde claims te maken over een onderwerp, zoals een organisatie. | 

# 3. CredentialSubject
Het `credentialSubject`-veld bevat het volgende:

Voorbeeld zorgkantoor:

```
{
    "id": "did:<<iwlz>>:8jx6GU9JipE6TXY2nak8RgFXMk3zaoPWsCb53N1Zjw9R",
    "organization": {
        "name": "TestZorgkantoor",
        "city": "Nijmegen",
        "id": "123",
        "id_type" "uzovi",
        "role": "zk",
        "role_type": "zinl"
    }
}
```

Voorbeeld zorgaanbieder:

```
{
    "id": "did:<<iwlz>>:8jx6GU9JipE6TXY2nak8RgFXMk3zaoPWsCb53N1Zjw9R",
    "organization": {
        "name": "TestZorgaanbieder",
        "city": "Nijmegen",
        "id": "123",
        "id_type" "agb",
        "role": "87",
        "role_type": "sbi"
    }
}
```
en heeft de volgende requirements:
- Alle velden zijn verplicht.
- Alle velden zijn gecodeerd als strings.
- `id` MOET verwijzen naar een bekende DID die voldoet aan RFC002.
- `organization.id` bevat het identificatienummer van de deelnemer
- `organization.id_type` bevat het identificatietype van de deelnemer, bijv. "UZOVI”, “AGB” of “KVK"
- `role`: Rol van de deelnemer binnen het iWLZ-netwerkmodel. 
- `role_type`: Bevat het roltype van de deelnemer, bijv. “sbi“ of “zinl“

## 3.1 Role en role_type

Binnen het iWlz-proces worden de volgende rollen onderscheiden: CIZ, Zorgkantoor, Zorgaanbieder, CAK.

In het iWlz-netwerkmodel worden meerdere ledenadministraties gebruikt. SBI (standaard bedrijfsindeling) is een gestandaardiseerde manier om de rollen van bedrijven weer te geven. De rol “zorgaanbieder“ kan worden gemaakt op iedere SBI-code die start met 86, 87 of 88. De rollen “CIZ“, “Zorgkantoor,“ en “CAK“ zijn niet goed te mappen op SBI-codes.

Voor zorgaanbieders wordt het `role_type` “sbi” gebruikt. Er is sprake van een zorgaanbieder wanneer `role_type` een waarde “sbi” heeft en `role` een waarde “86”, “87” of “88” heeft.

Voor de overige rollen wordt het `role_type` “zinl” gebruikt.

- Er is sprake van een zorgkantoor wanneer `role_type` een waarde “zinl” heeft en `role` een waarde “zk” heeft. 
- Er is sprake van CIZ wanneer `role_type` een waarde “zinl” heeft en `role` een waarde “ciz” heeft. 
- Er is sprake van CAK wanneer `role_type` een waarde “zinl” heeft en `role` een waarde “cak” heeft.

# 4. Uitgifte & distributie
Een LedenadministratieCredential is openbaar en MOET via het trust-netwerk worden gepubliceerd. Alleen door de stelselbeheerder aangewezen DID’s MOGEN het LedenadministratieCredential uitgeven. De VC heeft geen andere vereisten en voegt ook geen vereisten toe aan andere VC's.

# 5. Ondersteunde bewijzen
Alleen de bewijzen (proofs) genoemd in [RFC004](/RFC/RFC0004%20-%20Verifiable%20Credentials.md) worden ondersteund.

# 6. Vertrouwen
De LedenadministratieCredential MOET handmatig worden vertrouwd. Binnen het iWlz-netwerkmodel wordt ervoor gekozen om alle LedenadministratieCredentials uitgegeven door een aantal door de stelselbeheerder van het iWlz-netwerkmodel aangewezen uitgevers (ledenadministraties) te vertrouwen.

# 7. Herroeping
De LedenadministratieCredential volgt de intrekkingsregels zoals vermeld in [RFC004](/RFC/RFC0004%20-%20Verifiable%20Credentials.md).

# 8. Use cases
De LedenadministratieCredential KAN worden gebruikt als credential in de OAuth-flow zoals gespecificeerd in RFC007. De referentie KAN ook worden gebruikt als een manier om de juiste DID en diens diensten te vinden.

# 9. Privacyoverwegingen
Alle informatie in de LedenadministratieCredential **MOET** openbare kennis zijn. De VC **MAG GEEN** privé-informatie bevatten.

# 10. Services
Er zijn geen andere aanvullende diensten dan het trust-netwerk vereist.

# 11. Voorbeeld
```
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "id": "did:<<iwlz>>:B8PUHs2AUHbFF1xLLK4eZjgErEcMXHxs68FteY7NDtCY#90382475609238467",
  "type": ["VerifiableCredential", "LedenadministratieCredential"],
  "issuer": "did:<<iwlz>>:B8PUHs2AUHbFF1xLLK4eZjgErEcMXHxs68FteY7NDtCY",
  "issuanceDate": "2010-01-01T19:73:24Z",
  "expirationDate": "2010-02-01T19:73:24Z",
  "credentialSubject": {
    "id": "did:<<iwlz>>:8jx6GU9JipE6TXY2nak8RgFXMk3zaoPWsCb53N1Zjw9R",
    "organization": {
        "name": "TestZorgaanbieder",
        "city": "Nijmegen",
        "id": "123",
        "id_type" "agb",
        "role": "87",
        "role_type": "sbi"
    }
  },
  "proof": {
    "type": "EcdsaSecp256r1Signature2019",
    "created": "2017-06-18T21:19:10Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:<<iwlz>>:B8PUHs2AUHbFF1xLLK4eZjgErEcMXHxs68FteY7NDtCY#90382475609238467#qjHYrzaJjpEstmDATng4-cGmR4t-_V3ipbDVYZrVe4A",
    "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
  }
}
```