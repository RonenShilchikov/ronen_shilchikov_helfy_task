# Task Manager Application

A fullstack task management application with an infinite carousel interface, built with Next.js frontend and Express.js backend.

## Features

- **Task CRUD Operations**: Create, read, update, and delete tasks
- **Task Properties**: Title, description, priority (low/medium/high), and completion status
- **Infinite Carousel**: Smooth, seamless scrolling task display with pause on hover/touch
- **Task Filtering**: Filter tasks by "all", "completed", or "pending"
- **Responsive Design**: Mobile-friendly interface with touch support
- **Real-time Updates**: Immediate UI updates following API operations

## Setup and Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ronen_shilchikov_helfy_task
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The frontend application will be available at `http://localhost:3000`



## API Documentation

### Base URL
```
http://localhost:4000/api/tasks
```

### Endpoints

#### GET `/api/tasks`
Get all tasks.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "Task description",
    "priority": "high",
    "completed": false,
    "createdAt": "2025-01-XX..."
  }
]
```

#### POST `/api/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Optional description",
  "priority": "medium"
}
```

**Validation:**
- `title`: Required, non-empty string
- `description`: Optional string
- `priority`: Required, must be one of: `"low"`, `"medium"`, `"high"`

**Response:** Created task object (status 201)

#### PUT `/api/tasks/:id`
Update an existing task (full replacement).

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "priority": "high",
  "completed": true
}
```

**Response:** Updated task object

#### DELETE `/api/tasks/:id`
Delete a task.

**Response:**
```json
{
  "message": "Task deleted",
  "task": { ... }
}
```

#### PATCH `/api/tasks/:id/toggle`
Toggle the completion status of a task.

**Response:** Updated task object with flipped `completed` boolean

### Error Responses

All endpoints may return errors in the following format:

```json
{
  "error": "Error message here"
}
```

**Status Codes:**
- `400`: Bad Request (validation errors)
- `404`: Not Found (task doesn't exist)
- `500`: Internal Server Error




##  Time Spent Breakdown

| Task | Estimated Time |
|------|---------------|

| Backend  | 90 min |
| Frontend  | 80 min |
| Infinite Carousel Implementation | 60 min |

##  Assumptions

4. **Development Environment**: Localhost development setup
5. **Task Priority**: Fixed set of three priority levels (low/medium/high)
6. **Carousel Behavior**: Automatically scrolls; user can pause by hovering/touching
7. **No Pagination**: All tasks loaded at once (suitable for reasonable task counts)




