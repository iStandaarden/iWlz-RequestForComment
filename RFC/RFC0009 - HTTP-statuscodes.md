![header](../imagesrc/ZinBanner.png "template_header")

# RFC0009 - HTTP-statuscodes (vervallen)

> [!WARNING]
> **Deprecated. Vervangen door [RFC0040 - GraphQL HTTP-statuscodes](https://github.com/iStandaarden/iWlz-RequestForComment/blob/main/RFC/RFC0040%20-%20GraphQL%20http-statuscodes.md)** 

<font size="4">**SAMENVATTING**</font>

**Huidige situatie:**

>```nog invullen```

**Beoogde situatie**

>```nog invullen```

<font size="4">**Status RFC**</font>

Volg deze [link](https://github.com/iStandaarden/iWlz-RFC/issues/12) om de actuele status van deze RFC te bekijken.

---
**Inhoudsopgave**
- [RFC0009 - HTTP-statuscodes (vervallen)](#rfc0009---http-statuscodes-vervallen)
- [1. Inleiding](#1-inleiding)
  - [1.1 Uitgangspunten](#11-uitgangspunten)
- [2. Statuscodes](#2-statuscodes)

---
# 1. Inleiding
Deze RFC beschrijft de afspraken rondom het gebruik van HTTP-statuscodes in het iWlz-netwerkmodel.

## 1.1 Uitgangspunten
>```nog invullen```

# 2. Statuscodes
In de tabel hieronder worden per HTTP-statuscode de beschrijving, de betekenis en een voorbeeld van toepassing in het iWlz-netwerkmodel beschreven.

| Waarde | Beschrijving | Betekenis | Voorbeeld in iWlz-netwerkmodel |
|--------|--------------|-----------|----------------------------------|
| _**2xx**_    | _**Correcte status HTTP-server**_  | | |
| 200    | OK | Geeft aan dat het verzoek is geslaagd. | Bron beschikbaar, Raadpleeg indicatie verzoek ontvangen |
| 201    | CREATED | Geeft aan dat het verzoek is geslaagd en dat er een nieuwe bron is gemaakt als resultaat. | Abonnement aangemaakt |
| 202    | ACCEPTED | Geeft aan dat het verzoek is ontvangen maar nog niet is voltooid. | Wordt meestal gebruikt voor langlopende verzoeken en batchverwerking. |
| 204    | NO CONTENT | De server heeft aan het verzoek voldaan maar hoeft geen responslichaam terug te sturen. | De server kan de bijgewerkte metagegevens retourneren. |
| _**4xx**_     | _**Probleemstatus bij HTTP-client**_  | | |
| 400    | BAD REQUEST | Het verzoek kon niet worden begrepen door de server vanwege een onjuiste syntaxis. | Ongeldig Wlz-indicatie-ID |
| 401    | UNAUTHORIZED | Geeft aan dat het verzoek gebruikersauthenticatie-informatie vereist. | Raadpleging met ontbrekende autorisatie-header |
| 403    | FORBIDDEN | Ongeautoriseerd verzoek. De client heeft geen toegangsrechten tot de inhoud. | Raadpleging gecombineerd met onvoldoende rechten |
| 404    | NOT FOUND | De server kan de gevraagde bron niet vinden. | Geen Wlz-indicatie gevonden |
| 429    | TOO MANY REQUEST | De gebruiker heeft te veel verzoeken verzonden binnen een bepaalde tijd ("rate limiting"). | DDoS-aanval vanuit een gehackte zorgaanbieder |
| _**5xx**_    | _**Probleemstatus bij HTTP-server**_ | | |
| 500    | INTERNAL SERVER ERROR | De server heeft een onverwachte voorwaarde aangetroffen die het verhinderde om aan het verzoek te voldoen. | Er is een onverwachte (technische) fout opgetreden in het nID stelsel. |
| 503    | SERVICE UNAVAILABLE | De server is niet gereed om het verzoek te verwerken. | Geretourneerd wanneer een service is uitgeschakeld vanwege bijvoorbeeld onderhoud of overbelasting. |
| 504    | GATEWAY TIMEOUT | De server, terwijl hij fungeerde als een gateway of proxy, kreeg geen tijdige reactie van de upstream-server die nodig was om het verzoek te voltooien. | In het iWlz-netwerkmodel kunnen datastations alleen met elkaar communiceren via nID (nID = gateway), indien nID geen antwoord binnen de gestelde tijd ontvangt van de bestemmingsretourneert nID een 504. |
