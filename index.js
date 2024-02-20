let express=require('express')
const Joi=require('joi')
let app=express()
app.use(express.json());

let course=[{id:1,name:"js"},{id:2,name:"react"},
     {
        id:3,
        name:"nodejs" 
         },
         {
            id:4,
            name:"Java"
         }

   ]

app.get('/',(req,res)=>{
    res.send("Hello from server")
})
app.get('/api/course',(req,res)=>{
    res.send(course)
})


app.get('/api/course/:id', (req, res) => {
    const courseData=course.find(c=>c.id==parseInt(req.params.id))
    
    if(!courseData){res.status(404).send("NotFound")}
    res.send(courseData)
});

//POST
app.post('/api/course', (req, res) => {
    let {error}=validate(req.body)
    if(error){
        res.status(404).send(result.error.details[0].message)
        return;
    }
    const postCourse = {
        id: course.length + 1,
        name: req.body.name
    };
    course.push(postCourse);
    res.send(postCourse);
});
//PUT
app.put('/api/course/:id',(req,res)=>{
    const courseData=course.find(c=>c.id==parseInt(req.params.id))
    if(!courseData){res.status(404).send("NotFound")}
 let {error}=validate(req.body)
 if(error){
        res.status(404).send(result.error.details[0].message)
        return;
    }
        courseData.name=req.body.name
        res.send(courseData)
    

})
//delete
app.delete('/api/course/:id',(req,res)=>{
    const courseData=course.find(c=>c.id==parseInt(req.params.id))
    if(!courseData){res.status(404).send("NotFound")}
    let index=course.indexOf(courseData)
    course.splice(index,1)
    res.send(course)
})

//function
function validate(course){


    const schema={
        name:Joi.string().min(3).required()
    }
    return result=Joi.validate(course,schema)
}



//PORT
const port=process.env.PORT ||3000;
app.listen(3000,()=>{
    console.log(`Running  ${port}`);
})

