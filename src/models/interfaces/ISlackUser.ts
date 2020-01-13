interface ISlackUser {
    name:string
    teamId:string ,
    isAdmin: boolean,
    isDeleted: boolean,
    email: string,
    phone: string,
    slackId:string,
    isRegistered:string
}

export default ISlackUser
