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


## Prioritering en project
De RFC's worden geprioriteerd in het [project RFC-netwerkmodel](https://github.com/orgs/iStandaarden/projects/5). Ga naar dit project om de status en prioriteit te bekijken. De eerst volgende milestone zal de POC Bemiddeingsregister zijn. RFC's die hiervoor van belang zijn, zijn hier aan gelabeld. 

## Inhoud
| RFC                                                                                    | onderwerp                                        | status       | issue                                                     |
|:---------------------------------------------------------------------------------------|:-------------------------------------------------|:-------------|:----------------------------------------------------------|
| [0001](RFC/RFC0001%20-%20Certificaatstructuur%20veilige%20verbinging.md)               | Certificaatstructuur veilige verbinding          | [klik hier](https://github.com/orgs/iStandaarden/projects/5)| [#3](https://github.com/iStandaarden/iWlz-RFC/issues/3)   |
| [0003](RFC/RFC0003%20-%20Adresboek.md)                                                 | Adresboek                                        | [klik hier](https://github.com/orgs/iStandaarden/projects/5)| [#4](https://github.com/iStandaarden/iWlz-RFC/issues/4)   |
| [0003a](RFC/RFC000a3%20-%20Adresboek.md)                                               | Adresboek                                        | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [#4](https://github.com/iStandaarden/iWlz-RFC/issues/4)   |
| [0004](/RFC/RFC0004%20-%20Verifiable%20Credentials.md)                                 | Verifiable Credentials                           | [klik hier](https://github.com/orgs/iStandaarden/projects/5)| [#5](https://github.com/iStandaarden/iWlz-RFC/issues/5)   |
| [0005](/RFC/RFC0005%20-%20Ledenadministratie%20Credential.md)                          | Ledenadministratie Credential                    | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [#6](https://github.com/iStandaarden/iWlz-RFC/issues/6)   |
| [0006](/RFC/RFC0006%20-%20AutorisatieCredential.md)                                    | Autorisatie Credential                           | [klik hier](https://github.com/orgs/iStandaarden/projects/5)| [#7](https://github.com/iStandaarden/iWlz-RFC/issues/7)   |
| [0008](RFC/RFC0008%20-%20Notificaties%20en%20Abonnementen.md)                          | Notificaties en abonnement                       | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [#2](https://github.com/iStandaarden/iWlz-RFC/issues/2)   |
| [0014](RFC//RFC0014%20-%20Functionele%20uitwerking%20aanvragen%20van%20autorisatie.md) | Functionele uitwerking van aanvragen autorisatie | [klik hier](https://github.com/orgs/iStandaarden/projects/5)| [#9](https://github.com/iStandaarden/iWlz-RFC/issues/9)   |
| [0016](/RFC/RFC0016%20-%20Service%20directory.md)                                      | Service Directory                                | [klik hier](https://github.com/orgs/iStandaarden/projects/5)| [#20](https://github.com/iStandaarden/iWlz-RFC/issues/20) |
| [0017](/RFC/RFC0017%20-%20Diensten.md)                                                 | Diensten                                         | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [#15](https://github.com/iStandaarden/iWlz-RFC/issues/15) |
| [0018](/RFC/RFC0018%20-%20(Fout-)meldingen.md)                                         | (Fout-)meldingen                                 | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [#16](https://github.com/iStandaarden/iWlz-RFC/issues/16) |
| [0019](/RFC/RFC0019%20-%20Logging.md)                                                  | Logging                                          | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [#17](https://github.com/iStandaarden/iWlz-RFC/issues/17) |
| [0020](/RFC/RFC0020%20-%20Verwijsindex%20&%20Cooperative%20Search.md)                  | Verwijsindex & cooperative search                | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [#19](https://github.com/iStandaarden/iWlz-RFC/issues/19) |
| [0021](/RFC/RFC0021%20-%20Contactgegevens%20cliënt%20(opvragen).md)                    | Contactgegevens client (opvragen)                | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [18](https://github.com/iStandaarden/iWlz-RFC/issues/18)  |
| [0022](/RFC/RFC0022%20-%20Lua-scripts%20Bemiddelingsregister.md)                       | Lua-script Bemiddelingsregister                  | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [#11](https://github.com/iStandaarden/iWlz-RFC/issues/11) |

### Vervallen RFC
|RFC | onderwerp | status | issue |
|:--|:--|:--| :--|
| [0013](/RFC/RFC0013%20-%20Identiteit.md)                                               | Identiteit                                       | [klik hier](https://github.com/orgs/iStandaarden/projects/5) | [#8](https://github.com/iStandaarden/iWlz-RFC/issues/8)   |



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
