# RFC0013 - Identiteit

**SAMENVATTING**

Dit document beschrijft hoe entiteiten in het iWlz-netwerkmodel van een verifieerbare identiteit worden voorzien. De entiteiten die hieronder vallen zijn deelnemers en dienstverleners die namens deze deelnemers optreden. De identiteit wordt verifieerbaar door gebruik te maken van sleutelmateriaal.

Identiteiten kunnen centraal (PKI) of decentraal (DPKI) worden beheerd. Het is ook mogelijk om beide vormen te combineren. Op dit moment heeft decentraal identiteitsbeheer nog niet voor alle deelnemers aan het iWlz-netwerkmodel de voorkeur. In het iWlz-netwerkmodel worden voorlopig  centraal en decentraal identiteitsbeheer gecombineerd en wordt een groeipad naar decentraal identiteitsbeheer ingezet.

Centraal identiteitsbeheer wordt ingevuld door het toepassen van een door VECOZO beheerde public key infrastructuur (PKI).

Decentraal identiteitsbeheer wordt ingevuld door het toepassen van de standaard [Decentralized Identifers](https://www.w3.org/TR/did-core/) (DID).

Op basis van de centrale en/of decentrale identiteiten van deelnemers en hun dienstverleners kunnen vervolgens ook diensten voor gegevensuitwisseling (zie [RFC003](/RFC/RFC0003%20-%20Adresboek.md)) en Verifiable Credentials (zie [RFC004](/RFC/RFC0004%20-%20Verifiable%20Credentials.md)) van verifieerbare identifiers worden voorzien.

[Alt text](../imagesrc/rfc0013-01-Identiteit.png)
Schematische weergave van RFC002 Identiteit (blauw gemarkeerd) in relatie tot de applicatiecomponenten



---
**Inhoudsopgave**
- [RFC0013 - Identiteit](#rfc0013---identiteit)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
  - [1.2 Relatie andere RFC](#12-relatie-andere-rfc)
- [2. Terminologie](#2-terminologie)
- [plant-uml embedding](#plant-uml-embedding)

---
# 1. Inleiding
>```Inleiding```


## 1.1. Uitgangspunten
>```uitgangspunten```

## 1.2 Relatie andere RFC
Deze RFC heeft een relatie met de volgende RFC(s)
|RFC | onderwerp | relatie<sup>*</sup> | toelichting |issue |
|:--|:--|:--| :--|:--|
|[0008](RFC/RFC0008%20-%20Notificaties%20en%20Abonnementen.md) | Notificaties en abonnement | voorwaardelijk | <ul><li>Er is een **Service Directory** waarin notificatietypen gepubliceerd kunnen worden.</li> <li>Netwerkdeelnemers raadplegen de **Service Directory** om op te halen welke abonnementen geplaatst kunnen worden en welke voorwaarden hier aan zitten. </li></ul>|[#2](https://github.com/iStandaarden/iWlz-RFC/issues/2) |

<sup>*</sup>voorwaardelijk, *voor andere RFC* / afhankelijk, *van andere RFC*


# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| :-------- | :-------- | 
| *term* | *beschrijving/uitleg* | 

# plant-uml embedding
Neem een verwijzing op naar het gegenereerde diagram
 ```
    ![notificatie_melding](../plantUMLsrc/rfc008-01-notificatie_melding.svg "notificatie_melding")
```

verberg de plant-Uml source tussen de tags: 

    <details>
     <summary>plantUML-source</summary>
    
     ```plantuml
     @startuml rfc008-01-notificatie_melding
     <plant-uml-source> 
     
    ```
     </details>
