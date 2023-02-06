import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './FeedbackOptions/Notification/Notification';
import { Container } from './App.styled';
import { Wrapper } from './Section/Section.styled';

export default function FeedBack() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    const result = good + neutral + bad;
    return result;
  };

  const onLeaveFeedback = e => {
    if (e.target.name === 'good') {
      setGood(prevState => prevState + 1);
    }
    if (e.target.name === 'neutral') {
      setNeutral(prevState => prevState + 1);
    }
    if (e.target.name === 'bad') {
      setBad(prevState => prevState + 1);
    }
  };

  const countPositiveFeedbackPercentage = () => {
    const result = countTotalFeedback();
    const percentage = (good * 100) / result;
    return Math.round(percentage);
  };

  const objKey = ['good', 'neutral', 'bad'];

  return (
    <Wrapper>
      <Section title="Please leave feedback">
        <Container>
          <FeedbackOptions options={objKey} onLeaveFeedback={onLeaveFeedback} />
        </Container>
      </Section>

      {countTotalFeedback() === 0 ? (
        <Notification message="No feedback given" />
      ) : (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}
    </Wrapper>
  );
}
