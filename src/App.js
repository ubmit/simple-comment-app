import React, { Component } from "react";

export default class App extends Component {
  state = {
    isDisabled: true,
    textAreaContent: "",
    comments: []
  };

  componentDidMount() {
    this.textInput.focus();
  }

  componentDidUpdate() {
    this.textInput.focus();
  }

  renderComments() {
    return this.state.comments.map(({ id, content }) => {
      return (
        <li data-testid="comment-content" key={id} style={styles.comment}>
          {content}
        </li>
      );
    });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      isDisabled: value === "" ? true : false,
      textAreaContent: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState(prevState => ({
      isDisabled: true,
      textAreaContent: "",
      comments: [
        ...prevState.comments,
        {
          id: Math.floor(Math.random() * 1000),
          content: this.state.textAreaContent
        }
      ]
    }));
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h1>simple comment app</h1>

          <form
            style={styles.form}
            onSubmit={event => this.handleSubmit(event)}
          >
            <textarea
              ref={element => (this.textInput = element)}
              placeholder="write your comment"
              value={this.state.textAreaContent}
              cols="30"
              rows="10"
              onChange={event => this.handleChange(event)}
            />
            <button
              type="submit"
              disabled={isDisabled}
              style={isDisabled ? styles.disabledButton : styles.button}
            >
              {isDisabled ? "disabled" : "submit"}
            </button>
          </form>

          <div style={styles.commentsSection}>
            <h3>comments</h3>
            <ul style={styles.commentsList}>{this.renderComments()}</ul>
          </div>
        </div>

        <div style={styles.footer}>
          <a
            href="https://github.com/kentcdodds/react-testing-library"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            react-testing-library
          </a>
        </div>
      </div>
    );
  }
}

const theme = {
  colors: {
    primary: "#000",
    secondary: "#FFF",
    disabled: "#999"
  },
  fonts: {
    primary: "monospace"
  }
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    flex: "1",
    marginTop: "60px",
    fontFamily: theme.fonts.primary
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "500px",
    marginTop: "15px"
  },
  button: {
    all: "unset",
    borderRadius: "5px",
    padding: "10px",
    marginTop: "15px",
    width: "65px",
    backgroundColor: theme.colors.primary,
    color: theme.colors.secondary
  },
  disabledButton: {
    all: "unset",
    borderRadius: "5px",
    padding: "10px",
    marginTop: "15px",
    width: "65px",
    backgroundColor: theme.colors.disabled,
    color: theme.colors.secondary
  },
  commentsSection: {
    marginTop: "40px"
  },
  commentsList: {
    listStyleType: "none",
    padding: 0
  },
  comment: {
    padding: "20px",
    margin: "20px",
    borderRadius: "10px",
    backgroundColor: theme.colors.primary,
    color: theme.colors.secondary
  },
  footer: {
    padding: "20px",
    textAlign: "right",
    fontFamily: theme.fonts.secondary,
    color: theme.colors.secondary,
    backgroundColor: theme.colors.primary
  },
  link: {
    textDecoration: "none",
    fontSize: "20px",
    color: theme.colors.secondary
  }
};
