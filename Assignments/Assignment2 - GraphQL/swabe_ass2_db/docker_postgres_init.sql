CREATE TABLE Rooms
(
	uid VARCHAR(255) UNIQUE NOT NULL,
	roomNumber INT UNIQUE NOT NULL,
	available BOOLEAN NOT NULL,
	comment VARCHAR(255) NOT NULL,
	floor VARCHAR(50) NOT NULL,
	bedAmount INT NOT NULL,
	bedType VARCHAR(50) NOT NULL,
	roomServiceAvailable BOOLEAN NOT NULL,
	soundProof BOOLEAN NOT NULL,
	hasOwnTub BOOLEAN NOT NULL
	
);

INSERT INTO 
Rooms(uid, roomNumber, available, comment, floor, bedAmount, bedType, roomServiceAvailable, soundProof, hasOwnTub)
VALUES
('1', 420, FALSE, 'No dogs allowed', 'Ground Floor', 1, 'King', FALSE, TRUE, TRUE),
('2', 421, TRUE, 'Dogs allowed', 'Second Floor', 2, 'Normal', TRUE, FALSE, FALSE),
('3', 423, FALSE, 'Smoking Allowed', 'Basement', 4, 'King', TRUE, TRUE, TRUE);



CREATE TABLE Reservations
(
	uid VARCHAR(255) UNIQUE NOT NULL,
	roomuid VARCHAR(255) NOT NULL,
    fromdate VARCHAR(255) NOT NULL,
    todate VARCHAR(255) NOT NULL,
    nameofreserver VARCHAR(255) NOT NULL,
    emailofreserver VARCHAR(255) NOT NULL,
    comments VARCHAR(255) NOT NULL
);

INSERT INTO 
Reservations(uid, roomuid, fromdate, todate, nameofreserver, emailofreserver, comments)
VALUES
('1', '1', '2022-01-01 12:00:00', '2022-01-05 11:00:00', 'Andreas Vorgaard', 'andy@gmail.com', 'I would like a noose pre-hung please'),
('2', '1', '2022-05-01 12:00:00', '2022-01-10 24:00:00', 'Tobias Lund', 'tobias@gmail.com', 'Chokolade på puden tak'),
('3', '3', '2022-01-01 08:00:00', '2022-01-05 17:00:00', 'Thomas Berthel', 'thomas@gmail.com', 'Hvad skal jeg skrive her?') 


