function createProfile({
  id = crypto.randomUUID(),
  name,
  email = "",
  role = "",
  skills = [],
  languages = [],
  projects = "",
  passions = "",
  verified = false,
}) {
  return {
    id,
    name: name.trim(),
    email: email.trim(),
    role: role.trim(),
    skills: skills.map((s) => s.trim()).filter(Boolean),
    languages: languages.map((l) => l.trim()).filter(Boolean),
    projects: projects.trim(),
    passions: passions.trim(),
    verified: Boolean(verified),
    createdAt: Date.now(),
  };
}

function createAdmin({
  id = crypto.randomUUID(),
  firstName,
  lastName,
  email,
  password,
}) {
  return {
    id,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    password: password, 
    role: "admin",
    createdAt: Date.now(),
  };
}
