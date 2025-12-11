# Preventivatore Veicoli


- Analisi di un brief e progettazione di una Web App
- Gestire la comunicazione tra frontend e backend tramite API REST
- Organizzare una logica applicativa
- Salvare e recuperare dati da un database

## Consegna

**📚 Nome repo: `preventivatore-veicoli`**

In questo progetto svilupperai un'applicazione web dedicata alla gestione dei preventivi per una concessionaria di veicoli. L'obiettivo è fornire all'operatore uno strumento intuitivo per simulare il preventivo d'acquisto di diversi tipi di veicoli, come auto, moto e furgoni.

L'applicazione permetterà di inserire i dati relativi al veicolo desiderato e associarli a un cliente. Sulla base di queste informazioni, il sistema calcolerà automaticamente un prezzo stimato, tenendo conto di eventuali promozioni applicabili.

Inoltre, l'operatore avrà la possibilità di salvare il preventivo generato, così da poterlo consultare in un secondo momento. Questa funzionalità è pensata per semplificare e velocizzare il processo di preventivazione, migliorando l'esperienza sia per i clienti che per il personale della concessionaria.

### UX/UI

L'obiettivo principale di questo progetto è la definizione delle logiche di calcolo e delle funzionalità di preventivazione. Per l'interfaccia utente, puoi concentrarti su una soluzione semplice e funzionale, anche utilizzando una libreria di componenti come [Bootstrap](https://getbootstrap.com/). Ad esempio, puoi ispirarti al layout del [form di checkout di Bootstrap](https://getbootstrap.com/docs/5.0/examples/checkout/) per la raccolta dei dati e la presentazione del preventivo.

### Requisito minimo

Implementa almeno **2 logiche di calcolo del prezzo** (oltre al prezzo base) e almeno **2 logiche di sconto** tra quelle descritte di seguito. Scegli tu quali, ma assicurati che siano ben documentate e testabili nell’applicazione. Spiega nel README quali logiche hai scelto e come sono state implementate.

### Attributi del Preventivo

Un preventivo di veicolo può essere caratterizzato dai seguenti attributi:

- **Tipo di veicolo**: `auto`, `moto`, `furgone`
- **Modello**: marca e modello del veicolo (`Fiat Panda`, `Yamaha MT-07`, `Ford Transit` ...)
- **Anno di immatricolazione**: anno in cui il veicolo è stato immatricolato
- **Cilindrata**: capacità del motore in cc (`1200`, `600`, `2000`, ...)
- **Alimentazione**: tipo di carburante (`benzina`, `diesel`, `elettrico`, `ibrido`, `gpl`)
- **Optional selezionati**: lista di optional scelti (`climatizzatore`, `navigatore`, `sensori di parcheggio`, ...)
- **Prezzo base**: prezzo iniziale del veicolo
- **Prezzo finale stimato**: prezzo calcolato con optional e parametri (`€13.500`)
- **Dati del richiedente**: dati dell’utente che richiede il preventivo
- **Data di creazione preventivo**: data in cui è stato generato il preventivo (`2024-06-10`)
- **Note aggiuntive**: informazioni extra inserite dall’utente

### Logiche di calcolo del prezzo

- **Prezzo base**
  Ogni veicolo ha un prezzo base predefinito, ad esempio: - Fiat Panda: **€12.000** - Yamaha MT-07: **€7.000** - Ford Transit: **€20.000**
- **Cilindrata**
  Per ogni 500cc oltre la soglia di 1000cc, aggiungi il **5%** al prezzo base. - Esempio: - Cilindrata 1500cc → +5% (una soglia superata) - Cilindrata 2200cc → +10% (due soglie superate)
- **Anno di immatricolazione**
  Considera l’anno corrente (**2025**). - Immatricolazione 2025: **nessuna variazione** - Immatricolazione 2023-2024: **4%** sul prezzo base - Immatricolazione 2021-2022: **8%** sul prezzo base - Immatricolazione 2020 o precedente: **12%** sul prezzo base
- **Alimentazione**
  - Benzina: **nessuna variazione**
  - Diesel: **3%**
  - Elettrico: **+10%**
  - Ibrido: **+5%**
  - Gpl: **5%**
- **Optional**
  Somma il costo di ogni optional selezionato. - Qualche esempio: - Climatizzatore: **€500** - Navigatore: **€300** - Sensori di parcheggio: **€200**

### Logiche di sconto

- Se l’utente seleziona almeno **3 optional**, applica uno **sconto del 3%** sul totale.
- Se il veicolo è stato immatricolato negli ultimi **12 mesi**, applica uno **sconto extra del 2%** sul totale.
- Se il prezzo finale supera i **€20.000**, applica uno **sconto del 5%** sulla parte eccedente.
- Se l’utente seleziona sia “climatizzatore” che “navigatore”, applica uno **sconto combinato di €100**.
- Se il richiedente è nuovo (primo preventivo salvato), applica uno **sconto di benvenuto del 2%**.

### Opzioni di consegna

1. **Frontend + API Rest (Node/PHP/JAVA)**
   - Sviluppo Web App di configurazione, salvataggio e consultazione
   - API pubblica per il recupero e il salvataggio dei dati

### ⚠️ Note Importanti

- Gestisci la validazione dei dati e dei campi obbligatori
- Gestisci i casi di errore (es. dati mancanti, formato non valido)
- Commenta il codice dove la logica è più complessa

### Bonus

🚀 **Bonus 1 - Stampa PDF Preventivo:**
Permetti all'utente di scaricare il preventivo in formato PDF.

🚀 **Bonus 2 - Invio Preventivo via Email:**
Permetti all'utente di ricevere il preventivo generato direttamente tramite email, integrando una funzionalità di invio automatico dal backend.

✨ **AI Bonus - Generazione dati veicoli:**
Genera con l'AI una lista di veicoli con attributi realistici (modello, anno, cilindrata, alimentazione, optional, prezzo base).

Questi dati possono essere usati per creare un modello statico.

Includi il file [**README.md**](http://readme.md/) in cui:

- Descrivi la struttura del tuo progetto
- Spiega le scelte implementative
- Documenta eventuali bonus realizzati

## Suggerimenti e Best Practices

- Dedica tempo all’analisi iniziale: comprendi a fondo il problema e definisci con chiarezza i requisiti prima di iniziare a sviluppare.
- Realizza uno schema o un diagramma (anche semplice, su carta) per rappresentare le componenti principali dell’applicazione e le loro interazioni.
- Individua i dati da gestire, definisci la loro struttura e scegli il formato più adatto per il salvataggio nel database.
- Decidi come suddividere le responsabilità tra frontend e backend, assegnando a ciascuno le logiche più appropriate.
- Scomponi il progetto in task o funzionalità più piccole per facilitare la pianificazione, lo sviluppo e il testing.
- Valuta soluzioni pratiche e semplificazioni che ti permettano di rispettare le tempistiche di consegna.

## Reference e Documentazione

- [La prova tecnica: dal brief alla progettazione (Notion)](https://www.notion.so/a700f410dd884fa3b2cb88dab2d4385c?pvs=21) – Guida all'analisi di un brief e alla progettazione di una soluzione.
