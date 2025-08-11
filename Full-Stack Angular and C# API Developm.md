# Full-Stack Angular and C# API Development Test

## Initial Setup
1. Extract the provided application files into a folder on your local machine
2. Create a new GitHub repository for your submission
3. Initialize the repository with the extracted files
4. Provide repository access to our team for review
5. Follow the setup instructions in the README.md to get the application running locally

## Overview
This test is designed to evaluate your proficiency in building a full-stack application using Angular for the front-end and C# for the back-end API. You will be assessed on your critical thinking, research abilities, coding practices, and overall approach to problem-solving.

While completing all tasks is the primary goal, we understand that time constraints may prevent full completion. Your evaluation will be based on:
- The quality and completeness of the features you implement
- Your approach to problem-solving and technical decisions
- Code organization and best practices
- Documentation quality
- Overall technical proficiency demonstrated
- Your attention to user experience and interface design

Focus on delivering high-quality, well-structured code for the features you choose to implement, rather than rushing to complete all tasks with compromised quality.

## Project Description
You will work with a pre-scaffolded Task Management System where users can create, view, update, and delete tasks. Each task should have a title, description, due date, priority level, and status.

Note: The scaffolded application includes some intentional UI/UX issues that need to be addressed. Pay attention to:
- Navigation consistency
- Form layout and spacing
- Loading and error states
- Mobile responsiveness
- Accessibility considerations
- Visual hierarchy and feedback

## Requirements

### Front-end Development (Tasks 1-3)
1. **Task 1**: Review and understand the provided scaffolded Angular application structure:
   - The application uses Angular Material for UI components
   - Routing is configured with lazy loading
   - Basic layout with Material toolbar is implemented
   - Task list and form components are scaffolded
   - Task service is prepared for API communication

2. **Task 2**: Complete the task detail view component:
   - Create a new component for viewing task details
   - Implement edit functionality
   - Add proper navigation back to the task list
   - Include loading and error states

3. **Task 3**: Enhance the task list component:
   - Add sorting functionality to all columns
   - Implement filtering by title, priority, and status
   - Add pagination for large datasets
   - Improve the UI with status indicators and priority badges

### Back-end Development (Tasks 4-6)
4. **Task 4**: Create a new ASP.NET Core Web API project:
   - Set up Entity Framework Core with SQL Server
   - Create the Task entity model
   - Configure database migrations
   - Set up proper connection strings

5. **Task 5**: Implement the RESTful API endpoints:
   - GET /api/tasks - Retrieve all tasks with pagination
   - GET /api/tasks/{id} - Retrieve a specific task
   - POST /api/tasks - Create a new task
   - PUT /api/tasks/{id} - Update an existing task
   - DELETE /api/tasks/{id} - Delete a task
   - Add proper validation and error handling

6. **Task 6**: Write SQL queries to:
   - Retrieve tasks due within the next 7 days
   - Get a count of tasks by priority level
   - Find tasks that are overdue
   - Update multiple tasks' status in a single query

### Additional Features (Tasks 7-8)
7. **Task 7**: Implement proper error handling and loading states:
   - Add error interceptors for API calls
   - Implement loading spinners
   - Add error messages and notifications
   - Handle offline scenarios

8. **Task 8**: Add form validation and user experience improvements:
   - Implement reactive form validation
   - Add date validation for due dates
   - Show validation error messages
   - Add confirmation dialogs for destructive actions

### Documentation and Deployment (Tasks 9-10)
9. **Task 9**: Write comprehensive documentation including:
   - API documentation with Swagger/OpenAPI
   - Setup instructions for both frontend and backend
   - Database schema and migration guide
   - Environment configuration guide
   - API endpoints documentation

10. **Task 10**: Package and deploy the application:
    - Configure production builds for both frontend and backend
    - Set up Docker containers for the application
    - Create a docker-compose file for local development
    - Document deployment steps
    - Push code to GitHub with clear commit history

## Evaluation Criteria
- **Code Quality**: Clean, readable, and well-structured code with appropriate comments
- **Architecture**: Proper separation of concerns and application structure
- **Functionality**: Working features that meet the requirements
- **Error Handling**: Robust error handling and validation
- **SQL Knowledge**: Ability to write efficient and correct SQL queries
- **Documentation**: Clear and comprehensive documentation
- **Git Usage**: Proper use of Git with meaningful commit messages
- **Problem-Solving**: Ability to research and implement solutions to challenges encountered

## Submission
Please provide:
1. Link to your GitHub repository containing both the Angular front-end and C# back-end projects
   - Ensure the repository is private and shared with our team
   - Include all necessary files and configurations
   - Maintain a clear commit history
2. A README.md file with:
   - Setup instructions
   - API documentation
   - Architecture overview
   - Deployment guide
3. Docker configuration files
4. Database migration scripts

## Notes
- The scaffolded front-end application provides a solid foundation with Material Design components
- Focus on implementing the missing features and improving the user experience
- Document any challenges you faced and how you approached solving them
- Consider adding unit tests for critical functionality
- Feel free to enhance the UI/UX beyond the basic requirements
- While completing all tasks is ideal, we value quality over quantity
- Your evaluation will consider:
  - The depth and quality of your implementations
  - Your technical decision-making process
  - Code organization and best practices
  - Documentation quality
  - Overall technical proficiency
  - Your ability to identify and fix UI/UX issues
- If you cannot complete all tasks, focus on:
  1. Completing the core CRUD operations
  2. Implementing proper error handling
  3. Adding essential validation
  4. Providing clear documentation
  5. Demonstrating clean code practices
  6. Fixing critical UI/UX issues
