import React, { Component } from 'react';
import { render } from 'react-dom';

class AnswerExam extends Component {
  constructor (props) {
    super(props);

    this.state = {
      title: '',
      questions: [],
      answers: [],
      loading: false
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

        for (let question in questions) {
          this.fetchOtherChoices(questions[question], question);
        }
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
        return response.json();
      })
      .then(data => {
        this.setState({ loading: true })
        setTimeout(() => {
          console.log('Collection some information please wait..');
        }, 5000)
        const student = data.answer.student_id
        const exam =  data.answer.exam_id
        const answer = data.answer.id
        window.location = `/subjects/${student}/exams/${exam}/answers/${answer}/results`
      })
      .then(error => {
        console.log(error);
      });
  }

  renderExamDetails () {
    const { title } = this.state;

    return (
      <div className="title">
        <h4 className="h4">{title}</h4>
      </div>
    );
  }

  renderQuestions () {
    const { questions } = this.state;

    return (
      <ol className="questions">
        {Object.keys(questions).map(key => (
          <li className="question" key={key}>
            <div className="strong">{questions[key].item}</div>
            {this.renderChoices(key)}
          </li>
        ))}
      </ol>
    );
  }

  renderChoices (key) {
    const { questions } = this.state;

    if (questions[key].choices) {
      return (
        <div className="choices">
          <label className="radio-inline">
            <input
              type="radio"
              name={`question-${key}`}
              value={questions[key].answer}
              onChange={(event) => this.handleSelectAnswer(event, key)}
            />
            {questions[key].answer}
          </label>
          {questions[key].choices.map(choice => (
            <label key={choice} className="radio-inline">
              <input
                type="radio"
                name={`question-${key}`}
                value={choice}
                onChange={(event) => this.handleSelectAnswer(event, key)}
              />
              {choice}
            </label>
          ))}
        </div>
      );
    }

    return <div />;
  }

  fetchOtherChoices (question, index) {
    const url = `https://api.datamuse.com/words?sl=${question.answer}&max=3`;
    const config = {
      method: 'GET',
    };

    fetch(url, config)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { questions } = this.state;
        const newChoices = data.map(d => d.word );
        const newQuestions = Object.keys(questions).map( key => {
          if (index !== key) return questions[key];

          return { ...questions[key], choices: newChoices };
        });

        this.setState({ questions: newQuestions });
      });

  }

  render () {
    if (this.state.loading) return <p><i className='icon ion-load-c spinner' />Loading</p>

    return (
      <form onSubmit={this.handleFormSubmit}>
        {this.renderExamDetails()}
        {this.renderQuestions()}
        <hr />
        <button className="btn btn-primary">Submit</button>
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
