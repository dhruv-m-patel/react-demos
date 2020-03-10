import React, { useState, useCallback } from 'react';
import Page from '../Page';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DifficultyLevel from './DifficultyLevel';
import TypingSpeedTester from './TypingSpeedTester';
import Countdown from './Countdown';

export default function TypingSpeedChecker() {
  const [difficultyLevel, setDifficultyLevel] = useState(undefined);
  const [testTimer, setTestTimer] = useState(undefined);
  const [isTesting, setIsTesting] = useState(false);
  const [score, setScore] = useState(0);

  const handleDifficulyLevelChange = useCallback(({ target }) => {
    setDifficultyLevel(target.value);
  }, []);

  const beginTestTimer = useCallback(() => {
    setIsTesting(true);
    const timer = setTimeout(() => {
      setIsTesting(false);
    }, 1 * 60 * 1000);
    setTestTimer(timer);
  }, []);

  const endTestTimer = useCallback(() => {
    clearTimeout(testTimer);
    setIsTesting(false);
    setTestTimer(undefined);
  }, [testTimer]);

  const handleWordsCorrectlyTyped = useCallback((requiredWords) => {
    setScore(score + requiredWords);
  }, [difficultyLevel, score]);

  return (
    <Page title="Typing Speed Checker" showHome>
      <Row>
        <Col sm={10}>
          <DifficultyLevel onChange={handleDifficulyLevelChange} />
        </Col>
        <Col sm={2}>
          <Button size="lg" variant="primary" onClick={beginTestTimer}>
            Begin Test
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <h3>Your Score: {score}</h3>
        </Col>
        {isTesting && (
          <Col style={{ textAlign: 'right' }}>
            <Countdown minutes={1} />
          </Col>
        )}
      </Row>
      <br />
      {isTesting && !!difficultyLevel && (
        <TypingSpeedTester
          difficultyLevel={difficultyLevel}
          onWordsCorrectlyTyped={handleWordsCorrectlyTyped}
          onEndTest={endTestTimer}
        />
      )}
      {!isTesting && score > 0 && (
        <h1>Your score is {score} per minute</h1>
      )}
    </Page>
  );
}
