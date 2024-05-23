import React from 'react';
import ReactDOM from 'react-dom/client';
import { nanoid } from 'nanoid'
import Questions from './components/Questions';
import './App.css';



function App() {
  const [playingGame, setPlayingGame] = React.useState(true)
  const [quizData, setQuizData] = React.useState([]);
  const [shuffledOptions, setShuffledOptions] = React.useState([]);
  const [isHeld, setIsHeld] = React.useState([]);
  const [scoreCounter, setScoreCounter] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [restart, setRestart] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const he = require("he")

  // CORRECT ANSWERS ARRAY, TO MATCH CORRECT ANSWERS
  const correctAnswers = [];
  for (let i = 0; i < quizData.length; i++) {
    correctAnswers.push(quizData[i].correct_answer)
  }

  // FETCHING DATA
  const fetchQues = () => {
    fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
      .then(response => response.json())
      .then(data => {
        const shuffledOptions = data.results.map(quizItem => shuffleOptions(quizItem));
        setQuizData(data.results);
        // To set options once and for all, otherwise they were changing on each click.
        setShuffledOptions(shuffledOptions)
        setRestart(false)
        setLoading(false)
      });
  };

  React.useEffect(() => {
    fetchQues();
  }, [restart]);

  // Function to shuffle options
  function shuffleOptions(quizItem) {
    const options = [...quizItem.incorrect_answers, quizItem.correct_answer];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }

  function buttonClicked(value, index) {
    const selectedAnswers = [...isHeld]
    selectedAnswers[index] = value;
    setIsHeld(selectedAnswers)

    // if (correctAnswers.includes(value)) {
    //   alert("CORRECT ANSWER!")
    // } else {
    //   alert("WRONG ANSWER!")
    // }
  }


  function countScore() {
    setScoreCounter(0)
    for (let index = 0; index < isHeld.length; index++) {
      if (correctAnswers.includes(isHeld[index])) {
        setScoreCounter(oldScore => oldScore + 1)
      }
    }

  }

  function restartGame() {
    setScoreCounter(0);
    setIsHeld([]);
    setRestart(true);
    setSubmitted(false);
  }

  const dataToRender = (<div className='main-app container-fluid mt-3 mx-auto p-4'>
    {quizData.map((quizItem, index) => (
      <div key={index}>
        <div>
          {/* FIXED &#039 instead of '  */}
          <h4 className='bold-weight'>{he.decode(quizItem.question)}</h4>
        </div>
        <div className='d-inline-block'>
          {shuffledOptions[index].map((eachOpt, j) => {
            const isAnswerCorrect = correctAnswers[index] === eachOpt;
            const isAnswerSelected = isHeld[index] === eachOpt;

            // Define CSS classes based on correctness and selection
            const buttonClasses = `btn buttonSizing mx-1 my-1 ${isAnswerSelected ? 'active' : ''
              } ${submitted
                ? isAnswerSelected
                  ? (isAnswerCorrect ? 'btn-success' : 'btn-danger') :
                  (isAnswerCorrect ? 'btn-success' : '')
                : 'btn-outline-secondary'
              }`;
            return (
              <button
                disabled={submitted ?
                  isAnswerSelected ? isAnswerCorrect ? false : true
                    : true
                  : false}
                data-bs-toggle="button"
                onClick={() => buttonClicked(eachOpt, index)}
                className={buttonClasses}
                key={j}
              >
                {he.decode(eachOpt)}
              </button>
            );
          })}
        </div>
        <hr></hr>
      </div>
    ))}
    <div className='d-flex justify-content-start align-items-center gap-3'>
      {!submitted && (<button className='bold-weight btn btn-outline-dark'
        onClick={() => {
          setSubmitted(true);
          countScore()
        }}>Submit</button>)}
      {submitted && (<div>
        <span className='bold-weight h4'>Your score is : {scoreCounter}/5</span>
        <button className="btn btn-primary mx-3" onClick={() => restartGame()}>Play again?</button>
      </div>
      )
      }
    </div>
  </div>)

  // MAIN RENDER RETURN
  return (
    playingGame
      ?
      <div className='d-flex justify-content-center flex-column align-items-center vh-100'>
        <p className='bold-weight h2 pb-3'>Quizzical App</p>
        <p className='mx-5 px-5 pb-2'>This is a quiz with multiple choice questions. Pick one option out of the four and when done, click on the 'Submit' button.</p>
        <button class="btn btn-dark btn-lg" onClick={() => setPlayingGame(false)}>Start Quiz</button>
      </div>
      : (loading ?
        <div class="d-flex align-items-center">
          <strong role="status">Loading...</strong>
          <div class="spinner-border ms-auto" aria-hidden="true"></div>
        </div> : <Questions dataToRender={dataToRender} />
      )
  )

}



export default App;
