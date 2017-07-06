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

fasta.read('./pathTo.fasta').then(data => console.log(data))
```

```read(path)``` - читает файл (fasta) и возвращает промис для массива из объектов вида ```[... { label, sequence }]```.

```readSingle(path)``` - прочитает только первую последовательность из fasta-файла (даже если их там несколько), возвращает промис с объектом ```{ label, sequence }```.

```readFromFolder(path)``` - читает все файлы из папки и возвращает промис для массива из объектов вида ```[... { label, sequence }]```. Внимание! Эта функция не делает никаких предварительных проверок на валидность входящих файлов и читает всё подряд.

```write(data, path)``` - создаёт корректный fasta-файл из массива объектов ```[... { label, sequence }]```.