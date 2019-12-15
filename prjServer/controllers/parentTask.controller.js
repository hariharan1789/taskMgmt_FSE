
const express = require('express'),
    parentTaskController = express.Router();

let ParentTask = require('../data_models/parenttask');





parentTaskController.route('/:id').get(function (req, res) {

    let pTaskId = req.params.id;

    ParentTask.findOne({ Parent_ID: pTaskId }, function (err, task) {
        if (err) {
            res.json({ 'Success': false, 'Message': 'No Parent Task exist' })
        }
        else {
            res.json({ 'Success': true, 'Data': task });
        }
    });
});

parentTaskController.route('/').get(function (req, res) {

    var queryparams = req.query;

    var parentTaskQuery = ParentTask.find();



    if (queryparams.searchKey) {
        parentTaskQuery.or([
            { 'Parent_Task': { $regex: queryparams.searchKey, $options: 'i' } }]);
    }

    parentTaskQuery.exec(function (err, tasks) {

        if (err) {
            res.json({ 'Success': false })
        }
        else {
            res.json({ 'Success': true, 'Data': tasks });
        }
    });
});


parentTaskController.route('/add').post(function (req, res) {

    let parentTask = new ParentTask(req.body);

    parentTask.save()
        .then(parentTask => {
            res.status(200).json({ 'Success': true })
        })
        .catch(err => {
            res.status(400).send({ 'Success': false, 'Message': 'Unable to create new taks due to error' });
        });
});


module.exports = parentTaskController;
