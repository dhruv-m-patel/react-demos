import React, { useState, useCallback } from 'react';
import Page from '../Page';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import styled from 'styled-components';

const ROWS = ['A', 'B', 'C', 'D', 'H', 'I', 'J', 'K', 'L', 'M'];
const SEAT_SEQUENCE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const MOVIES = [
  { id: 0, movie: 'Select Movie' },
  { id: 1, movie: 'Sonic The Hedgehog' },
  { id: 2, movie: 'Frozen 2' },
  { id: 3, movie: 'Bad Boys For Life' },
  { id: 4, movie: 'Dolittle' },
];

const Seat = styled.div`
  display: inline-block;
  border: 2px solid grey;
  border-radius: 8px 9px 0 0;
  margin: 0.3rem 0.3rem 1.5rem;
  padding: 0.3rem 0.3rem 0;
  font-size: 1rem;
  font-weight: bold;
  width: 40px;
  text-align: center;

  &:hover,
  &.selected {
    background-color: #62DAFB;
    color: black;
    cursor: pointer;
    border-color: #62DAFB;
  }

  &.unavailable {
    background-color: grey;

    &:hover {
      cursor: crosshair;
      border-color: grey;
    }
  }

  &.seat4,
  &.seat16 {
    margin-right: 2rem;
  }
`;

const unavailableSeats = ['A1', 'A2', 'C10', 'C12', 'C13', 'G3', 'G4', 'G5'];

export default function MovieSeatBooking() {
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = useCallback((seatNumber) => {
    if ([unavailableSeats].includes(seatNumber)) {
      return;
    }

    if (!selectedSeats.includes(seatNumber)) {
      setSelectedSeats([].concat(selectedSeats, seatNumber));
    } else {
      setSelectedSeats(selectedSeats.filter(sn => sn === seatNumber));
    }
  }, [selectedSeats]);

  const handleMovieSelection = useCallback(({ target }) => {
    const { movie } = MOVIES.find(m => m.id === Number(target.value));
    setSelectedMovie(movie === 'Select Movie' ? undefined : movie);
  }, []);

  return (
    <Page title="Movie Seat Booking" showHome>
      <Row>
        <Col xs={6}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="movieSelection">Select Movie</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" aria-describedBy="movieSelection" onChange={handleMovieSelection}>
              {MOVIES.map(({ id, movie }) => (
                <option key={movie} value={id}>{movie}</option>
              ))}
            </Form.Control>
          </InputGroup>
        </Col>
        <Col xs={6}>
          Legend:
          &nbsp;
          <Seat>X</Seat> Available
          &nbsp;
          <Seat className="unavailable">X</Seat> Unavailable
          &nbsp;
          <Seat className="selected">X</Seat> Selected
        </Col>
      </Row>
      <br />
      <br />
      {!!selectedMovie && (
        <React.Fragment>
          <h4>Select Seats</h4>
          {ROWS.map(rowId => (
            <div key={rowId}>
              {SEAT_SEQUENCE.map(seat => {
                const seatNumber = `${rowId}${seat}`;

                const classes = [`seat${seat}`];
                if (selectedSeats.includes(seatNumber)) {
                  classes.push('selected');
                }
                if (unavailableSeats.includes(seatNumber)) {
                  classes.push('unavailable');
                }

                return (
                  <Seat
                    key={seatNumber}
                    className={classes.join(' ')}
                    onClick={() => { handleSeatClick(seatNumber); }}
                  >
                    {seatNumber}
                  </Seat>
                );
              })}
            </div>
          ))}
        </React.Fragment>
      )}
      {!!selectedMovie && !!selectedSeats.length && (
        <React.Fragment>
          <br />
          <br />
          Selected Movie: <strong>{selectedMovie}</strong>
          &nbsp;
          &nbsp;
          Selected Seats: {selectedSeats.map(seat => (
            <Seat key={seat} className="selected">
              {seat}
            </Seat>
          ))}
        </React.Fragment>
      )}
    </Page>
  );
}
