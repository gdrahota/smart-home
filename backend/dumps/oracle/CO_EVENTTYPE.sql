CREATE TABLE CO_EVENTTYPE
(
  ID NUMBER NOT NULL,
  NAME VARCHAR2(64 BYTE)
);

Insert into CO_EVENTTYPE (ID,NAME) values ('21','Anmeldung');
Insert into CO_EVENTTYPE (ID,NAME) values ('22','Abmeldung');
Insert into CO_EVENTTYPE (ID,NAME) values ('23','Abmeldung und Durchführung erfolgreich');
Insert into CO_EVENTTYPE (ID,NAME) values ('24','Abmeldung und Durchführung nicht erfolgreich');
Insert into CO_EVENTTYPE (ID,NAME) values ('25','Abmeldung und Change nicht durchgeführt');
Insert into CO_EVENTTYPE (ID,NAME) values ('26','Durchführung erfolgreich');
Insert into CO_EVENTTYPE (ID,NAME) values ('27','Durchführung nicht erfolgreich');
Insert into CO_EVENTTYPE (ID,NAME) values ('28','Change nicht durchgeführt');
Insert into CO_EVENTTYPE (ID,NAME) values ('29','Anmeldung beim Bahnbetrieb durch NOC');
Insert into CO_EVENTTYPE (ID,NAME) values ('30','Abmeldung beim Bahnbetrieb durch NOC');
Insert into CO_EVENTTYPE (ID,NAME) values ('31','Reset');
