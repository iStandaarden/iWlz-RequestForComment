# <AutorisatieCredential>

**SAMENVATTING**

Dit document beschrijft de wijze en AutorisatieCredential. Een AutorisatieCredential is een verifiable credential die gebruikt wordt om toegang te geven tot gegevens in het iWlz-netwerkmodel. Het beschrijft welke gegevens een deelnemer mag opvragen en geeft hierin aan welke dienst, bronhouder en cliënt betrokken zijn. Een zorgaanbieder heeft dus voor één cliënt per dienst per bronhouder een AutorisatieCredential nodig om gegevens op te vragen (bijvoorbeeld een bemiddeling van cliënt A bij zorgkantoor B).

De AutorisatieCredential is gebaseerd op de internationale standaard Verifiable Credentials en heeft de vorm van een attest (zie ook RFC004). De AutorisatieCredential wordt gebruikt samen met de inhoud van het afgesproken access policy (zie RFC00Z Access Policy) om toegang te verlenen tot brongegevens in een register.

---
**Inhoudsopgave**
- [](#)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
  - [1.2 Relatie andere RFC](#12-relatie-andere-rfc)
- [2. Terminologie](#2-terminologie)
- [plant-uml embedding](#plant-uml-embedding)

---
# 1. Inleiding
In het iWlz-netwerkmodel worden persoonlijke gegevens gedeeld tussen verschillende deelnemers. Dit is alleen toegestaan als er een geldige juridische grondslag is voor de gegevensverwerking, zoals een wettelijke plicht (zie ook iWlz afsprakenstelsel: Randvoorwaarden & ontwerpkeuzes). Het is belangrijk om de gegevensuitwisseling te beperken tot het delen van alleen de gegevens die nodig zijn voor de specifieke situatie en om de privé-levenssfeer van de cliënt te beschermen. Ook het feit dat er twee deelnemers gegevens over een cliënt uitwisselen is privacygevoelige informatie en dient alleen bij deze afnemer en bronhouder bekend te zijn.

De redenen voor het delen van gegevens kunnen variëren, zoals het inzien van indicatiegegevens door een zorgkantoor of het inzien van bemiddelingsgegevens door een zorgaanbieder.

Deze RFC bouwt voort op [RFC004 Verifiable Credentials](RFC0004%20-%20Verifiable%20Credentials.md).


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
