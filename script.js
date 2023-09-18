const quizdb=[{
question: 'Q1 Which one is the smallest ocean in the World?',

a:'Indian',

b: 'Pacific',


c: 'Atlantic',

d: 'Arctic',

ans: "ans4"   
},
{
question: 'Q2 Which country gifted the ‘Statue of Liberty’ to USA in 1886?',
a: 'France',

b: 'Canada',

c: 'Brazil',

d: 'England',

ans: "ans1"
},
{
question: 'Q3 Dead Sea is located between which two countries?',
a: 'Jordan and Sudan',

b: 'Jordan and Israel',

c: 'Turkey and UAE',

d: 'UAE and Egypt',

ans: "ans2"
},
{
question: 'Q4 In which ocean ‘Bermuda Triangle’ region is located?',
a: 'Atlantic',

b: 'Indian',

c: 'Pacific',

d: 'Arctic',

ans: "ans1"
},
{
question: 'Q5Which country is known as the ‘playground of Europe’?',
a: 'Austria',

b: 'Holland',

c: 'Switzerland',

d: 'Italy',

ans: "ans3"
}];
const question=document.querySelector('.question');
const option1=document.querySelector('#option1');
const option2=document.querySelector('#option2');
const option3=document.querySelector('#option3');
const option4=document.querySelector('#option4');
const submit=document.querySelector('.submit');

const answers=document.querySelectorAll('.answer');
const showscore=document.querySelector('#showscore');
let questioncount=0;
let score=0;
const loadQuestions=()=>{

const questionAll=quizdb[questioncount];
question.innerText=questionAll.question;
option1.innerText=questionAll.a;
option2.innerText=questionAll.b;
option3.innerText=questionAll.c;
option4.innerText=questionAll.d;
} 
loadQuestions();
const getanswerCheck=()=>{
let answer;
answers.forEach((value)=>{
  if(value.checked){
  answer=value.id;
}
});
   return answer;
};
const deselectAll=()=>{
  answers.forEach((value)=>value.checked=false);
};
submit.addEventListener('click',()=>{
  const checkedAnswer=getanswerCheck();
  if (checkedAnswer===quizdb[questioncount].ans){
    score++;
   
  };
  questioncount++;
  deselectAll();
  if(questioncount<quizdb.length){
    loadQuestions();

   }
   else{
    showscore.innerHTML=`
    <h3>YOUR  SCORE IS ${score}/${quizdb.length}</h3>
    <button class="btn" onclick="location.reload()">Start Again</button>
    `;
    showscore.classList.remove('scorearea');
   }
})
