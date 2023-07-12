# iWlz-RFC
Repostistory voor de RFC's van het Netwerkmodel iWlz.

- [iWlz-RFC](#iwlz-rfc)
  - [Prioritering en project](#prioritering-en-project)
  - [Inhoud](#inhoud)
    - [Vervallen RFC](#vervallen-rfc)
  - [Terminologie](#terminologie)
  - [Directory-structuur](#directory-structuur)
  - [Werkwijze](#werkwijze)
    - [Template RFC](#template-rfc)
    - [PlantUML-diagrammen](#plantuml-diagrammen)
  - [Contact](#contact)


## Overzicht STATUS en IMPLEMENTATIE
De RFC's worden geprioriteerd in het [**project RFC-netwerkmodel**](https://github.com/orgs/iStandaarden/projects/5). Ga naar dit project om de status en prioriteit te bekijken. De eerst volgende milestone zal de POC Bemiddeingsregister zijn. RFC's die hiervoor van belang zijn, zijn hier aan gelabeld. 
  - project view volgens [**STATUS RFC**](https://github.com/orgs/iStandaarden/projects/5/views/1)
  - project view volgens [**STATUS IMPLEMENTATIE**](https://github.com/orgs/iStandaarden/projects/5/views/5)

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
Om de leesbaarheid tussen de verschillende RFC's te bevorderen moet gebruik gemaakt worden van het template [RFC-template.md](/RFC-template.md). Het RFC bevat een aantal 'verplichte' onderdelen.  

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

## Contact
* Dennis de Gouw - [@dennisdegouw](https://github.com/dennisdegouw)
* Remo van Rest - [@rvanrest](https://github.com/rvanrest)
