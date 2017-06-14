# ez-fasta

Модуль для работы с данными в [fasta](https://en.wikipedia.org/wiki/FASTA_format)-формате. 

```read(path)``` - читает файл (fasta) и возвращает промис для массива из объектов вида ```[... { label, sequence }]```.

```readSingle(path)``` - прочитает только первую последовательность из fasta-файла (даже если их там несколько), возвращает промис с объектом ```{ label, sequence }```.

```write(data, path)``` - создаёт корректный fasta-файл из массива объектов ```[... { label, sequence }]```.