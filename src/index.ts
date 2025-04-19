import express, { Request, Response } from 'express';
const app = express();
const port = process.env.PORT || 3001;
const jsonBodyMiddleware = express.json()

function generateId(): number {
    return Math.floor(Math.random() * 1000000)
}

type Course = {
    id: number
    title: string
    description: string
}

app.use(jsonBodyMiddleware)

let db = {
    courses: [
        {
            id: 1,
            title: 'Node.js',
            description: 'Node.js is a runtime for JavaScript',
        },
        {
            id: 2,
            title: 'React',
            description: 'React is a library for building user interfaces',
        },
        {
            id: 3,
            title: 'Angular',
            description: 'Angular is a framework for building user interfaces',
        },
        {
            id: 4,
            title: 'Vue',
            description: 'Vue is a progressive framework for building user interfaces',
        },
        {
            id: 5,
            title: 'Svelte',
            description: 'Svelte is a compiler for building user interfaces',
        },
        {
            id: 6,
            title: 'Next.js',
            description: 'Next.js is a framework for building server-side rendered React applications',
        },
        {
            id: 7,
            title: 'Nuxt.js',
            description: 'Nuxt.js is a framework for building server-side rendered Vue applications',
        },
        {
            id: 8,
            title: 'Express',
            description: 'Express is a framework for building server-side applications',
        },
        {
            id: 9,
            title: 'Koa',
            description: 'Koa is a framework for building server-side applications',
        },
        {
            id: 10,
            title: 'Fastify',
            description: 'Fastify is a framework for building server-side applications',
        },
    ]
}

app.get('/courses/:id', (req: Request, res: Response) => {
    const foundCourse = db.courses.find((course) => course.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404)
        return
    }
    res.json(foundCourse);
});

app.get('/courses', (req: Request, res: Response) => {
    let foundCourse = db.courses.filter(c => c.title.toLowerCase().indexOf(req.query.title as string) > -1)
    if (req.query.title) {
        res.json(foundCourse)
    } else {
        res.json(db.courses)
    }
});

app.post('/courses', (req: Request, res: Response) => {
    const newCourse: Course = {
        id: generateId(),
        title: req.body.title,
        description: req.body.description,
    }
    db.courses.push(newCourse)
    res.status(201).json(newCourse)
})

app.delete('/courses/:id', (req: Request, res: Response) => {
    if (!db.courses.find((course) => course.id === +req.params.id)) {
        res.sendStatus(400)
        return
    }
    db.courses = db.courses.filter((course) => course.id !== +req.params.id);
    res.sendStatus(204)
});

app.put('/courses/:id', (req: Request, res: Response) => {
    const foundCourse = db.courses.find((course) => course.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404)
        return
    } 
    foundCourse.title = req.body.title
    foundCourse.description = req.body.description
    res.status(200).json(foundCourse)
})

//Write an example fetch request to the server to edit a course
// fetch('http://localhost:3001/courses/1', {
//    method: 'PUT',
//    headers: {
//        'Content-Type': 'application/json'
//    },
//    body: JSON.stringify({ title: 'New Course', description: 'New Description' })
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});