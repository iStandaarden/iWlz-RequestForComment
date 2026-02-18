# iWlz-Request For Comments
Repostistory voor de RFC's van het Netwerkmodel iWlz.

- [iWlz-Request For Comments](#iwlz-request-for-comments)
  - [Overzicht STATUS en IMPLEMENTATIE](#overzicht-status-en-implementatie)
    - [Leeswijzer](#leeswijzer)
  - [Terminologie](#terminologie)
  - [Directory-structuur](#directory-structuur)
  - [Werkwijze](#werkwijze)
    - [Template RFC](#template-rfc)
    - [PlantUML-diagrammen](#plantuml-diagrammen)
  - [Git](#git)
    - [Git-introductie](#git-introductie)
    - [Populaire Populaire lokale Git-clients](#populaire-populaire-lokale-git-clients)
    - [Stappen voor samenwerking met Git en een Git-client](#stappen-voor-samenwerking-met-git-en-een-git-client)
  - [Contact](#contact)


## Overzicht STATUS en IMPLEMENTATIE
De RFC's worden geprioriteerd in het [**project RFC-netwerkmodel**](https://github.com/orgs/iStandaarden/projects/5). Ga naar dit project om de status en prioriteit te bekijken. De eerst volgende milestone zal de POC Bemiddeingsregister zijn. RFC's die hiervoor van belang zijn, zijn hier aan gelabeld. 
  - project view volgens [**STATUS RFC**](https://github.com/orgs/iStandaarden/projects/5/views/1)
  - project view volgens [**STATUS IMPLEMENTATIE**](https://github.com/orgs/iStandaarden/projects/5/views/5)

### Leeswijzer
Bekijk voor de samenhang van de verschillende status van een RFC de [**Leeswijzer Project-flow >>**](/README_ProjectFlow.md).

## Terminologie
De verklaring van de in de RFC's gebruikte termen zijn te vinden in het Afsprakenstelsel en [hier](/Terminologie.md).

## Directory-structuur
|dir|toelichting|
|:--|:--|
| /.github| bevat github-action voor het automatisch genereren .puml files|
| /RFC | bevat de RFC documentatie per onderwerp|
| /plantUMLsrc | plantUML source en gegenereerde .svg files|

## Werkwijze
Maak een RFC aan in [markdown-format](https://www.markdownguide.org) en plaats deze in de map /RFC. Neem contact op bij vragen. 

### Template RFC
Om de leesbaarheid tussen de verschillende RFC's te bevorderen moet gebruik gemaakt worden van het template [RFC-template.md](/template/RFC%20-%20Template.md). Het RFC bevat een aantal 'verplichte' onderdelen.  

### PlantUML-diagrammen
Gebruik je in de RFC PlanUML-diagrammen dan is het voor github eerst noodzakelijk van de plantUML-file (.puml) eerst een svg te laten genereren. Github ondersteund het opnemen van plantuml in Markdown files niet. 

Werkwijze:
- Plaats de plantuml-file in de directory \plantUMLsrc. Geef de file een logische, herkenbare naam die verwijst naar de RFC waarin deze wordt gebruikt. Bijvoorbeeld "rfc008-01-melding_notificatie.puml". 
- Na de commit zorgt een github-action ervoor dat er een gelijknamige .svg wordt aangemaakt die direct leesbaar is in een markdown-file
- Neem in de oorspronkelijk RFC een verwijzing op naar het gegenereerde .svg. Bijvoorbeeld in de RFC008: 
    ```
    ![notificatie_melding](../plantUMLsrc/rfc008-01-notificatie_melding.svg "notificatie_melding")
    ```
- Daarna is het gegeneerde diagram zichtbaar in de RFC

## Git

### Git-introductie
Git is een gedistribueerd versiebeheersysteem dat wordt gebruikt voor het bijhouden van wijzigingen in bestanden en samenwerken aan projecten met anderen. Het biedt de mogelijkheid om wijzigingen vast te leggen, branches te maken en samen te werken aan softwareprojecten. Git kan zowel lokaal als via GitHub.com worden gebruikt. Hier bespreken we zowel het gebruik van Git op [Github.com](https://gitHub.com) als het gebruik van populaire lokale Git-clients als alternatief.

### Populaire Populaire lokale Git-clients
Een lijst van drie populaire lokale Git-clients, samen met links naar hun websites voor meer informatie:
1. GitHub Desktop: https://desktop.github.com/
2. GitKraken: https://www.gitkraken.com/
3. Sourcetree: https://www.sourcetreeapp.com/

Deze lokale Git-clients bieden een gebruiksvriendelijke interface voor het beheren van Git-repositories en maken het eenvoudiger om branches te maken, wijzigingen vast te leggen, commits te maken en samen te werken aan projecten. Ze zijn een handig alternatief voor ontwikkelaars die de voorkeur geven aan een visuele interface voor Git-beheer. 

### Stappen voor samenwerking met Git en een Git-client
1. **Git-client installeren:** Zorg ervoor dat je een Git-client naar keuze hebt geïnstalleerd op je computer. Dit stelt je in staat om Git-repositories te beheren en samen te werken met anderen.

2. **Repository klonen:** Gebruik de Git-client om een kopie van het gewenste Git-repository naar je lokale computer te klonen. Je hebt de URL van het Git-repository nodig om dit te doen.

3. **Branch maken:** Maak een nieuwe branch aan om aan je wijzigingen te werken. Geef de branch een duidelijke naam die de aard van je wijzigingen weerspiegelt.

4. **Wijzigingen aanbrengen:** Gebruik een teksteditor of een Markdown-editor naar keuze om de gewenste Markdown-bestanden te bewerken in je lokale kloon van het repository. Voeg wijzigingen, toevoegingen of correcties toe zoals nodig.

5. **Commits maken:** Nadat je wijzigingen hebt aangebracht, maak je "commits" om deze wijzigingen te verzenden naar je lokale branch. Geef elke commit een beschrijvende commit-boodschap, zodat het duidelijk is wat er is gewijzigd.

6. **Push naar het repository:** Wanneer je klaar bent om je wijzigingen te delen, gebruik je de Git-client om je lokale branch naar het externe repository te "pushen". Dit zal je wijzigingen beschikbaar maken voor anderen om te bekijken.

7. **Feedback en samenwerking:** Als je samenwerkt met anderen, kunnen zij ook branches maken, wijzigingen aanbrengen en deze pushen naar hetzelfde repository. Jullie kunnen de wijzigingen in elkaars branches beoordelen en opmerkingen toevoegen.

8. **Pull updates:** Om wijzigingen van anderen in je lokale repository te krijgen, kun je de "pull" of "fetch" functie van je Git-client gebruiken om de wijzigingen van de hoofdbranch of andere branches binnen te halen.

9. **Conflicten oplossen:** Als er conflicten optreden wanneer meerdere mensen tegelijkertijd aan hetzelfde Markdown-bestand werken, moeten deze conflicten worden opgelost voordat de wijzigingen kunnen worden samengevoegd. De Git-client biedt hulpmiddelen om conflicten op te lossen.

Door deze stappen te volgen, kun je effectief samenwerken aan Markdown-bestanden in een Git-client zonder de (GUI) GitHub te gebruiken. Dit helpt bij het behouden van de integriteit van je documentatie en het bevordert een gestroomlijnde samenwerking.

## Contact
* Dennis de Gouw - [@dennisdegouw](https://github.com/dennisdegouw)
* Remo van Rest - [@rvanrest](https://github.com/rvanrest)
