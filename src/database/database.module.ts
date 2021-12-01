import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Mongoose } from 'mongoose'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/restaurant-nest', { useNewUrlParser: true })
    ],
    controllers: [],
    providers: []
})
export class DatabaseModule { }