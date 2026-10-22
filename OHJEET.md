# Työvuorokalenteri – offline/PWA-paketti

Kaikki tiedostot ovat tässä kansiossa, eikä sovellus lataa mitään netistä. Pidä kansion rakenne ennallaan.

## Kokeilu tietokoneella
Service worker ja PDF-lukija vaativat sen, että sivu avataan palvelimelta (ei suoraan tiedostona).
`python3 -m http.server 8000` kansiossa ja avaa http://localhost:8000

## Asennus puhelimeen (PWA)
1. Lataa kansio ilmaiseen palveluun, esim. GitHub Pages tai Netlify Drop (https-osoite).
2. Avaa osoite puhelimen Chromessa, valitse valikosta "Asenna sovellus" / "Lisää aloitusnäytölle".
3. Avaa sovellus kerran verkossa, jolloin tiedostot tallentuvat. Sen jälkeen se toimii ilman verkkoa.

## APK
- **PWABuilder.com**: syötä https-osoite, valitse Android, lataa paketti. Päivitykset: korvaa tiedostot palvelimella, APK:ta ei tarvitse tehdä uudelleen.
- **Capacitor**: kopioi tämän kansion sisältö kansioon `www`, aja `npx cap sync android` ja rakenna Android Studiossa.

## Muutosten tekeminen jälkeenpäin
1. Muokkaa tiedostoa (yleensä `index.html`).
2. Avaa `sw.js` ja kasvata numeroa: `const VERSION = 'v2';`. Muuten puhelin voi käyttää vanhaa tallennettua versiota.
3. Julkaise tiedostot uudelleen. Vuorot ja ajosarjat säilyvät puhelimessa.

## Huomioita
- Fontti "Plus Jakarta Sans" ei ole mukana (se ladattiin aiemmin netistä), joten käytetään puhelimen omaa fonttia.
- Tailwind-tyylit on esikäännetty `css/tailwind.css`-tiedostoon. Jos lisäät uusia Tailwind-luokkia, tiedosto pitää generoida uudelleen. Kysy apua.
- Vaatii nykyaikaisen Chromen tai Android WebView:n (versio 111 tai uudempi).
