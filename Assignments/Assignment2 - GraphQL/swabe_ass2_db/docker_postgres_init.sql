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
('1', 420, TRUE, 'No dogs allowed', 'Ground Floor', 1, 'King', FALSE, TRUE, TRUE),
('2', 421, FALSE, 'Dogs allowed', 'Second Floor', 2, 'Normal', TRUE, FALSE, FALSE),
('3', 423, TRUE, 'Smoking Allowed', 'Basement', 4, 'King', TRUE, TRUE, TRUE);
