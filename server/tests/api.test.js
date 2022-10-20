const request= require("supertest")
const URL="http://localhost:3001"

const newToDo={
    description:"Jesting my way up"
}

describe("GET /",()=>{
    let task=null

    beforeAll(async()=>{
        const response= await request(URL).post("/new").send(newToDo)
        task=response.body
    })
    afterAll(async()=>{
        await request(URL).delete(`/delete/${task.id}`)
    })
    test('should return 200', async()=> {
        const response=request(URL).get("/")
        expect((await response).statusCode).toBe(200)
    })
    test('should return to dos',async()=>{
        const response= await request(URL).get("/")
        expect(response.body.length >=1).toBe(true)
    })
})
describe("POST/",()=>{
    let task=null

    afterAll(async()=>{
        await request(URL).delete(`/delete/${task.id}`)
    })
    test('Shoul add new task', async()=>{
        const response=await request(URL).post('/new').send(newToDo)
        expect(response.statusCode).toBe(200)
        task=response.body
        expect(task).toMatchObject(newToDo)
    })
})
describe("DELETE/", ()=>{
    let task=null

    beforeAll(async()=> {
        const response=await request(URL).post("/new").send(newToDo)
        task=response.body
    })
    test("should delete task", async()=>{
        const response=await request(URL).delete(`/delete/${task.id}`)
        expect(response.statusCode).toBe(200)
        const id=parseInt(response.body)
        expect(id).toEqual(task.id)
    })
})
describe("PUT/",()=>{
    let task=null
    beforeAll(async()=>{
        const response=await request(URL).post("/new").setEncoding(newToDo)
        task=response.body
    })
    afterAll(async()=> {
        const response=await request(URL).delete(`/delete/${task.id}`)
    })
    test("Should edit task", async()=>{
        const editTask={
            id:task.id,
            description:"edited jesting"
        }
        const response=await (await request(URL).put("/edit")).setEncoding(editTask)
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(editTask)
    })
})
