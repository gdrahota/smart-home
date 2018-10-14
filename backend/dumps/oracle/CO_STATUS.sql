CREATE TABLE CO_STATUS
(
  ID NUMBER NOT NULL,
  NAME VARCHAR2(64 BYTE)
);

Insert into CO_STATUS (ID,NAME) values ('1','in Koordinierung');
Insert into CO_STATUS (ID,NAME) values ('2','freigegeben');
Insert into CO_STATUS (ID,NAME) values ('3','in Durchführung');
Insert into CO_STATUS (ID,NAME) values ('4','erfolgreich durchgeführt');
Insert into CO_STATUS (ID,NAME) values ('5','nicht erfolgreich durchgeführt');
Insert into CO_STATUS (ID,NAME) values ('6','Change nicht durchgeführt');
Insert into CO_STATUS (ID,NAME) values ('7','geschlossen');
