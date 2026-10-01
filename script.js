export function postotakNapretka(gotovo, ukupno) {
  return ukupno === 0 ? 0 : Math.round((gotovo / ukupno) * 100);
}

if (typeof document !== "undefined") {
  const kljuc = "deploy-test-zadaci";
  const obrazac = document.querySelector("#obrazac");
  const unos = document.querySelector("#novi-zadatak");
  const lista = document.querySelector("#zadaci");
  const stanje = document.querySelector("#stanje");
  const napredak = document.querySelector("#napredak");
  const prazno = document.querySelector("#prazno");

  let zadaci = [];
  try {
    const spremljeni = JSON.parse(localStorage.getItem(kljuc) || "[]");
    if (Array.isArray(spremljeni)) zadaci = spremljeni;
  } catch {
    zadaci = [];
  }

  function prikazi() {
    lista.innerHTML = "";

    zadaci.forEach((zadatak, indeks) => {
      const stavka = document.createElement("li");
      const oznaka = document.createElement("label");
      const kvacica = document.createElement("input");
      const brisanje = document.createElement("button");

      kvacica.type = "checkbox";
      kvacica.checked = zadatak.gotovo;
      kvacica.dataset.indeks = indeks;
      oznaka.append(kvacica, document.createTextNode(zadatak.tekst));

      brisanje.type = "button";
      brisanje.textContent = "Obriši";
      brisanje.dataset.obrisi = indeks;
      stavka.append(oznaka, brisanje);
      lista.append(stavka);
    });

    const gotovo = zadaci.filter((zadatak) => zadatak.gotovo).length;
    stanje.textContent = `${gotovo} od ${zadaci.length} zadataka završeno`;
    napredak.value = postotakNapretka(gotovo, zadaci.length);
    prazno.hidden = zadaci.length > 0;
  }

  function spremi() {
    localStorage.setItem(kljuc, JSON.stringify(zadaci));
    prikazi();
  }

  obrazac.addEventListener("submit", (event) => {
    event.preventDefault();
    const tekst = unos.value.trim();
    if (!tekst) return;
    zadaci.push({ tekst, gotovo: false });
    obrazac.reset();
    unos.focus();
    spremi();
  });

  lista.addEventListener("change", (event) => {
    const kvacica = event.target.closest("input[data-indeks]");
    if (!kvacica) return;
    zadaci[Number(kvacica.dataset.indeks)].gotovo = kvacica.checked;
    spremi();
  });

  lista.addEventListener("click", (event) => {
    const gumb = event.target.closest("button[data-obrisi]");
    if (!gumb) return;
    zadaci.splice(Number(gumb.dataset.obrisi), 1);
    spremi();
  });

  prikazi();
}
