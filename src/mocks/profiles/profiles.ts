import { Profile } from '../../models/profile/profile.interface';

const userList: Profile[] = [
    {firstName: 'ming', lastName: 'xiao', avatar:'assets/imgs/avatar.png', email: 'xming@swjtu.com', dateOfBirth: new Date()},
    {firstName: 'john', lastName: 'smith', avatar:'assets/imgs/avatar.png', email: 'jsmith@swjtu.com', dateOfBirth: new Date()},
    {firstName: 'wei', lastName: 'hong', avatar:'assets/imgs/avatar.png', email: 'whong@swjtu.com', dateOfBirth: new Date()},
    {firstName: 'sarah', lastName: 'halliday', avatar:'assets/imgs/avatar.png', email: 'shalliday@swjtu.com', dateOfBirth: new Date()}
];
export const USER_LIST = userList;