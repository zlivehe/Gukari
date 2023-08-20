const  express  = require('express');
const Router = express.Router()
const QuizCard = require('../../model/home/quizapp/quizcard')
const User = require('../../model/auth/user')
const catchAsync = require('../../views/utilities/catchAsync')

Router.post('/user/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    const user  = await User.findById(id);
    res.json(user);
    }
));
Router.post('/quizcard/:id/token/:token', catchAsync(async (req, res) => {
    const id = req.params.id;
    const token = req.params.token;
    const quizcard = await QuizCard.findById(id);
    res.json(quizcard);
    } 
));
Router.post('/quizcard/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    const quizcard = await QuizCard.findById(id);
    res.json(quizcard);
    }
));
Router.post('/quizcard/:id/post', catchAsync(async (req, res) => {
    const id = req.params.id;
    const quizcard = await QuizCard.findById(id);
    const reqbody = req.body;
    for (let i = 0; i < quizcard.cards.length; i++) {
      if (quizcard.cards[i].term && !quizcard.cards[i].definition) {
        quizcard.cards[i].definition = reqbody.definition;
        await quizcard.save();
        return res.send(quizcard);

      } else if (quizcard.cards[i].definition && !quizcard.cards[i].term) {
        quizcard.cards[i].term = reqbody.term;
        await quizcard.save();
        return res.send(quizcard);

      }
    }
    reqbody.position = quizcard.cards.length + 1;
    console.log(reqbody);
    quizcard.cards.push(reqbody);
    await quizcard.save();

  
    res.send(reqbody);
}));
  
Router.post('/quizcard/:id/put', catchAsync(async (req, res) => {
  const id = req.params.id;
  const quizcard = await QuizCard.findById(id);
  res.json(quizcard);
  }
));



module.exports = Router;