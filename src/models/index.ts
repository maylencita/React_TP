import { loremIpsum } from "lorem-ipsum"

export type Channel = {
  name: string
  questions: Array<Question>
}

export type Question = {
  id: string
  user: User
  content: string
  answers: Array<Answer>
}

export type Answer = {} //@TODO
 
export const DefaultChannel: Channel = { 
  name: 'general',
  questions: Array(3).fill(1).map((_, index) => generateQuestion(index)) as Question[]
}

export type User = {
  name: string
  avatar?: string
}

export const DefaultUser: User = defaultUser()

function defaultUser(): User {
  return { name: 'admin', avatar: 'T_T'};
}

function generateQuestion(index: number): Question {
  let content = loremIpsum({count: 30, units: 'words'});
  let answers = Array(3).fill(1).map(() => generateAnswer()) as Answer[];
  return {id: `q${index}`, user: defaultUser, content, answers};
}

function generateAnswer(): Answer {
  let content = loremIpsum({count: 30, units: 'words'})
  return { user: { name: 'Toto', avatar: '(*_*)'}, content }
}
