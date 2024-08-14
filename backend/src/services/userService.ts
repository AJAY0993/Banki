//@ts-nocheck
import { PrismaClient, User } from "@prisma/client"
import bcrypt from "bcrypt"

// migrate and generate
const prisma = new PrismaClient()

export const getUser = async () => {
  return await prisma.user.findMany()
}

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id }
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  })
}

export const createUser = async (user: {
  username: string
  email: string
  password: string
  profilePic?: string
}) => {
  const hashedPassword = await hashPassword(user.password)
  return await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword
    }
  })
}

export const deleteUserById = async (id: number) => {
  return await prisma.user.delete({
    where: { id }
  })
}

export const updateUserById = async (id: number, values: Partial<User>) => {
  if (values.password) {
    values.password = await hashPassword(values.password)
  }
  return await prisma.user.update({
    where: { id },
    data: values
  })
}

// Password handling
export const validatePassword = async (
  password: string,
  hashPassword: string
) => {
  return await bcrypt.compare(password, hashPassword)
}

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12)
}
