![header](../imagesrc/ZinBanner.png "template_header")

# RFC0020 - Verwijsindex & Search met generieke functie lokalisatie

<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**

>In de eerste releases van de iWLZ is er nog geen behoefte om iWLZ-gegevens te kunnen zoeken (=lokaliseren). In het proces van de WLZ ligt verborgen dat de deelnemers weten bij welke andere deelnemers WLZ-gegevens beschikbaar zijn. Bv via het indicatieregister bij het CIZ kan worden bepaald of een burger voorkomt in de WLZ en via het bemiddelingsregister kan de zorgaanbieder worden gelokaliseerd die zorgleveringsgegevens heeft. Om deze reden zijn er nog geen specifieke lokalisatiefunctie gedefinieerd.

**Beoogde situatie**

>Vanuit het IZA en de NVS wordt er ingezet op databeschikbaarheid en delen van gezondheidsinformatie. In het verlengde hiervan en van de Wegiz is een aantal generieke functies benoemd die de (verplichte) digitale uitwisseling van gezondheidsgegevens zullen ondersteunen.  Een daarvan is de “lokalisatievoorziening” om te kunnen achterhalen waar gezondheidsgegevens van burgers terug te vinden zijn. 
Het programma Implementatie generieke functies van het Ministerie van VWS ontwikkelt samen met vertegenwoordigers uit het zorgveld deze generieke functies, waaronder een voor lokalisatie. In de normatieve “Architectuur voor het Gezondheidsinformatiestelsel” die ook voor de iWLZ zal gelden, zal de interactie met de generieke functies worden uitgewerkt. Tenslotte behandelt de NEN 7519 de generieke functie lokalisatie.
>Dit alles betekent dat ook in het netwerkmodel lokalisatie ingebouwd zal moeten worden. Dit is enerzijds om binnen de Wlz flexibeler, dus buiten het strakke Wlz-proces om, clientgegevens te kunnen zoeken en vinden, en anderzijds om verschillende varianten van secundair datagebruik mogelijk te maken en volledig te kunnen bijdragen aan de doelstelling van databeschikbaarheid van gezondheidinformatie zoals benoemd in het IZA en de NVS.  


<font size="4">**Status RFC**</font>

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/19) om de actuele status van deze RFC te bekijken.

---
**Inhoudsopgave**
- [RFC0020 - Verwijsindex \& Cooperative Search](#rfc0020---verwijsindex--cooperative-search)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
  - [1.2 Relatie andere RFC](#12-relatie-andere-rfc)
- [2. Terminologie](#2-terminologie)
- [plant-uml embedding](#plant-uml-embedding)

---
# 1. Inleiding
Op middellange termijn is er voor het delen en (her)gebruiken van WLZ-gegevens behoefte aan een lokalisatiefunctionaliteit: 
- vanuit de behoeften die zullen ontstaan wanneer het netwerkmodel domeinsoverstijgend wordt ingevuld;
- wanneer er meer toepassingen worden gedefinieerd "on top of" het reguliere toeleidingsproces;
- om gevolg te geven aan de (algemene) koers binnen de IZA en NVS op databeschikbaarheid.

Dit RfC beschrijft hoe binnen de deelnemers in het netwerk voorzieningen in hun systemen moeten inbouwen om lokalisatie van de WLZ gegevens mogelijk te maken. Ook beschrijft waar WLZ-gegevens van een client voor primair en secundair gebruik van deze gegevens gevonden kunnen worden. 

## 1.1. Uitgangspunten
Voor de lokalisatiefunctie binnen de WLZ kunnen de volgende uitgangspunten worden onderscheiden:
- Aansluiten op NEN719. NEN 7519 behandelt de generieke functie lokalisatie: het bepalen waar welke gegevens van de patiënt of cliënt zijn. Voor primaire en secundair gebruik van gegevens. NEN 7519 beschrijft de lokalisatiefunctie voor zorgverlening aan een individuele patiënt;
- Aansluiten op de wijze waarop de generieke functies "lokalisatie" wordt ingevuld;
- grondslagen op basis waarvan toestemming gegeven kan worden om de clientgegevens te lokaliseren. De AVG in het algemeen en de WLZ in bijzonder fungeren hier als nkade.

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
