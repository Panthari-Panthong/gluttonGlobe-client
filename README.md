# Glutton Globe

## Description

An interactive world map showcasing popular cities, allowing users to mark cities they have been to or want to visit, while also discovering recommendations from users worldwide.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start saving places I have been and places I want to visit.
- **Login:** As a user I can login to the platform so that I can see my profile page and I have been and places I want to visit.
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Edit Profile:** As a user, I can edit and add a profile picture so that I can share it with the community.
- **List Cities:** As a user, I want to see the city markers on a map.
- **Cities I have been:** As a user, I want to see all the city markers of the cities I have visited.
- **Cities I want to visit:** As a user, I want to see all the city markers of the cities I want to visit, so I can choose my next destination.
- **Add Cities:** As a user, I want to add cities to the list of cities I have been to or want to visit.
- **See My cities:** As a user, I want to see a list of my cities, so that I can track the cities I have been to and the cities I want to visit.
- **Post City comments:** As a user, I want to comment on cities so that users worldwide can see and make recommendations.
- **Cities map:** As an anon/user, I can see city markers from all around the world.
- **Filter Cities:** As an anon/user, I can filter cities by entering the desired radius in kilometers.
- **City Post:** As an anon/user, I can view recommended posts from users worldwide.

## Backlog

Geo Location: (leaflet api)

- Display clickable icons on the map
- Popup with Marker
- Show a marker at your detected location
- Filter by circle radius (Vector layers)
- Layer Groups and Layers Control
- Recommendations post from users worldwide

# Client / Frontend

## React Router Routes (React App)

| Path                    | Component                      | Permissions             | Behavior                                                    |
| ----------------------- | ------------------------------ | ----------------------- | ----------------------------------------------------------- |
| `/`                     | Homepage                       | public `<Route>`        | Home page                                                   |
| `/signup`               | SignupPage                     | anon only `<IsAnon>`    | Signup form, link to login, navigate to login after signup  |
| `/login`                | LoginPage                      | anon only `<IsAnon>`    | Login form, link to signup, navigate to profile after login |
| `/profile`              | NavBar, ElementList, FooterBar | user only `<IsPrivate>` | Profile Page                                                |
| `/profile/:userId/edit` | NavBar, ElementList, FooterBar | user only `<IsPrivate>` | Show user detail and edit form page                         |
| `/myMap`                | NavBar, ElementList, FooterBar | user only `<IsPrivate>` | My Map Page                                                 |
| `/places/:id`           | NavBar, ElementList, FooterBar | public `<Route>`        | Place Detail Page                                           |
| `/*`                    | NavBar, ElementList, FooterBar | public `<Route>`        | Error Page                                                  |

## Pages

- Home Page
- Sign in Page
- Log in Page
- My Profile Page
- Profile Edit Page
- My Map Page
- Place Detail Page
- Place Edit Page
- Post Detail Page
- 404 Page

## Components

- ErrorPage
- Footer
- Navbar
- IsAnon
- IsPrivate
- LayerComponent
- LocationMarker
- MarkerComponent
- RadiusFilterComponent

## IO

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
- User Service
  - user.profile(id)
  - user.update(id)
  - user.mymap(id)
- Place Service
  - place.places
  - place.detail(id)
  - place.post(id)
  - place.mymap(id)
- Post Service
  - post.add()

# Server / Backend

## Models

User model

```javascript
{
  email: {
      type: String, required: [true, "Email is required."],unique: true},
    password: {type: String, required: [true, "Password is required."]},
    username: {type: String, required: [true, "Username is required."]},
    picture: {type: String, default:
        "https://res.cloudinary.com/dkzhxg8ci/image/upload/v1684507275/User-avatar_kjsqw4.png"},
    about: {type: String, default: "About me..."},
    placesBeen: {type: [Schema.Types.ObjectId], ref: "Place"},
    placesVisit: {type: [Schema.Types.ObjectId],ref: "Place"}
}
```

Place model

```javascript
{
    city: {type: String},
    lat: {type: Number},
    lng: {type: Number},
    country: {type: String},
    iso2: {type: String},
    population: {type: Number},
    post: {type: [Schema.Types.ObjectId], ref: "Post"},
}
```

Post model

```javascript
{
    user: {type: Schema.Types.ObjectId, ref: "User"},
    comment: {type: String},
    picture: {type: String},
    place: {type: [Schema.Types.ObjectId], ref: "Place"}
}
```

## API Endpoints (backend routes)

| HTTP Method | URL                              | Request Body                  | Success status | Error Status | Description                                                                                                                     |
| ----------- | -------------------------------- | ----------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup`                   | { email, password, username } | 201            | 500          | Checks if fields not empty (400) and user not exists (400), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                    | { email, password }           | 200            | 500          | Checks if fields not empty (400), if user not exists (401), and if password not matches (401), then stores user in session      |
| POST        | `/auth/verify`                   |                               | 200            |              | verify JWT stored on the client user                                                                                            |
| POST        | `/auth/upload`                   | { fileUrl: req.file.path }    |                |              | Cloudinary uploaded                                                                                                             |
| GET         | `/auth/profile/:userId`          | req.params                    | 200            | 500          | Check if user is logged in and return profile page                                                                              |
| GET         | `/auth/profile/:userId/edit`     |                               | 200            | 500          | User detail edit page                                                                                                           |
| PUT         | `/auth/profile/:userId/edit`     | { about, picture, username }  | 200            | 500          | User detail update page                                                                                                         |
| GET         | `/api/places`                    |                               |                |              | Show cities                                                                                                                     |
| GET         | `/api/mymap/:userId`             |                               | 200            | 500          | places saved by the user                                                                                                        |
| PATCH       | `/api/mymap/addtoBeen/:userId`   | { placesBeen }                | 200            |              | add placesBeen to the user                                                                                                      |
| PUT         | `/api/mymap/updateBeen/:userId`  | { newPlacesBeen }             | 200            |              | update placesBeen of the user                                                                                                   |
| PATCH       | `/api/mymap/addtoVisit/:userId`  | { placesVisit }               | 200            |              | add placesVisit to the user                                                                                                     |
| PUT         | `/api/mymap/updateVisit/:userId` | { newPlacesVisit }            | 200            |              | update placesVisit of the user                                                                                                  |
| GET         | `/api/places/:id`                |                               | 200            |              | Show city with posts                                                                                                            |
| POST        | `/api/posts`                     | { comment }                   |                |              | Add post to the city                                                                                                            |
| GET         | `/api/users/:id`                 |                               |                |              | Show users picture, username, comment                                                                                           |

## Links

### Trello/Kanban

[Trello board](https://trello.com/b/qZjOyFvY/travelling-app-ironhack-project)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Panthari-Panthong/gluttonGlobe-client)

[Server repository Link](https://github.com/Panthari-Panthong/gluttonGlobe-server)

[Deploy Link](https://bejewelled-alfajores-c72f6e.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://www.canva.com/design/DAFj7D_YvB0/Ea73SuRaH-sZl--AHxboww/view?utm_content=DAFj7D_YvB0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)
