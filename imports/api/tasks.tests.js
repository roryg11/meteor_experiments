import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';

if(Meteor.isServer){
  describe('Tasks', function(){
    describe('methods', function(){
      const userId = Random.id();
      let taskId;

      beforeEach(()=>{
        Tasks.remove({});
        taskId = Tasks.insert({
          text: "test text",
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday'
        })
      });

      it('can delete owned task', function(){
        // find internal implementaion of task, to test in isolateion
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // run the method with 'this' set to the fake invocation
        deleteTask.apply(invocation, [taskId]);

        // make your assertion
        assert.equal(Tasks.find().count(), 0);
      });
    });
  });
}
