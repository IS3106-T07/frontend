##React + Redux Services Folder
#####Path: /src/_services
The _services layer handles all http communication with backend apis for the application, each service encapsulates the api calls for a content type (e.g. users) and exposes methods for performing various operations (e.g. CRUD operations). Services can also have methods that don't wrap http calls, for example the userService.logout() method just removes an item from local storage.

I like wrapping http calls and implementation details in a services layer, it provides a clean separation of concerns and simplifies the redux actions (and other modules) that use the services.
(source: http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#services-folder) 