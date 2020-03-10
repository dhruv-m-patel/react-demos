import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import generateWords from './generateWords'

const INPUTS_BY_DIFFICULTY_LEVEL = {
  'easy': ['WORD'],
  'medium': ['FIRST_WORD', 'SECOND_WORD'],
  'hard': ['FIRST_WORD', 'SECOND_WORD', 'THIRD_WORD'],
};

export default function TypingSpeedTester({
  difficultyLevel,
  onWordsCorrectlyTyped,
  onEndTest,
}) {
  const [enteredAllWordsCorrectly, setEnteredAllWordsCorrectly] = useState(false);
  const [currentWords, setCurrentWords] = useState([]);
  const [correctWords, setCorrectWords] = useState({});

  const generateRandomWords = useCallback(() => {
    const requiredWords = INPUTS_BY_DIFFICULTY_LEVEL[difficultyLevel].length;
    return generateWords(requiredWords);
  }, [difficultyLevel]);

  const handleWordChange = useCallback(({ target }, wordIndex) => {
    const enteredWord = target.value;
    if (enteredWord === currentWords[wordIndex]) {

      const correctlyEnteredWords = {
        ...correctWords,
        [wordIndex]: true,
      };

      setCorrectWords(correctlyEnteredWords);
      if (Object.keys(correctlyEnteredWords).length === currentWords.length) {
        setEnteredAllWordsCorrectly(true);
      }
    }
  }, [currentWords, correctWords]);

  useEffect(() => {
    if (enteredAllWordsCorrectly) {
      const requiredWords = INPUTS_BY_DIFFICULTY_LEVEL[difficultyLevel].length;
      onWordsCorrectlyTyped(requiredWords);
      setEnteredAllWordsCorrectly(false);
      setCorrectWords({});
      setCurrentWords(generateRandomWords());
    }
  }, [enteredAllWordsCorrectly, generateRandomWords]);

  useEffect(() => {
    const generatedWords = generateRandomWords();
    setCurrentWords(generatedWords);
  }, [generateRandomWords]);

  return (
    <React.Fragment>
      <Row>
        <Col sm={{ offset: 3, span: 6 }}>
          <h3>Enter words as displayed below:</h3>
          <br />
          <br />
          {!!currentWords.length && currentWords.map((word, index) => (
            <Form.Group key={`${word}_${index}`}>
              <Form.Label>{word}</Form.Label>
              <Form.Control
                type="text"
                name={INPUTS_BY_DIFFICULTY_LEVEL[difficultyLevel][index]}
                onChange={(e) => { handleWordChange(e, index); }}
                disabled={Object.keys(correctWords).includes(index.toString())}
              />
            </Form.Group>
          ))}
          <br />
          <br />
          <Button size="xl" variant="danger" onClick={onEndTest}>
            End Test
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
}

TypingSpeedTester.propTypes = {
  difficultyLevel: PropTypes.oneOf(['easy', 'medium', 'hard']),
  onWordsCorrectlyTyped: PropTypes.func,
  onEndTest: PropTypes.func,
};

TypingSpeedTester.defaultProps = {
  difficultyLevel: 'easy',
  onWordsCorrectlyTyped: () => {},
  onEndTest: () => {},
};
