import { hashPassword } from "../utils/helper.js"

const users = [
  {
    id: 1,
    firstName: "john",
    lastName: "jones",
    email: "johnj@mail.com",
    password: hashPassword("plumpy")
  },
  {
    id: 2,
    firstName: "joe",
    lastName: "cones",
    email: "joec@mail.com",
    password: hashPassword("fluffy")
  },
  {
    id: 3,
    firstName: "job",
    lastName: "paddy",
    email: "jobp@mail.com",
    password: hashPassword("dainty")
  },
  {
    id: 4,
    firstName: "jonas",
    lastName: "lowes",
    email: "jonasl@mail.com",
    password: hashPassword("plumber")
  },
];

export default users
