# iMentor: Find a mentor in the Ironhack community

## Description

**iMentor** You started your journey as a developer at Ironhack. Do you need some advice? We give you the option to get in touch with some senior Ironhackers so you can find the best mentor to guide you through your new journey. With iMentor you will find the best mentor within the Ironhack community.

## User Stories

- **404:** As an anon/ user, I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up on the platform so that I can start playing into competition
- **Login:** As a user, I can login to the platform so that I can play competitions
- **Logout:** As a user, I can logout from the platform so no one else can use it
- **Add Questions** As a user I can add a question
- **Edit Question** As a user, I can edit a question
- **Edit Profile** As a user I can edit a user profile

## Backlog

User profile:

- see my profile
- change role mode to mentor or mentee

# Client / Frontend

## React Router Routes (React App)

| Path                            | Component            | Permissions                 | Behavior                                                                     |
| ------------------------------- | -------------------- | --------------------------- | ---------------------------------------------------------------------------- |
| `/`                             | SplashPage           | public `<Route>`            | Home page                                                                    |
| `/signup`                       | SignupPage           | anon only `<AnonRoute>`     | Signup form, link to login, navigate to homepage after signup                |
| `/login`                        | LoginPage            | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login                 |
| `/mentors`                      | TournamentListPage   | user only `<PrivateRoute>`  | Shows a list of mentors and gives the option to filter based on skills       |
| `/questions`                    | TournamentListPage   | public `<Route>`            | List of questions and gives the option to filter based on the question topic |
| `/questions/add`                | TournamentDetailPage | user only `<PrivateRoute>`  | Adds a question to the feed/list                                             |
| `/questions/:id`                | n/a                  | public `<Route>`            | See the details of the specific question                                     |
| `/questions/:id/delete`         | PlayersListPage      | owner only `<PrivateRoute>` | Delete the question (only the owner can do it)                                |
| `/questions/:id/comment/add`    | PlayersListPage      | user only `<PrivateRoute>`  | Add a comment to a specific question                                         |
| `/questions/comment/:id/delete` | PlayersDetailPage    | user only `<PrivateRoute>`  | Delete the comment                                                           |
| `/profile/:id`                  | PlayersListPage      | user only `<PrivateRoute>`  | The details of the mentor/mentee                                             |
| `/profile/:id/edit`             | TableView            | user only `<PrivateRoute>`  | Edit the details of the mentor/mentee                                        |

## Components

- Footer
- LoginForm
- MentorCard
- Navbar
- QuestionCard
- QuestionForm
- SignupForm
- Tags                                                                                                                  

[![Deploy on Railway](https://railway.app/button.svg)](https://imentor-client.up.railway.app)
