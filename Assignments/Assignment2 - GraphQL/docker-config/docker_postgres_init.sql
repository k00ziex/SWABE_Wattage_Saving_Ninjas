CREATE TABLE Room
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

CREATE TABLE Reservation(
	uid VARCHAR(255) UNIQUE NOT NULL,
	reservationNumber INT UNIQUE NOT NULL,
	fromDate VARCHAR(255) NOT NULL,
	toDate VARCHAR(255) NOT NULL,
	nameOfReserver VARCHAR(255) NOT NULL,
	emailOfReserver VARCHAR(255) NOT NULL,
	commentsOfReserver VARCHAR(255) NOT NULL,
	discount BOOLEAN NOT NULL,
	totalMoneySaved INT NOT NULL
)

INSERT INTO 
Room(uid, roomNumber, available, comment, floor, bedAmount, bedType, roomServiceAvailable, soundProof, hasOwnTub)
VALUES
('1', 420, TRUE, 'No dogs allowed', 'Ground Floor', 1, 'King', FALSE, TRUE, TRUE),
('2', 421, FALSE, 'Dogs allowed', 'Second Floor', 2, 'Normal', TRUE, FALSE, FALSE),
('3', 423, TRUE, 'Smoking Allowed', 'Basement', 4, 'King', TRUE, TRUE, TRUE);

INSERT INTO
Reservation(uid, reservationNumber, fromDate, toDate, nameOfReserver, emailOfReserver, commentsOfReserver, discount, totalMoneySaved)
VALUES
('4', 520, '2022-10-12', '2022-10-19', 'John', 'John@gmail.com', 'I like this room', TRUE, 10),
('5', 521, '2022-10-12', '2022-10-19', 'Henry', 'Henry@gmail.com', 'I like this room too', TRUE, 15),
('6', 522, '2022-10-12', '2022-10-19', 'Frank', 'Frank@gmail.com', 'I like this room too too', TRUE, 20);