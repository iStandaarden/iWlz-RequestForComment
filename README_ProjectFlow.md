Project board voor het volgen van de status van de RFC's van het iWlz netwerkmodel gedurende het Actieprogramma iWlz. Er worden 3 status bijgehouden, met eigen labels. 

Alle RFC staan in de repository [iWlz-RFC](https://github.com/iStandaarden/iWlz-RFC/blob/main/README.md).

## Project-flow

![Project RFC flow](/plantUMLsrc/rfc-flow.svg "project_rfc-flow")

## Toelichting Status
| [Fase van de RFC](#status-van-de-rfc) | [Status Dialoog](#status-dialoog)              | [Status Implementatie](#status-implementatie) | [Status Afsprakenstelsel](#status-afsprakenstelsel) |
|---------------------------------------|------------------------------------------------|-----------------------------------------------|-----------------------------------------------------|
| Backlog                               |                                                | -                                             | -                                                   |
| Draft                                 |                                                | -                                             | -                                                   |
| Dialoog                               | Opstellen / Review / Gereed / Review verwerken | -                                             | -                                                   |
| Eerst volgende                        |                                                | Concept / Definitief                          | -                                                   |
| Lopende                               |                                                | In productie                                  | Verwerken / Verwerkt                                |
| Vervallen                             |                                                | -                                             | -                                                   |


### Fase van de RFC

De Fase die de fase van de RFC beschrijft en volgt. Mogelijke fasen:

1. **Backlog**: Verzameling onderwerpen met potentie voor opstellen RFC
2. **Draft**: Opstellen van RFC. RFC is nog in draft, houtskool-schets, niet gereed voor review of voor uitwerking. De versie van het RFC in de ideevorming.
3. **Dialoog-versie**: RFC is door TEG geselecteerd als noodzakelijk voor de eerst volgende release. De RFC moet uitgewerkt worden. Fasen: Opstellen, Review, Review verwerken, Gereed. 
4. **Eerst volgende versie**: de versie waar consensus over gezocht wordt en waarin staat beschreven waaraan de eerstvolgende release in productie moet worden voldaan (Request for Change). De status van deze versie is: concept of definitief. Zolang over de oplossingsrichting nog geen consensus bestaat, is de status concept. Zodra consensus is binnen de koplopers over de inhoud bestaat, wordt de status definitief
5. **Lopende versie**: de versie die in productie is en door alle deelnemers moet worden ondersteund.
6. **Vervallen**: Archief van RFC's, die zijn komen te vervallen.
   
### Status Dialoog
Er is aangegeven dat het onderwerp onderdeel moet zijn van een volgende release en een RFC moet worden opgesteld.

1. **Opstellen**: RFC gereed maken voor review in technische groep
2. **(ter) Review**: RFC is gereed voor review door TEG-leden
3. **Gereed**: RFC is klaar voor beoordeling koplopers op impact en of RFC opgenomen kan worden in een volgende release
4. **Review verwerken**: Review commentaar op RFC, te verwerken.

### Status Implementatie

De status die de fase van Implementatie beschrijft en volgt. Nadat een RFC de **Dialoog fase** is gepasseerd, kan de RFC besproken worden onder de koplopers. Mogelijke fasen:

1. **Concept**: Impact is bepaald door koplopers en onderwerp voor eerst volgende implementatie. 
2. **Definitief**: RFC is akkoord en onderdeel van implementatie en implemenatie moment is bepaald
3. **In productie**: RFC is geimplementeerd

### Status Afsprakenstelsel

De Status die de fase van verwerken in het Afsprakenstelsel beschrijft en volg. Nadat een RFC is geimplementeerd (Implentatiefase = In productie), moet de RFC worden verwerkt in het afsprakenstelsel. Mogelijke fasen:

1. **Verwerken**: RFC kan verwerkt worden in het afsprakenstelsel
2. **Verwerkt**: RFC is verwerkt in het afsprakenstelsel