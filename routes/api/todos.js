const express = require("express");
const router = express.Router();
const passport = require("passport");
const Todo = require("../../models/Todo");

 router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      let toDosArr = [];
  
      await Todo.find({})
        .then(toDo => {
          toDo.map(toDo => {
            toDo.teamMembers &&
              toDo.teamMembers.map(member => {
                if (member.email == req.user.email) {
                  toDosArr.push(toDo);
                }
              });
          });
        })
        .catch(err => console.log(err));
        const OWNER = {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email
        };
        await Todo.find({ owner: OWNER })
        .then(toDos => {
          let finalArr = [...toDos, ...toDosArr];
          res.json(finalArr);
        })
        .catch(err => console.log(err));
    }
  );

  router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const OWNER = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      };
  
      const NEW_TODO = await new Todo({
        owner: OWNER,
        name: req.body.name,
        created: req.body.created,
        teamMembers: req.body.members
      });
  
      NEW_TODO.save().then(todo => res.json(todo));
    }
  );
  router.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    Todo.findById(req.params.id).then((todoRef) =>
    Todo.findOneAndUpdate(
      { _id: req.params.id },
      { done: !todoRef.done },
    ))
        .then(todo => {
          res.json(todo);
        })
        .catch(err => console.log(err));
    }
  );

  router.patch(
    "/:id/edit",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    const { name, edited } = req.body;
    Todo.findOneAndUpdate({ _id: req.params.id }, { name, edited })
        .then(todo => {
          res.json(todo);
        })
        .catch(err => console.log(err));
    }
  );

  router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Todo.findById(req.params.id).then(todo => {
        todo.remove().then(() => res.json({ success: true }));
      });
    }
  );
  module.exports = router;

