import dbConnect from '@/lib/dbConnect';
import Todos from '@/models/Todos';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async ({ params }: { params: { id: string } }) => {
  await dbConnect();
  const todos = await Todos.findById(params.id);
  return todos
    ? NextResponse.json(todos)
    : NextResponse.json({ error: 'Error fetching todo item' }, { status: 404 });
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await dbConnect();
  console.log(request);
  const { completed, title } = await request.json();
  const todos = await Todos.findByIdAndUpdate(
    params.id,
    {
      completed,
      title,
    },
    { new: true }
  );
  return todos
    ? NextResponse.json(todos)
    : NextResponse.json({ error: 'Todos not found' }, { status: 404 });
};
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  await dbConnect();
  const deletedTodo = await Todos.findByIdAndDelete(params.id);
  return deletedTodo
    ? NextResponse.json({ message: 'Todo deleted' })
    : NextResponse.json({ error: 'Todo not found' }, { status: 404 });
};
