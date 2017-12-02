import React, { Component } from 'react';
import { render } from 'react-dom';
import moment from 'moment';

class CreateExam extends Component {
  constructor (props) {
    super(props);

    this.state = {
      title: '',
      duration: 0,
      items: [
        { question: '', answer: '' },
      ],
    };

    this.addItem = this.addItem.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleTitleChange (event) {
    this.setState({ title: event.target.value });
  }

  handleDurationChange (event) {
    let duration;
    const value = event.target.value;

    if (value.length > 0) {
      duration = moment(value, 'HH:mm').diff(moment().startOf('day'), 'seconds');
    } else {
      duration = 0;
    }

    this.setState({ duration });
  }

  handleItemChange (event, index, field) {
    const { items } = this.state;
    const newItems = items.map((item, i) => {
      if (index !== i) return item;

      if (field === 'answer') {
        return { ...item, answer: event.target.value };
      }

      return { ...item, question: event.target.value };
    });

    this.setState({ items: newItems });
  }

  handleFormSubmit (event) {
    event.preventDefault();

    const { title, duration, items } = this.state;
    const { subjectId } = this.props;
    const questions = items.reduce((result, item, index) => {
			result[index] = {};
			result[index]['item'] = item.question;
			result[index]['answer'] = item.answer;
			return result;
		}, {});
    const data = {
      exam: {
        title,
        duration,
        questions,
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

    fetch(`/subjects/${subjectId}/exams`, config)
      .then(response => {
        return response.json();
      })
      .then(data => {
        window.location = `/subjects/${subjectId}`
      })
      .catch(error => {
        console.log(error);
      });
  }

  addItem () {
    const { items } = this.state;

    this.setState({
      items: [
        ...items,
        { question: '', answer: '' },
      ],
    });
  }

  removeItem (index) {
    const { items } = this.state;
    const newItems =  items.filter((item, i) => index !== i);

    this.setState({ items: newItems });
  }

  renderTitleInput () {
    const { title } = this.state;
    const { subjectTitle } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={`${title}-label`}>Title</label>
        <input
          id={`${title}-label`}
          type="text"
          placeholder={`Title for ${subjectTitle}`}
          className="form-control"
          value={title}
          onChange={this.handleTitleChange}
        />
      </div>
    );
  }

  renderDurationInput () {
    const { duration } = this.state;
    const convertedDuration = moment()
      .startOf('day')
      .seconds(duration)
      .format('HH:mm');

    return (
      <div className="form-group">
        <label htmlFor="timedurationlabel">Time Duration</label>
        <input
          id="timedurationlabel"
          type="text"
          placeholder="00:00"
          className="form-control"
          value={convertedDuration}
          onChange={this.handleDurationChange}
        />
      </div>
    );
  }

  renderQuestionInputs () {
    const { items } = this.state;

    return (
      <section className="qna">
        {items.map((item, index) => (
          <div key={index} className="qna-row">
              <div className="form-group">
                <label htmlFor={`question-${index}`}>Question #{index+1}</label>
                <input
                  id={`question-${index}`}
                  type="text"
                  placeholder="Question"
                  className="form-control"
                  value={item.question}
                  onChange={(event) => this.handleItemChange(event, index, 'question')}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`answer-${index}`}>Answer</label>
                <input
                  id={`answer-${index}`}
                  type="text"
                  placeholder="Answer"
                  className="form-control"
                  value={item.answer}
                  onChange={(event) => this.handleItemChange(event, index, 'answer')}
                />
              </div>
            <a
              className="btn-delete"
              onClick={() => this.removeItem(index)}
              title="delete"
              >
              <i className="icon ion-ios-close-outline" />
            </a>
          </div>
        ))}
        <a className="btn-link" onClick={this.addItem}>
          <i className="icon ion-ios-plus-empty" />
          &nbsp;ADD ITEM
        </a>
      </section>
    );
  }

  renderQuestions () {
    return (
      <div className="questions">
        {this.renderQuestionInputs()}
      </div>
    );
  }

  render () {
    return (
      <div className="card">
        <form onSubmit={this.handleFormSubmit} className="clearfix">
          {this.renderTitleInput()}
          {this.renderDurationInput()}
          <hr />
          {this.renderQuestions()}
          <button className="btn btn-success pull-right" type="button">Submit</button>
        </form>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('create-exam');
  const subjectId = container.getAttribute('data-subject-id');
  const subjectTi = container.getAttribute('data-subject-title');

  render(
    <CreateExam subjectId={subjectId} subjectTitle={subjectTi} />,
    container,
  );
});
