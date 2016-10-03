import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if(Meteor.isServer) {
  // this code only runs on the server --> which means we can find all the tasks on the server but not he client
  Meteor.publish('tasks', function tasksPublication(){
    return Tasks.find({
      $or: [
        {private: {$ne: true} },
        {owner: this.userId}
      ]
    });
  })
}

Meteor.methods({
  'tasks.insert'(text){
    check(text, String);

    //check that user is logged in
    if(! this.userId){
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'tasks.remove'(taskId){
    check(taskId, String);
    const task = Tasks.findOne(taskId);
    if(task.private && task.owner !== this.userId){
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked){
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if(task.private && task.owner !== this.userId){
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {$set: { checked: setChecked }});
  },

  'tasks.setPrivate'(taskId){
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Task.findOne(taskId);

    if(task.owner !== this.userId){
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: {private: setToPrivate} });
  }
})
