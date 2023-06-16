
# Functionele uitwerking notificaties abonnementen en meldingen

**SAMENVATTING**

Dit document beschrijft functioneel de generieke werking van notificaties en meldingen in het Netwerkmodel iWlz. Met notificaties of meldingen worden respectievelijke afnemer of bronhouder geattendeerd op nieuwe informatie die relevant is voor die afnemer of bronhouder. 

De technische uitwerking is beschreven in RFC008 Abonneren en notificeren.


```
N.B. RFC008 Abonneren en notificeren - iWlz-netwerkmodel
Deze uitwerking is ook gebaseerd op de RFC008 in het afsprakenstelsel. Deze onderdelen zijn gemarkeerd. 
```

---
**Inhoudsopgave**
[TOC]
||
|:--|
|[1. Melding of notificatie](#1)|
|[2. Notificatie](#2)|
|&nbsp; [2.1 Doel](#2.1)|
---


# <a id="1"></a>1. Inleiding
# <a id="2"></a>2. Notificatie of melding wat is het verschil

![notificatie_melding](../plantUMLsrc/rfc008-01-notificatie_melding.svg "notificatie_melding")

<details>
<summary>plantUML-source</summary>

```plantuml
@startuml rfc008-01-notificatie_melding
title notificatie of melding
skinparam handwritten false
skinparam participantpadding 20
skinparam boxpadding 40
autonumber "<b>[00]"
box  #lightblue
participant "bronhouder" as bs
end box

box  #lightyellow
participant "deelnemer" as dbs
end box

Group Notificeren
    bs -> dbs : sturen notificatie
    hnote across:notificatie
    activate bs
    activate dbs
    return response
    deactivate bs
end

Group Melden
    dbs -> bs: sturen melding
    hnote across:melding
    activate bs
    activate dbs
    return response
    deactivate dbs
end
@enduml
```
</details>

||Van|Naar|Omschrijving|
|:--- |:--- |:--- |:--- |
|Notificatie|Bronhouder|Deelnemer|op de hoogte stellen van een deelnemer over dat er nieuwe (of gewijzigde) informatie in een bron beschikbaar is die directe of afgeleide betrekking heeft op die deelnemer.|
|Melding|Deelnemer|Bronhouder|verzoek tot muteren of het beschikbaar stellen van nieuwe informatie naar aanleiding van een gebeurtenis van een deelnemer aan een bron|

# <a id="3"></a>3. Notificatie

## <a id=3.1></a>3.1 Doel
Het doel van een notificatie is het op de hoogte stellen van een deelnemer door een bron over nieuwe (of gewijzigde) informatie die directe of afgeleide betrekking heeft op die deelnemer en daarmee de deelnemer in staat stellen op basis van die notificatie de nieuwe informatie te raadplegen. Een notificatie verloopt altijd van bronhouder naar deelnemer.

De reden voor notificatie is altijd de registratie of wijziging van gegevens in een bronregister. Dit is de *notificatie-trigger* en beschrijft welk CRUD-event in het register leidt tot een notificatie. 


## <a id=3.2></a>3.2 Typen notificatie
Er zijn twee typen notificatie gedefinieerd, waarbij het onderscheid zit in de vrijwilligheid van het ontvangen van de notificatie door een deelnemer of het noodzakelijk ontvangen van de notificatie door de deelnemer. Wanneer het voor de afgesproken werking van de iWlz noodzakelijk is een deelnemer van een CRUD-event in een register op de hoogte te stellen is er sprake van een **iWlz-verplichte** notificatie. Een bronhouder moet deze notificatie versturen en een deelnemer hoeft zich voor de deze notificatie niet te abonneren. Is voor een goede werking van de iWlz gewenst dat een deelnemer op de hoogte te stellen van een CRUD-event, maar niet noodzakelijk, dan hoeft een bronhouder een notificatie alleen te versturen wanneer de deelnemer zich heeft geabonneerd op deze notificatie.  

Denk bijvoorbeeld aan de registratie van een nieuw indicatiebesluit. Het zorgkantoor dat verantwoordelijk is voor de regio waarin de client van het indicatiebesluit volgens het BRP woont, moet op de hoogte gesteld worden. Het CIZ **moet** daarom een dergelijke notificatie verzenden aan het zorgkantoor en het zorgkantoor **moet** de notificatie volgens iWlz-afspraken afhandelen. Het zorgkantoor hoeft zich niet op deze notificatie *"nieuwe indicatie voor zorgkantoor"* te abonneren.  

De twee typen notificaties zijn daarom: 

|Type notificatie|Deelnemer ontvangt notificatie|Abonneren door|
|:--- |:--- |:--- |
|iWlz-Verplicht|Altijd|niet van toepassing|
|iWlz-Vrijwillig|Wanneer geabonneerd|Deelnemer|


## <a id=3.3></a>3.3 Inhoud notificatie
Op basis van de inhoud van een notificatie moet de ontvanger van de notificatie onder andere kunnen bepalen:
  - wat is de trigger, wat is de reden van de notificatie
  - van welke bronhouder is de notificatie afkomstig
  - wanneer is de notifictie verzonden
  - op welke informatie de notificatie betrekking heeft
  - informatie om een  gerichte raadpleging te doen
  - (autorisatie?)

De notificatie bevat de volgende gegevens:
|Gegeven|Beschrijving|
|--- |--- |
|organisatieID|Identificatie van de abonnee in het netwerk|
|timestamp|Tijdstip waarop de notificatie is aangemaakt|
|abonnementID|Identificatie van het abonnement. (Zie verderop)|
|abonnementTypeID|Identificatie van het abonnement waaruit de notificatie voortvloeit. (Zie hoofdstuk 3 Abonnementen verderop)|
|parentID|Identificatie van het parent-object waarover de autorisatie loopt.|
|objectID|Identificatie van het object waar de notificatie betrekking op heeft en eventueel input voor de raadpleging.|

### <a id=3.3.1></a>3.3.1 Voorbeeld notificatie: 
Het gaat hier om een notificatie van een ‘Nieuwe indicatie’ voor het zorgkantoor. Op basis van het objectId kan het zorgkantoor een raadpleging doen van de nieuwe indicatie. 

```
{
  "organisatieId": "89e0e41a-13df-4fe2-ad72-d9c32ca5641c",
  "timestamp": "2022-09-27T12:07:07.492Z",
  "abonnementId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "abonnement": "NIEUWE_INDICATIE_VOOR_ZORGKANTOOR",
  "parentId": "wlzIndicatie/da8ebd42-d29b-4508-8604-ae7d2c6bbddd",
  "objectId": "https://api.ciz.nl/wlzindicatieregister/wlzindicaties/
              da8ebd42-d29b-4508-8604-ae7d2c6bbddd"
}
```

## <a id=3.4></a>3.4 Notificatie flow

![notificatie_melding](../plantUMLsrc/rfc008-02-notificatie_sequence.svg "notificatie_sequence")

<details>
  <summary>plantUML-source</summary>

  ```plantuml
  @startuml rfc008-02-notificatie_sequence
  title notificatie sequence-diagram
  skinparam handwritten false
  skinparam participantpadding 20
  skinparam boxpadding 40
  autonumber "<b>[00]"
  box bronhouder #lightblue
  participant "Backoffice" as bs
  participant "Register" as rg
  participant "Netwerkpunt" as bnp 
  end box

  box deelnemer #lightyellow
  participant "Netwerkpunt" as dnp
  participant "Backoffice" as dbs
  end box

  group notificeren
    bs -> rg : registratie data
    activate rg
    activate bs
    rg -> rg: event trigger

    rg -> bs : lookup deelnemer
    deactivate rg
    bs -> bnp: genereer notificatie
  
    activate bnp
    
    bnp -> dnp: notificeer
    activate dnp
    dnp -> dbs: verwerk notificatie
    activate dbs
    dbs --> dnp: http-response 
    deactivate dbs
    dnp --> bnp: http-response
    deactivate dnp  
    bnp --> bs: verwerk response
    deactivate bnp
    deactivate bs
  end

  @enduml
  ```
</details>


|#|Beschrijving|Toelichting|
|:--- |:--- |:--- |
|01|registratie data|data vanuit backoffice in register plaatsen|
|02|event trigger|registratie laat een abonnements trigger afgaan|
|03|lookup deelnemer|zoek de abonnees op voor betreffende abonnement|
|04|genereer notificatie|genereer voor elk van de abonnees de notificatie|
|05|notificeer|stuur de notificatie door naar de deelnemer|
|06|verwerk notificatie|verwerk de notificatie in backoffice deelnemer|
|07|(204?) response|genereer ontvangstbevestiging|
|08|(204?) response|stuur ontvangstbevestiging naar verzender|
|09|verwerk response|bevestig ontvangst notificatie|

Zodra een event zich voordoet waarvoor een notificatie-trigger is gedefinieerd verstuurd de bronhouder de bijbehorende notificatie. 

## <a id=3.5></a> 3.5 iWlz-notificaties
Alleen de notificaties die afgesproken zijn tussen een of meerdere ketenpartijen van de iWlz worden hier beschreven. Deze notificaties **moet** een bronhouder kunnen vesturen. Of een deelnemer de notificatie ontvangt is afhankelijk van het type. Een iWlz-verplichte notificatie ontvangt een deelnemer **altijd** wanneer die van toepassing is op die deelnemer. Een iWlz-vrijwillige notificatie ontvangt een deelnemer wanneer de notificatie van toepassing is op die deelnemer **EN** als die deelnemer is geabonneerd op die notificatie bij de bronhouder.

Er zijn momenteel twee registers in ontwikkeling, het Indicatieregister van het CIZ en het Bemiddelingsregister van de zorgkantoren. Hiervoor zijn er nu de volgende iWlz notificaties gespecificeerd die gerealiseerd zullen worden. 

||Trigger|Bronhouder|Deelnemer|notificatie-type|
|--- |--- |--- |--- |--- |
|1|De registratie van een nieuwe indicatie|CIZ|zorgkantoor|iWlz-verplicht|
|2|Een wijziging van een bestaande indicatie[^1]|CIZ|zorgkantoor|iWlz-verplicht|
|3|De registratie van een nieuwe ZorgInNatura|zorgkantoor|zorgaanbieder|iWlz-verplicht|
|4|Een wijziging van een bestaande ZorgInNatura|zorgkantoor|zorgaanbieder|iWlz-verplicht|
|5|Gewijzigde bemiddeling t.g.v nieuwe of gewijzigde ZorgInNatura ander betrokken zorgaanbieder|zorgkantoor|Overig betrokken zorgaanbieder|iWlz-vrijwillig|
|6|Gewijzigde Dossierhouder of CZT|zorgkantoor|alle betrokken zorgaanbieders|*iWlz-vrijwillig*|
|7|Dossieroverdracht cliënt|zorgkantoor|zorgkantoor|*iWlz-verplicht*|


Er zullen er nieuwe iWlz-notificaties worden bedacht bij het ontwerp en ontwikkeling van nieuwe registers. 

# 4. Publiceren en raadplegen beschikbare Notificatietype
## 4.1 publiceren en raadplegen notificatie-typen
De verschillende typen notificaties die een organisatie aanbiedt worden gepubliceerd in de Service Directory. De overige netwerkdeelnemers kunnen vervolgens de Service Directory raadplegen om te ontdekken welke notificaties een organisatie aanbiedt en welk type notificatie worden aangeboden. Minimaal de hierboven beschreven iWlz-notificaties worden in de Service Directory gepubliceerd omdat dit de afgesproken notificaties zijn.  

![publiceer_raadpleeg](../plantUMLsrc/rfc008-03-publiceren_raadplegen_notificatietype.svg "publiceer_raadpleeg_nt")

<details>
  <summary>plantUML-source</summary>

  ```plantuml
  @startuml rfc008-03-publiceren_raadplegen_notificatietype
  title Publiceren & raadplegen notificatietype

  skinparam handwritten false
  skinparam participantpadding 20
  skinparam boxpadding 40
  autonumber "<b>[00]"
  box bronhouder #lightblue
  participant "Backoffice" as bs
  participant "Netwerkpunt" as bnp 
  end box

  box 
  participant "ServiceDirectory" as sd
  end box

  box deelnemer #lightyellow
  participant "Netwerkpunt" as dnp
  participant "Backoffice" as dbs
  end box
  group vastleggen notificatietype

    bs -> sd : publiceren notificatietype
    activate bs
    activate sd
    return response
    deactivate bs
  end
  group raadplegen notificatietype
    dbs -> sd: raadpleeg notificatietype
    activate dbs
    activate sd 
    return response
    deactivate dbs
  end
  @enduml
  ```
</details>

|#|Beschrijving|Toelichting|
|--- |--- |--- |
|1|publiceer notificatietype|registreer de gegevens van het notificatietype in de servicedirectory|
|2|response|verwerk response|
|3|raadpleeg notificatietype|raadpleeg de servicedirectory op de beschikbare notificaties|
|4|informatie|beoordeel de informatie over het abonnementtype|

## 4.2 Inhoud notificatietype
Bij het vastleggen van een abonnementtype in de service directory worden de volgende gegevens geregistreerd:

|Gegeven|Beschrijving|
|--- |--- |
|organisatieID|Identificatie van de partij die het abonnement verstrekt in het netwerk|
|notificatieTypeID|Identificatie van het abonnement type|
|notificatieType|Aanduiding van de abonnementsvorm|
|notificatieOmschrijving|Beschrijving van het abonnement|
|idTypeAbonnee|Aanduiding van het type Id dat moet worden meegegeven bij het afsluiten van het abonnement. Een abonnement kan werken op basis van meerdere idTypeAbonnee’s|
|eventType|Aanduiding welke register event de notificatie veroorzaakt|
|eventTriggerOmschrijving|Beschrijving van de trigger die de notificatie veroorzaakt|
|objectIDType|Beschrijving welke ObjectID wordt teruggeven in de notificatie, voor gebruik als juiste ID in de GraphQL query|

### 3.4.1 Voorbeeld notificatietype-specificatie

Het voorbeeld beschrijft de json-string voor het verplichte abonnement  van een zorgkantoor, dat een zorgaanbieder notificeert op een nieuwe bemiddeling wanneer de betreffende zorgaanbieder de of een van de bemiddelde aanbieders is. 

```
{
 "organisatieId": "89e0e41a-13df-4fe2-ad72-d9c32ca5641c",
 "notificatieTypeID": "NIEUWE_BEMIDDELING_VOOR_ZORGAANBIEDER",
 "notificatieType": "IWLZ_VERPLICHT",
 "notificatieOmschrijving": "Elke nieuw betrokken bemiddelde aanbieder ontvangt hiervan een notificatie",
 "idTypeAbonnee": "AgbCode",
 "eventType": "CREATE",
 "eventTriggerOmschrijving": "Bij elke registratie in BemiddeldeInstelling van een zorgaanbieder ontvangt die aanbieder met die AgbCode een notificatie",
 "objectIDType": "bemiddeldeInstellingId"
}
```


# 5. Abonneren
Alleen voor het kunnen ontvangen van een iWlz-vrijwillige notificatie is het noodzakelijk dat een deelnemer zich abonneert. Elke iWlz-verplicht notificatie ontvangt een deelnemer afhankelijk van zijn of haar rol.

In dit hoofdstuk het proces hoe een deelnemer zich kan abonneren op een vrijwillige notificatie. 
## 5.1 Abonnementen binnen de iWlz
Voor het kunnen versturen van een vrijwillige notificatie aan een deelnemer is het nodig om abonnementen te faciliteren. Een abonnement koppelt een deelnemer aan een iWlz-vrijwillige notificatie zodat de bronhouder weet aan wie de notificatie verstuurd moet worden. 


_Het staat een bronhouder en deelnemer vrij om buiten de afgesproken iWlz notificatie een willekeurige notificatie af te spreken en te faciliteren met een deelnemer. Deze ‘ongereguleerde’ notificaties worden verder niet besproken, maar passen in hetzelfde principe van het iWlz-vrijwillige abonnement._


### 5.1.1 Afhandelen iWlz-Vrijwillig abonnementstype

Het abonneren van een deelnemer voor een <span style="text-decoration:underline;">iWlz-vrijwillig</span> abonnement is een handeling van de deelnemer zelf. De deelnemer mag zelf bepalen of een abonnement wenselijk is en om een notificatie te ontvangen. De deelnemer mag zich abonneren op een iWlz-Vrijwillig abonnement mits is voldaan aan de eisen van het abonnement en bijvoorbeeld het bezit van een geldige AgbCode. het identificatie kenmerk past binnen de toegestane van de deelnemer voldoet aan de set aan idTypeAbonnee’s voor dat abonnement. 


![abonneren](../plantUMLsrc/rfc008-04-abonneren_iwlz-vrijwillig.svg "abonneren")

<details>
  <summary> plant_uml_source</summary>

  ```plantuml
    @startuml rfc008-04-abonneren_iwlz-vrijwillig
    title Abonneren notificatie

    skinparam handwritten false
    skinparam participantpadding 20
    skinparam boxpadding 40
    autonumber "<b>[00]"
    box bronhouder #lightblue
    participant "Backoffice" as bs
    participant "Netwerkpunt" as bnp 
    end box

    box deelnemer #lightyellow
    participant "Netwerkpunt" as dnp
    participant "Backoffice" as dbs
    end box

    group abonneren op iWlz-vrijwiliig
        dbs -> dnp: abonnement verzoek
        activate dbs
        activate dnp
        dnp -> bnp: verstuur verzoek
        activate bnp
        bnp <- bnp: valideer verzoek
        bnp -> bs: verstuur verzoek
        activate bs
        bs -> bs: registeer abonnement
        bs --> bnp: response {abonnementID}
        deactivate bs
        bnp --> dnp: response {abonnementID}
        dnp --> dbs: response {abonnementID}
        dbs -> dbs: registreer \n{abonnementID}
            alt #Pink
            bnp --> dnp: response: ongeldig verzoek
            deactivate bnp
            dnp --> dbs: response: ongeldig verzoek
            deactivate dnp
            end alt
        deactivate dbs
    end
    @enduml
  ```
</details>

|#|Beschrijving|Toelichting|
|--- |--- |--- |
|01|abonnement verzoek|Stel een abonnementsverzoek op|
|02|verstuur verzoek|Dien een abonnementsverzoek in|
|03|valideer verzoek|Bepaal of de deelnemer abonnee mag worden op het betreffende abonnement|
|04|verstuur verzoek|verstuur het verzoek verder|
|05|registreer abonnement|registreer het abonnement en genereer {abonnementID} voor abonnee|
|06|response {abonnementID}|retourneer het {abonnementID}|
|07|response {abonnementID}|retourneer het {abonnementID}|
|08|response {abonnementID}|retourneer het {abonnementID}|
|09|register {abonnementID}|registreer het {abonnementID}|
|ALT|ongeldig verzoek|Deelnemer is niet gerechtigd voor een abonnement|
|10|response ongeldig verzoek|retourneer ongeldig verzoek|
|11|response ongeldig verzoek|ontvang ongeldig verzoek terug|


Alleen bij het abonneren van een deelnemer zelf ontvangt de deelnemer daar een abonnementID voor terug. Met dit ID kan de deelnemer zelf het abonnement opzeggen. 


#### Afhandelen iWlz-verplicht abonnementstype ZONDER abonnementsregistratie

De bronhouder is verantwoordelijk voor het verzenden van de notificatie bij een iWlz-verplicht abonnementstype. Bij elk abonnementstype is beschreven welke registratie de grondslag voor notificatie is en aan welke deelnemer. Een bronhouder kan op basis daarvan bepalen wanneer en aan wie de notificatie gestuurd moet worden zonder dat die deelnemer een abonnement heeft. 

Door het ontbreken van een abonnementsregistratie moet de bronhouder voor elke deelnemer die nog niet eerder is genotificeerd het organisatieID van die deelnemer opzoeken in het Adresboek. 



<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image7.png "image_tooltip")



|#|Beschrijving|Toelichting|
|--- |--- |--- |
|0||Een deelnemer kan de grondslag voor een iWlz verplicht abonnement verliezen. Bijvoorbeeld als de deelnemer geen iWlz zorgaanbieder meer is.|
|2|verwijder abonnement van deelnemer|De bronhouder verwijderd alle abonnementen op notificaties voor de deelnemer uit d abonnementenregistratie|




```
Zie ook RFC008 - Hoofdstuk 3.12
```



### 3.5.3 Inhoud plaatsen abonnement

De inhoud voor het plaatsen van een abonnement, abonneren, is gelijk voor het iWlz-verplicht abonnement door de bronhouder en het iWlz-vrijwillig abonnement door de deelnemer. 

Bij het abonneren van een deelnemer moeten de volgende gegevens worden aangeboden: 


|Gegeven|Beschrijving|
|--- |--- |
|organisatieId|NetwerkiIdentificatie van de abonnerende partij, identificerend voor het kunnen afleveren van de notificatie.|
|abonnementTypeIdabonnementType|IdentificatieAanduiding van het abonnement waarop deelnemer wil abonneren of geabonneerd moet worden.type|
|idTypeAbonnee|Aanduiding van het type Id dat moet worden meegegeven bij het afsluiten van het abonnement|
|idAbonnee|Daadwerkelijk identificatie conform bij idType geselecteerd id type|



#### 3.5.3.1 Voorbeeld abonneren

Voor het abonneren van een zorgaanbieder op het  iWlz-verplicht abonnement ‘Nieuwe bemiddeling voor zorgaanbieder’ moet het volgende worden aangeboden:


```
{
 "organisatieId": "c40b3669-1b06-4c99-8c84-f4fac1264b39",
 "abonnementTypeId": "NIEUWE_BEMIDDELING_VOOR_ZORGAANBIEDER",
 "idTypeAbonnee": "AgbCode",
 "idAbonnee": "12341234"
}
```


response: 


```
{
  "abonnementId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```



## 3.6 Verwijderen abonnement


```
Zie ook RFC008 - Hoofdstuk 3.2
```



### 3.6.1 Verwijderen abonnement iWlz-verplicht abonnement

De bronhouder verwijdert het abonnement van een deelnemer wanneer de partij geen deelnemer  meer is van de iWlz of een andere rol heeft. 



<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image8.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image8.png "image_tooltip")



|#|Beschrijving|Toelichting|
|--- |--- |--- |
|1|deelnemer verliest toegang|Een deelnemer kan de grondslag voor een iWlz verplicht abonnement verliezen. Bijvoorbeeld als de deelnemer geen iWlz zorgaanbieder meer is.|
|2|verwijder abonnement van deelnemer|De bronhouder verwijderd alle abonnementen op notificaties voor de deelnemer uit d abonnementenregistratie|


### 3.6.2 Verwijderen abonnement iWlz-vrijwillig abonnement

Wanneer een deelnemer bij een iWlz-vrijwillig abonnement ervoor kiest geen notificaties meer te ontvangen naar aanleiding van dat abonnement, kan de deelnemer zelf het abonnement opzeggen door het te verwijderen bij de bronhouder. 



<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image9.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image9.png "image_tooltip")



|#|Beschrijving|Toelichting|
|--- |--- |--- |
|1|abonnement verwijder verzoek {abonnementID}||
|2|verstuur verzoek {abonnementID}||
|3|verstuur verzoek||
|4|valideer verzoek||
|5|response {204}||
|6|response {204}||
|7|response {204}||
|ALT|Ongeldig abonnements verzoek||
|8|ongeldig verzoek||
|9|ongeldig verzoek||
|10|ongeldig verzoek||



