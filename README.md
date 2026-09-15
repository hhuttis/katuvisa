# Katuvisa — Helsingin kadut

## Miten tämä on rakennettu

`index.html` on **pysyvä kuoritiedosto**. Se sisältää kaiken PWA-tekniikan
(nimi, ikonit, offline-tuki) ja avaa sisäänsä varsinaisen pelin. Peli itse on
`Katuvisa.dc.html`, joka on Claude Designin vienti sellaisenaan.

Tämä tarkoittaa, että **et koskaan enää nimeä mitään uudelleen etkä liitä
metatietoja käsin**. Juuri se askel meni aiemmin pieleen.

---

## Päivittäminen — kolme askelta

1. Vie peli Claude Designista.
2. GitHubissa **Add file** → **Upload files** → raahaa viedyt tiedostot
   (`Katuvisa.dc.html`, `support.js` ja kaikki `.js`-datatiedostot).
3. **Commit changes**. Odota minuutti ja avaa sovellus.

Älä nimeä mitään uudelleen. Samannimiset tiedostot korvaavat vanhat
automaattisesti.

`index.html`, `sw.js`, `manifest.webmanifest` ja ikonit pysyvät ennallaan —
niitä ei tarvitse viedä uudelleen koskaan.

Uusien alueiden lisääminen ei vaadi mitään erikoistoimia: raahaa vain uudet
datatiedostot mukana. Service worker löytää ne automaattisesti.

> **Poikkeus:** jos vaihdat pelin nimeä Claude Designissa, viedyn tiedoston
> nimi muuttuu. Silloin muuta `index.html`:n `<iframe src="...">`-riviä
> vastaamaan uutta nimeä, tai nimeä viety tiedosto takaisin muotoon
> `Katuvisa.dc.html`.

---

## Tiedostot

| Tiedosto | Muokkaatko? |
| --- | --- |
| `Katuvisa.dc.html` | Kyllä — korvautuu jokaisella viennillä |
| `support.js` | Kyllä — tulee viennin mukana |
| `map-data*.js`, `*-facts.js` | Kyllä — tulevat viennin mukana |
| `index.html` | Ei koskaan |
| `sw.js` | Ei koskaan |
| `manifest.webmanifest` | Ei koskaan |
| `icon-*.png`, `apple-touch-icon.png` | Ei koskaan |

Vanha `vendor`-kansio jää tässä mallissa käyttämättä. Voit poistaa sen tai
jättää paikalleen — se ei vaikuta mihinkään.

---

## Huomioita

**Ensimmäinen avaus vaatii verkkoyhteyden.** Claude Designin ajonaikainen
kirjasto hakee React-kirjaston unpkg.com-palvelusta ja ikonifontin Google
Fontsista. Service worker tallentaa molemmat välimuistiin, joten seuraavilla
kerroilla peli toimii myös offline. Jos ikonifontti ei ole vielä latautunut,
nappien tilalla näkyy hetken sanoja kuten `chevron_left` — se korjautuu
itsestään.

**Jos peli näyttää vanhalta päivityksen jälkeen:** sulje sovellus kokonaan
(pyyhkäise pois tehtävänvaihtajasta) ja avaa uudelleen. Vanha service worker
voi tarjoilla välimuistista yhden kerran ennen kuin uusi ottaa vallan.

**Kartta-aineisto** on OpenStreetMapista (ODbL). Maininta näkyy kartan
vasemmassa alakulmassa — pidä se paikallaan.

**Pisteet** tallentuvat vain selaimen muistiin. Ne eivät synkronoidu laitteiden
välillä eivätkä palaudu, jos selaimen data tyhjennetään.
