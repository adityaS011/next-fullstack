import dbConnect from '@/lib/dbConnect';
import Todos from '@/models/Todos';
import { NextRequest, NextResponse } from 'next/server';

import { nanoid } from 'nanoid';

export const GET = async (request?: NextRequest) => {
  await dbConnect();
  const todos = await Todos.find({});
  return NextResponse.json(todos);
};

export const POST = async (request: NextResponse) => {
  await dbConnect();
  const { title } = await request.json();
  const newTodo = await Todos.create({
    title: title,
    id: nanoid(3),
    completed: false,
  });
  return NextResponse.json(newTodo, { status: 201 });
};
