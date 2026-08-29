# Katuvisa — julkaisuohje

Sovellus on **PWA** (progressive web app): tavallinen verkkosivu, jonka voi
lisätä puhelimen aloitusnäytölle. Se avautuu kuin sovellus ilman selainpalkkia,
toimii lentokonetilassa ja päivittyy ilman sovelluskauppaa.

---

## 1. Vie GitHubiin (GitHub Pages, ilmainen)

1. Kirjaudu **github.com** → oikea yläkulma **+** → **New repository**
2. Nimeksi esim. `katuvisa`, valitse **Public**, paina **Create repository**
3. Klikkaa **uploading an existing file** → raahaa **koko tämän kansion sisältö**
   selainikkunaan (myös `vendor`-alikansio) → **Commit changes**
4. **Settings** → vasemmalta **Pages** → *Source*: **Deploy from a branch** →
   haara **main**, kansio **/ (root)** → **Save**
5. Odota 1–2 minuuttia ja päivitä sivu. Osoite näkyy ylhäällä:
   `https://KÄYTTÄJÄNIMESI.github.io/katuvisa/`


---

## 2. Lisää puhelimen aloitusnäytölle

- **iPhone (Safari):** avaa osoite → jakonappi → **Lisää Koti-valikkoon**
- **Android (Chrome):** avaa osoite → ⋮ → **Lisää aloitusnäyttöön**

Ensimmäisen avauksen jälkeen peli toimii myös ilman verkkoyhteyttä.

---

## 3. Päivittäminen

1. Mene GitHubissa repositoryyn ja klikkaa muokattavaa tiedostoa
2. Kynäkuvake (**Edit this file**) → tee muutokset → **Commit changes**
3. Odota noin minuutti ja avaa sovellus puhelimessa verkkoyhteyden kanssa

Sovellus hakee tiedostot aina ensin verkosta ja käyttää välimuistia vain jos
yhteyttä ei ole, joten uusi versio tulee käyttöön seuraavalla avauksella. Jos
vanha versio jää jumiin: sulje sovellus kokonaan (pyyhkäise pois
tehtävänvaihtajasta) ja avaa uudelleen.

Jos teet Claude Designissa kokonaan uuden version, vie se uudelleen ja korvaa
`index.html` sekä muuttuneet `*.js`-tiedostot GitHubissa
(**Add file → Upload files**, sama tiedostonimi korvaa vanhan).

> Huom: Claude Design vie päätiedoston nimellä `Katuvisa.dc.html`. Nimeä se
> uudelleen muotoon `index.html` ennen kuin lataat sen GitHubiin — muuten
> selain ei löydä sitä automaattisesti. Lisää myös uudelleen ne rivit, jotka
> tässä versiossa on lisätty `<head>`-osioon (manifest, ikonit, `vendor`-skriptit
> ja service workerin rekisteröinti); helpointa on kopioida vanhan `index.html`:n
> `<head>` uuteen tiedostoon.

---

## Tiedostot

| Tiedosto | Mitä tekee |
| --- | --- |
| `index.html` | Sovelluksen rakenne ja logiikka (Claude Designin vienti) |
| `support.js` | Claude Designin ajonaikainen kirjasto — älä muokkaa |
| `map-data.js` | Helsingin keskustan kartta (kadut, korttelit, puistot) |
| `street-facts.js` | Katufaktat oletusmoodiin |
| `party-facts.js` | Katufaktat urbaaniin moodiin |
| `vendor/` | React-kirjasto paikallisena kopiona (toimii offline) |
| `manifest.webmanifest` | Kertoo puhelimelle nimen, värit ja ikonin |
| `sw.js` | Service worker: tallentaa sovelluksen offline-käyttöön |
| `icon-*.png`, `apple-touch-icon.png` | Kuvakkeet |

Kaikkien pitää olla samassa kansiossa, `vendor`-kansio omanaan. Älä nimeä uudelleen.

---

## Lähteet

Kartta-aineisto on **OpenStreetMapista** (ODbL). Maininta näkyy kartan
vasemmassa alakulmassa — pidä se paikallaan, jos julkaiset sovelluksen
laajemmin.

## Tallennus

Pisteet ja edistyminen tallentuvat vain selaimen muistiin — ne eivät synkronoidu
laitteiden välillä eivätkä palaudu, jos selaimen data tyhjennetään.
