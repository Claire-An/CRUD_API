import { v4 as uuidv4 } from "uuid";
import { User } from "./type";

export const userList: Array<User> = [];

export const getUsers = (): User[] => {
  return userList;
}

export const getOneUser = (pos: number): User => {
    return userList[pos];
}

export const findPosUser = (userId: string): number => {
  const pos = userList.findIndex((item) => {
    return (item.id === userId)
  });
  return pos;
}

export const deleteUser = (pos: number) => {
    userList.splice(pos, 1);
}

export const isvalidUser = (user: User) => {
  try {
    if(typeof user !== "object" || !user.age || !user.hobbies || !user.username || 
      typeof user.age !== "number" || typeof user.username !== "string" ||
      !Array.isArray(user.hobbies)) return 0;
    return 1;
  } catch {
    return 0;
  }
};

export const addUser = (body: string): User => {
  const user: User = {
    "id": generateUUID(),
    ...JSON.parse(body)
  };
  userList.push(user);
  return user;
}

export const updateUser = (posUser: number, userNew: User): void => {
  userList[posUser].username = userNew.username;
  userList[posUser].age = userNew.age;
  userList[posUser].hobbies = userNew.hobbies;
}

export const generateUUID = (): string => {
    const myuuid = uuidv4();
    return myuuid;
}
