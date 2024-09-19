```
Table User {
  id int [pk, increment]
  name varchar
  email varchar
}

Table Project {
  id int [pk, increment]
  title varchar
  description text
  start_date date
  end_date date [note: "Optional, set when completed"]
  progress int [note: "Value between 0 and 100"]
  status varchar [note: "e.g. In Progress, Completed"]
  user_id int [ref: > User.id]
}

Table ProgressUpdate {
  id int [pk, increment]
  project_id int [ref: > Project.id]
  date datetime
  progress int [note: "Progress increase in percentage"]
  description text
}

Table Completion {
  id int [pk, increment]
  project_id int [ref: > Project.id]
  completion_date date
  proof_url varchar [note: "URL of the result"]
  proof_image varchar [note: "Image of the result"]
}
```
