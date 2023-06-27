# 4. Meldingen


## 4.1 Doel

Wanneer een deelnemer andere of nieuwe informatie heeft over gegevens in een register waar de deelnemer zelf geen bronhouder van is, kan die deelnemer dit melden aan de bronhouder via een melding. 

 

**Melding**: verzoek tot muteren of het beschikbaar stellen van nieuwe informatie naar aanleiding van een gebeurtenis van een afnemer aan een bron.



<p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image10.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image10.png "image_tooltip")


<p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image11.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image11.png "image_tooltip")



<table>
  <tr>
   <td>#
   </td>
   <td>Beschrijving
   </td>
   <td>Toelichting
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>melding aanmaken
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>melding verzenden
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>melding naar bronhouder
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>doorzetten melding
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>response {204}
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>response {204}
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>response {204}
   </td>
   <td>
   </td>
  </tr>
</table>


Voor meldingen zijn verschillende toepassingen te bedenken. De eerste toepassing is het melden van fouten op een bronregister wanneer de gegevens niet voldoen aan de regels van het informatiemodel iWlz. 


## 4.2 iWlz foutmeldingen

iWlz foutmeldingen zijn nodig om een bronhouder te attenderen op overtredingen van een regel in het informatiemodel iWlz. Wanneer een deelnemer een dergelijke situatie detecteert stuurt deze een (fout-)melding aan de bronhouder. 



<p id="gdcalert12" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image12.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert13">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image12.png "image_tooltip")



<table>
  <tr>
   <td><strong>#</strong>
   </td>
   <td><strong>Beschrijving</strong>
   </td>
   <td><strong>Toelichting</strong>
   </td>
  </tr>
  <tr>
   <td>0
   </td>
   <td>raadpleging
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>fout geconstateerd
   </td>
   <td>Na raadpleging van gegevens in een bronregister constateert de raadpleger een fout volgens de regels in het informatiemodel iWlz. De deelnemer maakt hiervoor een foutmelding aan met daarin het corresponderende foutcode van de regel die is overtreden
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>foutmelding verzenden
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>foutmelding naar bronhouder
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>doorzetten foutmelding
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>response {204}
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>response {204}
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>response {204}
   </td>
   <td>
   </td>
  </tr>
</table>



### 4.2.1 Inhoud iWlz Foutmelding

De inhoud is in structuur vergelijkbaar met de notificatie met vergelijkbare gegevens:


<table>
  <tr>
   <td><strong>Gegeven</strong>
   </td>
   <td><strong>Beschrijving</strong>
   </td>
  </tr>
  <tr>
   <td>afzenderID
   </td>
   <td>Identificatie van de afzender in het netwerk
   </td>
  </tr>
  <tr>
   <td>timestamp
   </td>
   <td>Tijdstip waarop de melding is aangemaakt
   </td>
  </tr>
  <tr>
   <td>meldingType
   </td>
   <td>Identificatie van het type melding. 
<p>
<em>(nu alleen iWlzFoutmelding)</em>
   </td>
  </tr>
  <tr>
   <td>melding
   </td>
   <td>inhoud van de melding (<em>nu alleen een retourcode of regelcode, maar kan in de toekomst ook een tekstuele suggestie voor verbetering zijn</em>)
   </td>
  </tr>
  <tr>
   <td>objectID
   </td>
   <td>Identificatie van het object waar de melding betrekking op heeft en eventueel input voor de raadpleging.
   </td>
  </tr>
</table>



#### 4.2.1.1 Voorbeeld iWlz Foutmelditng

Bij een indicatie voldoet in de klasse Stoornis de waarde van element DiagnoseSubcodelijst niet aan de gestelde regel IRG0012: DiagnoseSubcodelijst vullen conform opgegeven DiagnoseCodelijst. 


```
{
  "afzenderID": "89e0e41a-13df-4fe2-ad72-d9c32ca5641c",
  "timestamp": "2022-09-27T12:07:07.492Z",
  "meldingType": "IWLZ_FOUTMELDING",
  "melding": "IRG0012",
  "objectId": "https://api.ciz.nl/wlzindicatieregister/wlzindicaties/Stoornis/
              da8ebd42-d29b-4508-8604-ae7d2c6bbddd"
}
```


n.b. omdat het element niet afzonderlijk is te duiden, bevat het objectId de verwijzing naar het record in de klasse Stoornis.


<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
<p>
     Dit abonnement is afhankelijk van de wijziging in het Indicatieregister zoals beschreven in <<nummer RFC referentiegroep>>
