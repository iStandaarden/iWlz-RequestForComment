# RFC0020 - Service Directory

**SAMENVATTING**

Deze RFC beschrijft de werking van de Service Directory binnen het iWLZ netwerk. In de Service Directory wordt vast gelegd welk type abonnementen door de diverse netwerkdeelnemers worden aangeboden en onder welke voorwaarden deze kunnen worden afgesloten.

---
**Inhoudsopgave**
- [RFC0020 - Service Directory](#rfc0020---service-directory)
- [1. Inleiding](#1-inleiding)
  - [1.1. Uitgangspunten](#11-uitgangspunten)
  - [1.2 Relatie andere RFC's](#12-relatie-andere-rfcs)
- [2. Terminologie](#2-terminologie)
- [plant-uml embedding](#plant-uml-embedding)
  - [oude rfc](#oude-rfc)

---
# 1. Inleiding
>```Inleiding```


## 1.1. Uitgangspunten
>```uitgangspunten```

## 1.2 Relatie andere RFC's
Deze RFC is noodzakelijk voor de volgende RFC's en daar een relatie mee. 
|RFC | onderwerp | relatie<sup>*</sup> | toelichting |issue |
|:--|:--|:--| :--|:--|
|[0008](RFC/RFC0008%20-%20Notificaties%20en%20Abonnementen.md) | Notificaties en abonnement | voorwaardelijk | <ul><li>Er is een **Service Directory** waarin notificatietypen gepubliceerd kunnen worden.</li> <li>Netwerkdeelnemers raadplegen de **Service Directory** om op te halen welke abonnementen geplaatst kunnen worden en welke voorwaarden hier aan zitten. </li></ul>|[#2](https://github.com/iStandaarden/iWlz-RFC/issues/2) |
|[0014](RFC//RFC0014%20-%20Functionele%20uitwerking%20aanvragen%20van%20autorisatie.md) | Functionele uitwerking van aanvragen autorisatie | voorwaardelijk |<ul><li>Er is een **Service directory** waarin per bronregister het GraphQL endpoints beschikbaar is.</li><li>Er is een **Service directory** waarin per deelnemer zijn **rol** in het netwerkmodel is beschreven.</li></ul> |[#9](https://github.com/iStandaarden/iWlz-RFC/issues/9) |

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



## oude rfc
De verschillende type abonnementen die een organisatie aanbiedt worden gepubliceerd in de Service Directory. De interface van de Service Directory moet nog worden gespecificeerd evenals de concrete invulling van dit generieke component.

Bij een abonnement type worden minimaal de volgende gegevens vastgelegd.

| Gegeven | Invoer | Datatype | Beschrijving | Voorbeeld |
|---|:---:|---|---|---|
| organisatieId | V | String | Identificatie van de partij die het abonnement verstrekt in het netwerk | CIZ |
| abonnementType | V | String | Aanduiding van het abonnement type | INDICATIES_VOOR_ZORGKANTOOR |
| abonnementDescription | V | String | Beschrijving van het abonnement | ‘Abonnement voor notificaties die worden toegewezen aan uw zorgkantoor.” |
| idType | V | Enum [BSN, KvK, Uzovi, AGB, ObjectId] | Aanduiding van het type Id dat moet worden meegegeven bij het afsluiten van het abonnement. Een abonnementType kan werken op basis van meerdere idType’s. | “Uzovi, AGB” |
| EventType | V | Enum [Create, Update, ‘Delete’] | Aanduiding welk event een notificatie geeft. (Delete = beëindiging?) | Create |
| EventTrigger | V | String | Beschrijving welke trigger zorgt voor een notificatie | “De registratie van een nieuwe indicatie, met een niet eerder afgegeven besluitnummer” |