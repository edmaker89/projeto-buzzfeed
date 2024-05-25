import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  
  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      this.finished = true
      const result = await this.checkResult(this.answers)
      this.answerSelected = quizz_questions.results[result as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length >
          arr.filter(item => item === previous).length
    ) {
        return previous
      }else {
        return current
      }
    })
    return result
  }
  
  title:string = ''
  
  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ''

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished:boolean = false;

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
    };
  }
}
