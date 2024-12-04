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
  progress int [note: "Calculated based on completed tasks"]
  status varchar [note: "e.g. In Progress, Completed"]
  user_id int [ref: > User.id]
}

Table Task {
  id int [pk, increment]
  project_id int [ref: > Project.id]
  title varchar
  description text
  progress_contribution int [note: "Progress contribution in percentage"]
  status varchar [note: "e.g. Pending, In Progress, Completed"]
  due_date date [note: "Optional"]
}

Table Completion {
  id int [pk, increment]
  project_id int [ref: > Project.id]
  completion_date date
  proof_url varchar [note: "URL of the result"]
  proof_image varchar [note: "Image of the result"]
}
```
