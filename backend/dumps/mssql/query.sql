CREATE DATABASE NOC_TEST;

USE NOC_TEST;

CREATE TABLE Basisstationliste (
  BS_ID int NOT NULL,
  BS_DateTime varchar(50) NULL,
  BS_Bezeichnung varchar(50) NULL,
  BS_Ort varchar(50) NULL,
  BS_Adresse varchar(50) NULL,
  BS_User varchar(50) NULL,
  BS_Grund varchar(50) NULL,
  BS_Queue varchar(50) NULL
);

INSERT INTO Basisstationliste (
  BS_ID,
  BS_DateTime,
  BS_Bezeichnung,
  BS_Ort,
  BS_Adresse,
  BS_User,
  BS_Grund,
  BS_Queue
) VALUES (
  1,
  '2018-07-23 14:30:10.000',
  'BS_12266',
  NULL,
  NULL,
  'Robert 0160 1234567',
  'Inspektion',
  NULL
)
