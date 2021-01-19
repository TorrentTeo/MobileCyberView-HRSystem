const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

//temp hardcode
const employees = [
    { id:1, name:'Teo Pog'},
    { id:2, name:'Lily Cunt'},
    { id:3, name:'Deki Gaywa'},
    { id:4, name:'Leonard Hoe'},
]
app.listen(port, () => console.log('Connected to ' + port ));

app.get('/', (req,res) =>
{
    res.send('sup homies')
});

app.get('/api/employees', (req,res) =>
{
    res.send(employees)
});

app.get('/api/employees/:id', (req,res) =>
{
    const employee = employees.find(c => c.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The given employee ID is not found.');
    res.send(employee);
});

app.post('/api/employees', (req,res) =>
{
    const { error } = validateEmployee(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const employee = 
    {
        id: employees.length + 1,
        name: req.body.name
    };
    employees.push(employee);
    res.send(employee);
});

app.put('/api/employees/:id', (req,res) =>
{
    const employee = employees.find(c => c.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The given employee ID is not found.');

    const { error } = validateEmployee(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    employee.name = req.body.name;
    res.send(employee);
});

app.delete('/api/employees/:id', (req,res) =>
{
    const employee = employees.find(c => c.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The given employee ID is not found.');

    const index = employees.indexOf(employee);
    employees.splice(index, 1);

    res.send(employee);
});

function validateEmployee(employee)
{
    const schema = {
        name: Joi.string().min(3).required() //temp
    };

    return Joi.validate(employee, schema);
}
