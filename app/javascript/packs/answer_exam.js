import React, { Component } from 'react';
import { render } from 'react-dom';

class AnswerExam extends Component {
  constructor (props) {
    super(props);

    this.state = {
      title: '',
      questions: [],
      answers: [],
    };

    this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount () {
    const { subjectId, examId } = this.props;
    const authToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    const config = {
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': authToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'same-origin',
    };

    fetch(`/subjects/${subjectId}/exams/${examId}`, config)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { title, questions } = data;

        this.setState({ title, questions, answers: Array.from(Object.keys(questions)) });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSelectAnswer (event, key) {
    const { answers } = this.state;
    const { value } = event.target;

    const newAnswers = answers.map((answer, i) => {
      if (parseInt(key) !== i) return answer;

      return { selected: value };
    });

    this.setState({ answers: newAnswers });
  }

  handleFormSubmit (event) {
    event.preventDefault();

    const { answers } = this.state;
    const { subjectId, examId } = this.props;
    const content = answers.reduce((result, answer, index) => {
      result[index] = {};
      result[index] = answer.selected;
      return result;
    }, {});
    const data ={
      answer: {
        content,
      }
    };
    const authToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    const config = {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': authToken,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    };

    fetch(`/subjects/${subjectId}/exams/${examId}/answers`, config)
      .then(response => {
        console.log(response)
      })
      .then(error => {
        console.log(error);
      });
  }

  renderExamDetails () {
    const { title } = this.state;

    return (
      <div className="title">{title}</div>
    );
  }

  renderQuestions () {
    const { questions } = this.state;

    return (
      <ol className="questions">
        {Object.keys(questions).map(key => (
          <li className="question" key={key}>
            <div>{questions[key].item}</div>
            <div className="choices">
              <label>
                <input
                  type="radio"
                  name={`question-${key}`}
                  value={questions[key].answer}
                  onChange={(event) => this.handleSelectAnswer(event, key)}
                />
                {questions[key].answer}
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${key}`}
                  value="Wrong"
                  onChange={(event) => this.handleSelectAnswer(event, key)}
                />
                Wrong
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${key}`}
                  value="Another Wrong"
                  onChange={(event) => this.handleSelectAnswer(event, key)}
                />
                Another Wrong
              </label>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  render () {
    return (
      <form onSubmit={this.handleFormSubmit}>
        {this.renderExamDetails()}
        {this.renderQuestions()}
        <button>Submit</button>
      </form>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('answer-exam');
  const subjectId = container.getAttribute('data-subject-id');
  const examId = container.getAttribute('data-exam-id');

  render(
    <AnswerExam subjectId={subjectId} examId={examId} />,
    container,
  );
});
