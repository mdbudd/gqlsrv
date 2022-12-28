import fetch from "node-fetch"
import "@babel/polyfill"
import { URL_PERSON, URL_PI_PERSON, URL_NEODE4J } from "./urls"
const util = require("util")

const personUrlSuffix = "/FlintServices/PersonLibrary/"

export const getPersonById = async (racf, auth) => {
  let person = await fetch(`${URL_PERSON}/${racf}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)
  // console.log(person)
  // console.log(util.inspect(person, false, 7, true));

  person = {
    email: person.email,
    forename: person.forename,
    salaryRef: person.salaryref,
    lastLogin: person.last_logged_in,
    domain: person.domain,
    timestamp: person["@timestamp"],
    racf: person.racf,
    surname: person.surname,
    name: person.name,
    id: person.id
  }

  return person
}

export const getPeopleByIds = async ids => {
  let postData = {
    method: "POST",
    body: JSON.stringify(ids),
    headers: {
      "Content-Type": "application/json"
    }
  }

  let people = await fetch(`${URL_PI_PERSON}${personUrlSuffix}Persons`, postData)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)

  //console.log(util.inspect(people, false, 7, true));

  return people
}

export const addPerson = async args => {
  let post = { ...args.post }

  let person = await fetch(`${URL_PI_PERSON}`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  })
    .then(response => response.json())
    .catch(error => error)

  if (person.id !== undefined && post.racf !== "") {
    post.id = person.id
    person = post
    pubsub.publish(PERSON_ADDED, { person })
  } else {
    person = false
  }
  return person
}



export const getTeam = async (racf, auth) => {
  let team = await fetch(`${URL_NEODE4J}/team/${racf}`, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(error => error)
    
  console.log(util.inspect(team, false, 7, true));


  return team
}