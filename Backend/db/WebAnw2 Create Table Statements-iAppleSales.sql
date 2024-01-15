-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Create Table Statements
-- iAppleSales

-- ------------------------------
-- Produkte
CREATE TABLE Produktkategorie (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL
);

CREATE TABLE Mehrwertsteuer (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	steuerSatz REAL NOT NULL DEFAULT 19.0
);

CREATE TABLE Download (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	dateipfad TEXT NOT NULL
);

CREATE TABLE Produkt (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	kategorieId INTEGER NOT NULL,
	bezeichnung TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	mehrwertsteuerId INTEGER NOT NULL,
	details TEXT DEFAULT NULL,
	nettopreis REAL NOT NULL DEFAULT 0.0,
	datenblattId INTEGER DEFAULT NULL,
	CONSTRAINT fk_Produkt1 FOREIGN KEY (kategorieId) REFERENCES Produktkategorie(id),
	CONSTRAINT fk_Produkt2 FOREIGN KEY (mehrwertsteuerId) REFERENCES Mehrwertsteuer(id),
	CONSTRAINT fk_Produkt3 FOREIGN KEY (datenblattId) REFERENCES Download(id)
);

CREATE TABLE Produktbild (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bildpfad TEXT NOT NULL,
	produktId INTEGER NOT NULL,
	CONSTRAINT fk_Produktbild1 FOREIGN KEY (produktId) REFERENCES Produkt(id)
);

-- ------------------------------
-- Person, Firma und Adresse
CREATE TABLE Land (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	kennzeichnung TEXT NOT NULL,
	bezeichnung TEXT NOT NULL	
);

CREATE TABLE Adresse (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	strasse TEXT NOT NULL,
	plz TEXT NOT NULL,
	ort TEXT NOT NULL,
	landId INTEGER NOT NULL,
	CONSTRAINT fk_Adresse1 FOREIGN KEY (landId) REFERENCES Land(id)
);

CREATE TABLE Person (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	anrede INTEGER NOT NULL DEFAULT 0,
	vorname TEXT NOT NULL,
	nachname TEXT NOT NULL,
	firma TEXT NOT NULL,
	ust TEXT NOT NULL,
	adresseId INTEGER NOT NULL,
	email TEXT NOT NULL,
	CONSTRAINT fk_Person1 FOREIGN KEY (adresseId) REFERENCES Adresse(id)
);

-- ------------------------------
-- Bestellwesen
CREATE TABLE Zahlungsart (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL
);

CREATE TABLE Bestellung (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bestellzeitpunkt TEXT NOT NULL,
	bestellerId INTEGER DEFAULT NULL,
	zahlungsartId INTEGER NOT NULL,
	CONSTRAINT fk_Bestellung1 FOREIGN KEY (bestellerId) REFERENCES Person(id),
	CONSTRAINT fk_Bestellung2 FOREIGN KEY (zahlungsartId) REFERENCES Zahlungsart(id)
);

CREATE TABLE Bestellposition (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bestellungId INTEGER NOT NULL,
	produktId INTEGER NOT NULL,
	menge INTEGER NOT NULL DEFAULT 1,
	CONSTRAINT fk_Bestellposition1 FOREIGN KEY (bestellungId) REFERENCES Bestellung(id),
	CONSTRAINT fk_Bestellposition2 FOREIGN KEY (produktId) REFERENCES Produkt(id)
);