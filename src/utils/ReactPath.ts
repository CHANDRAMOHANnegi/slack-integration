import { RouterProps } from 'react-router';

class ReactPath {
  public static dashboard = (slackAppId: string = ':slackappid') => `/dashboard/${slackAppId}`;
  public static login = '/';
  public static signUp = '/signup';
  public static calendar = '/calendar';

  public static slackApps = '/slackapps';
  public static workspaceSetting = (slackAppId: string = ':slackappid', workspaceId: string = ':workspaceid') => `/dashboard/${slackAppId}/${workspaceId}/setting`;

  public static integrateApp = '/slack/attendance-app/install';
  // public static botList = (slackAppId: string = ':slackappid', workspaceId: string = ':workspaceid') => `/dashboard/${slackAppId}/${workspaceId}/bots`;
  public static slackUsers = (slackAppId: string = ':slackappid', workspaceId: string = ':workspaceid') => `/dashboard/${slackAppId}/${workspaceId}/slack-users`;
  public static attendance = (slackAppId: string = ':slackappid', workspaceId: string = ':workspaceid', slackId: string = ':slackid') =>
    `/dashboard/${slackAppId}/${workspaceId}/${slackId}/attendance`;


  public static navigateTo(props: RouterProps, path: string) {
    props.history.push(path);
  }

  public static HOST = 'http://localhost:4000';
}

export default ReactPath;
