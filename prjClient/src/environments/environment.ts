// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUri: 'http://localhost:4300',
  endpoint_project_add: '/projects/add',
  endpoint_task_get: '/tasks',
  endpoint_user_get: '/users',

  endpoint_user_add: '/users/add',
  endpoint_user_edit: '/users/edit',

  endpoint_user_delete: '/users/delete',

  endpoint_project_get: '/projects',

  endpoint_project_edit: '/projects/edit',
  endpoint_project_delete: '/projects/delete',

  endpoint_task_delete: '/tasks/delete',
  endpoint_parentTask_get: '/parenttasks',
  endpoint_task_add: '/tasks/add',
  endpoint_parentTask_add: '/parenttasks/add',



  endpoint_task_edit: '/tasks/edit'

};

