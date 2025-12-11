import { Request, Response } from "express";
import { Storage } from "../storage/Storage";
import { Person } from "../classes/Person";
import { compareId, gatValidId, getObject } from "../utils/validation.utils";

const storage = Storage.getInstance();

// ---------------------------------------------------------
// GET ALL PERSONS
// ---------------------------------------------------------
export const getAllPersons = (req: Request, res: Response) => {
    res.send(storage.getAllPersons());
};

// ---------------------------------------------------------
// GET PERSON BY ID
// ---------------------------------------------------------
export const getPersonById = (req: Request, res: Response) => {
    const id = gatValidId(req, res);
    if (!id) return;

    const person = getObject(
        storage.getAllPersons(),
        (p) => compareId(p, id),
        res
    );
    if (!person) return;

    res.send(person);
};

// ---------------------------------------------------------
// SEARCH PERSON BY NAME (returns email or whole person)
// ---------------------------------------------------------
export const getPersonByName = (req: Request, res: Response) => {
    const name = req.params.name;

    if (!name) {
        res.status(400).send("Name is required.");
        return;
    }

    const persons = storage.getAllPersons();
    const person = persons.find(
        (p) => p.getName().toLowerCase() === name.toLowerCase()
    );

    if (!person) {
        res.status(404).send("Person not found.");
        return;
    }

    // Môžeš si vybrať čo posielať:
    res.send({ email: person.getEmail() });
    // Alebo res.send(person);
};

// ---------------------------------------------------------
// CREATE PERSON
// ---------------------------------------------------------
export const createPerson = (req: Request, res: Response) => {
    const person = new Person(storage.getNextPersonId(), req.body.name, req.body.email);
    storage.addPerson(person);
    res.status(201).send(person.getId());
};

// ---------------------------------------------------------
// UPDATE PERSON BY ID
// ---------------------------------------------------------
export const updatePersonById = (req: Request, res: Response) => {
    const id = gatValidId(req, res);
    if (!id) return;

    const person = getObject(
        storage.getAllPersons(),
        (p) => compareId(p, id),
        res
    );
    if (!person) return;

    if (req.body.name) person.setName(req.body.name);
    if (req.body.email) person.setEmail(req.body.email);

    res.send(void 0);
};

// ---------------------------------------------------------
// DELETE PERSON BY ID
// ---------------------------------------------------------
export const deletePersonById = (req: Request, res: Response) => {
    const id = gatValidId(req, res);
    if (!id) return;

    const person = getObject(
        storage.getAllPersons(),
        (p) => compareId(p, id),
        res
    );
    if (!person) return;

    storage.deletePersonById(id);
    res.send(void 0);
};

