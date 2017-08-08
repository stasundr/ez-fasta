# ez-fasta
Модуль для работы с данными в [fasta](https://en.wikipedia.org/wiki/FASTA_format)-формате. 

## Installation
Для работы требуется [```node```](https://nodejs.org).
```
npm install ez-fasta
```

## Usage example
```
const fasta = require('ez-fasta');

fasta
  .read('./pathTo.fasta')
  .then(data => console.log(data))
```

Хорошо работает с async/await:
```
async function analyze(folder) {
  const samples = await fasta.readFromFolder(folder);
  const reference = await fasta.readSingle('./path/to/reference.fa');
  const dataset = [reference, ...samples];

  // Do your stuff
  // align(dataset)

  for (sample of samples) {
    // Do your stuff
    console.log(`${sample.label} - ${sample.sequence.length} bp`);
  }

  return;
}
```

```read(path)``` - читает файл (fasta) и возвращает промис для массива из объектов вида ```[... { label, sequence }]```.

```readSingle(path)``` - прочитает только первую последовательность из fasta-файла (даже если их там несколько), возвращает промис с объектом ```{ label, sequence }```.

```readFromFolder(path)``` - читает все файлы из папки и возвращает промис для массива из объектов вида ```[... { label, sequence }]```. Внимание! Эта функция не делает никаких предварительных проверок на валидность входящих файлов и читает всё подряд.

```write(data, path)``` - создаёт корректный fasta-файл из объекта ```{ label, sequence }``` или из массива объектов ```[... { label, sequence }]```.

---
Take a look at [mtget](https://github.com/stasundr/mtget), a tiny nodejs program, if you need to download fasta sequences from [GenBank](https://www.ncbi.nlm.nih.gov/genbank/).