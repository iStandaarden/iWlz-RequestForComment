# RFC0003a - Adresboek

**SAMENVATTING**

Dit document beschrijft de wijze waarop de adresseringsvoorziening binnen het iWlz-netwerkmodel wordt geïmplementeerd. Deze implementatie maakt gebruikt van RFC0002 Decentralized Identifiers iWlz-netwerkmodel.

---
**Inhoudsopgave**
- [RFC0003a - Adresboek](#rfc0003a---adresboek)
- [1. Inleiding](#1-inleiding)
  - [1.1 Uitgangspunten](#11-uitgangspunten)
- [2. Terminologie](#2-terminologie)
- [3. Functionaliteiten](#3-functionaliteiten)
- [4. Services](#4-services)
  - [4.1 Registers](#41-registers)
  - [4.2 Notificaties](#42-notificaties)
- [5 Foutmeldingen](#5-foutmeldingen)

---
# 1. Inleiding
>```Inleiding```
Binnen het iWLZ-netwerk worden gegevens uitgewisseld via REST-services (GraphQL), hierbij speelt het Adresboek een cruciale rol bij het faciliteren van het ontdekken en communiceren met beschikbare gegevensdiensten binnen het netwerk. Het fungeert als een register dat informatie bijhoudt over verschillende gegevensdiensten die worden aangeboden door verschillende netwerkdeelnemers. Het primaire doel van het adresboek is om gebruikers van gegevensbronnen in staat te stellen de juiste services te vinden, begrijpen en verbinden om aan hun behoeften te voldoen.
<br>
Informatie rodnom de diverse abonnementen en notificatietypen die per register beschikbaar zijn wordt vastgelegd in de Service Directory (RFC0016).

## 1.1 Uitgangspunten
- Het adresboek is uitsluitend toegankelijk voor netwerkdeelnemers.

# 2. Terminologie
Opsomming van de in dit document gebruikte termen.

| Terminologie | Omschrijving |
| -------- | :-------- | 

# 3. Functionaliteiten
De belangrijkste functionaliteiten van het Adresboek zijn:

1. Service Registratie: Gegevensbronnen registreren hun services bij het adresboek en verstrekken essentiële informatie over de service, zoals de naam, beschrijving, eindpunt-URL, ondersteunde operaties, invoer/uitvoerformaten, verificatievereisten en andere relevante metadata.

2. Service Discovery: Netwerkdeelnemers kunnen het adresboek bevragen om beschikbare services te ontdekken die aan hun specifieke behoeften voldoen. Ze kunnen zoeken naar services op basis van verschillende criteria, zoals de identiteit van de netwerkwerkdeelnemer of registertype.

3. Service Metadata en Documentatie: het adresboek biedt aanvullende details en documentatie over elke geregistreerde service, zodat netwerkdeelnemers de mogelijkheden, gebruiksrichtlijnen, invoer/uitvoerformaten en eventuele specifieke vereisten of beperkingen kunnen begrijpen.

4. Service Eindpuntresolutie: Bij het ontdekken van een gewenste service helpt het adresboek consumenten om de juiste eindpunt-URL te verkrijgen die nodig zijn om effectief met de service te communiceren.

Over het algemeen fungeert het adresboek als een centrale hub die netwerkdeelnemers in staat stelt hun services te publiceren EN afnemers van gegevens in staat stelt om de juiste services te ontdekken. Het vereenvoudigt het proces van integratie en orchestratie binnen het iWLZ-netwerk, en bevordert interoperabiliteit en efficiënte gegevensuitwisseling.

# 4. Services
Het adresboek bevat services voor het publiceren en ophalen van informatie over de diverse deelnemers binnen het iWLZ-netwerk.

## 4.1 Publiceren

## 4.2 Raadplegen

# 5 Foutmeldingen
>```Foutmeldingen.`
