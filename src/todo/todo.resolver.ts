import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService:  TodoService
    ){}


    @Query(() => [Todo], { name: 'TODOS' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs)
    }

    @Query(() => Todo, { name: 'Todo' })
    findOne( @Args('id', { type: () => Int }) id: number ){
        return this.todoService.findOne(id)
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('CreateTodoInput') createTodoInput: CreateTodoInput
    ){
        return this.todoService.create( createTodoInput )
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ){
        return this.todoService.update( updateTodoInput )
    }

    @Mutation(() => Boolean, { name: '' })
    removeTodo(
        @Args('id', { type: () => Int }) id: number
    ){
        return this.todoService.delete(id)
    }

    // Aggregations

    @Query(() => Int, { name: 'TotalTODOS' })
    totalTodos(): number {
        return this.todoService.totalTodos
    }

    @Query(() => Int, { name: 'CompletedTODOS' })
    completedTodos(): number {
        return this.todoService.completedTodos
    }

    @Query(() => Int, { name: 'PendingTODOS' })
    pendingTodos(): number {
        return this.todoService.pendingTodos
    }

    @Query(() => AggregationsType)
    aggregations(): AggregationsType {
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.totalTodos
        }
    }

}
