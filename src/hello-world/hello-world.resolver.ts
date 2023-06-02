import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query( () => String, { description: 'Hola mundo es lo que retorna', name: 'Hello' } )  //Indicamos que devuelve un string
    helloWorld(): string {
        return 'Hola mundo'
    }

    @Query( () => Float, { name: 'randomNumber' } ) 
    getRandomNumber(): number {
        return Math.random() * 100
    }

    @Query(() => Int, { name: 'randomFromZeroTo', description: 'From zero to argument TO (default 6)' })
    getRandomFromZeroTo( 
        @Args('to', { nullable: true, type: () => Int }) to: number = 6, 
    ): number { 
        return Math.trunc( Math.random() * to )
    }

}
